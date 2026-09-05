const L = require('./lib.cjs');
const { C, F, RULE, W, H, M, CW, colX, span } = L;
const A = './assets/';
const refs = require('./refs.json');

// =================================================================
// 09 — TEKNOLOJİ VE İŞ
// =================================================================
function techBusiness(p) {
  const s = p.addSlide();
  s.background = { color: C.paper };

  const cy0 = L.header(s, {
    eyebrow: 'TECHNOLOGY AND BUSINESS',
    title: 'We use AI on both sides: in your processes and in how we work',
    lead: 'Not a separate service line, but part of both the system we deliver and the method we use to deliver it.',
    w: span(10), leadW: span(9), size: 24,
  });

  const midX = W / 2;
  const colW = 4.55;
  const leftX = M, rightX = W - M - colW;
  const topY = cy0 + 0.02;

  const cluster = (x, label, head, items, side) => {
    L.monoLabel(s, x, topY, colW, label, C.teal, 7.5);
    s.addText(head, {
      x, y: topY + 0.26, w: colW, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 15, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
    });
    L.rule(s, x, topY + 0.68, colW, C.line);
    items.forEach((t, i) => {
      const y = topY + 0.84 + i * 0.52;
      const ny = y + 0.14;
      const nx = side === 'left' ? x + colW - 0.06 : x + 0.06;
      s.addShape('ellipse', { x: nx - 0.055, y: ny - 0.055, w: 0.11, h: 0.11,
        fill: { color: C.teal }, line: { color: C.teal, width: 0.25 } });
      // her düğümü merkezdeki omurgaya bağla
      L.seg(s, side === 'left' ? nx : midX - 0.62, ny, side === 'left' ? midX + 0.62 : nx, ny,
        side === 'left' ? C.line : C.line, 0.75);
      s.addText(t, {
        x: side === 'left' ? x : x + 0.22, y, w: colW - 0.3, h: 0.36, isTextBox: true, margin: 0,
        fontFace: F.body, fontSize: 10, color: C.ink, lineSpacing: 12.5, valign: 'middle',
        align: side === 'left' ? 'right' : 'left',
      });
    });
  };

  cluster(leftX, 'IN YOUR FINANCE PROCESSES', 'Automation your team keeps', [
    'Intelligent matching of bank and open items',
    'Anomaly detection before the close, not after',
    'Predictive accounting during the period',
    'Joule for natural-language querying',
  ], 'left');

  cluster(rightX, 'IN OUR OWN DELIVERY', 'Preparation work, compressed', [
    'Custom code inventory and impact analysis',
    'First drafts of test scenarios',
    'Migration reconciliation checks',
    'Initial configuration documentation',
  ], 'right');

  // Merkez omurga — iki tarafın buluştuğu yer
  const spineTop = topY + 0.84, spineBot = topY + 0.84 + 3 * 0.52;
  L.vrule(s, midX, spineTop - 0.28, (spineBot - spineTop) + 0.72, C.teal, 1);
  s.addShape('rect', { x: midX - 0.62, y: spineBot + 0.44, w: 1.24, h: 0.34,
    fill: { color: C.teal } });
  s.addText('SAP', {
    x: midX - 0.62, y: spineBot + 0.44, w: 1.24, h: 0.34, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 9, color: 'FFFFFF', charSpacing: 1, align: 'center', valign: 'middle',
  });

  // Duruş — tek ve ölçülü amber anı: amber işaret, ink metin
  const by = 6.12;
  L.rule(s, M, by - 0.26, CW, C.line);
  s.addShape('rect', { x: M, y: by + 0.155, w: 0.13, h: 0.13, fill: { color: C.amber }, line: { color: C.amber, width: 0.25 } });
  s.addText([
    { text: 'Our position.  ', options: { fontFace: F.display, fontSize: 11, bold: true, color: C.ink } },
    { text: 'Every step touching client data runs inside boundaries agreed in advance, and no decision producing a financial posting is finalised without human review.',
      options: { fontFace: F.body, fontSize: 10, color: C.muted } },
  ], { x: M + 0.32, y: by, w: span(9), h: 0.72, isTextBox: true, margin: 0, valign: 'middle', lineSpacing: 14 });

  L.foot(s, 9);
  s.addNotes('The AI section of the homepage. The point of the slide is that both sides run through the same SAP system and the same review discipline — technology serving the finance process, not sold alongside it.');
  return s;
}

