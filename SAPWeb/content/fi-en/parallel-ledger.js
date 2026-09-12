/* ==========================================================================
   content/fi-en/parallel-ledger.js — English body for "Parallel Ledger"
   Same conventions as content/fi-en/genel-muhasebe.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'parallel-ledger',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Parallel ledger is the method for **recording the same transaction under multiple accounting ' +
      'standards at once**. If a company must report to both local tax law and {{ifrs}}, the same event ' +
      'has to be recorded at two different amounts.\n\n' +
      'SAP solves this with **ledgers**. The **{{lider-defter}}** (standard code **0L**) carries the main ' +
      'standard; additional ledgers (2L, 3L…) carry the other standards. Common transactions are written to ' +
      '**every ledger**; only the parts that differ are written to a single ledger ({{FB01L}}).\n\n' +
      'The critical point is this: **data isn\'t duplicated, the difference is recorded.** A sales invoice ' +
      'isn\'t entered twice; since it\'s the same under both standards, one entry goes to every ledger. Only ' +
      'items that **vary by standard**, such as depreciation, are recorded on a per-ledger basis.',

    neden:
      '**Legal requirement.** Publicly traded companies and large-scale businesses report under both local ' +
      'law and international standards.\n\n' +
      '**Different valuation rules.** Depreciation periods, provisioning criteria, lease accounting, revenue ' +
      'recognition timing — all vary by standard.\n\n' +
      '**One system, one source of truth.** The alternative is keeping a second accounting system or ' +
      'correction spreadsheets in Excel; neither is auditable.\n\n' +
      '**Traceability.** It must be visible which ledger, which document, and which reason produced each difference.',

    sirketOnemi:
      'Parallel ledger is an **indicator of a company\'s accounting maturity**. It\'s hard to set up and ' +
      'demands discipline to operate — but the alternative is "keeping IFRS adjustments in Excel," and that\'s ' +
      'the practice most criticized in an audit.\n\n' +
      'For a consultant, this topic is **the bridge between {{new-gl}} and {{asset-accounting}}**: the ' +
      'heaviest real-world use of parallel ledger is fixed assets, because depreciation differences repeat ' +
      'every month, for every asset.\n\n' +
      'The distinguishing question is: **"What happens if the ledger group is left blank?"** The correct ' +
      'answer: the posting goes to **every ledger**. This is parallel ledger\'s most fundamental behavior, and ' +
      'getting it wrong means the whole architecture is built wrong.',

    gercekHayat:
      'A manufacturing company buys a machine for 1,200,000 TRY.\n\n' +
      '**Local law:** 10-year depreciation → 120,000 TRY a year.\n' +
      '**IFRS:** the machine\'s real useful life is 8 years → 150,000 TRY a year.\n\n' +
      'Same asset, same cost, **different expense**. The difference is 30,000 TRY a year.\n\n' +
      'How do you manage this difference? There are three ways:\n\n' +
      '**1. Keep it in Excel** — not auditable, high error risk, updated by hand every month.\n\n' +
      '**2. Open two separate asset records** — the asset appears twice, inventory breaks, two records have to ' +
      'be closed out at sale.\n\n' +
      '**3. Parallel ledger** — a single asset, two {{amortisman-alani}}s, each area writes to one ledger. The ' +
      'purchase is a single entry (to every ledger), depreciation is per-ledger. **This is the correct solution.**',

    muhasebeMantigi:
      'Parallel ledger\'s accounting logic rests on one principle: **the transaction itself is single, its ' +
      'valuation is multiple.**\n\n' +
      'When a machine is purchased, the event is one: 1,200,000 TRY was paid, an asset was acquired. No ' +
      'standard disputes this. That\'s why the purchase posting goes to **every ledger**.\n\n' +
      'But "over how many years does this asset wear out?" is a **valuation judgment** and varies by standard. ' +
      'That\'s why depreciation is recorded **per ledger**.\n\n' +
      'The same split holds everywhere: the fact that a lawsuit was filed is single, but "how much provision ' +
      'should be set aside?" varies by standard. The fact that a lease was signed is single, but IFRS 16 puts ' +
      'it on the balance sheet while local law may not.\n\n' +
      '**Practical rule:** write the fact to every ledger, write the judgment per ledger.',

    kavramlar: ['lider-defter', 'defter-grubu', 'ifrs', 'amortisman-alani',
                'evrensel-kayit-defteri', 'yerel-para-birimi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The parallel ledger process is governed by two questions: **"Is this transaction the same under every ' +
      'standard?"** and if not, **"which ledger should get what?"** 95% of daily transactions answer "yes" to ' +
      'the first question and need no extra effort at all.',

    roller:[
      { rol:'User', gorev:'Enters normal transactions — **doesn\'t touch the ledger field**; the posting goes to every ledger.' },
      { rol:'General accounting', gorev:'Enters postings with a standard-based difference to a **single ledger** via {{FB01L}} / {{FB50L}}.' },
      { rol:'Fixed asset accounting', gorev:'Runs {{AFAB}}; each {{amortisman-alani}} writes to its own ledger.' },
      { rol:'FI consultant', gorev:'Designs ledgers, ledger groups, and the area↔ledger mapping with {{FINSC_LEDGER}}.' },
      { rol:'Reporting', gorev:'Pulls ledger-based reports with {{FAGLL03}} / {{FAGLB03}}.' },
      { rol:'Auditor', gorev:'Looks for the differences between two ledgers to be **justified**.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Which posting goes to which ledger?',
      adimlar:[
        { ic:'❓', rol:'Accounting', baslik:'Question: is this transaction the same under every standard?',
          aciklama:'Sales, purchases, receipts, payments → **yes**. ' +
                   'Depreciation, provisions, leasing, valuation → **no**.',
          cikti:'Decision', ok:'if the same' },
        { ic:'📝', rol:'User', baslik:'Normal posting — **ledger group blank**',
          aciklama:'A normal entry via {{FB60}} / {{FB70}} / {{MIRO}}. ' +
                   'Because the ledger group is blank, the posting goes to **every ledger**.',
          cikti:'The same posting in every ledger', ok:'if different' },
        { ic:'🎯', rol:'General accounting', baslik:'Ledger-based posting ({{FB01L}})',
          aciklama:'The ledger group is **specified**; the posting goes only to that ledger. ' +
                   'The other ledgers are unaffected.',
          cikti:'A posting in a single ledger', ok:'for assets' },
        { ic:'🏭', rol:'Fixed assets', baslik:'{{AFAB}} — areas write to ledgers',
          aciklama:'Each {{amortisman-alani}} is tied to a ledger group. ' +
                   'Area 01 → leading ledger, area 32 → IFRS ledger.',
          cikti:'Ledger-based depreciation', ok:'period end' },
        { ic:'📊', rol:'Reporting', baslik:'Ledger-based reports',
          aciklama:'{{FAGLB03}} shows the same account\'s balance in **different ledgers**. ' +
                   'The difference is the amount of the standards gap.',
          cikti:'Two standards, two tables', ok:'closing' },
        { ic:'📅', rol:'General accounting', baslik:'Ledger-based closing',
          aciklama:'{{FAGLGVTR}} balance carryforward is run **separately for each ledger**.',
          cikti:'Carried-forward balances' },
      ],
    },

    adimlar:[
      { rol:'Consultant', eylem:'Defines the ledgers', sistem:'{{FINSC_LEDGER}} → {{T881}}' },
      { rol:'Consultant', eylem:'Links depreciation areas to ledgers', sistem:'{{OADB}} — the AA ↔ ledger bridge' },
      { rol:'User', eylem:'Enters normal transactions', sistem:'Ledger group **blank** → every ledger' },
      { rol:'General accounting', eylem:'Enters the standards-based difference', sistem:'{{FB01L}} / {{FB50L}} → a single ledger' },
      { rol:'Fixed assets', eylem:'Runs depreciation', sistem:'{{AFAB}} → ledgers by area' },
      { rol:'Reporting', eylem:'Pulls a ledger-based report', sistem:'{{FAGLB03}}, {{FAGLL03}}' },
      { rol:'General accounting', eylem:'Runs balance carryforward', sistem:'{{FAGLGVTR}} — **for every ledger**' },
    ],

    veriAkisi:{
      nereden:'Ledger definitions ({{T881}}), the depreciation area ↔ ledger mapping, the ledger group the user selects.',
      nereye:'{{ACDOCA}} — every line carries an `RLDNR` (ledger) field; ledger-based reports.',
      tetikleyen:'Every posting. If the ledger group is blank, it goes to every ledger; if filled, only to that group.',
      sonraki:'Ledger-based closing, standard-specific financial statements, audit.',
    },

    notlar:[
      { tip:'warn', baslik:'Ledger group blank = every ledger', metin:
        'This is parallel ledger\'s **most fundamental and most misunderstood** behavior.\n\n' +
        'If the ledger group field is left blank on the posting screen, the entry goes to **every ledger**. ' +
        '"Blank = no ledger" or "blank = the leading ledger" is **not correct**.\n\n' +
        'This design is right: most daily transactions are the same under every standard, and users ' +
        'shouldn\'t have to choose a ledger on every invoice.\n\n' +
        'But the opposite mistake is **very costly**: entering a posting with an IFRS difference without ' +
        'specifying a ledger group writes the difference to the **local ledger too**. Result: the local ' +
        'financial statements are corrupted, and the error is usually caught at year-end, during the audit.\n\n' +
        '**Prevention:** define a separate document type for ledger-based postings and enforce the discipline ' +
        'of entering them only via {{FB01L}} / {{FB50L}}.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Parallel ledger\'s accounting is best understood through a single example: **a machine\'s lifetime**. ' +
      'The purchase is the same in both ledgers, depreciation differs, and at the moment of sale a ' +
      '**different profit/loss** results in each ledger.',

    etkilenenHesaplar:[
      { hesap:'253 Plant, machinery and equipment', tur:'Balance sheet — Asset', neden:'The purchase is the same in both ledgers — **the fact is single**.' },
      { hesap:'257 Accumulated depreciation', tur:'Balance sheet — Asset (contra)', neden:'**Differs by ledger** — a valuation judgment.' },
      { hesap:'770 Depreciation expense', tur:'Income statement', neden:'Each ledger carries its own amount.' },
      { hesap:'Provision accounts', tur:'Balance sheet — Liability', neden:'IFRS and local law use different criteria.' },
      { hesap:'Right-of-use asset (IFRS 16)', tur:'Balance sheet — Asset', neden:'Exists only in the IFRS ledger; absent from the local ledger.' },
      { hesap:'689 / 649 Other expense-income', tur:'Income statement', neden:'A different profit/loss arises in each ledger when the asset is sold.' },
    ],

    fisler:[
      { baslik:'Step 1 — A machine is purchased · **every ledger** (ledger group blank)',
        belgeTuru:'KR', tarih:'02.01.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Plant, machinery and equipment', borc:1200000, not:'**The same** in both ledgers' },
          { hesap:'191', ad:'Deductible VAT', borc:240000 },
          { hesap:'320', ad:'Trade payables', alacak:1440000 },
        ],
        not:'**The ledger group was left blank** → the posting went to both the leading ledger (0L) and the ' +
             'IFRS ledger (2L) at once.\n\n' +
             'This is the correct behavior: "a machine was bought for 1,200,000 TRY" is a **fact**, and no ' +
             'standard sees it differently.' },

      { baslik:'Step 2a — Annual depreciation · **leading ledger (0L)** · 10 years',
        belgeTuru:'AF', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Depreciation expense', borc:120000, not:'Depreciation area **01** → ledger 0L' },
          { hesap:'257', ad:'Accumulated depreciation', alacak:120000 },
        ],
        not:'10 years under local law → 1,200,000 / 10 = **120,000 TRY**.\n\n' +
             'This posting went only to the **leading ledger**; the IFRS ledger was unaffected.' },

      { baslik:'Step 2b — Annual depreciation · **IFRS ledger (2L)** · 8 years',
        belgeTuru:'AF', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Depreciation expense', borc:150000, not:'Depreciation area **32** → ledger 2L' },
          { hesap:'257', ad:'Accumulated depreciation', alacak:150000 },
        ],
        not:'Useful life of 8 years under IFRS → 1,200,000 / 8 = **150,000 TRY**.\n\n' +
             '**The same {{AFAB}} run** produced both postings — the user didn\'t run it twice. Each ' +
             '{{amortisman-alani}} wrote to its own ledger.\n\n' +
             'Annual difference: 150,000 − 120,000 = **30,000 TRY**.' },

      { baslik:'Step 3 — IFRS 16 lease · **only in the IFRS ledger**',
        belgeTuru:'SA', tarih:'01.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'264', ad:'Right-of-use asset', borc:800000, not:'{{FB01L}} → ledger group **2L**' },
          { hesap:'438', ad:'Lease liability', alacak:800000 },
        ],
        not:'IFRS 16 puts operating leases **on the balance sheet**. Local law may not.\n\n' +
             'This posting was entered with {{FB01L}} **only into ledger 2L**. This asset and liability ' +
             '**don\'t exist at all** in the leading ledger — it\'s still tracked as rent expense there.\n\n' +
             'Had the ledger group been **left blank**, this posting would also have gone into the local ' +
             'ledger and corrupted the local balance sheet.' },

      { baslik:'Step 4 — The machine is sold at the end of year 3 · the outcome in the leading ledger',
        belgeTuru:'AA', tarih:'31.12.2029', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Bank (sale proceeds)', borc:900000 },
          { hesap:'257', ad:'Accumulated depreciation (3 × 120,000)', borc:360000 },
          { hesap:'253', ad:'Plant, machinery and equipment', alacak:1200000 },
          { hesap:'649', ad:'Gain on disposal of fixed assets', alacak:60000, not:'900,000 − 840,000' },
        ],
        not:'Net book value in the leading ledger: 1,200,000 − 360,000 = **840,000 TRY**. Sold for 900,000, so ' +
             'a **60,000 TRY gain**.' },

      { baslik:'Step 4 (continued) — the same sale · **the outcome in the IFRS ledger**',
        belgeTuru:'AA', tarih:'31.12.2029', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Bank (sale proceeds)', borc:900000 },
          { hesap:'257', ad:'Accumulated depreciation (3 × 150,000)', borc:450000 },
          { hesap:'253', ad:'Plant, machinery and equipment', alacak:1200000 },
          { hesap:'649', ad:'Gain on disposal of fixed assets', alacak:150000, not:'900,000 − 750,000' },
        ],
        not:'Net book value in the IFRS ledger: 1,200,000 − 450,000 = **750,000 TRY**. Sold for the same ' +
             '900,000, so a **150,000 TRY gain**.\n\n' +
             '**The same sale, a 90,000 TRY different gain in the two ledgers.** This isn\'t an error — it\'s ' +
             'the inevitable result of two standards\' different valuation judgments, and it\'s the very reason ' +
             'parallel ledger exists.' },
    ],

    tHesaplar:[
      { hesap:'Accumulated depreciation — **Leading ledger (0L)**', kod:'257 / 0L',
        borc:[{ ad:'Closed out at sale', tutar:360000 }],
        alacak:[{ ad:'3 years × 120,000', tutar:360000 }],
        not:'10 years · local law' },
      { hesap:'Accumulated depreciation — **IFRS ledger (2L)**', kod:'257 / 2L',
        borc:[{ ad:'Closed out at sale', tutar:450000 }],
        alacak:[{ ad:'3 years × 150,000', tutar:450000 }],
        not:'8 years · IFRS — **the same account, a different ledger, a different amount**' },
      { hesap:'Right-of-use asset — 2L only', kod:'264 / 2L',
        borc:[{ ad:'IFRS 16 lease', tutar:800000 }],
        alacak:[],
        not:'This account **never moves** in the leading ledger' },
    ],

    notlar:[
      { tip:'tip', baslik:'The same account, a different ledger, a different balance', metin:
        'Parallel ledger\'s most striking consequence is this: **account 257\'s balance depends on which ' +
        'ledger you\'re looking at.**\n\n' +
        '360,000 TRY in the leading ledger, 450,000 TRY in the IFRS ledger. Both are correct.\n\n' +
        'This runs against the classic accounting habit: the assumption that "an account has one balance" no ' +
        'longer holds. In {{FAGLB03}}, if **the ledger field is left blank**, the leading ledger comes up and ' +
        'the user never sees the IFRS balance at all.\n\n' +
        '**Practical consequence:** in a system with parallel ledger, every report query must ask "which ' +
        'ledger?" It\'s good practice to show the ledger code in the report header — otherwise two different ' +
        'reports get mixed up.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'SAP offers **two approaches** for parallel accounting, and the choice is made at the start of the ' +
      'setup. There are also variants of the ledgers themselves and ways the ledger group is used.',

    liste:[
      { ad:'Parallel Ledger Approach',
        aciklama:'A separate ledger for each standard. The same account has a different balance in each ledger.',
        neZaman:'**The preferred approach.** When there are many differences between the standards.',
        ornek:'0L local, 2L IFRS. A **single** chart of accounts, many ledgers.',
        tcodes:['FINSC_LEDGER','FB01L'] },

      { ad:'Parallel Accounts Approach',
        aciklama:'A single ledger, with **separate account groups** for each standard.',
        neZaman:'When there are few differences; common in older setups.',
        ornek:'Shared accounts + local-only accounts + IFRS-only accounts. **Downside:** the chart of ' +
              'accounts bloats and the financial statement structure gets complicated.' },

      { ad:'{{lider-defter}} (0L)',
        aciklama:'The **single** main ledger in the system, valid for every company code.',
        neZaman:'Always exists — can\'t be removed.',
        ornek:'Uses the company code\'s fiscal year variant and currencies; **the ledger integrated with CO**.' },

      { ad:'Non-Leading Ledger',
        aciklama:'The ledgers defined for the second and subsequent standards.',
        neZaman:'When IFRS, a tax ledger, or group reporting is required.',
        ornek:'2L, 3L… may use a **different fiscal year variant** (for example, if the group calendar differs).' },

      { ad:'{{defter-grubu}}',
        aciklama:'A named set that determines which ledger(s) a posting goes to.',
        neZaman:'When entering a ledger-based posting.',
        ornek:'A group in each ledger\'s own name is created automatically; custom groups spanning multiple ' +
              'ledgers can also be defined.' },

      { ad:'Blank Ledger Group',
        aciklama:'The posting goes to **every ledger**.',
        neZaman:'For 95% of daily transactions — sales, purchases, receipts, payments.',
        ornek:'**This is the default behavior** and it\'s correct: facts are the same under every standard.' },

      { ad:'Ledger-Specific Document',
        aciklama:'A posting written only to a particular ledger.',
        neZaman:'For every posting with a standards-based difference: a depreciation gap, a provision gap, IFRS 16.',
        ornek:'Entered with {{FB01L}} or {{FB50L}}; using a **separate document type** is good practice.',
        tcodes:['FB01L','FB50L'] },

      { ad:'{{amortisman-alani}} ↔ ledger link',
        aciklama:'Each depreciation area is tied to a ledger group; the area writes to that ledger.',
        neZaman:'In fixed asset parallel accounting — the **heaviest use case**.',
        ornek:'Area 01 → 0L (local), area 32 → 2L (IFRS). A single {{AFAB}} run feeds both ledgers.',
        tcodes:['AFAB','OADB'] },
    ],

    karsilastirmaBasliklar:['Parallel Ledger', 'Parallel Accounts'],
    karsilastirma:[
      ['Chart of accounts', '**Single** — stays lean', 'Bloats — separate accounts for each standard'],
      ['The same account\'s balance', '**Varies** by ledger', 'Fixed, since the account name differs'],
      ['Financial statement structure', 'The same structure per ledger', '**A separate structure** needed per standard'],
      ['Adding a new standard', 'Define a new ledger', 'Open dozens of new accounts'],
      ['Reporting', 'By ledger filter', 'By account group filter'],
      ['Fixed asset integration', 'Area ↔ ledger, **clean**', 'Area ↔ account, complex'],
      ['SAP recommendation', '**Preferred**', 'In older setups'],
      ['User error risk', 'The ledger group is forgotten', 'The wrong account is chosen'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FINSC_LEDGER', ad:'Ledger definition — the hub of parallel accounting',
        amac:'Defines the leading and additional ledgers, ledger groups, currencies, and fiscal year variants.',
        neZaman:'During setup; when a new reporting standard is added.',
        adimlar:[
          { baslik:'Define the ledger', aciklama:'A code (2L) and a name (IFRS Ledger). **Only one ledger can ' +
                   'be leading**, and it\'s usually 0L.' },
          { baslik:'Assign to company codes',
            aciklama:'An additional ledger can be opened in **selected company codes** — defined only for ' +
                     'companies that report under IFRS.' },
          { baslik:'Set the fiscal year variant',
            aciklama:'An additional ledger may use a **different variant**; needed if the group calendar differs.' },
          { baslik:'Configure the currencies',
            aciklama:'Up to eight in S/4HANA. **Very hard to add later** — plan it from the start.' },
          { baslik:'Verify the ledger group',
            aciklama:'A group in the same name is created automatically for each ledger.' },
        ],
        ekranAkisi:[
          { ekran:'Ledger list', islem:'0L (leading) · 2L (IFRS)' },
          { ekran:'2L settings', islem:'Company code 1000 · fiscal year variant K4' },
          { ekran:'Currencies', islem:'TRY (local) · EUR (group)' },
          { ekran:'Ledger group', islem:'2L was created automatically' },
        ],
        alanlar:{
          zorunlu:['Ledger code','Ledger name','Company code assignment','Fiscal year variant'],
          opsiyonel:['Additional currencies','Custom ledger groups'] },
        hatalar:[
          { mesaj:'Only one leading ledger is allowed', sebep:'A second ledger has been marked as leading.', cozum:'Only 0L should remain leading; the others are additional ledgers.' },
          { mesaj:'Currency type ... cannot be added after postings exist', sebep:'An attempt to add a currency after postings have already occurred.', cozum:'Currencies must be planned **from the start**; adding one later requires a migration.' },
        ],
        ipucu:'**The currency decision is irreversible.** Adding a new parallel currency once postings have ' +
              'begun requires a migration project. Even if the need for a group currency is uncertain, ' +
              'defining it **up front** is far cheaper than adding it later.',
        ilgili:['FB01L','FAGLL03','T881'] },

      { kod:'FB01L', ad:'Post document — with ledger group',
        amac:'Posts only to a specific ledger; the screen where standards-based differences are entered.',
        neZaman:'For every posting with an IFRS/local difference: a provision gap, IFRS 16, a valuation difference.',
        adimlar:[
          { baslik:'**Enter the ledger group**',
            aciklama:'This field doesn\'t exist in {{FB01}} — it\'s {{FB01L}}\'s only difference. **If left ' +
                     'blank, the posting goes to every ledger.**' },
          { baslik:'Choose the document type',
            aciklama:'Defining a **separate document type** for ledger-based postings is good practice; it ' +
                     'makes reporting separation easier.' },
          { baslik:'Enter the line items' },
          { baslik:'Save and verify',
            aciklama:'Use {{FAGLL03}} to confirm the posting **exists** in the target ledger and **doesn\'t ' +
                     'exist** in the other one.' },
        ],
        alanlar:{
          zorunlu:['Ledger group','Document type','Company code','Line items'],
          opsiyonel:['Reference','Text'] },
        hatalar:[
          { mesaj:'Ledger group ... does not exist', sebep:'The group is undefined or misspelled.', cozum:'Check the ledger groups in {{FINSC_LEDGER}}.' },
          { mesaj:'The posting also went to an unintended ledger', sebep:'The ledger group was **left blank**.', cozum:'Reverse it and re-enter it with the correct group. The most common parallel ledger mistake.' },
        ],
        ipucu:'After posting, run **two checks**: does the posting exist in the target ledger, and is it ' +
              'absent from the other one? Skip the second check and "it went to every ledger" can go ' +
              'unnoticed for months, surfacing as a broken local financial statement at year-end.',
        ilgili:['FB50L','FAGLL03','FINSC_LEDGER'] },

      { kod:'FB50L', ad:'G/L posting — with ledger group',
        amac:'{{FB50}} with the ledger group field added; for quick G/L entries.',
        neZaman:'For ledger-based corrections involving only G/L accounts.',
        adimlar:[
          { baslik:'Enter the ledger group' },
          { baslik:'Enter the account and debit/credit lines', aciklama:'In a single table-layout screen.' },
          { baslik:'Simulate and save' },
        ],
        ipucu:'{{FB01L}} supports every account type (vendor, customer, G/L); {{FB50L}} is G/L-only but ' +
              '**faster**. Since month-end IFRS adjustments usually involve only G/L accounts, {{FB50L}} sees ' +
              'more use in practice.',
        ilgili:['FB01L','FB50','FAGLL03'] },

      { kod:'FAGLB03', ad:'Ledger-based account balance',
        amac:'Shows the same account\'s balance in different ledgers.',
        neZaman:'When measuring a standards difference; on audit requests; during reconciliation checks.',
        adimlar:[
          { baslik:'Enter the account, company code, and fiscal year' },
          { baslik:'**Choose the ledger**', aciklama:'If left blank, the **leading ledger** comes up. Enter ' +
                   '2L to see the IFRS balance.' },
          { baslik:'Compare the two ledgers', aciklama:'The difference is the amount of the standards gap.' },
        ],
        ipucu:'The leading ledger showing up when the ledger field is left blank is a **silent trap**: the ' +
              'user thinks they\'re seeing the IFRS balance, sees the leading ledger\'s balance instead, and ' +
              'produces a wrong report. Make sure the **ledger code shows** in the report output.',
        hatalar:[
          { mesaj:'The expected IFRS difference is not showing', sebep:'The ledger field was blank → the leading ledger came up.', cozum:'Enter 2L in the ledger field and rerun.' },
        ],
        ilgili:['FAGLL03','FS10N'] },

      { kod:'FAGLGVTR', ad:'Balance carryforward — per ledger',
        amac:'Carries balance sheet accounts\' balances into the following year.',
        neZaman:'At year-end, **separately for every ledger**.',
        adimlar:[
          { baslik:'Enter the company code and the carryforward year' },
          { baslik:'**Choose the ledger**', aciklama:'Must be run separately for each ledger.' },
          { baslik:'Run in test mode, then in production mode' },
          { baslik:'Verify the result', aciklama:'Check the opening balances in every ledger with {{FAGLB03}}.' },
        ],
        ipucu:'**The most commonly forgotten step:** the carryforward is run for the leading ledger and the ' +
              'additional ledger is forgotten. Result: opening balances show as zero in the IFRS ledger, and ' +
              'the new year\'s first report comes out completely wrong.\n\n' +
              'The good news: {{FAGLGVTR}} **can be run again** without creating a discrepancy.',
        ilgili:['FAGLB03','closing'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Parallel ledger\'s table architecture rests on a single field: **{{ACDOCA}} `RLDNR`**. Every line ' +
      'carries which ledger it belongs to in this field. There\'s no separate table for ledger separation — ' +
      '**the same table, different rows**.',

    liste:[
      { ad:'ACDOCA', baslik:'Universal Journal — with the ledger field',
        tutar:'Every FI/CO line; each line carries an `RLDNR` (ledger).',
        olusturan:'Every FI/CO document',
        guncelleyen:'Document posting; if the ledger group is blank, **a separate line is written for every ledger**',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{T881}} for the ledger definition; {{BKPF}} for the document header.',
        s4:'Parallel ledger\'s **single data source**.',
        alanlar:[
          { ad:'RLDNR', aciklama:'**Ledger code** — 0L leading, 2L IFRS. The first field of the key.', tip:'pk' },
          { ad:'RACCT', aciklama:'G/L account — the **same** account is used across ledgers' },
          { ad:'HSL', aciklama:'Amount in local currency — can **differ** by ledger' },
          { ad:'BELNR', aciklama:'Document number', tip:'fk' },
          { ad:'DOCLN', aciklama:'Line number' },
        ] },

      { ad:'T881', baslik:'Ledger definitions',
        tutar:'Every ledger in the system and its properties.',
        olusturan:'{{FINSC_LEDGER}}',
        guncelleyen:'{{FINSC_LEDGER}}',
        anahtar:'RLDNR',
        iliskiler:'{{ACDOCA}} `RLDNR` looks up this table.',
        s4:'Managed via {{FINSC_LEDGER}}.',
        alanlar:[
          { ad:'RLDNR', aciklama:'Ledger code', tip:'pk' },
          { ad:'XLEADING', aciklama:'**The leading-ledger flag** — only one in the system' },
        ] },

      { ad:'BKPF', baslik:'Document header',
        tutar:'Document information; for ledger-based postings, the ledger group info sits here too.',
        olusturan:'Document posting',
        s4:'Unchanged.',
        alanlar:[
          { ad:'BELNR', aciklama:'Document number', tip:'pk' },
          { ad:'BLART', aciklama:'Document type — a separate type is recommended for ledger-based postings' },
        ] },

      { ad:'ANLB', baslik:'Fixed asset depreciation areas',
        tutar:'Each asset\'s settings by depreciation area — **the area ↔ ledger bridge**.',
        olusturan:'{{AS01}} (derived from the asset class)',
        guncelleyen:'{{AS02}}',
        anahtar:'BUKRS + ANLN1 + ANLN2 + AFABE',
        iliskiler:'Each area is tied to a ledger group; {{AFAB}} writes according to that mapping.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'AFABE', aciklama:'**Depreciation area** — 01 local, 32 IFRS', tip:'pk' },
          { ad:'AFASL', aciklama:'Depreciation key — can differ by area' },
          { ad:'NDJAR', aciklama:'Useful life (years) — **differs across areas**' },
        ] },

      { ad:'BSEG', baslik:'Document line items',
        tutar:'The entry view. **Doesn\'t carry the ledger split** — which is why it\'s not used for parallel ledger analysis.',
        olusturan:'Document posting',
        s4:'{{uyumluluk-view}}.' },
    ],

    er:{
      type:'er',
      baslik:'Ledger architecture — RLDNR separates everything',
      varliklar:[
        { ad:'T881', rol:'Configuration', aciklama:'Ledger definition',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'XLEADING' }] },
        { ad:'BKPF', rol:'FI', aciklama:'Document header',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'ACDOCA', rol:'Universal', hub:true, aciklama:'**Every line belongs to one ledger**',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'DOCLN', tip:'pk' }, { ad:'RACCT' }, { ad:'HSL' }] },
        { ad:'ANLB', rol:'Fixed assets', aciklama:'Depreciation area settings',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'AFABE', tip:'pk' }, { ad:'NDJAR' }] },
        { ad:'ANLA', rol:'Fixed assets', aciklama:'Asset master data',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'ANLN1', tip:'pk' }] },
        { ad:'BSEG', rol:'Entry view', aciklama:'**No** ledger split',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }] },
      ],
      iliskiler:[
        { from:'T881', to:'ACDOCA', alanlar:'RLDNR', not:'**the ledger split**' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'header → line item' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'the entry view' },
        { from:'ANLA', to:'ANLB', alanlar:'ANLN1', not:'asset → areas' },
        { from:'ANLB', to:'ACDOCA', alanlar:'AFABE → RLDNR', not:'**area → ledger**' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'In parallel ledger, the only difference on user screens is the **ledger group field**. But that single ' +
      'field, if used incorrectly, can corrupt every financial statement.',

    ekranlar:[
      { ad:'{{FINSC_LEDGER}} — ledger definition',
        aciklama:'The central screen where ledgers, groups, and currencies are defined.',
        alanlar:[
          { ad:'Ledger code', zorunlu:true, aciklama:'2 characters. 0L leading, 2L/3L additional ledgers.' },
          { ad:'Leading ledger flag', zorunlu:true, aciklama:'Can be set on **only one ledger**.' },
          { ad:'Company code assignment', zorunlu:true, aciklama:'An additional ledger can be opened in selected company codes.' },
          { ad:'Fiscal year variant', zorunlu:true, aciklama:'An additional ledger may use a **different variant**.' },
          { ad:'Currencies', zorunlu:false, aciklama:'Up to 8 in S/4. **Cannot be added later** — plan it from the start.' },
        ],
        ipucu:'The leading ledger is required to use the **company code\'s** fiscal year variant and is the ' +
              'ledger integrated with CO. Additional ledgers aren\'t bound by these constraints — this ' +
              'flexibility is designed for companies whose group calendar differs.' },

      { ad:'{{FB01L}} / {{FB50L}} — the ledger group field',
        aciklama:'The screen where standards-based differences are entered; its only difference is the ledger group field.',
        alanlar:[
          { ad:'Ledger group', zorunlu:false, aciklama:'**The critical field.** Blank = every ledger. Filled ' +
                   '= only that group. It isn\'t mandatory, and **that\'s where the danger lies**.' },
          { ad:'Document type', zorunlu:true, aciklama:'Define a separate type for ledger-based postings.' },
          { ad:'Line items', zorunlu:true },
        ],
        ipucu:'The ledger group field **not being mandatory** is parallel ledger\'s biggest operational risk: ' +
              'if the user forgets to fill it in, they get no error, and the posting silently goes to every ' +
              'ledger.\n\n' +
              'A practical fix: define a separate document type for ledger-based postings and set that ' +
              'type\'s default ledger group; also review that document type\'s postings at month-end.' },

      { ad:'{{FAGLB03}} / {{FAGLL03}} — the ledger selection',
        aciklama:'The ledger filter on reports; where parallel ledger becomes visible.',
        alanlar:[
          { ad:'Ledger', zorunlu:false, aciklama:'**If left blank, the leading ledger comes up.** Enter 2L for an IFRS report.' },
          { ad:'Account / company code', zorunlu:true },
          { ad:'Period', zorunlu:true },
        ],
        ipucu:'The **ledger code must be made visible** in the report output. Otherwise two reports pulled ' +
              'from different ledgers get confused, and the panic of "the same account has two different ' +
              'balances" follows.' },
    ],

    zorunlu:['Ledger code','Leading ledger flag','Company code assignment','Fiscal year variant','Document type'],
    opsiyonel:['Ledger group (on the posting)','Additional currencies','Custom ledger groups'],

    hatalar:[
      { mesaj:'The posting also went to an unintended ledger', sebep:'The ledger group was **left blank** → it was written to every ledger.', cozum:'Reverse it ({{FB08}}), re-enter it with the correct group. **The most common parallel ledger mistake**, and it raises no error message.' },
      { mesaj:'Ledger group ... does not exist', sebep:'The group is undefined or misspelled.', cozum:'Check the ledger groups in {{FINSC_LEDGER}}.' },
      { mesaj:'Opening balances are zero in the IFRS ledger', sebep:'{{FAGLGVTR}} was run only for the leading ledger.', cozum:'Run it separately for every ledger. It can be rerun without creating a discrepancy.' },
      { mesaj:'Currency type cannot be added after postings exist', sebep:'A currency is being added after postings have begun.', cozum:'A migration is required. Currencies must be planned **from the start**.' },
      { mesaj:'Depreciation is not posting to the IFRS ledger', sebep:'The {{amortisman-alani}} is not linked to a ledger group.', cozum:'Define the area ↔ ledger group mapping with {{OADB}}.' },
      { mesaj:'Only one leading ledger is allowed', sebep:'A second ledger has been marked leading.', cozum:'Only 0L should remain leading.' },
    ],

    ipuclari:[
      '**Define a separate document type for ledger-based postings.** It separates cleanly in reports, is ' +
      'controllable, and makes an "accidentally went to every ledger" mistake easy to catch.',
      'After every ledger-based posting, run **two checks**: is it in the target ledger, and is it absent from the others?',
      'Run {{FAGLGVTR}} balance carryforward **for every ledger** — the most commonly forgotten closing step.',
      'Plan currencies **from the start**; adding one later is a migration project.',
      'Make sure the ledger code is visible in the report output so two reports don\'t get mixed up.',
      'Test the {{amortisman-alani}} ↔ ledger mapping in fixed assets during setup — confirm that a single ' +
      '{{AFAB}} run really writes to **both ledgers**.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'ACDOCA', ne:'Every line carries `RLDNR`; if the ledger group is blank, **a separate line for every ledger**' },
      { tablo:'BKPF', ne:'Document header — shared' },
      { tablo:'BSEG', ne:'Entry view — **no ledger split**' },
      { tablo:'T881', ne:'Ledger definitions' },
      { tablo:'ANLB', ne:'Depreciation area settings — the area ↔ ledger bridge' },
      { tablo:'FAGLFLEXA', ne:'Ledger-based line items in ECC' },
    ],

    commit:
      'On a posting with a blank ledger group, the system writes **a separate line for every ledger** — but ' +
      '**within a single LUW**. So in a system with 2 ledgers, a 3-line document produces 6 lines in ' +
      '{{ACDOCA}}, and all of them are written in the same commit.\n\n' +
      'This guarantees data consistency: a posting existing in one ledger and not the other is **technically ' +
      'impossible**.\n\n' +
      'The document number is shared; there\'s **no** numbering gap between ledgers. This matters for ' +
      'reconciliation and traceability: the same document number can be looked up in every ledger.',

    belgeNo:
      'Ledgers **share the same document number**. A separate number range isn\'t needed.\n\n' +
      'However, defining a **separate document type** — and hence a separate number range — for ledger-based ' +
      'postings ({{FB01L}}) is a common and recommended practice: it lets "which postings were entered ' +
      'ledger-based?" be answered instantly with a document type filter.',

    postingLogic:
      'At posting time, ledger assignment is determined in this order:\n\n' +
      '**1.** Is the ledger group **filled**? If so, it\'s written only to the ledgers in that group.\n' +
      '**2.** If the ledger group is **blank** → it\'s written to **every** ledger assigned to the company code.\n' +
      '**3.** For fixed asset postings ({{AFAB}}), each {{amortisman-alani}} writes to its own ledger group — ' +
      'the user doesn\'t choose a ledger, the mapping comes from the master data.\n' +
      '**4.** CO-originated postings go **only to the leading ledger** (CO works with a single standard).\n\n' +
      'Point 4\'s consequence matters: cost center allocations, internal order settlements, and other CO ' +
      'transactions are **not visible** in the IFRS ledger. If there\'s an IFRS-side need, a ledger-based ' +
      'posting must be entered separately.',

    belgeTuru:
      'The document type doesn\'t determine the ledger, but it\'s **a good classification tool**. Defining a ' +
      'separate type (for example, `ZI` = IFRS adjustment) for ledger-based postings gives you:\n\n' +
      '**a)** Easy filtering in reports.\n' +
      '**b)** Authorization can be restricted by this type.\n' +
      '**c)** A single query answers "which IFRS adjustments were made this month?" at month-end.\n\n' +
      'This is an optional but **consulting-quality** design choice.',

    numberRange:
      'A separate range per ledger isn\'t needed. If a ledger-based document type is defined, its range is ' +
      'opened via {{FBN1}}. Opening every range at the start of the year is part of the standard closing routine.',

    accountDetermination:
      'Parallel ledger has no account determination of its own — **the same accounts** are used. The ' +
      'difference lies not in the accounts but in the **amounts**.\n\n' +
      'The exception is fixed assets: **different accounts** can be defined by depreciation area via ' +
      '{{AO90}}. But this generally isn\'t preferred — using the same account and separating by ledger is ' +
      'cleaner, and keeps the financial statement structure uniform.',

    tur:
      '**Configuration:** ledger definitions, ledger groups, fiscal year variant assignments, depreciation ' +
      'area ↔ ledger mappings, document types.\n\n' +
      '**Master data:** the area-specific settings in asset master data ({{ANLB}} — useful life, ' +
      'depreciation key).\n\n' +
      '**Transaction data:** {{ACDOCA}} lines (separated by `RLDNR`).',

    transport:
      'Ledger definitions transport. **Two critical warnings:**\n\n' +
      '**1.** Company code assignments may differ in the target system — an additional ledger may **not be ' +
      'open** in some company codes on the production system.\n\n' +
      '**2. Currency settings cannot be changed once postings have begun.** A currency added on the test ' +
      'system may **not be addable** on production. This is a constraint transport can\'t solve — it\'s a ' +
      'planning problem.\n\n' +
      'Depreciation area ↔ ledger mappings also transport, but they must be verified against the asset class ' +
      'settings on the target system for consistency.',

    img:[
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Ledgers → Ledger → Define Ledgers', not:'{{FINSC_LEDGER}} → {{T881}}' },
      { yol:'SPRO → … → Ledgers → Ledger → Define Ledger Group', not:'{{defter-grubu}}' },
      { yol:'SPRO → … → Ledgers → Fiscal Year and Posting Periods → Assign Variants to Ledgers', not:'An additional ledger can use a different variant' },
      { yol:'SPRO → Financial Accounting → Asset Accounting → Valuation → Depreciation Areas → Assign Ledger Groups to Depreciation Areas', not:'{{OADB}} — **the AA ↔ parallel ledger bridge**' },
    ],

    ekstra:[
      { ic:'🏭', baslik:'Fixed assets: parallel ledger\'s heaviest use case', metin:
        'Parallel ledger\'s biggest real-world burden falls on **fixed assets**, and the reason is simple: ' +
        'depreciation differences repeat **every month, for every asset**.\n\n' +
        'A provision difference is entered once a year. An IFRS 16 posting, once per contract. But in a ' +
        'company with 2,000 assets, the depreciation difference recurs **2,000 times a month**.\n\n' +
        'SAP solves this elegantly: each {{amortisman-alani}} is tied to a ledger group ({{OADB}}), and a ' +
        '**single {{AFAB}} run** feeds both ledgers. The user doesn\'t choose a ledger, doesn\'t run it twice.\n\n' +
        'Area 01 → the leading ledger (local, 10 years), area 32 → the IFRS ledger (8 years). The asset master ' +
        'record defines a separate useful life and depreciation key for each area.\n\n' +
        '**What must absolutely be tested during setup:** that a single {{AFAB}} run really writes to both ' +
        'ledgers. If the mapping is missing, depreciation goes only to the leading ledger and the IFRS ledger ' +
        '**stays incomplete for months**.' },

      { ic:'⚠️', baslik:'CO works only with the leading ledger', metin:
        'Controlling (CO) works with a single standard, and that\'s the **leading ledger**.\n\n' +
        'The practical consequences:\n\n' +
        '**a)** Cost center allocations, internal order settlements, and CO value transfers are **not ' +
        'visible** in the IFRS ledger.\n\n' +
        '**b)** If a costing difference is needed on the IFRS side, it must be entered by hand via a ' +
        'ledger-based posting ({{FB50L}}).\n\n' +
        '**c)** Profitability analysis (CO-PA) works on the leading ledger\'s logic; IFRS profitability must ' +
        'be calculated separately.\n\n' +
        'This is parallel ledger\'s **known and accepted limitation**. In most companies costing differences ' +
        'are negligible so this doesn\'t cause problems — but if IFRS and local costing rules differ ' +
        'significantly, it\'s something that needs to be discussed early in the project.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Balance carryforward is run separately for each ledger', metin:
        '{{FAGLGVTR}} only carries forward the ledger it was run for. If it\'s run for the leading ledger and ' +
        'the additional ledger is forgotten, **opening balances show as zero** in the IFRS ledger.\n\n' +
        'Result: the new year\'s first IFRS report comes out completely wrong, and it\'s usually caught by ' +
        'the question "why is the IFRS balance sheet so small?"\n\n' +
        'The good news: {{FAGLGVTR}} **can be rerun**; no discrepancy results, only the missing carryforward ' +
        'is completed. So it\'s enough to put running it for every ledger on the closing checklist at the ' +
        'start of the year.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The parallel ledger logic **hasn\'t changed** in S/4HANA, but implementing it got easier: ' +
      '{{FINSC_LEDGER}} became the single management point, ledger separation moved into {{ACDOCA}}\'s key ' +
      'field, and parallel currency support went from 3 to **8**.',

    eccFarklari:[
      { konu:'Ledger definition', ecc:'Several separate transactions', s4:'**{{FINSC_LEDGER}}** — a single point' },
      { konu:'Ledger data', ecc:'{{FAGLFLEXA}} `RLDNR`', s4:'**{{ACDOCA}}** `RLDNR` — the first field of the key' },
      { konu:'Parallel currencies', ecc:'3 currencies', s4:'**Up to 8**' },
      { konu:'Ledger-based posting', ecc:'{{FB01L}}', s4:'The same + Fiori' },
      { konu:'Fixed asset integration', ecc:'Area ↔ ledger group', s4:'**The same**, but the area-count limit loosened' },
      { konu:'Extension ledger', ecc:'Doesn\'t exist', s4:'**Extension Ledger** — a lightweight ledger holding only the differences' },
    ],

    universalJournal:
      'In {{ACDOCA}}, `RLDNR` is **the first field of the key**. This is a deliberate design choice, and its ' +
      'consequence is that ledger-based queries are extremely fast, because the data is physically separated ' +
      'by ledger.\n\n' +
      'In ECC, ledger separation existed in {{FAGLFLEXA}}, but CO data sat in a separate table. In S/4HANA, ' +
      'since FI and CO are in the same table, **the ledger dimension also covers CO data** — but CO postings ' +
      'still write only to the leading ledger (this is a logical constraint, not a technical one).',

    kalkanTcodes:[
      { eski:'ECC ledger-definition transactions', yeni:'{{FINSC_LEDGER}}', not:'A single management point' },
      { eski:'—', yeni:'—', not:'{{FB01L}}, {{FB50L}}, {{FAGLL03}}, {{FAGLB03}} were **not removed**' },
    ],

    fiori:[
      { ad:'Manage Ledgers', aciklama:'Views and manages ledger definitions.' },
      { ad:'Post General Journal Entries', aciklama:'In place of {{FB50L}}; includes the ledger group field.' },
      { ad:'Display Line Items in General Ledger', aciklama:'A ledger-filtered line item report.' },
      { ad:'Trial Balance', aciklama:'A ledger-based trial balance — two standards side by side.' },
      { ad:'Asset Accounting Overview', aciklama:'Shows the depreciation area ↔ ledger mapping visually.' },
    ],

    compatibilityViews:[
      '{{FAGLFLEXA}} — a view derived from {{ACDOCA}}.',
      '{{BSEG}} — **doesn\'t carry** the ledger split; can\'t be used for parallel ledger analysis.',
      'Ledger-based reports should read {{ACDOCA}} directly.',
    ],

    performans:
      'Ledger-based queries are very fast thanks to {{ACDOCA}}\'s key structure. The real gain is being able ' +
      'to report two ledgers **side by side**: in ECC, two separate reports were pulled and compared in ' +
      'Excel; in S/4HANA a single query returns both ledgers as columns and the difference shows instantly.',

    bestPractices:[
      '**Evaluate the Extension Ledger:** a lightweight ledger holding only the differences, producing less ' +
      'data than a full additional ledger and ideal for simulation scenarios.',
      'Replan currencies during the migration — S/4 supports up to eight, and **this is a decision that can\'t ' +
      'be changed later**.',
      'Define a separate document type for ledger-based postings; filtering becomes easier in Fiori.',
      '**Test** the area ↔ ledger mapping in fixed assets during the migration; confirm that a single ' +
      '{{AFAB}} writes to both ledgers.',
      'Clarify early in the project that CO works only with the leading ledger; design a manual process if an ' +
      'IFRS costing difference is needed.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'The IFRS ledger stayed incomplete for six months: a single mapping was forgotten',
    hikaye:
      '**Batı Sanayi Inc.** moved to IFRS reporting at the start of 2027. The IFRS ledger (2L) was defined, ' +
      'opening balances were entered, the team was trained.\n\n' +
      'In July, the first IFRS interim report is being prepared and the CFO notices something odd: **the ' +
      'depreciation expense in the IFRS ledger is zero**. Yet the company has 1,850 fixed assets, and ' +
      '4,200,000 TRY of depreciation for the first six months has been recorded in the leading ledger.\n\n' +
      'This scenario shows parallel ledger\'s sneakiest setup mistake, and why the fix isn\'t as simple as it seems.',
    veriler:[
      { k:'Company code', v:'1000 · TRY' },
      { k:'Ledgers', v:'**0L** leading (local) · **2L** IFRS' },
      { k:'Number of assets', v:'1,850' },
      { k:'Leading ledger depreciation (6 months)', v:'4,200,000 TRY' },
      { k:'**IFRS ledger depreciation**', v:'**0 TRY**' },
      { k:'Expected IFRS depreciation', v:'~5,100,000 TRY (shorter useful lives)' },
    ],

    adimlar:[
      { baslik:'The problem is confirmed — is it really zero?', tcode:'FAGLB03',
        aciklama:'First, it\'s confirmed the report is being read correctly. (If the ledger field is left ' +
                 'blank, the leading ledger comes up and a false alarm results.)',
        girdi:[
          { alan:'Account', deger:'770100 Depreciation expense' },
          { alan:'Ledger **0L**', deger:'4,200,000 TRY ✓' },
          { alan:'Ledger **2L**', deger:'**0 TRY** ' },
          { alan:'Check', deger:'The ledger field was deliberately set to 2L — **no** reading error' },
        ],
        not:'The first step is always this: **is the report being read correctly?** In {{FAGLB03}}, if the ' +
             'ledger field is left blank, the leading ledger comes up and the user thinks they\'re seeing the ' +
             'IFRS balance. That trap wasn\'t fallen into here.' },

      { baslik:'Are there other postings in the IFRS ledger?', tcode:'FAGLL03',
        aciklama:'It\'s checked whether the ledger is entirely empty or only depreciation is missing.',
        girdi:[
          { alan:'Ledger 2L — sales/purchase postings', deger:'**Present** ✓ — all six months of invoices' },
          { alan:'Ledger 2L — opening balances', deger:'**Present** ✓' },
          { alan:'Ledger 2L — depreciation', deger:'**Missing** ' },
          { alan:'Inference', deger:'The ledger is working; the problem is **only on the fixed asset side**' },
        ],
        not:'This split narrows the diagnosis: the ledger definition is correct, postings flow in, and normal ' +
             'transactions with a blank ledger group go to both ledgers.\n\n' +
             'What\'s missing is **only postings coming from {{AFAB}}** — so the problem lies in the ' +
             '{{amortisman-alani}} ↔ ledger mapping.' },

      { baslik:'The depreciation areas are examined', tcode:'OADB',
        aciklama:'The area ↔ ledger group mapping is checked.',
        girdi:[
          { alan:'Area **01** (local)', deger:'Ledger group **0L** ✓' },
          { alan:'Area **32** (IFRS)', deger:'Ledger group **BLANK** ' },
          { alan:'Area 32 status', deger:'Defined, present on assets, its values are calculating' },
          { alan:'**Root cause**', deger:'Area 32 isn\'t **linked** to any ledger' },
        ],
        not:'**Root cause found.** Area 32 is defined in the setup, added to the asset classes, and its ' +
             'values (with shorter useful lives) are calculating properly — but it\'s **writing to no ledger ' +
             'at all**.\n\n' +
             'This is parallel ledger setup\'s sneakiest mistake: everything looks right, area 32\'s values ' +
             'show up in {{AS03}}, its depreciation schedule is correct in {{AW01N}} — but it never reaches ' +
             'accounting.' },

      { baslik:'The missing mapping is defined', tcode:'OADB',
        aciklama:'Area 32 is linked to the IFRS ledger group.',
        girdi:[
          { alan:'Area 32', deger:'Ledger group → **2L**' },
          { alan:'Test', deger:'{{AFAB}} was run in test mode for one asset' },
          { alan:'Result', deger:'Area 01 → 0L, area 32 → **2L** ✓' },
        ],
        not:'The configuration fix took **two minutes**. But the real work starts now: what about the past ' +
             'six months?' },

      { baslik:'A retroactive fix — three options are weighed', tcode:'AFAB',
        aciklama:'A decision is made on how to make up the six months of missing depreciation.',
        girdi:[
          { alan:'Option 1', deger:'Run {{AFAB}} from January onward in **repeat mode**' },
          { alan:'Option 2', deger:'Post a **single catch-up** entry in July' },
          { alan:'Option 3', deger:'Enter it by hand month by month with {{FB50L}}' },
          { alan:'**Chosen**', deger:'**Option 1** — the periods are open, {{AFAB}} can be repeated' },
        ],
        not:'The January–June periods were still **open** for the IFRS ledger (only the leading ledger had ' +
             'been closed). This was possible because {{OB52}} allows period control on a per-ledger basis, ' +
             'not by luck.\n\n' +
             'Had the periods been closed, Option 2 would have been chosen and six months of depreciation ' +
             'would have been crammed into a single July posting — technically correct, but the monthly IFRS ' +
             'income statement would look **completely broken**.' },

      { baslik:'Depreciation is run retroactively', tcode:'AFAB',
        aciklama:'It\'s rerun for each period from January through June.',
        girdi:[
          { alan:'Periods', deger:'01–06 / 2027 · ledger 2L' },
          { alan:'Mode', deger:'Repeat · **test mode first**' },
          { alan:'Assets affected', deger:'1,850' },
          { alan:'Total posted', deger:'**5,130,000 TRY**' },
        ],
        fis:{ baslik:'January 2027 depreciation — IFRS ledger (2L)', belgeTuru:'AF', tarih:'31.01.2027',
          satirlar:[
            { hesap:'770', ad:'Depreciation expense', borc:855000, not:'Area 32 → ledger **2L**' },
            { hesap:'257', ad:'Accumulated depreciation', alacak:855000 },
          ], not:'The posting date is **January** — not July. Each month was written to its own period, so ' +
                 'the monthly IFRS income statement came out correctly.\n\n' +
                 '700,000 TRY was posted for the same month in the leading ledger; 855,000 TRY in IFRS — a ' +
                 '**155,000 TRY/month** difference, from the shorter useful lives.' },
        tabloEtkisi:[
          { tablo:'ACDOCA', ne:'`RLDNR` = **2L** lines for 6 periods × 1,850 assets' },
          { tablo:'ANLC', ne:'Area 32\'s accumulated depreciation values were updated' },
        ],
        not:'A total of **5,130,000 TRY**, in line with the expected ~5,100,000 TRY. The gap against the ' +
             'leading ledger: 5,130,000 − 4,200,000 = **930,000 TRY** — six months\' worth of the IFRS/local ' +
             'depreciation difference.' },

      { baslik:'Verification — the two ledgers are compared', tcode:'FAGLB03',
        aciklama:'It\'s confirmed the fix worked correctly.',
        girdi:[
          { alan:'770100 · ledger **0L**', deger:'4,200,000 TRY' },
          { alan:'770100 · ledger **2L**', deger:'**5,130,000 TRY** ✓' },
          { alan:'Difference', deger:'930,000 TRY — accounted for' },
          { alan:'257 accumulated depreciation', deger:'0L: 4,200,000 · 2L: 5,130,000 ✓' },
        ],
        not:'The same account, two different balances in the two ledgers — **and both are correct**. The ' +
             'difference is the inevitable result of the useful-life gap and is **explainable** to an auditor.' },

      { baslik:'Prevention — the setup checklist is updated', tcode:'OADB',
        aciklama:'A permanent measure is put in place so the same mistake doesn\'t recur.',
        girdi:[
          { alan:'Measure 1', deger:'**A mandatory step** for every new depreciation area: assign a ledger group' },
          { alan:'Measure 2', deger:'Setup test: run a single {{AFAB}} and check **both ledgers**' },
          { alan:'Measure 3', deger:'A "is the IFRS ledger\'s depreciation zero?" check added to monthly closing' },
          { alan:'Measure 4', deger:'{{FAGLGVTR}} balance carryforward **for every ledger** added to the closing checklist' },
        ],
        not:'The fourth measure prevents an error of **the same class** that hasn\'t happened yet: if the ' +
             'balance carryforward is run for the leading ledger and the additional ledger is forgotten, the ' +
             'new year\'s IFRS opening balances come out zero. Two errors with the same root cause, closed ' +
             'with a single checklist item.' },
    ],

    sonuc:
      '**There was no depreciation in the IFRS ledger for six months** — and no error message ever appeared.\n\n' +
      '**Four key lessons:**\n\n' +
      '**1. The depreciation area ↔ ledger mapping is parallel ledger\'s most critical and most silent ' +
      'setting.** If the area is defined, appears on assets, and its values calculate correctly, everything ' +
      'looks right. But if it isn\'t assigned a ledger group, it **never reaches accounting**. Running a ' +
      'single {{AFAB}} and checking **both ledgers** during setup testing is mandatory.\n\n' +
      '**2. Verify the ledger field before reading a report.** In {{FAGLB03}} and {{FAGLL03}}, leaving the ' +
      'ledger blank brings up the **leading ledger**. That can mean either a false alarm or a real problem ' +
      'going unnoticed. In a system with parallel ledger, the first question for every report query should be ' +
      '"which ledger?"\n\n' +
      '**3. Managing periods per ledger gives correction flexibility.** In this scenario, the leading ledger ' +
      'was closed but the IFRS ledger stayed open, so {{AFAB}} could be repeated retroactively and each month ' +
      'was written to **its own period**. Had the periods been closed, six months of depreciation would have ' +
      'been crammed into a single month, making the monthly IFRS income statement unusable.\n\n' +
      '**4. It\'s normal for the same account to have two balances in two ledgers.** Account 770100 shows ' +
      '4,200,000 in the leading ledger and 5,130,000 TRY in the IFRS ledger — both correct. The classic "an ' +
      'account has one balance" habit doesn\'t hold in a system with parallel ledger, and that\'s the first ' +
      'thing that needs to be **taught to the team during setup**.',
  },

  },
});
