# RF Dashboard Light Public Readiness Audit

## Audit scope and evidence limits

This Phase 4-1 audit inspected `C:\Users\gul\Documents\Global_Wireless_Spectrum\Demo10` read-only on 2026-07-13. The directory contains one file and no README, changelog, release note, sibling asset, backup, or alternate candidate.

Source inspection covered file identity, visible version markers, HTML/CSS/JavaScript, embedded JSON and CSV data, embedded-image metadata, resource references, and deployment behavior implied by the code. Runtime visual review could not be completed because the controlled browser blocked direct local-file navigation. All visual and console observations below are therefore source-based risks that require browser verification in Phase 4-2.

## 1. Candidate inventory

| Absolute path                                                                          | Filename                        | Visible version evidence                                                                                                            |                       Size | Modified (+08:00)   | SHA-256                                                            | Inferred role                                                                                                                          | Confidence                                              |
| -------------------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------: | ------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `C:\Users\gul\Documents\Global_Wireless_Spectrum\Demo10\Global RF Band Dashboard.html` | `Global RF Band Dashboard.html` | No `Light`, `v1.5`, or `v1.6` label. Title and data UI say `Demo07`; CSS comments reach `Demo9.1`; containing folder says `Demo10`. | 4,014,335 bytes (3.83 MiB) | 2026-07-13 10:16:30 | `F1B50D807FCF500F3C55C7EA3DC1583F2D7F2665C40A8E46DEA2786221C5B94F` | Sole standalone Dashboard candidate in the stated workspace; likely the active working artifact, but not a versioned release artifact. | Medium for candidacy; low for release/version identity. |

The file is not named or visibly marked frozen, backup, test, temporary, or obsolete. A CSS comment marks the Save Updated HTML feature as retired, but this describes a feature, not the candidate file. The word `backup` occurs inside embedded data and is not a file-role marker.

## 2. Recommended baseline

Use the sole HTML file as the **conditional Phase 4-2 inspection starting point**, because it is the only credible artifact in the supplied workspace and contains the most recent internal refinement markers found there. Confidence is **medium-low**: its folder, title, data label, and CSS history disagree, and there is no release documentation.

The evidence is insufficient to determine whether this artifact is product version v1.5 or v1.6. Modification time alone must not resolve that question. Before copying or changing it, the owner must confirm the canonical source hash and assign a public version/date.

## 3. Public-safety review

### Blocking findings

- **Employer branding is visible and embedded.** The header contains a SHURE logo image at line 5056; the Portal action links to `SHURE_Compliance_Tools_Portal.html` at line 5076; an embedded logo constant appears at line 6364. CSS selectors and comments also retain SHURE naming, including the `Shure-style` comment at line 4858. Remove public-facing branding and review non-visible identifiers before release.
- **Employer/process content exists in the data.** Clear-text embedded datasets at lines 6357 and 7250 and the base64 fallback CSV at line 7748 contain one employer-branded row. The decoded fallback contains 245 rows across 18 columns; the affected row is identifiable by country code `ID`. Review and sanitize all three copies together.
- **Named companies or labs appear in regulatory notes.** Four decoded fallback rows across `HK`, `ID`, and `JP` contain named organization references. Publication rights, necessity, and neutrality must be reviewed; names should be removed when not required for a public demonstration.
- **A client-side import password is embedded in clear text.** The value is intentionally not reproduced here. It is declared at line 7747 and compared at line 8876. The UI correctly says this is not a security control, but a public artifact must not present it as authentication.
- **The current disclaimer is hidden.** Disclaimer text exists at line 6325 and in embedded integration data, but `.footer` is set to `display: none !important` at lines 1796-1802. A public release needs a visible, persistent disclosure near the tool and data/version status.

### Data and provenance findings

