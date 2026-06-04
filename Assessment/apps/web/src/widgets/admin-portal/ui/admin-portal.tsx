"use client";

import { useRouter } from "next/navigation";
import { Button, Dialog, Icon } from "@/shared/ui";
import { ConfirmDelete, ContentForm, useAdminContent } from "@/features/manage-items";
import { AdminBar, AdminStats, AdminToolbar, ContentTable, ResetDialog } from "./parts";

export function AdminPortal() {
  const router = useRouter();
  const admin = useAdminContent();

  return (
    <div className="min-h-screen bg-paper">
      <AdminBar onViewSite={() => router.push("/")} onReset={admin.openReset} />
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-sans font-extrabold text-2xl sm:text-[28px] text-ink tracking-tight">
              Content beheren
            </h1>
            <p className="text-sm text-faint mt-1">
              Bekijk, voeg toe, bewerk en verwijder inspirerende content.
            </p>
          </div>
          <Button variant="default" className="hidden sm:inline-flex" onClick={admin.openNew}>
            <Icon.plus size={17} /> Nieuwe content
          </Button>
        </div>

        <AdminStats counts={admin.counts} />
        <AdminToolbar
          query={admin.query}
          onQuery={admin.setQuery}
          typeFilter={admin.typeFilter}
          onTypeFilterChange={admin.setTypeFilter}
          onNew={admin.openNew}
        />
        <ContentTable
          items={admin.filtered}
          isLoading={admin.isLoading}
          isError={admin.isError}
          onRetry={admin.refetch}
          onEdit={admin.openEdit}
          onDelete={admin.requestDelete}
        />
      </main>

      <Dialog open={admin.formOpen} onClose={admin.closeForm} size="lg">
        {admin.formOpen && (
          <ContentForm
            key={admin.editing?.id ?? "new"}
            initial={admin.editing}
            onClose={admin.closeForm}
            onSave={admin.handleSave}
            busy={admin.saving}
          />
        )}
      </Dialog>
      <ConfirmDelete
        open={!!admin.confirming}
        item={admin.confirming}
        onClose={admin.cancelDelete}
        onConfirm={admin.handleDelete}
        busy={admin.deleting}
      />
      <ResetDialog
        open={admin.resetOpen}
        busy={admin.resetting}
        onClose={admin.closeReset}
        onConfirm={admin.handleReset}
      />
    </div>
  );
}
