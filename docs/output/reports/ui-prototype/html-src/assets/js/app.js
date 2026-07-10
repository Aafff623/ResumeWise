/* ResumeWise static prototype — interactions */
const qs = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => [...r.querySelectorAll(s)];

const STORE = {
  resume: "rw-resume",
  job: "rw-job",
  mode: "rw-mode", // mock | live
  deepseekKey: "rw-deepseek-key",
  deepseekBase: "rw-deepseek-base",
  deepseekModel: "rw-deepseek-model"
};

function toast(msg) {
  const el = qs("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1800);
}

function getMode() {
  return localStorage.getItem(STORE.mode) || "mock";
}

function getSettings() {
  return {
    mode: getMode(),
    apiKey: localStorage.getItem(STORE.deepseekKey) || "",
    baseUrl: localStorage.getItem(STORE.deepseekBase) || "https://api.deepseek.com",
    model: localStorage.getItem(STORE.deepseekModel) || "deepseek-v4-flash"
  };
}

function saveSettings({ mode, apiKey, baseUrl, model }) {
  if (mode) localStorage.setItem(STORE.mode, mode);
  if (apiKey !== undefined) localStorage.setItem(STORE.deepseekKey, apiKey);
  if (baseUrl !== undefined) localStorage.setItem(STORE.deepseekBase, baseUrl);
  if (model !== undefined) localStorage.setItem(STORE.deepseekModel, model);
  syncModeUI();
}

function syncModeUI() {
  const { mode, apiKey } = getSettings();
  const isMock = mode !== "live";
  qsa("[data-mode-toggle]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.modeToggle === mode || (isMock && btn.dataset.modeToggle === "mock"));
  });
  qsa("[data-mode-label]").forEach((el) => {
    el.textContent = isMock ? "演示模式 · AI Mock" : "真实模式 · DeepSeek";
    el.classList.toggle("is-live", !isMock);
  });
  qsa("[data-mode-dot]").forEach((el) => {
    el.classList.toggle("is-live", !isMock);
  });
  // 真实模式才显示「配置 API Key」；演示模式不显示设置齿轮
  const apiBtn = qs("#btnApiKey");
  if (apiBtn) {
    apiBtn.hidden = isMock;
    apiBtn.textContent = apiKey ? "配置 API Key · 已填" : "配置 API Key";
  }
  qsa("[data-open-settings]").forEach((el) => {
    if (el.id === "btnApiKey") return;
    // 兼容旧页面：真实模式显示，演示模式隐藏
    el.hidden = isMock;
  });
  qsa("[data-loading-link]").forEach((btn) => {
    btn.dataset.needsKey = isMock ? "0" : "1";
  });
  const badge = qs("#modePill");
  if (badge) {
    badge.textContent = isMock ? "演示模式 · Mock" : apiKey ? "真实模式 · 已配置 Key" : "真实模式 · 未配置 Key";
    badge.classList.toggle("pill-live", !isMock);
    badge.classList.toggle("pill-warn", !isMock && !apiKey);
  }
}

