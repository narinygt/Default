const L = require('./lib.cjs');
const { C, F, W, H, M, CW, span } = L;
const A = './assets/';
const refs = require('./refs.json');

// =================================================================
// 09 — TEKNOLOJİ VE İŞ
// =================================================================
function techBusiness(p, t) {
  const c = t.ai;
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(10), leadW: span(9), size: 24,
  });

  s.addImage({ path: A + 'fig-ai' + t.figSuffix + '.jpg', x: 0.45, y: cy0 - 0.08, w: 6.5, h: 4.33 });

  const cx = 7.65, cwd = 4.83;
  let y = cy0 + 0.06;
  c.blocks.forEach(([label, head, items]) => {
    L.monoLabel(s, cx, y, cwd, label, C.teal, 7.5);
    s.addText(head, {
      x: cx, y: y + 0.24, w: cwd, h: 0.28, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 13.5, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
    });
    y += 0.58;
    items.forEach((txt) => {
      s.addShape('ellipse', { x: cx + 0.03, y: y + 0.10, w: 0.075, h: 0.075,
        fill: { color: C.teal }, line: { color: C.teal, width: 0.25 } });
      s.addText(txt, {
        x: cx + 0.28, y, w: cwd - 0.28, h: 0.28, isTextBox: true, margin: 0,
        fontFace: F.body, fontSize: 9.5, color: C.ink, valign: 'middle',
      });
      y += 0.28;
    });
    y += 0.26;
  });

  // Duruş — tek ve ölçülü amber anı.
  s.addShape('rect', { x: cx, y: y + 0.06, w: 0.13, h: 0.13,
    fill: { color: C.amber }, line: { color: C.amber, width: 0.25 } });
  s.addText([
    { text: c.stanceLead, options: { fontFace: F.display, fontSize: 10.5, bold: true, color: C.ink } },
    { text: c.stanceBody, options: { fontFace: F.body, fontSize: 9.5, color: C.muted } },
  ], { x: cx + 0.28, y, w: cwd - 0.28, h: 0.6, isTextBox: true, margin: 0, lineSpacing: 13, valign: 'top' });

  L.foot(s, 9, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 10 — PRATİKTE PROJELER
// =================================================================
function engagements(p, t) {
  const c = t.cases;
  const s = p.addSlide();
  s.background = { color: C.paper };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(10), leadW: span(8), size: 26,
  });
  s.addText(c.tag, {
    x: W - M - 4.2, y: cy0 - 0.52, w: 4.2, h: 0.24, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 7.5, color: C.sep, charSpacing: 0.75, align: 'right', valign: 'middle',
  });

  // Üç sütun beyaz bir yüzeyin üstünde: ayraç çizgisi yok.
  const cw = 3.72, gapx = 0.38, topY = cy0 + 0.05;
  c.items.forEach(([sector, scale, ...body], i) => {
    const x = M + i * (cw + gapx);
    s.addShape('rect', { x: x - 0.22, y: topY, w: cw + 0.44, h: 4.26, fill: { color: 'FFFFFF' } });
    s.addText(sector, {
      x, y: topY + 0.24, w: cw, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 15, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
    });
    L.monoLabel(s, x, topY + 0.58, cw, scale, C.sep, 7);
    let y = topY + 0.94;
    body.forEach((txt, j) => {
      L.monoLabel(s, x, y, cw, c.labels[j], C.teal, 7);
      L.body(s, x, y + 0.22, cw, 0.9, txt, 'light', 9.5);
      y += 1.1;
    });
  });

  L.body(s, M, topY + 4.44, span(10), 0.4, c.disclaimer, 'light', 8.5);
  L.foot(s, 10, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 11 — NEDEN CPEAK
// =================================================================
function whyCpeak(p, t) {
  const c = t.why;
  const s = p.addSlide();
  s.background = { color: C.paper };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(10), leadW: span(9), size: 26,
  });

  const pw = 2.72, gapx = 0.24, topY = cy0 + 0.1;
  c.pillars.forEach(([title, d], i) => {
    const x = M + i * (pw + gapx);
    L.monoLabel(s, x, topY + 0.2, pw, String(i + 1).padStart(2, '0'), C.teal, 11);
    s.addText(title, {
      x, y: topY + 0.52, w: pw - 0.1, h: 0.62, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 13.5, bold: true, color: C.teal, charSpacing: -0.3, lineSpacing: 17, valign: 'top',
    });
    L.body(s, x, topY + 1.2, pw - 0.1, 1.7, d, 'light', 9.5);
  });

  // Referans şeridi — sitenin kendi logo bandı, çerçevesiz.
  const bandY = 5.62, bandH = 1.06;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: bandH, fill: { color: 'FFFFFF' } });
  L.monoLabel(s, M, bandY + bandH / 2 - 0.1, 1.5, c.refsLabel, C.sep, 7.5);

  const maxH = 0.30, k = 0.0072, budget = CW - 1.62;
  const placed = [];
  let used = 0;
  for (const r of refs) {
    const maxW = r.w * k, ar = r.iw / r.ih;
    let h = maxH, w = h * ar;
    if (w > maxW) { w = maxW; h = w / ar; }
    if (used + w + (placed.length ? 0.34 : 0) > budget) continue;
    used += w + (placed.length ? 0.34 : 0);
    placed.push({ r, w, h });
  }
  let lx = M + 1.62 + (budget - used) / 2;
  placed.forEach(({ r, w, h }, i) => {
    if (i) lx += 0.34;
    const file = 'ref-' + r.src.split('/').pop().replace(/\.(svg|webp)$/, '') + '.png';
    s.addImage({ path: A + file, x: lx, y: bandY + (bandH - h) / 2, w, h });
    lx += w;
  });

  L.foot(s, 11, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 12 — KAPANIŞ
// =================================================================
function closing(p, t) {
  const c = t.closing;
  const s = p.addSlide();
  s.background = { color: C.navy };

  s.addImage({ path: A + 'quantum.jpg', x: 9.05, y: 1.15, w: 3.6, h: 3.6 / 0.849 });
  s.addImage({ path: A + 'logo-dark.png', x: M, y: 0.78, w: 1.9, h: 1.9 / 2.905 });

  L.eyebrow(s, M, 2.36, c.eyebrow, 'dark');
  s.addText(c.title, {
    x: M, y: 2.72, w: span(7), h: 1.9, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: c.size, bold: true, color: 'FFFFFF',
    charSpacing: -0.8, lineSpacing: c.size * 1.29, valign: 'top',
  });
  L.body(s, M, 4.66, 5.6, 0.6, c.lead, 'dark', 10);

  const cy = 5.58, colw = 3.5, colGap = 0.35;
  c.contact.forEach(([k, v], i) => {
    const x = M + (i % 3) * (colw + colGap);
    const y = cy + Math.floor(i / 3) * 0.66;
    L.monoLabel(s, x, y, colw, k, C.amberDark, 7);
    s.addText(v, {
      x, y: y + 0.19, w: colw, h: 0.38, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: 'FFFFFF', lineSpacing: 12, valign: 'top',
    });
  });

  L.pageNo(s, 12, C.navy, 6.94);
  s.addNotes(c.notes);
  return s;
}

module.exports = { techBusiness, engagements, whyCpeak, closing };
