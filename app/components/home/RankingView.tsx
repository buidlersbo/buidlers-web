import { PROJECTS_DATA } from "./data";
import { ProjectCard } from "./ProjectCard";

export function RankingView() {
  return (
    <div className="max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-[#484736] pb-4 gap-4">
        <div>
          <p className="font-mono text-xs text-[#9D9A72]">./directory</p>
          <h2 className="text-3xl font-sans font-medium text-[#F1E65D]">ranking_proyectos</h2>
        </div>
        <input
          type="text"
          placeholder="find_query;"
          className="w-full md:w-64 bg-[#10100F] border border-[#484736] text-[#FFFEF0] p-2 pl-2 font-mono text-sm focus:border-[#F1E65D] outline-none"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS_DATA.map((proj) => (
          <div key={proj.id}>
            <ProjectCard name={proj.name} desc={proj.desc} likes={proj.likes.toString()} />
            <div className="text-right mt-1">
              <span className="text-[10px] font-mono text-[#484736] hover:text-[#F1E65D] cursor-pointer">
                -{">"} {proj.url}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
