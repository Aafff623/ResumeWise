# CONTEXT.md

## 项目定位

面向**大学生求职场景**的 AI 简历诊断、岗位匹配与优化**演示系统**（大二小学期项目）。

> 核心不是招聘信息管理，而是完成一条闭环：
>
> ```text
> 输入简历 → 选择目标岗位 → AI 诊断 → 展示问题 → 生成优化版本
> ```

定位是一个 Vue3 + Spring Boot 的前后端演示系统：内置若干 Mock 岗位，用户输入简历并选择目标岗位，后端调用 AI 完成结构化诊断、关键词匹配与简历优化，前端以评分、问题列表和原文对照方式展示结果。

**不是**招聘平台、不爬招聘网站、不做登录注册 / 权限 / 数据库 / 管理后台 / 多轮 Agent / 在线聊天 / 自动投递。

## 领域术语表

| 术语 | 英文 | 定义 |
|---|---|---|
| 简历 | Resume | 用户粘贴的简历纯文本；系统唯一输入源 |
| 目标岗位 | Target Job | 用户选择的求职岗位（来自 Mock 岗位库） |
| Mock 岗位 | Mock Job | 静态 JSON 提供的示例岗位（Java 后端、前端、测试、产品、数据等） |
| 岗位关键词 | Job Keyword | 岗位要求的技术 / 能力关键词；用于本地匹配分计算 |
| AI 诊断 | AI Review | 后端调用大模型对「简历 + 目标岗位」做结构化诊断 |
| 综合评分 | Overall Score | 最终展示分；= 关键词匹配分 × 40% + AI 内容分 × 60%（见 ADR-0001） |
| 匹配度 | Match Score | 简历对岗位关键词的覆盖程度（后端本地计算） |
| 关键词匹配分 | Keyword Match Score | 后端按命中关键词比例本地计算，稳定可解释 |
| AI 内容分 | AI Content Score | 大模型对简历表达、项目、技能质量给出的分数 |
| 诊断问题 | Issue | 诊断产出的结构化条目，含 type / description / suggestion |
| 问题类型 | Issue Type | `表达问题` / `项目经历` / `技能描述` / `其他` |
| AI 优化 | AI Optimize | 基于原始简历 + 诊断结果，生成针对目标岗位优化后的简历文本 |
| 修改说明 | Change Note | 优化版本附带的具体修改点列表 |
| AI Mock 模式 | AI Mock Mode | 无真实大模型也能演示：后端规划为 `ai.mock-enabled=true`；**当前静态原型**为顶栏「演示模式 · Mock」（见 ADR-0002） |
| 演示模式 | Demo / Mock Mode | 静态原型顶栏模式：内置示例诊断/优化，无需 Key 与代理 |
| 真实模式 | Live Mode | 静态原型顶栏模式：经本机代理调用 DeepSeek V4；Key 仅存本机 localStorage |
| Prompt 组装 | Prompt Assembly | 后端拼接系统提示 + 简历 + 岗位信息 + 输出格式约束 |
| 前端 | Web | `resume-web`：当前为 `src/` 静态原型；规划 Vue3 单页 |
| 后端 | API | `resume-api`，Spring Boot REST 服务（规划中） |
| 大模型 API | LLM API | **规划**由后端调用（ADR-0003）；当前原型演示用本机代理 + 浏览器 Key（答辩过渡） |

## 关键约束

1. **AI 必须经后端调用**：前端不直连大模型 API；API Key 仅存后端本地配置 / 环境变量，**永不入库**。
2. **评分不完全依赖 AI**：关键词匹配分后端本地算，AI 内容分由模型给出，两者加权得到综合评分（ADR-0001），保证答辩可解释、结果稳定。
3. **必须提供 AI Mock 模式**：`ai.mock-enabled=true` 时返回固定结构化结果；真实 API 不可用（额度 / 网络 / Key）时系统仍可演示（ADR-0002）。
4. **无数据库**：岗位用 `resources/mock/jobs.json`；简历缓存用前端 `localStorage`；不引入 MySQL / Redis。
5. **范围克制**：不做文件解析（Word/PDF/OCR）、爬虫、推荐算法、登录注册、企业端、消息队列、微服务、复杂图表大屏。
6. **范围闭环优先**：其他部分可简单，但 AI 调用必须形成完整闭环 —— 输入 → 请求态 → AI 返回 → 结构化展示 → 生成优化版本。
7. **术语一致**：Issue、PRD、代码命名、接口字段使用本表词汇；缺口先补术语再写代码。
8. **PRD 门禁**：功能开发前须有 `docs/output/reports/{theme}/prd.md` 且 `status: approved`（纯文档 / 初始化除外）。
9. **密钥与本地配置不入库**：AI API Key 只写 `application-local.*` 或环境变量。

## 技术栈

| 层 | 技术 | 路径 |
|---|---|---|
| 前端 | 当前：`resume-web/src` 静态原型（HTML/CSS/JS）；规划：Vue3 · Vite · Element Plus · Axios | `resume-web/` |
| 后端 | Spring Boot 3 · Spring Web · Jackson · Lombok（规划中） | `resume-api/` |
| 数据 | `resources/mock/*.json` + 前端 `localStorage` | — |
| 大模型 | 后端调用（可配置 Mock） | — |

不引入：MySQL、Redis、登录注册、权限、管理后台、微服务、消息队列。

## 文件结构（仓库级）

```
/
├── AGENTS.md                 # 跨工具硬约束入口
├── CLAUDE.md                 # 维护协议与偏好归档
├── CONTEXT.md                # 本文件（产品域）
├── CONTEXT-MAP.md            # 多上下文地图（web / api）
├── README.md                 # 给人看的说明与启动
├── docs/
│   ├── README.md             # docs 索引
│   ├── agents/               # Agent 规则与任务流
│   ├── adr/                  # 架构决策
│   ├── contexts/             # 分端 CONTEXT（web / api）
│   ├── knowledge/            # 可迁移知识
│   ├── history/              # 攒批 commit 记录
│   ├── images/readme/        # README 配图
│   ├── deliver/              # 交付用户：运行说明 · 答辩稿
│   └── output/               # PRD、handoff、decks
├── resume-web/               # 前端工程（源码在 resume-web/src）
└── resume-api/               # Spring Boot 后端（规划中）
```

## 常用约定

- 主题与任务目录名：`kebab-case` 英文（如 `resume-review-mvp`）。
- 接口路径前缀：`/api/ai/*`、`/api/jobs`。
- Mock 数据：`resume-api/src/main/resources/mock/jobs.json`、`resumes.json`。
- Agent 产物：PRD → `docs/output/reports/{theme}/`；handoff → `docs/output/handoff/{theme}/{task}.md`。

分端细节见 [`CONTEXT-MAP.md`](CONTEXT-MAP.md)。
