/**
 * Inspiration-content contract: domain constants, the InspirationItem DTO, and
 * a single Zod schema that both the API (request validation) and the web app
 * (form validation) use.
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Domain constants
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  "Geloof",
  "Hoop",
  "Liefde",
  "Gebed",
  "Bemoediging",
  "Gemeenschap",
] as const;
export type Category = (typeof CATEGORIES)[number];

/**
 * Single source of truth for the content types. `ContentType` is derived from
 * this list (see below), so adding or removing an entry here automatically
 * updates the union and every place that maps over it (admin form, public
 * filter). Each entry carries both a singular and a plural Dutch label.
 */
export const CONTENT_TYPES = [
  { id: "quote", singular: "Quote", plural: "Quotes" },
  { id: "article", singular: "Artikel", plural: "Artikelen" },
  { id: "photo", singular: "Foto", plural: "Foto's" },
] as const;

/**
 * Photo aspect ratios with their Dutch labels. Single source of truth: the
 * `id` powers the Zod enum (see `photoInputSchema`) and the `label` is shown in
 * the admin form, so they can never drift apart.
 */
export const PHOTO_RATIOS = [
  { id: "4/3", label: "Liggend (4:3)" },
  { id: "16/9", label: "Breed (16:9)" },
  { id: "1/1", label: "Vierkant (1:1)" },
  { id: "4/5", label: "Staand (4:5)" },
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number]["id"];
export type ContentStatus = "published" | "draft";
export type PhotoRatio = (typeof PHOTO_RATIOS)[number]["id"];

/** Ratio ids only, for the Zod enum (labels live on PHOTO_RATIOS). */
const PHOTO_RATIO_IDS = PHOTO_RATIOS.map((ratio) => ratio.id) as [PhotoRatio, ...PhotoRatio[]];

// ---------------------------------------------------------------------------
// DTO
// ---------------------------------------------------------------------------

/** A piece of inspiring content, as returned by the API. */
export interface InspirationItem {
  id: string;
  type: ContentType;
  status: ContentStatus;
  category: string;
  title: string;
  author: string;
  date: string; // ISO date (publication date)
  // type-specific
  quote: string | null;
  excerpt: string | null;
  body: string | null;
  readingTime: number | null;
  caption: string | null;
  ratio: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Validation (single source of truth, shared by API + web forms)
// ---------------------------------------------------------------------------

const base = {
  category: z.enum(CATEGORIES),
  author: z.string().trim().min(1, "Auteur is verplicht"),
  status: z.enum(["published", "draft"]),
};

/** Optional image URL: a valid https URL or an empty string (= no image). */
const optionalImageUrl = z
  .union([
    z
      .string()
      .trim()
      .url("Voer een geldige afbeeldings-URL in")
      .startsWith("https://", "Gebruik een https-URL"),
    z.literal(""),
  ])
  .optional();

export const quoteInputSchema = z.object({
  type: z.literal("quote"),
  title: z.string().trim().default(""),
  quote: z.string().trim().min(1, "Quote is verplicht"),
  ...base,
});

export const articleInputSchema = z.object({
  type: z.literal("article"),
  title: z.string().trim().min(1, "Titel is verplicht"),
  excerpt: z.string().trim().default(""),
  body: z.string().trim().min(1, "Tekst is verplicht"),
  readingTime: z.coerce.number().int().min(1).max(60).default(3),
  imageUrl: optionalImageUrl,
  ...base,
});

export const photoInputSchema = z.object({
  type: z.literal("photo"),
  title: z.string().trim().min(1, "Titel is verplicht"),
  caption: z.string().trim().min(1, "Bijschrift is verplicht"),
  ratio: z.enum(PHOTO_RATIO_IDS).default("4/3"),
  imageUrl: optionalImageUrl,
  ...base,
});

/** Full create/update payload — discriminated by `type`. */
export const contentInputSchema = z.discriminatedUnion("type", [
  quoteInputSchema,
  articleInputSchema,
  photoInputSchema,
]);

export type ContentInput = z.infer<typeof contentInputSchema>;
