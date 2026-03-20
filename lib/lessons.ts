export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "definition"; text: string }
  | { type: "code"; code: string; language?: string }
  | { type: "output"; content: string; label?: string }
  | { type: "tip"; text: string };

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  section: string;
  readTime: string;
  difficulty: string;
  content: ContentBlock[];
}

export const lessons: Lesson[] = [
  {
    slug: "introduction",
    title: "Introduction to Coding",
    description:
      "Understand what programming is and why it is a valuable skill to learn.",
    section: "Getting Started",
    readTime: "8 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "definition",
        text: "Programming is the process of writing instructions that a computer can follow — step by step — to perform a task, display information, or power an application.",
      },
      {
        type: "paragraph",
        text: "You don't need to be a math genius or a tech expert to learn to code. Programming is a skill like any other — it takes practice, patience, and the right guidance.",
      },
      {
        type: "heading",
        text: "Your First Line of Code",
      },
      {
        type: "paragraph",
        text: 'The most traditional first step in any programming language is printing the words "Hello, World!" to the screen. Here\'s how you do it in JavaScript:',
      },
      {
        type: "code",
        language: "javascript",
        code: `console.log("Hello, World!");`,
      },
      {
        type: "output",
        label: "Output",
        content: `Hello, World!`,
      },
      {
        type: "tip",
        text: "console.log() is a built-in JavaScript function that prints a value to the console. You'll use it constantly while learning.",
      },
      {
        type: "heading",
        text: "What Can You Build?",
      },
      {
        type: "paragraph",
        text: "With coding skills, you can build websites, mobile apps, games, automation tools, and much more. As you progress through CodingBanana, you'll develop the foundation to build real things.",
      },
    ],
  },
  {
    slug: "setup",
    title: "Environment Setup",
    description:
      "Set up everything you need to start writing and running code.",
    section: "Getting Started",
    readTime: "6 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "paragraph",
        text: "Before writing code, you need a place to write it. A code editor is a program designed for writing code — it highlights syntax, catches errors, and makes editing much easier than a plain text editor.",
      },
      {
        type: "heading",
        text: "Recommended Editor: VS Code",
      },
      {
        type: "paragraph",
        text: "Visual Studio Code (VS Code) is free, beginner-friendly, and the most popular code editor in the world. Download it from code.visualstudio.com and install it like any other application.",
      },
      {
        type: "heading",
        text: "Running JavaScript in Your Browser",
      },
      {
        type: "paragraph",
        text: "You don't need to install anything extra to run JavaScript. Every modern browser has a built-in console. Open it by pressing F12 (or Cmd+Option+I on Mac), then click the Console tab.",
      },
      {
        type: "code",
        language: "javascript",
        code: `// Try typing this in your browser console\nconsole.log("It works!");`,
      },
      {
        type: "output",
        label: "Output",
        content: "It works!",
      },
    ],
  },
  {
    slug: "html-structure",
    title: "HTML Document Structure",
    description:
      "Learn how every web page is built using a standard HTML document structure.",
    section: "HTML Basics",
    readTime: "7 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "definition",
        text: "HTML (HyperText Markup Language) is the standard language used to create web pages. It describes the structure and content of a page using a system of tags and elements.",
      },
      {
        type: "heading",
        text: "The Basic HTML Template",
      },
      {
        type: "paragraph",
        text: "Every HTML document follows the same basic structure. Here is the minimal template every web page starts from:",
      },
      {
        type: "code",
        language: "html",
        code: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, World!</h1>\n    <p>This is my first web page.</p>\n  </body>\n</html>`,
      },
      {
        type: "output",
        label: "What the browser renders",
        content: "Hello, World!\nThis is my first web page.",
      },
      {
        type: "tip",
        text: "The <head> section holds information about the page and is not visible to users. The <body> contains everything that appears on screen.",
      },
      {
        type: "heading",
        text: "Breaking It Down",
      },
      {
        type: "paragraph",
        text: "<!DOCTYPE html> tells the browser this is a modern HTML5 document. The <html> tag is the root of the page. <head> holds metadata and <body> holds visible content.",
      },
    ],
  },
  {
    slug: "html-elements",
    title: "Common HTML Elements",
    description:
      "Explore the most-used HTML tags for text, images, and links.",
    section: "HTML Basics",
    readTime: "8 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "paragraph",
        text: "HTML elements are the building blocks of web pages. Each element is defined by a tag, and most tags have an opening and closing tag with content in between.",
      },
      {
        type: "heading",
        text: "Headings",
      },
      {
        type: "paragraph",
        text: "HTML provides six levels of headings, from <h1> (largest) to <h6> (smallest). Use <h1> for the main title of a page.",
      },
      {
        type: "code",
        language: "html",
        code: `<h1>Main Heading</h1>\n<h2>Sub Heading</h2>\n<h3>Smaller Heading</h3>`,
      },
      {
        type: "heading",
        text: "Paragraphs and Links",
      },
      {
        type: "code",
        language: "html",
        code: `<p>This is a paragraph of text.</p>\n<a href="https://example.com">Click here</a>`,
      },
      {
        type: "heading",
        text: "Images",
      },
      {
        type: "code",
        language: "html",
        code: `<img src="photo.jpg" alt="A description of the image" />`,
      },
      {
        type: "tip",
        text: "Always include an alt attribute on images. It describes the image for screen readers and shows when the image fails to load.",
      },
    ],
  },
  {
    slug: "html-forms",
    title: "Forms & Inputs",
    description: "Learn how to collect user input using HTML forms.",
    section: "HTML Basics",
    readTime: "6 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "paragraph",
        text: "Forms are how websites collect information from users — think login pages, sign-up forms, and search bars. The <form> element wraps all input elements together.",
      },
      {
        type: "heading",
        text: "A Simple Form",
      },
      {
        type: "code",
        language: "html",
        code: `<form>\n  <label for="name">Your name:</label>\n  <input type="text" id="name" name="name" />\n\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" />\n\n  <button type="submit">Submit</button>\n</form>`,
      },
      {
        type: "tip",
        text: "Always pair <label> elements with inputs using the for attribute matching the input's id. This improves accessibility and usability.",
      },
    ],
  },
  {
    slug: "css-selectors",
    title: "CSS Selectors",
    description:
      "Learn how to target HTML elements and apply styles using CSS selectors.",
    section: "CSS Fundamentals",
    readTime: "7 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "definition",
        text: "A CSS selector is the part of a CSS rule that identifies which HTML elements to style. Selectors are the foundation of styling — without them, your styles have nothing to target.",
      },
      {
        type: "paragraph",
        text: "CSS (Cascading Style Sheets) controls how HTML elements look — colors, spacing, fonts, and layout. A CSS rule has two parts: a selector (what to style) and declarations (how to style it).",
      },
      {
        type: "heading",
        text: "Basic Selectors",
      },
      {
        type: "code",
        language: "css",
        code: `/* Tag selector — targets all <p> elements */\np {\n  color: #0f172a;\n}\n\n/* Class selector — targets elements with class="highlight" */\n.highlight {\n  background-color: #c9beff;\n}\n\n/* ID selector — targets the element with id="title" */\n#title {\n  font-size: 2rem;\n}`,
      },
      {
        type: "tip",
        text: "Use classes for styling (they can be reused). Use IDs sparingly — they are meant to identify a single unique element on the page.",
      },
    ],
  },
  {
    slug: "css-box-model",
    title: "The Box Model",
    description:
      "Understand how CSS calculates the size and spacing of every element.",
    section: "CSS Fundamentals",
    readTime: "6 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "paragraph",
        text: "Every HTML element is a rectangular box. The CSS box model describes how the size of that box is calculated using four layers: content, padding, border, and margin.",
      },
      {
        type: "code",
        language: "css",
        code: `.card {\n  width: 300px;        /* content width */\n  padding: 16px;       /* space inside the border */\n  border: 2px solid #e5e7eb; /* visible border */\n  margin: 24px;        /* space outside the border */\n}`,
      },
      {
        type: "tip",
        text: "Add box-sizing: border-box to your CSS to make width include padding and border. This makes layouts much easier to reason about.",
      },
    ],
  },
  {
    slug: "css-flexbox",
    title: "Flexbox Layout",
    description:
      "Use CSS Flexbox to build flexible, responsive one-dimensional layouts.",
    section: "CSS Fundamentals",
    readTime: "8 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "paragraph",
        text: "Flexbox is a CSS layout model that makes it easy to align and distribute elements in a row or column. You enable it by setting display: flex on a parent container.",
      },
      {
        type: "code",
        language: "css",
        code: `.container {\n  display: flex;\n  justify-content: space-between; /* horizontal alignment */\n  align-items: center;            /* vertical alignment */\n  gap: 16px;                      /* space between items */\n}`,
      },
      {
        type: "output",
        label: "Effect",
        content: "[ Item 1 ]     [ Item 2 ]     [ Item 3 ]",
      },
      {
        type: "tip",
        text: "justify-content controls alignment along the main axis (horizontal in a row). align-items controls alignment along the cross axis (vertical in a row).",
      },
    ],
  },
  {
    slug: "js-variables",
    title: "Variables & Types",
    description:
      "Learn how to store and work with data in JavaScript using variables.",
    section: "JavaScript",
    readTime: "7 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "definition",
        text: "A variable is a named container that holds a value. Variables let you store data — like a number, a word, or a true/false answer — and refer to it later in your code.",
      },
      {
        type: "paragraph",
        text: "In JavaScript, you declare variables using let (for values that change) or const (for values that stay fixed).",
      },
      {
        type: "code",
        language: "javascript",
        code: `const name = "Alex";       // string\nlet age = 25;              // number\nlet isLearning = true;     // boolean\n\nconsole.log(name);         // Alex\nconsole.log(age + 1);      // 26`,
      },
      {
        type: "output",
        label: "Output",
        content: "Alex\n26",
      },
      {
        type: "tip",
        text: "Prefer const by default. Only use let when you know the value will be reassigned later. Avoid var — it has confusing scoping rules.",
      },
    ],
  },
  {
    slug: "js-functions",
    title: "Functions",
    description:
      "Learn how to group reusable logic into functions in JavaScript.",
    section: "JavaScript",
    readTime: "7 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "paragraph",
        text: "A function is a reusable block of code that performs a specific task. You define a function once and can call it as many times as you need.",
      },
      {
        type: "code",
        language: "javascript",
        code: `function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("Alex"));\nconsole.log(greet("Sam"));`,
      },
      {
        type: "output",
        label: "Output",
        content: "Hello, Alex!\nHello, Sam!",
      },
      {
        type: "tip",
        text: "Arrow functions are a shorter way to write functions: const greet = (name) => 'Hello, ' + name + '!';",
      },
    ],
  },
  {
    slug: "js-dom",
    title: "DOM Manipulation",
    description:
      "Learn how JavaScript interacts with HTML to make pages dynamic.",
    section: "JavaScript",
    readTime: "8 min read",
    difficulty: "Beginner",
    content: [
      {
        type: "paragraph",
        text: "The DOM (Document Object Model) is a representation of your HTML page as a tree of objects. JavaScript can read and modify this tree to change what users see on screen.",
      },
      {
        type: "code",
        language: "javascript",
        code: `// Select an element\nconst title = document.getElementById("title");\n\n// Change its text\ntitle.textContent = "Updated Title";\n\n// Change its style\ntitle.style.color = "#6367ff";`,
      },
      {
        type: "tip",
        text: "querySelector is more flexible than getElementById — it accepts any CSS selector: document.querySelector('.card') or document.querySelector('h1').",
      },
    ],
  },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getPrevLesson(slug: string): Lesson | undefined {
  const index = lessons.findIndex((l) => l.slug === slug);
  return index > 0 ? lessons[index - 1] : undefined;
}

export function getNextLesson(slug: string): Lesson | undefined {
  const index = lessons.findIndex((l) => l.slug === slug);
  return index >= 0 && index < lessons.length - 1
    ? lessons[index + 1]
    : undefined;
}
