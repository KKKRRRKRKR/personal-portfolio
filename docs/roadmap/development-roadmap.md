# Development Roadmap

## Purpose

This roadmap defines the long-term implementation path for the personal portfolio website. It guides incremental delivery while preserving the static-first, engineering-oriented architecture defined for the repository.

## Development Philosophy

Build in small, reviewable increments that produce durable value at every stage. Prioritize a reliable foundation, meaningful technical content, and evidence of engineering work before optional visual or interactive complexity.

Each phase should have a clear completion boundary, maintain a deployable website where applicable, and avoid coupling portfolio presentation to unstable project internals. New features are introduced only when they improve professional communication, project understanding, or maintainability.

## Current Implementation Rebaseline

The repository has completed the website foundation, the shared `Engineering Evidence Editorial` visual system, and the core pages in the approved current navigation scope: Home, About, Projects, and Contact. The RF Spectrum Dashboard and Compliance Plan Generator also have project-detail structures. Technical Notes and Resume remain reserved routes and future work rather than active navigation destinations.

The rebaselined [Phase 4 - RF Dashboard Public Launch Foundation](./phase-4-rf-dashboard-public-launch.md) is complete. It combined public-safe case-study preparation, a reusable project/tool architecture, RF Dashboard Light 0.1.1 production deployment, and release validation without repeating completed Core Pages work.

Production is available at `https://kkkrrrkrkr.github.io/personal-portfolio/`, with the standalone Dashboard at `https://kkkrrrkrkr.github.io/personal-portfolio/tools/rf-dashboard-light/`.

The Compliance Plan Generator remains in active development. It is not a Phase 4 public-deployment deliverable and must not be presented as complete.

The latest completed execution phase is [Phase 5 - Portfolio Professional Readiness](./phase-5-portfolio-professional-readiness.md). Phase 5 Professional Readiness Core completed in production on 2026-07-16 with route metadata, a social preview, browser identity, public-copy calibration, and stronger release validation, without changing the approved architecture or visual direction. The Phase 5-8 headings below are retained as the historical capability mapping that preceded the current execution rebaseline; their numbering no longer identifies the active release sequence.

Formal public Contact destinations, a custom domain, Technical Notes publication, Resume publication, RF Dashboard 0.2, and any Compliance Plan Generator public demonstration remain deferred unless separately approved.

## Phase Breakdown

### Phase 0 - Vision and Visual Direction

**Status:** Completed

Established the professional portfolio vision and the white-first, clean, minimal, premium engineering visual direction.

### Phase 1 - Repository Foundation

**Status:** Completed

Established the repository structure for `website/`, `projects/`, `docs/`, and `assets/`, along with the initial Git and project documentation baseline.

### Phase 2 - Architecture Design

**Status:** Completed

Define the long-term architecture, information architecture, visual design system, and delivery roadmap that guide implementation decisions.

**Completion criteria:** The architecture decision, sitemap, design system, and approved development roadmap are present, internally consistent, and committed as the reference set.

### Phase 3 - Website Foundation Implementation

**Status:** Completed locally in Phase 3 and subsequently deployed through the completed rebaselined Phase 4 release.

Create the static-first website foundation inside `website/`.

- Initialize Next.js inside `website/`.
- Configure TypeScript, Tailwind CSS, and the MDX foundation.
- Establish linting, formatting, and the base directory structure.
- Validate local development and production builds.
- Prepare the application for a later preview deployment.

**Completion criteria:** The website starts locally, passes linting, formatting, and type checks, and produces a validated production build. Preview and production deployment are not required for historical Phase 3 completion.

### Phase 4 - Core Pages and Design System

**Status:** Completed for the approved current navigation scope; Technical Notes and Resume remain reserved future work.

Implement the approved visual system and the core portfolio experience.

- Build shared navigation and footer.
- Implement Home, About, Projects, and Contact in the approved shared navigation.
- Keep Technical Notes and Resume as reserved routes for later work.
- Add responsive behavior and an accessibility foundation.
- Apply the approved visual design system consistently.

**Completion criteria:** Home, About, Projects, and Contact are reachable through shared navigation, responsive at supported sizes, aligned with the design system, and verified for baseline keyboard access, contrast, and semantic structure. Technical Notes and Resume are not required in navigation for this phase to be complete.

### Legacy Phase 5 - Project Case Studies

**Status:** Partially complete. Both project records are public; RF uses authentic reviewed evidence, while both narratives remain explicitly marked as case studies in preparation.

Integrate engineering projects through a consistent public case-study model.

