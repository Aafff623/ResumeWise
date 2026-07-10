/**
 * DeepSeek 真实调用（静态原型）
 * - 默认经本机代理 http://127.0.0.1:8787 转发，避免浏览器 CORS
 * - API Key 从 localStorage 读取，只发往本机代理 → DeepSeek，不进仓库
 */
(function () {
  const PROXY = "http://127.0.0.1:8787";

  function getCfg() {
    return {
      apiKey: localStorage.getItem("rw-deepseek-key") || "",
      baseUrl: (localStorage.getItem("rw-deepseek-base") || "https://api.deepseek.com").replace(/\/$/, ""),
      model: localStorage.getItem("rw-deepseek-model") || "deepseek-v4-flash"
    };
  }

  async function chatCompletions(messages, { temperature = 0.3, json = true } = {}) {
    const { apiKey, baseUrl, model } = getCfg();
    if (!apiKey) throw new Error("未配置 DeepSeek API Key");

    const body = {
      model,
      messages,
      temperature,
      stream: false
    };
    if (json) body.response_format = { type: "json_object" };

    // 优先走本机代理（带 CORS）；失败再直连官方（多数浏览器会被 CORS 拦截）
    const urls = [
      `${PROXY}/chat/completions`,
      `${baseUrl}/chat/completions`,
      `${baseUrl}/v1/chat/completions`
    ];

    let lastErr;
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "X-DeepSeek-Base": baseUrl
          },
          body: JSON.stringify(body)
        });
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`响应非 JSON（${res.status}）：${text.slice(0, 200)}`);
        }
        if (!res.ok) {
          const msg = data.error?.message || data.message || text.slice(0, 200);
          throw new Error(`DeepSeek 错误 ${res.status}：${msg}`);
        }
        const content = data.choices?.[0]?.message?.content;
        if (!content) throw new Error("模型未返回 content");
        return content;
      } catch (e) {
        lastErr = e;
        // 代理连不上则试下一个
        if (String(e.message || e).includes("Failed to fetch") || e.name === "TypeError") continue;
        // 业务错误不必再试
        if (String(e.message || "").includes("DeepSeek 错误")) throw e;
      }
    }
    throw new Error(
      (lastErr && lastErr.message) ||
        "无法连接 DeepSeek。请先启动本机代理：python deepseek-proxy.py（端口 8787）"
    );
  }

  function extractJson(text) {
    const raw = String(text || "").trim();
    try {
      return JSON.parse(raw);
    } catch (_) {
      /* fallthrough */
    }
    const m = raw.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("模型返回无法解析为 JSON");
    return JSON.parse(m[0]);
  }

  function keywordMatchScore(resumeText, keywords) {
    const text = (resumeText || "").toLowerCase();
    if (!keywords?.length) return 0;
    let hit = 0;
    const matched = [];
    const missing = [];
    keywords.forEach((k) => {
      if (text.includes(String(k).toLowerCase())) {
        hit += 1;
        matched.push(k);
      } else missing.push(k);
    });
    return {
      matchScore: Math.round((hit / keywords.length) * 100),
      matchedKeywords: matched,
      missingKeywords: missing
    };
  }

  async function reviewResume({ resumeText, job }) {
    const kw = job.keywords || [];
    const models = typeof window.RW_getModelResumes === "function" ? window.RW_getModelResumes(job) : [];
    const modelBody = models[0]?.body || "";

    const local = keywordMatchScore(resumeText, kw);

    const system = `你是大学生实习简历诊断助手。只输出合法 JSON，不要 Markdown 围栏，不要多余解释。
字段要求：
{
  "contentScore": 0-100的整数（只评表达/项目/技能质量，不要给综合分）,
  "summary": "中文摘要，2-4句",
  "issues": [
    {"type":"项目经历|表达问题|技能描述|岗位匹配|其他","description":"问题","suggestion":"建议","priority":1}
  ]
}
priority: 1=紧急 2=重要 3=建议。按严重程度排序，至少 3 条、最多 6 条。
禁止输出 overallScore。`;

    const user = `【目标岗位】${job.title}
【岗位要求】${job.requirements || ""}
【岗位关键词】${kw.join("、")}
【样板简历（评判参照）】
${modelBody}

【用户简历】
${resumeText}`;

    const content = await chatCompletions(
      [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      { temperature: 0.25, json: true }
    );

    const ai = extractJson(content);
    const contentScore = Math.max(0, Math.min(100, Number(ai.contentScore) || 70));
    const overallScore = Math.round(local.matchScore * 0.4 + contentScore * 0.6);
    const issues = Array.isArray(ai.issues) ? ai.issues : [];

    return {
      overallScore,
      matchScore: local.matchScore,
      contentScore,
      summary: ai.summary || "诊断完成。",
      matchedKeywords: local.matchedKeywords,
      missingKeywords: local.missingKeywords,
      issues: issues.map((it, i) => ({
        type: it.type || "其他",
        description: it.description || "",
        suggestion: it.suggestion || "",
        priority: Number(it.priority) || (i < 2 ? 1 : i < 4 ? 2 : 3)
      })),
      jobId: job.id,
      jobTitle: job.title,
      source: "deepseek",
      model: getCfg().model,
      createdAt: Date.now()
    };
  }

  async function optimizeResume({ resumeText, job, review }) {
    const system = `你是大学生实习简历优化助手。只输出合法 JSON：
{
  "optimizedResume": "完整优化后的简历，使用 Markdown",
  "changes": ["修改点1","修改点2", "..."]
}
要求：针对目标岗位改写；保留真实经历不编造；突出职责与量化；自然融入关键词；changes 3-8 条中文。`;

    const user = `【目标岗位】${job.title}
【关键词】${(job.keywords || []).join("、")}
【诊断摘要】${review?.summary || ""}
【诊断问题】${JSON.stringify(review?.issues || [])}
【用户原始简历】
${resumeText}`;

    const content = await chatCompletions(
      [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      { temperature: 0.4, json: true }
    );

    const ai = extractJson(content);
    return {
      optimizedResume: ai.optimizedResume || resumeText,
      changes: Array.isArray(ai.changes) ? ai.changes : [],
      jobId: job.id,
      jobTitle: job.title,
      source: "deepseek",
      model: getCfg().model,
      createdAt: Date.now()
    };
  }

  window.RW_DeepSeek = {
    chatCompletions,
    reviewResume,
    optimizeResume,
    keywordMatchScore,
    proxyUrl: PROXY
  };
})();
