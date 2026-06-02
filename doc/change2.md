# 第二轮变更记录 — 桌宠模式修复

> **修复日期**：2026-06-02
> **状态**：代码已修改，待运行验证

---

## 一、问题诊断

6 个功能性问题，根因链条：`conversation-panel.js` 的 `mount()` 用 `style.cssText` 覆盖了 CSS `display: none`（第一张多米诺骨牌）。后续发现第 7 个问题：`task-panel.js` 有同源 bug。

| # | 问题 | 根因 |
|---|------|------|
| 1 | 对话面板默认打开 | `conversation-panel.js` `mount()` 内联 `display:flex` 覆盖 CSS `display:none` |
| 2 | 右键弹出 Windows 系统菜单 | `-webkit-app-region: drag` 在 Windows 上被 OS 截获右键 |
| 3 | 原始 JSON 显示在对话中 | `llm-service.js` `_extractIntent()` 只提取不清洗，流式推送时 JSON 已实时显示 |
| 4 | 左键角色无反应 | 问题1连锁效应：toggle `.open` class 不敌内联 `display:flex` |
| 5 | 深色不透明+阴影 | 问题1连锁效应：面板 `background:#1A1A2E` + `box-shadow` 泄漏 |
| 6 | 角色位置异常 | 问题1连锁效应：240px 面板挤占视觉空间 |
| 7 | 左侧紫色细条 + 点击被拦截 | `task-panel.js` `mount()` 同款 cssText bug，taskPanel 意外显示，`z-index:30` 高于 charArea 拦截点击 |
| 8 | 点击角色仍无效（代码修复后） | Windows 11 DWM 检测透明窗口非透明像素占比过低，自动全窗口穿透，DOM 事件未到达渲染进程 |

---

## 二、修改的文件

### 1. `src/renderer/shared/conversation-panel.js`

`mount()` 方法：`style.cssText`（含 `display:flex`）替换为独立 `style.*` 属性赋值，不碰 `display`。

```js
// 旧
this.container.style.cssText = `display:flex;flex-direction:column;...`;

// 新
this.container.style.flexDirection = "column";
this.container.style.height = "100%";
this.container.style.background = "var(--color-bg-dark)";
this.container.style.borderRadius = "var(--radius-md)";
this.container.style.overflow = "hidden";
```

### 2. `src/renderer/pet/index.html`（CSS）

`.pet-char-area` 删除 `-webkit-app-region: drag;`，使 `contextmenu` 事件不再被 OS 截获。

### 3. `src/main/llm-service.js`

- 新增 `_cleanDisplayText(text)` 方法：正则匹配 + JSON.parse 验证后移除 JSON 块，brace-counting 回退处理嵌套对象
- `onDone` 回调 metadata 新增 `displayText` 字段（清洗后的纯台词文本）

### 4. `src/renderer/pet/index.html`（JS）

`onDone` 回调中：若 `data.displayText` 存在，回写最后一条 assistant 消息的 `textContent`。

### 5. `src/renderer/shared/task-panel.js`

`mount()` 方法：`style.cssText`（含 `display:flex`）替换为独立 `style.*` 属性赋值，与 `conversation-panel.js` 同源修复。

```js
// 旧
this.container.style.cssText = `display:flex;flex-direction:column;gap:var(--space-xs);...`;

// 新
this.container.style.flexDirection = "column";
this.container.style.gap = "var(--space-xs)";
this.container.style.overflowY = "auto";
this.container.style.padding = "var(--space-xs)";
```

### 6. `src/renderer/pet/index.html`（CSS）

`.pet-char-area` 删除 `cursor: grab;`，拖动功能已删除，残留光标无意义。

### 7. `src/main/window-manager.js`

pet 窗口创建后添加 `win.setIgnoreMouseEvents(false);`，强制窗口接收所有鼠标事件。Windows 11 DWM 会因透明窗口非透明像素占比过低（~5.8%）而自动判定全窗口穿透，DOM 层级的所有修复在 OS 层面被绕过。`false` 参数覆盖此行为，让 CSS `pointer-events` 方案重新生效。

---

## 三、不改的文件

- `constants.js` / `window-manager.js` / `ipc-handlers.js` / `preload.js` / `ipc-client.js` — 拖动功能本轮不做，窗口位置固定
- `character-renderer.js` — SVG 路径已于上轮修复
- 所有 `.md` 设计文档 — 无需修改

---

## 四、验收标准

