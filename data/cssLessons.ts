import type { ContentMeta } from "@/lib/contentRegistry";
import userCssLessonsJson from "./userCssLessons.json";

const userCssLessons = userCssLessonsJson as ContentMeta[];

export const cssLessons: ContentMeta[] = [
  {
    slug: "introduction",
    title: "Understanding CSS",
    description: "Learn what CSS is, how it works alongside HTML and JavaScript, and what you'll build in this course.",
    readTime: "5 min read",
    difficulty: "Beginner",
  },
  {
    slug: "adding-css",
    title: "Adding CSS",
    description: "Add CSS to your page using inline, internal, and external stylesheets — and start styling the Netflix clone.",
    readTime: "7 min read",
    difficulty: "Beginner",
  },
  {
    slug: "colors",
    title: "Colors",
    description: "Use hex codes, RGB, RGBA, and background images to bring your Netflix clone to life.",
    readTime: "6 min read",
    difficulty: "Beginner",
  },
  {
    slug: "fonts",
    title: "CSS Fonts",
    description: "Control which fonts appear on your page using font-family, Google Fonts, and fallback stacks.",
    readTime: "6 min read",
    difficulty: "Beginner",
  },
  {
    slug: "typography",
    title: "Typography",
    description: "Style text with font-size, font-weight, line-height, text-align, and letter-spacing.",
    readTime: "7 min read",
    difficulty: "Beginner",
  },
  {
    slug: "selectors",
    title: "CSS Selectors",
    description: "Target HTML elements precisely using tag, class, and ID selectors to style specific sections.",
    readTime: "6 min read",
    difficulty: "Beginner",
  },
  {
    slug: "box-model",
    title: "The Box Model",
    description: "Every element is a box. Learn how padding, margin, border, and size work together.",
    readTime: "7 min read",
    difficulty: "Beginner",
  },
  {
    slug: "flexbox",
    title: "Flexbox Layout",
    description: "Build the Netflix navbar and hero section using display flex, justify-content, and align-items.",
    readTime: "8 min read",
    difficulty: "Beginner",
  },
  {
    slug: "grid",
    title: "CSS Grid",
    description: "Build the Netflix movie card grid using display grid, columns, and gap.",
    readTime: "8 min read",
    difficulty: "Intermediate",
  },
  {
    slug: "positioning",
    title: "Positioning",
    description: "Fix the Netflix navbar to the top and overlay text on movie cards using CSS positioning.",
    readTime: "7 min read",
    difficulty: "Intermediate",
  },
  {
    slug: "transitions",
    title: "Transitions",
    description: "Add smooth hover animations to Netflix movie cards using CSS transitions and transform.",
    readTime: "6 min read",
    difficulty: "Intermediate",
  },
  {
    slug: "responsive",
    title: "Responsive Design",
    description: "Use media queries to make the Netflix clone look great on phones, tablets, and desktops.",
    readTime: "7 min read",
    difficulty: "Intermediate",
  },
  {
    slug: "pseudo-elements",
    title: "Pseudo-elements",
    description: "Use ::before and ::after to add gradient overlays and decorative effects to movie cards.",
    readTime: "6 min read",
    difficulty: "Intermediate",
  },
  {
    slug: "netflix-clone",
    title: "Project: Netflix Clone",
    description: "Put it all together. Build a complete Netflix-style homepage step by step using everything you've learned.",
    readTime: "20 min read",
    difficulty: "Project",
  },
  ...userCssLessons,
];
