import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const sourceHash =
  "47B1502AFC2D8758F78D25804E405768B845FE683CF485036D0BC86EF8B6A76C";
const releaseDate = "2026-07-15";
const releaseVersion = "0.1.1";
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(
  repositoryRoot,
  "deploy",
  "rf-dashboard-light",
);
const outputPath = path.join(outputDirectory, "index.html");
const manifestPath = path.join(outputDirectory, "release-manifest.json");
const inputArgument = process.argv[2];

if (!inputArgument) {
  throw new Error(
    "Usage: node scripts/build-rf-dashboard-release.mjs <approved-0.1.0-candidate-path>",
  );
}

const inputPath = path.resolve(inputArgument);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex").toUpperCase();
}

function replaceExact(source, search, replacement, expectedCount) {
  const count = source.split(search).length - 1;
  if (count !== expectedCount) {
    throw new Error(
      `Expected ${expectedCount} occurrences of ${JSON.stringify(search)}, found ${count}.`,
    );
  }

  return source.split(search).join(replacement);
}

const source = await readFile(inputPath);
const actualSourceHash = sha256(source);

if (actualSourceHash !== sourceHash) {
  throw new Error(
    `Refusing to build from an unapproved candidate. Expected ${sourceHash}, found ${actualSourceHash}.`,
  );
}

let release = source.toString("utf8");
release = replaceExact(
  release,
  '  <meta name="viewport" content="width=device-width, initial-scale=1">',
  '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '  <meta name="robots" content="noindex, follow">\n' +
    '  <meta name="referrer" content="strict-origin-when-cross-origin">',
  1,
);
release = replaceExact(release, "0.1.0", releaseVersion, 6);
release = replaceExact(release, "Local release candidate", "Public release", 4);
release = replaceExact(release, "Not released", releaseDate, 5);
release = replaceExact(
  release,
  "</style>",
  `
    :where(button, select, a, [tabindex]):focus-visible {
      outline: 2px solid #7cff63;
      outline-offset: 3px;
    }
  </style>`,
  1,
);
release = replaceExact(
  release,
  `      matrixPageElements.body.addEventListener("click", event => {
        const row = event.target.closest(".matrix-row[data-matrix-code]");
        if (!row) return;
        const code = row.dataset.matrixCode;
        if (matrixPageState.expandedCodes.has(code)) matrixPageState.expandedCodes.delete(code);
        else matrixPageState.expandedCodes.add(code);
        renderMatrixPage();
      });`,
  `      matrixPageElements.body.addEventListener("click", event => {
        const row = event.target.closest(".matrix-row[data-matrix-code]");
        if (!row) return;
        const code = row.dataset.matrixCode;
        if (matrixPageState.expandedCodes.has(code)) matrixPageState.expandedCodes.delete(code);
        else matrixPageState.expandedCodes.add(code);
        renderMatrixPage();
        requestAnimationFrame(() => {
          const replacementRow = [...matrixPageElements.body.querySelectorAll(".matrix-row[data-matrix-code]")]
            .find(item => item.dataset.matrixCode === code);
          replacementRow?.focus({ preventScroll: true });
        });
      });`,
  1,
);

const releaseBuffer = Buffer.from(release, "utf8");
const releaseHash = sha256(releaseBuffer);
const manifest = {
  product: "RF Dashboard Light",
  version: releaseVersion,
  releaseDate,
  sourceArtifact: "RF Dashboard Light 0.1.0.html",
  sourceSha256: sourceHash,
  productionArtifact: "index.html",
  productionSha256: releaseHash,
  indexing: "noindex, follow",
  runtimeExternalDependencies: 0,
  transformation:
    "Release metadata patch plus visible focus indicators and country-row focus retention; public data, filtering, layout, and export behavior are unchanged.",
};

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, releaseBuffer);
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

process.stdout.write(
  `Built RF Dashboard Light ${releaseVersion}\nSHA-256: ${releaseHash}\n${outputPath}\n`,
);
