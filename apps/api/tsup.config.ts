import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",

  format: ["esm"],
  target: "node20",

  clean: true,
  sourcemap: true,

  bundle: true,
  splitting: false,

  noExternal: [
    "@repo/db",
    "@repo/shared"
  ]
});
