/* ==========================================================================
   content/fi-en/reporting.js — English body for "Reporting"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'reporting',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'FI reporting answers **two basic questions**, and every tool falls into one side or the other:\n\n' +
      '**"What\'s the balance?"** → balance reports ({{FS10N}}, {{FAGLB03}}). ' +
      'They give period-by-period totals, and they\'re fast.\n\n' +
      '**"What documents make up this balance?"** → **{{dokum}}** (line item) reports ' +
      '({{FBL3N}}, {{FBL1N}}, {{FBL5N}}, {{FAGLL03}}). ' +
      'They give individual lines, and you can double-click into the document.\n\n' +
      'A third layer is **financial statements** ({{F.01}}): it groups accounts according to the ' +
      '{{mali-tablo-yapisi}} and produces the balance sheet and income statement.\n\n' +
      'In S/4HANA, **Fiori and {{cds-view}}-based analytics** were added on top of these — ' +
      'but the classic reports weren\'t removed and are still the first tools reached for in consulting.',

    neden:
      '**Decision support.** A trial balance is a number; whoever can **see behind that number** is the one who decides.\n\n' +
      '**Legal obligation.** The balance sheet and income statement must be presented in a specific structure.\n\n' +
      '**Diagnosis.** Most FI problems are found by reading a report: which document, which user, which date.\n\n' +
      '**Reconciliation.** Whether the sub-ledger and general ledger agree can only be verified with comparative reports.\n\n' +
      '**Audit.** Being able to produce whatever the auditor asks for within minutes is a sign of the system\'s maturity.',

    sirketOnemi:
      'Reporting is the area a consultant **uses the most** but configures the least. ' +
      'Most reports work out of the box; the job is **choosing the right report and using it with the right ' +
      'layout**.\n\n' +
      'The most common problem isn\'t technical, it\'s conceptual: a user looks for a detail they can\'t see ' +
      'in a balance report and says "the system doesn\'t work." What they\'re actually looking for is in the ' +
      '**line item report**.\n\n' +
      'The distinguishing question is: **"{{FBL3N}} comes back empty but the account has a balance. Why?"** ' +
      'The right answer: **line item display** isn\'t turned on for the account ({{SKB1}}). ' +
      'The balance exists, but the items were never stored. ' +
      'If the setting is turned on afterward, **past items still don\'t show up** — only the postings that come after.',

    gercekHayat:
      'The finance director asks: *"Account 770 has 4.2 million TRY of expense. What is it?"*\n\n' +
      'The accountant opens {{FS10N}} — sees the balance but **can\'t see the detail**. ' +
      'The report gives period-by-period totals: January 380,000, February 410,000…\n\n' +
      'The right tool is {{FBL3N}}: it lists **every single item** on account 770. ' +
      'But in the default layout there\'s only a document number, date, and amount. ' +
      'There\'s no answer to *"which department?"*\n\n' +
      'The fix is {{alv-duzeni}}: a **cost center** column is added, a subtotal is taken by expense type, and ' +
      'the layout is saved.\n\n' +
      'Now the question turns into: *"Marketing spent 1.2 million — there\'s a spike in October, which ' +
      'document?"* Double-click drills into the document, and who entered the invoice becomes visible.\n\n' +
      '**Reporting skill is choosing the right tool and building its layout** — not writing a new report.',

    muhasebeMantigi:
      'The accounting logic of FI reporting rests on a **two-level data structure**:\n\n' +
      '**The item level** — every document line. The detail lives here; but summing it is expensive because ' +
      'there can be millions of rows.\n\n' +
      '**The totals level** — amounts accumulated by account × period. Fast, but no detail.\n\n' +
      'Classic SAP held these two **in separate tables** ({{BSEG}} and {{GLT0}}), and they could go out of ' +
      'sync — *"the totals table doesn\'t match the item table"* was a classic problem.\n\n' +
      'In S/4HANA the **totals table was removed**: {{ACDOCA}} only holds items, and totals are calculated at ' +
      'read time. A mismatch has become **structurally impossible**.\n\n' +
      'The third layer is the **financial statement version**: the hierarchy that maps accounts to balance ' +
      'sheet/income statement lines. This is where accounting data turns into **a presentation format**.',

    kavramlar: ['dokum', 'alv-duzeni', 'mali-tablo-yapisi', 'mizan',
                'cds-view', 'evrensel-kayit-defteri'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The reporting process **starts with the question, not the tool**. ' +
      'The right order: clarify the question → choose the right report type → build the layout → ' +
      'save it and reuse it.',

    roller:[
      { rol:'Accounting user', gorev:'Pulls daily line item reports ({{FBL3N}}, {{FBL1N}}); uses the layouts.' },
      { rol:'General ledger accounting', gorev:'Produces the trial balance and financial statements ({{F.01}}); performs reconciliation.' },
      { rol:'FI consultant', gorev:'Designs the {{mali-tablo-yapisi}} ({{OB58}}), builds general layouts.' },
      { rol:'Controller', gorev:'Prepares management reports; combines them with CO reports.' },
      { rol:'Auditor', gorev:'Requests document dumps and the {{degisiklik-belgesi}}.' },
      { rol:'Developer', gorev:'Builds with Report Painter or {{cds-view}} when the standard report falls short.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'From question to report — choosing the right tool',
      adimlar:[
        { ic:'❓', rol:'User', baslik:'The question is clarified',
          aciklama:'Is it *"what\'s the balance?"*, *"what makes up this balance?"*, or *"how does the ' +
                   'legal statement look?"* — the three call for three different tools.',
          cikti:'A clarified question', ok:'a tool is chosen' },
        { ic:'📊', rol:'User', baslik:'The balance question → {{FS10N}} / {{FAGLB03}}',
          aciklama:'Period-by-period totals. Fast, but **no detail**. ' +
                   'In S/4HANA, {{FAGLB03}} offers a ledger and segment filter.',
          cikti:'A balance table', ok:'if detail is needed' },
        { ic:'📋', rol:'User', baslik:'The detail question → {{FBL3N}} / {{FAGLL03}}',
          aciklama:'An item-by-item list. **Double-click drills into the document.** ' +
                   'Precondition: **line item display** must be on for the account.',
          cikti:'A line item report', ok:'if a column is missing' },
        { ic:'🎛️', rol:'User', baslik:'{{alv-duzeni}} is built and **saved**',
          aciklama:'The needed columns are added (cost center, tax code, dunning level), ' +
                   'and a subtotal is taken. **Build it once, use it forever.**',
          cikti:'A saved layout', ok:'the legal statement' },
        { ic:'📑', rol:'General ledger accounting', baslik:'The financial statement → {{F.01}}',
          aciklama:'The {{mali-tablo-yapisi}} ({{OB58}}) maps accounts to balance sheet/income statement ' +
                   'lines.',
          cikti:'Balance sheet + income statement', ok:'a special need' },
        { ic:'🛠️', rol:'Developer', baslik:'A custom report when the standard falls short',
          aciklama:'Report Painter ({{GR55}}), the {{SQVI}} quick query, or ' +
                   'a {{cds-view}}-based Fiori app in S/4HANA.',
          cikti:'A custom report' },
      ],
    },

    adimlar:[
      { rol:'User', eylem:'Looks at the balance', sistem:'{{FS10N}} · {{FAGLB03}}' },
      { rol:'User', eylem:'Pulls a line item report', sistem:'{{FBL3N}} · {{FBL1N}} · {{FBL5N}} · {{FAGLL03}}' },
      { rol:'User', eylem:'Adds columns and saves the layout', sistem:'{{alv-duzeni}} — general or personal' },
      { rol:'User', eylem:'Drills into the document', sistem:'Double-click → {{FB03}}' },
      { rol:'Consultant', eylem:'Defines the financial statement version', sistem:'{{OB58}}' },
      { rol:'General ledger accounting', eylem:'Pulls the balance sheet/income statement', sistem:'{{F.01}}' },
      { rol:'Controller', eylem:'Prepares a custom report', sistem:'{{GR55}} Report Painter · {{SQVI}}' },
      { rol:'Auditor', eylem:'Requests the change trail', sistem:'{{FK04}} · {{FD04}} · {{CDHDR}}' },
    ],

    veriAkisi:{
      nereden:'{{ACDOCA}} (S/4) or {{BSEG}}+{{GLT0}} (ECC); master data descriptions; ' +
              'the {{mali-tablo-yapisi}} hierarchy.',
      nereye:'The on-screen list, Excel export, PDF, a Fiori dashboard.',
      tetikleyen:'A user query; the periodic close; an audit request.',
      sonraki:'A decision, a reconciliation, a correction posting.',
    },

    notlar:[
      { tip:'warn', baslik:'If line item display is off, no report can be pulled — and it can\'t be turned on retroactively', metin:
        'If {{FBL3N}} comes back **empty** for an account, the first place to check is the ' +
        '**line item display** flag in {{SKB1}}.\n\n' +
        'If that flag is off, the system **doesn\'t store** items for that account — ' +
        'it only keeps totals. The balance shows up, the detail doesn\'t.\n\n' +
        '**The critical point:** the setting can be turned on later, but it **doesn\'t affect the past**. ' +
        'Postings made after it\'s turned on get listed; earlier periods stay ' +
        '**permanently** without detail.\n\n' +
        'That\'s why the decision has to be made correctly when the account is opened. ' +
        'General rule: **it should be kept on for every account that might need detail**. ' +
        'The only reason to keep it off used to be performance — and in S/4HANA that reason is gone too.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Reporting **doesn\'t produce postings** — but it determines how accounting data gets presented. ' +
      'The examples below show how the same data looks in different reports.',

    etkilenenHesaplar:[
      { hesap:'All accounts', tur:'—', neden:'Reporting is a read operation; it doesn\'t change any account.' },
      { hesap:'Accounts with line item display on', tur:'Structural', neden:'{{SKB1}} — {{dokum}} can only be pulled on these. The setting **doesn\'t work retroactively**.' },
      { hesap:'{{mutabakat-hesabi}} accounts', tur:'Balance sheet', neden:'Doesn\'t accept direct postings; its report is pulled from the sub-ledger ({{FBL1N}}/{{FBL5N}}).' },
      { hesap:'Accounts not assigned in the financial statement version', tur:'Reporting risk', neden:'Accumulates in the **"unassigned"** line in {{F.01}} — the balance sheet looks like it doesn\'t balance.' },
    ],

    fisler:[
      { baslik:'A sample posting — how will it look in reports?',
        belgeTuru:'KR', tarih:'12.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Advertising expense — cost center 4200', borc:180000 },
          { hesap:'191', ad:'Deductible VAT', borc:36000 },
          { hesap:'320', ad:'Trade payables — V-3012', alacak:216000 },
        ],
        not:'This single posting shows up in three different reports:\n\n' +
             '**{{FS10N}}** → **180,000 TRY is added** to account 770\'s October total. ' +
             'The document number doesn\'t show.\n\n' +
             '**{{FBL3N}}** → listed as a separate **line**; the document number, date, amount, and ' +
             '(if added to the layout) the **cost center** show up.\n\n' +
             '**{{F.01}}** → account 770 is mapped, via the {{mali-tablo-yapisi}}, to the ' +
             '"Marketing expenses" line on the income statement; it doesn\'t appear on its own, it goes ' +
             'into the **group total**.' },

      { baslik:'The reconciliation account\'s report — why doesn\'t {{FBL3N}} work?',
        belgeTuru:'—', tarih:'—', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables (reconciliation account)', borc:0, alacak:0,
            not:'{{FBL3N}} → **useless**' },
        ],
        not:'320 is a {{mutabakat-hesabi}}: it doesn\'t accept direct postings, ' +
             'postings come in through the vendor.\n\n' +
             '{{FBL3N}} technically works, but it gives a flat list **without vendor information** — ' +
             'you can\'t tell which vendor, which invoice.\n\n' +
             '**The right tool is {{FBL1N}}:** it pulls a report by vendor, splits open/cleared items, ' +
             'and shows the due date and dunning information.\n\n' +
             'The same principle applies on the customer side: {{FBL5N}} is used for 120.\n\n' +
             '*(The 0/0 shown in the table is there to emphasize that this account doesn\'t take direct postings.)*' },

      { baslik:'An **unassigned account** in the financial statement version — a silent reporting error',
        belgeTuru:'—', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770300', ad:'Newly opened advertising expense account', borc:1240000,
            not:'**Unassigned** in {{OB58}}' },
          { hesap:'—', ad:'Shows up in the "Unassigned accounts" line in {{F.01}}', alacak:1240000,
            not:'**In the wrong place** on the income statement' },
        ],
        not:'A new expense account was opened but **never added** to the {{mali-tablo-yapisi}}.\n\n' +
             'Result: the 1,240,000 TRY expense accumulates in the **"Unassigned accounts"** line on the ' +
             'income statement, not under "Marketing expenses."\n\n' +
             'The trial balance is right, the total is right — but the **presentation is wrong**. ' +
             'The management report shows marketing expense as lower than it actually is.\n\n' +
             '**Prevention:** the account-opening procedure should include a check for *"was it assigned ' +
             'in the financial statement version?"* The "unassigned" line in {{F.01}} must always be ' +
             '**zero**.\n\n' +
             '*(The two lines in the table show the same amount in two different presentations; ' +
             'in reality there\'s only one posting.)*' },
    ],

    tHesaplar:[
      { hesap:'Advertising expense', kod:'770300',
        borc:[{ ad:'October invoices', tutar:1240000 }],
        alacak:[],
        not:'Correct in the trial balance — in the wrong place in the financial statement' },
    ],

    notlar:[
      { tip:'tip', baslik:'Balance or line items? — ask the right question', metin:
        'The problem users run into most often is choosing the **wrong report type**.\n\n' +
        'The question *"the account has 4.2 million, what is it?"* is a **line item** question — but most ' +
        'users look for it in a balance report and don\'t find it.\n\n' +
        'The split is simple:\n\n' +
        '**"How much?"** → a balance report ({{FS10N}}, {{FAGLB03}})\n' +
        '**"Why this much?"** → a line item report ({{FBL3N}}, {{FAGLL03}})\n' +
        '**"How does it look on the legal statement?"** → {{F.01}}\n\n' +
        'The distinguishing feature of a line item report is that **it can drill into the document**: ' +
        'double-clicking opens {{FB03}} and answers *"who entered it, with which invoice."*\n\n' +
        'This one feature is the **basic tool** of FI diagnostic work.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'FI reports fall into **four groups**. Choosing the right group is most of what reporting skill is.',

    liste:[
      { ad:'G/L Account Balances',
        aciklama:'The account\'s period-by-period debit, credit, and balance totals.',
        neZaman:'The *"how much?"* question; a quick check; trial balance preparation.',
        ornek:'January 380,000 · February 410,000 · … There\'s **no detail**; the document number doesn\'t show.',
        tcodes:['FS10N'] },

      { ad:'G/L Balances (New G/L)',
        aciklama:'{{FS10N}} with a ledger, {{kar-merkezi}}, and segment filter.',
        neZaman:'When {{paralel-defter}} or segment reporting is in place.',
        ornek:'**If the ledger field is left blank, the leading ledger is returned** — ' +
              'the ledger code has to be entered for the IFRS balance.',
        tcodes:['FAGLB03'] },

      { ad:'G/L Line Items',
        aciklama:'An account\'s **individual items**; you can double-click into the document.',
        neZaman:'The *"why this much?"* question; diagnosis; an audit dump.',
        ornek:'**Precondition:** {{SKB1}} line item display must be on for the account. ' +
              'If it\'s off, the report **comes back empty** and the setting **doesn\'t work retroactively**.',
        tcodes:['FBL3N'] },

      { ad:'Vendor / Customer Line Items',
        aciklama:'A report by vendor and customer; splits **open/cleared items**.',
        neZaman:'Vendor payables, customer receivables, aging, dunning analysis.',
        ornek:'The {{mutabakat-hesabi}}\'s report is pulled from here — not from {{FBL3N}}. ' +
              'Due-date, dunning-level, and payment-block columns can be added.',
        tcodes:['FBL1N','FBL5N'] },

      { ad:'G/L Line Items (New G/L)',
        aciklama:'{{FBL3N}} with a ledger, profit center, and segment filter.',
        neZaman:'Segment analysis; seeing the result of document splitting.',
        ornek:'{{FBL3N}} reads the **entry view**, {{FAGLL03}} the **general ledger view**. ' +
              'Them showing a different number of lines **isn\'t a bug** (see {{konu:new-gl}}).',
        tcodes:['FAGLL03'] },

      { ad:'Financial Statements',
        aciklama:'Groups accounts by the {{mali-tablo-yapisi}} and produces the legal statement.',
        neZaman:'Period end; statutory reporting; a management presentation.',
        ornek:'**The "Unassigned accounts" line must be zero.** ' +
              'If it isn\'t, an account hasn\'t been added to the structure and is being reported **in the wrong place**.',
        tcodes:['F.01','OB58'] },

      { ad:'Report Painter',
        aciklama:'Producing a custom financial report without programming, by defining rows and columns.',
        neZaman:'When the standard report isn\'t enough; when the management report format is custom.',
        ornek:'Report groups are run with {{GR55}}. ' +
              'The learning curve is steep, but **no developer is required**.',
        tcodes:['GR55'] },

      { ad:'QuickViewer',
        aciklama:'Joins tables and produces a list report; a **personal** tool.',
        neZaman:'A one-off analysis; a quick data pull.',
        ornek:'It\'s personal and can\'t be shared. It should be moved to ' +
              'SAP Query if it\'s going to see wide use.',
        tcodes:['SQVI'] },

      { ad:'Table Display',
        aciklama:'Raw table data. **Not a report** — a diagnostic tool.',
        neZaman:'When you need to see what value a field actually carries.',
        ornek:'Things like a {{VBRK}} `RFBSK` check, a {{T030K}} missing-row diagnosis. ' +
              '**Should never be given to an end user** — authorization control is weak.',
        tcodes:['SE16N'] },

      { ad:'Fiori Analytical Apps',
        aciklama:'{{cds-view}}-based visual reports calculated on the fly.',
        neZaman:'In S/4HANA; for management dashboards and free-form analysis.',
        ornek:'Trial Balance, Display Line Items, Financial Statement — ' +
              'the modern counterparts of the classic reports. **The classics weren\'t removed.**' },
    ],

    karsilastirmaBasliklar:['Balance report', 'Line item report'],
    karsilastirma:[
      ['The question it answers', '**"How much?"**', '**"Why this much?"**'],
      ['Data level', 'Account × period total', 'Individual document line'],
      ['Drills into the document?', 'No', '**Yes** — double-click {{FB03}}'],
      ['Speed', 'Fast', 'Slower (many rows)'],
      ['Precondition', 'None', '**Line item display must be on** ({{SKB1}})'],
      ['Typical tool', '{{FS10N}} · {{FAGLB03}}', '{{FBL3N}} · {{FBL1N}} · {{FAGLL03}}'],
      ['Diagnostic value', 'Low — shows the problem', '**High** — shows the reason'],
      ['In S/4HANA', 'Calculated on the fly (no totals table)', 'Directly from {{ACDOCA}}'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FBL3N', ad:'G/L line item report — FI\'s most-used report',
        amac:'Lists a G/L account\'s items; enables drilling into the document.',
        neZaman:'On the *"what makes up this balance?"* question; diagnosis; an audit dump.',
        adimlar:[
          { baslik:'Enter the account and company code' },
          { baslik:'Choose the item type',
            aciklama:'**Open** · **cleared** · **all**. "All" is generally used on G/L accounts.' },
          { baslik:'Enter the date range' },
          { baslik:'**Set the layout and save it**',
            aciklama:'Add the needed columns (cost center, tax code, text), ' +
                     'take a subtotal. Saved as an {{alv-duzeni}}.' },
          { baslik:'Double-click the document', aciklama:'{{FB03}} opens; who entered it, which document, is visible.' },
        ],
        ekranAkisi:[
          { ekran:'Selection', islem:'Account 770300 · company code 1000 · 01.01–31.12.2027' },
          { ekran:'Item type', islem:'**All**' },
          { ekran:'List', islem:'842 items · total 4,240,000 TRY' },
          { ekran:'Layout', islem:'**Cost center** column added · subtotaled by expense type' },
          { ekran:'Detail', islem:'Double-click a suspect line → document 1900008801' },
        ],
        alanlar:{
          zorunlu:['G/L account','Company code','Item type'],
          opsiyonel:['Date range','Document type','User','Text','Layout'] },
        hatalar:[
          { mesaj:'Report comes back empty but the account has a balance', sebep:'**Line item display is off** for the account ({{SKB1}}).', cozum:'Turn the flag on in {{FS00}}. **Doesn\'t work retroactively** — only later postings show up.' },
          { mesaj:'The column I need isn\'t in the list', sebep:'Not in the default layout.', cozum:'Change layout → add column → **save the layout**. Build it once, use it forever.' },
          { mesaj:'It\'s running very slowly', sebep:'A wide date range, or a very active account.', cozum:'Narrow the range; {{FAGLL03}} or the Fiori app is faster in S/4HANA.' },
        ],
        ipucu:'**Saving the layout is this report\'s most valuable feature.** ' +
              'Monthly recurring analyses (dunning level, cost-center breakdown, tax-code check) run in ' +
              'seconds once they\'re built and saved a single time.\n\n' +
              'A general layout (starting with `/`) lets the whole team use it — ' +
              'nobody needs to add their own columns separately.',
        ilgili:['FAGLL03','FS10N','FB03','FBL1N'] },

      { kod:'F.01', ad:'Financial statements — balance sheet and income statement',
        amac:'Groups accounts by the {{mali-tablo-yapisi}} and produces the legal statements.',
        neZaman:'Period end; statutory reporting; a management presentation.',
        adimlar:[
          { baslik:'Enter the company code and period' },
          { baslik:'**Choose the financial statement version**',
            aciklama:'The hierarchy defined with {{OB58}}. Different versions give different ' +
                     'presentations (legal, management, IFRS).' },
          { baslik:'Enter the comparison period', aciklama:'Usually the same period in the prior year.' },
          { baslik:'Run the report' },
          { baslik:'**Check the "Unassigned accounts" line**',
            aciklama:'**It must be zero.** If it isn\'t, an account hasn\'t been added to the structure.' },
        ],
        ekranAkisi:[
          { ekran:'Selection', islem:'Company code 1000 · period 12/2027 · comparison 12/2026' },
          { ekran:'Structure', islem:'Financial statement version **TDHP**' },
          { ekran:'Result', islem:'Balance sheet + income statement, comparative' },
          { ekran:'**Check**', islem:'"Unassigned accounts" → **0 TRY** ✓' },
        ],
        alanlar:{
          zorunlu:['Company code','Period','Financial statement version'],
          opsiyonel:['Comparison period','Business area','Ledger'] },
        hatalar:[
          { mesaj:'"Unassigned accounts" line has an amount', sebep:'A newly opened account hasn\'t been added to the {{OB58}} structure.', cozum:'Assign the account to the correct node in {{OB58}}. **This check should be added to the account-opening procedure.**' },
          { mesaj:'Balance sheet assets and liabilities don\'t match', sebep:'Usually an unassigned account or a structural error.', cozum:'Check the unassigned line first; then look for a double assignment in the {{OB58}} hierarchy.' },
        ],
        ipucu:'**The "Unassigned accounts" line is a health indicator.** ' +
              'If it\'s nonzero, the presentation is **wrong** even though the trial balance is correct: ' +
              'an expense or income item is being pooled in the wrong group.\n\n' +
              'If a newly opened account isn\'t reflected in an {{OB58}} update, this line fills up ' +
              'silently and the management report reads wrong all month.',
        ilgili:['OB58','FS10N','closing'] },

      { kod:'OB58', ad:'Define financial statement version',
        amac:'Determines which balance sheet/income statement line an account is reported on.',
        neZaman:'During setup; when a new account group is opened; when a different presentation is needed.',
        adimlar:[
          { baslik:'Enter the version code and name' },
          { baslik:'Build the hierarchy',
            aciklama:'Assets / Liabilities / Income / Expense top-level nodes, with subgroups underneath.' },
          { baslik:'Assign account ranges to the nodes',
            aciklama:'**Use a range**, not individual accounts — new accounts get covered automatically.' },
          { baslik:'Define the profit/loss account', aciklama:'The balance sheet line the income-minus-expense difference posts to.' },
          { baslik:'Check the structure', aciklama:'Verify no account is left unassigned.' },
        ],
        alanlar:{
          zorunlu:['Version code','Hierarchy nodes','Account ranges','Profit/loss account'],
          opsiyonel:['Alternative languages','Comparison columns'] },
        hatalar:[
          { mesaj:'Account ... is assigned twice', sebep:'The same account is assigned to two nodes.', cozum:'Fix the overlapping ranges; an account must sit **on a single node**.' },
        ],
        ipucu:'**Use an account range, not individual account assignment.** ' +
              'If you assign `770000–779999` as a range, **every new account** opened in that ' +
              'range gets covered automatically and the "unassigned account" problem never comes up.\n\n' +
              'Individual assignment requires updating {{OB58}} for every new account — ' +
              'and it gets forgotten.',
        ilgili:['F.01','FS00'] },

      { kod:'FAGLL03', ad:'Ledger-based line item report',
        amac:'{{FBL3N}} with a ledger, profit center, and segment filter.',
        neZaman:'For segment analysis; when {{paralel-defter}} is in use; to see the result of document splitting.',
        adimlar:[
          { baslik:'Enter the account and company code' },
          { baslik:'**Choose the ledger**', aciklama:'The leading ledger is returned if left blank.' },
          { baslik:'Apply a dimension filter', aciklama:'Profit center, segment, business area.' },
          { baslik:'Build the layout and save it' },
        ],
        ipucu:'**The difference from {{FBL3N}} is critical:** {{FBL3N}} reads from {{BSEG}} ' +
              '(the entry view), {{FAGLL03}} reads from the general ledger view.\n\n' +
              'If {{belge-bolme}} is active, the two show a **different number of lines** — ' +
              'that\'s not a bug, it\'s two different views. ' +
              'Segment analysis should always use {{FAGLL03}}.',
        ilgili:['FBL3N','FAGLB03','new-gl'] },

      { kod:'GR55', ad:'Run a Report Painter report group',
        amac:'Runs custom financial reports designed without programming.',
        neZaman:'When the standard report format isn\'t enough; for custom management reports.',
        adimlar:[
          { baslik:'Enter the report group' },
          { baslik:'Fill in the selection parameters', aciklama:'Company code, period, version.' },
          { baslik:'Run it and export if needed' },
        ],
        ipucu:'Report Painter\'s value is that **no developer is needed**: ' +
              'a report is built just by defining rows and columns.\n\n' +
              'The learning curve is steep, but once learned, most management-report needs are met ' +
              'without writing ABAP.\n\n' +
              'In S/4HANA it\'s largely replaced by {{cds-view}}-based Fiori analytics.',
        ilgili:['FGI0','F.01'] },

      { kod:'SQVI', ad:'QuickViewer',
        amac:'Joins tables and produces a list report; requires no programming.',
        neZaman:'A one-off analysis; a field combination the standard reports don\'t cover.',
        adimlar:[
          { baslik:'Name the query and choose the data source', aciklama:'A table, a table join, or a logical database.' },
          { baslik:'Select fields and define selection criteria' },
          { baslik:'Run it' },
        ],
        ipucu:'**{{SQVI}} is personal** — it can\'t be shared with someone else. ' +
              'If it\'s going to see wide use, it should be moved to SAP Query (SQ01).\n\n' +
              'It should also be used carefully on large tables: ' +
              'a bad join can strain the system.',
        ilgili:['SE16N','GR55'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Reporting tables **are read, not written**. What matters is knowing which report is ' +
      'fed by which table — because that\'s the answer to ' +
      '*"why do two reports show different numbers?"*',

    liste:[
      { ad:'ACDOCA', baslik:'Universal Journal — S/4HANA reporting\'s single source',
        tutar:'Every FI/CO item; account, cost center, profit center, segment, and ledger on the same line.',
        olusturan:'Every FI/CO document',
        guncelleyen:'Document posting',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{FAGLL03}}, {{FAGLB03}}, and the Fiori reports read from here.',
        s4:'**There\'s no totals table** — totals are calculated at read time. ' +
           'A mismatch between totals and items is **impossible**.',
        alanlar:[
          { ad:'RACCT', aciklama:'Account — reporting\'s main breakdown' },
          { ad:'RLDNR', aciklama:'Ledger — **the leading ledger** if left blank in a report filter' },
          { ad:'PRCTR / SEGMENT', aciklama:'The dimensions of segment reporting' },
          { ad:'HSL / WSL', aciklama:'Amounts in local and transaction currency' },
        ] },

      { ad:'GLT0', baslik:'Classic G/L totals table (ECC)',
        tutar:'Accumulated debit/credit totals by account × period.',
        olusturan:'Document posting (a parallel update)',
        anahtar:'BUKRS + RACCT + RYEAR',
        iliskiler:'{{FS10N}} used to read from here in classic mode.',
        s4:'**Removed.** Totals are calculated on the fly from {{ACDOCA}}. ' +
           'The *"the totals table doesn\'t match the item table"* problem **is gone**.',
        alanlar:[
          { ad:'RACCT', aciklama:'Account' },
          { ad:'HSL01…HSL16', aciklama:'Totals by period (16 periods)' },
        ] },

      { ad:'BSEG', baslik:'Document line items — entry view',
        tutar:'The lines as the user entered them.',
        olusturan:'Document posting',
        iliskiler:'{{FBL3N}} reads from here.',
        s4:'A {{uyumluluk-view}} — derived from {{ACDOCA}}.',
        alanlar:[
          { ad:'HKONT', aciklama:'G/L account' },
          { ad:'XOPVW', aciklama:'Open item management flag' },
        ] },

      { ad:'SKB1', baslik:'G/L account — company code data',
        tutar:'The **line item display** and open item management flags; currency.',
        olusturan:'{{FS00}}',
        iliskiler:'**This table determines** whether {{FBL3N}} will work.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'XKRES', aciklama:'**Line item display** — if off, {{FBL3N}} comes back empty and **can\'t be turned on retroactively**' },
          { ad:'XOPVW', aciklama:'{{acik-kalem-yonetimi}} — required for clearing to be possible' },
          { ad:'MITKZ', aciklama:'Reconciliation account type — if filled, direct postings aren\'t accepted' },
        ] },

      { ad:'CDHDR', baslik:'Change document header',
        tutar:'The {{degisiklik-belgesi}} — who changed what, and when.',
        olusturan:'Master data and document changes',
        s4:'Unchanged.',
        alanlar:[
          { ad:'OBJECTCLAS', aciklama:'Object class (KRED vendor, DEBI customer…)' },
          { ad:'USERNAME', aciklama:'The user who made the change' },
          { ad:'UDATE / UTIME', aciklama:'Date and time' },
        ] },

      { ad:'CDPOS', baslik:'Change document items',
        tutar:'Which field, **old value → new value**.',
        olusturan:'A change operation',
        s4:'Unchanged.',
        alanlar:[
          { ad:'FNAME', aciklama:'Name of the changed field' },
          { ad:'VALUE_OLD / VALUE_NEW', aciklama:'**Old and new value** — the information an audit is looking for' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Which report reads from which table?',
      varliklar:[
        { ad:'ACDOCA', rol:'S/4HANA', hub:true, aciklama:'**The single source**',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'RACCT' }, { ad:'PRCTR' }] },
        { ad:'BSEG', rol:'Entry view', aciklama:'{{FBL3N}} reads from here',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' }] },
        { ad:'GLT0', rol:'ECC totals', aciklama:'The classic balance — removed in S/4',
          alanlar:[{ ad:'RACCT', tip:'pk' }, { ad:'HSL01' }] },
        { ad:'SKB1', rol:'Master data', aciklama:'**The line item display flag**',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }, { ad:'XKRES' }] },
        { ad:'BKPF', rol:'Document', aciklama:'Document header',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BUDAT' }, { ad:'USNAM' }] },
        { ad:'CDHDR', rol:'Audit trail', aciklama:'The change trail',
          alanlar:[{ ad:'OBJECTID', tip:'fk' }, { ad:'USERNAME' }] },
        { ad:'CDPOS', rol:'Audit trail', aciklama:'Old → new value',
          alanlar:[{ ad:'FNAME' }, { ad:'VALUE_OLD' }, { ad:'VALUE_NEW' }] },
      ],
      iliskiler:[
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'**Fiori + FAGLL03**' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'**FBL3N**' },
        { from:'SKB1', to:'BSEG', alanlar:'SAKNR → HKONT', not:'the line item display precondition' },
        { from:'ACDOCA', to:'GLT0', alanlar:'RACCT', not:'the ECC counterpart' },
        { from:'CDHDR', to:'CDPOS', alanlar:'CHANGENR', not:'header → change' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Screen skill in reporting is concentrated in **layout management**. ' +
      'The same report becomes useful or useless depending on its layout.',

    ekranlar:[
      { ad:'{{FBL3N}} — selection screen',
        aciklama:'Determines what data comes back.',
        alanlar:[
          { ad:'G/L account', zorunlu:true, aciklama:'A single account, a range, or an account group.' },
          { ad:'Company code', zorunlu:true },
          { ad:'**Item type**', zorunlu:true, aciklama:'Open · cleared · **all**. ' +
                   '"All" is generally used on G/L accounts; "open" for a business partner.' },
          { ad:'Date range', zorunlu:false, aciklama:'A wide range slows the report down.' },
          { ad:'Layout', zorunlu:false, aciklama:'A saved {{alv-duzeni}} is chosen — ' +
                   'the default is returned if left blank.' },
        ],
        ipucu:'**Item type selection is a common source of confusion.** ' +
              'If "open items" is chosen on a G/L account and the account doesn\'t have ' +
              '{{acik-kalem-yonetimi}}, the report **comes back empty** — ' +
              'even though the account has items.\n\n' +
              'Rule: use **"all"** on G/L expense/income accounts, ' +
              'and **"open"** on vendor/customer accounts and accounts subject to clearing.' },

      { ad:'{{FBL3N}} — result list and layout management',
        aciklama:'Where the report\'s real value shows up.',
        alanlar:[
          { ad:'Column selection', zorunlu:false, aciklama:'Cost center, tax code, text, user, ' +
                   'profit center — **not in the default, added by hand**.' },
          { ad:'Subtotal', zorunlu:false, aciklama:'Groups by a column and takes a total.' },
          { ad:'Filtering', zorunlu:false, aciklama:'An extra filter on the result.' },
          { ad:'**Save the layout**', zorunlu:false, aciklama:'Personal or **general** (starts with `/`).' },
          { ad:'Double-click the document', zorunlu:false, aciklama:'{{FB03}} opens.' },
        ],
        ipucu:'**A general layout (starting with `/`) changes team productivity.** ' +
              'Once it\'s built and shared, everyone works with the same columns and ' +
              'nobody needs to add their own separately.\n\n' +
              'If a **selection variant + layout** are saved together for monthly routine analyses, ' +
              'the report comes down to a single click.' },

      { ad:'{{F.01}} — financial statement screen',
        aciklama:'The screen the legal statements are produced on.',
        alanlar:[
          { ad:'Financial statement version', zorunlu:true, aciklama:'The hierarchy defined with {{OB58}}.' },
          { ad:'Reporting period', zorunlu:true },
          { ad:'Comparison period', zorunlu:false, aciklama:'Usually the same period in the prior year.' },
          { ad:'Ledger', zorunlu:false, aciklama:'Which standard, if {{paralel-defter}} is in place.' },
          { ad:'**"Unassigned accounts" line**', zorunlu:false, aciklama:'**Must be zero.**' },
        ],
        ipucu:'Once the report is out, the first place to check is the bottom **"unassigned ' +
              'accounts"** line. If it\'s nonzero, the presentation is wrong even though the trial ' +
              'balance is correct, and the management report gets read wrong.' },
    ],

    zorunlu:['Account / company code','Item type','Financial statement version (for F.01)'],
    opsiyonel:['Date range','Layout','Ledger','Dimension filters'],

    hatalar:[
      { mesaj:'{{FBL3N}} comes back empty but the account has a balance', sebep:'**Line item display is off** for the account ({{SKB1}} `XKRES`).', cozum:'Turn it on in {{FS00}}. **Doesn\'t work retroactively** — past items stay permanently hidden.' },
      { mesaj:'I chose "open items," the list is empty', sebep:'The account doesn\'t have {{acik-kalem-yonetimi}}.', cozum:'Set the item type to **"all."** Expense/income accounts don\'t have open item management.' },
      { mesaj:'{{FBL3N}} and {{FAGLL03}} show a different number of lines', sebep:'One reads the entry view, the other the general ledger view ({{belge-bolme}}).', cozum:'**Not a bug.** {{FAGLL03}} is used for segment analysis.' },
      { mesaj:'"Unassigned accounts" is nonzero in {{F.01}}', sebep:'A new account hasn\'t been added to the {{OB58}} structure.', cozum:'Assign it to the correct node in {{OB58}}. **Using a range** fixes this permanently.' },
      { mesaj:'The report is very slow', sebep:'A wide date range or a very active account.', cozum:'Narrow the range; the Fiori app or {{FAGLL03}} is preferred in S/4HANA.' },
      { mesaj:'The column I\'m looking for isn\'t there', sebep:'Not in the default layout.', cozum:'Change layout → add column → **save**. Share it as a general layout.' },
    ],

    ipuclari:[
      '**Build the layout once, save it, reuse it.** Monthly analyses go from minutes to seconds.',
      'Define a **general layout** (starting with `/`) for the team so everyone works with the same columns.',
      'On a "{{FBL3N}} is empty" complaint, check first: is **line item display** on in {{SKB1}}?',
      'Put an **{{OB58}} assignment check** in the account-opening checklist; ' +
      'using a range solves the problem permanently.',
      'Check the **"unassigned accounts"** line in {{F.01}} every single time — ' +
      'it must be zero.',
      'For a {{mutabakat-hesabi}} report, use **{{FBL1N}}/{{FBL5N}}**, not {{FBL3N}}.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'ACDOCA', ne:'**Read** — the single source of S/4HANA reporting' },
      { tablo:'BSEG', ne:'Read — the {{FBL3N}} entry view' },
      { tablo:'GLT0', ne:'ECC totals table; removed in S/4' },
      { tablo:'SKB1', ne:'Line item display flag — decides whether the report will work' },
      { tablo:'CDHDR', ne:'Change trail header' },
      { tablo:'CDPOS', ne:'Change trail — old/new value' },
    ],

    commit:
      'Reporting is a **read-only** operation; it produces no commit.\n\n' +
      'But there\'s one exception: **saving a layout or a variant** is a write operation. ' +
      'When a general layout is saved it affects every user, and on some systems it requires ' +
      'a **transport request**.\n\n' +
      'The performance-critical point: reports with a wide date range read a lot of data and can ' +
      'strain the system. ' +
      'This was a serious problem in ECC; in S/4HANA it\'s largely eased thanks to HANA.',

    belgeNo:
      'Reporting doesn\'t produce a document number. ' +
      'But a report\'s ability to **drill into the document** ({{FB03}}) is the foundation of FI ' +
      'diagnostics: the chain item → document → user → change trail starts here.',

    postingLogic:
      'The logic that determines a report\'s data source:\n\n' +
      '**1.** The report type is chosen (balance / line items / financial statement).\n' +
      '**2.** The source table is determined: {{FBL3N}} → {{BSEG}}, ' +
      '{{FAGLL03}} → {{ACDOCA}}, {{FS10N}} → totals.\n' +
      '**3.** The account\'s **line item display** is checked; if it\'s off, the report comes back empty.\n' +
      '**4.** The selection criteria are applied.\n' +
      '**5.** The {{alv-duzeni}} determines the columns.\n' +
      '**6.** The result is listed; double-clicking links to {{FB03}}.\n\n' +
      'Step 3 is the most common answer to *"why is the report empty?"*',

    belgeTuru:
      'Document type is a **powerful filter** in reporting and is used often in diagnosis.\n\n' +
      'Example: filtering for **SA** (a general G/L posting) type lines on a tax account instantly ' +
      'finds manually entered postings (see {{konu:taxes}}). ' +
      'The same way, wrong assignments in {{konu:cost-center}} are narrowed down by document type.',

    numberRange:
      'Reporting doesn\'t use a number range. ' +
      'Report Painter report groups and variants are stored in their own naming spaces.',

    accountDetermination:
      'Reporting has no account determination, but the **{{mali-tablo-yapisi}}** serves a ' +
      'similar function: it decides which report line an account will show up on.\n\n' +
      'The difference is this: account determination runs **at posting time** and changes data; ' +
      'the financial statement version runs **at reporting time** and only changes the presentation. ' +
      'If the structure changes, past reports also come out under the new structure — ' +
      'which is sometimes wanted, sometimes confusing.',

    tur:
      '**Configuration:** the {{mali-tablo-yapisi}} ({{OB58}}), Report Painter definitions, ' +
      'general layouts, and variants.\n\n' +
      '**Master data:** the account\'s line item display flag ({{SKB1}}) — ' +
      'directly affects reporting.\n\n' +
      '**Transaction data:** the reported items themselves.',

    transport:
      'The financial statement version and Report Painter reports transport. ' +
      '**General layouts** vary from system to system — some transport, ' +
      'some are saved separately in each system.\n\n' +
      '**Personal layouts don\'t transport** and shouldn\'t.\n\n' +
      '**Migration check:** run {{F.01}} in production and confirm the ' +
      '"unassigned accounts" line is zero — ' +
      'the chart of accounts may have migrated while the structure was left incomplete.',

    img:[
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Closing → Reporting → Define Financial Statement Versions', not:'{{OB58}}' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Master Data → G/L Accounts → Account Management', not:'The line item display flag ({{SKB1}})' },
      { yol:'Information Systems → Accounting → Financial Accounting → General Ledger', not:'The standard report tree' },
    ],

    ekstra:[
      { ic:'🔍', baslik:'"The report comes back empty" — the diagnostic order', metin:
        'This is the most common reporting complaint in FI, and it has **five possible causes**. ' +
        'Check them in order:\n\n' +
        '**1. Line item display is off** ({{SKB1}} `XKRES`)\n' +
        'The most common cause. The account **isn\'t storing** items; only a total exists. ' +
        'The setting can be turned on, but it **doesn\'t affect the past**.\n\n' +
        '**2. The wrong item type**\n' +
        '"Open items" was chosen but the account doesn\'t have {{acik-kalem-yonetimi}}. ' +
        '**"All"** should be used on expense/income accounts.\n\n' +
        '**3. Date range**\n' +
        'Is it filtering on posting date or document date? The two can differ.\n\n' +
        '**4. The wrong company code or ledger**\n' +
        'If the ledger is left blank in {{FAGLL03}}, the leading ledger is returned; ' +
        'IFRS items don\'t show up.\n\n' +
        '**5. Authorization**\n' +
        'If the user lacks authorization for that account/company code, the list comes back empty — ' +
        'sometimes **without even an error message**. Checked with {{SU53}}.\n\n' +
        '**Diagnostic tip:** run the same report on **a different account**. ' +
        'If data comes back there, the problem is specific to the account (1 or 2); ' +
        'if it\'s also empty there, the problem is in the selection criteria or authorization (3, 4, 5).' },

      { ic:'📑', baslik:'The financial statement version: why must "unassigned accounts" be zero?', metin:
        'The {{mali-tablo-yapisi}} maps accounts to balance sheet and income statement lines. ' +
        'An unmapped account doesn\'t disappear — it shows up in a pooling line called ' +
        '**"unassigned accounts."**\n\n' +
        '**Why it\'s dangerous:** the trial balance is correct, the total is correct, ' +
        'the balance sheet\'s assets and liabilities match. No error message appears.\n\n' +
        'But the **presentation is wrong**: 1.2 million TRY of marketing expense sits, not under ' +
        '"Marketing expenses" on the income statement, but in a meaningless pool. ' +
        'The management report gets read wrong.\n\n' +
        '**How it happens:** a new account is opened, {{OB58}} isn\'t updated. ' +
        'Because opening an account and maintaining the financial statement version are ' +
        '**done by different people**, the link breaks.\n\n' +
        '**The permanent fix: use an account range.**\n\n' +
        'If assigned as `770000–779999`, **every new account** opened in that range is covered ' +
        'automatically. With individual assignment, {{OB58}} has to be updated on every new ' +
        'account — and it gets forgotten.\n\n' +
        '**Check:** whenever {{F.01}} is run, this bottom line must always be **zero**. ' +
        'It should be added to the monthly close checklist.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Line item display can\'t be turned on retroactively', metin:
        'Postings made while the {{SKB1}} `XKRES` flag is off **don\'t have their items stored**. ' +
        'Only totals are kept.\n\n' +
        'The flag can be turned on afterward — but it only works **for postings that come after**. ' +
        'Past periods stay **permanently** without detail, and {{FBL3N}} will never show data for ' +
        'those periods.\n\n' +
        'This can create a serious problem in an audit: ' +
        'the system has no way to answer *"what makes up this 3 million TRY from 2026?"*\n\n' +
        '**Rule:** line item display should be **on** for every account that might need detail. ' +
        'The only reason to keep it off used to be performance; ' +
        'in S/4HANA that reason is gone too.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Reporting is one of the areas that **gained the most** in S/4HANA: ' +
      'the totals tables are gone, mismatches became impossible, and ' +
      '{{cds-view}}-based instant analytics arrived. ' +
      'The classic reports **weren\'t removed** and are still the first tools reached for.',

    eccFarklari:[
      { konu:'Data source', ecc:'{{BSEG}} + {{GLT0}} + CO tables', s4:'**{{ACDOCA}}** — a single source' },
      { konu:'Totals table', ecc:'{{GLT0}}, FAGLFLEXT', s4:'**None** — calculated on the fly' },
      { konu:'Totals-vs-item mismatch', ecc:'Could happen; needed reconciliation', s4:'**Structurally impossible**' },
      { konu:'Analytics', ecc:'Report Painter, exporting to BW', s4:'**Embedded Analytics** — {{cds-view}}' },
      { konu:'Interface', ecc:'SAP GUI list', s4:'Fiori + GUI **together**' },
      { konu:'Performance', ecc:'Wide-range reports are slow', s4:'A significant speedup with HANA' },
      { konu:'Classic reports', ecc:'{{FBL3N}}, {{F.01}}, {{FS10N}}', s4:'**Not removed**' },
    ],

    universalJournal:
      'For reporting, {{ACDOCA}} has two concrete benefits:\n\n' +
      '**1. The mismatch problem is gone.** In ECC, the item table and the totals table were separate, ' +
      'and *"the total doesn\'t match"* was a classic problem. ' +
      'In S/4HANA there **is no** total — it\'s calculated at read time.\n\n' +
      '**2. Every dimension sits on one line.** The question *"how much was received from which vendor, ' +
      'on which profit center?"* would need a {{BSEG}} + COEP join in ECC; ' +
      'in S/4HANA it\'s **a single query**.\n\n' +
      'Result: report variety went up and the need for custom development went down.',

    kalkanTcodes:[
      { eski:'{{GLT0}}-based balance reports', yeni:'{{FAGLB03}} / Fiori', not:'The totals table is gone' },
      { eski:'—', yeni:'—', not:'{{FBL3N}}, {{FAGLL03}}, {{F.01}}, {{OB58}}, {{GR55}} **were not removed**' },
    ],

    fiori:[
      { ad:'Trial Balance', aciklama:'The trial balance — by company code, profit center, segment, and ledger.' },
      { ad:'Display Line Items in General Ledger', aciklama:'Replaces {{FAGLL03}}; filters are visual.' },
      { ad:'Display G/L Account Balances', aciklama:'Replaces {{FAGLB03}}.' },
      { ad:'Financial Statement', aciklama:'Replaces {{F.01}}; comparative and with charts.' },
      { ad:'Manage Journal Entries', aciklama:'Document search and review.' },
      { ad:'Custom Analytical Queries', aciklama:'Lets **the user build their own** report on top of {{cds-view}}.' },
    ],

    compatibilityViews:[
      '{{BSEG}}, {{GLT0}} — views derived from {{ACDOCA}}; the classic reports run on these.',
      '**Performance note:** reports running through a compatibility view are slower than ' +
      'those reading {{ACDOCA}} directly.',
      'New development should use **{{ACDOCA}} or a CDS view**.',
    ],

    performans:
      'The biggest gain is on wide-range dumps: a full year of {{FBL3N}} could take minutes in ECC; ' +
      'with HANA it\'s down to seconds.\n\n' +
      'The second gain is the **removal of totals-table maintenance**: ' +
      'in ECC, every posting wrote to both the item table and the totals table ' +
      '(a source of lock contention). S/4HANA has a single write.\n\n' +
      'The third is **Embedded Analytics**: exporting data to a separate BW system for reporting ' +
      'became unnecessary in most scenarios.',

    bestPractices:[
      '**Keep using** the classic reports — they weren\'t removed and are still the most practical ' +
      'diagnostic tools.',
      'On new reports, check first whether a **standard {{cds-view}} exists** before writing ABAP.',
      'Review **custom reports** that run through a compatibility view; ' +
      'they speed up if migrated to {{ACDOCA}}.',
      '**Remove** old custom programs that read the totals table — they\'re no longer needed.',
      'During migration, run {{F.01}} and verify the **"unassigned accounts"** line; ' +
      'the chart of accounts may have migrated while the structure was left incomplete.',
      'Consider letting users **build their own reports** with Fiori "Custom Analytical Queries"; ' +
      'it reduces the load on the consultant.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'Marketing expense is missing from the income statement: the trial balance is right, the presentation is wrong',
    hikaye:
      'At a board meeting, the marketing director of **Ege Textiles Inc.** objects: ' +
      '*"The income statement shows our marketing expense at 2.1 million, but we spent 3.3 million."*\n\n' +
      'Finance checks: **the trial balance is correct**, the total expense is correct, ' +
      'the balance sheet\'s assets and liabilities match. There\'s no error message.\n\n' +
      'But 1.2 million TRY is **missing** from the income statement.\n\n' +
      'This scenario shows a class of error where the trial balance is correct but the presentation ' +
      'is wrong, and how reporting diagnosis is done.',
    veriler:[
      { k:'Company code', v:'1000 · period 12/2027' },
      { k:'Marketing expense (actual)', v:'3,300,000 TRY' },
      { k:'Showing on the income statement', v:'**2,100,000 TRY**' },
      { k:'Difference', v:'**1,200,000 TRY**' },
      { k:'Trial balance status', v:'**Correct** — the total expense matches' },
    ],

    adimlar:[
      { baslik:'The trial balance is verified first', tcode:'FS10N',
        aciklama:'Separating out whether the problem is in the posting or in the presentation.',
        girdi:[
          { alan:'770100 Advertising expense', deger:'1,400,000 TRY' },
          { alan:'770200 Trade fairs and promotion', deger:'700,000 TRY' },
          { alan:'**770300 Digital marketing**', deger:'**1,200,000 TRY**' },
          { alan:'Total', deger:'**3,300,000 TRY** — trial balance correct ✓' },
        ],
        not:'**The posting side is completely correct.** The three accounts total 3.3 million TRY.\n\n' +
             'So the problem isn\'t in the posting, it\'s in the presentation. ' +
             'This split narrows the diagnosis immediately: ' +
             'trial balance correct + report wrong = a **{{mali-tablo-yapisi}}** problem.' },

      { baslik:'The whole income statement is examined', tcode:'F.01',
        aciklama:'Looking for where the missing amount went.',
        girdi:[
          { alan:'Marketing expenses line', deger:'2,100,000 TRY' },
          { alan:'Other lines', deger:'As expected' },
          { alan:'**At the bottom: "Unassigned accounts"**', deger:'**1,200,000 TRY**' },
          { alan:'Total expense', deger:'Correct — the amount isn\'t missing, it\'s **in the wrong place**' },
        ],
        not:'**Found.** The missing 1.2 million TRY hasn\'t disappeared — it\'s pooled in the ' +
             '"unassigned accounts" line.\n\n' +
             'This line is where accounts not added to the {{mali-tablo-yapisi}} accumulate. ' +
             '**It must always be zero.**\n\n' +
             'Since the total expense is correct, the balance sheet and the profit figure are ' +
             'also correct — only the **breakdown within the group** is wrong.' },

      { baslik:'Root cause — a new account wasn\'t added to the structure', tcode:'OB58',
        aciklama:'Checking the account assignments in the financial statement version.',
        girdi:[
          { alan:'Marketing expenses node', deger:'Assigned: **770100** and **770200**' },
          { alan:'770300 Digital marketing', deger:'**Not assigned to any node**' },
          { alan:'Account opening date', deger:'March 2027' },
          { alan:'Assignment method', deger:'**Individual accounts** — not a range' },
        ],
        not:'**Root cause found.** Account 770300 was opened in March but ' +
             'was never added to the {{OB58}} structure.\n\n' +
             'The real problem is the **assignment method**: accounts were assigned individually. ' +
             'This requires {{OB58}} to be updated on every new account — ' +
             'and because the person opening the account and the person maintaining the financial ' +
             'statement version are different people, the link broke.\n\n' +
             'For nine months, the management report **understated** marketing expense and ' +
             'nobody noticed.' },

      { baslik:'Fix — an account range is assigned', tcode:'OB58',
        aciklama:'Applying the permanent fix instead of adding one account.',
        girdi:[
          { alan:'Previous assignment', deger:'770100 · 770200 *(individually)*' },
          { alan:'**New assignment**', deger:'**770000–779999** *(a range)*' },
          { alan:'Effect', deger:'Covers 770300, plus **every future 770xxx account**' },
          { alan:'Check', deger:'Is there another overlapping range? → No ✓' },
        ],
        not:'Adding one account would have fixed the problem **for today**; ' +
             'assigning a range fixes it **permanently**.\n\n' +
             'Every new account opened in the 770 group is now covered automatically, ' +
             'and the same error can\'t recur.\n\n' +
             'A **conflict check** should be done when assigning a range: ' +
             'if the same account is assigned to two nodes, an *"assigned twice"* error results.' },

      { baslik:'The report is pulled again', tcode:'F.01',
        aciklama:'Confirming the effect of the fix.',
        girdi:[
          { alan:'Marketing expenses', deger:'**3,300,000 TRY** ✓' },
          { alan:'"Unassigned accounts"', deger:'**0 TRY** ✓' },
          { alan:'Total expense', deger:'Unchanged — it was already correct' },
          { alan:'Past periods', deger:'**They also corrected themselves**' },
        ],
        not:'**An important detail:** the {{mali-tablo-yapisi}} runs at reporting time, ' +
             'not at posting time.\n\n' +
             'That\'s why the fix **also affects the past**: the March–November reports ' +
             'now also come out correct.\n\n' +
             'This is the difference from account determination — account determination changes ' +
             'the data and doesn\'t affect the past; the financial statement version only changes ' +
             'the presentation and **always reports with the current structure**.' },

      { baslik:'A second finding — an account with line item display off', tcode:'FBL3N',
        aciklama:'A second problem surfaces during the review.',
        girdi:[
          { alan:'770300 line item report', deger:'842 items ✓' },
          { alan:'**649000 Other income** line item report', deger:'**Empty**' },
          { alan:'649000 balance', deger:'480,000 TRY — the balance **exists**' },
          { alan:'{{SKB1}} line item display', deger:'**Off**' },
        ],
        not:'The second problem: account 649000 has a balance but **no report can be pulled**.\n\n' +
             'Reason: **line item display** is off in {{SKB1}} for the account — ' +
             'the system never stored items for it.\n\n' +
             '**The setting can be turned on, but it doesn\'t affect the past.** ' +
             'What the 480,000 TRY consists of can **never** be learned from the system.\n\n' +
             'This is **more serious** than the financial statement version problem: ' +
             'that one could be fixed, this one can\'t.' },

      { baslik:'Permanent measures', tcode:'FS00',
        aciklama:'A systemic measure is put in place for both problems.',
        girdi:[
          { alan:'Measure 1', deger:'{{OB58}} assignments were **converted to ranges** (all groups)' },
          { alan:'Measure 2', deger:'649000\'s line item display was **turned on** — tracked from now on' },
          { alan:'Measure 3', deger:'A **line item display + OB58 check** was added to the account-opening procedure' },
          { alan:'Measure 4', deger:'A **"unassigned accounts = 0"** check was added to the monthly close' },
        ],
        not:'**The third measure is the most valuable:** two checks were added to the ' +
             'account-opening procedure. Whoever opens a new account now has to answer ' +
             '*"is line item display on?"* and *"is it covered in the financial statement version?"*\n\n' +
             'Thanks to the range assignment, the second question now answers itself "yes" in most ' +
             'cases — but the check still applies whenever a new account group is opened.' },
    ],

    sonuc:
      '**The trial balance was correct, the presentation was wrong — and nobody noticed for nine months.**\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. Trial balance correct + report wrong = a financial statement version problem.** ' +
      'This split narrows the diagnosis instantly. If the posting side is correct, ' +
      'the problem is in {{OB58}}. The **"unassigned accounts"** line in {{F.01}} must ' +
      'always be **zero** — if it isn\'t, an account is being reported in the wrong place.\n\n' +
      '**2. Use an account range, not individual assignment.** ' +
      'If assigned as `770000–779999`, every new account opened in that group is covered ' +
      'automatically. Individual assignment requires an {{OB58}} update on every new account, ' +
      'and because the person opening the account and the person managing the structure are ' +
      'different people, it **gets forgotten**.\n\n' +
      '**3. The financial statement version runs at reporting time — a fix also affects the past.** ' +
      'This is the difference from account determination: account determination changes the data ' +
      'and doesn\'t affect the past; the structure only changes the presentation and reports ' +
      '**always come out with the current structure**. In this scenario, the March–November ' +
      'reports corrected themselves.\n\n' +
      '**4. If line item display is off, the loss is permanent.** ' +
      'The second finding was more serious: account 649000 has a balance but no report can be ' +
      'pulled. The setting can be turned on, but it **doesn\'t affect the past** — what that ' +
      '480,000 TRY consists of can never be learned from the system. ' +
      '**Line item display must be on for every account that might need detail.**',
  },

  },
});
