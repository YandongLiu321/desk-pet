# 桌宠应用 — 任务发布功能修复记录

> 日期：2026-06-04 | 项目：desk-pet (Electron + DeepSeek API)

---

## 1. 问题背景

桌宠模式（pet mode）下，用户右键角色 → 点击"发布任务"后，输入任务描述发送给 AI，但任务不会被创建。AI 要么把任务当成普通聊天，要么反问他"要进入壁纸模式吗？"。

根本原因有 6 个：

| # | 问题 | 严重度 |
|---|------|--------|
| 1 | `isTaskMode` 标志位只能通过右键菜单→"发布任务"激活，左键打开对话强制置为 false，且界面无任何视觉提示 | 致命 |
| 2 | 任务创建失败时 `.catch(() => {})` 吞掉所有错误，用户看不到反馈 | 高 |
| 3 | 创建成功后没有刷新任务面板，即使成功也看不到 | 中 |
| 4 | AI 响应的 JSON 被流式输出到界面，用户能看到原始代码 | 高 |
| 5 | LLM 返回的 JSON 如果包在 markdown 代码块（```json ```）中，解析器无法识别 | 中 |
| 6 | System Prompt 中 `[行为指令]` 和 `[任务转化]` 两段指令冲突——用户说"做试卷"，AI 按 `[行为指令]` 的"干活→问壁纸"规则走，跳过了任务创建 | 致命 |

---

## 2. 修改的文件

### 文件 A：`src/renderer/pet/index.html`

**路径**：`src/renderer/pet/index.html`

#### 修改 A1：新增 CSS（在 `</style>` 之前插入）

在 `.pet-task-panel.open { ... }` 之后、`</style>` 之前，添加以下样式：

```css
  .pet-task-indicator {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-xs) var(--space-sm);
    background: var(--color-primary);
    color: white;
    font-size: var(--font-sm);
    font-weight: bold;
  }

  .pet-task-indicator.active {
    display: flex;
  }

  .pet-task-indicator-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: var(--font-base);
    padding: 0;
    line-height: 1;
  }

  .pet-task-toggle {
    background: none;
    border: 1px solid var(--color-bg-light);
    color: var(--color-text-muted);
    cursor: pointer;
    font-size: var(--font-xs);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    margin-right: var(--space-xs);
    white-space: nowrap;
    transition: all 0.2s;
  }

  .pet-task-toggle.active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }
```

#### 修改 A2：`closeAll()` 函数

将函数内最后一行 `isTaskMode = false;` 改为 `setTaskMode(false);`。

位置：大约在 inline `<script>` 的第 13 行（`closeAll` 函数体最后一行）。

改前：
```javascript
function closeAll() {
    document.getElementById("convContainer").classList.remove("open");
    document.getElementById("taskPanel").classList.remove("open");
    document.getElementById("contextMenu").classList.remove("open");
    hideBubble();
    isTaskMode = false;
}
```

改后：
```javascript
function closeAll() {
    document.getElementById("convContainer").classList.remove("open");
    document.getElementById("taskPanel").classList.remove("open");
    document.getElementById("contextMenu").classList.remove("open");
    hideBubble();
    setTaskMode(false);
}
```

#### 修改 A3：左键点击角色

将 `isTaskMode = false;` 改为 `setTaskMode(false);`。

位置：`charArea.addEventListener("click", ...)` 回调函数内第一行。

改前：
```javascript
charArea.addEventListener("click", (e) => {
    if (wasLongPress) return;
    e.stopPropagation();
    isTaskMode = false;
    convContainer.classList.toggle("open");
```

改后：
```javascript
charArea.addEventListener("click", (e) => {
    if (wasLongPress) return;
    e.stopPropagation();
    setTaskMode(false);
    convContainer.classList.toggle("open");
```

#### 修改 A4：右键菜单"发布任务"

将 `isTaskMode = true;` 改为 `setTaskMode(true);`。

位置：`ctxMenu.querySelectorAll(...)` 回调中 `action === "create-task"` 分支。

改前：
```javascript
if (action === "create-task") {
    isTaskMode = true;
    convContainer.classList.add("open");
```

改后：
```javascript
if (action === "create-task") {
    setTaskMode(true);
    convContainer.classList.add("open");
```

#### 修改 A5：流式输出改为缓冲（关键修改）

将 `onChunk` 回调从"逐字追加到界面"改为"静默缓冲"；`onDone` 中改为一次性显示清理后的文本。

位置：`onSend` 回调内的 `onChunk` 和 `onDone` 监听器。

**onChunk — 改前**：
```javascript
const unsubChunk = ipc.onChunk((chunk) => {
    if (!currentMsg) { currentMsg = true; convPanel.addMessage("assistant", ""); }
    const msgs = convPanel._msgList.querySelectorAll(".conv-msg--assistant");
    const last = msgs[msgs.length - 1];
    if (last) last.textContent += chunk;
});
```

**onChunk — 改后**：
```javascript
const unsubChunk = ipc.onChunk((chunk) => {
    if (!currentMsg) { currentMsg = true; }
});
```

