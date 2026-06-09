# Desk-Pet Phase 1 视觉与功能改进 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在保留现有全部功能的前提下，实现打字机字幕、毛玻璃输入框、主题配色系统、点击穿透、设置界面、增强托盘菜单 6 项改进。

**Architecture:** 渐进式实现——从 CSS 变量系统（主题）开始，逐步叠加点击穿透、打字机、毛玻璃、托盘菜单，最后建设置窗口。每一步可独立验证。IPC 保持 `{ ok, data }` / `{ ok, error }` 模式，lowdb 只增字段不删不改。

**Tech Stack:** Electron 42, vanilla HTML/CSS/JS, lowdb 7, Live2D Cubism SDK 4, WebGL2

---

### Task 1: 新增 IPC 常量和数据库字段

**Files:**
- Modify: `src/shared/constants.js:38-62`
- Modify: `src/main/database.js:48-63`

- [ ] **Step 1: 在 constants.js 中新增 settings 和 theme IPC channels**

在 `IPC` 对象中，替换现有的 settings 部分并新增：

```js
// Settings (完整)
SETTINGS_GET: "settings:get",
SETTINGS_SET: "settings:set",
SETTINGS_GET_API_KEY: "settings:get-api-key",
SETTINGS_SET_API_KEY: "settings:set-api-key",
SETTINGS_GET_WALLPAPER: "settings:get-wallpaper",
SETTINGS_UPDATE_WALLPAPER: "settings:update-wallpaper",
SETTINGS_GET_AUDIO_CONFIG: "settings:get-audio-config",
SETTINGS_CHANGED: "settings:changed",

// Theme
THEME_GET: "theme:get",
THEME_SET: "theme:set",

// Window control
WINDOW_SET_IGNORE_MOUSE_EVENTS: "window:set-ignore-mouse-events",
```

保留已有的 `WINDOW_HIDE`, `WINDOW_CLOSE_MODE`, `WINDOW_MOVE_BY`，新增 `WINDOW_SET_IGNORE_MOUSE_EVENTS`。

- [ ] **Step 2: 在 database.js 的 _defaults() 中新增 settings 对象**

在 `_defaults()` 返回对象的 `appState` 中新增 `settings` 字段：

```js
appState: {
  currentMode: "pet",
  petWindowBounds: { x: 1000, y: 600, width: 500, height: 500 },
  characterPosition: { x: 240, y: 20, width: 120, height: 120 },
  wallpaperSettings: {
    opacity: 0.85,
    characterPosition: "right",
    soundVolume: 0.5,
    weWallpaperDir: null,
  },
  pomodoro: null,
  apiKey: "",
  settings: {
    theme: "starry",
    subtitleEnabled: true,
    typewriterSpeed: 35,
    bubbleAutoHideMs: 0,
    clickThrough: true,
    alwaysOnTop: true,
    mute: false,
    pomodoroWorkDuration: 25,
    pomodoroShortBreak: 5,
    pomodoroLongBreak: 15,
    pomodoroLongBreakInterval: 4,
  },
},
```

新增便捷方法 `getSettings()` 和 `updateSettings(partial)`：

```js
getSettings() {
  this._load();
  return this._data.appState.settings;
}

updateSettings(partial) {
  this._load();
  Object.assign(this._data.appState.settings, partial);
  this._persist();
  return this._data.appState.settings;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/constants.js src/main/database.js
git commit -m "feat: add settings/theme IPC channels and database fields"
```

---

### Task 2: 主题配色系统 — CSS 变量重写

**Files:**
- Rewrite: `src/renderer/shared/styles/variables.css`
- Create: `src/renderer/shared/theme-manager.js`

- [ ] **Step 1: 重写 variables.css**

将整个文件替换为完整的主题 token 系统：

```css
/* ===== Design Tokens ===== */
:root {
  --font-xs: 10px;
  --font-sm: 12px;
  --font-base: 14px;
  --font-lg: 16px;
  --font-xl: 20px;
  --font-2xl: 28px;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-round: 50%;

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);

  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;

  --font-main: "Segoe UI", "Microsoft YaHei", system-ui, sans-serif;
  --font-mono: "Cascadia Code", "Fira Code", "Consolas", monospace;

  --win-pet-width: 500px;
  --win-pet-height: 500px;
  --win-software-width: 1280px;
  --win-software-height: 800px;

  --char-pet-size: 120px;
  --char-wallpaper-size: 200px;
  --char-software-size: 160px;
}

/* ===== Theme: Starry (default 暗紫星空) ===== */
:root, [data-theme="starry"] {
  --color-bg-primary: #0a0e17;
  --color-bg-secondary: #111827;
  --color-bg-tertiary: #1a1f2e;
  --color-bg-glass: rgba(17, 24, 39, 0.75);

  --color-text-primary: #e2e8f0;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;

  --color-accent: #7c3aed;
  --color-accent-light: #a78bfa;
  --color-accent-glow: rgba(124, 58, 237, 0.4);

  --color-bubble-bg: rgba(30, 41, 59, 0.85);
  --color-border: rgba(148, 163, 184, 0.12);
  --color-border-light: rgba(148, 163, 184, 0.2);

  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  --color-input-bg: rgba(255, 255, 255, 0.06);
  --color-input-border: rgba(255, 255, 255, 0.1);
}

/* ===== Theme: Forest (深绿森系) ===== */
[data-theme="forest"] {
  --color-bg-primary: #0a1a0f;
  --color-bg-secondary: #0f2216;
  --color-bg-tertiary: #162e1f;
  --color-bg-glass: rgba(15, 34, 22, 0.75);

  --color-text-primary: #e8f0e8;
  --color-text-secondary: #a0c0a0;
  --color-text-muted: #608060;

  --color-accent: #22c55e;
  --color-accent-light: #4ade80;
  --color-accent-glow: rgba(34, 197, 94, 0.4);

  --color-bubble-bg: rgba(20, 40, 28, 0.85);
  --color-border: rgba(160, 192, 160, 0.12);
  --color-border-light: rgba(160, 192, 160, 0.2);

  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  --color-input-bg: rgba(255, 255, 255, 0.05);
  --color-input-border: rgba(255, 255, 255, 0.08);
}

/* ===== Theme: Ocean (深蓝海洋) ===== */
[data-theme="ocean"] {
  --color-bg-primary: #0a0e2e;
  --color-bg-secondary: #0f1638;
  --color-bg-tertiary: #162048;
  --color-bg-glass: rgba(15, 22, 56, 0.75);

  --color-text-primary: #e0e8f8;
  --color-text-secondary: #a0b8d8;
  --color-text-muted: #607898;

  --color-accent: #3b82f6;
  --color-accent-light: #60a5fa;
  --color-accent-glow: rgba(59, 130, 246, 0.4);

  --color-bubble-bg: rgba(20, 30, 56, 0.85);
  --color-border: rgba(160, 184, 216, 0.12);
  --color-border-light: rgba(160, 184, 216, 0.2);

  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  --color-input-bg: rgba(255, 255, 255, 0.05);
  --color-input-border: rgba(255, 255, 255, 0.08);
}

/* ===== Legacy aliases (向后兼容) ===== */
:root {
  --color-primary: var(--color-accent);
  --color-primary-light: var(--color-accent-light);
  --color-bg-darkest: var(--color-bg-primary);
  --color-bg-dark: var(--color-bg-secondary);
  --color-bg-medium: var(--color-bg-tertiary);
  --color-bg-light: var(--color-bg-tertiary);
}
```

