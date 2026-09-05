const L = require('./lib.cjs');
const { C, F, W, H, M, CW, span } = L;
const A = './assets/';

// =================================================================
// 05 — ÇÖZÜMLER (karşılaştırma tablosu)
// =================================================================
function solutions(p, t) {
  const c = t.solutions;
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  const cy0 = L.header(s, {
    eyebrow: c.eyebrow, title: c.title, lead: c.lead,
    w: span(10), leadW: span(9), size: 25,
  });

  const cx = [M, M + 3.35, M + 6.55, M + 8.95];
  const cw = [3.1, 3.05, 2.25, 2.68];

  // Başlık satırını ayıran şey çizgi değil, altındaki ince yüzey.
  s.addShape('rect', { x: M - 0.18, y: cy0 - 0.09, w: CW + 0.36, h: 0.4, fill: { color: C.paper } });
  c.heads.forEach((h, i) => L.monoLabel(s, cx[i], cy0, cw[i], h, C.teal, 7.5));

  let y = cy0 + 0.56;
  c.rows.forEach(([name, sub, who, dur, gain]) => {
    s.addText(name, {
      x: cx[0], y, w: cw[0], h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 12.5, bold: true, color: C.teal, charSpacing: -0.25, valign: 'middle',
    });
    s.addText(sub, {
      x: cx[0], y: y + 0.28, w: cw[0], h: 0.4, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 8.5, color: C.sep, lineSpacing: 11, valign: 'top',
    });
    L.body(s, cx[1], y + 0.03, cw[1], 0.66, who, 'light', 9.5);
    s.addText(dur, {
      x: cx[2], y: y + 0.03, w: cw[2], h: 0.55, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 8, color: C.muted, lineSpacing: 12.5, valign: 'top',
    });
    L.body(s, cx[3], y + 0.03, cw[3], 0.66, gain, 'light', 9.5);
    y += 0.82;
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

  L.foot(s, 7, 'dark', t.foot);
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

  L.foot(s, 8, 'light', t.foot);
  s.addNotes(c.notes);
  return s;
}

module.exports = { solutions, cloudDecision, value, methodology };
