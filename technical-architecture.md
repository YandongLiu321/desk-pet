# Desk Pet 技术路径说明

> 用于项目汇报参考 | 版本 1.0.0 | 2026-06-13

---

## 一、技术概览

| 维度 | 选型 | 选型理由 |
|------|------|---------|
| 应用框架 | **Electron 42** | 跨桌面平台，Web 技术栈构建 UI，Node.js 访问系统能力 |
| 语言 | **JavaScript (CommonJS)** | 与 Electron 生态无缝衔接，无需编译步骤 |
| 类型检查 | **TypeScript 6 (JSDoc)** | 仅类型检查不编译，兼顾类型安全与零构建开销 |
| 3D 渲染 | **WebGL 2.0 + Live2D Cubism SDK** | 硬件加速角色渲染，Live2D 是二次元角色动画的行业标准 |
| AI 对话 | **DeepSeek API (deepseek-chat)** | 中文能力强，API 兼容 OpenAI 格式，性价比高 |
| 数据持久化 | **JSON 文件 (lowdb 模式)** | 单文件数据库，无需安装数据库服务，适合桌面应用 |
| 测试 | **Vitest** | 与 Vite 生态一致，速度快，原生 ESM 支持 |
| 代码规范 | **Biome** | 统一格式化+检查，替代 ESLint + Prettier |
| 打包 | **esbuild** | Live2D 渲染器打包为 IIFE bundle |

---

## 二、架构总览

```
┌─────────────────────────────────────────────────────────────────┐
│                        Electron Main Process                     │
│                         (src/main/)                              │
│                                                                  │
│  ┌──────────┐  ┌─────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │ Window   │  │ LLMService  │  │ TaskService  │  │ Database │ │
│  │ Manager  │  │ (DeepSeek)  │  │ +Classifier  │  │ (JSON)   │ │
│  └────┬─────┘  └──────┬──────┘  └──────┬───────┘  └────┬─────┘ │
│       │               │               │               │        │
│  ┌────┴───────────────┴───────────────┴───────────────┴─────┐  │
│  │                    IPC Handlers                           │  │
│  │   (conversation / task / pomodoro / settings / memory)    │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                           │                                     │
│  ┌────────────────────────┴─────────────────────────────────┐  │
│  │  ProactiveService │ Relationship │ Narrative │ Memory    │  │
│  │  (idle trigger)   │ Service      │ Engine    │ Service   │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ IPC (contextBridge)
                           │  preload.js
┌──────────────────────────┴──────────────────────────────────────┐
│                     Electron Renderer Process                    │
│                        (src/renderer/)                           │
│                                                                  │
│  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Pet Mode │  │ Software  │  │Wallpaper │  │Settings      │  │
│  │ (桌宠)   │  │ Mode(房间)│  │ Mode     │  │(柚子日记)    │  │
│  │ 500×500  │  │ 1280×800  │  │ Fullscr  │  │ 800×600      │  │
│  └────┬─────┘  └─────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│       │              │             │               │           │
│  ┌────┴──────────────┴─────────────┴───────────────┴────────┐  │
│  │                   Shared Components                       │  │
│  │  ConversationPanel │ TaskPanel │ PomodoroTimer │ Theme   │  │
│  │  CharacterRenderer │ WebGL Pipeline │ WhiteNoise        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 三、进程模型与通信

### 3.1 进程分工

```
Main Process (1个)          Renderer Process (N个)
══════════════════          ══════════════════════
- 应用生命周期               - UI 渲染
- 窗口创建/管理              - 用户交互
- 系统托盘                   - Live2D 角色动画
- 文件系统 I/O              - WebGL 场景渲染
- LLM API 调用              - CSS 样式/动画
- 后台定时任务              - 仅通过 IPC 与主进程通信
```

### 3.2 IPC 通信架构

```
Renderer          preload.js         Main Process
────────          ──────────         ────────────
                   contextBridge
ipc-client.js  →  .exposeInMain  →  ipcMain.handle()
(调用封装)       World()           (处理逻辑)
                 安全白名单
                 
