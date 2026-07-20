# Portfolio Rollback Runbook

## Rollback triggers

Rollback when the public Portfolio or Dashboard exposes sensitive content, loses a critical route or control, serves an incorrect artifact hash, breaks the RF link, or fails a required production check that cannot be safely corrected immediately.

## Portfolio rollback

1. Identify the last validated production commit and its GitHub Pages deployment.
2. Create a reviewable revert of the release commit(s); do not force-push `main`.
3. Run the production-equivalent build and validation from [Production Deployment](./production-deployment.md).
4. Merge the revert and allow the `main` Pages workflow to redeploy.
5. Test the canonical production URL and record the replacement deployment identity.

GitHub Pages keeps deployment history in the `github-pages` environment. A prior deployment is also recoverable by rebuilding its recorded Git commit rather than relying on mutable local output.

### Phase 5 metadata and asset rollback

If Phase 5 introduces a critical canonical, indexing, privacy, social-preview, or browser-identity failure, revert the Phase 5 merge through a reviewed pull request. Rebuild in both preview and production contexts and confirm:

- approved production routes regain the last validated canonical and metadata output;
- preview routes remain noindex and the preview sitemap remains empty;
- Technical Notes and Resume remain noindex and absent from navigation and sitemap;
- Contact placeholders remain noninteractive and contain no private destination;
- the shared social preview and icons either match the last validated release or are removed together with their metadata references;
- the frozen RF Dashboard artifact and manifest remain byte-identical.

Do not use a temporary custom domain, publish a Contact destination, change the Dashboard artifact, or weaken metadata validation as a rollback shortcut.

### Phase 7A public contact rollback

If an approved public Contact destination or Person identity record is incorrect, revert the Phase 7A merge through a reviewed pull request and redeploy the last validated custom-domain artifact. Confirm that Contact, metadata, structured data, sitemap, robots, privacy validation, and browser smoke results match the selected rollback commit.

Do not replace the approved destinations with an inferred social profile, contact form, backend, CAPTCHA, analytics, tracking, or inaccessible script-based email treatment. Preserve the frozen RF Dashboard artifact and manifest throughout the rollback.

### Phase 6 custom-domain rollback

If application content is faulty but DNS, the Pages binding, and HTTPS are healthy, revert the faulty release through a reviewed pull request and redeploy a known-good `custom-domain` artifact. Revalidate the apex, `www` redirect, metadata, assets, sitemap, robots, privacy boundary, and Dashboard hash.

If the custom-domain binding, DNS, or certificate state is faulty and a full domain rollback is required:

1. Stop further cutover changes and record the failing deployment and public behavior.
2. Restore the deployable workflow to the validated `github-pages` profile and rebuild its known-good project-path artifact.
3. Remove `gu-xin.com` from repository **Settings → Pages** when the binding must be withdrawn.
4. Remove the four cutover apex `A` records and the cutover `www` `CNAME` from Cloudflare.
5. Retain the GitHub account-level ownership-verification TXT record.
6. Deploy the reviewed `github-pages` artifact from `main`.
7. Verify `https://kkkrrrkrkr.github.io/personal-portfolio/`, all Portfolio routes and assets, metadata, robots, sitemap, the Dashboard route, and the frozen Dashboard SHA-256.

Do not add a repository `CNAME` file, enable Cloudflare proxying as a rollback shortcut, remove the ownership-verification TXT record, force-push, or rewrite history.

## Dashboard rollback

Restore both files from the last validated release commit:

- `deploy/rf-dashboard-light/index.html`
- `deploy/rf-dashboard-light/release-manifest.json`

Verify the restored hash before deploying:

```powershell
Get-FileHash -Algorithm SHA256 deploy/rf-dashboard-light/index.html
```

Run the matching `npm run build:validate:custom-domain` or `npm run build:validate:github-pages` profile from `website/`, then deploy through a reviewed commit. The immutable original Dashboard source is not required for rollback.

## Hide the RF action without removing the case study

If the standalone tool must be withdrawn, change only the RF typed destination to `planned`, return deployment state to the truthful non-public state, update the disclosure/release records, validate, and deploy through Git. The RF case study and authentic evidence may remain if they are still public-safe.

## Verification

- Portfolio and Dashboard hashes match the selected rollback commit.
- The RF destination is either the verified public URL or intentionally absent.
- CPG remains unchanged and has no live tool.
- Robots behavior matches the restored deployment context.
- No force push, destructive history rewrite, or dependency on the unsanitized source occurred.
