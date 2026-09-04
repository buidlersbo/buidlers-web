import { CrudSection, type FieldSpec } from "../components/CrudSection";
import { deleteSocialLink, saveSocialLink } from "../actions";
import { getSocialLinks } from "@/lib/content";
import { isDatabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "label", label: "etiqueta", required: true, placeholder: "twitter / x" },
  { name: "sortOrder", label: "orden", type: "number" },
  { name: "href", label: "url", type: "url", required: true, wide: true, placeholder: "https://x.com/Buidlersbo" },
];

export default async function AdminRedes() {
  const socials = await getSocialLinks();

  return (
    <CrudSection
      title="redes"
      hint="./social_environment — la etiqueta se renderiza como `etiqueta_link;`"
      fields={FIELDS}
      readOnly={!isDatabaseConfigured()}
      defaults={{ sortOrder: socials.length + 1 }}
      saveAction={saveSocialLink}
      deleteAction={deleteSocialLink}
      items={socials.map((social) => ({
        id: social.id,
        title: `${social.label}_link;`,
        subtitle: social.href,
        values: { ...social },
      }))}
    />
  );
}
