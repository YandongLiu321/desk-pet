# Phase 2: Live2D Motion, Proactive Interaction, Memory — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现 AI 驱动 Live2D 表情切换、主动交互系统（空闲+截图+任务提醒）、长期记忆（摘要+关键词检索）

**Architecture:** 三个独立子系统，按依赖顺序实现：Live2D Motion（改动 llm prompts + renderer）→ 主动交互（新建 ProactiveService + scheduler）→ 长期记忆（新建 MemoryService + summarizer）。每个功能独立可测。

**Tech Stack:** Electron 42, vanilla JS, Live2D Cubism SDK 4, DeepSeek API, lowdb 7

---

### Task 1: Live2D Motion — System Prompt 扩展 + 解析

**Files:**
- Modify: `src/main/llm-service.js:25-92` (buildSystemPrompt 和 chat 方法)

- [ ] **Step 1: 在 system prompt 中增加 expression 字段说明**

读取 `llm-service.js` 的 `buildSystemPrompt` 方法。在 chat 模式 prompt 的 JSON 输出说明末尾增加 expression 字段：

找到 chat 模式（非 enableTaskCreation）的 prompt 部分，在 JSON 输出格式说明中添加 `"expression"`。当前 JSON 格式类似：
```
{"displayText":"回复内容","intent":"switch_mode","switchTarget":"wallpaper"}
```

在 `displayText` 说明后增加表达式要求。在 `buildSystemPrompt` 方法中找到 chat 模式的 prompt rules，添加：

