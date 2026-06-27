# Current Feature

<!-- Feature Name -->

# Neon PostgreSQL + Prisma Setup

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

- Install and configure Prisma 7 (note: breaking changes from v6 — follow upgrade guide)
- Set up Neon PostgreSQL as the database provider (serverless)
- Create initial Prisma schema based on data models in `@context/project-overview.md`
  - User, Item, ItemType, Collection, Tag, ItemTag
  - NextAuth models: Account, Session, VerificationToken
- Add appropriate indexes and cascade deletes
- Create initial migration (always use `prisma migrate dev`, never `db push`)
- Configure `DATABASE_URL` in `.env` pointing to the Neon dev branch

## Notes

<!-- Any extra notes -->

- Use Prisma 7 — has breaking changes. Reference: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Neon quickstart: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- `DATABASE_URL` = Neon dev branch; production branch will be separate
- Always create migrations (`prisma migrate dev`), never use `db push` unless explicitly told

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
