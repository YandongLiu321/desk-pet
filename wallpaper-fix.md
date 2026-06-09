# 昨日修改总结

本次修改围绕**壁纸模式**展开，涵盖以下 7 个方面：

1. **番茄钟小时显示** — `pomodoro-timer.js`：剩余时间 ≥ 60 分钟时显示 `H:MM:SS`，< 60 分钟保持 `MM:SS`。
2. **任务自动分类** — 新建 `task-classifier.js`，基于关键词加权打分将任务分为 `computer`/`reading`/`writing` 三种模式，修改 `llm-service.js`、`task-service.js`、`main.js` 完成集成，分类结果存于 `data/task-mode-mapping.json`。
3. **壁纸模式任务选择与模式标签** — 新增 `TASK_GET_MODE` IPC 通道（贯穿 constants → handlers → preload → ipc-client），`wallpaper/index.html` 增加模式标签、任务选择列表、已选任务徽章、更换按钮，预留 4 个壁纸视频文件夹。
4. **Bug 修复：选中任务后选择框仍显示** — `renderTaskSelectList()` 增加 `|| selectedTaskId` 条件。
5. **退出面板百分比进度输入** — "还没完成"界面增加百分比输入框，`min` 动态设为上次累积进度，进度只增不减。
6. **任务累积进度追踪** — 新增 `TASK_UPDATE_PROGRESS` IPC，`task-service.updateProgress()` 实现进度只增不减 + 自动调整预计时间。
7. **子任务粒度选择 + 退出面板简化** — `wallpaper/index.html` 重构：两级任务选择（父→子）、时长均分、退出面板简化为 3 按钮、完成后留壁纸模式刷新列表。

涉及文件：`pomodoro-timer.js`、`task-classifier.js`（新）、`llm-service.js`、`task-service.js`、`main.js`、`constants.js`、`ipc-handlers.js`、`preload.js`、`ipc-client.js`、`wallpaper/index.html`，以及 `assets/wallpapers/` 下 4 个 `.gitkeep`。

---

# Wallpaper Pomodoro Timer — 增加小时显示

## 目标

壁纸模式下番茄钟倒计时原本只显示 `MM:SS`（分钟:秒），当番茄钟时长超过 60 分钟时，用户无法看到小时数。改为：剩余时间 ≥ 60 分钟时显示 `H:MM:SS`，< 60 分钟时保持 `MM:SS`。

## 修改文件

### `src/renderer/shared/pomodoro-timer.js`

找到 `update(remaining)` 方法（约第 117 行），将原来的时间格式化逻辑：

```js
/** @param {number} remaining seconds */
update(remaining) {
    this._remaining = remaining;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    this._timeDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
```

替换为：

```js
/** @param {number} remaining seconds */
update(remaining) {
    this._remaining = remaining;
    const hours = Math.floor(remaining / 3600);
    const mins = Math.floor((remaining % 3600) / 60);
    const secs = remaining % 60;
    if (hours > 0) {
        this._timeDisplay.textContent = `${hours}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    } else {
        this._timeDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
```

## 说明

- `hours` 不补零（显示 `1:25:00` 而非 `01:25:00`），更简洁
- 当 `hours === 0` 时走原有分支，不影响短番茄钟的显示效果
- `stop()` 方法中重置文本 `"25:00"` 无需修改，因为默认 25 分钟不会触发小时显示

---

# 任务自动分类功能 — 电脑模式/看书模式/写字模式

## 目标

用户发布任务后，AI 根据任务标题和描述做语义分析，将任务分类为以下三种模式之一：
- `computer`（电脑模式）— 需要电脑的任务：写代码、做PPT、查资料等
- `reading`（看书模式）— 需要阅读实体书/资料的任务：看教材、读论文、复习等
- `writing`（写字模式）— 需要手写/手绘的任务：做笔记、做题、画图等

分类结果**不展示给用户**，保存在独立的 JSON 映射文件中，仅供 AI 内部使用（后续壁纸模式根据分类切换 3 种壁纸）。

## 新增文件

### `src/main/task-classifier.js`

创建 `TaskClassifier` 类，完整写入以下内容：

```js
const path = require("node:path");
const fs = require("node:fs");

/**
 * Keywords for mode classification.
 * Each entry is [keyword, weight] — higher weight = stronger signal.
 */
const MODE_KEYWORDS = {
	computer: [
		// Explicit computer tools
		["代码", 5], ["编程", 5], ["debug", 5], ["调试", 5],
		["开发", 5], ["写代码", 5], ["重构", 5],
		["网站", 4], ["应用", 3], ["app", 3], ["程序", 4],
		["页面", 3], ["组件", 3], ["接口", 3], ["api", 3],
		["前端", 5], ["后端", 5], ["数据库", 5], ["服务器", 5],
		["部署", 5], ["上线", 5], ["配置", 4], ["环境", 3],
		["git", 5], ["commit", 5], ["push", 5], ["pr", 4],
		// Documents / office
		["ppt", 5], ["幻灯片", 5], ["演示", 3],
		["excel", 5], ["表格", 4], ["数据", 2],
		["文档", 3], ["报告", 4], ["汇报", 3],
		["邮件", 4], ["email", 4],
		// Design / media
		["设计稿", 5], ["ui", 4], ["figma", 5], ["ps", 4],
		["剪辑", 5], ["视频", 3], ["修图", 4],
		// Search / research on computer
		["搜索", 2], ["查资料", 3], ["调研", 2], ["数据分析", 4],
		// Writing on computer (context: article/blog/copy)
		["写文章", 4], ["博客", 4], ["blog", 4], ["文案", 4],
	],
	reading: [
		// Explicit reading
		["看书", 5], ["读书", 5], ["阅读", 5], ["翻阅", 4],
		["看教材", 5], ["读论文", 5], ["看论文", 5],
		["看文献", 5], ["读文献", 5], ["文献", 3],
		["看资料", 3], ["翻资料", 3],
		// Learning / reviewing
		["复习", 4], ["预习", 4], ["学习", 2],
		["背单词", 5], ["背公式", 5], ["记忆", 3], ["背诵", 5],
		["掌握", 1], ["了解", 1], ["理解", 1],
		// Reading specific
		["教材", 4], ["课本", 4], ["论文", 3], ["章节", 2],
		["读", 2],
	],
	writing: [
		// Handwriting
		["手写", 5], ["练字", 5], ["抄写", 5], ["默写", 5],
		["写笔记", 5], ["整理笔记", 5], ["笔记", 2],
		// Exercises / homework
		["做题", 5], ["刷题", 5], ["习题", 5], ["试卷", 5],
		["作业", 4], ["练习", 3], ["题目", 3],
		// Drawing by hand
		["画草图", 5], ["手绘", 5], ["画图", 3], ["画", 1],
		["思维导图", 3],
		// Writing by hand
		["写作业", 5], ["写题", 5], ["写字", 4],
	],
};

class TaskClassifier {
	constructor(dataDir) {
		this._path = path.join(dataDir, "task-mode-mapping.json");
		this._mapping = this._load();
	}

	classify(task, llmMode) {
		const mode = llmMode || this._analyzeKeywords(task);
		this._mapping[task.id] = mode;
		this._persist();
		return mode;
	}

	getMode(taskId) {
		return this._mapping[taskId] || null;
	}

	getAllMappings() {
		return { ...this._mapping };
	}

	_load() {
		try {
			if (fs.existsSync(this._path)) {
				return JSON.parse(fs.readFileSync(this._path, "utf-8"));
			}
		} catch { /* corrupt file → start fresh */ }
		return {};
	}

	_persist() {
		const dir = path.dirname(this._path);
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		fs.writeFileSync(this._path, JSON.stringify(this._mapping, null, 2), "utf-8");
	}

	_analyzeKeywords(task) {
		const text = [
			task.realTitle || "",
			task.rpgTitle || "",
			task.rpgDescription || "",
			...(task.subtasks || []).map((s) => `${s.realDesc || ""} ${s.rpgDesc || ""}`),
		].join(" ").toLowerCase();

		const scores = { computer: 0, reading: 0, writing: 0 };

		for (const [mode, keywords] of Object.entries(MODE_KEYWORDS)) {
			for (const [keyword, weight] of keywords) {
				if (text.includes(keyword.toLowerCase())) {
					scores[mode] += weight;
				}
			}
		}

		let bestMode = "computer";
		let bestScore = 0;
		for (const [mode, score] of Object.entries(scores)) {
			if (score > bestScore) {
				bestScore = score;
				bestMode = mode;
			}
		}

		return bestMode;
	}
}

module.exports = { TaskClassifier };
```

## 修改文件

### 1. `src/main/llm-service.js`

**修改点 A — 系统提示词中的任务 JSON 模板（约第 61 行）**

找到：
```js
`{"intent":"create_task","realTask":"用一句话概括","rpgTitle":"RPG化标题","rpgDescription":"RPG氛围描述","estimatedPomodoros":2,"estimatedMinutes":50,"subtasks":[{"realDesc":"子任务实际描述","rpgDesc":"子任务RPG描述"}]}`,
`- 禁止询问壁纸模式或软件模式，禁止输出模式切换 JSON`,
```

替换为：
```js
`{"intent":"create_task","realTask":"用一句话概括","rpgTitle":"RPG化标题","rpgDescription":"RPG氛围描述","estimatedPomodoros":2,"estimatedMinutes":50,"mode":"computer","subtasks":[{"realDesc":"子任务实际描述","rpgDesc":"子任务RPG描述"}]}`,
`- mode 取值：computer（需要电脑的任务，如写代码/做PPT/查资料）、reading（需要阅读实体书/资料的任务，如看教材/读论文/复习）、writing（需要手写/手绘的任务，如做笔记/做题/画图）`,
`- 根据任务性质选择最合适的 mode`,
`- 禁止询问壁纸模式或软件模式，禁止输出模式切换 JSON`,
```

**修改点 B — `_extractIntent()` 方法中 taskPayload 的构建（约第 201-213 行）**

在 `taskPayload` 对象中增加 `mode: parsed.mode || null,` 一行，放在 `estimatedMinutes` 之后、`subtasks` 之前：
```js
mode: parsed.mode || null,
```

### 2. `src/main/task-service.js`

**修改点 A — 构造函数签名和实现**

找到：
```js
constructor({ db, worldBook }) {
    this.db = db;
    this.worldBook = worldBook;
}
```

替换为：
```js
constructor({ db, worldBook, classifier }) {
    this.db = db;
    this.worldBook = worldBook;
    this.classifier = classifier || null;
}
```

**修改点 B — `createTask(data)` 方法**

找到：
```js
createTask(data) {
    if (!data.realTitle || !data.realTitle.trim()) {
        throw new Error("TASK_CREATE_INVALID: realTitle is required");
    }
    return this.db.createTask(data);
}
```

替换为：
```js
createTask(data) {
    if (!data.realTitle || !data.realTitle.trim()) {
        throw new Error("TASK_CREATE_INVALID: realTitle is required");
    }
    // Extract mode hint before persisting (mode is not a DB field)
    const mode = data.mode || null;
    delete data.mode;
    const task = this.db.createTask(data);
    if (this.classifier) {
        this.classifier.classify(task, mode);
    }
    return task;
}
```

**修改点 C — `createFromAIResponse(payload)` 方法末尾**

找到：
```js
		};
		return this.db.createTask(taskData);
