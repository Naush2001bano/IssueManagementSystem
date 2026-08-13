import type { PendingInvite } from "@/lib/team-data";

interface PendingInviteCardProps {
  invite: PendingInvite;
}

export function PendingInviteCard({ invite }: PendingInviteCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${invite.color}`}
      >
        {invite.initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900">
          {invite.email}
        </p>
        <p className="text-xs text-muted">
          Invited as {invite.role} • {invite.invitedAgo}
        </p>
      </div>
    </div>
  );
}
