// CPeak Consultancy — corporate deck generator.
// Usage: node deck.js en|tr        (writes ../<file> named in content.js)
const pptxgen = require('pptxgenjs');
const fs = require('fs');
const CONTENT = require('./content');

const LANG = (process.argv[2] || 'en').toLowerCase();
if (!CONTENT[LANG]) { console.error('unknown language:', LANG); process.exit(1); }
const T = CONTENT[LANG];
const IMG = __dirname + '/img';

// ---------- brand tokens (from CPeak's own design system) ----------
const C = {
  ink: '0E1620', teal: '11676A', navy: '003F82', paper: 'F7F8F7', white: 'FFFFFF',
  line: 'C9D6DE', soft: 'E2E9EE', muted: '4A5A67', amber: 'E8B33A', amberL: 'F5DCA4',
  onDark: 'D2DDE6', onDarkDim: '9DB0C0'
};
const F = { d: 'Schibsted Grotesk', b: 'Inter', m: 'IBM Plex Mono' };

const W = 13.333, H = 7.5, ML = 0.85, CW = W - ML * 2;

const pres = new pptxgen();
pres.defineLayout({ name: 'CPEAK', width: W, height: H });
pres.layout = 'CPEAK';
pres.author = 'CPeak Consultancy';
pres.company = 'CPeak Consultancy';
pres.title = 'CPeak Consultancy';


// ---- scene recorder: every element's geometry, for the collision checker ----
const SCENE = [];
let CUR = null;
function wrap(s) {
  CUR = { slide: SCENE.length + 1, items: [] };
  SCENE.push(CUR);
  const at = s.addText.bind(s), ash = s.addShape.bind(s), ai = s.addImage.bind(s);
  s.addText = (t, o) => { CUR.items.push({ kind: 'text', text: Array.isArray(t) ? t.map(x => x.text).join('') : t, o: JSON.parse(JSON.stringify(o)) }); return at(t, o); };
  s.addShape = (ty, o) => { CUR.items.push({ kind: String(ty), o: JSON.parse(JSON.stringify(o)) }); return ash(ty, o); };
  s.addImage = (o) => { CUR.items.push({ kind: 'image', o: JSON.parse(JSON.stringify(o)) }); return ai(o); };
  return s;
}

const TOTAL = 14;
let n = 0;

// ---------- helpers ----------
function eyebrow(s, text, dark, x = ML, y = 0.58) {
  s.addText(text.toUpperCase(), {
    isTextBox: true, margin: 0, x, y, w: CW, h: 0.22,
    fontFace: F.m, fontSize: 9.5, charSpacing: 2.2,
    color: dark ? C.amberL : C.teal, valign: 'middle'
  });
}
function footer(s, dark) {
  const col = dark ? C.onDarkDim : C.muted;
  s.addShape(pres.ShapeType.line, {
    x: ML, y: 6.86, w: CW, h: 0,
    line: { color: dark ? 'FFFFFF' : C.line, width: 0.75, transparency: dark ? 78 : 0 }
  });
  s.addText(T.footerName, {
    isTextBox: true, margin: 0, x: ML, y: 6.98, w: 5, h: 0.22,
    fontFace: F.m, fontSize: 8, charSpacing: 1.6, color: col, valign: 'middle'
  });
  s.addText(String(n).padStart(2, '0') + ' / ' + TOTAL, {
    isTextBox: true, margin: 0, x: W - ML - 5, y: 6.98, w: 5, h: 0.22, align: 'right',
    fontFace: F.m, fontSize: 8, charSpacing: 1.6, color: col, valign: 'middle'
  });
}
function slide({ dark = false, bg, eb, title, titleSize = 36, titleW = 11.0, titleY = 1.05, titleLead, tex = null }) {
  n++;
  const s = wrap(pres.addSlide());
  s.background = { color: bg || (dark ? C.ink : C.paper) };
  if (tex) s.addImage({ path: `${IMG}/${tex}`, x: 0, y: 0, w: W, h: H });
  if (eb) eyebrow(s, eb, dark);
  if (title) {
    s.addText(title, {
      isTextBox: true, margin: 0, x: ML, y: titleY, w: titleW, h: 1.6,
      fontFace: F.d, fontSize: titleSize, bold: true, color: dark ? C.white : C.ink,
      lineSpacing: titleLead || titleSize * 1.16, valign: 'top'
    });
  }
  footer(s, dark);
  return s;
}
function node(s, x, y, r, color) {
  s.addShape(pres.ShapeType.ellipse, {
    x: x - r, y: y - r, w: r * 2, h: r * 2, fill: { color }, line: { type: 'none' }
  });
}
function hair(s, x, y, w, color, width = 0.75, transparency = 0) {
  s.addShape(pres.ShapeType.line, { x, y, w, h: 0, line: { color, width, transparency } });
}
function vhair(s, x, y, h, color, width = 0.75, transparency = 0) {
  s.addShape(pres.ShapeType.line, { x, y, w: 0, h, line: { color, width, transparency } });
}