// =================================================================
// 10 — PRATİKTE PROJELER
// =================================================================
function engagements(p) {
  const s = p.addSlide();
  s.background = { color: 'FFFFFF' };

  const cy0 = L.header(s, {
    eyebrow: 'ENGAGEMENTS IN PRACTICE',
    title: 'What the work looks like in practice',
    lead: 'Three situations we meet regularly, and the approach we take to each.',
    w: span(10), leadW: span(8), size: 26,
  });
  s.addText('ILLUSTRATIVE — NOT CLIENT CASES', {
    x: W - M - 3.6, y: cy0 - 0.52, w: 3.6, h: 0.24, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 7.5, color: C.sep, charSpacing: 0.75, align: 'right', valign: 'middle',
  });

  const cases = [
    ['Manufacturing', 'MULTI-ENTITY GROUP, SEVERAL COUNTRIES',
     'A group running ECC needs an S/4HANA plan before maintenance deadlines force one. Nobody knows how much accumulated custom code is still executed.',
     'A usage-based custom code inventory first. All three conversion routes compared on cost, duration and risk. Company codes planned in waves.',
     'A reasoned approach decision that survives board scrutiny, and a smaller conversion scope once dead development is retired.'],
    ['Technology and services', 'FAST-GROWING MID-MARKET COMPANY',
     'The company is scaling quickly while finance still runs on spreadsheets. A standard ERP deployment is wanted, but whether Public Cloud suffices is unknown.',
     'Processes compared against standard scope item by item. Fit-to-standard workshops retire differences that exist only through habit.',
     'A finance setup built on standard and ready for the release cycle, plus a deployment template that repeats in new markets.'],
    ['Retail', 'MULTI-SITE, HIGH TRANSACTION VOLUME',
     'The month-end close runs long and unpredictably. Reconciliation is largely manual, and unmatched items depend on two or three people.',
     'The close measured step by step to find the dependencies creating wait time. Matching thresholds calibrated against real data.',
     'A close calendar that is predictable step by step, with the team moving from matching items to reviewing exceptions.'],
  ];

  const cw = 3.62, gapx = 0.42, topY = cy0 + 0.12;
  L.rule(s, M, topY, CW, C.teal, 1.25);   // üç ayrı şerit değil, tek tablo çizgisi
  cases.forEach(([sector, scale, prob, appr, out], i) => {
    const x = M + i * (cw + gapx);
    if (i) L.vrule(s, x - gapx / 2, topY, 4.2, RULE.onPaperSoft);
    s.addText(sector, {
      x, y: topY + 0.16, w: cw, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 15, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
    });
    L.monoLabel(s, x, topY + 0.5, cw, scale, C.sep, 7);
    let y = topY + 0.86;
    [['SITUATION', prob], ['APPROACH', appr], ['OUTCOME', out]].forEach(([k, t], j) => {
      L.monoLabel(s, x, y, cw, k, C.teal, 7);
      L.body(s, x, y + 0.22, cw, 0.9, t, 'light', 9.5);
      y += 1.12;
      if (j < 2) L.rule(s, x, y - 0.14, cw, RULE.onPaperSoft);
    });
  });

  L.body(s, M, topY + 4.42, span(10), 0.4,
    'These contain no client names, figures or outcome claims. They are written to show how an engagement works.',
    'light', 8.5);

  L.foot(s, 10);
  s.addNotes('The three typical engagements from the homepage, carrying the site’s own disclaimer. No invented metrics, clients or results.');
  return s;
}