**onDone — 改前**（displayText 部分）：
```javascript
const unsubDone = ipc.onDone((data) => {
    convPanel.hideTyping();
    unsubChunk();
    unsubDone();
    if (data.displayText) {
      const msgs = convPanel._msgList.querySelectorAll(".conv-msg--assistant");
      const last = msgs[msgs.length - 1];
      if (last) last.textContent = data.displayText;
    }
```

**onDone — 改后**（displayText 部分）：
```javascript
const unsubDone = ipc.onDone((data) => {
    convPanel.hideTyping();
    unsubChunk();
    unsubDone();
    if (data.displayText) {
      convPanel.addMessage("assistant", data.displayText);
    }
```

#### 修改 A6：任务创建的错误处理

将 `onDone` 中任务创建分支从静默吞错改为有反馈。

位置：`onDone` 回调中 `if (data.intent === INTENT.CREATE_TASK)` 分支。

**改前**：
```javascript
if (data.intent === INTENT.CREATE_TASK) {
    ipc.createTask(data.taskPayload).catch(() => {});
} else if (data.intent === INTENT.SWITCH_MODE && data.switchTarget) {
```

**改后**：
```javascript
if (data.intent === INTENT.CREATE_TASK && data.taskPayload) {
    ipc.createTask(data.taskPayload).then((res) => {
      if (res.ok) {
        convPanel.addMessage("assistant", "✨ 任务已记录在星之书中~");
        loadTasks();
        setTaskMode(false);
      } else {
        convPanel.showError(res.error);
      }
    });
} else if (data.intent === INTENT.SWITCH_MODE && data.switchTarget) {
```

**关键变化**：
- 加了 `data.taskPayload` 的空值检查
- `.catch(() => {})` 改为 `.then()` 检查 `res.ok`
- 成功后调用 `loadTasks()` 刷新面板、`setTaskMode(false)` 自动退出任务模式
- 失败后调用 `convPanel.showError()` 显示友好提示

#### 修改 A7：在 `convPanel.mount()` 之后插入任务模式 UI

在 `convPanel.mount();` 和 `// Task panel` 注释之间，插入以下代码块：

```javascript
// ── Task mode indicator + toggle ──
const taskIndicator = document.createElement("div");
taskIndicator.className = "pet-task-indicator";
taskIndicator.innerHTML = '<span>🔮 任务模式 — 描述任务，AI会自动创建</span><button class="pet-task-indicator-close">&times;</button>';
taskIndicator.querySelector(".pet-task-indicator-close").addEventListener("click", (e) => {
  e.stopPropagation();
  setTaskMode(false);
});
convContainer.insertBefore(taskIndicator, convContainer.firstChild);

const taskToggle = document.createElement("button");
taskToggle.className = "pet-task-toggle";
taskToggle.textContent = "📋任务";
taskToggle.title = "切换任务模式";
const inputRow = convContainer.querySelector(".conv-input-row");
if (inputRow) {
  inputRow.insertBefore(taskToggle, inputRow.firstChild);
}
taskToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  setTaskMode(!isTaskMode);
});

function setTaskMode(on) {
  isTaskMode = on;
  taskIndicator.classList.toggle("active", on);
  taskToggle.classList.toggle("active", on);
  convPanel._input.placeholder = on ? "描述你要发布的任务..." : "和露娜说点什么吧...";
}
```

**说明**：
- `taskIndicator`：对话窗口顶部的蓝色提示条，任务模式激活时显示
- `taskToggle`：输入框左侧的切换按钮，点击可在普通聊天/任务模式之间切换
- `setTaskMode(on)`：统一管理 `isTaskMode` 状态和所有 UI 变化（指示条、按钮高亮、输入框占位文字）

---

### 文件 B：`src/main/llm-service.js`

**路径**：`src/main/llm-service.js`

#### 修改 B1：`_extractIntent()` — 处理 markdown 代码块

在 `_extractIntent(text)` 方法中，在原有正则匹配之前插入代码块剥离逻辑。

位置：`_extractIntent` 方法体 `try` 块开头。

**改前**（该方法开头部分）：
```javascript
_extractIntent(text) {
    try {
        // Try create_task intent
        const taskMatch = text.match(
            /\{[\s\S]*"intent"\s*:\s*"create_task"[\s\S]*\}/,
        );
```

**改后**：
```javascript
_extractIntent(text) {
    try {
        // Strip markdown code fences — LLM often wraps JSON in ```json ... ```
        let searchText = text;
        const fenceMatches = [...text.matchAll(/```(?:json)?\s*([\s\S]*?)```/g)];
        for (const m of fenceMatches) {
            if (m[1].includes('"intent"')) {
                searchText = m[1];
                break;
            }
        }

        // Try create_task intent
        const taskMatch = searchText.match(
            /\{[\s\S]*"intent"\s*:\s*"create_task"[\s\S]*\}/,
        );
```

#### 修改 B2：`_cleanDisplayText()` — 同样处理代码块

在 `_cleanDisplayText(text)` 方法开头插入相同的代码块剥离逻辑。

位置：`_cleanDisplayText` 方法体 `let cleaned = text;` 之后。

**改后**：
```javascript
_cleanDisplayText(text) {
    let cleaned = text;
    // Strip markdown code fences before cleaning
    const fenceMatches = [...text.matchAll(/```(?:json)?\s*([\s\S]*?)```/g)];
    for (const m of fenceMatches) {
        if (m[1].includes('"intent"')) {
            cleaned = cleaned.replace(m[0], m[1]);
        }
    }
    for (const pattern of [
        // ... 后续保持不变
```

