(function () {
	"use strict";

	var Base = window.AnimationController;

	// ---------------------------------------------------------------------------
	// ParallaxController — smooth mouse-follow offset for parallax effect
	// ---------------------------------------------------------------------------

	class ParallaxController extends Base {
		/**
		 * @param {Object} def
		 * @param {number} [def.strength=-100] - multiplier for (mouse - 0.5)
		 * @param {number} [def.smoothing=1.6] - exponential smoothing factor
		 * @param {boolean} [def.enabled=true]
		 */
		constructor(def) {
			super(def);

			def = def || {};

			/** @type {number} */
			this.strength = def.strength !== undefined ? def.strength : -100;

			/** @type {number} */
			this.smoothing = def.smoothing !== undefined ? def.smoothing : 1.6;

			/** @type {Float32Array} current parallax offset */
			this._offset = new Float32Array([0, 0]);

			/** @type {Float32Array} target parallax offset */
			this._target = new Float32Array([0, 0]);
		}

		/**
		 * Smoothly follow the mouse position and store as uParallax on material.
		 * @param {number} dt - delta time in seconds
		 * @param {SceneNode} node
		 * @param {number} mouseX - normalized mouse X (0..1)
		 * @param {number} mouseY - normalized mouse Y (0..1)
		 */
		update(dt, node, mouseX, mouseY) {
			if (!this.enabled || !node) return;

			if (mouseX === undefined) mouseX = 0.5;
			if (mouseY === undefined) mouseY = 0.5;

			// Target offset
			this._target[0] = (mouseX - 0.5) * this.strength;
			this._target[1] = (mouseY - 0.5) * this.strength;

			// Exponential smoothing
			var factor = 1 - Math.exp(-this.smoothing * dt);
			this._offset[0] += (this._target[0] - this._offset[0]) * factor;
			this._offset[1] += (this._target[1] - this._offset[1]) * factor;

			// Store on the node's material uniform placeholder
			if (!node._materialUniforms) {
				node._materialUniforms = {};
			}
			node._materialUniforms.uParallax = this._offset;
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.AnimationController_ParallaxController = ParallaxController;
})();
