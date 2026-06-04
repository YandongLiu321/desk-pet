# WebGL Wallpaper Renderer + Editor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a WebGL-based wallpaper renderer with scene graph, shader pipeline, particles, text, animations, and a standalone editor window — replacing the current CSS-based wallpaper rendering.

**Architecture:** Scene graph tree of renderable nodes fed through a configurable multi-pass render pipeline. Shared WebGL engine code used by both the wallpaper window and the editor preview. WE wallpapers converted to the scene graph format via a PKG reader + scene converter. Editor lives in a separate BrowserWindow communicating over IPC.

**Tech Stack:** Vanilla JS (CommonJS for main, IIFE for renderer), WebGL 2.0, GLSL 3.00 ES, Electron IPC, Canvas2D for text rasterization.

---

## File Map

### New Files (Renderer)
| File | Responsibility |
|------|---------------|
| `src/renderer/shared/webgl/math.js` | vec2/vec4/mat3 helpers |
| `src/renderer/shared/webgl/framebuffer.js` | FBO create/bind/resize/pool |
| `src/renderer/shared/webgl/shader-manager.js` | GLSL compile, cache, hot-reload |
| `src/renderer/shared/webgl/texture-manager.js` | Load images → GPU textures, cache |
| `src/renderer/shared/webgl/mesh.js` | Quad mesh generators |
| `src/renderer/shared/webgl/material.js` | Material class (shader + textures + uniforms) |
| `src/renderer/shared/webgl/camera.js` | Orthographic camera |
| `src/renderer/shared/webgl/scene-graph.js` | SceneNode, Group, LayerNode, Camera classes |
| `src/renderer/shared/webgl/render-pipeline.js` | RenderPass, RenderPipeline |
| `src/renderer/shared/webgl/renderer.js` | WebGLWallpaperRenderer — context + draw loop + scene |
| `src/renderer/shared/webgl/animation/timeline.js` | Timeline, KeyframeTrack |
| `src/renderer/shared/webgl/animation/controller.js` | Base AnimationController class |
| `src/renderer/shared/webgl/animation/builtin/breathing.js` | BreathingController |
| `src/renderer/shared/webgl/animation/builtin/parallax.js` | ParallaxController |
| `src/renderer/shared/webgl/animation/builtin/swing.js` | SwingController |
| `src/renderer/shared/webgl/animation/builtin/pan.js` | PanController |
| `src/renderer/shared/webgl/animation/builtin/deform.js` | DeformController |
| `src/renderer/shared/webgl/animation/builtin/flow.js` | FlowController |
| `src/renderer/shared/webgl/animation/builtin/time-of-day.js` | TimeOfDayController |
| `src/renderer/shared/webgl/animation/builtin/clock.js` | ClockController |
| `src/renderer/shared/webgl/particles/emitter.js` | ParticleEmitter node |
| `src/renderer/shared/webgl/particles/system.js` | ParticleSystem — GPU update |
| `src/renderer/shared/webgl/text/text-node.js` | TextNode — Canvas2D rasterization |
| `src/renderer/shared/webgl/webgl-entry.js` | Bundled entry point exposing window.WebGLWallpaper |

### New Files (Shaders)
| File | Purpose |
|------|---------|
| `src/renderer/shared/shaders/default.vert` | Standard quad vertex shader |
| `src/renderer/shared/shaders/default.frag` | Textured quad fragment shader |
| `src/renderer/shared/shaders/cloud.vert` | Cloud pan + deform vertex shader |
| `src/renderer/shared/shaders/cloud.frag` | Cloud fragment (flow + color filter) |
| `src/renderer/shared/shaders/curtain.vert` | Curtain swing vertex displacement |
| `src/renderer/shared/shaders/bloom_downsample.frag` | Bright-pass + downsample |
| `src/renderer/shared/shaders/bloom_blur.frag` | Separable gaussian blur |
| `src/renderer/shared/shaders/bloom_composite.frag` | Bloom + scene additive blend |
| `src/renderer/shared/shaders/color_grade.frag` | 3D LUT color grading |
| `src/renderer/shared/shaders/particle.vert` | Point sprite → quad expansion |
| `src/renderer/shared/shaders/particle.frag` | Particle sprite with lifetime color |
| `src/renderer/shared/shaders/text.frag` | SDF text rendering |

### New Files (WE Converter)
| File | Responsibility |
|------|---------------|
| `src/renderer/shared/we-converter/pkg-reader.js` | PKGV0020 binary parser (refactored from we-asset-loader) |
| `src/renderer/shared/we-converter/scene-converter.js` | WE scene objects → SceneGraph JSON |

### New Files (Editor)
| File | Responsibility |
|------|---------------|
| `src/renderer/editor/index.html` | Editor window HTML + layout |
| `src/renderer/editor/editor-app.js` | Editor bootstrap, IPC, state |
| `src/renderer/editor/panels/scene-tree.js` | Hierarchical node tree panel |
| `src/renderer/editor/panels/property-inspector.js` | Dynamic property editor |
| `src/renderer/editor/panels/timeline.js` | Keyframe timeline editor |
| `src/main/editor-window.js` | Editor BrowserWindow lifecycle |

### Modified Files
| File | Change |
|------|--------|
| `src/shared/constants.js` | Add editor/scene IPC channels |
| `src/preload.js` | Add editor/scene API methods |
| `src/main/ipc-handlers.js` | Add scene load/save, editor relay handlers |
| `src/main/main.js` | Initialize EditorWindow manager |
| `src/renderer/shared/ipc-client.js` | Add scene + editor API wrappers |
| `src/renderer/wallpaper/index.html` | Replace CSS rendering with WebGL renderer |

---

## Phase 1: WebGL Context + Quad Renderer

### Task 1.0: Math utilities

**Files:**
- Create: `src/renderer/shared/webgl/math.js`

- [ ] **Step 1: Write math.js with vec2/vec4/mat3 helpers**

```js
// src/renderer/shared/webgl/math.js
(function () {
  const M = {};

  M.vec2 = {
    create(x, y) { return new Float32Array([x || 0, y || 0]); },
    copy(a) { return new Float32Array([a[0], a[1]]); },
    set(out, x, y) { out[0] = x; out[1] = y; return out; },
    add(out, a, b) { out[0] = a[0] + b[0]; out[1] = a[1] + b[1]; return out; },
    sub(out, a, b) { out[0] = a[0] - b[0]; out[1] = a[1] - b[1]; return out; },
    scale(out, a, s) { out[0] = a[0] * s; out[1] = a[1] * s; return out; },
    mul(out, a, b) { out[0] = a[0] * b[0]; out[1] = a[1] * b[1]; return out; },
    lerp(out, a, b, t) { out[0] = a[0] + (b[0] - a[0]) * t; out[1] = a[1] + (b[1] - a[1]) * t; return out; },
    length(a) { return Math.sqrt(a[0] * a[0] + a[1] * a[1]); },
    normalize(out, a) { const l = M.vec2.length(a) || 1; out[0] = a[0] / l; out[1] = a[1] / l; return out; },
  };

  M.vec4 = {
    create(x, y, z, w) { return new Float32Array([x || 0, y || 0, z || 0, w != null ? w : 1]); },
    copy(a) { return new Float32Array([a[0], a[1], a[2], a[3]]); },
    set(out, x, y, z, w) { out[0] = x; out[1] = y; out[2] = z; out[3] = w; return out; },
  };

  M.mat3 = {
    create() { return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]); },
    identity(out) { out.fill(0); out[0] = 1; out[4] = 1; out[8] = 1; return out; },
    fromTranslation(out, x, y) {
      M.mat3.identity(out);
      out[6] = x; out[7] = y;
      return out;
    },
    fromRotation(out, rad) {
      M.mat3.identity(out);
      const c = Math.cos(rad), s = Math.sin(rad);
      out[0] = c; out[1] = s;
      out[3] = -s; out[4] = c;
      return out;
    },
    fromScale(out, sx, sy) {
      M.mat3.identity(out);
      out[0] = sx; out[4] = sy;
      return out;
    },
    mul(out, a, b) {
      const a0 = a, b0 = b;
      const a00 = a0[0], a01 = a0[1], a02 = a0[2];
      const a10 = a0[3], a11 = a0[4], a12 = a0[5];
      const a20 = a0[6], a21 = a0[7], a22 = a0[8];
      const b00 = b0[0], b01 = b0[1], b02 = b0[2];
      const b10 = b0[3], b11 = b0[4], b12 = b0[5];
      const b20 = b0[6], b21 = b0[7], b22 = b0[8];
      out[0] = b00 * a00 + b01 * a10 + b02 * a20;
      out[1] = b00 * a01 + b01 * a11 + b02 * a21;
      out[2] = b00 * a02 + b01 * a12 + b02 * a22;
      out[3] = b10 * a00 + b11 * a10 + b12 * a20;
      out[4] = b10 * a01 + b11 * a11 + b12 * a21;
      out[5] = b10 * a02 + b11 * a12 + b12 * a22;
      out[6] = b20 * a00 + b21 * a10 + b22 * a20;
      out[7] = b20 * a01 + b21 * a11 + b22 * a21;
      out[8] = b20 * a02 + b21 * a12 + b22 * a22;
      return out;
    },
    ortho(out, left, right, bottom, top) {
      M.mat3.identity(out);
      out[0] = 2 / (right - left);
      out[4] = 2 / (top - bottom);
      out[6] = -(right + left) / (right - left);
      out[7] = -(top + bottom) / (top - bottom);
      return out;
    },
    multiplyVec2(out, m, v) {
      const x = v[0], y = v[1];
      out[0] = m[0] * x + m[3] * y + m[6];
      out[1] = m[1] * x + m[4] * y + m[7];
      return out;
    },
  };

  M.clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
  M.lerp = (a, b, t) => a + (b - a) * t;
  M.degToRad = (d) => d * Math.PI / 180;
  M.radToDeg = (r) => r * 180 / Math.PI;

  window.WebGLMath = M;
})();
```

- [ ] **Step 2: Verify by loading in wallpaper window**

Add `<script src="../shared/webgl/math.js"></script>` to wallpaper index.html temporarily, open devtools, verify `WebGLMath.vec2.create(1, 2)` returns `Float32Array [1, 2]`.

- [ ] **Step 3: Commit**

```bash
git add src/renderer/shared/webgl/math.js
git commit -m "feat: add WebGL math utilities (vec2/vec4/mat3)"
```

---

### Task 1.1: Shader manager

**Files:**
- Create: `src/renderer/shared/webgl/shader-manager.js`

- [ ] **Step 1: Write shader-manager.js**

```js
// src/renderer/shared/webgl/shader-manager.js
(function () {
  class ShaderManager {
    constructor(gl) {
      this._gl = gl;
      this._cache = new Map();
      this._sources = new Map();
    }

    /**
     * Register shader source code by name.
     * @param {string} name — e.g. "default"
     * @param {string} vertSrc
     * @param {string} fragSrc
     */
    register(name, vertSrc, fragSrc) {
      this._sources.set(name, { vert: vertSrc, frag: fragSrc });
    }

    /**
     * Get or compile a shader program.
     * @param {string} name — the shader name registered via register()
     * @param {object} [defines] — optional #define overrides merged into source
     * @returns {WebGLProgram}
     */
    get(name, defines) {
      const defKey = defines ? JSON.stringify(Object.entries(defines).sort()) : "";
      const key = name + "|" + defKey;
      if (this._cache.has(key)) return this._cache.get(key);

      const src = this._sources.get(name);
      if (!src) throw new Error("Unknown shader: " + name);

      let vertSrc = src.vert;
      let fragSrc = src.frag;

      if (defines) {
        const defineStr = Object.entries(defines)
          .map(([k, v]) => "#define " + k + " " + v)
          .join("\n") + "\n";
        vertSrc = defineStr + vertSrc;
        fragSrc = defineStr + fragSrc;
      }

      const vs = this._compile(this._gl.VERTEX_SHADER, vertSrc);
      const fs = this._compile(this._gl.FRAGMENT_SHADER, fragSrc);
      const program = this._link(vs, fs);

      this._gl.deleteShader(vs);
      this._gl.deleteShader(fs);

      this._cache.set(key, program);
      return program;
    }

    /** Recompile and update all cached programs (for hot-reload). */
    invalidate(name) {
      const keysToDelete = [];
      for (const [key, program] of this._cache) {
        if (key.startsWith(name + "|") || key === name + "|") {
          this._gl.deleteProgram(program);
          keysToDelete.push(key);
        }
      }
      for (const k of keysToDelete) this._cache.delete(k);
    }

    _compile(type, src) {
      const shader = this._gl.createShader(type);
      this._gl.shaderSource(shader, src);
      this._gl.compileShader(shader);
      if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
        const log = this._gl.getShaderInfoLog(shader);
        this._gl.deleteShader(shader);
        throw new Error("Shader compile error: " + log);
      }
      return shader;
    }

    _link(vs, fs) {
      const program = this._gl.createProgram();
      this._gl.attachShader(program, vs);
      this._gl.attachShader(program, fs);
      this._gl.linkProgram(program);
      if (!this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
        const log = this._gl.getProgramInfoLog(program);
        this._gl.deleteProgram(program);
        throw new Error("Shader link error: " + log);
      }
      return program;
    }

    destroy() {
      for (const program of this._cache.values()) {
        this._gl.deleteProgram(program);
      }
      this._cache.clear();
      this._sources.clear();
    }
  }

  window.ShaderManager = ShaderManager;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/webgl/shader-manager.js
git commit -m "feat: add WebGL shader manager with compile cache"
```

