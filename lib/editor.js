(function () {
  'use strict';

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

  // ── Per-section initialiser ─────────────────────────────────────────────

  var sectionCounter = 0;

  function initSection(section) {
    if (section.dataset.editorInit) return;
    section.dataset.editorInit = 'true';

    var sectionIndex = sectionCounter++;
    var isProject = window.location.pathname.includes('/projects/');
    function storageKey(tab) { return 'codecraft_editor_' + window.location.pathname + '_' + sectionIndex + '_' + tab; }

    // Read defaults from <template> elements (HTML lesson files)
    // or fall back to data-* attributes (React component usage)
    var tplHtml = section.querySelector('template.try-default-html');
    var tplCss  = section.querySelector('template.try-default-css');
    var tplJs   = section.querySelector('template.try-default-js');

    var HTML_DEFAULT = tplHtml ? tplHtml.innerHTML.trim() : (section.dataset.html || '');
    var CSS_DEFAULT  = tplCss  ? tplCss.innerHTML.trim()  : (section.dataset.css  || '');
    var JS_DEFAULT   = tplJs   ? tplJs.innerHTML.trim()   : (section.dataset.js   || '');

    var ORIG_HTML = HTML_DEFAULT;
    var ORIG_CSS  = CSS_DEFAULT;
    var ORIG_JS   = JS_DEFAULT;

    if (isProject) {
      var _sh = localStorage.getItem(storageKey('html'));
      var _sc = localStorage.getItem(storageKey('css'));
      var _sj = localStorage.getItem(storageKey('js'));
      if (_sh !== null) HTML_DEFAULT = _sh;
      if (_sc !== null) CSS_DEFAULT  = _sc;
      if (_sj !== null) JS_DEFAULT   = _sj;
    }

    var hasCss    = tplCss !== null || section.hasAttribute('data-css');
    var hasJs     = tplJs  !== null || section.hasAttribute('data-js');
    var startEdit = section.dataset.mode === 'edit';

    // ── Shared height ────────────────────────────────────────────────────
    var lineH        = 14 * 1.7;
    var maxViewLines = 16;
    var minEditLines = 12;

    var maxLines = Math.max(
      HTML_DEFAULT.split('\n').length,
      CSS_DEFAULT ? CSS_DEFAULT.split('\n').length : 0,
      JS_DEFAULT  ? JS_DEFAULT.split('\n').length  : 0
    );
    var sharedH = Math.min(maxLines, maxViewLines) * lineH + 32;
    sharedH = Math.max(sharedH, startEdit ? minEditLines * lineH + 32 : 120);

    // ── State ─────────────────────────────────────────────────────────────
    var editing    = startEdit;
    var activeTab  = hasJs ? 'js' : (hasCss ? 'css' : 'html');
    var typedChars = 0;
    var prevLen    = 0;

    // ── Build outer wrapper ───────────────────────────────────────────────
    var outerWrap = document.createElement('div');
    outerWrap.style.cssText = 'border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.12);';

    // ── Header ────────────────────────────────────────────────────────────
    var header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;background:#0f172a;padding:0 14px;border-bottom:1px solid rgba(255,255,255,0.07);';

    var tabBar = document.createElement('div');
    tabBar.style.cssText = 'display:flex;';

    var tabBtnBase = 'background:transparent;border:none;border-bottom:2px solid transparent;color:rgba(255,255,255,0.35);font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:10px 14px;cursor:pointer;font-family:\'JetBrains Mono\',monospace;';

    var tabHtml = document.createElement('button');
    tabHtml.textContent = 'HTML';
    tabHtml.style.cssText = tabBtnBase;
    tabBar.appendChild(tabHtml);

    var tabCss = null;
    if (hasCss) {
      tabCss = document.createElement('button');
      tabCss.textContent = 'CSS';
      tabCss.style.cssText = tabBtnBase;
      tabBar.appendChild(tabCss);
    }

    var tabJs = null;
    if (hasJs) {
      tabJs = document.createElement('button');
      tabJs.textContent = 'JS';
      tabJs.style.cssText = tabBtnBase;
      tabBar.appendChild(tabJs);
    }

    var actionBar = document.createElement('div');
    actionBar.style.cssText = 'display:flex;gap:6px;';

    var copyBtn = document.createElement('button');
    copyBtn.style.cssText = 'display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.08);color:#CBD5E1;border:none;border-radius:4px;padding:5px 12px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;line-height:1;';
    copyBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>';
    var copyLbl = copyBtn.querySelector('span');
    actionBar.appendChild(copyBtn);

    var runBtn = document.createElement('button');
    runBtn.style.cssText = (startEdit ? 'display:flex;' : 'display:none;') + 'align-items:center;gap:5px;background:#22c55e;color:white;border:none;border-radius:4px;padding:5px 12px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;line-height:1;';
    runBtn.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>Run';
    actionBar.appendChild(runBtn);

    var tryBtn = null;
    if (!startEdit) {
      tryBtn = document.createElement('button');
      tryBtn.textContent = 'Try It Yourself';
      tryBtn.style.cssText = 'background:#6367FF;color:white;border:none;border-radius:4px;padding:5px 12px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;line-height:1;animation:te-btn-glow 1.8s ease-in-out infinite;';
      actionBar.appendChild(tryBtn);
    }

    var resetBtn = null;
    if (isProject) {
      resetBtn = document.createElement('button');
      resetBtn.textContent = 'Reset';
      resetBtn.style.cssText = 'background:rgba(255,255,255,0.08);color:#94a3b8;border:none;border-radius:4px;padding:5px 10px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;line-height:1;';
      actionBar.appendChild(resetBtn);
    }

    header.appendChild(tabBar);
    header.appendChild(actionBar);
    outerWrap.appendChild(header);

    // ── Helper: make an editor pane (mirror + textarea) ───────────────────
    function makePane(defaultCode, hlFn) {
      var pane = document.createElement('div');
      pane.style.cssText = 'display:none;position:relative;overflow:hidden;background:#1E293B;height:' + sharedH + 'px;';

      var mirror = document.createElement('pre');
      mirror.className = 'te-mirror';
      mirror.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;margin:0;padding:16px;font-family:\'JetBrains Mono\',monospace;font-weight:600;font-size:14px;line-height:1.7;background:transparent;color:#e2e8f0;overflow:scroll;scrollbar-width:none;white-space:pre-wrap;word-wrap:break-word;pointer-events:none;box-sizing:border-box;';

      var hl = document.createElement('code');
      hl.style.cssText = 'font-family:inherit;font-size:inherit;line-height:inherit;background:transparent;white-space:pre-wrap;word-wrap:break-word;';
      hl.innerHTML = hlFn(defaultCode);
      mirror.appendChild(hl);

      var ta = document.createElement('textarea');
      ta.className = 'te-textarea';
      ta.spellcheck = false;
      ta.value = defaultCode;
      ta.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:transparent;color:transparent;caret-color:#e2e8f0;font-family:\'JetBrains Mono\',monospace;font-weight:600;font-size:14px;line-height:1.7;padding:16px;border:none;resize:none;outline:none;box-sizing:border-box;white-space:pre-wrap;word-wrap:break-word;overflow-y:scroll;overflow-x:hidden;tab-size:2;';

      pane.appendChild(mirror);
      pane.appendChild(ta);
      return { pane: pane, ta: ta, mirror: mirror, hl: hl };
    }

    // ── Helper: make a read-only view pane ───────────────────────────────
    function makeView(defaultCode, hlFn) {
      var view = document.createElement('div');
      view.style.cssText = 'display:none;background:#1E293B;';

      var pre = document.createElement('pre');
      pre.style.cssText = 'margin:0;padding:16px;background:transparent;overflow-y:auto;overflow-x:auto;box-sizing:border-box;height:' + sharedH + 'px;';
      if (maxLines > maxViewLines) pre.style.overflowY = 'auto';

      var codeEl = document.createElement('code');
      codeEl.style.cssText = 'background:transparent;font-size:14px;line-height:1.7;font-family:\'JetBrains Mono\',monospace;font-weight:600;white-space:pre;display:block;';
      codeEl.innerHTML = hlFn(defaultCode);
      pre.appendChild(codeEl);
      view.appendChild(pre);
      return { view: view, codeEl: codeEl };
    }

    // ── Read-only views (visible before "Try It Yourself") ────────────────
    var htmlView = makeView(HTML_DEFAULT, highlightHTML);
    var cssView  = hasCss ? makeView(CSS_DEFAULT, highlightCSS) : null;
    var jsView   = hasJs  ? makeView(JS_DEFAULT,  highlightJS)  : null;

    if (!startEdit) {
      outerWrap.appendChild(htmlView.view);
      if (cssView) outerWrap.appendChild(cssView.view);
      if (jsView)  outerWrap.appendChild(jsView.view);
    }

    // ── Editor wrap ──────────────────────────────────────────────────────
    var editorWrap = document.createElement('div');
    editorWrap.style.display = startEdit ? 'block' : 'none';

    var htmlPane = makePane(HTML_DEFAULT, highlightHTML);
    var cssPane  = hasCss ? makePane(CSS_DEFAULT, highlightCSS) : null;
    var jsPane   = hasJs  ? makePane(JS_DEFAULT,  highlightJS)  : null;

    // Badge and edit hint live in the primary pane
    var primaryPane = (jsPane || cssPane || htmlPane).pane;

    var badge = document.createElement('span');
    badge.style.cssText = 'display:none;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:15px;font-weight:800;color:#fff;background:rgba(34,197,94,0.92);border:none;border-radius:12px;padding:10px 28px;pointer-events:none;z-index:10;white-space:nowrap;box-shadow:0 4px 24px rgba(34,197,94,0.5);letter-spacing:0.02em;';
    badge.innerHTML = '&#10003; Output updated';
    primaryPane.appendChild(badge);

    var editHint = document.createElement('div');
    editHint.style.cssText = 'display:none;position:absolute;bottom:12px;left:50%;transform:translateX(-50%);background:rgba(99,103,255,0.92);color:white;font-size:12px;font-weight:700;padding:7px 16px;border-radius:20px;white-space:nowrap;pointer-events:none;box-shadow:0 4px 12px rgba(99,103,255,0.4);';
    editHint.innerHTML = '&#9999;&#65039; Edit the code, then hit Run to see your result';
    primaryPane.appendChild(editHint);

    editorWrap.appendChild(htmlPane.pane);
    if (cssPane) editorWrap.appendChild(cssPane.pane);
    if (jsPane)  editorWrap.appendChild(jsPane.pane);

    outerWrap.appendChild(editorWrap);

    // ── Output section ───────────────────────────────────────────────────
    var outputLabel = document.createElement('p');
    outputLabel.style.cssText = 'margin:12px 0 6px;font-size:1.05rem;font-weight:700;color:#64748B;';
    outputLabel.textContent = 'Output';

    var outWrap = document.createElement('div');
    outWrap.style.cssText = 'border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;background:white;';

    var output = document.createElement('iframe');
    output.style.cssText = 'width:100%;height:220px;border:none;display:block;';
    outWrap.appendChild(output);

    // ── Inject into section ──────────────────────────────────────────────
    section.appendChild(outerWrap);
    section.appendChild(outputLabel);
    section.appendChild(outWrap);

    // ── Tab switching ────────────────────────────────────────────────────
    function setTab(tab) {
      activeTab = tab;

      var allTabs  = [{ el: tabHtml, key: 'html' }, { el: tabCss, key: 'css' }, { el: tabJs, key: 'js' }];
      var allViews = [{ d: htmlView, key: 'html' }, { d: cssView, key: 'css' }, { d: jsView, key: 'js' }];
      var allPanes = [{ d: htmlPane, key: 'html' }, { d: cssPane, key: 'css' }, { d: jsPane, key: 'js' }];

      allTabs.forEach(function (t) {
        if (!t.el) return;
        t.el.style.color = tab === t.key ? '#fff' : 'rgba(255,255,255,0.35)';
        t.el.style.borderBottomColor = tab === t.key ? '#6367ff' : 'transparent';
      });

      allViews.forEach(function (v) {
        if (!v.d) return;
        v.d.view.style.display = (!editing && tab === v.key) ? '' : 'none';
      });

      allPanes.forEach(function (p) {
        if (!p.d) return;
        p.d.pane.style.display = (editing && tab === p.key) ? '' : 'none';
      });
    }

    tabHtml.addEventListener('click', function () { setTab('html'); });
    if (tabCss) tabCss.addEventListener('click', function () { setTab('css'); });
    if (tabJs)  tabJs.addEventListener('click',  function () { setTab('js');  });

    // ── Try It Yourself toggle ───────────────────────────────────────────
    if (tryBtn) {
      tryBtn.addEventListener('click', function () {
        editing = !editing;

        if (editing) {
          [htmlView, cssView, jsView].forEach(function (v) {
            if (v) v.view.style.display = 'none';
          });
          editorWrap.style.display = 'block';
          tryBtn.textContent = 'Close Editor';
          tryBtn.style.background = '#334155';
          tryBtn.style.animation = 'none';
          runBtn.style.display = 'flex';
          setTab(activeTab);

          htmlPane.hl.innerHTML = highlightHTML(htmlPane.ta.value);
          if (cssPane) cssPane.hl.innerHTML = highlightCSS(cssPane.ta.value);
          if (jsPane)  jsPane.hl.innerHTML  = highlightJS(jsPane.ta.value);

          var focusTa = jsPane ? jsPane.ta : (cssPane ? cssPane.ta : htmlPane.ta);
          focusTa.focus();
          typedChars = 0;
          prevLen = focusTa.value.length;

          editHint.style.display = 'block';
          editHint.style.animation = 'none';
          editHint.offsetHeight;
          editHint.style.animation = 'te-hint-pop 0.35s ease forwards';
        } else {
          editorWrap.style.display = 'none';
          tryBtn.textContent = 'Try It Yourself';
          tryBtn.style.background = '#6367FF';
          tryBtn.style.animation = 'te-btn-glow 1.8s ease-in-out infinite';
          runBtn.style.display = 'none';
          setTab(activeTab);

          if (!isProject) {
            htmlPane.ta.value = HTML_DEFAULT;
            if (cssPane) cssPane.ta.value = CSS_DEFAULT;
            if (jsPane)  jsPane.ta.value  = JS_DEFAULT;
          }
          output.srcdoc = buildSrc();
        }
      });
    }

    // ── Debounced localStorage save (project pages only) ─────────────────
    var saveTimer;
    function debouncedSave(tab, value) {
      if (!isProject) return;
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        localStorage.setItem(storageKey(tab), value);
      }, 500);
    }

    // ── Live syntax highlight + hint dismiss ─────────────────────────────
    function dismissHint(ta) {
      var delta = ta.value.length - prevLen;
      if (delta > 0) typedChars += delta;
      prevLen = ta.value.length;
      if (typedChars >= 5 && editHint.style.display !== 'none') {
        editHint.style.animation = 'te-hint-out 0.4s ease forwards';
        setTimeout(function () { editHint.style.display = 'none'; }, 400);
      }
    }

    htmlPane.ta.addEventListener('input', function () {
      htmlPane.hl.innerHTML = highlightHTML(htmlPane.ta.value);
      dismissHint(htmlPane.ta);
      debouncedSave('html', htmlPane.ta.value);
    });
    if (cssPane) cssPane.ta.addEventListener('input', function () {
      cssPane.hl.innerHTML = highlightCSS(cssPane.ta.value);
      dismissHint(cssPane.ta);
      debouncedSave('css', cssPane.ta.value);
    });
    if (jsPane) jsPane.ta.addEventListener('input', function () {
      jsPane.hl.innerHTML = highlightJS(jsPane.ta.value);
      dismissHint(jsPane.ta);
      debouncedSave('js', jsPane.ta.value);
    });

    // ── Scroll sync ──────────────────────────────────────────────────────
    htmlPane.ta.addEventListener('scroll', function () {
      htmlPane.mirror.scrollTop  = htmlPane.ta.scrollTop;
      htmlPane.mirror.scrollLeft = htmlPane.ta.scrollLeft;
    });
    if (cssPane) cssPane.ta.addEventListener('scroll', function () {
      cssPane.mirror.scrollTop  = cssPane.ta.scrollTop;
      cssPane.mirror.scrollLeft = cssPane.ta.scrollLeft;
    });
    if (jsPane) jsPane.ta.addEventListener('scroll', function () {
      jsPane.mirror.scrollTop  = jsPane.ta.scrollTop;
      jsPane.mirror.scrollLeft = jsPane.ta.scrollLeft;
    });

    // ── Tab key indent ───────────────────────────────────────────────────
    [htmlPane, cssPane, jsPane].forEach(function (p) {
      if (!p) return;
      p.ta.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;
        e.preventDefault();
        var s = p.ta.selectionStart;
        p.ta.value = p.ta.value.slice(0, s) + '  ' + p.ta.value.slice(p.ta.selectionEnd);
        p.ta.selectionStart = p.ta.selectionEnd = s + 2;
        p.ta.dispatchEvent(new Event('input'));
      });
    });

    // ── Build srcdoc ─────────────────────────────────────────────────────
    function buildSrc() {
      var html = htmlPane.ta.value;
      if (!hasCss && !hasJs) return html;
      var css = cssPane ? cssPane.ta.value : '';
      var js  = jsPane  ? jsPane.ta.value  : '';
      return [
        '<!DOCTYPE html><html><head>',
        css ? '<style>' + css + '</style>' : '',
        '</head><body style="margin:0;padding:16px;font-family:sans-serif;">',
        html,
        js ? '<scr' + 'ipt>' + js + '</scr' + 'ipt>' : '',
        '</body></html>'
      ].join('');
    }

    // ── Run ──────────────────────────────────────────────────────────────
    function runCode() {
      output.srcdoc = buildSrc();
      outWrap.classList.remove('te-output-glow');
      void outWrap.offsetWidth;
      outWrap.classList.add('te-output-glow');
      badge.style.display = 'inline-block';
      clearTimeout(badge._t);
      badge._t = setTimeout(function () { badge.style.display = 'none'; }, 2000);
    }

    runBtn.addEventListener('click', runCode);

    // ── Reset saved code (project pages only) ────────────────────────────
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        ['html', 'css', 'js'].forEach(function (tab) {
          localStorage.removeItem(storageKey(tab));
        });
        HTML_DEFAULT = ORIG_HTML;
        CSS_DEFAULT  = ORIG_CSS;
        JS_DEFAULT   = ORIG_JS;
        htmlPane.ta.value = ORIG_HTML;
        htmlPane.hl.innerHTML = highlightHTML(ORIG_HTML);
        if (cssPane) { cssPane.ta.value = ORIG_CSS; cssPane.hl.innerHTML = highlightCSS(ORIG_CSS); }
        if (jsPane)  { jsPane.ta.value  = ORIG_JS;  jsPane.hl.innerHTML  = highlightJS(ORIG_JS);  }
        resetBtn.textContent = 'Reset!';
        setTimeout(function () { resetBtn.textContent = 'Reset'; }, 1500);
      });
    }

    // ── Auto-resize iframe ───────────────────────────────────────────────
    output.addEventListener('load', function () {
      try {
        var body = output.contentDocument.body;
        body.style.margin    = '0';
        body.style.padding   = '16px';
        body.style.boxSizing = 'border-box';
        output.style.height  = Math.max(220, Math.min(body.scrollHeight, 500)) + 'px';
      } catch (e) {}
    });

    // ── Copy active tab ──────────────────────────────────────────────────
    copyBtn.addEventListener('click', function () {
      var val = activeTab === 'js'  ? (jsPane  ? jsPane.ta.value  : '')
              : activeTab === 'css' ? (cssPane ? cssPane.ta.value : '')
              : htmlPane.ta.value;
      navigator.clipboard.writeText(val).then(function () {
        copyLbl.textContent = 'Copied!';
        setTimeout(function () { copyLbl.textContent = 'Copy'; }, 2000);
      });
    });

    // ── Initial state ─────────────────────────────────────────────────────
    setTab(activeTab);
    output.srcdoc = buildSrc();
  }

  // ── Expose for React component usage ────────────────────────────────────
  window.__editorInit = initSection;

  // ── Scan document on load ────────────────────────────────────────────────
  function scanForEditors() {
    document.querySelectorAll('.try-example').forEach(initSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanForEditors);
  } else {
    scanForEditors();
  }

  // ── Watch for dynamically injected sections (Next.js navigation) ─────────
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var added = mutations[i].addedNodes;
      for (var j = 0; j < added.length; j++) {
        var node = added[j];
        if (node.nodeType !== 1) continue;
        if (node.classList && node.classList.contains('try-example')) initSection(node);
        if (node.querySelectorAll) node.querySelectorAll('.try-example').forEach(initSection);
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
