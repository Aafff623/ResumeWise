# Commit History — 2026-07-10

## 1. project-init

- **类型**：docs / chore
- **范围**：仓库初始化
- **说明**：按 `docs/knowledge/project-init.md` 执行 Phase A→B→C，建立 ResumeWise（AI 简历诊断演示系统）的仓库资产骨架。
- **文件**：
  - `.gitignore`
  - `README.md`
  - `CONTEXT.md` · `CONTEXT-MAP.md`
  - `AGENTS.md` · `CLAUDE.md`
  - `docs/README.md`
  - `docs/agents/{workflow,deliver,archive,context,language,domain,issue-tracker,triage-labels}.md`
  - `docs/adr/{0000-record-architecture-decisions,0001-scoring-formula,0002-ai-mock-mode,0003-llm-via-backend-only}.md`
  - `docs/contexts/{web,api}/CONTEXT.md`
  - `docs/knowledge/README.md` · `docs/history/README.md`
  - `docs/output/reports/readme-diagrams/readme-diagram-brief.md`
- **状态**：awaiting-review（用户 Review 中；尚未 commit）

## 建议 commit 信息（未执行）

```
docs: initialize ResumeWise repo assets (project-init Phase A–C)

- root: AGENTS/CLAUDE/CONTEXT/CONTEXT-MAP/README
- docs/agents: workflow + deliver/archive/context/language/domain/triage/issue-tracker
- docs/adr: 0000 ADR baseline · 0001 scoring formula · 0002 AI mock mode · 0003 LLM via backend
- docs/contexts: web + api per-end CONTEXT
- docs/output: readme-diagrams brief
- .gitignore
```
