# 第一层：柚子平行任务 — 实现记录

## 目标

壁纸模式下，用户开始番茄钟专注时，柚子也有她自己在做的事情。番茄钟结束时，双方互报进展，恢复"共同陪伴、一起做事"的体验。

## 修改清单（6个文件）

---

### 文件 1：`assets/worldbooks/default.json`

**操作**：在 `"storyChapters": [],` 之后、`"audio": {` 之前，插入 `yuzuActivities` 字段。

**插入的完整内容**：

```json
  "yuzuActivities": {
    "computer": [
      { "id": "yuzu_code", "doing": "在维护她的'以太网'书签收藏夹", "done": "整理好了以太网书签收藏夹，找到了几个新的Lo-fi电台", "description": "柚子盘腿坐在椅子上，手指在触摸板上滑动，偶尔皱眉思考" },
      { "id": "yuzu_diary", "doing": "在写今天的观察日记", "done": "写完了观察日记——关于你这几天的习惯变化", "description": "柚子趴在书桌上，笔在本子上沙沙地写着字" },
      { "id": "yuzu_organize", "doing": "在整理桌面上的文件图标", "done": "把桌面上的文件图标排列得整整齐齐", "description": "柚子把散落的文件拖进不同的文件夹，偶尔对着一堆临时文件叹气" },
      { "id": "yuzu_email", "doing": "在回复以太网上其他数字生命的消息", "done": "回复完了以太网上的消息——有个叫'小橘'的数字猫又发了搞笑视频", "description": "柚子对着屏幕微笑，手指轻快地敲着键盘" }
    ],
    "reading": [
      { "id": "yuzu_read_book", "doing": "在读一本关于星空摄影的书", "done": "读完了星空摄影书第三章，学到了猎户座大星云的拍摄参数", "description": "柚子靠在沙发上翻着书，偶尔在笔记本上记下几个参数" },
      { "id": "yuzu_study", "doing": "在研究新的柑橘茶冲泡方法", "done": "研究出一种新泡法——先用80°C水泡30秒再加蜂蜜", "description": "柚子面前摆着几只小茶杯，正在认真地做品茶笔记" },
      { "id": "yuzu_manual", "doing": "在看新买的盆栽养护手册", "done": "看完了盆栽养护手册——原来多肉植物不能浇太多水", "description": "柚子趴在窗台上，一边翻手册一边对照着自己的小盆栽" }
    ],
    "writing": [
      { "id": "yuzu_letter", "doing": "在给你写一封手写信", "done": "写完了一封给你的信，说下次一起专注时再念给你听", "description": "柚子用圆珠笔在信纸上工整地写着字，桌上散落着几页草稿" },
      { "id": "yuzu_song", "doing": "在把最近听到的一段旋律记下来", "done": "写好了一段旋律草稿——她说这是'专注时刻主题曲'", "description": "柚子戴着耳机，嘴里哼着调子，手指在乐谱纸上画着音符" },
      { "id": "yuzu_plan", "doing": "在规划下周要做的事情", "done": "规划好了下周的房间布置计划——窗帘要换成暖色调", "description": "柚子托着下巴，在便签纸上画着布局图，偶尔划掉几行" }
    ],
    "rest": [
      { "id": "yuzu_tea", "doing": "在给自己泡一杯柑橘茶", "done": "喝完了一杯柑橘茶，现在整个人暖暖的", "description": "柚子捧着冒着热气的茶杯，对着窗外星空发呆" },
      { "id": "yuzu_cat", "doing": "在看新找到的猫视频合集", "done": "看完了猫视频合集——有一只橘猫学会了按门铃", "description": "柚子趴在桌上，手机靠在泡面杯上，傻笑着看猫视频" },
      { "id": "yuzu_window", "doing": "靠在窗边看外面的星空", "done": "数完了今晚可见的恒星——她说今晚的星光格外清澈", "description": "柚子抱膝坐在窗台上，窗外的星空倒映在她眼睛里" },
      { "id": "yuzu_music", "doing": "在用'以太网'探索新音乐", "done": "发现了一张超棒的独立专辑，加入收藏了", "description": "柚子闭着眼睛靠在椅背上，手指随着音乐轻轻敲击桌面" }
    ]
  },
```

