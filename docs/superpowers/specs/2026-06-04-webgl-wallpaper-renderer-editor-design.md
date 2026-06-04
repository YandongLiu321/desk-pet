# WebGL Wallpaper Renderer + Editor — Design Spec

**Date**: 2026-06-04
**Status**: approved
**Scope**: WebGL-based renderer and standalone editor for wallpaper mode, capable of loading Wallpaper Engine PKG files at high fidelity and authoring new wallpapers from scratch.

---

## 1. Architecture Overview

Three-layer system spanning two Electron windows:

```
                        Editor Window
   Scene Tree │ Property Inspector │ Preview │ Timeline
               (separate BrowserWindow, 1280×900)
                           │
                     IPC (scene JSON)
                           │
                     Wallpaper Window
   ┌─────────────────────────────────────────────┐
   │              Render Pipeline                 │
   │  Clear → Opaque → Transparent → PostProcess │
   ├─────────────────────────────────────────────┤
   │              Scene Graph                     │
   │  Camera → Groups → LayerNodes / Particles   │
   ├─────────────────────────────────────────────┤
   │              Asset Layer                     │
   │  TextureManager │ ShaderManager │ PKGReader │
   └─────────────────────────────────────────────┘
                           │
                     Main Process
   IPC Handlers │ EditorWindowManager │ WE Asset Loader
```

### New Files

```
src/
├── renderer/shared/webgl/          NEW: shared WebGL engine
│   ├── scene-graph.js              SceneNode classes
│   ├── render-pipeline.js          Pass-based pipeline
│   ├── renderer.js                 WebGL context + draw loop
│   ├── material.js                 Material + shader binding
│   ├── shader-manager.js           GLSL compile/cache
│   ├── texture-manager.js          Load/cache/bind textures
│   ├── mesh.js                     Quad mesh generators
│   ├── camera.js                   Orthographic camera
│   ├── framebuffer.js              FBO pool management
│   ├── animation/
│   │   ├── timeline.js             Keyframe timeline + tracks
│   │   ├── controller.js           Base controller class
│   │   └── builtin/                Procedural controllers
│   │       ├── breathing.js
│   │       ├── parallax.js
│   │       ├── swing.js
│   │       ├── pan.js
│   │       ├── deform.js
│   │       ├── flow.js
│   │       ├── time-of-day.js
│   │       └── clock.js
│   ├── particles/
│   │   ├── emitter.js              Emitter node
│   │   └── system.js               GPU particle update
│   └── text/
│       └── text-node.js            Canvas2D → texture text
├── renderer/shared/we-converter/   NEW: WE → SceneGraph converter
│   ├── pkg-reader.js               Refactored PKG binary parser
│   └── scene-converter.js          WE objects → SceneGraph nodes
├── renderer/editor/                NEW: editor window
│   ├── index.html
│   ├── editor-app.js               Editor bootstrap + IPC
│   └── panels/
│       ├── scene-tree.js
│       ├── property-inspector.js
│       └── timeline.js
├── renderer/shared/shaders/        NEW: GLSL shader files
│   ├── default.vert / default.frag
│   ├── cloud.vert / cloud.frag
│   ├── curtain.vert
│   ├── bloom_downsample.frag
│   ├── bloom_blur.frag
│   ├── bloom_composite.frag
│   ├── color_grade.frag
│   ├── particle.vert / particle.frag
│   └── text.frag
├── main/
│   └── editor-window.js            NEW: editor window lifecycle
└── shared/
    └── constants.js                 UPDATE: editor IPC channels
```

### Existing Files Modified

| File | Change |
|------|--------|
| `src/shared/constants.js` | Add IPC channels for editor, scene loading, property updates |
| `src/preload.js` | Add editor/scene API to contextBridge |
| `src/main/ipc-handlers.js` | Add scene load/save handlers, editor communication |
| `src/main/main.js` | Initialize editor window manager |
| `src/renderer/wallpaper/index.html` | Replace CSS layer rendering with WebGL renderer |
| `src/renderer/shared/ipc-client.js` | Add scene + editor API methods |
| `src/main/we-asset-loader.js` | Refactor PKG parsing; extract scene-converter logic |

