# 任务服务 (task-service.js)

> 封装任务业务逻辑——创建、AI 响应转化、结算、子任务管理。

## 子任务

### 基础结构

- [ ] **tsk-01** 实现 `constructor({ db, worldBook })`，接收 Database 实例和世界书对象
- [ ] **tsk-02** 实现任务 ID 生成规则（格式：`task_` + 时间戳 + 随机后缀）

### CRUD

- [ ] **tsk-03** 实现 `createTask(data)` → 校验必填字段（至少 realTitle 不能为空）→ 自动生成 id、createdAt → 调用 db.createTask() 返回 Task
  - data: { realTitle, rpgTitle, rpgDescription, estimatedPomodoros, estimatedMinutes, deadline, subtasks?, milestoneId? }
- [ ] **tsk-04** 实现 `createFromAIResponse(payload)` → 校验必填字段 → 自动填充 `milestoneId` → 补全默认值 → createTask()
  - payload 格式见提案 5.3
  - 缺少 realTitle 时抛错，缺少 subtasks 时设为空数组
  - milestoneId 填充算法：
    1. 从 db 获取 `worldState.currentChapter`
    2. 从 `worldBook.storyChapters` 找到当前章节
    3. 遍历该章节的 `milestones`，取第一个 `progress < required` 的 milestone.id
    4. 若当前章节无未完成 milestone → `milestoneId = null`
- [ ] **tsk-05** 实现 `getActiveTasks()` → 调用 db.getTasks({ status: 'active' })
- [ ] **tsk-06** 实现 `getAllTasks()` → 调用 db.getTasks()
- [ ] **tsk-07** 实现 `getTaskById(taskId)` → 调用 db.getTaskById()
- [ ] **tsk-08** 实现 `updateTask(taskId, partial)` → 调用 db.updateTask()
- [ ] **tsk-09** 实现 `toggleSubtask(taskId, subId)` → 调用 db.toggleSubtask()

### 任务结算

- [ ] **tsk-10** 实现 `completeTask(taskId)` → 检查所有子任务状态
  - 若全部 completed → db.completeTask() + 关联章节 milestone 检查：
    - 若任务关联了当前章节 milestone → milestone.progress += 1
    - 若 milestone.progress >= milestone.required → 标记该 milestone 完成
    - 若全部 milestones 完成 → worldState.currentChapter += 1
    - 更新 worldState.variables（如 crystalIntegrity += 2）
    - 返回 `{ task, isFullyCompleted: true, milestoneProgress? }`
  - 若有未完成 → 返回 `{ task, isFullyCompleted: false }`
  - 注意：不在此处生成叙事反馈，由调用方协调 NarrativeEngine
- [ ] **tsk-11** 实现 `deleteTask(taskId)` → 调用 db.deleteTask()

### 测试

- [ ] **tsk-12** 编写单元测试：CRUD 全路径 + 子任务全完成/未全完成的两条结算分支 + AI 响应字段校验
