# Current Feature

<!-- Feature Name -->

# Seed Data

## Status

<!-- Not Started|Completed|Completed -->

Not Started

## Goals

<!-- Goals & requirements -->

- Create `prisma/seed.ts` (replaces any existing seed scripts in `scripts/`)
- Create a demo user: email `demo@devstash.io`, name `Demo User`, password `12345678` hashed with bcryptjs (12 rounds), `isPro: false`, `emailVerified: now`
- Upsert all 7 system ItemTypes with correct colors (see Notes)
- Create 5 collections with items:
  - **React Patterns** — 3 TypeScript snippets (useDebounce, useLocalStorage, Context provider pattern)
  - **AI Workflows** — 3 prompts (code review, documentation generation, refactoring assistance)
  - **DevOps** — 1 snippet (Docker/CI), 1 command (deployment), 2 links (real URLs)
  - **Terminal Commands** — 4 commands (git, docker, process management, package manager)
  - **Design Resources** — 4 links (real URLs: Tailwind, component libraries, design systems, icon libraries)
- Wire up `prisma.seed` in `package.json` so `npx prisma db seed` works
- Script must be idempotent (safe to re-run)

## Notes

<!-- Any extra notes -->

- Use `bcryptjs` for password hashing (not `bcrypt` — no native bindings needed)
- System ItemType colors:

| Name    | Icon       | Color   |
| ------- | ---------- | ------- |
| Snippet | Code       | #3b82f6 |
| Prompt  | Sparkles   | #8b5cf6 |
| Command | Terminal   | #f97316 |
| Note    | StickyNote | #fde047 |
| File    | File       | #6b7280 |
| Image   | Image      | #ec4899 |
| URL     | Link       | #10b981 |

- Icons are Lucide React component names
- Seed file goes in `prisma/seed.ts`, not `scripts/`
- Use `upsert` on stable unique fields (email for user, id for item types) to keep it idempotent

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Initial Next.js and Tailwind CSS setup
- Dashboard UI Phase 1
  - Goals: ShadCN UI init, ShadCN component installation, dashboard route at /dashboard, main dashboard layout and global styles, dark mode by default, top bar with DS logo + search + buttons (display only), sidebar/main area placeholders
  - Notes: Phase 1 of 3 for the dashboard UI. Reference: @context/screenshots/dashboard-ui-main.png
- Dashboard UI Phase 2
  - Goals: Collapsible sidebar, types with links to /items/TYPE, favorite collections, all collections, user avatar at bottom, drawer icon to toggle sidebar, mobile Sheet drawer, collapsible Favorites and All Collections sections
  - Notes: Phase 2 of 3. Mock data from @src/lib/mock-data.ts. Reference: @context/screenshots/dashboard-ui-main.png
- Dashboard UI Phase 3
  - Goals: Collections grid with colored left borders and ... menu, Pinned items section, Recent items section, SSR main content with client shell pattern
  - Notes: Phase 3 of 3. Mock data from @src/lib/mock-data.ts. Reference: @context/screenshots/dashboard-ui-main.png
- Neon PostgreSQL + Prisma 7 Setup
  - Goals: Install Prisma 7, Neon PostgreSQL, full schema with all models + NextAuth models, indexes, cascade deletes, initial migration, Prisma client singleton with Neon adapter
  - Notes: Prisma 7 breaking changes — url removed from schema.prisma (moved to prisma.config.ts), generator uses prisma-client with explicit output, @prisma/client still required separately, runtime needs PrismaNeon adapter + ws for Node.js
- Seed Data
  - Goals: Demo user (demo@devstash.io, bcrypt password), 7 system ItemTypes with colors, 5 collections with 18 items (React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources)
  - Notes: Prisma 7 seed configured in prisma.config.ts under migrations.seed (not package.json). Run with `npx prisma db seed`. Script is idempotent via upsert.
