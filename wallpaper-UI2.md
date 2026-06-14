# 壁纸模式循环视频 — 2026-06-12

## 需求

壁纸模式下，根据当前选中的任务模式（rest / computer / reading / writing）循环播放对应的 MP4 视频作为全屏背景。切换到没有视频的模式时，自动回退到原有 CSS 星空静态背景。

## 目录结构

视频文件存放在项目根目录下的 `assets/wallpapers/` 目录，按模式分子文件夹：

```
assets/wallpapers/
├── rest/         休息.mp4
├── computer/      电脑.mp4
├── reading/       看书.mp4
└── writing/       写字.mp4
```

视频文件名与模式的关系由 `MODE_VIDEO` 映射表定义（见下文），可根据实际文件名自由调整。

## 修改文件

只修改了一个文件：`src/renderer/wallpaper/index.html`。

---

### 修改 A — 新增 CSS 规则 `.wallpaper-video`

**位置**：`<style>` 块内，`.wallpaper-bg-layer` 规则之前。

**插入代码**：

```css
  .wallpaper-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    pointer-events: none;
  }
```

**上下文**（插入在 `body` 规则块的闭合 `}` 之后、`.wallpaper-bg-layer` 之前）：

```css
    overflow: hidden;
    position: relative;
  }

  .wallpaper-video {
    /* 上面 8 行插入此处 */
  }

  .wallpaper-bg-layer {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(107,92,231,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
```

**说明**：
- `position: absolute; inset: 0; width/height: 100%` — 铺满整个窗口
- `object-fit: cover` — 保持视频比例裁剪填充
- `z-index: 0` — 位于 canvas（z-index: 1）和 UI 元素（z-index: 10+）之下
- `pointer-events: none` — 视频不拦截鼠标事件

---

### 修改 B — 新增 `<video>` 元素

**位置**：`<body>` 标签内第一个子元素，在 `<canvas>` 之前。

**插入代码**：

```html
<video id="wallpaperVideo" class="wallpaper-video" muted loop playsinline></video>
```

**上下文**（插入后）：

```html
<body>

<video id="wallpaperVideo" class="wallpaper-video" muted loop playsinline></video>
<canvas id="webglCanvas" style="position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;"></canvas>

<div class="wallpaper-bg-layer"></div>
```

**属性说明**：
- `muted` — 壁纸视频必须静音（浏览器自动播放策略要求）
- `loop` — 循环播放
- `playsinline` — 在移动端内联播放（桌面端无害）
- 初始不设 `src`，由 JS 动态赋值

---

### 修改 C — 新增 JS 视频切换逻辑

**位置**：`<script>` 块内，`setModeLabel` 函数和 `let activeTasks` 声明之前。具体在注释 `// ── State ──`（Unicode 盒绘图字符 U+2500）之后、`let activeTasks = []` 之前。

**插入代码**：

```js
  // ── Wallpaper video ──
  const wallpaperVideo = document.getElementById("wallpaperVideo");
  const MODE_VIDEO = {
    rest: '../../../assets/wallpapers/rest/休息.mp4',
    computer: '../../../assets/wallpapers/computer/电脑.mp4',
    reading: '../../../assets/wallpapers/reading/看书.mp4',
    writing: '../../../assets/wallpapers/writing/写字.mp4',
  };
  let currentVideoMode = null;

  wallpaperVideo.addEventListener('error', function () {
    wallpaperVideo.style.display = 'none';
  });

  function switchWallpaperVideo(mode) {
    if (mode === currentVideoMode) return;
    currentVideoMode = mode;
    const src = MODE_VIDEO[mode];
    if (!src) {
      wallpaperVideo.pause();
      wallpaperVideo.style.display = 'none';
      wallpaperVideo.src = '';
      return;
    }
    wallpaperVideo.style.display = '';
    wallpaperVideo.src = src;
    wallpaperVideo.play().catch(() => {});
  }
```

**上下文**（插入后的完整结构）：

```js
  };

  // ── State ──
  // ── Wallpaper video ──
  const wallpaperVideo = document.getElementById("wallpaperVideo");
  // ... 上面完整的 MODE_VIDEO 和 switchWallpaperVideo 代码 ...

  let activeTasks = [];
  let selectedTaskId = null;
  // ...
```

**逻辑说明**：
- `MODE_VIDEO` — 模式名到视频相对路径的映射。相对路径基准为 `src/renderer/wallpaper/index.html`
- `currentVideoMode` — 缓存当前正在播放的模式，避免重复加载同一视频
- `error` 事件监听 — 视频文件不存在或加载失败时，自动隐藏 `<video>` 元素，回退到 CSS 静态背景
- `switchWallpaperVideo(mode)` — 核心切换函数：
  1. 若模式未变则跳过
  2. 若映射表中无此模式 → 暂停并隐藏视频
  3. 若有映射 → 设置 src、显示元素、开始播放（play() 失败时静默吞错）

