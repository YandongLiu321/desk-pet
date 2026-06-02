# 需求规格说明书

> 本文档是对桌面 AI 陪伴应用的完整需求规格描述，包含本轮对话中确认的所有功能设计。新接入的 AI 读完本文档后应能直接进行对应代码修改，无需依赖原对话上下文。
>
> 项目基础文档：`proposal.md`（技术提案）、`high-level-design.md`（概要设计）、`detailed-design.md`（详细设计）、`prompt.md`（施工指令）。

---

## 1. 产品概述

三模式 Windows 桌面 AI 陪伴应用：
- **桌宠模式**：桌面悬浮 Q 版角色（露娜·月语），窗口即角色本体
- **壁纸模式**：全屏专注陪伴层，含番茄钟
- **软件模式**：RPG 风格主界面，任务结算与剧情推进

技术栈：Electron 42 主进程 (CommonJS) + 纯 HTML/CSS/JS 渲染进程 + DeepSeek API + lowdb 7

---

## 2. 桌宠模式规格（Pet Mode）

### 2.1 窗口

- **尺寸**：140×160 像素（仅容纳角色本体，约 120×120 的角色 + 少量边距）
- **属性**：`transparent: true`, `frame: false`, `alwaysOnTop: true`, `resizable: false`, `skipTaskbar: true`
- **鼠标穿透**：非角色区域调用 `setIgnoreMouseEvents(true, { forward: true })`，点击穿透到桌面
- **拖动**：角色区域 CSS `-webkit-app-region: drag`，用户可拖动角色到桌面任意位置

### 2.2 交互：左键

点击角色 → 对话浮层从角色下方弹出（`position='bottom'`）。此为**纯闲聊通道**：

- 单行输入框 + 发送按钮，回车发送
- AI 回复流式逐字显示
- 该通道的 System Prompt **不包含**任务转化指令（`enableTaskCreation: false`）
- 点击浮层外区域或按 ESC 关闭浮层

### 2.3 交互：右键

右键角色 → 弹出功能菜单，包含五个入口：

1. **发布任务** → 进入任务发布对话（此时 System Prompt 注入任务转化指令，`enableTaskCreation: true`）
2. **进入壁纸模式** → 手动切换到壁纸模式
3. **进入软件模式** → 手动切换到软件模式
4. **查看任务列表** → 展开迷你任务面板（浮动面板，最大高度 300px），可查看任务、勾选子任务
5. **退出** → 关闭应用

### 2.4 智能模式切换

在左键闲聊中，AI 需能识别用户的模式切换意图：

- 用户说"想开始专注/干活/执行任务/开始番茄钟"等 → 角色询问"要进入壁纸模式吗？"
- 用户说"想看剧情/进度/结算/进入软件模式"等 → 角色询问"要打开星之书查看进度吗？"

**关键规则**：角色询问和实际切换分两轮对话完成。用户明确同意（"好""嗯""可以"等）后，AI 才返回切换 JSON：

```json
{"intent":"switch_mode","mode":"wallpaper"}
```
或
```json
{"intent":"switch_mode","mode":"software"}
```

渲染进程收到 `conversation:done` 中 `intent: 'switch_mode'` 后，自动调用 `app:switch-mode` 执行切换。

### 2.5 角色动画

- 呼吸动画：`@keyframes breathe` scale 1.0 ↔ 1.05, 3s ease-in-out
- 眨眼动画：`@keyframes blink` 每 4s 一次
- 点击弹跳：`@keyframes bounce` translateY 0 → -10 → 0, 0.3s

---

## 3. 壁纸模式规格（Wallpaper Mode）

### 3.1 窗口

- **属性**：`fullscreen: true`, `transparent: true`, `frame: false`, `alwaysOnTop: false`
- **内容**：全屏半透明暗色层（CSS 星空渐变）+ 居中大尺寸角色（200×200px）+ 番茄钟控制区 + 侧边对话栏

### 3.2 番茄钟

