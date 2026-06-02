class PomodoroService {
	constructor() {
		this._timerId = null;
		this._remaining = null;
		this._totalSeconds = null;
		this._taskId = null;
		this._callbacks = null;
	}

	/**
	 * @param {number} durationMinutes
	 * @param {{ taskId?: string, onTick?: (remaining: number) => void, onEnd?: () => void, onCancel?: () => void }} options
	 * @returns {{ sessionId: string, totalSeconds: number }}
	 */
	start(durationMinutes, options = {}) {
		this.stop();
		this._totalSeconds = durationMinutes * 60;
		this._remaining = this._totalSeconds;
		this._taskId = options.taskId || null;
		this._callbacks = {
			onTick: options.onTick || (() => {}),
			onEnd: options.onEnd || (() => {}),
			onCancel: options.onCancel || (() => {}),
		};

		this._timerId = setInterval(() => {
			this._remaining--;
			this._callbacks.onTick(this._remaining);

			if (this._remaining <= 0) {
				this._callbacks.onEnd();
				this.stop(); // stop() no longer fires onCancel
			}
		}, 1000);

		return {
			sessionId: `pomo_${Date.now()}`,
			totalSeconds: this._totalSeconds,
		};
	}

	stop() {
		if (this._timerId) {
			clearInterval(this._timerId);
			this._timerId = null;
		}
		this._remaining = null;
		this._totalSeconds = null;
	}

	cancel() {
		if (this._timerId) {
			clearInterval(this._timerId);
			this._timerId = null;
			if (this._callbacks?.onCancel) this._callbacks.onCancel();
		}
		this._remaining = null;
		this._totalSeconds = null;
	}

	/** @returns {number | null} */
	getRemaining() {
		return this._remaining;
	}

	/** @returns {boolean} */
	isRunning() {
		return this._timerId !== null;
	}

	/** @returns {string | null} */
	getCurrentTaskId() {
		return this._taskId;
	}

	destroy() {
		this.stop();
		this._callbacks = null;
	}
}

module.exports = { PomodoroService };
