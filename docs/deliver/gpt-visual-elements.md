# ResumeWise · GPT 视觉素材生成 brief

> 用途：把下面整段复制给 GPT / 图像模型，生成**与简历诊断产品相关**的背景、插画、图标与装饰素材，替换答辩 PPT 里不合适的建筑摄影。  
> 产品真实界面截图请用实机截图，不要用 AI 假 UI。  
> 更新：2026-07-10

---

## 0. 一键总提示（可直接粘贴）

```text
你是产品视觉设计师。请为大学生求职产品「ResumeWise」生成一套统一风格的演示素材（背景、插画、图标、装饰元素）。

【产品是什么】
ResumeWise：AI 简历诊断 / 岗位匹配 / 结构化优化演示系统。
闭环：贴简历 → 选目标岗位 → AI 诊断 → 看问题与分数 → 生成优化版 → 导出。
不是招聘平台、不是聊天机器人、不是炫技 Dashboard。

【风格关键词】
editorial product design, calm typographic grid, warm paper UI, trustworthy career tool,
minimal illustration, soft depth, clean whitespace, Chinese university career context,
“让简历更对口”, not cyberpunk, not purple neon AI, not glassmorphism overload.

【主色板（必须严格遵守）】
- Paper / 背景暖白：#F7F5EF
- Paper-2：#EEECE5
- Ink / 主文字深墨蓝：#101827
- Ink-2：#263146
- Muted 次级文字：#687386
- Cobalt 主强调蓝：#4F63EE
- Blue pale：#EEF0FF
- Mint 正向 / 命中：#29A97F，pale #EAF7F2
- Soft red 风险 / 缺失：#CF5D63，pale #FFF0F1
- Amber 提示：#C89443，pale #FFF7E8
- Line 边框：#DFE2E7
- White 卡片：#FFFFFF

【字体气质】
中文标题像衬线编辑感（Noto Serif / 宋体气质），正文无衬线干净可读。
画面可出现少量英文 eyebrow：RESUME INTELLIGENCE / MATCH / REVIEW / OPTIMIZE

【核心视觉母题（反复出现）】
1. 简历纸张：白色圆角文档卡片、轻微旋转层叠 1–2 层纸
2. 分数徽章：深色方卡里大数字（如 82），表示综合评分
3. 关键词胶囊 tags：圆角 pill，hit=薄荷绿，miss=柔和红，中性=浅灰
4. 对照改写：左右两栏文档，左淡红底删除感，右淡绿底优化感
5. 岗位卡片：列表项 + 彩色技术标签（Java / 前端 / 测试等）
6. 流程五步：输入 → 选岗 → 诊断 → 优化 → 导出（编号 01–05）
7. 双模式：Mock（稳定演示）vs Live（真实模型），用两个平静的路径/开关隐喻，不要机器人脸
8. Brand mark：深色圆角方块里一张小白纸轮廓 + 右下角薄荷绿勾

【必须避免】
- 紫色霓虹、赛博大脑、全息 HUD、机器人握手
- 过度 3D 玻璃拟态、复杂大屏图表、股票金融风
- 建筑地标摄影（与产品无关）
- 假的高保真网页 UI 截图（界面用真实产品截图）
- 文字乱码；关键中文尽量少字、可辨识：简历 / 诊断 / 匹配 / 优化 / 导出

【输出要求】
每张图说明：文件名建议、用途页、画幅比例、构图描述。
无真实人物面孔；可用抽象剪影或纯物件。
统一色温与圆角语言，可组成一套 slide kit。
```

---

## 1. 产品元素提炼（给模型当「世界观」）

| 元素 | 含义 | 可视化建议 |
|---|---|---|
| 简历纸 | 用户唯一输入 | 白卡片、行高、头像块、技能条 |
| 目标岗位 | Mock 岗位库 | 列表卡片 + 技术 tags |
| 关键词匹配 | 本地 40% 分 | 绿 hit / 红 miss pills |
| AI 诊断 | 结构化问题 | 问题列表卡片，优先级标签 |
| 综合评分 | 40% + 60% | 深色大数字 + 两行副分 |
| 优化对照 | 原文 vs 改写 | 左右文档 + 红绿高亮 |
| 修改说明 | change notes | 编号小条列表 |
| 导出 | 可带走 | MD / TXT / PDF / Word 小图标或文件叠 |
| Mock 模式 | 答辩主路径 | 稳定、离线、示例数据感 |
| Live 模式 | 能力预留 | 轻连接感，非科幻 |
| 闭环 | 产品故事 | 横向五步流程 |

