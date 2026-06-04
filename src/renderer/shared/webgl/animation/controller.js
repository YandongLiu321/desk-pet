(function () {
	"use strict";

	// ---------------------------------------------------------------------------
	// AnimationController — base class for all animation controllers
	// ---------------------------------------------------------------------------

	class AnimationController {
		/**
		 * @param {Object} def - controller definition
		 * @param {boolean} [def.enabled=true]
		 */
		constructor(def) {
			this.enabled = def && def.enabled !== undefined ? def.enabled : true;
		}

		/**
		 * Called every frame. Override in subclasses.
		 * @param {number} dt - delta time in seconds
		 * @param {SceneNode} node - the node this controller is attached to
		 * @param {number} [mouseX] - normalized mouse X (0..1)
		 * @param {number} [mouseY] - normalized mouse Y (0..1)
		 */
		update(dt, node, mouseX, mouseY) {
			// Override in subclasses
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.AnimationController = AnimationController;
})();
