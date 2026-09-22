/* ==========================================================================
   content/fi-en/genel-muhasebe.js — English body for "Genel Muhasebe"
   --------------------------------------------------------------------------
   Merges onto the Turkish topic (same id) as `sections_en`. Same field
   names as content/fi/genel-muhasebe.js (see CLAUDE.md §4) — only the
   string VALUES are English. `{{...}}` cross-links are left UNCHANGED:
   they resolve against the same glossary/topic registry and now render
   their own label in the active language (js/markup.js).

   `ogrenme` is intentionally NOT translated — that section is no longer
   rendered anywhere (removed per user request, data kept for TR only).
   Sections without a full EN translation simply fall back to Turkish
   per-section (js/core.js sectionData) — nothing breaks if this file is
   incomplete relative to the TR one.
   ========================================================================== */

SAP.registerTopic({
  id: 'genel-muhasebe',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'General accounting is the system that records, classifies, summarizes and reports every event a company can ' +
      'measure in money, according to a fixed set of rules. SAP FI is that system written in software — SAP does not ' +
      'invent a new accounting, it implements accounting rules that are centuries old.\n\n' +
      'Skipping this topic and jumping straight to transaction codes is the most common mistake. You can memorize the ' +
      '{{FB50}} screen, but if you cannot answer "why is this line a debit?", you get stuck on the first real error.',

    neden:
      'Three separate needs make this system mandatory:\n\n' +
      '**Legal obligation.** Companies must keep books for the tax office and the trade registry.\n\n' +
      '**Decision-making.** Management can only answer "are we profitable, do we have enough cash, which customer ' +
      'isn\'t paying" from accounting data.\n\n' +
      '**Trust.** A bank granting credit, an investor becoming a partner, an auditor signing off — all of them look ' +
      'at statements produced under the same rules. Without shared rules, no statement could ever be compared to another.',

    sirketOnemi:
      'Accounting is the company\'s **single source of truth**. Sales says "we sold a lot this month," production says ' +
      '"we\'re at capacity" — none of that becomes a measurable fact until it lands in accounting.\n\n' +
      'For SAP the critical consequence is this: a goods receipt in MM, an invoice in SD, payroll in HR — all of it ' +
      'eventually lands in FI as an accounting document. FI is the final stop where every module meets. That is why an ' +
      'FI consultant also has to understand the other modules.',

    gercekHayat:
      'Picture a café. The owner counts the cash in the register and says "I made 3,000 TRY today." But that same day ' +
      'they placed a 5,000 TRY coffee-bean order whose invoice hasn\'t arrived yet. Rent is 20,000 TRY, due on the 5th. ' +
      'The coffee machine cost 60,000 TRY and will be used for 5 years.\n\n' +
      'The cash in the register is not "profit." To see the real profit you have to account for the incoming order\'s ' +
      'liability, the day\'s share of the rent, and the wear on the machine. That is exactly why accounting exists — ' +
      '**cash movement and profit are not the same thing.**',

    muhasebeMantigi:
      'Everything follows from one equation:\n\n' +
      '**ASSETS = SOURCES**, i.e. **Assets = Liabilities + Equity**\n\n' +
      'The left side answers "what do I have," the right side answers "where did I get it from." If you have a ' +
      '100,000 TRY machine, you either owe someone for it or you put in your own money. There is no third option.\n\n' +
      'This equation must never break, on any transaction. The way to record without breaking it is the ' +
      '{{cift-tarafli-kayit}} principle: every transaction is written to at least two accounts, with {{borc}} and ' +
      '{{alacak}} sides equal.\n\n' +
      'SAP doesn\'t soften this rule — it **enforces** it: a document where debit ≠ credit cannot be posted. At most it ' +
      'can be set aside with {{park-etme}}.',

    kavramlar: ['borc', 'alacak', 'cift-tarafli-kayit', 'bilanco', 'gelir-tablosu', 'tahakkuk-esasi',
                'mizan', 'yevmiye', 'muavin-defter', 'ana-muhasebe'],
  },

  /* ====================================================== 2. PROCESS === */
  surec: {
    anlatim:
      'The accounting process is a cycle, and it runs from the start every period. This cycle is identical in SAP — ' +
      'the system just automates part of the steps.',

    roller: [
      { rol:'Business unit (procurement, sales, warehouse)', gorev:'Triggers the event: places an order, receives goods, issues an invoice. The accounting document is most often born here, without anyone noticing.' },
      { rol:'Accounting specialist', gorev:'Enters the document into the system, or checks a document the system produced on its own. Verifies the account, tax code and cost center are correct.' },
      { rol:'Accounting manager', gorev:'Approves high-value or unusual postings; manages period-end closing.' },
      { rol:'Tax advisor / auditor', gorev:'Audits postings for compliance and signs off on the financial statements.' },
      { rol:'SAP FI consultant', gorev:'Makes sure this flow runs correctly in the system: chart of accounts, document types, automatic account determination, and period control.' },
    ],

    diyagram: {
      type: 'flow',
      baslik: 'The accounting cycle — from the start of a period to its end',
      adimlar: [
        { ic:'📄', rol:'Business unit', baslik:'A document-backed event occurs',
          aciklama:'An invoice, a voucher, a payroll run, a goods receipt slip… Accounting never posts anything without a document.',
          cikti:'Source document', ok:'the document reaches accounting' },
        { ic:'✍️', rol:'Accounting', baslik:'A journal entry is posted',
          aciklama:'The event is written to accounts as {{borc}} and {{alacak}}. In SAP this is an FI document ({{BKPF}} + {{BSEG}}).',
          cikti:'FI document', ok:'the posting is distributed to the accounts' },
        { ic:'📚', rol:'System', baslik:'Transfer to the general ledger',
          aciklama:'A separate manual step in paper accounting; automatic the moment you post in SAP. Balances are calculated in real time via {{ACDOCA}}.',
          cikti:'Account balances', ok:'period end arrives' },
        { ic:'⚖️', rol:'Accounting', baslik:'A trial balance is pulled and checked',
          aciklama:'The {{mizan}} confirms total debits = total credits. If it doesn\'t balance, there is a posting error.',
          cikti:'Trial balance report', ok:'if a correction is needed' },
        { ic:'🔧', rol:'Accounting', baslik:'Period-end adjusting entries',
          aciklama:'{{amortisman}}, {{kur-farki}}, accruals and provisions. Required by {{tahakkuk-esasi}}.',
          cikti:'Adjustment postings', ok:'statements are produced' },
        { ic:'📊', rol:'Accounting manager', baslik:'Financial statements are produced',
          aciklama:'{{bilanco}} and {{gelir-tablosu}}. In SAP, report {{F.01}} produces them per the {{mali-tablo-yapisi}}.',
          cikti:'Balance sheet, income statement', ok:'if it is year-end' },
        { ic:'🔒', rol:'System', baslik:'Closing and carryforward',
          aciklama:'Income and expense accounts are zeroed out and the result moves to equity; balance sheet accounts carry forward into the new year ({{bakiye-devri}}).',
          cikti:'Opening balances' },
      ],
    },

    adimlar: [
      { rol:'Business unit', eylem:'The economic event occurs and is documented', sistem:'An MM / SD / HR document, or a paper invoice' },
      { rol:'Accounting', eylem:'The accounts the posting will hit are determined', sistem:'{{hesap-plani}} and {{hesap-belirleme}} rules' },
      { rol:'Accounting', eylem:'The journal entry is entered', sistem:'{{FB50}}, {{FB60}}, {{F-02}}, or an automatic posting' },
      { rol:'System', eylem:'A document number is assigned and the accounts are updated', sistem:'{{numara-araligi}} + {{BKPF}}/{{BSEG}}/{{ACDOCA}}' },
      { rol:'Accounting', eylem:'Verification and reconciliation are performed', sistem:'{{FBL3N}}, {{FS10N}}, {{FBL1N}}, {{FBL5N}}' },
      { rol:'Accounting', eylem:'Period-end adjustments are posted', sistem:'{{AFAB}}, {{F.05}}, {{F.19}}' },
      { rol:'Accounting manager', eylem:'The period is closed and statements are pulled', sistem:'{{OB52}}, {{F.01}}, {{FAGLGVTR}}' },
    ],

    veriAkisi: {
      nereden: 'Source documents: vendor invoices, customer invoices, bank statements, payroll, goods movements. In SAP most of these flow in automatically from the MM, SD and HR modules.',
      nereye: 'Into account balances, from there into the {{mizan}} and the financial statements. On the CO side, also into {{maliyet-yeri}} reports.',
      tetikleyen: 'The document behind the economic event. No document, no posting — accounting\'s "no posting without a document" rule holds in SAP too.',
      sonraki: 'Tax filing, consolidation, management reporting, and audit.',
    },

    notlar: [
      { tip:'tip', baslik:'SAP\'s biggest difference', metin:
        'In manual bookkeeping, "write to the journal → post to the ledger → pull a trial balance" are three separate ' +
        'jobs. In SAP, posting does all three at once. That\'s why "the trial balance doesn\'t balance" isn\'t really a ' +
        'problem in SAP — the system simply refuses an unbalanced document in the first place.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'What "increase/decrease" means for debit and credit changes with the account\'s **type**. This is the one ' +
      'table worth memorizing — everything else follows from it.\n\n' +
      'Memory rule: **Assets and Expenses increase with a debit.** Everything else (Liabilities, Equity, Income) ' +
      'increases with a credit.',

    etkilenenHesaplar: [
      { hesap:'Assets', tur:'Balance sheet', neden:'Cash, banks, inventory, receivables, machinery. **Increases with a debit, decreases with a credit.** Value coming into the company is written on the left.' },
      { hesap:'Liabilities', tur:'Balance sheet', neden:'Amounts owed to vendors, bank loans, tax payable. **Increases with a credit, decreases with a debit.**' },
      { hesap:'Equity', tur:'Balance sheet', neden:'Capital and retained earnings. **Increases with a credit.** Money the owners put in is a source for the company.' },
      { hesap:'Income', tur:'Income statement', neden:'Sales revenue, interest income. **Increases with a credit.** Income grows equity, so it moves the same direction as equity.' },
      { hesap:'Expense', tur:'Income statement', neden:'Rent, salaries, {{amortisman}}. **Increases with a debit.** Expense shrinks equity, so it moves the opposite direction.' },
    ],

    fisler: [
      { baslik:'Example 1 — Cash sale (10,000 TRY + 20% VAT)',
        belgeTuru:'SA', tarih:'01.03.2026', paraBirimi:'TRY',
        satirlar: [
          { hesap:'100', ad:'Cash', borc:12000, not:'Asset increased → debit' },
          { hesap:'600', ad:'Domestic sales', alacak:10000, not:'Income increased → credit' },
          { hesap:'391', ad:'Calculated VAT', alacak:2000, not:'A liability to the state arose → credit' },
        ],
        not:'VAT is not the company\'s income; it is collected on the state\'s behalf and sits as a **liability**. That\'s why account 600 gets 10,000, not 12,000.' },

      { baslik:'Example 2 — Purchase of goods on credit (50,000 TRY + 20% VAT)',
        belgeTuru:'KR', tarih:'05.03.2026', paraBirimi:'TRY',
        satirlar: [
          { hesap:'153', ad:'Trade goods', borc:50000, not:'Inventory (an asset) increased → debit' },
          { hesap:'191', ad:'Deductible VAT', borc:10000, not:'A receivable from the state arose → debit' },
          { hesap:'320', ad:'Trade payables', alacak:60000, not:'A liability to the vendor arose → credit' },
        ],
        not:'This document is entered in SAP via {{FB60}} or {{MIRO}}. Because line 320 is a {{mutabakat-hesabi}}, it isn\'t typed directly — it\'s written through the vendor master record.' },

      { baslik:'Example 3 — Month-end depreciation posting',
        belgeTuru:'AF', tarih:'31.03.2026', paraBirimi:'TRY',
        satirlar: [
          { hesap:'770', ad:'General administrative expense — depreciation', borc:1000, not:'Expense increased → debit' },
          { hesap:'257', ad:'Accumulated depreciation', alacak:1000, not:'A contra-asset account → credit' },
        ],
        not:'**No cash moves** in this posting. It is the clearest example of {{tahakkuk-esasi}}: the machine wore down, an expense arose, but not a single unit of currency left the register. In SAP, {{AFAB}} generates this posting automatically.' },
    ],

    tHesaplar: [
      { hesap:'Cash', kod:'100 (Asset)',
        borc:[{ ad:'Cash sale', tutar:12000 }, { ad:'Partner capital contribution', tutar:50000 }],
        alacak:[{ ad:'Rent payment', tutar:20000 }],
        not:'An asset account normally carries a debit balance' },
      { hesap:'Trade payables', kod:'320 (Liability)',
        borc:[{ ad:'Payment made', tutar:20000 }],
        alacak:[{ ad:'Purchase of goods', tutar:60000 }],
        not:'A liability account normally carries a credit balance' },
      { hesap:'Domestic sales', kod:'600 (Income)',
        borc:[],
        alacak:[{ ad:'Cash sale', tutar:10000 }, { ad:'Sale on credit', tutar:25000 }],
        not:'An income account is zeroed out at year-end' },
      { hesap:'General administrative expense', kod:'770 (Expense)',
        borc:[{ ad:'Rent', tutar:20000 }, { ad:'Depreciation', tutar:1000 }],
        alacak:[],
        not:'An expense account is zeroed out at year-end' },
    ],

    notlar: [
      { tip:'warn', baslik:'The most commonly confused point', metin:
        'When your bank balance goes up, the bank tells you "your account has been credited." That is the wording ' +
        '**in the bank\'s own books**: the bank now owes you. In your own books, though, the bank is an asset and gets ' +
        'a **debit**. The same event looks reversed on the two sides — this is called mirror posting.' },
      { tip:'tip', baslik:'Where does SAP keep debit/credit?', metin:
        'In the `SHKZG` field of table {{BSEG}}: **S** = Soll (German for debit), **H** = Haben (credit). Because SAP ' +
        'was born in Germany, these abbreviations are still German — and identical everywhere in the world.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim: 'Accounting is not one single thing; it takes different forms depending on who it speaks to. In SAP this split maps to a module split.',
    liste: [
      { ad:'Financial Accounting (FI)',
        aciklama:'Produces reports for the outside world — the tax office, the bank, the shareholders. Its rules are set by law; there is no flexibility.',
        neZaman:'Whenever statutory books and financial statements are required. In SAP this is the **FI** module.',
        tcodes:['FB50','F.01','FBL3N'] },

      { ad:'Management Accounting / Controlling (CO)',
        aciklama:'Produces reports for the inside — for management. Answers questions like which product is profitable, what each department is spending. The company sets its own rules.',
        neZaman:'Whenever decision support is needed. In SAP this is the **CO** module; {{maliyet-yeri}} and {{kar-merkezi}} are its objects.',
        tcodes:['KSB1','KS01'] },

      { ad:'Cost Accounting',
        aciklama:'Calculates the unit cost of a product or service. A sub-discipline of management accounting.',
        neZaman:'For pricing and inventory valuation at manufacturing companies. In SAP, the CO-PC (Product Costing) area.' },

      { ad:'Tax Accounting',
        aciklama:'Calculates figures the way tax law requires. Commercial profit and taxable profit often differ.',
        neZaman:'During filing periods. In SAP this is handled by the {{vergi-kodu}} structure and, if needed, a separate {{paralel-defter}}.',
        tcodes:['FTXP','F.12'] },
    ],

    karsilastirmaBasliklar: ['Financial accounting (FI)', 'Management accounting (CO)'],
    karsilastirma: [
      ['Who it speaks to', 'Outward: government, bank, partners', 'Inward: management'],
      ['Who sets the rules', 'Law — mandatory and uniform', 'The company itself — flexible'],
      ['Time focus', 'Past (reports what happened)', 'Future (budget, forecast)'],
      ['Level of detail', 'Company-wide', 'By product, department, project'],
      ['SAP equivalent', 'FI module, {{ana-muhasebe}}', 'CO module, {{maliyet-yeri}}'],
      ['In S/4HANA', 'Same table: {{ACDOCA}}', 'Same table: {{ACDOCA}}'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    anlatim:
      'This topic is theoretical, but seeing the theory\'s SAP counterpart speeds up learning. The three transaction ' +
      'codes below let you watch the concepts above play out on screen.',
    liste: [
      { kod:'FB50', ad:'G/L posting — seeing debit/credit logic on screen',
        amac:'Enters a general ledger posting in a table layout. Every line carries an account, a debit/credit choice, and an amount.',
        neZaman:'For trying out accounting logic and entering a manual correction. All three example postings above can be entered on this screen.',
        adimlar: [
          { baslik:'Enter the company code and the dates', aciklama:'The document date is the date on the invoice; the posting date is the date that **decides the period**. The two can differ.' },
          { baslik:'Enter the lines', aciklama:'Each line takes an account number, a **D/C** (debit/credit) choice, and an amount. SAP does not ask for a {{kayit-anahtari}} here — it works one out in the background.' },
          { baslik:'Watch the balance indicator in the top right', aciklama:'It stays red until debit and credit are equal. It won\'t let you post until it turns green — this is where the {{belge-denkligi}} rule becomes visible.' },
          { baslik:'Simulate', aciklama:'*Document → Simulate* shows every line SAP will generate, tax lines included, without posting. Always simulate before you post.' },
          { baslik:'Post', aciklama:'A document number is assigned and the posting becomes irreversible in place. A wrong posting isn\'t deleted — it\'s corrected with {{FB08}} ({{ters-kayit}}).' },
        ],
        ipucu:'The simulation screen is the best tool for learning accounting: for the two lines you typed, you see exactly which tax and rounding lines SAP adds automatically.',
        ilgili:['F-02','FB03','FB08'] },

      { kod:'FBL3N', ad:'G/L line item list — viewing the general ledger',
        amac:'Lists all movements on one account. This is, exactly, the "general ledger page" of manual bookkeeping.',
        neZaman:'To understand why an account\'s balance is what it is.',
        adimlar: [
          { baslik:'Enter the account number and company code' },
          { baslik:'Choose open / cleared / all items', aciklama:'This distinction is only meaningful for accounts where {{acik-kalem-yonetimi}} is active.' },
          { baslik:'Double-click a line', aciklama:'You drop into the document the line belongs to ({{FB03}}). From there you can jump on to the source MM/SD document.' },
        ],
        ilgili:['FS10N','FAGLL03','FB03'] },

      { kod:'F.01', ad:'Balance sheet and income statement',
        amac:'Produces the financial statements that postings ultimately turn into.',
        neZaman:'At period end, and at every reconciliation check.',
        adimlar: [
          { baslik:'Enter the company code and the period range' },
          { baslik:'Choose the {{mali-tablo-yapisi}} (financial statement version)', aciklama:'This structure decides which balance sheet line each account appears on. The wrong FSV means correct data shown in the wrong place.' },
          { baslik:'Enter the comparison period', aciklama:'A comparison against the same period last year is made right here on this screen.' },
        ],
        ipucu:'If assets and liabilities don\'t add up to the same total on the balance sheet, it usually isn\'t a data error — it\'s almost always an account that was never assigned to any line in the FSV.',
        ilgili:['OB58','FAGLB03'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Accounting\'s three paper ledgers each map to a group of SAP tables. Once you make that mapping once, table ' +
      'structure stops being something you memorize.',
    liste: [
      { ad:'BKPF', baslik:'Journal entry header',
        tutar:'The document\'s identity: number, {{belge-turu}}, date, currency, the user who posted it.',
        olusturan:'Every posted transaction — {{FB50}}, {{FB60}}, {{MIRO}}, {{VF01}}…',
        guncelleyen:'{{FB50}}, {{FB60}}, {{FB70}}, {{F-02}}, {{FB08}}',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'One header corresponds to multiple lines in {{BSEG}} (a 1-to-n relationship).',
        s4:'Unchanged — still written. Reporting, however, now runs through {{ACDOCA}}.',
        alanlar:[
          { ad:'BLART', aciklama:'{{belge-turu}} — tells what kind of transaction the document is' },
          { ad:'BUDAT', aciklama:'Posting date — **this** date decides the period, not the document date' },
          { ad:'BLDAT', aciklama:'Document date — the date printed on the invoice' },
        ] },

      { ad:'BSEG', baslik:'Journal entry line items',
        tutar:'Each line\'s account, amount, and {{borc}}/{{alacak}} direction.',
        olusturan:'Alongside {{BKPF}}, by the same transaction, at the same time.',
        guncelleyen:'Every transaction that produces an FI document',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'A child of {{BKPF}}; a customer line links to {{KNA1}}, a vendor line to {{LFA1}}.',
        s4:'Still written, but slow because it is a cluster table; reporting has moved to {{ACDOCA}}.',
        alanlar:[
          { ad:'SHKZG', aciklama:'**S** = debit, **H** = credit. The table-level counterpart of accounting\'s most basic rule.' },
          { ad:'HKONT', aciklama:'The G/L account' },
          { ad:'DMBTR', aciklama:'Amount in local currency' },
        ] },

      { ad:'ACDOCA', baslik:'S/4HANA\'s single ledger',
        tutar:'Merges the FI, CO, fixed asset and material ledgers into a single line. It plays the role of the journal, the general ledger, and the totals table all at once.',
        olusturan:'Every posted transaction',
        guncelleyen:'Every FI and CO transaction',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'Matches {{BKPF}} on the document number; the {{defter}} field lets the same document be held under more than one accounting standard.',
        s4:'A table that arrived with S/4HANA. It has no counterpart in ECC.',
        alanlar:[
          { ad:'RLDNR', aciklama:'{{defter}} — the key to the {{paralel-defter}} mechanism' },
          { ad:'HSL', aciklama:'Amount in company-code currency' },
          { ad:'RACCT', aciklama:'Account number' },
        ] },
    ],

    er: {
      type: 'er',
      baslik: 'Table structure of an accounting document',
      varliklar: [
        { ad:'BKPF', rol:'Header', hub:true, aciklama:'The document\'s identity',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' },
                   { ad:'BLART' }, { ad:'BUDAT' }] },
        { ad:'BSEG', rol:'Line item', aciklama:'The document\'s lines',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' },
                   { ad:'SHKZG' }, { ad:'DMBTR' }] },
        { ad:'ACDOCA', rol:'Universal Journal', aciklama:'S/4HANA\'s single source of truth',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'DOCLN', tip:'pk' }, { ad:'RLDNR', tip:'pk' },
                   { ad:'RACCT' }, { ad:'HSL' }] },
        { ad:'SKA1', rol:'Master data', aciklama:'The account\'s definition',
          alanlar:[{ ad:'KTOPL', tip:'pk' }, { ad:'SAKNR', tip:'pk' }, { ad:'XBILK' }] },
      ],
      iliskiler: [
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'one header, many lines' },
        { from:'BKPF', to:'ACDOCA', alanlar:'RBUKRS + BELNR + GJAHR', not:'the universal view of the same document' },
        { from:'BSEG', to:'SKA1', alanlar:'HKONT → SAKNR', not:'which account the line was posted to' },
      ],
    },
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    postingLogic:
      'Posting a document in SAP rests on a single chain of logic: **document type → account types allowed → posting ' +
      'key → debit/credit direction → field status → balance check → number assignment.** If any link in this chain ' +
      'fails to hold, the posting cannot happen. Nearly every error you\'ll get lives somewhere in this chain.',

    belgeTuru:
      '{{belge-turu}} tells the system "what" the document is, and determines two things: which {{hesap-tipi}} it ' +
      'can post to, and which {{numara-araligi}} it draws its number from. For example, document type KR (vendor ' +
      'invoice) cannot post to a customer account.',

    numberRange:
      'In FI, number ranges are keyed by **company code + fiscal year**. If a new line isn\'t defined for each year, ' +
      'you get a "Document number ... not within range" error at the start of the year — a classic event that hits ' +
      'nearly every go-live at New Year\'s.',

    commit:
      'When you hit save, SAP bundles all the database changes into a single LUW (logical unit of work). Either all of ' +
      'it is written, or none of it is. So "the document got a number but some lines are missing" cannot normally ' +
      'happen — if it does, an asynchronous update has stalled, and that is checked with {{SM13}}.',

    tur:
      '**The chart of accounts and the account group = {{ozellestirme}}** (goes into a transport request). ' +
      '**The G/L account itself = {{ana-veri}}** (does not go into a transport request — it is opened or loaded ' +
      'separately in each system). Confusing this distinction is one of the most expensive mistakes in data migration ' +
      'projects.',

    transport:
      'Chart of accounts structure, document type definitions, number range definitions and field status groups ' +
      'transport. The accounts themselves, vendor/customer master records, and all documents do not.',

    img: [
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Master Data → G/L Accounts → Preparations → Edit Chart of Accounts List', not:'{{hesap-plani}} definition ({{OB13}})' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Document Types', not:'{{belge-turu}} definition ({{OBA7}})' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Fiscal Year → Maintain Fiscal Year Variant', not:'{{mali-yil-varyanti}} ({{OB29}})' },
    ],

    ekstra: [
      { ic:'🔢', baslik:'Why do account numbers carry meaning?', metin:
        'Turkey uses the Uniform Chart of Accounts, where the first digit gives the account\'s class: ' +
        '**1** current assets, **2** fixed assets, **3** short-term liabilities, **4** long-term liabilities, ' +
        '**5** equity, **6** income statement accounts, **7** cost accounts.\n\n' +
        'SAP does not force this numbering, but you can enforce it through {{hesap-grubu}} and {{numara-araligi}} ' +
        'definitions: you can make sure any account starting with 6 can only be opened in the income/expense group.' },
    ],

    notlar: [
      { tip:'warn', baslik:'Don\'t confuse the posting date with the document date', metin:
        'The document date (`BLDAT`) is the date printed on the invoice and serves as the reference in reporting. ' +
        'The posting date (`BUDAT`) decides which accounting period it falls into. If you post a December 31 invoice ' +
        'on January 5 and don\'t set the posting date to 31.12, the expense lands in the wrong year.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Accounting\'s rules didn\'t change with S/4HANA — what changed is **where those rules live**. In ECC the same ' +
      'data was scattered across dozens of tables that needed constant reconciliation; in S/4HANA it is gathered into ' +
      'one table.',

    eccFarklari: [
      { konu:'Where the data lives', ecc:'{{BSEG}}, {{FAGLFLEXA}}, {{GLT0}}, COEP, {{ANEP}} — separately', s4:'{{ACDOCA}} — all of it in a single line' },
      { konu:'Totals', ecc:'Pre-calculated in separate totals tables ({{FAGLFLEXT}})', s4:'Calculated on the fly from line-item data; no totals table' },
      { konu:'FI–CO reconciliation', ecc:'Requires periodic reconciliation because the tables are separate', s4:'Structurally in agreement, because they sit on the same line' },
      { konu:'Account vs. cost element', ecc:'Two separate master records: G/L account + {{masraf-turu}}', s4:'One master record: the G/L account, with its type set to "Primary Costs"' },
    ],

    universalJournal:
      'The most important consequence for this topic is this: we used to say "the accounting posting goes to FI, the ' +
      'cost posting goes to CO." In S/4HANA, a single line is both an FI line and a CO line at once. Being able to ' +
      'explain this difference is the clearest sign that you actually understand S/4HANA.',

    performans:
      'Because totals are no longer pre-calculated, a balance report now sums millions of line items on the fly. ' +
      'HANA\'s column-based storage does this in seconds. The practical result: a real-time balance sheet becomes ' +
      'possible.',

    bestPractices: [
      'Keep the chart of accounts as lean as possible; instead of opening a new account for every need, use CO ' +
      'objects like {{maliyet-yeri}} and {{kar-merkezi}}.',
      'Use a single global chart of accounts and solve country-specific needs with an alternative account number.',
      'Open income and expense accounts with the correct type in S/4HANA: pick the wrong type and the account never ' +
      'flows into CO at all — and it\'s hard to fix afterward.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik: 'A full month: from incorporation to financial statements',
    hikaye:
      '**Aroma Coffee Inc.** was founded in March 2026. The partners contributed 200,000 TRY in capital. The company ' +
      'bought a coffee machine, purchased beans, made sales, and pulled its statements at month-end. Below, the whole ' +
      'month is posted step by step.',
    veriler: [
      { k:'Company', v:'Aroma Coffee Inc. — company code 1000' },
      { k:'Period', v:'March 2026 (period 03)' },
      { k:'Currency', v:'TRY' },
      { k:'VAT rate', v:'20%' },
    ],

    adimlar: [
      { baslik:'Partners deposit the capital into the bank', tcode:'FB50',
        aciklama:'The company\'s first posting. Cash now sits in the bank, and in exchange an obligation (equity) to the partners has arisen.',
        girdi:[
          { alan:'Document date / Posting date', deger:'01.03.2026 / 01.03.2026' },
          { alan:'Document type', deger:'SA (general ledger document)' },
          { alan:'Line 1', deger:'102 Banks — Debit 200,000' },
          { alan:'Line 2', deger:'500 Capital — Credit 200,000' },
        ],
        fis:{ baslik:'Document 100000001 — Capital contribution', belgeTuru:'SA', tarih:'01.03.2026',
          satirlar:[
            { hesap:'102', ad:'Banks', borc:200000 },
            { hesap:'500', ad:'Capital', alacak:200000 },
          ], not:'An asset increased (debit), a source increased (credit). The equation holds: 200,000 = 200,000.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'1 header line: BELNR 100000001, BLART = SA, BUDAT = 01.03.2026' },
          { tablo:'BSEG', ne:'2 line items: one SHKZG = S (account 102), one SHKZG = H (account 500)' },
          { tablo:'ACDOCA', ne:'The same 2 line items, with RLDNR = 0L (leading ledger)' },
        ] },

      { baslik:'The coffee machine is purchased (60,000 TRY + VAT)', tcode:'ABZON',
        aciklama:'The machine will be used for 5 years, so it is posted as an **asset**, not an expense — this is called ' +
                 '{{aktiflestirme}}. In SAP, a fixed-asset master record is opened first with {{AS01}}, then the ' +
                 'acquisition is posted.',
        girdi:[
          { alan:'Asset number', deger:'100001 (Asset class: Machinery and equipment)' },
          { alan:'Amount', deger:'60,000 TRY' },
          { alan:'Capitalization date', deger:'05.03.2026' },
          { alan:'Useful life', deger:'5 years' },
        ],
        fis:{ baslik:'Document 100000002 — Machine purchase', belgeTuru:'AA', tarih:'05.03.2026',
          satirlar:[
            { hesap:'253', ad:'Plant, machinery and equipment', borc:60000, not:'Fixed asset (capitalized)' },
            { hesap:'191', ad:'Deductible VAT', borc:12000 },
            { hesap:'102', ad:'Banks', alacak:72000 },
          ], not:'Note: the 60,000 TRY was **not** expensed. Because the machine will deliver benefit for 5 years, its cost is spread across those 5 years.' },
        tabloEtkisi:[
          { tablo:'ANLA', ne:'Asset master record created: 100001' },
          { tablo:'ANEP', ne:'Acquisition movement posted (movement type 100)' },
          { tablo:'ACDOCA', ne:'FI line items + the asset number (ANLN1) on the same line' },
        ],
        not:'Because the capitalization date is 05.03, depreciation starts running from March.' },

      { baslik:'Coffee beans purchased — on credit (25,000 TRY + VAT)', tcode:'FB60',
        aciklama:'A liability to the vendor is created. No cash has moved yet, but the liability has arisen — the posting happens now, per {{tahakkuk-esasi}}.',
        girdi:[
          { alan:'Vendor', deger:'V-1001 Anadolu Coffee Ltd.' },
          { alan:'Invoice date / Posting date', deger:'10.03.2026 / 10.03.2026' },
          { alan:'Amount / Tax code', deger:'30,000 TRY gross / 20% VAT' },
          { alan:'Payment terms', deger:'Net 30 → due 09.04.2026' },
        ],
        fis:{ baslik:'Document 190000001 — Vendor invoice', belgeTuru:'KR', tarih:'10.03.2026',
          satirlar:[
            { hesap:'153', ad:'Trade goods', borc:25000 },
            { hesap:'191', ad:'Deductible VAT', borc:5000 },
            { hesap:'320', ad:'Trade payables (V-1001)', alacak:30000, not:'through the {{mutabakat-hesabi}}' },
          ], not:'Line 320 isn\'t entered directly; you enter the vendor number, and SAP finds the reconciliation account from the vendor\'s master record itself.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'A new **open item** was created — not yet paid' },
          { tablo:'BSEG', ne:'The vendor line carries LIFNR = V-1001, AUGBL blank (open)' },
        ] },

      { baslik:'Sales through the month (cash, 48,000 TRY gross total)', tcode:'FB70',
        aciklama:'Sales revenue arose, and cash came in against it.',
        fis:{ baslik:'Document 180000001 — Sale', belgeTuru:'DR', tarih:'31.03.2026',
          satirlar:[
            { hesap:'100', ad:'Cash', borc:48000 },
            { hesap:'600', ad:'Domestic sales', alacak:40000 },
            { hesap:'391', ad:'Calculated VAT', alacak:8000 },
          ], not:'Revenue is **40,000**, not 48,000. 8,000 TRY is a liability to be paid to the state.' },
        tabloEtkisi:[
          { tablo:'BSET', ne:'The tax line is posted separately: base 40,000, tax 8,000' },
        ] },

      { baslik:'Cost of goods sold is posted', tcode:'FB50',
        aciklama:'Its cost has to be posted in **the same period** as the revenue. This is called the matching principle.',
        fis:{ baslik:'Document 100000003 — Cost of goods sold', belgeTuru:'SA', tarih:'31.03.2026',
          satirlar:[
            { hesap:'621', ad:'Cost of goods sold', borc:18000 },
            { hesap:'153', ad:'Trade goods', alacak:18000 },
          ], not:'18,000 TRY of goods left inventory and turned into an expense. 25,000 − 18,000 = 7,000 TRY remains in stock.' } },

      { baslik:'Month-end depreciation run', tcode:'AFAB',
        aciklama:'The machine will be used for 5 years (60 months). Monthly depreciation = 60,000 / 60 = 1,000 TRY. ' +
                 '**No cash moves** in this posting, but an expense arises.',
        girdi:[
          { alan:'Company code / Fiscal year', deger:'1000 / 2026' },
          { alan:'Period', deger:'03' },
          { alan:'Run type', deger:'Test run first, then the real run' },
        ],
        fis:{ baslik:'Document 100000004 — March depreciation', belgeTuru:'AF', tarih:'31.03.2026',
          satirlar:[
            { hesap:'770', ad:'General administrative expense — depreciation', borc:1000 },
            { hesap:'257', ad:'Accumulated depreciation', alacak:1000 },
          ], not:'Account 253 stays at 60,000 TRY; the reduction accumulates in account 257. {{net-defter-degeri}} = 60,000 − 1,000 = 59,000 TRY.' },
        tabloEtkisi:[
          { tablo:'ANLC', ne:'The asset\'s period depreciation and accumulated depreciation were updated' },
          { tablo:'ACDOCA', ne:'The depreciation line item posted along with the asset number and cost center' },
        ],
        not:'{{AFAB}} always runs in test mode first. Once it has run for real, it can only be corrected with a reversal.' },

      { baslik:'The period is closed and statements are pulled', tcode:'F.01',
        aciklama:'Once every posting is done, {{OB52}} closes March and the financial statements are produced.',
        girdi:[
          { alan:'Period control', deger:'{{OB52}} → period 03 closed, period 04 opened' },
          { alan:'Report', deger:'{{F.01}} → balance sheet + income statement per the financial statement version' },
        ] },
    ],

    sonuc:
      '**March 2026 result:**\n\n' +
      'Revenue 40,000 − cost of goods sold 18,000 − depreciation 1,000 = **21,000 TRY profit**.\n\n' +
      'The cash change is something else entirely. 200,000 came in, 72,000 went out for the machine, 48,000 came in ' +
      'from sales, and the 30,000 TRY for the beans is **still unpaid**. So bank + cash = 176,000 TRY, while profit is ' +
      '21,000 TRY. The two being different isn\'t an error — it\'s proof that the accounting is working correctly.\n\n' +
      'Balance sheet check: Assets (176,000 cash + 7,000 inventory + 59,000 net machine + 17,000 VAT receivable) = ' +
      'Sources (30,000 vendor payable + 8,000 VAT payable + 200,000 capital + 21,000 profit). Both sides come to ' +
      '**259,000 TRY**.',
  },

  },
});
