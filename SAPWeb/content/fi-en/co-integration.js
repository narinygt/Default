/* ==========================================================================
   content/fi-en/co-integration.js — English body for "CO Integration"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'co-integration',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'CO integration is **the bridge between financial accounting (FI) and management accounting (CO)**. ' +
      'The two record the same event with different questions:\n\n' +
      '**FI:** "What happened toward the outside?" → the legal financial statement, auditable, ' +
      'rules set by regulation.\n' +
      '**CO:** "What happened internally?" → a management report, freely designed, ' +
      'rules set by the company itself.\n\n' +
      'The bridge is built by the **{{masraf-turu}}**: a G/L account\'s CO counterpart. ' +
      'The numbers are **identical** — account 770300 is cost element 770300.\n\n' +
      'The integration runs in two directions, and this symmetry is critical:\n\n' +
      '**FI → CO:** when an expense is posted, it is also written to a CO object. ' +
      'This happens **always**, automatically.\n' +
      '**CO → FI:** a value transfer inside CO produces an FI document under certain conditions. ' +
      'This happens **sometimes**, conditionally ({{FAGLCOFIRTINT}}).\n\n' +
      'In S/4HANA this distinction lost most of its meaning: FI and CO lines sit ' +
      '**in the same table** in {{ACDOCA}}.',

    neden:
      '**Two different readers.** The financial statement goes to the outside (the tax authority, a bank, ' +
      'a shareholder), the management report goes to the inside (a manager, the board). ' +
      'Their needs differ.\n\n' +
      '**Different breakdown.** FI aggregates by account; CO breaks down by unit, product, project, ' +
      'customer.\n\n' +
      '**Different timing.** FI closes at period end; CO is monitored continuously.\n\n' +
      '**But the same reality.** Both count the same money. ' +
      'The amounts **must agree** — otherwise two different truths are born and ' +
      'it becomes unclear which one to trust.',

    sirketOnemi:
      'FI–CO integration is **ERP\'s most fundamental promise**: enter the same data once ' +
      'and use it for two different purposes.\n\n' +
      'For a consultant, this topic is the **architectural framework** of the {{cost-center}} topic: ' +
      'cost center covers day-to-day use, while CO integration explains ' +
      '"why it works this way."\n\n' +
      'In pre-S/4HANA setups, a significant chunk of month-end went into ' +
      '**FI–CO reconciliation**: two tables were compared, differences were hunted down, ' +
      'transfer errors were corrected. ' +
      '{{ACDOCA}} eliminated this work entirely — ' +
      'and that is S/4HANA\'s **most concrete benefit** on the FI side.\n\n' +
      'The distinguishing question is: **"Does a CO-internal allocation affect FI?"** ' +
      'The right answer: **normally no**. But **yes if** the company code, profit center, business area, or ' +
      'functional area changes — because these are dimensions FI also reports on ' +
      'and they cannot stay inconsistent.',

    gercekHayat:
      'At a company, the IT cost center serves every department. ' +
      'Its monthly cost is 480,000 TRY.\n\n' +
      'At month-end this cost is distributed to departments by user count: ' +
      'Production 45%, Sales 30%, Administration 25%.\n\n' +
      '**Question:** does this distribution show up in accounting?\n\n' +
      '**Scenario A — all in the same company code, the same profit center:** ' +
      'No. Nothing changed for FI — the expense still sits on the same account, ' +
      'the same company code, the same profit center. ' +
      'Only a label inside CO changed.\n\n' +
      '**Scenario B — the departments sit in different profit centers:** ' +
      '**Yes.** Profit center is a dimension FI also reports on, and if ' +
      'a profit-center-based balance sheet is produced ({{new-gl}}), ' +
      'this transfer\'s reflection into FI is **mandatory**. ' +
      'Otherwise Production\'s expense rises in CO but not in FI — ' +
      'two different truths are born.\n\n' +
      '{{FAGLCOFIRTINT}} manages exactly this distinction: ' +
      'it defines which CO transfers will produce an FI document.',

    muhasebeMantigi:
      'The accounting logic of FI–CO integration rests on **a single principle**: ' +
      '**the same event, two viewpoints — but one reality.**\n\n' +
      'When an expense is posted, the total amount is identical in both FI and CO. ' +
      'What differs is the **breakdown**: FI by account, CO by object.\n\n' +
      'This principle has two consequences:\n\n' +
      '**1. CO-internal movements don\'t change the total.** ' +
      'Moving an expense from one cost center to another ' +
      'doesn\'t change the company\'s total expense — which is why it **doesn\'t affect FI**.\n\n' +
      '**2. But if a dimension FI reports on changes, FI must change too.** ' +
      'Company code, profit center, business area, and functional area are such dimensions. ' +
      'These are reported in FI\'s financial statements; having them change in CO ' +
      'without changing in FI creates **inconsistency**.\n\n' +
      'In the classic setup, this inconsistency was managed through month-end reconciliation. ' +
      '{{new-gl}} brought real-time integration; ' +
      '{{ACDOCA}} eliminated the problem **structurally**.',

    kavramlar: ['masraf-turu', 'maliyet-yeri', 'kontrol-alani', 'ic-siparis',
                'kar-merkezi', 'evrensel-kayit-defteri'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'CO integration works at three layers: **organizational setup** (a one-time step), ' +
      'the **daily FI→CO flow** (automatic), and the **period-end CO→FI feedback flow** ' +
      '(conditional).',

    roller:[
      { rol:'CO consultant', gorev:'Sets up the {{kontrol-alani}} ({{OKKP}}), defines number ranges ({{KANK}}).' },
      { rol:'FI consultant', gorev:'Defines cost elements and the {{FAGLCOFIRTINT}} variant.' },
      { rol:'Accounting user', gorev:'Posts an expense with a CO object — **FI and CO are written at the same time**.' },
      { rol:'Controller', gorev:'Runs distribution, settlement, and costing at period end.' },
      { rol:'General ledger', gorev:'Performs FI–CO reconciliation in ECC; **this job doesn\'t exist in S/4HANA**.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The two-way flow between FI and CO',
      adimlar:[
        { ic:'🏛️', rol:'Consultant', baslik:'The {{kontrol-alani}} is set up ({{OKKP}})',
          aciklama:'Company codes are assigned. **Requirement:** the same chart of accounts and the same ' +
                   'fiscal year variant. Number ranges ({{KANK}}) are defined.',
          cikti:'CO organization', ok:'the bridge is built' },
        { ic:'🔗', rol:'Consultant', baslik:'Cost elements are defined ({{KA01}})',
          aciklama:'A G/L account\'s CO counterpart. **The numbers are identical.** ' +
                   'In S/4HANA it\'s an attribute of the account.',
          cikti:'The FI ↔ CO bridge', ok:'daily use' },
        { ic:'🧾', rol:'User', baslik:'**FI → CO:** an expense is posted',
          aciklama:'{{FB50}} / {{MIRO}}. A CO object is mandatory. ' +
                   'FI and CO are written **in the same LUW** — there\'s no separate step.',
          cikti:'An integrated posting', ok:'month-end' },
        { ic:'🔀', rol:'Controller', baslik:'CO-internal transactions run',
          aciklama:'Distribution ({{KSU5}}), periodic reposting ({{KSV5}}), settlement ({{KO88}}), ' +
                   'a reposting ({{KB11N}}).',
          cikti:'Allocated cost', ok:'did a dimension change?' },
        { ic:'❓', rol:'System', baslik:'**CO → FI:** a dimension check',
          aciklama:'Did the company code, {{kar-merkezi}}, business area, or functional area change? ' +
                   'If it did, an FI document **is produced**; if not, it isn\'t.',
          cikti:'A conditional FI document', ok:'reporting' },
        { ic:'📊', rol:'Controller', baslik:'Reporting',
          aciklama:'In S/4HANA, FI and CO are reported **from the same table** ({{ACDOCA}}); ' +
                   'reconciliation isn\'t needed.',
          cikti:'Consistent reports' },
      ],
    },

    adimlar:[
      { rol:'CO consultant', eylem:'Sets up the controlling area', sistem:'{{OKKP}} → {{TKA01}}' },
      { rol:'CO consultant', eylem:'Defines the CO number ranges', sistem:'{{KANK}} — **if missing, FI stops too**' },
      { rol:'FI consultant', eylem:'Defines the cost elements', sistem:'{{KA01}} → {{CSKB}} (S/4: {{FS00}})' },
      { rol:'FI consultant', eylem:'Defines the real-time integration variant', sistem:'{{FAGLCOFIRTINT}}' },
      { rol:'User', eylem:'Posts the expense with a CO object', sistem:'FI + CO **the same LUW**' },
      { rol:'Controller', eylem:'Runs the month-end distribution', sistem:'{{KSV5}}, {{KSU5}}' },
      { rol:'Controller', eylem:'Settles internal orders', sistem:'{{KO88}}' },
      { rol:'System', eylem:'Reflects a dimension change into FI', sistem:'A conditional FI document' },
    ],

    veriAkisi:{
      nereden:'FI documents, cost element definitions, CO objects, ' +
              '{{FAGLCOFIRTINT}} variant rules.',
      nereye:'{{ACDOCA}} (S/4) — FI and CO lines together; also {{COEP}} in ECC.',
      tetikleyen:'Every posting on a cost-element-defined account (FI→CO); every CO transaction that changes a dimension (CO→FI).',
      sonraki:'Product costing, profitability analysis, management reporting.',
    },

    notlar:[
      { tip:'tip', baslik:'When does the CO → FI feedback flow kick in?', metin:
        'A CO-internal transfer **normally doesn\'t produce an FI document** — because the ' +
        'company\'s total expense doesn\'t change.\n\n' +
        'But if **one of four dimensions** changes, an FI document is produced:\n\n' +
        '**1. Company code** — a value transfer between two different legal entities. ' +
        'This creates a mutual payable/receivable in FI and is posted **mandatorily**.\n\n' +
        '**2. {{kar-merkezi}}** — if a profit-center-based balance sheet is produced, ' +
        'FI needs to know too.\n\n' +
        '**3. Business area** — a dimension reported in FI.\n\n' +
        '**4. Functional area** — used in a function-based presentation of the income statement ' +
        '(the split between cost of production / marketing expense / administrative expense).\n\n' +
        'The common point: **all four are dimensions reported in FI\'s financial statements.** ' +
        'Having them change in CO without changing in FI would create two different truths.\n\n' +
        'The rule is defined in the {{FAGLCOFIRTINT}} variant, and ' +
        'which dimension changes will produce an FI document can be selected.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The accounting effect of CO integration is **conditional**: most CO transactions don\'t affect FI, ' +
      'but transactions that change a dimension do. ' +
      'The journal entries below show this distinction step by step.',

    etkilenenHesaplar:[
      { hesap:'Expense accounts (7xx)', tur:'Income statement', neden:'If a cost element is defined, a CO object is mandatory.' },
      { hesap:'Assessment cost element (category 42)', tur:'**CO only**', neden:'Not an FI account in ECC; in S/4HANA it\'s also opened as a G/L account.' },
      { hesap:'Intercompany accounts', tur:'Balance sheet', neden:'Used by a CO transfer that changes the company code.' },
      { hesap:'Reclassification accounts', tur:'Income statement', neden:'Can be used on a functional-area change.' },
      { hesap:'Fixed assets (25x)', tur:'Balance sheet — Asset', neden:'If the {{ic-siparis}} is settled to an asset, capitalization occurs.' },
    ],

    fisler:[
      { baslik:'**FI → CO:** an expense posting — one entry, two dimensions',
        belgeTuru:'KR', tarih:'05.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'IT expense — **cost center 6100**', borc:480000,
            not:'FI: account 770 · CO: cost center 6100' },
          { hesap:'191', ad:'Deductible VAT', borc:96000 },
          { hesap:'320', ad:'Trade payables', alacak:576000 },
        ],
        not:'**FI and CO were written in the same LUW.** There\'s no separate transfer step.\n\n' +
             'In S/4HANA these three lines sit in {{ACDOCA}}, and the first line\'s ' +
             '`RACCT` = 770 and `KOSTL` = 6100 fields are **on the same line**.\n\n' +
             'In ECC, three lines would be written to {{BSEG}} and one CO line to {{COEP}} — ' +
             'the same event had **two records**.' },

      { baslik:'**CO-internal distribution** — same profit center · **no FI effect**',
        belgeTuru:'CO', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'6100 IT → 3100 Production (45%) · 216,000 TRY', borc:0, alacak:0 },
          { hesap:'—', ad:'6100 IT → 2100 Sales (30%) · 144,000 TRY', borc:0, alacak:0 },
          { hesap:'—', ad:'6100 IT → 5100 Administration (25%) · 120,000 TRY', borc:0, alacak:0 },
        ],
        not:'Because all three cost centers belong to **the same profit center**, ' +
             '**no FI document was created**.\n\n' +
             'The logic: nothing changed for FI. The expense still sits on account 770, ' +
             'still on the same company code, still on the same profit center. ' +
             'Only the label inside CO changed.\n\n' +
             'Cost center 6100\'s balance was **zeroed out** ✓' },

      { baslik:'**CO → FI:** a distribution that changes the profit center — **an FI document is created**',
        belgeTuru:'CO/FI', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'IT expense — **PC PC-1000 Production**', borc:216000,
            not:'Profit center changed → FI reflection' },
          { hesap:'770', ad:'IT expense — **PC PC-9000 General**', alacak:216000,
            not:'Left the source profit center' },
        ],
        not:'This time the target cost center belongs to **a different profit center**. ' +
             'The {{FAGLCOFIRTINT}} rule kicked in and **an FI document was produced**.\n\n' +
             'Note: **the same account** is both debit and credit. The total expense didn\'t change — ' +
             'it only moved between profit centers.\n\n' +
             'Without this, Production\'s expense would rise in CO but not in FI, and ' +
             'the profit-center-based balance sheet **wouldn\'t balance**.' },

      { baslik:'A transfer that changes the company code — **always an FI document**',
        belgeTuru:'SA', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Service expense — company code 2000', borc:180000, not:'The receiving company' },
          { hesap:'395', ad:'Intercompany payables — company 2000', alacak:180000 },
        ],
        not:'A value transfer was made between two different legal entities. ' +
             'For FI this is a **mandatory posting** — the financial statements of ' +
             'two separate companies are affected.\n\n' +
             'A mirror posting is created on the other side: in company 1000, ' +
             '395 Intercompany receivables debit / 770 expense credit.\n\n' +
             'A company code change is the **one case with no condition at all** ' +
             'attached to producing an FI document — it can\'t be turned off.' },

      { baslik:'{{ic-siparis}} settlement ({{KO88}}) — target **fixed asset**',
        belgeTuru:'AA', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Plant, machinery and equipment', borc:1850000, not:'**Capitalization** — an FI document' },
          { hesap:'770', ad:'Investment expense (accumulated on the order)', alacak:1850000 },
        ],
        not:'The cost accumulated on the investment order was **settled to a fixed asset**.\n\n' +
             'This is unquestionably an FI event: the expense **turned into an asset**, ' +
             'the balance sheet grew, and it\'s now subject to depreciation.\n\n' +
             'Had the settlement target been a cost center, no FI document would have been ' +
             'created (unless the profit center changed). ' +
             '**The target type decides the FI effect.**' },

      { baslik:'When settlement is skipped — the cost stays stuck on the order',
        belgeTuru:'—', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'Internal order 500118 · balance **1,850,000 TRY** · settlement **not done**', borc:0, alacak:0,
            not:'Neither in an asset nor in a cost center' },
        ],
        not:'If {{KO88}} isn\'t run, the cost **stays on the order**:\n\n' +
             '• No fixed asset **is created** → depreciation never starts\n' +
             '• It **doesn\'t appear** in cost center reports\n' +
             '• In FI it sits as an expense but **belongs to no unit**\n\n' +
             'Both the balance sheet and the income statement end up wrong: ' +
             '1.85 million TRY that should have been capitalized **appears as expense**.\n\n' +
             'This is the **most common problem** with internal orders, and ' +
             'the year-end closing checklist should include the item ' +
             '"is there an open internal order?"' },
    ],

    tHesaplar:[
      { hesap:'IT expense (FI)', kod:'770',
        borc:[{ ad:'Invoice', tutar:480000 }, { ad:'PC transfer (in)', tutar:216000 }],
        alacak:[{ ad:'PC transfer (out)', tutar:216000 }],
        not:'Net effect **zero** — total expense didn\'t change' },
      { hesap:'Cost center 6100 IT (CO)', kod:'6100',
        borc:[{ ad:'Direct expense', tutar:480000 }],
        alacak:[{ ad:'Distribution', tutar:480000 }],
        not:'Should be **zeroed out** at month-end' },
      { hesap:'Internal order 500118 (CO)', kod:'500118',
        borc:[{ ad:'Investment expenditure', tutar:1850000 }],
        alacak:[{ ad:'Settlement ({{KO88}})', tutar:1850000 }],
        not:'Should be **zeroed out** after settlement' },
    ],

    notlar:[
      { tip:'warn', baslik:'The exception to the "no total change, no FI effect" rule', metin:
        'The general rule is: a CO-internal movement doesn\'t change the total expense, ' +
        'and so it doesn\'t affect FI.\n\n' +
        'But this rule has **four exceptions**, and all of them share the same reason: ' +
        '**FI also reports on that dimension.**\n\n' +
        '**Company code** — two legal entities; a mutual payable/receivable in FI is mandatory.\n' +
        '**{{kar-merkezi}}** — if a profit-center balance sheet is produced, FI needs to know.\n' +
        '**Business area** — a dimension reported in FI.\n' +
        '**Functional area** — used in a function-based income statement.\n\n' +
        'Every other CO movement (a cost center change, ' +
        'an internal order settled to a cost center, an activity transfer) ' +
        'doesn\'t **affect** FI.\n\n' +
        '**A practical diagnosis:** the answer to "did this CO transaction produce an FI document?" ' +
        'always lies in "which dimension changed?"' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'CO integration varies by **flow direction**, by **CO component**, and by ' +
      '**cost element category**. There are also classic/real-time/unified ' +
      'architecture generations.',

    liste:[
      { ad:'FI to CO',
        aciklama:'An expense posting is also written to a CO object. **Automatic and always.**',
        neZaman:'On every account with a defined cost element.',
        ornek:'A posting to account 770 with {{FB50}} → also written to cost center 4200.' },

      { ad:'Real-Time Integration CO to FI',
        aciklama:'A CO-internal transfer produces an FI document. **Conditional.**',
        neZaman:'When the company code, profit center, business area, or functional area changes.',
        ornek:'The {{FAGLCOFIRTINT}} variant defines which dimensions trigger it.',
        tcodes:['FAGLCOFIRTINT'] },

      { ad:'Primary Cost Element — category 1',
        aciklama:'A G/L expense account\'s CO counterpart; **the bridge from FI to CO**.',
        neZaman:'For every expense account.',
        ornek:'Account 770300 ↔ cost element 770300. **The numbers are identical.**',
        tcodes:['KA01'] },

      { ad:'Revenue Element — category 11',
        aciklama:'Revenue accounts\' CO counterpart; used in profitability analysis.',
        neZaman:'When CO-PA is in use.',
        ornek:'Account 600 → category 11. Can\'t be posted to a cost center, ' +
              'goes to a profitability segment.' },

      { ad:'Assessment Element — category 42',
        aciklama:'Used only in CO-internal assessment transactions.',
        neZaman:'When an {{KSV5}} assessment is run.',
        ornek:'**Doesn\'t exist** in the FI chart of accounts in ECC; in S/4HANA it\'s also opened as a G/L account.' },

      { ad:'Internal Activity — category 43',
        aciklama:'Used in activity-type transfers (machine hours, labor hours).',
        neZaman:'In production costing.',
        ornek:'An hour-based transfer from a production cost center to a production order.' },

      { ad:'CCA — Cost Center Accounting',
        aciklama:'CO\'s most fundamental component; responsibility-based expense tracking.',
        neZaman:'In almost every implementation.',
        ornek:'Details are covered in the {{cost-center}} topic.',
        tcodes:['KS01','KSB1'] },

      { ad:'Internal Orders',
        aciklama:'Temporary cost collection; **settled** in the end.',
        neZaman:'For a project, a campaign, an investment, maintenance.',
        ornek:'Settled with {{KO88}} to a cost center, a fixed asset, or a G/L account.',
        tcodes:['KO01','KO88'] },

      { ad:'CO-PA — Profitability Analysis',
        aciklama:'Profitability by product, customer, region.',
        neZaman:'When sales profitability needs to be analyzed.',
        ornek:'In S/4HANA, **account-based CO-PA** is integrated with {{ACDOCA}} — ' +
              'no difference from FI can arise.' },

      { ad:'Product Costing',
        aciklama:'Calculating the cost of a manufactured product.',
        neZaman:'At manufacturing companies.',
        ornek:'Cost centers\' activity rates flow into the product\'s cost.' },
    ],

    karsilastirmaBasliklar:['Classic (old ECC)', 'New G/L real-time', 'S/4HANA ({{ACDOCA}})'],
    karsilastirma:[
      ['CO data', '{{COEP}} — a separate table', '{{COEP}} + FI reflection', '**{{ACDOCA}}** — the same table'],
      ['CO→FI transfer', 'Month-end **batch**', '**Real-time**', 'The concept **doesn\'t exist**'],
      ['Reconciliation need', '**High** — differences are frequent', 'Low', '**Structurally impossible**'],
      ['Can a difference arise', 'Yes', 'Rarely (a configuration error)', '**No**'],
      ['Profit center', 'A separate ledger (EC-PCA)', 'Inside G/L', 'An {{ACDOCA}} dimension'],
      ['Secondary cost element', 'Not in the FI chart of accounts', 'No', '**Exists as a G/L account**'],
      ['Month-end workload', 'Reconciliation + correction', 'A check', '**None**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'KA01', ad:'Create cost element — the FI ↔ CO bridge',
        amac:'Defines a G/L account\'s CO counterpart.',
        neZaman:'When a new expense account is opened. **In S/4HANA this is done inside {{FS00}}.**',
        adimlar:[
          { baslik:'Enter the cost element number',
            aciklama:'**Must be identical to the G/L account number** — this isn\'t a convention, it\'s mandatory.' },
          { baslik:'Enter the validity range' },
          { baslik:'**Choose the category**',
            aciklama:'**1** primary · **11** revenue · **42** assessment · **43** internal activity. ' +
                     'If the category is wrong, the transaction type won\'t work.' },
          { baslik:'Save',
            aciklama:'From now on, any posting to that account **requires** a CO object.' },
        ],
        ekranAkisi:[
          { ekran:'Initial screen', islem:'Cost element 770300 · validity 01.01.2027–31.12.9999' },
          { ekran:'Basic data', islem:'Name "Advertising expense" · **category 1**' },
          { ekran:'Control', islem:'A CO object is mandatory for posting' },
        ],
        alanlar:{
          zorunlu:['Cost element (= G/L account)','Validity range','Name','Category'],
          opsiyonel:['Attribute mix','Functional area'] },
        hatalar:[
          { mesaj:'G/L account ... does not exist in chart of accounts', sebep:'The G/L account must be opened before the cost element.', cozum:'Open the account first with {{FS00}}, then define the cost element. **Order matters.**' },
          { mesaj:'Cost element category ... not allowed', sebep:'The category doesn\'t match the account type (e.g. category 11 on an expense account).', cozum:'Expense account → category 1 · revenue account → category 11.' },
        ],
        ipucu:'**Opening a cost element is a commitment:** from that moment on, ' +
              '**every posting** to that account requires a CO object. ' +
              'If no CO object is entered and there\'s no {{OKB9}} default, ' +
              '**the document can\'t be saved**.\n\n' +
              'That\'s why cost elements **aren\'t opened** for balance sheet accounts — ' +
              'asking a vendor or bank account for a CO object makes no sense.',
        ilgili:['KA02','KA03','FS00','OKB9'] },

      { kod:'OKKP', ad:'Controlling area settings',
        amac:'Sets up the CO organization; determines which company codes belong to ' +
             'which controlling area.',
        neZaman:'At implementation; when a new company code is added.',
        adimlar:[
          { baslik:'Define the controlling area',
            aciklama:'Currency, chart of accounts, fiscal year variant.' },
          { baslik:'**Assign company codes**',
            aciklama:'**Requirement:** the assigned company codes must use **the same chart of accounts** and ' +
                     '**the same fiscal year variant**.' },
          { baslik:'Activate the components',
            aciklama:'Cost center accounting, internal orders, profitability analysis…' },
          { baslik:'**Define the number ranges** ({{KANK}})',
            aciklama:'By business transaction. **If missing, both CO and FI postings stop.**' },
        ],
        alanlar:{
          zorunlu:['Controlling area','Currency','Chart of accounts','Fiscal year variant','Company code assignment'],
          opsiyonel:['Active components','Profit center accounting'] },
        hatalar:[
          { mesaj:'Chart of accounts of company code differs from controlling area', sebep:'The company code uses a different chart of accounts.', cozum:'Either align the charts of accounts or set up a separate controlling area. **Very hard to change afterward.**' },
          { mesaj:'Fiscal year variant is not the same', sebep:'The fiscal year variants differ.', cozum:'They must be identical; otherwise period matching can\'t be established.' },
        ],
        ipucu:'**Attaching more than one company code to a controlling area** ' +
              'makes intercompany cost allocation possible — ' +
              'very valuable in holding structures.\n\n' +
              'But the requirement is heavy: **the same chart of accounts and the same fiscal year variant**. ' +
              'This is a decision made in the implementation\'s first week; ' +
              'changing it afterward is practically impossible.',
        ilgili:['KANK','TKA01','KS01'] },

      { kod:'KANK', ad:'CO number ranges — **the silent breaking point**',
        amac:'Defines number ranges for CO documents, by business transaction.',
        neZaman:'At implementation and **at every year-start**.',
        adimlar:[
          { baslik:'Enter the controlling area' },
          { baslik:'Define the business transaction groups',
            aciklama:'**COIN** the real FI→CO posting · **RKU1** a reposting · ' +
                     '**RKIU** an assessment · **KOAO** a settlement.' },
          { baslik:'Assign a number range to each group' },
          { baslik:'Check the ranges at year-start',
            aciklama:'Must be opened **together with** the FI ranges.' },
        ],
        alanlar:{
          zorunlu:['Controlling area','Business transaction group','Number range'],
          opsiyonel:['Year-based range'] },
        hatalar:[
          { mesaj:'Number range for CO business transaction COIN is missing', sebep:'The number range for the actual posting is undefined.', cozum:'Define it with {{KANK}}. **If missing, expense postings can\'t be made at all** — the error shows up on the FI screen but the cause is in CO.' },
        ],
        ipucu:'**The most insidious CO problem.** If the CO number range is missing or exhausted, ' +
              'the CO posting fails — and because it\'s in the same LUW as FI, ' +
              '**the FI posting fails too**.\n\n' +
              'The classic scenario: at year-start the FI number ranges are opened carefully, ' +
              'CO is forgotten. On the morning of January 1st every expense posting stops and ' +
              'the team looks for the error on the FI side.\n\n' +
              '**Prevention:** on the year-end closing checklist, the CO ranges should sit ' +
              '**right next to** the FI ranges.',
        ilgili:['OKKP','KA01'] },

      { kod:'FAGLCOFIRTINT', ad:'Real-time CO→FI integration variant',
        amac:'Defines which CO value transfers will produce an FI document.',
        neZaman:'In a {{new-gl}} implementation; when profit-center-based reporting is required.',
        adimlar:[
          { baslik:'Define the variant' },
          { baslik:'**Choose the triggering dimensions**',
            aciklama:'Company code · {{kar-merkezi}} · business area · functional area. ' +
                     'When a selected one changes, an FI document is produced.' },
          { baslik:'Define the document type and account determination' },
          { baslik:'Assign to the company code' },
        ],
        alanlar:{
          zorunlu:['Variant','Triggering dimensions','Document type'],
          opsiyonel:['Rule-based selection (BAdI)'] },
        hatalar:[
          { mesaj:'A CO document was created but no FI document was created', sebep:'The changed dimension isn\'t selected in the variant.', cozum:'Check the variant. **If a profit-center-based balance sheet is produced, profit center must be selected.**' },
        ],
        ipucu:'**Forgetting to check the profit center box** leads to an insidious error ' +
              'in setups that produce a profit-center-based balance sheet: ' +
              'a distribution is run in CO, cost moves between profit centers, ' +
              'but **nothing changes in FI**.\n\n' +
              'Result: the CO report and the profit-center balance sheet **don\'t agree**, ' +
              'and the difference is hunted down at month-end.',
        ilgili:['KSV5','new-gl','KSU5'] },

      { kod:'KO88', ad:'Internal order settlement',
        amac:'Transfers the cost accumulated on an internal order to a target.',
        neZaman:'When the order is complete; for open orders **at every month-end**.',
        adimlar:[
          { baslik:'Enter the order number and period' },
          { baslik:'Check the settlement rule',
            aciklama:'Target: a cost center, a fixed asset, or a G/L account. ' +
                     '**The target type determines the FI effect.**' },
          { baslik:'Run in test mode' },
          { baslik:'Run in production mode and **verify the order was zeroed out**' },
        ],
        alanlar:{
          zorunlu:['Order number','Period','Settlement rule'],
          opsiyonel:['Settlement type (partial/full)'] },
        hatalar:[
          { mesaj:'No settlement rule maintained for order ...', sebep:'No settlement rule is defined on the order.', cozum:'Define the target and percentage with {{KO02}}.' },
          { mesaj:'The order balance wasn\'t zeroed out', sebep:'A partial settlement was made, or some cost elements are out of scope.', cozum:'Check the settlement rule and its scope.' },
        ],
        ipucu:'**If settlement is skipped, the cost stays stuck on the order:** ' +
              'no fixed asset is created, and it never shows up in a cost center report. ' +
              'On investment orders this means an amount that should have been ' +
              '**capitalized stays booked as expense** — both the balance sheet and the ' +
              'income statement end up wrong.\n\n' +
              'Add **"is there an open internal order?"** to the year-end closing checklist.',
        ilgili:['KO01','KO02','cost-center'] },

      { kod:'KA03', ad:'Display cost element — a diagnosis point',
        amac:'Shows an account\'s CO counterpart and its category.',
        neZaman:'When diagnosing a "CO object required" error.',
        adimlar:[
          { baslik:'Enter the cost element (= account number) and the controlling area' },
          { baslik:'Check the category and the validity range' },
        ],
        ipucu:'For the *"Account requires an assignment to a CO object"* error, ' +
              'the diagnosis order is: **1)** does the cost element exist, checked with {{KA03}}, ' +
              '**2)** is its category correct, ' +
              '**3)** is it within its validity range, ' +
              '**4)** is an {{OKB9}} default defined.\n\n' +
              'It also works the other way around: if an account **unexpectedly** ' +
              'asks for a CO object, a cost element was probably opened by mistake.',
        ilgili:['KA01','OKB9','KSB1'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'CO integration\'s table architecture is where **S/4HANA\'s biggest change** happened: ' +
      'in ECC, FI ({{BSEG}}) and CO ({{COEP}}) sat in separate tables and required reconciliation. ' +
      'In S/4HANA it\'s **a single line in {{ACDOCA}}**.',

    liste:[
      { ad:'ACDOCA', baslik:'Universal Journal — FI and CO together',
        tutar:'All FI and CO lines; account, cost center, profit center, ' +
              'internal order **on the same line**.',
        olusturan:'Every FI/CO document',
        guncelleyen:'A posting; CO-internal transactions also write here',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'Via `RACCT` with {{CSKB}}, via `KOSTL` with {{CSKS}}, via `AUFNR` with {{AUFK}}.',
        s4:'**S/4HANA\'s central table.** Replaced {{COEP}} and several other tables.',
        alanlar:[
          { ad:'RACCT', aciklama:'Account / cost element — **the same number**' },
          { ad:'KOSTL', aciklama:'{{maliyet-yeri}} — the CO dimension' },
          { ad:'AUFNR', aciklama:'{{ic-siparis}}' },
          { ad:'PRCTR', aciklama:'{{kar-merkezi}}' },
          { ad:'RFAREA', aciklama:'Functional area — one of the CO→FI triggers' },
          { ad:'HSL', aciklama:'Amount in local currency' },
        ] },

      { ad:'CSKB', baslik:'Cost element master data',
        tutar:'A G/L account\'s CO counterpart and its **category**.',
        olusturan:'{{KA01}}',
        guncelleyen:'{{KA02}}',
        anahtar:'KOKRS + KSTAR + DATBI',
        iliskiler:'`KSTAR` = the G/L account number.',
        s4:'In S/4HANA the cost element became **an attribute of the account**; ' +
           'CSKB keeps being filled for compatibility.',
        alanlar:[
          { ad:'KSTAR', aciklama:'Cost element = **the G/L account number**', tip:'pk' },
          { ad:'KATYP', aciklama:'**Category:** 1 primary · 11 revenue · 42 assessment · 43 internal activity' },
        ] },

      { ad:'CSKA', baslik:'Cost element — chart-of-accounts level',
        tutar:'The chart-of-accounts-level definition of the cost element.',
        olusturan:'{{KA01}}',
        anahtar:'KTOPL + KSTAR',
        s4:'Still in place.' },

      { ad:'COEP', baslik:'CO actual line items (ECC)',
        tutar:'The line items on the CO side in ECC — a table **separate** from FI.',
        olusturan:'An FI posting or a CO transaction',
        anahtar:'KOKRS + BELNR + BUZEI',
        iliskiler:'Required reconciliation with {{BSEG}} in ECC.',
        s4:'**Merged with {{ACDOCA}}.** Readable as a {{uyumluluk-view}}.',
        alanlar:[
          { ad:'OBJNR', aciklama:'CO object — coded (KS* cost center, OR* order)' },
          { ad:'KSTAR', aciklama:'Cost element', tip:'fk' },
          { ad:'WOGBTR', aciklama:'Amount in object currency' },
        ] },

      { ad:'TKA01', baslik:'Controlling area definition',
        tutar:'The controlling area\'s currency, chart of accounts, and fiscal year variant.',
        olusturan:'{{OKKP}}',
        anahtar:'KOKRS',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KOKRS', aciklama:'{{kontrol-alani}}', tip:'pk' },
          { ad:'KTOPL', aciklama:'Chart of accounts — **must match the company codes\'**', tip:'fk' },
          { ad:'WAERS', aciklama:'Controlling area currency' },
        ] },

      { ad:'AUFK', baslik:'Internal order master data',
        tutar:'Order definition, type, status, settlement rule.',
        olusturan:'{{KO01}}',
        anahtar:'AUFNR',
        s4:'Unchanged.',
        alanlar:[
          { ad:'AUFNR', aciklama:'Order number', tip:'pk' },
          { ad:'AUART', aciklama:'Order type' },
          { ad:'PHAS0/1/2/3', aciklama:'Status: created · released · technically complete · closed' },
        ] },

      { ad:'CSKS', baslik:'Cost center master data',
        tutar:'Cost centers and their profit center assignment.',
        olusturan:'{{KS01}}',
        s4:'Unchanged. Details are covered in the {{cost-center}} topic.' },
    ],

    er:{
      type:'er',
      baslik:'FI–CO architecture: separate in ECC, unified in S/4HANA',
      varliklar:[
        { ad:'TKA01', rol:'Configuration', aciklama:'Controlling area',
          alanlar:[{ ad:'KOKRS', tip:'pk' }, { ad:'KTOPL', tip:'fk' }] },
        { ad:'CSKB', rol:'CO master data', aciklama:'Cost element',
          alanlar:[{ ad:'KOKRS', tip:'fk' }, { ad:'KSTAR', tip:'pk' }, { ad:'KATYP' }] },
        { ad:'SKB1', rol:'FI master data', aciklama:'G/L account',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }] },
        { ad:'CSKS', rol:'CO master data', aciklama:'Cost center',
          alanlar:[{ ad:'KOSTL', tip:'pk' }, { ad:'PRCTR', tip:'fk' }] },
        { ad:'AUFK', rol:'CO master data', aciklama:'Internal order',
          alanlar:[{ ad:'AUFNR', tip:'pk' }, { ad:'AUART' }] },
        { ad:'ACDOCA', rol:'Universal', hub:true, aciklama:'**FI + CO on a single line**',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'RACCT', tip:'fk' }, { ad:'KOSTL', tip:'fk' }, { ad:'AUFNR', tip:'fk' }, { ad:'PRCTR' }] },
        { ad:'COEP', rol:'ECC', aciklama:'CO line items (old)',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'OBJNR' }, { ad:'KSTAR', tip:'fk' }] },
        { ad:'BSEG', rol:'FI', aciklama:'FI line items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HKONT' }, { ad:'KOSTL' }] },
      ],
      iliskiler:[
        { from:'TKA01', to:'CSKB', alanlar:'KOKRS', not:'the controlling area' },
        { from:'SKB1', to:'CSKB', alanlar:'SAKNR → KSTAR', not:'**the same number**' },
        { from:'CSKB', to:'ACDOCA', alanlar:'KSTAR → RACCT', not:'the cost element bridge' },
        { from:'CSKS', to:'ACDOCA', alanlar:'KOSTL', not:'cost center' },
        { from:'AUFK', to:'ACDOCA', alanlar:'AUFNR', not:'internal order' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR', not:'the FI line' },
        { from:'ACDOCA', to:'COEP', alanlar:'BELNR', not:'**separate in ECC, unified in S/4**' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'There is **no user screen** in CO integration — the integration runs in the background. ' +
      'For a consultant, three configuration screens and one diagnostic screen matter.',

    ekranlar:[
      { ad:'{{OKKP}} — controlling area settings',
        aciklama:'The screen where the CO organization is set up.',
        alanlar:[
          { ad:'Controlling area', zorunlu:true },
          { ad:'Chart of accounts', zorunlu:true, aciklama:'**Must match the assigned company codes\'.**' },
          { ad:'Fiscal year variant', zorunlu:true, aciklama:'Must be **identical** to the company codes\'.' },
          { ad:'Company code assignment', zorunlu:true, aciklama:'Can be more than one — ' +
                   'makes intercompany distribution possible.' },
          { ad:'Active components', zorunlu:true, aciklama:'Cost center, internal order, CO-PA…' },
        ],
        ipucu:'**The decisions on this screen are irreversible.** ' +
              'Whether to attach more than one company code to a controlling area ' +
              'is made in the implementation\'s first week and can\'t be changed afterward.\n\n' +
              'In holding structures, a single controlling area makes intercompany cost ' +
              'distribution possible — but requires all companies to use **the same chart of accounts**.' },

      { ad:'{{KANK}} — CO number ranges',
        aciklama:'The silent breaking point.',
        alanlar:[
          { ad:'Controlling area', zorunlu:true },
          { ad:'Business transaction group', zorunlu:true, aciklama:'**COIN** the real posting · **RKU1** a reposting · ' +
                   '**RKIU** an assessment · **KOAO** a settlement.' },
          { ad:'Number range', zorunlu:true },
        ],
        ipucu:'**Put this right next to the FI ranges on the year-start checklist.** ' +
              'If the CO range is missing, the CO posting fails and, ' +
              'because it\'s in the same LUW, **the FI posting fails too**.\n\n' +
              'The user gets an error on the {{FB50}} screen, the cause is in CO, and ' +
              'the team spends hours searching on the FI side.' },

      { ad:'{{FAGLCOFIRTINT}} — the real-time integration variant',
        aciklama:'Determines which CO transfer will produce an FI document.',
        alanlar:[
          { ad:'Variant', zorunlu:true },
          { ad:'Company code change', zorunlu:false, aciklama:'**Effectively mandatory** — ' +
                   'a transfer between two legal entities must be posted.' },
          { ad:'{{kar-merkezi}} change', zorunlu:false, aciklama:'**Must be selected** if a profit-center ' +
                   'balance sheet is produced.' },
          { ad:'Business area change', zorunlu:false },
          { ad:'Functional area change', zorunlu:false, aciklama:'Should be selected if a function-based ' +
                   'income statement is presented.' },
        ],
        ipucu:'**Forgetting the profit center box** is the most common configuration error. ' +
              'The result: CO runs a cross-profit-center distribution, ' +
              'nothing changes in FI, and **the profit-center balance sheet doesn\'t agree**.\n\n' +
              'The difference is hunted down at month-end, and because the cause isn\'t on the CO side ' +
              'but in this variant, it\'s hard to find.' },

      { ad:'{{KA03}} — cost element diagnosis',
        aciklama:'The diagnosis point for "CO object required" errors.',
        alanlar:[
          { ad:'Cost element (= account)', zorunlu:true },
          { ad:'Controlling area', zorunlu:true },
          { ad:'Category', zorunlu:false, aciklama:'1 / 11 / 42 / 43' },
          { ad:'Validity range', zorunlu:false, aciklama:'Outside the date range, the cost element ' +
                   'behaves as if it "doesn\'t exist."' },
        ],
        ipucu:'It\'s a two-way diagnostic tool:\n\n' +
              '**a)** If you get a *"CO object required"* error → the cost element **exists**, ' +
              'you need to enter a CO object.\n\n' +
              '**b)** If an expense account **never shows up** in CO reports → ' +
              'the cost element **doesn\'t exist** and should be opened.' },
    ],

    zorunlu:['Controlling area','Chart of accounts match','Fiscal year variant match','CO number ranges','Cost element'],
    opsiyonel:['{{FAGLCOFIRTINT}} variant','Active CO components','{{OKB9}} defaults'],

    hatalar:[
      { mesaj:'Account ... requires an assignment to a CO object', sebep:'A cost element exists but no CO object was entered and there\'s no {{OKB9}}.', cozum:'Enter a CO object at posting or define an {{OKB9}} default. **The most common CO integration error.**' },
      { mesaj:'Number range for CO business transaction COIN is missing', sebep:'The CO number range is undefined.', cozum:'Define it with {{KANK}}. **If missing, the FI posting can\'t be made either** — the error shows up on the FI screen but the cause is in CO.' },
      { mesaj:'Chart of accounts of company code differs from controlling area', sebep:'The company code uses a different chart of accounts.', cozum:'Align the charts of accounts or set up a separate controlling area. **Practically impossible to change afterward.**' },
      { mesaj:'Cost element ... does not exist', sebep:'No cost element is defined for the G/L account.', cozum:'Define it with {{KA01}} (in S/4HANA: give the account the "Primary Costs" type inside {{FS00}}).' },
      { mesaj:'A CO distribution was made but no FI document was created', sebep:'The changed dimension isn\'t selected in the {{FAGLCOFIRTINT}} variant.', cozum:'If a profit-center balance sheet is produced, **the profit center box must be checked**.' },
      { mesaj:'There\'s an FI–CO difference (ECC)', sebep:'A transfer error or a configuration gap.', cozum:'Run the reconciliation report. **This problem can\'t arise structurally in S/4HANA.**' },
    ],

    ipuclari:[
      '**Open the CO number ranges together with the FI ranges at year-start** — ' +
      'if missing, expense postings stop and the cause is searched for in FI.',
      'Check the **profit center box** in the {{FAGLCOFIRTINT}} variant; ' +
      'it\'s mandatory if a profit-center balance sheet is produced.',
      'Don\'t **open** cost elements on balance sheet accounts — asking for a CO object ' +
      'makes no sense and needlessly complicates postings.',
      'On a "CO object required" error, check the cost element and ' +
      'its **validity range** with {{KA03}}.',
      'Add **"is there an open internal order?"** to the year-end closing checklist; ' +
      'an unsettled cost shows up neither in an asset nor in a cost center.',
      'Make the controlling-area ↔ company-code decision **in the implementation\'s first week**; ' +
      'it can\'t be changed afterward.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'ACDOCA', ne:'FI and CO lines **together**; `RACCT`, `KOSTL`, `AUFNR`, `PRCTR`' },
      { tablo:'BSEG', ne:'FI line items' },
      { tablo:'BKPF', ne:'Document header' },
      { tablo:'COEP', ne:'CO line items in ECC — moved into {{ACDOCA}} in S/4' },
      { tablo:'CSKB', ne:'Cost element master data (read)' },
      { tablo:'AUFK', ne:'Internal order master data' },
    ],

    commit:
      'FI and CO postings are written **in the same LUW**. This is the technical foundation of ' +
      'the integration, and it has two important consequences:\n\n' +
      '**1. A consistency guarantee.** A state where an FI posting exists but the CO posting ' +
      'doesn\'t (or vice versa) can\'t occur.\n\n' +
      '**2. Mutual dependency.** A problem on the CO side **stops the FI posting too**. ' +
      'The most typical example: if the {{KANK}} number range is missing, an expense ' +
      'posting can\'t be made at all.\n\n' +
      'This principle held true in ECC too, but because it was written to **two separate tables**, ' +
      'a theoretical inconsistency was possible (update errors, transfer issues), and ' +
      'that\'s why reconciliation reports existed.\n\n' +
      'In S/4HANA, because **a single line** is written, inconsistency is ' +
      '**structurally impossible** — the concept of reconciliation has disappeared.',

    belgeNo:
      'In ECC, FI and CO used to receive **separate document numbers**: ' +
      'FI from the {{FBN1}} range, CO from the {{KANK}} range. ' +
      'The same event had two numbers, and they were matched through fields like `AWKEY`.\n\n' +
      'In S/4HANA, FI-originated postings use a single document number.\n\n' +
      '**But CO-internal transactions** ({{KB11N}}, {{KSV5}}, {{KO88}}) still get ' +
      'their own CO document numbers — because they have no FI counterpart ' +
      '(or have one only conditionally). ' +
      'That\'s why {{KANK}} ranges are **still required** in S/4HANA too.',

    postingLogic:
      '**The FI → CO direction:**\n' +
      '1. Does the account have a cost element? If not, it doesn\'t flow into CO.\n' +
      '2. Was a CO object entered? If not, an {{OKB9}} default is looked up.\n' +
      '3. If none is found → *"requires an assignment to a CO object"* → **the document can\'t be saved**.\n' +
      '4. The profit center is derived from the CO object.\n' +
      '5. A single line is written to {{ACDOCA}} (S/4) or {{BSEG}}+{{COEP}} (ECC).\n\n' +
      '**The CO → FI direction:**\n' +
      '1. A CO transaction runs (distribution, assessment, settlement, reposting).\n' +
      '2. The **dimensions of the source and target objects are compared**.\n' +
      '3. If one of the triggering dimensions in the {{FAGLCOFIRTINT}} variant changed ' +
      '→ **an FI document is produced**.\n' +
      '4. If not, only a CO posting is created.\n\n' +
      'Step 3 of the second direction is the **conceptual center** of the topic: ' +
      'FI only kicks in when **a dimension it reports on itself** changes.',

    belgeTuru:
      'A separate document type is defined for CO→FI documents ' +
      '(specified in the {{FAGLCOFIRTINT}} variant) — usually `AB` or a dedicated type.\n\n' +
      'Using a separate type is **good practice**: the question ' +
      '"did this document come from CO?" is answered in a report with a document-type filter.',

    numberRange:
      '**There are two separate range families, and both must be opened at year-start:**\n\n' +
      '**FI:** {{FBN1}} — by document type.\n' +
      '**CO:** {{KANK}} — by business transaction (COIN, RKU1, RKIU, KOAO).\n\n' +
      'If the CO range is missing, **the FI posting fails too**, because both are in the same LUW.\n\n' +
      'This is a common outage at year-start: the FI ranges are opened carefully, ' +
      'CO is forgotten, and on the morning of January 1st expense postings stop.',

    accountDetermination:
      'CO integration\'s own account determination is limited but kicks in in three places:\n\n' +
      '**1.** Account determination for **CO→FI documents** (inside {{FAGLCOFIRTINT}}).\n' +
      '**2. Assessment cost elements** (category 42) — CO-internal, no FI account.\n' +
      '**3. {{ic-siparis}} settlement** — different accounts depending on the target type ' +
      '(fixed asset, cost center, G/L).\n\n' +
      'Because secondary cost elements are **also opened as G/L accounts** in S/4HANA, ' +
      'this distinction has become simpler.',

    tur:
      '**Configuration:** the {{kontrol-alani}} ({{OKKP}}, {{TKA01}}), CO number ranges ({{KANK}}), ' +
      'the {{FAGLCOFIRTINT}} variant, distribution/assessment cycles, order types.\n\n' +
      '**Master data:** cost elements ({{CSKB}}), cost centers ({{CSKS}}), ' +
      'internal orders ({{AUFK}}), activity types.\n\n' +
      '**Transaction data:** {{ACDOCA}} lines, CO documents.',

    transport:
      'Controlling area settings, number ranges, and the integration variant transport. ' +
      '**But there are three traps:**\n\n' +
      '**1.** Cost elements and cost centers are **master data and don\'t transport** — ' +
      'they must also be created in the target system.\n\n' +
      '**2.** In most implementations, CO number ranges **don\'t transport**; ' +
      'they must be defined by hand in production. This is the most common reason ' +
      'expense postings stop after a go-live.\n\n' +
      '**3.** The controlling-area ↔ company-code assignment depends on the target system\'s ' +
      'company code structure, and **chart-of-accounts compatibility** must be verified.\n\n' +
      '**Migration check:** post a test expense in production; ' +
      'verify the CO line was created with {{KSB1}}.',

    img:[
      { yol:'SPRO → Controlling → General Controlling → Organization → Maintain Controlling Area', not:'{{OKKP}} → {{TKA01}}' },
      { yol:'SPRO → Controlling → General Controlling → Organization → Maintain Number Ranges', not:'{{KANK}} — **if missing, FI stops too**' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Real-Time Integration of Controlling with Financial Accounting', not:'{{FAGLCOFIRTINT}}' },
      { yol:'SPRO → Controlling → Cost Center Accounting → Master Data → Cost Elements', not:'{{KA01}} · inside {{FS00}} in S/4HANA' },
    ],

    ekstra:[
      { ic:'🔄', baslik:'CO → FI: which dimension change brings FI into play?', metin:
        'A CO-internal transfer normally **doesn\'t produce** an FI document — ' +
        'because the company\'s total expense doesn\'t change.\n\n' +
        'But if one of **four dimensions** changes, it does:\n\n' +
        '**1. Company code.** A transfer between two legal entities. ' +
        'A mutual payable/receivable in FI is **mandatory** — it can\'t be turned off, ' +
        'because two separate companies\' financial statements are affected.\n\n' +
        '**2. {{kar-merkezi}}.** If a profit-center-based balance sheet is produced ({{new-gl}}), ' +
        'FI needs to know too.\n\n' +
        '**3. Business area.** A dimension reported in FI.\n\n' +
        '**4. Functional area.** Used in a function-based presentation of the income statement ' +
        '(the production cost / marketing / administration split).\n\n' +
        '**The common logic:** all four are dimensions **FI reports on**. ' +
        'Having them change in CO without changing in FI would create two different truths.\n\n' +
        'Every other CO movement doesn\'t affect FI: ' +
        'a cost center change (within the same profit center), an activity transfer, ' +
        'an internal order settled to a cost center.\n\n' +
        '**The diagnostic question:** "did this CO transaction produce an FI document?" → ' +
        '"which dimension changed?"' },

      { ic:'🏛️', baslik:'One controlling area, multiple company codes: what does it gain, what does it require?', metin:
        '**Multiple company codes** can be attached to a controlling area, and ' +
        'this is a valuable option in holding structures.\n\n' +
        '**What it gains:** intercompany cost distribution. ' +
        'If a central IT unit serves the group\'s companies, ' +
        'its cost can be distributed with a single CO transaction.\n\n' +
        '**What it requires — and this is heavy:**\n\n' +
        '**a) The same chart of accounts.** All attached company codes must use ' +
        'the same chart of accounts. If different countries require different legal ' +
        'charts of accounts, this requirement can\'t be met.\n\n' +
        '**b) The same fiscal year variant.** Mandatory for period matching.\n\n' +
        '**c) Intercompany transfers produce FI documents** — ' +
        'and these accumulate in intercompany payable/receivable accounts, ' +
        'which need to be eliminated in consolidation.\n\n' +
        '**Decision timing is critical:** this is made in the implementation\'s **first week**. ' +
        'Merging or splitting controlling areas afterward requires migrating the entire ' +
        'CO history and is practically never done.\n\n' +
        'The alternative: a separate controlling area per company code. ' +
        'Simple, but it **entirely** removes the possibility of intercompany distribution.' },
    ],

    notlar:[
      { tip:'warn', baslik:'FI–CO reconciliation doesn\'t exist as a concept in S/4HANA', metin:
        'In ECC, a significant chunk of month-end went into hunting down differences between FI and CO. ' +
        'The reason was simple: the same event was written to **two tables** ({{BSEG}} and {{COEP}}), and ' +
        'they could theoretically become inconsistent.\n\n' +
        'In S/4HANA there\'s **a single line**. The account and the cost center sit on the same {{ACDOCA}} line. ' +
        'Inconsistency is **structurally impossible**.\n\n' +
        'The practical consequences:\n\n' +
        '• FI–CO reconciliation reports are **unnecessary** — they should be removed during migration\n' +
        '• The month-end time set aside for this job is **freed up**\n' +
        '• Custom-built reconciliation programs **stop working** ' +
        '(COEP is now a compatibility view)\n\n' +
        'In migration projects, these programs\' **inventory should be taken** and ' +
        'they should be removed; otherwise they report meaningless differences and ' +
        'create needless investigation.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'CO integration is **the area that changed the most on the FI side of S/4HANA**. ' +
      'FI and CO lines merged with {{ACDOCA}}, ' +
      'the cost element became an attribute of the G/L account, ' +
      'and FI–CO reconciliation **disappeared as a concept**.',

    eccFarklari:[
      { konu:'Line item data', ecc:'{{BSEG}} (FI) + {{COEP}} (CO) — **separate**', s4:'**{{ACDOCA}}** — a single line' },
      { konu:'Cost element', ecc:'Separate master data ({{KA01}})', s4:'**An attribute of the G/L account** ({{FS00}})' },
      { konu:'Secondary cost element', ecc:'**Not** in the FI chart of accounts', s4:'**Opened as a G/L account**' },
      { konu:'FI–CO reconciliation', ecc:'A month-end job', s4:'**Gone as a concept**' },
      { konu:'CO→FI real-time', ecc:'{{FAGLCOFIRTINT}} (with {{new-gl}})', s4:'Same, but the internal architecture is unified' },
      { konu:'CO-PA', ecc:'Separate tables (CE1xxxx)', s4:'**Account-based** — in {{ACDOCA}}' },
      { konu:'Profit center', ecc:'A separate ledger (EC-PCA)', s4:'An {{ACDOCA}} dimension' },
    ],

    universalJournal:
      '{{ACDOCA}} solved, for CO integration, the question: ' +
      '*"why does the same event sit twice, in two tables?"*\n\n' +
      'In ECC, an expense posting was written separately to {{BSEG}} (the account dimension) and ' +
      '{{COEP}} (the CO dimension). Even though both were written in the same LUW, ' +
      'being different tables meant reconciliation was needed.\n\n' +
      'In S/4HANA there\'s **a single line**: `RACCT` (the account) and `KOSTL` (the cost center) ' +
      'sit on the same line. A difference arising is **physically impossible**.\n\n' +
      'The second big change is the **cost element**: it\'s no longer a separate piece of ' +
      'master data, it\'s an attribute of the G/L account. Opening the account and choosing ' +
      '"Primary Costs" finishes the job. {{KA01}} still works but isn\'t mandatory.\n\n' +
      'The third is **secondary cost elements**: in ECC they weren\'t in the FI chart of ' +
      'accounts (they existed only inside CO). In S/4HANA they\'re also opened as G/L ' +
      'accounts — which lets assessment and settlement transactions be tracked on the FI side too.',

    kalkanTcodes:[
      { eski:'{{KA01}} / {{KA02}}', yeni:'{{FS00}}', not:'The cost element is an attribute of the account; {{KA01}} isn\'t mandatory' },
      { eski:'FI–CO reconciliation reports', yeni:'—', not:'**No longer needed, should be removed**' },
      { eski:'The EC-PCA profit center ledger', yeni:'An {{ACDOCA}} dimension', not:'The separate ledger is gone' },
      { eski:'—', yeni:'—', not:'{{OKKP}}, {{KANK}}, {{KSB1}}, {{KO88}} were **not removed**' },
    ],

    fiori:[
      { ad:'Manage G/L Account Master Data', aciklama:'Replaces {{FS00}}; the cost element setting is here.' },
      { ad:'Cost Centers — Actual Line Items', aciklama:'Replaces {{KSB1}}.' },
      { ad:'Manage Internal Orders', aciklama:'Replaces {{KO01}}/{{KO02}}.' },
      { ad:'Run Settlement', aciklama:'Replaces {{KO88}}; runs settlement.' },
      { ad:'Profitability Analysis', aciklama:'Account-based CO-PA — no difference from FI can arise.' },
      { ad:'Display Line Items in General Ledger', aciklama:'FI and CO dimensions can be filtered together.' },
    ],

    compatibilityViews:[
      '{{COEP}} — a view derived from {{ACDOCA}}; old programs work but are **slow**.',
      '{{BSEG}} — likewise a compatibility view.',
      '{{CSKB}}, {{CSKA}}, {{CSKS}}, {{AUFK}}, {{TKA01}} — **remain physical tables**.',
      'New development should read {{ACDOCA}} **directly**.',
    ],

    performans:
      'The biggest win is **the drop in month-end workload**: ' +
      'FI–CO reconciliation, difference investigation, and correction postings disappeared entirely.\n\n' +
      'The reporting side also gains concretely: in ECC, the question ' +
      '"which cost center bought how much from which vendor?" would require ' +
      'joining {{BSEG}} and {{COEP}}. In S/4HANA it\'s **a single table, a single query**.\n\n' +
      'Because account-based CO-PA is also derived from FI, ' +
      'a difference between the profitability report and the income statement **can\'t arise**.',

    bestPractices:[
      'During migration, **take an inventory of FI–CO reconciliation programs and remove them**; ' +
      'they report meaningless differences and create needless investigation.',
      'Convert cost elements into the G/L account attribute — ' +
      'the conversion is mechanical because the numbers are already identical.',
      'Plan to add secondary cost elements to the chart of accounts.',
      'Add CO number ranges ({{KANK}}) to the migration checklist — ' +
      'they **don\'t transport**, and must be defined by hand in production.',
      'Evaluate moving to account-based CO-PA; profitability reconciliation against FI ' +
      'disappears too.',
      'In new development, read **{{ACDOCA}}** instead of {{COEP}}; ' +
      'the compatibility view is slow.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'Expense postings stopped on the morning of January 1st: the error was in FI, the cause in CO',
    hikaye:
      'At **Anadolu Holding**, year-start preparations were done carefully: ' +
      'the FI number ranges were opened, periods were set with {{OB52}}, ' +
      'and balance carryforward was run for every ledger with {{FAGLGVTR}}.\n\n' +
      'On the morning of **January 2nd**, the accounting team starts working and gets ' +
      'an error on the very first invoice. The second invoice, the third — **all the same error**.\n\n' +
      'All expense postings have stopped. But collections, ' +
      'bank postings, and vendor payments are **working fine**.\n\n' +
      'This scenario shows the practical consequence of FI and CO sitting in the same LUW, and ' +
      'why the error was hunted for in the wrong place.',
    veriler:[
      { k:'Company code / Controlling area', v:'1000 / 1000' },
      { k:'Date', v:'02.01.2028' },
      { k:'Working transactions', v:'Collection ({{F-28}}), payment ({{F-53}}), bank' },
      { k:'**Stopped transactions**', v:'**All expense postings** ({{FB50}}, {{FB60}}, {{MIRO}})' },
      { k:'Error message', v:'"Number range for CO business transaction COIN is missing"' },
    ],

    adimlar:[
      { baslik:'The error pattern is examined — which transactions work?', tcode:'FB60',
        aciklama:'What\'s working and what\'s not is broken down.',
        girdi:[
          { alan:'{{FB60}} expense invoice', deger:'**Error** ' },
          { alan:'{{FB50}} G/L expense posting', deger:'**Error** ' },
          { alan:'{{F-28}} customer collection', deger:'Working ✓' },
          { alan:'{{F-53}} vendor payment', deger:'Working ✓' },
          { alan:'{{FB50}} bank transfer (no expense account)', deger:'Working ✓' },
        ],
        not:'**The pattern is very clear:** only postings that include an **expense account** ' +
             'are stopping.\n\n' +
             'Collection, payment, and transfer postings use balance sheet accounts and ' +
             'work fine.\n\n' +
             'This pattern points to one thing: the problem is in something ' +
             '**specific to expense accounts**. What sets expense accounts apart from the rest? ' +
             'The **cost element** — i.e. CO integration.' },

      { baslik:'The error message is read — the cause is in CO', tcode:'FB60',
        aciklama:'The full message text is examined.',
        girdi:[
          { alan:'Message', deger:'"Number range for CO business transaction **COIN** is missing"' },
          { alan:'What is COIN?', deger:'CO\'s **real FI→CO posting** business transaction' },
          { alan:'Where is it defined?', deger:'{{KANK}} — CO number ranges' },
          { alan:'Where was the team looking?', deger:'{{FBN1}} — the FI number ranges' },
        ],
        not:'**The error shows up on the FI screen, but the cause is in CO.**\n\n' +
             'The team spent two hours checking the FI ranges in {{FBN1}} — ' +
             'all of them had been opened correctly. Because the problem wasn\'t there.\n\n' +
             'Because FI and CO are written **in the same LUW**, when the CO posting fails ' +
             'the FI posting fails too, and the user sees the error on the FI screen.' },

      { baslik:'The CO number ranges are checked', tcode:'KANK',
        aciklama:'The root cause is confirmed.',
        girdi:[
          { alan:'Controlling area', deger:'1000' },
          { alan:'COIN (the real posting)', deger:'**A 2027 range exists · 2028 is MISSING** ' },
          { alan:'RKU1 (reposting)', deger:'2028 missing ' },
          { alan:'RKIU (assessment)', deger:'2028 missing ' },
          { alan:'KOAO (settlement)', deger:'2028 missing ' },
        ],
        not:'**The root cause is found.** The CO number ranges are defined by year, and ' +
             '**none of them** have been opened for 2028.\n\n' +
             'The year-start checklist had an item "open the number ranges" — ' +
             'but it only meant the **FI ranges**. The CO ranges were **nowhere** on the list.\n\n' +
             'Result: a system that ran fine all year stopped on January 1st.' },

      { baslik:'The ranges are opened', tcode:'KANK',
        aciklama:'All CO business transaction ranges for 2028 are being defined.',
        girdi:[
          { alan:'COIN', deger:'2028 · 0100000000–0199999999' },
          { alan:'RKU1', deger:'2028 · 0200000000–0299999999' },
          { alan:'RKIU', deger:'2028 · 0300000000–0399999999' },
          { alan:'KOAO', deger:'2028 · 0400000000–0499999999' },
          { alan:'Duration', deger:'**4 minutes**' },
        ],
        not:'The fix took four minutes. But **the outage lasted three hours**, and ' +
             'two of those hours went into looking for the error **in the wrong place**.\n\n' +
             'This is CO integration\'s most typical operational problem: ' +
             'a small configuration gap, an error searched for at the wrong layer, and ' +
             'a disproportionate outage.' },

      { baslik:'A test posting is made and the CO line is verified', tcode:'FB60',
        aciklama:'It\'s not enough for the FI posting alone to go through — the CO line is checked too.',
        girdi:[
          { alan:'Test invoice', deger:'V-3001 · 12,000 TRY · cost center 5100' },
          { alan:'FI posting', deger:'Document 1900000012 was created ✓' },
          { alan:'CO check', deger:'{{KSB1}} → cost center 5100 → **the line appears** ✓' },
        ],
        fis:{ baslik:'Document 1900000012 — test posting', belgeTuru:'KR', tarih:'02.01.2028',
          satirlar:[
            { hesap:'770', ad:'General administrative expense — cost center 5100', borc:10000 },
            { hesap:'191', ad:'Deductible VAT', borc:2000 },
            { hesap:'320', ad:'Trade payables — V-3001', alacak:12000 },
          ], not:'The FI document was created **and** the {{ACDOCA}} `KOSTL` = 5100 field was filled.\n\n' +
                 'Querying cost center 5100 with {{KSB1}} shows the line — ' +
                 'proof the CO side is also working.' },
        tabloEtkisi:[
          { tablo:'ACDOCA', ne:'FI and CO lines together; `KOSTL` filled ✓' },
          { tablo:'BKPF', ne:'The document header' },
        ],
        not:'**Verification needs two legs:** was the FI document created **and** ' +
             'was the CO line written?\n\n' +
             'Seeing only "the document was saved" isn\'t enough — ' +
             'the CO side can silently stay empty (which happens if the cost element is missing).' },

      { baslik:'A second problem surfaces — the CO→FI distribution', tcode:'KSV5',
        aciklama:'An unexpected situation at the end of January.',
        girdi:[
          { alan:'Distribution', deger:'6100 IT → 3 cost centers · 480,000 TRY' },
          { alan:'CO document', deger:'Created ✓' },
          { alan:'FI document', deger:'**Not created** ' },
          { alan:'Expected', deger:'The target cost centers are in **different profit centers**' },
        ],
        not:'The distribution ran in CO but **nothing changed** in FI.\n\n' +
             'This company produces a profit-center-based balance sheet ({{new-gl}} + {{belge-bolme}}). ' +
             'Cross-profit-center cost transfer reflecting into FI is **mandatory**.\n\n' +
             'Because it didn\'t reflect: Production\'s expense rose in CO, ' +
             '**didn\'t rise** in the FI profit-center balance sheet. ' +
             'Two different truths were born.' },

      { baslik:'The {{FAGLCOFIRTINT}} variant is checked', tcode:'FAGLCOFIRTINT',
        aciklama:'The real-time integration settings are examined.',
        girdi:[
          { alan:'Company code change', deger:'Checked ✓' },
          { alan:'Business area change', deger:'Checked ✓' },
          { alan:'Functional area change', deger:'Checked ✓' },
          { alan:'**Profit center change**', deger:'**Unchecked** ' },
        ],
        not:'**The second root cause is found.** The profit center box in the variant isn\'t checked.\n\n' +
             'This setting was missed while the {{new-gl}} implementation was being set up. ' +
             'At the time, profit-center-based balance sheets weren\'t yet in use, and ' +
             'leaving the box unchecked caused no problem.\n\n' +
             'Once document splitting was turned on later, the profit-center balance sheet ' +
             'started being produced — but this variant **wasn\'t updated**.' },

      { baslik:'The variant is fixed and the distribution is re-run', tcode:'KSV5',
        aciklama:'The profit center box is checked and the distribution is repeated.',
        girdi:[
          { alan:'Variant', deger:'Profit center change **checked**' },
          { alan:'Old distribution', deger:'Reversed' },
          { alan:'New distribution', deger:'Run · **an FI document was created** ✓' },
        ],
        fis:{ baslik:'CO→FI document — profit center transfer', belgeTuru:'AB', tarih:'31.01.2028',
          satirlar:[
            { hesap:'770', ad:'IT expense — PC PC-1000 Production', borc:216000 },
            { hesap:'770', ad:'IT expense — PC PC-2000 Sales', borc:144000 },
            { hesap:'770', ad:'IT expense — PC PC-5000 Administration', borc:120000 },
            { hesap:'770', ad:'IT expense — PC PC-9000 General', alacak:480000 },
          ], not:'**The same account** is both debit and credit. The total expense didn\'t change ' +
                 '(net effect zero) — it only moved between profit centers.\n\n' +
                 'The CO report and the profit-center balance sheet now **agree**.' },
        tabloEtkisi:[
          { tablo:'ACDOCA', ne:'CO→FI lines; each carrying a different `PRCTR`' },
        ],
        not:'Without this document, the profit-center balance sheet and the CO report ' +
             'would have diverged by **480,000 TRY** every month.' },

      { baslik:'Permanent measures', tcode:'KANK',
        aciklama:'The checklist is updated for both problems.',
        girdi:[
          { alan:'Measure 1', deger:'**"CO number ranges ({{KANK}})"** added to the year-end checklist — ' +
                                  'right next to the FI ranges' },
          { alan:'Measure 2', deger:'A step to post a **test expense entry** on January 2nd was added' },
          { alan:'Measure 3', deger:'The test posting also **verifies the CO line** ({{KSB1}})' },
          { alan:'Measure 4', deger:'The {{FAGLCOFIRTINT}} variant was added to the list of ' +
                                  '**configuration to review on architecture changes**' },
        ],
        not:'**The fourth measure is the most valuable:** when an architecture change is made — ' +
             'document splitting, parallel ledgers, profit-center reporting — ' +
             'the {{FAGLCOFIRTINT}} variant should be reviewed too.\n\n' +
             'This kind of variant gets set up once and forgotten, and ' +
             'silently falls behind when the architecture changes.' },
    ],

    sonuc:
      '**Two separate CO configuration gaps surfaced in two different ways.**\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. FI and CO are in the same LUW — a CO problem stops FI.** ' +
      'If the CO number range is missing, an expense posting can\'t be made at all. ' +
      'The error shows up **on the FI screen**, the cause is **in CO**, and the team searches ' +
      'in the wrong place for two hours. ' +
      '**Diagnostic tip:** if only expense postings are stopping (while collections/payments work), ' +
      'the problem is in whatever sets expense accounts apart — i.e. **CO integration**.\n\n' +
      '**2. CO number ranges must also be opened at year-start.** ' +
      '{{FBN1}} is done carefully, {{KANK}} is forgotten. ' +
      'They should sit **side by side** on the checklist. ' +
      'The fix took four minutes, the outage three hours.\n\n' +
      '**3. The CO→FI feedback flow is conditional, and the condition is configured.** ' +
      'A CO-internal transfer normally doesn\'t produce an FI document — but it must ' +
      'if the company code, **profit center**, business area, or functional area changes. ' +
      'This condition is defined in the {{FAGLCOFIRTINT}} variant, and ' +
      '**forgetting the profit center box** is the most common mistake.\n\n' +
      '**4. Configuration variants go stale when the architecture changes.** ' +
      'The profit center box was rightly left unchecked when {{new-gl}} was set up — ' +
      'there was no profit-center balance sheet at the time. ' +
      'Once document splitting was turned on later, the variant **wasn\'t updated**, and ' +
      'CO and FI began diverging by 480,000 TRY every month. ' +
      '**Dependent variants must also be reviewed when the architecture changes.**',
  },

  },
});
