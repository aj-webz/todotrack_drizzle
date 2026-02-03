import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/index.ts"],               // main entry of your API
    outDir: "dist",                        // output folder
    format: ["esm"],                       // ESM for Node 22 / Vercel
    target: "node22",                      // Node version Vercel uses
    sourcemap: true,                       // optional, for debugging
    clean: true,                           // clear dist before build
    bundle: true,                          // bundle dependencies
    dts: true,                             // generate type declarations
    noExternal: [
        "@repo/db",                          // local package
        "@repo/shared",                      // local package
        "drizzle-orm",                        // any runtime dependencies you want bundled
        "postgres",
        "hono",
        "zod",
        "nanoid"
    ],
})