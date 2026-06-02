# 桌面 AI 陪伴应用 — 技术提案 V1.0

## 1. 项目概述

### 1.1. 目标

在 1-2 周内交付一个 Windows 桌面 AI 陪伴应用的可交互原型，覆盖三大场景：

- **桌宠模式**：桌面悬浮的 Q 版角色（窗口即角色本体）。左键点击进行自然语言闲聊，右键菜单发布任务与切换模式；对话中能识别用户意图，主动询问是否切换模式
- **壁纸模式**：全屏覆盖的专注陪伴层，含番茄钟和白噪音
- **软件模式**：RPG 风格的游戏化主界面，任务结算与剧情推进

三种模式共享同一角色、数据和对话引擎。

### 1.2. 核心体验闭环

```
用户在桌宠模式发布任务 → 在壁纸模式专注执行 → 在软件模式结算推进剧情
```

### 1.3. 已确认的技术决策

| 决策项 | 选型 | 理由 |
|--------|------|------|
| 桌面框架 | Electron 42 | 已安装，Windows 原生支持好 |
| 主进程 | CommonJS (.js) | Electron 原生模块系统 |
| 渲染进程 | Vue 3 + Vite (ESM) | 组件化开发，热更新 |
| AI 服务 | DeepSeek API | 用户指定，兼容 OpenAI 格式 |
| 数据存储 | lowdb 7 | 已安装，JSON 文件，配置简单 |
| 角色占位 | 纯图标 + CSS 动画 | Live2D 模型后续约稿 |
| 代码规范 | biome + tsc 类型检查 | 已配置 |

---

## 2. 架构设计

### 2.1. 进程架构

```
┌──────────────────────────────────────────────────────────┐
│                     Electron Main Process                │
│                     (src/main/)                          │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────────┐ │
│  │ 窗口管理器 │  │ IPC 路由  │  │ 数据层 (lowdb)        │ │
│  │ (WindowMgr)│  │ (ipcMain) │  │ (Database)            │ │
│  └──────────┘  └──────────┘  └────────────────────────┘ │
│  ┌──────────────────────────────────────────────────┐   │
│  │            LLM 服务 (DeepSeek API)                │   │
│  └──────────────────────────────────────────────────┘   │
└──────────┬──────────────┬───────────────┬───────────────┘
           │              │               │
     IPC   │        IPC   │         IPC   │
           ▼              ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 桌宠渲染进程   │ │ 壁纸渲染进程  │ │ 软件渲染进程  │
│ (Vue 3 App)  │ │ (Vue 3 App)  │ │ (Vue 3 App)  │
│              │ │              │ │              │
│ 角色本体      │ │ 全屏覆盖      │ │ 独立窗口      │
│ ~120×120px   │ │ 半透明        │ │ 1280×800px   │
│ 浮层交互      │ │              │ │              │
└──────────────┘ └──────────────┘ └──────────────┘
```

三种模式各为一个独立的 BrowserWindow + Vue 应用，通过主进程 IPC 共享状态。

### 2.2. 目录结构

```
desk-pet/
├── src/
│   ├── main/                    # 主进程 (CommonJS)
│   │   ├── main.js              # 入口：窗口创建、托盘
│   │   ├── ipc-handlers.js      # IPC 路由注册
│   │   ├── database.js          # lowdb 封装
│   │   ├── llm-service.js       # DeepSeek API 封装
│   │   └── window-manager.js    # 三窗口生命周期管理
│   ├── renderer/                # 渲染进程 (Vue 3 + Vite, ESM)
│   │   ├── pet/                 # 桌宠模式
│   │   │   ├── index.html
│   │   │   ├── main.js
│   │   │   ├── App.vue
│   │   │   └── components/
│   │   ├── wallpaper/           # 壁纸模式
│   │   │   ├── index.html
│   │   │   ├── main.js
│   │   │   ├── App.vue
│   │   │   └── components/
│   │   ├── software/            # 软件模式
│   │   │   ├── index.html
│   │   │   ├── main.js
│   │   │   ├── App.vue
│   │   │   └── components/
│   │   └── shared/              # 共享组件和工具
│   │       ├── components/      # 对话气泡、任务卡片等
│   │       ├── stores/          # Pinia stores
│   │       ├── styles/          # CSS 变量、主题
│   │       └── utils/           # IPC 调用封装
│   └── preload.js               # preload 脚本 (CommonJS)
├── assets/
│   ├── characters/default/      # 角色占位图标
│   ├── backgrounds/             # 壁纸背景
│   ├── ui/themes/default/       # UI 资源
│   ├── audio/                   # 白噪音音频
│   └── worldbooks/              # 世界书 JSON
├── data/                        # lowdb 数据文件
├── tests/                       # vitest 单元测试
├── doc/                         # 文档
├── vite.config.js               # Vite 配置（多页面）
├── package.json
├── tsconfig.json
└── biome.json
```

