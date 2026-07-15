# Project and Tool Content Interface

## Purpose

The project registry in `website/src/content/projects.ts` is the source of truth for public project listings, home-page featured work, project detail routes, project metadata, related-project navigation, visuals, and optional public destinations. A project can describe these surfaces without adding project-specific branching to page layout code.

Lifecycle, case-study readiness, live-tool readiness, visibility, and indexability are separate because none proves another: an active project may have a public case study but no public tool, a public route may intentionally be `noindex`, and a private record must remain absent even if its content is complete. Keeping these axes explicit prevents route existence or a stray URL from being mistaken for launch readiness.

## Record model

Every `ProjectRecord` has a stable slug, title, summary, lifecycle status, public status label, project type, featured flag, visibility, indexability, order, visual contract, case-study state, and independent destination states. A role is optional. Release metadata, validation notes, and disclosure notes are optional structured fields.

Lifecycle status is normalized to `active-development`, `case-study-in-preparation`, `available`, or `archived`. `statusLabel` is the concise public wording and must agree with the normalized status. The two current records use `active-development`; their public labels are `Public Light preparation` and `In active development`.

Visibility and indexability are separate decisions:

- `visibility: "public"` permits a record to enter public collections. `private` records are excluded from the Projects page, home featured work, related navigation, and static route generation.
- `indexability: "index" | "noindex"` controls detail-page robots metadata for an otherwise public route. Both current public project records remain `index` because their existing public case-study routes are preserved.

## Case studies and routes

`caseStudy` is a discriminated union. `unavailable` carries no detail content and produces no detail route. `in-preparation` and `available` require the complete detail-content shape and can produce a route when the parent record is public.

`publicProjects`, `featuredProjects`, and `publicCaseStudyProjects` are ordered derived collections. Static params come only from `publicCaseStudyProjects`. Detail lookup uses the same collection, so private, unknown, and case-study-unavailable slugs resolve through the not-found path. Related navigation deterministically selects the first other ordered public project with an enabled case study and renders nothing when there is no match.

## Independent public destinations

Case-study availability is independent from live-tool, repository, and documentation availability:

- Live tools support `unavailable`, `planned`, `preview`, and `available`. A URL is allowed and required only for `preview` or `available`.
- Repository and documentation destinations support `unavailable`, `planned`, and `available`. A URL is allowed and required only for `available`.
- Each destination may supply a label, an accessibility description, and `same-tab` or `new-tab` behavior.

The shared `ProjectActions` renderer shows only real destinations. Planned and unavailable destinations do not render placeholder links. Before rendering an external destination, it parses the URL and accepts only absolute `http:` or `https:` URLs; invalid values are omitted. New-tab destinations receive `_blank` with `noopener noreferrer`.

A live-tool URL is prohibited until a real working preview exists. The type therefore has no URL field for `planned` or `unavailable`, and content review must not promote a destination to `preview` merely to expose a link.

The RF Dashboard live-tool destination is currently `planned`, so no live URL or action is present. Its release metadata records `RF Dashboard Light 0.1.0` as `not-deployed` without inventing a release date, dataset version, dataset date, or deployment URL. The Compliance Plan Generator has no public destinations or release record.

## Visual contract

The `visual` union supports:

- a reusable system illustration selected by `spectrum` or `planning-flow`;
- an image with required source and alt text plus optional caption, disclosure, and source credit;
- an intentional text-first fallback with optional label and description.

The current records retain their existing system illustrations. Image and text-first records use the same figure boundary, so the Projects page, featured work, and detail views do not need project-specific layout changes.

## Adding a project

1. Add one typed record to `projectRecords` and choose its order, visibility, indexability, and featured state.
2. Choose the case-study state. Supply the full nested detail content only when it is `in-preparation` or `available`.
3. Set live-tool, repository, and documentation states independently. Add a real URL only when the selected availability permits it.
4. Choose a system illustration, image, or text-first visual contract.
5. Add release metadata or structured validation/disclosure notes only when the values are evidence-backed.

No page-layout edit is required. The derived collections, conditional action renderer, detail route generation, robots metadata, and related navigation consume the record automatically.
