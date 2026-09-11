/* ==========================================================================
   content/fi-en/fi-temelleri.js — English body for "SAP FI Temelleri"
   Same conventions as content/fi-en/genel-muhasebe.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'fi-temelleri',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'FI (Financial Accounting) is the SAP module responsible for accounting **toward the outside world**. The filing ' +
      'sent to the tax office, the balance sheet shown to the bank, the income statement shown to shareholders — all of ' +
      'it comes out of here.\n\n' +
      'FI\'s defining trait: **every module\'s path in SAP eventually leads to FI.** Goods are received in the ' +
      'warehouse, an invoice is issued in sales, payroll is calculated in HR — all of it turns into an accounting ' +
      'document in FI. That\'s why FI is the busiest intersection in the system.',

    neden:
      'Three reasons make FI mandatory:\n\n' +
      '**Statutory bookkeeping.** Every country has accounting law, and FI produces documents that comply with it.\n\n' +
      '**Single source of truth.** Sales says "we sold 10 million," production says "our cost went down." None of it ' +
      'means anything until it\'s compared against the FI figures.\n\n' +
      '**Auditability.** Nothing in FI is ever deleted. Every document carries who posted it, when, and on what basis. ' +
      'That is where the trail an auditor looks for lives.',

    sirketOnemi:
      'On a SAP project, FI is usually the **first module to go live**, because no other module can post accounting ' +
      'entries without it. If MM goes live and FI isn\'t ready, a goods receipt can\'t even be posted.\n\n' +
      'For a consultant, the consequence is this: an FI consultant doesn\'t just know FI. They know which account a ' +
      'goods receipt from MM lands on ({{OBYC}}), where an SD invoice\'s revenue posts to ({{VKOA}}), and how CO picks ' +
      'up the cost. This is exactly where a good FI consultant is set apart from the rest.',

    gercekHayat:
      'Picture a grocery chain. In the morning, 500 crates of milk arrive at the warehouse ({{MIGO}}); by evening, 480 ' +
      'crates have been sold at the register ({{VF01}}); at month-end, the supplier gets paid ({{F110}}); staff get ' +
      'paid.\n\n' +
      'An accountant doesn\'t type in a single one of these four events by hand. Each is posted in its own module and ' +
      'lands in FI **automatically**. The accountant\'s job isn\'t to enter postings — it\'s to verify the postings ' +
      'that landed on their own, and to close the period. This is the point where SAP changes how the work is actually ' +
      'done.',

    muhasebeMantigi:
      'Everything FI produces is a single kind of object: an **FI document**. However it arrives — typed by hand, or ' +
      'dropped in from MM — the result is always the same shape:\n\n' +
      '**One header** ({{BKPF}}) + **at least two line items** ({{BSEG}}), with debit totaling credit.\n\n' +
      'That\'s why, before asking "how is this transaction done in SAP?", you need to ask **"which FI document does ' +
      'this transaction produce?"** Know the document, and you can solve both the transaction and the error.',

    kavramlar: ['sirket-kodu', 'hesap-plani', 'belge-turu', 'kayit-anahtari', 'mutabakat-hesabi',
                'ana-muhasebe', 'muavin-defter', 'evrensel-kayit-defteri'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Data enters FI in two ways: **manual posting** and **automatic flow from integration**. In a mature SAP ' +
      'implementation, the large majority of postings come the second way; manual posting is the exception, usually ' +
      'reserved for corrections, accruals, or bank transactions.',

    roller: [
      { rol:'Procurement / warehouse (MM)', gorev:'Places orders, receives goods. A goods receipt gives rise to an inventory posting and a {{gr-ir}} entry in FI.' },
      { rol:'Sales (SD)', gorev:'Issues invoices. Once the invoice transfers to accounting, a customer receivable and a revenue posting are created.' },
      { rol:'Accounting specialist', gorev:'Enters manual postings, checks documents that land automatically, performs reconciliation.' },
      { rol:'Treasury / Finance', gorev:'Runs payments ({{F110}}), processes bank statements ({{FEBAN}}).' },
      { rol:'Accounting manager', gorev:'Opens/closes periods ({{OB52}}), approves the financial statements.' },
      { rol:'FI consultant', gorev:'Designs the chart of accounts, document types, {{hesap-belirleme}} rules, and resolves errors.' },
    ],

    diyagram: {
      type: 'flow',
      baslik: 'Data\'s path into FI — from source to financial statements',
      adimlar: [
        { ic:'🏭', rol:'Source modules', baslik:'The event is posted in its own module',
          aciklama:'An MM goods receipt ({{MIGO}}), MM invoice verification ({{MIRO}}), an SD invoice ({{VF01}}), HR payroll.',
          cikti:'Module document (material document, SD invoice…)', ok:'accounting is triggered' },
        { ic:'🧭', rol:'System', baslik:'Account determination rules run',
          aciklama:'Which G/L account it posts to is found from the {{OBYC}} / {{VKOA}} / {{OB40}} tables. If a rule is ' +
                   'missing, the error happens right here and the document never posts.',
          cikti:'Account numbers', ok:'the document is generated' },
        { ic:'📄', rol:'System', baslik:'An FI document is created',
          aciklama:'{{BKPF}} header + {{BSEG}} line items + {{ACDOCA}} universal lines. The document number is ' +
                   'assigned at this moment.',
          cikti:'FI document number', ok:'it spreads into the sub-ledgers' },
        { ic:'📚', rol:'System', baslik:'The sub-ledgers are updated',
          aciklama:'A vendor line drops into {{BSIK}}, a customer line into {{BSID}}, as an open item. It reflects ' +
                   'into general ledger through the {{mutabakat-hesabi}}.',
          cikti:'Open items', ok:'they get checked' },
        { ic:'🔍', rol:'Accounting', baslik:'Verification and reconciliation',
          aciklama:'Line items via {{FBL1N}}, {{FBL5N}}, {{FBL3N}}; the document itself via {{FB03}}.',
          cikti:'Verified data', ok:'at period end' },
        { ic:'🔒', rol:'Accounting manager', baslik:'The period closes, statements are produced',
          aciklama:'The period is closed via {{OB52}}, and the balance sheet and income statement are pulled via {{F.01}}.',
          cikti:'Financial statements' },
      ],
    },

    adimlar: [
      { rol:'MM / SD / HR', eylem:'The business event is posted in its own module', sistem:'{{MIGO}}, {{MIRO}}, {{VF01}}' },
      { rol:'System', eylem:'The account determination rule is applied', sistem:'{{OBYC}}, {{VKOA}}, {{OB40}} → {{T030}}' },
      { rol:'System', eylem:'The FI document and its number are created', sistem:'{{BKPF}}, {{BSEG}}, {{ACDOCA}}' },
      { rol:'Accounting', eylem:'Transactions needing a manual posting are entered', sistem:'{{FB50}}, {{FB60}}, {{FB70}}, {{F-02}}' },
      { rol:'Accounting', eylem:'Open items are cleared', sistem:'{{F-32}}, {{F-44}}, {{F.13}}' },
      { rol:'Accounting', eylem:'Period-end transactions are posted', sistem:'{{AFAB}}, {{F.05}}, {{F.19}}' },
      { rol:'Accounting manager', eylem:'The period is closed and reported', sistem:'{{OB52}}, {{F.01}}' },
    ],

    veriAkisi: {
      nereden: 'MM (goods movements, invoice verification), SD (sales invoices), HR (payroll), Treasury, manual FI postings, and bank statements.',
      nereye: 'Into general ledger accounts → {{ACDOCA}} → financial statements; also into {{maliyet-yeri}} and {{kar-merkezi}} reports on the CO side.',
      tetikleyen: 'The source module\'s document. The `AWKEY` field on the FI document header holds which source document it came from — that field is the bridge.',
      sonraki: 'Tax filing, consolidation, management reporting, audit.',
    },

    notlar: [
      { tip:'tip', baslik:'AWKEY — the field that finds the missing link', metin:
        'Whenever you\'re trying to figure out where an FI document came from, look at the `AWTYP` (source type) and ' +
        '`AWKEY` (source document key) fields on {{BKPF}}. `AWTYP = RMRP` means an {{MIRO}} invoice; `VBRK` means an SD ' +
        'invoice. It\'s one of the first places to look during error analysis.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Every posting in FI sits on the same skeleton. Below, you\'ll see the same economic event land in FI through ' +
      'three different doors — the posting is identical, only the door differs.',

    etkilenenHesaplar: [
      { hesap:'Reconciliation accounts (320 Trade payables, 120 Trade receivables)', tur:'Balance sheet', neden:'Reflected automatically from the sub-ledger. **Cannot be posted to directly** — you enter the vendor/customer number, and SAP finds the account from the master record.' },
      { hesap:'{{gr-ir}} account (a clearing account like 159/391)', tur:'Balance sheet', neden:'Carries the time gap between goods receipt and invoice receipt. Zeroed out once both have happened.' },
      { hesap:'VAT accounts (191 / 391)', tur:'Balance sheet', neden:'Once a {{vergi-kodu}} is entered, SAP adds the line automatically — it is never typed by hand.' },
      { hesap:'Expense accounts (7xx)', tur:'Income statement', neden:'Works integrated with CO: a {{maliyet-yeri}} is required at posting, or the {{OKB9}} default kicks in.' },
      { hesap:'Bank clearing accounts', tur:'Balance sheet', neden:'Carries the gap between a payment posting and the money actually leaving the bank ({{banka-ara-hesabi}}).' },
    ],

    fisler: [
      { baslik:'Door 1 — Manual FI posting: rent invoice ({{FB60}})',
        belgeTuru:'KR', tarih:'10.04.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — rent', borc:50000, not:'Cost center required' },
          { hesap:'191', ad:'Deductible VAT', borc:10000, not:'Automatic from the tax code' },
          { hesap:'320', ad:'Trade payables (V-2001)', alacak:60000, not:'{{mutabakat-hesabi}}' },
        ],
        not:'There is no purchase order and no goods receipt — that\'s why it goes straight into FI without touching MM. This is the standard path for services like rent, consulting, and utilities.' },

      { baslik:'Door 2 — Automatic from MM: goods receipt ({{MIGO}})',
        belgeTuru:'WE', tarih:'12.04.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'153', ad:'Trade goods (inventory)', borc:80000, not:'{{OBYC}} → BSX transaction key' },
          { hesap:'159', ad:'GR/IR — goods received, invoice not yet received', alacak:80000, not:'{{OBYC}} → WRX transaction key' },
        ],
        not:'The accountant **doesn\'t even see** this posting; it is generated when the warehouse worker posts the goods receipt. {{OBYC}} determines the accounts. The vendor liability isn\'t posted yet because the invoice hasn\'t arrived — the {{gr-ir}} account carries that gap.' },

      { baslik:'Door 2 continued — the invoice arrives ({{MIRO}})',
        belgeTuru:'RE', tarih:'20.04.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR account', borc:80000, not:'Closes the credit from the goods receipt' },
          { hesap:'191', ad:'Deductible VAT', borc:16000 },
          { hesap:'320', ad:'Trade payables (V-3001)', alacak:96000 },
        ],
        not:'The {{gr-ir}} account is now zeroed out: the goods arrived, and so did the invoice. Its balance should be close to zero at period end; if it isn\'t, it gets analyzed with {{F.19}}.' },

      { baslik:'Door 3 — Automatic from SD: sales invoice ({{VF01}})',
        belgeTuru:'RV', tarih:'25.04.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables (C-5001)', borc:120000, not:'{{mutabakat-hesabi}}' },
          { hesap:'600', ad:'Domestic sales', alacak:100000, not:'from {{VKOA}} account determination' },
          { hesap:'391', ad:'Calculated VAT', alacak:20000 },
        ],
        not:'The FI document is generated automatically the moment the SD invoice is posted. If it doesn\'t, the cause is almost always a missing account determination in {{VKOA}}; a retransfer is attempted with {{VF02}}.' },
    ],

    tHesaplar: [
      { hesap:'Trade payables (reconciliation)', kod:'320',
        borc:[{ ad:'F110 payment', tutar:60000 }],
        alacak:[{ ad:'Rent invoice', tutar:60000 }, { ad:'Goods invoice', tutar:96000 }],
        not:'Balance = total owed to vendors' },
      { hesap:'GR/IR account', kod:'159',
        borc:[{ ad:'Invoice entry (MIRO)', tutar:80000 }],
        alacak:[{ ad:'Goods receipt (MIGO)', tutar:80000 }],
        not:'Should be zero at period end' },
      { hesap:'Trade receivables (reconciliation)', kod:'120',
        borc:[{ ad:'SD invoice', tutar:120000 }],
        alacak:[{ ad:'Collection', tutar:70000 }],
        not:'Balance = uncollected receivable' },
    ],

    notlar: [
      { tip:'warn', baslik:'If you try posting directly to a reconciliation account', metin:
        'You get "Account 320000 cannot be directly posted to." This isn\'t a malfunction, it\'s by design: it keeps ' +
        'the sub-ledger consistent with the general ledger. The posting must go through the vendor/customer number.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'FI is not a single piece; it\'s made of sub-components, each with its own master data and transaction codes. ' +
      'When a SAP FI consultant job posting says "FI-AP and FI-AA experience," this is the split it means.',
    liste: [
      { ad:'FI-GL — General Ledger',
        aciklama:'The center where financial statements are produced. Every sub-component reflects here through a {{mutabakat-hesabi}}.',
        neZaman:'Mandatory in every implementation. No other component works without it.',
        tcodes:['FS00','FB50','FBL3N','FAGLL03'] },

      { ad:'FI-AP — Accounts Payable',
        aciklama:'Manages the company\'s liabilities: vendor master data, invoice entry, payment, aging. Tightly integrated with procurement (MM).',
        neZaman:'Whenever the company buys goods or services from outside — which is to say, always.',
        tcodes:['FB60','FBL1N','F110','F-53'] },

      { ad:'FI-AR — Accounts Receivable',
        aciklama:'Manages the company\'s receivables: customer master data, invoices, collections, {{ihtar}}. Integrated with sales (SD).',
        neZaman:'Whenever the company sells on credit. Lightly used at businesses that only work cash-up-front.',
        tcodes:['FB70','FBL5N','F-28','F150'] },

      { ad:'FI-AA — Asset Accounting',
        aciklama:'Manages a fixed asset\'s entire life from acquisition to retirement, and its {{amortisman}}. Thanks to ' +
                 'the {{amortisman-alani}}, the same asset can be valued separately for commercial and tax purposes.',
        neZaman:'Whenever there are multi-year assets like machinery, buildings, or vehicles. Lightly used at a small company that only rents its office.',
        tcodes:['AS01','AW01N','ABZON','AFAB'] },

      { ad:'FI-BL — Bank Accounting',
        aciklama:'{{ev-bankasi}} definition, check management, bank statement processing, and posting cash movements.',
        neZaman:'Mandatory whenever automatic payment ({{F110}}) or an electronic bank statement is in use.',
        tcodes:['FI12','FF67','FEBAN','FCHN'] },

      { ad:'FI — Tax on Sales/Purchases',
        aciklama:'The {{vergi-kodu}} structure, base-amount calculation, and tax account determination. Not a separate sub-module — a layer spread across FI.',
        neZaman:'Mandatory in every country; requires country-specific configuration.',
        tcodes:['FTXP','OB40','F.12'] },
    ],

    karsilastirmaBasliklar: ['FI-AP (Payables)', 'FI-AR (Receivables)'],
    karsilastirma: [
      ['What it tracks', 'The company\'s **liabilities**', 'The company\'s **receivables**'],
      ['Master data', '{{LFA1}} / {{LFB1}} (vendor)', '{{KNA1}} / {{KNB1}} (customer)'],
      ['Open item table', '{{BSIK}} / {{BSAK}}', '{{BSID}} / {{BSAD}}'],
      ['Integrated module', 'MM — procurement', 'SD — sales'],
      ['Main transaction', '{{FB60}} invoice, {{F110}} payment', '{{FB70}} invoice, {{F-28}} collection'],
      ['Line-item report', '{{FBL1N}}', '{{FBL5N}}'],
      ['Typical period-end job', 'Payables aging, {{gr-ir}} analysis', 'Receivables aging, {{ihtar}}'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    anlatim:
      'Below are the three transaction codes anyone new to FI should learn first. {{FB03}} matters most: every error ' +
      'diagnosis begins on that screen.',
    liste: [
      { kod:'FB03', ad:'Display document — FI\'s X-ray machine',
        amac:'Shows an FI document with its header, line items, tax lines, and any linked documents.',
        neZaman:'In every error analysis, every reconciliation, every moment you ask "where did this figure come from?"',
        adimlar:[
          { baslik:'Enter the company code, document number, and fiscal year',
            aciklama:'This triple ({{BKPF}}\'s primary key) uniquely identifies the document. If you leave out the year, the system asks for it.' },
          { baslik:'Review the line-item list',
            aciklama:'Each line\'s account, debit/credit direction, and amount is shown. Double-clicking a line opens the detail screen.' },
          { baslik:'Click *Document header*',
            aciklama:'{{belge-turu}}, posting date, document date, the user who posted it, and the source document reference (`AWKEY`) are here.' },
          { baslik:'Use the *Environment → Document flow / Related documents* menu',
            aciklama:'Shows which MM/SD document the document arose from and which CO document it produced. The first place to check in integration errors.' },
          { baslik:'See the history via *Environment → Change documents*',
            aciklama:'Who changed what and when is read from the {{CDHDR}} / {{CDPOS}} tables.' },
        ],
        ekranAkisi:[
          { ekran:'Entry screen', islem:'Company code 1000, document no 100000001, fiscal year 2026' },
          { ekran:'Line item list', islem:'Lines are shown; the debit/credit total is at the bottom' },
          { ekran:'Line item detail (double-click)', islem:'Due date, assignment, cost center, tax code, payment block' },
          { ekran:'Document header', islem:'Document type, dates, user, reference' },
        ],
        alanlar:{ zorunlu:['Company code','Document number','Fiscal year'], opsiyonel:['Display layout'] },
        hatalar:[
          { mesaj:'Document ... does not exist in company code ...', sebep:'The document is in a different company code, or a different fiscal year.', cozum:'Try a different fiscal year; if unsure, search {{BKPF}} via {{FBL3N}} or {{SE16N}}.' },
          { mesaj:'No authorization to display documents in company code ...', sebep:'The F_BKPF_BUK authorization object is missing.', cozum:'Run {{SU53}} and hand the resulting screen to the authorization team.' },
        ],
        ipucu:'If you don\'t know the document number, double-clicking a line in the {{FBL1N}}/{{FBL3N}}/{{FBL5N}} reports drops you into {{FB03}} too. In practice, document numbers aren\'t memorized — you get to them from a report.',
        ilgili:['FB02','FB08','FBL3N','SE16N'] },

      { kod:'FB50', ad:'G/L posting entry',
        amac:'Enters a general ledger posting on a single, table-style screen.',
        neZaman:'For manual corrections, accruals, provisions, and reclassification postings.',
        adimlar:[
          { baslik:'Enter the document date, posting date, and company code',
            aciklama:'The posting date determines the period; if it falls in a closed period, the posting can\'t go through.' },
          { baslik:'Enter the lines: account, D/C, amount',
            aciklama:'If a tax code is entered, SAP adds the tax line on its own.' },
          { baslik:'Get the balance indicator to green', aciklama:'The posting cannot happen until {{belge-denkligi}} is satisfied.' },
          { baslik:'Simulate, then post', aciklama:'Simulation shows every line the system will add, before you commit to anything.' },
        ],
        alanlar:{
          zorunlu:['Document date','Posting date','Company code','G/L account','Debit/Credit','Amount'],
          opsiyonel:['Reference','Document header text','Cost center','Tax code','Assignment (`ZUONR`)'] },
        hatalar:[
          { mesaj:'Posting period 004 2026 is not open', sebep:'The period the posting date falls into is closed.', cozum:'Open the period with {{OB52}}, or move the posting date into an open period.' },
          { mesaj:'Account 320000 cannot be directly posted to', sebep:'The account is a {{mutabakat-hesabi}}.', cozum:'Use {{FB60}} and enter the vendor number instead.' },
          { mesaj:'Field Cost Center is a required field for G/L account ...', sebep:'The account\'s {{alan-durumu}} group makes cost center mandatory.', cozum:'Enter a cost center, or define a default with {{OKB9}}.' },
        ],
        ilgili:['F-02','FV50','FB03','FB08'] },

      { kod:'FS00', ad:'G/L account master data',
        amac:'Creates, changes and displays a G/L account. Chart-of-accounts and company-code segments sit on one screen.',
        neZaman:'When a new account is needed, and when you need to understand how an existing one behaves.',
        adimlar:[
          { baslik:'Enter the account number and company code' },
          { baslik:'*Type/description* tab', aciklama:'Account group; balance sheet vs. income statement; in S/4HANA, the account type (Balance Sheet / Primary Costs / Secondary Costs).' },
          { baslik:'*Control data* tab', aciklama:'Currency, {{vergi-kodu}} category, {{acik-kalem-yonetimi}}, line-item display, reconciliation account type.' },
          { baslik:'*Create/bank/interest* tab', aciklama:'The {{alan-durumu}} group — decides which field is mandatory on the posting screen.' },
        ],
        ipucu:'Whenever you ask "why is this field mandatory during posting?", the answer is almost always right here, in the field status group.',
        hatalar:[
          { mesaj:'Open item management cannot be changed; account has postings', sebep:'Open item management can\'t be changed once the account has movements.', cozum:'Zero out the account (carry the balance forward), convert it programmatically, or open a new account.' },
        ],
        ilgili:['FSP0','FSS0','OBD4','FBL3N'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'FI\'s table architecture has three layers: **document** (header + line item), **master data**, and ' +
      '**index/totals**. S/4HANA largely eliminated the third layer, moving everything into {{ACDOCA}}.',
    liste: [
      { ad:'BKPF', baslik:'Document header',
        tutar:'The document\'s identity and origin: number, type, dates, user, reference, source document key.',
        olusturan:'Every posted transaction',
        guncelleyen:'{{FB50}}, {{FB60}}, {{FB70}}, {{MIRO}}, {{VF01}}, {{F110}}, {{AFAB}}',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'1-to-n with {{BSEG}}; the `AWKEY` field bridges to the source MM/SD document.',
        s4:'Structure preserved. Reporting moved to {{ACDOCA}}, but the document\'s identity is still here.',
        alanlar:[
          { ad:'BLART', aciklama:'{{belge-turu}}' },
          { ad:'BUDAT', aciklama:'Posting date — determines the period' },
          { ad:'AWTYP / AWKEY', aciklama:'Source document type and key — gives the integration trail' },
          { ad:'STBLG', aciklama:'Reversing document — if filled, this document has been reversed' },
        ] },

      { ad:'BSEG', baslik:'Document line items',
        tutar:'Line-level account, amount, debit/credit direction, and business objects (cost center, tax code, vendor/customer).',
        olusturan:'At the same time as {{BKPF}}',
        guncelleyen:'Every transaction that produces an FI document; clearing transactions update the `AUGBL` field',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'Links to {{LFA1}}/{{KNA1}} for vendor/customer, {{SKA1}} for the account, {{ANLA}} for the asset.',
        s4:'A cluster table (RFBLG), so direct queries are slow. In S/4HANA, reports read from {{ACDOCA}} instead.',
        alanlar:[
          { ad:'SHKZG', aciklama:'S = debit, H = credit' },
          { ad:'AUGBL / AUGDT', aciklama:'Clearing document and date — if blank, the item is **open**' },
          { ad:'ZUONR', aciklama:'Assignment — the matching field for automatic clearing ({{F.13}})' },
          { ad:'UMSKZ', aciklama:'{{ozel-ana-muhasebe-gostergesi}}' },
        ] },

      { ad:'ACDOCA', baslik:'Universal Journal',
        tutar:'The merged form of the FI, CO, fixed-asset and material ledgers. The same line carries the account, the cost center, the profit center, and the asset number all at once.',
        olusturan:'Every posted transaction',
        guncelleyen:'Every FI and CO transaction',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'Matches {{BKPF}} on the document number; the {{defter}} field separates parallel accounting.',
        s4:'The center of S/4HANA. Tables like {{FAGLFLEXT}}, {{GLT0}}, {{BSIS}} turned into {{uyumluluk-view}}s generated from this.',
        alanlar:[
          { ad:'RLDNR', aciklama:'Ledger — 0L is the leading ledger' },
          { ad:'DOCLN', aciklama:'A 6-digit line item number — exceeds {{BSEG}}\'s 3-digit limit' },
          { ad:'HSL / WSL / KSL', aciklama:'Company-code / document / group currency amounts' },
        ] },

      { ad:'T001', baslik:'Company code definition',
        tutar:'The company code\'s name, country, currency, chart of accounts, and fiscal year variant.',
        olusturan:'Configured via {{OX02}} and {{OBY6}}',
        guncelleyen:'{{OX02}}, {{OBY6}}',
        anahtar:'BUKRS',
        iliskiler:'Every table keyed by company code — {{BKPF}}, {{SKB1}}, {{LFB1}}, {{KNB1}} — points back here.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'WAERS', aciklama:'Local currency' },
          { ad:'KTOPL', aciklama:'Operational {{hesap-plani}}' },
          { ad:'PERIV', aciklama:'{{mali-yil-varyanti}}' },
        ] },
    ],

    er: {
      type:'er',
      baslik:'The table network around an FI document',
      varliklar:[
        { ad:'T001', rol:'Configuration', aciklama:'Company code',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'KTOPL' }, { ad:'PERIV' }] },
        { ad:'BKPF', rol:'Header', hub:true, aciklama:'The document\'s identity',
          alanlar:[{ ad:'BUKRS', tip:'fk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }, { ad:'BLART' }, { ad:'AWKEY' }] },
        { ad:'BSEG', rol:'Line item', aciklama:'The document\'s lines',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' }, { ad:'LIFNR', tip:'fk' }, { ad:'KUNNR', tip:'fk' }] },
        { ad:'ACDOCA', rol:'Universal Journal', aciklama:'S/4HANA\'s single source',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'RACCT' }, { ad:'RCNTR' }] },
        { ad:'SKB1', rol:'Master data', aciklama:'The account\'s company-code settings',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'SAKNR', tip:'pk' }, { ad:'MITKZ' }, { ad:'XOPVW' }] },
        { ad:'LFB1', rol:'Master data', aciklama:'Vendor accounting data',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT' }] },
        { ad:'BSIK', rol:'Index', aciklama:'Vendor open items',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZFBDT' }] },
      ],
      iliskiler:[
        { from:'T001', to:'BKPF', alanlar:'BUKRS', not:'every document belongs to a company code' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'one header, many lines' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR + GJAHR', not:'the universal view of the same document' },
        { from:'BSEG', to:'SKB1', alanlar:'HKONT → SAKNR', not:'the line\'s account' },
        { from:'BSEG', to:'LFB1', alanlar:'LIFNR', not:'a vendor line' },
        { from:'LFB1', to:'BSIK', alanlar:'LIFNR + BUKRS', not:'the vendor\'s open items' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Below is a screen-by-screen walkthrough of entering a G/L posting with {{FB50}}. The screen order and field ' +
      'logic are almost identical in the other posting transactions ({{FB60}}, {{FB70}}).',

    ekranlar:[
      { ad:'Header fields',
        aciklama:'The top block of the screen. The dates here decide which period the document falls into — this is where most mistakes happen.',
        alanlar:[
          { ad:'Document date (`BLDAT`)', zorunlu:true, aciklama:'The date printed on the invoice or voucher. Used as the reference in reporting.' },
          { ad:'Posting date (`BUDAT`)', zorunlu:true, aciklama:'**The date that decides the accounting period.** Defaults to today; changed by hand when posting into a past period.' },
          { ad:'Company code (`BUKRS`)', zorunlu:true, aciklama:'Which legal entity the posting is going into.' },
          { ad:'Document type (`BLART`)', zorunlu:false, aciklama:'Defaults to SA in {{FB50}}; usually left unchanged.' },
          { ad:'Reference (`XBLNR`)', zorunlu:false, aciklama:'The external document number. On the AP side, the vendor\'s invoice number goes here and triggers duplicate-invoice checking.' },
          { ad:'Document header text (`BKTXT`)', zorunlu:false, aciklama:'Free text describing the whole document.' },
        ],
        ipucu:'When you change the posting date, check that the period indicator changed too. Skipping this field while entering a December invoice in January is the classic mistake that extends the night.' },

      { ad:'Line item table',
        aciklama:'The line-by-line entry area in the bottom block. Each line becomes one {{BSEG}} item.',
        alanlar:[
          { ad:'G/L account (`HKONT`)', zorunlu:true, aciklama:'The general ledger account the posting goes to. Entering a reconciliation account produces an error.' },
          { ad:'D/C (debit-credit)', zorunlu:true, aciklama:'Turns into a {{kayit-anahtari}} in the background: debit is 40, credit is 50.' },
          { ad:'Amount', zorunlu:true, aciklama:'In the document currency. Choosing a different currency opens the exchange-rate field.' },
          { ad:'Tax code (`MWSKZ`)', zorunlu:false, aciklama:'Asked for if the account\'s tax category requires it. Once entered, SAP adds the tax line automatically.' },
          { ad:'Cost center (`KOSTL`)', zorunlu:false, aciklama:'Usually mandatory on expense accounts — decided by the {{alan-durumu}}.' },
          { ad:'Assignment (`ZUONR`)', zorunlu:false, aciklama:'**Critical** if automatic clearing via {{F.13}} is planned later — the matching is done from this field.' },
          { ad:'Text (`SGTXT`)', zorunlu:false, aciklama:'Line-level description. Very useful in reports; a good habit to never leave blank.' },
        ] },

      { ad:'Simulation screen',
        aciklama:'Opened via *Document → Simulate*. Shows, without posting, every line the system will generate in addition to the ones you entered (tax, exchange difference, document splitting).',
        ipucu:'Always simulate before you post. On systems where {{belge-bolme}} is active in particular, this is where you see the 2 lines you entered turn into 6.' },
    ],

    zorunlu:['Document date','Posting date','Company code','G/L account','Debit/Credit indicator','Amount'],
    opsiyonel:['Document type','Reference','Header text','Tax code','Cost center','Assignment','Line text','Due date'],

    hatalar:[
      { mesaj:'Posting period 004 2026 is not open for account type S', sebep:'In {{OB52}}, that period is closed for account type S (general ledger).', cozum:'Go to {{OB52}} → the period variant, open the period on the type-S line. If you lack authorization, ask the accounting manager to open it.' },
      { mesaj:'Account 320000 cannot be directly posted to', sebep:'The account is defined as a {{mutabakat-hesabi}} ({{SKB1}} `MITKZ` is filled).', cozum:'Post through the vendor/customer instead: {{FB60}} or {{FB70}}.' },
      { mesaj:'Field Cost Center is a required field for G/L account 1000 770000', sebep:'The account\'s field status group makes cost center mandatory.', cozum:'Enter a cost center; for a permanent fix, define a default CO object with {{OKB9}}.' },
      { mesaj:'Balance in transaction currency (debit ≠ credit)', sebep:'{{belge-denkligi}} isn\'t satisfied.', cozum:'Check the lines. If you want to hold onto an unbalanced document, park it with {{FV50}}.' },
      { mesaj:'Document number 1900000001 was already assigned', sebep:'A number range clash — usually the counter not being updated after a data migration.', cozum:'Use {{FBN1}} to move that range\'s current number (`NRLEVEL`) above the highest existing document number.' },
      { mesaj:'Tax code A1 does not exist in company code 1000', sebep:'The {{vergi-kodu}} isn\'t defined for that country/company code.', cozum:'Define it in {{FTXP}} under the right country key, or use the correct code.' },
    ],

    ipuclari:[
      'On any screen, click a field and hit **F1 → Technical information** to learn its technical name. The table and field name are printed there — that\'s how an {{SE16N}} query is put together.',
      'When an **F4** search comes back with too many results, narrow it with an asterisk (`*`) in the search term: `*rent*`.',
      'Add transactions you use often to your favorites (right-click on the SAP Easy Access screen → Add to favorites). Saves dozens of clicks over a day.',
      'Type a transaction code into the command field with `/n` to leave the current transaction and jump to a new one (`/nFB03`); with `/o` to open it in a new window (`/oFBL1N`). The two shortcuts a consultant uses most.',
      'Check whether a posting flowed into CO from {{FB03}} → the *Related documents* menu.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'1 header line — document number, type, dates, user, source reference' },
      { tablo:'BSEG', ne:'1 line item for each line entered; if there\'s a tax code, the system-added tax line lands here too' },
      { tablo:'ACDOCA', ne:'The same items in universal format; a separate set of lines for each active {{defter}}' },
      { tablo:'BSET', ne:'Tax lines: base amount, tax amount, account key' },
      { tablo:'BSIK', ne:'As an open item, if it\'s a vendor line (via a {{uyumluluk-view}} in S/4HANA)' },
      { tablo:'BSID', ne:'As an open item, if it\'s a customer line' },
    ],

    commit:
      'When you hit save, every write is bundled into a single LUW (Logical Unit of Work) and written atomically with ' +
      '`COMMIT WORK`. Either all of it, or none of it. Number assignment, however, runs in a separate LUW (outside the ' +
      '`UPDATE` task) — which is why **a document number can be consumed even for a posting that ultimately fails**, ' +
      'leaving a gap in the sequence. This is normal, not an error.',

    belgeNo:
      'The document number is assigned **at the moment you save**, not when the screen opens. The chain: ' +
      '{{belge-turu}} → its linked number range key → the company code + fiscal year line in {{FBN1}} → the next ' +
      'number. Under internal assignment, the system supplies the number; under external assignment, the user enters ' +
      'it and uniqueness is checked.',

    postingLogic:
      'The chain is this: **document type** decides which account types are allowed → **posting key** decides the ' +
      'line\'s direction and target account type → **field status** decides which fields are mandatory → **balance ' +
      'check** confirms debit = credit → **number assignment** and the **database write**.\n\n' +
      'Field status comes from two sources: the account\'s field status group ({{SKB1}} `FSTAG`) and the posting ' +
      'key\'s field status. **The more restrictive one wins** — if one says "hidden," the field is hidden even if the ' +
      'other says "required." This clash is the most common answer to "why can\'t I see this field?"',

    belgeTuru:
      '{{belge-turu}} decides three things: the allowed set of {{hesap-tipi}}, which {{numara-araligi}} is used, and ' +
      'the default type for a reversal. Standard types: **SA** general, **KR** vendor invoice, **KZ** vendor payment, ' +
      '**DR** customer invoice, **DZ** customer collection, **RE** logistics invoice, **RV** SD invoice, **AF** ' +
      'depreciation, **AB** general.',

    numberRange:
      'FI number ranges are keyed by **company code + fiscal year** and defined with {{FBN1}}. If a line isn\'t ' +
      'opened for the new fiscal year, posting stalls at the start of the year — the first item on the December ' +
      'checklist at every go-live. Range definitions **don\'t transport**; each system gets its own.',

    accountDetermination:
      'On a manual posting, the user enters the account. On automatic postings, rule tables decide it: on the MM side ' +
      '{{OBYC}} (transaction key + {{degerleme-sinifi}}), on the SD side {{VKOA}}, on tax {{OB40}}. All of them ' +
      'ultimately write to table {{T030}}. "Account determination for entry ... not possible" points to a missing ' +
      'line in one of these tables.',

    tur:
      '**Configuration:** chart of accounts, document types, number range **definitions**, field status groups, ' +
      'account determination rules.\n\n' +
      '**Master data:** G/L accounts, vendors, customers, fixed assets, house banks.\n\n' +
      '**Transaction data:** documents, payment runs, statements.',

    transport:
      'Configuration goes into a transport request and follows the development → test → production path. Master data ' +
      'and transaction data don\'t transport; each system loads its own ({{LSMW}}, {{LTMC}}, or manually). ' +
      '**Exception:** a number range\'s *definition* transports, but its *current counter value* doesn\'t — not ' +
      'knowing this distinction causes number clashes at go-live.',

    img:[
      { yol:'SPRO → Enterprise Structure → Definition → Financial Accounting → Edit, Copy, Delete, Check Company Code', not:'{{sirket-kodu}} creation ({{OX02}})' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Company Code → Enter Global Parameters', not:'Company code global settings ({{OBY6}})' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Document Types → Define Document Types for Entry View', not:'{{belge-turu}} ({{OBA7}})' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Document Number Ranges', not:'{{numara-araligi}} ({{FBN1}})' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Posting Periods → Open and Close Posting Periods', not:'Period control ({{OB52}})' },
    ],

    notlar:[
      { tip:'warn', baslik:'Don\'t query BSEG directly', metin:
        '{{BSEG}} is a cluster table; running a SELECT on a non-key field like `HKONT` or `KOSTL` is unacceptably ' +
        'slow. That\'s exactly why the index tables exist ({{BSIK}}, {{BSID}}, {{BSIS}}). In S/4HANA, the right ' +
        'address is {{ACDOCA}}.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'FI\'s **rules** didn\'t change with S/4HANA; what changed is where the data sits and how master data is ' +
      'managed. The full answer to "what changed in FI in S/4HANA?" has three headings: the **Universal Journal**, ' +
      'the **Business Partner** requirement, and **table simplification**.',

    eccFarklari:[
      { konu:'Data model', ecc:'{{BSEG}} + {{FAGLFLEXA}} + {{GLT0}} + COEP + {{ANEP}} — separately', s4:'{{ACDOCA}} in one table; the rest as {{uyumluluk-view}}s' },
      { konu:'Customer/vendor master data', ecc:'Separately, via {{XK01}} / {{XD01}}', s4:'{{BP}} is mandatory — Customer/Vendor Integration (CVI)' },
      { konu:'Cost element', ecc:'A separate master record via {{KA01}}', s4:'A type of the G/L account — chosen as "Primary Costs" in {{FS00}}' },
      { konu:'Totals tables', ecc:'Pre-calculated and stored', s4:'Removed; calculated on the fly' },
      { konu:'Line item number', ecc:'{{BSEG}} `BUZEI` — 3 digits, a 999-item limit', s4:'{{ACDOCA}} `DOCLN` — 6 digits, effectively unlimited' },
      { konu:'FI–CO reconciliation', ecc:'Needs a periodic reconciliation step', s4:'Unnecessary, since they sit on the same line' },
      { konu:'Fixed assets', ecc:'Classic AA; values in {{ANLC}}/{{ANEP}}', s4:'Enterprise Asset Accounting; values in {{ACDOCA}}, ledger-based' },
    ],

    universalJournal:
      '{{ACDOCA}} holds the FI item + the CO object + the asset number + the profit center **on a single line**. The ' +
      'practical consequences: (1) an FI–CO mismatch becomes structurally impossible, (2) totals tables become ' +
      'unnecessary, (3) real-time reporting becomes possible on every dimension, (4) {{paralel-defter}} is no longer ' +
      'extra overhead — just a different `RLDNR` value.',

    kalkanTcodes:[
      { eski:'{{FK01}} / {{FK02}} / {{FK03}}', yeni:'{{BP}}', not:'Vendor master data is now managed via Business Partner' },
      { eski:'{{FD01}} / {{XD01}}', yeni:'{{BP}}', not:'Same rule for customer master data' },
      { eski:'{{KA01}}', yeni:'{{FS00}}', not:'The cost element turned into a type of the G/L account' },
      { eski:'{{FBL3N}}', yeni:'{{FAGLL03}} / Fiori', not:'Still works, but the new one is recommended for ledger-based reporting' },
      { eski:'{{AFAB}}', yeni:'FAA_DEPRECIATION_POST', not:'AFAB redirects into the new program' },
    ],

    fiori:[
      { ad:'Post General Journal Entries', aciklama:'The Fiori counterpart of {{FB50}}; supports bulk upload from Excel.' },
      { ad:'Display Journal Entries', aciklama:'Replaces {{FB03}}; shows the document and every linked object on one screen.' },
      { ad:'Manage Journal Entries', aciklama:'Manages parked and incomplete documents as a work list.' },
      { ad:'Trial Balance', aciklama:'A real-time trial balance; drill from account to line item to document in one click.' },
      { ad:'Maintain Business Partner', aciklama:'{{BP}} — the single entry point for both customer and vendor.' },
    ],

    compatibilityViews:[
      '{{BSIS}}, {{BSAS}}, {{BSIK}}, {{BSAK}}, {{BSID}}, {{BSAD}} — no longer physical tables, but views generated from {{ACDOCA}}.',
      '{{GLT0}}, {{FAGLFLEXT}} — the totals tables also turned into views.',
      '**INSERT/UPDATE cannot be done** on these views. An old custom program still works if it only reads, and breaks if it writes — the first risk to scan for in a migration project.',
    ],

    performans:
      'Because totals tables were removed and HANA is column-based, balance queries can sum millions of line items on ' +
      'the fly. Lock contention also drops: previously, simultaneous postings to the same account locked a row in the ' +
      'totals table; no such row exists anymore.',

    bestPractices:[
      'On new developments, use {{ACDOCA}} or a CDS view instead of {{BSEG}} — the performance gap is large.',
      'Before migrating a custom program, scan whether it writes to {{uyumluluk-view}}s.',
      'Build customer/vendor load scenarios through {{BP}}; don\'t try to do a classic screen recording with {{LSMW}}.',
      'Treat it as a chance to simplify the chart of accounts — the S/4HANA move is the best moment to cut the account count.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'The same invoice, three different doors: FI, MM and SD',
    hikaye:
      '**Marmara Textiles Inc.** (company code 1000) does three transactions in the same week: it receives a ' +
      'consulting invoice, buys fabric against a purchase order, and sells to a customer. All three produce an FI ' +
      'document, but each enters through a different door. This scenario shows, concretely, why FI is an ' +
      '"intersection."',
    veriler:[
      { k:'Company code', v:'1000 — Marmara Textiles Inc.' },
      { k:'Period', v:'April 2026 (period 04)' },
      { k:'VAT', v:'20%' },
      { k:'Vendors', v:'V-2001 (consulting), V-3001 (fabric)' },
      { k:'Customer', v:'C-5001' },
    ],

    adimlar:[
      { baslik:'Door 1 — Consulting invoice entered directly into FI', tcode:'FB60',
        aciklama:'No purchase order, no goods receipt. The accountant enters the invoice directly. This is the ' +
                 'scenario where FI works **on its own**.',
        girdi:[
          { alan:'Vendor', deger:'V-2001' },
          { alan:'Invoice date / Posting date', deger:'10.04.2026 / 10.04.2026' },
          { alan:'Reference (`XBLNR`)', deger:'DAN-2026-0417 (the vendor\'s invoice number)' },
          { alan:'Amount / Tax code', deger:'60,000 TRY gross / 20%' },
          { alan:'Expense line', deger:'770 General administrative expense — 50,000, Cost center: 1200 Finance' },
          { alan:'Payment terms', deger:'Net 30 → due 10.05.2026' },
        ],
        fis:{ baslik:'Document 1900000045 — Consulting invoice', belgeTuru:'KR', tarih:'10.04.2026',
          satirlar:[
            { hesap:'770', ad:'General administrative expense', borc:50000, not:'Cost center 1200 → also flows into CO' },
            { hesap:'191', ad:'Deductible VAT', borc:10000, not:'Automatic from the tax code' },
            { hesap:'320', ad:'Trade payables — V-2001', alacak:60000 },
          ] },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'BLART = KR, XBLNR = DAN-2026-0417, AWTYP blank (born in FI)' },
          { tablo:'BSEG', ne:'3 line items; the vendor line has AUGBL blank → **open item**' },
          { tablo:'BSIK', ne:'A new open item, due 10.05.2026' },
          { tablo:'BSET', ne:'Tax line: base 50,000, tax 10,000' },
          { tablo:'ACDOCA', ne:'3 lines; the expense line carries RCNTR = 1200' },
        ],
        not:'Entering the vendor\'s invoice number in the reference field matters: SAP warns of a duplicate if a second invoice with the same number comes in from the same vendor.' },

      { baslik:'Door 2a — Fabric order and goods receipt', tcode:'MIGO',
        aciklama:'A purchase order for the fabric was opened first ({{EKKO}}/{{EKPO}}). The moment the goods reach the warehouse, an FI document is generated **automatically**. The accountant enters nothing.',
        girdi:[
          { alan:'Movement type', deger:'101 — Goods receipt against a purchase order' },
          { alan:'Purchase order', deger:'4500001234, item 10' },
          { alan:'Quantity / Value', deger:'1,000 m × 80 TRY = 80,000 TRY' },
        ],
        fis:{ baslik:'Document 5000000123 — Goods receipt', belgeTuru:'WE', tarih:'12.04.2026',
          satirlar:[
            { hesap:'153', ad:'Trade goods (inventory)', borc:80000, not:'{{OBYC}} transaction key **BSX**' },
            { hesap:'159', ad:'GR/IR account', alacak:80000, not:'{{OBYC}} transaction key **WRX**' },
          ], not:'The liability to the vendor is **not yet posted** — the invoice hasn\'t arrived. The {{gr-ir}} account carries this gap.' },
        tabloEtkisi:[
          { tablo:'MSEG', ne:'Material document line item, movement type 101' },
          { tablo:'BKPF', ne:'AWTYP = MKPF, AWKEY = the material document → the FI document\'s source can be traced' },
        ] },

      { baslik:'Door 2b — Fabric invoice entered from MM', tcode:'MIRO',
        aciklama:'When the invoice arrives, {{uc-yonlu-eslestirme}} is performed: purchase order 80,000, goods receipt ' +
                 '80,000, invoice 80,000 → matched, no block.',
        girdi:[
          { alan:'Invoice date', deger:'20.04.2026' },
          { alan:'Purchase order', deger:'4500001234' },
          { alan:'Invoice amount', deger:'96,000 TRY (VAT included)' },
        ],
        fis:{ baslik:'Document 5100000078 — Fabric invoice', belgeTuru:'RE', tarih:'20.04.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR account', borc:80000, not:'Closes the credit from the goods receipt' },
            { hesap:'191', ad:'Deductible VAT', borc:16000 },
            { hesap:'320', ad:'Trade payables — V-3001', alacak:96000 },
          ], not:'The {{gr-ir}} account is now zeroed out for this item. If its balance keeps growing, either goods are ' +
               'arriving with no matching invoices or the reverse — {{F.19}} is used to analyze it.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'A new open item for V-3001, 96,000 TRY' },
          { tablo:'BKPF', ne:'AWTYP = RMRP (logistics invoice verification)' },
        ],
        not:'Had the invoice amount differed from the order price, the difference would have gone to a price-variance ' +
            'account ({{OBYC}} → PRD) instead of {{gr-ir}}, and the invoice might have blocked for payment (released with {{MRBR}}).' },

      { baslik:'Door 3 — Customer invoice comes from SD', tcode:'VF01',
        aciklama:'Sales issues an invoice against the delivery. The moment it\'s posted, an FI document is generated automatically; {{VKOA}} determines the accounts.',
        girdi:[
          { alan:'Delivery / Invoice type', deger:'80001234 / F2 (standard invoice)' },
          { alan:'Customer', deger:'C-5001' },
          { alan:'Net amount', deger:'100,000 TRY + 20,000 TRY VAT' },
        ],
        fis:{ baslik:'Document 1800000091 — SD invoice', belgeTuru:'RV', tarih:'25.04.2026',
          satirlar:[
            { hesap:'120', ad:'Trade receivables — C-5001', borc:120000 },
            { hesap:'600', ad:'Domestic sales', alacak:100000, not:'{{VKOA}} account determination' },
            { hesap:'391', ad:'Calculated VAT', alacak:20000 },
          ] },
        tabloEtkisi:[
          { tablo:'VBRK', ne:'The SD invoice header; the `RFBSK` field holds the transfer-to-accounting status' },
          { tablo:'BSID', ne:'An open receivable for C-5001' },
          { tablo:'BKPF', ne:'AWTYP = VBRK, AWKEY = the SD invoice number' },
        ],
        not:'If the FI document never appeared, `RFBSK` stays at "A" (not transferred). The cause is almost always a ' +
            'missing account determination in {{VKOA}}; fix it and retransfer with {{VF02}}.' },

      { baslik:'Month-end — all three doors\' results land in one place', tcode:'FBL3N',
        aciklama:'Postings that entered through three different doors meet on the same general ledger accounts. The accountant now works with a single trial balance without caring where each line came from.',
        girdi:[
          { alan:'Check 1', deger:'{{FBL1N}} → vendor open items: V-2001 60,000 + V-3001 96,000' },
          { alan:'Check 2', deger:'{{FBL5N}} → customer open items: C-5001 120,000' },
          { alan:'Check 3', deger:'{{FBL3N}} → account 159 GR/IR balance should be zero' },
          { alan:'Check 4', deger:'{{FB03}} → for a suspicious document, drill to the source via *AWKEY*' },
        ] },
    ],

    sonuc:
      'By the end of April, FI holds **5 documents** from three sources, and not one of them has a different shape ' +
      'from the others: every single one is a {{BKPF}} header and balanced {{BSEG}} items.\n\n' +
      'The real lesson to take away: **before asking "how is this transaction done in SAP?", ask "which FI document ' +
      'does this transaction produce?"** Knowing the document tells you which module it came from, which account it ' +
      'went to, and where to look when there\'s an error. Being an FI consultant largely comes down to this one habit.',
  },

  },
});
