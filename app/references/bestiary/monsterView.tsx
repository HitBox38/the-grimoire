"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMonster } from "./actions";
import { LoaderPinwheelIcon } from "lucide-react";
import StatsTable from "@/components/StatsTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MonsterView() {
  const params = useSearchParams();
  const monsterId = params.get("monsterId");

  const { data, isFetching } = useQuery({
    queryKey: monsterId ? ["monster", monsterId] : ["no-monster"],
    queryFn: () => fetchMonster(monsterId),
    enabled: !!monsterId,
  });

  return (
    <div className="w-1/2 h-full">
      {isFetching ? (
        <LoaderPinwheelIcon className="animate-spin" />
      ) : data ? (
        <Card className="h-full">
          <ScrollArea className="h-full">
            <CardHeader>
              <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {data.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <section>
                <p className="leading-7">
                  <b>Hit Points: </b>
                  {data.hitPoints} ({data.hitPointsRoll})
                </p>
              </section>
              <section>
                <p className="leading-7">
                  <b>Armor Class: </b>
                  {data.armorClass.map((ac, index) => (
                    <span key={ac.type}>
                      {ac.value} ({ac.type}){index !== data?.armorClass.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </section>
              <section>
                <p className="leading-7">
                  <b>Initiative: </b>
                  {data.initiative ?? Math.floor((data.stats.dexterity - 10) / 2)}
                </p>
              </section>
              {data.stats ? <StatsTable stats={data.stats} /> : null}
              {data.specialAbilities && data.specialAbilities.length ? (
                <section className="flex flex-col gap-2">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Traits</h3>
                  {data.specialAbilities?.map((sa, index) => (
                    <div key={index}>
                      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        {sa.name}
                      </h4>
                      <p className="leading-7 pl-4">{sa.desc}</p>
                    </div>
                  ))}
                </section>
              ) : null}
              {data.actions && data.actions.length ? (
                <section className="flex flex-col gap-2">
                  <b className="scroll-m-20 text-2xl font-semibold tracking-tight">Actions</b>
                  {data.actions?.map((a, index) => (
                    <div key={index}>
                      <div className="flex flex-row gap-2">
                        <b className="text-xl">{a.name}</b>
                        {a.usage ? (
                          <p className="leading-7">
                            {a.usage.times ? `${a.usage.times} times` : ""} {a.usage.type}
                          </p>
                        ) : null}
                      </div>
                      <p className="leading-7 pl-4">{a.desc}</p>
                    </div>
                  ))}
                </section>
              ) : null}
            </CardContent>
          </ScrollArea>
        </Card>
      ) : null}
    </div>
  );
}
