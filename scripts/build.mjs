import * as esbuild from "esbuild";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

const apiBase = process.env.API_BASE || "http://127.0.0.1:3847";

mkdirSync(dist, { recursive: true });

const tw = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["tailwindcss", "-i", "./src/index.css", "-o", "./dist/styles.css", "--minify"],
  { cwd: root, stdio: "inherit", shell: process.platform === "win32" }
);
if (tw.status !== 0) process.exit(tw.status ?? 1);

await esbuild.build({
  absWorkingDir: root,
  entryPoints: ["src/main.tsx"],
  bundle: true,
  outfile: "dist/app.js",
  minify: true,
  sourcemap: true,
  jsx: "automatic",
  alias: { "@": path.join(root, "src") },
  define: {
    __API_BASE__: JSON.stringify(apiBase),
    "process.env.NODE_ENV": '"production"',
  },
  format: "esm",
});

let html = readFileSync(path.join(root, "index.html"), "utf8");
html = html
  .replace("/dev/styles.css", "/styles.css")
  .replace("/dev/main.js", "/app.js")
  .replace('href="/public/vite.svg"', 'href="/vite.svg"');
writeFileSync(path.join(dist, "index.html"), html);

try {
  cpSync(path.join(root, "public", "vite.svg"), path.join(dist, "vite.svg"));
} catch {
  /* optional */
}

console.log("Build complete → dist/");
