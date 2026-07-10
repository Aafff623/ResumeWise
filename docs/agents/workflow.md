# 任务工作流

从需求到交付的全流程。Agent 与用户交互的**唯一流程规范**。

## 1. 目录结构

```
docs/output/
├── reports/
│   ├── archive/                    # 已确认、已完结的主题
│   │   └── {theme}/
│   │       └── prd.md
│   └── {theme}/                    # 进行中的主题（与 Issue Epic 同名）
│       ├── prd.md                  # PRD（用户确认前 status: draft）
│       └── …                       # brief 等附属文档
├── handoff/
│   ├── archive/                    # Review 通过并已完结的任务
│   │   └── {theme}/
│   │       └── {task}.md
│   └── {theme}/                    # 进行中的主题
│       └── {task}.md               # 一任务一文件，持续更新（不用序号版本）
└── decks/
```

**命名**：`{theme}`、`{task}` 用 kebab-case 英文，与 Issue 标题语义一致（如 `resume-review`、`ai-review-api`）。

`reports/{theme}/` 与 `handoff/{theme}/` **必须同名**，便于 Agent 定位。

---

## 2. 全流程

```
用户想法
  → GitHub Issue（Epic，父 Issue）
  → 沟通需求 → reports/{theme}/prd.md（draft）
  → 用户确认 PRD ✓
  → 拆任务：子 Issue + handoff/{theme}/{task}.md（每个任务一个文件）
  → Agent 实施 → 更新 handoff → 停止，请求 Review
  → 用户 Review 通过 ✓
  → 关闭子 Issue；handoff 移入 handoff/archive/{theme}/
  → 主题全部完结 → reports/{theme}/ 移入 reports/archive/{theme}/
```

| 阶段 | 产物 | 位置 |
|---|---|---|
| 立项 | Epic Issue | GitHub |
| PRD | `prd.md` | `reports/{theme}/` |
| 子任务 | 子 Issue + handoff | GitHub + `handoff/{theme}/{task}.md` |
| 完结 | 归档 | `*/archive/{theme}/` |

---

## 3. PRD 规范

路径：`docs/output/reports/{theme}/prd.md`

```markdown
---
theme: resume-review
epic-issue: 1
status: draft | approved | archived
---

# PRD — {标题}

## 背景
…

## 目标
…

## 范围（做 / 不做）
…

## 验收标准
…

## 任务拆分
| task | Issue | handoff |
|---|---|---|
| ai-review-api | #2 | handoff/resume-review/ai-review-api.md |
| review-result-page | #3 | handoff/resume-review/review-result-page.md |
```

- `status: draft` — 与用户沟通中，**禁止**拆任务写代码
- `status: approved` — 用户书面确认后，Agent 才可拆任务
- 主题完结后整目录移入 `reports/archive/{theme}/`

---

## 4. Handoff 规范

路径：`docs/output/handoff/{theme}/{task}.md`（**一任务一文件，原地迭代，不用 01/02 版本号**）

```markdown
---
theme: resume-review
task: ai-review-api
issue: 2
status: in-progress | awaiting-review | done
updated: 2026-07-10
---

# ai-review-api

## 目标
（来自 PRD 或子 Issue）

## 已完成
- …

## 待 Review（当前交付）
- 改了什么、如何验证

## 阻塞 / 问题
- …

## 下次（仅 Review 通过后填写）
- …
```

### status 含义

| status | 含义 | Agent 行为 |
|---|---|---|
| `in-progress` | 实施中 | 可继续改代码 |
| `awaiting-review` | 已交付，等用户 | **停止**，不得开始下一任务 |
| `done` | Review 通过 | 移入 `handoff/archive/{theme}/`，关闭 Issue |

---

## 5. Agent 拆分任务

**前置**：`prd.md` 的 `status: approved`。

1. 与用户确认任务列表（≤7 个可并行理解的单元）。
2. 每个任务：`gh issue create` 子 Issue，父 Issue 为 Epic。
3. 每个任务：创建 `handoff/{theme}/{task}.md`，`status: in-progress`。
4. 在 `prd.md` §任务拆分 填 Issue 号与 handoff 路径。
5. **一次只做一个任务**；不得跳过 Review 开启下一任务。

---

## 6. Agent 继续任务

