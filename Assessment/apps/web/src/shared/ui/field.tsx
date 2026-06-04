import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { Icon } from "./icons";
import { cn } from "@/shared/lib";

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      {label && <span className="block text-[13px] font-semibold text-ink mb-1.5">{label}</span>}
      {children}
      {error ? (
        <span className="block text-[12px] text-red-600 mt-1.5">{error}</span>
      ) : hint ? (
        <span className="block text-[12px] text-faint mt-1.5">{hint}</span>
      ) : null}
    </label>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(function Input({ className = "", invalid, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full h-11 px-3.5 rounded-xl bg-surface border text-sm text-ink placeholder:text-faint/70 transition focus:outline-none focus:ring-2 ring-accent",
        invalid ? "border-red-300" : "border-line focus:border-accent",
        className
      )}
      {...props}
    />
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function Textarea({ className = "", invalid, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full px-3.5 py-3 rounded-xl bg-surface border text-sm text-ink placeholder:text-faint/70 leading-relaxed transition focus:outline-none focus:ring-2 ring-accent resize-y",
        invalid ? "border-red-300" : "border-line focus:border-accent",
        className
      )}
      {...props}
    />
  );
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className = "", children, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full h-11 pl-3.5 pr-10 rounded-xl bg-surface border border-line text-sm text-ink appearance-none transition focus:outline-none focus:ring-2 ring-accent focus:border-accent",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <Icon.chevron
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
        />
      </div>
    );
  }
);
