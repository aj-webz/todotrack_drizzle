import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm"],
    target: "node20",
    sourcemap: true,
    clean: true,
    // CRITICAL CHANGES BELOW
    bundle: true,
    splitting: false, 
    noExternal: [
        "@repo/db",
        "@repo/shared",
        "hono",
        "zod",
        "nanoid",
        "drizzle-orm"
    ],
    dts: false,
})