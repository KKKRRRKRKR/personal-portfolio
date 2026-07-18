# Phase 6B — Custom Domain Cutover Preparation

**Status:** In progress. Pull-request preparation only; `gu-xin.com` is unbound and not live.

**Preparation date:** 2026-07-18

## Purpose

Phase 6B prepares the smallest explicit production-profile switch for a later controlled cutover window. The branch changes which already-validated deployment profile the `main` workflow will upload after this pull request is merged:

- `custom-domain` becomes the future deployable `main` artifact at `https://gu-xin.com/` with an empty base path;
- `github-pages` remains a non-deploying production build and validation gate for rollback readiness;
- pull requests build and validate but cannot upload or deploy a Pages artifact;
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
2. The required Cloudflare apex and `www` DNS records are added using the then-current GitHub Pages targets.
3. Public DNS results for the apex and `www` names are verified.
4. The Phase 6A rollback sequence is reviewed, the `github-pages` rollback profile passes, and the operator is ready to remove the binding and cutover DNS records if rollback is required.
5. The GitHub account-level ownership-verification TXT record remains present and must not be removed.

Those conditions are not completed by this branch and are not recorded as complete in this document.

## Manual cutover and post-merge work

Cloudflare DNS and the GitHub Pages custom-domain binding are manual cutover operations outside this pull request. Because the repository deploys through GitHub Actions, no repository `CNAME` file is required or added.

After the merge triggers the first `custom-domain` production artifact:

1. Monitor the `build`, `github-pages-rollback-readiness`, and `deploy` jobs through a successful Pages deployment.
2. Wait for GitHub's DNS check and HTTPS certificate provisioning; do not record HTTPS as complete before GitHub reports it ready.
3. Enable HTTPS enforcement when available.
4. Validate `https://gu-xin.com/`, every Portfolio and reserved route, sitemap, robots policies, assets, canonical and Open Graph metadata, the RF Dashboard bytes and export, browser console, and runtime requests.
5. Verify `www.gu-xin.com` redirects to the apex.

After the custom domain is activated, the existing `https://kkkrrrkrkr.github.io/personal-portfolio/` URL may redirect to the configured custom domain. Treat that behavior as part of live cutover validation, not as a result completed by this preparation branch.

## Preserved boundaries

- Contact remains exactly `Email —`, `LinkedIn —`, and `GitHub —`, with no public destinations.
- Compliance Plan Generator remains in active development with no public demo, repository URL, documentation URL, or production claim.
- Technical Notes and Resume remain outside navigation and the production sitemap, with the existing production and preview indexing rules.
- No analytics, telemetry, cookies, CMS, backend, API, or account system is introduced.
- RF Dashboard Light remains standalone static HTML version `0.1.1`, with its reviewed dataset, seven-field CSV export, visible disclaimer, and `noindex, follow` policy unchanged.
- Frozen RF Dashboard SHA-256: `D3165ECBA5AD073252F8AAFDA2CE33D512236CCE809C3F4BA24BB6E3806D7561`.
