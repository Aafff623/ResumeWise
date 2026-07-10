# ADR-0002: 提供 AI Mock 模式

## Status

Accepted

## Context

真实大模型 API 存在三类风险，任何一类都会让答辩现场演示翻车：

1. **额度耗尽**：免费额度用完，调用返回 402/429。
2. **网络故障**：演示现场网络不稳定或无法访问 API 端点。
3. **Key 失效**：API Key 过期、被回收，或本机配置丢失。

如果系统**只在真实 API 可用时才能跑**，演示鲁棒性太差。

## Decision

后端提供 **AI Mock 模式**，由配置项控制：

```properties
# application.properties
ai.mock-enabled=true
```

| 模式 | 行为 |
|---|---|
| `ai.mock-enabled=true`（默认，演示用） | `/api/ai/review`、`/api/ai/optimize` 直接返回**预设的固定结构化结果**，不调用任何外部 API |
| `ai.mock-enabled=false` | 走真实大模型 API 调用链 |

Mock 返回的数据结构必须与真实模式**完全一致**（同一 DTO），前端无感知切换。

## Consequences

- 优点：答辩现场 API 不可用时系统仍完整可演示；开发期前端可脱离真实 Key 联调；CI 不依赖外部服务。
- 代价：Mock 数据需手工维护一份「看起来合理」的诊断结果与优化简历，放在 `resources/mock/` 下。
- 切换方式：改配置重启即可；不在运行时动态切换。
- Mock 数据应覆盖诊断与优化两个接口，且与示例简历 / 示例岗位配套，保证演示链路自洽。

关联：Mock 数据放置见 `docs/contexts/api/CONTEXT.md`；接口契约见 PRD。
