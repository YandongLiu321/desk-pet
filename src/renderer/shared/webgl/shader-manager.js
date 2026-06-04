(function () {
	"use strict";

	// ---------------------------------------------------------------------------
	// ShaderManager — compiles, caches, and manages WebGL shader programs
	// ---------------------------------------------------------------------------

	class ShaderManager {
		/**
		 * @param {WebGL2RenderingContext} gl
		 */
		constructor(gl) {
			/** @type {WebGL2RenderingContext} */
			this._gl = gl;

			/** @type {Object<string, {vert: string, frag: string}>} */
			this._sources = {};

			/** @type {Object<string, WebGLProgram>} */
			this._cache = {};
		}

		// -----------------------------------------------------------------------
		// Public API
		// -----------------------------------------------------------------------

		/**
		 * Store shader source code by name for later compilation.
		 * @param {string} name
		 * @param {string} vertSrc
		 * @param {string} fragSrc
		 */
		register(name, vertSrc, fragSrc) {
			this._sources[name] = { vert: vertSrc, frag: fragSrc };
		}

		/**
		 * Get (or compile and cache) a WebGLProgram for the named shader.
		 * An optional defines object injects #define lines before compilation;
		 * each key becomes `#define KEY VALUE\n`.
		 *
		 * @param {string} name
		 * @param {Object<string,string>} [defines]
		 * @returns {WebGLProgram}
		 */
		get(name, defines) {
			var cacheKey = this._makeCacheKey(name, defines);

			// Return cached program if available
			if (this._cache[cacheKey]) {
				return this._cache[cacheKey];
			}

			var src = this._sources[name];
			if (!src) {
				throw new Error("ShaderManager: no source registered for '" + name + "'");
			}

			// Build the define-prefix string once
			var prefix = "";
			if (defines) {
				var keys = Object.keys(defines);
				for (var i = 0; i < keys.length; i++) {
					var k = keys[i];
					prefix += "#define " + k + " " + defines[k] + "\n";
				}
			}

			// If we have defines, prepend them to both vertex and fragment source.
			// Otherwise compile the raw source (which is also cached by cacheKey).
			var vertSrc = prefix ? prefix + src.vert : src.vert;
			var fragSrc = prefix ? prefix + src.frag : src.frag;

			var vs = this._compile(this._gl.VERTEX_SHADER, vertSrc);
			var fs = this._compile(this._gl.FRAGMENT_SHADER, fragSrc);
			var program = this._link(vs, fs);

			// Shader objects are no longer needed after linking
			this._gl.deleteShader(vs);
			this._gl.deleteShader(fs);

			this._cache[cacheKey] = program;
			return program;
		}

		/**
		 * Delete all cached programs whose key starts with the given name.
		 * Useful for hot-reloading shader sources after calling register() again.
		 * @param {string} name
		 */
		invalidate(name) {
			var prefix = name + "\x00";
			var keys = Object.keys(this._cache);
			for (var i = 0; i < keys.length; i++) {
				var k = keys[i];
				if (k === name || k.indexOf(prefix) === 0) {
					this._gl.deleteProgram(this._cache[k]);
					delete this._cache[k];
				}
			}
		}

		/**
		 * Delete every cached program and clear all sources.
		 */
		destroy() {
			var keys = Object.keys(this._cache);
			for (var i = 0; i < keys.length; i++) {
				this._gl.deleteProgram(this._cache[keys[i]]);
			}
			this._cache = {};
			this._sources = {};
		}

		// -----------------------------------------------------------------------
		// Internal helpers
		// -----------------------------------------------------------------------

		/**
		 * Compile a single shader of the given type.
		 * @param {number} type — gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
		 * @param {string} src
		 * @returns {WebGLShader}
		 * @throws {Error} on compile failure, with the info log in the message
		 */
		_compile(type, src) {
			var gl = this._gl;
			var shader = gl.createShader(type);
			gl.shaderSource(shader, src);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				var log = gl.getShaderInfoLog(shader);
				gl.deleteShader(shader);
				throw new Error(
					"ShaderManager: compile error in " +
						(type === gl.VERTEX_SHADER ? "vertex" : "fragment") +
						" shader\n" +
						(log || "unknown error")
				);
			}

			return shader;
		}

		/**
		 * Link a vertex + fragment shader into a program.
		 * @param {WebGLShader} vs
		 * @param {WebGLShader} fs
		 * @returns {WebGLProgram}
		 * @throws {Error} on link failure, with the info log in the message
		 */
		_link(vs, fs) {
			var gl = this._gl;
			var program = gl.createProgram();
			gl.attachShader(program, vs);
			gl.attachShader(program, fs);
			gl.linkProgram(program);

			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
				var log = gl.getProgramInfoLog(program);
				gl.deleteProgram(program);
				throw new Error(
					"ShaderManager: link error\n" + (log || "unknown error")
				);
			}

			return program;
		}

		/**
		 * Build a deterministic cache key from name + optional defines.
		 * Uses a \x00 separator so "foo" with no defines never collides with
		 * "foo\x00bar" which would happen with simple concatenation.
		 * @param {string} name
		 * @param {Object<string,string>} [defines]
		 * @returns {string}
		 */
		_makeCacheKey(name, defines) {
			if (!defines) {
				return name;
			}
			// Sort keys for deterministic output
			var keys = Object.keys(defines).sort();
			var parts = [];
			for (var i = 0; i < keys.length; i++) {
				parts.push(keys[i] + "=" + defines[keys[i]]);
			}
			return name + "\x00" + parts.join(",");
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.ShaderManager = ShaderManager;
})();