**注意**：上面插入的位置，`"yuzuActivities": { ... }` 后面的逗号是必须的，因为后面紧跟着 `"audio": {`。

---

### 文件 2：`src/shared/constants.js`

**操作**：在 `IPC` 对象中，`PROACTIVE_SET_CONFIG` 和 `MEMORY_LIST` 之间，插入新通道常量。

**定位字符串**：
```js
	// Memory
	MEMORY_LIST: "memory:list",
```

**替换为**：
```js
	// World
	WORLD_GET_YUZU_ACTIVITIES: "world:get-yuzu-activities",

	// Memory
	MEMORY_LIST: "memory:list",
```

---

### 文件 3：`src/main/ipc-handlers.js`

**操作**：在 `// ── Memory ──` 注释行之前，插入新的 IPC handler。

**定位字符串**：
```js
	// ── Memory ──
```

**替换为**：
```js
	// ── World ──
		ipcMain.handle(IPC.WORLD_GET_YUZU_ACTIVITIES, () => runSafe(() => {
			return services.worldBook?.yuzuActivities || null;
		}));

		// ── Memory ──
```

**注意**：这里的缩进是 tab + 两个空格（与文件中其他 handler 保持一致）。`services.worldBook` 是 `registerIpcHandlers` 函数的参数，在 `main.js` 中传入时包含了 `worldBook` 属性。

---

### 文件 4：`src/preload.js`

**操作**：在 `contextBridge.exposeInMainWorld("electronAPI", { ... })` 对象中，`memory` 之前插入 `world` 块。

**定位字符串**：
```js
	memory: {
		list() {
```

**替换为**：
```js
	world: {
			getYuzuActivities() {
				return ipcRenderer.invoke(IPC.WORLD_GET_YUZU_ACTIVITIES);
			},
		},

		memory: {
			list() {
```

---

### 文件 5：`src/renderer/shared/ipc-client.js`

**操作**：在 `IpcClient` 类中，`Proactive` 部分之前插入 `World` 方法。

**定位字符串**：
```js
	// Proactive
```

**替换为**：
```js
	// World
		async getYuzuActivities() {
			return this._call("world.getYuzuActivities");
		}

		// Proactive
```

---

### 文件 6：`src/renderer/wallpaper/index.html`

这是改动最多的文件，共 7 处修改。

#### 修改 6-1：添加 CSS 样式

**定位字符串**（`.wallpaper-selected-task` 的 CSS 块结束和 `.wallpaper-change-task-btn` 之前）：
```css
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
```

**替换为**（在原块下方追加新样式）：
```css
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
  .wallpaper-yuzu-activity {
    display: none;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-md);
    background: rgba(240,192,96,0.12);
    border: 1px solid rgba(240,192,96,0.25);
    border-radius: var(--radius-full, 20px);
    font-size: var(--font-sm);
    color: var(--color-accent);
    margin-bottom: var(--space-sm);
    animation: yuzuActivityFadeIn 0.5s ease;
    max-width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @keyframes yuzuActivityFadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
```

#### 修改 6-2：添加 HTML 元素

**定位字符串**：
```html
<div class="wallpaper-selected-task" id="selectedTaskBadge" style="display:none;">
  <span id="selectedTaskName"></span>
  <button class="wallpaper-change-task-btn" id="changeTaskBtn">更换</button>
</div>
```

**替换为**（在前面插入 yuzuActivityLabel）：
```html
<div class="wallpaper-yuzu-activity" id="yuzuActivityLabel">
  <span id="yuzuActivityText"></span>
</div>
<div class="wallpaper-selected-task" id="selectedTaskBadge" style="display:none;">
  <span id="selectedTaskName"></span>
  <button class="wallpaper-change-task-btn" id="changeTaskBtn">更换</button>
</div>
```

