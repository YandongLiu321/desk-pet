(function () {
	"use strict";

	// ---------------------------------------------------------------------------
	// vec2 — 2-component vectors stored as Float32Array
	// ---------------------------------------------------------------------------

	/** @param {number} x @param {number} y @returns {Float32Array} */
	function vec2Create(x, y) {
		return new Float32Array([x, y]);
	}

	/** @param {Float32Array} a @returns {Float32Array} */
	function vec2Copy(a) {
		return new Float32Array(a);
	}

	/** @param {Float32Array} out @param {number} x @param {number} y @returns {Float32Array} */
	function vec2Set(out, x, y) {
		out[0] = x;
		out[1] = y;
		return out;
	}

	/** out = a + b @param {Float32Array} out @param {Float32Array} a @param {Float32Array} b @returns {Float32Array} */
	function vec2Add(out, a, b) {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];
		return out;
	}

	/** out = a - b @param {Float32Array} out @param {Float32Array} a @param {Float32Array} b @returns {Float32Array} */
	function vec2Sub(out, a, b) {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];
		return out;
	}

	/** out = a * s (scalar multiply) @param {Float32Array} out @param {Float32Array} a @param {number} s @returns {Float32Array} */
	function vec2Scale(out, a, s) {
		out[0] = a[0] * s;
		out[1] = a[1] * s;
		return out;
	}

	/** out = a * b (component-wise) @param {Float32Array} out @param {Float32Array} a @param {Float32Array} b @returns {Float32Array} */
	function vec2Mul(out, a, b) {
		out[0] = a[0] * b[0];
		out[1] = a[1] * b[1];
		return out;
	}

	/** Linear interpolation: out = a + (b - a) * t @param {Float32Array} out @param {Float32Array} a @param {Float32Array} b @param {number} t @returns {Float32Array} */
	function vec2Lerp(out, a, b, t) {
		out[0] = a[0] + (b[0] - a[0]) * t;
		out[1] = a[1] + (b[1] - a[1]) * t;
		return out;
	}

	/** Magnitude / length @param {Float32Array} a @returns {number} */
	function vec2Length(a) {
		return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
	}

	/** Normalize (unit length). Returns out unchanged if a is zero-length. @param {Float32Array} out @param {Float32Array} a @returns {Float32Array} */
	function vec2Normalize(out, a) {
		var len = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
		if (len > 1e-8) {
			out[0] = a[0] / len;
			out[1] = a[1] / len;
		} else {
			out[0] = 0;
			out[1] = 0;
		}
		return out;
	}

	// ---------------------------------------------------------------------------
	// vec4 — 4-component vectors stored as Float32Array
	// ---------------------------------------------------------------------------

	/** @param {number} x @param {number} y @param {number} z @param {number} [w] @returns {Float32Array} */
	function vec4Create(x, y, z, w) {
		return new Float32Array([x, y, z, w !== undefined ? w : 1]);
	}

	/** @param {Float32Array} a @returns {Float32Array} */
	function vec4Copy(a) {
		return new Float32Array(a);
	}

	/** @param {Float32Array} out @param {number} x @param {number} y @param {number} z @param {number} w @returns {Float32Array} */
	function vec4Set(out, x, y, z, w) {
		out[0] = x;
		out[1] = y;
		out[2] = z;
		out[3] = w;
		return out;
	}

	// ---------------------------------------------------------------------------
	// mat3 — 3x3 column-major matrices for 2D affine transforms
	//        Index layout (column-major):
	//        | 0  3  6 |   col 0 → indices 0,1,2
	//        | 1  4  7 |   col 1 → indices 3,4,5
	//        | 2  5  8 |   col 2 → indices 6,7,8
	// ---------------------------------------------------------------------------

	/** @returns {Float32Array} identity matrix */
	function mat3Create() {
		return new Float32Array([
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		]);
	}

	/** Reset to identity @param {Float32Array} out @returns {Float32Array} */
	function mat3Identity(out) {
		out[0] = 1; out[1] = 0; out[2] = 0;
		out[3] = 0; out[4] = 1; out[5] = 0;
		out[6] = 0; out[7] = 0; out[8] = 1;
		return out;
	}

	/** Set out to a translation matrix @param {Float32Array} out @param {number} x @param {number} y @returns {Float32Array} */
	function mat3FromTranslation(out, x, y) {
		out[0] = 1; out[1] = 0; out[2] = 0;
		out[3] = 0; out[4] = 1; out[5] = 0;
		out[6] = x; out[7] = y; out[8] = 1;
		return out;
	}

	/** Set out to a rotation matrix @param {Float32Array} out @param {number} rad @returns {Float32Array} */
	function mat3FromRotation(out, rad) {
		var c = Math.cos(rad);
		var s = Math.sin(rad);
		out[0] = c;  out[1] = s;  out[2] = 0;
		out[3] = -s; out[4] = c;  out[5] = 0;
		out[6] = 0;  out[7] = 0;  out[8] = 1;
		return out;
	}

	/** Set out to a scale matrix @param {Float32Array} out @param {number} sx @param {number} sy @returns {Float32Array} */
	function mat3FromScale(out, sx, sy) {
		out[0] = sx; out[1] = 0;  out[2] = 0;
		out[3] = 0;  out[4] = sy; out[5] = 0;
		out[6] = 0;  out[7] = 0;  out[8] = 1;
		return out;
	}

	/** Matrix multiply: out = a * b @param {Float32Array} out @param {Float32Array} a @param {Float32Array} b @returns {Float32Array} */
	function mat3Mul(out, a, b) {
		// Column-major multiply: each element out[i + j*3] = dot(row i of a, col j of b)
		var a00 = a[0], a01 = a[1], a02 = a[2];
		var a10 = a[3], a11 = a[4], a12 = a[5];
		var a20 = a[6], a21 = a[7], a22 = a[8];

		var b00 = b[0], b01 = b[1], b02 = b[2];
		var b10 = b[3], b11 = b[4], b12 = b[5];
		var b20 = b[6], b21 = b[7], b22 = b[8];

		out[0] = a00 * b00 + a10 * b01 + a20 * b02;
		out[1] = a01 * b00 + a11 * b01 + a21 * b02;
		out[2] = a02 * b00 + a12 * b01 + a22 * b02;

		out[3] = a00 * b10 + a10 * b11 + a20 * b12;
		out[4] = a01 * b10 + a11 * b11 + a21 * b12;
		out[5] = a02 * b10 + a12 * b11 + a22 * b12;

		out[6] = a00 * b20 + a10 * b21 + a20 * b22;
		out[7] = a01 * b20 + a11 * b21 + a21 * b22;
		out[8] = a02 * b20 + a12 * b21 + a22 * b22;

		return out;
	}

	/** Orthographic projection matrix.
	 *  Maps [left, right] x [bottom, top] to clip space [-1, 1] x [-1, 1].
	 *  @param {Float32Array} out @param {number} left @param {number} right @param {number} bottom @param {number} top @returns {Float32Array} */
	function mat3Ortho(out, left, right, bottom, top) {
		var rl = right - left;
		var tb = top - bottom;

		out[0] = 2 / rl;  out[1] = 0;       out[2] = 0;
		out[3] = 0;       out[4] = 2 / tb;   out[5] = 0;
		out[6] = -(right + left) / rl;
		out[7] = -(top + bottom) / tb;
		out[8] = 1;

		return out;
	}

	/** Transform a vec2 by a mat3 (homogeneous: v = (v.x, v.y, 1)).
	 *  @param {Float32Array} out @param {Float32Array} m @param {Float32Array} v @returns {Float32Array} */
	function mat3MultiplyVec2(out, m, v) {
		var x = v[0];
		var y = v[1];
		var w = m[2] * x + m[5] * y + m[8];
		out[0] = (m[0] * x + m[3] * y + m[6]) / w;
		out[1] = (m[1] * x + m[4] * y + m[7]) / w;
		return out;
	}

	// ---------------------------------------------------------------------------
	// Utility functions
	// ---------------------------------------------------------------------------

	/** Clamp value between lo and hi @param {number} v @param {number} lo @param {number} hi @returns {number} */
	function utilClamp(v, lo, hi) {
		return v < lo ? lo : v > hi ? hi : v;
	}

	/** Linear interpolation @param {number} a @param {number} b @param {number} t @returns {number} */
	function utilLerp(a, b, t) {
		return a + (b - a) * t;
	}

	/** Degrees to radians @param {number} d @returns {number} */
	function utilDegToRad(d) {
		return d * Math.PI / 180;
	}

	/** Radians to degrees @param {number} r @returns {number} */
	function utilRadToDeg(r) {
		return r * 180 / Math.PI;
	}

	// ---------------------------------------------------------------------------
	// Exports
	// ---------------------------------------------------------------------------

	window.WebGLMath = {
		vec2: {
			create: vec2Create,
			copy: vec2Copy,
			set: vec2Set,
			add: vec2Add,
			sub: vec2Sub,
			scale: vec2Scale,
			mul: vec2Mul,
			lerp: vec2Lerp,
			length: vec2Length,
			normalize: vec2Normalize,
		},
		vec4: {
			create: vec4Create,
			copy: vec4Copy,
			set: vec4Set,
		},
		mat3: {
			create: mat3Create,
			identity: mat3Identity,
			fromTranslation: mat3FromTranslation,
			fromRotation: mat3FromRotation,
			fromScale: mat3FromScale,
			mul: mat3Mul,
			ortho: mat3Ortho,
			multiplyVec2: mat3MultiplyVec2,
		},
		clamp: utilClamp,
		lerp: utilLerp,
		degToRad: utilDegToRad,
		radToDeg: utilRadToDeg,
	};
})();
