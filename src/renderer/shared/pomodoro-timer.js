class PomodoroTimer {
	/**
	 * @param {HTMLElement} container
	 * @param {{ onStart?: () => void, onStop?: () => void }} options
	 */
	constructor(container, options = {}) {
		this.container = container;
		this.onStart = options.onStart || (() => {});
		this.onStop = options.onStop || (() => {});
		this._total = 0;
		this._remaining = 0;
		this._running = false;
	}

	mount() {
		this.container.innerHTML = "";
		this.container.style.cssText =
			"display:flex;flex-direction:column;align-items:center;gap:var(--space-md);";

		// SVG ring
		this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this._svg.setAttribute("viewBox", "0 0 120 120");
		this._svg.style.cssText =
			"width:120px;height:120px;transform:rotate(-90deg);";

		const bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		bg.setAttribute("cx", "60");
		bg.setAttribute("cy", "60");
		bg.setAttribute("r", "52");
		bg.setAttribute("fill", "none");
		bg.setAttribute("stroke", "var(--color-bg-light)");
		bg.setAttribute("stroke-width", "6");
		this._svg.appendChild(bg);

		this._ring = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle",
		);
		this._ring.setAttribute("cx", "60");
		this._ring.setAttribute("cy", "60");
		this._ring.setAttribute("r", "52");
		this._ring.setAttribute("fill", "none");
		this._ring.setAttribute("stroke", "var(--color-primary)");
		this._ring.setAttribute("stroke-width", "6");
		this._ring.setAttribute("stroke-linecap", "round");
		this._ring.setAttribute("stroke-dasharray", `${2 * Math.PI * 52}`);
		this._ring.setAttribute("stroke-dashoffset", "0");
		this._svg.appendChild(this._ring);

		// Time display
		this._timeDisplay = document.createElement("div");
		this._timeDisplay.style.cssText =
			"font-size:var(--font-2xl);color:var(--color-text-primary);font-family:var(--font-mono);";
		this._timeDisplay.textContent = "25:00";

		// Controls
		const controls = document.createElement("div");
		controls.style.cssText = "display:flex;gap:var(--space-sm);";

		this._startBtn = document.createElement("button");
		this._startBtn.textContent = "开始专注";
		this._startBtn.style.cssText = `padding:var(--space-sm) var(--space-md);background:var(--color-primary);color:white;border:none;border-radius:var(--radius-sm);cursor:pointer;font-size:var(--font-base);`;
		this._startBtn.addEventListener("click", () => this.onStart());

		this._stopBtn = document.createElement("button");
		this._stopBtn.textContent = "停止";
		this._stopBtn.style.cssText = `padding:var(--space-sm) var(--space-md);background:var(--color-bg-light);color:var(--color-text-primary);border:none;border-radius:var(--radius-sm);cursor:pointer;font-size:var(--font-base);display:none;`;
		this._stopBtn.addEventListener("click", () => this.onStop());

		controls.appendChild(this._startBtn);
		controls.appendChild(this._stopBtn);

		this.container.appendChild(this._svg);
		this.container.appendChild(this._timeDisplay);
		this.container.appendChild(controls);
	}

	/** @param {number} remaining seconds */
	update(remaining) {
		this._remaining = remaining;
		const mins = Math.floor(remaining / 60);
		const secs = remaining % 60;
		this._timeDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

		const circumference = 2 * Math.PI * 52;
		const offset = circumference * (1 - remaining / this._total);
		this._ring.setAttribute("stroke-dashoffset", String(offset));
	}

	start(totalSeconds) {
		this._total = totalSeconds;
		this._running = true;
		this.update(totalSeconds);
		this._startBtn.style.display = "none";
		this._stopBtn.style.display = "";
	}

	stop() {
		this._running = false;
		this._timeDisplay.textContent = "25:00";
		this._ring.setAttribute("stroke-dashoffset", "0");
		this._startBtn.style.display = "";
		this._stopBtn.style.display = "none";
	}
}

window.PomodoroTimer = PomodoroTimer;
