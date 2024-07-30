import { test } from "vitest";
import { hex, round } from "./index.js";
import { contrast, luminance, wcagIsReadable } from "./wcag.js";

test("calculates perceived luminance of a color", ({ expect }) => {
	expect(luminance(hex("#000000"))).toBe(0);
	expect(round(luminance(hex("#e42189")), 4)).toBe(0.1939);
	expect(round(luminance(hex("#ff0000")), 4)).toBe(0.2126);
	expect(round(luminance(hex("#808080")), 4)).toBe(0.2159);
	expect(round(luminance(hex("#aabbcc")), 4)).toBe(0.4845);
	expect(round(luminance(hex("#ccddee")), 4)).toBe(0.7072);
	expect(luminance(hex("#ffffff"))).toBe(1);
});

test("calculates a contrast ratio for a color pair", ({ expect }) => {
	expect(contrast(hex("#000000"))).toBe(21);
	expect(contrast(hex("#ffffff"), hex("#000000"))).toBe(21);
	expect(round(contrast(hex("#777777")), 4)).toBe(4.4781);
	expect(round(contrast(hex("#ff0000")), 4)).toBe(3.9985);
	expect(round(contrast(hex("#00ff00")), 4)).toBe(1.3722);
	expect(round(contrast(hex("#2e2e2e")), 4)).toBe(13.5798);
	expect(round(contrast(hex("#0079ad")), 4)).toBe(4.8405);
	expect(round(contrast(hex("#0079ad"), hex("#2e2e2e")), 4)).toBe(2.8054);
	expect(round(contrast(hex("#e42189"), hex("#0d0330")), 4)).toBe(4.5465);
	expect(round(contrast(hex("#fff4cc"), hex("#3a1209")), 4)).toBe(15.0067);
});

test("passes readability tests", ({ expect }) => {
	expect(wcagIsReadable(hex("#000"))).toBeTruthy();
	expect(wcagIsReadable(hex("#777777"))).toBeFalsy();
	expect(wcagIsReadable(hex("#e60000"), hex("#ffff47"))).toBeFalsy();
	expect(wcagIsReadable(hex("#af085c"), hex("#000000"))).toBeFalsy();
	expect(wcagIsReadable(hex("#af085c"), hex("#000000"), { size: "large" })).toBeFalsy();
	expect(wcagIsReadable(hex("#d53987"), hex("#000000"))).toBeFalsy();
	expect(wcagIsReadable(hex("#d53987"), hex("#000000"), { level: "AAA" })).toBeFalsy();
	expect(wcagIsReadable(hex("#e9dddd"), hex("#864b7c"), { level: "AA" })).toBeTruthy();
	expect(wcagIsReadable(hex("#e9dddd"), hex("#864b7c"), { level: "AAA" })).toBeFalsy();
	expect(wcagIsReadable(hex("#e9dddd"), hex("#864b7c"), { level: "AAA", size: "large" })).toBeTruthy();
	expect(wcagIsReadable(hex("#e9dddd"), hex("#67325e"), { level: "AAA" })).toBeTruthy();
});