- 默认时长：25 分钟（从 worldbook `pomodoroDefaults.focusDuration` 读取）
- 单次倒计时，每秒通过 IPC `pomodoro:tick` 推送剩余秒数到渲染进程
- 时间到 → `pomodoro:end` 推送

### 3.3 退出闭环（重要）

按 ESC 或点击退出按钮时，**必须**触发以下流程，不可直接闪切回桌宠：

```
角色："专注时间结束了，旅者完成了目标吗？"

  ├── [完成了]
  │   → 展示关联任务的子任务勾选界面
  │   → 用户勾选已完成的子任务
  │   → 若子任务全完成，触发结算叙事（调用 NarrativeEngine）
  │   → 返回桌宠模式

  ├── [还没]
  │   → 角色："要再延 25 分钟继续吗？"
  │       ├── [是] → 番茄钟重新开始倒计时（渲染进程重新调用 pomodoro:start）
  │       │         → 用户继续专注
  │       │         → 时间到后再次触发此流程
  │       └── [否] → 角色："那记录一下进度吧~"
  │                → 用户输入进度描述文本
  │                → 内容保存到对话历史（作为一条用户消息）
  │                → 返回桌宠模式

  └── [无关联任务] → 直接返回桌宠
```

### 3.4 其他行为

- 番茄钟运行时窗口 `skipTaskbar: true`（不打扰）
- 切换到其他模式时，番茄钟自动 stop
- 侧边对话栏：点击角色滑入，交互方式与桌宠一致
- 白噪音：原型阶段为占位 UI（禁用控件 + "音效即将上线"文字）

---

## 4. 软件模式规格（Software Mode）

本轮未修改。1280×800 独立窗口，暗色星空主题，三栏布局（左导航 + 中内容 + 右角色区）。

---

## 5. System Prompt 组装规则

`buildSystemPrompt(context)` 参数：

```js
context: {
  currentMode: 'pet' | 'wallpaper' | 'software',
  activeTask?: string,
  enableTaskCreation?: boolean  // 默认 false
}
```

### 始终注入的段落

```
[角色设定] → character.name, character.background, character.personality, character.speechStyle
[世界背景] → world.title, world.description, 当前章节, world.rules
[关系状态] → stage, totalTasksCompleted
[当前上下文] → currentMode, activeTaskTitle
[行为指令] → 回复长度限制、模式切换意图识别规则
[模式切换] → switch_mode JSON 格式定义
```

### 条件注入的段落

`enableTaskCreation === true` 时**才**注入：

```
[任务转化]
若对话中包含待办事项，使用 /task 指令触发任务转化
返回 JSON：{"intent":"create_task","realTask":"...","rpgTitle":"...",...}
```

### 行为指令规则

```
- 回复控制在 50-100 字
- 在主动互动时，保持简短（不超过 50 字）
- 识别模式切换意图：
  - "想开始专注/干活/执行任务" → 询问切换到壁纸模式
  - "想看剧情/进度/结算" → 询问切换到软件模式
- 切换前必须征求用户同意，分两轮完成
- 用户同意后才返回切换 JSON
```

---

## 6. LLM 意图解析

`llm-service.js` 在流完成后解析 AI 响应文本，提取结构化 JSON。支持两种 intent：

| intent | JSON 格式 | 后续动作 |
|--------|----------|---------|
| `create_task` | `{"intent":"create_task","realTask":"...","rpgTitle":"...","rpgDescription":"...","estimatedPomodoros":N,"estimatedMinutes":N,"subtasks":[...]}` | 渲染进程调用 `task:create` 创建任务 |
| `switch_mode` | `{"intent":"switch_mode","mode":"wallpaper\|software"}` | 渲染进程调用 `app:switch-mode` 切换模式 |

解析容错：`JSON.parse` → 正则提取 `{...}` → 回退为纯文本（不阻塞对话）。

---

## 7. IPC 通信变更

### 7.1 conversation:done 载荷扩展

```
{
  fullText: string,
  intent?: 'create_task' | 'switch_mode',
  taskPayload?: { realTask, rpgTitle, rpgDescription, ... },
  switchTarget?: 'wallpaper' | 'software'
}
```

