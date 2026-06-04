(function () {
	"use strict";

	var M = window.WebGLMath;

	// ---------------------------------------------------------------------------
	// ParticleEmitter — GPU-driven particle emitter node
	// ---------------------------------------------------------------------------

	class ParticleEmitter extends window.SceneNode {
		/**
		 * @param {Object} def
		 * @param {string} def.name
		 * @param {number[]} [def.position] - [x, y]
		 * @param {number} [def.zIndex]
		 * @param {number} [def.maxParticles=500]
		 * @param {number} [def.emissionRate=2] - particles per second
		 * @param {number[]} [def.lifetime] - [min, max] in seconds, defaults to [3, 6]
		 * @param {number[]} [def.startSize] - [min, max]
		 * @param {number[]} [def.endSize] - [min, max]
		 * @param {Float32Array|number[]} [def.startColor] - vec4
		 * @param {Float32Array|number[]} [def.endColor] - vec4
		 * @param {number[]} [def.startSpeed] - [min, max]
		 * @param {number[]} [def.direction] - [min, max] in radians
		 * @param {number[]} [def.gravity] - [x, y]
		 * @param {string} [def.blendMode] - blend mode string
		 * @param {string} [def.texture] - texture URL
		 */
		constructor(def) {
			super(def.name);

			def = def || {};

			// Apply position from def if provided
			if (def.position && def.position.length >= 2) {
				M.vec2.set(this.position, def.position[0], def.position[1]);
			}

			if (def.zIndex !== undefined) {
				this.zIndex = def.zIndex;
			}

			if (def.alpha !== undefined) {
				this.alpha = def.alpha;
			}

			/** @type {number} */
			this._maxParticles = def.maxParticles !== undefined ? def.maxParticles : 500;

			/** @type {number} */
			this._emissionRate = def.emissionRate !== undefined ? def.emissionRate : 2;

			/** @type {number} */
			this._lifetimeMin = (def.lifetime && def.lifetime[0] !== undefined) ? def.lifetime[0] : 3;

			/** @type {number} */
			this._lifetimeMax = (def.lifetime && def.lifetime[1] !== undefined) ? def.lifetime[1] : 6;

			/** @type {number} */
			this._startSizeMin = (def.startSize && def.startSize[0] !== undefined) ? def.startSize[0] : 1;

			/** @type {number} */
			this._startSizeMax = (def.startSize && def.startSize[1] !== undefined) ? def.startSize[1] : 1;

			/** @type {number} */
			this._endSizeMin = (def.endSize && def.endSize[0] !== undefined) ? def.endSize[0] : 0;

			/** @type {number} */
			this._endSizeMax = (def.endSize && def.endSize[1] !== undefined) ? def.endSize[1] : 0;

			/** @type {Float32Array} */
			this._startColor = def.startColor
				? M.vec4.create(
					def.startColor[0] !== undefined ? def.startColor[0] : 1,
					def.startColor[1] !== undefined ? def.startColor[1] : 1,
					def.startColor[2] !== undefined ? def.startColor[2] : 1,
					def.startColor[3] !== undefined ? def.startColor[3] : 1
				)
				: M.vec4.create(1, 1, 1, 1);

			/** @type {Float32Array} */
			this._endColor = def.endColor
				? M.vec4.create(
					def.endColor[0] !== undefined ? def.endColor[0] : 1,
					def.endColor[1] !== undefined ? def.endColor[1] : 1,
					def.endColor[2] !== undefined ? def.endColor[2] : 1,
					def.endColor[3] !== undefined ? def.endColor[3] : 0
				)
				: M.vec4.create(1, 1, 1, 0);

			/** @type {number} */
			this._startSpeedMin = (def.startSpeed && def.startSpeed[0] !== undefined) ? def.startSpeed[0] : 0;

			/** @type {number} */
			this._startSpeedMax = (def.startSpeed && def.startSpeed[1] !== undefined) ? def.startSpeed[1] : 0;

			/** @type {number} */
			this._directionMin = (def.direction && def.direction[0] !== undefined) ? def.direction[0] : 0;

			/** @type {number} */
			this._directionMax = (def.direction && def.direction[1] !== undefined) ? def.direction[1] : 2 * Math.PI;

			/** @type {number} */
			this._gravityX = (def.gravity && def.gravity[0] !== undefined) ? def.gravity[0] : 0;

			/** @type {number} */
			this._gravityY = (def.gravity && def.gravity[1] !== undefined) ? def.gravity[1] : 0;

			/** @type {string} */
			this._blendMode = def.blendMode || "normal";

			/** @type {string} */
			this._texture = def.texture || "";

			/** @type {Object[]} live particle pool */
			this._particles = [];

			/** @type {number} spawn accumulator in seconds */
			this._spawnTimer = 0;
		}

		/**
		 * Manage spawn and kill: remove dead particles, then spawn new ones.
		 * Call once per frame.
		 * @param {number} dt - delta time in seconds
		 */
		updateEmitter(dt) {
			var now = performance.now() / 1000;

			// 1. Remove dead particles: those whose lifetime has elapsed
			//    (now - birthTime) >= lifetime
			this._particles = this._particles.filter(function (p) {
				return (now - p.birthTime) < p.lifetime;
			});

			// 2. Accumulate spawn timer
			this._spawnTimer += dt;

			// 3. Spawn while the timer has accumulated enough and we're under the cap
			var spawnInterval = 1 / this._emissionRate;
			while (
				this._spawnTimer >= spawnInterval &&
				this._particles.length < this._maxParticles
			) {
				this._spawnTimer -= spawnInterval;
				this._spawnOne(now);
			}
		}

		/**
		 * Build the per-frame instance data buffer for GPU rendering.
		 * Format: Float32Array of (aliveCount * 3) entries:
		 *   [posX, posY, lifetimeProgress] for each alive particle.
		 *
		 * Position is integrated on the CPU:
		 *   pos = startPos + velocity * elapsed + 0.5 * gravity * elapsed^2
		 *
		 * @returns {Float32Array}
		 */
		getInstanceData() {
			var count = this._particles.length;
			var data = new Float32Array(count * 3);
			var now = performance.now() / 1000;
			var gravX = this._gravityX;
			var gravY = this._gravityY;

			for (var i = 0; i < count; i++) {
				var p = this._particles[i];
				var elapsed = now - p.birthTime;
				var progress = elapsed / p.lifetime;

				// Clamp progress to [0, 1] to avoid out-of-range interpolation
				if (progress > 1) progress = 1;
				if (progress < 0) progress = 0;

				// Kinematic position: p = p0 + v*t + 0.5*g*t^2
				var halfT2 = 0.5 * elapsed * elapsed;
				var posX = p.posX + p.velX * elapsed + gravX * halfT2;
				var posY = p.posY + p.velY * elapsed + gravY * halfT2;

				var base = i * 3;
				data[base]     = posX;
				data[base + 1] = posY;
				data[base + 2] = progress;
			}

			return data;
		}

		/**
		 * Number of currently alive particles.
		 * @returns {number}
		 */
		get aliveCount() {
			return this._particles.length;
		}

		// -----------------------------------------------------------------------
		// Internal helpers
		// -----------------------------------------------------------------------

		/**
		 * Spawn a single particle at the emitter's current position.
		 * @param {number} now - current time in seconds (from performance.now() / 1000)
		 * @private
		 */
		_spawnOne(now) {
			// Pick a random direction angle within the configured range
			var angle = this._directionMin + Math.random() * (this._directionMax - this._directionMin);

			// Pick a random speed within the configured range
			var speed = this._startSpeedMin + Math.random() * (this._startSpeedMax - this._startSpeedMin);

			// Pick a random lifetime within the configured range
			var lifetime = this._lifetimeMin + Math.random() * (this._lifetimeMax - this._lifetimeMin);

			var particle = {
				posX: this.position[0],
				posY: this.position[1],
				velX: Math.cos(angle) * speed,
				velY: Math.sin(angle) * speed,
				birthTime: now,
				lifetime: lifetime,
				seed: Math.random()
			};

			this._particles.push(particle);
		}

		/**
		 * Recursively destroy this node and all resources.
		 */
		destroy() {
			this._particles = [];
			this._startColor = null;
			this._endColor = null;
			super.destroy();
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.ParticleEmitter = ParticleEmitter;
})();