- [ ] **Step 2: 创建 theme-manager.js**

```js
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
```

- [ ] **Step 3: Commit**

```bash
git add src/renderer/shared/styles/variables.css src/renderer/shared/theme-manager.js
git commit -m "feat: add 3-theme CSS token system and ThemeManager"
```

---

### Task 3: 主题系统 — IPC 和 Preload 层

**Files:**
- Modify: `src/main/ipc-handlers.js:150-160`
- Modify: `src/preload.js:113-129`
- Modify: `src/renderer/shared/ipc-client.js:125-140`

- [ ] **Step 1: 在 ipc-handlers.js 中新增 settings:get / settings:set / theme:get / theme:set handlers**

在现有的 `SETTINGS_UPDATE_WALLPAPER` handler 之后新增：

```js
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
```

- [ ] **Step 2: 在 preload.js 的 settings 块中新增方法**

在现有 `settings` 块中追加：

```js
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
```

- [ ] **Step 3: 在 ipc-client.js 的 Settings 部分新增方法**

在 `IpcClient` 类的 Settings 部分追加：

```js
async getSettings() {
  return this._call("settings.getAll");
}
async updateSettings(partial) {
  return this._call("settings.update", partial);
}
async getTheme() {
  return this._call("settings.getTheme");
}
async setTheme(theme) {
  return this._call("settings.setTheme", theme);
}
onSettingsChanged(cb) {
  return this.api?.settings.onChanged?.(cb);
}
```

- [ ] **Step 4: Commit**

```bash
git add src/main/ipc-handlers.js src/preload.js src/renderer/shared/ipc-client.js
git commit -m "feat: add settings/theme IPC handlers and preload APIs"
```

---

### Task 4: 主题系统 — 集成到所有模式入口

**Files:**
- Modify: `src/renderer/pet/index.html` (script 部分)
- Modify: `src/renderer/wallpaper/index.html` (script 部分)
- Modify: `src/renderer/software/index.html` (需要读取)

- [ ] **Step 1: 在 pet/index.html 中加载 theme-manager 并在初始化时设置主题**

在 script 标签引用部分，新增 theme-manager.js 的引用：
```html
<script src="../shared/theme-manager.js"></script>
```

在 IIFE 开始处（`const { IpcClient...` 之后）新增初始化：
```js
const { IpcClient, CharacterRenderer, ConversationPanel, TaskPanel, ThemeManager } = window;
const themeManager = new ThemeManager();
themeManager.init(ipc);

// 监听 settings 变更以同步主题
ipc.onSettingsChanged((settings) => {
  if (settings.theme) themeManager.setTheme(settings.theme);
});
```

- [ ] **Step 2: 在 wallpaper/index.html 中做相同集成**

在 script 引用部分新增 theme-manager.js 引用，在 IIFE 初始化部分新增相同的 ThemeManager 初始化代码。

- [ ] **Step 3: 在 software/index.html 中做相同集成**

先读取 `src/renderer/software/index.html` 确认 script 引用位置，然后新增 theme-manager.js 引用和相同的初始化代码。

- [ ] **Step 4: Commit**

```bash
git add src/renderer/pet/index.html src/renderer/wallpaper/index.html src/renderer/software/index.html
git commit -m "feat: integrate ThemeManager into all mode windows"
```

---

### Task 5: 点击穿透

**Files:**
- Modify: `src/renderer/shared/styles/base.css:12-22`
- Modify: `src/renderer/pet/index.html:8-17` (body 样式)
- Modify: `src/renderer/pet/index.html` (script: 面板开关逻辑)

- [ ] **Step 1: 在 base.css 中添加点击穿透基础样式**

在 `base.css` 的 body 规则后新增：

```css
/* Click-through: pet 模式默认穿透，仅交互区域响应鼠标 */
body.pet-mode {
  pointer-events: none;
}

body.pet-mode .pet-char-area,
body.pet-mode .pet-bubble,
body.pet-mode .pet-conv-container,
body.pet-mode .pet-context-menu,
body.pet-mode .pet-task-panel {
  pointer-events: auto;
}

/* 面板展开时整个 body 恢复交互 */
body.pet-mode.interactive {
  pointer-events: auto;
}
```

- [ ] **Step 2: 在 pet/index.html 的 body 上添加 pet-mode class**

将 `<body>` 改为 `<body class="pet-mode">`

