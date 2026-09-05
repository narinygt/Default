/**
 * Her dil için bir .pptx üretir. Yerleşim ortaktır; metin
 * `icerik.cjs` içinden, görseller dile göre `figSuffix` ile seçilir.
 *
 *   node build.cjs          → iki dili de üretir
 *   node build.cjs tr       → yalnızca Türkçesini
 */
const pptxgen = require('pptxgenjs');
const icerik = require('./icerik.cjs');
const a = require('./slides-a.cjs'), b = require('./slides-b.cjs'), c = require('./slides-c.cjs');

function deck(t) {
  const p = new pptxgen();                  // her dosya için AYRI örnek
  p.layout = 'LAYOUT_WIDE';                 // addSlide'dan ÖNCE verilmeli
  p.author = 'CPeak Consultancy';
  p.company = 'CPeak Consultancy';
  p.title = t.title;
  p.subject = t.subject;

  a.cover(p, t);
  a.whoWeAre(p, t);
  a.expertise(p, t);
  a.sapEcosystem(p, t);
  b.solutions(p, t);
  b.cloudDecision(p, t);
  b.value(p, t);
  b.methodology(p, t);
  c.techBusiness(p, t);
  c.engagements(p, t);
  c.whyCpeak(p, t);
  c.closing(p, t);

  return p.writeFile({ fileName: t.file + '.pptx' }).then((f) => console.log('yazıldı', f));
}

const only = process.argv[2];
const langs = only ? [only] : Object.keys(icerik);
langs.reduce((chain, l) => chain.then(() => deck(icerik[l])), Promise.resolve())
  .catch((e) => { console.error(e); process.exit(1); });
