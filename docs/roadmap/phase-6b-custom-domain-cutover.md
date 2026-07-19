# Phase 6B — Custom Domain Cutover Preparation

**Status:** In progress in open draft PR #7. Pull-request preparation only; the PR is not merged or deployed, and `gu-xin.com` is unbound and not live.

**Preparation date:** 2026-07-18

## Purpose

Phase 6B prepares the smallest explicit production-profile switch for a later controlled cutover window. The branch changes which already-validated deployment profile the `main` workflow will upload after this pull request is merged:

- `custom-domain` becomes the future deployable `main` artifact at `https://gu-xin.com/` with an empty base path;
- `github-pages` remains a non-deploying production build and validation gate for rollback readiness;
- pull requests build and validate but cannot upload or deploy a Pages artifact;
- pull-request build and rollback-readiness jobs receive only `contents: read`; Pages write and OIDC token permissions are limited to the guarded `deploy` job;
- only the deployable build job can upload the single `github-pages` artifact consumed by the Pages deploy job.

This branch does not bind the domain, change DNS, modify GitHub Pages settings, provision HTTPS, deploy the custom-domain artifact, or make `gu-xin.com` live. Current production remains `https://kkkrrrkrkr.github.io/personal-portfolio/` until the separately approved cutover.

## Workflow intent

| Workflow path                     | Pull request                                   | `main` after an approved merge                  | Uploads Pages artifact          |
| --------------------------------- | ---------------------------------------------- | ----------------------------------------------- | ------------------------------- |
| Deployable `build` job            | `custom-domain` preview validation             | `custom-domain` production build and validation | Yes, only on `main`             |
| `github-pages-rollback-readiness` | `github-pages` production build and validation | `github-pages` production build and validation  | Never                           |
| `deploy`                          | Skipped                                        | Deploys the one artifact uploaded by `build`    | Does not build another artifact |

The profile contract, build scripts, static-export behavior, trailing slashes, image handling, metadata logic, and release validators remain unchanged. The workflow selects existing named profiles explicitly rather than duplicating scripts or hardcoding URL environment values.

## Mandatory merge gate

Do not merge the Phase 6B pull request until the manual cutover window is active and all of the following are confirmed:

1. `gu-xin.com` is saved as the repository's GitHub Pages custom domain.
2. The four required Cloudflare apex `A` records and the `www` `CNAME` are published as DNS-only records using the verified GitHub Pages targets below.
3. Public DNS results for the apex and `www` names are verified.
4. No conflicting apex `A`, `AAAA`, `ALIAS`, or `ANAME` record exists; no second `www` `A` or `CNAME` exists; and no wildcard record exists for `*.gu-xin.com`.
5. The GitHub account-level ownership-verification TXT record remains present and is protected from removal during both cutover and rollback.
6. CAA readiness is checked: no CAA record is acceptable; if CAA records exist, they must permit Let's Encrypt certificate issuance.
7. The Phase 6A rollback sequence is reviewed, the `github-pages` rollback profile passes, and the operator is ready to remove the binding and cutover DNS records if rollback is required.

Those conditions are not completed by this branch and are not recorded as complete in this document.

## Cloudflare DNS-only cutover records

Cloudflare DNS and the GitHub Pages custom-domain binding are manual cutover operations outside this pull request. Because the repository deploys through GitHub Actions, no repository `CNAME` file is required or added.

Use the following current GitHub Pages targets for the manual Cloudflare operation, reconfirming them against GitHub's documentation at the cutover window:

| Type    | Name  | Target                 | Cloudflare mode |
| ------- | ----- | ---------------------- | --------------- |
| `A`     | `@`   | `185.199.108.153`      | DNS only        |
| `A`     | `@`   | `185.199.109.153`      | DNS only        |
| `A`     | `@`   | `185.199.110.153`      | DNS only        |
| `A`     | `@`   | `185.199.111.153`      | DNS only        |
| `CNAME` | `www` | `kkkrrrkrkr.github.io` | DNS only        |

