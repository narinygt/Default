const pptxgen = require('pptxgenjs');
const fs = require('fs');
const IMG = __dirname + '/img';

// ---------- brand tokens (from CPeak's own design system) ----------
const C = {
  ink: '0E1620', teal: '11676A', navy: '003F82', paper: 'F7F8F7', white: 'FFFFFF',
  line: 'C9D6DE', soft: 'E2E9EE', muted: '4A5A67', amber: 'E8B33A', amberL: 'F5DCA4',
  onDark: 'D2DDE6', onDarkDim: '9DB0C0', tealSoft: 'D6E4E4'
};
const F = { d: 'Schibsted Grotesk', b: 'Inter', m: 'IBM Plex Mono' };

const W = 13.333, H = 7.5, ML = 0.85, CW = W - ML * 2;

const pres = new pptxgen();
pres.defineLayout({ name: 'CPEAK', width: W, height: H });
pres.layout = 'CPEAK';
pres.author = 'CPeak Consultancy';
pres.company = 'CPeak Consultancy';
pres.title = 'CPeak Consultancy — Corporate Presentation';

const TOTAL = 14;
let n = 0;

// ---------- helpers ----------
function txt(s, o) { s.addText(o.text, Object.assign({ isTextBox: true, margin: 0 }, o.opt)); }

function eyebrow(s, text, dark, x = ML, y = 0.58) {
  s.addText(text.toUpperCase(), {
    isTextBox: true, margin: 0, x, y, w: CW, h: 0.22,
    fontFace: F.m, fontSize: 9.5, charSpacing: 2.2,
    color: dark ? C.amberL : C.teal, bold: false, valign: 'middle'
  });
}

function footer(s, dark) {
  const col = dark ? C.onDarkDim : C.muted;
  s.addShape(pres.ShapeType.line, {
    x: ML, y: 6.86, w: CW, h: 0,
    line: { color: dark ? 'FFFFFF' : C.line, width: 0.75, transparency: dark ? 78 : 0 }
  });
  s.addText('CPEAK CONSULTANCY', {
    isTextBox: true, margin: 0, x: ML, y: 6.98, w: 5, h: 0.22,
    fontFace: F.m, fontSize: 8, charSpacing: 1.6, color: col, valign: 'middle'
  });
  s.addText(String(n).padStart(2, '0') + ' / ' + TOTAL, {
    isTextBox: true, margin: 0, x: W - ML - 5, y: 6.98, w: 5, h: 0.22, align: 'right',
    fontFace: F.m, fontSize: 8, charSpacing: 1.6, color: col, valign: 'middle'
  });
}

// standard content slide frame
function slide({ dark = false, bg, eb, title, titleSize = 36, titleW = 11.0, titleY = 1.05, tex = null, noFooter = false }) {
  n++;
  const s = pres.addSlide();
  s.background = { color: bg || (dark ? C.ink : C.paper) };
  if (tex) s.addImage({ path: `${IMG}/${tex}`, x: 0, y: 0, w: W, h: H });
  if (eb) eyebrow(s, eb, dark);
  if (title) {
    s.addText(title, {
      isTextBox: true, margin: 0, x: ML, y: titleY, w: titleW, h: 1.5,
      fontFace: F.d, fontSize: titleSize, bold: true, color: dark ? C.white : C.ink,
      lineSpacing: titleSize * 1.16, valign: 'top'
    });
  }
  if (!noFooter) footer(s, dark);
  return s;
}

// small circular node — the brand's network motif
function node(s, x, y, r, color, filled = true) {
  s.addShape(pres.ShapeType.ellipse, {
    x: x - r, y: y - r, w: r * 2, h: r * 2,
    fill: filled ? { color } : { color: 'FFFFFF' },
    line: { color, width: filled ? 0 : 1.25 }
  });
}
function hair(s, x, y, w, color, width = 0.75, transparency = 0) {
  s.addShape(pres.ShapeType.line, { x, y, w, h: 0, line: { color, width, transparency } });
}
function vhair(s, x, y, h, color, width = 0.75, transparency = 0) {
  s.addShape(pres.ShapeType.line, { x, y, w: 0, h, line: { color, width, transparency } });
}

// =====================================================================
// 01 — COVER
// =====================================================================
{
  n++;
  const s = pres.addSlide();
  s.background = { color: C.ink };
  s.addImage({ path: `${IMG}/tex-dark.png`, x: 0, y: 0, w: W, h: H });
  s.addImage({ path: `${IMG}/logo-dark.png`, x: ML, y: 0.62, w: 2.45, h: 0.843 });

  s.addText('SAP FINANCE  ·  CLOUD ARCHITECTURE  ·  APPLIED AI', {
    isTextBox: true, margin: 0, x: ML, y: 2.28, w: 9, h: 0.24,
    fontFace: F.m, fontSize: 10, charSpacing: 2.4, color: C.amberL, valign: 'middle'
  });

  s.addText('Finance is the\nleast forgiving\npart of an ERP.', {
    isTextBox: true, margin: 0, x: ML, y: 2.60, w: 9.4, h: 2.2,
    fontFace: F.d, fontSize: 44, bold: true, color: C.white, lineSpacing: 51
  });

  s.addText('Built narrow on purpose: the decisions most expensive to reverse are the ones we do ourselves.', {
    isTextBox: true, margin: 0, x: ML, y: 4.86, w: 7.5, h: 0.9,
    fontFace: F.b, fontSize: 14.5, color: C.onDark, lineSpacing: 24
  });

  hair(s, ML, 6.28, CW, 'FFFFFF', 0.75, 76);
  const meta = [['ISTANBUL', 0], ['TÜRKİYE · EMEA · UNITED STATES', 3.1], ['INDEPENDENT SINCE 2021', 7.9]];
  meta.forEach(([t, dx]) => {
    s.addText(t, {
      isTextBox: true, margin: 0, x: ML + dx, y: 6.46, w: 4.6, h: 0.26,
      fontFace: F.m, fontSize: 9, charSpacing: 1.8, color: C.onDarkDim, valign: 'middle'
    });
  });
  s.addNotes('Opening frame. CPeak is an independent SAP consultancy specialising end-to-end in finance modules, cloud architecture and applied AI. Founded 2021, based in Istanbul, working across Türkiye, EMEA and the United States.');
}