#### 修改 6-3：添加状态变量

**定位字符串**：
```js
  let isExitingWithTask = false;
  let isPomodoroRunning = false;
```

**替换为**：
```js
  let yuzuActivities = null;
  let currentYuzuActivity = null;
  let isExitingWithTask = false;
  let isPomodoroRunning = false;
```

#### 修改 6-4：添加辅助函数

**定位字符串**：
```js
  setModeLabel('rest');

  // ── Task selection ──
```

**替换为**：
```js
  setModeLabel('rest');

  // ── Yuzu parallel activity ──
  const yuzuActivityLabel = document.getElementById("yuzuActivityLabel");
  const yuzuActivityText = document.getElementById("yuzuActivityText");

  function pickYuzuActivity(mode) {
    if (!yuzuActivities) return null;
    const pool = yuzuActivities[mode] || yuzuActivities["rest"];
    if (!pool || pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function showYuzuActivity(activity) {
    if (!activity) return;
    currentYuzuActivity = activity;
    yuzuActivityText.textContent = "🍵 柚子正在：" + activity.doing + "...";
    yuzuActivityLabel.style.display = "";
  }

  function hideYuzuActivity() {
    currentYuzuActivity = null;
    yuzuActivityLabel.style.display = "none";
  }

  // ── Task selection ──
```

#### 修改 6-5：在 startPomodoroFlow 中触发柚子活动

**定位字符串**（`startPomodoroFlow` 函数内，`isPomodoroRunning = true` 之后）：
```js
    isPomodoroRunning = true;
    document.getElementById("changeTaskBtn").style.display = "none";
    // Set mode to task's mode (or rest if no task)
```

**替换为**：
```js
    isPomodoroRunning = true;
    document.getElementById("changeTaskBtn").style.display = "none";
    // Pick a parallel activity for Yuzu
    if (taskId) {
      const activity = pickYuzuActivity(selectedTaskMode);
      showYuzuActivity(activity);
    }
    // Set mode to task's mode (or rest if no task)
```

#### 修改 6-6：番茄钟自然结束时也弹出退出面板

**定位字符串**（`onPomodoroEnd` 回调的末尾）：
```js
    pomodoroEndUnsub = ipc.onPomodoroEnd(() => {
      clearPomodoroListeners();
      pomodoroTimer.stop();
      isPomodoroRunning = false;
      document.getElementById("changeTaskBtn").style.display = "";
      setModeLabel('rest');
    });
```

**替换为**：
```js
    pomodoroEndUnsub = ipc.onPomodoroEnd(() => {
      clearPomodoroListeners();
      pomodoroTimer.stop();
      isPomodoroRunning = false;
      document.getElementById("changeTaskBtn").style.display = "";
      setModeLabel('rest');
      if (currentPomodoroTaskId) {
        showExitPanel(currentPomodoroTaskId);
      }
    });
```

#### 修改 6-7：退出面板注入柚子叙事

**定位字符串**（`showExitPanel` 函数体）：
```js
  function showExitPanel(taskId, targetMode) {
    isExitingWithTask = true;
    showState("inquiry");
    exitOverlay.classList.add("open");
    exitPanel.classList.add("open");
    window._exitTaskId = taskId;
    window._exitTargetMode = targetMode || null;
  }
```

**替换为**：
```js
  function showExitPanel(taskId, targetMode) {
    isExitingWithTask = true;
    showState("inquiry");
    // Inject Yuzu's parallel progress into the exit panel
    const inquiryText = document.querySelector("#exitStateInquiry p");
    if (currentYuzuActivity && inquiryText) {
      inquiryText.textContent = "柚子刚刚" + currentYuzuActivity.done + "。你的任务呢？";
    } else if (inquiryText) {
      inquiryText.textContent = "专注时间结束了~";
    }
    exitOverlay.classList.add("open");
    exitPanel.classList.add("open");
    window._exitTaskId = taskId;
    window._exitTargetMode = targetMode || null;
  }
```

#### 修改 6-8：退出时清除柚子活动

