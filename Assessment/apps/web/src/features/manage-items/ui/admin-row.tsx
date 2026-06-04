"use client";

import type { InspirationItem } from "@donkey/shared";
import { Badge, Button, Card, Icon, TYPE_BADGE, TYPE_LABEL } from "@/shared/ui";
import { formatDate } from "@/entities/inspiration-item";

type Handlers = {
  onEdit: (item: InspirationItem) => void;
  onDelete: (item: InspirationItem) => void;
};

/** Static component: renders the icon for a content type without aliasing a
 *  component to a render-scoped variable (which the React Compiler forbids). */
function TypeIcon({ type, size = 16 }: { type: InspirationItem["type"]; size?: number }) {
  if (type === "quote") {
    return <Icon.quote size={size} />;
  }
  if (type === "article") {
    return <Icon.article size={size} />;
  }
  return <Icon.image size={size} />;
}

export function AdminRow({ item, onEdit, onDelete }: { item: InspirationItem } & Handlers) {
  return (
    <tr className="group border-t border-line hover:bg-paper/60 transition">
      <td className="py-3.5 pl-5 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 grid place-items-center rounded-lg bg-ink/[0.05] text-ink-soft">
            <TypeIcon type={item.type} />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-ink text-[14px] truncate max-w-[260px]">
              {item.title || item.quote}
            </div>
            <div className="text-[12px] text-faint">{item.author}</div>
          </div>
        </div>
      </td>
      <td className="px-3 text-center">
        <Badge tone={TYPE_BADGE[item.type]}>{TYPE_LABEL[item.type]}</Badge>
      </td>
      <td className="px-3 text-[13px] text-ink-soft">{item.category}</td>
      <td className="px-3 text-center">
        <Badge tone={item.status === "published" ? "published" : "draft"}>
          {item.status === "published" ? "Live" : "Concept"}
        </Badge>
      </td>
      <td className="px-3 text-[13px] text-faint whitespace-nowrap">{formatDate(item.date)}</td>
      <td className="pr-5 pl-3">
        <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition">
          <button
            onClick={() => onEdit(item)}
            className="h-9 w-9 grid place-items-center rounded-lg hover:bg-ink/[0.07] text-ink-soft hover:text-ink transition"
            title="Bewerken"
            aria-label="Bewerken"
          >
            <Icon.edit size={16} />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="h-9 w-9 grid place-items-center rounded-lg hover:bg-red-50 text-ink-soft hover:text-red-600 transition"
            title="Verwijderen"
            aria-label="Verwijderen"
          >
            <Icon.trash size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function AdminMobileCard({ item, onEdit, onDelete }: { item: InspirationItem } & Handlers) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 grid place-items-center rounded-lg bg-ink/[0.05] text-ink-soft">
          <TypeIcon type={item.type} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-ink text-[14px] leading-snug">
            {item.title || item.quote}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge tone={TYPE_BADGE[item.type]}>{TYPE_LABEL[item.type]}</Badge>
            <Badge tone={item.status === "published" ? "published" : "draft"}>
              {item.status === "published" ? "Live" : "Concept"}
            </Badge>
            <span className="text-[12px] text-faint">{item.category}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-line">
        <Button variant="subtle" size="sm" className="flex-1" onClick={() => onEdit(item)}>
          <Icon.edit size={15} /> Bewerken
        </Button>
        <Button variant="danger" size="sm" aria-label="Verwijderen" onClick={() => onDelete(item)}>
          <Icon.trash size={15} />
        </Button>
      </div>
    </Card>
  );
}
