# Mahmoud Fawzy — Portfolio

Personal portfolio of Mahmoud Fawzy, a self-taught full-stack software engineer.

**Live:** https://mahmoud2004540.github.io/Website/

## Contents

| Path | What it is |
| --- | --- |
| `index.html` | The portfolio (HTML, CSS and JS in one file) |
| `cv.html` | Printable CV — use the "Save as PDF" button |
| `assets/` | Project screenshots |
| `business-management-ai-website/` | Landing page and user guide for Business Management AI (Arabic / English / Italian) |
| `og-image.png` | Social preview image |
| `sitemap.xml`, `robots.txt` | SEO |

## Tech

Plain HTML, CSS and JavaScript, no build step. Animations use
[GSAP](https://gsap.com/) + ScrollTrigger and smooth scrolling uses
[Lenis](https://lenis.darkroom.engineering/), both loaded from a CDN.
The site respects `prefers-reduced-motion`.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Every push to `main` deploys to GitHub Pages through
`.github/workflows/deploy-pages.yml`. Update the `<lastmod>` dates in
`sitemap.xml` after significant content changes.
