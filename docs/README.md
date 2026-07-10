# docs/ — 资产目录

本目录存放**文档、决策、Agent 约定与产物**，不放应用源码。

## 目录结构

```
docs/
├── README.md           ← 本文件：索引
├── adr/                架构决策记录（ADR-0000 …）
├── agents/             Agent 规则
│   ├── workflow.md     ★ 任务流（Issue→PRD→handoff→Review→archive）
│   ├── deliver.md      ★ 交付层（维护 handoff + commit-history）
│   ├── archive.md      ★ 归档层（物理移动 archive/）
│   ├── context.md      文档地图
│   ├── language.md     共享词汇
│   ├── domain.md       领域消费规则
│   ├── issue-tracker.md
│   └── triage-labels.md
├── contexts/           分端 CONTEXT（web / api）
├── knowledge/          可迁移知识沉淀
├── history/            攒批 commit 记录
├── images/readme/      README 配图
└── output/
    ├── reports/
    │   ├── archive/{theme}/
    │   ├── readme-diagrams/           README 配图生成 brief
    │   └── {theme}/                   prd.md、brief
    ├── handoff/
    │   ├── archive/{theme}/
    │   └── {theme}/{task}.md
    └── decks/
```

## 仓库其他分区（非 docs）

| 路径 | 用途 |
|---|---|
| `/` 根目录 | 入口文档（`README.md`、`CONTEXT.md`、`CONTEXT-MAP.md`、`CLAUDE.md`、`AGENTS.md`） |
| `resume-web/` | Vue3 前端（待建） |
| `resume-api/` | Spring Boot 后端（待建） |

## GitHub Issues ↔ 本地 docs 映射

| GitHub | 本地 |
|---|---|
| Epic Issue | `docs/output/reports/{theme}/prd.md` |
| 子 Issue | `docs/output/handoff/{theme}/{task}.md` |
| 已完结 | `docs/output/{reports,handoff}/archive/{theme}/` |

## 当前状态（初始化基线）

| 路径 | 用途 | 状态 |
|---|---|---|
| `docs/adr/0000-record-architecture-decisions.md` | 采用 ADR | **Accepted** |
| `docs/adr/0001-scoring-formula.md` | 评分加权公式 | **Accepted** |
| `docs/adr/0002-ai-mock-mode.md` | AI Mock 模式 | **Accepted** |
| `docs/adr/0003-llm-via-backend-only.md` | 大模型经后端调用 | **Accepted** |
| `docs/output/reports/readme-diagrams/` | README 配图 brief | **draft** |
| `resume-web/` | Vue3 前端 | 待业务 PRD 后建 |
| `resume-api/` | Spring Boot 后端 | 待业务 PRD 后建 |