// =====================================================================
// 02 — POSITIONING: depth is a choice
// =====================================================================
{
  const s = slide({ eb: 'Positioning', title: 'Depth is a choice,\nnot a limitation.', titleSize: 38, titleW: 6.0 });

  s.addText('Sell broad scope, then source a specialist for each area — and the most consequential finance decision reaches the person who has seen it least often.', {
    isTextBox: true, margin: 0, x: ML, y: 3.05, w: 5.35, h: 1.5,
    fontFace: F.b, fontSize: 13.5, color: C.muted, lineSpacing: 22
  });

  vhair(s, ML, 4.30, 1.0, C.teal, 2);
  s.addText('If we take an engagement, it means we are not subcontracting the difficult part of it.', {
    isTextBox: true, margin: 0, x: ML + 0.28, y: 4.30, w: 5.05, h: 1.0,
    fontFace: F.d, fontSize: 16, bold: true, color: C.teal, lineSpacing: 24
  });

  // --- diagram: wide-and-shallow vs narrow-and-deep ---
  const dx = 7.0, dw = 4.85, top = 1.35;
  s.addText('THE USUAL SHAPE', {
    isTextBox: true, margin: 0, x: dx, y: top, w: dw, h: 0.24,
    fontFace: F.m, fontSize: 9, charSpacing: 1.8, color: C.muted, valign: 'middle'
  });
  hair(s, dx, top + 0.42, dw, C.line, 1);
  s.addText('wide scope · borrowed depth', {
    isTextBox: true, margin: 0, x: dx, y: top + 0.92, w: dw, h: 0.22,
    fontFace: F.b, fontSize: 9.5, italic: true, color: C.muted, valign: 'middle'
  });
  for (let i = 0; i < 6; i++) {
    s.addShape(pres.ShapeType.rect, {
      x: dx + i * 0.82, y: top + 0.42, w: 0.5, h: 0.34,
      fill: { color: C.line }, line: { color: C.line, width: 0 }
    });
  }

  const top2 = top + 1.55;
  s.addText('OURS', {
    isTextBox: true, margin: 0, x: dx, y: top2, w: dw, h: 0.24,
    fontFace: F.m, fontSize: 9, charSpacing: 1.8, color: C.teal, valign: 'middle'
  });
  hair(s, dx, top2 + 0.42, dw, C.line, 1);
  s.addShape(pres.ShapeType.rect, {
    x: dx, y: top2 + 0.42, w: 1.32, h: 3.05,
    fill: { color: C.teal }, line: { color: C.teal, width: 0 }
  });
  s.addText('narrow scope · owned depth', {
    isTextBox: true, margin: 0, x: dx, y: top2, w: dw, h: 0.24, align: 'right',
    fontFace: F.b, fontSize: 9.5, italic: true, color: C.muted, valign: 'middle'
  });

  const rungs = ['Enterprise structure and chart of accounts', 'Controlling, margin and project accounting', 'The close, rebuilt as parallel steps', 'Cloud model, measured not advocated', 'Automation calibrated on your own data'];
  rungs.forEach((r, i) => {
    const yy = top2 + 0.72 + i * 0.55;
    hair(s, dx + 1.32, yy, 0.22, C.teal, 1);
    node(s, dx + 1.32, yy, 0.045, C.teal);
    s.addText(r, {
      isTextBox: true, margin: 0, x: dx + 1.68, y: yy - 0.135, w: 3.2, h: 0.3,
      fontFace: F.b, fontSize: 10, color: C.ink, valign: 'middle'
    });
  });
  s.addNotes('CPeak deliberately stays inside finance modules and cloud architecture rather than offering broad scope and subcontracting the difficult parts.');
}

