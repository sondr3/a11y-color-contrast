import { assert, assertEquals, assertFalse } from "testing/asserts.ts";
import { Color } from "./mod.ts";

export const round = (number: number, digits = 2, base = Math.pow(10, digits)): number => {
  return Math.round((number + Number.EPSILON) * base) / base + 0;
};

export const floor = (number: number, digits = 2, base = Math.pow(10, digits)): number => {
  return Math.floor(number + Number.EPSILON * base) / base;
};
//
// Deno.test("calculates perceived luminance of a color", () => {
//   assertEquals(Color.hex("#000000").luminance(), 0);
//   assertEquals(round(Color.hex("#e42189").luminance()), 0.19);
//   assertEquals(round(Color.hex("#ff0000").luminance()), 0.21);
//   assertEquals(round(Color.hex("#808080").luminance()), 0.22);
//   assertEquals(round(Color.hex("#aabbcc").luminance()), 0.48);
//   assertEquals(round(Color.hex("#ccddee").luminance()), 0.71);
//   assertEquals(Color.hex("#ffffff").luminance(), 1);
// });
//
// Deno.test("calculates a contrast ratio for a color pair", () => {
//   assertEquals(Color.hex("#000000").contrast(), 21);
//   assertEquals(Color.hex("#ffffff").contrast(Color.hex("#000000")), 21);
//   assertEquals(round(Color.hex("#777777").contrast()), 4.48);
//   assertEquals(round(Color.hex("#ff0000").contrast()), 4);
//   assertEquals(round(Color.hex("#00ff00").contrast()), 1.37);
//   assertEquals(round(Color.hex("#2e2e2e").contrast()), 13.58);
//   assertEquals(round(Color.hex("#0079ad").contrast()), 4.84);
//   assertEquals(round(Color.hex("#0079ad").contrast(Color.hex("#2e2e2e"))), 2.81);
//   assertEquals(round(Color.hex("#e42189").contrast(Color.hex("#0d0330"))), 4.55);
//   assertEquals(round(Color.hex("#fff4cc").contrast(Color.hex("#3a1209"))), 15.01);
// });
//
// Deno.test("passes readability tests", () => {
//   assert(Color.hex("#000").isReadable());
//   assertFalse(Color.hex("#777777").isReadable());
//   assertFalse(Color.hex("#e60000").isReadable(Color.hex("#ffff47")));
//   assertFalse(Color.hex("#af085c").isReadable(Color.hex("#000000")));
//   assertFalse(Color.hex("#af085c").isReadable(Color.hex("#000000"), { size: "large" }));
//   assertFalse(Color.hex("#d53987").isReadable(Color.hex("#000000")));
//   assertFalse(Color.hex("#d53987").isReadable(Color.hex("#000000"), { level: "AAA" }));
//   assert(Color.hex("#e9dddd").isReadable(Color.hex("#864b7c"), { level: "AA" }));
//   assertFalse(Color.hex("#e9dddd").isReadable(Color.hex("#864b7c"), { level: "AAA" }));
//   assert(Color.hex("#e9dddd").isReadable(Color.hex("#864b7c"), { level: "AAA", size: "large" }));
//   assert(Color.hex("#e9dddd").isReadable(Color.hex("#67325e"), { level: "AAA" }));
// });