/* —— Settings modal (injected once) —— */
function ensureSettingsUI() {
  if (qs("#settingsModal")) return;
  const wrap = document.createElement("div");
  wrap.innerHTML = `
<div id="settingsModal" class="modal" hidden>
  <div class="modal-backdrop" data-close-settings></div>
  <div class="modal-card" role="dialog" aria-labelledby="settingsTitle">
    <div class="modal-head">
      <div>
        <div class="section-title" id="settingsTitle">配置 DeepSeek</div>
        <div class="caption">真实模式 · 选择 V4 模型并填写 API Key</div>
      </div>
      <button type="button" class="icon-btn" data-close-settings aria-label="关闭">×</button>
    </div>
    <div class="modal-body">
      <div class="field">
        <label class="field-label" for="cfgBase">API Base URL</label>
        <input id="cfgBase" class="field-input" type="text" placeholder="https://api.deepseek.com" autocomplete="off" />
      </div>
      <div class="field">
        <label class="field-label" for="cfgModel">模型</label>
        <select id="cfgModel" class="field-input field-select">
          <option value="deepseek-v4-flash">DeepSeek V4 Flash</option>
          <option value="deepseek-v4-pro">DeepSeek V4 Pro</option>
        </select>
      </div>
      <div class="field">
        <label class="field-label" for="cfgKey">DeepSeek API Key</label>
        <input id="cfgKey" class="field-input" type="password" placeholder="sk-…（仅保存在本机浏览器）" autocomplete="off" />
      </div>
      <div class="settings-note">
        <b>Key 存储说明（localStorage）</b>
        <p>保存后写入<strong>当前浏览器</strong>的 <code>localStorage</code>，不会进 Git、不会随仓库分发。A 同学本机填的 Key，B 同学 clone 项目后拿不到，需各自填写自己的 Key。</p>
      </div>
    </div>
    <div class="modal-foot">
      <button type="button" class="btn btn-ghost" data-close-settings>取消</button>
      <button type="button" class="btn btn-blue" id="settingsSave">保存到本机</button>
    </div>
  </div>
</div>`;
  document.body.appendChild(wrap.firstElementChild);

  document.body.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-settings]")) openSettings();
    if (e.target.closest("[data-close-settings]")) closeSettings();
    const toggle = e.target.closest("[data-mode-toggle]");
    if (toggle) {
      const next = toggle.dataset.modeToggle;
      saveSettings({ mode: next });
      toast(next === "live" ? "已切换为真实模式 · DeepSeek" : "已切换为演示模式 · Mock");
      if (next === "live" && !getSettings().apiKey) {
        // 切到真实模式且无 Key 时提示配置
        setTimeout(() => openSettings(), 280);
      }
    }
  });

  qs("#settingsSave")?.addEventListener("click", () => {
    const key = qs("#cfgKey").value.trim();
    if (getMode() === "live" && !key) {
      toast("真实模式请填写 DeepSeek API Key");
      return;
    }
    const model = qs("#cfgModel").value || "deepseek-v4-flash";
    saveSettings({
      mode: getMode() || "live",
      apiKey: key,
      baseUrl: qs("#cfgBase").value.trim() || "https://api.deepseek.com",
      model
    });
    closeSettings();
    toast("已保存到本机 localStorage（不会上传仓库）");
  });
}

function openSettings() {
  ensureSettingsUI();
  const s = getSettings();
  qs("#cfgKey").value = s.apiKey;
  qs("#cfgBase").value = s.baseUrl;
  const modelSel = qs("#cfgModel");
  // 兼容旧默认 deepseek-chat → v4-flash
  let model = s.model;
  if (!model || model === "deepseek-chat" || model === "deepseek-reasoner") {
    model = "deepseek-v4-flash";
  }
  if (modelSel) modelSel.value = model;
  qs("#settingsModal").hidden = false;
  document.body.classList.add("modal-open");
}

function closeSettings() {
  const m = qs("#settingsModal");
  if (m) m.hidden = true;
  if (qs("#modelModal")?.hidden !== false) {
    document.body.classList.remove("modal-open");
  }
}

/* —— Job list + model resume modal browser —— */
let _modelJobId = null;
let _modelResumeId = null;

function getModelList(job) {
  if (typeof window.RW_getModelResumes === "function") return window.RW_getModelResumes(job);
  if (job?.modelResumes) return job.modelResumes;
  if (job?.modelResume) return [job.modelResume];
  return [];
}

