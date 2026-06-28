import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MainContent } from "@/components/dashboard/main-content";
import { getCollectionsForDashboard } from "@/lib/db/collections";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  // TODO: Replace with session user once auth is wired up
  const user = await prisma.user.findUnique({ where: { email: "demo@devstash.io" } });
  const collections = user ? await getCollectionsForDashboard(user.id) : [];

  return (
    <DashboardShell>
      <MainContent collections={collections} />
    </DashboardShell>
  );
}
