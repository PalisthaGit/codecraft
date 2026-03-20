import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page Not Found | CodingBanana',
  description: 'This page could not be found. Browse our free HTML, CSS, and JavaScript lessons.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 text-center">

      <div className="text-8xl font-black text-[#C9BEFF] mb-6 leading-none select-none">
        404
      </div>

      <h1 className="text-2xl font-bold text-[#0F172A] mb-3">
        We could not find that page
      </h1>

      <p className="text-[#64748B] max-w-md mb-10 leading-relaxed">
        The page you are looking for might have been moved, renamed, or does not exist. Try browsing our lessons instead.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-16">
        <Link
          href="/html"
          className="bg-[#6367FF] text-white font-semibold px-6 py-3 rounded-[10px] hover:bg-[#8494FF] transition-colors"
        >
          Browse HTML lessons
        </Link>
        <Link
          href="/css"
          className="bg-white border border-[#E2E8F0] text-[#0F172A] font-semibold px-6 py-3 rounded-[10px] hover:border-[#6367FF] hover:text-[#6367FF] transition-colors"
        >
          Browse CSS lessons
        </Link>
        <Link
          href="/javascript"
          className="bg-white border border-[#E2E8F0] text-[#0F172A] font-semibold px-6 py-3 rounded-[10px] hover:border-[#6367FF] hover:text-[#6367FF] transition-colors"
        >
          Browse JS lessons
        </Link>
      </div>

      <Link
        href="/"
        className="text-[#64748B] text-sm hover:text-[#6367FF] transition-colors underline underline-offset-4"
      >
        Back to home
      </Link>

    </div>
  )
}
