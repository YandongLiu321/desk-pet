(function () {
	"use strict";

	// ---------------------------------------------------------------------------
	// TextureManager — loads images into GPU textures with caching
	// ---------------------------------------------------------------------------

	class TextureManager {
		/**
		 * @param {WebGL2RenderingContext} gl
		 */
		constructor(gl) {
			/** @type {WebGL2RenderingContext} */
			this._gl = gl;

			/** @type {Map<string, {texture: WebGLTexture, width: number, height: number}>} */
			this._cache = new Map();

			/** @type {Map<string, Promise<{texture: WebGLTexture, width: number, height: number}>>} */
			this._loading = new Map();
		}

		// -----------------------------------------------------------------------
		// Public API
		// -----------------------------------------------------------------------

		/**
		 * Load an image from a URL and upload it to a GPU texture.
		 * Results are cached by URL. If a load for the same URL is already
		 * in-flight, the existing Promise is returned (deduplication).
		 *
		 * @param {string} url
		 * @returns {Promise<{texture: WebGLTexture, width: number, height: number}>}
		 */
		async load(url) {
			// Return cached result immediately if available
			var cached = this._cache.get(url);
			if (cached) {
				return cached;
			}

			// Return in-flight promise to deduplicate concurrent loads
			var loading = this._loading.get(url);
			if (loading) {
				return loading;
			}

			// Start a new load
			var promise = this._doLoad(url);
			this._loading.set(url, promise);

			try {
				var result = await promise;
				this._cache.set(url, result);
				return result;
			} finally {
				this._loading.delete(url);
			}
		}

		/**
		 * Get a cached texture object by URL, or null if not yet loaded.
		 *
		 * @param {string} url
		 * @returns {{texture: WebGLTexture, width: number, height: number}|null}
		 */
		get(url) {
			return this._cache.get(url) || null;
		}

		/**
		 * Bind a texture to a texture unit slot.
		 *
		 * @param {number} slot - texture unit index (e.g. 0 for gl.TEXTURE0)
		 * @param {{texture: WebGLTexture, width: number, height: number}|null} texObj
		 */
		bind(slot, texObj) {
			var gl = this._gl;
			gl.activeTexture(gl.TEXTURE0 + slot);
			gl.bindTexture(gl.TEXTURE_2D, texObj ? texObj.texture : null);
		}

		/**
		 * Create a GPU texture from an HTMLCanvasElement.
		 * The result is NOT cached — the caller is responsible for cleanup.
		 *
		 * @param {HTMLCanvasElement} canvas
		 * @returns {{texture: WebGLTexture, width: number, height: number}}
		 */
		fromCanvas(canvas) {
			var gl = this._gl;
			var texture = gl.createTexture();

			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);

			return {
				texture: texture,
				width: canvas.width,
				height: canvas.height,
			};
		}

		/**
		 * Delete all cached GPU textures and clear internal caches.
		 */
		destroy() {
			var gl = this._gl;
			this._cache.forEach(function (entry) {
				if (entry.texture) {
					gl.deleteTexture(entry.texture);
				}
			});
			this._cache.clear();
			this._loading.clear();
		}

		// -----------------------------------------------------------------------
		// Internal helpers
		// -----------------------------------------------------------------------

		/**
		 * Load an image via new Image() and upload it to a GPU texture.
		 *
		 * @param {string} url
		 * @returns {Promise<{texture: WebGLTexture, width: number, height: number}>}
		 */
		_doLoad(url) {
			var gl = this._gl;
			var self = this;

			return new Promise(function (resolve, reject) {
				var img = new Image();

				img.onload = function () {
					var texture = gl.createTexture();
					gl.bindTexture(gl.TEXTURE_2D, texture);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

					resolve({
						texture: texture,
						width: img.width,
						height: img.height,
					});
				};

				img.onerror = function () {
					reject(new Error("TextureManager: failed to load image: " + url));
				};

				img.src = url;
			});
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.TextureManager = TextureManager;
})();
