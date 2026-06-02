# 桌宠模式 (renderer/pet/)

> 500×500 透明无边框窗口，角色 120×120 偏右放置（x:240, y:20）。左键角色左侧弹出对话面板（闲聊），右键角色右侧弹出功能菜单，主动气泡从角色头顶浮现。

## 子任务

### 页面结构与布局

- [ ] **pet-01** 创建 `index.html` 单文件页面：500×500 透明背景，角色区域绝对定位（240, 20, 120×120）
- [ ] **pet-02** 集成 CharacterRenderer（mode='pet', size=120），挂载到角色区域
- [ ] **pet-03** 实现角色呼吸/眨眼/弹跳动画

### 主动气泡（角色头顶）

- [ ] **pet-04** 创建主动气泡 DOM 元素：定位在角色头顶上方，单行文字（≤50字），带关闭按钮
- [ ] **pet-05** 气泡自动消失逻辑：显示后 N 秒自动隐藏（`setTimeout`）
- [ ] **pet-06** 气泡点击行为：点击气泡 → 展开左侧对话面板

### 对话面板（角色左侧）

- [ ] **pet-07** 集成 ConversationPanel（position='bottom'），定位在角色左侧（240×400）
- [ ] **pet-08** 左键点击角色 → 对话面板 toggle（纯闲聊，`enableTaskCreation: false`）
- [ ] **pet-09** 右键菜单"发布任务" → 打开对话面板，`enableTaskCreation: true`
- [ ] **pet-10** conversation:done 中检测 `intent: 'switch_mode'` → 自动调用 `app:switch-mode(switchTarget)`
- [ ] **pet-11** 点击角色区域外或按 ESC → 关闭对话面板

### 右键菜单（角色右侧）

- [ ] **pet-12** 创建右键菜单 DOM 元素：定位在角色右侧，min-width:130px
- [ ] **pet-13** 菜单项：发布任务 / 进入壁纸模式 / 进入软件模式 / 查看任务 / 隐藏（隐藏窗口到托盘，应用继续运行。因 `window-all-closed` 不退出，此为"隐藏"而非"退出应用"）
- [ ] **pet-14** `contextmenu` 事件触发菜单，修复事件冒泡导致菜单项点击失效
- [ ] **pet-15** 点击菜单项后关闭菜单，执行对应 action

### 迷你任务面板（角色左侧，与对话面板互斥）

- [ ] **pet-16** 集成 TaskPanel（compact=true），定位在角色左侧（240×300）
- [ ] **pet-17** 右键菜单"查看任务" → 展开任务面板，同时关闭对话面板（互斥）
- [ ] **pet-18** 子任务勾选通过 IPC toggle，实时同步到主进程

### 鼠标交互控制（纯 CSS 方案）

- [ ] **pet-19** CSS 默认状态：`body` `pointer-events: none`，仅角色区域（120×120）`pointer-events: auto` + `-webkit-app-region: drag`
- [ ] **pet-20** 封装浮层状态切换函数：给 `body` 添加/移除 `.interactive` class（`.interactive` 设置 `pointer-events: auto`）
- [ ] **pet-21** 任一浮层（对话面板/菜单/气泡/任务面板）打开时 → 添加 `.interactive` class → 全窗口可交互
- [ ] **pet-22** 所有浮层关闭时 → 移除 `.interactive` class → 恢复仅角色区域可交互

### 验证

- [ ] **pet-23** 验证：左键角色 → 左侧对话面板弹出（闲聊），右键 → 右侧菜单弹出（5 项）
- [ ] **pet-24** 验证："发布任务"打开对话面板且 AI 注入任务转化 Prompt
- [ ] **pet-25** 验证：对话面板与任务面板互斥（同时只显示一个）
- [ ] **pet-26** 验证：主动气泡显示/自动隐藏/点击展开对话面板
- [ ] **pet-27** 验证：鼠标交互控制——body 默认 `pointer-events: none`（仅角色可交互）；面板/菜单/气泡打开时 `.interactive` class 生效（全窗口可交互）；关闭后恢复默认
