const L = require('./lib.cjs');
const { C, F, RULE, W, H, M, CW, colX, span } = L;

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
  const heads = ['SOLUTION', 'WHO IT SUITS', 'TYPICAL DURATION', 'PRIMARY BENEFIT'];

  let y = cy0;
  heads.forEach((h, i) => L.monoLabel(s, cx[i], y, cw[i], h, C.teal, 7.5));
  y += 0.24;
  L.rule(s, M, y, CW, C.teal, 1);

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

  y += 0.1;
  rows.forEach(([name, sub, who, dur, gain], i) => {
    if (i) L.rule(s, M, y - 0.11, CW, RULE.onPaperSoft);
    s.addText(name, {
      x: cx[0], y: y + 0.02, w: cw[0], h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 12.5, bold: true, color: C.teal, charSpacing: -0.25, valign: 'middle',
    });
    s.addText(sub, {
      x: cx[0], y: y + 0.3, w: cw[0], h: 0.4, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 8.5, color: C.sep, lineSpacing: 11, valign: 'top',
    });
    L.body(s, cx[1], y + 0.05, cw[1], 0.6, who, 'light', 9.5);
    s.addText(dur, {
      x: cx[2], y: y + 0.05, w: cw[2], h: 0.55, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 8, color: C.muted, lineSpacing: 12.5, valign: 'top',
    });
    L.body(s, cx[3], y + 0.05, cw[3], 0.6, gain, 'light', 9.5);
    y += 0.81;
  });

  L.rule(s, M, y - 0.11, CW, C.line);
  L.foot(s, 5);
  s.addNotes('The five solution pages, compared on the site’s own criteria — fit, duration and primary benefit — with the durations taken from each page’s comparison row.');
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

  const lx = M, lw = 2.55;              // ölçüt sütunu
  const ax = M + 2.95, aw = 3.92;       // public
  const bx = M + 7.4, bw = 4.48;        // private

  s.addText('Public Cloud', {
    x: ax, y: cy0, w: aw, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 15, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
  });
  s.addText('Private Cloud', {
    x: bx, y: cy0, w: bw, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 15, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
  });
  L.monoLabel(s, ax, cy0 + 0.32, aw, 'CLOUD ERP PUBLIC EDITION', C.sep, 7);
  L.monoLabel(s, bx, cy0 + 0.32, bw, 'CLOUD ERP PRIVATE EDITION', C.sep, 7);

  let y = cy0 + 0.68;
  L.rule(s, M, y, CW, C.teal, 1);
  y += 0.14;

  const rows = [
    ['Cost model', 'Subscription by user and scope. Infrastructure, operations and upgrades included.',
     'Subscription varying with sizing. Customisation maintenance and upgrade testing stay in your budget.'],
    ['Extensibility', 'The core cannot be modified. Extension only through supported mechanisms, in a separate layer.',
     'Broad flexibility including core modification. Existing ABAP developments can be carried across.'],
    ['Upgrade cadence', 'Regular and automatic. Upgrades are not optional and cannot be deferred.',
     'You largely control the timing. Each release upgrade is planned as its own project.'],
    ['Implementation time', 'Short — a single-country finance deployment typically takes 3–5 months.',
     'Longer — typically 7–14 months, depending on scope and inherited landscape.'],
    ['Typical fit', 'Mid-market organisations close to standard, and subsidiaries on a group template.',
     'Larger organisations carrying substantial customisation and integration history.'],
  ];

  rows.forEach(([k, a, b], i) => {
    if (i) L.rule(s, M, y - 0.1, CW, RULE.onPaperSoft);
    s.addText(k, {
      x: lx, y: y + 0.02, w: lw, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 11, bold: true, color: C.ink, charSpacing: -0.2, valign: 'top',
    });
    L.body(s, ax, y + 0.02, aw, 0.55, a, 'light', 9.5);
    L.body(s, bx, y + 0.02, bw, 0.55, b, 'light', 9.5);
    y += 0.60;
  });
  L.rule(s, M, y - 0.1, CW, C.line);
  L.vrule(s, M + 7.05, cy0 - 0.03, y - cy0 - 0.07, C.line);

  // Tarafsızlık — asıl fark; sitedeki ifadeyle aynı biçimde verildi.
  const bandY = 6.45;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: H - bandY, fill: { color: C.teal } });
  s.addText([
    { text: 'We do not advocate for a model.  ', options: { fontFace: F.display, fontSize: 12, bold: true, color: 'FFFFFF' } },
    { text: 'We compare your processes against standard scope and put the cost and the constraint of both models side by side for your situation. The decision stays yours.', options: { fontFace: F.body, fontSize: 10, color: C.onDark } },
  ], { x: M, y: bandY, w: span(10), h: H - bandY - 0.2, isTextBox: true, margin: 0, valign: 'middle', lineSpacing: 14 });

  s.addText('06', {
    x: W - M - 1, y: H - 0.58, w: 1, h: 0.24, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 7.5, color: L.mix(C.teal, 'FFFFFF', 0.5),
    charSpacing: 0.6, align: 'right', valign: 'middle',
  });
  s.addNotes('The vendor-neutral comparison is CPeak’s clearest differentiator. Criteria and wording condensed from the Solutions overview comparison table.');
  return s;
}