// =====================================================================
// 03 — THE PROBLEM: expensive decisions come first
// =====================================================================
{
  const s = slide({
    dark: true, tex: 'tex-dark.png', eb: 'The problem we are hired into',
    title: 'The most expensive decisions\nare taken first — when\nthe least is known.', titleSize: 30, titleW: 6.5
  });

  s.addText('Enterprise structure. Conversion route. Cloud model. Settled in the opening weeks — paid for over the next decade.', {
    isTextBox: true, margin: 0, x: ML, y: 3.28, w: 5.3, h: 1.1,
    fontFace: F.b, fontSize: 13, color: C.onDark, lineSpacing: 21
  });

  vhair(s, ML, 4.32, 1.0, C.amber, 2);
  s.addText('Advice given without measurement is a guess — and the cost of that guess falls to you.', {
    isTextBox: true, margin: 0, x: ML + 0.28, y: 4.32, w: 5.0, h: 1.0,
    fontFace: F.d, fontSize: 15, bold: true, color: C.amberL, lineSpacing: 22
  });

  // --- diagram: cost of reversal, rising across the programme ---
  const bx = 7.42, baseY = 5.68, bw = 0.92, gap = 0.38;
  const bars = [
    { h: 0.42, l: 'DESIGN', c: C.teal },
    { h: 1.15, l: 'BUILD', c: C.teal },
    { h: 2.15, l: 'TEST', c: C.teal },
    { h: 3.30, l: 'IN OPERATION', c: C.amber }
  ];
  s.addText('COST OF REVERSING THE DECISION', {
    isTextBox: true, margin: 0, x: bx, y: 1.55, w: 4.9, h: 0.24,
    fontFace: F.m, fontSize: 9, charSpacing: 1.8, color: C.onDarkDim, valign: 'middle'
  });
  bars.forEach((b, i) => {
    const x = bx + i * (bw + gap);
    s.addShape(pres.ShapeType.rect, {
      x, y: baseY - b.h, w: bw, h: b.h,
      fill: { color: b.c, transparency: b.c === C.teal ? 8 : 0 }, line: { width: 0 }
    });
    s.addText(b.l, {
      isTextBox: true, margin: 0, x: x - 0.22, y: baseY + 0.14, w: bw + 0.44, h: 0.24, align: 'center',
      fontFace: F.m, fontSize: 7.8, charSpacing: 0.9, color: C.onDarkDim, valign: 'middle'
    });
  });
  hair(s, bx - 0.15, baseY, 4 * bw + 3 * gap + 0.3, 'FFFFFF', 1, 62);

  // marker: decided here
  const mx = bx + bw / 2;
  node(s, mx, baseY - 0.42 - 0.32, 0.075, C.amber);
  vhair(s, mx, baseY - 0.42 - 0.245, 0.155, C.amber, 1);
  s.addText('decided here', {
    isTextBox: true, margin: 0, x: mx - 0.85, y: baseY - 1.06, w: 1.7, h: 0.24, align: 'center',
    fontFace: F.b, fontSize: 10, italic: true, color: C.amberL, valign: 'middle'
  });

  s.addText('paid for here', {
    isTextBox: true, margin: 0, x: bx + 3 * (bw + gap) - 0.42, y: baseY - 3.30 - 0.34, w: 1.8, h: 0.24, align: 'center',
    fontFace: F.b, fontSize: 10, italic: true, color: C.amberL, valign: 'middle'
  });
  s.addNotes('The core business challenge: the decisions with the longest half-life — enterprise structure, conversion approach, cloud model — are taken at the point of least evidence.');
}

// =====================================================================
// 04 — CONVERGENCE: three disciplines
// =====================================================================
{
  const s = slide({ eb: 'Where we stand', title: 'Three disciplines that only\nmake sense together.', titleSize: 34, titleW: 8.8 });

  const cols = [
    { t: 'THE FINANCE PROCESS', h: 'How the business actually closes its books', b: 'FI, CO, PA and PS — structure, costing, margin, the close.' },
    { t: 'THE PLATFORM', h: 'The ground the process has to run on', b: 'ECC, S/4HANA, Private and Public Cloud — compared, not advocated.' },
    { t: 'THE AUTOMATION', h: 'What can safely stop being done by hand', b: 'Matching, anomaly detection, predictive accounting — measured before enabling.' }
  ];
  const cw = 3.42, cgap = 0.68, cy = 2.92;
  cols.forEach((c, i) => {
    const x = ML + i * (cw + cgap);
    node(s, x + 0.075, cy + 0.075, 0.075, C.teal);
    s.addText(c.t, {
      isTextBox: true, margin: 0, x: x + 0.32, y: cy - 0.05, w: cw - 0.32, h: 0.26,
      fontFace: F.m, fontSize: 9, charSpacing: 1.6, color: C.teal, valign: 'middle'
    });
    s.addText(c.h, {
      isTextBox: true, margin: 0, x, y: cy + 0.42, w: cw, h: 0.66,
      fontFace: F.d, fontSize: 15, bold: true, color: C.ink, lineSpacing: 20
    });
    s.addText(c.b, {
      isTextBox: true, margin: 0, x, y: cy + 1.18, w: cw - 0.15, h: 1.0,
      fontFace: F.b, fontSize: 11, color: C.muted, lineSpacing: 17
    });
    vhair(s, x + 0.075, cy + 2.34, 0.30, C.line, 1);
  });
  hair(s, ML + 0.075, cy + 2.64, 2 * (cw + cgap), C.line, 1);
  vhair(s, W / 2, cy + 2.64, 0.30, C.teal, 1.25);
  const oy = cy + 2.94;
  s.addShape(pres.ShapeType.rect, {
    x: W / 2 - 3.05, y: oy, w: 6.1, h: 0.62,
    fill: { color: C.teal }, line: { width: 0 }
  });
  s.addText('A decision that still looks right in year three', {
    isTextBox: true, margin: 0, x: W / 2 - 3.05, y: oy, w: 6.1, h: 0.62, align: 'center',
    fontFace: F.d, fontSize: 15, bold: true, color: C.white, valign: 'middle'
  });

  s.addText('Most SAP problems are not module problems. They sit in the seams between these three.', {
    isTextBox: true, margin: 0, x: ML, y: 2.36, w: 10.4, h: 0.32,
    fontFace: F.b, fontSize: 12.5, italic: true, color: C.muted, valign: 'middle'
  });
  s.addNotes('CPeak’s expertise meets in three areas and each informs the others — this convergence, not any single module, is the positioning.');
}

