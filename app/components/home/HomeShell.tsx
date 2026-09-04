"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { NAV_ITEMS, type ViewId } from "@/lib/nav";
import type { SiteContent } from "@/lib/types";
import { EquipoView } from "./EquipoView";
import { EventosView } from "./EventosView";
import { HackathonsView } from "./HackathonsView";
import { InicioView } from "./InicioView";
import { MobileNav } from "./MobileNav";
import { RankingView } from "./RankingView";
import { RedesView } from "./RedesView";
import { Sidebar } from "./Sidebar";
import { SplashScreen } from "./SplashScreen";

const SPLASH_SESSION_KEY = "buidlers_splash_seen";
const DEFAULT_VIEW: ViewId = "inicio";
const VIEW_IDS = NAV_ITEMS.map((item) => item.id) as readonly ViewId[];

const isViewId = (value: string): value is ViewId => (VIEW_IDS as readonly string[]).includes(value);

/* La vista activa vive en el hash de la URL (#hackathons), así el sitio es
   deep-linkeable y el botón "atrás" del navegador funciona. */
const subscribeToHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const readHash = () => window.location.hash.slice(1);
const noopSubscribe = () => () => {};

/* El splash se muestra una sola vez por sesión de navegador. En el servidor
   asumimos que no se vio (mismo HTML inicial para todos); si ya se vio, la
   hidratación lo descarta antes de pintar. */
const readSplashSeen = () => {
  try {
    return sessionStorage.getItem(SPLASH_SESSION_KEY) === "1";
  } catch {
    return true;
  }
};

type HomeShellProps = {
  content: SiteContent;
};

function ViewRenderer({ view, content, onJoin }: { view: ViewId; content: SiteContent; onJoin: () => void }) {
  switch (view) {
    case "inicio":
      return <InicioView values={content.values} onJoinClick={onJoin} />;
    case "ranking":
      return <RankingView projects={content.projects} />;
    case "equipo":
      return <EquipoView team={content.team} />;
    case "eventos":
      return <EventosView events={content.events} />;
    case "hackathons":
      return <HackathonsView hackathons={content.hackathons} />;
    case "redes":
      return <RedesView socials={content.socials} />;
  }
}

export function HomeShell({ content }: HomeShellProps) {
  const hash = useSyncExternalStore(subscribeToHash, readHash, () => "");
  const view = isViewId(hash) ? hash : DEFAULT_VIEW;

  const splashSeen = useSyncExternalStore(noopSubscribe, readSplashSeen, () => false);
  const [splashFinished, setSplashFinished] = useState(false);
  const [isSplashExiting, setIsSplashExiting] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    } catch {
      // sessionStorage bloqueado (modo privado): el splash se mostrará de nuevo.
    }
  }, []);

  const handleViewChange = (nextView: ViewId) => {
    window.location.hash = nextView;
  };

  const showSplash = !splashSeen && !splashFinished;
  const splashBlocksContent = showSplash && !isSplashExiting;
  const revealClass = `transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
    splashBlocksContent ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
  }`;

  return (
    <div className="min-h-screen bg-[#10100F] text-[#FFFEF0] font-sans selection:bg-[#F1E65D] selection:text-[#10100F] flex flex-col md:flex-row overflow-hidden">
      {showSplash && (
        <SplashScreen
          onExitStart={() => setIsSplashExiting(true)}
          onComplete={() => {
            setSplashFinished(true);
            setIsSplashExiting(false);
          }}
          totalDurationMs={5000}
          exitDurationMs={800}
        />
      )}

      <div className={revealClass}>
        <Sidebar view={view} onViewChange={handleViewChange} />
      </div>

      <main className={`flex-1 md:ml-[220px] h-screen overflow-y-auto ${revealClass}`}>
        <div className="p-6 md:p-12 md:max-w-7xl mx-auto min-h-full">
          <div className="md:hidden flex justify-between items-end mb-8 border-b border-[#484736] pb-4">
            <div>
              <div className="w-8 h-[5px] bg-[#F1E65D] mb-1" />
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

          <ViewRenderer view={view} content={content} onJoin={() => handleViewChange("ranking")} />

          <div className="h-24 md:h-0" />
        </div>
      </main>

      <div className={revealClass}>
        <MobileNav view={view} onViewChange={handleViewChange} />
      </div>
    </div>
  );
}
