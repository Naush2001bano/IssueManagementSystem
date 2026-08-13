export type ProjectHealth = "On Track" | "At Risk" | "Overdue";
export type ProjectStatus = "Active" | "On Hold" | "Completed";
export type TicketPriority = "Critical" | "High" | "Medium" | "Low";
export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface ProjectMember {
  id: string;
  name: string;
  shortName: string;
  role: string;
  activeTickets: number;
  capacity: number;
  highLoad?: boolean;
}

export interface ProjectTicket {
  id: string;
  title: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignee: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  client: string;
  clientInitials: string;
  clientColor: string;
  health: ProjectHealth;
  status: ProjectStatus;
  progress: number;
  totalTickets: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  overdue: number;
  priorityCounts: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  team: ProjectMember[];
  updatedAgo: string;
  targetDate: string;
  starred?: boolean;
  tickets: ProjectTicket[];
}

export const projects: Project[] = [
  {
    id: "alpha-core-migration",
    name: "Alpha Core Migration",
    key: "PRJ-4092",
    client: "Acme Corp",
    clientInitials: "AC",
    clientColor: "bg-violet-600",
    health: "On Track",
    status: "Active",
    progress: 75,
    totalTickets: 142,
    open: 12,
    inProgress: 20,
    resolved: 4,
    closed: 106,
    overdue: 3,
    priorityCounts: { critical: 2, high: 5, medium: 8, low: 4 },
    updatedAgo: "2 hrs ago",
    targetDate: "Oct 15, 2024",
    starred: true,
    team: [
      {
        id: "sarah",
        name: "Sarah Jenkins",
        shortName: "Sarah J.",
        role: "Project Manager",
        activeTickets: 8,
        capacity: 70,
      },
      {
        id: "mike",
        name: "Mike Torres",
        shortName: "Mike T.",
        role: "Lead Developer",
        activeTickets: 12,
        capacity: 92,
        highLoad: true,
      },
      {
        id: "alex",
        name: "Alex Lee",
        shortName: "Alex L.",
        role: "Developer",
        activeTickets: 5,
        capacity: 45,
      },
    ],
    tickets: [
      {
        id: "ACM-101",
        title: "Migrate legacy auth tokens...",
        priority: "Critical",
        status: "In Progress",
        assignee: "Sarah J.",
      },
      {
        id: "ACM-104",
        title: "Update database schema...",
        priority: "High",
        status: "Open",
        assignee: "Mike T.",
      },
      {
        id: "ACM-112",
        title: "Deprecate v1 API endpoints",
        priority: "Medium",
        status: "Closed",
        assignee: "Alex L.",
      },
    ],
  },
  {
    id: "q3-platform-migration",
    name: "Q3 Platform Migration",
    key: "PRJ-4101",
    client: "Acme Corp",
    clientInitials: "AC",
    clientColor: "bg-indigo-600",
    health: "On Track",
    status: "Active",
    progress: 75,
    totalTickets: 142,
    open: 12,
    inProgress: 20,
    resolved: 4,
    closed: 106,
    overdue: 3,
    priorityCounts: { critical: 1, high: 4, medium: 10, low: 6 },
    updatedAgo: "2 hrs ago",
    targetDate: "Nov 30, 2024",
    team: [
      {
        id: "sarah",
        name: "Sarah Jenkins",
        shortName: "Sarah J.",
        role: "Project Manager",
        activeTickets: 6,
        capacity: 55,
      },
      {
        id: "maria",
        name: "Maria Rodriguez",
        shortName: "Maria R.",
        role: "Developer",
        activeTickets: 9,
        capacity: 68,
      },
    ],
    tickets: [
      {
        id: "Q3P-12",
        title: "Cut over staging cluster",
        priority: "High",
        status: "In Progress",
        assignee: "Maria R.",
      },
      {
        id: "Q3P-18",
        title: "Document rollback playbook",
        priority: "Medium",
        status: "Open",
        assignee: "Sarah J.",
      },
    ],
  },
  {
    id: "beta-expansion",
    name: "Beta Expansion",
    key: "PRJ-4095",
    client: "Globex",
    clientInitials: "BX",
    clientColor: "bg-orange-500",
    health: "At Risk",
    status: "Active",
    progress: 25,
    totalTickets: 46,
    open: 18,
    inProgress: 10,
    resolved: 3,
    closed: 15,
    overdue: 15,
    priorityCounts: { critical: 4, high: 8, medium: 5, low: 2 },
    updatedAgo: "5 hrs ago",
    targetDate: "Sep 20, 2024",
    team: [
      {
        id: "david",
        name: "David Chen",
        shortName: "David C.",
        role: "Project Manager",
        activeTickets: 14,
        capacity: 96,
        highLoad: true,
      },
      {
        id: "elena",
        name: "Elena Rostova",
        shortName: "Elena R.",
        role: "QA",
        activeTickets: 7,
        capacity: 60,
      },
    ],
    tickets: [
      {
        id: "BX-44",
        title: "Region failover drills failing",
        priority: "Critical",
        status: "Open",
        assignee: "David C.",
      },
      {
        id: "BX-51",
        title: "Latency spike in EU edge",
        priority: "High",
        status: "In Progress",
        assignee: "Elena R.",
      },
    ],
  },
  {
    id: "mobile-redesign",
    name: "Mobile App Redesign",
    key: "PRJ-4110",
    client: "Initech",
    clientInitials: "IN",
    clientColor: "bg-emerald-600",
    health: "Overdue",
    status: "Active",
    progress: 40,
    totalTickets: 68,
    open: 22,
    inProgress: 14,
    resolved: 6,
    closed: 26,
    overdue: 9,
    priorityCounts: { critical: 3, high: 7, medium: 9, low: 3 },
    updatedAgo: "1 day ago",
    targetDate: "Aug 01, 2024",
    team: [
      {
        id: "marcus",
        name: "Marcus Webb",
        shortName: "Marcus W.",
        role: "Developer",
        activeTickets: 11,
        capacity: 80,
      },
      {
        id: "priya",
        name: "Priya Patel",
        shortName: "Priya P.",
        role: "Lead Developer",
        activeTickets: 10,
        capacity: 85,
      },
    ],
    tickets: [
      {
        id: "MOB-77",
        title: "Finish onboarding animation polish",
        priority: "Medium",
        status: "In Progress",
        assignee: "Marcus W.",
      },
      {
        id: "MOB-81",
        title: "Push notification deep links",
        priority: "High",
        status: "Open",
        assignee: "Priya P.",
      },
    ],
  },
  {
    id: "auth-platform",
    name: "Auth Platform Hardening",
    key: "PRJ-4088",
    client: "Umbrella",
    clientInitials: "UM",
    clientColor: "bg-blue-600",
    health: "On Track",
    status: "On Hold",
    progress: 58,
    totalTickets: 51,
    open: 8,
    inProgress: 6,
    resolved: 2,
    closed: 35,
    overdue: 2,
    priorityCounts: { critical: 1, high: 3, medium: 6, low: 4 },
    updatedAgo: "3 days ago",
    targetDate: "Dec 12, 2024",
    team: [
      {
        id: "jordan",
        name: "Jordan Lee",
        shortName: "Jordan L.",
        role: "QA",
        activeTickets: 4,
        capacity: 35,
      },
    ],
    tickets: [
      {
        id: "AUTH-33",
        title: "Rotate service account keys",
        priority: "High",
        status: "Resolved",
        assignee: "Jordan L.",
      },
    ],
  },
  {
    id: "customer-portal",
    name: "Customer Portal Launch",
    key: "PRJ-4122",
    client: "Soylent",
    clientInitials: "SY",
    clientColor: "bg-rose-600",
    health: "At Risk",
    status: "Active",
    progress: 48,
    totalTickets: 89,
    open: 16,
    inProgress: 21,
    resolved: 8,
    closed: 44,
    overdue: 6,
    priorityCounts: { critical: 2, high: 6, medium: 11, low: 5 },
    updatedAgo: "8 hrs ago",
    targetDate: "Oct 05, 2024",
    team: [
      {
        id: "sarah",
        name: "Sarah Jenkins",
        shortName: "Sarah J.",
        role: "Project Manager",
        activeTickets: 7,
        capacity: 62,
      },
      {
        id: "david",
        name: "David Kim",
        shortName: "David K.",
        role: "Lead Developer",
        activeTickets: 13,
        capacity: 88,
        highLoad: true,
      },
      {
        id: "elena",
        name: "Elena Rostova",
        shortName: "Elena R.",
        role: "QA",
        activeTickets: 9,
        capacity: 70,
      },
    ],
    tickets: [
      {
        id: "CP-09",
        title: "SSO login for customer admins",
        priority: "Critical",
        status: "In Progress",
        assignee: "David K.",
      },
      {
        id: "CP-14",
        title: "Billing history export CSV",
        priority: "Medium",
        status: "Open",
        assignee: "Elena R.",
      },
    ],
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export const clients = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Soylent",
];

export const categories = [
  "Web Application",
  "Mobile App",
  "Infrastructure",
  "Internal Tools",
  "Data Platform",
];
