import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

const projects = [
  {
    name: "Auth Platform",
    key: "AUTH",
    tickets: 24,
    progress: 72,
    status: "Active",
  },
  {
    name: "IssueTrack Web",
    key: "WEB",
    tickets: 41,
    progress: 58,
    status: "Active",
  },
  {
    name: "Mobile App",
    key: "MOB",
    tickets: 18,
    progress: 35,
    status: "Active",
  },
  {
    name: "QA Suite",
    key: "QA",
    tickets: 9,
    progress: 90,
    status: "On Hold",
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="All workspaces and delivery streams in your organization."
        actions={
          <Button size="sm">
            <Plus size={15} />
            New Project
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.key}>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  {project.key}
                </p>
                <h3 className="mt-1 text-lg font-bold text-gray-900">
                  {project.name}
                </h3>
              </div>
              <StatusBadge
                label={project.status}
                variant={project.status === "Active" ? "success" : "warning"}
              />
            </div>
            <p className="mb-3 text-sm text-muted">
              {project.tickets} open tickets
            </p>
            <ProgressBar value={project.progress} tone="primary" />
          </Card>
        ))}
      </div>
    </div>
  );
}
