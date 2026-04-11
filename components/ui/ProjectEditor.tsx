"use client";

import { useState } from "react";
import JSZip from "jszip";

type Tab = "html" | "css" | "js";

const STARTER = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Project</title>
</head>
<body>

  <h1>Hello World</h1>

</body>
</html>`,
  css: `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #fff;
  color: #111;
}`,
  js: `// JavaScript goes here
`,
};

export default function ProjectEditor() {
  const [activeTab, setActiveTab] = useState<Tab>("html");
  const [html, setHtml] = useState(STARTER.html);
  const [css, setCss] = useState(STARTER.css);
  const [js, setJs] = useState(STARTER.js);
  const [previewContent, setPreviewContent] = useState("");

  const runPreview = () => {
    const doc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>${css}</style>
</head>
<body>
${html}
<script>${js}<\/script>
</body>
</html>`;
    setPreviewContent(doc);
  };

  const currentValue =
    activeTab === "html" ? html : activeTab === "css" ? css : js;

  const handleChange = (val: string) => {
    if (activeTab === "html") setHtml(val);
    else if (activeTab === "css") setCss(val);
    else setJs(val);
  };

  const [copied, setCopied] = useState(false);

  const copyActiveTab = () => {
    navigator.clipboard.writeText(currentValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadAll = async () => {
    const zip = new JSZip();

    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>My Project</title>
<link rel="stylesheet" href="style.css" />
</head>
<body>
${html}
<script src="script.js"><\/script>
</body>
</html>`;

    zip.file("index.html", indexHtml);
    zip.file("style.css", css);
    zip.file("script.js", js);

    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "project.zip";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = el.value.substring(0, start) + "  " + el.value.substring(end);
      handleChange(next);
      requestAnimationFrame(() => {
        el.selectionStart = start + 2;
        el.selectionEnd = start + 2;
      });
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "html", label: "HTML" },
    { id: "css", label: "CSS" },
    { id: "js", label: "JS" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1e293b]">
      {/* Editor — top half */}
      <div className="flex flex-col h-1/2 border-b border-[#334155]">
        {/* Tab bar */}
        <div className="flex items-center gap-1 px-3 py-2 bg-[#0f172a] border-b border-[#334155] shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-[#6367ff] text-white"
                  : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div className="flex-1" />

          <button
            onClick={copyActiveTab}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-[#1e293b] text-[#94a3b8] hover:text-white hover:bg-[#334155]"
            }`}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>

          <button
            onClick={downloadAll}
            className="px-3 py-1.5 text-xs font-semibold bg-[#1e293b] text-[#94a3b8] hover:text-white hover:bg-[#334155] rounded-md transition-colors"
          >
            Download
          </button>

          <button
            onClick={runPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-white rounded-md transition-colors"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
            </svg>
            Run
          </button>
        </div>

        {/* Textarea */}
        <textarea
          key={activeTab}
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          className="flex-1 w-full bg-[#1e293b] text-[#e2e8f0] font-mono text-sm p-4 resize-none outline-none leading-relaxed overflow-auto"
          placeholder={
            activeTab === "html"
              ? "Write your HTML here..."
              : activeTab === "css"
              ? "Write your CSS here..."
              : "Write your JavaScript here..."
          }
        />
      </div>

      {/* Preview — bottom half */}
      <div className="flex flex-col h-1/2">
        <div className="flex items-center px-3 py-1.5 bg-[#0f172a] border-b border-[#334155] shrink-0">
          <span className="text-xs font-semibold text-[#94a3b8]">Preview</span>
        </div>
        <iframe
          key={previewContent}
          srcDoc={previewContent || "<p style='padding:24px;font-family:sans-serif;color:#64748b'>Click <strong>Run</strong> to see your preview</p>"}
          title="Preview"
          sandbox="allow-scripts"
          className="flex-1 w-full bg-white border-none"
        />
      </div>
    </div>
  );
}
