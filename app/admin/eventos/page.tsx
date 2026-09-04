import { CrudSection, type FieldSpec } from "../components/CrudSection";
import { deleteEvent, saveEvent } from "../actions";
import { getEvents } from "@/lib/content";
import { formatEventStamp, isFuture, toDateTimeInput } from "@/lib/dates";
import { isDatabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

const FIELDS: FieldSpec[] = [
  { name: "title", label: "título", required: true, placeholder: "hackathon pixel operator" },
  { name: "startsAt", label: "fecha y hora", type: "datetime-local", required: true },
  { name: "location", label: "lugar", placeholder: "buidlers_hub" },
  { name: "lumaUrl", label: "link de luma", type: "url", placeholder: "https://lu.ma/..." },
  { name: "logs", label: "logs (una línea por entrada)", type: "textarea", wide: true, placeholder: "INFO: 48h de build;" },
  { name: "published", label: "publicado", type: "checkbox" },
];

export default async function AdminEventos() {
  const events = await getEvents({ all: true });

  return (
    <CrudSection
      title="eventos"
      hint="./event_log — las líneas que empiezan con OUTPUT se resaltan en amarillo"
      fields={FIELDS}
      readOnly={!isDatabaseConfigured()}
      defaults={{ published: true }}
      saveAction={saveEvent}
      deleteAction={deleteEvent}
      items={events.map((event) => ({
        id: event.id,
        title: event.title,
        subtitle: `${formatEventStamp(event.startsAt)} · ${event.location}`,
        badge: !event.published ? "borrador" : isFuture(event.startsAt) ? "upcoming" : "done",
        values: { ...event, startsAt: toDateTimeInput(event.startsAt), logs: event.logs.join("\n") },
      }))}
    />
  );
}
