import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Helper mutation to import a single monster from Firebase data
export const importMonster = mutation({
  args: {
    // Monster data as it comes from Firebase
    firebaseData: v.any(),
  },
  handler: async (ctx, args) => {
    const firebaseMonster = args.firebaseData;
    
    // Transform Firebase data to match Convex schema
    const convexMonster = {
      // Basic information
      name: firebaseMonster.name,
      type: firebaseMonster.type,
      subtype: firebaseMonster.subtype,
      size: firebaseMonster.size,
      alignment: firebaseMonster.alignment,
      
      // Combat stats
      hitPoints: firebaseMonster.hitPoints,
      hitDice: firebaseMonster.hitDice,
      hitPointsRoll: firebaseMonster.hitPointsRoll,
      armorClass: firebaseMonster.armorClass || [],
      
      // Stats
      stats: firebaseMonster.stats,
      
      // Movement
      speed: firebaseMonster.speed,
      
      // Challenge and Experience
      challengeRating: firebaseMonster.challengeRating,
      proficiencyBonus: firebaseMonster.proficiencyBonus,
      xp: firebaseMonster.xp,
      
      // Senses and perception
      senses: firebaseMonster.senses,
      
      // Languages
      languages: firebaseMonster.languages,
      
      // Resistances and immunities
      damageVulnerabilities: firebaseMonster.damageVulnerabilities || [],
      damageResistances: firebaseMonster.damageResistances || [],
      damageImmunities: firebaseMonster.damageImmunities || [],
      conditionImmunities: firebaseMonster.conditionImmunities || [],
      
      // Proficiencies
      proficiencies: firebaseMonster.proficiencies || [],
      
      // Complex abilities - convert to JSON strings
      specialAbilities: firebaseMonster.specialAbilities ? JSON.stringify(firebaseMonster.specialAbilities) : undefined,
      actions: firebaseMonster.actions ? JSON.stringify(firebaseMonster.actions) : undefined,
      legendaryActions: firebaseMonster.legendaryActions ? JSON.stringify(firebaseMonster.legendaryActions) : undefined,
      reactions: firebaseMonster.reactions ? JSON.stringify(firebaseMonster.reactions) : undefined,
      
      // Additional metadata
      index: firebaseMonster.index,
      url: firebaseMonster.url,
      image: firebaseMonster.image,
      desc: firebaseMonster.desc,
      source: firebaseMonster.source,
      initiative: firebaseMonster.initiative,
      forms: firebaseMonster.forms ? JSON.stringify(firebaseMonster.forms) : undefined,
    };

    const monsterId = await ctx.db.insert("monsters", convexMonster);
    return monsterId;
  },
});

// Batch import multiple monsters
export const importMonsters = mutation({
  args: {
    monsters: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const importedIds = [];
    
    for (const firebaseMonster of args.monsters) {
      try {
        // Transform and insert each monster
        const convexMonster = {
          // Basic information
          name: firebaseMonster.name,
          type: firebaseMonster.type,
          subtype: firebaseMonster.subtype,
          size: firebaseMonster.size,
          alignment: firebaseMonster.alignment,
          
          // Combat stats
          hitPoints: firebaseMonster.hitPoints,
          hitDice: firebaseMonster.hitDice,
          hitPointsRoll: firebaseMonster.hitPointsRoll,
          armorClass: firebaseMonster.armorClass || [],
          
          // Stats
          stats: firebaseMonster.stats,
          
          // Movement
          speed: firebaseMonster.speed,
          
          // Challenge and Experience
          challengeRating: firebaseMonster.challengeRating,
          proficiencyBonus: firebaseMonster.proficiencyBonus,
          xp: firebaseMonster.xp,
          
          // Senses and perception
          senses: firebaseMonster.senses,
          
          // Languages
          languages: firebaseMonster.languages,
          
          // Resistances and immunities
          damageVulnerabilities: firebaseMonster.damageVulnerabilities || [],
          damageResistances: firebaseMonster.damageResistances || [],
          damageImmunities: firebaseMonster.damageImmunities || [],
          conditionImmunities: firebaseMonster.conditionImmunities || [],
          
          // Proficiencies
          proficiencies: firebaseMonster.proficiencies || [],
          
          // Complex abilities - convert to JSON strings
          specialAbilities: firebaseMonster.specialAbilities ? JSON.stringify(firebaseMonster.specialAbilities) : undefined,
          actions: firebaseMonster.actions ? JSON.stringify(firebaseMonster.actions) : undefined,
          legendaryActions: firebaseMonster.legendaryActions ? JSON.stringify(firebaseMonster.legendaryActions) : undefined,
          reactions: firebaseMonster.reactions ? JSON.stringify(firebaseMonster.reactions) : undefined,
          
          // Additional metadata
          index: firebaseMonster.index,
          url: firebaseMonster.url,
          image: firebaseMonster.image,
          desc: firebaseMonster.desc,
          source: firebaseMonster.source,
          initiative: firebaseMonster.initiative,
          forms: firebaseMonster.forms ? JSON.stringify(firebaseMonster.forms) : undefined,
        };

        const monsterId = await ctx.db.insert("monsters", convexMonster);
        importedIds.push(monsterId);
      } catch (error) {
        console.error(`Failed to import monster: ${firebaseMonster.name}`, error);
        // Continue with other monsters even if one fails
      }
    }
    
    return { importedCount: importedIds.length, importedIds };
  },
});

// Clear all monsters (for testing/re-importing)
export const clearAllMonsters = mutation({
  args: {},
  handler: async (ctx) => {
    const monsters = await ctx.db.query("monsters").collect();
    for (const monster of monsters) {
      await ctx.db.delete(monster._id);
    }
    return { deletedCount: monsters.length };
  },
});