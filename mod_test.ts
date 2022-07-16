import { assert, assertEquals, assertFalse } from "testing/asserts.ts";
import { Color } from "./mod.ts";

export const round = (number: number, digits = 2, base = Math.pow(10, digits)): number => {
  return Math.round((number + Number.EPSILON) * base) / base + 0;
};

export const floor = (number: number, digits = 2, base = Math.pow(10, digits)): number => {
  return Math.floor(number + Number.EPSILON * base) / base;
};

interface ColorTest {
  hex: string;
  color: Color;
}

const hexTests: Array<ColorTest> = [
  {
    hex: "#000000",
    color: new Color({ r: 0, g: 0, b: 0 }),
  },
  {
    hex: "#ffffff",
    color: new Color({ r: 255, g: 255, b: 255 }),
  },
  {
    hex: "#ff0000",
    color: new Color({ r: 255, g: 0, b: 0 }),
  },
  {
    hex: "#ff00ff",
    color: new Color({ r: 255, g: 0, b: 255 }),
  },
  {
    hex: "#808080",
    color: new Color({ r: 128, g: 128, b: 128 }),
  },
  {
    hex: "#76a800",
    color: new Color({ r: 118, g: 168, b: 0 }),
  },
  {
    hex: "#6699cc",
    color: new Color({ r: 102, g: 153, b: 204 }),
  },
];

Deno.test("simple hex parsing", () => {
  for (const { hex, color: expected } of hexTests) {
    assertEquals(Color.hex(hex).toRBG(), expected.toRBG());
    assertEquals(Color.hex(hex).toHex(), hex);
  }
});

Deno.test("support hex4 and hex8", () => {
  assertEquals(Color.hex("#ffffffff").toRBGA(), { r: 255, g: 255, b: 255, a: 1 });
  assertEquals(Color.hex("#80808080").toRBGA(), { r: 128, g: 128, b: 128, a: 0.5 });
  assertEquals(Color.hex("#AAAF").toRBGA(), { r: 170, g: 170, b: 170, a: 1 });
  assertEquals(Color.hex("#5550").toRBGA(), { r: 85, g: 85, b: 85, a: 0 });
  assertEquals(new Color({ r: 255, g: 255, b: 255, a: 1 }).toHexA(), "#ffffffff");
  assertEquals(new Color({ r: 170, g: 170, b: 170, a: 0.5 }).toHexA(), "#aaaaaa80");
  assertEquals(new Color({ r: 128, g: 128, b: 128, a: 0 }).toHexA(), "#80808000");
});

Deno.test("Ignores a case and extra whitespace", () => {
  assertEquals(Color.hex(" #0a0a0a ").toRBGA(), { r: 10, g: 10, b: 10, a: 1 });
});

Deno.test("calculates perceived luminance of a color", () => {
  assertEquals(Color.hex("#000000").luminance(), 0);
  assertEquals(round(Color.hex("#e42189").luminance()), 0.19);
  assertEquals(round(Color.hex("#ff0000").luminance()), 0.21);
  assertEquals(round(Color.hex("#808080").luminance()), 0.22);
  assertEquals(round(Color.hex("#aabbcc").luminance()), 0.48);
  assertEquals(round(Color.hex("#ccddee").luminance()), 0.71);
  assertEquals(Color.hex("#ffffff").luminance(), 1);
});

Deno.test("calculates a contrast ratio for a color pair", () => {
  assertEquals(Color.hex("#000000").contrast(), 21);
  assertEquals(Color.hex("#ffffff").contrast(Color.hex("#000000")), 21);
  assertEquals(round(Color.hex("#777777").contrast()), 4.48);
  assertEquals(round(Color.hex("#ff0000").contrast()), 4);
  assertEquals(round(Color.hex("#00ff00").contrast()), 1.37);
  assertEquals(round(Color.hex("#2e2e2e").contrast()), 13.58);
  assertEquals(round(Color.hex("#0079ad").contrast()), 4.84);
  assertEquals(round(Color.hex("#0079ad").contrast(Color.hex("#2e2e2e"))), 2.81);
  assertEquals(round(Color.hex("#e42189").contrast(Color.hex("#0d0330"))), 4.55);
  assertEquals(round(Color.hex("#fff4cc").contrast(Color.hex("#3a1209"))), 15.01);
});

Deno.test("passes readability tests", () => {
  assert(Color.hex("#000").isReadable());
  assertFalse(Color.hex("#777777").isReadable());
  assertFalse(Color.hex("#e60000").isReadable(Color.hex("#ffff47")));
  assertFalse(Color.hex("#af085c").isReadable(Color.hex("#000000")));
  assertFalse(Color.hex("#af085c").isReadable(Color.hex("#000000"), { size: "large" }));
  assertFalse(Color.hex("#d53987").isReadable(Color.hex("#000000")));
  assertFalse(Color.hex("#d53987").isReadable(Color.hex("#000000"), { level: "AAA" }));
  assert(Color.hex("#e9dddd").isReadable(Color.hex("#864b7c"), { level: "AA" }));
  assertFalse(Color.hex("#e9dddd").isReadable(Color.hex("#864b7c"), { level: "AAA" }));
  assert(Color.hex("#e9dddd").isReadable(Color.hex("#864b7c"), { level: "AAA", size: "large" }));
  assert(Color.hex("#e9dddd").isReadable(Color.hex("#67325e"), { level: "AAA" }));
});
