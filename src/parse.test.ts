import { test } from "vitest";
import { type Color, isValidColor, toHex } from "./color.js";
import { hex } from "./parse.js";

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

test("simple hex parsing", ({ expect }) => {
	for (const { input, color: expected } of hexTests) {
		expect(hex(input)).toEqual(expected);
		expect(toHex(hex(input))).toBe(input);
	}
});

test("support hex4 and hex8", ({ expect }) => {
	expect(hex("#ffffffff")).toStrictEqual([255, 255, 255]);
	expect(hex("#80808080")).toStrictEqual([128, 128, 128]);
	expect(hex("#AAAF")).toStrictEqual([170, 170, 170]);
	expect(hex("#5550")).toStrictEqual([85, 85, 85]);
});

test("Ignores a case and extra whitespace", ({ expect }) => {
	expect(hex(" #0a0a0a ")).toStrictEqual([10, 10, 10]);
});

test("valid input is valid", ({ expect }) => {
	expect(isValidColor(hex("#ffffff"))).toBeTruthy();
	expect(isValidColor(hex("#0011gg"))).toBeFalsy();
	expect(isValidColor(hex("#12345"))).toBeFalsy();
	expect(isValidColor(hex("#1234567"))).toBeFalsy();
});
