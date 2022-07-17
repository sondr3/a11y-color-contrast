/**
 * Create a sliding window across an array, where each window is some size.
 */
const slidingWindow = <T>(inputArray: Array<T>, size: number): Array<Array<T>> => {
  return Array.from(
    { length: inputArray.length - (size - 1) },
    (_, index) => inputArray.slice(index, index + size),
  );
};

const between = (start: number, end: number, value: number): boolean => value > start && value < end;

const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type FontWeight = typeof fontWeights[number];

const fontSizes = [10, 12, 14, 15, 16, 18, 21, 24, 28, 32, 36, 42, 48, 60, 72, 96] as const;
export type FontSize = typeof fontSizes[number];

const lcValue = [110, 105, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15] as const;
export type LcValue = typeof lcValue[number];
export type LcFontSize = number | null;

/**
 * The Lc rating of a contrast value:
 *
 * - "prohibited": if the contrast is too low for anything
 * - "placeholder": contrast only useable for copyrights/placeholder text
 * - number: if the value can be used
 */
export type Rating = number | "prohibited" | "placeholder";

/**
 * Modifiers for a Lc rating:
 *
 * - "non-text": Only usable for non-text content
 * - "avoid-100": Avoid fonts with weight 100
 * - "add-15": To be usable, add 15 Lc
 * - "body-text": Good minimum values for blocks of text
 */
export type Modifier = "non-text" | "avoid-100" | "add-15" | "body-text";

/**
 * Value for a specific font size with its corresponding font weights and ratings.
 */
export type FontContrast = {
  [k in FontWeight]: {
    rating: Rating;
    modifier?: Modifier;
  };
};

/**
 * A utility function for looking up the contrast data for a font size.
 */
export const getFontContrast = (fontSize: FontSize): FontContrast => FONT_TO_CONTRAST_TABLE[fontSize];

/**
 * A utility function for looking what font sizes work for a specific, supported contrast.
 */
export const getFontSizeByContrast = (contrast: LcValue): Array<LcFontSize> => CONTRAST_TO_FONT_TABLE[contrast];

/**
 * From a calculated Lc value, find the nearest value in the contrast table.
 */
const nearestLc = (apca: number): LcValue | null => {
  const contrast = Math.abs(apca);

  const [val, _] = slidingWindow(Object.keys(CONTRAST_TO_FONT_TABLE).map((n) => Number(n) as LcValue), 2)
    .find(([start, end]) => between(start, end, contrast)) ?? [null];

  return val;
};

/**
 * From a Lc value, interpolate and calculate the approriate font sizes.
 */
export function apcaToInterpolatedFont(apca: number): Array<Rating> | null {
  const contrast = Math.abs(apca);
  const neareastLc = nearestLc(contrast);
  if (!neareastLc) return null;

  const fontSizes = CONTRAST_TO_FONT_TABLE[neareastLc];
  const fontDeltas = CONTRAST_DELTA_FONT_TABLE[neareastLc];

  const score = (contrast - neareastLc) * 0.2;

  return fontSizes.map((f, i) => {
    if (!f) return "placeholder";
    else if (contrast < 14.5) return "prohibited";
    else if (contrast < 29.5) return "placeholder";
    else {
      if (f > 24) return Math.round(f - (fontDeltas[i] * score));
      else return f - Math.floor(2.0 * fontDeltas[i] * score) * 0.5;
    }
  });
}

/**
 * With a given Lc value, a list or a specific font size and if desired the
 * font weights considered, does the Lc value satisfy the required minimum Lc
 * value for the font.
 *
 * For example. If we have a fontsize of 16px, and want to know if it passes
 * the required Lc value for a weight of 400 with a found Lc value of 94.90
 * you'd call
 *
 * ```
 * apcaValidateFont(94.90, 16, 400)
 * > { "16": { "400": true } }
 * ```
 *
 * and see that for this combination is passes the required minimum.
 */
export const apcaValidateFont = (
  apca: number,
  sizes: FontSize | Array<FontSize>,
  weights?: FontWeight | ReadonlyArray<FontWeight>,
) => {
  const contrast = Math.abs(apca);
  sizes = Array.isArray(sizes) ? sizes : [sizes];
  if (weights !== undefined) {
    weights = Array.isArray(weights) ? weights : [weights];
  } else {
    weights = fontWeights;
  }

  let res = {};
  for (const font of sizes) {
    for (const weight of weights) {
      const fontContrast = FONT_TO_CONTRAST_TABLE[font];

      // @ts-ignore: I can't make the compiler infer the types properly here :(
      res = { ...res, [font]: { ...res[font], [weight]: contrast >= fontContrast[weight].rating } };
    }
  }

  return res;
};

