const L = require('./lib.cjs');
const { C, F, RULE, W, H, M, CW, colX, span } = L;
const A = './assets/';

// =================================================================
// 05 — ÇÖZÜMLER (karşılaştırma tablosu)
// =================================================================
function solutions(p) {
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  const cy0 = L.header(s, {
    eyebrow: 'SOLUTIONS',
    title: 'Five service areas, one finance perspective',
    lead: 'The same organisation often sits in more than one category. This table exists to show which piece of work makes more sense to start with.',
    w: span(10), leadW: span(9), size: 25,
  });

  const cx = [M, M + 3.35, M + 6.55, M + 8.95];
  const cw = [3.1, 3.05, 2.25, 2.68];
  // Başlık satırını ayıran şey çizgi değil, altındaki ince yüzey.
  s.addShape('rect', { x: M - 0.18, y: cy0 - 0.09, w: CW + 0.36, h: 0.4, fill: { color: C.paper } });
  ['SOLUTION', 'WHO IT SUITS', 'TYPICAL DURATION', 'PRIMARY BENEFIT']
    .forEach((h, i) => L.monoLabel(s, cx[i], cy0, cw[i], h, C.teal, 7.5));

  const rows = [
    ['SAP Finance Modules', 'FI, CO and end-to-end financial process design',
     'Organisations with a drifted SAP setup, or implementing fresh',
     'Diagnosis 3–4 weeks\nRedesign 4–7 months', 'Consistent reporting and a predictable close'],
    ['S/4HANA Transformation', 'Brownfield, greenfield or selective transition',
     'Organisations on ECC that need a conversion plan',
     'Assessment 4–6 weeks\nConversion 6–14 months', 'A defensible approach decision and a predictable cutover'],
    ['SAP Public Cloud', 'Cloud ERP Public Edition architecture and delivery',
     'Companies able to adopt standard, wanting fast deployment',
     'Assessment 2–3 weeks\nDeployment 3–5 months', 'Rapid go-live and low operational overhead'],
    ['SAP Private Cloud', 'RISE with SAP and Cloud ERP Private Edition',
     'Larger organisations that must retain process flexibility',
     'Preparation 5–8 weeks\nMigration 7–14 months', 'Cloud operations without giving up flexibility'],
    ['AI in Finance', 'SAP’s embedded AI capabilities and process automation',
     'Teams spending heavy manual hours on repetitive finance work',
     'Assessment 2–3 weeks\nFirst phase 6–12 weeks', 'Recovered hours and errors caught earlier'],
  ];

  let y = cy0 + 0.56;
  rows.forEach(([name, sub, who, dur, gain]) => {
    s.addText(name, {
      x: cx[0], y, w: cw[0], h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 12.5, bold: true, color: C.teal, charSpacing: -0.25, valign: 'middle',
    });
    s.addText(sub, {
      x: cx[0], y: y + 0.28, w: cw[0], h: 0.4, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 8.5, color: C.sep, lineSpacing: 11, valign: 'top',
    });
    L.body(s, cx[1], y + 0.03, cw[1], 0.6, who, 'light', 9.5);
    s.addText(dur, {
      x: cx[2], y: y + 0.03, w: cw[2], h: 0.55, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 8, color: C.muted, lineSpacing: 12.5, valign: 'top',
    });
    L.body(s, cx[3], y + 0.03, cw[3], 0.6, gain, 'light', 9.5);
    y += 0.82;
  });

  L.foot(s, 5);
  s.addNotes('Beş çözüm sayfası, sitenin kendi ölçütleriyle karşılaştırıldı: kime uygun, tipik süre ve ana kazanım. Süreler her sayfanın comparison satırından alındı.');
  return s;
}

