import { test } from "vitest"

import { floor, round } from "./index.js"

test("round keeps the given precision", ({ expect }) => {
	expect(round(2.567, 2)).toBe(2.57)
	expect(round(15.3039, 2)).toBe(15.3)
})

test("floor keeps the given precision", ({ expect }) => {
	expect(floor(2.567, 2)).toBe(2.56)
	expect(floor(15.3039, 2)).toBe(15.3)
	expect(floor(21, 2)).toBe(21)
	expect(floor(0.25, 2)).toBe(0.25)
})
