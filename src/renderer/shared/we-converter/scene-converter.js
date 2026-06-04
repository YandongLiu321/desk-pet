(function () {
    "use strict";

    // ---------------------------------------------------------------------------
    // SceneConverter — converts WallpaperEngineLoader output to SceneGraph format
    //
    // Input  (from WallpaperEngineLoader.load()):
    //   { dirName, title, layers: [{url, width, height, name, x, y, alpha}, ...] }
    //
    // Output (SceneGraph-compatible):
    //   { camera: {x, y, width, height}, children: [{type:"Layer", ...}] }
    // ---------------------------------------------------------------------------

    const SCENE_WIDTH = 3840;
    const SCENE_HEIGHT = 2160;
    const SCENE_CENTER_X = 1920;
    const SCENE_CENTER_Y = 1080;

    class SceneConverter {
        /**
         * Convert WE wallpaper data to a SceneGraph-compatible object.
         *
         * Layer sorting rules:
         *   1. Separate into "named" (has a name) and "unnamed" (no name / background).
         *   2. Unnamed layers render first (lowest z), sorted by pixel area descending.
         *   3. Named layers render next, sorted by Y coordinate ascending
         *      (bottom-to-top for correct render order).
         *      Exception: very wide layers (width > 3000) with low Y (< 800)
         *      are pushed before regular foreground layers — they act as sky /
         *      distant background strips.
         *
         * @param {Object} weData — output from WallpaperEngineLoader.load()
         * @param {string} weData.dirName
         * @param {string} weData.title
         * @param {Array<{url:string, width:number, height:number, name:string, x:number, y:number, alpha:number}>} weData.layers
         * @returns {{ camera: Object, children: Array<Object> }}
         */
        static convert(weData) {
            const layers = weData.layers || [];

            if (layers.length === 0) {
                return {
                    camera: SceneConverter._defaultCamera(),
                    children: [],
                };
            }

            // ---- Separate layers by type ----
            const unnamed = [];   // background layers — no name
            const named = [];     // positioned layers — have names

            for (let i = 0; i < layers.length; i++) {
                const layer = layers[i];
                if (layer.name) {
                    named.push(layer);
                } else {
                    unnamed.push(layer);
                }
            }

            // ---- Sort unnamed (background) by pixel area descending ----
            unnamed.sort(function (a, b) {
                return (b.width * b.height) - (a.width * a.height);
            });

            // ---- Sort named layers ----
            // Separate very-wide low-Y layers (distant sky strips) from normal foreground
            const wideLow = [];
            const normal = [];

            for (let i = 0; i < named.length; i++) {
                const layer = named[i];
                if (layer.width > 3000 && layer.y < 800) {
                    wideLow.push(layer);
                } else {
                    normal.push(layer);
                }
            }

            // Sort each group by Y ascending
            wideLow.sort(function (a, b) { return a.y - b.y; });
            normal.sort(function (a, b) { return a.y - b.y; });

            // Merge: wide-low Y layers first, then normal foreground layers
            const allSorted = unnamed.concat(wideLow, normal);

            // ---- Build children array ----
            const children = [];

            for (let i = 0; i < allSorted.length; i++) {
                const layer = allSorted[i];
                const isUnnamed = !layer.name;

                // For unnamed backgrounds, center them in the scene.
                // For named layers, use their absolute coordinates.
                const posX = isUnnamed ? SCENE_CENTER_X : (layer.x != null ? layer.x : 0);
                const posY = isUnnamed ? SCENE_CENTER_Y : (layer.y != null ? layer.y : 0);

                children.push({
                    type: "Layer",
                    name: layer.name || ("bg_" + i),
                    position: [posX, posY],
                    alpha: layer.alpha != null ? layer.alpha : 1,
                    zIndex: i + 1,
                    texture: layer.url,
                    width: layer.width || SCENE_WIDTH,
                    height: layer.height || SCENE_HEIGHT,
                    anchor: [0.5, 0.5],
                    scale: [1, 1],
                });
            }

            return {
                camera: SceneConverter._defaultCamera(),
                children: children,
            };
        }

        /**
         * Default orthographic camera covering a 4K (3840x2160) scene,
         * centered at (1920, 1080).
         * @returns {{ x: number, y: number, width: number, height: number }}
         */
        static _defaultCamera() {
            return {
                x: SCENE_CENTER_X,
                y: SCENE_CENTER_Y,
                width: SCENE_WIDTH,
                height: SCENE_HEIGHT,
            };
        }
    }

    // ---------------------------------------------------------------------------
    // Export
    // ---------------------------------------------------------------------------

    window.SceneConverter = SceneConverter;
})();
