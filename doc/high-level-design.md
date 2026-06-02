# 桌面 AI 陪伴应用 — 概要设计文档

## 1. 文档概述

### 1.1. 项目背景

桌面 AI 陪伴应用是一个 Windows 桌面应用，覆盖桌宠、壁纸、软件三种使用模式，共享同一角色、数据和对话引擎。技术栈为 Electron 42 + 纯 HTML/CSS/JS + lowdb 7 + DeepSeek API。

### 1.2. 设计目标

- 明确系统的模块划分、职责边界和依赖关系
- 定义模块间的通信方式（IPC 通道）
- 描述关键业务流程的数据流转
- 为详细设计和编码提供结构化的输入

### 1.3. 与提案文档的关系

本文档以 [技术提案 V1.0](./proposal.md) 为基础，对其中的架构设计章节进行重组和深化：提炼逻辑模块，显式定义模块接口和依赖，补充关键流程的时序描述。提案中的功能范围、数据模型、简化清单等内容不再重复。

---

## 2. 系统架构

### 2.1. 进程架构

```
┌──────────────────────────────────────────────────────────────┐
│                    Electron Main Process                     │
│                        (src/main/)                           │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │ 窗口管理  │ │ AI对话引擎│ │ 任务系统  │ │ 角色与关系模块 │  │
│  │ + 托盘    │ │          │ │ + 番茄钟  │ │ + 叙事引擎    │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────────────────┐ │
│  │ 数据层    │ │ 世界书    │ │ 主动交互 (原型为空壳)        │ │
│  └──────────┘ └──────────┘ └──────────────────────────────┘ │
│                         │ IPC                                 │
└─────────────────────────┼────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
   ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
   │ 桌宠渲染进程  │ │ 壁纸渲染进程 │ │ 软件渲染进程  │
   │ (纯 HTML/JS) │ │ (纯 HTML/JS) │ │ (纯 HTML/JS) │
   │ 500×500透明  │ │ 全屏半透明   │ │ 独立窗口     │
   │ 角色偏右120  │ │             │ │ 1280×800    │
   │ 左侧对话框   │ │             │ │             │
   │ 右侧菜单/气泡│ │             │ │             │
   └─────────────┘ └─────────────┘ └─────────────┘
          │               │               │
          └───────────────┼───────────────┘
                          │
          ┌───────────────▼───────────────┐
          │     共享 JS 模块 + CSS       │
          │     (src/renderer/shared/)    │
          └───────────────────────────────┘
```

三种模式各为一个独立的 BrowserWindow + 纯 HTML/CSS/JS 应用，通过主进程 IPC 共享状态。渲染进程之间不直接通信，所有共享状态经由主进程中转。桌宠模式采用 500×500 透明大窗口，角色 120×120 偏右放置；对话面板左侧浮出，右键菜单右侧弹出，主动气泡从角色头顶浮现；透明区域默认 `pointer-events: none`（仅角色区域可交互），浮层打开时通过 `.interactive` CSS class 切换为全窗口可交互。

### 2.2. 技术栈

| 层 | 技术 | 说明 |
|----|------|------|
| 桌面框架 | Electron 42 | 窗口管理、系统托盘、IPC |
| 主进程语言 | CommonJS (.js) | Electron 原生模块系统 |
| 渲染进程框架 | 纯 HTML/CSS/JS | 无前端框架，轻量级，单文件页面 |
| AI 服务 | DeepSeek API | OpenAI 兼容格式，流式输出 |
| 数据存储 | lowdb 7 | 本地 JSON 文件数据库 |
| 状态管理 | state-manager.js | 发布订阅模式，共享 JS 模块 |
| 类型检查 | TypeScript (tsc) | 仅类型检查，不编译 |

---

## 3. 模块划分

系统共划分为 **11 个逻辑模块**，其中 7 个位于主进程，3 个位于渲染进程，1 个为共享层。

### 3.1. 主进程模块

#### 3.1.1. 窗口管理模块 (Window Manager)

| 项目 | 内容 |
|------|------|
| **所属进程** | 主进程 |
| **核心文件** | `src/main/window-manager.js`, `src/main/main.js`（托盘部分） |
| **职责** | 三窗口（桌宠/壁纸/软件）的创建、显示、隐藏、关闭；窗口属性配置（透明无边框、置顶、全屏）；模式切换时窗口的显隐协调；系统托盘图标与右键菜单 |

