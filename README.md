<div align="center">

# ResumeWise · AI 简历诊断与优化系统

*输入简历，选定岗位，AI 帮你看清问题，再给一份更对口的版本。*

🎓 面向大学生求职场景的 AI 简历诊断、岗位匹配与优化**演示系统**（大二小学期项目）。
不是招聘平台——只做一条闭环：**简历 → 目标岗位 → AI 诊断 → 展示问题 → 生成优化版本**。

</div>

<p align="center">
  <img src="docs/images/readme/banner.png" alt="ResumeWise Banner" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-Vue3_%7C_Spring_Boot_3-blue?style=for-the-badge" alt="Stack">
  <img src="https://img.shields.io/badge/AI-via_Backend_Only-9b59b6?style=for-the-badge" alt="AI via backend">
  <img src="https://img.shields.io/badge/Scoring-Local_40%25_%2B_AI_60%25-2ecc71?style=for-the-badge" alt="Scoring">
  <img src="https://img.shields.io/badge/Demo-AI_Mock_Mode-brightgreen?style=for-the-badge" alt="Mock mode">
  <img src="https://img.shields.io/badge/DB-None(Mock_JSON)-lightgrey?style=for-the-badge" alt="No DB">
</p>

<p align="center">
  <a href="#为什么做这个">💡 为什么</a> ·
  <a href="#功能">✨ 功能</a> ·
  <a href="#演示">📱 演示</a> ·
  <a href="#快速开始">🚀 快速开始</a> ·
  <a href="#架构">🏗️ 架构</a> ·
  <a href="#路线图">🗺️ 路线图</a> ·
  <a href="#文档">📚 文档</a>
</p>

---

## 为什么做这个

大学生写简历投实习，常见三类问题：

- **不知道差在哪**：简历写完自我感觉良好，其实项目描述空洞、技能堆砌、表达偏笼统；
- **不知道岗位要什么**：不懂目标岗位的关键词，简历和 JD 对不上；
- **不知道怎么改**：诊断出一堆问题，但没有一份「改完之后应该长什么样」的对照。

ResumeWise 把这条链路做成一个可演示的闭环：用 **Mock 岗位 + 后端调用大模型**，给出评分、关键词覆盖、结构化问题，并直接生成一份针对目标岗位优化后的简历，左右对照展示。

| 能力 | 产品职责 |
|---|---|
| 简历输入 | 粘贴文本或一键填充示例简历 |
| 岗位选择 | 内置 5 个 Mock 岗位（Java / 前端 / 测试 / 产品 / 数据） |
| AI 诊断 | 综合评分、匹配度、命中/缺失关键词、结构化问题 + 优化建议 |
| AI 优化 | 针对岗位生成优化版简历，原始↔优化左右对照 |
| 演示鲁棒 | **AI Mock 模式**：真实 API 挂了也能完整演示（ADR-0002） |

> **边界：** 不做文件解析（Word/PDF/OCR）、招聘爬虫、推荐算法、登录注册、企业端、数据库、多轮 Agent、在线聊天、自动投递。

---

## 功能

<p align="center">
  <img src="docs/images/readme/features.png" alt="ResumeWise 核心功能模块" width="80%">
</p>

| 功能 | 说明 |
|---|---|
| **简历输入** | 粘贴简历纯文本，或点击「使用示例简历」一键填充 |
| **岗位选择** | 从 Mock 岗位库选择目标岗位，每个岗位带关键词列表 |
| **AI 智能诊断** | 综合评分、岗位匹配度、已匹配 / 缺失关键词、表达/项目/技能问题、优化建议 |
| **评分可解释** | 综合评分 = 关键词匹配分（本地算）× 40% + AI 内容分（模型）× 60%（ADR-0001） |
| **AI 简历优化** | 基于诊断结果生成针对岗位优化的完整简历文本 |
| **左右对照** | 原始简历 ↔ AI 优化简历 并排展示，附修改说明 |
| **复制 / 导出** | 一键复制优化结果；可选导出 `.txt` |
| **本地缓存** | `localStorage` 保存最近一次简历，刷新不丢 |

---

## 演示

### 推荐演示路径

```
粘贴简历（或用示例） → 选择目标岗位 → 点击「AI 诊断」
  → 查看评分 / 匹配度 / 关键词 / 问题列表
  → 点击「生成优化版本」→ 原始 ↔ 优化 左右对照 → 复制
```

### Showcase

应用界面截图将在前后端主链路跑通、视觉验收后补充 📸，本节暂时保留展示位。

<!--
后续建议截图槽位（Playwright 采集后填入 docs/images/readme/）：

1. 首页 / 开始优化入口
2. 简历优化页（左输入 + 右岗位选择）
3. AI 诊断页（评分卡 + 关键词 + 问题列表）
4. 优化结果页（原始 ↔ 优化 对照）
-->

> 当前为 `project-init` 阶段产物，业务代码（`resume-web` / `resume-api`）待首个业务 PRD 批准后开发。

---

## 快速开始

> ⚠️ `resume-web/` 与 `resume-api/` 尚未创建（待业务 PRD）。下方为目标启动方式，代码就绪后即可照此运行。