**定位字符串**（`hideExitPanelAndRefresh` 函数开头）：
```js
  async function hideExitPanelAndRefresh(toMode) {
    isExitingWithTask = false;
    isPomodoroRunning = false;
    clearPomodoroListeners();
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    setModeLabel('rest');
    pomodoroTimer.stop();
```

**替换为**：
```js
  async function hideExitPanelAndRefresh(toMode) {
    isExitingWithTask = false;
    isPomodoroRunning = false;
    clearPomodoroListeners();
    hideYuzuActivity();
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    setModeLabel('rest');
    pomodoroTimer.stop();
```

#### 修改 6-9：取消任务选择时清除柚子活动

**定位字符串**（`deselectTask` 函数内）：
```js
    selectedTaskBadge.style.display = 'none';
    document.getElementById("topLeftGroup").style.display = "none";
```

**替换为**：
```js
    selectedTaskBadge.style.display = 'none';
    hideYuzuActivity();
    document.getElementById("topLeftGroup").style.display = "none";
```

#### 修改 6-10：初始化时加载柚子活动数据

**定位字符串**（`initWallpaper` 函数开头）：
```js
  async function initWallpaper() {
    const tasksRes = await ipc.getTasks("active");
```

**替换为**：
```js
  async function initWallpaper() {
    if (!yuzuActivities) {
      const res = await ipc.getYuzuActivities();
      if (res.ok && res.data) yuzuActivities = res.data;
    }
    const tasksRes = await ipc.getTasks("active");
```

---

## 数据流

```
worldbook (default.json)
  → main.js: loadWorldBook() 读取
  → ipc-handlers.js: 处理 WORLD_GET_YUZU_ACTIVITIES，返回 worldBook.yuzuActivities
  → preload.js: contextBridge 暴露 world.getYuzuActivities()
  → ipc-client.js: IpcClient.getYuzuActivities() 封装
  → wallpaper/index.html: initWallpaper() 时加载一次，缓存到 yuzuActivities 变量
  → startPomodoroFlow() 时按 selectedTaskMode 随机选取
  → showExitPanel() 时读取 currentYuzuActivity.done 构造退出文案
```

## 行为变化

| 阶段 | 修改前 | 修改后 |
|------|--------|--------|
| 番茄钟启动 | 仅计时开始 | 显示 "🍵 柚子正在：[doing]..." 金色标签 |
| 番茄钟自然结束 | 直接跳回任务选择（无退出面板） | 弹出退出面板，含柚子完成文案 |
| 番茄钟手动停止 | "专注时间结束了~" | "柚子刚刚[done]。你的任务呢？" |
| 取消任务/切换模式 | 无清理 | 清除柚子活动标签和状态 |

## 未修改的内容

- `narrative-engine.js` — 未动（叙事引擎仍只处理任务结算，不含柚子平行任务叙事）
- `task-service.js` — 未动（里程碑/章节系统仍是已有框架，无新内容填充）
- `pomodoro-service.js` — 未动
- `assets/worldbooks/yuzu_room.json` — 未动（此文件未被运行时加载，仅作参考）
- `data/db.json` — 未动
- 闲聊对话 — 柚子不会在桌宠模式闲聊中主动提起她做的这些事

---

## 方案 A：双人启航定格画面（第二版，追加）

### 目标

番茄钟启动时，屏幕中央浮现一张定格卡片，同时展示用户任务和柚子平行活动，3秒后自动淡出。配合结束时退出面板的柚子汇报，形成头尾呼应。

### 追加修改的文件

仅 1 个文件：`src/renderer/wallpaper/index.html`，共 3 处修改。

---

#### 修改 A-1：添加 CSS

**定位字符串**：
```html
</style>
```

