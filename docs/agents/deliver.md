# Deliver 交付流程

任务完成后的**交付层**操作规范。读本文并执行流程。

> 任务流总纲 → [`workflow.md`](workflow.md) · Commit 攒批 → [`AGENTS.md`](../../AGENTS.md) §Commit 攒批

## 定位

```
实施中 → 交付（总结 + 维护文档）→ Review → commit（用户同意）→ archive（用户说通过）
```

| 交付做 | 交付不做 |
|---|---|
| 维护 handoff、PRD、commit-history 等 | `git commit` |
| 输出交付摘要 | 移 archive、关 Issue |
| 进入 Review，停止 | 提交用户自行改动的文件 |

## 执行步骤

1. **扫描**：对话上下文 + `git diff` / `git status`（仅本轮 Agent 改动的文件）
2. **切分**：识别 1..N 个**工作单元**（同 theme+task、同主题文档、同规范改动各算一类）
3. **判定**：每个单元匹配下方类型 T1–T9 + 当前阶段
4. **维护**：按类型更新对应文件；有 repo 落地改动则维护 T0
5. **Review 说明**：输出做了什么、改了哪些文件、**Review 重点**（全局硬约束，见 [`AGENTS.md`](../../AGENTS.md) §Review 说明）
6. **Archive 衔接**：检查 handoff/reports 状态，**提示**是否可归档（不执行移动）
7. **输出**：固定格式交付摘要 → **停止**

## 工作单元类型

| 类型 | 场景 | 主要维护目标 |
|---|---|---|
| **T1** PRD / Epic | 立项、PRD 草稿或同步 | `reports/{theme}/prd.md` |
| **T2** 任务拆分 | PRD approved 后拆 handoff | PRD §任务拆分 + `handoff/{theme}/{task}.md` |
| **T3** 功能实施 | 改 `src/` 等，有 handoff | handoff → `awaiting-review` |
| **T4** Brief 主题 | 无 PRD/handoff 的 brief 主题 | `reports/{theme}/` brief |
| **T5** 规范 / L0 | AGENTS、CLAUDE、agents/* | 对应规范文件 + 可选 CLAUDE §已归档偏好 |
| **T6** 领域 / 术语 | 新术语、约束 | `CONTEXT.md`、`language.md` |
| **T7** ADR | 架构决策 | `docs/adr/000N-*.md` |
| **T8** 知识沉淀 | 用户要求写 knowledge | `docs/knowledge/`（须用户明示或 Review 通过） |
| **T9** 资产 / 原型 | 配图、原型 | `docs/images/readme/` |
| **T0** 横切 | 凡 Agent 改动的 repo 内文件 | `docs/history/{date}/commit-history.md` |

同一对话可含多个单元：分别判定、分别维护。

## T0：commit-history 规则

- 路径：`docs/history/{YYYY-MM-DD}/commit-history.md`（不存在则新建）
- **新任务** → 末尾追加 `## N. {slug}`
- **同 slug 继续改** → 原地更新该块，不新增编号
- **只记本轮 Agent 改动的文件**；用户自行改的 `src/` 等 **不写入、不 commit**

## 交付摘要格式

```markdown
## 交付摘要 — {YYYY-MM-DD}

### 工作单元
1. [T3] {theme} / {task}
2. [T0] commit-history

### 已维护文件
- …

### Review 重点
- 用户应重点检查什么（具体、可操作）
- 如何验证（命令、页面、diff 范围）
- 风险 / 未决项（如有）

### 刻意跳过
- …（如用户自行改动）

### 建议 commit 信息（未执行）
{type}({scope}): {summary}

### 下一步
Review 通过后说「commit」；单任务归档说「通过 {task}」；整主题完结 archive reports

### Archive 衔接（只提示，不移动）
- handoff 为 `awaiting-review` → 提示 Review 通过后可归档
- frontmatter 为 `done` 但文件仍在 `handoff/{theme}/` → ⚠️ 提示路径与状态不一致，需补 archive
- 全部 handoff 已在 `handoff/archive/{theme}/` → 提示可 archive `reports/{theme}/`
```

## Archive 衔接

交付**不执行** archive 物理移动；结束时须检查并写入摘要「Archive 衔接」段：

| 检查项 | 动作 |
|---|---|
| handoff `awaiting-review` | 提示：Review 通过后可归档 |
| status `done` 但路径仍在 `handoff/{theme}/` | ⚠️ 警告：仅改 frontmatter 未归档 |
| 全部 task 已在 `handoff/archive/{theme}/` | 提示：可 archive 整个 `reports/{theme}/` |
| 无 handoff 的 brief 主题 | 提示：brief 完结后直接 archive `reports/{theme}/` |

完整归档操作 → [`archive.md`](archive.md)。

## 与 commit / archive 的边界

| 用户说 | Agent 做 |
|---|---|
| 「交付」 | 维护文档 + 摘要 + Archive 衔接提示 + 停止 |
| 「commit / 合并」 | 按 commit-history 合并提交（仅 Agent 自己的文件） |
| 「通过 / LGTM / archive」 | **物理移动** handoff/reports → archive/；关 Issue（见 [`archive.md`](archive.md)） |
