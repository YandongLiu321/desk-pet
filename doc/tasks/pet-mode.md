# 桌宠模式 (renderer/pet/)

> 常驻桌面的透明无边框宠物窗口，支持自然语言对话和任务发布。

## 子任务

### 项目初始化

- [ ] **pet-01** 创建 `index.html` 入口
- [ ] **pet-02** 创建 `main.js`：创建 Vue 应用 + 注册 Pinia + 挂载

### App.vue 根布局

- [ ] **pet-03** 创建 `App.vue`：透明背景、全窗口可拖动区域
- [ ] **pet-04** 集成 CharacterRenderer（mode='pet', modelType='icon'）
- [ ] **pet-05** 集成 ConversationPanel（position='bottom'，点击角色弹出）
- [ ] **pet-06** 集成 MiniTaskPanel（右键角色展开）
- [ ] **pet-07** 集成 TrayContextMenu（模式切换菜单）

### 组件：MessageInput

- [ ] **pet-08** 创建 `MessageInput.vue`：单行输入框 + 发送按钮
  - 回车发送，Shift+回车换行
  - 发送中禁用输入

### 组件：TrayContextMenu

- [ ] **pet-09** 创建 `TrayContextMenu.vue`：右键弹出菜单
  - 菜单项：进入壁纸模式、进入软件模式、查看任务、退出
  - 点击菜单外部关闭
  - 每个菜单项调用对应 action

### 交互接入

- [ ] **pet-10** App.vue 接入 conversationStore：发送消息 → 流式显示回复
- [ ] **pet-11** 接入 taskStore：AI 返回 create_task intent 时自动创建任务 + 显示提示
- [ ] **pet-12** 接入 appStore：模式切换 + 监听 mode:activated 刷新数据

### 窗口行为

- [ ] **pet-13** 处理透明窗口鼠标穿透：角色区域可点击，非角色区域穿透
- [ ] **pet-14** 窗口置顶 + 任务栏不显示（通过主进程窗口配置）
- [ ] **pet-15** 验证：点击角色弹出对话气泡，右键弹出迷你任务面板

### 测试

- [ ] **pet-16** 编写 App.vue 组件测试：验证子组件正确渲染、事件传递
