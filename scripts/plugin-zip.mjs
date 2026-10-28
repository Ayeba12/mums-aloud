// Packages wp-plugin/mumsaloud-headless/ as a zip WordPress can install (Plugins > Add New Plugin > Upload Plugin).
// Python's zipfile writes the entry names with forward slashes, which the Linux host needs. PowerShell's
// Compress-Archive writes backslashes, and WordPress then unpacks files with a backslash in their names.
import { mkdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const outDir = resolve(root, "..", "output", "cms");
const out = join(outDir, "mumsaloud-headless.zip");
mkdirSync(outDir, { recursive: true });
execFileSync("python", ["-I", "-m", "zipfile", "-c", out, "mumsaloud-headless/"], { cwd: join(root, "wp-plugin"), stdio: "inherit" });
console.log(`wrote ${relative(root, out)} (${statSync(out).size} bytes)`);
