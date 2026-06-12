# 点击穿透修复 — 2026-06-10

## 问题

桌宠模式下，默认 `clickThrough: true` 导致 `main.js` 在每次切回桌宠模式时调用 `setIgnoreMouseEvents(true, { forward: true })`，整个窗口在 OS 层面完全忽略鼠标事件。同时 CSS `pointer-events` 控制方案缺少关键规则。用户无法点击角色区域、气泡、对话面板等任何交互元素。

## 根因分析

两层穿透控制互相冲突：

### Electron OS 层

- `window-manager.js:75` 创建窗口时设 `setIgnoreMouseEvents(false)`（接收所有 OS 鼠标事件）
- `main.js:49` 在 `switchModeWithCleanup` 中立刻用 `setIgnoreMouseEvents(settings.clickThrough, { forward: true })` 覆盖，而 `clickThrough` 默认 `true`，导致整个窗口穿透
- `main.js:131` 托盘菜单"点击穿透"回调中也调了 `petWin.setIgnoreMouseEvents(mi.checked, { forward: true })`，勾选时同样全窗口穿透

### CSS DOM 层

- 设计文档描述 `body { pointer-events: none }` + `.interactive { pointer-events: auto }` 的方案未实际实现
- JS 代码中多处使用 `document.body.classList.add/remove("interactive")`，但对应 CSS 规则不存在
- `base.css` 中 body 没有 `pointer-events: none`

## 修改内容

### 文件 1: `src/renderer/pet/index.html`

#### 修改 A — 新增 CSS 规则（在 `</style>` 前插入）

在 `.pet-task-toggle.active` 规则块之后、`</style>` 之前，加入以下三条规则：

```css
body { pointer-events: none; }
body.interactive { pointer-events: auto; }
body.clickthrough-off { pointer-events: auto; }
```

- `body { pointer-events: none }` — 默认透明区域穿透，仅 `.pet-char-area`、`.pet-bubble`、`.pet-conv-container`、`.pet-context-menu`、`.pet-task-panel` 等设置了 `pointer-events: auto` 的元素可交互
- `body.interactive { pointer-events: auto }` — 当任一浮动面板打开时，JS 添加此类使全窗口可交互
- `body.clickthrough-off { pointer-events: auto }` — 当用户在托盘取消"点击穿透"勾选时，全窗口可交互

完整上下文：

```
  .pet-task-toggle.active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }

  body { pointer-events: none; }
  body.interactive { pointer-events: auto; }
  body.clickthrough-off { pointer-events: auto; }
</style>
```

#### 修改 B — 初始化时加载 clickThrough 设置

将原有的这段代码：

```js
  // Listen for settings changes to sync theme across windows
  ipc.onSettingsChanged((settings) => {
    if (settings.theme) themeManager.setTheme(settings.theme);
  });
```

替换为：

```js
  // Load initial settings
  ipc.getSettings().then((res) => {
    if (res.ok && res.data) {
      if (res.data.theme) themeManager.setTheme(res.data.theme);
      if (typeof res.data.clickThrough === "boolean") {
        document.body.classList.toggle("clickthrough-off", !res.data.clickThrough);
      }
    }
  });

  // Listen for settings changes
  ipc.onSettingsChanged((settings) => {
    if (settings.theme) themeManager.setTheme(settings.theme);
    if (typeof settings.clickThrough === "boolean") {
      document.body.classList.toggle("clickthrough-off", !settings.clickThrough);
    }
  });
```

说明：
- `ipc.getSettings()` 主动拉取初始设置，设置 body 的 `clickthrough-off` class
- `ipc.onSettingsChanged` 中增加 `clickThrough` 的监听，同步 body class

### 文件 2: `src/main/main.js`

#### 修改 A — 移除 switchModeWithCleanup 中的 setIgnoreMouseEvents 覆盖

删除 `switchModeWithCleanup` 函数中切回 pet 模式时覆盖 `setIgnoreMouseEvents` 的逻辑。

原代码（约第 46-50 行）：

```js
		win.webContents.send(IPC.MODE_ACTIVATED, { mode });
			if (mode === MODE.PET) {
				const settings = db.getSettings();
				win.setIgnoreMouseEvents(settings.clickThrough, { forward: true });
			}
```

修改后（仅保留 MODE_ACTIVATED 发送）：

```js
		win.webContents.send(IPC.MODE_ACTIVATED, { mode });
	}
```

说明：`window-manager.js` 创建窗口时已调用 `setIgnoreMouseEvents(false)`，此处不应再用 `clickThrough` 设置覆盖为 `true`。穿透控制完全交给 CSS `pointer-events`。

#### 修改 B — 简化托盘菜单"点击穿透"回调

将托盘菜单中"点击穿透"项的 click 回调从：

```js
			{
				label: "点击穿透",
				type: "checkbox",
				checked: settings.clickThrough,
				click: (mi) => {
					db.updateSettings({ clickThrough: mi.checked });
					const petWin = windowManager.getWindow("pet");
					if (petWin && !petWin.isDestroyed()) {
						petWin.setIgnoreMouseEvents(mi.checked, { forward: true });
					}
					broadcastSettings();
				},
			},
```

修改为：

```js
			{
				label: "点击穿透",
				type: "checkbox",
				checked: settings.clickThrough,
				click: (mi) => {
					db.updateSettings({ clickThrough: mi.checked });
					broadcastSettings();
				},
			},
```

说明：移除 `setIgnoreMouseEvents` 调用。`broadcastSettings()` 会将新的 `clickThrough` 值广播到所有窗口，渲染器通过 `onSettingsChanged` 监听来切换 `body.clickthrough-off` CSS class。

### 不需要修改的文件