// =====================================================================
// 05 — EVIDENCE: read the system first
// =====================================================================
{
  const s = slide({ eb: 'Operating principle', title: 'We read the system before we\nrecommend anything.', titleSize: 36, titleW: 9.2 });

  // diagram: described vs executed
  const gx = ML, gy = 3.0, gw = 6.4;
  s.addText('THE PROCESS AS DESCRIBED', {
    isTextBox: true, margin: 0, x: gx, y: gy - 0.42, w: gw, h: 0.24,
    fontFace: F.m, fontSize: 8.5, charSpacing: 1.6, color: C.muted, valign: 'middle'
  });
  hair(s, gx, gy, gw, C.line, 2.25);
  [0, 0.25, 0.5, 0.75, 1].forEach(f => node(s, gx + gw * f, gy, 0.05, C.line));

  // executed: a wandering polyline built from segments
  const pts = [[0, 0], [0.16, 0.42], [0.3, 0.24], [0.45, 0.86], [0.6, 0.62], [0.76, 1.18], [0.88, 0.96], [1, 1.34]];
  const yScale = 1.0;
  for (let i = 0; i < pts.length - 1; i++) {
    const x1 = gx + gw * pts[i][0], y1 = gy + pts[i][1] * yScale;
    const x2 = gx + gw * pts[i + 1][0], y2 = gy + pts[i + 1][1] * yScale;
    const flipV = y2 < y1;
    s.addShape(pres.ShapeType.line, {
      x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
      line: { color: C.teal, width: 2.25 }, flipV
    });
  }
  pts.forEach(p => node(s, gx + gw * p[0], gy + p[1] * yScale, 0.05, C.teal));
  s.addText('THE PROCESS AS EXECUTED', {
    isTextBox: true, margin: 0, x: gx + gw - 2.6, y: gy + 1.34 * yScale + 0.16, w: 2.6, h: 0.24, align: 'right',
    fontFace: F.m, fontSize: 8.5, charSpacing: 1.6, color: C.teal, valign: 'middle'
  });

  // the gap
  const gf = 0.45;
  vhair(s, gx + gw * gf, gy, 0.86 * yScale, C.amber, 1.5);
  s.addShape(pres.ShapeType.ellipse, {
    x: gx + gw * gf - 0.045, y: gy + 0.86 * yScale - 0.045, w: 0.09, h: 0.09,
    fill: { color: C.amber }, line: { width: 0 }
  });
  s.addText('the gap is where\nthe findings are', {
    isTextBox: true, margin: 0, x: gx + gw * gf + 0.16, y: gy + 0.14, w: 2.2, h: 0.46,
    fontFace: F.b, fontSize: 10.5, italic: true, color: C.ink, lineSpacing: 15
  });

  // right column
  const rx = 8.05;
  s.addText('Usage statistics. Data quality. Custom code inventory. Close durations measured step by step.', {
    isTextBox: true, margin: 0, x: rx, y: 2.62, w: 4.4, h: 0.9,
    fontFace: F.d, fontSize: 15, bold: true, color: C.ink, lineSpacing: 21
  });
  s.addText('What the system does, not what the documentation says it does. The distance between the two is usually the problem itself.', {
    isTextBox: true, margin: 0, x: rx, y: 3.68, w: 4.4, h: 1.4,
    fontFace: F.b, fontSize: 11.5, color: C.muted, lineSpacing: 18.5
  });
  hair(s, rx, 5.28, 4.4, C.line, 1);
  s.addText('Nearly every engagement opens with an assessment', {
    isTextBox: true, margin: 0, x: rx, y: 5.44, w: 3.3, h: 0.44,
    fontFace: F.b, fontSize: 10.5, color: C.muted, lineSpacing: 15
  });
  s.addText('2–6\nWEEKS', {
    isTextBox: true, margin: 0, x: rx + 3.3, y: 5.4, w: 1.1, h: 0.62, align: 'right',
    fontFace: F.m, fontSize: 12, color: C.teal, lineSpacing: 15
  });
  s.addNotes('Measure before recommending — the working principle that separates CPeak from advice given on interview evidence alone.');
}

// =====================================================================
// 06 — CLOUD NEUTRALITY
// =====================================================================
{
  const s = slide({
    dark: true, bg: C.navy, tex: 'tex-dark.png', eb: 'The decision we will not make for you',
    title: 'We do not sell a cloud model.\nWe measure which one you are.', titleSize: 34, titleW: 10.5
  });

  const cols = [
    {
      t: 'PUBLIC CLOUD', h: 'You adopt the standard.',
      b: 'Speed and a predictable run cost — for a core that cannot be modified.',
      m: '3–5 months', ml: 'single-country finance deployment'
    },
    {
      t: 'PRIVATE CLOUD', h: 'You keep your process logic.',
      b: 'Your own developments kept — for more responsibility and a longer build.',
      m: '7–14 months', ml: 'depending on scope and inherited landscape'
    }
  ];
  const cw = 4.7, cy = 2.86;
  cols.forEach((c, i) => {
    const x = i === 0 ? ML : W - ML - cw;
    s.addText(c.t, {
      isTextBox: true, margin: 0, x, y: cy, w: cw, h: 0.26,
      fontFace: F.m, fontSize: 9.5, charSpacing: 1.9, color: C.amberL, valign: 'middle'
    });
    hair(s, x, cy + 0.4, cw, 'FFFFFF', 1, 62);
    s.addText(c.h, {
      isTextBox: true, margin: 0, x, y: cy + 0.58, w: cw, h: 0.4,
      fontFace: F.d, fontSize: 19, bold: true, color: C.white, valign: 'middle'
    });
    s.addText(c.b, {
      isTextBox: true, margin: 0, x, y: cy + 1.12, w: cw - 0.2, h: 1.0,
      fontFace: F.b, fontSize: 11.5, color: C.onDark, lineSpacing: 18.5
    });
    s.addText(c.m, {
      isTextBox: true, margin: 0, x, y: cy + 2.12, w: cw, h: 0.36,
      fontFace: F.m, fontSize: 13, color: C.amberL, valign: 'middle'
    });
    s.addText(c.ml, {
      isTextBox: true, margin: 0, x, y: cy + 2.5, w: cw, h: 0.24,
      fontFace: F.b, fontSize: 9.5, italic: true, color: C.onDarkDim, valign: 'middle'
    });
  });

  // central pivot
  const px = W / 2;
  vhair(s, px, cy - 0.05, 3.0, 'FFFFFF', 1, 62);
  s.addShape(pres.ShapeType.rect, {
    x: px - 0.62, y: cy + 1.14, w: 1.24, h: 0.42,
    fill: { color: C.navy }, line: { width: 0 }
  });
  s.addText('THE TRADE', {
    isTextBox: true, margin: 0, x: px - 0.62, y: cy + 1.14, w: 1.24, h: 0.42, align: 'center',
    fontFace: F.m, fontSize: 9, charSpacing: 1.4, color: C.amber, valign: 'middle'
  });

  s.addText('Neither is the advanced version of the other. We put both costs and both constraints side by side; the decision stays yours, and the moment to take it is before signing.', {
    isTextBox: true, margin: 0, x: ML, y: 6.0, w: 11.2, h: 0.72,
    fontFace: F.b, fontSize: 11.5, color: C.onDark, lineSpacing: 18
  });
  s.addNotes('Cloud-model neutrality is a genuine differentiator: CPeak does not advocate for Public or Private Cloud, it measures fit against standard scope and documents the reasoning.');
}

