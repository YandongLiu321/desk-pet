/** Motion name → MP4 video path */
const MOTION_VIDEOS = {
  smile: '../../../assets/characters/default/motions/微笑.mp4',
  talking: '../../../assets/characters/default/motions/说话.mp4',
  combat: '../../../assets/characters/default/motions/战力.mp4',
};

class CharacterRenderer {
	/**
	 * @param {HTMLElement} container
	 * @param {{ mode: string, size: number, assetType?: string, modelPath?: string }} options
	 */
	constructor(container, options = {}) {
		this.container = container;
		this.mode = options.mode || "pet";
		this.size = options.size || 120;
		this.assetType = options.assetType || "css";
		this.modelPath = options.modelPath || "../../../hiyori_free_zh/runtime/hiyori_free_t08.model3.json";
		this._mounted = false;
		this._live2dModel = null;
		this._live2dCanvas = null;
		this._videoEl = null;
		this._animFrameId = null;
	}

	mount() {
		if (this._mounted) return;
		this.container.innerHTML = "";

		if (this.assetType === "css") {
			this._renderCss();
		} else if (this.assetType === "image") {
			this._renderImage("smile");
		} else if (this.assetType === "live2d") {
			this._renderLive2D();
		}
		this._mounted = true;
	}

	_renderCss() {
		const wrapper = document.createElement("div");
		wrapper.className = "character-wrapper";
		wrapper.style.cssText = `width:${this.size}px;height:${this.size}px;position:relative;animation:breathe 3s ease-in-out infinite;`;

		const svg = document.createElement("img");
		svg.src = "../../../pet_temp.png";
		svg.alt = "柚子";
		svg.style.cssText = "width:100%;height:100%;object-fit:contain;";

		// eye blink overlay
		const blink = document.createElement("div");
		blink.className = "character-blink";
		blink.style.cssText =
			"position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;";
		blink.style.animation = "blink 4s ease-in-out infinite";

		wrapper.appendChild(svg);
		wrapper.appendChild(blink);
		this.container.appendChild(wrapper);
	}

	/** @param {string} expression */
	_renderImage(expression) {
		const img = document.createElement("img");
		img.src = `../../../assets/characters/default/expressions/${expression}.png`;
		img.alt = expression;
		img.style.cssText = "width:100%;height:100%;object-fit:contain;";
		this.container.appendChild(img);
	}

	_renderLive2D() {
		const res = Math.round(this.size * 2);
		const canvas = document.createElement("canvas");
		canvas.width = res;
		canvas.height = res;
		canvas.style.cssText = "width:100%;height:100%;";
		this.container.appendChild(canvas);
		this._live2dCanvas = canvas;

		const { Live2DCubismModel } = window.Live2DRenderer || {};
		if (!Live2DCubismModel) {
			console.error("Live2DRenderer not available");
			return;
		}

		const model = new Live2DCubismModel(canvas, {
			cubismCorePath: "../shared/live2dcubismcore.min.js",
			autoInteraction: true,
			tapInteraction: true,
			randomMotion: true,
			scale: 1.2,
			enablePhysics: true,
			enableEyeblink: true,
			enableBreath: true,
		});

		this._live2dModel = model;
		model.load(this.modelPath).catch((err) => {
			console.error("Live2D model load failed:", err);
		});
	}

	/** @param {string} name */
	setExpression(name) {
		if (this.assetType === "image") {
			this.container.innerHTML = "";
			this._renderImage(name);
		}
	}

	/** @param {string} name */
	setMotion(name) {
		if (this.assetType === "live2d" && this._live2dModel) {
			const motionMap = {
				happy:     { group: "Flick",     index: 0 },
				surprised: { group: "FlickDown", index: 0 },
				thinking:  { group: "Idle",      index: Math.floor(Math.random() * 3) },
				shy:       { group: "TapBody",   index: Math.floor(Math.random() * 3) },
				bounce:    { group: "Flick",     index: 0 },
			};
			const motion = motionMap[name];
			if (motion) {
				this._live2dModel.startMotion(motion.group, motion.index);
			}
			return;
		}
		// CSS fallback
		const wrapper = this.container.querySelector(".character-wrapper");
		if (wrapper) {
			wrapper.style.animation =
				name === "bounce"
					? "bounce 0.3s ease-out"
					: "breathe 3s ease-in-out infinite";
		}
	}

	/** @param {string} name */
	playMotion(name) {
		const videoPath = MOTION_VIDEOS[name];
		if (!videoPath) {
			this.setMotion(name);
			return;
		}

		if (this._videoEl) {
			this._videoEl.pause();
			this._videoEl.remove();
			this._videoEl = null;
		}
		if (this._animFrameId) {
			cancelAnimationFrame(this._animFrameId);
			this._animFrameId = null;
		}

		const existingContent = this.container.querySelector('.character-wrapper, img, canvas');
		if (existingContent) {
			existingContent.style.display = 'none';
		}

		const cs = window.getComputedStyle(this.container);
		if (cs.position === 'static') {
			this.container.style.position = 'relative';
		}

		const video = document.createElement('video');
		video.src = videoPath;
		video.muted = true;
		video.autoplay = true;
		video.playsInline = true;
		video.style.display = 'none';
		this._videoEl = video;
		this.container.appendChild(video);

		const canvas = document.createElement('canvas');
		canvas.className = 'motion-canvas';
		canvas.style.cssText =
			'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;z-index:10;';
		const ctx = canvas.getContext('2d');
		let canvasSizeSet = false;

		const CHROMA_THRESHOLD = 25;

		const drawFrame = () => {
			if (video.readyState < 2) {
				this._animFrameId = requestAnimationFrame(drawFrame);
				return;
			}

			if (!canvasSizeSet) {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				canvasSizeSet = true;
			}

			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const data = imageData.data;
			for (let i = 0; i < data.length; i += 4) {
				if (data[i] < CHROMA_THRESHOLD && data[i + 1] < CHROMA_THRESHOLD && data[i + 2] < CHROMA_THRESHOLD) {
					data[i + 3] = 0;
				}
			}
			ctx.putImageData(imageData, 0, 0);

			if (!video.paused && !video.ended) {
				this._animFrameId = requestAnimationFrame(drawFrame);
			}
		};

		video.addEventListener('playing', () => {
			this.container.appendChild(canvas);
			this._animFrameId = requestAnimationFrame(drawFrame);
		}, { once: true });

		const restore = () => {
			if (this._animFrameId) {
				cancelAnimationFrame(this._animFrameId);
				this._animFrameId = null;
			}
			video.remove();
			canvas.remove();
			this._videoEl = null;
			if (existingContent) {
				existingContent.style.display = '';
			}
		};

		video.addEventListener('ended', restore, { once: true });
		video.addEventListener('error', () => {
			restore();
			this.setMotion(name);
		}, { once: true });
	}

	destroy() {
		if (this._videoEl) {
			this._videoEl.pause();
			this._videoEl.remove();
			this._videoEl = null;
		}
		if (this._animFrameId) {
			cancelAnimationFrame(this._animFrameId);
			this._animFrameId = null;
		}
		if (this._live2dModel) {
			this._live2dModel = null;
		}
		this._live2dCanvas = null;
		this.container.innerHTML = "";
		this._mounted = false;
	}
}

window.CharacterRenderer = CharacterRenderer;
