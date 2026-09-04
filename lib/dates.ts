/** Utilidades de fecha compartidas por las vistas y el panel. */

const MS_PER_DAY = 86_400_000;

export const MONTHS_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** Días restantes hasta `isoDate`, truncado a 0 si ya pasó. */
export function daysUntil(isoDate: string, from: Date = new Date()): number {
  const target = new Date(isoDate).getTime();
  if (Number.isNaN(target)) return 0;
  const startOfToday = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  return Math.max(0, Math.ceil((target - startOfToday) / MS_PER_DAY));
}

/** `YYYY-MM-DD` listo para un <input type="date">. */
export const toDateInput = (value: string) => new Date(value).toISOString().slice(0, 10);

/** `YYYY-MM-DDTHH:mm` listo para un <input type="datetime-local">. */
export const toDateTimeInput = (value: string) => {
  const date = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/** Formato legible usado en el event_log: `2025-09-20 18:00`. */
export const formatEventStamp = (value: string) => toDateTimeInput(value).replace("T", " ");

/** `true` si la fecha todavía no llegó. Vive acá (y no en el render) para
 *  mantener los componentes puros. */
export const isFuture = (value: string) => new Date(value).getTime() > Date.now();