1. 启动后对话面板默认隐藏，角色区域可见（120×120 偏右）
2. 左键角色 → 对话面板弹出/收起正常
3. 右键角色 → 自定义菜单弹出（5项），不再出现系统菜单
4. AI 返回的 JSON 不显示在对话气泡中，只保留角色台词
5. ESC / 点击透明区域 → 所有浮层关闭
6. 浮层关闭时透明区域穿透桌面

---

## 五、详细修改记录（代码 diff）

### 第一轮修复（透明背景 + CSV路径 + .interactive 切换）

#### 5.1 `src/renderer/shared/character-renderer.js`

**L32 — SVG 图标路径**：
```diff
- svg.src = "../../assets/characters/default/icon.svg";
+ svg.src = "../../../assets/characters/default/icon.svg";
```

**L51 — 表情图路径**：
```diff
- img.src = `../../assets/characters/default/expressions/${expression}.png`;
+ img.src = `../../../assets/characters/default/expressions/${expression}.png`;
```

#### 5.2 `src/renderer/pet/index.html` — CSS

**L9-17 — body 选择器改为 html,body，加 !important**：
```diff
- body {
+ html, body {
    width: var(--win-pet-width);
    height: var(--win-pet-height);
-   background: transparent;
+   background: transparent !important;
    overflow: hidden;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }
```

**L19-21 — 新增 body.interactive 规则**：
```diff
+ body.interactive {
+   pointer-events: auto;
+ }
```

#### 5.3 `src/renderer/pet/index.html` — JS（L190-216）

**在 `let bubbleTimer = null;` 之后插入**：
```diff
+ // Debug: scan for elements with solid background
+ setTimeout(() => {
+   const all = document.querySelectorAll("*");
+   for (const el of all) {
+     const bg = getComputedStyle(el).backgroundColor;
+     if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
+       console.log("实色背景:", el.tagName, el.id || el.className, "→", bg);
+     }
+   }
+ }, 1000);
+
+ function syncInteractive() {
+   const anyOpen = document.querySelector(".open") !== null;
+   if (anyOpen) {
+     document.body.classList.add("interactive");
+   } else {
+     document.body.classList.remove("interactive");
+   }
+ }
+
+ // MutationObserver: auto-sync interactive when .open class changes
+ const observer = new MutationObserver(() => syncInteractive());
+ observer.observe(document.body, {
+   attributes: true,
+   subtree: true,
+   attributeFilter: ["class"],
+ });
```

**L370 — IIFE 末尾追加**：
```diff
+ syncInteractive();
  window._petShowBubble = showBubble;
```

---

### 第二轮修复（面板默认打开 + 右键菜单 + JSON清洗）

#### 5.4 `src/renderer/shared/conversation-panel.js`

**L22 — mount() 方法**：
```diff
- this.container.style.cssText = `display:flex;flex-direction:column;height:100%;background:var(--color-bg-dark);border-radius:var(--radius-md);overflow:hidden;`;
+ this.container.style.flexDirection = "column";
+ this.container.style.height = "100%";
+ this.container.style.background = "var(--color-bg-dark)";
+ this.container.style.borderRadius = "var(--radius-md)";
+ this.container.style.overflow = "hidden";
```

#### 5.5 `src/renderer/pet/index.html` — CSS

**L30 — 删除 -webkit-app-region: drag**：
```diff
  .pet-char-area {
    position: absolute;
    left: 240px;
    top: 20px;
    width: var(--char-pet-size);
    height: var(--char-pet-size);
    cursor: grab;
-   -webkit-app-region: drag;
    pointer-events: auto;
    z-index: 10;
  }
```

#### 5.6 `src/main/llm-service.js`

**L175 — onDone 前注入 displayText**：
```diff
  const metadata = this._extractIntent(fullText);
+ metadata.displayText = this._cleanDisplayText(fullText);
  this.db.addMessage(conv.id, { role: "user", content: options.message });
```