- `src/main/window-manager.js` — 第 75 行 `win.setIgnoreMouseEvents(false)` 保持不变，确保窗口始终接收 OS 级鼠标事件（修复 Windows 11 DWM 自动穿透问题）
- `src/main/database.js` — 默认值 `clickThrough: true` 保持不变
- `src/renderer/shared/styles/base.css` — 不需要改动

## 修复后的行为流

1. 窗口创建 → `setIgnoreMouseEvents(false)`（OS 层接收所有事件）
2. 切到桌宠模式 → 仅发送 `MODE_ACTIVATED`，不覆盖 OS 层穿透设置
3. 页面加载 → `ipc.getSettings()` 获取 `clickThrough`，默认 `true`，body 无 `clickthrough-off` class
4. CSS `body { pointer-events: none }` → 透明区域穿透，角色区域/面板可交互
5. 打开对话面板 → JS 添加 `.interactive` class → `pointer-events: auto` → 全窗口可交互
6. 关闭所有面板 → JS 移除 `.interactive` → 恢复穿透
7. 用户取消托盘"点击穿透" → `broadcastSettings()` → 渲染器添加 `.clickthrough-off` → 全窗口可交互

## 涉及的 JS-CSS 交互契约

以下 JS 逻辑依赖 CSS 规则存在（若 CSS 规则缺失会导致功能失效）：

| JS 操作 | 依赖的 CSS 规则 | 触发场景 |
|---------|----------------|---------|
| `document.body.classList.add("interactive")` | `body.interactive { pointer-events: auto }` | 打开对话面板、任务面板、上下文菜单 |
| `document.body.classList.remove("interactive")` | `body { pointer-events: none }` | `closeAll()` 关闭所有浮动面板 |
| `document.body.classList.toggle("clickthrough-off", ...)` | `body.clickthrough-off { pointer-events: auto }` | 设置变更、页面初始化 |

---

# 对话面板 JSON 乱码修复 — 2026-06-10

## 问题

任务发布模式下（如"我要写五份微积分试卷"），LLM 返回的响应中包含 JSON 指令（`{"intent":"create_task",...}`），流式输出时所有 chunk（含 JSON）都实时写入了对话面板。`onDone` 回调中虽然调用了 `_cleanDisplayText` 清洗出 `displayText`，但只传给了气泡（`showBubble`），**对话面板里的原始文本未被替换**，导致用户看到一坨 JSON 乱码。

## 根因分析

数据流如下：

1. `llm-service.js` `_doChat()` — 流式接收 LLM 响应，每个 chunk 通过 `onChunk(content)` 发给渲染器
2. `pet/index.html` `onChunk` — 创建 `TypewriterController`，逐字输出到 `msgEl`
3. `llm-service.js` `_extractIntent()` / `_cleanDisplayText()` — 从完整文本中提取 JSON 并清洗出纯文本 `displayText`
4. `pet/index.html` `onDone` — **仅对气泡调用了 `showBubble(data.displayText)`**，对话面板的 `msgEl` 仍保留原始文本

关键代码（`pet/index.html` 原 `onDone` 处理，约第 370-374 行）：

```js
if (convTypewriter) {
    convTypewriter.finalize();          // 定时器异步完成，textContent 设为原始文本
    if (data.displayText) {
        showBubble(data.displayText);   // 仅气泡用了清洗文本！
    }
}
```

`finalize()` 只是设置 `_isFinalized = true`，真正的 `textContent = _writeBuffer` 发生在下一次 `setInterval` 回调中。即使在此之后手动设置 `textContent`，也可能被定时器覆盖。

## 修改内容

### 文件: `src/renderer/pet/index.html`

#### 修改 — onDone 中替换对话面板文本

将：

```js
        if (convTypewriter) {
          convTypewriter.finalize();
          if (data.displayText) {
            showBubble(data.displayText);
          }
        } else if (data.displayText) {
```

替换为：

```js
        if (convTypewriter) {
          convTypewriter.finishNow();
          if (data.displayText) {
            msgEl.textContent = data.displayText;
            showBubble(data.displayText);
          }
        } else if (data.displayText) {
```

两处改动：

| 改动 | 原代码 | 新代码 | 原因 |
|------|--------|--------|------|
| `finalize()` → `finishNow()` | `convTypewriter.finalize()` | `convTypewriter.finishNow()` | `finalize()` 仅设标志位，实际 `textContent` 赋值在下一个 `setInterval` 回调，存在竞态；`finishNow()` 同步停止打字机并设置 `textContent`，后续可安全覆盖 |
| 新增 `msgEl.textContent` | （无） | `msgEl.textContent = data.displayText` | 用 `_cleanDisplayText` 清洗后的纯文本覆盖对话面板中的原始输出（含 JSON） |

**为什么 `finishNow()` 是安全的**：`TypewriterController._onComplete()` 会同步执行 `clearInterval(this._timer)` 停止定时器，然后设置 `this._el.textContent = this._writeBuffer`。由于 `this._el === msgEl`，紧接着执行 `msgEl.textContent = data.displayText` 会覆盖原始文本，且不再有定时器回调干扰。

## 涉及的 JS 交互契约

| 场景 | onDone 数据 | 对话面板显示 | 气泡显示 |
|------|------------|-------------|---------|
| 普通聊天（无 intent） | `{ displayText: "清洗后文本", expression: "happy" }` | `displayText`（清洗后） | `displayText` |
| 任务发布 | `{ displayText: "角色口吻回复", intent: "create_task", taskPayload: {...} }` | `displayText`（清洗后，无 JSON） | `displayText` |
| 模式切换 | `{ displayText: "角色口吻回复", intent: "switch_mode", switchTarget: "wallpaper" }` | `displayText`（清洗后） | `displayText` |
| 异常（LLM 未返回 JSON） | `{ fullText: "原始文本" }`（无 displayText） | `fullText`（保持原样） | 不显示 |

