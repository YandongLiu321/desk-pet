class TypewriterController {
  /**
   * @param {HTMLElement} element - 显示字幕的 DOM 元素
   * @param {object} [options]
   * @param {number} [options.speed] - 每字间隔 ms，默认 35
   * @param {string} [options.cursorChar] - 光标字符，默认 '▍'
   * @param {boolean} [options.showCursor] - 是否显示光标，默认 true
   * @param {Function} [options.onChar] - 每输出一个字时回调，用于 Live2D 嘴部同步
   */
  constructor(element, options = {}) {
    this._el = element;
    this._speed = options.speed || 35;
    this._cursorChar = options.cursorChar || '▍';
    this._showCursor = options.showCursor !== false;
    this._onChar = options.onChar || null;

    this._writeBuffer = '';
    this._displayLen = 0;
    this._timer = null;
    this._isFinalized = false;
    this._isComplete = false;

    this._cursorTimer = null;
    this._cursorVisible = true;
  }

  /** SSE 每来一个 chunk 就调用 */
  appendChunk(text) {
    this._writeBuffer += text;
    if (!this._timer) this._startTyping();
  }

  /** 流结束调用 */
  finalize() {
    this._isFinalized = true;
  }

  _startTyping() {
    if (this._timer) return;
    this._cursorVisible = true;
    this._startCursorBlink();
    this._timer = setInterval(() => this._tick(), this._speed);
  }

  _tick() {
    if (this._displayLen >= this._writeBuffer.length) {
      if (this._isFinalized) {
        this._onComplete();
      }
      return;
    }
    this._displayLen++;
    this._render();
    if (this._onChar) this._onChar();
  }

  _render() {
    const text = this._writeBuffer.slice(0, this._displayLen);
    this._el.textContent = text + (this._showCursor && this._cursorVisible ? this._cursorChar : '');
  }

  _startCursorBlink() {
    this._cursorTimer = setInterval(() => {
      this._cursorVisible = !this._cursorVisible;
      if (!this._isComplete) this._render();
    }, 530);
  }

  _onComplete() {
    this._isComplete = true;
    clearInterval(this._timer);
    this._timer = null;
    clearInterval(this._cursorTimer);
    this._cursorTimer = null;
    this._el.textContent = this._writeBuffer;
  }

  /** 强制完成，立即显示全部文本 */
  finishNow() {
    this._isFinalized = true;
    this._onComplete();
  }

  /** 重置为新消息 */
  reset() {
    this.finishNow();
    this._writeBuffer = '';
    this._displayLen = 0;
    this._isFinalized = false;
    this._isComplete = false;
    this._el.textContent = '';
  }

  get isTyping() {
    return !this._isComplete && this._writeBuffer.length > 0;
  }
}

window.TypewriterController = TypewriterController;
