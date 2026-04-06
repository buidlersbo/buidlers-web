import { NAV_ITEMS, ViewId } from "./data";

type SidebarProps = {
  view: ViewId;
  onViewChange: (view: ViewId) => void;
};

export function Sidebar({ view, onViewChange }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col justify-between w-[220px] h-screen fixed left-0 top-0 border-r border-[#484736] bg-[#10100F] z-50">
      <div className="pt-16">
        <nav className="flex flex-col">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`group flex items-center gap-3 px-6 py-4 border-l-2 transition-all duration-200
                 ${
                   view === item.id
                     ? "border-[#F1E65D] bg-[#161616] text-[#F1E65D]"
                     : "border-transparent text-[#9D9A72] hover:text-[#FFFEF0] hover:bg-[#161616]"
                 }`}
            >
              <item.icon size={18} />
              <span className="font-mono text-sm lowercase">{item.label};</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6 pb-10 w-full">
        <div className="w-10 h-[6px] bg-[#F1E65D] mb-3"></div>
        <h1 className="text-2xl font-bold tracking-tighter leading-none text-[#FFFEF0]">
          buidlers<span className="animate-pulse">_</span>
        </h1>
        <div className="text-[10px] text-[#9D9A72] font-mono mt-2 flex flex-col">
          <span># buidlers realm</span>
          <span># builders@world</span>
        </div>
      </div>
    </aside>
  );
}
