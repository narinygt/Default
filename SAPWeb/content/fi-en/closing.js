/* ==========================================================================
   content/fi-en/closing.js — English body for "Period-End Closing"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'closing',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Period-end closing is **the complete set of correction, valuation, and reconciliation activities** ' +
      'performed before a period\'s financial statements are produced. It happens at two scales: **month-end ' +
      'closing**, repeated every month, and the far more extensive **year-end closing**, done once a year.\n\n' +
      'The essence of closing is this: the transactions posted during the day are **raw data**. On their own ' +
      'they don\'t produce accurate financial statements, because some income and expenses haven\'t been ' +
      'recorded yet ({{tahakkuk}}), some assets haven\'t been valued ({{degerleme}}), and some items are sitting ' +
      'in the wrong classification.\n\n' +
      'Closing is the bridge that turns raw data into **reportable information**.',

    neden:
      '**For an accurate period result.** Under {{tahakkuk-esasi}}, income and expense must be recorded in the ' +
      'period they arose in, independent of the cash movement. Closing performs these corrections.\n\n' +
      '**Legal obligation.** Financial statements must be produced within specific deadlines and according to ' +
      'specific rules.\n\n' +
      '**Reliability.** Closing is also a **control pass**: clearing accounts are cleaned up, reconciliations ' +
      'are performed, and unexplained differences are found. In a system without closing, errors go unnoticed ' +
      'for months.\n\n' +
      '**Locking the period.** No posting can be made to a closed period; the reported figure becomes unchangeable.',

    sirketOnemi:
      'Closing is the accounting department\'s **busiest and most visible job**. It takes 3–10 days every ' +
      'month, and any delay reaches management directly: "Why can\'t we see January\'s results yet?"\n\n' +
      'From a consulting standpoint, closing is where **all of FI\'s sub-components meet**: AA depreciation, ' +
      'AP/AR aging, MM\'s {{gr-ir}} account, bank reconciliation, currency valuation — all of it converges here. ' +
      'That\'s why solving closing problems requires knowing every module.\n\n' +
      'The telling question is: **"Walk me through the month-end closing steps in order."** Being able to ' +
      'explain why the sequence is what it is shows that closing has actually been done for real.',

    gercekHayat:
      'Picture January closing at a manufacturing company. The accounting manager\'s checklist has 23 items, ' +
      'and **the order is critical**:\n\n' +
      'The MM period is closed first (otherwise stock movements keep coming in and cost keeps changing). Then ' +
      '{{gr-ir}} analysis is performed. Then depreciation is run — but every asset acquisition must already be ' +
      'posted before {{AFAB}}. Then currency valuation, then reclassifications, and finally the balance sheet.\n\n' +
      'If the order breaks: depreciation comes out incomplete, the FX difference is calculated wrong, and the ' +
      'balance sheet has to be produced twice. That\'s why closing is a **checklist discipline**, not a ' +
      'technical task.',

    muhasebeMantigi:
      'Closing entries fall into four groups, and each group follows different logic:\n\n' +
      '**1. {{tahakkuk}} entries** — income/expense that has arisen but whose document hasn\'t arrived yet. It ' +
      '**is reversed** in the following period ({{FBS1}} + {{F.81}}) because the real document will show up.\n\n' +
      '**2. {{degerleme}} entries** — measuring foreign-currency items at the current exchange rate ({{F.05}}). ' +
      'Usually **reversed**, because the difference hasn\'t been realized yet.\n\n' +
      '**3. Reclassification entries** — the amount is right but it\'s sitting in the wrong balance-sheet line ' +
      '({{F.19}}, {{FAGLF101}}). **Reversed**, because it exists only for presentation.\n\n' +
      '**4. Permanent entries** — depreciation ({{AFAB}}), {{karsilik}}s, finalized differences. **Not reversed.**\n\n' +
      'This distinction is critical: the first three groups are **temporary** and get undone in the following ' +
      'period; the fourth group is permanent. Mixing them up either produces a double posting or leaves a ' +
      'correction forgotten.',

    kavramlar: ['donem-sonu', 'kayit-donemi', 'ozel-donem', 'tahakkuk', 'karsilik', 'degerleme',
                'kur-farki', 'bakiye-devri', 'mali-tablo-yapisi', 'gr-ir', 'amortisman'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Closing is a **sequential checklist**, and the order isn\'t arbitrary: every step depends on the one ' +
      'before it being finished. The flow below shows the logical order of a typical month-end close.',

    roller:[
      { rol:'Logistics / Production', gorev:'Completes all goods movements and production postings; closes the MM period.' },
      { rol:'AP accounting', gorev:'Processes all incoming invoices, releases blocks, and investigates {{gr-ir}} differences.' },
      { rol:'AR accounting', gorev:'Issues invoices, posts collections, and prepares the aging report.' },
      { rol:'Fixed asset accountant', gorev:'Completes acquisitions and retirements, and runs {{AFAB}}.' },
      { rol:'Bank accountant', gorev:'Processes all statements, clears the {{banka-ara-hesabi}}, and reconciles.' },
      { rol:'G/L accounting specialist', gorev:'Enters {{tahakkuk}} and {{karsilik}} postings, and clears clearing accounts.' },
      { rol:'Accounting manager', gorev:'Manages the checklist, closes the periods ({{OB52}}), and signs off on the statements.' },
      { rol:'FI consultant', gorev:'Configures the closing programs, resolves errors, and moves the checklist into the system.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The month-end closing sequence — each step depends on the one before it',
      adimlar:[
        { ic:'📦', rol:'Logistics', baslik:'1. The logistics period is closed',
          aciklama:'If the MM period isn\'t closed, stock movements keep coming in and cost keeps changing. ' +
                   '**MM must close before the FI close.**',
          cikti:'Fixed stock movements', ok:'invoices are completed' },
        { ic:'🧾', rol:'AP / AR', baslik:'2. All invoices are processed',
          aciklama:'Incoming and outgoing invoices are posted; blocked invoices are released ({{MRBR}}). ' +
                   'A missing invoice means a missing expense.',
          cikti:'A complete invoice set', ok:'GR/IR analysis' },
        { ic:'🔗', rol:'AP accounting', baslik:'3. GR/IR analysis and cleanup',
          aciklama:'Matching items are cleared with {{F.13}}, permanent differences are written off with ' +
                   '{{MR11}}, and the remaining timing gap is reclassified with {{F.19}}.',
          cikti:'A clean {{gr-ir}} account', ok:'assets' },
        { ic:'🏭', rol:'Fixed asset accountant', baslik:'4. Depreciation is run',
          aciklama:'{{AFAB}} — but every acquisition and retirement must already be posted first. An ' +
                   'acquisition that arrives afterward requires depreciation to be rerun.',
          cikti:'A depreciation document', ok:'bank' },
        { ic:'🏦', rol:'Bank accountant', baslik:'5. Bank reconciliation',
          aciklama:'All statements are processed ({{FEBAN}}), {{banka-ara-hesabi}} items are cleared, and a ' +
                   'reconciliation statement is produced.',
          cikti:'Reconciled bank accounts', ok:'valuation' },
        { ic:'💱', rol:'G/L accounting', baslik:'6. Foreign currency valuation',
          aciklama:'{{F.05}} / {{FAGL_FC_VAL}} — foreign-currency open items and balances are valued at the ' +
                   'current exchange rate. It must be done **after every item has been posted**.',
          cikti:'FX difference postings', ok:'accruals' },
        { ic:'📝', rol:'G/L accounting', baslik:'7. Accrual and provision entries',
          aciklama:'{{tahakkuk}}s to be reversed, entered with {{FBS1}}; permanent {{karsilik}}s with {{FB50}}.',
          cikti:'Correction postings', ok:'reclassification' },
        { ic:'🔀', rol:'G/L accounting', baslik:'8. Reclassifications',
          aciklama:'{{FAGLF101}} — receivables/payables maturity classification, moving a debit-balance ' +
                   'customer to the vendor side.',
          cikti:'A correctly presented balance sheet', ok:'checks' },
        { ic:'⚖️', rol:'Accounting manager', baslik:'9. Checks and reconciliations',
          aciklama:'Does the sub-ledger total equal the {{mutabakat-hesabi}} balance? Are the clearing ' +
                   'accounts clean? Does the trial balance balance?',
          cikti:'Verified data', ok:'closing' },
        { ic:'🔒', rol:'Accounting manager', baslik:'10. The period is closed and statements are pulled',
          aciklama:'All account types are closed with {{OB52}}; financial statements with {{F.01}} / {{S_ALR_87012284}}.',
          cikti:'Financial statements' },
      ],
    },

    adimlar:[
      { rol:'Logistics', eylem:'Closes the MM period', sistem:'MMPV — **before** FI' },
      { rol:'AP / AR', eylem:'Processes all invoices', sistem:'{{MIRO}}, {{FB60}}, {{VF01}}, {{MRBR}}' },
      { rol:'AP accounting', eylem:'GR/IR cleanup and analysis', sistem:'{{F.13}}, {{MR11}}, {{F.19}}' },
      { rol:'Fixed asset accountant', eylem:'Runs depreciation', sistem:'{{AFAB}} — test mode first' },
      { rol:'Bank accountant', eylem:'Processes statements, reconciles', sistem:'{{FEBAN}}, {{FBL3N}}' },
      { rol:'G/L accounting', eylem:'Performs currency valuation', sistem:'{{F.05}} / {{FAGL_FC_VAL}}' },
      { rol:'G/L accounting', eylem:'Enters accruals and provisions', sistem:'{{FBS1}}, {{FB50}}' },
      { rol:'G/L accounting', eylem:'Performs reclassification', sistem:'{{FAGLF101}}' },
      { rol:'Accounting manager', eylem:'Closes the period', sistem:'{{OB52}} — all account types' },
      { rol:'Accounting manager', eylem:'Pulls the financial statements', sistem:'{{F.01}}, {{S_ALR_87012284}}, {{FAGLB03}}' },
      { rol:'G/L accounting', eylem:'(Year-end) balance carryforward', sistem:'{{FAGLGVTR}}, {{AJRW}}, {{AJAB}}' },
    ],

    veriAkisi:{
      nereden:'Every FI sub-component and integrated module: MM stock movements, SD invoices, AA depreciation, ' +
              'AP/AR items, bank statements, {{TCURR}} exchange rates.',
      nereye:'Into correction documents → account balances → the balance sheet and income statement via ' +
             '{{mali-tablo-yapisi}}; at year-end, into the new year\'s opening balances.',
      tetikleyen:'The calendar: the last business day of every month, and fiscal year-end.',
      sonraki:'Tax filing, consolidation, management reporting, audit.',
    },

    notlar:[
      { tip:'warn', baslik:'Why does the order matter?', metin:
        'Closing steps depend on each other, and if the order breaks, work has to be redone:\n\n' +
        '• **If the MM period isn\'t closed before FI**, stock movements keep coming in, and the GR/IR ' +
        'analysis and cost calculations become invalid.\n\n' +
        '• **If depreciation is run before acquisitions are posted**, new assets go without depreciation, and ' +
        '{{AFAB}} has to be rerun in "repeat" mode.\n\n' +
        '• **If currency valuation is done before every item is posted**, foreign-currency items that arrive ' +
        'afterward go unvalued.\n\n' +
        '• **If reclassification is done before valuation**, the wrong amounts get classified.' },
      { tip:'tip', baslik:'How the two posting-period ranges are used', metin:
        '{{OB52}} has two posting-period ranges. **The 1st range** is for normal users, **the 2nd range** for ' +
        'users in an authorization group.\n\n' +
        'During closing, the 1st range is closed (users can\'t post) but the 2nd range is left open (the ' +
        'closing team can still make corrections). Once closing is finished, the 2nd range is closed too. ' +
        'This is the standard method that keeps closing both secure and flexible.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The defining trait of a closing entry is whether it\'s **temporary or permanent**. Below are examples ' +
      'of the four types, along with what happens to each one in the following period.',

    etkilenenHesaplar:[
      { hesap:'381 Accrued expenses', tur:'Balance sheet — Liability', neden:'Expenses that have arisen but whose invoice hasn\'t arrived. **Reversed** in the following period.' },
      { hesap:'181 Accrued income', tur:'Balance sheet — Asset', neden:'Income that has arisen but whose invoice hasn\'t been issued. Reversed.' },
      { hesap:'129 / 47x Provisions', tur:'Balance sheet — Contra-asset / Liability', neden:'{{karsilik}}s are **permanent**; not reversed, used when the event materializes.' },
      { hesap:'326 Goods received, not yet invoiced', tur:'Balance sheet — Liability', neden:'{{gr-ir}} reclassification ({{F.19}}). **Reversed** in the following period.' },
      { hesap:'646 / 656 FX differences', tur:'Income statement', neden:'A valuation difference. If unrealized, reversed in the following period.' },
      { hesap:'257 Accumulated depreciation', tur:'Balance sheet — Contra-asset', neden:'The {{AFAB}} posting is **permanent**; not reversed.' },
      { hesap:'590 Net income for the period', tur:'Balance sheet — Equity', neden:'At year-end, the result of the income and expense accounts moves here ({{bakiye-devri}}).' },
    ],

    fisler:[
      { baslik:'Type 1 — Accrual ({{FBS1}}) · TEMPORARY, to be reversed',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — electricity', borc:45000, not:'Used in January' },
          { hesap:'381', ad:'Accrued expenses', alacak:45000, not:'The invoice hasn\'t arrived yet' },
        ],
        not:'The electricity was used in January, its invoice will arrive in February. Under {{tahakkuk-esasi}}, ' +
             'the expense is posted to January.\n\n' +
             'Because it was entered with {{FBS1}}, it is **automatically reversed on 01.02.2027 via {{F.81}}**. ' +
             'When the real invoice is entered in February, there\'s no double posting.' },

      { baslik:'Type 1 continued — automatic reversal ({{F.81}})',
        belgeTuru:'SA', tarih:'01.02.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'381', ad:'Accrued expenses', borc:45000, not:'The accrual is closed' },
          { hesap:'770', ad:'General administrative expense — electricity', alacak:45000 },
        ],
        not:'The real invoice arrived in February at 47,000 TRY. Net February expense: −45,000 + 47,000 = ' +
             '**2,000 TRY**. So January carried 45,000 and February carried 2,000 — the gap between the ' +
             'estimate and the real amount landed in the right period.' },

      { baslik:'Type 2 — Currency valuation ({{F.05}}) · TEMPORARY',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'656', ad:'FX loss', borc:38000, not:'Unrealized FX difference' },
          { hesap:'320', ad:'Trade payables — valuation difference', alacak:38000, not:'The foreign-currency liability increased' },
        ],
        not:'A 10,000 EUR vendor liability had been posted at a rate of 35.00; the January 31 rate is 38.80. ' +
             'The 38,000 TRY difference is **unrealized** — the liability hasn\'t been paid yet.\n\n' +
             'That\'s why it\'s reversed on 02.01. The real difference is finalized at the moment of payment ({{F110}}).' },

      { baslik:'Type 3 — GR/IR reclassification ({{F.19}}) · TEMPORARY',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR account', borc:280000, not:'Temporarily cleared out' },
          { hesap:'326', ad:'Goods received, not yet invoiced', alacak:280000, not:'A balance-sheet presentation account' },
        ],
        not:'The amount is right and the account is right — but **the balance-sheet presentation is wrong**. ' +
             'GR/IR is a technical clearing account; on the balance sheet it should be shown as "goods ' +
             'received, not yet invoiced."\n\n' +
             'Because it exists only for presentation, it is reversed on 02.01.' },

      { baslik:'Type 4 — Allowance for doubtful receivables · PERMANENT',
        belgeTuru:'SA', tarih:'31.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'654', ad:'Provision expense', borc:120000 },
          { hesap:'129', ad:'Allowance for doubtful trade receivables', alacak:120000, not:'**Not reversed**' },
        ],
        not:'A {{karsilik}} is a permanent entry. It isn\'t reversed; if the receivable is collected, the ' +
             'provision is released back to income, and if it can\'t be collected, it\'s used when the ' +
             'receivable is written off.\n\n' +
             '**The difference between an accrual and a provision:** in an accrual the amount is known (an ' +
             'invoice is coming); in a provision it\'s estimated (it\'s unknown whether it will be collected).' },

      { baslik:'Year-end — closing the income statement accounts ({{FAGLGVTR}}) · PERMANENT',
        belgeTuru:'SA', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'600', ad:'Domestic sales', borc:12400000, not:'Zeroed out' },
          { hesap:'621', ad:'Cost of goods sold', alacak:7200000, not:'Zeroed out' },
          { hesap:'770', ad:'General administrative expenses', alacak:3100000, not:'Zeroed out' },
          { hesap:'590', ad:'Net income for the period', alacak:2100000, not:'Moved to equity' },
        ],
        not:'{{gelir-tablosu}} accounts measure a **period**; every year starts from zero. The net result ' +
             'moves to equity. {{bilanco}} accounts, on the other hand, **carry forward** into the new year ' +
             'with their balance.' },
    ],

    tHesaplar:[
      { hesap:'Accrued expenses', kod:'381 (temporary)',
        borc:[{ ad:'February reversal', tutar:45000 }],
        alacak:[{ ad:'January accrual', tutar:45000 }],
        not:'Zeroed out in the following period' },
      { hesap:'Allowance for doubtful receivables', kod:'129 (permanent)',
        borc:[],
        alacak:[{ ad:'Provision booked', tutar:120000 }],
        not:'Not reversed; used when the event materializes' },
      { hesap:'GR/IR account', kod:'159',
        borc:[{ ad:'F.19 reclassification', tutar:280000 }],
        alacak:[{ ad:'Goods receipts (net)', tutar:280000 }],
        not:'The reclassification is undone in the following period' },
      { hesap:'Net income for the period', kod:'590 (equity)',
        borc:[],
        alacak:[{ ad:'Year-end transfer', tutar:2100000 }],
        not:'The income statement\'s result' },
    ],

    notlar:[
      { tip:'warn', baslik:'Temporary or permanent? — closing\'s most critical distinction', metin:
        'Knowing whether a closing entry will be reversed in the following period is essential:\n\n' +
        '**Reversed (temporary):** {{tahakkuk}}s, unrealized {{degerleme}} differences, reclassifications. ' +
        'What they have in common: the real document/transaction **is still coming**.\n\n' +
        '**Not reversed (permanent):** depreciation, {{karsilik}}s, finalized differences, permanent GR/IR ' +
        'write-offs ({{MR11}}).\n\n' +
        'Mixing them up: if a temporary entry isn\'t reversed, it produces a **double expense**; if a ' +
        'permanent entry gets reversed, the **expense disappears**. Either way the financial statements come ' +
        'out wrong.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Closing happens at three scales, each with a different scope: **daily**, **month-end**, **year-end**. ' +
      'Closing entries also split into temporary and permanent.',

    liste:[
      { ad:'Daily Closing',
        aciklama:'Daily routine checks: has the bank statement been processed, have batch jobs completed, are ' +
                 'there any erroneous documents.',
        neZaman:'At the end of every business day. A light control pass that produces no accounting posting.',
        ornek:'Are there pending lines left in {{FEBAN}}? Any stalled updates in {{SM13}}?' },

      { ad:'Month-End Closing',
        aciklama:'The main closing. Accruals, valuations, depreciation, reconciliations, and financial statements.',
        neZaman:'At the end of every month; typically takes 3–10 business days.',
        ornek:'This topic\'s main focus. The standard 10-step flow.',
        tcodes:['OB52','AFAB','F.05','F.19','FAGLF101','F.01'] },

      { ad:'Year-End Closing',
        aciklama:'The entire month-end close **plus** year-specific activities: {{bakiye-devri}}, the AA year ' +
                 'close, physical inventory count, tax calculations, audit preparation.',
        neZaman:'At fiscal year-end; can take weeks and overlaps with the audit.',
        ornek:'{{FAGLGVTR}} balance carryforward + the {{AJRW}}/{{AJAB}} asset year close.',
        tcodes:['FAGLGVTR','AJRW','AJAB','F.16'] },

      { ad:'Special Period Closing',
        aciklama:'{{ozel-donem}}s (13–16) are used for year-end corrections that need to be kept **separate** ' +
                 'from the December posting.',
        neZaman:'For audit corrections, tax adjustments, and information that arrives late. It lets a ' +
                'correction be posted without disturbing December\'s own figure.',
        ornek:'The auditor asked for a 500,000 TRY correction after December closed → it\'s posted to period 13.',
        tcodes:['OB52','OB29'] },

      { ad:'Reversing Entry',
        aciklama:'An entry that is **automatically reversed** in the following period, because the real ' +
                 'document will arrive later.',
        neZaman:'{{tahakkuk}}s, unrealized {{degerleme}} differences, presentation-only reclassifications.',
        ornek:'Entered with {{FBS1}}, reversed in bulk with {{F.81}}.',
        tcodes:['FBS1','F.81','F.05','F.19'] },

      { ad:'Permanent Entry',
        aciklama:'A final entry that is not reversed.',
        neZaman:'Depreciation, {{karsilik}}s, finalized difference write-offs.',
        ornek:'{{AFAB}} depreciation, the allowance for doubtful receivables, a GR/IR difference written off with {{MR11}}.',
        tcodes:['AFAB','FB50','MR11'] },

      { ad:'Reclassification',
        aciklama:'Moving items whose amount and account are correct but whose **balance-sheet presentation** ' +
                 'is wrong.',
        neZaman:'The {{gr-ir}} balance, a debit-balance customer (moved to the vendor side), a credit-balance ' +
                'vendor, the current/non-current split by maturity.',
        ornek:'{{F.19}} GR/IR reclassification, {{FAGLF101}} receivables/payables maturity classification.',
        tcodes:['F.19','FAGLF101'] },
    ],

    karsilastirmaBasliklar:['Accrual', 'Provision'],
    karsilastirma:[
      ['Amount', '**Known** — an invoice is coming', '**Estimated** — uncertain'],
      ['Timing', 'Known — next period', 'Uncertain'],
      ['Realization', 'Nearly certain', 'Probable but not certain'],
      ['Is it reversed', '**Yes** — automatically, next period', '**No** — it\'s permanent'],
      ['Example', 'Electricity used but not yet invoiced', 'Doubtful receivables, severance pay, warranty'],
      ['SAP transaction', '{{FBS1}} + {{F.81}}', '{{FB50}} — a normal posting'],
      ['Balance-sheet line', '381 Accrued expenses', '129 / 47x Provisions'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'OB52', ad:'Open / close posting periods',
        amac:'Determines which periods are open for which {{hesap-tipi}}. Closing\'s keystone.',
        neZaman:'At every month-end close, and whenever "posting period not open" is thrown.',
        adimlar:[
          { baslik:'Select the posting period variant',
            aciklama:'A company code is assigned to a variant ({{OBY6}}); multiple companies can share the ' +
                     'same variant. Changing the variant affects **every company assigned to it**.' },
          { baslik:'Set the account-type lines separately',
            aciklama:'**+** is the default for all types, **S** general ledger, **D** customer, **K** vendor, ' +
                     '**A** fixed asset, **M** material. Each line is independent.' },
          { baslik:'Use the two posting-period ranges',
            aciklama:'**The 1st range** is for normal users. **The 2nd range** is for users in an ' +
                     'authorization group — this is how the closing team\'s privileged access is granted.' },
          { baslik:'Enter the authorization group', aciklama:'The authorization group of the users who can access the 2nd range (e.g. FI01).' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Posting period variant 1000' },
          { ekran:'Line: account type +', islem:'1st range: 02/2027–02/2027 · 2nd range: 01/2027–02/2027 · authorization group FI01' },
          { ekran:'Line: account type K', islem:'Set up the same way — opening S doesn\'t open K' },
        ],
        alanlar:{
          zorunlu:['Posting period variant','Account type','1st range from/to','Fiscal year'],
          opsiyonel:['2nd range','Authorization group','Account range'] },
        hatalar:[
          { mesaj:'Posting period 001 2027 is not open for account type K', sebep:'Only the S line was opened.', cozum:'Open the period on the **K** line too. Account types are managed separately — this is the most common closing mistake.' },
          { mesaj:'You are not authorized for posting period', sebep:'The user isn\'t in the authorization group that can access the 2nd range.', cozum:'Have the authorization team add the user to the group, or temporarily open the 1st range.' },
        ],
        ipucu:'During closing, **close the 1st range and leave the 2nd range open**: users can\'t post, but ' +
              'the closing team can still make corrections. Once closing finishes, the 2nd range gets closed ' +
              'too. This is the standard method that keeps closing both secure and flexible.',
        ilgili:['OBY6','T001B','FB50','OB29'] },

      { kod:'FBS1', ad:'Accrual/deferral document (to be reversed)',
        amac:'Enters an {{tahakkuk}} posting so that it **automatically reverses** in the following period.',
        neZaman:'For income/expense that has arisen but whose document hasn\'t arrived.',
        adimlar:[
          { baslik:'Start like a normal document entry: dates, company code, line items' },
          { baslik:'Fill in the **reversal date** and **reversal reason** fields',
            aciklama:'These two fields are what set {{FBS1}} apart from a normal posting. The reversal date ' +
                     'is usually the first day of the following period (01.02.2027).' },
          { baslik:'Save',
            aciklama:'The document posts normally; it\'s also flagged as "to be reversed."' },
          { baslik:'Run {{F.81}} in the following period',
            aciklama:'Every accrual document whose date has come due is reversed **in bulk**.' },
        ],
        alanlar:{
          zorunlu:['Document date','Posting date','Company code','Reversal date','Reversal reason','Line items'],
          opsiyonel:['Reference','Header text'] },
        hatalar:[
          { mesaj:'Reversal date must be after posting date', sebep:'The reversal date is before the posting date.', cozum:'Enter a date in the following period.' },
          { mesaj:'Posting period for reversal date is not open', sebep:'The period the reversal date falls in isn\'t open yet.', cozum:'Normal — that period will be open by the time {{F.81}} runs. The posting still goes through.' },
        ],
        ipucu:'Entering an accrual by hand without {{FBS1}} and then **forgetting** to reverse it the ' +
              'following month is one of the most common closing mistakes, and it creates a **double ' +
              'expense**. FBS1 removes this risk structurally.',
        ilgili:['F.81','FB50','FB08'] },

      { kod:'F.81', ad:'Reverse accrual/deferral documents',
        amac:'Reverses accruals entered with {{FBS1}} in bulk, on their scheduled date.',
        neZaman:'In the first days of every month, to undo the previous month\'s accruals.',
        adimlar:[
          { baslik:'Enter the company code and reversal date range' },
          { baslik:'Run in **test mode** first', aciklama:'Shows which documents will be reversed.' },
          { baslik:'Review the result, then run in production mode' },
        ],
        ipucu:'Put this step on the checklist and run it on **the first business day of the month**. If ' +
              'it\'s forgotten, last month\'s accruals stay standing and this month\'s expense comes out inflated.',
        hatalar:[
          { mesaj:'No documents selected', sebep:'There\'s no accrual to reverse in that date range.', cozum:'Check the date range; look at the reversal date of the documents entered with {{FBS1}}.' },
        ],
        ilgili:['FBS1','FB08','F.80'] },

      { kod:'F.19', ad:'GR/IR analysis and reclassification',
        amac:'Presents the {{gr-ir}} account\'s balance in the correct balance-sheet line.',
        neZaman:'At every month-end, after GR/IR cleanup.',
        adimlar:[
          { baslik:'Enter the company code, account range, and key date' },
          { baslik:'Enter the reversal date',
            aciklama:'Usually the first day of the following period. The reclassification is **for ' +
                     'presentation only** and gets undone.' },
          { baslik:'Run in test mode and review the result',
            aciklama:'Goods-received/invoice-not-received items (credit balance) and invoice-received/goods-' +
                     'not-received items (debit balance) are classified **separately** — one is shown on the ' +
                     'liability side, the other on the asset side.' },
          { baslik:'Run in production mode' },
        ],
        ipucu:'{{F.19}} does not **shrink** the balance, it only moves it. If the GR/IR balance is genuinely ' +
              'high, the problem isn\'t the classification, it\'s unmatched items — {{F.13}} and {{MR11}} ' +
              'need to run first.',
        hatalar:[
          { mesaj:'Account ... is not a GR/IR account', sebep:'The account isn\'t configured as a GR/IR account.', cozum:'Check the GR/IR account definition in IMG.' },
        ],
        ilgili:['F.13','MR11','FBL3N','gr-ir'] },

      { kod:'FAGLF101', ad:'Receivables/payables reclassification',
        amac:'Classifies receivables and payables as current/non-current by maturity; moves a debit-balance ' +
             'customer to the vendor side, and a credit-balance vendor to the customer side.',
        neZaman:'At month-end and year-end closing, before the balance sheet is produced.',
        adimlar:[
          { baslik:'Enter the company code, key date, and valuation area' },
          { baslik:'Set the classification and reversal dates' },
          { baslik:'Run in test mode',
            aciklama:'Shows which items will be moved: receivables with a maturity beyond one year, debit-' +
                     'balance customers, credit-balance vendors.' },
          { baslik:'Run in production mode' },
        ],
        ipucu:'A customer with a debit balance (they overpaid) should be shown on the balance sheet **on the ' +
              'liability side**, not the asset side — because you now owe them. Without this reclassification, ' +
              'the balance sheet is misleading.',
        ilgili:['F.19','F.01','yaslandirma'] },

      { kod:'FAGLGVTR', ad:'Balance carryforward (year-end)',
        amac:'Carries balance-sheet accounts\' balances forward into the new year, and moves the income ' +
             'statement accounts\' result to equity.',
        neZaman:'At year-end. **Can be rerun** — as new postings come in, the difference gets carried forward.',
        adimlar:[
          { baslik:'Enter the company code and the fiscal year to carry forward' },
          { baslik:'Select the ledger',
            aciklama:'If {{paralel-defter}} is in use, it must be run **separately for each ledger**.' },
          { baslik:'Run in test mode and review the result' },
          { baslik:'Run in production mode',
            aciklama:'Balance-sheet accounts carry forward with their balances; income statement accounts ' +
                     'are zeroed out, and the result moves to the retained-earnings account under equity.' },
        ],
        ipucu:'{{FAGLGVTR}} is a **rerunnable transaction**. If a correction posting is entered into a past ' +
              'year after it has closed, rerunning it updates the carryforward. So don\'t hesitate to run it early.',
        hatalar:[
          { mesaj:'Retained earnings account not defined', sebep:'The retained-earnings transfer account isn\'t defined.', cozum:'IMG → Balance carryforward → assign the retained-earnings account to the income statement account type.' },
        ],
        ilgili:['F.16','AJRW','AJAB','OB52'] },

      { kod:'F.01', ad:'Balance sheet / income statement',
        amac:'Produces the balance sheet and income statement according to the {{mali-tablo-yapisi}}.',
        neZaman:'At the final step of closing, and at every reconciliation check.',
        adimlar:[
          { baslik:'Enter the company code and period range' },
          { baslik:'Select the {{mali-tablo-yapisi}} (FSV)',
            aciklama:'This structure determines which account appears on which line. Different FSVs can be ' +
                     'used for different purposes (statutory, management, IFRS).' },
          { baslik:'Enter the comparison period', aciklama:'A comparison against the same period last year.' },
          { baslik:'Run it and review the hierarchy' },
        ],
        hatalar:[
          { mesaj:'Total of assets and liabilities is not equal', sebep:'An account isn\'t assigned to any line in the FSV.', cozum:'{{OB58}} → check the "unassigned accounts" line in the FSV. This is **not** a data error — SAP never accepts an unbalanced document in the first place.' },
        ],
        ipucu:'If the balance sheet doesn\'t balance, don\'t panic: the problem is almost always an ' +
              '**unassigned account** in {{OB58}}. Check that line in the FSV specifically.',
        ilgili:['OB58','S_ALR_87012284','FAGLB03','GR55'] },

      { kod:'AJAB', ad:'Fixed asset year-end closing',
        amac:'Closes the fiscal year in asset accounting.',
        neZaman:'At year-end, once every {{AFAB}} run has completed.',
        adimlar:[
          { baslik:'Enter the company code and the year to close' },
          { baslik:'Run in test mode — see the blockers',
            aciklama:'Lists missing depreciation runs, erroneous assets, and unbalanced areas.' },
          { baslik:'Clear the blockers, then close in production mode' },
        ],
        ipucu:'The order: **{{AJRW}} (open the new year) → {{AFAB}} throughout the year → {{AJAB}} (close the ' +
              'old year)**. No asset posting can be made to the new year until AJRW has run.',
        ilgili:['AJRW','AFAB','OB52'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Closing has few tables of its own; the real work is **producing correction postings on top of the ' +
      'existing tables**. The only configuration tables specific to closing are {{T001B}} (period control) ' +
      'and the {{mali-tablo-yapisi}} definitions that drive reporting.',

    liste:[
      { ad:'T001B', baslik:'Posting-period open/closed definition',
        tutar:'The period lines entered in {{OB52}}: posting period variant, account type, the two posting-period ranges, authorization group.',
        olusturan:'{{OB52}}',
        guncelleyen:'{{OB52}} — every month-end',
        anahtar:'RRCTY + BUKRS + MKOAR + BKONT',
        iliskiler:'A company code is linked to a posting period variant through {{T001}} (assigned via {{OBY6}}).',
        s4:'Unchanged.',
        alanlar:[
          { ad:'MKOAR', aciklama:'Account type: **+** default, **S** general ledger, **D** customer, **K** vendor, **A** asset, **M** material' },
          { ad:'FRPE1 / TOPE1', aciklama:'**1st posting-period range** — normal users' },
          { ad:'FRPE2 / TOPE2', aciklama:'**2nd posting-period range** — those in the authorization group (the closing team)' },
          { ad:'BRGRU', aciklama:'Authorization group — who can access the 2nd range' },
        ] },

      { ad:'T009', baslik:'Fiscal year variant',
        tutar:'How many normal periods and how many {{ozel-donem}}s the year is split into, and the period boundaries.',
        olusturan:'{{OB29}}',
        guncelleyen:'{{OB29}}',
        anahtar:'PERIV',
        iliskiler:'Linked to the company code via {{T001}}.PERIV.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'ANZBP', aciklama:'Number of normal periods (usually 12)' },
          { ad:'ANZSP', aciklama:'**Number of special periods** (usually 4) — for year-end corrections' },
        ] },

      { ad:'BKPF', baslik:'Closing document headers',
        tutar:'The headers of closing postings. For accrual documents, the reversal information is here too.',
        olusturan:'{{FBS1}}, {{AFAB}}, {{F.05}}, {{F.19}}, {{FAGLGVTR}}',
        guncelleyen:'Closing programs',
        anahtar:'BUKRS + BELNR + GJAHR',
        s4:'Unchanged.',
        alanlar:[
          { ad:'STGRD / STJAH', aciklama:'**Reversal reason and year** — populated on {{FBS1}} documents' },
          { ad:'STODT', aciklama:'**Scheduled reversal date** — {{F.81}} looks at this date' },
          { ad:'MONAT', aciklama:'Posting period — 13–16 for special-period postings' },
        ] },

      { ad:'ACDOCA', baslik:'Universal Journal',
        tutar:'Every closing posting is held here too; split by ledger.',
        olusturan:'Closing transactions',
        guncelleyen:'Every closing program',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'If {{paralel-defter}} is in use, closing is performed separately for each ledger.',
        s4:'In S/4HANA, balances are **calculated on the fly** from here; there\'s no separate totals table.',
        alanlar:[
          { ad:'RLDNR', aciklama:'{{defter}} — {{FAGLGVTR}} is run separately for each ledger' },
          { ad:'POPER', aciklama:'Posting period' },
        ] },

      { ad:'FAGLFLEXT', baslik:'New G/L totals table',
        tutar:'Totals by account/ledger/period. Balance carryforward used to write into this table.',
        olusturan:'Every posting, in ECC',
        guncelleyen:'Postings and balance carryforward, in ECC',
        s4:'**Removed** — a {{uyumluluk-view}}. Totals are calculated on the fly from {{ACDOCA}}, and balance ' +
            'carryforward no longer updates a totals table.' },

      { ad:'ANLC', baslik:'Asset annual values',
        tutar:'Assets\' values by year. Checked during the {{AJAB}} year close.',
        olusturan:'{{AFAB}}, acquisition/retirement transactions',
        guncelleyen:'AA transactions',
        s4:'Moved into {{ACDOCA}}; kept for compatibility.' },
    ],

    er:{
      type:'er',
      baslik:'Closing configuration and document relationships',
      varliklar:[
        { ad:'T009', rol:'Configuration', aciklama:'Fiscal year variant',
          alanlar:[{ ad:'PERIV', tip:'pk' }, { ad:'ANZBP' }, { ad:'ANZSP' }] },
        { ad:'T001', rol:'Configuration', aciklama:'Company code',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'PERIV', tip:'fk' }] },
        { ad:'T001B', rol:'Configuration', hub:true, aciklama:'Period control',
          alanlar:[{ ad:'BUKRS', tip:'fk' }, { ad:'MKOAR', tip:'pk' }, { ad:'FRPE1' }, { ad:'FRPE2' }, { ad:'BRGRU' }] },
        { ad:'BKPF', rol:'Document', aciklama:'Closing documents',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'MONAT' }, { ad:'STODT' }, { ad:'STGRD' }] },
        { ad:'BSEG', rol:'Line item', aciklama:'Correction line items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HKONT', tip:'fk' }, { ad:'DMBTR' }] },
        { ad:'ACDOCA', rol:'Universal', aciklama:'Ledger-based closing',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'POPER' }] },
        { ad:'SKB1', rol:'Master data', aciklama:'Account settings',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'XOPVW' }] },
      ],
      iliskiler:[
        { from:'T009', to:'T001', alanlar:'PERIV', not:'a company code is tied to a fiscal year variant' },
        { from:'T001', to:'T001B', alanlar:'BUKRS → posting period variant', not:'period control' },
        { from:'T001B', to:'BKPF', alanlar:'period control', not:'grants posting permission' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'header → line item' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR + GJAHR', not:'ledger-based view' },
        { from:'BSEG', to:'SKB1', alanlar:'HKONT → SAKNR', not:'the line item\'s account' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Closing doesn\'t happen on a single screen; it\'s **a series of programs run in the correct order**. ' +
      'Below is the detail of the three most critical screens, plus the closing checklist itself.',

    ekranlar:[
      { ad:'{{OB52}} — the period control screen',
        aciklama:'Closing\'s keystone. Each line defines the posting permission for one account type.',
        alanlar:[
          { ad:'Posting period variant', zorunlu:true, aciklama:'**Careful:** the variant can be shared by multiple company codes; a change affects all of them.' },
          { ad:'Account type (`MKOAR`)', zorunlu:true, aciklama:'**+** is the default (applies when there\'s no other line), **S/D/K/A/M** are specific. If a specific line exists, it applies instead of **+**.' },
          { ad:'1st posting-period range', zorunlu:true, aciklama:'The periods normal users can post to.' },
          { ad:'2nd posting-period range', zorunlu:false, aciklama:'The periods that **those in the authorization group** can post to — for the closing team.' },
          { ad:'Authorization group (`BRGRU`)', zorunlu:false, aciklama:'Determines who can access the 2nd range.' },
        ],
        ipucu:'The **+** line is a "default." If there\'s a specific line for S, S postings follow that line, ' +
              'not **+**. The complaint "I opened the period but I\'m still getting an error" is usually ' +
              'caused by not knowing this priority rule.' },

      { ad:'{{FBS1}} — the accrual entry screen',
        aciklama:'Two fields have been added to a normal document entry screen; they\'re what make this screen special.',
        alanlar:[
          { ad:'Document/posting date', zorunlu:true, aciklama:'Belongs to the closing period (e.g. 31.01.2027).' },
          { ad:'**Reversal date** (`STODT`)', zorunlu:true, aciklama:'Usually the first day of the following period (01.02.2027). {{F.81}} looks at this date.' },
          { ad:'**Reversal reason** (`STGRD`)', zorunlu:true, aciklama:'Determines which date the reversal falls on; for an accrual, a reason requiring an alternative date is chosen.' },
          { ad:'Line items', zorunlu:true, aciklama:'The expense/income account and the accrual account (381/181).' },
        ],
        ipucu:'Make the reversal date **the first day of the following period**. If you give it a mid-month ' +
              'date, the accrual looks like it stands for part of that month and not the rest, and interim ' +
              'reports become misleading.' },

      { ad:'{{F.05}} — the currency valuation screen',
        aciklama:'Valuing foreign-currency items and balances at the current exchange rate.',
        alanlar:[
          { ad:'Company code / Valuation key date', zorunlu:true, aciklama:'Usually the last day of the month.' },
          { ad:'Valuation method', zorunlu:true, aciklama:'Defined in {{OB59}}: which {{kur-tipi}}, which principle (lower-of / always), whether it will be reversed.' },
          { ad:'Items to be valued', zorunlu:true, aciklama:'G/L balances, vendor open items, customer open items — flagged separately.' },
          { ad:'Reversal date', zorunlu:false, aciklama:'If the unrealized difference is to be reversed.' },
          { ad:'Test mode', zorunlu:false, aciklama:'**Always test first.** Valuation produces a large number of documents.' },
        ],
        ipucu:'Valuation must be done **after every item has been posted**. A foreign-currency invoice that ' +
              'arrives afterward stays unvalued, and closing has to be redone.' },

      { ad:'The closing checklist — its system counterpart',
        aciklama:'Closing isn\'t a screen, it\'s a discipline. It\'s managed in SAP in three ways.',
        alanlar:[
          { ad:'A manual checklist', zorunlu:false, aciklama:'Excel or a document. Common at small companies; error-prone.' },
          { ad:'Schedule Manager (SCMA)', zorunlu:false, aciklama:'SAP\'s closing task scheduler: steps, dependencies, owners, and status tracking.' },
          { ad:'Fiori Financial Closing Cockpit', zorunlu:false, aciklama:'The modern counterpart in S/4HANA; task templates, automatic execution, and progress tracking.' },
        ],
        ipucu:'Moving closing off Excel and into the system is the most effective way to shorten the closing ' +
              'cycle: dependencies are enforced, no step gets skipped, and status is visible to everyone.' },
    ],

    zorunlu:['Posting period variant','Account type','Posting period range','Company code','Valuation key date','Reversal date (for accruals)'],
    opsiyonel:['2nd posting-period range','Authorization group','Valuation method','Test mode','Comparison period'],

    hatalar:[
      { mesaj:'Posting period ... is not open for account type ...', sebep:'The relevant account type is closed in {{OB52}}.', cozum:'Open each account type **separately**. The **+** line is a default; if a specific line exists, it applies instead.' },
      { mesaj:'Depreciation not completely posted for fiscal year', sebep:'Not every period\'s {{AFAB}} run has completed before {{AJAB}}.', cozum:'Run the missing periods; all 12 periods must be complete.' },
      { mesaj:'Exchange rate for ... not found', sebep:'There\'s no rate for the valuation date in {{TCURR}}.', cozum:'Enter the rate with {{OB08}}. Rates are usually fed in automatically; the feed can break.' },
      { mesaj:'Retained earnings account not defined for chart of accounts', sebep:'The retained-earnings account for balance carryforward isn\'t defined.', cozum:'IMG → Balance carryforward → assign the retained-earnings account to the income statement account type.' },
      { mesaj:'Balance carryforward already performed', sebep:'{{FAGLGVTR}} has already been run.', cozum:'This is a warning — the transaction **can be rerun**; the difference gets carried forward for new postings.' },
      { mesaj:'Total of assets and liabilities is not equal ({{F.01}})', sebep:'There\'s an unassigned account in the {{mali-tablo-yapisi}}.', cozum:'{{OB58}} → check the "unassigned accounts" line. Not a data error.' },
      { mesaj:'Document ... cannot be reversed — period closed', sebep:'The reversal period is closed while {{F.81}} runs.', cozum:'Open the period with {{OB52}}; the 2nd range is used during closing.' },
      { mesaj:'GR/IR account has balance after clearing', sebep:'There are unmatched items.', cozum:'Normal — the timing gap is reclassified with {{F.19}}, the permanent difference is written off with {{MR11}}.' },
    ],

    ipuclari:[
      '**Closing is a checklist discipline.** Write down the order, assign an owner, track status. The ' +
      'difficulty is coordination, not technical work.',
      'During closing, in {{OB52}} **close the 1st range and leave the 2nd range open**: users can\'t post, ' +
      'the closing team can still make corrections.',
      'Run every batch job ({{AFAB}}, {{F.05}}, {{F.13}}, {{F.19}}) in test mode first and compare the result ' +
      'to the previous one. If there\'s an unexpected deviation, find out why.',
      'Put {{F.81}} on the checklist for the first business day of the month. If it\'s forgotten, last ' +
      'month\'s accruals stay standing and this month\'s expense comes out inflated.',
      'Enter temporary and permanent postings with separate document types; at month-end you can see at a ' +
      'glance which ones need to be reversed.',
      'The most effective way to shorten the closing cycle is to parallelize sequential dependencies: bank ' +
      'reconciliation and AA depreciation can be done at the same time.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'T001B', ne:'Period open/close lines via {{OB52}}' },
      { tablo:'BKPF', ne:'Closing document headers; `STODT`/`STGRD` populated for accruals' },
      { tablo:'BSEG', ne:'Correction line items' },
      { tablo:'ACDOCA', ne:'Every closing posting, by ledger' },
      { tablo:'ANLC', ne:'{{AFAB}} depreciation values' },
      { tablo:'BSIS', ne:'Cleared clearing-account items' },
      { tablo:'FAGLFLEXT', ne:'Balance carryforward totals in ECC — not updated in S/4HANA' },
    ],

    commit:
      'Most closing programs are **batch jobs**, and each document is written in its own LUW. The result: ' +
      'even if a run is interrupted midway, the documents it already produced are permanent.\n\n' +
      'That\'s why programs like {{AFAB}}, {{F.05}}, and {{F.13}} **have "repeat" or "restart" modes**: they ' +
      'pick up where they left off, or process only the difference. A run left half-finished isn\'t ' +
      'dangerous, but if it goes unnoticed it leads to an incomplete close — which is why run result lists ' +
      'must be read.',

    belgeNo:
      'Closing documents take their number from their own document type\'s range: **SA** general correction, ' +
      '**AF** depreciation, **AB** general. {{ozel-donem}} postings use the same range too — a special ' +
      'period has **no** separate number range; the distinction lives in the `MONAT` field (13–16).',

    postingLogic:
      'Closing\'s technical backbone is **period control**. On every posting:\n\n' +
      '**1.** The period is computed from `BUDAT` (per the {{T009}} fiscal year variant).\n' +
      '**2.** {{T001B}} is checked for whether that period is open for that **account type**.\n' +
      '**3.** If a specific account-type line exists, it applies; otherwise the **+** line is used.\n' +
      '**4.** If it\'s not in the 1st range, the 2nd range is checked; it looks at whether the user is in the authorization group.\n' +
      '**5.** If it passes, the posting proceeds.\n\n' +
      'Accrual documents additionally write `STODT` (reversal date) and `STGRD` (reason); {{F.81}} looks at ' +
      'these fields to find the documents to reverse.',

    belgeTuru:
      'Using separate document types in closing is good practice: **ZA** for accruals (temporary), **ZK** ' +
      'for provisions (permanent), **ZR** for reclassifications, and so on. That way, which documents need ' +
      'to be reversed at month-end can be seen from a single report.',

    numberRange:
      'The ranges for closing document types must also be opened **for every fiscal year** ({{FBN1}}, ' +
      '{{OBH1}}). The new year\'s ranges must already be open during year-end closing — because balance ' +
      'carryforward produces postings into the new year.',

    accountDetermination:
      'Closing programs pull accounts from different places:\n\n' +
      '• **FX difference accounts** → {{OBA1}} (transaction keys KDF unrealized, KDB realized).\n' +
      '• **GR/IR reclassification accounts** → the reclassification settings in IMG.\n' +
      '• **The retained-earnings transfer account** → the balance carryforward settings.\n' +
      '• **Depreciation accounts** → {{AO90}}.\n' +
      '• **Accrual accounts** → entered by the user.',

    tur:
      '**Configuration:** {{OB52}} period control, {{OB29}} fiscal year variant, {{OB59}} valuation methods, ' +
      '{{OBA1}} FX difference accounts, {{OB58}} financial statement structure, balance carryforward ' +
      'settings, reclassification definitions.\n\n' +
      '**Transaction data:** closing documents.\n\n' +
      'Closing has no master data of its own — it\'s entirely a matter of configuration plus transaction data.',

    transport:
      'The posting period variant, fiscal year variant, valuation methods, FX difference account ' +
      'determination, the FSV, and reclassification settings transport.\n\n' +
      '**But the posting-period ranges in {{OB52}} don\'t transport** — each system manages them separately. ' +
      'That makes sense: the test system and production have different open periods. Opening periods on a ' +
      'new system is a **manual step**, and if it\'s forgotten, no posting can be made at all.',

    img:[
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Posting Periods → Open and Close Posting Periods', not:'{{OB52}} — closing\'s keystone' },
      { yol:'SPRO → … → Fiscal Year → Maintain Fiscal Year Variant', not:'{{OB29}} — number of normal + special periods' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Closing → Valuate → Foreign Currency Valuation → Define Valuation Methods', not:'{{OB59}}' },
      { yol:'SPRO → … → Closing → Valuate → Prepare Automatic Postings for Foreign Currency Valuation', not:'{{OBA1}} — KDF/KDB transaction keys' },
      { yol:'SPRO → … → Closing → Regroup → Regroup Receivables/Payables', not:'{{FAGLF101}} settings' },
      { yol:'SPRO → … → Closing → Carry Forward → Balance Carryforward', not:'{{FAGLGVTR}} — retained-earnings account assignment' },
      { yol:'SPRO → … → Reporting → Financial Statements → Define Financial Statement Versions', not:'{{OB58}} — FSV' },
    ],

    ekstra:[
      { ic:'📅', baslik:'Why do special periods exist?', metin:
        'Financial statements were produced on December 31 and presented to management. In February the ' +
        'auditor asked for a 500,000 TRY correction. Should this correction be posted to December?\n\n' +
        'If it is, **December\'s own figure gets disturbed** and monthly trend analyses stop making sense. ' +
        'If it isn\'t, the year\'s total stays wrong.\n\n' +
        'The solution: {{ozel-donem}}s (13–16). The correction is posted to period 13 — **it enters the ' +
        'year\'s total but doesn\'t disturb December\'s figure**. In {{OB29}}, the fiscal year variant is ' +
        'defined as 12 normal + 4 special periods.\n\n' +
        'Practical use: 13 for audit corrections, 14 for tax adjustments, 15–16 for consolidation.' },

      { ic:'🔁', baslik:'Why can balance carryforward be rerun?', metin:
        '{{FAGLGVTR}} runs at year-end and carries balances into the new year. But after closing is ' +
        'finished, a correction posting can still be entered into the past year (a special period, an audit correction).\n\n' +
        'That makes the carryforward stale. SAP\'s solution: **{{FAGLGVTR}} can be rerun**, and it carries ' +
        'forward only the **difference**. No duplicate carryforward is created.\n\n' +
        'The practical upshot: don\'t hesitate to run balance carryforward early. It\'s already required for ' +
        'postings to be made in the new year, and later corrections flow through automatically.' },
    ],

    notlar:[
      { tip:'warn', baslik:'The priority of the "+" line in OB52', metin:
        'In {{T001B}}, the account type **+** line is a *default*. But if a **specific line exists** for S, ' +
        'D, K, A, or M, then for that account type the specific line applies, not **+**.\n\n' +
        'This is why the complaint "I opened the period on the + line but the vendor posting still throws an ' +
        'error" happens: there\'s a separate line for K, and it\'s closed.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Closing\'s **steps and logic haven\'t changed**; what changed is that some steps have **become ' +
      'unnecessary**, and the closing cycle has gotten shorter. The biggest win: the FI–CO reconciliation and ' +
      'totals-table-rebuild steps disappear.',

    eccFarklari:[
      { konu:'FI–CO reconciliation', ecc:'A separate closing step — a periodic reconciliation program', s4:'**Unnecessary** — structurally reconciled because they sit on the same line' },
      { konu:'Totals table', ecc:'{{FAGLFLEXT}} gets updated; a rebuild program if it breaks', s4:'**None** — balances are calculated on the fly from {{ACDOCA}}' },
      { konu:'Balance carryforward', ecc:'{{F.16}} (classic) / {{FAGLGVTR}} (New G/L)', s4:'{{FAGLGVTR}} — by ledger' },
      { konu:'Fixed asset closing', ecc:'{{AJAB}} mandatory, strict order', s4:'Simplified; some checks became automatic' },
      { konu:'Closing management', ecc:'Schedule Manager (SCMA)', s4:'**Financial Closing Cockpit** (Fiori) — task templates, automatic execution' },
      { konu:'Closing duration', ecc:'Typically 5–10 business days', s4:'Noticeably shorter thanks to real-time reporting' },
      { konu:'Depreciation', ecc:'{{AFAB}}', s4:'FAA_DEPRECIATION_POST; every area posts in real time' },
    ],

    universalJournal:
      'For closing, the {{evrensel-kayit-defteri}} delivers three concrete gains:\n\n' +
      '**1. FI–CO reconciliation disappears.** This step, performed at every close in ECC, becomes ' +
      'unnecessary because the FI and CO line are the same posting.\n\n' +
      '**2. Totals-table maintenance ends.** Because balances are calculated on the fly, the "the totals ' +
      'table broke, let\'s rebuild it" scenario goes away.\n\n' +
      '**3. Interim reports are real-time.** A current balance sheet can be pulled even while closing is ' +
      'still in progress; this is what makes a "soft close" approach possible.',

    kalkanTcodes:[
      { eski:'FI–CO reconciliation programs', yeni:'—', not:'Became unnecessary' },
      { eski:'Totals table rebuild', yeni:'—', not:'No totals table' },
      { eski:'{{F.16}}', yeni:'{{FAGLGVTR}}', not:'The New G/L program' },
      { eski:'{{AFAB}}', yeni:'FAA_DEPRECIATION_POST', not:'AFAB redirects to it' },
      { eski:'SCMA (Schedule Manager)', yeni:'Financial Closing Cockpit', not:'Fiori-based, template-driven' },
    ],

    fiori:[
      { ad:'Financial Closing Cockpit', aciklama:'Defines closing tasks as templates, enforces dependencies, tracks progress. Closing moving off Excel and into the system.' },
      { ad:'Trial Balance', aciklama:'A real-time trial balance; current even while closing is in progress.' },
      { ad:'Financial Statement', aciklama:'Replaces {{F.01}}; the FSV hierarchy is visual, with a one-click drill from line to document.' },
      { ad:'Post Depreciation', aciklama:'Replaces {{AFAB}}; run status and log are visual.' },
      { ad:'Run Foreign Currency Valuation', aciklama:'Replaces {{F.05}}.' },
      { ad:'Manage Journal Entries', aciklama:'Manages closing corrections as a worklist.' },
    ],

    compatibilityViews:[
      '{{FAGLFLEXT}}, {{GLT0}} — the totals tables are {{uyumluluk-view}}s; **no longer written to**.',
      '{{BSIS}}, {{BSAS}} — the G/L open-item indexes are views.',
      '{{T001B}}, {{T009}} — the configuration tables **still exist physically**, unchanged.',
      'Legacy closing programs that write to a totals table need to be reviewed during migration.',
    ],

    performans:
      'Most closing programs run against {{ACDOCA}} and got faster. But the real gain is **on the process ' +
      'side**: because reconciliation steps disappear and reports are produced instantly, the closing ' +
      'calendar shortens. Many companies cut their closing time by several days with the S/4HANA move.',

    bestPractices:[
      'Move closing into the **Financial Closing Cockpit**; an Excel checklist is error-prone and doesn\'t ' +
      'enforce dependencies.',
      'Remove the steps that are now unnecessary (FI–CO reconciliation, totals-table maintenance) from the ' +
      'checklist — reusing the old list unchanged after migration wastes time.',
      'Evaluate a "soft close" approach thanks to real-time reporting: a current statement can be pulled ' +
      'mid-month too.',
      'Clean up clearing accounts ({{gr-ir}}, bank clearing accounts) before migration; dirty balances ' +
      'migrate along with everything else.',
      'If {{paralel-defter}} is in use, verify that {{FAGLGVTR}} is run for every ledger.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'January 2027 month-end close: 10 steps, 3 days, 2 surprises',
    hikaye:
      'January closing at **Marmara Textiles Inc.** The accounting manager\'s checklist has 10 main steps, ' +
      'and the target is 3 business days. This scenario shows the closing sequence, why each step falls ' +
      'where it does, and how the two surprises that came up along the way were resolved.',
    veriler:[
      { k:'Company code', v:'1000 · Posting period variant 1000' },
      { k:'Period to close', v:'01 / 2027 (January)' },
      { k:'Fiscal year variant', v:'12 normal + 4 special periods' },
      { k:'Target', v:'3 business days — start February 1, finish February 3' },
      { k:'Team', v:'AP, AR, fixed asset, bank, and G/L accounting specialists + the manager' },
    ],

    adimlar:[
      { baslik:'Step 0 — Last month\'s accruals are reversed', tcode:'F.81',
        aciklama:'**The first job of the month.** If December\'s accruals aren\'t undone, January\'s expense comes out inflated.',
        girdi:[
          { alan:'Reversal date range', deger:'01.01.2027 – 31.01.2027' },
          { alan:'Test result', deger:'7 accrual documents to be reversed · total 340,000 TRY' },
          { alan:'Production run', deger:'7 documents reversed ✓' },
        ],
        not:'If this step is skipped, the expenses estimated in December stand **again** in January, and ' +
             'January\'s expense shows up 340,000 TRY too high. It must be the first item on the checklist.' },

      { baslik:'Step 1 — The logistics period is closed', tcode:'OB52',
        aciklama:'The MM period is closed **before** FI. Otherwise stock movements keep coming in and the ' +
                 'GR/IR analysis becomes invalid.',
        girdi:[
          { alan:'MM period (MMPV)', deger:'Opened to February — January MM postings stopped' },
          { alan:'{{OB52}} account type **M**', deger:'January closed' },
          { alan:'Other account types', deger:'Still open — the FI close is ongoing' },
        ],
        not:'The order is critical: doing GR/IR analysis while MM is still open invalidates the result once ' +
             'more goods receipts come in.' },

      { baslik:'Step 2 — All invoices are processed', tcode:'MRBR',
        aciklama:'The AP and AR teams post every pending invoice; blocked invoices are released.',
        girdi:[
          { alan:'Blocked MM invoices', deger:'14 invoices → 11 released, 3 remained in dispute' },
          { alan:'Pending AP invoices', deger:'All posted' },
          { alan:'SD invoices', deger:'No deliveries left waiting to be billed via {{VF04}} ✓' },
          { alan:'{{VBRK}} check', deger:'No invoices with `RFBSK` = "A" — all have posted to FI ✓' },
        ],
        not:'A missing invoice means a missing expense/revenue. The following steps are meaningless until ' +
             'this one is complete.' },

      { baslik:'Step 3 — GR/IR analysis and cleanup', tcode:'F.13',
        aciklama:'Three stages: automatic clearing → permanent difference write-off → reclassification.',
        girdi:[
          { alan:'{{F.13}} test → production', deger:'1,180 items cleared automatically' },
          { alan:'{{MR11}}', deger:'Small permanent differences written off: 42 items, 18,400 TRY' },
          { alan:'Remaining balance', deger:'**280,000 TRY** — a genuine timing gap (goods arrived, invoice hasn\'t)' },
        ],
        fis:{ baslik:'Document 1000008801 — GR/IR reclassification ({{F.19}})', belgeTuru:'SA', tarih:'31.01.2027',
          satirlar:[
            { hesap:'159', ad:'GR/IR account', borc:280000, not:'Temporarily cleared out' },
            { hesap:'326', ad:'Goods received, not yet invoiced', alacak:280000, not:'A balance-sheet presentation account' },
          ], not:'**To be reversed** — automatically undone on 01.02.2027. For presentation only.' } },

      { baslik:'Step 4 — Depreciation is run', tcode:'AFAB',
        aciklama:'**The first surprise shows up here.** The test run comes out with a total very different from last month.',
        girdi:[
          { alan:'Test result', deger:'1,891 assets · **312,400 TRY**' },
          { alan:'Last month', deger:'284,500 TRY — **27,900 TRY more**' },
          { alan:'Investigation', deger:'{{AW01N}} → 6 new assets were capitalized in January (a production-line investment)' },
          { alan:'Decision', deger:'The deviation is **explained and correct** → run in production mode' },
        ],
        fis:{ baslik:'Document 1000008812 — January depreciation', belgeTuru:'AF', tarih:'31.01.2027',
          satirlar:[
            { hesap:'730', ad:'General production expense — depreciation', borc:248000 },
            { hesap:'770', ad:'General administrative expense — depreciation', borc:64400 },
            { hesap:'257', ad:'Accumulated depreciation', alacak:312400 },
          ], not:'**A permanent entry** — not reversed.' },
        not:'Comparing the test result to last month is the single most valuable habit in closing. A ' +
             'deviation isn\'t always bad, but it must be explainable.' },

      { baslik:'Step 5 — Bank reconciliation', tcode:'FEBAN',
        aciklama:'Every statement is processed, clearing accounts are cleaned up, and a reconciliation statement is produced.',
        girdi:[
          { alan:'Pending statement lines', deger:'0 ✓ — all processed' },
          { alan:'Outgoing clearing account (102091)', deger:'Open item: 185,000 TRY (payments from Jan 28–31)' },
          { alan:'Incoming clearing account (102081)', deger:'Open item: 22,000 TRY' },
          { alan:'Uncollected checks ({{FCHN}})', deger:'96,000 TRY — matched against account 103 ✓' },
          { alan:'Result', deger:'All 4 bank accounts reconciled ✓' },
        ] },

      { baslik:'Step 6 — Foreign currency valuation', tcode:'F.05',
        aciklama:'**The second surprise shows up here.** The program can\'t find a rate.',
        girdi:[
          { alan:'First attempt', deger:'Error: "Exchange rate for USD/TRY on 31.01.2027 not found"' },
          { alan:'Diagnosis', deger:'Checking {{TCURR}} → the January 31 rate was never fed in (the automatic feed had broken)' },
          { alan:'Fix', deger:'The 31.01.2027 rates were entered by hand with {{OB08}}: EUR 38.80 · USD 35.45' },
          { alan:'Valuation method', deger:'Z001 — average rate (M), to be reversed' },
          { alan:'Test → production', deger:'218 items valued' },
        ],
        fis:{ baslik:'Document 1000008834 — Currency valuation', belgeTuru:'SA', tarih:'31.01.2027',
          satirlar:[
            { hesap:'656', ad:'FX loss', borc:142000, not:'Unrealized' },
            { hesap:'320', ad:'Trade payables — valuation difference', alacak:98000 },
            { hesap:'120', ad:'Trade receivables — valuation difference', alacak:44000 },
          ], not:'**To be reversed** — undone on 01.02.2027. The difference hasn\'t been realized yet; the ' +
                 'real difference is finalized at the moment of payment/collection.' },
        not:'A broken rate feed is a silent failure — nobody notices, and it blows up at closing time. A ' +
             '"are the rates current?" item was added to the checklist.' },

      { baslik:'Step 7 — Accrual and provision entries', tcode:'FBS1',
        aciklama:'Income/expenses that have arisen but whose documents haven\'t arrived, and provisions.',
        girdi:[
          { alan:'Accruals ({{FBS1}} — temporary)', deger:'Electricity 45,000 · water 8,000 · consulting 60,000 · total **113,000 TRY**' },
          { alan:'Reversal date', deger:'01.02.2027 — to be undone with {{F.81}}' },
          { alan:'Provisions ({{FB50}} — permanent)', deger:'Doubtful receivables 120,000 TRY' },
        ],
        fis:{ baslik:'Document 1000008845 — Electricity accrual', belgeTuru:'SA', tarih:'31.01.2027',
          satirlar:[
            { hesap:'770', ad:'General administrative expense — electricity', borc:45000 },
            { hesap:'381', ad:'Accrued expenses', alacak:45000 },
          ], not:'Entered with {{FBS1}} → **automatically** reversed on 02.01. When the real invoice arrives ' +
                 'in February, there\'s no double posting.' },
        not:'The accrual (temporary) vs. provision (permanent) distinction is clear here: the electricity ' +
             'invoice **is coming**, whereas whether the doubtful receivable will be collected is **uncertain**.' },

      { baslik:'Step 8 — Reclassifications', tcode:'FAGLF101',
        aciklama:'Items whose amount is right but which sit on the wrong side of the balance sheet are moved.',
        girdi:[
          { alan:'Debit-balance customers', deger:'3 customers overpaid → moved to **the vendor side**, 68,000 TRY' },
          { alan:'Credit-balance vendors', deger:'2 vendors → to the customer side, 15,000 TRY' },
          { alan:'Long-term receivables', deger:'Maturity beyond one year: 240,000 TRY → to the fixed-asset side' },
          { alan:'Reversal', deger:'01.02.2027 — for presentation, to be undone' },
        ],
        not:'A customer who overpaid no longer owes you — you owe them. Showing them on the asset side of ' +
             'the balance sheet would be misleading.' },

      { baslik:'Step 9 — Checks and reconciliations', tcode:'FBL3N',
        aciklama:'The final verification pass before closing.',
        girdi:[
          { alan:'Sub-ledger reconciliation', deger:'{{FBL1N}} total = account 320 balance ✓ · {{FBL5N}} = 120 ✓' },
          { alan:'Clearing accounts', deger:'GR/IR reclassified ✓ · bank clearing accounts explained ✓' },
          { alan:'Trial balance', deger:'Debit total = credit total ✓' },
          { alan:'Depreciation', deger:'The January run is complete ✓' },
          { alan:'{{SM13}}', deger:'No stalled updates ✓' },
        ] },

      { baslik:'Step 10 — The period is closed and statements are pulled', tcode:'OB52',
        aciklama:'Closing\'s final step. The 1st range is closed first, leaving room for correction, and ' +
                 'then it\'s closed completely.',
        girdi:[
          { alan:'{{OB52}} — 1st range', deger:'Every account type (S, D, K, A, M) → moved to February' },
          { alan:'{{OB52}} — 2nd range', deger:'January left open, authorization group FI01 (so the closing team can still make corrections)' },
          { alan:'Financial statements', deger:'{{F.01}} → the balance sheet and income statement produced' },
          { alan:'Check', deger:'Assets = liabilities+equity ✓ · no unassigned accounts ✓' },
          { alan:'3 days later', deger:'The 2nd range was closed too — January is fully locked' },
        ],
        not:'Two-stage closing is the standard method: users are stopped immediately, and the closing team ' +
             'gets a few extra days of room to correct.' },
    ],

    sonuc:
      '**January closing was completed in 3 business days.** Two surprises came up, and both were caught ' +
      'thanks to a control:\n\n' +
      '• **The depreciation deviation** — noticed because the test result was compared against last month; ' +
      'the cause was new investments, and the deviation was explainable.\n' +
      '• **The missing exchange rate** — the automatic feed had broken and nobody had noticed. A new item ' +
      'was added to the checklist.\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. The order isn\'t arbitrary.** MM must close first (otherwise the GR/IR analysis is invalid), ' +
      'depreciation must run after acquisitions, and valuation must happen after every item is posted. If ' +
      'the order breaks, the work has to be redone.\n\n' +
      '**2. The temporary–permanent distinction is vital.** Accruals, valuation, and reclassification **are ' +
      'reversed**; depreciation and provisions **stay**. Mixing them up produces either a double expense or a missing one.\n\n' +
      '**3. Run batch jobs in test mode and compare them to last month.** This is the single most valuable ' +
      'habit in closing; it\'s how one of the two surprises was caught.\n\n' +
      '**4. Closing is a coordination job, not a technical one.** The difficulty isn\'t running {{AFAB}}, ' +
      'it\'s getting 10 steps done in the right order, by the right people, at the right time. That\'s why ' +
      'moving the checklist into the system (the Financial Closing Cockpit) is the highest-return improvement.',
  },

  },
});
