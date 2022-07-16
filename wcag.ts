import { Color } from "./color.ts";

export interface Readability {
  level?: "AA" | "AAA";
  size?: "normal" | "large";
}

export interface ReadabilityResult extends Readability {
  score: number;
  pass: boolean;
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
 *
 * Note: this function is identical for WCAG 2.0, 2.1 and 2.2;
 */
const contrastLevel = ({ level = "AAA", size = "normal" }: Readability): number => {
  if (level == "AAA" && size === "normal") return 7;
  else if (level == "AAA" && size === "large") return 4.5;
  else if (level == "AA" && size === "large") return 3;
  else return 4.5;
};

/**
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 *
 * Note: this function is identical for WCAG 2.0 and 2.1 but 2.2 uses a different ratio constant.
 */
export const relativeLuminance = (value: number): number => {
  const ratio = value / 255;

  return ratio <= 0.04045 ? ratio / 12.92 : Math.pow((ratio + 0.055) / 1.055, 2.4);
};

/**
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 *
 * Note: this function is identical for WCAG 2.0, 2.1 and 2.2;
 */
export const luminance = (color: Color): number => {
  const r = relativeLuminance(color[0]);
  const g = relativeLuminance(color[1]);
  const b = relativeLuminance(color[2]);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 *
 * Note: this function is identical for WCAG 2.0, 2.1 and 2.2;
 */
export const contrast = (
  c1: Color,
  c2: Color = [255, 255, 255],
): number => {
  const l1 = luminance(c1);
  const l2 = luminance(c2);

  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};

/**
 * This function determines whether two colors used together are readable based
 * on WCAG readability criteria. The first color is the foreground color and the
 * second the background color (defaulting to pure white, "#FFF" / [255, 255, 255]).
 *
 * The readability criteria defaults to the 'AAA' level for normal text as defined
 * in WCAG 2.2.
 *
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 */
export const isReadable = (
  foreground: Color,
  background: Color = [255, 255, 255],
  readability: Readability = { level: "AAA", size: "normal" },
): boolean => {
  const score = contrast(foreground, background);
  return score >= contrastLevel(readability);
};

/**
 * This function calculates the contrast and whether two colors used together are readable
 * based on WCAG readability criteria. The first color is the foreground color and the
 * second the background color (defaulting to pure white, "#FFF" / [255, 255, 255]).
 *
 * The readability criteria defaults to the 'AAA' level for normal text as defined
 * in WCAG 2.2.
 *
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 */
export const calculateContrast = (
  foreground: Color,
  background: Color,
  readability: Readability = { level: "AAA", size: "normal" },
): ReadabilityResult => {
  const score = contrast(foreground, background);
  const pass = score >= contrastLevel(readability);

  return {
    ...readability,
    score,
    pass,
  };
};