// ===================== 01 — COVER =====================
{
  const d = T.s1; n++;
  const s = wrap(pres.addSlide());
  s.background = { color: C.ink };
  s.addImage({ path: `${IMG}/tex-dark.png`, x: 0, y: 0, w: W, h: H });
  s.addImage({ path: `${IMG}/logo-dark.png`, x: ML, y: 0.62, w: 2.45, h: 0.843 });
  s.addText(d.eyebrow, {
    isTextBox: true, margin: 0, x: ML, y: 2.28, w: 10.5, h: 0.24,
    fontFace: F.m, fontSize: 10, charSpacing: 2.4, color: C.amberL, valign: 'middle'
  });
  s.addText(d.h, {
    isTextBox: true, margin: 0, x: ML, y: 2.60, w: 9.4, h: 2.2,
    fontFace: F.d, fontSize: d.hSize, bold: true, color: C.white, lineSpacing: d.hLead
  });
  s.addText(d.sub, {
    isTextBox: true, margin: 0, x: ML, y: 4.86, w: 7.8, h: 0.9, valign: 'top',
    fontFace: F.b, fontSize: 14, color: C.onDark, lineSpacing: 23
  });
  hair(s, ML, 6.28, CW, 'FFFFFF', 0.75, 76);
  [[d.meta[0], 0], [d.meta[1], 3.1], [d.meta[2], 7.9]].forEach(([t, dx]) => {
    s.addText(t, {
      isTextBox: true, margin: 0, x: ML + dx, y: 6.46, w: 4.6, h: 0.26,
      fontFace: F.m, fontSize: 9, charSpacing: 1.8, color: C.onDarkDim, valign: 'middle'
    });
  });
  s.addNotes(d.notes);
}

// ===================== 02 — POSITIONING =====================
{
  const d = T.s2;
  const s = slide({ eb: d.eyebrow, title: d.title, titleSize: d.titleSize, titleW: d.titleW });
  s.addText(d.body, {
    isTextBox: true, margin: 0, x: ML, y: 3.05, w: 5.35, h: 1.5, valign: 'top',
    fontFace: F.b, fontSize: 13, color: C.muted, lineSpacing: 21
  });
  vhair(s, ML, 4.60, 1.15, C.teal, 2);
  s.addText(d.quote, {
    isTextBox: true, margin: 0, x: ML + 0.28, y: 4.60, w: 5.05, h: 1.15, valign: 'top',
    fontFace: F.d, fontSize: 16, bold: true, color: C.teal, lineSpacing: 24
  });

  const dx = 7.0, dw = 4.85, top = 1.35;
  s.addText(d.usual, {
    isTextBox: true, margin: 0, x: dx, y: top, w: dw, h: 0.24,
    fontFace: F.m, fontSize: 9, charSpacing: 1.8, color: C.muted, valign: 'middle'
  });
  hair(s, dx, top + 0.42, dw, C.line, 1);
  for (let i = 0; i < 6; i++) {
    s.addShape(pres.ShapeType.rect, {
      x: dx + i * 0.82, y: top + 0.42, w: 0.5, h: 0.34, fill: { color: C.line }, line: { type: 'none' }
    });
  }
  s.addText(d.usualCap, {
    isTextBox: true, margin: 0, x: dx, y: top + 0.92, w: dw, h: 0.22, valign: 'middle',
    fontFace: F.b, fontSize: 9.5, italic: true, color: C.muted
  });

  const top2 = top + 1.55;
  s.addText(d.ours, {
    isTextBox: true, margin: 0, x: dx, y: top2, w: 1.6, h: 0.24,
    fontFace: F.m, fontSize: 9, charSpacing: 1.8, color: C.teal, valign: 'middle'
  });
  s.addText(d.oursCap, {
    isTextBox: true, margin: 0, x: dx + 1.7, y: top2, w: dw - 1.7, h: 0.24, align: 'right',
    fontFace: F.b, fontSize: 9.5, italic: true, color: C.muted, valign: 'middle'
  });
  hair(s, dx, top2 + 0.42, dw, C.line, 1);
  s.addShape(pres.ShapeType.rect, {
    x: dx, y: top2 + 0.42, w: 1.32, h: 3.05, fill: { color: C.teal }, line: { type: 'none' }
  });
  d.rungs.forEach((r, i) => {
    const yy = top2 + 0.72 + i * 0.55;
    hair(s, dx + 1.32, yy, 0.22, C.teal, 1);
    node(s, dx + 1.32, yy, 0.045, C.teal);
    s.addText(r, {
      isTextBox: true, margin: 0, x: dx + 1.68, y: yy - 0.135, w: 3.3, h: 0.3,
      fontFace: F.b, fontSize: 10, color: C.ink, valign: 'middle'
    });
  });
  s.addNotes(d.notes);
}

