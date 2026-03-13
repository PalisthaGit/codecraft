import Link from "next/link";
import CodeBlock from "@/components/ui/CodeBlock";
import OutputBlock from "@/components/ui/OutputBlock";
import type { Lesson } from "@/lib/lessons";

interface TutorialContentProps {
  lesson: Lesson;
}

export default function TutorialContent({ lesson }: TutorialContentProps) {
  return (
    <article>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-6">
        <Link
          href="/"
          className="text-[#6367ff] font-semibold hover:underline"
        >
          Tutorial
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <span className="text-[#6367ff] font-semibold">{lesson.section}</span>
        <span className="text-[#e5e7eb]">›</span>
        <span>{lesson.title}</span>
      </nav>

      {/* Section tag */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        {lesson.section}
      </span>

      {/* Title */}
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        {lesson.title}
      </h1>

      {/* Metadata */}
      <div className="flex items-center gap-4 flex-wrap text-xs text-[#64748b] font-semibold mb-8">
        <span>⏱ {lesson.readTime}</span>
        <span>📖 {lesson.difficulty}</span>
      </div>

      {/* Content blocks */}
      <div>
        {lesson.content.map((block, index) => {
          switch (block.type) {
            case "definition":
              return (
                <div
                  key={index}
                  className="bg-[#f0f4ff] border border-[#6367ff]/25 border-l-4 border-l-[#6367ff] rounded-lg px-5 py-4 mb-5 text-base font-semibold text-[#0f172a] leading-[1.7]"
                >
                  {block.text}
                </div>
              );

            case "heading":
              return (
                <h2
                  key={index}
                  className="text-[1.3rem] font-extrabold text-[#0f172a] mt-9 mb-3"
                >
                  {block.text}
                </h2>
              );

            case "paragraph":
              return (
                <p
                  key={index}
                  className="text-[0.95rem] leading-[1.8] text-[#374151] mb-4"
                >
                  {block.text}
                </p>
              );

            case "code":
              return (
                <CodeBlock
                  key={index}
                  code={block.code}
                  language={block.language}
                />
              );

            case "output":
              return (
                <OutputBlock
                  key={index}
                  content={block.content}
                  label={block.label}
                />
              );

            case "tip":
              return (
                <div
                  key={index}
                  className="flex gap-3 items-start bg-gradient-to-br from-[#ffdbfd]/40 to-[#c9beff]/25 border border-[#c9beff]/60 rounded-[12px] px-5 py-4 mt-2 mb-7"
                >
                  <span className="text-xl shrink-0 mt-0.5">💡</span>
                  <p className="text-sm leading-[1.6] text-[#0f172a] m-0">
                    {block.text}
                  </p>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#e5e7eb] mt-10" />
    </article>
  );
}
