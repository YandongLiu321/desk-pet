const { contextBridge, ipcRenderer } = require("electron");
const { IPC } = require("./shared/constants.js");

contextBridge.exposeInMainWorld("electronAPI", {
	conversation: {
		send(message, enableTaskCreation) {
			return ipcRenderer.invoke(IPC.CONVERSATION_SEND, { message, enableTaskCreation });
		},
		getHistory() {
			return ipcRenderer.invoke(IPC.CONVERSATION_GET_HISTORY);
		},
		abort() {
			return ipcRenderer.invoke(IPC.CONVERSATION_ABORT);
		},
		onChunk(cb) {
			const handler = (_event, data) => cb(data.chunk);
			ipcRenderer.on(IPC.CONVERSATION_CHUNK, handler);
			return () => ipcRenderer.removeListener(IPC.CONVERSATION_CHUNK, handler);
		},
		onDone(cb) {
			const handler = (_event, data) => cb(data);
			ipcRenderer.on(IPC.CONVERSATION_DONE, handler);
			return () => ipcRenderer.removeListener(IPC.CONVERSATION_DONE, handler);
		},
		onError(cb) {
			const handler = (_event, data) => cb(data);
			ipcRenderer.on(IPC.CONVERSATION_ERROR, handler);
			return () => ipcRenderer.removeListener(IPC.CONVERSATION_ERROR, handler);
		},
		removeAllListeners() {
			ipcRenderer.removeAllListeners(IPC.CONVERSATION_CHUNK);
			ipcRenderer.removeAllListeners(IPC.CONVERSATION_DONE);
			ipcRenderer.removeAllListeners(IPC.CONVERSATION_ERROR);
		},
	},

	task: {
		getAll(status) {
			return ipcRenderer.invoke(IPC.TASK_GET_ALL, { status });
		},
		getById(taskId) {
			return ipcRenderer.invoke(IPC.TASK_GET_BY_ID, { taskId });
		},
		getMode(taskId) {
			return ipcRenderer.invoke(IPC.TASK_GET_MODE, { taskId });
		},
		create(data) {
			return ipcRenderer.invoke(IPC.TASK_CREATE, { data });
		},
		update(taskId, partial) {
			return ipcRenderer.invoke(IPC.TASK_UPDATE, { taskId, partial });
		},
		toggleSubtask(taskId, subtaskId) {
			return ipcRenderer.invoke(IPC.TASK_TOGGLE_SUBTASK, { taskId, subtaskId });
		},
		complete(taskId) {
			return ipcRenderer.invoke(IPC.TASK_COMPLETE, { taskId });
		},
		updateProgress(taskId, percent, note, subtaskId) {
			return ipcRenderer.invoke(IPC.TASK_UPDATE_PROGRESS, { taskId, percent, note, subtaskId });
		},
		delete(taskId) {
			return ipcRenderer.invoke(IPC.TASK_DELETE, { taskId });
		},
	},

	app: {
		switchMode(mode) {
			return ipcRenderer.invoke(IPC.APP_SWITCH_MODE, { mode });
		},
		getState() {
			return ipcRenderer.invoke(IPC.APP_GET_STATE);
		},
		getCharacter() {
			return ipcRenderer.invoke(IPC.APP_GET_CHARACTER);
		},
		getRelationship() {
			return ipcRenderer.invoke(IPC.APP_GET_RELATIONSHIP);
		},
		onModeActivated(cb) {
			const handler = (_event, mode) => cb(mode);
			ipcRenderer.on(IPC.MODE_ACTIVATED, handler);
			return () => ipcRenderer.removeListener(IPC.MODE_ACTIVATED, handler);
		},
	},

	pomodoro: {
		start(duration, taskId) {
			return ipcRenderer.invoke(IPC.POMODORO_START, { duration, taskId });
		},
		stop() {
			return ipcRenderer.invoke(IPC.POMODORO_STOP);
		},
		getStatus() {
			return ipcRenderer.invoke(IPC.POMODORO_GET_STATUS);
		},
		onTick(cb) {
			const handler = (_event, data) => cb(data);
			ipcRenderer.on(IPC.POMODORO_TICK, handler);
			return () => ipcRenderer.removeListener(IPC.POMODORO_TICK, handler);
		},
		onEnd(cb) {
			const handler = (_event, data) => cb(data);
			ipcRenderer.on(IPC.POMODORO_END, handler);
			return () => ipcRenderer.removeListener(IPC.POMODORO_END, handler);
		},
		removeAllListeners() {
			ipcRenderer.removeAllListeners(IPC.POMODORO_TICK);
			ipcRenderer.removeAllListeners(IPC.POMODORO_END);
		},
	},

	proactive: {
		getState() {
			return ipcRenderer.invoke(IPC.PROACTIVE_GET_STATE);
		},
		setConfig(partial) {
			return ipcRenderer.invoke(IPC.PROACTIVE_SET_CONFIG, { partial });
		},
		markInteraction() {
			ipcRenderer.send(IPC.PROACTIVE_TRIGGER);
		},
		onTrigger(cb) {
			const handler = (_event, data) => cb(data.text);
			ipcRenderer.on(IPC.PROACTIVE_TRIGGER, handler);
			return function() { ipcRenderer.removeListener(IPC.PROACTIVE_TRIGGER, handler); };
		},
	},

	memory: {
		list() {
			return ipcRenderer.invoke(IPC.MEMORY_LIST);
		},
		search(query, limit) {
			return ipcRenderer.invoke(IPC.MEMORY_SEARCH, { query, limit });
		},
		delete(memId) {
			return ipcRenderer.invoke(IPC.MEMORY_DELETE, { memId });
		},
		clear() {
			return ipcRenderer.invoke(IPC.MEMORY_CLEAR);
		},
	},

	settings: {
		getApiKey() {
			return ipcRenderer.invoke(IPC.SETTINGS_GET_API_KEY);
		},
		setApiKey(key) {
			return ipcRenderer.invoke(IPC.SETTINGS_SET_API_KEY, { key });
		},
		getWallpaper() {
			return ipcRenderer.invoke(IPC.SETTINGS_GET_WALLPAPER);
		},
		updateWallpaper(partial) {
			return ipcRenderer.invoke(IPC.SETTINGS_UPDATE_WALLPAPER, { partial });
		},
		getAudioConfig() {
			return ipcRenderer.invoke(IPC.SETTINGS_GET_AUDIO_CONFIG);
		},
		getAll() {
			return ipcRenderer.invoke(IPC.SETTINGS_GET);
		},
		update(partial) {
			return ipcRenderer.invoke(IPC.SETTINGS_SET, { partial });
		},
		getTheme() {
			return ipcRenderer.invoke(IPC.THEME_GET);
		},
		setTheme(theme) {
			return ipcRenderer.invoke(IPC.THEME_SET, { theme });
		},
		onChanged(cb) {
			const handler = (_event, data) => cb(data);
			ipcRenderer.on(IPC.SETTINGS_CHANGED, handler);
			return () => ipcRenderer.removeListener(IPC.SETTINGS_CHANGED, handler);
		},
	},

		wallpaper: {
			loadWe(dirName) {
				return ipcRenderer.invoke(IPC.WALLPAPER_LOAD_WE, { dirName });
			},
			listWe() {
				return ipcRenderer.invoke(IPC.WALLPAPER_LIST_WE);
			},
		},

		scene: {
			get() {
				return ipcRenderer.invoke(IPC.SCENE_GET);
			},
			save(filePath, data) {
				return ipcRenderer.invoke(IPC.SCENE_SAVE, { filePath, data });
			},
		},

		editor: {
			open() {
				return ipcRenderer.invoke(IPC.EDITOR_OPEN);
			},
			apply(sceneData) {
				return ipcRenderer.invoke(IPC.EDITOR_APPLY, { sceneData });
			},
			updateProperty(node, prop, value) {
				return ipcRenderer.invoke(IPC.EDITOR_UPDATE_PROPERTY, { node, prop, value });
			},
			onApply(cb) {
				var handler = function(_event, data) { cb(data.sceneData); };
				ipcRenderer.on(IPC.EDITOR_APPLY, handler);
				return function() { ipcRenderer.removeListener(IPC.EDITOR_APPLY, handler); };
			},
			onUpdateProperty(cb) {
				var handler = function(_event, data) { cb(data); };
				ipcRenderer.on(IPC.EDITOR_UPDATE_PROPERTY, handler);
				return function() { ipcRenderer.removeListener(IPC.EDITOR_UPDATE_PROPERTY, handler); };
			},
		},

	window: {
		hide() {
			return ipcRenderer.invoke(IPC.WINDOW_HIDE);
		},
		closeMode() {
			return ipcRenderer.invoke(IPC.WINDOW_CLOSE_MODE);
		},
		moveBy(dx, dy) {
			ipcRenderer.send(IPC.WINDOW_MOVE_BY, { dx, dy });
		},
		setIgnoreMouseEvents(ignore, forward) {
			return ipcRenderer.invoke(IPC.WINDOW_SET_IGNORE_MOUSE_EVENTS, { ignore, forward });
		},
	},
});
