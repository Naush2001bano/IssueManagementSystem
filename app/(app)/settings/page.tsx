import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage workspace preferences and notification defaults."
      />

      <div className="mx-auto grid max-w-3xl gap-4">
        <Card title="Workspace Profile">
          <div className="flex flex-col gap-4">
            <Input
              label="Workspace Name"
              name="workspace"
              defaultValue="IssueTrack Pro Enterprise"
            />
            <Input
              label="Support Email"
              name="supportEmail"
              type="email"
              defaultValue="support@issuetrack.pro"
            />
            <div className="flex justify-end">
              <Button size="sm">Save Changes</Button>
            </div>
          </div>
        </Card>

        <Card title="Notifications">
          <div className="flex flex-col gap-3">
            <Checkbox
              name="slaAlerts"
              label="Email me when an SLA is at risk"
              defaultChecked
            />
            <Checkbox
              name="assignments"
              label="Notify when a ticket is assigned to me"
              defaultChecked
            />
            <Checkbox
              name="weeklyDigest"
              label="Send weekly workload digest"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
