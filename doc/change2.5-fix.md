# change2.5-fix — 文档修复记录

> 本轮修复解决了 5 个基础架构问题 + 17 个审查发现的问题。以下是按文件组织的修改清单，用于指导后续代码修改。

---

## 一、数据模型变更

### 1.1 Task 增加 `milestoneId` 字段

**涉及代码**：`src/main/database.js`（默认数据结构）、`src/main/task-service.js`（createTask/createFromAIResponse）

**变更**：

- `prompt.md` 3.2 — JSDoc Task typedef 增加 `milestoneId: string|null`
- `proposal.md` 3.1 — 示例 task 增加 `"milestoneId": "m1"`
- `detailed-design.md` 2.1 — Task interface 增加 `milestoneId: string | null`

```js
// 代码需同步：Task 数据模型增加字段
{
  // ...existing fields...
  milestoneId: null  // string | null，AI 创建任务时自动填充
}
```

### 1.2 relationship.stage 初始值 `"acquaintance"` → `"stranger"`

**涉及代码**：`src/main/database.js`（默认数据结构）、`data/db.json`

**变更**：

- `prompt.md` 3.1 — db.json 示例 `"stage": "stranger"`
- `proposal.md` 3.1 — db.json 示例 `"stage": "stranger"`

```js
// database.js 默认值需改为：
relationship: {
  stage: "stranger",  // 原为 "acquaintance"
  // ...
}
```

### 1.3 AppState 增加 `characterPosition` 字段

**变更**：

- `prompt.md` 3.1 — db.json 增加 `"characterPosition": { "x": 240, "y": 20, "width": 120, "height": 120 }`
- `detailed-design.md` 2.1 — AppState interface 增加 `characterPosition: { x: number; y: number; width: number; height: number }`

```js
// database.js 默认 appState 增加：
appState: {
  // ...
  characterPosition: { x: 240, y: 20, width: 120, height: 120 },
}
```

### 1.4 worldState 增加 `milestoneProgress` 字段

**涉及代码**：`src/main/database.js`（默认数据结构）、`data/db.json`

```json
"worldState": {
  "currentChapter": 1,
  "variables": { "crystalIntegrity": 75 },
  "milestoneProgress": {}   // 新增，存储 { "m1": 0, "m2": 1 }，由 completeTask 写入
}
```

> **为什么**：worldBook 是 `assets/worldbooks/default.json` 中的静态只读配置，`milestone.progress` 不会被写回文件。里程碑进度必须持久化到 lowdb 的 `worldState.milestoneProgress` 中，worldBook 仅作为 `required` 阈值的配置来源。

---

## 二、模块接口变更

### 2.1 TaskService 构造函数签名变更

**涉及代码**：`src/main/task-service.js`、`src/main/main.js`

**变更**：

- `prompt.md` 4.4 — `constructor({ db, worldBook })`
- `detailed-design.md` 2.4 — 同上
- `detailed-design.md` 2.11 — `new TaskService({ db, worldBook })`
- `tasks/main-entry.md` ent-01 — 初始化顺序更新

```js
// task-service.js — 构造函数改为接收对象
class TaskService {
  constructor({ db, worldBook }) {  // 原为 constructor(db)
    this.db = db;
    this.worldBook = worldBook;
  }
}

// main.js — 调用方式改为：
const taskService = new TaskService({ db, worldBook });
// 原为：const taskService = new TaskService(db);
```

### 2.2 `createFromAIResponse` 自动填充 `milestoneId`

**涉及代码**：`src/main/task-service.js`

**变更**：`tasks/task-service.md` tsk-04

```js
// task-service.js createFromAIResponse 增加逻辑：
createFromAIResponse(payload) {
  // ...校验必填字段...

  // 自动填充 milestoneId（基于 lowdb 持久化的进度，非 worldBook 静态配置）
  let milestoneId = null;
  const currentChapter = this.db.getWorldState().currentChapter;
  const chapter = this.worldBook.storyChapters.find(c => c.chapterId === currentChapter);
  if (chapter && chapter.milestones) {
    const mp = this.db.getWorldState().milestoneProgress || {};
    // 取第一个 progress < required 的 milestone（required 从 worldBook 读，progress 从 lowdb 读）
    const nextMilestone = chapter.milestones.find(m => (mp[m.id] || 0) < m.required);
    if (nextMilestone) milestoneId = nextMilestone.id;
  }

  return this.createTask({ ...payload, milestoneId, subtasks: payload.subtasks || [] });
}
```

### 2.3 `completeTask` 增加里程碑推进逻辑

**涉及代码**：`src/main/task-service.js`

**变更**：`prompt.md` 4.4、`tasks/task-service.md` tsk-10

