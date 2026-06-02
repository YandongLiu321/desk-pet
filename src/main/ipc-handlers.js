/** @param {Error | string} err */
function errorResponse(err) {
	const msg = typeof err === "string" ? err : err.message;
	return { ok: false, error: { code: "INTERNAL", message: msg } };
}

const { IPC, MODE } = require("../shared/constants.js");

/**
 * @param {object} services
 * @param {import('./database').Database} services.db
 * @param {import('./window-manager').WindowManager} services.windowManager
 * @param {import('./llm-service').LLMService} services.llmService
 * @param {import('./task-service').TaskService} services.taskService
 * @param {import('./relationship-service').RelationshipService} services.relationshipService
 * @param {import('./pomodoro-service').PomodoroService} [services.pomodoroService]
 * @param {import('./narrative-engine').NarrativeEngine} [services.narrativeEngine]
 * @param {object} deps
 * @param {Electron.IpcMain} deps.ipcMain
 * @param {typeof Electron.BrowserWindow} deps.BrowserWindow
 */
function registerIpcHandlers(services, deps) {
	const { ipcMain, BrowserWindow } = deps;
	const { db, windowManager, llmService, taskService, relationshipService } =
		services;

	// ── Conversation ──
	ipcMain.handle(IPC.CONVERSATION_SEND, async (event, { message, enableTaskCreation }) => {
		try {
			const win = BrowserWindow.fromWebContents(event.sender);
			llmService.chat(
				{ message, enableTaskCreation },
				(chunk) => {
					if (!win.isDestroyed())
						win.webContents.send(IPC.CONVERSATION_CHUNK, { chunk });
				},
				(fullText, metadata) => {
					if (!win.isDestroyed())
						win.webContents.send(IPC.CONVERSATION_DONE, {
							fullText,
							...metadata,
						});
				},
				(err) => {
					if (!win.isDestroyed())
						win.webContents.send(IPC.CONVERSATION_ERROR, {
							code: err.type === "network" ? "LLM_NETWORK" : "LLM_API",
							message: err.message,
						});
				},
			);
			return { ok: true, data: { streaming: true } };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.CONVERSATION_GET_HISTORY, () => {
		try {
			const conv = db.getActiveConversation();
			return { ok: true, data: { messages: conv.messages } };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.CONVERSATION_ABORT, () => {
		try {
			llmService.abort();
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});

	// ── Tasks ──
	ipcMain.handle(IPC.TASK_GET_ALL, (_event, { status } = {}) => {
		try {
			const tasks = status
				? taskService.getActiveTasks()
				: taskService.getAllTasks();
			return { ok: true, data: tasks };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.TASK_GET_BY_ID, (_event, { taskId }) => {
		try {
			const task = taskService.getTaskById(taskId);
			if (!task)
				return {
					ok: false,
					error: {
						code: "TASK_NOT_FOUND",
						message: `Task not found: ${taskId}`,
					},
				};
			return { ok: true, data: task };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.TASK_CREATE, (_event, { data }) => {
		try {
			if (!data?.realTitle || !data.rpgTitle) {
				return {
					ok: false,
					error: {
						code: "TASK_CREATE_INVALID",
						message: "realTitle and rpgTitle are required",
					},
				};
			}
			const task = taskService.createTask(data);
			return { ok: true, data: task };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.TASK_UPDATE, (_event, { taskId, partial }) => {
		try {
			const task = taskService.updateTask(taskId, partial);
			return { ok: true, data: task };
		} catch (e) {
			if (e.message.includes("Task not found")) {
				return {
					ok: false,
					error: { code: "TASK_NOT_FOUND", message: e.message },
				};
			}
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.TASK_TOGGLE_SUBTASK, (_event, { taskId, subtaskId }) => {
		try {
			const task = taskService.toggleSubtask(taskId, subtaskId);
			return { ok: true, data: task };
		} catch (e) {
			if (e.message.includes("Task not found")) {
				return {
					ok: false,
					error: { code: "TASK_NOT_FOUND", message: e.message },
				};
			}
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.TASK_COMPLETE, (_event, { taskId }) => {
		try {
			const result = taskService.completeTask(taskId);
			relationshipService.incrementStat("tasksCompleted");
			const upgrade = relationshipService.checkAndUpgrade();
			return { ok: true, data: { ...result, relationshipUpgrade: upgrade } };
		} catch (e) {
			if (e.message.includes("Task not found")) {
				return {
					ok: false,
					error: { code: "TASK_NOT_FOUND", message: e.message },
				};
			}
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.TASK_DELETE, (_event, { taskId }) => {
		try {
			taskService.deleteTask(taskId);
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});

	// ── App / Mode ──
	ipcMain.handle(IPC.APP_SWITCH_MODE, (_event, { mode }) => {
		try {
			if (![MODE.PET, MODE.WALLPAPER, MODE.SOFTWARE].includes(mode)) {
				return {
					ok: false,
					error: { code: "MODE_INVALID", message: `Invalid mode: ${mode}` },
				};
			}
			if (services.pomodoroService?.isRunning()) {
				services.pomodoroService.stop();
			}
			windowManager.switchMode(mode);
			db.updateAppState({ currentMode: mode });
			const win = windowManager.getCurrentWindow();
			if (win && !win.isDestroyed()) {
				win.webContents.send(IPC.MODE_ACTIVATED, mode);
			}
			return { ok: true, data: { mode } };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.APP_GET_STATE, () => {
		try {
			return { ok: true, data: db.getAppState() };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.APP_GET_CHARACTER, () => {
		try {
			return { ok: true, data: db.getCharacter() };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.APP_GET_RELATIONSHIP, () => {
		try {
			return { ok: true, data: db.getRelationship() };
		} catch (e) {
			return errorResponse(e);
		}
	});

	// ── Pomodoro ──
	ipcMain.handle(IPC.POMODORO_START, (event, { duration, taskId } = {}) => {
		try {
			if (!services.pomodoroService) {
				return {
					ok: false,
					error: {
						code: "INTERNAL",
						message: "Pomodoro service not available",
					},
				};
			}
			const win = BrowserWindow.fromWebContents(event.sender);
			services.pomodoroService.start(duration || 25, {
				taskId,
				onTick(remaining) {
					if (win && !win.isDestroyed())
						win.webContents.send(IPC.POMODORO_TICK, { remaining });
				},
				onEnd() {
					if (win && !win.isDestroyed())
						win.webContents.send(IPC.POMODORO_END, {});
					if (taskId) relationshipService.incrementStat("pomodoros");
					relationshipService.checkAndUpgrade();
				},
				onCancel() {},
			});
			return { ok: true, data: { running: true } };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.POMODORO_STOP, () => {
		try {
			if (services.pomodoroService) {
				services.pomodoroService.stop();
			}
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.POMODORO_GET_STATUS, () => {
		try {
			if (!services.pomodoroService) {
				return { ok: true, data: { running: false, remaining: null } };
			}
			return {
				ok: true,
				data: {
					running: services.pomodoroService.isRunning(),
					remaining: services.pomodoroService.getRemaining(),
					taskId: services.pomodoroService.getCurrentTaskId(),
				},
			};
		} catch (e) {
			return errorResponse(e);
		}
	});

	// ── Settings ──
	ipcMain.handle(IPC.SETTINGS_GET_API_KEY, () => {
		try {
			return { ok: true, data: { apiKey: db.getApiKey() } };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.SETTINGS_SET_API_KEY, (_event, { key }) => {
		try {
			db.setApiKey(key);
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.SETTINGS_GET_WALLPAPER, () => {
		try {
			return { ok: true, data: db.getAppState().wallpaperSettings };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.SETTINGS_UPDATE_WALLPAPER, (_event, { partial }) => {
		try {
			const state = db.getAppState();
			Object.assign(state.wallpaperSettings, partial);
			db.updateAppState({ wallpaperSettings: state.wallpaperSettings });
			return { ok: true, data: state.wallpaperSettings };
		} catch (e) {
			return errorResponse(e);
		}
	});

	// ── Window ──
	ipcMain.handle(IPC.WINDOW_HIDE, () => {
		try {
			const win = windowManager.getCurrentWindow();
			if (win) win.hide();
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle(IPC.WINDOW_CLOSE_MODE, () => {
		try {
			const win = windowManager.getCurrentWindow();
			if (win) win.hide();
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});
}

module.exports = { registerIpcHandlers };
