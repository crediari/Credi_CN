"use client";

import { GhostFibers } from "./ghost-fibers";
import { Scanner } from "./scanner";
import { useTheme } from "./theme-provider";

function HomeAurora() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#eef3f0] dark:bg-transparent"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
          isLight ? "opacity-100" : "opacity-0"
        }`}
      >
        <Scanner
          brightness={1.15}
          className="h-full w-full"
          color1="#4f7468"
          color2="#7fa396"
          color3="#2f5248"
          paused={!isLight}
        />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
          isLight ? "opacity-0" : "opacity-100"
        }`}
      >
        <GhostFibers
          blueBoost={1}
          brightness={1.15}
          className="h-full w-full"
          glowColor="#0f6b62"
          lineColor="#06221c"
          paused={isLight}
          vignette={0.78}
        />
      </div>
    </div>
  );
}

export { HomeAurora };
