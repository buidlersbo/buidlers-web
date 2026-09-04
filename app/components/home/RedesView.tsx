import { ArrowUpRight } from "lucide-react";
import type { SocialLink } from "@/lib/types";

type RedesViewProps = {
  socials: SocialLink[];
};

export function RedesView({ socials }: RedesViewProps) {
  return (
    <div className="max-w-3xl h-full flex flex-col justify-center">
      <div className="mb-8 border-b border-[#484736] pb-4">
        <h2 className="text-3xl font-sans font-medium text-[#F1E65D]">social_environment</h2>
        <p className="font-mono text-xs text-[#9D9A72] mt-1">./connecting_nodes...</p>
      </div>

      <div className="grid gap-4">
        {socials.map((network) => (
          <a
            key={network.id}
            href={network.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 border border-[#484736] hover:bg-[#F1E65D] hover:text-[#10100F] hover:border-[#F1E65D] group transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm md:text-lg group-hover:font-bold">{network.label}_link;</span>
            </div>
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        ))}
      </div>

      <div className="mt-12 p-4 bg-[#161616] border-l-2 border-[#F1E65D] font-mono text-xs text-[#9D9A72]">
        status: waiting_for_handshake...
        <br />
        ping: 24ms
      </div>
    </div>
  );
}
