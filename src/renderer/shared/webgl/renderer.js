(function () {
    "use strict";

    // ---------------------------------------------------------------------------
    // WebGLWallpaperRenderer — manages the WebGL rendering loop for wallpaper mode
    // ---------------------------------------------------------------------------

    class WebGLWallpaperRenderer {
        /**
         * @param {HTMLCanvasElement} canvas
         */
        constructor(canvas) {
            /** @type {HTMLCanvasElement} */
            this.canvas = canvas;

            // Create WebGL2 context
            /** @type {WebGL2RenderingContext} */
            var gl = canvas.getContext("webgl2", {
                alpha: true,
                premultipliedAlpha: true,
                antialias: false,
            });

            if (!gl) {
                throw new Error("WebGLWallpaperRenderer: WebGL2 not available");
            }

            this.gl = gl;

            /** @type {ShaderManager} */
            this.shaderManager = new window.ShaderManager(gl);

            /** @type {TextureManager} */
            this.textureManager = new window.TextureManager(gl);

            /** @type {FramebufferPool} */
            this.fboPool = new window.FramebufferPool(gl);

            // Render pipeline with a default pass
            /** @type {RenderPipeline} */
            this._pipeline = new window.RenderPipeline(gl, this.fboPool);
            this._pipeline.addPass(new window.RenderPass({
                name: "default",
                filter: function () { return true; },
                sortMode: "back-to-front",
            }));

            /** @type {Camera} */
            this.camera = new window.Camera();
            this.camera.lookAt(1920, 1080, 3840, 2160);

            // Scene graph root
            /** @type {SceneGroup} */
            this._rootNode = new window.SceneGroup("root");

            // Flat list of scene-layer definitions for easy iteration
            /** @type {Object[]} */
            this._sceneDefs = [];

            // Blend mode: standard alpha blending
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            // rAF state
            /** @type {number|null} */
            this._rafId = null;

            /** @type {number} */
            this._lastTime = 0;

            /** @type {boolean} */
            this._running = false;
        }

        // -----------------------------------------------------------------------
        // Public API
        // -----------------------------------------------------------------------

        /**
         * Register a shader with the shader manager by name + source.
         * @param {string} name
         * @param {string} vertSrc
         * @param {string} fragSrc
         */
        registerShader(name, vertSrc, fragSrc) {
            this.shaderManager.register(name, vertSrc, fragSrc);
        }

        /**
         * Build the scene graph from a scene-data object.
         * Clears any previously loaded scene.
         *
         * @param {Object} sceneData
         * @param {{x: number, y: number, width: number, height: number}} [sceneData.camera]
         * @param {Object[]} sceneData.children - array of child defs {type, name, ...}
         * @returns {Promise<void>} resolves when all layers have loaded their textures
         */
        async loadScene(sceneData) {
            var self = this;

            // Clear existing scene
            var oldChildren = this._rootNode.children.slice();
            for (var i = 0; i < oldChildren.length; i++) {
                oldChildren[i].destroy();
            }
            this._rootNode.children = [];
            this._sceneDefs = [];

            if (!sceneData) return;

            // Apply camera settings
            if (sceneData.camera) {
                this.camera.lookAt(
                    sceneData.camera.x || 1920,
                    sceneData.camera.y || 1080,
                    sceneData.camera.width || 3840,
                    sceneData.camera.height || 2160
                );
            }

            // Collect async texture-load promises for layers
            var loadPromises = [];

            /**
             * Recursively parse child definitions.
             * @param {Object[]} children
             * @param {SceneNode} parent
             */
            function parseChildren(children, parent) {
                if (!children || !children.length) return;

                for (var i = 0; i < children.length; i++) {
                    var def = children[i];
                    var type = def.type;

                    if (type === "Camera") {
                        // Update camera — only the top-level camera is expected, but handle nested too
                        if (def.x !== undefined || def.width !== undefined) {
                            self.camera.lookAt(
                                def.x !== undefined ? def.x : self.camera._cx,
                                def.y !== undefined ? def.y : self.camera._cy,
                                def.width !== undefined ? def.width : self.camera._w,
                                def.height !== undefined ? def.height : self.camera._h
                            );
                        }
                    } else if (type === "Group") {
                        var group = new window.SceneGroup(def.name || "group");
                        parent.addChild(group);
                        parseChildren(def.children, group);
                    } else if (type === "Layer") {
                        var layer = new window.LayerNode(def, self.textureManager);
                        parent.addChild(layer);
                        loadPromises.push(layer.load(self.gl));
                    }
                    // Other types are skipped (to be added in later phases)
                }
            }

            parseChildren(sceneData.children || [], this._rootNode);
            this._sceneDefs = sceneData.children || [];

            // Wait for all layer textures to load
            if (loadPromises.length > 0) {
                await Promise.all(loadPromises);
            }
        }

        /**
         * Start the requestAnimationFrame render loop.
         */
        start() {
            if (this._running) return;
            this._running = true;
            this._lastTime = performance.now();
            this._tick();
        }

        /**
         * Stop the render loop.
         */
        stop() {
            this._running = false;
            if (this._rafId !== null) {
                cancelAnimationFrame(this._rafId);
                this._rafId = null;
            }
        }

        /**
         * Match the canvas pixel size to its CSS display size.
         * Should be called on window resize and each frame.
         */
        resize() {
            var canvas = this.canvas;
            var displayWidth = canvas.clientWidth;
            var displayHeight = canvas.clientHeight;

            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
            }
        }

        /**
         * Destroy the renderer: stop loop, destroy scene graph, managers.
         */
        destroy() {
            this.stop();

            // Destroy all scene nodes
            for (var i = 0; i < this._rootNode.children.length; i++) {
                this._rootNode.children[i].destroy();
            }
            this._rootNode.children = [];

            // Destroy managers
            if (this.textureManager) {
                this.textureManager.destroy();
                this.textureManager = null;
            }
            if (this.shaderManager) {
                this.shaderManager.destroy();
                this.shaderManager = null;
            }
            if (this.fboPool) {
                this.fboPool.destroy();
                this.fboPool = null;
            }

            this.gl = null;
            this.canvas = null;
        }

        // -----------------------------------------------------------------------
        // Internal helpers
        // -----------------------------------------------------------------------

        /**
         * rAF callback. Calculates dt, handles resize, update, and render.
         * @private
         */
        _tick() {
            if (!this._running) return;

            var self = this;
            this._rafId = requestAnimationFrame(function () {
                self._frame();
            });
        }

        /**
         * Single frame: calculate dt, resize, update, render.
         * @private
         */
        _frame() {
            if (!this._running) return;

            // Calculate delta time, cap at 100ms to avoid spiral-of-death
            var now = performance.now();
            var dt = Math.min((now - this._lastTime) / 1000, 0.1);
            this._lastTime = now;

            this.resize();
            this._update(dt);
            this._render();

            // Schedule next frame
            var self = this;
            this._rafId = requestAnimationFrame(function () {
                self._frame();
            });
        }

        /**
         * Placeholder for per-frame animation updates.
         * @param {number} dt - delta time in seconds
         * @private
         */
        _update(dt) {
            // Empty for now — will be populated in later phases
        }

        /**
         * Render the scene: update camera, clear, and run the pipeline.
         * @private
         */
        _render() {
            var gl = this.gl;
            if (!gl) return;

            var w = this.canvas.width;
            var h = this.canvas.height;

            // Update camera with current screen dimensions
            this.camera.update(w, h);

            // Clear to transparent
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, w, h);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Run the render pipeline
            this._pipeline.execute(this._rootNode, this.camera, w, h);
        }

        /**
         * Recursively collect all visible, renderable nodes.
         * Skips SceneGroup because its children are flattened here.
         *
         * @param {SceneNode} node
         * @returns {SceneNode[]}
         * @private
         */
        _collectVisibleNodes(node) {
            var result = [];

            if (!node.visible) return result;

            var isGroup = node instanceof window.SceneGroup;

            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                if (!child.visible) continue;

                if (child instanceof window.SceneGroup) {
                    // Flatten groups: recurse into group children
                    var subNodes = this._collectVisibleNodes(child);
                    for (var j = 0; j < subNodes.length; j++) {
                        result.push(subNodes[j]);
                    }
                } else {
                    result.push(child);
                }
            }

            return result;
        }
    }

    // ---------------------------------------------------------------------------
    // Export
    // ---------------------------------------------------------------------------

    window.WebGLWallpaperRenderer = WebGLWallpaperRenderer;
})();
