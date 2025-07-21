import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
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
      {/* Compact breadcrumb header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 py-3">
          <BreadcrumbNavigation 
            items={breadcrumbItems} 
            maxDisplayItems={4}
            className="text-sm"
          />
        </div>
      </div>

      {/* Full width resizable panels */}
      <ResizablePanelGroup direction="horizontal" className="px-4 pb-4 min-h-[calc(100vh-80px)]">
        <ResizablePanel defaultSize={50}>
          <DataTable />
        </ResizablePanel>
        <ResizableHandle className="mx-4" withHandle />
        <ResizablePanel defaultSize={50}>
          <MonsterView />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
