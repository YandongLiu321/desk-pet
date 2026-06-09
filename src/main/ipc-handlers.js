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
const path = require("node:path");
const fs = require("node:fs");
const { pathToFileURL } = require("node:url");
const { WallpaperEngineLoader } = require("./we-asset-loader");

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

	ipcMain.handle(IPC.TASK_GET_MODE, (_event, { taskId }) => runSafe(() => {
		if (!taskService.classifier) return null;
		return taskService.classifier.getMode(taskId);
	}));

	ipcMain.handle(IPC.TASK_UPDATE_PROGRESS, (_event, { taskId, percent, note }) => runTask(() => {
		return taskService.updateProgress(taskId, percent, note);
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

	ipcMain.handle(IPC.SETTINGS_GET_AUDIO_CONFIG, () => runSafe(() => {
		const state = db.getAppState();
		const tracks = [];
		if (services.worldBook?.audio?.tracks) {
			for (const track of services.worldBook.audio.tracks) {
				const filePath = path.join(__dirname, "..", "..", "assets", "audio", track.file);
				tracks.push({
					id: track.id,
					name: track.name,
					url: pathToFileURL(filePath).href,
				});
			}
		}
		return {
			tracks,
			soundVolume: state.wallpaperSettings?.soundVolume ?? 0.5,
		};
	}));


	// ── Settings (complete) ──
	ipcMain.handle(IPC.SETTINGS_GET, () => runSafe(() => db.getSettings()));

	ipcMain.handle(IPC.SETTINGS_SET, (_event, { partial }) => runSafe(() => {
		const updated = db.updateSettings(partial);
		// Broadcast to all windows
		BrowserWindow.getAllWindows().forEach((w) => {
			if (!w.isDestroyed()) w.webContents.send(IPC.SETTINGS_CHANGED, updated);
		});
		return updated;
	}));

	ipcMain.handle(IPC.THEME_GET, () => runSafe(() => db.getSettings().theme));

	ipcMain.handle(IPC.THEME_SET, (_event, { theme }) => runSafe(() => {
		const updated = db.updateSettings({ theme });
		BrowserWindow.getAllWindows().forEach((w) => {
			if (!w.isDestroyed()) w.webContents.send(IPC.SETTINGS_CHANGED, updated);
		});
		return updated;
	}));
	// ── Wallpaper Engine ──
	const weLoader = new WallpaperEngineLoader();
	const projectRoot = path.join(__dirname, "..", "..");

	ipcMain.handle(IPC.WALLPAPER_LOAD_WE, (_event, { dirName }) => runSafe(() => {
		const weDir = path.join(projectRoot, dirName);
		const result = weLoader.load(weDir);
		if (!result.ok) throw new Error(result.error);
		return result.data;
	}));

	ipcMain.handle(IPC.WALLPAPER_LIST_WE, () => runSafe(() => {
		const entries = fs.readdirSync(projectRoot, { withFileTypes: true });
		const wallpapers = [];
		for (const entry of entries) {
			if (!entry.isDirectory()) continue;
			const pkgPath = path.join(projectRoot, entry.name, "scene.pkg");
			const projPath = path.join(projectRoot, entry.name, "project.json");
			if (fs.existsSync(pkgPath) && fs.existsSync(projPath)) {
				try {
					const meta = JSON.parse(fs.readFileSync(projPath, "utf-8"));
					wallpapers.push({
						dirName: entry.name,
						title: meta.title || entry.name,
						workshopId: meta.workshopid || null,
						type: meta.type || null,
					});
				} catch {
					wallpapers.push({ dirName: entry.name, title: entry.name, workshopId: null, type: null });
				}
			}
		}
		return wallpapers;
	}));

	// ── Scene ──
	ipcMain.handle(IPC.SCENE_GET, () => runSafe(() => {
		const state = db.getAppState();
		return { wallpaperDir: state.wallpaperSettings?.weWallpaperDir || null };
	}));

	ipcMain.handle(IPC.SCENE_SAVE, (_event, { filePath, data }) => runSafe(() => {
		const savePath = filePath || path.join(projectRoot, "data", "scenes", "current.dp-scene.json");
		const dir = path.dirname(savePath);
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		fs.writeFileSync(savePath, JSON.stringify(data, null, 2), "utf-8");
		return { saved: true, path: savePath };
	}));

	// ── Editor ──
	ipcMain.handle(IPC.EDITOR_OPEN, () => runSafe(() => {
		if (services.editorWindowManager) {
			services.editorWindowManager.open();
		}
		return { ok: true };
	}));

	ipcMain.handle(IPC.EDITOR_APPLY, (_event, { sceneData }) => runSafe(() => {
		const wallpaperWin = windowManager.getWindow("wallpaper");
		if (wallpaperWin && !wallpaperWin.isDestroyed()) {
			wallpaperWin.webContents.send(IPC.EDITOR_APPLY, { sceneData });
		}
		return { ok: true };
	}));

	ipcMain.handle(IPC.EDITOR_UPDATE_PROPERTY, (_event, { node, prop, value }) => runSafe(() => {
		const wallpaperWin = windowManager.getWindow("wallpaper");
		if (wallpaperWin && !wallpaperWin.isDestroyed()) {
			wallpaperWin.webContents.send(IPC.EDITOR_UPDATE_PROPERTY, { node, prop, value });
		}
		return { ok: true };
	}));

	// ── Proactive ──
	ipcMain.handle(IPC.PROACTIVE_GET_STATE, () => runSafe(() => ({
		lastTriggerAt: services.proactiveService ? services.proactiveService._lastTriggerAt : 0,
		lastInteractionAt: services.proactiveService ? services.proactiveService._lastInteractionAt : 0,
	})));

	ipcMain.handle(IPC.PROACTIVE_SET_CONFIG, (_event, { partial }) => runSafe(() => {
		return db.updateSettings(Object.assign(db.getSettings(), partial));
	}));

	ipcMain.on(IPC.PROACTIVE_TRIGGER, () => {
		if (services.proactiveService) {
			services.proactiveService.markInteraction();
		}
	});

	// ── Memory ──
	ipcMain.handle(IPC.MEMORY_LIST, () => runSafe(() => services.memoryService ? db.getMemories() : []));

	ipcMain.handle(IPC.MEMORY_SEARCH, (_event, { query, limit }) => runSafe(() => {
		if (!services.memoryService) return [];
		return services.memoryService.getRelevantMemories(query, limit || 5);
	}));

	ipcMain.handle(IPC.MEMORY_DELETE, (_event, { memId }) => runSafe(() => {
		db.deleteMemory(memId);
		return null;
	}));

	ipcMain.handle(IPC.MEMORY_CLEAR, () => runSafe(() => {
		db.clearMemories();
		return null;
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

	ipcMain.handle(IPC.WINDOW_SET_IGNORE_MOUSE_EVENTS, (event, { ignore, forward }) => {
		const win = BrowserWindow.fromWebContents(event.sender);
		if (win && !win.isDestroyed()) {
			win.setIgnoreMouseEvents(ignore, { forward: !!forward });
		}
		return { ok: true, data: null };
	});
}

module.exports = { registerIpcHandlers };
