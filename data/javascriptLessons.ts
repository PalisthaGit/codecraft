import type { ContentMeta } from "@/lib/contentRegistry";
import userJavascriptLessonsJson from "./userJavascriptLessons.json";

const userJavascriptLessons = userJavascriptLessonsJson as ContentMeta[];

export const javascriptLessons: ContentMeta[] = [
  {
    slug: "introduction",
    title: "Introduction to JavaScript",
    description: "Learn what JavaScript is, how to add it to a webpage, and run your first lines of code in the browser.",
    readTime: "5 min read",
    difficulty: "Beginner",
  },
  {
    slug: "variables",
    title: "Variables & Types",
    description: "Store and work with data using var, let, and const. Learn strings, numbers, booleans, and more.",
    readTime: "7 min read",
    difficulty: "Beginner",
  },
  {
    slug: "operators",
    title: "Operators",
    description: "Use arithmetic, comparison, and logical operators to perform calculations and make decisions.",
    readTime: "6 min read",
    difficulty: "Beginner",
  },
  {
    slug: "conditionals",
    title: "Conditionals",
    description: "Control the flow of your program with if/else statements, ternary operators, and switch.",
    readTime: "7 min read",
    difficulty: "Beginner",
  },
  {
    slug: "loops",
    title: "Loops",
    description: "Repeat code efficiently using for loops, while loops, and for...of to iterate over data.",
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
    slug: "arrays",
    title: "Arrays",
    description: "Work with ordered lists of data and transform them using map, filter, reduce, and more.",
    readTime: "9 min read",
    difficulty: "Beginner",
  },
  {
    slug: "objects",
    title: "Objects",
    description: "Store structured data in key-value pairs and use destructuring and spread to work with objects.",
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
  {
    slug: "events",
    title: "Events",
    description: "Respond to user actions like clicks, keypresses, and form submissions using event listeners.",
    readTime: "8 min read",
    difficulty: "Beginner",
  },
  {
    slug: "todo-app",
    title: "Project: To-Do App",
    description: "Build a fully interactive to-do app step by step — add, complete, and delete tasks with localStorage.",
    readTime: "20 min read",
    difficulty: "Beginner",
  },
  ...userJavascriptLessons,
];
