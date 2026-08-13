import Link from "next/link";
import { MoreVertical, TicketPlus } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { TeamMember, WorkloadStatus } from "@/lib/team-data";

const roleStyles: Record<string, string> = {
  "Super Admin": "bg-violet-100 text-violet-700",
  "Project Manager": "bg-blue-100 text-blue-700",
  Developer: "bg-indigo-100 text-indigo-700",
  QA: "bg-amber-100 text-amber-800",
  Designer: "bg-pink-100 text-pink-700",
};

const workloadTone: Record<WorkloadStatus, "primary" | "success" | "danger"> = {
  Light: "success",
  Moderate: "primary",
  Overloaded: "danger",
};

const workloadLabel: Record<WorkloadStatus, string> = {
  Light: "text-emerald-700",
  Moderate: "text-primary",
  Overloaded: "text-red-600",
};

interface MemberCardProps {
  member: TeamMember;
}

export function MemberCard({ member }: MemberCardProps) {
  const visibleProjects = member.projects.slice(0, 2);
  const extraCount = member.projects.length - visibleProjects.length;

  return (
    <Link
      href={`/team/${member.id}`}
      className="group flex flex-col rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="relative shrink-0">
          <Avatar name={member.name} size="lg" />
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
              member.online ? "bg-emerald-500" : "bg-gray-300"
            }`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-gray-900 group-hover:text-primary">
            {member.name}
          </p>
          <p className="truncate text-sm text-muted">{member.email}</p>
        </div>
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          aria-label="More actions"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${roleStyles[member.role]}`}
        >
          {member.role}
        </span>
        {visibleProjects.map((project) => (
          <span
            key={project.id}
            className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600"
          >
            {project.name}
          </span>
        ))}
        {extraCount > 0 && (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
            +{extraCount}
          </span>
        )}
      </div>

      <div className="mb-4 grid grid-cols-4 gap-2 rounded-lg bg-gray-50 px-3 py-3 text-center">
        <div>
          <p className="text-sm font-bold text-blue-600">{member.stats.open}</p>
          <p className="text-[10px] font-medium text-muted">Open</p>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">
            {member.stats.inProgress}
          </p>
          <p className="text-[10px] font-medium text-muted">In Prog</p>
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-600">
            {member.stats.closed}
          </p>
          <p className="text-[10px] font-medium text-muted">Closed</p>
        </div>
        <div>
          <p className="text-sm font-bold text-red-600">{member.stats.overdue}</p>
          <p className="text-[10px] font-medium text-muted">Overdue</p>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-muted">Workload</span>
        <span className={`font-semibold ${workloadLabel[member.workload]}`}>
          {member.workload}
        </span>
      </div>
      <ProgressBar
        value={member.workloadPercent}
        tone={workloadTone[member.workload]}
        showLabel={false}
        className="mb-3"
      />

      <p className="mb-4 text-xs text-muted">
        Avg Resolution Time:{" "}
        <span className="font-semibold text-gray-700">
          {member.avgResolutionDays} days
        </span>
      </p>

      <Button
        type="button"
        variant="outline"
        fullWidth
        size="sm"
        className="mt-auto"
        onClick={(e) => e.preventDefault()}
      >
        <TicketPlus size={15} />
        Assign Ticket
      </Button>
    </Link>
  );
}
