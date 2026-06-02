# 桌面 AI 陪伴应用 — Vibe Coding 启动 Prompt

> 本 Prompt 用于启动 Vibe Coding 流程，实现一个 Windows 桌面 AI 陪伴应用的可交互原型。
> 预计工期：1-2 周，覆盖桌宠模式、壁纸模式、软件模式三大场景。

---

## 0. Agent 协作规范

### 0.1 角色定义

本工程由两类 Agent 协作完成：

| 角色 | 职责 | 数量 |
|------|------|------|
| **主 Agent** | 跟踪整体进度、分配模块给子 Agent、审查子 Agent 交付、处理跨模块集成 | 1 个 |
| **子 Agent** | 实现单个模块（含代码 + vitest 单元测试），完成后回报主 Agent | 每个模块 1 个 |

### 0.2 协作流程

```
主 Agent 读取 doc/tasks/progress.md → 选取下一个待实现模块
    │
    ├── 主 Agent 为该模块生成子 Agent，传入：
    │   - 本 Prompt（全局约束 + 架构）
    │   - 对应模块的任务文件（doc/tasks/<module>.md）
    │   - 对应模块的详细设计章节（doc/detailed-design.md 对应章节）
    │   - 已完工模块的接口清单（供 import 参考）
    │
    ├── 子 Agent 实现模块代码 + 编写 vitest 单元测试
    │   - 输出到指定路径
    │   - 自测通过（npm test 相关用例全绿）
    │   - 回报主 Agent：完成了哪些子任务、文件清单、测试覆盖情况
    │
    └── 主 Agent 审查子 Agent 交付
        - 确认文件位置正确
        - 确认 npm test 通过
        - 勾选 progress.md 对应子任务
        - 选取下一个模块
```

### 0.3 主 Agent 不得委派的工作

- **不得委派跨模块集成**（如各模式入口文件集成 IPC handler、各 HTML 引入共享 JS）
- **不得委派 progress.md 勾选和维护**
- **不得委派最终代码质量检查**（biome + tsc）

### 0.4 子 Agent 必须交付

- 源代码文件（放在正确路径）
- 单元测试文件（`tests/<module>.test.js`）
- 一段简短回报（做了什么、文件清单、测试数量）

---

## 1. 项目概述

### 1.1 目标

开发一个 Windows 桌面 AI 陪伴应用，覆盖三大场景：

- **桌宠模式**：常驻桌面的透明无边框宠物窗口，支持自然语言对话和任务发布
- **壁纸模式**：全屏覆盖的专注陪伴层，含番茄钟和白噪音
- **软件模式**：RPG 风格的游戏化主界面，任务结算与剧情推进

三种模式共享同一角色、数据和对话引擎。

### 1.2 核心体验闭环

```
用户在桌宠模式发布任务 → 在壁纸模式专注执行 → 在软件模式结算推进剧情
```

### 1.3 技术栈

| 项目 | 选型 | 说明 |
|------|------|------|
| 桌面框架 | Electron 42 | 主进程 CommonJS，渲染进程纯 HTML/CSS/JS |
| 渲染进程 | **纯原生 HTML/CSS/JS** | 不引入 Vue/Vite/Pinia 或任何前端框架 |
| AI 服务 | DeepSeek API | 兼容 OpenAI 格式，流式 SSE |
| 数据存储 | lowdb 7 | 同步 JSON 文件读写 |
| 测试 | vitest | 纯函数单元测试，mock 外部依赖 |
| 代码规范 | biome + tsc --noEmit | 已配置 |

### 1.4 关键架构决策

| 决策项 | 结论 |
|--------|------|
| API Key 存储 | 原型阶段手动编辑 `data/db.json` 中的 `appState.apiKey` 字段；IPC 通道 `settings:get/set-api-key` 已预留，供后续设置面板使用 |
| 模式切换 | 互斥，同时仅一个模式窗口可见 |
| 窗口生命周期 | 首次使用时创建，之后 hide/show 复用 |
| 窗口数量 | 每个模式一个独立 BrowserWindow，共 3 个 |
| 对话组织 | 全局共享一个活跃对话 session |
| 渲染方式 | 每个模式独立的 `index.html`，内嵌 CSS/JS |
| 共享代码 | 通过 `<script src="../shared/...">` 加载共享 JS/CSS |

---

## 2. 架构设计

### 2.1 进程架构

