import { COLORS, EVENTS_DATA } from "./data";

export function EventosView() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8 border-b border-[#484736] pb-4">
        <h2 className="text-3xl font-sans font-medium text-[#F1E65D]">event_log</h2>
        <p className="font-mono text-xs text-[#9D9A72] mt-1">./syncing_calendar</p>
      </div>

      <div className="relative border-l border-[#484736] ml-3 space-y-12 py-4">
        {EVENTS_DATA.map((event, i) => (
          <div key={i} className="relative pl-8">
            <div
              className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#10100F]"
              style={{ backgroundColor: event.status === "UPCOMING" ? COLORS.corn : "#484736" }}
            ></div>

            <span className="text-[10px] font-mono px-2 py-0.5 border border-[#484736] bg-[#161616] text-[#9D9A72] rounded-sm mb-2 inline-block lowercase">
              time="{event.date}"
            </span>

            <h3 className="text-xl md:text-2xl text-[#FFFEF0] font-sans font-medium mt-1 leading-tight lowercase">{event.title}</h3>
            <p className="text-xs text-[#9D9A72] font-mono mt-1 mb-3">loc: "{event.loc}"</p>

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
      </div>
    </div>
  );
}