- Define project metadata and MDX content model.
- Publish the Global RF Spectrum Dashboard case study.
- Publish the Compliance Plan Generator case study.
- Include approved screenshots, diagrams, validation evidence, and public-safe technical content.

**Completion criteria:** Both case studies follow the standard template, are accessible from the Projects index, contain reviewed technical evidence, and exclude sensitive or proprietary content.

### Legacy Phase 6 - Production Deployment

**Status:** Completed for the public MVP through GitHub Pages. A custom domain remains optional future work.

Release the core portfolio and case studies as the public MVP.

- Configure production deployment from the main branch.
- Connect the custom domain when available.
- Add production metadata and social previews.
- Complete responsive, accessibility, browser, performance, and link reviews.

**Completion criteria:** The main branch deploys successfully to the production domain, the core site and two case studies are publicly available, and the release review has no unresolved critical issues.

### Legacy Phase 7 - Interactive Engineering Tool Integration

**Status:** Completed for RF Dashboard Light 0.1.1. The Compliance Plan Generator remains outside the public-tool boundary.

Add selected interactive engineering experiences without weakening the static-first editorial site.

- Integrate the Global RF Spectrum Dashboard first.
- Evaluate iframe, standalone deployment, and native component integration against security, performance, accessibility, and maintenance criteria.
- Expose a Compliance Plan Generator public demonstration only after privacy and proprietary-content review.
- Keep tool implementation isolated from editorial website content.

**Completion criteria:** Any released integration has a documented integration decision, an accessible fallback or clear limitation, validated performance, and no unreviewed private or proprietary data exposure.

### Legacy Phase 8 - Content Expansion and Maintenance

Operate the portfolio as a maintained professional record rather than a one-time build.

- Publish technical notes and additional projects.
- Keep the resume current.
- Perform dependency maintenance and accessibility and performance reviews.
- Periodically review the relevance of all public content.

**Completion criteria:** A recurring maintenance cadence is operating, content is reviewed against current professional goals, and routine quality checks are recorded and resolved.

## MVP Definition

The rebaselined public MVP is a deployed, responsive, and accessible portfolio with Home, About, Projects, and Contact in the approved navigation; the `Engineering Evidence Editorial` visual system; a truthful Global RF Spectrum Dashboard case study; and an accessible RF Dashboard Light public tool or clearly documented public preview. It also includes a truthful Compliance Plan Generator project entry marked as in active development, responsive and accessible portfolio navigation, and public-safe contact paths only when approved.

The MVP does not require the Compliance Plan Generator to be deployed or complete, and it does not require Technical Notes or Resume to be active navigation items. Technical Notes, Resume, additional case studies, and CPG public tooling remain later expansion work.

## Project Migration Strategy

### Global RF Spectrum Dashboard

Maintain the project as a self-contained unit under `projects/rf-spectrum-dashboard/`. First document the project baseline, architecture, data sources, and validation approach locally. Then create a curated portfolio case study that explains the problem, engineering decisions, representative visuals, and results. Publish only assets and details appropriate for a professional audience; retain deeper implementation material in the project documentation or linked source repository.

### Compliance Plan Generator

Maintain the project as a self-contained unit under `projects/compliance-plan-generator/`. Capture the workflow, domain constraints, system architecture, implementation choices, and evaluation evidence in project-level documentation. Integrate it into the website through a case study focused on the engineering challenge, solution design, and practical outcomes, while keeping sensitive customer, regulatory, or proprietary details out of public content.

For both projects, migration is complete when the project directory remains independently understandable, the portfolio case study follows the standard template, shared visual assets are properly owned, and links between public presentation and technical source material are intentional.

## Deployment Milestone

Phase 4 released RF Dashboard Light and the Portfolio connection to it without deploying the Compliance Plan Generator. The selected GitHub Pages architecture uses one same-site production deployment: the Portfolio at `/personal-portfolio/` and the isolated standalone Dashboard at `/personal-portfolio/tools/rf-dashboard-light/`. The release is validated, recorded, and reversible through versioned artifacts and Git history; custom-domain consolidation remains deferred.

## Long-Term Maintenance Approach

- Review portfolio content quarterly and after significant project, role, or skill changes.
- Keep dependencies current through scheduled, small updates with build and accessibility checks.
- Treat project case studies as living technical records: update outcomes, validation evidence, and future work when material changes occur.
- Maintain documentation alongside architectural or design-system changes so implementation and intent remain aligned.
- Use GitHub pull requests or equivalent reviewable changes for substantial updates, and preserve deploy previews before production releases.
- Periodically audit links, contact methods, performance, responsive behavior, and the relevance of featured work.