**一句话定位（可印在封面）：**  
「让简历更对口」——面向大学生求职的 AI 简历诊断与优化演示系统。

---

## 2. 设计系统硬约束

### 2.1 颜色

| Token | HEX | 用途 |
|---|---|---|
| paper | `#F7F5EF` | 页面/幻灯片浅底 |
| paper-2 | `#EEECE5` | 次级底、截图衬底 |
| ink | `#101827` | 标题、主按钮、分数底 |
| blue | `#4F63EE` | 强调字、主 CTA、步骤号 |
| green | `#29A97F` | 命中、成功、优化后 |
| red | `#CF5D63` | 缺失、原文问题、风险 |
| amber | `#C89443` | 提示、中性告警 |
| line | `#DFE2E7` | 细边框 |
| white | `#FFFFFF` | 卡片 |

### 2.2 形态语言

- 圆角：大面板 ~20px，控件 10–14px，pill 999
- 阴影：轻、冷灰，不要重黑投影
- 网格：克制的 38px 隐网格或杂志分栏
- 装饰：细水平分割线、小色条、数字编号，不要花边

### 2.3 气质对照

| 要像 | 不要像 |
|---|---|
| 编辑感求职工具 | 通用紫色 AI SaaS |
| 暖白纸张 + 钴蓝 | 霓虹赛博 |
| 清晰可信 | 娱乐风插画 |
| 简历/标签/分数物件 | 建筑摄影、城市航拍 |

---

## 3. 建议生成清单（可分批让 GPT 出图）

画幅默认 **16:9**（若 PPT 为宽屏 13.3×7.5，可再要 **21:9 或 16:9 全出血** 版本）。

### A. 背景（Background）

| 文件名建议 | 用途 | 提示要点 |
|---|---|---|
| `bg-paper-grid.png` | 内容页底 | 暖白 #F7F5EF，极淡墨线网格，无文字 |
| `bg-cover-abstract.png` | 封面全幅 | 抽象「简历层叠 + 柔光」，角落可有钴蓝色块，无乱字 |
| `bg-dark-score.png` | 深色章节/收束 | #101827 底，极淡几何网格与一点 #4F63EE |
| `bg-soft-split.png` | 左右分栏页 | 左 paper 右 paper-2，中间细线 |

### B. Hero / 概念插画

| 文件名建议 | 提示要点 |
|---|---|
| `illust-resume-stack.png` | 2–3 张白简历纸轻微旋转层叠，顶部一张有分数 82 与绿 tags |
| `illust-match-bridge.png` | 左侧简历卡片，右侧岗位卡片，中间关键词 pills 连接 |
| `illust-before-after.png` | 左右对照文档：左淡红标注，右淡绿标注 |
| `illust-pipeline-5.png` | 五步横向流程图标化：输入/选岗/诊断/优化/导出 |
| `illust-dual-mode.png` | 双路径：Mock 实心稳、Live 虚线通，冷静对称构图 |

### C. 图标 / 小元素（1:1 或透明底）

建议统一线面结合、圆角方底 128–512px：

1. 简历文档  
2. 目标岗位/靶心-列表  
3. 放大镜诊断  
4. 天平/百分比（可解释评分）  
5. 对照双栏  
6. 导出文件  
7. Mock 盾牌/勾  
8. Live 连接点  
9. 关键词 tag  
10. Brand mark（深色方 + 白纸 + 绿勾）

### D. 装饰纹理

- `deco-dot-grid.png`：淡点阵  
- `deco-paper-edge.png`：纸张边缘纹理（极轻）  
- `deco-gradient-wash.png`：#F7F5EF → #EEF0FF 极淡对角晕  

---

## 4. 分条英文 Prompt 模板（Stable Diffusion / GPT Image 友好）

### 4.1 封面氛围（无假 UI）

