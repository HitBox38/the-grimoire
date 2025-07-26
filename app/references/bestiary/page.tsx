"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { PageHeader } from "@/components/PageHeader";
import DataTable from "./data-table";
import MonsterView from "./monsterView";
import { useSearchParams } from "next/navigation";

export default function Bestiary() {
  const searchParams = useSearchParams();
  const monsterId = searchParams.get("monsterId");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: "References",
      href: "/references",
      dropdownOptions: [
        {
          label: "Bestiary",
          href: "/references/bestiary",
          description: "Browse monsters and creatures",
        },
        {
          label: "Spells",
          href: "/references/spells",
          description: "Search magical spells and abilities",
        },
        {
          label: "Items",
          href: "/references/items",
          description: "Discover magical items and equipment",
        },
      ],
    },
    { label: "Bestiary", isCurrentPage: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Bestiary"
        description="Browse and search through monsters and creatures"
        breadcrumbItems={breadcrumbItems}
      />

      {monsterId ? (
        // Two-panel layout when a monster is selected
        <main className="mx-auto px-4 py-6 h-[calc(100vh-200px)]">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={50} className="flex flex-col min-h-0">
              <div className="h-full overflow-hidden">
                <DataTable />
              </div>
            </ResizablePanel>
            <ResizableHandle className="mx-4" withHandle />
            <ResizablePanel defaultSize={50} className="flex flex-col min-h-0">
              <div className="h-full overflow-hidden">
                <MonsterView />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      ) : (
        // Full-width layout when no monster is selected
        <main className="px-4 py-6 h-[calc(100vh-200px)]">
          <div className="h-full w-full">
            <DataTable />
          </div>
        </main>
      )}
    </div>
  );
}
