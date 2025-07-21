import * as React from "react"
import { BreadcrumbNavigation, BreadcrumbItem } from "./BreadcrumbNavigation"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title?: string
  description?: string
  breadcrumbItems: BreadcrumbItem[]
  className?: string
  children?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  breadcrumbItems,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header className={cn("border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <BreadcrumbNavigation 
            items={breadcrumbItems} 
            maxDisplayItems={4}
            className="text-sm"
          />
        </div>

        {/* Page Title and Description */}
        <div className="flex flex-col gap-2">
          {title && (
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          )}
          {description && (
            <p className="text-muted-foreground text-lg">{description}</p>
          )}
        </div>

        {/* Additional content */}
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>
    </header>
  )
}

// Example usage component
export function PageHeaderExample() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Products", href: "/dashboard/products" },
    { label: "Electronics", href: "/dashboard/products/electronics" },
    { label: "Smartphones", href: "/dashboard/products/electronics/smartphones" },
    { label: "iPhone 15 Pro", isCurrentPage: true },
  ]

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="iPhone 15 Pro"
        description="Manage and configure your iPhone 15 Pro product details"
        breadcrumbItems={breadcrumbItems}
      >
        {/* Example of additional header content */}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
            Edit Product
          </button>
          <button className="px-4 py-2 border border-input bg-background text-foreground rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            View Details
          </button>
        </div>
      </PageHeader>

      {/* Page content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
            <p className="text-muted-foreground">
              This is where your page content would go. The breadcrumb navigation 
              above provides easy navigation back to parent pages.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}