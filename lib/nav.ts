import { Calendar, Globe, Hash, Terminal, Trophy, Users } from "lucide-react";

/** Orden del menú (sidebar y nav móvil). `redes` va al final. */
export const NAV_ITEMS = [
  { id: "inicio", label: "inicio", icon: Terminal },
  { id: "ranking", label: "ranking", icon: Hash },
  { id: "equipo", label: "equipo", icon: Users },
  { id: "eventos", label: "eventos", icon: Calendar },
  { id: "hackathons", label: "hackathons", icon: Trophy },
  { id: "redes", label: "redes", icon: Globe },
] as const;

export type ViewId = (typeof NAV_ITEMS)[number]["id"];