注意：当 `data.displayText` 不存在时（LLM 未按格式返回 JSON），对话面板保留原始 `fullText`，不做替换。这是预期行为——宁可保留原始文本也不要做有损截断。

---

# 壁纸模式 UI 调整 — 2026-06-10

## 调整 1：番茄钟移至左上角

### 问题

番茄钟原本是 body flex column 的正常流子元素，被 `justify-content: center; align-items: center` 居中在视口中央。壁纸模式下它遮挡了角色区域，需要移到左上角。

### 文件: `src/renderer/wallpaper/index.html`

#### 修改 — `.wallpaper-pomodoro-area` CSS 规则

原代码（约第 68-74 行）：

```css
  .wallpaper-pomodoro-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }
```

替换为：

```css
  .wallpaper-pomodoro-area {
    position: absolute;
    top: var(--space-lg);
    left: var(--space-lg);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
    z-index: 10;
  }
```

每项改动说明：

| 属性 | 原值 | 新值 | 原因 |
|------|------|------|------|
| `position` | (无，默认 static) | `absolute` | 脱离正常 flex 流，固定在视口指定位置 |
| `top` | (无) | `var(--space-lg)` (24px) | 距视口顶部 24px |
| `left` | (无) | `var(--space-lg)` (24px) | 距视口左侧 24px |
| `align-items` | `center` | `flex-start` | 左上角无需居中，内容左对齐 |
| `gap` | `var(--space-md)` (16px) | `var(--space-sm)` (8px) | 紧凑布局，间距减半 |
| `margin-bottom` | `var(--space-lg)` (24px) | (移除) | absolute 元素不再参与 flex 布局，margin 无意义 |
| `z-index` | (无) | `10` | 确保在背景(0)、壁纸图层(0)、WebGL canvas(1)之上，与 mode-label 同级 |

### 布局影响

- 番茄钟从 body flex column 中移除，不再占据正常流空间
- body 的其他 flex 子元素（角色区域 `wallpaper-char-area`、已选任务徽章 `wallpaper-selected-task`、音频区 `#audioArea` 等）会重新排列，填补番茄钟留下的空间
- 番茄钟与 `wallpaper-mode-label`（`position: absolute; top: 8%; left: 50%`）同为 absolute 定位，不会重叠——mode label 在顶部居中，番茄钟在顶部靠左

---

## 调整 2：时间文字居中到 SVG 圆环内部

### 问题

`PomodoroTimer.mount()` 生成的 HTML 结构中，时间显示 `<div>` 是 SVG 圆环的兄弟元素，在 flex column 中排在 SVG 下方。时间文字显示在圆环外面，而非圆环正中央——不符合标准番茄钟的视觉习惯。

原 DOM 结构：

```
container (flex column)
├── <svg> (120x120 圆环)
├── <div> "25:00" (时间显示)
├── <div> (时间编辑器)
└── <div> (控制按钮)
```

### 文件: `src/renderer/shared/pomodoro-timer.js`

#### 修改 A — 新增 ringWrapper 容器包裹 SVG + 时间

在 `// SVG ring` 注释行之前，新增 `ringWrapper` 创建代码（原代码约第 24-55 行）：

原代码：

```js
		// SVG ring
		this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this._svg.setAttribute("viewBox", "0 0 120 120");
		this._svg.style.cssText =
			"width:120px;height:120px;transform:rotate(-90deg);";

		const bg = document.createElementNS(/* ... */);
		// ... (bg circle and ring circle creation)

		// Time display
		this._timeDisplay = document.createElement("div");
		this._timeDisplay.style.cssText =
			"font-size:var(--font-2xl);color:var(--color-text-primary);font-family:var(--font-mono);";
		this._timeDisplay.textContent = "25:00";
```

替换为：

```js
		// Ring wrapper — lets us center the time inside the SVG ring
		const ringWrapper = document.createElement("div");
		ringWrapper.style.cssText = "position:relative;width:120px;height:120px;";

		// SVG ring
		this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this._svg.setAttribute("viewBox", "0 0 120 120");
		this._svg.style.cssText =
			"width:120px;height:120px;transform:rotate(-90deg);";

		const bg = document.createElementNS(/* ... */);
		// ... (bg circle and ring circle creation — 不变)

		ringWrapper.appendChild(this._svg);

		// Time display — centered inside the SVG ring
		this._timeDisplay = document.createElement("div");
		this._timeDisplay.style.cssText =
			"position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:var(--font-xl);color:var(--color-text-primary);font-family:var(--font-mono);";
		this._timeDisplay.textContent = "25:00";
		ringWrapper.appendChild(this._timeDisplay);
```

改动明细：

| 改动点 | 原代码 | 新代码 | 原因 |
|--------|--------|--------|------|
| 新增 `ringWrapper` | (无) | `document.createElement("div")` + `position:relative;width:120px;height:120px` | 作为定位容器，让时间文字可以相对它做 absolute 居中 |
| SVG 挂载目标 | 直接 append 到 container | `ringWrapper.appendChild(this._svg)` | SVG 仍是正常流元素，占据 wrapper 全部空间 |
| 时间文字挂载目标 | `this.container.appendChild(this._timeDisplay)` | `ringWrapper.appendChild(this._timeDisplay)` | 时间文字作为 wrapper 的子元素，用 absolute 定位叠放在圆环上方 |
| 时间文字 `position` | (无，默认 static) | `position:absolute;inset:0;display:flex;align-items:center;justify-content:center` | 铺满 wrapper 并 flex 居中，文字精准位于 120x120 圆环正中央 |
| 时间文字 `font-size` | `var(--font-2xl)` (约 28px) | `var(--font-xl)` (约 24px) | 圆环内空间有限（ring radius 52，内径约 46px），缩小字号确保文字不溢出 |

#### 修改 B — 调整 container.appendChild 顺序

原代码（约第 148-151 行）：

