/* ==========================================================================
   content/fi-en/foreign-currency.js — English body for "Foreign Currency
   Valuation" (Kur Değerlemesi)
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'foreign-currency',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Foreign currency valuation is **the period-end remeasurement of foreign-currency items and ' +
      'balances at the current exchange rate**. The goal: making the amount shown on the balance sheet ' +
      'reflect its real value as of that date.\n\n' +
      'The topic has three distinct concepts, and they must not be confused:\n\n' +
      '**Translation:** a foreign-currency transaction is converted into local currency at the moment ' +
      'it is posted.\n\n' +
      '**Valuation:** at period end, open items are remeasured at the current exchange rate. The ' +
      'difference is **unrealized** and is usually reversed.\n\n' +
      '**Realization:** when the item is paid or collected, the difference becomes final. This ' +
      'difference is **permanent**.',

    neden:
      '**To show reality.** A EUR 10,000 payable was posted at a rate of 35.00; today the rate is ' +
      '38.80. Showing 350,000 TRY on the balance sheet is misleading — the real liability is ' +
      '388,000 TRY.\n\n' +
      '**A legal requirement.** Accounting standards require foreign-currency items to be valued at ' +
      'the period-end rate.\n\n' +
      '**Risk visibility.** Valuation exposes the size of currency risk. The answer to "how much ' +
      'would we lose if the rate rose 10%?" comes from here.',

    sirketOnemi:
      'At companies that import/export or use foreign-currency loans, exchange rate differences can ' +
      'be **the single largest driver of profit**. A company that is operationally profitable can ' +
      'report a loss purely because of currency movement.\n\n' +
      'From a consulting standpoint, this is the closing step where the most mistakes happen. The ' +
      'reason: the configuration is layered ({{OB08}} rates, {{OB59}} valuation method, {{OBA1}} ' +
      'account determination), and a gap in any one layer stops the run.\n\n' +
      'The distinguishing question is: **"What is the difference between a realized and an unrealized ' +
      'exchange rate difference, and how is each handled in accounting?"**',

    gercekHayat:
      'An importer buys EUR 100,000 worth of goods in January. Rate 35.00 → a 3,500,000 TRY payable ' +
      'is posted.\n\n' +
      '**January 31:** the rate is 38.80. The payable is still unpaid. Valuation is run: an ' +
      'additional 388,000 TRY liability appears and a 380,000 TRY foreign exchange loss is posted. ' +
      'But this difference is **unrealized** — the rate could fall back. That is why it is reversed ' +
      'on February 1.\n\n' +
      '**February 15:** the payable is settled, at a rate of 37.20. The real difference: ' +
      '(37.20 − 35.00) × 100,000 = **220,000 TRY loss**. This is **realized** and permanent.\n\n' +
      'The January balance sheet showed a 380,000 TRY loss; the realized amount turned out to be ' +
      '220,000 TRY. Valuation is an estimate; the real figure only becomes clear at payment.',

    muhasebeMantigi:
      'The accounting logic behind an exchange rate difference rests on **two questions**:\n\n' +
      '**1. Has the item been cleared?** If not, the difference is unrealized → it is reversed. If it ' +
      'has, the difference is realized → it is permanent.\n\n' +
      '**2. Did the foreign-currency amount change?** **No.** A EUR 10,000 payable stays EUR 10,000. ' +
      'Only its **local-currency equivalent** changes. This is why a valuation posting is zero on the ' +
      'foreign-currency side; only the local-currency line moves.\n\n' +
      'The critical distinction: valuation **doesn\'t change the open item itself**. The original item ' +
      'keeps standing at 3,500,000 TRY; the difference is held in a separate adjustment posting and ' +
      'reversed the next period.',

    kavramlar: ['kur-farki', 'degerleme', 'kur-tipi', 'paralel-para-birimi', 'donem-sonu',
                'acik-kalem', 'tahakkuk', 'kapatma'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Currency management consists of three separate processes: **feeding exchange rates in** ' +
      '(daily), **translation at the moment of posting** (continuous), and **period-end valuation** ' +
      '(monthly). The first is usually automated, and a break in it goes unnoticed silently.',

    roller:[
      { rol:'IT / Integration', gorev:'Pulls rates from the central bank or a data provider and feeds them into {{TCURR}} (usually a daily automated job).' },
      { rol:'Treasury', gorev:'Monitors currency risk, runs hedging transactions if needed, and validates the feed.' },
      { rol:'Accounting specialist', gorev:'Posts foreign-currency invoices; the rate comes in automatically but can be entered manually if needed.' },
      { rol:'General ledger specialist', gorev:'Runs {{F.05}} / {{FAGL_FC_VAL}} at period end and checks the result.' },
      { rol:'Accounting manager', gorev:'Approves the valuation result; reports the exchange rate impact on profit to management.' },
      { rol:'FI consultant', gorev:'Sets up {{OB59}} valuation methods, {{OBA1}} account determination, and the {{paralel-para-birimi}} structure.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Currency management — from feed to realization',
      adimlar:[
        { ic:'📡', rol:'IT / Treasury', baslik:'Rates are fed in',
          aciklama:'Daily rates from the central bank or a data provider are written into the ' +
                   '{{TCURR}} table ({{OB08}}). Usually scheduled as an automatic job.',
          cikti:'Up-to-date {{TCURR}} records', ok:'a transaction is posted' },
        { ic:'🧾', rol:'Accounting', baslik:'A foreign-currency transaction is posted (translation)',
          aciklama:'A document currency of EUR is entered; the system looks up the rate in ' +
                   '{{TCURR}} and calculates the **local-currency equivalent**. Both amounts are ' +
                   'stored in {{BSEG}}.',
          cikti:'An FI document — foreign-currency + local amount', ok:'period end arrives' },
        { ic:'📅', rol:'General ledger', baslik:'Period-end valuation is run',
          aciklama:'{{F.05}} / {{FAGL_FC_VAL}} — open items and balances are remeasured at the ' +
                   'period-end rate. The difference is **unrealized**.',
          cikti:'A valuation document', ok:'the next period' },
        { ic:'↩', rol:'System', baslik:'The valuation is reversed',
          aciklama:'Usually on the first day of the next period. Because the difference hasn\'t yet ' +
                   'been realized, this is a temporary posting.',
          cikti:'A reversal posting', ok:'the item is cleared' },
        { ic:'💸', rol:'AP / AR', baslik:'Payment or collection is made',
          aciklama:'The item is cleared via {{F110}} or {{F-28}}. The difference between the rate ' +
                   'at clearing and the rate at posting **is realized**.',
          cikti:'A realized exchange rate difference', ok:'a permanent posting' },
        { ic:'📊', rol:'Accounting manager', baslik:'The currency impact is reported',
          aciklama:'The period\'s total exchange rate difference (realized + unrealized) is ' +
                   'presented together with its impact on profit.',
          cikti:'A currency risk report' },
      ],
    },

    adimlar:[
      { rol:'IT', eylem:'Feeds in the rates', sistem:'{{OB08}} → {{TCURR}} — usually automatic' },
      { rol:'Accounting', eylem:'Posts a foreign-currency document', sistem:'{{FB60}}, {{FB70}}, {{MIRO}} — rate automatic' },
      { rol:'General ledger', eylem:'Performs period-end valuation', sistem:'{{F.05}} / {{FAGL_FC_VAL}}' },
      { rol:'System', eylem:'Reverses the valuation', sistem:'Automatic — on the reversal date' },
      { rol:'AP / AR', eylem:'Clears the item', sistem:'{{F110}}, {{F-28}} → a realized difference' },
      { rol:'Accounting manager', eylem:'Reports the currency impact', sistem:'{{FBL3N}} — exchange rate difference accounts' },
    ],

    veriAkisi:{
      nereden:'The {{TCURR}} rate table; foreign-currency open items ({{BSIK}}, {{BSID}}, {{BSIS}}); ' +
              'the {{OB59}} valuation method; {{OBA1}} account determination.',
      nereye:'Into exchange rate difference accounts (646/656) and the adjusted balance sheet items; ' +
             'reversed in the next period.',
      tetikleyen:'The period-end calendar; also, every payment/collection produces a realized difference.',
      sonraki:'Financial statements, currency risk reporting, tax computation.',
    },

    notlar:[
      { tip:'warn', baslik:'The rate feed is a silent point of failure', metin:
        'Rates are usually fed in automatically and nobody checks them daily. If the feed breaks, ' +
        '**no error message appears at all** — that day\'s rate is simply missing from {{TCURR}}.\n\n' +
        'The problem surfaces at closing: {{F.05}} throws an "Exchange rate not found" error and ' +
        'closing stops. A **"are the rates current?"** item should be added to the checklist.\n\n' +
        'A sneakier situation: if a foreign-currency invoice is entered and the rate can\'t be found, ' +
        'the system may use the last available rate — a **posting with the wrong rate** results, and ' +
        'it goes unnoticed.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The key to understanding exchange-rate-difference accounting is this: **the foreign-currency ' +
      'amount never changes; only its local-currency equivalent changes.** Follow this through the ' +
      'examples below.',

    etkilenenHesaplar:[
      { hesap:'320 Payables / 120 Receivables', tur:'Balance sheet', neden:'A foreign-currency payable/receivable. The foreign-currency amount stays fixed; its **local-currency equivalent** changes with valuation.' },
      { hesap:'656 Foreign exchange loss', tur:'Income statement — Expense', neden:'When the rate moves unfavorably. Both realized and unrealized differences can be posted here (separate accounts may also be used).' },
      { hesap:'646 Foreign exchange gain', tur:'Income statement — Income', neden:'When the rate moves favorably.' },
      { hesap:'Valuation adjustment account', tur:'Balance sheet', neden:'Some setups post the valuation difference to a separate adjustment account instead of the reconciliation account — to keep the reconciliation account in agreement with the sub-ledger.' },
      { hesap:'102 Banks (foreign currency)', tur:'Balance sheet — Asset', neden:'Foreign-currency bank accounts are valued too; a balance valuation ({{F.05}} balance option).' },
      { hesap:'646.01 / 656.01 Unrealized exchange rate difference', tur:'Income statement', neden:'The difference arising from valuation, **to be reversed**. Tracking it in a separate sub-account is recommended — it enters the tax base differently.' },
      { hesap:'646.02 / 656.02 Realized exchange rate difference', tur:'Income statement', neden:'The difference that **becomes final** at payment/collection. Permanent; not reversed.' },
      { hesap:'391 Output VAT', tur:'Balance sheet — Liability', neden:'When a **{{kur-farki-faturasi}}** is issued. A liability separate from the accounting posting, and SAP doesn\'t generate it automatically.' },
      { hesap:'159 / 340 Advances', tur:'Balance sheet', neden:'These are **non-monetary** items → because they aren\'t {{parasal-kalem}}, they are **not valued**. They must not be included in the valuation list.' },
      { hesap:'258 Construction in progress', tur:'Balance sheet — Asset', neden:'Exchange rate differences during the investment period **can be added to cost** (see the technical block below).' },
    ],

    fisler:[
      { baslik:'Step 1 — A foreign-currency invoice is posted (translation) · EUR 100,000 @ 35.00',
        belgeTuru:'KR', tarih:'15.01.2027', paraBirimi:'EUR',
        satirlar:[
          { hesap:'153', ad:'Merchandise', borc:3500000, not:'EUR 100,000 × 35.00' },
          { hesap:'320', ad:'Payables — V-9001', alacak:3500000, not:'Foreign currency: EUR 100,000' },
        ],
        not:'{{BSEG}} stores **two amounts**: `WRBTR` = 100,000 (document currency EUR) and ' +
             '`DMBTR` = 3,500,000 (local currency TRY). The rate came in automatically from {{TCURR}}.\n\n' +
             'This is a **translation**, not a valuation. It happens once, at the moment of posting.' },

      { baslik:'Step 2 — Period-end valuation ({{F.05}}) · the 01/31 rate is 38.80',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'656', ad:'Foreign exchange loss (unrealized)', borc:380000, not:'(38.80 − 35.00) × 100,000' },
          { hesap:'320', ad:'Payables — valuation adjustment', alacak:380000, not:'The local-currency liability increased' },
        ],
        not:'**Nothing changed on the foreign-currency side** — the payable is still EUR 100,000. ' +
             'Only the local-currency equivalent changed: 3,500,000 → 3,880,000 TRY.\n\n' +
             'The original item **hasn\'t changed**; the difference is held in a separate adjustment ' +
             'posting. That\'s why the open item in {{BSIK}} still shows 3,500,000 TRY.' },

      { baslik:'Step 3 — The valuation is reversed · 02/01/2027',
        belgeTuru:'SA', tarih:'01.02.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Payables — valuation adjustment', borc:380000, not:'The adjustment was reversed' },
          { hesap:'656', ad:'Foreign exchange loss (unrealized)', alacak:380000 },
        ],
        not:'The difference **had not been realized** — the rate could have fallen back. This is ' +
             'why the valuation is temporary and is automatically reversed on the first day of the ' +
             'next period. February will be valued again from scratch.' },

      { baslik:'Step 4 — Payment is made ({{F110}}) · the 02/15 rate is 37.20 · REALIZATION',
        belgeTuru:'KZ', tarih:'15.02.2027', paraBirimi:'EUR',
        satirlar:[
          { hesap:'320', ad:'Payables — V-9001 (cleared)', borc:3500000, not:'At the posting rate: 100,000 × 35.00' },
          { hesap:'102', ad:'Banks (EUR 100,000 @ 37.20)', alacak:3720000, not:'At the payment-day rate' },
          { hesap:'656', ad:'Foreign exchange loss (realized)', borc:220000, not:'(37.20 − 35.00) × 100,000' },
        ],
        not:'**The foreign-currency side balances:** a EUR 100,000 payable, a EUR 100,000 payment. ' +
             'The difference lies only in local currency and **has been realized** — the item is ' +
             'cleared and the rate is final. This posting **is not reversed**.\n\n' +
             'In January, a 380,000 TRY loss had been estimated; the realized amount turned out to ' +
             'be 220,000 TRY. The 160,000 TRY gap between them was corrected automatically by ' +
             'January\'s reversal.' },

      { baslik:'**{{kur-farki-faturasi}}** — a favorable difference at collection · specific to Turkey',
        belgeTuru:'DR', tarih:'15.02.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Receivables — exchange rate difference invoice', borc:264000, not:'220,000 + VAT' },
          { hesap:'601', ad:'Export sales — exchange rate difference', alacak:220000, not:'The favorable difference' },
          { hesap:'391', ad:'Output VAT (20%)', alacak:44000, not:'**At the original transaction\'s rate**' },
        ],
        not:'**This is a separate documentary obligation from the accounting posting.**\n\n' +
             'In a foreign-currency sale, if the rate rose by the collection date, the seller has ' +
             'received more TRY. This additional amount **is part of the consideration** and is ' +
             'subject to VAT.\n\n' +
             'Who issues it: **whichever side the difference favors**. Rate rose → the seller issues ' +
             'it; rate fell → the buyer issues it.\n\n' +
             '**SAP posts the exchange rate difference automatically but does not generate the ' +
             'exchange rate difference invoice.** This must be tracked as a separate process; ' +
             'skipping it becomes a finding in a VAT audit.\n\n' +
             '*The application details are set by the KDV Genel Uygulama Tebliği (General ' +
             'Communiqué on VAT Application); the current regulation should be confirmed with a tax advisor.*' },

      { baslik:'**Incorrect** — valuing an advance paid',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'Advances paid on orders (foreign currency)', borc:190000, not:'**Should not be done**' },
          { hesap:'646', ad:'Foreign exchange gain', alacak:190000, not:'A gain that doesn\'t really exist' },
        ],
        not:'**This posting is wrong.** An advance paid is **not** a {{parasal-kalem}}: what will be ' +
             'received in return is **goods**, not money.\n\n' +
             'If you paid a vendor a EUR 50,000 advance, whatever the rate does, you will receive ' +
             'EUR 50,000 worth of **goods** — no money comes back. So there is **no** currency risk ' +
             'and no exchange rate difference arises.\n\n' +
             'The advance is recorded **at the rate on the day it was paid** and stays at that value.\n\n' +
             '**The safeguard in SAP:** advance accounts (in the {{F.05}} selection screen and in ' +
             '{{OBA1}}) must **not be included** in the valuation list. If they are, a fake exchange ' +
             'rate difference is generated every period.' },

      { baslik:'Exchange rate difference during the investment period — **added to cost**',
        belgeTuru:'SA', tarih:'30.09.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'258', ad:'Construction in progress', borc:340000, not:'To cost, not to expense' },
          { hesap:'320', ad:'Payables (foreign-currency payable for machinery)', alacak:340000 },
        ],
        not:'The payable for machinery purchased abroad is still unpaid, and the rate has risen.\n\n' +
             'Under VUK practice, exchange rate differences arising **up through the end of the ' +
             'period in which the investment is capitalized** are **added to the asset\'s cost**; ' +
             'adding differences arising in later periods to cost is **optional**.\n\n' +
             'The result: the 340,000 TRY isn\'t expensed; it is spread over the years **through ' +
             'depreciation**.\n\n' +
             '**SAP does not do this automatically.** {{F.05}} posts the difference to account 656; ' +
             'transferring the portion belonging to the investment period into account 258 is done ' +
             '**manually**. It should be included in the period-end checklist.' },

      { baslik:'Alternative — valuing the balance of a foreign-currency bank account',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Banks — EUR account (valuation)', borc:190000, not:'EUR 50,000 × (38.80 − 35.00)' },
          { hesap:'646', ad:'Foreign exchange gain (unrealized)', alacak:190000, not:'Because this is an asset, a rate increase is a **gain**' },
        ],
        not:'Note: the same rate movement produces **a loss on a payable but a gain on an asset**. ' +
             'If the local-currency equivalent of a foreign-currency payable rises, it is a loss; if ' +
             'the local-currency equivalent of a foreign-currency asset rises, it is a gain.\n\n' +
             'That is why a company\'s net currency position (assets − liabilities) determines its ' +
             'currency risk.' },
    ],

    tHesaplar:[
      { hesap:'Payables (foreign currency)', kod:'320',
        borc:[{ ad:'Payment (clearing)', tutar:3500000 }, { ad:'Valuation reversal', tutar:380000 }],
        alacak:[{ ad:'Invoice', tutar:3500000 }, { ad:'Valuation adjustment', tutar:380000 }],
        not:'The valuation is temporary; it is zeroed out by the reversal' },
      { hesap:'Foreign exchange loss', kod:'656 (expense)',
        borc:[{ ad:'January valuation', tutar:380000 }, { ad:'Realized difference', tutar:220000 }],
        alacak:[{ ad:'January reversal', tutar:380000 }],
        not:'Net permanent impact: 220,000 TRY' },
      { hesap:'Foreign exchange gain', kod:'646 (income)',
        borc:[{ ad:'Reversal', tutar:190000 }],
        alacak:[{ ad:'Bank balance valuation', tutar:190000 }],
        not:'Unrealized — reversed' },
    ],

    notlar:[
      { tip:'tip', baslik:'Why is a valuation reversed?', metin:
        'A valuation is an **estimate**: "if we measure at today\'s rate, this is where things ' +
        'stand." But because the item hasn\'t been cleared, this difference is unrealized; the rate ' +
        'could move back the next day.\n\n' +
        'If it isn\'t reversed, two problems arise: **(1)** valuation is performed month after month ' +
        'and the difference accumulates redundantly, **(2)** when the item is finally paid and the ' +
        'real difference is computed, the valuation posting is still sitting there and gets ' +
        'double-counted.\n\n' +
        'Some valuation methods work on a **delta basis** without a reversal (posting only the ' +
        'change). This is also a valid approach and is selected in {{OB59}}.' },
      { tip:'warn', baslik:'The lowest-value valuation principle', metin:
        'Some regulations require **prudence**: an unrealized **loss** is posted, but an unrealized ' +
        '**gain** is not.\n\n' +
        'That is, if the local-currency equivalent of a foreign-currency payable has risen, a loss ' +
        'is posted; if it has fallen, no gain is posted. In {{OB59}} this is selected as the ' +
        '"lowest value principle" valuation approach.\n\n' +
        'IFRS, on the other hand, generally uses the **always valuate** principle — both gains and ' +
        'losses are posted. This is why the same company can use a different valuation method in ' +
        'different ledgers.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Variation in the currency topic occurs along four axes: **exchange rate type**, **valuation ' +
      'scope**, **valuation principle**, and **the status of the difference**.',

    liste:[
      { ad:'Average Rate',
        aciklama:'The standard {{kur-tipi}}. Used to translate daily transactions and in most valuations.',
        neZaman:'The default. Used in invoice posting, valuation, and reporting.',
        ornek:'Rows in {{TCURR}} where `KURST` = M.' },

      { ad:'Bank Buying / Selling Rate',
        aciklama:'The bank\'s buying (B) and selling (G) rates. Gives a more accurate result for actual cash transactions.',
        neZaman:'Currency buying/selling, bank transactions; some regulations require it for specific items.',
        ornek:'The buying rate may be used for a foreign-currency collection, and the selling rate for a foreign-currency payment.' },

      { ad:'Open Item Valuation',
        aciklama:'Vendor and customer open items are valued individually. Each item\'s own posting ' +
                 'rate is compared against the period-end rate.',
        neZaman:'For foreign-currency AP and AR items — the most common use.',
        ornek:'The "vendor open items" and "customer open items" options in {{F.05}}.',
        tcodes:['F.05','FAGL_FC_VAL'] },

      { ad:'Balance Valuation',
        aciklama:'The **balance** of foreign-currency G/L accounts is valued, not item-by-item.',
        neZaman:'Foreign-currency bank accounts, foreign-currency cash. These accounts have no open item management.',
        ornek:'A EUR bank account\'s balance of EUR 50,000 is valued at the period-end rate.',
        tcodes:['F.05'] },

      { ad:'Lowest Value Principle',
        aciklama:'The prudence principle: an unrealized **loss** is posted, an unrealized **gain** is not.',
        neZaman:'Where local regulation requires prudence (commercial accounting in many countries, Turkey included).',
        ornek:'Selected as the valuation principle in {{OB59}}.',
        tcodes:['OB59'] },

      { ad:'Always Valuate',
        aciklama:'Both gains and losses are posted. A symmetric, more "realistic" approach.',
        neZaman:'Common under IFRS and in group reporting.',
        ornek:'If {{paralel-defter}} is in use, this principle in the IFRS ledger and the lowest-value principle in the local ledger.',
        tcodes:['OB59'] },

      { ad:'Unrealized Exchange Difference',
        aciklama:'The item hasn\'t been cleared yet; the difference is purely a valuation result. **It is reversed.**',
        neZaman:'At period-end valuation.',
        ornek:'A 380,000 TRY loss on January 31 → reversed on February 1.' },

      { ad:'Realized Exchange Difference',
        aciklama:'The item has been paid/collected; the difference is final. **It is permanent.**',
        neZaman:'At the moment of payment, collection, or clearing.',
        ornek:'Payment on February 15 → a 220,000 TRY loss, permanent.',
        tcodes:['F110','F-28','OBA1'] },
    ],

    karsilastirmaBasliklar:['Unrealized', 'Realized'],
    karsilastirma:[
      ['When it arises', 'At period-end **valuation**', 'When the item **is cleared** (payment/collection)'],
      ['Item status', 'Still open', 'Cleared'],
      ['Permanent?', '**No** — reversed', '**Yes** — permanent'],
      ['Account key', 'KDF', 'KDB'],
      ['Tax effect', 'Usually not taxable (depends on regulation)', 'Taxable'],
      ['Transaction', '{{F.05}} / {{FAGL_FC_VAL}}', '{{F110}}, {{F-28}}, clearing transactions'],
      ['Purpose', 'Bringing the balance sheet closer to reality', 'Recording the real outcome'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'OB08', ad:'Enter exchange rates',
        amac:'Writes rates into the {{TCURR}} table by {{kur-tipi}} + currency pair + date.',
        neZaman:'When the automatic feed breaks; when a missing rate is found before closing.',
        adimlar:[
          { baslik:'Choose the exchange rate type', aciklama:'**M** average (standard), **B** buying, **G** selling.' },
          { baslik:'Enter the validity date',
            aciklama:'The rate is valid from that date onward. The system uses the **nearest preceding** rate relative to the transaction date.' },
          { baslik:'Enter the currency pair and the rate',
            aciklama:'E.g. EUR → TRY, rate 38.80. Watch the quotation direction: some pairs need a multiplier/divisor setting.' },
        ],
        alanlar:{
          zorunlu:['Exchange rate type','Validity date','Source currency','Target currency','Rate'],
          opsiyonel:['Multiplier/divisor ratio'] },
        hatalar:[
          { mesaj:'Exchange rate ... is not maintained', sebep:'No rate exists for that date and rate type.', cozum:'Enter the rate. If there is an automatic feed, investigate why it broke.' },
          { mesaj:'Ratio for currency conversion is missing', sebep:'No multiplier/divisor definition exists for the currency pair (TCURF).', cozum:'IMG → define the currency conversion ratios. Needed for high-inflation currencies.' },
        ],
        ipucu:'The system uses the rate that is **equal to, or the nearest preceding,** the ' +
              'transaction date. So if no rate is entered for January 31, the January 28 rate is ' +
              'used and **no error is raised**. This is the silent cause of postings with the wrong ' +
              'rate — the feed must be checked regularly.',
        ilgili:['TCURR','TCURV','F.05','OB59'] },

      { kod:'F.05', ad:'Foreign currency valuation',
        amac:'Remeasures foreign-currency open items and balances at the period-end rate; generates the difference posting.',
        neZaman:'At every month-end close, **after** all foreign-currency transactions have been posted.',
        adimlar:[
          { baslik:'Enter the company code and valuation key date',
            aciklama:'Usually the last day of the month. The rate for this date is used.' },
          { baslik:'Choose the **valuation method**',
            aciklama:'Defined in {{OB59}}: which {{kur-tipi}}, which principle (lowest-value / ' +
                     'always), and whether it will be reversed. The method choice determines the entire result.' },
          { baslik:'Mark the item types to be valued',
            aciklama:'**G/L balances** (foreign-currency bank/cash), **vendor open items**, ' +
                     '**customer open items** — each selected separately.' },
          { baslik:'Enter the reversal date', aciklama:'Usually the first day of the next period.' },
          { baslik:'Run in **test mode first**',
            aciklama:'Valuation generates a large number of documents; don\'t run in production mode without seeing the result first.' },
          { baslik:'Review the result and run in production mode',
            aciklama:'Compare the total exchange rate difference against the previous month; if there\'s a large deviation, check the rate.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Company code 1000 · Key date 01/31/2027 · Valuation method Z001' },
          { ekran:'Selection', islem:'Vendor open items ✓ · Customer open items ✓ · G/L balances ✓' },
          { ekran:'Posting parameters', islem:'Reversal date 02/01/2027 · **Test mode ✓**' },
          { ekran:'Result', islem:'218 items valued · net loss 142,000 TRY' },
        ],
        alanlar:{
          zorunlu:['Company code','Valuation key date','Valuation method','Item type selection'],
          opsiyonel:['Reversal date','Test mode','Account/business partner range','Document type'] },
        hatalar:[
          { mesaj:'Exchange rate for EUR/TRY on 31.01.2027 not found', sebep:'No rate exists in {{TCURR}} for that date.', cozum:'Enter the rate with {{OB08}}; investigate why the automatic feed broke.' },
          { mesaj:'Account determination for KDF not possible', sebep:'The unrealized exchange rate difference account is not defined in {{OBA1}}.', cozum:'{{OBA1}} → the KDF account key → define gain/loss accounts for the relevant reconciliation account.' },
          { mesaj:'Valuation method ... does not exist', sebep:'The method is not defined in {{OB59}}.', cozum:'Define the valuation method: rate type, principle, reversal setting.' },
          { mesaj:'Posting period is not open', sebep:'The period for the valuation or reversal date is closed.', cozum:'Open it with {{OB52}}. If the reversal date falls in the next period, that period doesn\'t need to be open either — the posting still goes through.' },
        ],
        ipucu:'{{F.05}} must be run **after all foreign-currency transactions have been posted**. ' +
              'A foreign-currency invoice that arrives later stays unvalued and closing has to be ' +
              'repeated. Place it in the checklist **after** invoices and **before** the financial statements.',
        ilgili:['FAGL_FC_VAL','OB59','OBA1','OB08'] },

      { kod:'OB59', ad:'Define valuation method',
        amac:'Determines how the valuation is performed: rate type, principle, reversal behavior.',
        neZaman:'During setup; whenever different ledgers or regulations need different methods.',
        adimlar:[
          { baslik:'Enter the method key and description' },
          { baslik:'Choose the **valuation principle**',
            aciklama:'**Lowest value** (only losses are posted — prudence), **only increase**, or ' +
                     '**always valuate** (gains and losses — IFRS).' },
          { baslik:'Set the {{kur-tipi}}', aciklama:'Usually M (average). B/G if a buying/selling rate is needed.' },
          { baslik:'Choose the reversal behavior',
            aciklama:'Whether the valuation posting will be reversed next period, or whether it will work on a **delta basis** instead.' },
        ],
        ipucu:'If {{paralel-defter}} is in use, **a separate method is defined for each ledger**: ' +
              '"lowest value" (prudence) in the local ledger, "always valuate" in the IFRS ledger. ' +
              'The same item produces a different exchange rate difference in the two ledgers — this ' +
              'is correct, not a mistake.',
        hatalar:[
          { mesaj:'Valuation procedure not consistent', sebep:'The principle and the reversal setting are inconsistent.', cozum:'Lowest-value valuation usually requires a reversal; review the settings.' },
        ],
        ilgili:['F.05','OBA1','FAGL_FC_VAL'] },

      { kod:'OBA1', ad:'Exchange rate difference account determination',
        amac:'Defines which G/L accounts realized and unrealized exchange rate differences are posted to.',
        neZaman:'During setup, and in the "Account determination for KDF not possible" error.',
        adimlar:[
          { baslik:'Choose the account key',
            aciklama:'**KDF** — unrealized exchange rate difference (valuation). **KDB** — ' +
                     'realized exchange rate difference (at clearing). **KDW** — the valuation ' +
                     'adjustment account (in some setups).' },
          { baslik:'Enter the company code and the reconciliation account',
            aciklama:'A separate definition can be made for each reconciliation account: a ' +
                     'different exchange rate difference account for 320 payables than for 120 receivables.' },
          { baslik:'Enter the gain and loss accounts separately',
            aciklama:'If the rate moves favorably, the gain account (646); if unfavorably, the loss account (656).' },
          { baslik:'Enter a balance sheet adjustment account if needed',
            aciklama:'If the valuation difference isn\'t meant to be posted to the reconciliation account, a separate adjustment account is used.' },
        ],
        ipucu:'**Not posting the valuation difference to the reconciliation account** is a common ' +
              'choice: if it is posted there, account 320\'s balance and the {{FBL1N}} sub-ledger ' +
              'total **won\'t agree**, and the reconciliation check breaks. A separate adjustment ' +
              'account solves this.',
        hatalar:[
          { mesaj:'Account determination for entry ... KDF not possible', sebep:'No definition exists for the relevant reconciliation account.', cozum:'{{OBA1}} → KDF → enter the gain/loss accounts for that reconciliation account.' },
        ],
        ilgili:['F.05','OB59','FAGL_FC_VAL'] },

      { kod:'FAGL_FC_VAL', ad:'Foreign currency valuation (new General Ledger)',
        amac:'The ledger-based version of {{F.05}}. Used in systems where {{paralel-defter}} is in place.',
        neZaman:'In New G/L or S/4HANA; whenever there is more than one ledger.',
        adimlar:[
          { baslik:'Choose the company code, key date, and **ledger**',
            aciklama:'Each ledger can use its own valuation method: the local ledger prudent, the IFRS ledger symmetric.' },
          { baslik:'Enter the valuation area and method' },
          { baslik:'Run in test mode, then production' },
        ],
        ipucu:'If there is a parallel ledger, valuation **must be run separately for each ledger**. ' +
              'Valuing only the leading ledger leaves the IFRS balance sheet incomplete.',
        ilgili:['F.05','OB59','paralel-defter'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'The currency topic has two tables of its own: {{TCURR}} (rates) and {{TCURV}} (rate types). ' +
      'Valuation postings go into the normal FI tables; foreign-currency amounts are stored in ' +
      '{{BSEG}} in **parallel fields**.',

    liste:[
      { ad:'TCURR', baslik:'Exchange rate table',
        tutar:'Rates by {{kur-tipi}} + source currency + target currency + date.',
        olusturan:'{{OB08}} or an automatic feed program',
        guncelleyen:'{{OB08}}, a daily feed job',
        anahtar:'KURST + FCURR + TCURR + GDATU',
        iliskiler:'{{TCURV}} holds the rate types, TCURF the multiplier/divisor ratios.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KURST', aciklama:'{{kur-tipi}}: M average, B buying, G selling' },
          { ad:'GDATU', aciklama:'Validity date — **stored in inverted format** (99999999 − the date)' },
          { ad:'UKURS', aciklama:'The rate value' },
          { ad:'FFACT / TFACT', aciklama:'Multiplier/divisor — used for high-value currencies' },
        ] },

      { ad:'TCURV', baslik:'Exchange rate type definition',
        tutar:'The definition and behavior of rate types (M, B, G): whether it\'s a fixed rate, whether it\'s an inverted quotation.',
        olusturan:'IMG configuration',
        guncelleyen:'IMG',
        anahtar:'KURST',
        s4:'Unchanged.' },

      { ad:'BSEG', baslik:'Document line items — multi-currency amounts',
        tutar:'Every item is stored in **more than one currency**: the document currency, local ' +
              'currency, and any {{paralel-para-birimi}}s.',
        olusturan:'Every transaction that produces an FI document',
        guncelleyen:'Posting transactions',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        s4:'In S/4HANA, {{ACDOCA}} supports **up to 10** parallel currencies (3 in ECC).',
        alanlar:[
          { ad:'WRBTR', aciklama:'**Document currency** amount (e.g. EUR 100,000)' },
          { ad:'DMBTR', aciklama:'**Local currency** (company code currency) amount — the result of translation' },
          { ad:'DMBE2 / DMBE3', aciklama:'The 2nd and 3rd parallel-currency amounts (group currency, etc.)' },
          { ad:'KURSF', aciklama:'The rate used — stored in the document' },
        ] },

      { ad:'BKPF', baslik:'Document header — currency and rate',
        tutar:'The document\'s currency, the rate used, and the rate date.',
        olusturan:'Every transaction that produces an FI document',
        guncelleyen:'Posting transactions',
        s4:'Unchanged.',
        alanlar:[
          { ad:'WAERS', aciklama:'Document currency' },
          { ad:'KURSF', aciklama:'The rate — if not entered manually, comes from {{TCURR}}' },
          { ad:'WWERT', aciklama:'**Rate date** — which date\'s rate to use. If blank, the document date is used.' },
        ] },

      { ad:'ACDOCA', baslik:'Universal Journal — multi-currency',
        tutar:'Items together with their ledger and currency dimensions.',
        olusturan:'Every transaction posted to accounting',
        guncelleyen:'FI/CO transactions',
        s4:'**Up to 10 parallel currencies** — beyond ECC\'s limit of 3. Valuation can be computed ' +
            'separately for each ledger and each currency.',
        alanlar:[
          { ad:'HSL', aciklama:'Company code currency amount' },
          { ad:'WSL', aciklama:'Document currency amount' },
          { ad:'KSL', aciklama:'Group currency amount' },
          { ad:'OSL', aciklama:'Additional currency amount' },
        ] },

      { ad:'BSIK', baslik:'Vendor open items — a valuation target',
        tutar:'Foreign-currency open items; {{F.05}} scans these.',
        olusturan:'Postings made to a vendor',
        guncelleyen:'Valuation **doesn\'t change** the item itself; it produces a separate adjustment posting',
        s4:'{{uyumluluk-view}}.' },
    ],

    er:{
      type:'er',
      baslik:'Currency structure and document relationships',
      varliklar:[
        { ad:'TCURV', rol:'Configuration', aciklama:'Rate types',
          alanlar:[{ ad:'KURST', tip:'pk' }, { ad:'XINVR' }] },
        { ad:'TCURR', rol:'Rate data', hub:true, aciklama:'Rates',
          alanlar:[{ ad:'KURST', tip:'fk' }, { ad:'FCURR', tip:'pk' }, { ad:'TCURR', tip:'pk' }, { ad:'GDATU', tip:'pk' }, { ad:'UKURS' }] },
        { ad:'BKPF', rol:'Header', aciklama:'Document currency and rate',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'WAERS' }, { ad:'KURSF' }, { ad:'WWERT' }] },
        { ad:'BSEG', rol:'Line item', aciklama:'Multi-currency amounts',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'WRBTR' }, { ad:'DMBTR' }, { ad:'DMBE2' }] },
        { ad:'BSIK', rol:'Index', aciklama:'Foreign-currency open items',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'WAERS' }] },
        { ad:'ACDOCA', rol:'Universal', aciklama:'Up to 10 currencies',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HSL' }, { ad:'WSL' }, { ad:'KSL' }] },
        { ad:'T001', rol:'Configuration', aciklama:'Company code currency',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'WAERS' }] },
      ],
      iliskiler:[
        { from:'TCURV', to:'TCURR', alanlar:'KURST', not:'rate type definition' },
        { from:'TCURR', to:'BKPF', alanlar:'rate lookup', not:'translation at posting time' },
        { from:'T001', to:'BKPF', alanlar:'BUKRS → WAERS', not:'local currency' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'header → line item' },
        { from:'BSEG', to:'BSIK', alanlar:'BELNR + BUZEI', not:'foreign-currency open item' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR', not:'the multi-currency universal view' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Three screens are critical in the currency topic: **{{OB08}}** (rate entry), **{{F.05}}** ' +
      '(valuation), and **{{OBA1}}** (account determination). All three can be a source of errors at closing.',

    ekranlar:[
      { ad:'{{OB08}} — the rate entry screen',
        aciklama:'Looks simple but has two traps: the validity-date logic and the quotation direction.',
        alanlar:[
          { ad:'{{kur-tipi}}', zorunlu:true, aciklama:'M average (standard), B buying, G selling. The valuation method specifies which one to use.' },
          { ad:'Validity date', zorunlu:true, aciklama:'**The rate is valid from that date onward.** The system uses the rate that is equal to, or the **nearest preceding**, the transaction date.' },
          { ad:'Source / target currency', zorunlu:true, aciklama:'Direction matters: EUR→TRY and TRY→EUR are different rows.' },
          { ad:'Rate', zorunlu:true, aciklama:'If a multiplier/divisor ratio is defined, the displayed value can be interpreted differently.' },
        ],
        ipucu:'**The sneakiest behavior:** if the January 31 rate isn\'t entered, the system ' +
              'doesn\'t raise an error — it uses the January 28 rate. That means a posting happens ' +
              'with the wrong rate and nobody notices. This is why the rate feed must be checked regularly.' },

      { ad:'{{F.05}} — the valuation screen',
        aciklama:'The program that generates the most documents at closing. Test mode is indispensable.',
        alanlar:[
          { ad:'Valuation key date', zorunlu:true, aciklama:'Usually the last day of the month. The rate for this date is used.' },
          { ad:'**Valuation method**', zorunlu:true, aciklama:'Defined in {{OB59}}. Fully determines the result: the principle, the rate type, the reversal.' },
          { ad:'Item type selection', zorunlu:true, aciklama:'G/L balances · vendor open items · customer open items — checked individually.' },
          { ad:'Reversal date', zorunlu:false, aciklama:'Usually the first day of the next period.' },
          { ad:'Test mode', zorunlu:false, aciklama:'**Always first.** The program can generate hundreds of documents.' },
          { ad:'Document type', zorunlu:false, aciklama:'Using a separate type for valuation documents makes it easier to tell them apart later.' },
        ],
        ipucu:'Compare the total exchange rate difference from the test run **against the previous ' +
              'month**. If there\'s a large deviation, there are two possibilities: the rate ' +
              'genuinely moved a lot, or {{TCURR}} has a wrong or missing rate.' },

      { ad:'{{OBA1}} — exchange rate difference account determination',
        aciklama:'Defines which difference goes to which account. If missing, valuation stops.',
        alanlar:[
          { ad:'Account key', zorunlu:true, aciklama:'**KDF** unrealized (valuation), **KDB** realized (clearing).' },
          { ad:'Company code + reconciliation account', zorunlu:true, aciklama:'A separate definition can be made for each reconciliation account.' },
          { ad:'Gain account / Loss account', zorunlu:true, aciklama:'The gain account (646) if the rate is favorable, the loss account (656) if unfavorable.' },
          { ad:'Balance sheet adjustment account', zorunlu:false, aciklama:'The account the valuation difference is posted to instead of the reconciliation account.' },
        ],
        ipucu:'**Use a balance sheet adjustment account.** If the valuation difference is posted ' +
              'directly to account 320, the G/L balance and the {{FBL1N}} sub-ledger total ' +
              '**won\'t agree**, and the reconciliation check breaks permanently.' },
    ],

    zorunlu:['Exchange rate type','Validity date','Currency pair','Rate','Valuation key date','Valuation method','Exchange rate difference accounts'],
    opsiyonel:['Reversal date','Test mode','Document type','Balance sheet adjustment account','Multiplier/divisor ratio'],

    hatalar:[
      { mesaj:'Exchange rate for EUR/TRY on 31.01.2027 not found', sebep:'No rate exists in {{TCURR}} for that date — the automatic feed may have broken.', cozum:'Enter it with {{OB08}}; check the feed job. Add a "are the rates current?" item to the checklist.' },
      { mesaj:'Account determination for entry ... KDF not possible', sebep:'The unrealized exchange rate difference account is not defined in {{OBA1}}.', cozum:'{{OBA1}} → KDF → enter the gain/loss accounts for the relevant reconciliation account.' },
      { mesaj:'Account determination for entry ... KDB not possible', sebep:'The realized exchange rate difference account is not defined — this occurs during payment.', cozum:'Complete the {{OBA1}} → KDB definition.' },
      { mesaj:'Valuation method ... does not exist', sebep:'The method doesn\'t exist in {{OB59}}.', cozum:'Define the valuation method.' },
      { mesaj:'Ratio for currency conversion is missing (TCURF)', sebep:'The multiplier/divisor ratio is undefined for the currency pair.', cozum:'IMG → define the currency conversion ratios.' },
      { mesaj:'Valuation area ... not assigned to ledger', sebep:'The valuation area isn\'t mapped to a ledger in {{FAGL_FC_VAL}}.', cozum:'IMG → make the valuation area-to-ledger assignment. Common in {{paralel-defter}} setups.' },
      { mesaj:'Document currency and local currency are identical', sebep:'There is no foreign-currency item to value — the document is already in local currency.', cozum:'This is a warning; check the selection criteria.' },
    ],

    ipuclari:[
      'Run {{F.05}} **after all foreign-currency transactions have been posted**. An invoice that ' +
      'arrives later stays unvalued and closing has to be repeated.',
      'Compare the total exchange rate difference from the test run against last month; any ' +
      'deviation should be explainable.',
      'Post the valuation difference to a **balance sheet adjustment account**, not the ' +
      'reconciliation account — so the sub-ledger reconciliation isn\'t broken.',
      'Use a **separate document type** for valuation documents; you can then see with a report ' +
      'which ones will be reversed at month end.',
      'Add the rate feed as an item on the closing checklist. A break is silent, and the system ' +
      'doesn\'t even raise an error, since it just uses the old rate.',
      'If {{paralel-defter}} is in use, run {{FAGL_FC_VAL}} **for each ledger**; each ledger can ' +
      'have its own valuation method.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'TCURR', ne:'Rate records — {{OB08}} or an automatic feed' },
      { tablo:'BKPF', ne:'The valuation document header; the rate used and the rate date' },
      { tablo:'BSEG', ne:'Valuation difference line items; multi-currency amounts on foreign-currency items' },
      { tablo:'ACDOCA', ne:'Universal items; up to 10 parallel currencies' },
      { tablo:'BSIK / BSID', ne:'Open items are scanned but **not changed** — the difference is in a separate posting' },
    ],

    commit:
      'Valuation is **a batch program**, and each document is written in its own LUW. Even if the ' +
      'run is interrupted midway, the documents already generated are permanent.\n\n' +
      'This is why, when {{F.05}} is run again, it **takes the previous valuation into account**: ' +
      'if it\'s run a second time for the same period, it either posts a delta or reverses the ' +
      'previous posting and writes a new one (depending on the valuation method). No duplicate ' +
      'valuation results.',

    belgeNo:
      'Valuation documents draw their number from their own document type\'s range — usually **SA** ' +
      'or a custom type (e.g. **ZV**). Using a separate type makes it easier to distinguish ' +
      'valuation documents in a report at month end.',

    postingLogic:
      'The decision chain of valuation:\n\n' +
      '**1. Item selection:** foreign-currency open items and foreign-currency G/L balances are scanned.\n' +
      '**2. The current rate is read:** from {{TCURR}}, using the {{kur-tipi}} the valuation method ' +
      'specifies, the rate equal to, or nearest preceding, the key date.\n' +
      '**3. The difference is calculated:** (current rate × foreign-currency amount) − the existing ' +
      'local-currency amount.\n' +
      '**4. The valuation principle is applied:** with the lowest-value principle only a loss is ' +
      'posted; with always-valuate a gain is posted too.\n' +
      '**5. The account is determined:** {{OBA1}} → the KDF key → the gain or loss account + the ' +
      'balance sheet adjustment account.\n' +
      '**6. The posting is made** and the reversal date is marked.\n\n' +
      'A realized difference, on the other hand, is calculated **at clearing**: the difference ' +
      'between the clearing rate and the posting rate is posted to the account under the KDB key.',

    belgeTuru:
      'Defining a separate document type for valuation is good practice. This type is defined in ' +
      '{{OBA7}} and is usually specified as its own reversal type.',

    numberRange:
      'The valuation document type\'s number range must also be opened for each fiscal year. In ' +
      'high-volume setups, valuation can generate hundreds of documents — the range should be kept wide.',

    accountDetermination:
      '{{OBA1}} is the center of exchange rate difference account determination. The keys:\n\n' +
      '**KDF** — unrealized exchange rate difference (valuation). Input: company code + ' +
      'reconciliation account + currency (optional). Output: gain account, loss account, balance ' +
      'sheet adjustment account.\n\n' +
      '**KDB** — realized exchange rate difference (at clearing). Same structure.\n\n' +
      '**KDW / KDV** — additional adjustment keys used in some setups.\n\n' +
      'A separate definition can be made for each reconciliation account: vendor exchange rate ' +
      'differences and customer exchange rate differences can be tracked in separate accounts.',

    tur:
      '**Configuration:** {{kur-tipi}} definitions ({{TCURV}}), multiplier/divisor ratios (TCURF), ' +
      '{{OB59}} valuation methods, {{OBA1}} account determination, the {{paralel-para-birimi}} structure.\n\n' +
      '**Arguably master data:** the rates themselves ({{TCURR}}) — technically a configuration ' +
      'table, but data that changes daily and is usually fed in automatically.\n\n' +
      '**Transaction data:** the valuation documents.',

    transport:
      'Rate types, conversion ratios, valuation methods, and account determination **transport**.\n\n' +
      '**The rates themselves ({{TCURR}}) do not transport** — each system feeds them in ' +
      'separately. This makes sense: a test system doesn\'t need current rates. But at go-live, ' +
      'the rate feed **must** already be set up; otherwise the first foreign-currency transaction throws an error.',

    img:[
      { yol:'SPRO → SAP NetWeaver → General Settings → Currencies → Check Exchange Rate Types', not:'{{TCURV}} — the M/B/G definitions' },
      { yol:'SPRO → SAP NetWeaver → General Settings → Currencies → Define Translation Ratios', not:'TCURF — multiplier/divisor' },
      { yol:'SPRO → SAP NetWeaver → General Settings → Currencies → Enter Exchange Rates', not:'{{OB08}} → {{TCURR}}' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Closing → Valuate → Foreign Currency Valuation → Define Valuation Methods', not:'{{OB59}}' },
      { yol:'SPRO → … → Closing → Valuate → Foreign Currency Valuation → Prepare Automatic Postings for Foreign Currency Valuation', not:'{{OBA1}} — KDF/KDB' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Company Code → Parallel Currencies', not:'The {{paralel-para-birimi}} structure' },
    ],

    ekstra:[
      { ic:'💰', baslik:'The exchange rate difference accounts — which difference goes where?', metin:
        '**The basic pair (Turkish Uniform Chart of Accounts):**\n\n' +
        '`646` **Foreign exchange gains** — the rate moved favorably\n' +
        '`656` **Foreign exchange losses** — the rate moved unfavorably\n\n' +
        'The foreign-currency amount **never changes**; only its local-currency equivalent does. ' +
        'The EUR 100,000 in account 320 stays EUR 100,000 no matter what the rate does.\n\n' +
        '---\n\n' +
        '**Why is a sub-account split recommended?**\n\n' +
        '`646.01 / 656.01` **unrealized** — arises from {{F.05}} valuation, **reversed the next day**\n' +
        '`646.02 / 656.02` **realized** — becomes final at payment/collection, **permanent**\n\n' +
        'The split serves two purposes:\n\n' +
        '**1. Tax base.** An unrealized difference is a temporary valuation result; the tax advisor ' +
        'needs to be able to see it separately.\n\n' +
        '**2. Control.** At the start of a period, the unrealized accounts should be **zeroed out** ' +
        '(if the reversal has run). If they aren\'t zero, the reversal was skipped — a simple, ' +
        'effective item for the period-end checklist.\n\n' +
        '---\n\n' +
        '**How are the accounts wired up on the SAP side?**\n\n' +
        '{{OBA1}} uses two keys:\n\n' +
        '**KDF** — open item valuation (vendors, customers, foreign-currency loans)\n' +
        '**KDB** — balance valuation (foreign-currency bank accounts)\n\n' +
        'Each key has a **gain account**, a **loss account**, and, if needed, a **balance sheet ' +
        'adjustment account** defined separately.\n\n' +
        'Why does an adjustment account exist? Posting the valuation difference directly to account ' +
        '320 would create a gap between the {{mutabakat-hesabi}} and the vendor sub-ledger. ' +
        'Instead, a separate adjustment account is used, and it is shown together with 320 on the balance sheet.' },

      { ic:'⚖️', baslik:'Which items get valued? — the monetary / non-monetary distinction', metin:
        '**The most common exchange-rate-difference mistake is valuing the wrong item.**\n\n' +
        '**Valued — {{parasal-kalem}}s:**\n\n' +
        '`102` foreign-currency bank · `320` payables · `120` receivables · `300/400` loans · ' +
        '`121/321` notes\n\n' +
        'The common trait: a **specific amount of money** will be received or paid in return. When ' +
        'the rate changes, the TRY equivalent of the receivable/payable changes → **a real currency risk exists**.\n\n' +
        '**Not valued — non-monetary items:**\n\n' +
        '`153` inventory · `253` fixed assets · `159` advances paid · `340` advances received\n\n' +
        'The common trait: **goods or services** will be received/given in return, not money.\n\n' +
        '---\n\n' +
        '**Why isn\'t an advance valued? — the key point of the concept**\n\n' +
        'You paid a vendor a EUR 50,000 advance. The rate rose from 35 to 40. Did you make a gain?\n\n' +
        '**No.** Because you won\'t get **money** back — you\'ll get EUR 50,000 worth of **goods**. ' +
        'As long as the goods\' foreign-currency price hasn\'t changed, your position hasn\'t changed.\n\n' +
        'If you value the advance, you create **a gain that doesn\'t really exist**; once the goods ' +
        'arrive, this gain is reversed and two periods end up wrong at once.\n\n' +
        'The same logic applies to inventory and fixed assets: a machine bought for EUR 100,000 is ' +
        'converted to TRY at the rate on the day it was acquired and **stays at that value**. The ' +
        'machine\'s book value doesn\'t rise just because the rate rose.\n\n' +
        '**The safeguard in SAP:** the accounts subject to valuation are listed in the {{F.05}} ' +
        'selection screen and in the {{OBA1}} configuration. **Advance accounts must not be placed ' +
        'on this list.** If they are, a fake exchange rate difference is generated every period, ' +
        'and the mistake is only caught years later.' },

      { ic:'🧾', baslik:'The exchange rate difference invoice — what SAP doesn\'t do but regulation requires', metin:
        '**A Turkey-specific obligation that is often overlooked.**\n\n' +
        'In accounting, the exchange rate difference is already posted to accounts `646`/`656`. ' +
        'But from a VAT perspective there\'s a separate question: *"did the consideration itself change?"*\n\n' +
        'In a sale indexed to or denominated in foreign currency, if the rate rose by the collection ' +
        'date, the seller has collected **more TRY**. This extra amount is part of the ' +
        'consideration and **is subject to VAT**.\n\n' +
        '**Who issues it:** whichever side the difference favors.\n\n' +
        '• Rate **rose** → favors the seller → the **seller** issues it\n' +
        '• Rate **fell** → favors the buyer → the **buyer** issues it\n\n' +
        '**The VAT rate** is the same rate applied to the original transaction.\n\n' +
        '---\n\n' +
        '**The critical point from a consulting perspective**\n\n' +
        '{{F110}} makes the payment, SAP posts the exchange rate difference to `656`, and the ' +
        'accounting entry is **complete**. But the exchange rate difference invoice **has not been ' +
        'issued** — because SAP doesn\'t generate it.\n\n' +
        'The result: the accounting is correct, **the VAT is missing**. The gap only surfaces during an audit.\n\n' +
        '**The safeguard:** a report listing the favorable exchange rate differences arising on ' +
        'collections from foreign-currency sales should be set up and reviewed monthly. Exchange ' +
        'rate difference items can be filtered and tracked manually in {{FBL5N}}.\n\n' +
        '*The application details are set by the KDV Genel Uygulama Tebliği (General Communiqué on ' +
        'VAT Application); the current regulation should be confirmed with a tax advisor.*' },

      { ic:'🏗️', baslik:'Exchange rate difference during the investment period — expense or cost?', metin:
        'A machine was purchased from abroad for EUR 2,000,000, the payable is still unpaid, and the ' +
        'rate has risen. Is the resulting exchange rate difference **expensed, or added to the ' +
        'machine\'s cost?**\n\n' +
        '**Under VUK practice:** exchange rate differences arising **up through the end of the ' +
        'period in which the investment is capitalized** are **added to the asset\'s cost**. ' +
        'Adding differences arising in later periods to cost is **optional** — they can also be expensed.\n\n' +
        '**Why it matters:**\n\n' +
        'If added to cost → the 340,000 TRY isn\'t expensed; it is spread over the years **through ' +
        'depreciation**. That year\'s profit looks higher, later years\' profit lower.\n\n' +
        'If expensed → the full amount becomes an expense that year.\n\n' +
        'Either can be compliant, but the **results differ**, and the choice must be applied consistently.\n\n' +
        '---\n\n' +
        '**SAP doesn\'t separate this automatically.**\n\n' +
        '{{F.05}} values every open item and posts the difference to `656` — it **doesn\'t ' +
        'distinguish** an investment-related payable from an ordinary trade payable.\n\n' +
        'Transferring the portion belonging to the investment period into the {{yatirim-devam}} ' +
        'account (258) is done **manually**. It should be placed on the period-end checklist:\n\n' +
        '*"Is there a foreign-currency investment payable? If so, has this period\'s exchange rate ' +
        'difference been transferred to account 258?"*' },

      { ic:'💱', baslik:'Parallel currency — one document, three amounts', metin:
        'A company may want to report in three currencies: **local** (TRY, statutory), **group** ' +
        '(EUR, consolidation), **hard** (USD, inflation-independent comparison).\n\n' +
        'SAP resolves this through **parallel currency**: when each document is posted, all three ' +
        'amounts are calculated and stored at once ({{BSEG}} `DMBTR`, `DMBE2`, `DMBE3`).\n\n' +
        'Each currency can use its own {{kur-tipi}} and rate date — this is set in configuration.\n\n' +
        'In S/4HANA, {{ACDOCA}} raised this limit to **10 currencies**. Valuation, too, can be ' +
        'performed separately for each currency.' },

      { ic:'⚖️', baslik:'Where should the valuation difference be posted?', metin:
        'There are two options, and the choice matters:\n\n' +
        '**Option 1 — post to the reconciliation account.** Simple, but it **breaks sub-ledger ' +
        'reconciliation**: account 320\'s balance becomes 3,880,000 TRY while the {{FBL1N}} ' +
        'sub-ledger total stays at 3,500,000 TRY. The gap is explainable, but it requires checking ' +
        'every month.\n\n' +
        '**Option 2 — post to a separate balance sheet adjustment account.** The reconciliation ' +
        'account stays untouched; the adjustment account is shown on the balance sheet next to the ' +
        'reconciliation account.\n\n' +
        'Most setups prefer **option 2**. It is defined in {{OBA1}} through the "balance sheet ' +
        'adjustment account" field.' },
    ],

    notlar:[
      { tip:'warn', baslik:'The system doesn\'t error out on a missing rate', metin:
        'If {{TCURR}} has no rate for the transaction date, the system **doesn\'t raise an error**; ' +
        'it uses the rate that is equal to, or the **nearest preceding**, that date.\n\n' +
        'The result: if the rate feed breaks for 3 days, those three days\' transactions are posted ' +
        '**at the old rate** and nobody notices. The gap only surfaces at valuation or payment.\n\n' +
        'This is why the rate feed must be monitored and included in the closing checklist.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The valuation **logic hasn\'t changed**. What changed: the parallel currency limit rising ' +
      'from 3 to **10**, ledger-based valuation becoming standard, and Fiori interfaces.',

    eccFarklari:[
      { konu:'Parallel currency', ecc:'**3** (local + 2 additional)', s4:'**Up to 10** — thanks to {{ACDOCA}}' },
      { konu:'Valuation program', ecc:'{{F.05}} (classic) / {{FAGL_FC_VAL}} (New G/L)', s4:'{{FAGL_FC_VAL}} standard; ledger-based' },
      { konu:'Ledger-based valuation', ecc:'Possible with New G/L', s4:'**Standard** — each ledger with its own method' },
      { konu:'Rate data', ecc:'{{TCURR}}', s4:'Unchanged' },
      { konu:'Account determination', ecc:'{{OBA1}}', s4:'Unchanged' },
      { konu:'Reporting', ecc:'Classic reports', s4:'Fiori + real-time multi-currency reporting' },
    ],

    universalJournal:
      '{{ACDOCA}} stores every item as **multi-currency**: `HSL` (company code), `WSL` (document), ' +
      '`KSL` (group), `OSL` (additional), and so on, up to 10 currencies total.\n\n' +
      'The practical result: there is no need for a separate translation for consolidation — the ' +
      'group-currency amount is already ready on every line. Valuation, too, can be run ' +
      'independently for each ledger and each currency.',

    kalkanTcodes:[
      { eski:'{{F.05}}', yeni:'{{FAGL_FC_VAL}}', not:'F.05 is for classic G/L; New G/L and S/4HANA use FAGL_FC_VAL' },
    ],

    fiori:[
      { ad:'Run Foreign Currency Valuation', aciklama:'The Fiori counterpart of {{FAGL_FC_VAL}}; run status and results are visual.' },
      { ad:'Manage Exchange Rates', aciklama:'Replaces {{OB08}}; bulk rate entry and feed-status monitoring.' },
      { ad:'Currency Risk Analysis', aciklama:'Shows the net currency position and rate sensitivity.' },
      { ad:'Trial Balance (multi-currency)', aciklama:'Produces the trial balance in real time in the desired currency.' },
    ],

    compatibilityViews:[
      '{{TCURR}}, {{TCURV}} — **remain physical tables**, unchanged.',
      '{{BSEG}} — remains; the multi-currency fields are preserved, but {{ACDOCA}} carries more.',
      'The currency topic is one of the areas where the table structure changed the least in S/4HANA.',
    ],

    performans:
      'Because valuation runs over {{ACDOCA}}, it got faster for large item volumes. The real gain ' +
      'is in multi-currency reporting: since the group-currency amount is ready on every line, ' +
      'consolidation translations can be done in real time.',

    bestPractices:[
      'Review the parallel currency structure during migration; S/4HANA\'s support for 10 ' +
      'currencies can enable reporting that wasn\'t possible in ECC.',
      'If {{paralel-defter}} is in use, assign **its own valuation method** to each ledger: ' +
      'prudence in the local ledger, symmetric valuation in the IFRS ledger.',
      'Automate the rate feed and **put it under monitoring** — a break is silent.',
      'Post the valuation difference to a balance sheet adjustment account; leave the ' +
      'reconciliation account untouched.',
      'Use a separate document type for valuation documents so they can be distinguished in reporting.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'A EUR 100,000 import: from valuation to realization',
    hikaye:
      '**Marmara Textiles Inc.** imports EUR 100,000 worth of fabric from Germany in January 2027. ' +
      'The rate is volatile: 35.00 in January, 38.80 at month-end, 37.20 on payment day.\n\n' +
      'This scenario shows how the same transaction produces three different figures at three ' +
      'different moments, and how accounting handles it.',
    veriler:[
      { k:'Company code', v:'1000 · Local currency TRY' },
      { k:'Vendor', v:'V-9001 (Germany) · Payment terms 30 days' },
      { k:'Amount', v:'EUR 100,000' },
      { k:'Rates', v:'01/15: **35.00** · 01/31: **38.80** · 02/15: **37.20**' },
      { k:'Valuation method', v:'Z001 — average rate (M), lowest-value valuation, to be reversed' },
    ],

    adimlar:[
      { baslik:'January 15 — the invoice is posted (translation)', tcode:'MIRO',
        aciklama:'A document currency of EUR is entered; the system looks up the 01/15 rate in {{TCURR}} and computes the local equivalent.',
        girdi:[
          { alan:'Vendor / Amount', deger:'V-9001 · EUR 100,000' },
          { alan:'Document currency', deger:'EUR' },
          { alan:'Rate — **automatic**', deger:'35.00 (from {{TCURR}}, the 01/15 rate)' },
          { alan:'Local equivalent', deger:'3,500,000 TRY' },
        ],
        fis:{ baslik:'Document 5100000891 — Import invoice', belgeTuru:'RE', tarih:'15.01.2027', paraBirimi:'EUR',
          satirlar:[
            { hesap:'153', ad:'Merchandise', borc:3500000, not:'EUR 100,000 × 35.00' },
            { hesap:'320', ad:'Payables — V-9001', alacak:3500000, not:'Foreign currency: EUR 100,000' },
          ], not:'This is a **translation**. It happens once, at posting, and is stored in the document.' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'`WRBTR` = 100,000 (EUR) · `DMBTR` = 3,500,000 (TRY) · `KURSF` = 35.00' },
          { tablo:'BSIK', ne:'A foreign-currency open item was created — a valuation target' },
          { tablo:'BKPF', ne:'`WAERS` = EUR · `KURSF` = 35.00' },
        ] },

      { baslik:'January 31 — the rate can\'t be found', tcode:'F.05',
        aciklama:'Valuation is run but errors out. The automatic feed has broken.',
        girdi:[
          { alan:'Error', deger:'"Exchange rate for EUR/TRY on 31.01.2027 not found"' },
          { alan:'Diagnosis', deger:'Checking {{TCURR}} → the last rate is dated 01/28' },
          { alan:'Fix', deger:'The 01/31 rate was entered with {{OB08}}: **38.80**' },
        ],
        not:'**The sneaky part:** if valuation hadn\'t been run and a new foreign-currency invoice ' +
             'had been entered on January 31, the system would have used the January 28 rate ' +
             '**without any error**. The rate feed was added to the checklist.' },

      { baslik:'January 31 — valuation is performed', tcode:'F.05',
        aciklama:'The open item is remeasured at a rate of 38.80. The difference is an **unrealized** loss.',
        girdi:[
          { alan:'Key date / Method', deger:'01/31/2027 · Z001' },
          { alan:'Posting rate', deger:'35.00 → local equivalent 3,500,000 TRY' },
          { alan:'Valuation rate', deger:'38.80 → local equivalent 3,880,000 TRY' },
          { alan:'**Difference**', deger:'**A 380,000 TRY loss** (unrealized)' },
          { alan:'Reversal date', deger:'02/01/2027' },
        ],
        fis:{ baslik:'Document 1000009012 — Currency valuation', belgeTuru:'SA', tarih:'31.01.2027',
          satirlar:[
            { hesap:'656', ad:'Foreign exchange loss (unrealized)', borc:380000, not:'{{OBA1}} → KDF' },
            { hesap:'321', ad:'Payables — valuation adjustment', alacak:380000, not:'A balance sheet adjustment account' },
          ], not:'The adjustment was posted **to 321, not to 320**. This way, account 320\'s balance ' +
                 'stays consistent with the {{FBL1N}} sub-ledger total and reconciliation isn\'t broken.\n\n' +
                 'The two are shown together on the balance sheet: 3,500,000 + 380,000 = 3,880,000 TRY, the true liability.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'**Unchanged** — the open item is still 3,500,000 TRY. Valuation doesn\'t touch the item itself.' },
          { tablo:'BKPF', ne:'The reversal date was marked as 02/01/2027' },
        ] },

      { baslik:'February 1 — the valuation is reversed', tcode:'F.05',
        aciklama:'The difference hadn\'t been realized; the rate could turn back. The valuation is automatically reversed.',
        fis:{ baslik:'Document 1000009156 — Valuation reversal', belgeTuru:'SA', tarih:'01.02.2027',
          satirlar:[
            { hesap:'321', ad:'Payables — valuation adjustment', borc:380000 },
            { hesap:'656', ad:'Foreign exchange loss (unrealized)', alacak:380000 },
          ], not:'January\'s balance sheet showed the correct picture; it has now been zeroed out. ' +
                 'It will be valued **again** at the end of February — at whatever the rate is then.' } },

      { baslik:'February 15 — payment is made (realization)', tcode:'F110',
        aciklama:'The payable is settled. The rate is 37.20. The difference now **is realized** and becomes permanent.',
        girdi:[
          { alan:'Payment amount', deger:'EUR 100,000' },
          { alan:'Payment-day rate', deger:'37.20 → a 3,720,000 TRY bank outflow' },
          { alan:'Item cleared', deger:'3,500,000 TRY (at the posting rate)' },
          { alan:'**Realized difference**', deger:'**A 220,000 TRY loss**' },
        ],
        fis:{ baslik:'Document 2000002341 — Payment', belgeTuru:'KZ', tarih:'15.02.2027', paraBirimi:'EUR',
          satirlar:[
            { hesap:'320', ad:'Payables — V-9001 (cleared)', borc:3500000, not:'EUR 100,000 @ 35.00 (posting rate)' },
            { hesap:'102', ad:'Banks (EUR 100,000 @ 37.20)', alacak:3720000, not:'The payment-day rate' },
            { hesap:'656', ad:'Foreign exchange loss (realized)', borc:220000, not:'{{OBA1}} → KDB' },
          ], not:'**The foreign-currency side balances:** a EUR 100,000 payable, a EUR 100,000 ' +
                 'payment. The difference lies only in local currency and **is permanent** — the ' +
                 'item is cleared, the rate is final.\n\nThis posting is not reversed.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'The item was removed' },
          { tablo:'BSAK', ne:'Added as a cleared item' },
          { tablo:'BSEG', ne:'The exchange rate difference line; `AUGBL` the clearing document' },
        ] },

      { baslik:'Outcome analysis', tcode:'FBL3N',
        aciklama:'The picture becomes clear when the movements on account 656 Foreign exchange loss are reviewed.',
        girdi:[
          { alan:'01/31 valuation', deger:'+380,000 TRY loss (unrealized)' },
          { alan:'02/01 reversal', deger:'−380,000 TRY' },
          { alan:'02/15 payment', deger:'+220,000 TRY loss (realized)' },
          { alan:'**Net permanent impact**', deger:'**A 220,000 TRY loss**' },
        ],
        not:'January\'s balance sheet showed a 380,000 TRY loss — **it was correct as of that ' +
             'date**. The realized amount turned out to be 220,000 TRY. The 160,000 TRY gap between ' +
             'them was corrected automatically thanks to the reversal; no manual correction was needed.' },
    ],

    sonuc:
      '**The same transaction, three different moments, three different figures:**\n\n' +
      '• **January 15 (translation):** 3,500,000 TRY — the transaction was posted\n' +
      '• **January 31 (valuation):** 3,880,000 TRY — the balance sheet reflected reality, a ' +
      '380,000 TRY unrealized loss\n' +
      '• **February 15 (realization):** 3,720,000 TRY paid — a 220,000 TRY realized loss\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. The foreign-currency amount never changed.** The payable was EUR 100,000 from start to ' +
      'finish. Only its local-currency equivalent changed. A valuation posting is zero on the ' +
      'foreign-currency side.\n\n' +
      '**2. Valuation is an estimate; the real figure only becomes clear at payment.** This is why ' +
      'an unrealized difference is reversed — otherwise the estimate and the real amount would pile ' +
      'on top of each other.\n\n' +
      '**3. The valuation difference must be posted to a separate adjustment account.** Had it been ' +
      'posted directly to 320, the G/L balance and the sub-ledger total would not have agreed, and ' +
      'reconciliation would have been permanently broken.\n\n' +
      '**4. The rate feed is a silent point of failure.** The system **doesn\'t error out** on a ' +
      'missing rate; it uses the old one. In this scenario it was caught at closing; had it not ' +
      'been, postings would have been made at the wrong rate. Monitoring the feed is mandatory.',
  },

  },
});
