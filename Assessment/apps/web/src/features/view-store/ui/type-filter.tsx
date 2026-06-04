"use client";

import { CONTENT_TYPES, type ContentType } from "@donkey/shared";

// Derived from the shared CONTENT_TYPES so a new content type automatically
// shows up as a filter button. `null` is the "show everything" option.
const typeFilterOptions: { id: ContentType | null; label: string }[] = [
  { id: null, label: "Alles" },
  ...CONTENT_TYPES.map((contentType) => ({ id: contentType.id, label: contentType.plural })),
];

export function TypeFilter({
  value,
  onChange,
}: {
  value: ContentType | null;
  onChange: (value: ContentType | null) => void;
}) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-1.5 p-1 bg-ink/[0.05] rounded-full">
        {typeFilterOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => onChange(option.id)}
            className={
              "px-4 py-2 rounded-full text-[13px] font-semibold transition " +
              (value === option.id
                ? "bg-surface text-ink shadow-soft"
                : "text-ink-soft hover:text-ink")
            }
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
