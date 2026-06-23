import {configDefaults, defineConfig} from "vitest/config"

export default defineConfig({
	test: {
		exclude: [...configDefaults.exclude, "**/dist/**"],
		coverage: {
			provider: "v8",
			include: ["src/**/*.ts"],
		},
	},
})
