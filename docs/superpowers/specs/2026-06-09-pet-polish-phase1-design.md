# Phase 1: Desk-Pet 视觉表现与软件功能改进

**日期:** 2026-06-09
**状态:** 设计已确认
**参考项目:** Sakura (Python/PySide6 桌宠)

## 概述

借鉴 Sakura 项目的设计理念和功能实现，在保留 desk-pet 现有全部功能（Live2D 角色、三模式架构、WebGL 壁纸引擎、番茄钟、RPG 任务系统、关系/世界进度系统）的前提下，分两阶段改进桌宠的视觉表现和软件功能。

**Phase 1（本轮）：** 打字机字幕、毛玻璃输入框、主题配色系统、点击穿透、设置界面、增强托盘菜单
**Phase 2（后续）：** Live2D 表情/Motion 切换、主动交互系统、长期记忆系统、TTS 语音播放

## 实现策略

渐进式实现，按依赖关系排序，每步可独立验证：

1. 主题配色系统 → 所有后续 UI 的视觉基础
2. 点击穿透 → 最小独立改动
3. 打字机字幕 → 中等改动，依赖主题变量
4. 毛玻璃输入框 → 依赖主题 + 点击穿透
5. 增强托盘菜单 → 功能改动
6. 设置界面 → 最大改动，最后做

## 不打破的原则

- IPC 通信保持 `{ ok, data }` / `{ ok, error }` 模式
- 三模式架构不变（pet/wallpaper/software）
- WebGL 壁纸引擎不动
- Live2D 渲染管线不动（仅增加嘴部同步参数调用）
- 番茄钟、任务、关系系统不改
- lowdb 数据库结构只增字段，不删不改

---

## Step 1: 主题配色系统

### 目标
将现有硬编码的暗色星空主题改造为 CSS 自定义属性驱动的多主题系统。

### CSS Token 设计
定义完整的设计 token 集合（颜色、间距、圆角、阴影、字体），通过 `[data-theme="..."]` 选择器切换。

3 套预设主题：
- **starry**（默认）：深紫星空，accent: #7c3aed
- **forest**：深绿森系，accent: #22c55e
- **ocean**：深蓝海洋，accent: #3b82f6

### 实现
- `styles/variables.css`：重写，定义 token + 主题数据属性
- `ThemeManager` 类（挂 `window.themeManager`）：`getTheme()`, `setTheme(name)`, `getThemes()`
- 切换修改 `document.documentElement.dataset.theme`，浏览器即时重绘
- 通过 IPC `settings:get` / `settings:set` 读写 `db.data.settings.theme`
- 初始加载时从 db 读取应用上次主题
- 新增 IPC channels: `settings:get`, `settings:set`, `theme:set`, `theme:get`

---

## Step 2: 真正的点击穿透

### 目标
Pet 模式下窗口默认对鼠标透明（click-through），仅角色区域和展开的面板可交互。

### 两状态设计

**默认状态（click-through）：**
- `body { pointer-events: none; user-select: none; }`
- `.character-area { pointer-events: auto; }`（用于拖拽、右键、点击）
- `.context-menu { pointer-events: auto; }`

**交互状态（面板展开时）：**
- `body.interactive { pointer-events: auto; }`
- 对话面板/任务面板打开时添加 `.interactive`
- 面板关闭时移除（ESC 或点击外部）

### 实现
- CSS 在 `styles/base.css` 中
- JS 在 pet 和 wallpaper 模式入口脚本中控制 `.interactive` 切换
- Main process: `window.setIgnoreMouseEvents(true, { forward: true })` 作为 Electron 层面保障
- 无需新增 IPC，纯前端 + main process window 配置

---

## Step 3: 打字机字幕效果

### 目标
AI 回复通过定时器逐字显示到气泡中，配合 Live2D 嘴部参数同步。

### 两级缓冲架构
```
SSE Chunks → 写入缓冲区（累积） → 显示缓冲区（定时器逐字取出） → 气泡 DOM
```

### TypewriterController 类
- `constructor(speechLabel, options)` — speed (ms/字，默认35), cursorChar (默认 '▍')
- `appendChunk(text)` — SSE chunk 到达时调用，追加到 writeBuffer
- `_tick()` — 定时器回调，index++，更新 DOM textContent
- `finalize()` — 流结束调用，标记所有文本已到达
- `_triggerLipSync()` — 每 tick 调用 Live2D `setParameterValueById('ParamMouthOpenY', random(0.3, 0.8))`

### 气泡行为改进
- 不再自动消失，保持显示直到下一条消息或手动关闭
- 上下箭头按钮浏览历史回复（借鉴 Sakura reply history）
- 气泡尺寸随文本长度自适应，max-height + overflow-y: auto
- 新消息淡入动画

### 实现文件
- `src/renderer/shared/typewriter-controller.js` — 新建
- `src/renderer/shared/conversation-panel.js` — 修改，集成 TypewriterController
- `styles/animations.css` — 新增光标闪烁、气泡动画 keyframes

---

## Step 4: 毛玻璃拟态输入框

### 目标
输入框和对话面板使用 backdrop-filter 毛玻璃效果，产生景深层次感。

