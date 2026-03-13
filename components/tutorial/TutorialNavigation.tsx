import Link from "next/link";
import type { Lesson } from "@/lib/lessons";

interface TutorialNavigationProps {
  prev: Lesson | undefined;
  next: Lesson | undefined;
}

export default function TutorialNavigation({
  prev,
  next,
}: TutorialNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className="flex items-stretch gap-3 mt-6"
      aria-label="Lesson navigation"
    >
      {/* Previous */}
      <div className="flex-1">
        {prev ? (
          <Link
            href={`/tutorial/${prev.slug}`}
            className="group flex flex-col h-full gap-1 bg-white border border-[#e5e7eb] rounded-[10px] px-4 py-3 hover:border-[#6367ff] hover:shadow-[0_4px_12px_rgba(99,103,255,0.12)] transition-all"
          >
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#64748b] group-hover:text-[#6367ff] transition-colors">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </span>
            <span className="text-sm font-semibold text-[#0f172a] leading-snug">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Next */}
      <div className="flex-1">
        {next ? (
          <Link
            href={`/tutorial/${next.slug}`}
            className="group flex flex-col h-full gap-1 items-end text-right bg-[#6367ff] border border-[#6367ff] rounded-[10px] px-4 py-3 hover:bg-[#8494ff] hover:border-[#8494ff] transition-all"
          >
            <span className="flex items-center gap-1.5 text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
              Next
              <svg
                className="w-3.5 h-3.5"
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
            <span className="text-sm font-semibold text-white leading-snug">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
