export type TicketPriority = "Critical" | "High" | "Medium" | "Low";
export type TicketStatus = "Open" | "In Progress" | "Review" | "Resolved" | "Closed";
export type TicketType = "Bug" | "Feature" | "Task" | "Epic";

export interface TicketComment {
  id: string;
  author: string;
  timeAgo: string;
  body: string;
}

export interface TicketAttachment {
  id: string;
  name: string;
  size: string;
  type: "image" | "text" | "pdf" | "other";
}

export interface Ticket {
  id: string;
  slug: string;
  title: string;
  project: string;
  projectKey: string;
  priority: TicketPriority;
  status: TicketStatus;
  type: TicketType;
  reporter: string;
  assignee: string;
  updatedAgo: string;
  createdAt: string;
  slaRemaining: string;
  tags: string[];
  description: string;
  acceptanceCriteria: string[];
  attachments: TicketAttachment[];
  comments: TicketComment[];
}

export const tickets: Ticket[] = [
  {
    id: "PROJ-102",
    slug: "proj-102",
    title: "Update navigation schema for mobile responsive",
    project: "Frontend Platform",
    projectKey: "FE",
    priority: "Critical",
    status: "In Progress",
    type: "Task",
    reporter: "Michael Ross",
    assignee: "Sarah Chen",
    updatedAgo: "2 hrs ago",
    createdAt: "Oct 20, 2023",
    slaRemaining: "4 hours remaining",
    tags: ["Security", "Auth-v2"],
    description:
      "Migrate the legacy authentication token system to OAuth 2.0 so mobile and web clients share a consistent session model. Current refresh-token handling fails on slow networks and blocks checkout recovery flows.",
    acceptanceCriteria: [
      "All legacy JWT tokens are exchanged for OAuth2 access/refresh pairs",
      "Mobile clients can recover sessions after offline periods",
      "Checkout recovery no longer fails with 401 after token rotation",
      "Legacy token endpoints return deprecation headers",
    ],
    attachments: [
      {
        id: "a1",
        name: "oauth_flow_diagram.png",
        size: "1.2 MB",
        type: "image",
      },
      {
        id: "a2",
        name: "legacy_token_logs.txt",
        size: "84 KB",
        type: "text",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "Sarah Chen",
        timeAgo: "2 hours ago",
        body: "Started the token exchange middleware. Need the staging OAuth client secrets before I can finish end-to-end tests.",
      },
      {
        id: "c2",
        author: "Michael Ross",
        timeAgo: "5 hours ago",
        body: "Priority is Critical because checkout recovery is failing for about 3% of mobile users. Please keep SLA in view.",
      },
      {
        id: "c3",
        author: "Alex Lee",
        timeAgo: "1 day ago",
        body: "Attached the current OAuth flow diagram and sample logs from the legacy service.",
      },
    ],
  },
  {
    id: "ACM-101",
    slug: "acm-101",
    title: "Migrate legacy auth tokens to OAuth2.0",
    project: "Alpha Core Migration",
    projectKey: "ACM",
    priority: "Critical",
    status: "In Progress",
    type: "Task",
    reporter: "Michael Ross",
    assignee: "Sarah Chen",
    updatedAgo: "2 hrs ago",
    createdAt: "Oct 20, 2023",
    slaRemaining: "4 hours remaining",
    tags: ["Security", "Auth-v2"],
    description:
      "Replace the legacy auth token pipeline with OAuth2.0 across Alpha Core services. This unblocks dependent migration work and reduces security risk from long-lived tokens.",
    acceptanceCriteria: [
      "Service-to-service auth uses short-lived OAuth tokens",
      "Rollback plan documented and tested in staging",
      "Monitoring dashboards show token exchange success rate",
    ],
    attachments: [
      {
        id: "a1",
        name: "oauth_flow_diagram.png",
        size: "1.2 MB",
        type: "image",
      },
      {
        id: "a2",
        name: "legacy_token_logs.txt",
        size: "84 KB",
        type: "text",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "Sarah Chen",
        timeAgo: "2 hours ago",
        body: "Migration PR is up. Waiting on security review for the new scopes.",
      },
      {
        id: "c2",
        author: "Michael Ross",
        timeAgo: "4 hours ago",
        body: "Please flag if we need an extended SLA window for the cutover.",
      },
    ],
  },
  {
    id: "UI-109",
    slug: "ui-109",
    title: "Dashboard chart empty state",
    project: "IssueTrack Web",
    projectKey: "WEB",
    priority: "Medium",
    status: "Open",
    type: "Bug",
    reporter: "Alex Lee",
    assignee: "Marcus Webb",
    updatedAgo: "1 day ago",
    createdAt: "Oct 18, 2023",
    slaRemaining: "2 days remaining",
    tags: ["UI", "Dashboard"],
    description:
      "When a project has zero tickets in the selected date range, the volume chart renders a blank area instead of an empty state.",
    acceptanceCriteria: [
      "Empty state message is shown when no data exists",
      "Chart axes remain visible for context",
    ],
    attachments: [],
    comments: [
      {
        id: "c1",
        author: "Marcus Webb",
        timeAgo: "1 day ago",
        body: "Reproduced on staging. Will add a dedicated empty illustration.",
      },
    ],
  },
  {
    id: "MOBILE-55",
    slug: "mobile-55",
    title: "Push notification delay on iOS",
    project: "Mobile App",
    projectKey: "MOB",
    priority: "High",
    status: "Review",
    type: "Bug",
    reporter: "Priya Patel",
    assignee: "Jordan Lee",
    updatedAgo: "3 hrs ago",
    createdAt: "Oct 19, 2023",
    slaRemaining: "8 hours remaining",
    tags: ["iOS", "Notifications"],
    description:
      "Push notifications arrive 30–90 seconds late on iOS 17 devices when the app is backgrounded.",
    acceptanceCriteria: [
      "Median delivery under 5 seconds in background",
      "No regressions on Android delivery times",
    ],
    attachments: [
      {
        id: "a1",
        name: "ios_delay_trace.pdf",
        size: "420 KB",
        type: "pdf",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "Jordan Lee",
        timeAgo: "3 hours ago",
        body: "Ready for review — APNs payload batching was the culprit.",
      },
    ],
  },
  {
    id: "AUTH-221",
    slug: "auth-221",
    title: "Session expiry warning banner",
    project: "Auth Platform",
    projectKey: "AUTH",
    priority: "High",
    status: "Open",
    type: "Feature",
    reporter: "Sarah Chen",
    assignee: "Priya Patel",
    updatedAgo: "6 hrs ago",
    createdAt: "Oct 21, 2023",
    slaRemaining: "1 day remaining",
    tags: ["Auth", "UX"],
    description:
      "Show a warning banner 5 minutes before session expiry so users can extend their session without losing form state.",
    acceptanceCriteria: [
      "Banner appears at T-5 minutes",
      "Extend session refreshes tokens without page reload",
    ],
    attachments: [],
    comments: [],
  },
  {
    id: "QA-390",
    slug: "qa-390",
    title: "Flaky e2e test on ticket create",
    project: "QA Suite",
    projectKey: "QA",
    priority: "Low",
    status: "Resolved",
    type: "Bug",
    reporter: "Elena Rostova",
    assignee: "Alex Lee",
    updatedAgo: "2 days ago",
    createdAt: "Oct 12, 2023",
    slaRemaining: "Completed",
    tags: ["QA", "E2E"],
    description:
      "Ticket create e2e fails intermittently when the rich text editor hydrates slowly.",
    acceptanceCriteria: [
      "Test waits for editor ready state",
      "CI flake rate below 1%",
    ],
    attachments: [],
    comments: [
      {
        id: "c1",
        author: "Alex Lee",
        timeAgo: "2 days ago",
        body: "Fixed with an explicit wait on the editor data-ready attribute.",
      },
    ],
  },
];

export function getTicket(slug: string) {
  return tickets.find(
    (ticket) => ticket.slug === slug || ticket.id.toLowerCase() === slug.toLowerCase(),
  );
}

export const ticketProjects = [
  "Frontend Platform",
  "Alpha Core Migration",
  "IssueTrack Web",
  "Mobile App",
  "Auth Platform",
  "QA Suite",
];
