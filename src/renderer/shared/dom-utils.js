const DOMUtils = {
	/** @param {string} tag @param {object} [attrs] @param {(string|Node)[]} [children] */
	createElement(tag, attrs = {}, children = []) {
		const el = document.createElement(tag);
		for (const [key, value] of Object.entries(attrs)) {
			if (key === "className") {
				el.className = value;
			} else if (key.startsWith("on") && typeof value === "function") {
				el.addEventListener(key.slice(2).toLowerCase(), value);
			} else {
				el.setAttribute(key, String(value));
			}
		}
		for (const child of children) {
			if (typeof child === "string") {
				el.appendChild(document.createTextNode(child));
			} else if (child instanceof Node) {
				el.appendChild(child);
			}
		}
		return el;
	},

	show(el) {
		if (el) el.style.display = "";
	},
	hide(el) {
		if (el) el.style.display = "none";
	},
	toggle(el) {
		if (el) el.style.display = el.style.display === "none" ? "" : "none";
	},

	addClass(el, cls) {
		if (el) el.classList.add(cls);
	},
	removeClass(el, cls) {
		if (el) el.classList.remove(cls);
	},
	hasClass(el, cls) {
		return el ? el.classList.contains(cls) : false;
	},

	/** @param {string} html */
	htmlToElement(html) {
		const tpl = document.createElement("template");
		tpl.innerHTML = html.trim();
		return tpl.content.firstChild;
	},

	/** @param {string} selector */
	$(selector) {
		return document.querySelector(selector);
	},

	/** @param {string} selector */
	$$(selector) {
		return document.querySelectorAll(selector);
	},
};

window.DOMUtils = DOMUtils;