```js
		this.container.appendChild(this._svg);
		this.container.appendChild(this._timeDisplay);
		this.container.appendChild(this._timeEditor);
		this.container.appendChild(controls);
```

替换为：

```js
		this.container.appendChild(ringWrapper);
		this.container.appendChild(this._timeEditor);
		this.container.appendChild(controls);
```

说明：
- `ringWrapper` 已经包含了 `this._svg` 和 `this._timeDisplay`，只需追加 wrapper 一个元素
- 移除单独的 `this._svg` 和 `this._timeDisplay` append 调用（它们已是 wrapper 的子节点）
- `this._timeEditor` 和 `controls` 仍在 wrapper 下方，结构不变

### 新 DOM 结构

```
container (flex column)
├── ringWrapper (position: relative; 120x120)
│   ├── <svg> (120x120 圆环)
│   └── <div> "25:00" (position: absolute; 居中)
├── <div> (时间编辑器, +/- 按钮)
└── <div> (控制按钮, 开始/暂停/停止)
```

### 修改 C — 修复 `_hideEditor()` 恢复 display 值

**问题**：原始 `_hideEditor()` 中 `this._timeDisplay.style.display = ""` 会**移除** `display` 属性，导致浏览器回退到 div 默认值 `display: block`，而非 mount 时设置的 `display: flex`。结果：`align-items: center; justify-content: center` 对 block 元素无效，文字回到左上角。

原代码：

```js
	_hideEditor() {
		this._timeDisplay.style.display = "";
		this._timeEditor.style.display = "none";
	}
```

替换为：

```js
	_hideEditor() {
		this._timeDisplay.style.display = "flex";
		this._timeEditor.style.display = "none";
	}
```

**原理**：`element.style.display = "none"`（由 `_showEditor()` 设置）会覆盖 `style.cssText` 中的 `display: flex`。之后 `element.style.display = ""` 不会回退到 `cssText` 的值，而是完全移除 inline `display` 属性，浏览器使用元素默认值 `display: block`。必须显式设置为 `"flex"` 才能恢复弹性布局。

### 不受影响的逻辑

以下方法无需修改，因为 `this._svg`、`this._ring`、`this._timeDisplay` 引用仍然有效：

- `update(remaining)` — 更新 `this._timeDisplay.textContent` 和 `this._ring` stroke-dashoffset
- `stop()` — 重置 `this._timeDisplay.textContent` 和 `this._ring` stroke-dashoffset
- `_showEditor()` — 隐藏时间显示、显示编辑器（逻辑不变）

---

# 壁纸模式"开始专注"按钮防护 — 2026-06-10

## 问题

壁纸模式一打开，"开始专注"按钮（由 `PomodoroTimer` 组件渲染）就已经可见。如果用户**没有先选择任务就直接点击"开始专注"**，会启动一个 `taskId = null` 的幽灵番茄钟，导致后续流程断裂：

1. 番茄钟正常运行，但没有关联任何任务
2. 任务选择列表因 `isPomodoroRunning = true` 被隐藏，用户无法回头选任务
3. 结束时（自然结束/点停止/按 ESC）不会弹出退出面板，因为 `currentPomodoroTaskId` 为 null，`showExitPanel` 被跳过
4. 模式标签始终显示"休息模式"

## 根因分析

`PomodoroTimer` 是通用组件，不内嵌业务判断。它的"开始专注"按钮在 idle 状态下始终显示。wallpaper 页面层在 `onStart` 回调中直接把 `selectedTaskId`（初始为 `null`）传给 `startPomodoroFlow`，没有在入口做守卫检查。

```js
// index.html 第 619-621 行 — 原 onStart 回调
onStart: () => {
    startPomodoroFlow(pomodoroTimer.getCurrentMinutes() * 60, selectedTaskId);
},
```

`selectedTaskId` 只在 `selectTask()` 中赋值，初始值为 `null`。

## 修改方案

在选择任务之前，隐藏整个 PomodoroTimer 区域。选了任务后才显示，取消任务后再次隐藏。

**关键陷阱**：`PomodoroTimer.mount()` 内部会执行 `this.container.style.cssText = "display:flex;..."` 覆盖 inline style。因此仅在 HTML 中写 `style="display:none"` 是不够的——必须在 `mount()` 调用之后再显式设置 `display = "none"`。

## 修改内容

### 文件: `src/renderer/wallpaper/index.html`（共 4 处修改）

#### 修改 A — pomodoroArea div 初始隐藏

原代码（第 363 行）：

```html
<div class="wallpaper-pomodoro-area" id="pomodoroArea"></div>
```

替换为：

```html
<div class="wallpaper-pomodoro-area" id="pomodoroArea" style="display:none;"></div>
```

说明：默认加上 `style="display:none;"`，防止页面加载到 `mount()` 执行之间的短暂闪烁。

#### 修改 B — pomodoroTimer.mount() 之后重新隐藏（关键！）

在 `pomodoroTimer.mount();` 之后紧接着插入一行。

原代码：

```js
  pomodoroTimer.mount();

  // Conversation sidebar
```

替换为：

```js
  pomodoroTimer.mount();
  document.getElementById("pomodoroArea").style.display = "none";

  // Conversation sidebar
```

说明：`PomodoroTimer.mount()` 内部会用 `style.cssText = "display:flex;..."` 覆盖整个 inline style（见 `pomodoro-timer.js:21-22`），因此修改 A 的 HTML `style` 属性会被冲掉。必须在 `mount()` 执行完成后重新设置 `display = "none"`，这是本次修复的**关键一步**。

#### 修改 C — selectTask() 中显示 pomodoroArea

在 `selectTask()` 函数中，`expandedTaskId = null;` 之后、`const displayName` 之前，插入一行显示逻辑。

原代码：

```js
  async function selectTask(task, subtask) {
    selectedTaskId = task.id;
    selectedSubtaskId = subtask ? subtask.id : null;
    expandedTaskId = null;

    const displayName = subtask
```

