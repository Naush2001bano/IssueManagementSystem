"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock3, Search, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { MemberCard } from "@/components/team/MemberCard";
import { PendingInviteCard } from "@/components/team/PendingInviteCard";
import {
  pendingInvites,
  teamMembers,
  type GlobalRole,
  type WorkloadStatus,
} from "@/lib/team-data";

export function TeamManagement() {
  const [query, setQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [workloadFilter, setWorkloadFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = teamMembers.filter((member) => {
      const matchesQuery =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        member.email.toLowerCase().includes(q);

      const matchesProject =
        projectFilter === "all" ||
        member.projects.some((project) => project.id === projectFilter);

      const matchesRole =
        roleFilter === "all" || member.role === (roleFilter as GlobalRole);

      const matchesWorkload =
        workloadFilter === "all" ||
        member.workload === (workloadFilter as WorkloadStatus);

      return matchesQuery && matchesProject && matchesRole && matchesWorkload;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === "workload") {
        return b.workloadPercent - a.workloadPercent;
      }
      if (sortBy === "open") {
        return b.stats.open - a.stats.open;
      }
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [query, projectFilter, roleFilter, workloadFilter, sortBy]);

  return (
    <div>
      <PageHeader
        title="Team Management"
        description="Manage team members, roles, and access across projects."
        actions={
          <Link href="/team/invite">
            <Button size="sm">
              <UserPlus size={15} />
              Invite Member
            </Button>
          </Link>
        }
      />

      <section className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <Clock3 size={16} className="text-amber-600" />
          <h2 className="text-sm font-semibold text-gray-900">
            Pending Invitations ({pendingInvites.length})
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {pendingInvites.map((invite) => (
            <PendingInviteCard key={invite.id} invite={invite} />
          ))}
        </div>
      </section>

      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members by name or role..."
            className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="h-10 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
          >
            <option value="all">All Projects</option>
            <option value="core-platform">Core Platform</option>
            <option value="mobile-app">Mobile App</option>
            <option value="core-backend">Core Backend</option>
            <option value="alpha">Alpha Initiative</option>
            <option value="auth-platform">Auth Platform</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-10 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
          >
            <option value="all">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Developer">Developer</option>
            <option value="QA">QA</option>
            <option value="Designer">Designer</option>
          </select>
          <select
            value={workloadFilter}
            onChange={(e) => setWorkloadFilter(e.target.value)}
            className="h-10 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
          >
            <option value="all">All Workloads</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Overloaded">Overloaded</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
          >
            <option value="name">Sort by: Name</option>
            <option value="workload">Sort by: Workload</option>
            <option value="open">Sort by: Open tickets</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted">
          No team members match your filters.
        </p>
      )}
    </div>
  );
}