// ===================== 03 — THE PROBLEM =====================
{
  const d = T.s3;
  const s = slide({
    dark: true, tex: 'tex-dark.png', eb: d.eyebrow,
    title: d.title, titleSize: d.titleSize, titleW: d.titleW
  });
  s.addText(d.body, {
    isTextBox: true, margin: 0, x: ML, y: 3.28, w: 5.5, h: 1.0, valign: 'top',
    fontFace: F.b, fontSize: 13, color: C.onDark, lineSpacing: 21
  });
  vhair(s, ML, 4.32, 1.15, C.amber, 2);
  s.addText(d.quote, {
    isTextBox: true, margin: 0, x: ML + 0.28, y: 4.32, w: 5.2, h: 1.15, valign: 'top',
    fontFace: F.d, fontSize: 15, bold: true, color: C.amberL, lineSpacing: 22
  });

  const bx = 7.42, baseY = 5.68, bw = 0.92, gap = 0.38;
  const bars = [0.42, 1.15, 2.15, 3.30];
  s.addText(d.chartLabel, {
    isTextBox: true, margin: 0, x: bx, y: 1.55, w: 4.9, h: 0.24,
    fontFace: F.m, fontSize: 9, charSpacing: 1.8, color: C.onDarkDim, valign: 'middle'
  });
  bars.forEach((bh, i) => {
    const x = bx + i * (bw + gap);
    s.addShape(pres.ShapeType.rect, {
      x, y: baseY - bh, w: bw, h: bh,
      fill: { color: i === 3 ? C.amber : C.teal, transparency: i === 3 ? 0 : 8 }, line: { type: 'none' }
    });
    s.addText(d.phases[i], {
      isTextBox: true, margin: 0, x: x - 0.24, y: baseY + 0.14, w: bw + 0.48, h: 0.24, align: 'center',
      fontFace: F.m, fontSize: 7.6, charSpacing: 0.8, color: C.onDarkDim, valign: 'middle'
    });
  });
  hair(s, bx - 0.15, baseY, 4 * bw + 3 * gap + 0.3, 'FFFFFF', 1, 62);

  const mx = bx + bw / 2;
  node(s, mx, baseY - 0.74, 0.075, C.amber);
  vhair(s, mx, baseY - 0.665, 0.155, C.amber, 1);
  s.addText(d.decided, {
    isTextBox: true, margin: 0, x: mx - 1.05, y: baseY - 1.06, w: 2.1, h: 0.24, align: 'center',
    fontFace: F.b, fontSize: 10, italic: true, color: C.amberL, valign: 'middle'
  });
  s.addText(d.paid, {
    isTextBox: true, margin: 0, x: bx + 3 * (bw + gap) - 0.62, y: baseY - 3.64, w: 2.2, h: 0.24, align: 'center',
    fontFace: F.b, fontSize: 10, italic: true, color: C.amberL, valign: 'middle'
  });
  s.addNotes(d.notes);
}

// ===================== 04 — CONVERGENCE =====================
{
  const d = T.s4;
  const s = slide({ eb: d.eyebrow, title: d.title, titleSize: d.titleSize, titleW: d.titleW });
  s.addText(d.kicker, {
    isTextBox: true, margin: 0, x: ML, y: 2.36, w: 10.6, h: 0.32, valign: 'middle',
    fontFace: F.b, fontSize: 12.5, italic: true, color: C.muted
  });
  const cw = 3.42, cgap = 0.68, cy = 2.92;
  d.cols.forEach((c, i) => {
    const x = ML + i * (cw + cgap);
    node(s, x + 0.075, cy + 0.075, 0.075, C.teal);
    s.addText(c.t, {
      isTextBox: true, margin: 0, x: x + 0.32, y: cy - 0.05, w: cw - 0.32, h: 0.26,
      fontFace: F.m, fontSize: 9, charSpacing: 1.6, color: C.teal, valign: 'middle'
    });
    s.addText(c.h, {
      isTextBox: true, margin: 0, x, y: cy + 0.42, w: cw, h: 0.66, valign: 'top',
      fontFace: F.d, fontSize: 15, bold: true, color: C.ink, lineSpacing: 20
    });
    s.addText(c.b, {
      isTextBox: true, margin: 0, x, y: cy + 1.20, w: cw - 0.15, h: 0.95, valign: 'top',
      fontFace: F.b, fontSize: 11, color: C.muted, lineSpacing: 17
    });
    vhair(s, x + 0.075, cy + 2.34, 0.30, C.line, 1);
  });
  hair(s, ML + 0.075, cy + 2.64, 2 * (cw + cgap), C.line, 1);
  vhair(s, W / 2, cy + 2.64, 0.30, C.teal, 1.25);
  s.addShape(pres.ShapeType.rect, {
    x: W / 2 - 3.15, y: cy + 2.94, w: 6.3, h: 0.62, fill: { color: C.teal }, line: { type: 'none' }
  });
  s.addText(d.outcome, {
    isTextBox: true, margin: 0, x: W / 2 - 3.15, y: cy + 2.94, w: 6.3, h: 0.62, align: 'center',
    fontFace: F.d, fontSize: 15, bold: true, color: C.white, valign: 'middle'
  });
  s.addNotes(d.notes);
}

