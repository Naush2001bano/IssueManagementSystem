import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

type Priority = "Critical" | "High" | "Medium" | "Low";
type TicketStatus = "Open" | "In Progress" | "In Review" | "Resolved";

const tickets: {
  id: string;
  title: string;
  priority: Priority;
  status: TicketStatus;
  project: string;
}[] = [
  {
    id: "PROJ-842",
    title: "Fix login redirect loop on SSO",
    priority: "Critical",
    status: "In Progress",
    project: "Auth Platform",
  },
  {
    id: "UI-109",
    title: "Dashboard chart empty state",
    priority: "Medium",
    status: "Open",
    project: "IssueTrack Web",
  },
  {
    id: "MOBILE-55",
    title: "Push notification delay on iOS",
    priority: "High",
    status: "In Review",
    project: "Mobile App",
  },
  {
    id: "QA-390",
    title: "Flaky e2e test on ticket create",
    priority: "Low",
    status: "Resolved",
    project: "QA Suite",
  },
  {
    id: "AUTH-221",
    title: "Session expiry warning banner",
    priority: "High",
    status: "Open",
    project: "Auth Platform",
  },
];

const priorityVariant: Record<Priority, "danger" | "warning" | "info" | "neutral"> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "neutral",
};

const statusVariant: Record<TicketStatus, "info" | "warning" | "success"> = {
  Open: "info",
  "In Progress": "warning",
  "In Review": "info",
  Resolved: "success",
};

export default function TicketsPage() {
  return (
    <div>
      <PageHeader
        title="My Tickets"
        description="Track and manage issues assigned to you."
        actions={
          <Link href="/tickets/create">
            <Button size="sm">
              <Plus size={15} />
              New Ticket
            </Button>
          </Link>
        }
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-semibold tracking-wide text-muted uppercase">
                <th className="pb-3">ID</th>
                <th className="pb-3">Title</th>
                <th className="pb-3">Project</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-3.5 font-semibold text-primary">
                    {ticket.id}
                  </td>
                  <td className="py-3.5 font-medium text-gray-900">
                    {ticket.title}
                  </td>
                  <td className="py-3.5 text-muted">{ticket.project}</td>
                  <td className="py-3.5">
                    <StatusBadge
                      label={ticket.priority}
                      variant={priorityVariant[ticket.priority]}
                    />
                  </td>
                  <td className="py-3.5">
                    <StatusBadge
                      label={ticket.status}
                      variant={statusVariant[ticket.status]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