```js
// task-service.js completeTask 增加（关键：进度存 lowdb，不修改 worldBook 静态对象）：
completeTask(taskId) {
  const task = this.db.getTaskById(taskId);
  const allDone = task.subtasks.every(s => s.completed);
  if (!allDone) return { task, isFullyCompleted: false };

  this.db.completeTask(taskId);

  let milestoneProgress = null;
  if (task.milestoneId) {
    const worldState = this.db.getWorldState();
    const chapter = this.worldBook.storyChapters.find(
      c => c.chapterId === worldState.currentChapter
    );
    const milestone = chapter?.milestones?.find(m => m.id === task.milestoneId);

    if (milestone) {
      // 从 lowdb 读取/写入进度（worldBook 是只读配置，不能修改）
      const prev = worldState.milestoneProgress?.[task.milestoneId] || 0;
      const next = prev + 1;
      this.db.updateWorldState({
        milestoneProgress: { ...worldState.milestoneProgress, [task.milestoneId]: next }
      });
      milestoneProgress = { milestoneId: milestone.id, progress: next, required: milestone.required };

      // 章节推进检查（基于 lowdb 持久化数据）
      const mp = { ...worldState.milestoneProgress, [task.milestoneId]: next };
      const allMilestonesDone = chapter.milestones.every(m => (mp[m.id] || 0) >= m.required);
      if (allMilestonesDone && chapter.milestones.length > 0) {
        this.db.updateWorldState({ currentChapter: worldState.currentChapter + 1 });
      }
    }
  }

  // 更新世界变量
  const vars = this.db.getWorldState().variables;
  this.db.updateWorldState({
    variables: { ...vars, crystalIntegrity: (vars.crystalIntegrity || 0) + 2 }
  });

  return { task: this.db.getTaskById(taskId), isFullyCompleted: true, milestoneProgress };
}
```

### 2.4 `createTask` 增加最小校验

**涉及代码**：`src/main/task-service.js`

**变更**：`tasks/task-service.md` tsk-03

```js
// task-service.js createTask 增加校验：
createTask(data) {
  if (!data.realTitle || !data.realTitle.trim()) {
    throw new Error('TASK_CREATE_INVALID: realTitle is required');
  }
  // ...原有逻辑...
}
```

---

## 三、鼠标穿透方案重建（IPC → 纯 CSS）

### 3.1 删除 `window:set-passthrough` IPC 通道

**涉及代码**：`src/main/ipc-handlers.js`、`src/preload.js`、`src/shared/constants.js`

**变更**：

- `prompt.md` 5.1 — preload API 移除 `setPassthrough(enabled)`
- `prompt.md` 5.4 — IPC 通道清单移除 `window:set-passthrough`
- `proposal.md` 2.5 — 同上
- `detailed-design.md` 2.10 — IPC 通道表移除该行
- `detailed-design.md` 3 — Preload API 移除 `setPassthrough`
- `HLD` 5.9 — 整节改为 CSS 方案描述（不再是 IPC 通道）
- `tasks/window-manager.md` wm-11b — 删除
- `tasks/ipc-handlers.md` ipc-27b — 删除
- `tasks/preload.md` pre-08 — 移除 setPassthrough

```js
// ipc-handlers.js — 删除此 handler：
// ipcMain.handle('window:set-passthrough', ...)  ← 删除

// preload.js — 删除此方法：
// setPassthrough: (enabled) => ipcRenderer.invoke('window:set-passthrough', { enabled }),  ← 删除

// constants.js — 删除此常量：
// WINDOW_SET_PASSTHROUGH: 'window:set-passthrough',  ← 删除
```

### 3.2 窗口管理器不再调用 `setIgnoreMouseEvents`

**涉及代码**：`src/main/window-manager.js`

**变更**：`tasks/window-manager.md` wm-10/wm-11

```js
// window-manager.js — pet 窗口创建时删除 setIgnoreMouseEvents 调用：
// 原代码：
// petWindow.setIgnoreMouseEvents(true, { forward: true });
// 改为：不调用 setIgnoreMouseEvents，通过 CSS 控制
```

### 3.3 渲染进程改为 CSS class 切换

**涉及代码**：`src/renderer/pet/index.html`（内嵌 CSS + JS）

**变更**：`prompt.md` 6.4、`detailed-design.md` 4.3、`tasks/pet-mode.md` pet-19~pet-22

```css
/* pet/index.html <style> 增加： */
body {
  pointer-events: none;  /* 透明区域不接收鼠标事件 */
}
body.interactive {
  pointer-events: auto;  /* 浮层打开时全窗口可交互 */
}
.character-area {
  pointer-events: auto;           /* 角色区域始终可交互 */
  -webkit-app-region: drag;       /* 支持拖动 */
}
.character-area .clickable {
  -webkit-app-region: no-drag;    /* 内部可点击元素覆盖 */
}
```