// ===================== 05 — EVIDENCE =====================
{
  const d = T.s5;
  const s = slide({ eb: d.eyebrow, title: d.title, titleSize: d.titleSize, titleW: d.titleW });
  const gx = ML, gy = 3.0, gw = 6.4;
  s.addText(d.described, {
    isTextBox: true, margin: 0, x: gx, y: gy - 0.42, w: gw, h: 0.24,
    fontFace: F.m, fontSize: 8.5, charSpacing: 1.6, color: C.muted, valign: 'middle'
  });
  hair(s, gx, gy, gw, C.line, 2.25);
  [0, 0.25, 0.5, 0.75, 1].forEach(f => node(s, gx + gw * f, gy, 0.05, C.line));

  const pts = [[0, 0], [0.16, 0.42], [0.3, 0.24], [0.45, 0.86], [0.6, 0.62], [0.76, 1.18], [0.88, 0.96], [1, 1.34]];
  for (let i = 0; i < pts.length - 1; i++) {
    const x1 = gx + gw * pts[i][0], y1 = gy + pts[i][1];
    const x2 = gx + gw * pts[i + 1][0], y2 = gy + pts[i + 1][1];
    s.addShape(pres.ShapeType.line, {
      x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
      line: { color: C.teal, width: 2.25 }, flipV: y2 < y1
    });
  }
  pts.forEach(p => node(s, gx + gw * p[0], gy + p[1], 0.05, C.teal));
  s.addText(d.executed, {
    isTextBox: true, margin: 0, x: gx + gw - 3.0, y: gy + 1.50, w: 3.0, h: 0.24, align: 'right',
    fontFace: F.m, fontSize: 8.5, charSpacing: 1.6, color: C.teal, valign: 'middle'
  });

  const gf = 0.45;
  vhair(s, gx + gw * gf, gy, 0.86, C.amber, 1.5);
  node(s, gx + gw * gf, gy + 0.86, 0.045, C.amber);
  s.addText(d.gap, {
    isTextBox: true, margin: 0, x: gx + gw * gf + 0.16, y: gy + 0.14, w: 2.3, h: 0.46, valign: 'top',
    fontFace: F.b, fontSize: 10.5, italic: true, color: C.ink, lineSpacing: 15
  });

  const rx = 8.05;
  s.addText(d.rightBold, {
    isTextBox: true, margin: 0, x: rx, y: 2.62, w: 4.4, h: 0.95, valign: 'top',
    fontFace: F.d, fontSize: 15, bold: true, color: C.ink, lineSpacing: 21
  });
  s.addText(d.rightBody, {
    isTextBox: true, margin: 0, x: rx, y: 3.72, w: 4.4, h: 1.2, valign: 'top',
    fontFace: F.b, fontSize: 11.5, color: C.muted, lineSpacing: 18.5
  });
  hair(s, rx, 5.28, 4.4, C.line, 1);
  s.addText(d.metaText, {
    isTextBox: true, margin: 0, x: rx, y: 5.44, w: 3.2, h: 0.5, valign: 'top',
    fontFace: F.b, fontSize: 10.5, color: C.muted, lineSpacing: 15
  });
  s.addText(d.metaNum, {
    isTextBox: true, margin: 0, x: rx + 3.3, y: 5.40, w: 1.1, h: 0.62, align: 'right', valign: 'top',
    fontFace: F.m, fontSize: 12, color: C.teal, lineSpacing: 15
  });
  s.addNotes(d.notes);
}

