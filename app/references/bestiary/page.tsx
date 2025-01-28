import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import DataTable from "./data-table";
import MonsterView from "./monsterView";

export default function Bestiary() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <DataTable />
      </ResizablePanel>
      <ResizableHandle className="mx-4" withHandle />
      <ResizablePanel>
        <MonsterView />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
