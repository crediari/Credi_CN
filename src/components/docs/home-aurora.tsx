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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white dark:bg-transparent"
    >
      {isLight ? (
        <Scanner
          key="sage"
          className="h-full w-full"
          color1="#5f7d72"
          color2="#b7cfc4"
          color3="#3d5a50"
        />
      ) : (
        <GhostFibers
          blueBoost={1}
          brightness={1.15}
          className="h-full w-full"
          glowColor="#0f6b62"
          lineColor="#06221c"
          vignette={0.78}
        />
      )}
    </div>
  );
}

export { HomeAurora };