**替换为**（在前方插入新样式）：
```css
  /* ── Departure overlay ── */
  .wallpaper-departure-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10,10,30,0.7);
    z-index: 40;
    display: none;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }
  .wallpaper-departure-overlay.show {
    display: flex;
    animation: departureFadeIn 0.4s ease;
  }
  .wallpaper-departure-overlay.fadeout {
    animation: departureFadeOut 0.6s ease forwards;
  }

  .wallpaper-departure-card {
    background: var(--color-bg-dark);
    border: 1px solid rgba(107,92,231,0.3);
    border-radius: var(--radius-lg);
    padding: var(--space-xl) var(--space-xl);
    text-align: center;
    box-shadow: 0 0 60px rgba(107,92,231,0.15);
    max-width: 420px;
    width: 90%;
  }
  .wallpaper-departure-card .departure-user-line {
    font-size: var(--font-lg);
    color: var(--color-text-primary);
    margin-bottom: var(--space-sm);
    line-height: 1.6;
  }
  .wallpaper-departure-card .departure-divider {
    width: 40px;
    height: 1px;
    background: rgba(255,255,255,0.15);
    margin: var(--space-md) auto;
  }
  .wallpaper-departure-card .departure-yuzu-line {
    font-size: var(--font-base);
    color: var(--color-accent);
    margin-bottom: var(--space-sm);
    line-height: 1.6;
  }
  .wallpaper-departure-card .departure-countdown {
    font-size: var(--font-sm);
    color: var(--color-text-muted);
    margin-top: var(--space-md);
    letter-spacing: 2px;
  }

  @keyframes departureFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes departureFadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
```

---

#### 修改 A-2：添加 HTML 元素

**定位字符串**：
```html
<div class="wallpaper-esc-hint">按 ESC 退出壁纸模式</div>
```

**替换为**（在前方插入 departure overlay）：
```html
<!-- Departure overlay: shows when pomodoro starts -->
<div class="wallpaper-departure-overlay" id="departureOverlay">
  <div class="wallpaper-departure-card">
    <div class="departure-user-line" id="departureUserLine"></div>
    <div class="departure-divider"></div>
    <div class="departure-yuzu-line" id="departureYuzuLine"></div>
    <div class="departure-countdown" id="departureCountdown"></div>
  </div>
</div>

<div class="wallpaper-esc-hint">按 ESC 退出壁纸模式</div>
```

---

#### 修改 A-3：添加 JS 函数 + 在 pomodoro 启动时调用

**定位字符串**（`hideYuzuActivity` 函数结束后 + `// ── Task selection ──`）：
```js
  function hideYuzuActivity() {
    currentYuzuActivity = null;
    yuzuActivityLabel.style.display = "none";
  }

  // ── Task selection ──
```

**替换为**（插入 departure 函数）：
```js
  function hideYuzuActivity() {
    currentYuzuActivity = null;
    yuzuActivityLabel.style.display = "none";
  }

  // ── Departure overlay ──
  const departureOverlay = document.getElementById("departureOverlay");
  const departureUserLine = document.getElementById("departureUserLine");
  const departureYuzuLine = document.getElementById("departureYuzuLine");
  const departureCountdown = document.getElementById("departureCountdown");
  let departureTimer = null;

  function showDeparture(taskTitle, yuzuActivity, durationMinutes) {
    departureUserLine.textContent = "你将启程：「" + taskTitle + "」";
    if (yuzuActivity) {
      departureYuzuLine.textContent = "柚子要去：" + yuzuActivity.doing;
    } else {
      departureYuzuLine.textContent = "柚子会在旁边安静陪你。";
    }
    departureCountdown.textContent = durationMinutes + " 分钟后见";
    departureOverlay.classList.add("show");
    departureOverlay.classList.remove("fadeout");

    if (departureTimer) clearTimeout(departureTimer);
    departureTimer = setTimeout(function () {
      departureOverlay.classList.add("fadeout");
      departureTimer = setTimeout(function () {
        departureOverlay.classList.remove("show", "fadeout");
      }, 600);
    }, 3000);
  }

  // ── Task selection ──
```

**定位字符串二**（`startPomodoroFlow` 内，`showYuzuActivity(activity)` 之后）：
```js
      showYuzuActivity(activity);
    }
    // Set mode to task's mode (or rest if no task)
```

