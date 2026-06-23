/**
 * Type alias for a RGB triplet (an array of only three numbers);
 */
export type Color = [number, number, number]

/**
 * Utility type for when you have RGB colors in an object.
 */
export type ColorObject = { r: number; g: number; b: number }

/**
 * Checks if any of the values in an RGB triplet is `NaN`
 */
export function isValidColor(color: Color): boolean {
	return !Object.values(color).some(Number.isNaN)
}

/**
 * Convert from a RGB object to a RGB triplet.
 *
 * ```ts
 * import { colorFromObject } from "./color.js";
 *
 * colorFromObject({ r: 128, g: 128, b: 128})
 * // [128, 128, 128]
 * ```
 */
export function colorFromObject({ r, g, b }: ColorObject): Color {
	return [r, g, b]
}

/**
 * Convert a RGB triplet into its hex string representation.
 *
 * See [this post](https://ryanclark.me/rgb-to-hex-via-binary-shifting/) for how.
 *
 * ```ts
 * import { toHex } from "./color.js";
 *
 * toHex([128, 128, 128])
 * // "#808080"
 * ```
 */
export function toHex([r, g, b]: Color): string {
	return `#${((1 << 24) | ((r << 16) | (g << 8) | b)).toString(16).slice(1)}`
}
