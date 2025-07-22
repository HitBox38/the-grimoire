"use client";

import { useQuery } from "convex/react";
import api from "@/convex/_generated/api";
import { Monster, MonsterBase } from "./type";
import { Id } from "@/convex/_generated/dataModel";

export const useFetchMonsters = () => {
  return useQuery(api.monsters.getMonsters);
};

export const useFetchMonster = (id: Id<"monsters"> | null) => {
  return useQuery(api.monsters.getMonster, id ? { id } : "skip");
};

// Server action alternatives for use in server components
export const fetchMonsters = async (): Promise<MonsterBase[]> => {
  // This would need to be implemented with server-side Convex client
  // For now, we'll rely on client-side hooks
  throw new Error("Use useFetchMonsters hook in client components");
};

export const fetchMonster = async (_id: string | null): Promise<Monster | undefined> => {
  // This would need to be implemented with server-side Convex client
  // For now, we'll rely on client-side hooks
  throw new Error("Use useFetchMonster hook in client components");
};
