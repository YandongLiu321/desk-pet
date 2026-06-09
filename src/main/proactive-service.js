const { desktopCapturer } = require("electron");

class ProactiveService {
  /**
   * @param {object} deps
   * @param {import('./database').Database} deps.db
   * @param {import('./llm-service').LLMService} deps.llmService
   * @param {(text: string) => void} deps.onTrigger
   */
  constructor({ db, llmService, onTrigger }) {
    this._db = db;
    this._llmService = llmService;
    this._onTrigger = onTrigger || (() => {});
    this._timer = null;
    this._lastTriggerAt = 0;
    this._lastInteractionAt = Date.now();
    this._lastScreenAnalysisAt = 0;
  }

  markInteraction() {
    this._lastInteractionAt = Date.now();
  }

  start() {
    this._timer = setInterval(() => this._check(), 60000);
  }

  stop() {
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
  }

  async _check() {
    const settings = this._db.getSettings();
    if (!settings.proactiveEnabled) return;

    const now = Date.now();
    const cooldown = settings.proactiveCooldownMs || 600000;
    if (now - this._lastTriggerAt < cooldown) return;

    // 1. Idle detection
    const idleMs = now - this._lastInteractionAt;
    const idleThreshold = (settings.proactiveIdleThresholdMin || 15) * 60000;
    if (idleMs > idleThreshold) {
      await this._sendGreeting();
      return;
    }

    // 2. Task deadline reminder
    const tasks = this._db.getTasks({ status: "active" });
    for (const task of tasks) {
      if (task.deadline) {
        const deadlineMs = new Date(task.deadline).getTime();
        const remaining = deadlineMs - now;
        if (remaining > 0 && remaining < 30 * 60000) {
          const mins = Math.round(remaining / 60000);
          this._onTrigger("提醒一下~ \"" + (task.rpgTitle || task.realTitle) + "\" 还有 " + mins + " 分钟就到截止时间了哦");
          this._lastTriggerAt = now;
          return;
        }
      }
    }

    // 3. Screen analysis
    if (settings.proactiveScreenAnalysis) {
      const screenCooldown = 600000;
      if (now - this._lastScreenAnalysisAt > screenCooldown) {
        this._lastScreenAnalysisAt = now;
        await this._analyzeScreen();
      }
    }
  }

  async _sendGreeting() {
    const now = Date.now();
    const hour = new Date().getHours();
    var timePrefix = "早上";
    if (hour >= 12 && hour < 18) timePrefix = "下午";
    else if (hour >= 18) timePrefix = "晚上";

    try {
      this._llmService.chat(
        { message: "现在时间是" + timePrefix + "，你已经有一段时间没和用户互动了。请用角色的口吻主动问候用户（20-30字），只输出问候文本，不要JSON。", enableTaskCreation: false },
        function() {},
        function(fullText) {
          this._onTrigger(fullText.trim());
          this._lastTriggerAt = Date.now();
        }.bind(this),
        function() { this._lastTriggerAt = Date.now(); }.bind(this)
      );
    } catch (e) {
      this._onTrigger(timePrefix + "好啊~ 记得休息一下哦");
      this._lastTriggerAt = Date.now();
    }
  }

  async _analyzeScreen() {
    try {
      const sources = await desktopCapturer.getSources({ types: ["screen"], thumbnailSize: { width: 640, height: 360 } });
      if (!sources.length) return;
      const dataUrl = sources[0].thumbnail.toDataURL();

      const apiKey = this._db.getApiKey();
      if (!apiKey) return;

      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "你是一个桌宠角色，正在看用户的屏幕。如果用户在认真工作/学习，你可以简短鼓励（10字以内）。如果用户在娱乐/摸鱼，你可以提醒。如果不需要说话，回复 SKIP。" },
            { role: "user", content: [{ type: "image_url", image_url: { url: dataUrl } }, { type: "text", text: "需要说话吗？" }] },
          ],
          max_tokens: 50,
        }),
      });
      const json = await response.json();
      const text = (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content || "").trim();
      if (text && text !== "SKIP") {
        this._onTrigger(text);
        this._lastTriggerAt = Date.now();
      }
    } catch (e) {
      // Silent fail for screen analysis
    }
  }
}

module.exports = { ProactiveService };
