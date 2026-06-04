"use client";

import { useEffect } from "react";
import type { InspirationItem } from "@donkey/shared";
import { Badge, Button, Card, Icon, TYPE_BADGE, TYPE_LABEL } from "@/shared/ui";
import { ContentDetail } from "@/entities/inspiration-item";

function RelatedList({
  related,
  onOpen,
}: {
  related: InspirationItem[];
  onOpen: (item: InspirationItem) => void;
}) {
  if (related.length === 0) {
    return null;
  }
  return (
    <div className="mt-16 pt-10 border-t border-line">
      <h3 className="font-sans font-bold text-lg text-ink mb-5">Meer inspiratie</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {related.map((r) => (
          <button key={r.id} onClick={() => onOpen(r)} className="text-left group">
            <Card className="p-5 h-full transition-all hover:shadow-soft hover:-translate-y-0.5 hover-accent-border">
              <Badge tone={TYPE_BADGE[r.type]}>{TYPE_LABEL[r.type]}</Badge>
              <p className="mt-3 font-serif text-[15px] leading-snug text-ink line-clamp-3 group-hover:text-accent transition-colors">
                {r.quote || r.title}
              </p>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DetailView({
  item,
  related,
  onOpen,
  onClose,
}: {
  item: InspirationItem;
  related: InspirationItem[];
  onOpen: (item: InspirationItem) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  return (
    <div className="fixed inset-0 z-[70] bg-paper overflow-y-auto scroll-thin">
      <div className="sticky top-0 z-10 bg-paper/85 backdrop-blur border-b border-line">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon.back size={16} /> Terug
          </Button>
          <div className="flex items-center gap-2">
            <Badge tone={TYPE_BADGE[item.type]}>{TYPE_LABEL[item.type]}</Badge>
            <Badge tone="neutral">{item.category}</Badge>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
        <ContentDetail item={item} />
        <RelatedList related={related} onOpen={onOpen} />
      </article>
    </div>
  );
}
