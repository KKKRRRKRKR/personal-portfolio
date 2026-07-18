const profiles = {
  "github-pages": {
    siteUrl: "https://kkkrrrkrkr.github.io/personal-portfolio",
    basePath: "/personal-portfolio",
  },
  "custom-domain": {
    siteUrl: "https://gu-xin.com",
    basePath: "",
  },
};

export const deploymentProfiles = Object.freeze(profiles);
export const deploymentContexts = Object.freeze(["production", "preview"]);

export function getDeploymentProfile(profileName) {
  const profile = deploymentProfiles[profileName];

  if (!profile) {
    throw new Error(
      `Unsupported deployment profile: ${profileName ?? "(missing)"}. ` +
        `Expected one of: ${Object.keys(deploymentProfiles).join(", ")}.`,
    );
  }

  return { name: profileName, ...profile };
}

export function applyDeploymentProfile(
  profileName,
  context,
  environment = process.env,
) {
  const profile = getDeploymentProfile(profileName);

  if (!deploymentContexts.includes(context)) {
    throw new Error(
      `Unsupported deployment context: ${context ?? "(missing)"}. ` +
        `Expected one of: ${deploymentContexts.join(", ")}.`,
    );
  }

  const contract = {
    DEPLOYMENT_PROFILE: profile.name,
    NEXT_PUBLIC_SITE_URL: profile.siteUrl,
    NEXT_PUBLIC_BASE_PATH: profile.basePath,
    NEXT_PUBLIC_DEPLOYMENT_CONTEXT: context,
  };

  for (const [key, expectedValue] of Object.entries(contract)) {
    const configuredValue = environment[key];
    if (configuredValue !== undefined && configuredValue !== expectedValue) {
      throw new Error(
        `${key} conflicts with deployment profile ${profile.name}. ` +
          `Expected "${expectedValue}", found "${configuredValue}".`,
      );
    }
    environment[key] = expectedValue;
  }

  return { ...profile, context };
}