- [ ] **Step 3: 在 pet/index.html 的 panel toggle 逻辑中添加 .interactive 切换**

修改 `charArea` 的 `click` handler，在切换 panel 时同步切换 `.interactive`：

```js
charArea.addEventListener("click", (e) => {
  if (wasLongPress) return;
  e.stopPropagation();
  setTaskMode(false);
  const convOpen = convContainer.classList.toggle("open");
  taskPanelContainer.classList.remove("open");
  // Toggle interactive mode based on whether any panel is open
  if (convOpen) {
    document.body.classList.add("interactive");
  } else {
    document.body.classList.remove("interactive");
  }
  charRenderer.setMotion("bounce");
  setTimeout(() => charRenderer.setMotion("idle"), 300);
  loadTasks();
});
```

修改 `closeAll()` 函数，同时移除 `.interactive`：

```js
function closeAll() {
  document.getElementById("convContainer").classList.remove("open");
  document.getElementById("taskPanel").classList.remove("open");
  document.getElementById("contextMenu").classList.remove("open");
  document.body.classList.remove("interactive");
  hideBubble();
  setTaskMode(false);
}
```

修改上下文菜单的 task action：

```js
if (action === "tasks") {
  const taskOpen = taskPanelContainer.classList.toggle("open");
  convContainer.classList.remove("open");
  if (taskOpen) {
    document.body.classList.add("interactive");
  } else {
    document.body.classList.remove("interactive");
  }
}
```

- [ ] **Step 4: 在 main process 的 pet 窗口创建处设置 setIgnoreMouseEvents**

需要读取 window-manager.js 中 pet 窗口的创建代码。在 pet 窗口创建后调用：

```js
petWin.setIgnoreMouseEvents(true, { forward: true });
```

当 renderer 需要恢复完整鼠标交互时，通过 IPC `WINDOW_SET_IGNORE_MOUSE_EVENTS` 发送指令。

在 `ipc-handlers.js` 中新增：

```js
ipcMain.handle(IPC.WINDOW_SET_IGNORE_MOUSE_EVENTS, (event, { ignore, forward }) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win && !win.isDestroyed()) {
    win.setIgnoreMouseEvents(ignore, { forward: !!forward });
  }
  return { ok: true, data: null };
});
```

在 preload.js 的 window 块中新增：

```js
setIgnoreMouseEvents(ignore, forward) {
  return ipcRenderer.invoke(IPC.WINDOW_SET_IGNORE_MOUSE_EVENTS, { ignore, forward });
},
```

在 pet/index.html 中，当 `.interactive` 被添加/移除时调用：

```js
// 添加到 closeAll() 和其他切换处：
if (convOpen || taskOpen) {
  ipc._call("window.setIgnoreMouseEvents", false, true);
} else {
  ipc._call("window.setIgnoreMouseEvents", true, true);
}
```

- [ ] **Step 5: Commit**

```bash
git add src/renderer/shared/styles/base.css src/renderer/pet/index.html src/main/ipc-handlers.js src/preload.js src/main/window-manager.js
git commit -m "feat: implement click-through with .interactive toggle"
```

---

### Task 6: 打字机字幕 — TypewriterController

**Files:**
- Create: `src/renderer/shared/typewriter-controller.js`
- Modify: `src/renderer/shared/styles/animations.css`

- [ ] **Step 1: 创建 TypewriterController 类**

```js
class TypewriterController {
  /**
   * @param {HTMLElement} element - 显示字幕的 DOM 元素
   * @param {object} [options]
   * @param {number} [options.speed] - 每字间隔 ms，默认 35
   * @param {string} [options.cursorChar] - 光标字符，默认 '▍'
   * @param {boolean} [options.showCursor] - 是否显示光标，默认 true
   * @param {Function} [options.onChar] - 每输出一个字时回调，用于 Live2D 嘴部同步
   */
  constructor(element, options = {}) {
    this._el = element;
    this._speed = options.speed || 35;
    this._cursorChar = options.cursorChar || '▍';
    this._showCursor = options.showCursor !== false;
    this._onChar = options.onChar || null;

    this._writeBuffer = '';
    this._displayLen = 0;
    this._timer = null;
    this._isFinalized = false;
    this._isComplete = false;

    // 光标闪烁
    this._cursorTimer = null;
    this._cursorVisible = true;
  }

  /** SSE 每来一个 chunk 就调用 */
  appendChunk(text) {
    this._writeBuffer += text;
    if (!this._timer) this._startTyping();
  }

  /** 流结束调用 */
  finalize() {
    this._isFinalized = true;
  }

  _startTyping() {
    if (this._timer) return;
    this._cursorVisible = true;
    this._startCursorBlink();
    this._timer = setInterval(() => this._tick(), this._speed);
  }

  _tick() {
    if (this._displayLen >= this._writeBuffer.length) {
      if (this._isFinalized) {
        this._onComplete();
      }
      return;
    }
    this._displayLen++;
    this._render();
    if (this._onChar) this._onChar();
  }

  _render() {
    const text = this._writeBuffer.slice(0, this._displayLen);
    this._el.textContent = text + (this._showCursor && this._cursorVisible ? this._cursorChar : '');
  }

  _startCursorBlink() {
    this._cursorTimer = setInterval(() => {
      this._cursorVisible = !this._cursorVisible;
      if (!this._isComplete) this._render();
    }, 530);
  }

  _onComplete() {
    this._isComplete = true;
    clearInterval(this._timer);
    this._timer = null;
    clearInterval(this._cursorTimer);
    this._cursorTimer = null;
    this._el.textContent = this._writeBuffer;
  }

  /** 强制完成，立即显示全部文本 */
  finishNow() {
    this._isFinalized = true;
    this._onComplete();
  }

  /** 重置为新消息 */
  reset() {
    this.finishNow();
    this._writeBuffer = '';
    this._displayLen = 0;
    this._isFinalized = false;
    this._isComplete = false;
    this._el.textContent = '';
  }

  get isTyping() {
    return !this._isComplete && this._writeBuffer.length > 0;
  }
}

window.TypewriterController = TypewriterController;
```

