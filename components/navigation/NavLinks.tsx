"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { htmlLessonGroups } from "@/data/htmlLessons";
import { cssLessons } from "@/data/cssLessons";
import { javascriptLessons } from "@/data/javascriptLessons";
import type { ContentMeta } from "@/lib/contentRegistry";
import type { LessonGroup } from "@/data/htmlLessons";

const STORAGE_KEY = "codecraft_progress";

function loadCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveCompleted(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

// Article slug paths that count as "lessons"
const LESSON_PREFIXES = ["/html/", "/css/", "/javascript/", "/blog/"];

function isLessonPath(path: string) {
  return LESSON_PREFIXES.some((p) => path.startsWith(p));
}

interface NavLinksProps {
  onNavigate?: () => void;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function NavItem({
  href,
  label,
  isActive,
  isCompleted,
  onNavigate,
}: {
  href: string;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
  onNavigate?: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
          isActive
            ? "bg-[#6367ff] text-white font-semibold"
            : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
        }`}
      >
        {/* always reserve space for the tick */}
        <span className="shrink-0 w-5 h-5 flex items-center justify-center">
          {isCompleted ? (
            <CheckIcon
              className={`w-4 h-4 ${isActive ? "text-white" : "text-[#6367ff]"}`}
            />
          ) : (
            <span
              className={`block w-3 h-3 rounded-full border-[1.5px] ${
                isActive ? "border-white/40" : "border-[#d1d5db]"
              }`}
            />
          )}
        </span>
        <span className={`font-medium ${isActive ? "" : "text-[#374151]"}`}>
          {label}
        </span>
      </Link>
    </li>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <p className="px-3 mb-2 mt-1 text-xs font-black uppercase tracking-widest text-[#6367ff]">
      {title}
    </p>
  );
}

// Grouped sidebar — supports multiple sub-sections (HTML)
function GroupedSectionNav({
  groups,
  basePath,
  backLabel = "← All Tutorials",
  backHref = "/",
  pathname,
  completed,
  onNavigate,
}: {
  groups: LessonGroup[];
  basePath: string;
  backLabel?: string;
  backHref?: string;
  pathname: string;
  completed: Set<string>;
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
          <SectionHeading title={group.title} />
          <ul className="space-y-1">
            {group.lessons.map((lesson) => {
              const href = `${basePath}/${lesson.slug}`;
              return (
                <NavItem
                  key={lesson.slug}
                  href={href}
                  label={lesson.title}
                  isActive={pathname === href}
                  isCompleted={completed.has(href)}
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

// Flat sidebar — single section, no groups (CSS, JavaScript)
function FlatSectionNav({
  title,
  lessons,
  basePath,
  backLabel = "← All Tutorials",
  backHref = "/",
  pathname,
  completed,
  onNavigate,
}: {
  title: string;
  lessons: ContentMeta[];
  basePath: string;
  backLabel?: string;
  backHref?: string;
  pathname: string;
  completed: Set<string>;
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
        <SectionHeading title={title} />
        <ul className="space-y-1">
          {lessons.map((lesson) => {
            const href = `${basePath}/${lesson.slug}`;
            return (
              <NavItem
                key={lesson.slug}
                href={href}
                label={lesson.title}
                isActive={pathname === href}
                isCompleted={completed.has(href)}
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
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const prevPathRef = useRef<string | null>(null);

  // Load persisted progress after mount to avoid SSR/client mismatch
  useEffect(() => {
    setCompleted(loadCompleted());
  }, []);

  // Mark the PREVIOUS lesson as completed when navigating away from it
  useEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;

    if (!prev || !isLessonPath(prev) || prev === pathname) return;

    setCompleted((current) => {
      if (current.has(prev)) return current;
      const next = new Set(current);
      next.add(prev);
      saveCompleted(next);
      return next;
    });
  }, [pathname]);

  if (pathname.startsWith("/html")) {
    return (
      <GroupedSectionNav
        groups={htmlLessonGroups}
        basePath="/html"
        pathname={pathname}
        completed={completed}
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
        completed={completed}
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
        completed={completed}
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
        <SectionHeading title="Blog" />
      </nav>
    );
  }

  // Default: top-level section list
  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
      <p className="px-3 mb-3 text-xs font-black uppercase tracking-widest text-[#6367ff]">
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
