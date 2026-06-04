import { redirect } from "next/navigation";
import { USER_ROLES } from "@donkey/shared";
import { getServerSession } from "@/entities/session";
import { SignOutButton } from "@/features/auth";
import { AdminPortal } from "@/widgets/admin-portal";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession();

  // No session at all → back to the public site.
  if (!session) {
    redirect("/");
  }

  // Authenticated but not an admin → explicit forbidden state.
  if (session.user.role !== USER_ROLES.admin) {
    return (
      <div className="min-h-screen bg-paper grid place-items-center px-6">
        <div className="max-w-md rounded-2xl border border-amber-300 bg-amber-50 p-6">
          <h1 className="text-xl font-semibold text-ink">Geen toegang</h1>
          <p className="mt-1 text-ink-soft">
            Je bent ingelogd als <strong>{session.user.email}</strong>, maar het admin-portaal
            vereist de <code>admin</code>-rol.
          </p>
          <div className="mt-5">
            <SignOutButton />
          </div>
        </div>
      </div>
    );
  }

  return <AdminPortal />;
}
