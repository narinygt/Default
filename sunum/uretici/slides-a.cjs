const L = require('./lib.cjs');
const { C, F, RULE, W, H, M, CW, colX, span } = L;
const A = './assets/';

// =================================================================
// 01 — KAPAK
// =================================================================
function cover(p) {
  const s = p.addSlide();
  s.background = { color: C.navy };

  // Sitedeki hero'nun 'background' varyantı: görsel sağa yaslı, sol
  // kenarı lacivert zemine karışıyor (kenar geçişi görsele işlendi).
  s.addImage({ path: A + 'cover-hero.jpg', x: 6.60, y: 0, w: 6.733, h: 7.5 });

  s.addImage({ path: A + 'logo-dark.png', x: M, y: 0.82, w: 2.05, h: 2.05 / 2.905 });

  L.eyebrow(s, M, 2.78, 'COMPANY OVERVIEW', 'dark');
  s.addText('10+ years of SAP finance\nexperience and SAP\ncloud architecture', {
    x: M, y: 3.14, w: 5.3, h: 2.0, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 31, bold: true, color: 'FFFFFF',
    charSpacing: -0.9, lineSpacing: 38, valign: 'top',
  });
  L.body(s, M, 5.22, 5.15, 0.9,
    'Deep expertise across the SAP finance modules and a genuinely neutral read on the cloud models — so the decision you take is one you can defend with its reasoning.',
    'dark', 10.5);

  L.monoLabel(s, M, 6.78, 5, 'CPEAKCONSULTANCY.COM  ·  ISTANBUL', C.amberDark, 8.5);
  s.addNotes('Kapak. Konumlandırma cümlesi sitenin H1 ve hero girişinden birebir. Görsel, sitenin kendi hero görselidir (public/media/hero-team.webp).');
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
    w: 5.0, size: 25,
  });

  const rx = 7.0, rw = 5.48;
  const paras = [
    'CPeak Consultancy works end to end on the finance modules across SAP ECC, S/4HANA on-premise, Private Cloud and Public Cloud. Our focus is a senior team and an AI-supported way of working.',
    'The common model in SAP consulting is to offer broad scope and then source a different specialist for each area. We took the opposite position: if we take an engagement, we are not subcontracting the difficult part of it.',
    'Where a programme extends into logistics modules outside our specialism, we work alongside partners in Türkiye and abroad so that the finance scope stays covered end to end.',
  ];
  let y = 0.88;
  paras.forEach((t) => { L.body(s, rx, y, rw, 1.1, t, 'light', 10.5); y += 1.42; });

  // Kurumsal bilgiler — çizgisiz, yalnızca aralıkla ayrılmış üç kayıt.
  const facts = [['FOUNDED', '2021'], ['HEAD OFFICE', 'Istanbul'],
                 ['REGIONS SERVED', 'Türkiye, EMEA and the United States']];
  let fy = 2.68;
  facts.forEach(([k, v]) => {
    L.monoLabel(s, M, fy, 5.0, k, C.sep, 7.5);
    s.addText(v, {
      x: M, y: fy + 0.2, w: 5.0, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14, bold: true, color: C.teal, charSpacing: -0.2, valign: 'middle',
    });
    fy += 0.78;
  });

  // Bölümü kapatan cümle.
  s.addText('Rather than running many programmes in parallel, we run the number that allows senior people to be genuinely present on each.', {
    x: M, y: 5.42, w: 9.4, h: 0.6, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 14.5, color: C.teal, charSpacing: -0.3, lineSpacing: 20, valign: 'top',
  });

  // Yetkinlik şeridi — sitenin koyu bandı, sayfa kenarına dayanır.
  const by = 6.3, bh = H - by;
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
    x: W - M - 1, y: H - 0.42, w: 1, h: 0.24, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 7.5, color: L.mix(C.teal, 'FFFFFF', 0.5),
    charSpacing: 0.6, align: 'right', valign: 'middle',
  });
  s.addNotes('Şirket tanıtımı. Buradaki her iddia Hakkımızda sayfasında var: bağımsızlık, finans odağı, lojistik kapsam için iş ortağı düzeni ve üç kurumsal bilgi. Koyu şerit sitenin kendi yetkinlik bandı — nitel, tek sayı 10+ yıl.');
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
    w: 5.3, size: 25,
  });

  // Sitenin "dağınık finanstan tek mimariye" görseli.
  s.addImage({ path: A + 'fig-finance.jpg', x: 6.55, y: 1.42, w: 6.05, h: 4.03 });

  const areas = [
    ['01', 'Finance modules',
     'SAP FI, CO, PA and PS. Enterprise structure and global chart of accounts design, controlling and profitability, and redesign of the financial close.'],
    ['02', 'SAP cloud architecture',
     'Fit assessment between Private and Public Cloud, target architecture design and migration management. We do not advocate for a particular model.'],
    ['03', 'AI and RPA-powered automation',
     'Matching, anomaly detection and predictive accounting using SAP’s embedded AI capabilities — measured first, then phased.'],
  ];
  let ay = 2.62;
  areas.forEach(([no, t, d]) => {
    L.monoLabel(s, M, ay + 0.04, 0.5, no, C.teal, 8.5);
    s.addText(t, {
      x: M + 0.58, y: ay, w: 4.7, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 14.5, bold: true, color: C.teal, charSpacing: -0.3, valign: 'middle',
    });
    L.body(s, M + 0.58, ay + 0.36, 4.72, 0.8, d, 'light', 9.5);
    ay += 1.28;
  });

  L.foot(s, 3);
  s.addNotes('Hakkımızda sayfasındaki üç odak alanı, sitedeki sırayla. Görsel sitenin finans mimarisi şemasıdır.');
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

  const boxes = (x, items) => items.forEach(([t, d], i) => {
    const y = topY + i * (bh + gap);
    s.addShape('rect', { x, y, w: colW, h: bh, fill: { color: 'FFFFFF' }, line: { color: C.soft, width: 0.75 } });
    s.addText(t, {
      x: x + 0.16, y: y + 0.09, w: colW - 0.32, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F.display, fontSize: 11, bold: true, color: C.teal, charSpacing: -0.2, valign: 'middle',
    });
    s.addText(d, {
      x: x + 0.16, y: y + 0.33, w: colW - 0.32, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 8.5, color: C.muted, lineSpacing: 11, valign: 'top',
    });
  });

  boxes(M, [
    ['SAP ECC', 'The landscape most programmes start from'],
    ['S/4HANA on-premise', 'Own infrastructure, full flexibility'],
    ['Cloud ERP Private Edition', 'RISE with SAP — cloud operations, flexibility retained'],
    ['Cloud ERP Public Edition', 'Standard scope, rapid deployment'],
  ]);

  boxes(rightX, [
    ['Intelligent matching', 'Bank and open items cleared from learned behaviour'],
    ['Anomaly detection', 'Unusual postings flagged before the close, not after'],
    ['Predictive accounting', 'Not-yet-final transactions visible during the period'],
    ['Joule', 'A natural-language layer for querying and navigation'],
  ]);

  s.addShape('rect', { x: coreX, y: topY, w: coreW, h: total, fill: { color: C.teal } });
  L.monoLabel(s, coreX + 0.3, topY + 0.34, coreW - 0.6, 'SAP FINANCE CORE', C.amberDark, 8);
  s.addText('FI · CO · PA · PS', {
    x: coreX + 0.3, y: topY + 0.62, w: coreW - 0.6, h: 0.55, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: 27, bold: true, color: 'FFFFFF', charSpacing: -0.6, valign: 'middle',
  });
  const core = [
    'Enterprise structure and global chart of accounts',
    'Controlling, costing and profitability',
    'The financial close, redesigned step by step',
    'Statutory and management reporting from one source',
  ];
  core.forEach((t, i) => {
    const y = topY + 1.46 + i * 0.42;
    s.addShape('ellipse', { x: coreX + 0.32, y: y + 0.10, w: 0.075, h: 0.075,
      fill: { color: C.amberDark }, line: { color: C.amberDark, width: 0.25 } });
    s.addText(t, {
      x: coreX + 0.56, y, w: coreW - 0.86, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F.body, fontSize: 10, color: 'FFFFFF', valign: 'middle',
    });
  });

  L.body(s, M, 6.02, span(9), 0.6,
    'SAP’s AI capabilities are embedded in the system rather than bought separately. Enabling all of them is not a strategy — we assess which ones your data volume and process discipline can support, and sequence them.',
    'light', 9.5);

  L.foot(s, 4);
  s.addNotes('SAP yetkinlik haritası. Dağıtım modelleri ve yapay zeka yetenekleri sitede geçenlerin aynısı; çekirdekteki maddeler Finans Modülleri sayfasındaki işi anlatır. Hiçbir yerde iş ortaklığı ya da sertifika iddiası yok.');
  return s;
}

module.exports = { cover, whoWeAre, expertise, sapEcosystem };
