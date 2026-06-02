const { BrowserWindow } = require("electron");
const path = require("node:path");

/** @type {Record<string, Electron.BrowserWindowConstructorOptions>} */
const WINDOW_CONFIG = {
	pet: {
		width: 500,
		height: 500,
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
	 * @param {(mode: string) => void} onSwitchToPet - callback for close handlers (cleanup + switch)
	 */
	constructor(preloadPath, onSwitchToPet) {
		this.preloadPath = preloadPath;
		this._onSwitchToPet = onSwitchToPet || (() => {});
		/** @type {Map<string, BrowserWindow>} */
		this._windows = new Map();
		this._currentMode = null;
		this._switching = false;
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
			win.setIgnoreMouseEvents(false);
		}

		if (mode === "wallpaper") {
			win.setAlwaysOnTop(false);
		}

		// Close handlers
		if (mode === "pet") {
			win.on("close", (e) => {
				e.preventDefault();
				win.hide();
			});
		} else {
			// software / wallpaper: close → return to pet mode with cleanup
			win.on("close", (e) => {
				e.preventDefault();
				if (this._switching) return;
				this._switching = true;
				this._onSwitchToPet("pet");
				this._switching = false;
			});
		}

		this._windows.set(mode, win);
		return win;
	}

	/**
	 * @param {'pet'|'wallpaper'|'software'} targetMode
	 */
	switchMode(targetMode) {
		const current = this._currentMode;
		if (current && current !== targetMode && this._windows.has(current)) {
			this._switching = true;
			this._windows.get(current).hide();
			this._switching = false;
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