### 2.3. Vite 多页面配置

渲染进程使用 Vite 多页面构建，三个模式各为一个入口：

```js
// vite.config.js (示意)
export default {
  root: 'src/renderer',
  build: {
    rollupOptions: {
      input: {
        pet: 'src/renderer/pet/index.html',
        wallpaper: 'src/renderer/wallpaper/index.html',
        software: 'src/renderer/software/index.html',
      }
    }
  }
}
```

---

## 3. 数据模型

### 3.1. lowdb 数据结构

```json
{
  "appState": {
    "currentMode": "pet",
    "petWindowBounds": { "x": 1000, "y": 600, "width": 140, "height": 160 },
    "wallpaperSettings": { "opacity": 0.85, "characterPosition": "right", "soundVolume": 0.5 },
    "pomodoro": null
  },
  "tasks": [
    {
      "id": "task_01",
      "realTitle": "复习高数第六章",
      "rpgTitle": "攻破高数塔·积分迷宫",
      "rpgDescription": "在魔法学院高塔的第六层，积分迷宫守护着通往星之试炼的钥匙。",
      "estimatedPomodoros": 2,
      "estimatedMinutes": 50,
      "deadline": "2026-06-08T00:00:00Z",
      "status": "active",
      "createdAt": "2026-06-01T10:00:00Z",
      "completedAt": null,
      "followUpPromptAt": null,
      "followUpCompleted": false,
      "followUpResult": "",
      "subtasks": [
        { "id": "st1", "realDesc": "阅读第六章教材", "rpgDesc": "探索迷宫地图", "completed": false },
        { "id": "st2", "realDesc": "完成课后习题", "rpgDesc": "击败迷宫守卫", "completed": false }
      ]
    }
  ],
  "character": {
    "id": "luna_moonwhisper",
    "currentMood": "gentle",
    "currentExpression": "smile",
    "lastInteractionAt": "2026-06-01T10:30:00Z"
  },
  "relationship": {
    "characterId": "luna_moonwhisper",
    "stage": "acquaintance",
    "totalTasksCompleted": 0,
    "totalPomodoros": 0,
    "totalConversations": 0,
    "consecutiveDays": 1,
    "lastInteractionAt": "2026-06-01T10:30:00Z"
  },
  "worldState": {
    "currentChapter": 1,
    "variables": {
      "crystalIntegrity": 75
    }
  },
  "conversations": [
    {
      "id": "conv_01",
      "messages": [
        { "role": "user", "content": "今天好累" },
        { "role": "assistant", "content": "旅者，我感知到你的疲惫。要不要在星泉旁稍作休息？" }
      ],
      "createdAt": "2026-06-01T10:00:00Z"
    }
  ]
}
```

### 3.2. 关键实体关系

- 一个用户，一个角色，一个世界
- 用户拥有多个任务（任务含子任务）
- 用户拥有多段对话（对话含多条消息）
- 关系阶段由任务完成量、番茄钟数、对话次数隐性计算

---

## 4. 功能范围（原型阶段）

### 4.1. 桌宠模式 — MVP 功能

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 角色悬浮窗口 | 窗口即角色本体（约 120×120），透明无边框，置顶，可拖动 | P0 |
| 角色占位展示 | 纯图标 + CSS 呼吸动画、眨眼动画 | P0 |
| 系统托盘 | 托盘图标 + 右键菜单（切换模式、退出） | P0 |
| 左键：对话气泡 | 点击角色弹出对话浮层，单行输入框 + 回车发送，纯闲聊 | P0 |
| AI 对话 | 接入 DeepSeek API，世界书 Prompt 注入，流式逐字显示 | P0 |
| 智能模式切换 | 对话中识别用户"想专注/看剧情"等意图，主动询问后切换模式 | P0 |
| 右键：功能菜单 | 右键弹出菜单，含"发布任务""切换壁纸/软件模式""退出"等入口 | P0 |
| 任务发布 | 用户通过右键菜单进入，表达待办后 AI 转化为 RPG 叙事任务 | P0 |
| 迷你任务面板 | 右键菜单展开，查看/勾选子任务 | P0 |
| 主动交互 | 简化版：仅支持手动点击触发对话。完整版含 4 种触发源，见 4.4.2 | P1 |

