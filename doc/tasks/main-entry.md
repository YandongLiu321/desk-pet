# 主进程入口 (main.js) + 系统托盘

> 组装所有模块，创建依赖注入容器，启动应用。包括系统托盘图标和右键菜单。

## 子任务

### 依赖组装

- [ ] **ent-01** 实现模块初始化顺序：Database → WindowManager → LLMService → TaskService({ db, worldBook }) → RelationshipService → PomodoroService → NarrativeEngine → ProactiveTrigger → UserStyleAnalyzer
- [ ] **ent-02** 创建 IPCHandlers 实例，传入所有服务依赖，调用 `registerAll()`

### 系统托盘

- [ ] **ent-03** 创建系统托盘图标（`assets/ui/tray-icon.png`）
- [ ] **ent-04** 实现托盘右键菜单：
  - 显示桌宠 / 进入壁纸模式 / 进入软件模式
  - 分隔线
  - 退出应用
- [ ] **ent-05** 托盘菜单点击"显示桌宠/进入壁纸模式/进入软件模式" → 统一通过 IPC `app:switch-mode` 切换（复用 ipc-handlers 中的番茄钟拦截和壁纸退出询问逻辑），**禁止**直接调用 `windowManager.switchMode()`
- [ ] **ent-06** 托盘菜单点击"退出" → windowManager.closeAll() + app.quit()

### 启动流程

- [ ] **ent-07** 应用启动时默认打开桌宠窗口 → `windowManager.switchMode('pet')`
- [ ] **ent-08** 处理 `app.on('window-all-closed')` → 不退出（托盘常驻）
- [ ] **ent-09** 处理 `app.on('before-quit')` → 清理番茄钟定时器 + 关闭所有窗口

### 窗口事件

- [ ] **ent-10** 软件模式窗口关闭按钮 → 调用 `windowManager.switchMode('pet')` 返回桌宠（而非仅 hide，避免 `appState.currentMode` 停留在 software）
- [ ] **ent-11** 壁纸模式窗口关闭按钮 → 先触发退出进度询问流程（见 wallpaper-mode wal-09/wal-10），确认后返回桌宠。关闭/切换前调用 `llmService.abort()` 中止未完成的流式对话

### 验证

- [ ] **ent-12** 启动应用 → 桌宠窗口出现 → 托盘图标出现 → 右键菜单可用 → 模式切换正常
