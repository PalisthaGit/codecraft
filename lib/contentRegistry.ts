import { htmlLessons } from "@/data/htmlLessons";
import { cssLessons } from "@/data/cssLessons";
import { javascriptLessons } from "@/data/javascriptLessons";

export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  difficulty: string;
  ogImage?: string;
}

export interface ContentSection {
  title: string;
  basePath: string;
  lessons: ContentMeta[];
}

export const contentRegistry: Record<string, ContentSection> = {
  html: {
    title: "HTML Basics",
    basePath: "/html",
    lessons: htmlLessons,
  },
  css: {
    title: "CSS Fundamentals",
    basePath: "/css",
    lessons: cssLessons,
  },
  javascript: {
    title: "JavaScript",
    basePath: "/javascript",
    lessons: javascriptLessons,
  },
  blog: {
    title: "Blog",
    basePath: "/blog",
    lessons: [
      {
        slug: "why-learn-html",
        title: "Why Learn HTML First?",
        description: "HTML is the skeleton of the web. Here's why every developer starts here.",
        readTime: "4 min read",
        difficulty: "Article",
      },
    ],
  },
};

export function getContentMeta(section: string, slug: string): ContentMeta | null {
  const reg = contentRegistry[section];
  if (!reg) return null;
  return reg.lessons.find((l) => l.slug === slug) ?? null;
}

export function getPrevContent(section: string, slug: string): ContentMeta | null {
  const reg = contentRegistry[section];
  if (!reg) return null;
  const idx = reg.lessons.findIndex((l) => l.slug === slug);
  return idx > 0 ? reg.lessons[idx - 1] : null;
}

export function getNextContent(section: string, slug: string): ContentMeta | null {
  const reg = contentRegistry[section];
  if (!reg) return null;
  const idx = reg.lessons.findIndex((l) => l.slug === slug);
  return idx >= 0 && idx < reg.lessons.length - 1 ? reg.lessons[idx + 1] : null;
}
