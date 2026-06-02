# 窗口管理器 (window-manager.js)

> 管理三个 BrowserWindow 的生命周期，确保模式互斥切换。首次使用时创建窗口，之后 hide/show 复用。

## 子任务

### 基础结构

- [ ] **wm-01** 定义 `WINDOW_CONFIG` 常量（pet/wallpaper/software 三种窗口配置）
- [ ] **wm-02** 实现 `constructor(preloadPath)`，初始化窗口 Map
- [ ] **wm-03** 实现 `getOrCreateWindow(mode)` → 创建或返回缓存的 BrowserWindow
  - pet: 500×500, transparent, frame:false, alwaysOnTop（角色 120×120 偏右，其余透明区域穿透桌面，浮层作为 DOM 元素在窗口内）
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

- [ ] **wm-10** 桌宠窗口：body 默认 `pointer-events: none`，角色区域 `pointer-events: auto`。无浮层时透明区域不接收鼠标事件（纯 CSS 控制，不调用 `setIgnoreMouseEvents`）
- [ ] **wm-11** 角色区域用 CSS `-webkit-app-region: drag` 支持拖动（内部可点击元素用 `-webkit-app-region: no-drag` 覆盖）

### 测试

- [ ] **wm-12** 编写单元测试：mock BrowserWindow，验证 hide/show 调用顺序 + 缓存行为
