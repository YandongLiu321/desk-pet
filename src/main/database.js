const path = require("node:path");
const fs = require("node:fs");

/**
 * @typedef {'pet'|'wallpaper'|'software'} Mode
 * @typedef {'active'|'completed'} TaskStatus
 * @typedef {{ id: string, realTitle: string, rpgTitle: string, rpgDescription: string,
 *   estimatedPomodoros: number, estimatedMinutes: number, deadline: string,
 *   status: TaskStatus, createdAt: string, completedAt: string|null,
 *   followUpPromptAt: string|null, followUpCompleted: boolean, followUpResult: string,
 *   subtasks: SubTask[], milestoneId: string|null }} Task
 * @typedef {{ id: string, realDesc: string, rpgDesc: string, completed: boolean }} SubTask
 * @typedef {{ role: 'user'|'assistant'|'system', content: string }} Message
 */

class Database {
	/**
	 * @param {string} filePath
	 */
	constructor(filePath) {
		this.filePath = filePath || path.join(process.cwd(), "data", "db.json");
		this._data = null;
		this._loaded = false;
	}

	_load() {
		if (this._loaded) return;
		try {
			const raw = fs.readFileSync(this.filePath, "utf-8");
			this._data = JSON.parse(raw);
		} catch {
			this._data = this._defaults();
			this._persist();
		}
		this._loaded = true;
	}

	_persist() {
		const dir = path.dirname(this.filePath);
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		fs.writeFileSync(
			this.filePath,
			JSON.stringify(this._data, null, 2),
			"utf-8",
		);
	}

	_defaults() {
		return {
			appState: {
				currentMode: "pet",
				petWindowBounds: { x: 1000, y: 600, width: 500, height: 500 },
				characterPosition: { x: 240, y: 20, width: 120, height: 120 },
				wallpaperSettings: {
					opacity: 0.85,
					characterPosition: "right",
					soundVolume: 0.5,
					weWallpaperDir: null,
				},
				pomodoro: null,
				apiKey: "",
			},
			tasks: [],
			character: {
				id: "luna_moonwhisper",
				currentMood: "gentle",
				currentExpression: "smile",
				lastInteractionAt: "",
			},
			relationship: {
				characterId: "luna_moonwhisper",
				stage: "stranger",
				totalTasksCompleted: 0,
				totalPomodoros: 0,
				totalConversations: 0,
				consecutiveDays: 1,
				lastInteractionAt: "",
			},
			worldState: {
				currentChapter: 1,
				variables: { crystalIntegrity: 75 },
				milestoneProgress: {},
			},
			conversations: [],
		};
	}

	getAppState() {
		this._load();
		return this._data.appState;
	}

	updateAppState(partial) {
		this._load();
		Object.assign(this._data.appState, partial);
		this._persist();
		return this._data.appState;
	}

	/** @param {{ status?: 'active'|'completed' }} [filter] */
	getTasks(filter) {
		this._load();
		if (!filter?.status) return this._data.tasks;
		return this._data.tasks.filter((t) => t.status === filter.status);
	}

	/** @param {string} taskId */
	getTaskById(taskId) {
		this._load();
		return this._data.tasks.find((t) => t.id === taskId);
	}

	createTask(taskData) {
		this._load();
		const task = {
			id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
			createdAt: new Date().toISOString(),
			status: "active",
			completedAt: null,
			followUpPromptAt: null,
			followUpCompleted: false,
			followUpResult: "",
			subtasks: [],
			...taskData,
		};
		this._data.tasks.push(task);
		this._persist();
		return task;
	}

	updateTask(taskId, partial) {
		this._load();
		const idx = this._data.tasks.findIndex((t) => t.id === taskId);
		if (idx === -1) throw new Error(`Task not found: ${taskId}`);
		Object.assign(this._data.tasks[idx], partial);
		this._persist();
		return this._data.tasks[idx];
	}

	deleteTask(taskId) {
		this._load();
		this._data.tasks = this._data.tasks.filter((t) => t.id !== taskId);
		this._persist();
	}

	toggleSubtask(taskId, subId) {
		this._load();
		const task = this._data.tasks.find((t) => t.id === taskId);
		if (!task) throw new Error(`Task not found: ${taskId}`);
		const sub = task.subtasks.find((s) => s.id === subId);
		if (!sub) throw new Error(`Subtask not found: ${subId}`);
		sub.completed = !sub.completed;
		this._persist();
		return task;
	}

	completeTask(taskId) {
		this._load();
		const task = this._data.tasks.find((t) => t.id === taskId);
		if (!task) throw new Error(`Task not found: ${taskId}`);
		task.status = "completed";
		task.completedAt = new Date().toISOString();
		this._persist();
		return task;
	}

	getCharacter() {
		this._load();
		return this._data.character;
	}

	updateCharacter(partial) {
		this._load();
		Object.assign(this._data.character, partial);
		this._persist();
		return this._data.character;
	}

	getRelationship() {
		this._load();
		return this._data.relationship;
	}

	updateRelationship(partial) {
		this._load();
		Object.assign(this._data.relationship, partial);
		this._persist();
		return this._data.relationship;
	}

	getWorldState() {
		this._load();
		return this._data.worldState;
	}

	updateWorldState(partial) {
		this._load();
		Object.assign(this._data.worldState, partial);
		this._persist();
		return this._data.worldState;
	}

	getActiveConversation() {
		this._load();
		let conv = this._data.conversations.find((c) => !c.endedAt);
		if (!conv) {
			conv = {
				id: `conv_${Date.now()}`,
				messages: [],
				createdAt: new Date().toISOString(),
				endedAt: null,
			};
			this._data.conversations.push(conv);
			this._persist();
		}
		return conv;
	}

	addMessage(convId, message) {
		this._load();
		const conv = this._data.conversations.find((c) => c.id === convId);
		if (!conv) throw new Error(`Conversation not found: ${convId}`);
		const msg = {
			role: message.role,
			content: message.content,
			timestamp: new Date().toISOString(),
		};
		conv.messages.push(msg);
		this._persist();
		return msg;
	}

	getRecentMessages(convId, limit) {
		this._load();
		const conv = this._data.conversations.find((c) => c.id === convId);
		if (!conv) return [];
		return conv.messages.slice(-limit);
	}

	getApiKey() {
		this._load();
		return this._data.appState.apiKey || "";
	}

	setApiKey(key) {
		this._load();
		this._data.appState.apiKey = key;
		this._persist();
	}
}

module.exports = { Database };
