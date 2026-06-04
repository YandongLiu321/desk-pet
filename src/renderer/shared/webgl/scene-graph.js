(function () {
    "use strict";

    var M = window.WebGLMath;

    // ---------------------------------------------------------------------------
    // SceneNode — base node for the scene graph
    // ---------------------------------------------------------------------------

    class SceneNode {
        /**
         * @param {string} name
         */
        constructor(name) {
            /** @type {string} */
            this.name = name || "";

            /** @type {boolean} */
            this.visible = true;

            /** @type {Float32Array} */
            this.position = M.vec2.create(0, 0);

            /** @type {Float32Array} */
            this.scale = M.vec2.create(1, 1);

            /** @type {number} */
            this.rotation = 0;

            /** @type {number} */
            this.alpha = 1;

            /** @type {Float32Array} */
            this.colorFilter = M.vec4.create(1, 1, 1, 1);

            /** @type {number} */
            this.zIndex = 0;

            /** @type {SceneNode|null} */
            this.parent = null;

            /** @type {SceneNode[]} */
            this.children = [];

            /** @type {Float32Array} — cached world matrix */
            this._worldMatrix = M.mat3.create();

            /** @type {boolean} */
            this._dirty = true;

            // Reusable temps for matrix construction
            /** @private @type {Float32Array} */
            this._tempT = M.mat3.create();
            /** @private @type {Float32Array} */
            this._tempR = M.mat3.create();
            /** @private @type {Float32Array} */
            this._tempS = M.mat3.create();
            /** @private @type {Float32Array} */
            this._tempA = M.mat3.create();
        }

        /**
         * Add a child node.
         * @param {SceneNode} child
         */
        addChild(child) {
            child.parent = this;
            this.children.push(child);
            child.markDirty();
        }

        /**
         * Remove a child node.
         * @param {SceneNode} child
         */
        removeChild(child) {
            var idx = this.children.indexOf(child);
            if (idx >= 0) {
                this.children.splice(idx, 1);
            }
            child.parent = null;
        }

        /**
         * Mark this node and all descendants as needing matrix rebuild.
         */
        markDirty() {
            this._dirty = true;
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].markDirty();
            }
        }

        /**
         * Get the cached or rebuilt world matrix.
         * Build order: T * S * R (conceptual: rotate first, then scale, then translate)
         * This matches the shader's transformation order.
         * If a parent exists, the result is parentWorld * localWorld.
         *
         * @returns {Float32Array}
         */
        getWorldMatrix() {
            if (!this._dirty) {
                return this._worldMatrix;
            }

            // Build local transform: T * S * R
            M.mat3.fromTranslation(this._tempT, this.position[0], this.position[1]);
            M.mat3.fromRotation(this._tempR, this.rotation);
            M.mat3.fromScale(this._tempS, this.scale[0], this.scale[1]);

            // _tempA = S * R
            M.mat3.mul(this._tempA, this._tempS, this._tempR);
            // _worldMatrix = T * (S * R) = T * S * R
            M.mat3.mul(this._worldMatrix, this._tempT, this._tempA);

            // Compose with parent world matrix if we have a parent
            if (this.parent) {
                var parentWorld = this.parent.getWorldMatrix();
                M.mat3.mul(this._worldMatrix, parentWorld, this._worldMatrix);
            }

            this._dirty = false;
            return this._worldMatrix;
        }

        /**
         * Virtual render method. Override in subclasses.
         * @param {WebGL2RenderingContext} gl
         * @param {import("./camera.js").default} camera
         */
        render(gl, camera) {
            // Base implementation — no-op
        }

        /**
         * Recursively destroy this node and all children.
         * Sets children, parent, and cached matrices to null to help GC.
         */
        destroy() {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].destroy();
            }
            this.children = [];
            this.parent = null;

            // Null out references to help GC
            this._worldMatrix = null;
            this._tempT = null;
            this._tempR = null;
            this._tempS = null;
            this._tempA = null;
            this.position = null;
            this.scale = null;
            this.colorFilter = null;
        }
    }

    // ---------------------------------------------------------------------------
    // SceneGroup — renders its children
    // ---------------------------------------------------------------------------

    class SceneGroup extends SceneNode {
        /**
         * @param {string} name
         */
        constructor(name) {
            super(name);
        }

        /**
         * Render all visible children.
         * @param {WebGL2RenderingContext} gl
         * @param {import("./camera.js").default} camera
         */
        render(gl, camera) {
            if (!this.visible) return;

            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                if (child.visible) {
                    child.render(gl, camera);
                }
            }
        }
    }

    // ---------------------------------------------------------------------------
    // LayerNode — renders a textured quad
    // ---------------------------------------------------------------------------

    class LayerNode extends SceneNode {
        /**
         * @param {Object} def - layer definition
         * @param {string} def.name
         * @param {number[]} [def.position] - [x, y]
         * @param {number[]} [def.scale] - [sx, sy], defaults to [1, 1]
         * @param {number} [def.rotation] - radians, defaults to 0
         * @param {number} [def.alpha] - 0..1, defaults to 1
         * @param {number} [def.zIndex]
         * @param {number[]} [def.colorFilter] - [r, g, b, a], defaults to [1,1,1,1]
         * @param {string} def.texture - URL of the texture image
         * @param {number} [def.width] - quad width in scene units
         * @param {number} [def.height] - quad height in scene units
         * @param {number[]} [def.anchor] - [ax, ay] 0..1, defaults to [0.5, 0.5]
         * @param {TextureManager} textureManager
         */
        constructor(def, textureManager) {
            super(def.name);

            /** @type {string} */
            this._textureUrl = def.texture || "";

            /** @type {TextureManager} */
            this._textureManager = textureManager;

            /** @type {{texture: WebGLTexture, width: number, height: number}|null} */
            this._textureObj = null;

            /** @type {QuadMesh|null} */
            this._mesh = null;

            /** @type {boolean} */
            this._loaded = false;

            /** @type {number} */
            this._defWidth = def.width;

            /** @type {number} */
            this._defHeight = def.height;

            /** @type {number} */
            this._anchorX = (def.anchor && def.anchor[0] !== undefined) ? def.anchor[0] : 0.5;

            /** @type {number} */
            this._anchorY = (def.anchor && def.anchor[1] !== undefined) ? def.anchor[1] : 0.5;

            // Apply layer properties from def if provided
            if (def.position && def.position.length >= 2) {
                M.vec2.set(this.position, def.position[0], def.position[1]);
            }
            if (def.scale && def.scale.length >= 2) {
                M.vec2.set(this.scale, def.scale[0], def.scale[1]);
            }
            if (def.rotation !== undefined) {
                this.rotation = def.rotation;
            }
            if (def.alpha !== undefined) {
                this.alpha = def.alpha;
            }
            if (def.zIndex !== undefined) {
                this.zIndex = def.zIndex;
            }
            if (def.colorFilter) {
                M.vec4.set(
                    this.colorFilter,
                    def.colorFilter[0] !== undefined ? def.colorFilter[0] : 1,
                    def.colorFilter[1] !== undefined ? def.colorFilter[1] : 1,
                    def.colorFilter[2] !== undefined ? def.colorFilter[2] : 1,
                    def.colorFilter[3] !== undefined ? def.colorFilter[3] : 1
                );
            }
        }

        /**
         * Load the texture from the URL and create a QuadMesh.
         * Must be called before render. Returns a promise that resolves when ready.
         *
         * @param {WebGL2RenderingContext} gl
         * @returns {Promise<void>}
         */
        async load(gl) {
            if (this._loaded) return;
            if (!this._textureUrl || !this._textureManager) return;

            try {
                this._textureObj = await this._textureManager.load(this._textureUrl);
            } catch (err) {
                console.error("LayerNode: failed to load texture '" + this._textureUrl + "':", err);
                return;
            }

            var meshWidth = this._defWidth !== undefined ? this._defWidth : this._textureObj.width;
            var meshHeight = this._defHeight !== undefined ? this._defHeight : this._textureObj.height;

            this._mesh = new window.QuadMesh(gl, meshWidth, meshHeight, this._anchorX, this._anchorY);
            this._loaded = true;
        }

        /**
         * Render the textured quad using the default shader.
         * @param {WebGL2RenderingContext} gl
         * @param {import("./camera.js").default} camera
         */
        render(gl, camera) {
            if (!this.visible || !this._loaded || !this._mesh) return;

            // Get the compiled default shader program (stored on the GL context)
            var program = gl._defaultShader;
            if (!program) return;

            gl.useProgram(program);

            // --- Vertex shader uniforms ---
            var uViewProjLoc = gl.getUniformLocation(program, "uViewProj");
            var uPositionLoc = gl.getUniformLocation(program, "uPosition");
            var uScaleLoc = gl.getUniformLocation(program, "uScale");
            var uRotationLoc = gl.getUniformLocation(program, "uRotation");

            // Compute world position from the scene-graph world matrix
            var worldMatrix = this.getWorldMatrix();
            var worldX = worldMatrix[6];
            var worldY = worldMatrix[7];

            gl.uniformMatrix3fv(uViewProjLoc, false, camera.getViewProjMatrix());
            gl.uniform2f(uPositionLoc, worldX, worldY);
            gl.uniform2f(uScaleLoc, this.scale[0], this.scale[1]);
            gl.uniform1f(uRotationLoc, this.rotation);

            // --- Fragment shader uniforms ---
            var uMainTexLoc = gl.getUniformLocation(program, "uMainTex");
            var uColorFilterLoc = gl.getUniformLocation(program, "uColorFilter");
            var uAlphaLoc = gl.getUniformLocation(program, "uAlpha");

            gl.uniform1i(uMainTexLoc, 0);
            this._textureManager.bind(0, this._textureObj);
            gl.uniform4f(
                uColorFilterLoc,
                this.colorFilter[0],
                this.colorFilter[1],
                this.colorFilter[2],
                this.colorFilter[3]
            );
            gl.uniform1f(uAlphaLoc, this.alpha);

            this._mesh.draw();
        }

        /**
         * Destroy the mesh and inherited scene-graph resources.
         */
        destroy() {
            if (this._mesh) {
                this._mesh.destroy();
                this._mesh = null;
            }
            this._textureObj = null;
            this._loaded = false;
            super.destroy();
        }
    }

    // ---------------------------------------------------------------------------
    // Exports
    // ---------------------------------------------------------------------------

    window.SceneNode = SceneNode;
    window.SceneGroup = SceneGroup;
    window.LayerNode = LayerNode;
})();