**说明**：`_extractIntent` 是先剥离代码块再从中搜索 JSON（解析用）；`_cleanDisplayText` 是用代码块内容替换代码块整体（显示用）。两者逻辑一致但用法不同。

#### 修改 B3：`buildSystemPrompt()` — 互斥分支重构（核心修改）

这是最关键的架构级修改。将原来混在一起的 `[行为指令]` + `[模式切换]` + `[任务转化]`（条件追加）改为基于 `enableTaskCreation` 的互斥分支。

**改前**（从 `[行为指令]` 到 `if (enableTaskCreation)` 块的结束）：
```javascript
		`[行为指令]`,
		`- 回复控制在 50-100 字`,
		`- 在主动互动时，保持简短（不超过 50 字）`,
		`- 识别用户切换模式的意图，但必须在用户明确同意后才输出模式切换 JSON：`,
		`  - 用户说"想开始专注/干活/执行任务/开始番茄钟"等 → 先以角色口吻询问"要进入壁纸模式吗？"`,
		`  - 用户说"想看剧情/进度/结算/进入软件模式"等 → 先以角色口吻询问"要打开星之书查看进度吗？"`,
		`  - 用户同意（"好""嗯""可以""是的"）后，才输出切换 JSON`,
		"",
		`[模式切换]`,
		`当用户明确同意切换模式后，返回以下 JSON（不要包含其他文字）：`,
		`{"intent":"switch_mode","mode":"wallpaper"} 或 {"intent":"switch_mode","mode":"software"}`,
	];

	if (enableTaskCreation) {
		sections.push(
			"",
			`[任务转化]`,
			`当前处于任务发布模式。用户说的每一句话都是在描述待办事项，你必须将其转化为任务。`,
			`1. 先用角色口吻简短回应用户（1-2句话即可）`,
			`2. 然后在回复末尾输出以下 JSON（不要用代码块包裹）：`,
			`{"intent":"create_task","realTask":"用一句话概括用户的任务","rpgTitle":"RPG化的任务标题","rpgDescription":"RPG氛围的任务描述","estimatedPomodoros":2,"estimatedMinutes":50,"subtasks":[{"realDesc":"子任务实际描述","rpgDesc":"子任务RPG描述"}]}`,
		);
	}
```

**改后**：
```javascript
		`[行为指令]`,
	];

	if (enableTaskCreation) {
		sections.push(
			`- 回复控制在 30-60 字`,
			`- 当前是任务发布模式。用户只会在这里发布任务，你的唯一职责是识别任务并转化为结构化数据`,
			`- 先用角色口吻简短回应（1-2句话），然后在末尾输出任务 JSON（不要用代码块包裹）：`,
			`{"intent":"create_task","realTask":"用一句话概括","rpgTitle":"RPG化标题","rpgDescription":"RPG氛围描述","estimatedPomodoros":2,"estimatedMinutes":50,"subtasks":[{"realDesc":"子任务实际描述","rpgDesc":"子任务RPG描述"}]}`,
			`- 禁止询问壁纸模式或软件模式，禁止输出模式切换 JSON`,
		);
	} else {
		sections.push(
			`- 回复控制在 50-100 字，主动互动时保持简短`,
			`- 根据对话自然判断用户意图：用户有专注/做事意愿时，以角色口吻询问是否进入壁纸模式；用户想看进度/数据时，询问是否打开软件模式`,
			`- 用户同意后，在回复末尾输出模式切换 JSON：{"intent":"switch_mode","mode":"wallpaper"} 或 {"intent":"switch_mode","mode":"software"}`,
		);
	}
```

**设计原则**：
- 互斥：`enableTaskCreation=true` 时，Prompt 中不出现任何模式切换相关内容；`false` 时，不出现任何任务转化内容
- 任务模式：单一职责——识别任务、RPG 化、输出 JSON，硬约束禁止模式切换
- 对话模式：保留自然判断空间，让 AI 自己感知用户是否想切换模式，不写死关键词

---

### 文件 C：`data/db.json`（数据清理）

1. 删除 `tasks` 数组中的测试任务：`"tasks": [{...}]` → `"tasks": []`
2. 删除对话记录中包含原始 JSON 的消息（最后 2 轮含任务创建的 user+assistant 配对）

**不涉及结构修改**，只清理运行中产生的脏数据。

---

## 3. 按时间顺序的操作步骤

### 步骤 1：探索代码库，定位问题
- 阅读 `src/renderer/pet/index.html`（宠模式 UI + 内联 JS）
- 阅读 `src/main/llm-service.js`（AI 对话 + Prompt 构建 + JSON 解析）
- 阅读 `src/renderer/shared/ipc-client.js`（IPC 客户端封装）
- 阅读 `src/main/ipc-handlers.js`（IPC 服务端处理）
- 阅读 `src/main/task-service.js`（任务业务逻辑）
- 阅读 `src/renderer/shared/conversation-panel.js`（对话 UI 组件）

