import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { PageShell } from "@/components/layout/page-shell";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminPage() {
  const initialAuthenticated = await isAdminAuthenticated();

  return (
    <PageShell>
      <AdminDashboard initialAuthenticated={initialAuthenticated} />
    </PageShell>
  );
}
