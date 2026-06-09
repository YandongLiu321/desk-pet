const ERROR_MESSAGES = {
	LLM_NETWORK: "星辰之间的通讯似乎被什么干扰了，稍等片刻再试试吧~",
	LLM_API:
		"旅者，你还没有设置与星辰通讯的密钥呢。请在 data/db.json 中配置 apiKey。",
	LLM_TIMEOUT: "星辰的回应比平时慢了一些…要再试一次吗？",
};

class ConversationPanel {
	/**
	 * @param {HTMLElement} container
	 * @param {{ position?: string, onSend?: (text: string) => void }} options
	 */
	constructor(container, options = {}) {
		this.container = container;
		this.position = options.position || "bottom";
		this.onSend = options.onSend || (() => {});
		this._messages = [];
	}

	mount() {
		this.container.innerHTML = "";
		this.container.style.flexDirection = "column";
		this.container.style.height = "100%";
		this.container.style.background = "var(--color-bg-dark)";
		this.container.style.borderRadius = "var(--radius-md)";
		this.container.style.overflow = "hidden";

		this._msgList = document.createElement("div");
		this._msgList.className = "conv-messages";
		this._msgList.style.cssText =
			"flex:1;overflow-y:auto;padding:var(--space-sm);";

		this._typingIndicator = document.createElement("div");
		this._typingIndicator.className = "conv-typing";
		this._typingIndicator.style.cssText =
			"padding:var(--space-xs) var(--space-sm);color:var(--color-text-muted);font-size:var(--font-sm);display:none;";
		this._typingIndicator.textContent = "露娜正在回应星辰...";

		const inputRow = document.createElement("div");
		inputRow.className = "conv-input-row";
		inputRow.style.cssText =
			"display:flex;padding:var(--space-sm);border-top:1px solid var(--color-bg-light);";

		this._input = document.createElement("input");
		this._input.className = "conv-input glass-input";
		this._input.type = "text";
		this._input.placeholder = "和露娜说点什么吧...";
		this._input.style.cssText = `flex:1;background:var(--color-bg-medium);border:none;color:var(--color-text-primary);padding:var(--space-sm);border-radius:var(--radius-sm);font-size:var(--font-sm);outline:none;`;
		this._input.addEventListener("keydown", (e) => {
			if (e.key === "Enter" && this._input.value.trim()) {
				const text = this._input.value.trim();
				this._input.value = "";
				this.addMessage("user", text);
				this.onSend(text);
			}
		});

		const sendBtn = document.createElement("button");
		sendBtn.className = "conv-send-btn";
		sendBtn.textContent = "发送";
		sendBtn.style.cssText = `margin-left:var(--space-xs);padding:var(--space-xs) var(--space-sm);background:var(--color-primary);color:white;border:none;border-radius:var(--radius-sm);cursor:pointer;font-size:var(--font-sm);`;
		sendBtn.addEventListener("click", () => {
			const text = this._input.value.trim();
			if (text) {
				this._input.value = "";
				this.addMessage("user", text);
				this.onSend(text);
			}
		});

		inputRow.appendChild(this._input);
		inputRow.appendChild(sendBtn);
		this.container.appendChild(this._msgList);
		this.container.appendChild(this._typingIndicator);
		this.container.appendChild(inputRow);
	}

	/**
	 * @param {'user'|'assistant'} role
	 * @param {string} content
	 */
	addMessage(role, content) {
		this._messages.push({ role, content });
		const msgEl = document.createElement("div");
		msgEl.className = `conv-msg conv-msg--${role}`;
		const isUser = role === "user";
		msgEl.style.cssText = `margin:var(--space-xs) 0;padding:var(--space-xs) var(--space-sm);border-radius:var(--radius-sm);max-width:85%;font-size:var(--font-sm);word-break:break-word;
      ${isUser ? "align-self:flex-end;background:var(--color-primary);margin-left:auto;" : "align-self:flex-start;background:var(--color-bg-medium);"}`;
		msgEl.textContent = content;
		this._msgList.appendChild(msgEl);
		this._msgList.scrollTop = this._msgList.scrollHeight;
	}

	createAssistantMessageElement() {
		const msgEl = document.createElement("div");
		msgEl.className = "conv-msg conv-msg--assistant";
		msgEl.style.cssText = "margin:var(--space-xs) 0;padding:var(--space-xs) var(--space-sm);border-radius:var(--radius-sm);max-width:85%;font-size:var(--font-sm);word-break:break-word;align-self:flex-start;background:var(--color-bg-tertiary, var(--color-bg-medium));";
		this._msgList.appendChild(msgEl);
		this._msgList.scrollTop = this._msgList.scrollHeight;
		return msgEl;
	}

	appendToLastMessage(role, text) {
		const msgs = this._msgList.querySelectorAll(`.conv-msg--${role}`);
		const last = msgs[msgs.length - 1];
		if (last) {
			last.textContent += text;
			this._msgList.scrollTop = this._msgList.scrollHeight;
		}
		return last;
	}

	showTyping() {
		if (this._typingIndicator) this._typingIndicator.style.display = "";
	}

	hideTyping() {
		if (this._typingIndicator) this._typingIndicator.style.display = "none";
	}

	/** @param {{ code: string, message: string }} err */
	showError(err) {
		const friendlyMsg =
			ERROR_MESSAGES[err.code] || "啊…好像出了点小问题。要不要先做点别的？";
		this.addMessage("assistant", friendlyMsg);
	}

	clear() {
		this._messages = [];
		if (this._msgList) this._msgList.innerHTML = "";
	}
}

window.ConversationPanel = ConversationPanel;
