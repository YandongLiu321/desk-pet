# Software Mode MP4 Motion Animations — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Play MP4 motion animations on the software mode character triggered by specific interactions (click, AI response, task/pomodoro events).

**Architecture:** Extend `CharacterRenderer` with a `playMotion()` method that creates a `<video>` overlay. Wire three interaction triggers in the software mode script.

**Tech Stack:** Vanilla JS (Electron renderer), HTML5 `<video>` element

---

### Task 1: Add `playMotion()` to CharacterRenderer

**Files:**
- Modify: `src/renderer/shared/character-renderer.js`

- [ ] **Step 1: Add motion-to-video path map at top of file**

After the `class CharacterRenderer {` opening, add the map constant before the class:

```js
/** Motion name → MP4 video path */
const MOTION_VIDEOS = {
  smile: '../../../assets/characters/default/motions/微笑.mp4',
  talking: '../../../assets/characters/default/motions/说话.mp4',
  combat: '../../../assets/characters/default/motions/战力.mp4',
};
```

- [ ] **Step 2: Add `_videoEl` field in constructor**

In the constructor, after the existing field declarations, add:

```js
this._videoEl = null;
```

- [ ] **Step 3: Add `playMotion(name)` method**

Add the method after `setMotion` and before `destroy`:

```js
/** @param {string} name */
playMotion(name) {
  const videoPath = MOTION_VIDEOS[name];
  if (!videoPath) {
    this.setMotion(name);
    return;
  }

  // Stop any currently playing video
  if (this._videoEl) {
    this._videoEl.pause();
    this._videoEl.remove();
    this._videoEl = null;
  }

  // Hide static character during playback
  const existingContent = this.container.querySelector('.character-wrapper, img, canvas');
  if (existingContent) {
    existingContent.style.display = 'none';
  }

  // Ensure container is positioned
  const cs = window.getComputedStyle(this.container);
  if (cs.position === 'static') {
    this.container.style.position = 'relative';
  }

  // Create video overlay
  const video = document.createElement('video');
  video.src = videoPath;
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.style.cssText =
    'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;z-index:10;';

  this._videoEl = video;
  this.container.appendChild(video);

  const restore = () => {
    video.remove();
    this._videoEl = null;
    if (existingContent) {
      existingContent.style.display = '';
    }
  };

  video.addEventListener('ended', restore, { once: true });
  video.addEventListener('error', () => {
    restore();
    this.setMotion(name);
  }, { once: true });
}
```

- [ ] **Step 4: Verify CharacterRenderer exports unchanged**

Run: `grep -n "window.CharacterRenderer" src/renderer/shared/character-renderer.js`

Expected: The class is still exported to `window.CharacterRenderer` at the end of the file.

- [ ] **Step 5: Commit**

```bash
git add src/renderer/shared/character-renderer.js
git commit -m "feat: add playMotion() video playback to CharacterRenderer"
```

---

### Task 2: Wire motion triggers in software mode

**Files:**
- Modify: `src/renderer/software/index.html`

- [ ] **Step 1: Play `smile` on Yuzu click with delayed panel open**

Find the Yuzu click handler in the existing `[data-panel]` delegation block. The `.room-yuzu` element has `data-panel="chat"`. Add special handling for it. Replace the `[data-panel]` click handler section:

Find this block:
```js
  document.querySelectorAll("[data-panel]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const panelName = el.dataset.panel;
      if (panelName) openPanel(panelName);
    });
  });
```

Replace with:
```js
  document.querySelectorAll("[data-panel]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const panelName = el.dataset.panel;
      if (!panelName) return;

      // Yuzu click: play smile animation, then open chat
      if (panelName === 'chat') {
        ipc.markInteraction();
        charRenderer.playMotion('smile');
        setTimeout(() => openPanel(panelName), 300);
      } else {
        openPanel(panelName);
      }
    });
  });
```

- [ ] **Step 2: Play `talking` on AI response**

In the `onDone` callback (around line 1323), add `charRenderer.playMotion('talking')` after `convPanel.hideTyping()`:

Find:
```js
      const unsubDone = ipc.onDone((data) => {
        convPanel.hideTyping();
```

Add after `convPanel.hideTyping();`:
```js
        charRenderer.playMotion('talking');
```

- [ ] **Step 3: Play `combat` on task complete**

In the task complete button handler (inside `showTaskDetail`), after `compRes.ok` check, add:

Find:
```js
        if (compRes.ok) {
          if (compRes.data.relationshipUpgrade?.upgraded) {
```

Add after the `if (compRes.ok) {` line:
```js
          charRenderer.playMotion('combat');
```

- [ ] **Step 4: Play `combat` on pomodoro start**

In the pomodoro `onStart` callback (around line 1453), add:

Find:
```js
    onStart: () => {
      ipc.markInteraction();
```

Add after `ipc.markInteraction();`:
```js
      charRenderer.playMotion('combat');
```

- [ ] **Step 5: Verify the software window loads and the character still displays**

Launch the app and switch to software mode. The character should appear normally (CSS mode). Check console for errors.

- [ ] **Step 6: Commit**

```bash
git add src/renderer/software/index.html
git commit -m "feat: wire MP4 motion triggers in software mode"
```

---

### Verification Checklist

After both tasks are complete, manually verify:

1. **Software mode loads** — character displays with CSS breathing animation
2. **Click Yuzu** — 微笑.mp4 plays, then chat panel opens after 300ms
3. **AI reply** — 说话.mp4 plays when AI finishes responding
4. **Complete a task** — 战力.mp4 plays
5. **Start pomodoro** — 战力.mp4 plays
6. **Video not found** — character falls back to CSS bounce animation gracefully
7. **Console** — no errors during any of the above
