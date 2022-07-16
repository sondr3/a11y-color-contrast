import { assert, assertEquals, assertFalse } from "testing/asserts.ts";
import { Color, isValid } from "./mod.ts";
import { hex } from "./parse.ts";

interface ColorTest {
  input: string;
  color: Color;
}

const hexTests: Array<ColorTest> = [
  {
    input: "#000000",
    color: new Color({ r: 0, g: 0, b: 0 }),
  },
  {
    input: "#ffffff",
    color: new Color({ r: 255, g: 255, b: 255 }),
  },
  {
    input: "#ff0000",
    color: new Color({ r: 255, g: 0, b: 0 }),
  },
  {
    input: "#ff00ff",
    color: new Color({ r: 255, g: 0, b: 255 }),
  },
  {
    input: "#808080",
    color: new Color({ r: 128, g: 128, b: 128 }),
  },
  {
    input: "#76a800",
    color: new Color({ r: 118, g: 168, b: 0 }),
  },
  {
    input: "#6699cc",
    color: new Color({ r: 102, g: 153, b: 204 }),
  },
];

Deno.test("simple hex parsing", () => {
  for (const { input, color: expected } of hexTests) {
    assertEquals(hex(input).toRBG(), expected.toRBG());
    assertEquals(hex(input).toHex(), input);
  }
});

Deno.test("support hex4 and hex8", () => {
  assertEquals(hex("#ffffffff").toRBGA(), { r: 255, g: 255, b: 255, a: 1 });
  assertEquals(hex("#80808080").toRBGA(), { r: 128, g: 128, b: 128, a: 0.5 });
  assertEquals(hex("#AAAF").toRBGA(), { r: 170, g: 170, b: 170, a: 1 });
  assertEquals(hex("#5550").toRBGA(), { r: 85, g: 85, b: 85, a: 0 });
  // assertEquals(new Color({ r: 255, g: 255, b: 255, a: 1 }).toHexA(), "#ffffffff");
  // assertEquals(new Color({ r: 170, g: 170, b: 170, a: 0.5 }).toHexA(), "#aaaaaa80");
  // assertEquals(new Color({ r: 128, g: 128, b: 128, a: 0 }).toHexA(), "#80808000");
});

Deno.test("Ignores a case and extra whitespace", () => {
  assertEquals(hex(" #0a0a0a ").toRBGA(), { r: 10, g: 10, b: 10, a: 1 });
});

Deno.test("valid input is valid", () => {
  assert(isValid(hex("#ffffff")));
  assertFalse(isValid(hex("#0011gg")));
  assertFalse(isValid(hex("#12345")));
  assertFalse(isValid(hex("#1234567")));
});
