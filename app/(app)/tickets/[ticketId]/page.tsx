import { notFound } from "next/navigation";
import { TicketDetail } from "@/components/tickets/TicketDetail";
import { getTicket } from "@/lib/tickets-data";

interface TicketDetailPageProps {
  params: Promise<{ ticketId: string }>;
}

export default async function TicketDetailPage({
  params,
}: TicketDetailPageProps) {
  const { ticketId } = await params;
  const ticket = getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return <TicketDetail ticket={ticket} />;
}
