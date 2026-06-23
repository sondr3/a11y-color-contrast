import config from "@sondr3/oxlint"
import { defineConfig } from "oxlint"

export default defineConfig({
	extends: [config],
	rules: {
		"eslint/no-bitwise": "off",
	},
	overrides: [{
		files: ["*.config.ts"],
		rules: {
			"import/no-default-export": "off",
		}
	}]
})
