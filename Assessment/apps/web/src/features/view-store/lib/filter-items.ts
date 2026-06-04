import type { ContentType, InspirationItem } from "@donkey/shared";

/**
 * Filter inspiration items by content type and category. A `null` value for a
 * dimension means "no filter" on that dimension. Pure function — easy to unit
 * test in isolation from the widget that renders the results.
 */
export function filterItems(
  items: InspirationItem[],
  contentType: ContentType | null,
  category: string | null
): InspirationItem[] {
  return items.filter(
    (item) =>
      (!contentType || item.type === contentType) && (!category || item.category === category)
  );
}
