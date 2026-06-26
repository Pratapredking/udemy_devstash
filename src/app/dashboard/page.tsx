import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MainContent } from "@/components/dashboard/main-content";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <MainContent />
    </DashboardShell>
  );
}
