# ADR-0000: Record architecture decisions

## Status

Accepted

## Context

本项目从零搭建 AI 简历诊断演示系统（Vue3 + Spring Boot，无数据库）。技术选型、评分策略、AI 接入方式会随 PRD 演进，需要可追溯的决策记录，避免答辩时被追问「为什么这么做」答不上来。

## Decision

采用 Architecture Decision Records，存放于 `docs/adr/`，编号 `000N-kebab-title.md`。

后续已裁定决策：

- ADR-0001：评分 = 关键词匹配分（本地）× 40% + AI 内容分（模型）× 60%；不纯靠 AI
- ADR-0002：提供 AI Mock 模式（`ai.mock-enabled=true`），真实 API 不可用时仍可演示
- ADR-0003：AI 调用一律经后端，前端禁止直连大模型（避免 Key 暴露）

## Consequences

- 重大技术分叉必须先补 ADR 再大规模改代码
- Agent 输出若与已有 ADR 冲突须显式标注
- 答辩材料可直接引用 ADR 解释设计动机
