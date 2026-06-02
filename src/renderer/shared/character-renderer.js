class CharacterRenderer {
	/**
	 * @param {HTMLElement} container
	 * @param {{ mode: string, size: number, assetType?: string }} options
	 */
	constructor(container, options = {}) {
		this.container = container;
		this.mode = options.mode || "pet";
		this.size = options.size || 120;
		this.assetType = options.assetType || "css";
		this._mounted = false;
	}

	mount() {
		if (this._mounted) return;
		this.container.innerHTML = "";

		if (this.assetType === "css") {
			this._renderCss();
		} else if (this.assetType === "image") {
			this._renderImage("smile");
		}
		this._mounted = true;
	}

	_renderCss() {
		const wrapper = document.createElement("div");
		wrapper.className = "character-wrapper";
		wrapper.style.cssText = `width:${this.size}px;height:${this.size}px;position:relative;animation:breathe 3s ease-in-out infinite;`;

		const svg = document.createElement("img");
		svg.src = "../../../assets/characters/default/icon.svg";
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

	/** @param {string} name */
	setExpression(name) {
		if (this.assetType === "image") {
			this.container.innerHTML = "";
			this._renderImage(name);
		}
	}

	/** @param {string} name */
	setMotion(name) {
		const wrapper = this.container.querySelector(".character-wrapper");
		if (wrapper) {
			wrapper.style.animation =
				name === "bounce"
					? "bounce 0.3s ease-out"
					: "breathe 3s ease-in-out infinite";
		}
	}

	destroy() {
		this.container.innerHTML = "";
		this._mounted = false;
	}
}

window.CharacterRenderer = CharacterRenderer;
