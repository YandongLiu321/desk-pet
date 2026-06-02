class StateManager {
	/**
	 * @param {object} initialState
	 */
	constructor(initialState = {}) {
		this._state = { ...initialState };
		/** @type {Map<string, Set<Function>>} */
		this._subscribers = new Map();
	}

	/** @param {string} key */
	get(key) {
		return this._state[key];
	}

	getAll() {
		return { ...this._state };
	}

	/**
	 * @param {string|object} keyOrObj
	 * @param {*} [value]
	 */
	set(keyOrObj, value) {
		if (typeof keyOrObj === "object") {
			Object.assign(this._state, keyOrObj);
			for (const key of Object.keys(keyOrObj)) {
				this._notify(key);
			}
		} else {
			this._state[keyOrObj] = value;
			this._notify(keyOrObj);
		}
	}

	/**
	 * @param {string} key
	 * @param {(value: *) => void} callback
	 * @returns {() => void} unsubscribe function
	 */
	subscribe(key, callback) {
		if (!this._subscribers.has(key)) {
			this._subscribers.set(key, new Set());
		}
		this._subscribers.get(key).add(callback);
		return () => this._subscribers.get(key)?.delete(callback);
	}

	/** @param {string} key */
	_notify(key) {
		const subs = this._subscribers.get(key);
		if (subs) {
			for (const cb of subs) {
				try {
					cb(this._state[key]);
				} catch (e) {
					console.error(e);
				}
			}
		}
	}

	destroy() {
		this._subscribers.clear();
	}
}

window.StateManager = StateManager;
