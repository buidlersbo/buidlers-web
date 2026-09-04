import { Heart } from "lucide-react";

type ProjectCardProps = {
  name: string;
  desc: string;
  likes: number;
};

export function ProjectCard({ name, desc, likes }: ProjectCardProps) {
  return (
    <div className="group border border-[#484736] bg-[#10100F] hover:border-[#F1E65D] transition-all duration-300">
      <div className="w-full aspect-video bg-[#161616] relative overflow-hidden border-b border-[#484736] group-hover:border-[#F1E65D]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#F1E65D 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        ></div>
        <div className="absolute bottom-2 left-2 bg-[#F1E65D] text-[#10100F] text-[10px] font-mono px-1">IMG_16:9</div>
      </div>
      <div className="p-4">
        <h3 className="text-[#FFFEF0] font-sans font-medium text-lg mb-1">{name}</h3>
        <p className="text-[#9D9A72] font-mono text-xs mb-4 h-10">{desc}</p>
        <div className="flex justify-between items-center border-t border-[#1C1C1C] pt-3">
          <span className="text-xs font-mono text-[#F1E65D] flex items-center gap-1">
            <Heart size={12} /> {likes}
          </span>
          <span className="text-[10px] font-mono text-[#9D9A72]">./view_project</span>
        </div>
      </div>
    </div>
  );
}
