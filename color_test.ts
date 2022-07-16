import { assertEquals } from "testing/asserts.ts";
import { toHex } from "./color.ts";

Deno.test("can convert to hex", () => {
  assertEquals(toHex([255, 255, 255]), "#ffffff");
  assertEquals(toHex([170, 170, 170]), "#aaaaaa");
  assertEquals(toHex([128, 128, 128]), "#808080");
});
