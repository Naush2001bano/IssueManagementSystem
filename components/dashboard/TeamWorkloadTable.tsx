import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";

const team = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer",
    tickets: 12,
    capacity: 95,
    status: "AT CAPACITY" as const,
  },
  {
    name: "Marcus Webb",
    role: "Frontend Dev",
    tickets: 7,
    capacity: 58,
    status: "AVAILABLE" as const,
  },
  {
    name: "Priya Patel",
    role: "Backend Lead",
    tickets: 15,
    capacity: 110,
    status: "OVERLOADED" as const,
  },
  {
    name: "Jordan Lee",
    role: "QA Engineer",
    tickets: 5,
    capacity: 42,
    status: "AVAILABLE" as const,
  },
];

const statusMap = {
  "AT CAPACITY": "info" as const,
  AVAILABLE: "success" as const,
  OVERLOADED: "danger" as const,
};

const toneMap = {
  "AT CAPACITY": "primary" as const,
  AVAILABLE: "success" as const,
  OVERLOADED: "danger" as const,
};

export function TeamWorkloadTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs font-semibold tracking-wide text-muted uppercase">
            <th className="pb-3 font-semibold">Developer</th>
            <th className="pb-3 font-semibold">Active Tickets</th>
            <th className="pb-3 font-semibold">Capacity</th>
            <th className="pb-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member) => (
            <tr key={member.name} className="border-b border-border last:border-0">
              <td className="py-3.5">
                <div className="flex items-center gap-3">
                  <Avatar name={member.name} size="sm" />
                  <div>
                    <p className="font-semibold text-gray-900">{member.name}</p>
                    <p className="text-xs text-muted">{member.role}</p>
                  </div>
                </div>
              </td>
              <td className="py-3.5 font-semibold text-gray-800">{member.tickets}</td>
              <td className="py-3.5 min-w-[160px]">
                <ProgressBar
                  value={Math.min(member.capacity, 100)}
                  tone={toneMap[member.status]}
                />
              </td>
              <td className="py-3.5">
                <StatusBadge
                  label={member.status}
                  variant={statusMap[member.status]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
