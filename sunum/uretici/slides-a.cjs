const L = require('./lib.cjs');
const { C, F, RULE, W, H, M, CW, colX, span } = L;
const A = './assets/';

// =================================================================
// 01 — KAPAK
// =================================================================
function cover(p) {
  const s = p.addSlide();
  s.background = { color: C.navy };

  L.ledger(s, 6.95, 0.62, 5.6, 4.9, {
    rule: L.mix(C.navy, 'FFFFFF', 0.155),
    edge: L.mix(C.navy, 'FFFFFF', 0.46),
    node: 'FFFFFF',
    accent: C.amber,
  });

  s.addImage({ path: A + 'logo-dark.png', x: M, y: 0.72, w: 2.05, h: 2.05 / 2.905 });

  L.eyebrow(s, M, 2.42, 'COMPANY OVERVIEW', 'dark');
  s.addText('10+ years of SAP finance\nexperience and SAP\ncloud architecture', {
    x: M, y: 2.82, w: span(7), h: 2.1, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 33, bold: true, color: 'FFFFFF',
    charSpacing: -0.9, lineSpacing: 40, valign: 'top',
  });
  L.body(s, M, 5.02, span(6), 0.9,
    'Deep expertise across the SAP finance modules and a genuinely neutral read on the cloud models — so the decision you take is one you can defend with its reasoning.',
    'dark', 11);

  L.rule(s, M, 6.42, CW, RULE.onNavy);
  L.monoLabel(s, M, 6.62, 4, 'CPEAKCONSULTANCY.COM', C.amberDark, 8.5);
  s.addText('Istanbul  ·  Türkiye, EMEA and the United States', {
    x: W - M - 6, y: 6.62, w: 6, h: 0.2, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 8.5, color: L.mix(C.navy, 'FFFFFF', 0.62),
    charSpacing: 0.75, align: 'right', valign: 'middle',
  });
  s.addNotes('Cover. Positioning statement is the website H1 and hero lead, verbatim. The ledger-to-network figure is CPeak’s signature brand element, reproduced from the site.');
  return s;
}

