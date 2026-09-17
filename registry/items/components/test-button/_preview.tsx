"use client";

import { TestButton } from "./test-button";

export function Preview() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TestButton />
      <TestButton variant="outline" label="Outline" />
      <TestButton variant="secondary" label="Secondary" />
    </div>
  );
}
