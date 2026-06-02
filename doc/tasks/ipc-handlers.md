# IPC 路由 (ipc-handlers.js)

> 注册所有 `ipcMain.handle()` 通道，将请求路由到对应服务模块。主进程与渲染进程之间的唯一通信入口。
> **约束**：所有 IPC 通道名必须通过 `require('../../shared/constants')` 引用，禁止裸写 channel 字符串。

## 子任务

### 基础结构

- [ ] **ipc-01** 实现 `constructor(deps)`，接收所有服务依赖
- [ ] **ipc-02** 实现 `registerAll()` → 注册全部 IPC 通道
- [ ] **ipc-03** 定义统一响应格式：成功 `{ ok: true, data }` / 失败 `{ ok: false, error: { code, message } }`
- [ ] **ipc-04** 实现通用错误包装器：handler 内 catch 异常 → 返回 INTERNAL 错误
- [ ] **ipc-04b** 所有 IPC 通道名从 `src/shared/constants.js` 导入，不裸写字符串

### 对话通道

- [ ] **ipc-05** `conversation:send` → 流式对话的特殊处理
  - 渲染进程 invoke 触发 → 调用 llmService.chat()
  - 通过 `webContents.send('conversation:chunk', ...)` 逐块推送
  - 完成后 `webContents.send('conversation:done', ...)`
  - 错误时 `webContents.send('conversation:error', ...)`
- [ ] **ipc-06** `conversation:get-history` → db.getActiveConversation() + getRecentMessages()
- [ ] **ipc-07** `conversation:abort` → llmService.abort()

### 任务通道

- [ ] **ipc-08** `task:get-all` → taskService.getActiveTasks()/getAllTasks()
- [ ] **ipc-09** `task:get-by-id` → taskService.getTaskById()
- [ ] **ipc-10** `task:create` → 参数校验（必填 realTitle）→ taskService.createTask()
- [ ] **ipc-11** `task:update` → taskService.updateTask()
- [ ] **ipc-12** `task:toggle-subtask` → taskService.toggleSubtask()
- [ ] **ipc-13** `task:complete` → taskService.completeTask() + narrativeEngine.generateFeedback() + relationshipService.incrementStat()
- [ ] **ipc-14** `task:delete` → taskService.deleteTask()

### 应用/模式通道

- [ ] **ipc-15** `app:switch-mode` → llmService.abort() + 若番茄钟运行中则 pomodoroService.stop()（退出询问由壁纸渲染进程自行处理，主进程不拦截）+ windowManager.switchMode() + 通知目标窗口 `mode:activated`
- [ ] **ipc-16** `app:get-state` → db.getAppState()
- [ ] **ipc-17** `app:get-character` → db.getCharacter()
- [ ] **ipc-18** `app:get-relationship` → db.getRelationship()

### 番茄钟通道

- [ ] **ipc-19** `pomodoro:start` → pomodoroService.start() + 注册 tick/end 回调（webContents.send 推给渲染进程）
- [ ] **ipc-20** `pomodoro:stop` → pomodoroService.stop()
- [ ] **ipc-21** `pomodoro:get-status` → pomodoroService.getRemaining() + isRunning() + getCurrentTaskId()

### 设置通道

- [ ] **ipc-22** `settings:get-api-key` → db.getApiKey()
- [ ] **ipc-23** `settings:set-api-key` → db.setApiKey()
- [ ] **ipc-24** `settings:get-wallpaper` → db.getAppState().wallpaperSettings
- [ ] **ipc-25** `settings:update-wallpaper` → db.updateAppState({ wallpaperSettings: ... })

### 窗口通道

- [ ] **ipc-26** `window:hide` → currentWindow.minimize()
- [ ] **ipc-27** `window:close-mode` → llmService.abort() + 若番茄钟运行中则 pomodoroService.stop() + windowManager.switchMode('pet')（退出询问由壁纸渲染进程自行处理，主进程不拦截）

### 测试

- [ ] **ipc-28** 编写单元测试：每个 handler 参数校验 + 服务调用路由 + 错误响应 + INTERNAL 错误不崩溃