通信模式：
- invoke/handle：请求-响应（所有数据操作）
- send/on：     单向推送（番茄钟 tick、Proactive trigger）
```

所有 IPC 通道集中在 `src/shared/constants.js` 定义，共约 50 个通道，按功能域分组：

```
Conversation (5):  send / chunk / done / error / abort
Task (9):          CRUD + toggle + complete + progress + mode
Pomodoro (3):      start / stop / status + tick/end events
Settings (7):      get/set API key, wallpaper, audio, full CRUD
Memory (4):        list / search / delete / clear
Editor (3):        open / apply / updateProperty
App/Mode (4):      switch / state / character / relationship
Window (3):        hide / closeMode / moveBy
Proactive (2):     state / config + trigger event
Wallpaper (2):     load / list Wallpaper Engine assets
Scene (2):         get / save
```

### 3.3 数据流示意 — 用户发消息

```
用户输入文字
  → ConversationPanel (renderer)
  → ipc-client.sendMessage(text)
  → preload.js → ipcRenderer.invoke("conversation:send")
  → ipc-handlers.js → llmService.chat()
  → DeepSeek API (stream)
  → chunk callback → win.webContents.send("conversation:chunk")
  → preload.js → ipcRenderer.on → ipc-client.onChunk
  → ConversationPanel.appendToLastMessage() → 打字机效果渲染
  → done callback → 解析 intent (create_task / switch_mode)
  → 按需调用 taskService.createTask() 或 switchMode()
```

---

## 四、核心服务设计

### 4.1 服务清单

| 服务 | 文件 | 职责 | 代码量 |
|------|------|------|--------|
| Database | `database.js` | JSON 文件读写，147 行持久化逻辑 | 326行 |
| LLMService | `llm-service.js` | 系统提示词构建 + DeepSeek API 流式调用 | 337行 |
| TaskService | `task-service.js` | 任务 CRUD + RPG 标题生成 + Subtask 进度 | 243行 |
| TaskClassifier | `task-classifier.js` | 根据任务文本自动分类 mode (computer/reading/writing) | 156行 |
| RelationshipService | `relationship-service.js` | 好感度统计 + 关系阶段升级判定 | 111行 |
| PomodoroService | `pomodoro-service.js` | 番茄钟计时 + tick 事件广播 | 82行 |
| ProactiveService | `proactive-service.js` | 空闲检测 + 定时触发 LLM 生成主动消息 | 129行 |
| MemoryService | `memory-service.js` | 对话摘要生成 + 关键词提取 + 记忆检索 | 80行 |
| NarrativeEngine | `narrative-engine.js` | 叙事章节推进 + 提示词注入 | 62行 |
| WindowManager | `window-manager.js` | 多模式窗口生命周期 + 模式切换 | 154行 |
| UserStyleAnalyzer | `user-style-analyzer.js` | 用户风格分析（预留） | 9行 |

### 4.2 LLM 系统提示词结构

```
┌────────────────────────────────────────┐
│ [角色设定]  — 来自 worldBook.character │
│   名字、性格、背景、说话风格           │
├────────────────────────────────────────┤
│ [世界背景]  — 来自 worldBook           │
│   世界观描述、当前章节、世界规则       │
├────────────────────────────────────────┤
│ [关系状态]  — 来自 relationshipService │
│   关系阶段、完成任务数                 │
├────────────────────────────────────────┤
│ [当前上下文] — 当前模式、活跃任务      │
├────────────────────────────────────────┤
│ [行为指令]  — 模式相关行为约束         │
│   Task Creation 模式 → 结构化 JSON     │
│   普通模式 → 自然对话 + 表情 JSON      │
├────────────────────────────────────────┤
│ [相关记忆]  — 来自 memoryService       │
│   关键词匹配的历史记忆摘要             │
└────────────────────────────────────────┘
```

### 4.3 数据库 Schema

```json
{
  "appState": {
    "currentMode": "pet|wallpaper|software",
    "settings": { "theme", "subtitleEnabled", "typewriterSpeed", ... },
    "apiKey": "sk-...",
    "wallpaperSettings": { "opacity", "characterPosition", "soundVolume" }
  },
  "character": { "id", "currentMood", "currentExpression" },
  "relationship": { "characterId", "stage", "totalTasksCompleted", 
                    "totalPomodoros", "totalConversations", "consecutiveDays" },
  "tasks": [{ "id", "realTitle", "rpgTitle", "rpgDescription",
              "estimatedPomodoros", "subtasks": [...], "status" }],
  "conversations": [{ "id", "messages": [...], "createdAt" }],
  "conversationMemory": [{ "id", "summary", "keywords", "sourceConversationId" }],
  "worldState": { "currentChapter", "variables": {...}, "milestoneProgress": {...} }
}
```

---

## 五、渲染管线

### 5.1 桌宠模式 — Live2D 渲染

```
Live2D Cubism Core (C++ WASM)
  → live2dcubismcore.min.js (SDK)
  → live2d-bundle-entry.js → esbuild bundle → live2d-renderer.bundle.js
  → CharacterRenderer (shared)
  → 加载 hiyori_free_zh/ 模型
  → WebGL Canvas → requestAnimationFrame 循环
