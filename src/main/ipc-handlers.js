/** @param {Error | string} err */
function errorResponse(err) {
	const msg = typeof err === "string" ? err : err.message;
	return { ok: false, error: { code: "INTERNAL", message: msg } };
}

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
	ipcMain.handle("conversation:send", async (event, { message }) => {
		try {
			const win = BrowserWindow.fromWebContents(event.sender);
			llmService.chat(
				{ message },
				(chunk) => {
					if (!win.isDestroyed())
						win.webContents.send("conversation:chunk", { chunk });
				},
				(fullText, metadata) => {
					if (!win.isDestroyed())
						win.webContents.send("conversation:done", {
							fullText,
							...metadata,
						});
				},
				(err) => {
					if (!win.isDestroyed())
						win.webContents.send("conversation:error", {
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

	ipcMain.handle("conversation:get-history", () => {
		try {
			const conv = db.getActiveConversation();
			return { ok: true, data: { messages: conv.messages } };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle("conversation:abort", () => {
		try {
			llmService.abort();
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});

	// ── Tasks ──
	ipcMain.handle("task:get-all", (_event, { status } = {}) => {
		try {
			const tasks = status
				? taskService.getActiveTasks()
				: taskService.getAllTasks();
			return { ok: true, data: tasks };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle("task:get-by-id", (_event, { taskId }) => {
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

	ipcMain.handle("task:create", (_event, { data }) => {
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

	ipcMain.handle("task:update", (_event, { taskId, partial }) => {
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

	ipcMain.handle("task:toggle-subtask", (_event, { taskId, subtaskId }) => {
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

	ipcMain.handle("task:complete", (_event, { taskId }) => {
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

	ipcMain.handle("task:delete", (_event, { taskId }) => {
		try {
			taskService.deleteTask(taskId);
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});

	// ── App / Mode ──
	ipcMain.handle("app:switch-mode", (_event, { mode }) => {
		try {
			if (!["pet", "wallpaper", "software"].includes(mode)) {
				return {
					ok: false,
					error: { code: "MODE_INVALID", message: `Invalid mode: ${mode}` },
				};
			}
			windowManager.switchMode(mode);
			db.updateAppState({ currentMode: mode });
			const win = windowManager.getCurrentWindow();
			if (win && !win.isDestroyed()) {
				win.webContents.send("mode:activated", mode);
			}
			return { ok: true, data: { mode } };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle("app:get-state", () => {
		try {
			return { ok: true, data: db.getAppState() };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle("app:get-character", () => {
		try {
			return { ok: true, data: db.getCharacter() };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle("app:get-relationship", () => {
		try {
			return { ok: true, data: db.getRelationship() };
		} catch (e) {
			return errorResponse(e);
		}
	});

	// ── Pomodoro ──
	ipcMain.handle("pomodoro:start", (event, { duration, taskId } = {}) => {
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
						win.webContents.send("pomodoro:tick", { remaining });
				},
				onEnd() {
					if (win && !win.isDestroyed())
						win.webContents.send("pomodoro:end", {});
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

	ipcMain.handle("pomodoro:stop", () => {
		try {
			if (services.pomodoroService) {
				services.pomodoroService.stop();
			}
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle("pomodoro:get-status", () => {
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
	ipcMain.handle("settings:get-api-key", () => {
		try {
			return { ok: true, data: { apiKey: db.getApiKey() } };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle("settings:set-api-key", (_event, { key }) => {
		try {
			db.setApiKey(key);
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle("settings:get-wallpaper", () => {
		try {
			return { ok: true, data: db.getAppState().wallpaperSettings };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle("settings:update-wallpaper", (_event, { partial }) => {
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
	ipcMain.handle("window:hide", () => {
		try {
			const win = windowManager.getCurrentWindow();
			if (win) win.hide();
			return { ok: true, data: null };
		} catch (e) {
			return errorResponse(e);
		}
	});

	ipcMain.handle("window:close-mode", () => {
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
