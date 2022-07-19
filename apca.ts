import { Color } from "./color.ts";
import { round } from "./mod.ts";

// Code derived from formulas in https://github.com/Myndex/apca-w3/blob/99be5162ddb000e4d49551756830d2a9fd92955e/images/APCAw3_0.1.17_APCA0.0.98G.svg.

const B_EXP = 1.414;
const B_THRESH = 0.022;
const P_IN = 0.0005;
const R_SCALE = 1.14;
const W_OFFSET = 0.027;
const P_OUT = 0.1;

export function ligthnessContrast(foreground: Color, background: Color): number {
  return round(clampMinimumContrast(foreground, background) * 100, 1);
}

const clampMinimumContrast = (foreground: Color, background: Color): number => {
  const C = clampNoiseThenScale(foreground, background);

  if (Math.abs(C) < P_OUT) {
    return 0.0;
  } else if (C > 0) {
    return C - W_OFFSET;
  } else {
    return C + W_OFFSET;
  }
};

export function screenLuminance(color: Color): number {
  const r = Math.pow(color[0] / 255, 2.4) * 0.2126729;
  const g = Math.pow(color[1] / 255, 2.4) * 0.7151522;
  const b = Math.pow(color[2] / 255, 2.4) * 0.0721750;

  return r + g + b;
}

const clampBlackLevels = (color: Color): number => {
  const luminance = screenLuminance(color);

  if (luminance >= B_THRESH) {
    return luminance;
  }

  return luminance + Math.pow(B_THRESH - luminance, B_EXP);
};

const clampNoiseThenScale = (foreground: Color, background: Color): number => {
  const y_bg = clampBlackLevels(background);
  const y_txt = clampBlackLevels(foreground);

  if (Math.abs(y_bg - y_txt) < P_IN) {
    return 0.0;
  } else if (y_txt < y_bg) {
    return normalPolarity(y_txt, y_bg) * R_SCALE;
  } else {
    return reversePolarity(y_txt, y_bg) * R_SCALE;
  }
};

const normalPolarity = (foreground: number, background: number): number => {
  return Math.pow(background, 0.56) - Math.pow(foreground, 0.57);
};

const reversePolarity = (foreground: number, background: number): number => {
  return Math.pow(background, 0.65) - Math.pow(foreground, 0.62);
};