// =================================================================
// 02 — BİZ KİMİZ
// =================================================================
function whoWeAre(p) {
  const s = p.addSlide();
  s.background = { color: C.paper };

  L.header(s, {
    eyebrow: 'WHO WE ARE',
    title: 'An independent consultancy, specialised end to end in SAP finance',
    w: span(6), size: 26,
  });

  const rx = colX(6), rw = span(6);
  const paras = [
    'CPeak Consultancy works end to end on the finance modules across SAP ECC, S/4HANA on-premise, Private Cloud and Public Cloud. Our focus is a senior team and an AI-supported way of working.',
    'The common model in SAP consulting is to offer broad scope and then source a different specialist for each area. We took the opposite position: if we take an engagement, we are not subcontracting the difficult part of it.',
    'Where a programme extends into logistics modules outside our specialism, we work alongside partners in Türkiye and abroad so that the finance scope stays covered end to end.',
  ];
  let y = 0.88;
  paras.forEach((t, i) => {
    if (i) L.rule(s, rx, y - 0.24, rw, RULE.onPaperSoft);
    L.body(s, rx, y, rw, 1.05, t, 'light', 10.5);
    y += 1.28;
  });

  // Kurumsal bilgiler — kart değil, üç satırlık bir defter.
  const facts = [
    ['FOUNDED', '2021'],
    ['HEAD OFFICE', 'Istanbul'],
    ['REGIONS SERVED', 'Türkiye, EMEA and the United States'],
  ];
  let fy = 2.72;
  L.rule(s, M, fy - 0.18, span(5), C.line);
  facts.forEach(([k, v]) => {
    L.monoLabel(s, M, fy, span(5), k, C.sep, 7.5);
    s.addText(v, {
      x: M, y: fy + 0.2, w: span(5), h: 0.28, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 13.5, bold: true, color: C.teal, charSpacing: -0.2, valign: 'middle',
    });
    L.rule(s, M, fy + 0.56, span(5), RULE.onPaperSoft);
    fy += 0.74;
  });

  // Bölümü kapatan cümle: sayfa, şeridin üstünde boş kâğıda dönüşerek
  // dağılmak yerine burada toparlanır.
  L.rule(s, M, 5.28, CW, C.line);
  s.addText('Rather than running many programmes in parallel, we run the number that allows senior people to be genuinely present on each.', {
    x: M, y: 5.46, w: span(9), h: 0.5, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 14.5, color: C.teal, charSpacing: -0.3,
    lineSpacing: 20, valign: 'top',
  });

  // Yetkinlik şeridi — sitenin koyu bandı, sayfa kenarına dayanır.
  const by = 6.22, bh = H - by;
  s.addShape('rect', { x: 0, y: by, w: W, h: bh, fill: { color: C.teal } });
  const strip = [
    ['EXPERIENCE', '10+', 'years in SAP finance'],
    ['EXPERTISE', '', 'Depth across FI and CO'],
    ['INDEPENDENCE', '', 'Public vs Private Cloud, vendor-neutral'],
    ['TEAM', '', 'Senior consultants only'],
  ];
  const sw = CW / 4;
  strip.forEach(([k, fig, txt], i) => {
    const x = M + i * sw;
    if (i) L.vrule(s, x - 0.16, by + 0.26, bh - 0.52, RULE.onTeal);
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
  s.addText('02', {
    x: W - M - 1, y: by + bh - 0.4, w: 1, h: 0.24, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 7.5, color: L.mix(C.teal, 'FFFFFF', 0.5),
    charSpacing: 0.6, align: 'right', valign: 'middle',
  });
  s.addNotes('Company introduction. Every claim here is on the About page: independence, the finance-only focus, the partner arrangement for logistics scope, and the three corporate facts. The dark strip is the website’s own capability band — qualitative, with 10+ years the only figure.');
  return s;
}

// =================================================================
// 03 — UZMANLIK ALANLARIMIZ
// =================================================================
function expertise(p) {
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  L.header(s, {
    eyebrow: 'OUR EXPERTISE',
    title: 'Three areas of expertise, and each one informs the others',
    w: span(7), size: 26,
  });

  // Solda: üç alan, birbirine bağlı bir üçgen olarak.
  const dx = M, dy = 2.42, dw = span(4), dh = 2.7;
  const pts = [
    { x: dx + dw * 0.24, y: dy + dh * 0.10, label: 'Finance modules' },
    { x: dx + dw * 0.84, y: dy + dh * 0.50, label: 'Cloud architecture' },
    { x: dx + dw * 0.30, y: dy + dh * 0.92, label: 'AI and automation' },
  ];
  for (let i = 0; i < 7; i++) L.rule(s, dx, dy - 0.1 + i * 0.44, dw, 'EDF2F5', 0.75);
  for (let i = 0; i < 3; i++) {
    const a = pts[i], b = pts[(i + 1) % 3];
    L.seg(s, a.x, a.y, b.x, b.y, '9FB4C2', 0.9);
  }
  pts.forEach((pt, i) => {
    s.addShape('ellipse', {
      x: pt.x - 0.14, y: pt.y - 0.14, w: 0.28, h: 0.28,
      fill: { color: C.teal }, line: { color: C.teal, width: 1 },
    });
    s.addText(String(i + 1).padStart(2, '0'), {
      x: pt.x - 0.14, y: pt.y - 0.14, w: 0.28, h: 0.28, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 8, color: 'FFFFFF', align: 'center', valign: 'middle',
    });
    const right = i === 1;
    s.addText(pt.label, {
      x: right ? pt.x - 2.3 - 0.24 : pt.x + 0.24, y: pt.y - 0.13, w: 2.3, h: 0.26,
      isTextBox: true, margin: 0, fontFace: F.display, fontSize: 11, bold: true,
      color: C.ink, charSpacing: -0.2, align: right ? 'right' : 'left', valign: 'middle',
    });
  });
  L.body(s, dx, dy + dh + 0.42, dw, 0.6,
    'One discipline, not three practices sold beside each other — a cloud decision is a finance decision here.',
    'light', 9.5);

  // Sağda: üç alan, defter satırları hâlinde.
  const areas = [
    ['01', 'Finance modules', 'SAP FI, CO, PA (MARGIN ANALYSIS) AND PS (PROJECT SYSTEM)',
     'Enterprise structure and global chart of accounts design, controlling and profitability, and redesign of the financial close.'],
    ['02', 'SAP cloud architecture', 'PRIVATE CLOUD AND PUBLIC CLOUD',
     'Fit assessment between the two models, target architecture design and migration management. We do not advocate for a particular model.'],
    ['03', 'AI and RPA-powered automation', 'EMBEDDED IN SAP, NOT BOUGHT BESIDE IT',
     'Matching, anomaly detection and predictive accounting using SAP’s embedded AI capabilities — measured first, then phased.'],
  ];
  const ax = colX(5), aw = span(7);
  let ay = 2.28;
  areas.forEach(([no, t, sub, d], i) => {
    L.rule(s, ax, ay - 0.2, aw, i === 0 ? C.line : RULE.onPaperSoft);
    L.monoLabel(s, ax, ay, 0.5, no, C.teal, 8.5);
    s.addText(t, {
      x: ax + 0.62, y: ay - 0.055, w: aw - 0.62, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 15, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
    });
    s.addText(sub, {
      x: ax + 0.62, y: ay + 0.26, w: aw - 0.62, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F.mono, fontSize: 7.5, color: C.sep, charSpacing: 0.6, valign: 'middle',
    });
    L.body(s, ax + 0.62, ay + 0.56, aw - 0.62, 0.7, d, 'light', 10);
    ay += 1.5;
  });

  L.foot(s, 3);
  s.addNotes('The three focus areas from the About page, in the site’s own order. The triangle carries the site’s claim that the three areas meet and inform one another.');
  return s;
}

// =================================================================
// 04 — SAP EKOSİSTEMİ
// =================================================================
function sapEcosystem(p) {
  const s = p.addSlide();
  s.background = { color: C.paper };

  L.header(s, {
    eyebrow: 'SAP EXPERTISE',
    title: 'One finance core, four deployment models, one embedded AI layer',
    w: span(9), size: 25,
  });

  const topY = 2.30, bh = 0.70, gap = 0.155;
  const colW = span(3), coreX = colX(3.6) - 0.1, coreW = span(4.8);
  const rightX = W - M - colW;
  const total = 4 * bh + 3 * gap;

  L.monoLabel(s, M, topY - 0.32, colW, 'DEPLOYMENT MODELS', C.sep, 7.5);
  L.monoLabel(s, rightX, topY - 0.32, colW, 'EMBEDDED AI CAPABILITIES', C.sep, 7.5);

  const boxes = (x, items, align) => items.forEach(([t, d], i) => {
    const y = topY + i * (bh + gap);
    s.addShape('rect', { x, y, w: colW, h: bh, fill: { color: 'FFFFFF' }, line: { color: C.line, width: 0.75 } });
    s.addText(t, {
      x: x + 0.16, y: y + 0.09, w: colW - 0.32, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 11, bold: true, color: C.teal, charSpacing: -0.2, valign: 'middle',
    });
    s.addText(d, {
      x: x + 0.16, y: y + 0.33, w: colW - 0.32, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 8.5, color: C.muted, lineSpacing: 11, valign: 'top',
    });
    const my = y + bh / 2;
    if (align === 'left') L.seg(s, x + colW, my, coreX, my, C.line, 0.75);
    else L.seg(s, coreX + coreW, my, x, my, C.line, 0.75);
  });

  boxes(M, [
    ['SAP ECC', 'The landscape most programmes start from'],
    ['S/4HANA on-premise', 'Own infrastructure, full flexibility'],
    ['Cloud ERP Private Edition', 'RISE with SAP — cloud operations, flexibility retained'],
    ['Cloud ERP Public Edition', 'Standard scope, rapid deployment'],
  ], 'left');

  boxes(rightX, [
    ['Intelligent matching', 'Bank and open items cleared from learned behaviour'],
    ['Anomaly detection', 'Unusual postings flagged before the close, not after'],
    ['Predictive accounting', 'Not-yet-final transactions visible during the period'],
    ['Joule', 'A natural-language layer for querying and navigation'],
  ], 'right');

  s.addShape('rect', { x: coreX, y: topY, w: coreW, h: total, fill: { color: C.teal } });
  L.monoLabel(s, coreX + 0.3, topY + 0.34, coreW - 0.6, 'SAP FINANCE CORE', C.amberDark, 8);
  s.addText('FI · CO · PA · PS', {
    x: coreX + 0.3, y: topY + 0.62, w: coreW - 0.6, h: 0.55, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 27, bold: true, color: 'FFFFFF', charSpacing: -0.6, valign: 'middle',
  });
  L.rule(s, coreX + 0.3, topY + 1.32, coreW - 0.6, RULE.onTeal);
  const core = [
    'Enterprise structure and global chart of accounts',
    'Controlling, costing and profitability',
    'The financial close, redesigned step by step',
    'Statutory and management reporting from one source',
  ];
  core.forEach((t, i) => {
    const y = topY + 1.48 + i * 0.42;
    s.addShape('ellipse', { x: coreX + 0.32, y: y + 0.10, w: 0.075, h: 0.075, fill: { color: C.amberDark }, line: { color: C.amberDark, width: 0.25 } });
    s.addText(t, {
      x: coreX + 0.56, y, w: coreW - 0.86, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 10, color: 'FFFFFF', valign: 'middle',
    });
  });

  L.rule(s, M, 5.87, CW, C.line);
  L.body(s, M, 6.04, span(9), 0.6,
    'SAP’s AI capabilities are embedded in the system rather than bought separately. Enabling all of them is not a strategy — we assess which ones your data volume and process discipline can support, and sequence them.',
    'light', 9.5);

  L.foot(s, 4);
  s.addNotes('SAP capability map. Deployment models and AI capabilities are exactly those named on the site; the core lists the finance work described on the Finance Modules page. Nothing here is a partnership or certification claim.');
  return s;
}

module.exports = { cover, whoWeAre, expertise, sapEcosystem };
