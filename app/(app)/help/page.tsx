import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { BookOpen, LifeBuoy, MessageCircle, FileText } from "lucide-react";

const resources = [
  {
    title: "Getting Started",
    description: "Learn how to create tickets, invite teammates, and set SLAs.",
    icon: BookOpen,
  },
  {
    title: "Contact Support",
    description: "Reach our enterprise support desk for urgent issues.",
    icon: LifeBuoy,
  },
  {
    title: "Community Forum",
    description: "Ask questions and share tips with other IssueTrack teams.",
    icon: MessageCircle,
  },
  {
    title: "API Documentation",
    description: "Integrate IssueTrack Pro with your internal tools.",
    icon: FileText,
  },
];

export default function HelpPage() {
  return (
    <div>
      <PageHeader
        title="Help Center"
        description="Guides, support, and documentation for IssueTrack Pro."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon size={18} />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
              <button
                type="button"
                className="mt-4 text-sm font-semibold text-primary hover:text-primary-hover"
              >
                Learn more →
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
