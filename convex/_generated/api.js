// Temporary placeholder until npx convex dev is run
const api = {
  monsters: {
    getMonsters: null,
    getMonster: null,
    searchMonsters: null,
    createMonster: null,
    updateMonster: null,
    deleteMonster: null,
  },
  items: {
    getItems: null,
    getItem: null,
    searchItems: null,
    createItem: null,
    updateItem: null,
    deleteItem: null,
  },
  spells: {
    getSpells: null,
    getSpell: null,
    searchSpells: null,
    getSpellsByLevel: null,
    getSpellsBySchool: null,
    getSpellsByClass: null,
    createSpell: null,
    updateSpell: null,
    deleteSpell: null,
  },
  migration: {
    importMonster: null,
    importMonsters: null,
    clearAllMonsters: null,
  },
};

module.exports = { default: api };
