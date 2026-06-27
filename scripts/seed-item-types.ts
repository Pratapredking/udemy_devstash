import * as dotenv from "dotenv";
dotenv.config();

import ws from "ws";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { mockItemTypes } from "../src/lib/mock-data";

neonConfig.webSocketConstructor = ws;

async function main() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("Seeding ItemType table...\n");

    for (const itemType of mockItemTypes) {
      const result = await prisma.itemType.upsert({
        where: { id: itemType.id },
        update: {
          name: itemType.name,
          icon: itemType.icon,
          isSystem: itemType.isSystem,
        },
        create: {
          id: itemType.id,
          name: itemType.name,
          icon: itemType.icon,
          isSystem: itemType.isSystem,
          userId: null,
        },
      });
      console.log(`✓ ${result.name} (${result.id})`);
    }

    const total = await prisma.itemType.count({ where: { isSystem: true } });
    console.log(`\nDone — ${total} system item types in database.`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
