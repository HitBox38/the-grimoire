import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import DataTable from "./data-table";
import MonsterView from "./monsterView";

export default function Bestiary() {
  return (
    <ResizablePanelGroup direction="horizontal" className="px-4 pb-4">
      <ResizablePanel defaultSize={50}>
        <DataTable />
      </ResizablePanel>
      <ResizableHandle className="mx-4" withHandle />
      <ResizablePanel defaultSize={50}>
        <MonsterView />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
