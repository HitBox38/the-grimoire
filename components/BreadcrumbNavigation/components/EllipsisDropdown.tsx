import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronDown, Slash } from "lucide-react";
import Link from "next/link";
import { BreadcrumbItem as BreadcrumbItemType } from "../types";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  hiddenItems: BreadcrumbItemType[];
}

export const EllipsisDropdown = ({ hiddenItems }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [positionCalculated, setPositionCalculated] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
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
    <>
      <BreadcrumbItem>
        <button
          ref={triggerRef}
          className="flex items-center gap-1 hover:text-foreground transition-colors"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <BreadcrumbEllipsis />
          <ChevronDown className="h-3 w-3" />
        </button>

        {/* Portal dropdown - only render after position is calculated */}
        {isOpen &&
          positionCalculated &&
          typeof window !== "undefined" &&
          createPortal(
            <div
              className="fixed w-48 bg-background border border-border rounded-md shadow-xl"
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                zIndex: 999999,
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <div className="p-1 bg-background">
                {hiddenItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href || "#"}
                    className="block px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>,
            document.body
          )}
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <Slash />
      </BreadcrumbSeparator>
    </>
  );
};
