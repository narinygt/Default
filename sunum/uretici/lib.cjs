// ---------------------------------------------------------------
// CPeak Consultancy — sunum tasarım sistemi
// Token'lar sitenin src/styles/global.css dosyasından birebir alınmıştır.
// ---------------------------------------------------------------
const C = {
  teal:      '11676A',  // --navy / --teal : primary corporate colour
  navy:      '003F82',  // --surface-darkest : darkest ground
  ink:       '0E1620',  // --ink
  paper:     'F7F8F7',  // --paper
  white:     'FFFFFF',
  line:      'C9D6DE',  // --line
  soft:      'E2E9EE',  // --border-soft
  muted:     '4A5A67',  // --text-muted
  sep:       '5F6D77',  // --separator
  amber:     'E8B33A',  // --amber : the single accent
  amberDark: 'F5DCA4',  // --amber-on-dark
  onDark:    'D2DDE6',  // --text-on-dark-muted
};

const F = {
  display: 'Schibsted Grotesk',
  body:    'Inter',
  mono:    'IBM Plex Mono',
};

// İki hex rengi karıştırır. Koyu zemindeki saç çizgileri için kullanılır:
// böylece dosyaya hiç alfa kanalı girmez (8 haneli hex pptx'i bozar).
function mix(a, b, t) {
  const p = (h) => [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));
  const [r1, g1, b1] = p(a), [r2, g2, b2] = p(b);
  const c = (x, y) => Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
  return (c(r1, r2) + c(g1, g2) + c(b1, b2)).toUpperCase();
}

// Zemine göre saç çizgisi renkleri
const RULE = {
  onPaper: C.line,
  onPaperSoft: C.soft,
  onNavy: mix(C.navy, 'FFFFFF', 0.20),
  onNavySoft: mix(C.navy, 'FFFFFF', 0.13),
  onTeal: mix(C.teal, 'FFFFFF', 0.24),
};

// ---- Izgara ------------------------------------------------------
const W = 13.333, H = 7.5;
const M = 0.85;                       // page margin
const CW = W - 2 * M;                 // 11.633 content width
const GUT = 0.2;
const COL = (CW - 11 * GUT) / 12;     // 0.7861
const colX = (i) => M + i * (COL + GUT);
const span = (n) => n * COL + (n - 1) * GUT;

// ---- Temel öğeler ------------------------------------------------

/** İki nokta arasında yatay ya da eğik saç çizgisi. */
function seg(s, x1, y1, x2, y2, color, width = 0.75, dash) {
  const o = {
    x: Math.min(x1, x2), y: Math.min(y1, y2),
    w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    line: { color, width },
  };
  if (dash) o.line.dashType = dash;
  if ((x2 - x1) * (y2 - y1) < 0) o.flipV = true;
  s.addShape('line', o);
}

const rule = (s, x, y, w, color, width = 0.75) => seg(s, x, y, x + w, y, color, width);
const vrule = (s, x, y, h, color, width = 0.75) => seg(s, x, y, x, y + h, color, width);

/**
 * Bölüm etiketi — sitedeki `.eyebrow`: monospace, büyük harf, 0.1em
 * harf aralığı. Sitedeki soldaki kısa çizgi BURADA YOK: on iki slaytta
 * tekrarlanınca desteye çizgi hissi veren şeylerin başında geliyordu.
 * Etiketi ayıran şey artık yalnızca yüz, renk ve harf aralığı.
 */
function eyebrow(s, x, y, text, tone = 'light') {
  const col = tone === 'light' ? C.teal : C.amberDark;
  s.addText(text, {
    x, y: y - 0.075, w: 6, h: 0.26, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 8.5, color: col, charSpacing: 0.9, valign: 'middle',
  });
}