```js
// pet/index.html <script> 修改：
// 原：通过 IPC window:set-passthrough 控制
// 改为：纯 DOM class 切换
function setInteractive(enabled) {
  if (enabled) {
    document.body.classList.add('interactive');
  } else {
    document.body.classList.remove('interactive');
  }
}
// 浮层打开时 → setInteractive(true)
// 所有浮层关闭时 → setInteractive(false)
```

---

## 四、IPC 通道名常量化约束

### 4.1 禁止裸写 channel 字符串

**涉及代码**：`src/main/ipc-handlers.js`、`src/preload.js`、`src/shared/constants.js`

**变更**：

- `tasks/ipc-handlers.md` — 增加 ipc-04b："所有 IPC 通道名从 `src/shared/constants.js` 导入"
- `tasks/preload.md` — 增加约束说明
- `tasks/integration.md` — 增加 int-21：扫描验证无裸写字符串

```js
// constants.js 需包含所有通道名常量（确保现存所有通道都在此文件中）：
module.exports = {
  // 对话
  CONVERSATION_SEND: 'conversation:send',
  CONVERSATION_CHUNK: 'conversation:chunk',
  CONVERSATION_DONE: 'conversation:done',
  CONVERSATION_ERROR: 'conversation:error',
  CONVERSATION_GET_HISTORY: 'conversation:get-history',
  CONVERSATION_ABORT: 'conversation:abort',
  // 任务
  TASK_GET_ALL: 'task:get-all',
  TASK_GET_BY_ID: 'task:get-by-id',
  TASK_CREATE: 'task:create',
  TASK_UPDATE: 'task:update',
  TASK_TOGGLE_SUBTASK: 'task:toggle-subtask',
  TASK_COMPLETE: 'task:complete',
  TASK_DELETE: 'task:delete',
  // 应用/模式
  APP_SWITCH_MODE: 'app:switch-mode',
  APP_GET_STATE: 'app:get-state',
  APP_GET_CHARACTER: 'app:get-character',
  APP_GET_RELATIONSHIP: 'app:get-relationship',
  MODE_ACTIVATED: 'mode:activated',
  // 番茄钟
  POMODORO_START: 'pomodoro:start',
  POMODORO_STOP: 'pomodoro:stop',
  POMODORO_GET_STATUS: 'pomodoro:get-status',
  POMODORO_TICK: 'pomodoro:tick',
  POMODORO_END: 'pomodoro:end',
  // 设置
  SETTINGS_GET_API_KEY: 'settings:get-api-key',
  SETTINGS_SET_API_KEY: 'settings:set-api-key',
  SETTINGS_GET_WALLPAPER: 'settings:get-wallpaper',
  SETTINGS_UPDATE_WALLPAPER: 'settings:update-wallpaper',
  // 窗口
  WINDOW_HIDE: 'window:hide',
  WINDOW_CLOSE_MODE: 'window:close-mode',
  // 错误码
  ERR_TASK_NOT_FOUND: 'TASK_NOT_FOUND',
  ERR_TASK_CREATE_INVALID: 'TASK_CREATE_INVALID',
  ERR_LLM_NETWORK: 'LLM_NETWORK',
  ERR_LLM_API: 'LLM_API',
  ERR_LLM_TIMEOUT: 'LLM_TIMEOUT',
  ERR_POMODORO_NOT_RUNNING: 'POMODORO_NOT_RUNNING',
  ERR_MODE_INVALID: 'MODE_INVALID',
  ERR_INTERNAL: 'INTERNAL',
};
```

```js
// ipc-handlers.js — 所有 ipcMain.handle 改用常量：
const C = require('../shared/constants');
// ipcMain.handle(C.CONVERSATION_SEND, ...)  而非 ipcMain.handle('conversation:send', ...)
```

```js
// preload.js — 所有 invoke/on 改用常量：
const C = require('../shared/constants');
// ipcRenderer.invoke(C.APP_SWITCH_MODE, ...)  而非 ipcRenderer.invoke('app:switch-mode', ...)
```

---

## 五、交互流程修正

### 5.1 托盘菜单统一经共享函数切换

**涉及代码**：`src/main/main.js`

**变更**：`tasks/main-entry.md` ent-05

```js
// main.js — 托盘菜单模式切换抽一个共享函数，避免绕过拦截逻辑：
function switchModeWithCleanup(mode) {
  llmService.abort();
  if (pomodoroService.isRunning()) {
    pomodoroService.stop();
  }
  windowManager.switchMode(mode);
  windowManager.getCurrentWindow()?.webContents.send(C.MODE_ACTIVATED, { mode });
}

// 托盘菜单点击 → 调用 switchModeWithCleanup(mode)
// ipc-handlers 的 app:switch-mode handler → 也调用 switchModeWithCleanup(mode)
// 两处共享同一函数，不重复实现
```

