# Phase 4 Deployment Architecture

## Decision

Phase 4 uses GitHub Pages for both the XG Portfolio and RF Dashboard Light. GitHub is the only already-authenticated static host available in the release environment: the repository is public, the connected account has administration and push permission, and neither Vercel nor Cloudflare has an installed CLI, repository configuration, or local authentication state.

The generated HTTPS site is:

- Portfolio: `https://kkkrrrkrkr.github.io/personal-portfolio/`
- RF Dashboard Light: `https://kkkrrrkrkr.github.io/personal-portfolio/tools/rf-dashboard-light/`

No custom domain is used in Phase 4.

## Same-site fallback and isolation

GitHub Pages provides one site per repository, so Phase 4 uses the approved `/tools/` fallback rather than two hosting projects. The Dashboard remains implementation-isolated:

- the Next.js editorial application is built from `website/`;
- the reviewed standalone Dashboard artifact is versioned at `deploy/rf-dashboard-light/index.html`;
- `website/scripts/package-static-site.mjs` verifies the release hash and copies the artifact into the final export only after the Portfolio build;
- no Dashboard code is imported into React, no iframe is used, and the Portfolio connects through the typed live-tool destination.

## Preview and production model

GitHub Pages does not provide generally available pull-request preview URLs. The Phase branch therefore deploys an early release-candidate build to the provider URL with `NEXT_PUBLIC_DEPLOYMENT_CONTEXT=preview`. After the Phase pull request is merged, the same technical target is promoted by the `main` build with `NEXT_PUBLIC_DEPLOYMENT_CONTEXT=production`.

The contexts differ as follows:

| Surface          | Preview                                                            | Production                                                                |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Portfolio robots | `noindex, nofollow`; `robots.txt` disallows all                    | `index, follow`; `robots.txt` allows all and publishes the sitemap        |
| RF action        | `Open Dashboard preview`; live-tool and deployment state `preview` | `Open RF Dashboard`; live-tool `available`, deployment state `production` |
| Dashboard robots | `noindex, follow`                                                  | `noindex, follow`                                                         |
| URL              | Provider URL                                                       | Same provider URL after `main` promotion                                  |

Only the successful deployment at a given time is served. There is no duplicate indexed Portfolio preview.

The temporary Phase-branch deployment permission was used only to validate the early release candidate. After production promotion and closure it was retired: pushes deploy only from `main`, while pull requests still run the complete preview-context build and validation without publishing over production.

## Routing and static assets

The Next.js application retains `output: "export"` and trailing-slash routes. GitHub Pages builds use `/personal-portfolio` as `basePath` and `assetPrefix`; local development retains an empty base path. Public evidence image paths are derived from the same build configuration rather than hard-coded provider paths.

Every Portfolio route exports a directory `index.html`, so direct refresh works on Pages. The export includes the generated 404 document, `robots.txt`, `sitemap.xml`, `.nojekyll`, and the Dashboard tool directory. The build remains serverless and requires no CMS, database, API, or runtime package.

## Release identity and cache behavior

RF Dashboard Light 0.1.1 is deterministically derived from the approved 0.1.0 public-safe candidate. The 0.1.1 patch adds release/indexing metadata, visible focus styling, and keyboard focus retention after country-row expansion. It does not change the public dataset, filtering, layout, or CSV schema.

- Approved 0.1.0 candidate SHA-256: `47B1502AFC2D8758F78D25804E405768B845FE683CF485036D0BC86EF8B6A76C`
- 0.1.1 deployment artifact SHA-256: `D3165ECBA5AD073252F8AAFDA2CE33D512236CCE809C3F4BA24BB6E3806D7561`
- Release transform SHA-256: `1E015F50E3DD5C2E58361AD8AD89C5E55B19375ACE1E26A995E6DBF48631B612`

The Dashboard URL remains stable while the visible semantic version and recorded hash identify its bytes. GitHub Pages controls response caching; immutable Next.js assets remain content-hashed. A new Dashboard release must update the version, artifact, manifest, Portfolio record, and release documentation together.

The repository marks `deploy/rf-dashboard-light/index.html` as non-text in `.gitattributes` so Windows line-ending conversion cannot alter the hash-locked release bytes after checkout.

## Security and privacy

GitHub Pages does not support repository-defined per-path response headers, so this architecture cannot truthfully claim custom `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, or `frame-ancestors` response headers. The Portfolio and Dashboard emit `strict-origin-when-cross-origin` referrer metadata, and the Dashboard emits `noindex, follow` robots metadata. External new-tab links use `noopener noreferrer`.

The Dashboard relies on inline CSS and JavaScript. A strict CSP would require a nonce/hash build or a structural rewrite; Phase 4 does not add a permissive CSP merely to claim coverage. The artifact has zero third-party runtime requests, no analytics, no telemetry, no import/admin surface, and no runtime credential.

## Deployment workflow

`.github/workflows/deploy-pages.yml` validates pushes to `main`, pull requests targeting `main`, and manual runs. It installs the locked dependency tree, runs formatting, type, lint, static build, packaging, and release validation. Only `main` pushes and deliberate manual runs upload and deploy the Pages artifact; pull requests validate without deployment. The `github-pages` environment serializes deployments.

## Rollback

Portfolio rollback means redeploying the static export from a recorded Git commit. Dashboard rollback means restoring a recorded `deploy/rf-dashboard-light/index.html` and its matching release manifest, then redeploying. The typed RF destination can be reverted to `planned` to hide the public action without changing the immutable original source. Detailed commands are in [Rollback](../runbooks/rollback.md).

## Accepted limitations

- GitHub Pages uses one provider URL for the Phase preview and production promotion.
- Response security headers are provider-controlled.
- The Dashboard is desktop-first; its Spectrum Detail matrix intentionally scrolls horizontally.
- Dense axis labels, compact controls, whitespace in some expanded rows, row hierarchy, and the oversized evidence-row flag remain documented non-blocking limitations.
- Custom-domain work and analytics remain deferred.
