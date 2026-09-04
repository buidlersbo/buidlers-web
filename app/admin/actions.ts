"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { getSql } from "@/lib/db";

/**
 * CRUD del contenido editable. Toda mutación pasa por `guard()`:
 * verifica la sesión (el middleware ya protege las rutas, pero las server
 * actions son endpoints públicos y deben validar por su cuenta) y revalida
 * el sitio para que los cambios se vean al instante.
 */
async function guard() {
  if (!(await isAuthenticated())) throw new Error("No autorizado.");
  return getSql();
}

function done() {
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();
const int = (data: FormData, key: string, fallback = 0) => {
  const value = Number(data.get(key));
  return Number.isFinite(value) ? Math.trunc(value) : fallback;
};
const bool = (data: FormData, key: string) => data.get(key) === "on" || data.get(key) === "true";
const optional = (data: FormData, key: string) => text(data, key) || null;
const id = (data: FormData) => {
  const value = Number(data.get("id"));
  return Number.isInteger(value) && value > 0 ? value : null;
};

function mustHave(value: string, field: string) {
  if (!value) throw new Error(`El campo "${field}" es obligatorio.`);
  return value;
}

/* ---------------------------------------------------------------- hackathons */

export async function saveHackathon(data: FormData) {
  const sql = await guard();
  const values = {
    name: mustHave(text(data, "name"), "name"),
    image: text(data, "image") || "/hackathon-ai.svg",
    location: text(data, "location") || "virtual",
    sponsor: text(data, "sponsor"),
    prizePool: text(data, "prizePool"),
    applyUrl: text(data, "applyUrl"),
    endsAt: mustHave(text(data, "endsAt"), "endsAt"),
    published: bool(data, "published"),
    sortOrder: int(data, "sortOrder"),
  };
  const rowId = id(data);

  if (rowId) {
    await sql`UPDATE hackathons SET
      name = ${values.name}, image = ${values.image}, location = ${values.location},
      sponsor = ${values.sponsor}, prize_pool = ${values.prizePool}, apply_url = ${values.applyUrl},
      ends_at = ${values.endsAt}, published = ${values.published}, sort_order = ${values.sortOrder}
      WHERE id = ${rowId}`;
  } else {
    await sql`INSERT INTO hackathons (name, image, location, sponsor, prize_pool, apply_url, ends_at, published, sort_order)
      VALUES (${values.name}, ${values.image}, ${values.location}, ${values.sponsor}, ${values.prizePool},
              ${values.applyUrl}, ${values.endsAt}, ${values.published}, ${values.sortOrder})`;
  }
  done();
}

export async function deleteHackathon(data: FormData) {
  const sql = await guard();
  await sql`DELETE FROM hackathons WHERE id = ${id(data)}`;
  done();
}

/* -------------------------------------------------------------------- eventos */

export async function saveEvent(data: FormData) {
  const sql = await guard();
  const logs = text(data, "logs")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const values = {
    title: mustHave(text(data, "title"), "title"),
    startsAt: mustHave(text(data, "startsAt"), "startsAt"),
    location: text(data, "location"),
    lumaUrl: optional(data, "lumaUrl"),
    published: bool(data, "published"),
  };
  const rowId = id(data);

  if (rowId) {
    await sql`UPDATE events SET
      title = ${values.title}, starts_at = ${values.startsAt}, location = ${values.location},
      luma_url = ${values.lumaUrl}, logs = ${logs}, published = ${values.published}
      WHERE id = ${rowId}`;
  } else {
    await sql`INSERT INTO events (title, starts_at, location, luma_url, logs, published)
      VALUES (${values.title}, ${values.startsAt}, ${values.location}, ${values.lumaUrl}, ${logs}, ${values.published})`;
  }
  done();
}

export async function deleteEvent(data: FormData) {
  const sql = await guard();
  await sql`DELETE FROM events WHERE id = ${id(data)}`;
  done();
}

/* --------------------------------------------------------------------- equipo */

export async function saveTeamMember(data: FormData) {
  const sql = await guard();
  const values = {
    kind: text(data, "kind") === "ceo" ? "ceo" : "node",
    name: mustHave(text(data, "name"), "name"),
    role: text(data, "role"),
    quote: optional(data, "quote"),
    status: optional(data, "status"),
    ping: optional(data, "ping"),
    sortOrder: int(data, "sortOrder"),
  };
  const rowId = id(data);

  if (rowId) {
    await sql`UPDATE team_members SET
      kind = ${values.kind}, name = ${values.name}, role = ${values.role}, quote = ${values.quote},
      status = ${values.status}, ping = ${values.ping}, sort_order = ${values.sortOrder}
      WHERE id = ${rowId}`;
  } else {
    await sql`INSERT INTO team_members (kind, name, role, quote, status, ping, sort_order)
      VALUES (${values.kind}, ${values.name}, ${values.role}, ${values.quote}, ${values.status}, ${values.ping}, ${values.sortOrder})`;
  }
  done();
}

export async function deleteTeamMember(data: FormData) {
  const sql = await guard();
  await sql`DELETE FROM team_members WHERE id = ${id(data)}`;
  done();
}

/* ------------------------------------------------------------------ proyectos */

export async function saveProject(data: FormData) {
  const sql = await guard();
  const values = {
    name: mustHave(text(data, "name"), "name"),
    description: text(data, "description"),
    likes: int(data, "likes"),
    url: text(data, "url"),
    sortOrder: int(data, "sortOrder"),
  };
  const rowId = id(data);

  if (rowId) {
    await sql`UPDATE projects SET
      name = ${values.name}, description = ${values.description}, likes = ${values.likes},
      url = ${values.url}, sort_order = ${values.sortOrder}
      WHERE id = ${rowId}`;
  } else {
    await sql`INSERT INTO projects (name, description, likes, url, sort_order)
      VALUES (${values.name}, ${values.description}, ${values.likes}, ${values.url}, ${values.sortOrder})`;
  }
  done();
}

export async function deleteProject(data: FormData) {
  const sql = await guard();
  await sql`DELETE FROM projects WHERE id = ${id(data)}`;
  done();
}

/* ---------------------------------------------------------------------- redes */

export async function saveSocialLink(data: FormData) {
  const sql = await guard();
  const values = {
    label: mustHave(text(data, "label"), "label"),
    href: mustHave(text(data, "href"), "href"),
    sortOrder: int(data, "sortOrder"),
  };
  const rowId = id(data);

  if (rowId) {
    await sql`UPDATE social_links SET label = ${values.label}, href = ${values.href}, sort_order = ${values.sortOrder}
      WHERE id = ${rowId}`;
  } else {
    await sql`INSERT INTO social_links (label, href, sort_order)
      VALUES (${values.label}, ${values.href}, ${values.sortOrder})`;
  }
  done();
}

export async function deleteSocialLink(data: FormData) {
  const sql = await guard();
  await sql`DELETE FROM social_links WHERE id = ${id(data)}`;
  done();
}

/* -------------------------------------------------------------------- valores */

export async function saveSiteValue(data: FormData) {
  const sql = await guard();
  const values = {
    term: mustHave(text(data, "term"), "term"),
    definition: text(data, "definition"),
    sortOrder: int(data, "sortOrder"),
  };
  const rowId = id(data);

  if (rowId) {
    await sql`UPDATE site_values SET term = ${values.term}, definition = ${values.definition}, sort_order = ${values.sortOrder}
      WHERE id = ${rowId}`;
  } else {
    await sql`INSERT INTO site_values (term, definition, sort_order)
      VALUES (${values.term}, ${values.definition}, ${values.sortOrder})`;
  }
  done();
}

export async function deleteSiteValue(data: FormData) {
  const sql = await guard();
  await sql`DELETE FROM site_values WHERE id = ${id(data)}`;
  done();
}
