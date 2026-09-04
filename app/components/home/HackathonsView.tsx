import { MapPin } from "lucide-react";
import { daysUntil } from "@/lib/dates";
import type { Hackathon } from "@/lib/types";

type HackathonsViewProps = {
  hackathons: Hackathon[];
};

export function HackathonsView({ hackathons }: HackathonsViewProps) {
  // Un hackathon está vigente mientras su fecha de cierre no haya pasado.
  const ongoing = hackathons
    .map((hackathon) => ({ ...hackathon, daysLeft: daysUntil(hackathon.endsAt) }))
    .filter((hackathon) => hackathon.daysLeft > 0);

  return (
    <div className="max-w-6xl">
      <div className="mb-8 border-b border-[#484736] pb-4">
        <h2 className="text-3xl font-sans font-medium text-[#F1E65D]">hackathons</h2>
        <p className="font-mono text-xs text-[#9D9A72] mt-1">./ongoing_only_cards</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ongoing.map((hackathon) => (
          <article
            key={hackathon.id}
            className="border border-[#484736] bg-[#161616] p-3 flex flex-col aspect-square"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="text-sm text-[#FFFEF0] font-sans font-medium lowercase leading-tight">{hackathon.name}</h3>
              <span className="shrink-0 text-[10px] font-mono text-[#F1E65D] px-2 py-1 uppercase">
                {hackathon.daysLeft} days left
              </span>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element -- la ruta la define el admin y puede ser un SVG local o una URL externa */}
            <img
              src={hackathon.image}
              alt={hackathon.name}
              className="w-full h-28 object-cover border border-[#484736]"
            />

            <div className="mt-3 space-y-2 text-xs font-mono text-[#9D9A72]">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 uppercase">
                  <MapPin size={13} className="text-[#F1E65D]" />
                  {hackathon.location}
                </p>
                <span className="bg-[#10100F] text-[#F1E65D] px-2 py-0.5">{hackathon.prizePool}</span>
              </div>
              <p>{hackathon.sponsor}</p>
            </div>

            <a
              href={hackathon.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-auto border border-[#F1E65D] text-[#F1E65D] text-xs font-mono px-3 py-2 hover:bg-[#F1E65D] hover:text-[#10100F] uppercase tracking-wider transition-colors text-center"
            >
              aplicar()
            </a>
          </article>
        ))}

        {ongoing.length === 0 && (
          <p className="font-mono text-xs text-[#9D9A72]">no_ongoing_hackathons;</p>
        )}
      </div>
    </div>
  );
}