- [ ] **Step 2: 在 animations.css 中新增光标闪烁 keyframe**

```css
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/renderer/shared/typewriter-controller.js src/renderer/shared/styles/animations.css
git commit -m "feat: add TypewriterController with cursor blink animation"
```

---

### Task 7: 打字机字幕 — 集成到 Pet 窗口

**Files:**
- Modify: `src/renderer/pet/index.html` (script references + bubble + conversation integration)
- Modify: `src/renderer/shared/conversation-panel.js:78-98`

- [ ] **Step 1: 在 pet/index.html 中加载 typewriter-controller.js**

在 script 引用区新增：
```html
<script src="../shared/typewriter-controller.js"></script>
```

- [ ] **Step 2: 修改 pet 窗口的气泡显示逻辑**

替换现有的 `showBubble` 函数以使用 TypewriterController：

```js
const bubbleText = document.getElementById("bubbleText");
const typewriter = new TypewriterController(bubbleText, {
  speed: 35,
  onChar: () => {
    // Live2D 嘴部同步
    if (charRenderer._model && charRenderer._model.setParameterValueById) {
      charRenderer._model.setParameterValueById('ParamMouthOpenY', 0.3 + Math.random() * 0.5);
      setTimeout(() => {
        if (charRenderer._model && charRenderer._model.setParameterValueById) {
          charRenderer._model.setParameterValueById('ParamMouthOpenY', 0);
        }
      }, 50);
    }
  },
});

function showBubble(text) {
  typewriter.reset();
  bubble.classList.add("open");
  typewriter.appendChunk(text);
  typewriter.finalize();
}

function hideBubble() {
  typewriter.finishNow();
  bubble.classList.remove("open");
  if (bubbleTimer) { clearTimeout(bubbleTimer); bubbleTimer = null; }
}
```

- [ ] **Step 3: 修改 conversation panel 以支持打字机效果**

在 `conversation-panel.js` 中，将 `addMessage` 方法增加一个 `useTypewriter` 选项。新增方法：

```js
/**
 * 创建一个新的 assistant 消息元素但不填充内容（由 typewriter 填充）
 * @returns {HTMLElement}
 */
createAssistantMessageElement() {
  const msgEl = document.createElement("div");
  msgEl.className = "conv-msg conv-msg--assistant";
  msgEl.style.cssText = `margin:var(--space-xs) 0;padding:var(--space-xs) var(--space-sm);border-radius:var(--radius-sm);max-width:85%;font-size:var(--font-sm);word-break:break-word;align-self:flex-start;background:var(--color-bg-tertiary, var(--color-bg-medium));`;
  this._msgList.appendChild(msgEl);
  this._msgList.scrollTop = this._msgList.scrollHeight;
  return msgEl;
}
```

修改 `appendToLastMessage` 返回最后一个 assistant 消息元素：

```js
appendToLastMessage(role, text) {
  const msgs = this._msgList.querySelectorAll(`.conv-msg--${role}`);
  const last = msgs[msgs.length - 1];
  if (last) {
    last.textContent += text;
    this._msgList.scrollTop = this._msgList.scrollHeight;
  }
  return last;
}
```

- [ ] **Step 4: 修改 pet/index.html 的 SSE 流处理以使用打字机**

修改 `onSend` 回调中的 streaming 处理：

```js
onSend: async (text) => {
  const keyRes = await ipc.getApiKey();
  if (!keyRes.ok || !keyRes.data?.apiKey) {
    convPanel.addMessage("assistant", "旅者，你还没有设置与星辰通讯的密钥。\n\n请打开软件模式 → 设置，或直接在 data/db.json 中配置 apiKey 后再来找我聊天吧~");
    return;
  }

  convPanel.showTyping();
  let msgEl = null;
  let convTypewriter = null;

  const unsubChunk = ipc.onChunk((chunk) => {
    convPanel.hideTyping();
    if (!msgEl) {
      msgEl = convPanel.createAssistantMessageElement();
      convTypewriter = new TypewriterController(msgEl, {
        speed: 35,
        showCursor: true,
        onChar: () => {
          if (charRenderer._model?.setParameterValueById) {
            charRenderer._model.setParameterValueById('ParamMouthOpenY', 0.3 + Math.random() * 0.5);
            setTimeout(() => {
              if (charRenderer._model?.setParameterValueById) {
                charRenderer._model.setParameterValueById('ParamMouthOpenY', 0);
              }
            }, 50);
          }
        },
      });
    }
    convTypewriter.appendChunk(chunk);
  });

  const unsubDone = ipc.onDone((data) => {
    unsubChunk();
    unsubDone();
    if (convTypewriter) {
      convTypewriter.finalize();
      // 同时更新气泡
      if (data.displayText) {
        showBubble(data.displayText);
      }
    } else if (data.displayText) {
      convPanel.addMessage("assistant", data.displayText);
      showBubble(data.displayText);
    }
    // ... intent handling (unchanged)
  });

  const unsubError = ipc.onError((err) => {
    convPanel.hideTyping();
    unsubChunk();
    unsubDone();
    unsubError();
    convPanel.showError(err);
  });

  await ipc.sendMessage(text, isTaskMode);
},
```

- [ ] **Step 5: Commit**

```bash
git add src/renderer/pet/index.html src/renderer/shared/conversation-panel.js
git commit -m "feat: integrate TypewriterController into pet window bubbles and chat"
```

---

### Task 8: 毛玻璃拟态样式

**Files:**
- Modify: `src/renderer/shared/styles/base.css` (追加 .glass-panel)
- Modify: `src/renderer/pet/index.html` (应用 .glass-panel)
- Modify: `src/renderer/wallpaper/index.html` (应用 .glass-panel)

- [ ] **Step 1: 在 base.css 末尾新增 .glass-panel 样式**