### 4.2. 壁纸模式 — MVP 功能

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 全屏覆盖窗口 | 半透明暗色层，覆盖桌面 | P0 |
| 角色陪伴展示 | 大尺寸图标 + 静坐动画 | P0 |
| 番茄钟 + 退出闭环 | 启动/停止/倒计时 → 时间到角色询问完成情况 → 完成则勾选子任务退出 / 未完成则询问是否延长时间（同意→重新开始循环 / 拒绝→记录进度退出） | P0 |
| 白噪音 | 3-5 种环境音效，可切换、调音量 | P1 |
| 侧边对话栏 | 点击角色滑入对话栏，简单问答 | P0 |
| 低打扰进度条 | 屏幕边缘极细进度条，悬停展开 | P2 |
| 退出返回桌宠 | ESC 或按钮触发：角色询问任务完成情况 → 完成勾选子任务退出 / 未完成则询问延长时间（同意→重启番茄钟 / 拒绝→记录进度退出） | P0 |

### 4.3. 软件模式 — MVP 功能

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 独立窗口 | 1280×800px，暗色星空主题 | P0 |
| 左侧导航 | 任务、地图、角色三个标签切换 | P0 |
| 角色展示区 | 右侧大尺寸图标 + 对话面板 | P0 |
| RPG 任务面板 | 任务列表、详情、子任务勾选 | P0 |
| 任务结算 | 子任务全完成 → 叙事反馈 + 世界状态更新 | P0 |
| 世界地图 | 静态插画 + 区域状态（明亮/灰暗） | P1 |
| 角色档案 | 背景故事、共同记忆时间线 | P1 |
| 对话面板 | 底部聊天区域，与桌宠共享对话引擎 | P0 |

### 4.4. 简化清单与扩展接口

以下列出从原需求文档中**为效率而简化**或**因前置依赖缺失而推迟**的功能。每项标注简化程度、原因、以及代码层预留的扩展接口，确保日后无需重构即可添加。

---

#### 4.4.1. 角色渲染：图标占位 → Live2D

| 项目 | 说明 |
|------|------|
| **原型做法** | 静态 SVG/CSS 图标 + 呼吸/弹跳动画 |
| **完整需求** | Live2D Cubism 骨骼动画，待机/互动/陪伴多套动作 |
| **简化原因** | Live2D 模型需约稿，模型文件尚未交付 |
| **扩展接口** | `src/renderer/shared/components/CharacterRenderer.vue` — 组件内部根据 `modelType` 属性切换渲染引擎 |

```js
// CharacterRenderer.vue — 扩展接口定义
props: {
  modelType: 'icon' | 'live2d',   // 原型阶段为 'icon'，模型到位后传入 'live2d'
  characterId: String,             // 角色 ID，用于加载对应模型资源
  mode: 'pet' | 'wallpaper' | 'software',  // 模式决定尺寸和动作集
  expression: String,              // 当前表情名
  motion: String,                  // 当前动作名
  autoplay: Boolean                // 是否自动播放待机动画
}
// 当 modelType === 'live2d' 时，初始化 Live2D Canvas，替换图标层
// 当 modelType === 'icon' 时，渲染 <CharacterIcon> 子组件
```

- **表情/动作配置**：`assets/characters/{characterId}/expressions.json`、`motions.json`（每个角色独立配置，代码按名称引用，不硬编码参数）
- **模型文件**：放入 `assets/characters/{characterId}/live2d/` 即生效，无需改代码

---

#### 4.4.2. 主动交互：简化版 → 完整定时系统

| 项目 | 说明 |
|------|------|
| **原型做法** | 仅支持手动点击角色触发对话 |
| **完整需求** | 4 种触发条件——定时随机（15-30min）、任务截止提醒、用户久坐检测（30min 无操作）、任务完成后 1-3 天追问 |
| **简化原因** | 定时器和空闲检测需要主进程全局监听，P0 交互优先 |
| **扩展接口** | `src/main/proactive-trigger.js` — 触发器模块，统一调度 |