替换为：

```js
  async function selectTask(task, subtask) {
    selectedTaskId = task.id;
    selectedSubtaskId = subtask ? subtask.id : null;
    expandedTaskId = null;

    document.getElementById("pomodoroArea").style.display = "";

    const displayName = subtask
```

说明：`style.display = ""` 移除 inline `display:none`，恢复 CSS 中定义的 `display: flex`。

#### 修改 D — deselectTask() 中隐藏 pomodoroArea

在 `deselectTask()` 函数中，`selectedTaskBadge.style.display = 'none';` 之后插入一行隐藏逻辑。

原代码：

```js
  function deselectTask() {
    selectedTaskId = null;
    selectedSubtaskId = null;
    expandedTaskId = null;
    selectedTaskBadge.style.display = 'none';
    setModeLabel('rest');
    pomodoroTimer.stop();
    renderTaskSelectList();
  }
```

替换为：

```js
  function deselectTask() {
    selectedTaskId = null;
    selectedSubtaskId = null;
    expandedTaskId = null;
    selectedTaskBadge.style.display = 'none';
    document.getElementById("pomodoroArea").style.display = "none";
    setModeLabel('rest');
    pomodoroTimer.stop();
    renderTaskSelectList();
  }
```

说明：取消任务时重新隐藏番茄钟区域，恢复到初始状态。

### 不修改的文件

- `src/renderer/shared/pomodoro-timer.js` — 通用组件，不内嵌业务判断，由页面层控制可见性
- `src/main/ipc-handlers.js` — 不做变更

## 修改后的行为流

1. 用户进入壁纸模式 → `mount()` 后立即设置 `display:none`，只看到任务选择列表和模式标签"休息模式"
2. 用户从任务列表中点击某个任务 → `selectTask()` 执行 → pomodoroArea 显示，"开始专注"按钮出现
3. 用户点击"开始专注" → 番茄钟正常启动，关联已选任务
4. 用户点击"更换"按钮 → `deselectTask()` 执行 → pomodoroArea 隐藏，回到任务列表
5. 番茄钟结束/停止 → exit panel 正常弹出（因为 `currentPomodoroTaskId` 非 null）

## 涉及的 JS 交互契约

| 函数 | pomodoroArea 状态 | 触发时机 |
|------|-------------------|---------|
| 页面初始化 (`mount()` 之后) | `none`（JS 显式设置） | 进入壁纸模式 |
| `selectTask(task, subtask)` | 恢复 CSS display（`""`） | 用户点击任务/子任务 |
| `deselectTask()` | `none` | 用户点击"更换"按钮（非运行中） |

---

# 壁纸模式移除背景选择器 — 2026-06-10

## 问题

壁纸模式下有 Wallpaper Engine 背景选择器（下拉框）和编辑器按钮，但这与四种专注模式（休息/电脑/看书/写字）是两套独立的系统。背景选择器属于纯视觉层装饰，当前阶段不需要，应在模式系统完善后再考虑。

## 删除内容

### 文件: `src/renderer/wallpaper/index.html`（共 5 处删除）

#### 删除 A — `.we-layers` / `.we-layer` CSS 规则

删除以下 CSS 块：

```css
  .we-layers {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
  .we-layer {
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
  }
```

说明：这两个 CSS 类只被 `applyWeWallpaper()` 的 CSS fallback 路径使用，函数删除后不再需要。

#### 删除 B — `.wallpaper-we-selector` CSS 规则

删除以下 CSS 块：

```css
  .wallpaper-we-selector {
    display: none;
    margin-top: var(--space-sm);
    gap: var(--space-sm);
    align-items: center;
  }
  .wallpaper-we-selector.visible {
    display: flex;
  }
  .wallpaper-we-selector label {
    font-size: var(--font-xs);
    color: var(--color-text-muted);
    white-space: nowrap;
  }
  .wallpaper-we-selector select {
    background: var(--color-bg-medium);
    color: var(--color-text-primary);
    border: 1px solid var(--color-bg-light);
    border-radius: var(--radius-sm);
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-sm);
    cursor: pointer;
    outline: none;
    max-width: 160px;
  }
```

#### 删除 C — `weLayers` div HTML

删除：

```html
<div class="we-layers" id="weLayers"></div>
```

#### 删除 D — 编辑器按钮和背景选择器 HTML

删除以下两段 HTML：

```html
<div class="wallpaper-editor-btn" id="editorBtnArea" style="display:none;margin-top:var(--space-sm);gap:var(--space-sm);align-items:center;">
  <button id="openEditorBtn" style="background:var(--color-primary);color:#fff;border:none;border-radius:var(--radius-sm);padding:var(--space-xs) var(--space-sm);font-size:var(--font-sm);cursor:pointer;">Open Editor</button>
</div>

<div class="wallpaper-we-selector" id="weSelector">
  <label>壁纸</label>
  <select id="weSelect"></select>
</div>
```

#### 删除 E — Wallpaper Engine integration JS 代码块

删除以下整个代码块（约 120 行）：

```js
  // ── Wallpaper Engine integration ──
  const weSelector = document.getElementById("weSelector");
  const weSelect = document.getElementById("weSelect");
  let currentWeDir = null;

  async function loadWeWallpapers() {
    const listRes = await ipc.listWeWallpapers();
    if (!listRes.ok || !listRes.data.length) return;

    weSelect.innerHTML = '<option value="">默认背景</option>';
    for (const wp of listRes.data) {
      const opt = document.createElement("option");
      opt.value = wp.dirName;
      opt.textContent = wp.title || wp.dirName;
      weSelect.appendChild(opt);
    }
    weSelector.classList.add("visible");

    const settingsRes = await ipc.getWallpaper();
    const savedWe = settingsRes.ok ? settingsRes.data?.weWallpaperDir : null;
    if (savedWe) {
      weSelect.value = savedWe;
      applyWeWallpaper(savedWe);
    }
  }

  async function applyWeWallpaper(dirName) {
    // ... CSS fallback rendering (70+ lines)
  }

  weSelect.addEventListener("change", function() { ... });
  loadWeWallpapers();

  // Open editor button + showEditorBtn logic
  var editorBtnArea = ...;
  var openEditorBtn = ...;
  ...
```