**依赖**: 无（最底层模块）

**对外接口（内部调用）**:
- `getOrCreateWindow(mode)` — 创建或返回缓存的 BrowserWindow
- `switchMode(targetMode)` — 协调三窗口显隐
- `getCurrentMode()` — 返回当前活跃模式
- `getCurrentWindow()` — 返回当前活跃窗口
- `getWindow(mode)` — 获取指定模式窗口（不创建）
- `closeAll()` — 销毁所有窗口

---

#### 3.1.2. 数据层模块 (Data Layer)

| 项目 | 内容 |
|------|------|
| **所属进程** | 主进程 |
| **核心文件** | `src/main/database.js` |
| **职责** | lowdb 读写封装；数据模型的 CRUD 操作；应用启动时的数据初始化与迁移；提供统一的数据访问入口 |

**管理的数据实体**:
- `appState` — 应用全局状态（当前模式、窗口位置、壁纸设置等）
- `tasks` — 任务列表（含子任务）
- `character` — 角色当前状态（心情、表情）
- `relationship` — 用户与角色的关系数据
- `worldState` — 世界状态变量
- `conversations` — 对话历史

**依赖**: 无

**对外接口（内部调用）**:
- `db.getAppState()` / `db.setAppState(partial)`
- `db.getTasks()` / `db.addTask(task)` / `db.updateTask(id, partial)` / `db.deleteTask(id)`
- `db.getCharacter()` / `db.updateCharacter(partial)`
- `db.getRelationship()` / `db.updateRelationship(partial)`
- `db.getWorldState()` / `db.updateWorldState(partial)`
- `db.getConversations()` / `db.addConversation(conv)` / `db.addMessage(convId, msg)`

---

#### 3.1.3. 世界书模块 (Worldbook Loader)

| 项目 | 内容 |
|------|------|
| **所属进程** | 主进程 |
| **核心文件** | 原型阶段世界书 JSON 由 `main.js` 使用 `fs.readFileSync` 直接加载并注入到 `llm-service`；后续可抽取为独立 `worldbook.js` 模块 |
| **职责** | 加载和解析 `assets/worldbooks/default.json`；提供角色设定、章节信息、世界规则、关系阈值配置的结构化读取 |

**依赖**: 无（仅依赖文件系统）

**对外接口（内部调用）**（后续抽取为独立模块时）:
- `loadWorldbook(path?)` → 完整世界书对象
- `getCharacterConfig()` → 角色设定
- `getCurrentChapter()` → 当前章节信息
- `getRelationshipThresholds()` → 关系阶段阈值
- `getProactiveConfig()` → 主动交互配置

---

#### 3.1.4. AI 对话引擎模块 (LLM Engine)

| 项目 | 内容 |
|------|------|
| **所属进程** | 主进程 |
| **核心文件** | `src/main/llm-service.js` |
| **职责** | DeepSeek API 适配（OpenAI 兼容格式）；System Prompt 组装（注入角色设定、世界背景、关系阶段、用户风格）；对话历史管理（最近 20 条上下文窗口）；流式输出（SSE 解析，逐块推送渲染进程）；意图解析（解析 AI 返回的结构化 JSON，识别 `create_task` 任务转化意图和 `switch_mode` 模式切换意图） |

**依赖**: 数据层（读取角色/历史/世界状态）、世界书模块（读取角色设定和世界规则）

**对外接口（内部调用）**:
- `chat(sessionId, characterId, message, context)` → 流式 Response
- `buildSystemPrompt(character, world, relStage, userStyle)` → string
- `parseIntentsFromResponse(content)` → `{ intent: 'create_task'|'switch_mode'|null, taskPayload?: object, switchTarget?: string }`（解析 AI 结构化输出中的意图）

---

#### 3.1.5. 任务系统模块 (Task System)