```js
rules.push(
  `- 在每条回复末尾输出 JSON：{"displayText":"你对用户说的话（50-100字）[["intent":"create_task","realTask":"..."]]}`,
  `- 根据你的情感从以下选一个 expression：happy（开心时）, surprised（惊讶时）, thinking（思考时）, shy（害羞时）`,
  `- JSON 格式：{..., "expression":"happy"}`,
);
```

具体地，在 `buildSystemPrompt` 的 chat 模式 rules 数组中（约 line 43-52），找到 JSON 输出相关的 rule，修改为：

```js
rules.push(
  `- 回复控制在 50-100 字`,
  `- 在回复末尾输出 JSON（不要用代码块包裹）：`,
  `- 格式：{"displayText":"你的回复","expression":"happy|surprised|thinking|shy"}`,
  `- expression 根据你的情感选择：happy（开心）, surprised（惊讶）, thinking（思考）, shy（害羞）`,
  `- 如果用户表达了模式切换意图：{"displayText":"你的回复","intent":"switch_mode","switchTarget":"wallpaper|software"}`,
);
```

- [ ] **Step 2: 在 `_parseReply` 中提取 expression 字段**

在 `llm-service.js` 中找到 `_parseReply` 或解析 displayText 的逻辑。在提取 `displayText` 和 `intent` 的地方，同步提取 `expression`。找到类似 `const displayText = parsed.displayText` 的代码处，添加：

```js
const expression = parsed.expression || null;
```

在 `chat` 方法的返回数据中增加 `expression` 字段。找到 `onDone` 回调处（约 line 195），在返回对象中添加 `expression`。找到类似：
```js
onDone(fullText, { displayText, intent, switchTarget, taskPayload });
```

改为：
```js
onDone(fullText, { displayText, intent, switchTarget, taskPayload, expression });
```

- [ ] **Step 3: 验证并提交**

```bash
node --check src/main/llm-service.js
git add src/main/llm-service.js
git commit -m "feat: add expression field to AI prompt and reply parsing"
```

---

### Task 2: Live2D Motion — CharacterRenderer 扩展

**Files:**
- Modify: `src/renderer/shared/character-renderer.js:102-117`

- [ ] **Step 1: 扩展 setMotion 方法支持 expression → Live2D motion 映射**

当前 `setMotion` 方法（约 line 103）只处理 `"bounce"` → `startMotion("Flick", 0)`。扩展为：

```js
/** @param {string} name */
setMotion(name) {
  if (this.assetType === "live2d" && this._live2dModel) {
    // AI expression → Live2D motion mapping
    const motionMap = {
      happy:    { group: "Flick",     index: 0 },
      surprised:{ group: "FlickDown", index: 0 },
      thinking: { group: "Idle",      index: Math.floor(Math.random() * 3) },
      shy:      { group: "TapBody",   index: Math.floor(Math.random() * 3) },
      bounce:   { group: "Flick",     index: 0 },  // legacy
    };
    const motion = motionMap[name];
    if (motion) {
      this._live2dModel.startMotion(motion.group, motion.index);
    }
    return;
  }
  // CSS fallback
  const wrapper = this.container.querySelector(".character-wrapper");
  if (wrapper) {
    wrapper.style.animation =
      name === "bounce"
        ? "bounce 0.3s ease-out"
        : "breathe 3s ease-in-out infinite";
  }
}
```

- [ ] **Step 2: 验证并提交**

```bash
node --check src/renderer/shared/character-renderer.js
git add src/renderer/shared/character-renderer.js
git commit -m "feat: extend setMotion with AI expression to Live2D motion mapping"
```

---

### Task 3: Live2D Motion — Pet 窗口连线

**Files:**
- Modify: `src/renderer/pet/index.html` (onDone handler)

- [ ] **Step 1: 在 onDone handler 中调用 setMotion**

在 pet/index.html 中找到 `onSend` 回调里的 `unsubDone` handler（约 line 340）。在 `data.displayText` 处理后添加 expression 触发：

```js
const unsubDone = ipc.onDone((data) => {
  unsubChunk();
  unsubDone();
  if (convTypewriter) {
    convTypewriter.finalize();
    if (data.displayText) {
      showBubble(data.displayText);
    }
  } else if (data.displayText) {
    convPanel.addMessage("assistant", data.displayText);
    showBubble(data.displayText);
  }
  // Trigger Live2D expression
  if (data.expression) {
    charRenderer.setMotion(data.expression);
  }
  // ... existing intent handling (unchanged)
```

- [ ] **Step 2: 验证并提交**

```bash
git add src/renderer/pet/index.html
git commit -m "feat: wire AI expression to Live2D motion in pet window"
```

---

### Task 4: 主动交互 — IPC 通道 + DB 字段

**Files:**
- Modify: `src/shared/constants.js` (新增 proactive IPC)
- Modify: `src/main/database.js` (settings 扩展 proactive 字段)

- [ ] **Step 1: 在 constants.js 新增 IPC channels**

在 `IPC` 对象中添加：

```js
// Proactive
PROACTIVE_TRIGGER: "proactive:trigger",
PROACTIVE_GET_STATE: "proactive:get-state",
PROACTIVE_SET_CONFIG: "proactive:set-config",
```

- [ ] **Step 2: 在 database.js 的 settings defaults 中新增 proactive 字段**

在 `_defaults().appState.settings` 中添加：

```js
proactiveEnabled: true,
proactiveIdleThresholdMin: 15,
proactiveCooldownMs: 600000,
proactiveScreenAnalysis: false,
```

- [ ] **Step 3: 验证并提交**

```bash
node --check src/shared/constants.js && node --check src/main/database.js
git add src/shared/constants.js src/main/database.js
git commit -m "feat: add proactive IPC channels and settings fields"
```

---

### Task 5: 主动交互 — ProactiveService

**Files:**
- Create: `src/main/proactive-service.js`

- [ ] **Step 1: 创建 ProactiveService 类**

```js
const { IPC } = require("../shared/constants.js");
const { desktopCapturer } = require("electron");

class ProactiveService {
  /**
   * @param {object} deps
   * @param {import('./database').Database} deps.db
   * @param {import('./llm-service').LLMService} deps.llmService
   * @param {(text: string) => void} deps.onTrigger
   */
  constructor({ db, llmService, onTrigger }) {
    this._db = db;
    this._llmService = llmService;
    this._onTrigger = onTrigger || (() => {});
    this._timer = null;
    this._lastTriggerAt = 0;
    this._lastInteractionAt = Date.now();
    this._lastScreenAnalysisAt = 0;
  }

  /** 由 renderer 调用，标记用户有交互 */
  markInteraction() {
    this._lastInteractionAt = Date.now();
  }

  start() {
    const settings = this._db.getSettings();
    const interval = 60000; // 每分钟检查
    this._timer = setInterval(() => this._check(), interval);
  }

  stop() {
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
  }

  async _check() {
    const settings = this._db.getSettings();
    if (!settings.proactiveEnabled) return;

    const now = Date.now();
    const cooldown = settings.proactiveCooldownMs || 600000;
    if (now - this._lastTriggerAt < cooldown) return;

    // 1. 空闲检测
    const idleMs = now - this._lastInteractionAt;
    const idleThreshold = (settings.proactiveIdleThresholdMin || 15) * 60000;
    if (idleMs > idleThreshold) {
      await this._sendGreeting();
      return;
    }

    // 2. 任务截止提醒
    const tasks = this._db.getTasks({ status: "active" });
    for (const task of tasks) {
      if (task.deadline) {
        const deadlineMs = new Date(task.deadline).getTime();
        const remaining = deadlineMs - now;
        if (remaining > 0 && remaining < 30 * 60000) {
          const mins = Math.round(remaining / 60000);
          this._onTrigger(`提醒一下~ "${task.rpgTitle}" 还有 ${mins} 分钟就到截止时间了哦`);
          this._lastTriggerAt = now;
          return;
        }
      }
    }

    // 3. 截图分析（需开启 + cooldown）
    if (settings.proactiveScreenAnalysis) {
      const screenCooldown = 600000; // 10 分钟
      if (now - this._lastScreenAnalysisAt > screenCooldown) {
        this._lastScreenAnalysisAt = now;
        await this._analyzeScreen();
      }
    }
  }

  async _sendGreeting() {
    const now = Date.now();
    const hour = new Date().getHours();
    let timePrefix = "早上";
    if (hour >= 12 && hour < 18) timePrefix = "下午";
    else if (hour >= 18) timePrefix = "晚上";

    try {
      this._llmService.chat(
        { message: `现在时间是${timePrefix}，你已经有一段时间没和用户互动了。请用角色的口吻主动问候用户（20-30字），只输出问候文本，不要JSON。`, enableTaskCreation: false },
        () => {},
        (fullText) => {
          this._onTrigger(fullText.trim());
          this._lastTriggerAt = Date.now();
        },
        () => { this._lastTriggerAt = Date.now(); }
      );
    } catch (e) {
      // 降级：预设问候
      this._onTrigger(`${timePrefix}好啊~ 记得休息一下哦`);
      this._lastTriggerAt = Date.now();
    }
  }

  async _analyzeScreen() {
    try {
      const sources = await desktopCapturer.getSources({ types: ["screen"], thumbnailSize: { width: 640, height: 360 } });
      if (!sources.length) return;
      const dataUrl = sources[0].thumbnail.toDataURL();

      // 调用 LLM Vision API 分析截图
      const apiKey = this._db.getApiKey();
      if (!apiKey) return;

      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "你是一个桌宠角色，正在看用户的屏幕。如果用户在认真工作/学习，你可以简短鼓励（10字以内）。如果用户在娱乐/摸鱼，你可以提醒。如果不需要说话，回复 SKIP。" },
            { role: "user", content: [{ type: "image_url", image_url: { url: dataUrl } }, { type: "text", text: "需要说话吗？" }] },
          ],
          max_tokens: 50,
        }),
      });
      const json = await response.json();
      const text = json.choices?.[0]?.message?.content?.trim() || "";
      if (text && text !== "SKIP") {
        this._onTrigger(text);
        this._lastTriggerAt = Date.now();
      }
    } catch (e) {
      // 截图分析失败静默处理
    }
  }
}