#### 删除 F — WebGL 初始化中的已保存壁纸加载

原代码：

```js
    document.addEventListener("DOMContentLoaded", async function () {
        await initWebGL();

        // Wire delegation so the dropdown triggers WebGL rendering
        var ipc = new window.IpcClient();
        var state = await ipc.getAppState();
        if (state.ok && state.data && state.data.wallpaperSettings && state.data.wallpaperSettings.weWallpaperDir) {
            applyWeWallpaperWebGL(state.data.wallpaperSettings.weWallpaperDir);
        }
    });

    window._webglApplyWeWallpaper = applyWeWallpaperWebGL;
    // Listen for scene updates from the editor
    if (window.electronAPI && window.electronAPI.editor) { ... }
    window._onEditorSceneApplied = function(sceneData) { ... };
```

替换为：

```js
    document.addEventListener("DOMContentLoaded", async function () {
        await initWebGL();
    });

    window._webglApplyWeWallpaper = applyWeWallpaperWebGL;

    window._onEditorSceneApplied = function(sceneData) {
        if (renderer && sceneData) {
            applyWeWallpaperWebGL(sceneData);
        }
    };
```

说明：保留 `_webglApplyWeWallpaper` 全局函数和 `_onEditorSceneApplied`，因为主 IIFE 中的 `onEditorApply` 监听器仍然依赖它们。只移除启动时加载已保存 WE 壁纸的逻辑。

### 保留的内容

| 内容 | 原因 |
|------|------|
| WebGL canvas (`#webglCanvas`) | 将来可能用于模式特定的视觉渲染 |
| WebGL shader scripts | WebGL 基础设施 |
| `initWebGL()` / `applyWeWallpaperWebGL()` | 全局函数，`onEditorApply` 监听器仍依赖 |
| `_webglApplyWeWallpaper` 导出 | 同上 |
| `ipc.onEditorApply(...)` 监听器 | 保留编辑器联动能力，即使当前无 UI 入口 |
| `we-layer` CSS 文件引用（如 `background: url('../../../assets/backgrounds/we_main.png')`） | body 的静态背景图，与 WE 选择器无关 |

### 不需要修改的文件

- `src/main/ipc-handlers.js` — IPC handler（`WALLPAPER_LOAD_WE`、`WALLPAPER_LIST_WE`、`EDITOR_OPEN` 等）保留，后端能力不受影响
- `src/preload.js` — preload API 保留，不影响其他功能
- `src/renderer/shared/ipc-client.js` — IpcClient 方法保留

---

# 壁纸模式音频区移至番茄钟右侧 — 2026-06-10

## 问题

音频区（白噪音选择器）原本是正常流元素，在番茄钟下方。位置突兀，与番茄钟无视觉关联。

## 修改方案

将番茄钟和音频区包裹在同一容器内，横向并排，共享左上角的 absolute 定位。

## 修改内容

### 文件: `src/renderer/wallpaper/index.html`（共 3 处修改）

#### 修改 A — CSS：拆分定位和布局

原代码：

```css
  .wallpaper-pomodoro-area {
    position: absolute;
    top: var(--space-lg);
    left: var(--space-lg);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
    z-index: 10;
  }
```

替换为：

```css
  .wallpaper-top-left-group {
    position: absolute;
    top: var(--space-lg);
    left: var(--space-lg);
    display: flex;
    align-items: flex-start;
    gap: var(--space-xl);
    z-index: 10;
  }

  .wallpaper-pomodoro-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
```

说明：
- 新增 `.wallpaper-top-left-group` 作为定位容器，`position: absolute` + `display: flex` + `align-items: flex-start` 使子元素横向并排、顶部对齐
- `gap: var(--space-xl)` (32px) 给番茄钟和音频区之间留出间距
- `.wallpaper-pomodoro-area` 去掉 absolute 定位，在容器内正常流，保留 flex column 布局
- `z-index: 10` 移到容器上，统一控制

#### 修改 B — HTML：包裹容器

原代码：

```html
<div class="wallpaper-pomodoro-area" id="pomodoroArea" style="display:none;"></div>

<div id="audioArea"></div>
```

替换为：

```html
<div class="wallpaper-top-left-group" id="topLeftGroup" style="display:none;">
  <div class="wallpaper-pomodoro-area" id="pomodoroArea"></div>
  <div id="audioArea"></div>
</div>
```

说明：
- `#topLeftGroup` 包裹番茄钟和音频区，初始 `display:none`
- `#pomodoroArea` 仍是 `PomodoroTimer` 的挂载目标，ID 不变
- `#audioArea` 仍是 `WhiteNoiseControl` 的挂载目标，ID 不变

#### 修改 C — JS：显示/隐藏目标从 `pomodoroArea` 改为 `topLeftGroup`

所有 `document.getElementById("pomodoroArea").style.display` 替换为 `document.getElementById("topLeftGroup").style.display`，共 3 处：

| 位置 | 函数 | 新值 | 说明 |
|------|------|------|------|
| `selectTask()` | 显示 | `""` | 选任务后显示番茄钟+音频 |
| `deselectTask()` | 隐藏 | `"none"` | 取消任务后隐藏整个区域 |
| `pomodoroTimer.mount()` 之后 | 隐藏 | `"none"` | 初始隐藏，防止 mount() 的 cssText 覆盖 |

