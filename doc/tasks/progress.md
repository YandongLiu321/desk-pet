# 总体进度

## 第一阶段：基础设施 (5 个模块)

- [x] [shared-styles](./shared-styles.md) — CSS 变量、动画、全局样式
- [x] [database](./database.md) — lowdb 封装，全部 CRUD 操作
- [x] [window-manager](./window-manager.md) — 三窗口生命周期管理
- [x] [preload](./preload.md) — contextBridge 安全 API 暴露
- [x] [shared-js](./shared-js.md) — 共享 JS 模块（ipc-client, dom-utils, state-manager 等）

## 第二阶段：桌宠模式 (7 个模块)

- [x] [llm-service](./llm-service.md) — DeepSeek API 适配、System Prompt、流式响应
- [x] [task-service](./task-service.md) — 任务 CRUD、AI 响应转化
- [x] [relationship-service](./relationship-service.md) — 关系阶段计算与推进
- [x] [ipc-handlers](./ipc-handlers.md) — IPC 路由注册、参数校验、错误响应
- [x] [shell-modules](./shell-modules.md) — ProactiveTrigger + UserStyleAnalyzer 空壳
- [x] [main-entry](./main-entry.md) — 主进程入口 + 系统托盘
- [x] [pet-mode](./pet-mode.md) — 桌宠模式页面 (纯 HTML/CSS/JS)

## 第三阶段：壁纸 + 软件模式 (4 个模块)

- [x] [pomodoro-service](./pomodoro-service.md) — 番茄钟计时器
- [x] [narrative-engine](./narrative-engine.md) — 叙事反馈生成
- [x] [wallpaper-mode](./wallpaper-mode.md) — 壁纸模式页面
- [x] [software-mode](./software-mode.md) — 软件模式页面

## 第四阶段：联调与收尾 (1 个模块)

- [x] [integration](./integration.md) — 三模式联调、异常处理、代码质量、手动验收
