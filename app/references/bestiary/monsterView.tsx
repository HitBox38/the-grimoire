"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMonster } from "./actions";
import { LoaderPinwheelIcon } from "lucide-react";
import StatsTable from "@/components/StatsTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { calculateStatModifier } from "@/lib/calculateStatModifier";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export default function MonsterView() {
  const params = useSearchParams();
  const monsterId = params.get("monsterId");

  const { data, isFetching } = useQuery({
    queryKey: monsterId ? ["monster", monsterId] : ["no-monster"],
    queryFn: () => fetchMonster(monsterId),
    enabled: !!monsterId,
  });

  return (
    <div className="h-full">
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
              <Tabs defaultValue="stats" className="flex flex-col gap-4">
                {data.desc ? (
                  <TabsList className={cn({ "grid grid-cols-2": !!data.desc }, "w-full")}>
                    <TabsTrigger value="stats">Stat Block</TabsTrigger>
                    <TabsTrigger value="info">Info</TabsTrigger>
                  </TabsList>
                ) : null}
                <TabsContent value="stats" className="flex flex-col gap-4">
                  <section>
                    <p className="leading-7 capitalize italic">
                      {data.size} {data.type}
                      {data.subtype ? ` (${data.subtype})` : null}, {data.alignment}
                    </p>
                    <div className="flex flex-row justify-between">
                      <p className="leading-7">
                        <b>Armor Class: </b>
                        {data.armorClass.map((ac, index) => (
                          <span key={ac.type}>
                            {ac.value} ({ac.type})
                            {index !== data?.armorClass.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                      <p className="leading-7">
                        <b>Initiative: </b>
                        {data.initiative ?? calculateStatModifier(data.stats.dexterity)}
                      </p>
                    </div>
                    <p className="leading-7">
                      <b>Hit Points: </b>
                      {data.hitPoints} ({data.hitPointsRoll})
                    </p>
                    <p className="leading-7">
                      <b>Speed: </b>
                      {Object.entries(data.speed).map(([key, value], index) => (
                        <span key={key}>
                          <span className="capitalize">{key !== "walk" ? `${key}: ` : null}</span>
                          {value}
                          {index !== Object.entries(data.speed).length - 1 ? ", " : null}
                        </span>
                      ))}
                    </p>
                  </section>
                  {data.stats ? (
                    <StatsTable
                      stats={data.stats}
                      proficiencyBonus={data.proficiencyBonus}
                      savingThrowProficiencies={data.proficiencies
                        .filter((p) => p.proficiency.name.includes("Saving Throw"))
                        .map((p) =>
                          p.proficiency.name.substring(p.proficiency.name.indexOf(": ") + 2)
                        )}
                    />
                  ) : null}
                  <section>
                    <p>
                      <b>Skills:</b>
                      {data.proficiencies.map((p, index) => {
                        return p.proficiency.name.includes("Skill") ? (
                          <span key={p.proficiency.name}>
                            {p.proficiency.name.substring(p.proficiency.name.indexOf(" "))}{" "}
                            {p.value > 0 ? "+" : ""}
                            {p.value}
                            {index !== data.proficiencies.length - 1 ? ", " : ""}
                          </span>
                        ) : null;
                      })}
                    </p>
                    <p>
                      <b>Senses:</b>{" "}
                      {data.senses.darkvision ? `Darkvision ${data.senses.darkvision}` : null}{" "}
                      {data.senses.blindsight ? `Blindsight ${data.senses.blindsight}` : null}{" "}
                      {data.senses.truesight ? `Truesight ${data.senses.truesight}` : null}{" "}
                      {data.senses.tremorsense ? `Tremorsense ${data.senses.tremorsense}` : null}{" "}
                      Passive Perception {data.senses.passivePerception}
                    </p>
                    <p>
                      <b>Languages:</b> {data.languages}
                    </p>
                    <p>
                      <b>CR:</b> {data.challengeRating} (XP {data.xp.toLocaleString("en-us")}; PB{" "}
                      {data.proficiencyBonus > 0
                        ? `+${data.proficiencyBonus}`
                        : data.proficiencyBonus}
                      )
                    </p>
                  </section>
                  <Accordion
                    type="multiple"
                    defaultValue={["traits", "actions", "reactions", "legendary-actions"]}>
                    {data.specialAbilities && data.specialAbilities.length ? (
                      <AccordionItem value="traits">
                        <AccordionTrigger>
                          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Traits
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          {data.specialAbilities?.map((sa, index) => (
                            <div key={index}>
                              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                {sa.name}
                              </h4>
                              <p className="leading-7 pl-4">{sa.desc}</p>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ) : null}
                    {data.actions && data.actions.length ? (
                      <AccordionItem value="actions">
                        <AccordionTrigger>
                          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Actions
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent>
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
                        </AccordionContent>
                      </AccordionItem>
                    ) : null}
                    {data.reactions && data.reactions.length ? (
                      <AccordionItem value="reactions">
                        <AccordionTrigger>
                          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Reactions
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          {data.reactions?.map((r, index) => (
                            <div key={index}>
                              <b className="text-xl">{r.name}</b>
                              <p className="leading-7 pl-4">{r.desc}</p>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ) : null}
                    {data.legendaryActions && data.legendaryActions.length ? (
                      <AccordionItem value="legendary-actions">
                        <AccordionTrigger>
                          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Legendary Actions
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          {data.legendaryActions?.map((a, index) => (
                            <div key={index}>
                              <b className="text-xl">{a.name}</b>
                              <p className="leading-7 pl-4">{a.desc}</p>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ) : null}
                  </Accordion>
                </TabsContent>
                <TabsContent value="info">
                  <section>
                    <p className="leading-7">{data.desc}</p>
                  </section>
                </TabsContent>
              </Tabs>
              <div className="flex flex-row-reverse">
                <p className="leading-7 text-gray-500">Source: {data.source ?? "SRD"}</p>
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      ) : null}
    </div>
  );
}
