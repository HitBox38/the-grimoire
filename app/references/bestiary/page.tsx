import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { PageHeader } from "@/components/PageHeader";
import DataTable from "./data-table";
import MonsterView from "./monsterView";

export default function Bestiary() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "References", href: "/references" },
    { label: "Bestiary", isCurrentPage: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Bestiary"
        description="Browse and search through monsters and creatures"
        breadcrumbItems={breadcrumbItems}
      />

      <main className="container mx-auto px-4 py-6">
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-200px)]">
          <ResizablePanel defaultSize={50}>
            <DataTable />
          </ResizablePanel>
          <ResizableHandle className="mx-4" withHandle />
          <ResizablePanel defaultSize={50}>
            <MonsterView />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