### 5.2 模式切换简化（退出询问由渲染进程负责）

**涉及代码**：`src/main/ipc-handlers.js`、`src/renderer/wallpaper/index.html`

**变更**：`tasks/ipc-handlers.md` ipc-15

> **设计决策**：壁纸模式的退出进度询问由壁纸渲染进程自己处理（ESC/退出按钮 → 弹出询问浮层 → 用户确认后才调用 `app:switch-mode`）。主进程 `app:switch-mode` 不拦截，只做简单清理。

```js
// ipc-handlers.js — app:switch-mode（简化版，不拦截）：
ipcMain.handle(C.APP_SWITCH_MODE, async (event, { mode }) => {
  llmService.abort();
  if (pomodoroService.isRunning()) {
    pomodoroService.stop(); // 此时渲染进程已确认过退出，直接停
  }
  windowManager.switchMode(mode);
  windowManager.getCurrentWindow()?.webContents.send(C.MODE_ACTIVATED, { mode });
});
```

```js
// wallpaper/index.html — 退出流程（渲染进程负责退出询问）：
async function handleExit() {
  if (hasActivePomodoro) {
    // 弹出进度询问浮层（wal-09/wal-10 四态）
    const result = await showExitConfirmDialog();
    // result: 'completed' | 'extend' | 'force-exit'
    if (result === 'extend') {
      pomodoro.start(25, taskId); // 延长番茄钟，不退出
      return;
    }
    // 用户确认退出或选择"完成"，执行切换
  }
  await ipc.app.switchMode('pet');
}
```

### 5.3 窗口关闭/切换时中止流式对话

**涉及代码**：`src/main/ipc-handlers.js`、`src/main/main.js`

**变更**：`tasks/ipc-handlers.md` ipc-27、`tasks/main-entry.md` ent-11

```js
// ipc-handlers.js — window:close-mode handler 复用共享函数：
ipcMain.handle(C.WINDOW_CLOSE_MODE, async () => {
  switchModeWithCleanup('pet');  // 复用 5.1 的共享函数
});

// main.js — 窗口关闭事件增加 abort：
// wallpaperWindow.on('close', () => { llmService.abort(); /* ... */ });
// softwareWindow.on('close', () => { llmService.abort(); /* ... */ });
```

### 5.4 软件模式关闭按钮 → switchMode('pet')

**涉及代码**：`src/main/main.js` 或 `src/renderer/software/index.html`

**变更**：`tasks/main-entry.md` ent-10

```js
// main.js — 软件窗口关闭事件：
// 旧：softwareWindow.hide();
// 新：windowManager.switchMode('pet');
// 原因：仅 hide() 会导致 appState.currentMode 停留在 'software'，托盘状态混乱
```

### 5.5 壁纸 ESC 必须先触发退出浮层

**涉及代码**：`src/renderer/wallpaper/index.html`

**变更**：`tasks/wallpaper-mode.md` wal-08

```js
// wallpaper/index.html — ESC 处理：
// ESC 事件必须先弹出进度询问浮层（wal-09/wal-10），不可直接调用 app:switch-mode
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (hasActivePomodoro) {
      showExitConfirmDialog();  // 先弹浮层
      // 浮层确认 → app:switch-mode('pet')
    } else {
      ipc.app.switchMode('pet');
    }
  }
});
```

---

## 六、AI 对话引擎修正

### 6.1 流完成时 JSON 清洗

**涉及代码**：`src/main/llm-service.js`

**变更**：`tasks/llm-service.md` llm-05、`prompt.md` 9.3

```js
// llm-service.js — onDone 回调前增加 JSON 清洗：
function extractIntentJSON(fullText) {
  // 1. 检测 {"intent": 结构
  const jsonMatch = fullText.match(/\{"intent"\s*:\s*"(create_task|switch_mode)"[\s\S]*?\}/);
  if (!jsonMatch) return { displayText: fullText, intentData: null };

  // 2. 分离：台词部分展示给用户，JSON 部分用于逻辑
  const jsonStr = jsonMatch[0];
  let displayText = fullText.replace(jsonStr, '').trim();
  // 如果去除 JSON 后无台词，说明 AI 只返回了 JSON
  if (!displayText) displayText = null;

  // 3. 解析 JSON
  try {
    const intentData = JSON.parse(jsonStr);
    return { displayText, intentData };
  } catch {
    return { displayText: fullText, intentData: null };  // 解析失败→纯文本
  }
}
```

### 6.2 LLMService 构造函数依赖注入

