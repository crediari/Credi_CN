"use client";

import { useState } from "react";

import { SelectPopover } from "./select-popover";

const cities = [
  { id: "1", name: "São Paulo" },
  { id: "2", name: "Rio de Janeiro" },
  { id: "3", name: "Belo Horizonte" },
];

export function Preview() {
  const [city, setCity] = useState<(typeof cities)[number] | null>(null);

  return (
    <div className="w-full max-w-xs">
      <SelectPopover
        items={cities}
        value={city}
        onSelect={setCity}
        labelKey="name"
        valueKey="id"
        placeholder="Selecionar cidade..."
      />
    </div>
  );
}
