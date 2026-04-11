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
        ogImage: "/images/html-css-js-layers.png",
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
      {
        slug: "absolute-relative-links",
        title: "Absolute vs Relative Links",
        description: "Understand the difference between absolute and relative links in HTML and know when to use each one.",
        readTime: "6 min read",
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
      {
        slug: "create-contact-from",
        title: "Building a Contact Form",
        description: "Learn labels, email inputs, textareas, dropdowns, radio buttons, and checkboxes by building a complete contact form from scratch.",
        readTime: "8 min read",
        difficulty: "Beginner",
      },
      {
        slug: "form-validation",
        title: "Form Validation",
        description: "Learn how to validate forms using HTML attributes like required, minlength, maxlength, min, max, and pattern — no JavaScript needed.",
        readTime: "7 min read",
        difficulty: "Beginner",
      },
      {
        slug: "form-action",
        title: "The action Attribute",
        description: "Learn what the action attribute does and how it tells the browser where to send your form data when the user submits.",
        readTime: "5 min read",
        difficulty: "Beginner",
      },
      {
        slug: "method-attribute",
        title: "The method Attribute",
        description: "Understand GET and POST, when to use each one, and how the name attribute works when the browser packages up your form data.",
        readTime: "7 min read",
        difficulty: "Beginner",
      },
      {
        slug: "fieldset-legend",
        title: "Fieldset and Legend",
        description: "Learn how to group related form inputs using fieldset and legend to make long forms clearer, more accessible, and easier to navigate.",
        readTime: "7 min read",
        difficulty: "Beginner",
      },
      {
        slug: "file-uploads-and-input-types",
        title: "File Uploads and Specialist Input Types",
        description: "Learn how to add file uploads to forms and explore specialist input types like date, time, color, range, hidden, and password.",
        readTime: "8 min read",
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
  {
    title: "Projects",
    lessons: [
      {
        slug: "projects/create-nadia-wiki",
        title: "Build a Wikipedia Page",
        description: "Build a Wikipedia-style page for a made-up person using headings, paragraphs, images, lists, tables, and links.",
        readTime: "15 min read",
        difficulty: "Beginner",
      },
    ],
  },
];

// Flat list used by the registry for slug lookup and prev/next navigation
export const htmlLessons: ContentMeta[] = htmlLessonGroups.flatMap((g) => g.lessons);
