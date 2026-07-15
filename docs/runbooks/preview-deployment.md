# Preview Deployment Runbook

## Purpose

Reproduce the noindex preview context locally or in pull-request validation. The temporary Phase-branch Pages deployment used for the Phase 4 release has been retired so a feature-branch push cannot overwrite production.

## Preconditions

- Pull request targets `main`, or a local branch is checked out for equivalent validation.
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

## Validate through a pull request

Open or update a pull request targeting `main`. `.github/workflows/deploy-pages.yml` builds and validates the preview context but does not upload or deploy it. GitHub Pages is the production target only; use the local static output for visual preview unless a future architecture explicitly provisions an isolated preview host.

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

For the historical Phase 4 early release candidate, record the workflow run/deployment identity, timestamp, response headers, URL, hash, and results in the preview release record. For later pull requests, record the validation workflow identity and local preview results without calling them a public deployment.
