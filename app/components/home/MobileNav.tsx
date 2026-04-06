import { NAV_ITEMS, ViewId } from "./data";

type MobileNavProps = {
  view: ViewId;
  onViewChange: (view: ViewId) => void;
};

export function MobileNav({ view, onViewChange }: MobileNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#10100F] border-t border-[#484736] z-50 grid grid-cols-5 h-16">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={`flex flex-col items-center justify-center border-t-2 transition-colors
             ${view === item.id ? "border-[#F1E65D] bg-[#161616] text-[#F1E65D]" : "border-transparent text-[#9D9A72]"}`}
        >
          <item.icon size={20} />
        </button>
      ))}
    </nav>
  );
}
