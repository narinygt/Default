const L = require('./lib.cjs');
const { C, F, W, H, M, CW, span } = L;
const A = './assets/';

/** Sayfa iskeleti: beyaz zemin, sağ üstte logo, standart başlık bloğu. */
function page(p, c, opts = {}) {
  const s = p.addSlide();
  s.background = { color: opts.bg || 'FFFFFF' };
  L.brand(s, 'light', A);
  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(9), leadW: span(9), size: 28,
  });
  return { s, cy0 };
}

/** Modül / madde kutusu: kod veya numara solda, ad ve açıklama sağda. */
function itemBox(s, x, y, w, h, code, name, desc, o = {}) {
  s.addShape('rect', { x, y, w, h, fill: { color: o.fill || C.soft } });
  s.addText(code, {
    x: x + 0.26, y: y + 0.16, w: 0.95, h: 0.42, isTextBox: true, margin: 0,
    fontFace: o.codeMono ? F.mono : F.display, fontSize: o.codeSize || 22,
    bold: !o.codeMono, color: C.teal, charSpacing: -0.4, valign: 'middle',
  });
  s.addText(name, {
    x: x + 1.3, y: y + 0.16, w: w - 1.56, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 13, bold: true, color: C.teal, charSpacing: -0.25, valign: 'middle',
  });
  s.addText(desc, {
    x: x + 1.3, y: y + 0.5, w: w - 1.56, h: h - 0.66, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: 9.5, color: C.muted, lineSpacing: 12.5, valign: 'top',
  });
}

// =================================================================
// KAPAK
// =================================================================
function cover(p, t) {
  const c = t.cover;
  const s = p.addSlide();
  s.background = { color: C.navy };

  // Özgün kapak grafiği — sitedeki fotoğraf ya da render kullanılmaz.
  L.coverArt(s, 7.35, 1.05, 5.15, 5.4);
  s.addImage({ path: A + 'logo-dark.png', x: M, y: 0.82, w: 2.05, h: 2.05 / 2.905 });

  L.eyebrow(s, M, 2.78, c.eyebrow, 'dark');
  s.addText(c.h1, {
    x: M, y: 3.14, w: 5.45, h: 2.0, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: c.size, bold: true, color: 'FFFFFF',
    charSpacing: -0.9, lineSpacing: c.size * 1.22, valign: 'top',
  });
  L.body(s, M, 5.22, 5.15, 0.6, c.lead, 'dark', 10.5);
  L.monoLabel(s, M, 6.78, 5, c.meta, C.amberDark, 8.5);

  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 01 — SAP FİNANS MODÜLLERİ
// =================================================================
function finance(p, t) {
  const c = t.finance;
  const { s, cy0 } = page(p, c);

  const bw = 5.6, bh = 1.22, gx = 6.03;
  c.blocks.forEach(([code, name, desc], i) => {
    itemBox(s, M + (i % 2) * gx, cy0 + Math.floor(i / 2) * 1.4, bw, bh, code, name, desc);
  });

  L.monoLabel(s, M, cy0 + 3.06, span(4), c.flowLabel, C.sep, 7.5);
  L.flowRow(s, M, cy0 + 3.32, CW, c.flow);

  L.foot(s, 1, 'light');
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 02 — S/4HANA DÖNÜŞÜMÜ
// =================================================================
function s4hana(p, t) {
  const c = t.s4hana;
  const { s, cy0 } = page(p, c);

  L.monoLabel(s, M, cy0, span(4), c.routesLabel, C.sep, 7.5);
  const cw = 3.72, gx = 0.38, ry = cy0 + 0.28;
  c.routes.forEach(([name, tag, desc], i) => {
    const x = M + i * (cw + gx);
    s.addShape('rect', { x, y: ry, w: cw, h: 2.02, fill: { color: i === 2 ? C.soft : C.paper } });
    L.monoLabel(s, x + 0.26, ry + 0.26, cw - 0.52, tag, C.sep, 7);
    s.addText(name, {
      x: x + 0.26, y: ry + 0.54, w: cw - 0.52, h: 0.56, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14.5, bold: true, color: C.teal,
      charSpacing: -0.3, lineSpacing: 18, valign: 'top',
    });
    s.addText(desc, {
      x: x + 0.26, y: ry + 1.16, w: cw - 0.52, h: 1.0, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: C.muted, lineSpacing: 12.5, valign: 'top',
    });
  });

  L.monoLabel(s, M, ry + 2.32, span(4), c.flowLabel, C.sep, 7.5);
  L.flowRow(s, M, ry + 2.58, CW, c.flow);

  L.foot(s, 2, 'light');
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 03 — SAP PUBLIC CLOUD
// =================================================================
function publicCloud(p, t) {
  const c = t.publicCloud;
  const { s, cy0 } = page(p, c);

  let y = cy0;
  c.blocks.forEach(([no, name, desc]) => {
    L.monoLabel(s, M, y + 0.03, 0.4, no, C.teal, 7.5);
    s.addText(name, {
      x: M + 0.5, y, w: 5.55, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 12, bold: true, color: C.teal, charSpacing: -0.2, valign: 'middle',
    });
    s.addText(desc, {
      x: M + 0.5, y: y + 0.27, w: 5.55, h: 0.44, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: C.muted, lineSpacing: 12.5, valign: 'top',
    });
    y += 0.8;
  });

  L.schema(s, 7.2, cy0, 5.28, c.schemaLabel, c.schema, null, [0]);

  L.foot(s, 3, 'light');
  s.addNotes(c.notes);
  return s;
}

module.exports = { cover, finance, s4hana, publicCloud, page, itemBox };