module.exports = { ProactiveService };
```

- [ ] **Step 2: 验证并提交**

```bash
node --check src/main/proactive-service.js
git add src/main/proactive-service.js
git commit -m "feat: add ProactiveService with idle detection, task reminders, screen analysis"
```

---

### Task 6: 主动交互 — Main Process 集成 + IPC Handlers

**Files:**
- Modify: `src/main/main.js` (实例化 ProactiveService)
- Modify: `src/main/ipc-handlers.js` (新增 proactive handlers)
- Modify: `src/preload.js` (新增 proactive APIs)
- Modify: `src/renderer/shared/ipc-client.js` (新增 proactive client methods)

- [ ] **Step 1: 在 main.js 中实例化 ProactiveService**

在 `app.whenReady()` 中，在 `pomodoroService` 创建后添加：

```js
const proactiveService = new ProactiveService({
  db,
  llmService,
  onTrigger: (text) => {
    const win = windowManager.getWindow("pet");
    if (win && !win.isDestroyed()) {
      win.webContents.send(IPC.PROACTIVE_TRIGGER, { text });
    }
  },
});
proactiveService.start();
```

替换现有的 `const proactiveTrigger = new ProactiveTrigger();` 和 `proactiveTrigger.start();`。

- [ ] **Step 2: 在 registerIpcHandlers 的 services 中传入 proactiveService**

在 `registerIpcHandlers` 的第一个参数中添加：

```js
proactiveService,
```

- [ ] **Step 3: 在 ipc-handlers.js 中新增 proactive handlers**

在 `registerIpcHandlers` 函数中添加：

```js
// ── Proactive ──
ipcMain.handle(IPC.PROACTIVE_GET_STATE, () => runSafe(() => ({
  lastTriggerAt: services.proactiveService ? services.proactiveService._lastTriggerAt : 0,
  lastInteractionAt: services.proactiveService ? services.proactiveService._lastInteractionAt : 0,
})));

