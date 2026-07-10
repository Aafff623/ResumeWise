---
theme: ui-prototype
task: prototype-images
status: awaiting-review
updated: 2026-07-10
---

# prototype-images

## 目标

按 `docs/output/reports/ui-prototype/ui-prototype-brief.md` 产出前端高保真原型图，覆盖 4 个主流程页 + 2 个可选状态变体，风格专业化、小学期可答辩，并补充少量专业插图。

## 已完成

- 阅读 `CONTEXT.md`、web CONTEXT、workflow、brief 等规范资产
- 采用 **HTML/CSS 高保真原型 + Playwright 截图**
- 桌面端 6 张 PNG + 移动端 4 张 PNG
- AI Hero 插图；页面内 SVG 图标
- 预览入口 `html-src/index.html`（**非登录页**；产品范围无登录）
- 用户授权分批 commit：Web 桌面 / 移动端

## 待 Review（当前交付）

| 文件 | 说明 |
|---|---|
| `docs/images/prototype/prototype-*.png` | 桌面 6 + 移动 4 |
| `docs/images/prototype/assets/*` | 插图素材 |
| `docs/output/reports/ui-prototype/html-src/*` | HTML 源 + `index.html` 入口 |

### 如何验证

1. 双击 PNG，或启动静态服务打开 `html-src/index.html`
2. 桌面：左右分栏；移动：上下堆叠
3. 确认无登录 / PDF 上传 / 聊天 / 招聘列表

## 阻塞 / 问题

- 无。若用户坚持要「登录界面」，与 CONTEXT 冲突，需单独确认后再做演示壳。

## 下次（仅 Review 通过后）

- 按原型复刻 Vue3 + Element Plus 页面（需业务 PRD `approved`）
