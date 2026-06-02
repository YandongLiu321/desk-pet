# 桌面 AI 陪伴应用 — 详细设计 V1.0

## 1. 设计概述

### 1.1. 设计目标

- 将提案中的架构拆分为**可独立开发、独立测试**的模块
- 每个模块定义明确的接口（方法签名、参数类型、返回值类型）
- 模块间通过依赖注入解耦，便于单元测试时 mock
- IPC 通道作为主进程与渲染进程之间的唯一通信协议，完整定义请求/响应类型

### 1.2. 关键设计决策（已确认）

| 决策项 | 结论 |
|--------|------|
| API Key 存储 | lowdb 配置文件中，用户手动编辑 |
| 模式切换 | 互斥，同时仅一个模式窗口可见 |
| 窗口生命周期 | 首次使用时创建，之后 hide/show 复用；应用退出时全部销毁 |
| 对话组织 | 全局共享一个活跃对话 session |
| 任务管理 | 独立 `task-service.js` 模块 |
| LLM 错误处理 | 自动重试 1 次 + 降级提示 |
| 番茄钟 | 仅在壁纸模式存活，切换/关闭即取消 |
| MVP 范围 | 不包含礼物/商店/CG/好感度数值/多角色/语音/世界编辑器/社交/在线同步 |
| 设计粒度 | 模块接口 + 时序图 |

### 1.3. 模块依赖总览

```
                         ┌─────────────────┐
                         │    main.js       │
                         │  (入口/组装)      │
                         └───────┬─────────┘
                                 │ 创建并注入
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  window-manager  │   │  ipc-handlers   │   │    database     │
│  (窗口生命周期)   │   │  (IPC 路由)     │   │   (lowdb 封装)  │
└─────────────────┘   └───────┬─────────┘   └────────┬────────┘
                              │                      │
                              │ 依赖（注入）          │ 被以下服务依赖
                              ▼                      │
              ┌───────────────────────────┐          │
              │         Services          │◄─────────┘
              │  ┌─────────────────────┐  │
              │  │ llm-service         │  │
              │  │ task-service        │  │
              │  │ relationship-service│  │
              │  │ pomodoro-service    │  │
              │  │ narrative-engine    │  │
              │  │ proactive-trigger   │  │ (原型阶段为空壳)
              │  │ user-style-analyzer │  │ (原型阶段为空壳)
              │  └─────────────────────┘  │
              └───────────────────────────┘
```

服务模块之间**禁止直接引用**，所有协作通过 `main.js` 在组装时注入。

---

## 2. 主进程模块设计

### 2.1. Database (`src/main/database.js`)

**职责**：封装 lowdb 的读写操作，屏蔽 JSON 文件细节。所有数据访问必须通过此模块。

**设计原则**：
- 同步读写（lowdb 7 基于 JSON 文件，操作是同步的，且原型阶段数据量极小）
- 每个数据域提供专门的 getter/setter，调用方不直接操作 lowdb 链式 API
- 启动时自动初始化默认数据结构

**接口定义**：

```js
class Database {
  constructor(filePath) {} // filePath 默认 'data/db.json'

  // === 应用状态 ===
  getAppState()                // → AppState
  updateAppState(partial)      // → AppState（浅合并）

  // === 任务 ===
  getTasks(filter?)            // → Task[]  filter: { status?: 'active'|'completed' }
  getTaskById(taskId)          // → Task | undefined
  createTask(taskData)         // → Task（自动生成 id、createdAt）
  updateTask(taskId, partial)  // → Task
  deleteTask(taskId)           // → void
  toggleSubtask(taskId, subId) // → Task
  completeTask(taskId)         // → Task（设 status='completed', completedAt=now）

  // === 角色 ===
  getCharacter()               // → Character
  updateCharacter(partial)     // → Character

  // === 关系 ===
  getRelationship()            // → Relationship
  updateRelationship(partial)  // → Relationship

  // === 世界状态 ===
  getWorldState()              // → WorldState
  updateWorldState(partial)    // → WorldState

  // === 对话 ===
  getActiveConversation()      // → Conversation（无则自动创建）
  addMessage(convId, message)  // → Message  message: { role, content }
  getRecentMessages(convId, limit) // → Message[]

  // === 设置 ===
  getApiKey()                  // → string（从 appState 或独立字段读取）
  setApiKey(key)               // → void
}
```

**类型定义**：

```ts
// 与提案 3.1 数据结构一致
interface AppState {
  currentMode: 'pet' | 'wallpaper' | 'software'
  petWindowBounds: { x: number; y: number; width: number; height: number }
  characterPosition: { x: number; y: number; width: number; height: number }
  wallpaperSettings: { opacity: number; characterPosition: string; soundVolume: number }
  pomodoro: { taskId?: string; remaining: number; total: number; running: boolean } | null
  apiKey?: string  // DeepSeek API Key 存储于此
}

interface Task {
  id: string
  realTitle: string
  rpgTitle: string
  rpgDescription: string
  estimatedPomodoros: number
  estimatedMinutes: number
  deadline: string          // ISO 8601
  status: 'active' | 'completed'
  createdAt: string
  completedAt: string | null
  followUpPromptAt: string | null
  followUpCompleted: boolean
  followUpResult: string
  subtasks: SubTask[]
  milestoneId: string | null  // 关联的世界书 milestone id，AI 创建任务时根据当前章节主题填充
}

interface SubTask {
  id: string
  realDesc: string
  rpgDesc: string
  completed: boolean
}

interface Character {
  id: string
  currentMood: string
  currentExpression: string
  lastInteractionAt: string
}

interface Relationship {
  characterId: string
  stage: 'stranger' | 'acquaintance' | 'familiar' | 'close' | 'soulmate'
  totalTasksCompleted: number
  totalPomodoros: number
  totalConversations: number
  consecutiveDays: number
  lastInteractionAt: string
}

interface Conversation {
  id: string
  messages: Message[]
  createdAt: string
}

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface WorldState {
  currentChapter: number
  variables: Record<string, number | string>
}
```

**测试策略**：传入临时文件路径，每个测试用例独立创建 Database 实例，测试后删除临时文件。

---

### 2.2. Window Manager (`src/main/window-manager.js`)

**职责**：管理三个 BrowserWindow 的生命周期，确保模式互斥切换。

**设计原则**：
- 首次使用时创建窗口，之后 hide/show 复用
- 切换模式时：隐藏当前窗口 → 显示目标窗口
- 应用退出时：销毁所有窗口
- 窗口配置从 worldbook 和 appState 读取

**接口定义**：

```js
class WindowManager {
  constructor(preloadPath) {} // preloadPath: preload.js 的绝对路径

  // 获取或创建指定模式的窗口
  getOrCreateWindow(mode) // mode: 'pet' | 'wallpaper' | 'software' → BrowserWindow

  // 切换到指定模式（隐藏当前，显示目标）
  switchMode(targetMode)  // → void
  // 副作用：
  //   1. 若当前窗口存在 → currentWindow.hide()
  //   2. 目标窗口 → getOrCreate(targetMode) → targetWindow.show()
  //   3. 更新 appState.currentMode → db.updateAppState({ currentMode })
  //   4. 通知目标渲染进程 'mode:activated'

  // 获取当前活跃模式
  getCurrentMode()        // → 'pet' | 'wallpaper' | 'software'

  // 获取当前活跃窗口
  getCurrentWindow()      // → BrowserWindow | null

  // 销毁所有窗口
  closeAll()              // → void

  // 获取指定模式的窗口（不创建）
  getWindow(mode)         // → BrowserWindow | null
}
```

