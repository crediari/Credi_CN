"use client";

import { ApplicationsDropdown } from "./applications-dropdown";

export function Preview() {
  return (
    <ApplicationsDropdown
      user={{ name: "Ana Costa" }}
      accountUrl="#"
      systems={[
        { id: "cards", name: "Cards", url: "#" },
        { id: "intranet", name: "Intranet", url: "#" },
      ]}
      tools={[{ id: "docs", name: "Docs", url: "#" }]}
    />
  );
}
