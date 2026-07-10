# ADR-0003: 大模型 API 一律经后端调用

## Status

Accepted

## Context

大模型 API 需要 API Key 鉴权。若前端直接调用，Key 必然暴露在浏览器（即使混淆也可被抓包），且：

- 前端无法做 Prompt 组装的统一管理；
- 无法对返回结果做 JSON 校验与容错；
- 无法实现 Mock 模式切换；
- 体现不出后端的存在价值（项目是前后端分离架构，后端不能沦为空壳）。

## Decision

**前端禁止直连大模型 API。** AI 调用链为：

```
前端提交简历文本 + jobId
    ↓
Spring Boot 接收请求（/api/ai/review | /api/ai/optimize）
    ↓
后端组装 Prompt（系统提示 + 简历 + 岗位 + 输出格式约束）
    ↓
后端调用大模型 API（或 Mock 模式直接返回）
    ↓
后端校验并解析 JSON → 标准化 DTO
    ↓
返回前端展示
```

API Key 仅存于：

- `application-local.properties` / `application-local.yml`（已在 `.gitignore`）
- 或环境变量

`application.properties` 只放占位符与示例，不放真实 Key。

## Consequences

- 优点：Key 不暴露；Prompt 统一管理；可做 Mock 切换；后端有实质职责（Prompt 组装 + 结果校验）；答辩可讲清前后端分工。
- 代价：引入一次后端往返延迟（可接受）。
- 前端只与 `/api/ai/*` 交互，不感知底层是真实 API 还是 Mock。
