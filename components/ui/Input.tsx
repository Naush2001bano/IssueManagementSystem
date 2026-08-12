import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  rightSlot?: ReactNode;
}

export function Input({
  label,
  icon,
  rightSlot,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {(label || rightSlot) && (
        <div className="flex items-center justify-between">
          {label ? (
            <label
              htmlFor={inputId}
              className="text-sm font-semibold text-gray-800"
            >
              {label}
            </label>
          ) : (
            <span />
          )}
          {rightSlot}
        </div>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`h-11 w-full rounded-lg border border-border bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 ${icon ? "pl-10 pr-3" : "px-3"} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
