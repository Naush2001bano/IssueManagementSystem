import Link from "next/link";
import {
  ArrowLeft,
  Bold,
  FileText,
  ImageIcon,
  Italic,
  Link2,
  List,
  MoreHorizontal,
  Pencil,
  Plus,
  Share2,
  X,
  ChevronUp,
  CheckSquare,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Ticket, TicketPriority, TicketStatus } from "@/lib/tickets-data";

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
  "In Progress": "info",
  Review: "success",
  Resolved: "success",
  Closed: "neutral",
};

interface TicketDetailProps {
  ticket: Ticket;
}

export function TicketDetail({ ticket }: TicketDetailProps) {
  return (
    <div>
      <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link
          href="/tickets"
          className="inline-flex items-center gap-1.5 font-semibold text-gray-600 transition hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Tickets
        </Link>
        <span>›</span>
        <Link href="/projects" className="hover:text-primary">
          Projects
        </Link>
        <span>›</span>
        <span>{ticket.project}</span>
        <span>›</span>
        <span className="font-medium text-gray-800">{ticket.id}</span>
      </nav>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {ticket.id}: {ticket.title}
          </h1>
          <div className="mt-2">
            <StatusBadge
              label={`● ${ticket.status}`}
              variant={statusVariant[ticket.status]}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/tickets/create">
            <Button size="sm">
              <Pencil size={14} />
              Edit Ticket
            </Button>
          </Link>
          <Button size="sm" variant="outline">
            <Share2 size={14} />
            Share
          </Button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-gray-500 hover:bg-gray-50"
            aria-label="More actions"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Description
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
              >
                <Pencil size={13} />
                Edit
              </button>
            </div>
            <p className="text-sm leading-6 text-gray-700">
              {ticket.description}
            </p>
            {ticket.acceptanceCriteria.length > 0 && (
              <>
                <h3 className="mt-4 mb-2 text-sm font-semibold text-gray-900">
                  Acceptance Criteria
                </h3>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-700">
                  {ticket.acceptanceCriteria.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Attachments ({ticket.attachments.length})
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
              >
                <Plus size={14} />
                Add
              </button>
            </div>
            {ticket.attachments.length === 0 ? (
              <p className="text-sm text-muted">No attachments yet.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {ticket.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 rounded-lg border border-border px-3 py-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      {file.type === "image" ? (
                        <ImageIcon size={18} />
                      ) : (
                        <FileText size={18} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted">{file.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Activity</h2>
              <select className="h-9 rounded-lg border border-border bg-white px-3 text-sm">
                <option>Show: Comments</option>
                <option>Show: All activity</option>
              </select>
            </div>

            <ul className="mb-5 space-y-4">
              {ticket.comments.map((comment) => (
                <li key={comment.id} className="flex gap-3">
                  <Avatar name={comment.author} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {comment.author}
                      </span>
                      <span className="text-xs text-muted">{comment.timeAgo}</span>
                    </div>
                    <div className="rounded-xl bg-gray-50 px-3 py-2.5 text-sm text-gray-700">
                      {comment.body}
                    </div>
                  </div>
                </li>
              ))}
              {ticket.comments.length === 0 && (
                <li className="text-sm text-muted">No comments yet.</li>
              )}
            </ul>

            <div className="flex gap-3">
              <Avatar name="Alex Morgan" size="sm" />
              <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-border">
                <textarea
                  rows={3}
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2.5 text-sm outline-none"
                />
                <div className="flex items-center justify-between border-t border-border bg-gray-50 px-2 py-2">
                  <div className="flex gap-1">
                    {[Bold, Italic, List, Link2].map((Icon, index) => (
                      <button
                        key={index}
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-white"
                      >
                        <Icon size={14} />
                      </button>
                    ))}
                  </div>
                  <Button size="sm">Comment</Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-0">
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Details
            </h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="mb-1.5 text-xs font-bold tracking-wide text-muted uppercase">
                  Assignee
                </dt>
                <dd className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-medium text-gray-900">
                    <Avatar name={ticket.assignee} size="sm" />
                    {ticket.assignee}
                  </span>
                  <button
                    type="button"
                    className="font-semibold text-primary hover:text-primary-hover"
                  >
                    Change
                  </button>
                </dd>
              </div>
              <div>
                <dt className="mb-1.5 text-xs font-bold tracking-wide text-muted uppercase">
                  Reporter
                </dt>
                <dd className="inline-flex items-center gap-2 font-medium text-gray-900">
                  <Avatar name={ticket.reporter} size="sm" />
                  {ticket.reporter}
                </dd>
              </div>
              <div>
                <dt className="mb-1.5 text-xs font-bold tracking-wide text-muted uppercase">
                  Priority
                </dt>
                <dd>
                  <span className="inline-flex items-center gap-1">
                    <ChevronUp size={14} className="text-red-600" />
                    <StatusBadge
                      label={ticket.priority}
                      variant={priorityVariant[ticket.priority]}
                    />
                  </span>
                </dd>
              </div>
              <div>
                <dt className="mb-1.5 text-xs font-bold tracking-wide text-muted uppercase">
                  Type
                </dt>
                <dd className="inline-flex items-center gap-2 font-medium text-gray-800">
                  <CheckSquare size={15} className="text-blue-600" />
                  {ticket.type}
                </dd>
              </div>
              <div>
                <dt className="mb-1.5 text-xs font-bold tracking-wide text-muted uppercase">
                  SLA Target
                </dt>
                <dd>
                  <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                    {ticket.slaRemaining}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="mb-1.5 text-xs font-bold tracking-wide text-muted uppercase">
                  Created
                </dt>
                <dd className="text-gray-700">{ticket.createdAt}</dd>
              </div>
              <div>
                <dt className="mb-1.5 text-xs font-bold tracking-wide text-muted uppercase">
                  Updated
                </dt>
                <dd className="text-gray-700">{ticket.updatedAgo}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Tags</h2>
              <button
                type="button"
                className="rounded-md p-1 text-primary hover:bg-primary-soft"
                aria-label="Add tag"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {ticket.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700"
                >
                  {tag}
                  <X size={12} className="text-gray-400" />
                </span>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