---

### 修改 D — 在 `setModeLabel` 中调用视频切换

**位置**：`setModeLabel` 函数体内最后一行，`modeLabelText.className` 赋值之后、函数闭合 `}` 之前。

**插入代码**：

```js
    switchWallpaperVideo(mode);
```

**修改前**：

```js
function setModeLabel(mode) {
    selectedTaskMode = mode;
    modeLabelText.textContent = MODE_LABELS[mode] || MODE_LABELS.rest;
    modeLabelText.className = 'wallpaper-mode-label-text ' + (MODE_CSS_CLASS[mode] || MODE_CSS_CLASS.rest);
  }
```

**修改后**：

```js
function setModeLabel(mode) {
    selectedTaskMode = mode;
    modeLabelText.textContent = MODE_LABELS[mode] || MODE_LABELS.rest;
    modeLabelText.className = 'wallpaper-mode-label-text ' + (MODE_CSS_CLASS[mode] || MODE_CSS_CLASS.rest);
    switchWallpaperVideo(mode);
  }
```

**说明**：`setModeLabel` 是所有模式切换的入口（任务选择、番茄钟开始/结束/暂停、初始化），在此处调用 `switchWallpaperVideo` 即可覆盖所有模式切换场景。

---

## 调用链

```
用户选择任务 → selectTask()
  → setModeLabel(mode)
    → switchWallpaperVideo(mode)
      → 设置 <video>.src → 播放视频

番茄钟开始 → startPomodoroFlow()
  → setModeLabel(selectedTaskMode)
    → switchWallpaperVideo(mode)

番茄钟暂停/结束 → setModeLabel('rest')
  → switchWallpaperVideo('rest')
    → 播放 rest 视频（如果有）或回退 CSS 背景

页面初始化 → setModeLabel('rest')
  → switchWallpaperVideo('rest')（同上）
```

## 如何添加新模式视频

1. 将 MP4 文件放入 `assets/wallpapers/<mode>/` 目录
2. 在 `MODE_VIDEO` 映射中添加对应条目，如：
   ```js
   rest: '../../../assets/wallpapers/rest/你的文件名.mp4',
   ```
   或者修改已有条目的文件名路径
3. 无需其他代码改动

### 修改 E — 修复暂停后恢复时模式不还原的 bug

**问题**：用户在电脑模式（或其他非 rest 模式）下点击"暂停"，番茄钟暂停后模式被改为 `rest`。点击"继续"后，模式没有还原为任务的原始模式（如 `computer`），仍停留在 `rest`。

**根因**：`onPause` 回调中调用了 `setModeLabel('rest')`，该函数内部会执行 `selectedTaskMode = mode`，把 `selectedTaskMode` 覆盖成了 `'rest'`。随后 `onResume` 回调调用 `startPomodoroFlow`，而 `startPomodoroFlow` 中有判断：

```js
if (taskId && selectedTaskMode !== 'rest') {
    setModeLabel(selectedTaskMode);
}
```

由于 `selectedTaskMode` 已被覆盖为 `'rest'`，条件 `selectedTaskMode !== 'rest'` 永远为 `false`，模式的还原逻辑永远不会执行。

**位置**：`<script>` 块内，`pomodoroTimer` 初始化的 `options` 对象中，`onPause` 和 `onResume` 两个回调函数。

**修改前**（约第 624-636 行）：

```js
    onPause: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      isPomodoroRunning = false;
      document.getElementById("changeTaskBtn").style.display = "";
      // Switch to rest mode when paused
      setModeLabel('rest');
    },
    onResume: () => {
      const remaining = pomodoroTimer.getRemaining();
      startPomodoroFlow(remaining, currentPomodoroTaskId);
    },
```

**修改后**：

```js
    onPause: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      isPomodoroRunning = false;
      document.getElementById("changeTaskBtn").style.display = "";
      // Save task mode before switching to rest, so resume can restore it
      window._pausedTaskMode = selectedTaskMode;
      setModeLabel('rest');
    },
    onResume: () => {
      // Restore the task's mode before resuming
      if (window._pausedTaskMode && window._pausedTaskMode !== 'rest') {
        setModeLabel(window._pausedTaskMode);
      }
      window._pausedTaskMode = null;
      const remaining = pomodoroTimer.getRemaining();
      startPomodoroFlow(remaining, currentPomodoroTaskId);
    },
```

**修改要点**：
1. `onPause` 中——在调用 `setModeLabel('rest')` 之前，先把当前 `selectedTaskMode`（任务的实际模式，如 `'computer'`）保存到 `window._pausedTaskMode`
2. `onResume` 中——在调用 `startPomodoroFlow` 之前，检查 `window._pausedTaskMode` 是否存在且不是 `'rest'`，如果是则调用 `setModeLabel` 还原为任务模式，然后清掉临时变量