- Long technical notes are embedded, including `Special Note` fields for `HK`, `IN`, `JP`, and `MO`, `Spurious` fields for `TW`, and several long Japan measurement fields. The longest decoded field is 1,355 characters. Review these notes for sensitivity, correctness, source rights, and suitability for a general reference tool.
- The HTML duplicates data in clear-text integration JSON, clear-text matrix JSON, and an encoded fallback CSV. Sanitizing only one representation would leave the others exposed.
- The document contains 44 recognized embedded-image occurrences representing 43 unique payloads (about 1.25 MiB unique decoded image data). Two unique PNGs at line 6366 contain C2PA/JUMBF metadata with OpenAI-related markers. Their SHA-256 values are `4A54AC78575EB84BDF8A4108706C01EA18C39BCF75461D9EE9C655BE917B1944` and `84294AE6A9E27594EEF0B123E8E7E5BE3AE7504A35FEDE1034BF1576B9280472`. Decide whether to strip metadata or retain it with explicit provenance.
- Legacy comments and identifiers refer to Demo4, Demo06, Demo07, Demo08, Demo09, and Demo9.1. They are not confidential by themselves, but they make version provenance ambiguous and should not be treated as a public version history.
- Hidden/retired surfaces remain in source: compatibility filters, Admin Import Unlock, Save Updated HTML UI and generation code. Save Updated HTML is hidden by CSS, but its implementation remains callable from source and increases review scope.

### Searches with no finding

No email address, personal name identifiable from a dedicated author field, local Windows path, username/home-directory marker, internal URL, GitHub/private-repository link, `console.*` debug call, or explicit `confidential`, `proprietary`, or codename marker was found. Absence of a pattern match is not a substitute for owner review of the embedded regulatory prose.

## 4. External-dependency review

| Dependency or behavior            | Finding                                                                                                | Classification                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| CDN resources                     | None.                                                                                                  | Not used.                                                         |
| Online fonts                      | None; system font stacks are declared.                                                                 | Not used.                                                         |
| External JavaScript/CSS           | No external `script`, stylesheet, or CSS import.                                                       | Not used.                                                         |
| External images                   | None required; images, flags, icons, and map graphics are inline or data URIs.                         | Not used for rendering.                                           |
| API calls/runtime network loading | No `fetch`, XHR, WebSocket, or API endpoint.                                                           | Not used.                                                         |
| Local sibling assets              | Relative Portal link targets `SHURE_Compliance_Tools_Portal.html`, which is absent from the workspace. | Optional navigation; currently broken when clicked.               |
| Browser storage                   | No localStorage, sessionStorage, or IndexedDB use.                                                     | Not used.                                                         |
| CSV upload                        | Hidden file input plus `FileReader`; guarded only by the embedded client-side password.                | Optional user feature; data stays in page memory unless exported. |
| CSV download                      | Builds a UTF-8 CSV Blob and triggers an anchor download at lines 8682-8697.                            | Optional user feature.                                            |
| Updated HTML download             | Code builds and downloads a replacement HTML file, but the UI is hidden/retired.                       | Dead/retired public surface; remove or explicitly exclude.        |

The only HTTP-looking strings are SVG namespace declarations and do not cause network requests.

## 5. Deployment-risk review

### Static hosting and packaging

- **Direct static hosting is technically possible** after sanitization. The tool is one HTML file with inline CSS, JavaScript, SVG, data, and images.
- No application routing is required for the tool itself. Portfolio-to-tool routing and canonical URL behavior still need a deployment decision.
- The relative Portal link will break unless removed or deliberately supplied at the same relative location.
- The host must serve the file as `text/html` with UTF-8. CSV export uses a `text/csv;charset=utf-8` Blob; the retired HTML exporter uses `text/html;charset=utf-8`.
- CSV import relies on a user-selected local file and `FileReader`; it does not require server access. Browser security prevents arbitrary local-path reads, which is appropriate. Import and download behavior must still be tested on the chosen HTTPS host and supported browsers.
- CSV export should work on ordinary static hosting where Blob/object URLs and downloads are allowed. Verify browser download policies, filename generation, Unicode, filtered export contents, and mobile behavior.
- At 3.83 MiB, the single HTML response is heavy for a static document. Embedded image occurrences account for about 1.28 MiB decoded, including one 720,405-byte image. Measure transfer size, parse/execute time, memory, and cache behavior before release.
- Static inspection found no external-resource startup failure or debug logging. Runtime console, uncaught exception, and interaction testing remain required because the controlled local-file browser review was blocked.

### Accessibility and responsive risk

