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
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://kkkrrrkrkr.github.io/personal-portfolio"
).replace(/\/+$/, "");
const socialImageUrl = `${siteUrl}/social/xg-social-preview.png`;
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
  "favicon.svg",
  "icons/apple-touch-icon.png",
  "social/xg-social-preview.png",
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
const routeDefinitions = [
  { pathname: "/", file: "index.html", indexable: true },
  { pathname: "/about/", file: "about/index.html", indexable: true },
  { pathname: "/projects/", file: "projects/index.html", indexable: true },
  { pathname: "/contact/", file: "contact/index.html", indexable: true },
  {
    pathname: "/projects/global-rf-spectrum-dashboard/",
    file: "projects/global-rf-spectrum-dashboard/index.html",
    indexable: true,
  },
  {
    pathname: "/projects/compliance-plan-generator/",
    file: "projects/compliance-plan-generator/index.html",
    indexable: true,
  },
  {
    pathname: "/technical-notes/",
    file: "technical-notes/index.html",
    indexable: false,
  },
  {
    pathname: "/resume/",
    file: "resume/index.html",
    indexable: false,
  },
];
const routeOutputs = new Map(
  await Promise.all(
    routeDefinitions.map(async (route) => [
      route.pathname,
      await readOutput(route.file),
    ]),
  ),
);
const home = routeOutputs.get("/");
const contact = routeOutputs.get("/contact/");
const rfProject = routeOutputs.get("/projects/global-rf-spectrum-dashboard/");
const cpgProject = routeOutputs.get("/projects/compliance-plan-generator/");
const robots = await readOutput("robots.txt");
const sitemap = await readOutput("sitemap.xml");
const socialImage = await readFile(
  path.join(outDirectory, "social", "xg-social-preview.png"),
);
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

function parseAttributes(tag) {
  return new Map(
    [...tag.matchAll(/([:\w-]+)="([^"]*)"/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );
}

function findTag(html, tagName, attribute, value) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "g"))]
    .map((match) => ({ tag: match[0], attributes: parseAttributes(match[0]) }))
    .find((entry) => entry.attributes.get(attribute) === value);
}

function requireMeta(html, attribute, value, expectedContent, route) {
  const meta = findTag(html, "meta", attribute, value);
  if (!meta) {
    throw new Error(`${route} is missing ${attribute}="${value}" metadata.`);
  }
  const content = meta.attributes.get("content");
  if (expectedContent !== undefined && content !== expectedContent) {
    throw new Error(
      `${route} has incorrect ${value} metadata. Expected "${expectedContent}", found "${content}".`,
    );
  }
  return content;
}

function requireCanonical(html, expectedUrl, route) {
  const canonical = findTag(html, "link", "rel", "canonical");
  if (canonical?.attributes.get("href") !== expectedUrl) {
    throw new Error(
      `${route} canonical mismatch. Expected "${expectedUrl}", found "${canonical?.attributes.get("href")}".`,
    );
  }
}

const publicDescriptions = new Set();
for (const route of routeDefinitions) {
  const html = routeOutputs.get(route.pathname);
  const expectedCanonical = `${siteUrl}${route.pathname}`;
  const expectedRobots =
    context === "preview"
      ? "noindex, nofollow"
      : route.indexable
        ? "index, follow"
        : "noindex, follow";

  requireCanonical(html, expectedCanonical, route.pathname);
  const description = requireMeta(
    html,
    "name",
    "description",
    undefined,
    route.pathname,
  );
  if (!description?.trim()) {
    throw new Error(`${route.pathname} has an empty description.`);
  }
  requireMeta(html, "name", "robots", expectedRobots, route.pathname);
  requireMeta(html, "property", "og:title", undefined, route.pathname);
  requireMeta(html, "property", "og:description", description, route.pathname);
  requireMeta(html, "property", "og:url", expectedCanonical, route.pathname);
  requireMeta(html, "property", "og:site_name", "XG", route.pathname);
  requireMeta(html, "property", "og:type", "website", route.pathname);
  requireMeta(html, "property", "og:image", socialImageUrl, route.pathname);
  requireMeta(html, "property", "og:image:width", "1200", route.pathname);
  requireMeta(html, "property", "og:image:height", "630", route.pathname);
  requireMeta(html, "property", "og:image:alt", undefined, route.pathname);
  requireMeta(
    html,
    "name",
    "twitter:card",
    "summary_large_image",
    route.pathname,
  );

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title?.trim()) {
    throw new Error(`${route.pathname} has no document title.`);
  }
  if (route.indexable) publicDescriptions.add(description);
}

if (publicDescriptions.size !== 6) {
  throw new Error(
    "Approved public routes must have six distinct descriptions.",
  );
}

const pngSignature = "89504e470d0a1a0a";
if (socialImage.subarray(0, 8).toString("hex") !== pngSignature) {
  throw new Error("Social preview is not a valid PNG file.");
}
if (
  socialImage.readUInt32BE(16) !== 1200 ||
  socialImage.readUInt32BE(20) !== 630
) {
  throw new Error("Social preview dimensions must be exactly 1200 x 630.");
}

if (
  manifest.product !== "RF Dashboard Light" ||
  manifest.version !== "0.1.1" ||
  manifest.indexing !== "noindex, follow" ||
  manifest.runtimeExternalDependencies !== 0
) {
  throw new Error("RF Dashboard release manifest identity changed.");
}

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

const allPortfolioOutput = [...routeOutputs.values()].join("\n");
const forbiddenPortfolioRuntimePatterns = [
  /<script[^>]+src=["']https?:\/\//i,
  /<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\//i,
  /google-analytics|googletagmanager|plausible|segment\.com|mixpanel|posthog|hotjar/i,
  /mailto:/i,
];

for (const pattern of forbiddenPortfolioRuntimePatterns) {
  if (pattern.test(allPortfolioOutput)) {
    throw new Error(
      `Forbidden Portfolio runtime or destination found: ${pattern}`,
    );
  }
}

const contactMethods = contact.match(
  /<dl class="contact-methods">([\s\S]*?)<\/dl>/,
)?.[1];
if (!contactMethods || /<a\b|<button\b/i.test(contactMethods)) {
  throw new Error("Contact placeholders must exist and remain noninteractive.");
}
for (const label of ["Email", "LinkedIn", "GitHub"]) {
  if (!contactMethods.includes(`<dt>${label}</dt>`)) {
    throw new Error(`Contact placeholder is missing: ${label}.`);
  }
}

const approvedSitemapUrls = routeDefinitions
  .filter((route) => route.indexable)
  .map((route) => `${siteUrl}${route.pathname}`);
if (context === "preview") {
  if (/<url>/.test(sitemap)) {
    throw new Error("Preview sitemap must not contain public routes.");
  }
} else {
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  if (
    sitemapUrls.length !== approvedSitemapUrls.length ||
    approvedSitemapUrls.some((url) => !sitemapUrls.includes(url))
  ) {
    throw new Error(
      "Production sitemap does not match approved public routes.",
    );
  }
}
for (const excludedPath of [
  "/technical-notes/",
  "/resume/",
  "/tools/rf-dashboard-light/",
]) {
  if (sitemap.includes(excludedPath)) {
    throw new Error(`Excluded path found in sitemap: ${excludedPath}`);
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

if (!cpgProject.includes("In active development")) {
  throw new Error("CPG active-development status is missing.");
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
