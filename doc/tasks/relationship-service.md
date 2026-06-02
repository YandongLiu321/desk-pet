# 关系服务 (relationship-service.js)

> 计算并更新用户与角色的关系阶段。阶段单向推进，阈值原型阶段硬编码。

## 子任务

### 基础结构

- [ ] **rel-01** 实现 `constructor(db)`，接收 Database 实例
- [ ] **rel-02** 定义硬编码阈值常量 `THRESHOLDS`
  - stranger→acquaintance: tasksCompleted >= 1
  - acquaintance→familiar: tasksCompleted >= 5, pomodoros >= 10
  - familiar→close: tasksCompleted >= 15, pomodoros >= 30, consecutiveDays >= 7
  - close→soulmate: tasksCompleted >= 30, pomodoros >= 60, consecutiveDays >= 30

### 核心方法

- [ ] **rel-03** 实现 `getCurrentStage()` → 从 db 读取并返回当前 stage 字符串
- [ ] **rel-04** 实现 `incrementStat(stat)` → 增加指定统计计数 + 写入 db
  - stat: 'tasksCompleted' | 'pomodoros' | 'conversations'
- [ ] **rel-05** 实现 `checkAndUpgrade()` → 比较 stats 与阈值
  - 达到下一阶段 → 更新 stage + 返回 `{ upgraded: true, from, to }`
  - 未达到 → 返回 `{ upgraded: false }`
  - 支持跨级跳跃（stats 可能一次满足多级阈值）
- [ ] **rel-06** 实现 `touchLastInteraction()` → 更新 lastInteractionAt 时间戳
- [ ] **rel-07** 实现 `updateConsecutiveDays()` → 按自然日计算：比较 `lastInteractionAt` 的日期与当前日期
  - 若 `lastInteractionAt` 是昨天 → `consecutiveDays += 1`
  - 若 `lastInteractionAt` 是今天 → 不变
  - 若 `lastInteractionAt` 是前天或更早 → 重置为 1（断了连续）
  - 若 `lastInteractionAt` 为空（首次） → 设为 1

### 测试

- [ ] **rel-08** 编写单元测试：各阈值边界、跨级跳跃、未达标不升级、单向不降级