function openModelModal(jobId) {
  const jobs = window.RW_JOBS;
  const job = jobs?.[jobId];
  if (!job) return;
  _modelJobId = jobId;
  paintJob(jobId);
  const list = getModelList(job);
  _modelResumeId = list[0]?.id || null;
  const modal = qs("#modelModal");
  if (!modal) return;
  qs("#modelModalTitle").textContent = `样板简历参考 · ${job.title}`;
  qs("#modelModalSub").textContent = `共 ${list.length} 份参照样板 · 可选中浏览，用作 Agent 评判锚点`;
  renderModelList(list, _modelResumeId);
  showModelResume(job, _modelResumeId);
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeModelModal() {
  const m = qs("#modelModal");
  if (m) m.hidden = true;
  // only remove modal-open if settings also closed
  if (qs("#settingsModal")?.hidden !== false) {
    document.body.classList.remove("modal-open");
  }
}

function renderModelList(list, activeId) {
  const box = qs("#modelList");
  if (!box) return;
  box.innerHTML = list
    .map(
      (m, i) => `
    <button type="button" class="model-list-item ${m.id === activeId ? "active" : ""}" data-model-id="${m.id}">
      <span class="model-list-idx">${String(i + 1).padStart(2, "0")}</span>
      <span class="model-list-text">
        <b>${m.title}</b>
        <small>${m.note || "样板简历"}</small>
      </span>
    </button>`
    )
    .join("");
}

function showModelResume(job, resumeId) {
  const list = getModelList(job);
  const m = list.find((x) => x.id === resumeId) || list[0];
  if (!m) return;
  _modelResumeId = m.id;
  const title = qs("#modelResumeTitle");
  const note = qs("#modelResumeNote");
  const body = qs("#modelResumeBody");
  const wrap = qs(".model-pre-wrap");
  if (title) title.textContent = m.title;
  if (note) note.textContent = m.note || "";
  if (body) {
    if (typeof window.RW_md === "function") {
      body.classList.add("md-preview", "model-md-view");
      body.innerHTML = window.RW_md(m.body);
    } else {
      body.textContent = m.body;
    }
  }
  if (wrap) wrap.scrollTop = 0;
  qsa("#modelList .model-list-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.modelId === m.id);
  });
}

function paintJob(jobId) {
  const jobs = window.RW_JOBS;
  const job = jobs?.[jobId];
  if (!job) return;
  localStorage.setItem(STORE.job, jobId);
  const list = qs("#jobList");
  if (list) {
    qsa("[data-job]", list).forEach((el) => el.classList.toggle("active", el.dataset.job === jobId));
  }
  const kw = qs("#jobKeywords");
  if (kw) {
    kw.innerHTML = job.keywords.map((k, i) => `<span class="tag ${i < 2 ? "hit" : ""}">${k}</span>`).join("");
  }
  const reqEl = qs("#jobRequirements");
  if (reqEl) reqEl.textContent = job.requirements;
}

function renderJobPanel() {
  const jobs = window.RW_JOBS;
  const list = qs("#jobList");
  if (!jobs || !list) return;

  let current = localStorage.getItem(STORE.job) || "java";
  if (!jobs[current]) current = "java";

  qsa("[data-job]", list).forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-open-model]")) return;
      paintJob(el.dataset.job);
      toast("目标岗位已切换");
    });
  });

  qsa("[data-open-model]", list).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const jobId = btn.getAttribute("data-open-model") || btn.closest("[data-job]")?.dataset.job;
      if (jobId) openModelModal(jobId);
    });
  });

  document.body.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-model]")) {
      closeModelModal();
    }
    const item = e.target.closest("[data-model-id]");
    if (item && qs("#modelModal") && !qs("#modelModal").hidden) {
      const job = jobs[_modelJobId];
      if (job) showModelResume(job, item.dataset.modelId);
    }
  });

  qs("#useModelAsSample")?.addEventListener("click", () => {
    const job = jobs[_modelJobId || localStorage.getItem(STORE.job) || "java"];
    const listM = getModelList(job);
    const m = listM.find((x) => x.id === _modelResumeId) || listM[0];
    const input = qs("#resumeText");
    if (!input || !m) return;
    input.value = m.body;
    input.dispatchEvent(new Event("input"));
    toast("已将样板填入「我的简历」（可再修改）");
  });

  qs("#copyModelResume")?.addEventListener("click", async () => {
    const job = jobs[_modelJobId || localStorage.getItem(STORE.job) || "java"];
    const listM = getModelList(job);
    const m = listM.find((x) => x.id === _modelResumeId) || listM[0];
    if (!m) return;
    try {
      await navigator.clipboard.writeText(m.body);
      toast("样板简历已复制");
    } catch {
      toast("复制失败，请手动选择文本");
    }
  });

  paintJob(current);
}

