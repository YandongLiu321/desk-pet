class ProactiveTrigger {
	constructor() {
		this._sources = [];
		this._callback = null;
		this._running = false;
		this._quietStart = null;
		this._quietEnd = null;
	}

	/** @param {string} name @param {Function} checker @param {number} intervalMs */
	registerSource(name, checker, intervalMs) {
		this._sources.push({ name, checker, intervalMs, timerId: null });
	}

	start() {
		this._running = true;
		// prototype stub — no actual scheduling
	}

	stop() {
		this._running = false;
		for (const source of this._sources) {
			if (source.timerId) clearInterval(source.timerId);
			source.timerId = null;
		}
	}

	/** @param {string} start @param {string} end */
	setQuietHours(start, end) {
		this._quietStart = start;
		this._quietEnd = end;
	}

	/** @param {(event: object) => void} callback */
	onTrigger(callback) {
		this._callback = callback;
	}
}

module.exports = { ProactiveTrigger };
