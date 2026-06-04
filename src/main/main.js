const {
	app,
	Tray,
	Menu,
	nativeImage,
	ipcMain,
	BrowserWindow,
} = require("electron");
const path = require("node:path");
const fs = require("node:fs");

const { Database } = require("./database");
const { WindowManager } = require("./window-manager");
const { EditorWindowManager } = require("./editor-window");
const { LLMService } = require("./llm-service");
const { TaskService } = require("./task-service");
const { RelationshipService } = require("./relationship-service");
const { PomodoroService } = require("./pomodoro-service");
const { NarrativeEngine } = require("./narrative-engine");
const { ProactiveTrigger } = require("./proactive-trigger");
const { UserStyleAnalyzer } = require("./user-style-analyzer");
const { registerIpcHandlers } = require("./ipc-handlers");
const { IPC, MODE } = require("../shared/constants.js");

/** @type {Database} */
let db;
/** @type {WindowManager} */
let windowManager;
/** @type {Tray|null} */
let tray = null;

/**
 * Single authoritative mode-switch implementation.
 * Used by tray menu, IPC handler, and window close handlers.
 * @param {'pet'|'wallpaper'|'software'} mode
 */
function switchModeWithCleanup(mode) {
	if (_llmService) _llmService.abort();
	if (_pomodoroService?.isRunning()) _pomodoroService.cancel();
	windowManager.switchMode(mode);
	db.updateAppState({ currentMode: mode });
	const win = windowManager.getCurrentWindow();
	if (win && !win.isDestroyed()) {
		win.webContents.send(IPC.MODE_ACTIVATED, { mode });
	}
}

/** @type {import('./llm-service').LLMService} */
let _llmService;
/** @type {import('./pomodoro-service').PomodoroService} */
let _pomodoroService;

function createTray() {
	const iconPath = path.join(
		__dirname,
		"..",
		"..",
		"assets",
		"ui",
		"tray-icon.png",
	);
	let icon;
	if (fs.existsSync(iconPath)) {
		icon = nativeImage
			.createFromPath(iconPath)
			.resize({ width: 16, height: 16 });
	} else {
		icon = nativeImage.createEmpty();
	}

	tray = new Tray(icon);
	tray.setToolTip("Desk Pet — 露娜·月语");

	const contextMenu = Menu.buildFromTemplate([
		{
			label: "桌宠模式",
			type: "normal",
			click: () => switchModeWithCleanup(MODE.PET),
		},
		{
			label: "壁纸模式",
			type: "normal",
			click: () => switchModeWithCleanup(MODE.WALLPAPER),
		},
		{
			label: "软件模式",
			type: "normal",
			click: () => switchModeWithCleanup(MODE.SOFTWARE),
		},
		{ type: "separator" },
		{
			label: "壁纸编辑器",
			type: "normal",
			click: () => { if (editorWindowManager) editorWindowManager.open(); },
		},
		{ type: "separator" },
		{ label: "退出", type: "normal", click: () => app.quit() },
	]);
	tray.setContextMenu(contextMenu);
	tray.on("click", () => switchModeWithCleanup(MODE.PET));
}

function loadWorldBook() {
	const wbPath = path.join(
		__dirname,
		"..",
		"..",
		"assets",
		"worldbooks",
		"default.json",
	);
	try {
		return JSON.parse(fs.readFileSync(wbPath, "utf-8"));
	} catch {
		return {
			worldId: "default",
			title: "未知世界",
			description: "",
			rules: [],
			character: {
				id: "default",
				name: "角色",
				personality: "",
				background: "",
				speechStyle: "",
			},
			storyChapters: [],
		};
	}
}

app.whenReady().then(() => {
	db = new Database(path.join(__dirname, "..", "..", "data", "db.json"));
	const worldBook = loadWorldBook();

	const apiKey = db.getApiKey();
	const llmService = new LLMService({ apiKey, db, worldBook });
	_llmService = llmService;
	const taskService = new TaskService({ db, worldBook });
	const relationshipService = new RelationshipService(db);
	const pomodoroService = new PomodoroService();
	_pomodoroService = pomodoroService;
	const narrativeEngine = new NarrativeEngine(llmService);
	const proactiveTrigger = new ProactiveTrigger();
	const _userStyleAnalyzer = new UserStyleAnalyzer();

	const preloadPath = path.join(__dirname, "..", "preload.js");
	windowManager = new WindowManager(preloadPath, switchModeWithCleanup);
	const editorWindowManager = new EditorWindowManager(preloadPath);

	registerIpcHandlers(
		{
			db,
			windowManager,
			llmService,
			taskService,
			relationshipService,
			pomodoroService,
			narrativeEngine,
			worldBook,
			switchModeWithCleanup,
			editorWindowManager,
		},
		{ ipcMain, BrowserWindow },
	);

	createTray();
	proactiveTrigger.start();
	switchModeWithCleanup(MODE.PET);
});

app.on("window-all-closed", () => {});

app.on("before-quit", () => {
	if (windowManager) windowManager.closeAll();
});

app.on("activate", () => {
	if (windowManager) switchModeWithCleanup(MODE.PET);
});
