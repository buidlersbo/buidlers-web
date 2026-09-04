import type { TeamMember } from "@/lib/types";

type EquipoViewProps = {
  team: TeamMember[];
};

export function EquipoView({ team }: EquipoViewProps) {
  const ceo = team.find((member) => member.kind === "ceo");
  const nodes = team.filter((member) => member.kind === "node");

  return (
    <div className="max-w-4xl space-y-10">
      <h2 className="text-3xl font-sans font-medium text-[#F1E65D] border-b border-[#484736] pb-4">
        core_team_&amp;_nodes
      </h2>

      {ceo && (
        <div className="flex gap-4 items-start">
          <div className="font-mono text-[#F57A0C] w-24 text-right pt-1">/root</div>
          <div className="flex-1 border-l-2 border-[#F57A0C] pl-6 py-1">
            <h3 className="text-xl text-[#FFFEF0] font-bold">{ceo.name}</h3>
            <p className="text-[#9D9A72] font-mono text-sm">role: {ceo.role};</p>
            {ceo.quote && <p className="text-[#FFFEF0] italic mt-2">&quot;{ceo.quote}&quot;</p>}
          </div>
        </div>
      )}

      <div className="flex gap-4 items-start">
        <div className="font-mono text-[#3A7CC1] w-24 text-right pt-1">/nodes</div>
        <div className="flex-1 space-y-4">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="border border-[#484736] p-3 flex justify-between items-center bg-[#161616] group hover:border-[#F1E65D] transition-colors"
            >
              <div>
                <span className="text-[#FFFEF0] block font-mono text-sm">{node.name}</span>
                <span className="text-[10px] text-[#484736]">{node.role}</span>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs font-mono block ${
                    node.status?.includes("connected") ? "text-[#3A7CC1]" : "text-[#F57A0C]"
                  }`}
                >
                  [{node.status ?? "unknown"}]
                </span>
                <span className="text-[9px] font-mono text-[#484736]">ping: {node.ping ?? "--"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
