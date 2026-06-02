# 番茄钟服务 (pomodoro-service.js)

> 管理番茄钟计时器。仅在壁纸模式存活的会话级计时，不持久化。使用 setInterval 每秒 tick。

## 子任务

### 基础结构

- [ ] **pom-01** 实现 `constructor()`，初始化内部状态（intervalId、remaining、total、isRunning、taskId、callbacks）
- [ ] **pom-02** 实现 `start(durationMinutes, options)` → 返回 `{ sessionId, totalSeconds }`
  - options: { taskId?, onTick(remaining), onEnd(), onCancel() }
  - 若已有运行的番茄钟，先清除旧 interval 再启动新的
  - 默认 durationMinutes = 25（从 worldbook 读取，原型阶段可硬编码）
- [ ] **pom-03** 实现 `stop()` → 清除 interval + 调用 onCancel 回调
- [ ] **pom-04** 实现 `getRemaining()` → 返回剩余秒数，无活跃番茄钟返回 null
- [ ] **pom-05** 实现 `isRunning()` → 返回 boolean
- [ ] **pom-06** 实现 `getCurrentTaskId()` → 返回关联的 taskId 或 null
- [ ] **pom-07** 实现 `destroy()` → 清除 interval，释放所有回调引用

### 内部逻辑

- [ ] **pom-08** setInterval 每 1000ms tick：remaining--，调用 onTick(remaining)
- [ ] **pom-09** remaining 归零时：清除 interval → 调用 onEnd()
- [ ] **pom-10** 生成唯一 sessionId（格式：`pomodoro_` + 时间戳）

### 测试

- [ ] **pom-11** 编写单元测试（vi.useFakeTimers）：tick 次数和参数、onEnd 触发、stop 后 interval 清除、多次 start 前一个被清除
