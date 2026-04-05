import Link from "next/link";
import HtmlFaq from "@/components/html/HtmlFaq";

export const metadata = {
  title: "Learn HTML for Beginners by Building a Real Webpage — CodingBanana",
  description:
    "Learn HTML from scratch by building a real Wikipedia-style portfolio page. No experience needed. Interactive exercises, live compiler, and a real project you keep at the end. Free beginner HTML course.",
};

// Lessons that have pages and should be linked
const LINKED: Record<string, string> = {
  Introduction: "/html/introduction",
  Tags: "/html/tags",
  Headings: "/html/headings",
  Images: "/html/images",
  "Figure and Caption": "/html/figure",
  Forms: "/html/forms",
  Links: "/html/link",
  Lists: "/html/list",
  Tables: "/html/table",
  "Document Structure": "/html/document-structure",
  Abbreviations: "/html/abbr",
};

const chapters = [
  {
    title: "Getting Started",
    lessons: ["Introduction", "Tags", "Setting Up HTML"],
  },
  {
    title: "Chapter 1 — Text",
    lessons: ["Headings", "Paragraphs", "Bold and Italic", "Horizontal Lines"],
  },
  {
    title: "Chapter 2 — Images",
    lessons: [
      "Images",
      "Image Size and Proportions",
      "Alt Text",
      "Local vs Online Images",
      "Figure and Caption",
    ],
  },
  {
    title: "Chapter 3 — Links",
    lessons: [
      "Links",
      "Opening in a New Tab",
      "Jumping to a Section",
      "Clickable Images",
    ],
  },
  {
    title: "Chapter 4 — Lists",
    lessons: ["Lists", "Ordered Lists", "Nested Lists"],
  },
  {
    title: "Chapter 5 — Tables",
    lessons: ["Tables", "Table Head Body and Footer", "Colspan and Rowspan"],
  },
  {
    title: "Chapter 6 — Forms",
    lessons: ["Forms", "Input Types", "Dropdowns and Textareas"],
  },
  {
    title: "Chapter 7 — Structure",
    lessons: ["Document Structure", "Divs and Spans", "Semantic HTML"],
  },
];

