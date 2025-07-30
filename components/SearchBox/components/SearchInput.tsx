"use client";

import { useState, useRef, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  properties: string[];
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, onChange, properties, onKeyDown }: SearchInputProps) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(0);

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.getBoundingClientRect().width);
    }
  }, [open]);

  return (
    <Command className="h-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full" ref={inputRef}>
            <CommandInput
              placeholder="Search by name or filter by property..."
              value={value}
              onValueChange={onChange}
              className="w-full"
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDown}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          style={{ width: inputWidth > 0 ? `${inputWidth}px` : "100%" }}
          className="p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {properties?.map((property) => (
                <CommandItem
                  key={property}
                  onSelect={() => {
                    onChange(`${property}:`);
                    setOpen(false);
                  }}>
                  {property}:
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </PopoverContent>
      </Popover>
    </Command>
  );
};