// =================================================================
// 07 — DEĞERİ NASIL ÜRETİYORUZ
// =================================================================
function value(p) {
  const s = p.addSlide();
  s.background = { color: C.navy };

  // Yalnızca defter çizgileri, sayfaya zemin olarak serildi — sitedeki
  // 'texture' varyantı. Hiçbiri metinle yarışacak kadar yakın değil.
  for (let i = 0; i < 16; i++) L.rule(s, 0, 0.28 + i * 0.44, W, L.mix(C.navy, 'FFFFFF', 0.062));
  L.vrule(s, 0.45, 0, H, L.mix(C.navy, 'FFFFFF', 0.09));

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

  const cy = cy0 + 0.5, cw = 2.72, gapx = 0.24;
  L.rule(s, M, cy, CW, RULE.onNavy);
  stages.forEach(([k, d], i) => {
    const x = M + i * (cw + gapx);
    s.addShape('ellipse', { x: x - 0.055, y: cy - 0.055, w: 0.11, h: 0.11,
      fill: { color: i === 3 ? C.amber : 'FFFFFF' }, line: { color: i === 3 ? C.amber : 'FFFFFF', width: 0.25 } });
    L.monoLabel(s, x, cy - 0.36, cw, String(i + 1).padStart(2, '0') + '  ' + k, i === 3 ? C.amber : C.amberDark, 8.5);
    L.body(s, x, cy + 0.24, cw - 0.1, 1.2, d, 'dark', 10);
    if (i < 3) {
      // zincir: adımlar arasında çizginin üstünde duran ok ucu
      const mx = x + cw + gapx / 2;
      L.seg(s, mx - 0.075, cy - 0.075, mx + 0.02, cy, L.mix(C.navy, 'FFFFFF', 0.55), 0.9);
      L.seg(s, mx - 0.075, cy + 0.075, mx + 0.02, cy, L.mix(C.navy, 'FFFFFF', 0.55), 0.9);
    }
  });

  L.rule(s, M, cy + 1.86, CW, RULE.onNavySoft);
  const also = [
    ['Bad news travels immediately', 'When it becomes clear an estimate will not hold, you hear it that week rather than in the month-end report.'],
    ['Phase the work, don’t grow the team', 'Each phase ends in something that works, and the decision to continue gets taken again.'],
  ];
  also.forEach(([t, d], i) => {
    const x = M + i * (CW / 2 + 0.14);
    const w = CW / 2 - 0.28;
    s.addText(t, {
      x, y: cy + 2.06, w, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 12, bold: true, color: 'FFFFFF', charSpacing: -0.25, valign: 'middle',
    });
    L.body(s, x, cy + 2.37, w, 0.6, d, 'dark', 9.5);
    if (i) L.vrule(s, M + CW / 2 - 0.07, cy + 2.01, 0.95, RULE.onNavySoft);
  });

  L.foot(s, 7, 'dark');
  s.addNotes('The working principles from the Approach page, arranged as the value chain they describe: measure, compare, decide, own. The last two principles sit below as the delivery discipline that holds the chain together.');
  return s;
}