**窗口配置常量**：

```js
const WINDOW_CONFIG = {
  pet: {
    width: 500, height: 500,
    transparent: true, frame: false,
    alwaysOnTop: true, resizable: false,
    skipTaskbar: true
  },
  // design note: 角色在 500×500 窗口中偏右放置 (x:240, y:20)
  // 左侧 240px 给对话/任务面板，右侧 140px 给右键菜单
  // 透明区域默认 pointer-events: none，浮层打开时通过 .interactive class 切换
  wallpaper: {
    fullscreen: true,
    transparent: true, frame: false,
    alwaysOnTop: false, resizable: false,
    skipTaskbar: true
  },
  software: {
    width: 1280, height: 800,
    transparent: false, frame: true,
    alwaysOnTop: false, resizable: true,
    skipTaskbar: false
  }
}
```

**测试策略**：在单元测试中 mock `BrowserWindow` 构造函数，验证 `getOrCreateWindow` 的缓存行为和 `switchMode` 的 hide/show 调用顺序。由于依赖 Electron API，实际窗口行为在集成测试中验证。

---

### 2.3. LLM Service (`src/main/llm-service.js`)

**职责**：封装 DeepSeek API 调用，包括 System Prompt 组装、任务转化 Prompt、流式响应处理和错误重试。

**设计原则**：
- 所有对外接口为 async 函数
- apiKey 和 db 通过依赖注入传入，不内部读取
- 流式响应通过回调逐块推送
- 自动重试 1 次（仅网络错误），仍失败则降级

**接口定义**：

```js
class LLMService {
  constructor(config) {}
  // config: { apiKey: string, db: Database, worldBook: object }

  // 发送对话消息，返回流式响应处理器
  // 返回的 streamController 用于逐块推送和取消
  async chat(options, onChunk, onDone, onError) {}
  // options: { message: string }
  //      message — 用户输入文本
  // onChunk(chunk: string) — 每收到一个 token 时调用
  // onDone(fullText: string, metadata: object) — 流完成时调用
  //      metadata.intent — 'create_task' | 'switch_mode' | null
  //      metadata.taskPayload — 若 intent='create_task' 则含结构化任务 JSON
  //      metadata.switchTarget — 若 intent='switch_mode' 则为 'wallpaper' | 'software'
  // onError(error: LLMError) — 出错时调用
  //      LLMError: { type: 'network'|'api'|'timeout'|'parse', message: string, retried: boolean }

  // 组装 System Prompt（也可供其他模块调用）
  buildSystemPrompt(context) // context: { currentMode, activeTask?, enableTaskCreation? } → string
  // enableTaskCreation — 左键闲聊为 false，右键发布任务为 true

  // 释放当前活跃的请求（用于取消对话等场景）
  abort()                    // → void
}
```

**System Prompt 组装逻辑**（`buildSystemPrompt`）：

```
输入：context { currentMode, activeTask, enableTaskCreation? }
步骤：
  1. 从 db 读取 character、relationship、recentMessages(20)
  2. 从 worldBook 读取 world、currentChapter 信息
  3. 按照提案 5.2 模板填充，返回完整 system prompt 字符串
  4. 若 context.enableTaskCreation === true，追加任务转化指令（见提案 5.3）；
     若为 false（左键闲聊），不注入任务转化指令
  5. 模式切换意图识别指令始终追加（在所有对话场景中可用）
```

**错误处理流程**：

```
API 调用失败
  ├── 网络错误（fetch failed / timeout）→ 等待 1s → 重试一次
  │     ├── 重试成功 → 正常返回
  │     └── 重试失败 → onError({ type: 'network', retried: true })
  ├── API 错误（4xx/5xx）→ 不重试
  │     └── onError({ type: 'api', retried: false })
  └── 响应解析错误（非 JSON）
        └── onError({ type: 'parse', retried: false })
```

**降级行为**：渲染进程收到 LLMError 后展示角色化提示："星辰通讯暂时中断，请稍后再试…"

**测试策略**：mock `fetch` 全局函数，验证：
- 正常请求/响应的参数格式
- 网络错误时重试 1 次的行为
- API 错误时不重试的行为
- System Prompt 各字段的正确拼接
- 流式响应的逐块回调

---

### 2.4. Task Service (`src/main/task-service.js`)

**职责**：封装任务业务逻辑——创建、转化 AI 响应、结算、子任务管理。

**设计原则**：
- 依赖注入 Database 实例
- 不直接依赖 LLMService（任务转化由调用方协调）
- 任务 ID 生成规则由本模块内部封装

**接口定义**：

```js
class TaskService {
  constructor({ db, worldBook }) {} // db: Database 实例, worldBook: 世界书对象

  // 创建任务
  createTask(data)             // → Task
  // data: { realTitle, rpgTitle, rpgDescription, estimatedPomodoros, estimatedMinutes, deadline, subtasks? }

  // 从 AI 结构化响应创建任务
  createFromAIResponse(payload) // → Task
  // payload: AI 返回的 JSON（见提案 5.3 格式）
  // 步骤：校验字段 → 补全默认值 → createTask()

  // 查询
  getActiveTasks()             // → Task[]  （status === 'active'）
  getAllTasks()                // → Task[]
  getTaskById(taskId)          // → Task | undefined

  // 更新
  updateTask(taskId, partial)  // → Task

  // 子任务操作
  toggleSubtask(taskId, subId) // → Task

  // 结算——子任务全部完成时调用
  completeTask(taskId)         // → { task: Task, isFullyCompleted: boolean, milestoneProgress?: object }
  // 步骤：
  //   1. 检查所有子任务是否 completed
  //   2. 若是 → 调用 db.completeTask(taskId)
  //   3. 若任务关联了当前章节的某个 milestone，milestone.progress += 1
  //      - 关联方式：任务创建时 AI 根据当前章节主题包装叙事，完成后自动关联对应 milestone
  //   4. 若 milestone.progress >= milestone.required，标记该 milestone 完成
  //   5. 若当前章节所有 milestones 完成，worldState.currentChapter += 1，解锁下一章
  //   6. 更新 worldState.variables（如 crystalIntegrity += 2）
  //   7. 返回更新后的 task、isFullyCompleted 和可选的 milestoneProgress 标志
  // 注意：结算后的叙事反馈由 NarrativeEngine 负责，本模块不处理

  // 删除
  deleteTask(taskId)           // → void
}
```

**测试策略**：传入真实 Database 实例（指向临时文件），验证 CRUD 全部路径，包括：
- 子任务全完成时的 completeTask 行为
- 子任务未全完成时 completeTask 应返回 isFullyCompleted=false
- createFromAIResponse 字段校验（缺少必填字段时的行为）

---

### 2.5. Relationship Service (`src/main/relationship-service.js`)