```text
Editorial product illustration for ResumeWise, warm paper background #F7F5EF,
stacked white resume document cards with soft shadow, small cobalt #4F63EE accent,
mint green keyword pills, large dark score badge showing 82, clean minimal composition,
calm typographic grid, no people, no neon, no robots, no architecture photos,
high-end career tool aesthetic, soft lighting, 16:9
```

### 4.2 匹配概念

```text
Minimal illustration: resume sheet on the left, job card on the right,
floating rounded keyword tags some mint green some soft red, connecting thin lines,
colors #101827 #4F63EE #29A97F #CF5D63 on #F7F5EF, flat editorial style, 16:9
```

### 4.3 前后对照

```text
Split-view document comparison illustration, left column soft red highlights for weak resume lines,
right column soft green highlights for improved lines, white cards, rounded corners,
warm off-white background, professional product marketing style, 16:9
```

### 4.4 深色背景

```text
Dark editorial slide background #101827, subtle grid, soft cobalt glow corner #4F63EE at 10% opacity,
ample empty space for white Chinese title text, no objects clutter, 16:9
```

### 4.5 流程条

```text
Five horizontal step icons for resume product pipeline: paste text, choose job, AI review,
optimize, export; numbered 01-05, cobalt and ink colors, white rounded tiles on warm paper, 16:9
```

---

## 5. 与 PPT 页的对应关系（方便你替换）

当前终稿：`docs/deliver/ResumeWise-defense.pptx`

| 页主题 | 优先替换素材 |
|---|---|
| 封面 / 收束 | `bg-cover-abstract` 或 `illust-resume-stack` |
| 问题与定位 | `illust-match-bridge`（痛点：简历对不齐岗位） |
| 闭环方案 | `illust-pipeline-5` |
| 评分 | 大数字可纯排版；背景用 `bg-dark-score` 或保持色块 |
| 双模式 | `illust-dual-mode` |
| 架构 | **保留** `docs/images/readme/architecture.png` 等真实图 |
| 界面页 | **实机截图**（home / optimize / review / result），AI 只做相框底 |

---

## 6. 现成可参考的产品真实视觉（给 GPT 当 reference）

把这些一并上传给 GPT 当风格参考（比纯文字更稳）：

| 路径 | 内容 |
|---|---|
| `docs/images/readme/banner.png` | 品牌横幅：简历卡 + 分数 + 蓝 AI 圆 |
| `docs/images/readme/showcase-home.png` | 首页真实 UI |
| `docs/images/readme/showcase-optimize.png` | 填写/选岗 |
| `docs/images/readme/showcase-review.png` | 诊断 |
| `docs/images/readme/showcase-result.png` | 优化对照 |
| `docs/images/readme/features.png` | 特性图 |
| `docs/images/readme/workflow.png` | 流程 |

文字规范原文：`docs/output/reports/ui-prototype/html-src/DESIGN_SPEC.md`  
前端 token：`resume-web/src/assets/css/styles.css` 顶部 CSS 变量。

---

## 7. 验收标准（生成后自查）

- [ ] 主色能一眼认出是 ResumeWise（暖白 + 墨蓝 + 钴蓝 + 薄荷/柔红）
- [ ] 画面主题是简历/匹配/诊断/优化，不是建筑或城市
- [ ] 没有假网页截图抢戏
- [ ] 中英文若出现，少而清晰
- [ ] 一套图并排放时色温与圆角一致

---

## 8. 可选：中文短版（微信/对话快速版）

```text
帮我做 ResumeWise 答辩 PPT 配图。产品是大学生 AI 简历诊断优化：贴简历→选岗→诊断→优化→导出。
风格：暖白纸张#F7F5EF、深墨#101827、钴蓝#4F63EE、薄荷绿#29A97F、柔红#CF5D63；编辑感、克制、可信。
视觉母题：层叠简历纸、分数徽章、关键词绿/红胶囊、左右对照改写、五步流程、Mock/Live 双路径。
不要：紫霓虹、机器人、建筑摄影、假 UI 截图。请按：封面背景、流程插画、匹配插画、对照插画、双模式、深色底、图标套装 输出，并给英文文件名。
```