**逻辑说明**：
- `window._pausedTaskMode` 作为跨回调的临时变量，仅在暂停→恢复之间存活
- 恢复时先还原 `selectedTaskMode`，后续 `startPomodoroFlow` 中的 `if (taskId && selectedTaskMode !== 'rest')` 判断就能正确通过（因为此时 `selectedTaskMode` 已不是 `'rest'`），但即使再次调用 `setModeLabel` 也无害——`switchWallpaperVideo` 内部有 `if (mode === currentVideoMode) return` 的去重逻辑

---

### 修改 F — 删除模式标签文字（"电脑模式"/"看书模式"/"写字模式"/"休息模式"）

**原因**：壁纸视频本身已能区分不同模式，不再需要屏幕上显示文字标签。

**涉及删除的三部分**：

#### F1 — 删除 CSS 样式

**位置**：`<style>` 块内，`.wallpaper-bg-layer` 和 `.wallpaper-char-area` 之间。

**删除内容**（原约第 37-57 行）：

```css
  /* ── Mode label ── */
  .wallpaper-mode-label {
    position: absolute;
    top: 8%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    pointer-events: none;
  }
  .wallpaper-mode-label-text {
    font-size: 48px;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    text-shadow: 0 0 40px rgba(107,92,231,0.6), 0 4px 12px rgba(0,0,0,0.5);
    letter-spacing: 8px;
    transition: all 0.6s ease;
  }
  .wallpaper-mode-label-text.mode--rest { color: rgba(180,200,220,0.85); text-shadow: 0 0 30px rgba(100,140,180,0.4), 0 4px 12px rgba(0,0,0,0.5); }
  .wallpaper-mode-label-text.mode--computer { color: rgba(120,200,255,0.9); text-shadow: 0 0 40px rgba(70,130,255,0.6), 0 4px 12px rgba(0,0,0,0.5); }
  .wallpaper-mode-label-text.mode--reading { color: rgba(160,230,160,0.9); text-shadow: 0 0 40px rgba(80,180,80,0.6), 0 4px 12px rgba(0,0,0,0.5); }
  .wallpaper-mode-label-text.mode--writing { color: rgba(255,200,130,0.9); text-shadow: 0 0 40px rgba(220,150,50,0.6), 0 4px 12px rgba(0,0,0,0.5); }
```

**说明**：整段删除，不留空行。

#### F2 — 删除 HTML 元素

**位置**：`<body>` 内，`<div class="wallpaper-bg-layer">` 之后、`<div class="wallpaper-char-area">` 之前。

**删除内容**（原约 4 行）：

```html
<!-- Mode label -->
<div class="wallpaper-mode-label" id="modeLabel">
  <span class="wallpaper-mode-label-text mode--rest" id="modeLabelText">休息模式</span>
</div>
```

**说明**：整段删除，`.wallpaper-bg-layer` 闭合后直接接 `.wallpaper-char-area`。

#### F3 — 删除 JS 常量和更新 `setModeLabel` 函数

**位置**：`<script>` 块内，`ipc.onEditorApply` 监听之后。

**删除的常量**（原约 12 行）：

```js
  // Mode label constants
  const MODE_LABELS = {
    rest: '休息模式',
    computer: '电脑模式',
    reading: '看书模式',
    writing: '写字模式',
  };
  const MODE_CSS_CLASS = {
    rest: 'mode--rest',
    computer: 'mode--computer',
    reading: 'mode--reading',
    writing: 'mode--writing',
  };
```

**修改前**（`setModeLabel` 函数）：

```js
  // ── Mode label ──
  const modeLabelText = document.getElementById("modeLabelText");
  function setModeLabel(mode) {
    selectedTaskMode = mode;
    modeLabelText.textContent = MODE_LABELS[mode] || MODE_LABELS.rest;
    modeLabelText.className = 'wallpaper-mode-label-text ' + (MODE_CSS_CLASS[mode] || MODE_CSS_CLASS.rest);
    switchWallpaperVideo(mode);
  }
```

**修改后**：

```js
  function setModeLabel(mode) {
    selectedTaskMode = mode;
    switchWallpaperVideo(mode);
  }
```

**说明**：`MODE_LABELS`、`MODE_CSS_CLASS`、`modeLabelText` 全部删除。`setModeLabel` 只保留设置 `selectedTaskMode` 和调用 `switchWallpaperVideo` 两件事。注释 `// ── Mode label ──` 一并删除。

