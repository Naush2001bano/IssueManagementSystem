"use client";

type IssueType = "Bug" | "Feature" | "Task" | "Epic";

const types: { value: IssueType; activeClass: string }[] = [
  { value: "Bug", activeClass: "border-red-300 bg-red-50 text-red-700" },
  { value: "Feature", activeClass: "border-violet-300 bg-violet-50 text-violet-700" },
  { value: "Task", activeClass: "border-blue-300 bg-blue-50 text-blue-700" },
  { value: "Epic", activeClass: "border-amber-300 bg-amber-50 text-amber-700" },
];

interface IssueTypePickerProps {
  value: IssueType;
  onChange: (value: IssueType) => void;
}

export function IssueTypePicker({ value, onChange }: IssueTypePickerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold tracking-wide text-muted uppercase">
        Issue Type
      </span>
      <div className="grid grid-cols-2 gap-2">
        {types.map((type) => {
          const active = value === type.value;
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange(type.value)}
              className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                active
                  ? type.activeClass
                  : "border-border bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {type.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { IssueType };
