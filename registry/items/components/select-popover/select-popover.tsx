"use client";

import { Check, ChevronDown, Loader2, SearchX, XCircle } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../button/button";
import { Command, CommandInput, CommandList } from "../command/command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";

type SelectPopoverProps<T extends object> = {
  placeholder?: string;
  items: T[];
  value: T | null;
  onSelect: (item: T) => void;
  isLoading?: boolean;
  isError?: boolean;
  labelKey: keyof T;
  valueKey: keyof T;
  className?: string;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
};

function SelectPopover<T extends object>({
  placeholder = "Selecionar...",
  items,
  value,
  onSelect,
  isLoading,
  isError,
  labelKey,
  valueKey,
  className,
  searchTerm,
  onSearchChange,
}: SelectPopoverProps<T>) {
  const [open, setOpen] = useState(false);
  const [internalTerm, setInternalTerm] = useState("");
  const listId = useId();

  const term = searchTerm ?? internalTerm;
  const handleTermChange = (val: string) => {
    setInternalTerm(val);
    onSearchChange?.(val);
  };

  const filtered = !onSearchChange
    ? term
      ? items.filter((item) => String(item[labelKey]).toLowerCase().includes(term.toLowerCase()))
      : items
    : items;

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-controls={listId}
              className="w-full justify-between"
            />
          }
        >
          {value ? (
            <span>{String(value[labelKey])}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </PopoverTrigger>

        <PopoverContent className={cn("p-0", className)}>
          <Command>
            <CommandInput
              placeholder="Pesquisar..."
              onValueChange={handleTermChange}
              value={term}
            />

            <CommandList id={listId} className="p-1 pb-0">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-5 text-sm text-muted-foreground">
                  <Loader2 className="size-5 animate-spin" />
                  Buscando...
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center py-5 text-sm text-muted-foreground">
                  <XCircle className="size-5" />
                  Erro ao carregar
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-5 text-sm text-muted-foreground">
                  <SearchX className="size-5" />
                  Nenhum resultado encontrado
                </div>
              ) : (
                filtered.map((item) => {
                  const isSelected = value && value[valueKey] === item[valueKey];
                  return (
                    <Button
                      key={String(item[valueKey])}
                      variant="ghost"
                      onClick={() => {
                        onSelect(item);
                        setOpen(false);
                      }}
                      className={cn(
                        "mb-1 flex w-full justify-start text-sm",
                        isSelected && "border border-primary/50 bg-primary/10",
                      )}
                    >
                      {isSelected && <Check className="mr-2 size-4 text-primary" />}
                      {String(item[labelKey])}
                    </Button>
                  );
                })
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { SelectPopover, type SelectPopoverProps };