**调用点不变**：`setModeLabel` 在以下位置被调用，无需修改：
- `setModeLabel('rest')` — 初始化（原第 474 行）
- `setModeLabel(mode)` — `selectTask()` 内
- `setModeLabel('rest')` — `deselectTask()` 内
- `setModeLabel(selectedTaskMode)` — `startPomodoroFlow()` 内
- `setModeLabel('rest')` — `onPause` 内
- `setModeLabel(window._pausedTaskMode)` — `onResume` 内
- `setModeLabel('rest')` — `pomodoroEndUnsub` 内
- `setModeLabel('rest')` — `hideExitPanelAndRefresh()` 内
- `setModeLabel('rest')` — `initWallpaper()` 内

---

---

### 修改 G — 根据现实时间自动切换日夜视频

**需求**：6:00-18:00 播放日间视频，18:00-6:00 播放夜间视频。壁纸模式跨分界点时实时自动切换。

**涉及变更**：`MODE_VIDEO` 数据结构、`switchWallpaperVideo` 去重逻辑、新增日夜判断和定时器。

#### G1 — 替换 `MODE_VIDEO` 和 `switchWallpaperVideo`

**位置**：`<script>` 块内，`// ── State ──` 注释之前的 `// ── Wallpaper video ──` 区域。

**修改前**：

```js
  // ── Wallpaper video ──
  const wallpaperVideo = document.getElementById("wallpaperVideo");
  const MODE_VIDEO = {
    rest: '../../../assets/wallpapers/rest/休息.mp4',
    computer: '../../../assets/wallpapers/computer/电脑.mp4',
    reading: '../../../assets/wallpapers/reading/看书.mp4',
    writing: '../../../assets/wallpapers/writing/写字.mp4',
  };
  let currentVideoMode = null;

  wallpaperVideo.addEventListener('error', function () {
    wallpaperVideo.style.display = 'none';
  });

  function switchWallpaperVideo(mode) {
    if (mode === currentVideoMode) return;
    currentVideoMode = mode;
    const src = MODE_VIDEO[mode];
    if (!src) {
      wallpaperVideo.pause();
      wallpaperVideo.style.display = 'none';
      wallpaperVideo.src = '';
      return;
    }
    wallpaperVideo.style.display = '';
    wallpaperVideo.src = src;
    wallpaperVideo.play().catch(() => {});
  }
```

**修改后**：

```js
  // ── Wallpaper video ──
  const wallpaperVideo = document.getElementById("wallpaperVideo");
  const MODE_VIDEO = {
    rest:     { day: '../../../assets/wallpapers/rest/休息-日.mp4',     night: '../../../assets/wallpapers/rest/休息-夜.mp4' },
    computer: { day: '../../../assets/wallpapers/computer/电脑.mp4',   night: '../../../assets/wallpapers/computer/电脑.mp4' },
    reading:  { day: '../../../assets/wallpapers/reading/看书-日.mp4',  night: '../../../assets/wallpapers/reading/看书-日.mp4' },
    writing:  { day: '../../../assets/wallpapers/writing/写字-日.mp4',  night: '../../../assets/wallpapers/writing/写字-日.mp4' },
  };
  let currentVideoSrc = null;
  let dayPeriodTimer = null;

  function getDayPeriod() {
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'day' : 'night';
  }

  function getVideoSrc(mode) {
    const variants = MODE_VIDEO[mode];
    if (!variants) return null;
    const period = getDayPeriod();
    return variants[period] || variants.day || variants.night || null;
  }

  wallpaperVideo.addEventListener('error', function () {
    wallpaperVideo.style.display = 'none';
  });

  function switchWallpaperVideo(mode) {
    const src = getVideoSrc(mode);
    if (src === currentVideoSrc) return;
    currentVideoSrc = src;
    if (!src) {
      wallpaperVideo.pause();
      wallpaperVideo.style.display = 'none';
      wallpaperVideo.src = '';
      return;
    }
    wallpaperVideo.style.display = '';
    wallpaperVideo.src = src;
    wallpaperVideo.play().catch(() => {});
  }

  function scheduleDayPeriodCheck() {
    if (dayPeriodTimer) clearTimeout(dayPeriodTimer);
    const now = new Date();
    const next = new Date(now);
    const hour = now.getHours();
    if (hour < 6) {
      next.setHours(6, 0, 0, 0);
    } else if (hour < 18) {
      next.setHours(18, 0, 0, 0);
    } else {
      next.setDate(next.getDate() + 1);
      next.setHours(6, 0, 0, 0);
    }
    dayPeriodTimer = setTimeout(() => {
      switchWallpaperVideo(selectedTaskMode);
      scheduleDayPeriodCheck();
    }, next.getTime() - now.getTime());
  }

  function stopDayPeriodCheck() {
    if (dayPeriodTimer) {
      clearTimeout(dayPeriodTimer);
      dayPeriodTimer = null;
    }
  }
```

