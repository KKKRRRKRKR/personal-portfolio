# Personal Engineering Portfolio

This repository contains the deployed XG engineering portfolio and its public-safe project records. The production site is available at `https://kkkrrrkrkr.github.io/personal-portfolio/`.

## Featured projects

### Global RF Spectrum Dashboard

RF Dashboard Light 0.1.1 is a deployed, desktop-first static reference for exploring a reviewed public subset of spectrum and power information. The case study explains its public-data boundary and accepted limitations; the tool is available at `https://kkkrrrkrkr.github.io/personal-portfolio/tools/rf-dashboard-light/`.

### Compliance Plan Generator

A rule-driven planning-system project in active development. The public case study describes the intended workflow without exposing proprietary rules, datasets, or internal processes. No public tool or demonstration is available.

## Technology

The Portfolio is a TypeScript and Next.js static export. RF Dashboard Light is a separately implemented, self-contained HTML artifact copied into the release only after hash validation. GitHub Actions runs formatting, type, lint, build, packaging, and deployment validation before GitHub Pages publication from `main`.

## Development status

Phase 4 public launch is complete. The Portfolio and RF Dashboard Light are deployed; the Compliance Plan Generator remains in active development. Technical Notes and Resume remain reserved, noindex routes outside the primary navigation.

## Repository layout

- `website/` - Next.js Portfolio application, public assets, and static packaging scripts.
- `deploy/` - versioned standalone public artifacts and release manifests.
- `projects/` - public-safe documentation for featured projects.
- `assets/` - images, icons, and screenshots intended for public use.
- `docs/` - architecture, roadmap, runbooks, release records, and validation evidence.
- `scripts/` - release generation and browser smoke tooling.

## Links

- Portfolio: `https://kkkrrrkrkr.github.io/personal-portfolio/`
- RF Dashboard Light: `https://kkkrrrkrkr.github.io/personal-portfolio/tools/rf-dashboard-light/`
