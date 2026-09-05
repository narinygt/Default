const L = require('./lib.cjs');
const { C, F, W, H, M, CW, span } = L;
const { solutionPage } = require('./slides-a.cjs');
const A = './assets/';

// =================================================================
// 04 — SAP PRIVATE CLOUD  (sorumluluk şeması)
// =================================================================
function privateCloud(p, t) {
  const c = t.privateCloud;
  return solutionPage(p, t, c, 4, (s, cy0) => {
    L.schema(s, 6.65, cy0, 5.83, c.schemaLabel, c.schema, c.schemaNote, [1]);
  });
}

// =================================================================
// 05 — PUBLIC / PRIVATE KARŞILAŞTIRMASI
// =================================================================
function compare(p, t) {
  const c = t.compare;
  const s = p.addSlide();
  s.background = { color: C.paper };
  L.brand(s, 'light', A);

  const cy0 = L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(8), size: 28 });

  s.addImage({ path: A + 'fig-cloud' + t.figSuffix + '.jpg', x: 7.15, y: cy0 + 0.1, w: 5.35, h: 3.57 });

  let y = cy0 + 0.15;
  c.rows.forEach(([k, pub, priv]) => {
    s.addText(k, {
      x: M, y, w: 6.0, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 11.5, bold: true, color: C.ink, charSpacing: -0.2, valign: 'middle',
    });
    [[c.tags[0], pub], [c.tags[1], priv]].forEach(([tag, txt], j) => {
      const ty = y + 0.26 + j * 0.23;
      L.monoLabel(s, M, ty, 0.75, tag, C.teal, 7);
      s.addText(txt, {
        x: M + 0.78, y: ty, w: 5.22, h: 0.2, isTextBox: true, margin: 0,
        fontFace: F.body, fontSize: 9.5, color: C.muted, valign: 'middle',
      });
    });
    y += 0.76;
  });

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
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };
  L.brand(s, 'light', A);

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(8), leadW: span(8), size: 28,
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

  s.addShape('rect', { x: cx, y: y + 0.06, w: 0.13, h: 0.13,
    fill: { color: C.amber }, line: { color: C.amber, width: 0.25 } });
  s.addText([
    { text: c.stanceLead, options: { fontFace: F.display, fontSize: 10.5, bold: true, color: C.ink } },
    { text: c.stanceBody, options: { fontFace: F.body, fontSize: 9.5, color: C.muted } },
  ], { x: cx + 0.28, y, w: cwd - 0.28, h: 0.6, isTextBox: true, margin: 0, lineSpacing: 13, valign: 'top' });

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

  const cy0 = L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(8), size: 28 });

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