ipcMain.handle(IPC.PROACTIVE_SET_CONFIG, (_event, { partial }) => runSafe(() => {
  return db.updateSettings(Object.assign({}, partial));
}));

ipcMain.on(IPC.PROACTIVE_TRIGGER, () => {
  if (services.proactiveService) {
    services.proactiveService.markInteraction();
  }
});
```

- [ ] **Step 4: 在 preload.js 中新增 proactive APIs**

在 preload.js 的 `contextBridge.exposeInMainWorld` 中添加 `proactive` 块：

```js
proactive: {
  getState() {
    return ipcRenderer.invoke(IPC.PROACTIVE_GET_STATE);
  },
  setConfig(partial) {
    return ipcRenderer.invoke(IPC.PROACTIVE_SET_CONFIG, { partial });
  },
  markInteraction() {
    ipcRenderer.send(IPC.PROACTIVE_TRIGGER);
  },
  onTrigger(cb) {
    const handler = (_event, data) => cb(data.text);
    ipcRenderer.on(IPC.PROACTIVE_TRIGGER, handler);
    return () => ipcRenderer.removeListener(IPC.PROACTIVE_TRIGGER, handler);
  },
},
```

- [ ] **Step 5: 在 ipc-client.js 中新增 proactive client methods**

在 `IpcClient` 类中添加：

```js
// Proactive
async getProactiveState() {
  return this._call("proactive.getState");
}
async setProactiveConfig(partial) {
  return this._call("proactive.setConfig", partial);
}
markInteraction() {
  this.api?.proactive.markInteraction();
}
onProactiveTrigger(cb) {
  return this.api?.proactive.onTrigger?.(cb);
}
```

- [ ] **Step 6: 验证并提交**

```bash
node --check src/main/main.js && node --check src/main/ipc-handlers.js && node --check src/preload.js && node --check src/renderer/shared/ipc-client.js
git add src/main/main.js src/main/ipc-handlers.js src/preload.js src/renderer/shared/ipc-client.js
git commit -m "feat: integrate ProactiveService with IPC, preload, and main process"
```

---

### Task 7: 主动交互 — Pet 窗口监听

**Files:**
- Modify: `src/renderer/pet/index.html` (新增 proactive 监听 + 交互标记)

- [ ] **Step 1: 在 pet 窗口初始化时添加监听**

在 pet/index.html 的 IIFE 初始化代码中（themeManager init 之后），添加：

```js
// Proactive trigger listener
ipc.onProactiveTrigger((text) => {
  showBubble(text);
});

