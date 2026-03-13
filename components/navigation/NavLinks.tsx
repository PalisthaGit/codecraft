"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { htmlLessons } from "@/data/htmlLessons";
import { cssLessons } from "@/data/cssLessons";
import { javascriptLessons } from "@/data/javascriptLessons";
import type { ContentMeta } from "@/lib/contentRegistry";

interface NavLinksProps {
  onNavigate?: () => void;
}

interface SectionNavProps {
  title: string;
  basePath: string;
  lessons: ContentMeta[];
  backLabel?: string;
  backHref?: string;
  pathname: string;
  onNavigate?: () => void;
}

function SectionNav({
  title,
  basePath,
  lessons,
  backLabel = "← All Tutorials",
  backHref = "/",
  pathname,
  onNavigate,
}: SectionNavProps) {
  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6">
      <Link
        href={backHref}
        onClick={onNavigate}
        className="flex items-center gap-1.5 px-3 mb-5 text-xs font-semibold text-[#64748b] hover:text-[#6367ff] transition-colors"
      >
        {backLabel}
      </Link>
      <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
        {title}
      </p>
      <ul className="space-y-1">
        {lessons.map((lesson) => {
          const href = `${basePath}/${lesson.slug}`;
          const isActive = pathname === href;
          return (
            <li key={lesson.slug}>
              <Link
                href={href}
                onClick={onNavigate}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? "bg-[#6367ff] text-white font-semibold"
                    : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                }`}
              >
                {lesson.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const tutorialSections = [
  {
    title: "HTML Basics",
    href: "/html",
  },
  {
    title: "CSS Fundamentals",
    href: "/css",
  },
  {
    title: "JavaScript",
    href: "/javascript",
  },
];

export default function NavLinks({ onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/html")) {
    return (
      <SectionNav
        title="HTML Basics"
        basePath="/html"
        lessons={htmlLessons}
        pathname={pathname}
        onNavigate={onNavigate}
      />
    );
  }

  if (pathname.startsWith("/css")) {
    return (
      <SectionNav
        title="CSS Fundamentals"
        basePath="/css"
        lessons={cssLessons}
        pathname={pathname}
        onNavigate={onNavigate}
      />
    );
  }

  if (pathname.startsWith("/javascript")) {
    return (
      <SectionNav
        title="JavaScript"
        basePath="/javascript"
        lessons={javascriptLessons}
        pathname={pathname}
        onNavigate={onNavigate}
      />
    );
  }

  if (pathname.startsWith("/blog")) {
    return (
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-1.5 px-3 mb-5 text-xs font-semibold text-[#64748b] hover:text-[#6367ff] transition-colors"
        >
          ← Home
        </Link>
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
          Blog
        </p>
      </nav>
    );
  }

  // Default: top-level tutorial section list
  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
      <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
        Tutorials
      </p>
      {tutorialSections.map((section) => {
        const isActive = pathname.startsWith(section.href);
        return (
          <Link
            key={section.href}
            href={section.href}
            onClick={onNavigate}
            className={`block px-3 py-2 text-sm rounded-md transition-colors ${
              isActive
                ? "bg-[#6367ff] text-white font-semibold"
                : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            }`}
          >
            {section.title}
          </Link>
        );
      })}
    </nav>
  );
}
