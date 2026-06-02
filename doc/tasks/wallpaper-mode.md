# 壁纸模式 (renderer/wallpaper/)

> 全屏覆盖的专注陪伴层，含番茄钟和白噪音。单文件 `index.html`（纯 HTML/CSS/JS）。

## 子任务

### 页面初始化

- [ ] **wal-01** 创建 `index.html` 单文件页面，全屏布局

### 页面结构

- [ ] **wal-02** 全屏背景层：CSS 星空渐变（`WallpaperBackground` div）
- [ ] **wal-03** 角色展示区：居中大尺寸 CharacterRenderer（mode='wallpaper', size=200）
- [ ] **wal-04** 番茄钟控制区：居中下方，PomodoroTimer（SVG 进度环 + MM:SS）+ 启动/停止按钮。若用户有活跃任务，启动时默认关联最近创建的任务（taskId 自动填充）；后续可扩展为任务选择下拉框
- [ ] **wal-05** 白噪音占位 UI：禁用下拉框 + 禁用滑块 + "音效即将上线"文字
- [ ] **wal-06** 侧边对话栏：ConversationPanel（position='side'），点击角色滑入
- [ ] **wal-07** 底部进度条：番茄钟运行时显示，极细条，颜色随剩余时间变化
- [ ] **wal-08** 退出按钮：监听 ESC 键盘事件 + 按钮点击。**ESC 和按钮点击必须先触发壁纸模式内部的退出浮层（wal-09/wal-10）**，不可直接调用 `app:switch-mode('pet')`；仅在退出浮层流程结束后才执行模式切换

### 退出闭环

- [ ] **wal-09** 退出时检查 pomodoro taskId：有 → 弹出进度询问浮层；无 → 直接返回桌宠
- [ ] **wal-10** 进度询问浮层（四态）：
  - 态1 — 询问"完成了/还没"
  - 态2 — 子任务勾选列表（动态 checkbox，IPC toggle）
  - 态3 — "要延25分钟？"（是→重启 pomodoro:start / 否→输入进度）
  - 态4 — 进度文本输入（保存为对话消息后返回桌宠）

### IPC 接入

- [ ] **wal-11** 接入 pomodoro IPC：启动/停止/倒计时 tick 更新
- [ ] **wal-12** 番茄钟时间到 → 弹出完成确认 → 完成勾选子任务 / 延长 / 记录进度
- [ ] **wal-13** 侧边对话 IPC：`conversation:send` 流式交互
- [ ] **wal-14** 切换到其他模式时番茄钟自动 stop；切换前若番茄钟关联了任务，先询问进度