**要点**：
- `MODE_VIDEO` 每个模式改为 `{ day, night }` 对象。某时段没有专用视频时，day/night 填同一路径即可
- `getDayPeriod()` — 6:00 ≤ hour < 18:00 返回 `'day'`，其余 `'night'`
- `getVideoSrc(mode)` — 根据当前时段从 `MODE_VIDEO[mode]` 取对应路径。`variants[period]` 优先，fallback 到 day/night 任一存在值
- `switchWallpaperVideo` 改为比较 `src` 字符串而非 `mode` 名称，这样白天 18:00 到夜间时会正确触发切换
- `scheduleDayPeriodCheck()` — 计算距下一个分界点（6:00 或 18:00）的毫秒数，到点后调用 `switchWallpaperVideo(selectedTaskMode)` 触发切换，再递归调度下一次。`setTimeout` 最长约 12 小时，远低于 JS 约 24.8 天的限制
- `stopDayPeriodCheck()` — 清除定时器

#### G2 — 在初始化和模式切换时启停定时器

**位置 1**：`onModeActivated` 回调内，`initWallpaper()` 调用之后。

**修改前**：

```js
  ipc.onModeActivated((data) => {
    if (data.mode === MODE.WALLPAPER) {
      initWallpaper();
    }
  });
```

**修改后**：

```js
  ipc.onModeActivated((data) => {
    if (data.mode === MODE.WALLPAPER) {
      initWallpaper();
      scheduleDayPeriodCheck();
    }
  });
```

**位置 2**：`onModeDeactivated` 回调内，`whiteNoise.destroy()` 之前。

**修改前**：

```js
  ipc.onModeDeactivated(() => {
    if (whiteNoise) {
      whiteNoise.destroy();
      whiteNoise = null;
    }
  });
```

**修改后**：

```js
  ipc.onModeDeactivated(() => {
    stopDayPeriodCheck();
    if (whiteNoise) {
      whiteNoise.destroy();
      whiteNoise = null;
    }
  });
```

**位置 3**：脚本末尾 `initWallpaper()` 调用之后。

**修改前**：

```js
  initWallpaper();
})();
```

**修改后**：

```js
  initWallpaper();
  scheduleDayPeriodCheck();
})();
```

---

## 如何添加新模式或日夜视频

1. 将视频文件放入 `assets/wallpapers/<mode>/` 目录，命名约定为 `<名称>-日.mp4` 和 `<名称>-夜.mp4`
2. 在 `MODE_VIDEO` 中添加条目：
   ```js
   modename: { day: '../../../assets/wallpapers/modename/xxx-日.mp4', night: '../../../assets/wallpapers/modename/xxx-夜.mp4' },
   ```
3. 若某模式没有日夜区分，day 和 night 填同一路径即可
4. 无需其他代码改动

---

### 修改 H — 双视频元素 + opacity 无缝切换，消除背景闪烁

**问题**：切换模式视频时，`video.src = newSrc` 会立即清空当前帧，新视频加载需要时间，这期间露出 `<body>` 的 CSS 星空背景，造成闪烁。

**第一次尝试（失败）**：用两个 `<video>` + `display: none/''` 交替，在 `canplay` 事件中交换显示。但 `display: none` 的元素不渲染帧，显示出来时第一帧还没就绪，仍然闪烁。

**最终方案**：两个 `<video>` 始终 `display: block`（都能渲染帧），用 `opacity: 0/1` 控制显隐。切换时在新视频（当前 opacity: 0）上加载并播放，等 `playing` 事件 + `requestVideoFrameCallback`（确认视频帧已提交到合成器）后再交换 opacity。旧视频的 `src` 延后一帧清除，避免合成器表面销毁导致 CSS 背景闪现。

#### H1 — HTML 添加第二个 video 元素

**位置**：`<body>` 内，原 `<video id="wallpaperVideo">` 之后。

**修改前**：

```html
<video id="wallpaperVideo" class="wallpaper-video" muted loop playsinline></video>
```

**修改后**：

```html
<video id="wallpaperVideoA" class="wallpaper-video" muted loop playsinline></video>
<video id="wallpaperVideoB" class="wallpaper-video" muted loop playsinline></video>
```

**说明**：
- 两个 video 都不设 `style="display:none;"`——它们始终 `display: block`，靠 CSS 的 `opacity: 0` 初始隐藏
- `wallpaperVideoA` 初始为 active，`wallpaperVideoB` 初始为 loading
- id 改名是为了代码中清晰表达 A/B 角色

#### H2 — CSS 添加默认 opacity: 0

**位置**：`<style>` 块内，`.wallpaper-video` 规则。

**修改前**：

```css
  .wallpaper-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    pointer-events: none;
  }
```

**修改后**：

```css
  .wallpaper-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    pointer-events: none;
    opacity: 0;
  }
```

**说明**：两个 video 初始都不可见。active video 会在 `finishVideoSwitch()` 中设为 `opacity: 1`。

