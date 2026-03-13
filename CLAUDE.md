# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

No test framework is configured yet.

## Architecture

This is a **Next.js 16** app using the **App Router** with **React 19**, **TypeScript**, and **Tailwind CSS v4**.

- `app/layout.tsx` — Root layout; sets Geist Sans/Mono fonts via CSS variables and wraps all pages
- `app/page.tsx` — Homepage (currently a placeholder landing page for "Codecraft: Learn Coding Without Feeling Overwhelmed")
- `app/globals.css` — Global styles; Tailwind CSS is imported here
- `next.config.ts` — Next.js config (currently empty)
- `eslint.config.mjs` — ESLint flat config using `eslint-config-next` (core-web-vitals + typescript rules)

New routes go under `app/` following Next.js App Router conventions (folders become routes, `page.tsx` is the route component, `layout.tsx` wraps child routes).
