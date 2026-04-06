"use client";

import { useState } from "react";
import { EquipoView } from "./components/home/EquipoView";
import { EventosView } from "./components/home/EventosView";
import { InicioView } from "./components/home/InicioView";
import { MobileNav } from "./components/home/MobileNav";
import { RankingView } from "./components/home/RankingView";
import { RedesView } from "./components/home/RedesView";
import { Sidebar } from "./components/home/Sidebar";
import { SplashScreen } from "./components/home/SplashScreen";
import { ViewId } from "./components/home/data";

function ViewRenderer({
  view,
  onJoin,
}: {
  view: ViewId;
  onJoin: () => void;
}) {
  switch (view) {
    case "inicio":
      return <InicioView onJoinClick={onJoin} />;
    case "ranking":
      return <RankingView />;
    case "equipo":
      return <EquipoView />;
    case "redes":
      return <RedesView />;
    case "eventos":
      return <EventosView />;
    default:
      return <div className="p-10 font-mono text-[#F1E65D]">./module_under_construction...</div>;
  }
}

export default function BuidlersWeb() {
  const [view, setView] = useState<ViewId>("inicio");
  const [showSplash, setShowSplash] = useState(true);
  const [isSplashExiting, setIsSplashExiting] = useState(false);

  const handleViewChange = (nextView: ViewId) => {
    setView(nextView);
  };

  return (
    <div className="min-h-screen bg-[#10100F] text-[#FFFEF0] font-sans selection:bg-[#F1E65D] selection:text-[#10100F] flex flex-col md:flex-row overflow-hidden">
      {showSplash && (
        <SplashScreen
          onExitStart={() => setIsSplashExiting(true)}
          onComplete={() => {
            setShowSplash(false);
            setIsSplashExiting(false);
          }}
          totalDurationMs={5000}
          exitDurationMs={700}
        />
      )}

      <div
        className={`transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showSplash && !isSplashExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <Sidebar view={view} onViewChange={handleViewChange} />
      </div>

      <main
        className={`flex-1 md:ml-[220px] h-screen overflow-y-auto transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showSplash && !isSplashExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="p-6 md:p-12 md:max-w-7xl mx-auto min-h-full">
          <div className="md:hidden flex justify-between items-end mb-8 border-b border-[#484736] pb-4">
            <div>
              <div className="w-8 h-[5px] bg-[#F1E65D] mb-1"></div>
              <h1 className="text-2xl font-bold tracking-tighter leading-none text-[#FFFEF0]">
                buidlers<span className="animate-pulse">_</span>
              </h1>
              <div className="text-[10px] text-[#9D9A72] font-mono mt-2 flex flex-col">
                <span># buidlers realm</span>
                <span># builders@world</span>
              </div>
            </div>
            <span className="font-mono text-[10px] text-[#484736]">MENU_BELOW</span>
          </div>

          <ViewRenderer
            view={view}
            onJoin={() => setView("ranking")}
          />

          <div className="h-24 md:h-0"></div>
        </div>
      </main>

      <div
        className={`transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showSplash && !isSplashExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <MobileNav view={view} onViewChange={handleViewChange} />
      </div>
    </div>
  );
}
