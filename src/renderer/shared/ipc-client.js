class IpcClient {
	constructor() {
		/** @type {typeof window.electronAPI} */
		this.api = window.electronAPI;
		if (!this.api) {
			console.warn("electronAPI not available — running outside Electron?");
		}
	}

	/** @param {string} method @param  {...any} args */
	async _call(method, ...args) {
		if (!this.api)
			return {
				ok: false,
				error: { code: "INTERNAL", message: "electronAPI unavailable" },
			};
		const parts = method.split(".");
		let obj = this.api;
		for (const p of parts) {
			obj = obj?.[p];
		}
		if (typeof obj !== "function") {
			return {
				ok: false,
				error: { code: "INTERNAL", message: `Invalid method: ${method}` },
			};
		}
		try {
			return await obj(...args);
		} catch (e) {
			return { ok: false, error: { code: "INTERNAL", message: e.message } };
		}
	}

	// Conversation
	async sendMessage(message, enableTaskCreation) {
		return this._call("conversation.send", message, enableTaskCreation);
	}
	async getHistory() {
		return this._call("conversation.getHistory");
	}
	async abort() {
		return this._call("conversation.abort");
	}

	onChunk(cb) {
		return this.api?.conversation.onChunk?.(cb);
	}
	onDone(cb) {
		return this.api?.conversation.onDone?.(cb);
	}
	onError(cb) {
		return this.api?.conversation.onError?.(cb);
	}
	removeConversationListeners() {
		this.api?.conversation.removeAllListeners?.();
	}

	// Tasks
	async getTasks(status) {
		return this._call("task.getAll", status);
	}
	async getTaskById(taskId) {
		return this._call("task.getById", taskId);
	}
	async createTask(data) {
		return this._call("task.create", data);
	}
	async updateTask(taskId, partial) {
		return this._call("task.update", taskId, partial);
	}
	async toggleSubtask(taskId, subtaskId) {
		return this._call("task.toggleSubtask", taskId, subtaskId);
	}
	async completeTask(taskId) {
		return this._call("task.complete", taskId);
	}
	async deleteTask(taskId) {
		return this._call("task.delete", taskId);
	}

	// App
	async switchMode(mode) {
		return this._call("app.switchMode", mode);
	}
	async getAppState() {
		return this._call("app.getState");
	}
	async getCharacter() {
		return this._call("app.getCharacter");
	}
	async getRelationship() {
		return this._call("app.getRelationship");
	}
	onModeActivated(cb) {
		return this.api?.app.onModeActivated?.(cb);
	}

	// Pomodoro
	async startPomodoro(duration, taskId) {
		return this._call("pomodoro.start", duration, taskId);
	}
	async stopPomodoro() {
		return this._call("pomodoro.stop");
	}
	async getPomodoroStatus() {
		return this._call("pomodoro.getStatus");
	}
	onPomodoroTick(cb) {
		return this.api?.pomodoro.onTick?.(cb);
	}
	onPomodoroEnd(cb) {
		return this.api?.pomodoro.onEnd?.(cb);
	}
	removePomodoroListeners() {
		this.api?.pomodoro.removeAllListeners?.();
	}

	// Settings
	async getApiKey() {
		return this._call("settings.getApiKey");
	}
	async setApiKey(key) {
		return this._call("settings.setApiKey", key);
	}
	async getWallpaper() {
		return this._call("settings.getWallpaper");
	}
	async updateWallpaper(partial) {
		return this._call("settings.updateWallpaper", partial);
	}
	async getAudioConfig() {
		return this._call("settings.getAudioConfig");
	}

	// Wallpaper Engine
	async loadWeWallpaper(dirName) {
		return this._call("wallpaper.loadWe", dirName);
	}
	async listWeWallpapers() {
		return this._call("wallpaper.listWe");
	}

	// Scene
	async getScene() {
		return this._call("scene.get");
	}
	async saveScene(filePath, data) {
		return this._call("scene.save", filePath, data);
	}

	// Editor
	async openEditor() {
		return this._call("editor.open");
	}
	async applyScene(sceneData) {
		return this._call("editor.apply", sceneData);
	}
	async updateProperty(node, prop, value) {
		return this._call("editor.updateProperty", node, prop, value);
	}

	// Window
	async hideWindow() {
		return this._call("window.hide");
	}
	async closeMode() {
		return this._call("window.closeMode");
	}
	moveWindowBy(dx, dy) {
		this.api?.window.moveBy(dx, dy);
	}
}

window.IpcClient = IpcClient;
