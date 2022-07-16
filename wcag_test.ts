import { assert, assertEquals, assertFalse } from "testing/asserts.ts";
import { contrast, hex, isReadable, luminance } from "./mod.ts";

export const round = (number: number, digits = 2, base = Math.pow(10, digits)): number => {
  return Math.round((number + Number.EPSILON) * base) / base + 0;
};

export const floor = (number: number, digits = 2, base = Math.pow(10, digits)): number => {
  return Math.floor(number + Number.EPSILON * base) / base;
};

Deno.test("calculates perceived luminance of a color", () => {
  assertEquals(luminance(hex("#000000")), 0);
  assertEquals(round(luminance(hex("#e42189"))), 0.19);
  assertEquals(round(luminance(hex("#ff0000"))), 0.21);
  assertEquals(round(luminance(hex("#808080"))), 0.22);
  assertEquals(round(luminance(hex("#aabbcc"))), 0.48);
  assertEquals(round(luminance(hex("#ccddee"))), 0.71);
  assertEquals(luminance(hex("#ffffff")), 1);
});

Deno.test("calculates a contrast ratio for a color pair", () => {
  assertEquals(contrast(hex("#000000")), 21);
  assertEquals(contrast(hex("#ffffff"), hex("#000000")), 21);
  assertEquals(round(contrast(hex("#777777"))), 4.48);
  assertEquals(round(contrast(hex("#ff0000"))), 4);
  assertEquals(round(contrast(hex("#00ff00"))), 1.37);
  assertEquals(round(contrast(hex("#2e2e2e"))), 13.58);
  assertEquals(round(contrast(hex("#0079ad"))), 4.84);
  assertEquals(round(contrast(hex("#0079ad"), hex("#2e2e2e"))), 2.81);
  assertEquals(round(contrast(hex("#e42189"), hex("#0d0330"))), 4.55);
  assertEquals(round(contrast(hex("#fff4cc"), hex("#3a1209"))), 15.01);
});

Deno.test("passes readability tests", () => {
  assert(isReadable(hex("#000")));
  assertFalse(isReadable(hex("#777777")));
  assertFalse(isReadable(hex("#e60000"), hex("#ffff47")));
  assertFalse(isReadable(hex("#af085c"), hex("#000000")));
  assertFalse(isReadable(hex("#af085c"), hex("#000000"), { size: "large" }));
  assertFalse(isReadable(hex("#d53987"), hex("#000000")));
  assertFalse(isReadable(hex("#d53987"), hex("#000000"), { level: "AAA" }));
  assert(isReadable(hex("#e9dddd"), hex("#864b7c"), { level: "AA" }));
  assertFalse(isReadable(hex("#e9dddd"), hex("#864b7c"), { level: "AAA" }));
  assert(isReadable(hex("#e9dddd"), hex("#864b7c"), { level: "AAA", size: "large" }));
  assert(isReadable(hex("#e9dddd"), hex("#67325e"), { level: "AAA" }));
});