// ===================== 06 — CLOUD NEUTRALITY =====================
{
  const d = T.s6;
  const s = slide({
    dark: true, bg: C.navy, tex: 'tex-dark.png', eb: d.eyebrow,
    title: d.title, titleSize: d.titleSize, titleW: d.titleW
  });
  const cw = 4.7, cy = 2.86;
  d.cols.forEach((c, i) => {
    const x = i === 0 ? ML : W - ML - cw;
    s.addText(c.t, {
      isTextBox: true, margin: 0, x, y: cy, w: cw, h: 0.26,
      fontFace: F.m, fontSize: 9.5, charSpacing: 1.9, color: C.amberL, valign: 'middle'
    });
    hair(s, x, cy + 0.40, cw, 'FFFFFF', 1, 62);
    s.addText(c.h, {
      isTextBox: true, margin: 0, x, y: cy + 0.56, w: cw, h: 0.42, valign: 'middle',
      fontFace: F.d, fontSize: 18, bold: true, color: C.white
    });
    s.addText(c.b, {
      isTextBox: true, margin: 0, x, y: cy + 1.12, w: cw - 0.2, h: 0.95, valign: 'top',
      fontFace: F.b, fontSize: 11.5, color: C.onDark, lineSpacing: 18.5
    });
    s.addText(c.m, {
      isTextBox: true, margin: 0, x, y: cy + 2.14, w: cw, h: 0.32, valign: 'middle',
      fontFace: F.m, fontSize: 13, color: C.amberL
    });
    s.addText(c.ml, {
      isTextBox: true, margin: 0, x, y: cy + 2.50, w: cw, h: 0.24, valign: 'middle',
      fontFace: F.b, fontSize: 9.5, italic: true, color: C.onDarkDim
    });
  });
  const px = W / 2;
  vhair(s, px, cy - 0.05, 3.0, 'FFFFFF', 1, 62);
  s.addShape(pres.ShapeType.rect, {
    x: px - 0.68, y: cy + 1.14, w: 1.36, h: 0.42, fill: { color: C.navy }, line: { type: 'none' }
  });
  s.addText(d.pivot, {
    isTextBox: true, margin: 0, x: px - 0.68, y: cy + 1.14, w: 1.36, h: 0.42, align: 'center',
    fontFace: F.m, fontSize: 9, charSpacing: 1.4, color: C.amber, valign: 'middle'
  });
  s.addText(d.bottom, {
    isTextBox: true, margin: 0, x: ML, y: 6.02, w: 11.4, h: 0.72, valign: 'top',
    fontFace: F.b, fontSize: 11.5, color: C.onDark, lineSpacing: 18
  });
  s.addNotes(d.notes);
}

// ===================== 07 — METHOD =====================
{
  const d = T.s7;
  const s = slide({ eb: d.eyebrow, title: d.title, titleSize: d.titleSize, titleW: d.titleW });
  s.addText(d.note, {
    isTextBox: true, margin: 0, x: 8.2, y: 1.18, w: 4.25, h: 1.2, valign: 'top',
    fontFace: F.b, fontSize: 11.5, color: C.muted, lineSpacing: 18
  });
  const sy = 3.05, cw = 2.62, cgap = 0.38;
  hair(s, ML, sy, CW, C.line, 1);
  d.stages.forEach((st, i) => {
    const x = ML + i * (cw + cgap);
    node(s, x + 0.06, sy, 0.06, C.teal);
    s.addText(String(i + 1).padStart(2, '0'), {
      isTextBox: true, margin: 0, x, y: sy + 0.24, w: cw, h: 0.3,
      fontFace: F.m, fontSize: 13, color: C.teal, valign: 'middle'
    });
    s.addText(st.t, {
      isTextBox: true, margin: 0, x, y: sy + 0.60, w: cw, h: 0.62, valign: 'bottom',
      fontFace: F.d, fontSize: 17, bold: true, color: C.ink, lineSpacing: 22
    });
    s.addText(st.d, {
      isTextBox: true, margin: 0, x, y: sy + 1.36, w: cw - 0.12, h: 0.95, valign: 'top',
      fontFace: F.b, fontSize: 10.5, color: C.muted, lineSpacing: 16.5
    });
    hair(s, x, sy + 2.44, cw - 0.3, C.line, 1);
    s.addText(st.w, {
      isTextBox: true, margin: 0, x, y: sy + 2.56, w: cw, h: 0.26,
      fontFace: F.m, fontSize: 10, color: C.ink, valign: 'middle'
    });
    if (i < d.stages.length - 1) {
      const gx2 = x + cw + cgap / 2;
      vhair(s, gx2, sy - 0.16, 0.32, C.amber, 1.5);
      s.addText(T.gate, {
        isTextBox: true, margin: 0, x: gx2 - 0.6, y: sy - 0.50, w: 1.2, h: 0.22, align: 'center',
        fontFace: F.m, fontSize: 7.5, charSpacing: 1.1, color: C.muted, valign: 'middle'
      });
    }
  });
  s.addNotes(d.notes);
}