新对话开始时，用户应提供 **theme + task** 或 **Issue 号**。

Agent 读取顺序：

1. `AGENTS.md`
2. `gh issue view {issue}`
3. `reports/{theme}/prd.md`（approved）
4. `handoff/{theme}/{task}.md`（进行中的最新内容即该文件本身）

若 `handoff` 的 `status: awaiting-review`：**不得继续改代码**，除非用户明确说「继续改」或「Review 未通过，修改 xxx」。

---

## 7. Agent ↔ 用户交互

### Agent 必须停止并等待 Review 的时机

- PRD 初稿完成 → 等用户确认 `approved`
- 任务代码/文档交付 → 改 handoff 为 `awaiting-review` → 等用户
- 用户说「通过 / OK / 继续」→ 才可标记 `done`、归档或开始下一任务

### Review 说明（全局，交付前必做）

进入 Review **之前**，Agent 须向用户输出：

1. **做了什么** — 要点列表
2. **改了哪些文件** — 路径（无改动则说明「无 repo 变更」）
3. **Review 重点** — 用户应重点看什么、如何验证、风险或未决项

适用于所有场景（功能、文档、PRD、规范、咨询落地）。handoff §待 Review 须与此对齐。详见 [`AGENTS.md`](../../AGENTS.md) §Review 说明。

### Agent 禁止

- 未经 PRD 确认就拆任务或写功能代码
- Review 未通过时自行开始下一任务
- 跳过 Issue 直接做（除纯文档/规范类且用户明示）
- 过度设计：PRD 范围外的功能不主动加

### 用户指令速查

| 用户说 | Agent 做 |
|---|---|
| 「确认 PRD」 | `prd.md` → `approved`，拆任务 |
| 「通过 / LGTM」 | handoff → `done`，归档，关 Issue |
| 「继续 {task}」 | 读对应 handoff，`in-progress`，实施 |
| 「改 xxx」 | 保持或回到 `in-progress`，改完再 `awaiting-review` |

---

## 8. 归档

**归档 = 物理移动文件到 `archive/`，不是只改 frontmatter `status: done`。**

| 条件 | 动作 |
|---|---|
| 单任务 Review 通过 | `handoff/{theme}/{task}.md` → **`handoff/archive/{theme}/{task}.md`**（移动）；`status: done`；关子 Issue |
| 主题下全部 handoff 已 archived | **`reports/{theme}/` → `reports/archive/{theme}/`**（整目录移动）；`prd.md` → `archived`；关 Epic |
| Brief 主题（无 handoff） | `reports/{theme}/` → `reports/archive/{theme}/` |

### 单任务归档步骤

1. 用户 Review 通过（「通过 / LGTM / archive {task}」）
2. 更新 handoff frontmatter：`status: done`
3. **移动文件**：`git mv handoff/{theme}/{task}.md handoff/archive/{theme}/{task}.md`
4. 同步 PRD §任务拆分 中该 task → done
5. `gh issue close {issue}`（若有）

### 主题归档步骤

1. 确认 `handoff/{theme}/` 下**无剩余** handoff（全部已在 `handoff/archive/{theme}/`）
2. **移动目录**：`git mv reports/{theme} reports/archive/{theme}`
3. `prd.md` frontmatter `status: archived`
4. 关 Epic Issue

### 常见错误

| 错误 | 正确做法 |
|---|---|
| 只改 frontmatter 为 `done`，文件不移动 | 必须移到 `handoff/archive/{theme}/` |
| 表标 done 但 handoff 仍在进行中目录 | 执行物理移动或回滚表状态 |
| 主题未全部 archived 就移 reports | 先齐 handoff/archive，再移 reports |

归档后文件**只读**，新需求开新 `{theme}`。详见 [`archive.md`](archive.md)。

---

## 9. 与现有产物的关系

| 已有 | 适配 |
|---|---|
| `reports/readme-diagrams/` | 合法 `{theme}`，无 PRD 的纯 brief 主题；可不建 handoff |
| GitHub Issues | Epic = 主题；子 Issue = 任务 |
| `docs/images/readme/` | README 终稿配图，brief 中指向此处 |

无 PRD 的小型产物（如单份 brief）：可只建 `reports/{theme}/`，不走 handoff 流程。
