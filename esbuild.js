import esbuild from "esbuild";
import { GasPlugin } from "esbuild-gas-plugin";

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    outfile: "./dist/main.js",
    plugins: [GasPlugin],
    format: "iife",
    target: "es2019",
    minify: false,
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
