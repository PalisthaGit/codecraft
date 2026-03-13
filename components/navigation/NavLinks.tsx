import Link from "next/link";

const sections = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/learn/introduction" },
      { label: "Environment Setup", href: "/learn/setup" },
    ],
  },
  {
    title: "HTML Basics",
    items: [
      { label: "Document Structure", href: "/learn/html-structure" },
      { label: "Common Elements", href: "/learn/html-elements" },
      { label: "Forms & Inputs", href: "/learn/html-forms" },
    ],
  },
  {
    title: "CSS Fundamentals",
    items: [
      { label: "Selectors", href: "/learn/css-selectors" },
      { label: "Box Model", href: "/learn/css-box-model" },
      { label: "Flexbox", href: "/learn/css-flexbox" },
    ],
  },
  {
    title: "JavaScript",
    items: [
      { label: "Variables & Types", href: "/learn/js-variables" },
      { label: "Functions", href: "/learn/js-functions" },
      { label: "DOM Manipulation", href: "/learn/js-dom" },
    ],
  },
];

interface NavLinksProps {
  onNavigate?: () => void;
}

export default function NavLinks({ onNavigate }: NavLinksProps) {
  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="block px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
