import { type KeyboardEvent } from "react";
import type { InspirationItem } from "@donkey/shared";
import { Badge, Card, Icon, Media } from "@/shared/ui";
import { formatDate } from "../lib/format";

type OnOpen = (item: InspirationItem) => void;

/** Props that make a card behave as an accessible button (mouse + keyboard). */
function openable(item: InspirationItem, onOpen: OnOpen) {
  return {
    role: "button" as const,
    tabIndex: 0,
    "aria-label": item.title || item.quote || "Open content",
    onClick: () => onOpen(item),
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen(item);
      }
    },
  };
}

function QuoteCard({ item, onOpen }: { item: InspirationItem; onOpen: OnOpen }) {
  return (
    <Card
      {...openable(item, onOpen)}
      className="group p-7 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-lift hover:-translate-y-1 hover-accent-border bg-gradient-to-br from-surface to-[oklch(0.97_0.02_72)]"
    >
      <Icon.quote size={26} className="text-accent mb-4" />
      <p className="font-serif text-[1.45rem] leading-[1.3] text-ink tracking-[-0.005em]">
        {item.quote}
      </p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink-soft">{item.author}</span>
        <Badge tone="accent" className="text-[11px]">
          {item.category}
        </Badge>
      </div>
    </Card>
  );
}

function ArticleCard({ item, onOpen }: { item: InspirationItem; onOpen: OnOpen }) {
  return (
    <Card
      {...openable(item, onOpen)}
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lift hover:-translate-y-1 hover-accent-border"
    >
      <Media src={item.imageUrl} label="artikelfoto" ratio="16/9" rounded="rounded-none" />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge tone="article">Artikel</Badge>
          <span className="text-[12px] text-faint">{item.category}</span>
        </div>
        <h3 className="font-sans font-bold text-lg leading-snug text-ink group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="mt-2 text-[14px] text-ink-soft leading-relaxed line-clamp-3">
          {item.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[12px] text-faint">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <Icon.clock size={13} /> {item.readingTime || 3} min lezen
          </span>
          <span className="h-1 w-1 rounded-full bg-faint/50" />
          <span className="whitespace-nowrap">{formatDate(item.date)}</span>
        </div>
      </div>
    </Card>
  );
}

function PhotoCard({ item, onOpen }: { item: InspirationItem; onOpen: OnOpen }) {
  return (
    <Card
      {...openable(item, onOpen)}
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lift hover:-translate-y-1 hover-accent-border p-0"
    >
      <div className="relative">
        <Media
          src={item.imageUrl}
          label="foto"
          ratio={item.ratio || "4/3"}
          rounded="rounded-none"
        />
        <div className="absolute top-3 left-3">
          <Badge tone="photo">Foto</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-sans font-bold text-[15px] text-ink group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-[13px] text-ink-soft leading-relaxed">{item.caption}</p>
      </div>
    </Card>
  );
}

export function ContentCard({ item, onOpen }: { item: InspirationItem; onOpen: OnOpen }) {
  if (item.type === "quote") {
    return <QuoteCard item={item} onOpen={onOpen} />;
  }
  if (item.type === "article") {
    return <ArticleCard item={item} onOpen={onOpen} />;
  }
  return <PhotoCard item={item} onOpen={onOpen} />;
}
