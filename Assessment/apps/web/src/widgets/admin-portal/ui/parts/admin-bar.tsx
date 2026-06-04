"use client";

import { Button, Icon, Logo } from "@/shared/ui";
import { SignOutButton } from "@/features/auth";

export function AdminBar({ onViewSite, onReset }: { onViewSite: () => void; onReset: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo size={26} />
          <span className="hidden sm:inline-flex items-center whitespace-nowrap text-[11px] font-bold tracking-wider uppercase text-faint border border-line rounded-full px-2.5 py-1">
            Admin portaal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onReset} title="Voorbeelddata herstellen">
            <Icon.reset size={15} /> <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onViewSite}>
            <Icon.eye size={15} /> Bekijk site
          </Button>
          <SignOutButton variant="ghost" />
        </div>
      </div>
    </header>
  );
}
