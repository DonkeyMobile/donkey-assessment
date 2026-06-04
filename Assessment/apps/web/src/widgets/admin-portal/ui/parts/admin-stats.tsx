"use client";

import { Icon } from "@/shared/ui";
import { Stat } from "@/features/manage-items";

interface Counts {
  total: number;
  quote: number;
  article: number;
  draft: number;
}

export function AdminStats({ counts }: { counts: Counts }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
      <Stat label="Totaal items" value={counts.total} icon={<Icon.layout size={19} />} accent />
      <Stat label="Quotes" value={counts.quote} icon={<Icon.quote size={19} />} />
      <Stat label="Artikelen" value={counts.article} icon={<Icon.article size={19} />} />
      <Stat label="Concepten" value={counts.draft} icon={<Icon.eyeOff size={19} />} />
    </div>
  );
}
