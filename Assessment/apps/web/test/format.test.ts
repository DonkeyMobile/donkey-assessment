import { describe, expect, it } from "vitest";
import { formatDate } from "@/entities/inspiration-item";

describe("formatDate", () => {
  it("formats an ISO date as a Dutch long date", () => {
    // Noon UTC so the rendered day is stable across test-runner timezones.
    expect(formatDate("2026-05-28T12:00:00.000Z")).toBe("28 mei 2026");
  });

  it("returns the original input for an unparseable date", () => {
    expect(formatDate("not-a-date")).toBe("Invalid Date");
  });
});
