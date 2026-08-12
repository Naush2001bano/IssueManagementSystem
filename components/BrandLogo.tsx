import { Bug } from "lucide-react";

interface BrandLogoProps {
  subtitle?: string;
  centered?: boolean;
  size?: "sm" | "md";
}

export function BrandLogo({
  subtitle,
  centered = false,
  size = "md",
}: BrandLogoProps) {
  const iconSize = size === "sm" ? "h-9 w-9" : "h-12 w-12";
  const bugSize = size === "sm" ? 18 : 22;
  const titleSize = size === "sm" ? "text-base" : "text-2xl";

  return (
    <div
      className={`flex ${centered ? "flex-col items-center text-center" : "items-center gap-3"}`}
    >
      <div
        className={`flex ${iconSize} items-center justify-center rounded-xl bg-primary text-white shadow-sm ${centered ? "mb-3" : ""}`}
      >
        <Bug size={bugSize} strokeWidth={2.25} />
      </div>
      <div className={centered ? "" : ""}>
        <p className={`font-bold tracking-tight text-gray-900 ${titleSize}`}>
          IssueTrack Pro
        </p>
        {subtitle && (
          <p
            className={`${centered ? "mt-1 text-sm text-muted" : "text-[10px] font-semibold tracking-[0.12em] text-muted uppercase"}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