```

替换为：
```js
		};
		const task = this.db.createTask(taskData);
		if (this.classifier) {
			const llmMode = ["computer", "reading", "writing"].includes(payload.mode)
				? payload.mode
				: null;
			this.classifier.classify(task, llmMode);
		}
		return task;
```

### 3. `src/main/main.js`

**修改点 A — 顶部 import 区域**

找到：
```js
const { TaskService } = require("./task-service");
```

在其后添加：
```js
const { TaskClassifier } = require("./task-classifier");
```

**修改点 B — 初始化区域（约第 140 行）**

找到：
```js
const taskService = new TaskService({ db, worldBook });
```

替换为：
```js
const classifier = new TaskClassifier(path.join(__dirname, "..", "..", "data"));
const taskService = new TaskService({ db, worldBook, classifier });
```

## 数据存储

分类结果存储在 `data/task-mode-mapping.json`，格式：
```json
{
  "task_1234567890_abcde": "computer",
  "task_1234567891_fghij": "reading"
}
```

该文件是自动创建和维护的，不会被 UI 读取，仅供 AI 内部使用。

## 分类逻辑

- **用户通过 AI 对话创建任务**：LLM 在任务 JSON 中输出 `mode` 字段，被 `_extractIntent` 提取后流经 metadata → renderer → IPC → `TaskService`，最终被 `TaskClassifier` 直接使用（最高优先级）
- **用户手动创建任务**：`mode` 字段不存在，`TaskClassifier` 使用关键词语义分析，对 `realTitle` + `rpgTitle` + `rpgDescription` + 子任务描述进行加权打分，得分最高的模式当选
- 如果所有模式得分均为 0（无法判断），默认归类为 `computer`

---

# 壁纸模式任务选择与模式显示功能

## 目标

进入壁纸模式后实现以下流程：
- **有活跃任务**：显示"休息模式"标签 + 任务选择列表 → 用户选择任务 → AI 根据分类显示对应模式标签（电脑模式/看书模式/写字模式）→ 用户手动按"开始专注" → 番茄钟启动 → 按暂停 → 回到"休息模式" → 按继续 → 恢复任务模式标签
- **无活跃任务**：显示"休息模式"标签 + 默认 25 分钟番茄钟（空闲状态），无需选择任务，直接按"开始专注"即可
- **模式标签**：暂时纯文字显示，预留视频壁纸文件夹供后续使用
- **暂停/休息**：按下暂停键或选择任务阶段，显示"休息模式"壁纸

## 新增文件

### 1. `assets/wallpapers/rest/.gitkeep`

空文件，预留"休息模式"动态壁纸文件夹。

### 2. `assets/wallpapers/computer/.gitkeep`

空文件，预留"电脑模式"动态壁纸文件夹。

### 3. `assets/wallpapers/reading/.gitkeep`

空文件，预留"看书模式"动态壁纸文件夹。

### 4. `assets/wallpapers/writing/.gitkeep`

空文件，预留"写字模式"动态壁纸文件夹。

> 四个文件夹路径：`assets/wallpapers/{rest,computer,reading,writing}/`，后续将放入视频循环播放的动态壁纸文件。

## 修改文件

### 1. `src/shared/constants.js`

在 `IPC` 对象的 Tasks 区域，`TASK_GET_BY_ID` 之后新增一行：

```js
TASK_GET_MODE: "task:get-mode",
```

完整上下文（修改后的 Tasks 区域）：

```js
	// Tasks
	TASK_GET_ALL: "task:get-all",
	TASK_GET_BY_ID: "task:get-by-id",
	TASK_GET_MODE: "task:get-mode",
	TASK_CREATE: "task:create",
	TASK_UPDATE: "task:update",
	TASK_TOGGLE_SUBTASK: "task:toggle-subtask",
	TASK_COMPLETE: "task:complete",
	TASK_DELETE: "task:delete",
```

### 2. `src/main/ipc-handlers.js`

在 `TASK_DELETE` handler 之前插入新的 `TASK_GET_MODE` handler。

找到：
```js
	ipcMain.handle(IPC.TASK_DELETE, (_event, { taskId }) => runSafe(() => { taskService.deleteTask(taskId); return null; }));
```

在其**前面**插入：
```js
	ipcMain.handle(IPC.TASK_GET_MODE, (_event, { taskId }) => runSafe(() => {
		if (!taskService.classifier) return null;
		return taskService.classifier.getMode(taskId);
	}));
