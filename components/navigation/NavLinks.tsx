"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
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

export default function NavLinks({ onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                      isActive
                        ? "bg-[#6367ff] text-white font-semibold"
                        : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
