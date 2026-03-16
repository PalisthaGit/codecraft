'use client';

import { useEffect, useRef } from 'react';

interface TryExampleProps {
  defaultHtml?: string;
  defaultCss?: string;
  defaultJs?: string;
  mode?: 'edit';
}

/**
 * TryExample renders an interactive code editor block.
 *
 * The global editor script (public/js/editor.js) is responsible for building
 * the full editor UI (tabs, buttons, iframe preview) from this shell element.
 * It detects .try-example sections automatically via MutationObserver.
 *
 * Props:
 *   defaultHtml - starter HTML code shown in the HTML tab
 *   defaultCss  - starter CSS code; omit to hide the CSS tab
 *   defaultJs   - starter JS code; omit to hide the JS tab
 *   mode="edit" - start in edit mode immediately (no "Try It Yourself" button)
 */
export default function TryExample({ defaultHtml = '', defaultCss, defaultJs, mode }: TryExampleProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    if (typeof window !== 'undefined' && (window as { __editorInit?: (el: HTMLElement) => void }).__editorInit) {
      (window as { __editorInit?: (el: HTMLElement) => void }).__editorInit!(section);
    }
  }, []);

  const dataAttrs: Record<string, string> = {
    'data-html': defaultHtml,
  };
  if (defaultCss !== undefined) dataAttrs['data-css'] = defaultCss;
  if (defaultJs  !== undefined) dataAttrs['data-js']  = defaultJs;
  if (mode)                     dataAttrs['data-mode'] = mode;

  return <section className="try-example" ref={ref} {...dataAttrs} />;
}
