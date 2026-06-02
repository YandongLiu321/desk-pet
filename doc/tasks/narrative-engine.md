# 叙事引擎 (narrative-engine.js)

> 根据任务完成情况生成叙事反馈文本。原型阶段仅处理 `on_time` 路径，通过 LLM 动态生成。

## 子任务

### 基础结构

- [ ] **nar-01** 实现 `constructor(llmService)`，接收 LLMService 实例
- [ ] **nar-02** 实现 `buildSettlementPrompt(task)` → 返回叙事 Prompt 字符串
  - 包含：任务 RPG 描述、角色信息、世界状态、完成类型
  - 引导 LLM 生成 50-100 字的叙事反馈

### 核心方法

- [ ] **nar-03** 实现 `generateFeedback(task, completionType)` → 返回 `{ narrative, worldStateChanges? }`
  - 原型阶段 completionType 固定为 `'on_time'`
  - 调用 `buildSettlementPrompt` → llmService.chat() → 解析返回
  - 提取叙事文本和可能的世界状态变更
  - 流式场景中不适用流式，使用非流式调用获取完整叙事文本

### 测试

- [ ] **nar-04** 编写单元测试：mock LLMService，验证 buildSettlementPrompt 输出格式 + generateFeedback 参数传递
