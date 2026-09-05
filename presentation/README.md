# CPeak Consultancy — corporate presentation

`CPeak-Consultancy-Corporate-Presentation.pptx` — 14 slides, 16:9 (13.333 × 7.5 in).

An executive deck built from the same brand system as the site. It is **not** a slide
version of the website: the narrative, headlines, diagrams and slide sequence are written
for a client meeting, and every fact in it comes from `src/data/`.

## Narrative

| # | Slide | Idea it carries |
|---|---|---|
| 01 | Finance is the least forgiving part of an ERP | Opening position |
| 02 | Depth is a choice, not a limitation | Why the scope is deliberately narrow |
| 03 | The most expensive decisions are taken first | The business problem, as a cost-of-reversal curve |
| 04 | Three disciplines that only make sense together | Finance process · platform · automation |
| 05 | We read the system before we recommend anything | Measure-first, as described vs. executed |
| 06 | We do not sell a cloud model | Public vs. Private as a trade, not a ranking |
| 07 | Nothing starts until the last thing has closed | Four gated stages with deliverables |
| 08 | Expertise is only worth what it changes | Capability → action → outcome |
| 09 | Organised around the question you are asking | The five service areas, reframed |
| 10 | We use AI twice | In the client's processes and in delivery |
| 11 | A specialism is defined by what it excludes | Work deliberately declined |
| 12 | Three shapes | Assessment / Delivery / Expert support |
| 13 | The landscapes the experience comes from | Reference logos |
| 14 | The people named in the proposal turn up | Closing argument and contact |

## Design system

Brand tokens are taken from `src/styles/global.css` and the logo files:
teal `#11676A`, navy `#003F82`, ink `#0E1620`, paper `#F7F8F7`, rule `#C9D6DE`,
amber `#E8B33A` as the single accent (`#F5DCA4` for small text on dark).
Type: Schibsted Grotesk (display), Inter (body), IBM Plex Mono (labels).
The recurring motif is the site's own ledger-rules-dissolving-into-a-network figure.

Only facts published on the site are used. No client names, project outcomes,
revenue, headcount, certifications or partnership claims are attached to anything.

## Rebuilding

```bash
cd presentation/build
npm install pptxgenjs sharp     # if not already available
node assets.js                  # renders textures, logos and reference marks into build/img
node deck.js                    # writes ../CPeak-Consultancy-Corporate-Presentation.pptx
```

`assets.js` reads the brand and reference artwork from `public/`; `refs.json` mirrors the
logo list and natural dimensions in `src/data/references.ts`.