/* —— Markdown help modal —— */
function bindMdHelp() {
  const open = () => {
    const m = qs("#mdHelpModal");
    if (!m) return;
    m.hidden = false;
    document.body.classList.add("modal-open");
    // 默认显示源码；预渲染预览缓存
    const src = qs("#mdHelpSource");
    const prev = qs("#mdHelpPreview");
    if (src && prev && typeof window.RW_md === "function") {
      prev.innerHTML = window.RW_md(src.textContent || "");
    }
    qsa("[data-md-help-view]").forEach((t) =>
      t.classList.toggle("active", t.dataset.mdHelpView === "source")
    );
    if (src) src.hidden = false;
    if (prev) prev.hidden = true;
  };
  const close = () => {
    const m = qs("#mdHelpModal");
    if (m) m.hidden = true;
    if (qs("#settingsModal")?.hidden !== false && qs("#modelModal")?.hidden !== false) {
      document.body.classList.remove("modal-open");
    }
  };
  qs("#mdHelpBtn")?.addEventListener("click", open);
  document.body.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-md-help]")) close();
    const tab = e.target.closest("[data-md-help-view]");
    if (!tab || qs("#mdHelpModal")?.hidden) return;
    const view = tab.dataset.mdHelpView;
    qsa("[data-md-help-view]").forEach((t) => t.classList.toggle("active", t === tab));
    const src = qs("#mdHelpSource");
    const prev = qs("#mdHelpPreview");
    if (view === "preview") {
      if (src) src.hidden = true;
      if (prev) {
        if (typeof window.RW_md === "function" && src) {
          prev.innerHTML = window.RW_md(src.textContent || "");
        }
        prev.hidden = false;
      }
    } else {
      if (src) src.hidden = false;
      if (prev) prev.hidden = true;
    }
  });
}

/* —— Markdown resume editor —— */
function bindResumeEditor() {
  const input = qs("#resumeText");
  if (!input) return;
  const preview = qs("#resumePreview");
  const cached = localStorage.getItem(STORE.resume);
  if (cached) input.value = cached;
  const counter = qs("#charCount");
  const syncCount = () => {
    if (counter) counter.textContent = `约 ${input.value.length} 字 · Markdown · 已缓存`;
  };
  const renderPreview = () => {
    if (!preview || typeof window.RW_md !== "function") return;
    preview.innerHTML = window.RW_md(input.value);
  };
  input.addEventListener("input", () => {
    localStorage.setItem(STORE.resume, input.value);
    syncCount();
    if (preview && !preview.hidden) renderPreview();
  });
  syncCount();

  qsa("[data-md-mode]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const mode = tab.dataset.mdMode;
      qsa("[data-md-mode]").forEach((t) => t.classList.toggle("active", t === tab));
      if (mode === "preview") {
        input.hidden = true;
        if (preview) {
          preview.hidden = false;
          renderPreview();
        }
        toast("渲染预览");
      } else {
        input.hidden = false;
        if (preview) preview.hidden = true;
        toast("编辑模式");
      }
    });
  });

  qsa("[data-sample]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sample = qs("#sampleResume");
      if (!sample) return;
      input.value = sample.textContent.trim();
      input.dispatchEvent(new Event("input"));
      // 回到编辑模式
      const editTab = qs('[data-md-mode="edit"]');
      editTab?.click();
      toast("已填入 Markdown 示例简历");
    });
  });
}

const LIVE_REVIEW_KEY = "rw-live-review";
const LIVE_OPTIMIZE_KEY = "rw-live-optimize";

function showLoading(title, caption) {
  const overlay = qs("#loading");
  const t = qs("#loadingTitle") || overlay?.querySelector("b");
  const c = qs("#loadingCaption");
  if (t && title) t.textContent = title;
  if (c && caption) c.textContent = caption;
  overlay?.classList.add("show");
}

function hideLoading() {
  qs("#loading")?.classList.remove("show");
}

function currentJob() {
  const id = localStorage.getItem(STORE.job) || "java";
  return window.RW_JOBS?.[id] || window.RW_JOBS?.java;
}

