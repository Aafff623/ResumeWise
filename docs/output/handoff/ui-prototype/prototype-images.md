---
theme: ui-prototype
task: prototype-images
status: awaiting-review
updated: 2026-07-10
---

# prototype-images

## 目标

静态高保真原型可演示；Mock / DeepSeek 双模式；README 与 docs 资产收尾。

## 已完成

- GPT 静态包覆盖 `html-src` 为视觉标杆
- 填写简历：Markdown 编辑/预览、岗位样板弹窗、模式切换与 API Key（localStorage）
- DeepSeek 真实调用：本机 CORS 代理 + 动态诊断/优化渲染
- 模型 id：`deepseek-v4-flash` / `deepseek-v4-pro`
- Markdown `?` 语法教学（源码/预览最小示例）
- README Showcase 截图 + readme 配图同步
- 导出 MD/TXT/PDF/Word（原型级）

## 待 Review

- 静态原型路径：`docs/output/reports/ui-prototype/html-src/`
- README Showcase 四张图：`docs/images/readme/showcase-*.png`
- 真实模式需：`python deepseek-proxy.py` + Key

## 阻塞 / 问题

- 业务 `resume-web` / `resume-api` 尚未脚手架（规划下一阶段）

## 下次

- Review 通过后可 archive 本 brief 主题
- 业务 PRD → Vue3 + Spring Boot 复刻
