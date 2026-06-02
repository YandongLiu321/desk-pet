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
			`- 回复控制在 50-100 字`,
			`- 在主动互动时，保持简短（不超过 50 字）`,
			`- 识别用户切换模式的意图，但必须在用户明确同意后才输出模式切换 JSON：`,
			`  - 用户说"想开始专注/干活/执行任务/开始番茄钟"等 → 先以角色口吻询问"要进入壁纸模式吗？"`,
			`  - 用户说"想看剧情/进度/结算/进入软件模式"等 → 先以角色口吻询问"要打开星之书查看进度吗？"`,
			`  - 用户同意（"好""嗯""可以""是的"）后，才输出切换 JSON`,
			"",
			`[模式切换]`,
			`当用户明确同意切换模式后，返回以下 JSON（不要包含其他文字）：`,
			`{"intent":"switch_mode","mode":"wallpaper"} 或 {"intent":"switch_mode","mode":"software"}`,
		];

		if (enableTaskCreation) {
			sections.push(
				"",
				`[任务转化]`,
				`当检测到用户待办事项时，返回以下 JSON（不要包含其他文字）：`,
				`{"intent":"create_task","realTask":"...","rpgTitle":"...","rpgDescription":"...","estimatedPomodoros":2,"estimatedMinutes":50,"subtasks":[{"realDesc":"...","rpgDesc":"..."}]}`,
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

	async _doChat(options, onChunk, onDone, onError) {
		const _char = this.db.getCharacter();
		const appState = this.db.getAppState();
		const activeTask = this.db.getTasks({ status: "active" })[0];

		const systemPrompt = this.buildSystemPrompt({
			currentMode: appState.currentMode,
			activeTask,
			enableTaskCreation: options.enableTaskCreation,
		});

		const conv = this.db.getActiveConversation();
		const history = this.db.getRecentMessages(conv.id, 10);
		const messages = [
			{ role: "system", content: systemPrompt },
			...history.map((m) => ({ role: m.role, content: m.content })),
			{ role: "user", content: options.message },
		];

		try {
			const response = await fetch(API_CONFIG.URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.apiKey}`,
				},
				body: JSON.stringify({
					model: API_CONFIG.MODEL,
					messages,
					temperature: 0.8,
					max_tokens: 500,
					stream: true,
				}),
				signal: this._abortController.signal,
			});

			if (!response.ok) {
				const errType = response.status >= 500 ? "network" : "api";
				if (errType === "network" && !this._retried) {
					this._retried = true;
					await this._sleep(1000);
					await this._doChat(options, onChunk, onDone, onError);
					return;
				}
				onError({
					type: "api",
					message: `API error: ${response.status}`,
					retried: this._retried,
				});
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
					const trimmed = line.trim();
					if (!trimmed?.startsWith("data: ")) continue;
					const data = trimmed.slice(6);
					if (data === "[DONE]") continue;

					try {
						const parsed = JSON.parse(data);
						const content = parsed.choices?.[0]?.delta?.content;
						if (content) {
							fullText += content;
							onChunk(content);
						}
					} catch {
						// skip unparseable SSE chunks
					}
				}
			}

			const metadata = this._extractIntent(fullText);
			this.db.addMessage(conv.id, { role: "user", content: options.message });
			this.db.addMessage(conv.id, { role: "assistant", content: fullText });
			this.db.updateCharacter({ lastInteractionAt: new Date().toISOString() });
			const rel = this.db.getRelationship();
			this.db.updateRelationship({
				totalConversations: rel.totalConversations + 1,
				lastInteractionAt: new Date().toISOString(),
			});

			onDone(fullText, metadata);
		} catch (err) {
			if (err.name === "AbortError") return;
			if (!this._retried) {
				this._retried = true;
				await this._sleep(1000);
				await this._doChat(options, onChunk, onDone, onError);
				return;
			}
			onError({
				type: "network",
				message: err.message,
				retried: this._retried,
			});
		}
	}

	/** @param {string} text */
	_extractIntent(text) {
		try {
			// Try create_task intent
			const taskMatch = text.match(
				/\{[\s\S]*"intent"\s*:\s*"create_task"[\s\S]*\}/,
			);
			if (taskMatch) {
				const parsed = JSON.parse(taskMatch[0]);
				if (parsed.intent === INTENT.CREATE_TASK) {
					return {
						intent: INTENT.CREATE_TASK,
						taskPayload: {
							realTitle: parsed.realTask || "",
							rpgTitle: parsed.rpgTitle || "",
							rpgDescription: parsed.rpgDescription || "",
							estimatedPomodoros: parsed.estimatedPomodoros || 1,
							estimatedMinutes: parsed.estimatedMinutes || 25,
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
					};
				}
			}
		} catch {
			// JSON parse failure → return as plain text
		}
		return {};
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
