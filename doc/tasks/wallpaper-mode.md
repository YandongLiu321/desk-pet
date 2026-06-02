# 壁纸模式 (renderer/wallpaper/)

> 全屏覆盖的专注陪伴层，含番茄钟和白噪音。

## 子任务

### 项目初始化

- [ ] **wal-01** 创建 `index.html` 入口
- [ ] **wal-02** 创建 `main.js`：创建 Vue 应用 + 注册 Pinia + 挂载

### App.vue 根布局

- [ ] **wal-03** 创建 `App.vue`：全屏布局，居中角色 + 底部控制区
- [ ] **wal-04** 集成 WallpaperBackground（全屏半透明暗色背景）
- [ ] **wal-05** 集成 CharacterRenderer（mode='wallpaper', size=200px）
- [ ] **wal-06** 集成 PomodoroTimer（居中控制区）
- [ ] **wal-07** 集成 WhiteNoiseControl（占位 UI）
- [ ] **wal-08** 集成 ConversationPanel（position='side'，点击角色滑入）
- [ ] **wal-09** 集成 EdgeProgressBar（屏幕底部细条，番茄钟运行时显示）
- [ ] **wal-10** 集成 ExitButton（ESC 键或点击按钮 → 切换回桌宠模式）

### 组件：WallpaperBackground

- [ ] **wal-11** 创建 `WallpaperBackground.vue`：全屏半透明暗色层
  - 原型阶段用 CSS 渐变（深色星空渐变）
  - 保留 `backgroundImage` prop 供后续替换

### 组件：WhiteNoiseControl

- [ ] **wal-12** 创建 `WhiteNoiseControl.vue`：原型阶段渲染占位 UI
  - 禁用的下拉选择框 + 禁用滑块 + 提示文字"音效即将上线"
  - 预留 props：tracks, volume, currentTrackId
  - 预留 emits：select-track, volume-change, play, pause

### 组件：EdgeProgressBar

- [ ] **wal-13** 创建 `EdgeProgressBar.vue`：屏幕底部极细进度条
  - 由番茄钟 remaining/total 计算进度
  - 颜色随剩余时间变化（正常→暖色→警示）

### 组件：ExitButton + 任务进度询问

- [ ] **wal-14** 创建 `ExitButton.vue`：返回桌宠按钮 + 任务进度询问浮层
  - 监听 ESC 键盘事件
  - 点击后弹出任务进度确认浮层："这次的任务完成得怎么样？"
  - **完成了** → 展示关联任务的子任务勾选 → 全完成触发叙事反馈
  - **还没完成** → 角色询问是否延长时间 → 同意则重启番茄钟 / 拒绝则打开文本输入框记录进度备注 → 保存到任务
  - 无关联任务时直接返回桌宠
  - 样式：小尺寸、半透明、悬停高亮

### 交互接入

- [ ] **wal-15** 接入 pomodoroStore：启动/停止/倒计时显示 + tick 更新进度条
- [ ] **wal-16** 番茄钟时间到 → 角色弹出完成确认（"完成/还没"按钮） → 完成→勾选子任务 / 没完成→询问是否延长时间（同意→重启番茄钟 / 拒绝→记录进度）
- [ ] **wal-17** 接入 conversationStore：侧边对话栏交互
- [ ] **wal-18** 接入 appStore：退出返回桌宠。退出前必须先触发任务进度询问（番茄钟关联任务时）
- [ ] **wal-19** 处理模式切换：切换到其他模式时番茄钟自动 stop。切换前若番茄钟关联了任务，同样询问进度

### 测试

- [ ] **wal-20** 编写 App.vue 组件测试：验证子组件渲染 + 番茄钟交互流程
