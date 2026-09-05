const L = require('./lib.cjs');
const { C, F, W, H, M, CW, colX, span } = L;
const A = './assets/';

// =================================================================
// 01 — KAPAK
// =================================================================
function cover(p, t) {
  const c = t.cover;
  const s = p.addSlide();
  s.background = { color: C.navy };

  // Sitedeki hero'nun 'background' varyantı: görsel sağa yaslı, sol
  // kenarı lacivert zemine karışıyor (geçiş görsele işlendi).
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
// 02 — BİZ KİMİZ
// =================================================================
function whoWeAre(p, t) {
  const c = t.who;
  const s = p.addSlide();
  s.background = { color: C.paper };

  L.header(s, { eyebrow: c.eyebrow, title: c.title, w: 5.0, size: 25 });

  const rx = 7.0, rw = 5.48;
  let y = 0.88;
  c.paras.forEach((txt) => { L.body(s, rx, y, rw, 1.15, txt, 'light', 10.5); y += 1.42; });

  // Kurumsal bilgiler — çizgisiz, yalnızca aralıkla ayrılmış kayıtlar.
  let fy = 2.68;
  c.facts.forEach(([k, v]) => {
    L.monoLabel(s, M, fy, 5.0, k, C.sep, 7.5);
    s.addText(v, {
      x: M, y: fy + 0.2, w: 5.0, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14, bold: true, color: C.teal, charSpacing: -0.2, valign: 'middle',
    });
    fy += 0.78;
  });

  s.addText(c.quote, {
    x: M, y: 5.42, w: 9.4, h: 0.6, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 14.5, color: C.teal, charSpacing: -0.3, lineSpacing: 20, valign: 'top',
  });

  // Yetkinlik şeridi — sitenin koyu bandı, sayfa kenarına dayanır.
  const by = 6.3, bh = H - by, sw = CW / 4;
  s.addShape('rect', { x: 0, y: by, w: W, h: bh, fill: { color: C.teal } });
  c.strip.forEach(([k, fig, txt], i) => {
    const x = M + i * sw;
    L.monoLabel(s, x, by + 0.32, sw - 0.3, k, C.amberDark, 7.5);
    if (fig) {
      s.addText([
        { text: fig, options: { fontFace: F.mono, fontSize: 19, color: C.amber, charSpacing: -0.2 } },
        { text: '  ' + txt, options: { fontFace: F.body, fontSize: 10, color: 'FFFFFF' } },
      ], { x, y: by + 0.58, w: sw - 0.3, h: 0.42, isTextBox: true, margin: 0, valign: 'middle' });
    } else {
      s.addText(txt, {
        x, y: by + 0.58, w: sw - 0.3, h: 0.42, isTextBox: true, margin: 0,
        fontFace: F.body, fontSize: 10, color: 'FFFFFF', lineSpacing: 14, valign: 'middle',
      });
    }
  });
  L.pageNo(s, 2, C.teal, H - 0.42);

  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 03 — UZMANLIK ALANLARIMIZ
// =================================================================
function expertise(p, t) {
  const c = t.expertise;
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  L.header(s, { eyebrow: c.eyebrow, title: c.title, w: 5.3, size: 25 });
  s.addImage({ path: A + 'fig-finance' + t.figSuffix + '.jpg', x: 6.55, y: 1.42, w: 6.05, h: 4.03 });

  let ay = 2.62;
  c.items.forEach(([no, title, desc]) => {
    L.monoLabel(s, M, ay + 0.04, 0.5, no, C.teal, 8.5);
    s.addText(title, {
      x: M + 0.58, y: ay, w: 4.7, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14.5, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
    });
    L.body(s, M + 0.58, ay + 0.36, 4.72, 0.85, desc, 'light', 9.5);
    ay += 1.28;
  });

  L.foot(s, 3, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 04 — SAP EKOSİSTEMİ
// =================================================================
function sapEcosystem(p, t) {
  const c = t.sap;
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(9), size: 25 });

  const topY = 2.30, bh = 0.70, gap = 0.155;
  const colW = span(3), coreX = colX(3.6) - 0.1, coreW = span(4.8);
  const rightX = W - M - colW;
  const total = 4 * bh + 3 * gap;

  L.monoLabel(s, M, topY - 0.32, colW, c.leftLabel, C.sep, 7.5);
  L.monoLabel(s, rightX, topY - 0.32, colW, c.rightLabel, C.sep, 7.5);

  const boxes = (x, items) => items.forEach(([title, desc], i) => {
    const y = topY + i * (bh + gap);
    // Kutuları ayıran şey kenarlık değil, kendi yüzeyleri.
    s.addShape('rect', { x, y, w: colW, h: bh, fill: { color: C.soft } });
    s.addText(title, {
      x: x + 0.16, y: y + 0.09, w: colW - 0.32, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 11, bold: true, color: C.teal, charSpacing: -0.2, valign: 'middle',
    });
    s.addText(desc, {
      x: x + 0.16, y: y + 0.33, w: colW - 0.32, h: 0.32, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 8.5, color: C.muted, lineSpacing: 11, valign: 'top',
    });
  });
  boxes(M, c.left);
  boxes(rightX, c.right);

  s.addShape('rect', { x: coreX, y: topY, w: coreW, h: total, fill: { color: C.teal } });
  L.monoLabel(s, coreX + 0.3, topY + 0.34, coreW - 0.6, c.coreLabel, C.amberDark, 8);
  s.addText('FI · CO · PA · PS', {
    x: coreX + 0.3, y: topY + 0.62, w: coreW - 0.6, h: 0.55, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 27, bold: true, color: 'FFFFFF', charSpacing: -0.6, valign: 'middle',
  });
  c.core.forEach((txt, i) => {
    const y = topY + 1.46 + i * 0.42;
    s.addShape('ellipse', { x: coreX + 0.32, y: y + 0.10, w: 0.075, h: 0.075,
      fill: { color: C.amberDark }, line: { color: C.amberDark, width: 0.25 } });
    s.addText(txt, {
      x: coreX + 0.56, y, w: coreW - 0.86, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 10, color: 'FFFFFF', valign: 'middle',
    });
  });

  L.body(s, M, 6.02, span(9), 0.6, c.footnote, 'light', 9.5);
  L.foot(s, 4, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

module.exports = { cover, whoWeAre, expertise, sapEcosystem };
