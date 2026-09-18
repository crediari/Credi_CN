"use client";

import { UserMenu } from "./user-menu";

export function Preview() {
  return (
    <UserMenu
      user={{ name: "Ana Costa", email: "ana.costa@crediari.com.br" }}
      onLogout={() => undefined}
    />
  );
}
