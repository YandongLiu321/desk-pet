# 软件模式 (renderer/software/)

> RPG 风格的游戏化主界面，任务结算与剧情推进。1280×800 独立窗口，暗色星空主题。

## 子任务

### 项目初始化

- [ ] **sw-01** 创建 `index.html` 入口
- [ ] **sw-02** 创建 `main.js`：创建 Vue 应用 + 注册 Pinia + 挂载

### App.vue 根布局

- [ ] **sw-03** 创建 `App.vue`：三栏布局（左导航 + 中内容 + 右角色区）
- [ ] **sw-04** 集成 TitleBar（深色星空主题标题栏）

### 组件：TitleBar

- [ ] **sw-05** 创建 `TitleBar.vue`：窗口标题栏 + 最小化/关闭按钮

### 组件：LeftNavigation + NavTab

- [ ] **sw-06** 创建 `NavTab.vue`：单个导航标签（图标 + 文字 + active 状态样式）
- [ ] **sw-07** 创建 `LeftNavigation.vue`：三个标签垂直排列（任务/地图/角色）
  - emits: select-tab
  - active 标签高亮

### 组件：ContentArea

- [ ] **sw-08** 创建 `ContentArea.vue`：根据 activeTab 切换显示内容区
  - 'tasks' → TaskPanel
  - 'map' → WorldMap
  - 'character' → CharacterProfile

### 组件：TaskPanel + TaskDetail + SettlementResult

- [ ] **sw-09** 创建 `TaskPanel.vue`：左侧 TaskList + 右侧 TaskDetail（选中任务时）
- [ ] **sw-10** 创建 `TaskDetail.vue`：任务 RPG 信息 + 子任务列表（可勾选）+ "提交任务"按钮
  - 全部子任务完成时按钮可用，否则禁用
- [ ] **sw-11** 创建 `SettlementResult.vue`：结算后显示叙事反馈文本 + 动画
  - 淡入显示叙事文本 + 世界状态变化摘要

### 组件：WorldMap

- [ ] **sw-12** 创建 `WorldMap.vue`：静态区域地图
  - 原型阶段：CSS 绘制的区域占位图 + 区域标记（明亮/灰暗）
  - 显示当前章节和世界变量数值
  - 预留 props：regions[], worldVariables, currentChapter

### 组件：CharacterProfile + CharacterBackstory + MemoryTimeline

- [ ] **sw-13** 创建 `CharacterProfile.vue`：角色档案容器
- [ ] **sw-14** 创建 `CharacterBackstory.vue`：静态展示角色背景故事（数据来自世界书）
- [ ] **sw-15** 创建 `MemoryTimeline.vue`：共同记忆时间线（数据来源：任务结算记录）
  - 原型阶段展示已完成任务列表作为占位时间线

### 组件：CharacterSidebar

- [ ] **sw-16** 创建 `CharacterSidebar.vue`：右侧角色展示区
  - 上方 CharacterRenderer（mode='software'）
  - 下方 ConversationPanel（与桌宠共享 conversationStore）

### 交互接入

- [ ] **sw-17** 接入 taskStore：任务列表、详情、子任务勾选、结算
- [ ] **sw-18** 任务结算流程：全部子任务完成 → 点击"提交" → completeTask → 显示叙事反馈
- [ ] **sw-19** 接入 conversationStore：右侧对话面板与桌宠共享对话历史
- [ ] **sw-20** 接入 characterStore：角色档案数据
- [ ] **sw-21** 接入 appStore：窗口关闭时返回桌宠

### 测试

- [ ] **sw-22** 编写 App.vue 组件测试 + 关键组件单元测试