### Communication Flow

```
Wallpaper Window ←──IPC──→ Main Process ←──IPC──→ Editor Window
     │                        │                        │
     │  Load WE wallpaper     │  PKG parsing           │  Modify scene
     │  Apply scene           │  File system           │  Save scene
     │  Render frame          │  Persist settings      │  Export
```

---

## 2. Scene Graph

Tree of `SceneNode` subclasses. Parent-child transforms compose to world matrices.

### Node Types

```
SceneNode (base)
├── Group              Empty container for child nodes
├── Camera             Viewport + orthographic projection
├── LayerNode          Textured quad
│   ├── texture: Texture
│   ├── material: Material
│   ├── mesh: QuadMesh
│   └── blendMode: enum
├── ParticleEmitter    GPU particle spawner
│   ├── texture: Texture
│   ├── maxParticles: number
│   ├── emissionRate: number
│   ├── lifetime: [min, max]
│   ├── startSize → endSize
│   └── startColor → endColor
└── TextNode           Canvas2D → texture text
    ├── text: string
    ├── fontFamily / fontSize / fontWeight
    ├── color / outline / shadow
    └── alignment: left | center | right
```

### Base Node Properties (all animatable)

```js
class SceneNode {
    name: string;
    visible: boolean;
    position: vec2;      // center origin in scene coords
    scale: vec2;          // 1.0 = native size
    rotation: float;      // radians
    anchor: vec2;         // [0..1] on the quad
    alpha: float;         // 0..1
    colorFilter: vec4;    // RGBA multiply
}
```

### World Transform

```
worldMatrix = parent.worldMatrix
    × translate(position)
    × rotate(rotation)
    × scale(scale)
    × translate(-anchor × size)
```

### Serialization Format

Scene graphs serialize to `.dp-scene.json`:

```json
{
    "version": 1,
    "meta": {
        "name": "Wallpaper",
        "resolution": [3840, 2160],
        "source": "we-converted",
        "weSourceDir": "3163060610"
    },
    "sceneGraph": {
        "type": "Group", "name": "root",
        "children": [
            { "type": "Camera", "name": "main", "position": [1920, 1080], "size": [3840, 2160] },
            { "type": "Layer", "name": "教室", "position": [1920, 1080], "texture": "tex_35.png", "material": "default" },
            {
                "type": "ParticleEmitter", "name": "dust",
                "rate": 2, "lifetime": [3, 6],
                "startSize": [0.5, 1.5], "endSize": [0.1, 0.3],
                "blendMode": "alpha"
            },
            { "type": "TextNode", "name": "clock1", "text": "12:00", "fontFamily": "Microsoft YaHei", "fontSize": 32 }
        ]
    },
    "materials": [ ... ],
    "animations": {
        "timelines": [ ... ],
        "controllers": [ ... ]
    },
    "assets": [ "tex_0.png", "tex_19.png", ... ]
}
```

---

## 3. Render Pipeline

Configurable sequence of passes. Each pass renders a filtered subset of nodes to a framebuffer or the screen.

### Frame Loop

```
1. AnimationSystem.update(dt)      — tick controllers + timelines
2. ParticleSystem.update(dt)        — spawn/kill/update state
3. SceneGraph.updateTransforms()    — dirty matrix rebuild
4. Pipeline.execute(scene, camera)
   ├── ClearPass               gl.clear()
   ├── OpaquePass              → FBO #1 (scene color)
   ├── ParticlePass            → FBO #1 (additive blend)
   ├── TransparentPass         → FBO #1 (alpha blend, back-to-front)
   ├── TextPass                → FBO #1 (alpha blend)
   ├── BloomPass               FBO #1 → downsample → blur → composite
   └── ColorGradePass          LUT apply → screen
5. requestAnimationFrame
```

### Pass Interface

