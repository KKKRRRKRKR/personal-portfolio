# Portfolio Rollback Runbook

## Rollback triggers

Rollback when the public Portfolio or Dashboard exposes sensitive content, loses a critical route or control, serves an incorrect artifact hash, breaks the RF link, or fails a required production check that cannot be safely corrected immediately.

## Portfolio rollback

1. Identify the last validated production commit and its GitHub Pages deployment.
2. Create a reviewable revert of the release commit(s); do not force-push `main`.
3. Run the production-equivalent build and validation from [Production Deployment](./production-deployment.md).
4. Merge the revert and allow the `main` Pages workflow to redeploy.
5. Test the provider URL and record the replacement deployment identity.

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

## Dashboard rollback

Restore both files from the last validated release commit:

- `deploy/rf-dashboard-light/index.html`
- `deploy/rf-dashboard-light/release-manifest.json`

Verify the restored hash before deploying:

```powershell
Get-FileHash -Algorithm SHA256 deploy/rf-dashboard-light/index.html
```

Run `npm run build:deploy` and `npm run validate:deploy -- --context=production` from `website/`, then deploy through a reviewed commit. The immutable original Dashboard source is not required for rollback.

## Hide the RF action without removing the case study

If the standalone tool must be withdrawn, change only the RF typed destination to `planned`, return deployment state to the truthful non-public state, update the disclosure/release records, validate, and deploy through Git. The RF case study and authentic evidence may remain if they are still public-safe.

## Verification

- Portfolio and Dashboard hashes match the selected rollback commit.
- The RF destination is either the verified public URL or intentionally absent.
- CPG remains unchanged and has no live tool.
- Robots behavior matches the restored deployment context.
- No force push, destructive history rewrite, or dependency on the unsanitized source occurred.
