/* ==========================================================================
   content/fi-en/best-practices.js: English body for "Best Practices"
   Same conventions as content/fi-en/gl-accounting.js: see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'best-practices',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Say "best practice" and a list usually comes to mind: write documentation, ' +
      'test things, keep transport requests small.\n\n' +
      'Those lists are true and **useless**: because they all say the same thing: ' +
      '*"be careful"*. Being careful is not a method.\n\n' +
      '---\n\n' +
      '**This topic\'s thesis:**\n\n' +
      '**Configuration decisions split into two: the ones you can undo, and the ' +
      'ones *sealed by data*. All of a project\'s risk comes from not knowing the ' +
      'second list.**\n\n' +
      'Because in SAP no setting is marked *"cannot be changed."* They all look the ' +
      'same in {{SPRO}}, all open just as easily. The difference only shows up ' +
      '**once data has been written on top of it**:\n\n' +
      '• A wrong {{odeme-kosulu}} → you change it, done.\n' +
      '• {{belge-bolme}} set up switched off → **cannot be turned on afterward.**\n\n' +
      'Both are a checkbox. Both sit on the same screen. The difference between them ' +
      'is **five minutes versus your next project**.\n\n' +
      '---\n\n' +
      'The concept that carries this distinction: {{tek-yonlu-kapi}}.',

    neden:
      '**Because the cost of a mistake isn\'t equal.** Giving every decision the same ' +
      'level of care is impossible; a project has thousands of settings. ' +
      'Care has to be **selective**: and pointed at the right place.\n\n' +
      '**Because time pressure is real.** As the go-live date approaches, ' +
      'discussions get shorter. At that point you need to already know which ' +
      'decision can wait for "we\'ll look at it later" and which one can\'t.\n\n' +
      '**Because the client doesn\'t know either.** The sentence *"we don\'t want ' +
      'a segment report for now"* sounds harmless. Turning it into a ' +
      '{{tek-yonlu-kapi}} decision is the consultant\'s job.\n\n' +
      '**Because the system doesn\'t warn you.** {{SPRO}} doesn\'t say ' +
      '*"this can\'t be undone"* when you clear a checkbox.',

    sirketOnemi:
      'For the company, this topic is a matter of **risk management**, ' +
      'not a technical one.\n\n' +
      'The decisions made on an ERP project **outlive** the tenure of the team that ' +
      'made them. Five years later nobody can answer ' +
      '*"why was this built this way?"*: ' +
      'because SAP keeps a record of **what** was done ({{degisiklik-belgesi}}), ' +
      'not **why**.\n\n' +
      '---\n\n' +
      '**The consultant\'s real added value sits in three places:**\n\n' +
      '**1.** Knowing which decision is irreversible **at the moment it\'s made**.\n' +
      '**2.** Asking that decision with the right question: not *"do we want it ' +
      'today?"* but **"is there a chance we\'ll want it within three years?"**\n' +
      '**3.** Writing the answer down **with its reasoning**: because a decision ' +
      'with no rationale looks like a mistake two years later.\n\n' +
      'Anyone can learn a transaction code. These three points aren\'t learned, ' +
      'they\'re **carried**.',

    gercekHayat:
      'In a meeting, the finance director: *"We don\'t want a segment-based balance ' +
      'sheet, we only run one business."*\n\n' +
      'The inexperienced answer: *"OK, we\'ll turn off {{belge-bolme}}."*\n\n' +
      '**The experienced answer is three sentences:**\n\n' +
      '*"All right. But let\'s go into this knowing: once this setting goes live, it ' +
      '**can\'t be turned on** afterward. If there\'s any chance in the next three ' +
      'years of a business-line spin-off, an acquisition, or investor reporting, ' +
      'setting it up open and not using it is **far cheaper** than switching it off ' +
      'and regretting it later. Shall we put this decision in writing?"*\n\n' +
      '---\n\n' +
      'This answer has three deliberate qualities:\n\n' +
      '**It doesn\'t make the decision**: it\'s the client\'s decision to make.\n' +
      '**It adds information**: the "irreversible" fact wasn\'t on the table.\n' +
      '**It puts it in writing**: two years later this reads as a **decision**, ' +
      'not a mistake.',

    muhasebeMantigi:
      'Configuration errors show up in accounting at **three different weights**, ' +
      'and the distinction is critical:\n\n' +
      '**① The posting stops.** Missing account determination, no number range, a ' +
      'closed period. Annoying but **good news**: the error is visible immediately ' +
      'and no wrong data is produced.\n\n' +
      '**② The posting goes through, the trial balance ties, the result is wrong.** ' +
      'A wrong {{mutabakat-hesabi}}, a wrong {{vergi-kodu}}, a validation left at ' +
      'warning level. **This is where the real danger lies.**\n\n' +
      '**③ The posting goes through but can\'t be fixed afterward.** {{belge-bolme}} ' +
      'was set up switched off; the split information on past postings **never ' +
      'came into existence**. Even if you turn the setting on later, past data ' +
      'never gains that information.\n\n' +
      '---\n\n' +
      '**This is the definition of the third class:** even if the setting can be ' +
      'undone, **the data can\'t be**. The reason a setting is a "one-way door" ' +
      'isn\'t the setting itself, it\'s **the data it failed to produce**.\n\n' +
      'That\'s why the question is always the same: *"the data that goes ' +
      'un-produced while this setting is off: can it be filled in retroactively ' +
      'once the setting is turned on?"* If the answer is no, you\'re holding a ' +
      '{{tek-yonlu-kapi}}.',

    kavramlar: ['tek-yonlu-kapi', 'standarda-yakin', 'z-gelistirme', 'badi',
                'akim-verisi', 'tasima-sirasi', 'regresyon-testi', 'negatif-test'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'A configuration change passes through **six stops** from the moment it\'s ' +
      'born until it goes live. Most best practices belong to one of these stops; ' +
      'knowing which one tells you when it applies.',

    roller:[
      { rol:'Business side', gorev:'Describes the need: not the solution.' },
      { rol:'Consultant', gorev:'Asks: **is this a {{tek-yonlu-kapi}}?**' },
      { rol:'Consultant', gorev:'Checks whether a {{standarda-yakin}} option exists.' },
      { rol:'Consultant', gorev:'Writes the decision down **with its reasoning**.' },
      { rol:'Consultant', gorev:'Makes it in the development system, captures it in a {{tasima-istegi}}.' },
      { rol:'Test user', gorev:'**Positive and {{negatif-test}}** in the test system.' },
      { rol:'Consultant', gorev:'{{regresyon-testi}}: did anything **that used to work** break?' },
      { rol:'IT', gorev:'Transports it **in sequence** with {{STMS}} ({{tasima-sirasi}}).' },
      { rol:'Consultant', gorev:'**Verifies** in production: transported ≠ working.' },
      { rol:'Consultant', gorev:'Sets up {{akim-verisi}} tables **separately** in production.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The journey of a configuration change',
      adimlar:[
        { ic:'💬', rol:'Business side', baslik:'A need is born',
          aciklama:'The need usually arrives **already framed as a solution**: ' +
                   '*"put a control on that field."* ' +
                   'The consultant\'s first job is to **separate** the need from the solution.',
          cikti:'A described need', ok:'classify it' },
        { ic:'🚪', rol:'Consultant', baslik:'**Is this a one-way door?**',
          aciklama:'One question: *"if this setting is set up wrong, can it be ' +
                   'undone once data has been written on top of it?"*\n\n' +
                   'If the answer is no, the decision **slows down** and gets put in ' +
                   'writing. If yes, it\'s made quickly and changed later if needed.',
          cikti:'Decision class', ok:'look for a solution' },
        { ic:'🎯', rol:'Consultant', baslik:'Is there a {{standarda-yakin}} solution?',
          aciklama:'The order: **standard setting** → {{badi}} / enhancement → ' +
                   'modification as a **last resort**.\n\n' +
                   'The further down you go, the higher the upgrade cost; ' +
                   '{{z-gelistirme}} isn\'t a cost, it\'s a **debt**.',
          cikti:'Solution approach', ok:'the reasoning gets written' },
        { ic:'📝', rol:'Consultant', baslik:'The decision is written down **with its reasoning**',
          aciklama:'SAP already keeps a record of **what** was done ' +
                   '({{degisiklik-belgesi}}). What it doesn\'t keep is **why**.\n\n' +
                   'Three lines are enough: what it solves · which alternatives were ' +
                   'ruled out · which assumption it rests on.',
          cikti:'Decision record', ok:'it is built' },
        { ic:'🔧', rol:'Consultant', baslik:'It\'s built in the development system',
          aciklama:'The change is captured in a **small, single-purpose** ' +
                   '{{tasima-istegi}}. One big "everything in it" request can\'t be ' +
                   'undone once the sequence is broken.',
          cikti:'{{tasima-istegi}}', ok:'it is tested' },
        { ic:'🧪', rol:'Test', baslik:'Positive **and** {{negatif-test}}',
          aciklama:'Everyone tests the happy path. The real value is in the question ' +
                   '*"is bad data actually being stopped?"*: because controls are ' +
                   '**only visible when they\'re violated**.',
          cikti:'Test result', ok:'regression' },
        { ic:'🔁', rol:'Consultant', baslik:'{{regresyon-testi}}: did anything that used to work break?',
          aciklama:'Configuration in FI is **shared**: when a tax code\'s account ' +
                   'assignment changes, **every process** tied to it is affected.\n\n' +
                   'Scope is decided by {{E071}} dependency, not by guesswork.',
          cikti:'A green core set', ok:'it is transported' },
        { ic:'🚚', rol:'IT', baslik:'Transported **in sequence** with {{STMS}}',
          aciklama:'If {{tasima-sirasi}} is broken, **the old state overwrites the ' +
                   'new one**: and no error message appears.',
          cikti:'The setting in production', ok:'it is verified' },
        { ic:'✓', rol:'Consultant', baslik:'**Verified** in production: transported ≠ working',
          aciklama:'For two reasons: the transport may have returned an error ' +
                   '({{SE09}} log), and **{{akim-verisi}} tables don\'t arrive with ' +
                   'the transport**: {{OB52}}, {{TCURR}} are set up separately in ' +
                   'production.',
          cikti:'A working configuration' },
      ],
    },

    adimlar:[
      { rol:'Business side', eylem:'Describes the need', sistem:'A meeting' },
      { rol:'Consultant', eylem:'Is it a one-way door?', sistem:'A decision: not in the system' },
      { rol:'Consultant', eylem:'Looks for a standard solution', sistem:'{{SPRO}}' },
      { rol:'Consultant', eylem:'Writes the reasoning', sistem:'Decision record' },
      { rol:'Consultant', eylem:'Makes the setting', sistem:'{{SPRO}} · {{tasima-istegi}}' },
      { rol:'Test', eylem:'Positive + negative test', sistem:'Test system' },
      { rol:'Consultant', eylem:'Regression test', sistem:'Core set' },
      { rol:'IT', eylem:'Transports in sequence', sistem:'{{STMS}} · {{SE09}}' },
      { rol:'Consultant', eylem:'Verifies in production', sistem:'{{akim-verisi}} separately' },
    ],

    veriAkisi:{
      nereden:'A business need → a consultant\'s decision → the development system.',
      nereye:'The test system → the production system; content recorded in {{E070}}/{{E071}}.',
      tetikleyen:'A change request or a project configuration plan.',
      sonraki:'Verification in production → setting up {{akim-verisi}} → archiving the decision record.',
    },

    notlar:[
      { tip:'warn', baslik:'"It worked in the test system": three reasons', metin:
        'This sentence is one of the most common complaints a consultant hears, and ' +
        'it almost always comes down to **one of three reasons**:\n\n' +
        '---\n\n' +
        '**1. {{akim-verisi}}: the setting wasn\'t transported because it doesn\'t ' +
        'transport.**\n\n' +
        'Some configuration tables **never** enter a transport request: {{OB52}} ' +
        'period opening, {{TCURR}} exchange rates, dunning run dates. These are ' +
        'set up **separately** in every system.\n\n' +
        'The period was open in the test system, not in production. The setting ' +
        'wasn\'t "not transported": **there was nothing to transport**.\n\n' +
        '**2. {{tasima-sirasi}} was broken.**\n\n' +
        'Two requests touching the same object went in the wrong order; **the old ' +
        'state overwrote the new one** and no error message appeared. ' +
        'Diagnosis: does {{E071}} show a shared object between the two requests?\n\n' +
        '**3. A dependent object wasn\'t transported.**\n\n' +
        'The setting was transported, but the G/L account, tax code, or ' +
        '{{odeme-kosulu}} it depends on wasn\'t. It had been opened by hand in the ' +
        'test system and nobody noticed.\n\n' +
        '---\n\n' +
        '**Diagnostic order:** first ask *"is this table current-state data?"* ' +
        '(the most common cause, the fastest check) → then an {{E071}} conflict → ' +
        'then a dependency.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'How configuration errors carry into accounting is the topic\'s **most ' +
      'concrete** part. All three postings below are **balanced**, the system ' +
      'accepts all three, and all three are the result of a configuration error.\n\n' +
      'What they share: **none of them produces an error message.**',

    etkilenenHesaplar:[
      { hesap:'320 Trade payables', tur:'Balance sheet: liability', neden:'The correct {{mutabakat-hesabi}}.' },
      { hesap:'336 Other miscellaneous payables', tur:'Balance sheet: liability', neden:'Lands here through a wrong `AKONT`.' },
      { hesap:'191 Deductible VAT', tur:'Balance sheet: asset', neden:'A wrong {{vergi-kodu}} inflates this.' },
      { hesap:'770 General administrative expenses', tur:'Income statement', neden:'Posted with the wrong dimension once a warning is bypassed.' },
    ],

    fisler:[
      { baslik:'① A wrong {{mutabakat-hesabi}}: the posting goes through, the balance sheet is wrong',
        belgeTuru:'KR', tarih:'12.03.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'153', ad:'Merchandise', borc:100000 },
          { hesap:'191', ad:'Deductible VAT 20%', borc:20000 },
          { hesap:'336', ad:'Other miscellaneous payables: vendor V-2087', alacak:120000,
            not:'`AKONT` entered wrong' },
        ],
        not:'**The posting is balanced, the system accepted it, no error message appeared.**\n\n' +
             '`336` had been entered in the vendor\'s {{LFB1}}.`AKONT` field. ' +
             'Nobody noticed while the master record was opened, because ' +
             '**SAP doesn\'t know which account is "correct"**: ' +
             'it uses whatever account you entered.\n\n' +
             '**The consequences:**\n\n' +
             '• The vendor line-item report ({{FBL1N}}) looks **correct**: the ' +
             'vendor-level balance ties\n' +
             '• But in {{FS10N}}, `320` is **short**, `336` is **inflated**\n' +
             '• The balance sheet presentation is wrong: it looks like other ' +
             'payables rather than trade payables\n' +
             '• Aging and {{F110}} still run: because open item management is ' +
             'independent of the account\n\n' +
             '**This is why `AKONT` is one of the few fields that must be verified ' +
             'by hand before a load** (see {{konu:migration}}).' },

      { baslik:'② A correction: the setting changes, **the past stays**',
        belgeTuru:'SA', tarih:'31.03.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'336', ad:'Other miscellaneous payables: classification correction', borc:120000 },
          { hesap:'320', ad:'Trade payables', alacak:120000 },
        ],
        not:'**This posting is the heart of the topic.**\n\n' +
             'The `AKONT` in the vendor master can be fixed with {{FK02}}: this is ' +
             'a **two-way door**, it takes five minutes.\n\n' +
             '**But past postings don\'t move.** Postings after the change go to ' +
             '`320`; the earlier ones **stay** in `336`.\n\n' +
             'So the setting can be undone, **the data can\'t**: and a ' +
             'classification correction like the one above is needed.\n\n' +
             'This correction has its own cost too: `336` and `320` are no longer ' +
             '**reconciled at the vendor level**: the correction was done at G/L ' +
             'level, the vendor line items still sit under the old account. The ' +
             'balance sheet is corrected but the bridge between {{FBL1N}} and ' +
             '{{FS10N}} breaks.\n\n' +
             '**General rule:** *"the setting can be changed"* and ' +
             '*"the error can be fixed"* are **not the same thing**.' },

      { baslik:'③ A control left at warning (W) level: silently bypassed',
        belgeTuru:'KR', tarih:'18.04.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expenses: closed cost center', borc:45000 },
          { hesap:'320', ad:'Trade payables: consulting invoice', alacak:45000 },
        ],
        not:'A cost center check had been built with a validation, but the message ' +
             'type was left at **W (warning)**.\n\n' +
             '**A rule built with W gets bypassed by everyone on the first busy day ' +
             'and effectively stops existing.** The user presses Enter, the posting ' +
             'goes through.\n\n' +
             '**Result:** the trial balance is correct, the posting is balanced, the ' +
             'expense hit the right account: but on the CO side it was posted to a ' +
             '**closed cost center** and the budget report broke ({{konu:cost-center}}).\n\n' +
             '**{{OBA5}} is not a "silence the error" tool**: and the reverse is ' +
             'more valuable: **a critical control set to `W` gets changed to `E`.**\n\n' +
             'This distinction has a special test too: a positive test **can\'t ' +
             'see** it. Only {{negatif-test}} catches it: the rule is deliberately ' +
             'violated, and you check whether the system actually **stops** it.' },
    ],

    tHesaplar:[
      { hesap:'Wrong classification: two accounts', kod:'336 / 320',
        borc:[{ ad:'336 correction transfer', tutar:120000 }],
        alacak:[{ ad:'Invoices that went to 336 by mistake', tutar:120000 }],
        not:'The correction was done **at G/L level**; the vendor line items stay under the old account' },
    ],

    notlar:[
      { tip:'err', baslik:'What the three postings share: and why this topic exists', metin:
        'All three postings above are:\n\n' +
        '**balanced**: debit = credit\n' +
        '**accepted by the system**: no error message\n' +
        '**don\'t break the trial balance**: the totals tie\n' +
        'and **all three are wrong**\n\n' +
        '---\n\n' +
        'This is the **configuration-driven** version of the ' +
        '**② silent error** class from {{konu:error-handling}}. The difference is:\n\n' +
        'Most silent errors are a **user** error and affect one document.\n' +
        'A configuration-driven one affects **every document** and ' +
        '**accumulates** until it\'s fixed.\n\n' +
        'In the first posting, the mistake was made once (while opening the master ' +
        'record), but the result repeated **on every single invoice**.\n\n' +
        '**That\'s why the measure of a configuration test isn\'t "does it work?" ' +
        'but "what happens if it\'s used wrong?"**' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'This section is the topic\'s **working list**: which decision is a one-way ' +
      'door, and which isn\'t.\n\n' +
      'The list isn\'t what you memorize: the **test** is:\n\n' +
      '*"If this setting is set up wrong, can it be undone once data has been ' +
      'written on top of it?"*\n\n' +
      'If the answer is **no**, it\'s a one-way door and the decision needs to slow down.',

    liste:[
      /* --- ONE-WAY DOORS --- */
      { ad:'Chart of Accounts',
        aciklama:'The chart of accounts and account numbering structure a company code is tied to.',
        neZaman:'At the start of the project, **once**.',
        ornek:'**Why it can\'t be undone:** every posting writes to an account. ' +
              'Changing the chart of accounts means **migrating every open ' +
              'balance already posted**: in practice it\'s a fresh {{konu:migration}} project.\n\n' +
              'The numbering structure is just as permanent: if you loaded meaning ' +
              'into the account number (`320.01` domestic / `320.02` foreign), ' +
              'splitting it apart later is a **1:n problem** and can\'t be automated.\n\n' +
              '**The question to ask at the right time:** which distinctions do we ' +
              'keep in the account number, and which do we keep in **dimensions** ' +
              '({{kar-merkezi}}, {{is-alani}}, segment)? Dimensions can be added ' +
              'later, the account number can\'t.',
        tcodes:['OB13','FS00'] },

      { ad:'Document Splitting',
        aciklama:'Splitting balance sheet items by cost center / segment.',
        neZaman:'When setting up {{konu:new-gl}}.',
        ornek:'**The topic\'s most classic one-way door.**\n\n' +
              'On documents posted while splitting is off, the split information ' +
              '({{FAGL_SPLINFO}}) **never gets created**. If you turn the setting ' +
              'on later, only **new** documents get split; past data **doesn\'t ' +
              'gain** that information and it can\'t be given to it.\n\n' +
              'Result: a segment balance sheet is only meaningful **from the date ' +
              'it was opened onward**; before that it\'s incomplete and can\'t be compared.\n\n' +
              '**Decision rule:** setting up splitting on and not using it is ' +
              '**far cheaper** than setting it up off and regretting it later.',
        tcodes:['FAGLL03'] },

      { ad:'Company code currency',
        aciklama:'The {{yerel-para-birimi}} and any {{paralel-para-birimi}} currencies.',
        neZaman:'When the company code is opened.',
        ornek:'Every line item is stored in both the transaction and local ' +
              'currency. Changing the local currency means **revaluing all of ' +
              'history**.\n\n' +
              'A parallel currency (group currency) **can\'t be added later**: or ' +
              'rather it can, but it comes in **blank on past postings**, ' +
              'which makes it useless for reporting.\n\n' +
              'If there\'s any chance of needing it, define it **up front**; ' +
              'in S/4HANA {{ACDOCA}} carries up to eight currencies, and leaving ' +
              'a slot empty is cheap.',
        tcodes:['OX02','OBY6'] },

      { ad:'Fiscal Year Variant',
        aciklama:'How many periods the fiscal year has and when it starts.',
        neZaman:'When the company code is opened.',
        ornek:'The period structure is written into the `MONAT` field of every ' +
              'document. Changing the variant makes the **period assignment** on ' +
              'past documents meaningless.\n\n' +
              'The number of {{ozel-donem}}s (13-16) also depends on this, and ' +
              'increasing it later affects the closing structure.',
        tcodes:['OB29'] },

      { ad:'Ledger structure and {{amortisman-alani}}',
        aciklama:'The {{paralel-defter}} setup and the areas inside the {{degerleme-plani}}.',
        neZaman:'At setup.',
        ornek:'A ledger can\'t receive history retroactively: if the IFRS ledger ' +
              'is opened two years later, that ledger simply **has no** IFRS ' +
              'valuation for those two years.\n\n' +
              'The same applies to {{amortisman-alani}}: if a new area is ' +
              'opened, past depreciation **hasn\'t been calculated** in that ' +
              'area, and recalculating it retroactively is only possible, in a ' +
              'limited way, with a special program.\n\n' +
              'If there\'s any chance of needing {{ifrs}}, the ledger is opened ' +
              '**from the start**; an unused ledger costs nothing.',
        tcodes:['FINSC_LEDGER','OADB'] },

      { ad:'The rate on a {{vergi-kodu}} already in use',
        aciklama:'A tax code\'s percentage and account assignment.',
        neZaman:'On a rate change: **a new code is opened, the old one isn\'t changed**.',
        ornek:'A tax code is stored on the document **as a code**, not as a rate. ' +
              'If you change the rate, **past documents get reinterpreted with the ' +
              'new rate** too: filing and correction calculations break.\n\n' +
              '**The correct approach:** a new code is opened (`A1` → `A2`), the ' +
              'old one is closed. This is something every Turkish setup goes ' +
              'through whenever the VAT rate changes ' +
              '(see {{konu:taxes}}).',
        tcodes:['FTXP'] },

      /* --- TWO-WAY DOORS --- */
      { ad:'Payment terms, tolerances, field status: reversible',
        aciklama:'Settings that can always be changed, that don\'t affect the past.',
        neZaman:'As the need arises.',
        ornek:'These are decided **quickly** and changed later if needed:\n\n' +
              '{{odeme-kosulu}} · {{tolerans-grubu}} · {{alan-durumu}} · ' +
              'the dunning procedure · user authorizations · report layouts ({{alv-duzeni}})\n\n' +
              '**Caution:** changing them is free, but **it doesn\'t fix the ' +
              'past**. Correcting a payment term doesn\'t **change** the due date ' +
              'on invoices already posted with the old term: those are corrected ' +
              'one by one.\n\n' +
              'This distinction saves time in practice: most project meeting time ' +
              'gets spent on decisions from this list, while the real risk sits ' +
              '**in the list above**.',
        tcodes:['OBB8','OBA4'] },

      /* --- TRANSPORT --- */
      { ad:'Transport request: small and single-purpose',
        aciklama:'The unit that carries configuration changes between systems.',
        neZaman:'On every configuration change.',
        ornek:'**A good request:** one purpose, a handful of objects, a ' +
              'descriptive text (*"new VAT tax code A2 at 20%"*).\n\n' +
              '**A bad request:** one big request named "FI settings" holding ' +
              'three weeks of everything. When something goes wrong it **can\'t be ' +
              'rolled back**, because the good changes inside it get rolled back too.\n\n' +
              'The {{tasima-sirasi}} rule: requests touching the same object are ' +
              'transported **in release order**. In the wrong order, **the old ' +
              'state overwrites the new one** and no error message appears.\n\n' +
              'The content is visible in {{E071}}; conflict diagnosis is done from there.',
        tcodes:['SE09','STMS'] },

      { ad:'{{akim-verisi}}: configuration that doesn\'t transport',
        aciklama:'Tables changed directly in production, never entering a transport request.',
        neZaman:'Continuously: period opening, exchange rate entry.',
        ornek:'Examples: {{OB52}} period opening/closing · {{TCURR}} exchange rates · ' +
              'dunning run dates.\n\n' +
              '**This is the most common reason for "it worked in the test ' +
              'system"**: the setting wasn\'t "not transported," ' +
              '**there was nothing to transport**.\n\n' +
              'It raises an authorization question: customizing is locked down in ' +
              'production, but write access to current-state tables **has to stay ' +
              'open**. Who gets to write is a deliberate choice: ' +
              'authorization for {{OB52}} is the **only** technical backing period ' +
              'discipline has.',
        tcodes:['OB52','SM30'] },

      /* --- TESTING --- */
      { ad:'{{negatif-test}}: the real value is here',
        aciklama:'A test that verifies the system **blocks** what shouldn\'t be allowed.',
        neZaman:'Every time a control is built: **no exceptions**.',
        ornek:'Everyone tests the happy path. But a control is ' +
              '**only visible when it\'s violated**.\n\n' +
              '**What to test:** posting to a closed period · a mandatory ' +
              '{{kar-merkezi}} left blank · a four-eyes rule with a single user · ' +
              'an unbalanced document · an unauthorized company code.\n\n' +
              '**Why it\'s mandatory:** in {{konu:dogrulama-ikame}}, a rule is set ' +
              'up in three steps and **the third one (activation) is the one most ' +
              'often skipped**. An unactivated rule silently does nothing: ' +
              'and a positive test **can\'t see** that.',
        tcodes:['GGB4','OBA5'] },

      { ad:'{{regresyon-testi}}: shared configuration',
        aciklama:'Verifies the new change doesn\'t break **what used to work**.',
        neZaman:'After every transport.',
        ornek:'Critical in FI because configuration is **shared**: when a tax ' +
              'code\'s account assignment changes, **every process** tied to it ' +
              'is affected.\n\n' +
              '**Scope is decided by dependency, not by guesswork:** ' +
              '{{E071}} tells you which object changed; the rest is wherever that ' +
              'object gets used.\n\n' +
              'A **fixed core set** is kept and run after every transport: a ' +
              'vendor invoice · an {{F110}} run · a customer collection · ' +
              'an {{AFAB}} run · a month-end close.',
        tcodes:['SE09'] },
    ],

    karsilastirmaBasliklar:['One-way door', 'Two-way door'],
    karsilastirma:[
      ['Example', '{{hesap-plani}} · {{belge-bolme}} · currency', '{{odeme-kosulu}} · tolerance · field status'],
      ['Can it be undone?', '**No, once data has been written**', 'Yes'],
      ['Decision speed', '**Slow**: written, with reasoning', 'Fast'],
      ['Who decides?', '**The business side**: the consultant informs', 'The consultant proposes, the business approves'],
      ['Cost if wrong', '**A new project**', 'A setting change'],
      ['The right question', '*"Any chance we\'ll want it within three years?"*', '*"What do we need today?"*'],
      ['When in doubt', '**Leave it open, don\'t use it**', 'Pick the simple option'],
      ['Meeting time', 'Long: and it earns it', 'Should be kept short'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    anlatim:
      'This topic\'s transaction codes don\'t do configuration, ' +
      'they **manage** it: where it lives ({{SPRO}}), ' +
      'what it carries ({{SE09}}), how it travels ({{STMS}}), ' +
      'and who changed it ({{CDHDR}}).',

    liste:[
      { kod:'SE09', ad:'Transport organizer',
        amac:'Displays and releases transport requests, and shows **their content**.',
        neZaman:'Before every transport, and in diagnosing "it worked in the test system."',
        adimlar:[
          { baslik:'List your requests: your own user or the project' },
          { baslik:'**Open the contents**: the object list ({{E071}})',
            aciklama:'The fastest way to see what a request actually carries.' },
          { baslik:'Release: first the **task**, then the **request**',
            aciklama:'The request can\'t be released until the task is released.' },
          { baslik:'Check for a conflict: do two requests touch the same object?',
            aciklama:'This is where {{tasima-sirasi}} problems are diagnosed.' },
          { baslik:'Read the transport log: **return code 8 means an error**' },
        ],
        ekranAkisi:[
          { ekran:'Request list', islem:'3 open requests found' },
          { ekran:'Contents', islem:'Request A: `T007A` (tax code) · Request B: `T007A` + `T030K`' },
          { ekran:'Conflict', islem:'**Both touch `T007A`** → sequence matters' },
          { ekran:'Sequence', islem:'A was released first but **B was transported first**' },
          { ekran:'Result', islem:'A **overwrote** B\'s change: no error message' },
          { ekran:'Fix', islem:'B was retransported; the sequencing rule was put in writing' },
        ],
        alanlar:{
          zorunlu:['Request type','Short description'],
          opsiyonel:['Task owners','Target system'] },
        hatalar:[
          { mesaj:'"Object locked in another request"', sebep:'The same object sits in another, unreleased request.', cozum:'Release the other request or remove the object from it. This lock is **protective**: it prevents a {{tasima-sirasi}} conflict.' },
          { mesaj:'Transported but has no effect in production', sebep:'The table may be {{akim-verisi}}: it never enters a transport.', cozum:'Set it up **separately** in production ({{SM30}} / {{OB52}}).' },
          { mesaj:'Return code 8', sebep:'The transport returned an error: a dependent object is missing or there\'s a dictionary mismatch.', cozum:'Read the log. **A return code of 4 isn\'t harmless either**: it\'s a warning, but content may have transported incompletely.' },
        ],
        ipucu:'**Look at the contents before transporting, not after.**\n\n' +
              'Two questions: *"is there anything in this request that shouldn\'t ' +
              'be there?"* and *"is there another pending request touching this ' +
              'object?"*\n\n' +
              'The second one prevents the most common and most insidious transport problem.',
        ilgili:['STMS','SM30','SPRO'] },

      { kod:'STMS', ad:'Transport management system',
        amac:'Manages the transport queue and moves requests to the target system.',
        neZaman:'Importing into test and into production.',
        adimlar:[
          { baslik:'Open the target system\'s queue' },
          { baslik:'**Check the sequence**: the release order',
            aciklama:'{{tasima-sirasi}}: the wrong order **lets the old state overwrite the new one**.' },
          { baslik:'Import the requests: individually or in bulk' },
          { baslik:'Read the log: return code 8 is an error, 4 is a warning' },
          { baslik:'**Verify** in production: transported ≠ working' },
        ],
        ekranAkisi:[
          { ekran:'Queue', islem:'**14 requests** waiting in the production queue' },
          { ekran:'Decision', islem:'All of them, or a selection? → **all of them, in order**' },
          { ekran:'Import', islem:'14 requests imported in sequence' },
          { ekran:'Log', islem:'13 × RC 0 · 1 × **RC 4** (warning)' },
          { ekran:'Review', islem:'RC 4: a dependent table was missing → that request was retransported' },
        ],
        alanlar:{
          zorunlu:['Target system','Request number'],
          opsiyonel:['Scheduling','Bulk import'] },
        hatalar:[
          { mesaj:'The sequence got scrambled in a bulk import', sebep:'Requests were imported one by one, in an arbitrary order.', cozum:'The queue is imported **as a whole**; a selective import breaks the sequence.' },
          { mesaj:'"Customizing is locked in this system"', sebep:'An {{SCC4}} client setting: the correct behavior in production.', cozum:'The change is made **in the development system** and transported. Exception: {{akim-verisi}}.' },
        ],
        ipucu:'**A transport is a step, not a delivery.** ' +
              'A return code of 0 doesn\'t mean the setting **works**; ' +
              'it only means it\'s been **copied**.\n\n' +
              'The verification list in production can be short but it **must exist**.',
        ilgili:['SE09','SPRO'] },

      { kod:'SPRO', ad:'Application configuration (IMG)',
        amac:'The full configuration tree; every node opens into a settings screen.',
        neZaman:'On every configuration task.',
        adimlar:[
          { baslik:'Open the SAP Reference IMG' },
          { baslik:'Read the **transaction code** next to the node: no need to memorize `OB*`',
            aciklama:'The code is written right next to the node (see {{konu:tcodes}}).' },
          { baslik:'**Read the documentation icon**: SAP\'s own explanation',
            aciklama:'Most "what does this setting do?" questions are answered right there.' },
          { baslik:'Make the change → capture it in a {{tasima-istegi}}' },
          { baslik:'Keep the request **small and single-purpose**' },
        ],
        ekranAkisi:[
          { ekran:'Tree', islem:'Financial Accounting → General Ledger Accounting → Business Transactions' },
          { ekran:'Node', islem:'The transaction code is written next to it: `OB52`' },
          { ekran:'Documentation', islem:'opened → says *"this table is current-state data"*' },
          { ekran:'Result', islem:'A transport request was **not** expected: set up separately in production' },
        ],
        alanlar:{
          zorunlu:['IMG node'],
          opsiyonel:['Project IMG (scoping only)'] },
        hatalar:[
          { mesaj:'"Change not possible: client protection"', sebep:'The {{SCC4}} setting; expected behavior in production.', cozum:'The change is made in the development system and transported.' },
          { mesaj:'The setting was made but no transport request was prompted', sebep:'The table is flagged as **{{akim-verisi}}**.', cozum:'This isn\'t an error. The setting is made **separately** in every system: and this must be known going in.' },
        ],
        ipucu:'**Reading the IMG documentation is the highest-return habit in this ' +
              'topic.**\n\n' +
              'Every node has a documentation icon next to it, and SAP writes right ' +
              'there what the setting does, what it depends on, and ' +
              '**whether it can be changed later**.\n\n' +
              'Most of the one-way-door list can be worked out from there.',
        ilgili:['SE09','SM30','OBA5'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'The table side of best practices is about two questions: ' +
      '**"what was transported?"** ({{E070}}/{{E071}}) and ' +
      '**"who changed it?"** ({{CDHDR}}/{{CDPOS}}).',

    liste:[
      { ad:'E070', baslik:'Transport request header: a change timeline',
        tutar:'One row per request: its owner, type, status, release time.',
        olusturan:'{{SE09}}',
        anahtar:'TRKORR',
        iliskiler:'Objects live in {{E071}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'TRKORR', aciklama:'Request number' },
          { ad:'AS4DATE', aciklama:'Release date: *"when did this setting go live?"*' },
          { ad:'AS4USER', aciklama:'The owner: the person to ask' },
          { ad:'TRSTATUS', aciklama:'Status: **R** released' },
        ] },

      { ad:'E071', baslik:'Transport request objects: conflict diagnosis',
        tutar:'**Exactly what** a request transported.',
        olusturan:'{{SE09}}',
        anahtar:'TRKORR + PGMID + OBJECT + OBJ_NAME',
        iliskiler:'Tied to the {{E070}} header.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'OBJECT', aciklama:'Object type: `TABU` table, `PROG` program' },
          { ad:'OBJ_NAME', aciklama:'Object name: **this is where you see whether two requests conflict**' },
          { ad:'TRKORR', aciklama:'Which request it belongs to' },
        ] },

      { ad:'CDHDR', baslik:'Change document: the answer to "did it work yesterday"',
        tutar:'The header of master-data and some configuration changes.',
        olusturan:'Every transaction that makes a change',
        anahtar:'OBJECTCLAS + OBJECTID + CHANGENR',
        iliskiler:'Field-level detail sits in {{CDPOS}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'UDATE / UTIME', aciklama:'When' },
          { ad:'USERNAME', aciklama:'Who' },
          { ad:'TCODE', aciklama:'With which transaction' },
        ] },

      { ad:'TCURR', baslik:'Exchange rates: an example of current-state data',
        tutar:'Rates keyed by rate type + currency pair + date.',
        olusturan:'{{OB08}} or the interface',
        anahtar:'KURST + FCURR + TCURR + GDATU',
        iliskiler:'{{konu:foreign-currency}} valuation reads from here.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'GDATU', aciklama:'The date is stored **reversed**: makes it harder to read directly' },
          { ad:'UKURS', aciklama:'The rate' },
          { ad:'KURST', aciklama:'{{kur-tipi}}: M, B, G' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'The trail of a change: who, what, when',
      varliklar:[
        { ad:'E070', rol:'Header', hub:true, aciklama:'**Transport request**: when it went live',
          alanlar:[{ ad:'TRKORR', tip:'pk' }, { ad:'AS4DATE' }, { ad:'AS4USER' }] },
        { ad:'E071', rol:'Item', aciklama:'**Object list**: where a conflict is spotted',
          alanlar:[{ ad:'TRKORR', tip:'fk' }, { ad:'OBJ_NAME', tip:'pk' }] },
        { ad:'CDHDR', rol:'Master data', aciklama:'**Change document** header',
          alanlar:[{ ad:'CHANGENR', tip:'pk' }, { ad:'USERNAME' }, { ad:'UDATE' }] },
        { ad:'CDPOS', rol:'Field', aciklama:'Old and new value',
          alanlar:[{ ad:'CHANGENR', tip:'fk' }, { ad:'FNAME' }] },
        { ad:'TCURR', rol:'Current-state data', aciklama:'**Doesn\'t transport**: separate in every system',
          alanlar:[{ ad:'GDATU', tip:'pk' }, { ad:'UKURS' }] },
      ],
      iliskiler:[
        { from:'E070', to:'E071', alanlar:'TRKORR', not:'request → objects' },
        { from:'CDHDR', to:'CDPOS', alanlar:'CHANGENR', not:'header → field changes' },
        { from:'E071', to:'TCURR', alanlar:', ', not:'**no link**, current-state data' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Three screens, three questions: **{{SPRO}}** *"where\'s the setting?"*, ' +
      '**{{SE09}}** *"what am I transporting?"*, **{{STMS}}** *"did it go in the right order?"*',

    ekranlar:[
      { ad:'{{SPRO}}: the configuration tree',
        aciklama:'Where the setting gets made.',
        alanlar:[
          { ad:'**Documentation icon**', zorunlu:false, aciklama:'SAP\'s own explanation. Whether a ' +
                   'setting **can be undone** is usually written here.' },
          { ad:'The transaction code on the node', zorunlu:false, aciklama:'It\'s written right there: no need to memorize `OB*`.' },
          { ad:'{{tasima-istegi}}', zorunlu:true, aciklama:'If you weren\'t prompted for one, the table is ' +
                   '**{{akim-verisi}}**.' },
        ],
        ipucu:'Reading the IMG documentation is the **highest-return habit** in this topic.' },

      { ad:'{{SE09}}: request content',
        aciklama:'What was transported and what it conflicts with.',
        alanlar:[
          { ad:'Object list', zorunlu:true, aciklama:'Read it **before** transporting.' },
          { ad:'Conflict check', zorunlu:false, aciklama:'Is there another pending request touching ' +
                   'the same object?' },
        ],
        ipucu:'A request should be **small and single-purpose**; one "everything in it" request can\'t be rolled back.' },

      { ad:'{{STMS}}: the queue and its sequence',
        aciklama:'Importing into the target system.',
        alanlar:[
          { ad:'**Sequence**', zorunlu:true, aciklama:'In release order. ' +
                   'In the wrong order, **the old state overwrites the new one**.' },
          { ad:'Return code', zorunlu:true, aciklama:'8 is an error · 4 is a warning: ' +
                   '**4 isn\'t harmless either**.' },
        ],
        ipucu:'The queue is imported **as a whole**; a selective import breaks the sequence.' },
    ],

    zorunlu:['Decision class (one-way/two-way)','A written rationale','Transport request','Negative test'],
    opsiyonel:['A regression core set','A signed decision record'],

    hatalar:[
      { mesaj:'"It worked in the test system, doesn\'t work in production"', sebep:'Most common: the table is {{akim-verisi}}: it never entered a transport.', cozum:'Set it up **separately** in production. The next two possibilities: a {{tasima-sirasi}} conflict, a missing dependent object.' },
      { mesaj:'Transport returned RC 0 but the setting in production is still the old one', sebep:'Another request was transported **afterward** and overwrote it.', cozum:'Look for a shared object in {{E071}}; retransport in the correct order.' },
      { mesaj:'"Object locked in another request"', sebep:'The same object sits in another, unreleased request.', cozum:'This lock is **protective**: it prevents a conflict. The other request gets released.' },
      { mesaj:'I built a rule but it doesn\'t fire', sebep:'{{konu:dogrulama-ikame}}: the **activation step** was skipped ({{GGB4}}).', cozum:'{{negatif-test}} catches this; a positive test **can\'t see** it.' },
      { mesaj:'A warning appears and users just click past it', sebep:'The message type was left at **W**.', cozum:'A critical control is set to **E** ({{OBA5}}). A rule built with W effectively stops existing on the first busy day.' },
      { mesaj:'I fixed a setting but past postings are still wrong', sebep:'The setting can be undone, **the data can\'t**.', cozum:'A correction/reclassification posting is needed. This is the real measure of how "undoable" a decision actually is.' },
      { mesaj:'Years later, "why was this built this way?" goes unanswered', sebep:'No reasoning was written down; SAP keeps a record of **what** was done, not **why**.', cozum:'A decision record: what it solves · which alternatives were ruled out · which assumption it rests on.' },
    ],

    ipuclari:[
      'One question for every setting: **"can it be undone once data has been written on top of it?"**',
      'For a one-way door, the right question isn\'t *"do we want it today?"* but **"in three years?"**',
      'When in doubt, **leave it open, don\'t use it**: cheaper than turning it off and regretting it.',
      'Write the decision **with its reasoning**: what it solves, what was ruled out, which assumption it rests on.',
      'Solution order: **standard setting → {{badi}} → modification**.',
      'Keep your {{tasima-istegi}} **small and single-purpose**.',
      'Look at {{E071}} content **before** transporting, not after.',
      'Run **{{negatif-test}}** for every control: a positive test can\'t see the control.',
      'If a critical control is **W, make it E**; {{OBA5}} is not a silencing tool.',
      'Keep a fixed {{regresyon-testi}} core set and run it after every transport.',
      'Set up {{akim-verisi}} tables **separately** in production, and decide **who can write to them**.',
      'Turn every silent-error class into a **control query**.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'E070', ne:'Transport request header: **when it went live**' },
      { tablo:'E071', ne:'Object list: **conflict diagnosis**' },
      { tablo:'CDHDR', ne:'Change document: who, when' },
      { tablo:'CDPOS', ne:'Field-level old/new value' },
      { tablo:'TCURR', ne:'{{akim-verisi}}: doesn\'t transport' },
    ],

    commit:
      'A configuration change is written **immediately** and gets {{tampon}}ed. ' +
      'This has two consequences:\n\n' +
      '**1.** If you changed a setting but don\'t see its effect, ' +
      'the buffer may be the cause: cleared with `/$sync` ' +
      '(see {{konu:tcodes}}).\n\n' +
      '**2.** A configuration change **doesn\'t affect transactions already in ' +
      'progress**, only the next posting. That\'s why a configuration change in ' +
      'production is **never made during busy hours**: documents posted half with ' +
      'the old setting and half with the new one produce an inconsistency that\'s ' +
      'hard to diagnose.',

    belgeNo:
      'The "document number" of configuration changes is the {{tasima-istegi}} ' +
      'number. **This number is an audit tool** and is rarely used:\n\n' +
      '*"When did this setting go live?"* → {{E070}}.`AS4DATE`\n' +
      '*"Who did it?"* → {{E070}}.`AS4USER`\n' +
      '*"Exactly what did it change?"* → {{E071}}\n\n' +
      'This trio is the configuration-side answer to the **"it worked ' +
      'yesterday"** question from {{konu:error-handling}}. ' +
      'On the master-data side, the counterpart is {{CDHDR}}/{{CDPOS}}.',

    postingLogic:
      'Configuration\'s effect on a posting has **three layers**, and diagnosis ' +
      'follows this order:\n\n' +
      '**1. Does it exist?** Account determination, number range, period. ' +
      'If not, the posting **stops**: a loud error.\n\n' +
      '**2. Is it correct?** {{mutabakat-hesabi}}, {{vergi-kodu}}, account ' +
      'assignment. If wrong, the posting **goes through**: a silent error.\n\n' +
      '**3. Is it enforced?** Validation rules, the message type (W/E), ' +
      'authorization. If weak, the rule **effectively doesn\'t exist**.\n\n' +
      'A consultant spreads their attention according to this order: the first ' +
      'layer shows itself, **the second and third don\'t**.',

    belgeTuru:
      'Document type design is a best-practices topic in its own right and ' +
      'carries two rules:\n\n' +
      '**1. Separate purpose → separate document type.** Migration postings, ' +
      'correction postings, and recurring postings are cut apart with separate ' +
      'types; they later become **filterable** by {{BKPF}}.`BLART`.\n\n' +
      '**2. Document type is an authorization object.** `F_BKPF_BLA` controls ' +
      'who can post which type. This is one of the quietest ways the ' +
      '{{dort-goz}} principle gets built.\n\n' +
      'Don\'t overdo it: opening a separate document type for every scenario ' +
      'wears users out and raises the risk of picking the wrong one.',

    numberRange:
      'Number ranges come close to being a {{tek-yonlu-kapi}}: ' +
      'a range **can\'t be narrowed** (numbers have already been used) and ' +
      'ranges **can\'t overlap**.\n\n' +
      'Number ranges also **don\'t transport** in most systems: ' +
      'they\'re defined separately in every system. This is another cause of ' +
      '"it worked in the test system" cases.\n\n' +
      'Running out of a range is a silent risk: remaining capacity is checked ' +
      'at year-end, and once it\'s exhausted, posting **stops**.',

    accountDetermination:
      'Account determination tables ({{T030}}, {{OBYC}}, {{VKOA}}, {{T030K}}) are ' +
      'the best example of this topic because they can be wrong on **two ' +
      'layers**:\n\n' +
      '**Missing** → the posting stops. A loud error, easy.\n' +
      '**Wrong** → the posting goes through, hits the wrong account. A silent error.\n\n' +
      'This is why a single question isn\'t enough to test account determination. ' +
      'Two questions are needed: *"did the posting go through?"* **and** ' +
      '*"which account did it hit?"*\n\n' +
      'Skip the second and the test gets reported as "passed": ' +
      'and the error gets found in production, at month-end.',

    tur:
      '**Decision types and who makes them:**\n\n' +
      '** One-way door**: the **business side** makes the decision, the ' +
      'consultant informs it and writes it down.\n\n' +
      '** Two-way door**: the consultant proposes, the business approves, ' +
      'it moves fast.\n\n' +
      '** Technical decision**: belongs to the consultant (request size, ' +
      'test scope, naming).\n\n' +
      '**The most commonly confused one:** a decision that looks technical but ' +
      'actually belongs to the first class. *"How many digits should the account ' +
      'number have?"* looks like a technical question; it isn\'t.',

    transport:
      '**The three rules of transport discipline:**\n\n' +
      '**1. Small, single-purpose requests.** The precondition for being able to undo one.\n\n' +
      '**2. Transport in sequence.** If {{tasima-sirasi}} is broken, ' +
      '**the old state overwrites the new one** and no error message appears.\n\n' +
      '**3. Import the queue as a whole.** A selective import breaks the sequence; ' +
      '"let\'s take these two, the rest later" is a classic trap.\n\n' +
      '---\n\n' +
      '**And the three things that don\'t transport:** {{akim-verisi}} tables · ' +
      'number ranges (in most cases) · {{LSMW}} projects ' +
      '(they have their own export/import: see {{konu:lsmw}}).',

    img:[
      { yol:'SPRO → the documentation icon on the node', not:'A setting\'s reversibility is usually written here' },
      { yol:'SE09 → request content', not:'Read it **before** transporting' },
      { yol:'STMS → the import queue', not:'Imported **as a whole**' },
      { yol:'OBA5 → message control', not:'A critical control set to **W is changed to E**' },
    ],

    ekstra:[
      { ic:'🚪', baslik:'The one-way-door test: four questions', metin:
        'You don\'t need to memorize a list to work out which class a setting ' +
        'belongs to. **Four questions** are enough:\n\n' +
        '---\n\n' +
        '**1. Does this setting get written into data?**\n' +
        'If it enters a document, a line item, or a master record as a value ' +
        '(an account number, currency, period, tax code) ' +
        '→ **probably one-way**.\n' +
        'If it\'s only read at the moment a transaction runs (tolerance, field ' +
        'status) → ✓ two-way.\n\n' +
        '**2. Is there data that never gets produced while this setting is ' +
        'off?**\n' +
        'While {{belge-bolme}} is off, {{FAGL_SPLINFO}} **never gets created**. ' +
        'Turning it on later doesn\'t fill in the past.\n' +
        '→ **One-way.**\n\n' +
        '**3. If I change it, does the past migrate along with it?**\n' +
        'The answer is almost always **no**. The real question is: ' +
        '*how much damage does that lack of migration do?* ' +
        'A change to a {{mutabakat-hesabi}} just needs a correction posting; ' +
        'a chart-of-accounts change doesn\'t get off that easily.\n\n' +
        '**4. What does the IMG documentation say?**\n' +
        'SAP\'s documentation for most critical settings writes something like ' +
        '*"this setting should not be changed in production"*. ' +
        'It goes unseen because it goes unread.\n\n' +
        '---\n\n' +
        '**The rule when in doubt:** **leave the setting open, don\'t use it**. ' +
        'An unused ledger, an empty currency slot, or split information that\'s ' +
        'active but nobody looks at is **close to free**. The reverse is a project.' },

      { ic:'📝', baslik:'Documentation: SAP keeps the "what," you keep the "why"', metin:
        'Documentation advice is usually useless because it recommends writing ' +
        'down **the wrong thing**.\n\n' +
        'SAP **already keeps a record of what was done**:\n\n' +
        '• {{CDHDR}}/{{CDPOS}}: which field on a master record, when, by whom\n' +
        '• {{E070}}/{{E071}}: which setting went live and when\n' +
        '• {{SPRO}}: a setting\'s current state is already sitting right there\n\n' +
        'Copying these into a Word document produces **duplicate records**, and ' +
        'the two drift apart over time: once they drift, neither one can be trusted.\n\n' +
        '---\n\n' +
        '**The only thing worth keeping: the WHY.**\n\n' +
        'Three lines are enough, and for a decision they cover:\n\n' +
        '**① What it solves.** *"Foreign vendor payments needed two separate ' +
        'payment methods."*\n' +
        '**② Which alternatives were ruled out, and why.** *"A single method ' +
        'couldn\'t separate the banks."*\n' +
        '**③ Which assumption it rests on. This is the most valuable line.** ' +
        '*"On the assumption that we\'d only ever work with two banks."*\n\n' +
        'The third line tells you **when the decision needs revisiting**. Once a ' +
        'third bank is added, this decision needs another look: and if it ' +
        'hadn\'t been written down, nobody would know.\n\n' +
        'This is the **preventive** for the *"the rule was correct in 2024"* case ' +
        'in {{konu:dogrulama-ikame}}: that rule had an assumption too, and it ' +
        'wasn\'t written down.' },

      { ic:'🧪', baslik:'Writing a test scenario: three rules', metin:
        'Most FI test scenarios read like this: ' +
        '*"post a vendor invoice with {{FB60}}, save it, verify a document was ' +
        'created."*\n\n' +
        'This scenario tests almost nothing.\n\n' +
        '---\n\n' +
        '**Rule 1: Verify the CORRECT result, not just A result.**\n\n' +
        '*"A document was created"* isn\'t enough. *"Did it hit account ' +
        '`320`?"*, *"did VAT land in `191`?"*, *"was the due date calculated ' +
        'correctly?"* The OBYC errors in {{konu:mm-integration}} make it to ' +
        'production **exactly** because of this gap.\n\n' +
        '**Rule 2: no test is complete without {{negatif-test}}.**\n\n' +
        'Every control you build gets **deliberately violated**: posting to a ' +
        'closed period is attempted, a mandatory field is left blank, a ' +
        'four-eyes rule is tested with a single user.\n\n' +
        'The reason is simple: a control is **only visible when it\'s ' +
        'violated**. An unactivated validation rule looks like it works ' +
        '**perfectly** in a positive test.\n\n' +
        '**Rule 3: test data shouldn\'t be "clean."**\n\n' +
        'Real-world data isn\'t round. The test set deliberately includes: ' +
        'amounts with cents · a foreign-currency document · a discounted ' +
        'invoice · a multi-line document · a long vendor name · ' +
        'text with Turkish characters.\n\n' +
        'The *"VAT is calculated after the discount"* error in ' +
        '{{konu:sd-integration}} is only caught by a **discounted** test document.' },
    ],

    notlar:[
      { tip:'tip', baslik:'Z-code is not a cost, it\'s a debt', metin:
        'A {{z-gelistirme}} decision is usually judged as a one-time cost: ' +
        '*"that development is 15 person-days."*\n\n' +
        'That calculation is incomplete. **Development is a debt, and it ' +
        'carries interest:**\n\n' +
        '• A compatibility check on every support package\n' +
        '• Manual adaptation with {{SPAU}} on every upgrade\n' +
        '• A handover to every new consultant\n' +
        '• And the most expensive of all: **the migration burden in ' +
        '{{konu:migration}}**\n\n' +
        '---\n\n' +
        '**Three tiers, three different interest rates:**\n\n' +
        '**① A custom report**: doesn\'t touch the standard, usually goes ' +
        'through upgrades without trouble. **Low interest.**\n' +
        '**② A {{badi}} / enhancement**: hooks in at a point SAP allows. ' +
        '**Medium interest.**\n' +
        '**③ A modification**: the standard code itself is changed. ' +
        'Handled by hand with {{SPAU}} on every upgrade. **High interest.**\n\n' +
        '---\n\n' +
        '**The real problem isn\'t writing it, it\'s losing track of the ' +
        'inventory.** Five years later nobody knows which developments are ' +
        'still in use, and **all of them**, even the unused ones, get ' +
        'carried into the upgrade.\n\n' +
        'A simple safeguard: track each development\'s **last-used date**. A ' +
        'program that hasn\'t run in a year gets questioned before it\'s carried forward.' },

      { tip:'warn', baslik:'The consultant\'s most expensive habit: "we\'ll look at it later"', metin:
        'This is the most commonly built sentence under project pressure, and ' +
        'it\'s **entirely correct for two-way doors**.\n\n' +
        'The danger is using that sentence **at the wrong door**.\n\n' +
        '---\n\n' +
        '**Where "we\'ll look at it later" is safe to say:**\n' +
        '{{odeme-kosulu}} · tolerance · field status · report layout · ' +
        'dunning procedure · user authorizations\n\n' +
        '**Places that can\'t be changed later under any circumstances:**\n' +
        '{{hesap-plani}} · {{belge-bolme}} · currency · ' +
        '{{mali-yil-varyanti}} · ledger structure · {{amortisman-alani}}\n\n' +
        '---\n\n' +
        '**Making this distinction costs almost nothing:** asking one question ' +
        'and writing down the answer. Not making it costs your next project.\n\n' +
        'That\'s why this topic\'s thesis isn\'t offering a list, it\'s offering a ' +
        '**reflex**: before deciding anything, ask, ' +
        '*"does this setting get written into data?"*' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'S/4HANA **didn\'t change** best practices, but it **made two of them ' +
      'easier** (reconciliation and reporting) and ' +
      '**made one harder**: the {{z-gelistirme}} burden is no longer just a ' +
      'maintenance cost, it\'s now also a **migration blocker**.',

    eccFarklari:[
      { konu:'The {{tek-yonlu-kapi}} concept', ecc:'Applies', s4:'**Applies exactly the same**: some of them even increased' },
      { konu:'FI-CO reconciliation', ecc:'A separate program and check', s4:'**Structurally unnecessary**' },
      { konu:'{{toplam-tablosu}} inconsistency', ecc:'Needs a reconciliation program', s4:'**Gone**: totals are calculated' },
      { konu:'{{z-gelistirme}}', ecc:'A maintenance cost', s4:'A **migration blocker**: surfaces in the {{basitlestirme-listesi}}' },
      { konu:'Reporting enhancements', ecc:'Most need an ABAP report', s4:'{{cds-view}} + {{gomulu-analitik}}' },
      { konu:'Transport discipline', ecc:'{{STMS}} / {{E070}}', s4:'**Same**: unchanged' },
      { konu:'{{akim-verisi}}', ecc:'Exists', s4:'**Same**: {{OB52}}, {{TCURR}} still don\'t transport' },
      { konu:'A new one-way door', ecc:': ', s4:'The {{is-ortagi}} numbering strategy' },
    ],

    universalJournal:
      'The {{evrensel-kayit-defteri}} made one best practice **unnecessary**: ' +
      'reconciling FI against CO.\n\n' +
      'In ECC this was a routine check because two separate sets of tables could ' +
      'drift apart. In S/4HANA, because there\'s a **single source line**, ' +
      'drifting apart is **structurally impossible**.\n\n' +
      'This is a nice example of the topic\'s general principle: ' +
      '**the best control is the one that becomes unnecessary.** ' +
      'Making an error impossible to occur is always cheaper than catching it.\n\n' +
      'But watch out: **removing** a control that\'s become unnecessary is also ' +
      'a decision. If that step still sits in an old closing checklist, ' +
      'time is being wasted on it every month for nothing.',

    kalkanTcodes:[
      { eski:'FI-CO reconciliation programs', yeni:'**Unnecessary**', not:'A single source line' },
      { eski:'Totals-table reconciliation', yeni:'**Unnecessary**', not:'Totals are calculated' },
      { eski:'Custom balance reports', yeni:'{{cds-view}} / {{gomulu-analitik}}', not:'Without writing ABAP' },
      { eski:'{{SE09}} / {{STMS}}', yeni:'**Unchanged**', not:'Transport discipline is the same' },
    ],

    fiori:[
      { ad:'Manage Journal Entries', aciklama:'The {{fiori}} face of it; ' +
             'uses the **same** configuration under the hood: ' +
             'the settings you already know still apply.' },
      { ad:'Role design = interface design', aciklama:'In Fiori a user only sees ' +
             'the apps in their role. Authorization design is now also a ' +
             '**usability** decision.' },
      { ad:'Custom Fields and Logic', aciklama:'A modification-free way to add ' +
             'fields and simple logic: reduces {{z-gelistirme}} debt.' },
    ],

    compatibilityViews:[
      'A {{z-gelistirme}} that reads old tables now runs through a ' +
      '{{uyumluluk-view}} and **can slow down**: this is the main cause of ' +
      'post-migration performance complaints (see {{konu:s4-yenilikleri}}).',
      'This is the **concrete** payoff of keeping a development inventory: ' +
      'a team that knows which program reads which table also knows what to ' +
      'adapt after migration.',
    ],

    performans:
      'S/4HANA doesn\'t directly affect configuration performance, but it makes ' +
      'one best practice more **visible**: the cost of unnecessary complexity.\n\n' +
      'A large number of {{paralel-defter}}s, an over-detailed {{hesap-plani}}, ' +
      'or an unnecessary {{amortisman-alani}} used to be only a **maintenance** ' +
      'burden. Because {{ACDOCA}} carries every dimension on every line, there\'s ' +
      'now also a **data volume** burden.\n\n' +
      'The rule hasn\'t changed either way: **when in doubt, leave it open.** ' +
      'An unused ledger is always cheaper than one you can\'t open later.',

    bestPractices:[
      'The {{tek-yonlu-kapi}} list applies **exactly the same** in S/4HANA.',
      '**Remove** controls that have become unnecessary from the closing checklist (FI-CO reconciliation).',
      'Keep a {{z-gelistirme}} inventory: it\'s now also a **migration blocker**.',
      'For new reporting needs, look at {{cds-view}} first, not ABAP.',
      'Use **Custom Fields and Logic** for adding fields: not a modification.',
      'Transport discipline hasn\'t changed: a small request, the right sequence, the whole queue.',
      '{{akim-verisi}} still doesn\'t transport: set it up separately in production.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'"We don\'t want a segment report": eight months later, they asked for one',
    hikaye:
      '**Marmara Industries Inc.** operated in two business lines: packaging and ' +
      'chemicals. Both under the same company code, the same chart of accounts.\n\n' +
      'At the setup meeting, {{belge-bolme}} came up. The finance director was clear:\n\n' +
      '*"We don\'t want a segment-based balance sheet. We have one balance sheet; ' +
      'we already separate the business lines on the expense side with ' +
      '{{kar-merkezi}}. Let\'s not turn splitting on and complicate the system."*\n\n' +
      'The request was reasonable. Document splitting really is a complex setup ' +
      'that needs extra configuration and testing.\n\n' +
      'The consultant agreed, and splitting was set up **off**.\n\n' +
      '---\n\n' +
      'Go-live: **01.01.2028**.\n\n' +
      'September 2028: the company started **investor talks** for the chemicals ' +
      'business line.\n\n' +
      'The investor\'s first request: *"let\'s see the chemicals business line\'s ' +
      '**balance sheet** for the last two years."*',
    veriler:[
      { k:'Company code', v:'One: holding both business lines' },
      { k:'Document splitting', v:'**Off** (a deliberate decision)' },
      { k:'Cost center', v:'Present: **on the expense side**' },
      { k:'Go-live', v:'01.01.2028' },
      { k:'Request', v:'September 2028: a business-line **balance sheet**' },
      { k:'Available', v:'Business-line **income statement** ✓' },
      { k:'Not available', v:'Business-line **balance sheet**' },
    ],

    adimlar:[
      { baslik:'Can\'t we pull a cost-center-based balance sheet?', tcode:'FAGLB03',
        aciklama:'The first idea: maybe it already exists.',
        girdi:[
          { alan:'Expense accounts (7xx)', deger:'Cost center **populated**' },
          { alan:'Income accounts (6xx)', deger:'Cost center **populated**' },
          { alan:'Trade payables (320)', deger:'**Empty**' },
          { alan:'Trade receivables (120)', deger:'**Empty**' },
          { alan:'Banks (102)', deger:'**Empty**' },
        ],
        not:'**The core distinction from {{konu:new-gl}} becomes concrete right ' +
             'here.**\n\n' +
             'Expense and income lines **already carry** a cost center: the user ' +
             'enters it, or {{OKB9}} derives it. That\'s why the business-line ' +
             '**income statement** comes out without a problem.\n\n' +
             'The problem is **the balance sheet lines**: vendors, customers, ' +
             'banks, tax. Nobody enters a cost center on those: and with ' +
             '{{belge-bolme}} off, the system doesn\'t **derive** one either.\n\n' +
             'So the business-line information on balance-sheet items **never ' +
             'came into existence** in the first place.' },

      { baslik:'What if we turn splitting on now?', tcode:'SPRO',
        aciklama:'The second idea: changing the setting.',
        girdi:[
          { alan:'Can the setting be changed?', deger:'Technically **yes**' },
          { alan:'Do past documents get split?', deger:'**No**' },
          { alan:'{{FAGL_SPLINFO}} on past postings', deger:'**Empty: and can\'t be filled in**' },
          { alan:'Effect', deger:'Only documents **posted after the turn-on date**' },
        ],
        not:'**The topic\'s thesis is exactly here.**\n\n' +
             'The {{belge-bolme}} setting is a checkbox, and it **can be ' +
             'changed**. But changing it doesn\'t help.\n\n' +
             'Because the problem isn\'t the setting, it\'s **the data the ' +
             'setting failed to produce**: on the 20 months of documents posted ' +
             'while splitting was off, {{FAGL_SPLINFO}} records **never got ' +
             'created**.\n\n' +
             '**The setting can be undone, the data can\'t.**\n\n' +
             'And a document can\'t be split retroactively: splitting is done ' +
             'with information known at the moment of posting (which expense ' +
             'went to which cost center). If that link was never captured, it ' +
             '**can\'t be reconstructed** afterward: which vendor liability ' +
             'belongs to which business line is now just a guess.' },

      { baslik:'What if we allocate it by hand?', tcode:'FBL1N',
        aciklama:'The third idea: producing the data manually.',
        girdi:[
          { alan:'Scope', deger:'20 months · **roughly 34,000 balance-sheet items**' },
          { alan:'Vendor liabilities', deger:'Requires drilling into the invoice and checking the expense line' },
          { alan:'Bank movements', deger:'**Mostly shared**: can\'t be separated' },
          { alan:'Tax items', deger:'Shared: needs a proportional allocation' },
          { alan:'Result', deger:'An **approximate** balance sheet: not auditable' },
        ],
        not:'Technically partly possible: each vendor invoice can have its debit ' +
             'assigned to the cost center on its expense line.\n\n' +
             '**But two groups of items can\'t be separated:**\n\n' +
             '• **Shared banks**: payments for both business lines came out of ' +
             'a single account\n' +
             '• **Tax items**: a single VAT return, needing a proportional split\n\n' +
             'The result isn\'t a balance sheet, it\'s an **estimate**. ' +
             'The investor won\'t accept it; an auditor won\'t sign off on it either.\n\n' +
             'And note: the cost of doing this is **many times higher** than ' +
             'setting up document splitting from the start would have been: ' +
             'and the result is worse besides.' },

      { baslik:'What was actually done?', tcode:'FAGLL03',
        aciklama:'The accepted solution.',
        girdi:[
          { alan:'Decision', deger:'Document splitting turned on **01.01.2029**' },
          { alan:'History', deger:'A 2028 business-line balance sheet **couldn\'t be produced**' },
          { alan:'Investor', deger:'Waited for the 2029 balance sheet: **a full year**' },
          { alan:'Extra cost', deger:'Splitting setup + testing + retraining' },
          { alan:'Talks', deger:'**Postponed**' },
        ],
        not:'Splitting was eventually turned on: but **a year late** and in a ' +
             'live system, under far harder conditions.\n\n' +
             'An extra problem surfaced during setup: once splitting was turned ' +
             'on, **past open items** sat there unsplit. Until they were cleared ' +
             '(some vendor balances took months), the segment balance sheet ' +
             '**stayed mixed**: part split, part not.\n\n' +
             'So the price of the delay wasn\'t just one year: ' +
             'the **transition period** cost extra on top of it.' },
    ],

    sonuc:
      '**The decision made in this scenario wasn\'t wrong. What was missing was ' +
      'information.**\n\n' +
      'When the finance director said *"we don\'t want a segment report,"* they ' +
      'were telling the **truth**: that day, they genuinely didn\'t want it. ' +
      'The consultant also acted reasonably, avoiding unnecessary complexity.\n\n' +
      'The one thing not on the table was: **that this decision was ' +
      'irreversible.**\n\n' +
      '---\n\n' +
      '**Three lasting lessons:**\n\n' +
      '**1. At a one-way door, the question changes.**\n' +
      'For a two-way decision, the right question is *"what do we need today?"*\n' +
      'For a one-way decision, the right question is **"is there any chance ' +
      'we\'ll want this within three years?"**\n\n' +
      'If the second question had been asked in this scenario, the answer would ' +
      'likely have been *"actually, we\'re thinking about spinning off the ' +
      'chemicals line."*\n\n' +
      '**2. A setting being reversible is not the same as an error being fixable.**\n' +
      'The {{belge-bolme}} checkbox can always be changed. Changing it ' +
      '**doesn\'t help**, because the problem isn\'t the setting, it\'s ' +
      '**the data the setting failed to produce**.\n\n' +
      'Whether a setting is a one-way door is worked out with one question: ' +
      '*"is there data that never gets produced while it\'s off?"*\n\n' +
      '**3. When in doubt, leave it open, don\'t use it.**\n' +
      'If document splitting had been set up on and left unused, the cost would ' +
      'have been **a bit of extra configuration and testing**. Setting it up ' +
      'off cost **a year and a postponed investor conversation**.\n\n' +
      '---\n\n' +
      'This asymmetry sums up the whole topic: ' +
      '**at one-way doors, over-preparation is cheap, under-preparation is ' +
      'expensive.** And knowing which door is one-way is the single most ' +
      'valuable thing a consultant carries.',
  },

  },
});
