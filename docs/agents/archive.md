# Archive 归档流程

Review 通过后的**归档层**操作规范。读本文并执行流程。

> 任务流总纲 → [`workflow.md`](workflow.md) §8 · 交付层 → [`deliver.md`](deliver.md)

## 定位

```
交付 → Review → commit（可选）→ archive（用户说通过）→ 物理移动 + 关 Issue
```

| archive 做 | archive 不做 |
|---|---|
| **物理移动** handoff / reports 到 `archive/` | 改代码、写 commit-history |
| 更新 frontmatter `status: done` / `archived` | 代替 Review（须 Review 已通过） |
| 同步 PRD §任务拆分 | 未经用户同意自动 archive |

## reports ↔ handoff 关联

| 规则 | 说明 |
|---|---|
| **同名** | `reports/{theme}/` ↔ `handoff/{theme}/` 必须同名 |
| **单任务** | 一个 `{task}.md` 对应一个子 Issue + 一条 handoff |
| **进行中** | 文件在 `reports/{theme}/`、`handoff/{theme}/` |
| **已完结** | 文件在 `reports/archive/{theme}/`、`handoff/archive/{theme}/` |

**归档 = 移动目录/文件，不是只改 frontmatter。** 若 handoff 标了 `done` 但仍在 `handoff/{theme}/`，说明归档未执行。

## 执行步骤

1. **确认 Review 已通过** — 用户明确说「通过 / LGTM / archive」
2. **解析范围** — `{theme}`、单 `{task}` 或整主题
3. **单任务归档**（见下）
4. **检查主题是否全部 archived** — PRD §任务拆分表内任务是否均在 `handoff/archive/{theme}/`
5. **主题归档**（若全部完成）— 移动整个 `reports/{theme}/`
6. **关 Issue** — 子 Issue；主题完结关 Epic
7. **Review 说明** — 输出移动了哪些文件、archive 路径、未归档项
8. **停止** — 不自动 commit（archive 移动随下次 commit 或用户另说 commit）

## 单任务归档

**前置**：用户 Review 通过。

```
1. handoff/{theme}/{task}.md
     → frontmatter status: done
     → 物理移动至 handoff/archive/{theme}/{task}.md
2. 同步 PRD §任务拆分 中该 task 状态 → done
3. gh issue close {issue}（若有 Issue 号）
```

```bash
mkdir -p docs/output/handoff/archive/{theme}
git mv docs/output/handoff/{theme}/{task}.md docs/output/handoff/archive/{theme}/{task}.md
```

## 主题归档（reports）

**前置**：`handoff/archive/{theme}/` 下已包含该主题**全部**任务 handoff（无遗漏仍在 `handoff/{theme}/`）。

```
1. reports/{theme}/ 整目录
     → 移动至 reports/archive/{theme}/
2. prd.md frontmatter status → archived（若存在）
3. 删除或移空 handoff/{theme}/（应已无文件）
4. 关 Epic Issue
```

```bash
mkdir -p docs/output/reports/archive
git mv docs/output/reports/{theme} docs/output/reports/archive/{theme}
```

## Brief 主题（无 handoff）

仅 `reports/{theme}/` brief、无 handoff 时：

- 用户确认 brief 完结 → 直接 `reports/{theme}/` → `reports/archive/{theme}/`
- 可不建 handoff（workflow §9）

## 归档摘要格式

```markdown
## Archive 摘要 — {YYYY-MM-DD}

### 范围
- 主题：{theme}
- 任务：{task} 或「整主题」

### 已移动文件
- handoff/{theme}/{task}.md → handoff/archive/{theme}/{task}.md
- reports/{theme}/ → reports/archive/{theme}/（若适用）

### 已关闭 Issue
- #{n} …

### 仍未归档（如有）
- …

### Review 重点
- 确认 archive 路径下文件可读
- PRD 表与目录一致

### 下一步
如需提交 git：说「commit」
```
