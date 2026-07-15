# Architecture Decision Record: Personal Portfolio

## Purpose

This document defines the initial architecture for the personal portfolio as a durable professional website and engineering project hub. It is a reference for future implementation decisions, not an application implementation plan.

## Architecture Principles

- **Long-term maintainability:** Favor established, well-documented tools, clear boundaries, and small composable units that can be evolved without broad rewrites.
- **Static-first architecture:** Publish pre-rendered content by default for reliability, performance, security, and low operational overhead. Introduce server-side behavior only when a concrete requirement justifies it.
- **Component-based design:** Build the website from reusable layout, navigation, content, and project presentation components with explicit interfaces.
- **Engineering-oriented presentation:** Treat the portfolio as evidence of technical practice. Project pages should communicate context, decisions, architecture, implementation, validation, and outcomes.
- **AI-assisted development compatibility:** Use TypeScript, conventional project structure, and readable MDX content so both developers and AI-assisted workflows can safely navigate, review, and extend the codebase.
- **Offline-friendly project integration:** Keep project source, documentation, diagrams, and selected assets organized in the repository so core content can be developed, reviewed, and demonstrated without depending on live external services.

## Technology Stack Decision

| Technology | Decision and role |
| --- | --- |
| **Next.js** | Use as the website framework for file-based routing, static generation, asset optimization, and a clear path to future interactive features. |
| **TypeScript** | Use as the implementation language to provide explicit data and component contracts, safer refactoring, and stronger tooling support. |
| **Tailwind CSS** | Use for a maintainable design system based on composable utility classes, responsive layouts, and consistent visual tokens. |
| **MDX** | Use for project and technical content that benefits from Markdown authoring while retaining access to reusable React presentation components. |
| **GitHub** | Use as the source of truth for version control, issue tracking, review history, and public or private project collaboration. |
| **Vercel** | Use for continuous deployment of the static-first Next.js site, preview deployments, and minimal hosting operations. |

## Repository Architecture

```text
personal-portfolio/
|-- website/   # Deployable Next.js portfolio application
|-- projects/  # Engineering project source, project-specific notes, and local artifacts
|-- docs/      # Cross-project architecture, decisions, roadmap, and technical documentation
`-- assets/    # Shared images, diagrams, media, and other reusable portfolio assets
```

- **`website/`** contains the user-facing application, including routes, components, styles, MDX rendering, and build configuration. It remains separate from project implementations so the portfolio can evolve independently.
- **`projects/`** contains self-contained engineering work. Each project owns its implementation and project-level documentation, allowing it to be developed and evaluated locally.
- **`docs/`** contains durable repository-level references such as architecture decisions, standards, planning records, and project-independent technical documentation.
- **`assets/`** contains reusable media that is not owned by a single project, such as profile imagery, shared diagrams, and portfolio visuals. Project-specific assets should remain with their project when practical.

## Project Integration Strategy

Future engineering projects are integrated as first-class repository units rather than temporary portfolio examples. Each project should have a stable directory under `projects/`, a concise README, and sufficient local documentation to explain how it is run, reviewed, or demonstrated offline.

For example, **Global RF Spectrum Dashboard** can contribute its engineering source and technical documentation under `projects/rf-spectrum-dashboard/`, while the website presents a curated case study that links architecture, visuals, implementation choices, and outcomes. **Compliance Plan Generator** follows the same pattern under `projects/compliance-plan-generator/`, with the portfolio separating concise public-facing storytelling from the project's detailed local materials.

The website should consume project metadata and MDX case-study content through defined interfaces instead of tightly coupling to project internals. This preserves independent project evolution, supports selective publication, and enables new projects to be added through a repeatable workflow:

1. Create the project directory and project README.
2. Add the public case-study content and approved assets.
3. Register project metadata for the website.
4. Verify the portfolio page and the project's offline documentation independently.

This approach keeps the portfolio coherent while preserving each engineering project as a maintainable, reviewable body of work.
