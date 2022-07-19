export type Color = [number, number, number];

export type ColorObject = { r: number; g: number; b: number };

export const colorFromObject = (input: ColorObject): Color => {
  return Object.values(input) as Color;
};

export const isValid = (color: Color): boolean => !Object.values(color).some(isNaN);

export const toHex = (color: Color): string => {
  const [r, g, b] = color;
  return "#" + (1 << 24 | (r << 16 | g << 8 | b)).toString(16).slice(1);
};
