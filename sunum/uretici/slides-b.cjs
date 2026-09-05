const L = require('./lib.cjs');
const { C, F, W, H, M, CW, span } = L;
const A = './assets/';

// =================================================================
// 05 — SAP FİNANS ÇEKİRDEĞİ
// =================================================================
function sapCore(p, t) {
  const c = t.sap;
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  L.header(s, { eyebrow: c.eyebrow, title: c.title, w: span(9), size: 25 });

  const topY = 2.30, bh = 0.70, gap = 0.155;
  const colW = span(3), coreX = L.colX(3.6) - 0.1, coreW = span(4.8);
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

  // Adlandırılmış çözüm alanları — katalog slaytı yerine tek satır.
  L.monoLabel(s, M, 6.02, span(4), c.areasLabel, C.sep, 7.5);
  s.addText(c.areas, {
    x: M, y: 6.26, w: span(11), h: 0.3, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 12, color: C.teal, charSpacing: -0.2, valign: 'middle',
  });

  L.foot(s, 5, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 06 — BULUT MODELİ KARARI
// =================================================================
function cloudDecision(p, t) {
  const c = t.cloud;
  const s = p.addSlide();
  s.background = { color: C.paper };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(10), leadW: span(10), size: 24,
  });

  s.addImage({ path: A + 'fig-cloud' + t.figSuffix + '.jpg', x: 7.15, y: cy0 - 0.05, w: 5.35, h: 3.57 });

  let y = cy0;
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

  // Tarafsızlık — asıl fark; sitedeki ifadeyle aynı biçimde.
  const bandY = 6.42;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: H - bandY, fill: { color: C.teal } });
  s.addText([
    { text: c.bandLead, options: { fontFace: F.display, fontSize: 12, bold: true, color: 'FFFFFF' } },
    { text: c.bandBody, options: { fontFace: F.body, fontSize: 10, color: C.onDark } },
  ], { x: M, y: bandY, w: span(10), h: H - bandY - 0.2, isTextBox: true, margin: 0, valign: 'middle', lineSpacing: 14 });
  L.pageNo(s, 6, C.teal, H - 0.42);

  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 07 — DEĞERİ NASIL ÜRETİYORUZ
// =================================================================
function value(p, t) {
  const c = t.value;
  const s = p.addSlide();
  s.background = { color: C.navy };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(8), leadW: span(9), size: 26, tone: 'dark',
  });

  // Sıra, çizgiyle değil numarayla kuruluyor.
  const cy = cy0 + 0.42, cw = 2.72, gapx = 0.24;
  c.stages.forEach(([k, d], i) => {
    const x = M + i * (cw + gapx);
    s.addText(String(i + 1).padStart(2, '0'), {
      x, y: cy, w: cw, h: 0.5, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 22, color: i === 3 ? C.amber : C.amberDark,
      charSpacing: -0.4, valign: 'middle',
    });
    s.addText(k, {
      x, y: cy + 0.54, w: cw, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14, bold: true, color: 'FFFFFF',
      charSpacing: -0.3, valign: 'middle',
    });
    L.body(s, x, cy + 0.94, cw - 0.1, 1.3, d, 'dark', 10);
  });

  c.also.forEach(([title, d], i) => {
    const x = M + i * (CW / 2 + 0.14);
    const w = CW / 2 - 0.28;
    s.addText(title, {
      x, y: cy + 2.46, w, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 12, bold: true, color: 'FFFFFF', charSpacing: -0.25, valign: 'middle',
    });
    L.body(s, x, cy + 2.77, w, 0.6, d, 'dark', 9.5);
  });

  L.foot(s, 8, 'dark', t.foot);
  s.addNotes(c.notes);
  return s;
}

// =================================================================
// 08 — ÇALIŞMA YAKLAŞIMI
// =================================================================
function methodology(p, t) {
  const c = t.method;
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: 4.35, leadW: 4.35, size: 23,
  });

  // Adım adları ve çıktılar görselin içinde; liste yalnızca süre ekler.
  s.addImage({ path: A + 'fig-process' + t.figSuffix + '.jpg', x: 5.45, y: 1.22, w: 7.3, h: 4.87 });

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

  L.foot(s, 9, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

module.exports = { sapCore, cloudDecision, value, methodology };
