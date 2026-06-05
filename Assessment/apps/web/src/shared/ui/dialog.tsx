"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Size = "sm" | "md" | "lg";

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function Dialog({
  open,
  onClose,
  children,
  className = "",
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  size?: Size;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (focusables.length === 0) {
          // Nothing tabbable inside — keep focus on the panel instead of escaping.
          e.preventDefault();
          panelRef.current.focus();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Move focus into the dialog (first focusable, else the panel itself).
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    (firstFocusable ?? panelRef.current)?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }
  const widths: Record<Size, string> = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };
  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div
        className="absolute inset-0 bg-charcoal/45 backdrop-blur-[2px] animate-fade-in"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={
          "relative w-full " +
          widths[size] +
          " bg-surface rounded-t-2xl sm:rounded-2xl shadow-lift border border-line max-h-[92vh] overflow-y-auto scroll-thin animate-scale-in focus:outline-none " +
          className
        }
      >
        {children}
      </div>
    </div>
  );
}
