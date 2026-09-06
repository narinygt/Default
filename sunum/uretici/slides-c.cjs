const L = require('./lib.cjs');
const { C, F, W, H, M, CW, span } = L;
const A = './assets/';

// =================================================================
// 08 — NASIL ÇALIŞIRIZ
// =================================================================
function method(p, t) {
  const c = t.method;
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };
  L.brand(s, 'light', A);

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(9), leadW: span(9), size: 28,
  });

  // Dört aşama, özgün şema: numara, ad, çıktı ve süre tek kutuda.
  const cw = 2.72, gx = 0.24, ph = 2.5;
  c.steps.forEach(([no, name, out, dur], i) => {
    const x = M + i * (cw + gx);
    s.addShape('rect', { x, y: cy0, w: cw, h: ph, fill: { color: i === 3 ? C.teal : C.soft } });
    const dark = i === 3;
    s.addText(no, {
      x: x + 0.26, y: cy0 + 0.24, w: cw - 0.52, h: 0.44, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 20, color: dark ? C.amber : C.teal, charSpacing: -0.4, valign: 'middle',
    });
    s.addText(name, {
      x: x + 0.26, y: cy0 + 0.76, w: cw - 0.52, h: 0.56, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 13, bold: true, color: dark ? 'FFFFFF' : C.teal,
      charSpacing: -0.25, lineSpacing: 16, valign: 'top',
    });
    L.monoLabel(s, x + 0.26, cy0 + 1.42, cw - 0.52, dur, dark ? C.amberDark : C.sep, 7.5);
    s.addText(out, {
      x: x + 0.26, y: cy0 + 1.7, w: cw - 0.52, h: 0.62, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: dark ? C.onDark : C.muted, lineSpacing: 12.5, valign: 'top',
    });
  });

  // Çalışma modelleri — koyu bant, sayfa kenarına dayanır.
  const bandY = 5.24;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: H - bandY, fill: { color: C.navy } });
  L.monoLabel(s, M, bandY + 0.5, span(6), c.modelsLabel, C.amberDark, 7.5);
  c.models.forEach(([name, dur], i) => {
    const x = M + i * (3.72 + 0.38);
    s.addText(name, {
      x, y: bandY + 0.92, w: 3.72, h: 0.32, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14, bold: true, color: 'FFFFFF', charSpacing: -0.3, valign: 'middle',
    });
    L.monoLabel(s, x, bandY + 1.3, 3.72, dur, C.onDark, 8);
  });
  L.pageNo(s, 8, C.navy, H - 0.34);

  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 09 — REFERANSLAR