```

模型资源位于 `hiyori_free_zh/runtime/`：
- `.model3.json` — 模型定义（网格、纹理、参数）
- `.cdi3.json` — 显示信息
- `.physics3.json` — 物理模拟（头发、衣物摆动）
- `motion/*.motion3.json` — 动作动画（8个预设动作）

### 5.2 壁纸模式 — WebGL 场景

```
Scene Graph (scene-graph.js)
  → WebGL Renderer (renderer.js)
  → Render Pipeline (render-pipeline.js)
     ├── Shader Manager (shader-manager.js)
     │   └── .frag / .vert 着色器文件（bloom, cloud, curtain, particle, text...）
     ├── Framebuffer (framebuffer.js) — 后处理
     ├── Particle Emitter (particles/emitter.js)
     └── Text Node (text/text-node.js)
  → Animation Controller (animation/controller.js)
     └── 内置动画：breathing, clock, deform, flow, pan, parallax, swing, time-of-day
```

### 5.3 Wallpaper Engine 兼容

```
Wallpaper Engine .pkg 场景文件
  → pkg-reader.js (解包)
  → scene-converter.js (转换为内部场景格式)
  → we-asset-loader.js → 加载到 WebGL 场景
```

---

## 六、窗口管理

```
WindowManager
├── getOrCreateWindow(mode)     # 懒创建 + 缓存
│   ├── WINDOW_CONFIG[PET]      # 500×500 透明置顶无边框
│   ├── WINDOW_CONFIG[WALLPAPER] # 全屏透明
│   └── WINDOW_CONFIG[SOFTWARE]  # 1280×800 标准窗口
├── switchMode(targetMode)      # 隐藏旧窗口，显示新窗口
├── getCurrentMode()            # 当前激活模式
└── closeAll()                  # 销毁全部窗口

SettingsWindowManager (独立)
└── open()                      # 800×600 标准窗口，柚子日记 UI

EditorWindowManager (独立)
└── open()                      # 壁纸编辑器窗口
```

所有模式窗口共享同一个 `preload.js`，通过 `contextBridge` 暴露安全的 IPC 接口。

---

## 七、关键设计决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 数据库方案 | 单 JSON 文件 | 数据量小（<1MB），无需 SQL，零配置 |
| 模块系统 | CommonJS | Electron 主进程原生支持，无需转译 |
| 类型检查 | JSDoc + tsc --noEmit | 获得类型安全但不产生编译产物 |
| AI 模型 | DeepSeek | 中文能力优于 GPT 同价位模型，OpenAI 兼容 API |
| Live2D 渲染 | 独立 esbuild bundle | 隔离 SDK 复杂度，IIFE 格式可直接在浏览器环境使用 |
| IPC 设计 | 字符串通道常量 | 集中管理，类型安全，避免魔法字符串散布 |
| 窗口策略 | 懒创建 + 缓存 | 首次打开时创建，后续切换复用，节省内存 |
| 样式方案 | CSS Variables | 主题切换只需修改变量，无需重载样式表 |
| 代码风格 | Biome (tab 缩进) | 速度快，单一工具替代 ESLint + Prettier |

---

## 八、外部依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| electron | ^42.3.2 | 桌面应用框架 |
| live2d-renderer | ^0.6.6 | Live2D WebGL 渲染封装 |
| lowdb | ^7.0.1 | JSON 数据库（提供便利的读写封装） |
| esbuild | ^0.28.0 | Live2D Bundle 打包 |
| typescript | ^6.0.3 | 类型检查 |
| vitest | ^4.1.7 | 单元测试 |
| @biomejs/biome | ^1.9.4 | Lint + Format |
| DeepSeek API | — | LLM 对话服务（外部 HTTP API） |

---

## 九、待演进方向

| 方向 | 说明 |
|------|------|
| 打包发布 | 引入 electron-builder，生成 .exe 安装包 |
| 自动更新 | 集成 electron-updater，支持版本自动升级 |
| 多语言 | 提取硬编码中文字符串，支持 i18n |
| 全局快捷键 | 注册系统级快捷键切换模式/唤出对话 |
| 多角色支持 | 世界书 + 角色卡系统支持切换角色 |
| Web 端口 | 考虑支持通过本地 HTTP 端口远程控制 |
| 日志系统 | 引入结构化日志，便于问题排查 |
| macOS 适配 | 调整窗口配置和托盘逻辑支持 macOS |