### 步骤 2：第一轮修复（UI + 错误处理 + JSON 解析）
1. 修改 `src/renderer/pet/index.html`：
   - 添加 CSS（`.pet-task-indicator`、`.pet-task-toggle`）
   - `closeAll()`：`isTaskMode = false` → `setTaskMode(false)`
   - 左键点击：`isTaskMode = false` → `setTaskMode(false)`
   - 右键"发布任务"：`isTaskMode = true` → `setTaskMode(true)`
   - `convPanel.mount()` 后插入任务模式指示条 + 切换按钮 + `setTaskMode()` 函数
   - `onDone` 回调：任务创建改为 `.then()` 处理成功/失败，成功后刷新列表
2. 修改 `src/main/llm-service.js`：
   - `_extractIntent`：添加 markdown 代码块剥离逻辑（3 行新增）
   - `buildSystemPrompt` 的 `[任务转化]` 部分：改为更强调的指令（第一版）
3. 清理 `data/db.json`：删除测试任务

### 步骤 3：用户测试反馈
- 问题：流式输出时原始 JSON 短暂出现在对话中
- 问题：AI 仍未在第一次输入时创建任务（用户说"我要做试卷"，AI 反问"要进壁纸模式吗？"）

### 步骤 4：第二轮修复（流式输出 + 强化 Prompt）
1. `src/renderer/pet/index.html`：`onChunk` 改为只标记已接收，不追加 DOM；`onDone` 中使用 `convPanel.addMessage("assistant", data.displayText)` 一次性显示清理后文本
2. `src/main/llm-service.js`：
   - `buildSystemPrompt`：`[任务转化]` 指令进一步强化（第二版）
   - `_cleanDisplayText`：同样添加代码块剥离逻辑
3. 清理 `data/db.json`：删除失败的对话记录

### 步骤 5：用户再次测试反馈
- 问题依旧：任务模式下 AI 仍然反问"要进壁纸模式吗？"

### 步骤 6：根因重新分析
发现根本问题：`[行为指令]`（含"干活→问壁纸"规则）和 `[任务转化]`（含"每句话都是任务"规则）同时存在于 Prompt 中，且 `[行为指令]` 排在前面，AI 优先执行先匹配到的规则。

### 步骤 7：架构重构（最终方案）
将 `buildSystemPrompt` 的 `[行为指令]` 部分改为条件互斥：
- `enableTaskCreation=true`：只写任务转化指令，硬约束禁止模式切换
- `enableTaskCreation=false`：只写聊天+自然判断模式切换，不留任务转化内容

### 步骤 8：最终任务列表状态确认
- `data/db.json` 中 `"tasks": []`
- 对话记录已清理

---

## 4. 最终文件内容

### `src/renderer/pet/index.html`（完整文件 492 行）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>桌宠 — 露娜·月语</title>
<link rel="stylesheet" href="../shared/styles/base.css">
<style>
  html, body {
    width: var(--win-pet-width);
    height: var(--win-pet-height);
    background: transparent !important;
    overflow: hidden;
    margin: 0;
    padding: 0;
    -webkit-app-region: drag;
  }

  .pet-char-area {
    position: absolute;
    left: 240px;
    top: 20px;
    width: var(--char-pet-size);
    height: var(--char-pet-size);
    pointer-events: auto;
    z-index: 10;
    cursor: default;
    -webkit-app-region: no-drag;
  }

  .pet-char-area.grabbing {
    cursor: grabbing;
  }

  .pet-bubble {
    display: none;
    position: absolute;
    left: 220px;
    top: 0px;
    max-width: 180px;
    padding: var(--space-xs) var(--space-sm);
    background: var(--color-bg-medium);
    border: 1px solid var(--color-primary-light);
    border-radius: var(--radius-md);
    font-size: var(--font-sm);
    color: var(--color-text-primary);
    z-index: 50;
    pointer-events: auto;
    cursor: pointer;
    -webkit-app-region: no-drag;
    align-items: center;
    gap: var(--space-xs);
  }

  .pet-bubble.open {
    display: flex;
  }

  .pet-bubble-text {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .pet-bubble-close {
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    font-size: var(--font-base);
    padding: 0;
    line-height: 1;
    flex-shrink: 0;
  }

  .pet-bubble-close:hover {
    color: var(--color-text-primary);
  }

  .pet-conv-container {
    display: none;
    position: absolute;
    left: 0px;
    top: 20px;
    width: 240px;
    height: 400px;
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    z-index: 20;
    pointer-events: auto;
    -webkit-app-region: no-drag;
    background: var(--color-bg-dark);
  }

  .pet-conv-container.open {
    display: flex;
    flex-direction: column;
  }

  .pet-context-menu {
    display: none;
    position: absolute;
    left: 370px;
    top: 20px;
    min-width: 130px;
    background: var(--color-bg-medium);
    border: 1px solid var(--color-bg-light);
    border-radius: var(--radius-sm);
    padding: var(--space-xs) 0;
    z-index: 100;
    pointer-events: auto;
    -webkit-app-region: no-drag;
    box-shadow: var(--shadow-md);
  }

  .pet-context-menu.open {
    display: block;
  }

  .pet-context-menu-item {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-sm);
    color: var(--color-text-primary);
    cursor: pointer;
  }

  .pet-context-menu-item:hover {
    background: var(--color-bg-light);
  }

  .pet-task-panel {
    display: none;
    position: absolute;
    left: 0px;
    top: 20px;
    width: 240px;
    max-height: 300px;
    background: var(--color-bg-dark);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 30;
    pointer-events: auto;
    -webkit-app-region: no-drag;
    overflow: hidden;
  }

  .pet-task-panel.open {
    display: flex;
    flex-direction: column;
  }

  .pet-task-indicator {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-xs) var(--space-sm);
    background: var(--color-primary);
    color: white;
    font-size: var(--font-sm);
    font-weight: bold;
  }

  .pet-task-indicator.active {
    display: flex;
  }

  .pet-task-indicator-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: var(--font-base);
    padding: 0;
    line-height: 1;
  }

  .pet-task-toggle {
    background: none;
    border: 1px solid var(--color-bg-light);
    color: var(--color-text-muted);
    cursor: pointer;
    font-size: var(--font-xs);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    margin-right: var(--space-xs);
    white-space: nowrap;
    transition: all 0.2s;
  }

  .pet-task-toggle.active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }
