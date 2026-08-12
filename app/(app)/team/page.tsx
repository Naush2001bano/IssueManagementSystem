import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

const members = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer",
    tickets: 12,
    capacity: 95,
    status: "At Capacity",
  },
  {
    name: "Marcus Webb",
    role: "Frontend Dev",
    tickets: 7,
    capacity: 58,
    status: "Available",
  },
  {
    name: "Priya Patel",
    role: "Backend Lead",
    tickets: 15,
    capacity: 100,
    status: "Overloaded",
  },
  {
    name: "Jordan Lee",
    role: "QA Engineer",
    tickets: 5,
    capacity: 42,
    status: "Available",
  },
  {
    name: "Alex Morgan",
    role: "Product Manager",
    tickets: 3,
    capacity: 30,
    status: "Available",
  },
  {
    name: "Sam Rivera",
    role: "Designer",
    tickets: 6,
    capacity: 65,
    status: "Available",
  },
];

const statusVariant = {
  Available: "success",
  "At Capacity": "info",
  Overloaded: "danger",
} as const;

export default function TeamPage() {
  return (
    <div>
      <PageHeader
        title="Team"
        description="People, capacity, and assignment overview."
        actions={
          <Button size="sm">
            <Plus size={15} />
            Invite Member
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <Card key={member.name}>
            <div className="mb-4 flex items-center gap-3">
              <Avatar name={member.name} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">{member.name}</p>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
              <StatusBadge
                label={member.status}
                variant={statusVariant[member.status as keyof typeof statusVariant]}
              />
            </div>
            <p className="mb-2 text-sm text-muted">
              {member.tickets} active tickets
            </p>
            <ProgressBar
              value={member.capacity}
              tone={
                member.status === "Overloaded"
                  ? "danger"
                  : member.status === "At Capacity"
                    ? "primary"
                    : "success"
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