const FONT_TO_CONTRAST_TABLE: Record<FontSize, FontContrast> = {
  10: {
    100: { rating: "prohibited" },
    200: { rating: "prohibited" },
    300: { rating: "prohibited" },
    400: { rating: "prohibited" },
    500: { rating: "prohibited" },
    600: { rating: "prohibited" },
    700: { rating: "prohibited" },
    800: { rating: "prohibited" },
    900: { rating: "prohibited" },
  },
  12: {
    100: { rating: "prohibited" },
    200: { rating: "prohibited" },
    300: { rating: "prohibited" },
    400: { rating: "placeholder" },
    500: { rating: "placeholder" },
    600: { rating: "placeholder" },
    700: { rating: "placeholder" },
    800: { rating: "prohibited" },
    900: { rating: "prohibited" },
  },
  14: {
    100: { rating: "prohibited" },
    200: { rating: "prohibited" },
    300: { rating: "placeholder" },
    400: { rating: 100, modifier: "body-text" },
    500: { rating: 100, modifier: "body-text" },
    600: { rating: 90, modifier: "body-text" },
    700: { rating: 75, modifier: "body-text" },
    800: { rating: "prohibited" },
    900: { rating: "prohibited" },
  },
  15: {
    100: { rating: "prohibited" },
    200: { rating: "prohibited" },
    300: { rating: "placeholder" },
    400: { rating: 100, modifier: "body-text" },
    500: { rating: 90, modifier: "body-text" },
    600: { rating: 75, modifier: "body-text" },
    700: { rating: 75, modifier: "add-15" },
    800: { rating: "prohibited" },
    900: { rating: "prohibited" },
  },
  16: {
    100: { rating: "prohibited" },
    200: { rating: "prohibited" },
    300: { rating: "placeholder" },
    400: { rating: 90, modifier: "body-text" },
    500: { rating: 75, modifier: "body-text" },
    600: { rating: 70, modifier: "add-15" },
    700: { rating: 60, modifier: "add-15" },
    800: { rating: 60 },
    900: { rating: "prohibited" },
  },
  18: {
    100: { rating: "prohibited" },
    200: { rating: "placeholder" },
    300: { rating: 100, modifier: "body-text" },
    400: { rating: 75, modifier: "body-text" },
    500: { rating: 70, modifier: "add-15" },
    600: { rating: 60, modifier: "add-15" },
    700: { rating: 55, modifier: "add-15" },
    800: { rating: 55 },
    900: { rating: 55 },
  },
  21: {
    100: { rating: "prohibited" },
    200: { rating: "placeholder" },
    300: { rating: 90, modifier: "body-text" },
    400: { rating: 70, modifier: "body-text" },
    500: { rating: 60, modifier: "add-15" },
    600: { rating: 55, modifier: "add-15" },
    700: { rating: 50, modifier: "add-15" },
    800: { rating: 50 },
    900: { rating: 50 },
  },
  24: {
    100: { rating: "prohibited" },
    200: { rating: "placeholder" },
    300: { rating: 75, modifier: "body-text" },
    400: { rating: 60, modifier: "add-15" },
    500: { rating: 55, modifier: "add-15" },
    600: { rating: 50, modifier: "add-15" },
    700: { rating: 45, modifier: "add-15" },
    800: { rating: 45 },
    900: { rating: 45 },
  },
  28: {
    100: { rating: "prohibited" },
    200: { rating: 100 },
    300: { rating: 75, modifier: "add-15" },
    400: { rating: 55, modifier: "add-15" },
    500: { rating: 50, modifier: "add-15" },
    600: { rating: 45, modifier: "add-15" },
    700: { rating: 43, modifier: "add-15" },
    800: { rating: 43 },
    900: { rating: 43 },
  },
  32: {
    100: { rating: "prohibited" },
    200: { rating: 90 },
    300: { rating: 65, modifier: "add-15" },
    400: { rating: 50, modifier: "add-15" },
    500: { rating: 45, modifier: "add-15" },
    600: { rating: 43, modifier: "add-15" },
    700: { rating: 40, modifier: "add-15" },
    800: { rating: 40 },
    900: { rating: 40 },
  },
  36: {
    100: { rating: "prohibited" },
    200: { rating: 75 },
    300: { rating: 60, modifier: "add-15" },
    400: { rating: 45, modifier: "add-15" },
    500: { rating: 43, modifier: "add-15" },
    600: { rating: 40, modifier: "add-15" },
    700: { rating: 38, modifier: "add-15" },
    800: { rating: 38 },
    900: { rating: 38 },
  },
  42: {
    100: { rating: 100, modifier: "avoid-100" },
    200: { rating: 70 },
    300: { rating: 55 },
    400: { rating: 43 },
    500: { rating: 40 },
    600: { rating: 38 },
    700: { rating: 35 },
    800: { rating: 35 },
    900: { rating: 35 },
  },
  48: {
    100: { rating: 90, modifier: "avoid-100" },
    200: { rating: 60 },
    300: { rating: 50 },
    400: { rating: 40 },
    500: { rating: 38 },
    600: { rating: 35 },
    700: { rating: 33 },
    800: { rating: 33 },
    900: { rating: 33 },
  },
  60: {
    100: { rating: 75, modifier: "avoid-100" },
    200: { rating: 55 },
    300: { rating: 45 },
    400: { rating: 38 },
    500: { rating: 35 },
    600: { rating: 33 },
    700: { rating: 30 },
    800: { rating: 30 },
    900: { rating: 30 },
  },
  72: {
    100: { rating: 60, modifier: "avoid-100" },
    200: { rating: 50 },
    300: { rating: 40 },
    400: { rating: 35 },
    500: { rating: 33 },
    600: { rating: 30 },
    700: { rating: 30 },
    800: { rating: 30 },
    900: { rating: 30 },
  },
  96: {
    100: { rating: 50, modifier: "avoid-100" },
    200: { rating: 45 },
    300: { rating: 35 },
    400: { rating: 33 },
    500: { rating: 30 },
    600: { rating: 30 },
    700: { rating: 30 },
    800: { rating: 30 },
    900: { rating: 30 },
  },
};

