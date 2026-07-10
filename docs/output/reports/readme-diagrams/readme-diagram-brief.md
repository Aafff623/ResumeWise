---
theme: readme-diagrams
status: draft
updated: 2026-07-10
---

# README 配图生成 Brief — ResumeWise

README 配图终稿目录：`docs/images/readme/`，文件名即契约（见下表）。出图由用户在网页端 / 指定工具完成；Agent 负责 brief 与结构化 prompt。

## 配图清单（文件名契约）

| 文件 | 用途 | 建议尺寸 |
|---|---|---|
| `banner.png` | 页首横幅 | 3:1（如 1200×400） |
| `features.png` | 核心功能模块一览 | 16:9 |
| `architecture.png` | 系统架构（前端↔后端↔大模型） | 16:9 |
| `tech-stack.png` | 技术栈分层 | 16:9 |
| `workflow.png` | 用户主链路（简历→岗位→诊断→优化） | 16:9 |
| `structure.png` | 仓库目录结构 | 自适应 |

> 功能与视觉验收后补 `showcase-*.png`（Phase C）。

## 视觉主题（提炼自产品域）

- **基调**：简洁、现代、偏蓝紫科技感（区别于文旅仓的暖色）；适合「AI + 求职」。
- **可画节点**：简历图标、岗位卡片、评分环形图、关键词标签（命中/缺失双色）、问题列表、左右对照视图、大模型节点。
- **配色建议**：主色 `#4F6BED`（蓝紫）/ 辅 `#22C55E`（命中绿）/ `#EF4444`（缺失红）/ 中性灰。
- **风格**：扁平、等距轻立体（isometric-lite），无照片素材，全矢量感。

---

## 逐图 Prompt（中文，可直接喂出图工具）

### 1. banner.png

```
扁平化现代风格的横幅插画，3:1 比例。左侧是一份简历文档图标（带勾选标记），
中间是发光的 AI 大脑 / 芯片节点，右侧是一顶毕业帽 + 「Offer」信封。
整体蓝紫主色(#4F6BED)，辅以白色和浅灰，极简矢量风格，无文字，干净背景。
传达「AI 帮大学生优化简历、拿 offer」的概念。
```

### 2. features.png

```
扁平图标网格图，6 个圆角卡片，每个卡片含一个线性图标 + 标题：
1) 简历输入（文档图标）
2) 岗位选择（靶心图标）
3) AI 智能诊断（大脑+齿轮）
4) 关键词匹配（标签打勾/打叉）
5) 简历优化（魔法棒）
6) 对照导出（左右分栏+下载）
蓝紫主色，白色背景，等距排列，现代科技感，无照片。
```

### 3. architecture.png

```
系统架构图，从左到右三个区块，用箭头连接：
[Vue3 前端 resume-web] ←HTTP→ [Spring Boot 后端 resume-api] ←HTTPS→ [大模型 API]
后端区块内部标注三个子模块：Prompt 组装 / 评分计算(本地+AI加权) / Mock 模式。
前端区块标注：4 个页面。后端下方标注 Mock JSON 数据。
蓝紫色系，扁平矢量，圆角矩形，清晰箭头，中文标签。
```

### 4. tech-stack.png

```
技术栈分层图，三层水平堆叠：
顶层「前端」：Vue3 | Vite | Element Plus | Axios
中层「后端」：Spring Boot 3 | Spring Web | Jackson | Lombok
底层「数据/AI」：Mock JSON | localStorage | 大模型API(后端调用)
每层一个色带（前=蓝、后=紫、数据=灰），左侧标层名，右侧用 logo 风格小方块列技术。
扁平、现代、中文。
```

### 5. workflow.png

```
用户主链路横向流程图，5 个步骤用箭头串联：
① 粘贴简历 → ② 选择目标岗位 → ③ AI 诊断(评分+问题) → ④ 查看结果 → ⑤ 生成优化版本
第③步下方挂评分环形图小图标，第⑤步下方挂「原始|优化」左右对照小图标。
蓝紫主色，圆角节点，扁平矢量，中文，无照片。
```

### 6. structure.png

```
仓库目录树可视化（不是纯文本，而是带图标和层级缩进的扁平插画）：
根目录 ResumeWise/
├─ resume-web/   (前端，蓝色文件夹图标)
├─ resume-api/   (后端，紫色文件夹图标)
└─ docs/         (文档，灰色文件夹图标)
     ├─ adr/  agents/  contexts/  knowledge/
     └─ output/{reports,handoff}
每级用细线连接，中文/英文标签，干净背景。
```

---

## 出图流程

1. 用户按上方 prompt 在 GPT Image / 等价工具出图。
2. PNG 落到 `docs/images/readme/`，文件名严格对齐上表。
3. Agent 更新 README 引用（相对路径 `docs/images/readme/xxx.png`）。
4. 文件名一旦写入 README 不得擅改；增图先改本 brief。