### 7.2 渲染进程 intent 分发逻辑

```js
// conversation:done 回调中
if (data.intent === 'create_task') {
  await ipc.createTask(data.taskPayload);
} else if (data.intent === 'switch_mode') {
  await ipc.switchMode(data.switchTarget);
}
```

### 7.3 模式切换的两条调用路径

```
路径 A（手动）：用户点击菜单 → ipc.switchMode(target) → app:switch-mode
路径 B（智能）：AI 返回 switch_mode → 渲染进程检测 intent → ipc.switchMode(target) → app:switch-mode
```

主进程 `app:switch-mode` handler 无需区分调用来源。

---

## 8. 需要修改的代码文件

### 8.1 `src/main/window-manager.js`

| 修改项 | 旧值 | 新值 |
|--------|------|------|
| `WINDOW_CONFIG.pet.width` | 300 | 140 |
| `WINDOW_CONFIG.pet.height` | 400 | 160 |

### 8.2 `src/main/llm-service.js`

| 修改项 | 说明 |
|--------|------|
| `buildSystemPrompt(context)` | 参数增加 `enableTaskCreation?: boolean`。默认 false。仅当 true 时拼接任务转化指令段落 |
| `chat()` 的 `onDone` 回调 | metadata 中增加 `switchTarget` 字段 |
| 意图解析 | 除 `create_task` 外，增加 `switch_mode` 的 JSON 格式匹配 |

### 8.3 `src/main/pomodoro-service.js`

| 修改项 | 说明 |
|--------|------|
| `start()` 方法 | 需支持重新调用（已有番茄钟运行时先清除再启动），以支持"延长"场景 |

### 8.4 `src/renderer/pet/index.html`

| 修改项 | 说明 |
|--------|------|
| 布局 | 窗口仅容纳角色（~140×160 透明背景），角色居中填充 |
| 左键点击 | 弹出对话浮层（纯闲聊）。调用 `conversation:send` 时传 `enableTaskCreation: false` |
| 右键点击 | 弹出功能菜单，含"发布任务"入口 |
| "发布任务"流程 | 点击后打开对话浮层，调用 `conversation:send` 时传 `enableTaskCreation: true` |
| conversation:done 处理 | 增加 `intent === 'switch_mode'` 分支，自动调用 `app:switch-mode` |
| CSS 变量 | `--win-pet-width: 140px; --win-pet-height: 160px;` |

### 8.5 `src/renderer/wallpaper/index.html`

| 修改项 | 说明 |
|--------|------|
| 退出按钮/ESC | 不再直接切回桌宠。先检查番茄钟是否关联了 taskId：有 → 弹出进度询问浮层；无 → 直接返回 |
| 进度询问浮层 | "完成"按钮 → 展示子任务勾选 → 返回；"还没"按钮 → "要延 25 分钟？" → 是则重新 `pomodoro:start` / 否则输入进度文本 → 返回 |
| 模式切换前 | 若番茄钟关联了任务，同样先询问进度（与退出流程一致） |

### 8.6 `src/renderer/shared/styles/variables.css`

| 修改项 | 旧值 | 新值 |
|--------|------|------|
| `--win-pet-width` | 300px | 140px |
| `--win-pet-height` | 400px | 160px |

### 8.7 `src/renderer/shared/ipc-client.js`

| 修改项 | 说明 |
|--------|------|
| `sendMessage()` | 支持传入 `enableTaskCreation` 参数，透传到 IPC `conversation:send` |
| `onDone` 回调 | metadata 解析需含 `switchTarget` 字段 |

### 8.8 `src/main/ipc-handlers.js`

| 修改项 | 说明 |
|--------|------|
| `conversation:send` handler | 接收 `enableTaskCreation` 参数，传给 `buildSystemPrompt` |
| `conversation:done` 推送 | metadata 中包含 `switchTarget` |

### 8.9 `src/preload.js`

