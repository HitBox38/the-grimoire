"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMonster } from "./actions";
import { LoaderPinwheelIcon } from "lucide-react";
import StatsTable from "@/components/StatsTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

export default function MonsterView() {
  const params = useSearchParams();
  const monsterId = params.get("monsterId");

  const { data, isFetching } = useQuery({
    queryKey: ["monster", monsterId],
    queryFn: () => (monsterId ? fetchMonster(monsterId) : undefined),
  });

  return (
    <ScrollArea className="rounded-lg border p-4 w-1/2 h-full">
      {isFetching ? (
        <LoaderPinwheelIcon className="animate-spin" />
      ) : data ? (
        <div className="flex flex-col items-start justify-center gap-4">
          <h3 className="text-4xl font-bold">{data.name}</h3>
          {data.stats ? <StatsTable stats={data.stats} /> : null}
          <section>
            <p>
              <b>Hit Points: </b>
              {data.hitPoints} ({data.hitPointsRoll})
            </p>
          </section>
          <section>
            <p>
              <b>Armor Class: </b>
              {data.armorClass.map((ac, index) => (
                <span key={ac.type}>
                  {ac.value} ({ac.type}){index !== data?.armorClass.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </section>
          {data.specialAbilities && data.specialAbilities.length ? (
            <section>
              <b className="text-2xl">Traits</b>
              {data.specialAbilities?.map((sa, index) => (
                <div key={index}>
                  <b className="text-xl">{sa.name}</b>
                  <p>{sa.desc}</p>
                </div>
              ))}
            </section>
          ) : null}
          {data.actions && data.actions.length ? (
            <section>
              <b className="text-2xl">Actions</b>
              {data.actions?.map((a, index) => (
                <div key={index}>
                  <b className="text-xl">{a.name}</b>
                  <p>{a.desc}</p>
                  {a.attacks ? <p>{a.attacks.map((at) => at.name).join(", ")}</p> : null}
                  {a.usage ? <p>{a.usage.type}</p> : null}
                  {a.damage ? <p>{a.damage.map((d) => d.damageDice).join(", ")}</p> : null}
                </div>
              ))}
            </section>
          ) : null}
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </ScrollArea>
  );
}
