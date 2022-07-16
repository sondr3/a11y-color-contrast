import { build, emptyDir } from "https://deno.land/x/dnt@0.28.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  esModule: true,
  importMap: "./import_map.json",
  outDir: "./npm",
  shims: {
    deno: {
      test: "dev",
    },
  },
  compilerOptions: {
    target: "ES2021",
  },
  package: {
    name: "a11y-color-contrast",
    version: Deno.args[0],
    author: "Sondre Nilsen <sondre@eons.io> (https://www.eons.io)",
    description: "A simple utility package for working with WCAG 2.2/3.0 color contrasts",
    license: "MIT",
    homepage: "https://github.com/sondr3/a11y-color-contrast#readme",
    repository: {
      type: "git",
      url: "git+https://github.com/sondr3/a11y-color-contrast.git",
    },
    bugs: {
      url: "https://github.com/sondr3/a11y-color-contrast/issues",
    },
    keywords: ["a11y", "wcag", "apca", "contrast", "color"],
    engines: {
      node: ">=16.6.0",
    },
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
Deno.copyFileSync("CHANGELOG.md", "npm/CHANGELOG.md");
