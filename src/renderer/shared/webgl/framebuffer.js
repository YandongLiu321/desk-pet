(function () {
	"use strict";

	// ---------------------------------------------------------------------------
	// Framebuffer — single RGBA render target (FBO + color texture)
	// ---------------------------------------------------------------------------

	class Framebuffer {
		/**
		 * @param {WebGL2RenderingContext} gl
		 * @param {number} width
		 * @param {number} height
		 */
		constructor(gl, width, height) {
			/** @type {WebGL2RenderingContext} */
			this._gl = gl;

			/** @type {number} */
			this.width = width;

			/** @type {number} */
			this.height = height;

			/** @type {WebGLFramebuffer|null} */
			this.fbo = null;

			/** @type {WebGLTexture|null} */
			this.colorTexture = null;

			this._create();
		}

		// -----------------------------------------------------------------------
		// Public API
		// -----------------------------------------------------------------------

		/**
		 * Bind the FBO and set the viewport to cover the full framebuffer.
		 */
		bind() {
			var gl = this._gl;
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
			gl.viewport(0, 0, this.width, this.height);
		}

		/**
		 * Resize the color attachment. No-op if dimensions are unchanged.
		 * Deletes the old texture and creates a new one at the requested size,
		 * then re-attaches it to the existing FBO.
		 *
		 * @param {number} w
		 * @param {number} h
		 */
		resize(w, h) {
			if (this.width === w && this.height === h) {
				return;
			}
			this.width = w;
			this.height = h;

			var gl = this._gl;
			if (this.colorTexture) {
				gl.deleteTexture(this.colorTexture);
			}
			this.colorTexture = this._createTexture(gl, w, h);

			gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
			gl.framebufferTexture2D(
				gl.FRAMEBUFFER,
				gl.COLOR_ATTACHMENT0,
				gl.TEXTURE_2D,
				this.colorTexture,
				0
			);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}

		/**
		 * Delete the FBO and color texture, releasing GPU resources.
		 */
		destroy() {
			var gl = this._gl;
			if (this.fbo) {
				gl.deleteFramebuffer(this.fbo);
				this.fbo = null;
			}
			if (this.colorTexture) {
				gl.deleteTexture(this.colorTexture);
				this.colorTexture = null;
			}
		}

		// -----------------------------------------------------------------------
		// Internal helpers
		// -----------------------------------------------------------------------

		/**
		 * Create the FBO and color texture, then attach the texture and unbind.
		 */
		_create() {
			var gl = this._gl;
			this.fbo = gl.createFramebuffer();
			this.colorTexture = this._createTexture(gl, this.width, this.height);

			gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
			gl.framebufferTexture2D(
				gl.FRAMEBUFFER,
				gl.COLOR_ATTACHMENT0,
				gl.TEXTURE_2D,
				this.colorTexture,
				0
			);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}

		/**
		 * Create a 2D texture suitable for use as a color attachment.
		 * Format: RGBA / UNSIGNED_BYTE, Filter: LINEAR, Wrap: CLAMP_TO_EDGE.
		 *
		 * @param {WebGL2RenderingContext} gl
		 * @param {number} w
		 * @param {number} h
		 * @returns {WebGLTexture}
		 */
		_createTexture(gl, w, h) {
			var texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				w,
				h,
				0,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				null
			);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.bindTexture(gl.TEXTURE_2D, null);
			return texture;
		}
	}

	// ---------------------------------------------------------------------------
	// FramebufferPool — reusable pool of named Framebuffers
	// ---------------------------------------------------------------------------

	class FramebufferPool {
		/**
		 * @param {WebGL2RenderingContext} gl
		 */
		constructor(gl) {
			/** @type {WebGL2RenderingContext} */
			this._gl = gl;

			/** @type {Object<string, Framebuffer>} */
			this._idle = {};

			/** @type {Object<string, Framebuffer>} */
			this._active = {};
		}

		// -----------------------------------------------------------------------
		// Public API
		// -----------------------------------------------------------------------

		/**
		 * Get or create an FBO by name. If an FBO already exists with this name
		 * (idle or active), it is resized if necessary and moved to active.
		 *
		 * @param {string} name
		 * @param {number} w
		 * @param {number} h
		 * @returns {Framebuffer}
		 */
		acquire(name, w, h) {
			// Already active — just resize if needed
			if (this._active[name]) {
				this._active[name].resize(w, h);
				return this._active[name];
			}

			// Move from idle to active, resize if needed
			if (this._idle[name]) {
				var fb = this._idle[name];
				delete this._idle[name];
				fb.resize(w, h);
				this._active[name] = fb;
				return fb;
			}

			// Create a brand-new FBO
			var fb2 = new Framebuffer(this._gl, w, h);
			this._active[name] = fb2;
			return fb2;
		}

		/**
		 * Return the active FBO with the given name, or null if not active.
		 *
		 * @param {string} name
		 * @returns {Framebuffer|null}
		 */
		get(name) {
			return this._active[name] || null;
		}

		/**
		 * Move all active FBOs back to the idle pool without destroying them.
		 */
		releaseAll() {
			var names = Object.keys(this._active);
			for (var i = 0; i < names.length; i++) {
				var name = names[i];
				this._idle[name] = this._active[name];
			}
			this._active = {};
		}

		/**
		 * Destroy all FBOs (both idle and active) and clear the pools.
		 */
		destroy() {
			var idleNames = Object.keys(this._idle);
			for (var i = 0; i < idleNames.length; i++) {
				this._idle[idleNames[i]].destroy();
			}
			this._idle = {};

			var activeNames = Object.keys(this._active);
			for (var i2 = 0; i2 < activeNames.length; i2++) {
				this._active[activeNames[i2]].destroy();
			}
			this._active = {};
		}
	}

	// ---------------------------------------------------------------------------
	// Exports
	// ---------------------------------------------------------------------------

	window.Framebuffer = Framebuffer;
	window.FramebufferPool = FramebufferPool;
})();
