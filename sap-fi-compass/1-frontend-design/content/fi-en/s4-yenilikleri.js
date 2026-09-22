/* ==========================================================================
   content/fi-en/s4-yenilikleri.js — English body for "S/4HANA Innovations"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 's4-yenilikleri',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'S/4HANA is SAP\'s next-generation ERP, running on an {{bellek-ici}} database.\n\n' +
      'That definition is true and **explains nothing**. Neither does the list of ' +
      'innovations: {{ACDOCA}} arrived, {{is-ortagi}} became mandatory, ' +
      'some transaction codes disappeared, {{fiori}} showed up… ' +
      'These look like independent, unrelated changes.\n\n' +
      'They aren\'t.\n\n' +
      '---\n\n' +
      '**This topic\'s thesis:**\n\n' +
      '**Almost every change is the consequence of a single sentence:**\n\n' +
      '**"Instead of storing the total, recalculate it every time."**\n\n' +
      'Much of the old SAP design existed to work around a single constraint: ' +
      '**reading from disk is expensive.** That\'s why balances used to be ' +
      'pre-calculated and written into {{toplam-tablosu}}s ({{GLT0}}, {{FAGLFLEXT}}, ' +
      '{{KNC1}}, {{LFC1}}); open items were copied a second time under a different ' +
      'key ({{BSIK}}, {{BSID}}, {{BSIS}}).\n\n' +
      'On an in-memory database that constraint disappeared. Once the constraint ' +
      'was gone, **the solution became unnecessary**.\n\n' +
      '**Bottom line:** most of S/4HANA\'s simplifications aren\'t a new feature — ' +
      '**they\'re the removal of a solution that\'s no longer needed.**',

    neden:
      '**Space savings.** Totals and index tables took up a large share of the ' +
      'database. They were removed.\n\n' +
      '**The real payoff: consistency.** A stored total can **diverge** from the ' +
      'line items — if an update stops halfway, the trial balance and the detail ' +
      'no longer match. A calculated total can\'t diverge. Some reconciliation ' +
      'programs became **unnecessary** for exactly this reason.\n\n' +
      '**A single source of line items.** FI, CO, asset, and material values all ' +
      'meet in {{ACDOCA}}; an FI–CO mismatch became **structurally impossible**.\n\n' +
      '**Real-time reporting.** Because totals are calculated, overnight batch ' +
      'jobs are no longer needed ({{gomulu-analitik}}).\n\n' +
      '**Richer dimensions.** {{ACDOCA}} carries every dimension on every line: ' +
      'ledger, profit center, segment, functional area, and up to eight currencies.',

    sirketOnemi:
      'For a company, S/4HANA isn\'t a **software upgrade** — it\'s a change in ' +
      'reporting capability.\n\n' +
      'A concrete example: in ECC, the question *"what was vendor aging as of last ' +
      'Wednesday?"* was **practically unanswerable**, because that day\'s totals ' +
      'table was never stored. In S/4HANA it\'s calculated from the line items.\n\n' +
      '---\n\n' +
      '**But the most common misconception sits right here:**\n\n' +
      '*"S/4HANA is fast, so our reports will get faster."*\n\n' +
      '**No.** Your custom reports that read the old tables ' +
      '({{z-gelistirme}}) now run through a {{uyumluluk-view}} — ' +
      'and that **can be slower**, because a table that used to sit ready ' +
      'is now **calculated on every call**.\n\n' +
      '**Speed comes in proportion to how much code gets adapted.** ' +
      'This is the most often-forgotten line item in a migration budget, ' +
      'and as you\'ll see in the real scenario, it isn\'t only a performance ' +
      'matter either.',

    gercekHayat:
      'An executive asks: *"What do we gain by moving to S/4HANA?"*\n\n' +
      'A weak answer: *"It\'ll be faster, the interface will be modern, ' +
      '{{ACDOCA}} is a single table."*\n\n' +
      'That answer isn\'t technical or persuasive — and its first claim is only ' +
      '**conditionally true**.\n\n' +
      '---\n\n' +
      '**A strong answer is three concrete changes:**\n\n' +
      '**1.** *"Part of your month-end reconciliation steps will **disappear** — ' +
      'an FI–CO mismatch is no longer possible."*\n\n' +
      '**2.** *"You\'ll be able to ask questions you can\'t ask today: ' +
      'the balance as of any past date, broken down by any dimension — ' +
      'because the total isn\'t stored, it\'s calculated."*\n\n' +
      '**3.** *"But some of your existing custom reports will **slow down if ' +
      'they aren\'t adapted**, and some will **silently produce the wrong ' +
      'result**. That\'s a line item in the migration budget."*\n\n' +
      'The third point turns the answer from a sales pitch into **consulting**.',

    muhasebeMantigi:
      'From an accounting standpoint, **nothing changed**: double-entry, ' +
      'the debit–credit balance, {{mutabakat-hesabi}} logic, ' +
      'period close — all the same.\n\n' +
      'What changed is **where these records are stored**.\n\n' +
      '---\n\n' +
      '**When a vendor invoice was posted in ECC:**\n\n' +
      '{{BKPF}} header · {{BSEG}} items · {{BSIK}} open-item copy · ' +
      '{{LFC1}} vendor balance · {{GLT0}}/{{FAGLFLEXT}} G/L totals · ' +
      '`COEP` CO line\n\n' +
      '**The same invoice in S/4HANA:**\n\n' +
      '{{BKPF}} header · {{ACDOCA}} items — **that\'s it.**\n\n' +
      '---\n\n' +
      '**The practical result for accountants:** the *"the trial balance and the ' +
      'detail don\'t match"* problem **is gone**. Because the trial balance is now ' +
      'calculated **from the line-item detail itself**, not from a separate table.\n\n' +
      '**But one thing did change, and it matters:** in {{BSEG}}, amounts ' +
      'were **always positive**, with direction held in a separate field ' +
      '(`SHKZG`: S debit / H credit). In {{ACDOCA}} amounts are **signed** — ' +
      'a credit is negative.\n\n' +
      'This doesn\'t change the accounting logic, but it changes **every query**. ' +
      'It\'s this topic\'s most expensive detail, and you\'ll run into it in the ' +
      'scenario.',

    kavramlar: ['bellek-ici', 'toplam-tablosu', 'evrensel-kayit-defteri',
                'uyumluluk-view', 'is-ortagi', 'gomulu-analitik', 'fiori', 'merkezi-finans'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'A document\'s **journey** is what shows the difference between ECC and ' +
      'S/4HANA most concretely. The same invoice, the same accounting — ' +
      'a different number of stops.',

    roller:[
      { rol:'User', gorev:'Enters the invoice — the screen is **the same** ({{FB60}} or {{fiori}}).' },
      { rol:'System', gorev:'Validation and account determination — **unchanged**.' },
      { rol:'System', gorev:'Writes the {{BKPF}} header — **unchanged**.' },
      { rol:'System', gorev:'Writes the items to **{{ACDOCA}}** — a single table.' },
      { rol:'System', gorev:'**Doesn\'t write** totals tables — they no longer exist.' },
      { rol:'System', gorev:'**Doesn\'t write** index tables — they are now views.' },
      { rol:'System', gorev:'**Doesn\'t write a separate** CO line — the same line carries the CO fields.' },
      { rol:'User', gorev:'Pulls the {{FBL1N}} item list — **calculated** from the line items.' },
      { rol:'User', gorev:'Pulls the {{FS10N}} balance — calculated from **the same line items**.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The same invoice, two architectures',
      adimlar:[
        { ic:'📝', rol:'User', baslik:'The invoice is entered',
          aciklama:'The screen and the accounting logic **haven\'t changed**. ' +
                   'Tax code, account determination, validation rules — all the same.',
          cikti:'A posting request', ok:'gets validated' },
        { ic:'🧾', rol:'System', baslik:'{{BKPF}} — the document header',
          aciklama:'Document number, date, document type, currency. ' +
                   '**This table hasn\'t changed.**',
          cikti:'Header record', ok:'items are written' },
        { ic:'⭐', rol:'System', baslik:'{{ACDOCA}} — **the single item table**',
          aciklama:'FI items, CO objects, the asset dimension, ledger, segment, ' +
                   'functional area, and **up to eight currencies** — ' +
                   'all on **the same line**.\n\n' +
                   'Amounts are **signed**: a credit is negative.',
          cikti:'Item lines', ok:'in ECC it would have continued' },
        { ic:'🚫', rol:'Existed in ECC', baslik:'{{BSIK}} / {{BSID}} — the open-item copy',
          aciklama:'In ECC, the same item was written a **second time under a ' +
                   'different key**: the {{BSEG}} key starts with the document ' +
                   'number, the {{BSIK}} key starts with `LIFNR`.\n\n' +
                   'In S/4HANA it **isn\'t written** — these became {{uyumluluk-view}}s.',
          cikti:'—', ok:'and would have continued' },
        { ic:'🚫', rol:'Existed in ECC', baslik:'{{GLT0}} / {{FAGLFLEXT}} — the totals tables',
          aciklama:'Balances by account and period used to be **pre-calculated** ' +
                   'and stored.\n\n' +
                   'They had two downsides: they took up space and ' +
                   'could **diverge from the line items**.\n\n' +
                   'In S/4HANA they **aren\'t written** — the balance is calculated ' +
                   'from the line items.',
          cikti:'—', ok:'and would have continued' },
        { ic:'🚫', rol:'Existed in ECC', baslik:'`COEP` — a separate CO line',
          aciklama:'The same expense used to be recorded **a second time** on the ' +
                   'CO side, and could diverge from FI; that\'s why a reconciliation ' +
                   'ledger existed.\n\n' +
                   'In S/4HANA the same {{ACDOCA}} line carries **both FI and CO** ' +
                   'fields → divergence is **impossible**.',
          cikti:'—', ok:'the read side' },
        { ic:'📊', rol:'User', baslik:'{{FBL1N}} item list · {{FS10N}} balance',
          aciklama:'**Both are calculated from the same source** ({{ACDOCA}}).\n\n' +
                   'This is why the *"the trial balance and the detail don\'t ' +
                   'match"* problem **disappeared structurally**.',
          cikti:'A consistent report', ok:'old code?' },
        { ic:'⚠️', rol:'Custom code', baslik:'If {{z-gelistirme}} reads the old table',
          aciklama:'The {{uyumluluk-view}} kicks in: the query runs, but ' +
                   'the result is **calculated at read time**.\n\n' +
                   '**It isn\'t free**, and because the `SHKZG` semantics ' +
                   'changed, it can **silently** produce the wrong result.',
          cikti:'Code that needs adapting' },
      ],
    },

    adimlar:[
      { rol:'User', eylem:'Enters the invoice', sistem:'{{FB60}} / {{fiori}} — **same**' },
      { rol:'System', eylem:'Writes the header', sistem:'{{BKPF}} — **same**' },
      { rol:'System', eylem:'Writes the items', sistem:'{{ACDOCA}} — **a single table**' },
      { rol:'System', eylem:'Writes no totals', sistem:'No {{GLT0}} / {{FAGLFLEXT}}' },
      { rol:'System', eylem:'Writes no index', sistem:'{{BSIK}} / {{BSID}} are views' },
      { rol:'System', eylem:'Writes no CO line', sistem:'The same line carries CO' },
      { rol:'User', eylem:'Pulls a report', sistem:'All calculated from {{ACDOCA}}' },
    ],

    veriAkisi:{
      nereden:'User entry or integrated modules (MM, SD, AA).',
      nereye:'{{BKPF}} + {{ACDOCA}} — and nowhere else.',
      tetikleyen:'Every accounting posting.',
      sonraki:'Reports and {{gomulu-analitik}} read from the same lines.',
    },

    notlar:[
      { tip:'tip', baslik:'An architectural lesson: once a constraint disappears, the solution becomes unnecessary', metin:
        'The shortest way to understand S/4HANA is to look not at **what was ' +
        'added, but at what was removed**.\n\n' +
        '---\n\n' +
        '**What the removed items have in common:** each one was a **performance ' +
        'workaround**.\n\n' +
        '| Structure | Why it existed | Why it became unnecessary |\n' +
        '|---|---|---|\n' +
        '| {{toplam-tablosu}} | Calculating a balance was expensive | Now cheap |\n' +
        '| Index tables | Scanning by a different key was expensive | Now cheap |\n' +
        '| Reconciliation ledger | Two copies could diverge | Only one copy exists |\n' +
        '| Overnight batch jobs | Reports needed prep work | Calculated instantly |\n\n' +
        '---\n\n' +
        '**A general principle — not just for SAP:** a significant part of the ' +
        'complexity in a system is the leftover of a constraint that no longer ' +
        'applies.\n\n' +
        'That\'s why the answer to *"why was it built this way?"* is usually ' +
        '*"the hardware of the time didn\'t allow anything else"* — ' +
        'and once the constraint disappears, **the solution needs re-examining ' +
        'too**.\n\n' +
        'But removing it **isn\'t free**: everything tied to the old structure ' +
        '(custom code, screens, habits) needs to be adapted. ' +
        'The {{uyumluluk-view}} **postpones** that cost — it doesn\'t eliminate it.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The accounting logic hasn\'t changed; the postings below would be ' +
      'identical in ECC. What changed is **where they get written** — and, as ' +
      'with the last two postings, **how many times they get written**.',

    etkilenenHesaplar:[
      { hesap:'770 General administrative expenses', tur:'Income statement', neden:'In S/4 the G/L account **and** the {{masraf-turu}} are one object.' },
      { hesap:'320 Trade payables', tur:'Balance sheet — Liability', neden:'{{acik-kalem}}; there\'s no more {{BSIK}} copy.' },
      { hesap:'191 Deductible VAT', tur:'Balance sheet — Asset', neden:'The tax logic hasn\'t changed ({{BSET}} still exists).' },
      { hesap:'257 Accumulated depreciation', tur:'Balance sheet — Asset (−)', neden:'Every {{amortisman-alani}} writes **to its own ledger** in real time.' },
    ],

    fisler:[
      { baslik:'① Vendor invoice — **same posting, fewer tables**',
        belgeTuru:'KR', tarih:'14.05.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expenses', borc:50000,
            not:'profit center 4100 · functional area · segment' },
          { hesap:'191', ad:'Deductible VAT 20%', borc:10000 },
          { hesap:'320', ad:'Trade payables — consulting', alacak:60000 },
        ],
        not:'**In ECC this posting would write to six tables:**\n\n' +
             '{{BKPF}} · {{BSEG}} (3 lines) · {{BSIK}} (open-item copy) · ' +
             '{{LFC1}} (vendor balance) · {{GLT0}}/{{FAGLFLEXT}} (G/L totals) · ' +
             '`COEP` (CO line)\n\n' +
             '**In S/4HANA it writes to two tables:**\n\n' +
             '{{BKPF}} · {{ACDOCA}} (3 lines)\n\n' +
             'And those three {{ACDOCA}} lines carry **every dimension** that ' +
             'used to be spread across six tables in ECC: ledger, cost center, ' +
             'segment, functional area, the CO object, and up to eight ' +
             'currencies.\n\n' +
             '**A critical detail:** the `320` line\'s amount sits in {{ACDOCA}} ' +
             'as **−60,000**. In {{BSEG}} it was +60,000 with `SHKZG = H`.' },

      { baslik:'② FI–CO divergence — **now impossible**',
        belgeTuru:'KR', tarih:'20.05.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — cost center 4100', borc:120000 },
          { hesap:'320', ad:'Trade payables', alacak:120000 },
        ],
        not:'**This posting\'s biggest innovation in S/4HANA doesn\'t show — ' +
             'because the innovation is something *not happening*.**\n\n' +
             '**In ECC:** the expense line was written **separately** to FI\'s ' +
             '{{BSEG}} and CO\'s `COEP`. The two records were supposed to always ' +
             'match in theory; in practice they could diverge (a period ' +
             'mismatch, an update error, reposting done on the CO side). ' +
             'That\'s why a reconciliation ledger and monthly control steps ' +
             'existed.\n\n' +
             '**In S/4HANA:** a single {{ACDOCA}} line carries both the ' +
             '`RACCT` (G/L account) and `RCNTR` (cost center) fields. There are ' +
             'no two records to diverge.\n\n' +
             '**Practical result:** the "FI–CO reconciliation" step in your ' +
             'month-end checklist **should be deleted**. If it\'s still there, ' +
             'time is being wasted on it every month for nothing (see ' +
             '{{konu:best-practices}}).' },

      { baslik:'③ Depreciation — **local ledger (0L)**',
        belgeTuru:'AF', tarih:'31.05.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Depreciation expense — VUK, 5 years', borc:100000 },
          { hesap:'257', ad:'Accumulated depreciation', alacak:100000 },
        ],
        not:'In New Asset Accounting, **{{amortisman-alani}} = ledger**. ' +
             'The local area (01) writes to the {{lider-defter}} (`0L`).\n\n' +
             'This posting was the same in ECC too — the difference is in the ' +
             'next one.' },

      { baslik:'④ The same asset, **IFRS ledger (2L)** — real time',
        belgeTuru:'AF', tarih:'31.05.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Depreciation expense — IFRS, 8 years', borc:62500 },
          { hesap:'257', ad:'Accumulated depreciation', alacak:62500 },
        ],
        not:'**This is where New Asset Accounting\'s real change is.**\n\n' +
             '**In ECC:** only area 01 posted to FI in real time. ' +
             'The other areas (IFRS, tax) were transferred **periodically**, ' +
             'mostly through **delta** postings. So the IFRS ledger was ' +
             '**incomplete** mid-month, and no report could be pulled ' +
             'until a separate program ran.\n\n' +
             '**In S/4HANA:** every depreciation area writes **to its own ' +
             'ledger, in real time**, with the **full amount**. The delta logic ' +
             'is gone.\n\n' +
             '**Practical result:** the IFRS report is **correct** on any day ' +
             'of the month. There\'s no need to wait for month-end.\n\n' +
             'But note: the same asset carries a **different balance** in the ' +
             'two ledgers (100,000 and 62,500 in this posting). That\'s ' +
             '**normal**, and it\'s the asset-side counterpart of the principle ' +
             'described in {{konu:parallel-ledger}}.' },
    ],

    tHesaplar:[
      { hesap:'Accumulated depreciation — **leading ledger 0L**', kod:'257 · VUK',
        borc:[],
        alacak:[{ ad:'May depreciation (5 years)', tutar:100000 }],
        not:'Per local statutory rules — {{amortisman-alani}} 01' },
      { hesap:'Accumulated depreciation — **IFRS ledger 2L**', kod:'257 · IFRS',
        borc:[],
        alacak:[{ ad:'May depreciation (8 years)', tutar:62500 }],
        not:'**Real time** — in ECC this was periodic and delta-based' },
    ],

    notlar:[
      { tip:'err', baslik:'The SHKZG trap — the topic\'s most expensive detail', metin:
        'The accounting logic hasn\'t changed, but **how the amount is stored** ' +
        'has. That single difference affects every migrated query.\n\n' +
        '---\n\n' +
        '**{{BSEG}} — the old world**\n\n' +
        'Amounts are **always positive** (`DMBTR`). ' +
        'Direction is stored in a separate field: `SHKZG` = **S** (debit) or ' +
        '**H** (credit).\n\n' +
        'To sum a total, the direction logic is applied **by hand**:\n' +
        '`IF SHKZG = "H". amount = amount * -1. ENDIF.`\n\n' +
        '**{{ACDOCA}} — the new world**\n\n' +
        'Amounts are **signed** (`HSL`): a credit is stored as **negative**. ' +
        'No extra logic is needed to sum — it\'s summed directly.\n\n' +
        '---\n\n' +
        '**The danger:** when an old query is migrated to the new table and ' +
        'the `SHKZG` logic **isn\'t removed**, the sign gets applied **twice**. ' +
        'Credit lines flip back to positive and the totals become ' +
        'meaningless — often coming out **close to zero**.\n\n' +
        '**And this error is silent:** the program doesn\'t crash, ' +
        'it **produces the wrong number**. The report looks empty or odd; ' +
        'if nobody compares it against the trial balance, it can go unnoticed ' +
        'for months.\n\n' +
        'In the real scenario, that\'s exactly what happened.' },

      { tip:'warn', baslik:'The cost element merged with the G/L account', metin:
        'In ECC, an expense was two separate objects: the **G/L account** ' +
        '({{SKA1}}) and the **{{masraf-turu}}** ({{CSKB}}). They were opened and ' +
        'maintained separately — and could become **inconsistent**: if the ' +
        'G/L account existed but the cost element didn\'t, no CO record was ' +
        'created.\n\n' +
        '**In S/4HANA there\'s a single object:** the cost element is a ' +
        '**type of the G/L account** (chosen in {{FS00}}: primary cost or ' +
        'revenue, secondary cost, balance sheet, etc.).\n\n' +
        '**Three practical consequences:**\n\n' +
        '**1.** Opening a cost element is now **the same as opening a G/L ' +
        'account** — two steps became one.\n' +
        '**2.** **Ownership changed:** the chart of accounts used to belong ' +
        'to accounting, cost elements to controlling. Now there\'s a ' +
        '**single list**, and who owns it **must be explicitly decided**.\n' +
        '**3.** In a {{brownfield}} migration this **requires preparation**: ' +
        'cost elements that don\'t line up **stop the conversion** ' +
        '(see {{konu:migration}}).' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Instead of memorizing the innovations, it\'s enough to sort them into ' +
      '**four clusters**. Three are the direct consequence of the thesis; the ' +
      'fourth (interface and deployment) is independent of it.',

    liste:[
      /* --- CLUSTER 1: DATA ARCHITECTURE --- */
      { ad:'Universal Journal',
        aciklama:'The single source of line items for FI, CO, asset, and material values.',
        neZaman:'On every accounting posting — no exceptions.',
        ornek:'**What merged:** {{BSEG}} (FI items) · `COEP` (CO lines) · ' +
              '{{ANLC}} (asset values) · material valuation\n\n' +
              '**What every line carries:** ledger (`RLDNR`) · G/L account ' +
              '(`RACCT`) · cost center (`RCNTR`) · profit center (`PRCTR`) · ' +
              'segment · functional area · **up to eight currencies**\n\n' +
              '**The biggest payoff isn\'t speed, it\'s consistency:** ' +
              'an FI–CO divergence is **structurally impossible**.\n\n' +
              'Amounts are **signed** — unlike {{BSEG}}.',
        tcodes:['FAGLL03','SE16N'] },

      { ad:'Removed Aggregates',
        aciklama:'Balances that used to be pre-calculated and stored.',
        neZaman:'Never anymore — the balance is calculated from the line items.',
        ornek:'**What was removed:** {{GLT0}} (classic G/L totals) · ' +
              '{{FAGLFLEXT}} (New G/L totals) · ' +
              '{{KNC1}} / {{LFC1}} (customer / vendor balances)\n\n' +
              '**Why they existed:** reading from disk and summing was ' +
              'expensive.\n\n' +
              '**Why they became unnecessary:** on an {{bellek-ici}} database, ' +
              'calculating the same total on the fly is fast enough.\n\n' +
              '**The payoff isn\'t only space:** a stored total could ' +
              '**diverge** from the line items; a calculated total can\'t.',
        tcodes:['FS10N'] },

      { ad:'Removed Index Tables',
        aciklama:'A second copy of the same item under a different key.',
        neZaman:'Never anymore — they became {{uyumluluk-view}}s.',
        ornek:'**Open items:** {{BSIK}} (vendor) · {{BSID}} (customer) · {{BSIS}} (G/L)\n' +
              '**Cleared items:** {{BSAK}} · {{BSAD}} · {{BSAS}}\n\n' +
              '**Why they existed:** the {{BSEG}} key starts with the ' +
              '**document number**; a vendor-based query would scan the whole ' +
              'table. The {{BSIK}} key starts with `LIFNR` (see ' +
              '{{konu:sap-tables}}).\n\n' +
              '**They can be read but NOT WRITTEN.** An old load program that ' +
              'tries to write to them **fails** — an open item is now created ' +
              '**by the posting itself**.',
        tcodes:['FBL1N','FBL5N'] },

      /* --- CLUSTER 2: MASTER DATA --- */
      { ad:'Business Partner',
        aciklama:'Vendor and customer merged into one object; the party type is now a **role**.',
        neZaman:'On every vendor/customer transaction.',
        ornek:'**What the problem was:** if the same company was both a vendor ' +
              'and a customer, it had **two separate records** in {{LFA1}} and ' +
              '{{KNA1}}; the address was held in two places and could **drift ' +
              'apart** over time.\n\n' +
              '**The fix:** one identity ({{BUT000}}), many roles.\n\n' +
              '**A commonly missed point:** company-code data **didn\'t ' +
              'disappear** — it still lives in {{LFB1}} / {{KNB1}}, and ' +
              '`AKONT` ({{mutabakat-hesabi}}) is there too. What changed is ' +
              '**the identity layer**.\n\n' +
              'In a {{brownfield}} migration, {{cvi}} conversion is a ' +
              '**prerequisite** and one of the steps projects most often run ' +
              'late on.',
        tcodes:['BP','XK01'] },

      { ad:'Cost Element in G/L',
        aciklama:'The {{masraf-turu}} stopped being a separate object; it became the G/L account\'s **type**.',
        neZaman:'When opening an expense account.',
        ornek:'ECC: {{SKA1}} (G/L) + {{CSKB}} (cost element) → **two objects, ' +
              'two steps**\n' +
              'S/4: an **account type** is chosen in {{FS00}} → **one object, ' +
              'one step**\n\n' +
              '**An ownership question arises:** the chart of accounts used to ' +
              'belong to accounting, cost elements to controlling. Now there\'s ' +
              'a single list — who owns it **must be explicitly decided**.\n\n' +
              'In a brownfield migration, cost elements that don\'t line up ' +
              '**stop the conversion**.',
        tcodes:['FS00'] },

      /* --- CLUSTER 3: PROCESS --- */
      { ad:'New Asset Accounting',
        aciklama:'{{amortisman-alani}} = ledger; every area writes **in real time** to its own ledger.',
        neZaman:'On every depreciation run.',
        ornek:'**ECC:** only area 01 posted to FI in real time. ' +
              'The others were transferred **periodically**, through **delta** ' +
              'postings — the IFRS ledger was **incomplete** mid-month.\n\n' +
              '**S/4:** every area writes **the full amount, instantly**, to ' +
              'its own ledger. The delta logic **is gone**.\n\n' +
              'Also, **planned depreciation is calculated on the fly** — ' +
              'not from a total stored in {{ANLC}}. That\'s why the {{AW01N}} ' +
              'asset explorer is always current.\n\n' +
              'A single {{AFAB}} run feeds **every ledger** at once ' +
              '(see {{konu:parallel-ledger}}).',
        tcodes:['AFAB','AW01N'] },

      { ad:'Embedded Analytics',
        aciklama:'Reporting runs directly **on top of transactional data**, with no extraction.',
        neZaman:'Whenever real-time reporting is needed.',
        ornek:'Its technical foundation is {{cds-view}}s: data **isn\'t ' +
              'copied**, it\'s read through defined views.\n\n' +
              '**The practical result is that the lag disappears:** the ' +
              'classic setup runs an extraction overnight and the report is ' +
              'correct the next day. With embedded analytics, the report shows ' +
              '**current** data.\n\n' +
              'It doesn\'t **fully replace** a data warehouse: combining ' +
              'multiple source systems and a very long history still need a ' +
              'separate solution.',
        tcodes:['FGI0'] },

      /* --- CLUSTER 4: INTERFACE AND DEPLOYMENT --- */
      { ad:'SAP Fiori',
        aciklama:'A role-based web interface; a user layer that replaces the classic screens.',
        neZaman:'In user-experience design.',
        ornek:'**Fiori is not "the GUI with a new look."**\n\n' +
              'The classic screen was **transaction**-centric: many tasks on ' +
              'one screen ({{FB60}} enters, parks, and uses templates all at ' +
              'once).\n' +
              'Fiori is **task**-centric: one app, one job.\n\n' +
              '**It has two consequences for a consultant:**\n\n' +
              '**1.** Role design is now also **interface design** — ' +
              'a user only sees the apps in their role.\n' +
              '**2.** Many Fiori apps call the **same** transaction code in ' +
              'the background — the configuration you already know **applies ' +
              'exactly as before**.\n\n' +
              'Classic transactions weren\'t removed — they can still be ' +
              'launched from the launchpad.' },

      { ad:'Central Finance',
        aciklama:'Source systems stay in place; **copies** of documents flow into a central S/4HANA.',
        neZaman:'In multi-system groups, to break a migration into pieces.',
        ornek:'The source systems (SAP or non-SAP) keep running; ' +
              'the central system is fed only for **reporting and ' +
              'consolidation**.\n\n' +
              'It\'s the way to move group reporting into S/4HANA without ' +
              'shutting down a single company code; the conversion itself is ' +
              'postponed.\n\n' +
              'It\'s not a migration, it\'s a **bridge**: it doesn\'t work ' +
              'without mapping set up (chart of accounts, company code, cost ' +
              'object), and that mapping needs **ongoing maintenance**.' },
    ],

    karsilastirmaBasliklar:['ECC', 'S/4HANA'],
    karsilastirma:[
      ['FI items', '{{BSEG}}', '**{{ACDOCA}}**'],
      ['CO lines', '`COEP` — **a separate record**', 'On the same {{ACDOCA}} line'],
      ['FI–CO divergence', 'Possible — needs reconciliation', '✓ **Structurally impossible**'],
      ['G/L balances', '{{GLT0}} / {{FAGLFLEXT}} **stored**', '**Calculated**'],
      ['Open items', '{{BSIK}} / {{BSID}} physical table', '{{uyumluluk-view}} — **not writable**'],
      ['Amount sign', 'Always positive + `SHKZG`', '**Signed** (credit negative)'],
      ['Vendor / customer', '{{LFA1}} / {{KNA1}} independent', '**{{is-ortagi}} mandatory**'],
      ['Cost element', '{{CSKB}} — a separate object', 'The G/L account\'s **type**'],
      ['Depreciation areas', 'Only 01 in real time', '**All of them** in real time'],
      ['Currencies', '2 (+ extra fields)', '**Up to 8**'],
      ['Reporting', 'Separate warehouse / overnight extract', '{{gomulu-analitik}} — live'],
      ['Accounting logic', 'Double-entry', '**Same — unchanged**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    anlatim:
      'S/4HANA introduced few genuinely **new** transaction codes; the real ' +
      'change is that some **disappeared**, and for others **the table behind ' +
      'them** changed. The three codes in this section answer three separate ' +
      'questions the topic raises: *where is the data* ({{SE16N}}), *why is it ' +
      'slow* ({{SAT}}), *what state is the ledger in* ({{FINSC_LEDGER}}).',

    liste:[
      { kod:'SE16N', ad:'Table display — through S/4 eyes',
        amac:'Displays a table\'s content; the fastest way to tell whether ' +
             'something in S/4HANA is a **view or a table**.',
        neZaman:'For diagnosis — *"where does this data actually live?"*',
        adimlar:[
          { baslik:'Look at {{ACDOCA}} — the real item table',
            aciklama:'Filter a document with `RBUKRS` + `GJAHR` + `BELNR`.' },
          { baslik:'Pay attention to the `HSL` field — a **signed** amount',
            aciklama:'Credit lines are **negative**. That wasn\'t the case in {{BSEG}}.' },
          { baslik:'Look at {{BSIK}} — the same data, through a **view**',
            aciklama:'A result comes back but it\'s calculated behind the scenes from {{ACDOCA}}.' },
          { baslik:'Compare: the same item, **opposite sign**, in two places',
            aciklama:'This is the proof of why migrated queries break.' },
          { baslik:'Confirm the object type with {{SE11}} — table or view?' },
        ],
        ekranAkisi:[
          { ekran:'{{ACDOCA}}', islem:'Document 1900004417 → 3 lines · `HSL`: +50,000 · +10,000 · **−60,000**' },
          { ekran:'{{BSIK}}', islem:'The same vendor item → amount **+60,000**, `SHKZG` = **H**' },
          { ekran:'Takeaway', islem:'**Same item, two different representations** — query logic must account for this' },
          { ekran:'{{SE11}}', islem:'{{BSIK}} → object type: **view** (not a table)' },
        ],
        alanlar:{
          zorunlu:['Table/view name'],
          opsiyonel:['Filter fields','Output layout'] },
        hatalar:[
          { mesaj:'A program trying to write to {{BSIK}} throws an error', sebep:'It\'s now a **view** — it can\'t be written to.', cozum:'An open item is created **by the posting itself**; the program needs adapting.' },
          { mesaj:'The query result differs from what ECC produced', sebep:'`SHKZG` semantics — the amount is **signed** in {{ACDOCA}}.', cozum:'Remove the direction logic from the migrated query; otherwise the sign gets applied twice.' },
          { mesaj:'Reading from the view is very slow', sebep:'A {{uyumluluk-view}} is **calculated** at read time.', cozum:'Critical programs are migrated to {{ACDOCA}}. The view is a **bridge**, not a permanent fix.' },
        ],
        ipucu:'**{{SE16N}} isn\'t handed to end users** — its authorization ' +
              'checks are weak and raw data is misleading (see ' +
              '{{konu:sap-tables}}).\n\n' +
              'For a consultant, though, it\'s indispensable for one thing: ' +
              'seeing the same item side by side in {{ACDOCA}} and {{BSIK}} ' +
              'and **verifying the sign difference by eye**.',
        ilgili:['SE11','SE16H','FAGLL03'] },

      { kod:'SAT', ad:'Runtime analysis',
        amac:'Measures where a program spends its time (formerly SE30).',
        neZaman:'Post-migration, on the *"why did it get slower?"* question.',
        adimlar:[
          { baslik:'Find the suspect program in {{SM37}} — the longest-running jobs' },
          { baslik:'Take a measurement with {{SAT}} — using **real data**' },
          { baslik:'Separate out database time: which table/view is being read?' },
          { baslik:'Confirm with an {{ST05}} SQL trace — see the actual query generated',
            aciklama:'A {{uyumluluk-view}} read shows up **clearly** here.' },
          { baslik:'Decide: is a view being read, and should it move to {{ACDOCA}}?' },
        ],
        ekranAkisi:[
          { ekran:'{{SM37}}', islem:'The 3 longest closing jobs: all `Z_FI_*` programs' },
          { ekran:'{{SAT}}', islem:'**86% of the time** is in the database' },
          { ekran:'{{ST05}}', islem:'The query hits {{BSIS}} → {{ACDOCA}} gets scanned behind it' },
          { ekran:'Decision', islem:'Three programs migrated directly to {{ACDOCA}}' },
          { ekran:'Measurement', islem:'Closing dropped from **4.5 days to 2 days**' },
        ],
        alanlar:{
          zorunlu:['Program or transaction'],
          opsiyonel:['Variant','Measurement scope'] },
        hatalar:[
          { mesaj:'The measurement doesn\'t reflect reality', sebep:'The test data set is small.', cozum:'Measure with **real volume**; on small data a compatibility view looks cheap.' },
          { mesaj:'Most of the time is on the ABAP side', sebep:'Row-by-row reading inside a loop.', cozum:'Read in bulk. Looping reads through a view are **much more expensive** in S/4 than they were in ECC.' },
        ],
        ipucu:'**After a migration, the first question in any performance ' +
              'complaint is: "which table is this program reading?"**\n\n' +
              'If the answer is a {{uyumluluk-view}}, the problem is found. ' +
              'Views are a **bridge** — they make the migration possible, ' +
              'not a permanent fix.',
        ilgili:['ST05','SM37','SE16N'] },

      { kod:'FINSC_LEDGER', ad:'Ledger definitions',
        amac:'Manages ledgers, currencies, and company-code assignments.',
        neZaman:'During setup, and when reviewing the ledger structure.',
        adimlar:[
          { baslik:'List the ledgers — the {{lider-defter}} `0L` and any additional ledgers' },
          { baslik:'Look at the currency columns — **up to eight**',
            aciklama:'In ECC there were two (plus extra fields).' },
          { baslik:'Check the company-code assignments' },
          { baslik:'The ledger structure is a {{tek-yonlu-kapi}}',
            aciklama:'History **isn\'t written** into a ledger opened later (see {{konu:best-practices}}).' },
        ],
        ekranAkisi:[
          { ekran:'Ledger list', islem:'`0L` (leading, statutory) · `2L` (IFRS)' },
          { ekran:'Currencies', islem:'TRY local · EUR group · **6 slots empty**' },
          { ekran:'Asset link', islem:'{{amortisman-alani}} 01 → `0L` · 32 → `2L`' },
          { ekran:'Result', islem:'A single {{AFAB}} run feeds **both ledgers at once**' },
        ],
        alanlar:{
          zorunlu:['Ledger code','Company code assignment','Currencies'],
          opsiyonel:['Fiscal year variant (per ledger)'] },
        hatalar:[
          { mesaj:'The IFRS report comes out incomplete', sebep:'The ledger assignment or {{amortisman-alani}} bridge is missing.', cozum:'Check the area → ledger mapping in {{OADB}}.' },
          { mesaj:'We opened a new ledger but there\'s no history', sebep:'**Expected behavior** — the ledger structure is a one-way door.', cozum:'History can\'t be written retroactively. That\'s why ledgers are opened **from the start**; an unused ledger is essentially free.' },
        ],
        ipucu:'**An empty currency slot is free; a currency added later ' +
              'stays empty in the past.**\n\n' +
              'The same principle applies to ledgers — ' +
              'this is the most concrete S/4HANA application of the ' +
              '*"when in doubt, open it, don\'t use it"* rule from ' +
              '{{konu:best-practices}}.',
        ilgili:['FAGLL03','OADB','AFAB'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'This topic\'s table section is really **the topic itself**: ' +
      'all of S/4HANA is a table-architecture decision.\n\n' +
      'Reading order: first what **arrived** ({{ACDOCA}}), then what **was ' +
      'removed** ({{GLT0}}, {{BSIK}}), and finally what **stayed** ({{BKPF}}, ' +
      '{{LFB1}}).',

    liste:[
      { ad:'ACDOCA', baslik:'Universal Journal — the single source of line items',
        tutar:'FI items + CO objects + the asset dimension + material valuation.',
        olusturan:'**Every** transaction that produces an accounting posting',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'Header in {{BKPF}}; the old tables are produced from here as {{uyumluluk-view}}s.',
        s4:'**New and central.** Never written directly — every line arises from a posting.',
        alanlar:[
          { ad:'RLDNR', aciklama:'**Ledger** — the first part of the key; this is where parallel ledgers separate' },
          { ad:'RACCT', aciklama:'G/L account' },
          { ad:'RCNTR', aciklama:'Cost center — **not in a separate CO table, right here**' },
          { ad:'PRCTR', aciklama:'Profit center' },
          { ad:'HSL', aciklama:'Local currency amount — **SIGNED**, credit negative' },
          { ad:'DRCRK', aciklama:'Debit/credit indicator — informational only; **the amount is already signed**' },
        ] },

      { ad:'GLT0', baslik:'The removed totals table — why it existed, why it\'s gone',
        tutar:'Classic G/L: balances **pre-calculated** by account and period.',
        olusturan:'Used to be updated with every FI posting in ECC',
        anahtar:'BUKRS + RACCT + RYEAR',
        iliskiler:'A summary of {{BSEG}} items in ECC.',
        s4:'**A {{uyumluluk-view}}** — readable, not writable. The balance is calculated from {{ACDOCA}}.',
        alanlar:[
          { ad:'HSL01–HSL16', aciklama:'Balance by period — **16 columns**; this structure existed to speed up calculation' },
          { ad:'RACCT', aciklama:'Account' },
          { ad:'Lesson', aciklama:'A stored total **can diverge**; a calculated total can\'t' },
        ] },

      { ad:'BSIK', baslik:'The removed index table — the key question',
        tutar:'Open vendor items — a **second copy** of the same item.',
        olusturan:'Used to be written on every vendor posting in ECC',
        anahtar:'LIFNR + BUKRS + BELNR',
        iliskiler:'The vendor-based copy of {{BSEG}} in ECC.',
        s4:'**A view** — readable, **not writable**.',
        alanlar:[
          { ad:'LIFNR', aciklama:'**The first part of the key** — this was the reason it existed: {{BSEG}} starts with the document number' },
          { ad:'SHKZG', aciklama:'Debit/credit — the amount is **positive**, direction is here. Not so in {{ACDOCA}}' },
          { ad:'ZFBDT', aciklama:'Baseline date for payment' },
        ] },

      { ad:'BUT000', baslik:'Business Partner — the new identity layer',
        tutar:'General data for the {{is-ortagi}}.',
        olusturan:'{{BP}} or {{cvi}} conversion',
        anahtar:'PARTNER',
        iliskiler:'Company-code data still lives in {{LFB1}} / {{KNB1}}.',
        s4:'**Mandatory.** Even {{XK01}}/{{XD01}} write here in the background.',
        alanlar:[
          { ad:'PARTNER', aciklama:'Business partner number' },
          { ad:'TYPE', aciklama:'Person / Organization / Group' },
          { ad:'Note', aciklama:'`AKONT` is **not here** — it\'s in {{LFB1}}. The identity layer and the company-code data are separate' },
        ] },

      { ad:'MATDOC', baslik:'The same pattern, outside FI',
        tutar:'Material documents — a single table in S/4.',
        olusturan:'{{MIGO}} and every transaction that produces a stock movement',
        anahtar:'MBLNR + MJAHR + ZEILE',
        iliskiler:'The MM counterpart of the **same architectural decision** as {{ACDOCA}} on the FI side.',
        s4:'New. Outside this topic\'s scope, but it **proves the pattern**.',
        alanlar:[
          { ad:'MBLNR', aciklama:'Material document' },
          { ad:'Lesson', aciklama:'MKPF + MSEG + MARD + MBEW merged; totals are **calculated** — the same principle as FI' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'What stayed, what was removed, what arrived',
      varliklar:[
        { ad:'ACDOCA', rol:'Hub', hub:true, aciklama:'**The single source of line items** — FI + CO + AA',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'RLDNR', tip:'pk' }, { ad:'RACCT' }, { ad:'HSL' }] },
        { ad:'BKPF', rol:'Stayed', aciklama:'Document header — **unchanged**',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'BSIK', rol:'View', aciklama:'**Not writable** — produced from {{ACDOCA}}',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'SHKZG' }] },
        { ad:'GLT0', rol:'View', aciklama:'The total is **calculated**, not stored',
          alanlar:[{ ad:'RACCT', tip:'fk' }, { ad:'HSL' }] },
        { ad:'BUT000', rol:'New', aciklama:'The **{{is-ortagi}}** identity',
          alanlar:[{ ad:'PARTNER', tip:'pk' }] },
        { ad:'LFB1', rol:'Stayed', aciklama:'Company-code data — `AKONT` is **still here**',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'AKONT' }] },
      ],
      iliskiler:[
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'header → items' },
        { from:'ACDOCA', to:'BSIK', alanlar:'—', not:'the view is **produced from here**' },
        { from:'ACDOCA', to:'GLT0', alanlar:'—', not:'the total is **calculated**' },
        { from:'BUT000', to:'LFB1', alanlar:'PARTNER', not:'{{cvi}} mapping' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Most screens in S/4HANA are **the same**. Three things change for a ' +
      'consultant: vendors/customers are now opened with {{BP}}, when looking ' +
      'at tables you ask whether it\'s a **view or a table**, and the ledger ' +
      'structure is managed through {{FINSC_LEDGER}}.',

    ekranlar:[
      { ad:'{{BP}} — Business Partner',
        aciklama:'The **single** maintenance screen for both vendor and customer.',
        alanlar:[
          { ad:'Business partner role', zorunlu:true, aciklama:'Vendor, customer, or **both**. ' +
                   'Adding a role isn\'t opening a new record.' },
          { ad:'Company-code data', zorunlu:true, aciklama:'Still a separate layer — ' +
                   '`AKONT` ({{mutabakat-hesabi}}) is here.' },
          { ad:'Numbering', zorunlu:true, aciklama:'The business partner number doesn\'t ' +
                   '**have to match** the vendor number — the strategy is chosen up front.' },
        ],
        ipucu:'{{XK01}}/{{XD01}} still work but write to {{BUT000}} through ' +
              '{{cvi}} in the background. **{{BP}} is the only correct entry ' +
              'path.**' },

      { ad:'{{SE16N}} — "table or view?"',
        aciklama:'The starting point for diagnosis.',
        alanlar:[
          { ad:'`HSL` sign', zorunlu:false, aciklama:'In {{ACDOCA}} a credit is **negative**. ' +
                   'That single observation explains why migrated queries break.' },
          { ad:'Object type', zorunlu:false, aciklama:'Confirmed with {{SE11}}: ' +
                   'is it a table or a {{uyumluluk-view}}?' },
        ],
        ipucu:'Seeing the same item side by side in {{ACDOCA}} and {{BSIK}} is ' +
              'the fastest way to explain the `SHKZG` difference.' },

      { ad:'{{FINSC_LEDGER}} — ledger and currency',
        aciklama:'A single-screen view of the ledger structure.',
        alanlar:[
          { ad:'Ledgers', zorunlu:true, aciklama:'The {{lider-defter}} `0L` plus any additional ledgers.' },
          { ad:'Currencies', zorunlu:false, aciklama:'**Up to eight**. ' +
                   'An empty slot is free; a currency added later stays ' +
                   '**empty** in the past.' },
        ],
        ipucu:'The ledger structure is a {{tek-yonlu-kapi}} — ' +
              'history **isn\'t written** into a ledger opened later.' },
    ],

    zorunlu:['Using {{is-ortagi}}','The ledger structure','The chart of accounts (cost elements included)'],
    opsiyonel:['{{fiori}} launchpad','{{gomulu-analitik}}','{{merkezi-finans}}'],

    hatalar:[
      { mesaj:'Program can\'t write to {{BSIK}}', sebep:'It\'s now a **view**.', cozum:'An open item is created **through the posting**; the load program needs adapting.' },
      { mesaj:'A migrated report gives the wrong total (close to zero)', sebep:'The `SHKZG` logic was applied **twice** — the {{ACDOCA}} amount is already signed.', cozum:'Remove the direction logic from the query. This error is **silent**: the program doesn\'t crash, it just produces the wrong number.' },
      { mesaj:'Closing took longer after the migration', sebep:'Custom programs are reading a {{uyumluluk-view}}.', cozum:'Measure with {{SAT}}/{{ST05}}; migrate the critical programs to {{ACDOCA}}.' },
      { mesaj:'"Cost element not found"', sebep:'In S/4 a cost element isn\'t a separate object — it\'s the G/L account\'s **type**.', cozum:'Check the account type in {{FS00}}.' },
      { mesaj:'Vendor can\'t be opened — "business partner mandatory"', sebep:'Using {{is-ortagi}} is mandatory.', cozum:'Open it with {{BP}}. In a {{brownfield}} migration, {{cvi}} must already be complete.' },
      { mesaj:'The IFRS ledger looks incomplete mid-month', sebep:'An ECC habit — periodic transfer used to be required there.', cozum:'In S/4 it\'s **real time**; if it\'s incomplete, check the ledger/{{amortisman-alani}} assignment ({{OADB}}).' },
      { mesaj:'We added a new currency but the past is empty', sebep:'Expected behavior.', cozum:'It isn\'t filled in retroactively. Currency slots are opened **from the start**.' },
    ],

    ipuclari:[
      'Remember the thesis: **"instead of storing the total, calculate it"** — everything else follows from that.',
      'Amounts in {{ACDOCA}} are **signed**; **remove** the `SHKZG` logic from any migrated query.',
      '{{uyumluluk-view}}s are readable, **not writable** — and they **aren\'t free**.',
      'The first question post-migration: *"which table is this program reading?"*',
      'Take the FI–CO reconciliation step **out of** the closing checklist.',
      '{{is-ortagi}} is the single entry path; company-code data still lives in {{LFB1}}.',
      'A cost element is now the G/L account\'s **type** — clarify ownership.',
      'Every {{amortisman-alani}} writes **in real time**; the IFRS report is correct every day.',
      'Open currency and ledger slots **from the start** — the past can\'t be filled in later.',
      '{{fiori}} uses the same configuration behind the scenes; what you know **applies as-is**.',
      'The sentence "S/4HANA is fast" is true **in proportion to how much code was adapted**.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Document header — **unchanged**' },
      { tablo:'ACDOCA', ne:'Items — FI + CO + AA **on a single line**' },
      { tablo:'BSIK', ne:'Now a **view** — not written' },
      { tablo:'GLT0', ne:'Now a **view** — the total is calculated' },
      { tablo:'BUT000', ne:'The {{is-ortagi}} identity' },
      { tablo:'LFB1', ne:'Company-code data — **stayed**' },
    ],

    commit:
      'The LUW logic at posting time **hasn\'t changed**: FI and CO still run ' +
      'in the same unit of work. What changed is **how many tables get ' +
      'written**.\n\n' +
      'Because fewer tables are written, the surface area for an ' +
      '{{guncelleme-hatasi}} also **narrowed**: previously, if the totals ' +
      'table failed to update, the line items and the balance would diverge. ' +
      'Now there\'s no second place to diverge into.\n\n' +
      'But checking {{SM13}} is **still necessary** — an update error hasn\'t ' +
      'disappeared, only its consequence got less destructive.',

    belgeNo:
      'Document numbering **hasn\'t changed**: the {{BKPF}} header is the ' +
      'same, number ranges are the same, and the fiscal year is still part of ' +
      'the key.\n\n' +
      'What changed is item numbering: in {{BSEG}}, `BUZEI` was ' +
      '**three digits** (a 999-item limit). In {{ACDOCA}}, `DOCLN` is ' +
      '**six digits** — necessary because document splitting and multi-ledger ' +
      'postings produce far more lines.\n\n' +
      'Custom programs that hit the old `BUZEI` limit need to account for ' +
      'this difference.',

    postingLogic:
      'The posting logic stayed the same **layer by layer**:\n\n' +
      '**1.** Validation and {{konu:dogrulama-ikame}} rules — same\n' +
      '**2.** Account determination ({{T030}}, {{OBYC}}, {{VKOA}}) — same\n' +
      '**3.** Tax calculation ({{BSET}}) — same\n' +
      '**4.** {{belge-bolme}} — same logic, the result gets written into {{ACDOCA}}\n' +
      '**5.** Writing — **this is where it changed**: a single table\n\n' +
      '**That\'s why your FI configuration knowledge applies exactly as ' +
      'before.** S/4HANA isn\'t a new accounting system — it\'s the same ' +
      'accounting, **stored differently**.',

    belgeTuru:
      'Document type logic hasn\'t changed. The one difference: because ' +
      '{{ACDOCA}} lines multiply **by ledger**, the same document produces ' +
      'lines in multiple ledgers, and `RLDNR` is part of the key.\n\n' +
      'So `BELNR` + `DOCLN` alone **doesn\'t identify** a line — `RLDNR` is ' +
      'needed too. This is a detail custom reports often miss, and it ' +
      '**multiplies amounts by the number of ledgers** when they do.',

    accountDetermination:
      'The account-determination tables **remain exactly as they were**: ' +
      '{{T030}}, {{OBYC}}, {{VKOA}}, {{T030K}}, {{T074}}.\n\n' +
      'The one meaningful change is on the cost-element side: ' +
      'the **account type** is chosen when the G/L account is opened, ' +
      'replacing what used to be done in {{CSKB}} in ECC.\n\n' +
      'In a {{brownfield}} migration this is a preparation step: ' +
      'cost elements that don\'t line up **stop the conversion**.',

    tur:
      '**Four clusters, one cause:**\n\n' +
      '**① Data architecture** — {{ACDOCA}}, the removed {{toplam-tablosu}}s ' +
      'and index tables. The direct consequence of the thesis.\n\n' +
      '**② Master data** — {{is-ortagi}}, the cost-element merge. ' +
      'The same unification logic applied to master data.\n\n' +
      '**③ Process** — New Asset Accounting, {{gomulu-analitik}}. ' +
      'Things that became real-time once calculation got cheap.\n\n' +
      '**④ Interface and deployment** — {{fiori}}, the cloud editions, ' +
      '{{merkezi-finans}}. **This cluster is independent of the thesis** and ' +
      'is evaluated separately.',

    transport:
      'The transport mechanism **hasn\'t changed** ({{SE09}}, {{STMS}}, ' +
      '{{E070}}/{{E071}}). The {{akim-verisi}} concept also remains exactly ' +
      'as it was.\n\n' +
      'The only thing that changed is **how much code needs transporting**: ' +
      'the {{z-gelistirme}} inventory is no longer just a maintenance burden — ' +
      'it\'s a **migration blocker** that shows up in the ' +
      '{{basitlestirme-listesi}} (see {{konu:best-practices}}).',

    img:[
      { yol:'FINSC_LEDGER → Ledger and currency definitions', not:'**A one-way door**' },
      { yol:'FS00 → Account type (cost element)', not:'Replaces ECC\'s CSKB' },
      { yol:'BP → Business partner role definitions', not:'Together with {{cvi}} mapping' },
      { yol:'OADB → Depreciation-area-to-ledger bridge', not:'Real-time posting comes from here' },
    ],

    ekstra:[
      { ic:'⚖️', baslik:'SHKZG → HSL: the cost of a single field', metin:
        'This is the S/4HANA migration\'s **cheapest-looking, most expensive** ' +
        'detail.\n\n' +
        '---\n\n' +
        '**The old world — {{BSEG}}.`DMBTR`**\n\n' +
        'The amount is **always positive**. Direction is a separate field: ' +
        '`SHKZG` = S / H.\n\n' +
        'ABAP code to calculate a vendor balance used to look like this:\n\n' +
        '`LOOP AT items. IF SHKZG = "H". total = total - DMBTR. ` ' +
        '`ELSE. total = total + DMBTR. ENDIF. ENDLOOP.`\n\n' +
        '**The new world — {{ACDOCA}}.`HSL`**\n\n' +
        'The amount is **signed**. Credit is already negative. The total is:\n\n' +
        '`SELECT SUM( HSL ) FROM ACDOCA WHERE ...`\n\n' +
        '---\n\n' +
        '**Now watch the trap:** the old program gets migrated to {{ACDOCA}} ' +
        'but the `SHKZG` block **isn\'t deleted**. What happens?\n\n' +
        'The credit line is already −60,000. The program says *"it\'s a ' +
        'credit, so subtract"* and turns it into **+60,000**. The debit lines ' +
        'get summed too.\n\n' +
        '**Result: the debits and credits cancel each other out and the ' +
        'total comes out close to zero.**\n\n' +
        '**And this error is silent:**\n\n' +
        '• The program **doesn\'t crash** — no dump\n' +
        '• The query **runs** — no error message\n' +
        '• The result **looks plausible** — especially in control reports, ' +
        'a near-zero difference reads as "everything ties out"\n\n' +
        'This is the S/4HANA-migration-specific form of the **② silent ' +
        'error** class described in {{konu:error-handling}}, and in the real ' +
        'scenario it went unnoticed for eight months.\n\n' +
        '**The safeguard is a one-line check:** every migrated report\'s ' +
        'total is compared **once**, after go-live, against the {{FS10N}} ' +
        'trial balance.' },

      { ic:'🌉', baslik:'A compatibility view is a bridge, not a solution', metin:
        '{{uyumluluk-view}}s are what **makes the migration possible** — ' +
        'thousands of custom programs that read the old tables keep running ' +
        'after the migration.\n\n' +
        'But two things go **unsaid**, and both matter:\n\n' +
        '---\n\n' +
        '**1. They aren\'t free.**\n\n' +
        'In ECC, {{BSIS}} was a **physical table** with its own index. ' +
        'In S/4HANA the same name is a **view** and gets **calculated** from ' +
        '{{ACDOCA}} on every call.\n\n' +
        'A one-off query won\'t notice the difference. But if it\'s called ' +
        '**inside a loop**, the cost multiplies — and old ABAP code is used ' +
        'to reading inside a loop.\n\n' +
        '**2. They aren\'t a one-to-one match.**\n\n' +
        'The view keeps the field **names**, but {{ACDOCA}}\'s semantics ' +
        'are different. `SHKZG` is the most visible example — ' +
        'but not the only one: the ledger dimension (`RLDNR`) ' +
        'was **never present** in old queries either, and if it\'s ignored, ' +
        'amounts get **multiplied by the number of ledgers**.\n\n' +
        '---\n\n' +
        '**The correct use:** views make everything work on the ' +
        '**first day** of go-live. After that, critical programs ' +
        '(closing, reconciliation, statutory reports) are **measured** and ' +
        'migrated to {{ACDOCA}}.\n\n' +
        'The ones not migrated can stay — but they should stay ' +
        '**deliberately**, not because they were forgotten.' },

      { ic:'🔢', baslik:'Eight currencies, and the "an empty slot is free" rule', metin:
        'In ECC, a company code carried **two** currencies ' +
        '(local plus up to two optional parallel fields). {{ACDOCA}} ' +
        'carries **up to eight**.\n\n' +
        'This looks like a technical capacity increase. It\'s actually ' +
        'an **ease-of-decision** change.\n\n' +
        '---\n\n' +
        '**Why it matters:** currency is a {{tek-yonlu-kapi}}. ' +
        'A currency added later **stays empty in past records** — ' +
        'meaning it\'s useless for reporting.\n\n' +
        'In ECC there were two slots and both were usually full; ' +
        'the question *"will we need a group currency?"* was debated ' +
        'under a real constraint.\n\n' +
        'In S/4HANA the question got easier: **an empty slot is free.** ' +
        'If there\'s a chance it\'ll be needed, open it and leave it unused.\n\n' +
        'The same principle applies to ledgers: an unused ' +
        '{{ifrs}} ledger is nearly free; ' +
        'a ledger opened later has **no history**.\n\n' +
        'This is the most concrete application of the ' +
        '*"when in doubt, open it, don\'t use it"* rule from ' +
        '{{konu:best-practices}}.' },
    ],

    notlar:[
      { tip:'tip', baslik:'What S/4HANA did NOT change — and why that\'s good news', metin:
        'The biggest time-waster in migration projects is ' +
        '**assuming that things that didn\'t change, changed too**.\n\n' +
        '---\n\n' +
        '**Everything that stayed exactly the same:**\n\n' +
        '• Double-entry and the debit–credit balance\n' +
        '• {{mutabakat-hesabi}} logic and `AKONT` (in {{LFB1}})\n' +
        '• Account-determination tables ({{T030}}, {{OBYC}}, {{VKOA}}, {{T030K}})\n' +
        '• Tax logic and {{BSET}}\n' +
        '• {{belge-bolme}} rules\n' +
        '• The {{konu:dogrulama-ikame}} rule engine ({{GGB0}}, {{OB28}}, {{GGB4}})\n' +
        '• Period close ({{OB52}}) and the closing sequence\n' +
        '• {{BKPF}}, document types, number ranges\n' +
        '• Transport discipline ({{SE09}}, {{STMS}}, {{akim-verisi}})\n' +
        '• {{acik-kalem}} management and clearing logic\n\n' +
        '---\n\n' +
        '**So the bulk of your FI knowledge carries over directly.** ' +
        'What needs learning isn\'t new accounting — ' +
        'it\'s **where the data sits** and what that means for queries.\n\n' +
        'That every innovation in this topic traces back to **this one ' +
        'sentence** is itself the thesis.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Because this topic is itself about S/4HANA, this section looks ' +
      '**one level up**: the differences between S/4HANA\'s own **editions**, ' +
      'and when each one is chosen.',

    eccFarklari:[
      { konu:'Deployment', ecc:'On-premise only', s4:'On-premise · Private cloud · **Public cloud**' },
      { konu:'Configuration access', ecc:'Full {{SPRO}}', s4:'**Restricted** in the public cloud — guided configuration' },
      { konu:'{{z-gelistirme}}', ecc:'Unrestricted', s4:'**Extension only** in the public cloud — no modification' },
      { konu:'Version upgrade', ecc:'Customer\'s choice', s4:'**Mandatory and regular** in the public cloud' },
      { konu:'Data migration tool', ecc:'{{LSMW}}', s4:'{{LTMC}} — the **only path** in the public cloud' },
      { konu:'Turkish localization', ecc:'Add-ons and custom development common', s4:'Add-ons **restricted** in the cloud — {{konu:e-donusum}} needs planning' },
      { konu:'Accounting logic', ecc:'Same', s4:'**Same across all three editions**' },
    ],

    universalJournal:
      '{{evrensel-kayit-defteri}} is **identical across all three deployment ' +
      'models**. The difference between cloud and on-premise isn\'t in the ' +
      'data model — it\'s in **freedom of access and change**.\n\n' +
      'That\'s good news for learning: {{ACDOCA}} knowledge ' +
      'holds regardless of which edition you\'re working in.',

    kalkanTcodes:[
      { eski:'Reports reading {{GLT0}}', yeni:'{{FAGLL03}} / {{FS10N}}', not:'Same result, from {{ACDOCA}}' },
      { eski:'FI–CO reconciliation programs', yeni:'**Unnecessary**', not:'Structurally impossible' },
      { eski:'{{XK01}} / {{XD01}} (as the only path)', yeni:'**{{BP}}**', not:'The old ones still work, but {{BP}} is the only correct path' },
      { eski:'{{CSKB}} cost-element maintenance', yeni:'{{FS00}} account type', not:'A single object' },
      { eski:'Periodic depreciation transfer', yeni:'**Real time**', not:'Every ledger, instantly' },
    ],

    fiori:[
      { ad:'Manage Journal Entries', aciklama:'Posting entry and display; ' +
             'the **same** configuration behind it.' },
      { ad:'Trial Balance', aciklama:'An {{gomulu-analitik}} example — ' +
             'the trial balance comes from **live data**, no extraction.' },
      { ad:'Display Line Items', aciklama:'The counterpart of {{FBL1N}}/{{FBL5N}}; ' +
             'items are read from {{ACDOCA}}.' },
      { ad:'Custom Fields and Logic', aciklama:'Adding fields without modification — ' +
             'reduces the {{z-gelistirme}} burden (see {{konu:best-practices}}).' },
    ],

    compatibilityViews:[
      '**The same rule holds across all three deployment models:** old ' +
      'tables are read as a {{uyumluluk-view}}, **never written**.',
      'In the public cloud, raw table access through {{SE16N}} is also ' +
      '**restricted** — diagnostic habits change; {{cds-view}}s and Fiori ' +
      'apps are used instead.',
      'Views make the migration possible but **aren\'t a permanent fix**: ' +
      'critical programs get measured and migrated to {{ACDOCA}}.',
    ],

    performans:
      '**The most common misconception in this topic:** *"S/4HANA is fast, ' +
      'so everything will speed up."*\n\n' +
      'The reality has three parts:\n\n' +
      '**1. Standard transactions** — generally get faster; totals-table ' +
      'updates are gone.\n\n' +
      '**2. Standard reports** — get faster; they read directly from ' +
      '{{ACDOCA}}.\n\n' +
      '**3. Custom programs** — **can slow down if they aren\'t adapted**. ' +
      'Code that reads the old tables runs through a {{uyumluluk-view}} ' +
      'and the result is calculated at read time.\n\n' +
      '**Don\'t guess without measuring:** measure with {{SAT}} and {{ST05}} ' +
      'at **real volume**. On small test data a compatibility view looks ' +
      'cheap and misleads you.',

    bestPractices:[
      'Learn the thesis, not the list: **"instead of storing the total, calculate it."**',
      '**Remove** the `SHKZG` logic from every migrated query.',
      'Compare every migrated report against {{FS10N}} **once**, after go-live.',
      '**Take FI–CO reconciliation out of** the closing checklist.',
      'Measure critical programs with {{SAT}} in the first 30 days after go-live.',
      'Open ledger and currency slots **from the start**.',
      'Decide the {{is-ortagi}} numbering strategy **before** the migration.',
      'Clarify **who owns** the cost-element list (accounting or controlling).',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'"We migrated but closing got longer" — and a report that was wrong for eight months',
    hikaye:
      '**Trakya Cam Sanayi Inc.** migrated to S/4HANA using the {{brownfield}} ' +
      'approach. The conversion was technically clean; users recognized their ' +
      'screens, and the accounting worked the same way.\n\n' +
      'One of the justifications given to management was: ' +
      '*"month-end closing will get shorter."*\n\n' +
      '---\n\n' +
      'A measurement was taken at the end of the first three months:\n\n' +
      '**Closing before: 3 days**\n' +
      '**Closing after: 4.5 days**\n\n' +
      'Closing hadn\'t gotten shorter — it had **gotten longer**.\n\n' +
      'The CFO fairly asked: ' +
      '*"Wasn\'t this supposed to be fast?"*',
    veriler:[
      { k:'Approach', v:'{{brownfield}} — system conversion' },
      { k:'Number of custom programs', v:'**214** (`Z_FI_*`)' },
      { k:'Closing — before', v:'3 days' },
      { k:'Closing — after', v:'**4.5 days**' },
      { k:'Expectation', v:'Shorter' },
      { k:'Error message', v:'**None** — everything runs' },
    ],

    adimlar:[
      { baslik:'Where is the time going?', tcode:'SM37',
        aciklama:'Start with measurement — not a guess.',
        girdi:[
          { alan:'Closing jobs', deger:'**41 background jobs** total' },
          { alan:'Top 3 longest', deger:'**71%** of the total time' },
          { alan:'Type of those three', deger:'All custom programs (`Z_FI_*`)' },
          { alan:'Standard jobs', deger:'✓ All **got faster**' },
        ],
        not:'**The first finding confirms the thesis.**\n\n' +
             'Standard jobs ({{AFAB}}, {{F.05}}, {{FAGLGVTR}}) really had ' +
             '**gotten faster** — the totals-table updates were gone.\n\n' +
             'Only the **custom programs** had slowed down, and ' +
             'they were taking most of the time.\n\n' +
             'So the sentence *"S/4HANA is fast"* was true; ' +
             'what was missing was its second half: **"for adapted code."**' },

      { baslik:'What are these three programs doing?', tcode:'SAT',
        aciklama:'Runtime analysis.',
        girdi:[
          { alan:'Time distribution', deger:'**86% in the database**' },
          { alan:'Z_FI_MIZAN', deger:'Reads {{BSIS}}' },
          { alan:'Z_FI_YASLANDIRMA', deger:'Reads {{BSIK}}' },
          { alan:'Z_FI_MUTABAKAT', deger:'Reads {{BSAS}}' },
          { alan:'Common point', deger:'**All three are {{uyumluluk-view}}s**' },
        ],
        not:'**The problem is found.**\n\n' +
             'In ECC, {{BSIS}} was a **physical table** with its own index; ' +
             'reading it was cheap.\n\n' +
             'In S/4HANA the same name is a **view** and gets **calculated** ' +
             'from {{ACDOCA}} on every call.\n\n' +
             'And all three programs were doing this **inside a loop** — ' +
             'an old ABAP habit. A cost that wouldn\'t register on a single ' +
             'query got multiplied across thousands of calls.\n\n' +
             'An {{ST05}} SQL trace confirmed it: every call generated ' +
             'a full {{ACDOCA}} scan.' },

      { baslik:'Migrating the programs turned up one more thing', tcode:'SE16N',
        aciklama:'Z_FI_MIZAN is migrated to {{ACDOCA}} — and the result is compared.',
        girdi:[
          { alan:'New version\'s result', deger:'Total debit 84,200,000' },
          { alan:'Old version\'s result', deger:'Total debit **1,340,000**' },
          { alan:'{{FS10N}} trial balance', deger:'84,200,000 ✓' },
          { alan:'Conclusion', deger:'**The old report had been wrong for eight months**' },
        ],
        not:'**The real finding was here — and no one was looking for it.**\n\n' +
             'The program applied `SHKZG` logic when reading {{BSIS}}: ' +
             '*"if it\'s a credit, subtract it."* That was correct in ECC, ' +
             'because amounts were **always positive**.\n\n' +
             'The {{uyumluluk-view}} **preserves** this field, but the amount ' +
             'already comes from {{ACDOCA}} and is **signed**.\n\n' +
             'Result: the sign gets applied to credit lines **twice**, ' +
             'flipping them positive, and they cancel out against the ' +
             'debits. The total comes out **close to zero**.\n\n' +
             '**Why it went unnoticed for eight months:**\n\n' +
             '• The program **didn\'t crash** — no dump\n' +
             '• The query **ran** — no error message\n' +
             '• It was a **control** report, and a near-zero difference ' +
             'read as *"everything ties out"*\n' +
             '• Nobody **compared** the result against the {{FS10N}} trial balance' },

      { baslik:'What was done?', tcode:'FAGLL03',
        aciklama:'Fix and sweep.',
        girdi:[
          { alan:'Step 1', deger:'Three programs migrated to {{ACDOCA}}' },
          { alan:'Closing', deger:'Dropped from **4.5 days to 2 days**' },
          { alan:'Step 2', deger:'**All 214 programs** swept' },
          { alan:'Using `SHKZG`', deger:'**31 programs**' },
          { alan:'Producing wrong results', deger:'**9 programs**' },
          { alan:'Step 3', deger:'Every migrated report **compared** against {{FS10N}}' },
        ],
        not:'Closing came in even better than expected: **from 3 days to ' +
             '2**. So the S/4HANA promise was true — **once the code was ' +
             'adapted**.\n\n' +
             'But that wasn\'t the real payoff: the sweep found **nine ' +
             'wrong reports**. Three of them were used in management ' +
             'reporting.\n\n' +
             'The permanent safeguard became a one-line rule:\n\n' +
             '**"Every report migrated to S/4HANA is compared against the ' +
             '{{FS10N}} trial balance on its first run."**\n\n' +
             'That check takes five minutes and would have caught eight of ' +
             'the nine reports in the first month.' },
    ],

    sonuc:
      '**There were two separate errors in this scenario, and one hid the ' +
      'other.**\n\n' +
      'The visible error was **performance**, and it got complained about. ' +
      'The invisible error was **the wrong report**, and nobody complained ' +
      'for eight months — because the report produced a number, and the ' +
      'number looked plausible.\n\n' +
      '---\n\n' +
      '**Three lasting lessons:**\n\n' +
      '**1. The removed table wasn\'t brought back — it was imitated.**\n' +
      'And an imitation promises neither of two things: being **free** and ' +
      'being a **one-to-one match**.\n\n' +
      'It isn\'t free, because it\'s calculated at read time. ' +
      'It isn\'t a one-to-one match, because the `SHKZG` semantics changed.\n\n' +
      '**And the second difference is silent** — the first one produces a ' +
      'complaint, the second doesn\'t.\n\n' +
      '**2. The sentence "S/4HANA is fast" has a missing half.**\n' +
      'The whole sentence is: **"fast, for adapted code."** ' +
      'For code that hasn\'t been adapted, the {{uyumluluk-view}} is a ' +
      '**bridge** — it makes the migration possible, it doesn\'t make it ' +
      'free.\n\n' +
      'That\'s why adapting code is a line item in the migration budget, ' +
      'not a post-go-live surprise.\n\n' +
      '**3. Every migrated report needs a validation point.**\n' +
      'A five-minute comparison (against the {{FS10N}} trial balance) ' +
      'would have caught eight of the nine wrong reports in the first ' +
      'month.\n\n' +
      'This is the concrete form of the principle in {{konu:best-practices}}: ' +
      '**every silent-error class gets turned into a control query.**\n\n' +
      '---\n\n' +
      'And note: nothing found in this scenario required **new SAP ' +
      'knowledge**. All that was needed was knowing the topic\'s thesis — ' +
      '**"the total is no longer stored, it\'s calculated"** — and asking ' +
      'what that does to queries.',
  },

  },
});