</style>
</head>
<body>

<div class="pet-bubble" id="bubble">
  <span class="pet-bubble-text" id="bubbleText"></span>
  <button class="pet-bubble-close" id="bubbleClose">&times;</button>
</div>

<div class="pet-char-area" id="charArea" title="点击聊天 | 长按拖动 | 右键菜单"></div>

<div class="pet-conv-container" id="convContainer"></div>

<div class="pet-context-menu" id="contextMenu">
  <div class="pet-context-menu-item" data-action="create-task">发布任务</div>
  <div class="pet-context-menu-item" data-action="wallpaper">壁纸模式</div>
  <div class="pet-context-menu-item" data-action="software">软件模式</div>
  <div class="pet-context-menu-item" data-action="tasks">查看任务</div>
  <div class="pet-context-menu-item" data-action="quit">隐藏</div>
</div>

<div class="pet-task-panel" id="taskPanel"></div>

<script src="../../shared/constants.js"></script>
<script src="../shared/ipc-client.js"></script>
<script src="../shared/dom-utils.js"></script>
<script src="../shared/state-manager.js"></script>
<script src="../shared/character-renderer.js"></script>
<script src="../shared/conversation-panel.js"></script>
<script src="../shared/task-panel.js"></script>
<script>
(() => {
  const { IpcClient, CharacterRenderer, ConversationPanel, TaskPanel } = window;
  const { INTENT, MODE } = window;
  const ipc = new IpcClient();
  let isTaskMode = false;
  let bubbleTimer = null;

  function closeAll() {
    document.getElementById("convContainer").classList.remove("open");
    document.getElementById("taskPanel").classList.remove("open");
    document.getElementById("contextMenu").classList.remove("open");
    hideBubble();
    setTaskMode(false);
  }

  // Bubble
  const bubble = document.getElementById("bubble");
  const bubbleText = document.getElementById("bubbleText");
  const bubbleClose = document.getElementById("bubbleClose");

  function showBubble(text) {
    bubbleText.textContent = text;
    bubble.classList.add("open");
    if (bubbleTimer) clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => hideBubble(), 5000);
  }

  function hideBubble() {
    bubble.classList.remove("open");
    if (bubbleTimer) { clearTimeout(bubbleTimer); bubbleTimer = null; }
  }

  bubble.addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("convContainer").classList.add("open");
    hideBubble();
  });

  bubbleClose.addEventListener("click", (e) => {
    e.stopPropagation();
    hideBubble();
  });

  // Character renderer
  const charRenderer = new CharacterRenderer(document.getElementById("charArea"), {
    mode: "pet", size: 120,
  });
  charRenderer.mount();

  // Conversation panel
  const convContainer = document.getElementById("convContainer");
  const convPanel = new ConversationPanel(convContainer, {
    position: "bottom",
    onSend: async (text) => {
      // Check API key before sending
      const keyRes = await ipc.getApiKey();
      if (!keyRes.ok || !keyRes.data?.apiKey) {
        convPanel.addMessage("assistant", "旅者，你还没有设置与星辰通讯的密钥。\n\n请打开软件模式 → 设置，或直接在 data/db.json 中配置 apiKey 后再来找我聊天吧~");
        return;
      }

      convPanel.showTyping();
      let currentMsg = null;
      const unsubChunk = ipc.onChunk((chunk) => {
        if (!currentMsg) { currentMsg = true; }
      });
      const unsubDone = ipc.onDone((data) => {
        convPanel.hideTyping();
        unsubChunk();
        unsubDone();
        if (data.displayText) {
          convPanel.addMessage("assistant", data.displayText);
        }
        if (data.intent === INTENT.CREATE_TASK && data.taskPayload) {
          ipc.createTask(data.taskPayload).then((res) => {
            if (res.ok) {
              convPanel.addMessage("assistant", "✨ 任务已记录在星之书中~");
              loadTasks();
              setTaskMode(false);
            } else {
              convPanel.showError(res.error);
            }
          });
        } else if (data.intent === INTENT.SWITCH_MODE && data.switchTarget) {
          convContainer.classList.remove("open");
          ipc.switchMode(data.switchTarget).catch(() => {});
        }
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
  });
  convPanel.mount();

  // ── Task mode indicator + toggle ──
  const taskIndicator = document.createElement("div");
  taskIndicator.className = "pet-task-indicator";
  taskIndicator.innerHTML = '<span>🔮 任务模式 — 描述任务，AI会自动创建</span><button class="pet-task-indicator-close">&times;</button>';
  taskIndicator.querySelector(".pet-task-indicator-close").addEventListener("click", (e) => {
    e.stopPropagation();
    setTaskMode(false);
  });
  convContainer.insertBefore(taskIndicator, convContainer.firstChild);

  const taskToggle = document.createElement("button");
  taskToggle.className = "pet-task-toggle";
  taskToggle.textContent = "📋任务";
  taskToggle.title = "切换任务模式";
  const inputRow = convContainer.querySelector(".conv-input-row");
  if (inputRow) {
    inputRow.insertBefore(taskToggle, inputRow.firstChild);
  }
  taskToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setTaskMode(!isTaskMode);
  });

  function setTaskMode(on) {
    isTaskMode = on;
    taskIndicator.classList.toggle("active", on);
    taskToggle.classList.toggle("active", on);
    convPanel._input.placeholder = on ? "描述你要发布的任务..." : "和露娜说点什么吧...";
  }

  // Task panel
  const taskPanelContainer = document.getElementById("taskPanel");
  const taskPanel = new TaskPanel(taskPanelContainer, {
    compact: true,
    onToggle: (taskId, subId) => ipc.toggleSubtask(taskId, subId).then(() => loadTasks()),
    onViewDetail: () => {},
  });
  taskPanel.mount();

  async function loadTasks() {
    const res = await ipc.getTasks("active");
    if (res.ok) taskPanel.setTasks(res.data);
  }

  // ── Character interaction ──
  const charArea = document.getElementById("charArea");
  const LONG_PRESS_MS = 300;
  const DRAG_TICK_MS = 16;
  let longPressTimer = null;
  let isDragging = false;
  let wasLongPress = false;
  let dragLastSX = 0;
  let dragLastSY = 0;
  let dragAccDx = 0;
  let dragAccDy = 0;
  let dragTickTimer = null;

  function flushDrag() {
    if (dragAccDx !== 0 || dragAccDy !== 0) {
      ipc.moveWindowBy(dragAccDx, dragAccDy);
      dragAccDx = 0;
      dragAccDy = 0;
    }
    dragTickTimer = null;
  }

  function endDrag() {
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
    if (dragTickTimer) { clearTimeout(dragTickTimer); dragTickTimer = null; }
    if (isDragging) {
      isDragging = false;
      flushDrag();
    }
    charArea.classList.remove("grabbing");
    // wasLongPress is NOT reset here — click handler checks it
  }

  charArea.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    endDrag();
    wasLongPress = false;
    dragLastSX = e.screenX;
    dragLastSY = e.screenY;
    dragAccDx = 0;
    dragAccDy = 0;
    longPressTimer = setTimeout(() => {
      wasLongPress = true;
      isDragging = true;
      charArea.classList.add("grabbing");
    }, LONG_PRESS_MS);
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    dragAccDx += e.screenX - dragLastSX;
    dragAccDy += e.screenY - dragLastSY;
    dragLastSX = e.screenX;
    dragLastSY = e.screenY;
    if (!dragTickTimer) {
      dragTickTimer = setTimeout(flushDrag, DRAG_TICK_MS);
    }
  });

  document.addEventListener("mouseup", () => endDrag());

  // Left-click → toggle conversation (charArea is no-drag, click fires reliably)
  charArea.addEventListener("click", (e) => {
    if (wasLongPress) return;
    e.stopPropagation();
    setTaskMode(false);
    convContainer.classList.toggle("open");
    taskPanelContainer.classList.remove("open");
    charRenderer.setMotion("bounce");
    setTimeout(() => charRenderer.setMotion("idle"), 300);
    loadTasks();
  });

  // Right-click → toggle context menu
  const ctxMenu = document.getElementById("contextMenu");
  charArea.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    ctxMenu.classList.toggle("open");
  });

  // Context menu items
  ctxMenu.querySelectorAll(".pet-context-menu-item").forEach((item) => {
    item.addEventListener("click", async (e) => {
      e.stopPropagation();
      const action = item.dataset.action;
      if (action === "create-task") {
        setTaskMode(true);
        convContainer.classList.add("open");
        taskPanelContainer.classList.remove("open");
      } else if (action === MODE.WALLPAPER || action === MODE.SOFTWARE) {
        await ipc.switchMode(action);
      } else if (action === "tasks") {
        taskPanelContainer.classList.toggle("open");
        convContainer.classList.remove("open");
      } else if (action === "quit") {
        ipc.hideWindow();
      }
      ctxMenu.classList.remove("open");
    });
  });

  // Prevent clicks inside panels from bubbling to document
  convContainer.addEventListener("click", (e) => e.stopPropagation());
  taskPanelContainer.addEventListener("click", (e) => e.stopPropagation());
  ctxMenu.addEventListener("click", (e) => e.stopPropagation());

  // Click outside → close all floating panels
  document.addEventListener("click", () => closeAll());

  // ESC → close all floating panels
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  window._petShowBubble = showBubble;
})();
</script>
</body>
</html>
```

### `src/main/llm-service.js`（完整文件 289 行）

```javascript
const { API_CONFIG, INTENT, MODE } = require("../shared/constants.js");