/* —— Navigation actions —— */
function bindNavActions() {
  qsa("[data-loading-link]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const href = btn.getAttribute("href") || "";
      const { mode, apiKey } = getSettings();

      // 演示模式：仍走静态页
      if (mode !== "live") {
        showLoading("正在生成结果", "演示模式：返回 Mock 结构化结果");
        setTimeout(() => {
          location.href = href;
        }, 900);
        return;
      }

      if (!apiKey) {
        toast("真实模式请先配置 DeepSeek API Key");
        openSettings();
        return;
      }
      if (!window.RW_DeepSeek) {
        toast("未加载 deepseek-api.js");
        return;
      }

      const job = currentJob();
      const resumeText =
        localStorage.getItem(STORE.resume) || qs("#resumeText")?.value || "";

      try {
        // optimize.html → review.html ：真实诊断
        if (href.includes("review.html")) {
          if (!resumeText.trim()) {
            toast("请先填写简历");
            return;
          }
          showLoading("DeepSeek 诊断中…", `模型 ${getSettings().model} · 经本机代理调用`);
          const review = await window.RW_DeepSeek.reviewResume({ resumeText, job });
          sessionStorage.setItem(LIVE_REVIEW_KEY, JSON.stringify(review));
          sessionStorage.setItem(STORE.resume, resumeText);
          location.href = "review.html";
          return;
        }

        // review.html → result.html ：真实优化
        if (href.includes("result.html")) {
          let review = null;
          try {
            review = JSON.parse(sessionStorage.getItem(LIVE_REVIEW_KEY) || "null");
          } catch (_) {
            review = null;
          }
          const text = resumeText || localStorage.getItem(STORE.resume) || "";
          if (!text.trim()) {
            toast("缺少简历原文，请返回填写页");
            return;
          }
          showLoading("DeepSeek 优化中…", `模型 ${getSettings().model} · 生成岗位定向版本`);
          const opt = await window.RW_DeepSeek.optimizeResume({
            resumeText: text,
            job,
            review
          });
          sessionStorage.setItem(LIVE_OPTIMIZE_KEY, JSON.stringify(opt));
          location.href = "result.html";
          return;
        }

        location.href = href;
      } catch (err) {
        hideLoading();
        console.error(err);
        const msg = err?.message || String(err);
        toast(msg.length > 80 ? msg.slice(0, 80) + "…" : msg);
        alert(
          "DeepSeek 调用失败：\n\n" +
            msg +
            "\n\n请确认：\n1) 已切换真实模式并保存 Key\n2) 已启动代理：python deepseek-proxy.py\n3) 网络可访问 api.deepseek.com"
        );
      }
    });
  });

  qsa("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = qs(btn.dataset.copy);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.innerText);
        toast("优化简历已复制");
      } catch {
        toast("当前浏览器限制复制，请手动选择文本");
      }
    });
  });

  qsa("[data-download]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = qs(btn.dataset.download);
      if (!target) return;
      downloadBlob(target.innerText, "ResumeWise-optimized-resume.txt", "text/plain;charset=utf-8");
      toast("已生成 TXT 文件");
    });
  });

  qsa("[data-export]").forEach((btn) => {
    btn.addEventListener("click", () => exportOptimized(btn.dataset.export));
  });
}