- `body` has `min-width: 1320px` and the dashboard grid reserves at least 1,180-1,320 px. The Spectrum Detail table has `min-width: 1306px`. This is not a mobile layout; narrow screens necessarily pan or scale.
- Much interface text is 9-12 px. Verify readable zoom, contrast, touch targets, and reflow at 200% and 400% zoom.
- Spectrum bars are non-focusable spans whose detail is primarily in `title` tooltips. Provide an accessible text/table path if they remain interactive evidence.
- Several close controls are styled `div` elements rather than semantic buttons. Keyboard and screen-reader behavior needs review.
- Country matrix rows use `role="button"`, `tabindex`, and keyboard handlers, which is a useful baseline, but expanded-state announcements and focus retention require runtime testing.
- Reduced-motion CSS exists, but complete keyboard order, focus visibility, map alternatives, labels, and live-region behavior still require verification.

### Second-page review concerns

The known Spectrum Detail concerns still have supporting source evidence and must remain open until runtime review:

- **MAX POWER clipping/compression:** the column is fixed at 150 px, while power text uses overflow-constrained styling. Long and multiple power values can compress or truncate.
- **Horizontal scrolling at the bottom:** `.matrix-scroll` explicitly uses `overflow: auto`, and `.matrix-table` is at least 1306 px wide. Horizontal scrolling is an intentional current behavior, not a resolved issue.
- **1500/1600 axis labels:** both ticks are retained on a 100-1600 MHz axis, only 6.67% apart, at 10 px text. The last tick is shifted left, but collision/crowding remains plausible.
- **Expanded China whitespace:** generic expanded detail reserves the six-column grid while populating only frequency and power columns, and emits one item per entry. No China-specific compaction is present.
- **Japan/Taiwan `+N` summaries:** summaries show the first two frequency values followed by `+N`; no explanatory label, disclosure, or accessible expansion hint explains what `N` represents.
- **Band Scope compactness:** two 10 px buttons share an inline, no-wrap heading control; the label is hidden below 1180 px. Confirm readability, action distinction, and touch sizing.
- **Row/group hierarchy:** groups are distinguished mainly by a divider, chevron, and expanded state. The special combined Europe group and ordinary country rows need clearer semantics and visual hierarchy.

## 6. Public positioning and disclaimer needs

Final wording should be approved later, but it must communicate:

- This is a personal engineering project, not an official regulatory database or employer product.
- The tool is for reference and demonstration, not authorization, certification, legal advice, or operating approval.
- Data may be incomplete, simplified, stale, or incorrect; the displayed date/version does not guarantee regulatory currency.
- Users must verify spectrum availability, licensing, power limits, operating conditions, and product eligibility with current official authorities and applicable standards before acting.
- No employer, regulator, laboratory, association, or other organization endorses the tool unless explicitly and lawfully stated.
- The current public version, release date, dataset version/date, and material scope limitations must be visible in the tool and the portfolio case study.

The disclosure must be visible without opening a hidden panel and remain available on both Home and Spectrum Detail views.

## 7. Phase 4-2 decision list

1. Confirm the canonical source file by absolute path and SHA-256, and resolve whether it represents v1.5, v1.6, or a newly assigned public version.
2. Lock the public feature scope: Home, Spectrum Detail, filters, map interaction, validation status, import, export, and retired Save Updated HTML behavior.
3. Decide whether CSV import is visible; if retained, remove the appearance of real authentication and document local data handling.
4. Decide whether CSV export is visible and exactly which public-safe fields and filtered records it may contain.
5. Select a public dataset strategy: sanitized embedded demonstration data, licensed public source data, or another reviewed source with provenance and update cadence.
6. Remove employer branding, employer/process references, the sibling Portal link, and unneeded organization names; review all duplicate data representations.
7. Approve disclaimer wording and placement on both tool pages and in the portfolio relationship.
8. Define public tool version naming, dataset version/date, release date, and a reproducible source-hash record.
9. Select the deployment target, canonical URL, routing/linking model, cache policy, security headers, analytics/privacy position, and rollback method.
10. Set a mobile minimum acceptance level, including whether horizontal scrolling is accepted, the smallest supported viewport, zoom/reflow expectations, and touch/keyboard criteria.
11. Decide whether embedded C2PA/JUMBF metadata is retained as provenance or stripped from optimized public assets.
12. Complete runtime console, browser, responsive, accessibility, import/export, link, performance, and disclosure validation before any public deployment.
