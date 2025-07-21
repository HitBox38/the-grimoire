"use client"

import { PageHeader } from "@/components/PageHeader"
import { BreadcrumbNavigationExample } from "@/components/BreadcrumbNavigation"
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs"

export default function BreadcrumbExamplesPage() {
  // Example using the hook
  const autoBreadcrumbs = useBreadcrumbs({
    pathLabels: {
      "/": "Home",
      "/examples": "Examples", 
      "/examples/breadcrumbs": "Breadcrumb Components",
    },
  })

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Breadcrumb Examples"
        description="Comprehensive examples of the enhanced breadcrumb navigation component with all requested features"
        breadcrumbItems={autoBreadcrumbs}
      />

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Feature Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Features Implemented</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2">✅ Slash Icon Separator</h3>
              <p className="text-sm text-muted-foreground">
                Uses the Slash icon from lucide-react as the custom separator between breadcrumb items.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2">✅ Ellipsis Handling</h3>
              <p className="text-sm text-muted-foreground">
                Automatically shows ellipsis when breadcrumbs exceed the maximum display items.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2">✅ Dropdown Navigation</h3>
              <p className="text-sm text-muted-foreground">
                Hidden breadcrumb items are accessible through a dropdown menu in the ellipsis.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2">✅ Page Header Integration</h3>
              <p className="text-sm text-muted-foreground">
                Designed to work seamlessly in page headers with proper styling and layout.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2">✅ Automatic Generation</h3>
              <p className="text-sm text-muted-foreground">
                Includes hooks to automatically generate breadcrumbs from the current route.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2">✅ Full Customization</h3>
              <p className="text-sm text-muted-foreground">
                Supports custom labels, hrefs, and display configurations for any use case.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Examples */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Interactive Examples</h2>
          <div className="border rounded-lg bg-card p-6">
            <BreadcrumbNavigationExample />
          </div>
        </section>

        {/* Usage Guide */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Usage Guide</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border rounded-lg bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
              <pre className="text-sm bg-muted p-4 rounded overflow-x-auto">
{`import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation"

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Current Page", isCurrentPage: true }
]

<BreadcrumbNavigation 
  items={breadcrumbs}
  maxDisplayItems={3}
/>`}
              </pre>
            </div>

            <div className="border rounded-lg bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">With Automatic Generation</h3>
              <pre className="text-sm bg-muted p-4 rounded overflow-x-auto">
{`import { useBreadcrumbs } from "@/hooks/useBreadcrumbs"
import { PageHeader } from "@/components/PageHeader"

function MyPage() {
  const breadcrumbs = useBreadcrumbs({
    pathLabels: {
      "/": "Home",
      "/products": "Products"
    }
  })

  return (
    <PageHeader 
      title="Page Title"
      breadcrumbItems={breadcrumbs}
    />
  )
}`}
              </pre>
            </div>

            <div className="border rounded-lg bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">In Page Headers</h3>
              <pre className="text-sm bg-muted p-4 rounded overflow-x-auto">
{`import { PageHeader } from "@/components/PageHeader"

<PageHeader
  title="Product Details"
  description="Manage your product information"
  breadcrumbItems={breadcrumbItems}
>
  <div className="flex gap-2">
    <button>Edit</button>
    <button>Delete</button>
  </div>
</PageHeader>`}
              </pre>
            </div>

            <div className="border rounded-lg bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Advanced Configuration</h3>
              <pre className="text-sm bg-muted p-4 rounded overflow-x-auto">
{`const breadcrumbs = useBreadcrumbs({
  pathLabels: {
    "/dashboard": "Dashboard",
    "/products": "Products"
  },
  pathOverrides: {
    "/products/123": "/products/special-product"
  },
  transformSegment: (segment) => {
    if (segment.match(/^\d+$/)) {
      return \`Product \${segment}\`
    }
    return segment.toUpperCase()
  },
  maxDisplayItems: 4
})`}
              </pre>
            </div>
          </div>
        </section>

        {/* Component Props */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Component Props</h2>
          <div className="border rounded-lg bg-card overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">BreadcrumbNavigation Props</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Prop</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Default</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="p-2 font-mono">items</td>
                      <td className="p-2">BreadcrumbItem[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Array of breadcrumb items to display</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">maxDisplayItems</td>
                      <td className="p-2">number</td>
                      <td className="p-2">3</td>
                      <td className="p-2">Maximum items to show before using ellipsis</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">className</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Additional CSS classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}