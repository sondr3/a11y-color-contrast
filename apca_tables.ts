const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type FontWeight = typeof fontWeights[number];
export type Rating = number | "prohibited" | "placeholder";
export type Modifier = "non-text" | "avoid-100" | "add-15" | "body-text";

export interface FontSize {
  size: number;
  values: {
    [k in FontWeight]: {
      rating: Rating;
      modifier?: Modifier;
    };
  };
}

export const FONT_TO_CONTRAST_TABLE: Array<FontSize> = [
  {
    size: 10,
    values: {
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
  },
  {
    size: 12,
    values: {
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
  },
  {
    size: 14,
    values: {
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
  },
  {
    size: 15,
    values: {
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
  },
  {
    size: 16,
    values: {
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
  },
  {
    size: 18,
    values: {
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
  },
  {
    size: 21,
    values: {
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
  },
  {
    size: 24,
    values: {
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
  },
  {
    size: 28,
    values: {
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
  },
  {
    size: 32,
    values: {
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
  },
  {
    size: 36,
    values: {
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
  },
  {
    size: 42,
    values: {
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
  },
  {
    size: 48,
    values: {
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
  },
  {
    size: 60,
    values: {
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
  },
  {
    size: 72,
    values: {
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
  },
  {
    size: 96,
    values: {
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
  },
];
