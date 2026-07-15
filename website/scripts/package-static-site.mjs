import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const websiteRoot = process.cwd();
const repositoryRoot = path.resolve(websiteRoot, "..");
const outDirectory = path.join(websiteRoot, "out");
const dashboardSource = path.join(
  repositoryRoot,
  "deploy",
  "rf-dashboard-light",
  "index.html",
);
const dashboardManifest = path.join(
  repositoryRoot,
  "deploy",
  "rf-dashboard-light",
  "release-manifest.json",
);
const dashboardDestination = path.join(
  outDirectory,
  "tools",
  "rf-dashboard-light",
  "index.html",
);

const manifest = JSON.parse(await readFile(dashboardManifest, "utf8"));
const dashboard = await readFile(dashboardSource);
const hash = createHash("sha256").update(dashboard).digest("hex").toUpperCase();

if (hash !== manifest.productionSha256) {
  throw new Error(
    `Dashboard artifact hash mismatch. Expected ${manifest.productionSha256}, found ${hash}.`,
  );
}

await mkdir(path.dirname(dashboardDestination), { recursive: true });
await copyFile(dashboardSource, dashboardDestination);
await writeFile(path.join(outDirectory, ".nojekyll"), "", "utf8");

process.stdout.write(
  `Packaged RF Dashboard Light ${manifest.version} (${hash})\n`,
);
