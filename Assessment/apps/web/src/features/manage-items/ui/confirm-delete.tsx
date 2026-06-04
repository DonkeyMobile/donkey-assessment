"use client";

import type { InspirationItem } from "@donkey/shared";
import { Button, Dialog, Icon } from "@/shared/ui";

export function ConfirmDelete({
  open,
  item,
  onClose,
  onConfirm,
  busy = false,
}: {
  open: boolean;
  item: InspirationItem | null;
  onClose: () => void;
  onConfirm: () => void;
  busy?: boolean;
}) {
  return (
    <Dialog open={open} onClose={onClose} size="sm">
      <div className="p-6">
        <div className="h-12 w-12 grid place-items-center rounded-full bg-red-50 text-red-600 mb-4">
          <Icon.trash size={22} />
        </div>
        <h2 className="font-sans font-bold text-lg text-ink">Content verwijderen?</h2>
        <p className="text-sm text-ink-soft mt-2 leading-relaxed">
          Weet je zeker dat je{" "}
          <span className="font-semibold text-ink">“{item ? item.title || item.quote : ""}”</span>{" "}
          wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Annuleren
          </Button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:pointer-events-none"
          >
            <Icon.trash size={16} /> Verwijderen
          </button>
        </div>
      </div>
    </Dialog>
  );
}
