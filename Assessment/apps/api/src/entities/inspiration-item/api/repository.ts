import type { PrismaClient } from "@prisma/client";
import type { ContentInput } from "@donkey/shared";
import type { InspirationItemRow } from "../model/serialize.js";
import { SEED } from "../model/seed-data.js";

/** Data-access contract for inspiration items (framework-agnostic). */
export interface InspirationItemRepository {
  listPublished(): Promise<InspirationItemRow[]>;
  listAll(): Promise<InspirationItemRow[]>;
  getById(id: string): Promise<InspirationItemRow | null>;
  getPublishedById(id: string): Promise<InspirationItemRow | null>;
  create(data: ContentInput): Promise<InspirationItemRow>;
  update(id: string, data: ContentInput): Promise<InspirationItemRow>;
  remove(id: string): Promise<void>;
  reset(): Promise<void>;
}

/** Flatten a discriminated-union input into a flat persistence payload. */
export function toPersistencePayload(input: ContentInput) {
  return {
    type: input.type,
    status: input.status,
    category: input.category,
    title: input.title ?? "",
    author: input.author,
    quote: input.type === "quote" ? input.quote : null,
    excerpt: input.type === "article" ? input.excerpt : null,
    body: input.type === "article" ? input.body : null,
    readingTime: input.type === "article" ? input.readingTime : null,
    caption: input.type === "photo" ? input.caption : null,
    ratio: input.type === "photo" ? input.ratio : null,
    imageUrl: input.type === "article" || input.type === "photo" ? input.imageUrl || null : null,
  };
}

export function createPrismaInspirationItemRepository(
  prisma: Pick<PrismaClient, "inspirationItem">
): InspirationItemRepository {
  const orderBy = { date: "desc" as const };
  return {
    listPublished: () =>
      prisma.inspirationItem.findMany({ where: { status: "published" }, orderBy }),
    listAll: () => prisma.inspirationItem.findMany({ orderBy }),
    getById: (id) => prisma.inspirationItem.findUnique({ where: { id } }),
    getPublishedById: (id) =>
      prisma.inspirationItem.findFirst({ where: { id, status: "published" } }),
    create: (data) => prisma.inspirationItem.create({ data: toPersistencePayload(data) }),
    update: (id, data) =>
      prisma.inspirationItem.update({ where: { id }, data: toPersistencePayload(data) }),
    remove: async (id) => {
      await prisma.inspirationItem.delete({ where: { id } });
    },
    reset: async () => {
      await prisma.inspirationItem.deleteMany({});
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
    },
  };
}