```

### 3. `src/preload.js`

**修改点 — task 命名空间**

在 `task` 对象的 `getById` 方法之后，新增 `getMode` 方法。

找到：
```js
	task: {
		getAll(status) {
			return ipcRenderer.invoke(IPC.TASK_GET_ALL, { status });
		},
		getById(taskId) {
			return ipcRenderer.invoke(IPC.TASK_GET_BY_ID, { taskId });
		},
		create(data) {
```

替换为：
```js
	task: {
		getAll(status) {
			return ipcRenderer.invoke(IPC.TASK_GET_ALL, { status });
		},
		getById(taskId) {
			return ipcRenderer.invoke(IPC.TASK_GET_BY_ID, { taskId });
		},
		getMode(taskId) {
			return ipcRenderer.invoke(IPC.TASK_GET_MODE, { taskId });
		},
		create(data) {
```

### 4. `src/renderer/shared/ipc-client.js`

**修改点 — IpcClient 类**

在 `getTaskById` 方法之后，新增 `getTaskMode` 方法。

找到：
```js
	async getTaskById(taskId) {
		return this._call("task.getById", taskId);
	}
	async createTask(data) {
```

替换为：
```js
	async getTaskById(taskId) {
		return this._call("task.getById", taskId);
	}
	async getTaskMode(taskId) {
		return this._call("task.getMode", taskId);
	}
	async createTask(data) {
```

### 5. `src/renderer/wallpaper/index.html` — 核心重写

> **注意**：本节描述的 `wallpaper/index.html` JS 代码（任务选择函数、exit panel 回调等）已被后续的"壁纸模式子任务粒度选择 + 退出面板简化"重构**完整替换**。此处保留以记录：
> 1. 本节内 IPC/constants/preload/ipc-client 的改动（5.1-5.4）仍然有效
> 2. CSS 样式（mode label、task selection、selected badge）仍然有效
> 3. HTML 结构（mode label、task select area、selected badge）仍然有效
>
> wallpaper/index.html 的 JS 逻辑请以文末"壁纸模式子任务粒度选择 + 退出面板简化"章节为准。

这是最主要的改动文件。下面的修改按照 "替换整个文件" 的方式给出，分为 CSS 样式变更、HTML 结构变更、JS 逻辑变更三部分分别说明。

---

#### 5a. CSS 样式新增

在原有的 `<style>` 标签内，`.wallpaper-bg-layer` 样式之后、`.wallpaper-char-area` 之前，新增以下四个 CSS 块：

**模式标签样式：**

```css
  /* ── Mode label ── */
  .wallpaper-mode-label {
    position: absolute;
    top: 8%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    pointer-events: none;
  }
  .wallpaper-mode-label-text {
    font-size: 48px;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    text-shadow: 0 0 40px rgba(107,92,231,0.6), 0 4px 12px rgba(0,0,0,0.5);
    letter-spacing: 8px;
    transition: all 0.6s ease;
  }
  .wallpaper-mode-label-text.mode--rest { color: rgba(180,200,220,0.85); text-shadow: 0 0 30px rgba(100,140,180,0.4), 0 4px 12px rgba(0,0,0,0.5); }
  .wallpaper-mode-label-text.mode--computer { color: rgba(120,200,255,0.9); text-shadow: 0 0 40px rgba(70,130,255,0.6), 0 4px 12px rgba(0,0,0,0.5); }
  .wallpaper-mode-label-text.mode--reading { color: rgba(160,230,160,0.9); text-shadow: 0 0 40px rgba(80,180,80,0.6), 0 4px 12px rgba(0,0,0,0.5); }
  .wallpaper-mode-label-text.mode--writing { color: rgba(255,200,130,0.9); text-shadow: 0 0 40px rgba(220,150,50,0.6), 0 4px 12px rgba(0,0,0,0.5); }
```

**任务选择区域样式：**

```css
  /* ── Task selection ── */
  .wallpaper-task-select {
    position: absolute;
    bottom: 18%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background: rgba(20,20,40,0.85);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--radius-lg);
    padding: var(--space-md) var(--space-lg);
    min-width: 320px;
    max-width: 420px;
    max-height: 260px;
    overflow-y: auto;
    backdrop-filter: blur(10px);
  }
  .wallpaper-task-select-title {
    font-size: var(--font-sm);
    color: var(--color-text-muted);
    text-align: center;
    margin-bottom: var(--space-sm);
    letter-spacing: 2px;
  }
  .wallpaper-task-select-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: background 0.2s;
    color: var(--color-text-primary);
    font-size: var(--font-sm);
  }
  .wallpaper-task-select-item:hover {
    background: rgba(107,92,231,0.2);
  }
  .wallpaper-task-select-item.selected {
    background: rgba(107,92,231,0.35);
    border: 1px solid rgba(107,92,231,0.5);
  }
  .wallpaper-task-select-item-meta {
    font-size: var(--font-xs);
    color: var(--color-text-muted);
    margin-left: var(--space-sm);
    white-space: nowrap;
  }
```

**已选任务徽章样式：**

```css
  /* ── Selected task badge ── */
  .wallpaper-selected-task {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-xs) var(--space-md);
    background: rgba(107,92,231,0.2);
    border: 1px solid rgba(107,92,231,0.35);
    border-radius: var(--radius-full, 20px);
    font-size: var(--font-sm);
    color: var(--color-text-primary);
    margin-bottom: var(--space-sm);
  }
  .wallpaper-change-task-btn {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: var(--color-text-muted);
    font-size: var(--font-xs);
    padding: 2px var(--space-sm);
    border-radius: var(--radius-sm);
    cursor: pointer;
  }
  .wallpaper-change-task-btn:hover {
    background: rgba(255,255,255,0.2);
    color: var(--color-text-primary);
  }
```

---

#### 5b. HTML 结构变更

在 `<body>` 内，`.wallpaper-bg-layer` 之后、`.wallpaper-char-area` 之前，新增以下三个 HTML 块：

```html
<!-- Mode label -->
<div class="wallpaper-mode-label" id="modeLabel">
  <span class="wallpaper-mode-label-text mode--rest" id="modeLabelText">休息模式</span>
</div>
```

在 `.wallpaper-char-area` 之后、`.wallpaper-pomodoro-area` 之前，新增：

```html
<!-- Task selection area -->
<div class="wallpaper-task-select" id="taskSelectArea" style="display:none;">
  <div class="wallpaper-task-select-title">选择任务开始专注</div>
  <div id="taskSelectList"></div>
</div>

<!-- Selected task badge -->
<div class="wallpaper-selected-task" id="selectedTaskBadge" style="display:none;">
  <span id="selectedTaskName"></span>
  <button class="wallpaper-change-task-btn" id="changeTaskBtn">更换</button>
</div>
```

> 注意：`<div class="wallpaper-char-area" ...>` 保持在原来的位置（模式标签和任务选择之间），不做移动。

---

#### 5c. JavaScript 逻辑变更

这是最大的改动部分。具体修改如下：

**(1) 替换 IIFE 中的状态变量和初始化代码**

在 `(() => {` 之后，`const { IpcClient, ...` 行之后，将原来的：
```js
  let currentPomodoroTaskId = null;
  let isExitingWithTask = false;
```

替换为：
```js
  // Mode label constants
  const MODE_LABELS = {
    rest: '休息模式',
    computer: '电脑模式',
    reading: '看书模式',
    writing: '写字模式',
  };
  const MODE_CSS_CLASS = {
    rest: 'mode--rest',
    computer: 'mode--computer',
    reading: 'mode--reading',
    writing: 'mode--writing',
  };

  // ── State ──
  let activeTasks = [];
  let selectedTaskId = null;
  let selectedTaskMode = 'rest'; // 'rest' | 'computer' | 'reading' | 'writing'
  let currentPomodoroTaskId = null;
  let isExitingWithTask = false;
  let isPomodoroRunning = false;
```

**(2) 在 ipc.onEditorApply 之后，character 初始化之前，新增模式标签和任务选择逻辑：**

```js
  // ── Mode label ──
  const modeLabelText = document.getElementById("modeLabelText");
  function setModeLabel(mode) {
    selectedTaskMode = mode;
    modeLabelText.textContent = MODE_LABELS[mode] || MODE_LABELS.rest;
    modeLabelText.className = 'wallpaper-mode-label-text ' + (MODE_CSS_CLASS[mode] || MODE_CSS_CLASS.rest);
  }
  setModeLabel('rest');

  // ── Task selection ──
  const taskSelectArea = document.getElementById("taskSelectArea");
  const taskSelectList = document.getElementById("taskSelectList");
  const selectedTaskBadge = document.getElementById("selectedTaskBadge");
  const selectedTaskName = document.getElementById("selectedTaskName");

  function renderTaskSelectList() {
    taskSelectList.innerHTML = '';
    if (activeTasks.length === 0 || selectedTaskId) {
      taskSelectArea.style.display = 'none';
      return;
    }
    taskSelectArea.style.display = '';
    for (const task of activeTasks) {
      const item = document.createElement('div');
      item.className = 'wallpaper-task-select-item';
      if (task.id === selectedTaskId) item.classList.add('selected');
      const titleSpan = document.createElement('span');
      titleSpan.textContent = task.rpgTitle || task.realTitle;
      const metaSpan = document.createElement('span');
      metaSpan.className = 'wallpaper-task-select-item-meta';
      metaSpan.textContent = (task.estimatedPomodoros || 1) + '🍅 ' + (task.estimatedMinutes || 25) + 'min';
      item.appendChild(titleSpan);
      item.appendChild(metaSpan);
      item.addEventListener('click', () => selectTask(task));
      taskSelectList.appendChild(item);
    }
  }

  async function selectTask(task) {
    selectedTaskId = task.id;
    selectedTaskName.textContent = task.rpgTitle || task.realTitle;
    selectedTaskBadge.style.display = '';
    taskSelectArea.style.display = 'none';

    // Query the classifier for the task mode
    const modeRes = await ipc.getTaskMode(task.id);
    const mode = (modeRes.ok && modeRes.data) ? modeRes.data : 'rest';
    setModeLabel(mode);

    renderTaskSelectList();
  }

  function deselectTask() {
    selectedTaskId = null;
    selectedTaskBadge.style.display = 'none';
    setModeLabel('rest');
    renderTaskSelectList();
  }
```

**(3) 修改 `startPomodoroFlow` 函数**

将原来的：
```js
  async function startPomodoroFlow(durationSeconds, taskId) {
    clearPomodoroListeners();
    const durationMinutes = durationSeconds / 60;
    const res = await ipc.startPomodoro(durationMinutes, taskId);
    if (!res.ok) return;
    pomodoroTimer.start(durationSeconds);
    currentPomodoroTaskId = taskId || null;
    pomodoroTickUnsub = ipc.onPomodoroTick((data) => {
      if (data.remaining >= 0) pomodoroTimer.update(data.remaining);
    });
    pomodoroEndUnsub = ipc.onPomodoroEnd(() => {
      clearPomodoroListeners();
      pomodoroTimer.stop();
    });
  }
```

替换为：
```js
  async function startPomodoroFlow(durationSeconds, taskId) {
    clearPomodoroListeners();
    const durationMinutes = durationSeconds / 60;
    const res = await ipc.startPomodoro(durationMinutes, taskId);
    if (!res.ok) return;
    pomodoroTimer.start(durationSeconds);
    currentPomodoroTaskId = taskId || null;
    isPomodoroRunning = true;
    // Set mode to task's mode (or rest if no task)
    if (taskId && selectedTaskMode !== 'rest') {
      setModeLabel(selectedTaskMode);
    }
    pomodoroTickUnsub = ipc.onPomodoroTick((data) => {
      if (data.remaining >= 0) pomodoroTimer.update(data.remaining);
    });
    pomodoroEndUnsub = ipc.onPomodoroEnd(() => {
      clearPomodoroListeners();
      pomodoroTimer.stop();
      isPomodoroRunning = false;
      setModeLabel('rest');
    });
  }
```

**(4) 修改 `PomodoroTimer` 构造函数的回调**

将原来的：
```js
  const pomodoroTimer = new PomodoroTimer(document.getElementById("pomodoroArea"), {
    onStart: () => startPomodoroFlow(25 * 60, currentPomodoroTaskId),
    onPause: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
    },
    onResume: () => {
      const remaining = pomodoroTimer.getRemaining();
      startPomodoroFlow(remaining, currentPomodoroTaskId);
    },
    onStop: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      currentPomodoroTaskId = null;
      pomodoroTimer.stop();
    },
  });
```

替换为：
```js
  const pomodoroTimer = new PomodoroTimer(document.getElementById("pomodoroArea"), {
    onStart: () => {
      // Determine duration: use selected task's estimatedMinutes, or default 25
      const task = selectedTaskId ? activeTasks.find(t => t.id === selectedTaskId) : null;
      const durationMin = task?.estimatedMinutes || 25;
      startPomodoroFlow(durationMin * 60, selectedTaskId);
    },
    onPause: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      isPomodoroRunning = false;
      // Switch to rest mode when paused
      setModeLabel('rest');
    },
    onResume: () => {
      const remaining = pomodoroTimer.getRemaining();
      startPomodoroFlow(remaining, currentPomodoroTaskId);
    },
    onStop: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      isPomodoroRunning = false;
      currentPomodoroTaskId = null;
      setModeLabel('rest');
      pomodoroTimer.stop();
    },
  });
```

**(5) 在 `loadWeWallpapers()` 调用之后，新增更换任务按钮和 ESC 键盘处理前后的逻辑**

在 `loadWeWallpapers();` 之后、`var editorBtnArea = ...` 之前，新增：

```js
  // ── Change task button ──
  document.getElementById("changeTaskBtn").addEventListener("click", () => {
    // Show task selection again (if pomodoro is not running)
    if (!isPomodoroRunning) {
      taskSelectArea.style.display = '';
      selectedTaskBadge.style.display = 'none';
      selectedTaskId = null;
      setModeLabel('rest');
      currentPomodoroTaskId = null;
      renderTaskSelectList();
    }
  });
```

**(6) 修改 `hideExitPanel` 函数**

将原来的：
```js
  function hideExitPanel() {
    isExitingWithTask = false;
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    window._exitTaskId = null;
  }
```

替换为（新增 `setModeLabel('rest')` 调用）：
```js
  function hideExitPanel() {
    isExitingWithTask = false;
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    window._exitTaskId = null;
    setModeLabel('rest');
  }
```

**(7) 在文件末尾，`initWallpaper()` 调用替换为以下完整初始化逻辑**

删除原来的文件末尾（`initWallpaper` 相关代码），替换为：

```js
  // ── Init: load tasks and decide initial state ──
  async function initWallpaper() {
    const tasksRes = await ipc.getTasks("active");
    if (tasksRes.ok && tasksRes.data.length > 0) {
      activeTasks = tasksRes.data;
      if (!isPomodoroRunning) {
        renderTaskSelectList();
      }
    } else {
      activeTasks = [];
      if (!isPomodoroRunning) {
        taskSelectArea.style.display = 'none';
        selectedTaskBadge.style.display = 'none';
        selectedTaskId = null;
        setModeLabel('rest');
      }
    }
  }

  // Re-load tasks whenever wallpaper mode is activated (user switches back)
  ipc.onModeActivated((data) => {
    if (data.mode === MODE.WALLPAPER) {
      initWallpaper();
    }
  });

  initWallpaper();
```

> 这段代码放在 `document.addEventListener("keydown", ...)` 之后，`})();` 之前。

## 数据流

```
用户选择任务 (taskId)
  → renderer: ipc.getTaskMode(taskId)
  → preload: ipcRenderer.invoke(IPC.TASK_GET_MODE, { taskId })
  → main: taskService.classifier.getMode(taskId)
  → 读取 data/task-mode-mapping.json
  → 返回 "computer" | "reading" | "writing" | null
  → renderer: setModeLabel(mode) 更新标签文字和样式
