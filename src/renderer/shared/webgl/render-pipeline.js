(function () {
    "use strict";

    // ---------------------------------------------------------------------------
    // RenderPass — describes a single render pass with sorting, filtering, blending
    // ---------------------------------------------------------------------------

    class RenderPass {
        /**
         * @param {Object} [opts]
         * @param {string} [opts.name]
         * @param {boolean} [opts.enabled=true]
         * @param {function(SceneNode):boolean} [opts.filter]
         * @param {string} [opts.sortMode="none"] - "none" | "back-to-front" | "front-to-back"
         * @param {{src: number, dst: number}} [opts.blend] - WebGL blend func constants
         */
        constructor(opts) {
            opts = opts || {};

            /** @type {string} */
            this.name = opts.name || "";

            /** @type {boolean} */
            this.enabled = opts.enabled !== undefined ? opts.enabled : true;

            /** @type {function(SceneNode):boolean} */
            this.filter = opts.filter || function () { return true; };

            /** @type {string} */
            this.sortMode = opts.sortMode || "none";

            /** @type {{src: number, dst: number}|null} */
            this.blend = opts.blend || null;
        }

        /**
         * Sort nodes array in-place according to sortMode.
         * @param {SceneNode[]} nodes
         * @param {Camera} [camera]
         */
        sort(nodes, camera) {
            if (this.sortMode === "none" || nodes.length <= 1) {
                return;
            }

            if (this.sortMode === "back-to-front") {
                // Sort by _sortDepth descending (furthest first, closest last)
                nodes.sort(function (a, b) {
                    return b._sortDepth - a._sortDepth;
                });
            } else if (this.sortMode === "front-to-back") {
                // Sort by _sortDepth ascending (closest first, furthest last)
                nodes.sort(function (a, b) {
                    return a._sortDepth - b._sortDepth;
                });
            }
        }
    }

    // ---------------------------------------------------------------------------
    // RenderPipeline — configurable multi-pass render pipeline
    // ---------------------------------------------------------------------------

    class RenderPipeline {
        /**
         * @param {WebGL2RenderingContext} gl
         * @param {FramebufferPool} fboPool
         */
        constructor(gl, fboPool) {
            /** @type {WebGL2RenderingContext} */
            this._gl = gl;

            /** @type {FramebufferPool} */
            this._fboPool = fboPool;

            /** @type {RenderPass[]} */
            this._passes = [];
        }

        /**
         * Add a pass to the pipeline. Passes are executed in insertion order.
         * @param {RenderPass} pass
         */
        addPass(pass) {
            this._passes.push(pass);
        }

        /**
         * Execute the full pipeline: collect nodes, run each pass in order.
         * @param {SceneNode} rootNode
         * @param {Camera} camera
         * @param {number} screenWidth
         * @param {number} screenHeight
         */
        execute(rootNode, camera, screenWidth, screenHeight) {
            var gl = this._gl;
            if (!gl) return;

            // 1. Collect all renderable leaf nodes from the scene tree
            var renderables = [];
            rootNode.collectRenderables(renderables);

            // 2. Release all active FBOs back to the idle pool
            this._fboPool.releaseAll();

            // 3. Execute each pass in order
            for (var i = 0; i < this._passes.length; i++) {
                var pass = this._passes[i];
                if (!pass.enabled) continue;

                // Filter nodes through the pass filter
                var candidates = [];
                for (var j = 0; j < renderables.length; j++) {
                    if (pass.filter(renderables[j])) {
                        candidates.push(renderables[j]);
                    }
                }

                // Compute _sortDepth for each candidate (default: position[0])
                for (var k = 0; k < candidates.length; k++) {
                    candidates[k]._sortDepth = candidates[k].position[0];
                }

                // Sort according to pass sort mode
                pass.sort(candidates, camera);

                // Apply pass-specific blend mode, or default alpha blending
                if (pass.blend) {
                    gl.blendFunc(pass.blend.src, pass.blend.dst);
                } else {
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                }

                // Render each candidate directly to screen
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                for (var m = 0; m < candidates.length; m++) {
                    candidates[m].render(gl, camera);
                }
            }

            // Restore default alpha blending after all passes
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }
    }

    // ---------------------------------------------------------------------------
    // Exports
    // ---------------------------------------------------------------------------

    window.RenderPass = RenderPass;
    window.RenderPipeline = RenderPipeline;
})();
