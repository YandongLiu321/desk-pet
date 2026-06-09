class MemoryService {
  /**
   * @param {object} deps
   * @param {import('./database').Database} deps.db
   * @param {import('./llm-service').LLMService} deps.llmService
   */
  constructor({ db, llmService }) {
    this._db = db;
    this._llmService = llmService;
  }

  shouldSummarize(conversationId) {
    const conv = this._db.getActiveConversation();
    if (!conv || conv.messages.length < 8) return false;
    const memories = this._db.getMemories().filter(function(m) { return m.sourceConversationId === conversationId; });
    if (!memories.length) return true;
    var maxCovered = Math.max.apply(null, memories.map(function(m) { return m.messageRange[1]; }));
    return conv.messages.length > maxCovered + 4;
  }

  async summarizeRecent(conversationId) {
    var self = this;
    var conv = this._db.getActiveConversation();
    var memories = this._db.getMemories().filter(function(m) { return m.sourceConversationId === conversationId; });
    var startIdx = memories.length
      ? Math.max.apply(null, memories.map(function(m) { return m.messageRange[1]; }))
      : 0;
    var recentMsgs = conv.messages.slice(startIdx, startIdx + 16);
    if (recentMsgs.length < 4) return null;

    var dialogue = recentMsgs.map(function(m) { return m.role + ": " + m.content; }).join("\n");

    return new Promise(function(resolve) {
      self._llmService.chat(
        {
          message: "总结以下对话中用户的关键信息和偏好。输出格式：{\"summary\":\"一句话总结\",\"keywords\":[\"关键词1\",\"关键词2\",\"关键词3\"]}\n\n对话：\n" + dialogue,
          enableTaskCreation: false,
        },
        function() {},
        function(fullText) {
          try {
            var json = JSON.parse(fullText.trim());
            resolve({ summary: json.summary || "", keywords: json.keywords || [] });
          } catch (e) {
            resolve({ summary: fullText.trim().slice(0, 200), keywords: [] });
          }
        },
        function() { resolve(null); }
      );
    });
  }

  getRelevantMemories(query, limit) {
    limit = limit || 5;
    var memories = this._db.getMemories();
    var queryWords = query.split(/[\s,，。！？、\n]+/).filter(function(w) { return w.length > 1; });
    if (!queryWords.length) return memories.slice(-limit);

    var scored = memories.map(function(m) {
      var matchCount = m.keywords.filter(function(kw) {
        return queryWords.some(function(qw) { return kw.includes(qw) || qw.includes(kw); });
      }).length;
      return { memory: m, score: matchCount };
    });

    return scored
      .filter(function(s) { return s.score > 0; })
      .sort(function(a, b) { return b.score - a.score; })
      .slice(0, limit)
      .map(function(s) { return s.memory; });
  }

  formatMemoriesForPrompt(memories) {
    if (!memories.length) return "";
    return "\n\n[相关的历史记忆]\n" +
      memories.map(function(m) { return "- " + m.createdAt.slice(0, 10) + ": " + m.summary; }).join("\n");
  }
}

module.exports = { MemoryService };
