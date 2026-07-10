# Context 消费指南

多上下文仓库。做**任务**时先读 [`workflow.md`](workflow.md)。地图见根 [`CONTEXT-MAP.md`](../../CONTEXT-MAP.md)。

## 阅读顺序

| 顺序 | 文件 | 内容 |
|---|---|---|
| 1 | `AGENTS.md` | 硬约束 |
| 2 | `workflow.md` | 任务流（PRD → handoff → Review → archive） |
| 3 | `reports/{theme}/prd.md` + `handoff/{theme}/{task}.md` | 当前任务上下文 |
| 4 | `CONTEXT.md` + 相关 `docs/contexts/*/CONTEXT.md` | 领域事实 |
| 5 | `docs/adr/` | 相关 ADR |

## 文档地图

| 路径 | 职责 |
|---|---|
| `docs/agents/workflow.md` | **任务流唯一规范** |
| `docs/agents/deliver.md` | **交付层**：维护 handoff + commit-history |
| `docs/agents/archive.md` | **归档层**：物理移动 handoff/reports |
| `docs/agents/language.md` | 共享命名词汇 |
| `docs/agents/domain.md` | 领域文档消费规则 |
| `docs/agents/issue-tracker.md` | GitHub Issues + `gh` |
| `docs/agents/triage-labels.md` | 五类 triage 标签 |
| `docs/output/reports/{theme}/` | PRD、brief（进行中） |
| `docs/output/reports/archive/{theme}/` | 已完结主题 |
| `docs/output/handoff/{theme}/{task}.md` | 任务 handoff（一任务一文件） |
| `docs/output/handoff/archive/{theme}/` | Review 通过的任务 |
| `docs/knowledge/` | 可迁移知识；写入须用户 Review |
| `docs/contexts/` | 分端 CONTEXT（web / api） |
| `docs/images/readme/` | README 终稿配图 |
| `docs/history/` | 攒批 commit 记录 |

## 规则

- 命名见 `language.md`。
- 任务必须挂 Issue；handoff 与 `reports/{theme}/` 同名。
- `awaiting-review` 时不得继续改代码，除非用户明示。
- 新 `.md` 保持精炼；扩展先与用户确认。
