import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  monsters: defineTable({
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
    armorClass: v.array(v.object({
      type: v.string(),
      value: v.number(),
      condition: v.optional(v.object({
        index: v.string(),
        name: v.string(),
        url: v.string(),
      })),
      spell: v.optional(v.object({
        index: v.string(),
        name: v.string(),
        url: v.string(),
      })),
      armor: v.optional(v.array(v.object({
        index: v.string(),
        name: v.string(),
        url: v.string(),
      }))),
      desc: v.optional(v.string()),
    })),
    
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
    conditionImmunities: v.array(v.object({
      index: v.string(),
      name: v.string(),
      url: v.string(),
    })),
    
    // Proficiencies
    proficiencies: v.array(v.object({
      value: v.number(),
      proficiency: v.object({
        index: v.string(),
        name: v.string(),
        url: v.string(),
      }),
    })),
    
    // Complex abilities - storing as JSON strings for now
    specialAbilities: v.optional(v.string()), // JSON string
    actions: v.optional(v.string()), // JSON string
    legendaryActions: v.optional(v.string()), // JSON string
    reactions: v.optional(v.string()), // JSON string
    
    // Additional metadata
    index: v.string(),
    url: v.string(),
    image: v.optional(v.string()),
    desc: v.optional(v.string()),
    source: v.optional(v.string()),
    initiative: v.optional(v.number()),
    forms: v.optional(v.string()), // JSON string
  })
    .index("by_name", ["name"])
    .index("by_type", ["type"])
    .index("by_challenge_rating", ["challengeRating"]),

  items: defineTable({
    name: v.string(),
    type: v.string(),
    subtype: v.optional(v.string()),
    rarity: v.string(),
    requiresAttunement: v.optional(v.boolean()),
    description: v.string(),
    properties: v.optional(v.string()), // JSON string for complex properties
    cost: v.optional(v.object({
      quantity: v.number(),
      unit: v.string(),
    })),
    weight: v.optional(v.number()),
    index: v.string(),
    url: v.string(),
    source: v.optional(v.string()),
  })
    .index("by_name", ["name"])
    .index("by_type", ["type"])
    .index("by_rarity", ["rarity"]),

  spells: defineTable({
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
    damage: v.optional(v.string()), // JSON string for complex damage
    healAtSlotLevel: v.optional(v.string()), // JSON string
    index: v.string(),
    url: v.string(),
    source: v.optional(v.string()),
  })
    .index("by_name", ["name"])
    .index("by_level", ["level"])
    .index("by_school", ["school"])
    .index("by_class", ["classes"]),
});