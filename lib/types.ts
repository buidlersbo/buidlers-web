/** Modelos de dominio compartidos entre el sitio público y el panel admin. */

export type Hackathon = {
  id: number;
  name: string;
  image: string;
  location: string;
  sponsor: string;
  prizePool: string;
  applyUrl: string;
  /** Fecha de cierre en ISO (YYYY-MM-DD). Determina `daysLeft` y si sigue vigente. */
  endsAt: string;
  published: boolean;
  sortOrder: number;
};

export type EventStatus = "UPCOMING" | "DONE";

export type SiteEvent = {
  id: number;
  title: string;
  /** ISO datetime. */
  startsAt: string;
  location: string;
  lumaUrl: string | null;
  logs: string[];
  published: boolean;
};

export type TeamMemberKind = "ceo" | "node";

export type TeamMember = {
  id: number;
  kind: TeamMemberKind;
  name: string;
  role: string;
  quote: string | null;
  status: string | null;
  ping: string | null;
  sortOrder: number;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  likes: number;
  url: string;
  sortOrder: number;
};

export type SocialLink = {
  id: number;
  label: string;
  href: string;
  sortOrder: number;
};

export type SiteValue = {
  id: number;
  term: string;
  definition: string;
  sortOrder: number;
};

export type SiteContent = {
  hackathons: Hackathon[];
  events: SiteEvent[];
  team: TeamMember[];
  projects: Project[];
  socials: SocialLink[];
  values: SiteValue[];
};
