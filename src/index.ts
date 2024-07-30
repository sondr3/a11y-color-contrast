export * from "./parse.js";
export * from "./color.js";
export { apcaToInterpolatedFont, apcaValidateFont, getFontContrast, getFontSizeByContrast } from "./apca_tables.js";
export type { Modifier, Rating } from "./apca_tables.js";

export { wcag, wcagContrastValue, wcagIsReadable } from "./wcag.js";
export { apcaContrastValue } from "./apca.js";

/**
 * Rounding that allows for arbitrary precision.
 */
export function round(number: number, digits = 2, base: number = 10 ** digits): number {
	return Math.round((number + Number.EPSILON) * base) / base + 0;
}

/**
 * Flooring that allows for arbitrary precision.
 */
export function floor(number: number, digits = 2, base: number = 10 ** digits): number {
	return Math.floor(number + Number.EPSILON * base) / base;
}