// =====================================================================
// 07 — METHOD: four gated stages
// =====================================================================
{
  const s = slide({ eb: 'How the work moves', title: 'Nothing starts until the\nlast thing has closed.', titleSize: 36, titleW: 7.0 });

  s.addText('What each stage delivers is agreed before it begins. At every gate the decision to continue is taken again.', {
    isTextBox: true, margin: 0, x: 7.6, y: 1.18, w: 4.85, h: 1.2,
    fontFace: F.b, fontSize: 11.5, color: C.muted, lineSpacing: 18
  });

  const stages = [
    { n: '01', t: 'Assessment', d: 'Diagnostic report, read from system data', w: '2–6 weeks' },
    { n: '02', t: 'Architecture\nand roadmap', d: 'Target architecture and phased roadmap', w: '3–6 weeks' },
    { n: '03', t: 'Delivery', d: 'Working system, test records, cutover plan', w: '3–14 months' },
    { n: '04', t: 'Hypercare', d: 'First close run with your team, improvement backlog', w: '4–12 weeks' }
  ];
  const sy = 3.05, cw = 2.62, cgap = 0.38;
  hair(s, ML, sy, CW, C.line, 1);
  stages.forEach((st, i) => {
    const x = ML + i * (cw + cgap);
    node(s, x + 0.06, sy, 0.06, C.teal);
    s.addText(st.n, {
      isTextBox: true, margin: 0, x, y: sy + 0.24, w: cw, h: 0.3,
      fontFace: F.m, fontSize: 13, color: C.teal, valign: 'middle'
    });
    s.addText(st.t, {
      isTextBox: true, margin: 0, x, y: sy + 0.60, w: cw, h: 0.62, valign: 'bottom',
      fontFace: F.d, fontSize: 17, bold: true, color: C.ink, lineSpacing: 22
    });
    s.addText(st.d, {
      isTextBox: true, margin: 0, x, y: sy + 1.36, w: cw - 0.12, h: 1.0,
      fontFace: F.b, fontSize: 10.5, color: C.muted, lineSpacing: 16.5
    });
    hair(s, x, sy + 2.44, cw - 0.3, C.line, 1);
    s.addText(st.w, {
      isTextBox: true, margin: 0, x, y: sy + 2.56, w: cw, h: 0.26,
      fontFace: F.m, fontSize: 10, color: C.ink, valign: 'middle'
    });
    // gate marker
    if (i < stages.length - 1) {
      const gx2 = x + cw + cgap / 2;
      vhair(s, gx2, sy - 0.16, 0.32, C.amber, 1.5);
      s.addText('GATE', {
        isTextBox: true, margin: 0, x: gx2 - 0.5, y: sy - 0.5, w: 1.0, h: 0.22, align: 'center',
        fontFace: F.m, fontSize: 7.5, charSpacing: 1.1, color: C.muted, valign: 'middle'
      });
    }
  });
  s.addNotes('Four stages, each closing on a defined deliverable. The gates are the point: scope is re-decided rather than assumed.');
}

// =====================================================================
// 08 — CAPABILITY -> OUTCOME
// =====================================================================
{
  const s = slide({ eb: 'Where the value shows up', title: 'Expertise is only worth\nwhat it changes.', titleSize: 36, titleW: 7.0 });

  const heads = ['WHAT WE BRING', 'WHAT WE DO WITH IT', 'WHAT CHANGES FOR YOU'];
  const colX = [ML, ML + 4.05, ML + 8.1];
  const colW = [3.55, 3.55, 3.5];
  const hy = 2.88;
  heads.forEach((h, i) => {
    s.addText(h, {
      isTextBox: true, margin: 0, x: colX[i], y: hy, w: colW[i], h: 0.24,
      fontFace: F.m, fontSize: 8.5, charSpacing: 1.7, color: i === 2 ? C.teal : C.muted, valign: 'middle'
    });
  });
  hair(s, ML, hy + 0.34, CW, C.line, 1);

  const rows = [
    ['Depth in FI and CO, not breadth beside it', 'Rebuild the close to run in parallel, not in sequence', 'A close that is predictable, not merely shorter'],
    ['A neutral read on the cloud models', 'Compare your processes to standard scope, before the contract', 'A model decision that survives the middle of the project'],
    ['AI put where the hours actually are', 'Calibrate thresholds on your own data, write the oversight rules down', 'The team moves from matching items to reviewing exceptions']
  ];
  rows.forEach((r, ri) => {
    const y = hy + 0.62 + ri * 1.16;
    r.forEach((cell, ci) => {
      s.addText(cell, {
        isTextBox: true, margin: 0, x: colX[ci], y, w: colW[ci] - 0.15, h: 0.86,
        fontFace: ci === 2 ? F.d : F.b, fontSize: ci === 2 ? 13 : 11.5,
        bold: ci === 2, color: ci === 2 ? C.ink : C.muted, lineSpacing: ci === 2 ? 19 : 18, valign: 'top'
      });
    });
    // connective nodes
    node(s, colX[1] - 0.26, y + 0.16, 0.045, C.line);
    node(s, colX[2] - 0.26, y + 0.16, 0.045, C.teal);
    if (ri < rows.length - 1) hair(s, ML, y + 1.02, CW, C.soft, 1);
  });
  s.addNotes('Connects capability to action to business outcome — three chains rather than a service list.');
}