class LLMService {
	/**
	 * @param {object} config
	 * @param {string} config.apiKey
	 * @param {import('./database').Database} config.db
	 * @param {object} config.worldBook
	 */
	constructor(config) {
		this.apiKey = config.apiKey;
		this.db = config.db;
		this.worldBook = config.worldBook;
		this._abortController = null;
		this._retried = false;
	}

	/**
	 * @param {object} context
	 * @param {string} context.currentMode
	 * @param {object} [context.activeTask]
	 * @param {boolean} [context.enableTaskCreation]
	 * @returns {string}
	 */
	buildSystemPrompt(context) {
		const enableTaskCreation = context.enableTaskCreation || false;
		const char = this.worldBook.character;
		const world = this.worldBook;
		const rel = this.db.getRelationship();
		const ws = this.db.getWorldState();
		const chapter =
			world.storyChapters.find((c) => c.chapterId === ws.currentChapter) ||
			world.storyChapters[0];

		const sections = [
			`[角色设定]`,
			`你是${char.name}，${char.background}`,
			`你的性格是${char.personality}。说话风格：${char.speechStyle}`,
			"",
			`[世界背景]`,
			`你来自${world.title}——${world.description}。`,
			`当前章节：第${ws.currentChapter}章「${chapter?.title || ""}」`,
			`世界规则：${world.rules.join("；")}`,
			"",
			`[关系状态]`,
			`你与用户的关系阶段：${rel.stage}`,
			`你们已经一起完成了${rel.totalTasksCompleted}项任务。`,
			"",
			`[当前上下文]`,
			`当前模式：${context.currentMode}`,
			`活跃任务：${context.activeTask?.realTitle || "无"}`,
			"",
			`[行为指令]`,
		];

		if (enableTaskCreation) {
			sections.push(
				`- 回复控制在 30-60 字`,
				`- 当前是任务发布模式。用户只会在这里发布任务，你的唯一职责是识别任务并转化为结构化数据`,
				`- 先用角色口吻简短回应（1-2句话），然后在末尾输出任务 JSON（不要用代码块包裹）：`,
				`{"intent":"create_task","realTask":"用一句话概括","rpgTitle":"RPG化标题","rpgDescription":"RPG氛围描述","estimatedPomodoros":2,"estimatedMinutes":50,"subtasks":[{"realDesc":"子任务实际描述","rpgDesc":"子任务RPG描述"}]}`,
				`- 禁止询问壁纸模式或软件模式，禁止输出模式切换 JSON`,
			);
		} else {
			sections.push(
				`- 回复控制在 50-100 字，主动互动时保持简短`,
				`- 根据对话自然判断用户意图：用户有专注/做事意愿时，以角色口吻询问是否进入壁纸模式；用户想看进度/数据时，询问是否打开软件模式`,
				`- 用户同意后，在回复末尾输出模式切换 JSON：{"intent":"switch_mode","mode":"wallpaper"} 或 {"intent":"switch_mode","mode":"software"}`,
			);
		}

		return sections.join("\n");
	}

