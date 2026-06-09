# Phase 2: Live2D Motion, Proactive Interaction, Long-term Memory

**日期:** 2026-06-09
**状态:** 设计已确认
**TTS 暂缓**

## 概述

在 Phase 1 基础上实现三个新功能：AI 驱动的 Live2D 表情/Motion 切换、截图+空闲检测的主动交互系统、对话摘要+关键词检索的长期记忆。TTS 语音播放暂缓。

---

## 功能 1: Live2D Motion

### 目标
AI 回复时根据情感自动切换 Live2D 角色表情和 motion 动画。

### 方案
AI 在 JSON 回复中输出 `expression` 字段，renderer 的 onDone handler 调用 `charRenderer.setMotion(expression)` 播放对应 motion。

### AI expression → Motion 映射

| AI expression | Motion 组 | 效果 |
|---------------|-----------|------|
| `"happy"` | Flick | 弹跳 |
| `"surprised"` | FlickDown | 惊讶下蹲 |
| `"thinking"` | Idle (随机) | 待机微动 |
| `"shy"` | TapBody (随机) | 身体轻触 |
| 无/未知 | 不变 | 保持当前 |

### System Prompt 扩展
在现有 prompt 的 JSON 输出说明中增加：
```
"expression": "happy|surprised|thinking|shy"
```

### 改动文件
- `src/main/llm-service.js` — prompt 增加 expression 说明，`_parseReply` 提取字段
- `src/renderer/shared/character-renderer.js` — `setMotion()` 扩展 expression→motion 映射
- `src/renderer/pet/index.html` — onDone handler 调用 `charRenderer.setMotion(data.expression)`

### 数据流
```
AI reply JSON
  → _parseReply → { displayText, intent, expression, ... }
    → onDone handler → charRenderer.setMotion(expression)
    → typewriter onChar → Live2D ParamMouthOpenY (已有)
```

---

## 功能 2: 主动交互系统

### 目标
宠物能主动发起对话：空闲问候、任务截止提醒、AI 截图分析后主动说话。

### 方案
新建 `ProactiveService` 替代现有空 `ProactiveTrigger`，每分钟检查一次触发条件。

### 触发条件（OR 关系，满足任一 + cooldown 未过）

1. **空闲问候:** 距上次用户交互 > 15 分钟 → AI 生成一句问候
2. **任务提醒:** 有 active 任务且 deadline 在 30 分钟内 → AI 生成提醒
3. **截图分析:** 距上次分析 > cooldown → `desktopCapturer` 截取桌面 → base64 → LLM Vision API → AI 决定是否说话

### 冷卻機制
触发后 10 分钟内不再触发（可配置）。

### 隐私
截图分析默认关闭。截图仅用于单次 AI 分析，不存储到磁盘。

### 数据库扩展
在 `appState.settings` 中新增：
```js
proactive: {
  enabled: true,
  idleThresholdMin: 15,
  checkIntervalMs: 60000,
  cooldownMs: 600000,
  screenAnalysis: false,
}
```

### 改动文件
- `src/main/proactive-service.js` — **新建**，ProactiveService 类
- `src/main/main.js` — 实例化 ProactiveService，启动定时器
- `src/main/database.js` — settings 增加 proactive 字段
- `src/renderer/pet/index.html` — 监听主动触发事件，显示气泡
- `src/shared/constants.js` — 新增 IPC channels
- `src/renderer/settings/index.html` + `settings-app.js` — 新增 "主动交互" 标签页

### 数据流
```
Main process setInterval(60s)
  → ProactiveService.check()
    → 空闲检测 → LLM chat (简短问候 prompt) → IPC proactive:trigger
    → 任务提醒 → LLM chat (提醒 prompt) → IPC proactive:trigger
    → 截图分析 → desktopCapturer → LLM vision → IPC proactive:trigger
  → renderer 收到 proactive:trigger → showBubble(text)
```

---

## 功能 3: 长期记忆系统

