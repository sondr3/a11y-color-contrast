export * from "./wcag.ts";
export * from "./parse.ts";
export * from "./color.ts";
export * from "./apca.ts";

export const round = (number: number, digits = 2, base = Math.pow(10, digits)): number => {
  return Math.round((number + Number.EPSILON) * base) / base + 0;
};

export const floor = (number: number, digits = 2, base = Math.pow(10, digits)): number => {
  return Math.floor(number + Number.EPSILON * base) / base;
};