**职责**：计算并更新用户与角色的关系阶段。

**设计原则**：
- 阈值在原型阶段硬编码，但通过一个独立函数隔离，便于后续切换为 worldbook 配置读取
- 阶段推进是单向的（不降级）

**接口定义**：

```js
class RelationshipService {
  constructor(db) {}

  // 获取当前阶段
  getCurrentStage()      // → string

  // 增加统计计数（完成任务、完成番茄钟、对话轮次后调用）
  incrementStat(stat)    // → Relationship
  // stat: 'tasksCompleted' | 'pomodoros' | 'conversations'

  // 检查并更新阶段（每次 incrementStat 后自动调用）
  checkAndUpgrade()      // → { upgraded: boolean, from: string, to: string }
  // 步骤：
  //   1. 读取当前 stage 和 stats
  //   2. 检查是否达到下一阶段阈值（硬编码）
  //   3. 若达到 → 更新 stage、返回 { upgraded: true, from, to }
  //   4. 若未达到 → 返回 { upgraded: false }

  // 更新最后交互时间
  touchLastInteraction() // → void

  // 计算连续天数（每次应用启动时调用）
  updateConsecutiveDays() // → number
}
```

**硬编码阈值**（原型阶段）：

```js
const THRESHOLDS = [
  { from: 'stranger',     to: 'acquaintance', tasksCompleted: 1 },
  { from: 'acquaintance', to: 'familiar',     tasksCompleted: 5,  pomodoros: 10 },
  { from: 'familiar',     to: 'close',        tasksCompleted: 15, pomodoros: 30, consecutiveDays: 7 },
  { from: 'close',        to: 'soulmate',     tasksCompleted: 30, pomodoros: 60, consecutiveDays: 30 },
]
```

**测试策略**：独立测试 `checkAndUpgrade` 各阈值边界，验证阶段推进和跨级跳跃行为。与 database 集成测试。

---

### 2.6. Pomodoro Service (`src/main/pomodoro-service.js`)

**职责**：管理番茄钟计时器。仅在壁纸模式存活的会话级计时。

**设计原则**：
- 使用 `setInterval` 每秒 tick，不持久化
- 计时结束触发回调，由 IPC handler 转发给渲染进程
- 模式切换时（壁纸→其他）自动停止当前番茄钟

**接口定义**：

```js
class PomodoroService {
  constructor() {}

  // 启动番茄钟
  start(durationMinutes, options)  // → { sessionId, totalSeconds }
  // options: { taskId?: string, onTick(remaining), onEnd(), onCancel() }
  // 默认 durationMinutes = 25

  // 停止当前番茄钟
  stop()                           // → void（触发 onCancel 回调）

  // 获取剩余秒数
  getRemaining()                   // → number | null（无活跃番茄钟返回 null）

  // 是否正在运行
  isRunning()                      // → boolean

  // 获取关联的 taskId
  getCurrentTaskId()               // → string | null

  // 销毁定时器（应用退出时调用）
  destroy()                        // → void
}
```

**内部实现要点**：
- 使用 `setInterval` 每 1000ms tick 一次
- tick 时调用 `onTick(remaining)` 通知渲染进程更新 UI
- remaining 归零时清除 interval，调用 `onEnd()`
- stop() 清除 interval，调用 `onCancel()`
- 不支持暂停/恢复（原型简化），仅有 start/stop

**测试策略**：使用 vitest 的 `vi.useFakeTimers()` 控制时间，验证：
- tick 回调的调用次数和参数
- 倒计时归零时 onEnd 回调触发
- stop() 后 interval 清除
- 多次 start 时前一个 timer 被正确清除

---

### 2.7. Narrative Engine (`src/main/narrative-engine.js`)

**职责**：根据任务完成情况生成叙事反馈文本。原型阶段通过 LLM 动态生成。

**设计原则**：
- 不直接调用 LLM API，而是返回 Prompt 文本，由调用方（IPC handler）协调 LLM 调用
- 原型阶段仅处理 `on_time` 路径

**接口定义**：

```js
class NarrativeEngine {
  constructor(llmService) {} // llmService: LLMService 实例（用于后续扩展）

  // 为任务完成生成叙事反馈
  async generateFeedback(task, completionType) // → { narrative: string, worldStateChanges?: object }
  // completionType: 'on_time'（原型阶段仅此一种）
  // 步骤：
  //   1. 构建叙事 Prompt（含任务 RPG 描述、角色信息、世界状态）
  //   2. 调用 llmService.chat() 生成叙事文本
  //   3. 解析 AI 返回，提取叙事文本和可能的世界状态变更
  //   4. 返回 { narrative, worldStateChanges }

  // 构建结算 Prompt（供测试或自定义使用）
  buildSettlementPrompt(task) // → string
}
```

**测试策略**：mock LLMService，验证 `buildSettlementPrompt` 输出格式和 `generateFeedback` 的参数传递。AI 生成内容的质量由人工验收。

---

### 2.8. Proactive Trigger (`src/main/proactive-trigger.js`)

**原型阶段状态**：空壳模块，仅定义接口，不实现任何触发逻辑。所有方法返回空值或 no-op。

```js
class ProactiveTrigger {
  constructor() {}
  registerSource(name, checker, intervalMs) {}  // 空实现
  start() {}                                      // 空实现
  stop() {}                                       // 空实现
  setQuietHours(start, end) {}                    // 空实现
  onTrigger(callback) {}                          // 空实现
}
```

---

### 2.9. User Style Analyzer (`src/main/user-style-analyzer.js`)

**原型阶段状态**：空壳模块，`analyze()` 返回空对象 `{}`。

```js
class UserStyleAnalyzer {
  constructor() {}
  async analyze(messages) { return {} } // 原型阶段返回空对象
}
```

---

### 2.10. IPC Handlers (`src/main/ipc-handlers.js`)

**职责**：注册所有 `ipcMain.handle()` 通道，将请求路由到对应服务模块。这是主进程与渲染进程之间**唯一**的通信入口。

**设计原则**：
- 所有服务依赖通过构造函数注入
- 每个 handler 做参数校验 → 调用服务 → 格式化返回值
- handler 内部 catch 异常，返回统一错误格式

**统一响应格式**：

```ts
// 成功
{ ok: true, data: T }

// 失败
{ ok: false, error: { code: string, message: string } }
```

**完整 IPC 通道清单**：

```js
class IPCHandlers {
  constructor(deps) {}
  // deps: { db, windowManager, llmService, taskService, relationshipService, pomodoroService, narrativeEngine }

  registerAll() {} // 在 main.js 中调用一次，注册全部通道
}
```

#### IPC 通道定义

**对话**：

| 通道名 | 方向 | 请求载荷 | 响应载荷 |
|--------|------|----------|----------|
| `conversation:send` | renderer→main | `{ message: string }` | 流式：main 通过 `conversation:chunk` 逐块推送 |
| `conversation:chunk` | main→renderer | `{ chunk: string }` | — |
| `conversation:done` | main→renderer | `{ fullText: string, intent?: 'create_task'\|'switch_mode', taskPayload?: object, switchTarget?: 'wallpaper'\|'software' }` | — |
| `conversation:error` | main→renderer | `{ code: string, message: string }` | — |
| `conversation:get-history` | renderer→main | — | `{ ok: true, data: Message[] }` |
| `conversation:abort` | renderer→main | — | — |