```

## 模式标签映射

| 分类值 | 显示文字 | CSS 类 | 颜色 |
|--------|----------|--------|------|
| `rest` | 休息模式 | `mode--rest` | 灰蓝 |
| `computer` | 电脑模式 | `mode--computer` | 蓝 |
| `reading` | 看书模式 | `mode--reading` | 绿 |
| `writing` | 写字模式 | `mode--writing` | 橙 |

## 壁纸文件夹预留

```
assets/wallpapers/
├── rest/.gitkeep       ← 休息模式视频壁纸（暂停时、选择任务时）
├── computer/.gitkeep   ← 电脑模式视频壁纸
├── reading/.gitkeep    ← 看书模式视频壁纸
└── writing/.gitkeep    ← 写字模式视频壁纸
```

> `.gitkeep` 为空文件，仅用于让 Git 追踪空目录。将来替换为循环视频文件后，在 `setModeLabel()` 函数中根据 mode 切换视频播放即可。

---

# Bug 修复：选择任务并开始专注后，任务选择框依然显示

> **注意**：此 bug 的修复已并入后续的"壁纸模式子任务粒度选择 + 退出面板简化"重构。新版 `renderTaskSelectList()` 通过 `if (isPomodoroRunning || selectedTaskId)` 双重条件确保覆盖此场景。本节保留以记录根因分析。

## 问题描述

进入壁纸模式 → 选择任务 → 任务选择区域消失（`display: none`）→ 但随即又被 `renderTaskSelectList()` 内部的无条件 `taskSelectArea.style.display = ''` 强制显示回来。表现是：用户已选任务并开始专注，任务选择框依然可见且可点击选择其他任务。

## 根因

`selectTask()` 函数流程：

```js
async function selectTask(task) {
    selectedTaskId = task.id;
    // ...
    taskSelectArea.style.display = 'none';   // ← 第 1 步：隐藏
    // ...
    renderTaskSelectList();                  // ← 第 2 步：刷新列表
}
```

而 `renderTaskSelectList()` 内部：

```js
function renderTaskSelectList() {
    taskSelectList.innerHTML = '';
    if (activeTasks.length === 0) {   // ← 有任务时不走这个分支
        taskSelectArea.style.display = 'none';
        return;
    }
    taskSelectArea.style.display = '';   // ← 无条件重新显示！
    // ...
}
```

当 `activeTasks.length > 0` 时，跳过 `display: none` 分支，直接走到 `display: ''`，把第一步的隐藏操作覆盖了。

## 修复

### `src/renderer/wallpaper/index.html` — `renderTaskSelectList()` 函数

找到（约第 461 行）：

```js
    if (activeTasks.length === 0) {
```

替换为：

```js
    if (activeTasks.length === 0 || selectedTaskId) {
```

完整修复后的函数：

```js
function renderTaskSelectList() {
    taskSelectList.innerHTML = '';
    if (activeTasks.length === 0 || selectedTaskId) {
        taskSelectArea.style.display = 'none';
        return;
    }
    taskSelectArea.style.display = '';
    for (const task of activeTasks) {
        const item = document.createElement('div');
        item.className = 'wallpaper-task-select-item';
        if (task.id === selectedTaskId) item.classList.add('selected');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = task.rpgTitle || task.realTitle;
        const metaSpan = document.createElement('span');
        metaSpan.className = 'wallpaper-task-select-item-meta';
        metaSpan.textContent = (task.estimatedPomodoros || 1) + '🍅 ' + (task.estimatedMinutes || 25) + 'min';
        item.appendChild(titleSpan);
        item.appendChild(metaSpan);
        item.addEventListener('click', () => selectTask(task));
        taskSelectList.appendChild(item);
    }
}
```

## 说明

- 新增 `|| selectedTaskId` 条件：当已选中任务时，同样隐藏选择区域
- 不影响"更换"按钮：点"更换"时先将 `selectedTaskId = null`，再调用 `renderTaskSelectList()`，条件不满足，正常显示列表
- 不影响无任务场景：`activeTasks.length === 0` 依然隐藏选择区域

---

# 退出面板 — 记录进度时增加完成百分比输入（已重构）

> **注意**：本节描述的退出面板 HTML（4 状态）和所有 JS 按钮回调已被"壁纸模式子任务粒度选择 + 退出面板简化"重构**完整替换**。保留以下内容供参考：
> - 修改 1（CSS `.wallpaper-exit-progress-row` 等）仍然有效
> - 百分比输入框的 `min` 动态设置逻辑已移入新版 `exitNotYetBtn` 回调
> - 备注文本框（`.wallpaper-exit-textarea`）已在新版中移除

## 目标

在壁纸模式的退出面板中，当用户选择"还没完成 → 否，记录进度"后，原有的"记录进度"界面只有一个备注文本框。现在增加一个**完成百分比**输入（数字输入框，0-100，步进为 5%），用户可以同时记录量化进度百分比和文字备注，最终消息格式为 `[进度 XX%] 备注内容`。

## 修改文件

### `src/renderer/wallpaper/index.html` — 共三处修改

---

#### 修改 1：CSS — 新增进度百分比输入行样式

在 `.wallpaper-exit-textarea` 样式块之后、`</style>` 之前，新增以下 CSS：

```css
  .wallpaper-exit-progress-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    margin: var(--space-sm) 0;
  }
  .wallpaper-exit-progress-label {
    font-size: var(--font-sm);
    color: var(--color-text-secondary);
    white-space: nowrap;
  }
  .wallpaper-exit-progress-input {
    width: 64px;
    background: var(--color-bg-medium);
    border: 1px solid var(--color-bg-light);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-sm);
    text-align: center;
    box-sizing: border-box;
  }
  .wallpaper-exit-progress-input::-webkit-inner-spin-button,
  .wallpaper-exit-progress-input::-webkit-outer-spin-button {
    opacity: 1;
  }
  .wallpaper-exit-progress-unit {
    font-size: var(--font-sm);
    color: var(--color-text-secondary);
  }
