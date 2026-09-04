"use client";

import { ArrowUpRight } from "lucide-react";
import { COLORS } from "@/lib/theme";
import type { SiteValue } from "@/lib/types";

type InicioViewProps = {
  values: SiteValue[];
  onJoinClick: () => void;
};

export function InicioView({ values, onJoinClick }: InicioViewProps) {
  return (
    <div className="animate-in fade-in duration-700 space-y-12">
      <div className="border-l-4 border-[#F1E65D] pl-6 py-4 md:py-8 max-w-4xl">
        <p className="font-mono text-xs md:text-sm text-[#9D9A72] mb-2">init &#123;</p>
        <h1 className="text-3xl md:text-6xl font-medium text-[#FFFEF0] leading-none mb-6 font-sans tracking-tight">
          el punto cero;
          <br />
          donde se quema lo anterior.
        </h1>
        <div className="font-mono text-sm md:text-base space-y-1">
          <p style={{ color: COLORS.syntax.orange }}>echo &quot;construimos herramientas que empoderan&quot;;</p>
          <p style={{ color: COLORS.corn }}>web3 + ia // privacidad == derecho;</p>
        </div>
        <p className="font-mono text-xs md:text-sm text-[#9D9A72] mt-2">&#125;</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {values.map((value) => (
          <div key={value.id} className="border border-[#484736] p-5 hover:bg-[#161616] transition-colors group">
            <h3 className="font-mono text-[#F1E65D] text-sm uppercase mb-2 group-hover:underline decoration-1 underline-offset-4">
              var {value.term} =
            </h3>
            <p className="font-sans text-[#FFFEF0] text-lg leading-snug">&quot;{value.definition}&quot;</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-b border-[#484736] py-4 my-8">
        {["state", "economy", "foundation"].map((module) => (
          <div key={module} className="text-center">
            <span className="text-[9px] text-[#484736] font-mono uppercase block mb-1">module</span>
            <span className="text-xs text-[#9D9A72] font-mono">.{module}</span>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <button
          onClick={onJoinClick}
          className="group bg-[#F1E65D] text-[#10100F] font-mono px-6 py-3 font-bold hover:bg-white transition-colors flex items-center gap-2"
        >
          <span>./join_buidlers --init</span>
          <ArrowUpRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
