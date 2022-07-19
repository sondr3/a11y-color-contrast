export type Color = [number, number, number];

export type ColorObject = { r: number; g: number; b: number };

export function colorFromObject(input: ColorObject): Color {
  return Object.values(input) as Color;
}

export function isValid(color: Color): boolean {
  return !Object.values(color).some(isNaN);
}

/**
 * Convert a RGB triplet into its hex string representation.
 *
 * See [this post](https://ryanclark.me/rgb-to-hex-via-binary-shifting/) for how.
 *
 * ```ts
 * import { toHex } from "./color.ts";
 *
 * toHex([128, 128, 128])
 * // "#808080"
 * ```
 */
export function toHex(color: Color): string {
  const [r, g, b] = color;
  return "#" + (1 << 24 | (r << 16 | g << 8 | b)).toString(16).slice(1);
}