| 修改项 | 说明 |
|--------|------|
| `conversation.send()` | 参数增加 `enableTaskCreation?: boolean` |
| `conversation.onDone` | 回调数据增加 `switchTarget` |

---

## 9. 模式切换总览

```
应用启动 → 桌宠模式（默认）

桌宠 ──→ 壁纸（手动：右键菜单）
    ──→ 壁纸（智能：闲聊"想专注" → AI 确认 → 切换）
    ──→ 软件（手动：右键菜单）
    ──→ 软件（智能：闲聊"看剧情" → AI 确认 → 切换）

壁纸 ──→ 桌宠（ESC/按钮 → 退出闭环 → 返回）
    ──→ 桌宠（关闭窗口 → 直接返回）

软件 ──→ 桌宠（关闭窗口）

系统托盘 ──→ 任意模式（随时可用）
```

---

## 10. 未修改项（维持现有设计）

- 软件模式全部功能
- 主动交互（proactive-trigger.js 空壳，P1 扩展）
- 任务后续追问（数据模型 followUp 字段保留，P1 扩展）
- 角色渲染（图标占位 → Live2D 扩展接口）
- 用户风格学习（空壳模块）
- 世界地图（静态 → 交互扩展接口）
- 关系阶段（硬编码阈值 → 配置化扩展接口）
- 白噪音（占位 UI）
- 数据模型整体结构

---

## 11. 已知架构不一致

`proposal.md`、`high-level-design.md`、`detailed-design.md` 描述的是 **Vue 3 + Vite + Pinia** 架构。`prompt.md` 和当前 `src/` 下的实现是**纯 HTML/CSS/JS**（无框架）。以下 task 文件仍描述 Vue 体系，修改时需注意：

- `tasks/pet-mode.md` — 引用 `App.vue` + `main.js` 创建 Vue 应用
- `tasks/wallpaper-mode.md` — 同上
- `tasks/software-mode.md` — 同上
- `tasks/shared-stores.md` — 全文描述 Pinia stores
- `tasks/shared-components.md` — 全文描述 Vue SFC
- `tasks/infrastructure.md` — 描述 Vite 多页面配置

**实际做法**：每个模式使用单一 `index.html`，内嵌 `<style>` 和 `<script>`。共享样式通过 `<link>` 加载，共享 JS 通过 `<script src>` 加载。状态管理使用 `state-manager.js`（简易发布订阅），无框架。

---

## 12. 本轮施工记录（2026-06-02）

### 12.1 新增文件

**`src/shared/constants.js`** — 集中管理跨文件字符串常量（约束#9）：

- `IPC` — 全部 27 个 IPC channel 名称
- `INTENT` — `create_task`、`switch_mode`
- `MODE` — `pet`、`wallpaper`、`software`
- `ERROR_CODE` — 8 个错误码
- `API_CONFIG` — DeepSeek API URL 和模型名
- 双环境兼容：CommonJS（`module.exports`）供主进程 `require()`；browser（`window` 挂载）供渲染进程 `<script src>` 加载

### 12.2 修改文件

#### `src/main/window-manager.js`

| 变更 | 旧值 | 新值 |
|------|------|------|
| `WINDOW_CONFIG.pet.width` | 300 | 140 |
| `WINDOW_CONFIG.pet.height` | 400 | 160 |

#### `src/main/llm-service.js`

- 引入 `API_CONFIG`、`INTENT`、`MODE` 常量，替换 `DEFAULT_MODEL`、`API_URL` 硬编码
- `buildSystemPrompt(context)`：参数增加 `enableTaskCreation?: boolean`（默认 false）。`[任务转化]` 段落仅当 `enableTaskCreation === true` 时注入。`[行为指令]` 增加模式切换意图识别规则（询问→确认→输出 JSON）。新增 `[模式切换]` 段落（始终注入，定义 `switch_mode` JSON 格式）
- `chat(options)`：`options` 增加 `enableTaskCreation` 字段，透传到 `_doChat` → `buildSystemPrompt`
- `_extractTaskIntent(text)` → `_extractIntent(text)`：返回值增加 `switchTarget` 字段。除 `create_task` 外，新增 `switch_mode` 正则匹配，校验 mode 为 `wallpaper` / `software`
- `onDone` 回调的 metadata 中自动包含 `switchTarget`（由 `_extractIntent` 产出）

