const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	conversation: {
		send(message) {
			return ipcRenderer.invoke("conversation:send", { message });
		},
		getHistory() {
			return ipcRenderer.invoke("conversation:get-history");
		},
		abort() {
			return ipcRenderer.invoke("conversation:abort");
		},
		onChunk(cb) {
			const handler = (_event, data) => cb(data.chunk);
			ipcRenderer.on("conversation:chunk", handler);
			return () => ipcRenderer.removeListener("conversation:chunk", handler);
		},
		onDone(cb) {
			const handler = (_event, data) => cb(data);
			ipcRenderer.on("conversation:done", handler);
			return () => ipcRenderer.removeListener("conversation:done", handler);
		},
		onError(cb) {
			const handler = (_event, data) => cb(data);
			ipcRenderer.on("conversation:error", handler);
			return () => ipcRenderer.removeListener("conversation:error", handler);
		},
		removeAllListeners() {
			ipcRenderer.removeAllListeners("conversation:chunk");
			ipcRenderer.removeAllListeners("conversation:done");
			ipcRenderer.removeAllListeners("conversation:error");
		},
	},

	task: {
		getAll(status) {
			return ipcRenderer.invoke("task:get-all", { status });
		},
		getById(taskId) {
			return ipcRenderer.invoke("task:get-by-id", { taskId });
		},
		create(data) {
			return ipcRenderer.invoke("task:create", { data });
		},
		update(taskId, partial) {
			return ipcRenderer.invoke("task:update", { taskId, partial });
		},
		toggleSubtask(taskId, subtaskId) {
			return ipcRenderer.invoke("task:toggle-subtask", { taskId, subtaskId });
		},
		complete(taskId) {
			return ipcRenderer.invoke("task:complete", { taskId });
		},
		delete(taskId) {
			return ipcRenderer.invoke("task:delete", { taskId });
		},
	},

	app: {
		switchMode(mode) {
			return ipcRenderer.invoke("app:switch-mode", { mode });
		},
		getState() {
			return ipcRenderer.invoke("app:get-state");
		},
		getCharacter() {
			return ipcRenderer.invoke("app:get-character");
		},
		getRelationship() {
			return ipcRenderer.invoke("app:get-relationship");
		},
		onModeActivated(cb) {
			const handler = (_event, mode) => cb(mode);
			ipcRenderer.on("mode:activated", handler);
			return () => ipcRenderer.removeListener("mode:activated", handler);
		},
	},

	pomodoro: {
		start(duration, taskId) {
			return ipcRenderer.invoke("pomodoro:start", { duration, taskId });
		},
		stop() {
			return ipcRenderer.invoke("pomodoro:stop");
		},
		getStatus() {
			return ipcRenderer.invoke("pomodoro:get-status");
		},
		onTick(cb) {
			const handler = (_event, data) => cb(data);
			ipcRenderer.on("pomodoro:tick", handler);
			return () => ipcRenderer.removeListener("pomodoro:tick", handler);
		},
		onEnd(cb) {
			const handler = (_event, data) => cb(data);
			ipcRenderer.on("pomodoro:end", handler);
			return () => ipcRenderer.removeListener("pomodoro:end", handler);
		},
		removeAllListeners() {
			ipcRenderer.removeAllListeners("pomodoro:tick");
			ipcRenderer.removeAllListeners("pomodoro:end");
		},
	},

	settings: {
		getApiKey() {
			return ipcRenderer.invoke("settings:get-api-key");
		},
		setApiKey(key) {
			return ipcRenderer.invoke("settings:set-api-key", { key });
		},
		getWallpaper() {
			return ipcRenderer.invoke("settings:get-wallpaper");
		},
		updateWallpaper(partial) {
			return ipcRenderer.invoke("settings:update-wallpaper", { partial });
		},
	},

	window: {
		hide() {
			return ipcRenderer.invoke("window:hide");
		},
		closeMode() {
			return ipcRenderer.invoke("window:close-mode");
		},
	},
});
