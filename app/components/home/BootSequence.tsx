"use client";

import { useEffect, useState } from "react";
import { COLORS } from "@/lib/theme";

const SCRIPT = [
  { text: "# systems check...", color: COLORS.artichoke },
  { text: "STATUS: centralized control [!]", color: COLORS.syntax.red },
  { text: "ACTION: run decentralize_now.sh", color: COLORS.syntax.orange },
  { text: "loading modules...", color: COLORS.artichoke },
  { text: "OUTPUT: autonomy restored;", color: COLORS.syntax.green },
  { text: "function empower() { return (knowledge + collaboration); }", color: COLORS.ivory },
  { text: "echo 'Build with us -> Buidlers.world';", color: COLORS.corn },
] as const;
type BootSequenceProps = {
  onComplete: () => void;
};

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    SCRIPT.forEach((line, index) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
          if (index === SCRIPT.length - 1) timers.push(setTimeout(onComplete, 800));
        }, (index + 1) * 600)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="font-mono text-sm md:text-base space-y-2 p-6 h-full flex flex-col justify-center">
      {lines.map((line, i) => (
        <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
          <span className="mr-2 text-[#484736]">{">"}</span>
          <span style={{ color: line.color }}>{line.text}</span>
        </div>
      ))}
      <span className="animate-pulse text-[#F1E65D]">_</span>
    </div>
  );
}
