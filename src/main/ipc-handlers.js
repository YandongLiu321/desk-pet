/** @param {Error | string} err */
function errorResponse(err) {
	const msg = typeof err === "string" ? err : err.message;
	return { ok: false, error: { code: ERROR_CODE.INTERNAL, message: msg } };
}

function runSafe(fn) {
	try { return { ok: true, data: fn() }; }
	catch (e) { return errorResponse(e); }
}

function runTask(fn) {
	try { return { ok: true, data: fn() }; }
	catch (e) {
		if (e.message.includes("Task not found")) {
			return { ok: false, error: { code: ERROR_CODE.TASK_NOT_FOUND, message: e.message } };
		}
		return errorResponse(e);
	}
}

const { IPC, MODE, ERROR_CODE } = require("../shared/constants.js");

/**
 * @param {object} services
 * @param {import('./database').Database} services.db
 * @param {import('./window-manager').WindowManager} services.windowManager
 * @param {import('./llm-service').LLMService} services.llmService
 * @param {import('./task-service').TaskService} services.taskService
 * @param {import('./relationship-service').RelationshipService} services.relationshipService
 * @param {import('./pomodoro-service').PomodoroService} [services.pomodoroService]
 * @param {import('./narrative-engine').NarrativeEngine} [services.narrativeEngine]
 * @param {(mode: string) => void} services.switchModeWithCleanup
 * @param {object} deps
 * @param {Electron.IpcMain} deps.ipcMain
 * @param {typeof Electron.BrowserWindow} deps.BrowserWindow
 */
