import type { Metadata } from 'next'
import { notFound } from "next/navigation";
import Link from "next/link";
import { loadHtmlContent } from "@/lib/loadHtmlContent";
import { htmlLessons } from "@/data/htmlLessons";
import {
  contentRegistry,
  getContentMeta,
  getPrevContent,
  getNextContent,
} from "@/lib/contentRegistry";
import ContentNavigation from "@/components/tutorial/ContentNavigation";
import HtmlContentRenderer from "@/components/ui/HtmlContentRenderer";
import ProjectEditor from "@/components/ui/ProjectEditor";
import ArticleFeedback from "@/components/tutorial/ArticleFeedback";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return contentRegistry.html.lessons.map((l) => ({ slug: l.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const lesson = htmlLessons.find((l) => l.slug === slugStr)

  if (!lesson) {
    return {
      title: 'Lesson Not Found | CodingBanana',
    }
  }

  const ogImage = lesson.ogImage
    ? [{ url: lesson.ogImage, width: 1200, height: 630, alt: lesson.title }]
    : undefined

  return {
    title: `${lesson.title} | HTML Tutorial | CodingBanana`,
    description: lesson.description,
    openGraph: {
      title: `${lesson.title} | CodingBanana`,
      description: lesson.description,
      url: `https://www.codingbanana.com/html/${slugStr}`,
      siteName: 'CodingBanana',
      type: 'article',
      ...(ogImage && { images: ogImage }),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: `${lesson.title} | CodingBanana`,
      description: lesson.description,
      ...(ogImage && { images: [lesson.ogImage!] }),
    },
    alternates: {
      canonical: `https://www.codingbanana.com/html/${slugStr}`,
    },
  }
}

export default async function HtmlLessonPage({ params }: Props) {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const meta = getContentMeta("html", slugStr);
  if (!meta) notFound();

  const html = loadHtmlContent("html", slugStr);
  if (!html) notFound();

  const prev = getPrevContent("html", slugStr);
  const next = getNextContent("html", slugStr);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url: `https://www.codingbanana.com/html/${slugStr}`,
    author: {
      "@type": "Organization",
      name: "CodingBanana",
    },
    publisher: {
      "@type": "Organization",
      name: "CodingBanana",
      url: "https://www.codingbanana.com",
    },
    educationalLevel: "Beginner",
    ...(meta.ogImage && { image: `https://www.codingbanana.com${meta.ogImage}` }),
  };

  const isProject = slugStr.startsWith("projects/");

  if (isProject) {
    return (
      <div className="flex flex-col h-screen bg-[#f8fafc]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Top header bar */}
        <header className="flex items-center gap-3 px-5 h-12 bg-white border-b border-[#e5e7eb] shrink-0">
          <Link
            href="/html"
            className="flex items-center gap-1.5 text-sm text-[#6367ff] font-semibold hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <span className="text-[#e5e7eb]">|</span>
          <span className="text-sm font-bold text-[#0f172a] truncate">{meta.title}</span>
          <span className="ml-auto flex items-center gap-3 text-xs text-[#64748b] font-semibold">
            <span>⏱ {meta.readTime}</span>
            <span>📖 {meta.difficulty}</span>
          </span>
        </header>

        {/* Split: Instructions (left) | Editor (right) */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Instructions — independent scroll */}
          <div className="w-1/2 overflow-y-auto p-6 bg-white border-r border-[#e5e7eb]">
            <HtmlContentRenderer html={html} />
          </div>

          {/* Right: Code editor + preview — independent scroll managed internally */}
          <div className="w-1/2 overflow-hidden">
            <ProjectEditor />
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-6">
        <Link href="/" className="text-[#6367ff] font-semibold hover:underline">Tutorial</Link>
        <span className="text-[#e5e7eb]">›</span>
        <Link href="/html" className="text-[#6367ff] font-semibold hover:underline">HTML Basics</Link>
        <span className="text-[#e5e7eb]">›</span>
        <span>{meta.title}</span>
      </nav>

      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        HTML Basics
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

      <ContentNavigation basePath="/html" prev={prev} next={next} />
    </article>
  );
}
