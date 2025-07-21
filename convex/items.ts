import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get all items, ordered by name
export const getItems = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db
      .query("items")
      .order("asc")
      .collect();

    return items;
  },
});

// Query to get a single item by ID
export const getItem = query({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    
    if (!item) {
      return null;
    }

    // Parse JSON fields back to objects
    const result = {
      ...item,
      properties: item.properties ? JSON.parse(item.properties) : undefined,
    };

    return result;
  },
});

// Query to search items by name
export const searchItems = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("items")
      .filter((q) => 
        q.or(
          q.eq(q.field("name"), args.searchTerm),
          q.gte(q.field("name"), args.searchTerm)
        )
      )
      .order("asc")
      .collect();

    return items;
  },
});

// Mutation to create a new item
export const createItem = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    subtype: v.optional(v.string()),
    rarity: v.string(),
    requiresAttunement: v.optional(v.boolean()),
    description: v.string(),
    properties: v.optional(v.any()),
    cost: v.optional(v.object({
      quantity: v.number(),
      unit: v.string(),
    })),
    weight: v.optional(v.number()),
    index: v.string(),
    url: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Convert complex objects to JSON strings for storage
    const itemData = {
      ...args,
      properties: args.properties ? JSON.stringify(args.properties) : undefined,
    };

    const itemId = await ctx.db.insert("items", itemData);
    return itemId;
  },
});

// Mutation to update an item
export const updateItem = mutation({
  args: {
    id: v.id("items"),
    name: v.optional(v.string()),
    type: v.optional(v.string()),
    subtype: v.optional(v.string()),
    rarity: v.optional(v.string()),
    requiresAttunement: v.optional(v.boolean()),
    description: v.optional(v.string()),
    properties: v.optional(v.any()),
    cost: v.optional(v.object({
      quantity: v.number(),
      unit: v.string(),
    })),
    weight: v.optional(v.number()),
    index: v.optional(v.string()),
    url: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Convert complex objects to JSON strings for storage
    const updateData: any = {};
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'properties') {
          updateData[key] = value ? JSON.stringify(value) : undefined;
        } else {
          updateData[key] = value;
        }
      }
    });

    await ctx.db.patch(id, updateData);
    return id;
  },
});

// Mutation to delete an item
export const deleteItem = mutation({
  args: { id: v.id("items") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});