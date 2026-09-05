const pptxgen = require('pptxgenjs');
const a = require('./slides-a.cjs'), b = require('./slides-b.cjs'), c = require('./slides-c.cjs');

const p = new pptxgen();
p.layout = 'LAYOUT_WIDE';                 // addSlide'dan ÖNCE verilmeli
p.author = 'CPeak Consultancy';
p.company = 'CPeak Consultancy';
p.title = 'CPeak Consultancy — Company Overview';
p.subject = 'SAP finance modules, S/4HANA transformation and SAP cloud architecture';

a.cover(p);
a.whoWeAre(p);
a.expertise(p);
a.sapEcosystem(p);
b.solutions(p);
b.cloudDecision(p);
b.value(p);
b.methodology(p);
c.techBusiness(p);
c.engagements(p);
c.whyCpeak(p);
c.closing(p);

p.writeFile({ fileName: 'CPeak-Consultancy-Company-Overview.pptx' })
  .then((f) => console.log('written', f))
  .catch((e) => { console.error(e); process.exit(1); });
