import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Slash } from "lucide-react";
import Link from "next/link";
import { BreadcrumbItem as BreadcrumbItemType } from "../types";

interface Props {
  hiddenItems: BreadcrumbItemType[];
}

export const EllipsisDropdown = ({ hiddenItems }: Props) => {
  return (
    <>
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis />
            <ChevronDown className="h-3 w-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {hiddenItems.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link href={item.href || "#"}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <Slash />
      </BreadcrumbSeparator>
    </>
  );
};
