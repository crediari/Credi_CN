"use client";

import { Button } from "../button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function Preview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Abrir menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configurações</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
