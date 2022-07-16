import { Color } from "./mod.ts";

const removeHash = (input: string): string => input.charAt(0) === "#" ? input.slice(1) : input;
export const isShortHex = (input: string): boolean => input.length === 3 || input.length === 4;
export const isAlpha = (input: string): boolean => input.length === 4 || input.length === 8;

export const isHex = (input: string): boolean => {
  return [3, 4, 6, 8].some((l) => removeHash(input).length === l);
};

const sliceParts = (part: keyof Color, short: boolean): [number, number] => {
  switch (part) {
    case "r":
      return short ? [0, 1] : [0, 2];
    case "g":
      return short ? [1, 2] : [2, 4];
    case "b":
      return short ? [2, 3] : [4, 6];
    case "a":
      return short ? [3, 4] : [6, 8];
    default:
      throw new Error("RGBA has more than four fields?!?");
  }
};

const slicePart = (input: string, part: keyof Color): string => {
  const short = isShortHex(input);
  const [x, y] = sliceParts(part, short);
  return short ? `${input.slice(x, y)}${input.slice(x, y)}` : input.slice(x, y);
};

const parseHexPart = (input: string, part: keyof Color): number => {
  return parseInt(slicePart(input, part), 16);
};

export const hex = (input: string): Color => {
  const text = removeHash(input.trim());
  if (!isHex(text)) return new Color({ r: NaN, g: NaN, b: NaN });

  return new Color({
    r: parseHexPart(text, "r"),
    g: parseHexPart(text, "g"),
    b: parseHexPart(text, "b"),
    a: isAlpha(text) ? +(parseHexPart(text, "a") / 255).toFixed(2) : 1,
  });
};
