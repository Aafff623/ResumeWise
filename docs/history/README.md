# history/ — 攒批 commit 记录

按日期记录 Agent 改动的文件，用于攒批合并提交。

## 规则

- 路径：`docs/history/{YYYY-MM-DD}/commit-history.md`（不存在则新建）。
- 一天一文件；同一天多任务追加到同一文件。
- **只记 Agent 本轮改动的文件**；用户自行改的不写入、不 commit。
- 任务完成的默认终点是 **Review，不是 commit**；用户说「commit」后才生成提交。

## 模板

```markdown
# Commit History — {YYYY-MM-DD}

## 1. {slug}

- **类型**：feat / fix / docs / chore / …
- **范围**：{scope}
- **文件**：
  - path/to/file
- **说明**：一句话
```