// ===================== 08 — CAPABILITY → OUTCOME =====================
{
  const d = T.s8;
  const s = slide({ eb: d.eyebrow, title: d.title, titleSize: d.titleSize, titleW: d.titleW });
  const colX = [ML, ML + 4.05, ML + 8.1], colW = [3.55, 3.55, 3.5], hy = 2.88;
  d.heads.forEach((h, i) => {
    s.addText(h, {
      isTextBox: true, margin: 0, x: colX[i], y: hy, w: colW[i], h: 0.24,
      fontFace: F.m, fontSize: 8.5, charSpacing: 1.7, color: i === 2 ? C.teal : C.muted, valign: 'middle'
    });
  });
  hair(s, ML, hy + 0.34, CW, C.line, 1);
  d.rows.forEach((r, ri) => {
    const y = hy + 0.62 + ri * 1.16;
    r.forEach((cell, ci) => {
      s.addText(cell, {
        isTextBox: true, margin: 0, x: colX[ci], y, w: colW[ci] - 0.15, h: 0.86, valign: 'top',
        fontFace: ci === 2 ? F.d : F.b, fontSize: ci === 2 ? 13 : 11.5,
        bold: ci === 2, color: ci === 2 ? C.ink : C.muted, lineSpacing: ci === 2 ? 19 : 18
      });
    });
    node(s, colX[1] - 0.26, y + 0.16, 0.045, C.line);
    node(s, colX[2] - 0.26, y + 0.16, 0.045, C.teal);
    if (ri < d.rows.length - 1) hair(s, ML, y + 1.02, CW, C.soft, 1);
  });
  s.addNotes(d.notes);
}

// ===================== 09 — CAPABILITIES AS QUESTIONS =====================
{
  const d = T.s9;
  const s = slide({ eb: d.eyebrow, title: d.title, titleSize: d.titleSize, titleW: d.titleW, titleY: 0.98 });
  const ry = 2.52, rh = 0.84;
  hair(s, ML, ry - 0.18, CW, C.line, 1);
  d.rows.forEach((r, i) => {
    const y = ry + i * rh;
    node(s, ML + 0.055, y + 0.24, 0.055, C.teal);
    s.addText(r[0], {
      isTextBox: true, margin: 0, x: ML + 0.32, y: y + 0.02, w: 5.05, h: 0.46, valign: 'middle',
      fontFace: F.d, fontSize: 14.5, bold: true, color: C.ink
    });
    s.addText(r[1], {
      isTextBox: true, margin: 0, x: ML + 5.6, y: y + 0.07, w: 3.1, h: 0.24,
      fontFace: F.m, fontSize: 8.5, charSpacing: 1.5, color: C.teal, valign: 'middle'
    });
    s.addText(r[2], {
      isTextBox: true, margin: 0, x: ML + 5.6, y: y + 0.34, w: 5.95, h: 0.28,
      fontFace: F.b, fontSize: 10.5, color: C.muted, valign: 'middle'
    });
    hair(s, ML, y + rh - 0.12, CW, i === d.rows.length - 1 ? C.line : C.soft, 1);
  });
  s.addNotes(d.notes);
}

// ===================== 10 — AI USED TWICE =====================
{
  const d = T.s10;
  const s = slide({
    dark: true, bg: C.teal, tex: 'tex-amber.png', eb: d.eyebrow,
    title: d.title, titleSize: d.titleSize, titleW: d.titleW
  });
  const cw = 5.2, cy = 2.56;
  d.cols.forEach((c, i) => {
    const x = i === 0 ? ML : W - ML - cw;
    s.addText(c.t, {
      isTextBox: true, margin: 0, x, y: cy, w: cw, h: 0.26,
      fontFace: F.m, fontSize: 9, charSpacing: 1.8, color: C.amberL, valign: 'middle'
    });
    s.addText(c.h, {
      isTextBox: true, margin: 0, x, y: cy + 0.34, w: cw, h: 0.40, valign: 'middle',
      fontFace: F.d, fontSize: 15, bold: true, color: C.white
    });
    hair(s, x, cy + 0.88, cw, 'FFFFFF', 1, 58);
    c.items.forEach((it, j) => {
      const y = cy + 1.04 + j * 0.70;
      node(s, x + 0.05, y + 0.12, 0.05, C.amber);
      s.addText(it, {
        isTextBox: true, margin: 0, x: x + 0.3, y, w: cw - 0.3, h: 0.62, valign: 'top',
        fontFace: F.b, fontSize: 11, color: C.white, lineSpacing: 17
      });
    });
  });
  hair(s, ML, 6.22, CW, 'FFFFFF', 1, 58);
  s.addText(d.statement, {
    isTextBox: true, margin: 0, x: ML, y: 6.36, w: 11.6, h: 0.34, valign: 'middle',
    fontFace: F.d, fontSize: 12.5, bold: true, color: C.amberL
  });
  s.addNotes(d.notes);
}

