import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get all monsters, ordered by name
export const getMonsters = query({
  args: {},
  handler: async (ctx) => {
    const monsters = await ctx.db
      .query("monsters")
      .order("asc")
      .collect();

    // Return only the base monster information for list views
    return monsters.map((monster) => ({
      type: monster.type,
      subtype: monster.subtype,
      name: monster.name,
      id: monster._id,
      size: monster.size,
      hitPoints: monster.hitPoints,
    }));
  },
});

// Query to get a single monster by ID
export const getMonster = query({
  args: { id: v.id("monsters") },
  handler: async (ctx, args) => {
    const monster = await ctx.db.get(args.id);
    
    if (!monster) {
      return null;
    }

    // Parse JSON fields back to objects
    const result = {
      ...monster,
      specialAbilities: monster.specialAbilities ? JSON.parse(monster.specialAbilities) : undefined,
      actions: monster.actions ? JSON.parse(monster.actions) : undefined,
      legendaryActions: monster.legendaryActions ? JSON.parse(monster.legendaryActions) : undefined,
      reactions: monster.reactions ? JSON.parse(monster.reactions) : undefined,
      forms: monster.forms ? JSON.parse(monster.forms) : undefined,
    };

    return result;
  },
});

// Query to search monsters by name
export const searchMonsters = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const monsters = await ctx.db
      .query("monsters")
      .filter((q) => 
        q.or(
          q.eq(q.field("name"), args.searchTerm),
          // Basic text search - Convex doesn't have full-text search yet
          // This is a simple contains check
          q.gte(q.field("name"), args.searchTerm)
        )
      )
      .order("asc")
      .collect();

    return monsters.map((monster) => ({
      type: monster.type,
      subtype: monster.subtype,
      name: monster.name,
      id: monster._id,
      size: monster.size,
      hitPoints: monster.hitPoints,
    }));
  },
});

// Mutation to create a new monster
export const createMonster = mutation({
  args: {
    // Basic information
    name: v.string(),
    type: v.string(),
    subtype: v.optional(v.string()),
    size: v.string(),
    alignment: v.string(),
    
    // Combat stats
    hitPoints: v.number(),
    hitDice: v.string(),
    hitPointsRoll: v.string(),
    armorClass: v.array(v.any()),
    
    // Stats
    stats: v.object({
      strength: v.number(),
      dexterity: v.number(),
      constitution: v.number(),
      intelligence: v.number(),
      wisdom: v.number(),
      charisma: v.number(),
    }),
    
    // Movement
    speed: v.object({
      walk: v.optional(v.string()),
      swim: v.optional(v.string()),
      fly: v.optional(v.string()),
      burrow: v.optional(v.string()),
      climb: v.optional(v.string()),
      hover: v.optional(v.boolean()),
    }),
    
    // Challenge and Experience
    challengeRating: v.number(),
    proficiencyBonus: v.number(),
    xp: v.number(),
    
    // Senses and perception
    senses: v.object({
      darkvision: v.optional(v.string()),
      passivePerception: v.number(),
      blindsight: v.optional(v.string()),
      truesight: v.optional(v.string()),
      tremorsense: v.optional(v.string()),
    }),
    
    // Languages
    languages: v.string(),
    
    // Resistances and immunities
    damageVulnerabilities: v.array(v.string()),
    damageResistances: v.array(v.string()),
    damageImmunities: v.array(v.string()),
    conditionImmunities: v.array(v.any()),
    
    // Proficiencies
    proficiencies: v.array(v.any()),
    
    // Complex abilities
    specialAbilities: v.optional(v.any()),
    actions: v.optional(v.any()),
    legendaryActions: v.optional(v.any()),
    reactions: v.optional(v.any()),
    
    // Additional metadata
    index: v.string(),
    url: v.string(),
    image: v.optional(v.string()),
    desc: v.optional(v.string()),
    source: v.optional(v.string()),
    initiative: v.optional(v.number()),
    forms: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    // Convert complex objects to JSON strings for storage
    const monsterData = {
      ...args,
      specialAbilities: args.specialAbilities ? JSON.stringify(args.specialAbilities) : undefined,
      actions: args.actions ? JSON.stringify(args.actions) : undefined,
      legendaryActions: args.legendaryActions ? JSON.stringify(args.legendaryActions) : undefined,
      reactions: args.reactions ? JSON.stringify(args.reactions) : undefined,
      forms: args.forms ? JSON.stringify(args.forms) : undefined,
    };

    const monsterId = await ctx.db.insert("monsters", monsterData);
    return monsterId;
  },
});

// Mutation to update a monster
export const updateMonster = mutation({
  args: {
    id: v.id("monsters"),
    // All the same fields as createMonster but optional
    name: v.optional(v.string()),
    type: v.optional(v.string()),
    subtype: v.optional(v.string()),
    size: v.optional(v.string()),
    alignment: v.optional(v.string()),
    hitPoints: v.optional(v.number()),
    hitDice: v.optional(v.string()),
    hitPointsRoll: v.optional(v.string()),
    armorClass: v.optional(v.array(v.any())),
    stats: v.optional(v.object({
      strength: v.number(),
      dexterity: v.number(),
      constitution: v.number(),
      intelligence: v.number(),
      wisdom: v.number(),
      charisma: v.number(),
    })),
    speed: v.optional(v.object({
      walk: v.optional(v.string()),
      swim: v.optional(v.string()),
      fly: v.optional(v.string()),
      burrow: v.optional(v.string()),
      climb: v.optional(v.string()),
      hover: v.optional(v.boolean()),
    })),
    challengeRating: v.optional(v.number()),
    proficiencyBonus: v.optional(v.number()),
    xp: v.optional(v.number()),
    senses: v.optional(v.object({
      darkvision: v.optional(v.string()),
      passivePerception: v.number(),
      blindsight: v.optional(v.string()),
      truesight: v.optional(v.string()),
      tremorsense: v.optional(v.string()),
    })),
    languages: v.optional(v.string()),
    damageVulnerabilities: v.optional(v.array(v.string())),
    damageResistances: v.optional(v.array(v.string())),
    damageImmunities: v.optional(v.array(v.string())),
    conditionImmunities: v.optional(v.array(v.any())),
    proficiencies: v.optional(v.array(v.any())),
    specialAbilities: v.optional(v.any()),
    actions: v.optional(v.any()),
    legendaryActions: v.optional(v.any()),
    reactions: v.optional(v.any()),
    index: v.optional(v.string()),
    url: v.optional(v.string()),
    image: v.optional(v.string()),
    desc: v.optional(v.string()),
    source: v.optional(v.string()),
    initiative: v.optional(v.number()),
    forms: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Convert complex objects to JSON strings for storage
    const updateData: any = {};
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        if (['specialAbilities', 'actions', 'legendaryActions', 'reactions', 'forms'].includes(key)) {
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

// Mutation to delete a monster
export const deleteMonster = mutation({
  args: { id: v.id("monsters") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});