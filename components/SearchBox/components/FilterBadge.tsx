"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterBadgeProps {
  filterKey: string;
  value: string;
  onRemove: (key: string) => void;
}

export const FilterBadge = ({ filterKey, value, onRemove }: FilterBadgeProps) => {
  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <span className="capitalize">{filterKey}:</span>
      <span className="font-semibold"> {value}</span>
      <button onClick={() => onRemove(filterKey)} className="ml-1">
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
};
