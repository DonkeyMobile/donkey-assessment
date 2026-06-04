import { describe, expect, it } from "vitest";
import { serializeInspirationItem } from "../src/entities/inspiration-item/index.js";

describe("serializeInspirationItem", () => {
  it("maps a quote row to the DTO with ISO date strings", () => {
    const date = new Date("2024-01-01T00:00:00.000Z");
    expect(
      serializeInspirationItem({
        id: "1",
        type: "quote",
        status: "published",
        category: "Hoop",
        title: "",
        author: "Donkey Inspire",
        date,
        quote: "Een korte tekst",
        excerpt: null,
        body: null,
        readingTime: null,
        caption: null,
        ratio: null,
        imageUrl: null,
        createdAt: date,
        updatedAt: date,
      })
    ).toEqual({
      id: "1",
      type: "quote",
      status: "published",
      category: "Hoop",
      title: "",
      author: "Donkey Inspire",
      date: "2024-01-01T00:00:00.000Z",
      quote: "Een korte tekst",
      excerpt: null,
      body: null,
      readingTime: null,
      caption: null,
      ratio: null,
      imageUrl: null,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    });
  });
});
