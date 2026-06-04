"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ContentType, InspirationItem } from "@donkey/shared";
import { useGetItemsQuery } from "@/entities/inspiration-item";
import { Hero, TypeFilter, ContentGrid, filterItems } from "@/features/view-store";
import { authClient, useSession } from "@/shared/auth";
import { PublicHeader } from "@/widgets/public-header";
import { Footer } from "@/widgets/footer";
import { DetailView } from "@/widgets/detail-view";

export function PublicSite() {
  const { data: items = [], isLoading, isError, refetch } = useGetItemsQuery();
  const { data: session } = useSession();
  const router = useRouter();

  const [contentTypeFilter, setContentTypeFilter] = useState<ContentType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<InspirationItem | null>(null);
  const gridRef = useRef<HTMLElement>(null);

  // API already returns published only; quotes power the hero.
  const quotes = useMemo(() => items.filter((i) => i.type === "quote"), [items]);
  const visible = useMemo(
    () => filterItems(items, contentTypeFilter, selectedCategory),
    [items, contentTypeFilter, selectedCategory]
  );
  const related = useMemo(
    () =>
      selected
        ? items.filter((i) => i.id !== selected.id && i.category === selected.category).slice(0, 4)
        : [],
    [selected, items]
  );

  const scrollToGrid = () => {
    if (gridRef.current) {
      window.scrollTo({ top: gridRef.current.offsetTop - 80, behavior: "smooth" });
    }
  };

  // Admin entry: go to the portal if signed in, otherwise start the Keycloak login.
  const goAdmin = () => {
    if (session) {
      router.push("/admin");
    } else {
      authClient.signIn.oauth2({ providerId: "keycloak", callbackURL: "/admin" });
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <PublicHeader
        onAdmin={goAdmin}
        onHome={() => {
          setSelectedCategory(null);
          setContentTypeFilter(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        activeCat={selectedCategory}
        onCat={(category) => {
          setSelectedCategory(category);
          setTimeout(scrollToGrid, 60);
        }}
      />
      <Hero quotes={quotes} onExplore={scrollToGrid} />

      <main ref={gridRef} className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 scroll-mt-20">
        <div className="flex flex-col gap-6 mb-8">
          <div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-ink tracking-tight">
              {selectedCategory ? selectedCategory : "Ontdek inspiratie"}
            </h2>
            <p className="text-sm text-faint mt-1.5">
              {visible.length} {visible.length === 1 ? "item" : "items"}
              {selectedCategory ? " in " + selectedCategory : ""} · quotes, artikelen en foto&apos;s
            </p>
          </div>
          <TypeFilter value={contentTypeFilter} onChange={setContentTypeFilter} />
        </div>

        {isLoading ? (
          <p className="text-faint" role="status">
            Inspiratie laden…
          </p>
        ) : isError ? (
          <div className="text-center py-16">
            <p className="font-serif text-xl text-ink">Inhoud kon niet worden geladen</p>
            <button
              onClick={() => refetch()}
              className="mt-3 text-sm font-semibold text-accent hover:underline"
            >
              Opnieuw proberen
            </button>
          </div>
        ) : (
          <ContentGrid items={visible} onOpen={setSelected} />
        )}
      </main>

      <Footer onAdmin={goAdmin} />

      {selected && (
        <DetailView
          item={selected}
          related={related}
          onOpen={setSelected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
