const { API_CONFIG, INTENT, MODE } = require("../shared/constants.js");

class LLMService {
	/**
	 * @param {object} config
	 * @param {string} config.apiKey
	 * @param {import('./database').Database} config.db
	 * @param {object} config.worldBook
	 */
	constructor(config) {
		this.apiKey = config.apiKey;
		this.db = config.db;
		this.worldBook = config.worldBook;
		this._abortController = null;
		this._retried = false;
	}

	/**
	 * @param {object} context
	 * @param {string} context.currentMode
	 * @param {object} [context.activeTask]
	 * @param {boolean} [context.enableTaskCreation]
	 * @returns {string}
	 */
	buildSystemPrompt(context) {
		const enableTaskCreation = context.enableTaskCreation || false;
		const char = this.worldBook.character;
		const world = this.worldBook;
		const rel = this.db.getRelationship();
		const ws = this.db.getWorldState();
		const chapter =
			world.storyChapters.find((c) => c.chapterId === ws.currentChapter) ||
			world.storyChapters[0];

		const sections = [
			`[角色设定]`,
			`你是${char.name}，${char.background}`,
			`你的性格是${char.personality}。说话风格：${char.speechStyle}`,
			"",
			`[世界背景]`,
			`你来自${world.title}——${world.description}。`,
			`当前章节：第${ws.currentChapter}章「${chapter?.title || ""}」`,
			`世界规则：${world.rules.join("；")}`,
			"",
			`[关系状态]`,
			`你与用户的关系阶段：${rel.stage}`,
			`你们已经一起完成了${rel.totalTasksCompleted}项任务。`,
			"",
			`[当前上下文]`,
			`当前模式：${context.currentMode}`,
			`活跃任务：${context.activeTask?.realTitle || "无"}`,
			"",
			`[行为指令]`,
			];

			if (enableTaskCreation) {
				sections.push(
					`- 回复控制在 30-60 字`,
					`- 当前是任务发布模式。用户只会在这里发布任务，你的唯一职责是识别任务并转化为结构化数据`,
					`- 先用角色口吻简短回应（1-2句话），然后在末尾输出任务 JSON（不要用代码块包裹）：`,
					`{"intent":"create_task","realTask":"用一句话概括","rpgTitle":"RPG化标题","rpgDescription":"RPG氛围描述","estimatedPomodoros":2,"estimatedMinutes":50,"mode":"computer","subtasks":[{"realDesc":"子任务实际描述","rpgDesc":"子任务RPG描述"}]}`,
					`- mode 取值：computer（需要电脑的任务，如写代码/做PPT/查资料）、reading（需要阅读实体书/资料的任务，如看教材/读论文/复习）、writing（需要手写/手绘的任务，如做笔记/做题/画图）`,
					`- 根据任务性质选择最合适的 mode`,
					`- 禁止询问壁纸模式或软件模式，禁止输出模式切换 JSON`,
				);
			} else {
				sections.push(
					`- 回复控制在 50-100 字，主动互动时保持简短`,
					`- 根据对话自然判断用户意图：用户有专注/做事意愿时，以角色口吻询问是否进入壁纸模式；用户想看进度/数据时，询问是否打开软件模式`,
					`- 用户同意后，在回复末尾输出模式切换 JSON：{"intent":"switch_mode","mode":"wallpaper"} 或 {"intent":"switch_mode","mode":"software"}`,
					`- 在回复末尾输出 JSON（不要用代码块包裹）`,
					`- 格式：{"displayText":"你的回复","expression":"happy|surprised|thinking|shy"}`,
					`- expression 根据你的情感选择：happy（开心）, surprised（惊讶）, thinking（思考）, shy（害羞）`,
					`- 如果用户表达了模式切换意图，只有这时才加 intent 字段`,
				);
		}

		return sections.join("\n");
	}

	/**
	 * @param {{ message: string, enableTaskCreation?: boolean }} options
	 * @param {(text: string) => void} onChunk
	 * @param {(fullText: string, metadata?: object) => void} onDone
	 * @param {(error: { type: string, message: string, retried: boolean }) => void} onError
	 */
	async chat(options, onChunk, onDone, onError) {
		this._abortController = new AbortController();
		this._retried = false;
		await this._doChat(options, onChunk, onDone, onError);
	}

	_buildChatMessages(options) {
		const appState = this.db.getAppState();
		const activeTask = this.db.getTasks({ status: "active" })[0];
		const systemPrompt = this.buildSystemPrompt({
			currentMode: appState.currentMode,
			activeTask,
			enableTaskCreation: options.enableTaskCreation,
		});
		const conv = this.db.getActiveConversation();
		const history = this.db.getRecentMessages(conv.id, 20);
		return [
			{ role: "system", content: systemPrompt },
			...history.map((m) => ({ role: m.role, content: m.content })),
			{ role: "user", content: options.message },
		];
	}

	_extractSSEContent(trimmed) {
		if (!trimmed?.startsWith("data: ")) return null;
		const data = trimmed.slice(6);
		if (data === "[DONE]") return null;
		try {
			const parsed = JSON.parse(data);
			return parsed.choices?.[0]?.delta?.content || null;
		} catch {
			return null;
		}
	}

	_persistChatResult(convId, options, fullText, metadata) {
		metadata.displayText = this._cleanDisplayText(fullText);
		this.db.addMessage(convId, { role: "user", content: options.message });
		this.db.addMessage(convId, { role: "assistant", content: fullText });
		this.db.updateCharacter({ lastInteractionAt: new Date().toISOString() });
		const rel = this.db.getRelationship();
		this.db.updateRelationship({
			totalConversations: rel.totalConversations + 1,
			lastInteractionAt: new Date().toISOString(),
		});
	}

