# 共享状态管理 (shared/stores/)

> Pinia stores，封装对主进程数据的访问，每个 store 管理一个数据域。

## 子任务

### conversationStore

- [ ] **sto-01** 创建 `conversationStore.js`，定义 state：messages[], isStreaming, currentChunk, error
- [ ] **sto-02** 实现 `sendMessage(text)` → 调 electronAPI.conversation.send() + 监听 chunk/done/error 事件
- [ ] **sto-03** 实现 `abortMessage()` → 调 electronAPI.conversation.abort()
- [ ] **sto-04** 实现 `loadHistory()` → 调 electronAPI.conversation.getHistory()
- [ ] **sto-05** 实现 `clearError()`

### taskStore

- [ ] **sto-06** 创建 `taskStore.js`，定义 state：tasks[], activeTasks[], selectedTask
- [ ] **sto-07** 实现 `fetchTasks(status?)` / `fetchTaskById(taskId)`
- [ ] **sto-08** 实现 `createTask(data)` / `toggleSubtask(taskId, subId)` / `completeTask(taskId)` / `deleteTask(taskId)`
- [ ] **sto-09** 实现 `selectTask(task)`

### characterStore

- [ ] **sto-10** 创建 `characterStore.js`，定义 state：character, relationship
- [ ] **sto-11** 实现 `fetchCharacter()` / `fetchRelationship()`

### appStore

- [ ] **sto-12** 创建 `appStore.js`，定义 state：currentMode, appState, isModeActivating
- [ ] **sto-13** 实现 `switchMode(mode)` → 调 electronAPI.app.switchMode()
- [ ] **sto-14** 实现 `fetchAppState()` → 调 electronAPI.app.getState()
- [ ] **sto-15** 实现 `onModeActivated(mode)` → 更新 currentMode + 触发相关 store 重新拉取数据

### pomodoroStore

- [ ] **sto-16** 创建 `pomodoroStore.js`，定义 state：remaining, total, isRunning, taskId
- [ ] **sto-17** 实现 `start(duration, taskId?)` → 调 electronAPI.pomodoro.start() + 监听 tick/end 事件
- [ ] **sto-18** 实现 `stop()` / `fetchStatus()`

### 工具

- [ ] **sto-19** 创建 `shared/utils/ipc.js`，提供类型化的 IPC 调用 wrapper（统一处理 `ok: false` 的错误分支）

### 测试

- [ ] **sto-20** 编写单元测试：mock electronAPI，验证每个 store 的 action 参数正确性和 state 变更