| 项目 | 内容 |
|------|------|
| **所属进程** | 主进程 |
| **核心文件** | `src/main/task-service.js`（提案中未显式列出，逻辑从 ipc-handlers 拆分） |
| **职责** | 任务 CRUD 操作；任务状态流转（active → completed）；子任务管理（增/删/勾选）；任务逾期检测；完成结算触发（调用叙事引擎）；番茄钟关联（关联番茄钟会话到任务） |

**依赖**: 数据层、叙事引擎（结算时调用）

**对外接口（内部调用）**:
- `createTask(taskData)` → Task
- `updateTask(id, partial)` → Task
- `completeTask(id)` → Task（含结算叙事结果 + 里程碑进度更新：任务完成后为对应 milestone.progress += 1，若 milestone 全部完成则推进章节）
- `toggleSubtask(taskId, subtaskId)` → Task
- `getActiveTasks()` → Task[]
- `checkOverdue()` → Task[]（检查逾期任务）

---

#### 3.1.6. 番茄钟模块 (Pomodoro Service)

| 项目 | 内容 |
|------|------|
| **所属进程** | 主进程 |
| **核心文件** | `src/main/pomodoro-service.js` |
| **职责** | 番茄钟倒计时管理（启动/停止/暂停）；定时 tick 推送（每秒更新剩余时间）；时间到回调通知；原型阶段支持手动确认延长（渲染进程重新调用 start），预留自动循环接口 |

**依赖**: 无（独立定时器，使用 `setInterval`）

**对外接口（内部调用）**:
- `start(duration, taskId)` → sessionId
- `stop(sessionId)`
- `pause(sessionId)`
- `getRemaining(sessionId)` → seconds
- `onTick(callback)` — 每秒回调
- `onEnd(callback)` — 时间到回调

**预留扩展接口**:
- `extend(sessionId, minutes)` — 延长
- `setAutoCycle(enabled)` — 自动循环

---

#### 3.1.7. 角色与关系模块 (Character & Relationship)

| 项目 | 内容 |
|------|------|
| **所属进程** | 主进程 |
| **核心文件** | `src/main/relationship-service.js`, `src/main/narrative-engine.js` |
| **职责** | **关系服务**：根据任务完成数、番茄钟累计数、连续互动天数计算关系阶段；记录最后互动时间；**叙事引擎**：任务结算时生成叙事反馈文本（调用 LLM）；更新世界状态变量；判定章节推进条件；原型阶段仅处理 `on_time` 完成路径 |

**依赖**: 数据层、世界书模块（读取阈值配置）、AI 对话引擎（生成叙事文本）

**对外接口（内部调用）**:
- `getRelationshipStage()` → stage
- `recordInteraction()` — 更新最后互动时间
- `checkStageUpgrade()` → newStage | null
- `generateSettlementNarrative(task)` → narrative（调用 LLM）
- `updateWorldState(variable, value)`

---

### 3.2. 渲染进程模块

#### 3.2.1. 共享 UI 组件模块 (Shared Components)

| 项目 | 内容 |
|------|------|
| **所属进程** | 渲染进程（被三个模式共用） |
| **核心文件** | `src/renderer/shared/*.js`, `src/renderer/shared/styles/*.css` |
| **职责** | 提供跨模式复用的纯 JS 模块和 CSS 样式 |

**共享 JS 模块清单**:

| 模块 | 文件 | 功能 |
|------|------|------|
| IpcClient | `ipc-client.js` | IPC 调用封装，统一错误处理 |
| CharacterRenderer | `character-renderer.js` | 角色渲染器，支持 `css`/`image`/`live2d` 三种模式切换 |
| ConversationPanel | `conversation-panel.js` | 对话面板组件，含消息列表+输入框+流式显示 |
| TaskPanel | `task-panel.js` | 任务面板组件，支持紧凑模式和子任务勾选 |
| PomodoroTimer | `pomodoro-timer.js` | 番茄钟圆形进度环 + 倒计时显示 |
| state-manager | `state-manager.js` | 简易发布订阅状态管理 |
| dom-utils | `dom-utils.js` | DOM 操作工具函数 |

---

#### 3.2.2. 桌宠模式模块 (Pet Mode UI)

