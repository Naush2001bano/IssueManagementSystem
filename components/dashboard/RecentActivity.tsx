import {
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-50",
    text: "Sarah J. resolved PROJ-842",
    time: "2 min ago",
  },
  {
    icon: AlertTriangle,
    color: "text-red-600 bg-red-50",
    text: "SLA breach warning on AUTH-221",
    time: "18 min ago",
  },
  {
    icon: MessageSquare,
    color: "text-blue-600 bg-blue-50",
    text: "Marcus commented on UI-109",
    time: "1 hr ago",
  },
  {
    icon: UserPlus,
    color: "text-indigo-600 bg-indigo-50",
    text: "Priya assigned to MOBILE-55",
    time: "3 hr ago",
  },
  {
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-50",
    text: "Jordan closed QA-390",
    time: "5 hr ago",
  },
];

export function RecentActivity() {
  return (
    <div className="flex flex-col">
      <ul className="space-y-4">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.text} className="flex gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.color}`}
              >
                <Icon size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800">{item.text}</p>
                <p className="mt-0.5 text-xs text-muted">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="mt-5 text-left text-sm font-semibold text-primary hover:text-primary-hover"
      >
        View Audit Log →
      </button>
    </div>
  );
}
