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
        title: "Understanding HTML",
        description: "Learn what HTML is and how it works. Understand the foundation of every webpage on the internet before writing your first line of code.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
      {
        slug: "tags",
        title: "Setting Up HTML",
        description: "Learn how HTML tags work and how to write your first HTML code.",
        readTime: "4 min read",
        difficulty: "Beginner",
      },
      {
        slug: "test",
        title: "Text Basics",
        description: "Structure your content with headings, paragraphs, bold, italic, and other text elements.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
      {
        slug: "images",
        title: "Images",
        description: "Learn how to add images to your page with the img tag and control their size.",
        readTime: "6 min read",
        difficulty: "Beginner",
      },
      {
        slug: "setup-vscode",
        title: "Setting Up VS Code",
        description: "Install and configure VS Code so you can write HTML on your own computer.",
        readTime: "4 min read",
        difficulty: "Beginner",
      },
      {
        slug: "headings",
        title: "Adding Images from Your Folder",
        description: "Learn how to organise your images into a folder and link to them correctly.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
      {
        slug: "figure",
        title: "Figure and Figure Caption",
        description: "Group images with captions using the figure and figcaption elements.",
        readTime: "4 min read",
        difficulty: "Beginner",
      },
      {
        slug: "list",
        title: "Lists",
        description: "Organise content with unordered and ordered lists using ul, ol, and li.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
      {
        slug: "table",
        title: "HTML Tables",
        description: "Display data in rows and columns using HTML table elements.",
        readTime: "6 min read",
        difficulty: "Beginner",
      },
      {
        slug: "link",
        title: "HTML Links",
        description: "Connect pages together using anchor tags and learn about relative and absolute URLs.",
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
        title: "Forms",
        description: "Build forms with inputs, labels, and buttons to collect data from users.",
        readTime: "7 min read",
        difficulty: "Beginner",
      },
    ],
  },
  {
    title: "HTML Structure",
    lessons: [
      {
        slug: "document-structure",
        title: "Basic HTML Page Structure",
        description: "Understand the head and body structure that every HTML document follows.",
        readTime: "6 min read",
        difficulty: "Beginner",
      },
    ],
  },
];

// Flat list used by the registry for slug lookup and prev/next navigation
export const htmlLessons: ContentMeta[] = htmlLessonGroups.flatMap((g) => g.lessons);
