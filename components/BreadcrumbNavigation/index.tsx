import { Breadcrumb, BreadcrumbList } from "../ui/breadcrumb";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { BreadcrumbItem } from "./types";

interface Props {
  items: BreadcrumbItem[];
  maxDisplayItems?: number;
  className?: string;
}

export const BreadcrumbNavigation = ({ className, items, maxDisplayItems = 3 }: Props) => {
  const shouldShowEllipsis = items.length > maxDisplayItems;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <Breadcrumbs
          items={items}
          maxDisplayItems={maxDisplayItems}
          shouldShowEllipsis={shouldShowEllipsis}
        />
      </BreadcrumbList>
    </Breadcrumb>
  );
};
