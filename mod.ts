export * from "./parse.ts";
export * from "./color.ts";

import { calculateContrast, isReadable } from "./wcag.ts";
import { ligthnessContrast } from "./apca.ts";

export { calculateContrast as wcgaScore };
export { isReadable as wcgaReadable };

export { ligthnessContrast as apcaScore };

/**
 * Rounding that allows for arbitrary precision.
 */
export const round = (number: number, digits = 2, base = Math.pow(10, digits)): number => {
  return Math.round((number + Number.EPSILON) * base) / base + 0;
};

/**
 * Flooring that allows for arbitrary precision.
 */
export const floor = (number: number, digits = 2, base = Math.pow(10, digits)): number => {
  return Math.floor(number + Number.EPSILON * base) / base;
};
