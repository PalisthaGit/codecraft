"use client";

import { useState } from "react";

const LANG_DOTS: Record<string, string> = {
  html: "#e44d26",
  css: "#264de4",
  javascript: "#f7df1e",
  js: "#f7df1e",
  typescript: "#3178c6",
  ts: "#3178c6",
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const dotColor = language
    ? (LANG_DOTS[language.toLowerCase()] ?? "#6366f1")
    : "#6366f1";

  return (
    <div className="rounded-[12px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] mt-5 mb-7">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[10px] bg-[#0f172a] border-b border-white/[0.07]">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: dotColor }}
          />
          {language && (
            <span className="text-[0.72rem] font-bold tracking-[0.08em] uppercase text-white/40">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-[0.72rem] font-semibold px-[10px] py-1 rounded-[6px] transition-all bg-white/[0.08] hover:bg-white/[0.15] ${
            copied ? "text-[#4ade80]" : "text-white/50 hover:text-white"
          }`}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <pre className="bg-[#1e293b] text-[#e2e8f0] font-mono text-sm leading-[1.7] px-5 py-5 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
