# Current Feature

<!-- Feature Name -->

# Dashboard Collections (DB)

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Create `src/lib/db/collections.ts` with data fetching functions
- Fetch collections directly in the server component (no mock data)
- Collection card border color derived from the most-used content type in that collection
- Show small icons of all item types present in that collection
- Keep the current design (reference: @context/screenshots/dashboard-ui-main.png)
- Update collection stats display to use real data

## Notes

<!-- Any extra notes -->

- Do not add items underneath collections yet — that comes later
- Replace mock data from `@src/lib/mock-data.ts` with real Neon DB data via Prisma
- Fetch data in server component directly (not via API route or Server Action)

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
