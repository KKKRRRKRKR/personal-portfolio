# XG Portfolio Phase 4 Production Release

## Release state

- Release: Phase 4 public launch
- Provider: GitHub Pages
- Production URL: `https://kkkrrrkrkr.github.io/personal-portfolio/`
- Source branch: `main`
- Production commit: `66792c2ba912e646949fdf06b7568820ca3d7d3e`
- Pull request: `#1`
- GitHub Actions workflow run: `29432967004`
- GitHub Pages deployment ID: `5460619439`
- Deployment created: `2026-07-15T16:35:09Z`
- Deployment succeeded: `2026-07-15T16:35:24Z`
- Public browser smoke completed: `2026-07-15T16:37:06Z`

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

## Production validation

- Locked install, formatting, typecheck, lint, production export, packaging, and deployment validator: passed
- Preview and production context builds: passed
- Browser sweep at 1440, 1280, 1024, 768, and 390 CSS pixels: passed
- Mobile menu, keyboard focus, evidence images, direct routes, and not-found document: passed
- Production public smoke: passed with zero console errors, runtime exceptions, failed requests, or external runtime requests
- CPG has no external destination and no completed-product claim
- Production Portfolio metadata is `index, follow`; `robots.txt` allows crawling and advertises the production sitemap
- All required public routes returned HTTP 200 and the RF action opened the deployed Dashboard

## Rollback

Rebuild and redeploy the last validated Git commit through the Pages workflow. If only the tool destination is affected, revert the typed RF live-tool state or URL through a reviewable commit. See [Rollback](../runbooks/rollback.md).
