export type Color = [number, number, number];

export type ColorObject = { r: number; g: number; b: number };

export const colorFromObject = (input: ColorObject): Color => {
  return Object.values(input) as Color;
};

const prefixHexPart = (part: string): string => {
  return part.length === 1 ? `0${part}` : part;
};

export const isValid = (color: Color): boolean => !Object.values(color).some(isNaN);

export const toHex = (color: Color): string => {
  const r = prefixHexPart(color[0].toString(16));
  const g = prefixHexPart(color[1].toString(16));
  const b = prefixHexPart(color[2].toString(16));

  return `#${r}${g}${b}`;
};
