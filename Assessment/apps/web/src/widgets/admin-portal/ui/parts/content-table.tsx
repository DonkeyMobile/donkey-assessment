"use client";

import type { InspirationItem } from "@donkey/shared";
import { Card } from "@/shared/ui";
import { AdminMobileCard, AdminRow } from "@/features/manage-items";

interface ContentTableProps {
  items: InspirationItem[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onEdit: (item: InspirationItem) => void;
  onDelete: (item: InspirationItem) => void;
}

export function ContentTable({
  items,
  isLoading,
  isError,
  onRetry,
  onEdit,
  onDelete,
}: ContentTableProps) {
  if (isLoading) {
    return (
      <p className="py-16 text-center text-sm text-faint" role="status">
        Content laden…
      </p>
    );
  }
  if (isError) {
    return (
      <div className="py-16 text-center">
        <p className="font-serif text-xl text-ink">Content kon niet worden geladen</p>
        <button
          onClick={onRetry}
          className="mt-3 text-sm font-semibold text-accent hover:underline"
        >
          Opnieuw proberen
        </button>
      </div>
    );
  }

  const empty = items.length === 0;

  return (
    <>
      <Card className="hidden md:block overflow-hidden p-0">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-wider text-faint">
              <th className="py-3 pl-5 pr-3 font-bold">Content</th>
              <th className="px-3 font-bold text-center">Type</th>
              <th className="px-3 font-bold">Categorie</th>
              <th className="px-3 font-bold text-center">Status</th>
              <th className="px-3 font-bold">Datum</th>
              <th className="pr-5 pl-3 font-bold text-right">Acties</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <AdminRow key={it.id} item={it} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
        {empty && (
          <div className="py-16 text-center text-sm text-faint">Geen content gevonden.</div>
        )}
      </Card>

      <div className="md:hidden space-y-3">
        {items.map((it) => (
          <AdminMobileCard key={it.id} item={it} onEdit={onEdit} onDelete={onDelete} />
        ))}
        {empty && (
          <div className="py-12 text-center text-sm text-faint">Geen content gevonden.</div>
        )}
      </div>
    </>
  );
}
