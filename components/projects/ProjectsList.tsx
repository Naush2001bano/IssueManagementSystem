"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ProjectCard, ProjectsTable } from "@/components/projects/ProjectCard";
import {
  projects as allProjects,
  type ProjectHealth,
  type ProjectStatus,
} from "@/lib/projects-data";

export function ProjectsList() {
  const [view, setView] = useState<"card" | "table">("card");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [health, setHealth] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = allProjects.filter((project) => {
      const matchesQuery =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.key.toLowerCase().includes(q);

      const matchesStatus =
        status === "all" || project.status === (status as ProjectStatus);

      const matchesHealth =
        health === "all" || project.health === (health as ProjectHealth);

      return matchesQuery && matchesStatus && matchesHealth;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "progress") return b.progress - a.progress;
      if (sortBy === "overdue") return b.overdue - a.overdue;
      return 0;
    });

    return list;
  }, [query, status, health, sortBy]);

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Manage and monitor active initiatives."
        actions={
          <Link href="/projects/create">
            <Button size="sm">
              <Plus size={15} />
              Create Project
            </Button>
          </Link>
        }
      />

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
            placeholder="Search by name/client..."
            className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
          >
            <option value="all">Status: All</option>
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={health}
            onChange={(e) => setHealth(e.target.value)}
            className="h-10 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
          >
            <option value="all">Health: All</option>
            <option value="On Track">On Track</option>
            <option value="At Risk">At Risk</option>
            <option value="Overdue">Overdue</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
          >
            <option value="updated">Sort by: Recently updated</option>
            <option value="name">Sort by: Name</option>
            <option value="progress">Sort by: Progress</option>
            <option value="overdue">Sort by: Overdue</option>
          </select>

          <div className="inline-flex rounded-lg border border-border bg-surface p-1">
            <button
              type="button"
              onClick={() => setView("card")}
              className={`rounded-md p-2 transition ${
                view === "card"
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              aria-label="Card view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              onClick={() => setView("table")}
              className={`rounded-md p-2 transition ${
                view === "table"
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              aria-label="Table view"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {view === "card" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <ProjectsTable projects={filtered} />
      )}

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted">
          No projects match your filters.
        </p>
      )}
    </div>
  );
}
