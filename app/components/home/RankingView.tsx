"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

type RankingViewProps = {
  projects: Project[];
};

export function RankingView({ projects }: RankingViewProps) {
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) || project.description.toLowerCase().includes(query)
    );
  }, [projects, search]);

  return (
    <div className="max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-[#484736] pb-4 gap-4">
        <div>
          <p className="font-mono text-xs text-[#9D9A72]">./directory</p>
          <h2 className="text-3xl font-sans font-medium text-[#F1E65D]">ranking_proyectos</h2>
        </div>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="find_query;"
          aria-label="buscar proyecto"
          className="w-full md:w-64 bg-[#10100F] border border-[#484736] text-[#FFFEF0] p-2 pl-2 font-mono text-sm focus:border-[#F1E65D] outline-none"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((project) => (
          <div key={project.id}>
            <ProjectCard name={project.name} desc={project.description} likes={project.likes} />
            <div className="text-right mt-1">
              <span className="text-[10px] font-mono text-[#484736] hover:text-[#F1E65D] cursor-pointer">
                -&gt; {project.url}
              </span>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <p className="font-mono text-xs text-[#9D9A72]">no_projects_found;</p>
      )}
    </div>
  );
}
