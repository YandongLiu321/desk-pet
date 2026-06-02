# 基础设施搭建

> 对应提案第一阶段 (Day 1-2)：搭建项目骨架，让 Electron + Vue 3 + Vite 跑通。

## 子任务

### Vite 多页面构建配置

- [ ] **infra-01** 配置 `vite.config.js` 多页面入口（pet、wallpaper、software 三个 HTML）
- [ ] **infra-02** 配置 `package.json` scripts（`dev`、`build`、`start`）
- [ ] **infra-03** 配置 `tsconfig.json` 类型检查路径
- [ ] **infra-04** 配置 `biome.json` 代码规范检查
- [ ] **infra-05** 验证 `npm run dev` 能启动 Vite dev server

### Electron 主进程骨架

- [ ] **infra-06** 创建 `src/main/main.js` 入口文件，启动一个最小 BrowserWindow
- [ ] **infra-07** 确认 Electron 与 Vite dev server 联通（开发模式加载 localhost URL）
- [ ] **infra-08** 创建 `src/main/window-manager.js` 空壳，定义类结构和导出
- [ ] **infra-09** 创建 `src/main/ipc-handlers.js` 空壳，定义类结构和占位 `registerAll()`
- [ ] **infra-10** 创建系统托盘图标 + 右键菜单（切换模式、退出）

### Preload 脚本

- [ ] **infra-11** 创建 `src/preload.js`，使用 `contextBridge` 暴露最小 API stub
- [ ] **infra-12** 验证渲染进程可通过 `window.electronAPI` 调用主进程

### 资源文件

- [ ] **infra-13** 生成占位角色图标 SVG（`assets/characters/default/icon.svg`）
- [ ] **infra-14** 创建世界书 `assets/worldbooks/default.json`（使用提案附录 A 模板）
- [ ] **infra-15** 创建 `assets/audio/` 目录 + `.gitkeep`
- [ ] **infra-16** 创建 `assets/backgrounds/` 目录 + `.gitkeep`

### 数据层基础

- [ ] **infra-17** 创建 `src/main/database.js`，实现 lowdb 初始化 + 默认数据结构写入
- [ ] **infra-18** 创建 `data/` 目录，生成初始 `db.json`
