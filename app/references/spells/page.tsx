import { PageHeader } from "@/components/PageHeader";

export default function Spells() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "References", href: "/references" },
    { label: "Spells", isCurrentPage: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Spells"
        description="Search and browse magical spells and abilities"
        breadcrumbItems={breadcrumbItems}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Spells reference content coming soon...</p>
        </div>
      </main>
    </div>
  );
}
