import { test } from "vitest";
import { apcaContrastValue } from "./apca.js";
import { hex } from "./index.js";

test("APCA is calculated correctly", ({ expect }) => {
	expect(apcaContrastValue(hex("#1234b0"), hex("#e9e4d0"))).toBe(75.6);
	expect(apcaContrastValue(hex("#e9e4d0"), hex("#1234b0"))).toBe(-78.3);

	expect(apcaContrastValue(hex("#fff"), hex("#000"))).toBe(-107.9);
	expect(apcaContrastValue(hex("#000"), hex("#fff"))).toBe(106);

	expect(apcaContrastValue(hex("#00ff00"), hex("#fff"))).toBe(17.1);
	expect(apcaContrastValue(hex("#fff"), hex("#00ff00"))).toBe(-19.6);

	expect(apcaContrastValue(hex("#2e2e2e"), hex("#fff"))).toBe(100.1);
	expect(apcaContrastValue(hex("#fff"), hex("#2e2e2e"))).toBe(-103.2);

	expect(apcaContrastValue(hex("0079ad"), hex("#2e2e2e"))).toBe(-24.1);
	expect(apcaContrastValue(hex("#2e2e2e"), hex("0079ad"))).toBe(25.2);

	expect(apcaContrastValue(hex("#e42189"), hex("#0d0330"))).toBe(-33.3);
	expect(apcaContrastValue(hex("#0d0330"), hex("#e42189"))).toBe(35.6);

	expect(apcaContrastValue(hex("#fff4cc"), hex("#3a1209"))).toBe(-98.3);
	expect(apcaContrastValue(hex("#3a1209"), hex("#fff4cc"))).toBe(96.4);

	expect(apcaContrastValue([136, 136, 136], [255, 255, 255])).toBe(63.1);
	expect(apcaContrastValue([255, 255, 255], [136, 136, 136])).toBe(-68.5);
	expect(apcaContrastValue([0, 0, 0], [170, 170, 170])).toBe(58.1);
	expect(apcaContrastValue([170, 170, 170], [0, 0, 0])).toBe(-56.2);
	expect(apcaContrastValue([17, 34, 51], [221, 51, 255])).toBe(40.1);
	expect(apcaContrastValue([221, 51, 255], [17, 34, 51])).toBe(-38.4);
	expect(apcaContrastValue([17, 34, 51], [68, 68, 68])).toBe(8.3);
	expect(apcaContrastValue([68, 68, 68], [17, 34, 51])).toBe(-7.5);
});