```js
// proactive-trigger.js — 扩展接口定义（原型阶段为空壳，返回空数组）
class ProactiveTrigger {
  // 注册触发源，每个源返回 TriggerEvent 或 null
  registerSource(name, checker, intervalMs) {}
  // 启动/停止调度
  start() {}
  stop() {}
  // 勿扰时段配置（从 worldbook 读取）
  setQuietHours(start, end) {}
  // 回调：当任何触发源激活时
  onTrigger(callback) {}  // callback(triggerEvent) → 主进程 IPC 通知桌宠窗口
}
// 完整版需实现的触发源：
// - RandomIntervalSource: 15-30min 随机
// - DeadlineReminderSource: 任务截止时间临近
// - IdleDetectorSource: mouse/keyboard 空闲 30min（需 node-iohook 或 electron powerMonitor）
// - FollowUpSource: 已完成任务在 followUpPromptAt 时间触发追问
```

- **UI 入口**：设置面板中的"勿扰时段"开关和时段选择（原型阶段不实现，但 IPC 通道已预留 `settings:updateQuietHours`）

---

#### 4.4.3. 任务后续追问：推迟 → 完整追问闭环

| 项目 | 说明 |
|------|------|
| **原型做法** | 任务完成后直接结算，无后续追问 |
| **完整需求** | 任务标记完成后的 1-3 天内，桌宠主动询问结果（"上次的高数塔试炼，结果如何？"），用户回答后记录 `followUpResult`，生成叙事反馈。每个任务仅追问一次 |
| **简化原因** | 依赖主动交互定时系统（4.4.2），且需要跨天持续运行 |
| **扩展接口** | Task 数据模型中已预留字段，见下方 |

```json
// 任务数据模型中已预留的追问字段（原型阶段值为 null/false）
{
  "followUpPromptAt": null,      // timestamp — 设为完成时间 + 随机 1-3 天后，触发追问
  "followUpCompleted": false,    // boolean  — 追问是否已回答
  "followUpResult": ""           // string   — 用户回答的后续结果文本
}
// IPC 通道预留：
// - 'task:get-pending-followups' → 主进程查询到达追问时间的任务列表
// - 'task:submit-followup'       → 用户回答追问，AI 生成叙事反馈
```

---

#### 4.4.4. 番茄钟循环：简化版 → 完整交互循环

| 项目 | 说明 |
|------|------|
| **原型做法** | 时间到角色询问"完成/还没"；完成→勾子任务退出；没完成→询问是否延长时间→同意则重新开始循环，拒绝则记录进度退出 |
| **完整需求** | 增加自动循环开关（无需每次都手动确认延长）；支持用户设定连续番茄钟数量 |
| **简化原因** | 自动循环和预设数量依赖更复杂的设置面板，原型阶段每次手动确认即可 |
| **扩展接口** | `src/main/pomodoro-service.js` — `setAutoCycle()` 方法已预留 |

```js
// pomodoro-service.js — 扩展接口
class PomodoroService {
  start(duration, taskId, autoCycle = false) {}  // autoCycle 原型阶段忽略
  stop(sessionId) {}
  getRemaining(sessionId) {}
  // 完整版扩展：
  // - onTimerEnd(callback) — 时间到回调，由渲染进程决定展示按钮还是触发 AI 对话循环
  // - extendSession(sessionId, additionalMinutes) — 用户回答"还没"后延长时间
  // - autoCycleEnabled — 从 worldbook 或用户设置读取
}
// IPC 通道预留：
// - 'pomodoro:extend'        → 延长当前番茄钟
// - 'pomodoro:setAutoCycle'  → 设置自动循环开关
// - 'pomodoro:getStats'      → 查询专注统计（总时长、完成数，供软件模式展示）
```

---

#### 4.4.5. 世界地图：静态图 → 交互式状态地图

| 项目 | 说明 |
|------|------|
| **原型做法** | 一张静态插画占位图 + 文字标注当前章节 |
| **完整需求** | 各区域根据任务完成状态动态变化（明亮/灰暗/锁链覆盖），显示世界变量数值，章节完成后出现"前往下一章"按钮 |
| **简化原因** | 需要美术产出多状态插画，原型阶段用纯色 CSS 区域模拟 |
| **扩展接口** | `src/renderer/software/components/WorldMap.vue` — 数据驱动渲染 |