| 项目 | 内容 |
|------|------|
| **所属进程** | 渲染进程 |
| **核心文件** | `src/renderer/pet/index.html` |
| **职责** | 500×500 透明无边框窗口，角色 120×120 偏右放置（x:240, y:20），始终置顶；左键点击角色在左侧弹出对话面板（纯闲聊，240×400）；右键点击角色在右侧弹出功能菜单（min-width:130px，含发布任务/切换模式/查看任务/隐藏）；主动气泡从角色头顶浮现，数秒后自动消失，点击可展开对话面板；迷你任务面板与对话面板互斥（均在左侧）；对话中识别用户模式切换意图，主动询问确认后切换 |

**依赖**: 共享 JS 模块（IpcClient, CharacterRenderer, ConversationPanel, TaskPanel, state-manager）

---

#### 3.2.3. 壁纸模式模块 (Wallpaper Mode UI)

| 项目 | 内容 |
|------|------|
| **所属进程** | 渲染进程 |
| **核心文件** | `src/renderer/wallpaper/index.html` |
| **职责** | 全屏半透明覆盖层；大尺寸角色陪伴展示；番茄钟 UI（时间显示、启动/停止按钮）；白噪音控制面板（切换音效、调音量）；侧边对话栏（点击角色滑入）；低打扰进度条（P2 优先级）；退出按钮（触发任务进度询问：完成→勾选子任务/未完成→询问延长时间→同意重启番茄钟/拒绝记录进度→返回桌宠） |

**依赖**: 共享 JS 模块（IpcClient, CharacterRenderer, ConversationPanel, PomodoroTimer）

---

#### 3.2.4. 软件模式模块 (Software Mode UI)

| 项目 | 内容 |
|------|------|
| **所属进程** | 渲染进程 |
| **核心文件** | `src/renderer/software/index.html` |
| **职责** | RPG 风格主界面（左侧导航 + 内容区 + 右侧角色区）；任务面板（列表/详情/子任务勾选）；任务结算展示（叙事文本 + 状态变化）；世界地图（原型阶段为静态图 + 文字标注）；角色档案（背景故事 + 记忆时间线）；底部对话面板 |

**依赖**: 共享 JS 模块（IpcClient, CharacterRenderer, ConversationPanel, TaskPanel, PomodoroTimer）

---

### 3.3. 主动交互模块 (Proactive Trigger) — 原型空壳

| 项目 | 内容 |
|------|------|
| **所属进程** | 主进程 |
| **核心文件** | `src/main/proactive-trigger.js` |
| **原型状态** | 空壳实现，返回空结果。仅预留类结构和 IPC 通道 |
| **完整版职责** | 4 种触发源调度（定时随机、任务截止提醒、空闲检测、任务追问）；勿扰时段管理；触发时 IPC 通知桌宠窗口 |

**依赖**（完整版）: 数据层、窗口管理

---

## 4. 模块关系

### 4.1. 模块依赖图

```
                        ┌─────────────────┐
                        │   世界书模块      │
                        │  (worldbook)    │
                        └────────┬────────┘
                                 │ 读取配置
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
   ┌──────▼──────┐     ┌────────▼────────┐    ┌────────▼────────┐
   │ AI对话引擎   │     │  角色与关系模块   │    │   任务系统模块    │
   │ (llm-svc)  │     │ (rel+narrative) │    │  (task-svc)     │
   └──────┬──────┘     └────────┬────────┘    └────────┬────────┘
          │                     │                      │
          │           ┌─────────┼──────────┐           │
          │           │         │          │           │
          └───────────┼─────────┼──────────┼───────────┘
                      │         │          │
               ┌──────▼─────────▼──────────▼──────┐
               │            数据层 (database)       │
               └──────────────────────────────────┘

          ┌──────────────────────────────────────┐
          │          窗口管理 + 托盘               │
          │        (window-manager)              │
          └──────────────────────────────────────┘
                         │ IPC
          ┌──────────────┼──────────────┐
          │              │              │
   ┌──────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
   │ 桌宠模式 UI  │ │ 壁纸模式 UI │ │ 软件模式 UI │
   └──────┬──────┘ └─────┬──────┘ └─────┬──────┘
          │              │              │
          └──────────────┼──────────────┘
                         │
          ┌──────────────▼──────────────┐
          │     共享 JS 模块 + CSS       │
          └─────────────────────────────┘

          ┌──────────────────────────────┐
          │  主动交互 (原型空壳，虚线依赖)  │
          └──────────────────────────────┘
```

