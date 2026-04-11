import type { ContentMeta } from "@/lib/contentRegistry";
import userCssLessonsJson from "./userCssLessons.json";

const userCssLessons = userCssLessonsJson as ContentMeta[];

export const cssLessons: ContentMeta[] = [
  {
    slug: "selectors",
    title: "CSS Selectors",
    description: "Target HTML elements precisely using element, class, ID, and attribute selectors.",
    readTime: "7 min read",
    difficulty: "Beginner",
  },
  {
    slug: "box-model",
    title: "The Box Model",
    description: "Every element is a box. Learn how content, padding, border, and margin work together.",
    readTime: "6 min read",
    difficulty: "Beginner",
  },
  {
    slug: "flexbox",
    title: "Flexbox Layout",
    description: "Arrange items in rows and columns, distribute space, and center anything with ease.",
    readTime: "8 min read",
    difficulty: "Beginner",
  },
  {
    slug: "typography",
    title: "Typography",
    description: "Control fonts, sizes, weights, line height, and spacing to make text readable and polished.",
    readTime: "6 min read",
    difficulty: "Beginner",
  },
  {
    slug: "colors",
    title: "Colors",
    description: "Use hex, RGB, HSL, gradients, and alpha transparency to bring color to your designs.",
    readTime: "6 min read",
    difficulty: "Beginner",
  },
  {
    slug: "grid",
    title: "CSS Grid",
    description: "Build two-dimensional layouts with rows, columns, gaps, and auto-fill card grids.",
    readTime: "8 min read",
    difficulty: "Intermediate",
  },
  {
    slug: "positioning",
    title: "Positioning",
    description: "Control element placement with static, relative, absolute, fixed, and sticky positioning.",
    readTime: "7 min read",
    difficulty: "Intermediate",
  },
  {
    slug: "transitions",
    title: "Transitions & Animations",
    description: "Smoothly animate property changes with transitions and create multi-step sequences with @keyframes.",
    readTime: "7 min read",
    difficulty: "Intermediate",
  },
  {
    slug: "responsive",
    title: "Responsive Design",
    description: "Use media queries and a mobile-first approach to make pages look great on any screen size.",
    readTime: "7 min read",
    difficulty: "Intermediate",
  },
  {
    slug: "pseudo-elements",
    title: "Pseudo-elements",
    description: "Style specific parts of elements and insert decorative content using ::before, ::after, and more.",
    readTime: "6 min read",
    difficulty: "Intermediate",
  },
  ...userCssLessons,
];
