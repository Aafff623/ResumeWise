# Issue tracker: GitHub

本仓库的 issue 和 PRD 以 GitHub issue 的形式存在。所有操作都通过 `gh` CLI 进行。

> 仓库远程地址待 `git remote add origin` 后从 `git remote -v` 推断；在 clone 目录中运行时 `gh` 会自动处理。

## 约定

- **创建 issue**：`gh issue create --title "..." --body "..."`。多行 body 使用 heredoc。
- **查看 issue**：`gh issue view <number> --comments`，可通过 `jq` 过滤评论并获取标签。
- **列出 issue**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，并视情况添加 `--label` 和 `--state` 过滤。
- **评论 issue**：`gh issue comment <number> --body "..."`
- **添加 / 移除标签**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭 issue**：`gh issue close <number> --comment "..."`

## 当 skill 说“发布到 issue tracker”

创建一个 GitHub issue。

## 当 skill 说“获取相关 ticket”

运行 `gh issue view <number> --comments`。

## 与 docs/output 的映射

| Issue 角色 | 本地文档 |
|---|---|
| Epic（主题） | `docs/output/reports/{theme}/prd.md` |
| 子 Issue（任务） | `docs/output/handoff/{theme}/{task}.md` |
| 完结 | 物理移动至 `docs/output/{reports,handoff}/archive/{theme}/` |

任务流详见 [`workflow.md`](workflow.md)。
