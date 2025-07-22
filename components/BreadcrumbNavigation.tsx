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

export interface BreadcrumbDropdownOption {
  label: string
  href: string
  description?: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
  dropdownOptions?: BreadcrumbDropdownOption[]
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
          ) : item.dropdownOptions && item.dropdownOptions.length > 0 ? (
            <div className="group relative inline-flex items-center">
              <Link 
                href={item.href || "#"} 
                className="flex items-center gap-1 hover:text-foreground transition-colors hover:no-underline"
              >
                {item.label}
                <ChevronDown className="h-3 w-3" />
              </Link>
              
              {/* Invisible bridge to prevent dropdown closing */}
              <div className="absolute top-full left-0 w-full h-1 group-hover:block hidden"></div>
              
              {/* Hover dropdown */}
              <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
                <div className="p-1">
                  {item.dropdownOptions.map((option, optionIndex) => (
                    <Link 
                      key={optionIndex} 
                      href={option.href} 
                      className="flex flex-col items-start p-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
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

    // Handle edge case: if maxDisplayItems is 1, only show the last item
    if (maxDisplayItems === 1) {
      const lastItem = items[items.length - 1]
      return renderBreadcrumbItem(lastItem, items.length - 1)
    }

    // Show first item, ellipsis dropdown, and last few items
    // We need to account for the ellipsis taking up one "slot"
    const firstItem = items[0]
    const numLastItems = maxDisplayItems - 2 // Reserve 1 for first item, 1 for ellipsis
    const lastItems = items.slice(-numLastItems)
    const hiddenItems = items.slice(1, -numLastItems)

    return (
      <>
        {/* First item */}
        <BreadcrumbItem>
          {firstItem.dropdownOptions && firstItem.dropdownOptions.length > 0 ? (
            <div className="group relative inline-flex items-center">
              <Link 
                href={firstItem.href || "#"} 
                className="flex items-center gap-1 hover:text-foreground transition-colors hover:no-underline"
              >
                {firstItem.label}
                <ChevronDown className="h-3 w-3" />
              </Link>
              
              {/* Invisible bridge to prevent dropdown closing */}
              <div className="absolute top-full left-0 w-full h-1 group-hover:block hidden"></div>
              
              {/* Hover dropdown */}
              <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
                <div className="p-1">
                  {firstItem.dropdownOptions.map((option, optionIndex) => (
                    <Link 
                      key={optionIndex} 
                      href={option.href} 
                      className="flex flex-col items-start p-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
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
              <Link href={firstItem.href || "#"}>{firstItem.label}</Link>
            </BreadcrumbLink>
          )}
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