```js
// WorldMap.vue — 扩展接口
props: {
  regions: Array<{
    id: string,
    name: string,
    state: 'locked' | 'dark' | 'bright',  // 区域状态
    position: { x: number, y: number },     // 在插画上的坐标位置
    icon: string                             // 区域图标（建筑/雕像等）
  }>,
  worldVariables: Object,   // 键值对 {"crystalIntegrity": 75}
  currentChapter: Object,   // 当前章节信息
  onChapterAdvance: Function // 章节推进回调
}
// 原型阶段 regions 从 worldbook 读取但仅静态显示
// 完整版需要：
// 1. 各区域插画素材放入 assets/backgrounds/chapter_{id}/
// 2. 区域状态由任务完成情况实时计算
// 3. 章节推进动画由 CSS transition 实现
```

---

#### 4.4.6. 用户风格学习：简化版 → 特征向量系统

| 项目 | 说明 |
|------|------|
| **原型做法** | 仅将最近 20 条用户消息原文注入 Prompt（"用户最近说过…"） |
| **完整需求** | 解析用户历史对话文本，提取用词偏好、emoji 习惯、句子长度等特征，构建轻量风格向量，注入 LLM 提示引导角色适配回复语感 |
| **简化原因** | 完整 NLP 分析需要额外库或大量 LLM 调用，原型阶段用历史消息简单代替 |
| **扩展接口** | `src/main/user-style-analyzer.js` |

```js
// user-style-analyzer.js — 扩展接口（原型阶段返回空对象）
class UserStyleAnalyzer {
  // 从用户消息历史中提取风格特征
  async analyze(messages) {
    // 原型阶段：return {} → Prompt 组装时跳过风格字段
    // 完整版：调用轻量规则或 LLM 分析，返回：
    return {
      emojiFrequency: 'heavy' | 'moderate' | 'rare' | 'never',
      avgSentenceLength: number,        // 平均句子长度（字符数）
      commonPhrases: string[],          // 高频短语（"哈哈哈"、"w"、"草"等）
      formalityLevel: 'casual' | 'neutral' | 'formal',
      preferredPunctuation: string[],   // 常用标点（~、…、！！！等）
      lastUpdated: Date
    }
  }
}
// 数据存储：styleProfile 字段已预留于 lowdb 数据结构中
// IPC 通道预留：'user-style:analyze' → 触发分析，'user-style:get' → 获取当前向量
```

---

#### 4.4.7. 关系阶段：硬阈值 → 配置化阈值

| 项目 | 说明 |
|------|------|
| **原型做法** | 阶段推进阈值硬编码在 `relationship-service.js` 中 |
| **完整需求** | 阈值从世界书 JSON 读取，可针对不同角色配置不同推进曲线 |
| **简化原因** | 原型阶段仅一个角色，硬编码更快 |
| **扩展接口** | 阈值配置已在世界书 JSON 中预留 `relationshipsStageThresholds` 字段（见附录 A），`relationship-service.js` 只需改为从配置读取即可 |

```js
// src/main/relationship-service.js — 扩展点
function checkStageUpgrade(stats) {
  // 原型：硬编码阈值
  // 完整版：从 worldbook.character.relationshipsStageThresholds 读取
  const thresholds = loadThresholdsFromWorldBook()  // ← 切换此调用即可
  // ... 比较逻辑不变
}
```

---

#### 4.4.8. 逾期与拖延叙事：简化版 → 完整叙事引擎

| 项目 | 说明 |
|------|------|
| **原型做法** | 任务逾期时角色对话中简单提及，无系统性叙事变化 |
| **完整需求** | 四级逾期叙事（顺利/延期/长期拖延/多次逾期），世界地图区域出现薄雾等视觉反馈，角色台词体现担忧但温和无责罚 |
| **简化原因** | 需要完整的逾期检测定时器 + 多状态视觉资源 |
| **扩展接口** | `src/main/narrative-engine.js` |

```js
// narrative-engine.js — 扩展接口（原型阶段仅处理常规结算叙事）
class NarrativeEngine {
  // 根据任务完成情况生成叙事反馈
  async generateFeedback(task, completionType) {}
  // completionType 枚举：
  //   'on_time'      — 按时完成，"列车准时抵达晨曦站"
  //   'late'         — 延期完成，"列车在暴风雪中晚点到达"
  //   'long_overdue' — 长期拖延，"旅程进入未知区域"
  //   'repeated'     — 多次逾期，"星辰的轨迹发生了偏移，但前方的路依然敞开"
  // 原型阶段仅处理 'on_time' 路径，其余路径直接调用 LLM 动态生成
}
// 世界状态变化映射：
// - overdue → worldState.variables 中添加薄雾标记
// - repeated → 地图区域暂时降低亮度
// 完整版的逾期检测在 proactive-trigger.js（4.4.2）中间接实现
```

