"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchMonsters } from "./actions";
import { columns } from "./columns";
import { LoaderPinwheelIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DataTable() {
  const pathname = usePathname();
  const router = useRouter();

  const data = useFetchMonsters();
  const isLoading = data === undefined;

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (monsterId: string) => {
    const params = new URLSearchParams();
    params.set("monsterId", monsterId);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return !isLoading ? (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  data-state={row.getIsSelected() ? "selected" : ""}
                  onClick={() => handleRowClick(row.original.id)}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  ) : (
    <div className="h-full flex items-center justify-center">
      <LoaderPinwheelIcon className="animate-spin" />
    </div>
  );
}
