# 窗口管理器 (window-manager.js)

> 管理三个 BrowserWindow 的生命周期，确保模式互斥切换。首次使用时创建窗口，之后 hide/show 复用。

## 子任务

### 基础结构

- [ ] **wm-01** 定义 `WINDOW_CONFIG` 常量（pet/wallpaper/software 三种窗口配置）
- [ ] **wm-02** 实现 `constructor(preloadPath)`，初始化窗口 Map
- [ ] **wm-03** 实现 `getOrCreateWindow(mode)` → 创建或返回缓存的 BrowserWindow
  - pet: 300×400, transparent, frame:false, alwaysOnTop
  - wallpaper: fullscreen, transparent, frame:false
  - software: 1280×800, frame:true, resizable

### 模式切换

- [ ] **wm-04** 实现 `switchMode(targetMode)`
  - 隐藏当前窗口 `currentWindow.hide()`
  - 获取/创建目标窗口 → `targetWindow.show()`
  - 更新焦点窗口引用
- [ ] **wm-05** 实现 `getCurrentMode()` → 返回当前活跃模式
- [ ] **wm-06** 实现 `getCurrentWindow()` → 返回当前活跃 BrowserWindow
- [ ] **wm-07** 实现 `getWindow(mode)` → 获取指定模式窗口（不创建）

### 生命周期

- [ ] **wm-08** 实现 `closeAll()` → 销毁所有窗口
- [ ] **wm-09** 处理窗口关闭事件（只隐藏不销毁，托盘右键退出时才销毁）

### 桌宠特殊窗口行为

- [ ] **wm-10** 实现鼠标穿透逻辑：非角色区域 `setIgnoreMouseEvents(true, { forward: true })`
- [ ] **wm-11** 角色区域用 CSS `-webkit-app-region: drag` 支持拖动

### 测试

- [ ] **wm-12** 编写单元测试：mock BrowserWindow，验证 hide/show 调用顺序 + 缓存行为
