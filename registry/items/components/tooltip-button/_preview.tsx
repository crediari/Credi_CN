"use client";

import { Pencil } from "lucide-react";

import { TooltipButton } from "./tooltip-button";

export function Preview() {
  return (
    <TooltipButton tooltipContent="Editar">
      <Pencil />
    </TooltipButton>
  );
}
