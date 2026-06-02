# 共享样式 (shared/styles/)

> CSS 自定义属性、动画关键帧、全局 reset 样式。三种模式共享。

## 子任务

### CSS 变量

- [ ] **sty-01** 创建 `variables.css`，定义颜色、间距、字体 CSS 自定义属性
  - 暗色星空主题色板（深蓝/紫/银白/金色）
  - 字号层级（xs/sm/base/lg/xl/2xl）
  - 间距层级（xs/sm/md/lg/xl）
  - 圆角、阴影、过渡时间
- [ ] **sty-02** 主题变量支持（`:root` 默认暗色主题）

### 动画

- [ ] **sty-03** 创建 `animations.css`，实现呼吸动画 `@keyframes breathe`（scale 1.0 ↔ 1.05, 3s ease-in-out）
- [ ] **sty-04** 实现眨眼动画 `@keyframes blink`（眼睛区域 scaleY 1 → 0.1 → 1, 4s）
- [ ] **sty-05** 实现弹跳动画 `@keyframes bounce`（点击反馈, translateY 0 → -10 → 0, 0.3s）
- [ ] **sty-06** 实现淡入淡出 `@keyframes fadeIn` / `fadeOut`
- [ ] **sty-07** 实现滑入动画 `@keyframes slideInRight` / `slideInUp`（对话面板滑入）

### 全局样式

- [ ] **sty-08** 创建 `base.css`：box-sizing reset、body 默认样式、滚动条美化、选中颜色
- [ ] **sty-09** 字体引入：系统字体栈 + 等宽字体栈
- [ ] **sty-10** 透明窗口通用样式类（`.transparent-bg`、`.no-select`、`.drag-region`）
