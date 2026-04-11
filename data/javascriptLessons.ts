import type { ContentMeta } from "@/lib/contentRegistry";
import userJavascriptLessonsJson from "./userJavascriptLessons.json";

const userJavascriptLessons = userJavascriptLessonsJson as ContentMeta[];

export const javascriptLessons: ContentMeta[] = [
  {
    slug: "variables",
    title: "Variables & Types",
    description: "Store and work with data using var, let, and const. Learn strings, numbers, booleans, and more.",
    readTime: "7 min read",
    difficulty: "Beginner",
  },
  {
    slug: "functions",
    title: "Functions",
    description: "Write reusable blocks of code with function declarations, expressions, and arrow functions.",
    readTime: "8 min read",
    difficulty: "Beginner",
  },
  {
    slug: "dom",
    title: "DOM Manipulation",
    description: "Select HTML elements from JavaScript and change their content, styles, and behavior.",
    readTime: "9 min read",
    difficulty: "Beginner",
  },
  ...userJavascriptLessons,
];
