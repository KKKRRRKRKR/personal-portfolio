import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const websiteRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const candidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const browserPath = candidates.find((candidate) => existsSync(candidate));

if (!browserPath) {
  throw new Error(
    "Chrome or Edge was not found. Set CHROME_PATH to regenerate brand assets.",
  );
}

const assets = [
  {
    source: path.join(websiteRoot, "assets", "brand", "xg-social-preview.svg"),
    output: path.join(websiteRoot, "public", "social", "xg-social-preview.png"),
    width: 1200,
    height: 630,
  },
  {
    source: path.join(websiteRoot, "public", "favicon.svg"),
    output: path.join(websiteRoot, "public", "icons", "apple-touch-icon.png"),
    width: 180,
    height: 180,
  },
];

for (const asset of assets) {
  await mkdir(path.dirname(asset.output), { recursive: true });
  const result = spawnSync(
    browserPath,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--window-size=${asset.width},${asset.height}`,
      `--screenshot=${asset.output}`,
      pathToFileURL(asset.source).href,
    ],
    { encoding: "utf8", windowsHide: true },
  );

  if (result.status !== 0 || !existsSync(asset.output)) {
    throw new Error(
      `Unable to generate ${path.relative(websiteRoot, asset.output)}: ${result.stderr || result.stdout}`,
    );
  }

  process.stdout.write(
    `Generated ${path.relative(websiteRoot, asset.output)} (${asset.width}x${asset.height}).\n`,
  );
}
