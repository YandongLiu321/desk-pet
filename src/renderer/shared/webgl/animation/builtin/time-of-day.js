(function () {
	"use strict";

	var Base = window.AnimationController;

	// ---------------------------------------------------------------------------
	// TimeOfDayController — detects time-of-day period and notifies node on change
	// ---------------------------------------------------------------------------

	/**
	 * Time of day periods:
	 *   "morning" - from morningTime to daytimeTime
	 *   "daytime" - from daytimeTime to sunsetTime
	 *   "sunset"  - from sunsetTime to nightTime
	 *   "night"   - from nightTime to morningTime (wraps around midnight)
	 */

	class TimeOfDayController extends Base {
		/**
		 * @param {Object} def
		 * @param {string} [def.morningTime="5:30"] - morning start (HH:MM)
		 * @param {string} [def.daytimeTime="7:30"] - daytime start
		 * @param {string} [def.sunsetTime="17:30"] - sunset start
		 * @param {string} [def.nightTime="19:00"] - night start
		 * @param {boolean} [def.enabled=true]
		 */
		constructor(def) {
			super(def);

			def = def || {};

			/** @type {number} morning start in minutes (0-1439) */
			this.morningMin = this._parseTime(def.morningTime || "5:30");

			/** @type {number} daytime start in minutes */
			this.daytimeMin = this._parseTime(def.daytimeTime || "7:30");

			/** @type {number} sunset start in minutes */
			this.sunsetMin = this._parseTime(def.sunsetTime || "17:30");

			/** @type {number} night start in minutes */
			this.nightMin = this._parseTime(def.nightTime || "19:00");

			/** @type {string|null} the last detected period */
			this._currentPeriod = null;
		}

		/**
		 * Parse a "HH:MM" string into total minutes (0-1439).
		 * @param {string} timeStr - e.g. "5:30", "17:30"
		 * @returns {number} minutes since midnight
		 */
		_parseTime(timeStr) {
			var parts = String(timeStr).split(":");
			var h = parseInt(parts[0], 10) || 0;
			var m = parseInt(parts[1], 10) || 0;
			return h * 60 + m;
		}

		/**
		 * Determine the time-of-day period from total minutes.
		 * Night wraps: nightTime <= minutes || minutes < morningTime
		 * @param {number} minutes - total minutes since midnight (0-1439)
		 * @returns {string} one of "morning", "daytime", "sunset", "night"
		 */
		_getPeriod(minutes) {
			// Check night first (wrap-around range)
			if (minutes >= this.nightMin || minutes < this.morningMin) {
				return "night";
			}
			if (minutes >= this.morningMin && minutes < this.daytimeMin) {
				return "morning";
			}
			if (minutes >= this.daytimeMin && minutes < this.sunsetMin) {
				return "daytime";
			}
			// minutes >= sunsetMin && minutes < nightMin
			return "sunset";
		}

		/**
		 * Check the current time of day. If the period has changed,
		 * call node._onTimeOfDayChange(period).
		 * @param {number} dt - delta time in seconds
		 * @param {SceneNode} node
		 */
		update(dt, node) {
			if (!this.enabled || !node) return;

			var now = new Date();
			var minutes = now.getHours() * 60 + now.getMinutes();
			var period = this._getPeriod(minutes);

			if (period !== this._currentPeriod) {
				this._currentPeriod = period;

				// Notify the node of the change
				if (typeof node._onTimeOfDayChange === "function") {
					node._onTimeOfDayChange(period);
				}
			}
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.AnimationController_TimeOfDayController = TimeOfDayController;
})();
