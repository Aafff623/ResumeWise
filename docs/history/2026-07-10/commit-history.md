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

---

## 2. ui-prototype / prototype-images

- **类型**：docs / design
- **范围**：前端界面原型出图
- **说明**：按 `ui-prototype-brief.md` 产出 4 主页面 + 2 状态变体高保真原型图；HTML/CSS 可复刻源 + Playwright 截图；AI 补充 Hero 插图；风格专业普通（Element Plus 气质）。
- **文件**：
  - `docs/images/prototype/prototype-home.png`
  - `docs/images/prototype/prototype-optimize.png`
  - `docs/images/prototype/prototype-optimize-disabled.png`
  - `docs/images/prototype/prototype-review.png`
  - `docs/images/prototype/prototype-review-loading.png`
  - `docs/images/prototype/prototype-result.png`
  - `docs/images/prototype/assets/hero-illustration.jpg`
  - `docs/images/prototype/assets/feature-icons.jpg`
  - `docs/output/reports/ui-prototype/html-src/*`
  - `docs/output/reports/ui-prototype/ui-prototype-brief.md`（状态与自检更新）
  - `docs/output/handoff/ui-prototype/prototype-images.md`
- **状态**：awaiting-review（用户 Review 中；尚未 commit）

### 建议 commit 信息（Web 桌面 · 用户已授权分批 commit）

```
docs(ui-prototype): add desktop high-fidelity UI prototypes

- 4 main pages + disabled/loading variants (PNG)
- HTML/CSS sources + AI hero assets
```

### 建议 commit 信息（移动端）

```
docs(ui-prototype): add mobile UI prototype screenshots

- home/optimize/review/result mobile (390px)
- mobile.css + mobile HTML sources + preview index
```
