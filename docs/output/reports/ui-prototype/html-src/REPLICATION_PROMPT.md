# 给 Grok Build / Cursor Agent 的复刻 Prompt

你需要在当前 ResumeWise 仓库中，基于本目录提供的静态 HTML 原型，复刻 Vue3 前端页面。

## 读取顺序

1. 仓库根目录：`AGENTS.md`、`CLAUDE.md`、`CONTEXT.md`、`CONTEXT-MAP.md`
2. 前端上下文：`docs/contexts/web/CONTEXT.md`
3. 当前静态资产：本压缩包中的 `index.html`、`optimize.html`、`review.html`、`result.html`
4. 视觉规范：`DESIGN_SPEC.md`
5. PNG 对照：`assets/screenshots/`

## 目标

在 `resume-web/` 中使用 Vue3 + Vite + Element Plus + Axios，实现以下四个路由：

```text
/          首页
/optimize  简历输入与目标岗位选择
/review    AI 诊断结果
/result    原始简历与优化结果对照
```

要求视觉尽可能贴近静态原型，但代码必须按 Vue 组件方式实现，不允许把四份 HTML 整体复制到单个组件中。

## 必须保留

- 暖白编辑背景、深墨蓝、钴蓝、薄荷绿的设计系统
- 顶部品牌导航与三步流程
- 首页纸张式简历主视觉
- 左侧简历编辑 + 右侧岗位选择布局
- 诊断页的可解释评分、关键词和结构化问题
- 优化页的原始 / 优化 / 修改说明三栏对照
- 桌面端与移动端响应式
- localStorage 保存简历文本与 jobId
- 请求 loading、失败提示、复制和 TXT 导出

## 技术约束

- JavaScript，不引入 TypeScript
- 所有 AI 请求必须调用 `/api/ai/*`，禁止前端直连模型
- 岗位数据调用 `/api/jobs`；后端未就绪时允许使用本地 Mock fallback
- 不引入数据库、登录注册、状态管理大框架、图表大库
- 不增加与 PRD 无关的页面
- 不使用 CDN 或远程字体

## 推荐组件拆分

```text
src/
├── components/
│   ├── AppHeader.vue
│   ├── StepProgress.vue
│   ├── StatusBadge.vue
│   ├── JobSelector.vue
│   ├── ResumeEditor.vue
│   ├── ScoreSummary.vue
│   ├── KeywordTags.vue
│   ├── IssueList.vue
│   ├── ResumeCompare.vue
│   ├── LoadingOverlay.vue
│   └── ToastMessage.vue
├── views/
│   ├── HomeView.vue
│   ├── OptimizeView.vue
│   ├── ReviewView.vue
│   └── ResultView.vue
├── api/
│   ├── http.js
│   ├── jobs.js
│   └── ai.js
├── mock/
│   └── fallback.js
└── styles/
    ├── tokens.css
    └── global.css
```

## 验收

- 四个路由均可直接刷新访问
- 1440×900 下与 PNG 参考布局一致，无横向滚动和明显溢出
- 选择岗位、填充示例、localStorage、开始诊断、生成优化版本、复制和导出均可操作
- 后端不可用时，Mock 模式仍能完成完整演示
- 不修改后端和项目规范文档，除非任务 handoff 明确要求
- 完成后输出：改动文件、运行方式、视觉偏差、未决项；先进入 Review，不自动 commit
