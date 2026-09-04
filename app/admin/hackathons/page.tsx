import { CrudSection, type FieldSpec } from "../components/CrudSection";
import { deleteHackathon, saveHackathon } from "../actions";
import { getHackathons } from "@/lib/content";
import { daysUntil } from "@/lib/dates";
import { isDatabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "name", label: "nombre", required: true, placeholder: "ai agents sprint" },
  { name: "endsAt", label: "cierra el", type: "date", required: true },
  { name: "location", label: "modalidad", type: "select", options: [
    { value: "virtual", label: "virtual" },
    { value: "irl", label: "irl" },
    { value: "irl + virtual", label: "irl + virtual" },
  ] },
  { name: "prizePool", label: "premio", placeholder: "$25,000" },
  { name: "sponsor", label: "sponsor", placeholder: "near + openai builders" },
  { name: "image", label: "imagen (ruta en /public)", placeholder: "/hackathon-ai.svg" },
  { name: "applyUrl", label: "link de aplicación", type: "url", wide: true, placeholder: "https://dorahacks.io/..." },
  { name: "sortOrder", label: "orden", type: "number" },
  { name: "published", label: "publicado", type: "checkbox" },
];

export default async function AdminHackathons() {
  const hackathons = await getHackathons({ all: true });

  return (
    <CrudSection
      title="hackathons"
      hint="./solo se muestran en el sitio los publicados con fecha de cierre futura"
      fields={FIELDS}
      readOnly={!isDatabaseConfigured()}
      defaults={{ image: "/hackathon-ai.svg", location: "virtual", published: true, sortOrder: hackathons.length + 1 }}
      saveAction={saveHackathon}
      deleteAction={deleteHackathon}
      items={hackathons.map((hackathon) => {
        const daysLeft = daysUntil(hackathon.endsAt);
        return {
          id: hackathon.id,
          title: hackathon.name,
          subtitle: `${hackathon.location} · ${hackathon.prizePool} · ${hackathon.sponsor}`,
          badge: !hackathon.published ? "borrador" : daysLeft > 0 ? `${daysLeft} days left` : "cerrado",
          values: { ...hackathon },
        };
      })}
    />
  );
}
