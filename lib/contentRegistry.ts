export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  difficulty: string;
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
    lessons: [
      {
        slug: "introduction",
        title: "Introduction to HTML",
        description: "Learn what HTML is and why it's the foundation of every web page.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
      {
        slug: "document-structure",
        title: "Document Structure",
        description: "Understand how an HTML document is structured with head, body, and semantic elements.",
        readTime: "6 min read",
        difficulty: "Beginner",
      },
      {
        slug: "links",
        title: "Links & Navigation",
        description: "Connect pages together using anchor tags and learn about relative vs absolute URLs.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
    ],
  },
  css: {
    title: "CSS Fundamentals",
    basePath: "/css",
    lessons: [
      {
        slug: "selectors",
        title: "CSS Selectors",
        description: "Target HTML elements precisely using element, class, ID, and attribute selectors.",
        readTime: "7 min read",
        difficulty: "Beginner",
      },
    ],
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
