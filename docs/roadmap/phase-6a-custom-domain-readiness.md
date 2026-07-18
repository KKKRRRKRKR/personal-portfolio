# Phase 6A — Custom Domain Readiness

**Status:** Completed and merged on 2026-07-18. Repository readiness only; `gu-xin.com` is not live or bound to GitHub Pages.

**Readiness date:** 2026-07-18

## Domain state

- Future canonical host: `https://gu-xin.com`
- Future canonical path: `/`
- Future canonical domain: apex `gu-xin.com`
- Planned redirect: `www.gu-xin.com` to `gu-xin.com`
- GitHub account-level ownership verification: completed successfully
- The Cloudflare verification TXT record must remain in place. GitHub documents that retaining this TXT record keeps ownership verification active.
- Current production remains `https://kkkrrrkrkr.github.io/personal-portfolio/`.

This phase does not add apex `A` or `AAAA` records, does not add a `www` `CNAME`, does not modify the repository Pages custom-domain setting, and does not create a repository `CNAME` file. GitHub states that a `CNAME` file is not required for a custom GitHub Actions Pages publishing source. No DNS, Pages binding, production deployment, or domain cutover occurs in Phase 6A.

GitHub references:

- [Managing a custom domain for a GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verifying a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [Securing a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

## Deployment profile contract

The profile name is selected explicitly. It is not inferred from a branch, event, pull-request URL, or deployment URL.

| Profile         | Site URL                                          | Base path             | Phase 6A use                                                    |
| --------------- | ------------------------------------------------- | --------------------- | --------------------------------------------------------------- |
| `github-pages`  | `https://kkkrrrkrkr.github.io/personal-portfolio` | `/personal-portfolio` | Current production artifact and pull-request preview validation |
| `custom-domain` | `https://gu-xin.com`                              | empty                 | Non-deploying root-domain readiness build and validation        |

`website/config/deployment-profiles.mjs` is the authoritative contract. Unsupported or missing profile names and contexts fail before a build or validation starts. The contract supplies `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BASE_PATH`, and `NEXT_PUBLIC_DEPLOYMENT_CONTEXT` to the static Next.js export.

From `website/`, the deterministic gates are:

```text
npm run build:validate:github-pages
npm run build:validate:custom-domain
npm run build:validate:preview
npm run build:validate:custom-domain-preview
```

The GitHub Actions deployable artifact continues to use `github-pages`. A separate job builds and validates `custom-domain` but never uploads that output as the Pages artifact. Pull requests do not deploy.

## Dependency audit note

The Phase 6A locked install completed successfully with npm 11.9.0 and reported two moderate-severity audit findings in the committed dependency graph. This readiness phase does not run `npm audit fix`, automatically update dependencies, or modify `package-lock.json`; remediation remains a separate reviewed maintenance task.

## Preserved release and public-content boundaries

- The Portfolio remains a static Next.js export with trailing-slash routes and unoptimized static images.
- Contact remains exactly `Email —`, `LinkedIn —`, and `GitHub —`, with no links or published destinations.
- Compliance Plan Generator remains in active development, has no public demo or public destination, exposes no proprietary rule content, requires human review, and does not assign AI final applicability decisions.
- Technical Notes and Resume remain outside primary and footer navigation. Production metadata is `noindex, follow`; preview metadata is `noindex, nofollow`; both routes remain absent from production and preview sitemaps.
- No analytics, telemetry, cookies, CMS, backend, API, account system, or external runtime dependency is introduced.
- RF Dashboard Light remains standalone static HTML, version `0.1.1`, with its public-safe data, seven-field CSV export, visible disclaimer, and `noindex, follow` policy unchanged.
- Frozen RF Dashboard SHA-256: `D3165ECBA5AD073252F8AAFDA2CE33D512236CCE809C3F4BA24BB6E3806D7561`.

## Future cutover sequence

The following is a later, separately approved production operation. Reconfirm GitHub's published DNS endpoints at cutover time; do not copy provider addresses from an old runbook without verification.

1. Confirm the latest `main` `github-pages` deployment is healthy, the Phase 6A gates pass, the Dashboard hash matches, and the domain-verification TXT record is still present.
2. Prepare and approve a small cutover change that switches only the deployable artifact from the `github-pages` profile to `custom-domain`. Keep the readiness jobs for both profiles. Do not merge it yet.
3. In repository **Settings → Pages**, save `gu-xin.com` as the custom domain. For an Actions publishing source, do not add a `CNAME` file.
4. In Cloudflare, add the current GitHub Pages apex records documented by GitHub and add `www` as a `CNAME` directly to `kkkrrrkrkr.github.io` without a repository path. Retain the verification TXT record. Avoid wildcard or conflicting apex/`www` records. Use DNS-only resolution while GitHub validates and provisions the certificate unless a separately tested Cloudflare proxy configuration is approved.
5. Verify public DNS for the apex and `www` names. GitHub notes DNS propagation can take up to 24 hours.
6. Merge the approved cutover change and allow the `main` workflow to upload only the `custom-domain` root artifact. Do not upload the readiness job's output.
7. Wait for GitHub's custom-domain DNS check and automatic Let's Encrypt certificate provisioning. GitHub says HTTPS can take up to an hour after configuration, while the **Enforce HTTPS** option can take up to 24 hours to become available. If CAA records exist, ensure they permit `letsencrypt.org`.
8. Enable **Enforce HTTPS** when available, then verify `https://gu-xin.com/`, every Portfolio and reserved route, the Dashboard route and hash, metadata, sitemap, robots policies, assets, browser console, network requests, and the seven-field CSV export.
9. Verify `https://www.gu-xin.com/` redirects to the apex. GitHub documents that when the apex is configured as the Pages custom domain and both DNS names are configured correctly, `www` redirects to the apex.
10. Record the deployed commit, workflow run, DNS evidence, certificate state, redirect result, and production validation. Only then may the migration be marked complete.

Binding the custom domain can change how GitHub serves or redirects the default `github.io` URL. Treat steps 3–8 as one controlled maintenance window and do not claim success until the HTTPS root build is validated.

## Exact rollback sequence

1. Stop further cutover changes and record the failing deployment and observed behavior.
2. Revert the deployable workflow to the `github-pages` profile and prepare the known-good project-path artifact.
3. Remove `gu-xin.com` from repository **Settings → Pages**, then deploy the known-good `github-pages` artifact from `main`.
4. Remove only the cutover apex `A`/`AAAA` records and `www` `CNAME` from Cloudflare. Retain the GitHub ownership-verification TXT record.
5. Verify `https://kkkrrrkrkr.github.io/personal-portfolio/`, all routes and assets, the Dashboard action and SHA-256, metadata, robots, sitemap, console, network, and export behavior.
6. Confirm `gu-xin.com` is no longer represented as live and record the rollback commit, workflow run, DNS state, and validation result.

If only application content is faulty while DNS, Pages binding, and HTTPS are healthy, a reviewed custom-domain artifact rollback may be deployed before removing the binding. If the binding, DNS, or certificate is faulty, use the full rollback above.
