import { assert, assertEquals, assertFalse } from "testing/asserts.ts";
import { Color, isValidColor, toHex } from "./color.ts";
import { hex } from "./parse.ts";

interface ColorTest {
  input: string;
  color: Color;
}

const hexTests: Array<ColorTest> = [
  {
    input: "#000000",
    color: [0, 0, 0],
  },
  {
    input: "#ffffff",
    color: [255, 255, 255],
  },
  {
    input: "#ff0000",
    color: [255, 0, 0],
  },
  {
    input: "#ff00ff",
    color: [255, 0, 255],
  },
  {
    input: "#808080",
    color: [128, 128, 128],
  },
  {
    input: "#76a800",
    color: [118, 168, 0],
  },
  {
    input: "#6699cc",
    color: [102, 153, 204],
  },
];

Deno.test("simple hex parsing", () => {
  for (const { input, color: expected } of hexTests) {
    assertEquals(hex(input), expected);
    assertEquals(toHex(hex(input)), input);
  }
});

Deno.test("support hex4 and hex8", () => {
  assertEquals(hex("#ffffffff"), [255, 255, 255]);
  assertEquals(hex("#80808080"), [128, 128, 128]);
  assertEquals(hex("#AAAF"), [170, 170, 170]);
  assertEquals(hex("#5550"), [85, 85, 85]);
});

Deno.test("Ignores a case and extra whitespace", () => {
  assertEquals(hex(" #0a0a0a "), [10, 10, 10]);
});

Deno.test("valid input is valid", () => {
  assert(isValidColor(hex("#ffffff")));
  assertFalse(isValidColor(hex("#0011gg")));
  assertFalse(isValidColor(hex("#12345")));
  assertFalse(isValidColor(hex("#1234567")));
});
