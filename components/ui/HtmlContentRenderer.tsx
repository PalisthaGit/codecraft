"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";

interface HtmlContentRendererProps {
  html: string;
}

export default function HtmlContentRenderer({ html }: HtmlContentRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Syntax-highlight code blocks
    ref.current.querySelectorAll<HTMLElement>("pre code").forEach((block) => {
      if (!block.dataset.highlighted) {
        // If no language class is set, force HTML so incomplete snippets
        // like <p>text</p> still get full colour treatment
        const hasLang = Array.from(block.classList).some((c) =>
          c.startsWith("language-")
        );
        if (!hasLang) block.classList.add("language-html");
        hljs.highlightElement(block);
      }
    });

    // Execute any <script> tags injected via dangerouslySetInnerHTML
    ref.current.querySelectorAll<HTMLScriptElement>("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="html-content"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