```
┌──────────────────────────────────────────────────────────┐
│                 Electron Main Process                    │
│                 (src/main/, CommonJS)                    │
│                                                          │
│  main.js (入口) → 组装所有服务 → 创建托盘 → 启动桌宠     │
│                                                          │
│  ┌──────────────┐  ┌──────────────────────────────────┐  │
│  │ window-manager│  │          IPC Handlers           │  │
│  │ (三窗口管理)  │  │    (ipcMain.handle 路由)        │  │
│  └──────────────┘  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐    │
│  │              Services (依赖注入)                   │    │
│  │  ┌─────────┐ ┌──────────┐ ┌───────────────────┐  │    │
│  │  │database │ │llm-service│ │   task-service    │  │    │
│  │  │(lowdb)  │ │(DeepSeek) │ │   (任务 CRUD)     │  │    │
│  │  └─────────┘ └──────────┘ └───────────────────┘  │    │
│  │  ┌──────────────────┐ ┌───────────────────────┐  │    │
│  │  │relationship-svc  │ │ pomodoro-service     │  │    │
│  │  │(关系阶段)        │ │ (番茄钟计时)          │  │    │
│  │  └──────────────────┘ └───────────────────────┘  │    │
│  │  ┌──────────────────┐ ┌───────────────────────┐  │    │
│  │  │narrative-engine  │ │ proactive-trigger(空) │  │    │
│  │  │(叙事生成)        │ │ user-style-analyzer   │  │    │
│  │  └──────────────────┘ └───────────────────────┘  │    │
│  └──────────────────────────────────────────────────┘    │
└──────────┬──────────────┬───────────────┬───────────────┘
           │              │               │
     IPC   │        IPC   │         IPC   │
           ▼              ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 桌宠渲染进程  │ │ 壁纸渲染进程  │ │ 软件渲染进程  │
│ pet/         │ │ wallpaper/   │ │ software/    │
│ index.html   │ │ index.html   │ │ index.html   │
│ (纯 HTML/    │ │ (纯 HTML/    │ │ (纯 HTML/    │
│  CSS/JS)     │ │  CSS/JS)     │ │  CSS/JS)     │
│              │ │              │ │              │
│ 300×400px    │ │ 全屏覆盖      │ │ 1280×800px   │
│ 透明无边框    │ │ 半透明        │ │ 独立窗口      │
└──────────────┘ └──────────────┘ └──────────────┘
```

### 2.2 目录结构

```
desk-pet/
├── src/
│   ├── main/                          # 主进程 (CommonJS)
│   │   ├── main.js                    # 入口：依赖组装、托盘、启动
│   │   ├── ipc-handlers.js            # IPC 路由注册（所有 ipcMain.handle）
│   │   ├── database.js                # lowdb 封装
│   │   ├── llm-service.js             # DeepSeek API 封装
│   │   ├── task-service.js            # 任务业务逻辑
│   │   ├── relationship-service.js    # 关系阶段计算
│   │   ├── pomodoro-service.js        # 番茄钟计时
│   │   ├── narrative-engine.js        # 叙事反馈生成
│   │   ├── proactive-trigger.js       # 主动交互（原型空壳）
│   │   ├── user-style-analyzer.js     # 用户风格分析（原型空壳）
│   │   └── window-manager.js          # 三窗口生命周期
│   ├── renderer/
│   │   ├── pet/                       # 桌宠模式
│   │   │   └── index.html             # 单文件（含内嵌 CSS + JS）
│   │   ├── wallpaper/                 # 壁纸模式
│   │   │   └── index.html             # 单文件（含内嵌 CSS + JS）
│   │   ├── software/                  # 软件模式
│   │   │   └── index.html             # 单文件（含内嵌 CSS + JS）
│   │   └── shared/                    # 三种模式共享的 JS/CSS
│   │       ├── styles/
│   │       │   ├── variables.css      # CSS 自定义属性
│   │       │   ├── animations.css     # 呼吸/眨眼/弹跳关键帧
│   │       │   └── base.css           # reset + 全局样式
│   │       ├── ipc-client.js          # IPC 调用封装（类型化 wrapper）
│   │       ├── dom-utils.js           # 共享 DOM 操作工具函数
│   │       ├── state-manager.js       # 简易响应式状态管理
│   │       ├── character-renderer.js  # 角色渲染器（图标 SVG + 动画）
│   │       ├── conversation-panel.js  # 对话面板组件
│   │       ├── task-panel.js          # 任务面板组件
│   │       └── pomodoro-timer.js      # 番茄钟显示组件
│   └── preload.js                     # preload (CommonJS, contextBridge)
├── assets/
│   ├── characters/default/
│   │   ├── icon.svg                   # 角色占位 SVG
│   │   ├── expressions/               # 表情图（原型为空，后续放 PNG）
│   │   └── motions/                   # 动作序列帧（原型为空，后续放 PNG 或 Live2D 模型）
│   ├── backgrounds/                   # 壁纸背景（原型阶段用 CSS 渐变，后续放 PNG）
│   ├── ui/
│   │   ├── tray-icon.png              # 系统托盘图标
│   │   └── themes/default/            # UI 主题资源（原型为空）
│   ├── audio/                         # 白噪音音频（原型为空，后续放 mp3）
│   └── worldbooks/default.json        # 世界书 JSON
├── data/                              # lowdb 数据文件 (db.json)
├── tests/                             # vitest 单元测试
│   ├── database.test.js
│   ├── task-service.test.js
│   ├── relationship-service.test.js
│   ├── pomodoro-service.test.js
│   ├── llm-service.test.js
│   ├── narrative-engine.test.js
│   ├── ipc-handlers.test.js
│   └── ipc-client.test.js
├── doc/                               # 文档
├── vitest.config.mjs                  # vitest 配置（已存在，不动）
├── package.json                       # 依赖配置（已存在，不动）
├── tsconfig.json                      # TS 类型检查配置（已存在，不动）
└── biome.json                         # 代码规范配置（已存在，不动）
```

---

## 3. 数据模型

### 3.1 lowdb 数据结构 (`data/db.json`)