#### `src/main/ipc-handlers.js`

- 引入 `IPC`、`MODE` 常量
- `conversation:send` handler：从参数解构中提取 `enableTaskCreation`，传入 `llmService.chat()`
- `app:switch-mode` handler：在切换模式前检查 `pomodoroService.isRunning()`，若运行中则 `stop()`
- `app:switch-mode` handler：mode 合法性校验改用 `[MODE.PET, MODE.WALLPAPER, MODE.SOFTWARE]`
- 全部 27 个 IPC channel 字符串字面量替换为 `IPC.*` 常量引用

#### `src/preload.js`

- 引入 `IPC` 常量
- `conversation.send(message)` → `conversation.send(message, enableTaskCreation)`，透传到 IPC invoke
- 全部 IPC channel 字符串字面量替换为 `IPC.*` 常量引用（包括 `on`/`removeListener`/`removeAllListeners` 中的 channel 名）

#### `src/renderer/shared/ipc-client.js`

- `sendMessage(message)` → `sendMessage(message, enableTaskCreation)`，透传到 preload API

#### `src/renderer/shared/styles/variables.css`

| 变量 | 旧值 | 新值 |
|------|------|------|
| `--win-pet-width` | 300px | 140px |
| `--win-pet-height` | 400px | 160px |

#### `src/renderer/pet/index.html`

- 加载 `../../shared/constants.js`
- 新增 `isTaskMode` 状态标记
- **左键点击**：`isTaskMode = false`，弹出对话浮层（纯闲聊）。`sendMessage` 传 `enableTaskCreation: false`
- **右键菜单**：新增"发布任务"入口（第一项）。点击后 `isTaskMode = true`，打开对话浮层。`sendMessage` 传 `enableTaskCreation: true`
- **`onDone` 回调**：增加 `INTENT.SWITCH_MODE` 分支 — 检测到 `switchTarget` 后自动调用 `ipc.switchMode()` 执行切换
- 模式切换菜单项比较改用 `MODE.WALLPAPER` / `MODE.SOFTWARE` 常量
- ESC 关闭浮层时重置 `isTaskMode = false`

#### `src/renderer/wallpaper/index.html`

- 加载 `../../shared/constants.js`
- 新增 `currentPomodoroTaskId`、`isExitingWithTask` 状态
- **番茄钟启动逻辑**提取为 `startPomodoroFlow(durationMinutes, taskId)` 函数：先清理旧监听器 → 启动 → 设置 tick/end 回调。支持从退出面板的"延长"按钮重新调用
- **退出面板 UI**：四态浮动面板（覆盖层 + 居中面板）
  - 态1 — 询问"完成了/还没"
  - 态2 — 子任务勾选列表（动态渲染 checkbox，toggle 通过 IPC）
  - 态3 — "要延25分钟？"（是→重启番茄钟 / 否→输入进度）
  - 态4 — 进度文本输入（保存为对话消息后返回桌宠）
- **ESC 处理**：面板打开时关闭面板；否则 `pomodoro:get-status` 检查 taskId → 有则弹出面板 / 无则切换回桌宠
- **AI 触发模式切换**：`onDone` 中检测 `INTENT.SWITCH_MODE` → 同样检查 pomodoro 关联任务 → 有则弹出面板 / 无则切换
- `app:switch-mode` 从 `"pet"` 改为 `MODE.PET` 常量

### 12.3 未修改

- **`src/main/pomodoro-service.js`** — `start()` 方法首行已调用 `this.stop()`，天然支持重新调用（延长场景），无需改动
- 软件模式全部文件 — 本轮未涉及
- 共享模块（conversation-panel.js、task-panel.js 等）— 接口未变，无需改动
