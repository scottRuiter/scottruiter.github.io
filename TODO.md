# TODO

## Done (July 2026 — desktop + mobile polish)

- [x] Hero slimmed: shorter subcopy, 2 CTAs, mobile kicker (`Vision · Metrology · AI`), top-aligned on ≤760px
- [x] Removed sticky mobile section-nav chips (hamburger only — less vertical chrome)
- [x] Hero stats/chips trimmed on mobile (2 stats, 3 chips)
- [x] Experience timeline condensed; full bullets live on `resume.html`
- [x] Demo: larger touch hit radius, pointer events, **Inspect outlier** button
- [x] Top Skills expanded into four groups (Vision/Metrology, Software/Data, Manufacturing, Applied AI); languages split to own card; Vietnamese added
- [x] About image: fixed Y-stretch with `object-fit: cover` frame; new line-scan connector renders (`about-connector-scan.jpg` / `about-linescan-booth.jpg`)
- [x] Hero stats: fifth card — 20+ Site Deployment Locations
- [x] Recruiter bar rebalanced: location + CTAs on one row, chips full-width below
- [x] Manufacturing Meets TopX: VisionPro Forge + offline Knowledge Chat featured alongside Inspection Analyzer
- [x] Resume blank-until-scroll: remove giant `.reveal` wrapper; page-hero reveals visible; IO threshold fixed for tall blocks
- [x] Unify all footers: © Scott Ruiter · ProfitruiteR™ · New York, USA
- [x] Hero 5th stat: 20+ Site Deployment Locations (replaced IP/patent card)
- [x] Marquee expanded: customers + platforms, regions, capabilities, tools
- [x] Gallery: 7 fixtureless 3D scan / mesh / overlay images under Engineering
- [x] Mobile pass: hero shows 20+ sites + 2D/3D (2×2); denser marquee; about/TopX spacing; recruiter CTAs; cache-bust CSS sitewide
- [x] TopX toolbox: replace text-only column with full image feature rows (Pin Grid + scan mesh)
- [x] TopX generative section: AI art / SceneForge focus; Doge Division as character series subset
- [x] Lightbox: auto-inject viewer on any page with `.g-item` (TopX art grids, gallery)
- [x] Dashboard/Snapshot TradingView: visible widgets, ETH chart boot wait, stale symbols fixed (POL, NASDAQ 100, USD/JPY, LDO for MKR, DeFi)
- [x] Dashboard ticker picker: choose symbol for quote / TA / advanced chart (localStorage)
- [x] Strip dead tickers (XU100, Fed Funds, MATIC, MKR, ZRX/KNC/BNT/UFT/DATA); Snapshot rows = 4 proven symbols only
- [x] Dashboard custom ticker input + mobile picker/chart layout
- [x] AI majors + partners on Snapshot and Dashboard (NVDA, MSFT, GOOGL, META, AMD, AVGO, TSM, ARM, …)

## Urgent — before next push

- [ ] Confirm `resume.pdf` matches `resume.html` and homepage content (title, dates, headline projects)
- [ ] Camera originals in `images/` are gitignored — keep generating web assets via `_tools/optimize_images.py`
- [ ] Commit + push this polish pass when ready

## Backlog

- [ ] Add real Inspection Analyzer / VisionPro Forge screenshots when available for case-study pages
- [ ] Decide fate of `testbed.html` and legacy jQuery template assets
- [ ] Consider compressed hero video loop (<5 MB) for the homepage
- [ ] LinkedIn recommendation snippets if/when available (do not invent testimonials)
- [ ] Optional visual direction pass (less generic dark/cyan portfolio look; lean on real connector photography)