```json
{
  "appState": {
    "currentMode": "pet",
    "petWindowBounds": { "x": 1000, "y": 600, "width": 300, "height": 400 },
    "wallpaperSettings": { "opacity": 0.85, "characterPosition": "right", "soundVolume": 0.5 },
    "pomodoro": null
  },
  "tasks": [],
  "character": {
    "id": "luna_moonwhisper",
    "currentMood": "gentle",
    "currentExpression": "smile",
    "lastInteractionAt": ""
  },
  "relationship": {
    "characterId": "luna_moonwhisper",
    "stage": "acquaintance",
    "totalTasksCompleted": 0,
    "totalPomodoros": 0,
    "totalConversations": 0,
    "consecutiveDays": 1,
    "lastInteractionAt": ""
  },
  "worldState": {
    "currentChapter": 1,
    "variables": { "crystalIntegrity": 75 }
  },
  "conversations": []
}
```

### 3.2 类型约定（JSDoc 注释标注，供 tsc 检查）

JS 文件通过 JSDoc 注释标注类型，不引入 TypeScript 文件。示例：

```js
/** @typedef {'pet'|'wallpaper'|'software'} Mode */
/** @typedef {'active'|'completed'} TaskStatus */
/** @typedef {'stranger'|'acquaintance'|'familiar'|'close'|'soulmate'} RelStage */

/** @typedef {{ id: string, realTitle: string, rpgTitle: string, rpgDescription: string,
 *   estimatedPomodoros: number, estimatedMinutes: number, deadline: string,
 *   status: TaskStatus, createdAt: string, completedAt: string|null,
 *   followUpPromptAt: string|null, followUpCompleted: boolean, followUpResult: string,
 *   subtasks: SubTask[] }} Task */

/** @typedef {{ id: string, realDesc: string, rpgDesc: string, completed: boolean }} SubTask */

/** @typedef {{ role: 'user'|'assistant'|'system', content: string }} Message */
```

---

## 4. 主进程模块接口

以下接口是子 Agent 实现时必须遵守的契约。方法签名、参数类型、返回值类型必须一致。

### 4.1 Database (`src/main/database.js`)

```js
class Database {
  constructor(filePath)  // filePath 默认 'data/db.json'

  getAppState()                    // → object
  updateAppState(partial)          // → object（浅合并）
  getTasks(filter)                 // → Task[], filter: { status?: 'active'|'completed' }
  getTaskById(taskId)              // → Task | undefined
  createTask(taskData)             // → Task（自动生成 id、createdAt）
  updateTask(taskId, partial)      // → Task
  deleteTask(taskId)               // → void
  toggleSubtask(taskId, subId)     // → Task
  completeTask(taskId)             // → Task（设 status='completed', completedAt=now）
  getCharacter()                   // → object
  updateCharacter(partial)         // → object
  getRelationship()                // → object
  updateRelationship(partial)      // → object
  getWorldState()                  // → object
  updateWorldState(partial)        // → object
  getActiveConversation()          // → object（无则自动创建）
  addMessage(convId, message)      // → Message, message: { role, content }
  getRecentMessages(convId, limit) // → Message[]
  getApiKey()                      // → string
  setApiKey(key)                   // → void
}
```

### 4.2 WindowManager (`src/main/window-manager.js`)

```js
const WINDOW_CONFIG = {
  pet:       { width: 300, height: 400, transparent: true, frame: false, alwaysOnTop: true,  resizable: false, skipTaskbar: true },
  wallpaper: { fullscreen: true,          transparent: true, frame: false, alwaysOnTop: false, resizable: false, skipTaskbar: true },
  software:  { width: 1280, height: 800, transparent: false, frame: true, alwaysOnTop: false, resizable: true,  skipTaskbar: false }
}

class WindowManager {
  constructor(preloadPath)       // preloadPath: preload.js 绝对路径
  getOrCreateWindow(mode)        // → BrowserWindow
  switchMode(targetMode)         // → void（隐藏当前→显示目标→更新 currentMode）
  getCurrentMode()               // → 'pet'|'wallpaper'|'software'
  getCurrentWindow()             // → BrowserWindow | null
  getWindow(mode)                // → BrowserWindow | null（不创建）
  closeAll()                     // → void
}
```

### 4.3 LLMService (`src/main/llm-service.js`)

```js
class LLMService {
  constructor(config)  // config: { apiKey, db, worldBook }
  buildSystemPrompt(context)  // context: { currentMode, activeTask? } → string

  async chat(options, onChunk, onDone, onError) {}
  // options: { message }
  // onChunk(text: string) — 每收到一个 token
  // onDone(fullText, metadata) — 流完成。metadata: { intent?, taskPayload? }
  // onError(error: { type: 'network'|'api'|'timeout'|'parse', message, retried })

  abort()  // → void
}
```

**错误处理规则**：
- 网络错误 → 等待 1s → 重试一次 → 仍失败 `type='network', retried=true`
- API 错误 (4xx/5xx) → 不重试，`type='api', retried=false`
- 响应解析错误 → `type='parse', retried=false`

### 4.4 TaskService (`src/main/task-service.js`)

```js
class TaskService {
  constructor(db)                  // db: Database 实例
  createTask(data)                 // → Task
  createFromAIResponse(payload)    // → Task（校验必填字段 → 补全默认值 → createTask）
  getActiveTasks()                 // → Task[]
  getAllTasks()                    // → Task[]
  getTaskById(taskId)              // → Task | undefined
  updateTask(taskId, partial)      // → Task
  toggleSubtask(taskId, subId)     // → Task
  completeTask(taskId)             // → { task, isFullyCompleted }
  deleteTask(taskId)               // → void
}
```

