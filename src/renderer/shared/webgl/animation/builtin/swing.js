(function () {
	"use strict";

	var Base = window.AnimationController;

	// ---------------------------------------------------------------------------
	// SwingController — sets time-based uniforms for a shader-driven swing
	// ---------------------------------------------------------------------------

	class SwingController extends Base {
		/**
		 * @param {Object} def
		 * @param {number} [def.speed=0.1] - swing speed multiplier
		 * @param {number} [def.strength=0.3] - swing strength/amplitude
		 * @param {number} [def.timeOffset=0] - phase offset for staggered swing
		 * @param {boolean} [def.enabled=true]
		 */
		constructor(def) {
			super(def);

			def = def || {};

			/** @type {number} */
			this.speed = def.speed !== undefined ? def.speed : 0.1;

			/** @type {number} */
			this.strength = def.strength !== undefined ? def.strength : 0.3;

			/** @type {number} */
			this.timeOffset = def.timeOffset !== undefined ? def.timeOffset : 0;

			/** @type {number} accumulated time */
			this._time = 0;
		}

		/**
		 * Accumulate time and set time/parameter uniforms on the node's material.
		 * @param {number} dt - delta time in seconds
		 * @param {SceneNode} node
		 */
		update(dt, node) {
			if (!this.enabled || !node) return;

			this._time += dt;

			if (!node._materialUniforms) {
				node._materialUniforms = {};
			}

			node._materialUniforms.uTime = this._time;
			node._materialUniforms.uSwingSpeed = this.speed;
			node._materialUniforms.uSwingStrength = this.strength;
			node._materialUniforms.uSwingTimeOffset = this.timeOffset;
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.AnimationController_SwingController = SwingController;
})();
