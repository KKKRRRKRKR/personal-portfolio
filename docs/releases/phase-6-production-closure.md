# Phase 6 Production Closure

## Outcome

**Status:** Custom-domain production cutover and Phase 6C validation completed on 2026-07-19.

The Portfolio and RF Dashboard Light 0.1.1 are now served through GitHub Actions Pages at the canonical production domain:

- Portfolio: `https://gu-xin.com/`
- RF Dashboard Light: `https://gu-xin.com/tools/rf-dashboard-light/`
- Phase 6B pull request: [`#7`](https://github.com/KKKRRRKRKR/personal-portfolio/pull/7)
- Phase 6B merge commit: `c22ff05e13b771da42f73b8e711840671aa404bc`
- Phase 6C closure commit: `PENDING` until this release record is committed
- Production workflow: [`29690637603`](https://github.com/KKKRRRKRKR/personal-portfolio/actions/runs/29690637603)
- Pages deployment: `5511440038`, successful at `2026-07-19T14:21:34Z`

Phase 6C found no production defect. Application source, content, design, metadata implementation, dependencies, lockfile, and RF Dashboard bytes are unchanged by the closure work.

## Production state

- GitHub Pages custom domain: `gu-xin.com`
- **Enforce HTTPS:** enabled
- HTTP apex: redirects once to the HTTPS apex
- HTTPS `www`: redirects once to the HTTPS apex
- Canonical and Open Graph host: `gu-xin.com`
- Production base path: empty
- Publishing source: GitHub Actions
- Repository `CNAME` file: not used
- Cloudflare records: DNS-only GitHub Pages apex targets and `www` CNAME

The old `https://kkkrrrkrkr.github.io/personal-portfolio/` project URL is no longer canonical and redirects to the custom domain. It is retained only as a legacy and rollback reference.

## Validation result

All availability, redirect, route, metadata, sitemap, robots, privacy, external-request, Dashboard-integrity, browser, production-build, preview-build, custom-domain, GitHub Pages packaging, and rollback-readiness checks passed. Detailed commands and evidence are recorded in [Phase 6C Production Validation and Release Closure](../validation/phase-6c-production-validation.md).

The live and repository RF Dashboard artifacts both remain SHA-256 `D3165ECBA5AD073252F8AAFDA2CE33D512236CCE809C3F4BA24BB6E3806D7561`.

## Preserved public boundaries

- Contact remains three noninteractive placeholders with no published destination.
- Compliance Plan Generator remains in active development with no public tool action.
- Technical Notes and Resume remain unlisted, `noindex, follow`, and absent from the sitemap.
- RF Dashboard remains isolated, self-contained, `noindex, follow`, and free of runtime external dependencies.
- Analytics, telemetry, cookies, backend, API, CMS, and accounts remain absent.

## Rollback posture

The non-deploying `github-pages` production profile passed its build, packaging, metadata, privacy, sitemap, Dashboard-hash, and browser checks after the cutover. A content-only failure can be handled by reverting the affected release through a reviewed pull request and redeploying the appropriate custom-domain artifact.

For a full domain rollback, remove the Pages custom-domain binding when required, remove the four cutover apex `A` records and cutover `www` CNAME, retain the GitHub ownership-verification TXT record, restore the deployable workflow to the validated `github-pages` profile, and verify the legacy project Pages URL. Force pushes and destructive history rewrites remain excluded.

## Non-blocking warnings

- Two moderate PostCSS findings remain in the locked Next.js dependency graph; the available forced fix is breaking and is deferred to a separate maintenance review.
- RF Dashboard Light retains its approved desktop-first and dense Spectrum Detail presentation limitations.

## Release disposition

Phase 6 production is validated and reversible. The canonical release is `https://gu-xin.com/`; future work must not reintroduce the legacy base path into custom-domain output or weaken the existing production and rollback gates.
