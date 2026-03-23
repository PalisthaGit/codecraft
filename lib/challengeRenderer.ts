declare global {
  interface Window {
    __editorInit?: (section: HTMLElement) => void;
  }
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const COPY_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;

function initChallenge(el: HTMLElement): void {
  el.dataset.ci = "1";

  const title       = el.dataset.title ?? "";
  const description = el.dataset.description ?? "";
  const checks      = (el.dataset.checks ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const solution    = el.dataset.solution ?? "";
  const starterHtml = el.dataset.starterHtml ?? "";
  const starterCss  = el.dataset.starterCss ?? "";
  const lang        = el.dataset.lang ?? "html";         // "html" | "css"
  const hasCssTab   = lang === "css" || "starterCss" in el.dataset;

  // Build the try-example attributes — add data-css so the CSS tab appears
  const editorAttrs = hasCssTab
    ? `data-mode="edit" data-html="${escHtml(starterHtml)}" data-css="${escHtml(starterCss)}"`
    : `data-mode="edit" data-html="${escHtml(starterHtml)}"`;

  // Build target srcdoc — wrap solution in a minimal document
  const targetSrc = hasCssTab
    ? `<!DOCTYPE html><html><head><style>body{margin:0;padding:16px;font-family:sans-serif;font-size:15px;line-height:1.6;}${solution}</style></head><body>${starterHtml}</body></html>`
    : `<!DOCTYPE html><html><head><style>body{margin:0;padding:16px;font-family:sans-serif;font-size:15px;line-height:1.6;}</style></head><body>${solution}</body></html>`;

  el.innerHTML = `
    <div class="challenge-header">
      <span class="challenge-badge">Challenge</span>
      <h3 class="challenge-title">${escHtml(title)}</h3>
    </div>
    <p class="challenge-desc">${escHtml(description)}</p>
    <div class="challenge-target">
      <span class="challenge-target-label">Target output</span>
      <iframe class="challenge-target-frame" sandbox="allow-same-origin" referrerpolicy="no-referrer" scrolling="no"></iframe>
    </div>
    <section class="try-example" ${editorAttrs}></section>
    <div class="challenge-actions">
      <button class="challenge-check-btn" type="button">Check my answer</button>
      <button class="challenge-show-btn" type="button">Show solution</button>
    </div>
    <div class="challenge-result" style="display:none"></div>
    <div class="challenge-solution-code" style="display:none">
      <button class="challenge-copy-btn" type="button">
        ${COPY_ICON}
        <span>Copy</span>
      </button>
      <pre><code class="language-${lang}">${escHtml(solution)}</code></pre>
    </div>
  `;

  // ── Target output iframe ──────────────────────────────────────────────────
  const targetFrame = el.querySelector<HTMLIFrameElement>(".challenge-target-frame")!;
  targetFrame.srcdoc = targetSrc;
  targetFrame.addEventListener("load", () => {
    try {
      const body = targetFrame.contentDocument?.body;
      if (body) {
        targetFrame.style.height = Math.max(80, body.scrollHeight + 2) + "px";
      }
    } catch (_) { /* cross-origin guard */ }
  });

  const checkBtn   = el.querySelector<HTMLButtonElement>(".challenge-check-btn")!;
  const resultDiv  = el.querySelector<HTMLElement>(".challenge-result")!;
  const showBtn    = el.querySelector<HTMLButtonElement>(".challenge-show-btn")!;
  const solutionEl = el.querySelector<HTMLElement>(".challenge-solution-code")!;
  const copyBtn    = el.querySelector<HTMLButtonElement>(".challenge-copy-btn")!;

  showBtn.addEventListener("click", () => {
    const open = solutionEl.style.display !== "none";
    solutionEl.style.display = open ? "none" : "block";
    showBtn.textContent = open ? "Show solution" : "Hide solution";
  });
  const copyLbl   = copyBtn.querySelector("span")!;
  const codeEl    = el.querySelector<HTMLElement>(".challenge-solution-code pre code")!;

  checkBtn.addEventListener("click", () => {
    // Use .try-example iframe to avoid matching the target preview iframe
    const iframe = el.querySelector<HTMLIFrameElement>(".try-example iframe");
    if (!iframe?.contentDocument?.body) {
      resultDiv.style.display = "block";
      resultDiv.className = "challenge-result fail";
      resultDiv.innerHTML = "&#9888;&#65039; Run your code first, then check.";
      return;
    }
    const doc = iframe.contentDocument;
    const missing: string[] = [];
    for (const sel of checks) {
      if (!doc.querySelector(sel)) {
        missing.push(`Try adding a &lt;${sel}&gt; tag`);
      }
    }
    resultDiv.style.display = "block";
    if (missing.length === 0) {
      resultDiv.className = "challenge-result pass";
      resultDiv.innerHTML = "&#9989; All checks passed! Great work.";
    } else {
      resultDiv.className = "challenge-result fail";
      resultDiv.innerHTML = `&#9888;&#65039; ${missing.join(" &mdash; ")}`;
    }
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(codeEl.textContent ?? "").then(() => {
      copyLbl.textContent = "Copied!";
      setTimeout(() => { copyLbl.textContent = "Copy"; }, 2000);
    });
  });

  // editor.js MutationObserver picks up .try-example automatically.
  // Manual call is a safety net for when the observer already fired.
  const editorSection = el.querySelector<HTMLElement>(".try-example");
  if (editorSection && typeof window.__editorInit === "function") {
    window.__editorInit(editorSection);
  }
}

export function renderChallenges(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>(".challenge:not([data-ci])").forEach(initChallenge);
}