```css
/* ===== Glassmorphism ===== */
.glass-panel {
  background: var(--color-bg-glass);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Fallback: no backdrop-filter support */
@supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
  .glass-panel {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
  }
}

.glass-input {
  background: var(--color-input-bg);
  border: 1px solid var(--color-input-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  padding: 6px 10px;
  font-size: var(--font-sm);
  outline: none;
  transition: border-color var(--transition-fast);
}

.glass-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-glow);
}
```

- [ ] **Step 2: 将 pet/index.html 中的面板样式改为使用 .glass-panel**

修改 `.pet-conv-container` 的 CSS（将 `background: var(--color-bg-dark)` 替换为引用 `.glass-panel`），
修改 `.pet-task-panel` 的 CSS（同上），
修改 `.pet-context-menu` 的 CSS（同上），
修改 `.conv-input-row input` 为使用 `.glass-input` class。

通过 HTML class 添加而非仅靠 CSS：
- `convContainer` 在 JS 中 mount 时加 `.glass-panel`
- `taskPanel` mount 时加 `.glass-panel`
- 输入框元素添加 `.glass-input` class

- [ ] **Step 3: 将 wallpaper/index.html 中的相关面板改为毛玻璃**

修改 `.wallpaper-task-select` 添加 `.glass-panel` 风格，
修改 `.wallpaper-chat-sidebar` 添加 `.glass-panel` 风格。

- [ ] **Step 4: 将 software/index.html 中的面板改为毛玻璃**

读取 software/index.html 后，将侧边导航和内容卡片添加 `.glass-panel` 风格。

- [ ] **Step 5: Commit**

```bash
git add src/renderer/shared/styles/base.css src/renderer/pet/index.html src/renderer/wallpaper/index.html src/renderer/software/index.html
git commit -m "feat: add glassmorphism panel and input styles across all modes"
```

---

### Task 9: 增强托盘菜单

**Files:**
- Modify: `src/main/main.js:74-101`

- [ ] **Step 1: 重写 createTray() 中的菜单模板**

将 `createTray` 函数中的 `Menu.buildFromTemplate` 调用替换为增强版本：

```js
function createTray(editorWindowManager, settingsWindow) {
  const iconPath = path.join(__dirname, "..", "..", "assets", "ui", "tray-icon.png");
  let icon;
  if (fs.existsSync(iconPath)) {
    icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  } else {
    icon = nativeImage.createEmpty();
  }

  tray = new Tray(icon);
  tray.setToolTip("Desk Pet — 露娜·月语");

  const buildMenu = () => {
    const settings = db.getSettings();
    return Menu.buildFromTemplate([
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
      {
        label: "显示字幕",
        type: "checkbox",
        checked: settings.subtitleEnabled,
        click: (mi) => {
          db.updateSettings({ subtitleEnabled: mi.checked });
          broadcastSettings();
        },
      },
      {
        label: "窗口置顶",
        type: "checkbox",
        checked: settings.alwaysOnTop,
        click: (mi) => {
          db.updateSettings({ alwaysOnTop: mi.checked });
          const win = windowManager.getCurrentWindow();
          if (win && !win.isDestroyed()) win.setAlwaysOnTop(mi.checked, "screen-saver");
          broadcastSettings();
        },
      },
      {
        label: "静音",
        type: "checkbox",
        checked: settings.mute,
        click: (mi) => {
          db.updateSettings({ mute: mi.checked });
          broadcastSettings();
        },
      },
      { type: "separator" },
      {
        label: "设置...",
        type: "normal",
        click: () => { if (settingsWindow) settingsWindow.open(); },
      },
      {
        label: "对话历史",
        type: "normal",
        click: () => switchModeWithCleanup(MODE.SOFTWARE),
      },
      { type: "separator" },
      { label: "退出", type: "normal", click: () => app.quit() },
    ]);
  };

  const contextMenu = buildMenu();
  tray.setContextMenu(contextMenu);

  // 定期更新动态项
  setInterval(() => {
    const newMenu = buildMenu();
    tray.setContextMenu(newMenu);
  }, 10000);

  tray.on("click", () => switchModeWithCleanup(MODE.PET));
}

function broadcastSettings() {
  const settings = db.getSettings();
  BrowserWindow.getAllWindows().forEach((w) => {
    if (!w.isDestroyed()) w.webContents.send(IPC.SETTINGS_CHANGED, settings);
  });
}
```

- [ ] **Step 2: 更新 app.whenReady() 中的 createTray 调用**

从 `createTray(editorWindowManager)` 改为 `createTray(editorWindowManager, settingsWindow)`，其中 `settingsWindow` 是稍后 Task 10-11 中创建的设置窗口管理器。

如果 settings 窗口尚未实现，先用 `null`：
```js
createTray(editorWindowManager, null);
```

- [ ] **Step 3: Commit**

```bash
git add src/main/main.js
git commit -m "feat: enhance tray menu with toggles, settings, and dynamic state"
```

---

### Task 10: 设置窗口 — HTML + CSS

**Files:**
- Create: `src/renderer/settings/index.html`

- [ ] **Step 1: 创建设置窗口 HTML**