**关键依赖原则**:
- 主进程模块间通过直接函数调用（同进程内），不经过 IPC
- 渲染进程不直接访问数据层，所有数据通过 IPC 请求主进程
- 渲染进程之间不直接通信
- 窗口管理模块是最底层，不依赖任何业务模块

### 4.2. 模块间通信方式

| 通信场景 | 方式 | 说明 |
|----------|------|------|
| 主进程模块间 | 直接函数调用 | 同进程内，通过模块导出/导入 |
| 渲染进程 → 主进程 | IPC invoke (renderer → main) | preload 暴露的 `window.electronAPI` |
| 主进程 → 渲染进程 | IPC send (main → renderer) | 推送事件（流式文本、番茄钟tick、主动交互触发） |
| 渲染进程 ↔ 渲染进程 | 不直接通信 | 通过主进程中转 |
| 主进程 → 所有渲染进程 | IPC broadcast | 状态变更广播（如任务完成 → 三窗口都更新） |

---

## 5. IPC 通信设计

### 5.1. 对话域

| IPC 通道 | 方向 | 用途 |
|----------|------|------|
| `conversation:send` | 渲染 → 主 | 发送用户消息，触发 AI 对话（流式） |
| `conversation:chunk` | 主 → 渲染 | 流式响应文本块推送 |
| `conversation:done` | 主 → 渲染 | 流式响应完成通知（含 intent 解析结果） |
| `conversation:error` | 主 → 渲染 | 流式响应出错通知 |
| `conversation:get-history` | 渲染 → 主 | 获取指定对话的历史消息 |
| `conversation:abort` | 渲染 → 主 | 中止当前流式对话 |

### 5.2. 任务域

| IPC 通道 | 方向 | 用途 |
|----------|------|------|
| `task:create` | 渲染 → 主 | 创建任务（含 AI 转化的结构化数据） |
| `task:update` | 渲染 → 主 | 更新任务信息 |
| `task:delete` | 渲染 → 主 | 删除任务 |
| `task:get-all` | 渲染 → 主 | 获取任务列表（支持状态筛选） |
| `task:get-by-id` | 渲染 → 主 | 获取单个任务详情 |
| `task:toggle-subtask` | 渲染 → 主 | 切换子任务完成状态 |
| `task:complete` | 渲染 → 主 | 完成任务（触发结算叙事 + 里程碑推进） |
| `task:updated` | 主 → 渲染 | 任务变更广播（所有渲染进程） |
| `task:get-pending-followups` | 渲染 → 主 | [预留] 获取待追问任务列表 |
| `task:submit-followup` | 渲染 → 主 | [预留] 提交追问回答 |

### 5.3. 番茄钟域

| IPC 通道 | 方向 | 用途 |
|----------|------|------|
| `pomodoro:start` | 渲染 → 主 | 启动番茄钟（含任务 ID 和时长） |
| `pomodoro:stop` | 渲染 → 主 | 停止番茄钟 |
| `pomodoro:get-status` | 渲染 → 主 | 获取当前番茄钟状态（剩余时间、是否运行、关联 taskId） |
| `pomodoro:tick` | 主 → 渲染 | 每秒推送剩余秒数 |
| `pomodoro:end` | 主 → 渲染 | 番茄钟时间到通知 |
| `pomodoro:extend` | 渲染 → 主 | [预留] 延长当前番茄钟 |
| `pomodoro:setAutoCycle` | 渲染 → 主 | [预留] 设置自动循环开关 |
| `pomodoro:getStats` | 渲染 → 主 | [预留] 查询专注统计 |

### 5.4. 角色与关系域

| IPC 通道 | 方向 | 用途 |
|----------|------|------|
| `app:get-character` | 渲染 → 主 | 获取角色信息 |
| `app:get-relationship` | 渲染 → 主 | 获取关系阶段和统计数据 |
| `character:updated` | 主 → 渲染 | 角色状态变更广播 |
| `relationship:updated` | 主 → 渲染 | 关系阶段变更广播 |

### 5.5. 世界状态域

