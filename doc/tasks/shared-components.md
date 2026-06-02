# 共享 JS 模块 (renderer/shared/)

> 三种模式共用的纯 JavaScript 模块（无前端框架）。每个模块导出构造函数，通过 `window` 挂载。

## 子任务

### CharacterRenderer

- [ ] **com-01** 创建 `character-renderer.js`：`constructor(container, { mode, size, assetType })`，`mount()` / `setExpression(name)` / `setMotion(name)` / `destroy()`
- [ ] **com-02** assetType='css'：渲染 SVG 图标 + CSS 呼吸动画 (scale 1.0↔1.05, 3s) + 眨眼动画 (每 4s)
- [ ] **com-03** assetType='image'：加载 `assets/characters/{charId}/expressions/{name}.png`
- [ ] **com-04** assetType='live2d'：预留 (原型不实现)
- [ ] **com-05** 各模式默认尺寸：pet 120px, wallpaper 200px, software 160px

### ConversationPanel

- [ ] **com-06** 创建 `conversation-panel.js`：`constructor(container, { position, onSend })`，`mount()` / `addMessage(role, content)` / `showTyping()` / `hideTyping()` / `showError(err)` / `clear()`
- [ ] **com-07** 消息列表渲染 + 自动滚动到底部
- [ ] **com-08** 输入框 + 发送按钮 + 回车发送
- [ ] **com-09** 流式消息实时更新（最后一条消息逐字追加）
- [ ] **com-10** 错误码映射角色化文案
- [ ] **com-11** position='bottom'（桌宠底部弹出）和 position='side'（壁纸侧边滑入）

### TaskPanel

- [ ] **com-12** 创建 `task-panel.js`：`constructor(container, { compact, onToggle, onViewDetail })`，`mount()` / `setTasks(tasks)` / `refresh()`
- [ ] **com-13** 任务卡片渲染：标题、子任务 checkbox、进度计数
- [ ] **com-14** compact 模式（桌宠迷你面板）与完整模式（软件模式）区分

### PomodoroTimer

- [ ] **com-15** 创建 `pomodoro-timer.js`：`constructor(container, { onStart, onStop })`，`update(remaining, total)` / `start()` / `stop()`
- [ ] **com-16** 圆形 SVG 进度环 + MM:SS 格式显示，最后一分钟变暖色

### 其他共享模块

- [ ] **com-17** `ipc-client.js`：IpcClient 类，封装 window.electronAPI 调用，统一错误处理
- [ ] **com-18** `dom-utils.js`：createElement, show/hide/toggle, addClass/removeClass
- [ ] **com-19** `state-manager.js`：createState(initial) → { get, set, subscribe }

### 测试

- [ ] **com-20** 编写各模块单元测试：mock 容器 DOM，验证渲染输出和事件回调
