const L = require('./lib.cjs');
const { C, F, W, H, M, CW, span } = L;
const A = './assets/';

// =================================================================
// 07 — TEKNOLOJİ VE İŞ
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

  L.foot(s, 7, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 10 — ELİNİZDE NE KALIYOR
// =================================================================
function deliverables(p, t) {
  const c = t.deliverables;
  const s = p.addSlide();
  s.background = { color: C.paper };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(10), leadW: span(10), size: 25,
  });

  const panelH = 3.34;
  const panel = (x, w, label, items) => {
    s.addShape('rect', { x, y: cy0, w, h: panelH, fill: { color: 'FFFFFF' } });
    L.monoLabel(s, x + 0.3, cy0 + 0.3, w - 0.6, label, C.teal, 7.5);
    let y = cy0 + 0.64;
    items.forEach((txt) => {
      s.addShape('ellipse', { x: x + 0.32, y: y + 0.115, w: 0.075, h: 0.075,
        fill: { color: C.teal }, line: { color: C.teal, width: 0.25 } });
      s.addText(txt, {
        x: x + 0.58, y, w: w - 0.88, h: 0.32, isTextBox: true, margin: 0,
        fontFace: F.body, fontSize: 9.5, color: C.ink, lineSpacing: 12.5, valign: 'top',
      });
      y += 0.35;
    });
  };
  panel(M, 5.6, c.leftLabel, c.left);
  panel(M + 5.98, CW - 5.98, c.rightLabel, c.right);

  L.body(s, M, cy0 + panelH + 0.28, span(10), 0.5, c.footnote, 'light', 9.5);

  L.foot(s, 10, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 11 — ÇALIŞMA MODELLERİ VE ÜSTLENMEDİĞİMİZ İŞLER
// =================================================================
function engagement(p, t) {
  const c = t.engagement;
  const s = p.addSlide();
  s.background = { color: C.paper };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(10), leadW: span(9), size: 26,
  });

  const cw = 3.72, gapx = 0.38, panelH = 2.9;
  c.models.forEach(([name, dur, when, shape], i) => {
    const x = M + i * (cw + gapx);
    s.addShape('rect', { x: x - 0.22, y: cy0, w: cw + 0.44, h: panelH, fill: { color: 'FFFFFF' } });
    s.addText(name, {
      x, y: cy0 + 0.26, w: cw - 1.2, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 15, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
    });
    s.addText(dur, {
      x: x + cw - 1.35, y: cy0 + 0.26, w: 1.35, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 8, color: C.muted, charSpacing: 0.5,
      align: 'right', valign: 'middle',
    });
    L.body(s, x, cy0 + 0.68, cw, 0.95, when, 'light', 9.5);
    L.body(s, x, cy0 + 1.62, cw, 0.95, shape, 'light', 9.5);
  });

  // Üstlenmediğimiz işler — koyu bant, sayfa kenarına dayanır.
  const bandY = 5.5;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: H - bandY, fill: { color: C.teal } });
  L.monoLabel(s, M, bandY + 0.28, span(6), c.declineLabel, C.amberDark, 7.5);
  s.addText(c.declineLead, {
    x: M, y: bandY + 0.5, w: span(10), h: 0.28, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 12, bold: true, color: 'FFFFFF', charSpacing: -0.25, valign: 'middle',
  });
  const dw = CW / 2 - 0.3;
  c.decline.forEach((txt, i) => {
    const x = M + (i % 2) * (dw + 0.6);
    const y = bandY + 0.92 + Math.floor(i / 2) * 0.46;
    s.addShape('ellipse', { x: x + 0.02, y: y + 0.105, w: 0.075, h: 0.075,
      fill: { color: C.amberDark }, line: { color: C.amberDark, width: 0.25 } });
    s.addText(txt, {
      x: x + 0.28, y, w: dw - 0.28, h: 0.4, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: C.onDark, lineSpacing: 12.5, valign: 'top',
    });
  });
  L.pageNo(s, 11, C.teal, H - 0.34);

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

module.exports = { techBusiness, deliverables, engagement, closing };
