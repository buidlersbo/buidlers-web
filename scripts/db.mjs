#!/usr/bin/env node
/**
 * Migra (y opcionalmente siembra) la base de Neon.
 *
 *   node scripts/db.mjs migrate   # crea las tablas
 *   node scripts/db.mjs seed      # crea las tablas + carga lib/seed-content.json
 *   node scripts/db.mjs reset     # borra las tablas y vuelve a sembrar
 *
 * Lee DATABASE_URL de .env.local / .env (o del entorno).
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    let contents;
    try {
      contents = readFileSync(resolve(root, file), "utf8");
    } catch {
      continue;
    }
    for (const line of contents.split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  }
}

loadEnv();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ Falta DATABASE_URL. Copiá .env.example a .env.local y pegá la connection string de Neon.");
  process.exit(1);
}

const sql = neon(url);
const command = process.argv[2] ?? "migrate";
const TABLES = ["hackathons", "events", "team_members", "projects", "social_links", "site_values"];

const isoInDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

async function migrate() {
  const schema = readFileSync(resolve(root, "lib/schema.sql"), "utf8");
  const statements = schema
    .split(";")
    .map((statement) => statement.trim())
    .filter((statement) => statement && !statement.startsWith("--"));
  for (const statement of statements) await sql.query(statement);
  console.log(`✓ migrate: ${statements.length} sentencias aplicadas`);
}

async function drop() {
  for (const table of TABLES) await sql.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
  console.log(`✓ drop: ${TABLES.length} tablas eliminadas`);
}

async function seed() {
  const data = JSON.parse(readFileSync(resolve(root, "lib/seed-content.json"), "utf8"));

  const counts = await Promise.all(TABLES.map((table) => sql.query(`SELECT COUNT(*)::int AS n FROM ${table}`)));
  const total = counts.reduce((sum, rows) => sum + rows[0].n, 0);
  if (total > 0) {
    console.log("• seed omitido: ya hay contenido en la base (usá `reset` para reemplazarlo)");
    return;
  }

  for (const h of data.hackathons) {
    await sql`INSERT INTO hackathons (name, image, location, sponsor, prize_pool, apply_url, ends_at, published, sort_order)
              VALUES (${h.name}, ${h.image}, ${h.location}, ${h.sponsor}, ${h.prizePool}, ${h.applyUrl}, ${isoInDays(h.endsInDays)}, ${h.published}, ${h.sortOrder})`;
  }
  for (const e of data.events) {
    await sql`INSERT INTO events (title, starts_at, location, luma_url, logs, published)
              VALUES (${e.title}, ${e.startsAt}, ${e.location}, ${e.lumaUrl}, ${e.logs}, ${e.published})`;
  }
  for (const m of data.team) {
    await sql`INSERT INTO team_members (kind, name, role, quote, status, ping, sort_order)
              VALUES (${m.kind}, ${m.name}, ${m.role}, ${m.quote}, ${m.status}, ${m.ping}, ${m.sortOrder})`;
  }
  for (const p of data.projects) {
    await sql`INSERT INTO projects (name, description, likes, url, sort_order)
              VALUES (${p.name}, ${p.description}, ${p.likes}, ${p.url}, ${p.sortOrder})`;
  }
  for (const s of data.socials) {
    await sql`INSERT INTO social_links (label, href, sort_order) VALUES (${s.label}, ${s.href}, ${s.sortOrder})`;
  }
  for (const v of data.values) {
    await sql`INSERT INTO site_values (term, definition, sort_order) VALUES (${v.term}, ${v.definition}, ${v.sortOrder})`;
  }
  console.log("✓ seed: contenido inicial cargado");
}

const commands = {
  migrate: async () => { await migrate(); },
  seed: async () => { await migrate(); await seed(); },
  reset: async () => { await drop(); await migrate(); await seed(); },
};

const run = commands[command];
if (!run) {
  console.error(`✗ Comando desconocido: ${command}. Usá migrate | seed | reset.`);
  process.exit(1);
}

run().catch((error) => {
  console.error("✗ Error:", error.message);
  process.exit(1);
});
