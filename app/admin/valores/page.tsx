import { CrudSection, type FieldSpec } from "../components/CrudSection";
import { deleteSiteValue, saveSiteValue } from "../actions";
import { getSiteValues } from "@/lib/content";
import { isDatabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "term", label: "término", required: true, placeholder: "soberanía" },
  { name: "sortOrder", label: "orden", type: "number" },
  { name: "definition", label: "definición", type: "textarea", wide: true },
];

export default async function AdminValores() {
  const values = await getSiteValues();

  return (
    <CrudSection
      title="valores"
      hint="./las tarjetas `var <término> =` del home"
      fields={FIELDS}
      readOnly={!isDatabaseConfigured()}
      defaults={{ sortOrder: values.length + 1 }}
      saveAction={saveSiteValue}
      deleteAction={deleteSiteValue}
      items={values.map((value) => ({
        id: value.id,
        title: value.term,
        subtitle: value.definition,
        values: { ...value },
      }))}
    />
  );
}
