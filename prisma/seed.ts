import * as dotenv from "dotenv";
dotenv.config();

import ws from "ws";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ─── Item Types ───────────────────────────────────────────────────────────────

const ITEM_TYPES = [
  { id: "type_snippet", name: "Snippet", icon: "Code",       color: "#3b82f6", isSystem: true },
  { id: "type_prompt",  name: "Prompt",  icon: "Sparkles",   color: "#8b5cf6", isSystem: true },
  { id: "type_command", name: "Command", icon: "Terminal",    color: "#f97316", isSystem: true },
  { id: "type_note",    name: "Note",    icon: "StickyNote",  color: "#fde047", isSystem: true },
  { id: "type_file",    name: "File",    icon: "File",        color: "#6b7280", isSystem: true },
  { id: "type_image",   name: "Image",   icon: "Image",       color: "#ec4899", isSystem: true },
  { id: "type_url",     name: "URL",     icon: "Link",        color: "#10b981", isSystem: true },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Seeding database...\n");

  // 1. Demo user
  const passwordHash = await bcrypt.hash("12345678", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: {
      email: "demo@devstash.io",
      name: "Demo User",
      password: passwordHash,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`✓ User: ${user.email}`);

  // 2. System item types
  for (const t of ITEM_TYPES) {
    await prisma.itemType.upsert({
      where: { id: t.id },
      update: { name: t.name, icon: t.icon, color: t.color },
      create: { ...t, userId: null },
    });
  }
  console.log(`✓ Item types: ${ITEM_TYPES.map((t) => t.name).join(", ")}`);

  // 3. Collections + items
  // ── React Patterns ──────────────────────────────────────────────────────────
  const reactPatterns = await prisma.collection.upsert({
    where: { id: "col_react_patterns" },
    update: {},
    create: {
      id: "col_react_patterns",
      name: "React Patterns",
      description: "Reusable React patterns and hooks",
      userId: user.id,
    },
  });

  const reactItems = [
    {
      id: "item_use_debounce",
      title: "useDebounce Hook",
      description: "Debounce any rapidly changing value",
      language: "typescript",
      content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    },
    {
      id: "item_use_local_storage",
      title: "useLocalStorage Hook",
      description: "Sync state with localStorage, SSR-safe",
      language: "typescript",
      content: `import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
    },
    {
      id: "item_context_provider",
      title: "Context Provider Pattern",
      description: "Type-safe context with custom hook guard",
      language: "typescript",
      content: `import { createContext, useContext, useState } from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}`,
    },
  ];

  for (const item of reactItems) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        contentType: "text",
        content: item.content,
        language: item.language,
        userId: user.id,
        typeId: "type_snippet",
        collectionId: reactPatterns.id,
      },
    });
  }
  console.log(`✓ Collection: ${reactPatterns.name} (${reactItems.length} items)`);

  // ── AI Workflows ─────────────────────────────────────────────────────────────
  const aiWorkflows = await prisma.collection.upsert({
    where: { id: "col_ai_workflows" },
    update: {},
    create: {
      id: "col_ai_workflows",
      name: "AI Workflows",
      description: "AI prompts and workflow automations",
      userId: user.id,
    },
  });

  const aiItems = [
    {
      id: "item_code_review_prompt",
      title: "Code Review Prompt",
      description: "Thorough code review with actionable feedback",
      content: `Review the following code and provide structured feedback:

**Check for:**
- Correctness: logic errors, edge cases, off-by-one errors
- Security: injection risks, unvalidated inputs, exposed secrets
- Performance: unnecessary re-renders, N+1 queries, memory leaks
- Readability: naming, complexity, missing abstractions

**Format your response as:**
1. Critical issues (must fix)
2. Suggested improvements (should fix)
3. Minor nits (optional)

\`\`\`
[paste code here]
\`\`\``,
    },
    {
      id: "item_doc_gen_prompt",
      title: "Documentation Generator",
      description: "Generate clear JSDoc/TSDoc from code",
      content: `Generate comprehensive documentation for the following code.

**Requirements:**
- Write JSDoc/TSDoc comments for all exported functions, types, and interfaces
- Include @param, @returns, and @throws tags where applicable
- Add a brief @example showing typical usage
- Keep descriptions concise but complete — no fluff

\`\`\`
[paste code here]
\`\`\``,
    },
    {
      id: "item_refactor_prompt",
      title: "Refactoring Assistant",
      description: "Improve code quality without changing behaviour",
      content: `Refactor the following code to improve quality without changing its external behaviour.

**Goals:**
- Eliminate duplication (DRY)
- Simplify complex conditionals
- Improve naming for clarity
- Apply relevant design patterns if they reduce complexity
- Keep the diff minimal — don't rewrite things that are already clean

Show the refactored code and a short explanation of each change made.

\`\`\`
[paste code here]
\`\`\``,
    },
  ];

  for (const item of aiItems) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        contentType: "text",
        content: item.content,
        language: null,
        userId: user.id,
        typeId: "type_prompt",
        collectionId: aiWorkflows.id,
      },
    });
  }
  console.log(`✓ Collection: ${aiWorkflows.name} (${aiItems.length} items)`);

  // ── DevOps ───────────────────────────────────────────────────────────────────
  const devops = await prisma.collection.upsert({
    where: { id: "col_devops" },
    update: {},
    create: {
      id: "col_devops",
      name: "DevOps",
      description: "Infrastructure and deployment resources",
      userId: user.id,
    },
  });

  const devopsItems = [
    {
      id: "item_dockerfile",
      title: "Next.js Dockerfile",
      description: "Multi-stage Docker build for Next.js with standalone output",
      typeId: "type_snippet",
      language: "dockerfile",
      content: `FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`,
      url: null,
    },
    {
      id: "item_deploy_script",
      title: "Zero-downtime Deploy",
      description: "Pull, build and restart with PM2 on a VPS",
      typeId: "type_command",
      language: "bash",
      content: `git pull origin main && \\
  npm ci --omit=dev && \\
  npx prisma migrate deploy && \\
  npm run build && \\
  pm2 reload ecosystem.config.js --update-env`,
      url: null,
    },
    {
      id: "item_docker_docs",
      title: "Docker Documentation",
      description: "Official Docker docs — reference for Dockerfile instructions",
      typeId: "type_url",
      language: null,
      content: null,
      url: "https://docs.docker.com/reference/dockerfile/",
    },
    {
      id: "item_github_actions_docs",
      title: "GitHub Actions Docs",
      description: "Workflow syntax and reference for CI/CD pipelines",
      typeId: "type_url",
      language: null,
      content: null,
      url: "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions",
    },
  ];

  for (const item of devopsItems) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        contentType: item.url ? "text" : "text",
        content: item.content,
        url: item.url,
        language: item.language,
        userId: user.id,
        typeId: item.typeId,
        collectionId: devops.id,
      },
    });
  }
  console.log(`✓ Collection: ${devops.name} (${devopsItems.length} items)`);

  // ── Terminal Commands ────────────────────────────────────────────────────────
  const terminal = await prisma.collection.upsert({
    where: { id: "col_terminal" },
    update: {},
    create: {
      id: "col_terminal",
      name: "Terminal Commands",
      description: "Useful shell commands for everyday development",
      userId: user.id,
    },
  });

  const terminalItems = [
    {
      id: "item_git_ops",
      title: "Git — Stash & Branch Cleanup",
      description: "Stash work in progress and prune merged branches",
      content: `# Save work in progress with a label
git stash push -m "wip: description"

# List and restore stashes
git stash list
git stash pop

# Delete branches already merged into main
git branch --merged main | grep -v "main" | xargs git branch -d

# Prune remote-tracking refs that no longer exist
git fetch --prune`,
    },
    {
      id: "item_docker_ops",
      title: "Docker — Cleanup Commands",
      description: "Remove stopped containers, dangling images and unused volumes",
      content: `# Remove all stopped containers
docker container prune -f

# Remove dangling images
docker image prune -f

# Full system cleanup (containers, networks, images, build cache)
docker system prune -af

# Remove unused volumes (careful — data loss)
docker volume prune -f`,
    },
    {
      id: "item_process_mgmt",
      title: "Process Management",
      description: "Find and kill processes by port or name",
      content: `# Find process using a port (macOS/Linux)
lsof -i :3000

# Kill process on a port
kill -9 $(lsof -t -i :3000)

# Windows equivalent
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# List all Node processes
ps aux | grep node`,
    },
    {
      id: "item_pkg_manager",
      title: "Package Manager Utilities",
      description: "Useful npm / pnpm commands for managing dependencies",
      content: `# Check for outdated packages
npm outdated

# Interactively upgrade packages
npx npm-check-updates -i

# Audit and fix vulnerabilities
npm audit fix

# Clear npm cache
npm cache clean --force

# List globally installed packages
npm list -g --depth=0`,
    },
  ];

  for (const item of terminalItems) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        contentType: "text",
        content: item.content,
        language: "bash",
        userId: user.id,
        typeId: "type_command",
        collectionId: terminal.id,
      },
    });
  }
  console.log(`✓ Collection: ${terminal.name} (${terminalItems.length} items)`);

  // ── Design Resources ─────────────────────────────────────────────────────────
  const design = await prisma.collection.upsert({
    where: { id: "col_design" },
    update: {},
    create: {
      id: "col_design",
      name: "Design Resources",
      description: "UI/UX resources and references",
      userId: user.id,
    },
  });

  const designItems = [
    {
      id: "item_tailwind_docs",
      title: "Tailwind CSS Docs",
      description: "Official Tailwind CSS v4 documentation and utility reference",
      url: "https://tailwindcss.com/docs",
    },
    {
      id: "item_shadcn_docs",
      title: "shadcn/ui Components",
      description: "Accessible, copy-paste component library built on Radix UI",
      url: "https://ui.shadcn.com/docs/components",
    },
    {
      id: "item_radix_colors",
      title: "Radix Colors",
      description: "A gorgeous, accessible color system for building products",
      url: "https://www.radix-ui.com/colors",
    },
    {
      id: "item_lucide_icons",
      title: "Lucide Icons",
      description: "Beautiful & consistent open-source icon library used in this project",
      url: "https://lucide.dev/icons/",
    },
  ];

  for (const item of designItems) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        contentType: "text",
        content: null,
        url: item.url,
        language: null,
        userId: user.id,
        typeId: "type_url",
        collectionId: design.id,
      },
    });
  }
  console.log(`✓ Collection: ${design.name} (${designItems.length} items)`);

  console.log("\nSeed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
