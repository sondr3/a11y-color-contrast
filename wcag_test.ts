import { assert, assertEquals, assertFalse } from "testing/asserts.ts";
import { contrast, hex, isReadable, luminance, round } from "./mod.ts";

Deno.test("calculates perceived luminance of a color", () => {
  assertEquals(luminance(hex("#000000")), 0);
  assertEquals(round(luminance(hex("#e42189")), 4), 0.1939);
  assertEquals(round(luminance(hex("#ff0000")), 4), 0.2126);
  assertEquals(round(luminance(hex("#808080")), 4), 0.2159);
  assertEquals(round(luminance(hex("#aabbcc")), 4), 0.4845);
  assertEquals(round(luminance(hex("#ccddee")), 4), 0.7072);
  assertEquals(luminance(hex("#ffffff")), 1);
});

Deno.test("calculates a contrast ratio for a color pair", () => {
  assertEquals(contrast(hex("#000000")), 21);
  assertEquals(contrast(hex("#ffffff"), hex("#000000")), 21);
  assertEquals(round(contrast(hex("#777777")), 4), 4.4781);
  assertEquals(round(contrast(hex("#ff0000")), 4), 3.9985);
  assertEquals(round(contrast(hex("#00ff00")), 4), 1.3722);
  assertEquals(round(contrast(hex("#2e2e2e")), 4), 13.5798);
  assertEquals(round(contrast(hex("#0079ad")), 4), 4.8405);
  assertEquals(round(contrast(hex("#0079ad"), hex("#2e2e2e")), 4), 2.8054);
  assertEquals(round(contrast(hex("#e42189"), hex("#0d0330")), 4), 4.5465);
  assertEquals(round(contrast(hex("#fff4cc"), hex("#3a1209")), 4), 15.0067);
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
