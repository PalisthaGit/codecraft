import type { Metadata } from 'next'
import { notFound } from "next/navigation";
import Link from "next/link";
import { loadHtmlContent } from "@/lib/loadHtmlContent";
import { javascriptLessons } from "@/data/javascriptLessons";
import { getContentMeta, getPrevContent, getNextContent, contentRegistry } from "@/lib/contentRegistry";
import ContentNavigation from "@/components/tutorial/ContentNavigation";
import HtmlContentRenderer from "@/components/ui/HtmlContentRenderer";
import ArticleFeedback from "@/components/tutorial/ArticleFeedback";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return contentRegistry.javascript.lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const lesson = javascriptLessons.find((l) => l.slug === params.slug)

  if (!lesson) {
    return {
      title: 'Lesson Not Found | CodingBanana',
    }
  }

  return {
    title: `${lesson.title} | JavaScript Tutorial | CodingBanana`,
    description: lesson.description,
    openGraph: {
      title: `${lesson.title} | CodingBanana`,
      description: lesson.description,
      url: `https://www.codingbanana.com/javascript/${lesson.slug}`,
      siteName: 'CodingBanana',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${lesson.title} | CodingBanana`,
      description: lesson.description,
    },
    alternates: {
      canonical: `https://www.codingbanana.com/javascript/${lesson.slug}`,
    },
  }
}

export default async function JavaScriptLessonPage({ params }: Props) {
  const { slug } = await params;
  const meta = getContentMeta("javascript", slug);
  if (!meta) notFound();

  const html = loadHtmlContent("javascript", slug);
  if (!html) notFound();

  const prev = getPrevContent("javascript", slug);
  const next = getNextContent("javascript", slug);

  return (
    <article className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-6">
        <Link href="/" className="text-[#6367ff] font-semibold hover:underline">
          Tutorial
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <Link href="/javascript" className="text-[#6367ff] font-semibold hover:underline">
          JavaScript
        </Link>
        <span className="text-[#e5e7eb]">›</span>
        <span>{meta.title}</span>
      </nav>

      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        JavaScript
      </span>

      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        {meta.title}
      </h1>

      <div className="flex items-center gap-4 flex-wrap text-xs text-[#64748b] font-semibold mb-8">
        <span>⏱ {meta.readTime}</span>
        <span>📖 {meta.difficulty}</span>
      </div>

      <HtmlContentRenderer html={html} />

      <div className="h-px bg-[#e5e7eb] mt-10" />

      <ArticleFeedback />

      <ContentNavigation basePath="/javascript" prev={prev} next={next} />
    </article>
  );
}
