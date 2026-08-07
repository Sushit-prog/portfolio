import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const src = resolve(repoRoot, "artifacts/sushit-portfolio/dist");

for (const destName of ["dist"]) {
  const dest = resolve(repoRoot, destName);
  rmSync(dest, { recursive: true, force: true });
  if (existsSync(src)) {
    cpSync(src, dest, { recursive: true });
    console.log(`copied ${src} -> ${dest}`);
  }
}