```js
class RenderPass {
    name: string;
    enabled: boolean;
    filter: (node) => boolean;    // which nodes render in this pass
    sortMode: 'none' | 'back-to-front' | 'front-to-back';
    output: Framebuffer | null;   // null = screen
    blendMode: { src, dst };
    depthTest: boolean;
}
```

### Framebuffer Pool

Reusable FBOs with color attachments. Pass outputs are pool-allocated and released. Passes can read prior outputs (e.g., BloomPass reads the OpaquePass FBO).

### Mesh Batching

Nodes sharing texture + shader within a pass are batched into a single draw call via instanced rendering or merged VBO. Given ~50 layers typical for WE wallpapers, batching is primarily for architecture cleanliness rather than performance necessity.

---

## 4. Material & Shader System

### Material

```js
class Material {
    shader: WebGLProgram;
    textures: Map<string, Texture>;
    uniforms: Map<string, any>;
    blendMode: 'opaque' | 'alpha' | 'additive' | 'multiply';
    defines: Map<string, string>;
}
```

### Built-in Shaders

| Shader | Purpose |
|--------|---------|
| `default` (vert+frag) | Basic textured quad, color filter, alpha |
| `cloud` (vert+frag) | Pan offset + deformation + flow uniforms |
| `curtain` (vert) | Vertex displacement for swing animation |
| `bloom_downsample` (frag) | Bright-pass threshold filter |
| `bloom_blur` (frag) | Separable gaussian (H+V passes) |
| `bloom_composite` (frag) | Additive blend bloom over scene |
| `color_grade` (frag) | 3D LUT lookup from 16³ volume texture |
| `particle` (vert+frag) | Point sprite → camera-facing quad, lifetime interpolation |
| `text` (frag) | SDF text for sharp rendering at any scale |

### Shader Manager

- Compiles and caches `WebGLProgram` instances keyed by (vert + frag + defines)
- Dev mode: watches `.glsl` files for changes, recompiles, updates all referencing materials without restart
- Editor discovers material uniforms and auto-generates sliders, color pickers, texture slots in the property inspector

### Uniform Binding

Materials declared as JSON, consumed by both renderer and editor:

```json
{
    "name": "cloud_material",
    "shader": "cloud",
    "textures": { "uMainTex": "cloud.png" },
    "uniforms": {
        "uPanSpeed": 1.0,
        "uDeformStrength": 0.15,
        "uDeformSpeed": 0.07,
        "uFlowSpeed": 0.25,
        "uFlowStrength": 1.0,
        "uColorFilter": [1, 1, 1, 1]
    },
    "blendMode": "alpha"
}
```

---

## 5. Animation System

Two layers: keyframe animation (data-driven) and procedural controllers (runtime parameterized behaviors).

### Keyframe Timeline

```js
class Timeline {
    duration: number;        // seconds
    loop: boolean;
    tracks: KeyframeTrack[];
}

class KeyframeTrack {
    target: string;          // "nodeName.property.path"
    property: string;        // "position.x", "alpha", "scale"
    keyframes: { time: number, value: any, easing: string }[];
    interpolation: 'linear' | 'step' | 'cubic-bezier';
}
```

Easing presets: `linear`, `ease-in`, `ease-out`, `ease-in-out`, `step`, plus user bezier curves.

### Procedural Controllers

| Controller | Target | Parameters |
|------------|--------|------------|
| `BreathingController` | `scale` oscillation | speed, strength |
| `ParallaxController` | `position` from mouse | strength, smoothing |
| `SwingController` | vertex displacement | speed, strength, timeOffset |
| `PanController` | `position` scroll | speed, direction |
| `DeformController` | `uDeform` uniform | speed, strength |
| `FlowController` | `uFlow` uniform | speed, strength |
| `TimeOfDayController` | LUT texture select | morning/day/sunset/night times |
| `ClockController` | `text` via time | format, language, custom strings |

```js
class AnimationController {
    enabled: boolean;
    update(dt: number, node: SceneNode, mousePos?: vec2);
}
```

