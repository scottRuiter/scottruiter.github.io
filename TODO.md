# TODO

## Urgent — before next push

- [ ] `images/20260423_125216.mp4` is **239 MB** — GitHub hard-rejects files over 100 MB, so
      `git push` will fail. Remove it, move it to Git LFS, or host it externally (YouTube/Drive).
- [ ] Consider whether the other camera originals (10–50 MB each, ~700 MB total in `images/`)
      should live in the repo at all. The site only uses `images/web/`. Options: keep originals
      out of git (`.gitignore`), or accept the repo size.

## Done (July 2026 — positioning + AI graphics pass)

- [x] Homepage rebuilt around the new positioning document: "From Pixels to Production Decisions"
      hero, Core Positioning (Vision Engineering / Industrial Software / Manufacturing Intelligence /
      Applied AI), Signature Engineering Impact (fixtureless grid inspection, weak-lead recovery,
      3D line-scan, connector/press-fit + AOI/RMA analytics), engineering-philosophy band
- [x] New "Software & Tools I Build" section: VisionPro Forge (AVPTRAINING), TopX Inspection
      Analyzer (CSVMODLER), Pin Grid Generator (GRIDGENERATOR), Knowledge Chat (UICAIKNOWLEDGE),
      LJX 3D Acquisition Interface (LJX_Device.cs), Advanced Vision Systems at UIC
- [x] New "Global Factory Deployment" section: Vietnam, Guadalajara/Mexicali, Houston, Taiwan,
      Thailand + field-execution narrative
- [x] UIC title corrected to "Application Specialist III — Advanced Vision & Field Engineering
      Support"; Rlab/TopX merged into a single founder entry (Oct 2014)
- [x] 8 AI-generated graphics matched to the site palette (`images/web/ai-*.jpg`): hero laser-scan
      scene, 5 tool thumbnails, global deployment map, weak-lead recovery macro
- [x] TopX page: added "TopX Inspection Analyzer" section bridging manufacturing and the portfolio

## Done (July 2026 — LinkedIn content pass)

- [x] Removed all Telegram links and CTAs site-wide (footers, TopX CTA, Dashboard CTA)
- [x] Homepage About expanded with the LinkedIn summary narrative ("systems that must survive
      factory conditions"; "measure, reason, adapt, and scale")
- [x] Experience timeline expanded to 5 entries: UIC (corrected title: Sr. Application Specialist),
      TopX (Apr 2013), Rlab Development (Oct 2014), Ram Electronics (both roles + key
      accomplishments), Grand Theatre (the CS-degree story)
- [x] Education section expanded: degree years, IPC-A-610/J-STD-001 (CIS), R coursework,
      top skills (Process Optimization, Computer Vision, Photophysics), languages
- [x] Contact: added phone (616) 502-6608 and "open to relocation and international assignments"
- [x] TopX page rebuilt with full detail: mission narrative, Solidity development + solution
      architecture, TopXFin/TopXAgents, EVM research + on-chain trading, reinforcement gym,
      multi-modal SLM agents, NFT strip

## Done (July 2026 redesign)

- [x] Immersive scroll redesign: new design system (`assets/css/site.css`) + scroll engine
      (`assets/js/site.js`) — progress bar, parallax, reveal animations, count-up stats
- [x] Homepage rebuilt from the current resume: hero, impact stats, technical core, client
      marquee (NVIDIA, Amazon, Cisco, Celestica, Fabrinet, Ingrasys, Amphenol, Raytheon, Arista),
      selected projects, experience timeline, education/certs, recruiter-focused contact section
- [x] Resume data corrections on site: title (Application Engineer III — Advanced Vision, 3D
      Metrology & Automation), B.S. Computer Science, A.S. Business/Management/Marketing,
      Ram Electronics history, Independent AI/Data/Blockchain work
- [x] Gallery page: filterable masonry gallery (Travel / Engineering / AI Art / Life) with
      keyboard-navigable lightbox, replacing the old 6-slide carousel
- [x] TopX page reskinned: pillars, trading systems, multi-modal agent research, NFT art strip
- [x] Dashboard and Snapshot pages reskinned into the new shell; widgets set to transparent dark
- [x] Image pipeline: `_tools/optimize_images.py` generates `images/web/` (~70–300 KB each) from
      the 10–50 MB camera originals; dedicated 64px favicon
- [x] Open Graph tags on the homepage; per-page titles and meta descriptions
- [x] Reduced-motion support (`prefers-reduced-motion`) for all animations

## Backlog

- [ ] Add a custom `404.html` for GitHub Pages
- [ ] Open Graph / Twitter card tags on subpages (homepage done)
- [ ] Decide fate of `testbed.html` and the legacy template assets
      (`assets/css/main.css`, jQuery plugins) — only testbed uses them now
- [ ] Consider a short intro video or 3D scan visualization for the hero (compressed, <5 MB)
- [ ] Add JSON-LD structured data (Person schema) for richer search results
- [ ] Blog/notes section for vision engineering write-ups (great recruiter signal)
- [ ] Unused meme/NFT PNGs in `images/` root that didn't make the curated set — prune or archive
