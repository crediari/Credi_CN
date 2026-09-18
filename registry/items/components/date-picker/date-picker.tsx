"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "../button/button";
import { Calendar } from "../calendar/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";

type DatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!value}
            className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          />
        }
      >
        <CalendarIcon />
        {value ? format(value, "PPP", { locale: ptBR }) : <span>Selecione a data...</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          disabled={(date) => date > new Date()}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, type DatePickerProps };
