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

  L.header(s, { eyebrow: c.eyebrow, title: c.title, lead: c.lead, w: 4.35, leadW: 4.35, size: 28 });

  // Adım adları ve çıktılar görselin içinde; liste yalnızca süre ekler.
  s.addImage({ path: A + 'fig-process' + t.figSuffix + '.jpg', x: 5.45, y: 1.42, w: 7.3, h: 4.87 });

  L.monoLabel(s, M, 3.12, 4.35, c.durationLabel, C.sep, 7.5);
  let y = 3.46;
  c.steps.forEach(([no, title, dur]) => {
    L.monoLabel(s, M, y + 0.02, 0.45, no, C.teal, 8.5);
    s.addText(title, {
      x: M + 0.55, y, w: 2.5, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 11.5, bold: true, color: C.teal, charSpacing: -0.2, valign: 'middle',
    });
    s.addText(dur, {
      x: M + 3.05, y, w: 1.3, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 8.5, color: C.muted, charSpacing: 0.5,
      align: 'right', valign: 'middle',
    });
    y += 0.55;
  });

  L.foot(s, 8, 'light');
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

  const cy0 = L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(8), size: 28 });

  // Altı ilke, üç sütun × iki satır.
  const cw = 3.72, gapx = 0.38;
  c.principles.forEach(([head, txt], i) => {
    const x = M + (i % 3) * (cw + gapx);
    const y = cy0 + Math.floor(i / 3) * 1.18;
    s.addText(head, {
      x, y, w: cw, h: 0.28, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 13, bold: true, color: C.teal, charSpacing: -0.25, valign: 'middle',
    });
    s.addText(txt, {
      x, y: y + 0.3, w: cw, h: 0.5, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: C.muted, lineSpacing: 12.5, valign: 'top',
    });
  });

  // Çalışma modelleri — koyu bant, sayfa kenarına dayanır.
  const bandY = 5.24;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: H - bandY, fill: { color: C.teal } });
  L.monoLabel(s, M, bandY + 0.34, span(6), c.modelsLabel, C.amberDark, 7.5);
  c.models.forEach(([name, dur, txt], i) => {
    const x = M + i * (cw + gapx);
    const y = bandY + 0.82;
    s.addText(name, {
      x, y, w: cw - 1.3, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14, bold: true, color: 'FFFFFF', charSpacing: -0.3, valign: 'middle',
    });
    s.addText(dur, {
      x: x + cw - 1.35, y, w: 1.35, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 8, color: C.amberDark, charSpacing: 0.5,
      align: 'right', valign: 'middle',
    });
    s.addText(txt, {
      x, y: y + 0.36, w: cw, h: 0.6, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: C.onDark, lineSpacing: 12.5, valign: 'top',
    });
  });
  L.pageNo(s, 10, C.teal, H - 0.36);

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

  const cy0 = L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(8), size: 28 });

  L.monoLabel(s, M, cy0, span(11), c.facts, C.sep, 7.5);

  const cw = 3.72, gapx = 0.38, topY = cy0 + 0.5;
  c.items.forEach(([no, title, sub, desc], i) => {
    const x = M + i * (cw + gapx);
    s.addShape('rect', { x: x - 0.22, y: topY, w: cw + 0.44, h: 2.02, fill: { color: C.paper } });
    L.monoLabel(s, x, topY + 0.26, cw, no, C.teal, 8.5);
    s.addText(title, {
      x, y: topY + 0.56, w: cw, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14.5, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
    });
    L.monoLabel(s, x, topY + 0.9, cw, sub, C.sep, 7.5);
    s.addText(desc, {
      x, y: topY + 1.2, w: cw, h: 0.8, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: C.muted, lineSpacing: 12.5, valign: 'top',
    });
  });

  // Üstlenmediğimiz işler — odağın karşılığı.
  const bandY = 5.06;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: H - bandY, fill: { color: C.navy } });
  L.monoLabel(s, M, bandY + 0.34, span(6), c.declineLabel, C.amberDark, 7.5);
  const dw = CW / 2 - 0.3;
  c.decline.forEach((txt, i) => {
    const x = M + (i % 2) * (dw + 0.6);
    const y = bandY + 0.72 + Math.floor(i / 2) * 0.46;
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
// KAPANIŞ
// =================================================================
function closing(p, t) {
  const c = t.closing;
  const s = p.addSlide();
  s.background = { color: C.navy };

  s.addImage({ path: A + 'quantum.jpg', x: 9.05, y: 1.15, w: 3.6, h: 3.6 / 0.849 });
  s.addImage({ path: A + 'logo-dark.png', x: M, y: 0.78, w: 1.9, h: 1.9 / 2.905 });

  L.eyebrow(s, M, 2.36, c.eyebrow, 'dark');
  s.addText(c.title, {
    x: M, y: 2.72, w: span(7), h: 1.0, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: c.size, bold: true, color: 'FFFFFF',
    charSpacing: -0.8, lineSpacing: c.size * 1.29, valign: 'top',
  });
  L.body(s, M, 3.62, 5.6, 0.6, c.lead, 'dark', 10);

  const cy = 5.16, colw = 3.5, colGap = 0.35;
  c.contact.forEach(([k, v], i) => {
    const x = M + (i % 3) * (colw + colGap);
    const y = cy + Math.floor(i / 3) * 0.72;
    L.monoLabel(s, x, y, colw, k, C.amberDark, 7);
    s.addText(v, {
      x, y: y + 0.19, w: colw, h: 0.42, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: 'FFFFFF', lineSpacing: 12, valign: 'top',
    });
  });

  s.addNotes(c.notes);
  return s;
}

module.exports = { method, references, approach, focus, closing };
