import CodeBlock from "@/components/ui/CodeBlock";
import OutputBlock from "@/components/ui/OutputBlock";
import type { Lesson } from "@/lib/lessons";

interface TutorialContentProps {
  lesson: Lesson;
}

export default function TutorialContent({ lesson }: TutorialContentProps) {
  return (
    <article className="bg-white rounded-xl border border-[#e5e7eb] shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 md:p-8">
      {/* Lesson header */}
      <header className="mb-8 pb-6 border-b border-[#e5e7eb]">
        <h1 className="text-3xl font-bold text-[#0f172a] leading-tight">
          {lesson.title}
        </h1>
        <p className="mt-2 text-[#64748b] text-base">{lesson.description}</p>
      </header>

      {/* Content blocks */}
      <div className="space-y-4">
        {lesson.content.map((block, index) => {
          switch (block.type) {
            case "heading":
              return (
                <h2
                  key={index}
                  className="text-xl font-semibold text-[#0f172a] mt-8 mb-3 first:mt-0"
                >
                  {block.text}
                </h2>
              );

            case "paragraph":
              return (
                <p
                  key={index}
                  className="text-[#0f172a] leading-relaxed text-base"
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
                  className="my-5 flex gap-3 bg-[#ffdbfd] border border-[#c9beff] rounded-[10px] px-4 py-3"
                >
                  <svg
                    className="w-5 h-5 text-[#6367ff] shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-[#0f172a] leading-relaxed">
                    {block.text}
                  </p>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}