### 前置环境

| 组件 | 版本 | 备注 |
|---|---|---|
| JDK | 21 | 后端 Spring Boot 3 |
| Maven | 3.9 | 后端构建 |
| Node.js | 18+ | 前端工具链 |
| pnpm | 任意近期 | 前端包管理（推荐） |

> **不需要** MySQL / Redis —— 本项目无数据库（ADR：Mock JSON + localStorage）。

### 后端（`resume-api`）

```bash
cd resume-api
mvn spring-boot:run     # 默认 8080；AI Mock 模式开箱即用
```

默认 `ai.mock-enabled=true`，无需真实 API Key 即可演示。接真实大模型见 [`docs/adr/0002-ai-mock-mode.md`](docs/adr/0002-ai-mock-mode.md)。

### 前端（`resume-web`）

```bash
cd resume-web
pnpm install
pnpm dev                # 默认 5173；已配代理 /api → localhost:8080
```

打开 `http://localhost:5173`，按「推荐演示路径」操作。

<details>
<summary>新成员阅读顺序</summary>

| 顺序 | 路径 | 目的 |
|---|---|---|
| 1 | `README.md` | 定位、跑起来、边界 |
| 2 | `CONTEXT.md` · `CONTEXT-MAP.md` | 术语与两端地图 |
| 3 | `AGENTS.md` · `CLAUDE.md` | 任务流与 Agent 纪律 |
| 4 | `docs/adr/` | 评分、Mock、AI 经后端三大决策 |
| 5 | 对应端源码 + `docs/contexts/*/CONTEXT.md` | 实施 |

</details>

---

## 架构

<p align="center">
  <img src="docs/images/readme/architecture.png" alt="系统架构图" width="80%">
</p>

- **`resume-web`**：Vue3 单页应用；4 个页面；Axios 调 `/api/*`；`localStorage` 缓存简历
- **`resume-api`**：Spring Boot 3 REST 服务；Mock 岗位接口 + AI 诊断/优化接口；Prompt 组装 + 结果校验
- **大模型 API**：**只能由后端调用**（ADR-0003）；前端禁直连，Key 不入库
- **数据**：`resources/mock/*.json`（岗位/示例简历/Mock 结果）+ 前端 `localStorage`

### 技术栈

<p align="center">
  <img src="docs/images/readme/tech-stack.png" alt="技术栈分层图" width="80%">
</p>

| 层级 | 技术 | 路径 |
|---|---|---|
| 前端 | Vue3 · Vite · Element Plus · Axios | `resume-web/` |
| 后端 | Spring Boot 3 · Spring Web · Jackson · Lombok | `resume-api/` |
| 数据 | Mock JSON · `localStorage` | — |

### 主链路

<p align="center">
  <img src="docs/images/readme/workflow.png" alt="用户主链路流程图" width="80%">
</p>

**实现要点：**

- 评分 = 关键词匹配分 × 40% + AI 内容分 × 60%（ADR-0001），确定性 + 智能性结合
- AI Mock 模式（ADR-0002）：真实 API 不可用时返回固定结构化结果，演示不翻车
- 大模型一律经后端（ADR-0003）：Key 不暴露，Prompt 统一管理

### 目录结构

<p align="center">
  <img src="docs/images/readme/structure.png" alt="仓库目录结构图" width="80%">
</p>

---

## 路线图

| 阶段 | 状态 | 说明 |
|---|:---:|---|
| Phase 0 仓库资产 / ADR / docs 骨架 | ✅ | init 完成（本阶段产物） |
| Phase 1 后端 Mock 岗位 + AI 诊断/优化接口 | ⚪ | 待 PRD |
| Phase 2 前端 4 页面闭环 | ⚪ | 待 PRD |
| Phase 3 AI 接真实模型 + 配图 + 截图 | ⚪ | 待 PRD |

---

## 文档

| 文档 | 说明 |
|---|---|
| [`CONTEXT.md`](CONTEXT.md) | 产品域事实、术语、约束 |
| [`CONTEXT-MAP.md`](CONTEXT-MAP.md) | 两端上下文地图 |
| [`AGENTS.md`](AGENTS.md) · [`CLAUDE.md`](CLAUDE.md) | Agent 入口与维护协议 |
| [`docs/README.md`](docs/README.md) | 文档资产索引 |
| [`docs/adr/0001-scoring-formula.md`](docs/adr/0001-scoring-formula.md) | 评分加权公式 |
| [`docs/adr/0002-ai-mock-mode.md`](docs/adr/0002-ai-mock-mode.md) | AI Mock 模式 |
| [`docs/adr/0003-llm-via-backend-only.md`](docs/adr/0003-llm-via-backend-only.md) | 大模型经后端调用 |
| [`docs/contexts/`](docs/contexts/) | web / api 分端 CONTEXT |
| [`docs/output/reports/readme-diagrams/readme-diagram-brief.md`](docs/output/reports/readme-diagrams/readme-diagram-brief.md) | README 配图生成说明 |

任务流：GitHub Issues + `docs/output/handoff/`；完结归档见 `docs/output/*/archive/`。

---

## License

本项目为大二小学期课程作业，暂不设开源 License。
