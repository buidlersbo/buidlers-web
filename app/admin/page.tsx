import Link from "next/link";
import { getEvents, getHackathons, getProjects, getSiteValues, getSocialLinks, getTeam } from "@/lib/content";
import { daysUntil, isFuture } from "@/lib/dates";
import { isDatabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [hackathons, events, team, projects, socials, values] = await Promise.all([
    getHackathons({ all: true }),
    getEvents({ all: true }),
    getTeam(),
    getProjects(),
    getSocialLinks(),
    getSiteValues(),
  ]);

  const stats = [
    { href: "/admin/hackathons", label: "hackathons", total: hackathons.length, note: `${hackathons.filter((h) => daysUntil(h.endsAt) > 0 && h.published).length} vigentes` },
    { href: "/admin/eventos", label: "eventos", total: events.length, note: `${events.filter((e) => isFuture(e.startsAt)).length} por venir` },
    { href: "/admin/equipo", label: "equipo", total: team.length, note: `${team.filter((m) => m.kind === "node").length} nodos` },
    { href: "/admin/proyectos", label: "proyectos", total: projects.length, note: `${projects.reduce((sum, p) => sum + p.likes, 0)} likes` },
    { href: "/admin/redes", label: "redes", total: socials.length, note: "enlaces" },
    { href: "/admin/valores", label: "valores", total: values.length, note: "en el home" },
  ];

  return (
    <div className="max-w-5xl">
      <header className="mb-8 border-b border-[#484736] pb-4">
        <h1 className="text-3xl font-sans font-medium text-[#F1E65D]">dashboard</h1>
        <p className="font-mono text-xs text-[#9D9A72] mt-1">./content_status</p>
      </header>

      <p
        className={`mb-8 border-l-2 p-3 font-mono text-xs ${
          isDatabaseConfigured()
            ? "border-[#10B068] bg-[#161616] text-[#10B068]"
            : "border-[#F57A0C] bg-[#161616] text-[#F57A0C]"
        }`}
      >
        {isDatabaseConfigured()
          ? "db: neon conectada; los cambios impactan el sitio al guardar;"
          : "db: sin DATABASE_URL — se muestra el contenido semilla y no se puede escribir; revisá .env.local;"}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="border border-[#484736] bg-[#161616] p-5 hover:border-[#F1E65D] transition-colors"
          >
            <span className="block font-mono text-[10px] uppercase tracking-wider text-[#9D9A72]">{stat.label}</span>
            <span className="block text-4xl font-sans text-[#F1E65D] my-2">{stat.total}</span>
            <span className="block font-mono text-[10px] text-[#484736]">{stat.note}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
