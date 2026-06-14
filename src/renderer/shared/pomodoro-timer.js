class PomodoroTimer {
	/**
	 * @param {HTMLElement} container
	 * @param {{ onStart?: () => void, onPause?: () => void, onResume?: () => void, onStop?: () => void }} options
	 */
	constructor(container, options = {}) {
		this.container = container;
		this.onStart = options.onStart || (() => {});
		this.onPause = options.onPause || (() => {});
		this.onResume = options.onResume || (() => {});
		this.onStop = options.onStop || (() => {});
		this._total = 0;
		this._remaining = 0;
		this._running = false;
		this._paused = false;
		this._editableMinutes = 25;
	}

	mount() {
		this.container.innerHTML = "";
		this.container.style.cssText =
			"display:flex;flex-direction:column;align-items:center;gap:var(--space-md);";

		// Ring wrapper — lets us center the time inside the SVG ring
		const ringWrapper = document.createElement("div");
		ringWrapper.style.cssText = "position:relative;width:120px;height:120px;";

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

		this._ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
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

		ringWrapper.appendChild(this._svg);

		// Time display — centered inside the SVG ring
		this._timeDisplay = document.createElement("div");
		this._timeDisplay.style.cssText =
			"position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:var(--font-xl);color:var(--color-text-primary);font-family:var(--font-mono);";
		this._timeDisplay.textContent = "25:00";
		ringWrapper.appendChild(this._timeDisplay);

		// Time editor (shown after task selection, hidden during countdown)
		this._timeEditor = document.createElement("div");
		this._timeEditor.style.cssText = "display:none;align-items:center;gap:var(--space-sm);";

		this._minusBtn = document.createElement("button");
		this._minusBtn.textContent = "−";
		this._minusBtn.style.cssText = "width:32px;height:32px;border-radius:50%;border:1px solid var(--color-bg-light);background:var(--color-bg-medium);color:var(--color-text-primary);cursor:pointer;font-size:var(--font-lg);line-height:1;display:flex;align-items:center;justify-content:center;flex-shrink:0;";
		this._minusBtn.addEventListener("click", () => {
			this._editableMinutes = Math.max(1, this._editableMinutes - 5);
			this._minutesInput.value = this._editableMinutes;
		});

		this._minutesInput = document.createElement("input");
		this._minutesInput.type = "number";
		this._minutesInput.min = 1;
		this._minutesInput.max = 480;
		this._minutesInput.step = 1;
		this._minutesInput.style.cssText = "width:56px;background:var(--color-bg-medium);border:1px solid var(--color-bg-light);border-radius:var(--radius-sm);color:var(--color-text-primary);font-size:var(--font-xl);text-align:center;font-family:var(--font-mono);padding:var(--space-xs);";
		this._minutesInput.addEventListener("input", () => {
			const val = parseInt(this._minutesInput.value, 10);
			if (!isNaN(val) && val > 0) {
				this._editableMinutes = Math.min(480, Math.max(1, val));
			}
		});

		this._plusBtn = document.createElement("button");
		this._plusBtn.textContent = "+";
		this._plusBtn.style.cssText = "width:32px;height:32px;border-radius:50%;border:1px solid var(--color-bg-light);background:var(--color-bg-medium);color:var(--color-text-primary);cursor:pointer;font-size:var(--font-lg);line-height:1;display:flex;align-items:center;justify-content:center;flex-shrink:0;";
		this._plusBtn.addEventListener("click", () => {
			this._editableMinutes = Math.min(480, this._editableMinutes + 5);
			this._minutesInput.value = this._editableMinutes;
		});

		this._unitLabel = document.createElement("span");
		this._unitLabel.textContent = "min";
		this._unitLabel.style.cssText = "font-size:var(--font-sm);color:var(--color-text-muted);";

		this._timeEditor.appendChild(this._minusBtn);
		this._timeEditor.appendChild(this._minutesInput);
		this._timeEditor.appendChild(this._plusBtn);
		this._timeEditor.appendChild(this._unitLabel);

		// Controls
		const controls = document.createElement("div");
		controls.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:var(--space-sm);";

		const row1 = document.createElement("div");
		row1.style.cssText = "display:flex;gap:var(--space-sm);";

		const btnStyle = `padding:var(--space-sm) var(--space-md);border:none;border-radius:var(--radius-sm);cursor:pointer;font-size:var(--font-base);`;

		this._startBtn = document.createElement("button");
		this._startBtn.textContent = "开始专注";
		this._startBtn.style.cssText = `${btnStyle}background:var(--color-primary);color:white;`;
		this._startBtn.addEventListener("click", () => this.onStart());

		this._pauseBtn = document.createElement("button");
		this._pauseBtn.textContent = "暂停";
		this._pauseBtn.style.cssText = `${btnStyle}background:var(--color-bg-light);color:var(--color-text-primary);display:none;`;
		this._pauseBtn.addEventListener("click", () => {
			if (this._paused) return;
			this._paused = true;
			this._running = false;
			this.showControls("paused");
			this.onPause();
		});

		this._resumeBtn = document.createElement("button");
		this._resumeBtn.textContent = "继续";
		this._resumeBtn.style.cssText = `${btnStyle}background:var(--color-primary);color:white;display:none;`;
		this._resumeBtn.addEventListener("click", () => {
			if (!this._paused) return;
			this._paused = false;
			this._running = true;
			this.showControls("running");
			this.onResume();
		});

		row1.appendChild(this._startBtn);
		row1.appendChild(this._pauseBtn);
		row1.appendChild(this._resumeBtn);
		controls.appendChild(row1);

		const row2 = document.createElement("div");
		this._stopBtn = document.createElement("button");
		this._stopBtn.textContent = "停止";
		this._stopBtn.style.cssText = `${btnStyle}background:var(--color-error, #d32f2f);color:white;display:none;`;
		this._stopBtn.addEventListener("click", () => this.onStop());
		row2.appendChild(this._stopBtn);
		controls.appendChild(row2);

		// Task label (hidden by default, shown when pomodoro is linked to a task)
		this._taskLabel = document.createElement("div");
		this._taskLabel.style.cssText = "font-size:var(--font-sm);color:var(--color-accent);text-align:center;display:none;";

		this.container.appendChild(ringWrapper);
		this.container.appendChild(this._taskLabel);
		this.container.appendChild(this._timeEditor);
		this.container.appendChild(controls);
	}

	showControls(state) {
		this._startBtn.style.display = state === "idle" ? "" : "none";
		this._pauseBtn.style.display = state === "running" ? "" : "none";
		this._resumeBtn.style.display = state === "paused" ? "" : "none";
		this._stopBtn.style.display = state === "paused" ? "" : "none";
	}

	_showEditor() {
		this._timeDisplay.style.display = "none";
		this._timeEditor.style.display = "flex";
	}

	_hideEditor() {
		this._timeDisplay.style.display = "flex";
		this._timeEditor.style.display = "none";
	}

	/** @param {number} minutes — AI-suggested duration, shown as editable */
	setEditableDuration(minutes) {
		this._editableMinutes = Math.min(480, Math.max(1, Math.round(minutes)));
		this._minutesInput.value = this._editableMinutes;
		this._showEditor();
		this.showControls("idle");
	}

	/** @returns {number} user-adjusted minutes (or default 25) */
	getCurrentMinutes() {
		return this._editableMinutes;
	}

	/** @param {number} remaining seconds */
	update(remaining) {
		this._remaining = remaining;
		const hours = Math.floor(remaining / 3600);
		const mins = Math.floor((remaining % 3600) / 60);
		const secs = remaining % 60;
		if (hours > 0) {
			this._timeDisplay.textContent = `${hours}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
		} else {
			this._timeDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
		}

		const circumference = 2 * Math.PI * 52;
		const offset = circumference * (1 - remaining / this._total);
		this._ring.setAttribute("stroke-dashoffset", String(offset));
	}

	start(totalSeconds) {
		this._total = totalSeconds;
		this._running = true;
		this._paused = false;
		this._hideEditor();
		this.update(totalSeconds);
		this.showControls("running");
	}

	stop() {
		this._running = false;
		this._paused = false;
		this._editableMinutes = 25;
		this._hideEditor();
		this._timeDisplay.textContent = "25:00";
		this._ring.setAttribute("stroke-dashoffset", "0");
		this.showControls("idle");
	}

	/** @param {string|null} title — task title to show, or null to hide */
	setTaskLabel(title) {
		if (!this._taskLabel) return;
		if (title) {
			this._taskLabel.textContent = `📋 ${title}`;
			this._taskLabel.style.display = "";
		} else {
			this._taskLabel.style.display = "none";
		}
	}

	/** @returns {number} seconds remaining */
	getRemaining() {
		return this._remaining;
	}
}

window.PomodoroTimer = PomodoroTimer;
