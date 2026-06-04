(function () {
    "use strict";

    // ---------------------------------------------------------------------------
    // EditorApp — main editor controller
    // ---------------------------------------------------------------------------

    class EditorApp {
        constructor() {
            /** @type {WebGLWallpaperRenderer|null} */
            this.renderer = null;

            /** @type {Object|null} */
            this.sceneData = null;

            /** @type {Object|null} */
            this.selectedNode = null;
        }

        /**
         * Initialize the editor: create WebGL renderer, register shaders,
         * load current scene or create a default empty scene.
         */
        async init() {
            var self = this;

            // 1. Get preview canvas, create WebGLWallpaperRenderer
            var canvas = document.getElementById("previewCanvas");
            if (!canvas) {
                console.error("EditorApp: previewCanvas not found");
                return;
            }

            try {
                this.renderer = new window.WebGLWallpaperRenderer(canvas);
            } catch (err) {
                console.error("EditorApp: WebGL2 init failed:", err);
                return;
            }

            // 2. Register default shader from inline sources
            var vertEl = document.getElementById("shader-default-vert");
            var fragEl = document.getElementById("shader-default-frag");
            if (!vertEl || !fragEl) {
                console.error("EditorApp: shader source elements not found");
                return;
            }
            this.renderer.registerShader("default", vertEl.textContent, fragEl.textContent);

            // Pre-compile and attach to the GL context for LayerNode.render access
            var gl = this.renderer.gl;
            gl._defaultShader = this.renderer.shaderManager.get("default");

            // 3. Load current scene via ipc.getScene() if available
            var ipc = new window.IpcClient();
            var res = await ipc.getScene();
            if (res.ok && res.data) {
                this.loadScene(res.data);
            } else {
                // 4. Create default empty scene
                this.sceneData = {
                    camera: { x: 1920, y: 1080, width: 3840, height: 2160 },
                    children: [],
                };
                this.renderer.loadScene(this.sceneData);
            }

            // Start the render loop
            this.renderer.start();

            // 5. Refresh all panels
            this.refreshAll();
        }

        /**
         * Load scene data into the renderer and update all panels.
         * @param {Object} data - scene JSON
         */
        loadScene(data) {
            this.sceneData = data;
            if (this.renderer) {
                this.renderer.loadScene(data);
            }
            this.selectedNode = null;
            this.refreshAll();
        }

        /**
         * Select a node in the scene tree and show its properties.
         * @param {Object} node
         */
        selectNode(node) {
            this.selectedNode = node;
            if (window.propertyInspector) {
                window.propertyInspector.show(node);
            }
        }

        /**
         * Create a new empty scene.
         */
        fileNew() {
            var sceneData = {
                camera: { x: 1920, y: 1080, width: 3840, height: 2160 },
                children: [],
            };
            this.loadScene(sceneData);
            console.log("Editor: new scene created");
        }

        /**
         * Load the saved scene from the default save path via IPC.
         */
        async fileOpen() {
            var ipc = new window.IpcClient();
            var res = await ipc.getScene();
            if (res.ok && res.data) {
                this.loadScene(res.data);
                console.log("Editor: scene loaded from saved data");
            } else {
                console.warn("Editor: no scene data available, creating new scene");
                this.fileNew();
            }
        }

        /**
         * Save the current scene via IPC.
         */
        async fileSave() {
            if (!this.sceneData) {
                console.warn("Editor: no scene data to save");
                return;
            }
            var ipc = new window.IpcClient();
            var res = await ipc.saveScene("", this.sceneData);
            if (res.ok) {
                console.log("Editor: scene saved");
            } else {
                console.error("Editor: save failed", res.error);
            }
        }

        /**
         * Import a WE wallpaper by directory name and convert to scene format.
         */
        async importWE() {
            var dirName = prompt("Enter WE wallpaper directory name:", "3163060610");
            if (!dirName) return;

            var ipc = new window.IpcClient();
            var res = await ipc.loadWeWallpaper(dirName);
            if (!res.ok || !res.data) {
                console.error("Editor: failed to load WE wallpaper", res.error);
                return;
            }

            // Convert to scene format using SceneConverter
            if (window.SceneConverter) {
                var sceneData = window.SceneConverter.convert(res.data);
                this.loadScene(sceneData);
                console.log("Editor: WE wallpaper imported and converted to scene");
            } else {
                console.error("Editor: SceneConverter not available");
            }
        }

        /**
         * Apply the current scene to the wallpaper window.
         */
        async applyToWallpaper() {
            if (!this.sceneData) {
                console.warn("Editor: no scene data to apply");
                return;
            }
            var ipc = new window.IpcClient();
            var res = await ipc.applyScene(this.sceneData);
            if (res.ok) {
                console.log("Editor: scene applied to wallpaper");
            } else {
                console.error("Editor: apply failed", res.error);
            }
        }

        /**
         * Refresh all editor panels.
         */
        refreshAll() {
            if (window.sceneTreePanel) {
                window.sceneTreePanel.refresh(this.sceneData, this);
            }
            if (window.propertyInspector) {
                window.propertyInspector.refresh();
            }
            if (window.timelinePanel) {
                window.timelinePanel.refresh();
            }
        }
    }

    // ---------------------------------------------------------------------------
    // Initialize on DOM ready
    // ---------------------------------------------------------------------------

    document.addEventListener("DOMContentLoaded", function () {
        window.editorApp = new EditorApp();
        window.editorApp.init();
    });

    // Export for direct reference
    window.EditorApp = EditorApp;
})();
