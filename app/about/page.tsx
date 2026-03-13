import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Codecraft — Free Coding Tutorials for Beginners",
  description:
    "Codecraft is a free, beginner-friendly platform for learning HTML, CSS, and JavaScript. No experience needed — just clear lessons and real examples.",
};

const sections = [
  {
    title: "What is Codecraft?",
    body: "Codecraft is a free learning platform for people who want to learn web development from scratch. We cover the three core technologies of the web — HTML, CSS, and JavaScript — with structured, easy-to-follow lessons that anyone can understand, regardless of prior experience. Every lesson is written in plain language. No jargon. No assumptions. We start from the very beginning and build up your knowledge one concept at a time.",
  },
  {
    title: "Who is it for?",
    body: "Codecraft is built for absolute beginners — people who have never written a line of code and want to start building websites. It's also useful for anyone who learned a little in the past and wants to fill in the gaps. If you've ever looked at a web page and wondered how it was made, you're in the right place.",
  },
  {
    title: "How does it work?",
    body: "Lessons are organised into tracks — HTML, CSS, and JavaScript. Each track takes you through the fundamentals in a logical order. Start from lesson one and work your way through, or jump to any topic you need. Every lesson includes clear explanations, code examples you can copy and run, and tips that highlight the most important things to remember.",
  },
  {
    title: "Is it really free?",
    body: "Yes — completely free. No account required, no paywalls, no premium tiers. Codecraft is supported by ads that help keep the lights on. All content is freely available to everyone, forever.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        About
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-3">
        About Codecraft
      </h1>
      <p className="text-[0.95rem] leading-[1.8] text-[#64748b] mb-10 max-w-xl">
        A free, beginner-friendly place to learn the fundamentals of web
        development — HTML, CSS, and JavaScript.
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { value: "11+", label: "Lessons" },
          { value: "3", label: "Tracks" },
          { value: "Free", label: "Always" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] px-5 py-5 text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <p className="text-2xl font-black text-[#6367ff]">{stat.value}</p>
            <p className="text-xs font-semibold text-[#64748b] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Section cards */}
      <div className="space-y-4 mb-10">
        {sections.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] border-l-4 border-l-[#6367ff] px-6 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <h2 className="font-extrabold text-[#0f172a] mb-2">{s.title}</h2>
            <p className="text-sm leading-[1.8] text-[#374151]">{s.body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6367ff]/5 to-[#c9beff]/20 border-[1.5px] border-[#6367ff]/20 rounded-[14px] px-6 py-7">
        <h2 className="font-extrabold text-[#0f172a] mb-1">Ready to start?</h2>
        <p className="text-sm text-[#64748b] leading-relaxed mb-5">
          The best way to learn coding is to start. Pick a track and dive in.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/html"
            className="inline-flex items-center gap-2 px-[18px] py-[10px] bg-[#6367ff] text-white text-sm font-bold rounded-[10px] hover:bg-[#5254e8] hover:shadow-[0_4px_16px_rgba(99,103,255,0.4)] transition-all duration-200"
          >
            Start with HTML
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-[18px] py-[10px] bg-white text-[#0f172a] text-sm font-bold rounded-[10px] border-[1.5px] border-[#e5e7eb] hover:border-[#6367ff] hover:text-[#6367ff] transition-all duration-200"
          >
            Browse All Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
