import { ReactNode } from "react";
import { BreadcrumbNavigation } from "./BreadcrumbNavigation";
import { BreadcrumbItem as BreadcrumbItemType } from "./BreadcrumbNavigation/types";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title?: string;
  description?: string;
  breadcrumbItems: BreadcrumbItemType[];
  className?: string;
  children?: ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbItems,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <BreadcrumbNavigation items={breadcrumbItems} maxDisplayItems={4} className="text-sm" />
        </div>

        {/* Page Title and Description */}
        <div className="flex flex-col gap-2">
          {title && <h1 className="text-3xl font-bold tracking-tight">{title}</h1>}
          {description && <p className="text-muted-foreground text-lg">{description}</p>}
        </div>

        {/* Additional content */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