// =================================================================
// 08 — ÇALIŞMA YAKLAŞIMI
// =================================================================
function methodology(p) {
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  const cy0 = L.header(s, {
    eyebrow: 'OUR APPROACH',
    title: 'Four stages, each ending in something tangible',
    lead: 'What gets delivered at the end of each stage is defined before it starts, and no stage begins before the previous one has closed.',
    w: span(10), leadW: span(9), size: 25,
  });

  const steps = [
    ['01', 'Assessment', 'We read the actual system: usage statistics, data quality, custom code inventory and process durations. The findings come from the gap between the process as described and the process as executed.',
     'Diagnostic report with prioritised findings', '2–6 weeks'],
    ['02', 'Architecture and roadmap', 'We place the options side by side with cost, duration and risk, and design the target architecture. You take the decision; the reasoning stays on paper.',
     'Target architecture document and phased roadmap', '3–6 weeks'],
    ['03', 'Delivery', 'Configuration, data migration, integration and testing. Mock migrations and reconciliation reporting become routine rather than milestones.',
     'Working system, test records and cutover plan', '3–14 months'],
    ['04', 'Hypercare', 'We run the first post-go-live close alongside your team. Tickets are classified, and the recurring ones are fixed at the source rather than reprocessed monthly.',
     'Hypercare closing report and improvement backlog', '4–12 weeks'],
  ];

  const baseY = cy0 + 0.42, cw = 2.72, gapx = 0.24;
  L.rule(s, M, baseY, CW, C.line);

  steps.forEach(([no, t, what, deliv, dur], i) => {
    const x = M + i * (cw + gapx);
    const w = cw - 0.12;
    // taban çizgisi üzerindeki adım işareti
    s.addShape('ellipse', { x: x - 0.065, y: baseY - 0.065, w: 0.13, h: 0.13,
      fill: { color: C.teal }, line: { color: C.teal, width: 0.25 } });
    L.monoLabel(s, x + 0.22, baseY - 0.365, 1, no, C.teal, 12);
    s.addText(t, {
      x, y: baseY + 0.22, w, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14, bold: true, color: C.teal, charSpacing: -0.3, valign: 'top',
    });
    L.body(s, x, baseY + 0.62, w, 1.2, what, 'light', 9.5);
    // çıktı — elle tutulur olan; paper tonunda ayrı bir alanda
    s.addShape('rect', { x, y: baseY + 2.02, w, h: 0.86, fill: { color: C.paper } });
    L.monoLabel(s, x + 0.14, baseY + 2.14, w - 0.28, 'DELIVERABLE', C.sep, 7);
    s.addText(deliv, {
      x: x + 0.14, y: baseY + 2.36, w: w - 0.28, h: 0.46, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9, color: C.ink, lineSpacing: 11.5, valign: 'top',
    });
    L.rule(s, x, baseY + 3.02, w, RULE.onPaperSoft);
    s.addText(dur, {
      x, y: baseY + 3.1, w, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 8.5, color: C.teal, charSpacing: 0.6, valign: 'middle',
    });
    if (i < 3) {
      const mx = x + cw + gapx / 2 - 0.03;
      L.seg(s, mx - 0.075, baseY - 0.075, mx + 0.02, baseY, C.line, 0.9);
      L.seg(s, mx - 0.075, baseY + 0.075, mx + 0.02, baseY, C.line, 0.9);
    }
  });

  L.foot(s, 8);
  s.addNotes('The four-stage delivery model from the homepage, with each stage’s named deliverable and duration. No stage is a milestone without an artefact attached.');
  return s;
}

module.exports = { solutions, cloudDecision, value, methodology };
