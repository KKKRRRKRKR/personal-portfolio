# Phase 4-2 – Public Light Scope Lock

## 1. Canonical source decision

- **Canonical path:** `C:\Users\gul\Documents\Global_Wireless_Spectrum\Demo10\Global RF Band Dashboard.html`
- **Canonical SHA-256:** `F1B50D807FCF500F3C55C7EA3DC1583F2D7F2665C40A8E46DEA2786221C5B94F`
- The original file is immutable and must never be edited in place.
- Modification time is not a release identifier.
- The artifact cannot be truthfully identified as internal v1.5 or v1.6.

## 2. Public version convention

The first public version is **RF Dashboard Light 0.1.0**.

- This starts a new public version line and does not claim equivalence to an internal Demo or v1.x label.
- Future public versions use semantic versioning.
- Tool version, release date, dataset version, and dataset date are separate values.
- Dataset date remains unverified until the sanitized dataset is approved.

## 3. Public working-copy boundary

The intended future public working directory is:

`C:\Users\gul\Documents\Global_Wireless_Spectrum\Demo10_Public_Light`

This task does not create that directory or copy the source file. The future working copy must remain outside the public portfolio repository until employer branding, sensitive data, passwords, metadata, and duplicated embedded datasets have been sanitized.

## 4. Locked visible feature scope

Public Light 0.1.0 retains:

- Home view.
- Spectrum Detail view.
- Region filter.
- Country / Area filter.
- RF Band filter.
- Map and country selection.
- Frequency and power visualizations.
- Country / Area detail expansion.
- Visible public tool version.
- Visible dataset version/date state.
- Visible disclaimer and data limitations.
- Filtered public-safe CSV export, subject to an explicit field whitelist.

## 5. Explicitly removed or disabled scope

Remove these features and references from the future public working copy rather than merely hiding them:

- SHURE branding and logo.
- SHURE Portal link.
- Employer and internal-process references.
- CSV Import UI.
- Import password.
- Admin Import Unlock.
- Save Updated HTML UI and implementation.
- Retired administration controls.
- Hidden management actions.
- Organization or laboratory names that are not necessary and approved.
- Internal notes and fields not included in the public data schema.
- Broken sibling-file navigation.
- Dead public-facing feature references.

Import may be reconsidered in a later public version only through a separate reviewed design.

## 6. Public export whitelist

The public CSV export may contain only reviewed fields equivalent to:

- Region.
- Country / Area.
- Frequency Band.
- Frequency Range.
- Max Power.
- Public Data Note.
- Dataset Version.

The exact current internal field names may differ. Implementation must map the reviewed public schema to the existing data rather than expose every source field.

Explicitly exclude:

- Internal notes.
- Employer or laboratory names.
- Internal source fields.
- Reviewer fields.
- Hidden fields.
- Debug fields.
- Long regulatory prose.
- Unreviewed comments.
- Data-import or administration fields.

## 7. Public dataset strategy

The locked strategy is: **Sanitized public dataset derived from the current candidate, subject to record-level review.**

Requirements:

- Retain only data appropriate for public reference and demonstration.
- Remove employer, laboratory, internal workflow, and nonessential organization references.
- Remove or withhold records whose publication rights or factual status cannot be confirmed.
- Review long free-text notes independently from frequency and power values.
- Clearly mark unavailable or unverified data rather than invent replacements.
- Regenerate all embedded representations from one canonical sanitized dataset.
- Never manually sanitize only one of the clear-text JSON, matrix JSON, or fallback CSV copies.
- Preserve a local transformation record sufficient to reproduce the public dataset.
- Do not commit the unsanitized source data to the public portfolio repository.

## 8. Branding and disclosure requirements

Employer branding and endorsement implications must be removed completely. A visible disclosure is required on both Home and Spectrum Detail.

The disclosure requirements must cover:

- Personal engineering project.
- Reference and demonstration use.
- Not an official regulatory database.
- Not legal, certification, licensing, or operating authorization advice.
- Data may be incomplete, simplified, stale, or incorrect.
- Official authorities and current regulations must be checked.
- No employer, regulator, laboratory, or organization endorsement.
- Visible public tool version.
- Visible release date.
- Visible dataset version/date.
- Material scope limitations.

This document does not finalize marketing copy.

## 9. Embedded asset metadata policy

- Preserve original source assets outside the public release.
- Strip unnecessary C2PA/JUMBF and other nonessential metadata from optimized public assets.
- Record the transformation when public assets are regenerated.
- Do not claim that stripping metadata changes authorship or ownership.
- Verify that image optimization does not alter visible engineering meaning.

## 10. Deployment target class

For the first release:

- Use a standalone static preview or standalone static deployment.
- Keep the Dashboard implementation isolated from the Next.js editorial application.
- Connect it through a typed live-tool URL in the portfolio.
- Do not use an iframe for the first release.
- Do not add analytics for Public Light 0.1.0.
- Do not add new runtime external dependencies.
- Decide the final canonical URL, subdomain, or `/tools/` path in Phase 4-6.
- Support rollback to a recorded file hash.

No deployment occurs during this task.

## 11. Minimum responsive and accessibility acceptance

Public Light 0.1.0 is desktop-first.

- At 1024 px and wider, the complete primary workflow must be available.
- Below 1024 px, the tool may show a clear desktop/tablet recommendation.
- Smaller screens must still be able to read project identity, version, disclosure, and limitations.
- No critical control may become permanently unreachable.
- Avoid nested page-level and component-level horizontal scrolling where possible.
- Keyboard access is required for page switching, filters, country rows, expansion, and primary actions.
- Visible focus is required.
- At 200% zoom, critical controls must not become permanently hidden.
- Tooltips must not be the only access to important information.
- The Spectrum Detail table may remain horizontally scrollable in 0.1.0 only if the behavior is clear and usable.

## 12. Known UI issues retained for implementation

These items remain open and are not resolved by this scope lock:

- MAX POWER clipping or compression.
- Bottom horizontal scrolling.
- 1500 / 1600 axis-label crowding.
- Expanded China-row whitespace.
- Unexplained Japan and Taiwan `+N` summaries.
- Compact Band Scope controls.
- Weak row/group hierarchy.
- Small text and touch targets.
- Nonsemantic close controls.
- Tooltip-only spectrum information.

## 13. Phase 4-3 handoff requirements

Before Phase 4-3 begins, this scope-lock document and the public-readiness audit are the source of truth for:

- Project status.
- Live-tool availability.
- Live-tool URL behavior.
- Disclosure notes.
- Validation notes.
- Indexability.
- Public/private visibility.
- Version display.
- Deployment state.

No live-tool URL may appear in the portfolio until a working preview exists.
