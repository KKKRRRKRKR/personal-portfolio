import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

import { applyDeploymentProfile } from "../config/deployment-profiles.mjs";

const [action] = process.argv
  .slice(2)
  .filter((argument) => !argument.startsWith("--"));
const option = (name) =>
  process.argv
    .find((argument) => argument.startsWith(`--${name}=`))
    ?.slice(name.length + 3);

const profileName = option("profile");
const context = option("context");
const profile = applyDeploymentProfile(profileName, context);
const websiteRoot = process.cwd();

async function runNode(relativePath, arguments_ = []) {
  const script = path.join(websiteRoot, relativePath);
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...arguments_], {
      cwd: websiteRoot,
      env: process.env,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) resolve();
      else {
        reject(
          new Error(
            `${relativePath} failed${signal ? ` with signal ${signal}` : ` with exit code ${code}`}.`,
          ),
        );
      }
    });
  });
}

async function build() {
  await runNode("node_modules/next/dist/bin/next", ["build"]);
  await runNode("scripts/package-static-site.mjs");
}

async function dev() {
  await runNode("node_modules/next/dist/bin/next", ["dev"]);
}

async function validate() {
  await runNode("scripts/validate-deployment.mjs", [
    `--profile=${profile.name}`,
    `--context=${profile.context}`,
  ]);
}

switch (action) {
  case "dev":
    await dev();
    break;
  case "build":
    await build();
    break;
  case "validate":
    await validate();
    break;
  case "build-and-validate":
    await build();
    await validate();
    break;
  default:
    throw new Error(
      `Unsupported deployment action: ${action ?? "(missing)"}. ` +
        "Expected dev, build, validate, or build-and-validate.",
    );
}
