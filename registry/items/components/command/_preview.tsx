"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

export function Preview() {
  return (
    <Command className="max-w-sm rounded-4xl border shadow-lg ring-1 ring-foreground/5">
      <CommandInput placeholder="Buscar..." />
      <CommandList>
        <CommandEmpty>Nada encontrado.</CommandEmpty>
        <CommandGroup heading="Ações">
          <CommandItem>Novo contrato</CommandItem>
          <CommandItem>Abrir cliente</CommandItem>
          <CommandItem>Exportar relatório</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
