const L = require('./lib.cjs');
const { C, F, W, H, M, CW, span } = L;
const A = './assets/';

// -----------------------------------------------------------------
// Çözüm sayfalarının ortak iskeleti (01–04)
// Solda hep aynı sıra: çalışma adımları → kime uygun → süre.
// Sağdaki alan sayfaya göre değişir: görsel, tablo ya da şema.
// -----------------------------------------------------------------
function solutionPage(p, t, c, no, visual) {
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };
  L.brand(s, 'light', A);

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(8), leadW: span(8), size: 28,
  });

  const lw = 5.35;
  let y = cy0;

  L.monoLabel(s, M, y, lw, t.labels.steps, C.teal, 7.5);
  y += 0.32;
  c.steps.forEach((step, i) => {
    L.monoLabel(s, M, y + 0.02, 0.4, String(i + 1).padStart(2, '0'), C.sep, 7.5);
    s.addText(step, {
      x: M + 0.5, y, w: lw - 0.5, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 10, color: C.ink, valign: 'middle',
    });
    y += 0.32;
  });

  if (c.who) {
    y += 0.26;
    L.monoLabel(s, M, y, lw, t.labels.who, C.teal, 7.5);
    y += 0.3;
    c.who.forEach((txt) => {
      s.addShape('ellipse', { x: M + 0.02, y: y + 0.1, w: 0.075, h: 0.075,
        fill: { color: C.teal }, line: { color: C.teal, width: 0.25 } });
      s.addText(txt, {
        x: M + 0.3, y, w: lw - 0.3, h: 0.44, isTextBox: true, margin: 0,
        fontFace: F.body, fontSize: 9.5, color: C.muted, lineSpacing: 12.5, valign: 'top',
      });
      y += 0.46;
    });
  }

  y += 0.22;
  L.monoLabel(s, M, y, lw, t.labels.duration, C.teal, 7.5);
  s.addText(c.duration, {
    x: M, y: y + 0.22, w: lw, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 12, bold: true, color: C.ink, charSpacing: -0.2, valign: 'middle',
  });

  visual(s, cy0);

  L.foot(s, no, 'light');
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// KAPAK
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
  L.body(s, M, 5.22, 5.15, 0.6, c.lead, 'dark', 10.5);
  L.monoLabel(s, M, 6.78, 5, c.meta, C.amberDark, 8.5);

  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 01 — SAP FİNANS MODÜLLERİ
// =================================================================
function finance(p, t) {
  return solutionPage(p, t, t.finance, 1, (s, cy0) => {
    s.addImage({ path: A + 'fig-finance' + t.figSuffix + '.jpg', x: 6.65, y: cy0 - 0.35, w: 5.83, h: 3.89 });
  });
}

// =================================================================
// 02 — S/4HANA DÖNÜŞÜMÜ  (geçiş yöntemleri tablosu)
// =================================================================
function s4hana(p, t) {
  const c = t.s4hana;
  return solutionPage(p, t, c, 2, (s, cy0) => {
    const x = 6.65, w = 5.83;
    L.monoLabel(s, x, cy0, w, c.routesLabel, C.teal, 7.5);
    let y = cy0 + 0.32;
    c.routes.forEach(([name, tag, desc], i) => {
      const h = 1.16;
      s.addShape('rect', { x, y, w, h, fill: { color: i === 2 ? C.soft : C.paper } });
      s.addText(name, {
        x: x + 0.28, y: y + 0.14, w: w - 1.6, h: 0.3, isTextBox: true, margin: 0,
        fontFace: F.display, fontSize: 13, bold: true, color: C.teal, charSpacing: -0.25, valign: 'middle',
      });
      s.addText(tag, {
        x: x + w - 1.5, y: y + 0.14, w: 1.22, h: 0.3, isTextBox: true, margin: 0,
        fontFace: F.mono, fontSize: 7.5, color: C.sep, charSpacing: 0.6,
        align: 'right', valign: 'middle',
      });
      s.addText(desc, {
        x: x + 0.28, y: y + 0.48, w: w - 0.56, h: 0.56, isTextBox: true, margin: 0,
        fontFace: F.body, fontSize: 9.5, color: C.muted, lineSpacing: 12.5, valign: 'top',
      });
      y += h + 0.16;
    });
  });
}

// =================================================================
// 03 — SAP PUBLIC CLOUD  (katman şeması)
// =================================================================
function publicCloud(p, t) {
  const c = t.publicCloud;
  return solutionPage(p, t, c, 3, (s, cy0) => {
    L.schema(s, 6.65, cy0, 5.83, c.schemaLabel, c.schema, c.schemaNote, [0]);
  });
}

module.exports = { cover, finance, s4hana, publicCloud, solutionPage };
