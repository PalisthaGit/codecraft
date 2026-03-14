"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { htmlLessonGroups } from "@/data/htmlLessons";

const DEFAULT_CODE = `<h1>Hello, World!</h1>

<p>This is my first web page. Edit the code on the left and click <strong>Run</strong> to see your changes here.</p>

<h2>Try It Out</h2>
<p>You can write any HTML here — headings, paragraphs, lists, links, and more.</p>

<ul>
  <li>HTML is fun</li>
  <li>And easy to learn</li>
  <li>Start experimenting!</li>
</ul>`;

// ── Syntax highlighter ────────────────────────────────────────────────────────
function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightHTML(code: string, dark: boolean) {
  const C = dark
    ? { bracket: "#c792ea", tag: "#c792ea", attr: "#ffcb6b", eq: "#e2e8f0", val: "#c3e88d", comment: "#546e7a", text: "#e2e8f0" }
    : { bracket: "#7c3aed", tag: "#7c3aed", attr: "#92400e", eq: "#374151", val: "#166534", comment: "#9ca3af", text: "#1e293b" };

  function colorTag(token: string) {
    let inner = token.slice(1, -1);
    if (!inner) return esc(token);
    if (inner[0] === "!") return `<span style="color:${C.tag}">${esc(token)}</span>`;
    const selfClose = inner.slice(-1) === "/";
    if (selfClose) inner = inner.slice(0, -1).replace(/\s+$/, "");
    const isClose = inner[0] === "/";
    if (isClose) inner = inner.slice(1);
    const sp = inner.search(/\s/);
    const tagName = sp === -1 ? inner : inner.slice(0, sp);
    const rest = sp === -1 ? "" : inner.slice(sp);
    const hlRest = esc(rest).replace(
      /([\w:-]+)(=)("(?:[^"]*)")/g,
      `<span style="color:${C.attr}">$1</span><span style="color:${C.eq}">$2</span><span style="color:${C.val}">$3</span>`
    );
    return `<span style="color:${C.bracket}">&lt;${isClose ? "/" : ""}</span><span style="color:${C.tag}">${esc(tagName)}</span>${hlRest}<span style="color:${C.bracket}">${selfClose ? "/" : ""}&gt;</span>`;
  }

  let result = "";
  const re = /<!--[\s\S]*?-->|<[^>]*>|[^<]+/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    const t = m[0];
    if (t.startsWith("<!--")) result += `<span style="color:${C.comment};font-style:italic">${esc(t)}</span>`;
    else if (t[0] === "<") result += colorTag(t);
    else result += `<span style="color:${C.text}">${esc(t)}</span>`;
  }
  return result;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HtmlEditorPage() {
  const [code, setCode]       = useState(DEFAULT_CODE);
  const [dark, setDark]       = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formatMsg, setFormatMsg] = useState("");
  const [highlighted, setHighlighted] = useState("");
  const iframeRef  = useRef<HTMLIFrameElement>(null);
  const mirrorRef  = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setHighlighted(highlightHTML(code, dark));
  }, [code, dark]);

  const runCode = useCallback(() => {
    if (!iframeRef.current) return;
    iframeRef.current.srcdoc = `<!DOCTYPE html><html><head><style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; padding: 24px; line-height: 1.6; color: #1e293b; }
      h1,h2,h3 { color: #0f172a; margin-bottom: 8px; }
      p { margin-bottom: 12px; color: #374151; }
      a { color: #6367ff; }
      ul,ol { padding-left: 24px; margin-bottom: 12px; }
      li { margin-bottom: 4px; }
      code { background: #f0f4ff; color: #6367ff; padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
      pre { background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; }
      img { max-width: 100%; }
    </style></head><body>${code}</body></html>`;
  }, [code]);

  useEffect(() => { runCode(); }, []);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const formatCode = useCallback(() => {
    // CONTAINER blocks: open/close get own lines, children indented
    const CONTAINER = new Set(["html","head","body","div","section","article","header","footer","nav","main","aside","ul","ol","table","thead","tbody","tfoot","tr","form","fieldset","select","details","summary","figure","blockquote","pre","script","style","noscript"]);
    // LEAF blocks: open + content + close all on ONE line
    const LEAF      = new Set(["p","h1","h2","h3","h4","h5","h6","li","dt","dd","td","th","title","caption","label","option","figcaption","legend"]);
    const VOID      = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);

    let indent = 0;
    const lines: string[] = [];
    let buf = "";
    let inLeaf = false;

    // Tags that warrant a blank line between siblings
    const NEEDS_GAP = new Set(["p","h1","h2","h3","h4","h5","h6","div","section","article","header","footer","nav","main","aside","ul","ol","blockquote","pre","figure","form","table"]);

    const flushBuf = () => {
      const s = buf.trim();
      if (s) lines.push("  ".repeat(indent) + s);
      buf = "";
    };

    const maybeGap = (tag: string, isClose: boolean) => {
      if (!NEEDS_GAP.has(tag)) return;
      if (lines.length === 0) return;
      if (lines[lines.length - 1] === "") return; // already blank
      if (isClose) return; // blank line goes before open tags, not close
      lines.push("");
    };

    const tokens = code.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g) ?? [];
    for (const tok of tokens) {
      const trimmed = tok.trim();
      // preserve blank lines between block elements
      if (!trimmed) {
        if (!inLeaf && tok.includes("\n\n")) lines.push("");
        continue;
      }

      if (tok.startsWith("<!--")) {
        flushBuf();
        lines.push("  ".repeat(indent) + trimmed);
        continue;
      }

      if (tok[0] === "<") {
        const isClose  = tok[1] === "/";
        const isSelf   = tok.slice(-2) === "/>";
        const tagMatch = tok.match(/<\/?([a-zA-Z][a-zA-Z0-9]*)/);
        const tag      = tagMatch ? tagMatch[1].toLowerCase() : "";

        if (VOID.has(tag)) {
          if (inLeaf) { buf += trimmed; }
          else { flushBuf(); lines.push("  ".repeat(indent) + trimmed); }
        } else if (LEAF.has(tag)) {
          if (isClose) {
            buf += trimmed;
            flushBuf();
            inLeaf = false;
          } else {
            flushBuf();
            maybeGap(tag, false);
            buf = "  ".repeat(indent) + trimmed;
            inLeaf = true;
          }
        } else if (CONTAINER.has(tag)) {
          flushBuf();
          inLeaf = false;
          if (isClose) {
            indent = Math.max(0, indent - 1);
            lines.push("  ".repeat(indent) + trimmed);
          } else if (isSelf) {
            maybeGap(tag, false);
            lines.push("  ".repeat(indent) + trimmed);
          } else {
            maybeGap(tag, false);
            lines.push("  ".repeat(indent) + trimmed);
            indent++;
          }
        } else {
          // unknown/inline tag — buffer it
          buf += trimmed;
        }
      } else {
        buf += tok.replace(/\s+/g, " ");
      }
    }
    flushBuf();
    const formatted = lines.join("\n");
    if (formatted === code) {
      setFormatMsg("Already formatted");
      setTimeout(() => setFormatMsg(""), 2500);
    } else {
      setCode(formatted);
      setFormatMsg("Formatted");
      setTimeout(() => setFormatMsg(""), 2500);
    }
  }, [code]);

  const editorBg = dark ? "#0d1117" : "#f8fafc";
  const surface  = dark ? "#1e293b" : "#ffffff";
  const border   = dark ? "#334155" : "#e5e7eb";
  const text     = dark ? "#e2e8f0" : "#0f172a";
  const subtext  = dark ? "#94a3b8" : "#64748b";

  const FONT = "'JetBrains Mono', monospace";
  const FONT_SIZE = "14px";
  const LINE_H = "1.8";
  const PAD = "20px";

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: dark ? "#0f172a" : "#f8fafc", color: text, fontFamily: "Nunito, sans-serif" }}>

      {/* ── Brand bar ── */}
      <div style={{ padding: "16px 28px", background: dark ? "#0d1117" : "#ffffff", borderBottom: `1px solid ${border}`, flexShrink: 0, display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          style={{ display: "flex", flexDirection: "column", gap: "5px", background: "transparent", border: "none", cursor: "pointer", padding: "4px", flexShrink: 0 }}
          aria-label="Open tutorials menu"
        >
          <span style={{ display: "block", width: "22px", height: "2px", background: subtext, borderRadius: "2px" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: subtext, borderRadius: "2px" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: subtext, borderRadius: "2px" }} />
        </button>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "3px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6367ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
            <span style={{ fontWeight: 800, fontSize: "22px", color: text, letterSpacing: "-0.02em" }}>Codecraft</span>
          </div>
          <span style={{ fontSize: "13px", fontWeight: 600, color: subtext }}>HTML Online Compiler</span>
        </div>
      </div>

      {/* ── Slide-in sidebar ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.5)", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transition: "opacity 0.3s" }}
      />
      {/* Panel */}
      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 50, width: "256px", height: "100%", background: "#ffffff", boxShadow: "4px 0 24px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", transform: menuOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s ease-in-out" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", padding: "0 16px", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
          <span style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a" }}>Codecraft</span>
          <button onClick={() => setMenuOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: "8px", color: "#64748b" }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }}>
          <Link href="/html" onClick={() => setMenuOpen(false)} style={{ display: "block", marginBottom: "20px", fontSize: "12px", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>← All Tutorials</Link>
          {htmlLessonGroups.map((group) => (
            <div key={group.title} style={{ marginBottom: "24px" }}>
              <p style={{ padding: "0 12px", marginBottom: "8px", fontSize: "11px", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6367ff" }}>{group.title}</p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
                {group.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <Link
                      href={`/html/${lesson.slug}`}
                      onClick={() => setMenuOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "6px", fontSize: "14px", fontWeight: 500, color: "#374151", textDecoration: "none" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#0f172a"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#374151"; }}
                    >
                      <span style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1.5px solid #d1d5db", flexShrink: 0, display: "inline-block" }} />
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", height: "52px", background: surface, borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
        {/* Left: title + theme + Run (all on compiler side) */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px 0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: subtext, letterSpacing: "0.06em", textTransform: "uppercase" }}>HTML</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* Format message toast */}
            {formatMsg && (
              <span style={{ fontSize: "11px", fontWeight: 600, color: formatMsg === "Already formatted" ? "#f59e0b" : "#22c55e", background: formatMsg === "Already formatted" ? "#fef3c720" : "#dcfce720", border: `1px solid ${formatMsg === "Already formatted" ? "#f59e0b40" : "#22c55e40"}`, borderRadius: "6px", padding: "3px 10px", whiteSpace: "nowrap" }}>
                {formatMsg}
              </span>
            )}
            {/* Format */}
            <button
              onClick={formatCode}
              title="Format code"
              style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 600, color: subtext, background: dark ? "#334155" : "#f1f5f9", border: `1px solid ${border}`, borderRadius: "7px", padding: "5px 10px", cursor: "pointer", fontFamily: "inherit" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>
              Format
            </button>
            {/* Copy */}
            <button
              onClick={copyCode}
              title="Copy code"
              style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 600, color: copied ? "#22c55e" : subtext, background: dark ? "#334155" : "#f1f5f9", border: `1px solid ${border}`, borderRadius: "7px", padding: "5px 10px", cursor: "pointer", fontFamily: "inherit" }}
            >
              {copied ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
            {/* Clear */}
            <button
              onClick={() => setCode("")}
              title="Clear editor"
              style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 600, color: subtext, background: dark ? "#334155" : "#f1f5f9", border: `1px solid ${border}`, borderRadius: "7px", padding: "5px 10px", cursor: "pointer", fontFamily: "inherit" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Clear
            </button>
            {/* Run */}
            <button
              onClick={runCode}
              style={{ display: "flex", alignItems: "center", gap: "6px", background: "#6367ff", color: "white", border: "none", borderRadius: "8px", padding: "6px 18px", cursor: "pointer", fontSize: "13px", fontWeight: 700, fontFamily: "inherit" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
              Run
            </button>
          </div>
        </div>
        {/* Right: Output label + theme toggle (above preview) */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderLeft: `1px solid ${border}` }}>
          <span style={{ fontSize: "13px", fontWeight: 700, color: subtext, letterSpacing: "0.06em", textTransform: "uppercase" }}>Output</span>
          <button
            onClick={() => setDark(!dark)}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: dark ? "#334155" : "#f1f5f9", border: `1px solid ${border}`, borderRadius: "8px", padding: "5px 12px", cursor: "pointer", fontSize: "12px", fontWeight: 700, color: subtext, fontFamily: "inherit" }}
          >
            {dark ? (
              <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>Light</>
            ) : (
              <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>Dark</>
            )}
          </button>
        </div>
      </div>

      {/* ── Split panes ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Editor pane */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: `1px solid ${border}` }}>
          {/* Overlay editor: mirror + textarea */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden", background: editorBg }}>
            {/* Highlighted mirror */}
            <pre
              ref={mirrorRef}
              aria-hidden
              style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, margin: 0, padding: PAD, fontFamily: FONT, fontSize: FONT_SIZE, fontWeight: 600, lineHeight: LINE_H, background: "transparent", color: text, overflow: "scroll", scrollbarWidth: "none", whiteSpace: "pre-wrap", wordWrap: "break-word", pointerEvents: "none", boxSizing: "border-box" }}
              dangerouslySetInnerHTML={{ __html: highlighted + "\n" }}
            />
            {/* Transparent textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={() => {
                if (mirrorRef.current && textareaRef.current) {
                  mirrorRef.current.scrollTop = textareaRef.current.scrollTop;
                  mirrorRef.current.scrollLeft = textareaRef.current.scrollLeft;
                }
              }}
              onKeyDown={(e) => {
                if (e.key !== "Tab") return;
                e.preventDefault();
                const s = e.currentTarget.selectionStart;
                const newVal = code.slice(0, s) + "  " + code.slice(e.currentTarget.selectionEnd);
                setCode(newVal);
                setTimeout(() => {
                  if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = s + 2;
                  }
                }, 0);
              }}
              spellCheck={false}
              placeholder="Write your HTML here…"
              style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", margin: 0, padding: PAD, fontFamily: FONT, fontSize: FONT_SIZE, fontWeight: 600, lineHeight: LINE_H, background: "transparent", color: "transparent", caretColor: dark ? "#e2e8f0" : "#1e293b", border: "none", outline: "none", resize: "none", whiteSpace: "pre-wrap", wordWrap: "break-word", overflowY: "scroll", overflowX: "hidden", boxSizing: "border-box", tabSize: 2 }}
            />
          </div>
        </div>

        {/* Preview pane */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <iframe ref={iframeRef} style={{ flex: 1, border: "none", background: "white" }} title="preview" />
        </div>
      </div>
    </div>
  );
}