const CONTRAST_TO_FONT_TABLE: Record<LcValue, Array<LcFontSize>> = {
  110: [36, 24, 18, 14, 13, 12, 11, 16, 18],
  105: [39, 25, 18, 14.5, 14, 13, 12, 16, 18],
  100: [42, 26.5, 18.5, 15, 14.5, 13.5, 13, 16, 18],
  95: [45, 28, 19.5, 15.5, 15, 14, 13.5, 16, 18],
  90: [48, 32, 21, 16, 15.5, 14.5, 14, 16, 18],
  85: [52, 34.5, 22, 16.5, 15.625, 14.625, 14, 16, 18],
  80: [56, 38.25, 23, 17.25, 15.81, 14.81, 14, 16, 18],
  75: [60, 42, 24, 18, 16, 15, 14, 16, 18],
  70: [64, 44, 28, 19.5, 18, 16, 14.5, 16, 18],
  65: [68, 46, 32, 21.75, 19, 17, 15, 16, 18],
  60: [72, 48, 42, 24, 21, 18, 16, 16, 18],
  55: [80, 60, 48, 28, 24, 21, 18, 18, 18],
  50: [96, 72, 60, 32, 28, 24, 21, 21, 21],
  45: [108, 96, 72, 42, 32, 28, 24, 24, 24],
  40: [120, 108, 96, 60, 48, 42, 32, 32, 32],
  35: [null, 120, 108, 96, 72, 60, 48, 48, 48],
  30: [null, null, 120, 108, 108, 96, 72, 72, 72],
  25: [null, null, null, 120, 120, 108, 96, 96, 96],
  20: [null, null, null, null, null, null, null, null, null],
  15: [null, null, null, null, null, null, null, null, null],
};

const CONTRAST_DELTA_FONT_TABLE: Record<LcValue, Array<number>> = {
  110: [1.5, 1.5, 0.75, 1.5, 1.125, 0.75, 0.375, 1.5, 1.5],
  105: [3, 1, 0, 0.5, 1, 1, 1, 0, 0],
  100: [3, 1.5, 0.5, 0.5, 0.5, 0.5, 1, 0, 0],
  95: [3, 1.5, 1, 0.5, 0.5, 0.5, 0.5, 0, 0],
  90: [3, 4, 1.5, 0.5, 0.5, 0.5, 0.5, 0, 0],
  85: [4, 2.5, 1, 0.5, 0.125, 0.125, 0, 0, 0],
  80: [4, 3.75, 1, 0.75, 0.188, 0.188, 0, 0, 0],
  75: [4, 3.75, 1, 0.75, 0.188, 0.188, 0, 0, 0],
  70: [4, 2, 4, 1.5, 2, 1, 0.5, 0, 0],
  65: [4, 2, 4, 2.25, 1, 1, 0.5, 0, 0],
  60: [4, 2, 10, 2.25, 2, 1, 1, 0, 0],
  55: [8, 12, 6, 4, 3, 3, 2, 2, 0],
  50: [16, 12, 12, 4, 4, 3, 3, 3, 3],
  45: [12, 24, 12, 10, 4, 4, 3, 3, 3],
  40: [12, 12, 24, 18, 16, 14, 8, 8, 8],
  35: [0, 12, 12, 36, 24, 18, 16, 16, 16],
  30: [0, 0, 12, 12, 36, 36, 24, 24, 24],
  25: [0, 0, 0, 12, 12, 12, 24, 24, 24],
  20: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  15: [0, 0, 0, 0, 0, 0, 0, 0, 0],
};
