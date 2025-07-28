import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const monsters = await ctx.db.query("monsters").collect();
    return monsters.map((monster) => ({
      id: monster.id,
      name: monster.name,
      type: monster.type,
      size: monster.size,
      hitPoints: monster.hitPoints,
    }));
  },
});

export const getById = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const monster = await ctx.db
      .query("monsters")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();
    return monster;
  },
});

export const getProperties = query({
  args: {},
  handler: async (ctx) => {
    // gets all known keys from the monsters table
    const properties = await ctx.db.query("monsters").collect();
    const keys = new Set<string>();
    properties.forEach((property) => {
      Object.keys(property).forEach((key) => {
        keys.add(key);
      });
    });
    return Array.from(keys);
  },
});

export const search = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const monsters = await ctx.db
      .query("monsters")
      .filter((q) => q.eq(q.field("name"), args.query))
      .collect();
    return monsters;
  },
});
