import { BreadcrumbItem as BreadcrumbItemType } from "../types";
import Link from "next/link";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ChevronDown } from "lucide-react";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { Fragment } from "react";

interface Props {
  items: BreadcrumbItemType[];
  index: number;
}

export const NavigationItem = ({ items, index }: Props) => {
  const isLast = index === items.length - 1;
  const item = items[index];

  return (
    <Fragment key={index}>
      <BreadcrumbItem>
        {item.isCurrentPage || isLast ? (
          <BreadcrumbPage>{item.label}</BreadcrumbPage>
        ) : item.dropdownOptions && item.dropdownOptions.length > 0 ? (
          <div className="group relative inline-flex items-center">
            <Link
              href={item.href || "#"}
              className="flex items-center gap-1 hover:text-foreground transition-colors hover:no-underline">
              {item.label}
              <ChevronDown className="h-3 w-3" />
            </Link>

            {/* Invisible bridge to prevent dropdown closing */}
            <div className="absolute top-full left-0 w-full h-1 group-hover:block hidden"></div>

            {/* Hover dropdown */}
            <div className="absolute top-full left-0 mt-1 w-56 bg-background border border-border rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
              <div className="p-1 bg-background">
                {item.dropdownOptions.map((option, optionIndex) => (
                  <Link
                    key={optionIndex}
                    href={option.href}
                    className="flex flex-col items-start p-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                    <span className="font-medium">{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <BreadcrumbLink asChild>
            <Link href={item.href || "#"}>{item.label}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
      {!isLast && (
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
      )}
    </Fragment>
  );
};