**注**：`conversation:send` 不是标准的 request/response 模式。渲染进程通过 `ipcRenderer.invoke('conversation:send', { message })` 发起，主进程通过 `window.webContents.send('conversation:chunk', ...)` 推送流。渲染进程需要同时监听 `conversation:chunk`、`conversation:done`、`conversation:error` 三个事件。

`conversation:done` 中的 `intent` 字段决定后续行为：
- `'create_task'` → 渲染进程调用 `task:create` 创建任务
- `'switch_mode'` → 渲染进程调用 `app:switch-mode` 切换到 `switchTarget` 指定模式
- 无 intent → 纯闲聊，无后续动作

**任务**：

| 通道名 | 方向 | 请求载荷 | 响应载荷 |
|--------|------|----------|----------|
| `task:get-all` | renderer→main | `{ status?: 'active'\|'completed' }` | `{ ok: true, data: Task[] }` |
| `task:get-by-id` | renderer→main | `{ taskId: string }` | `{ ok: true, data: Task }` |
| `task:create` | renderer→main | TaskPayload（不含 id/createdAt） | `{ ok: true, data: Task }` |
| `task:update` | renderer→main | `{ taskId, partial }` | `{ ok: true, data: Task }` |
| `task:toggle-subtask` | renderer→main | `{ taskId, subtaskId }` | `{ ok: true, data: Task }` |
| `task:complete` | renderer→main | `{ taskId }` | `{ ok: true, data: { task, narrative?, worldStateChanges? } }` |
| `task:delete` | renderer→main | `{ taskId }` | `{ ok: true }` |

**应用/模式**：

| 通道名 | 方向 | 请求载荷 | 响应载荷 |
|--------|------|----------|----------|
| `app:switch-mode` | renderer→main | `{ mode: 'pet'\|'wallpaper'\|'software' }` | `{ ok: true }` |
| `app:get-state` | renderer→main | — | `{ ok: true, data: AppState }` |
| `app:get-character` | renderer→main | — | `{ ok: true, data: Character }` |
| `app:get-relationship` | renderer→main | — | `{ ok: true, data: Relationship }` |
| `mode:activated` | main→renderer | `{ mode: string }` | —（通知渲染进程模式已切换） |

**番茄钟**：

| 通道名 | 方向 | 请求载荷 | 响应载荷 |
|--------|------|----------|----------|
| `pomodoro:start` | renderer→main | `{ duration?: number, taskId?: string }` | `{ ok: true, data: { sessionId, totalSeconds } }` |
| `pomodoro:stop` | renderer→main | — | `{ ok: true }` |
| `pomodoro:get-status` | renderer→main | — | `{ ok: true, data: { remaining, total, isRunning, taskId } }` |
| `pomodoro:tick` | main→renderer | `{ remaining: number, total: number }` | — |
| `pomodoro:end` | main→renderer | — | — |

**设置**：

| 通道名 | 方向 | 请求载荷 | 响应载荷 |
|--------|------|----------|----------|
| `settings:get-api-key` | renderer→main | — | `{ ok: true, data: string }` |
| `settings:set-api-key` | renderer→main | `{ key: string }` | `{ ok: true }` |
| `settings:get-wallpaper` | renderer→main | — | `{ ok: true, data: WallpaperSettings }` |
| `settings:update-wallpaper` | renderer→main | `partial WallpaperSettings` | `{ ok: true }` |

**窗口**（仅渲染进程主动触发）：

| 通道名 | 方向 | 请求载荷 | 响应载荷 |
|--------|------|----------|----------|
| `window:hide` | renderer→main | — | `{ ok: true }`（最小化当前窗口到托盘） |
| `window:close-mode` | renderer→main | — | `{ ok: true }`（关闭当前模式，返回桌宠） |

**错误码**：

| code | 含义 |
|------|------|
| `TASK_NOT_FOUND` | 任务 ID 不存在 |
| `TASK_CREATE_INVALID` | 创建任务时缺少必填字段 |
| `LLM_NETWORK` | DeepSeek API 网络不通（已重试） |
| `LLM_API` | DeepSeek API 返回错误 |
| `LLM_TIMEOUT` | API 调用超时 |
| `POMODORO_NOT_RUNNING` | 无活跃番茄钟时调用 stop |
| `MODE_INVALID` | 无效的模式名称 |
| `INTERNAL` | 未预期的内部错误 |

**测试策略**：每个 handler 独立测试——mock 所有注入的服务，验证：
- 参数正确时调用对应服务方法
- 参数缺失/非法时返回错误
- 服务抛异常时返回 INTERNAL 错误（不崩溃）

---

### 2.11. 入口文件 (`src/main/main.js`)

**职责**：组装所有模块，创建依赖注入容器，启动应用。

```js
// main.js 伪代码
const db = new Database('data/db.json')
const windowManager = new WindowManager(preloadPath)
const worldBook = JSON.parse(fs.readFileSync('assets/worldbooks/default.json'))

const apiKey = db.getApiKey()
const llmService = new LLMService({ apiKey, db, worldBook })
const taskService = new TaskService({ db, worldBook })
const relationshipService = new RelationshipService(db)
const pomodoroService = new PomodoroService()
const narrativeEngine = new NarrativeEngine(llmService)
const proactiveTrigger = new ProactiveTrigger()
const userStyleAnalyzer = new UserStyleAnalyzer()

const ipcHandlers = new IPCHandlers({
  db, windowManager, llmService, taskService,
  relationshipService, pomodoroService, narrativeEngine
})
ipcHandlers.registerAll()

// 创建系统托盘
// 启动时默认打开桌宠窗口
windowManager.switchMode('pet')
```

---

## 3. Preload 脚本 (`src/preload.js`)

**职责**：通过 `contextBridge` 向渲染进程暴露安全的最小 API 表面，渲染进程**不能**直接访问 Node.js 或 Electron API。

**暴露的 API**：