```

**精确位置**：找到 `.wallpaper-exit-textarea { ... }` 闭合的 `}`，在其后、`</style>` 之前插入。

---

#### 修改 2：HTML — 在 exitStateNote 中增加百分比输入行

找到：

```html
  <!-- State 4: progress note -->
  <div id="exitStateNote" style="display:none">
    <p>记录一下进度吧~</p>
    <textarea class="wallpaper-exit-textarea" id="exitProgressInput" placeholder="输入你的进度..."></textarea>
    <button class="wallpaper-exit-btn-primary" id="exitProgressSaveBtn">保存并返回</button>
  </div>
```

替换为：

```html
  <!-- State 4: progress note -->
  <div id="exitStateNote" style="display:none">
    <p>记录一下进度吧~</p>
    <div class="wallpaper-exit-progress-row">
      <label class="wallpaper-exit-progress-label">完成进度</label>
      <input type="number" class="wallpaper-exit-progress-input" id="exitProgressPercentInput" min="0" max="100" step="5" value="0" placeholder="0">
      <span class="wallpaper-exit-progress-unit">%</span>
    </div>
    <textarea class="wallpaper-exit-textarea" id="exitProgressInput" placeholder="备注完成了什么..."></textarea>
    <button class="wallpaper-exit-btn-primary" id="exitProgressSaveBtn">保存并返回</button>
  </div>
```

> 注意：`min` 和 `value` 会在 JS 中动态设置为上次的累积进度，HTML 中的 `min="0" value="0"` 仅为初始默认值。

---

#### 修改 3：JavaScript — 变量声明和保存逻辑

**3a. 新增变量声明**

找到：

```js
  const exitProgressInput = document.getElementById("exitProgressInput");
```

在其后新增一行：

```js
  const exitProgressPercentInput = document.getElementById("exitProgressPercentInput");
```

**3b. 修改"否，记录进度"按钮回调 — 设置百分比输入框的 min 和默认值**

找到：

```js
  document.getElementById("exitExtendNoBtn").addEventListener("click", () => {
    showState("note");
  });
```

替换为：

```js
  document.getElementById("exitExtendNoBtn").addEventListener("click", async () => {
    const taskId = window._exitTaskId;
    if (taskId) {
      const res = await ipc.getTaskById(taskId);
      if (res.ok && res.data) {
        const prev = res.data.cumulativeProgress || 0;
        exitProgressPercentInput.min = prev;
        exitProgressPercentInput.value = prev;
      }
    }
    showState("note");
  });
```

> 关键：每次进入"记录进度"界面时，从数据库读取该任务的 `cumulativeProgress`，设为输入框的 `min`（最低值）和 `value`（默认值），确保用户只能输入 ≥ 上次进度的值。

**3c. 修改保存按钮回调**

找到：

```js
  document.getElementById("exitProgressSaveBtn").addEventListener("click", async () => {
    const note = exitProgressInput.value.trim();
    exitProgressInput.value = "";
    hideExitPanel();
    if (note) {
      convPanel.addMessage("user", note);
      await ipc.sendMessage(note);
    }
    await ipc.switchMode(MODE.PET);
  });
```

替换为：

```js
  document.getElementById("exitProgressSaveBtn").addEventListener("click", async () => {
    const percent = parseInt(exitProgressPercentInput.value, 10) || 0;
    const clampedPercent = Math.min(100, Math.max(0, percent));
    const note = exitProgressInput.value.trim();
    const parts = [`[进度 ${clampedPercent}%]`];
    if (note) parts.push(note);
    const message = parts.join(" ");
    exitProgressPercentInput.value = exitProgressPercentInput.min;
    exitProgressInput.value = "";
    hideExitPanel();
    // Persist cumulative progress and recalculate estimated time
    const taskId = window._exitTaskId;
    if (taskId) {
      await ipc.updateTaskProgress(taskId, clampedPercent, note);
    }
    convPanel.addMessage("user", message);
    await ipc.sendMessage(message);
    await ipc.switchMode(MODE.PET);
  });
