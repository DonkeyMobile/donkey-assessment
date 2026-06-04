import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import { SEED } from "../src/entities/inspiration-item/model/seed-data.js";

// Seeding only needs the database connection - keep it decoupled from the app's full env (auth/Keycloak).
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Missing required environment variable: DATABASE_URL");
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const existing = await prisma.inspirationItem.count();
  if (existing > 0) {
    // eslint-disable-next-line no-console
    console.log(`Seed skipped: ${existing} item(s) already present.`);
    return;
  }
  await prisma.inspirationItem.createMany({
    data: SEED.map((seedItem) => ({
      type: seedItem.type,
      status: seedItem.status,
      category: seedItem.category,
      title: seedItem.title,
      author: seedItem.author,
      date: new Date(seedItem.date),
      quote: seedItem.quote ?? null,
      excerpt: seedItem.excerpt ?? null,
      body: seedItem.body ?? null,
      readingTime: seedItem.readingTime ?? null,
      caption: seedItem.caption ?? null,
      ratio: seedItem.ratio ?? null,
      imageUrl: seedItem.imageUrl ?? null,
    })),
  });
  // eslint-disable-next-line no-console
  console.log(`Seeded ${SEED.length} inspiration items.`);
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
