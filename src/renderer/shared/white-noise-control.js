class WhiteNoiseControl {
	/**
	 * @param {HTMLElement} container
	 * @param {{
	 *   tracks: Array<{id: string, name: string, url: string}>,
	 *   volume?: number,
	 *   currentTrackId?: string | null,
	 *   onTrackChange?: (trackId: string | null) => void,
	 *   onVolumeChange?: (volume: number) => void
	 * }} options
	 */
	constructor(container, options = {}) {
		this.container = container;
		this.tracks = options.tracks || [];
		this._volume = options.volume ?? 0.5;
		this._currentTrackId = options.currentTrackId || null;
		this.onTrackChange = options.onTrackChange || (() => {});
		this.onVolumeChange = options.onVolumeChange || (() => {});
		this._audio = null;
		this._trackSelect = null;
		this._volumeRow = null;
		this._volumeSlider = null;
	}

	mount() {
		this.container.innerHTML = "";
		this.container.style.cssText =
			"display:flex;flex-direction:column;align-items:center;gap:var(--space-sm);margin-top:var(--space-md);";

		// ── Track selector row ──
		const selectRow = document.createElement("div");
		selectRow.style.cssText =
			"display:flex;align-items:center;gap:var(--space-sm);";

		const label = document.createElement("span");
		label.textContent = "环境音";
		label.style.cssText =
			"font-size:var(--font-xs);color:var(--color-text-muted);white-space:nowrap;";

		this._trackSelect = document.createElement("select");
		this._trackSelect.style.cssText = [
			"background:var(--color-bg-medium)",
			"color:var(--color-text-primary)",
			"border:1px solid var(--color-bg-light)",
			"border-radius:var(--radius-sm)",
			"padding:var(--space-xs) var(--space-sm)",
			"font-size:var(--font-sm)",
			"cursor:pointer",
			"outline:none",
		].join(";");

		const noneOption = document.createElement("option");
		noneOption.value = "";
		noneOption.textContent = "无";
		this._trackSelect.appendChild(noneOption);

		for (const track of this.tracks) {
			const opt = document.createElement("option");
			opt.value = track.id;
			opt.textContent = track.name;
			if (track.id === this._currentTrackId) {
				opt.selected = true;
			}
			this._trackSelect.appendChild(opt);
		}

		this._trackSelect.addEventListener("change", () => {
			const trackId = this._trackSelect.value || null;
			this._currentTrackId = trackId;
			if (trackId) {
				const track = this.tracks.find((t) => t.id === trackId);
				if (track) this._play(track.url);
			} else {
				this._stopAudio();
			}
			this._updateVolumeVisibility();
			this.onTrackChange(trackId);
		});

		selectRow.appendChild(label);
		selectRow.appendChild(this._trackSelect);
		this.container.appendChild(selectRow);

		// ── Volume slider row ──
		this._volumeRow = document.createElement("div");
		this._volumeRow.style.cssText =
			"display:flex;align-items:center;gap:var(--space-sm);";

		const volLabel = document.createElement("span");
		volLabel.textContent = "音量";
		volLabel.style.cssText =
			"font-size:var(--font-xs);color:var(--color-text-muted);white-space:nowrap;";

		this._volumeSlider = document.createElement("input");
		this._volumeSlider.type = "range";
		this._volumeSlider.min = "0";
		this._volumeSlider.max = "100";
		this._volumeSlider.value = String(Math.round(this._volume * 100));
		this._volumeSlider.style.cssText = [
			"width:80px",
			"height:4px",
			"cursor:pointer",
			"accent-color:var(--color-primary)",
			"background:var(--color-bg-light)",
			"border-radius:2px",
			"outline:none",
			"appearance:none",
		].join(";");

		this._volumeSlider.addEventListener("input", () => {
			this._volume = Number(this._volumeSlider.value) / 100;
			if (this._audio) this._audio.volume = this._volume;
			this.onVolumeChange(this._volume);
		});

		this._volumeRow.appendChild(volLabel);
		this._volumeRow.appendChild(this._volumeSlider);
		this.container.appendChild(this._volumeRow);

		this._updateVolumeVisibility();
	}

	_updateVolumeVisibility() {
		if (this._volumeRow) {
			this._volumeRow.style.display = this._currentTrackId ? "" : "none";
		}
	}

	/** @param {string} url */
	_play(url) {
		this._stopAudio();
		this._audio = new Audio(url);
		this._audio.loop = true;
		this._audio.volume = this._volume;
		this._audio.play().catch(() => {
			this._stopAudio();
		});
	}

	_stopAudio() {
		if (this._audio) {
			this._audio.pause();
			this._audio.src = "";
			this._audio.load();
			this._audio = null;
		}
	}

	/** @param {number} volume 0-1 */
	setVolume(volume) {
		this._volume = Math.max(0, Math.min(1, volume));
		if (this._audio) this._audio.volume = this._volume;
		if (this._volumeSlider) {
			this._volumeSlider.value = String(Math.round(this._volume * 100));
		}
	}

	destroy() {
		this._stopAudio();
		this.container.innerHTML = "";
	}
}

window.WhiteNoiseControl = WhiteNoiseControl;
