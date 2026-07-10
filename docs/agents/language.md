# 共享语言

Agent 输出（issue 标题、接口名、测试名、注释）必须使用下表词汇。完整定义见根目录 `CONTEXT.md` §领域术语表。

## Issue tracker

| 术语 | 定义 | 避免 |
|---|---|---|
| **Issue tracker** | 本仓库的 GitHub Issues | backlog manager、ticket 系统 |
| **Issue** | tracker 中的单条工作单元 | ticket（除非引用外部系统原文） |
| **Triage role** | issue 上的 canonical 状态角色 | 自定义状态名 |

Triage 角色与标签字符串映射见 `triage-labels.md`。

## 任务流

| 术语 | 定义 |
|---|---|
| **主题** | theme；一个 Epic / 倡议，`reports/{theme}/` 与 `handoff/{theme}/` 同名 |
| **任务** | task；PRD 拆分后的工作单元，对应子 Issue + `handoff/{theme}/{task}.md` |
| **PRD** | 需求文档；`reports/{theme}/prd.md`，用户确认前 `draft` |
| **Handoff** | 任务接力文件；一任务一文件，持续更新 |
| **Review** | 用户确认交付；通过前 Agent 停止 |
| **Archive** | `reports/archive/`、`handoff/archive/`；已确认完结 |
| **Knowledge** | `docs/knowledge/`；跨项目可迁移经验；写入须用户 Review |

流程详见 `workflow.md`。

## 领域（AI 简历诊断）

| 术语 | 英文 | 简述 |
|---|---|---|
| 简历 | Resume | 用户粘贴的简历纯文本 |
| 目标岗位 | Target Job | 用户选择的求职岗位 |
| Mock 岗位 | Mock Job | 静态 JSON 示例岗位 |
| 岗位关键词 | Job Keyword | 用于本地匹配计算的关键词 |
| AI 诊断 | AI Review | 后端调用大模型的结构化诊断 |
| 综合评分 | Overall Score | 关键词匹配分 40% + AI 内容分 60% |
| 匹配度 | Match Score | 关键词覆盖度（后端本地算） |
| 关键词匹配分 | Keyword Match Score | 后端本地计算 |
| AI 内容分 | AI Content Score | 大模型给出 |
| 诊断问题 | Issue | 结构化条目（type/description/suggestion） |
| 问题类型 | Issue Type | 表达 / 项目经历 / 技能描述 / 其他 |
| AI 优化 | AI Optimize | 生成针对岗位优化后的简历 |
| 修改说明 | Change Note | 优化版附带的修改点列表 |
| AI Mock 模式 | AI Mock Mode | 返回固定诊断结果，无需真实 API |
| Prompt 组装 | Prompt Assembly | 后端拼接提示词 |
| 前端 | Web | `resume-web` |
| 后端 | API | `resume-api` |
| 大模型 API | LLM API | 由后端调用，前端禁直连 |

## 上下文（两端）

| 术语 | 定义 |
|---|---|
| **Context** | `CONTEXT-MAP.md` 中的一个文档边界（product / web / api） |
| **CONTEXT-MAP** | 根目录地图，指向各 `CONTEXT.md` |

术语缺口：先查根 `CONTEXT.md` 与对应 `docs/contexts/*/CONTEXT.md`；确需新词时与用户确认后再写入。
