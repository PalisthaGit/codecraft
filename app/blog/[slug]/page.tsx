import { notFound } from "next/navigation";
import Link from "next/link";
import { loadHtmlContent } from "@/lib/loadHtmlContent";
import {
  contentRegistry,
  getContentMeta,
  getPrevContent,
  getNextContent,
} from "@/lib/contentRegistry";
import ContentNavigation from "@/components/tutorial/ContentNavigation";
import HtmlContentRenderer from "@/components/ui/HtmlContentRenderer";
import ArticleFeedback from "@/components/tutorial/ArticleFeedback";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return contentRegistry.blog.lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const meta = getContentMeta("blog", slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — CodingBanana`,
    description: meta.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const meta = getContentMeta("blog", slug);
  if (!meta) notFound();

  const html = loadHtmlContent("blog", slug);
  if (!html) notFound();

  const prev = getPrevContent("blog", slug);
  const next = getNextContent("blog", slug);

  return (
    <article className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-6">
        <Link href="/" className="text-[#6367ff] font-semibold hover:underline">
          Home
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <Link href="/blog" className="text-[#6367ff] font-semibold hover:underline">
          Blog
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <span>{meta.title}</span>
      </nav>

      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        Article
      </span>

      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        {meta.title}
      </h1>

      <div className="flex items-center gap-4 flex-wrap text-xs text-[#64748b] font-semibold mb-8">
        <span>⏱ {meta.readTime}</span>
      </div>

      <HtmlContentRenderer html={html} />

      <div className="h-px bg-[#e5e7eb] mt-10" />

      <ArticleFeedback />

      <ContentNavigation basePath="/blog" prev={prev} next={next} />
    </article>
  );
}
