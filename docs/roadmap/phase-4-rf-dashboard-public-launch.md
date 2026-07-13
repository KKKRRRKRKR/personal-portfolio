# Phase 4 – RF Dashboard Public Launch Foundation

## 1. Phase definition

Phase 4 prepares Global RF Band Dashboard Light as the first possible publicly deployed engineering tool and establishes a reusable relationship between portfolio project records, case studies, and live tools.

This phase maps partially to the old Phase 5 case-study work, Phase 6 deployment work, and Phase 7 interactive-tool work. The completed website foundation, Core Pages scope, shared navigation, footer, and `Engineering Evidence Editorial` visual system are not repeated.

## 2. Confirmed scope

- RF Dashboard Light public-readiness work based on an explicitly selected source file.
- A reusable project/tool content interface that can represent future work truthfully.
- A clear portfolio-to-live-tool relationship, including distinct case-study and tool actions.
- Honest Compliance Plan Generator status while it remains in active development.
- Deployment architecture, public-safety review, and local and deployed release validation.
- Documentation, version identification, and clean Git closure.

## 3. Explicit exclusions

- No global visual redesign.
- No Compliance Plan Generator public deployment or claim that it is complete.
- No fictional project screenshots or new fictional projects.
- No publication of private contact details.
- No activation of Technical Notes or Resume in navigation.
- No production deployment during Phase 4-0 or Phase 4-1.
- No modification of the RF Dashboard source during the Phase 4-1 audit.

## 4. Subphase sequence

### Phase 4-0 – Roadmap Rebaseline

- **Objective:** Align current planning with completed Core Pages work and the RF Dashboard launch priority.
- **Expected outputs:** This execution plan and a minimal update to the main roadmap.
- **Implementation boundary:** Documentation only; no application, Dashboard, deployment, or Git-history changes.
- **Review gate:** Scope, exclusions, sequence, and completion criteria are accepted as the Phase 4 baseline.

### Phase 4-1 – RF Dashboard Light Public Readiness Audit

- **Objective:** Inventory credible Dashboard Light candidates and identify version, disclosure, dependency, deployment, and interface risks.
- **Expected outputs:** A read-only audit with hashes, a conditional baseline recommendation, public-safety findings, and Phase 4-2 decisions.
- **Implementation boundary:** Inspect the Dashboard workspace without modifying or copying it; do not select a version from modification time alone.
- **Review gate:** The candidate evidence and unresolved version/public-safety questions are sufficient for an explicit scope-lock decision.

### Phase 4-2 – Public Light Scope Lock

- **Objective:** Select the canonical source and define the smallest truthful public feature/data surface.
- **Expected outputs:** Canonical file decision, feature matrix, data strategy, branding/disclaimer requirements, version convention, deployment target, and mobile acceptance level.
- **Implementation boundary:** Decisions and approved source preparation only; do not broaden into portfolio integration or production release.
- **Review gate:** The owner approves the source hash, public dataset, visible features, disclosures, and acceptance criteria.
- **Locked scope:** [Phase 4-2 – Public Light Scope Lock](./phase-4-2-public-light-scope-lock.md).

### Phase 4-3 – Reusable Project and Tool Interface

- **Objective:** Extend the portfolio content contract so projects can independently expose a case study, live tool, source, and documentation when available.
- **Expected outputs:** Typed content interface, migration of the two current records, conditional actions, visibility/indexing controls, and model tests or type validation.
- **Implementation boundary:** Preserve the approved Projects-page visual direction; introduce only evidence-backed optional fields and reusable rendering behavior.
- **Review gate:** Both current projects render truthfully, and a new project can be registered without changing Projects-page layout code.
- **Local implementation status:** Completed and validated locally. Case-study, live-tool, repository, and documentation availability are independently typed; both current records are migrated, and no live-tool URL is registered. Phase 4-4 has not started.

### Phase 4-4 – RF Dashboard Portfolio Integration

- **Objective:** Connect the RF project record and case study to the approved public Dashboard candidate.
- **Expected outputs:** Public-safe visual evidence, accurate status/version metadata, a distinct live-tool action, disclosure context, and fallback behavior.
- **Implementation boundary:** Keep editorial case-study content separate from the standalone tool and avoid fictional evidence.
- **Review gate:** The case study, tool link, version, and disclosures agree and expose no sensitive information.

### Phase 4-5 – CPG Status Calibration

- **Objective:** Ensure the Compliance Plan Generator is consistently presented as active development rather than a finished tool or launch deliverable.
- **Expected outputs:** Calibrated status, current-state language, next steps, and hidden/absent live-tool actions.
- **Implementation boundary:** No CPG deployment, completion claim, fictional interface, or new implementation work.
- **Review gate:** Projects index, Home, and CPG detail page communicate the same development state.

### Phase 4-6 – Deployment Architecture

- **Objective:** Define how the portfolio and standalone Dashboard are hosted, linked, versioned, and rolled back.
- **Expected outputs:** Hosting decision, URL and routing plan, static-asset policy, security headers, cache/version strategy, analytics/privacy decision, and release checklist.
- **Implementation boundary:** Architecture and preview configuration only; production release waits for Phase 4-7 approval.
- **Review gate:** Preview hosting proves the chosen architecture supports direct entry, downloads, imports if retained, accessibility checks, and rollback.

