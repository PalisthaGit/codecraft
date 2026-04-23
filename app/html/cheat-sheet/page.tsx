import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HTML Cheat Sheet — Build Nadia's Wikipedia Page | CodingBanana",
  description:
    "Step-by-step HTML cheat sheet. Follow 11 steps to build Nadia's Wikipedia-style page from scratch — one element at a time. Click any step to try the code live.",
  openGraph: {
    title: "HTML Cheat Sheet — Build Nadia's Wikipedia Page",
    description:
      "Learn every core HTML element by building a real Wikipedia-style page. 11 steps, one element per step.",
    url: "https://www.codingbanana.com/html/cheat-sheet",
  },
  alternates: {
    canonical: "https://www.codingbanana.com/html/cheat-sheet",
  },
};

// ── Step data ─────────────────────────────────────────────────────────────────

const steps = [
  {
    step: "01",
    title: "HTML Skeleton",
    tags: ["<!DOCTYPE html>", "<html>", "<head>", "<body>"],
    description:
      "Every HTML page starts with this structure. The DOCTYPE declares it as HTML5. The head holds invisible metadata like the title. The body holds everything the user sees.",
    snippet: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nadia - Wikipedia</title>
</head>
<body>

</body>
</html>`,
    tryIt: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nadia - Wikipedia</title>
</head>
<body>
  <p>This is the skeleton of Nadia's Wikipedia page. Your content will go in the body.</p>
</body>
</html>`,
  },
  {
    step: "02",
    title: "Heading",
    tags: ["<h1>"],
    description:
      "The h1 is the main title of the page. Every page should have exactly one. It is the largest heading and tells both users and search engines what the page is about.",
    snippet: `<h1>Nadia</h1>`,
    tryIt: `<h1>Nadia</h1>
<p>Try changing the heading text above. The h1 is the main title of the page.</p>`,
  },
  {
    step: "03",
    title: "Paragraph",
    tags: ["<p>"],
    description:
      "Paragraphs hold the main body text. Each paragraph gets its own p tag. The browser automatically adds space between paragraphs.",
    snippet: `<p>Nadia (born 1988) is an American software engineer,
web developer, educator, and content creator.</p>`,
    tryIt: `<h1>Nadia</h1>

<p>Nadia (born 1988) is an American software engineer, web developer,
educator, and content creator.</p>

<p>With over 10 years of professional experience, she has become one of
the most influential voices in tech education.</p>`,
  },
  {
    step: "04",
    title: "Bold & Italic",
    tags: ["<b>", "<i>", "<strong>", "<em>"],
    description:
      "Use b or strong to bold text. Use i or em to italicise it. strong and em also carry meaning for screen readers — use them when the text is genuinely important, not just styled.",
    snippet: `<p><b>Nadia</b> <i>(born 1988)</i> is an American
<strong>software engineer</strong> and <em>educator</em>.</p>`,
    tryIt: `<h1>Nadia</h1>

<p><b>Nadia</b> <i>(born 1988)</i> is an American <strong>software engineer</strong>
and <em>educator</em>.</p>

<p>She is known for making <strong>complex concepts</strong> feel <em>approachable</em>
to beginners.</p>`,
  },
  {
    step: "05",
    title: "Links",
    tags: ["<a>", "href"],
    description:
      "The a tag creates a hyperlink. The href attribute holds the destination URL. Use # as a placeholder when you do not have a real URL yet.",
    snippet: `<a href="#">software engineer</a>`,
    tryIt: `<h1>Nadia</h1>

<p><b>Nadia</b> is an American <a href="#">software engineer</a>,
<a href="#">web developer</a>, and <a href="#">educator</a>.</p>

<p>Visit her <a href="#">YouTube channel</a> or read more on
<a href="https://wikipedia.org" target="_blank">Wikipedia</a>.</p>`,
  },
  {
    step: "06",
    title: "Section Headings",
    tags: ["<h2>", "<h3>"],
    description:
      "Use h2 for main sections and h3 for subsections. Headings create a clear document outline and make long pages easy to scan.",
    snippet: `<h2>Career</h2>
<h3>2015–2020: YouTube success</h3>`,
    tryIt: `<h1>Nadia</h1>
<p>Nadia is an American software engineer and educator.</p>

<h2>Early life</h2>
<p>She developed an interest in web development during her teenage years.</p>

<h2>Career</h2>
<h3>2010–2015: Early career</h3>
<p>She started as a junior web developer at a tech startup.</p>

<h3>2015–2020: YouTube success</h3>
<p>She launched her YouTube channel and grew it to 2 million subscribers.</p>`,
  },
  {
    step: "07",
    title: "Lists",
    tags: ["<ul>", "<ol>", "<li>"],
    description:
      "ul creates an unordered (bullet) list. ol creates an ordered (numbered) list. Each item in a list goes inside an li tag.",
    snippet: `<ul>
  <li>Modern JavaScript frameworks</li>
  <li>Backend development with Node.js</li>
  <li>Database design and management</li>
</ul>`,
    tryIt: `<h1>Nadia</h1>

<h2>YouTube channel topics</h2>
<ul>
  <li>Modern JavaScript frameworks (React, Vue, Angular)</li>
  <li>Backend development with Node.js and Python</li>
  <li>Database design and management</li>
  <li>DevOps and deployment strategies</li>
</ul>

<h2>Career timeline</h2>
<ol>
  <li>2010: Junior developer at a startup</li>
  <li>2012: Promoted to senior developer</li>
  <li>2015: Launched YouTube channel</li>
  <li>2020: Joined a FAANG company</li>
</ol>`,
  },
  {
    step: "08",
    title: "Tables",
    tags: ["<table>", "<tr>", "<th>", "<td>"],
    description:
      "Tables organise data into rows and columns. tr is a table row. th is a header cell (bold by default). td is a regular data cell.",
    snippet: `<table border="1">
  <tr>
    <th>Born</th>
    <td>1988</td>
  </tr>
  <tr>
    <th>Nationality</th>
    <td>American</td>
  </tr>
</table>`,
    tryIt: `<h1>Nadia</h1>

<table border="1" cellpadding="8" cellspacing="0">
  <tr>
    <th colspan="2">Personal information</th>
  </tr>
  <tr>
    <th>Born</th>
    <td>1988 (age 36–37)</td>
  </tr>
  <tr>
    <th>Nationality</th>
    <td>American</td>
  </tr>
  <tr>
    <th>Occupation</th>
    <td>Software Engineer, Educator, YouTuber</td>
  </tr>
  <tr>
    <th>YouTube subscribers</th>
    <td>2.5 million+</td>
  </tr>
</table>`,
  },
  {
    step: "09",
    title: "Images",
    tags: ["<img>", "src", "alt"],
    description:
      "The img tag displays an image. src is the path to the image file. alt is a text description — always include it for accessibility and for when the image fails to load.",
    snippet: `<img src="nadia.jpg" alt="Nadia in 2025">`,
    tryIt: `<h1>Nadia</h1>

<img src="https://placehold.co/200x300/667eea/ffffff?text=Nadia" alt="Nadia in 2025">

<p>Nadia is an American software engineer and educator.</p>
<p>The <b>alt</b> attribute describes the image for screen readers.
Always include it — try removing it and see what changes.</p>`,
  },
  {
    step: "10",
    title: "Divs",
    tags: ["<div>"],
    description:
      "Divs are invisible containers for grouping elements. They have no default styling. Add inline styles or CSS classes to control how they look and how content inside them is arranged.",
    snippet: `<div class="header">
  <b>WIKIPEDIA</b>
</div>

<div class="sidebar">
  <ul>
    <li><a href="#">Early life</a></li>
  </ul>
</div>

<div class="content">
  <h1>Nadia</h1>
</div>`,
    tryIt: `<div style="background:#f8f9fa; padding:10px 16px; border-bottom:1px solid #a2a9b1; display:flex; justify-content:space-between; align-items:center;">
  <b style="font-size:20px;">WIKIPEDIA</b>
  <span style="font-size:13px; color:#666;">the free encyclopedia</span>
</div>

<div style="display:flex; gap:20px; padding:20px; max-width:900px; margin:0 auto;">

  <div style="width:180px; flex-shrink:0; background:#f8f9fa; border:1px solid #a2a9b1; padding:12px;">
    <b style="font-size:13px;">Contents</b>
    <ul style="margin-top:8px; font-size:13px;">
      <li><a href="#">Early life</a></li>
      <li><a href="#">Career</a></li>
      <li><a href="#">References</a></li>
    </ul>
  </div>

  <div style="flex:1;">
    <h1>Nadia</h1>
    <p>Nadia is an American software engineer and educator.</p>
  </div>

</div>`,
  },
  {
    step: "11",
    title: "Forms",
    tags: ["<form>", "<input>", "<button>"],
    description:
      "Forms collect user input. The input tag creates a text field (the type attribute changes it to email, password, checkbox, and more). The button submits the form.",
    snippet: `<form>
  <input type="text" placeholder="Search Wikipedia">
  <button type="submit">Search</button>
</form>`,
    tryIt: `<div style="background:#f8f9fa; padding:8px 16px; border-bottom:1px solid #a2a9b1; display:flex; justify-content:space-between; align-items:center;">
  <b style="font-size:20px;">WIKIPEDIA</b>
  <form style="display:flex;">
    <input type="text" placeholder="Search Wikipedia"
      style="padding:6px 12px; border:1px solid #a2a9b1; border-radius:2px 0 0 2px; width:250px; font-size:13px;">
    <button type="submit"
      style="padding:7px 16px; background:#3366cc; color:white; border:none; cursor:pointer; border-radius:0 2px 2px 0; font-size:13px;">
      Search
    </button>
  </form>
</div>

<div style="padding:20px;">
  <h1>Nadia</h1>
  <p>Nadia is an American software engineer and educator.</p>
</div>`,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function tryItHref(code: string): string {
  const encoded = Buffer.from(code).toString("base64");
  return `/compiler/html#${encoded}`;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HtmlCheatSheetPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-6">
        <Link href="/" className="text-[#6367ff] font-semibold hover:underline">
          Tutorial
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <Link href="/html" className="text-[#6367ff] font-semibold hover:underline">
          HTML
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <span>Cheat Sheet</span>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        HTML
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        HTML cheat sheet
      </h1>
      <div className="space-y-3 text-[0.95rem] leading-[1.8] text-[#374151] mb-4">
        <p>
          Every HTML element has one job. This cheat sheet shows you eleven of
          them — the exact ones that make up Nadia&apos;s Wikipedia page.
        </p>
        <p>
          Start at step one. Each step adds one new element to the page. By step
          eleven you will have seen how the whole thing is built.
        </p>
      </div>
      <div className="bg-[#f0f0ff] border border-[#6367ff]/25 rounded-[12px] px-5 py-4 mb-10">
        <p className="text-[0.92rem] font-semibold text-[#0f172a] leading-relaxed">
          Click <span className="text-[#6367ff]">Try it</span> on any step to
          open that code in the live compiler. Change it, break it, fix it.
          That is how things go in.
        </p>
      </div>

      {/* ── Final page preview ────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.15rem,2.5vw,1.4rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-2">
          The page you are building
        </h2>
        <p className="text-sm text-[#64748b] mb-4">
          Every element in the steps below appears somewhere on this page.
        </p>
        <div className="rounded-[14px] border-[1.5px] border-[#e5e7eb] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
          <iframe
            src="/html/nadia-wiki/index.html"
            className="w-full"
            style={{ height: "500px", border: "none" }}
            title="Nadia's Wikipedia-style page — the completed project"
          />
        </div>
      </section>

      {/* ── Steps ─────────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.15rem,2.5vw,1.4rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-2">
          11 elements, one at a time
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-8">
          Each step introduces one element and shows exactly where it appears on
          Nadia&apos;s page.
        </p>

        <div className="space-y-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              {/* Card header */}
              <div className="flex items-start gap-4 p-6 pb-4">
                <span className="shrink-0 text-[0.72rem] font-black tracking-[0.06em] text-[#6367ff] w-7 mt-0.5">
                  {s.step}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-extrabold text-[#0f172a] text-[1rem]">
                      {s.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <code
                          key={tag}
                          className="text-[0.72rem] font-bold bg-[#6367ff]/8 text-[#6367ff] px-2 py-0.5 rounded-md border border-[#6367ff]/15"
                        >
                          {tag}
                        </code>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#64748b] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>

              {/* Code block */}
              <div className="mx-6 mb-4 rounded-[10px] overflow-hidden">
                <pre
                  className="bg-[#1e293b] text-[#e2e8f0] text-[0.82rem] leading-[1.7] p-4 overflow-x-auto font-mono"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <code>{s.snippet}</code>
                </pre>
              </div>

              {/* Try it button */}
              <div className="px-6 pb-5 flex justify-end">
                <Link
                  href={tryItHref(s.tryIt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#6367ff] text-white rounded-[8px] px-4 py-2 text-sm font-bold hover:bg-[#8494ff] transition-colors duration-150"
                >
                  Try it
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-px"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Complete page ─────────────────────────────────────────── */}
      <section className="mb-14">
        <div className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex items-start gap-4">
            <span className="shrink-0 text-[0.72rem] font-black tracking-[0.06em] text-[#6367ff] w-7 mt-0.5">
              ✓
            </span>
            <div>
              <h3 className="font-extrabold text-[#0f172a] text-[1rem] mb-2">
                Complete page
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                All eleven elements together with CSS styling — this is the full
                Nadia Wikipedia page. Open it in the compiler to explore or
                modify the complete code.
              </p>
              <Link
                href="/compiler/html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#6367ff] text-white rounded-[8px] px-4 py-2 text-sm font-bold hover:bg-[#8494ff] transition-colors duration-150"
              >
                Open compiler
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#6367ff]/5 rounded-[14px] border-[1.5px] border-[#6367ff]/20 p-8 text-center mb-6">
        <h2 className="text-[clamp(1.15rem,2.5vw,1.4rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-3">
          Want the full explanation for each element?
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-6 max-w-xl mx-auto">
          The cheat sheet gives you the reference. The full course gives you the
          understanding. Twelve lessons, every concept explained clearly, with
          hands-on practice in every lesson.
        </p>
        <Link
          href="/html"
          className="inline-block bg-[#6367ff] text-white rounded-[10px] px-[18px] py-[10px] font-semibold text-sm hover:bg-[#8494ff] transition-colors duration-200"
        >
          Take the full HTML course
        </Link>
      </section>
    </div>
  );
}
