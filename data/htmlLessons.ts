import type { ContentMeta } from "@/lib/contentRegistry";

export interface LessonGroup {
  title: string;
  lessons: ContentMeta[];
}

export const htmlLessonGroups: LessonGroup[] = [
  {
    title: "Getting Started",
    lessons: [
      {
        slug: "introduction",
        title: "What is HTML",
        description: "Learn what HTML is and how it works. Understand the foundation of every webpage on the internet before writing your first line of code.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
      {
        slug: "setting-up",
        title: "Setting Up HTML",
        description: "Learn how to set up your HTML environment. Write your first HTML file and open it in a browser. Step by step guide for Windows and Mac.",
        readTime: "4 min read",
        difficulty: "Beginner",
      },
    ],
  },
  {
    title: "Text",
    lessons: [
      {
        slug: "tags",
        title: "HTML Tags",
        description: "Learn what HTML tags are and how they work. Understand opening tags, closing tags, and self closing tags with simple hands on examples.",
        readTime: "8 min read",
        difficulty: "Beginner",
      },
      {
        slug: "headings",
        title: "HTML Headings",
        description: "Learn how to use HTML heading tags h1 through h6 to structure your page with titles and sections.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
    ],
  },
  {
    title: "Images",
    lessons: [
      {
        slug: "images",
        title: "Images",
        description: "Learn how to add images to your page with the img tag and control their size.",
        readTime: "6 min read",
        difficulty: "Beginner",
      },
      {
        slug: "figure",
        title: "Figure and Caption",
        description: "Group images with captions using the figure and figcaption elements.",
        readTime: "4 min read",
        difficulty: "Beginner",
      },
    ],
  },
  {
    title: "Lists",
    lessons: [
      {
        slug: "list",
        title: "Lists",
        description: "Organise content with unordered and ordered lists using ul, ol, and li.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
    ],
  },
  {
    title: "Tables",
    lessons: [
      {
        slug: "table",
        title: "Tables",
        description: "Display data in rows and columns using HTML table elements.",
        readTime: "6 min read",
        difficulty: "Beginner",
      },
    ],
  },
  {
    title: "Links",
    lessons: [
      {
        slug: "link",
        title: "Links",
        description: "Connect pages together using anchor tags and learn about relative and absolute URLs.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
    ],
  },
  {
    title: "Forms",
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
    title: "Structure",
    lessons: [
      {
        slug: "divs-and-spans",
        title: "Divs and Spans",
        description: "Learn what div and span are in HTML and when to use them. Understand block and inline elements with simple hands on examples.",
        readTime: "7 min read",
        difficulty: "Beginner",
      },
      {
        slug: "semantic-html",
        title: "Semantic HTML",
        description: "Learn what semantic HTML tags are and why they matter. Understand header, nav, main, section, aside, and footer with simple hands on examples.",
        readTime: "7 min read",
        difficulty: "Beginner",
      },
    ],
  },
];

// Flat list used by the registry for slug lookup and prev/next navigation
export const htmlLessons: ContentMeta[] = htmlLessonGroups.flatMap((g) => g.lessons);
