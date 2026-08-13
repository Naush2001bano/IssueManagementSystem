"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bold,
  Italic,
  List,
  ListOrdered,
  ImageIcon,
  UserPlus,
  X,
  ChevronsUp,
  ChevronUp,
  Equal,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { categories, clients } from "@/lib/projects-data";

const teamPool = [
  { id: "sarah", name: "Sarah Jenkins", role: "Project Manager", color: "bg-violet-600" },
  { id: "david", name: "David Kim", role: "Lead Developer", color: "bg-orange-500" },
  { id: "maria", name: "Maria Rodriguez", role: "Developer", color: "bg-emerald-600" },
  { id: "elena", name: "Elena Rostova", role: "QA", color: "bg-blue-600" },
];

export function CreateProjectForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Application");
  const [manager, setManager] = useState("");
  const [lead, setLead] = useState("");
  const [teamQuery, setTeamQuery] = useState("");
  const [team, setTeam] = useState(teamPool.slice(0, 2));
  const [sla, setSla] = useState({
    critical: 4,
    high: 8,
    medium: 24,
    low: 72,
  });

  function goBack() {
    router.push("/projects");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    goBack();
  }

  function addMember(id: string) {
    const member = teamPool.find((item) => item.id === id);
    if (!member || team.some((item) => item.id === id)) return;
    setTeam((prev) => [...prev, member]);
    setTeamQuery("");
  }

  function removeMember(id: string) {
    setTeam((prev) => prev.filter((item) => item.id !== id));
  }

  const suggestions = teamPool.filter(
    (member) =>
      member.name.toLowerCase().includes(teamQuery.toLowerCase()) &&
      !team.some((item) => item.id === member.id),
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-gray-600 transition hover:bg-gray-50 hover:text-primary"
            aria-label="Back to Projects"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Create New Project
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" onClick={goBack}>
            Cancel
          </Button>
          <Button type="submit">Create Project</Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Basic Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Project Name *"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Phoenix E-Commerce Platform"
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">
                  Client Name
                </label>
                <select
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select an existing client...</option>
                  {clients.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Input
                  label="Project Key *"
                  name="key"
                  required
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  placeholder="E.G. PHX"
                />
                <p className="mt-1.5 text-xs text-muted">
                  Used as a prefix for issue IDs (e.g. PHX-123).
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Project Details
            </h2>
            <label className="mb-1.5 block text-sm font-semibold text-gray-800">
              Description
            </label>
            <div className="mb-4 overflow-hidden rounded-lg border border-border">
              <div className="flex gap-1 border-b border-border bg-gray-50 px-2 py-2">
                {[Bold, Italic, List, ListOrdered].map((Icon, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-white"
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the project goals and scope..."
                className="w-full px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-800">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-1 text-base font-semibold text-gray-900">
              SLA Resolution Targets
            </h2>
            <p className="mb-4 text-sm text-muted">
              Define default resolution times based on issue priority.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  {
                    key: "critical",
                    label: "Critical",
                    icon: ChevronsUp,
                    color: "text-red-600",
                  },
                  {
                    key: "high",
                    label: "High",
                    icon: ChevronUp,
                    color: "text-orange-500",
                  },
                  {
                    key: "medium",
                    label: "Medium",
                    icon: Equal,
                    color: "text-amber-500",
                  },
                  {
                    key: "low",
                    label: "Low",
                    icon: ChevronDown,
                    color: "text-blue-600",
                  },
                ] as const
              ).map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-3"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <Icon size={16} className={item.color} />
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={sla[item.key]}
                        onChange={(e) =>
                          setSla((prev) => ({
                            ...prev,
                            [item.key]: Number(e.target.value),
                          }))
                        }
                        className="h-9 w-20 rounded-lg border border-border px-2 text-sm outline-none focus:border-primary"
                      />
                      <span className="text-xs text-muted">Hours</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Branding
            </h2>
            <button
              type="button"
              className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-gray-50 px-4 py-8 text-center hover:border-primary/40"
            >
              <ImageIcon size={22} className="mb-2 text-gray-400" />
              <p className="text-sm font-semibold text-primary">
                Click or drag image here
              </p>
              <p className="mt-1 text-xs text-muted">
                SVG, PNG, JPG (max 2MB)
              </p>
            </button>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Leadership
            </h2>
            <div className="space-y-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">
                  Project Manager
                </label>
                <select
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary"
                >
                  <option value="">Select user...</option>
                  {teamPool.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">
                  Lead Developer
                </label>
                <select
                  value={lead}
                  onChange={(e) => setLead(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary"
                >
                  <option value="">Select user...</option>
                  {teamPool.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Initial Team
              </h2>
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold text-primary">
                {team.length} Added
              </span>
            </div>
            <div className="relative mb-3">
              <UserPlus
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={teamQuery}
                onChange={(e) => setTeamQuery(e.target.value)}
                placeholder="Search team members..."
                className="h-11 w-full rounded-lg border border-border bg-gray-50 pl-9 pr-3 text-sm outline-none focus:border-primary focus:bg-white"
              />
              {teamQuery && suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-border bg-white shadow-lg">
                  {suggestions.map((member) => (
                    <li key={member.id}>
                      <button
                        type="button"
                        onClick={() => addMember(member.id)}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm hover:bg-gray-50"
                      >
                        <Avatar name={member.name} size="sm" />
                        {member.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ul className="space-y-2">
              {team.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${member.color}`}
                  >
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted">{member.role}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    aria-label={`Remove ${member.name}`}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </form>
  );
}