#### H3 — 重写视频切换 JS

**位置**：`<script>` 块内，`// ── Wallpaper video ──` 区域，完整替换。

**修改前**（仅列出有变化的部分）：

```js
  // ── Wallpaper video ──
  const wallpaperVideo = document.getElementById("wallpaperVideo");
  // ... MODE_VIDEO 不变 ...

  wallpaperVideo.addEventListener('error', function () {
    wallpaperVideo.style.display = 'none';
  });

  function switchWallpaperVideo(mode) {
    const src = getVideoSrc(mode);
    if (src === currentVideoSrc) return;
    currentVideoSrc = src;
    if (!src) {
      wallpaperVideo.pause();
      wallpaperVideo.style.display = 'none';
      wallpaperVideo.src = '';
      return;
    }
    wallpaperVideo.style.display = '';
    wallpaperVideo.src = src;
    wallpaperVideo.play().catch(() => {});
  }
```

**修改后**：

```js
  // ── Wallpaper video ──
  const videoA = document.getElementById("wallpaperVideoA");
  const videoB = document.getElementById("wallpaperVideoB");
  // Both videos always display:block so they render frames; only opacity differs.
  // activeVideo is at opacity 1, loadingVideo at opacity 0.
  let activeVideo = videoA;
  let loadingVideo = videoB;
  const MODE_VIDEO = {
    rest:     { day: '../../../assets/wallpapers/rest/休息-日.mp4',     night: '../../../assets/wallpapers/rest/休息-夜.mp4' },
    computer: { day: '../../../assets/wallpapers/computer/电脑.mp4',   night: '../../../assets/wallpapers/computer/电脑.mp4' },
    reading:  { day: '../../../assets/wallpapers/reading/看书-日.mp4',  night: '../../../assets/wallpapers/reading/看书-日.mp4' },
    writing:  { day: '../../../assets/wallpapers/writing/写字-日.mp4',  night: '../../../assets/wallpapers/writing/写字-日.mp4' },
  };
  let currentVideoSrc = null;
  let dayPeriodTimer = null;

  function getDayPeriod() {
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'day' : 'night';
  }

  function getVideoSrc(mode) {
    const variants = MODE_VIDEO[mode];
    if (!variants) return null;
    const period = getDayPeriod();
    return variants[period] || variants.day || variants.night || null;
  }

  videoA.addEventListener('error', function () { videoA.style.opacity = '0'; });
  videoB.addEventListener('error', function () { videoB.style.opacity = '0'; });

  function swapVideos() {
    var temp = activeVideo;
    activeVideo = loadingVideo;
    loadingVideo = temp;
  }

  function finishVideoSwitch() {
    var oldActive = activeVideo;
    activeVideo.style.opacity = '0';
    activeVideo.pause();
    activeVideo.style.zIndex = '0';
    loadingVideo.style.opacity = '1';
    loadingVideo.style.zIndex = '1';
    swapVideos();
    // Defer clearing old video src by one rAF so the compositor doesn't
    // tear down its surface before loadingVideo's first frame is shown.
    requestAnimationFrame(function () { oldActive.src = ''; });
  }

  function switchWallpaperVideo(mode) {
    var src = getVideoSrc(mode);
    if (src === currentVideoSrc) return;
    currentVideoSrc = src;

    // Cancel in-flight preload
    loadingVideo.oncanplay = null;
    loadingVideo.onplaying = null;

    if (!src) {
      activeVideo.pause();
      activeVideo.style.opacity = '0';
      activeVideo.src = '';
      loadingVideo.pause();
      loadingVideo.style.opacity = '0';
      loadingVideo.src = '';
      return;
    }

    loadingVideo.oncanplay = function () {
      loadingVideo.oncanplay = null;
      loadingVideo.onplaying = function () {
        loadingVideo.onplaying = null;
        // Wait for the first video frame to actually reach the compositor
        // before swapping opacity. rAF runs before compositing, so it can't
        // guarantee the decoded frame is ready. requestVideoFrameCallback
        // fires when a frame is presented to the compositor — the correct signal.
        if (loadingVideo.requestVideoFrameCallback) {
          loadingVideo.requestVideoFrameCallback(function () {
            finishVideoSwitch();
          });
        } else {
          // Fallback: wait 2 frames then swap
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { finishVideoSwitch(); });
          });
        }
      };
      var p = loadingVideo.play();
      if (p) p.catch(function () {});
    };
    loadingVideo.src = src;
    loadingVideo.load();
  }
```

**关键逻辑**：

