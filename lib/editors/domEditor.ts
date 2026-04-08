export function initDomEditor(): void {
  const HTML_DEFAULT = [
    '<div class="box">',
    '  <h2 id="title">Hello, DOM!</h2>',
    '  <p id="desc">Click the button below.</p>',
    '  <button id="btn">Change Text</button>',
    '</div>'
  ].join('\n');

  const CSS_DEFAULT = [
    '.box {',
    '  font-family: sans-serif;',
    '  padding: 1.5rem;',
    '  max-width: 320px;',
    '  border-radius: 12px;',
    '  border: 1.5px solid #e5e7eb;',
    '}',
    'h2 { color: #0f172a; margin: 0 0 8px; }',
    'p  { color: #64748b; margin: 0 0 12px; }',
    'button {',
    '  background: #6367ff;',
    '  color: white;',
    '  border: none;',
    '  border-radius: 8px;',
    '  padding: 8px 18px;',
    '  cursor: pointer;',
    '  font-weight: 700;',
    '}'
  ].join('\n');

  const JS_DEFAULT = [
    "var btn   = document.getElementById('btn');",
    "var title = document.getElementById('title');",
    "var desc  = document.getElementById('desc');",
    "",
    "btn.addEventListener('click', function () {",
    "  title.textContent = 'Text Changed!';",
    "  desc.textContent  = 'The DOM was updated by JavaScript.';",
    "  btn.textContent   = 'Click again';",
    "  btn.style.background = '#22c55e';",
    "});"
  ].join('\n');

  const htmlTA      = document.getElementById('dom-textarea') as HTMLTextAreaElement;
  const cssTA       = document.getElementById('dom-css-textarea') as HTMLTextAreaElement;
  const jsTA        = document.getElementById('dom-js-textarea') as HTMLTextAreaElement;
  const htmlPane    = document.getElementById('dom-html-pane') as HTMLElement;
  const cssPane     = document.getElementById('dom-css-pane') as HTMLElement;
  const jsPane      = document.getElementById('dom-js-pane') as HTMLElement;
  const htmlView    = document.getElementById('dom-html-view') as HTMLElement;
  const cssView     = document.getElementById('dom-css-view') as HTMLElement;
  const jsView      = document.getElementById('dom-js-view') as HTMLElement;
  const editorWrap  = document.getElementById('dom-editor-wrap') as HTMLElement;
  const tabHtml     = document.getElementById('dom-tab-html') as HTMLButtonElement;
  const tabCss      = document.getElementById('dom-tab-css') as HTMLButtonElement;
  const tabJs       = document.getElementById('dom-tab-js') as HTMLButtonElement;
  const runBtn      = document.getElementById('dom-run-btn') as HTMLButtonElement;
  const tryBtn      = document.getElementById('dom-try-btn') as HTMLButtonElement;
  const copyBtn     = document.getElementById('dom-copy-btn') as HTMLButtonElement;
  const copyLbl     = document.getElementById('dom-copy-label') as HTMLElement;
  const output      = document.getElementById('dom-output') as HTMLIFrameElement;
  const outWrap     = document.getElementById('dom-output-wrap') as HTMLElement;
  const hlHtml      = document.getElementById('dom-hl-code') as HTMLElement;
  const hlCss       = document.getElementById('dom-css-hl-code') as HTMLElement;
  const hlJs        = document.getElementById('dom-js-hl-code') as HTMLElement;
  const mirrorH     = document.getElementById('dom-mirror') as HTMLElement;
  const mirrorC     = document.getElementById('dom-css-mirror') as HTMLElement;
  const mirrorJ     = document.getElementById('dom-js-mirror') as HTMLElement;
  const badge       = document.getElementById('dom-updated-badge') as HTMLElement;
  const editHint    = document.getElementById('dom-edit-hint') as HTMLElement;
  const jsViewPre   = document.getElementById('dom-js-view-pre') as HTMLElement;
  const htmlViewPre = document.getElementById('dom-html-view-pre') as HTMLElement;
  const cssViewPre  = document.getElementById('dom-css-view-pre') as HTMLElement;
  const jsViewCode  = document.getElementById('dom-js-code') as HTMLElement;
  const htmlViewCode= document.getElementById('dom-html-code') as HTMLElement;
  const cssViewCode = document.getElementById('dom-css-code') as HTMLElement;

  if (!tryBtn) return;

  const lineH = 14 * 1.7;
  const maxViewLines = 16;
  let editing = false;
  let activeTab = 'js';
  let typedChars = 0;
  let prevLen = 0;

  // ── Shared height ─────────────────────────────────────────────────────────
  const maxLines = Math.max(HTML_DEFAULT.split('\n').length, CSS_DEFAULT.split('\n').length, JS_DEFAULT.split('\n').length);
  let sharedH  = Math.min(maxLines, maxViewLines) * lineH + 32;
  sharedH = Math.max(sharedH, 120);

  [jsViewPre, htmlViewPre, cssViewPre].forEach(function (el) {
    el.style.height = sharedH + 'px';
    if (maxLines > maxViewLines) el.style.overflowY = 'auto';
  });
  [htmlPane, cssPane, jsPane].forEach(function (el) { el.style.height = sharedH + 'px'; });

  htmlTA.value = HTML_DEFAULT;
  cssTA.value  = CSS_DEFAULT;
  jsTA.value   = JS_DEFAULT;

  // ── Syntax highlighters ───────────────────────────────────────────────────
  function escH(s: string): string { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function highlightHTML(code: string): string {
    let result = '';
    const re = /<!--[\s\S]*?-->|<[^>]*>|[^<]+/g; let m: RegExpExecArray | null;
    const C = { bracket:'#c792ea', tag:'#c792ea', attr:'#ffcb6b', eq:'#e2e8f0', val:'#c3e88d', comment:'#546e7a' };
    while ((m = re.exec(code)) !== null) {
      const t = m[0];
      if (t.slice(0,4) === '<!--') { result += '<span style="color:' + C.comment + '">' + escH(t) + '</span>'; continue; }
      if (t[0] === '<') {
        let inner = t.slice(1,-1);
        if (!inner) { result += escH(t); continue; }
        if (inner[0]==='!') { result += '<span style="color:'+C.tag+'">'+escH(t)+'</span>'; continue; }
        const sc = inner.slice(-1)==='/'; if (sc) inner=inner.slice(0,-1).replace(/\s+$/,'');
        const cl = inner[0]==='/'; if (cl) inner=inner.slice(1);
        const sp = inner.search(/\s/);
        const tn = sp===-1?inner:inner.slice(0,sp);
        const rt = sp===-1?'':inner.slice(sp);
        const hr = escH(rt).replace(/([\w:-]+)(=)("(?:[^"]*)")/g,'<span style="color:'+C.attr+'">$1</span><span style="color:'+C.eq+'">$2</span><span style="color:'+C.val+'">$3</span>');
        result += '<span style="color:'+C.bracket+'">&lt;'+(cl?'/':'')+'</span><span style="color:'+C.tag+'">'+escH(tn)+'</span>'+hr+'<span style="color:'+C.bracket+'">'+(sc?'/':'')+'&gt;</span>';
        continue;
      }
      result += escH(t);
    }
    return result;
  }

  function highlightCSS(code: string): string {
    let out = '';
    const re = /(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|((?:[^{};\/\n"'])+)(\{)|([\w-]+)(\s*:\s*)((?:[^;{}\/\n"'])+)(;?)|([\s\S])/g; let m: RegExpExecArray | null;
    while ((m = re.exec(code)) !== null) {
      if (m[1]) { out += '<span style="color:#546e7a;font-style:italic">' + escH(m[1]) + '</span>'; }
      else if (m[2]) { out += '<span style="color:#c3e88d">' + escH(m[2]) + '</span>'; }
      else if (m[3] !== undefined) { out += '<span style="color:#c792ea">' + escH(m[3]) + '</span><span style="color:#e2e8f0">' + escH(m[4]) + '</span>'; }
      else if (m[5] !== undefined) { out += '<span style="color:#80cbc4">' + escH(m[5]) + '</span><span style="color:#e2e8f0">' + escH(m[6]) + '</span><span style="color:#f78c6c">' + escH(m[7]) + '</span><span style="color:#e2e8f0">' + escH(m[8]) + '</span>'; }
      else { out += escH(m[9]); }
    }
    return out;
  }

  function highlightJS(code: string): string {
    let out = '';
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) out += '\n';
      const line = lines[i];
      // line comment
      const ci = line.indexOf('//');
      const codePart = ci === -1 ? line : line.slice(0, ci);
      const commentPart = ci === -1 ? '' : line.slice(ci);
      // process code part token by token
      const re2 = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*\b)|([\w$]+)/g; let m2: RegExpExecArray | null;
      let last = 0, codeOut = '';
      while ((m2 = re2.exec(codePart)) !== null) {
        codeOut += escH(codePart.slice(last, m2.index));
        if (m2[1]) {
          codeOut += '<span style="color:#c3e88d">' + escH(m2[1]) + '</span>';
        } else if (m2[2]) {
          codeOut += '<span style="color:#f78c6c">' + escH(m2[2]) + '</span>';
        } else if (m2[3]) {
          const word = m2[3];
          if (/^(var|const|let|function|return|if|else|for|while|new|this|class|import|export|default|typeof|instanceof|true|false|null|undefined|async|await|of|in)$/.test(word)) {
            codeOut += '<span style="color:#c792ea;font-weight:700">' + escH(word) + '</span>';
          } else {
            // check if followed by (
            const after = codePart.slice(m2.index + word.length).match(/^\s*\(/);
            if (after) {
              codeOut += '<span style="color:#82aaff">' + escH(word) + '</span>';
            } else {
              codeOut += escH(word);
            }
          }
        }
        last = m2.index + m2[0].length;
      }
      codeOut += escH(codePart.slice(last));
      out += codeOut;
      if (commentPart) {
        out += '<span style="color:#546e7a;font-style:italic">' + escH(commentPart) + '</span>';
      }
    }
    return out;
  }

  // ── Populate read-only views ──────────────────────────────────────────────
  jsViewCode.innerHTML   = highlightJS(JS_DEFAULT);
  htmlViewCode.innerHTML = highlightHTML(HTML_DEFAULT);
  cssViewCode.innerHTML  = highlightCSS(CSS_DEFAULT);

  // ── Tab switching ─────────────────────────────────────────────────────────
  function setTab(tab: string): void {
    activeTab = tab;
    const isJs   = tab === 'js';
    const isHtml = tab === 'html';
    const isCss  = tab === 'css';

    tabJs.style.color   = isJs   ? '#fff' : 'rgba(255,255,255,0.35)';
    tabHtml.style.color = isHtml ? '#fff' : 'rgba(255,255,255,0.35)';
    tabCss.style.color  = isCss  ? '#fff' : 'rgba(255,255,255,0.35)';
    tabJs.style.borderBottomColor   = isJs   ? '#6367ff' : 'transparent';
    tabHtml.style.borderBottomColor = isHtml ? '#6367ff' : 'transparent';
    tabCss.style.borderBottomColor  = isCss  ? '#6367ff' : 'transparent';

    if (editing) {
      jsPane.style.display   = isJs   ? '' : 'none';
      htmlPane.style.display = isHtml ? '' : 'none';
      cssPane.style.display  = isCss  ? '' : 'none';
    } else {
      jsView.style.display   = isJs   ? '' : 'none';
      htmlView.style.display = isHtml ? '' : 'none';
      cssView.style.display  = isCss  ? '' : 'none';
    }
  }
  tabHtml.addEventListener('click', function () { setTab('html'); });
  tabCss.addEventListener('click',  function () { setTab('css');  });
  tabJs.addEventListener('click',   function () { setTab('js');   });

  // ── Try It Yourself toggle ────────────────────────────────────────────────
  tryBtn.addEventListener('click', function () {
    editing = !editing;
    if (editing) {
      jsView.style.display = 'none'; htmlView.style.display = 'none'; cssView.style.display = 'none';
      editorWrap.style.display = 'block';
      tryBtn.textContent = 'Close Editor'; tryBtn.style.background = '#334155'; tryBtn.style.animation = 'none';
      runBtn.style.display = 'flex';
      setTab(activeTab);
      hlHtml.innerHTML = highlightHTML(htmlTA.value);
      hlCss.innerHTML  = highlightCSS(cssTA.value);
      hlJs.innerHTML   = highlightJS(jsTA.value);
      jsTA.focus();
      typedChars = 0; prevLen = jsTA.value.length;
      editHint.style.display = 'block'; editHint.style.animation = 'none';
      editHint.offsetHeight;
      editHint.style.animation = 'dom-hint-pop 0.35s ease forwards';
    } else {
      editorWrap.style.display = 'none';
      tryBtn.textContent = 'Try It Yourself'; tryBtn.style.background = '#6367FF';
      tryBtn.style.animation = 'dom-btn-glow 1.8s ease-in-out infinite';
      runBtn.style.display = 'none';
      setTab(activeTab);
      htmlTA.value = HTML_DEFAULT; cssTA.value = CSS_DEFAULT; jsTA.value = JS_DEFAULT;
      output.srcdoc = buildSrc();
    }
  });

  // ── Live highlight ────────────────────────────────────────────────────────
  function dismissHint(ta: HTMLTextAreaElement): void {
    const delta = ta.value.length - prevLen;
    if (delta > 0) typedChars += delta;
    prevLen = ta.value.length;
    if (typedChars >= 5 && editHint.style.display !== 'none') {
      editHint.style.animation = 'dom-hint-out 0.4s ease forwards';
      setTimeout(function () { editHint.style.display = 'none'; }, 400);
    }
  }
  htmlTA.addEventListener('input', function () { hlHtml.innerHTML = highlightHTML(htmlTA.value); dismissHint(htmlTA); });
  cssTA.addEventListener('input',  function () { hlCss.innerHTML  = highlightCSS(cssTA.value);  dismissHint(cssTA);  });
  jsTA.addEventListener('input',   function () { hlJs.innerHTML   = highlightJS(jsTA.value);    dismissHint(jsTA);   });

  // ── Sync scroll ───────────────────────────────────────────────────────────
  htmlTA.addEventListener('scroll', function () { mirrorH.scrollTop = htmlTA.scrollTop; mirrorH.scrollLeft = htmlTA.scrollLeft; });
  cssTA.addEventListener('scroll',  function () { mirrorC.scrollTop = cssTA.scrollTop;  mirrorC.scrollLeft = cssTA.scrollLeft;  });
  jsTA.addEventListener('scroll',   function () { mirrorJ.scrollTop = jsTA.scrollTop;   mirrorJ.scrollLeft = jsTA.scrollLeft;   });

  // ── Tab key indent ────────────────────────────────────────────────────────
  [htmlTA, cssTA, jsTA].forEach(function (ta) {
    ta.addEventListener('keydown', function (e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      e.preventDefault();
      const s = ta.selectionStart;
      ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 2;
      ta.dispatchEvent(new Event('input'));
    });
  });

  // ── Run ───────────────────────────────────────────────────────────────────
  function buildSrc(): string {
    const parts = [
      '<!DOCTYPE html><html><head>',
      '<style>', cssTA.value, '</style>',
      '</head><body style="margin:0;padding:16px;font-family:sans-serif;">',
      htmlTA.value,
      '<scr', 'ipt>', jsTA.value, '</scr', 'ipt>',
      '</body></html>'
    ];
    return parts.join('');
  }

  function runCode(): void {
    const src = buildSrc();
    output.srcdoc = src;
    outWrap.classList.remove('dom-output-glow-once');
    void outWrap.offsetWidth;
    outWrap.classList.add('dom-output-glow-once');
    badge.style.display = 'inline-block';
    clearTimeout((badge as HTMLElement & { _t?: ReturnType<typeof setTimeout> })._t);
    (badge as HTMLElement & { _t?: ReturnType<typeof setTimeout> })._t = setTimeout(function () { badge.style.display = 'none'; }, 2000);
  }
  runBtn.addEventListener('click', runCode);

  // ── Auto-resize iframe ────────────────────────────────────────────────────
  output.addEventListener('load', function () {
    try {
      const body = output.contentDocument!.body;
      body.style.margin = '0'; body.style.padding = '16px'; body.style.boxSizing = 'border-box';
      output.style.height = Math.max(220, Math.min(body.scrollHeight, 500)) + 'px';
    } catch(e) {}
  });

  // ── Copy active tab ───────────────────────────────────────────────────────
  copyBtn.addEventListener('click', function () {
    const val = activeTab === 'js' ? jsTA.value : activeTab === 'css' ? cssTA.value : htmlTA.value;
    navigator.clipboard.writeText(val).then(function () {
      copyLbl.textContent = 'Copied!';
      setTimeout(function () { copyLbl.textContent = 'Copy'; }, 2000);
    });
  });

  // ── Initial preview ───────────────────────────────────────────────────────
  output.srcdoc = buildSrc();
}
