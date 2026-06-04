"use client";

import { useEffect, useState } from "react";
import type { InspirationItem } from "@donkey/shared";
import { Button, Icon } from "@/shared/ui";

export function Hero({ quotes, onExplore }: { quotes: InspirationItem[]; onExplore: () => void }) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  useEffect(() => {
    if (quotes.length < 2) {
      return;
    }
    const intervalId = setInterval(
      () => setCurrentQuoteIndex((previousIndex) => (previousIndex + 1) % quotes.length),
      6500
    );
    return () => clearInterval(intervalId);
  }, [quotes.length]);
  const currentQuote = quotes[currentQuoteIndex];

  return (
    <section className="relative overflow-hidden bg-charcoal text-paper">
      <div
        className="absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-30"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--accent)" }}
      />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="flex items-center gap-2 text-paper/55 text-[12px] font-semibold tracking-[0.18em] uppercase mb-7">
          <Icon.sparkle size={15} className="text-accent" /> Dagelijkse inspiratie
        </div>
        {currentQuote && (
          <div
            key={currentQuote.id}
            className="max-w-3xl min-h-[13rem] sm:min-h-[15rem] flex flex-col justify-center animate-hero-in"
          >
            <blockquote className="font-serif text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.12] tracking-[-0.01em] text-paper">
              <span className="text-accent">“</span>
              {currentQuote.quote}
              <span className="text-accent">”</span>
            </blockquote>
            <div className="mt-6 flex items-center gap-3 text-paper/55 text-sm">
              <span className="font-semibold text-paper/80 whitespace-nowrap">
                {currentQuote.author}
              </span>
              <span className="h-1 w-1 rounded-full bg-paper/30 shrink-0" />
              <span className="whitespace-nowrap">{currentQuote.category}</span>
            </div>
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button variant="default" size="lg" onClick={onExplore}>
            Content verkennen <Icon.arrow size={17} />
          </Button>
        </div>
      </div>
    </section>
  );
}
