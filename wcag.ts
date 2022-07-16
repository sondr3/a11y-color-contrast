import { Color, color } from "./color.ts";

interface Readability {
  level?: "AA" | "AAA";
  size?: "normal" | "large";
}

interface ReadabilityResult extends Readability {
  score: number;
  pass: boolean;
}

/** See https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum for values from WCAG 2.2.
 *
 * - Level AA
 *   The visual presentation of text and images of text has a contrast ratio of at least 4.5:1
 *   Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1
 *
 * - Level AAA
 *   The visual presentation of text and images of text has a contrast ratio of at least 7:1
 *   Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1;
 */
const contrastLevel = ({ level = "AAA", size = "normal" }: Readability): number => {
  if (level == "AAA" && size === "normal") return 7;
  else if (level == "AAA" && size === "large") return 4.5;
  else if (level == "AA" && size === "large") return 3;
  else return 4.5;
};

/**
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 */
export const luminance = (color: Color): number => {
  const r = relativize(color.r);
  const g = relativize(color.g);
  const b = relativize(color.b);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 */
export const contrast = (c1: Color, c2: Color = color({ r: 255, g: 255, b: 255 })): number => {
  const l1 = luminance(c1);
  const l2 = luminance(c2);

  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};

export const isReadable = (
  c1: Color,
  c2: Color = color({ r: 255, g: 255, b: 255 }),
  readability: Readability = { level: "AAA", size: "normal" },
): boolean => {
  const score = contrast(c1, c2);
  return score >= contrastLevel(readability);
};

export const calculateContrast = (
  c1: Color,
  c2: Color,
  readability: Readability = { level: "AAA", size: "normal" },
): ReadabilityResult => {
  const score = contrast(c1, c2);
  const pass = score >= contrastLevel(readability);

  return {
    ...readability,
    score,
    pass,
  };
};

/**
 * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
 */
export const relativize = (value: number): number => {
  const ratio = value / 255;
  return ratio <= 0.04045 ? ratio / 12.92 : Math.pow((ratio + 0.055) / 1.055, 2.4);
};
