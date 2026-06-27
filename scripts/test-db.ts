import * as dotenv from "dotenv";
dotenv.config();

import ws from "ws";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Required for Neon serverless driver in Node.js (not needed on edge/browser)
neonConfig.webSocketConstructor = ws;

async function main() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("Testing database connection...");

    await prisma.$connect();
    console.log("✓ Connected to Neon PostgreSQL");

    const userCount = await prisma.user.count();
    console.log(`✓ User table accessible — ${userCount} rows`);

    const itemTypeCount = await prisma.itemType.count();
    console.log(`✓ ItemType table accessible — ${itemTypeCount} rows`);

    console.log("\nAll checks passed. Database is set up correctly.");
  } catch (error) {
    console.error("✗ Database check failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
