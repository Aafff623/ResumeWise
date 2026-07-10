# ResumeWise 视觉与组件规范

## 1. 设计方向

关键词：编辑感、克制、清晰、可信、求职工具，而不是紫色发光的通用 AI Dashboard。

- 背景：暖白 `#F7F5EF`
- 主文字：深墨蓝 `#101827`
- 主强调：钴蓝 `#4F63EE`
- 正向状态：薄荷绿 `#29A97F`
- 风险提示：柔和红 `#CF5D63`
- 卡片：白色，1px 冷灰边框，轻阴影
- 圆角：主面板 20px，控件 10–14px
- 中文标题：Noto Serif CJK SC 或系统宋体
- 正文：Noto Sans CJK SC / Microsoft YaHei

避免：大面积紫色渐变、玻璃拟态堆叠、过饱和发光球、无意义 3D 图标、密集卡片墙。

## 2. 页面结构

### 首页

- 顶部导航 76px
- 左侧价值主张，右侧简历纸张预览
- 底部三步流程深色横条
- 桌面端 2 列；窄屏隐藏复杂主视觉

### 简历输入页

- 顶部三步进度
- 左侧约 2/3：纯文本编辑器
- 右侧约 1/3：目标岗位列表
- 底部固定语义操作条：隐私说明 + 开始诊断

### AI 诊断页

- 左侧主体：总分、摘要、关键词、结构化问题
- 右侧：岗位匹配环和 Reviewer Insight
- 分数与关键词必须可解释，不使用复杂大屏图表

### 优化结果页

- 原始版本 / 优化版本 / 修改说明三栏
- 修改处使用柔和红绿底色，不使用荧光高亮
- 复制与导出作为明确操作，不做复杂编辑器

## 3. 建议组件

```text
AppHeader
StepProgress
StatusBadge
PrimaryButton
PanelCard
ResumeEditor
JobSelector
KeywordTags
ScoreSummary
MatchDonut
IssueList
ResumeCompare
ChangeNotes
LoadingOverlay
ToastMessage
```

## 4. 响应式

- >= 1000px：完整桌面布局
- < 1000px：所有双栏、三栏转单栏
- < 640px：隐藏步骤进度与右侧状态，标题字号降低，问题建议换行

## 5. 业务边界

- 不做登录、数据库、后台、爬虫、文件解析
- 不把 AI 做成聊天界面
- 不把页面扩成招聘平台
- AI Mock 模式必须可独立跑通全流程
