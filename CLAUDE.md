# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `globals.css` (no `tailwind.config.*` file; v4 uses CSS-first config)
- **Geist** fonts (sans + mono) loaded via `next/font/google`, exposed as CSS variables `--font-geist-sans` and `--font-geist-mono` on `<html>`

## Structure

All source lives under `src/app/` using the App Router:

- `layout.tsx` — root layout; sets font variables and global CSS
- `page.tsx` — home route (`/`)
- `globals.css` — global styles entry point