注意：`PomodoroTimer` 构造函数的挂载目标保持 `document.getElementById("pomodoroArea")` 不变——组件仍然渲染在 `pomodoroArea` 内部。

### 不修改的文件

- `src/renderer/shared/pomodoro-timer.js` — 通用组件，挂载目标仍为 `pomodoroArea`
- `src/renderer/shared/white-noise-control.js` — 通用组件，挂载目标仍为 `audioArea`

### 新 DOM 结构

```
topLeftGroup (position: absolute; top-left; flex row; gap: 32px)
├── pomodoroArea (flex column)
│   ├── ringWrapper (120x120 SVG + time)
│   ├── timeEditor (± buttons)
│   └── controls (开始/暂停/停止)
└── audioArea (WhiteNoiseControl rendered content)
```

### 修改后的行为流

1. 进入壁纸模式 → `topLeftGroup` 隐藏
2. 选择任务 → `topLeftGroup` 显示，番茄钟在左，音频选择器在右，并排于左上角
3. 番茄钟运行时 → 番茄钟和音频始终并排可见
4. 取消任务 → `topLeftGroup` 隐藏

---

# 壁纸模式自定义音频轨道注册 — 2026-06-12

## 问题

用户在 `assets/audio/` 目录下放置了音频文件（如 `月世界.flac`），但壁纸模式的环境音下拉菜单中不显示该音频。

## 根因分析

壁纸模式的音频轨道列表并非自动扫描 `assets/audio/` 目录，而是从 `assets/worldbooks/default.json` 的 `audio.tracks` 数组中静态读取。数据流：

1. 渲染进程调用 `ipc.getAudioConfig()` → `ipc-client.js:166`
2. 主进程 `ipc-handlers.js` 从 `services.worldBook.audio.tracks` 遍历
3. 对每个 track，拼接 `assets/audio/<track.file>` 路径，通过 `pathToFileURL` 转换为 `file://` URL
4. 返回 `{ tracks: [...], soundVolume: ... }` 给渲染进程
5. `WhiteNoiseControl` 组件根据 `tracks` 数组渲染 `<option>` 列表

如果音频文件没有在 `default.json` 中注册，即使文件已放在 `assets/audio/` 目录下，也不会出现在 UI 中。

## 修改内容

### 文件: `assets/worldbooks/default.json`

在 `audio.tracks` 数组末尾添加新条目。

原代码：

```json
  "audio": {
    "tracks": [
      { "id": "rain", "name": "雨声", "file": "rain.mp3" },
      { "id": "cafe", "name": "咖啡厅", "file": "cafe.mp3" },
      { "id": "fireplace", "name": "壁炉", "file": "fireplace.mp3" }
    ]
  }
```

修改为：

```json
  "audio": {
    "tracks": [
      { "id": "rain", "name": "雨声", "file": "rain.mp3" },
      { "id": "fireplace", "name": "壁炉", "file": "fireplace.mp3" },
      { "id": "moon_world", "name": "月世界", "file": "月世界.flac" }
    ]
  }
```

每项说明：

| 字段 | 含义 | 示例 |
|------|------|------|
| `id` | 唯一标识符，用于 `<option value>` 和程序内部引用 | `"moon_world"` |
| `name` | 下拉菜单中显示的名称 | `"月世界"` |
| `file` | `assets/audio/` 目录下的文件名（含扩展名） | `"月世界.flac"` |

注意：文件名支持 Unicode 字符（如中文）。`pathToFileURL` 会自动处理 URL 编码。

### 后续添加音频的方法

1. 将音频文件放入 `assets/audio/` 目录
2. 在 `assets/worldbooks/default.json` 的 `audio.tracks` 数组中添加对应条目
3. 重启应用

### 音频格式支持

`WhiteNoiseControl._play()` 使用 `new Audio(url)` 播放，格式支持取决于 Electron/Chromium 内置解码器。常见支持格式：MP3、WAV、OGG、FLAC、AAC。若不支持某格式，控制台会静默捕获 `play()` 异常（见 `white-noise-control.js:135-137`）。

---

# 壁纸模式退出时停止音频播放 — 2026-06-12

## 问题

用户在壁纸模式下开始播放环境音后，切换到桌宠模式或软件模式，音频仍在后台继续播放。退出壁纸模式时音频应该立即停止。

## 根因分析

`WindowManager.switchMode()` 在切换模式时仅调用 `oldWin.hide()`（`window-manager.js:109`），不销毁窗口。壁纸窗口的渲染进程保持存活，其中 `WhiteNoiseControl` 创建的 `Audio` 元素继续播放。

关键调用链：

```
switchModeWithCleanup(targetMode)          // main.js:39
  → windowManager.switchMode(targetMode)    // main.js:42
    → oldWin.hide()                         // window-manager.js:109  ← 仅隐藏，不销毁
    → newWin.show()                         // window-manager.js:113
  → newWin.webContents.send(MODE_ACTIVATED) // main.js:46  ← 仅通知新窗口
```

旧窗口未被销毁，也没有收到任何"你被停用了"的通知，因此无法触发清理逻辑。

## 修改方案

新增 `MODE_DEACTIVATED` IPC 通道。`WindowManager.switchMode()` 在隐藏旧窗口之前，向其发送停用消息。壁纸渲染进程监听此消息，销毁 `WhiteNoiseControl` 实例以停止音频。

## 修改内容

### 文件 1: `src/shared/constants.js`

在 `MODE_ACTIVATED` 下方新增 `MODE_DEACTIVATED` 常量。

原代码（第 29 行）：

```js
	MODE_ACTIVATED: "mode:activated",
```

替换为：

```js
	MODE_ACTIVATED: "mode:activated",
	MODE_DEACTIVATED: "mode:deactivated",
```

### 文件 2: `src/main/window-manager.js`

#### 修改 A — 导入 IPC 常量

替换 require 语句。

原代码（第 3 行）：

