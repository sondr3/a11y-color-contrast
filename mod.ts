const removeHash = (input: string): string => input.charAt(0) === "#" ? input.slice(1) : input;
const isShortHex = (input: string): boolean => input.length === 3 || input.length === 4;
const isAlpha = (input: string): boolean => input.length === 4 || input.length === 8;

const isHex = (input: string): boolean => {
  return [3, 4, 6, 8].some((l) => input.length === l);
};

const sliceParts = (part: keyof Color, short: boolean): [number, number] => {
  switch (part) {
    case "r":
      return short ? [0, 1] : [0, 2];
    case "g":
      return short ? [1, 2] : [2, 4];
    case "b":
      return short ? [2, 3] : [4, 6];
    case "a":
      return short ? [3, 4] : [6, 8];
    default:
      throw new Error("RGBA has more than four fields?!?");
  }
};

const slicePart = (input: string, part: keyof Color): string => {
  const short = isShortHex(input);
  const [x, y] = sliceParts(part, short);
  return short ? `${input.slice(x, y)}${input.slice(x, y)}` : input.slice(x, y);
};

const parseHexPart = (input: string, part: keyof Color): number => {
  return parseInt(slicePart(input, part), 16);
};

const prefixHexPart = (part: string): string => {
  return part.length === 1 ? `0${part}` : part;
};

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

  toRBG(): { r: number; g: number; b: number } {
    return { r: this.r, g: this.g, b: this.b };
  }

  toRBGA(): { r: number; g: number; b: number; a: number } {
    return { ...this.toRBG(), a: this.a };
  }

  toHex(): string {
    const r = prefixHexPart(this.r.toString(16));
    const g = prefixHexPart(this.g.toString(16));
    const b = prefixHexPart(this.b.toString(16));

    return `#${r}${g}${b}`;
  }

  toHexA(): string {
    const rgb = this.toHex();
    const a = prefixHexPart(Math.round(this.a * 255).toString(16));

    return `${rgb}${a}`;
  }

  /**
   * See https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html for concrete details for WCAG 2.2.
   */
  static relativize(value: number): number {
    const ratio = value / 255;
    return ratio <= 0.04045 ? ratio / 12.92 : Math.pow((ratio + 0.055) / 1.055, 2.4);
  }

  static hex(input: string): Color | never {
    const text = removeHash(input.trim());
    if (!isHex(text)) throw Error("Input was not a valid hex string");

    const color = {
      r: parseHexPart(text, "r"),
      g: parseHexPart(text, "g"),
      b: parseHexPart(text, "b"),
      a: isAlpha(text) ? +(parseHexPart(text, "a") / 255).toFixed(2) : 1,
    };

    if (Object.values(color).some(isNaN)) {
      const failed = Object.entries(color).filter(([_, val]) => isNaN(val)).map(([name, _]) => name);
      console.log(failed);
      throw Error("One or more parts of the hex string could not be parsed");
    }

    return new Color({
      r: parseHexPart(text, "r"),
      g: parseHexPart(text, "g"),
      b: parseHexPart(text, "b"),
      a: isAlpha(text) ? +(parseHexPart(text, "a") / 255).toFixed(2) : 1,
    });
  }
}
