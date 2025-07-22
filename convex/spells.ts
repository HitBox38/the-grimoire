import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get all spells, ordered by name
export const getSpells = query({
  args: {},
  handler: async (ctx) => {
    const spells = await ctx.db
      .query("spells")
      .order("asc")
      .collect();

    return spells;
  },
});

// Query to get a single spell by ID
export const getSpell = query({
  args: { id: v.id("spells") },
  handler: async (ctx, args) => {
    const spell = await ctx.db.get(args.id);
    
    if (!spell) {
      return null;
    }

    // Parse JSON fields back to objects
    const result = {
      ...spell,
      damage: spell.damage ? JSON.parse(spell.damage) : undefined,
      healAtSlotLevel: spell.healAtSlotLevel ? JSON.parse(spell.healAtSlotLevel) : undefined,
    };

    return result;
  },
});

// Query to search spells by name
export const searchSpells = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const spells = await ctx.db
      .query("spells")
      .filter((q) => 
        q.or(
          q.eq(q.field("name"), args.searchTerm),
          q.gte(q.field("name"), args.searchTerm)
        )
      )
      .order("asc")
      .collect();

    return spells;
  },
});

// Query to get spells by level
export const getSpellsByLevel = query({
  args: { level: v.number() },
  handler: async (ctx, args) => {
    const spells = await ctx.db
      .query("spells")
      .withIndex("by_level", (q) => q.eq("level", args.level))
      .order("asc")
      .collect();

    return spells;
  },
});

// Query to get spells by school
export const getSpellsBySchool = query({
  args: { school: v.string() },
  handler: async (ctx, args) => {
    const spells = await ctx.db
      .query("spells")
      .withIndex("by_school", (q) => q.eq("school", args.school))
      .order("asc")
      .collect();

    return spells;
  },
});

// Query to get spells by class
export const getSpellsByClass = query({
  args: { className: v.string() },
  handler: async (ctx, args) => {
    const spells = await ctx.db
      .query("spells")
      .filter((q) => q.eq(q.field("classes"), [args.className]))
      .order("asc")
      .collect();

    return spells;
  },
});

// Mutation to create a new spell
export const createSpell = mutation({
  args: {
    name: v.string(),
    level: v.number(),
    school: v.string(),
    castingTime: v.string(),
    range: v.string(),
    components: v.array(v.string()),
    duration: v.string(),
    description: v.string(),
    higherLevel: v.optional(v.string()),
    ritual: v.boolean(),
    concentration: v.boolean(),
    classes: v.array(v.string()),
    subclasses: v.optional(v.array(v.string())),
    damage: v.optional(v.any()),
    healAtSlotLevel: v.optional(v.any()),
    index: v.string(),
    url: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Convert complex objects to JSON strings for storage
    const spellData = {
      ...args,
      damage: args.damage ? JSON.stringify(args.damage) : undefined,
      healAtSlotLevel: args.healAtSlotLevel ? JSON.stringify(args.healAtSlotLevel) : undefined,
    };

    const spellId = await ctx.db.insert("spells", spellData);
    return spellId;
  },
});

// Mutation to update a spell
export const updateSpell = mutation({
  args: {
    id: v.id("spells"),
    name: v.optional(v.string()),
    level: v.optional(v.number()),
    school: v.optional(v.string()),
    castingTime: v.optional(v.string()),
    range: v.optional(v.string()),
    components: v.optional(v.array(v.string())),
    duration: v.optional(v.string()),
    description: v.optional(v.string()),
    higherLevel: v.optional(v.string()),
    ritual: v.optional(v.boolean()),
    concentration: v.optional(v.boolean()),
    classes: v.optional(v.array(v.string())),
    subclasses: v.optional(v.array(v.string())),
    damage: v.optional(v.any()),
    healAtSlotLevel: v.optional(v.any()),
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
        if (['damage', 'healAtSlotLevel'].includes(key)) {
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

// Mutation to delete a spell
export const deleteSpell = mutation({
  args: { id: v.id("spells") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});