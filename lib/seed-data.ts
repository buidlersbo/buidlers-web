import raw from "./seed-content.json";
import type { SiteContent, TeamMemberKind } from "./types";

/**
 * Contenido por defecto (`lib/seed-content.json`). Cumple dos funciones:
 *  - semilla inicial de la base (`npm run db:seed`, que lee el mismo JSON);
 *  - fallback cuando `DATABASE_URL` no está configurada o la lectura falla,
 *    para que el sitio siga renderizando sin depender de Neon.
 *
 * Los ids son sintéticos (posición en el array); solo se usan como key de React.
 */

const inDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const SEED_CONTENT: SiteContent = {
  hackathons: raw.hackathons.map((item, i) => ({
    id: i + 1,
    name: item.name,
    image: item.image,
    location: item.location,
    sponsor: item.sponsor,
    prizePool: item.prizePool,
    applyUrl: item.applyUrl,
    endsAt: inDays(item.endsInDays),
    published: item.published,
    sortOrder: item.sortOrder,
  })),
  events: raw.events.map((item, i) => ({ id: i + 1, ...item })),
  team: raw.team.map((item, i) => ({ ...item, id: i + 1, kind: item.kind as TeamMemberKind })),
  projects: raw.projects.map((item, i) => ({ id: i + 1, ...item })),
  socials: raw.socials.map((item, i) => ({ id: i + 1, ...item })),
  values: raw.values.map((item, i) => ({ id: i + 1, ...item })),
};
