(function () {
    "use strict";

    var M = window.WebGLMath;

    // ---------------------------------------------------------------------------
    // TextNode — rasterizes text via Canvas2D and renders as a textured quad
    // ---------------------------------------------------------------------------

    class TextNode extends window.SceneNode {
        /**
         * @param {Object} def
         * @param {string} [def.name]
         * @param {number[]} [def.position] - [x, y]
         * @param {number} [def.zIndex=200]
         * @param {number} [def.alpha=1]
         * @param {string} [def.text=""]
         * @param {string} [def.fontFamily="sans-serif"]
         * @param {number} [def.fontSize=32]
         * @param {string} [def.fontWeight="normal"]
         * @param {number[]} [def.color] - [r, g, b, a] 0-255 for rgb, 0-1 for a
         * @param {string} [def.alignment="left"] - "left" | "center" | "right"
         * @param {Object} [def.outline] - { width: number, color: string } or null
         * @param {Object} [def.shadow] - { offset: [x,y], blur: number, color: string } or null
         * @param {TextureManager} textureManager
         */
        constructor(def, textureManager) {
            def = def || {};

            super(def.name || "");

            /** @type {string} */
            this._text = def.text || "";

            /** @type {string} */
            this._fontFamily = def.fontFamily || "sans-serif";

            /** @type {number} */
            this._fontSize = def.fontSize || 32;

            /** @type {string} */
            this._fontWeight = def.fontWeight || "normal";

            /** @type {number[]} */
            this._color = def.color ? def.color.slice() : [255, 255, 255, 1];

            /** @type {string} */
            this._alignment = def.alignment || "left";

            /** @type {Object|null} */
            this._outline = def.outline || null;

            /** @type {Object|null} */
            this._shadow = def.shadow || null;

            /** @type {TextureManager} */
            this._textureManager = textureManager || null;

            // Apply SceneNode properties from def
            if (def.position && def.position.length >= 2) {
                M.vec2.set(this.position, def.position[0], def.position[1]);
            }
            this.zIndex = def.zIndex !== undefined ? def.zIndex : 200;
            this.alpha = def.alpha !== undefined ? def.alpha : 1;

            // Canvas2D resources — created lazily on first rasterize
            /** @type {HTMLCanvasElement|null} */
            this._canvas = null;

            /** @type {CanvasRenderingContext2D|null} */
            this._ctx = null;

            // GPU texture object
            /** @type {{texture: WebGLTexture, width: number, height: number}|null} */
            this._textureObj = null;

            // Quad mesh — created on first rasterize, resized thereafter
            /** @type {QuadMesh|null} */
            this._mesh = null;

            // Dirty flag — true when text content or style changes, forces re-rasterize
            /** @type {boolean} */
            this._dirty = true;
        }

        // -----------------------------------------------------------------------
        // Getters / setters
        // -----------------------------------------------------------------------

        /** @returns {string} */
        get text() {
            return this._text;
        }

        /** @param {string} v */
        set text(v) {
            if (this._text !== v) {
                this._text = v;
                this._dirty = true;
            }
        }

        // -----------------------------------------------------------------------
        // Internal — rasterization
        // -----------------------------------------------------------------------

        /**
         * Rasterize text to a Canvas2D surface and upload as a GPU texture.
         * Creates the QuadMesh if needed, resizes it otherwise.
         */
        _rasterize() {
            // Create canvas / context on first use
            if (!this._canvas) {
                this._canvas = document.createElement("canvas");
                this._ctx = this._canvas.getContext("2d");
            }

            var canvas = this._canvas;
            var ctx = this._ctx;

            // Build CSS font string
            var fontStr = this._fontWeight + " " + this._fontSize + "px " + this._fontFamily;
            ctx.font = fontStr;

            // Measure text to determine canvas size
            var metrics = ctx.measureText(this._text);
            var textWidth = Math.ceil(metrics.width);
            var textHeight = Math.ceil(this._fontSize * 1.5);

            // Guard against empty-text zero dimensions
            if (textWidth < 1) textWidth = 1;
            if (textHeight < 1) textHeight = 1;

            // Resize canvas to fit the rasterized text
            canvas.width = textWidth;
            canvas.height = textHeight;

            // Resizing a canvas resets its context state — re-apply font
            ctx.font = fontStr;

            // Clear to transparent
            ctx.clearRect(0, 0, textWidth, textHeight);

            // Map alignment string to canvas textAlign / textBaseline
            var alignMap = { left: "left", center: "center", right: "right" };
            ctx.textAlign = alignMap[this._alignment] || "left";
            ctx.textBaseline = "middle";

            // Draw origin point based on alignment
            var drawX;
            if (this._alignment === "center") {
                drawX = textWidth / 2;
            } else if (this._alignment === "right") {
                drawX = textWidth;
            } else {
                drawX = 0;
            }
            var drawY = textHeight / 2;

            // Build fill color string from [r, g, b, a] array
            var c = this._color;
            var fillStyle = "rgba(" +
                Math.round(c[0]) + "," +
                Math.round(c[1]) + "," +
                Math.round(c[2]) + "," +
                ((c[3] !== undefined) ? c[3] : 1) + ")";

            // Apply shadow settings (if any)
            if (this._shadow) {
                var s = this._shadow;
                ctx.shadowOffsetX = (s.offset && s.offset[0] !== undefined) ? s.offset[0] : 0;
                ctx.shadowOffsetY = (s.offset && s.offset[1] !== undefined) ? s.offset[1] : 0;
                ctx.shadowBlur = s.blur || 0;
                ctx.shadowColor = s.color || "rgba(0,0,0,0.5)";
            } else {
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "transparent";
            }

            // Fill the text
            ctx.fillStyle = fillStyle;
            ctx.fillText(this._text, drawX, drawY);

            // Stroke outline on top (if configured) — clear shadow so outline does not get one
            if (this._outline) {
                var o = this._outline;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "transparent";
                ctx.strokeStyle = o.color || "rgba(0,0,0,1)";
                ctx.lineWidth = o.width || 2;
                ctx.strokeText(this._text, drawX, drawY);
            }

            // Clean up previous GPU texture before creating a new one
            if (this._textureObj && this._textureObj.texture && this._textureManager) {
                this._textureManager._gl.deleteTexture(this._textureObj.texture);
            }

            // Upload canvas pixels to a GPU texture
            if (this._textureManager) {
                this._textureObj = this._textureManager.fromCanvas(canvas);
            } else {
                this._textureObj = null;
            }

            // Compute QuadMesh size: canvas dimensions divided by fontSize
            // The shader multiplies by uScale = [fontSize, fontSize], so
            // the final screen size = meshSize * fontSize = canvas pixel size.
            var meshW = textWidth / this._fontSize;
            var meshH = textHeight / this._fontSize;

            // Anchor X follows text alignment
            var anchorX;
            if (this._alignment === "center") {
                anchorX = 0.5;
            } else if (this._alignment === "right") {
                anchorX = 1.0;
            } else {
                anchorX = 0;
            }
            var anchorY = 0.5; // vertically centered

            // Create or resize the quad mesh
            if (this._textureManager) {
                if (this._mesh) {
                    this._mesh.resize(meshW, meshH, anchorX, anchorY);
                } else {
                    this._mesh = new window.QuadMesh(
                        this._textureManager._gl,
                        meshW,
                        meshH,
                        anchorX,
                        anchorY
                    );
                }
            }

            this._dirty = false;
        }

        // -----------------------------------------------------------------------
        // Render
        // -----------------------------------------------------------------------

        /**
         * Render the rasterized text quad using the compiled default shader.
         * @param {WebGL2RenderingContext} gl
         * @param {Camera} camera
         */
        render(gl, camera) {
            if (!this.visible) return;

            // Nothing to render for empty text
            if (!this._text || this._text.length === 0) return;

            // Re-rasterize if text/style changed or first render
            if (this._dirty || !this._textureObj || !this._mesh) {
                this._rasterize();
            }

            if (!this._mesh || !this._textureObj) return;

            // Use the default textured-quad shader (set on gl by the renderer init)
            var program = gl._defaultShader;
            if (!program) return;

            gl.useProgram(program);

            // --- Vertex shader uniforms ---
            var uViewProjLoc  = gl.getUniformLocation(program, "uViewProj");
            var uPositionLoc  = gl.getUniformLocation(program, "uPosition");
            var uScaleLoc     = gl.getUniformLocation(program, "uScale");
            var uRotationLoc  = gl.getUniformLocation(program, "uRotation");

            // Compute world position from the scene-graph world matrix
            var worldMatrix = this.getWorldMatrix();
            var worldX = worldMatrix[6];
            var worldY = worldMatrix[7];

            gl.uniformMatrix3fv(uViewProjLoc, false, camera.getViewProjMatrix());
            gl.uniform2f(uPositionLoc, worldX, worldY);
            // Scale by fontSize so the quad renders at actual canvas pixel size on screen
            gl.uniform2f(uScaleLoc, this._fontSize, this._fontSize);
            gl.uniform1f(uRotationLoc, this.rotation);

            // --- Fragment shader uniforms ---
            var uMainTexLoc     = gl.getUniformLocation(program, "uMainTex");
            var uColorFilterLoc = gl.getUniformLocation(program, "uColorFilter");
            var uAlphaLoc       = gl.getUniformLocation(program, "uAlpha");

            // Bind text texture to slot 0
            gl.uniform1i(uMainTexLoc, 0);
            this._textureManager.bind(0, this._textureObj);

            // Color is already baked into the rasterized texture — use identity filter
            gl.uniform4f(uColorFilterLoc, 1, 1, 1, 1);
            gl.uniform1f(uAlphaLoc, this.alpha);

            this._mesh.draw();
        }

        // -----------------------------------------------------------------------
        // Cleanup
        // -----------------------------------------------------------------------

        /**
         * Destroy GPU resources and inherited scene-graph state.
         */
        destroy() {
            if (this._mesh) {
                this._mesh.destroy();
                this._mesh = null;
            }
            if (this._textureObj && this._textureObj.texture && this._textureManager) {
                this._textureManager._gl.deleteTexture(this._textureObj.texture);
            }
            this._textureObj = null;
            this._canvas = null;
            this._ctx = null;
            super.destroy();
        }
    }

    // ---------------------------------------------------------------------------
    // Export
    // ---------------------------------------------------------------------------

    window.TextNode = TextNode;
})();