/** Slayt başlığı — display yüzü, 550 civarı ağırlık, sıkı harf aralığı. */
function title(s, x, y, w, text, opts = {}) {
  s.addText(text, {
    x, y, w, h: opts.h || 0.95, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: opts.size || 26, bold: true,
    color: opts.color || C.teal, charSpacing: opts.size >= 30 ? -0.7 : -0.45,
    lineSpacing: (opts.size || 26) * 1.16, valign: 'top', align: opts.align || 'left',
  });
}

function lead(s, x, y, w, text, tone = 'light', size = 11.5) {
  s.addText(text, {
    x, y, w, h: 0.9, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: size,
    color: tone === 'light' ? C.muted : C.onDark,
    lineSpacing: size * 1.5, valign: 'top',
  });
}

function body(s, x, y, w, h, text, tone = 'light', size = 10.5) {
  s.addText(text, {
    x, y, w, h, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: size,
    color: tone === 'light' ? C.muted : C.onDark,
    lineSpacing: size * 1.55, valign: 'top',
  });
}

function monoLabel(s, x, y, w, text, color, size = 8) {
  s.addText(text, {
    x, y, w, h: 0.2, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: size, color, charSpacing: 0.75, valign: 'middle',
  });
}

/**
 * Referans logoları şeridi — sitedeki bandın ölçü mantığıyla: ortak bir
 * YÜKSEKLİK tavanı + logoya özel GENİŞLİK tavanı. Bütçeye sığan kadarı
 * yerleştirilir ve şerit ortalanır.
 */
function refStrip(s, x0, bandY, bandH, budget, assetDir) {
  const refs = require('./refs.json');
  const maxH = 0.30, k = 0.0072;
  const placed = [];
  let used = 0;
  for (const r of refs) {
    const maxW = r.w * k, ar = r.iw / r.ih;
    let h = maxH, w = h * ar;
    if (w > maxW) { w = maxW; h = w / ar; }
    if (used + w + (placed.length ? 0.34 : 0) > budget) continue;
    used += w + (placed.length ? 0.34 : 0);
    placed.push({ r, w, h });
  }
  let lx = x0 + (budget - used) / 2;
  placed.forEach(({ r, w, h }, i) => {
    if (i) lx += 0.34;
    const file = 'ref-' + r.src.split('/').pop().replace(/\.(svg|webp)$/, '') + '.png';
    s.addImage({ path: assetDir + file, x: lx, y: bandY + (bandH - h) / 2, w, h });
    lx += w;
  });
}

/** Koyu bandın içine düşen sayfa numarası. */
function pageNo(s, n, bandColor, y) {
  s.addText(String(n).padStart(2, '0'), {
    x: W - M - 1, y, w: 1, h: 0.24, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 7.5, color: mix(bandColor, 'FFFFFF', 0.5),
    charSpacing: 0.6, align: 'right', valign: 'middle',
  });
}

/** Alt bilgi: solda isim, sağda slayt numarası. Çizgi ya da şerit yok. */
function foot(s, n, tone = 'light', name = 'CPeak Consultancy') {
  const col = tone === 'light' ? C.sep : mix(C.navy, 'FFFFFF', 0.55);
  s.addText(name, {
    x: M, y: 6.94, w: 4, h: 0.24, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 7.5, color: col, charSpacing: 0.6, valign: 'middle',
  });
  s.addText(String(n).padStart(2, '0'), {
    x: W - M - 1, y: 6.94, w: 1, h: 0.24, isTextBox: true, margin: 0,
    fontFace: F.mono, fontSize: 7.5, color: col, charSpacing: 0.6,
    align: 'right', valign: 'middle',
  });
}

/**
 * Markanın imza görseli: defter çizgilerinin bir düğüm ağına çözülmesi.
 * Geometri src/components/Ledger.astro dosyasından (viewBox 480x420)
 * kopyalandı; sunum siteyle aynı çizimi taşısın diye.
 */