### 4.5 RelationshipService (`src/main/relationship-service.js`)

阈值硬编码（原型阶段）：
```
stranger→acquaintance: tasksCompleted >= 1
acquaintance→familiar:  tasksCompleted >= 5,  pomodoros >= 10
familiar→close:         tasksCompleted >= 15, pomodoros >= 30, consecutiveDays >= 7
close→soulmate:         tasksCompleted >= 30, pomodoros >= 60, consecutiveDays >= 30
```

```js
class RelationshipService {
  constructor(db)
  getCurrentStage()          // → string
  incrementStat(stat)        // → object  stat: 'tasksCompleted'|'pomodoros'|'conversations'
  checkAndUpgrade()          // → { upgraded, from?, to? }
  touchLastInteraction()     // → void
  updateConsecutiveDays()    // → number
}
```

### 4.6 PomodoroService (`src/main/pomodoro-service.js`)

```js
class PomodoroService {
  constructor()
  start(durationMinutes, options)  // → { sessionId, totalSeconds }
  // options: { taskId?, onTick(remaining), onEnd(), onCancel() }
  stop()                           // → void
  getRemaining()                   // → number | null
  isRunning()                      // → boolean
  getCurrentTaskId()               // → string | null
  destroy()                        // → void
}
```

### 4.7 NarrativeEngine (`src/main/narrative-engine.js`)

```js
class NarrativeEngine {
  constructor(llmService)
  buildSettlementPrompt(task)       // → string
  async generateFeedback(task, completionType)  // → { narrative, worldStateChanges? }
  // 原型阶段 completionType 固定为 'on_time'
  // TODO: 后续扩展 'late', 'long_overdue', 'repeated' 四种逾期叙事
}
```

### 4.8 ProactiveTrigger (`src/main/proactive-trigger.js`) — 原型空壳

```js
class ProactiveTrigger {
  constructor() {}
  registerSource(name, checker, intervalMs) {}
  start() {}
  stop() {}
  setQuietHours(start, end) {}
  onTrigger(callback) {}
}
```

### 4.9 UserStyleAnalyzer (`src/main/user-style-analyzer.js`) — 原型空壳

```js
class UserStyleAnalyzer {
  constructor() {}
  async analyze(messages) { return {} }
}
```

---

## 5. IPC 通信协议

### 5.1 Preload API (`src/preload.js`)

通过 `contextBridge` 暴露 `window.electronAPI`，渲染进程**禁止直接访问 Node.js/Electron API**。

暴露的 API 分组：

```
conversation:  send(message), getHistory(), abort(),
               onChunk(cb), onDone(cb), onError(cb), removeAllListeners()

task:          getAll(status?), getById(taskId), create(data), update(taskId, partial),
               toggleSubtask(taskId, subtaskId), complete(taskId), delete(taskId)

app:           switchMode(mode), getState(), getCharacter(), getRelationship(),
               onModeActivated(cb)

pomodoro:      start(duration?, taskId?), stop(), getStatus(),
               onTick(cb), onEnd(cb), removeAllListeners()

settings:      getApiKey(), setApiKey(key), getWallpaper(), updateWallpaper(partial)

window:        hide(), closeMode()
```

### 5.2 统一响应格式

```ts
{ ok: true, data: T }   // 成功
{ ok: false, error: { code: string, message: string } }  // 失败
```

### 5.3 流式对话特有路径

`conversation:send` 不走标准 request/response：
1. 渲染进程 `invoke('conversation:send', { message })` 发起
2. 主进程通过 `webContents.send('conversation:chunk', { chunk })` 逐 token 推送
3. 完成时 `webContents.send('conversation:done', { fullText, intent?, taskPayload? })`
4. 错误时 `webContents.send('conversation:error', { code, message })`

流完成前消息不持久化。中断/切换模式时未完成的流被中止，消息不保存。

### 5.4 完整 IPC 通道清单

**对话**：`conversation:send`, `conversation:chunk`(main→renderer), `conversation:done`(main→renderer), `conversation:error`(main→renderer), `conversation:get-history`, `conversation:abort`

**任务**：`task:get-all`, `task:get-by-id`, `task:create`, `task:update`, `task:toggle-subtask`, `task:complete`, `task:delete`

**应用/模式**：`app:switch-mode`, `app:get-state`, `app:get-character`, `app:get-relationship`, `mode:activated`(main→renderer)

**番茄钟**：`pomodoro:start`, `pomodoro:stop`, `pomodoro:get-status`, `pomodoro:tick`(main→renderer), `pomodoro:end`(main→renderer)

**设置**：`settings:get-api-key`, `settings:set-api-key`, `settings:get-wallpaper`, `settings:update-wallpaper`

**窗口**：`window:hide`, `window:close-mode`

**错误码**：`TASK_NOT_FOUND`, `TASK_CREATE_INVALID`, `LLM_NETWORK`, `LLM_API`, `LLM_TIMEOUT`, `POMODORO_NOT_RUNNING`, `MODE_INVALID`, `INTERNAL`

---

## 6. 渲染进程设计（纯 HTML/CSS/JS）

### 6.1 架构原则

