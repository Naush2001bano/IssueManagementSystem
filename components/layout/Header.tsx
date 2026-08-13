"use client";

import { Bell, HelpCircle, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export function Header() {
  return (
    <header className="z-20 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-surface px-6">
      <div className="relative max-w-xl flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          placeholder="Search tickets, projects, users..."
          className="h-10 w-full rounded-lg border border-border bg-gray-50 pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          aria-label="Help"
        >
          <HelpCircle size={18} />
        </button>
        <Avatar name="Alex Morgan" size="md" className="ml-1" />
      </div>
    </header>
  );
}
