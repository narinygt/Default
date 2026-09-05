const L = require('./lib.cjs');
const { C, F, W, H, M, CW, span } = L;
const A = './assets/';

// =================================================================
// 01 — KAPAK
// =================================================================
function cover(p, t) {
  const c = t.cover;
  const s = p.addSlide();
  s.background = { color: C.navy };

  s.addImage({ path: A + 'cover-hero.jpg', x: 6.60, y: 0, w: 6.733, h: 7.5 });
  s.addImage({ path: A + 'logo-dark.png', x: M, y: 0.82, w: 2.05, h: 2.05 / 2.905 });

  L.eyebrow(s, M, 2.78, c.eyebrow, 'dark');
  s.addText(c.h1, {
    x: M, y: 3.14, w: 5.45, h: 2.0, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: c.size, bold: true, color: 'FFFFFF',
    charSpacing: -0.9, lineSpacing: c.size * 1.22, valign: 'top',
  });
  L.body(s, M, 5.22, 5.15, 0.9, c.lead, 'dark', 10.5);
  L.monoLabel(s, M, 6.78, 5, c.meta, C.amberDark, 8.5);

  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 02 — BAŞLANGIÇ NOKTASI (müşterinin durumu)
// =================================================================
function problem(p, t) {
  const c = t.problem;
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: 5.8, leadW: 5.8, size: 23, leadSize: 10,
  });

  s.addImage({ path: A + 'fig-finance' + t.figSuffix + '.jpg', x: 6.55, y: 1.42, w: 6.05, h: 4.03 });

  // Aralık madde başına sabit değil: bir satırlık ve iki satırlık
  // maddeler arasında aynı görsel boşluk kalsın diye satır sayısına
  // göre hesaplanır.
  let y = cy0;
  c.items.forEach((txt) => {
    const lines = L.estLines(txt, 5.5, 10, 0.585);
    s.addShape('ellipse', { x: M + 0.02, y: y + 0.11, w: 0.075, h: 0.075,
      fill: { color: C.teal }, line: { color: C.teal, width: 0.25 } });
    L.body(s, M + 0.3, y, 5.5, lines * 0.22 + 0.1, txt, 'light', 10);
    y += lines * 0.21 + 0.26;
  });

  L.foot(s, 2, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 03 — KARARIN BEDELİ
// =================================================================
function stakes(p, t) {
  const c = t.stakes;
  const s = p.addSlide();
  s.background = { color: C.navy };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, w: span(9), size: 27, tone: 'dark',
  });

  const cw = 2.72, gapx = 0.24, topY = cy0 + 0.55;
  c.items.forEach(([kicker, txt], i) => {
    const x = M + i * (cw + gapx);
    L.monoLabel(s, x, topY, cw, kicker, C.amberDark, 8);
    s.addText(txt, {
      x, y: topY + 0.36, w: cw - 0.08, h: 1.8, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 11, color: 'FFFFFF', lineSpacing: 16.5, valign: 'top',
    });
  });

  s.addText(c.closingLine, {
    x: M, y: topY + 1.95, w: span(9), h: 0.7, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 15, color: C.amberDark,
    charSpacing: -0.3, lineSpacing: 21, valign: 'top',
  });

  L.foot(s, 3, 'dark', t.foot);
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 04 — CEVABIMIZ (odak, kurumsal bilgi, dört fark, referanslar)
// =================================================================
function answer(p, t) {
  const c = t.answer;
  const s = p.addSlide();
  s.background = { color: C.paper };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(10), leadW: span(10), size: 25,
  });

  L.monoLabel(s, M, cy0 - 0.06, span(10), c.facts, C.sep, 7.5);

  const pw = 2.72, gapx = 0.24, topY = cy0 + 0.34;
  c.pillars.forEach(([title, d], i) => {
    const x = M + i * (pw + gapx);
    L.monoLabel(s, x, topY, pw, String(i + 1).padStart(2, '0'), C.teal, 11);
    s.addText(title, {
      x, y: topY + 0.32, w: pw - 0.1, h: 0.62, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 13.5, bold: true, color: C.teal,
      charSpacing: -0.3, lineSpacing: 17, valign: 'top',
    });
    L.body(s, x, topY + 1.0, pw - 0.1, 1.5, d, 'light', 9.5);
  });

  // Referans şeridi — sitenin kendi logo bandı, çerçevesiz.
  const bandY = 5.62, bandH = 1.06;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: bandH, fill: { color: 'FFFFFF' } });
  L.monoLabel(s, M, bandY + bandH / 2 - 0.1, 1.5, c.refsLabel, C.sep, 7.5);
  L.refStrip(s, M + 1.62, bandY, bandH, CW - 1.62, A);

  L.foot(s, 4, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

module.exports = { cover, problem, stakes, answer };