```

## 说明

- 百分比输入框 `step="5"`：点击上下箭头时以 5% 为步进单元，同时支持键盘直接输入任意数值
- **最低值限制**：每次进入"记录进度"界面时，`min` 和默认 `value` 设为该任务上次的 `cumulativeProgress`（首次为 0），用户只能输入 ≥ 该值的百分比
- **0-100 范围**：输入 <0 会被 clamp 到 0，输入 >100 会被 clamp 到 100（HTML `min`/`max` 属性 + JS `clampedPercent` 双重保障）
- 百分比输入框 `step="5"`：点击上下箭头时以 5% 为步进单元，同时支持键盘直接输入任意数值
- 消息始终发送（即使备注为空，百分比部分也会发送），格式为 `[进度 60%] 完成了前端页面`
- 保存后两个输入框均重置（百分比归到 min 值，备注清空）

---

# 任务累积进度追踪 — 进度只增不减，自动调整预计时间

## 目标

用户记录进度后，将累积进度持久化到数据库，并根据进度自动调整该任务的预计时间。核心规则：

1. **进度只增不减**：新输入的百分比若低于已存储的 `cumulativeProgress`，自动 clamp 到旧值
2. **自动调整预计时间**：`estimatedMinutes = originalEstimatedMinutes × (100% - 累积进度%)`
3. **保留原始预估**：首次记录进度时，将当前的 `estimatedMinutes` 另存为 `originalEstimatedMinutes`（避免每次覆盖后丢失原始值）

## 修改文件

共修改 6 个文件。

---

### 1. `src/shared/constants.js` — 新增 IPC 通道

在 `TASK_COMPLETE` 之后新增：

```js
TASK_UPDATE_PROGRESS: "task:update-progress",
```

**精确位置**：找到 `TASK_COMPLETE: "task:complete",` 一行，在其后、`TASK_DELETE` 之前插入。

修改后的 Tasks 区域：

```js
	// Tasks
	TASK_GET_ALL: "task:get-all",
	TASK_GET_BY_ID: "task:get-by-id",
	TASK_GET_MODE: "task:get-mode",
	TASK_CREATE: "task:create",
	TASK_UPDATE: "task:update",
	TASK_TOGGLE_SUBTASK: "task:toggle-subtask",
	TASK_COMPLETE: "task:complete",
	TASK_UPDATE_PROGRESS: "task:update-progress",
	TASK_DELETE: "task:delete",
```

---

### 2. `src/preload.js` — 新增预加载 API

在 `task` 对象中，`complete` 方法之后、`delete` 方法之前，新增：

```js
		updateProgress(taskId, percent, note) {
			return ipcRenderer.invoke(IPC.TASK_UPDATE_PROGRESS, { taskId, percent, note });
		},
```

**精确位置**：在 `complete(taskId) { ... },` 之后、`delete(taskId) { ... },` 之前。

---

### 3. `src/renderer/shared/ipc-client.js` — 新增客户端方法

在 `completeTask` 方法之后、`deleteTask` 方法之前，新增：

```js
	async updateTaskProgress(taskId, percent, note) {
		return this._call("task.updateProgress", taskId, percent, note);
	},
```

**精确位置**：在 `completeTask(taskId) { ... }` 方法结束的 `}` 之后、`deleteTask(taskId) { ... }` 之前。

---

### 4. `src/main/task-service.js` — 核心逻辑

在 `completeTask()` 方法之后、`deleteTask()` 方法之前，新增以下完整方法：

```js
	/**
	 * Update cumulative progress after an incomplete session.
	 * Progress only increases; new percent < old percent is clamped.
	 * estimatedMinutes is recalculated from the original estimate.
	 * @returns {{ task: Task, progressClamped: boolean }}
	 */
	updateProgress(taskId, percent, note) {
		const task = this.db.getTaskById(taskId);
		if (!task) throw new Error(`Task not found: ${taskId}`);

		// Preserve the original AI-estimated duration
		if (task.originalEstimatedMinutes == null) {
			task.originalEstimatedMinutes = task.estimatedMinutes;
		}

		const oldProgress = task.cumulativeProgress || 0;
		const clamped = Math.min(100, Math.max(oldProgress, percent));
		const progressClamped = clamped !== percent;

		const remainingRatio = (100 - clamped) / 100;
		const newEstimate = Math.max(1, Math.round(task.originalEstimatedMinutes * remainingRatio));

		this.db.updateTask(taskId, {
			cumulativeProgress: clamped,
			estimatedMinutes: newEstimate,
			progressNote: note || null,
		});

		return { task: this.db.getTaskById(taskId), progressClamped };
	}
```

---

### 5. `src/main/ipc-handlers.js` — 新增 IPC handler

在 `TASK_DELETE` handler 之前新增：

```js
	ipcMain.handle(IPC.TASK_UPDATE_PROGRESS, (_event, { taskId, percent, note }) => runTask(() => {
		return taskService.updateProgress(taskId, percent, note);
	}));
```

**精确位置**：在 `ipcMain.handle(IPC.TASK_COMPLETE, ...);` 之后、`ipcMain.handle(IPC.TASK_DELETE, ...);` 之前。

---

### 6. `src/renderer/wallpaper/index.html` — 两处 JS 修改（已在新重构中移除）

> **注意**：本节描述的 `exitExtendNoBtn` 和 `exitProgressSaveBtn` 按钮在新重构中已被移除或重写：
> - `exitExtendNoBtn` 不再存在，百分比 `min` 设置逻辑已移入新版 `exitNotYetBtn` 回调
> - `exitProgressSaveBtn` 保留但逻辑简化（仅记录百分比，不发送消息、不切换模式）
> - `ipc.updateTaskProgress()` 调用保留，功能不变

**6a. 修改"否，记录进度"按钮 — 动态设 min/default value**

找到：

```js
  document.getElementById("exitExtendNoBtn").addEventListener("click", () => {
    showState("note");
  });
```

替换为：

```js
  document.getElementById("exitExtendNoBtn").addEventListener("click", async () => {
    const taskId = window._exitTaskId;
    if (taskId) {
      const res = await ipc.getTaskById(taskId);
      if (res.ok && res.data) {
        const prev = res.data.cumulativeProgress || 0;
        exitProgressPercentInput.min = prev;
        exitProgressPercentInput.value = prev;
      }
    }
    showState("note");
  });
```

> 关键：进入记录界面时，从数据库读取 `cumulativeProgress`，动态设置输入框的 `min` 和 `value`。

**6b. 修改保存按钮 — 调用 API 持久化进度**

将 `exitProgressSaveBtn` 的点击回调更新为：

```js
  document.getElementById("exitProgressSaveBtn").addEventListener("click", async () => {
    const percent = parseInt(exitProgressPercentInput.value, 10) || 0;
    const clampedPercent = Math.min(100, Math.max(0, percent));
    const note = exitProgressInput.value.trim();
    const parts = [`[进度 ${clampedPercent}%]`];
    if (note) parts.push(note);
    const message = parts.join(" ");
    exitProgressPercentInput.value = exitProgressPercentInput.min;
    exitProgressInput.value = "";
    hideExitPanel();
    // Persist cumulative progress and recalculate estimated time
    const taskId = window._exitTaskId;
    if (taskId) {
      await ipc.updateTaskProgress(taskId, clampedPercent, note);
    }
    convPanel.addMessage("user", message);
    await ipc.sendMessage(message);
    await ipc.switchMode(MODE.PET);
  });
```

> 差异点：`clampedPercent` 局部变量 + `ipc.updateTaskProgress()` 调用 + 消息始终发送 + 重置时用 `min` 而非硬编码 `"0"`。

## 数据流

```
用户记录进度 (60%, "完成了前端页面")
  → renderer: ipc.updateTaskProgress(taskId, 60, "完成了前端页面")
  → preload: ipcRenderer.invoke(IPC.TASK_UPDATE_PROGRESS, ...)
  → main: taskService.updateProgress(taskId, 60, note)
  → db: {
        cumulativeProgress: 60,
        originalEstimatedMinutes: 50 (首次时保存),
        estimatedMinutes: 20 (50 × 40%),
        progressNote: "完成了前端页面"
    }
  → 下次启动番茄钟: 默认显示 20 分钟
