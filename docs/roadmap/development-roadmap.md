# Development Roadmap

## Purpose

This roadmap defines the long-term implementation path for the personal portfolio website. It guides incremental delivery while preserving the static-first, engineering-oriented architecture defined for the repository.

## Development Philosophy

Build in small, reviewable increments that produce durable value at every stage. Prioritize a reliable foundation, meaningful technical content, and evidence of engineering work before optional visual or interactive complexity.

Each phase should have a clear completion boundary, maintain a deployable website where applicable, and avoid coupling portfolio presentation to unstable project internals. New features are introduced only when they improve professional communication, project understanding, or maintainability.

## Phase Breakdown

### Phase 0 - Vision and Visual Direction

**Status:** Completed

Established the professional portfolio vision and the white-first, clean, minimal, premium engineering visual direction.

### Phase 1 - Repository Foundation

**Status:** Completed

Established the repository structure for `website/`, `projects/`, `docs/`, and `assets/`, along with the initial Git and project documentation baseline.

### Phase 2 - Architecture Design

**Status:** In progress; complete when this roadmap is approved.

Define the long-term architecture, information architecture, visual design system, and delivery roadmap that guide implementation decisions.

**Completion criteria:** The architecture decision, sitemap, design system, and approved development roadmap are present, internally consistent, and committed as the reference set.

### Phase 3 - Website Foundation Implementation

Create the static-first website foundation inside `website/`.

- Initialize Next.js inside `website/`.
- Configure TypeScript, Tailwind CSS, and the MDX foundation.
- Establish linting, formatting, and the base directory structure.
- Validate local development and production builds.
- Configure an initial Vercel preview deployment.

**Completion criteria:** The website starts locally, passes linting and formatting checks, produces a validated production build, and has a working Vercel preview deployment.

### Phase 4 - Core Pages and Design System

Implement the approved visual system and the core portfolio experience.

- Build shared navigation and footer.
- Implement Home, About, Projects index, Technical Notes index, Resume, and Contact pages.
- Add responsive behavior and an accessibility foundation.
- Apply the approved visual design system consistently.

**Completion criteria:** Every core route is reachable through shared navigation, responsive at supported sizes, aligned with the design system, and verified for baseline keyboard access, contrast, and semantic structure.

### Phase 5 - Project Case Studies

Integrate engineering projects through a consistent public case-study model.

- Define project metadata and MDX content model.
- Publish the Global RF Spectrum Dashboard case study.
- Publish the Compliance Plan Generator case study.
- Include approved screenshots, diagrams, validation evidence, and public-safe technical content.

**Completion criteria:** Both case studies follow the standard template, are accessible from the Projects index, contain reviewed technical evidence, and exclude sensitive or proprietary content.

### Phase 6 - Production Deployment

Release the core portfolio and case studies as the public MVP.

- Configure production Vercel deployment from the main branch.
- Connect the custom domain when available.
- Add production metadata and social previews.
- Complete responsive, accessibility, browser, performance, and link reviews.

**Completion criteria:** The main branch deploys successfully to the production domain, the core site and two case studies are publicly available, and the release review has no unresolved critical issues.

### Phase 7 - Interactive Engineering Tool Integration

Add selected interactive engineering experiences without weakening the static-first editorial site.

- Integrate the Global RF Spectrum Dashboard first.
- Evaluate iframe, standalone deployment, and native component integration against security, performance, accessibility, and maintenance criteria.
- Expose a Compliance Plan Generator public demonstration only after privacy and proprietary-content review.
- Keep tool implementation isolated from editorial website content.

**Completion criteria:** Any released integration has a documented integration decision, an accessible fallback or clear limitation, validated performance, and no unreviewed private or proprietary data exposure.

### Phase 8 - Content Expansion and Maintenance

Operate the portfolio as a maintained professional record rather than a one-time build.

- Publish technical notes and additional projects.
- Keep the resume current.
- Perform dependency maintenance and accessibility and performance reviews.
- Periodically review the relevance of all public content.

**Completion criteria:** A recurring maintenance cadence is operating, content is reviewed against current professional goals, and routine quality checks are recorded and resolved.

## MVP Definition

The minimum viable portfolio is reached after Phase 6. It is a publicly deployed, responsive, and accessible website that presents a clear professional introduction; navigation to Home, About, Projects, Technical Notes, Resume, and Contact; the Global RF Spectrum Dashboard and Compliance Plan Generator case studies; a concise resume; and working contact paths.

The MVP must use the defined visual system, load reliably as a static-first site, and provide enough technical evidence for a hiring manager or engineering peer to evaluate the work without requiring a live product demonstration. Interactive tools, extensive filtering, and additional content are post-MVP enhancements.

## Project Migration Strategy

### Global RF Spectrum Dashboard

Maintain the project as a self-contained unit under `projects/rf-spectrum-dashboard/`. First document the project baseline, architecture, data sources, and validation approach locally. Then create a curated portfolio case study that explains the problem, engineering decisions, representative visuals, and results. Publish only assets and details appropriate for a professional audience; retain deeper implementation material in the project documentation or linked source repository.

### Compliance Plan Generator

Maintain the project as a self-contained unit under `projects/compliance-plan-generator/`. Capture the workflow, domain constraints, system architecture, implementation choices, and evaluation evidence in project-level documentation. Integrate it into the website through a case study focused on the engineering challenge, solution design, and practical outcomes, while keeping sensitive customer, regulatory, or proprietary details out of public content.

For both projects, migration is complete when the project directory remains independently understandable, the portfolio case study follows the standard template, shared visual assets are properly owned, and links between public presentation and technical source material are intentional.

## Deployment Milestone

Vercel preview deployment begins in Phase 3, once the website foundation can be built and run locally. Preview deployments support implementation review before public release.

Production deployment and custom-domain configuration belong to Phase 6, after the core website and both project case studies are complete. The production release includes metadata and social previews plus responsive, accessibility, browser, performance, and link review. Subsequent deployments should remain incremental and reversible through GitHub history and Vercel previews.

## Long-Term Maintenance Approach

- Review portfolio content quarterly and after significant project, role, or skill changes.
- Keep dependencies current through scheduled, small updates with build and accessibility checks.
- Treat project case studies as living technical records: update outcomes, validation evidence, and future work when material changes occur.
- Maintain documentation alongside architectural or design-system changes so implementation and intent remain aligned.
- Use GitHub pull requests or equivalent reviewable changes for substantial updates, and preserve deploy previews before production releases.
- Periodically audit links, contact methods, performance, responsive behavior, and the relevance of featured work.