// =====================================================================
// 09 — CAPABILITIES AS QUESTIONS
// =====================================================================
{
  const s = slide({ eb: 'Capabilities', title: 'Organised around the question\nyou are actually asking.', titleSize: 34, titleW: 9.5, titleY: 0.98 });

  const rows = [
    ['Can we still trust our own numbers?', 'SAP FINANCE MODULES', 'FI, CO, PA and PS rebuilt as one process architecture, not five parallel ones.'],
    ['Which road do we take to S/4HANA?', 'S/4HANA TRANSFORMATION', 'Brownfield, greenfield or selective transition — decided on evidence.'],
    ['Is standard actually enough for us?', 'SAP PUBLIC CLOUD', 'How much of your process fits standard scope, established before you commit.'],
    ['Can we go to cloud and keep our process?', 'SAP PRIVATE CLOUD', 'Architecture, migration and the boundaries a RISE contract leaves open.'],
    ['Which of this AI is real for us?', 'AI IN FINANCE', 'The capabilities you have the data and the discipline to support — sequenced.']
  ];
  const ry = 2.52, rh = 0.84;
  hair(s, ML, ry - 0.18, CW, C.line, 1);
  rows.forEach((r, i) => {
    const y = ry + i * rh;
    node(s, ML + 0.055, y + 0.24, 0.055, C.teal);
    s.addText(r[0], {
      isTextBox: true, margin: 0, x: ML + 0.32, y: y + 0.02, w: 5.05, h: 0.46,
      fontFace: F.d, fontSize: 15, bold: true, color: C.ink, valign: 'middle'
    });
    s.addText(r[1], {
      isTextBox: true, margin: 0, x: ML + 5.6, y: y + 0.07, w: 2.9, h: 0.24,
      fontFace: F.m, fontSize: 8.5, charSpacing: 1.5, color: C.teal, valign: 'middle'
    });
    s.addText(r[2], {
      isTextBox: true, margin: 0, x: ML + 5.6, y: y + 0.34, w: 5.95, h: 0.28,
      fontFace: F.b, fontSize: 10.5, color: C.muted, valign: 'middle'
    });
    hair(s, ML, y + rh - 0.12, CW, i === rows.length - 1 ? C.line : C.soft, 1);
  });
  s.addNotes('The five capability areas, reframed as the question a client arrives with.');
}

// =====================================================================
// 10 — AI USED TWICE
// =====================================================================
{
  const s = slide({
    dark: true, bg: C.teal, tex: 'tex-amber.png', eb: 'Applied AI',
    title: 'We use AI twice: inside your\nprocesses, and inside our own.', titleSize: 33, titleW: 10.5
  });

  const cols = [
    {
      t: 'IN YOUR FINANCE PROCESSES', h: 'Embedded in SAP, not bought beside it',
      items: ['Intelligent matching — bank and open items cleared automatically',
        'Anomaly detection — unusual postings flagged before the close',
        'Predictive accounting — the effect of not-yet-final transactions',
        'Joule — natural-language querying and navigation']
    },
    {
      t: 'IN HOW WE DELIVER', h: 'Applied to volume work, not judgement',
      items: ['Custom code inventory and impact analysis',
        'First drafts of test scenarios',
        'Preparation of migration reconciliation checks',
        'Initial versions of configuration documentation']
    }
  ];
  const cw = 5.2, cy = 2.56;
  cols.forEach((c, i) => {
    const x = i === 0 ? ML : W - ML - cw;
    s.addText(c.t, {
      isTextBox: true, margin: 0, x, y: cy, w: cw, h: 0.26,
      fontFace: F.m, fontSize: 9, charSpacing: 1.8, color: C.amberL, valign: 'middle'
    });
    s.addText(c.h, {
      isTextBox: true, margin: 0, x, y: cy + 0.34, w: cw, h: 0.38,
      fontFace: F.d, fontSize: 16, bold: true, color: C.white, valign: 'middle'
    });
    hair(s, x, cy + 0.86, cw, 'FFFFFF', 1, 58);
    c.items.forEach((it, j) => {
      const y = cy + 1.00 + j * 0.70;
      node(s, x + 0.05, y + 0.12, 0.05, C.amber);
      s.addText(it, {
        isTextBox: true, margin: 0, x: x + 0.3, y, w: cw - 0.3, h: 0.62, valign: 'top',
        fontFace: F.b, fontSize: 11, color: C.white, lineSpacing: 17
      });
    });
  });

  hair(s, ML, 6.20, CW, 'FFFFFF', 1, 58);
  s.addText('No decision that produces a financial posting is finalised without human review — that one is not negotiable.', {
    isTextBox: true, margin: 0, x: ML, y: 6.34, w: 11.5, h: 0.34,
    fontFace: F.d, fontSize: 13, bold: true, color: C.amberL, valign: 'middle'
  });
  s.addNotes('AI is treated as part of both the delivered system and the delivery method — with an explicit human-review boundary on anything that posts.');
}