**未变更**，当前构造函数签名 `constructor(config)` 其中 `config: { apiKey, db, worldBook }` 已覆盖所需依赖。

---

## 七、关系服务修正

### 7.1 连续天数计算算法

**涉及代码**：`src/main/relationship-service.js`

**变更**：`tasks/relationship-service.md` rel-07

```js
// relationship-service.js — updateConsecutiveDays 实现：
updateConsecutiveDays() {
  const rel = this.db.getRelationship();
  const lastDate = rel.lastInteractionAt
    ? new Date(rel.lastInteractionAt).toDateString()
    : null;
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (!lastDate) {
    rel.consecutiveDays = 1;            // 首次
  } else if (lastDate === today) {
    // 不变（今天已互动过）
  } else if (lastDate === yesterday) {
    rel.consecutiveDays += 1;           // 昨天互动→连续
  } else {
    rel.consecutiveDays = 1;            // 断了→重置
  }

  this.db.updateRelationship({ consecutiveDays: rel.consecutiveDays });
  return rel.consecutiveDays;
}
```

---

## 八、壁纸模式修正

### 8.1 番茄钟启动默认关联最近任务

**涉及代码**：`src/renderer/wallpaper/index.html`

**变更**：`tasks/wallpaper-mode.md` wal-04

```js
// wallpaper/index.html — 番茄钟启动时 taskId 来源：
// 加载活跃任务列表 → 取第一个（最近创建的）→ 自动填充到 start() 的 taskId 参数
// 后续可扩展为下拉选择框
const tasks = await ipc.task.getAll('active');
const defaultTaskId = tasks.length > 0 ? tasks[0].id : null;
pomodoroService.start(25, { taskId: defaultTaskId, /* ... */ });
```

---

## 九、UI 文案修正

### 9.1 桌宠右键菜单 "退出" → "隐藏"

**涉及代码**：`src/renderer/pet/index.html` 右键菜单 DOM + 托盘菜单

**变更**：

- `prompt.md` 6.4 — 右键菜单 5 项文字
- `proposal.md` 4.1 — 功能表
- `HLD` 3.2.2 — 职责描述
- `detailed-design.md` 4.3 — 交互规格
- `tasks/pet-mode.md` pet-13

```html
<!-- pet/index.html 右键菜单 DOM：
  旧：<div class="menu-item">退出</div>
  新：<div class="menu-item">隐藏</div>
  action 改为 window.hide() 而非 window.close()
-->
```

---

## 十、进度追踪修正

### 10.1 progress.md 补充 shared-stores 模块

**变更**：`tasks/progress.md` — 增加 `[shared-stores](./shared-stores.md)` 条目，第一阶段 5→6 个模块。

### 10.2 progress.md 修正文件引用

**变更**：`tasks/progress.md` — `shared-js` → `shared-components`

---

## 十一、MVP 边界声明

### 11.1 各文档补充 MVP 明确不包含的内容

**变更**：

- `prompt.md` — 新增 6.5 节
- `proposal.md` — 4.4.9 扩充
- `HLD` — 8.1 设计约束扩充
- `detailed-design.md` — 1.2 增加 MVP 范围行

MVP 不包含：礼物/商店、CG/相册、显式好感度、多角色、语音、世界编辑器、在线同步、社交、引导剧情。

---

## 十二、WINDOW_CONFIG 和 IPC 通道清单补充

### 12.1 proposal 补充缺失章节

**变更**：

- `proposal.md` — 新增 2.4（WINDOW_CONFIG 常量）、2.5（IPC 通道清单）

### 12.2 HLD IPC 通道名对齐

**变更**：`high-level-design.md` 第 5 节全部通道名与 `prompt.md` 5.4 对齐，包括：
- `chat:*` → `conversation:*`
- `task:list` → `task:get-all`、`task:get` → `task:get-by-id`
- `window:switch-mode` → `app:switch-mode`、`window:mode-changed` → `mode:activated`
- `settings:get/update` → `settings:get-api-key` 等具体通道

### 12.3 HLD 窗口管理器接口对齐

**变更**：`high-level-design.md` 3.1.1 — WindowManager 对外接口改为与 `prompt.md` 4.2 一致

### 12.4 HLD worldbook.js 模块状态说明

**变更**：`high-level-design.md` 3.1.3 — 标注原型阶段由 main.js 内联加载 JSON，后续再抽取模块

---

## 改动的文件清单

