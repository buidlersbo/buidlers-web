import { CrudSection, type FieldSpec } from "../components/CrudSection";
import { deleteTeamMember, saveTeamMember } from "../actions";
import { getTeam } from "@/lib/content";
import { isDatabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "name", label: "nombre", required: true, placeholder: "carlos_lpz" },
  { name: "kind", label: "tipo", type: "select", options: [
    { value: "node", label: "node (miembro)" },
    { value: "ceo", label: "ceo (/root)" },
  ] },
  { name: "role", label: "rol", placeholder: "node_leader" },
  { name: "sortOrder", label: "orden", type: "number" },
  { name: "status", label: "status (solo nodes)", placeholder: "connected" },
  { name: "ping", label: "ping (solo nodes)", placeholder: "24ms" },
  { name: "quote", label: "quote (solo ceo)", type: "textarea", wide: true },
];

export default async function AdminEquipo() {
  const team = await getTeam();

  return (
    <CrudSection
      title="equipo"
      hint="./core_team_&_nodes — el sitio muestra un solo /root y el resto como nodos"
      fields={FIELDS}
      readOnly={!isDatabaseConfigured()}
      defaults={{ kind: "node", status: "connected", sortOrder: team.length + 1 }}
      saveAction={saveTeamMember}
      deleteAction={deleteTeamMember}
      items={team.map((member) => ({
        id: member.id,
        title: member.name,
        subtitle: member.role,
        badge: member.kind === "ceo" ? "/root" : member.status ?? "node",
        values: { ...member },
      }))}
    />
  );
}