```

## 边界情况

| 场景 | 行为 |
|------|------|
| 首次记录进度 | `originalEstimatedMinutes` 设为当前 `estimatedMinutes` |
| 第二次输入更低百分比 | 自动 clamp 到上次的累积进度 |
| 进度达到 100% | `estimatedMinutes` 变为 1（保底） |
| 进度 = 100% 时 | 用户应在退出面板选"完成了"而非"记录进度" |
| 任务完成后 | `completeTask()` 将 status 改为 `completed`，不影响 `cumulativeProgress` |

---

# 壁纸模式子任务粒度选择 + 退出面板简化

## 目标

之前的壁纸模式任务选择只能选父任务（如"背诵单词"），无法选择具体子任务。用户想做的是"这 25 分钟只背前 50 个单词"（一个子任务），而非笼统地选择整个父任务。

本次重构实现四个目标：
1. **两级任务选择**：先选父任务 → 展开子任务列表 → 选择具体子任务
2. **时长均分**：番茄钟时长 = 父任务 `estimatedMinutes` / 未完成子任务数量
3. **退出面板简化**：3 个按钮（完成了 / 还没完成 / 再延 25 分钟），去掉中间确认和备注
4. **完成后停留在壁纸模式**：刷新任务列表，可选择下一个子任务继续

## 修改文件

仅修改 1 个文件：`src/renderer/wallpaper/index.html`。

---

### 修改 1：CSS — 新增子任务和展开指示器样式

找到 `.wallpaper-task-select-item-meta` 样式块，在其**后面**紧邻的 `}` 之后，插入以下 CSS：

```css
  .wallpaper-task-select-item.subtask {
    padding-left: var(--space-xl);
    font-size: var(--font-xs);
    color: var(--color-text-secondary);
  }
  .wallpaper-task-select-item.subtask:hover {
    background: rgba(107,92,231,0.25);
  }
  .wallpaper-task-select-expand {
    font-size: var(--font-xs);
    color: var(--color-text-muted);
    margin-left: auto;
    transition: transform 0.2s;
  }
  .wallpaper-task-select-expand.open {
    transform: rotate(90deg);
  }
```

**同时删除**以下 CSS 块（不再使用）：
- `.wallpaper-exit-subtask-list { ... }`
- `.wallpaper-exit-subtask-item { ... }`
- `.wallpaper-exit-textarea { ... }`

> 精确操作：找到 `.wallpaper-exit-subtask-list {` 到 `.wallpaper-exit-textarea` 样式块结束的 `}`，连同中间的 `.wallpaper-exit-progress-row` 保留（它仍在使用），只删除 subtask 和 textarea 相关样式。

---

### 修改 2：HTML — 退出面板简化为 2 状态

找到原来的 4 状态退出面板 HTML（包含 `exitStateInquiry`、`exitStateSubtasks`、`exitStateExtend`、`exitStateNote` 四个 div），**整体替换**为：

```html
<div class="wallpaper-exit-panel" id="exitPanel">
  <!-- State 1: inquiry -->
  <div id="exitStateInquiry">
    <p>专注时间结束了~</p>
    <button class="wallpaper-exit-btn-primary" id="exitCompletedBtn">完成了</button>
    <button class="wallpaper-exit-btn-secondary" id="exitNotYetBtn">还没完成</button>
    <button class="wallpaper-exit-btn-secondary" id="exitExtendBtn">再延 25 分钟</button>
  </div>
  <!-- State 2: progress note -->
  <div id="exitStateNote" style="display:none">
    <p>记录一下进度吧~</p>
    <div class="wallpaper-exit-progress-row">
      <label class="wallpaper-exit-progress-label">完成进度</label>
      <input type="number" class="wallpaper-exit-progress-input" id="exitProgressPercentInput" min="0" max="100" step="5" value="0">
      <span class="wallpaper-exit-progress-unit">%</span>
    </div>
    <button class="wallpaper-exit-btn-primary" id="exitProgressSaveBtn">保存并返回</button>
  </div>
</div>
```

> 关键变化：去掉了 `exitStateSubtasks`（子任务勾选清单）、`exitStateExtend`（延长确认），去掉了 `exitProgressInput`（备注文本框）。"再延 25 分钟"变成 inquiry 面板上的一个直接按钮。

---

### 修改 3：JavaScript — 状态变量

找到 JS 中状态变量声明区域：

```js
  // ── State ──
  let activeTasks = [];
  let selectedTaskId = null;
  let selectedTaskMode = 'rest';
  let currentPomodoroTaskId = null;
  let isExitingWithTask = false;
  let isPomodoroRunning = false;
```

替换为：

```js
  // ── State ──
  let activeTasks = [];
  let selectedTaskId = null;
  let selectedSubtaskId = null;  // null = parent task itself is the work unit
  let expandedTaskId = null;     // which parent's subtasks are expanded in the list
  let selectedTaskMode = 'rest'; // 'rest' | 'computer' | 'reading' | 'writing'
  let currentPomodoroTaskId = null;
  let isExitingWithTask = false;
  let isPomodoroRunning = false;
```

> 新增 `selectedSubtaskId` 和 `expandedTaskId`。

---

### 修改 4：JavaScript — 重写任务选择函数

将原来的 `renderTaskSelectList()`、`selectTask()`、`deselectTask()` 三个函数**完整替换**为：

```js
  function renderTaskSelectList() {
    taskSelectList.innerHTML = '';
    if (isPomodoroRunning || selectedTaskId) {
      taskSelectArea.style.display = 'none';
      return;
    }
    if (activeTasks.length === 0) {
      taskSelectArea.style.display = 'none';
      return;
    }
    taskSelectArea.style.display = '';
    for (const task of activeTasks) {
      const incompleteSubtasks = (task.subtasks || []).filter(s => !s.completed);
      const hasSubtasks = incompleteSubtasks.length > 0;
      const isExpanded = task.id === expandedTaskId;

      // Parent task row
      const parentItem = document.createElement('div');
      parentItem.className = 'wallpaper-task-select-item';
      const titleSpan = document.createElement('span');
      titleSpan.textContent = task.rpgTitle || task.realTitle;
      const metaSpan = document.createElement('span');
      metaSpan.className = 'wallpaper-task-select-item-meta';
      const subCount = incompleteSubtasks.length;
      const perSubMin = subCount > 0 ? Math.round((task.estimatedMinutes || 25) / subCount) : (task.estimatedMinutes || 25);
      metaSpan.textContent = (task.estimatedPomodoros || 1) + '🍅 ' + perSubMin + 'min';
      parentItem.appendChild(titleSpan);
      if (hasSubtasks) {
        const expandSpan = document.createElement('span');
        expandSpan.className = 'wallpaper-task-select-expand' + (isExpanded ? ' open' : '');
        expandSpan.textContent = '▶';
        parentItem.appendChild(expandSpan);
      }
      parentItem.appendChild(metaSpan);
      parentItem.addEventListener('click', () => {
        if (hasSubtasks) {
          expandedTaskId = isExpanded ? null : task.id;
          renderTaskSelectList();
        } else {
          selectTask(task, null);
        }
      });
      taskSelectList.appendChild(parentItem);

      // Subtask rows (if expanded)
      if (isExpanded && hasSubtasks) {
        for (const sub of incompleteSubtasks) {
          const subItem = document.createElement('div');
          subItem.className = 'wallpaper-task-select-item subtask';
          const subTitle = document.createElement('span');
          subTitle.textContent = '└ ' + (sub.rpgDesc || sub.realDesc);
          subItem.appendChild(subTitle);
          subItem.addEventListener('click', (e) => {
            e.stopPropagation();
            selectTask(task, sub);
          });
          taskSelectList.appendChild(subItem);
        }
      }
    }
  }

  async function selectTask(task, subtask) {
    selectedTaskId = task.id;
    selectedSubtaskId = subtask ? subtask.id : null;
    expandedTaskId = null;

    const displayName = subtask
      ? (task.rpgTitle || task.realTitle) + ' › ' + (subtask.rpgDesc || subtask.realDesc)
      : (task.rpgTitle || task.realTitle);
    selectedTaskName.textContent = displayName;
    selectedTaskBadge.style.display = '';
    taskSelectArea.style.display = 'none';

    const modeRes = await ipc.getTaskMode(task.id);
    const mode = (modeRes.ok && modeRes.data) ? modeRes.data : 'rest';
    setModeLabel(mode);

    renderTaskSelectList();
  }

  function deselectTask() {
    selectedTaskId = null;
    selectedSubtaskId = null;
    expandedTaskId = null;
    selectedTaskBadge.style.display = 'none';
    setModeLabel('rest');
    renderTaskSelectList();
  }
```

---

### 修改 5：JavaScript — 番茄钟启动使用子任务均分时长

找到 `PomodoroTimer` 的 `onStart` 回调，将原来的：

```js
    onStart: () => {
      const task = selectedTaskId ? activeTasks.find(t => t.id === selectedTaskId) : null;
      const durationMin = task?.estimatedMinutes || 25;
      startPomodoroFlow(durationMin * 60, selectedTaskId);
    },
```

替换为：

```js
    onStart: () => {
      const task = selectedTaskId ? activeTasks.find(t => t.id === selectedTaskId) : null;
      let durationMin = 25;
      if (task) {
        const incompleteCount = (task.subtasks || []).filter(s => !s.completed).length || 1;
        durationMin = Math.round((task.estimatedMinutes || 25) / incompleteCount);
      }
      startPomodoroFlow(durationMin * 60, selectedTaskId);
    },
