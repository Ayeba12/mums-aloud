// Packages wp-plugin/mums-aloud-headless/ as a zip WordPress can install (Plugins > Add New > Upload Plugin).
import { mkdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const source = join(root, "wp-plugin", "mums-aloud-headless");
const outDir = resolve(root, "..", "output", "cms");
const out = join(outDir, "mums-aloud-headless.zip");
mkdirSync(outDir, { recursive: true });
// PowerShell's Compress-Archive keeps the folder name, which WordPress needs as the plugin's directory.
execFileSync("powershell", ["-NoProfile", "-Command", `Compress-Archive -Path '${source}' -DestinationPath '${out}' -Force`], { stdio: "inherit" });
console.log(`wrote ${relative(root, out)} (${statSync(out).size} bytes)`);
