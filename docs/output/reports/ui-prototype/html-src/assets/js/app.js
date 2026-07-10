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
    model: localStorage.getItem(STORE.deepseekModel) || "deepseek-chat"
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
        <div class="section-title" id="settingsTitle">配置 DeepSeek API Key</div>
        <div class="caption">真实模式专用 · 生产环境 Key 仅存后端，原型用 localStorage 演示配置形态</div>
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
        <input id="cfgModel" class="field-input" type="text" placeholder="deepseek-chat" autocomplete="off" />
      </div>
      <div class="field">
        <label class="field-label" for="cfgKey">DeepSeek API Key</label>
        <input id="cfgKey" class="field-input" type="password" placeholder="sk-…（勿提交到 Git 仓库）" autocomplete="off" />
      </div>
      <div class="settings-note">
        <b>对接说明</b>
        <p>请求应走后端 <code>/api/ai/*</code>，由服务端携带 Key 调用 DeepSeek。演示模式无需填写。</p>
      </div>
    </div>
    <div class="modal-foot">
      <button type="button" class="btn btn-ghost" data-close-settings>取消</button>
      <button type="button" class="btn btn-blue" id="settingsSave">保存 Key</button>
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
    saveSettings({
      mode: getMode() || "live",
      apiKey: key,
      baseUrl: qs("#cfgBase").value.trim() || "https://api.deepseek.com",
      model: qs("#cfgModel").value.trim() || "deepseek-chat"
    });
    closeSettings();
    toast("API 配置已保存");
  });
}

function openSettings() {
  ensureSettingsUI();
  const s = getSettings();
  qs("#cfgKey").value = s.apiKey;
  qs("#cfgBase").value = s.baseUrl;
  qs("#cfgModel").value = s.model;
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

/* —— Navigation actions —— */
function bindNavActions() {
  qsa("[data-loading-link]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const { mode, apiKey } = getSettings();
      if (mode === "live" && !apiKey) {
        toast("真实模式请先配置 DeepSeek API Key");
        openSettings();
        return;
      }
      const overlay = qs("#loading");
      const caption = qs("#loadingCaption");
      if (caption) {
        caption.textContent =
          mode === "live"
            ? "真实模式：将经后端调用 DeepSeek（原型仅演示加载态）"
            : "演示模式：返回 Mock 结构化结果";
      }
      overlay?.classList.add("show");
      setTimeout(() => {
        location.href = btn.getAttribute("href");
      }, 1100);
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

/* —— Boot —— */
document.addEventListener("DOMContentLoaded", () => {
  ensureSettingsUI();
  syncModeUI();
  bindResumeEditor();
  renderJobPanel();
  bindNavActions();
  bindReviewEnhancements();
});

// expose for debug
window.RW_syncModeUI = syncModeUI;
