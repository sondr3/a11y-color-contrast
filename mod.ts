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

export class Color {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor({ r, g, b, a = 1 }: { r: number; g: number; b: number; a?: number }) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
   */
  luminance(): number {
    const r = Color.relativize(this.r);
    const g = Color.relativize(this.g);
    const b = Color.relativize(this.b);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
   */
  contrast(other: Color = new Color({ r: 255, g: 255, b: 255 })): number {
    const l1 = this.luminance();
    const l2 = other.luminance();

    return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
  }

  isReadable(
    other: Color = new Color({ r: 255, g: 255, b: 255 }),
    readability: Readability = { level: "AAA", size: "normal" },
  ): boolean {
    const score = this.contrast(other);
    return score >= contrastLevel(readability);
  }

  calculateContrast(
    other: Color,
    readability: Readability = { level: "AAA", size: "normal" },
  ): ReadabilityResult {
    const score = this.contrast(other);
    const pass = score >= contrastLevel(readability);

    return {
      ...readability,
      score,
      pass,
    };
  }
  /**
   * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
   */
  static relativize(value: number): number {
    const ratio = value / 255;
    return ratio <= 0.04045 ? ratio / 12.92 : Math.pow((ratio + 0.055) / 1.055, 2.4);
  }
}
