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
        <div className="relative inline-block text-left">
          <h1 className="font-mono text-5xl sm:text-6xl md:text-8xl text-[#F1E65D] leading-none whitespace-pre">
            <span className="invisible">
              {brand}
              █
            </span>
          </h1>

          <h1 className="absolute inset-0 font-mono text-5xl sm:text-6xl md:text-8xl text-[#F1E65D] leading-none whitespace-pre pointer-events-none">
            {visibleText}
            <span className="terminal-char" aria-hidden="true">
              █
            </span>
          </h1>
        </div>
      </div>

      <style jsx>{`
        .terminal-char {
          display: inline;
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