### CSS 方案
```css
.glass-panel {
  background: var(--color-bg-glass);
  backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

### 应用范围
- Pet 模式：输入栏 + 对话面板 + 任务面板 + 右键菜单
- Wallpaper 模式：聊天侧边栏 + 任务选择下拉 + 白噪音控制
- Software 模式：侧边导航 + 内容卡片 + 输入区域

### 兼容性
- Electron transparent 窗口 + backdrop-filter 在 Windows 上需测试
- 降级方案：`@supports (backdrop-filter: blur(1px))` 检测，不支持时使用不透明深色半透明背景

---

## Step 5: 增强托盘菜单

### 目标
在现有简单模式切换菜单基础上增加功能入口和状态显示。

### 新菜单结构
| 菜单项 | 类型 | 说明 |
|--------|------|------|
| Pet/Wallpaper/Software Mode | 单选 | 保留不变 |
| Wallpaper Editor | action | 保留不变 |
| --- | separator | |
| Show/Hide Subtitles | toggle | 控制气泡字幕显示，状态写 db |
| Always on Top | toggle | 切换 window.setAlwaysOnTop()，显示 ✓ |
| Mute | toggle | 静音白噪音，状态写 db |
| Pomodoro: MM:SS | info | 当前番茄钟剩余时间，定时更新 label |
| --- | separator | |
| Settings... | action | 打开设置窗口 |
| Chat History | action | 切换到 software 模式并打开历史 |
| --- | separator | |
| Exit | action | 保留不变 |

### 实现
- `main.js` 的 `createTray()` 方法扩展
- Toggle 项使用 `type: 'checkbox'`，checked 状态从 db 读取
- Pomodoro 时间通过 `setInterval` 每 5 秒更新 menu item label
- Settings 触发 `createSettingsWindow()`（Step 6）

---

## Step 6: 设置界面

### 窗口
- 独立 BrowserWindow：800x600，可调整大小，非透明，有标题栏
- 左侧 60px 图标标签导航 + 右侧内容区
- 底部按钮栏：Save / Cancel / Reset to Defaults
- 单例模式，从托盘菜单 "Settings..." 打开

### 4 个标签页

**API 配置：**
- API Key (password input)
- API Base URL
- Model 选择
- Test Connection 按钮 + 状态反馈

**外观：**
- 主题选择器（3 套预设卡片式预览）
- 角色缩放滑块 (50%-150%)
- 字幕速度滑块 (10-100ms/字)
- 字体大小

**交互：**
- 字幕开关
- 打字机速度
- 气泡自动消失时间
- 点击穿透开关

**番茄钟：**
- 默认工作时长 (min)
- 短休时长 / 长休时长
- 长休间隔（几个番茄后）
- 结束提醒开关

### 数据流
```
Renderer: ipc.invoke('settings:get') → Main: db.data.settings → 返回
Renderer: ipc.invoke('settings:set', data) → Main: db.update + broadcast 'settings:changed'
所有窗口: ipcRenderer.on('settings:changed') → 更新本地状态和 UI
```

### 实现文件
- `renderer/settings/index.html` — 新建
- `renderer/settings/settings-app.js` — 新建
- `src/main/ipc-handlers.js` — 新增 handlers
- `src/main/main.js` — createSettingsWindow() + 触发
- `src/shared/constants.js` — 新增 IPC channels

---

## 文件改动汇总

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/shared/constants.js` | 修改 | 新增主题/设置/窗口控制 IPC channels |
| `src/renderer/shared/styles/variables.css` | 重写 | 主题 token + 3 套主题定义 |
| `src/renderer/shared/styles/base.css` | 修改 | 点击穿透全局样式 + .glass-panel |
| `src/renderer/shared/styles/animations.css` | 修改 | 打字机光标 + 气泡动画 keyframes |
| `src/renderer/shared/ipc-client.js` | 修改 | 新增 theme/settings 相关方法 |
| `src/renderer/shared/typewriter-controller.js` | **新建** | TypewriterController 类 |
| `src/renderer/shared/theme-manager.js` | **新建** | ThemeManager 类 |
| `src/renderer/shared/conversation-panel.js` | 修改 | 集成打字机 + 毛玻璃样式 |
| `src/renderer/pet/index.html` | 修改 | 新的布局 + 交互类切换 |
| `src/renderer/wallpaper/index.html` | 修改 | 毛玻璃样式应用 |
| `src/renderer/software/index.html` | 修改 | 毛玻璃样式应用 |
| `src/renderer/settings/index.html` | **新建** | 设置窗口 |
| `src/renderer/settings/settings-app.js` | **新建** | 设置窗口逻辑 |
| `src/main/ipc-handlers.js` | 修改 | 新增 settings:get/set, theme:get/set |
| `src/main/main.js` | 修改 | 托盘菜单增强 + createSettingsWindow |
| `src/main/database.js` | 修改 | settings schema 新增字段 |
| `src/preload.js` | 修改 | 新增 settings:changed 监听暴露 |

## 测试验证

每步完成后验证：
1. Step 1: 切换主题即时生效，重启保持
2. Step 2: 点击窗口背景 → 桌面图标收到点击；点击角色 → 窗口拖动/菜单正常
3. Step 3: 发送消息 → 逐字显示 + 光标闪烁 + 嘴部动画
4. Step 4: 面板/输入框显示毛玻璃效果（或降级方案）
5. Step 5: 右键托盘 → 新菜单项显示 + toggle 工作正常
6. Step 6: 设置窗口打开 → 修改配置 → 保存 → 所有窗口同步更新
