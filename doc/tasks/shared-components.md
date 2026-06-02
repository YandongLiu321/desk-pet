# 共享组件 (shared/components/)

> 三种模式共用的 Vue 组件。所有组件通过 props 接收数据、通过 emits 发出事件，不直接依赖 store。

## 子任务

### CharacterRenderer

- [ ] **com-01** 创建 `CharacterRenderer.vue`，定义 props：modelType, characterId, mode, expression, motion, size
- [ ] **com-02** 创建 `CharacterIcon.vue` 子组件：渲染 SVGCircle + 呼吸动画 + 眨眼动画
  - 圆形银发角色头像（CSS 绘制的简单人物图标）
  - 呼吸动画 (scale 1.0 ↔ 1.05, 3s)
  - 眨眼动画 (每 4s 一次)
- [ ] **com-03** CharacterRenderer 根据 `modelType` 切换渲染：`'icon'` → CharacterIcon, `'live2d'` → canvas placeholder
- [ ] **com-04** 各模式默认尺寸：pet 120px, wallpaper 200px, software 160px

### ConversationPanel

- [ ] **com-05** 创建 `ConversationPanel.vue`，定义 props：messages, isStreaming, position, placeholder
  - emits: send, abort
- [ ] **com-06** 实现消息列表渲染 + 自动滚动到底部
- [ ] **com-07** 实现流式消息实时更新（最后一条消息逐字显示）
- [ ] **com-08** 实现输入框 + 发送按钮 + 回车发送
- [ ] **com-09** 发送中显示"..."动画，检测流式消息中 `/task` 标记并高亮
- [ ] **com-10** position='bottom'（桌宠底部弹出）和 position='side'（壁纸侧边滑入）两种布局

### ChatBubble

- [ ] **com-11** 创建 `ChatBubble.vue`，定义 props：role, content, isStreaming
  - user 消息靠右，assistant 消息靠左
  - 不同背景色区分角色
  - isStreaming 时显示打字光标

### TaskCard

- [ ] **com-12** 创建 `TaskCard.vue`，定义 props：task
  - 显示 rpgTitle、子任务列表（含勾选框）
  - emits: toggle-subtask, view-detail
- [ ] **com-13** 紧凑模式（MiniTaskPanel 用）和完整模式（软件模式用）

### TaskList

- [ ] **com-14** 创建 `TaskList.vue`，定义 props：tasks[], emptyMessage
  - 渲染 TaskCard 列表
  - emits: select-task

### MiniTaskPanel

- [ ] **com-15** 创建 `MiniTaskPanel.vue`，定义 props：tasks, visible
  - 浮动面板，最大高度 300px，超出滚动
  - emits: close, toggle-subtask, view-detail
  - 点击面板外区域关闭

### PomodoroTimer

- [ ] **com-16** 创建 `PomodoroTimer.vue`，定义 props：remaining, total, isRunning
  - 圆形 SVG 进度环
  - MM:SS 显示格式，最后一分钟变暖色
  - emits: start, stop
  - 运行中/停止两种状态切换

### ProgressBar

- [ ] **com-17** 创建 `ProgressBar.vue`，定义 props：progress (0-100), variant ('edge' | 'normal')
  - edge 模式：屏幕边缘极细条
  - normal 模式：普通进度条

### 测试

- [ ] **com-18** 编写各组件单元测试：props 渲染验证、事件触发验证
