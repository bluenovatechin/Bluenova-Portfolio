# BlueNova Tech — portfolio

Live at **https://portfolio.bluenovatech.in/** (GitHub Pages).

React + Vite. The page is pre-rendered to static HTML at build time, so search engines and AI tools
see the full content without running JavaScript.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/ (pre-rendered, with sitemap/robots/llms.txt)
npm run preview  # serve the production build locally
```

## Editing content

All text, clients, services, FAQs, SEO title/description and the site address live in
`src/data/site.js`. Search it for `TODO` to find what still needs real information.

- `brand.siteUrl`: the public address. The canonical URL, sitemap, robots.txt and social previews all use it.
- `areas`: the cities shown on the page and in the structured data.

### Instagram posts

The Instagram section shows real posts, saved locally in full quality (so they load fast and stay sharp).
To add a new post: copy its link in Instagram, paste it at the top of `instagramPosts` in
`src/data/site.js`, then run:

```bash
npm run instagram   # downloads new posts into public/instagram/ and src/data/instagram.json
```

Commit the new files and push. Add `-- --force` to re-download everything.

Images live in `public/`:

- `public/brand/`: the BlueNova mark (SVG). `public/favicon.svg` is a copy; `public/icons/` holds the PNG app icons.
- `public/logos/`: client logos, 160×160 WebP. Bigger originals (400px+, ideally PNG/SVG) would look sharper in the logo section.
- `public/instagram/`: Instagram posts (1080px and 480px WebP), written by `npm run instagram`.
- `public/work/`: website screenshots, 1600px and 800px WebP (phones get the 800px version).
- `public/og-image.jpg`: the 1200×630 image shown when the link is shared.

## SEO files (generated on build by `scripts/seo.js`)

- `<head>` tags: title, description, canonical, Open Graph, Twitter card, geo tags.
- JSON-LD structured data: Organization / ProfessionalService, WebSite, WebPage, FAQPage.
- `sitemap.xml` (with image entries), `robots.txt`, `llms.txt` (summary for AI assistants).

## Deploying

Every push to `main` builds and publishes the site via `.github/workflows/deploy.yml`.
`public/CNAME` sets the custom domain.

The old version of the site is kept locally in `_legacy/` (not committed) and can be deleted.
