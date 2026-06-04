(function () {
	"use strict";

	var Base = window.AnimationController;

	// ---------------------------------------------------------------------------
	// BreathingController — oscillates node scale for a breathing effect
	// ---------------------------------------------------------------------------

	class BreathingController extends Base {
		/**
		 * @param {Object} def
		 * @param {number} [def.speed=1.2] - oscillation speed
		 * @param {number} [def.strength=0.35] - scale oscillation amplitude
		 * @param {number} [def.phase=0] - initial phase offset in radians
		 * @param {boolean} [def.enabled=true]
		 */
		constructor(def) {
			super(def);

			def = def || {};

			/** @type {number} */
			this.speed = def.speed !== undefined ? def.speed : 1.2;

			/** @type {number} */
			this.strength = def.strength !== undefined ? def.strength : 0.35;

			/** @type {number} accumulated phase */
			this._phase = def.phase !== undefined ? def.phase : 0;
		}

		/**
		 * Update the breathing animation.
		 * node.scale = 1 + sin(phase) * strength (applied uniformly)
		 * @param {number} dt - delta time in seconds
		 * @param {SceneNode} node
		 */
		update(dt, node) {
			if (!this.enabled || !node) return;

			this._phase += dt * this.speed * Math.PI * 2;

			var s = 1 + Math.sin(this._phase) * this.strength;
			// Clamp to avoid negative or zero scale
			if (s < 0.01) s = 0.01;

			if (node.scale) {
				node.scale[0] = s;
				node.scale[1] = s;
				node.markDirty();
			}
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.AnimationController_BreathingController = BreathingController;
})();