	/**
	 * @param {{ message: string, enableTaskCreation?: boolean }} options
	 * @param {(text: string) => void} onChunk
	 * @param {(fullText: string, metadata?: object) => void} onDone
	 * @param {(error: { type: string, message: string, retried: boolean }) => void} onError
	 */
	async chat(options, onChunk, onDone, onError) {
		this._abortController = new AbortController();
		this._retried = false;
		await this._doChat(options, onChunk, onDone, onError);
	}

	_buildChatMessages(options) {
		const appState = this.db.getAppState();
		const activeTask = this.db.getTasks({ status: "active" })[0];
		const systemPrompt = this.buildSystemPrompt({
			currentMode: appState.currentMode,
			activeTask,
			enableTaskCreation: options.enableTaskCreation,
		});
		const conv = this.db.getActiveConversation();
		const history = this.db.getRecentMessages(conv.id, 20);
		return [
			{ role: "system", content: systemPrompt },
			...history.map((m) => ({ role: m.role, content: m.content })),
			{ role: "user", content: options.message },
		];
	}

	_extractSSEContent(trimmed) {
		if (!trimmed?.startsWith("data: ")) return null;
		const data = trimmed.slice(6);
		if (data === "[DONE]") return null;
		try {
			const parsed = JSON.parse(data);
			return parsed.choices?.[0]?.delta?.content || null;
		} catch {
			return null;
		}
	}

	_persistChatResult(convId, options, fullText, metadata) {
		metadata.displayText = this._cleanDisplayText(fullText);
		this.db.addMessage(convId, { role: "user", content: options.message });
		this.db.addMessage(convId, { role: "assistant", content: fullText });
		this.db.updateCharacter({ lastInteractionAt: new Date().toISOString() });
		const rel = this.db.getRelationship();
		this.db.updateRelationship({
			totalConversations: rel.totalConversations + 1,
			lastInteractionAt: new Date().toISOString(),
		});
	}

	async _handleChatError(err, options, onChunk, onDone, onError) {
		if (err.name === "AbortError") return;
		if (!this._retried) {
			this._retried = true;
			await this._sleep(1000);
			await this._doChat(options, onChunk, onDone, onError);
			return;
		}
		onError({ type: "network", message: err.message, retried: this._retried });
	}

