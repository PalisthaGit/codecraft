import type { ContentMeta } from "@/lib/contentRegistry";

export interface LessonGroup {
  title: string;
  lessons: ContentMeta[];
}

export const htmlLessonGroups: LessonGroup[] = [
  {
    title: "HTML Basics",
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
  {
    title: "HTML Forms",
    lessons: [
      {
        slug: "forms",
        title: "Form Elements",
        description: "Build forms with inputs, labels, buttons, and more to collect data from users.",
        readTime: "7 min read",
        difficulty: "Beginner",
      },
    ],
  },
];

// Flat list used by the registry for slug lookup and prev/next navigation
export const htmlLessons: ContentMeta[] = htmlLessonGroups.flatMap((g) => g.lessons);
