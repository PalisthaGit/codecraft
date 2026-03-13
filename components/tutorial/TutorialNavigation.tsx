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
      className="grid grid-cols-2 gap-4 mt-10 mb-2"
      aria-label="Lesson navigation"
    >
      {/* Previous */}
      <div>
        {prev ? (
          <Link
            href={`/tutorial/${prev.slug}`}
            className="group relative flex flex-col pl-12 pr-5 py-5 bg-white border-[1.5px] border-[#e5e7eb] rounded-[14px] hover:border-[#6367ff] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,103,255,0.12)] transition-all duration-200"
          >
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748b] group-hover:text-[#6367ff] transition-all duration-200 group-hover:-translate-x-0.5">
              ←
            </span>
            <span className="text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[#64748b] mb-1.5">
              Previous Lesson
            </span>
            <span className="text-base font-extrabold text-[#0f172a] leading-snug">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Next */}
      <div>
        {next ? (
          <Link
            href={`/tutorial/${next.slug}`}
            className="group relative flex flex-col items-end text-right pl-5 pr-12 py-5 bg-[#6367ff] border-[1.5px] border-[#6367ff] rounded-[14px] hover:bg-[#5254e8] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(99,103,255,0.35)] transition-all duration-200"
          >
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5">
              →
            </span>
            <span className="text-[0.72rem] font-bold tracking-[0.08em] uppercase text-white/60 mb-1.5">
              Next Lesson
            </span>
            <span className="text-base font-extrabold text-white leading-snug">
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
