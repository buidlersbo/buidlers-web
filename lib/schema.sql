-- Esquema del contenido editable desde el panel admin.
-- Idempotente: se puede correr las veces que haga falta.

CREATE TABLE IF NOT EXISTS hackathons (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  image       TEXT        NOT NULL DEFAULT '/hackathon-ai.svg',
  location    TEXT        NOT NULL DEFAULT 'virtual',
  sponsor     TEXT        NOT NULL DEFAULT '',
  prize_pool  TEXT        NOT NULL DEFAULT '',
  apply_url   TEXT        NOT NULL DEFAULT '',
  ends_at     DATE        NOT NULL,
  published   BOOLEAN     NOT NULL DEFAULT TRUE,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id          SERIAL PRIMARY KEY,
  title       TEXT        NOT NULL,
  starts_at   TIMESTAMP   NOT NULL,
  location    TEXT        NOT NULL DEFAULT '',
  luma_url    TEXT,
  logs        TEXT[]      NOT NULL DEFAULT '{}',
  published   BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS team_members (
  id          SERIAL PRIMARY KEY,
  kind        TEXT        NOT NULL DEFAULT 'node' CHECK (kind IN ('ceo', 'node')),
  name        TEXT        NOT NULL,
  role        TEXT        NOT NULL DEFAULT '',
  quote       TEXT,
  status      TEXT,
  ping        TEXT,
  sort_order  INTEGER     NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT        NOT NULL DEFAULT '',
  likes       INTEGER     NOT NULL DEFAULT 0,
  url         TEXT        NOT NULL DEFAULT '',
  sort_order  INTEGER     NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS social_links (
  id          SERIAL PRIMARY KEY,
  label       TEXT        NOT NULL,
  href        TEXT        NOT NULL,
  sort_order  INTEGER     NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS site_values (
  id          SERIAL PRIMARY KEY,
  term        TEXT        NOT NULL,
  definition  TEXT        NOT NULL DEFAULT '',
  sort_order  INTEGER     NOT NULL DEFAULT 0
);
