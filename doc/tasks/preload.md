# Preload 脚本 (preload.js)

> 通过 `contextBridge` 向渲染进程暴露安全的最小 API 表面。渲染进程不能直接访问 Node.js 或 Electron API。

## 子任务

### 基础结构

- [ ] **pre-01** 定义 `ElectronAPI` 接口结构（conversation / task / app / pomodoro / settings / window 六组）
- [ ] **pre-02** 实现 `contextBridge.exposeInMainWorld('electronAPI', api)`

### 调用类 API（通过 ipcRenderer.invoke）

- [ ] **pre-03** 实现 `conversation.getHistory()` / `conversation.abort()`
- [ ] **pre-04** 实现 `task.*` 全部方法（getAll, getById, create, update, toggleSubtask, complete, delete）
- [ ] **pre-05** 实现 `app.*` 全部方法（switchMode, getState, getCharacter, getRelationship）
- [ ] **pre-06** 实现 `pomodoro.*` 全部方法（start, stop, getStatus）
- [ ] **pre-07** 实现 `settings.*` 全部方法（getApiKey, setApiKey, getWallpaper, updateWallpaper）
- [ ] **pre-08** 实现 `window.*` 全部方法（hide, closeMode）

### 事件类 API（通过 ipcRenderer.on）

- [ ] **pre-09** 实现 `conversation.send(message)` → invoke 触发流式 + 包装为 Promise
- [ ] **pre-10** 实现 `conversation.onChunk(cb)` / `onDone(cb)` / `onError(cb)` → 监听主进程推送
- [ ] **pre-11** 实现 `conversation.removeAllListeners()` → 清除流式事件监听
- [ ] **pre-12** 实现 `pomodoro.onTick(cb)` / `onEnd(cb)` / `removeAllListeners()`
- [ ] **pre-13** 实现 `app.onModeActivated(cb)` → 监听模式切换通知

### 验证

- [ ] **pre-14** 在渲染进程 console 中验证 `window.electronAPI` 可用，所有方法正常返回
