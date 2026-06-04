import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div className={cn("bg-surface border border-line rounded-2xl", className)} {...props}>
      {children}
    </div>
  );
}