const LEDGER = {
  rows: Array.from({ length: 10 }, (_, i) => 40 + i * 40),
  marginX: 44,
  nodes: [
    { x: 96, y: 120, r: 4 }, { x: 216, y: 80, r: 3 }, { x: 330, y: 160, r: 5 },
    { x: 150, y: 240, r: 3 }, { x: 288, y: 280, r: 4 }, { x: 402, y: 320, r: 3 },
    { x: 72, y: 336, r: 3 }, { x: 216, y: 200, r: 6 },
  ],
  edges: [[0,1],[1,2],[0,7],[7,2],[7,3],[3,4],[4,2],[4,5],[3,6],[6,4]],
};

function ledger(s, x, y, w, h, o = {}) {
  const sx = w / 480, sy = h / 420, rs = sx * 1.9;
  const cRule = o.rule, cEdge = o.edge, cNode = o.node, cAccent = o.accent || C.amber;
  LEDGER.rows.forEach((ry) => rule(s, x, y + ry * sy, w, cRule, 0.75));
  vrule(s, x + LEDGER.marginX * sx, y, h, cRule, 0.75);
  LEDGER.edges.forEach(([a, b]) => {
    const p = LEDGER.nodes[a], q = LEDGER.nodes[b];
    seg(s, x + p.x * sx, y + p.y * sy, x + q.x * sx, y + q.y * sy, cEdge, 0.75);
  });
  LEDGER.nodes.forEach((n, i) => {
    const r = n.r * rs;
    s.addShape('ellipse', {
      x: x + n.x * sx - r, y: y + n.y * sy - r, w: r * 2, h: r * 2,
      fill: { color: i === 7 ? cAccent : cNode }, line: { color: i === 7 ? cAccent : cNode, width: 0.25 },
    });
  });
}


/**
 * Satır sayısı tahmini. İki marka yüzünün LibreOffice çıktısıyla
 * kalibre edildi: Schibsted Grotesk bold harf başına ortalama 0.515 em,
 * Inter regular 0.585 em. Kaç satıra saracağı önceden bilinmeyen bir
 * başlığın altına giriş paragrafını yerleştirmek için kullanılır.
 */
function estLines(text, widthIn, sizePt, avgEm) {
  const cw = avgEm * sizePt / 72;
  const max = Math.max(8, Math.floor(widthIn / cw));
  return String(text).split('\n')
    .reduce((n, ln) => n + Math.max(1, Math.ceil(ln.length / max)), 0);
}

/**
 * Standart slayt başlığı: etiket, başlık, isteğe bağlı giriş. İçeriğin
 * başlayabileceği y değerini döndürür; böylece saran bir başlık altındaki
 * paragrafın üzerine hiçbir zaman binmez.
 */
function header(s, o) {
  const x = o.x !== undefined ? o.x : M;
  const w = o.w || span(10);
  const size = o.size || 25;
  const tone = o.tone || 'light';
  const y = o.y !== undefined ? o.y : 0.58;

  eyebrow(s, x, y, o.eyebrow, tone);

  const tLines = estLines(o.title, w, size, 0.515);
  const tH = tLines * size * 1.18 / 72;
  s.addText(o.title, {
    x, y: y + 0.30, w, h: tH + 0.08, isTextBox: true, margin: 0,
    fontFace: F.display, fontSize: size, bold: true,
    color: tone === 'light' ? C.teal : 'FFFFFF',
    charSpacing: size >= 28 ? -0.8 : -0.5, lineSpacing: size * 1.18, valign: 'top',
  });
  let cy = y + 0.30 + tH;

  if (o.lead) {
    const lw = o.leadW || span(9);
    const lSize = o.leadSize || 10.5;
    const lLines = estLines(o.lead, lw, lSize, 0.585);
    const lH = lLines * lSize * 1.5 / 72;
    body(s, x, cy + 0.20, lw, lH + 0.1, o.lead, tone, lSize);
    cy = cy + 0.20 + lH;
  }
  return cy + 0.34;
}

module.exports = { C, F, mix, estLines, header, pageNo, refStrip, RULE, W, H, M, CW, GUT, COL, colX, span,
  seg, rule, vrule, eyebrow, title, lead, body, monoLabel, foot, ledger };