> 世界状态（`worldState`）包含在 `app:get-state` 返回的 AppState 中，无独立获取通道。以下为状态变更广播通道。

| IPC 通道 | 方向 | 用途 |
|----------|------|------|
| `world:state-updated` | 主 → 渲染 | 世界状态变更广播（章节推进、世界变量变化等） |

### 5.6. 窗口与设置域

| IPC 通道 | 方向 | 用途 |
|----------|------|------|
| `app:switch-mode` | 渲染 → 主 | 切换显示模式（pet/wallpaper/software） |
| `mode:activated` | 主 → 渲染 | 模式切换完成通知（目标渲染进程收到后拉取最新数据） |
| `app:get-state` | 渲染 → 主 | 获取应用全局状态（AppState） |
| `settings:get-api-key` | 渲染 → 主 | 获取 API Key |
| `settings:set-api-key` | 渲染 → 主 | 设置 API Key |
| `settings:get-wallpaper` | 渲染 → 主 | 获取壁纸设置 |
| `settings:update-wallpaper` | 渲染 → 主 | 更新壁纸设置 |
| `settings:updateQuietHours` | 渲染 → 主 | [预留] 更新勿扰时段 |
| `window:hide` | 渲染 → 主 | 最小化当前窗口到托盘 |
| `window:close-mode` | 渲染 → 主 | 关闭当前模式窗口，返回桌宠模式 |

### 5.7. 主动交互域（原型仅预留通道）

| IPC 通道 | 方向 | 用途 |
|----------|------|------|
| `proactive:trigger` | 主 → 渲染 | 主动交互触发通知（角色发起对话） |
| `user-style:get` | 渲染 → 主 | [预留] 获取当前用户风格向量 |
| `user-style:analyze` | 渲染 → 主 | [预留] 触发用户风格分析 |

### 5.8. 白噪音域

| IPC 通道 | 方向 | 用途 |
|----------|------|------|
| `audio:play` | 渲染 → 主 | 播放指定白噪音 |
| `audio:stop` | 渲染 → 主 | 停止白噪音 |
| `audio:setVolume` | 渲染 → 主 | 设置音量 |

> 注：白噪音播放可由主进程或渲染进程实现。若音频文件较小，可在渲染进程直接用 Web Audio API 播放，无需经过主进程。此处预留 IPC 通道以便后续调整。

### 5.9. 窗口交互域（桌宠模式专用）

桌宠模式 500×500 透明窗口的交互控制使用**纯 CSS 方案**，无需 IPC 通道，主进程不参与：

- `body` 默认 `pointer-events: none` — 透明区域不接收鼠标事件
- 角色区域（120×120）`pointer-events: auto` — 始终可交互
- 任一浮层（对话面板/右键菜单/主动气泡/任务面板）打开时 → 渲染进程给 `body` 添加 `.interactive` class → `pointer-events: auto` → 全窗口可交互
- 所有浮层关闭时 → 移除 `.interactive` class → 恢复默认
- 角色区域 CSS `-webkit-app-region: drag` 支持窗口拖动（内部可点击元素用 `-webkit-app-region: no-drag` 覆盖）
- 原型阶段接受 500×500 窗口不穿透桌面（`alwaysOnTop: true` 下桌面图标本就在下层）

---

## 6. 关键流程

### 6.1. AI 对话流程

```
用户（渲染进程）                主进程                    DeepSeek API
      │                         │                          │
      │── conversation:send ───►│                          │
      │   (message, sessionId)  │                          │
      │                         │── db.getCharacter()      │
      │                         │── db.getRecentMsgs()     │
      │                         │── worldbook.getConfig()  │
      │                         │── buildSystemPrompt()    │
      │                         │                          │
      │                         │── POST /v1/chat/comp ──►│
      │                         │   (stream: true)         │
      │                         │                          │
      │                         │◄── SSE data chunks ──────│
      │                         │                          │
      │◄── conversation:chunk ──│                          │
      │   (delta text)          │                          │
      │      ... (循环)          │                          │
      │                         │                          │
      │◄── conversation:done ───│                          │
      │   (fullMessage,         │                          │
      │    parsedIntent | null) │                          │
      │                         │                          │
      │  若 intent='create_task':│                          │
      │── task:create ─────────►│                          │
      │                         │── db.addTask()           │
      │◄── task:updated ────────│ (broadcast 三窗口)        │
      │                         │                          │
      │  若 intent='switch_mode':│                         │
      │── app:switch-mode ─────►│                          │
      │                         │── windowManager.switch() │
      │◄── mode:activated ──────│                          │
```

