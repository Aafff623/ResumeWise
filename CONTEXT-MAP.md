# CONTEXT-MAP

本仓库为**多上下文**布局：产品域事实在根 `CONTEXT.md`；两端实现约定分文件维护。

| Context | 路径 | 范围 |
|---|---|---|
| **product**（共享） | [`CONTEXT.md`](CONTEXT.md) | AI 简历诊断系统定位、领域术语、跨端约束 |
| **web** | [`docs/contexts/web/CONTEXT.md`](docs/contexts/web/CONTEXT.md) | Vue3 前端（`resume-web`） |
| **api** | [`docs/contexts/api/CONTEXT.md`](docs/contexts/api/CONTEXT.md) | Spring Boot 后端（`resume-api`） |

## 阅读规则

1. 任何任务先读根 [`CONTEXT.md`](CONTEXT.md)。
2. 改动落在某一端时，再读对应 context 的 `CONTEXT.md`。
3. 跨端改动（如诊断接口契约贯通前后端）→ 读 product + 涉及的全部 context。
4. 架构决策 → [`docs/adr/`](docs/adr/)；系统级 ADR 优先于单端约定。

消费规则详见 [`docs/agents/domain.md`](docs/agents/domain.md)。
