export const calculateStatModifier = (stat: number, modifier: number = 0) => {
  const newModifier = Math.floor((stat - 10) / 2) + modifier;

  return newModifier > 0 ? `+${newModifier}` : `${newModifier}`;
};
