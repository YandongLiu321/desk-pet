# Desk Pet 运行手册

> 版本 1.0.0 | 最后更新 2026-06-13

---

## 1. 项目概述

Desk Pet 是一款基于 Electron 的桌面伴侣应用。用户在桌面上养一个名为"柚子"的数字角色，她通过 Live2D 渲染呈现，具备 LLM 对话、任务管理、番茄钟、壁纸模式等功能。

**三种运行模式：**

| 模式 | 说明 | 窗口特性 |
|------|------|---------|
| 桌宠模式 (Pet) | 小巧的 Live2D 角色浮窗 | 500×500，透明无边框，始终置顶 |
| 软件模式 (Software) | 柚子房间，完整功能面板 | 1280×800，标准窗口，可缩放 |
| 壁纸模式 (Wallpaper) | 全屏沉浸式背景 | 全屏透明，嵌入桌面 |

---

## 2. 环境要求

| 依赖 | 版本要求 |
|------|---------|
| Node.js | ≥ 18.x |
| npm | ≥ 9.x |
| 操作系统 | Windows 10/11（当前仅支持 Windows） |
| GPU | 支持 WebGL 2.0（Live2D 渲染需要） |
| 磁盘空间 | ~500 MB（含 node_modules 和 Live2D 模型资源） |

---

## 3. 安装

```bash
# 1. 进入项目目录
cd desk-pet

# 2. 安装依赖
npm install

# 3. 验证安装
npm run typecheck   # TypeScript 类型检查
npm test            # 运行测试
```

---

## 4. 配置

### 4.1 API Key（必需）

首次运行前需配置 LLM API Key，编辑 `data/db.json`：

```json
{
  "appState": {
    "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

或通过软件模式的柚子日记 → 连接 页面配置。

默认使用 **DeepSeek API**：
- Endpoint: `https://api.deepseek.com/v1/chat/completions`
- Model: `deepseek-chat`

### 4.2 可选配置

通过柚子日记（设置窗口）可配置：

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| theme | `starry` | 主题：starry / forest / ocean |
| subtitleEnabled | `true` | 是否显示字幕 |
| typewriterSpeed | `35` ms | 打字机效果速度 |
| clickThrough | `true` | 桌宠模式点击穿透 |
| alwaysOnTop | `true` | 桌宠模式窗口置顶 |
| pomodoroWorkDuration | `25` min | 番茄钟工作时长 |
| pomodoroShortBreak | `5` min | 短休时长 |
| pomodoroLongBreak | `15` min | 长休时长 |
| pomodoroLongBreakInterval | `4` | 长休间隔（几个番茄后） |
| proactiveEnabled | `true` | 启用主动交互 |
| proactiveIdleThresholdMin | `15` min | 空闲触发阈值 |
| proactiveCooldownMs | `600000` ms | 触发冷却时间 |

### 4.3 音频配置

音频文件存放于 `assets/audio/`。世界书 `assets/worldbooks/default.json` 中的 `audio.tracks` 定义曲目列表：

```json
"audio": {
  "tracks": [
    { "id": "rain", "name": "雨声", "file": "雨声.flac" },
    { "id": "Lilac", "name": "紫丁香", "file": "Lilac.flac" }
  ]
}
```

支持的格式：flac、mp3。

---

## 5. 运行

### 5.1 开发环境

```bash
npm start
```

启动后默认进入桌宠模式，系统托盘出现图标。

### 5.2 模式切换

| 方式 | 操作 |
|------|------|
| 系统托盘菜单 | 右键图标 → 选择模式 |
| 桌宠模式 | 与柚子对话中表达意图（如"打开壁纸模式"） |
| 软件模式 | 底部导航栏切换，或点击房间物件 |
| 快捷键 | 无（当前版本未绑定全局快捷键） |

### 5.3 壁纸编辑器

```bash
# 通过系统托盘菜单打开
右键托盘图标 → 壁纸编辑器
```

编辑器用于创建和编辑 WebGL 场景壁纸。

---

## 6. 开发

### 6.1 项目脚本

```bash
npm start              # 启动应用
npm test               # 运行单元测试（vitest）
npm run lint           # 代码检查（biome）
npm run lint:fix       # 自动修复
npm run typecheck      # TypeScript 类型检查
npm run bundle:live2d  # 打包 Live2D 渲染器
```

### 6.2 项目结构

