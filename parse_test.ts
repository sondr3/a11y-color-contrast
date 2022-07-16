import { assert, assertEquals, assertFalse } from "testing/asserts.ts";
import { Color, color, isValid, toHex, toRBG, toRBGA } from "./color.ts";
import { hex } from "./parse.ts";

interface ColorTest {
  input: string;
  color: Color;
}

const hexTests: Array<ColorTest> = [
  {
    input: "#000000",
    color: color({ r: 0, g: 0, b: 0 }),
  },
  {
    input: "#ffffff",
    color: color({ r: 255, g: 255, b: 255 }),
  },
  {
    input: "#ff0000",
    color: color({ r: 255, g: 0, b: 0 }),
  },
  {
    input: "#ff00ff",
    color: color({ r: 255, g: 0, b: 255 }),
  },
  {
    input: "#808080",
    color: color({ r: 128, g: 128, b: 128 }),
  },
  {
    input: "#76a800",
    color: color({ r: 118, g: 168, b: 0 }),
  },
  {
    input: "#6699cc",
    color: color({ r: 102, g: 153, b: 204 }),
  },
];

Deno.test("simple hex parsing", () => {
  for (const { input, color: expected } of hexTests) {
    assertEquals(toRBG(hex(input)), toRBG(expected));
    assertEquals(toHex(hex(input)), input);
  }
});

Deno.test("support hex4 and hex8", () => {
  assertEquals(toRBGA(hex("#ffffffff")), { r: 255, g: 255, b: 255, a: 1 });
  assertEquals(toRBGA(hex("#80808080")), { r: 128, g: 128, b: 128, a: 0.5 });
  assertEquals(toRBGA(hex("#AAAF")), { r: 170, g: 170, b: 170, a: 1 });
  assertEquals(toRBGA(hex("#5550")), { r: 85, g: 85, b: 85, a: 0 });
});

Deno.test("Ignores a case and extra whitespace", () => {
  assertEquals(toRBGA(hex(" #0a0a0a ")), { r: 10, g: 10, b: 10, a: 1 });
});

Deno.test("valid input is valid", () => {
  assert(isValid(hex("#ffffff")));
  assertFalse(isValid(hex("#0011gg")));
  assertFalse(isValid(hex("#12345")));
  assertFalse(isValid(hex("#1234567")));
});
