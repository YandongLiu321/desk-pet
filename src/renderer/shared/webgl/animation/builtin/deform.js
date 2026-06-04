(function () {
	"use strict";

	var Base = window.AnimationController;

	// ---------------------------------------------------------------------------
	// DeformController — feeds time and parameters for a shader deformation
	// ---------------------------------------------------------------------------

	class DeformController extends Base {
		/**
		 * @param {Object} def
		 * @param {number} [def.speed=0.07] - deformation speed
		 * @param {number} [def.strength=0.15] - deformation strength
		 * @param {boolean} [def.enabled=true]
		 */
		constructor(def) {
			super(def);

			def = def || {};

			/** @type {number} */
			this.speed = def.speed !== undefined ? def.speed : 0.07;

			/** @type {number} */
			this.strength = def.strength !== undefined ? def.strength : 0.15;

			/** @type {number} accumulated time */
			this._time = 0;
		}

		/**
		 * Accumulate time and set deformation uniforms on the node's material.
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
			node._materialUniforms.uDeformSpeed = this.speed;
			node._materialUniforms.uDeformStrength = this.strength;
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.AnimationController_DeformController = DeformController;
})();