```

---

### 修改 6：JavaScript — 更换任务按钮简化

找到 `changeTaskBtn` 的点击事件，替换为：

```js
  document.getElementById("changeTaskBtn").addEventListener("click", () => {
    if (!isPomodoroRunning) {
      deselectTask();
      currentPomodoroTaskId = null;
    }
  });
```

---

### 修改 7：JavaScript — 重写退出面板逻辑

将原来的退出面板逻辑整个区域（从 `const exitOverlay = ...` 到 `exitOverlay.addEventListener("click", () => hideExitPanel());`）**完整替换**为：

```js
  // ── Exit panel logic ──
  const exitOverlay = document.getElementById("exitOverlay");
  const exitPanel = document.getElementById("exitPanel");
  const exitStateInquiry = document.getElementById("exitStateInquiry");
  const exitStateNote = document.getElementById("exitStateNote");
  const exitProgressPercentInput = document.getElementById("exitProgressPercentInput");

  function showExitPanel(taskId, targetMode) {
    isExitingWithTask = true;
    showState("inquiry");
    exitOverlay.classList.add("open");
    exitPanel.classList.add("open");
    window._exitTaskId = taskId;
    window._exitTargetMode = targetMode || null;
  }

  async function hideExitPanelAndRefresh(toMode) {
    isExitingWithTask = false;
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    setModeLabel('rest');

    // Reload tasks to reflect completed subtasks / tasks
    const tasksRes = await ipc.getTasks("active");
    if (tasksRes.ok) {
      activeTasks = tasksRes.data;
    }

    // Clear selection so user can pick the next subtask
    selectedTaskId = null;
    selectedSubtaskId = null;
    currentPomodoroTaskId = null;
    selectedTaskBadge.style.display = 'none';
    const targetMode = toMode || window._exitTargetMode;
    window._exitTaskId = null;
    window._exitTargetMode = null;

    if (targetMode) {
      await ipc.switchMode(targetMode);
      return;
    }

    renderTaskSelectList();
  }

  function showState(name) {
    exitStateInquiry.style.display = name === "inquiry" ? "" : "none";
    exitStateNote.style.display = name === "note" ? "" : "none";
  }

  // "完成了" — toggle current subtask, check if parent is fully done
  document.getElementById("exitCompletedBtn").addEventListener("click", async () => {
    const taskId = window._exitTaskId;
    if (!taskId) { await hideExitPanelAndRefresh(); return; }

    // Toggle the current subtask (or the parent itself if no subtask selected)
    if (selectedSubtaskId) {
      await ipc.toggleSubtask(taskId, selectedSubtaskId);
    }

    // Reload task to check completion state
    const res = await ipc.getTaskById(taskId);
    if (res.ok && res.data) {
      const allDone = (res.data.subtasks || []).every(s => s.completed);
      if (allDone) await ipc.completeTask(taskId);
    }

    // Always back to pet mode after completing
    await hideExitPanelAndRefresh(MODE.PET);
  });

  // "还没完成" — record progress percentage
  document.getElementById("exitNotYetBtn").addEventListener("click", async () => {
    const taskId = window._exitTaskId;
    if (taskId) {
      const res = await ipc.getTaskById(taskId);
      if (res.ok && res.data) {
        const prev = res.data.cumulativeProgress || 0;
        exitProgressPercentInput.min = prev;
        exitProgressPercentInput.value = prev;
      }
    }
    showState("note");
  });

  // "再延 25 分钟" — extend pomodoro
  document.getElementById("exitExtendBtn").addEventListener("click", async () => {
    const taskId = window._exitTaskId;
    isExitingWithTask = false;
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    window._exitTaskId = null;
    await startPomodoroFlow(25 * 60, taskId);
  });

  // Progress save — clamped to never go below previous
  document.getElementById("exitProgressSaveBtn").addEventListener("click", async () => {
    const percent = parseInt(exitProgressPercentInput.value, 10) || 0;
    const clampedPercent = Math.min(100, Math.max(0, percent));
    const taskId = window._exitTaskId;
    if (taskId) {
      await ipc.updateTaskProgress(taskId, clampedPercent, null);
    }
    await hideExitPanelAndRefresh(MODE.PET);
  });

  exitOverlay.addEventListener("click", () => hideExitPanelAndRefresh());
```

> 关键变化：
> - `showState()` 只管理 2 个状态（inquiry / note），不再有 subtasks / extend 状态
> - `hideExitPanelAndRefresh(toMode)` 替代原来的 `hideExitPanel()`：退出后刷新任务列表 + 清空选择 + 重新渲染列表。`toMode` 参数优先于 `window._exitTargetMode`，显式指定目标模式
> - "完成了"直接 toggle 当前子任务并检查父任务是否完成，完成后留在壁纸继续选任务
> - "还没完成"直接跳转百分比输入，保存后切换到宠物模式（`hideExitPanelAndRefresh(MODE.PET)`）
> - "再延 25 分钟"直接延长，无需二次确认
> - 进度保存仅记录百分比，不再发送消息到对话面板

---

### 修改 8：JavaScript — ESC 键处理

找到 ESC 键处理中的：

```js
      if (isExitingWithTask) {
        hideExitPanel();
        return;
      }
```

替换为：

```js
      if (isExitingWithTask) {
        await hideExitPanelAndRefresh();
        return;
      }
```

---

### 修改 9：JavaScript — LLM SWITCH_MODE 意图处理

找到：

```js
        if (data.intent === INTENT.SWITCH_MODE && data.switchTarget) {
          sidebar.classList.remove("open");
          const statusRes = await ipc.getPomodoroStatus();
          if (statusRes.ok && statusRes.data.taskId) {
            showExitPanel(statusRes.data.taskId);
          } else {
```

替换为（`showExitPanel` 增加第二个参数）：

```js
        if (data.intent === INTENT.SWITCH_MODE && data.switchTarget) {
          sidebar.classList.remove("open");
          const statusRes = await ipc.getPomodoroStatus();
          if (statusRes.ok && statusRes.data.taskId) {
            showExitPanel(statusRes.data.taskId, data.switchTarget);
          } else {
```

---

## 设计要点

### 两级选择交互

```
选择任务开始专注
├─ 🗡️ 讨伐Bug巨龙          ← 点击展开/收起子任务
│   ├─ └ 修复登录页崩溃     ← 子任务（可点击选中）
│   └─ └ 编写单元测试       ← 子任务
├─ 📖 背诵古代咒语          ← 无子任务时点击直接选中
```

- 已完成的子任务通过 `.filter(s => !s.completed)` 过滤，不再显示
- 无子任务时，父任务自身作为选中项（`selectedSubtaskId = null`）
- 标签显示格式：`"父任务标题 › 子任务描述"`

### 时长均分公式

```
perSubMin = Math.round(estimatedMinutes / incompleteSubtaskCount)
```

例如：父任务 50 分钟，2 个未完成子任务 → 每个 25 分钟。

### 退出面板行为

| 按钮 | 行为 |
|------|------|
| 完成了 | toggle 当前子任务 → 全部完成则 complete 父任务 → 回到桌宠模式 |
| 还没完成 | 弹出百分比输入（min=上次进度，不降）→ 保存并切换到宠物模式 |
| 再延 25 分钟 | 直接延长番茄钟 25 分钟，保持当前子任务选择 |

### LLM 模式切换兼容

当 LLM 通过 INTENT.SWITCH_MODE 触发退出面板时，`showExitPanel` 接收 `targetMode` 参数。退出流程结束后，`hideExitPanelAndRefresh` 检查 `window._exitTargetMode`，如果存在则调用 `ipc.switchMode(targetMode)` 切换到目标模式；否则停留在壁纸模式刷新任务列表。

### 父任务无子任务时的"完成了"

`selectedSubtaskId` 为 `null` 时，"完成了"跳过 `toggleSubtask` 调用，直接检查 `subtasks.every()`。空数组 `[].every(...)` 返回 `true`，因此父任务被标记为完成并移除。

### 与本次重构无关的保留部分

以下部分未改动，保持原样：
- `pomodoro-timer.js` 的小时显示
- `task-classifier.js` 及其 IPC 管线（`constants.js` / `preload.js` / `ipc-client.js` / `ipc-handlers.js` / `task-service.js`）
- `startPomodoroFlow` 函数（仅被调用方式变化，函数体不变）
- 壁纸文件夹预留（`assets/wallpapers/`）