---

### Task 1.2: Mesh generator

**Files:**
- Create: `src/renderer/shared/webgl/mesh.js`

- [ ] **Step 1: Write mesh.js with fullscreen-quad and sized-quad generators**

```js
// src/renderer/shared/webgl/mesh.js
(function () {
  const M = window.WebGLMath;

  class QuadMesh {
    /**
     * @param {WebGL2RenderingContext} gl
     * @param {number} w — width in scene units
     * @param {number} h — height in scene units
     * @param {number} anchorX — anchor X [0..1] (0=left, 0.5=center, 1=right)
     * @param {number} anchorY — anchor Y [0..1] (0=top, 0.5=center, 1=bottom)
     */
    constructor(gl, w, h, anchorX, anchorY) {
      this.gl = gl;
      this.width = w;
      this.height = h;
      this.anchorX = anchorX != null ? anchorX : 0.5;
      this.anchorY = anchorY != null ? anchorY : 0.5;
      this._vao = null;
      this._vbo = null;
      this._dirty = true;
    }

    /** Rebuild VBO with current width/height/anchor. */
    _build() {
      const gl = this.gl;
      if (this._vao) gl.deleteVertexArray(this._vao);
      if (this._vbo) gl.deleteBuffer(this._vbo);

      this._vao = gl.createVertexArray();
      this._vbo = gl.createBuffer();

      const l = -this.width * this.anchorX;
      const r = this.width * (1 - this.anchorX);
      const t = -this.height * this.anchorY;
      const b = this.height * (1 - this.anchorY);

      const verts = new Float32Array([
        l, t,  0, 0,   // x, y, u, v (top-left)
        r, t,  1, 0,   // top-right
        l, b,  0, 1,   // bottom-left
        l, b,  0, 1,   // bottom-left (repeated for tri strip)
        r, t,  1, 0,   // top-right
        r, b,  1, 1,   // bottom-right
      ]);

      gl.bindVertexArray(this._vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
      gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
      // aPos: 2 floats, offset 0
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
      // aTexCoord: 2 floats, offset 8
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);

      this._dirty = false;
    }

    /** Resize the quad mesh. */
    resize(w, h, anchorX, anchorY) {
      this.width = w;
      this.height = h;
      if (anchorX != null) this.anchorX = anchorX;
      if (anchorY != null) this.anchorY = anchorY;
      this._dirty = true;
    }

    /** @returns {WebGLVertexArrayObject} */
    vao() {
      if (this._dirty) this._build();
      return this._vao;
    }

    /** Draw 6 vertices (2 triangles) */
    draw() {
      this.gl.bindVertexArray(this.vao());
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

    destroy() {
      if (this._vao) this.gl.deleteVertexArray(this._vao);
      if (this._vbo) this.gl.deleteBuffer(this._vbo);
      this._vao = null;
      this._vbo = null;
    }
  }

  window.QuadMesh = QuadMesh;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/webgl/mesh.js
git commit -m "feat: add QuadMesh generator for WebGL textured quads"
```

---

### Task 1.3: Texture manager

**Files:**
- Create: `src/renderer/shared/webgl/texture-manager.js`

- [ ] **Step 1: Write texture-manager.js**

```js
// src/renderer/shared/webgl/texture-manager.js
(function () {
  class TextureManager {
    constructor(gl) {
      this._gl = gl;
      this._cache = new Map(); // url → { texture, width, height }
      this._loading = new Map(); // url → Promise
    }

    /**
     * Load a texture from a URL (or reuse cached).
     * @param {string} url — file:// URL or path
     * @returns {Promise<{texture: WebGLTexture, width: number, height: number}>}
     */
    async load(url) {
      if (this._cache.has(url)) return this._cache.get(url);
      if (this._loading.has(url)) return this._loading.get(url);

      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const gl = this._gl;
          const texture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          this._cache.set(url, { texture, width: img.width, height: img.height });
          this._loading.delete(url);
          resolve(this._cache.get(url));
        };
        img.onerror = () => {
          this._loading.delete(url);
          reject(new Error("Failed to load texture: " + url));
        };
        img.src = url;
      });

      this._loading.set(url, promise);
      return promise;
    }

    /** Get a cached texture. Returns null if not loaded. */
    get(url) {
      return this._cache.get(url) || null;
    }

    /** Bind a texture to a sampler slot. */
    bind(slot, texObj) {
      const gl = this._gl;
      gl.activeTexture(gl.TEXTURE0 + slot);
      gl.bindTexture(gl.TEXTURE_2D, texObj ? texObj.texture : null);
    }

    /** Create a texture from a Canvas element and return it. */
    fromCanvas(canvas) {
      const gl = this._gl;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return { texture, width: canvas.width, height: canvas.height };
    }

    destroy() {
      for (const { texture } of this._cache.values()) {
        this._gl.deleteTexture(texture);
      }
      this._cache.clear();
      this._loading.clear();
    }
  }

  window.TextureManager = TextureManager;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/webgl/texture-manager.js
git commit -m "feat: add TextureManager for WebGL texture loading and caching"
```

---

### Task 1.4: Framebuffer manager

**Files:**
- Create: `src/renderer/shared/webgl/framebuffer.js`

- [ ] **Step 1: Write framebuffer.js**

```js
// src/renderer/shared/webgl/framebuffer.js
(function () {
  class Framebuffer {
    /**
     * @param {WebGL2RenderingContext} gl
     * @param {number} width
     * @param {number} height
     */
    constructor(gl, width, height) {
      this.gl = gl;
      this.width = width;
      this.height = height;
      this.fbo = gl.createFramebuffer();
      this.colorTexture = gl.createTexture();

      gl.bindTexture(gl.TEXTURE_2D, this.colorTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorTexture, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }

    bind() {
      const gl = this.gl;
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
      gl.viewport(0, 0, this.width, this.height);
    }

    /** Resize the framebuffer. Destroys old texture and creates new. */
    resize(width, height) {
      if (this.width === width && this.height === height) return;
      const gl = this.gl;
      this.width = width;
      this.height = height;

      gl.deleteTexture(this.colorTexture);
      this.colorTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.colorTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorTexture, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }

    destroy() {
      if (this.fbo) this.gl.deleteFramebuffer(this.fbo);
      if (this.colorTexture) this.gl.deleteTexture(this.colorTexture);
      this.fbo = null;
      this.colorTexture = null;
    }
  }

  /** Pool of reusable FBOs. */
  class FramebufferPool {
    constructor(gl) {
      this._gl = gl;
      this._pool = []; // idle FBOs
      this._active = new Map(); // name → FBO
    }

    acquire(name, width, height) {
      let fbo = this._active.get(name);
      if (fbo) {
        fbo.resize(width, height);
        return fbo;
      }
      if (this._pool.length > 0) {
        fbo = this._pool.pop();
        fbo.resize(width, height);
      } else {
        fbo = new Framebuffer(this._gl, width, height);
      }
      this._active.set(name, fbo);
      return fbo;
    }

    /** Get an active FBO without creating or resizing. */
    get(name) {
      return this._active.get(name) || null;
    }

    /** Release all active FBOs back to the pool. */
    releaseAll() {
      for (const [name, fbo] of this._active) {
        this._pool.push(fbo);
      }
      this._active.clear();
    }

    destroy() {
      for (const fbo of this._pool) fbo.destroy();
      for (const fbo of this._active.values()) fbo.destroy();
      this._pool = [];
      this._active.clear();
    }
  }

  window.Framebuffer = Framebuffer;
  window.FramebufferPool = FramebufferPool;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/webgl/framebuffer.js
git commit -m "feat: add Framebuffer and FramebufferPool for WebGL render targets"
```

---

### Task 1.5: Camera

**Files:**
- Create: `src/renderer/shared/webgl/camera.js`

- [ ] **Step 1: Write camera.js**

```js
// src/renderer/shared/webgl/camera.js
(function () {
  const M = window.WebGLMath;

  class Camera {
    constructor() {
      this.x = 1920;    // center X in scene coords
      this.y = 1080;    // center Y in scene coords
      this.width = 3840;
      this.height = 2160;
      this._viewMatrix = M.mat3.create();
      this._projMatrix = M.mat3.create();
      this._viewProjMatrix = M.mat3.create();
    }

    /** Set viewport to center on (x, y) with given size. */
    lookAt(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    /** Recompute matrices. Call before rendering. */
    update(screenWidth, screenHeight) {
      const aspect = screenWidth / screenHeight;
      const sceneAspect = this.width / this.height;
      let w, h;
      if (aspect > sceneAspect) {
        h = this.height;
        w = this.height * aspect;
      } else {
        w = this.width;
        h = this.width / aspect;
      }
      M.mat3.ortho(this._projMatrix, -w / 2, w / 2, h / 2, -h / 2);
      M.mat3.fromTranslation(this._viewMatrix, -this.x, -this.y);
      M.mat3.mul(this._viewProjMatrix, this._projMatrix, this._viewMatrix);
    }

    /** Get the combined view-projection matrix. */
    getViewProjMatrix() {
      return this._viewProjMatrix;
    }

    /** Get the projection matrix only. */
    getProjMatrix() {
      return this._projMatrix;
    }
  }

  window.Camera = Camera;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/webgl/camera.js
git commit -m "feat: add Camera with orthographic projection for scene rendering"
```

---

### Task 1.6: Default shader + Wire it all together (First triangle → textured quad)

**Files:**
- Create: `src/renderer/shared/shaders/default.vert`
- Create: `src/renderer/shared/shaders/default.frag`
- Create: `src/renderer/shared/webgl/renderer.js`
- Modify: `src/renderer/wallpaper/index.html`

- [ ] **Step 1: Write default.vert**

```glsl
// src/renderer/shared/shaders/default.vert
#version 300 es
precision highp float;

in vec2 aPos;
in vec2 aTexCoord;

uniform mat3 uViewProj;
uniform vec2 uPosition;
uniform vec2 uScale;
uniform float uRotation;

out vec2 vTexCoord;

void main() {
    float c = cos(uRotation);
    float s = sin(uRotation);
    vec2 rotated = vec2(aPos.x * c - aPos.y * s, aPos.x * s + aPos.y * c);
    vec2 scaled = rotated * uScale;
    vec2 worldPos = scaled + uPosition;
    vec3 clip = uViewProj * vec3(worldPos, 1.0);
    gl_Position = vec4(clip.xy, 0.0, 1.0);
    vTexCoord = aTexCoord;
}
```

- [ ] **Step 2: Write default.frag**

```glsl
// src/renderer/shared/shaders/default.frag
#version 300 es
precision highp float;

in vec2 vTexCoord;
out vec4 outColor;

uniform sampler2D uMainTex;
uniform vec4 uColorFilter;
uniform float uAlpha;

void main() {
    vec4 texColor = texture(uMainTex, vTexCoord);
    outColor = texColor * uColorFilter * vec4(1.0, 1.0, 1.0, uAlpha);
}
```

- [ ] **Step 3: Write renderer.js — the core WebGLWallpaperRenderer**

