"use client";

import { useEffect, useMemo, useState } from "react";

type SplashScreenProps = {
  onComplete: () => void;
  brand?: string;
  totalDurationMs?: number;
};

export function SplashScreen({
  onComplete,
  brand = "buidlers",
  totalDurationMs = 5000,
}: SplashScreenProps) {
  const [typedCount, setTypedCount] = useState(0);

  const typingIntervalMs = useMemo(() => {
    const targetTypingWindow = 2800;
    return Math.max(140, Math.floor(targetTypingWindow / brand.length));
  }, [brand.length]);

  useEffect(() => {
    const typeTimer = setInterval(() => {
      setTypedCount((current) => {
        if (current >= brand.length) {
          clearInterval(typeTimer);
          return current;
        }
        return current + 1;
      });
    }, typingIntervalMs);

    const completeTimer = setTimeout(onComplete, totalDurationMs);

    return () => {
      clearInterval(typeTimer);
      clearTimeout(completeTimer);
    };
  }, [brand.length, onComplete, totalDurationMs, typingIntervalMs]);

  const visibleText = brand.slice(0, typedCount);

  return (
    <div className="fixed inset-0 z-[100] bg-[#10100F] text-[#FFFEF0] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-xs md:text-sm text-[#9D9A72] mb-6">boot sequence :: startup_terminal</p>

        <div className="inline-flex items-end gap-2 md:gap-3">
          <h1 className="font-mono text-5xl sm:text-6xl md:text-8xl tracking-tight text-[#F1E65D] leading-none min-w-[8ch] text-left">
            {visibleText}
          </h1>
          <span className="terminal-block mb-1 md:mb-2" aria-hidden="true" />
        </div>
      </div>

      <style jsx>{`
        .terminal-block {
          width: 0.58em;
          height: 0.9em;
          background: #f1e65d;
          animation: terminal-blink 0.8s steps(1, end) infinite;
        }

        @keyframes terminal-blink {
          0%,
          48% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
