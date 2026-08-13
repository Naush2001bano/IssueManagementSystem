import { notFound } from "next/navigation";
import { InviteMemberForm } from "@/components/team/InviteMemberForm";
import { getTeamMember } from "@/lib/team-data";

interface EditMemberPageProps {
  params: Promise<{ memberId: string }>;
}

export default async function EditMemberPage({ params }: EditMemberPageProps) {
  const { memberId } = await params;
  const member = getTeamMember(memberId);

  if (!member) {
    notFound();
  }

  return <InviteMemberForm mode="edit" member={member} />;
}
