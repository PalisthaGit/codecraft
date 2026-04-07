import Link from "next/link";
import HtmlFaq from "@/components/html/HtmlFaq";

export const metadata = {
  title: "Learn HTML for Beginners — Free Course | CodingBanana",
  description:
    "Free HTML course for complete beginners. Learn 12 core HTML concepts step by step, build 2 real projects, and finish with a portfolio page you can show anyone. No experience needed. Nothing to install.",
};

const lessons = [
  {
    num: "01",
    title: "What is HTML",
    sub: "Setting up a page",
    href: "/html/introduction",
    ariaLabel: "Learn what HTML is and how a web page is set up",
  },
  {
    num: "02",
    title: "Setting Up HTML",
    sub: "Your first HTML file",
    href: "/html/setting-up",
    ariaLabel: "Learn how to set up HTML and write your first HTML file",
  },
  {
    num: "03",
    title: "HTML Tags",
    sub: "Paragraphs, emphasis",
    href: "/html/tags",
    ariaLabel: "Learn HTML tags including paragraphs and text emphasis",
  },
  {
    num: "04",
    title: "HTML Headings",
    sub: "h1 through h6",
    href: "/html/headings",
    ariaLabel: "Learn HTML headings from h1 through h6",
  },
  {
    num: "05",
    title: "Images",
    sub: "Figures and captions",
    href: "/html/images",
    ariaLabel: "Learn how to add images in HTML with figures and captions",
  },
  {
    num: "06",
    title: "Figure and Caption",
    sub: "Wrapping images properly",
    href: "/html/figure",
    ariaLabel: "Learn how to use HTML figure and figcaption to wrap images properly",
  },
  {
    num: "07",
    title: "Lists",
    sub: "Ordered and unordered",
    href: "/html/list",
    ariaLabel: "Learn HTML lists — ordered and unordered",
  },
  {
    num: "08",
    title: "Tables",
    sub: "Rows, headers, cells",
    href: "/html/table",
    ariaLabel: "Learn HTML tables with rows, headers, and cells",
  },
  {
    num: "09",
    title: "Links",
    sub: "Anchors and href",
    href: "/html/link",
    ariaLabel: "Learn HTML links using anchor tags and the href attribute",
  },
  {
    num: "10",
    title: "Forms",
    sub: "Inputs and buttons",
    href: "/html/forms",
    ariaLabel: "Learn HTML forms with inputs and buttons",
  },
  {
    num: "11",
    title: "Divs and Spans",
    sub: "Grouping elements",
    href: "/html/divs-and-spans",
    ariaLabel: "Learn how to group HTML elements using divs and spans",
  },
  {
    num: "12",
    title: "Semantic HTML",
    sub: "Meaningful structure",
    href: "/html/semantic-html",
    ariaLabel: "Learn semantic HTML for meaningful and accessible page structure",
  },
];

const portfolioSteps = [
  {
    num: "1",
    title: "You build Nadia's page across all twelve lessons",
    desc: "You build Nadia's page lesson by lesson. Each lesson adds one new piece. A heading first, then an image, then a table, then links. By lesson eight the whole page is there, built piece by piece by you.",
  },
  {
    num: "2",
    title: "You swap in your own details",
    desc: "Replace Nadia's name with yours. Her photo with yours. Her story with yours. The structure is already there because you built every part of it.",
  },
  {
    num: "3",
    title: "You walk away with a real portfolio page",
    desc: "Not a certificate. Not a badge. An actual HTML page with your name on it that you can show to anyone and say, I built this.",
  },
];

const howYouLearn = [
  {
    step: "1",
    title: "The concept is explained clearly",
    desc: "Short, direct, no jargon. You understand exactly what a tag does and why it exists before you write it.",
  },
  {
    step: "2",
    title: "You edit the code right there in the lesson",
    desc: "A live code editor sits inside every lesson. You change something, you see it change. You break it, you fix it. That is how things actually go in.",
  },
  {
    step: "3",
    title: "You apply it yourself in the challenge",
    desc: "At the end of each lesson the editor is blank and a target is shown. No hints. You figure it out. This is where real understanding happens.",
  },
  {
    step: "4",
    title: "It goes straight onto the real page",
    desc: "What you just learned gets added to Nadia's page. You watch your work build up, lesson by lesson, into something complete.",
  },
];