// ===================== 11 — WHAT WE DECLINE =====================
{
  const d = T.s11;
  const s = slide({ eb: d.eyebrow, title: d.title, titleSize: d.titleSize, titleW: d.titleW });
  s.addText(d.body, {
    isTextBox: true, margin: 0, x: ML, y: 2.96, w: 5.0, h: 0.8, valign: 'top',
    fontFace: F.b, fontSize: 12.5, color: C.muted, lineSpacing: 20
  });
  vhair(s, ML, 3.94, 1.15, C.teal, 2);
  s.addText(d.quote, {
    isTextBox: true, margin: 0, x: ML + 0.28, y: 3.94, w: 4.9, h: 1.15, valign: 'top',
    fontFace: F.d, fontSize: 15, bold: true, color: C.teal, lineSpacing: 22
  });
  const ix = 6.6, iw = W - ML - ix;
  d.items.forEach((it, i) => {
    const y = 2.05 + i * 1.12;
    hair(s, ix, y, iw, C.line, 1);
    s.addText(String(i + 1).padStart(2, '0'), {
      isTextBox: true, margin: 0, x: ix, y: y + 0.16, w: 0.5, h: 0.26,
      fontFace: F.m, fontSize: 10, color: C.muted, valign: 'middle'
    });
    s.addText(it, {
      isTextBox: true, margin: 0, x: ix + 0.62, y: y + 0.14, w: iw - 0.62, h: 0.74, valign: 'top',
      fontFace: F.b, fontSize: 12, color: C.muted, lineSpacing: 19
    });
  });
  hair(s, ix, 2.05 + 4 * 1.12, iw, C.line, 1);
  s.addNotes(d.notes);
}

// ===================== 12 — ENGAGEMENT SHAPES =====================
{
  const d = T.s12;
  const s = slide({ eb: d.eyebrow, title: d.title, titleSize: d.titleSize, titleW: d.titleW });
  const cw = 3.62, cgap = 0.42, cy = 2.62, ch = 3.42;
  d.models.forEach((m, i) => {
    const x = ML + i * (cw + cgap);
    s.addShape(pres.ShapeType.rect, {
      x, y: cy, w: cw, h: ch, fill: { color: C.white }, line: { color: C.line, width: 0.75 },
      shadow: { type: 'outer', color: '0E1620', blur: 14, offset: 3, angle: 90, opacity: 0.07 }
    });
    node(s, x + 0.46, cy + 0.52, 0.075, C.teal);
    s.addText(m.t, {
      isTextBox: true, margin: 0, x: x + 0.46, y: cy + 0.74, w: cw - 0.92, h: 0.42, valign: 'middle',
      fontFace: F.d, fontSize: 18, bold: true, color: C.ink
    });
    s.addText(m.w, {
      isTextBox: true, margin: 0, x: x + 0.46, y: cy + 1.26, w: cw - 0.92, h: 1.2, valign: 'top',
      fontFace: F.b, fontSize: 11, color: C.muted, lineSpacing: 17.5
    });
    hair(s, x + 0.46, cy + 2.52, cw - 0.92, C.soft, 1);
    s.addText(m.o, {
      isTextBox: true, margin: 0, x: x + 0.46, y: cy + 2.64, w: cw - 0.92, h: 0.52, valign: 'top',
      fontFace: F.b, fontSize: 10.5, italic: true, color: C.ink, lineSpacing: 16
    });
    s.addText(m.d, {
      isTextBox: true, margin: 0, x: x + 0.46, y: cy + 3.10, w: cw - 0.92, h: 0.26, align: 'right',
      fontFace: F.m, fontSize: 10.5, color: C.teal, valign: 'middle'
    });
  });
  s.addText(d.kicker, {
    isTextBox: true, margin: 0, x: ML, y: 6.24, w: 11.4, h: 0.3, valign: 'middle',
    fontFace: F.b, fontSize: 12, italic: true, color: C.muted
  });
  s.addNotes(d.notes);
}