// =================================================================
// 11 — NEDEN CPEAK
// =================================================================
function whyCpeak(p) {
  const s = p.addSlide();
  s.background = { color: C.paper };

  const cy0 = L.header(s, {
    eyebrow: 'WHY CPEAK',
    title: 'The difference is who actually does the work',
    lead: 'In SAP consulting the outcome is decided less by methodology than by who actually works on the project.',
    w: span(10), leadW: span(9), size: 26,
  });

  const pillars = [
    ['Real depth in the finance modules',
     'FI and CO are our core discipline, not a capability brought along beside something else. On decisions that are expensive to reverse — enterprise structure, costing design, the close calendar — you get the view of someone who has lived the consequences several times.'],
    ['Neutral on the cloud model',
     'We do not advocate for Public or Private Cloud. We compare your processes against standard scope and put the cost and constraint of both models side by side for your specific situation.'],
    ['Delivery accelerated by AI',
     'We use AI for the volume work: analysis, documentation, test scenario generation and migration reconciliation. It shortens the preparation phases and leaves senior time for the parts that require judgement.'],
    ['Senior consultants on every engagement',
     'The people named in the proposal are the people who turn up. You are not charged for a consultant’s learning curve. When scope grows we phase the work rather than inflate the team.'],
  ];

  const pw = 2.72, gapx = 0.24, topY = cy0 + 0.16;
  L.rule(s, M, topY, CW, C.teal, 1);
  pillars.forEach(([t, d], i) => {
    const x = M + i * (pw + gapx);
    if (i) L.vrule(s, x - gapx / 2, topY + 0.16, 3.15, RULE.onPaperSoft);
    L.monoLabel(s, x, topY + 0.2, pw, String(i + 1).padStart(2, '0'), C.teal, 11);
    s.addText(t, {
      x, y: topY + 0.52, w: pw - 0.1, h: 0.62, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 13.5, bold: true, color: C.teal, charSpacing: -0.3, lineSpacing: 17, valign: 'top',
    });
    L.body(s, x, topY + 1.2, pw - 0.1, 1.6, d, 'light', 9.5);
  });

  // Referans şeridi — sitenin kendi logo bandından yeniden üretildi.
  const bandY = 5.55, bandH = 1.06;
  s.addShape('rect', { x: 0, y: bandY, w: W, h: bandH, fill: { color: 'FFFFFF' } });
  L.rule(s, 0, bandY, W, C.soft);
  L.rule(s, 0, bandY + bandH, W, C.soft);
  L.monoLabel(s, M, bandY + bandH / 2 - 0.1, 1.4, 'REFERENCES', C.sep, 7.5);

  const maxH = 0.30, k = 0.0072;
  const placed = [];
  let used = 0;
  const budget = CW - 1.55;
  for (const r of refs) {
    const maxW = r.w * k;
    const ar = r.iw / r.ih;
    let h = maxH, w = h * ar;
    if (w > maxW) { w = maxW; h = w / ar; }
    if (used + w + (placed.length ? 0.34 : 0) > budget) continue;
    used += w + (placed.length ? 0.34 : 0);
    placed.push({ r, w, h });
  }
  let lx = M + 1.55 + (budget - used) / 2;
  placed.forEach(({ r, w, h }, i) => {
    if (i) lx += 0.34;
    const file = 'ref-' + r.src.split('/').pop().replace(/\.(svg|webp)$/, '') + '.png';
    s.addImage({ path: A + file, x: lx, y: bandY + (bandH - h) / 2, w, h });
    lx += w;
  });

  L.foot(s, 11);
  s.addNotes('The four differentiators from the homepage, verbatim in substance. The reference strip is the site’s own logo band — no partnership, certification or award claims are made anywhere in this deck, because the site makes none.');
  return s;
}

// =================================================================
// 12 — KAPANIŞ
// =================================================================
function closing(p) {
  const s = p.addSlide();
  s.background = { color: C.navy };

  L.ledger(s, 7.6, 0.0, 6.0, 5.25, {
    rule: L.mix(C.navy, 'FFFFFF', 0.115),
    edge: L.mix(C.navy, 'FFFFFF', 0.30),
    node: L.mix(C.navy, 'FFFFFF', 0.60),
    accent: C.amber,
  });

  s.addImage({ path: A + 'logo-dark.png', x: M, y: 0.75, w: 1.9, h: 1.9 / 2.905 });

  L.eyebrow(s, M, 2.32, 'NEXT STEP', 'dark');
  s.addText('Tell us about your project\nand we will come back\nwithin one business day', {
    x: M, y: 2.68, w: span(7), h: 1.9, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 28, bold: true, color: 'FFFFFF',
    charSpacing: -0.8, lineSpacing: 36, valign: 'top',
  });
  L.body(s, M, 4.62, span(6), 0.5,
    'A few sentences on where you are today and what you are trying to solve is enough to start. The first call runs 30–45 minutes at no cost.',
    'dark', 10);

  const items = [
    ['GENERAL', 'info@cpeakconsultancy.com'],
    ['DIRECT — KEREM YİĞİT', 'kerem.yigit@cpeakconsultancy.com'],
    ['TELEPHONE', '+90 (507) 032 81 70'],
    ['OFFICE', 'Bostancı Mah. Şemsettin Günaltay Cad. No: 31/8\n34744 Kadıköy, İstanbul'],
    ['WEB', 'cpeakconsultancy.com'],
    ['LINKEDIN', 'linkedin.com/company/cpeak-consultancy'],
  ];
  const cy = 5.5, colw = CW / 3 - 0.2;
  L.rule(s, M, cy - 0.22, CW, L.mix(C.navy, 'FFFFFF', 0.26));
  items.forEach(([k, v], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * (colw + 0.3);
    const y = cy + row * 0.66;
    L.monoLabel(s, x, y, colw, k, C.amberDark, 7);
    s.addText(v, {
      x, y: y + 0.19, w: colw, h: 0.38, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 9.5, color: 'FFFFFF', lineSpacing: 12, valign: 'top',
    });
  });

  s.addText('12', {
    x: W - M - 1, y: 6.94, w: 1, h: 0.24, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 7.5, color: L.mix(C.navy, 'FFFFFF', 0.55),
    charSpacing: 0.6, align: 'right', valign: 'middle',
  });
  s.addNotes('Closing. All contact details are taken from the site configuration: general and direct addresses, telephone, registered office, website and LinkedIn.');
  return s;
}

module.exports = { techBusiness, engagements, whyCpeak, closing };
