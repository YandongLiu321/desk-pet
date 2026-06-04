(function () {
	"use strict";

	var Base = window.AnimationController;

	// ---------------------------------------------------------------------------
	// FlowController — feeds time and parameters for a shader flow/ripple
	// ---------------------------------------------------------------------------

	class FlowController extends Base {
		/**
		 * @param {Object} def
		 * @param {number} [def.speed=0.25] - flow speed
		 * @param {number} [def.strength=1.0] - flow strength/amplitude
		 * @param {boolean} [def.enabled=true]
		 */
		constructor(def) {
			super(def);

			def = def || {};

			/** @type {number} */
			this.speed = def.speed !== undefined ? def.speed : 0.25;

			/** @type {number} */
			this.strength = def.strength !== undefined ? def.strength : 1.0;

			/** @type {number} accumulated time */
			this._time = 0;
		}

		/**
		 * Accumulate time and set flow uniforms on the node's material.
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
			node._materialUniforms.uFlowSpeed = this.speed;
			node._materialUniforms.uFlowStrength = this.strength;
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.AnimationController_FlowController = FlowController;
})();
