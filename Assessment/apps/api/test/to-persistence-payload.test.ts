import { describe, expect, it } from "vitest";
import type { ContentInput } from "@donkey/shared";
import { toPersistencePayload } from "../src/entities/inspiration-item/index.js";

const base = { author: "Donkey", category: "Hoop", status: "published" } as const;

describe("toPersistencePayload", () => {
  it("maps a quote and nulls every non-quote field", () => {
    const input: ContentInput = { type: "quote", title: "", quote: "Hoop doet leven", ...base };

    expect(toPersistencePayload(input)).toEqual({
      type: "quote",
      status: "published",
      category: "Hoop",
      title: "",
      author: "Donkey",
      quote: "Hoop doet leven",
      excerpt: null,
      body: null,
      readingTime: null,
      caption: null,
      ratio: null,
      imageUrl: null,
    });
  });

  it("maps an article and keeps article-only fields", () => {
    const input: ContentInput = {
      type: "article",
      title: "Titel",
      excerpt: "Kort",
      body: "Tekst",
      readingTime: 5,
      imageUrl: "https://example.com/a.jpg",
      ...base,
    };

    expect(toPersistencePayload(input)).toMatchObject({
      type: "article",
      excerpt: "Kort",
      body: "Tekst",
      readingTime: 5,
      imageUrl: "https://example.com/a.jpg",
      quote: null,
      caption: null,
      ratio: null,
    });
  });

  it("maps a photo and keeps photo-only fields", () => {
    const input: ContentInput = {
      type: "photo",
      title: "Titel",
      caption: "Bijschrift",
      ratio: "16/9",
      imageUrl: "https://example.com/p.jpg",
      ...base,
    };

    expect(toPersistencePayload(input)).toMatchObject({
      type: "photo",
      caption: "Bijschrift",
      ratio: "16/9",
      imageUrl: "https://example.com/p.jpg",
      quote: null,
      excerpt: null,
      body: null,
      readingTime: null,
    });
  });

  it("coerces an empty image URL to null", () => {
    const input: ContentInput = {
      type: "photo",
      title: "Titel",
      caption: "Bijschrift",
      ratio: "1/1",
      imageUrl: "",
      ...base,
    };

    expect(toPersistencePayload(input).imageUrl).toBeNull();
  });
});
