(function () {
	"use strict";

	// ---------------------------------------------------------------------------
	// QuadMesh — generates VAO/VBO for textured quads with configurable anchor
	// ---------------------------------------------------------------------------

	class QuadMesh {
		/**
		 * @param {WebGL2RenderingContext} gl
		 * @param {number} w - quad width in scene units
		 * @param {number} h - quad height in scene units
		 * @param {number} [anchorX=0.5] - horizontal anchor [0..1] (0=left, 0.5=center, 1=right)
		 * @param {number} [anchorY=0.5] - vertical anchor [0..1] (0=top, 0.5=center, 1=bottom)
		 */
		constructor(gl, w, h, anchorX, anchorY) {
			/** @type {WebGL2RenderingContext} */
			this._gl = gl;

			/** @type {number} */
			this._w = w;

			/** @type {number} */
			this._h = h;

			/** @type {number} */
			this._anchorX = anchorX !== undefined ? anchorX : 0.5;

			/** @type {number} */
			this._anchorY = anchorY !== undefined ? anchorY : 0.5;

			/** @type {WebGLVertexArrayObject|null} */
			this._vao = null;

			/** @type {WebGLBuffer|null} */
			this._vbo = null;

			/** @type {boolean} */
			this._dirty = true;

			// Build VAO and VBO immediately
			this.vao();
		}

		// -----------------------------------------------------------------------
		// Public API
		// -----------------------------------------------------------------------

		/**
		 * Update quad dimensions and/or anchor point.
		 * Does not rebuild immediately — sets a dirty flag so vao() rebuilds on next use.
		 *
		 * @param {number} w
		 * @param {number} h
		 * @param {number} [anchorX]
		 * @param {number} [anchorY]
		 */
		resize(w, h, anchorX, anchorY) {
			this._w = w;
			this._h = h;
			if (anchorX !== undefined) this._anchorX = anchorX;
			if (anchorY !== undefined) this._anchorY = anchorY;
			this._dirty = true;
		}

		/**
		 * Return the WebGLVertexArrayObject, rebuilding vertex data if dirty.
		 * @returns {WebGLVertexArrayObject}
		 */
		vao() {
			if (this._dirty) {
				this._build();
				this._dirty = false;
			}
			return this._vao;
		}

		/**
		 * Bind VAO and issue the draw call (6 vertices, 2 triangles, no index buffer).
		 */
		draw() {
			var gl = this._gl;
			gl.bindVertexArray(this.vao());
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		}

		/**
		 * Delete the VAO and VBO, releasing GPU resources.
		 */
		destroy() {
			var gl = this._gl;
			if (this._vao) {
				gl.deleteVertexArray(this._vao);
				this._vao = null;
			}
			if (this._vbo) {
				gl.deleteBuffer(this._vbo);
				this._vbo = null;
			}
		}

		// -----------------------------------------------------------------------
		// Internal helpers
		// -----------------------------------------------------------------------

		/**
		 * Build (or rebuild) the VAO and VBO from current dimensions and anchor.
		 */
		_build() {
			var gl = this._gl;
			var data = this._buildVertexData();

			// Create VBO on first call, reuse on subsequent calls
			if (!this._vbo) {
				this._vbo = gl.createBuffer();
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
			gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

			// Create VAO on first call, reuse on subsequent calls
			if (!this._vao) {
				this._vao = gl.createVertexArray();
			}

			gl.bindVertexArray(this._vao);

			// Attribute 0: aPos (location 0) — 2 floats, offset 0, stride 16 bytes
			gl.enableVertexAttribArray(0);
			gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);

			// Attribute 1: aTexCoord (location 1) — 2 floats, offset 8, stride 16 bytes
			gl.enableVertexAttribArray(1);
			gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);

			// Unbind VAO (clean practice)
			gl.bindVertexArray(null);
		}

		/**
		 * Compute the 6-vertex interleaved array from current dimensions and anchor.
		 *
		 * Bounds are computed relative to the anchor point:
		 *   left   = -w * anchorX
		 *   right  =  w * (1 - anchorX)
		 *   top    = -h * anchorY
		 *   bottom =  h * (1 - anchorY)
		 *
		 * @returns {Float32Array} 24 floats (6 vertices x [x, y, u, v])
		 */
		_buildVertexData() {
			var left   = -this._w * this._anchorX;
			var right  =  this._w * (1 - this._anchorX);
			var top    = -this._h * this._anchorY;
			var bottom =  this._h * (1 - this._anchorY);

			// 2 triangles covering the quad.
			// UV: (0,0) = top-left, (1,1) = bottom-right.
			return new Float32Array([
				// Triangle 1
				left,  top,    0, 0,  // top-left
				right, top,    1, 0,  // top-right
				left,  bottom, 0, 1,  // bottom-left
				// Triangle 2
				right, top,    1, 0,  // top-right
				right, bottom, 1, 1,  // bottom-right
				left,  bottom, 0, 1,  // bottom-left
			]);
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.QuadMesh = QuadMesh;
})();
