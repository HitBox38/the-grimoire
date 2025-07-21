import { PageHeader } from "@/components/PageHeader";

export default function Items() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "References", href: "/references" },
    { label: "Items", isCurrentPage: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Items"
        description="Discover magical items and equipment"
        breadcrumbItems={breadcrumbItems}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Items reference content coming soon...</p>
        </div>
      </main>
    </div>
  );
}
