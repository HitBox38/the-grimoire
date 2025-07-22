"use client";

import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronDown, Slash } from "lucide-react";
import Link from "next/link";
import { BreadcrumbItem as BreadcrumbItemType } from "../types";
import { EllipsisDropdown } from "./EllipsisDropdown";
import { NavigationItem } from "./NavigationItem";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  items: BreadcrumbItemType[];
  maxDisplayItems?: number;
  shouldShowEllipsis?: boolean;
}

export const Breadcrumbs = ({ items, maxDisplayItems, shouldShowEllipsis }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [positionCalculated, setPositionCalculated] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
      setPositionCalculated(true);
    } else {
      setPositionCalculated(false);
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  if (!shouldShowEllipsis) {
    // Show all items if we don't need ellipsis
    return items.map((item, index) => <NavigationItem key={index} items={items} index={index} />);
  }

  // Handle edge case: if maxDisplayItems is 1, only show the last item
  if (maxDisplayItems === 1) {
    const lastItem = items[items.length - 1];
    return <NavigationItem key={items.length - 1} items={items} index={items.length - 1} />;
  }

  // Show first item, ellipsis dropdown, and last few items
  // We need to account for the ellipsis taking up one "slot"
  const firstItem = items[0];
  const numLastItems = maxDisplayItems ? maxDisplayItems - 2 : 2; // Reserve 1 for first item, 1 for ellipsis
  const lastItems = items.slice(-numLastItems);
  const hiddenItems = items.slice(1, -numLastItems);

  return (
    <>
      {/* First item */}
      <BreadcrumbItem>
        {firstItem.dropdownOptions && firstItem.dropdownOptions.length > 0 ? (
          <>
            <Link
              ref={triggerRef}
              href={firstItem.href || "#"}
              className="flex items-center gap-1 hover:text-foreground transition-colors hover:no-underline"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              {firstItem.label}
              <ChevronDown className="h-3 w-3" />
            </Link>

            {/* Portal dropdown - only render after position is calculated */}
            {isOpen &&
              positionCalculated &&
              typeof window !== "undefined" &&
              createPortal(
                <div
                  className="fixed w-56 bg-background border border-border rounded-md shadow-xl"
                  style={{
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    zIndex: 999999,
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                  <div className="p-1 bg-background">
                    {firstItem.dropdownOptions.map((option, optionIndex) => (
                      <Link
                        key={optionIndex}
                        href={option.href}
                        className="flex flex-col items-start p-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                        <span className="font-medium">{option.label}</span>
                        {option.description && (
                          <span className="text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>,
                document.body
              )}
          </>
        ) : (
          <BreadcrumbLink asChild>
            <Link href={firstItem.href || "#"}>{firstItem.label}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <Slash />
      </BreadcrumbSeparator>

      {/* Ellipsis dropdown for hidden items */}
      {hiddenItems.length > 0 && <EllipsisDropdown hiddenItems={hiddenItems} />}

      {/* Last items */}
      {lastItems.map((item, index) => {
        const actualIndex = items.length - lastItems.length + index;
        return <NavigationItem key={actualIndex} items={items} index={actualIndex} />;
      })}
    </>
  );
};
