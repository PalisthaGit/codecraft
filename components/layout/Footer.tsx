import Link from "next/link";

const links = {
  Learn: [
    { label: "HTML Basics", href: "/html" },
    { label: "CSS Fundamentals", href: "/css" },
    { label: "JavaScript", href: "/javascript" },
    { label: "Blog", href: "/blog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white mt-16">
      <div className="px-6 md:px-10 py-10">
        <div className="max-w-3xl flex flex-col sm:flex-row sm:items-start gap-10">
          {/* Brand */}
          <div className="sm:flex-1">
            <Link
              href="/"
              className="text-lg font-black text-[#0f172a] tracking-tight"
            >
              Codecraft
            </Link>
            <p className="mt-2 text-sm text-[#64748b] leading-relaxed max-w-xs">
              Free, beginner-friendly tutorials for HTML, CSS, and JavaScript.
              Learn to build for the web, one step at a time.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#64748b] mb-3">
                  {group}
                </p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-[#374151] hover:text-[#6367ff] transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mt-10 pt-6 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#64748b]">
            © {new Date().getFullYear()} Codecraft. All rights reserved.
          </p>
          <p className="text-xs text-[#64748b]">
            Free for everyone. Always.
          </p>
        </div>
      </div>
    </footer>
  );
}
