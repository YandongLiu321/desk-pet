(function () {
    "use strict";

    // ---------------------------------------------------------------------------
    // SceneTreePanel — renders the scene node hierarchy
    // ---------------------------------------------------------------------------

    class SceneTreePanel {
        /**
         * @param {string} containerId - DOM element ID for the tree container
         */
        constructor(containerId) {
            this._el = document.getElementById(containerId);
            this._editor = null;
        }

        /**
         * Refresh the tree from scene data.
         * @param {Object} sceneData - the scene JSON object
         * @param {EditorApp} editorApp - reference to the editor controller
         */
        refresh(sceneData, editorApp) {
            this._el.innerHTML = "";
            this._editor = editorApp;
            if (sceneData && sceneData.children) {
                this._renderTree(sceneData.children, this._el, 0);
            }
        }

        /**
         * Recursively render child nodes into the DOM.
         * @param {Object[]} children - array of child node definitions
         * @param {HTMLElement} parentEl - parent DOM element to append to
         * @param {number} depth - tree depth for indentation
         * @private
         */
        _renderTree(children, parentEl, depth) {
            var self = this;
            for (var i = 0; i < children.length; i++) {
                var node = children[i];

                var div = document.createElement("div");
                var icon = node.type === "Group" ? "▸ " : "▣ ";
                var label = (node.name || "(unnamed)");
                div.style.cssText =
                    "padding:3px 4px 3px " + (depth * 16 + 8) + "px;" +
                    "cursor:pointer;color:#ccc;font-size:12px;border-radius:2px;" +
                    "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";
                div.textContent = icon + label;

                div.onmouseenter = function () {
                    div.style.background = "#3d3d3d";
                };
                div.onmouseleave = function () {
                    div.style.background = "transparent";
                };
                div.onclick = (function (n) {
                    return function () {
                        self._editor.selectNode(n);
                    };
                })(node);

                parentEl.appendChild(div);

                if (node.children) {
                    this._renderTree(node.children, parentEl, depth + 1);
                }
            }
        }
    }

    // ---------------------------------------------------------------------------
    // Instantiate on window
    // ---------------------------------------------------------------------------

    window.sceneTreePanel = new SceneTreePanel("sceneTree");
    window.SceneTreePanel = SceneTreePanel;
})();
