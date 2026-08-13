import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Pencil,
  MoreHorizontal,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Project, ProjectHealth, TicketPriority, TicketStatus } from "@/lib/projects-data";

const healthStyles: Record<ProjectHealth, string> = {
  "On Track": "bg-emerald-50 text-emerald-700",
  "At Risk": "bg-amber-50 text-amber-700",
  Overdue: "bg-red-50 text-red-700",
};

const priorityVariant: Record<TicketPriority, "danger" | "warning" | "neutral" | "info"> = {
  Critical: "danger",
  High: "warning",
  Medium: "neutral",
  Low: "info",
};

const statusVariant: Record<TicketStatus, "info" | "warning" | "success" | "neutral"> = {
  Open: "neutral",
  "In Progress": "info",
  Resolved: "warning",
  Closed: "success",
};

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div>
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-semibold text-gray-600 transition hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
        <span>›</span>
        <span className="text-gray-800">{project.name}</span>
      </nav>

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {project.name}
            </h1>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${healthStyles[project.health]}`}
            >
              ● {project.health}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Building2 size={14} />
              Client: {project.client}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              Target: {project.targetDate}
            </span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Pencil size={14} />
          Edit Project
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm sm:grid-cols-3 xl:grid-cols-6">
        {[
          { label: "TOTAL", value: project.totalTickets, className: "text-gray-900" },
          { label: "OPEN", value: project.open, className: "text-blue-600" },
          {
            label: "IN PROGRESS",
            value: project.inProgress,
            className: "text-gray-900",
          },
          {
            label: "RESOLVED",
            value: project.resolved,
            className: "text-violet-600",
          },
          {
            label: "CLOSED",
            value: project.closed,
            className: "text-emerald-600",
          },
          {
            label: "OVERDUE",
            value: project.overdue,
            className: "text-red-600",
          },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className={`text-xl font-bold ${stat.className}`}>{stat.value}</p>
            <p className="text-[11px] font-semibold tracking-wide text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <section className="mb-6 rounded-xl border border-border bg-surface p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Team Workload</h2>
          <button
            type="button"
            className="text-sm font-semibold text-primary hover:text-primary-hover"
          >
            Manage
          </button>
        </div>
        <ul className="space-y-4">
          {project.team.map((member) => (
            <li key={member.id} className="flex items-center gap-3">
              <Avatar name={member.name} size="sm" />
              <div className="min-w-0 w-36">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {member.shortName}
                </p>
                <p className="text-xs text-muted">
                  {member.activeTickets} Active
                  {member.highLoad ? " (High)" : ""}
                </p>
              </div>
              <ProgressBar
                value={member.capacity}
                tone={member.highLoad ? "warning" : "primary"}
                showLabel={false}
                className="flex-1"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-surface shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-gray-900">Tickets</h2>
          <div className="flex flex-wrap gap-2">
            <select className="h-9 rounded-lg border border-border bg-white px-3 text-sm">
              <option>Status: All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
            <select className="h-9 rounded-lg border border-border bg-white px-3 text-sm">
              <option>Assignee: All</option>
              {project.team.map((member) => (
                <option key={member.id}>{member.shortName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-semibold tracking-wide text-muted uppercase">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Priority</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Assignee</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {project.tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3.5 font-semibold text-primary">
                    {ticket.id}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {ticket.title}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      label={ticket.priority}
                      variant={priorityVariant[ticket.priority]}
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge
                      label={ticket.status}
                      variant={statusVariant[ticket.status]}
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={ticket.assignee} size="sm" />
                      <span>{ticket.assignee}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                      aria-label="Ticket actions"
                    >
                      <MoreHorizontal size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-gray-50 px-5 py-3 text-sm text-muted">
          <span>
            Showing 1-{project.tickets.length} of {project.totalTickets}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              className="rounded-md border border-border bg-white px-2 py-1 disabled:opacity-40"
              disabled
            >
              ‹
            </button>
            <button
              type="button"
              className="rounded-md border border-border bg-white px-2 py-1"
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
