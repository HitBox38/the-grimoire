export const calculateStatModifier = (stat: number) => {
  const modifier = Math.floor((stat - 10) / 2);

  return modifier > 0 ? `+${modifier}` : `${modifier}`;
};
