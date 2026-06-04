"use client";

import { useState, useSyncExternalStore } from "react";
import { CATEGORIES } from "@donkey/shared";
import { Button, Icon, Logo } from "@/shared/ui";

/** Track whether the page is scrolled past a threshold (external store). */
function useScrolled(threshold = 8) {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("scroll", cb, { passive: true });
      return () => window.removeEventListener("scroll", cb);
    },
    () => window.scrollY > threshold,
    () => false
  );
}

export function PublicHeader({
  onAdmin,
  onHome,
  activeCat,
  onCat,
}: {
  onAdmin: () => void;
  onHome: () => void;
  activeCat: string | null;
  onCat: (c: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  const categoryOptions = ["Alles", ...CATEGORIES];
  const isActive = (category: string) =>
    (activeCat === null && category === "Alles") || activeCat === category;

  return (
    <header
      className={
        "sticky top-0 z-40 bg-charcoal text-paper transition-shadow " +
        (scrolled ? "shadow-lift" : "")
      }
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="h-16 sm:h-[68px] flex items-center justify-between gap-4">
          <button onClick={onHome} className="shrink-0">
            <Logo light size={28} />
          </button>
          <nav className="hidden lg:flex items-center gap-1">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => onCat(category === "Alles" ? null : category)}
                className={
                  "px-3.5 py-2 rounded-full text-[13px] font-medium transition " +
                  (isActive(category)
                    ? "bg-white/12 text-paper"
                    : "text-paper/65 hover:text-paper hover:bg-white/[0.07]")
                }
              >
                {category}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghostLight"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={onAdmin}
            >
              Admin
            </Button>
            <button
              onClick={() => setOpen((wasOpen) => !wasOpen)}
              className="lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-white/10 transition"
              aria-label="Menu"
            >
              {open ? <Icon.x size={20} /> : <Icon.menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-charcoal">
          <div className="max-w-6xl mx-auto px-5 py-3 flex flex-wrap gap-1.5">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCat(category === "Alles" ? null : category);
                  setOpen(false);
                }}
                className={
                  "px-3.5 py-2 rounded-full text-[13px] font-medium transition " +
                  (isActive(category) ? "bg-white/14 text-paper" : "text-paper/70 bg-white/[0.05]")
                }
              >
                {category}
              </button>
            ))}
            <button
              onClick={() => {
                onAdmin();
                setOpen(false);
              }}
              className="px-3.5 py-2 rounded-full text-[13px] font-semibold bg-accent text-white"
            >
              Admin portaal
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