1. **双元素始终渲染**：两个 `<video>` 都保持 `display: block`。active 的 `opacity: 1`，loading 的 `opacity: 0`。loading 视频虽然透明，但浏览器正常解码和渲染帧，GPU 纹理已就绪
2. **切换流程**：
   - 在 `loadingVideo`（opacity: 0）上设置 `src` 并 `load()`
   - `canplay` → `play()` 开始播放（帧在 opacity: 0 下正常渲染）
   - `playing` 事件 → `requestVideoFrameCallback`：等待视频首帧实际提交到合成器后再做 opacity 交换。此 API 在帧呈现后触发，与页面合成周期无关，解决了 rAF 在合成前执行导致的时序错位问题。不支持时 fallback 到双 rAF。
   - `finishVideoSwitch()`：旧视频 opacity → 0、pause；新视频 opacity → 1、z-index 提升。旧视频的 `src` 用 `requestAnimationFrame` 延后一帧再清除，避免合成器表面过早销毁导致闪烁
   - `swapVideos()` 交换指针，下次切换复用另一个元素
3. **取消飞行中的加载**：同时清除 `oncanplay` 和 `onplaying`，快速切换时旧预加载被丢弃
4. **z-index 管理**：新视频 `zIndex: 1`，旧视频 `zIndex: 0`，防止 DOM 顺序导致的叠放问题
5. **无 src 场景**：两个元素都 opacity → 0 并清空 src，同时恢复 body 的 CSS 星空背景（`_showBodyBackground()`）
6. **body 背景管理**：开始加载视频时立即隐藏 body 背景（`_hideBodyBackground()`），防止初始加载期间 CSS 背景穿帮。error 事件中若两个 video 都不可见则恢复背景
7. **错误处理**：error 事件设 `opacity = '0'` 而非 `display: none`，保持渲染管线一致；两个视频都不可见时恢复 CSS 背景

**为什么比 display:none 方案好**：`display: none` 阻止浏览器为元素分配渲染资源。设为 `display: ''` 后，浏览器才开始解码，第一帧有延迟。`opacity: 0` 的元素始终参与渲染管线，帧缓存随时可用，交换 opacity 时无延迟。

**调用点不变**：`switchWallpaperVideo` 的签名和所有调用方不变（`setModeLabel`、`scheduleDayPeriodCheck`）。

---

### 修改 I — 隐藏 body 背景，消除初始加载时的 CSS 背景闪现

**问题**：两个 `<video>` 元素的 CSS 默认都是 `opacity: 0`。进入壁纸模式时，从页面加载到视频首帧提交到合成器之间，body 的紫色星空背景 (`background-image`) 会一直暴露。首次加载视频可能需要数百毫秒，比暂停/恢复时的单帧闪现显眼得多。

**根因**：`switchWallpaperVideo` 开始异步加载视频后，两个 video 仍然都是 opacity 0，直到 `requestVideoFrameCallback` → `finishVideoSwitch` 才把 loadingVideo 切到 opacity 1。整个加载期间 body CSS 背景可见。

**修复**：在开始加载视频时立即隐藏 body 的 `background-image`（用 `window.getComputedStyle` 保存原始值），换成纯暗色。当切换到无视频模式或两个视频都失败时恢复。

#### I1 — 新增背景管理函数和更新 error 事件

**位置**：`<script>` 块内，`videoA.addEventListener('error', ...)` 和 `videoB.addEventListener('error', ...)` 两行之前。

**修改前**：

```js
  videoA.addEventListener('error', function () { videoA.style.opacity = '0'; });
  videoB.addEventListener('error', function () { videoB.style.opacity = '0'; });
```

**修改后**：

```js
  // Hide the CSS starry background when a video will cover it, so it doesn't
  // flash through while the video is loading (both elements start at opacity 0).
  var _bodyBgImage = '';
  function _hideBodyBackground() {
    if (!_bodyBgImage) {
      _bodyBgImage = window.getComputedStyle(document.body).backgroundImage;
    }
    document.body.style.backgroundImage = 'none';
  }
  function _showBodyBackground() {
    if (_bodyBgImage) {
      document.body.style.backgroundImage = _bodyBgImage;
    }
  }

  videoA.addEventListener('error', function () {
    videoA.style.opacity = '0';
    // If both videos ended up invisible, restore the CSS background
    if (videoA.style.opacity === '0' && videoB.style.opacity === '0') {
      _showBodyBackground();
    }
  });
  videoB.addEventListener('error', function () {
    videoB.style.opacity = '0';
    if (videoA.style.opacity === '0' && videoB.style.opacity === '0') {
      _showBodyBackground();
    }
  });
```

**说明**：
- `_hideBodyBackground()` — 首次调用时用 `getComputedStyle` 读取 body 当前的 `background-image` 值并缓存，然后将其设为 `'none'`（body 的 `background-color` CSS 变量作为回退色）
- `_showBodyBackground()` — 恢复缓存的 `background-image`
- error 事件 — 两个视频都不可见时（都 opacity 0），自动恢复 CSS 背景

#### I2 — 在 `switchWallpaperVideo` 中调用背景管理