// =====================================================================
// 11 — WHAT WE DECLINE
// =====================================================================
{
  const s = slide({ eb: 'Boundaries', title: 'A specialism is defined\nby what it excludes.', titleSize: 36, titleW: 6.4 });

  s.addText('Saying what we do not do matters as much as saying what we do.', {
    isTextBox: true, margin: 0, x: ML, y: 2.96, w: 5.0, h: 1.0,
    fontFace: F.b, fontSize: 12.5, color: C.muted, lineSpacing: 20
  });
  vhair(s, ML, 3.90, 1.0, C.teal, 2);
  s.addText('It costs us work. It is also why the engagements we do take are ones we can finish.', {
    isTextBox: true, margin: 0, x: ML + 0.28, y: 3.90, w: 4.75, h: 1.0,
    fontFace: F.d, fontSize: 15, bold: true, color: C.teal, lineSpacing: 22
  });

  const items = [
    'Lead responsibility for modules outside our specialism — logistics, production planning, HR',
    'Staff augmentation without architectural or delivery responsibility',
    'Fixed-price commitments made before an assessment',
    'Software development or infrastructure operations as a service'
  ];
  const ix = 6.6, iw = W - ML - ix;
  items.forEach((it, i) => {
    const y = 2.05 + i * 1.12;
    hair(s, ix, y, iw, C.line, 1);
    s.addText(String(i + 1).padStart(2, '0'), {
      isTextBox: true, margin: 0, x: ix, y: y + 0.16, w: 0.5, h: 0.26,
      fontFace: F.m, fontSize: 10, color: C.muted, valign: 'middle'
    });
    s.addText(it, {
      isTextBox: true, margin: 0, x: ix + 0.62, y: y + 0.14, w: iw - 0.62, h: 0.74,
      fontFace: F.b, fontSize: 12, color: C.muted, lineSpacing: 19
    });
  });
  hair(s, ix, 2.05 + 4 * 1.12, iw, C.line, 1);
  s.addNotes('The declined-work slide is a credibility instrument: it demonstrates the focus claimed earlier is real.');
}

// =====================================================================
// 12 — ENGAGEMENT SHAPES
// =====================================================================
{
  const s = slide({ eb: 'Ways in', title: 'Three shapes. Which one fits\nis clear in one conversation.', titleSize: 34, titleW: 9.5 });

  const models = [
    { t: 'Assessment', w: 'A decision has to be taken and the evidence is missing: conversion route, cloud model, a health check.', o: 'You end it in a position to decide.', d: '2–6 weeks' },
    { t: 'Delivery', w: 'The decision is taken and it needs building: a transformation, an implementation, a redesign.', o: 'Phased plan, weekly reporting, cutover and hypercare included.', d: '3–14 months' },
    { t: 'Expert support', w: 'Someone else runs the programme and depth is needed in one place: a review, a second opinion, one workstream.', o: 'Narrow scope, agreed output, not extended past its usefulness.', d: 'Days to weeks' }
  ];
  const cw = 3.62, cgap = 0.42, cy = 2.62, ch = 3.32;
  models.forEach((m, i) => {
    const x = ML + i * (cw + cgap);
    s.addShape(pres.ShapeType.rect, {
      x, y: cy, w: cw, h: ch,
      fill: { color: C.white }, line: { color: C.line, width: 0.75 },
      shadow: { type: 'outer', color: '0E1620', blur: 14, offset: 3, angle: 90, opacity: 0.07 }
    });
    node(s, x + 0.46, cy + 0.52, 0.075, C.teal);
    s.addText(m.t, {
      isTextBox: true, margin: 0, x: x + 0.46, y: cy + 0.74, w: cw - 0.92, h: 0.42,
      fontFace: F.d, fontSize: 19, bold: true, color: C.ink, valign: 'middle'
    });
    s.addText(m.w, {
      isTextBox: true, margin: 0, x: x + 0.46, y: cy + 1.24, w: cw - 0.92, h: 1.1,
      fontFace: F.b, fontSize: 11, color: C.muted, lineSpacing: 17.5
    });
    hair(s, x + 0.46, cy + 2.42, cw - 0.92, C.soft, 1);
    s.addText(m.o, {
      isTextBox: true, margin: 0, x: x + 0.46, y: cy + 2.56, w: cw - 0.92, h: 0.52,
      fontFace: F.b, fontSize: 10.5, italic: true, color: C.ink, lineSpacing: 16
    });
    s.addText(m.d, {
      isTextBox: true, margin: 0, x: x + 0.46, y: cy + 3.02, w: cw - 0.92, h: 0.28, align: 'right',
      fontFace: F.m, fontSize: 10.5, color: C.teal, valign: 'middle'
    });
  });
  s.addText('Not every need calls for a full programme — and we say so when it does not.', {
    isTextBox: true, margin: 0, x: ML, y: 6.45, w: 11.2, h: 0.3,
    fontFace: F.b, fontSize: 12, italic: true, color: C.muted, valign: 'middle'
  });
  s.addNotes('Three engagement shapes: Assessment, Delivery, Expert support.');
}

