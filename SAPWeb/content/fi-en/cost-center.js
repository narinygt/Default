/* ==========================================================================
   content/fi-en/cost-center.js — English body for "Cost Center Integration"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'cost-center',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Cost center integration means **a single expense posting is written to an account in FI and to ' +
      'a cost center in CO at the same time**.\n\n' +
      'The user enters a 50,000 TRY expense to account 770 with {{FB50}} and writes 4200 (Marketing) into the ' +
      '**cost center** field. One posting answers two questions:\n\n' +
      '**The FI question:** "What kind of expense?" → 770 General administrative expense\n' +
      '**The CO question:** "Who spent it?" → the Marketing department\n\n' +
      'What creates the link is the **{{masraf-turu}}** (cost element) concept: a G/L account\'s counterpart ' +
      'on the CO side. If there is no cost element, the account **never flows into CO at all**; if there is a ' +
      'cost element but no CO object is entered, **the document cannot be posted**.\n\n' +
      'In S/4HANA this split has largely disappeared: the cost element is now a **property** of the G/L ' +
      'account, and the data is held in a single line in {{ACDOCA}}.',

    neden:
      '**Responsibility accounting.** "12 million TRY of expense this month" isn\'t manageable information; ' +
      '"Marketing 2.1 million, Production 6.4 million" is.\n\n' +
      '**Budget control.** A plan-vs-actual comparison is only meaningful at the cost-center level.\n\n' +
      '**Cost distribution.** Shared expenses (rent, electricity, management) become distributable to the ' +
      'production units.\n\n' +
      '**Product costing.** Production cost centers\' expenses flow into products through activity rates.\n\n' +
      '**Profit center derivation.** A cost center is linked to a {{kar-merkezi}}; the profit center on the FI ' +
      'posting comes from this chain.',

    sirketOnemi:
      'Cost center is **the busiest bridge between FI and CO**. A company posts thousands of expense ' +
      'entries a day, and this bridge runs on every single one.\n\n' +
      'What matters for a consultant is this: **cost center errors don\'t change the expense amount.** The ' +
      'trial balance is correct, the income statement is correct — but the management report is wrong. ' +
      'Marketing\'s expense gets posted to Production and nobody notices, because **the total is the same**.\n\n' +
      'The telling question is: **"How do you fix an expense that landed on the wrong cost center?"** The ' +
      'right answer: **move it within CO with {{KB11N}}**, don\'t reverse the FI document. Because the FI ' +
      'side is correct — only the CO object is wrong. A reversal creates two unnecessary documents and dirties ' +
      'the trial balance.',

    gercekHayat:
      'A production company receives an electricity bill: 340,000 TRY.\n\n' +
      'The accounting entry is simple: debit account 770, credit account 320 (vendor). But what goes in the ' +
      '"cost center" field?\n\n' +
      'It\'s a single invoice — the electricity serves the whole plant. Production, the warehouse, the office, ' +
      'and the cafeteria are all fed from the same meter.\n\n' +
      'There are two approaches:\n\n' +
      '**a)** Post the invoice to a **technical cost center** (say, 9900 General Facilities), then distribute ' +
      'it by floor area at month-end with {{KSV5}}.\n\n' +
      '**b)** **Split the invoice into four lines** at entry time and put a different cost center on each line.\n\n' +
      '(a) is preferred: the distribution ratio is defined once and runs automatically every month. (b) ' +
      'requires a manual calculation for every invoice and produces inconsistency.\n\n' +
      '**This is the essence of cost center design:** where an expense *lands* and where it *belongs* are ' +
      'different questions; the second one is solved by distribution.',

    muhasebeMantigi:
      'The accounting logic of a cost center rests on one principle: **FI records "what was spent," CO ' +
      'records "who spent it."**\n\n' +
      'Both questions are part of the same event and share **the same amount** — so this isn\'t a separate ' +
      'posting, it\'s two dimensions of the same posting.\n\n' +
      'The critical point: **a cost center is only meaningful on income statement accounts.** Balance sheet ' +
      'accounts (vendors, banks, inventory) carry no cost center — because an asset or a liability isn\'t ' +
      '"spent."\n\n' +
      'That\'s why, on an invoice posting, only the **expense line** asks for a cost center; the vendor and ' +
      'VAT lines don\'t. (If {{belge-bolme}} is active, those lines also get a profit center assigned — but ' +
      'that\'s a different mechanism — see {{new-gl}}.)\n\n' +
      'The second principle: **movements within CO don\'t affect FI.** Moving an expense from one cost ' +
      'center to another with {{KB11N}} makes **no change whatsoever** to the trial balance — the total ' +
      'expense stays the same.',

    kavramlar: ['maliyet-yeri', 'masraf-turu', 'kar-merkezi', 'kontrol-alani', 'ic-siparis'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The cost center process has two layers: **daily posting** (automatic on every expense transaction) ' +
      'and **period-end distribution** (allocating shared expenses to their real owners).',

    roller:[
      { rol:'CO consultant', gorev:'Designs the cost center hierarchy and the {{OKB9}} default assignments.' },
      { rol:'Accounting user', gorev:'Enters the cost center when posting an expense — **or the system derives it**.' },
      { rol:'Cost center owner', gorev:'Monitors their unit\'s expenses ({{KSB1}}) and explains budget variances.' },
      { rol:'CO accounting', gorev:'Corrects wrong assignments with {{KB11N}}; runs the month-end distribution ({{KSV5}}).' },
      { rol:'Controller', gorev:'Performs the plan-vs-actual comparison ({{S_ALR_87013611}}).' },
    ],

    diyagram:{
      type:'flow',
      baslik:'From expense posting to management report',
      adimlar:[
        { ic:'🏗️', rol:'CO consultant', baslik:'The cost center is created ({{KS01}})',
          aciklama:'Controlling area, validity period, owner, and the **{{kar-merkezi}} assignment**. ' +
                   'The profit center assignment also flows into the FI posting.',
          cikti:'Cost center master data', ok:'the account is prepared' },
        { ic:'🔗', rol:'CO consultant', baslik:'The cost element is defined ({{KA01}})',
          aciklama:'The CO counterpart of the G/L account. **Without it, the account never flows into CO at ' +
                   'all.** In S/4HANA this is a property of the account.',
          cikti:'Cost element', ok:'ready for use' },
        { ic:'🧾', rol:'User', baslik:'The expense is posted ({{FB50}} / {{FB60}})',
          aciklama:'A cost center is entered on the expense line. If not, the **{{OKB9}} default** kicks in; ' +
                   'if that\'s missing too, **the document cannot be posted**.',
          cikti:'FI + CO posting', ok:'simultaneous' },
        { ic:'⚡', rol:'System', baslik:'FI and CO are written **at the same time**',
          aciklama:'In ECC: {{BSEG}} + COEP (two tables). In S/4HANA: **a single line in {{ACDOCA}}**. No ' +
                   'reconciliation is needed.',
          cikti:'Integrated posting', ok:'month-end' },
        { ic:'📊', rol:'Owner', baslik:'Expenses are monitored ({{KSB1}})',
          aciklama:'The cost center owner sees their own line items and can double-click through to the FI document.',
          cikti:'Unit expense report', ok:'shared expenses' },
        { ic:'🔀', rol:'CO accounting', baslik:'Distribution is run ({{KSV5}} / {{KSU5}})',
          aciklama:'Shared expenses (rent, electricity, management) are allocated to their real owners. ' +
                   '**Doesn\'t affect FI** — the total expense stays the same.',
          cikti:'Distributed cost', ok:'reporting' },
        { ic:'📈', rol:'Controller', baslik:'Plan vs. actual is compared',
          aciklama:'The budget variance is analyzed with {{S_ALR_87013611}}.',
          cikti:'Management report' },
      ],
    },

    adimlar:[
      { rol:'CO consultant', eylem:'Creates the cost center', sistem:'{{KS01}} → {{CSKS}}' },
      { rol:'CO consultant', eylem:'Defines the cost element', sistem:'{{KA01}} → {{CSKB}}' },
      { rol:'CO consultant', eylem:'Defines the default assignment', sistem:'{{OKB9}} — reduces user error' },
      { rol:'User', eylem:'Posts the expense with a cost center', sistem:'{{FB50}} / {{FB60}} / {{MIRO}}' },
      { rol:'System', eylem:'Writes FI + CO simultaneously', sistem:'{{ACDOCA}} single line (S/4)' },
      { rol:'Owner', eylem:'Monitors expenses', sistem:'{{KSB1}}' },
      { rol:'CO accounting', eylem:'Corrects the wrong assignment', sistem:'{{KB11N}} — **no FI document is created**' },
      { rol:'CO accounting', eylem:'Distributes the shared expense', sistem:'{{KSV5}} assessment · {{KSU5}} distribution' },
      { rol:'Controller', eylem:'Compares plan vs. actual', sistem:'{{S_ALR_87013611}}' },
    ],

    veriAkisi:{
      nereden:'The G/L account and cost element ({{CSKB}}), cost center master data ({{CSKS}}), default ' +
              'assignments ({{OKB9}}), the cost center entered by the user.',
      nereye:'{{ACDOCA}}\'s `KOSTL` and `PRCTR` fields (S/4); also COEP in ECC; cost center reports.',
      tetikleyen:'Every posting to an account that has a cost element.',
      sonraki:'Distribution, plan-vs-actual analysis, product costing.',
    },

    notlar:[
      { tip:'tip', baslik:'The profit center is derived from the cost center', metin:
        'On an expense posting the user enters only the **cost center**. The {{kar-merkezi}} field fills in ' +
        'automatically.\n\n' +
        'The chain works like this: a profit center is defined on the cost center master record ({{CSKS}} ' +
        '`PRCTR`). At posting time the system reads this link and writes the profit center onto the line.\n\n' +
        'Practical consequences:\n\n' +
        '**a)** If the cost center\'s profit center changes, **new postings** go to the new profit center; ' +
        'past postings don\'t change.\n\n' +
        '**b)** If {{belge-bolme}} is active, the vendor and VAT lines are split in proportion to this profit ' +
        'center — meaning **the choice of cost center also affects the balance-sheet split**.\n\n' +
        '**c)** If no profit center is assigned to the cost center, the document can\'t be posted (if document ' +
        'splitting is active) or the profit center is left blank.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The accounting effect of a cost center is **zero on the FI side** — the expense amount and account ' +
      'don\'t change. What changes is **the dimension the posting carries**. The postings below illustrate ' +
      'this distinction.',

    etkilenenHesaplar:[
      { hesap:'770 / 760 / 750 Expense accounts', tur:'Income statement', neden:'If a cost element is defined, a CO object is **mandatory**.' },
      { hesap:'320 Trade payables', tur:'Balance sheet — Liability', neden:'**Carries no cost center** — balance sheet accounts aren\'t spent.' },
      { hesap:'191 Deductible VAT', tur:'Balance sheet — Asset', neden:'Carries no cost center.' },
      { hesap:'153 Inventory', tur:'Balance sheet — Asset', neden:'Carries no cost center; inventory is an asset.' },
      { hesap:'Assessment cost element (category 42)', tur:'CO-internal', neden:'A {{KSV5}} assessment collects amounts under this type; **it is not an FI account**.' },
    ],

    fisler:[
      { baslik:'Posting 1 — An expense entry, FI and CO **at the same time**',
        belgeTuru:'KR', tarih:'10.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — **cost center 4200 Marketing**', borc:50000,
            not:'FI: account 770 · CO: cost center 4200' },
          { hesap:'191', ad:'Deductible VAT', borc:10000, not:'**No** cost center' },
          { hesap:'320', ad:'Trade payables', alacak:60000, not:'**No** cost center' },
        ],
        not:'**One posting, two dimensions.** The expense line was written to both account 770 and cost ' +
             'center 4200.\n\nThe vendor and VAT lines carry no cost center — **balance sheet accounts aren\'t ' +
             'spent**.\n\nIn S/4HANA these three lines sit in {{ACDOCA}}, and the first line\'s `KOSTL` field ' +
             'is populated. In ECC a CO record would also be written to COEP.' },

      { baslik:'Posting 2 — The wrong cost center: FI correct, CO wrong',
        belgeTuru:'KR', tarih:'12.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Advertising expense — **cost center 3100 Production**', borc:180000,
            not:'FI **correct**, CO **wrong** — should have been Marketing' },
          { hesap:'191', ad:'Deductible VAT', borc:36000 },
          { hesap:'320', ad:'Trade payables', alacak:216000 },
        ],
        not:'**The trial balance is entirely correct:** 180,000 TRY of expense was posted to account 770, ' +
             'the income statement is correct, the VAT is correct, the vendor liability is correct.\n\n' +
             'The only thing wrong is the **CO object**: the advertising expense landed on the Production ' +
             'cost center.\n\n' +
             'Result: Production\'s budget looks blown, Marketing\'s budget looks unused. **No accounting ' +
             'control catches this** — because the total is correct.' },

      { baslik:'Posting 3 — The correction: moved **within CO** with {{KB11N}}',
        belgeTuru:'CO document', tarih:'13.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'CO entry: 3100 Production → 4200 Marketing · 180,000 TRY', borc:0, alacak:0,
            not:'**No FI document is created** — the trial balance doesn\'t change' },
        ],
        not:'{{KB11N}} changes only the **CO object**. 180,000 TRY leaves the Production cost center and ' +
             'enters Marketing.\n\n' +
             '**The FI side is never touched:** account 770\'s balance stays the same, the trial balance ' +
             'doesn\'t change, the income statement doesn\'t change.\n\n' +
             'This is the correct way to fix it. The alternative (reversing with {{FB08}} and re-entering) ' +
             'creates **two unnecessary documents** in the trial balance and dirties FI.\n\n' +
             '*(The 0/0 shown in the table is to emphasize that there is no FI impact.)*' },

      { baslik:'**The wrong correction method** — reversing from FI',
        belgeTuru:'KR', tarih:'13.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables', borc:216000, not:'Reversal' },
          { hesap:'770', ad:'Advertising expense — CC 3100', alacak:180000 },
          { hesap:'191', ad:'Deductible VAT', alacak:36000 },
        ],
        not:'**This method is wrong** but it\'s used often.\n\n' +
             'The result: three documents in the trial balance (the original + the reversal + the re-entry), ' +
             'unnecessary movements on the vendor account, three lines in the VAT return, and an auditor ' +
             'asking "why this reversal?"\n\n' +
             'But **FI was never wrong** — only the CO object was wrong. {{KB11N}} solves it with a single ' +
             'CO document, without touching FI.' },

      { baslik:'Month-end distribution ({{KSV5}}) — a shared expense is allocated',
        belgeTuru:'CO document', tarih:'31.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'9900 General Facilities → 3100 Production (55%) · 204,000 TRY', borc:0, alacak:0 },
          { hesap:'—', ad:'9900 General Facilities → 4200 Marketing (20%) · 74,000 TRY', borc:0, alacak:0 },
          { hesap:'—', ad:'9900 General Facilities → 5100 Administration (25%) · 92,000 TRY', borc:0, alacak:0 },
        ],
        not:'The electricity bill (370,000 TRY) had first been posted to the technical cost center **9900**. ' +
             'At month-end it was distributed to the three units by floor area.\n\n' +
             '**No change in FI whatsoever:** account 770 still shows 370,000 TRY. Only on the CO side did ' +
             'the cost get allocated to its real owners.\n\n' +
             'Cost center 9900\'s balance was **zeroed out** — a technical cost center reaching zero at ' +
             'month-end is the check that the distribution ran correctly.' },

      { baslik:'{{ic-siparis}} settlement ({{KO88}}) — cost is moved to its target',
        belgeTuru:'CO document', tarih:'31.10.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'Internal order 500042 (trade fair) → cost center 4200 Marketing · 285,000 TRY', borc:0, alacak:0 },
        ],
        not:'The {{ic-siparis}} opened for the trade fair had been accumulating cost for three months ' +
             '(booth, travel, promotional materials).\n\n' +
             'Once the fair ended, the total cost was **settled** to the Marketing cost center with {{KO88}}.\n\n' +
             '**Without settlement**, the cost stays parked on the order and never appears in any cost ' +
             'center report — the most common problem with internal orders.' },
    ],

    tHesaplar:[
      { hesap:'General administrative expense (FI)', kod:'770',
        borc:[{ ad:'Invoices', tutar:600000 }],
        alacak:[],
        not:'**CO movements don\'t affect this account**' },
      { hesap:'Cost center 4200 Marketing (CO)', kod:'4200',
        borc:[{ ad:'Direct expenses', tutar:230000 }, { ad:'From distribution', tutar:74000 },
              { ad:'Internal order settlement', tutar:285000 }],
        alacak:[],
        not:'A CO object — **not present** in the trial balance' },
      { hesap:'Cost center 9900 General Facilities (CO)', kod:'9900',
        borc:[{ ad:'Electricity, rent, security', tutar:370000 }],
        alacak:[{ ad:'Distribution ({{KSV5}})', tutar:370000 }],
        not:'Should be **zeroed out** at month-end — the distribution check' },
    ],

    notlar:[
      { tip:'warn', baslik:'A cost center error triggers no accounting control at all', metin:
        'For an expense that lands on the wrong cost center:\n\n' +
        '• The posting **balances**\n' +
        '• The trial balance **ties out**\n' +
        '• The income statement is **correct**\n' +
        '• The VAT is **correct**\n' +
        '• **No error message appears**\n\n' +
        'Because what\'s wrong isn\'t the amount, it\'s the **label**. The total expense stays the same — ' +
        'only which unit spent it is wrong.\n\n' +
        'The only way to catch this error is **budget variance analysis**: if Production\'s budget is ' +
        'unexpectedly exceeded, the items are examined with {{KSB1}} and the question "what is advertising ' +
        'expense doing in Production?" gets asked.\n\n' +
        '**Prevention:** define default assignments with {{OKB9}}, and make it routine for cost center ' +
        'owners to review their own items ({{KSB1}}) monthly.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'CO objects (cost carriers) come in several forms, and which one to use when is an important design ' +
      'decision. Distribution methods also have their own variants.',

    liste:[
      { ad:'Cost Center',
        aciklama:'A **permanent** organizational unit; has an owner.',
        neZaman:'Departments, divisions, plant areas — units that exist continuously.',
        ornek:'4200 Marketing · 3100 Production · 5100 Administration.',
        tcodes:['KS01','KSB1'] },

      { ad:'{{ic-siparis}}',
        aciklama:'A **temporary** cost-collection object; it ends and gets settled.',
        neZaman:'Trade fairs, campaigns, maintenance jobs, minor investments — projects with a clear start and end.',
        ornek:'500042 "2027 Industry Trade Fair." The accumulated cost is **settled** to a cost center or a ' +
              'fixed asset with {{KO88}}.',
        tcodes:['KO01','KO88'] },

      { ad:'Technical Cost Center',
        aciklama:'A cost center that temporarily collects shared expenses.',
        neZaman:'When a single invoice concerns more than one unit.',
        ornek:'9900 General Facilities (electricity, rent, security). Distributed at month-end and should ' +
              '**reach zero**.' },

      { ad:'Distribution — {{KSU5}}',
        aciklama:'Transfers expenses to their targets **under the original cost element**.',
        neZaman:'When the expense\'s **type** needs to remain visible on the target cost center.',
        ornek:'The electricity expense still shows as "electricity expense" on the target. **Transparent, ' +
              'but produces many lines.**',
        tcodes:['KSU5'] },

      { ad:'Assessment — {{KSV5}}',
        aciklama:'Transfers expenses by pooling them under an **assessment cost element** (category 42).',
        neZaman:'When detail isn\'t needed; for distributing management overhead.',
        ornek:'A single line on the target: "General overhead allocation, 74,000 TRY." The original types ' +
              '**aren\'t visible** — simpler but less transparent.',
        tcodes:['KSV5'] },

      { ad:'Primary Cost Element — category 1',
        aciklama:'The CO counterpart of a G/L expense account.',
        neZaman:'For every expense account — the bridge from FI to CO.',
        ornek:'Account 770 ↔ cost element 770. **The numbers are the same.**',
        tcodes:['KA01'] },

      { ad:'Secondary Cost Element — category 42/43',
        aciklama:'A type used only **within CO**; it has **no FI counterpart**.',
        neZaman:'For assessment (42) and internal activity allocation (43) transactions.',
        ornek:'Assessment cost element 9430000. This number **doesn\'t exist** in the FI chart of accounts — ' +
              'but in S/4HANA it is also opened as a G/L account.' },

      { ad:'Default Account Assignment — {{OKB9}}',
        aciklama:'The default the system uses when the user doesn\'t enter a cost center.',
        neZaman:'For expenses that belong to a fixed unit; to reduce user error.',
        ornek:'Account 770500 (rent) → always cost center 9900. The user never has to think about it.',
        tcodes:['OKB9'] },

      { ad:'Statistical Posting',
        aciklama:'The real cost is written to one object, and a statistical copy of it to another.',
        neZaman:'When the same expense needs to be tracked along two dimensions.',
        ornek:'The real cost goes to the internal order, the statistical copy to the cost center — or the ' +
              'other way around. There\'s no double counting because one copy is **statistical**.' },
    ],

    karsilastirmaBasliklar:['Distribution ({{KSU5}})', 'Assessment ({{KSV5}})'],
    karsilastirma:[
      ['Cost element', '**Original is preserved**', 'Pooled under the **assessment type** (category 42)'],
      ['Appearance on target', 'Electricity, rent, cleaning shown separately', 'One line: "general overhead allocation"'],
      ['Transparency', '**High** — the source type is visible', 'Low — detail is lost'],
      ['Number of lines', 'Many — one per type', 'Few — a single line'],
      ['Performance', 'Slower', 'Faster'],
      ['Typical use', 'Production cost distribution', 'Management overhead distribution'],
      ['FI impact', '**None**', '**None**'],
      ['Preference', 'When detail is needed', 'When simplicity is enough'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'KS01', ad:'Create cost center',
        amac:'Opens a new cost center master record.',
        neZaman:'When a new department is set up; when the organization changes.',
        adimlar:[
          { baslik:'Enter the cost center code and the **validity period**',
            aciklama:'The validity period is part of the {{CSKS}} key — the same code can have different ' +
                     'settings on different dates.' },
          { baslik:'Enter the name and the owner' },
          { baslik:'Choose the cost center type',
            aciklama:'Production, service, administration, sales — used in reporting and distribution.' },
          { baslik:'**Assign the profit center**',
            aciklama:'{{CSKS}} `PRCTR`. The profit center on the FI posting is derived from here — **it must ' +
                     'not be left blank**.' },
          { baslik:'Enter the hierarchy field',
            aciklama:'Its place in the standard hierarchy; enables grouping in reports.' },
        ],
        ekranAkisi:[
          { ekran:'Initial screen', islem:'Cost center 4200 · validity 01.01.2027–31.12.9999' },
          { ekran:'Basic data', islem:'Name "Marketing" · owner · type: sales' },
          { ekran:'Control', islem:'Profit center **PC-4000**' },
          { ekran:'Hierarchy', islem:'Standard hierarchy node: SALES' },
        ],
        alanlar:{
          zorunlu:['Cost center','Validity period','Name','Owner','Cost center type','Hierarchy field'],
          opsiyonel:['Profit center (mandatory in practice)','Company code','Functional area'] },
        hatalar:[
          { mesaj:'Cost center ... already exists in this period', sebep:'The same code is already defined on that date.', cozum:'Change the existing record with {{KS02}}, or use a different validity period.' },
          { mesaj:'Profit center ... does not exist', sebep:'The assigned profit center is undefined or outside its validity.', cozum:'Create the profit center first.' },
        ],
        ipucu:'**Don\'t leave the profit center assignment blank.** If {{belge-bolme}} is active, a posting to ' +
              'a cost center with no derivable profit center is **rejected** with *"Balancing field Profit ' +
              'Center not filled"* — and the cause isn\'t looked for in the cost center master, it\'s looked ' +
              'for, uselessly, in the document splitting configuration.',
        ilgili:['KS02','KS03','KSB1','CSKS'] },

      { kod:'KSB1', ad:'Cost center actual line items — the most-used CO report',
        amac:'Lists every item posted to a cost center.',
        neZaman:'For budget variance analysis; for the question "why did this expense land here?"',
        adimlar:[
          { baslik:'Enter the cost center (or group) and the period' },
          { baslik:'List the items',
            aciklama:'Cost element, amount, document number, description.' },
          { baslik:'**Double-click an item**',
            aciklama:'Jumps to the FI document — the fastest way to drop from a CO item into FI.' },
          { baslik:'Group by cost element',
            aciklama:'Shows which expense type is running over budget.' },
        ],
        alanlar:{
          zorunlu:['Cost center / group','Period range'],
          opsiyonel:['Cost element / group','Document type','User'] },
        hatalar:[
          { mesaj:'No line items found', sebep:'Wrong period, wrong cost center, or no postings at all.', cozum:'Check the controlling area and the period range. The cost center must fall within its validity period.' },
        ],
        ipucu:'This report is **the bridge from CO down to FI**: double-click an item and you land on the FI ' +
              'document, instantly answering "who entered this expense, with which invoice?"\n\n' +
              'This report should be the monthly routine for cost center owners — it\'s the **only practical ' +
              'way** to catch wrong assignments.',
        ilgili:['KB11N','S_ALR_87013611','FB03'] },

      { kod:'KB11N', ad:'CO-internal repost — **the correct correction method**',
        amac:'Moves an expense that landed on the wrong CO object within CO.',
        neZaman:'When the wrong cost center was entered. **Always used when FI is correct.**',
        adimlar:[
          { baslik:'Enter the source and target CO object',
            aciklama:'For example, 3100 Production → 4200 Marketing.' },
          { baslik:'Enter the cost element and the amount' },
          { baslik:'Enter the reference document',
            aciklama:'Which FI document it originated from — important for traceability.' },
          { baslik:'Save',
            aciklama:'**A CO document is created, no FI document is.** The trial balance doesn\'t change.' },
        ],
        ekranAkisi:[
          { ekran:'Header', islem:'Posting date 13.10.2027 · cost element 770100' },
          { ekran:'Items', islem:'Source 3100 · target 4200 · 180,000 TRY' },
          { ekran:'Result', islem:'CO document 100002841 · **no FI document**' },
        ],
        alanlar:{
          zorunlu:['Source CO object','Target CO object','Cost element','Amount'],
          opsiyonel:['Reference document','Text'] },
        hatalar:[
          { mesaj:'Cost element ... not valid for this posting', sebep:'The cost element is undefined, or its category isn\'t appropriate.', cozum:'Check the cost element and its category with {{KA03}}.' },
          { mesaj:'Period is not open in CO', sebep:'The CO period is closed.', cozum:'Check the CO period lock — it is **separate** from the FI period.' },
        ],
        ipucu:'**The reason this transaction exists:** a wrong cost center isn\'t an FI error. The expense ' +
              'amount is correct, the account is correct, the trial balance is correct — only the CO label ' +
              'is wrong.\n\n' +
              'Reversing with {{FB08}} creates **three documents** (the original + the reversal + the new ' +
              'one) in the trial balance, dirties the vendor account, and produces unnecessary lines in the ' +
              'VAT return.\n\n' +
              '{{KB11N}} solves it with a single CO document, **without ever touching FI**. Knowing this ' +
              'distinction is the key to not confusing an FI error with a CO error.',
        ilgili:['KSB1','KA03','FB08'] },

      { kod:'OKB9', ad:'Default account assignment',
        amac:'Defines the default to be used when the user doesn\'t enter a CO object.',
        neZaman:'For expense accounts belonging to a fixed unit; to reduce user error.',
        adimlar:[
          { baslik:'Enter the company code and the cost element' },
          { baslik:'Enter the default CO object',
            aciklama:'A cost center or an internal order.' },
          { baslik:'Refine by business area / valuation area if needed',
            aciklama:'Finer rules can be defined with the "Detail" indicator.' },
        ],
        alanlar:{
          zorunlu:['Company code','Cost element','Default CO object'],
          opsiyonel:['Business area','Valuation area','Profit center'] },
        hatalar:[
          { mesaj:'Account ... requires an assignment to a CO object', sebep:'The account has a cost element but no CO object was entered and there is no {{OKB9}} entry.', cozum:'Either enter a cost center on the posting or define a default with {{OKB9}}. **The single most common CO integration error.**' },
        ],
        ipucu:'{{OKB9}} reduces user error but **cuts both ways**: once a default is defined, users stop ' +
              'thinking, and expenses that genuinely belong to a different cost center also fall into the ' +
              'default.\n\n' +
              '**Correct use:** define it only on accounts that are genuinely fixed (rent, insurance, ' +
              'subscriptions). Don\'t define it on variable accounts (770 general expense) — let the user think.',
        ilgili:['KA03','KSB1','FB50'] },

      { kod:'KSV5', ad:'Cost center assessment',
        amac:'Transfers shared expenses to targets under an assessment cost element.',
        neZaman:'At month-end close; to zero out technical cost centers.',
        adimlar:[
          { baslik:'Choose the assessment cycle' },
          { baslik:'Enter the period' },
          { baslik:'**Run in test mode**',
            aciklama:'Check the distribution rates and amounts.' },
          { baslik:'Run in production mode' },
          { baslik:'Confirm the source cost center is **zeroed out**',
            aciklama:'If it isn\'t, the cycle doesn\'t cover all cost elements.' },
        ],
        ipucu:'**Checkpoint:** after distribution, technical cost centers\' balances **should be zero**. If ' +
              'not, the cycle doesn\'t cover some cost elements and those expenses never reach any unit.\n\n' +
              'This check should be on the month-end closing checklist — the simplest and most reliable ' +
              'sign that the distribution ran correctly.',
        hatalar:[
          { mesaj:'Sender cost center still has balance after assessment', sebep:'The cycle doesn\'t cover some cost elements.', cozum:'Widen the cost element group in the cycle segment.' },
        ],
        ilgili:['KSU5','KSB1','closing'] },

      { kod:'S_ALR_87013611', ad:'Cost center plan/actual comparison',
        amac:'Shows plan, actual, and the variance by cost center.',
        neZaman:'In monthly management reporting; in budget meetings.',
        adimlar:[
          { baslik:'Enter the controlling area, fiscal year, and period' },
          { baslik:'Choose the cost center or group' },
          { baslik:'Report: plan / actual / variance by cost element' },
          { baslik:'Drill into {{KSB1}} for items with variance and examine the detail' },
        ],
        ipucu:'**This is where wrong cost center assignments get caught.** When a budget variance is ' +
              'unexpected, the items are examined (with {{KSB1}}) and the question "what is advertising ' +
              'expense doing in Production?" gets asked.\n\n' +
              'If no plan has been entered, this report is useless — plan data must be entered with {{KP06}}.',
        ilgili:['KSB1','KP06','KB11N'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'The table architecture of cost center integration **changed fundamentally in S/4HANA**: in ECC, FI ' +
      '({{BSEG}}) and CO ({{COEP}}) were separate tables and needed reconciliation. In S/4HANA the two are ' +
      '**a single line in {{ACDOCA}}**.',

    liste:[
      { ad:'CSKS', baslik:'Cost center master data',
        tutar:'The definition, owner, and **profit center assignment** of cost centers.',
        olusturan:'{{KS01}}',
        guncelleyen:'{{KS02}}',
        anahtar:'KOKRS + KOSTL + **DATBI**',
        iliskiler:'{{ACDOCA}}\'s `KOSTL` points here; the `PRCTR` field derives the profit center.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KOKRS', aciklama:'{{kontrol-alani}}', tip:'pk' },
          { ad:'KOSTL', aciklama:'Cost center code', tip:'pk' },
          { ad:'DATBI', aciklama:'**Validity end date — part of the key.** The same code can have ' +
                   'different settings in different periods.' },
          { ad:'PRCTR', aciklama:'**{{kar-merkezi}}** — derived from here onto the FI posting', tip:'fk' },
          { ad:'VERAK', aciklama:'Owner' },
        ] },

      { ad:'CSKB', baslik:'Cost element master data',
        tutar:'The CO counterpart of the G/L account and its **category**.',
        olusturan:'{{KA01}}',
        guncelleyen:'{{KA02}}',
        anahtar:'KOKRS + KSTAR + DATBI',
        iliskiler:'The cost element number **is the same as the G/L account number**.',
        s4:'In S/4HANA the cost element became a **property** of the G/L account (inside {{FS00}}); a ' +
           'separate {{KA01}} is no longer mandatory.',
        alanlar:[
          { ad:'KSTAR', aciklama:'Cost element = **G/L account number**', tip:'pk' },
          { ad:'KATYP', aciklama:'**Category:** 1 primary · 11 revenue · 42 assessment · 43 internal activity allocation' },
        ] },

      { ad:'ACDOCA', baslik:'Universal Journal — FI and CO together',
        tutar:'FI and CO lines **in the same table**; the cost center, profit center, and account sit on ' +
              'the same line.',
        olusturan:'Every FI/CO document',
        guncelleyen:'Document posting; CO-internal movements are also written here',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'Via `KOSTL` to {{CSKS}}; via `RACCT` to {{CSKB}}.',
        s4:'**S/4HANA\'s biggest change is here:** {{COEP}} merged with {{BSEG}}, and the concept of ' +
           'reconciliation disappeared.',
        alanlar:[
          { ad:'KOSTL', aciklama:'**Cost center** — the CO dimension, right on the FI line' },
          { ad:'PRCTR', aciklama:'{{kar-merkezi}} — derived from the cost center' },
          { ad:'RACCT', aciklama:'Account / cost element — **the same number**' },
          { ad:'AUFNR', aciklama:'{{ic-siparis}} — if present' },
          { ad:'HSL', aciklama:'Amount in local currency' },
        ] },

      { ad:'COEP', baslik:'CO actual line items (ECC)',
        tutar:'The CO-side items in ECC — a table **separate** from FI.',
        olusturan:'An FI posting or a CO transaction',
        anahtar:'KOKRS + BELNR + BUZEI',
        s4:'**Merged with {{ACDOCA}}.** Can be read as a compatibility view.',
        alanlar:[
          { ad:'OBJNR', aciklama:'CO object — an encoded cost center/order' },
          { ad:'KSTAR', aciklama:'Cost element', tip:'fk' },
        ] },

      { ad:'AUFK', baslik:'Internal order master data',
        tutar:'Temporary cost-collection objects.',
        olusturan:'{{KO01}}',
        s4:'Unchanged.',
        alanlar:[
          { ad:'AUFNR', aciklama:'Order number', tip:'pk' },
          { ad:'AUART', aciklama:'Order type' },
        ] },

      { ad:'BSEG', baslik:'Document line items',
        tutar:'FI line items; the `KOSTL` field exists here too.',
        olusturan:'Document posting',
        s4:'{{uyumluluk-view}} — derived from {{ACDOCA}}.' },
    ],

    er:{
      type:'er',
      baslik:'The FI–CO bridge: a single table in S/4HANA',
      varliklar:[
        { ad:'CSKS', rol:'CO master data', aciklama:'Cost center',
          alanlar:[{ ad:'KOKRS', tip:'pk' }, { ad:'KOSTL', tip:'pk' }, { ad:'DATBI', tip:'pk' }, { ad:'PRCTR', tip:'fk' }] },
        { ad:'CSKB', rol:'CO master data', aciklama:'Cost element',
          alanlar:[{ ad:'KSTAR', tip:'pk' }, { ad:'KATYP' }] },
        { ad:'SKB1', rol:'FI master data', aciklama:'G/L account (company code)',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }] },
        { ad:'ACDOCA', rol:'Universal', hub:true, aciklama:'**FI + CO in one line**',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'RACCT', tip:'fk' }, { ad:'KOSTL', tip:'fk' }, { ad:'PRCTR' }, { ad:'AUFNR', tip:'fk' }] },
        { ad:'AUFK', rol:'CO master data', aciklama:'Internal order',
          alanlar:[{ ad:'AUFNR', tip:'pk' }, { ad:'AUART' }] },
        { ad:'COEP', rol:'ECC', aciklama:'CO items (legacy)',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'KSTAR', tip:'fk' }] },
        { ad:'BKPF', rol:'FI', aciklama:'Document header',
          alanlar:[{ ad:'BELNR', tip:'pk' }] },
      ],
      iliskiler:[
        { from:'SKB1', to:'CSKB', alanlar:'SAKNR → KSTAR', not:'**the same number**' },
        { from:'CSKB', to:'ACDOCA', alanlar:'KSTAR → RACCT', not:'cost element' },
        { from:'CSKS', to:'ACDOCA', alanlar:'KOSTL', not:'**cost center**' },
        { from:'CSKS', to:'ACDOCA', alanlar:'PRCTR', not:'profit center derivation' },
        { from:'AUFK', to:'ACDOCA', alanlar:'AUFNR', not:'internal order' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'header → line item' },
        { from:'ACDOCA', to:'COEP', alanlar:'BELNR', not:'ECC counterpart' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'From the user\'s perspective, the cost center is **a single field** — but if that field is left ' +
      'blank, the document can\'t be posted. For a consultant, three screens matter: {{KS01}} (master ' +
      'data), {{OKB9}} (default), and {{KB11N}} (correction).',

    ekranlar:[
      { ad:'The posting screen — the cost center field ({{FB50}} / {{FB60}} / {{MIRO}})',
        aciklama:'The user\'s only point of contact with CO.',
        alanlar:[
          { ad:'Cost center', zorunlu:false, aciklama:'**Effectively mandatory if the account has a cost ' +
                   'element.** If blank, the {{OKB9}} default is tried; if that\'s missing too, the document ' +
                   '**can\'t be posted**.' },
          { ad:'Internal order', zorunlu:false, aciklama:'Can be used instead of a cost center.' },
          { ad:'Profit center', zorunlu:false, aciklama:'**Fills automatically** — derived from the cost center.' },
        ],
        ipucu:'The field is only visible/meaningful on **income statement accounts**. Vendor, bank, and ' +
              'inventory lines never ask for a cost center — because balance sheet accounts aren\'t "spent."\n\n' +
              'That\'s the answer to "why doesn\'t this line have a cost center field?"' },

      { ad:'{{KS01}} — cost center master data',
        aciklama:'The screen where a cost center is defined.',
        alanlar:[
          { ad:'Cost center + validity period', zorunlu:true, aciklama:'**The period is part of the key** — ' +
                   'the same code can have different settings in different periods.' },
          { ad:'Name and owner', zorunlu:true },
          { ad:'Cost center type', zorunlu:true, aciklama:'Production, service, administration, sales.' },
          { ad:'**Profit center**', zorunlu:false, aciklama:'Not technically mandatory, but **mandatory in ' +
                   'practice** — if document splitting is active, leaving it blank gets the document rejected.' },
          { ad:'Hierarchy field', zorunlu:true, aciklama:'Grouping in reports.' },
        ],
        ipucu:'**Understand the validity-period logic:** a cost center isn\'t deleted to "close" it — its ' +
              'validity end date is pulled back into the past. That way past postings are preserved and new ' +
              'postings are blocked.\n\n' +
              'The same mechanism is used for **changes**: if the owner or the profit center changes, ' +
              '{{KS02}} opens a new time slice; past reports continue to show the old owner.' },

      { ad:'{{OKB9}} — default account assignment',
        aciklama:'The rule that kicks in when the user doesn\'t enter a CO object.',
        alanlar:[
          { ad:'Company code', zorunlu:true },
          { ad:'Cost element', zorunlu:true, aciklama:'Which account the default is being defined for.' },
          { ad:'Cost center / internal order', zorunlu:true, aciklama:'The default CO object.' },
          { ad:'Detail indicator', zorunlu:false, aciklama:'Finer rules by business area or valuation area.' },
        ],
        ipucu:'**A double-edged tool.** It reduces user error, but it also stops the user from thinking: ' +
              'expenses that genuinely belong to a different unit silently fall into the default.\n\n' +
              '**Correct use:** define it only on truly fixed accounts (rent, insurance, subscriptions). ' +
              'Don\'t define it on general expense accounts — let the user think, and let them get an error ' +
              'if they leave it blank.' },

      { ad:'{{KB11N}} — CO-internal correction',
        aciklama:'The screen where a wrong CO object gets corrected.',
        alanlar:[
          { ad:'Source CO object', zorunlu:true },
          { ad:'Target CO object', zorunlu:true },
          { ad:'Cost element and amount', zorunlu:true },
          { ad:'Reference document', zorunlu:false, aciklama:'**Should be entered** for traceability.' },
        ],
        ipucu:'**No FI document is created, the trial balance doesn\'t change.** This is the whole reason ' +
              'the tool exists: a wrong cost center is not an FI error.\n\n' +
              'Fill in the reference document field — six months later, the only way to answer "why was ' +
              'this 180,000 TRY moved?" is this.' },
    ],

    zorunlu:['Cost center (if the account has a cost element)','Controlling area','Validity period','Cost element category'],
    opsiyonel:['Internal order','Profit center (derived)','{{OKB9}} default'],

    hatalar:[
      { mesaj:'Account ... requires an assignment to a CO object', sebep:'The account has a cost element but no CO object was entered, and there is no {{OKB9}} default.', cozum:'Enter a cost center on the posting, or define a default with {{OKB9}}. **The single most common CO integration error.**' },
      { mesaj:'Cost center ... does not exist on ...', sebep:'The cost center isn\'t valid on that date ({{CSKS}} `DATBI`).', cozum:'Check the validity period. A back-dated posting can\'t be made to a closed cost center.' },
      { mesaj:'Cost element ... does not exist', sebep:'The G/L account has no cost element defined.', cozum:'Define it with {{KA01}} (in S/4HANA, set the account type to "Primary Costs" inside {{FS00}}).' },
      { mesaj:'Balancing field "Profit Center" in line item ... not filled', sebep:'No profit center is assigned to the cost center, and {{belge-bolme}} is active.', cozum:'Assign a profit center to the cost center with {{KS02}}. **The error shows up in document splitting, but the cause is in CO master data.**' },
      { mesaj:'Period is not open in CO (KB11N)', sebep:'The CO period is closed.', cozum:'The CO period lock is **separate** from FI\'s; it must be opened separately.' },
      { mesaj:'Sender cost center still has balance after assessment', sebep:'The assessment cycle doesn\'t cover some cost elements.', cozum:'Widen the cost element group in the cycle segment. **Technical cost centers should be zeroed out at month-end.**' },
    ],

    ipuclari:[
      '**Fix a wrong cost center with {{KB11N}}**, don\'t reverse it with {{FB08}} — FI is already correct.',
      'Define {{OKB9}} defaults **only on fixed accounts**; on variable accounts, the user should think it through.',
      '**Don\'t leave the profit center blank** on cost center master data — if document splitting is ' +
      'active, postings get rejected and the cause won\'t be looked for in CO.',
      'Confirm technical cost centers are **zeroed out** at month-end; it\'s the simplest check that the ' +
      'distribution ran correctly.',
      'Make a monthly {{KSB1}} review a routine for cost center owners — it\'s the only practical way to ' +
      'catch wrong assignments.',
      'The CO period lock is **separate** from FI\'s; both must be managed at closing.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'ACDOCA', ne:'`KOSTL` cost center, `PRCTR` profit center, `RACCT` account — **in a single line**' },
      { tablo:'BSEG', ne:'The FI item; the `KOSTL` field is also present' },
      { tablo:'BKPF', ne:'Document header' },
      { tablo:'COEP', ne:'A separate CO item in ECC — moved into {{ACDOCA}} in S/4' },
      { tablo:'CSKS', ne:'Cost center master data (read)' },
      { tablo:'CSKB', ne:'Cost element master data (read)' },
    ],

    commit:
      'An FI and a CO posting are written **within the same LUW** — this is the technical meaning of ' +
      '"real-time integration."\n\n' +
      'This was already true in ECC ({{BSEG}} and {{COEP}} were written in the same commit), but because ' +
      'they were written to **two separate tables**, an inconsistency was theoretically possible, and ' +
      'reconciliation reports existed for it.\n\n' +
      'In S/4HANA, because **a single line** is written, an inconsistency is **structurally impossible**. ' +
      'FI–CO reconciliation has disappeared as a concept.\n\n' +
      'A critical detail: **if the CO posting fails, the FI posting doesn\'t happen either.** For example, ' +
      'if the CO number range ({{KANK}}) isn\'t defined, the expense posting never gets created at all — the ' +
      'error shows up on the FI screen but its cause is in CO.',

    belgeNo:
      'In ECC, FI and CO used to get **separate document numbers**: the FI document from the {{FBN1}} ' +
      'range, the CO document from the {{KANK}} range.\n\n' +
      'In S/4HANA there is a single document number; the CO lines are part of the same {{ACDOCA}} document.\n\n' +
      '**But CO-internal transactions** ({{KB11N}}, {{KSV5}}, {{KO88}}) still get their own CO document ' +
      'numbers — because they have no FI counterpart. This is why {{KANK}} ranges still need to be defined.',

    postingLogic:
      'The CO assignment on an expense posting is decided in this order:\n\n' +
      '**1.** Does the account have a **cost element**? If not, it never flows into CO, and that\'s the end of it.\n' +
      '**2.** Did the user enter a CO object (cost center / internal order)? If so, it\'s used.\n' +
      '**3.** If not, the **{{OKB9}}** default is looked up.\n' +
      '**4.** If that\'s missing too → *"Account requires an assignment to a CO object"* → **the document ' +
      'cannot be posted**.\n' +
      '**5.** Once a CO object is found, the **profit center is derived** from it ({{CSKS}} `PRCTR`).\n' +
      '**6.** If {{belge-bolme}} is active, this profit center is used as a splitting characteristic.\n' +
      '**7.** A single line is written to {{ACDOCA}}: account + cost center + profit center.\n\n' +
      'The error at step 4 is the most common CO integration error, and its fix runs **two ways**: either ' +
      'the user enters it, or {{OKB9}} is defined.',

    belgeTuru:
      'The document type doesn\'t directly affect the CO assignment. But the account types allowed for a ' +
      'document type in {{OBA7}} determine whether an expense account can be used at all.\n\n' +
      'CO-internal transactions ({{KB11N}}) don\'t use an FI document type — they have their own CO ' +
      'business transaction type.',

    numberRange:
      '**{{KANK}} — CO number ranges**, defined per business transaction: actual postings (COIN), ' +
      'reposting (RKU1), assessment (RKIU), settlement (KOAO), and so on.\n\n' +
      '**Critical behavior:** if a CO number range isn\'t defined, that business transaction doesn\'t work — ' +
      'and **the FI posting fails too**, because the two are in the same LUW.\n\n' +
      'The CO ranges also need to be opened at the start of the year; if the FI ranges are opened and CO is ' +
      'forgotten, expense postings stop and the error message doesn\'t clearly say why.',

    accountDetermination:
      'A cost center has no account determination of its own. But there are two derivation chains:\n\n' +
      '**1. Profit center derivation:** cost center → {{CSKS}} `PRCTR` → the line item.\n' +
      '**2. Default CO object:** account → {{OKB9}} → cost center/order.\n\n' +
      'In addition, an **assessment cost element** (category 42) must be defined for a {{KSV5}} assessment; ' +
      'this is a CO object with no FI account. In S/4HANA it is also opened as a G/L account (secondary cost ' +
      'elements were brought into the chart of accounts).',

    tur:
      '**Configuration:** {{kontrol-alani}} settings ({{OKKP}}), CO number ranges ({{KANK}}), {{OKB9}} ' +
      'default assignments, assessment/distribution cycles.\n\n' +
      '**Master data:** cost centers ({{CSKS}}), cost elements ({{CSKB}}), internal orders ({{AUFK}}), the ' +
      'cost center hierarchy.\n\n' +
      '**Transaction data:** {{ACDOCA}} lines, CO-internal documents.',

    transport:
      'Controlling area settings, {{OKB9}} assignments, and number ranges transport. **But cost centers ' +
      'and cost elements are master data and don\'t transport** — they must be created separately in the ' +
      'target system.\n\n' +
      'This creates a classic migration problem: {{OKB9}} defaults transport, but if the cost centers they ' +
      'reference don\'t exist in production, postings fail with *"Cost center does not exist."*\n\n' +
      '**Migration check:** confirm every cost center in the {{OKB9}} table exists in production and is ' +
      '**within its validity period**.',

    img:[
      { yol:'SPRO → Controlling → General Controlling → Organization → Maintain Controlling Area', not:'{{OKKP}} → {{TKA01}}' },
      { yol:'SPRO → Controlling → General Controlling → Organization → Maintain Number Ranges', not:'{{KANK}} — **if missing, the FI posting stops too**' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Define Default Account Assignment', not:'{{OKB9}}' },
      { yol:'SPRO → Controlling → Cost Center Accounting → Master Data → Cost Centers', not:'{{KS01}} · standard hierarchy' },
    ],

    ekstra:[
      { ic:'🔧', baslik:'Why {{KB11N}}, why not {{FB08}}?', metin:
        'For an expense that landed on the wrong cost center there are two correction routes, and the ' +
        'difference between them **shows the quality of the consulting**.\n\n' +
        '**The wrong way — reversing with {{FB08}}:**\n' +
        'The original document is reversed and re-entered with the right cost center. Result: **three ' +
        'documents** in the trial balance (original + reversal + new), three movements on the vendor ' +
        'account, three lines in the VAT return. In an audit, "why these reversals?" comes up and every ' +
        'single one has to be explained.\n\n' +
        '**The correct way — moving within CO with {{KB11N}}:**\n' +
        'A single CO document is created. FI is **never touched**: the trial balance is the same, the ' +
        'vendor account is the same, VAT is the same. Only the CO object changes.\n\n' +
        '**The logic behind the distinction:** a wrong cost center is **not an FI error**. The expense ' +
        'amount is correct, the account is correct, the period is correct. What\'s wrong is only the ' +
        '**management-accounting label**, and that label lives in CO.\n\n' +
        '**General principle:** fix the error **in the layer where it occurred**. An FI error is fixed in ' +
        'FI, a CO error is fixed in CO. This principle also holds in MM and SD integration (the rule of ' +
        'reversing from the source module).' },

      { ic:'📅', baslik:'Validity period: a cost center isn\'t deleted, it\'s closed', metin:
        'The **third field of the {{CSKS}} key, `DATBI`** (validity end date), and this is an important ' +
        'choice in master-data design.\n\n' +
        'When a department closes, the cost center **isn\'t deleted** — it can\'t be, either, because past ' +
        'postings reference it.\n\n' +
        'Instead the validity end date is pulled back into the past. The result:\n\n' +
        '• Past postings are **preserved** and remain reportable\n' +
        '• New postings **can\'t be made** (*"Cost center does not exist on [date]"*)\n' +
        '• Report queries still work for past periods\n\n' +
        'The same mechanism is also used for **changes**: if a cost center\'s owner or profit center ' +
        'changes, {{KS02}} opens a new time slice.\n\n' +
        '**Practical consequence:** a profit center change **doesn\'t affect the past**. Old postings stay ' +
        'on the old profit center, new postings go to the new one. That\'s the answer to "why didn\'t the ' +
        'past reports change?" — and it\'s the correct behavior: reports not changing retroactively is a ' +
        'basic accounting expectation.' },
    ],

    notlar:[
      { tip:'warn', baslik:'If the CO number range is missing, the FI posting stops too', metin:
        'CO number ranges defined with {{KANK}} are per business transaction (COIN actual postings, RKU1 ' +
        'reposting, RKIU assessment…).\n\n' +
        'If a range isn\'t defined or is exhausted, that business transaction doesn\'t work. **And the FI ' +
        'posting fails too** — because the two are in the same LUW.\n\n' +
        'The user gets an error on the {{FB50}} screen, but the message points to CO, and the cause gets ' +
        'looked for on the FI side. The classic scenario: at the start of the year the FI number ranges are ' +
        'opened, **CO is forgotten**, and expense postings stop on the morning of January 1.\n\n' +
        '**Prevention:** add a "were the CO number ranges opened?" item to the year-end closing checklist, ' +
        '**right next to** the FI ranges.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'This is where S/4HANA\'s **biggest change in the FI–CO area** sits: with {{ACDOCA}}, FI and CO lines ' +
      'merged into the same table. A cost element is no longer separate master data, it\'s a **property of ' +
      'the G/L account**. FI–CO reconciliation has disappeared as a concept.',

    eccFarklari:[
      { konu:'Line item data', ecc:'{{BSEG}} (FI) + {{COEP}} (CO) — **separate**', s4:'**{{ACDOCA}}** — a single line' },
      { konu:'Cost element', ecc:'Separate master data ({{KA01}} → {{CSKB}})', s4:'**A property of the G/L account** (inside {{FS00}})' },
      { konu:'Secondary cost element', ecc:'**Doesn\'t exist** in the FI chart of accounts', s4:'**Also opened as a G/L account**' },
      { konu:'FI–CO reconciliation', ecc:'Reports + real-time transfer', s4:'**Doesn\'t exist as a concept** — same table' },
      { konu:'Cost center master data', ecc:'{{KS01}} → {{CSKS}}', s4:'**Unchanged**' },
      { konu:'Distribution / assessment', ecc:'{{KSU5}} / {{KSV5}}', s4:'Same + Fiori apps' },
      { konu:'Reporting', ecc:'CO reports separate, FI reports separate', s4:'From a single source, with dimension filters' },
    ],

    universalJournal:
      'This is where the impact of {{ACDOCA}} on cost center integration **is most concrete**.\n\n' +
      'In ECC, an expense posting used to be written to two tables: {{BSEG}} (the FI dimension) and ' +
      '{{COEP}} (the CO dimension). The same event had two records, and they could theoretically become ' +
      'inconsistent. That\'s why reconciliation reports and real-time transfer mechanisms had been built.\n\n' +
      'In S/4HANA there is **a single line**, and `RACCT` (account) and `KOSTL` (cost center) sit on the ' +
      'same line. Inconsistency is **structurally impossible**.\n\n' +
      'The practical payoff: "how much was spent from which account on which cost center?" is answered ' +
      '**from a single table, with no join**. In ECC this query would have required joining {{BSEG}} and {{COEP}}.',

    kalkanTcodes:[
      { eski:'{{KA01}} / {{KA02}}', yeni:'{{FS00}}', not:'The cost element is now a property of the ' +
             'account; {{KA01}} still works but isn\'t mandatory' },
      { eski:'FI–CO reconciliation reports', yeni:'—', not:'**Became unnecessary**' },
      { eski:'—', yeni:'—', not:'{{KS01}}, {{KSB1}}, {{KB11N}}, {{OKB9}}, {{KSV5}} **were not removed**' },
    ],

    fiori:[
      { ad:'Manage Cost Centers', aciklama:'Replaces {{KS01}}/{{KS02}}; master-data management.' },
      { ad:'Cost Centers — Actual Line Items', aciklama:'Replaces {{KSB1}}; the jump to the FI document is preserved.' },
      { ad:'Cost Centers — Plan/Actual', aciklama:'Replaces {{S_ALR_87013611}}; visual variance analysis.' },
      { ad:'Repost Costs', aciklama:'Replaces {{KB11N}}; a CO-internal move.' },
      { ad:'Run Assessment / Distribution', aciklama:'Replaces {{KSV5}}/{{KSU5}}; period-end distribution.' },
    ],

    compatibilityViews:[
      '{{COEP}} — a view derived from {{ACDOCA}}; legacy programs keep working.',
      '{{BSEG}} — likewise a compatibility view.',
      '{{CSKS}}, {{CSKB}}, {{AUFK}} — **remain physical tables**.',
      'New development should read {{ACDOCA}} **directly** — views are slow.',
    ],

    performans:
      'The biggest win is **the reconciliation burden disappearing**. In ECC, month-end used to mean ' +
      'searching for differences between FI and CO, fixing transfer errors, running reconciliation reports ' +
      '— that work has vanished entirely.\n\n' +
      'On the reporting side too, reading a single table is noticeably faster than joined queries. Expense ' +
      'analyses can now also use FI and CO dimensions **together**: questions like "how much was received ' +
      'from which vendor on which profit center?" collapse into a single query.',

    bestPractices:[
      'During migration, convert cost elements into a G/L account property; **the account number and the ' +
      'cost element number are already the same**, so the conversion is mechanical.',
      'Plan for secondary cost elements to be added to the chart of accounts — in S/4HANA they are opened ' +
      'as G/L accounts.',
      '**Remove** FI–CO reconciliation reports and custom programs; they\'re unnecessary.',
      'In new development, read **{{ACDOCA}}** instead of {{COEP}}.',
      'Confirm the cost centers referenced by {{OKB9}} defaults exist in production and are **within ' +
      'their validity period**.',
      'Add CO number ranges ({{KANK}}) to the migration checklist — if missing, expense postings stop.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'Production\'s budget overrun of 40%: the expense is in the wrong place, the trial balance is correct',
    hikaye:
      'At **Marmara Üretim Inc.**\'s October management meeting, the Production manager objects: *"Our ' +
      'budget looks 40% over, but we haven\'t made any unusual spending."*\n\n' +
      'Finance checks: the income statement is correct, the trial balance ties out, total expense matches ' +
      'the budget. But there is 1,240,000 TRY of excess expense **on the Production cost center**.\n\n' +
      'This scenario shows an error class that no accounting control catches, and the right way to fix it.',
    veriler:[
      { k:'Company code / Controlling area', v:'1000 / 1000' },
      { k:'Production cost center', v:'3100 · budget 3,100,000 TRY' },
      { k:'Actual', v:'**4,340,000 TRY** — 40% variance' },
      { k:'Marketing cost center', v:'4200 · budget 1,800,000 TRY' },
      { k:'Marketing actual', v:'**620,000 TRY** — 66% **unused**' },
      { k:'Total expense', v:'**In line** with budget — the trial balance is correct' },
    ],

    adimlar:[
      { baslik:'First observation — two variances offset each other', tcode:'S_ALR_87013611',
        aciklama:'A plan-vs-actual report is pulled for all cost centers.',
        girdi:[
          { alan:'3100 Production', deger:'Plan 3,100,000 · Actual 4,340,000 · **+1,240,000**' },
          { alan:'4200 Marketing', deger:'Plan 1,800,000 · Actual 620,000 · **−1,180,000**' },
          { alan:'Other cost centers', deger:'Variance within the normal range' },
          { alan:'**Total**', deger:'Variance **+60,000** — negligible' },
        ],
        not:'**The first clue is right here:** the two variances almost completely offset each other. This ' +
             'pattern is a sign of an **assignment error**, not a genuine budget overrun.\n\n' +
             'A genuine overrun would also raise the total. Here the total is almost unchanged — meaning ' +
             'the money was spent, but **mislabeled**.' },

      { baslik:'The items are examined — a pattern emerges', tcode:'KSB1',
        aciklama:'October\'s items on the Production cost center are listed.',
        girdi:[
          { alan:'Total items', deger:'284' },
          { alan:'Cost element 770300 (advertising)', deger:'**18 items · 1,240,000 TRY**' },
          { alan:'Question', deger:'**What is advertising expense doing on the Production cost center?**' },
          { alan:'Document type', deger:'All KR (vendor invoice)' },
        ],
        not:'Advertising expense isn\'t a production cost. All 18 invoices should have belonged to ' +
             'Marketing.\n\n' +
             '{{KSB1}}\'s most valuable feature kicks in here: **double-clicking an item jumps to the FI ' +
             'document**, answering the question "who entered this expense, with which invoice?"' },

      { baslik:'The root cause — the {{OKB9}} default', tcode:'OKB9',
        aciklama:'The user who entered the invoices didn\'t write a cost center. So where did 3100 come from?',
        girdi:[
          { alan:'Check', deger:'{{OKB9}} · company 1000 · cost element 770300' },
          { alan:'**Default defined**', deger:'Cost center **3100 Production**' },
          { alan:'Date defined', deger:'2025 — left over from an old organizational structure' },
          { alan:'At that time', deger:'The advertising budget sat under Production' },
        ],
        not:'**The root cause is found.** In 2025 the organization was different: the marketing function ' +
             'sat under Production, and the {{OKB9}} default was correct back then.\n\n' +
             'In 2026 Marketing became a separate unit and got its own cost center (4200) — but **{{OKB9}} ' +
             'was never updated**.\n\n' +
             'Because the user never entered a cost center, the system quietly kept using the old default. ' +
             '**No error message ever appeared** because the default was a valid cost center.' },

      { baslik:'The correction decision — {{KB11N}} or {{FB08}}?', tcode:'KB11N',
        aciklama:'Two methods are weighed.',
        girdi:[
          { alan:'Option 1 — {{FB08}}', deger:'18 documents reversed + 18 documents re-entered = **54 documents**' },
          { alan:'Effect of option 1', deger:'36 unnecessary movements on the vendor account · 36 lines in the VAT return' },
          { alan:'**Option 2 — {{KB11N}}** ✓', deger:'A single CO document · **FI is never touched**' },
          { alan:'Effect of option 2', deger:'The trial balance **doesn\'t change** · VAT **doesn\'t change** · the vendor account **doesn\'t change**' },
        ],
        not:'**Option 2 is chosen, and the reason is clear:** the FI side **is not wrong at all**.\n\n' +
             '1,240,000 TRY of advertising expense was posted to account 770300 — **correctly**. VAT is ' +
             'correct, the vendor liability is correct, the period is correct.\n\n' +
             'The only thing wrong is the **CO label**. Fixing the error in the layer where it occurred ' +
             'beats dirtying FI with 36 unnecessary documents.' },

      { baslik:'The CO-internal move is made', tcode:'KB11N',
        aciklama:'1,240,000 TRY is moved from Production to Marketing.',
        girdi:[
          { alan:'Source', deger:'Cost center **3100** Production' },
          { alan:'Target', deger:'Cost center **4200** Marketing' },
          { alan:'Cost element', deger:'770300 Advertising expense' },
          { alan:'Amount', deger:'1,240,000 TRY' },
          { alan:'Reference', deger:'"October advertising expenses — OKB9 default error"' },
        ],
        fis:{ baslik:'CO document 100003912 — repost', belgeTuru:'CO', tarih:'02.11.2027',
          satirlar:[
            { hesap:'—', ad:'3100 Production → 4200 Marketing · cost element 770300 · 1,240,000 TRY', borc:0, alacak:0,
              not:'**No FI document was created**' },
          ], not:'A CO document was created, an FI document **wasn\'t**.\n\n' +
                 'Account 770300\'s balance **didn\'t change** (still 1,240,000 TRY), the trial balance ' +
                 '**didn\'t change**, the income statement **didn\'t change**.\n\n' +
                 'Only on the CO side did the cost move from 3100 to 4200.' },
        tabloEtkisi:[
          { tablo:'ACDOCA', ne:'CO-internal lines: 3100 credit, 4200 debit · **the FI account was not affected**' },
          { tablo:'BKPF', ne:'**No entry** — no FI document was created' },
        ],
        not:'The description was written into the reference field. Six months later, the only way to ' +
             'answer "why was this 1,240,000 TRY moved?" is this.' },

      { baslik:'Verification — plan/actual is pulled again', tcode:'S_ALR_87013611',
        aciklama:'The correction\'s effect is checked.',
        girdi:[
          { alan:'3100 Production', deger:'Plan 3,100,000 · Actual **3,100,000** · variance **0** ✓' },
          { alan:'4200 Marketing', deger:'Plan 1,800,000 · Actual **1,860,000** · variance +60,000 ✓' },
          { alan:'Trial balance', deger:'**Unchanged** — account 770300 is the same' },
          { alan:'VAT return', deger:'**Unchanged**' },
        ],
        not:'Both cost centers now match their budgets, and **nothing changed** on the FI side.\n\n' +
             'The Production manager\'s objection was justified: they really hadn\'t made any unusual spending.' },

      { baslik:'The root cause is fixed — {{OKB9}} is updated', tcode:'OKB9',
        aciklama:'The default is corrected so the same error doesn\'t repeat.',
        girdi:[
          { alan:'Cost element 770300', deger:'Default updated from 3100 → **4200**' },
          { alan:'Additional audit', deger:'**All {{OKB9}} records** were reviewed' },
          { alan:'Found', deger:'**7 more records** still reference the old organizational structure' },
          { alan:'Decision', deger:'The default was **removed** on variable accounts — let the user think' },
        ],
        not:'**The most valuable finding is in the last line:** 7 more defaults were stale, and all of them ' +
             'were silently writing to the wrong cost centers.\n\n' +
             'The decision went two ways:\n' +
             '**a)** On genuinely fixed accounts (rent, insurance), the default was **kept**.\n' +
             '**b)** On variable accounts (advertising, consulting, travel), the default was **removed** — ' +
             'now if the user doesn\'t enter a cost center they **get an error** and have to think.\n\n' +
             'This is exactly {{OKB9}}\'s "double-edged" nature: it reduces user error while also stopping ' +
             'the user from thinking.' },

      { baslik:'Permanent measures', tcode:'KSB1',
        aciklama:'A routine is set up so the error gets caught early.',
        girdi:[
          { alan:'Measure 1', deger:'Cost center owners do a **monthly {{KSB1}}** review' },
          { alan:'Measure 2', deger:'{{OKB9}} records are reviewed **annually**' },
          { alan:'Measure 3', deger:'An {{OKB9}} check is a **mandatory step** on any organizational change' },
          { alan:'Measure 4', deger:'No default is **defined** on variable accounts' },
        ],
        not:'**The first measure is the most effective:** if a cost center owner reviews their own items ' +
             'monthly, the question "what is advertising expense doing in my numbers?" gets asked within a ' +
             'month — it doesn\'t wait for year-end.\n\n' +
             'This is the **only practical early warning** for this error class, because no accounting ' +
             'control can catch it.' },
    ],

    sonuc:
      '**1,240,000 TRY landed on the wrong cost center, and no accounting control caught it.**\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. Cost center errors trigger no accounting control.** The posting balances, the trial balance ' +
      'ties out, the income statement is correct, VAT is correct, no error message appears. Because what\'s ' +
      'wrong isn\'t the **amount, it\'s the label** — the total expense stays the same. The only early ' +
      'warning: a cost center owner\'s monthly {{KSB1}} review.\n\n' +
      '**2. Two variances that offset each other are a sign of an assignment error.** One cost center is ' +
      '+1,240,000, another is −1,180,000, and the total is nearly zero. A genuine budget overrun would also ' +
      'raise the total. When this pattern shows up, look for an **assignment error** first.\n\n' +
      '**3. A wrong cost center is fixed with {{KB11N}}, not {{FB08}}.** The FI side was never wrong: the ' +
      'account is correct, the amount is correct, VAT is correct. A reversal would have created **54 ' +
      'documents** instead of 18, needlessly dirtying the vendor account and the VAT return. **General ' +
      'principle: fix the error in the layer where it occurred.**\n\n' +
      '**4. {{OKB9}} defaults go stale and silently write to the wrong place.** The organization changed, ' +
      'the cost center changed, the default **kept going**. The system gave no error because the default ' +
      'was a valid cost center. The consequence: don\'t define a default on variable accounts — let the ' +
      'user get an error and think it through when they leave it blank. A default is only meaningful on ' +
      'genuinely fixed accounts (rent, insurance, subscriptions).',
  },

  },
});
