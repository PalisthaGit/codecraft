import Link from "next/link";
import { cssLessonGroups } from "@/data/cssLessons";

export const metadata = {
  title: "CSS Fundamentals — CodingBanana",
  description: "Learn CSS from scratch — selectors, the box model, flexbox, and more.",
};

export default function CssIndexPage() {
  let lessonNumber = 0;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-6">
        <Link href="/" className="text-[#6367ff] font-semibold hover:underline">
          Tutorial
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <span>CSS Fundamentals</span>
      </nav>

      {/* Header */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        CSS
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        CSS Fundamentals
      </h1>
      <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-10">
        CSS brings your HTML to life. These lessons cover how to select
        elements, control layout, and style pages with confidence.
      </p>

      {/* Grouped lesson list */}
      <div className="space-y-10">
        {cssLessonGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-black uppercase tracking-widest text-[#6367ff] mb-4">
              {group.title}
            </h2>
            <div className="space-y-3">
              {group.lessons.map((lesson) => {
                lessonNumber += 1;
                const num = lessonNumber;
                return (
                  <Link
                    key={lesson.slug}
                    href={`/css/${lesson.slug}`}
                    className="group flex items-start gap-5 bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-[#6367ff] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,103,255,0.12)] transition-all duration-200"
                  >
                    <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#6367ff]/10 text-[#6367ff] text-sm font-extrabold">
                      {num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-extrabold text-[#0f172a] group-hover:text-[#6367ff] transition-colors duration-200">
                          {lesson.title}
                        </h3>
                        <div className="shrink-0 flex items-center gap-2 text-[0.7rem] font-bold text-[#64748b]">
                          <span>{lesson.readTime}</span>
                        </div>
                      </div>
                      <p className="text-sm text-[#64748b] leading-relaxed mt-1">
                        {lesson.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Also Read */}
      <div className="mt-14">
        <h2 className="text-xs font-black uppercase tracking-widest text-[#6367ff] mb-4">
          Also Read
        </h2>
        <div className="space-y-3">
          {[
            { slug: "outline", title: "CSS Outline", description: "Understand how outline differs from border, control focus styles for accessibility, and learn the box-shadow trick for rounded elements." },
            { slug: "visibility", title: "CSS Visibility", description: "Learn the third way to hide elements in CSS — visibility: hidden keeps the space while making the element fully invisible and non-interactive." },
            { slug: "normalize", title: "CSS Normalize", description: "Understand the difference between a CSS Reset and CSS Normalize — and learn when to reach for each one in your projects." },
            { slug: "bem-naming", title: "CSS BEM Naming", description: "Write scalable, readable CSS class names using the Block Element Modifier convention used by professional teams worldwide." },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/css/${item.slug}`}
              className="group flex items-start gap-5 bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-[#6367ff] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,103,255,0.12)] transition-all duration-200"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-[#0f172a] group-hover:text-[#6367ff] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
