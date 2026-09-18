"use client";

import { Button } from "../button/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export function Preview() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Passe o mouse</TooltipTrigger>
      <TooltipContent>Dica rápida</TooltipContent>
    </Tooltip>
  );
}
