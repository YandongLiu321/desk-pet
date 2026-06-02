const DEFAULT_MODEL = "deepseek-chat";
const API_URL = "https://api.deepseek.com/v1/chat/completions";

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
	 * @returns {string}
	 */
	buildSystemPrompt(context) {
		const char = this.worldBook.character;
		const world = this.worldBook;
		const rel = this.db.getRelationship();
		const ws = this.db.getWorldState();
		const chapter =
			world.storyChapters.find((c) => c.chapterId === ws.currentChapter) ||
			world.storyChapters[0];

		return [
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
			`- 若对话中包含待办事项，使用 /task 指令触发任务转化`,
			`- 在主动互动时，保持简短（不超过 50 字）`,
			"",
			`[任务转化]`,
			`当检测到用户待办事项时，返回以下 JSON（不要包含其他文字）：`,
			`{"intent":"create_task","realTask":"...","rpgTitle":"...","rpgDescription":"...","estimatedPomodoros":2,"estimatedMinutes":50,"subtasks":[{"realDesc":"...","rpgDesc":"..."}]}`,
		].join("\n");
	}

	/**
	 * @param {{ message: string }} options
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
		});

		const conv = this.db.getActiveConversation();
		const history = this.db.getRecentMessages(conv.id, 10);
		const messages = [
			{ role: "system", content: systemPrompt },
			...history.map((m) => ({ role: m.role, content: m.content })),
			{ role: "user", content: options.message },
		];

		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.apiKey}`,
				},
				body: JSON.stringify({
					model: DEFAULT_MODEL,
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

			const metadata = this._extractTaskIntent(fullText);
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
	_extractTaskIntent(text) {
		try {
			const match = text.match(
				/\{[\s\S]*"intent"\s*:\s*"create_task"[\s\S]*\}/,
			);
			if (!match) return {};
			const parsed = JSON.parse(match[0]);
			if (parsed.intent === "create_task") {
				return {
					intent: "create_task",
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
