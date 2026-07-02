# scottruiter.github.io

Portfolio site for Scott A. Ruiter — Industrial Computer Vision, 3D Metrology & AI Automation —
hosted on GitHub Pages. Built as a dark, immersive scroll experience aimed at recruiters and
collaborators. Tagline: *From pixels to production decisions.*

## Pages

| Page | File | Description |
| --- | --- | --- |
| Home | `index.html` | Immersive one-pager: hero, core positioning (4 disciplines), client marquee, signature engineering impact, software & tools (VisionPro Forge, TopX Inspection Analyzer, Pin Grid Generator, Knowledge Chat, LJX 3D interface), global deployment, experience timeline, education, contact |
| TopX | `topx.html` | Independent R&D: blockchain engineering, financial LLMs, AI trading agents, EVM research, NFT art |
| Dashboard | `UI.html` | Live crypto market data and technical analysis (TradingView widgets) |
| Snapshot | `overview.html` | Global market overview: indexes, forex, metals, crypto |
| Gallery | `photography.html` | Filterable photo gallery (Travel / Engineering / AI Art / Life) with lightbox |
| Resume | `resume.pdf` | Downloadable resume |
| Testbed | `testbed.html` | Scratch page for widget experiments (not linked from navigation, still on the old template) |

## Architecture

- **No build step** — plain HTML/CSS/JS, no frameworks, no jQuery on the redesigned pages.
- `assets/css/site.css` — the design system: dark theme tokens, nav, hero, cards, timeline,
  marquee, gallery, lightbox, reveal animations, and reduced-motion support.
- `assets/js/site.js` — scroll behaviors: progress bar, sticky nav state, IntersectionObserver
  reveals, parallax backgrounds, count-up stats, gallery filters, and lightbox. Vanilla JS.
- `images/web/` — web-optimized JPEGs (~70–300 KB) generated from the camera originals in `images/`.
  Regenerate with `python _tools/optimize_images.py` after adding new source photos.
- `images/web/ai-*.jpg` — AI-generated section art (hero laser-scan scene, tool thumbnails for the
  Software & Tools section, global deployment map, weak-lead recovery band). Generated to match the
  site palette (navy `#070b12`, cyan `#4fd1ff`, violet `#7c6cff`).
- `assets/css/main.css`, `assets/js/main.js` and the jQuery plugins are legacy — only `testbed.html`
  still uses them.

## Local preview

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Deployment

Push to `main`; GitHub Pages serves the repository root at https://scottruiter.github.io.

**Warning:** `images/20260423_125216.mp4` is 239 MB. GitHub rejects files over 100 MB — remove it
(or move it to Git LFS / external hosting) before pushing, or the push will fail.

Notes:

- GitHub Pages is case-sensitive; always use forward-slash, correctly-cased asset paths.
- Camera originals in `images/` are large (10–50 MB). Never reference them directly from HTML —
  add them to `_tools/optimize_images.py` and use the `images/web/` output instead.

See `TODO.md` for the improvement backlog.