```ts
// window.electronAPI（所有渲染进程可见）
interface ElectronAPI {
  // 对话
  conversation: {
    send(message: string): void  // 发起对话（通过 invoke 触发流式）
    getHistory(): Promise<ApiResponse<Message[]>>
    abort(): Promise<void>
    // 流式事件监听
    onChunk(callback: (chunk: string) => void): void
    onDone(callback: (data: { fullText: string; intent?: string; taskPayload?: object }) => void): void
    onError(callback: (error: { code: string; message: string }) => void): void
    removeAllListeners(): void
  }

  // 任务
  task: {
    getAll(status?: string): Promise<ApiResponse<Task[]>>
    getById(taskId: string): Promise<ApiResponse<Task>>
    create(data: TaskPayload): Promise<ApiResponse<Task>>
    update(taskId: string, partial: Partial<Task>): Promise<ApiResponse<Task>>
    toggleSubtask(taskId: string, subtaskId: string): Promise<ApiResponse<Task>>
    complete(taskId: string): Promise<ApiResponse<{ task: Task; narrative?: string }>>
    delete(taskId: string): Promise<ApiResponse<void>>
  }

  // 应用/模式
  app: {
    switchMode(mode: 'pet' | 'wallpaper' | 'software'): Promise<void>
    getState(): Promise<ApiResponse<AppState>>
    getCharacter(): Promise<ApiResponse<Character>>
    getRelationship(): Promise<ApiResponse<Relationship>>
    onModeActivated(callback: (mode: string) => void): void
  }

  // 番茄钟
  pomodoro: {
    start(duration?: number, taskId?: string): Promise<ApiResponse<{ sessionId: string; totalSeconds: number }>>
    stop(): Promise<void>
    getStatus(): Promise<ApiResponse<PomodoroStatus>>
    onTick(callback: (data: { remaining: number; total: number }) => void): void
    onEnd(callback: () => void): void
    removeAllListeners(): void
  }

  // 设置
  settings: {
    getApiKey(): Promise<string>
    setApiKey(key: string): Promise<void>
    getWallpaper(): Promise<ApiResponse<WallpaperSettings>>
    updateWallpaper(partial: Partial<WallpaperSettings>): Promise<void>
  }

  // 窗口
  window: {
    hide(): Promise<void>         // 最小化到托盘
    closeMode(): Promise<void>    // 关闭当前模式→返回桌宠
  }
}
```

**实现要点**：
- 事件类 API（`onChunk`、`onDone`、`onError`、`onTick`、`onEnd`、`onModeActivated`）通过 `ipcRenderer.on()` 实现
- 调用类 API 通过 `ipcRenderer.invoke()` 实现
- `conversation.send()` 特殊处理：invoke 发起后，流式数据通过 WebContents.send 推回

---

## 4. 渲染进程模块设计

### 4.1. 渲染进程架构

每个模式使用单一 `index.html` 文件（内嵌 `<style>` 和 `<script>`）：

```
renderer/{mode}/
└── index.html        # 单文件页面（含内嵌 CSS + JS），模式专属布局

renderer/shared/      # 三种模式共享的 JS 模块和 CSS 样式
├── ipc-client.js, dom-utils.js, state-manager.js,
│   character-renderer.js, conversation-panel.js,
│   task-panel.js, pomodoro-timer.js
└── styles/
    ├── variables.css    # CSS 自定义属性（颜色、间距、字体）
    ├── animations.css   # 呼吸、眨眼、弹跳关键帧
    └── base.css         # reset + 全局样式
```

### 4.2. 状态管理

渲染进程不使用框架级状态管理。每个页面的 `<script>` 中维护本地状态对象，通过 `IpcClient`（封装 `window.electronAPI`）与主进程通信。共享模块 `state-manager.js` 提供轻量发布订阅。

**数据流**：渲染进程启动 → IPC 拉取主进程最新状态 → 渲染 DOM。写操作：渲染进程 → IPC → 主进程更新 lowdb → 返回确认 → 更新本地状态 + DOM。

**测试策略**：mock `window.electronAPI` 后验证 IpcClient 调用参数正确性和 DOM 更新。

### 4.3. 桌宠模式 (`renderer/pet/`)

500×500 透明无边框窗口，角色 120×120 偏右放置（x:240, y:20）。角色区域始终可交互。透明区域（非角色位置）默认鼠标穿透桌面，浮层打开时全窗口可交互。

#### 页面结构

```
index.html（纯 HTML/CSS/JS，无框架）
├── 角色区域 div（120×120，绝对定位 x:240 y:20）
│   └── CharacterRenderer（mode='pet', size=120）
├── 主动气泡 div（角色头顶上方，position: absolute）
│   └── 单行文字 + 关闭按钮，默认隐藏，数秒后自动消失
├── 对话面板容器 div（角色左侧，position: absolute）
│   └── ConversationPanel（position='bottom', 240×400）
├── 右键菜单 div（角色右侧，position: absolute）
│   └── 菜单项：发布任务/壁纸模式/软件模式/查看任务/隐藏
└── 迷你任务面板 div（角色左侧，position: absolute）
    └── TaskPanel（compact=true, 240×300，与对话面板互斥）
```

#### 交互规格

1. **主动气泡**：角色头顶浮现单行简短文字（≤50字），带关闭按钮，数秒后自动消失。点击气泡 → 展开左侧对话面板。原型阶段仅搭 UI，触发逻辑后续补。
2. **左键对话（闲聊）**：点击角色区域 → 左侧对话面板 toggle 展开（240×400）。纯闲聊通道，`enableTaskCreation: false`。流式显示 AI 回复。点击面板外或 ESC 关闭。
3. **右键菜单**：右键角色 → 右侧弹出菜单（min-width:130px）。5 项：
   - **发布任务** → 打开对话面板，`enableTaskCreation: true`（AI 注入任务转化 Prompt）
   - **进入壁纸模式** → `app:switch-mode('wallpaper')`
   - **进入软件模式** → `app:switch-mode('software')`
   - **查看任务** → 左侧展开迷你任务面板（与对话面板互斥，同时只显示一个）
   - **隐藏** → `window.hide()`（隐藏到托盘，因 `window-all-closed` 时应用托盘常驻不退出，与托盘的"退出应用"区分）
4. **迷你任务面板**：右侧菜单"查看任务"触发，240×300，compact 模式。勾选子任务通过 IPC 同步。与对话面板互斥——打开一个时自动关闭另一个。
5. **智能模式切换**：闲聊中 AI 识别切换意图 → 角色询问确认 → 用户同意 → AI 返回 `intent: switch_mode` → 自动切换。

#### 鼠标穿透规则（纯 CSS 方案）

- **默认状态**（无浮层）：`body` `pointer-events: none`。仅角色区域 `pointer-events: auto` + `-webkit-app-region: drag` 接收鼠标事件。
- **浮层打开时**（任一对话面板/菜单/气泡/任务面板显示）：渲染进程给 `body` 添加 `.interactive` class → `pointer-events: auto` → 全窗口可交互。
- **所有浮层关闭时**：移除 `.interactive` class → 恢复默认。
- 无需 IPC 通道，主进程不参与鼠标穿透控制。

#### 拖动

角色区域 CSS `-webkit-app-region: drag`，用户可拖动整个窗口到桌面任意位置。角色内部可点击元素（气泡触发区、对话面板展开区）用 `-webkit-app-region: no-drag` 覆盖。

### 4.4. 壁纸模式 (`renderer/wallpaper/`)

#### 页面结构

```
index.html（纯 HTML/CSS/JS）
├── 全屏背景层 div（CSS 星空渐变）
├── 角色展示区 div（居中 200×200px，CharacterRenderer mode='wallpaper'）
├── 番茄钟控制区（居中下方，PomodoroTimer + 启动/停止按钮）
├── 白噪音占位 div（禁用控件 + "音效即将上线"文字）
├── 侧边对话栏 div（ConversationPanel position='side'，点击角色滑入）
├── 底部进度条 div（番茄钟运行时显示，极细条）
├── 退出按钮（ESC 或点击触发任务进度询问）
└── 退出确认浮层 div（任务进度询问 → 勾选子任务 / 延长 / 记录进度）
```

#### 交互流程

