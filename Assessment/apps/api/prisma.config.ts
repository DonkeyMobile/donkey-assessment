import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Read lazily without throwing: `prisma generate` runs at Docker build time
    // when no DATABASE_URL is set. Commands that touch the database (migrate,
    // seed) run in environments where it is present.
    url: process.env.DATABASE_URL ?? "",
  },
});