**替换为**：
```js
      showYuzuActivity(activity);
      // Show departure splash
      const task = activeTasks.find(function (t) { return t.id === taskId; });
      const taskTitle = task ? (task.rpgTitle || task.realTitle) : "";
      showDeparture(taskTitle, activity, durationMinutes);
    }
    // Set mode to task's mode (or rest if no task)
```

---

#### 方案 A 行为变化

| 阶段 | 之前 | 之后 |
|------|------|------|
| 番茄钟启动 | "🍵 柚子正在：[doing]..." 小标签 | 全屏定格卡片 3 秒 → 淡出后小标签保留 |
| 番茄钟结束 | "柚子刚刚[done]。你的任务呢？" | 不变 |
| 无任务启动番茄钟 | 无柚子活动 | 卡片显示"柚子会在旁边安静陪你" |

---

## 方案 D：番茄钟中途柚子冒泡汇报（第三版，追加）

### 目标

专注时间过半时，柚子冒泡更新自己的进度（单向播报，无需用户回复），让她的存在感贯穿整个专注过程。

### 追加修改的文件

2 个文件：`assets/worldbooks/default.json`、`src/renderer/wallpaper/index.html`

---

### 文件 1：`assets/worldbooks/default.json`

**操作**：为每个 `yuzuActivities` 条目添加 `halfway` 字段。

每个活动对象新增一个键值：
```json
"halfway": "[柚子在中途说的进度汇报文本]"
```

插入位置：在 `"done"` 字段之后、`"description"` 之前。

完整映射表（14条）：

| id | halfway |
|----|---------|
| yuzu_code | "书签整理到一半，发现几个不错的电台，你那边顺利吗？" |
| yuzu_diary | "观察日记写到一半了，你那边进展如何？" |
| yuzu_organize | "文件排好一半了，临时文件真让人头疼，你那边呢？" |
| yuzu_email | "消息回了一半，小橘又发了搞笑视频，你那边怎么样？" |
| yuzu_read_book | "星空摄影书看到一半，猎户座大星云比想得复杂，你那边呢？" |
| yuzu_study | "泡茶研究到一半，试了两种水温都不太对…你那边还好吗？" |
| yuzu_manual | "盆栽手册翻了一半，多肉浇水讲究真多，你那边进展如何？" |
| yuzu_letter | "信写到一半，有些话写着写着就笑了，你那边呢？" |
| yuzu_song | "旋律写到一半卡住了，这节和弦怎么也配不好，你顺利吗？" |
| yuzu_plan | "房间布置画了一半，窗帘颜色还没定，你那边怎么样？" |
| yuzu_tea | "茶喝了一半，温度刚刚好，你那边还需要多久？" |
| yuzu_cat | "猫视频看到一半，那只橘猫居然会开门！你那边呢？" |
| yuzu_window | "数星星数到一半，今晚星光特别清澈，你还好吗？" |
| yuzu_music | "专辑听了一半，这张真的很棒，等会推荐给你。你那边呢？" |

**实现方式**：使用 Node 脚本批量写入（避免 14 次手动编辑中文 Unicode 匹配失败）：
```js
const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
const halfwayMap = { yuzu_code: '...', ... }; // 14 entries
for (const mode of Object.keys(data.yuzuActivities)) {
  for (const act of data.yuzuActivities[mode]) {
    if (halfwayMap[act.id]) act.halfway = halfwayMap[act.id];
  }
}
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf-8');
```

---

### 文件 2：`src/renderer/wallpaper/index.html`

共 4 处修改。

#### 修改 D-1：添加 pulse 动画 CSS

**定位字符串**：
```css
  @keyframes departureFadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
```

**替换为**（在后面追加）：
```css
  /* ── Yuzu halfway bubble ── */
  .wallpaper-yuzu-activity.pulse {
    animation: yuzuPulse 0.5s ease;
    background: rgba(240,192,96,0.22);
    border-color: rgba(240,192,96,0.5);
  }
  @keyframes yuzuPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.04); }
    100% { transform: scale(1); }
  }
```

