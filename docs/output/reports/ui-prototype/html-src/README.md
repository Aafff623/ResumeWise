# ResumeWise 静态原型资产

这是一套可直接在浏览器打开的静态 HTML 原型，用于让 Grok Build / Cursor / 本地 Agent 按当前视觉和交互进行 Vue3 + Element Plus 复刻。

## 入口

- `index.html`：首页
- `optimize.html`：简历输入与岗位选择
- `review.html`：AI 诊断结果
- `result.html`：优化结果对照

无需安装依赖，直接打开 `index.html` 即可。为避免浏览器对 `file://` 下剪贴板权限的限制，建议使用任意静态服务器：

```bash
python -m http.server 8088
```

然后访问 `http://localhost:8088`。

## 资源

- `assets/css/styles.css`：完整视觉系统与响应式布局
- `assets/js/app.js`：岗位切换、localStorage、加载态、复制和 TXT 导出交互
- `assets/screenshots/`：四个页面的 PNG 参考图
- `docs/images/readme/`：README 所需 PNG 配图
- `REPLICATION_PROMPT.md`：交给 Grok Build / Cursor 的复刻指令
- `DESIGN_SPEC.md`：布局、组件、色彩和实现边界

## 复刻原则

静态页面是视觉与交互参考，不是最终业务实现。复刻时应：

1. 使用现有 Vue3 + Vite + Element Plus + Axios 技术栈。
2. 将重复结构拆为组件，而不是把静态 HTML 原样粘贴进单个 Vue 文件。
3. 保留当前信息层级、间距、字体比例、响应式行为和关键交互。
4. AI 调用只走 Spring Boot 后端，前端不得保存或暴露 API Key。
5. 数据继续使用 Mock JSON 与 localStorage，不引入数据库。
