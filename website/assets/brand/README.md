# XG brand asset sources

The checked-in social preview and browser identity use deterministic SVG sources and generated PNG artifacts. They preserve the Portfolio's white, black, and grey `Engineering Evidence Editorial` direction and contain no photograph, employer identity, private information, or decorative accent color.

Regenerate the raster assets from `website/` with:

```powershell
npm run generate:brand-assets
```

The script uses a local headless Chrome or Edge executable, adds no production dependency, and writes:

- `public/social/xg-social-preview.png` at 1200 x 630
- `public/icons/apple-touch-icon.png` at 180 x 180

Deployment validation verifies the checked-in raster dimensions and content signatures.