// Mark interaction on user activity
document.addEventListener("mousedown", () => ipc.markInteraction());
document.addEventListener("keydown", () => ipc.markInteraction());
```

- [ ] **Step 2: 验证并提交**

```bash
git add src/renderer/pet/index.html
git commit -m "feat: listen for proactive triggers and mark user interaction in pet window"
```

---

### Task 8: 长期记忆 — IPC 通道 + DB Schema

**Files:**
- Modify: `src/shared/constants.js` (新增 memory IPC)
- Modify: `src/main/database.js` (新增 conversationMemory 字段 + CRUD)

- [ ] **Step 1: 在 constants.js 新增 memory IPC channels**

```js
// Memory
MEMORY_LIST: "memory:list",
MEMORY_SEARCH: "memory:search",
MEMORY_DELETE: "memory:delete",
MEMORY_CLEAR: "memory:clear",
```

- [ ] **Step 2: 在 database.js 新增 conversationMemory 字段和 CRUD 方法**

在 `_defaults()` 返回对象中添加顶层字段：

```js
conversationMemory: [],
```

在 Database 类中添加方法：

```js
getMemories() {
  this._load();
  return this._data.conversationMemory || [];
}

addMemory(summary, keywords, sourceConvId, msgRangeStart, msgRangeEnd) {
  this._load();
  const mem = {
    id: `mem_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    summary,
    keywords,
    sourceConversationId: sourceConvId,
    messageRange: [msgRangeStart, msgRangeEnd],
  };
  this._data.conversationMemory.push(mem);
  this._persist();
  return mem;
}

deleteMemory(memId) {
  this._load();
  this._data.conversationMemory = (this._data.conversationMemory || []).filter(m => m.id !== memId);
  this._persist();
}

clearMemories() {
  this._load();
  this._data.conversationMemory = [];
  this._persist();
}
```

- [ ] **Step 3: 验证并提交**

```bash
node --check src/shared/constants.js && node --check src/main/database.js
git add src/shared/constants.js src/main/database.js
git commit -m "feat: add memory IPC channels and database schema"
```

---

### Task 9: 长期记忆 — MemoryService

**Files:**
- Create: `src/main/memory-service.js`

- [ ] **Step 1: 创建 MemoryService 类**

```js
class MemoryService {
  /**
   * @param {object} deps
   * @param {import('./database').Database} deps.db
   * @param {import('./llm-service').LLMService} deps.llmService
   */
  constructor({ db, llmService }) {
    this._db = db;
    this._llmService = llmService;
  }

  /** 摘要触发阈值：对话轮数 >= this threshold 且 > 上次摘要范围时触发 */
  shouldSummarize(conversationId) {
    const conv = this._db.getActiveConversation();
    if (!conv || conv.messages.length < 8) return false;
    const memories = this._db.getMemories().filter(m => m.sourceConversationId === conversationId);
    if (!memories.length) return true;
    const maxCovered = Math.max(...memories.map(m => m.messageRange[1]));
    return conv.messages.length > maxCovered + 4;
  }

  /**
   * 摘要最近 N 轮对话
   * @returns {Promise<{summary: string, keywords: string[]}>}
   */
  async summarizeRecent(conversationId) {
    const conv = this._db.getActiveConversation();
    const memories = this._db.getMemories().filter(m => m.sourceConversationId === conversationId);
    const startIdx = memories.length
      ? Math.max(...memories.map(m => m.messageRange[1]))
      : 0;
    const recentMsgs = conv.messages.slice(startIdx, startIdx + 16); // 最多 16 条 = 8 轮
    if (recentMsgs.length < 4) return null;

    const dialogue = recentMsgs.map(m => `${m.role}: ${m.content}`).join("\n");

    return new Promise((resolve) => {
      this._llmService.chat(
        {
          message: `总结以下对话中用户的关键信息和偏好。输出格式：{"summary":"一句话总结","keywords":["关键词1","关键词2","关键词3"]}\n\n对话：\n${dialogue}`,
          enableTaskCreation: false,
        },
        () => {},
        (fullText) => {
          try {
            const json = JSON.parse(fullText.trim());
            resolve({ summary: json.summary || "", keywords: json.keywords || [] });
          } catch {
            resolve({ summary: fullText.trim().slice(0, 200), keywords: [] });
          }
        },
        () => resolve(null)
      );
    });
  }

  /**
   * 关键词匹配检索（Phase 2 实现，后续可升级为 embedding）
   */
  getRelevantMemories(query, limit = 5) {
    const memories = this._db.getMemories();
    const queryWords = query.split(/[\s,，。！？、\n]+/).filter(w => w.length > 1);
    if (!queryWords.length) return memories.slice(-limit);

    const scored = memories.map(m => {
      const matchCount = m.keywords.filter(kw =>
        queryWords.some(qw => kw.includes(qw) || qw.includes(kw))
      ).length;
      return { memory: m, score: matchCount };
    });

    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(s => s.memory);
  }

  /** 将相关记忆格式化为 prompt 注入文本 */
  formatMemoriesForPrompt(memories) {
    if (!memories.length) return "";
    return "\n\n[相关的历史记忆]\n" +
      memories.map(m => `- ${m.createdAt.slice(0, 10)}: ${m.summary}`).join("\n");
  }
}

module.exports = { MemoryService };
```

- [ ] **Step 2: 验证并提交**

```bash
node --check src/main/memory-service.js
git add src/main/memory-service.js
git commit -m "feat: add MemoryService with summarization and keyword search"
```

---

### Task 10: 长期记忆 — Main Process 集成 + IPC Handlers

**Files:**
- Modify: `src/main/main.js` (实例化 MemoryService)
- Modify: `src/main/ipc-handlers.js` (新增 memory handlers)
- Modify: `src/preload.js` (新增 memory APIs)
- Modify: `src/renderer/shared/ipc-client.js` (新增 memory client methods)

- [ ] **Step 1: 在 main.js 中实例化 MemoryService**

在 `app.whenReady()` 中，proactiveService 之后添加：

```js
const memoryService = new MemoryService({ db, llmService });
```

传入 `registerIpcHandlers`：

```js
registerIpcHandlers({
  db, windowManager, llmService, taskService,
  relationshipService, pomodoroService, narrativeEngine,
  worldBook, switchModeWithCleanup, editorWindowManager,
  proactiveService, memoryService,
}, { ipcMain, BrowserWindow });
```

- [ ] **Step 2: 在 ipc-handlers.js 中新增 memory handlers**

```js
// ── Memory ──
ipcMain.handle(IPC.MEMORY_LIST, () => runSafe(() => services.memoryService ? db.getMemories() : []));

ipcMain.handle(IPC.MEMORY_SEARCH, (_event, { query, limit }) => runSafe(() => {
  if (!services.memoryService) return [];
  return services.memoryService.getRelevantMemories(query, limit || 5);
}));

ipcMain.handle(IPC.MEMORY_DELETE, (_event, { memId }) => runSafe(() => {
  db.deleteMemory(memId);
  return null;
}));

ipcMain.handle(IPC.MEMORY_CLEAR, () => runSafe(() => {
  db.clearMemories();
  return null;
}));
```

- [ ] **Step 3: 在 preload.js 中新增 memory APIs**

```js
memory: {
  list() {
    return ipcRenderer.invoke(IPC.MEMORY_LIST);
  },
  search(query, limit) {
    return ipcRenderer.invoke(IPC.MEMORY_SEARCH, { query, limit });
  },
  delete(memId) {
    return ipcRenderer.invoke(IPC.MEMORY_DELETE, { memId });
  },
  clear() {
    return ipcRenderer.invoke(IPC.MEMORY_CLEAR);
  },
},
```

- [ ] **Step 4: 在 ipc-client.js 中新增 memory client methods**

```js
// Memory
async getMemories() {
  return this._call("memory.list");
}
async searchMemories(query, limit) {
  return this._call("memory.search", query, limit);
}
async deleteMemory(memId) {
  return this._call("memory.delete", memId);
}
async clearMemories() {
  return this._call("memory.clear");
}
```

- [ ] **Step 5: 验证并提交**

```bash
node --check src/main/main.js && node --check src/main/ipc-handlers.js && node --check src/preload.js && node --check src/renderer/shared/ipc-client.js
git add src/main/main.js src/main/ipc-handlers.js src/preload.js src/renderer/shared/ipc-client.js
git commit -m "feat: integrate MemoryService with IPC, preload, and main process"
```

---

### Task 11: 长期记忆 — System Prompt 注入 + 自动摘要

**Files:**
- Modify: `src/main/llm-service.js` (buildSystemPrompt 注入记忆 + chat 方法触发摘要)

- [ ] **Step 1: 在 buildSystemPrompt 中注入相关记忆**

在 `buildSystemPrompt` 方法的返回值拼接处，注入记忆。在方法末尾 return 之前：

```js
buildSystemPrompt(context) {
  // ... existing code ...

  let prompt = `${char.name} 是 ${char.personality}...`; // existing prompt assembly

  // Inject relevant memories
  if (context.userMessage) {
    const memories = this._memoryService
      ? this._memoryService.getRelevantMemories(context.userMessage, 3)
      : [];
    if (memories.length) {
      prompt += this._memoryService.formatMemoriesForPrompt(memories);
    }
  }

  return prompt;
}
```

需要在 LLMService 构造函数中接收 `memoryService`：

```js
constructor(config) {
  this.apiKey = config.apiKey;
  this.db = config.db;
  this.worldBook = config.worldBook;
  this._memoryService = config.memoryService || null;
  // ...
}
```

在 `main.js` 中传入：

```js
const llmService = new LLMService({ apiKey, db, worldBook, memoryService });
```

- [ ] **Step 2: 在对话完成后触发自动摘要**

在 `llm-service.js` 的 `chat` 方法中，在 `onDone` 回调触发后检查是否需要摘要：

```js
// After onDone, trigger auto-summarize if threshold reached
if (this._memoryService) {
  const conv = this.db.getActiveConversation();
  if (this._memoryService.shouldSummarize(conv.id)) {
    this._memoryService.summarizeRecent(conv.id).then((result) => {
      if (result && result.summary) {
        const startIdx = conv.messages.length - Math.min(16, conv.messages.length);
        this.db.addMemory(result.summary, result.keywords, conv.id, startIdx, conv.messages.length);
      }
    }).catch(() => {}); // 静默失败
  }
}
```

- [ ] **Step 3: 验证并提交**

```bash
node --check src/main/llm-service.js && node --check src/main/main.js
git add src/main/llm-service.js src/main/main.js
git commit -m "feat: inject memories into system prompt and auto-summarize conversations"
```

---

### Task 12: 设置窗口 — 主动交互 + 记忆标签页

**Files:**
- Modify: `src/renderer/settings/index.html` (新增两个标签页)
- Modify: `src/renderer/settings/settings-app.js` (新增对应 JS 逻辑)

- [ ] **Step 1: 在 settings/index.html 添加 "主动交互" 标签页**

在 sidebar 按钮列表和 content 区域中添加：

Sidebar（在 "番茄钟" tab 之后）:
```html
<button class="settings-tab" data-tab="proactive">
  <span class="settings-tab-icon">🔔</span> 主动交互
</button>
<button class="settings-tab" data-tab="memory">
  <span class="settings-tab-icon">🧠</span> 记忆
</button>
```

Content（在 pomodoro page 之后，button row 之前）:
```html
<div class="settings-page" data-page="proactive">
  <h2>主动交互</h2>
  <p class="subtitle">宠物主动问候和提醒设置</p>
  <div class="settings-toggle">
    <label>启用主动交互</label>
    <input type="checkbox" id="proactiveEnabled" checked>
  </div>
  <div class="settings-field">
    <label>空闲触发阈值 (分钟)</label>
    <input type="number" id="proactiveIdleThresholdMin" min="5" max="120" value="15">
  </div>
  <div class="settings-field">
    <label>触发冷却 (分钟)</label>
    <input type="number" id="proactiveCooldownMin" min="1" max="60" value="10">
  </div>
  <div class="settings-toggle">
    <label>截图分析 (隐私敏感，默认关闭)</label>
    <input type="checkbox" id="proactiveScreenAnalysis">
  </div>
</div>

<div class="settings-page" data-page="memory">
  <h2>记忆</h2>
  <p class="subtitle">AI 自动生成的对话摘要记忆</p>
  <div id="memoryList" style="max-height:300px;overflow-y:auto;"></div>
  <div class="settings-btn-row" style="margin-top:var(--space-md);border-top:none;">
    <button class="btn btn-secondary" id="refreshMemoriesBtn">刷新</button>
    <button class="btn btn-danger" id="clearMemoriesBtn">清空全部记忆</button>
  </div>
</div>
```

- [ ] **Step 2: 在 settings-app.js 中添加对应逻辑**

在 `loadSettings` 中添加主动交互字段加载：

```js
// Proactive (convert ms to minutes for display)
document.getElementById('proactiveEnabled').checked = s.proactiveEnabled !== false;
document.getElementById('proactiveIdleThresholdMin').value = s.proactiveIdleThresholdMin || 15;
document.getElementById('proactiveCooldownMin').value = Math.round((s.proactiveCooldownMs || 600000) / 60000);
document.getElementById('proactiveScreenAnalysis').checked = s.proactiveScreenAnalysis === true;
```

在 `saveBtn` 的 partial 中添加：

```js
proactiveEnabled: document.getElementById('proactiveEnabled').checked,
proactiveIdleThresholdMin: parseInt(document.getElementById('proactiveIdleThresholdMin').value, 10),
proactiveCooldownMs: parseInt(document.getElementById('proactiveCooldownMin').value, 10) * 60000,
proactiveScreenAnalysis: document.getElementById('proactiveScreenAnalysis').checked,
```

添加记忆管理逻辑：

```js
// Memory tab
async function refreshMemories() {
  const res = await ipc.getMemories();
  const container = document.getElementById('memoryList');
  if (!res.ok || !res.data.length) {
    container.innerHTML = '<p style="color:var(--color-text-muted);font-size:var(--font-sm);">暂无记忆</p>';
    return;
  }
  container.innerHTML = res.data.map(m => `
    <div style="background:var(--color-bg-secondary);border-radius:var(--radius-sm);padding:var(--space-sm);margin-bottom:var(--space-xs);">
      <div style="font-size:var(--font-sm);color:var(--color-text-primary);">${m.summary}</div>
      <div style="font-size:var(--font-xs);color:var(--color-text-muted);margin-top:4px;">
        ${m.keywords.join(', ')} · ${m.createdAt.slice(0, 10)}
        <button data-mem-id="${m.id}" class="delete-mem-btn" style="float:right;background:none;border:none;color:var(--color-danger);cursor:pointer;font-size:var(--font-xs);">删除</button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.delete-mem-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await ipc.deleteMemory(btn.dataset.memId);
      refreshMemories();
    });
  });
}

