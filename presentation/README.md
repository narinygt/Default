# CPeak Consultancy — corporate presentation

Two decks, same design system, 14 slides each, 16:9 (13.333 × 7.5 in):

- `CPeak-Consultancy-Corporate-Presentation-EN.pptx` — English
- `CPeak-Consultancy-Kurumsal-Sunum-TR.pptx` — Türkçe

An executive deck built from the same brand system as the site. It is **not** a slide
version of the website: the narrative, headlines, diagrams and slide sequence are written
for a client meeting, and every fact in it comes from `src/data/`. The Turkish deck is
written in the register of the site's own Turkish content, not translated word for word.

## Narrative

| # | English | Türkçe |
|---|---|---|
| 01 | Finance-led SAP transformation | Finans odaklı SAP dönüşümü |
| 02 | Depth over breadth | Genişlik değil, derinlik |
| 03 | Early decisions, lasting consequences | Erken kararlar, kalıcı sonuçlar |
| 04 | Three disciplines, one practice | Üç disiplin, tek uzmanlık |
| 05 | Evidence before advice | Tavsiyeden önce kanıt |
| 06 | A measured cloud decision | Ölçülmüş bir bulut kararı |
| 07 | Four stages, four deliverables | Dört adım, dört çıktı |
| 08 | From capability to outcome | Yetkinlikten sonuca |
| 09 | Five areas of expertise | Beş uzmanlık alanı |
| 10 | AI in the system and in delivery | Sistemde ve teslimde yapay zeka |
| 11 | Clear boundaries | Net sınırlar |
| 12 | Three engagement models | Üç çalışma modeli |
| 13 | Experience in complex landscapes | Karmaşık yapılarda deneyim |
| 14 | Senior consultants, start to finish | Baştan sona kıdemli ekip |

## Design system

Brand tokens come from `src/styles/global.css` and the logo files: teal `#11676A`,
navy `#003F82`, ink `#0E1620`, paper `#F7F8F7`, rule `#C9D6DE`, amber `#E8B33A` as the
single accent (`#F5DCA4` for small text on dark). Type: Schibsted Grotesk (display),
Inter (body), IBM Plex Mono (labels). The recurring motif is the site's own
ledger-rules-dissolving-into-a-network figure.

Only facts published on the site are used. No client names, project outcomes, headcount,
certifications or partnership claims appear anywhere — and neither does any pricing, fee,
cost or payment information.
headcount, certifications or partnership claims are attached to anything.

## Rebuilding

```bash
cd presentation/build
npm install pptxgenjs sharp     # if not already available
node assets.js                  # textures, logos and reference marks into build/img
node deck.js en                 # writes ../CPeak-Consultancy-Corporate-Presentation-EN.pptx
node deck.js tr                 # writes ../CPeak-Consultancy-Kurumsal-Sunum-TR.pptx
python3 check.py                # geometry QA — see below
```

All copy for both languages lives in `content.js`; `deck.js` holds the layout only, so a
wording change never touches geometry and both decks stay in step.

### Geometry QA

`deck.js` writes a scene graph (`scene-en.json`, `scene-tr.json`) alongside each deck.
`check.py` measures every text run with the real brand fonts, works out its wrapped
extent, and reports overflow, text-on-text overlap, rules crossing text, text over
images, and anything inside the 0.5" slide margin. Both decks currently report zero
issues. Run it after any copy change — Turkish sets longer than English, so a headline
that fits in one deck can overrun in the other.

`assets.js` reads the brand and reference artwork from `public/`; `refs.json` mirrors the
logo list and natural dimensions in `src/data/references.ts`.
