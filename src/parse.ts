import type { Color } from "./color.js";

const removeHash = (input: string): string => (input.charAt(0) === "#" ? input.slice(1) : input);

const isShortHex = (input: string): boolean => input.length === 3 || input.length === 4;
const isAlpha = (input: string): boolean => input.length === 4 || input.length === 8;

const isHex = (input: string): boolean => {
	return [3, 4, 6, 8].some((l) => removeHash(input).length === l);
};

const trimInput = (input: string): string => {
	const text = removeHash(input.trim());
	if (isAlpha(text) && isShortHex(text)) return text.slice(0, 3);
	return text.slice(0, 6);
};

const chunk = (input: string, slice: number, tail: Array<string> = []): Array<string> => {
	return input.length > 0
		? chunk(input.slice(slice), slice, [...tail, input.slice(0, slice).repeat(slice === 2 ? 1 : 2)])
		: tail;
};

/**
 * Parse a string into a RGB color. Invalid input will return a `[NaN, NaN, NaN]`
 * RGB triplet. If the input can be malformed, check after parsing with the `isValidColor`
 * function.
 *
 * ```ts
 * import { hex } from "./parse.js";
 *
 * hex("#fff")
 * // [255, 255, 255]
 * ```
 */
export function hex(input: string): Color {
	if (input.length === 0 || !isHex(input.trim())) {
		return [Number.NaN, Number.NaN, Number.NaN];
	}

	const text = trimInput(input);
	return chunk(text, isShortHex(text) ? 1 : 2).map((p) => Number.parseInt(p, 16)) as Color;
}