function getExportPayload() {
  const resume =
    qs("#optimizedResumeText")?.innerText?.trim() ||
    qs("#optimizedResume")?.innerText?.trim() ||
    "";
  const changes = qsa("#changeNotes .change, .change-list .change")
    .map((el, i) => {
      const b = el.querySelector("b")?.innerText || `修改 ${i + 1}`;
      const s = el.querySelector("small")?.innerText || "";
      return `${i + 1}. ${b}${s ? " — " + s : ""}`;
    })
    .join("\n");
  return { resume, changes };
}

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportOptimized(fmt) {
  const { resume, changes } = getExportPayload();
  const md = `# ResumeWise 优化简历\n\n${resume}\n\n## 修改说明\n\n${changes || "（无）"}\n`;
  const plain = `ResumeWise 优化简历\n\n${resume}\n\n—— 修改说明 ——\n${changes || "（无）"}\n`;

  if (fmt === "md") {
    downloadBlob(md, "ResumeWise-optimized.md", "text/markdown;charset=utf-8");
    toast("已导出 Markdown");
    return;
  }
  if (fmt === "txt") {
    downloadBlob(plain, "ResumeWise-optimized.txt", "text/plain;charset=utf-8");
    toast("已导出 TXT");
    return;
  }
  if (fmt === "docx") {
    // Word 可打开的 HTML 文档（.doc），无需第三方库
    const html = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>ResumeWise</title></head><body>
      <h1>ResumeWise 优化简历</h1>
      <pre style="font-family:Microsoft YaHei;white-space:pre-wrap;font-size:12pt;line-height:1.7">${escapeHtml(resume)}</pre>
      <h2>修改说明</h2>
      <pre style="font-family:Microsoft YaHei;white-space:pre-wrap;font-size:11pt;line-height:1.6">${escapeHtml(changes || "（无）")}</pre>
    </body></html>`;
    downloadBlob("\ufeff" + html, "ResumeWise-optimized.doc", "application/msword");
    toast("已导出 Word（.doc，可用 Word / WPS 打开）");
    return;
  }
  if (fmt === "pdf") {
    // 浏览器打印为 PDF（无第三方库、适配演示）
    const w = window.open("", "_blank");
    if (!w) {
      toast("请允许弹窗以导出 PDF");
      return;
    }
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>ResumeWise PDF</title>
      <style>body{font-family:"Microsoft YaHei",sans-serif;padding:32px;line-height:1.7;color:#111}
      h1{font-size:20px}h2{font-size:16px;margin-top:24px}pre{white-space:pre-wrap;font-family:inherit;font-size:12px}
      @media print{body{padding:12px}}</style></head><body>
      <h1>ResumeWise 优化简历</h1><pre>${escapeHtml(resume)}</pre>
      <h2>修改说明</h2><pre>${escapeHtml(changes || "（无）")}</pre>
      <script>window.onload=function(){setTimeout(function(){window.print()},200)}<\/script>
      </body></html>`);
    w.document.close();
    toast("请在打印对话框中选择「另存为 PDF」");
  }
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* —— Insight carousel + score mood —— */
function bindReviewEnhancements() {
  const quotes = qsa("[data-insight]");
  const dotsBox = qs("#insightDots");
  if (quotes.length && dotsBox) {
    dotsBox.innerHTML = quotes.map((_, i) => `<button type="button" class="insight-dot ${i === 0 ? "active" : ""}" data-insight-dot="${i}" aria-label="insight ${i + 1}"></button>`).join("");
    let idx = 0;
    const show = (n) => {
      idx = (n + quotes.length) % quotes.length;
      quotes.forEach((q, i) => q.classList.toggle("active", i === idx));
      qsa("[data-insight-dot]").forEach((d, i) => d.classList.toggle("active", i === idx));
    };
    dotsBox.addEventListener("click", (e) => {
      const d = e.target.closest("[data-insight-dot]");
      if (d) show(+d.dataset.insightDot);
    });
    setInterval(() => show(idx + 1), 4200);
  }

  // score emotional color by value
  qsa("[data-score]").forEach((el) => {
    const score = Number(el.dataset.score || el.querySelector("[data-score]")?.dataset.score || 0);
    const mood = scoreTone(score);
    el.classList.add(`score-tone-${mood.key}`);
    el.style.setProperty("--score", String(score));
    const moodEl = qs("#overallScoreMood", el) || qs("#overallScoreMood");
    if (moodEl) moodEl.textContent = mood.label;
    const ring = el.querySelector(".score-ring-visual") || el;
    ring.style.setProperty("--score-color", mood.color);
    ring.style.setProperty("--score-color-2", mood.color2);
  });
}

function scoreTone(score) {
  if (score >= 85) return { key: "great", label: "表现优秀 · 岗位匹配充分", color: "#12b886", color2: "#38d9a9" };
  if (score >= 70) return { key: "good", label: "表现良好 · 仍有提升空间", color: "#4f63ee", color2: "#748ffc" };
  if (score >= 55) return { key: "warn", label: "中等水平 · 建议重点改项目表达", color: "#f59f00", color2: "#fcc419" };
  return { key: "risk", label: "匹配偏弱 · 优先补关键词与成果", color: "#e03131", color2: "#ff6b6b" };
}

