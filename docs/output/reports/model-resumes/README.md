# 样板 / 模范简历调研资产

本目录给 **网页端 GPT / Grok** 做搜集与分析用，不是最终入库数据。

| 文件 | 用途 |
|---|---|
| [`model-resume-research-brief.md`](./model-resume-research-brief.md) | 调研范围、岗位列表、回传数据形状 |
| [`model-resume-research-qa.md`](./model-resume-research-qa.md) | 逐条 QA，请模型按题回答并附样板正文 |

## 使用方式

1. 将上述两个 md 一并粘贴 / 上传给网页 GPT 或 Grok。  
2. 要求其按 QA 输出，并尽量给 **脱敏纯文本** 样板。  
3. 把返回的文本 / PDF / 压缩包交给仓库 Agent，写入 Mock 与原型 `jobs-data.js`。

## 与前端原型的关系

静态标杆：`docs/output/reports/ui-prototype/html-src/`  
optimize 页已含 **样板简历** 模块与 **设置（演示 / 真实 · DeepSeek）**；样板正文当前为占位，待本调研回传后替换。
