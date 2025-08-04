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

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  properties: string[];
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, onChange, properties, onKeyDown }: SearchInputProps) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(0);

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.getBoundingClientRect().width);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleInputFocus = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
    onKeyDown(event);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <Command className="h-auto">
        <div ref={inputRef}>
          <CommandInput
            ref={commandInputRef}
            placeholder="Search by name or filter by property..."
            value={value}
            onValueChange={onChange}
            className="w-full"
            onFocus={handleInputFocus}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
          />
        </div>
      </Command>
      {open && (
        <div
          className="absolute top-full left-0 z-50 mt-1 rounded-md border bg-popover p-0 text-popover-foreground shadow-md"
          style={{ width: inputWidth > 0 ? `${inputWidth}px` : "100%" }}>
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {properties?.map((property) => (
                  <CommandItem
                    key={property}
                    onSelect={() => {
                      onChange(`${property}:`);
                      setOpen(false);
                      // Focus the input after selection so user can immediately type the value
                      setTimeout(() => {
                        commandInputRef.current?.focus();
                      }, 0);
                    }}>
                    {property}:
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};
