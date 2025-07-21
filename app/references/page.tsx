"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";

export default function References() {
  const router = useRouter();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "References", isCurrentPage: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="D&D References"
        description="Browse all available D&D reference materials"
        breadcrumbItems={breadcrumbItems}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          <Card
            className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg select-none"
            onClick={() => router.push("/references/bestiary")}>
            <CardHeader>
              <h2 className="text-2xl font-bold">Bestiary</h2>
              <p className="text-muted-foreground">Browse monsters and creatures</p>
            </CardHeader>
          </Card>
          <Card
            className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg select-none"
            onClick={() => router.push("/references/spells")}>
            <CardHeader>
              <h2 className="text-2xl font-bold">Spells</h2>
              <p className="text-muted-foreground">Search magical spells and abilities</p>
            </CardHeader>
          </Card>
          <Card
            className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg select-none"
            onClick={() => router.push("/references/items")}>
            <CardHeader>
              <h2 className="text-2xl font-bold">Items</h2>
              <p className="text-muted-foreground">Discover magical items and equipment</p>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
}