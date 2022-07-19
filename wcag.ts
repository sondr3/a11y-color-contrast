import { Color } from "./color.ts";

export interface WCAG {
  level?: "AA" | "AAA";
  size?: "normal" | "large";
}

export interface WCAGScore extends WCAG {
  score: number;
  pass: boolean;
}

const setWCAG = ({ level = "AAA", size = "normal" }: WCAG): WCAG => ({
  level: level ?? "AAA",
  size: size ?? "normal",
});

type IsReadableArgs = Parameters<typeof wcagReadable>;

/**
 * WCAG related functionality.
 */
export class WCAG {
  static isReadable(...args: IsReadableArgs) {
    return wcagReadable(...args);
  }
}

/**
 * This function determines whether two colors used together are readable based
 * on WCAG readability criteria. The first color is the foreground color and the
 * second the background color (defaulting to pure white, "#FFF" / [255, 255, 255]).
 *
 * The readability criteria defaults to the 'AAA' level for normal text as defined
 * in WCAG 2.2.
 *
 * ```ts
 * import { wcagReadable } from "./wcag.ts";
 *
 * wcagReadable([0, 255, 0], [0, 0, 0]) // green on black
 * // true
 *
 * wcagReadable([169, 169, 169], [0, 0, 0]) // dark gray on black
 * // false
 * ```
 *
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 */
export function wcagReadable(foreground: Color, background: Color = [255, 255, 255], wcag?: WCAG): boolean {
  const score = contrast(foreground, background);
  return score >= contrastLevel(setWCAG({ ...wcag }));
}

/**
 * This function calculates the contrast and whether two colors used together are readable
 * based on WCAG readability criteria. The first color is the foreground color and the
 * second the background color (defaulting to pure white, "#FFF" / [255, 255, 255]).
 *
 * The readability criteria defaults to the 'AAA' level for normal text as defined
 * in WCAG 2.2.
 *
 * ```ts
 * import { wcagScore } from "./wcag.ts";
 *
 * wcagScore([0, 255, 0], [0, 0, 0]) // green on black
 * // { level: "AAA", size: "normal", score: 15.303999999999998, pass: true }
 *
 * wcagScore([169, 169, 169], [0, 0, 0]) // dark gray on black
 * // { level: "AAA", size: "normal", score: 2.6043964062893665, pass: false }
 * ```
 *
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 */
export function wcagScore(foreground: Color, background: Color = [255, 255, 255], wcag?: WCAG): WCAGScore {
  const score = contrast(foreground, background);
  const pass = score >= contrastLevel(setWCAG({ ...wcag }));

  return {
    ...setWCAG({ ...wcag }),
    score,
    pass,
  };
}

/**
 * See https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum for values from WCAG 2.2.
 *
 * - Level AA
 *   The visual presentation of text and images of text has a contrast ratio of at least 4.5:1
 *   Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1
 *
 * - Level AAA
 *   The visual presentation of text and images of text has a contrast ratio of at least 7:1
 *   Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1;
 */
const contrastLevel = ({ level = "AAA", size = "normal" }: WCAG): number => {
  if (level == "AAA" && size === "normal") return 7;
  else if (level == "AAA" && size === "large") return 4.5;
  else if (level == "AA" && size === "large") return 3;
  else return 4.5;
};

/**
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 */
export function relativeLuminance(value: number): number {
  const ratio = value / 255;

  return ratio <= 0.04045 ? ratio / 12.92 : Math.pow((ratio + 0.055) / 1.055, 2.4);
}

/**
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 */
export function luminance(color: Color): number {
  const r = relativeLuminance(color[0]);
  const g = relativeLuminance(color[1]);
  const b = relativeLuminance(color[2]);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 */
export function contrast(c1: Color, c2: Color = [255, 255, 255]): number {
  const l1 = luminance(c1);
  const l2 = luminance(c2);

  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
}
