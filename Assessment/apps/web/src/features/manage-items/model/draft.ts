import { type ContentStatus, type ContentType, type InspirationItem } from "@donkey/shared";

/** Local, fully-populated form state (covers every content type). */
export interface DraftItem {
  id: string | null;
  type: ContentType;
  status: ContentStatus;
  category: string;
  author: string;
  title: string;
  quote: string;
  excerpt: string;
  body: string;
  readingTime: number;
  caption: string;
  ratio: string;
  imageUrl: string;
}

const DEFAULT_AUTHOR: Record<ContentType, string> = {
  quote: "Donkey Inspire",
  article: "Redactie",
  photo: "Beeldarchief",
};

export function emptyItem(type: ContentType): DraftItem {
  return {
    id: null,
    type,
    status: "published",
    category: "Geloof",
    author: DEFAULT_AUTHOR[type],
    title: "",
    quote: "",
    excerpt: "",
    body: "",
    readingTime: 3,
    caption: "",
    ratio: "4/3",
    imageUrl: "",
  };
}

export function fromItem(item: InspirationItem): DraftItem {
  return {
    id: item.id,
    type: item.type,
    status: item.status,
    category: item.category,
    author: item.author,
    title: item.title,
    quote: item.quote ?? "",
    excerpt: item.excerpt ?? "",
    body: item.body ?? "",
    readingTime: item.readingTime ?? 3,
    caption: item.caption ?? "",
    ratio: item.ratio ?? "4/3",
    imageUrl: item.imageUrl ?? "",
  };
}
