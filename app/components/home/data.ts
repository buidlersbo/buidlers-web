import { Calendar, Globe, Hash, Terminal, Users } from "lucide-react";

export const COLORS = {
  bg: "#10100F",
  corn: "#F1E65D",
  ivory: "#FFFEF0",
  rifle: "#484736",
  artichoke: "#9D9A72",
  syntax: {
    orange: "#F57A0C",
    red: "#CD3130",
    green: "#10B068",
    blue: "#3A7CC1",
  },
};

export const VALUES = [
  { term: "soberanía", def: "control total e inalienable sobre la propia identidad y datos;" },
  { term: "autonomía", def: "ejecutar código sin pedir permiso; libertad para crear;" },
  { term: "resiliencia", def: "la falla de un nodo no compromete la totalidad del sistema;" },
  { term: "transparencia", def: "la lógica visible es la base de la confianza;" },
];

export const EVENTS_DATA = [
  {
    title: "hackathon pixel operator",
    date: "2025-09-20 18:00",
    status: "DONE",
    loc: "buidlers_hub",
    logs: [
      "INFO: 48h de build (Web3 + IA);",
      "OUTPUT: seeds, mentorías y acceso a infra;",
    ],
  },
  {
    title: "cena de agradecimiento",
    date: "2025-12-21 16:30",
    status: "UPCOMING",
    loc: "condominio sky elite",
    logs: [
      "INFO: agradecer a cada voluntario y al core team;",
      "INFO2: cerrar el año, compartir y celebrar lo logrado;",
      "MSG: ¡nos encantaría contar con ustedes!;",
    ],
  },
] as const;

export const TEAM_DATA = {
  ceo: {
    name: "ana_dev",
    role: "/root (ceo)",
    quote: "el punto cero; donde se quema lo anterior para construir algo nuevo;",
  },
  nodes: [
    { name: "carlos_lpz", role: "node_leader", status: "connected", ping: "24ms" },
    { name: "lucia_scz", role: "evangelist", status: "connected", ping: "12ms" },
    { name: "marco_cba", role: "buidler", status: "syncing...", ping: "99ms" },
  ],
};

export const PROJECTS_DATA = [
  {
    id: 1,
    name: "sovereign_id",
    desc: "privacidad ≠ aislamiento; privacidad = poder compartido;",
    likes: 142,
    url: "buidlers.org/id",
  },
  {
    id: 2,
    name: "ai_ethics_core",
    desc: "herramientas para humanos, no para corporaciones;",
    likes: 98,
    url: "buidlers.org/ai",
  },
  {
    id: 3,
    name: "dao_gov",
    desc: "ejecutar código sin pedir permiso;",
    likes: 210,
    url: "buidlers.org/gov",
  },
] as const;

export const NAV_ITEMS = [
  { id: "inicio", label: "inicio", icon: Terminal },
  { id: "ranking", label: "ranking", icon: Hash },
  { id: "equipo", label: "equipo", icon: Users },
  { id: "redes", label: "redes", icon: Globe },
  { id: "eventos", label: "eventos", icon: Calendar },
] as const;

export const SOCIAL_LINKS = [
  { label: "twitter / x", href: "https://x.com/Buidlersbo" },
  { label: "discord", href: "https://discord.gg/SDSDSDSDSD" },
  { label: "github", href: "https://github.com/buidlersbo" },
  { label: "linkedin profile", href: "https://www.linkedin.com/company/buidlers-bolivia/" },
  { label: "whatsapp", href: "https://chat.whatsapp.com/LQhkv0R2fGa4FDwYuUE443" },
  { label: "tiktok", href: "https://www.tiktok.com/@buidlersbo" },
  { label: "instagram", href: "https://www.instagram.com/buidlersbo/" },
  { label: "facebook", href: "https://www.facebook.com/BuidlersBolivia/" },
] as const;

export type ViewId = (typeof NAV_ITEMS)[number]["id"];
