---
theme: model-resumes
status: draft
updated: 2026-07-10
purpose: 样板/模范简历调研需求 brief — 交给网页端 GPT / Grok 做搜集与分析后回传资产
---

# 样板简历（模范简历）调研 Brief

## 1. 背景

ResumeWise 诊断与优化的参照不是「泛泛的好简历」，而是：

```text
用户简历  ×  目标岗位要求  ×  该岗位对应的样板/模范简历
```

**样板简历（Model Resume / 模范简历）** 是每个 Mock 岗位的配套资产，用于：

- 计算匹配度时的结构与表达参照；
- Agent 诊断「差在哪」时的对照物；
- 生成优化版时的风格与信息密度锚点；
- 演示模式（Mock）与真实对接模式（如 DeepSeek）共用同一数据形状。

## 2. 必须覆盖的岗位（与产品一致）

| jobId | 岗位名称 | 侧重 |
|---|---|---|
| `java` | Java 后端开发实习生 | Spring Boot、REST、MySQL、Git |
| `frontend` | 前端开发实习生（Vue） | Vue3、JS、组件化、工程化 |
| `test` | 软件测试实习生 | 用例、缺陷、接口测试 |
| `product` | 产品经理 / 产品助理实习生 | 需求、原型、文档 |
| `data` | 数据分析实习生 | SQL、Excel、可视化 |

每个岗位 **至少 1 份** 样板简历；条件允许时每岗 2 份（「扎实版 / 亮点版」）。

## 3. 希望搜集到的资产形态

优先级从高到低：

1. **纯文本 `.txt` / `.md`**（首选，系统输入本身是纯文本）
2. **可复制正文的网页 / 文档**（需可导出为文本）
3. **PDF / Word**（可接受，后续会人工或脚本抽成纯文本；注意版权）

每份样板请尽量附带：

| 字段 | 说明 |
|---|---|
| `jobId` | 对应上表 |
| `title` | 如「Java 后端实习 · 样板 A」 |
| `source` | 来源 URL 或说明 |
| `license_note` | 是否可教学演示使用、是否需脱敏 |
| `level` | 大二/大三/应届实习 等 |
| `keywords` | 与岗位对齐的关键词列表 |
| `body` | 完整简历纯文本 |
| `highlights` | 3–5 条「为什么算好简历」要点 |

## 4. 样板简历内容质量标准（验收）

- 中文为主，符合国内互联网/软件实习简历习惯；
- 含：基本信息（可虚构脱敏）、教育、技能、项目（≥1）、可选校园/实习；
- **有量化或结果导向表述**（人数、耗时、指标、模块职责）；
- 项目描述能映射到该岗位关键词；
- 长度适中：约 400–1200 字纯文本（过短无对比价值，过长难演示）；
- **禁止**真实隐私（手机、邮箱用示例脱敏）；禁止抄袭标注不清的付费模板整篇商用文。

## 5. 与系统数据模型的对齐（回传时按此组织）

建议最终整理为 JSON 列表（或等价表格），单条示意：

```json
{
  "jobId": "java",
  "jobTitle": "Java 后端开发实习生",
  "requirements": ["Java", "Spring Boot", "MySQL", "RESTful API", "Git"],
  "modelResumes": [
    {
      "id": "java-model-a",
      "title": "校园项目向 · 扎实版",
      "body": "……完整纯文本……",
      "highlights": ["项目职责清晰", "技术栈与 JD 对齐", "有协作与 Git 描述"]
    }
  ]
}
```

## 6. 调研范围边界

**要做：** 公开可引用的实习简历范例、校园招聘导向范文、教辅站点示例（脱敏）。

**不做：** 爬取付费简历库、泄露真实个人信息、企业内推私密 JD 全文。

## 7. 回传给仓库 Agent 的方式

请将结果打包为例如：

```text
model-resumes-pack/
  README.md          # 来源与使用说明
  jobs.json          # 或分岗位 md
  java/
    model-a.txt
    meta.md
  frontend/
    ...
```

或直接多个 PDF + 一份 `index.md` 映射 jobId。Agent 再写入 `resume-api` Mock 与前端原型。

## 8. 关联文档

- 提问清单：同目录 `model-resume-research-qa.md`
- 产品域：根目录 `CONTEXT.md`（术语：目标岗位、岗位关键词、AI 诊断、AI Mock）
- 前端静态标杆：`docs/output/reports/ui-prototype/html-src/`