1. **进入壁纸模式**：全屏覆盖 → 角色大尺寸居中 → 若无活跃番茄钟显示启动按钮
2. **番茄钟**：点击开始 → 倒计时 → 边缘进度条同步 → 时间到 → 角色弹出问题 → 用户选择完成/未完成 → 叙事反馈
3. **白噪音**：原型阶段为占位 UI。组件接口已预留（音源选择、音量控制），`assets/audio/` 目录已创建，后续加入音频文件即生效
4. **对话**：点击角色 → 侧边滑入对话栏 → 交互方式与桌宠一致
5. **退出（含任务进度询问与番茄钟循环）**：ESC 或按钮 → 角色弹出询问"这次的专注任务完成得怎么样？"：
   - **完成了** → 展示关联任务，用户勾选已完成的子任务 → 子任务全完成则触发结算叙事 → 返回桌宠
   - **还没完成** → 角色询问"需要再延 25 分钟继续吗？"：
     - **同意** → 番茄钟重新开始倒计时 → 用户继续专注 → 时间到后再次询问
     - **拒绝（坚持退出）** → 角色询问"那记录一下进度吧~" → 用户输入进度描述 → 记录到任务备注 → 返回桌宠
   - 若无关联任务 → 直接返回桌宠

#### 特殊行为
- 番茄钟 running 时，窗口 `skipTaskbar` 为 true（不打扰）
- 切换到其他模式时，番茄钟自动 stop
- 退出壁纸时角色必须询问任务进度（番茄钟关联了 taskId 时），不可直接闪切。未完成时可延长番茄钟进入下一轮循环
- 默认 25 分钟专注 + 5 分钟休息（从 worldbook 读取 `pomodoroDefaults`）

#### WhiteNoiseControl 预留接口

原型阶段不实现音频播放，仅渲染占位 UI。`assets/audio/` 目录已创建，后续放入 mp3 文件即可生效。

```js
// WhiteNoiseControl — 预留接口
function createWhiteNoiseControl(container, {
  tracks: Array<{            // 原型阶段为空数组，后续从 assets/audio/ 扫描
    id: string,              // 音效标识，如 'rain', 'forest', 'fire'
    name: string,            // 显示名，如 "雨声"、"森林"、"篝火"
    file: string             // 相对于 assets/audio/ 的文件名，如 'rain.mp3'
  }>,
  volume: Number,            // 0-1，默认从 wallpaperSettings.soundVolume 读取
  currentTrackId: string | null,
  onSelectTrack: Function,
  onVolumeChange: Function
}) → { destroy }
// 原型阶段渲染：一个禁用的下拉选择框 + 禁用滑块 + 提示文字"音效即将上线"
```

**数据模型预留**：`wallpaperSettings.soundVolume` 字段已存在于 lowdb AppState 中。

### 4.5. 软件模式 (`renderer/software/`)

#### 页面结构

```
index.html（纯 HTML/CSS/JS，1280×800 窗口，暗色星空主题，三栏布局）
├── 标题栏 div
├── 左侧导航栏 div（任务/地图/角色，三个标签垂直排列）
├── 中间内容区 div（根据标签切换）
│   ├── 任务标签页：TaskPanel（任务列表+详情+子任务勾选+提交按钮）
│   ├── 地图标签页：WorldMap（静态区域占位+章节文字）
│   └── 角色标签页：背景故事 + 共同记忆时间线
├── 右侧角色区 div
│   ├── CharacterRenderer（mode='software', size=160）
│   └── 底部 ConversationPanel
```

#### 交互流程

1. **进入软件模式**：1280×800 独立窗口 → 暗色星空主题 → 默认显示"任务"标签
2. **任务管理**：查看任务列表 → 点击查看详情 → 勾选子任务 → 全完成 → 点击"提交任务" → 调用 `task:complete` → 显示叙事反馈
3. **世界地图**：静态插画占位 → 区域标记（CSS 层覆盖） → 显示当前章节和世界变量
4. **角色档案**：静态背景故事 + 共同记忆时间线（数据来源：任务结算时 NarrativeEngine 生成的叙事摘要，存入 Task 的结算记录中，时间线从这些摘要渲染）
5. **右侧对话**：与桌宠共享对话引擎，conversationStore 统一管理

### 4.6. 共享组件设计

#### CharacterRenderer (`character-renderer.js`)

```js
class CharacterRenderer {
  constructor(container, {
    mode: 'pet' | 'wallpaper' | 'software',
    size: Number,             // 渲染尺寸（px）
    assetType: 'css' | 'image' | 'live2d'  // 原型阶段 'css'
  })
  mount()                     // 初始化渲染
  setExpression(name)         // 切换表情
  setMotion(name)             // 切换动作
  destroy()                   // 清理
}
// 原型阶段 assetType='css'：渲染 SVG 图标 + CSS 呼吸/眨眼动画
// assetType='image'：加载 assets/characters/{id}/expressions/{name}.png
// assetType='live2d'：初始化 Live2D Canvas（预留）
```

各模式默认尺寸：
- pet: 120×120px
- wallpaper: 200×200px
- software: 160×160px

#### ConversationPanel (`conversation-panel.js`)

```js
class ConversationPanel {
  constructor(container, {
    position: 'bottom' | 'side',  // bottom: 桌宠左侧，side: 壁纸侧边滑入
    onSend: (text: string) => void
  })
  mount()                      // 初始化 DOM
  addMessage(role, content)    // 添加消息到列表
  showTyping() / hideTyping() // 显示/隐藏"正在输入"指示器
  showError(err)               // 显示角色化错误文案
  clear()                      // 清空消息列表
}
```

**行为**：自动滚动到最新消息、流式消息实时追加、发送中显示"..."动画。

#### TaskPanel (`task-panel.js`)

```js
class TaskPanel {
  constructor(container, {
    compact: Boolean,          // true: 迷你面板, false: 完整模式
    onToggle: (taskId, subId) => void,
    onViewDetail: (taskId) => void
  })
  mount()                      // 初始化 DOM
  setTasks(tasks)              // 设置任务列表并刷新
  refresh()                    // 重新渲染
}
```

**行为**：compact 模式显示标题+子任务勾选框（240×300），最大高度 300px 超出滚动。

#### PomodoroTimer (`pomodoro-timer.js`)

```js
class PomodoroTimer {
  constructor(container, {
    onStart: () => void,
    onStop: () => void
  })
  update(remaining, total)    // 更新剩余时间和进度环
  start() / stop()            // 切换运行状态
}
```

**显示格式**：`MM:SS`，最后一分钟数字变暖色。**进度环**：圆形 SVG，不依赖外部库。

---

## 5. 时序图

### 5.1. 对话流程（含意图识别）