export default function HtmlIndexPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-6">
        <Link href="/" className="text-[#6367ff] font-semibold hover:underline">
          Tutorial
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <span>HTML</span>
      </nav>

      {/* ── Section 1: Hero ─────────────────────────────────────── */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        HTML
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-6">
        Learn HTML for Beginners by Building a Real Webpage
      </h1>
      <div className="space-y-4 text-[0.95rem] leading-[1.8] text-[#374151] mb-12">
        <p>
          I am going to teach you HTML. Not by throwing tags at you and hoping
          something sticks. Not by making you memorize things you will forget
          the next day. I am going to teach you the way I wish someone had
          taught me when I was starting out.
        </p>
        <p>
          We are going to build something together. One small piece at a time.
          Every piece you build, you will understand completely before we move
          to the next one. And slowly, lesson by lesson, those pieces come
          together into something real.
        </p>
        <p>
          A full Wikipedia-style portfolio page. Built by you. Understood by
          you. Every single line of it.
        </p>
        <p>
          Maybe you have tried learning HTML before and got lost halfway. Maybe
          this is the very first time you are opening a tutorial. Either way
          you are in the right place. I have got you.
        </p>
        <p>
          By the end of this course you will have a real webpage with your name
          on it. Not a certificate. Not a badge. An actual page you built
          yourself, piece by piece, that you can show to anyone.
        </p>
        <p>
          That feeling of looking at something and knowing you built it from
          nothing. That is what this course is about.
        </p>
        <p>Let us start building.</p>
      </div>

      {/* ── Section 2: What You Will Build ─────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
          This Is What You Will Build
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-6">
          Before we write a single line of code, I want to show you where we
          are headed.
        </p>
        <div className="rounded-[14px] border-[1.5px] border-[#e5e7eb] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
          <iframe
            src="/html/nadia-wiki/index.html"
            className="w-full"
            style={{ height: "600px", border: "none" }}
            title="Nadia's Wikipedia-style portfolio page"
          />
        </div>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mt-6">
          This is Nadia. A fictional software engineer, educator, and content
          creator from New York. You are going to build her Wikipedia-style
          portfolio page from scratch. Every lesson teaches you one concept.
          That concept goes straight onto this page. A heading here. An image
          there. A table, some links, a form. Piece by piece the page grows.
          And every piece you add, you will understand completely. When the page
          is complete you replace Nadia&apos;s name with yours. Her story with
          yours. Her photo with yours. And just like that you have your own
          portfolio page. Built from nothing. By you. In HTML.
        </p>
      </section>

      {/* ── Section 3: How You Will Learn ───────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
          How You Will Learn
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-8">
          This is not a course where you read and hope for the best. Every
          single lesson is built around three things.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: "Try It Yourself",
              desc: "Every concept comes with a live code editor right inside the lesson. You do not just read about headings. You write one. You change it. You break it and fix it. You learn by doing not by watching.",
            },
            {
              title: "Challenges",
              desc: "At the end of every lesson there is a challenge. The editor is empty. The target is shown. You have to figure it out yourself. This is where the real learning happens.",
            },
            {
              title: "Live Compiler",
              desc: "Want to experiment freely? The live compiler is always there. A blank canvas where you can build whatever you want whenever you want without any rules.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <h3 className="font-extrabold text-[#0f172a] mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
        <a
          href="https://www.codingbanana.com/compiler/html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-[#6367ff] text-[#6367ff] rounded-[10px] px-[18px] py-[10px] font-semibold text-sm hover:bg-[#6367ff]/10 transition-colors duration-200"
        >
          Open the Live Compiler
        </a>
      </section>

      {/* ── Section 4: What You Will Learn ──────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-8">
          What You Will Learn
        </h2>
        <div className="space-y-8">
          {chapters.map((chapter) => (
            <div key={chapter.title}>
              <h3 className="text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[#6367ff] mb-3">
                {chapter.title}
              </h3>
              <div className="space-y-2">
                {chapter.lessons.map((lesson) => {
                  const href = LINKED[lesson];
                  if (href) {
                    return (
                      <Link
                        key={lesson}
                        href={href}
                        className="group flex items-center gap-3 bg-white rounded-[12px] border-[1.5px] border-[#e5e7eb] px-5 py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#6367ff] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,103,255,0.12)] transition-all duration-200"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#6367ff] shrink-0" />
                        <span className="font-semibold text-[0.93rem] text-[#0f172a] group-hover:text-[#6367ff] transition-colors duration-200">
                          {lesson}
                        </span>
                      </Link>
                    );
                  }
                  return (
                    <div
                      key={lesson}
                      className="flex items-center gap-3 bg-white rounded-[12px] border-[1.5px] border-[#e5e7eb] px-5 py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] opacity-60"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#cbd5e1] shrink-0" />
                      <span className="font-semibold text-[0.93rem] text-[#64748b]">
                        {lesson}
                      </span>
                      <span className="ml-auto text-[0.68rem] font-bold tracking-wide uppercase text-[#94a3b8]">
                        Coming soon
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: Who This Is For ───────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-6">
          Who This Is For
        </h2>
        <div className="space-y-4 text-[0.95rem] leading-[1.8] text-[#374151]">
          <p>
            You have never written a line of code in your life. Perfect. This
            is exactly where we start.
          </p>
          <p>
            You tried learning HTML before and gave up halfway. I understand.
            This time you are building something real from lesson one. That
            changes everything.
          </p>
          <p>
            You are a student, a career changer, someone who has always been
            curious about how websites actually work. Welcome. You belong here.
          </p>
          <p>
            You do not need to install anything. You do not need a computer
            science degree. You do not need any prior experience at all. If you
            can type and you have a browser, you are ready to start right now.
          </p>
        </div>
      </section>

      {/* ── Section 6: FAQ ───────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-8">
          Frequently Asked Questions
        </h2>
        <HtmlFaq />
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="bg-[#6367ff]/5 rounded-[14px] border-[1.5px] border-[#6367ff]/20 p-8 text-center mb-6">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
          Ready to Build Something Real?
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-6 max-w-xl mx-auto">
          Your portfolio page is waiting. It starts with one lesson. One
          concept. One line of code. I will be with you every step of the way.
        </p>
        <Link
          href="/html/introduction"
          className="inline-block bg-[#6367ff] text-white rounded-[10px] px-[18px] py-[10px] font-semibold text-sm hover:bg-[#8494ff] transition-colors duration-200"
        >
          Start Learning HTML
        </Link>
      </section>
    </div>
  );
}
