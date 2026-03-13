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
    ref.current.querySelectorAll<HTMLElement>("pre code").forEach((block) => {
      // Avoid double-highlighting
      if (!block.dataset.highlighted) {
        hljs.highlightElement(block);
      }
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="html-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
