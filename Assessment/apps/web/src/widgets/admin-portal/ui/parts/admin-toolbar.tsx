"use client";

import { Button, Icon, Input, Select } from "@/shared/ui";
import type { TypeFilterValue } from "@/features/manage-items";

interface AdminToolbarProps {
  query: string;
  onQuery: (value: string) => void;
  typeFilter: TypeFilterValue;
  onTypeFilterChange: (value: TypeFilterValue) => void;
  onNew: () => void;
}

export function AdminToolbar({
  query,
  onQuery,
  typeFilter,
  onTypeFilterChange,
  onNew,
}: AdminToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      <div className="relative flex-1">
        <Icon.search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
        <Input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          aria-label="Zoek op titel, auteur of categorie"
          placeholder="Zoek op titel, auteur of categorie…"
          className="pl-10"
        />
      </div>
      <div className="flex gap-3">
        <Select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value as TypeFilterValue)}
          aria-label="Filter op type"
          className="sm:w-44"
        >
          <option value="all">Alle types</option>
          <option value="quote">Quotes</option>
          <option value="article">Artikelen</option>
          <option value="photo">Foto&apos;s</option>
        </Select>
        <Button variant="default" className="sm:hidden flex-1" onClick={onNew}>
          <Icon.plus size={17} /> Nieuw
        </Button>
      </div>
    </div>
  );
}
