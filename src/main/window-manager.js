const { BrowserWindow } = require("electron");
const path = require("node:path");

/** @type {Record<string, Electron.BrowserWindowConstructorOptions>} */
const WINDOW_CONFIG = {
	pet: {
		width: 300,
		height: 400,
		transparent: true,
		frame: false,
		alwaysOnTop: true,
		resizable: false,
		skipTaskbar: true,
	},
	wallpaper: {
		fullscreen: true,
		transparent: true,
		frame: false,
		alwaysOnTop: false,
		resizable: false,
		skipTaskbar: true,
	},
	software: {
		width: 1280,
		height: 800,
		transparent: false,
		frame: true,
		alwaysOnTop: false,
		resizable: true,
		skipTaskbar: false,
	},
};

class WindowManager {
	/**
	 * @param {string} preloadPath - absolute path to preload.js
	 */
	constructor(preloadPath) {
		this.preloadPath = preloadPath;
		/** @type {Map<string, BrowserWindow>} */
		this._windows = new Map();
		this._currentMode = null;
	}

	/**
	 * @param {'pet'|'wallpaper'|'software'} mode
	 * @returns {BrowserWindow}
	 */
	getOrCreateWindow(mode) {
		if (this._windows.has(mode)) return this._windows.get(mode);

		const config = { ...WINDOW_CONFIG[mode] };
		const win = new BrowserWindow({
			...config,
			webPreferences: {
				preload: this.preloadPath,
				nodeIntegration: false,
				contextIsolation: true,
				sandbox: false,
			},
			show: false,
		});

		const htmlPath = path.join(__dirname, "..", "renderer", mode, "index.html");
		win.loadFile(htmlPath);
		win.setMenuBarVisibility(false);

		if (mode === "pet") {
			win.setAlwaysOnTop(true, "screen-saver");
			win.setVisibleOnAllWorkspaces(true);
			const { x, y } = config;
			if (x !== undefined && y !== undefined) {
				win.setIgnoreMouseEvents(true, { forward: true });
			}
		}

		if (mode === "wallpaper") {
			win.setAlwaysOnTop(false);
		}

		win.on("close", (e) => {
			e.preventDefault();
			win.hide();
		});

		this._windows.set(mode, win);
		return win;
	}

	/**
	 * @param {'pet'|'wallpaper'|'software'} targetMode
	 */
	switchMode(targetMode) {
		const current = this._currentMode;
		if (current && this._windows.has(current)) {
			this._windows.get(current).hide();
		}

		const win = this.getOrCreateWindow(targetMode);
		win.show();
		if (targetMode === "wallpaper") {
			win.focus();
			win.setAlwaysOnTop(false);
		}
		this._currentMode = targetMode;
	}

	/** @returns {'pet'|'wallpaper'|'software'|null} */
	getCurrentMode() {
		return this._currentMode;
	}

	/** @returns {BrowserWindow|null} */
	getCurrentWindow() {
		if (!this._currentMode) return null;
		return this._windows.get(this._currentMode) || null;
	}

	/**
	 * @param {'pet'|'wallpaper'|'software'} mode
	 * @returns {BrowserWindow|null}
	 */
	getWindow(mode) {
		return this._windows.get(mode) || null;
	}

	closeAll() {
		for (const win of this._windows.values()) {
			win.destroy();
		}
		this._windows.clear();
		this._currentMode = null;
	}
}

module.exports = { WindowManager, WINDOW_CONFIG };