```js
// src/renderer/shared/webgl/renderer.js
(function () {
  const M = window.WebGLMath;

  /**
   * WebGL wallpaper renderer.
   * Manages the GL context, scene, and draw loop.
   */
  class WebGLWallpaperRenderer {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
      const gl = canvas.getContext("webgl2", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
      });
      if (!gl) throw new Error("WebGL2 not available");
      this.gl = gl;
      this.canvas = canvas;

      this.shaderManager = new window.ShaderManager(gl);
      this.textureManager = new window.TextureManager(gl);
      this.fboPool = new window.FramebufferPool(gl);

      this.camera = new window.Camera();
      this.camera.lookAt(1920, 1080, 3840, 2160);

      /** @type {import('./scene-graph').SceneNode[]} */
      this.sceneNodes = [];
      this._animationControllers = [];
      this._running = false;
      this._rafId = null;
      this._mouseX = 0;
      this._mouseY = 0;

      // Default state
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    /** Register built-in shaders from inline sources. */
    registerShader(name, vertSrc, fragSrc) {
      this.shaderManager.register(name, vertSrc, fragSrc);
    }

    /**
     * Load a scene from a scene JSON object.
     * Expects { sceneGraph, camera, ... }
     */
    loadScene(sceneData) {
      this.sceneNodes = [];
      this._animationControllers = [];

      if (sceneData.camera) {
        const cam = sceneData.camera;
        this.camera.lookAt(cam.x || 1920, cam.y || 1080, cam.width || 3840, cam.height || 2160);
      }

      const root = sceneData.sceneGraph || sceneData;
      if (root.children) {
        this._parseNodes(root.children, null);
      } else if (Array.isArray(root)) {
        this._parseNodes(root, null);
      }
    }

    _parseNodes(children, parent) {
      for (const def of children) {
        if (!def || def.visible === false) continue;
        const node = this._createNode(def);
        if (node) {
          if (parent) parent.addChild(node);
          this.sceneNodes.push(node);
          if (def.children) this._parseNodes(def.children, node);
          if (def.controllers) this._parseControllers(def.controllers, node);
        }
      }
    }

    _createNode(def) {
      switch (def.type) {
        case "Camera":
          this.camera.lookAt(
            def.position ? def.position[0] : 1920,
            def.position ? def.position[1] : 1080,
            def.size ? def.size[0] : 3840,
            def.size ? def.size[1] : 2160
          );
          return null; // Camera is singleton, not in node list
        case "Group":
          return new window.SceneGroup(def.name);
        case "Layer":
          return new window.LayerNode(def, this.textureManager);
        default:
          return null;
      }
    }

    _parseControllers(controllers, node) {
      for (const ctrl of controllers) {
        const Ctor = window["AnimationController_" + ctrl.type];
        if (Ctor) {
          const inst = new Ctor(ctrl);
          this._animationControllers.push({ controller: inst, node });
        }
      }
    }

    /** Add a node to the scene at runtime. */
    addNode(node) {
      this.sceneNodes.push(node);
    }

    /** Remove a node from the scene. */
    removeNode(node) {
      const idx = this.sceneNodes.indexOf(node);
      if (idx >= 0) this.sceneNodes.splice(idx, 1);
    }

    /** Set mouse position for parallax controllers. */
    setMouse(x, y) {
      this._mouseX = x;
      this._mouseY = y;
    }

    start() {
      if (this._running) return;
      this._running = true;
      this._lastTime = performance.now();
      this._frame();
    }

    stop() {
      this._running = false;
      if (this._rafId) cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    /** Handle canvas resize. */
    resize() {
      const w = this.canvas.clientWidth;
      const h = this.canvas.clientHeight;
      if (this.canvas.width !== w || this.canvas.height !== h) {
        this.canvas.width = w;
        this.canvas.height = h;
      }
    }

    _frame() {
      if (!this._running) return;
      this._rafId = requestAnimationFrame(() => this._frame());

      const now = performance.now();
      const dt = Math.min((now - this._lastTime) / 1000, 0.1); // cap at 100ms
      this._lastTime = now;

      this.resize();
      this._update(dt);
      this._render();
    }

    _update(dt) {
      // Update animation controllers
      for (const { controller, node } of this._animationControllers) {
        if (controller.enabled) {
          controller.update(dt, node, this._mouseX, this._mouseY);
        }
      }
    }

    _render() {
      const gl = this.gl;
      const w = this.canvas.width;
      const h = this.canvas.height;

      this.camera.update(w, h);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Single-pass render: sort by zIndex then draw
      const sorted = [...this.sceneNodes].filter(n => n.visible).sort((a, b) => a.zIndex - b.zIndex);
      for (const node of sorted) {
        node.render(gl, this.camera);
      }
    }

    destroy() {
      this.stop();
      for (const node of this.sceneNodes) {
        if (node.destroy) node.destroy();
      }
      this.sceneNodes = [];
      this._animationControllers = [];
      this.shaderManager.destroy();
      this.textureManager.destroy();
      this.fboPool.destroy();
    }
  }

  window.WebGLWallpaperRenderer = WebGLWallpaperRenderer;
})();
```

- [ ] **Step 4: Write Minimal SceneNode base + LayerNode for first quad**

Add this to `src/renderer/shared/webgl/scene-graph.js`:

```js
// src/renderer/shared/webgl/scene-graph.js
(function () {
  const M = window.WebGLMath;

  class SceneNode {
    constructor(name) {
      this.name = name || "";
      this.visible = true;
      this.position = M.vec2.create(0, 0);
      this.scale = M.vec2.create(1, 1);
      this.rotation = 0;
      this.alpha = 1;
      this.colorFilter = M.vec4.create(1, 1, 1, 1);
      this.zIndex = 0;
      this.parent = null;
      this.children = [];
      this._worldMatrix = M.mat3.create();
      this._dirty = true;
    }

    addChild(child) {
      child.parent = this;
      this.children.push(child);
    }

    removeChild(child) {
      const idx = this.children.indexOf(child);
      if (idx >= 0) { this.children.splice(idx, 1); child.parent = null; }
    }

    markDirty() { this._dirty = true; }

    getWorldMatrix() {
      if (this._dirty) {
        M.mat3.identity(this._worldMatrix);
        M.mat3.mul(this._worldMatrix, this._worldMatrix,
          M.mat3.fromTranslation(M._tmpMat3 || (M._tmpMat3 = M.mat3.create()), this.position[0], this.position[1]));
        if (this.rotation !== 0) {
          M.mat3.mul(this._worldMatrix, this._worldMatrix,
            M.mat3.fromRotation(M._tmpMat3b || (M._tmpMat3b = M.mat3.create()), this.rotation));
        }
        if (this.scale[0] !== 1 || this.scale[1] !== 1) {
          M.mat3.mul(this._worldMatrix, this._worldMatrix,
            M.mat3.fromScale(M._tmpMat3c || (M._tmpMat3c = M.mat3.create()), this.scale[0], this.scale[1]));
        }
        if (this.parent) {
          const parentMat = this.parent.getWorldMatrix();
          M.mat3.mul(this._worldMatrix, parentMat, this._worldMatrix);
        }
        this._dirty = false;
      }
      return this._worldMatrix;
    }

    render(gl, camera) {}
    destroy() {
      for (const c of this.children) c.destroy();
      this.children = [];
    }
  }

  class SceneGroup extends SceneNode {
    constructor(name) {
      super(name);
    }
    render(gl, camera) {
      for (const c of this.children) {
        if (c.visible) c.render(gl, camera);
      }
    }
  }

  class LayerNode extends SceneNode {
    /**
     * @param {object} def — { name, position, scale, rotation, alpha, zIndex, texture, material, width, height, anchor }
     * @param {import('./texture-manager').TextureManager} textureManager
     */
    constructor(def, textureManager) {
      super(def.name);
      this.position = M.vec2.create(def.position ? def.position[0] : 0, def.position ? def.position[1] : 0);
      this.scale = M.vec2.create(def.scale ? def.scale[0] : 1, def.scale ? def.scale[1] : 1);
      this.rotation = def.rotation || 0;
      this.alpha = def.alpha != null ? def.alpha : 1;
      this.zIndex = def.zIndex != null ? def.zIndex : 0;
      this._textureUrl = def.texture || "";
      this._textureManager = textureManager;
      this._textureObj = null;
      this._mesh = null;
      this._loaded = false;
      this._anchor = def.anchor || [0.5, 0.5]; // [x, y] as fraction

      // Use def size or derive from texture
      if (def.width && def.height) {
        this._meshWidth = def.width;
        this._meshHeight = def.height;
      }
    }

    async load(gl) {
      if (this._loaded) return;
      if (!this._textureUrl) return;
      this._textureObj = await this._textureManager.load(this._textureUrl);
      const w = this._meshWidth || this._textureObj.width;
      const h = this._meshHeight || this._textureObj.height;
      this._mesh = new window.QuadMesh(gl, w, h, this._anchor[0], this._anchor[1]);
      this._loaded = true;
      this.markDirty();
    }

    render(gl, camera) {
      if (!this._loaded || !this._textureObj) return;

      const shader = gl._defaultShader; // set by renderer during init
      gl.useProgram(shader);

      const worldMat = this.getWorldMatrix();
      const viewProj = camera.getViewProjMatrix();
      gl.uniformMatrix3fv(gl.getUniformLocation(shader, "uViewProj"), false, viewProj);
      gl.uniform2f(gl.getUniformLocation(shader, "uPosition"), worldMat[6], worldMat[7]);
      gl.uniform2f(gl.getUniformLocation(shader, "uScale"), this.scale[0], this.scale[1]);
      gl.uniform1f(gl.getUniformLocation(shader, "uRotation"), this.rotation);
      gl.uniform4f(gl.getUniformLocation(shader, "uColorFilter"), this.colorFilter[0], this.colorFilter[1], this.colorFilter[2], this.colorFilter[3]);
      gl.uniform1f(gl.getUniformLocation(shader, "uAlpha"), this.alpha);

      this._textureManager.bind(0, this._textureObj);
      gl.uniform1i(gl.getUniformLocation(shader, "uMainTex"), 0);

      this._mesh.draw();
    }

    destroy() {
      if (this._mesh) this._mesh.destroy();
      super.destroy();
    }
  }

  window.SceneNode = SceneNode;
  window.SceneGroup = SceneGroup;
  window.LayerNode = LayerNode;
})();
```

- [ ] **Step 5: Update wallpaper/index.html to use WebGL renderer**

Replace the existing `<script>` section at the bottom of `src/renderer/wallpaper/index.html` with:

```html
<script src="../shared/webgl/math.js"></script>
<script src="../shared/webgl/shader-manager.js"></script>
<script src="../shared/webgl/texture-manager.js"></script>
<script src="../shared/webgl/mesh.js"></script>
<script src="../shared/webgl/framebuffer.js"></script>
<script src="../shared/webgl/camera.js"></script>
<script src="../shared/webgl/scene-graph.js"></script>
<script src="../shared/webgl/renderer.js"></script>
<script>
// ── WebGL Wallpaper Bootstrap ──
const canvas = document.createElement("canvas");
canvas.id = "webglCanvas";
canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
document.body.appendChild(canvas);

let renderer = null;

async function initWebGL() {
  renderer = new WebGLWallpaperRenderer(canvas);

  // Register default shader
  renderer.registerShader("default",
    document.getElementById("shader-default-vert").textContent,
    document.getElementById("shader-default-frag").textContent
  );

  // Pre-compile default shader, store on gl for LayerNode.render access
  const gl = renderer.gl;
  gl._defaultShader = renderer.shaderManager.get("default");

  renderer.start();
}

async function applyWeWallpaper(dirName) {
  if (!renderer) return;
  if (!dirName) {
    // Clear scene
    renderer.sceneNodes = [];
    return;
  }

  const res = await ipc.loadWeWallpaper(dirName);
  if (!res.ok || !res.data) return;

  const data = res.data;

  // Convert WE layers to scene graph format
  const layers = data.layers || [];
  const sceneGraph = {
    camera: { x: 1920, y: 1080, width: 3840, height: 2160 },
    children: layers.map((lyr, i) => ({
      type: "Layer",
      name: lyr.name || ("layer_" + i),
      position: [lyr.x, lyr.y],
      alpha: lyr.alpha,
      zIndex: i + 1,
      texture: lyr.url,
      width: lyr.width,
      height: lyr.height,
      anchor: [0.5, 0.5],
    })),
  };

  renderer.loadScene(sceneGraph);

  // Load all textures
  const gl = renderer.gl;
  for (let i = 0; i < renderer.sceneNodes.length; i++) {
    const node = renderer.sceneNodes[i];
    if (node.load) await node.load(gl);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await initWebGL();

  // Restore current WE wallpaper
  const state = await ipc.getAppState();
  if (state.ok && state.data.wallpaperSettings.weWallpaperDir) {
    applyWeWallpaper(state.data.wallpaperSettings.weWallpaperDir);
  }
});

// IPC: mode activated
window.addEventListener("message", (e) => {
  if (e.data && e.data.type === "mode_activated" && e.data.mode === "wallpaper") {
    const state = ipc.getAppState().then(s => {
      if (s.ok && s.data.wallpaperSettings.weWallpaperDir) {
        applyWeWallpaper(s.data.wallpaperSettings.weWallpaperDir);
      }
    });
  }
});
</script>
```

Inline the shader sources at the top of `<body>`:

```html
<script type="x-shader/x-vertex" id="shader-default-vert">
#version 300 es
precision highp float;
in vec2 aPos;
in vec2 aTexCoord;
uniform mat3 uViewProj;
uniform vec2 uPosition;
uniform vec2 uScale;
uniform float uRotation;
out vec2 vTexCoord;
void main() {
    float c = cos(uRotation);
    float s = sin(uRotation);
    vec2 rotated = vec2(aPos.x * c - aPos.y * s, aPos.x * s + aPos.y * c);
    vec2 scaled = rotated * uScale;
    vec2 worldPos = scaled + uPosition;
    vec3 clip = uViewProj * vec3(worldPos, 1.0);
    gl_Position = vec4(clip.xy, 0.0, 1.0);
    vTexCoord = aTexCoord;
}
</script>
<script type="x-shader/x-fragment" id="shader-default-frag">
#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform vec4 uColorFilter;
uniform float uAlpha;
void main() {
    vec4 texColor = texture(uMainTex, vTexCoord);
    outColor = texColor * uColorFilter * vec4(1.0, 1.0, 1.0, uAlpha);
}
</script>
```

