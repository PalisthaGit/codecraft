# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

---

# Commands

npm run dev
Start development server at http://localhost:3000

npm run build
Build for production

npm run start
Run production build

npm run lint
Run ESLint

---

# Architecture

This project is a **Next.js app using the App Router** with **React, TypeScript, and Tailwind CSS**.

Project structure:

app/layout.tsx
Root layout that wraps all pages.

app/page.tsx
Homepage of the CodingBanana platform.

app/globals.css
Global styles. Tailwind CSS is imported here.

next.config.ts
Next.js configuration.

eslint.config.mjs
ESLint configuration.

New routes follow **Next.js App Router conventions**.

Example:

app/tutorial/[slug]/page.tsx

Folders inside `app` become routes automatically.

---

# Product Overview

Product Name
CodingBanana

Tagline
Learn Coding Without Feeling Overwhelmed

CodingBanana is a beginner-friendly coding tutorial platform designed to teach programming through clear step-by-step lessons with real code examples and outputs.

Many learning platforms move too fast or skip explanations.
CodingBanana focuses on **clarity, structured progression, and practical examples** so concepts actually stick.

---

# Target Users

People learning to code who struggle with:

• tutorials that move too fast
• missing explanations between steps
• lack of clear learning progression

The platform should feel **calm, structured, and beginner-friendly**.

---

# Core Features

Must Have

• Lesson/article pages for coding tutorials
• Clean code blocks and inline code formatting
• Output examples showing what code produces
• Sidebar navigation for lesson structure
• Previous / Next lesson navigation

Nice to Have

• Embedded code runner (similar to CodePen)
• CMS system for uploading tutorials

---

# Design Philosophy

Learning to code can feel overwhelming.

The CodingBanana interface should therefore be:

• calm
• structured
• distraction-free
• focused on readability

UI should prioritize **clarity over visual complexity**.

---

# Typography

Primary font: Nunito (Google Fonts)

Nunito is used because it is readable and approachable for beginners.

Typography hierarchy:

Lesson Title
Large and bold

Section Heading
Medium size and semi-bold

Body Text
Comfortable reading size

Code Text
Monospace font

---

# Color System

Primary color
#6367FF
Used for primary buttons, active navigation, and progression through lessons.

Secondary color
#8494FF
Used for hover states and secondary UI elements.

Soft background
#C9BEFF
Used for highlighted explanation sections.

Accent
#FFDBFD
Used for tips or guidance blocks.

Main background
#F8FAFC

Content surface
#FFFFFF

Primary text
#0F172A

Secondary text
#64748B

Code block background
#1E293B

Code text
#E2E8F0

---

# UI Layout Rules

The platform uses a documentation-style layout.

Desktop layout:

[ Sidebar ] [ Tutorial Content ]

Mobile layout:

[ Header with hamburger menu ]
[ Tutorial Content ]

Sidebar contains lesson navigation.

Tutorial content includes:

• lesson title
• explanation paragraphs
• code examples
• output previews
• previous / next navigation

---

# Card Style

Lesson content appears inside card surfaces.

background: #FFFFFF
border: 1px solid #E5E7EB
border-radius: 12px
padding: 24px
box-shadow: 0 4px 12px rgba(0,0,0,0.05)

Cards are used for:

• lesson content
• code examples
• output demonstrations
• learning tips

---

# Code Block Style

Code blocks must clearly stand apart from lesson text.

background: #1E293B
color: #E2E8F0
border-radius: 10px
padding: 16px
font-family: monospace
overflow-x: auto

Purpose:

• separates explanation from code
• improves readability

---

# Buttons

Primary buttons:

background: #6367FF
color: white
border-radius: 10px
padding: 10px 18px
font-weight: 600

Hover state:

background: #8494FF

Buttons are mainly used for:

• next lesson
• start learning
• tutorial navigation

---

# Responsive Rules

Mobile-first design.

Breakpoints:

Mobile → 375px
Tablet → 768px
Desktop → 1280px

Mobile layout

• vertical layout
• sidebar hidden
• hamburger menu opens navigation

Tablet and desktop layout

[ sidebar ] [ tutorial content ]

---

# Tech Stack

Framework
Next.js (App Router)

Language
TypeScript (strict mode)

Styling
Tailwind CSS

Font
Nunito from Google Fonts

State management
React hooks

Routing
Next.js App Router

Tailwind design tokens:

brand.primary #6367FF
brand.secondary #8494FF
brand.soft #C9BEFF
brand.accent #FFDBFD

background #F8FAFC
surface #FFFFFF

text.primary #0F172A
text.secondary #64748B

code.background #1E293B
code.text #E2E8F0
