const L = require('./lib.cjs');
const { C, F, W, H, M, CW, span } = L;
const { page } = require('./slides-a.cjs');
const A = './assets/';

// =================================================================
// 04 — SAP PRIVATE CLOUD
// =================================================================
function privateCloud(p, t) {
  const c = t.privateCloud;
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

  L.schema(s, 7.2, cy0, 5.28, c.schemaLabel, c.schema, null, [1]);

  L.foot(s, 4, 'light');
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 05 — PUBLIC / PRIVATE KARŞILAŞTIRMASI  (gerçek tablo)
// =================================================================
function compare(p, t) {
  const c = t.compare;
  const s = p.addSlide();
  s.background = { color: C.paper };
  L.brand(s, 'light', A);

  const cy0 = L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(9), size: 28 });

  L.table(s, M, cy0, CW, c.headers, c.rows, [2.4, 4.4, 4.4], { rowH: 0.58 });

  const bandY = 6.42;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: H - bandY, fill: { color: C.teal } });
  s.addText([
    { text: c.bandLead, options: { fontFace: F.display, fontSize: 12, bold: true, color: 'FFFFFF' } },
    { text: c.bandBody, options: { fontFace: F.body, fontSize: 10, color: C.onDark } },
  ], { x: M, y: bandY, w: span(10), h: H - bandY - 0.2, isTextBox: true, margin: 0, valign: 'middle', lineSpacing: 14 });
  L.pageNo(s, 5, C.teal, H - 0.42);

  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 06 — YAPAY ZEKA VE FİNANS
// =================================================================
function ai(p, t) {
  const c = t.ai;
  const { s, cy0 } = page(p, c);

  const bw = 5.6, bh = 1.2, gx = 6.03;
  c.blocks.forEach(([name, desc], i) => {
    const x = M + (i % 2) * gx, y = cy0 + Math.floor(i / 2) * 1.38;
    s.addShape('rect', { x, y, w: bw, h: bh, fill: { color: C.soft } });
    s.addText(name, {
      x: x + 0.28, y: y + 0.16, w: bw - 0.56, h: 0.28, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 13, bold: true, color: C.teal, charSpacing: -0.25, valign: 'middle',
    });
    s.addText(desc, {
      x: x + 0.28, y: y + 0.48, w: bw - 0.56, h: 0.6, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: C.muted, lineSpacing: 12.5, valign: 'top',
    });
  });

  const fy = cy0 + 2.94;
  L.monoLabel(s, M, fy, span(4), c.flowLabel, C.sep, 7.5);
  L.flowRow(s, M, fy + 0.26, CW, c.flow);

  s.addShape('rect', { x: M, y: fy + 1.36, w: 0.13, h: 0.13,
    fill: { color: C.amber }, line: { color: C.amber, width: 0.25 } });
  s.addText(c.rule, {
    x: M + 0.3, y: fy + 1.3, w: span(9), h: 0.3, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: 9.5, color: C.muted, valign: 'middle',
  });

  L.foot(s, 6, 'light');
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 07 — TESLİM EDİLENLER
// =================================================================
function deliverables(p, t) {
  const c = t.deliverables;
  const s = p.addSlide();
  s.background = { color: C.paper };
  L.brand(s, 'light', A);

  const cy0 = L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(9), size: 28 });

  const panelH = 4.18;
  const panel = (x, w, label, items) => {
    s.addShape('rect', { x, y: cy0, w, h: panelH, fill: { color: 'FFFFFF' } });
    L.monoLabel(s, x + 0.3, cy0 + 0.32, w - 0.6, label, C.teal, 7.5);
    let y = cy0 + 0.74;
    items.forEach((txt) => {
      s.addShape('ellipse', { x: x + 0.32, y: y + 0.115, w: 0.075, h: 0.075,
        fill: { color: C.teal }, line: { color: C.teal, width: 0.25 } });
      s.addText(txt, {
        x: x + 0.58, y, w: w - 0.88, h: 0.34, isTextBox: true, margin: 0,
        fontFace: F.body, fontSize: 9.5, color: C.ink, lineSpacing: 12.5, valign: 'top',
      });
      y += 0.44;
    });
  };
  panel(M, 5.6, c.leftLabel, c.left);
  panel(M + 5.98, CW - 5.98, c.rightLabel, c.right);

  L.foot(s, 7, 'light');
  s.addNotes(c.notes);
  return s;
}

module.exports = { privateCloud, compare, ai, deliverables };