**位置**：`switchWallpaperVideo` 函数内，`if (!src)` 分支末尾和分支之后。

**修改前**：

```js
    if (!src) {
      activeVideo.pause();
      activeVideo.style.opacity = '0';
      activeVideo.src = '';
      loadingVideo.pause();
      loadingVideo.style.opacity = '0';
      loadingVideo.src = '';
      return;
    }
```

**修改后**：

```js
    if (!src) {
      activeVideo.pause();
      activeVideo.style.opacity = '0';
      activeVideo.src = '';
      loadingVideo.pause();
      loadingVideo.style.opacity = '0';
      loadingVideo.src = '';
      _showBodyBackground();
      return;
    }

    _hideBodyBackground();
```

**要点**：
- 无视频时恢复 CSS 背景（`_showBodyBackground()`）
- 有视频要加载时立即隐藏 CSS 背景（`_hideBodyBackground()`），不等异步加载完成

---

## 容错行为

- **视频文件缺失**：`<video>` 的 `error` 事件触发后自动隐藏视频层（opacity → 0），页面回退到 CSS 星空渐变背景（`body` 上的 `background` 属性）
- **浏览器禁止自动播放**：`play().catch(() => {})` 静默捕获异常
- **模式无视频映射**：`MODE_VIDEO[mode]` 返回 `undefined` 时，走 `if (!src)` 分支，清空两个视频的 src 并设 opacity 为 0
- **快速切换**：新的 `switchWallpaperVideo` 调用会取消前一次未完成的预加载（`oncanplay = null` + `onplaying = null`），确保只有最后一次切换生效

---

### 修改 J — 修复退出壁纸模式再进入后音乐控件消失的 bug

**问题**：首次进入壁纸模式时，白噪音/音乐控件正常显示，可以选曲播放。退出后再进入，音乐控件消失，无法播放音乐。

**根因**：壁纸窗口被 `WindowManager` 缓存在 `Map` 中（`src/main/window-manager.js` 的 `getOrCreateWindow`），退出时不销毁窗口只调用 `win.hide()`，JS 上下文保留。退出时 `onModeDeactivated` 回调调用 `whiteNoise.destroy()` 清除 DOM 并将 `whiteNoise` 设为 `null`。再进入时 `onModeActivated` 只调用 `initWallpaper()`（重新加载任务），没有重建音乐控件。

**位置**：`src/renderer/wallpaper/index.html`，`<script>` 块内。

#### J1 — 将一次性初始化改为可复用函数

**修改前**（约第 773-787 行）：

```js
  // White noise
  let whiteNoise = null;
  ipc.getAudioConfig().then((res) => {
    if (res.ok && res.data.tracks.length) {
      whiteNoise = new WhiteNoiseControl(document.getElementById("audioArea"), {
        tracks: res.data.tracks,
        volume: res.data.soundVolume ?? 0.5,
        currentTrackId: null,
        onVolumeChange: (volume) => {
          ipc.updateWallpaper({ soundVolume: volume });
        },
      });
      whiteNoise.mount();
    }
  });
```

**修改后**：

```js
  // White noise
  let whiteNoise = null;
  async function initWhiteNoise() {
    if (whiteNoise) return;
    const res = await ipc.getAudioConfig();
    if (res.ok && res.data.tracks.length) {
      whiteNoise = new WhiteNoiseControl(document.getElementById("audioArea"), {
        tracks: res.data.tracks,
        volume: res.data.soundVolume ?? 0.5,
        currentTrackId: null,
        onVolumeChange: (volume) => {
          ipc.updateWallpaper({ soundVolume: volume });
        },
      });
      whiteNoise.mount();
    }
  }
  initWhiteNoise();
```

**要点**：
- 将原来的 `.then()` 链改为 `async function initWhiteNoise()`
- 函数开头增加 `if (whiteNoise) return` 守卫，防止重复创建
- 页面首次加载时仍立即调用 `initWhiteNoise()`

#### J2 — 在 mode-activate 回调中重新初始化音乐控件

**位置**：`onModeActivated` 回调内（约第 963-966 行）。

**修改前**：

```js
  ipc.onModeActivated((data) => {
    if (data.mode === MODE.WALLPAPER) {
      initWallpaper();
      scheduleDayPeriodCheck();
    }
  });
```

**修改后**：

```js
  ipc.onModeActivated((data) => {
    if (data.mode === MODE.WALLPAPER) {
      initWallpaper();
      initWhiteNoise();
      scheduleDayPeriodCheck();
    }
  });
```

**逻辑**：退出时 `destroy()` 清空 DOM、`whiteNoise = null` → 再进入时 `initWhiteNoise()` 检测到 `null`，重新创建 `WhiteNoiseControl` 并挂载到 `#audioArea`。守卫判断确保多次切换不会重复创建。
