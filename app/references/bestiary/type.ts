export interface MonsterBase {
  type: string;
  subtype?: string;
  name: string;
  id: string;
  size: string;
  hitPoints: number;
}

export interface Monster extends MonsterBase {
  index: string;
  alignment: string;
  armorClass: ArmorClass[];
  hitDice: string;
  hitPointsRoll: string;
  speed: Speed;
  proficiencies: Proficiency[];
  damageVulnerabilities: string[];
  damageResistances: string[];
  damageImmunities: string[];
  conditionImmunities: ConditionImmunity[];
  senses: Senses;
  languages: string;
  challengeRating: number;
  proficiencyBonus: number;
  xp: number;
  specialAbilities?: SpecialAbility[];
  actions?: MonsterAction[];
  legendaryActions?: LegendaryAction[];
  image?: string;
  url: string;
  stats: Stats;
  desc?: string;
  subtype?: string;
  reactions?: Reaction[];
  forms?: ConditionImmunity[];
}

export interface MonsterAction {
  name: string;
  multiattackType?: string;
  desc: string;
  actions?: ActionAction[];
  attackBonus?: number;
  dc?: Dc;
  damage?: ActionDamage[];
  usage?: ActionUsage;
  options?: Options;
  attacks?: Attack[];
  actionOptions?: ActionOptions;
}

export interface ActionOptions {
  choose: number;
  type: string;
  from: ActionOptionsFrom;
}

export interface ActionOptionsFrom {
  optionSetType: string;
  options: PurpleOption[];
}

export interface PurpleOption {
  optionType: string;
  items?: Item[];
  actionName?: string;
  count?: number;
  type?: string;
  desc?: string;
}

export interface Item {
  optionType: string;
  actionName: string;
  count: number;
  type: string;
  desc?: string;
}

export interface ActionAction {
  actionName: string;
  count: number | string;
  type: string;
}

export interface Attack {
  name: string;
  dc: Dc;
  damage?: AttackDamage[];
}

export interface AttackDamage {
  damageType: ConditionImmunity;
  damageDice: string;
}

export interface ConditionImmunity {
  index: string;
  name: string;
  url: string;
}

export interface Dc {
  dcType: ConditionImmunity;
  dcValue: number;
  successType: string;
}

export interface ActionDamage {
  damageType?: ConditionImmunity;
  damageDice?: string;
  dc?: Dc;
  choose?: number;
  type?: string;
  from?: DamageFrom;
}

export interface DamageFrom {
  optionSetType: string;
  options: FluffyOption[];
}

export interface FluffyOption {
  optionType: string;
  damageType: ConditionImmunity;
  damageDice: string;
  notes?: string;
}

export interface Options {
  choose: number;
  type: string;
  from: OptionsFrom;
}

export interface OptionsFrom {
  optionSetType: string;
  options: TentacledOption[];
}

export interface TentacledOption {
  optionType: string;
  name: string;
  dc: Dc;
  damage?: AttackDamage[];
}

export interface ActionUsage {
  type: string;
  times?: number;
  dice?: string;
  minValue?: number;
  restTypes?: string[];
}

export interface ArmorClass {
  type: string;
  value: number;
  condition?: ConditionImmunity;
  spell?: ConditionImmunity;
  armor?: ConditionImmunity[];
  desc?: string;
}

export interface LegendaryAction {
  name: string;
  desc: string;
  attackBonus?: number;
  damage?: AttackDamage[];
  dc?: Dc;
}

export interface Proficiency {
  value: number;
  proficiency: ConditionImmunity;
}

export interface Reaction {
  name: string;
  desc: string;
  dc?: Dc;
}

export interface Senses {
  darkvision?: string;
  passivePerception: number;
  blindsight?: string;
  truesight?: string;
  tremorsense?: string;
}

export interface SpecialAbility {
  name: string;
  desc: string;
  dc?: Dc;
  spellcasting?: Spellcasting;
  usage?: SpecialAbilityUsage;
  damage?: AttackDamage[];
  attackBonus?: number;
}

export interface Spellcasting {
  level?: number;
  ability: ConditionImmunity;
  dc?: number;
  modifier?: number;
  componentsRequired: string[];
  school?: string;
  slots?: { [key: string]: number };
  spells: Spell[];
}

export interface Spell {
  name: string;
  level: number;
  url: string;
  usage?: SpellUsage;
  notes?: string;
}

export interface SpellUsage {
  type: string;
  times?: number;
}

export interface SpecialAbilityUsage {
  type: string;
  times?: number;
  restTypes?: string[];
}

export interface Speed {
  walk?: string;
  swim?: string;
  fly?: string;
  burrow?: string;
  climb?: string;
  hover?: boolean;
}

export interface Stats extends Record<string, number> {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