### Phase 4-7 – Public Deployment and Release Validation

- **Objective:** Publish the approved candidate and verify the complete public path from portfolio to tool.
- **Expected outputs:** Production deployment, recorded version/hash, smoke-test evidence, responsive/accessibility/browser/performance/link results, and rollback reference.
- **Implementation boundary:** Release only the approved scope; any failed critical gate returns to the owning earlier subphase.
- **Review gate:** No critical public-safety or functional issues remain, disclosures are visible, and the owner approves the live URLs.

### Phase 4-8 – Documentation and Commit Closure

- **Objective:** Close the phase with reproducible documentation and a clean, reviewable repository state.
- **Expected outputs:** Updated roadmap, deployment/runbook notes, validation record, release/version record, intentional commit history, and clean Git status.
- **Implementation boundary:** Documentation and closure fixes only; new features move to later work.
- **Review gate:** Documentation matches the deployed state, checks pass, and the final Git working tree is clean.

## 5. Reusable project and tool interface – observed requirements

The current implementation uses `website/src/content/projects.ts`, the Projects index, the shared dynamic detail route, Home project components, and project visual components. It already provides a useful static case-study baseline, but several contracts are coupled to the two current projects.

### Existing two-project coupling

- `ProjectEvidence.kind` is limited to `spectrum` and `planning-flow`.
- `ProjectVisual` selects between two hard-coded SVG families and two hard-coded copy maps rather than consuming a general visual record.
- `ProjectStatus` exposes only `case-study-in-preparation` and `available`.
- Every detail narrative and evidence field is required, so projects without a full case study would need filler content.
- The related-project navigation selects the first other available project, which assumes a very small collection.
- Home's hero requests the RF project by a hard-coded slug; About contains direct links to both current project slugs.

### Fields already supported

| Requirement           | Current support | Notes                                                          |
| --------------------- | --------------- | -------------------------------------------------------------- |
| Project slug          | Supported       | `slug` drives lookup and static detail-route generation.       |
| Title                 | Supported       | Used across index, Home, metadata, and detail views.           |
| Summary               | Supported       | Used for cards, detail introduction, and page metadata.        |
| Project status        | Supported       | `status` plus `statusLabel`, but the status union is narrow.   |
| Project type          | Supported       | Free-text `projectType`.                                       |
| Featured-on-home flag | Supported       | `featured` feeds `featuredProjects`.                           |
| Current state         | Supported       | Required `currentState` appears in the detail outcome section. |
| Next steps            | Supported       | Required `nextSteps` list appears on detail pages.             |

### Fields partially supported

| Requirement             | Current support | Gap to close                                                                                                                   |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Case-study availability | Partial         | `detailRouteAvailable` controls local detail generation, but does not represent readiness stage or an external case study.     |
| Public-safe visual      | Partial         | Visuals are public-safe in intent, but are hard-coded to two evidence kinds and have no asset/source/alt/disclosure contract.  |
| Evidence sections       | Partial         | Facts, decisions, system sections, and fixed narrative fields exist; section availability and evidence types are not flexible. |
| Project status          | Partial         | The current enum cannot express active development, deployed tool, archived, private, or case-study-only states cleanly.       |
| Indexability            | Partial         | Detail generation can be disabled, but there is no explicit search-engine indexing control.                                    |

### Fields not supported

- Role.
- Live-tool availability and live-tool URL.
- Repository URL and documentation URL.
- Structured validation notes and disclosure notes.
- Explicit archived/private/public visibility state.
- Independent control of index visibility, case-study availability, and live-tool availability.

### Fields that should probably remain optional

- Role, because ownership context may not be publishable or meaningful for every project.
- Live-tool, repository, and documentation URLs, each present only when a public destination exists.
- Public-safe visual, because some records may be text/evidence-first or intentionally private.
- Evidence, validation, and disclosure sections, while allowing launch gates to require them for deployed tools.
- Current state and next steps for completed or archived records; active projects should supply them.
- Indexability override, with a safe public default and an explicit no-index/private state when needed.

Core identity fields (`slug`, `title`, `summary`, `project status`, and `project type`) should remain required. Availability and visibility should be explicit rather than inferred from the presence of a URL. Conditional validation should require a URL only when its corresponding availability flag is true.

## 6. Completion criteria

- A public-safe RF Dashboard Light candidate exists with an approved source hash, version, date, and release scope.
- The portfolio has a truthful case-study and live-tool entry model.
- Future projects can be introduced without redesigning the Projects page.
- The Compliance Plan Generator remains clearly identified as in development.
- Public disclosure, disclaimer, and version-visibility requirements are documented and implemented.
- No sensitive, proprietary, employer-identifying, private-contact, or accidental metadata is exposed.
- Local and deployed validation requirements cover content, links, browser behavior, responsive layout, accessibility, performance, security, imports/exports when retained, and rollback.
- Final documentation matches the released state and final Git status is clean.