document.getElementById('refreshMemoriesBtn').addEventListener('click', refreshMemories);
document.getElementById('clearMemoriesBtn').addEventListener('click', async () => {
  await ipc.clearMemories();
  refreshMemories();
  showToast('记忆已清空');
});

// Load memories when switching to memory tab
document.querySelector('[data-tab="memory"]').addEventListener('click', refreshMemories);
```

- [ ] **Step 3: 验证并提交**

```bash
node --check src/renderer/settings/settings-app.js
git add src/renderer/settings/index.html src/renderer/settings/settings-app.js
git commit -m "feat: add proactive and memory tabs to settings window"
```

---

### Task 13: 端到端验证

- [ ] **Step 1: 验证 Live2D Motion**

1. 发送一条开心的消息给 AI
2. 检查 AI 返回的 JSON 是否包含 `"expression":"happy"`
3. 检查角色是否播放了 Flick motion

- [ ] **Step 2: 验证主动交互**

1. 等待 15 分钟不操作 → 检查是否有问候气泡
2. 创建一个 deadline 在 30 分钟内的任务 → 检查是否有提醒
3. 在设置中调整参数 → 保存 → 验证

- [ ] **Step 3: 验证长期记忆**

1. 与 AI 对话 8+ 轮
2. 打开设置 → 记忆标签页 → 查看是否有摘要生成
3. 新对话中提到之前的话题 → 检查 AI 是否引用记忆

- [ ] **Step 4: 语法检查和提交**

```bash
node --check src/main/llm-service.js && node --check src/main/proactive-service.js && node --check src/main/memory-service.js && node --check src/main/main.js && node --check src/main/ipc-handlers.js && node --check src/preload.js && node --check src/renderer/shared/ipc-client.js && node --check src/renderer/settings/settings-app.js && node --check src/renderer/shared/character-renderer.js && echo "All syntax OK"
git add -A
git commit -m "chore: end-to-end verification and fixes for Phase 2"
```