```js
const { MODE } = require("../shared/constants.js");
```

替换为：

```js
const { MODE, IPC } = require("../shared/constants.js");
```

#### 修改 B — switchMode() 中发送停用消息

在隐藏旧窗口之前，向其 `webContents` 发送 `MODE_DEACTIVATED` 消息。

原代码（`switchMode` 方法内，约第 106-111 行）：

```js
		if (current && current !== targetMode && this._windows.has(current)) {
			this._switching = true;
			this._windows.get(current).hide();
			this._switching = false;
		}
```

替换为：

```js
		if (current && current !== targetMode && this._windows.has(current)) {
			this._switching = true;
			const oldWin = this._windows.get(current);
			if (oldWin && !oldWin.isDestroyed()) {
				oldWin.webContents.send(IPC.MODE_DEACTIVATED, { mode: current });
			}
			oldWin.hide();
			this._switching = false;
		}
```

说明：
- `oldWin` 提取为局部变量，避免重复查找
- `!oldWin.isDestroyed()` 守卫确保窗口未被销毁
- 消息体 `{ mode: current }` 告知渲染进程"你正在离开的模式"，将来可按模式做差异化处理
- 发送在 `hide()` 之前——渲染进程可同步做出反应

### 文件 3: `src/preload.js`

在 `app` 命名空间中新增 `onModeDeactivated` 监听方法。

在 `onModeActivated` 方法之后插入：

```js
		onModeDeactivated(cb) {
			const handler = (_event, mode) => cb(mode);
			ipcRenderer.on(IPC.MODE_DEACTIVATED, handler);
			return () => ipcRenderer.removeListener(IPC.MODE_DEACTIVATED, handler);
		},
```

完整上下文（`app` 对象内，约第 80-84 行）：

```js
		onModeActivated(cb) {
			const handler = (_event, mode) => cb(mode);
			ipcRenderer.on(IPC.MODE_ACTIVATED, handler);
			return () => ipcRenderer.removeListener(IPC.MODE_ACTIVATED, handler);
		},
		onModeDeactivated(cb) {
			const handler = (_event, mode) => cb(mode);
			ipcRenderer.on(IPC.MODE_DEACTIVATED, handler);
			return () => ipcRenderer.removeListener(IPC.MODE_DEACTIVATED, handler);
		},
```

### 文件 4: `src/renderer/shared/ipc-client.js`

在 `IpcClient` 类中新增 `onModeDeactivated` 包装方法。

在 `onModeActivated` 方法之后插入：

```js
	onModeDeactivated(cb) {
		return this.api?.app.onModeDeactivated?.(cb);
	},
```

完整上下文（约第 101-104 行）：

```js
	onModeActivated(cb) {
		return this.api?.app.onModeActivated?.(cb);
	}
	onModeDeactivated(cb) {
		return this.api?.app.onModeDeactivated?.(cb);
	}
```

### 文件 5: `src/renderer/wallpaper/index.html`

在壁纸渲染进程的初始化逻辑中，监听 `MODE_DEACTIVATED` 事件并在回调中销毁 `WhiteNoiseControl`。

在 `initWallpaper()` 调用之前插入：

```js
  // Stop audio when leaving wallpaper mode
  ipc.onModeDeactivated(() => {
    if (whiteNoise) {
      whiteNoise.destroy();
      whiteNoise = null;
    }
  });
```

完整上下文（约第 835-844 行）：

```js
  // Re-load tasks whenever wallpaper mode is activated (user switches back)
  ipc.onModeActivated((data) => {
    if (data.mode === MODE.WALLPAPER) {
      initWallpaper();
    }
  });

  // Stop audio when leaving wallpaper mode
  ipc.onModeDeactivated(() => {
    if (whiteNoise) {
      whiteNoise.destroy();
      whiteNoise = null;
    }
  });

  initWallpaper();
```

说明：
- `whiteNoise.destroy()` 内部调用 `_stopAudio()`，执行 `audio.pause()`、`audio.src = ""`、`audio.load()` 并置空引用
- `whiteNoise = null` 确保后续再次进入壁纸模式时，`getAudioConfig().then()` 回调中会重新创建新的 `WhiteNoiseControl` 实例

### 不需要修改的文件

- `src/main/main.js` — `switchModeWithCleanup` 不做变更，它只负责业务层清理（LLM abort、pomodoro cancel），窗口层通知由 `WindowManager` 负责
- `src/renderer/shared/white-noise-control.js` — 通用组件，`destroy()` 方法已完备
- `src/renderer/pet/index.html` — 桌宠模式不需要响应 `MODE_DEACTIVATED`（无音频播放场景）
- `src/renderer/software/index.html` — 软件模式不需要响应

## 修改后的行为流

1. 壁纸模式下，用户选择音频并开始播放 → `WhiteNoiseControl` 创建 `Audio` 元素，循环播放
2. 用户按 ESC / 托盘菜单切换到桌宠模式 → `WindowManager.switchMode("pet")` 执行：
   a. 向壁纸窗口发送 `MODE_DEACTIVATED` 消息
   b. `onModeDeactivated` 回调执行 → `whiteNoise.destroy()` → 音频停止
   c. 壁纸窗口 `hide()`
   d. 桌宠窗口 `show()`
3. 用户下次进入壁纸模式 → `whiteNoise === null`，`getAudioConfig().then()` 重新创建新的实例

## 涉及的 IPC 契约

| 通道 | 方向 | 载荷 | 触发时机 |
|------|------|------|---------|
| `mode:activated` | main → renderer | `{ mode: string }` | 窗口 show 之后 |
| `mode:deactivated` | main → renderer | `{ mode: string }` | 窗口 hide 之前 |

两个事件成对发送：对于每次模式切换，旧窗口收到 `MODE_DEACTIVATED`，新窗口收到 `MODE_ACTIVATED`。