The `www` target must be the hostname only. It must not include `/personal-portfolio` or any other path. These records must not be added to repository code.

All four apex `A` records and the `www` `CNAME` must remain **DNS only** throughout Phase 6B. Do not enable Cloudflare proxying and do not add a Cloudflare Redirect Rule for either the apex or `www`. GitHub Pages must provide the apex/`www` canonical redirect behavior. Proxying is intentionally excluded so the cutover does not introduce a second reverse proxy, separate TLS termination, caching, or redirect behavior while GitHub Pages DNS and certificate provisioning are being validated.

## Transition risk and controlled merge

There is a temporary risk between saving the GitHub Pages custom domain and publishing DNS, merging Phase 6B, and completing the first `custom-domain` artifact deployment. The currently deployed artifact still uses the GitHub project Pages base path, `/personal-portfolio`. After DNS begins resolving but before the root-path production artifact is deployed, `gu-xin.com` may therefore be incomplete or serve broken asset paths.

This transition is not a successful launch. Once DNS verification is complete and the merge gate is approved, proceed directly to the controlled merge and monitor the deployment without an unnecessary pause.

## Manual cutover and post-merge work

After the merge triggers the first `custom-domain` production artifact:

1. Monitor the `build`, `github-pages-rollback-readiness`, and `deploy` jobs through a successful Pages deployment.
2. Wait for GitHub's DNS check and Let's Encrypt certificate provisioning; do not record TLS or HTTPS as complete before GitHub reports certificate provisioning ready.
3. Enable **Enforce HTTPS** only when GitHub makes it available, and do not record enforcement as complete before it is enabled and verified.
4. Validate `https://gu-xin.com/`, every Portfolio and reserved route, sitemap, robots policies, assets, canonical and Open Graph metadata, the RF Dashboard bytes and export, browser console, and runtime requests.
5. Verify `www.gu-xin.com` redirects to the apex.

After the custom domain is activated, the existing `https://kkkrrrkrkr.github.io/personal-portfolio/` URL may redirect to the configured custom domain. Treat that behavior as part of live cutover validation, not as a result completed by this preparation branch.

## Rollback

If rollback is required:

1. Stop further cutover changes and record the failing deployment and observed behavior.
2. Restore deployment through the existing `github-pages` profile and its known-good project-path artifact.
3. Remove the repository custom-domain binding when the binding, DNS, or certificate state requires the full rollback.
4. Remove the four cutover apex `A` records from Cloudflare.
5. Remove the cutover `www` `CNAME` from Cloudflare.
6. Retain the GitHub account-level ownership-verification TXT record; it must never be removed during cutover or rollback.
7. Verify `https://kkkrrrkrkr.github.io/personal-portfolio/`, its routes and assets, and the frozen Dashboard hash after rollback.

If only application content is faulty while DNS, the Pages binding, and HTTPS are healthy, a reviewed custom-domain artifact rollback may be attempted before the full binding and DNS rollback. The ownership-verification TXT record remains in place in every rollback path.

## Preserved boundaries

- Contact remains exactly `Email —`, `LinkedIn —`, and `GitHub —`, with no public destinations.
- Compliance Plan Generator remains in active development with no public demo, repository URL, documentation URL, or production claim.
- Technical Notes and Resume remain outside navigation and the production sitemap, with the existing production and preview indexing rules.
- No analytics, telemetry, cookies, CMS, backend, API, or account system is introduced.
- RF Dashboard Light remains standalone static HTML version `0.1.1`, with its reviewed dataset, seven-field CSV export, visible disclaimer, and `noindex, follow` policy unchanged.
- Frozen RF Dashboard SHA-256: `D3165ECBA5AD073252F8AAFDA2CE33D512236CCE809C3F4BA24BB6E3806D7561`.
