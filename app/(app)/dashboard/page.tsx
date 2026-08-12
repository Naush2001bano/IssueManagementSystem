import {
  Ticket,
  CheckCircle2,
  AlertTriangle,
  FolderKanban,
  Calendar,
  Download,
  ChevronDown,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TicketVolumeChart } from "@/components/dashboard/TicketVolumeChart";
import { PriorityDonut } from "@/components/dashboard/PriorityDonut";
import { TeamWorkloadTable } from "@/components/dashboard/TeamWorkloadTable";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Super Admin Dashboard"
        description="Overview of tickets, SLA health, and team capacity across all projects."
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Calendar size={15} />
              Last 30 Days
              <ChevronDown size={14} />
            </Button>
            <Button variant="secondary" size="sm">
              <Download size={15} />
              Export
            </Button>
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Open Tickets"
          value={142}
          icon={<Ticket size={18} />}
          badge={<StatusBadge label="+12%" variant="success" />}
        />
        <MetricCard
          title="Resolved (7D)"
          value={89}
          icon={<CheckCircle2 size={18} />}
          badge={<StatusBadge label="Steady" variant="info" />}
        />
        <MetricCard
          title="SLA Breaches"
          value={3}
          alert
          icon={<AlertTriangle size={18} />}
          badge={<StatusBadge label="Requires Action" variant="danger" />}
        />
        <MetricCard
          title="Active Projects"
          value={12}
          icon={<FolderKanban size={18} />}
          badge={<StatusBadge label="On track" variant="neutral" />}
        />
      </div>

      <div className="mb-6 grid gap-4 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="Ticket Volume"
          action={
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-gray-800"
            >
              Weekly View
              <ChevronDown size={14} />
            </button>
          }
        >
          <TicketVolumeChart />
        </Card>
        <Card title="Priority Breakdown">
          <PriorityDonut />
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card
          className="xl:col-span-2"
          title="Team Workload"
          action={
            <button
              type="button"
              className="text-sm font-semibold text-primary hover:text-primary-hover"
            >
              View All
            </button>
          }
        >
          <TeamWorkloadTable />
        </Card>
        <Card title="Recent Activity">
          <RecentActivity />
        </Card>
      </div>
    </div>
  );
}
