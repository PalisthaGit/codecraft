"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contentRegistry } from "@/lib/contentRegistry";

const tutorialSections = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/tutorial/introduction" },
      { label: "Environment Setup", href: "/tutorial/setup" },
    ],
  },
  {
    title: "HTML Basics",
    items: [
      { label: "Document Structure", href: "/tutorial/html-structure" },
      { label: "Common Elements", href: "/tutorial/html-elements" },
      { label: "Forms & Inputs", href: "/tutorial/html-forms" },
    ],
  },
  {
    title: "CSS Fundamentals",
    items: [
      { label: "Selectors", href: "/tutorial/css-selectors" },
      { label: "Box Model", href: "/tutorial/css-box-model" },
      { label: "Flexbox", href: "/tutorial/css-flexbox" },
    ],
  },
  {
    title: "JavaScript",
    items: [
      { label: "Variables & Types", href: "/tutorial/js-variables" },
      { label: "Functions", href: "/tutorial/js-functions" },
      { label: "DOM Manipulation", href: "/tutorial/js-dom" },
    ],
  },
];

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

export default function NavLinks({ onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  // Section-aware navigation
  const isHtmlSection = pathname.startsWith("/html");
  const isCssSection = pathname.startsWith("/css");
  const isBlogSection = pathname.startsWith("/blog");
  const isContentSection = isHtmlSection || isCssSection || isBlogSection;

  if (isHtmlSection) {
    const section = contentRegistry.html;
    return (
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div>
          <Link
            href="/"
            onClick={onNavigate}
            className="flex items-center gap-1.5 px-3 mb-4 text-xs font-semibold text-[#64748b] hover:text-[#6367ff] transition-colors"
          >
            ← All Tutorials
          </Link>
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.lessons.map((lesson) => (
              <NavItem
                key={lesson.slug}
                href={`/html/${lesson.slug}`}
                label={lesson.title}
                isActive={pathname === `/html/${lesson.slug}`}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  if (isCssSection) {
    const section = contentRegistry.css;
    return (
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div>
          <Link
            href="/"
            onClick={onNavigate}
            className="flex items-center gap-1.5 px-3 mb-4 text-xs font-semibold text-[#64748b] hover:text-[#6367ff] transition-colors"
          >
            ← All Tutorials
          </Link>
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.lessons.map((lesson) => (
              <NavItem
                key={lesson.slug}
                href={`/css/${lesson.slug}`}
                label={lesson.title}
                isActive={pathname === `/css/${lesson.slug}`}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  if (isBlogSection) {
    const section = contentRegistry.blog;
    return (
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div>
          <Link
            href="/"
            onClick={onNavigate}
            className="flex items-center gap-1.5 px-3 mb-4 text-xs font-semibold text-[#64748b] hover:text-[#6367ff] transition-colors"
          >
            ← Home
          </Link>
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.lessons.map((lesson) => (
              <NavItem
                key={lesson.slug}
                href={`/blog/${lesson.slug}`}
                label={lesson.title}
                isActive={pathname === `/blog/${lesson.slug}`}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  // Default: tutorial sections
  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {tutorialSections.map((section) => (
        <div key={section.title}>
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={pathname === item.href}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
