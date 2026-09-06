/**
 * Her dil için bir .pptx üretir. Sayfa sırası müşterinin verdiği
 * listeye göredir; slayt üzerindeki numaralar o listeyle birebir aynıdır.
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

  a.cover(p, t);          // kapak
  a.finance(p, t);        // 01 SAP Finans Modülleri
  a.s4hana(p, t);         // 02 S/4HANA Dönüşümü
  a.publicCloud(p, t);    // 03 SAP Public Cloud
  b.privateCloud(p, t);   // 04 SAP Private Cloud
  b.compare(p, t);        // 05 Public / Private karşılaştırması
  b.ai(p, t);             // 06 Yapay Zeka ve Finans
  b.deliverables(p, t);   // 07 Teslim edilenler
  c.method(p, t);         // 08 Nasıl çalışırız
  c.references(p, t);     // 09 Referanslar
  c.approach(p, t);       // 10 Yaklaşımımız
  c.focus(p, t);          // 11 Ne üzerinde çalışıyoruz
  c.closing(p, t);        // kurumsal iletişim

  return p.writeFile({ fileName: t.file + '.pptx' }).then((f) => console.log('yazıldı', f));
}

const only = process.argv[2];
const langs = only ? [only] : Object.keys(icerik);
langs.reduce((chain, l) => chain.then(() => deck(icerik[l])), Promise.resolve())
  .catch((e) => { console.error(e); process.exit(1); });
