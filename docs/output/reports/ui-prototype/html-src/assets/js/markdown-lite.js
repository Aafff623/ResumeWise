/**
 * Lightweight Markdown → HTML for resume preview (no CDN).
 * Supports: headings, bold/italic, lists, links, code, hr, paragraphs.
 */
window.RW_md = function renderMarkdown(src) {
  if (!src) return "<p class=\"md-empty\">暂无内容，切换到编辑模式开始输入…</p>";
  let text = String(src).replace(/\r\n/g, "\n");
  // escape HTML first
  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  text = esc(text);

  // code fences
  text = text.replace(/```([\s\S]*?)```/g, (_, code) => `<pre class="md-code"><code>${code.trim()}</code></pre>`);
  // inline code
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  // headings
  text = text.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  text = text.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  text = text.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  // hr
  text = text.replace(/^(-{3,}|\*{3,})$/gm, "<hr/>");
  // bold / italic
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  // links [t](u)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // unordered lists
  text = text.replace(/^(?:[-*] .+(?:\n|$))+?/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((line) => line.replace(/^[-*] (.+)$/, "<li>$1</li>"))
      .join("");
    return `<ul>${items}</ul>`;
  });
  // ordered lists
  text = text.replace(/^(?:\d+\. .+(?:\n|$))+?/gm, (block) => {
    const items = block
      .trim()
      .split("\n")
      .map((line) => line.replace(/^\d+\. (.+)$/, "<li>$1</li>"))
      .join("");
    return `<ol>${items}</ol>`;
  });
  // paragraphs: split double newlines, wrap leftover lines
  const parts = text.split(/\n{2,}/).map((chunk) => {
    chunk = chunk.trim();
    if (!chunk) return "";
    if (/^<(h[1-3]|ul|ol|pre|hr|blockquote)/.test(chunk)) return chunk;
    return `<p>${chunk.replace(/\n/g, "<br/>")}</p>`;
  });
  return parts.join("\n");
};
