# 空壳模块

> 原型阶段仅定义接口，不实现实际逻辑。为后续扩展预留代码接口。

## 子任务

### ProactiveTrigger (proactive-trigger.js)

- [ ] **shl-01** 创建 `src/main/proactive-trigger.js`，定义 `ProactiveTrigger` 类
- [ ] **shl-02** 实现空方法：
  - `registerSource(name, checker, intervalMs)` — 空
  - `start()` — 空
  - `stop()` — 空
  - `setQuietHours(start, end)` — 空
  - `onTrigger(callback)` — 空

### UserStyleAnalyzer (user-style-analyzer.js)

- [ ] **shl-03** 创建 `src/main/user-style-analyzer.js`，定义 `UserStyleAnalyzer` 类
- [ ] **shl-04** 实现 `analyze(messages)` → `return {}`（原型阶段返回空对象）
- [ ] **shl-05** 预留 `async analyze(messages)` 返回结构注释（emojiFrequency, avgSentenceLength, commonPhrases, formalityLevel, preferredPunctuation, lastUpdated）

### 验证

- [ ] **shl-06** 两个模块可正常 import，main.js 中注入不报错