```
用户          渲染进程(桌宠)        Preload             主进程(IPC)         LLM Service       Database
 │                │                   │                    │                   │              │
 │  输入文字       │                   │                    │                   │              │
 │───────────────>│                   │                    │                   │              │
 │                │ conversation.send │                    │                   │              │
 │                │──────────────────>│                    │                   │              │
 │                │                   │ invoke('conv:send')│                   │              │
 │                │                   │───────────────────>│                   │              │
 │                │                   │                    │ getRecentMsgs(20) │              │
 │                │                   │                    │──────────────────────────────────>│
 │                │                   │                    │<───── messages ─────────────────│
 │                │                   │                    │                   │              │
 │                │                   │                    │ buildSystemPrompt │              │
 │                │                   │                    │──────────────────>│              │
 │                │                   │                    │<── systemPrompt ──│              │
 │                │                   │                    │                   │              │
 │                │                   │                    │ chat(message,     │              │
 │                │                   │                    │   systemPrompt)   │              │
 │                │                   │                    │──────────────────>│              │
 │                │                   │                    │                   │  POST DeepSeek│
 │                │                   │                    │                   │─────────────>│
 │                │                   │                    │                   │<── SSE ──────│
 │                │                   │                    │                   │              │
 │                │  conversation:chunk (逐 token)          │                   │              │
 │                │<───────────────────(webContents.send)───│<──onChunk(token)─│              │
 │  "逐字显示..."  │                   │                    │                   │              │
 │<───────────────│                   │                    │                   │              │
 │                │                   │                    │                   │              │
 │                │  conversation:done (fullText, intent,   │                   │              │
 │                │       taskPayload, switchTarget)        │                   │              │
 │                │<───────────────────(webContents.send)───│<──onDone(text)───│              │
 │                │                   │                    │                   │              │
 │       ┌─ intent=create_task:       │                    │                   │              │
 │       │   task:create ──────────────────────────────────>│                   │              │
 │       │                          │                    │── taskService.createFromAIResp()   │
 │       │                          │                    │──────────────────────────────────>│
 │       │                          │                    │<──── newTask ────────────────────│
 │       │  "任务已生成"             │                    │                   │              │
 │       │                          │                    │                   │              │
 │       └─ intent=switch_mode:      │                    │                   │              │
 │           app:switch-mode ──────────────────────────────>│                   │              │
 │                          │                    │── windowManager.switchMode(target)       │
 │ "已切换到壁纸/软件"   │                   │                    │                   │              │
 │<───────────────│                   │                    │                   │              │
```

### 5.2. 模式切换流程

```
用户          渲染进程(当前模式)     Preload              主进程(IPC)        WindowManager      Database
 │                │                   │                    │                   │              │
 │ 点击"壁纸模式" │                   │                    │                   │              │
 │───────────────>│                   │                    │                   │              │
 │                │ app.switchMode    │                    │                   │              │
 │                │ ('wallpaper')     │                    │                   │              │
 │                │──────────────────>│                    │                   │              │
 │                │                   │ invoke('app:       │                   │              │
 │                │                   │   switch-mode')    │                   │              │
 │                │                   │───────────────────>│                   │              │
 │                │                   │                    │ switchMode('wallpaper')            │
 │                │                   │                    │──────────────────>│              │
 │                │                   │                    │                   │              │
 │                │                   │                    │                   │              │
 │                │                   │                    │                   │  currentWindow │
 │                │                   │                    │                   │  .hide()      │
 │                │                   │                    │                   │              │
 │                │                   │                    │                   │  getOrCreate  │
 │                │                   │                    │                   │  ('wallpaper')│
 │                │                   │                    │                   │──┐           │
 │                │                   │                    │                   │  │ new       │
 │                │                   │                    │                   │  │ BW()      │
 │                │                   │                    │                   │<─┘           │
 │                │                   │                    │                   │              │
 │                │                   │                    │                   │  wallpaper   │
 │                │                   │                    │                   │  .show()     │
 │                │                   │                    │                   │              │
 │                │                   │                    │ updateAppState({currentMode})       │
 │                │                   │                    │──────────────────────────────────>│
 │                │                   │                    │                   │              │
 │                │                   │  mode:activated    │                   │              │
 │                │                   │  ('wallpaper')     │                   │              │
 │                │                   │<───────────────────│ (webContents.send)│              │
 │                │                   │                    │                   │              │
 │ 显示壁纸界面    │                   │                    │                   │              │
 │<───────────────│                   │                    │                   │              │
 │                │                   │                    │                   │              │
 │  (壁纸窗口渲染) │                   │                    │                   │              │
 │  load stores    │                   │                    │                   │              │
```

### 5.3. 任务完成结算流程

```
用户          渲染进程(软件模式)     Preload             主进程(IPC)         TaskService    NarrativeEngine  LLMService
 │                │                   │                    │                   │              │              │
 │ 点击"提交任务"  │                   │                    │                   │              │              │
 │───────────────>│                   │                    │                   │              │              │
 │                │ task.complete     │                    │                   │              │              │
 │                │──────────────────>│                    │                   │              │              │
 │                │                   │ invoke('task:      │                   │              │              │
 │                │                   │   complete')       │                   │              │              │
 │                │                   │───────────────────>│                   │              │              │
 │                │                   │                    │ completeTask(id)  │              │              │
 │                │                   │                    │──────────────────>│              │              │
 │                │                   │                    │                   │ 检查子任务    │              │
 │                │                   │                    │                   │ 全完成→       │              │
 │                │                   │                    │                   │ db.complete() │              │
 │                │                   │                    │                   │              │              │
 │                │                   │                    │<── { task, isFullyCompleted: true }─│              │
 │                │                   │                    │                   │              │              │
 │                │                   │                    │ [若 isFullyCompleted]              │              │
 │                │                   │                    │ generateFeedback(task, 'on_time')  │              │
 │                │                   │                    │─────────────────────────────────────>│              │
 │                │                   │                    │                   │              │  buildPrompt │
 │                │                   │                    │                   │              │─────────────>│
 │                │                   │                    │                   │              │<─ narrative ─│
 │                │                   │                    │<── { narrative } ──│              │              │
 │                │                   │                    │                   │              │              │
 │                │                   │                    │ [更新世界状态+关系]  │              │              │
 │                │                   │  返回结果           │                   │              │              │
 │                │                   │<───────────────────│                   │              │              │
 │                │<── { task, narrative } ─────────────────│                   │              │              │
 │                │                   │                    │                   │              │              │
 │ 展示结算动画+   │                   │                    │                   │              │              │
 │ 叙事文本        │                   │                    │                   │              │              │
 │<───────────────│                   │                    │                   │              │              │
```

### 5.4. 番茄钟流程

```
用户          渲染进程(壁纸模式)    Preload             主进程(IPC)         PomodoroService
 │                │                   │                    │                   │
 │ 点击"开始专注"  │                   │                    │                   │
 │───────────────>│                   │                    │                   │
 │                │ pomodoro.start    │                    │                   │
 │                │ (25)              │                    │                   │
 │                │──────────────────>│                    │                   │
 │                │                   │ invoke('pomodoro:  │                   │
 │                │                   │   start')          │                   │
 │                │                   │───────────────────>│                   │
 │                │                   │                    │ start(25, {...})  │
 │                │                   │                    │──────────────────>│
 │                │                   │                    │                   │ setInterval 1s
 │                │                   │                    │<── { sessionId }──│
 │                │                   │<── ok + sessionId ─│                   │
 │                │<── 确认启动 ──────│                    │                   │
 │                │                   │                    │                   │
 │ 显示倒计时      │                   │                    │                   │
 │ 25:00           │                   │                    │                   │
 │                │                   │                    │                   │
 │ (每秒)          │  pomodoro:tick    │                    │                   │
 │                │<───────────────────│<───────────────────│── onTick(1499)───│
 │ 更新显示 24:59  │                   │                    │                   │
 │                │                   │                    │                   │
 │  ... 循环 ...  │                   │                    │                   │
 │                │                   │                    │                   │
 │                │  pomodoro:end     │                    │                   │
 │                │<───────────────────│<───────────────────│── onEnd()────────│
 │ 显示"时间到！"  │                   │                    │                   │
 │ 角色询问        │                   │                    │                   │
```

