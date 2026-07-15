# Production Deployment Runbook

## Purpose

Promote the validated Phase release to the GitHub Pages production target from `main`.

## Preconditions

- Phase pull request is ready, has no required failing checks, and contains no secret, unsanitized source, local test export, or temporary artifact.
- Preview or early release-candidate checks have passed on the provider URL.
- `deploy/rf-dashboard-light/release-manifest.json` matches the versioned artifact.

## Production-equivalent build

From `website/` in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/personal-portfolio'
$env:NEXT_PUBLIC_SITE_URL='https://kkkrrrkrkr.github.io/personal-portfolio'
$env:NEXT_PUBLIC_DEPLOYMENT_CONTEXT='production'
npm ci
npm run format:check
npm run typecheck
npm run lint
npm run build:deploy
npm run validate:deploy -- --context=production
```

## Promote

1. Mark the Phase pull request ready.
2. Verify required checks and inspect the complete diff.
3. Merge without force-pushing or squashing away the Phase history.
4. Wait for `Validate and deploy GitHub Pages` on `main`.
5. Record the deployed commit, workflow run, deployment identity, and timestamp.

## Production smoke test

Verify the actual HTTPS URLs:

- Portfolio routes, navigation, mobile menu, metadata, sitemap, robots, direct refresh, not-found behavior, and images.
- RF detail action label `Open RF Dashboard`, absolute production URL, new-tab semantics, and nearby desktop-first limitation.
- Dashboard Home, Spectrum Detail, Region, Country / Area, RF Band, map, expansion, Band Scope, disclosure, version, and CSV export.
- Portfolio is `index, follow`; Dashboard remains `noindex, follow`.
- CPG remains `In active development` and has no external action.
- No mixed content, local path, private contact, analytics, sensitive string, critical console error, or critical 404 exists.

Complete the Portfolio production release, Dashboard production release, validation record, roadmap, and closure record only after these public checks pass.