	async _doChat(options, onChunk, onDone, onError) {
		const messages = this._buildChatMessages(options);
		const conv = this.db.getActiveConversation();
		try {
			const response = await fetch(API_CONFIG.URL, {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
				body: JSON.stringify({ model: API_CONFIG.MODEL, messages, temperature: 0.8, max_tokens: 500, stream: true }),
				signal: this._abortController.signal,
			});
			if (!response.ok) {
				onError({ type: "api", message: `API error: ${response.status}`, retried: false });
				return;
			}
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let fullText = "";
			let buffer = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop() || "";
				for (const line of lines) {
					const content = this._extractSSEContent(line.trim());
					if (content) {
						fullText += content;
						onChunk(content);
					}
				}
			}
			const metadata = this._extractIntent(fullText);
			this._persistChatResult(conv.id, options, fullText, metadata);
			onDone(fullText, metadata);
		} catch (err) {
			await this._handleChatError(err, options, onChunk, onDone, onError);
		}
	}

	/** @param {string} text */
	_extractIntent(text) {
		try {
			// Strip markdown code fences — LLM often wraps JSON in ```json ... ```
			let searchText = text;
			const fenceMatches = [...text.matchAll(/```(?:json)?\s*([\s\S]*?)```/g)];
			for (const m of fenceMatches) {
				if (m[1].includes('"intent"')) {
					searchText = m[1];
					break;
				}
			}

			// Try create_task intent
			const taskMatch = searchText.match(
				/\{[\s\S]*"intent"\s*:\s*"create_task"[\s\S]*\}/,
			);
			if (taskMatch) {
				const parsed = JSON.parse(taskMatch[0]);
				if (parsed.intent === INTENT.CREATE_TASK) {
					return {
						intent: INTENT.CREATE_TASK,
						taskPayload: {
							realTitle: parsed.realTask || "",
							rpgTitle: parsed.rpgTitle || "",
							rpgDescription: parsed.rpgDescription || "",
							estimatedPomodoros: parsed.estimatedPomodoros || 1,
							estimatedMinutes: parsed.estimatedMinutes || 25,
							subtasks: (parsed.subtasks || []).map((s, i) => ({
								id: `sub_${Date.now()}_${i}`,
								realDesc: s.realDesc || "",
								rpgDesc: s.rpgDesc || "",
								completed: false,
							})),
						},
					};
				}
			}

			// Try switch_mode intent
			const switchMatch = text.match(
				/\{[\s\S]*"intent"\s*:\s*"switch_mode"[\s\S]*\}/,
			);
			if (switchMatch) {
				const parsed = JSON.parse(switchMatch[0]);
				if (
					parsed.intent === INTENT.SWITCH_MODE &&
					[MODE.WALLPAPER, MODE.SOFTWARE].includes(parsed.mode)
				) {
					return {
						intent: INTENT.SWITCH_MODE,
						switchTarget: parsed.mode,
					};
				}
			}
		} catch {
			// JSON parse failure → return as plain text
		}
		return {};
	}

	/** @param {string} text */
	_cleanDisplayText(text) {
		let cleaned = text;
		// Strip markdown code fences before cleaning
		const fenceMatches = [...text.matchAll(/```(?:json)?\s*([\s\S]*?)```/g)];
		for (const m of fenceMatches) {
			if (m[1].includes('"intent"')) {
				cleaned = cleaned.replace(m[0], m[1]);
			}
		}
		for (const pattern of [
			/\{"intent"\s*:\s*"create_task"[\s\S]*\}/,
			/\{"intent"\s*:\s*"switch_mode"[\s\S]*\}/,
		]) {
			const match = cleaned.match(pattern);
			if (match) {
				try {
					JSON.parse(match[0]);
					cleaned = cleaned.replace(match[0], "");
				} catch {
					// brace-counting fallback for unbalanced JSON
					const start = match.index;
					let depth = 0;
					let end = start;
					for (let i = start; i < cleaned.length; i++) {
						if (cleaned[i] === "{") depth++;
						if (cleaned[i] === "}") depth--;
						if (depth === 0) { end = i + 1; break; }
					}
					if (end > start) cleaned = cleaned.slice(0, start) + cleaned.slice(end);
				}
			}
		}
		return cleaned.trim();
	}

	_sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	abort() {
		if (this._abortController) {
			this._abortController.abort();
			this._abortController = null;
		}
	}
}

module.exports = { LLMService };
```

---

## 5. `data/db.json` 最终状态

tasks 数组为空，对话记录已清理不含原始 JSON。

---

## 6. 总结

| 轮次 | 改动 | 文件 |
|------|------|------|
| 1 | UI 任务模式指示器 + 切换按钮 + 错误处理 + 初始 Prompt 调整 | `pet/index.html`, `llm-service.js` |
| 2 | 流式输出缓冲 + Prompt 强化 | `pet/index.html`, `llm-service.js` |
| 3 | `[行为指令]` 互斥分支重构 | `llm-service.js` |

核心变更：`buildSystemPrompt` 中 `enableTaskCreation` 的两个分支完全互斥，任务模式下 AI 看不到模式切换指令，对话模式下 AI 看不到任务转化指令。从根源上消除了 Prompt 冲突。
