(function () {
	"use strict";

	var Base = window.AnimationController;

	// ---------------------------------------------------------------------------
	// ClockController — real-time clock that updates node.text with formatted time
	// ---------------------------------------------------------------------------

	// Weekday names by language
	var WEEKDAYS = {
		en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		zh: [
			"星期日", // Sunday
			"星期一", // Monday
			"星期二", // Tuesday
			"星期三", // Wednesday
			"星期四", // Thursday
			"星期五", // Friday
			"星期六", // Saturday
		],
		ja: [
			"日曜日", // Sunday
			"月曜日", // Monday
			"火曜日", // Tuesday
			"水曜日", // Wednesday
			"木曜日", // Thursday
			"金曜日", // Friday
			"土曜日", // Saturday
		],
	};

	// AM/PM period names by language
	var PERIODS = {
		en: { am: "AM", pm: "PM" },
		zh: { am: "上午", pm: "下午" }, // 上午, 下午
		ja: { am: "午前", pm: "午後" }, // 午前, 午後
	};

	class ClockController extends Base {
		/**
		 * @param {Object} def
		 * @param {string} [def.format="HH:mm"] - format string with tokens
		 *   yyyy  - full year (e.g. 2026)
		 *   yy    - 2-digit year (e.g. 26)
		 *   MM    - month (01-12)
		 *   dd    - day (01-31)
		 *   HH    - hour 24h (00-23)
		 *   hh    - hour 12h (01-12)
		 *   mm    - minute (00-59)
		 *   ss    - second (00-59)
		 *   [W]   - weekday name
		 *   [P]   - AM/PM period
		 *   JM    - Japanese morning hour (0-11)
		 *   Jd    - Japanese daytime hour (0-5, offset from noon)
		 *   JH    - Japanese evening hour (0-5, offset from 6pm)
		 *   [JW]  - Japanese weekday name
		 *   \\n   - newline
		 * @param {string} [def.language="en"] - "en", "zh", "ja", or "custom"
		 * @param {string[]} [def.customWeekdays] - custom weekday names [Sun..Sat]
		 * @param {string[]} [def.customHours] - custom hour labels (not used directly here)
		 * @param {boolean} [def.enabled=true]
		 */
		constructor(def) {
			super(def);

			def = def || {};

			/** @type {string} */
			this.format = def.format || "HH:mm";

			/** @type {string} */
			this.language = def.language || "en";

			/** @type {string[]|null} */
			this.customWeekdays = def.customWeekdays || null;

			/** @type {string[]|null} */
			this.customHours = def.customHours || null;
		}

		/**
		 * Pad a number to at least 2 digits.
		 * @param {number} n
		 * @returns {string}
		 */
		_pad(n) {
			return n < 10 ? "0" + n : String(n);
		}

		/**
		 * Get the weekday name for a given day index.
		 * @param {number} day - 0=Sun, 6=Sat
		 * @param {boolean} [japanese=false]
		 * @returns {string}
		 */
		_getWeekday(day, japanese) {
			if (this.language === "custom" && this.customWeekdays && this.customWeekdays[day]) {
				return this.customWeekdays[day];
			}
			var lang = japanese ? "ja" : this.language;
			if (WEEKDAYS[lang]) {
				return WEEKDAYS[lang][day];
			}
			return WEEKDAYS.en[day] || "";
		}

		/**
		 * Get the AM/PM period name.
		 * @param {boolean} isPM
		 * @returns {string}
		 */
		_getPeriod(isPM) {
			var lang = this.language;
			if (lang !== "en" && lang !== "zh" && lang !== "ja") {
				lang = "en";
			}
			var p = PERIODS[lang];
			return isPM ? p.pm : p.am;
		}

		/**
		 * Format a Date object into the configured format string.
		 * @param {Date} date
		 * @returns {string}
		 */
		_formatTime(date) {
			var fmt = this.format;
			if (!fmt) return "";

			// Build a regex to match tokens: multi-char tokens first, then single tokens
			// Tokens: yyyy, yy, MM, dd, HH, hh, mm, ss, JM, Jd, JH, [W], [P], [JW], \n
			var result = "";
			var i = 0;

			while (i < fmt.length) {
				// Check for backslash-escaped newline
				if (fmt[i] === "\\" && i + 1 < fmt.length && fmt[i + 1] === "n") {
					result += "\n";
					i += 2;
					continue;
				}

				// Check for bracket tokens: [W], [P], [JW]
				if (fmt[i] === "[" && i + 2 < fmt.length && fmt[i + 2] === "]") {
					var bracketToken = fmt.substring(i + 1, i + 2);
					if (bracketToken === "W") {
						result += this._getWeekday(date.getDay(), false);
						i += 3;
						continue;
					}
					if (bracketToken === "P") {
						result += this._getPeriod(date.getHours() >= 12);
						i += 3;
						continue;
					}
					result += fmt[i]; // unknown bracket, pass through
					i++;
					continue;
				}

				// Check for [JW] (3-char bracket)
				if (fmt[i] === "[" && i + 3 < fmt.length && fmt.substring(i + 1, i + 3) === "JW" && fmt[i + 3] === "]") {
					result += this._getWeekday(date.getDay(), true);
					i += 4;
					continue;
				}

				// 4-char tokens
				if (i + 3 < fmt.length && fmt.substring(i, i + 4) === "yyyy") {
					result += String(date.getFullYear());
					i += 4;
					continue;
				}

				// 2-char tokens
				if (i + 1 < fmt.length) {
					var two = fmt.substring(i, i + 2);

					if (two === "yy") {
						result += this._pad(date.getFullYear() % 100);
						i += 2;
						continue;
					}
					if (two === "MM") {
						result += this._pad(date.getMonth() + 1);
						i += 2;
						continue;
					}
					if (two === "dd") {
						result += this._pad(date.getDate());
						i += 2;
						continue;
					}
					if (two === "HH") {
						result += this._pad(date.getHours());
						i += 2;
						continue;
					}
					if (two === "hh") {
						var h12 = date.getHours() % 12;
						if (h12 === 0) h12 = 12;
						result += this._pad(h12);
						i += 2;
						continue;
					}
					if (two === "mm") {
						result += this._pad(date.getMinutes());
						i += 2;
						continue;
					}
					if (two === "ss") {
						result += this._pad(date.getSeconds());
						i += 2;
						continue;
					}
					if (two === "JM") {
						// Japanese morning hour: 0-11
						var h = date.getHours();
						var jm = h < 12 ? h : 0;
						result += this._pad(jm);
						i += 2;
						continue;
					}
					if (two === "Jd") {
						// Japanese daytime hour: offset from noon (0-5)
						var hd = date.getHours();
						var jd = (hd >= 12 && hd < 18) ? hd - 12 : 0;
						result += this._pad(jd);
						i += 2;
						continue;
					}
					if (two === "JH") {
						// Japanese evening/hour continuation: offset from 6pm (0-5)
						var hev = date.getHours();
						var jh = (hev >= 18) ? hev - 18 : 0;
						result += this._pad(jh);
						i += 2;
						continue;
					}
				}

				// Literal character
				result += fmt[i];
				i++;
			}

			return result;
		}

		/**
		 * Update the clock display on the node.
		 * Sets node.text to the formatted current time.
		 * @param {number} dt - delta time in seconds
		 * @param {SceneNode} node
		 */
		update(dt, node) {
			if (!this.enabled || !node) return;

			node.text = this._formatTime(new Date());
		}
	}

	// ---------------------------------------------------------------------------
	// Export
	// ---------------------------------------------------------------------------

	window.AnimationController_ClockController = ClockController;
})();
