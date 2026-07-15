# RF Dashboard Light 0.1.1 Preview

## Deployment identity

- State: validated public preview / early release-candidate target
- Provider: GitHub Pages
- Portfolio preview URL: `https://kkkrrrkrkr.github.io/personal-portfolio/`
- Dashboard preview URL: `https://kkkrrrkrkr.github.io/personal-portfolio/tools/rf-dashboard-light/`
- Git commit: `b047b5faa8c8328245c0fb204ae4f80943ce30fb`
- Pull request: `#1` (Draft during preview validation)
- Workflow run: `29432003471` (`Validate and deploy GitHub Pages`, run 4)
- GitHub deployment ID: `5460425901`
- Deployment created: `2026-07-15T16:21:26Z`
- Deployment succeeded: `2026-07-15T16:21:42Z`
- Public smoke test completed: `2026-07-15T16:24:08Z`

GitHub Pages supplies one provider URL for this repository. The Phase branch deployed first with preview context; production will replace the served artifact from `main` at the same URL.

## Artifact identity

- Public version: `0.1.1`
- Approved 0.1.0 candidate SHA-256: `47B1502AFC2D8758F78D25804E405768B845FE683CF485036D0BC86EF8B6A76C`
- Deployed 0.1.1 artifact SHA-256: `D3165ECBA5AD073252F8AAFDA2CE33D512236CCE809C3F4BA24BB6E3806D7561`
- Artifact size: `2,345,363` bytes
- Runtime external dependencies: `0`

The 0.1.1 release patch adds `noindex, follow`, referrer metadata, public release/version/date wording, visible focus indicators, and focus retention after keyboard country-row expansion. The public dataset, filtering, layout, and seven-field export schema are unchanged from the approved 0.1.0 candidate.

## Preview indexing and headers

- Portfolio metadata: `noindex, nofollow`
- Portfolio `robots.txt`: `Disallow: /`
- Dashboard metadata: `noindex, follow`
- Portfolio and Dashboard referrer metadata: `strict-origin-when-cross-origin`
- Dashboard response `Content-Type`: `text/html; charset=utf-8`
- Dashboard response `Cache-Control`: `max-age=600`
- Dashboard response `ETag`: `"6a57b38f-23c993"`
- Dashboard response `Last-Modified`: `Wed, 15 Jul 2026 16:21:35 GMT`

GitHub Pages did not emit custom `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, or `Permissions-Policy` response headers. This provider limitation is recorded in the deployment architecture and is not represented as implemented security coverage.

## Public smoke results

Portfolio:

- Home, About, Projects, Contact, RF detail, CPG detail, Technical Notes, and Resume: HTTP 200
- Preview RF action: real HTTPS URL, `Open Dashboard preview`, new tab, `noopener noreferrer`
- Responsive browser sweep: 1440, 1280, 1024, 768, and 390 CSS pixels passed without page-level overflow
- Mobile navigation, evidence images, direct route entry, and not-found document: passed
- CPG status: `In active development`; no external CPG action
- Private Contact links: none

Dashboard:

- Root, Home, Spectrum Detail, Region, Country / Area, RF Band, map, Band Scope, and row expansion: passed
- Disclosure and version 0.1.1 visible on both primary views
- 1024 x 768 and 200% zoom retained critical controls
- Country-row keyboard expansion retained visible focus after the 0.1.1 patch
- Filtered CSV downloaded with the exact seven public headers
- Import/Admin/Portal/employer surface: absent
- Browser console errors: `0`
- Runtime exceptions: `0`
- Failed requests: `0`
- External runtime requests: `0`

## Preview deployment issue and resolution

The first two deployment attempts built, validated, and uploaded the artifact successfully but the `deploy` job was rejected before starting because the automatically created `github-pages` environment allowed only `main`. The sanitized external condition was: GitHub environment branch policy did not allow `phase-4-rf-dashboard-public-launch`.

The Phase branch was added as a custom `github-pages` deployment branch policy, alongside `main`, and workflow run `29432003471` then succeeded. This was a repository-environment configuration issue, not an application or artifact failure.

## Preview gate

Phase 4-6 preview gate: passed. The real Portfolio preview opens the real Dashboard preview over HTTPS; indexing, artifact identity, public-safety boundaries, CSV export, console/network behavior, and rollback documentation have been validated.
