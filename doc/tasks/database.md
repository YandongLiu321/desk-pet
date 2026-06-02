# 数据层 (database.js)

> 封装 lowdb 读写操作，所有数据访问的唯一入口。每个数据域提供专门的 getter/setter。

## 子任务

### 初始化

- [ ] **db-01** 实现 `constructor(filePath)`，加载 JSON 文件，自动初始化默认数据结构
- [ ] **db-02** 定义默认数据结构常量（AppState、空 tasks[]、空 conversations[]、character 默认值、relationship 默认值、worldState 默认值）
- [ ] **db-03** 实现 `write()` 内部方法，统一写入文件

### AppState 操作

- [ ] **db-04** 实现 `getAppState()` → 返回 appState 对象
- [ ] **db-05** 实现 `updateAppState(partial)` → 浅合并并写入

### Task CRUD

- [ ] **db-06** 实现 `getTasks(filter?)` → 按 status 过滤，返回 Task[]
- [ ] **db-07** 实现 `getTaskById(taskId)` → 返回 Task | undefined
- [ ] **db-08** 实现 `createTask(taskData)` → 自动生成 id、createdAt，返回 Task
- [ ] **db-09** 实现 `updateTask(taskId, partial)` → 浅合并，返回 Task
- [ ] **db-10** 实现 `deleteTask(taskId)` → 从数组中移除
- [ ] **db-11** 实现 `toggleSubtask(taskId, subId)` → 切换子任务 completed 状态
- [ ] **db-12** 实现 `completeTask(taskId)` → 设 status='completed'、completedAt=now

### Character & Relationship

- [ ] **db-13** 实现 `getCharacter()` / `updateCharacter(partial)`
- [ ] **db-14** 实现 `getRelationship()` / `updateRelationship(partial)`

### WorldState

- [ ] **db-15** 实现 `getWorldState()` / `updateWorldState(partial)`

### Conversation

- [ ] **db-16** 实现 `getActiveConversation()` → 无则自动创建
- [ ] **db-17** 实现 `addMessage(convId, message)` → 追加 { role, content } 并写入
- [ ] **db-18** 实现 `getRecentMessages(convId, limit)` → 返回最近 N 条

### Settings

- [ ] **db-19** 实现 `getApiKey()` / `setApiKey(key)` → 读写 appState.apiKey

### 测试

- [ ] **db-20** 编写 vitest 单元测试：CRUD 全部路径 + 默认值初始化 + 临时文件清理
