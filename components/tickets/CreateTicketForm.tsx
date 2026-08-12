"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FolderKanban, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/SelectField";
import { DescriptionEditor } from "@/components/tickets/DescriptionEditor";
import { FileUploadZone } from "@/components/tickets/FileUploadZone";
import {
  IssueTypePicker,
  type IssueType,
} from "@/components/tickets/IssueTypePicker";
import {
  PriorityPicker,
  type Priority,
} from "@/components/tickets/PriorityPicker";

const projects = [
  { value: "fe", label: "Frontend Platform (FE)" },
  { value: "auth", label: "Auth Platform (AUTH)" },
  { value: "mobile", label: "Mobile App (MOB)" },
  { value: "qa", label: "QA Suite (QA)" },
];

const assignees = [
  { value: "sarah", label: "Sarah Chen" },
  { value: "marcus", label: "Marcus Webb" },
  { value: "priya", label: "Priya Patel" },
  { value: "jordan", label: "Jordan Lee" },
];

export function CreateTicketForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("fe");
  const [issueType, setIssueType] = useState<IssueType>("Bug");
  const [priority, setPriority] = useState<Priority>("High");
  const [assignee, setAssignee] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/tickets");
  }

  function handleDraft() {
    router.push("/tickets");
  }

  return (
    <form onSubmit={handleSubmit} className="-m-6 flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 p-6 pb-8">
        <nav className="mb-2 text-sm text-muted">
          <Link href="/tickets" className="hover:text-primary">
            My Tickets
          </Link>
          <span className="mx-1.5">›</span>
          <span className="text-gray-700">Create New Ticket</span>
        </nav>
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
          Create Ticket
        </h1>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-4">
            <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <label
                htmlFor="issue-title"
                className="mb-1.5 block text-sm font-semibold text-gray-800"
              >
                Issue Title <span className="text-red-500">*</span>
              </label>
              <input
                id="issue-title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., API returning 500 error on checkout"
                className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </section>

            <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <label className="mb-1.5 block text-sm font-semibold text-gray-800">
                Description
              </label>
              <DescriptionEditor
                value={description}
                onChange={setDescription}
              />
            </section>

            <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <FileUploadZone />
            </section>
          </div>

          <aside className="h-fit rounded-xl border border-border bg-surface p-5 shadow-sm xl:sticky xl:top-6">
            <h2 className="mb-4 text-base font-bold text-gray-900">
              Ticket Metadata
            </h2>

            <div className="flex flex-col gap-5">
              <SelectField
                label="Project"
                icon={<FolderKanban size={16} />}
                value={project}
                onChange={setProject}
                options={projects}
              />

              <IssueTypePicker value={issueType} onChange={setIssueType} />

              <PriorityPicker value={priority} onChange={setPriority} />

              <SelectField
                label="Assignee"
                icon={<User size={16} />}
                value={assignee}
                onChange={setAssignee}
                options={assignees}
                placeholder="Search team members..."
              />
            </div>
          </aside>
        </div>
      </div>

      <div className="sticky bottom-0 z-20 flex items-center justify-end gap-3 border-t border-border bg-surface px-6 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <Button type="button" variant="outline" onClick={handleDraft}>
          Save Draft
        </Button>
        <Button type="submit">
          <Plus size={16} />
          Create Ticket
        </Button>
      </div>
    </form>
  );
}
