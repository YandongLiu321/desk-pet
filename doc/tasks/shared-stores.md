# 共享状态管理 (renderer/shared/)

> 无前端框架。每个渲染进程页面内联 `<script>` 维护本地状态对象，通过 `IpcClient`（封装 `window.electronAPI`）与主进程通信。`state-manager.js` 提供轻量发布订阅。

## 子任务

### state-manager.js

- [ ] **sto-01** 创建 `state-manager.js`：`createState(initial)` → `{ get, set, subscribe }`
- [ ] **sto-02** `subscribe(key, callback)` — 状态变化时自动调用回调
- [ ] **sto-03** `set(key, value)` — 更新状态并通知订阅者

### IpcClient 封装 (ipc-client.js)

- [ ] **sto-04** 创建 `ipc-client.js`：`IpcClient` 类，封装 `window.electronAPI` 所有方法
- [ ] **sto-05** 统一处理 `{ ok, data }` / `{ ok, error }` 响应
- [ ] **sto-06** 流式 API 提供 `onChunk/onDone/onError` 回调注册 + 取消订阅

### 各页面状态

- [ ] **sto-07** 桌宠模式 `index.html`：本地维护对话消息列表、任务列表、面板开关状态、穿透状态
- [ ] **sto-08** 壁纸模式 `index.html`：本地维护番茄钟状态、对话消息列表
- [ ] **sto-09** 软件模式 `index.html`：本地维护任务详情、世界地图状态、角色档案数据

### 数据流原则

- 页面启动 → IPC 拉取主进程最新数据 → 渲染 DOM
- 写操作 → IPC → 主进程 lowdb 更新 → 返回确认 → 更新本地 DOM
- 模式切换后新页面启动 → 重新从主进程拉取数据（无跨页面状态共享）
