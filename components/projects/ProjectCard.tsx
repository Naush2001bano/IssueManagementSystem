import Link from "next/link";
import { AlertTriangle, Eye, MoreHorizontal, Plus, Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Project, ProjectHealth } from "@/lib/projects-data";

const healthStyles: Record<ProjectHealth, string> = {
  "On Track": "bg-emerald-50 text-emerald-700",
  "At Risk": "bg-amber-50 text-amber-700",
  Overdue: "bg-red-50 text-red-700",
};

const progressTone: Record<ProjectHealth, "success" | "warning" | "danger"> = {
  "On Track": "success",
  "At Risk": "warning",
  Overdue: "danger",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md">
      <Link href={`/projects/${project.id}`} className="group flex flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${project.clientColor}`}
            >
              {project.clientInitials}
            </span>
            <span className="truncate text-xs font-bold tracking-wide text-muted uppercase">
              {project.client}
            </span>
          </div>
          <Star
            size={16}
            className={
              project.starred
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300 group-hover:text-gray-400"
            }
          />
        </div>

        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary">
            {project.name}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${healthStyles[project.health]}`}
          >
            {project.health}
          </span>
        </div>

        <div className="mb-2 flex items-center justify-between text-xs text-muted">
          <span>{project.totalTickets} total tickets</span>
          <span className="font-semibold text-gray-700">
            {project.progress}% Closed
          </span>
        </div>
        <ProgressBar
          value={project.progress}
          tone={progressTone[project.health]}
          showLabel={false}
          className="mb-4"
        />

        <div className="mb-4 grid grid-cols-4 gap-2 rounded-lg bg-gray-50 px-2 py-3 text-center">
          <div>
            <p className="text-sm font-bold text-blue-600">{project.open}</p>
            <p className="text-[10px] font-medium text-muted">OPEN</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{project.inProgress}</p>
            <p className="text-[10px] font-medium text-muted">IN PROG</p>
          </div>
          <div>
            <p className="text-sm font-bold text-violet-600">{project.resolved}</p>
            <p className="text-[10px] font-medium text-muted">RESOLVED</p>
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-600">{project.closed}</p>
            <p className="text-[10px] font-medium text-muted">CLOSED</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {project.priorityCounts.critical}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              {project.priorityCounts.high}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              {project.priorityCounts.medium}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {project.priorityCounts.low}
            </span>
          </div>
          {project.overdue > 0 && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
              <AlertTriangle size={12} />
              {project.overdue} Overdue
            </span>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex -space-x-2">
            {project.team.slice(0, 4).map((member) => (
              <Avatar
                key={member.id}
                name={member.name}
                size="sm"
                className="ring-2 ring-white"
              />
            ))}
          </div>
          <span className="text-xs text-muted">Updated {project.updatedAgo}</span>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-2">
        <Link href={`/projects/${project.id}`}>
          <Button type="button" variant="outline" size="sm" fullWidth>
            <Eye size={14} />
            View Details
          </Button>
        </Link>
        <Link href="/tickets/create">
          <Button
            type="button"
            variant="outline"
            size="sm"
            fullWidth
            className="border-primary/20 bg-primary-soft text-primary hover:bg-indigo-100"
          >
            <Plus size={14} />
            New Ticket
          </Button>
        </Link>
      </div>
    </article>
  );
}

interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-gray-50 text-xs font-semibold tracking-wide text-muted uppercase">
              <th className="px-4 py-3">Project Name</th>
              <th className="px-4 py-3">Health</th>
              <th className="px-4 py-3">Status Breakdown</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Tickets</th>
              <th className="px-4 py-3">Last Updated</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="group relative border-b border-border last:border-0 hover:bg-gray-50/80"
              >
                <td className="px-4 py-3.5">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-3 after:absolute after:inset-0"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${project.clientColor}`}
                    >
                      {project.clientInitials}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 group-hover:text-primary">
                        {project.name}
                      </p>
                      <p className="text-xs text-muted">
                        {project.client} • {project.key}
                      </p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${healthStyles[project.health]}`}
                  >
                    {project.health === "At Risk" && <AlertTriangle size={11} />}
                    {project.health}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-2 text-xs font-semibold">
                    <span className="text-blue-600">{project.open}O</span>
                    <span className="text-gray-700">{project.inProgress}P</span>
                    <span className="text-emerald-600">{project.closed}C</span>
                  </div>
                </td>
                <td className="min-w-[140px] px-4 py-3.5">
                  <ProgressBar value={project.progress} showLabel tone="primary" />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member) => (
                      <Avatar
                        key={member.id}
                        name={member.name}
                        size="sm"
                        className="ring-2 ring-white"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <p className="font-semibold text-gray-800">
                    {project.totalTickets} total
                  </p>
                  {project.overdue > 0 && (
                    <p className="text-xs font-medium text-red-600">
                      {project.overdue} overdue
                    </p>
                  )}
                </td>
                <td className="px-4 py-3.5 text-muted">{project.updatedAgo}</td>
                <td className="relative z-10 px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/projects/${project.id}`}
                      className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary"
                      aria-label="View project"
                    >
                      <Eye size={15} />
                    </Link>
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
                      aria-label="More actions"
                    >
                      <MoreHorizontal size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-border bg-gray-50 px-4 py-3 text-sm text-muted">
        <span>
          Showing 1-{projects.length} of {projects.length} projects
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
            className="rounded-md border border-border bg-white px-2 py-1 disabled:opacity-40"
            disabled
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
