import Link from "next/link";
import { contentRegistry } from "@/lib/contentRegistry";

export const metadata = {
  title: "Blog — CodingBanana",
  description: "Articles on web development, learning to code, and the fundamentals of HTML, CSS, and JavaScript.",
};

export default function BlogIndexPage() {
  const section = contentRegistry.blog;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-6">
        <Link href="/" className="text-[#6367ff] font-semibold hover:underline">
          Home
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <span>Blog</span>
      </nav>

      {/* Header */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        Articles
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        Blog
      </h1>
      <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-10">
        Thoughts on web development, learning to code, and the fundamentals
        every developer should know.
      </p>

      {/* Article list */}
      <div className="space-y-3">
        {section.lessons.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-5 bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-[#6367ff] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,103,255,0.12)] transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="font-extrabold text-[#0f172a] group-hover:text-[#6367ff] transition-colors duration-200">
                  {post.title}
                </h3>
                <span className="shrink-0 text-[0.7rem] font-bold text-[#64748b]">
                  {post.readTime}
                </span>
              </div>
              <p className="text-sm text-[#64748b] leading-relaxed">
                {post.description}
              </p>
            </div>
            <svg
              className="shrink-0 w-4 h-4 text-[#6367ff] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
