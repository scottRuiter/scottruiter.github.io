# TODO

## Urgent — before next push

- [ ] **DEPLOY: nothing from the July 2026 passes has been committed or pushed yet.**
      The live site still serves the old build — `/notes/`, `/resume.html`, `/projects/`,
      `404.html`, `sitemap.xml`, `robots.txt` all return 404 on scottruiter.github.io.
      To deploy: `git add -A && git commit -m "Recruiter upgrade: notes, projects, resume, demo, SEO" && git push`
- [ ] Confirm `resume.pdf` matches `resume.html` and homepage content (title, dates, headline projects)
- [ ] Camera originals in `images/` are gitignored — keep generating web assets via `_tools/optimize_images.py`

## Done (July 2026 — thoroughness redo pass)

- [x] Demo rebuilt (`assets/js/demo.js`): realistic pose-error model (rotation + translation +
      per-pin noise with true outliers — old version could never produce a FAIL), µm-scale
      readout on pin click (aria-live), reduced-motion support, resize preserves current step.
      Verified in browser: PASS 92 / FAIL 4, outlier click reads "Pin R5-C3 — 191 µm vs 120 µm — FAIL"
- [x] 404.html: absolute paths (GitHub Pages serves 404 from nested URLs — relative paths broke),
      added nav links and Notes CTA
- [x] Notes rewritten as full articles (3–4× content) with complete navs (old pages had a
      logo-only nav), prev/next links, canonical, complete OG + Twitter meta, TechArticle JSON-LD
- [x] Project pages: added "My role" + "Stack" sections, JSON-LD on all three, canonical URLs,
      consistent six-link navs
- [x] UI.html / overview.html: OG + Twitter meta, canonical, Notes nav link, resume.html link
- [x] resume.html: Person JSON-LD, "Software & Tools I Built" + "Global Deployment" sections,
      print CSS fixed (dim text was unreadable on white)
- [x] site.css: focus-visible outlines, demo readout style; homepage images given width/height
      and descriptive alt text
- [x] Verified in browser: demo all 3 steps + pin click, notes, resume, 404, project page;
      zero console errors, zero failed requests

## Done (July 2026 — full recruiter upgrade)

- [x] `.gitignore` for large camera originals; `404.html`, `robots.txt`, `sitemap.xml`
- [x] JSON-LD Person schema + Twitter cards on homepage; OG on subpages
- [x] Recruiter summary bar, third hero CTA, mobile section nav
- [x] Evidence blocks (problem / approach / result) on signature impact cards
- [x] Interactive fixtureless alignment demo (`#demo`, `assets/js/demo.js`)
- [x] Engineering photography strip linking to gallery filter
- [x] Three project case-study pages in `projects/`
- [x] Engineering notes section (`notes/`) with three write-ups
- [x] `resume.html` synced with site content + print stylesheet
- [x] TopX page rebalanced: manufacturing software first, NFT strip moved lower

## Done (July 2026 — positioning + AI graphics pass)

- [x] Homepage rebuilt around the new positioning document: "From Pixels to Production Decisions"
      hero, Core Positioning (Vision Engineering / Industrial Software / Manufacturing Intelligence /
      Applied AI), Signature Engineering Impact, engineering-philosophy band
- [x] New "Software & Tools I Build" section: VisionPro Forge, TopX Inspection Analyzer,
      Pin Grid Generator, Knowledge Chat, LJX 3D Acquisition Interface, Advanced Vision Systems at UIC
- [x] New "Global Factory Deployment" section with map graphic
- [x] 8 AI-generated graphics in `images/web/ai-*.jpg`

## Backlog

- [ ] Add real Inspection Analyzer / VisionPro Forge screenshots when available for case-study pages
- [ ] Decide fate of `testbed.html` and legacy jQuery template assets
- [ ] Consider compressed hero video loop (<5 MB) for the homepage
- [ ] LinkedIn recommendation snippets if/when available (do not invent testimonials)
