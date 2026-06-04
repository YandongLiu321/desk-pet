const { BrowserWindow } = require("electron");
const path = require("node:path");

class EditorWindowManager {
	constructor(preloadPath) {
		this._preloadPath = preloadPath;
		this._win = null;
	}

	open() {
		if (this._win && !this._win.isDestroyed()) {
			this._win.focus();
			return this._win;
		}
		this._win = new BrowserWindow({
			width: 1280,
			height: 900,
			minWidth: 960,
			minHeight: 600,
			title: "Wallpaper Editor",
			webPreferences: {
				preload: this._preloadPath,
				nodeIntegration: false,
				contextIsolation: true,
				sandbox: false,
			},
		});
		const htmlPath = path.join(__dirname, "..", "renderer", "editor", "index.html");
		this._win.loadFile(htmlPath);
		this._win.setMenuBarVisibility(false);
		this._win.on("closed", () => { this._win = null; });
		return this._win;
	}

	close() {
		if (this._win && !this._win.isDestroyed()) this._win.close();
	}

	getWindow() {
		return this._win;
	}
}

module.exports = { EditorWindowManager };