- [ ] **Step 6: Load a test texture and verify quad renders**

Launch the app, switch to wallpaper mode, open devtools on the wallpaper window. Verify:
1. WebGL2 context is created without errors
2. Default shader compiles without errors
3. With a WE wallpaper selected, layers appear as textured quads (not CSS backgrounds)

- [ ] **Step 7: Commit**

```bash
git add src/renderer/shared/shaders/default.vert \
        src/renderer/shared/shaders/default.frag \
        src/renderer/shared/webgl/renderer.js \
        src/renderer/shared/webgl/scene-graph.js \
        src/renderer/wallpaper/index.html
git commit -m "feat: WebGL renderer with scene graph, quad rendering, and WE wallpaper display"
```

---

### Task 1.7: Material class

**Files:**
- Create: `src/renderer/shared/webgl/material.js`

- [ ] **Step 1: Write material.js**

```js
// src/renderer/shared/webgl/material.js
(function () {
  const M = window.WebGLMath;

  class Material {
    /**
     * @param {object} def — { name, shader, textures, uniforms, blendMode }
     * @param {import('./shader-manager').ShaderManager} shaderManager
     * @param {import('./texture-manager').TextureManager} textureManager
     */
    constructor(def, shaderManager, textureManager) {
      this.name = def.name || "";
      this.shaderName = def.shader || "default";
      this.uniforms = Object.assign({}, def.uniforms || {});
      this.blendMode = def.blendMode || "alpha";
      this._shaderManager = shaderManager;
      this._textureManager = textureManager;
      this._textureDefs = Object.assign({}, def.textures || {}); // { uMainTex: "url" }
      this._textures = {}; // { uMainTex: texObj }
      this._loaded = false;
      this._defines = def.defines || {};
    }

    async load() {
      for (const [name, url] of Object.entries(this._textureDefs)) {
        this._textures[name] = await this._textureManager.load(url);
      }
      this._loaded = true;
    }

    /** Apply material to the current GL state (bind textures, set uniforms, blend mode). */
    apply(gl, camera, worldMatrix, scale, rotation, alpha, colorFilter) {
      const program = this._shaderManager.get(this.shaderName, this._defines);
      gl.useProgram(program);

      // Standard uniforms
      const locViewProj = gl.getUniformLocation(program, "uViewProj");
      const locPosition = gl.getUniformLocation(program, "uPosition");
      const locScale = gl.getUniformLocation(program, "uScale");
      const locRotation = gl.getUniformLocation(program, "uRotation");
      const locAlpha = gl.getUniformLocation(program, "uAlpha");
      const locColorFilter = gl.getUniformLocation(program, "uColorFilter");

      if (locViewProj) gl.uniformMatrix3fv(locViewProj, false, camera.getViewProjMatrix());
      if (locPosition) gl.uniform2f(locPosition, worldMatrix[6], worldMatrix[7]);
      if (locScale) gl.uniform2f(locScale, scale[0], scale[1]);
      if (locRotation) gl.uniform1f(locRotation, rotation);
      if (locAlpha) gl.uniform1f(locAlpha, alpha);
      if (locColorFilter) gl.uniform4f(locColorFilter, colorFilter[0], colorFilter[1], colorFilter[2], colorFilter[3]);

      // Custom uniforms from material def
      for (const [name, value] of Object.entries(this.uniforms)) {
        const loc = gl.getUniformLocation(program, name);
        if (!loc) continue;
        if (Array.isArray(value)) {
          if (value.length === 2) gl.uniform2f(loc, value[0], value[1]);
          else if (value.length === 3) gl.uniform3f(loc, value[0], value[1], value[2]);
          else if (value.length === 4) gl.uniform4f(loc, value[0], value[1], value[2], value[3]);
        } else if (typeof value === "number") {
          gl.uniform1f(loc, value);
        }
      }

      // Bind textures
      let slot = 0;
      for (const [name, texObj] of Object.entries(this._textures)) {
        const loc = gl.getUniformLocation(program, name);
        if (!loc) continue;
        this._textureManager.bind(slot, texObj);
        gl.uniform1i(loc, slot);
        slot++;
      }

      // Blend mode
      switch (this.blendMode) {
        case "opaque":
          gl.blendFunc(gl.ONE, gl.ZERO);
          break;
        case "additive":
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
          break;
        case "multiply":
          gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
          break;
        default: // alpha
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          break;
      }
    }

    setUniform(name, value) {
      this.uniforms[name] = value;
    }
  }

  window.Material = Material;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/webgl/material.js
git commit -m "feat: add Material class with shader binding, textures, and blend modes"
```

---

## Phase 2: Scene Graph Extensions + Render Pipeline

### Task 2.1: Extend scene-graph.js with full node types and transform caching

**Files:**
- Modify: `src/renderer/shared/webgl/scene-graph.js`

- [ ] **Step 1: Add flat-render collect and node factory method**

Replace the existing `SceneNode` base class with an enhanced version that supports `collectRenderables()` and `updateWorldMatrix()`:

Add these methods to `SceneNode`:

```js
/**
 * Collect all renderable nodes into a flat list for pass filtering.
 * @param {RenderableNode[]} out
 */
collectRenderables(out) {
  if (this instanceof RenderableNode && this.visible) {
    out.push(this);
  }
  for (const child of this.children) {
    child.collectRenderables(out);
  }
}

/** Walk tree and mark dirty transforms. */
invalidateTransforms() {
  this._dirty = true;
  for (const child of this.children) child.invalidateTransforms();
}
```

Add `RenderableNode` subclass between `SceneNode` and `LayerNode`:

```js
class RenderableNode extends SceneNode {
  constructor(name) {
    super(name);
    this.material = null;  // Material instance
    this._mesh = null;      // QuadMesh
  }
}
```

