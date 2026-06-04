(function () {
    "use strict";

    // ---------------------------------------------------------------------------
    // PropertyInspector — shows and edits properties of the selected node
    // ---------------------------------------------------------------------------

    class PropertyInspector {
        /**
         * @param {string} containerId - DOM element ID for the inspector container
         */
        constructor(containerId) {
            this._el = document.getElementById(containerId);
        }

        /**
         * Display the properties of the selected node.
         * @param {Object} node - the selected scene node
         */
        show(node) {
            if (!node) {
                this._el.innerHTML = '<p style="color:#666;padding:8px;">No selection</p>';
                return;
            }

            var html = '<div style="padding:8px;display:flex;flex-direction:column;gap:8px;">';
            html += '<div style="color:#fff;font-weight:600;margin-bottom:4px;">' +
                (node.type || "Node") + '</div>';

            // Name
            html += this._field("Name", "text", node.name || "", "name");

            // Position
            if (node.position) {
                html += this._field("X", "number", node.position[0], "position.x", "1");
                html += this._field("Y", "number", node.position[1], "position.y", "1");
            }

            // Scale
            if (node.scale) {
                html += this._field("Scale X", "number", node.scale[0], "scale.x", "0.01");
                html += this._field("Scale Y", "number", node.scale[1], "scale.y", "0.01");
            }

            // Alpha
            if (node.alpha != null) {
                html += this._slider("Alpha", node.alpha, "alpha", 0, 1, 0.01);
            }

            // Z-Index
            if (node.zIndex != null) {
                html += this._field("Z-Index", "number", node.zIndex, "zIndex", "1");
            }

            html += '</div>';
            this._el.innerHTML = html;
        }

        /**
         * Build a text/number input field row.
         * @param {string} label
         * @param {string} type - "text" or "number"
         * @param {*} value
         * @param {string} prop - dot-separated property path
         * @param {string} [step]
         * @returns {string} HTML string
         * @private
         */
        _field(label, type, value, prop, step) {
            return '<div style="display:flex;align-items:center;gap:6px;">' +
                '<span style="width:60px;font-size:11px;color:#999;flex-shrink:0;">' + label + '</span>' +
                '<input type="' + type + '" value="' + (value || "") + '" step="' + (step || "") + '" ' +
                'style="flex:1;background:#1a1a1a;border:1px solid #3d3d3d;color:#ccc;' +
                'padding:2px 4px;border-radius:2px;font-size:12px;min-width:0;" ' +
                'onchange="window.propertyInspector._onChange(\'' + prop + '\', this.value)">' +
                '</div>';
        }

        /**
         * Build a range slider row.
         * @param {string} label
         * @param {number} value
         * @param {string} prop - dot-separated property path
         * @param {number} min
         * @param {number} max
         * @param {number} step
         * @returns {string} HTML string
         * @private
         */
        _slider(label, value, prop, min, max, step) {
            var displayValue = parseFloat(value).toFixed(2);
            return '<div style="display:flex;align-items:center;gap:6px;">' +
                '<span style="width:60px;font-size:11px;color:#999;flex-shrink:0;">' + label + '</span>' +
                '<input type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + value + '" ' +
                'style="flex:1;min-width:0;" ' +
                'oninput="var v=parseFloat(this.value).toFixed(2);this.nextElementSibling.textContent=v;' +
                'window.propertyInspector._onChange(\'' + prop + '\', this.value)">' +
                '<span style="width:40px;font-size:11px;color:#ccc;text-align:right;flex-shrink:0;">' +
                displayValue + '</span>' +
                '</div>';
        }

        /**
         * Handle property changes — push to IPC and update local scene data.
         * @param {string} prop - dot-separated property path (e.g. "position.x")
         * @param {string|number} value - new value
         * @private
         */
        async _onChange(prop, value) {
            var numVal = isNaN(value) ? value : parseFloat(value);

            // Push to main process via IPC
            var ipc = new window.IpcClient();
            await ipc.updateProperty(null, prop, numVal);

            // Update local scene data too
            if (window.editorApp && window.editorApp.selectedNode) {
                var node = window.editorApp.selectedNode;
                this._setProp(node, prop, numVal);
            }

            // Re-render the property display (updates slider displays etc.)
            if (window.editorApp && window.editorApp.selectedNode) {
                this.show(window.editorApp.selectedNode);
            }
        }

        /**
         * Set a (possibly nested) property on a node by dot-path.
         * @param {Object} node
         * @param {string} prop - e.g. "name", "position.x", "scale.y", "alpha"
         * @param {*} value
         * @private
         */
        _setProp(node, prop, value) {
            var parts = prop.split(".");
            if (parts.length === 1) {
                node[prop] = value;
            } else if (parts.length === 2) {
                var idx;
                if (parts[1] === "x") {
                    idx = 0;
                } else if (parts[1] === "y") {
                    idx = 1;
                } else {
                    idx = "zrw".indexOf(parts[1]);
                }
                if (idx >= 0 && node[parts[0]]) {
                    node[parts[0]][idx] = value;
                }
            }
        }

        /**
         * Clear the inspector panel.
         */
        refresh() {
            this._el.innerHTML = '<p style="color:#666;padding:8px;">Select a node to inspect</p>';
        }
    }

    // ---------------------------------------------------------------------------
    // Instantiate on window
    // ---------------------------------------------------------------------------

    window.propertyInspector = new PropertyInspector("propertyInspector");
    window.PropertyInspector = PropertyInspector;
})();