**L253-280 — 新增 _cleanDisplayText 方法**（在 `_extractIntent` 和 `_sleep` 之间）：
```diff
+ /** @param {string} text */
+ _cleanDisplayText(text) {
+   let cleaned = text;
+   for (const pattern of [
+     /\{"intent"\s*:\s*"create_task"[\s\S]*\}/,
+     /\{"intent"\s*:\s*"switch_mode"[\s\S]*\}/,
+   ]) {
+     const match = cleaned.match(pattern);
+     if (match) {
+       try {
+         JSON.parse(match[0]);
+         cleaned = cleaned.replace(match[0], "");
+       } catch {
+         // brace-counting fallback for unbalanced JSON
+         const start = match.index;
+         let depth = 0;
+         let end = start;
+         for (let i = start; i < cleaned.length; i++) {
+           if (cleaned[i] === "{") depth++;
+           if (cleaned[i] === "}") depth--;
+           if (depth === 0) { end = i + 1; break; }
+         }
+         if (end > start) cleaned = cleaned.slice(0, start) + cleaned.slice(end);
+       }
+     }
+   }
+   return cleaned.trim();
+ }
+
  _sleep(ms) {
```

#### 5.7 `src/renderer/pet/index.html` — JS

**L277-282 — onDone 回调中新增 JSON 清洗**：
```diff
  const unsubDone = ipc.onDone((data) => {
    convPanel.hideTyping();
    unsubChunk();
    unsubDone();
+   // Clean raw JSON from the streamed message
+   if (data.displayText) {
+     const msgs = convPanel._msgList.querySelectorAll(".conv-msg--assistant");
+     const last = msgs[msgs.length - 1];
+     if (last) last.textContent = data.displayText;
+   }
    if (data.intent === INTENT.CREATE_TASK) {
```

---

### 第三轮修复（task-panel 同源 bug + 残留光标）

#### 5.8 `src/renderer/shared/task-panel.js`

**L16 — mount() 方法**：
```diff
- this.container.style.cssText = `display:flex;flex-direction:column;gap:var(--space-xs);overflow-y:auto;padding:var(--space-xs);`;
+ this.container.style.flexDirection = "column";
+ this.container.style.gap = "var(--space-xs)";
+ this.container.style.overflowY = "auto";
+ this.container.style.padding = "var(--space-xs)";
```

#### 5.9 `src/renderer/pet/index.html` — CSS

**L29 — 删除 cursor: grab**：
```diff
  .pet-char-area {
    position: absolute;
    left: 240px;
    top: 20px;
    width: var(--char-pet-size);
    height: var(--char-pet-size);
-   cursor: grab;
    pointer-events: auto;
    z-index: 10;
  }
```
---

### 第四轮修复（Win11 DWM 透明窗口自动穿透）

#### 5.10 `src/main/window-manager.js`

**L72 — pet 窗口创建后强制接收鼠标事件**：
```diff
  if (mode === "pet") {
      win.setAlwaysOnTop(true, "screen-saver");
      win.setVisibleOnAllWorkspaces(true);
-     // CSS 穿透方案：不调用 setIgnoreMouseEvents，由渲染进程通过 pointer-events 控制
+     win.setIgnoreMouseEvents(false); // 强制窗口接收点击，CSS pointer-events 控制穿透
  }
```

> **根因**：Windows 11 DWM 检测到透明窗口内非透明像素占比过低（仅角色 120×120 / 窗口 500×500 ≈ 5.8%），自动将整个窗口判定为可穿透。DOM 的 `pointer-events` 对此无能为力——事件根本没到达渲染进程。
>
> **修复**：`setIgnoreMouseEvents(false)` 强制窗口接收所有鼠标事件。CSS `pointer-events` 规则（body:none / .interactive:auto / charArea:auto）重新生效。

---

## 六、修改文件汇总

| 轮次 | 文件 | 改动行 | 改动类型 |
|------|------|--------|----------|
| R1 | `character-renderer.js` | L32, L51 | SVG/图片路径修正 |
| R1 | `index.html` CSS | L9-21 | html,body 透明 !important + .interactive |
| R1 | `index.html` JS | L190-216, L370 | 调试扫描 + syncInteractive + MutationObserver |
| R2 | `conversation-panel.js` | L22-26 | mount() 拆解 cssText，不碰 display |
| R2 | `index.html` CSS | L30 | 删除 -webkit-app-region: drag |
| R2 | `llm-service.js` | L175, L253-280 | _cleanDisplayText() + displayText 注入 |
| R2 | `index.html` JS | L277-282 | onDone 回写清洗后的消息文本 |
| R3 | `task-panel.js` | L16-19 | mount() 拆解 cssText，不碰 display（同 R2 conversation-panel） |
| R3 | `index.html` CSS | L29 | 删除 cursor: grab（拖动已删除，残留意在光标） |
| R4 | `window-manager.js` | L72 | setIgnoreMouseEvents(false) 解决 Win11 DWM 透明窗口自动穿透 |
