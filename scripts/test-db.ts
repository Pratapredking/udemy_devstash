import * as dotenv from "dotenv";
dotenv.config();

import ws from "ws";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

neonConfig.webSocketConstructor = ws;

async function main() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("=== DevStash DB Verification ===\n");

    // ── User ────────────────────────────────────────────────────────────────
    const user = await prisma.user.findUnique({
      where: { email: "demo@devstash.io" },
    });
    if (!user) throw new Error("Demo user not found");
    console.log(`✓ User:       ${user.name} <${user.email}>`);
    console.log(`  isPro:      ${user.isPro}`);
    console.log(`  verified:   ${user.emailVerified?.toISOString().slice(0, 10)}`);
    console.log(`  password:   ${user.password ? "[hashed]" : "MISSING"}`);

    // ── Item Types ───────────────────────────────────────────────────────────
    const itemTypes = await prisma.itemType.findMany({
      where: { isSystem: true },
      orderBy: { name: "asc" },
    });
    console.log(`\n✓ System item types (${itemTypes.length}):`);
    for (const t of itemTypes) {
      console.log(`  [${t.id}]  ${t.name.padEnd(8)} icon=${t.icon?.padEnd(12)} color=${t.color}`);
    }

    // ── Collections + item counts ────────────────────────────────────────────
    const collections = await prisma.collection.findMany({
      where: { userId: user.id },
      include: { _count: { select: { items: true } } },
      orderBy: { name: "asc" },
    });
    console.log(`\n✓ Collections (${collections.length}):`);
    for (const c of collections) {
      console.log(`  ${c.name.padEnd(22)} ${c._count.items} items`);
    }

    // ── Items breakdown by type ──────────────────────────────────────────────
    const items = await prisma.item.findMany({
      where: { userId: user.id },
      include: { type: true, collection: true },
      orderBy: [{ collection: { name: "asc" } }, { title: "asc" }],
    });
    console.log(`\n✓ Items (${items.length} total):`);
    let lastCollection = "";
    for (const item of items) {
      const col = item.collection?.name ?? "(none)";
      if (col !== lastCollection) {
        console.log(`\n  ${col}`);
        lastCollection = col;
      }
      const lang = item.language ? ` [${item.language}]` : "";
      const url  = item.url ? ` → ${item.url}` : "";
      console.log(`    · ${item.type.name.padEnd(8)} ${item.title}${lang}${url}`);
    }

    // ── Summary ──────────────────────────────────────────────────────────────
    console.log("\n=== All checks passed ===");
  } catch (error) {
    console.error("\n✗ Verification failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
