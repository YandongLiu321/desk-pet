(function () {
	"use strict";

	// ---------------------------------------------------------------------------
	// Camera — orthographic camera for the 2D scene
	// ---------------------------------------------------------------------------

	class Camera {
		constructor() {
			// Default: center at (1920, 1080), size 3840x2160 (4K scene)
			/** @type {number} */
			this._cx = 1920;

			/** @type {number} */
			this._cy = 1080;

			/** @type {number} */
			this._w = 3840;

			/** @type {number} */
			this._h = 2160;

			/** @type {Float32Array} — 3x3 view (translation) matrix, column-major */
			this._viewMatrix = window.WebGLMath.mat3.create();

			/** @type {Float32Array} — 3x3 orthographic projection matrix, column-major */
			this._projMatrix = window.WebGLMath.mat3.create();

			/** @type {Float32Array} — 3x3 combined view-projection matrix, column-major */
			this._viewProjMatrix = window.WebGLMath.mat3.create();
		}

		// -----------------------------------------------------------------------
		// Public API
		// -----------------------------------------------------------------------

		/**
		 * Set what the camera views in scene coordinates.
		 * @param {number} x - center X in scene coords
		 * @param {number} y - center Y in scene coords
		 * @param {number} width - desired view width in scene coords
		 * @param {number} height - desired view height in scene coords
		 */
		lookAt(x, y, width, height) {
			this._cx = x;
			this._cy = y;
			this._w = width;
			this._h = height;
		}

		/**
		 * Recompute view and projection matrices.
		 * Must be called before rendering (on resize, after lookAt, etc.).
		 *
		 * Handles aspect ratio by expanding the shorter axis to match the screen,
		 * ensuring the entire desired region is visible (letterbox / pillarbox).
		 *
		 * @param {number} screenWidth
		 * @param {number} screenHeight
		 */
		update(screenWidth, screenHeight) {
			var M = window.WebGLMath.mat3;

			// --- Compute half-extents with aspect ratio correction ---
			var sceneAspect = this._w / this._h;
			var screenAspect = screenWidth / screenHeight;
			var halfW, halfH;

			if (screenAspect > sceneAspect) {
				// Screen is wider than scene → expand width (pillarbox)
				halfH = this._h / 2;
				halfW = halfH * screenAspect;
			} else {
				// Screen is taller (or equal) → expand height (letterbox)
				halfW = this._w / 2;
				halfH = halfW / screenAspect;
			}

			// --- View matrix: translate so camera center is at origin ---
			// Translation by (-cx, -cy) moves the camera center to (0,0)
			M.fromTranslation(this._viewMatrix, -this._cx, -this._cy);

			// --- Projection matrix: ortho from view-space to NDC ---
			// Maps [-halfW, halfW] x [-halfH, halfH] → [-1, 1] x [-1, 1]
			M.ortho(this._projMatrix, -halfW, halfW, -halfH, halfH);

			// --- Combined view-projection: proj * view ---
			M.mul(this._viewProjMatrix, this._projMatrix, this._viewMatrix);
		}

		/**
		 * Returns the combined view-projection matrix (3x3, column-major).
		 * @returns {Float32Array}
		 */
		getViewProjMatrix() {
			return this._viewProjMatrix;
		}

		/**
		 * Returns the projection matrix only (3x3, column-major).
		 * @returns {Float32Array}
		 */
		getProjMatrix() {
			return this._projMatrix;
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.Camera = Camera;
})();
