import { DeleteButton, SubmitButton } from "./FormButtons";

export type FieldSpec = {
  name: string;
  label: string;
  type?: "text" | "number" | "url" | "date" | "datetime-local" | "textarea" | "checkbox" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  /** Ocupa toda la fila del grid. */
  wide?: boolean;
};

export type CrudItem = {
  id: number;
  /** Texto que identifica la fila en la lista y en el confirm de borrado. */
  title: string;
  subtitle?: string;
  badge?: string;
  values: Record<string, string | number | boolean | null | undefined>;
};

type CrudSectionProps = {
  title: string;
  hint: string;
  fields: FieldSpec[];
  items: CrudItem[];
  saveAction: (data: FormData) => Promise<void>;
  deleteAction: (data: FormData) => Promise<void>;
  /** Valores por defecto del formulario "nuevo". */
  defaults?: Record<string, string | number | boolean>;
  readOnly?: boolean;
};

const inputClass =
  "bg-[#10100F] border border-[#484736] text-[#FFFEF0] font-mono text-sm px-3 py-2 outline-none focus:border-[#F1E65D] w-full";

function Field({ field, value }: { field: FieldSpec; value: string | number | boolean | null | undefined }) {
  const common = { id: field.name, name: field.name, required: field.required, placeholder: field.placeholder };

  return (
    <label className={`flex flex-col gap-1.5 ${field.wide ? "md:col-span-2" : ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-[#9D9A72]">{field.label}</span>

      {field.type === "textarea" ? (
        <textarea {...common} rows={4} defaultValue={String(value ?? "")} className={inputClass} />
      ) : field.type === "checkbox" ? (
        <span className="flex items-center gap-2 h-[38px]">
          <input {...common} type="checkbox" defaultChecked={Boolean(value)} className="accent-[#F1E65D] w-4 h-4" />
          <span className="font-mono text-xs text-[#9D9A72]">visible en el sitio</span>
        </span>
      ) : field.type === "select" ? (
        <select {...common} defaultValue={String(value ?? "")} className={inputClass}>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...common} type={field.type ?? "text"} defaultValue={String(value ?? "")} className={inputClass} />
      )}
    </label>
  );
}

export function CrudSection({
  title,
  hint,
  fields,
  items,
  saveAction,
  deleteAction,
  defaults = {},
  readOnly = false,
}: CrudSectionProps) {
  return (
    <div className="max-w-5xl">
      <header className="mb-8 border-b border-[#484736] pb-4">
        <h1 className="text-3xl font-sans font-medium text-[#F1E65D] lowercase">{title}</h1>
        <p className="font-mono text-xs text-[#9D9A72] mt-1">{hint}</p>
      </header>

      {readOnly && (
        <p className="mb-6 border-l-2 border-[#F57A0C] bg-[#161616] p-3 font-mono text-xs text-[#F57A0C]">
          modo solo lectura: falta DATABASE_URL, se está mostrando el contenido semilla;
        </p>
      )}

      <details className="mb-8 border border-[#F1E65D] bg-[#161616]">
        <summary className="cursor-pointer font-mono text-xs uppercase tracking-wider text-[#F1E65D] px-4 py-3">
          + nuevo_registro()
        </summary>
        <form action={saveAction} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-0">
          {fields.map((field) => (
            <Field key={field.name} field={field} value={defaults[field.name]} />
          ))}
          <div className="md:col-span-2 flex justify-end">
            <SubmitButton>crear()</SubmitButton>
          </div>
        </form>
      </details>

      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.id} className="border border-[#484736] bg-[#161616] group">
            <summary className="cursor-pointer flex items-center justify-between gap-4 px-4 py-3">
              <span className="min-w-0">
                <span className="block font-sans text-[#FFFEF0] lowercase truncate">{item.title}</span>
                {item.subtitle && (
                  <span className="block font-mono text-[10px] text-[#9D9A72] truncate">{item.subtitle}</span>
                )}
              </span>
              <span className="shrink-0 flex items-center gap-3">
                {item.badge && <span className="font-mono text-[10px] text-[#F1E65D] uppercase">{item.badge}</span>}
                <span className="font-mono text-[10px] text-[#484736]">#{item.id}</span>
              </span>
            </summary>

            <div className="border-t border-[#484736] p-4">
              <form action={saveAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="hidden" name="id" value={item.id} />
                {fields.map((field) => (
                  <Field key={field.name} field={field} value={item.values[field.name]} />
                ))}
                <div className="md:col-span-2 flex justify-end">
                  <SubmitButton />
                </div>
              </form>

              <form action={deleteAction} className="mt-3 flex justify-end border-t border-[#484736] pt-3">
                <input type="hidden" name="id" value={item.id} />
                <DeleteButton label={item.title} />
              </form>
            </div>
          </details>
        ))}

        {items.length === 0 && <p className="font-mono text-xs text-[#9D9A72]">tabla_vacía;</p>}
      </div>
    </div>
  );
}