| 文件 | 改动次数 |
|------|---------|
| `doc/prompt.md` | ~10 处 |
| `doc/proposal.md` | ~8 处 |
| `doc/high-level-design.md` | ~12 处 |
| `doc/detailed-design.md` | ~10 处 |
| `doc/tasks/window-manager.md` | 1 处（wm-10/11/11b 合并简化） |
| `doc/tasks/ipc-handlers.md` | 5 处 |
| `doc/tasks/preload.md` | 2 处 |
| `doc/tasks/pet-mode.md` | 5 处 |
| `doc/tasks/task-service.md` | 4 处 |
| `doc/tasks/relationship-service.md` | 1 处 |
| `doc/tasks/llm-service.md` | 1 处 |
| `doc/tasks/wallpaper-mode.md` | 2 处 |
| `doc/tasks/main-entry.md` | 4 处 |
| `doc/tasks/integration.md` | 1 处 |
| `doc/tasks/progress.md` | 3 处 |

**未改动**：`change1.md`、`change2.md`、所有 `.js`/`.html`/`.css` 代码文件。

---

## 十二、修复VibeCoding问题 — 代码审查与修复

> **修复日期**：2026-06-02
> **状态**：代码已修改，待运行验证
> **触发条件**：对全部代码进行完整审查后，发现 12 个问题（7 个 bug + 1 个安全隐患 + 4 处逻辑重复/偏离设计文档）

---

### 问题清单

| # | 严重级别 | 类别 | 问题描述 |
|---|:---:|------|------|
| 1 | P0 | Bug | `task-service.js` `completeTask()` 在检查子任务之前就标记任务为已完成 |
| 2 | P0 | 安全 | `software/index.html` 使用 `innerHTML` 拼接 AI 生成的动态内容（XSS 风险） |
| 3 | P0 | Bug | `ipc-handlers.js` `TASK_GET_ALL` 的 status 过滤逻辑颠倒，传 `completed` 返回的是 `active` |
| 4 | P0 | Bug | 托盘 `switchModeWithCleanup` 缺少 `mode:activated` 推送 + 窗口关闭时缺少清理逻辑 |
| 5 | P1 | Bug | `pomodoro-service.js` 自然结束时 `onEnd` 和 `onCancel` 双重触发 |
| 6 | P2 | 偏离 | `llm-service.js` 第 175 行缩进异常、上下文窗口用 10 条而非 20 条、5xx 错误被错误重试 |
| 7 | P2 | 残留 | `pet/index.html` 调试代码未移除 |
| 8 | P1 | 重复 | 模式切换逻辑在 3 处独立实现，行为不一致（见下表） |

**模式切换逻辑重复问题详表**：

| 位置 | abort LLM | stop Pomodoro | 更新 DB | 发 mode:activated |
|------|:---:|:---:|:---:|:---:|
| `main.js` `switchModeWithCleanup` | Y | Y | Y | **N** |
| `ipc-handlers.js` `APP_SWITCH_MODE` | Y | Y | Y | Y |
| `window-manager.js` close handler | **N** | **N** | **N** | N |

---

### 修改的文件

#### 1. `src/main/task-service.js` — completeTask 时序修复

**问题**：`db.completeTask(taskId)` 在第 98 行被无条件调用，将任务标记为已完成。然后才在第 99-104 行检查子任务。如果子任务未全部完成，任务已经是 `status: "completed"`。

**修复**：先通过 `db.getTaskById()` 获取任务 → 检查子任务 → 仅在全部完成时调用 `db.completeTask()`。

```diff
 completeTask(taskId) {
-    const task = this.db.completeTask(taskId);
+    const task = this.db.getTaskById(taskId);
+    if (!task) throw new Error(`Task not found: ${taskId}`);
+
     const allSubtasksDone = ...
     if (!allSubtasksDone) {
         return { task, isFullyCompleted: false };
     }

-    let milestoneProgress = null;
+    const completedTask = this.db.completeTask(taskId);
+    let milestoneProgress = null;

     if (task.milestoneId) {
```

---

#### 2. `src/renderer/software/index.html` — innerHTML XSS 修复

**问题**：`showTaskDetail()` 使用 `innerHTML` 直接插入 `task.rpgTitle`、`task.realTitle`、`task.rpgDescription` 等 AI 生成内容。违反 prompt.md 第 9 条安全约束。

**修复**：用 `document.createElement()` + `textContent` 重构整个任务详情渲染。新增 `detail.replaceChildren()` 在重建前清除旧内容。所有文本通过 `textContent` 设置，按钮通过 `createElement` 创建并绑定事件处理器。