- 每个模式一个 `index.html`，内含 `<style>` 和 `<script>` 标签
- 共享样式（`variables.css`, `animations.css`, `base.css`）通过 `<link>` 加载
- 共享 JS 模块（`ipc-client.js`, `dom-utils.js`, `state-manager.js` 等）通过 `<script src>` 加载
- 所有 DOM 操作使用原生 API（`document.createElement`, `querySelector` 等）
- 状态管理：渲染进程维护本地状态对象，通过 IPC 与主进程同步
- 禁止引入任何 npm 前端框架（Vue/React/jQuery 等）
- **禁止在 JS/CSS 中硬编码颜色、字体、尺寸**，必须引用 `variables.css` 中的 CSS 变量

### 6.2 CSS 变量规范 (`variables.css`)

所有颜色、字体、尺寸必须通过以下 CSS 变量引用，**禁止硬编码**：

```css
:root {
  /* 色板 — 暗色星空主题 */
  --color-primary: #6B5CE7;        /* 主色（紫） */
  --color-primary-light: #8B7CF0;  /* 主色浅 */
  --color-accent: #F0C060;         /* 强调色（金） */
  --color-bg-darkest: #0D0D1A;     /* 最深背景 */
  --color-bg-dark: #1A1A2E;        /* 深背景 */
  --color-bg-medium: #252540;      /* 中等背景 */
  --color-bg-light: #333355;       /* 浅背景 */
  --color-text-primary: #E8E8F0;   /* 主文字（银白） */
  --color-text-secondary: #A0A0C0; /* 次文字 */
  --color-text-muted: #606080;     /* 弱化文字 */
  --color-success: #4ECDC4;        /* 成功绿 */
  --color-warning: #F0C060;        /* 警告黄 */
  --color-danger: #E05555;         /* 危险红 */

  /* 字号 */
  --font-xs: 10px;
  --font-sm: 12px;
  --font-base: 14px;
  --font-lg: 16px;
  --font-xl: 20px;
  --font-2xl: 28px;

  /* 间距 */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-round: 50%;

  /* 阴影 */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.5);

  /* 过渡 */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;

  /* 字体 */
  --font-main: "Segoe UI", "Microsoft YaHei", system-ui, sans-serif;
  --font-mono: "Cascadia Code", "Fira Code", "Consolas", monospace;

  /* 窗口尺寸（禁止在 JS 中硬编码，必须从此处或 WINDOW_CONFIG 读取） */
  --win-pet-width: 300px;
  --win-pet-height: 400px;
  --win-software-width: 1280px;
  --win-software-height: 800px;

  /* 角色尺寸 */
  --char-pet-size: 120px;
  --char-wallpaper-size: 200px;
  --char-software-size: 160px;
}
```

### 6.3 共享 JS 模块

#### `ipc-client.js` — IPC 调用封装

提供 `IpcClient` 类，封装 `window.electronAPI` 调用：
- 统一处理 `{ ok, data }` / `{ ok, error }` 响应
- 流式调用提供 Promise + 事件回调双模式
- 错误时抛出标准化 Error 对象

#### `dom-utils.js` — DOM 工具

- `createElement(tag, attrs, children)` — 快速创建元素
- `show(el)` / `hide(el)` / `toggle(el)`
- `addClass(el, cls)` / `removeClass(el, cls)`

#### `state-manager.js` — 简易状态管理

- `createState(initialState)` → `{ get, set, subscribe }`
- `subscribe(key, callback)` — 状态变化时自动更新对应 DOM

#### `character-renderer.js` — 角色渲染器

- `createCharacterRenderer(container, options)` → `{ setExpression, setMotion, destroy }`
- options: `{ mode: 'pet'|'wallpaper'|'software', size: number, assetType: 'css'|'image'|'live2d' }`
- `assetType` 原型阶段固定为 `'css'`（CSS/SVG 占位图标）
- `'image'` 模式加载 `assets/characters/{id}/expressions/{name}.png`
- `'live2d'` 模式初始化 Live2D Canvas（预留，后续实现）
- 渲染 SVG 角色图标 + CSS 呼吸动画 + 眨眼动画

#### `conversation-panel.js` — 对话面板

- `createConversationPanel(container, options)` → `{ addMessage, showTyping, hideTyping, clear }`
- options: `{ position: 'bottom'|'side', onSend(text) }`

#### `task-panel.js` — 任务面板

- `createTaskPanel(container, options)` → `{ setTasks, refresh }`
- options: `{ compact: boolean, onToggle(taskId, subId), onViewDetail(taskId) }`

#### `pomodoro-timer.js` — 番茄钟显示

- `createPomodoroTimer(container, options)` → `{ update, start, stop }`
- options: `{ onStart(), onStop() }`
- 圆形 SVG 进度环 + MM:SS 格式显示

### 6.4 各模式页面结构

#### 桌宠模式 (`renderer/pet/index.html`)

```
布局：全窗口 300×400，透明背景
├── 角色区域（居中 120×120px，可拖动，点击打开对话）
├── 对话面板（底部弹出，position='bottom'）
│   ├── 消息列表
│   └── 输入框 + 发送按钮
├── 迷你任务面板（右键弹出，浮动面板，最大300px高）
└── 右键菜单（壁纸模式/软件模式/退出）
```

特殊行为：
- 透明无边框，始终置顶
- 角色区域外鼠标穿透（`setIgnoreMouseEvents`）
- 角色区域 CSS `-webkit-app-region: drag`

#### 壁纸模式 (`renderer/wallpaper/index.html`)

