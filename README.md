# buidlers-web

Sitio de [Buidlers Bolivia](https://buidlers.world) + panel de administración.
Next.js 16 (App Router) · React 19 · Tailwind v4 · Neon Postgres.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completá las variables
npm run db:seed              # crea las tablas y carga el contenido inicial
npm run dev                  # http://localhost:3000
```

### Variables de entorno

| Variable | Para qué sirve |
| --- | --- |
| `DATABASE_URL` | Connection string de Neon (usá la **pooled**, la que dice `-pooler`). |
| `ADMIN_PASSWORD` | Contraseña de acceso a `/admin`. |
| `ADMIN_SESSION_SECRET` | Firma la cookie de sesión. Generala con `openssl rand -hex 32`. |

Sin `DATABASE_URL` el sitio igual levanta: usa el contenido semilla de
`lib/seed-content.json` y el panel queda en modo solo lectura.

### Scripts de base de datos

```bash
npm run db:migrate   # crea las tablas (idempotente)
npm run db:seed      # migra + carga lib/seed-content.json (no pisa datos existentes)
npm run db:reset     # borra las tablas y vuelve a sembrar  ⚠️ destructivo
```

## Panel admin

`/admin` (protegido por `proxy.ts` + cookie firmada, 8 h de sesión).
Permite crear, editar y borrar: hackathons, eventos, equipo, proyectos, redes
y valores del home. Al guardar se revalida el sitio público automáticamente.

## Estructura

```
app/
  page.tsx                  server component: lee el contenido y lo pasa al shell
  components/home/          vistas del sitio (todas reciben datos por props)
  admin/                    panel: layout, login, dashboard y un CRUD por entidad
    actions.ts              server actions (validan sesión + revalidan)
    components/CrudSection  formulario/listado genérico que arma cada CRUD
lib/
  content.ts                lecturas de la base (con fallback a la semilla)
  db.ts                     cliente de Neon
  auth.ts                   sesión de admin (HMAC sobre Web Crypto)
  schema.sql                esquema de las tablas
  seed-content.json         contenido inicial / de respaldo
  types.ts nav.ts theme.ts dates.ts
scripts/db.mjs              migrate | seed | reset
proxy.ts                    protege /admin/**
```

## Deploy

Cualquier host que corra Next.js (Vercel, Railway, VPS). Configurá las tres
variables de entorno y corré `npm run db:migrate` una vez contra la base de
producción.
