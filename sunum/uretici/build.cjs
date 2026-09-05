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

  // Sıra bir argümandır: sorun → bedel → cevap → derinlik → fark →
  // yöntem → somut çıktı → ticari teklif → sonraki adım.
  a.cover(p, t);            // 01
  a.problem(p, t);          // 02
  a.stakes(p, t);           // 03
  a.answer(p, t);           // 04
  b.sapCore(p, t);          // 05
  b.cloudDecision(p, t);    // 06
  c.techBusiness(p, t);     // 07
  b.value(p, t);            // 08
  b.methodology(p, t);      // 09
  c.deliverables(p, t);     // 10
  c.engagement(p, t);       // 11
  c.closing(p, t);          // 12

  return p.writeFile({ fileName: t.file + '.pptx' }).then((f) => console.log('yazıldı', f));
}

const only = process.argv[2];
const langs = only ? [only] : Object.keys(icerik);
langs.reduce((chain, l) => chain.then(() => deck(icerik[l])), Promise.resolve())
  .catch((e) => { console.error(e); process.exit(1); });
