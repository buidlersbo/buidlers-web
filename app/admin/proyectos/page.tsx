import { CrudSection, type FieldSpec } from "../components/CrudSection";
import { deleteProject, saveProject } from "../actions";
import { getProjects } from "@/lib/content";
import { isDatabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "name", label: "nombre", required: true, placeholder: "sovereign_id" },
  { name: "url", label: "url", placeholder: "buidlers.org/id" },
  { name: "likes", label: "likes", type: "number" },
  { name: "sortOrder", label: "orden", type: "number" },
  { name: "description", label: "descripción", type: "textarea", wide: true },
];

export default async function AdminProyectos() {
  const projects = await getProjects();

  return (
    <CrudSection
      title="proyectos"
      hint="./ranking_proyectos"
      fields={FIELDS}
      readOnly={!isDatabaseConfigured()}
      defaults={{ likes: 0, sortOrder: projects.length + 1 }}
      saveAction={saveProject}
      deleteAction={deleteProject}
      items={projects.map((project) => ({
        id: project.id,
        title: project.name,
        subtitle: project.description,
        badge: `${project.likes} likes`,
        values: { ...project },
      }))}
    />
  );
}
