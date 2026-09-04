import "server-only";

import { getSql, isDatabaseConfigured } from "./db";
import { SEED_CONTENT } from "./seed-data";
import type { Hackathon, Project, SiteEvent, SiteValue, SocialLink, TeamMember } from "./types";

type Row = Record<string, unknown>;

const str = (value: unknown) => String(value ?? "");
const num = (value: unknown) => Number(value ?? 0);
const iso = (value: unknown) => (value instanceof Date ? value.toISOString() : str(value));

/**
 * Ejecuta una consulta y, si la base no está configurada o falla, devuelve el
 * contenido semilla. Así el sitio nunca se cae por un problema de infra.
 */
async function query<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  if (!isDatabaseConfigured()) return fallback;
  try {
    return await run();
  } catch (error) {
    console.error(`[content] fallo al leer "${label}", usando contenido semilla:`, error);
    return fallback;
  }
}

const mapHackathon = (row: Row): Hackathon => ({
  id: num(row.id),
  name: str(row.name),
  image: str(row.image),
  location: str(row.location),
  sponsor: str(row.sponsor),
  prizePool: str(row.prize_pool),
  applyUrl: str(row.apply_url),
  endsAt: iso(row.ends_at).slice(0, 10),
  published: Boolean(row.published),
  sortOrder: num(row.sort_order),
});

const mapEvent = (row: Row): SiteEvent => ({
  id: num(row.id),
  title: str(row.title),
  startsAt: iso(row.starts_at),
  location: str(row.location),
  lumaUrl: row.luma_url ? str(row.luma_url) : null,
  logs: Array.isArray(row.logs) ? row.logs.map(str) : [],
  published: Boolean(row.published),
});

const mapTeamMember = (row: Row): TeamMember => ({
  id: num(row.id),
  kind: row.kind === "ceo" ? "ceo" : "node",
  name: str(row.name),
  role: str(row.role),
  quote: row.quote ? str(row.quote) : null,
  status: row.status ? str(row.status) : null,
  ping: row.ping ? str(row.ping) : null,
  sortOrder: num(row.sort_order),
});

const mapProject = (row: Row): Project => ({
  id: num(row.id),
  name: str(row.name),
  description: str(row.description),
  likes: num(row.likes),
  url: str(row.url),
  sortOrder: num(row.sort_order),
});

const mapSocial = (row: Row): SocialLink => ({
  id: num(row.id),
  label: str(row.label),
  href: str(row.href),
  sortOrder: num(row.sort_order),
});

const mapValue = (row: Row): SiteValue => ({
  id: num(row.id),
  term: str(row.term),
  definition: str(row.definition),
  sortOrder: num(row.sort_order),
});

/** `all: true` incluye borradores (solo para el panel admin). */
export function getHackathons({ all = false } = {}): Promise<Hackathon[]> {
  const fallback = all ? SEED_CONTENT.hackathons : SEED_CONTENT.hackathons.filter((h) => h.published);
  return query("hackathons", async () => {
    const sql = getSql();
    const rows = all
      ? await sql`SELECT * FROM hackathons ORDER BY sort_order, id`
      : await sql`SELECT * FROM hackathons WHERE published ORDER BY sort_order, id`;
    return (rows as Row[]).map(mapHackathon);
  }, fallback);
}

export function getEvents({ all = false } = {}): Promise<SiteEvent[]> {
  const fallback = all ? SEED_CONTENT.events : SEED_CONTENT.events.filter((e) => e.published);
  return query("events", async () => {
    const sql = getSql();
    const rows = all
      ? await sql`SELECT * FROM events ORDER BY starts_at DESC`
      : await sql`SELECT * FROM events WHERE published ORDER BY starts_at DESC`;
    return (rows as Row[]).map(mapEvent);
  }, fallback);
}

export function getTeam(): Promise<TeamMember[]> {
  return query("team_members", async () => {
    const sql = getSql();
    const rows = await sql`SELECT * FROM team_members ORDER BY kind, sort_order, id`;
    return (rows as Row[]).map(mapTeamMember);
  }, SEED_CONTENT.team);
}

export function getProjects(): Promise<Project[]> {
  return query("projects", async () => {
    const sql = getSql();
    const rows = await sql`SELECT * FROM projects ORDER BY sort_order, id`;
    return (rows as Row[]).map(mapProject);
  }, SEED_CONTENT.projects);
}

export function getSocialLinks(): Promise<SocialLink[]> {
  return query("social_links", async () => {
    const sql = getSql();
    const rows = await sql`SELECT * FROM social_links ORDER BY sort_order, id`;
    return (rows as Row[]).map(mapSocial);
  }, SEED_CONTENT.socials);
}

export function getSiteValues(): Promise<SiteValue[]> {
  return query("site_values", async () => {
    const sql = getSql();
    const rows = await sql`SELECT * FROM site_values ORDER BY sort_order, id`;
    return (rows as Row[]).map(mapValue);
  }, SEED_CONTENT.values);
}

/** Todo el contenido público en una sola pasada (una request por tabla). */
export async function getPublicContent() {
  const [hackathons, events, team, projects, socials, values] = await Promise.all([
    getHackathons(),
    getEvents(),
    getTeam(),
    getProjects(),
    getSocialLinks(),
    getSiteValues(),
  ]);
  return { hackathons, events, team, projects, socials, values };
}
