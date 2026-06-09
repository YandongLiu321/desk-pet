# Wallpaper Fixes — Summary

This document describes 7 fixes applied to the desk-pet wallpaper mode, listed in chronological order.

## Fix Index

| # | Fix | Files | Type |
|---|---|---|---|
| 1 | [Wallpaper Task Selection Disappearing](#1-wallpaper-task-selection-disappearing-fix) | `wallpaper/index.html` | Bug: state not reset |
| 2 | [Task Mode LLM Not Outputting JSON](#2-task-mode-llm-not-outputting-json-fix) | `llm-service.js` | Bug: history contamination |
| 3 | [ESC Key Shows Exit Panel on Fresh Entry](#3-esc-key-in-wallpaper-mode-shows-exit-panel-on-fresh-entry) | `wallpaper/index.html` | Bug: stale backend state |
| 4 | [Editable Pomodoro Time After Task Selection](#4-editable-pomodoro-time-after-task-selection-in-wallpaper-mode) | `pomodoro-timer.js`, `wallpaper/index.html` | Feature: time editor UI |
| 5 | [Stop Button Should Show Exit Panel](#5-stop-button-should-show-exit-panel-same-as-esc) | `wallpaper/index.html` | UX: consistency with ESC |
| 6 | [Hide "更换" Button During Active Pomodoro](#6-hide-更换-button-during-active-pomodoro) | `wallpaper/index.html` | UX: visual cleanup |
| 7 | [Per-Subtask Progress Independence](#7-per-subtask-progress-independence-fix) | 6 files | Bug: progress leak across subtasks |

Fixes 1–6 apply to existing code; Fix 7 introduces a new data model concept (per-subtask `cumulativeProgress`) and updates 6 files across the full stack (database → service → IPC bridge → renderer).

**Important ordering note**: Fix 4 Change 2d (`hideExitPanelAndRefresh`) depends on Fix 1 having already added `isPomodoroRunning = false` and `clearPomodoroListeners()`. Fix 5's `onStop` diff assumes Fix 4's `pomodoroTimer.stop()` was already present. Apply in order 1→7.

---

# 1. Wallpaper Task Selection Disappearing Fix

## Problem

After completing a subtask via the exit panel in wallpaper mode and returning to pet mode, the task selection UI (`wallpaper-task-select`) would not appear the next time the user entered wallpaper mode — even though there were still active (incomplete) tasks.

## Root Cause

The frontend variable `isPomodoroRunning` in the wallpaper renderer (`src/renderer/wallpaper/index.html`) was never reset to `false` when the user exited wallpaper mode through the exit panel flow (ESC → "completed" / "not yet" → save progress).

### Detailed flow

1. User selects a task, starts pomodoro → `isPomodoroRunning = true`
2. User presses ESC before pomodoro naturally ends → exit panel appears
3. User clicks "完成了" (completed) or "还没" → "保存并返回"
4. `hideExitPanelAndRefresh()` is called, which switches mode to PET
5. The backend cancels the pomodoro via `switchModeWithCleanup()`, but the wallpaper frontend's `isPomodoroRunning` stays `true`
6. Later, user enters wallpaper mode again → `initWallpaper()` → `renderTaskSelectList()`
7. `renderTaskSelectList()` checks `if (isPomodoroRunning || selectedTaskId)` on its first line
8. Since `isPomodoroRunning` is still `true`, the function sets `taskSelectArea.style.display = 'none'` and returns immediately

The pomodoro listener cleanup (`clearPomodoroListeners()`) was also missed, potentially leaving stale IPC listeners.

## Fix

**File**: `src/renderer/wallpaper/index.html`

**Location**: Inside the `hideExitPanelAndRefresh` function (approximately line 834)

**Change**: Add two lines after `isExitingWithTask = false;`

### Before

```javascript
  async function hideExitPanelAndRefresh(toMode) {
    isExitingWithTask = false;
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    setModeLabel('rest');
```

### After

```javascript
  async function hideExitPanelAndRefresh(toMode) {
    isExitingWithTask = false;
    isPomodoroRunning = false;
    clearPomodoroListeners();
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    setModeLabel('rest');
```

### Edit operation (exact old_string → new_string)

Search for:

```
  async function hideExitPanelAndRefresh(toMode) {
    isExitingWithTask = false;
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    setModeLabel('rest');
```

Replace with:

```
  async function hideExitPanelAndRefresh(toMode) {
    isExitingWithTask = false;
    isPomodoroRunning = false;
    clearPomodoroListeners();
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    setModeLabel('rest');
```

## Why these two lines

| Line | Purpose |
|---|---|
| `isPomodoroRunning = false;` | Resets the pomodoro running flag so `renderTaskSelectList()` no longer short-circuits and hides the task list |
| `clearPomodoroListeners();` | Removes stale IPC listeners (`onPomodoroTick`, `onPomodoroEnd`) to prevent memory leaks and unexpected callbacks on the next pomodoro session |

## Affected exit paths (all fixed at once)

All three exit paths from the exit panel go through `hideExitPanelAndRefresh`:

1. **"完成了" button** → `exitCompletedBtn` click handler → `hideExitPanelAndRefresh(MODE.PET)`
2. **"还没" → progress saved** → `exitProgressSaveBtn` click handler → `hideExitPanelAndRefresh(MODE.PET)`
3. **Click outside the exit panel** → `exitOverlay` click handler → `hideExitPanelAndRefresh()`

## Contrast: paths that were already correct

- **Pomodoro ends naturally**: `pomodoroEndUnsub` callback → `isPomodoroRunning = false` + `clearPomodoroListeners()` ✅
- **User pauses**: `onPause` callback → `isPomodoroRunning = false` + `clearPomodoroListeners()` ✅
- **User stops**: `onStop` callback → `isPomodoroRunning = false` + `clearPomodoroListeners()` ✅
- **Exit panel flow**: `hideExitPanelAndRefresh` → was missing both resets ❌ → now fixed ✅

---

# 2. Task Mode LLM Not Outputting JSON Fix

## Problem

In pet mode, after chatting normally with the AI (roleplay conversation), switching to task mode (任务发布模式) and describing a task would NOT cause the AI to output the `create_task` JSON. Instead, the AI continued responding with plain roleplay text, ignoring the task creation system prompt entirely. The task was never created.

The user confirmed that the visual indicators were correct — the task mode indicator bar was visible, and the input placeholder showed "描述你要发布的任务...". The `isTaskMode` flag was `true` on the frontend.

## Evidence from conversation history

| Date | Context | User message | AI response |
|---|---|---|---|
| 2026-06-08 | Fresh conversation, task mode | "我要背两页单词" | Roleplay + `create_task` JSON ✅ |
| 2026-06-08 | Task mode (1 prior task msg) | "我要写一小时代码" | Roleplay + `create_task` JSON ✅ |
| 2026-06-09 | After 6 normal chat messages | "我要做两份微积分试卷" | Plain roleplay, NO JSON ❌ |
| 2026-06-09 | Same session | "我要做两份微积分试卷" | Plain roleplay, NO JSON ❌ |
| 2026-06-09 | Same session | "我要写一份微积分试卷" | Plain roleplay, NO JSON ❌ |

The pattern is clear: **task creation works when the conversation starts fresh in task mode, but fails when normal chat messages precede the task mode switch.**

## Root Cause

### Code path verification (no IPC bug)

The `enableTaskCreation` flag is correctly passed through every layer of the IPC chain:

```
pet/index.html           → isTaskMode = true (verified by user seeing indicator)
IpcClient.sendMessage    → _call("conversation.send", message, true)
preload.js               → ipcRenderer.invoke(IPC.CONVERSATION_SEND, { message, enableTaskCreation: true })
ipc-handlers.js          → destructured { message, enableTaskCreation: true } from invoke payload
llm-service.chat         → options = { message: "...", enableTaskCreation: true }
_buildChatMessages       → buildSystemPrompt({ ..., enableTaskCreation: true })
buildSystemPrompt        → const enableTaskCreation = true || false → true → task creation sections pushed
```

Every step is correct. The system prompt containing task creation instructions IS generated and sent to the LLM API.

### Actual cause: conversation history contamination

The real problem is in `_buildChatMessages` at `src/main/llm-service.js:89-104`.

**Before the fix**, the method unconditionally included the last 20 messages from the conversation history, regardless of mode:

```javascript
_buildChatMessages(options) {
    // ...build systemPrompt based on enableTaskCreation...

    const conv = this.db.getActiveConversation();
    const history = this.db.getRecentMessages(conv.id, 20);   // <-- ALWAYS includes history
    return [
        { role: "system", content: systemPrompt },
        ...history.map((m) => ({ role: m.role, content: m.content })),  // <-- history sent to LLM
        { role: "user", content: options.message },
    ];
}
```

The conversation history contained assistant responses from **normal chat mode** — pure roleplay text without JSON. When the user later switched to task mode, the LLM received:

1. **System prompt**: "当前是任务发布模式。你的唯一职责是...输出任务JSON"
2. **History**: 6+ messages where the assistant responded with pure roleplay (no JSON)
3. **User message**: "我要写一份微积分试卷"

The LLM faced a contradiction:
- The system prompt says "you MUST output JSON"
- The conversation history shows the assistant consistently responding WITHOUT JSON to similar work-related messages

LLMs tend to **follow the pattern established in conversation history more strongly than the system prompt**, especially when the history contains many consistent examples of a different behavior. The deepseek-chat model chose to continue the history's pattern (pure roleplay) rather than obey the system prompt.

### Why June 8 worked but June 9 didn't

- **June 8**: The conversation started fresh. The first message was in task mode. The history had ZERO normal-mode messages. The LLM had no conflicting pattern to follow.
- **June 9**: Before entering task mode, the user exchanged 6 normal chat messages (about 段毅恒, 高考, etc.). When the system prompt changed to task mode, the history was full of normal-mode patterns that contradicted the new instructions.

## Fix

**File**: `src/main/llm-service.js`

**Location**: `_buildChatMessages` method (lines 89–109)

**Change**: When `enableTaskCreation` is `true`, do NOT include conversation history in the LLM request. Only send the system prompt and the current user message.

### Before (original code)

```javascript
	_buildChatMessages(options) {
		const appState = this.db.getAppState();
		const activeTask = this.db.getTasks({ status: "active" })[0];
		const systemPrompt = this.buildSystemPrompt({
			currentMode: appState.currentMode,
			activeTask,
			enableTaskCreation: options.enableTaskCreation,
		});
		const conv = this.db.getActiveConversation();
		const history = this.db.getRecentMessages(conv.id, 20);
		return [
			{ role: "system", content: systemPrompt },
			...history.map((m) => ({ role: m.role, content: m.content })),
			{ role: "user", content: options.message },
		];
	}
```

### After (fixed code)

```javascript
	_buildChatMessages(options) {
		const appState = this.db.getAppState();
		const activeTask = this.db.getTasks({ status: "active" })[0];
		const systemPrompt = this.buildSystemPrompt({
			currentMode: appState.currentMode,
			activeTask,
			enableTaskCreation: options.enableTaskCreation,
		});
		const messages = [{ role: "system", content: systemPrompt }];

		if (!options.enableTaskCreation) {
			const conv = this.db.getActiveConversation();
			const history = this.db.getRecentMessages(conv.id, 20);
			for (const m of history) {
				messages.push({ role: m.role, content: m.content });
			}
		}

		messages.push({ role: "user", content: options.message });
		return messages;
	}
```

### Edit operation (exact old_string → new_string)

Search for:

```
		const conv = this.db.getActiveConversation();
		const history = this.db.getRecentMessages(conv.id, 20);
		return [
			{ role: "system", content: systemPrompt },
			...history.map((m) => ({ role: m.role, content: m.content })),
			{ role: "user", content: options.message },
		];
```

Replace with:

```
		const messages = [{ role: "system", content: systemPrompt }];

		if (!options.enableTaskCreation) {
			const conv = this.db.getActiveConversation();
			const history = this.db.getRecentMessages(conv.id, 20);
			for (const m of history) {
				messages.push({ role: m.role, content: m.content });
			}
		}

		messages.push({ role: "user", content: options.message });
		return messages;
```

### Important note on indentation

The file `src/main/llm-service.js` uses **tab characters** for indentation. The `old_string` and `new_string` above use tabs. When applying the edit, make sure the whitespace in the search/replace strings matches exactly.

## Why this fix is safe

1. **Messages are still persisted**: `_persistChatResult()` in `_doChat()` stores both the user message and the assistant response to the database, regardless of `enableTaskCreation`. The conversation history is preserved for future normal-mode interactions.

2. **Normal mode is unaffected**: When `enableTaskCreation` is `false` (normal chat), the full 20-message history is still included, maintaining conversational continuity.

3. **Task mode doesn't need history**: In task creation mode, the user is explicitly describing a task. The AI only needs the current task description and the task creation system prompt. Historical conversation context is not relevant for the task extraction task.

4. **No data loss**: Task creation messages are still stored in the DB. When the user returns to normal mode, the LLM will see the full history including any task creation interactions.

## Data flow diagram

```
User sends message in task mode (isTaskMode = true)
  │
  ▼
_buildChatMessages({ message: "...", enableTaskCreation: true })
  │
  ├─ buildSystemPrompt({ enableTaskCreation: true })
  │   └─ Returns system prompt WITH task creation instructions
  │
  ├─ if (!true) → SKIP history loading   ◄── THE FIX
  │
  └─ Returns: [systemPrompt, userMessage]
       │
       ▼
     LLM API (deepseek-chat)
       │
       ▼
     LLM sees ONLY: system prompt + current task description
     No conflicting history → follows system prompt → outputs JSON
       │
       ▼
     _extractIntent(fullText) → finds create_task JSON
       │
       ▼
     _persistChatResult() → saves both messages to DB
       │
       ▼
     onDone({ intent: "create_task", taskPayload: {...} })
       │
       ▼
     Pet mode creates task: ipc.createTask(taskPayload)
```

## Alternative approaches considered

| Approach | Pros | Cons | Chosen? |
|---|---|---|---|
| **A: Skip history in task mode** | Minimal change, no API overhead, 100% eliminates history contamination | Loses conversational context (not needed for task extraction anyway) | ✅ YES |
| **B: Prefix user message with [任务发布模式]** | Preserves history | Depends on LLM obedience, history pattern still present | ❌ |
| **C: Retry with stronger prompt on failure** | Most robust | Extra API call, latency, cost | ❌ |

---

# 3. ESC Key in Wallpaper Mode Shows Exit Panel on Fresh Entry

## Problem

When entering wallpaper mode for the first time (or re-entering after a previous session), the user is in rest mode with the task selection list visible. No pomodoro has been started yet. Pressing ESC at this point shows the exit panel ("专注时间结束了~" with "完成了/还没完成/再延25分钟" buttons), which makes no sense because the user hasn't started working on any task.

The exit panel should only appear when there IS an active task context — i.e., the user actually started a pomodoro and then either paused it or pressed ESC mid-session.

## Root Cause

**File**: `src/renderer/wallpaper/index.html`, lines 939-943 (ESC keydown handler)

The ESC handler called `ipc.getPomodoroStatus()` which queries the backend `PomodoroService`. The backend service's `stop()` method (in `src/main/pomodoro-service.js`) does NOT clear `_taskId` — it only clears `_timerId`, `_remaining`, and `_totalSeconds`:

```js
// pomodoro-service.js
stop() {
    if (this._timerId) {
        clearInterval(this._timerId);
        this._timerId = null;
    }
    this._remaining = null;
    this._totalSeconds = null;
    // NOTE: this._taskId is NEVER cleared!
}
```

This means a stale `taskId` from a previous pomodoro session persists in the backend. When the user enters wallpaper mode fresh and presses ESC:

1. `getPomodoroStatus()` returns `{ running: false, taskId: "task_xxx_yyy" }` — stale taskId from last session
2. ESC handler sees `taskId` is truthy → calls `showExitPanel(taskId)`
3. Exit panel appears despite no pomodoro having been started

### Detailed flow

```
Previous session:
  1. User worked on task "背单词", pomodoro started → PomodoroService._taskId = "task_abc"
  2. Pomodoro ended or was stopped → PomodoroService.stop() → _taskId STILL "task_abc"

New session:
  3. User enters wallpaper mode
  4. Task selection list shows (rest mode, isPomodoroRunning = false, currentPomodoroTaskId = null)
  5. User presses ESC
  6. getPomodoroStatus() → { taskId: "task_abc" }  ← STALE!
  7. showExitPanel("task_abc") triggered ← WRONG!
```

The renderer already has a perfectly accurate local variable `currentPomodoroTaskId` that is:
- Set to the task ID in `startPomodoroFlow()` when a pomodoro actually starts
- Retained during pause (so ESC during pause works correctly)
- Cleared in `hideExitPanelAndRefresh()` (and, since Fix 5, no longer cleared in `onStop` — instead `onStop` triggers `showExitPanel`)

## Fix

**File**: `src/renderer/wallpaper/index.html`

**Location**: Inside the `keydown` event listener for `Escape`, approximately lines 938-944

**Change**: Replace the backend `getPomodoroStatus()` query with a check on the renderer-local `currentPomodoroTaskId` variable.

### Before

```javascript
      const statusRes = await ipc.getPomodoroStatus();
      if (statusRes.ok && statusRes.data.taskId) {
        showExitPanel(statusRes.data.taskId);
      } else {
        await ipc.switchMode(MODE.PET);
      }
```

### After

```javascript
      if (currentPomodoroTaskId) {
        showExitPanel(currentPomodoroTaskId);
      } else {
        await ipc.switchMode(MODE.PET);
      }
```

### Edit operation (exact old_string → new_string)

Search for:

```
      const statusRes = await ipc.getPomodoroStatus();
      if (statusRes.ok && statusRes.data.taskId) {
        showExitPanel(statusRes.data.taskId);
      } else {
        await ipc.switchMode(MODE.PET);
      }
```

Replace with:

```
      if (currentPomodoroTaskId) {
        showExitPanel(currentPomodoroTaskId);
      } else {
        await ipc.switchMode(MODE.PET);
      }
```

## Why this fix is correct

| Scenario | `currentPomodoroTaskId` | ESC behavior | Correct? |
|---|---|---|---|
| Fresh entry, task list visible | `null` | Switch to pet mode | ✅ |
| Task selected but not started | `null` | Switch to pet mode | ✅ |
| Pomodoro started and running | `"task_abc"` | Show exit panel | ✅ |
| Pomodoro paused (rest mode) | `"task_abc"` | Show exit panel | ✅ |
| Pomodoro naturally ended | `"task_abc"` | Show exit panel | ✅ |
| User clicked "stop" button | `"task_abc"` (exit panel already shown by `onStop`; `hideExitPanelAndRefresh` clears it after user dismisses panel) | N/A — exit panel already open | ✅ |
| After exit panel flow completes | `null` (cleared by `hideExitPanelAndRefresh`) | Switch to pet mode | ✅ |

> **Note**: The "User clicked stop" row was updated from the original Fix 3 to reflect Fix 5's change: `onStop` no longer clears `currentPomodoroTaskId` — it calls `showExitPanel(currentPomodoroTaskId)` instead. The ID is eventually cleared in `hideExitPanelAndRefresh`.

## Why not fix the backend instead?

An alternative would be to clear `_taskId` in `PomodoroService.stop()`. However, this would break the pause scenario: when the user pauses, `cancel()` is called (→ `_taskId` persists which is fine), but if we also clear it in `stop()`, then after a pomodoro naturally ends (where `stop()` is called), pressing ESC during rest mode would NOT show the exit panel — which might be undesirable since the user might want to record progress after a completed session.

Using the renderer-local `currentPomodoroTaskId` is the more surgical fix: it accurately reflects whether the CURRENT wallpaper session had a pomodoro started, regardless of what stale state the backend holds. No backend changes needed, zero risk of side effects.

## Affected ESC paths (all fixed at once)

1. **Fresh entry, no pomodoro started** → `currentPomodoroTaskId` is `null` → switches to pet mode directly
2. **Mid-pomodoro, user wants to exit** → `currentPomodoroTaskId` is set → exit panel shown
3. **Paused state** → `currentPomodoroTaskId` is set → exit panel shown
4. **After exit panel flow completes** → `currentPomodoroTaskId` cleared by `hideExitPanelAndRefresh` → switches to pet mode

---

# 4. Editable Pomodoro Time After Task Selection in Wallpaper Mode

## Problem

After selecting a subtask in wallpaper mode, the pomodoro timer displayed the AI-suggested duration (e.g., 25 min) as a static, non-editable number. The user could not adjust the time before starting. Since AI time estimates are often inaccurate, the user needed a way to override the duration before committing to the countdown.

## Target UX flow

1. **No task selected**: Pomodoro shows default "25:00" with "开始专注" button (unchanged)
2. **After selecting a subtask**: The time display transforms into an editable row with `[−] [number input] [+] min` and "开始专注" button
3. **Adjustment**: `+/−` buttons change by 5 minutes; direct input accepts any value (1–480 min)
4. **User clicks "开始专注"**: Editor hides, timer locks to the user-chosen duration and starts counting down
5. **Pomodoro running**: Normal countdown display, not editable
6. **Click "更换" (deselect)**: Timer resets to default "25:00"

## Files modified

### 1. `src/renderer/shared/pomodoro-timer.js`

This file uses **tab characters** for indentation throughout.

---

#### Change 1a: Add `_editableMinutes` field in constructor

Search for:

```js
		this._running = false;
		this._paused = false;
	}
```

Replace with:

```js
		this._running = false;
		this._paused = false;
		this._editableMinutes = 25;
	}
```

---

#### Change 1b: Add time editor DOM after `_timeDisplay`

Search for:

```js
		this._timeDisplay.textContent = "25:00";

		// Controls
```

Replace with:

```js
		this._timeDisplay.textContent = "25:00";

		// Time editor (shown after task selection, hidden during countdown)
		this._timeEditor = document.createElement("div");
		this._timeEditor.style.cssText = "display:none;align-items:center;gap:var(--space-sm);";

		this._minusBtn = document.createElement("button");
		this._minusBtn.textContent = "−";
		this._minusBtn.style.cssText = "width:32px;height:32px;border-radius:50%;border:1px solid var(--color-bg-light);background:var(--color-bg-medium);color:var(--color-text-primary);cursor:pointer;font-size:var(--font-lg);line-height:1;display:flex;align-items:center;justify-content:center;flex-shrink:0;";
		this._minusBtn.addEventListener("click", () => {
			this._editableMinutes = Math.max(1, this._editableMinutes - 5);
			this._minutesInput.value = this._editableMinutes;
		});

		this._minutesInput = document.createElement("input");
		this._minutesInput.type = "number";
		this._minutesInput.min = 1;
		this._minutesInput.max = 480;
		this._minutesInput.step = 1;
		this._minutesInput.style.cssText = "width:56px;background:var(--color-bg-medium);border:1px solid var(--color-bg-light);border-radius:var(--radius-sm);color:var(--color-text-primary);font-size:var(--font-xl);text-align:center;font-family:var(--font-mono);padding:var(--space-xs);";
		this._minutesInput.addEventListener("input", () => {
			const val = parseInt(this._minutesInput.value, 10);
			if (!isNaN(val) && val > 0) {
				this._editableMinutes = Math.min(480, Math.max(1, val));
			}
		});

		this._plusBtn = document.createElement("button");
		this._plusBtn.textContent = "+";
		this._plusBtn.style.cssText = "width:32px;height:32px;border-radius:50%;border:1px solid var(--color-bg-light);background:var(--color-bg-medium);color:var(--color-text-primary);cursor:pointer;font-size:var(--font-lg);line-height:1;display:flex;align-items:center;justify-content:center;flex-shrink:0;";
		this._plusBtn.addEventListener("click", () => {
			this._editableMinutes = Math.min(480, this._editableMinutes + 5);
			this._minutesInput.value = this._editableMinutes;
		});

		this._unitLabel = document.createElement("span");
		this._unitLabel.textContent = "min";
		this._unitLabel.style.cssText = "font-size:var(--font-sm);color:var(--color-text-muted);";

		this._timeEditor.appendChild(this._minusBtn);
		this._timeEditor.appendChild(this._minutesInput);
		this._timeEditor.appendChild(this._plusBtn);
		this._timeEditor.appendChild(this._unitLabel);

		// Controls
```

---

#### Change 1c: Append `_timeEditor` to container DOM

Search for:

```js
		this.container.appendChild(this._svg);
		this.container.appendChild(this._timeDisplay);
		this.container.appendChild(controls);
```

Replace with:

```js
		this.container.appendChild(this._svg);
		this.container.appendChild(this._timeDisplay);
		this.container.appendChild(this._timeEditor);
		this.container.appendChild(controls);
```

---

#### Change 1d: Add helper methods after `showControls()`

Search for:

```js
	showControls(state) {
		this._startBtn.style.display = state === "idle" ? "" : "none";
		this._pauseBtn.style.display = state === "running" ? "" : "none";
		this._resumeBtn.style.display = state === "paused" ? "" : "none";
		this._stopBtn.style.display = state === "paused" ? "" : "none";
	}
```

Replace with:

```js
	showControls(state) {
		this._startBtn.style.display = state === "idle" ? "" : "none";
		this._pauseBtn.style.display = state === "running" ? "" : "none";
		this._resumeBtn.style.display = state === "paused" ? "" : "none";
		this._stopBtn.style.display = state === "paused" ? "" : "none";
	}

	_showEditor() {
		this._timeDisplay.style.display = "none";
		this._timeEditor.style.display = "flex";
	}

	_hideEditor() {
		this._timeDisplay.style.display = "";
		this._timeEditor.style.display = "none";
	}

	/** @param {number} minutes — AI-suggested duration, shown as editable */
	setEditableDuration(minutes) {
		this._editableMinutes = Math.min(480, Math.max(1, Math.round(minutes)));
		this._minutesInput.value = this._editableMinutes;
		this._showEditor();
		this.showControls("idle");
	}

	/** @returns {number} user-adjusted minutes (or default 25) */
	getCurrentMinutes() {
		return this._editableMinutes;
	}
```

---

#### Change 1e: Modify `start()` to hide editor

Search for:

```js
	start(totalSeconds) {
		this._total = totalSeconds;
		this._running = true;
		this._paused = false;
		this.update(totalSeconds);
		this.showControls("running");
	}
```

Replace with:

```js
	start(totalSeconds) {
		this._total = totalSeconds;
		this._running = true;
		this._paused = false;
		this._hideEditor();
		this.update(totalSeconds);
		this.showControls("running");
	}
```

---

#### Change 1f: Modify `stop()` to hide editor and reset defaults

Search for:

```js
	stop() {
		this._running = false;
		this._paused = false;
		this._timeDisplay.textContent = "25:00";
		this._ring.setAttribute("stroke-dashoffset", "0");
		this.showControls("idle");
	}
```

Replace with:

```js
	stop() {
		this._running = false;
		this._paused = false;
		this._editableMinutes = 25;
		this._hideEditor();
		this._timeDisplay.textContent = "25:00";
		this._ring.setAttribute("stroke-dashoffset", "0");
		this.showControls("idle");
	}
```

---

### 2. `src/renderer/wallpaper/index.html`

This file uses **2-space indentation** throughout.

---

#### Change 2a: In `selectTask()`, call `setEditableDuration` after computing per-subtask time

Search for:

```js
    const modeRes = await ipc.getTaskMode(task.id);
    const mode = (modeRes.ok && modeRes.data) ? modeRes.data : 'rest';
    setModeLabel(mode);

    renderTaskSelectList();
  }
```

Replace with:

```js
    const modeRes = await ipc.getTaskMode(task.id);
    const mode = (modeRes.ok && modeRes.data) ? modeRes.data : 'rest';
    setModeLabel(mode);

    // Suggest per-subtask duration (editable before starting)
    const incompleteCount = (task.subtasks || []).filter(s => !s.completed).length || 1;
    const perSubMin = Math.round((task.estimatedMinutes || 25) / incompleteCount);
    pomodoroTimer.setEditableDuration(perSubMin);

    renderTaskSelectList();
  }
```

---

#### Change 2b: Simplify `onStart` callback in `PomodoroTimer` constructor

Search for:

```js
    onStart: () => {
      const task = selectedTaskId ? activeTasks.find(t => t.id === selectedTaskId) : null;
      let durationMin = 25;
      if (task) {
        const incompleteCount = (task.subtasks || []).filter(s => !s.completed).length || 1;
        durationMin = Math.round((task.estimatedMinutes || 25) / incompleteCount);
      }
      startPomodoroFlow(durationMin * 60, selectedTaskId);
    },
```

Replace with:

```js
    onStart: () => {
      startPomodoroFlow(pomodoroTimer.getCurrentMinutes() * 60, selectedTaskId);
    },
```

---

#### Change 2c: In `deselectTask()`, reset the pomodoro timer

Search for:

```js
  function deselectTask() {
    selectedTaskId = null;
    selectedSubtaskId = null;
    expandedTaskId = null;
    selectedTaskBadge.style.display = 'none';
    setModeLabel('rest');
    renderTaskSelectList();
  }
```

Replace with:

```js
  function deselectTask() {
    selectedTaskId = null;
    selectedSubtaskId = null;
    expandedTaskId = null;
    selectedTaskBadge.style.display = 'none';
    setModeLabel('rest');
    pomodoroTimer.stop();
    renderTaskSelectList();
  }
```

---

#### Change 2d: In `hideExitPanelAndRefresh()`, reset the pomodoro timer

> **Dependency**: This "Before" block includes `isPomodoroRunning = false` and `clearPomodoroListeners()` added by Fix 1. Apply Fix 1 first.

Search for:

```js
    isExitingWithTask = false;
    isPomodoroRunning = false;
    clearPomodoroListeners();
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    setModeLabel('rest');
```

Replace with:

```js
    isExitingWithTask = false;
    isPomodoroRunning = false;
    clearPomodoroListeners();
    exitOverlay.classList.remove("open");
    exitPanel.classList.remove("open");
    setModeLabel('rest');
    pomodoroTimer.stop();
```

---

## UI states

| State | Time display shows | Controls visible | Editable? |
|---|---|---|---|
| No task selected (default) | "25:00" text | "开始专注" | No |
| Task selected | `[−] [25] [+] min` editor | "开始专注" | Yes |
| Pomodoro running | MM:SS countdown + ring | "暂停" | No |
| Paused | MM:SS frozen | "继续" / "停止" | No |
| After exit panel flow | "25:00" text (reset) | "开始专注" | No |
| After clicking "更换" | "25:00" text (reset) | "开始专注" | No |

## Design decisions

- **Why edit minutes not MM:SS**: Displaying minutes is simpler and matches how users think about task duration ("I want 30 minutes", not "I want 30:00")
- **+/- step is 5 minutes**: Coarse enough for quick adjustment, fine enough for reasonable precision
- **Min 1, max 480 (8 hours)**: Prevents accidental 0-minute timers, caps at a reasonable work session
- **Time is NOT persisted back to the task**: The edit only affects the current pomodoro session. The AI's original `estimatedMinutes` is unchanged in the database. If the user wants a permanent change, they can do so through the pet mode UI
- **`pomodoroTimer.stop()` resets `_editableMinutes` to 25**: Ensures the default state is always consistent

---

# 5. Stop Button Should Show Exit Panel (Same as ESC)

## Problem

After pausing a pomodoro in wallpaper mode, the user sees two buttons: "继续" (resume) and "停止" (stop). Clicking "停止" immediately reset everything — cleared the selected task, reset the timer to 25:00, and showed the task selection list. It did NOT show the exit panel with progress-tracking options ("完成了 / 还没完成 / 再延 25 分钟").

This was inconsistent with pressing ESC during an active pomodoro, which shows the exit panel. Since clicking "停止" means the user wants to end the current pomodoro session, they should be asked about task progress just like they would with ESC.

## Fix

**File**: `src/renderer/wallpaper/index.html`

**Location**: `onStop` callback in the `PomodoroTimer` constructor

**Change**: Replace the reset logic with a call to `showExitPanel()`, matching the ESC behavior.

### Before

```js
    onStop: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      isPomodoroRunning = false;
      currentPomodoroTaskId = null;
      setModeLabel('rest');
      pomodoroTimer.stop();
    },
```

### After

```js
    onStop: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      isPomodoroRunning = false;
      setModeLabel('rest');
      if (currentPomodoroTaskId) {
        showExitPanel(currentPomodoroTaskId);
      }
    },
```

### Edit operation (exact old_string → new_string)

Search for:

```
    onStop: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      isPomodoroRunning = false;
      currentPomodoroTaskId = null;
      setModeLabel('rest');
      pomodoroTimer.stop();
    },
```

Replace with:

```
    onStop: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      isPomodoroRunning = false;
      setModeLabel('rest');
      if (currentPomodoroTaskId) {
        showExitPanel(currentPomodoroTaskId);
      }
    },
```

## What changed and why

| Line removed | Why |
|---|---|
| `currentPomodoroTaskId = null;` | Must keep the task ID so `showExitPanel()` receives it. The ID is later cleared in `hideExitPanelAndRefresh()`. |
| `pomodoroTimer.stop();` | Not needed here — the exit panel overlay covers the timer. `hideExitPanelAndRefresh()` already calls `pomodoroTimer.stop()` when the user exits the panel. |

| Line added | Why |
|---|---|
| `if (currentPomodoroTaskId) { showExitPanel(...); }` | Same behavior as pressing ESC during an active pomodoro — shows "专注时间结束了~" with the three options. |

## Post-stop flow (unchanged — handled by existing exit panel logic)

After the exit panel appears, the user has the same three options:

1. **"完成了"** → toggle subtask, check parent completion → `hideExitPanelAndRefresh(MODE.PET)`
2. **"还没完成"** → show progress percentage input → save → `hideExitPanelAndRefresh(MODE.PET)`
3. **"再延 25 分钟"** → start a new 25-minute pomodoro for the same task
4. **Click outside panel** → `hideExitPanelAndRefresh()` → stay in wallpaper, refresh task list

---

# 6. Hide "更换" Button During Active Pomodoro

## Problem

In wallpaper mode, after selecting a task and starting the pomodoro, the "更换" (change task) button remained visible in the selected task badge above the timer. While the button was functionally guarded (`if (!isPomodoroRunning)` check), its presence during an active countdown was visually misleading — the user is mid-focus and shouldn't be thinking about switching tasks.

## Fix

**File**: `src/renderer/wallpaper/index.html`

Three places: hide the "更换" button when pomodoro starts, show it when paused or ended.

### Change 1: Hide when pomodoro starts (in `startPomodoroFlow`)

Search for:

```js
    currentPomodoroTaskId = taskId || null;
    isPomodoroRunning = true;
    // Set mode to task's mode (or rest if no task)
```

Replace with:

```js
    currentPomodoroTaskId = taskId || null;
    isPomodoroRunning = true;
    document.getElementById("changeTaskBtn").style.display = "none";
    // Set mode to task's mode (or rest if no task)
```

### Change 2: Show when paused (in `onPause` callback)

Search for:

```js
    onPause: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      isPomodoroRunning = false;
      // Switch to rest mode when paused
      setModeLabel('rest');
```

Replace with:

```js
    onPause: async () => {
      await ipc.stopPomodoro();
      clearPomodoroListeners();
      isPomodoroRunning = false;
      document.getElementById("changeTaskBtn").style.display = "";
      // Switch to rest mode when paused
      setModeLabel('rest');
```

### Change 3: Show when pomodoro ends naturally (in `onPomodoroEnd` callback)

Search for:

```js
    pomodoroEndUnsub = ipc.onPomodoroEnd(() => {
      clearPomodoroListeners();
      pomodoroTimer.stop();
      isPomodoroRunning = false;
      setModeLabel('rest');
    });
```

Replace with:

```js
    pomodoroEndUnsub = ipc.onPomodoroEnd(() => {
      clearPomodoroListeners();
      pomodoroTimer.stop();
      isPomodoroRunning = false;
      document.getElementById("changeTaskBtn").style.display = "";
      setModeLabel('rest');
    });
```

### No change needed for resume

`onResume` calls `startPomodoroFlow()`, which already hides the button (Change 1).

## Visibility matrix

| State | "更换" button | Reason |
|---|---|---|
| Task selected, not started | Visible | User can still change their mind |
| Pomodoro running | Hidden | Focus time, no task switching |
| Paused | Visible | User can switch tasks before resuming |
| Resumed | Hidden (via `startPomodoroFlow`) | Back to focus |
| Pomodoro ended naturally | Visible | User can pick next task |
| After exit panel / deselect | Badge hidden entirely | No task selected |

---

# 7. Per-Subtask Progress Independence Fix

## Problem

After a pomodoro session ends in wallpaper mode and the user clicks "还没完成" (not yet completed) to record progress, the progress percentage is stored on the **parent Task** (`cumulativeProgress`), not on the individual subtask. This means all subtasks share the same progress number:

1. User selects subtask 2 (Chapter 2), starts pomodoro
2. Pomodoro ends → "还没完成" → records 20%
3. `updateProgress(taskId, 20)` sets parent Task's `cumulativeProgress = 20`
4. User selects subtask 3 (Chapter 3), starts pomodoro
5. Pomodoro ends → "还没完成" → panel shows 20% (read from parent Task)
6. The minimum value is also locked to 20% (`exitProgressPercentInput.min = prev`)
7. Result: subtask 3 appears to have "inherited" subtask 2's 20% progress

## Root Cause

Two structural problems:

1. **Data model**: `SubTask` has no `progress` field — only `{ id, realDesc, rpgDesc, completed }`. The only progress field (`cumulativeProgress`) lives on the parent Task.
2. **UI code**: The exit panel's "还没完成" handler reads from `res.data.cumulativeProgress` (parent Task) and ignores `selectedSubtaskId` entirely. The save handler also writes to the parent Task without specifying which subtask was being worked on.

## Fix Overview

| File | Change |
|---|---|
| `src/main/database.js` | `createTask` normalizes each subtask with `cumulativeProgress: 0` default |
| `src/main/task-service.js` | `updateProgress` accepts optional `subtaskId`; when provided, updates that subtask's progress and recalculates parent's `cumulativeProgress` as average of all subtask progresses |
| `src/main/ipc-handlers.js` | Handler destructures `subtaskId` from IPC payload and passes it to `taskService.updateProgress` |
| `src/preload.js` | `updateProgress` signature adds `subtaskId` parameter |
| `src/renderer/shared/ipc-client.js` | `updateTaskProgress` signature adds `subtaskId` parameter |
| `src/renderer/wallpaper/index.html` | "还没完成" handler reads progress from selected subtask (not parent); save handler passes `selectedSubtaskId` |

## Detailed Changes

All files use **tab characters** for indentation unless noted otherwise.

---

### Change 7-1: `src/main/database.js` — Add `cumulativeProgress` default to subtasks

**Location**: `createTask` method (around line 113)

**old_string**:

```
	createTask(taskData) {
		this._load();
		const task = {
			id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
			createdAt: new Date().toISOString(),
			status: "active",
			completedAt: null,
			followUpPromptAt: null,
			followUpCompleted: false,
			followUpResult: "",
			subtasks: [],
			...taskData,
		};
```

**new_string**:

```
	createTask(taskData) {
		this._load();
		const subtasks = (taskData.subtasks || []).map((s) => ({
			cumulativeProgress: 0,
			...s,
		}));
		const task = {
			id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
			createdAt: new Date().toISOString(),
			status: "active",
			completedAt: null,
			followUpPromptAt: null,
			followUpCompleted: false,
			followUpResult: "",
			...taskData,
			subtasks,
		};
```

Key points:
- `cumulativeProgress: 0` is spread first, then `...s` so any existing value on the subtask takes precedence
- `...taskData` is spread before `subtasks` so the normalized array always wins
- The original `subtasks: []` default is removed since `subtasks` is now assigned after the spread

---

### Change 7-2: `src/main/task-service.js` — `updateProgress` supports `subtaskId`

**Location**: `updateProgress` method (around line 182)

**old_string**:

```
	updateProgress(taskId, percent, note) {
		const task = this.db.getTaskById(taskId);
		if (!task) throw new Error(`Task not found: ${taskId}`);

		// Preserve the original AI-estimated duration
		if (task.originalEstimatedMinutes == null) {
			task.originalEstimatedMinutes = task.estimatedMinutes;
		}

		const oldProgress = task.cumulativeProgress || 0;
		const clamped = Math.min(100, Math.max(oldProgress, percent));
		const progressClamped = clamped !== percent;

		const remainingRatio = (100 - clamped) / 100;
		const newEstimate = Math.max(1, Math.round(task.originalEstimatedMinutes * remainingRatio));

		this.db.updateTask(taskId, {
			cumulativeProgress: clamped,
			estimatedMinutes: newEstimate,
			progressNote: note || null,
		});

		return { task: this.db.getTaskById(taskId), progressClamped };
	}
```

**new_string**:

```
	updateProgress(taskId, percent, note, subtaskId) {
		const task = this.db.getTaskById(taskId);
		if (!task) throw new Error(`Task not found: ${taskId}`);

		// Preserve the original AI-estimated duration
		if (task.originalEstimatedMinutes == null) {
			task.originalEstimatedMinutes = task.estimatedMinutes;
		}

		if (subtaskId && task.subtasks.length > 0) {
			const sub = task.subtasks.find((s) => s.id === subtaskId);
			if (!sub) throw new Error(`Subtask not found: ${subtaskId}`);

			const oldProgress = sub.cumulativeProgress || 0;
			const clamped = Math.min(100, Math.max(oldProgress, percent));
			const progressClamped = clamped !== percent;
			sub.cumulativeProgress = clamped;
			sub.progressNote = note || null;

			const totalProgress = task.subtasks.reduce(
				(sum, s) => sum + (s.cumulativeProgress || 0),
				0,
			);
			const avgProgress = Math.round(totalProgress / task.subtasks.length);

			const remainingRatio = (100 - avgProgress) / 100;
			const newEstimate = Math.max(
				1,
				Math.round(task.originalEstimatedMinutes * remainingRatio),
			);

			this.db.updateTask(taskId, {
				cumulativeProgress: avgProgress,
				estimatedMinutes: newEstimate,
				subtasks: task.subtasks,
			});

			return { task: this.db.getTaskById(taskId), progressClamped };
		}

		const oldProgress = task.cumulativeProgress || 0;
		const clamped = Math.min(100, Math.max(oldProgress, percent));
		const progressClamped = clamped !== percent;

		const remainingRatio = (100 - clamped) / 100;
		const newEstimate = Math.max(1, Math.round(task.originalEstimatedMinutes * remainingRatio));

		this.db.updateTask(taskId, {
			cumulativeProgress: clamped,
			estimatedMinutes: newEstimate,
			progressNote: note || null,
		});

		return { task: this.db.getTaskById(taskId), progressClamped };
	}
```

Key points:
- When `subtaskId` is provided and the task has subtasks, the method updates that specific subtask's `cumulativeProgress`
- The parent task's `cumulativeProgress` is recalculated as the **average** of all subtask progresses
- `estimatedMinutes` on the parent is recalculated from the new average progress
- The entire `subtasks` array is written back to the database (the subtask object was mutated in place)
- When `subtaskId` is null/undefined (no subtask context), the original behavior is preserved

---

### Change 7-3: `src/main/ipc-handlers.js` — Pass `subtaskId` from IPC to service

**Location**: `TASK_UPDATE_PROGRESS` handler (around line 99)

**old_string**:

```
	ipcMain.handle(IPC.TASK_UPDATE_PROGRESS, (_event, { taskId, percent, note }) => runTask(() => {
		return taskService.updateProgress(taskId, percent, note);
	}));
```

**new_string**:

```
	ipcMain.handle(IPC.TASK_UPDATE_PROGRESS, (_event, { taskId, percent, note, subtaskId }) => runTask(() => {
		return taskService.updateProgress(taskId, percent, note, subtaskId);
	}));
```

---

### Change 7-4: `src/preload.js` — Add `subtaskId` to preload bridge

**Location**: `task.updateProgress` in contextBridge (around line 59)

**old_string**:

```
		updateProgress(taskId, percent, note) {
			return ipcRenderer.invoke(IPC.TASK_UPDATE_PROGRESS, { taskId, percent, note });
		},
```

**new_string**:

```
		updateProgress(taskId, percent, note, subtaskId) {
			return ipcRenderer.invoke(IPC.TASK_UPDATE_PROGRESS, { taskId, percent, note, subtaskId });
		},
```

---

### Change 7-5: `src/renderer/shared/ipc-client.js` — Add `subtaskId` to client method

**Location**: `updateTaskProgress` method (around line 81)

**old_string**:

```
	async updateTaskProgress(taskId, percent, note) {
		return this._call("task.updateProgress", taskId, percent, note);
	}
```

**new_string**:

```
	async updateTaskProgress(taskId, percent, note, subtaskId) {
		return this._call("task.updateProgress", taskId, percent, note, subtaskId);
	}
```

---

### Change 7-6a: `src/renderer/wallpaper/index.html` — Read from selected subtask in "还没完成" handler

This file uses **2-space indentation** (not tabs).

**Location**: Inside the `exitNotYetBtn` click handler (around line 896)

**old_string**:

```
      const res = await ipc.getTaskById(taskId);
      if (res.ok && res.data) {
        const prev = res.data.cumulativeProgress || 0;
        exitProgressPercentInput.min = prev;
        exitProgressPercentInput.value = prev;
      }
    }
    showState("note");
```

**new_string**:

```
      const res = await ipc.getTaskById(taskId);
      if (res.ok && res.data) {
        let prev = 0;
        if (selectedSubtaskId) {
          const sub = (res.data.subtasks || []).find(s => s.id === selectedSubtaskId);
          prev = sub ? (sub.cumulativeProgress || 0) : 0;
        } else {
          prev = res.data.cumulativeProgress || 0;
        }
        exitProgressPercentInput.min = prev;
        exitProgressPercentInput.value = prev;
      }
    }
    showState("note");
```

Key points:
- If `selectedSubtaskId` is set, looks up that specific subtask's `cumulativeProgress`
- Falls back to parent task's `cumulativeProgress` when no subtask is selected
- The `prev` value is used both for `min` (lower bound) and `value` (pre-filled number)

---

### Change 7-6b: `src/renderer/wallpaper/index.html` — Pass `selectedSubtaskId` to save handler

This file uses **2-space indentation** (not tabs).

**Location**: Inside the `exitProgressSaveBtn` click handler (around line 931)

**old_string**:

```
    if (taskId) {
      await ipc.updateTaskProgress(taskId, clampedPercent, null);
    }
```

**new_string**:

```
    if (taskId) {
      await ipc.updateTaskProgress(taskId, clampedPercent, null, selectedSubtaskId);
    }
```

Key points:
- `selectedSubtaskId` is `null` when the user selected the parent task itself (no subtask selected) — the backend falls back to parent-level progress in that case
- `selectedSubtaskId` is preserved until `hideExitPanelAndRefresh()` runs (which clears it after the save completes)

---

## Data Flow Diagram (after fix)

```
User selects subtask 2 (Chapter 2), starts pomodoro
  |  selectedSubtaskId = "sub_xxx_2"
  |
  v
Pomodoro ends -> ESC -> exit panel shows
  |  _exitTaskId = task.id (parent)
  |  selectedSubtaskId still = "sub_xxx_2"
  |
  v
User clicks "还没完成"
  |  Reads: res.data.subtasks.find(s => s.id === "sub_xxx_2").cumulativeProgress
  |  Shows: 0% (subtask 2's own progress)
  |
  v
User adjusts to 20%, clicks "保存并返回"
  |  Calls: updateTaskProgress(taskId, 20, null, "sub_xxx_2")
  |    -> IPC -> task-service.updateProgress(taskId, 20, null, "sub_xxx_2")
  |    -> Updates subtask 2's cumulativeProgress = 20
  |    -> Recalculates parent cumulativeProgress = (20+0+0+0+0)/5 = 4
  |
  v
Later, user selects subtask 3 (Chapter 3), starts pomodoro
  |  selectedSubtaskId = "sub_xxx_3"
  |
  v
Pomodoro ends -> "还没完成"
  |  Reads: subtask 3's cumulativeProgress = 0  <- INDEPENDENT!
  |  Shows: 0% (correct - subtask 3 hasn't been worked on)
```

## Backward Compatibility

- **No subtask selected** (`selectedSubtaskId = null`): Behavior is identical to before — reads/writes parent Task's `cumulativeProgress`
- **Existing tasks without `cumulativeProgress` on subtasks**: The `|| 0` fallback in the "还没完成" handler and the `(s.cumulativeProgress || 0)` in `updateProgress` handle missing values gracefully
- **New tasks**: `database.createTask` normalizes subtasks with `cumulativeProgress: 0` default
- **Parent-level `updateProgress` calls**: Still work the same way when `subtaskId` is not provided

## Important: `estimatedMinutes` recalculation

When updating a subtask's progress, the parent task's `estimatedMinutes` is recalculated from the **average** subtask progress:

```
avgProgress = sum of all subtask progresses / number of subtasks
newEstimate = originalEstimatedMinutes * (100 - avgProgress) / 100
```

For example: a task with 100 estimated minutes and 5 subtasks. Subtask 2 reaches 20%, others at 0%.
- avgProgress = (0+20+0+0+0)/5 = 4%
- newEstimate = 100 * 96/100 = 96 minutes remaining
