import type { ContentStatus, ContentType, InspirationItem } from "@donkey/shared";

/** Raw persistence row shape for an inspiration item. */
export interface InspirationItemRow {
  id: string;
  type: ContentType;
  status: ContentStatus;
  category: string;
  title: string;
  author: string;
  date: Date;
  quote: string | null;
  excerpt: string | null;
  body: string | null;
  readingTime: number | null;
  caption: string | null;
  ratio: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Serialise a persistence row to the shared DTO (dates as ISO strings). */
export function serializeInspirationItem(row: InspirationItemRow): InspirationItem {
  return {
    id: row.id,
    type: row.type,
    status: row.status,
    category: row.category,
    title: row.title,
    author: row.author,
    date: row.date.toISOString(),
    quote: row.quote,
    excerpt: row.excerpt,
    body: row.body,
    readingTime: row.readingTime,
    caption: row.caption,
    ratio: row.ratio,
    imageUrl: row.imageUrl,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
