export * from "./parse.ts";
export * from "./color.ts";
export { apcaToInterpolatedFont, apcaValidateFont, getFontContrast, getFontSizeByContrast } from "./apca_tables.ts";
export type { Modifier, Rating } from "./apca_tables.ts";

export { wcag, wcagContrastValue, wcagIsReadable } from "./wcag.ts";
export { apcaContrastValue } from "./apca.ts";

/**
 * Rounding that allows for arbitrary precision.
 */
export function round(number: number, digits = 2, base = Math.pow(10, digits)): number {
  return Math.round((number + Number.EPSILON) * base) / base + 0;
}

/**
 * Flooring that allows for arbitrary precision.
 */
export function floor(number: number, digits = 2, base = Math.pow(10, digits)): number {
  return Math.floor(number + Number.EPSILON * base) / base;
}
