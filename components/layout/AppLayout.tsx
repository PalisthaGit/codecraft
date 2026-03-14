"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MobileMenu from "@/components/navigation/MobileMenu";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/compiler")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile slide-in menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Content area — offset by sidebar width on desktop */}
      <div className="md:pl-64 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="md:hidden flex items-center h-16 px-4 bg-white border-b border-[#e5e7eb] shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc] transition-colors"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="ml-3 text-lg font-bold text-[#0f172a]">
            Codecraft
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-10">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
