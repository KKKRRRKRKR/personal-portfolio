# RF Dashboard Light 0.1.0 Local Candidate

## Release state

- Product: RF Dashboard Light
- Version: `0.1.0`
- State: local release candidate
- Release date: not released
- Deployment: not deployed
- Live URL: none
- External local working directory: `C:\Users\gul\Documents\Global_Wireless_Spectrum\Demo10_Public_Light`
- Phase boundary: Phase 4-4A complete locally; Phase 4-4B has not started

This candidate is a standalone, self-contained HTML engineering reference. It is not registered as a portfolio live tool and makes no claim of official, regulatory, certification, licensing, or operating authority.

## Provenance and reproducibility

- Canonical source file: `Global RF Band Dashboard.html`
- Canonical source size: `4,014,335` bytes
- Canonical source SHA-256: `F1B50D807FCF500F3C55C7EA3DC1583F2D7F2665C40A8E46DEA2786221C5B94F`
- Candidate file: `RF Dashboard Light 0.1.0.html`
- Candidate SHA-256: `47B1502AFC2D8758F78D25804E405768B845FE683CF485036D0BC86EF8B6A76C`
- Transformation script: `tools/build_public_light.py`
- Transformation script SHA-256: `1DB712F33115A46352911A147397268766D7ABB870EA13A5C1DF4F9D0DE3683C`
- Deterministic repeat-build result: passed; the candidate hash matched the previous generated hash

The immutable canonical source retained its expected size, modified timestamp, and SHA-256 after candidate generation. The local release folder also contains `release-manifest.json` and `sanitization-log.md`; no unsanitized source copy is included.

## Public data surface

- Source fallback records reviewed: `245`
- Public records retained: `175`
- Records removed: `70`
- Records modified: `175`
- Public-note fields blanked: `25`
- Removed source-schema fields across duplicated representations: `40`
- Required external dependencies: `0`

The public CSV export is limited to these seven fields:

1. `Region`
2. `Country / Area`
3. `Frequency Band`
4. `Frequency Range`
5. `Max Power`
6. `Public Data Note`
7. `Dataset Version`

Employer branding and endorsement implications, broken sibling navigation, CSV import, credential logic, file reading, administration controls, and Save Updated HTML behavior were removed. Two retained PNG assets were decoded, validated, and stripped of `caBX` provenance chunks. One literal `c2pa` sequence remains only as an unavoidable Base64 alphabet coincidence in a validated metadata-free PNG; decoded PNG binaries contain zero C2PA/JUMBF markers.

## Local validation

- Static dependency, sensitive-string, dataset, schema, PNG integrity, and embedded-metadata checks: passed
- Localhost HTTP load and self-contained resource check: passed
- Home identity, version, dataset status, disclosure, map, country filter, and RF Band filter: passed
- Spectrum Detail navigation, filters, country row expansion, and Band Scope controls: passed
- Import/Admin/Save/portal controls visible in the public UI: zero
- Browser console warnings and errors after tested interactions: zero
- Filtered CSV export: passed with a real four-row Japan download, the exact seven public headers, and no unexpected columns

Known non-blocking interface issues remain recorded in the external release manifest, including dense spectrum labels, compact controls, small text/touch targets, nonsemantic close controls, tooltip-only information, and the pending 1024 px responsive acceptance target. These are not expanded into redesign work in Phase 4-4A.

## Next gate

Phase 4-4B may integrate the candidate with the portfolio only after a separate approval. It must decide public hosting and URL registration, revalidate the deployed artifact, and keep case-study content separate from the standalone tool. This document does not authorize deployment, pushing, or adding a live-tool URL.
