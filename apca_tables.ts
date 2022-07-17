const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type FontWeight = typeof fontWeights[number];

const fontSizes = [10, 12, 14, 15, 16, 18, 21, 24, 28, 32, 36, 42, 48, 60, 72, 96] as const;
export type FontSize = typeof fontSizes[number];

const lcValue = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15] as const;
export type LcValue = typeof lcValue[number];
export type LcFontSize = number | null;

export type Rating = number | "prohibited" | "placeholder";
export type Modifier = "non-text" | "avoid-100" | "add-15" | "body-text";

export type FontContrast = {
  [k in FontWeight]: {
    rating: Rating;
    modifier?: Modifier;
  };
};

export const getFontContrast = (fontSize: FontSize): FontContrast => FONT_TO_CONTRAST_TABLE[fontSize];

export const FONT_TO_CONTRAST_TABLE: Record<FontSize, FontContrast> = {
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

export const getFontSizeByContrast = (contrast: LcValue): Array<LcFontSize> => CONTRAST_TO_FONT_TABLE[contrast];

export const CONTRAST_TO_FONT_TABLE: Record<LcValue, Array<LcFontSize>> = {
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