```
desk-pet/
├── assets/
│   ├── audio/              # 背景音乐（flac, mp3）
│   ├── ui/                 # 托盘图标等 UI 资源
│   └── worldbooks/         # 世界书配置（default.json）
├── data/
│   ├── db.json             # 运行时数据库（API key、任务、对话历史等）
│   └── task-mode-mapping.json  # 任务模式分类映射
├── hiyori_free_zh/         # Live2D 模型文件（CDI3、Model3、Physics3、Motion）
├── src/
│   ├── main/               # Electron 主进程
│   │   ├── main.js         # 入口，应用生命周期
│   │   ├── window-manager.js    # 多模式窗口管理
│   │   ├── database.js     # JSON 文件数据库（lowdb 风格）
│   │   ├── ipc-handlers.js # IPC 路由注册
│   │   ├── llm-service.js  # LLM API 调用（DeepSeek）
│   │   ├── task-service.js # 任务 CRUD + RPG 转换
│   │   ├── task-classifier.js   # 任务模式自动分类
│   │   ├── relationship-service.js  # 好感度/关系系统
│   │   ├── pomodoro-service.js     # 番茄钟服务
│   │   ├── proactive-service.js    # 主动交互触发器
│   │   ├── memory-service.js       # 对话记忆管理
│   │   ├── narrative-engine.js     # 叙事引擎
│   │   ├── editor-window.js   # 壁纸编辑器窗口
│   │   └── we-asset-loader.js # Wallpaper Engine 资源加载
│   ├── renderer/           # Electron 渲染进程
│   │   ├── pet/index.html  # 桌宠模式
│   │   ├── software/index.html  # 软件模式（柚子房间）
│   │   ├── wallpaper/index.html # 壁纸模式
│   │   ├── settings/index.html  # 柚子日记（独立设置窗口）
│   │   ├── editor/         # 壁纸编辑器
│   │   └── shared/         # 跨模式共享组件
│   │       ├── *.js        # UI 组件（对话、任务、番茄钟、主题等）
│   │       ├── styles/     # CSS（variables, base, animations）
│   │       ├── webgl/      # WebGL 渲染管线
│   │       └── we-converter/ # Wallpaper Engine 场景转换
│   ├── preload.js          # 安全的 IPC 桥接
│   └── shared/constants.js # IPC 通道、Intent、Mode 常量
├── tests/                  # 单元测试
├── docs/                   # 文档
├── package.json
└── start.bat               # Windows 快速启动脚本
```

### 6.3 新增渲染模式

1. 在 `src/shared/constants.js` 的 `MODE` 中添加模式名
2. 在 `src/main/window-manager.js` 的 `WINDOW_CONFIG` 中添加窗口配置
3. 在 `src/renderer/<mode>/index.html` 创建渲染页面
4. 在 `src/main/ipc-handlers.js` 和 `src/preload.js` 中添加必要的 IPC 通道
5. 在 `src/main/main.js` 的托盘菜单中添加切换入口

---

## 7. 构建与发布

当前版本为开发版本，未配置打包流水线。如需发布：

```bash
# 使用 electron-builder 打包（需先安装）
npm install --save-dev electron-builder

# 在 package.json 中添加 build 配置后：
npx electron-builder --win
```

---

## 8. 调试

### 8.1 主进程调试

```bash
# 启动时打开 DevTools
electron . --inspect
```

或在 `main.js` 中添加 `mainWindow.webContents.openDevTools()`。

### 8.2 渲染进程调试

在任意模式窗口中按 `Ctrl+Shift+I` 打开 Chrome DevTools。

### 8.3 数据调试

直接查看 `data/db.json`，包含完整的应用状态、对话历史、任务列表、记忆数据。

### 8.4 日志

当前应用无集中式日志系统。错误通过 Electron 默认控制台输出。调试时注意：
- 主进程日志 → 启动终端
- 渲染进程日志 → DevTools Console
- IPC 调用 → 在 `ipc-handlers.js` 的 `runSafe` 中加日志

---

## 9. 常见问题

| 问题 | 排查步骤 |
|------|---------|
| 应用无法启动 | 检查 `npm install` 是否成功；检查 Node.js 版本 ≥ 18 |
| AI 对话无响应 | 检查 `data/db.json` 中 apiKey 是否已配置；测试 API Key 是否有效 |
| Live2D 不显示 | 检查 GPU 驱动和 WebGL 支持；确认 `hiyori_free_zh/` 模型文件完整 |
| 壁纸模式黑屏 | 检查 WebGL 着色器编译日志；尝试切换壁纸模式后再进入 |
| 番茄钟不工作 | 确认 `pomodoroWorkDuration` 不为 0；检查 `pomodoro-service.js` 进程 |
| 设置不生效 | 修改设置后点击"保存"触发写入；重启应用后加载最新配置 |
| 端口/权限问题 | 该应用不占用网络端口；如遇文件权限问题，检查 `data/` 目录可写 |

---

## 10. 维护

### 日常
- 检查 `data/db.json` 体积，定期清理旧对话记录
- 更新 API Key 后重启应用
- 备份 `data/db.json` 保留任务和关系数据

### 依赖升级
```bash
npm outdated            # 查看可升级依赖
npm update              # 小版本更新
npm install electron@latest  # 升级 Electron（谨慎，需测试兼容性）
```

### 重置应用
删除 `data/db.json` 后重启，应用将自动生成默认配置。
