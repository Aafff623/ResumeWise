# Web 端 CONTEXT — `resume-web`

> 先读根 [`CONTEXT.md`](../../../CONTEXT.md)。本文件只写前端实现约定。

## 当前状态（2026-07）

| 项 | 值 |
|---|---|
| 形态 | **静态高保真原型**（HTML / CSS / JS），可完整演示 |
| 源码根 | **`resume-web/src/`**（唯一前端 SRC） |
| 规划 | 后续演进为 Vue3 · Vite · Element Plus · Axios |
| 后端 | `resume-api` 未脚手架；真实 AI 暂经本机代理直连 DeepSeek（演示用） |

> 开发与演示以 **`resume-web/src`** 为准；`docs/output/reports/ui-prototype/` 仅保留 brief / zip / 历史说明，**不要**在 html-src 里继续开发。

## 目录结构（当前 · 静态原型 SRC）

```
resume-web/
├── package.json         # npm run dev / proxy
├── README.md
└── src/                 # ★ 规范源码根
    ├── index.html       # 首页 + 使用教程 + 模式对比入口
    ├── optimize.html    # 填写简历 / 岗位 / 样板
    ├── review.html      # AI 诊断
    ├── result.html      # 优化对照 + 导出
    ├── about.html       # 关于项目 · 维护说明 · 双模式详解
    ├── deepseek-proxy.py
    ├── assets/css/styles.css
    ├── assets/js/
    │   ├── app.js           # 页面交互、模式切换、Mock 数据流
    │   ├── jobs-data.js     # 5 岗 + 样板简历
    │   ├── markdown-lite.js # 简易 MD 渲染
    │   ├── deepseek-api.js  # 真实模式调用
    │   └── hero-anim.js     # 首页装饰动画（可选，非业务）
    ├── DESIGN_SPEC.md
    └── REPLICATION_PROMPT.md
```

## 页面

| 页面 | 文件 | 职责 |
|---|---|---|
| 首页 | `index.html` | 介绍能力、使用教程、Mock/Live 对比摘要、入口 |
| 填写 | `optimize.html` | Markdown 简历 + 岗位 + 样板简历参考 |
| 诊断 | `review.html` | 综合评分、匹配度、关键词、问题列表 |
| 结果 | `result.html` | 原始 ↔ 优化对照、修改说明、多格式导出 |
| 关于 | `about.html` | 定位、**双模式详解**、源码路径、启动、边界 |

## 演示模式 vs 真实模式

| | 演示模式 · Mock | 真实模式 · DeepSeek |
|---|---|---|
| 切换 | 顶栏「演示模式 · Mock」 | 顶栏「真实模式 · DeepSeek」 |
| API Key | 不需要 | 需要，仅存本机 localStorage |
| 代理 | 不需要 | `npm run proxy`（:8787） |
| 诊断/优化内容 | 前端内置固定示例 | 模型按简历+岗位动态生成 |
| 关键词匹配分 | 本地计算（同一套） | 本地计算（同一套） |
| AI 内容分 | 示例固定分 | 模型返回 |
| 推荐 | 答辩主路径 | 展示真实调用 |

### 本机存储键

| Key | 用途 |
|---|---|
| `rw-mode` | `mock` / `live` |
| `rw-deepseek-key` | API Key（勿入库、勿截图泄露） |
| `rw-deepseek-model` | `deepseek-v4-flash` / `deepseek-v4-pro` |
| `rw-resume` | 最近简历文本 |
| `rw-job` | 选中岗位 id |
| sessionStorage | 真实模式诊断/优化动态结果（关标签即清） |

### 启动

```bash
cd resume-web
npm run dev          # :5177 前端
npm run proxy        # :8787 仅真实模式需要
```

## 约束（当前原型）

1. **规范 SRC** 仅为 `resume-web/src`；文档与配图在 `docs/`。
2. **localStorage** 缓存模式、Key、简历、岗位；Key **永不进 Git**。
3. **真实模式**经本机 Python 代理转发 DeepSeek，解决浏览器 CORS；生产应改为后端代调（ADR-0003）。
4. **评分**：关键词匹配 × 40% + AI 内容 × 60%（ADR-0001）；关键词分始终本地算。
5. **Mock 模式必须可单独演示**（ADR-0002 精神：无 Key / 无网也能走完流程）。
6. **对照导出**：原始 | 优化；支持 MD / TXT / PDF / Word-HTML。
7. **范围**：不做登录、DB、爬虫、文件解析上传、企业端。

## 规划 · Vue3 复刻后

```
resume-web/
├── package.json
├── vite.config.js
└── src/
    ├── main.js
    ├── App.vue
    ├── router/index.js
    ├── api/              # 只打 /api/*，不直连大模型
    ├── views/
    ├── components/
    └── assets/
```

- AI 请求全部走 Spring Boot `/api/ai/*`（ADR-0003）。
- 开发期 Vite 代理 `/api` → `http://localhost:8080`。
- 前端消费 DTO，不感知后端 Mock / 真实切换。

## 与文档资产

| 路径 | 用途 |
|---|---|
| `docs/images/readme/*` | README 配图（banner / showcase / 架构图等） |
| `docs/output/reports/ui-prototype/` | 原型 brief、历史 zip（非 SRC） |
| `docs/output/reports/model-resumes/` | 样板简历调研 |
| `docs/adr/` | 评分 / Mock / AI 经后端 |

## 未决

- Vue3 业务 PRD 未批前不脚手架。
- 生产 Key 应收拢到 `resume-api`，去掉浏览器直连代理。
- TypeScript：暂不加。
