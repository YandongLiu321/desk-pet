(function () {
	"use strict";

	var Base = window.AnimationController;

	// ---------------------------------------------------------------------------
	// PanController — scrolls/pan a texture over time via uniform offset
	// ---------------------------------------------------------------------------

	class PanController extends Base {
		/**
		 * @param {Object} def
		 * @param {number} [def.speed=1.0] - pan speed in units per second
		 * @param {number[]} [def.direction=[1, 0]] - normalized pan direction [dx, dy]
		 * @param {boolean} [def.enabled=true]
		 */
		constructor(def) {
			super(def);

			def = def || {};

			/** @type {number} */
			this.speed = def.speed !== undefined ? def.speed : 1.0;

			/** @type {Float32Array} */
			this.direction = new Float32Array([
				(def.direction && def.direction[0] !== undefined) ? def.direction[0] : 1,
				(def.direction && def.direction[1] !== undefined) ? def.direction[1] : 0,
			]);

			/** @type {Float32Array} accumulated pan offset */
			this._offset = new Float32Array([0, 0]);

			// Normalize direction on construction
			var len = Math.sqrt(
				this.direction[0] * this.direction[0] + this.direction[1] * this.direction[1]
			);
			if (len > 0.0001) {
				this.direction[0] /= len;
				this.direction[1] /= len;
			}
		}

		/**
		 * Accumulate pan offset and store as uPanOffset on the node's material.
		 * @param {number} dt - delta time in seconds
		 * @param {SceneNode} node
		 */
		update(dt, node) {
			if (!this.enabled || !node) return;

			this._offset[0] += this.direction[0] * this.speed * dt;
			this._offset[1] += this.direction[1] * this.speed * dt;

			if (!node._materialUniforms) {
				node._materialUniforms = {};
			}
			node._materialUniforms.uPanOffset = this._offset;
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.AnimationController_PanController = PanController;
})();
