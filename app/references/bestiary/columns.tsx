"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MonsterBase } from "./type";

export const columns: ColumnDef<MonsterBase>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const { type, subtype } = row.original;
      return <>{subtype ? `${type} (${subtype})` : type}</>;
    },
  },
  {
    accessorKey: "hitPoints",
    header: "Hit Points",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
];
