"use client";

import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Code2,
  Link2,
  ChevronDown,
} from "lucide-react";

const tools = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Underline, label: "Underline" },
  { icon: List, label: "Bullet list" },
  { icon: ListOrdered, label: "Numbered list" },
  { icon: Code2, label: "Code" },
  { icon: Link2, label: "Link" },
];

interface DescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function DescriptionEditor({ value, onChange }: DescriptionEditorProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-gray-50 px-2 py-2">
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs font-semibold text-gray-600 hover:bg-white"
        >
          Paragraph
          <ChevronDown size={12} />
        </button>
        <div className="mx-1 h-5 w-px bg-border" />
        {tools.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-white hover:text-gray-800"
          >
            <Icon size={15} />
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        placeholder="Describe the issue, steps to reproduce, and expected behavior."
        className="w-full resize-y bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
      />
    </div>
  );
}
