# 任务服务 (task-service.js)

> 封装任务业务逻辑——创建、AI 响应转化、结算、子任务管理。

## 子任务

### 基础结构

- [ ] **tsk-01** 实现 `constructor(db)`，接收 Database 实例
- [ ] **tsk-02** 实现任务 ID 生成规则（格式：`task_` + 时间戳 + 随机后缀）

### CRUD

- [ ] **tsk-03** 实现 `createTask(data)` → 自动生成 id、createdAt，调用 db.createTask() 返回 Task
  - data: { realTitle, rpgTitle, rpgDescription, estimatedPomodoros, estimatedMinutes, deadline, subtasks? }
- [ ] **tsk-04** 实现 `createFromAIResponse(payload)` → 校验必填字段 → 补全默认值 → createTask()
  - payload 格式见提案 5.3
  - 缺少 realTitle 时抛错，缺少 subtasks 时设为空数组
- [ ] **tsk-05** 实现 `getActiveTasks()` → 调用 db.getTasks({ status: 'active' })
- [ ] **tsk-06** 实现 `getAllTasks()` → 调用 db.getTasks()
- [ ] **tsk-07** 实现 `getTaskById(taskId)` → 调用 db.getTaskById()
- [ ] **tsk-08** 实现 `updateTask(taskId, partial)` → 调用 db.updateTask()
- [ ] **tsk-09** 实现 `toggleSubtask(taskId, subId)` → 调用 db.toggleSubtask()

### 任务结算

- [ ] **tsk-10** 实现 `completeTask(taskId)` → 检查所有子任务状态
  - 若全部 completed → db.completeTask() + 返回 `{ task, isFullyCompleted: true }`
  - 若有未完成 → 返回 `{ task, isFullyCompleted: false }`
  - 注意：不在此处生成叙事反馈，由调用方协调 NarrativeEngine
- [ ] **tsk-11** 实现 `deleteTask(taskId)` → 调用 db.deleteTask()

### 测试

- [ ] **tsk-12** 编写单元测试：CRUD 全路径 + 子任务全完成/未全完成的两条结算分支 + AI 响应字段校验
