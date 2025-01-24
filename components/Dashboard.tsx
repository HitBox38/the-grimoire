"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "./ui/card";

export const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card
          className="cursor-pointer hover:scale-110 transition-transform duration-500 select-none"
          onClick={() => router.push("/references/bestiary")}>
          <CardHeader>
            <h1 className="text-4xl font-bold">Bestiary</h1>
          </CardHeader>
        </Card>
        <Card
          className="cursor-pointer hover:scale-110 transition-transform duration-500 select-none"
          onClick={() => router.push("/references/spells")}>
          <CardHeader>
            <h1 className="text-4xl font-bold">Spells</h1>
          </CardHeader>
        </Card>
        <Card
          className="cursor-pointer hover:scale-110 transition-transform duration-500 select-none"
          onClick={() => router.push("/references/items")}>
          <CardHeader>
            <h1 className="text-4xl font-bold">Items</h1>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};
