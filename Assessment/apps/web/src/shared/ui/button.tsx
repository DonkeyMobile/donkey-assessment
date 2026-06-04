import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib";

type Variant = "default" | "dark" | "outline" | "ghost" | "ghostLight" | "subtle" | "danger";
type Size = "sm" | "md" | "lg" | "icon" | "iconSm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold whitespace-nowrap rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-accent disabled:opacity-50 disabled:pointer-events-none select-none";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
  icon: "h-10 w-10",
  iconSm: "h-9 w-9",
};

const variants: Record<Variant, string> = {
  default:
    "bg-accent text-white shadow-soft hover:brightness-[1.06] active:brightness-95 hover:-translate-y-[1px]",
  dark: "bg-charcoal text-paper hover:bg-charcoal-soft hover:-translate-y-[1px] shadow-soft",
  outline: "border border-line bg-surface text-ink hover:bg-paper hover:border-ink/20",
  ghost: "text-ink-soft hover:bg-ink/[0.05] hover:text-ink",
  ghostLight: "text-paper/70 hover:bg-white/10 hover:text-paper",
  subtle: "bg-ink/[0.05] text-ink hover:bg-ink/[0.09]",
  danger:
    "bg-surface border border-line text-ink hover:border-red-300 hover:bg-red-50 hover:text-red-700",
};

export function Button({
  variant = "default",
  size = "md",
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
