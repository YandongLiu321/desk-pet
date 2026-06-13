# Software Mode MP4 Motion Animations

**Date**: 2026-06-13
**Status**: approved

## Overview

Apply MP4 animation files (`assets/characters/default/motions/`) to the software mode character, triggered by specific interactions.

## Files Changed

| File | Change |
|------|--------|
| `src/renderer/shared/character-renderer.js` | Add `playMotion(name)` method with video playback |
| `src/renderer/software/index.html` | Wire interaction triggers to `playMotion` |

## Motion Mapping

| Trigger | Motion Name | File |
|---------|-------------|------|
| Click Yuzu character | `smile` | `../../../assets/characters/default/motions/微笑.mp4` |
| AI response received | `talking` | `../../../assets/characters/default/motions/说话.mp4` |
| Task complete / Pomodoro start | `combat` | `../../../assets/characters/default/motions/战力.mp4` |

## CharacterRenderer: `playMotion(name)`

- Maps motion names to MP4 file paths
- If a video is already playing, stops and removes it first
- Creates a `<video>` element positioned absolutely over the character container
  - `autoplay`, `muted`, `playsinline`
  - Size matched to container, `object-fit: contain`
- During playback, hides the static character image underneath
- On `ended` event: removes video element, restores static character
- On load error: silently falls back to existing CSS animation (`setMotion`)

## Software Mode Integration

1. **Yuzu click** — play `smile`, then after 300ms delay open chat panel
2. **AI response** — in `onDone` callback, after hiding typing indicator, play `talking`
3. **Task complete** — after `completeTask` resolves successfully, play `combat`
4. **Pomodoro start** — in pomodoro `onStart` callback, play `combat`
