import { test } from "vitest";
import { toHex } from "./color.js";

test("can convert to hex", ({ expect }) => {
	expect(toHex([255, 255, 255])).toBe("#ffffff");
	expect(toHex([170, 170, 170])).toBe("#aaaaaa");
	expect(toHex([128, 128, 128])).toBe("#808080");
	expect(toHex([0, 0, 0])).toBe("#000000");
	expect(toHex([65, 131, 196])).toBe("#4183c4");
	expect(toHex([255, 154, 253])).toBe("#ff9afd");
	expect(toHex([40, 42, 54])).toBe("#282a36");
	expect(toHex([65, 131, 196])).toBe("#4183c4");
	expect(toHex([255, 154, 253])).toBe("#ff9afd");
	expect(toHex([160, 82, 45])).toBe("#a0522d");
	expect(toHex([40, 42, 54])).toBe("#282a36");
	expect(toHex([40, 42, 54])).toBe("#282a36");
});
