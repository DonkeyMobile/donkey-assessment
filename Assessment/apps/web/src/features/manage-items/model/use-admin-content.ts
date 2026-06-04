"use client";

import { useMemo, useState } from "react";
import type { ContentInput, InspirationItem } from "@donkey/shared";
import { useToast } from "@/shared/ui";
import {
  useCreateItemMutation,
  useDeleteItemMutation,
  useGetAdminItemsQuery,
  useResetItemsMutation,
  useUpdateItemMutation,
} from "../api/admin-items-api";

export type TypeFilterValue = "all" | InspirationItem["type"];

/** All admin-portal state, data and CRUD handlers in one place. */
export function useAdminContent() {
  const toast = useToast();
  const { data: items = [], isLoading, isError, refetch } = useGetAdminItemsQuery();
  const [createItem, createState] = useCreateItemMutation();
  const [updateItem, updateState] = useUpdateItemMutation();
  const [deleteItem, deleteState] = useDeleteItemMutation();
  const [resetItems, resetState] = useResetItemsMutation();

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilterValue>("all");
  const [editing, setEditing] = useState<InspirationItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [confirming, setConfirming] = useState<InspirationItem | null>(null);
  const [resetOpen, setResetOpen] = useState(false);

  const filtered = useMemo(
    () =>
      items.filter((it) => {
        if (typeFilter !== "all" && it.type !== typeFilter) {
          return false;
        }
        if (query.trim()) {
          const haystack =
            `${it.title} ${it.quote ?? ""} ${it.excerpt ?? ""} ${it.author} ${it.category}`.toLowerCase();
          return haystack.includes(query.toLowerCase());
        }
        return true;
      }),
    [items, typeFilter, query]
  );

  const counts = useMemo(
    () => ({
      total: items.length,
      quote: items.filter((i) => i.type === "quote").length,
      article: items.filter((i) => i.type === "article").length,
      draft: items.filter((i) => i.status === "draft").length,
    }),
    [items]
  );

  function openNew() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(item: InspirationItem) {
    setEditing(item);
    setFormOpen(true);
  }

  async function handleSave(data: ContentInput, id: string | null) {
    try {
      if (id) {
        await updateItem({ id, values: data }).unwrap();
        toast("Wijzigingen opgeslagen");
      } else {
        await createItem(data).unwrap();
        toast("Content gepubliceerd");
      }
      setFormOpen(false);
    } catch {
      toast("Opslaan mislukt", { tone: "danger" });
    }
  }

  async function handleDelete() {
    if (!confirming) {
      return;
    }
    try {
      await deleteItem(confirming.id).unwrap();
      toast("Content verwijderd", { tone: "danger" });
    } catch {
      toast("Verwijderen mislukt", { tone: "danger" });
    }
    setConfirming(null);
  }

  async function handleReset() {
    try {
      await resetItems().unwrap();
      toast("Voorbeelddata hersteld");
    } catch {
      toast("Herstellen mislukt", { tone: "danger" });
    }
    setResetOpen(false);
  }

  return {
    items,
    filtered,
    counts,
    isLoading,
    isError,
    refetch,
    query,
    setQuery,
    typeFilter,
    setTypeFilter,
    formOpen,
    editing,
    openNew,
    openEdit,
    closeForm: () => setFormOpen(false),
    saving: createState.isLoading || updateState.isLoading,
    handleSave,
    confirming,
    requestDelete: setConfirming,
    cancelDelete: () => setConfirming(null),
    handleDelete,
    deleting: deleteState.isLoading,
    resetOpen,
    openReset: () => setResetOpen(true),
    closeReset: () => setResetOpen(false),
    handleReset,
    resetting: resetState.isLoading,
  };
}
