"use client";

import { useState } from "react";

import { DatePicker } from "./date-picker";

export function Preview() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="w-full max-w-xs">
      <DatePicker value={date} onChange={setDate} />
    </div>
  );
}
