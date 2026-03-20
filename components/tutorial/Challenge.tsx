"use client";

import { useRef, useState, useEffect } from "react";
import hljs from "highlight.js";

declare global {
  interface Window {
    __editorInit?: (section: HTMLElement) => void;
  }
}

interface Check {
  selector: string;
  message: string;
}

interface Props {
  title: string;
  description: string;
  checks: Check[];
  solution: string;
}

export default function Challenge({ title, description, checks, solution }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorSectionRef = useRef<HTMLElement>(null);
  const solutionCodeRef = useRef<HTMLElement>(null);
  const [result, setResult] = useState<{ pass: boolean; missing: string[] } | null>(null);
  const [copyLabel, setCopyLabel] = useState("Copy");

  useEffect(() => {
    // Highlight the solution code block
    if (solutionCodeRef.current && !solutionCodeRef.current.dataset.highlighted) {
      solutionCodeRef.current.classList.add("language-html");
      hljs.highlightElement(solutionCodeRef.current as HTMLElement);
    }

    // editor.js MutationObserver auto-picks up .try-example sections.
    // This manual call is a safety net for cases where the observer already
    // fired before this component mounted.
    if (
      editorSectionRef.current &&
      !editorSectionRef.current.dataset.editorInit &&
      typeof window.__editorInit === "function"
    ) {
      window.__editorInit(editorSectionRef.current);
    }
  }, []);

  function copySolution() {
    if (!solutionCodeRef.current) return;
    navigator.clipboard.writeText(solutionCodeRef.current.textContent ?? "").then(() => {
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy"), 2000);
    });
  }

  function checkAnswer() {
    if (!containerRef.current) return;
    const iframe = containerRef.current.querySelector<HTMLIFrameElement>("iframe");
    if (!iframe?.contentDocument?.body) {
      setResult({ pass: false, missing: ["Run your code first, then check"] });
      return;
    }
    const doc = iframe.contentDocument;
    const missing: string[] = [];
    for (const check of checks) {
      if (!doc.querySelector(check.selector)) {
        missing.push(check.message);
      }
    }
    setResult({ pass: missing.length === 0, missing });
  }

  return (
    <div ref={containerRef} className="challenge">
      <div className="challenge-header">
        <span className="challenge-badge">Challenge</span>
        <h3 className="challenge-title">{title}</h3>
      </div>
      <p className="challenge-desc">{description}</p>

      {/* Editor — auto-initialized by editor.js MutationObserver */}
      <section
        ref={editorSectionRef as React.RefObject<HTMLElement>}
        className="try-example"
        data-mode="edit"
        data-html=""
      />

      <button type="button" className="challenge-check-btn" onClick={checkAnswer}>
        Check my answer
      </button>

      {result && (
        <div className={`challenge-result ${result.pass ? "pass" : "fail"}`}>
          {result.pass ? (
            <>&#9989; All checks passed! Great work.</>
          ) : (
            <>&#9888;&#65039; {result.missing.join(" \u2014 ")}</>
          )}
        </div>
      )}

      <details className="challenge-solution">
        <summary>Show solution</summary>
        <div className="challenge-solution-code">
          <button type="button" className="challenge-copy-btn" onClick={copySolution}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <span>{copyLabel}</span>
          </button>
          <pre>
            <code ref={solutionCodeRef as React.RefObject<HTMLElement>}>{solution}</code>
          </pre>
        </div>
      </details>
    </div>
  );
}