Update `LayerNode` to extend `RenderableNode` instead of `SceneNode`.

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/webgl/scene-graph.js
git commit -m "feat: extend scene graph with RenderableNode and flat collection"
```

---

### Task 2.2: Render pipeline with passes

**Files:**
- Create: `src/renderer/shared/webgl/render-pipeline.js`

- [ ] **Step 1: Write render-pipeline.js**

```js
// src/renderer/shared/webgl/render-pipeline.js
(function () {
  class RenderPass {
    /**
     * @param {object} opts
     * @param {string} opts.name
     * @param {function} opts.filter — (node) => boolean
     * @param {string} opts.sortMode — "none" | "back-to-front" | "front-to-back"
     * @param {object} opts.blend — { src, dst } GL enums
     */
    constructor(opts) {
      this.name = opts.name || "";
      this.enabled = opts.enabled !== false;
      this.filter = opts.filter || (() => true);
      this.sortMode = opts.sortMode || "none";
      this.blend = opts.blend || { src: null, dst: null };
    }

    /** Sort nodes according to sortMode. */
    sort(nodes, camera) {
      switch (this.sortMode) {
        case "back-to-front":
          nodes.sort((a, b) => b._sortDepth - a._sortDepth);
          break;
        case "front-to-back":
          nodes.sort((a, b) => a._sortDepth - b._sortDepth);
          break;
      }
    }
  }

  class RenderPipeline {
    /** @param {WebGL2RenderingContext} gl */
    constructor(gl, fboPool) {
      this.gl = gl;
      this.fboPool = fboPool;
      this.passes = [];
    }

    addPass(pass) {
      this.passes.push(pass);
    }

    /**
     * Execute all passes.
     * @param {import('./scene-graph').SceneNode} rootNode
     * @param {import('./camera').Camera} camera
     * @param {number} screenWidth
     * @param {number} screenHeight
     */
    execute(rootNode, camera, screenWidth, screenHeight) {
      const gl = this.gl;
      const allRenderables = [];
      rootNode.collectRenderables(allRenderables);

      this.fboPool.releaseAll();

      for (const pass of this.passes) {
        if (!pass.enabled) continue;

        const candidates = allRenderables.filter(pass.filter);
        if (candidates.length === 0) continue;

        // Compute sort depth
        for (const node of candidates) {
          node._sortDepth = node.position[0]; // approximate: use X as depth heuristic
        }
        pass.sort(candidates, camera);

        // Bind output
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, screenWidth, screenHeight);

        // Set blend mode
        if (pass.blend.src !== null) {
          gl.blendFunc(pass.blend.src, pass.blend.dst);
        }

        for (const node of candidates) {
          if (!node.render) continue;
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          gl.viewport(0, 0, screenWidth, screenHeight);
          node.render(gl, camera);
        }

        // Restore default blend
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      }
    }
  }

  window.RenderPass = RenderPass;
  window.RenderPipeline = RenderPipeline;
})();
```

- [ ] **Step 2: Integrate pipeline into renderer.js**

In `WebGLWallpaperRenderer`, replace the `_render()` method to use the pipeline:

```js
_render() {
  const gl = this.gl;
  const w = this.canvas.width;
  const h = this.canvas.height;
  this.camera.update(w, h);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (this._pipeline) {
    this._pipeline.execute(this._rootNode, this.camera, w, h);
  }
}
```

Add pipeline initialization in constructor:

```js
this._rootNode = new window.SceneGroup("root");
this._pipeline = new window.RenderPipeline(gl, this.fboPool);
this._pipeline.addPass(new window.RenderPass({
  name: "default",
  sortMode: "back-to-front",
}));
```

Update `loadScene` to populate `_rootNode` instead of `sceneNodes` flat array.

- [ ] **Step 3: Commit**

```bash
git add src/renderer/shared/webgl/render-pipeline.js src/renderer/shared/webgl/renderer.js
git commit -m "feat: add multi-pass render pipeline with sorting and blending"
```

---

## Phase 3: WE Converter (PKG Reader + Scene Converter)

### Task 3.1: Refactor PKG reader out of we-asset-loader.js

**Files:**
- Create: `src/renderer/shared/we-converter/pkg-reader.js`
- Modify: `src/main/we-asset-loader.js` (use refactored reader logic)

- [ ] **Step 1: Write pkg-reader.js — standalone PKG parser**

```js
// src/renderer/shared/we-converter/pkg-reader.js
(function () {
  const PKG_MAGIC = "PKGV0020";
  const PNG_SIG = [0x89, 0x50, 0x4e, 0x47];
  const IEND_SIG = [0x49, 0x45, 0x4e, 0x44];

  class PKGReader {
    /**
     * Parse a PKG buffer and extract all data.
     * @param {ArrayBuffer|Uint8Array} buf
     * @returns {{ entries: PKGEntry[], textures: TextureInfo[], tocEndOffset: number }}
     */
    static parse(buf) {
      const data = new Uint8Array(buf);
      const tocPos = PKGReader._findMagic(data);
      if (tocPos < 0) throw new Error("PKG magic not found");

      const version = data[tocPos - 1];
      let pos = tocPos + PKG_MAGIC.length;
      const entryCount = PKGReader._readU32(data, pos);
      pos += 4;

      const entries = [];
      for (let i = 0; i < entryCount; i++) {
        const nameLen = PKGReader._readU32(data, pos);
        pos += 4;
        const name = PKGReader._readStr(data, pos, nameLen);
        pos += nameLen;
        const dataOffset = PKGReader._readU32(data, pos);
        pos += 4;
        const dataSize = PKGReader._readU32(data, pos);
        pos += 4;

        entries.push({ name, offset: dataOffset, size: dataSize });
      }

      // Extract textures from entries
      const textures = [];
      for (const entry of entries) {
        if (entry.name.endsWith(".tex")) {
          const texData = data.slice(entry.offset, entry.offset + entry.size);
          const extracted = PKGReader._extractPNGs(texData);
          textures.push(...extracted);
        }
      }

      return { entries, textures, tocEndOffset: pos };
    }

    /** Extract PNG images from a byte buffer. Returns array of { file, offset, w, h, data }. */
    static _extractPNGs(buf) {
      const result = [];
      let offset = 0;
      let idx = 0;

      while (offset < buf.length - 4) {
        let sigIdx = -1;
        for (let k = offset; k < buf.length - 3; k++) {
          if (buf[k] === PNG_SIG[0] && buf[k + 1] === PNG_SIG[1] &&
              buf[k + 2] === PNG_SIG[2] && buf[k + 3] === PNG_SIG[3]) {
            sigIdx = k;
            break;
          }
        }
        if (sigIdx < 0) break;

        let iendIdx = -1;
        for (let k = sigIdx + 8; k < buf.length - 7; k++) {
          if (buf[k] === IEND_SIG[0] && buf[k + 1] === IEND_SIG[1] &&
              buf[k + 2] === IEND_SIG[2] && buf[k + 3] === IEND_SIG[3]) {
            iendIdx = k;
            break;
          }
        }
        if (iendIdx < 0) break;

        const end = iendIdx + 8;
        const pngData = buf.slice(sigIdx, end);

        if (pngData.length > 33 && pngData[12] === 0x49 && pngData[13] === 0x48 && pngData[14] === 0x44 && pngData[15] === 0x52) {
          const w = (pngData[16] << 24) | (pngData[17] << 16) | (pngData[18] << 8) | pngData[19];
          const h = (pngData[20] << 24) | (pngData[21] << 16) | (pngData[22] << 8) | pngData[23];
          if (w > 16 && h > 16 && w < 16384 && h < 16384) {
            result.push({ file: "tex_" + idx + ".png", offset: sigIdx, w, h, data: pngData });
            idx++;
          }
        }

        offset = end;
      }

      return result;
    }

    static _findMagic(data) {
      const magicBytes = new TextEncoder().encode(PKG_MAGIC);
      for (let i = 0; i <= data.length - magicBytes.length; i++) {
        let match = true;
        for (let j = 0; j < magicBytes.length; j++) {
          if (data[i + j] !== magicBytes[j]) { match = false; break; }
        }
        if (match) return i;
      }
      return -1;
    }

    static _readU32(data, pos) {
      return data[pos] | (data[pos + 1] << 8) | (data[pos + 2] << 16) | (data[pos + 3] << 24);
    }

    static _readStr(data, pos, len) {
      return new TextDecoder().decode(data.slice(pos, pos + len));
    }
  }

  window.PKGReader = PKGReader;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/we-converter/pkg-reader.js
git commit -m "feat: add standalone PKGReader for binary PKG parsing"
```

---

### Task 3.2: Scene converter — WE objects to SceneGraph

**Files:**
- Create: `src/renderer/shared/we-converter/scene-converter.js`

- [ ] **Step 1: Write scene-converter.js**

```js
// src/renderer/shared/we-converter/scene-converter.js
(function () {
  /**
   * Convert parsed WE scene data into our SceneGraph JSON format.
   *
   * @param {object} weData — output from WallpaperEngineLoader.load()
   * @returns {object} — { camera, children: [...] } matching SceneGraph format
   */
  class SceneConverter {
    static convert(weData) {
      const layers = weData.layers || [];
      const children = [];
      let zIndex = 1;

      // Separate named (positioned) and unnamed (background) layers
      const named = layers.filter(l => l.name);
      const unnamed = layers.filter(l => !l.name);

      // Unnamed layers first (background), sorted by size desc
      unnamed.sort((a, b) => (b.width * b.height) - (a.width * a.height));
      for (const lyr of unnamed) {
        children.push({
          type: "Layer",
          name: "_bg_" + zIndex,
          position: [lyr.x, lyr.y],
          alpha: lyr.alpha,
          zIndex: zIndex,
          texture: lyr.url,
          width: lyr.width,
          height: lyr.height,
          anchor: [0.5, 0.5],
          scale: [1.0, 1.0],
        });
        zIndex++;
      }

      // Named layers sorted by Y (bottom to top for correct render order)
      const namedSorted = [...named].sort((a, b) => {
        const aIsBgLike = a.y > 800 && a.width > 3000;
        const bIsBgLike = b.y > 800 && b.width > 3000;
        if (aIsBgLike && !bIsBgLike) return -1;
        if (!aIsBgLike && bIsBgLike) return 1;
        return a.y - b.y;
      });

      for (const lyr of namedSorted) {
        children.push({
          type: "Layer",
          name: lyr.name,
          position: [lyr.x, lyr.y],
          alpha: lyr.alpha,
          zIndex: zIndex,
          texture: lyr.url,
          width: lyr.width,
          height: lyr.height,
          anchor: [0.5, 0.5],
          scale: [1.0, 1.0],
        });
        zIndex++;
      }

      return {
        camera: { x: 1920, y: 1080, width: 3840, height: 2160 },
        children,
        meta: {
          dirName: weData.dirName,
          title: weData.title,
        },
      };
    }
  }

  window.SceneConverter = SceneConverter;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/we-converter/scene-converter.js
git commit -m "feat: add SceneConverter to translate WE data to SceneGraph format"
```

---

## Phase 4: Shader Files (GLSL)

### Task 4.1: Write all shader files

**Files:**
- Create: `src/renderer/shared/shaders/cloud.vert`
- Create: `src/renderer/shared/shaders/cloud.frag`
- Create: `src/renderer/shared/shaders/curtain.vert`
- Create: `src/renderer/shared/shaders/bloom_downsample.frag`
- Create: `src/renderer/shared/shaders/bloom_blur.frag`
- Create: `src/renderer/shared/shaders/bloom_composite.frag`
- Create: `src/renderer/shared/shaders/color_grade.frag`
- Create: `src/renderer/shared/shaders/particle.vert`
- Create: `src/renderer/shared/shaders/particle.frag`
- Create: `src/renderer/shared/shaders/text.frag`

- [ ] **Step 1: Write cloud.vert** — adds pan + deform uniforms

```glsl
#version 300 es
precision highp float;
in vec2 aPos;
in vec2 aTexCoord;
uniform mat3 uViewProj;
uniform vec2 uPosition;
uniform vec2 uScale;
uniform float uRotation;
uniform vec2 uPanOffset;
uniform float uTime;
uniform float uDeformStrength;
uniform float uDeformSpeed;
out vec2 vTexCoord;
void main() {
    float c = cos(uRotation);
    float s = sin(uRotation);
    vec2 rotated = vec2(aPos.x * c - aPos.y * s, aPos.x * s + aPos.y * c);
    vec2 offset = uPanOffset;
    offset.x += sin(uTime * uDeformSpeed + aPos.y * 0.01) * uDeformStrength * 100.0;
    offset.y += cos(uTime * uDeformSpeed * 1.3 + aPos.x * 0.01) * uDeformStrength * 50.0;
    vec2 scaled = rotated * uScale + offset;
    vec2 worldPos = scaled + uPosition;
    vec3 clip = uViewProj * vec3(worldPos, 1.0);
    gl_Position = vec4(clip.xy, 0.0, 1.0);
    vTexCoord = aTexCoord;
}
```

- [ ] **Step 2: Write cloud.frag** — adds flow + color filter

```glsl
#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform vec4 uColorFilter;
uniform float uAlpha;
uniform float uTime;
uniform float uFlowStrength;
uniform float uFlowSpeed;
void main() {
    vec2 flowOffset = vec2(
        sin(uTime * uFlowSpeed + vTexCoord.y * 20.0) * uFlowStrength * 0.02,
        cos(uTime * uFlowSpeed * 0.7 + vTexCoord.x * 20.0) * uFlowStrength * 0.02
    );
    vec4 texColor = texture(uMainTex, vTexCoord + flowOffset);
    outColor = texColor * uColorFilter * vec4(1.0, 1.0, 1.0, uAlpha);
}
```

- [ ] **Step 3: Write curtain.vert** — vertex displacement for swing

```glsl
#version 300 es
precision highp float;
in vec2 aPos;
in vec2 aTexCoord;
uniform mat3 uViewProj;
uniform vec2 uPosition;
uniform vec2 uScale;
uniform float uRotation;
uniform float uTime;
uniform float uSwingSpeed;
uniform float uSwingStrength;
uniform float uSwingTimeOffset;
out vec2 vTexCoord;
void main() {
    float c = cos(uRotation);
    float s = sin(uRotation);
    vec2 rotated = vec2(aPos.x * c - aPos.y * s, aPos.x * s + aPos.y * c);
    float sway = sin(uTime * uSwingSpeed + uSwingTimeOffset) * uSwingStrength * (1.0 - aTexCoord.y);
    rotated.x += sway * 100.0;
    vec2 scaled = rotated * uScale;
    vec2 worldPos = scaled + uPosition;
    vec3 clip = uViewProj * vec3(worldPos, 1.0);
    gl_Position = vec4(clip.xy, 0.0, 1.0);
    vTexCoord = aTexCoord;
}
```

- [ ] **Step 4: Write bloom_downsample.frag**

```glsl
#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform float uBloomThreshold;
void main() {
    vec4 color = texture(uMainTex, vTexCoord);
    float brightness = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
    outColor = brightness > uBloomThreshold ? color : vec4(0.0);
}
```

- [ ] **Step 5: Write bloom_blur.frag** — separable gaussian (used for both H and V passes)

```glsl
#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform vec2 uTexelSize;
uniform float uDirection; // 0.0 = horizontal, 1.0 = vertical
void main() {
    vec2 dir = uDirection < 0.5 ? vec2(uTexelSize.x, 0.0) : vec2(0.0, uTexelSize.y);
    vec4 result = vec4(0.0);
    float weights[5] = float[](0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);
    result += texture(uMainTex, vTexCoord) * weights[0];
    for (int i = 1; i < 5; i++) {
        float fi = float(i);
        result += texture(uMainTex, vTexCoord + dir * fi) * weights[i];
        result += texture(uMainTex, vTexCoord - dir * fi) * weights[i];
    }
    outColor = result;
}
```

- [ ] **Step 6: Write bloom_composite.frag**

```glsl
#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uSceneTex;
uniform sampler2D uBloomTex;
uniform float uBloomStrength;
void main() {
    vec4 scene = texture(uSceneTex, vTexCoord);
    vec4 bloom = texture(uBloomTex, vTexCoord);
    outColor = scene + bloom * uBloomStrength;
}
```

- [ ] **Step 7: Write color_grade.frag** — 3D LUT lookup

```glsl
#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform sampler2D uLUT; // 3D LUT unwrapped as 2D: 16x16 tiles of 16x16 cells, 4096x64
void main() {
    vec3 color = texture(uMainTex, vTexCoord).rgb;
    // Blue selects tile column (0-15), then within the 16x16 tile:
    // x = color.r * 15 + offset within tile, y = color.g * 15
    float bIndex = color.b * 15.0;
    float tileX = mod(bIndex, 16.0);
    float tileY = floor(bIndex / 16.0);
    vec2 lutCoord = vec2(
        (tileX * 16.0 + color.r * 15.0) / 256.0,
        (tileY * 16.0 + color.g * 15.0) / 16.0
    );
    outColor = vec4(texture(uLUT, lutCoord).rgb, 1.0);
}
```

- [ ] **Step 8: Write particle.vert**

```glsl
#version 300 es
precision highp float;
in vec3 aInstanceData; // posX, posY, lifetimeProgress
uniform mat3 uViewProj;
uniform vec2 uParticleSize;
out vec2 vTexCoord;
out float vAlpha;
void main() {
    vec2 pos = aInstanceData.xy;
    float progress = aInstanceData.z;
    vec3 clip = uViewProj * vec3(pos, 1.0);
    gl_PointSize = mix(uParticleSize.x, uParticleSize.y, progress);
    gl_Position = vec4(clip.xy, 0.0, 1.0);
    vAlpha = 1.0 - progress;
}
```

- [ ] **Step 9: Write particle.frag**

```glsl
#version 300 es
precision highp float;
in vec2 vTexCoord;
in float vAlpha;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform vec4 uStartColor;
uniform vec4 uEndColor;
void main() {
    vec4 texColor = texture(uMainTex, gl_PointCoord);
    outColor = texColor * mix(uStartColor, uEndColor, 1.0 - vAlpha) * vec4(1.0, 1.0, 1.0, vAlpha);
}
```

- [ ] **Step 10: Write text.frag** — SDF text

```glsl
#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform vec4 uTextColor;
uniform vec4 uOutlineColor;
uniform float uOutlineWidth;
void main() {
    float dist = texture(uMainTex, vTexCoord).r;
    float inner = 0.5;
    float outer = inner - uOutlineWidth;
    float alpha = smoothstep(outer, inner, dist);
    float outline = smoothstep(outer - 0.05, outer, dist) * (1.0 - alpha);
    outColor = uTextColor * alpha + uOutlineColor * outline;
}
```

- [ ] **Step 11: Commit**

```bash
git add src/renderer/shared/shaders/cloud.vert \
        src/renderer/shared/shaders/cloud.frag \
        src/renderer/shared/shaders/curtain.vert \
        src/renderer/shared/shaders/bloom_downsample.frag \
        src/renderer/shared/shaders/bloom_blur.frag \
        src/renderer/shared/shaders/bloom_composite.frag \
        src/renderer/shared/shaders/color_grade.frag \
        src/renderer/shared/shaders/particle.vert \
        src/renderer/shared/shaders/particle.frag \
        src/renderer/shared/shaders/text.frag
git commit -m "feat: add all GLSL shaders (cloud, curtain, bloom, color grade, particle, text)"
```

---

## Phase 5: Animation Controllers

### Task 5.1: Timeline + Keyframe system

**Files:**
- Create: `src/renderer/shared/webgl/animation/timeline.js`

- [ ] **Step 1: Write timeline.js**

```js
// src/renderer/shared/webgl/animation/timeline.js
(function () {
  const M = window.WebGLMath;

  class KeyframeTrack {
    /**
     * @param {object} def — { target, property, keyframes, interpolation }
     */
    constructor(def) {
      this.target = def.target || "";   // "nodeName"
      this.property = def.property || ""; // "position.x" | "alpha" | "scale"
      this.keyframes = (def.keyframes || []).sort((a, b) => a.time - b.time);
      this.interpolation = def.interpolation || "linear";
    }

    evaluate(time, sceneNodes) {
      const kfs = this.keyframes;
      if (kfs.length === 0) return null;
      if (time <= kfs[0].time) return kfs[0].value;
      if (time >= kfs[kfs.length - 1].time) return kfs[kfs.length - 1].value;

      let i = 0;
      while (i < kfs.length - 1 && kfs[i + 1].time < time) i++;

      const a = kfs[i];
      const b = kfs[i + 1];
      const t = (time - a.time) / (b.time - a.time);
      const et = this._applyEasing(t, a.easing || this.interpolation);

      if (typeof a.value === "number") {
        return M.lerp(a.value, b.value, et);
      } else if (Array.isArray(a.value)) {
        const out = [];
        for (let j = 0; j < a.value.length; j++) {
          out[j] = M.lerp(a.value[j], b.value[j], et);
        }
        return out;
      }
      return et < 0.5 ? a.value : b.value;
    }

    _applyEasing(t, easing) {
      switch (easing) {
        case "linear": return t;
        case "ease-in": return t * t;
        case "ease-out": return t * (2 - t);
        case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        case "step": return t < 1.0 ? 0.0 : 1.0;
        default: return t;
      }
    }
  }

  class Timeline {
    constructor(def) {
      this.name = def.name || "";
      this.duration = def.duration || 10;
      this.loop = def.loop !== false;
      this.tracks = (def.tracks || []).map(t => new KeyframeTrack(t));
      this._time = 0;
      this._playing = false;
    }

    play() { this._playing = true; }
    pause() { this._playing = false; }
    stop() { this._playing = false; this._time = 0; }
    seek(time) { this._time = time; }

    update(dt, sceneNodes) {
      if (!this._playing) return;
      this._time += dt;
      if (this._time >= this.duration) {
        if (this.loop) this._time = 0;
        else { this._time = this.duration; this._playing = false; }
      }
      this.apply(sceneNodes);
    }

    apply(sceneNodes) {
      const nodeMap = new Map();
      for (const n of sceneNodes) nodeMap.set(n.name, n);

      for (const track of this.tracks) {
        const node = nodeMap.get(track.target);
        if (!node) continue;
        const value = track.evaluate(this._time);
        if (value === null) continue;
        this._setProperty(node, track.property, value);
      }
    }

    _setProperty(node, prop, value) {
      const parts = prop.split(".");
      if (parts.length === 1) {
        if (node[prop] && typeof node[prop] === "object" && "length" in node[prop]) {
          node[prop][0] = Array.isArray(value) ? value[0] : value;
          node[prop][1] = Array.isArray(value) ? value[1] : value;
        } else {
          node[prop] = value;
        }
      } else if (parts.length === 2) {
        // e.g., "position.x"
        const idx = parts[1] === "x" ? 0 : parts[1] === "y" ? 1 : parts[1] === "z" ? 2 : 3;
        node[parts[0]][idx] = value;
      }
      if (node.markDirty) node.markDirty();
    }
  }

  window.KeyframeTrack = KeyframeTrack;
  window.Timeline = Timeline;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/webgl/animation/timeline.js
git commit -m "feat: add Timeline and KeyframeTrack animation system"
```

---

### Task 5.2: Base Controller + Built-in Controllers

**Files:**
- Create: `src/renderer/shared/webgl/animation/controller.js`
- Create: `src/renderer/shared/webgl/animation/builtin/breathing.js`
- Create: `src/renderer/shared/webgl/animation/builtin/parallax.js`
- Create: `src/renderer/shared/webgl/animation/builtin/swing.js`
- Create: `src/renderer/shared/webgl/animation/builtin/pan.js`
- Create: `src/renderer/shared/webgl/animation/builtin/deform.js`
- Create: `src/renderer/shared/webgl/animation/builtin/flow.js`
- Create: `src/renderer/shared/webgl/animation/builtin/time-of-day.js`
- Create: `src/renderer/shared/webgl/animation/builtin/clock.js`

- [ ] **Step 1: Write controller.js** — base class

```js
// src/renderer/shared/webgl/animation/controller.js
(function () {
  class AnimationController {
    constructor(def) {
      this.enabled = def.enabled !== false;
    }
    /** @param {number} dt — delta time in seconds */
    update(dt, node, mouseX, mouseY) {}
  }
  window.AnimationController = AnimationController;
})();
```

- [ ] **Step 2: Write breathing.js**

```js
// src/renderer/shared/webgl/animation/builtin/breathing.js
(function () {
  class BreathingController extends window.AnimationController {
    constructor(def) {
      super(def);
      this.speed = def.speed || 1.2;
      this.strength = def.strength || 0.35;
      this._phase = 0;
    }
    update(dt, node) {
      if (!this.enabled) return;
      this._phase += dt * this.speed;
      const s = 1.0 + Math.sin(this._phase) * this.strength;
      node.scale[0] = s;
      node.scale[1] = s;
      node.markDirty();
    }
  }
  window.AnimationController_BreathingController = BreathingController;
})();
```

- [ ] **Step 3: Write parallax.js**

```js
// src/renderer/shared/webgl/animation/builtin/parallax.js
(function () {
  class ParallaxController extends window.AnimationController {
    constructor(def) {
      super(def);
      this.strength = def.strength || -100;
      this.smoothing = def.smoothing || 1.6;
      this._currentX = 0;
      this._currentY = 0;
    }
    update(dt, node, mouseX, mouseY) {
      if (!this.enabled) return;
      const targetX = (mouseX - 0.5) * this.strength;
      const targetY = (mouseY - 0.5) * this.strength;
      const a = Math.min(dt / this.smoothing, 1.0);
      this._currentX += (targetX - this._currentX) * a;
      this._currentY += (targetY - this._currentY) * a;
      // Store parallax offset on node for shader to use
      if (!node._parallaxOffset) node._parallaxOffset = [0, 0];
      node._parallaxOffset[0] = this._currentX;
      node._parallaxOffset[1] = this._currentY;
      if (node.material) {
        node.material.setUniform("uParallax", [this._currentX, this._currentY]);
      }
      node.markDirty();
    }
  }
  window.AnimationController_ParallaxController = ParallaxController;
})();
```

- [ ] **Step 4: Write swing.js** — curtain swing

```js
// src/renderer/shared/webgl/animation/builtin/swing.js
(function () {
  class SwingController extends window.AnimationController {
    constructor(def) {
      super(def);
      this.speed = def.speed || 0.1;
      this.strength = def.strength || 0.3;
      this.timeOffset = def.timeOffset || 0;
    }
    update(dt, node) {
      if (!this.enabled) return;
      if (node.material) {
        node.material.setUniform("uSwingSpeed", this.speed);
        node.material.setUniform("uSwingStrength", this.strength);
        node.material.setUniform("uSwingTimeOffset", this.timeOffset);
        node.material.setUniform("uTime", node.material.uniforms.uTime + dt || dt);
      }
    }
  }
  window.AnimationController_SwingController = SwingController;
})();
```

- [ ] **Step 5: Write pan.js** — cloud/background pan

```js
// src/renderer/shared/webgl/animation/builtin/pan.js
(function () {
  class PanController extends window.AnimationController {
    constructor(def) {
      super(def);
      this.speed = def.speed || 1.0;
      this.direction = def.direction || [1, 0];
      this._offset = [0, 0];
    }
    update(dt, node) {
      if (!this.enabled) return;
      this._offset[0] += this.direction[0] * this.speed * dt * 100;
      this._offset[1] += this.direction[1] * this.speed * dt * 100;
      if (node.material) {
        node.material.setUniform("uPanOffset", this._offset);
      }
    }
  }
  window.AnimationController_PanController = PanController;
})();
```

- [ ] **Step 6: Write deform.js + flow.js**

```js
// src/renderer/shared/webgl/animation/builtin/deform.js
(function () {
  class DeformController extends window.AnimationController {
    constructor(def) {
      super(def);
      this.speed = def.speed || 0.07;
      this.strength = def.strength || 0.15;
      this._time = 0;
    }
    update(dt, node) {
      if (!this.enabled) return;
      this._time += dt;
      if (node.material) {
        node.material.setUniform("uTime", this._time);
        node.material.setUniform("uDeformSpeed", this.speed);
        node.material.setUniform("uDeformStrength", this.strength);
      }
    }
  }
  window.AnimationController_DeformController = DeformController;
})();
```

```js
// src/renderer/shared/webgl/animation/builtin/flow.js
(function () {
  class FlowController extends window.AnimationController {
    constructor(def) {
      super(def);
      this.speed = def.speed || 0.25;
      this.strength = def.strength || 1.0;
      this._time = 0;
    }
    update(dt, node) {
      if (!this.enabled) return;
      this._time += dt;
      if (node.material) {
        node.material.setUniform("uTime", this._time);
        node.material.setUniform("uFlowSpeed", this.speed);
        node.material.setUniform("uFlowStrength", this.strength);
      }
    }
  }
  window.AnimationController_FlowController = FlowController;
})();
```

- [ ] **Step 7: Write time-of-day.js**

```js
// src/renderer/shared/webgl/animation/builtin/time-of-day.js
(function () {
  class TimeOfDayController extends window.AnimationController {
    constructor(def) {
      super(def);
      this.morningTime = def.morningTime || "5:30";
      this.daytimeTime = def.daytimeTime || "7:30";
      this.sunsetTime = def.sunsetTime || "17:30";
      this.nightTime = def.nightTime || "19:00";
      this._currentPeriod = "daytime";
    }
    update(dt, node) {
      if (!this.enabled) return;
      const now = new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      const morning = this._parseTime(this.morningTime);
      const daytime = this._parseTime(this.daytimeTime);
      const sunset = this._parseTime(this.sunsetTime);
      const night = this._parseTime(this.nightTime);

      let period;
      if (minutes >= night || minutes < morning) period = "night";
      else if (minutes >= morning && minutes < daytime) period = "morning";
      else if (minutes >= daytime && minutes < sunset) period = "daytime";
      else period = "sunset";

      if (period !== this._currentPeriod) {
        this._currentPeriod = period;
        if (node._onTimeOfDayChange) node._onTimeOfDayChange(period);
      }
    }
    _parseTime(str) {
      const [h, m] = str.split(":").map(Number);
      return h * 60 + (m || 0);
    }
  }
  window.AnimationController_TimeOfDayController = TimeOfDayController;
})();
```

- [ ] **Step 8: Write clock.js**

```js
// src/renderer/shared/webgl/animation/builtin/clock.js
(function () {
  class ClockController extends window.AnimationController {
    constructor(def) {
      super(def);
      this.format = def.format || "HH:mm";
      this.language = def.language || "en";
      this.customWeekdays = def.customWeekdays || [];
      this.customHours = def.customHours || [];
      this._weekdaysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      this._weekdaysZh = ["日", "一", "二", "三", "四", "五", "六"];
      this._weekdaysJa = ["日", "月", "火", "水", "木", "金", "土"];
      this._periodsEn = ["AM", "PM"];
      this._periodsZh = ["上午", "下午"];
      this._periodsJa = ["午前", "午後"];
    }
    update(dt, node) {
      if (!this.enabled) return;
      const now = new Date();
      node.text = this._formatTime(now);
    }
    _formatTime(date) {
      let result = this.format;
      const h = date.getHours();
      const h12 = h % 12 || 12;
      const jh = (h + 6) % 30; // 30-hour clock hour

      result = result.replace(/yyyy/g, String(date.getFullYear()));
      result = result.replace(/yy/g, String(date.getFullYear()).slice(-2));
      result = result.replace(/MM/g, String(date.getMonth() + 1).padStart(2, "0"));
      result = result.replace(/dd/g, String(date.getDate()).padStart(2, "0"));
      result = result.replace(/HH/g, String(h).padStart(2, "0"));
      result = result.replace(/hh/g, String(h12).padStart(2, "0"));
      result = result.replace(/mm/g, String(date.getMinutes()).padStart(2, "0"));
      result = result.replace(/ss/g, String(date.getSeconds()).padStart(2, "0"));
      result = result.replace(/JM/g, String(date.getMonth() + 1).padStart(2, "0"));
      result = result.replace(/Jd/g, String(date.getDate()).padStart(2, "0"));
      result = result.replace(/JH/g, String(jh).padStart(2, "0"));

      // Day of week
      const wd = date.getDay();
      let wdStr;
      switch (this.language) {
        case "zh": wdStr = this._weekdaysZh[wd]; break;
        case "ja": wdStr = this._weekdaysJa[wd]; break;
        case "custom": wdStr = this.customWeekdays[wd] || this._weekdaysEn[wd]; break;
        default: wdStr = this._weekdaysEn[wd]; break;
      }
      result = result.replace(/\[JW\]/g, wdStr);
      result = result.replace(/\[W\]/g, wdStr);

      // Time period
      const period = h < 12 ? 0 : 1;
      let pStr;
      switch (this.language) {
        case "zh": pStr = this._periodsZh[period]; break;
        case "ja": pStr = this._periodsJa[period]; break;
        default: pStr = this._periodsEn[period]; break;
      }
      result = result.replace(/\[P\]/g, pStr);
      result = result.replace(/\\n/g, "\n");

      return result;
    }
  }
  window.AnimationController_ClockController = ClockController;
})();
```

- [ ] **Step 9: Commit**

```bash
git add src/renderer/shared/webgl/animation/controller.js \
        src/renderer/shared/webgl/animation/builtin/breathing.js \
        src/renderer/shared/webgl/animation/builtin/parallax.js \
        src/renderer/shared/webgl/animation/builtin/swing.js \
        src/renderer/shared/webgl/animation/builtin/pan.js \
        src/renderer/shared/webgl/animation/builtin/deform.js \
        src/renderer/shared/webgl/animation/builtin/flow.js \
        src/renderer/shared/webgl/animation/builtin/time-of-day.js \
        src/renderer/shared/webgl/animation/builtin/clock.js
git commit -m "feat: add animation controllers (breathing, parallax, swing, pan, deform, flow, time-of-day, clock)"
```

---

## Phase 6: Particle System

### Task 6.1: ParticleEmitter node + ParticleSystem

**Files:**
- Create: `src/renderer/shared/webgl/particles/emitter.js`
- Create: `src/renderer/shared/webgl/particles/system.js`

- [ ] **Step 1: Write emitter.js**

```js
// src/renderer/shared/webgl/particles/emitter.js
(function () {
  const M = window.WebGLMath;

  class ParticleEmitter extends window.SceneNode {
    constructor(def) {
      super(def.name || "emitter");
      this.position = M.vec2.create(def.position ? def.position[0] : 0, def.position ? def.position[1] : 0);
      this.zIndex = def.zIndex || 100;
      this.maxParticles = def.maxParticles || 500;
      this.emissionRate = def.emissionRate || 2;
      this.lifetime = def.lifetime || [3, 6];
      this.startSize = def.startSize || [0.5, 1.5];
      this.endSize = def.endSize || [0.1, 0.3];
      this.startColor = def.startColor || [1, 1, 1, 1];
      this.endColor = def.endColor || [1, 1, 1, 0];
      this.startSpeed = def.startSpeed || [5, 20];
      this.direction = def.direction || [0, Math.PI * 2];
      this.gravity = def.gravity || [0, -5];
      this.blendMode = def.blendMode || "alpha";
      this._textureUrl = def.texture || "";
      this._spawnTimer = 0;
      this._particles = []; // CPU-side state for emission tracking
      this._gpuDirty = true;
    }

    updateEmitter(dt) {
      // Remove dead particles
      const now = performance.now() / 1000;
      this._particles = this._particles.filter(p => now - p.birthTime < p.lifetime);
      this._spawnTimer += dt;

      const interval = 1 / this.emissionRate;
      while (this._spawnTimer >= interval && this._particles.length < this.maxParticles) {
        this._spawnTimer -= interval;
        const angle = this.direction[0] + Math.random() * (this.direction[1] - this.direction[0]);
        const speed = this.startSpeed[0] + Math.random() * (this.startSpeed[1] - this.startSpeed[0]);
        this._particles.push({
          posX: this.position[0],
          posY: this.position[1],
          velX: Math.cos(angle) * speed,
          velY: Math.sin(angle) * speed,
          birthTime: now,
          lifetime: this.lifetime[0] + Math.random() * (this.lifetime[1] - this.lifetime[0]),
          seed: Math.random(),
        });
        this._gpuDirty = true;
      }

      if (this._spawnTimer > interval) this._spawnTimer = interval;
    }

    /** Build GPU instance buffer for this frame. */
    getInstanceData() {
      const now = performance.now() / 1000;
      const data = new Float32Array(this._particles.length * 3);
      for (let i = 0; i < this._particles.length; i++) {
        const p = this._particles[i];
        const elapsed = now - p.birthTime;
        const progress = Math.min(elapsed / p.lifetime, 1.0);
        const x = p.posX + p.velX * elapsed + 0.5 * this.gravity[0] * elapsed * elapsed;
        const y = p.posY + p.velY * elapsed + 0.5 * this.gravity[1] * elapsed * elapsed;
        data[i * 3] = x;
        data[i * 3 + 1] = y;
        data[i * 3 + 2] = progress;
      }
      return data;
    }

    get aliveCount() { return this._particles.length; }
  }

  window.ParticleEmitter = ParticleEmitter;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/webgl/particles/emitter.js
git commit -m "feat: add GPU-driven ParticleEmitter node"
```

---

## Phase 7: Text Rendering

### Task 7.1: TextNode

- [ ] **Step 1: Write text-node.js**

```js
// src/renderer/shared/webgl/text/text-node.js
(function () {
  const M = window.WebGLMath;

  class TextNode extends window.SceneNode {
    constructor(def) {
      super(def.name || "text");
      this.position = M.vec2.create(def.position ? def.position[0] : 0, def.position ? def.position[1] : 0);
      this.zIndex = def.zIndex || 200;
      this.alpha = def.alpha != null ? def.alpha : 1;
      this._text = def.text || "";
      this._fontFamily = def.fontFamily || "sans-serif";
      this._fontSize = def.fontSize || 32;
      this._fontWeight = def.fontWeight || "normal";
      this._color = def.color || [1, 1, 1, 1];
      this._alignment = def.alignment || "left";
      this._outline = def.outline || null; // { width, color }
      this._shadow = def.shadow || null;    // { offset, blur, color }
      this._dirty = true;
      this._canvas = document.createElement("canvas");
      this._ctx = this._canvas.getContext("2d");
      this._texture = null;
    }

    get text() { return this._text; }
    set text(v) {
      if (v !== this._text) { this._text = v; this._dirty = true; }
    }

    _rasterize(textureManager) {
      const ctx = this._ctx;
      const font = this._fontWeight + " " + this._fontSize + "px " + this._fontFamily;
      ctx.font = font;
      const metrics = ctx.measureText(this._text);
      const w = Math.ceil(metrics.width) + 4;
      const h = Math.ceil(this._fontSize * 1.5);
      this._canvas.width = w;
      this._canvas.height = h;
      ctx.font = font;
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(" + this._color.map(c => Math.round(c * 255)).join(",") + ")";
      ctx.fillText(this._text, 2, 2);
      this._texture = textureManager.fromCanvas(this._canvas);
      this._mesh = new window.QuadMesh(textureManager._gl, w / this._fontSize, h / this._fontSize, 0, 0);
      this._dirty = false;
    }

    render(gl, camera, textureManager) {
      if (!this.visible) return;
      if (this._dirty || !this._texture) this._rasterize(textureManager);
      if (!this._texture) return;

      const shader = gl._defaultShader;
      gl.useProgram(shader);

      const viewProj = camera.getViewProjMatrix();
      gl.uniformMatrix3fv(gl.getUniformLocation(shader, "uViewProj"), false, viewProj);
      gl.uniform2f(gl.getUniformLocation(shader, "uPosition"), this.position[0], this.position[1]);
      gl.uniform2f(gl.getUniformLocation(shader, "uScale"), this._fontSize, this._fontSize);
      gl.uniform1f(gl.getUniformLocation(shader, "uRotation"), 0);
      gl.uniform4f(gl.getUniformLocation(shader, "uColorFilter"), 1, 1, 1, 1);
      gl.uniform1f(gl.getUniformLocation(shader, "uAlpha"), this.alpha);

      textureManager.bind(0, this._texture);
      gl.uniform1i(gl.getUniformLocation(shader, "uMainTex"), 0);

      this._mesh.draw();
    }
  }

  window.TextNode = TextNode;
})();
```

- [ ] **Step 2: Commit**

```bash
git add src/renderer/shared/webgl/text/text-node.js
git commit -m "feat: add TextNode with Canvas2D rasterization and GPU texturing"
```

---

## Phase 8: Post-Process Integration

### Task 8.1: Integrate Bloom + ColorGrade passes into the pipeline

**Files:**
- Modify: `src/renderer/shared/webgl/renderer.js`
- Modify: `src/renderer/shared/webgl/render-pipeline.js`

- [ ] **Step 1: Add fullscreen quad pass support to pipeline**

In `render-pipeline.js`, add a `FullscreenPass` class:

```js
class FullscreenPass extends RenderPass {
  constructor(opts) {
    super(opts);
    this.shaderName = opts.shader || "default";
  }

  execute(gl, fboPool, inputFbo, outputFbo, screenWidth, screenHeight, shaderManager) {
    const output = outputFbo || null;
    gl.bindFramebuffer(gl.FRAMEBUFFER, output ? output.fbo : null);
    gl.viewport(0, 0, screenWidth, screenHeight);

    const program = shaderManager.get(this.shaderName);
    gl.useProgram(program);

    // Bind input texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputFbo ? inputFbo.colorTexture : null);
    gl.uniform1i(gl.getUniformLocation(program, "uMainTex"), 0);

    // Draw fullscreen quad
    gl.bindVertexArray(this._fsQuadVao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}
```

- [ ] **Step 2: Add BloomPass and ColorGradePass to renderer.js**

In `WebGLWallpaperRenderer._render()`, after the main scene pass, add:

```js
// Bloom
if (this._bloomEnabled) {
  // Downsample
  const downFBO = this.fboPool.acquire("bloom_down", w / 4, h / 4);
  this._bloomDownsamplePass.execute(gl, this.fboPool, null, downFBO, w / 4, h / 4, this.shaderManager);

  // Horizontal blur
  const blurHFBO = this.fboPool.acquire("bloom_blur_h", w / 4, h / 4);
  this._bloomBlurHPass.execute(gl, this.fboPool, downFBO, blurHFBO, w / 4, h / 4, this.shaderManager);

  // Vertical blur
  const blurVFBO = this.fboPool.acquire("bloom_blur_v", w / 4, h / 4);
  this._bloomBlurVPass.execute(gl, this.fboPool, blurHFBO, blurVFBO, w / 4, h / 4, this.shaderManager);

  // Composite
  const sceneFBO = this.fboPool.acquire("scene", w, h);
  // (Copy screen to sceneFBO...)
  this._bloomCompositePass.execute(gl, this.fboPool, blurVFBO, sceneFBO, w, h, this.shaderManager);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/renderer/shared/webgl/renderer.js src/renderer/shared/webgl/render-pipeline.js
git commit -m "feat: add bloom post-process (downsample, H+V blur, composite) and color grade"
```

---

## Phase 9: IPC + Main Process (Scene Loading, Editor Communication)

### Task 9.1: Add IPC channels for scene + editor

**Files:**
- Modify: `src/shared/constants.js`
- Modify: `src/preload.js`
- Modify: `src/renderer/shared/ipc-client.js`
- Modify: `src/main/ipc-handlers.js`

- [ ] **Step 1: Add constants to constants.js**

```js
// Add to IPC object:
SCENE_LOAD: "scene:load",
SCENE_SAVE: "scene:save",
SCENE_GET: "scene:get",
EDITOR_OPEN: "editor:open",
EDITOR_APPLY: "editor:apply",
EDITOR_UPDATE_PROPERTY: "editor:update-property",
```

- [ ] **Step 2: Add preload.js methods**

```js
// Add to contextBridge:
scene: {
  load: (filePath) => ipcRenderer.invoke("scene:load", { filePath }),
  save: (filePath, data) => ipcRenderer.invoke("scene:save", { filePath, data }),
  get: () => ipcRenderer.invoke("scene:get"),
},
editor: {
  open: () => ipcRenderer.invoke("editor:open"),
  apply: (sceneData) => ipcRenderer.invoke("editor:apply", { sceneData }),
  updateProperty: (node, prop, value) => ipcRenderer.invoke("editor:update-property", { node, prop, value }),
},
```

- [ ] **Step 3: Add ipc-client.js methods**

```js
// scene:
loadScene(filePath) { return call("scene:load", { filePath }); },
saveScene(filePath, data) { return call("scene:save", { filePath, data }); },
getScene() { return call("scene:get"); },
// editor:
openEditor() { return call("editor:open"); },
applyScene(sceneData) { return call("editor:apply", { sceneData }); },
updateProperty(node, prop, value) { return call("editor:update-property", { node, prop, value }); },
```

- [ ] **Step 4: Add IPC handlers in ipc-handlers.js**

```js
// Scene handlers
ipcMain.handle(IPC.SCENE_SAVE, async (_event, { filePath, data }) => runSafe(() => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  return { saved: true };
}));

// Editor relay: forward applyScene from editor to wallpaper window
ipcMain.handle(IPC.EDITOR_APPLY, (_event, { sceneData }) => {
  const wallpaperWin = windowManager.getWindow(MODE.WALLPAPER);
  if (wallpaperWin && !wallpaperWin.isDestroyed()) {
    wallpaperWin.webContents.send(IPC.EDITOR_APPLY, { sceneData });
  }
  return { ok: true };
});
```

- [ ] **Step 5: Commit**

```bash
git add src/shared/constants.js src/preload.js src/renderer/shared/ipc-client.js src/main/ipc-handlers.js
git commit -m "feat: add scene load/save IPC and editor communication channels"
```

---

### Task 9.2: Editor window manager

**Files:**
- Create: `src/main/editor-window.js`
- Modify: `src/main/main.js`

- [ ] **Step 1: Write editor-window.js**

```js
// src/main/editor-window.js
const { BrowserWindow } = require("electron");
const path = require("node:path");

class EditorWindowManager {
  constructor(preloadPath) {
    this._preloadPath = preloadPath;
    this._win = null;
  }

  open() {
    if (this._win && !this._win.isDestroyed()) {
      this._win.focus();
      return this._win;
    }
    this._win = new BrowserWindow({
      width: 1280,
      height: 900,
      minWidth: 960,
      minHeight: 600,
      title: "Wallpaper Editor",
      webPreferences: {
        preload: this._preloadPath,
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false,
      },
    });
    const htmlPath = path.join(__dirname, "..", "renderer", "editor", "index.html");
    this._win.loadFile(htmlPath);
    this._win.setMenuBarVisibility(false);
    this._win.on("closed", () => { this._win = null; });
    return this._win;
  }

  close() {
    if (this._win && !this._win.isDestroyed()) this._win.close();
  }

  getWindow() { return this._win; }
}

module.exports = { EditorWindowManager };
```

- [ ] **Step 2: Wire into main.js**

```js
const { EditorWindowManager } = require("./editor-window");
// In app.whenReady():
editorWindowManager = new EditorWindowManager(preloadPath);
// Pass to registerIpcHandlers services
```

- [ ] **Step 3: Commit**

```bash
git add src/main/editor-window.js src/main/main.js
git commit -m "feat: add EditorWindow manager for separate editor window"
```

---

## Phase 10: Editor UI

### Task 10.1: Editor window HTML + CSS layout

**Files:**
- Create: `src/renderer/editor/index.html`

- [ ] **Step 1: Write editor index.html with four-panel layout**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wallpaper Editor</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
      font-size: 13px;
      color: #ccc;
      background: #1e1e1e;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    #menuBar {
      height: 30px;
      background: #2d2d2d;
      display: flex;
      align-items: center;
      padding: 0 8px;
      gap: 8px;
      border-bottom: 1px solid #3d3d3d;
    }
    #menuBar button {
      background: transparent;
      border: none;
      color: #ccc;
      padding: 4px 10px;
      cursor: pointer;
      border-radius: 3px;
    }
    #menuBar button:hover { background: #3d3d3d; }
    #mainArea {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    #leftPanel {
      width: 240px;
      background: #252525;
      border-right: 1px solid #3d3d3d;
      display: flex;
      flex-direction: column;
    }
    #centerPanel {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #1a1a1a;
    }
    #rightPanel {
      width: 280px;
      background: #252525;
      border-left: 1px solid #3d3d3d;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    #bottomPanel {
      height: 180px;
      background: #252525;
      border-top: 1px solid #3d3d3d;
    }
    .panel-header {
      padding: 6px 10px;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #999;
      background: #2a2a2a;
      border-bottom: 1px solid #3d3d3d;
    }
    #preview {
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    #preview canvas {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="menuBar">
    <button onclick="editorApp.fileNew()">New</button>
    <button onclick="editorApp.fileOpen()">Open</button>
    <button onclick="editorApp.fileSave()">Save</button>
    <button onclick="editorApp.importWE()">Import WE</button>
    <span style="flex:1"></span>
    <button onclick="editorApp.applyToWallpaper()">Apply to Wallpaper</button>
  </div>
  <div id="mainArea">
    <div id="leftPanel">
      <div class="panel-header">Scene Tree</div>
      <div id="sceneTree" style="flex:1;overflow-y:auto;padding:4px;"></div>
    </div>
    <div id="centerPanel">
      <div id="preview"><canvas id="previewCanvas"></canvas></div>
      <div id="bottomPanel">
        <div class="panel-header">Timeline</div>
        <div id="timeline" style="padding:8px;"></div>
      </div>
    </div>
    <div id="rightPanel">
      <div class="panel-header">Property Inspector</div>
      <div id="propertyInspector" style="padding:8px;"></div>
    </div>
  </div>

  <script src="../shared/webgl/math.js"></script>
  <script src="../shared/webgl/shader-manager.js"></script>
  <script src="../shared/webgl/texture-manager.js"></script>
  <script src="../shared/webgl/mesh.js"></script>
  <script src="../shared/webgl/framebuffer.js"></script>
  <script src="../shared/webgl/camera.js"></script>
  <script src="../shared/webgl/material.js"></script>
  <script src="../shared/webgl/scene-graph.js"></script>
  <script src="../shared/webgl/render-pipeline.js"></script>
  <script src="../shared/webgl/renderer.js"></script>
  <script src="../shared/webgl/animation/timeline.js"></script>
  <script src="../shared/webgl/animation/controller.js"></script>
  <script src="../shared/webgl/animation/builtin/breathing.js"></script>
  <script src="../shared/webgl/animation/builtin/parallax.js"></script>
  <script src="../shared/webgl/animation/builtin/swing.js"></script>
  <script src="../shared/webgl/animation/builtin/pan.js"></script>
  <script src="../shared/webgl/animation/builtin/deform.js"></script>
  <script src="../shared/webgl/animation/builtin/flow.js"></script>
  <script src="../shared/webgl/animation/builtin/time-of-day.js"></script>
  <script src="../shared/webgl/animation/builtin/clock.js"></script>
  <script src="../shared/we-converter/pkg-reader.js"></script>
  <script src="../shared/we-converter/scene-converter.js"></script>
  <script src="../shared/ipc-client.js"></script>
  <script src="editor-app.js"></script>
  <script src="panels/scene-tree.js"></script>
  <script src="panels/property-inspector.js"></script>
  <script src="panels/timeline.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write editor-app.js** — bootstrap + IPC

```js
// src/renderer/editor/editor-app.js
(function () {
  class EditorApp {
    constructor() {
      this.renderer = null;
      this.sceneData = null;
      this._selectedNode = null;
    }

    async init() {
      const canvas = document.getElementById("previewCanvas");
      this.renderer = new WebGLWallpaperRenderer(canvas);
      this.renderer.registerShader("default",
        document.getElementById("shader-default-vert")?.textContent || "",
        document.getElementById("shader-default-frag")?.textContent || ""
      );
      this.renderer.start();

      // Load current scene from wallpaper
      const res = await ipc.getScene();
      if (res.ok && res.data) {
        this.loadScene(res.data);
      } else {
        // Default empty scene
        this.sceneData = { camera: { x: 1920, y: 1080, width: 3840, height: 2160 }, children: [] };
        this.refreshAll();
      }
    }

    loadScene(data) {
      this.sceneData = data;
      this.renderer.loadScene(data);
      this.refreshAll();
    }

    async fileOpen() {
      const res = await ipc.loadScene(""); // empty = show dialog
      if (res.ok && res.data) this.loadScene(res.data);
    }

    async fileSave() {
      if (!this.sceneData) return;
      await ipc.saveScene("", this.sceneData);
    }

    async applyToWallpaper() {
      await ipc.applyScene(this.sceneData);
    }

    selectNode(node) {
      this._selectedNode = node;
      window.propertyInspector?.show(node);
    }

    refreshAll() {
      window.sceneTreePanel?.refresh(this.sceneData, this);
      window.propertyInspector?.refresh();
      window.timelinePanel?.refresh();
    }
  }

  window.editorApp = new EditorApp();
  document.addEventListener("DOMContentLoaded", () => window.editorApp.init());
})();
```

- [ ] **Step 3: Commit**

```bash
git add src/renderer/editor/index.html src/renderer/editor/editor-app.js
git commit -m "feat: add editor window HTML layout + bootstrap + IPC integration"
```

---

### Task 10.2: Scene Tree panel + Property Inspector + Timeline panels

**Files:**
- Create: `src/renderer/editor/panels/scene-tree.js`
- Create: `src/renderer/editor/panels/property-inspector.js`
- Create: `src/renderer/editor/panels/timeline.js`

- [ ] **Step 1: Write scene-tree.js**

```js
// src/renderer/editor/panels/scene-tree.js
(function () {
  class SceneTreePanel {
    constructor(containerId) {
      this._el = document.getElementById(containerId);
    }

    refresh(sceneData, editorApp) {
      this._el.innerHTML = "";
      this._editor = editorApp;
      this._renderTree(sceneData.children || [], this._el, 0);
    }

    _renderTree(children, parentEl, depth) {
      for (const node of children) {
        const div = document.createElement("div");
        div.style.cssText = "padding:2px 4px 2px " + (depth * 16 + 8) + "px;cursor:pointer;";
        div.textContent = (node.type === "Group" ? "▸ " : "• ") + (node.name || "(unnamed)");
        div.onclick = () => this._editor.selectNode(node);
        parentEl.appendChild(div);
        if (node.children) this._renderTree(node.children, parentEl, depth + 1);
      }
    }
  }

  window.sceneTreePanel = new SceneTreePanel("sceneTree");
})();
```

- [ ] **Step 2: Write property-inspector.js**

```js
// src/renderer/editor/panels/property-inspector.js
(function () {
  class PropertyInspector {
    constructor(containerId) {
      this._el = document.getElementById(containerId);
    }

    show(node) {
      if (!node) { this._el.innerHTML = "<p style='color:#666'>No selection</p>"; return; }
      let html = "<div style='display:flex;flex-direction:column;gap:6px;'>";
      html += "<label>Name: <input id='prop_name' value='" + (node.name || "") + "'></label>";
      if (node.position) {
        html += "<label>X: <input id='prop_x' type='number' value='" + node.position[0] + "' step='1'></label>";
        html += "<label>Y: <input id='prop_y' type='number' value='" + node.position[1] + "' step='1'></label>";
      }
      if (node.alpha != null) {
        html += "<label>Alpha: <input id='prop_alpha' type='range' min='0' max='1' step='0.01' value='" + node.alpha + "'></label>";
      }
      if (node.zIndex != null) {
        html += "<label>Z-Index: <input id='prop_z' type='number' value='" + node.zIndex + "'></label>";
      }
      html += "</div>";
      this._el.innerHTML = html;
    }

    refresh() {
      this._el.innerHTML = "<p style='color:#666'>No selection</p>";
    }
  }

  window.propertyInspector = new PropertyInspector("propertyInspector");
})();
```

- [ ] **Step 3: Write timeline.js** — stub (keyframe editor is complex, build incrementally)

```js
// src/renderer/editor/panels/timeline.js
(function () {
  class TimelinePanel {
    constructor() {
      this._el = document.getElementById("timeline");
    }
    refresh() {
      this._el.innerHTML = "<p style='color:#666'>Timeline — drag keyframes here</p>";
    }
  }
  window.timelinePanel = new TimelinePanel();
})();
```

- [ ] **Step 4: Commit**

```bash
git add src/renderer/editor/panels/scene-tree.js \
        src/renderer/editor/panels/property-inspector.js \
        src/renderer/editor/panels/timeline.js
git commit -m "feat: add editor panels (scene tree, property inspector, timeline stub)"
```

---

## Summary

**10 Phases, ~30 Tasks.** Each phase produces a testable increment:

| Phase | Deliverable |
|-------|------------|
| 1 | Textured quad on screen via WebGL |
| 2 | Multi-layer scene with proper alpha blending + z-order |
| 3 | WE wallpaper loads and renders as positioned layers |
| 4 | Shader effects compilable (cloud deform, curtain swing, bloom, etc.) |
| 5 | Animations play (breathing, parallax, pan, time-of-day, clocks) |
| 6 | Dust particles emit and animate |
| 7 | Clock text renders and updates |
| 8 | Bloom + color grading post-process |
| 9 | Scene load/save to disk, editor IPC relay |
| 10 | Editor window with all 4 panels functional |
