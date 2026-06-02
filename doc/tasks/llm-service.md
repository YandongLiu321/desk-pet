# LLM 服务 (llm-service.js)

> 封装 DeepSeek API 调用，包括 System Prompt 组装、任务转化 Prompt、流式响应处理和错误重试。

## 子任务

### 基础结构

- [ ] **llm-01** 实现 `constructor(config)`，接收 `{ apiKey, db, worldBook }`
- [ ] **llm-02** 实现 `buildSystemPrompt(context)` 方法
  - 从 db 读取 character、relationship、recentMessages(20)
  - 从 worldBook 读取 world、currentChapter 信息
  - 按提案 5.2 模板填充返回完整 system prompt 字符串
  - 末尾追加任务转化指令（提案 5.3）

### API 调用

- [ ] **llm-03** 实现 `chat(options, onChunk, onDone, onError)` 核心方法
  - 调用 `buildSystemPrompt` 组装 messages
  - POST `https://api.deepseek.com/v1/chat/completions`
  - model: `deepseek-chat`, temperature: 0.8, max_tokens: 500, stream: true
- [ ] **llm-04** 实现流式 SSE 解析：逐 token 回调 `onChunk(chunk)`
- [ ] **llm-05** 流完成时回调 `onDone(fullText, metadata)`
  - 检测 AI 返回中是否包含 `intent: create_task` 的结构化 JSON
  - 有则 `metadata.intent = 'create_task'`, `metadata.taskPayload = {...}`
- [ ] **llm-06** 实现 `abort()` → 取消当前活跃的 fetch 请求

### 错误处理

- [ ] **llm-07** 网络错误 → 等待 1s → 重试一次 → 仍失败回调 `onError({ type: 'network', retried: true })`
- [ ] **llm-08** API 错误 (4xx/5xx) → 不重试，回调 `onError({ type: 'api', retried: false })`
- [ ] **llm-09** 响应解析错误 → 回调 `onError({ type: 'parse', retried: false })`

### 测试

- [ ] **llm-10** 编写单元测试：mock fetch，验证请求格式、重试逻辑、Prompt 拼接、流式回调