const stats = [
  { number: "12", label: "HTML concepts, taught in depth" },
  { number: "2", label: "Real projects you finish" },
  { number: "0", label: "Things to install" },
  { number: "1", label: "Portfolio page that is yours" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Learn HTML for Beginners",
  description:
    "Free HTML course for complete beginners. Learn 12 core HTML concepts step by step and build 2 real projects — a Wikipedia-style portfolio page and your own personal page.",
  provider: {
    "@type": "Organization",
    name: "CodingBanana",
  },
  educationalLevel: "Beginner",
  isAccessibleForFree: true,
  coursePrerequisites: "None",
  teaches: "HTML",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT12H",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export default function HtmlIndexPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        Free structured HTML course for complete beginners
      </h1>
      <div className="space-y-4 text-[0.95rem] leading-[1.8] text-[#374151] mb-6">
        <p>
          HTML is the language behind every webpage you have ever visited. It
          tells your browser to show a heading here, an image there, a button at
          the bottom. Every website on the internet starts with it. And anyone
          can learn it.
        </p>
      </div>

      <div className="bg-[#f0f0ff] border border-[#6367ff]/25 rounded-[12px] px-5 py-4 mb-8">
        <p className="text-[0.95rem] font-semibold text-[#0f172a] leading-relaxed">
          This is a free, structured HTML course for complete beginners. You
          learn every core concept step by step and build two real projects while
          doing it. Twelve lessons. No experience needed. Nothing to install.
        </p>
      </div>

      <h2 className="text-[clamp(1.15rem,2.5vw,1.45rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        Learn HTML for beginners by building real projects
      </h2>
      <div className="space-y-4 text-[0.95rem] leading-[1.8] text-[#374151] mb-6">
        <p>
          This is a free, structured HTML course for complete beginners. You
          learn every core concept step by step and use it on a real page right
          away. No experience needed. Nothing to install.
        </p>
        <div className="bg-[#f8f7ff] border-l-4 border-[#6367ff] rounded-r-[10px] px-5 py-4 space-y-3 text-[0.93rem] leading-[1.8] text-[#374151] italic">
          <p>
            I remember learning HTML for the first time. Tutorial after tutorial,
            tag after tag, nothing sticking. I never built anything real. Just
            read and forgot and read again.
          </p>
          <p>
            Then one day I started building something actual. A real page, one
            piece at a time. And everything clicked. Every concept made sense the
            moment I used it on something real. That feeling of looking at a page
            and knowing you wrote every single line of it, that is what this
            course is built around.
          </p>
        </div>
      </div>


      {/* ── Section 2: What You Will Build ─────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-2">
          Two real projects, not just reading and forgetting
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-8">
          Most courses give you isolated exercises that go nowhere. Here every
          single concept goes onto a real page. You finish the course with two
          projects you actually made.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#6367ff] mb-2">
              Project 1
            </div>
            <h3 className="font-extrabold text-[#0f172a] mb-2">
              Nadia&apos;s Wikipedia page
            </h3>
            <p className="text-sm text-[#64748b] leading-relaxed mb-4">
              A complete Wikipedia-style portfolio page built together across all
              twelve lessons. Every concept you learn goes straight onto this
              page. By the end you will have built it from nothing.
            </p>
            <span className="text-[0.75rem] font-bold text-[#6367ff] bg-[#6367ff]/10 px-2.5 py-1 rounded-full">
              Builds your confidence
            </span>
          </div>
          <div className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#6367ff] mb-2">
              Project 2
            </div>
            <h3 className="font-extrabold text-[#0f172a] mb-2">
              Your own portfolio page
            </h3>
            <p className="text-sm text-[#64748b] leading-relaxed mb-4">
              Same structure, your name, your story, your photo. The Wikipedia
              page becomes your own personal HTML portfolio page. Something real
              you can show anyone.
            </p>
            <span className="text-[0.75rem] font-bold text-[#6367ff] bg-[#6367ff]/10 px-2.5 py-1 rounded-full">
              Yours to keep forever
            </span>
          </div>
        </div>

        <h3 className="font-bold text-[#0f172a] mb-1">
          See what you will create
        </h3>
        <p className="text-sm text-[#64748b] mb-4">This is the page you will build</p>
        <p className="text-sm text-[#64748b] mb-4">
          Every element you see here came from one lesson. A heading, a photo, a
          skills table, a list of projects, links, a contact form. You will
          build every single line of it yourself.
        </p>
        <div className="rounded-[14px] border-[1.5px] border-[#e5e7eb] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
          <iframe
            src="/html/nadia-wiki/index.html"
            className="w-full"
            style={{ height: "600px", border: "none" }}
            title="Nadia's Wikipedia-style portfolio page"
          />
        </div>
      </section>

      {/* ── Section 3: Table of Contents ─────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-2">
          Table of contents
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-8">
          Twelve lessons, every HTML concept you need
        </p>
        <p className="text-sm text-[#64748b] mb-8">
          Structured from the ground up for beginners. Each lesson teaches one
          concept and puts it straight onto the project page. Start at lesson
          one, finish with HTML genuinely in your head, not just memorised.
        </p>
        <div className="space-y-2">
          {lessons.map((lesson) =>
            lesson.href ? (
              <Link
                key={lesson.num}
                href={lesson.href}
                aria-label={lesson.ariaLabel}
                className="group flex items-center gap-4 bg-white rounded-[12px] border-[1.5px] border-[#e5e7eb] px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#6367ff] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,103,255,0.12)] transition-all duration-200"
              >
                <span className="shrink-0 text-[0.72rem] font-black tracking-[0.06em] text-[#6367ff] w-7">
                  {lesson.num}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-[0.93rem] text-[#0f172a] group-hover:text-[#6367ff] transition-colors duration-200">
                    {lesson.title}
                  </div>
                  <div className="text-xs text-[#94a3b8] mt-0.5">{lesson.sub}</div>
                </div>
              </Link>
            ) : (
              <div
                key={lesson.num}
                className="flex items-center gap-4 bg-white rounded-[12px] border-[1.5px] border-[#e5e7eb] px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] opacity-60"
              >
                <span className="shrink-0 text-[0.72rem] font-black tracking-[0.06em] text-[#94a3b8] w-7">
                  {lesson.num}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-[0.93rem] text-[#64748b]">
                    {lesson.title}
                  </div>
                  <div className="text-xs text-[#94a3b8] mt-0.5">{lesson.sub}</div>
                </div>
                <span className="ml-auto text-[0.68rem] font-bold tracking-wide uppercase text-[#94a3b8] shrink-0">
                  Coming soon
                </span>
              </div>
            )
          )}
        </div>
      </section>

      {/* ── Section 4: Your Portfolio Page ───────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-2">
          Your portfolio page
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-8">
          By the end, you will have something that is actually yours
        </p>
        <p className="text-sm text-[#64748b] mb-8">
          Nadia&apos;s page is the training ground. Your portfolio page is the real
          thing. Here is how you get from one to the other.
        </p>
        <div className="space-y-4">
          {portfolioSteps.map((item) => (
            <div
              key={item.num}
              className="flex gap-5 bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#6367ff] text-white text-sm font-black flex items-center justify-center">
                {item.num}
              </div>
              <div>
                <h3 className="font-extrabold text-[#0f172a] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: How You Will Learn ───────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-2">
          How you will learn
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-8">
          Every lesson follows the same four steps
        </p>
        <p className="text-sm text-[#64748b] mb-8">
          You never just read something and move on. Each concept is explained,
          then you use it, then you apply it yourself, then it appears on the
          real page.
        </p>
        <div className="space-y-4">
          {howYouLearn.map((item) => (
            <div
              key={item.step}
              className="flex gap-5 bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#6367ff] text-white text-sm font-black flex items-center justify-center">
                {item.step}
              </div>
              <div>
                <h3 className="font-extrabold text-[#0f172a] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 6: Stats ─────────────────────────────────────── */}
      <section className="mb-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <div className="text-[2rem] font-black text-[#6367ff] mb-1">
                {stat.number}
              </div>
              <div className="text-xs text-[#64748b] leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 7: FAQ ───────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-2">
          A question worth asking
        </h2>
        <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-8">
          Will I actually learn HTML, or just copy it?
        </p>
        <p className="text-sm text-[#64748b] mb-8">
          This is the right question. A lot of courses have you copying code
          without ever understanding it. Here is the honest answer, and a few
          other things people usually want to know before they start.
        </p>
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
