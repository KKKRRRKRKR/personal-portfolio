# XG Portfolio Phase 4 Production Release

## Release state

- Release: Phase 4 public launch
- Provider: GitHub Pages
- Production URL: `https://kkkrrrkrkr.github.io/personal-portfolio/`
- Source branch: `main`
- Production commit: pending promotion
- Pull request: `#1`
- GitHub Pages deployment ID: pending promotion
- Production deployment timestamp: pending promotion

This record is prepared before promotion. Pending deployment fields must be completed from the successful `main` workflow and actual public smoke test.

## Released scope

- Home, About, Projects, and Contact in the main navigation
- Global RF Spectrum Dashboard case study with authentic sanitized evidence
- Compliance Plan Generator case study marked `In active development`
- RF Dashboard Light typed public destination
- Technical Notes and Resume retained as reserved, noindex routes outside the main navigation
- Shared XG identity, navigation, footer, responsive behavior, and visible focus system

## Deployment behavior

- Static Next.js export under GitHub Pages base path `/personal-portfolio`
- Trailing-slash directory routes support direct entry and refresh
- Production Portfolio metadata: `index, follow`
- Production `robots.txt`: allow crawling and advertise the sitemap
- RF Dashboard remains separately implemented at `/tools/rf-dashboard-light/`
- No analytics, telemetry, backend, CMS, account, private contact destination, or CPG live tool

## Pre-promotion validation

- Locked install, formatting, typecheck, lint, production export, packaging, and deployment validator: passed
- Preview and production context builds: passed
- Browser sweep at 1440, 1280, 1024, 768, and 390 CSS pixels: passed
- Mobile menu, keyboard focus, evidence images, direct routes, and not-found document: passed
- Preview public smoke: passed with zero console errors, runtime exceptions, failed requests, or external runtime requests
- CPG has no external destination and no completed-product claim

## Rollback

Rebuild and redeploy the last validated Git commit through the Pages workflow. If only the tool destination is affected, revert the typed RF live-tool state or URL through a reviewable commit. See [Rollback](../runbooks/rollback.md).
