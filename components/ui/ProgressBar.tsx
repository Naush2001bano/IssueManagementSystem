interface ProgressBarProps {
  value: number;
  tone?: "primary" | "success" | "warning" | "danger";
  showLabel?: boolean;
  className?: string;
}

const tones = {
  primary: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
};

export function ProgressBar({
  value,
  tone = "primary",
  showLabel = true,
  className = "",
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all ${tones[tone]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-10 text-right text-xs font-semibold text-gray-600">
          {clamped}%
        </span>
      )}
    </div>
  );
}
