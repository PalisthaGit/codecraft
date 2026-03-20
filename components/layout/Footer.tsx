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
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Top row: brand + link columns */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-10">

          {/* Brand */}
          <div className="sm:flex-1">
            <Link
              href="/"
              className="text-lg font-black text-[#0f172a] tracking-tight"
            >
              CodingBanana
            </Link>
            <p className="mt-2 text-sm text-[#64748b] leading-relaxed max-w-[220px]">
              Free, beginner-friendly tutorials for HTML, CSS, and JavaScript.
              Learn to build for the web, one step at a time.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-12">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#6367ff] mb-3">
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

        {/* Bottom row: copyright */}
        <div className="mt-10 pt-6 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#64748b]">
            © {new Date().getFullYear()} CodingBanana. All rights reserved.
          </p>
          <p className="text-xs text-[#64748b]">
            Free for everyone. Always.
          </p>
        </div>

      </div>
    </footer>
  );
}
