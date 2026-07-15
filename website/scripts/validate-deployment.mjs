import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const contextArgument = process.argv.find((argument) =>
  argument.startsWith("--context="),
);
const context = contextArgument?.split("=")[1] ?? "production";

if (!new Set(["preview", "production"]).has(context)) {
  throw new Error(`Unsupported deployment context: ${context}`);
}

const websiteRoot = process.cwd();
const repositoryRoot = path.resolve(websiteRoot, "..");
const outDirectory = path.join(websiteRoot, "out");
const requiredFiles = [
  "index.html",
  "about/index.html",
  "contact/index.html",
  "projects/index.html",
  "projects/global-rf-spectrum-dashboard/index.html",
  "projects/compliance-plan-generator/index.html",
  "technical-notes/index.html",
  "resume/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "tools/rf-dashboard-light/index.html",
];

for (const relativePath of requiredFiles) {
  const file = path.join(outDirectory, relativePath);
  const fileStat = await stat(file);
  if (!fileStat.isFile() || fileStat.size === 0) {
    throw new Error(`Required deployment file is empty: ${relativePath}`);
  }
}

const readOutput = (relativePath) =>
  readFile(path.join(outDirectory, relativePath), "utf8");
const home = await readOutput("index.html");
const rfProject = await readOutput(
  "projects/global-rf-spectrum-dashboard/index.html",
);
const cpgProject = await readOutput(
  "projects/compliance-plan-generator/index.html",
);
const robots = await readOutput("robots.txt");
const dashboard = await readFile(
  path.join(outDirectory, "tools/rf-dashboard-light/index.html"),
);
const dashboardText = dashboard.toString("utf8");
const manifest = JSON.parse(
  await readFile(
    path.join(
      repositoryRoot,
      "deploy",
      "rf-dashboard-light",
      "release-manifest.json",
    ),
    "utf8",
  ),
);
const dashboardHash = createHash("sha256")
  .update(dashboard)
  .digest("hex")
  .toUpperCase();

if (dashboardHash !== manifest.productionSha256) {
  throw new Error(
    "Packaged Dashboard hash does not match the release manifest.",
  );
}

const combinedPortfolio = `${home}\n${rfProject}\n${cpgProject}`;
const forbiddenLocalPatterns = [
  /file:\/\//i,
  /localhost(?::\d+)?/i,
  /C:\\Users\\/i,
  /Demo10_Public_Light/i,
];

for (const pattern of forbiddenLocalPatterns) {
  if (pattern.test(combinedPortfolio)) {
    throw new Error(`Local-only value found in public output: ${pattern}`);
  }
}

const forbiddenDashboardPatterns = [
  /SHURE/i,
  /Admin Import/i,
  /Import Unlock/i,
  /SHURE_Compliance_Tools_Portal/i,
  /Save Updated HTML/i,
  /<script[^>]+src=/i,
  /<link[^>]+rel=["']stylesheet["'][^>]+href=/i,
  /\bfetch\s*\(/,
  /XMLHttpRequest/,
  /WebSocket\s*\(/,
];

for (const pattern of forbiddenDashboardPatterns) {
  if (pattern.test(dashboardText)) {
    throw new Error(`Forbidden Dashboard release pattern found: ${pattern}`);
  }
}

if (!/<meta name="robots" content="noindex, follow">/.test(dashboardText)) {
  throw new Error("Dashboard noindex, follow metadata is missing.");
}

if (!dashboardText.includes("Public Light 0.1.1")) {
  throw new Error("Dashboard release version is missing.");
}

if (/Open (?:CPG|Compliance Plan Generator)/i.test(cpgProject)) {
  throw new Error("CPG output contains an unsupported live-tool action.");
}

if (context === "preview") {
  if (!robots.includes("Disallow: /")) {
    throw new Error("Preview robots policy must disallow crawling.");
  }
  if (!rfProject.includes("Open Dashboard preview")) {
    throw new Error("Preview RF action label is missing.");
  }
} else {
  if (!robots.includes("Allow: /")) {
    throw new Error("Production robots policy must allow Portfolio crawling.");
  }
  if (!rfProject.includes("Open RF Dashboard")) {
    throw new Error("Production RF action label is missing.");
  }
  if (rfProject.includes("Open Dashboard preview")) {
    throw new Error("Preview-only RF label remains in production output.");
  }
}

const rfLinkTag = [...rfProject.matchAll(/<a\b[^>]*>/g)]
  .map((match) => match[0])
  .find((tag) => tag.includes("/tools/rf-dashboard-light/"));

if (
  !rfLinkTag?.includes('target="_blank"') ||
  !rfLinkTag.includes('rel="noopener noreferrer"')
) {
  throw new Error("RF external action is missing safe new-tab semantics.");
}

process.stdout.write(
  `Validated ${context} deployment output and Dashboard ${manifest.version} (${dashboardHash}).\n`,
);