### 目标
对话历史自动摘要，支持关键词检索，将相关记忆注入 system prompt 实现跨会话连贯。

### 方案
轻量级实现：每 8 轮对话后，用 AI 将近期对话压缩为摘要 + 关键词，存入 lowdb。检索时使用关键词匹配（后续可升级为 embedding 向量搜索）。

### 数据结构
```js
// lowdb 新增顶层字段
conversationMemory: [
  {
    id: "mem_xxx",
    createdAt: "ISO",
    summary: "用户正在学习React，遇到了hooks相关的问题...",
    keywords: ["React", "hooks", "前端"],
    sourceConversationId: "conv_xxx",
    messageRange: [0, 8],
  }
]
```

### 运作流程

**摘要生成（每 8 轮对话触发）：**
```
对话轮数 > 8 且 > 上次摘要范围
  → 取最新 8 轮未摘要的消息
    → LLM: "总结以下对话的关键信息，提取 3-5 个关键词"
      → 存入 db.conversationMemory[]
        → 更新摘要范围标记
```

**记忆检索（每次对话前）：**
```
用户发送消息
  → getRelevantMemories(userMessage, limit=5)
    → 关键词匹配: memory.keywords ∩ userMessage 分词
      → 返回匹配摘要列表
        → 注入 system prompt
```

**System Prompt 注入格式：**
```
[相关的历史记忆]
- 2026-06-05: 用户正在开发一个React项目...
- 2026-06-08: 用户喜欢简洁的代码风格...
```

### 检索策略接口
```js
// Phase 2: 关键词匹配
getRelevantMemories(query, limit=5) {
  const queryWords = query.split(/[\s,，。！？]/).filter(w => w.length > 1);
  return memories
    .filter(m => m.keywords.some(kw => queryWords.includes(kw)))
    .slice(-limit);
}

// Future: embedding 向量搜索替换
// getRelevantMemories(query) → embeddingAPI(query) → cosineSimilarity()
```

### 设置页面
在设置窗口中新增 "记忆" 标签页：查看记忆列表、搜索、单条删除、全部清空。

### 改动文件
- `src/main/memory-service.js` — **新建**，MemoryService 类
- `src/main/main.js` — 实例化 MemoryService
- `src/main/llm-service.js` — system prompt 增加记忆注入
- `src/main/ipc-handlers.js` — 新增 memory 相关 handlers
- `src/preload.js` + `src/renderer/shared/ipc-client.js` — memory APIs
- `src/shared/constants.js` — 新增 memory IPC channels
- `src/renderer/settings/index.html` — 新增 "记忆" 标签页
- `src/renderer/settings/settings-app.js` — 记忆管理逻辑

---

## 文件改动汇总

| 文件 | 操作 | 功能 |
|------|------|------|
| `src/main/proactive-service.js` | **新建** | 主动交互服务 |
| `src/main/memory-service.js` | **新建** | 长期记忆服务 |
| `src/main/llm-service.js` | 修改 | expression prompt + 记忆注入 + vision API |
| `src/main/main.js` | 修改 | 实例化 ProactiveService + MemoryService |
| `src/main/database.js` | 修改 | settings 扩展 proactive + 新增 conversationMemory |
| `src/main/ipc-handlers.js` | 修改 | memory CRUD handlers + proactive trigger |
| `src/shared/constants.js` | 修改 | 新增 IPC channels |
| `src/preload.js` | 修改 | memory + proactive APIs |
| `src/renderer/shared/ipc-client.js` | 修改 | memory + proactive client methods |
| `src/renderer/shared/character-renderer.js` | 修改 | setMotion 扩展 |
| `src/renderer/pet/index.html` | 修改 | motion 触发 + proactive 气泡监听 |
| `src/renderer/settings/index.html` | 修改 | 新增 "主动交互" + "记忆" 标签页 |
| `src/renderer/settings/settings-app.js` | 修改 | 新标签页逻辑 |
