import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { logout } from "./session-actions";

export const metadata = { title: "admin · buidlers" };

const ADMIN_NAV = [
  { href: "/admin", label: "dashboard" },
  { href: "/admin/hackathons", label: "hackathons" },
  { href: "/admin/eventos", label: "eventos" },
  { href: "/admin/equipo", label: "equipo" },
  { href: "/admin/proyectos", label: "proyectos" },
  { href: "/admin/redes", label: "redes" },
  { href: "/admin/valores", label: "valores" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // La pantalla de login usa este mismo layout pero sin el chrome del panel.
  if (!(await isAuthenticated())) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#10100F] text-[#FFFEF0] flex flex-col md:flex-row">
      <aside className="md:w-[220px] md:h-screen md:sticky md:top-0 border-b md:border-b-0 md:border-r border-[#484736] flex md:flex-col justify-between shrink-0">
        <div className="w-full">
          <div className="p-6 pb-4">
            <div className="w-10 h-[6px] bg-[#F1E65D] mb-3" />
            <h1 className="text-xl font-bold tracking-tighter leading-none">
              buidlers<span className="animate-pulse">_</span>
            </h1>
            <p className="text-[10px] text-[#9D9A72] font-mono mt-1"># panel de control</p>
          </div>

          <nav className="flex md:flex-col overflow-x-auto">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-6 py-3 font-mono text-sm lowercase text-[#9D9A72] border-l-2 border-transparent hover:text-[#FFFEF0] hover:bg-[#161616] hover:border-[#F1E65D] transition-colors whitespace-nowrap"
              >
                {item.label};
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 space-y-3 shrink-0">
          <Link href="/" className="block font-mono text-[10px] text-[#9D9A72] hover:text-[#F1E65D]">
            ← ver_sitio()
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="font-mono text-[10px] uppercase tracking-wider text-[#CD3130] hover:underline"
            >
              cerrar_sesión()
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12">{children}</main>
    </div>
  );
}
