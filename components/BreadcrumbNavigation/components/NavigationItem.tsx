"use client";

import { BreadcrumbItem as BreadcrumbItemType } from "../types";
import Link from "next/link";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ChevronDown } from "lucide-react";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { Fragment, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  items: BreadcrumbItemType[];
  index: number;
}

export const NavigationItem = ({ items, index }: Props) => {
  const isLast = index === items.length - 1;
  const item = items[index];
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

  return (
    <Fragment key={index}>
      <BreadcrumbItem>
        {item.isCurrentPage || isLast ? (
          <BreadcrumbPage>{item.label}</BreadcrumbPage>
        ) : item.dropdownOptions && item.dropdownOptions.length > 0 ? (
          <>
            <Link
              ref={triggerRef}
              href={item.href || "#"}
              className="flex items-center gap-1 hover:text-foreground transition-colors hover:no-underline"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              {item.label}
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
                    {item.dropdownOptions.map((option, optionIndex) => (
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
