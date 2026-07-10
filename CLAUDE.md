# CLAUDE.md

本文件包含 Claude Code / ZCode 在本仓库中工作时的项目级指令。其它 Agent 工具见 [`AGENTS.md`](AGENTS.md)。

## 项目速览

- **产品目标**：AI 简历诊断、岗位匹配与优化演示系统（大二小学期）
- **两端**：`resume-web`（Vue3）· `resume-api`（Spring Boot）
- **数据**：Mock JSON + 前端 `localStorage`；**无数据库**

## 新队友阅读顺序

| 顺序 | 路径 | 目的 |
|---|---|---|
| 1 | `README.md` | 项目定位、如何跑起来 |
| 2 | `CONTEXT.md` | 产品域事实、术语、约束 |
| 3 | `CONTEXT-MAP.md` | 两端上下文地图 |
| 4 | `docs/agents/language.md` | 共享命名词汇 |
| 5 | `docs/agents/workflow.md` | 任务流（做功能时） |
| 6 | `docs/agents/context.md` | 文档地图 |
| 7 | `CLAUDE.md` | Agent 工作纪律（本文件） |
| 8 | 对应端源码 + `docs/contexts/*/CONTEXT.md` | 实施 |
| 9 | `docs/adr/` | 架构决策记录 |

## 目录分工

| 路径 | 职责 |
|---|---|
| `docs/adr/` | 架构决策（ADR） |
| `docs/agents/` | Agent 规则；**任务流 → `workflow.md`** |
| `docs/contexts/` | 分端 CONTEXT（web / api） |
| `docs/output/reports/{theme}/` | PRD、brief；完结 → `reports/archive/` |
| `docs/output/handoff/{theme}/` | 任务 handoff；完结 → `handoff/archive/` |
| `docs/knowledge/` | 可迁移知识沉淀 |
| `docs/images/readme/` | README 直接引用的终稿配图 |
| `docs/deliver/` | 交付用户：运行说明 · 答辩稿 · **答辩 PPT 终稿** |
| `docs/output/decks/` | （历史/空置）幻灯片中间产物；终稿已归 `docs/deliver/` |
| `docs/history/{YYYY-MM-DD}/` | 当日改动记录（攒批合并用） |
| `resume-web/` | Vue3 前端源码 |
| `resume-api/` | Spring Boot 后端源码 |
| 根目录 | 入口文档：`README` / `CONTEXT` / `CONTEXT-MAP` / `CLAUDE` / `AGENTS` |

完整索引 → [`docs/README.md`](docs/README.md)。

## 工作纪律

- AI 必须经后端调用，前端不直连大模型；API Key 永不入库
- 评分 = 关键词匹配分 × 40% + AI 内容分 × 60%（ADR-0001）
- 必须支持 AI Mock 模式，真实 API 挂了也能演示（ADR-0002）
- 无数据库；不主动扩范围（不爬虫、不登录、不企业端）
- 术语以 `CONTEXT.md` 为准；新词先补术语再写代码
- PRD 未 `approved` 前不写功能代码

## 文档维护协议

> 任务流见 [`docs/agents/workflow.md`](docs/agents/workflow.md)。速查见 [`AGENTS.md`](AGENTS.md)。

### 原则

1. **精炼**：新 `.md` 只写必要内容；可选扩展先与用户确认。
2. **归位**：PRD/brief → `reports/{theme}/`；handoff → `handoff/{theme}/{task}.md`；完结 → `*/archive/{theme}/`。
3. **单一来源**：任务状态以 Issue + handoff 为准；PRD 以 `reports/{theme}/prd.md` 为准。
4. **Review 门禁**：交付后停止，等用户确认。
5. **Review 说明（全局）**：交付前必须说明做了什么、改了哪些文件、Review 重点。
6. **Commit 门禁**：先写 `docs/history/{date}/commit-history.md`，进入 Review；禁止未经同意自动 commit。
7. **边界**：Agent 只提交本轮自己改动的文件。
8. **术语**：新词 → `CONTEXT.md`（及分端 CONTEXT 如需要）→ `docs/agents/language.md`。

### 三层加载

| 层 | 文件 | 加载时机 |
|---|---|---|
| L0 | `AGENTS.md` | 每次 |
| L1 | `workflow.md` + PRD + handoff | 做任务时 |
| L2 | `CONTEXT.md`、`CONTEXT-MAP.md`、分端 CONTEXT、`docs/adr/` | 改领域 / 架构 |

### 已归档偏好（2026-07-10）

- 资产集中 `docs/`；根目录只留工具链与入口文档。
- 多上下文：product + web / api。
- 产物 → `docs/output/`；knowledge 写入须用户 Review。
- AI 经后端调用；评分本地 + AI 加权；Mock 模式必备。
- 无数据库；岗位 Mock JSON；简历缓存 localStorage。