/* —— Live result renderers —— */
function renderLiveReviewPage() {
  if (getMode() !== "live") return;
  let data;
  try {
    data = JSON.parse(sessionStorage.getItem(LIVE_REVIEW_KEY) || "null");
  } catch (_) {
    data = null;
  }
  if (!data || data.source !== "deepseek") {
    // 真实模式但无结果：提示
    const host = qs(".review-main") || qs(".review-layout");
    if (host) {
      const tip = document.createElement("div");
      tip.className = "live-banner live-banner-warn";
      tip.innerHTML =
        "当前为<strong>真实模式</strong>，但还没有 DeepSeek 诊断结果。请从「填写简历」页点击「开始 AI 诊断」。";
      host.parentElement?.insertBefore(tip, host);
    }
    return;
  }

  const banner = document.createElement("div");
  banner.className = "live-banner";
  banner.innerHTML = `真实模式 · 已接入 DeepSeek（${escapeHtml(data.model || "")}）· 综合分 ${data.overallScore}`;
  const layout = qs(".review-layout");
  layout?.parentElement?.insertBefore(banner, layout);

  const h1 = qs(".page-head h1");
  if (h1 && data.jobTitle) h1.textContent = `针对「${data.jobTitle}」的诊断结果`;

  // score
  const scoreCard = qs("#overallScoreCard") || qs("[data-score]");
  if (scoreCard) {
    scoreCard.dataset.score = String(data.overallScore);
    scoreCard.style.setProperty("--score", String(data.overallScore));
    const val = qs("#overallScoreVal");
    if (val) val.textContent = String(data.overallScore);
    const ring = scoreCard.querySelector(".score-ring-visual");
    if (ring) ring.style.setProperty("--score", String(data.overallScore));
  }
  const mood = scoreTone(data.overallScore);
  const moodEl = qs("#overallScoreMood");
  if (moodEl) moodEl.textContent = mood.label;
  scoreCard?.classList.add(`score-tone-${mood.key}`);
  scoreCard?.style.setProperty("--score-color", mood.color);
  scoreCard?.style.setProperty("--score-color-2", mood.color2);

  const summaryH2 = qs(".summary h2");
  const summaryP = qs(".summary p");
  if (summaryH2) summaryH2.textContent = data.summary?.slice(0, 48) || "诊断完成";
  if (summaryP) summaryP.textContent = data.summary || "";

  const chips = qs(".metric-chips");
  if (chips) {
    chips.innerHTML = `
      <span class="metric-chip">关键词匹配 <b>${data.matchScore}</b></span>
      <span class="metric-chip">AI 内容评分 <b>${data.contentScore}</b></span>
      <span class="metric-chip">问题数量 <b>${(data.issues || []).length}</b></span>`;
  }

  // keywords
  const rows = qsa(".keyword-row");
  if (rows[0]) {
    const tags = rows[0].querySelector(".tags");
    if (tags) {
      tags.innerHTML = (data.matchedKeywords || [])
        .map((k) => `<span class="tag hit">${escapeHtml(k)}</span>`)
        .join("") || `<span class="caption">无</span>`;
    }
  }
  if (rows[1]) {
    const tags = rows[1].querySelector(".tags");
    if (tags) {
      tags.innerHTML = (data.missingKeywords || [])
        .map((k) => `<span class="tag miss">${escapeHtml(k)}</span>`)
        .join("") || `<span class="caption">无</span>`;
    }
  }

  // match donut
  const donut = qs(".donut-v2");
  if (donut) {
    donut.style.setProperty("--pct", String(data.matchScore));
    const b = donut.querySelector("b");
    if (b) b.textContent = `${data.matchScore}%`;
  }
  const metrics = qsa(".match-v2 .metric strong, .match .metric strong");
  if (metrics[0]) {
    metrics[0].textContent = `${(data.matchedKeywords || []).length} / ${(data.matchedKeywords || []).length + (data.missingKeywords || []).length}`;
  }

  // issues
  const box = qs(".issues-priority") || qs(".issues");
  if (box) {
    const head = box.querySelector(".issues-head");
    const sorted = [...(data.issues || [])].sort(
      (a, b) => (a.priority || 9) - (b.priority || 9)
    );
    const html = sorted
      .map((it, i) => {
        const p = Number(it.priority) || 2;
        const pClass = p <= 1 ? "issue-p1" : p === 2 ? "issue-p2" : "issue-p3";
        const pLabel = p <= 1 ? "P1 · 紧急" : p === 2 ? "P2 · 重要" : "P3 · 建议";
        return `<div class="issue ${pClass}" data-priority="${p}">
          <label class="issue-check"><input type="checkbox" ${p <= 2 ? "checked" : ""} disabled><span></span></label>
          <div class="issue-priority-tag">${pLabel}</div>
          <div class="issue-body">
            <div class="issue-type">${escapeHtml(it.type || "其他")}</div>
            <div class="issue-desc">${escapeHtml(it.description || "")}</div>
            <div class="issue-suggest"><b>建议</b>${escapeHtml(it.suggestion || "")}</div>
          </div>
        </div>`;
      })
      .join("");
    box.innerHTML =
      (head
        ? head.outerHTML
        : `<div class="issues-head"><div class="section-title">结构化问题与建议</div><span class="caption">DeepSeek 动态结果</span></div>`) +
      html;
  }
}

