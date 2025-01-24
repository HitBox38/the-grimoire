import DataTable from "./data-table";
import MonsterView from "./monsterView";

export default function Bestiary() {
  return (
    <div className="flex flex-row items-start justify-between w-full gap-4 pb-4 px-4 h-full overflow-hidden">
      <DataTable />
      <MonsterView />
    </div>
  );
}