```diff
-    detail.innerHTML = `
-      <h3>${task.rpgTitle}</h3>
-      <p>📝 ${task.realTitle}</p>
-      ...
-    `;
-    const btnComplete = document.getElementById("btnComplete");
-    if (btnComplete) {
-      btnComplete.addEventListener("click", async () => { ... });
-    }
+    detail.replaceChildren();
+    const h3 = document.createElement("h3");
+    h3.textContent = task.rpgTitle;
+    detail.appendChild(h3);
+    ...
+    if (task.status !== "completed") {
+      const btnComplete = document.createElement("button");
+      btnComplete.className = "btn btn-primary";
+      btnComplete.id = "btnComplete";
+      btnComplete.textContent = "✨ 完成任务";
+      btnComplete.addEventListener("click", async () => { ... });
+      btnRow.appendChild(btnComplete);
+    }
```

---

#### 3. `src/main/ipc-handlers.js` — TASK_GET_ALL 过滤修复 + 模式切换去重

**问题 A**（TASK_GET_ALL）：当 `status` 参数存在时始终调用 `taskService.getActiveTasks()`，忽略实际的 status 值。`status: "completed"` 会错误地返回 active 任务。

**修复 A**：改为 `db.getTasks({ status })`，正确传递过滤器。

```diff
-    const tasks = status
-        ? taskService.getActiveTasks()
-        : taskService.getAllTasks();
+    const tasks = status
+        ? db.getTasks({ status })
+        : taskService.getAllTasks();
```

**问题 B**（模式切换重复）：`APP_SWITCH_MODE` 和 `WINDOW_CLOSE_MODE` 各自内联实现了清理+切换逻辑，且 `WINDOW_CLOSE_MODE` 缺少 `db.updateAppState` 和 `mode:activated` 推送。

**修复 B**：两个处理器都委托给 `services.switchModeWithCleanup()`。

```diff
-    llmService.abort();
-    if (services.pomodoroService?.isRunning()) {
-        services.pomodoroService.cancel();
-    }
-    windowManager.switchMode(mode);
-    db.updateAppState({ currentMode: mode });
-    const win = windowManager.getCurrentWindow();
-    if (win && !win.isDestroyed()) {
-        win.webContents.send(IPC.MODE_ACTIVATED, { mode });
-    }
+    services.switchModeWithCleanup(mode);
```

`WINDOW_CLOSE_MODE` 同理，替换为 `services.switchModeWithCleanup("pet")`。

**POMODORO_STOP** 处理器同步更新：`stop()` → `cancel()`（因 `pomodoro-service.js` 的 API 变更，见修改 5）。

---

#### 4. `src/main/main.js` — switchModeWithCleanup 补全 + 依赖注入

**问题**：`switchModeWithCleanup` 缺少 `mode:activated` 推送，且未传递给需要它的模块。

**修复**：
- 补全 `mode:activated` 推送
- 将 `switchModeWithCleanup` 注入 `WindowManager` 构造函数和 `registerIpcHandlers`
- `_llmService` 和 `_pomodoroService` 的声明移到函数之前，供 `switchModeWithCleanup` 闭包使用
- `switchModeWithCleanup` 改用 `cancel()` 替代 `stop()`

```diff
 function switchModeWithCleanup(mode) {
     if (_llmService) _llmService.abort();
-    if (_pomodoroService?.isRunning()) _pomodoroService.stop();
+    if (_pomodoroService?.isRunning()) _pomodoroService.cancel();
     windowManager.switchMode(mode);
     db.updateAppState({ currentMode: mode });
+    const win = windowManager.getCurrentWindow();
+    if (win && !win.isDestroyed()) {
+        win.webContents.send(IPC.MODE_ACTIVATED, { mode });
+    }
 }

-    windowManager = new WindowManager(preloadPath);
+    windowManager = new WindowManager(preloadPath, switchModeWithCleanup);

     registerIpcHandlers({
         db, windowManager, llmService, taskService,
         relationshipService, pomodoroService, narrativeEngine,
+        switchModeWithCleanup,
     }, { ipcMain, BrowserWindow });
```

---

#### 5. `src/main/window-manager.js` — 构造函数扩展 + 关闭处理器修复

**问题**：非 pet 窗口的关闭处理器仅手动显示 pet 窗口，不清理 LLM/Pomodoro，不更新 appState，不发 mode:activated。

**修复**：
- 构造函数新增 `onSwitchToPet` 参数
- 非 pet 窗口关闭处理器改为调用 `this._onSwitchToPet("pet")`（即 `switchModeWithCleanup`）

```diff
-    constructor(preloadPath) {
+    constructor(preloadPath, onSwitchToPet) {
         this.preloadPath = preloadPath;
+        this._onSwitchToPet = onSwitchToPet || (() => {});
         ...

     // software / wallpaper close handler
-    this._switching = true;
-    const petWin = this.getOrCreateWindow("pet");
-    petWin.show();
-    this._currentMode = "pet";
-    this._switching = false;
+    this._switching = true;
+    this._onSwitchToPet("pet");
+    this._switching = false;
```

---

