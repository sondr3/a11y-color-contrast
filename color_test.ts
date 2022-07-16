import { assertEquals } from "testing/asserts.ts";
import { color, toHexA } from "./color.ts";

Deno.test("can convert to hex with alpha", () => {
  assertEquals(toHexA(color({ r: 255, g: 255, b: 255, a: 1 })), "#ffffffff");
  assertEquals(toHexA(color({ r: 170, g: 170, b: 170, a: 0.5 })), "#aaaaaa80");
  assertEquals(toHexA(color({ r: 128, g: 128, b: 128, a: 0 })), "#80808000");
});
