import type { Color } from "./color.js";
import { round } from "./index.js";

// Code derived from formulas in https://github.com/Myndex/apca-w3/blob/99be5162ddb000e4d49551756830d2a9fd92955e/images/APCAw3_0.1.17_APCA0.0.98G.svg.

const B_EXP = Math.SQRT2;
const B_THRESH = 0.022;
const P_IN = 0.0005;
const R_SCALE = 1.14;
const W_OFFSET = 0.027;
const P_OUT = 0.1;

/**
 * This function calculates the contrast value between two colors based on WCAG
 * contrast readability criteria. The first color is the foreground color and the
 * second the background color (defaulting to pure white, "#fff" / [255, 255, 255]).
 *
 * **NOTE:** The returned value is signed, but only the absolute value matters, so you
 * may want to wrap the result in `Math.abs`. The reason for this is that light on dark
 * colors returns negative numbers, while dark on light returns positive numbers.
 *
 * ```ts
 * import { apcaContrastValue } from "./apca.js";
 *
 * apcaContrastValue([26, 26, 26], [255, 255, 255]) // black on white
 * // 104.3
 *
 * apcaContrastValue([255, 255, 255], [26, 26, 26]) // inverted from above
 * // -106.55
 * ```
 *
 * See https://github.com/Myndex/SAPC-APCA/ for concrete details for APCA.
 */
export function apcaContrastValue(foreground: Color, background: Color = [255, 255, 255]): number {
	return round(clampMinimumContrast(foreground, background) * 100, 1);
}

const clampMinimumContrast = (foreground: Color, background: Color): number => {
	const C = clampNoiseThenScale(foreground, background);

	if (Math.abs(C) < P_OUT) {
		return 0.0;
	}
	if (C > 0) {
		return C - W_OFFSET;
	}
	return C + W_OFFSET;
};

export function screenLuminance(color: Color): number {
	const r = (color[0] / 255) ** 2.4 * 0.2126729;
	const g = (color[1] / 255) ** 2.4 * 0.7151522;
	const b = (color[2] / 255) ** 2.4 * 0.072175;

	return r + g + b;
}

const clampBlackLevels = (color: Color): number => {
	const luminance = screenLuminance(color);

	if (luminance >= B_THRESH) {
		return luminance;
	}

	return luminance + (B_THRESH - luminance) ** B_EXP;
};

const clampNoiseThenScale = (foreground: Color, background: Color): number => {
	const y_bg = clampBlackLevels(background);
	const y_txt = clampBlackLevels(foreground);

	if (Math.abs(y_bg - y_txt) < P_IN) {
		return 0.0;
	}
	if (y_txt < y_bg) {
		return normalPolarity(y_txt, y_bg) * R_SCALE;
	}
	return reversePolarity(y_txt, y_bg) * R_SCALE;
};

const normalPolarity = (foreground: number, background: number): number => {
	return background ** 0.56 - foreground ** 0.57;
};

const reversePolarity = (foreground: number, background: number): number => {
	return background ** 0.65 - foreground ** 0.62;
};
