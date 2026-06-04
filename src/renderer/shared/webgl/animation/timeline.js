(function () {
	"use strict";

	var M = window.WebGLMath;

	// ---------------------------------------------------------------------------
	// Easing helpers
	// ---------------------------------------------------------------------------

	var EASING = {
		linear: function (t) { return t; },
		"ease-in": function (t) { return t * t; },
		"ease-out": function (t) { return t * (2 - t); },
		"ease-in-out": function (t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		},
		step: function (t) { return t < 1 ? 0 : 1; },
	};

	// ---------------------------------------------------------------------------
	// KeyframeTrack — a single property animation track
	// ---------------------------------------------------------------------------

	class KeyframeTrack {
		/**
		 * @param {Object} def
		 * @param {string} def.target - node name to look up in sceneNodes
		 * @param {string} def.property - property path like "position.x", "alpha"
		 * @param {Array<{time: number, value: *}>} def.keyframes
		 * @param {string} [def.interpolation="linear"] - easing function name
		 */
		constructor(def) {
			/** @type {string} */
			this.target = def.target || "";

			/** @type {string} */
			this.property = def.property || "";

			/** @type {string} */
			this.interpolation = def.interpolation || "linear";

			// Copy and sort keyframes by time ascending
			/** @type {Array<{time: number, value: *}>} */
			this.keyframes = (def.keyframes || []).slice().sort(function (a, b) {
				return a.time - b.time;
			});

			/** @type {number|null} cached last evaluation result */
			this._lastValue = null;
		}

		/**
		 * Evaluate the track at a given time and return the interpolated value.
		 * @param {number} time - current timeline time in seconds
		 * @param {Object<string, SceneNode>} sceneNodes - map of node name -> SceneNode
		 * @returns {*}
		 */
		evaluate(time, sceneNodes) {
			var kf = this.keyframes;
			var len = kf.length;

			if (len === 0) return null;
			if (len === 1) return kf[0].value;

			// Clamp before first keyframe
			if (time <= kf[0].time) return kf[0].value;

			// Clamp after last keyframe
			if (time >= kf[len - 1].time) return kf[len - 1].value;

			// Find the two surrounding keyframes
			for (var i = 0; i < len - 1; i++) {
				if (time >= kf[i].time && time <= kf[i + 1].time) {
					var t0 = kf[i].time;
					var t1 = kf[i + 1].time;
					var v0 = kf[i].value;
					var v1 = kf[i + 1].value;

					// Normalize t to 0..1
					var rawT = (t1 - t0 > 0.0001) ? (time - t0) / (t1 - t0) : 0;

					// Apply easing
					var easingFn = EASING[this.interpolation] || EASING.linear;
					var t = easingFn(rawT);

					// Interpolate based on value type
					if (typeof v0 === "number" && typeof v1 === "number") {
						return M.lerp(v0, v1, t);
					}

					if (Array.isArray(v0) && Array.isArray(v1)) {
						var out = [];
						for (var j = 0; j < Math.min(v0.length, v1.length); j++) {
							out[j] = M.lerp(v0[j], v1[j], t);
						}
						return out;
					}

					// String or other non-interpolatable value: step
					return t < 0.5 ? v0 : v1;
				}
			}

			return null;
		}
	}

	// ---------------------------------------------------------------------------
	// Timeline — manages a collection of keyframe tracks
	// ---------------------------------------------------------------------------

	class Timeline {
		/**
		 * @param {Object} def
		 * @param {string} [def.name] - timeline name
		 * @param {number} [def.duration=1] - duration in seconds
		 * @param {boolean} [def.loop=false]
		 * @param {Array<Object>} [def.tracks] - array of KeyframeTrack definitions
		 */
		constructor(def) {
			def = def || {};

			/** @type {string} */
			this.name = def.name || "";

			/** @type {number} */
			this.duration = def.duration !== undefined ? def.duration : 1;

			/** @type {boolean} */
			this.loop = def.loop === true;

			/** @type {KeyframeTrack[]} */
			this.tracks = (def.tracks || []).map(function (trackDef) {
				return new KeyframeTrack(trackDef);
			});

			/** @type {string} state: "stopped", "playing", "paused" */
			this._state = "stopped";

			/** @type {number} current time position in seconds */
			this._time = 0;

			/** @type {Object<string, SceneNode>|null} cached scene nodes from last apply */
			this._cachedSceneNodes = null;
		}

		// -----------------------------------------------------------------------
		// Playback control
		// -----------------------------------------------------------------------

		/** Start or resume playback from the current time position. */
		play() {
			this._state = "playing";
		}

		/** Pause playback, preserving current time. */
		pause() {
			if (this._state === "playing") {
				this._state = "paused";
			}
		}

		/** Stop playback and reset time to 0. */
		stop() {
			this._state = "stopped";
			this._time = 0;
		}

		/**
		 * Seek to a specific time.
		 * @param {number} time - time in seconds
		 */
		seek(time) {
			this._time = time;
			if (this.duration > 0) {
				this._time = time % this.duration;
			}
		}

		/**
		 * Return whether the timeline is currently playing.
		 * @returns {boolean}
		 */
		isPlaying() {
			return this._state === "playing";
		}

		// -----------------------------------------------------------------------
		// Update & apply
		// -----------------------------------------------------------------------

		/**
		 * Advance the timeline by dt seconds and apply if playing.
		 * @param {number} dt - delta time in seconds
		 * @param {Object<string, SceneNode>} sceneNodes - name -> node map
		 */
		update(dt, sceneNodes) {
			if (this._state !== "playing") return;
			if (!sceneNodes) return;

			this._time += dt;

			// Handle looping
			if (this.duration > 0) {
				while (this._time >= this.duration) {
					if (this.loop) {
						this._time -= this.duration;
					} else {
						this._time = this.duration;
						this._state = "stopped";
						break;
					}
				}
			}

			this.apply(sceneNodes);
		}

		/**
		 * Evaluate all tracks at the current time and apply values to scene nodes.
		 * @param {Object<string, SceneNode>} sceneNodes
		 */
		apply(sceneNodes) {
			for (var i = 0; i < this.tracks.length; i++) {
				var track = this.tracks[i];
				var target = sceneNodes[track.target];
				if (!target) continue;

				var value = track.evaluate(this._time, sceneNodes);
				if (value === null || value === undefined) continue;

				this._setProperty(target, track.property, value);
			}
		}

		// -----------------------------------------------------------------------
		// Property path resolver
		// -----------------------------------------------------------------------

		/**
		 * Set a property on a node using a dotted path.
		 * "alpha"          -> node.alpha = value
		 * "position.x"     -> node.position[0] = value
		 * "position.y"     -> node.position[1] = value
		 * "scale.x"        -> node.scale[0] = value
		 * "scale.y"        -> node.scale[1] = value
		 * "colorFilter.r"  -> node.colorFilter[0] = value
		 * "colorFilter.g"  -> node.colorFilter[1] = value
		 * "colorFilter.b"  -> node.colorFilter[2] = value
		 * "colorFilter.a"  -> node.colorFilter[3] = value
		 * "rotation"       -> node.rotation = value
		 * "zIndex"         -> node.zIndex = value
		 *
		 * @param {SceneNode} node
		 * @param {string} propPath - dotted property path
		 * @param {*} value
		 */
		_setProperty(node, propPath, value) {
			// Component name mappings for common vector properties
			var XY = { x: 0, y: 1 };
			var RGBA = { r: 0, g: 1, b: 2, a: 3, x: 0, y: 1, z: 2, w: 3 };

			var parts = propPath.split(".");
			var base = parts[0];

			if (parts.length === 1) {
				// Simple property
				node[base] = value;
				node.markDirty();
				return;
			}

			var comp = parts[1].toLowerCase();

			if (base === "position") {
				var idx = XY[comp];
				if (idx !== undefined && node.position) {
					node.position[idx] = value;
					node.markDirty();
				}
			} else if (base === "scale") {
				var idx2 = XY[comp];
				if (idx2 !== undefined && node.scale) {
					node.scale[idx2] = value;
					node.markDirty();
				}
			} else if (base === "colorFilter") {
				var idx3 = RGBA[comp];
				if (idx3 !== undefined && node.colorFilter) {
					node.colorFilter[idx3] = value;
					node.markDirty();
				}
			}
		}

		// -----------------------------------------------------------------------
		// Reset
		// -----------------------------------------------------------------------

		/**
		 * Reset the timeline to its initial state (time 0, stopped).
		 */
		reset() {
			this._state = "stopped";
			this._time = 0;
		}
	}

	// ---------------------------------------------------------------------------
	// Exports
	// ---------------------------------------------------------------------------

	window.KeyframeTrack = KeyframeTrack;
	window.Timeline = Timeline;
})();
