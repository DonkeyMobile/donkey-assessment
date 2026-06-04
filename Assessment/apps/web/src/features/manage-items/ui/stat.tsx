import type { ReactNode } from "react";
import { Card } from "@/shared/ui";

export function Stat({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  accent?: boolean;
}) {
  return (
    <Card className="p-5 flex items-center gap-4">
      <div
        className={
          "h-11 w-11 shrink-0 grid place-items-center rounded-xl " +
          (accent ? "bg-accent text-white" : "bg-ink/[0.05] text-ink-soft")
        }
      >
        {icon}
      </div>
      <div>
        <div className="text-2xl font-extrabold text-ink leading-none">{value}</div>
        <div className="text-[12px] text-faint mt-1">{label}</div>
      </div>
    </Card>
  );
}