---

## 6. 数据流

### 6.1. 状态归属

```
┌─────────────────────────────────────────────────────────────────┐
│                         Main Process (Source of Truth)          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│
│  │ AppState │  │  Tasks   │  │Character │  │  Relationships   ││
│  │          │  │          │  │          │  │                  ││
│  │ lowdb    │  │ lowdb    │  │ lowdb    │  │  lowdb           ││
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘│
│       │              │              │                  │         │
│  ┌────┴──────────────┴──────────────┴──────────────────┴───────┐ │
│  │                    IPC (ipcMain.handle / webContents.send)  │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                              │
                     IPC (contextBridge)
                              │
┌─────────────────────────────┴───────────────────────────────────┐
│                   Renderer Process (Read-only Cache)             │
│  ┌────────────────┐  ┌────────────┐  ┌──────────────────────┐   │
│  │ conversationStore│  │ taskStore  │  │ characterStore       │  │
│  │ (local cache)   │  │ (local cache)│  │ (local cache)       │  │
│  └────────────────┘  └────────────┘  └──────────────────────┘   │
│  ┌────────────────┐  ┌────────────┐                             │
│  │ appStore       │  │pomodoroStore│                            │
│  │ (local cache)  │  │ (local cache)│                           │
│  └────────────────┘  └────────────┘                             │
└──────────────────────────────────────────────────────────────────┘
```

### 6.2. 同步策略

- **单渲染进程时**：无同步问题，唯一活跃窗口持有所有 Store 数据
- **模式切换时**：新渲染进程启动 → Store 初始化 → 调用 `fetch*` 从主进程拉取最新数据
- **写操作**：渲染进程 → IPC → 主进程更新 lowdb → 返回确认 → Store 更新本地缓存
- **不自动广播**：由于模式互斥，同时只有一个渲染进程活跃，无需广播同步

### 6.3. 流式数据特有路径

对话流式数据不经过 Store → lowdb 的持久化路径，而是：

```
LLM Service → IPC (webContents.send) → Preload (ipcRenderer.on) → conversationStore (实时追加)
                                                                     │
                                                              流完成后一次性写入
                                                                     │
                                                              Database.addMessage()
```

流完成前消息不持久化。若用户中途切换模式或关闭窗口，未完成的流被中止，消息不保存。

---

## 7. 错误处理规范

### 7.1. 分层错误处理

```
渲染进程
  ├── IPC 调用异常 → 统一展示 Toast（角色化文案）
  ├── 组件内异常 → errorBoundary 捕获 → 显示降级 UI
  └── 流式异常 → 显示 "星辰通讯中断" 提示 + 保留已接收内容

主进程
  ├── IPC Handler 异常 → 返回 { ok: false, error: { ... } }
  ├── LLM 网络错误 → 重试 1 次 → 仍失败返回错误
  ├── lowdb 读写错误 → 记录日志 → 返回 INTERNAL 错误
  └── 未捕获异常 → process.on('uncaughtException') 记录并优雅降级
```

### 7.2. 角色化错误文案映射

| 错误场景 | 用户可见文案 |
|----------|------------|
| LLM 网络不通 | "星辰之间的通讯似乎被什么干扰了，稍等片刻再试试吧~" |
| API Key 未配置 | "旅者，你还没有设置与星辰通讯的密钥呢。请在 data/db.json 中配置 apiKey。" |
| LLM 超时 | "星辰的回应比平时慢了一些…要再试一次吗？" |
| 未知错误 | "啊…好像出了点小问题。要不要先做点别的？" |

---

## 8. 测试策略

### 8.1. 单元测试（vitest）

| 模块 | 测试内容 | Mock 依赖 |
|------|---------|-----------|
| database.js | 所有 CRUD 方法，默认值初始化 | 无（用临时文件） |
| task-service.js | 任务 CRUD + 结算逻辑 | Database（临时文件） |
| relationship-service.js | 阶段推进阈值边界 | Database（临时文件） |
| pomodoro-service.js | 计时器 tick/end/stop | vi.useFakeTimers() |
| llm-service.js | API 调用、重试、流式解析、Prompt 组装 | fetch, Database |
| narrative-engine.js | Prompt 构建、LLM 调用协调 | LLMService |
| ipc-handlers.js | 参数校验、服务调用路由、错误响应 | 所有注入服务 |
| IpcClient | action 调用参数、响应处理 | window.electronAPI |
| DOM 组件（JS 类） | 构造函数参数、DOM 渲染输出、事件回调 | 容器 DOM mock |

### 8.2. 集成测试

- 启动完整 Electron 应用 → 验证窗口创建和模式切换
- 真实 lowdb 文件读写流程
- Preload API 在真实 Electron 环境下的可用性

### 8.3. 原型阶段不覆盖

- E2E 测试（如 Spectron/Playwright Electron）
- 性能测试
- 安全渗透测试

---

## 9. 文件清单

```
src/
├── main/
│   ├── main.js                  # 入口：组装依赖、创建托盘、启动
│   ├── ipc-handlers.js          # IPC 路由注册
│   ├── database.js              # lowdb 封装
│   ├── llm-service.js           # DeepSeek API
│   ├── task-service.js          # 任务业务逻辑
│   ├── relationship-service.js  # 关系阶段计算
│   ├── pomodoro-service.js      # 番茄钟计时
│   ├── narrative-engine.js      # 叙事反馈生成
│   ├── proactive-trigger.js     # 主动交互（空壳）
│   ├── user-style-analyzer.js   # 用户风格分析（空壳）
│   └── window-manager.js        # 三窗口生命周期
├── renderer/
│   ├── pet/
│   │   └── index.html           # 桌宠模式（500×500 透明窗口）
│   ├── wallpaper/
│   │   └── index.html           # 壁纸模式（全屏覆盖）
│   ├── software/
│   │   └── index.html           # 软件模式（1280×800 窗口）
│   └── shared/
│       ├── ipc-client.js        # IPC 调用封装
│       ├── dom-utils.js         # DOM 操作工具函数
│       ├── state-manager.js     # 简易发布订阅状态管理
│       ├── character-renderer.js# 角色渲染器（SVG + 动画）
│       ├── conversation-panel.js# 对话面板组件
│       ├── task-panel.js        # 任务面板组件
│       ├── pomodoro-timer.js    # 番茄钟显示组件
│       └── styles/
│           ├── variables.css    # CSS 自定义属性
│           ├── animations.css   # 呼吸/眨眼/弹跳关键帧
│           └── base.css         # reset + 全局样式
└── preload.js
```
