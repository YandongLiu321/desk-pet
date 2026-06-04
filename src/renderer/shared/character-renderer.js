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
		svg.alt = "露娜";
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
			if (name === "bounce") {
				this._live2dModel.startMotion("Flick", 0);
			}
			return;
		}
		const wrapper = this.container.querySelector(".character-wrapper");
		if (wrapper) {
			wrapper.style.animation =
				name === "bounce"
					? "bounce 0.3s ease-out"
					: "breathe 3s ease-in-out infinite";
		}
	}

	destroy() {
		if (this._live2dModel) {
			this._live2dModel = null;
		}
		this._live2dCanvas = null;
		this.container.innerHTML = "";
		this._mounted = false;
	}
}

window.CharacterRenderer = CharacterRenderer;