// =================================================================
// 06 — BULUT MODELİ KARARI
// =================================================================
function cloudDecision(p) {
  const s = p.addSlide();
  s.background = { color: C.paper };

  const cy0 = L.header(s, {
    eyebrow: 'CLOUD ARCHITECTURE',
    title: 'Public or Private Cloud — the most expensive decision to reverse',
    lead: 'Not the advanced and the cheap version of one another, but different trades.',
    w: span(10), leadW: span(10), size: 24,
  });

  // Sitenin bulut modelleri şeması.
  s.addImage({ path: A + 'fig-cloud.jpg', x: 7.15, y: cy0 - 0.05, w: 5.35, h: 3.57 });

  const rows = [
    ['Cost model',
     'Subscription by user and scope; upgrades included.',
     'Varies with sizing; upgrade testing stays with you.'],
    ['Extensibility',
     'Core cannot be modified; extension in a separate layer.',
     'Core modification allowed; existing ABAP carried across.'],
    ['Upgrade cadence',
     'Regular, automatic and not deferrable.',
     'You control the timing; each upgrade its own project.'],
    ['Implementation time',
     '3–5 months for a single-country finance deployment.',
     'Typically 7–14 months, by scope and inherited landscape.'],
    ['Typical fit',
     'Mid-market organisations close to standard.',
     'Larger organisations with customisation history.'],
  ];

  let y = cy0;
  rows.forEach(([k, pub, priv]) => {
    s.addText(k, {
      x: M, y, w: 6.0, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 11.5, bold: true, color: C.ink, charSpacing: -0.2, valign: 'middle',
    });
    [['PUBLIC', pub], ['PRIVATE', priv]].forEach(([tag, t], j) => {
      const ty = y + 0.26 + j * 0.23;
      L.monoLabel(s, M, ty, 0.75, tag, C.teal, 7);
      s.addText(t, {
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
    { text: 'We do not advocate for a model.  ', options: { fontFace: F.display, fontSize: 12, bold: true, color: 'FFFFFF' } },
    { text: 'We compare your processes against standard scope and put the cost and the constraint of both models side by side for your situation. The decision stays yours.', options: { fontFace: F.body, fontSize: 10, color: C.onDark } },
  ], { x: M, y: bandY, w: span(10), h: H - bandY - 0.2, isTextBox: true, margin: 0, valign: 'middle', lineSpacing: 14 });
  s.addText('06', {
    x: W - M - 1, y: H - 0.42, w: 1, h: 0.24, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 7.5, color: L.mix(C.teal, 'FFFFFF', 0.5),
    charSpacing: 0.6, align: 'right', valign: 'middle',
  });
  s.addNotes('Tarafsız karşılaştırma CPeak’in en net farkı. Ölçütler ve ifadeler Çözümler sayfasındaki karşılaştırma tablosundan kısaltıldı; görsel sitenin kendi bulut modelleri şeması.');
  return s;
}

// =================================================================
// 07 — DEĞERİ NASIL ÜRETİYORUZ
// =================================================================
function value(p) {
  const s = p.addSlide();
  s.background = { color: C.navy };

  const cy0 = L.header(s, {
    eyebrow: 'HOW WE CREATE VALUE',
    title: 'Measurement first, then a decision you can defend',
    lead: 'The outcome is decided by the weekly working discipline, not by the name of the methodology.',
    w: span(8), leadW: span(9), size: 26, tone: 'dark',
  });

  const stages = [
    ['MEASURE', 'No recommendation is made without reading the actual system data. Advice given without measurement is a guess, and its cost falls to you.'],
    ['COMPARE', 'Options placed side by side with cost, duration and risk — together with our own view and the reasoning behind it.'],
    ['DECIDE', 'The decision is yours and the reasoning stays on paper. That is what answers “why did we do it this way?” two years later.'],
    ['OWN', 'Test scenarios written together, the first close run together, documentation left in a form people actually use.'],
  ];

  // Sıra, çizgiyle değil numarayla kuruluyor: eksen, düğüm ve ok uçları
  // kaldırıldı; adımları ayıran tek şey aralık ve numaranın ağırlığı.
  const cy = cy0 + 0.42, cw = 2.72, gapx = 0.24;
  stages.forEach(([k, d], i) => {
    const x = M + i * (cw + gapx);
    const accent = i === 3 ? C.amber : C.amberDark;
    s.addText(String(i + 1).padStart(2, '0'), {
      x, y: cy, w: cw, h: 0.5, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 22, color: accent, charSpacing: -0.4, valign: 'middle',
    });
    s.addText(k, {
      x, y: cy + 0.54, w: cw, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14, bold: true, color: 'FFFFFF',
      charSpacing: -0.3, valign: 'middle',
    });
    L.body(s, x, cy + 0.94, cw - 0.1, 1.2, d, 'dark', 10);
  });

  const also = [
    ['Bad news travels immediately', 'When it becomes clear an estimate will not hold, you hear it that week rather than in the month-end report.'],
    ['Phase the work, don’t grow the team', 'Each phase ends in something that works, and the decision to continue gets taken again.'],
  ];
  also.forEach(([t, d], i) => {
    const x = M + i * (CW / 2 + 0.14);
    const w = CW / 2 - 0.28;
    s.addText(t, {
      x, y: cy + 2.46, w, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 12, bold: true, color: 'FFFFFF', charSpacing: -0.25, valign: 'middle',
    });
    L.body(s, x, cy + 2.77, w, 0.6, d, 'dark', 9.5);
  });

  L.foot(s, 7, 'dark');
  s.addNotes('Yaklaşım sayfasındaki çalışma ilkeleri, anlattıkları değer zinciri olarak dizildi: ölç, karşılaştır, karar ver, sahiplen. Alttaki iki ilke zinciri ayakta tutan teslim disiplinidir.');
  return s;
}

// =================================================================
// 08 — ÇALIŞMA YAKLAŞIMI
// =================================================================
function methodology(p) {
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  L.header(s, {
    eyebrow: 'OUR APPROACH',
    title: 'Four stages, each ending in something tangible',
    lead: 'What gets delivered at the end of each stage is defined before it starts, and no stage begins before the previous one has closed.',
    w: 4.35, leadW: 4.35, size: 23,
  });

  // Sitenin dört adımlı süreç görseli — adım adları ve çıktılar görselin
  // içinde; buradaki liste yalnızca süreleri ekler, tekrar etmez.
  s.addImage({ path: A + 'fig-process.jpg', x: 5.45, y: 1.22, w: 7.3, h: 4.87 });

  const steps = [
    ['01', 'Assessment', '2–6 weeks'],
    ['02', 'Architecture and roadmap', '3–6 weeks'],
    ['03', 'Delivery', '3–14 months'],
    ['04', 'Hypercare', '4–12 weeks'],
  ];
  L.monoLabel(s, M, 3.12, 4.35, 'TYPICAL DURATION', C.sep, 7.5);
  let y = 3.46;
  steps.forEach(([no, t, dur]) => {
    L.monoLabel(s, M, y + 0.02, 0.45, no, C.teal, 8.5);
    s.addText(t, {
      x: M + 0.55, y, w: 2.4, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 11.5, bold: true, color: C.teal, charSpacing: -0.2, valign: 'middle',
    });
    s.addText(dur, {
      x: M + 2.95, y, w: 1.4, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 8.5, color: C.muted, charSpacing: 0.5,
      align: 'right', valign: 'middle',
    });
    y += 0.55;
  });

  L.foot(s, 8);
  s.addNotes('Ana sayfadaki dört aşamalı teslim modeli. Aşama adları ve çıktılar sitenin kendi süreç görselinde yazılı; slayt bunlara yalnızca süreleri ekler.');
  return s;
}

module.exports = { solutions, cloudDecision, value, methodology };