Controllers are attached to nodes in the scene JSON:

```json
{
    "type": "Layer", "name": "cloud",
    "controllers": [
        { "type": "PanController", "speed": 1.0, "direction": [1, 0] },
        { "type": "DeformController", "speed": 0.07, "strength": 0.15 }
    ]
}
```

### Property Priority

1. User overrides (editor manual edits) — highest
2. Keyframe animation writes
3. Procedural controller writes
4. Node defaults — lowest

---

## 6. Particle System

GPU-driven; particles live entirely on GPU after spawn. Ring buffer on CPU for emission management.

### Emitter Configuration

```js
class ParticleEmitter extends SceneNode {
    texture: Texture;
    maxParticles: number;      // default 500
    emissionRate: number;      // particles/second
    lifetime: [number, number];
    startSize: [number, number];
    endSize: [number, number];
    startColor: vec4;
    endColor: vec4;
    startSpeed: [number, number];
    direction: [number, number];  // radian range
    gravity: vec2;
    blendMode: 'alpha' | 'additive';
}
```

### GPU Pipeline

```
CPU:                                  GPU:
  Emit → ring buffer                   VS: expand point → camera-facing quad
  Upload delta + params ──────────▶        size × color lerp over lifetime
                                       FS: sample sprite, color × alpha
  gl.drawArraysInstanced() ────────▶
```

### Particle State Buffer

8 floats per particle, interleaved:
```
[posX, posY, velX, velY, birthTime, lifetime, seed, flags]
```

Vertex shader handles position integration and lifetime interpolation. CPU only manages spawn/kill in the ring buffer.

### Editor Panel

- Live particle count display
- Play/pause toggle for tweaking
- Parameter sliders with real-time preview

---

## 7. Text Rendering

Canvas2D rasterizes glyphs to GPU texture, rendered as standard textured quad.

### TextNode

```js
class TextNode extends SceneNode {
    text: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: 'normal' | 'bold';
    color: vec4;
    alignment: 'left' | 'center' | 'right';
    outline: { width, color } | null;
    shadow: { offset, blur, color } | null;
}
```

### Flow

```
TextNode.setText("12:34") → mark dirty
  → next frame: Canvas2D measure + draw
  → gl.texImage2D(canvas)
  → render as quad in TextPass
```

### ClockController

Handles WE clock format specifiers: `yyyy`, `yy`, `MM`, `dd`, `hh`, `HH`, `mm`, `ss`, `[W]`, `[P]`, `\n`. Supports custom language strings (weekdays, hours, minutes in any language). Supports 30-hour clock variants (`JM`, `Jd`, `JH`, `[JW]`).

### Texture Strategy

- **Static text**: Shared 2048×2048 glyph atlas for batch rendering
- **Dynamic text** (clocks): Per-node small texture, re-rasterized only when content changes (once per second)

---

## 8. Editor Design

Separate `BrowserWindow` (1280×900, resizable) with four-panel layout.

### Layout

```
┌────────────┬──────────────────────┬──────────────────────┐
│            │                      │                      │
│  Scene     │  Preview Viewport    │  Property Inspector  │
│  Tree      │  (WebGL, same        │                      │
│            │   renderer code)     │  Context-sensitive   │
│  ▼ scene   │                      │  per-node properties │
│    ▼ bg    │  Selection by click  │  Material uniforms   │
│    ▼ fg    │  Transform gizmo     │  Controllers list    │
│    ▼ dust  │  Grid + res toggle   │                      │
│            │                      │                      │
├────────────┴──────────────────────┴──────────────────────┤
│  Timeline: ▮▮▮▮▮▮░░░░░░░░░░░░░░░░░░░░░░  0:05 / 0:10   │
│  ▸ ▶ ▸▸  ◉loop  Track: character.x  │◀◀│ ease-in-out    │
└──────────────────────────────────────────────────────────┘
```

### Panels

