(function () {
  'use strict';

  function initSection(section) {
    if (section.dataset.editorInit) return;
    section.dataset.editorInit = 'true';

    // Read default code from <template> elements embedded in the section
    var tplHtml = section.querySelector('template.try-default-html');
    var tplCss  = section.querySelector('template.try-default-css');
    var tplJs   = section.querySelector('template.try-default-js');

    var HTML_DEFAULT = tplHtml ? tplHtml.innerHTML.trim() : '';
    var CSS_DEFAULT  = tplCss  ? tplCss.innerHTML.trim()  : '';
    var JS_DEFAULT   = tplJs   ? tplJs.innerHTML.trim()   : '';

    var htmlTA       = document.getElementById('dom-textarea');
    var cssTA        = document.getElementById('dom-css-textarea');
    var jsTA         = document.getElementById('dom-js-textarea');
    var htmlPane     = document.getElementById('dom-html-pane');
    var cssPane      = document.getElementById('dom-css-pane');
    var jsPane       = document.getElementById('dom-js-pane');
    var htmlView     = document.getElementById('dom-html-view');
    var cssView      = document.getElementById('dom-css-view');
    var jsView       = document.getElementById('dom-js-view');
    var editorWrap   = document.getElementById('dom-editor-wrap');
    var tabHtml      = document.getElementById('dom-tab-html');
    var tabCss       = document.getElementById('dom-tab-css');
    var tabJs        = document.getElementById('dom-tab-js');
    var runBtn       = document.getElementById('dom-run-btn');
    var tryBtn       = document.getElementById('dom-try-btn');
    var copyBtn      = document.getElementById('dom-copy-btn');
    var copyLbl      = document.getElementById('dom-copy-label');
    var output       = document.getElementById('dom-output');
    var outWrap      = document.getElementById('dom-output-wrap');
    var hlHtml       = document.getElementById('dom-hl-code');
    var hlCss        = document.getElementById('dom-css-hl-code');
    var hlJs         = document.getElementById('dom-js-hl-code');
    var mirrorH      = document.getElementById('dom-mirror');
    var mirrorC      = document.getElementById('dom-css-mirror');
    var mirrorJ      = document.getElementById('dom-js-mirror');
    var badge        = document.getElementById('dom-updated-badge');
    var editHint     = document.getElementById('dom-edit-hint');
    var jsViewPre    = document.getElementById('dom-js-view-pre');
    var htmlViewPre  = document.getElementById('dom-html-view-pre');
    var cssViewPre   = document.getElementById('dom-css-view-pre');
    var jsViewCode   = document.getElementById('dom-js-code');
    var htmlViewCode = document.getElementById('dom-html-code');
    var cssViewCode  = document.getElementById('dom-css-code');

    // Guard: if key elements are missing the section isn't ready yet
    if (!htmlTA || !jsTA || !output) return;

    var lineH        = 14 * 1.7;
    var maxViewLines = 16;
    var editing      = false;
    var activeTab    = 'js';
    var typedChars   = 0;
    var prevLen      = 0;

    // ── Shared height ───────────────────────────────────────────────────────
    var maxLines = Math.max(
      HTML_DEFAULT.split('\n').length,
      CSS_DEFAULT.split('\n').length,
      JS_DEFAULT.split('\n').length
    );
    var sharedH = Math.min(maxLines, maxViewLines) * lineH + 32;
    sharedH = Math.max(sharedH, 120);

    [jsViewPre, htmlViewPre, cssViewPre].forEach(function (el) {
      if (!el) return;
      el.style.height = sharedH + 'px';
      if (maxLines > maxViewLines) el.style.overflowY = 'auto';
    });
    [htmlPane, cssPane, jsPane].forEach(function (el) {
      if (el) el.style.height = sharedH + 'px';
    });

    htmlTA.value = HTML_DEFAULT;
    cssTA.value  = CSS_DEFAULT;
    jsTA.value   = JS_DEFAULT;

    // ── Syntax highlighters ─────────────────────────────────────────────────
    function escH(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function highlightHTML(code) {
      var result = '';
      var re = /<!--[\s\S]*?-->|<[^>]*>|[^<]+/g, m;
      var C = { bracket: '#c792ea', tag: '#c792ea', attr: '#ffcb6b', eq: '#e2e8f0', val: '#c3e88d', comment: '#546e7a' };
      while ((m = re.exec(code)) !== null) {
        var t = m[0];
        if (t.slice(0, 4) === '<!--') {
          result += '<span style="color:' + C.comment + '">' + escH(t) + '</span>';
          continue;
        }
        if (t[0] === '<') {
          var inner = t.slice(1, -1);
          if (!inner) { result += escH(t); continue; }
          if (inner[0] === '!') { result += '<span style="color:' + C.tag + '">' + escH(t) + '</span>'; continue; }
          var sc = inner.slice(-1) === '/';
          if (sc) inner = inner.slice(0, -1).replace(/\s+$/, '');
          var cl = inner[0] === '/';
          if (cl) inner = inner.slice(1);
          var sp = inner.search(/\s/);
          var tn = sp === -1 ? inner : inner.slice(0, sp);
          var rt = sp === -1 ? '' : inner.slice(sp);
          var hr = escH(rt).replace(
            /([\w:-]+)(=)("(?:[^"]*)")/g,
            '<span style="color:' + C.attr + '">$1</span><span style="color:' + C.eq + '">$2</span><span style="color:' + C.val + '">$3</span>'
          );
          result += '<span style="color:' + C.bracket + '">&lt;' + (cl ? '/' : '') + '</span>' +
            '<span style="color:' + C.tag + '">' + escH(tn) + '</span>' +
            hr +
            '<span style="color:' + C.bracket + '">' + (sc ? '/' : '') + '&gt;</span>';
          continue;
        }
        result += escH(t);
      }
      return result;
    }

    function highlightCSS(code) {
      var out = '';
      var re = /(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|((?:[^{};\/\n"'])+)(\{)|([\w-]+)(\s*:\s*)((?:[^;{}\/\n"'])+)(;?)|([\s\S])/g, m;
      while ((m = re.exec(code)) !== null) {
        if (m[1]) {
          out += '<span style="color:#546e7a;font-style:italic">' + escH(m[1]) + '</span>';
        } else if (m[2]) {
          out += '<span style="color:#c3e88d">' + escH(m[2]) + '</span>';
        } else if (m[3] !== undefined) {
          out += '<span style="color:#c792ea">' + escH(m[3]) + '</span>' +
                 '<span style="color:#e2e8f0">' + escH(m[4]) + '</span>';
        } else if (m[5] !== undefined) {
          out += '<span style="color:#80cbc4">'  + escH(m[5]) + '</span>' +
                 '<span style="color:#e2e8f0">'  + escH(m[6]) + '</span>' +
                 '<span style="color:#f78c6c">'  + escH(m[7]) + '</span>' +
                 '<span style="color:#e2e8f0">'  + escH(m[8]) + '</span>';
        } else {
          out += escH(m[9]);
        }
      }
      return out;
    }

    function highlightJS(code) {
      var out   = '';
      var lines = code.split('\n');
      for (var i = 0; i < lines.length; i++) {
        if (i > 0) out += '\n';
        var line        = lines[i];
        var ci          = line.indexOf('//');
        var codePart    = ci === -1 ? line : line.slice(0, ci);
        var commentPart = ci === -1 ? '' : line.slice(ci);
        var re2 = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*\b)|([\w$]+)/g, m2;
        var last = 0, codeOut = '';
        while ((m2 = re2.exec(codePart)) !== null) {
          codeOut += escH(codePart.slice(last, m2.index));
          if (m2[1]) {
            codeOut += '<span style="color:#c3e88d">' + escH(m2[1]) + '</span>';
          } else if (m2[2]) {
            codeOut += '<span style="color:#f78c6c">' + escH(m2[2]) + '</span>';
          } else if (m2[3]) {
            var word = m2[3];
            if (/^(var|const|let|function|return|if|else|for|while|new|this|class|import|export|default|typeof|instanceof|true|false|null|undefined|async|await|of|in)$/.test(word)) {
              codeOut += '<span style="color:#c792ea;font-weight:700">' + escH(word) + '</span>';
            } else {
              var after = codePart.slice(m2.index + word.length).match(/^\s*\(/);
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

    // ── Populate read-only views ────────────────────────────────────────────
    if (jsViewCode)   jsViewCode.innerHTML   = highlightJS(JS_DEFAULT);
    if (htmlViewCode) htmlViewCode.innerHTML = highlightHTML(HTML_DEFAULT);
    if (cssViewCode)  cssViewCode.innerHTML  = highlightCSS(CSS_DEFAULT);

    // ── Tab switching ───────────────────────────────────────────────────────
    function setTab(tab) {
      activeTab = tab;
      var isJs   = tab === 'js';
      var isHtml = tab === 'html';
      var isCss  = tab === 'css';

      if (tabJs)   tabJs.style.color   = isJs   ? '#fff' : 'rgba(255,255,255,0.35)';
      if (tabHtml) tabHtml.style.color = isHtml ? '#fff' : 'rgba(255,255,255,0.35)';
      if (tabCss)  tabCss.style.color  = isCss  ? '#fff' : 'rgba(255,255,255,0.35)';
      if (tabJs)   tabJs.style.borderBottomColor   = isJs   ? '#6367ff' : 'transparent';
      if (tabHtml) tabHtml.style.borderBottomColor = isHtml ? '#6367ff' : 'transparent';
      if (tabCss)  tabCss.style.borderBottomColor  = isCss  ? '#6367ff' : 'transparent';

      if (editing) {
        if (jsPane)   jsPane.style.display   = isJs   ? '' : 'none';
        if (htmlPane) htmlPane.style.display = isHtml ? '' : 'none';
        if (cssPane)  cssPane.style.display  = isCss  ? '' : 'none';
      } else {
        if (jsView)   jsView.style.display   = isJs   ? '' : 'none';
        if (htmlView) htmlView.style.display = isHtml ? '' : 'none';
        if (cssView)  cssView.style.display  = isCss  ? '' : 'none';
      }
    }

    if (tabHtml) tabHtml.addEventListener('click', function () { setTab('html'); });
    if (tabCss)  tabCss.addEventListener('click',  function () { setTab('css');  });
    if (tabJs)   tabJs.addEventListener('click',   function () { setTab('js');   });

    // ── Try It Yourself toggle ──────────────────────────────────────────────
    if (tryBtn) tryBtn.addEventListener('click', function () {
      editing = !editing;
      if (editing) {
        if (jsView)     jsView.style.display     = 'none';
        if (htmlView)   htmlView.style.display   = 'none';
        if (cssView)    cssView.style.display    = 'none';
        if (editorWrap) editorWrap.style.display = 'block';
        tryBtn.textContent      = 'Close Editor';
        tryBtn.style.background = '#334155';
        tryBtn.style.animation  = 'none';
        if (runBtn) runBtn.style.display = 'flex';
        setTab(activeTab);
        if (hlHtml) hlHtml.innerHTML = highlightHTML(htmlTA.value);
        if (hlCss)  hlCss.innerHTML  = highlightCSS(cssTA.value);
        if (hlJs)   hlJs.innerHTML   = highlightJS(jsTA.value);
        jsTA.focus();
        typedChars = 0;
        prevLen    = jsTA.value.length;
        if (editHint) {
          editHint.style.display   = 'block';
          editHint.style.animation = 'none';
          editHint.offsetHeight;
          editHint.style.animation = 'dom-hint-pop 0.35s ease forwards';
        }
      } else {
        if (editorWrap) editorWrap.style.display = 'none';
        tryBtn.textContent      = 'Try It Yourself';
        tryBtn.style.background = '#6367FF';
        tryBtn.style.animation  = 'dom-btn-glow 1.8s ease-in-out infinite';
        if (runBtn) runBtn.style.display = 'none';
        setTab(activeTab);
        htmlTA.value  = HTML_DEFAULT;
        cssTA.value   = CSS_DEFAULT;
        jsTA.value    = JS_DEFAULT;
        output.srcdoc = buildSrc();
      }
    });

    // ── Live syntax highlight ───────────────────────────────────────────────
    function dismissHint(ta) {
      var delta = ta.value.length - prevLen;
      if (delta > 0) typedChars += delta;
      prevLen = ta.value.length;
      if (typedChars >= 5 && editHint && editHint.style.display !== 'none') {
        editHint.style.animation = 'dom-hint-out 0.4s ease forwards';
        setTimeout(function () { if (editHint) editHint.style.display = 'none'; }, 400);
      }
    }

    htmlTA.addEventListener('input', function () {
      if (hlHtml) hlHtml.innerHTML = highlightHTML(htmlTA.value);
      dismissHint(htmlTA);
    });
    cssTA.addEventListener('input', function () {
      if (hlCss) hlCss.innerHTML = highlightCSS(cssTA.value);
      dismissHint(cssTA);
    });
    jsTA.addEventListener('input', function () {
      if (hlJs) hlJs.innerHTML = highlightJS(jsTA.value);
      dismissHint(jsTA);
    });

    // ── Sync scroll mirror ──────────────────────────────────────────────────
    if (mirrorH) htmlTA.addEventListener('scroll', function () {
      mirrorH.scrollTop  = htmlTA.scrollTop;
      mirrorH.scrollLeft = htmlTA.scrollLeft;
    });
    if (mirrorC) cssTA.addEventListener('scroll', function () {
      mirrorC.scrollTop  = cssTA.scrollTop;
      mirrorC.scrollLeft = cssTA.scrollLeft;
    });
    if (mirrorJ) jsTA.addEventListener('scroll', function () {
      mirrorJ.scrollTop  = jsTA.scrollTop;
      mirrorJ.scrollLeft = jsTA.scrollLeft;
    });

    // ── Tab key indent ──────────────────────────────────────────────────────
    [htmlTA, cssTA, jsTA].forEach(function (ta) {
      ta.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;
        e.preventDefault();
        var s    = ta.selectionStart;
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + 2;
        ta.dispatchEvent(new Event('input'));
      });
    });

    // ── Build and run ───────────────────────────────────────────────────────
    function buildSrc() {
      return [
        '<!DOCTYPE html><html><head>',
        '<style>', cssTA.value, '</style>',
        '</head><body style="margin:0;padding:16px;font-family:sans-serif;">',
        htmlTA.value,
        '<scr', 'ipt>', jsTA.value, '</scr', 'ipt>',
        '</body></html>'
      ].join('');
    }

    function runCode() {
      output.srcdoc = buildSrc();
      if (outWrap) {
        outWrap.classList.remove('dom-output-glow-once');
        void outWrap.offsetWidth;
        outWrap.classList.add('dom-output-glow-once');
      }
      if (badge) {
        badge.style.display = 'inline-block';
        clearTimeout(badge._t);
        badge._t = setTimeout(function () { badge.style.display = 'none'; }, 2000);
      }
    }

    if (runBtn) runBtn.addEventListener('click', runCode);

    // ── Auto-resize output iframe ───────────────────────────────────────────
    output.addEventListener('load', function () {
      try {
        var body = output.contentDocument.body;
        body.style.margin     = '0';
        body.style.padding    = '16px';
        body.style.boxSizing  = 'border-box';
        output.style.height   = Math.max(220, Math.min(body.scrollHeight, 500)) + 'px';
      } catch (e) {}
    });

    // ── Copy active tab ─────────────────────────────────────────────────────
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var val = activeTab === 'js'  ? jsTA.value
              : activeTab === 'css' ? cssTA.value
              : htmlTA.value;
      navigator.clipboard.writeText(val).then(function () {
        if (copyLbl) {
          copyLbl.textContent = 'Copied!';
          setTimeout(function () { copyLbl.textContent = 'Copy'; }, 2000);
        }
      });
    });

    // ── Initial preview ─────────────────────────────────────────────────────
    output.srcdoc = buildSrc();
  }

  // ── Scan document for any already-present .try-example sections ──────────
  function scanForEditors() {
    document.querySelectorAll('.try-example').forEach(function (section) {
      initSection(section);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanForEditors);
  } else {
    scanForEditors();
  }

  // ── Watch for sections injected dynamically (e.g. Next.js navigation) ────
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var added = mutations[i].addedNodes;
      for (var j = 0; j < added.length; j++) {
        var node = added[j];
        if (node.nodeType !== 1) continue;
        if (node.classList && node.classList.contains('try-example')) {
          initSection(node);
        }
        if (node.querySelectorAll) {
          node.querySelectorAll('.try-example').forEach(initSection);
        }
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
