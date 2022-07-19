/**
 * Type alias for a RGB triplet (an array of only three numbers);
 */
export type Color = [number, number, number];

/**
 * Utility type for when you have RGB colors in an object.
 */
export type ColorObject = { r: number; g: number; b: number };

/**
 * Checks if any of the values in an RGB triplet is `NaN`
 */
export function isValidColor(color: Color): boolean {
  return !Object.values(color).some(isNaN);
}

/**
 * Convert from a RGB object to a RGB triplet.
 *
 * ```ts
 * import { colorFromObject } from "./color.ts";
 *
 * colorFromObject({ r: 128, g: 128, b: 128})
 * // [128, 128, 128]
 * ```
 */
export function colorFromObject(input: ColorObject): Color {
  return Object.values(input) as Color;
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