**关键点**:
- 流式输出通过多次 `chat:stream-chunk` 推送，渲染进程实时更新 UI
- 消息完成后解析 AI 返回的 JSON，根据 `intent` 字段分发：
  - `intent: "create_task"` → 仅右键"发布任务"流程中触发，自动创建任务；左键闲聊中不注入任务转化指令
  - `intent: "switch_mode"` → 自动切换到目标模式（仅在用户已明确同意时才会返回）
- 解析失败时回退为纯文本，不阻塞对话

### 6.2. 任务创建与转化流程

```
用户表达待办 → AI 识别意图 → 返回结构化 JSON → 主进程解析 → 存入 lowdb → 广播更新
```

**AI 解析容错**:
1. 尝试 `JSON.parse` 完整响应
2. 若失败，正则匹配 `{...}` 块再解析
3. 若仍失败，回退为纯文本消息，不创建任务

### 6.3. 模式切换流程

模式切换有两种入口：**手动切换**（右键菜单/按钮）和**智能切换**（对话中 AI 识别意图）。

#### 手动切换

```
用户（右键菜单/按钮）
      │
      │── app:switch-mode ──────► 主进程
      │    (targetMode)          │
      │                          │── windowManager.switchMode(targetMode)
      │                          │   ├─ 隐藏当前窗口
      │                          │   ├─ 创建/显示目标窗口
      │                          │   └─ 更新 db.appState.currentMode
      │                          │
      │◄── mode:activated ───────│ (通知目标渲染进程)
      │    (newMode)             │
      │                          │
      │  渲染进程通过 IPC 拉取数据  │
      │  useAppStore.mode        │
```

#### 智能切换（对话意图识别）

```
用户在桌宠模式闲聊
      │ "想开始专注了"
      │── conversation:send ─────► 主进程
      │                          │── LLM 识别 mode_switch 意图
      │                          │   (System Prompt 注入模式切换指令)
      │                          │
      │◄── conversation:chunk ───│ "旅者，要我展开星幕陪你专注吗？"
      │    (角色询问确认)         │
      │                          │
      │ "好的"                    │
      │── conversation:send ─────► 主进程
      │                          │── LLM 返回 intent: "switch_mode"
      │                          │   {"intent":"switch_mode","mode":"wallpaper"}
      │                          │
      │                          │── windowManager.switchMode("wallpaper")
      │◄── 壁纸模式激活            │
```

> **关键规则**：AI 必须在用户明确同意后才能返回切换 JSON。角色的询问确认和实际切换分两轮对话完成。

**窗口显隐规则**:

| 切换目标 | 桌宠窗口 | 壁纸窗口 | 软件窗口 |
|----------|:--------:|:--------:|:--------:|
| pet | 显示 | 隐藏 | 隐藏 |
| wallpaper | 隐藏 | 显示 | 隐藏 |
| software | 隐藏 | 隐藏 | 显示 |

> 桌宠转壁纸/软件时，桌宠窗口隐藏而非关闭，以便快速切回。

### 6.4. 任务结算流程

```
用户（软件模式）
      │
      │── task:complete ────────► 主进程
      │    (taskId)              │
      │                          │── db.updateTask(taskId, {status:"completed"})
      │                          │── relation.recordInteraction()
      │                          │── relation.checkStageUpgrade()
      │                          │── narrative.generateFeedback(task)
      │                          │   └─ 调用 LLM 生成叙事文本
      │                          │── narrative.updateWorldState()
      │                          │── 检查当前章节 milestones：
      │                          │   若任务关联 milestone → progress+1
      │                          │   若 milestone.progress >= required → 标记完成
      │                          │   若全部 milestones 完成 → currentChapter+1
      │                          │
      │◄── task:updated ─────────│ (broadcast)
      │◄── relationship:updated ─│ (若阶段变化)
      │◄── world:state-updated ──│ (若世界变量/章节变化)
      │                          │
      │  软件模式展示结算动画     │
      │  - 叙事文本逐字显示       │
      │  - 世界状态变化提示       │
      │  - 关系阶段升级提示       │
```

