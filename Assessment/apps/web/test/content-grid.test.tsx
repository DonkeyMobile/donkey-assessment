import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { InspirationItem } from "@donkey/shared";
import { ContentGrid } from "@/features/view-store";

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

describe("ContentGrid", () => {
  it("renders a quote card", () => {
    render(<ContentGrid items={[item({ quote: "Hoop doet leven" })]} onOpen={vi.fn()} />);
    expect(screen.getByText("Hoop doet leven")).toBeInTheDocument();
  });

  it("renders an article card with its title", () => {
    render(
      <ContentGrid
        items={[
          item({
            id: "2",
            type: "article",
            title: "Twijfel hoort er niet bij",
            quote: null,
            excerpt: "x",
          }),
        ]}
        onOpen={vi.fn()}
      />
    );
    expect(screen.getByText("Twijfel hoort er niet bij")).toBeInTheDocument();
  });

  it("shows an empty state when there are no items", () => {
    render(<ContentGrid items={[]} onOpen={vi.fn()} />);
    expect(screen.getByText("Niets gevonden")).toBeInTheDocument();
  });
});
