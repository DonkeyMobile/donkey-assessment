import { describe, expect, it } from "vitest";
import type { InspirationItem } from "@donkey/shared";
import { filterItems } from "@/features/view-store";

function item(overrides: Partial<InspirationItem>): InspirationItem {
  return {
    id: "1",
    type: "quote",
    status: "published",
    category: "Hoop",
    title: "",
    author: "Donkey Inspire",
    date: "2026-05-28T00:00:00.000Z",
    quote: "Hoop doet leven",
    excerpt: null,
    body: null,
    readingTime: null,
    caption: null,
    ratio: null,
    imageUrl: null,
    createdAt: "2026-05-28T00:00:00.000Z",
    updatedAt: "2026-05-28T00:00:00.000Z",
    ...overrides,
  };
}

const items = [
  item({ id: "q1", type: "quote", category: "Hoop" }),
  item({ id: "a1", type: "article", category: "Geloof" }),
  item({ id: "p1", type: "photo", category: "Hoop" }),
];

describe("filterItems", () => {
  it("returns everything when both filters are null", () => {
    expect(filterItems(items, null, null)).toHaveLength(3);
  });

  it("filters by content type", () => {
    const result = filterItems(items, "article", null);
    expect(result.map((i) => i.id)).toEqual(["a1"]);
  });

  it("filters by category", () => {
    const result = filterItems(items, null, "Hoop");
    expect(result.map((i) => i.id)).toEqual(["q1", "p1"]);
  });

  it("combines type and category (AND)", () => {
    const result = filterItems(items, "photo", "Hoop");
    expect(result.map((i) => i.id)).toEqual(["p1"]);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterItems(items, "article", "Hoop")).toEqual([]);
  });

  it("does not mutate the input array", () => {
    const original = [...items];
    filterItems(items, "quote", null);
    expect(items).toEqual(original);
  });
});
