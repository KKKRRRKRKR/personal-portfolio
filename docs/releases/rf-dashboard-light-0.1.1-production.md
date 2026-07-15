# RF Dashboard Light 0.1.1 Production Release

## Release identity

- Product: RF Dashboard Light
- Public version: `0.1.1`
- Release date: `2026-07-15`
- Production URL: `https://kkkrrrkrkr.github.io/personal-portfolio/tools/rf-dashboard-light/`
- Source branch: `main`
- Production commit: pending promotion
- GitHub Pages deployment ID: pending promotion
- Production deployment timestamp: pending promotion

## Provenance and hashes

- Immutable original source SHA-256: `F1B50D807FCF500F3C55C7EA3DC1583F2D7F2665C40A8E46DEA2786221C5B94F`
- Approved 0.1.0 candidate SHA-256: `47B1502AFC2D8758F78D25804E405768B845FE683CF485036D0BC86EF8B6A76C`
- 0.1.1 deployment artifact SHA-256: `D3165ECBA5AD073252F8AAFDA2CE33D512236CCE809C3F4BA24BB6E3806D7561`
- 0.1.1 release transform SHA-256: `1E015F50E3DD5C2E58361AD8AD89C5E55B19375ACE1E26A995E6DBF48631B612`
- Artifact size: `2,345,363` bytes

The immutable original and approved 0.1.0 candidate remain unchanged. The 0.1.1 transform adds truthful release/indexing metadata, visible focus indicators, and keyboard focus retention after a country-row expansion. It does not modify the reviewed 175-record public dataset, filtering model, matrix layout, or seven-field export schema.

## Public scope

- Home and Spectrum Detail
- Region, Country / Area, and RF Band filters
- Map and country selection
- Country-row expansion and Band Scope
- Visible disclosure, tool version, release date, dataset version/date state
- Filtered CSV export with Region, Country / Area, Frequency Band, Frequency Range, Max Power, Public Data Note, and Dataset Version

Import, Admin, Portal, employer branding, internal data, runtime credentials, analytics, and third-party runtime dependencies are absent.

## Indexing and security boundary

- Dashboard metadata: `noindex, follow`
- Referrer metadata: `strict-origin-when-cross-origin`
- GitHub Pages provider cache: ten-minute maximum age observed in preview
- Inline CSS and JavaScript remain required; no CSP is claimed
- GitHub Pages does not provide custom per-path response security headers for this repository

## Pre-promotion validation

- Static sensitive-string, runtime-dependency, schema, version, robots, and artifact-hash validation: passed
- Real preview HTTPS load and every primary interaction: passed
- 1440 x 900, 1280 x 800, 1024 x 768, and 200% zoom checks: passed
- Native focus path, visible focus, and keyboard country-row expansion with focus retention: passed
- CSV export: passed
- Console errors, runtime exceptions, failed requests, external requests: all `0`

## Accepted limitations

- Desktop-first presentation
- Intentional horizontal scrolling in Spectrum Detail
- Dense 1500/1600 axis labels and compact Band Scope controls
- Moderate whitespace and weak hierarchy in some expanded groups
- Oversized flag/incomplete row layout visible in the recorded Spectrum Detail evidence
- Public dataset remains simplified, incomplete, and unverified for current regulatory use

## Rollback

Restore the recorded artifact and matching manifest from the last validated commit, run production deployment validation, and redeploy through the Pages workflow. The immutable original source is not required for rollback.
