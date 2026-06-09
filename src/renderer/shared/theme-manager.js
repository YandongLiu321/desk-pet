class ThemeManager {
  constructor() {
    this._themes = ["starry", "forest", "ocean"];
    this._current = "starry";
  }

  async init(ipc) {
    const res = await ipc.getSettings();
    if (res.ok && res.data.theme) {
      this.setTheme(res.data.theme);
    }
  }

  getThemes() {
    return this._themes;
  }

  getCurrentTheme() {
    return this._current;
  }

  setTheme(name) {
    if (!this._themes.includes(name)) return;
    this._current = name;
    document.documentElement.dataset.theme = name;
  }
}

window.ThemeManager = ThemeManager;
