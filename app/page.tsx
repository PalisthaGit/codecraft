import Link from "next/link";
import type { Metadata } from "next";
import NewsletterSubscribe from "@/components/home/NewsletterSubscribe";
import HeroAnimation from "@/components/home/HeroAnimation";

export const metadata: Metadata = {
  title: "CodingBanana — Free HTML, CSS & JavaScript Tutorials for Beginners",
  description:
    "Learn web development from scratch with free, beginner-friendly tutorials. Master HTML, CSS, and JavaScript with clear explanations and real code examples.",
};

const features = [
  {
    title: "Beginner Friendly",
    description:
      "Every concept is explained from scratch using plain language — no prior experience needed.",
    iconBg: "bg-orange-100 group-hover:bg-orange-200",
    iconColor: "text-orange-500",
    hoverBorder: "hover:border-orange-300",
    hoverShadow: "hover:shadow-[0_6px_20px_rgba(249,115,22,0.15)]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Structured Path",
    description:
      "Follow a clear, step-by-step curriculum from your first HTML tag all the way to JavaScript.",
    iconBg: "bg-[#6367ff]/10 group-hover:bg-[#6367ff]/20",
    iconColor: "text-[#6367ff]",
    hoverBorder: "hover:border-[#6367ff]/40",
    hoverShadow: "hover:shadow-[0_6px_20px_rgba(99,103,255,0.15)]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: "Learn by Doing",
    description:
      "Every lesson has a live Try It Yourself editor — tweak real code and see your changes instantly. No setup, no installs.",
    iconBg: "bg-emerald-100 group-hover:bg-emerald-200",
    iconColor: "text-emerald-600",
    hoverBorder: "hover:border-emerald-300",
    hoverShadow: "hover:shadow-[0_6px_20px_rgba(16,185,129,0.15)]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

const tracks = [
  {
    title: "HTML Basics",
    description:
      "Learn HTML by building a real project. Beginner friendly — by the end you will have your own webpage.",
    lessons: 12,
    href: "/html",
  },
  {
    title: "CSS Fundamentals",
    description:
      "Style your pages with CSS — control colors, spacing, layout, and more.",
    lessons: 5,
    href: "/css",
  },
  {
    title: "JavaScript",
    description:
      "Add interactivity to your pages by learning variables, functions, and DOM manipulation.",
    lessons: 3,
    href: "/javascript",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Hero */}
      <section className="pt-6 flex flex-col lg:flex-row lg:items-center lg:gap-12">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-5">
            Free &amp; beginner-friendly
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0f172a] leading-tight tracking-tight">
            Learn to Code,
            <br />
            One Step at a Time
          </h1>
          <p className="mt-5 text-lg text-[#64748b] max-w-xl leading-relaxed">
            CodingBanana breaks programming down into small, manageable lessons. No
            jargon. No overwhelm. Just clear explanations and real examples.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/html/introduction"
              className="inline-flex items-center gap-2 px-[18px] py-[10px] bg-[#6367ff] text-white text-sm font-bold rounded-[10px] hover:bg-[#5254e8] hover:shadow-[0_4px_16px_rgba(99,103,255,0.4)] transition-all duration-200"
            >
              Start Learning
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/html"
              className="inline-flex items-center px-[18px] py-[10px] bg-white text-[#0f172a] text-sm font-bold rounded-[10px] border-[1.5px] border-[#e5e7eb] hover:border-[#6367ff] hover:text-[#6367ff] transition-all duration-200"
            >
              Browse Lessons
            </Link>
          </div>
        </div>

        {/* Animation */}
        <div className="mt-12 lg:mt-0 flex justify-center lg:justify-end">
          <HeroAnimation />
        </div>
      </section>

      {/* Learning Tracks */}
      <section>
        <h2 className="text-xl font-extrabold text-[#0f172a] tracking-tight mb-6">
          Learning Tracks
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tracks.map((track) => (
            <Link
              key={track.title}
              href={track.href}
              className="group relative bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-[#6367ff] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,103,255,0.12)] transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-extrabold text-[#0f172a]">{track.title}</h3>
                <span className="shrink-0 text-[0.7rem] font-bold tracking-[0.05em] px-2 py-0.5 rounded-full bg-[#6367ff]/10 text-[#6367ff]">
                  {track.lessons} lessons
                </span>
              </div>
              <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                {track.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-[#6367ff] group-hover:gap-2 transition-all duration-200">
                Begin
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* HTML Compiler */}
      <section className="relative overflow-hidden bg-[#1e293b] rounded-[18px] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        {/* Background glow */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#6367ff]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#8494ff]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-8">
          {/* Icon */}
          <div className="shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-[#6367ff]/20 border border-[#6367ff]/30">
            <svg className="w-8 h-8 text-[#8494ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#8494ff] mb-2">
              Try it yourself
            </span>
            <h2 className="text-2xl font-black text-white leading-tight mb-2">
              HTML CSS JS Compiler
            </h2>
            <p className="text-[#94a3b8] text-sm leading-relaxed max-w-md">
              Write HTML, CSS, and JavaScript directly in your browser and see the result in real time. No installs, no setup. Just open it and start building.
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <Link
              href="/compiler/html"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#6367ff] text-white text-sm font-bold rounded-[10px] hover:bg-[#8494ff] hover:shadow-[0_4px_20px_rgba(99,103,255,0.5)] transition-all duration-200"
            >
              Open Compiler
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-xl font-extrabold text-[#0f172a] tracking-tight mb-6">
          Why CodingBanana?
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-200 ${feature.hoverBorder} ${feature.hoverShadow}`}
            >
              <div className={`w-11 h-11 flex items-center justify-center rounded-[10px] mb-4 transition-colors duration-200 ${feature.iconBg} ${feature.iconColor}`}>
                {feature.icon}
              </div>
              <h3 className="font-extrabold text-[#0f172a] mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSubscribe />
    </div>
  );
}