```
布局：全屏覆盖，半透明暗色背景
├── 全屏背景层（CSS 渐变，深色星空）
├── 角色展示区（居中 200×200px）
├── 番茄钟控制区（居中下方，启动/停止 + 圆形进度环）
├── 白噪音占位（禁用下拉框 + 提示文字）
├── 侧边对话栏（position='side'，点击角色滑入）
├── 底部进度条（番茄钟运行时显示，极细条）
└── 退出按钮（ESC 或点击）
```

#### 软件模式 (`renderer/software/index.html`)

```
布局：1280×800 窗口，暗色星空主题，三栏布局
├── 标题栏
├── 左侧导航栏（任务/地图/角色，三个标签垂直排列）
├── 中间内容区
│   ├── 任务标签页：任务列表 + 任务详情 + 子任务勾选 + 提交按钮
│   ├── 地图标签页：静态区域占位图 + 章节文字
│   └── 角色标签页：背景故事 + 共同记忆时间线
├── 右侧角色区
│   ├── 角色展示（160×160px）
│   └── 底部对话面板
```

### 6.5 资源命名约定

后续替换资源时，按下述约定命名文件即可，**无需改代码**：

| 资源类型 | 命名规则 | 示例 |
|---------|---------|------|
| 壁纸背景 | `assets/backgrounds/{mode}_{chapterId}.png` | `wallpaper_ch1.png`, `software_default.png` |
| 角色表情 | `assets/characters/{charId}/expressions/{name}.png` | `luna_moonwhisper/expressions/smile.png` |
| 角色动作 | `assets/characters/{charId}/motions/{name}/` (帧序列) | `luna_moonwhisper/motions/idle/001.png` |
| 白噪音 | `assets/audio/{id}.mp3` | `rain_loop.mp3` |
| 世界书映射 | 在 `worldbooks/default.json` 中配置 `backgrounds` 和 `audio` 字段 | 见第 10 节 |

**代码加载规则**：
- 壁纸模式背景：读取 `worldBook.backgrounds.wallpaper[`chapter_${chapterId}`]` → 加载文件
- 白噪音：读取 `worldBook.audio.tracks` → 渲染下拉列表 → 用户选择后加载 `assets/audio/{file}`
- 角色表情/动作：`character-renderer.js` 根据 `assetType` 决定加载 CSS 动画还是图片资源

### 6.6 错误文案映射

渲染进程收到错误时，显示角色化文案而非技术错误信息：

| 错误场景 | 用户可见文案 |
|----------|------------|
| LLM 网络不通 | "星辰之间的通讯似乎被什么干扰了，稍等片刻再试试吧~" |
| API Key 未配置 | "旅者，你还没有设置与星辰通讯的密钥呢。请在 data/db.json 中配置 apiKey。" |
| LLM 超时 | "星辰的回应比平时慢了一些…要再试一次吗？" |
| 未知错误 | "啊…好像出了点小问题。要不要先做点别的？" |

---

## 7. 开发阶段与模块划分

### 第一阶段：基础设施（5 个模块）

| 序号 | 模块 | 文件 | 任务文档 |
|------|------|------|----------|
| 1 | 基础设施搭建 | Vite 已移除，改为配置 package.json scripts + 资源文件 | `tasks/infrastructure.md` |
| 2 | 数据层 | `src/main/database.js` | `tasks/database.md` |
| 3 | 窗口管理器 | `src/main/window-manager.js` | `tasks/window-manager.md` |
| 4 | Preload 脚本 | `src/preload.js` | `tasks/preload.md` |
| 5 | 共享样式 | `src/renderer/shared/styles/*.css` | `tasks/shared-styles.md` |

### 第二阶段：桌宠模式（9 个模块）

| 序号 | 模块 | 文件 | 任务文档 |
|------|------|------|----------|
| 6 | LLM 服务 | `src/main/llm-service.js` | `tasks/llm-service.md` |
| 7 | 任务服务 | `src/main/task-service.js` | `tasks/task-service.md` |
| 8 | 关系服务 | `src/main/relationship-service.js` | `tasks/relationship-service.md` |
| 9 | IPC 路由 | `src/main/ipc-handlers.js` | `tasks/ipc-handlers.md` |
| 10 | 共享 JS 模块 | `src/renderer/shared/*.js` | `tasks/shared-components.md` |
| 11 | 空壳模块 | `proactive-trigger.js` + `user-style-analyzer.js` | `tasks/shell-modules.md` |
| 12 | 主进程入口 | `src/main/main.js` | `tasks/main-entry.md` |
| 13 | 桌宠模式页面 | `src/renderer/pet/index.html` | `tasks/pet-mode.md` |

### 第三阶段：壁纸 + 软件模式（4 个模块）

| 序号 | 模块 | 文件 | 任务文档 |
|------|------|------|----------|
| 14 | 番茄钟服务 | `src/main/pomodoro-service.js` | `tasks/pomodoro-service.md` |
| 15 | 叙事引擎 | `src/main/narrative-engine.js` | `tasks/narrative-engine.md` |
| 16 | 壁纸模式页面 | `src/renderer/wallpaper/index.html` | `tasks/wallpaper-mode.md` |
| 17 | 软件模式页面 | `src/renderer/software/index.html` | `tasks/software-mode.md` |

### 第四阶段：联调收尾（1 个模块）

| 序号 | 模块 | 任务文档 |
|------|------|----------|
| 18 | 集成联调 | `tasks/integration.md` |

