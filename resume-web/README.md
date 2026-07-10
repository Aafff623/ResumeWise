# resume-web

ResumeWise **前端源码目录**（当前为静态高保真原型，HTML / CSS / JS）。

> 正式业务将迁移为 Vue3 + Vite + Element Plus；交互与视觉以本目录 `src/` 为标杆。

## 目录结构

```text
resume-web/
├── package.json          # npm run dev / proxy
├── README.md
└── src/                  # ★ 源码根目录（规范 SRC）
    ├── index.html        # 首页 landing
    ├── optimize.html     # 填写简历 + 岗位 + 样板
    ├── review.html       # AI 诊断
    ├── result.html       # 优化对照 + 导出
    ├── about.html        # 关于项目
    ├── deepseek-proxy.py # 真实模式本机 CORS 代理
    ├── assets/
    │   ├── css/styles.css
    │   └── js/
    │       ├── app.js
    │       ├── jobs-data.js
    │       ├── markdown-lite.js
    │       ├── deepseek-api.js
    │       └── hero-anim.js
    ├── DESIGN_SPEC.md
    └── REPLICATION_PROMPT.md
```

## 本地运行

```bash
# 方式 A：npm
cd resume-web
npm run dev
# → http://127.0.0.1:5177

# 方式 B：Python
cd resume-web/src
python -m http.server 5177
```

### 演示模式（默认，答辩推荐）

- 顶栏保持 **演示模式 · Mock**
- 无需 API Key、无需代理
- 诊断/优化为内置示例数据，保证全流程可演示

### 真实模式 DeepSeek（可选）

```bash
cd resume-web
npm run proxy
# 或：python src/deepseek-proxy.py  → :8787
```

1. 浏览器打开站点，切到 **真实模式 · DeepSeek**
2. **配置 API Key**（仅本机 localStorage）
3. 模型：`deepseek-v4-flash` / `deepseek-v4-pro`
4. 双模式对照表与存储键说明见页面 **关于项目**（`about.html`）

## 与 docs 的关系

- 前端约定：`docs/contexts/web/CONTEXT.md`
- 历史/备份：`docs/output/reports/ui-prototype/`（brief、zip、截图说明）
- README 配图：`docs/images/readme/`
- **以本仓库 `resume-web/src` 为唯一前端源码入口**，后续 Vue 复刻也从这里迁出。