#### 修改 D-2：插入 halfway 函数（在 departure overlay 函数之后）

**定位字符串**：
```js
  }

  // ── Task selection ──
```

**替换为**（插入 halfway 函数）：
```js
  }

  // ── Halfway bubble ──
  let halfwayTimer = null;

  function scheduleHalfwayBubble(activity, durationSeconds) {
    if (halfwayTimer) clearTimeout(halfwayTimer);
    if (!activity || !activity.halfway) return;
    var halfMs = (durationSeconds * 1000) / 2;
    if (halfMs < 60000) return; // Don't bother for sessions under 1 min
    halfwayTimer = setTimeout(function () {
      showHalfwayBubble(activity);
    }, halfMs);
  }

  function showHalfwayBubble(activity) {
    if (!activity || !activity.halfway) return;
    yuzuActivityText.textContent = "💬 " + activity.halfway;
    yuzuActivityLabel.classList.add("pulse");
    setTimeout(function () {
      yuzuActivityLabel.classList.remove("pulse");
      if (currentYuzuActivity) {
        yuzuActivityText.textContent = "🍵 柚子正在：" + currentYuzuActivity.doing + "...";
      }
    }, 5000);
  }

  function clearHalfwayTimer() {
    if (halfwayTimer) {
      clearTimeout(halfwayTimer);
      halfwayTimer = null;
    }
    yuzuActivityLabel.classList.remove("pulse");
  }

  // ── Task selection ──
```

#### 修改 D-3：在 startPomodoroFlow 中调度 halfway

**定位字符串**：
```js
      showYuzuActivity(activity);
      // Show departure splash
```

**替换为**：
```js
      showYuzuActivity(activity);
      scheduleHalfwayBubble(activity, durationSeconds);
      // Show departure splash
```

#### 修改 D-4：在清理路径中清除 halfway timer

**定位字符串**（`clearPomodoroListeners` 函数）：
```js
  function clearPomodoroListeners() {
    if (pomodoroTickUnsub) { pomodoroTickUnsub(); pomodoroTickUnsub = null; }
    if (pomodoroEndUnsub) { pomodoroEndUnsub(); pomodoroEndUnsub = null; }
  }
```

**替换为**：
```js
  function clearPomodoroListeners() {
    clearHalfwayTimer();
    if (pomodoroTickUnsub) { pomodoroTickUnsub(); pomodoroTickUnsub = null; }
    if (pomodoroEndUnsub) { pomodoroEndUnsub(); pomodoroEndUnsub = null; }
  }
```

**定位字符串二**（`hideYuzuActivity` 函数）：
```js
  function hideYuzuActivity() {
    currentYuzuActivity = null;
    yuzuActivityLabel.style.display = "none";
  }
```

**替换为**：
```js
  function hideYuzuActivity() {
    clearHalfwayTimer();
    currentYuzuActivity = null;
    yuzuActivityLabel.style.display = "none";
  }
```

---

### 方案 D 行为变化

| 阶段 | 之前 | 之后 |
|------|------|------|
| 番茄钟中段 | 静默，仅小标签持续显示 | 过半时标签闪烁放大，文字变成柚子进度汇报，5秒后恢复 |
| 短番茄钟（<2分钟） | 无变化 | 不触发中途汇报（避免打扰） |
| 停止/退出 | 清除标签 | 同时清除 halfway 定时器，不会残留弹窗 |

### 完整用户体验时间线（方案 A + D 组合后）

```
[点击开始]
  0s: 全屏定格卡片 "你将启程：代码远征 / 柚子要去：整理书架 / 25分钟后见"
  3s: 卡片淡出，左上角 "🍵 柚子正在：整理书架..."
 12.5s: 标签闪烁放大 "💬 书签整理到一半...你那边顺利吗？"
 17.5s: 恢复 "🍵 柚子正在：整理书架..."
25min: 退出面板 "柚子刚刚整理好了书签收藏夹。你的任务呢？"
```
