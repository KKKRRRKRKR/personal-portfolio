# Preview Deployment Runbook

## Purpose

Deploy the Phase branch to the GitHub Pages provider URL as the noindex early release candidate.

## Preconditions

- Branch: `phase-4-rf-dashboard-public-launch`
- Approved source, candidate, transform, and deployment hashes match the release records.
- Worktree is clean after the intended commits.
- The GitHub Pages workflow is enabled for the repository.

## Local preview-equivalent build

From `website/` in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/personal-portfolio'
$env:NEXT_PUBLIC_SITE_URL='https://kkkrrrkrkr.github.io/personal-portfolio'
$env:NEXT_PUBLIC_DEPLOYMENT_CONTEXT='preview'
npm ci
npm run format:check
npm run typecheck
npm run lint
npm run build:deploy
npm run validate:deploy -- --context=preview
```

From the repository root, run the browser-equivalent checks:

```powershell
node scripts/browser-smoke.mjs
```

## Deploy

Push the Phase branch. `.github/workflows/deploy-pages.yml` builds the preview context and deploys the `website/out` Pages artifact.

```powershell
git push -u origin phase-4-rf-dashboard-public-launch
```

## Required public checks

Open the provider URL and confirm:

- Portfolio `robots.txt` disallows crawling and page metadata is `noindex, nofollow`.
- Home, About, Projects, Contact, RF detail, CPG detail, reserved routes, and an unknown route respond as documented.
- RF evidence images load under `/personal-portfolio/projects/`.
- The RF action says `Open Dashboard preview`, opens a new tab, and uses `noopener noreferrer`.
- The Dashboard root shows version 0.1.1, release date, disclosure, Home, Spectrum Detail, filters, map, Band Scope, and export.
- Dashboard metadata is `noindex, follow`.
- No Import, Admin, Portal, employer brand, private contact, or external runtime request appears.
- CSV export has the seven approved headers.

Record the workflow run/deployment identity, timestamp, response headers, URL, hash, and results in the preview release record. If the Pages environment rejects the Phase branch, do not relabel local validation as deployment; record the exact sanitized failure.