function registerIpcHandlers(services, deps) {
	const { ipcMain, BrowserWindow } = deps;
	const { db, windowManager, llmService, taskService, relationshipService } = services;

	// ── Conversation ──
	ipcMain.handle(IPC.CONVERSATION_SEND, async (event, { message, enableTaskCreation }) => {
		try {
			const win = BrowserWindow.fromWebContents(event.sender);
			llmService.chat(
				{ message, enableTaskCreation },
				(chunk) => { if (!win.isDestroyed()) win.webContents.send(IPC.CONVERSATION_CHUNK, { chunk }); },
				(fullText, metadata) => { if (!win.isDestroyed()) win.webContents.send(IPC.CONVERSATION_DONE, { fullText, ...metadata }); },
				(err) => { if (!win.isDestroyed()) win.webContents.send(IPC.CONVERSATION_ERROR, { code: err.type === "network" ? ERROR_CODE.LLM_NETWORK : ERROR_CODE.LLM_API, message: err.message }); },
			);
			return { ok: true, data: { streaming: true } };
		} catch (e) { return errorResponse(e); }
	});

	ipcMain.handle(IPC.CONVERSATION_GET_HISTORY, () => runSafe(() => {
		const conv = db.getActiveConversation();
		return { messages: conv.messages };
	}));

	ipcMain.handle(IPC.CONVERSATION_ABORT, () => runSafe(() => { llmService.abort(); return null; }));

	// ── Tasks ──
	ipcMain.handle(IPC.TASK_GET_ALL, (_event, { status } = {}) => runSafe(() => status ? db.getTasks({ status }) : taskService.getAllTasks()));

	ipcMain.handle(IPC.TASK_GET_BY_ID, (_event, { taskId }) => runTask(() => {
		const task = taskService.getTaskById(taskId);
		if (!task) throw new Error(`Task not found: ${taskId}`);
		return task;
	}));

	ipcMain.handle(IPC.TASK_CREATE, (_event, { data }) => {
		if (!data?.realTitle || !data.rpgTitle) {
			return { ok: false, error: { code: ERROR_CODE.TASK_CREATE_INVALID, message: "realTitle and rpgTitle are required" } };
		}
		return runTask(() => taskService.createTask(data));
	});

	ipcMain.handle(IPC.TASK_UPDATE, (_event, { taskId, partial }) => runTask(() => taskService.updateTask(taskId, partial)));

	ipcMain.handle(IPC.TASK_TOGGLE_SUBTASK, (_event, { taskId, subtaskId }) => runTask(() => taskService.toggleSubtask(taskId, subtaskId)));

	ipcMain.handle(IPC.TASK_COMPLETE, (_event, { taskId }) => runTask(() => {
		const result = taskService.completeTask(taskId);
		relationshipService.incrementStat("tasksCompleted");
		const upgrade = relationshipService.checkAndUpgrade();
		return { ...result, relationshipUpgrade: upgrade };
	}));

	ipcMain.handle(IPC.TASK_DELETE, (_event, { taskId }) => runSafe(() => { taskService.deleteTask(taskId); return null; }));

	// ── App / Mode ──
	ipcMain.handle(IPC.APP_SWITCH_MODE, (_event, { mode }) => {
		if (![MODE.PET, MODE.WALLPAPER, MODE.SOFTWARE].includes(mode)) {
			return { ok: false, error: { code: ERROR_CODE.MODE_INVALID, message: `Invalid mode: ${mode}` } };
		}
		services.switchModeWithCleanup(mode);
		return { ok: true, data: { mode } };
	});

	ipcMain.handle(IPC.APP_GET_STATE, () => runSafe(() => db.getAppState()));
	ipcMain.handle(IPC.APP_GET_CHARACTER, () => runSafe(() => db.getCharacter()));
	ipcMain.handle(IPC.APP_GET_RELATIONSHIP, () => runSafe(() => db.getRelationship()));

	// ── Pomodoro ──
	ipcMain.handle(IPC.POMODORO_START, (event, { duration, taskId } = {}) => {
		try {
			if (!services.pomodoroService) {
				return { ok: false, error: { code: ERROR_CODE.INTERNAL, message: "Pomodoro service not available" } };
			}
			const win = BrowserWindow.fromWebContents(event.sender);
			services.pomodoroService.start(duration || 25, {
				taskId,
				onTick(remaining) { if (win && !win.isDestroyed()) win.webContents.send(IPC.POMODORO_TICK, { remaining }); },
				onEnd() {
					if (win && !win.isDestroyed()) win.webContents.send(IPC.POMODORO_END, {});
					if (taskId) relationshipService.incrementStat("pomodoros");
					relationshipService.checkAndUpgrade();
				},
				onCancel() {},
			});
			return { ok: true, data: { running: true } };
		} catch (e) { return errorResponse(e); }
	});

	ipcMain.handle(IPC.POMODORO_STOP, () => runSafe(() => { services.pomodoroService?.cancel(); return null; }));

	ipcMain.handle(IPC.POMODORO_GET_STATUS, () => runSafe(() => {
		if (!services.pomodoroService) return { running: false, remaining: null };
		return {
			running: services.pomodoroService.isRunning(),
			remaining: services.pomodoroService.getRemaining(),
			taskId: services.pomodoroService.getCurrentTaskId(),
		};
	}));

	// ── Settings ──
	ipcMain.handle(IPC.SETTINGS_GET_API_KEY, () => runSafe(() => ({ apiKey: db.getApiKey() })));
	ipcMain.handle(IPC.SETTINGS_SET_API_KEY, (_event, { key }) => runSafe(() => { db.setApiKey(key); return null; }));
	ipcMain.handle(IPC.SETTINGS_GET_WALLPAPER, () => runSafe(() => db.getAppState().wallpaperSettings));
	ipcMain.handle(IPC.SETTINGS_UPDATE_WALLPAPER, (_event, { partial }) => runSafe(() => {
		const state = db.getAppState();
		Object.assign(state.wallpaperSettings, partial);
		db.updateAppState({ wallpaperSettings: state.wallpaperSettings });
		return state.wallpaperSettings;
	}));

	// ── Window ──
	ipcMain.handle(IPC.WINDOW_HIDE, () => runSafe(() => { windowManager.getCurrentWindow()?.hide(); return null; }));
	ipcMain.handle(IPC.WINDOW_CLOSE_MODE, () => runSafe(() => { services.switchModeWithCleanup(MODE.PET); return null; }));
	ipcMain.on(IPC.WINDOW_MOVE_BY, (event, { dx, dy }) => {
		const win = BrowserWindow.fromWebContents(event.sender);
		if (win && !win.isDestroyed()) {
			const [x, y] = win.getPosition();
			win.setPosition(x + Math.round(dx), y + Math.round(dy));
		}
	});
}

module.exports = { registerIpcHandlers };
