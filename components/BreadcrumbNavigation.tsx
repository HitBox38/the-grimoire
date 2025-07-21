"use client"

import * as React from "react"
import Link from "next/link"
import { Slash, ChevronDown } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[]
  maxDisplayItems?: number
  className?: string
}

export function BreadcrumbNavigation({
  items,
  maxDisplayItems = 3,
  className,
}: BreadcrumbNavigationProps) {
  // If we have more items than maxDisplayItems, we need to show ellipsis
  const shouldShowEllipsis = items.length > maxDisplayItems
  
  // Function to render a breadcrumb item
  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number) => {
    const isLast = index === items.length - 1
    
    return (
      <React.Fragment key={index}>
        <BreadcrumbItem>
          {item.isCurrentPage || isLast ? (
            <BreadcrumbPage>{item.label}</BreadcrumbPage>
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
      </React.Fragment>
    )
  }

  // Function to render ellipsis with dropdown
  const renderEllipsisDropdown = (hiddenItems: BreadcrumbItem[]) => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }

  const renderBreadcrumbs = () => {
    if (!shouldShowEllipsis) {
      // Show all items if we don't need ellipsis
      return items.map((item, index) => renderBreadcrumbItem(item, index))
    }

    // Show first item, ellipsis dropdown, and last few items
    const firstItem = items[0]
    const lastItems = items.slice(-(maxDisplayItems - 1))
    const hiddenItems = items.slice(1, -(maxDisplayItems - 1))

    return (
      <>
        {/* First item */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={firstItem.href || "#"}>{firstItem.label}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>

        {/* Ellipsis dropdown for hidden items */}
        {hiddenItems.length > 0 && renderEllipsisDropdown(hiddenItems)}

        {/* Last items */}
        {lastItems.map((item, index) => {
          const actualIndex = items.length - lastItems.length + index
          return renderBreadcrumbItem(item, actualIndex)
        })}
      </>
    )
  }

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>{renderBreadcrumbs()}</BreadcrumbList>
    </Breadcrumb>
  )
}

// Example usage component
export function BreadcrumbNavigationExample() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Category", href: "/products/category" },
    { label: "Subcategory", href: "/products/category/subcategory" },
    { label: "Item", href: "/products/category/subcategory/item" },
    { label: "Current Page", isCurrentPage: true },
  ]

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Breadcrumb Navigation Examples</h3>
      
      {/* Example with many items (will show ellipsis) */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Long breadcrumb (with ellipsis):</h4>
        <BreadcrumbNavigation items={breadcrumbItems} maxDisplayItems={3} />
      </div>

      {/* Example with few items (no ellipsis) */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Short breadcrumb (no ellipsis):</h4>
        <BreadcrumbNavigation 
          items={breadcrumbItems.slice(0, 3)} 
          maxDisplayItems={3} 
        />
      </div>

      {/* Example with custom max display items */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Custom max display (5 items):</h4>
        <BreadcrumbNavigation items={breadcrumbItems} maxDisplayItems={5} />
      </div>
    </div>
  )
}