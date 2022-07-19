import { assertEquals } from "testing/asserts.ts";
import { toHex } from "./color.ts";

Deno.test("can convert to hex", () => {
  assertEquals(toHex([255, 255, 255]), "#ffffff");
  assertEquals(toHex([170, 170, 170]), "#aaaaaa");
  assertEquals(toHex([128, 128, 128]), "#808080");
  assertEquals(toHex([0, 0, 0]), "#000000");
  assertEquals(toHex([65, 131, 196]), "#4183c4");
  assertEquals(toHex([255, 154, 253]), "#ff9afd");
  assertEquals(toHex([40, 42, 54]), "#282a36");
  assertEquals(toHex([65, 131, 196]), "#4183c4");
  assertEquals(toHex([255, 154, 253]), "#ff9afd");
  assertEquals(toHex([160, 82, 45]), "#a0522d");
  assertEquals(toHex([40, 42, 54]), "#282a36");
  assertEquals(toHex([40, 42, 54]), "#282a36");
});