| Panel | Purpose |
|-------|---------|
| **Scene Tree** | Hierarchical node browser. Drag reorder/reparent. Eye toggle visibility. Lock toggle. Right-click context menu. |
| **Preview Viewport** | Live WebGL render. Click to select. Transform gizmo (translate/scale/rotate). Resolution toggle (4K/1080p). |
| **Property Inspector** | Generated from node type schema + material uniforms. No hardcoded per-node UI. Controllers listed with enable toggles + parameter controls. |
| **Timeline** | Keyframe editor. Track list + keyframe lanes. Play/pause/loop transport. Drag keyframes. Right-click add keyframe. |

### Editor ↔ Renderer IPC

```
Editor                   Main Process              Wallpaper Window
  │                          │                          │
  │─ loadScene(path) ───────▶│                          │
  │                          │─ fs.read + parse ───────▶│
  │                          │◀── scene JSON ──────────│
  │◀── scene JSON ──────────│                          │
  │                          │                          │
  │─ applyScene(scene) ─────▶│                          │
  │                          │─ live preview ──────────▶│
  │                          │      renderer.load()     │
  │                          │                          │
  │─ updateProperty(n,p,v) ─▶│                          │
  │                          │─ live update ───────────▶│
```

### Workflows

1. **Import WE wallpaper**: PKG parsed → scene-converter builds SceneGraph → user tweaks → save as `.dp-scene.json`
2. **Create from scratch**: Add background → import images → position layers → add effects → save
3. **Live preview**: Editor pushes changes to wallpaper window in real-time; user sees results on actual desktop

### File Format: `.dp-scene.json`

```json
{
    "version": 1,
    "meta": {
        "name": "...",
        "resolution": [3840, 2160],
        "source": "we-converted",
        "weSourceDir": "3163060610"
    },
    "sceneGraph": { ... },
    "materials": [ ... ],
    "animations": { "timelines": [...], "controllers": [...] },
    "assets": [ ... ]
}
```

---

## 9. WE Converter (PKG → SceneGraph)

Refactors the existing `we-asset-loader.js` into two modules:

### pkg-reader.js

Parses the PKGV0020 binary format:
- TOC parsing with correct field interpretation (v1 = offset, v2 = size)
- PNG extraction from material entries
- Shader source extraction
- Model/material JSON parsing for scene data

### scene-converter.js

Converts parsed WE scene objects into the SceneGraph format:
- Maps WE `origin` → node `position`
- Maps WE texture size → node native scale
- Maps WE `alpha` → node `alpha`
- Maps WE `parent` → parent-child hierarchy
- Maps WE `image` references → node `texture`
- Identifies particle emitters (WE "dust particle" objects) → `ParticleEmitter` nodes
- Identifies text elements (WE "clock" objects) → `TextNode` nodes with `ClockController`
- Preserves shader parameters from WE material definitions → `Material.uniforms`

---

## 10. Implementation Order

The subsystems have clear dependency chains. Recommended build order:

| Phase | Subsystem | Depends On | Deliverable |
|-------|-----------|------------|-------------|
| 1 | WebGL context + Quad renderer | Nothing | Textured quad on screen |
| 2 | Scene Graph (nodes + transforms) | Phase 1 | Multiple positioned layers |
| 3 | Render Pipeline (passes + FBOs) | Phase 2 | Proper alpha blending, z-order |
| 4 | Material + Shader System | Phase 3 | Custom shaders, uniform binding |
| 5 | WE Converter (PKG reader + scene converter) | Phase 3 | Load WE wallpaper → SceneGraph |
| 6 | Animation Controllers (keyframe + procedural) | Phase 3 | Breathing, parallax, pan, swing |
| 7 | Particle System | Phase 3 | Dust effects |
| 8 | Text Rendering + ClockController | Phase 3 | Clocks |
| 9 | Post-Process (Bloom + Color Grade) | Phase 4 | Visual polish |
| 10 | Editor Window (all 4 panels) | Phase 9 | Full authoring experience |

Each phase produces a testable, visible result. The editor (Phase 10) comes last because it depends on the full renderer being functional.
