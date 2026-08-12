"use client";

import {
  ChevronsUp,
  ChevronUp,
  Equal,
  ChevronDown,
  Timer,
} from "lucide-react";

export type Priority = "Critical" | "High" | "Medium" | "Low";

const priorities: {
  value: Priority;
  icon: typeof ChevronsUp;
  color: string;
  radioClass: string;
  activeClass: string;
}[] = [
  {
    value: "Critical",
    icon: ChevronsUp,
    color: "text-red-600",
    radioClass: "border-red-600 bg-red-600",
    activeClass: "border-red-300 bg-red-50",
  },
  {
    value: "High",
    icon: ChevronUp,
    color: "text-red-500",
    radioClass: "border-red-500 bg-red-500",
    activeClass: "border-red-300 bg-red-50",
  },
  {
    value: "Medium",
    icon: Equal,
    color: "text-blue-600",
    radioClass: "border-blue-600 bg-blue-600",
    activeClass: "border-blue-300 bg-blue-50",
  },
  {
    value: "Low",
    icon: ChevronDown,
    color: "text-emerald-600",
    radioClass: "border-emerald-600 bg-emerald-600",
    activeClass: "border-emerald-300 bg-emerald-50",
  },
];

const slaByPriority: Record<Priority, { response: string; resolution: string }> = {
  Critical: { response: "1 Hour", resolution: "4 Hours" },
  High: { response: "4 Hours", resolution: "24 Hours" },
  Medium: { response: "8 Hours", resolution: "3 Days" },
  Low: { response: "24 Hours", resolution: "7 Days" },
};

interface PriorityPickerProps {
  value: Priority;
  onChange: (value: Priority) => void;
}

export function PriorityPicker({ value, onChange }: PriorityPickerProps) {
  const sla = slaByPriority[value];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold tracking-wide text-muted uppercase">
          Priority
        </span>
        <div className="flex flex-col gap-2">
          {priorities.map((item) => {
            const Icon = item.icon;
            const active = value === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onChange(item.value)}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                  active
                    ? item.activeClass
                    : "border-border bg-white hover:bg-gray-50"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    active ? item.radioClass : "border-gray-300 bg-white"
                  }`}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <Icon size={16} className={item.color} />
                <span className="text-sm font-semibold text-gray-800">
                  {item.value}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-gray-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Timer size={16} className="text-gray-600" />
          SLA Target
        </div>
        <p className="text-sm text-gray-700">
          First Response:{" "}
          <span className="font-bold text-red-600">{sla.response}</span>
        </p>
        <p className="text-sm text-gray-700">
          Resolution:{" "}
          <span className="font-bold text-red-600">{sla.resolution}</span>
        </p>
        <p className="mt-2 text-xs text-muted">
          Based on &apos;{value}&apos; priority selection
        </p>
      </div>
    </div>
  );
}
