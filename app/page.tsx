import { HomeShell } from "./components/home/HomeShell";
import { getPublicContent } from "@/lib/content";

/** El contenido viene de Neon; se revalida cada minuto y tras editar en /admin. */
export const revalidate = 60;

export default async function BuidlersWeb() {
  const content = await getPublicContent();
  return <HomeShell content={content} />;
}