// ===================== 13 — REFERENCES =====================
{
  const d = T.s13;
  const s = slide({ eb: d.eyebrow, title: d.title, titleSize: d.titleSize, titleW: d.titleW });
  s.addText(d.note, {
    isTextBox: true, margin: 0, x: 8.3, y: 1.16, w: 4.15, h: 1.2, valign: 'top',
    fontFace: F.b, fontSize: 12, color: C.muted, lineSpacing: 19
  });
  const refs = JSON.parse(fs.readFileSync(__dirname + '/refs.json', 'utf8'));
  const order = ['mercedes-benz', 'pwc', 'gsk', 'boehringer-ingelheim', 'beko', 'enerjisa',
    'wavin', 'imerys', 'flint', 'peri', 'hidromek', 'aydem',
    'nuh-cimento', 'belbim', 'tcdd', 'iett', 'fusion-consulting'];
  const byKey = {};
  refs.forEach(r => { byKey[r.src.replace('/logos/', '').replace(/\.\w+$/, '')] = r; });
  const cellW = 1.94, cellH = 1.02, gapX = 0.12, gapY = 0.30, perRow = 6, startX = ML, startY = 3.02;
  order.forEach((key, i) => {
    const r = byKey[key]; if (!r) return;
    const col = i % perRow, row = Math.floor(i / perRow);
    const cx = startX + col * (cellW + gapX) + cellW / 2;
    const cy2 = startY + row * (cellH + gapY) + cellH / 2;
    const maxW = cellW - 0.34, maxH = 0.62, ar = r.iw / r.ih;
    let w = maxW, h = w / ar;
    if (h > maxH) { h = maxH; w = h * ar; }
    s.addImage({ path: `${IMG}/ref-${key}.png`, x: cx - w / 2, y: cy2 - h / 2, w, h });
  });
  for (let row = 0; row < 3; row++) {
    hair(s, ML, startY + row * (cellH + gapY) + cellH + 0.06, CW, C.soft, 1);
  }
  s.addNotes(d.notes);
}

// ===================== 14 — WHY CPEAK / CLOSE =====================
{
  const d = T.s14; n++;
  const s = wrap(pres.addSlide());
  s.background = { color: C.ink };
  s.addImage({ path: `${IMG}/tex-dark.png`, x: 0, y: 0, w: W, h: H });
  eyebrow(s, d.eyebrow, true);
  s.addText(d.title, {
    isTextBox: true, margin: 0, x: ML, y: 1.02, w: 11.0, h: 1.5, valign: 'top',
    fontFace: F.d, fontSize: d.titleSize, bold: true, color: C.white, lineSpacing: d.titleLead
  });
  const pw = 2.62, pgap = 0.24, py = 2.92;
  d.pillars.forEach((p, i) => {
    const x = ML + i * (pw + pgap);
    hair(s, x, py, pw, 'FFFFFF', 1, 62);
    node(s, x + 0.05, py, 0.05, C.amber);
    s.addText(p[0], {
      isTextBox: true, margin: 0, x, y: py + 0.20, w: pw, h: 0.24,
      fontFace: F.m, fontSize: 9, charSpacing: 1.7, color: C.amberL, valign: 'middle'
    });
    s.addText(p[1], {
      isTextBox: true, margin: 0, x, y: py + 0.54, w: pw - 0.12, h: 1.1, valign: 'top',
      fontFace: F.b, fontSize: 11, color: C.onDark, lineSpacing: 17.5
    });
  });
  s.addText(d.cta, {
    isTextBox: true, margin: 0, x: ML, y: 4.84, w: 6.0, h: 0.9, valign: 'top',
    fontFace: F.d, fontSize: 18, bold: true, color: C.white, lineSpacing: 25
  });
  const cx0 = 7.05;
  [[0, C.amberL, 'info@cpeakconsultancy.com'], [1, C.white, '+90 (507) 032 81 70'],
   [2, C.onDark, 'linkedin.com/company/cpeak-consultancy']].forEach(([i, col, txt]) => {
    s.addText(txt, {
      isTextBox: true, margin: 0, x: cx0, y: 4.82 + i * 0.34, w: 5.4, h: 0.30,
      fontFace: F.m, fontSize: 11.5, color: col, valign: 'middle'
    });
  });
  s.addText(d.address, {
    isTextBox: true, margin: 0, x: cx0, y: 5.94, w: 5.4, h: 0.56, valign: 'top',
    fontFace: F.b, fontSize: 10.5, color: C.onDarkDim, lineSpacing: 16
  });
  s.addImage({ path: `${IMG}/logo-dark.png`, x: ML, y: 5.95, w: 1.85, h: 0.637 });
  hair(s, ML, 6.95, CW, 'FFFFFF', 0.75, 82);
  s.addText(d.disclaimer, {
    isTextBox: true, margin: 0, x: ML, y: 7.06, w: 11.6, h: 0.24, valign: 'middle',
    fontFace: F.b, fontSize: 8, color: C.onDarkDim
  });
  s.addNotes(d.notes);
}

fs.writeFileSync(__dirname + '/scene-' + LANG + '.json', JSON.stringify(SCENE, null, 1));
pres.writeFile({ fileName: __dirname + '/../' + T.file })
  .then(f => console.log('WROTE', f, '—', n, 'slides,', LANG.toUpperCase()));
