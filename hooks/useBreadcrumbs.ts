"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { BreadcrumbItem } from "@/components/BreadcrumbNavigation"

interface BreadcrumbConfig {
  // Map of path segments to display labels
  pathLabels?: Record<string, string>
  // Map of paths to custom hrefs (for dynamic routes)
  pathOverrides?: Record<string, string>
  // Function to transform path segments
  transformSegment?: (segment: string) => string
  // Base path to start from (default: "/")
  basePath?: string
  // Whether to include the current page as a link (default: false)
  includeCurrentAsLink?: boolean
}

export function useBreadcrumbs(config: BreadcrumbConfig = {}): BreadcrumbItem[] {
  const pathname = usePathname()
  
  const {
    pathLabels = {},
    pathOverrides = {},
    transformSegment = (segment: string) => 
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
    basePath = "/",
    includeCurrentAsLink = false,
  } = config

  return useMemo(() => {
    // Split pathname into segments
    const segments = pathname.split("/").filter(Boolean)
    
    // Start with home/root breadcrumb
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: pathLabels[basePath] || "Home",
        href: basePath,
      },
    ]

    // Build breadcrumbs for each segment
    let currentPath = ""
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === segments.length - 1
      
      // Check if we have a custom label for this path
      const label = pathLabels[currentPath] || 
                   pathLabels[segment] || 
                   transformSegment(segment)
      
      // Check if we have a custom href override
      const href = pathOverrides[currentPath] || currentPath
      
      breadcrumbs.push({
        label,
        href: isLast && !includeCurrentAsLink ? undefined : href,
        isCurrentPage: isLast && !includeCurrentAsLink,
      })
    })

    return breadcrumbs
  }, [pathname, pathLabels, pathOverrides, transformSegment, basePath, includeCurrentAsLink])
}

// Example usage configurations
export const commonBreadcrumbConfigs = {
  dashboard: {
    pathLabels: {
      "/": "Dashboard",
      "/dashboard": "Dashboard", 
      "/dashboard/products": "Products",
      "/dashboard/orders": "Orders",
      "/dashboard/customers": "Customers",
      "/dashboard/analytics": "Analytics",
      "/dashboard/settings": "Settings",
    },
    basePath: "/dashboard",
  },
  
  ecommerce: {
    pathLabels: {
      "/": "Home",
      "/products": "Products",
      "/categories": "Categories",
      "/cart": "Shopping Cart",
      "/checkout": "Checkout",
      "/account": "My Account",
      "/orders": "Order History",
    },
    transformSegment: (segment: string) => {
      // Handle product IDs and other dynamic segments
      if (segment.match(/^[0-9]+$/)) {
        return `Product ${segment}`
      }
      return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    },
  },
  
  docs: {
    pathLabels: {
      "/": "Documentation",
      "/docs": "Documentation",
      "/docs/getting-started": "Getting Started",
      "/docs/api": "API Reference",
      "/docs/examples": "Examples",
      "/docs/guides": "Guides",
    },
    basePath: "/docs",
  },
}

// Hook for common dashboard breadcrumbs
export function useDashboardBreadcrumbs(): BreadcrumbItem[] {
  return useBreadcrumbs(commonBreadcrumbConfigs.dashboard)
}

// Hook for common ecommerce breadcrumbs
export function useEcommerceBreadcrumbs(): BreadcrumbItem[] {
  return useBreadcrumbs(commonBreadcrumbConfigs.ecommerce)
}

// Hook for documentation breadcrumbs
export function useDocsBreadcrumbs(): BreadcrumbItem[] {
  return useBreadcrumbs(commonBreadcrumbConfigs.docs)
}