### 6.5. 番茄钟流程

```
用户（壁纸模式）
      │
      │── pomodoro:start ───────► 主进程
      │    (duration, taskId)    │
      │                          │── pomodoroSvc.start()
      │                          │── setInterval(tick, 1000)
      │                          │
      │◄── pomodoro:tick ────────│ (每秒推送)
      │    (remainingSeconds)    │
      │      ... (循环直到 0)
      │                          │
      │◄── pomodoro:end ─────────│
      │                          │
      │  壁纸模式:                │
      │  显示时间到弹窗           │
      │  角色："专注时间结束了，  │
      │  旅者完成了目标吗？"     │
      │                          │
      │  ┌─ [完成了] → 勾选子任务 → 结算叙事 → 返回桌宠
      │  │
      │  └─ [还没] → "要再延25分钟吗？"
      │        ├─ [是] → 重启番茄钟 → 继续专注（回到循环起点）
      │        └─ [否] → 记录进度 → 返回桌宠
```

---

## 7. 扩展接口汇总

以下扩展点在本文档相关模块中已预留接口，详细定义见[技术提案 4.4 节](./proposal.md#44-简化清单与扩展接口)：

| 编号 | 扩展点 | 所属模块 | 扩展方式 |
|------|--------|----------|----------|
| 1 | 角色渲染（图标 → Live2D） | 共享 UI 组件 | `CharacterRenderer` 组件 `modelType` 属性切换 |
| 2 | 主动交互（手动 → 4 种触发源） | 主动交互模块 | `ProactiveTrigger` 类 `registerSource()` 注册检查器 |
| 3 | 任务后续追问 | 任务系统 | Task 数据模型已预留 `followUp*` 字段 + IPC 通道 |
| 4 | 番茄钟循环（手动确认延长 → 自动循环开关） | 番茄钟模块 | `PomodoroService.setAutoCycle()` 方法已预留 |
| 5 | 世界地图（静态 → 交互式） | 软件模式 UI | `WorldMap` 组件数据驱动 props |
| 6 | 用户风格学习 | AI 对话引擎 | `UserStyleAnalyzer` 独立模块 + 预留 IPC |
| 7 | 关系阶段阈值（硬编码 → 配置化） | 角色与关系 | 世界书 JSON 已预留 `relationshipsStageThresholds` |
| 8 | 逾期叙事（简单提及 → 四级引擎） | 角色与关系 | `NarrativeEngine` 扩展 `completionType` 枚举 |

---

## 8. 风险与约束

### 8.1. 设计约束

| 约束项 | 说明 |
|--------|------|
| 单角色 | 原型仅支持一个角色（露娜·月语），多角色需架构层重新设计 |
| 纯本地 | 无在线同步、无多设备支持，所有数据存本地 JSON |
| 无语音 | 仅文本交互，不含语音输入/输出 |
| 流式依赖 | 对话体验强依赖 DeepSeek API 流式输出的稳定性 |
| 无商店/礼物/CG | MVP 不包含礼物系统、商店系统、CG 解锁、显式好感度数值，关系深化通过叙事自然体现 |
| 无社交 | 无好友、排行榜、社区等功能 |
| 无世界编辑器 | 世界书通过 JSON 文件手动编辑，不开放用户自定义编辑器 |

### 8.2. 关键风险

| 风险 | 缓解措施 |
|------|----------|
| 透明窗口鼠标穿透 | 纯 CSS `pointer-events` 方案（原型阶段接受不穿透桌面） |
| 三窗口状态同步延迟 | IPC broadcast，每个渲染进程启动时从主进程拉取最新状态 |
| 流式格式兼容性 | 标准 OpenAI SSE 格式，切换 endpoint 仅改 URL |
| LLM 任务解析不稳定 | 多层容错：JSON.parse → 正则提取 → 纯文本回退 |

---

*本文档基于技术提案 V1.0 生成，与提案保持一致。如有冲突，以本文档的模块划分为准。*
