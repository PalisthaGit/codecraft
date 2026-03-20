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

  el.innerHTML = `
    <div class="challenge-header">
      <span class="challenge-badge">Challenge</span>
      <h3 class="challenge-title">${escHtml(title)}</h3>
    </div>
    <p class="challenge-desc">${escHtml(description)}</p>
    <section class="try-example" ${editorAttrs}></section>
    <button class="challenge-check-btn" type="button">Check my answer</button>
    <div class="challenge-result" style="display:none"></div>
    <details class="challenge-solution">
      <summary>Show solution</summary>
      <div class="challenge-solution-code">
        <button class="challenge-copy-btn" type="button">
          ${COPY_ICON}
          <span>Copy</span>
        </button>
        <pre><code class="language-${lang}">${escHtml(solution)}</code></pre>
      </div>
    </details>
  `;

  const checkBtn = el.querySelector<HTMLButtonElement>(".challenge-check-btn")!;
  const resultDiv = el.querySelector<HTMLElement>(".challenge-result")!;
  const copyBtn   = el.querySelector<HTMLButtonElement>(".challenge-copy-btn")!;
  const copyLbl   = copyBtn.querySelector("span")!;
  const codeEl    = el.querySelector<HTMLElement>(".challenge-solution pre code")!;

  checkBtn.addEventListener("click", () => {
    const iframe = el.querySelector<HTMLIFrameElement>("iframe");
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
