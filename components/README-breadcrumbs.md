# Enhanced Breadcrumb Navigation Components

A comprehensive breadcrumb navigation system built on top of shadcn/ui with enhanced features for better user experience.

## Features

✅ **Slash Icon Separator** - Uses the Slash icon from lucide-react as the custom separator  
✅ **Smart Ellipsis Handling** - Automatically shows ellipsis when breadcrumbs exceed maximum display items  
✅ **Dropdown Navigation** - Hidden breadcrumb items are accessible through a dropdown menu  
✅ **Page Header Integration** - Designed to work seamlessly in page headers  
✅ **Automatic Generation** - Hooks to automatically generate breadcrumbs from routes  
✅ **Full Customization** - Supports custom labels, hrefs, and display configurations  

## Components

### `BreadcrumbNavigation`
The main breadcrumb component with enhanced features.

```tsx
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation"

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Current Page", isCurrentPage: true }
]

<BreadcrumbNavigation 
  items={breadcrumbs}
  maxDisplayItems={3}
/>
```

### `PageHeader`
A complete page header component that includes breadcrumb navigation.

```tsx
import { PageHeader } from "@/components/PageHeader"

<PageHeader
  title="Product Details"
  description="Manage your product information"
  breadcrumbItems={breadcrumbItems}
>
  <div className="flex gap-2">
    <button>Edit</button>
    <button>Delete</button>
  </div>
</PageHeader>
```

## Hooks

### `useBreadcrumbs`
Automatically generates breadcrumb items from the current route.

```tsx
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs"

const breadcrumbs = useBreadcrumbs({
  pathLabels: {
    "/": "Home",
    "/products": "Products"
  },
  transformSegment: (segment) => {
    if (segment.match(/^\d+$/)) {
      return `Product ${segment}`
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1)
  }
})
```

### Pre-configured Hooks
- `useDashboardBreadcrumbs()` - For dashboard applications
- `useEcommerceBreadcrumbs()` - For e-commerce sites  
- `useDocsBreadcrumbs()` - For documentation sites

## Props

### BreadcrumbNavigation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | - | Array of breadcrumb items to display |
| `maxDisplayItems` | `number` | `3` | Maximum items to show before using ellipsis |
| `className` | `string` | - | Additional CSS classes |

### BreadcrumbItem Interface

```tsx
interface BreadcrumbItem {
  label: string           // Display text
  href?: string          // Link URL (optional for current page)
  isCurrentPage?: boolean // Mark as current page (non-clickable)
}
```

### useBreadcrumbs Config

```tsx
interface BreadcrumbConfig {
  pathLabels?: Record<string, string>      // Custom labels for paths
  pathOverrides?: Record<string, string>   // Custom hrefs for dynamic routes
  transformSegment?: (segment: string) => string  // Transform path segments
  basePath?: string                        // Base path (default: "/")
  includeCurrentAsLink?: boolean          // Make current page clickable
}
```

## Installation

1. Install the required shadcn components:
```bash
npx shadcn@latest add breadcrumb dropdown-menu
```

2. Copy the component files:
- `components/BreadcrumbNavigation.tsx`
- `components/PageHeader.tsx`
- `hooks/useBreadcrumbs.ts`

3. Import and use in your application!

## Examples

Visit `/examples/breadcrumbs` to see all features in action with interactive examples and complete documentation.

## Advanced Usage

### Custom Ellipsis Behavior
The component automatically handles ellipsis display based on `maxDisplayItems`. When there are more items than the maximum:

- Shows the first item
- Shows ellipsis with dropdown containing hidden items
- Shows the last N-1 items (where N is maxDisplayItems)

### Dynamic Route Handling
Use `pathOverrides` to handle dynamic routes:

```tsx
const breadcrumbs = useBreadcrumbs({
  pathOverrides: {
    "/users/123": "/users/profile"  // Redirect dynamic user ID to profile
  }
})
```

### Custom Separators
While the component defaults to the Slash icon, you can customize separators:

```tsx
<BreadcrumbSeparator>
  <ChevronRight className="h-4 w-4" />
</BreadcrumbSeparator>
```