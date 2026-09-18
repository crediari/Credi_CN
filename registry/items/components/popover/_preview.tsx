"use client";

import { Button } from "../button/button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function Preview() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Abrir popover</PopoverTrigger>
      <PopoverContent>Filtros, atalhos ou detalhes curtos.</PopoverContent>
    </Popover>
  );
}