// =================================================================
function references(p, t) {
  const c = t.references;
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };
  L.brand(s, 'light', A);

  const cy0 = L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(9), size: 28 });
  L.refWall(s, M, cy0 + 0.55, CW, A, { maxH: 0.52, k: 0.0132, gap: 0.62, rowGap: 0.82 });

  L.foot(s, 9, 'light');
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 10 — YAKLAŞIMIMIZ
// =================================================================
function approach(p, t) {
  const c = t.approach;
  const s = p.addSlide();
  s.background = { color: C.paper };
  L.brand(s, 'light', A);

  const cy0 = L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(9), size: 28 });

  const cw = 3.72, gx = 0.38, ph = 1.92;
  c.principles.forEach(([head, txt], i) => {
    const x = M + (i % 3) * (cw + gx);
    const y = cy0 + Math.floor(i / 3) * (ph + 0.24);
    s.addShape('rect', { x, y, w: cw, h: ph, fill: { color: 'FFFFFF' } });
    L.monoLabel(s, x + 0.28, y + 0.28, cw - 0.56, String(i + 1).padStart(2, '0'), C.teal, 8);
    s.addText(head, {
      x: x + 0.28, y: y + 0.58, w: cw - 0.56, h: 0.56, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14, bold: true, color: C.teal,
      charSpacing: -0.3, lineSpacing: 17, valign: 'top',
    });
    s.addText(txt, {
      x: x + 0.28, y: y + 1.16, w: cw - 0.56, h: 0.6, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: C.muted, lineSpacing: 12.5, valign: 'top',
    });
  });

  L.foot(s, 10, 'light');
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 11 — NE ÜZERİNDE ÇALIŞIYORUZ
// =================================================================
function focus(p, t) {
  const c = t.focus;
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };
  L.brand(s, 'light', A);

  const cy0 = L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(9), size: 28 });
  L.monoLabel(s, M, cy0, span(11), c.facts, C.sep, 7.5);

  const cw = 3.72, gx = 0.38, topY = cy0 + 0.5;
  c.items.forEach(([no, title, sub, desc], i) => {
    const x = M + i * (cw + gx);
    s.addShape('rect', { x, y: topY, w: cw, h: 2.16, fill: { color: C.soft } });
    L.monoLabel(s, x + 0.28, topY + 0.26, cw - 0.56, no, C.teal, 8.5);
    s.addText(title, {
      x: x + 0.28, y: topY + 0.56, w: cw - 0.56, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14.5, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
    });
    L.monoLabel(s, x + 0.28, topY + 0.9, cw - 0.56, sub, C.sep, 7.5);
    s.addText(desc, {
      x: x + 0.28, y: topY + 1.2, w: cw - 0.56, h: 0.8, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: C.muted, lineSpacing: 12.5, valign: 'top',
    });
  });

  const bandY = 5.24;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: H - bandY, fill: { color: C.navy } });
  L.monoLabel(s, M, bandY + 0.34, span(6), c.declineLabel, C.amberDark, 7.5);
  const dw = CW / 2 - 0.3;
  c.decline.forEach((txt, i) => {
    const x = M + (i % 2) * (dw + 0.6);
    const y = bandY + 0.74 + Math.floor(i / 2) * 0.46;
    s.addShape('ellipse', { x: x + 0.02, y: y + 0.105, w: 0.075, h: 0.075,
      fill: { color: C.amberDark }, line: { color: C.amberDark, width: 0.25 } });
    s.addText(txt, {
      x: x + 0.28, y, w: dw - 0.28, h: 0.4, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: C.onDark, lineSpacing: 12.5, valign: 'top',
    });
  });
  L.pageNo(s, 11, C.navy, H - 0.34);

  s.addNotes(c.notes);
  return s;
}

// =================================================================
// KAPANIŞ — kurumsal iletişim sayfası
// =================================================================
function closing(p, t) {
  const c = t.closing;
  const s = p.addSlide();
  s.background = { color: C.navy };

  L.coverArt(s, 8.75, 1.0, 3.75, 3.25);
  s.addImage({ path: A + 'logo-dark.png', x: M, y: 0.85, w: 2.25, h: 2.25 / 2.905 });

  L.eyebrow(s, M, 2.28, c.eyebrow, 'dark');
  s.addText(c.title, {
    x: M, y: 2.62, w: span(7), h: 0.66, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: c.size, bold: true, color: 'FFFFFF',
    charSpacing: -0.8, valign: 'middle',
  });
  L.monoLabel(s, M, 3.36, span(8), c.lead, C.amberDark, 8.5);
  s.addText(c.invite, {
    x: M, y: 3.74, w: 6.4, h: 0.6, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: 11, color: C.onDark, lineSpacing: 16, valign: 'top',
  });

  const cy = 4.78, colw = 3.5, colGap = 0.35;
  c.contact.forEach(([k, v], i) => {
    const x = M + (i % 3) * (colw + colGap);
    const y = cy + Math.floor(i / 3) * 0.78;
    L.monoLabel(s, x, y, colw, k, C.amberDark, 7);
    s.addText(v, {
      x, y: y + 0.19, w: colw, h: 0.46, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: 'FFFFFF', lineSpacing: 12, valign: 'top',
    });
  });

  // Adres — sayfanın kurumsal künye satırı.
  s.addShape('rect', { x: 0, y: 6.72, w: W, h: H - 6.72, fill: { color: L.mix(C.navy, '000000', 0.22) } });
  L.monoLabel(s, M, 6.96, span(11), c.address, L.mix(C.navy, 'FFFFFF', 0.7), 7.5);

  s.addNotes(c.notes);
  return s;
}

module.exports = { method, references, approach, focus, closing };