---

#### 4.4.9. 四项完全不做（原型范围外）

以下功能原型阶段不实现，也不预留代码接口（因改动范围太大，需要在架构层重新设计）：

| 功能 | 原因 |
|------|------|
| 多角色支持 | 原型仅一个角色，角色切换涉及 UI 层、数据层、Prompt 组装全面改动 |
| 语音输入/输出 | 需要音频采集 + ASR/TTS 服务，改动范围大 |
| 用户自定义世界书 | 需要世界书编辑器 UI，工作量相当于一个新模块 |
| 在线同步/多设备 | 架构需改为 C/S 模式，原型阶段纯本地 |
| 首次引导剧情 | 需要完整的新手引导 UI 流程和脚本 |

---

#### 4.4.10. 简化汇总表

| 编号 | 功能点 | 原型程度 | 扩展方式 |
|------|--------|----------|----------|
| 4.4.1 | 角色渲染 | 图标占位 → Live2D | CharacterRenderer 组件切换 `modelType` |
| 4.4.2 | 主动交互 | 仅手动点击 → 4 种触发源 | ProactiveTrigger 类注册 checker |
| 4.4.3 | 任务后续追问 | 不做 → 1-3 天追问闭环 | Task 数据模型已预留字段 |
| 4.4.4 | 番茄钟循环 | 单次手动 → AI 对话循环 | PomodoroService 扩展方法 + IPC |
| 4.4.5 | 世界地图 | 静态图 → 交互式状态地图 | WorldMap 组件数据驱动 props |
| 4.4.6 | 用户风格学习 | 历史消息原文 → 特征向量 | UserStyleAnalyzer 独立模块 |
| 4.4.7 | 关系阶段阈值 | 硬编码 → 世界书配置 | 世界书 JSON 已预留字段 |
| 4.4.8 | 逾期叙事 | 简单提及 → 四级叙事引擎 | NarrativeEngine 独立模块 |
| 4.4.9 | 多角色/语音/编辑器/同步/引导 | 完全不做 | 架构层重新设计 |

---

## 5. AI 对话引擎设计

### 5.1. DeepSeek API 适配

DeepSeek API 兼容 OpenAI 的 `/v1/chat/completions` 格式，可直接使用。

```js
// src/main/llm-service.js 核心结构
async function chat(sessionId, characterId, message, context) {
  const worldBook = db.getWorldBook()
  const character = db.getCharacter(characterId)
  const relStage = db.getRelationship(characterId)
  const history = db.getRecentMessages(sessionId, 20)

  const systemPrompt = buildSystemPrompt(worldBook, character, relStage)
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: message }
  ]

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      temperature: 0.8,
      max_tokens: 500,
      stream: true    // 流式输出
    })
  })

  return response  // 流式返回给渲染进程
}
```

### 5.2. System Prompt 组装

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

[用户风格]
用户说话特点：{userStyleTags}

[当前上下文]
当前模式：{currentMode}
活跃任务：{activeTaskTitle}

[行为指令]
- 回复控制在 50-100 字
- 在主动互动时，保持简短（不超过 50 字）
- 识别用户切换模式的意图：用户表达"想开始专注/干活/执行任务"等 → 询问是否切换到壁纸模式；用户表达"想看剧情/进度/结算"等 → 询问是否切换到软件模式。切换前**必须征求用户同意**

[任务转化]（仅右键"发布任务"流程注入此段，左键闲聊模式下不含此段）
- 若对话中包含待办事项，使用 /task 指令触发任务转化

