# Production Deployment Runbook

## Purpose

Promote a validated release to the `https://gu-xin.com/` GitHub Actions Pages production target from `main`.

## Preconditions

- Phase pull request is ready, has no required failing checks, and contains no secret, unsanitized source, local test export, or temporary artifact.
- Preview or early release-candidate checks have passed on the provider URL.
- `deploy/rf-dashboard-light/release-manifest.json` matches the versioned artifact.
- GitHub Pages remains bound to `gu-xin.com`, **Enforce HTTPS** remains enabled, and the reviewed DNS-only records remain healthy.
- The `github-pages` rollback-readiness profile passes before production promotion.

## Production-equivalent build

From `website/` in PowerShell:

```text
npm ci
npm run format:check
npm run typecheck
npm run lint
npm run build:validate:custom-domain
```

The non-deploying project-path rollback gate is:

```text
npm run build:validate:github-pages
```

## Promote

1. Mark the Phase pull request ready.
2. Verify required checks and inspect the complete diff.
3. Merge without force-pushing or squashing away the Phase history.
4. Wait for `Validate and deploy GitHub Pages` on `main`.
5. Confirm the workflow uploads only the custom-domain artifact, while the `github-pages-rollback-readiness` output is never uploaded.
6. Record the deployed commit, workflow run, deployment identity, and timestamp.

## Production smoke test

Verify the actual HTTPS URLs at `https://gu-xin.com/` and `https://gu-xin.com/tools/rf-dashboard-light/`:

- Portfolio routes, navigation, mobile menu, metadata, sitemap, robots, direct refresh, not-found behavior, and images.
- RF detail action label `Open RF Dashboard`, absolute production URL, new-tab semantics, and nearby desktop-first limitation.
- Dashboard Home, Spectrum Detail, Region, Country / Area, RF Band, map, expansion, Band Scope, disclosure, version, and CSV export.
- Portfolio is `index, follow`; Dashboard remains `noindex, follow`.
- CPG remains `In active development` and has no external action.
- No mixed content, local path, private contact, analytics, sensitive string, critical console error, or critical 404 exists.
- HTTP apex and HTTPS `www` each redirect once to `https://gu-xin.com/` without a loop.
- No custom-domain metadata or asset path contains `kkkrrrkrkr.github.io` or `/personal-portfolio`.

Complete the Portfolio production release, Dashboard production release, validation record, roadmap, and closure record only after these public checks pass.
