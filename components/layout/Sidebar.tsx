"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Ticket,
  FolderKanban,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/Button";
import { SidebarItem } from "@/components/layout/SidebarItem";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tickets", label: "My Tickets", icon: Ticket },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/team", label: "Team", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="border-b border-border px-5 py-5">
        <BrandLogo subtitle="Enterprise Edition" size="sm" />
      </div>

      <div className="px-4 pt-4">
        <Link href="/tickets/create">
          <Button fullWidth size="md" className="shadow-sm">
            <Plus size={18} />
            Create Ticket
          </Button>
        </Link>
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        {mainNav.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-border px-3 py-4">
        <SidebarItem href="/help" label="Help Center" icon={HelpCircle} />
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <LogOut size={18} />
          Log Out
        </Link>
      </div>
    </aside>
  );
}