[模式切换指令]
当识别到用户有切换模式意图时，先以角色口吻询问确认（如"旅者，要我展开星幕陪你专注吗？"），不要在一条回复中同时包含确认询问和实际切换。用户明确同意后才返回以下 JSON：
{"intent":"switch_mode","mode":"wallpaper"} 或 {"intent":"switch_mode","mode":"software"}
```

### 5.3. 任务转化 Prompt

当用户表达待办事项时，追加指令让 AI 返回结构化 JSON：

```json
{
  "intent": "create_task",
  "realTask": "复习高数第六章",
  "rpgTitle": "攻破高数塔·积分迷宫",
  "rpgDescription": "在魔法学院高塔的第六层...",
  "estimatedPomodoros": 2,
  "estimatedMinutes": 50,
  "subtasks": [
    { "realDesc": "阅读教材", "rpgDesc": "探索迷宫地图" }
  ]
}
```

若 AI 返回格式异常，回退为纯文本显示，不阻塞对话。

### 5.4. 流式输出处理

API 返回 SSE 流，主进程通过 IPC 逐块推送给渲染进程，渲染进程实时更新对话气泡文字。

---

## 6. 开发里程碑

### 第一阶段：基础设施 (Day 1-2)

- [ ] 搭建 Vite 多页面构建配置
- [ ] 实现 Electron 主进程框架（窗口管理、IPC、托盘）
- [ ] 实现 preload 脚本（contextBridge 暴露安全 API）
- [ ] 搭建 lowdb 数据层
- [ ] 实现 DeepSeek API 适配器
- [ ] 生成初始世界书 JSON

### 第二阶段：桌宠模式 (Day 3-5)

- [ ] 透明无边框宠物窗口
- [ ] 角色占位图标 + CSS 动画
- [ ] 对话气泡 UI + 输入交互
- [ ] 接入 DeepSeek 真实对话
- [ ] 任务发布与转化流程
- [ ] 迷你任务面板
- [ ] 系统托盘右键菜单

### 第三阶段：壁纸 + 软件模式 (Day 6-10)

- [ ] 壁纸模式全屏窗口 + 角色展示
- [ ] 番茄钟倒计时
- [ ] 白噪音播放
- [ ] 软件模式主界面布局（导航+内容区+角色区）
- [ ] RPG 任务面板
- [ ] 任务结算 + 叙事反馈
- [ ] 世界地图（静态）
- [ ] 角色档案

### 第四阶段：联调与收尾 (Day 11-14)

- [ ] 三模式切换流程完善
- [ ] 数据同步验证
- [ ] 异常处理与回退
- [ ] 类型检查 + lint 通过
- [ ] 基础单元测试

---

## 7. 风险与应对

| 风险 | 可能性 | 影响 | 应对措施 |
|------|--------|------|----------|
| DeepSeek API 流式格式不兼容 | 低 | 高 | 兼容 OpenAI SSE 格式是标准，切换只需改 endpoint |
| 透明窗口鼠标穿透实现复杂 | 中 | 中 | setIgnoreMouseEvents + 角色区域 hitTest 动态计算 |
| 三窗口状态同步延迟 | 中 | 中 | IPC broadcast + Pinia watch，变更即同步 |
| 1-2 周时间不足覆盖三模式 | 中 | 高 | 按优先级裁剪：桌宠 P0 → 软件 P0 → 壁纸 P0 → 各模式 P1 依次降级 |
| 世界书 Prompt 过长导致 token 消耗大 | 低 | 中 | 按需注入：只传当前章节 + 角色设定，世界全貌存为摘要 |
| Electron 打包体积过大 | — | — | 原型阶段不打包，直接用 `npm start` 运行 |

---

## 8. 待确认事项

- **DeepSeek API Key**：接入时需要用户提供
- **角色设计方向**：当前默认角色"露娜·月语"，如设计方向变更，世界书 JSON 可直接修改
- **Live2D 模型交付节点**：模型到位后替换占位图标，CSS 动画直接映射到 Live2D 动作
- **壁纸模式背景图**：原型阶段使用纯色 + CSS 渐变，后续替换为世界章节插画
- **白噪音音频文件**：原型阶段使用免费音效素材（freesound.org 等）

---

## 附录 A：世界书 JSON 结构（易修改版）

世界书文件位于 `assets/worldbooks/default.json`，以下为初始模板：

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
  }
}
```

所有字段均可直接编辑，新增章节在 `storyChapters` 数组末尾追加即可。

---

## 附录 B：角色占位方案

原型阶段使用 SVG 图标 + CSS 动画替代 Live2D：

- **正常态**：圆形银发角色头像（CSS 绘制的简单人物图标）
- **呼吸动画**：`@keyframes breathe` 轻微缩放 (scale 1.0 ↔ 1.05)
- **眨眼动画**：`@keyframes blink` 眼睛区域高度变化
- **互动反馈**：点击时播放弹跳动画 + 颜色轻微变化

后续 Live2D 模型到位后，替换图标容器内的 `<canvas>` 元素即可。
