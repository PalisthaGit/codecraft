"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { htmlLessonGroups } from "@/data/htmlLessons";
import { cssLessons } from "@/data/cssLessons";
import { javascriptLessons } from "@/data/javascriptLessons";
import type { ContentMeta } from "@/lib/contentRegistry";
import type { LessonGroup } from "@/data/htmlLessons";

interface NavLinksProps {
  onNavigate?: () => void;
}

function NavItem({
  href,
  label,
  isActive,
  onNavigate,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
          isActive
            ? "bg-[#6367ff] text-white font-semibold"
            : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}

// Grouped sidebar — supports multiple sub-sections
function GroupedSectionNav({
  groups,
  basePath,
  backLabel = "← All Tutorials",
  backHref = "/",
  pathname,
  onNavigate,
}: {
  groups: LessonGroup[];
  basePath: string;
  backLabel?: string;
  backHref?: string;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      <Link
        href={backHref}
        onClick={onNavigate}
        className="flex items-center gap-1.5 px-3 text-xs font-semibold text-[#64748b] hover:text-[#6367ff] transition-colors"
      >
        {backLabel}
      </Link>
      {groups.map((group) => (
        <div key={group.title}>
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            {group.title}
          </p>
          <ul className="space-y-1">
            {group.lessons.map((lesson) => {
              const href = `${basePath}/${lesson.slug}`;
              return (
                <NavItem
                  key={lesson.slug}
                  href={href}
                  label={lesson.title}
                  isActive={pathname === href}
                  onNavigate={onNavigate}
                />
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

// Flat sidebar — single section, no groups
function FlatSectionNav({
  title,
  lessons,
  basePath,
  backLabel = "← All Tutorials",
  backHref = "/",
  pathname,
  onNavigate,
}: {
  title: string;
  lessons: ContentMeta[];
  basePath: string;
  backLabel?: string;
  backHref?: string;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      <Link
        href={backHref}
        onClick={onNavigate}
        className="flex items-center gap-1.5 px-3 text-xs font-semibold text-[#64748b] hover:text-[#6367ff] transition-colors"
      >
        {backLabel}
      </Link>
      <div>
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
          {title}
        </p>
        <ul className="space-y-1">
          {lessons.map((lesson) => {
            const href = `${basePath}/${lesson.slug}`;
            return (
              <NavItem
                key={lesson.slug}
                href={href}
                label={lesson.title}
                isActive={pathname === href}
                onNavigate={onNavigate}
              />
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

const tutorialSections = [
  { title: "HTML Basics", href: "/html" },
  { title: "CSS Fundamentals", href: "/css" },
  { title: "JavaScript", href: "/javascript" },
];

export default function NavLinks({ onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/html")) {
    return (
      <GroupedSectionNav
        groups={htmlLessonGroups}
        basePath="/html"
        pathname={pathname}
        onNavigate={onNavigate}
      />
    );
  }

  if (pathname.startsWith("/css")) {
    return (
      <FlatSectionNav
        title="CSS Fundamentals"
        lessons={cssLessons}
        basePath="/css"
        pathname={pathname}
        onNavigate={onNavigate}
      />
    );
  }

  if (pathname.startsWith("/javascript")) {
    return (
      <FlatSectionNav
        title="JavaScript"
        lessons={javascriptLessons}
        basePath="/javascript"
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

  // Default: top-level section list
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