function renderLiveResultPage() {
  if (getMode() !== "live") return;
  let data;
  try {
    data = JSON.parse(sessionStorage.getItem(LIVE_OPTIMIZE_KEY) || "null");
  } catch (_) {
    data = null;
  }
  if (!data || data.source !== "deepseek") {
    const host = qs(".result-layout");
    if (host) {
      const tip = document.createElement("div");
      tip.className = "live-banner live-banner-warn";
      tip.innerHTML =
        "当前为<strong>真实模式</strong>，但还没有 DeepSeek 优化结果。请从诊断页点击「生成优化版本」。";
      host.parentElement?.insertBefore(tip, host);
    }
    return;
  }

  const banner = document.createElement("div");
  banner.className = "live-banner";
  banner.innerHTML = `真实模式 · DeepSeek 已生成优化版（${escapeHtml(data.model || "")}）`;
  const layout = qs(".result-layout");
  layout?.parentElement?.insertBefore(banner, layout);

  const original =
    localStorage.getItem(STORE.resume) ||
    qs("#originalResume")?.innerText ||
    "";
  const origEl = qs("#originalResume");
  if (origEl) {
    if (typeof window.RW_md === "function" && /[#*`-]/.test(original)) {
      origEl.innerHTML = window.RW_md(original);
    } else {
      origEl.innerHTML = `<pre class="plain-resume">${escapeHtml(original)}</pre>`;
    }
  }

  const optMd = data.optimizedResume || "";
  const optEl = qs("#optimizedResume");
  if (optEl) {
    if (typeof window.RW_md === "function") {
      optEl.innerHTML = window.RW_md(optMd);
    } else {
      optEl.textContent = optMd;
    }
  }
  const optText = qs("#optimizedResumeText");
  if (optText) optText.textContent = optMd;

  const list = qs("#changeNotes") || qs(".change-list");
  if (list && Array.isArray(data.changes)) {
    list.innerHTML = data.changes
      .map(
        (c, i) =>
          `<div class="change"><span class="change-num">${i + 1}</span><div><b>${escapeHtml(
            typeof c === "string" ? c : c.title || "修改"
          )}</b><small>${escapeHtml(
            typeof c === "string" ? "" : c.detail || ""
          )}</small></div></div>`
      )
      .join("");
  }
}

/* —— Boot —— */
document.addEventListener("DOMContentLoaded", () => {
  ensureSettingsUI();
  syncModeUI();
  bindMdHelp();
  bindResumeEditor();
  renderJobPanel();
  bindNavActions();
  bindReviewEnhancements();
  // 真实模式动态渲染
  if (qs(".review-layout")) renderLiveReviewPage();
  if (qs(".result-layout")) renderLiveResultPage();
});

// expose for debug
window.RW_syncModeUI = syncModeUI;
