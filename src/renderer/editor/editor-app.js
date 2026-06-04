(function () {
    "use strict";

    class EditorApp {
        constructor() {
            this.renderer = null;
            this.sceneData = null;
            this.selectedNode = null;
            this._webglOk = false;
        }

        async init() {
            var self = this;

            // Try WebGL preview
            var canvas = document.getElementById("previewCanvas");
            if (canvas) {
                try {
                    this.renderer = new window.WebGLWallpaperRenderer(canvas);
                    var vertEl = document.getElementById("shader-default-vert");
                    var fragEl = document.getElementById("shader-default-frag");
                    if (vertEl && fragEl) {
                        this.renderer.registerShader("default", vertEl.textContent, fragEl.textContent);
                        var gl = this.renderer.gl;
                        gl._defaultShader = this.renderer.shaderManager.get("default");
                        this._webglOk = true;
                    }
                } catch (err) {
                    console.warn("WebGL preview unavailable:", err.message);
                    this._showViewportStatus("WebGL preview unavailable — using data view only");
                }
            }

            // Load current WE wallpaper data as starting scene
            var ipc = new window.IpcClient();
            try {
                var state = await ipc.getAppState();
                if (state.ok && state.data && state.data.wallpaperSettings && state.data.wallpaperSettings.weWallpaperDir) {
                    var weRes = await ipc.loadWeWallpaper(state.data.wallpaperSettings.weWallpaperDir);
                    if (weRes.ok && weRes.data) {
                        // Convert to scene format
                        if (window.SceneConverter) {
                            this.sceneData = window.SceneConverter.convert(weRes.data);
                        } else {
                            this.sceneData = this._layersToScene(weRes.data.layers || []);
                        }
                        this._status("Loaded: " + (weRes.data.title || weRes.data.dirName));
                    }
                }
            } catch (e) {
                console.warn("Could not load current wallpaper:", e);
            }

            // Fallback: empty scene
            if (!this.sceneData) {
                this.sceneData = { camera: { x: 1920, y: 1080, width: 3840, height: 2160 }, children: [] };
            }

            // Start render loop
            if (this._webglOk && this.renderer) {
                try {
                    await this.renderer.loadScene(this.sceneData);
                    this.renderer.start();
                } catch (e) {
                    console.warn("Render start failed:", e);
                }
            }

            this.refreshAll();
        }

        // Convert raw WE layers to scene graph format
        _layersToScene(layers) {
            var children = [];
            layers.forEach(function (lyr, i) {
                children.push({
                    type: "Layer",
                    name: lyr.name || ("layer_" + i),
                    position: [lyr.x, 2160 - lyr.y],
                    alpha: lyr.alpha !== undefined ? lyr.alpha : 1,
                    zIndex: i + 1,
                    texture: lyr.url,
                    width: lyr.width,
                    height: lyr.height,
                    anchor: [0.5, 0.5],
                });
            });
            return { camera: { x: 1920, y: 1080, width: 3840, height: 2160 }, children: children };
        }

        loadScene(data) {
            this.sceneData = data;
            this.selectedNode = null;
            if (this._webglOk && this.renderer) {
                this.renderer.loadScene(data).catch(function (e) {
                    console.warn("Scene render failed:", e);
                });
            }
            this.refreshAll();
        }

        selectNode(node) {
            this.selectedNode = node;
            if (window.propertyInspector) {
                window.propertyInspector.show(node);
            }
        }

        fileNew() {
            this.loadScene({ camera: { x: 1920, y: 1080, width: 3840, height: 2160 }, children: [] });
            this._status("New scene created");
        }

        async fileOpen() {
            // Reload current WE wallpaper
            var ipc = new window.IpcClient();
            var state = await ipc.getAppState();
            if (state.ok && state.data && state.data.wallpaperSettings && state.data.wallpaperSettings.weWallpaperDir) {
                var weRes = await ipc.loadWeWallpaper(state.data.wallpaperSettings.weWallpaperDir);
                if (weRes.ok && weRes.data) {
                    if (window.SceneConverter) {
                        this.loadScene(window.SceneConverter.convert(weRes.data));
                    } else {
                        this.loadScene(this._layersToScene(weRes.data.layers || []));
                    }
                    this._status("Loaded: " + (weRes.data.title || weRes.data.dirName));
                    return;
                }
            }
            this._status("No wallpaper data found");
        }

        async fileSave() {
            if (!this.sceneData) { this._status("Nothing to save"); return; }
            var ipc = new window.IpcClient();
            var res = await ipc.saveScene("", this.sceneData);
            this._status(res.ok ? "Saved" : "Save failed: " + (res.error ? res.error.message : "unknown"));
        }

        async importWE() {
            var dirName = prompt("Enter WE wallpaper directory name:", "3163060610");
            if (!dirName) return;

            var ipc = new window.IpcClient();
            var res = await ipc.loadWeWallpaper(dirName);
            if (!res.ok || !res.data) {
                this._status("Failed to load: " + (res.error ? res.error.message : "unknown"));
                return;
            }

            var sceneData;
            if (window.SceneConverter) {
                sceneData = window.SceneConverter.convert(res.data);
            } else {
                sceneData = this._layersToScene(res.data.layers || []);
            }
            this.loadScene(sceneData);
            this._status("Imported: " + (res.data.title || dirName) + " (" + (res.data.layers ? res.data.layers.length : 0) + " layers)");
        }

        async applyToWallpaper() {
            if (!this.sceneData) { this._status("Nothing to apply"); return; }
            var ipc = new window.IpcClient();
            var res = await ipc.applyScene(this.sceneData);
            this._status(res.ok ? "Applied to wallpaper" : "Apply failed: " + (res.error ? res.error.message : "unknown"));
        }

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

        _showViewportStatus(msg) {
            var canvas = document.getElementById("previewCanvas");
            if (canvas && canvas.parentElement) {
                var div = document.createElement("div");
                div.style.cssText = "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#666;font-size:14px;pointer-events:none;";
                div.textContent = msg;
                canvas.parentElement.appendChild(div);
            }
        }

        _status(msg) {
            console.log("[Editor]", msg);
            // Flash status in the menu bar
            var statusEl = document.getElementById("statusMsg");
            if (statusEl) {
                statusEl.textContent = msg;
                clearTimeout(this._statusTimer);
                this._statusTimer = setTimeout(function () { statusEl.textContent = ""; }, 3000);
            }
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        window.editorApp = new EditorApp();
        window.editorApp.init();
    });

    window.EditorApp = EditorApp;
})();
