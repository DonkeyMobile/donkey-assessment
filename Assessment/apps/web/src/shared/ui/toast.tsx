"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Icon } from "./icons";

type ToastOptions = { tone?: "danger"; duration?: number };
type PushToast = (msg: string, opts?: ToastOptions) => void;

const ToastCtx = createContext<PushToast | null>(null);

export function useToast(): PushToast {
  const ctx = useContext(ToastCtx);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

interface ToastItem extends ToastOptions {
  id: string;
  msg: string;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const push = useCallback<PushToast>((msg, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, ...opts }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), opts.duration || 2600);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 w-full px-4 sm:px-0 sm:w-auto pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2.5 bg-charcoal text-paper rounded-full pl-3.5 pr-5 py-2.5 shadow-lift animate-rise text-sm font-medium"
          >
            <span
              className={
                "grid place-items-center h-5 w-5 rounded-full " +
                (t.tone === "danger" ? "bg-red-500/90" : "bg-accent")
              }
            >
              {t.tone === "danger" ? <Icon.trash size={12} /> : <Icon.check size={13} />}
            </span>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
