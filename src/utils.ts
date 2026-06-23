/**
 * Rounding that allows for arbitrary precision.
 */
export function round(number: number, digits = 2, base: number = 10 ** digits): number {
	return Math.round((number + Number.EPSILON) * base) / base
}

/**
 * Flooring that allows for arbitrary precision.
 */
export function floor(number: number, digits = 2, base: number = 10 ** digits): number {
	return Math.floor((number + Number.EPSILON) * base) / base
}
