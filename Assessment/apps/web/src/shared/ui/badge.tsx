import type { ReactNode } from "react";
import type { ContentType } from "@donkey/shared";
import { cn } from "@/shared/lib";

type Tone = "neutral" | "accent" | "quote" | "article" | "photo" | "draft" | "published";

const tones: Record<Tone, string> = {
  neutral: "bg-ink/[0.06] text-ink-soft",
  accent: "text-accent",
  quote: "bg-amber-soft/50 text-terracotta-dark",
  article: "bg-[oklch(0.92_0.03_150)] text-[oklch(0.42_0.06_150)]",
  photo: "bg-[oklch(0.92_0.035_240)] text-[oklch(0.44_0.07_245)]",
  draft: "bg-[oklch(0.93_0.02_70)] text-faint",
  published: "bg-[oklch(0.92_0.04_150)] text-[oklch(0.44_0.07_150)]",
};

export function Badge({
  tone = "neutral",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase",
        tones[tone] || tones.neutral,
        className
      )}
    >
      {children}
    </span>
  );
}

export const TYPE_BADGE: Record<ContentType, Tone> = {
  quote: "quote",
  article: "article",
  photo: "photo",
};
export const TYPE_LABEL: Record<ContentType, string> = {
  quote: "Quote",
  article: "Artikel",
  photo: "Foto",
};
