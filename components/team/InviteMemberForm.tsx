"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Send, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  availableProjects,
  globalRoles,
  projectRoles,
  type AssignedProject,
  type GlobalRole,
  type ProjectRole,
  type TeamMember,
} from "@/lib/team-data";

interface InviteMemberFormProps {
  mode?: "invite" | "edit";
  member?: TeamMember;
}

export function InviteMemberForm({
  mode = "invite",
  member,
}: InviteMemberFormProps) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [emails, setEmails] = useState(member?.email ?? "");
  const [fullName, setFullName] = useState(member?.name ?? "");
  const [role, setRole] = useState<GlobalRole>(member?.role ?? "Developer");
  const [message, setMessage] = useState(
    member?.message ??
      (isEdit ? "" : "Welcome to the team! Here is access to your starting projects."),
  );
  const [projectQuery, setProjectQuery] = useState("");
  const [assigned, setAssigned] = useState<AssignedProject[]>(
    member?.projects ?? [
      {
        id: "alpha",
        name: "Alpha Initiative",
        initials: "AI",
        color: "bg-orange-500",
        role: "Contributor",
      },
      {
        id: "core-backend",
        name: "Core Backend",
        initials: "CB",
        color: "bg-blue-600",
        role: "Lead",
      },
    ],
  );

  const suggestions = useMemo(() => {
    const q = projectQuery.trim().toLowerCase();
    if (!q) return [];
    return availableProjects.filter(
      (project) =>
        project.name.toLowerCase().includes(q) &&
        !assigned.some((item) => item.id === project.id),
    );
  }, [projectQuery, assigned]);

  function addProject(projectId: string) {
    const project = availableProjects.find((item) => item.id === projectId);
    if (!project) return;
    setAssigned((prev) => [...prev, { ...project, role: "Contributor" }]);
    setProjectQuery("");
  }

  function removeProject(projectId: string) {
    setAssigned((prev) => prev.filter((item) => item.id !== projectId));
  }

  function updateProjectRole(projectId: string, nextRole: ProjectRole) {
    setAssigned((prev) =>
      prev.map((item) =>
        item.id === projectId ? { ...item, role: nextRole } : item,
      ),
    );
  }

  function goBack() {
    router.push("/team");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    goBack();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={goBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Team
      </button>

      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {isEdit ? "Edit Team Member" : "Invite Team Member"}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {isEdit
          ? "Update member details, role, and project access levels."
          : "Add new members to your organization and assign their project access levels."}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
      >
        <div className="space-y-6 p-6">
          <div>
            <label
              htmlFor="emails"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              Email Address(es)
            </label>
            <textarea
              id="emails"
              required
              rows={2}
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="user@company.com, another@company.com..."
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              readOnly={isEdit}
            />
            {!isEdit && (
              <p className="mt-1.5 text-xs text-muted">
                Separate multiple emails with commas.
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Full Name (Optional)"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
            />
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="global-role"
                className="text-sm font-semibold text-gray-800"
              >
                Global Role
              </label>
              <select
                id="global-role"
                value={role}
                onChange={(e) => setRole(e.target.value as GlobalRole)}
                className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {globalRoles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Assign to Projects
            </h3>
            <div className="relative mb-3">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={projectQuery}
                onChange={(e) => setProjectQuery(e.target.value)}
                placeholder="Search projects to assign..."
                className="h-11 w-full rounded-lg border border-border bg-gray-50 pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-border bg-white shadow-lg">
                  {suggestions.map((project) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => addProject(project.id)}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-gray-50"
                      >
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white ${project.color}`}
                        >
                          {project.initials}
                        </span>
                        {project.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ul className="space-y-2">
              {assigned.map((project) => (
                <li
                  key={project.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-white px-3 py-2.5"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${project.color}`}
                  >
                    {project.initials}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">
                    {project.name}
                  </span>
                  <select
                    value={project.role}
                    onChange={(e) =>
                      updateProjectRole(
                        project.id,
                        e.target.value as ProjectRole,
                      )
                    }
                    className="h-9 rounded-lg border border-border bg-gray-50 px-2 text-sm outline-none focus:border-primary"
                  >
                    {projectRoles.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    aria-label={`Remove ${project.name}`}
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              Personal Message (Optional)
            </label>
            <textarea
              id="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Welcome to the team! Here is access to your starting projects."
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border bg-gray-50 px-6 py-4">
          <Button type="button" variant="outline" onClick={goBack}>
            {isEdit ? "Discard changes" : "Cancel"}
          </Button>
          <Button type="submit">
            {!isEdit && <Send size={15} />}
            {isEdit ? "Save" : "Send Invitation"}
          </Button>
        </div>
      </form>
    </div>
  );
}