---

## 8. 测试要求

### 8.1 单元测试规范

- 测试框架：vitest
- 测试目录：`tests/`
- 命名：`tests/<module-name>.test.js`
- 每个模块必须有对应的测试文件
- 只测纯逻辑（函数输入输出、状态变更），不测 DOM/Electron API

### 8.2 测试覆盖要求

| 模块 | 测试重点 |
|------|---------|
| database.js | 全部 CRUD 方法，默认值初始化，临时文件隔离 |
| task-service.js | CRUD 全路径，子任务全完成/未全完成分支，AI 响应字段校验 |
| relationship-service.js | 各阈值边界，跨级跳跃，单向不降级 |
| pomodoro-service.js | tick 次数/参数，onEnd 触发，stop 清除 interval，fake timers |
| llm-service.js | mock fetch，请求格式，重试逻辑(1次)，Prompt 拼接，流式回调 |
| narrative-engine.js | mock LLMService，Prompt 输出格式，参数传递 |
| ipc-handlers.js | 每个 handler 参数校验 + 服务调用路由 + 错误响应不崩溃 |
| ipc-client.js | mock electronAPI，响应解析，错误处理 |

### 8.3 禁止的测试实践

- 不写 `__mocks__/` 目录（用 `vi.fn()` 内联 mock）
- 不写 `setup.js` / `setupTests.js`
- 不 mock `electron` 或 `lowdb` 模块（Database 测试用临时文件替代，WindowManager 不单元测试）
- 不写 E2E 测试、不写集成测试（原型阶段）

---

## 9. AI 对话引擎

### 9.1 DeepSeek API 调用参数

```js
POST https://api.deepseek.com/v1/chat/completions
{
  model: 'deepseek-chat',
  messages: [{ role: 'system', content: systemPrompt }, ...history, { role: 'user', content: message }],
  temperature: 0.8,
  max_tokens: 500,
  stream: true
}
```

### 9.2 System Prompt 模板

```
[角色设定]
你是{character.name}，{character.background}。
你的性格是{character.personality}。说话风格：{character.speechStyle}。

[世界背景]
你来自{world.title}——{world.description}。
当前章节：第{chapter}章「{chapterTitle}」
世界规则：{world.rules}

[关系状态]
你与用户的关系阶段：{stage}
你们已经一起完成了{totalTasksCompleted}项任务。

[当前上下文]
当前模式：{currentMode}
活跃任务：{activeTaskTitle}

[行为指令]
- 回复控制在 50-100 字
- 若对话中包含待办事项，使用 /task 指令触发任务转化
- 在主动互动时，保持简短（不超过 50 字）

[任务转化]
当检测到用户待办事项时，返回以下 JSON（不要包含其他文字）：
{"intent":"create_task","realTask":"...","rpgTitle":"...","rpgDescription":"...","estimatedPomodoros":2,"estimatedMinutes":50,"subtasks":[{"realDesc":"...","rpgDesc":"..."}]}
```

### 9.3 流式输出处理

- SSE 格式解析：按 `data: ` 前缀提取，忽略 `[DONE]`
- 通过 IPC 逐 token 推给渲染进程
- 流完成后检测完整文本中是否包含任务转化 JSON
- 降级：JSON 解析失败时，当作纯文本显示

---

## 10. 世界书

世界书文件 `assets/worldbooks/default.json` 完整内容如下。**子 Agent 必须据此创建该文件**（如尚未存在），System Prompt 组装时从此文件读取角色设定和世界背景。

```json
{
  "worldId": "aetheria_v1",
  "title": "埃瑟利亚大陆",
  "description": "一个由魔法与蒸汽科技共存的世界。",
  "rules": [
    "魔法需要消耗生命力或魔晶",
    "传送门仅在各王国首都设立"
  ],
  "character": {
    "id": "luna_moonwhisper",
    "name": "露娜·月语",
    "role": "导航员",
    "personality": "温柔、坚强、略带迷糊",
    "background": "最后一支星语者部族的幸存者，通过星辰预言引导你修复世界。",
    "speechStyle": "习惯使用星辰比喻，结尾常带'呢'、'哦'。",
    "relationshipsStageThresholds": {
      "stranger_to_acquaintance": { "tasksCompleted": 1 },
      "acquaintance_to_familiar": { "tasksCompleted": 5, "pomodoros": 10 },
      "familiar_to_close": { "tasksCompleted": 15, "pomodoros": 30, "consecutiveDays": 7 },
      "close_to_soulmate": { "tasksCompleted": 30, "pomodoros": 60, "consecutiveDays": 30 }
    }
  },
  "storyChapters": [
    {
      "chapterId": 1,
      "title": "觉醒的星辰",
      "goal": "修复破碎的引导之星",
      "milestones": [
        { "id": "m1", "description": "收集3块星尘碎片", "required": 3, "progress": 0 }
      ]
    },
    {
      "chapterId": 2,
      "title": "迷雾中的航路",
      "goal": "穿越迷雾之海，抵达北方王国",
      "milestones": []
    }
  ],
  "worldStateDefaults": {
    "crystalIntegrity": 75,
    "kingdomRelations": { "north": "neutral", "south": "tense" }
  },
  "pomodoroDefaults": {
    "focusDuration": 25,
    "breakDuration": 5
  },
  "proactiveInteraction": {
    "intervalMinutes": 20,
    "idleTriggerMinutes": 30,
    "quietHoursStart": "23:00",
    "quietHoursEnd": "08:00"
  },
  "backgrounds": {
    "wallpaper": { "chapter_1": "bg_ch1_starfield.png", "chapter_2": "bg_ch2_mist.png" },
    "software": { "default": "bg_soft_dark.png" }
  },
  "audio": {
    "tracks": [
      { "id": "rain", "name": "雨声", "file": "rain_loop.mp3" },
      { "id": "forest", "name": "森林", "file": "forest_ambient.mp3" },
      { "id": "fire", "name": "篝火", "file": "fire_crackle.mp3" },
      { "id": "ocean", "name": "海浪", "file": "ocean_waves.mp3" },
      { "id": "cafe", "name": "咖啡馆", "file": "cafe_ambient.mp3" }
    ]
  }
}
```

