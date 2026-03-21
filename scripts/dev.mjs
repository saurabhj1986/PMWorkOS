import * as esbuild from "esbuild";
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const apiBase = process.env.API_BASE || "http://127.0.0.1:3847";

mkdirSync(path.join(root, "dev"), { recursive: true });

spawnSync("npx", ["tailwindcss", "-i", "./src/index.css", "-o", "./dev/styles.css"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});

const tw = spawn(
  "npx",
  ["tailwindcss", "-i", "./src/index.css", "-o", "./dev/styles.css", "--watch"],
  { cwd: root, stdio: "inherit", shell: true }
);

const ctx = await esbuild.context({
  absWorkingDir: root,
  entryPoints: ["src/main.tsx"],
  bundle: true,
  outdir: "dev",
  format: "esm",
  sourcemap: true,
  jsx: "automatic",
  alias: { "@": path.join(root, "src") },
  define: {
    __API_BASE__: JSON.stringify(apiBase),
    "process.env.NODE_ENV": '"development"',
  },
});

await ctx.watch();

const serveResult = await ctx.serve({
  servedir: root,
  port: 5173,
});

const hosts = serveResult.hosts ?? [];
const primary = hosts[0] ?? "localhost";
console.log(`\n  Dev server → http://${primary}:${serveResult.port}`);
console.log(`  Frontend API_BASE → ${apiBase}\n`);

function shutdown() {
  tw.kill("SIGTERM");
  ctx.dispose().catch(() => {});
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
