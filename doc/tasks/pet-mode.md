# 桌宠模式 (renderer/pet/)

> 桌面悬浮的 Q 版角色（窗口即角色本体，约 140×160）。左键闲聊，右键功能菜单。对话中能智能识别模式切换意图。

## 子任务

### 项目初始化

- [ ] **pet-01** 创建 `index.html` 入口
- [ ] **pet-02** 创建 `main.js`：创建 Vue 应用 + 注册 Pinia + 挂载

### App.vue 根布局

- [ ] **pet-03** 创建 `App.vue`：透明背景，窗口仅容纳角色本体（约 140×160）
- [ ] **pet-04** 集成 CharacterRenderer（mode='pet', modelType='icon'），角色填充窗口
- [ ] **pet-05** 集成 ConversationPanel（position='bottom'，**左键**点击角色弹出/收回，纯闲聊）
- [ ] **pet-06** 集成 MiniTaskPanel（右键菜单触发，浮动面板，最大 300px 高）
- [ ] **pet-07** 集成 ContextMenu（**右键**弹出功能菜单）

### 组件：MessageInput

- [ ] **pet-08** 创建 `MessageInput.vue`：单行输入框 + 发送按钮
  - 回车发送，Shift+回车换行
  - 发送中禁用输入

### 组件：ContextMenu（右键菜单）

- [ ] **pet-09** 创建 `ContextMenu.vue`：右键弹出菜单
  - 菜单项：**发布任务**（进入任务转化流程）、进入壁纸模式、进入软件模式、查看任务列表、退出
  - 点击菜单外部关闭
  - 每个菜单项调用对应 action

### 交互接入

- [ ] **pet-10** App.vue 接入 conversationStore：**左键** → 纯闲聊对话，流式显示回复。该通道不触发任务转化
- [ ] **pet-11** 接入 taskStore：**右键→发布任务**入口触发。用户表达待办 → AI 返回 create_task intent → 创建任务 + 显示提示
- [ ] **pet-12** 接入 appStore：模式切换（手动右键切换 + AI 智能切换两路径） + 监听 mode:activated 刷新数据
- [ ] **pet-12b** 实现智能模式切换：conversation:done 中检测 `intent: 'switch_mode'` → 自动调用 appStore.switchMode(switchTarget)

### 窗口行为

- [ ] **pet-13** 处理透明窗口鼠标穿透：角色区域可点击，非角色区域穿透。对话浮层/菜单打开时恢复角色区域附近的可交互性
- [ ] **pet-14** 窗口置顶 + 任务栏不显示（通过主进程窗口配置）
- [ ] **pet-15** 验证：左键角色弹出对话气泡（闲聊），右键弹出功能菜单（含发布任务入口），对话中表达"想专注"→AI 询问确认→切换壁纸模式

### 测试

- [ ] **pet-16** 编写 App.vue 组件测试：验证左键/右键行为分离、子组件正确渲染、事件传递