#### 6. `src/main/pomodoro-service.js` — stop/cancel 分离

**问题**：`stop()` 在自然结束（由 `onEnd` 触发）和手动停止时都触发 `onCancel`，导致 `onEnd` + `onCancel` 双重回调。

**修复**：`stop()` 仅清除 interval，不再触发 `onCancel`。新增 `cancel()` 方法，清除 interval 并触发 `onCancel`。所有手动停止调用点改用 `cancel()`。

```diff
     stop() {
         if (this._timerId) {
             clearInterval(this._timerId);
             this._timerId = null;
-            if (this._callbacks?.onCancel) this._callbacks.onCancel();
         }
         this._remaining = null;
         this._totalSeconds = null;
     }

+    cancel() {
+        if (this._timerId) {
+            clearInterval(this._timerId);
+            this._timerId = null;
+            if (this._callbacks?.onCancel) this._callbacks.onCancel();
+        }
+        this._remaining = null;
+        this._totalSeconds = null;
+    }
```

**所有 `cancel()` 调用点**（原为 `stop()`）：
- `ipc-handlers.js` — `POMODORO_STOP` 处理器
- `main.js` — `switchModeWithCleanup()`

---

#### 7. `src/main/llm-service.js` — 三处小修复

**问题 A**：第 175-176 行 `metadata.displayText` 和 `this.db.addMessage` 缩进多了一级（change2 插补丁遗留）。

**修复 A**：缩进恢复正常。

**问题 B**：`getRecentMessages(conv.id, 10)` — 上下文窗口仅取 10 条，设计文档（detailed-design 2.3）明确要求 20 条。

**修复 B**：改为 `getRecentMessages(conv.id, 20)`。

**问题 C**：5xx 响应被归类为 `"network"` 错误并重试一次，设计文档明确 "API 错误 (4xx/5xx) → 不重试"。

**修复 C**：移除 5xx 的特殊处理，所有非 ok 响应统一返回 `type: "api"`，不重试。

```diff
     if (!response.ok) {
-        const errType = response.status >= 500 ? "network" : "api";
-        if (errType === "network" && !this._retried) {
-            this._retried = true;
-            await this._sleep(1000);
-            await this._doChat(options, onChunk, onDone, onError);
-            return;
-        }
         onError({
-            type: "api",
+            type: "api",
             message: `API error: ${response.status}`,
-            retried: this._retried,
+            retried: false,
         });
         return;
     }
```

---

#### 8. `src/renderer/pet/index.html` — 移除调试代码

**问题**：第 189-198 行残留 change2 排查透明背景时的 `setTimeout` 调试扫描代码。

**修复**：删除整个调试代码块。

```diff
-  // Debug: scan for elements with solid background
-  setTimeout(() => {
-    const all = document.querySelectorAll("*");
-    for (const el of all) {
-      const bg = getComputedStyle(el).backgroundColor;
-      if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
-        console.log("实色背景:", el.tagName, el.id || el.className, "→", bg);
-      }
-    }
-  }, 1000);
-
   function syncInteractive() {
```

---

### 修改文件汇总

| # | 文件 | 改动行 | 改动类型 |
|---|------|--------|----------|
| 1 | `task-service.js` | L97-104 | completeTask 时序：先检查子任务，再标记完成 |
| 2 | `software/index.html` | L354-414 | innerHTML → createElement + textContent（XSS 修复） |
| 3 | `ipc-handlers.js` | L78-81, L181-196, L253, L330-337 | TASK_GET_ALL 过滤修复 + APP_SWITCH_MODE/WINDOW_CLOSE_MODE 去重 + POMODORO_STOP 改用 cancel() |
| 4 | `main.js` | L36-45, L141, L152, L159, L169 | switchModeWithCleanup 补全 mode:activated + 注入到依赖方 + cancel() 替代 stop() |
| 5 | `window-manager.js` | L39-46, L88-95 | 构造函数新增 onSwitchToPet 参数，关闭处理器调用回调 |
| 6 | `pomodoro-service.js` | L42-59 | stop()/cancel() 分离，自然结束不再触发 onCancel |
| 7 | `llm-service.js` | L102, L127-134, L175-176 | 上下文 10→20 条、5xx 不重试、缩进修复 |
| 8 | `pet/index.html` | L189-198 | 移除调试代码 |

**未改动**：`database.js`、`preload.js`、`ipc-client.js`、`character-renderer.js`、`conversation-panel.js`、`task-panel.js`、`pomodoro-timer.js`、`state-manager.js`、`dom-utils.js`、`constants.js`、`proactive-trigger.js`、`user-style-analyzer.js`、`narrative-engine.js`、`relationship-service.js`、`wallpaper/index.html`、所有 CSS 文件、所有 .md 文档文件。
