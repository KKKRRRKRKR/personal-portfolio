# Phase 5 Professional Readiness Core

## Release state

**Status:** Local release candidate validated. GitHub pull request, merge, Pages deployment, and production smoke identities are pending reviewed promotion.

This is intentionally named **Phase 5 Professional Readiness Core**. No approved public Contact destination or custom domain was supplied, so formal Contact readiness and custom-domain migration are not claimed.

## Production baseline

- Baseline commit: `e3745421eb04556f8270dfaf116a8b2aa8a4b8b6`
- Portfolio: `https://kkkrrrkrkr.github.io/personal-portfolio/`
- RF Dashboard: `https://kkkrrrkrkr.github.io/personal-portfolio/tools/rf-dashboard-light/`

## Release contents

- Shared typed metadata generation for accurate route titles, descriptions, canonicals, Open Graph fields, social-card fields, and indexing behavior.
- Page-specific metadata for Home, About, Projects, Contact, and both approved project records.
- Reserved-route metadata that keeps Technical Notes and Resume unpublished and noindex.
- Deterministic monochrome 1200 x 630 social preview with checked-in SVG source and PNG artifact.
- Lightweight static `XG` favicon and 180 x 180 Apple touch icon.
- Targeted Contact and reserved-route copy calibration without a visual redesign.
- Expanded deterministic metadata, sitemap, privacy, destination, asset, manifest, Dashboard-hash, and browser validation.
- Phase 5 roadmap, architecture, validation, release, limitation, deferral, and rollback documentation.

## Preserved boundaries

- Email, LinkedIn, and GitHub remain noninteractive placeholders.
- No private identity, mailto link, profile link, contact form, or backend is published.
- The current GitHub Pages URL and `/personal-portfolio` base path remain unchanged; no `CNAME` is created.
- Technical Notes and Resume remain absent from main/footer navigation and sitemap.
- CPG remains `In active development`, architecture-only, human-reviewed, and without a public destination.
- RF Dashboard Light remains 0.1.1, standalone, noindex, and byte-identical at SHA-256 `D3165ECBA5AD073252F8AAFDA2CE33D512236CCE809C3F4BA24BB6E3806D7561`.
- Analytics, telemetry, cookies, backend, API, CMS, and accounts remain absent.

## Local validation

All required local format, type, lint, production build, preview build, deployment validation, browser, accessibility-smoke, network, CSV, privacy, sitemap, metadata, link, and artifact-integrity gates pass. Detailed evidence is recorded in [Phase 5 Professional Readiness Validation](../validation/phase-5-professional-readiness.md).

## Release identity

- Implementation branch: `codex/phase-5-professional-readiness`
- Pull request: pending
- Reviewed merge commit: pending
- Pull-request workflow: pending
- Production workflow: pending
- GitHub Pages deployment: pending
- Production validation timestamp: pending
- Social preview SHA-256: `AD3BFD4A48E581E586D5A2CB648EC4B5BAAA2941080D3BF754F4C238F5D36512`
- RF Dashboard SHA-256: `D3165ECBA5AD073252F8AAFDA2CE33D512236CCE809C3F4BA24BB6E3806D7561`

These pending fields are release gates, not completed claims. They must be replaced with actual GitHub and production evidence after promotion.

## Accepted limitations and deferred work

- Formal public Contact channel
- Custom domain and DNS migration
- Resume publication
- Technical Notes publication
- RF Dashboard 0.2 and broader responsive redesign
- CPG maturity review and any separate public-demo gate
- Analytics, which remains intentionally absent

## Rollback

Revert the Phase 5 merge through a reviewed pull request, rebuild the previous validated `main`, verify preview and production metadata policies, restore or remove metadata assets as a coordinated set, confirm the frozen Dashboard hash, and allow the existing Pages workflow to redeploy. Force pushes and destructive history rewrites are excluded.