创建完整的设置窗口，4 个标签页（API / 外观 / 交互 / 番茄钟）：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>设置 — Desk Pet</title>
<link rel="stylesheet" href="../shared/styles/base.css">
<style>
  :root {
    --settings-sidebar-width: 180px;
  }

  body {
    display: flex;
    height: 100vh;
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
    font-family: var(--font-main);
  }

  .settings-sidebar {
    width: var(--settings-sidebar-width);
    background: var(--color-bg-secondary);
    border-right: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    padding: var(--space-md) 0;
    flex-shrink: 0;
  }

  .settings-sidebar-title {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-lg);
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--space-md);
  }

  .settings-tab {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-sm);
    color: var(--color-text-secondary);
    cursor: pointer;
    border: none;
    background: none;
    text-align: left;
    transition: all var(--transition-fast);
    border-left: 3px solid transparent;
  }

  .settings-tab:hover {
    background: var(--color-bg-tertiary);
    color: var(--color-text-primary);
  }

  .settings-tab.active {
    color: var(--color-accent);
    background: rgba(124, 58, 237, 0.1);
    border-left-color: var(--color-accent);
  }

  .settings-tab-icon { font-size: var(--font-lg); width: 24px; text-align: center; }

  .settings-content {
    flex: 1;
    padding: var(--space-lg);
    overflow-y: auto;
  }

  .settings-page { display: none; }
  .settings-page.active { display: block; }

  .settings-page h2 {
    font-size: var(--font-xl);
    margin: 0 0 var(--space-xs) 0;
    color: var(--color-text-primary);
  }

  .settings-page .subtitle {
    font-size: var(--font-sm);
    color: var(--color-text-muted);
    margin: 0 0 var(--space-lg) 0;
  }

  .settings-field {
    margin-bottom: var(--space-md);
  }

  .settings-field label {
    display: block;
    font-size: var(--font-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-xs);
  }

  .settings-field input[type="text"],
  .settings-field input[type="password"],
  .settings-field input[type="number"],
  .settings-field select {
    width: 100%;
    max-width: 400px;
    padding: var(--space-sm);
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    font-size: var(--font-sm);
    outline: none;
    transition: border-color var(--transition-fast);
    box-sizing: border-box;
  }

  .settings-field input:focus,
  .settings-field select:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px var(--color-accent-glow);
  }

  .settings-field input[type="range"] {
    width: 100%;
    max-width: 400px;
    accent-color: var(--color-accent);
  }

  .settings-field .range-value {
    display: inline-block;
    margin-left: var(--space-sm);
    font-size: var(--font-sm);
    color: var(--color-accent);
    min-width: 40px;
  }

  .settings-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 400px;
    padding: var(--space-sm) 0;
  }

  .settings-toggle input[type="checkbox"] {
    width: 40px;
    height: 22px;
    accent-color: var(--color-accent);
    transform: scale(1.2);
  }

  .theme-cards {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
  }

  .theme-card {
    width: 140px;
    padding: var(--space-md);
    border-radius: var(--radius-md);
    cursor: pointer;
    border: 2px solid transparent;
    text-align: center;
    transition: all var(--transition-fast);
    font-size: var(--font-sm);
  }

  .theme-card:hover { border-color: var(--color-border-light); }
  .theme-card.selected { border-color: var(--color-accent); box-shadow: 0 0 12px var(--color-accent-glow); }
  .theme-card-starry { background: linear-gradient(135deg, #0a0e17, #1a1f2e); color: #e2e8f0; }
  .theme-card-forest { background: linear-gradient(135deg, #0a1a0f, #162e1f); color: #e8f0e8; }
  .theme-card-ocean { background: linear-gradient(135deg, #0a0e2e, #162048); color: #e0e8f8; }

  .theme-card .swatch {
    width: 32px; height: 32px; border-radius: 50%;
    margin: 0 auto var(--space-sm);
  }
  .swatch-starry { background: #7c3aed; }
  .swatch-forest { background: #22c55e; }
  .swatch-ocean { background: #3b82f6; }

  .settings-btn-row {
    display: flex;
    gap: var(--space-sm);
    margin-top: var(--space-xl);
    padding-top: var(--space-md);
    border-top: 1px solid var(--color-border);
  }

  .btn {
    padding: var(--space-sm) var(--space-lg);
    border: none;
    border-radius: var(--radius-sm);
    font-size: var(--font-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .btn-primary { background: var(--color-accent); color: white; }
  .btn-primary:hover { filter: brightness(1.1); }
  .btn-secondary { background: var(--color-bg-tertiary); color: var(--color-text-primary); }
  .btn-secondary:hover { background: var(--color-bg-secondary); }
  .btn-danger { background: transparent; color: var(--color-text-muted); }
  .btn-danger:hover { color: var(--color-danger); }

  .test-result {
    font-size: var(--font-sm);
    margin-top: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
  }
  .test-result.success { color: var(--color-success); background: rgba(34,197,94,0.1); }
  .test-result.fail { color: var(--color-danger); background: rgba(239,68,68,0.1); }
</style>
</head>
<body>

<div class="settings-sidebar">
  <div class="settings-sidebar-title">设置</div>
  <button class="settings-tab active" data-tab="api">
    <span class="settings-tab-icon">🔑</span> API 配置
  </button>
  <button class="settings-tab" data-tab="appearance">
    <span class="settings-tab-icon">🎨</span> 外观
  </button>
  <button class="settings-tab" data-tab="interaction">
    <span class="settings-tab-icon">💬</span> 交互
  </button>
  <button class="settings-tab" data-tab="pomodoro">
    <span class="settings-tab-icon">🍅</span> 番茄钟
  </button>
</div>

<div class="settings-content" id="settingsContent">
  <!-- API page -->
  <div class="settings-page active" data-page="api">
    <h2>API 配置</h2>
    <p class="subtitle">配置 AI 服务连接参数</p>
    <div class="settings-field">
      <label>API Key</label>
      <input type="password" id="apiKey" placeholder="sk-...">
    </div>
    <div class="settings-field">
      <label>API Base URL</label>
      <input type="text" id="apiBaseUrl" value="https://api.deepseek.com/v1/chat/completions">
    </div>
    <div class="settings-field">
      <label>Model</label>
      <input type="text" id="apiModel" value="deepseek-chat">
    </div>
    <button class="btn btn-secondary" id="testConnectionBtn">测试连接</button>
    <div id="testResult"></div>
  </div>

  <!-- Appearance page -->
  <div class="settings-page" data-page="appearance">
    <h2>外观</h2>
    <p class="subtitle">自定义视觉效果</p>
    <div class="settings-field">
      <label>主题</label>
      <div class="theme-cards">
        <div class="theme-card theme-card-starry" data-theme="starry">
          <div class="swatch swatch-starry"></div>
          星空
        </div>
        <div class="theme-card theme-card-forest" data-theme="forest">
          <div class="swatch swatch-forest"></div>
          森林
        </div>
        <div class="theme-card theme-card-ocean" data-theme="ocean">
          <div class="swatch swatch-ocean"></div>
          海洋
        </div>
      </div>
    </div>
  </div>

  <!-- Interaction page -->
  <div class="settings-page" data-page="interaction">
    <h2>交互</h2>
    <p class="subtitle">对话和字幕设置</p>
    <div class="settings-toggle">
      <label>显示字幕</label>
      <input type="checkbox" id="subtitleEnabled" checked>
    </div>
    <div class="settings-field">
      <label>打字机速度 <span class="range-value" id="typewriterSpeedVal">35ms</span></label>
      <input type="range" id="typewriterSpeed" min="10" max="100" value="35" step="5">
    </div>
    <div class="settings-toggle">
      <label>点击穿透</label>
      <input type="checkbox" id="clickThrough" checked>
    </div>
    <div class="settings-toggle">
      <label>窗口置顶</label>
      <input type="checkbox" id="alwaysOnTop" checked>
    </div>
  </div>

  <!-- Pomodoro page -->
  <div class="settings-page" data-page="pomodoro">
    <h2>番茄钟</h2>
    <p class="subtitle">专注计时参数</p>
    <div class="settings-field">
      <label>工作时长 (分钟)</label>
      <input type="number" id="pomodoroWorkDuration" min="5" max="120" value="25">
    </div>
    <div class="settings-field">
      <label>短休时长 (分钟)</label>
      <input type="number" id="pomodoroShortBreak" min="1" max="30" value="5">
    </div>
    <div class="settings-field">
      <label>长休时长 (分钟)</label>
      <input type="number" id="pomodoroLongBreak" min="5" max="60" value="15">
    </div>
    <div class="settings-field">
      <label>长休间隔 (几个番茄后)</label>
      <input type="number" id="pomodoroLongBreakInterval" min="1" max="10" value="4">
    </div>
  </div>

  <div class="settings-btn-row">
    <button class="btn btn-primary" id="saveBtn">保存</button>
    <button class="btn btn-secondary" id="cancelBtn">取消</button>
    <button class="btn btn-danger" id="resetBtn">恢复默认</button>
  </div>
</div>

<script src="../../shared/constants.js"></script>
<script src="../shared/ipc-client.js"></script>
<script src="settings-app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/settings/index.html
git commit -m "feat: add settings window HTML with 4-tab layout"
```

---

### Task 11: 设置窗口 — JS 逻辑

**Files:**
- Create: `src/renderer/settings/settings-app.js`

- [ ] **Step 1: 创建设置窗口交互逻辑**

```js
(() => {
  const { IpcClient } = window;
  const ipc = new IpcClient();

  // Tab switching
  const tabs = document.querySelectorAll('.settings-tab');
  const pages = document.querySelectorAll('.settings-page');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      pages.forEach((p) => p.classList.remove('active'));
      document.querySelector(`[data-page="${target}"]`).classList.add('active');
    });
  });

  // Theme cards
  const themeCards = document.querySelectorAll('.theme-card');
  let selectedTheme = 'starry';

  themeCards.forEach((card) => {
    card.addEventListener('click', () => {
      themeCards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedTheme = card.dataset.theme;
    });
  });

  // Range slider value display
  const typewriterSpeed = document.getElementById('typewriterSpeed');
  const typewriterSpeedVal = document.getElementById('typewriterSpeedVal');
  typewriterSpeed.addEventListener('input', () => {
    typewriterSpeedVal.textContent = typewriterSpeed.value + 'ms';
  });

  // Load current settings
  async function loadSettings() {
    const res = await ipc.getSettings();
    if (!res.ok) return;

    const s = res.data;

    // API
    const keyRes = await ipc.getApiKey();
    if (keyRes.ok && keyRes.data?.apiKey) {
      document.getElementById('apiKey').value = keyRes.data.apiKey;
    }

    // Appearance
    selectedTheme = s.theme || 'starry';
    themeCards.forEach((c) => {
      c.classList.toggle('selected', c.dataset.theme === selectedTheme);
    });

    // Interaction
    document.getElementById('subtitleEnabled').checked = s.subtitleEnabled !== false;
    document.getElementById('typewriterSpeed').value = s.typewriterSpeed || 35;
    typewriterSpeedVal.textContent = (s.typewriterSpeed || 35) + 'ms';
    document.getElementById('clickThrough').checked = s.clickThrough !== false;
    document.getElementById('alwaysOnTop').checked = s.alwaysOnTop !== false;

    // Pomodoro
    document.getElementById('pomodoroWorkDuration').value = s.pomodoroWorkDuration || 25;
    document.getElementById('pomodoroShortBreak').value = s.pomodoroShortBreak || 5;
    document.getElementById('pomodoroLongBreak').value = s.pomodoroLongBreak || 15;
    document.getElementById('pomodoroLongBreakInterval').value = s.pomodoroLongBreakInterval || 4;
  }

  // Save
  document.getElementById('saveBtn').addEventListener('click', async () => {
    const partial = {
      theme: selectedTheme,
      subtitleEnabled: document.getElementById('subtitleEnabled').checked,
      typewriterSpeed: parseInt(typewriterSpeed.value, 10),
      clickThrough: document.getElementById('clickThrough').checked,
      alwaysOnTop: document.getElementById('alwaysOnTop').checked,
      pomodoroWorkDuration: parseInt(document.getElementById('pomodoroWorkDuration').value, 10),
      pomodoroShortBreak: parseInt(document.getElementById('pomodoroShortBreak').value, 10),
      pomodoroLongBreak: parseInt(document.getElementById('pomodoroLongBreak').value, 10),
      pomodoroLongBreakInterval: parseInt(document.getElementById('pomodoroLongBreakInterval').value, 10),
    };

    const apiKey = document.getElementById('apiKey').value.trim();
    if (apiKey) await ipc.setApiKey(apiKey);

    await ipc.updateSettings(partial);
    window.close();
  });

  // Cancel
  document.getElementById('cancelBtn').addEventListener('click', () => {
    window.close();
  });

  // Reset to defaults
  document.getElementById('resetBtn').addEventListener('click', async () => {
    const defaults = {
      theme: 'starry',
      subtitleEnabled: true,
      typewriterSpeed: 35,
      clickThrough: true,
      alwaysOnTop: true,
      mute: false,
      pomodoroWorkDuration: 25,
      pomodoroShortBreak: 5,
      pomodoroLongBreak: 15,
      pomodoroLongBreakInterval: 4,
    };
    await ipc.updateSettings(defaults);
    loadSettings();
  });

  // Test connection
  document.getElementById('testConnectionBtn').addEventListener('click', async () => {
    const resultEl = document.getElementById('testResult');
    resultEl.textContent = '正在测试...';
    resultEl.className = 'test-result';

    const apiKey = document.getElementById('apiKey').value.trim();
    if (!apiKey) {
      resultEl.textContent = '请先输入 API Key';
      resultEl.className = 'test-result fail';
      return;
    }

    try {
      const baseUrl = document.getElementById('apiBaseUrl').value.trim();
      const model = document.getElementById('apiModel').value.trim();
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: 'hi' }],
          max_tokens: 5,
        }),
      });
      if (res.ok) {
        resultEl.textContent = '连接成功!';
        resultEl.className = 'test-result success';
      } else {
        const err = await res.json().catch(() => ({}));
        resultEl.textContent = '连接失败: ' + (err.error?.message || res.statusText);
        resultEl.className = 'test-result fail';
      }
    } catch (e) {
      resultEl.textContent = '连接失败: ' + e.message;
      resultEl.className = 'test-result fail';
    }
  });

  loadSettings();
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/settings/settings-app.js
git commit -m "feat: add settings window JS logic with save/load/reset and connection test"
```

---

### Task 12: 设置窗口 — Main Process 集成

**Files:**
- Modify: `src/main/main.js:1-180` (新增 createSettingsWindow)
- Read: `src/main/window-manager.js` (了解窗口创建模式)

- [ ] **Step 1: 在 main.js 中新增 SettingsWindowManager 类**

在 main.js 中（EditorWindowManager 之后，app.whenReady 之前）新增：

```js
class SettingsWindowManager {
  constructor(preloadPath) {
    this._preloadPath = preloadPath;
    this._win = null;
  }

  open() {
    if (this._win && !this._win.isDestroyed()) {
      this._win.focus();
      return;
    }

    this._win = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 640,
      minHeight: 480,
      resizable: true,
      title: "设置 — Desk Pet",
      show: false,
      webPreferences: {
        preload: this._preloadPath,
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    const indexPath = path.join(__dirname, "..", "renderer", "settings", "index.html");
    this._win.loadFile(indexPath);
    this._win.once("ready-to-show", () => this._win.show());
    this._win.on("closed", () => { this._win = null; });
  }
}
```

- [ ] **Step 2: 在 app.whenReady() 中创建 settingsWindowManager 并传给 createTray**

```js
// 在 windowManager 和 editorWindowManager 之后
const settingsWindowManager = new SettingsWindowManager(preloadPath);

// 传给 createTray
createTray(editorWindowManager, settingsWindowManager);
```

- [ ] **Step 3: Commit**

```bash
git add src/main/main.js
git commit -m "feat: add SettingsWindowManager and integrate with tray menu"
```

---

### Task 13: 端到端测试与修复

**Files:** 无新建，验证所有已修改文件。

- [ ] **Step 1: 启动应用，验证主题切换**

```bash
npm start
```

验证步骤：
1. 看到 pet 窗口出现，默认星空主题
2. 主题切换通过 IPC 工作（可在 console 中测试）
3. 重启后主题保持

- [ ] **Step 2: 验证点击穿透**

1. 点击 pet 窗口的背景区域 — 应该穿透到桌面
2. 点击角色 — 应该打开对话面板，此时整个窗口恢复鼠标交互
3. 按 ESC — 面板关闭，恢复穿透

- [ ] **Step 3: 验证打字机字幕**

1. 点击角色打开对话面板
2. 输入一条消息发送
3. AI 回复应逐字显示（35ms/字），带闪烁光标
4. 气泡显示相同内容

- [ ] **Step 4: 验证毛玻璃效果**

1. 打开对话面板 — 应有 backdrop-filter 模糊效果
2. 右键菜单 — 毛玻璃背景
3. 如果 Electron Windows 不支持，验证降级到不透明背景

- [ ] **Step 5: 验证托盘菜单**

1. 右键系统托盘图标
2. 看到完整菜单：模式选择、分隔线、编辑器、显示字幕/置顶/静音 toggle、设置、对话历史、退出
3. Toggle 项勾选后状态正确

- [ ] **Step 6: 验证设置窗口**

1. 从托盘菜单打开设置
2. 4 个标签页都能正常切换
3. 修改主题 → 保存 → 所有窗口同步更新
4. API 连接测试按钮工作
5. 恢复默认按钮工作

- [ ] **Step 7: 修复发现的所有问题，commit**

```bash
git add -A
git commit -m "fix: end-to-end testing fixes for Phase 1 features"
```

---

## 自检清单

1. **Spec 覆盖：** 主题系统、点击穿透、打字机字幕、毛玻璃、托盘菜单、设置界面 — 每项都有对应 task
2. **无占位符：** 所有步骤都包含具体代码
3. **类型一致性：** `settings` 对象字段名在 database.js、ipc-handlers.js、settings-app.js 中一致
4. **向后兼容：** variables.css 保留了 legacy alias，低风险
