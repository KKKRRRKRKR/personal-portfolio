# Phase 7A — Public Contact and Professional Identity Activation

**Status:** Implementation and local validation completed on 2026-07-20. Ready for review on the Phase branch; not yet merged or deployed.

**Baseline:** `6b4d8fe168b9e1e953b0add4e944a8d0d6cf3fe5`

## Purpose

Phase 7A replaces the intentionally noninteractive Contact state with the two owner-approved public destinations while preserving the existing static GitHub Actions Pages architecture and restrained Engineering Evidence Editorial visual system.

## Approved public identity

- Email display: `guxin1943@gmail.com`
- Email destination: `mailto:guxin1943@gmail.com`
- GitHub display: `github.com/KKKRRRKRKR`
- GitHub destination: `https://github.com/KKKRRRKRKR`
- Canonical production URL: `https://gu-xin.com/`

LinkedIn is intentionally deferred and does not render as content, metadata, or structured identity data. No alternate social profile is inferred.

The root layout contains one Schema.org `Person` record. It includes the public name `XG`, the deployment-specific canonical site URL, the approved Email, and a `sameAs` array containing only the approved GitHub profile. It contains no telephone number, address, employer-internal detail, organization claim, or unapproved credential.

## Interaction and privacy boundaries

- Email and GitHub are native anchor elements and work without JavaScript.
- Both links remain keyboard focusable, retain the shared visible focus outline, and provide at least a 44-pixel mobile target height.
- GitHub follows the existing new-tab policy with `noopener noreferrer`.
- GitHub is a user-activated navigation destination and creates no page-load request.
- No contact form, backend, CAPTCHA, analytics, tracking, remote font, CDN asset, or third-party script is added.

## Validation

The following checks passed on Windows with Node.js 24:

```text
npm run format:check
npm run typecheck
npm run lint
npm run build:validate:custom-domain
npm run build:validate:github-pages
npm run build:validate:custom-domain-preview
npm run build:validate:preview
node scripts/browser-smoke.mjs --profile=custom-domain
node scripts/browser-smoke.mjs --profile=github-pages
npm audit --audit-level=high
Get-FileHash -Algorithm SHA256 deploy/rf-dashboard-light/index.html
git diff --check
```

The deployment validator confirms exact Contact link counts and destinations, absence of LinkedIn and placeholder-only behavior, one accurate Person schema per page, canonical and Open Graph metadata, indexability, sitemap and robots boundaries, reserved-route noindex behavior, privacy restrictions, and RF Dashboard packaging.

Both browser profiles covered all Portfolio routes at five viewports, the Dashboard at three widths plus 200% zoom, Contact keyboard focus and mobile target size, navigation, Dashboard detail interaction, and CSV export. Both reported zero console errors, runtime exceptions, failed requests, and unexpected external requests.

`npm audit --audit-level=high` reported zero vulnerabilities.

## RF Dashboard integrity

RF Dashboard Light remains version `0.1.1`. Its repository and packaged SHA-256 remains:

`D3165ECBA5AD073252F8AAFDA2CE33D512236CCE809C3F4BA24BB6E3806D7561`

No Dashboard source, artifact, manifest, data, interaction, or export field changes in Phase 7A.

## Rollback

Revert the reviewed Phase 7A merge through a new pull request, rebuild the selected `custom-domain` production profile, and allow the guarded `main` workflow to redeploy. Verify Contact, Person structured data, metadata, sitemap, robots, privacy boundaries, and RF Dashboard hash against the selected rollback commit. Do not force-push or add a replacement form, backend, social profile, tracking service, or script-based email implementation as a shortcut.
