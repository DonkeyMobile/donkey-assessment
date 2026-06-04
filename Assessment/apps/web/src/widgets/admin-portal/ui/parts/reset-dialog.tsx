"use client";

import { Button, Dialog, Icon } from "@/shared/ui";

interface ResetDialogProps {
  open: boolean;
  busy: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetDialog({ open, busy, onClose, onConfirm }: ResetDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} size="sm">
      <div className="p-6">
        <div className="h-12 w-12 grid place-items-center rounded-full bg-amber-soft/60 text-terracotta-dark mb-4">
          <Icon.reset size={22} />
        </div>
        <h2 className="font-sans font-bold text-lg text-ink">Voorbeelddata herstellen?</h2>
        <p className="text-sm text-ink-soft mt-2 leading-relaxed">
          Dit verwijdert alle huidige content en plaatst de oorspronkelijke voorbeelden terug. Deze
          actie kan niet ongedaan worden gemaakt.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Annuleren
          </Button>
          <Button variant="default" onClick={onConfirm} disabled={busy}>
            <Icon.reset size={16} /> Herstellen
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
