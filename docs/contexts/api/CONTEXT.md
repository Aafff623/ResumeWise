# API 端 CONTEXT — `resume-api`

> 先读根 [`CONTEXT.md`](../../../CONTEXT.md)。本文件只写后端实现约定。

## 技术栈

| 项 | 值 |
|---|---|
| 框架 | Spring Boot 3.x |
| JDK | 21（本机已装 OpenJDK 21） |
| 构建 | Maven 3.9 |
| 依赖 | spring-boot-starter-web、Jackson、Lombok |
| HTTP 客户端 | Spring `RestTemplate` 或 `WebClient`（调大模型用） |

不引入：MyBatis、JPA、MySQL、Redis、Sa-Token、Spring Security。

## 目录结构（计划）

```
resume-api/
├── pom.xml
└── src/main/
    ├── java/com/resumewise/api/
    │   ├── ResumeWiseApplication.java
    │   ├── controller/     # JobController, AiController
    │   ├── service/        # JobService, ReviewService, OptimizeService, LlmClient
    │   ├── domain/         # DTO：ReviewResult, Issue, OptimizeResult, Job…
    │   ├── prompt/         # Prompt 模板组装
    │   ├── scoring/        # 关键词匹配分本地计算
    │   └── config/         # AiProperties（mock-enabled / key / endpoint）
    └── resources/
        ├── application.properties          # 占位 + 示例
        ├── application-local.properties    # 真 Key（gitignore）
        └── mock/
            ├── jobs.json
            ├── resumes.json
            ├── mock-review-result.json
            └── mock-optimize-result.json
```

## 接口（契约）

### 岗位列表

```
GET /api/jobs
→ [{ id, name, company, description, keywords[] }, ...]
```

来源：`resources/mock/jobs.json`。

### AI 诊断

```
POST /api/ai/review
请求: { resumeText: string, jobId: string }
响应: {
  overallScore: number,        // 综合评分（后端加权，见 ADR-0001）
  matchScore: number,          // 关键词匹配分（本地算，0-100）
  contentScore: number,        // AI 内容分（模型给，0-100）
  summary: string,
  matchedKeywords: string[],
  missingKeywords: string[],
  issues: [{ type, description, suggestion }]
}
```

### AI 优化

```
POST /api/ai/optimize
请求: { resumeText: string, jobId: string, reviewResult: object }
响应: {
  optimizedResume: string,
  changes: string[]
}
```

## 评分实现（ADR-0001）

```
overallScore = round(matchScore * 0.4 + contentScore * 0.6)
```

- `matchScore`：后端遍历 `job.keywords`，统计在 `resumeText` 中出现的数量（大小写不敏感、子串匹配），`命中数 / 总数 * 100`。
- `contentScore`：Prompt 要求模型只返回内容分；Mock 模式读 `mock-review-result.json` 的 `contentScore`。
- Prompt 中**明确禁止**模型返回 `overallScore`，避免双重加权。

## AI Mock 模式（ADR-0002）

```properties
ai.mock-enabled=true
ai.base-url=https://api.example.com/v1
ai.api-key=REPLACE_IN_LOCAL
ai.model=xxx
```

- `mock-enabled=true`：`/api/ai/*` 直接读 `resources/mock/mock-*.json` 返回，不联网。
- `mock-enabled=false`：经 `LlmClient` 调真实 API；返回 JSON 经校验后映射为 DTO。

## Prompt 组装要点

- 系统提示：限定输出**纯 JSON**、字段名与 DTO 一致、分数范围 0-100。
- 用户消息：岗位信息（name + keywords）+ 简历全文 + 输出格式示例。
- 结果解析：提取首个 `{...}` JSON 块；字段缺失时给默认值并记日志，不抛 500。

## 约束

1. API Key **永不入库**；只放 `application-local.properties` 或环境变量。
2. 控制器只做参数校验与转发，业务在 service。
3. 统一异常处理：AI 调用失败返回 503 + 友好消息，不泄露堆栈。
4. 跨域：开发期允许 `http://localhost:5173`（Vite 默认）。

## 未决

- 大模型厂商 / 具体模型：待 PRD 阶段与用户确认（通义 / 智谱 / OpenAI 兼容等）。
- 是否异步（SSE / 流式）：暂用同步，控制复杂度。