	async _handleChatError(err, options, onChunk, onDone, onError) {
		if (err.name === "AbortError") return;
		if (!this._retried) {
			this._retried = true;
			await this._sleep(1000);
			await this._doChat(options, onChunk, onDone, onError);
			return;
		}
		onError({ type: "network", message: err.message, retried: this._retried });
	}

	async _doChat(options, onChunk, onDone, onError) {
		const messages = this._buildChatMessages(options);
		const conv = this.db.getActiveConversation();
		try {
			const response = await fetch(API_CONFIG.URL, {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.db.getApiKey()}` },
				body: JSON.stringify({ model: API_CONFIG.MODEL, messages, temperature: 0.8, max_tokens: 500, stream: true }),
				signal: this._abortController.signal,
			});
			if (!response.ok) {
				onError({ type: "api", message: `API error: ${response.status}`, retried: false });
				return;
			}
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let fullText = "";
			let buffer = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop() || "";
				for (const line of lines) {
					const content = this._extractSSEContent(line.trim());
					if (content) {
						fullText += content;
						onChunk(content);
					}
				}
			}
			const metadata = this._extractIntent(fullText);
			this._persistChatResult(conv.id, options, fullText, metadata);
			onDone(fullText, metadata);
		} catch (err) {
			await this._handleChatError(err, options, onChunk, onDone, onError);
		}
	}

	/** @param {string} text */
	_extractIntent(text) {
		try {
			// Strip markdown code fences — LLM often wraps JSON in ```json ... ```
			let searchText = text;
			const fenceMatches = [...text.matchAll(/```(?:json)?\s*([\s\S]*?)```/g)];
			for (const m of fenceMatches) {
				if (m[1].includes('"intent"')) {
					searchText = m[1];
					break;
				}
			}

			// Try create_task intent
			const taskMatch = searchText.match(
				/\{[\s\S]*"intent"\s*:\s*"create_task"[\s\S]*\}/,
			);
			if (taskMatch) {
				const parsed = JSON.parse(taskMatch[0]);
				if (parsed.intent === INTENT.CREATE_TASK) {
					return {
						intent: INTENT.CREATE_TASK,
						expression: parsed.expression || null,
						taskPayload: {
							realTitle: parsed.realTask || "",
							rpgTitle: parsed.rpgTitle || "",
							rpgDescription: parsed.rpgDescription || "",
							estimatedPomodoros: parsed.estimatedPomodoros || 1,
							estimatedMinutes: parsed.estimatedMinutes || 25,
							mode: parsed.mode || null,
							subtasks: (parsed.subtasks || []).map((s, i) => ({
								id: `sub_${Date.now()}_${i}`,
								realDesc: s.realDesc || "",
								rpgDesc: s.rpgDesc || "",
								completed: false,
							})),
						},
					};
				}
			}

			// Try switch_mode intent
			const switchMatch = text.match(
				/\{[\s\S]*"intent"\s*:\s*"switch_mode"[\s\S]*\}/,
			);
			if (switchMatch) {
				const parsed = JSON.parse(switchMatch[0]);
				if (
					parsed.intent === INTENT.SWITCH_MODE &&
					[MODE.WALLPAPER, MODE.SOFTWARE].includes(parsed.mode)
				) {
					return {
						intent: INTENT.SWITCH_MODE,
						switchTarget: parsed.mode,
						expression: parsed.expression || null,
					};
				}
			}
		} catch {
			// JSON parse failure → return as plain text
		}
		// Try to extract expression from general chat JSON (no intent)
		try {
			const generalMatch = text.match(/\{[\s\S]*"expression"[\s\S]*\}/);
			if (generalMatch) {
				const parsed = JSON.parse(generalMatch[0]);
				return { expression: parsed.expression || null };
			}
		} catch {
			// JSON parse failure, return as plain text
		}
		return {};
	}

	/** @param {string} text */
	_cleanDisplayText(text) {
		let cleaned = text;
		// Strip markdown code fences before cleaning
		const fenceMatches = [...text.matchAll(/```(?:json)?\s*([\s\S]*?)```/g)];
		for (const m of fenceMatches) {
			if (m[1].includes('"intent"')) {
				cleaned = cleaned.replace(m[0], m[1]);
			}
		}
		for (const pattern of [
			/\{"intent"\s*:\s*"create_task"[\s\S]*\}/,
			/\{"intent"\s*:\s*"switch_mode"[\s\S]*\}/,
		]) {
			const match = cleaned.match(pattern);
			if (match) {
				try {
					JSON.parse(match[0]);
					cleaned = cleaned.replace(match[0], "");
				} catch {
					// brace-counting fallback for unbalanced JSON
					const start = match.index;
					let depth = 0;
					let end = start;
					for (let i = start; i < cleaned.length; i++) {
						if (cleaned[i] === "{") depth++;
						if (cleaned[i] === "}") depth--;
						if (depth === 0) { end = i + 1; break; }
					}
					if (end > start) cleaned = cleaned.slice(0, start) + cleaned.slice(end);
				}
			}
		}
		return cleaned.trim();
	}

	_sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	abort() {
		if (this._abortController) {
			this._abortController.abort();
			this._abortController = null;
		}
	}
}

module.exports = { LLMService };
