export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const color = ({ r = NaN, g = NaN, b = NaN, a = 1 }: Partial<Color>): Color => {
  return { r, g, b, a };
};

const prefixHexPart = (part: string): string => {
  return part.length === 1 ? `0${part}` : part;
};

export const isValid = (color: Color): boolean => !Object.values(color).some(isNaN);

export const toRGB = (color: Color): { r: number; g: number; b: number } => {
  return { r: color.r, g: color.g, b: color.b };
};

export const toRGBA = (color: Color): { r: number; g: number; b: number; a: number } => {
  return { ...toRGB(color), a: color.a };
};

export const toHex = (color: Color): string => {
  const r = prefixHexPart(color.r.toString(16));
  const g = prefixHexPart(color.g.toString(16));
  const b = prefixHexPart(color.b.toString(16));

  return `#${r}${g}${b}`;
};

export const toHexA = (color: Color): string => {
  const a = prefixHexPart(Math.round(color.a * 255).toString(16));

  return `${toHex(color)}${a}`;
};
