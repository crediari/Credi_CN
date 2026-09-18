"use client";

import { HelloCrediari } from "./hello-crediari";

export function Preview() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <HelloCrediari />
      <HelloCrediari label="Instalou certo" />
    </div>
  );
}
