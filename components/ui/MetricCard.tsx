import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  badge?: ReactNode;
  alert?: boolean;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  badge,
  alert,
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-5 shadow-sm ${alert ? "border-t-4 border-t-danger" : ""} ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
            {icon}
          </div>
        )}
      </div>
      {badge && <div className="mt-3">{badge}</div>}
    </div>
  );
}
