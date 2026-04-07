"use client";

import { useMemo, useState } from "react";
import { COLORS, EVENTS_DATA } from "./data";

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function EventosView() {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const years = useMemo(() => {
    const uniqueYears = new Set(
      EVENTS_DATA.map((event) => new Date(event.date.replace(" ", "T")).getFullYear().toString())
    );
    return Array.from(uniqueYears).sort((a, b) => Number(a) - Number(b));
  }, []);

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      const eventDate = new Date(event.date.replace(" ", "T"));
      const monthMatches = selectedMonth === "all" || eventDate.getMonth().toString() === selectedMonth;
      const yearMatches = selectedYear === "all" || eventDate.getFullYear().toString() === selectedYear;
      return monthMatches && yearMatches;
    });
  }, [selectedMonth, selectedYear]);

  return (
    <div className="max-w-4xl">
      <div className="mb-8 border-b border-[#484736] pb-4">
        <h2 className="text-3xl font-sans font-medium text-[#F1E65D]">event_log</h2>
        <p className="font-mono text-xs text-[#9D9A72] mt-1">./syncing_calendar</p>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="font-mono text-xs text-[#9D9A72] flex flex-col gap-2">
          mes
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-[#161616] border border-[#484736] px-3 py-2 text-[#FFFEF0] uppercase text-xs"
          >
            <option value="all">todos</option>
            {MONTHS_ES.map((month, i) => (
              <option key={month} value={i.toString()}>
                {month}
              </option>
            ))}
          </select>
        </label>

        <label className="font-mono text-xs text-[#9D9A72] flex flex-col gap-2">
          año
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-[#161616] border border-[#484736] px-3 py-2 text-[#FFFEF0] uppercase text-xs"
          >
            <option value="all">todos</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="relative border-l border-[#484736] ml-3 space-y-12 py-4">
        {filteredEvents.map((event, i) => (
          <div key={i} className="relative pl-8">
            <div
              className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#10100F]"
              style={{ backgroundColor: event.status === "UPCOMING" ? COLORS.corn : "#484736" }}
            ></div>

            <span className="text-[10px] font-mono px-2 py-0.5 border border-[#484736] bg-[#161616] text-[#9D9A72] rounded-sm mb-2 inline-block lowercase">
              time="{event.date}"
            </span>

            <div className="mt-1 mb-3 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl text-[#FFFEF0] font-sans font-medium leading-tight lowercase">{event.title}</h3>
                <p className="text-xs text-[#9D9A72] font-mono mt-1">loc: "{event.loc}"</p>
              </div>

              {event.lumaUrl && (
                <a
                  href={event.lumaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 border border-[#F1E65D] text-[#F1E65D] text-xs font-mono px-3 py-2 hover:bg-[#F1E65D] hover:text-[#10100F] uppercase tracking-wider transition-colors"
                >
                  ver_luma()
                </a>
              )}
            </div>

            <div className="bg-[#161616] border-l-2 border-[#484736] p-3 font-mono text-xs space-y-1 text-[#9D9A72]">
              {event.logs.map((log, j) => (
                <p key={j} className={log.startsWith("OUTPUT") ? "text-[#F1E65D]" : ""}>
                  {log}
                </p>
              ))}
            </div>

            {event.status === "UPCOMING" && (
              <button className="mt-4 border border-[#F1E65D] text-[#F1E65D] text-xs font-mono px-4 py-2 hover:bg-[#F1E65D] hover:text-[#10100F] uppercase tracking-wider transition-colors">
                confirmar_asistencia();
              </button>
            )}
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <p className="pl-8 text-xs font-mono text-[#9D9A72]">no_events_found_for_selected_month_year;</p>
        )}
      </div>
    </div>
  );
}