// =====================================================================
// 13 — REFERENCES
// =====================================================================
{
  const s = slide({ eb: 'References', title: 'The landscapes the\nexperience comes from.', titleSize: 33, titleW: 7.2 });

  s.addText('More than ten years across SAP finance modules and cloud architecture.', {
    isTextBox: true, margin: 0, x: 8.0, y: 1.16, w: 4.45, h: 1.4,
    fontFace: F.b, fontSize: 12, color: C.muted, lineSpacing: 19
  });

  const refs = JSON.parse(fs.readFileSync(__dirname + '/refs.json', 'utf8'));
  const order = ['mercedes-benz', 'pwc', 'gsk', 'boehringer-ingelheim', 'beko', 'enerjisa',
    'wavin', 'imerys', 'flint', 'peri', 'hidromek', 'aydem',
    'nuh-cimento', 'belbim', 'tcdd', 'iett', 'fusion-consulting'];
  const byKey = {};
  refs.forEach(r => { byKey[r.src.replace('/logos/', '').replace(/\.\w+$/, '')] = r; });

  const cellW = 1.94, cellH = 1.02, gapX = 0.12, gapY = 0.30;
  const perRow = 6, startX = ML, startY = 3.02;
  order.forEach((key, i) => {
    const r = byKey[key]; if (!r) return;
    const col = i % perRow, row = Math.floor(i / perRow);
    const cx = startX + col * (cellW + gapX) + cellW / 2;
    const cy2 = startY + row * (cellH + gapY) + cellH / 2;
    // fit inside a box, preserving aspect ratio
    const maxW = cellW - 0.34, maxH = 0.62;
    const ar = r.iw / r.ih;
    let w = maxW, h = w / ar;
    if (h > maxH) { h = maxH; w = h * ar; }
    s.addImage({
      path: `${IMG}/ref-${key}.png`,
      x: cx - w / 2, y: cy2 - h / 2, w, h
    });
  });
  // baseline rules under each row (ledger motif)
  for (let row = 0; row < 3; row++) {
    hair(s, ML, startY + row * (cellH + gapY) + cellH + 0.06, CW, C.soft, 1);
  }
  s.addNotes('Reference logos as published by CPeak. No client names, figures or outcome claims are attached to them.');
}

// =====================================================================
// 14 — WHY CPEAK / CLOSE
// =====================================================================
{
  n++;
  const s = pres.addSlide();
  s.background = { color: C.ink };
  s.addImage({ path: `${IMG}/tex-dark.png`, x: 0, y: 0, w: W, h: H });

  eyebrow(s, 'Why CPeak', true);
  s.addText('The people named in the proposal\nare the people who turn up.', {
    isTextBox: true, margin: 0, x: ML, y: 1.02, w: 10.5, h: 1.5,
    fontFace: F.d, fontSize: 36, bold: true, color: C.white, lineSpacing: 44
  });

  const pillars = [
    ['SENIOR ONLY', 'A small, senior team. No one’s learning curve on your budget.'],
    ['NARROW BY DESIGN', 'Finance and cloud architecture only. The difficult part is not subcontracted.'],
    ['NEUTRAL', 'We compare, you decide, the reasoning stays on paper.'],
    ['PHASED', 'Scope grows in phases, not in headcount.']
  ];
  const pw = 2.62, pgap = 0.24, py = 2.92;
  pillars.forEach((p, i) => {
    const x = ML + i * (pw + pgap);
    hair(s, x, py, pw, 'FFFFFF', 1, 62);
    node(s, x + 0.05, py, 0.05, C.amber);
    s.addText(p[0], {
      isTextBox: true, margin: 0, x, y: py + 0.2, w: pw, h: 0.24,
      fontFace: F.m, fontSize: 9, charSpacing: 1.7, color: C.amberL, valign: 'middle'
    });
    s.addText(p[1], {
      isTextBox: true, margin: 0, x, y: py + 0.54, w: pw - 0.12, h: 1.1, valign: 'top',
      fontFace: F.b, fontSize: 11, color: C.onDark, lineSpacing: 17.5
    });
  });

  s.addText('Tell us about your programme.\nWe respond within one business day.', {
    isTextBox: true, margin: 0, x: ML, y: 4.84, w: 6.0, h: 0.9,
    fontFace: F.d, fontSize: 18, bold: true, color: C.white, lineSpacing: 25
  });

  const cx0 = 7.05;
  const contact = [
    ['info@cpeakconsultancy.com', C.amberL],
    ['+90 (507) 032 81 70', C.white],
    ['linkedin.com/company/cpeak-consultancy', C.onDark]
  ];
  contact.forEach((c, i) => {
    s.addText(c[0], {
      isTextBox: true, margin: 0, x: cx0, y: 4.82 + i * 0.34, w: 5.4, h: 0.3,
      fontFace: F.m, fontSize: 11.5, color: c[1], valign: 'middle'
    });
  });
  s.addText('Bostancı Mahallesi, Şemsettin Günaltay Caddesi No: 31/8\n34744 Kadıköy, İstanbul   ·   Mon–Fri, 09:00–18:00 (GMT+3)', {
    isTextBox: true, margin: 0, x: cx0, y: 5.94, w: 5.4, h: 0.56,
    fontFace: F.b, fontSize: 10.5, color: C.onDarkDim, lineSpacing: 16
  });

  s.addImage({ path: `${IMG}/logo-dark.png`, x: ML, y: 5.95, w: 1.85, h: 0.637 });

  hair(s, ML, 6.95, CW, 'FFFFFF', 0.75, 82);
  s.addText('SAP, S/4HANA and RISE with SAP are registered trademarks of SAP SE. CPeak Consultancy is an independent consultancy and is not affiliated with SAP SE.', {
    isTextBox: true, margin: 0, x: ML, y: 7.06, w: 11.2, h: 0.24,
    fontFace: F.b, fontSize: 8, color: C.onDarkDim, valign: 'middle'
  });
  s.addNotes('Closing argument and contact. Response within one business day.');
}

pres.writeFile({ fileName: __dirname + '/../CPeak-Consultancy-Corporate-Presentation.pptx' })
  .then(f => console.log('WROTE', f, '—', n, 'slides'));
