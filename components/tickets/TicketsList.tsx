"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  tickets as allTickets,
  ticketProjects,
  type TicketPriority,
  type TicketStatus,
} from "@/lib/tickets-data";

const priorityVariant: Record<
  TicketPriority,
  "danger" | "warning" | "info" | "neutral"
> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "neutral",
};

const statusVariant: Record<
  TicketStatus,
  "info" | "warning" | "success" | "neutral"
> = {
  Open: "info",
  "In Progress": "warning",
  Review: "success",
  Resolved: "success",
  Closed: "neutral",
};

export function TicketsList() {
  const [selected, setSelected] = useState<string[]>([]);
  const [project, setProject] = useState("all");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [assigneeQuery, setAssigneeQuery] = useState("");

  const filtered = useMemo(() => {
    const q = assigneeQuery.trim().toLowerCase();
    return allTickets.filter((ticket) => {
      const matchesProject = project === "all" || ticket.project === project;
      const matchesStatus =
        status === "all" || ticket.status === (status as TicketStatus);
      const matchesPriority =
        priority === "all" || ticket.priority === (priority as TicketPriority);
      const matchesAssignee =
        !q ||
        ticket.assignee.toLowerCase().includes(q) ||
        ticket.title.toLowerCase().includes(q) ||
        ticket.id.toLowerCase().includes(q);
      return (
        matchesProject && matchesStatus && matchesPriority && matchesAssignee
      );
    });
  }, [project, status, priority, assigneeQuery]);

  function toggleAll() {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((ticket) => ticket.id));
    }
  }

  function toggleOne(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  return (
    <div>
      <PageHeader
        title="My Tickets"
        description="Manage and track your assigned issues"
        actions={
          <Link href="/tickets/create">
            <Button size="sm">
              <Plus size={15} />
              Create Ticket
            </Button>
          </Link>
        }
      />

      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border bg-surface p-3 shadow-sm xl:flex-row xl:items-center">
        <div className="flex flex-wrap gap-2">
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="h-10 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary"
          >
            <option value="all">All Projects</option>
            {ticketProjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary"
          >
            <option value="all">Status: Any</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-10 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary"
          >
            <option value="all">Priority: All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="relative min-w-[180px] flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={assigneeQuery}
            onChange={(e) => setAssigneeQuery(e.target.value)}
            placeholder="Assignee..."
            className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <SlidersHorizontal size={14} />
            More
          </button>
          <span className="text-sm text-muted">{selected.length} Selected</span>
          <Button size="sm" variant="outline" disabled={selected.length === 0}>
            Assign
          </Button>
          <Button size="sm" variant="outline" disabled={selected.length === 0}>
            Update Status
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50 text-xs font-semibold tracking-wide text-muted uppercase">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      filtered.length > 0 && selected.length === filtered.length
                    }
                    onChange={toggleAll}
                    className="h-4 w-4 accent-primary"
                    aria-label="Select all tickets"
                  />
                </th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Reporter</th>
                <th className="px-4 py-3">Assignee</th>
                <th className="px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="group relative border-b border-border last:border-0 hover:bg-gray-50/80"
                >
                  <td className="relative z-10 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.includes(ticket.id)}
                      onChange={() => toggleOne(ticket.id)}
                      className="h-4 w-4 accent-primary"
                      aria-label={`Select ${ticket.id}`}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <Link
                      href={`/tickets/${ticket.slug}`}
                      className="font-semibold text-primary after:absolute after:inset-0"
                    >
                      {ticket.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-gray-900 group-hover:text-primary">
                    {ticket.title}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge
                      label={ticket.priority}
                      variant={priorityVariant[ticket.priority]}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge
                      label={ticket.status}
                      variant={statusVariant[ticket.status]}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={ticket.reporter} size="sm" />
                      <span className="text-gray-700">{ticket.reporter}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={ticket.assignee} size="sm" />
                      <span className="text-gray-700">{ticket.assignee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-muted">{ticket.updatedAgo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-gray-50 px-4 py-3 text-sm text-muted">
          <span>
            Showing 1 to {filtered.length} of {filtered.length} results
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                className={`h-8 min-w-8 rounded-md px-2 ${
                  page === 1
                    ? "bg-primary text-white"
                    : "border border-border bg-white hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="h-8 rounded-md border border-border bg-white px-2 hover:bg-gray-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
