import Link from "next/link";
import { javascriptLessons } from "@/data/javascriptLessons";

export const metadata = {
  title: "JavaScript — Codecraft",
  description: "Learn JavaScript from scratch — variables, functions, DOM manipulation, and more.",
};

export default function JavaScriptIndexPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-6">
        <Link href="/" className="text-[#6367ff] font-semibold hover:underline">
          Tutorial
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <span>JavaScript</span>
      </nav>

      {/* Header */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        JavaScript
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        JavaScript
      </h1>
      <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-10">
        JavaScript makes web pages interactive. These lessons cover the core
        language — from storing data to writing functions and manipulating the
        DOM.
      </p>

      {/* Lesson list */}
      <div className="space-y-3">
        {javascriptLessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/javascript/${lesson.slug}`}
            className="group flex items-start gap-5 bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-[#6367ff] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,103,255,0.12)] transition-all duration-200"
          >
            <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#6367ff]/10 text-[#6367ff] text-sm font-extrabold">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-extrabold text-[#0f172a] group-hover:text-[#6367ff] transition-colors duration-200">
                  {lesson.title}
                </h3>
                <span className="shrink-0 text-[0.7rem] font-bold text-[#64748b]">
                  {lesson.readTime}
                </span>
              </div>
              <p className="text-sm text-[#64748b] leading-relaxed mt-1">
                {lesson.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
