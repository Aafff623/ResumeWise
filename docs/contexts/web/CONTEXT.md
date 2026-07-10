# Web 端 CONTEXT — `resume-web`

> 先读根 [`CONTEXT.md`](../../../CONTEXT.md)。本文件只写前端实现约定。

## 技术栈

| 项 | 值 |
|---|---|
| 框架 | Vue 3（`<script setup>` + Composition API） |
| 构建 | Vite |
| UI 库 | Element Plus |
| HTTP | Axios |
| 语言 | JavaScript（非 TS，控制小学期复杂度） |
| 路由 | Vue Router |

## 目录结构（当前 · 静态原型 SRC）

```
resume-web/
├── package.json         # npm run dev / proxy
├── README.md
└── src/                 # ★ 规范源码根
    ├── index.html       # 首页
    ├── optimize.html    # 填写简历
    ├── review.html      # AI 诊断
    ├── result.html      # 优化结果
    ├── about.html
    ├── deepseek-proxy.py
    ├── assets/css/styles.css
    ├── assets/js/       # app.js · jobs-data · markdown · deepseek-api
    ├── DESIGN_SPEC.md
    └── REPLICATION_PROMPT.md
```

## 目录结构（规划 · Vue3 复刻后）

```
resume-web/
├── package.json
├── vite.config.js
└── src/
    ├── main.js
    ├── App.vue
    ├── router/index.js
    ├── api/
    ├── views/
    ├── components/
    └── assets/
```

> 开发与演示以 **`resume-web/src`** 为准；`docs/output/reports/ui-prototype/` 仅保留 brief / zip / 历史说明。

## 页面（4 个，见 PRD）

| 页面 | 路由（建议） | 职责 |
|---|---|---|
| 首页 | `/` | 介绍能力，入口「开始优化」 |
| 简历优化页 | `/optimize` | 左：粘贴简历 / 选示例；右：选目标岗位 |
| AI 诊断页 | `/review` | 综合评分、匹配度、关键词覆盖、问题列表、优化建议 |
| 优化结果页 | `/result` | 原始 ↔ 优化 对照、修改说明、复制 / 导出 |

## 约束

1. **前端不直连大模型 API**（ADR-0003）；所有 AI 请求走 `/api/ai/*`。
2. **localStorage**：缓存最近一次简历文本与选中的 jobId，刷新不丢；不存诊断结果（诊断每次重新请求）。
3. **请求态**：AI 请求期间展示 loading；超时 / 失败用 Element Plus `ElMessage` 提示，不白屏。
4. **对照展示**：优化结果页左右双栏（原始 | 优化），移动端上下堆叠。
5. **复制 / 导出**：优化文本支持一键复制（`navigator.clipboard`）；导出 `.txt` 为加分项。
6. **示例简历**：前端内置 1-2 份示例简历按钮，点击即填充，降低演示门槛。
7. **接口前缀**：开发期 Vite 代理 `/api` → `http://localhost:8080`。

## 与后端的接口契约

详见 [`docs/contexts/api/CONTEXT.md`](../api/CONTEXT.md) §接口。前端消费 DTO，不感知后端 Mock / 真实切换。

## 未决

- 是否加 TypeScript：暂不加，控制复杂度；若需要另开 ADR。
- 是否做 PWA / 移动端适配：做基础响应式，不做 PWA。
