/* ==========================================================================
   content/fi-en/gl-accounting.js — English body for "G/L Accounting"
   Same conventions as content/fi-en/genel-muhasebe.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'gl-accounting',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      '{{ana-muhasebe}} (G/L — General Ledger) is the central ledger the financial statements are produced from. ' +
      'Every other FI sub-component (vendors, customers, fixed assets, bank) reflects here **as a summary**, ' +
      'through a {{mutabakat-hesabi}}.\n\n' +
      'Think of the split this way: the detail of 800 vendors is held in the {{muavin-defter}}; in general ledger ' +
      'you see a single "320 Trade payables" line. The balance sheet comes out from that one line, and you drill ' +
      'into the sub-ledger with {{FBL1N}} when detail is needed.',

    neden:
      '**To produce financial statements.** The balance sheet and income statement only come out of general ledger accounts.\n\n' +
      '**To keep detail manageable.** If every vendor had its own G/L account, the chart of accounts would run into ' +
      'the thousands and the balance sheet would be unreadable.\n\n' +
      '**To be the single point of truth.** MM, SD, HR, CO — every one of their numbers meets and gets compared here.',

    sirketOnemi:
      'General ledger is the face the company shows to the outside. The figures looked at when taking out a bank ' +
      'loan, going through an audit, or filing a tax return come from here.\n\n' +
      'For a consultant: G/L is FI\'s **backbone**. If the chart of accounts is designed wrong, the cost lasts for ' +
      'years — changing the account structure in production means migrating every open balance. That\'s why the ' +
      'chart of accounts is the most-debated topic on a project, and the one that needs to be locked earliest.',

    gercekHayat:
      'Picture a holding company: 6 company codes, all sharing the same chart of accounts. The CEO asks: "what\'s ' +
      'the group\'s total personnel cost?"\n\n' +
      'If each company used its own account numbers, answering that would need a manual mapping table. Thanks to a ' +
      'shared {{hesap-plani}}, a single report sums up all 6 companies. That\'s general ledger\'s cross-company ' +
      'power — and it\'s why a consultant pushes back on the "let every company use its own chart" request.',

    muhasebeMantigi:
      'General ledger has two types of accounts, and they behave differently:\n\n' +
      '**Balance sheet accounts** ({{SKA1}} `XBILK` = X): the balance isn\'t zeroed at year-end, it carries forward ' +
      'into the new year ({{bakiye-devri}}). Cash, banks, inventory, vendors, capital.\n\n' +
      '**Income statement accounts**: measure a period, are zeroed out at year-end, and the result moves to equity. ' +
      'Sales, expenses, depreciation.\n\n' +
      'There\'s a third split too: is the account subject to {{acik-kalem-yonetimi}}? If so, every item is tracked ' +
      'open/cleared and can be {{kapatma}}-ed ({{gr-ir}}, bank clearing accounts, advances). If not, only the ' +
      'balance matters (sales revenue, rent expense).',

    kavramlar: ['ana-muhasebe', 'hesap-plani', 'mutabakat-hesabi', 'acik-kalem-yonetimi', 'alan-durumu',
                'bilanco', 'gelir-tablosu', 'bakiye-devri', 'mali-tablo-yapisi', 'evrensel-kayit-defteri'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The general ledger process is a **cycle**: the account structure is built, postings flow in, ' +
      'reconciliation is performed, the period is closed, and statements are produced. Most postings come from ' +
      'other modules or sub-ledgers; manual entries into general ledger are usually corrections, accruals, and reclasses.',

    roller:[
      { rol:'FI consultant', gorev:'Designs the chart of accounts, account groups, field status variant, and {{mali-tablo-yapisi}}.' },
      { rol:'Master data team', gorev:'Opens and maintains G/L accounts with {{FS00}}.' },
      { rol:'Accounting specialist', gorev:'Enters manual postings ({{FB50}}), clears open items ({{F-03}}), performs account reconciliation.' },
      { rol:'Accounting manager', gorev:'Opens/closes periods ({{OB52}}), approves high-value postings, signs off on the statements.' },
      { rol:'Auditor', gorev:'Reviews account movements ({{FBL3N}}) and change trails ({{CDPOS}}).' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The general ledger cycle',
      adimlar:[
        { ic:'🏗️', rol:'FI consultant', baslik:'The account structure is built',
          aciklama:'{{hesap-plani}} ({{OB13}}), {{hesap-grubu}} and {{alan-durumu}} ({{OBD4}}), {{mali-tablo-yapisi}} ({{OB58}}).',
          cikti:'A configured chart of accounts', ok:'accounts are opened' },
        { ic:'📗', rol:'Master data team', baslik:'G/L accounts are opened',
          aciklama:'The chart-of-accounts and company-code levels ({{SKA1}} + {{SKB1}}) via {{FS00}}.',
          cikti:'Accounts ready for use', ok:'postings start flowing in' },
        { ic:'📥', rol:'Every module', baslik:'Postings flow in',
          aciklama:'Automatically from MM, SD, HR; from the sub-ledgers via a {{mutabakat-hesabi}}; manually with {{FB50}}.',
          cikti:'FI documents ({{BKPF}}/{{BSEG}}/{{ACDOCA}})', ok:'balances form' },
        { ic:'🔗', rol:'Accounting', baslik:'Open items are cleared',
          aciklama:'On accounts with {{acik-kalem-yonetimi}} ({{gr-ir}}, bank clearing accounts) via {{F-03}} or {{F.13}}.',
          cikti:'Cleaned-up clearing accounts', ok:'at period end' },
        { ic:'⚖️', rol:'Accounting', baslik:'Reconciliation and checks',
          aciklama:'{{FS10N}}/{{FAGLB03}} for balances, {{FBL3N}}/{{FAGLL03}} for items. The sub-ledger total is compared against the reconciliation account.',
          cikti:'Verified balances', ok:'if a correction is needed' },
        { ic:'🔧', rol:'Accounting', baslik:'Correction and accrual postings',
          aciklama:'A reclass via {{FB50}}, an accrual to be reversed via {{FBS1}}, depreciation via {{AFAB}}, FX valuation via {{F.05}}.',
          cikti:'Correction documents', ok:'the period closes' },
        { ic:'🔒', rol:'Accounting manager', baslik:'The period is closed, statements are pulled',
          aciklama:'The period is closed via {{OB52}}, the balance sheet and income statement are produced via {{F.01}}.',
          cikti:'Financial statements', ok:'if it is year-end' },
        { ic:'🔄', rol:'System', baslik:'Balance carryforward',
          aciklama:'{{FAGLGVTR}}: balance sheet accounts carry forward, income statement accounts are zeroed and the result moves to equity.',
          cikti:'New-year opening balances' },
      ],
    },

    adimlar:[
      { rol:'FI consultant', eylem:'Defines the chart of accounts and group structure', sistem:'{{OB13}}, {{OBD4}}, {{OB58}}' },
      { rol:'Master data team', eylem:'Opens the G/L accounts', sistem:'{{FS00}} → {{SKA1}}, {{SKB1}}' },
      { rol:'System / Accounting', eylem:'Postings are created', sistem:'{{FB50}}, {{F-02}}, and automatically via integration' },
      { rol:'Accounting', eylem:'Clearing accounts are cleaned up', sistem:'{{F-03}}, {{F.13}}' },
      { rol:'Accounting', eylem:'Balance and item checks', sistem:'{{FS10N}}, {{FBL3N}}, {{FAGLL03}}' },
      { rol:'Accounting', eylem:'Period-end adjustments', sistem:'{{FBS1}}, {{AFAB}}, {{F.05}}, {{F.19}}' },
      { rol:'Accounting manager', eylem:'Period close and reporting', sistem:'{{OB52}}, {{F.01}}, {{FAGLGVTR}}' },
    ],

    veriAkisi:{
      nereden:'Sub-ledgers ({{BSIK}}, {{BSID}}, {{ANLC}}) through reconciliation accounts; from MM/SD/HR integration; from manual FI postings.',
      nereye:'{{ACDOCA}} → balances → {{mali-tablo-yapisi}} → the {{bilanco}} and {{gelir-tablosu}}. Also into the {{maliyet-yeri}} and {{kar-merkezi}} dimensions on the CO side.',
      tetikleyen:'Every posted transaction. General ledger is a passive receiver — it doesn\'t generate its own postings, it collects what arrives.',
      sonraki:'Consolidation, tax filing, management reporting, audit.',
    },

    notlar:[
      { tip:'tip', baslik:'When is a general ledger posting entered manually?', metin:
        'In a healthy setup, a manual G/L posting is entered in only four cases: a **reclass** (a correction between ' +
        'accounts), an **accrual/provision** (matching-principle postings), **opening balances** (data migration), ' +
        'and **error correction**. If manual postings keep happening outside these, something is missing in the integration.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'In general ledger, postings come from three sources, and the accounting logic is the same in every one: a ' +
      'document balanced on both sides. What differs is **who** produces the posting and **how** the account gets decided.',

    etkilenenHesaplar:[
      { hesap:'Reconciliation accounts (320, 120, 25x)', tur:'Balance sheet', neden:'Reflected automatically from the sub-ledger; can\'t be posted to directly. A single line on the balance sheet, thousands of items behind it.' },
      { hesap:'Clearing accounts ({{gr-ir}}, {{banka-ara-hesabi}})', tur:'Balance sheet', neden:'Carries the timing gap between two events. {{acik-kalem-yonetimi}} **must be on**, or clearing can\'t happen and the balance inflates.' },
      { hesap:'Expense accounts (6xx, 7xx)', tur:'Income statement', neden:'Integrated with CO; a {{maliyet-yeri}} is requested at posting. In S/4HANA the account\'s type must be "Primary Costs."' },
      { hesap:'Income accounts (60x)', tur:'Income statement', neden:'Usually comes in automatically from SD; {{VKOA}} decides the account.' },
      { hesap:'Tax accounts (191, 391)', tur:'Balance sheet', neden:'SAP adds the line automatically once a {{vergi-kodu}} is entered; never typed by hand, and separately recorded in {{BSET}}.' },
      { hesap:'Equity / period profit (5xx, 59x)', tur:'Balance sheet', neden:'At year-end, the balance of the income statement accounts moves here ({{bakiye-devri}}).' },
    ],

    fisler:[
      { baslik:'Source 1 — A manual reclass posting ({{FB50}})',
        belgeTuru:'SA', tarih:'30.06.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', alacak:15000, not:'Had been posted to the wrong account' },
          { hesap:'760', ad:'Marketing and distribution expense', borc:15000, not:'The correct account' },
        ],
        not:'A classic reclass: the total expense doesn\'t change, only its classification is corrected. The balance sheet is unaffected; the income statement\'s **distribution** is fixed.' },

      { baslik:'Source 2 — Reflected from a sub-ledger (a vendor invoice)',
        belgeTuru:'KR', tarih:'12.06.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:50000 },
          { hesap:'191', ad:'Deductible VAT', borc:10000 },
          { hesap:'320', ad:'Trade payables (reconciliation)', alacak:60000, not:'Automatic from the sub-ledger' },
        ],
        not:'In general ledger this shows up as a single line: "320 Trade payables 60,000." Which vendor it belongs ' +
             'to **isn\'t there** — that information lives in {{BSIK}}. This split is general ledger\'s design philosophy.' },

      { baslik:'Source 3 — A period-end accrual ({{FBS1}}, set to reverse)',
        belgeTuru:'SA', tarih:'30.06.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — electricity', borc:8000, not:'Used in June' },
          { hesap:'381', ad:'Accrued expenses', alacak:8000, not:'The invoice hasn\'t arrived yet' },
        ],
        not:'{{tahakkuk-esasi}}: the electricity was used in June, the invoice will arrive in July. The expense is ' +
             'posted to June. This document, entered via {{FBS1}}, is **automatically reversed** on 01.07.2026 via ' +
             '{{F.81}}; there\'s no double posting once the real invoice arrives.' },

      { baslik:'Year-end — closing the income statement accounts ({{FAGLGVTR}})',
        belgeTuru:'SA', tarih:'31.12.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'600', ad:'Domestic sales', borc:1200000, not:'Zeroed out' },
          { hesap:'621', ad:'Cost of goods sold', alacak:700000, not:'Zeroed out' },
          { hesap:'770', ad:'General administrative expenses', alacak:300000, not:'Zeroed out' },
          { hesap:'590', ad:'Net income for the period', alacak:200000, not:'Moved to equity' },
        ],
        not:'Income statement accounts are zeroed out, and the net result (the {{gelir-tablosu}}\'s outcome) moves ' +
             'into the period-profit account under equity. Balance sheet accounts, on the other hand, carry ' +
             'forward with their balance — they aren\'t zeroed.' },
    ],

    tHesaplar:[
      { hesap:'General administrative expense', kod:'770 (Expense)',
        borc:[{ ad:'Vendor invoice', tutar:50000 }, { ad:'Electricity accrual', tutar:8000 }],
        alacak:[{ ad:'Reclass correction', tutar:15000 }, { ad:'Year-end closing', tutar:43000 }],
        not:'Zeroed out at year-end' },
      { hesap:'GR/IR account', kod:'159 (Clearing — open item managed)',
        borc:[{ ad:'Invoice entry', tutar:80000 }],
        alacak:[{ ad:'Goods receipt', tutar:80000 }],
        not:'Should be close to zero at period end' },
      { hesap:'Trade payables (reconciliation)', kod:'320 (Balance sheet)',
        borc:[{ ad:'Payments', tutar:180000 }],
        alacak:[{ ad:'Invoices', tutar:240000 }],
        not:'The balance carries forward into the new year' },
      { hesap:'Net income for the period', kod:'590 (Equity)',
        borc:[],
        alacak:[{ ad:'Year-end carryforward', tutar:200000 }],
        not:'The income statement\'s result lands here' },
    ],

    notlar:[
      { tip:'warn', baslik:'If open item management is set up wrong', metin:
        'If {{acik-kalem-yonetimi}} is off on a clearing account like {{gr-ir}} or {{banka-ara-hesabi}}, items can ' +
        '**never be cleared**. The balance inflates over the years and stops reflecting reality. Changing this ' +
        'setting once the account has movements isn\'t easy — which is why getting it right when the account is ' +
        'opened matters so much.' },
      { tip:'tip', baslik:'How is reconciliation checked?', metin:
        'Pull the total of the vendor open items with {{FBL1N}}, then look at account 320\'s balance with ' +
        '{{FS10N}}/{{FAGLB03}}. The two should be equal. If they aren\'t, either a posting was made directly to the ' +
        'reconciliation account (a configuration gap) or the reconciliation account was changed mid-period.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'G/L accounts are classified along three axes, and these classes decide how the account behaves. All three ' +
      'questions need an answer when an account is opened.',
    liste:[
      { ad:'Balance Sheet Account',
        aciklama:'Its balance isn\'t zeroed at year-end, it carries forward into the new year. Marked with {{SKA1}} `XBILK` = X.',
        neZaman:'For asset, liability, and equity items: cash, banks, inventory, vendors, capital.',
        ornek:'320 Trade payables — the December 31 balance becomes the January 1 opening balance.' },

      { ad:'P&L Account',
        aciklama:'Measures a period, is zeroed out at year-end, and the result moves to equity.',
        neZaman:'For income and expense items: sales, expenses, depreciation.',
        ornek:'600 Domestic sales — starts from zero every year; moved to 590 at year-end via {{bakiye-devri}}.' },

      { ad:'Reconciliation Account',
        aciklama:'General ledger\'s counterpart to a sub-ledger. Marked with the {{SKB1}} `MITKZ` field: **D** customer, **K** vendor, **A** fixed asset.',
        neZaman:'Whenever vendor, customer, and fixed asset balances need to reflect into general ledger — which is to say, always.',
        ornek:'320 Trade payables. **Cannot be posted to directly**; postings go through the vendor number.',
        tcodes:['FS00','FBL1N'] },

      { ad:'Open Item Managed Account',
        aciklama:'Every item is tracked open/cleared; can be {{kapatma}}-ed. {{SKB1}} `XOPVW` = X.',
        neZaman:'On accounts that act as a bridge between two events: {{gr-ir}}, {{banka-ara-hesabi}}, advance accounts, employee advances.',
        ornek:'159 GR/IR — the goods receipt posts a credit, the invoice receipt posts a debit; once they match, the item is cleared.',
        tcodes:['F-03','F.13','FBRA'] },

      { ad:'Balance-only Account',
        aciklama:'No item matching happens; only the balance matters.',
        neZaman:'On income and expense accounts, and the main bank account. Turning on open item management unnecessarily makes performance and usage worse.',
        ornek:'770 General administrative expense — there\'s no question like "which expense was cleared by which payment."' },

      { ad:'Primary Cost Element (S/4HANA account type)',
        aciklama:'An FI expense account that also flows into CO. Chosen as an account type in {{FS00}} in S/4HANA; ECC needed a separate master record via {{KA01}}.',
        neZaman:'On every expense account that needs to be tracked by {{maliyet-yeri}}.',
        ornek:'770 General administrative expense — if the type "Primary Costs or Revenue" isn\'t chosen, the posting never flows into CO at all.',
        tcodes:['FS00','OKB9','KSB1'] },
    ],

    karsilastirmaBasliklar:['Classic General Ledger', 'New General Ledger (New G/L)'],
    karsilastirma:[
      ['Line item table', '{{BSEG}} + {{BSIS}}/{{BSAS}}', '{{FAGLFLEXA}} → {{ACDOCA}} in S/4'],
      ['Totals table', '{{GLT0}}', '{{FAGLFLEXT}} → removed in S/4'],
      ['Profit-center-based balance sheet', 'Not possible (needs a separate PCA module)', 'Possible via {{belge-bolme}}'],
      ['Parallel accounting', 'Through extra accounts or an extra company code', 'A clean solution via {{paralel-defter}}'],
      ['FI–CO reconciliation', 'A periodic reconciliation is needed', 'Real-time integration'],
      ['Line item report', '{{FBL3N}}', '{{FAGLL03}}'],
      ['Balance report', '{{FS10N}}', '{{FAGLB03}}'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FS00', ad:'Central G/L account maintenance',
        amac:'Manages the account\'s chart-of-accounts ({{SKA1}}) and company-code ({{SKB1}}) levels on a single screen.',
        neZaman:'When opening a new account; when diagnosing an account\'s behavior (why is this field mandatory, why can\'t clearing be done).',
        adimlar:[
          { baslik:'Enter the account number + company code', aciklama:'The number must fall within the {{hesap-grubu}}\'s range.' },
          { baslik:'*Type/description*: account group and balance-sheet/income-statement split',
            aciklama:'S/4HANA also asks for the **account type**. If "Primary Costs or Revenue" isn\'t chosen for an expense account, it never flows into CO.' },
          { baslik:'*Control data*: currency, tax category, open item management, reconciliation account type',
            aciklama:'{{acik-kalem-yonetimi}} is turned on here. Hard to change later — the right decision is made here.' },
          { baslik:'*Create/bank/interest*: field status group',
            aciklama:'The setting that decides which field is mandatory on the posting screen ({{SKB1}} `FSTAG`).' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Account 159000, company code 1000 → Create' },
          { ekran:'Type/description', islem:'Account group: Clearing accounts · Balance sheet account · Type: Balance Sheet' },
          { ekran:'Control data', islem:'Currency TRY · **Open item management: X** · Line item display: X · Sort key: 014' },
          { ekran:'Create/bank/interest', islem:'Field status group: G001' },
        ],
        alanlar:{
          zorunlu:['Account number','Company code','Account group','Balance sheet/Income statement','Short text','Currency','Field status group'],
          opsiyonel:['Tax category','Open item management','Line item display','Sort key','Reconciliation account type','Alternative account number'] },
        hatalar:[
          { mesaj:'Account 159000 not created in chart of accounts', sebep:'The chart-of-accounts level doesn\'t exist.', cozum:'Create the chart-of-accounts level with {{FSP0}}; {{FS00}} already does both at once.' },
          { mesaj:'Open item management cannot be activated; account has postings', sebep:'The account has movements.', cozum:'Zero the balance → change the setting → restore the balance. Alternative: open a new account and migrate the balance.' },
          { mesaj:'Account number not within number range of account group', sebep:'The {{hesap-grubu}}\'s range doesn\'t match.', cozum:'Choose the correct group or fix the range with {{OBD4}}.' },
        ],
        ipucu:'When opening a clearing account ({{gr-ir}}, bank clearing account), always set the **open item ' +
              'management and sort key**. The sort key fills the `ZUONR` field and enables automatic clearing via {{F.13}}.',
        ilgili:['FSP0','FSS0','OBD4','FBL3N','FS10N'] },

      { kod:'FB50', ad:'G/L posting entry (enter view)',
        amac:'Enters a general ledger posting in a table layout. Debit/credit is chosen instead of a posting key.',
        neZaman:'For reclass, accrual, provision, and correction postings.',
        adimlar:[
          { baslik:'Enter the dates and company code', aciklama:'The posting date (`BUDAT`) decides the period.' },
          { baslik:'Enter the lines: account, D/C, amount', aciklama:'An expense account may ask for a cost center.' },
          { baslik:'Check the balance indicator', aciklama:'It won\'t let you post until it turns green ({{belge-denkligi}}).' },
          { baslik:'*Document → Simulate*', aciklama:'Shows the tax and {{belge-bolme}} lines the system will add, without posting.' },
          { baslik:'Save', aciklama:'A document number is assigned; it can no longer be deleted, only reversed with {{FB08}}.' },
        ],
        ekranAkisi:[
          { ekran:'Header', islem:'Document date 30.06.2026 · Posting date 30.06.2026 · Company code 1000' },
          { ekran:'Line item table, line 1', islem:'760 Marketing expense · Debit · 15,000 · Cost center 2100' },
          { ekran:'Line item table, line 2', islem:'770 General administrative expense · Credit · 15,000 · Cost center 1200' },
          { ekran:'Simulation', islem:'2 lines shown, balance 0 · Save' },
        ],
        alanlar:{
          zorunlu:['Document date','Posting date','Company code','G/L account','Debit/Credit','Amount'],
          opsiyonel:['Document type','Reference','Header text','Tax code','Cost center','Assignment','Line text'] },
        hatalar:[
          { mesaj:'Posting period 006 2026 is not open for account type S', sebep:'The period is closed for general ledger.', cozum:'{{OB52}} → the period variant → open the period on the account-type **S** line.' },
          { mesaj:'Account 320000 cannot be directly posted to', sebep:'The account is a {{mutabakat-hesabi}}.', cozum:'Post through the vendor/customer with {{FB60}}/{{FB70}}.' },
          { mesaj:'Balance in transaction currency', sebep:'Debit ≠ credit.', cozum:'Check the lines; if you want to keep the document, park it with {{FV50}}.' },
          { mesaj:'Cost center 1200 is blocked for primary postings', sebep:'The cost center has a posting lock, or is outside its validity dates.', cozum:'Ask the CO team to remove the lock, or use a valid cost center.' },
        ],
        ipucu:'For frequently entered postings, build an **account assignment model**: the "Template" button at the ' +
              'top of the screen calls up ready-made lines. Saves a lot of time on routine month-end postings.',
        ilgili:['F-02','FV50','FB03','FB08','FBD1'] },

      { kod:'FBL3N', ad:'G/L line item list',
        amac:'Lists an account\'s items on an open, cleared, or all-items basis. General ledger\'s "general ledger page."',
        neZaman:'To understand where a balance came from, to clean up clearing accounts, and to reconcile.',
        adimlar:[
          { baslik:'Enter the account and company code' },
          { baslik:'Choose the item type: open / cleared / all',
            aciklama:'This distinction is only meaningful on accounts with {{acik-kalem-yonetimi}} active. A **key date** is entered when open items is selected.' },
          { baslik:'Set the layout',
            aciklama:'Add/remove columns, get totals, group subtotals. You can save your own layout as the default — the habit that saves the most time in everyday work.' },
          { baslik:'Double-click a line → drill into the document ({{FB03}})' },
        ],
        ekranAkisi:[
          { ekran:'Selection screen', islem:'G/L account 159000 · Company code 1000 · **Open items** · Key date 30.06.2026' },
          { ekran:'Item list', islem:'Items are listed; debit/credit total at the bottom' },
          { ekran:'Change layout', islem:'Assignment (`ZUONR`) and text columns are added, subtotaled by assignment' },
          { ekran:'Document detail', islem:'Double-click → {{FB03}}' },
        ],
        hatalar:[
          { mesaj:'No items selected', sebep:'The selection criteria are too narrow, or the account had no movement in that period.', cozum:'Widen the date range; choose "all items." If line item display ({{SKB1}} `XKRES`) is off, no items ever appear.' },
          { mesaj:'Account is not managed on an open item basis', sebep:'{{acik-kalem-yonetimi}} is off on the account.', cozum:'List with "all items"; there\'s no open/cleared split on this account.' },
        ],
        ipucu:'When cleaning up a clearing account, set the layout to **subtotal by the assignment (`ZUONR`) field**. ' +
              'Items that offset each other land next to each other, and the ones that need clearing stand out at a glance.',
        ilgili:['FAGLL03','FS10N','FB03','F-03','F.13'] },

      { kod:'F-03', ad:'G/L account clearing',
        amac:'Manually matches offsetting items on an account with {{acik-kalem-yonetimi}} active.',
        neZaman:'For cleaning up {{gr-ir}} and bank clearing accounts; for items {{F.13}} couldn\'t clear automatically.',
        adimlar:[
          { baslik:'Enter the account, company code, and clearing date' },
          { baslik:'*Process open items* → items are listed' },
          { baslik:'Select the items to clear', aciklama:'The selected items\' **net amount must be zero**; the "Not assigned" field at the bottom of the screen must show zero.' },
          { baslik:'Save', aciklama:'A clearing document is generated and written into the `AUGBL` field of the cleared items.' },
        ],
        hatalar:[
          { mesaj:'Difference too large for clearing', sebep:'The selected items don\'t sum to zero and the gap is outside the {{tolerans-grubu}}.', cozum:'Select the correct items; if it\'s a genuinely small difference, enter a difference line or review the tolerance group.' },
          { mesaj:'Account is not open item managed', sebep:'{{acik-kalem-yonetimi}} is off on the account.', cozum:'Clearing can\'t be done on this account; check whether the account master was set up correctly.' },
        ],
        ipucu:'Don\'t panic over a wrong clearing: {{FBRA}} reverses the clearing and the items go back to open.',
        ilgili:['F.13','FBRA','FBL3N','F-32','F-44'] },

      { kod:'FAGLL03', ad:'G/L line item list (new general ledger)',
        amac:'A line item report by {{defter}}. {{FBL3N}}\'s New G/L and S/4HANA counterpart.',
        neZaman:'On systems using {{paralel-defter}}, and for profit-center/segment-based analysis.',
        adimlar:[
          { baslik:'Choose the account, company code, and **ledger**', aciklama:'The leading ledger is 0L. If there\'s a separate ledger for IFRS, the same account can show different amounts.' },
          { baslik:'Filter on additional dimensions', aciklama:'{{kar-merkezi}}, segment, functional area — fields that don\'t exist in {{FBL3N}}.' },
        ],
        ipucu:'It\'s normal for the same account to show a different balance in the 0L ledger and the IFRS ledger; that\'s the whole point of parallel accounting.',
        ilgili:['FBL3N','FAGLB03','FBL3H'] },

      { kod:'F.13', ad:'Automatic clearing',
        amac:'Matches open items in bulk and automatically according to defined clearing rules.',
        neZaman:'For the routine month-end cleanup of {{gr-ir}} and bank clearing accounts.',
        adimlar:[
          { baslik:'Enter the company code, account range, and date' },
          { baslik:'Run in **test mode** first', aciklama:'See which items would be cleared, without posting.' },
          { baslik:'Review the result, then run in production mode' },
        ],
        ipucu:'{{F.13}}\'s matching criterion is the `ZUONR` (assignment) field filled in from the account\'s **sort ' +
              'key**. If the assignment field is blank, automatic clearing doesn\'t work — the problem isn\'t in ' +
              '{{F.13}}, it\'s in the account master.',
        hatalar:[
          { mesaj:'No clearing possible / no items were cleared', sebep:'The assignment fields don\'t match, or no clearing rule is defined.', cozum:'Set the sort key in {{FS00}}; check the "Automatic Clearing" rules in IMG.' },
        ],
        ilgili:['F-03','FBRA','FBL3N'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'General ledger\'s table structure is the area S/4HANA simplified the most. In ECC, the same information was ' +
      'held in four separate places (item, index, totals, new-G/L item); in S/4HANA the single source is ' +
      '{{ACDOCA}}, and the rest turned into {{uyumluluk-view}}s.',

    liste:[
      { ad:'SKA1', baslik:'Account — chart-of-accounts level',
        tutar:'Number, account group, balance-sheet/income-statement split. Independent of company code.',
        olusturan:'{{FS00}} / {{FSP0}}',
        guncelleyen:'{{FS00}}, {{FSP0}}, data load',
        anahtar:'KTOPL + SAKNR',
        iliskiler:'1-to-n with {{SKB1}}; {{SKAT}} for language-specific texts.',
        s4:'Unchanged; an account-type field (GLACCOUNT_TYPE) was added.',
        alanlar:[
          { ad:'KTOKS', aciklama:'{{hesap-grubu}}' },
          { ad:'XBILK', aciklama:'X = balance sheet account, blank = income statement account' },
        ] },

      { ad:'SKB1', baslik:'Account — company code level',
        tutar:'The account\'s behavior settings: currency, tax category, open item management, field status group, reconciliation type, sort key.',
        olusturan:'{{FS00}} / {{FSS0}}',
        guncelleyen:'{{FS00}}, {{FSS0}}',
        anahtar:'BUKRS + SAKNR',
        iliskiler:'{{BSEG}}.HKONT and {{ACDOCA}}.RACCT point here.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'XOPVW', aciklama:'{{acik-kalem-yonetimi}} — required for clearing' },
          { ad:'MITKZ', aciklama:'Reconciliation type: D / K / A. If filled, no direct posting is possible.' },
          { ad:'FSTAG', aciklama:'{{alan-durumu}} group' },
          { ad:'ZUAWA', aciklama:'Sort key — fills the `ZUONR` field, critical for {{F.13}}' },
          { ad:'XKRES', aciklama:'Line item display — if off, {{FBL3N}} shows no items' },
        ] },

      { ad:'BSEG', baslik:'Document line items (classic)',
        tutar:'Every posting\'s line-level account, amount, direction, and additional dimensions.',
        olusturan:'Every transaction that produces an FI document',
        guncelleyen:'Posting transactions; clearing transactions update the `AUGBL`/`AUGDT` fields',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'A child of {{BKPF}}; linked to {{SKB1}} via the account.',
        s4:'Still written, but not used for reporting because it\'s a cluster table.',
        alanlar:[
          { ad:'SHKZG', aciklama:'S = debit, H = credit' },
          { ad:'AUGBL', aciklama:'Clearing document — if blank, the item is **open**' },
          { ad:'ZUONR', aciklama:'Assignment — the matching field for automatic clearing' },
        ] },

      { ad:'ACDOCA', baslik:'Universal Journal',
        tutar:'FI + CO + AA + ML data on a single line; split by ledger.',
        olusturan:'Every posted transaction',
        guncelleyen:'Every FI and CO transaction',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'Via the document number with {{BKPF}}; via the account with {{SKB1}}; directly with the CO objects.',
        s4:'General ledger\'s single source of truth. Balances are calculated from here in real time.',
        alanlar:[
          { ad:'RLDNR', aciklama:'{{defter}} — 0L is the leading ledger' },
          { ad:'RACCT', aciklama:'Account number' },
          { ad:'HSL', aciklama:'Amount in company-code currency' },
          { ad:'RCNTR / PRCTR', aciklama:'Cost center / profit center — on the same line' },
        ] },

      { ad:'GLT0', baslik:'Classic general ledger totals',
        tutar:'Debit/credit totals by account and period. {{FS10N}}\'s source.',
        olusturan:'Used to be updated at posting time in classic general ledger',
        guncelleyen:'Every FI posting in ECC',
        anahtar:'RLDNR + BUKRS + RACCT + RYEAR',
        iliskiler:'A summary derived from {{BSEG}}.',
        s4:'**Removed.** A {{uyumluluk-view}} of the same name produces data from {{ACDOCA}}; no writing is possible.' },

      { ad:'BSIS', baslik:'G/L open items (index)',
        tutar:'Uncleared items of open-item-managed accounts.',
        olusturan:'A posting to an open-item-managed account',
        guncelleyen:'Posting transactions; the item used to move to {{BSAS}} once cleared',
        anahtar:'BUKRS + HKONT + AUGDT + AUGBL + ZUONR + GJAHR + BELNR + BUZEI',
        iliskiler:'A fast-access index of {{BSEG}}.',
        s4:'**Removed**, turned into a {{uyumluluk-view}}. A custom program writing to it directly breaks.' },
    ],

    er:{
      type:'er',
      baslik:'General ledger table relationships',
      varliklar:[
        { ad:'SKA1', rol:'Master data', aciklama:'Chart-of-accounts level',
          alanlar:[{ ad:'KTOPL', tip:'pk' }, { ad:'SAKNR', tip:'pk' }, { ad:'XBILK' }] },
        { ad:'SKB1', rol:'Master data', aciklama:'Company code level',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'SAKNR', tip:'fk' }, { ad:'XOPVW' }, { ad:'MITKZ' }] },
        { ad:'BKPF', rol:'Header', aciklama:'Document identity',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'BSEG', rol:'Line item', aciklama:'Classic line item',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'ACDOCA', rol:'Universal', hub:true, aciklama:'S/4HANA\'s single source',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'RACCT', tip:'fk' }, { ad:'HSL' }] },
        { ad:'BSIS', rol:'Index', aciklama:'G/L open items (a view in S/4)',
          alanlar:[{ ad:'HKONT', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZUONR' }] },
        { ad:'GLT0', rol:'Totals', aciklama:'Classic totals (a view in S/4)',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'RACCT', tip:'fk' }, { ad:'RYEAR' }] },
      ],
      iliskiler:[
        { from:'SKA1', to:'SKB1', alanlar:'SAKNR', not:'one account, many company codes' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'header → line item' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR + GJAHR', not:'the universal view' },
        { from:'BSEG', to:'SKB1', alanlar:'HKONT → SAKNR', not:'the line\'s account' },
        { from:'ACDOCA', to:'SKB1', alanlar:'RACCT → SAKNR', not:'the universal line\'s account' },
        { from:'BSEG', to:'BSIS', alanlar:'BELNR + BUZEI', not:'the open-item index' },
        { from:'ACDOCA', to:'GLT0', alanlar:'RACCT + RYEAR', not:'in S/4, totals are produced from here' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Below is the screen flow for the two most common general ledger tasks: **entering a posting** and ' +
      '**explaining a balance**. The second one takes more consulting time than the first.',

    ekranlar:[
      { ad:'{{FB50}} — entering a posting',
        aciklama:'Header fields on top, the line item table below, the balance indicator in the top right.',
        alanlar:[
          { ad:'Posting date (`BUDAT`)', zorunlu:true, aciklama:'Decides the period. Posting is blocked if the period is closed.' },
          { ad:'G/L account', zorunlu:true, aciklama:'A reconciliation account can\'t be entered.' },
          { ad:'D/C and amount', zorunlu:true, aciklama:'Can\'t save until the totals balance.' },
          { ad:'Cost center', zorunlu:false, aciklama:'Usually made mandatory by {{alan-durumu}} on expense accounts.' },
          { ad:'Assignment (`ZUONR`)', zorunlu:false, aciklama:'**Very important** on an open-item-managed account: {{F.13}} matches based on this field.' },
        ],
        ipucu:'Always run *Document → Simulate* before posting. On systems with {{belge-bolme}} active, this is where you see a 2-line entry turn into 6.' },

      { ad:'{{FBL3N}} — explaining a balance',
        aciklama:'The answer to "why is account 159\'s balance 340,000?" is found on this screen.',
        alanlar:[
          { ad:'G/L account', zorunlu:true, aciklama:'The account to examine.' },
          { ad:'Item type', zorunlu:true, aciklama:'Open / cleared / all. **Open items** is chosen for clearing-account cleanup.' },
          { ad:'Key date', zorunlu:true, aciklama:'Answers "what was open as of which date" when open items is chosen.' },
          { ad:'Layout', zorunlu:false, aciklama:'Add assignment and text columns, subtotal by assignment — this is how unmatched items get found.' },
        ],
        ipucu:'Save the layout and make it the default so it\'s ready on every launch. This small habit saves half an hour a day in consulting.' },

      { ad:'{{F-03}} — the clearing screen',
        aciklama:'Open items are listed; the selected ones\' net amount must be zero.',
        alanlar:[
          { ad:'Account and clearing date', zorunlu:true, aciklama:'The posting date of the clearing document.' },
          { ad:'Item selection', zorunlu:true, aciklama:'The "Not assigned" field at the bottom of the screen must be **zero**; otherwise clearing can\'t happen.' },
        ],
        ipucu:'If you get "Difference too large," you\'ve usually selected the wrong items; check your selection before touching the tolerance setting.' },
    ],

    zorunlu:['Document date','Posting date','Company code','G/L account','Debit/Credit','Amount'],
    opsiyonel:['Document type','Reference','Header text','Tax code','Cost center','Profit center','Assignment','Line text'],

    hatalar:[
      { mesaj:'Posting period ... is not open for account type S', sebep:'In {{OB52}}, the period is closed for general ledger (S).', cozum:'Open the period on the S line in the period variant; also check authorization (the authorization group field).' },
      { mesaj:'Account ... cannot be directly posted to', sebep:'A {{mutabakat-hesabi}}.', cozum:'Post through the sub-ledger with {{FB60}}/{{FB70}}.' },
      { mesaj:'Account ... requires an assignment to a CO object', sebep:'A primary cost element with no CO object entered.', cozum:'Enter a cost center, or define a default with {{OKB9}}.' },
      { mesaj:'G/L account ... is blocked for posting in company code ...', sebep:'The account is closed for posting in {{FS00}}.', cozum:'Find out why it was blocked; remove the block if it\'s genuinely needed.' },
      { mesaj:'Difference too large for clearing', sebep:'The items to be cleared don\'t sum to zero, and the gap is outside the {{tolerans-grubu}}.', cozum:'Fix the selection or enter a difference line.' },
      { mesaj:'Field Business Area is a required field', sebep:'The company code\'s field status variant makes business area mandatory.', cozum:'Enter a business area; review the field status variant for a permanent fix.' },
      { mesaj:'Ledger 0L: document splitting error — item not assigned', sebep:'{{belge-bolme}} rules couldn\'t classify the line.', cozum:'Check the document-splitting characteristics and item category assignments in IMG.' },
    ],

    ipuclari:[
      'For routine month-end postings, set up an **account assignment model** or a **recurring entry** ({{FBD1}} + {{F.14}}). Fixed postings like rent, insurance, and depreciation shouldn\'t be typed by hand.',
      'Enter period-end accruals with {{FBS1}}; {{F.81}} reverses them automatically in the next period and removes the double-posting risk.',
      'When an account\'s balance looks off, first use {{FS10N}}/{{FAGLB03}} to find which period it broke in, then drill into that period\'s items with {{FBL3N}}. Doing it the other way wastes time.',
      'Set up the sort key correctly on clearing accounts; automatic clearing via {{F.13}} depends on it.',
      'Save your {{FBL3N}} layouts and make them the default. Adjusting columns every time is where a consultant loses the most time.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Document header' },
      { tablo:'BSEG', ne:'Items (classic)' },
      { tablo:'ACDOCA', ne:'Universal items; a separate set of lines for each active ledger' },
      { tablo:'BSET', ne:'Tax lines, if a tax code is present' },
      { tablo:'BSIS', ne:'An open item on an open-item-managed account (via a view in S/4)' },
      { tablo:'GLT0', ne:'Totals in ECC; not updated in S/4HANA, produced from a view' },
    ],

    commit:
      'A posting is written within a single LUW. Because number assignment runs separately, even a failed ' +
      'transaction can consume a number — gaps in document numbers are normal. If an asynchronous update stalls, ' +
      'it\'s checked with {{SM13}}.',

    belgeNo:
      'The chain: {{belge-turu}} → the number range key ({{T003}}) → the company code + fiscal year line in ' +
      '{{FBN1}} → the next number. Assigned at the moment of posting.',

    postingLogic:
      'The path a posting follows in general ledger:\n\n' +
      '**1.** The document type decides the allowed account types.\n' +
      '**2.** The debit/credit chosen in {{FB50}} turns into a {{kayit-anahtari}} in the background (40 debit, 50 credit).\n' +
      '**3.** The account\'s field status group ({{SKB1}} `FSTAG`) is compared against the posting key\'s field status; the **more restrictive** one applies.\n' +
      '**4.** If there\'s a tax code, a tax line and a {{BSET}} record are generated.\n' +
      '**5.** If {{belge-bolme}} is on, lines are split by profit center/segment.\n' +
      '**6.** {{belge-denkligi}} is checked — separately for each ledger.\n' +
      '**7.** A number is assigned, and {{BKPF}}/{{BSEG}}/{{ACDOCA}} are written.\n' +
      '**8.** If the account is open-item-managed, an index record is created.',

    belgeTuru:
      'The most common types in general ledger: **SA** (general G/L posting), **AB** (general document, allows ' +
      'every account type), **AF** (depreciation), **SB** (G/L account posting). The type decides the number range ' +
      'and the allowed account types.',

    numberRange:
      'Keyed by company code + fiscal year ({{FBN1}}). New-year lines are bulk-copied from the previous year with ' +
      '{{OBH1}} — a standard step of year-start preparation. The range **definition** transports, but the ' +
      '**current counter** doesn\'t.',

    accountDetermination:
      'In general ledger, the user enters the account directly; automatic determination only applies to **lines ' +
      'the system itself generates**: the tax line from {{OB40}}, exchange-difference and rounding accounts from ' +
      'the automatic-posting settings in IMG, lines coming from MM/SD via {{OBYC}}/{{VKOA}}. All of them write to table {{T030}}.',

    tur:
      '**Configuration:** the chart of accounts ({{OB13}}), account groups and field status ({{OBD4}}), the field ' +
      'status variant, document types ({{OBA7}}), number range definitions ({{FBN1}}), {{mali-tablo-yapisi}} ({{OB58}}), automatic clearing rules.\n\n' +
      '**Master data:** the G/L accounts themselves ({{SKA1}} + {{SKB1}}).',

    transport:
      'Configuration transports; accounts don\'t. This is the most common surprise on projects: a scenario that ' +
      'works in the test system throws an "account doesn\'t exist" error in production. Accounts must be loaded ' +
      'separately ({{LTMC}}/{{LSMW}} or by hand).',

    img:[
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Master Data → G/L Accounts → Preparations → Edit Chart of Accounts List', not:'{{hesap-plani}} ({{OB13}})' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Master Data → G/L Accounts → Preparations → Define Account Group', not:'{{hesap-grubu}} + {{alan-durumu}} ({{OBD4}})' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Posting Periods → Open and Close Posting Periods', not:'Period control ({{OB52}})' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Open Item Clearing → Prepare Automatic Clearing', not:'{{F.13}} clearing rules' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Reporting → Financial Statements → Define Financial Statement Versions', not:'{{mali-tablo-yapisi}} ({{OB58}})' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Closing → Carry Forward → Balance Carryforward', not:'{{bakiye-devri}} ({{FAGLGVTR}})' },
    ],

    ekstra:[
      { ic:'🧩', baslik:'Types of chart of accounts', metin:
        'SAP has three types of chart of accounts, and they\'re commonly confused:\n\n' +
        '**Operational chart of accounts** — the mandatory one, where daily postings happen. Held in {{T001}} `KTOPL`.\n\n' +
        '**Country chart of accounts** — the numbering local law requires. Linked through the *alternative account ' +
        'number* field on the account master. Turkish Uniform Chart of Accounts reporting can be solved this way.\n\n' +
        '**Group chart of accounts** — a shared numbering for consolidation. Rolls up the different operational charts of companies in different countries into a single umbrella.' },

      { ic:'⚖️', baslik:'Field status variant vs. field status group', metin:
        'The two get mixed up but are different:\n\n' +
        '**The field status group** is tied to the account ({{SKB1}} `FSTAG`) — "which fields are mandatory when ' +
        'posting to this account?"\n\n' +
        '**The field status variant** is tied to the company code ({{OBY6}}) — the container that gathers the ' +
        'groups. A group not defined in a company code\'s variant can\'t be used in that company code.\n\n' +
        'If a field is defined in both the account group and the posting key, **the more restrictive one wins**.' },
    ],

    notlar:[
      { tip:'warn', baslik:'The open item management decision is hard to reverse', metin:
        'This setting can\'t be changed while the account has movements. Changing it means zeroing the balance, ' +
        'changing the setting, and restoring the balance — a risky operation in production. That\'s why, when ' +
        'opening an account, the question "will item matching be done on this account?" **must** be answered.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'General ledger is the area S/4HANA changed the most — but what changed is **the data model, not the ' +
      'accounting**. The chart of accounts, posting logic, and financial statements are the same; what changed is where the totals and indexes sit.',

    eccFarklari:[
      { konu:'Source of the balance', ecc:'The {{GLT0}} / {{FAGLFLEXT}} totals tables', s4:'Calculated on the fly from {{ACDOCA}}' },
      { konu:'Open item index', ecc:'A physical table: {{BSIS}} / {{BSAS}}', s4:'{{uyumluluk-view}} — no physical table' },
      { konu:'Line item report', ecc:'{{FBL3N}}', s4:'{{FAGLL03}} / {{FBL3H}} / Fiori' },
      { konu:'Cost element', ecc:'A separate master record via {{KA01}}', s4:'The G/L account\'s type ({{FS00}})' },
      { konu:'Line item count limit', ecc:'{{BSEG}} 999 items', s4:'{{ACDOCA}} `DOCLN` 6 digits — practically no limit' },
      { konu:'Number of currencies', ecc:'2 (local + one more)', s4:'Up to 10 parallel currencies' },
      { konu:'Lock contention', ecc:'A totals table row gets locked', s4:'No totals table — the lock issue disappears' },
    ],

    universalJournal:
      'For general ledger, the {{evrensel-kayit-defteri}} has three concrete consequences:\n\n' +
      '**1. The concept of reconciliation changes.** Because FI and CO sit on the same line, a mismatch between ' +
      'them can\'t arise. The FI–CO reconciliation that used to be part of the month-end routine in ECC becomes unnecessary.\n\n' +
      '**2. The balance is no longer stored, it\'s calculated.** So a retroactive correction posting makes ' +
      'balances consistent instantly; the "the totals table broke, let\'s rebuild it" scenario disappears.\n\n' +
      '**3. Every dimension is usable in every report.** Cost center, profit center, segment, and asset number sit ' +
      'on the same line, so they\'re reportable without any extra join.',

    kalkanTcodes:[
      { eski:'{{KA01}} / KA02', yeni:'{{FS00}}', not:'The cost element turned into a G/L account type' },
      { eski:'{{FBL3N}}', yeni:'{{FAGLL03}} / {{FBL3H}}', not:'Still works, but the new one is recommended for ledger-based reporting' },
      { eski:'{{FS10N}}', yeni:'{{FAGLB03}} / Fiori Trial Balance', not:'For ledger-based balances' },
      { eski:'{{F.16}}', yeni:'{{FAGLGVTR}}', not:'Balance carryforward moved to the new general ledger program' },
    ],

    fiori:[
      { ad:'Post General Journal Entries', aciklama:'Replaces {{FB50}}; supports bulk upload via an Excel template.' },
      { ad:'Display Line Items in General Ledger', aciklama:'The Fiori face of {{FAGLL03}}; instant filtering and grouping.' },
      { ad:'Trial Balance', aciklama:'A real-time trial balance; drill from account to line item to document in one click.' },
      { ad:'Clear G/L Accounts', aciklama:'Replaces {{F-03}}; shows proposed matches on its own.' },
      { ad:'Manage G/L Account Master Data', aciklama:'Replaces {{FS00}}; supports bulk editing.' },
      { ad:'Financial Statement', aciklama:'Replaces {{F.01}}; presents the financial statement structure with a visual hierarchy.' },
    ],

    compatibilityViews:[
      '{{GLT0}}, {{FAGLFLEXT}} — the totals tables turned into views.',
      '{{BSIS}}, {{BSAS}} — the G/L open/cleared item indexes turned into views.',
      '**Writing to these views is not possible.** An old custom program works if it only reads; it breaks during migration if it does an INSERT/UPDATE.',
      'Scanning Z-programs that write to these tables is the single most important technical prep on the general ledger side of a migration.',
    ],

    performans:
      'Because there\'s no totals table, no lock contention happens at posting time — hundreds of simultaneous ' +
      'postings to the same account don\'t queue up behind each other. On the read side, column-based storage sums ' +
      'millions of items in seconds. The practical result: a real-time trial balance and an instant balance sheet become possible.',

    bestPractices:[
      'Simplify the chart of accounts during the S/4HANA migration. You can replace dozens of accounts opened just ' +
      'for reporting with {{kar-merkezi}} and {{maliyet-yeri}} dimensions — the universal journal already carries these.',
      'Open expense accounts with the correct type ("Primary Costs or Revenue"); the wrong type is close to unfixable afterward.',
      'Build new reports on CDS views; rewrite {{BSEG}}-based custom reports instead of migrating them as-is.',
      'Clean up clearing accounts ({{gr-ir}}, bank clearing accounts) before migration. Dirty open items migrate into the new system, and cleaning them up there is harder.',
      'If you\'re going to use {{belge-bolme}}, decide **before** migration; turning it on afterward is very costly.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'The story of a clearing account — why is the GR/IR balance 340,000 TRY?',
    hikaye:
      'At month-end close at **Marmara Textiles Inc.**, the accounting manager sees account 159 GR/IR\'s balance: ' +
      '**340,000 TRY credit**. It was expected to be close to zero. This scenario shows, start to finish, how a ' +
      'general ledger balance gets explained and corrected — one of the most common jobs in consulting.',
    veriler:[
      { k:'Company code', v:'1000' },
      { k:'Account', v:'159000 — GR/IR account (open item managed)' },
      { k:'Period', v:'June 2026' },
      { k:'Expected balance', v:'~0 TRY' },
      { k:'Observed balance', v:'340,000 TRY credit' },
    ],

    adimlar:[
      { baslik:'The period the balance broke in is found', tcode:'FS10N',
        aciklama:'Answer the **which month** question first. Looking period by period before diving into the item list saves time.',
        girdi:[
          { alan:'Account / Company code', deger:'159000 / 1000' },
          { alan:'Fiscal year', deger:'2026' },
          { alan:'Finding', deger:'The January–April balance is ~0; **May shows 260,000, June shows 340,000 credit**' },
        ],
        not:'The balance broke in May and is growing. So orders where goods arrived but the invoice never did are piling up.' },

      { baslik:'Open items are listed and grouped', tcode:'FBL3N',
        aciklama:'Open items are listed, **subtotaled by the assignment field**. Items that offset each other land next to each other; the ones left alone are the problem.',
        girdi:[
          { alan:'Account', deger:'159000' },
          { alan:'Item type', deger:'**Open items**, key date 30.06.2026' },
          { alan:'Layout', deger:'Assignment (`ZUONR`), Reference, Text columns added; subtotaled by assignment' },
          { alan:'Finding', deger:'18 open items. 14 match up (goods receipt + invoice). **4 items alone: 340,000 TRY credit total**' },
        ],
        tabloEtkisi:[
          { tablo:'BSIS', ne:'This report reads from here (a view over {{ACDOCA}} in S/4HANA)' },
        ] },

      { baslik:'The lone items are traced to their documents', tcode:'FB03',
        aciklama:'Each open item is double-clicked into its document; the `AWKEY` field leads to the source MM document.',
        girdi:[
          { alan:'Items 1–3', deger:'Material document 5000001xxx — a goods receipt was posted, no invoice yet (280,000 TRY)' },
          { alan:'Item 4', deger:'Material document 5000001999 — **goods were returned but the invoice was never credited** (60,000 TRY)' },
        ],
        not:'Two different problems were found: the first is a normal timing gap, the second is a genuine error.' },

      { baslik:'The timing gap is reclassified', tcode:'F.19',
        aciklama:'The 280,000 TRY piece is a genuine timing gap: the goods arrived, the invoice will come in July. It ' +
                 'shouldn\'t appear on the balance sheet as "GR/IR" — it should show as **"goods received, not yet invoiced."**',
        girdi:[
          { alan:'Company code / Period', deger:'1000 / 06.2026' },
          { alan:'Run', deger:'Test mode first, then production' },
        ],
        fis:{ baslik:'Document 100000456 — GR/IR reclassification', belgeTuru:'SA', tarih:'30.06.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR account', borc:280000, not:'Being temporarily cleared out' },
            { hesap:'326', ad:'Goods received, not yet invoiced', alacak:280000, not:'A balance-sheet presentation account' },
          ], not:'This posting is **automatically reversed on July 1**; {{F.19}} schedules it itself. The only purpose is a correct presentation on the June 30 balance sheet.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'The reclassification document and the reversal document (dated 01.07.2026)' },
        ] },

      { baslik:'The genuine error is fixed — a return-invoice correction', tcode:'MIRO',
        aciklama:'The 60,000 TRY item is an error: goods were returned, but no credit memo was ever posted to the ' +
                 'vendor. This isn\'t a classification issue, it\'s a **missing transaction**.',
        girdi:[
          { alan:'Transaction', deger:'Credit memo' },
          { alan:'Purchase order', deger:'4500001456' },
          { alan:'Amount', deger:'72,000 TRY (60,000 + 20% VAT)' },
        ],
        fis:{ baslik:'Document 5100000234 — Vendor credit memo', belgeTuru:'RE', tarih:'30.06.2026',
          satirlar:[
            { hesap:'320', ad:'Trade payables', borc:72000, not:'The liability to the vendor decreased' },
            { hesap:'159', ad:'GR/IR account', alacak:60000, not:'The counterpart of the return movement' },
            { hesap:'191', ad:'Deductible VAT', alacak:12000, not:'VAT correction' },
          ], not:'With the return movement posted, the 60,000 TRY item in GR/IR can now be matched.' } },

      { baslik:'The matched items are cleared', tcode:'F.13',
        aciklama:'Items that can now be matched are cleaned up with automatic clearing. Run in test mode first.',
        girdi:[
          { alan:'Company code / Account', deger:'1000 / 159000' },
          { alan:'Mode', deger:'Test first → 16 items to be cleared → production mode' },
        ],
        tabloEtkisi:[
          { tablo:'BSEG', ne:'The cleared items\' `AUGBL` field was written with the clearing document number' },
          { tablo:'BSIS', ne:'The cleared items were removed from here' },
          { tablo:'BSAS', ne:'Moved here as cleared items' },
        ],
        not:'{{F.13}} matches based on the assignment (`ZUONR`) field. If nothing gets cleared, the problem isn\'t in {{F.13}}, it\'s in the account\'s sort key.' },

      { baslik:'The period is closed and statements are pulled', tcode:'OB52',
        aciklama:'Once GR/IR is cleaned up, June is closed and the financial statements are produced.',
        girdi:[
          { alan:'Period control', deger:'{{OB52}} → period 06 closed, 07 opened' },
          { alan:'Report', deger:'{{F.01}} → balance sheet; account 159 is now ~0, account 326 shows 280,000' },
        ] },
    ],

    sonuc:
      'The 340,000 TRY balance split into two: **280,000 TRY was a genuine timing gap** (reclassified for correct ' +
      'presentation) and **60,000 TRY was a genuine error** (a missing credit memo).\n\n' +
      'The real lesson of this scenario is general ledger\'s working method:\n\n' +
      '**1.** See the balance ({{FS10N}}) → **2.** Find which period it broke in → **3.** Drill into the open items ' +
      '({{FBL3N}}) → **4.** Trace the lone items to their documents ({{FB03}}) → **5.** Tell a classification issue ' +
      'apart from a real error → **6.** Fix it and clear it ({{F.13}}).\n\n' +
      'These six steps solve almost every balance problem in general ledger. This is what "account analysis" means in consulting.',
  },

  },
});
