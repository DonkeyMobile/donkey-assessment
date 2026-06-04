import type { InspirationItem } from "@donkey/shared";
import { ContentCard } from "@/entities/inspiration-item";
import { Icon } from "@/shared/ui";

export function ContentGrid({
  items,
  onOpen,
}: {
  items: InspirationItem[];
  onOpen: (item: InspirationItem) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-ink/[0.05] text-faint mb-4">
          <Icon.search size={22} />
        </div>
        <p className="font-serif text-xl text-ink">Niets gevonden</p>
        <p className="text-sm text-faint mt-1">Probeer een andere categorie of type.</p>
      </div>
    );
  }
  return (
    <div role="list" className="masonry">
      {items.map((it) => (
        <div role="listitem" key={it.id} className="animate-rise">
          <ContentCard item={it} onOpen={onOpen} />
        </div>
      ))}
    </div>
  );
}
