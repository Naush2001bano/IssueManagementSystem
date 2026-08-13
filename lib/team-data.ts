export type GlobalRole =
  | "Super Admin"
  | "Project Manager"
  | "Developer"
  | "QA"
  | "Designer";

export type ProjectRole = "Contributor" | "Lead" | "Viewer" | "Admin";

export type WorkloadStatus = "Light" | "Moderate" | "Overloaded";

export interface AssignedProject {
  id: string;
  name: string;
  initials: string;
  color: string;
  role: ProjectRole;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: GlobalRole;
  online: boolean;
  projects: AssignedProject[];
  stats: {
    open: number;
    inProgress: number;
    closed: number;
    overdue: number;
  };
  workload: WorkloadStatus;
  workloadPercent: number;
  avgResolutionDays: number;
  message?: string;
}

export interface PendingInvite {
  id: string;
  email: string;
  role: GlobalRole;
  invitedAgo: string;
  initials: string;
  color: string;
}

export const availableProjects: Omit<AssignedProject, "role">[] = [
  {
    id: "alpha",
    name: "Alpha Initiative",
    initials: "AI",
    color: "bg-orange-500",
  },
  {
    id: "core-backend",
    name: "Core Backend",
    initials: "CB",
    color: "bg-blue-600",
  },
  {
    id: "core-platform",
    name: "Core Platform",
    initials: "CP",
    color: "bg-indigo-600",
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    initials: "MA",
    color: "bg-emerald-600",
  },
  {
    id: "auth-platform",
    name: "Auth Platform",
    initials: "AP",
    color: "bg-violet-600",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    email: "sarah.j@issuetrack.pro",
    role: "Super Admin",
    online: true,
    projects: [
      {
        id: "core-platform",
        name: "Core Platform",
        initials: "CP",
        color: "bg-indigo-600",
        role: "Admin",
      },
      {
        id: "mobile-app",
        name: "Mobile App",
        initials: "MA",
        color: "bg-emerald-600",
        role: "Lead",
      },
      {
        id: "alpha",
        name: "Alpha Initiative",
        initials: "AI",
        color: "bg-orange-500",
        role: "Viewer",
      },
    ],
    stats: { open: 12, inProgress: 5, closed: 84, overdue: 1 },
    workload: "Moderate",
    workloadPercent: 62,
    avgResolutionDays: 1.2,
    message: "Welcome back — you own platform access reviews.",
  },
  {
    id: "david-chen",
    name: "David Chen",
    email: "david.c@issuetrack.pro",
    role: "Project Manager",
    online: true,
    projects: [
      {
        id: "core-backend",
        name: "Core Backend",
        initials: "CB",
        color: "bg-blue-600",
        role: "Lead",
      },
      {
        id: "alpha",
        name: "Alpha Initiative",
        initials: "AI",
        color: "bg-orange-500",
        role: "Lead",
      },
    ],
    stats: { open: 34, inProgress: 18, closed: 120, overdue: 7 },
    workload: "Overloaded",
    workloadPercent: 94,
    avgResolutionDays: 2.8,
  },
  {
    id: "maria-rodriguez",
    name: "Maria Rodriguez",
    email: "maria.r@issuetrack.pro",
    role: "Developer",
    online: false,
    projects: [
      {
        id: "mobile-app",
        name: "Mobile App",
        initials: "MA",
        color: "bg-emerald-600",
        role: "Contributor",
      },
      {
        id: "alpha",
        name: "Alpha Initiative",
        initials: "AI",
        color: "bg-orange-500",
        role: "Contributor",
      },
    ],
    stats: { open: 8, inProgress: 3, closed: 42, overdue: 0 },
    workload: "Light",
    workloadPercent: 34,
    avgResolutionDays: 0.9,
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    email: "elena.r@issuetrack.pro",
    role: "QA",
    online: true,
    projects: [
      {
        id: "core-platform",
        name: "Core Platform",
        initials: "CP",
        color: "bg-indigo-600",
        role: "Contributor",
      },
      {
        id: "auth-platform",
        name: "Auth Platform",
        initials: "AP",
        color: "bg-violet-600",
        role: "Lead",
      },
    ],
    stats: { open: 15, inProgress: 6, closed: 67, overdue: 2 },
    workload: "Moderate",
    workloadPercent: 55,
    avgResolutionDays: 1.5,
  },
  {
    id: "marcus-webb",
    name: "Marcus Webb",
    email: "marcus.w@issuetrack.pro",
    role: "Developer",
    online: true,
    projects: [
      {
        id: "core-backend",
        name: "Core Backend",
        initials: "CB",
        color: "bg-blue-600",
        role: "Contributor",
      },
    ],
    stats: { open: 7, inProgress: 4, closed: 38, overdue: 0 },
    workload: "Light",
    workloadPercent: 40,
    avgResolutionDays: 1.1,
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    email: "priya.p@issuetrack.pro",
    role: "Developer",
    online: false,
    projects: [
      {
        id: "auth-platform",
        name: "Auth Platform",
        initials: "AP",
        color: "bg-violet-600",
        role: "Lead",
      },
      {
        id: "core-backend",
        name: "Core Backend",
        initials: "CB",
        color: "bg-blue-600",
        role: "Contributor",
      },
      {
        id: "mobile-app",
        name: "Mobile App",
        initials: "MA",
        color: "bg-emerald-600",
        role: "Viewer",
      },
    ],
    stats: { open: 19, inProgress: 11, closed: 95, overdue: 4 },
    workload: "Overloaded",
    workloadPercent: 88,
    avgResolutionDays: 2.1,
  },
];

export const pendingInvites: PendingInvite[] = [
  {
    id: "alex-smith",
    email: "alex.smith@example.com",
    role: "Developer",
    invitedAgo: "2 days ago",
    initials: "AS",
    color: "bg-blue-500",
  },
  {
    id: "j-miller",
    email: "j.miller@example.com",
    role: "Project Manager",
    invitedAgo: "5 hrs ago",
    initials: "JM",
    color: "bg-amber-700",
  },
];

export function getTeamMember(id: string) {
  return teamMembers.find((member) => member.id === id);
}

export const globalRoles: GlobalRole[] = [
  "Super Admin",
  "Project Manager",
  "Developer",
  "QA",
  "Designer",
];

export const projectRoles: ProjectRole[] = [
  "Viewer",
  "Contributor",
  "Lead",
  "Admin",
];
