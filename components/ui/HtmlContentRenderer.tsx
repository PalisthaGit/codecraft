"use client";

import { useEffect, useRef, useMemo } from "react";
import hljs from "highlight.js";
import { renderChallenges } from "@/lib/challengeRenderer";

interface HtmlContentRendererProps {
  html: string;
}

export default function HtmlContentRenderer({ html }: HtmlContentRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  // If the HTML is a full document, extract <style> blocks from <head> and
  // <body> content to avoid invalid nesting (e.g. <body> inside a div) which
  // causes browser HTML parser quirks and React hydration mismatches.
  // Also strip <script> tags before SSR; scripts are executed in useEffect.
  const { strippedHtml, scriptContents } = useMemo(() => {
    let processed = html;

    // Detect full HTML document
    if (/<body[\s>]/i.test(html)) {
      const styles: string[] = [];
      // Extract <style> blocks from anywhere (typically in <head>)
      processed = processed.replace(
        /<style\b[^>]*>([\s\S]*?)<\/style>/gi,
        (match) => { styles.push(match); return ""; }
      );
      // Extract body content
      const bodyMatch = processed.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      processed = bodyMatch ? bodyMatch[1] : processed;
      // Re-prepend styles so CSS still applies
      if (styles.length) processed = styles.join("\n") + processed;
    }

    const scriptContents: string[] = [];
    const strippedHtml = processed.replace(
      /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
      (_, content) => { scriptContents.push(content); return ""; }
    );
    return { strippedHtml, scriptContents };
  }, [html]);

  useEffect(() => {
    if (!ref.current) return;

    // Build challenge UIs from data-attribute divs first, so their
    // code blocks are in the DOM when the hljs loop runs below.
    renderChallenges(ref.current);

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

    // Execute scripts extracted from the HTML content
    scriptContents.forEach((content) => {
      const script = document.createElement("script");
      script.textContent = content;
      document.head.appendChild(script);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="html-content"
      dangerouslySetInnerHTML={{ __html: strippedHtml }}
      suppressHydrationWarning
    />
  );
}