---

## 11. 角色占位方案

原型阶段使用纯 CSS/SVG 角色图标替代 Live2D：
- 圆形银发角色头像（CSS 绘制）
- 呼吸动画：`@keyframes breathe` scale 1.0 ↔ 1.05, 3s
- 眨眼动画：`@keyframes blink` 每 4s 一次
- 互动反馈：点击弹跳动画 + 颜色轻微变化

---

## 【底层约束 - 防烧钱与防崩溃】

**1. 禁止递归修复**
- 发现代码错误时，不得自动重写或修复
- 只能输出错误原因和修复建议，等待用户说"请修复"后再动手
- 禁止"测试→失败→重写→再测试"的自动循环

**2. 禁止生成测试基础设施**
- 不写 `__mocks__/` 目录
- 不写 `setup.js` / `setupTests.js`
- 不写 `vitest.config.mjs`（已存在，不动）
- 不写任何 `vi.mock("electron")` 或 `vi.mock("lowdb")`
- 只保留纯函数单元测试（输入输出，不依赖外部模块）

**3. 禁止修改基础设施文件**
- 不得修改 `package.json`、`biome.json`、`tsconfig.json`、`.gitignore`
- 如需改依赖或配置，输出建议，由用户手动执行

**4. 代码复杂度上限**
- 单个函数不超过 50 行
- 单个文件不超过 150 行
- 超过必须拆分成多个文件或函数
- 禁止嵌套超过 3 层的回调/条件

**5. 禁止引入新依赖**
- 不得 `npm install` 任何新包
- 如需新功能，先用现有依赖（electron、lowdb）实现
- 特殊情况需用户明确同意

**6. 禁止自动执行 git 操作**
- 不得自动 `git add`、`git commit`、`git push`
- 不得修改 `.git/` 目录

**7. 上下文与输出控制**
- 每次回复不超过 3000 字（节省 token）
- 不重复输出已确认通过的代码
- 不生成"教学式"长篇解释，只给代码和关键注释

**8. 文件修改白名单**
- 只能修改当前正在开发的模块文件
- 不得回头修改已验收通过的模块（如 shared、database 等）
- 如需修改，必须说明理由并等待用户确认

**9. Electron 安全约束**
- 主进程（main.js）禁止写同步阻塞代码（如 `fs.readFileSync` 大文件）
- 渲染进程禁止直接调用 Node.js API（必须通过 IPC）
- 禁止硬编码窗口尺寸、颜色值，必须提取为常量

**10. 资源占位策略**
- 立绘/背景图未到位时，用 CSS 纯色块 + 文字标签占位
- 禁止因等待美术资源而阻塞代码开发

---

## 附录：快速参考

### A. 项目文件清单（全部实现后的预期状态）

```
src/main/main.js, ipc-handlers.js, database.js, llm-service.js,
      task-service.js, relationship-service.js, pomodoro-service.js,
      narrative-engine.js, proactive-trigger.js, user-style-analyzer.js,
      window-manager.js

src/preload.js

src/renderer/pet/index.html
src/renderer/wallpaper/index.html
src/renderer/software/index.html

src/renderer/shared/styles/variables.css, animations.css, base.css
src/renderer/shared/ipc-client.js, dom-utils.js, state-manager.js,
                       character-renderer.js, conversation-panel.js,
                       task-panel.js, pomodoro-timer.js

assets/characters/default/icon.svg
assets/characters/default/expressions/.gitkeep
assets/characters/default/motions/.gitkeep
assets/worldbooks/default.json
assets/audio/.gitkeep
assets/backgrounds/.gitkeep
assets/ui/tray-icon.png
assets/ui/themes/default/.gitkeep
data/db.json

tests/database.test.js, task-service.test.js, relationship-service.test.js,
      pomodoro-service.test.js, llm-service.test.js, narrative-engine.test.js,
      ipc-handlers.test.js, ipc-client.test.js
```

### B. 验收标准

- [ ] `npm start` — 应用启动，桌宠窗口出现，托盘图标可见
- [ ] 三模式任意切换不闪退
- [ ] 桌宠模式：对话 + 任务发布流程跑通
- [ ] 壁纸模式：番茄钟启动/停止/倒计时正常
- [ ] 软件模式：任务结算 + 叙事反馈流程跑通
- [ ] `npx tsc --noEmit` — 类型检查通过
- [ ] `npx biome check .` — lint 通过
- [ ] `npx vitest run` — 全部单元测试通过
- [ ] 重启应用后数据保留（lowdb 持久化正常）
