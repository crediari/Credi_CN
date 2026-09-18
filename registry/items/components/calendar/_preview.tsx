"use client";

import { useState } from "react";

import { Calendar } from "./calendar";

export function Preview() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}
