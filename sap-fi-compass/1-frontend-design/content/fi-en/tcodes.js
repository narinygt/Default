/* ==========================================================================
   content/fi-en/tcodes.js — English body for "SAP Transaction Codes"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'tcodes',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'A transaction code is the **shortcut** to a SAP screen. A screen that takes five clicks ' +
      'to reach through the menu opens in one step by typing `FB60` into the command field.\n\n' +
      'But the real point isn\'t that it\'s a shortcut — it\'s that **the codes aren\'t random**.\n\n' +
      '`FK01` · `FD01` · `FS00` · `FBL1N` · `BSIK`\n\n' +
      'These five look like five things to memorize. In fact **a two-letter rule** explains ' +
      'all of them: SAP was developed in German, and the letters are the initials of German words.\n\n' +
      '**K** = *Kreditor* (vendor) · **D** = *Debitor* (customer) · **S** = *Sachkonto* (G/L account)\n\n' +
      'Once you see the rule, the list solves itself: `FK01` opens a vendor, `FD01` opens a customer, ' +
      '`FS00` opens a G/L account, `BSIK` holds vendor line items.\n\n' +
      '**This topic\'s thesis:** transaction codes aren\'t memorized, they\'re **decoded**. ' +
      'About 15 patterns make hundreds of codes predictable.',

    neden:
      '**Speed.** Navigating the menu is slow; a consultant switches between dozens of screens a day.\n\n' +
      '**Predictability.** Someone who knows the pattern can **guess** what a code they\'ve never ' +
      'seen does — and is usually right.\n\n' +
      '**Communication.** Consultants talk to each other by **code**, not by screen name: ' +
      '*"pay it with F-53"*, *"check it in FBL1N"*.\n\n' +
      '**Authorization.** Roles are granted at the transaction-code level; a role can\'t be ' +
      'designed without knowing what each code does.\n\n' +
      '**Documentation.** Process documents are written with transaction codes; ' +
      'screen names change with version and language, **the code doesn\'t**.',

    sirketOnemi:
      'Transaction-code knowledge is the consultant\'s **visible competence**. ' +
      'That\'s the difference in a meeting between the person thinking *"what was that screen ' +
      'called again?"* and the person saying *"line item display might be off in FBL3N."*\n\n' +
      'But the real value lies elsewhere: **someone who knows the pattern can find a code they ' +
      'don\'t know.** SAP has tens of thousands of transaction codes; nobody knows them all. ' +
      'The difference is search strategy.\n\n' +
      'The telling question is: **"What\'s the difference between F-02 and FB50?"** ' +
      'The shallow answer is *"they both post to G/L."* ' +
      'The right answer: **`F-02` is the classic generation, requiring a {{kayit-anahtari}} to ' +
      'be entered; `FB50` is the new generation (Enjoy), and derives the posting key itself from ' +
      'the debit/credit choice.** This distinction measures whether you know what the dash ' +
      '(`F-`) is pointing at.',

    gercekHayat:
      'A new consultant sees an error on screen: *"Number range missing for document type AB"*. ' +
      'They need to change the document type setting but don\'t know **which transaction code** ' +
      'to use.\n\n' +
      '**Going from memory**, they get stuck — you can\'t recall a code you never knew.\n\n' +
      '**Going from the pattern**, they find it in three steps:\n\n' +
      '**1.** This is a **customizing** setting → FI customizing codes start with **`OB`**.\n' +
      '**2.** {{SE16N}} → {{TSTCT}} → `TCODE` = `OB*` and `TTEXT` containing *document*\n' +
      '**3.** Result: **{{OBA7}}** — Define Document Types.\n\n' +
      '---\n\n' +
      '**Even faster:** open {{SPRO}}, search the IMG tree for *Document Type*, and ' +
      'clicking the node shows **the code is already right there**.\n\n' +
      'Both routes land in the same place. The difference is **neither requires memorizing anything**.',

    muhasebeMantigi:
      'The accounting logic behind transaction codes is that codes are **grouped by the type ' +
      'of accounting entry** they produce.\n\n' +
      'There are three basic entry types in accounting: one **that creates a liability** ' +
      '(an invoice), one **that clears a liability** (a payment/collection), and a ' +
      '**correcting** one (a reversal, a reclass).\n\n' +
      'SAP spreads this trio across separate code families:\n\n' +
      '**Creating:** {{FB60}} vendor invoice · {{FB70}} customer invoice · {{FB50}} G/L\n' +
      '**Clearing:** {{F-53}} payment · {{F-28}} incoming payment · {{F-32}} clearing · {{F110}} mass payment\n' +
      '**Correcting:** {{FB08}} reversal · {{FB02}} change · {{KB11N}} CO reposting\n\n' +
      'This grouping isn\'t coincidental: **clearing transactions are almost entirely in the ' +
      '`F-` family**, because they\'re classic-generation dialog screens that require an ' +
      '{{acik-kalem}} selection. The new-generation `FB` screens were designed for single-line ' +
      'postings; clearing, **by its nature**, needs a multi-line selection screen.\n\n' +
      'So the code family reflects **the accounting nature of the job**.',

    kavramlar: ['kayit-anahtari', 'acik-kalem', 'ozellestirme', 'yetki-nesnesi',
                'dokum', 'alv-duzeni'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'There are **four ways** to find the right code, and each fits a different situation. ' +
      'An experienced consultant works from these four routes, not from memory.',

    roller:[
      { rol:'User', gorev:'States the need in business language: *"I need to enter a vendor invoice."*' },
      { rol:'Consultant', gorev:'Guesses from the pattern — module letter + transaction type.' },
      { rol:'Consultant', gorev:'If unsure, **searches by description** in {{TSTCT}}.' },
      { rol:'Consultant', gorev:'If it\'s a customizing task, goes through the {{SPRO}} tree — the code is written on the node.' },
      { rol:'Consultant', gorev:'For a custom (`Z*`) code, looks at the program behind it with {{SE93}}.' },
      { rol:'User', gorev:'Adds frequently used codes to **favorites**.' },
      { rol:'Authorization', gorev:'Adds the code to a role — {{PFCG}}, {{yetki-nesnesi}} `S_TCODE`.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The four ways to find the right transaction code',
      adimlar:[
        { ic:'❓', rol:'User', baslik:'The need is expressed in business language',
          aciklama:'*"I need to enter a vendor invoice"* · *"I need to change the document type ' +
                   'setting"* · *"what does this Z code do?"*',
          cikti:'Need', ok:'the type is determined' },
        { ic:'🧭', rol:'Consultant', baslik:'The transaction type is determined',
          aciklama:'Is it a **posting/report**, a **customizing** task, or a **technical** one? ' +
                   'This question decides which route to use.',
          cikti:'Type', ok:'a route is chosen' },
        { ic:'🔤', rol:'Consultant', baslik:'1️⃣ Guess from the pattern — the fastest',
          aciklama:'Module letter + transaction letter + number. ' +
                   'Vendor invoice → FI + invoice → **{{FB60}}**. ' +
                   '80% of an experienced consultant\'s guesses are solved right here.',
          cikti:'Guess', ok:'if it doesn\'t hold' },
        { ic:'🔍', rol:'Consultant', baslik:'2️⃣ Search by description — the most reliable',
          aciklama:'{{SE16N}} → {{TSTCT}} → `*invoice*` in `TTEXT`. ' +
                   'Knowing **what it does** is enough, without knowing the code.',
          cikti:'Candidate codes', ok:'if it is customizing' },
        { ic:'⚙️', rol:'Consultant', baslik:'3️⃣ The {{SPRO}} tree — for customizing',
          aciklama:'The topic is searched for in the IMG tree; clicking the node shows ' +
                   '**the code is already right there**. There\'s no need to memorize `OB*` codes.',
          cikti:'Customizing screen', ok:'if it is a custom code' },
        { ic:'🧩', rol:'Consultant', baslik:'4️⃣ {{SE93}} — "what does this code run?"',
          aciklama:'Especially for customer-specific `Z*` codes. ' +
                   'The program name and screen number are shown.',
          cikti:'Program name', ok:'put into use' },
        { ic:'⭐', rol:'User', baslik:'Added to favorites, given a default via {{SU3}}',
          aciklama:'The frequently used code goes into favorites; recurring fields like ' +
                   'company code fill in automatically via {{SU3}} **parameters**.',
          cikti:'Fast access' },
      ],
    },

    adimlar:[
      { rol:'Consultant', eylem:'Guesses from the pattern', sistem:'Module letter + transaction type' },
      { rol:'Consultant', eylem:'Searches by description', sistem:'{{SE16N}} → {{TSTCT}} → `TTEXT`' },
      { rol:'Consultant', eylem:'Goes through the menu tree', sistem:'{{SMEN}} → application menu' },
      { rol:'Consultant', eylem:'Finds the customizing code', sistem:'{{SPRO}} — written on the node' },
      { rol:'Consultant', eylem:'Decodes the custom code', sistem:'{{SE93}} → program name' },
      { rol:'User', eylem:'Adds it to favorites', sistem:'Easy Access → Favorites' },
      { rol:'User', eylem:'Sets a default field value', sistem:'{{SU3}} → Parameters' },
      { rol:'Authorization', eylem:'Adds the code to a role', sistem:'{{PFCG}} — `S_TCODE`' },
    ],

    veriAkisi:{
      nereden:'The user types the code into the command field or picks it from the menu.',
      nereye:'The program name is read from {{TSTC}}, and the program runs.',
      tetikleyen:'A command-field entry · a menu click · a favorite · a Fiori tile.',
      sonraki:'The relevant screen opens — the authorization check (`S_TCODE`) happens **first**.',
    },

    notlar:[
      { tip:'tip', baslik:'Command field prefixes — little known but used daily', metin:
        'Typing a code straight into the command field tries to run the new code ' +
        '**without closing the current transaction**, and it usually throws an error. ' +
        'Prefixes solve this:\n\n' +
        '**`/n<code>`** — **close** the current transaction, start the new one. ' +
        'The most commonly used prefix. Example: `/nFB03`\n\n' +
        '**`/o<code>`** — open the new one **in a separate session**. ' +
        'For comparing two screens side by side: entering a posting in one window ' +
        'while looking at a table in the other.\n\n' +
        '**`/n`** — just closes the current transaction, returns to the main menu.\n\n' +
        '**`/i`** — **closes** the current session.\n\n' +
        '**`/nex`** — exits the system **without asking for confirmation**. ' +
        'Unsaved data **is discarded without being asked about**.\n\n' +
        '---\n\n' +
        '**`/$sync`** — clears every **{{tampon}}**.\n\n' +
        'This last one is a consultant\'s tool and solves this question: ' +
        '*"I changed the customizing but the effect isn\'t showing."* ' +
        'Configuration tables like {{T001}}, {{T004}}, {{T030}} are buffered; ' +
        'a change may not be picked up right away.\n\n' +
        '**Use carefully on a production system** — it affects every user and ' +
        'causes a temporary performance dip. It\'s fine to use freely on a test system.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'A transaction code doesn\'t produce a posting by itself — but knowing **which code ' +
      'produces which posting** is the accounting counterpart of the code map. ' +
      'Below are the postings produced by the four most commonly used codes.',

    etkilenenHesaplar:[
      { hesap:'{{FB60}} → 320 Trade payables', tur:'Balance sheet — Liability', neden:'A vendor invoice **creates a liability**.' },
      { hesap:'{{FB70}} → 120 Trade receivables', tur:'Balance sheet — Asset', neden:'A customer invoice **creates a receivable**.' },
      { hesap:'{{F-53}} → 102 Banks', tur:'Balance sheet — Asset', neden:'A payment **clears the liability**.' },
      { hesap:'{{AFAB}} → 257 / 770', tur:'Mixed', neden:'Depreciation runs **in bulk**, not entered one at a time.' },
      { hesap:'{{FB08}} → same accounts, reversed', tur:'Correcting', neden:'A reversal produces a **new document**, it doesn\'t delete the old one.' },
    ],

    fisler:[
      { baslik:'{{FB60}} — vendor invoice (creates a liability)',
        belgeTuru:'KR', tarih:'10.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:100000 },
          { hesap:'191', ad:'Deductible VAT', borc:20000 },
          { hesap:'320', ad:'Trade payables', alacak:120000, not:'An **open item** was created' },
        ],
        not:'The `FB` family is **new generation**: a single screen, no need to enter a ' +
             '{{kayit-anahtari}}. Debit/credit is chosen, and the system **derives the ' +
             'posting key itself**.\n\n' +
             'You could enter the same posting with `F-43` — but there you\'d have to ' +
             '**manually enter** the **31** (vendor credit) and **40** (G/L debit) keys.\n\n' +
             'The result is the same document. The difference is **ease of use**, not accounting.' },

      { baslik:'{{F-53}} — payment (clears a liability)',
        belgeTuru:'KZ', tarih:'25.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables (clearing)', borc:120000, not:'{{BSIK}} → {{BSAK}}' },
          { hesap:'102', ad:'Banks', alacak:120000 },
        ],
        not:'**Why are clearing transactions almost always in the `F-` family?**\n\n' +
             'Because clearing, by its nature, requires an **open item selection**: ' +
             'you check off from a list which invoices to clear.\n\n' +
             'The new-generation `FB` screens were designed for **single-line postings**; ' +
             'they don\'t offer a multi-item selection screen.\n\n' +
             'So the code family isn\'t arbitrary — it reflects **the accounting nature of the job**.' },

      { baslik:'{{FB08}} — reversal (correcting)',
        belgeTuru:'KR', tarih:'12.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables', borc:120000 },
          { hesap:'770', ad:'General administrative expense', alacak:100000 },
          { hesap:'191', ad:'Deductible VAT', alacak:20000 },
        ],
        not:'**A reversal isn\'t a deletion** — the original document stays in place, ' +
             'a **new document** is produced, and the two are linked to each other ' +
             '(the {{BKPF}} `STBLG` field).\n\n' +
             '**Two entries** show up in the trial balance. This follows from the audit ' +
             'trail requirement: in SAP, a posted document **can never be deleted by any code**.\n\n' +
             'This is why {{FB08}} is the concrete reason behind {{konu:dogrulama-ikame}}\'s ' +
             'principle that *"a preventive control beats a detective one"*: an error that\'s ' +
             'prevented produces **zero documents**; one found later produces **three documents**.' },

      { baslik:'{{AFAB}} — depreciation (produces in bulk)',
        belgeTuru:'AF', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Depreciation expense', borc:45000 },
          { hesap:'257', ad:'Accumulated depreciation', alacak:45000 },
        ],
        not:'Some codes produce a **single document**, others produce **in bulk**. ' +
             'This distinction decides how the code is used.\n\n' +
             '**Bulk producers:** {{AFAB}} depreciation · {{F110}} payment · ' +
             '{{F.05}} foreign-currency valuation · {{F.13}} automatic clearing\n\n' +
             '**Their shared traits:**\n' +
             '• A **test run** happens first\n' +
             '• Runs in the background → monitored with {{SM37}}\n' +
             '• Produces a log → read with {{SLG1}}\n' +
             '• Even an error on a single line **can affect the whole run**\n\n' +
             'Running a bulk code in production without a test run first is one of the ' +
             'most expensive mistakes in consulting.' },
    ],

    tHesaplar:[
      { hesap:'Trade payables — movement by code', kod:'320',
        borc:[{ ad:'{{F-53}} payment', tutar:120000 }],
        alacak:[{ ad:'{{FB60}} invoice', tutar:120000 }],
        not:'The creating and clearing codes are in **different code families**' },
    ],

    notlar:[
      { tip:'warn', baslik:'More than one code can produce the same posting', metin:
        'An accounting entry doesn\'t have **a single correct transaction code**. ' +
        'The same vendor invoice can be entered three ways:\n\n' +
        '**{{FB60}}** — new generation, single screen, no posting key\n' +
        '**`F-43`** — classic generation, the posting key is entered manually\n' +
        '**{{MIRO}}** — from MM, tied to a purchase order\n\n' +
        'All three produce {{BKPF}} + {{BSEG}}, and the accounting result is **identical**.\n\n' +
        '**But the three aren\'t the same:**\n\n' +
        '{{MIRO}} performs a **three-way match** against the order and goods receipt ' +
        '(see {{konu:mm-integration}}); the other two don\'t. Entering an order-related ' +
        'invoice with {{FB60}} instead **leaves the GR/IR account open**.\n\n' +
        '**Rule:** choosing a code isn\'t a matter of convenience — it\'s a decision about ' +
        '**which control the process will pass through**.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'The **twelve patterns** below explain almost every code you\'ll run into in FI. ' +
      'It isn\'t the codes that get memorized — it\'s **these patterns**.\n\n' +
      '---\n\n' +
      '**The key to three letters — German roots**\n\n' +
      'SAP was developed in German. Three letters carry **the same meaning** in both ' +
      'transaction codes and table names:\n\n' +
      '| Letter | German | English | Transaction code | Table |\n' +
      '|---|---|---|---|---|\n' +
      '| **K** | *Kreditor* | Vendor | `FK01` `FK03` | {{BSIK}} {{BSAK}} |\n' +
      '| **D** | *Debitor* | Customer | `FD01` `FD03` | {{BSID}} {{BSAD}} |\n' +
      '| **S** | *Sachkonto* | G/L account | `FS00` | {{BSIS}} {{BSAS}} |\n\n' +
      'Table names are decoded by the same logic: **BS** + **I/A** + **K/D/S**\n\n' +
      '**I** = *offen* (open item) · **A** = *ausgeglichen* (cleared)\n\n' +
      'So {{BSAK}} = cleared vendor items, {{BSID}} = open customer items. ' +
      'Eight table names, decoded by **two rules**.\n\n' +
      '---\n\n' +
      '**Number suffixes**\n\n' +
      '**01** create · **02** change · **03** display\n\n' +
      '`AS01/02/03` asset · `FK01/02/03` vendor · `KS01/02/03` cost center\n\n' +
      '**9x** = legacy data transfer (*Altdaten*): `AS91` legacy-asset takeover\n\n' +
      '**A well-known exception: {{FS00}}.** There\'s no `FS01/02/03` for a G/L account; ' +
      '`FS00` does all three **in a single screen** — the mode is chosen from within the ' +
      'screen. Because it\'s the exception to the pattern, it comes up often.',

    liste:[
      { ad:'Classic posting',
        aciklama:'The {{kayit-anahtari}} is **entered manually**. For multi-line and clearing transactions.',
        neZaman:'Clearing, advances, complex multi-line postings.',
        ornek:'`F-02` G/L · `F-43` vendor invoice · **{{F-53}}** payment · ' +
              '**{{F-28}}** incoming payment · **{{F-32}}** customer clearing · `F-44` vendor clearing\n\n' +
              '**The dash (`-`) marks the classic generation.** Almost all clearing transactions ' +
              'are in this family — because they require an {{acik-kalem}} selection screen.',
        tcodes:['F-53','F-28','F-32'] },

      { ad:'Enjoy posting',
        aciklama:'A single screen, no posting key **needed** — debit/credit is chosen, the system derives it.',
        neZaman:'Routine single-document postings. The default to hand to users.',
        ornek:'**{{FB50}}** G/L · **{{FB60}}** vendor invoice · **{{FB70}}** customer invoice · ' +
              '**{{FB03}}** display · **{{FB08}}** reversal · {{FB02}} change\n\n' +
              '**Last-digit tip:** `0` tends to be entry, `2` change, `3` display.',
        tcodes:['FB50','FB60','FB03'] },

      { ad:'Line item display',
        aciklama:'A {{dokum}} by account; **you can drill into the document**.',
        neZaman:'For the question *"why is the balance this amount?"*',
        ornek:'**{{FBL1N}}** vendor (**1**) · **{{FBL3N}}** G/L (**3**) · ' +
              '**{{FBL5N}}** customer (**5**)\n\n' +
              'The trailing **`N`** = *neu* (new) — the ALV-enabled version of the old `FBL1`.\n\n' +
              'Line item display requires **open item management to be on** for the account ' +
              'and can\'t be turned on retroactively (see {{konu:reporting}}).',
        tcodes:['FBL1N','FBL3N','FBL5N'] },

      { ad:'Classic reports',
        aciklama:'The dot (`.`) marks a report-type transaction. Most of them run **in bulk**.',
        neZaman:'Period-end and bulk processing.',
        ornek:'**{{F.01}}** financial statement · **{{F.05}}** foreign-currency valuation · ' +
              '**{{F.13}}** automatic clearing · {{F.19}} GR/IR analysis · `F.80` mass reversal\n\n' +
              'Every code in this family gets **a test run first**.',
        tcodes:['F.01','F.05','F.13'] },

      { ad:'Generated report codes',
        aciklama:'Codes **auto-generated** from the report tree. They\'re not meant to be read.',
        neZaman:'Standard financial reports.',
        ornek:'{{S_ALR_87012357}} VAT list · {{S_ALR_87012284}} financial statement · ' +
              '{{S_ALR_87013611}} cost center plan/actual\n\n' +
              '**These aren\'t memorized** — the system generated them, and they carry no ' +
              'meaning. They\'re accessed **from the menu or a favorite**. The benefit of ' +
              'knowing the pattern: seeing this prefix tells you *"this is a standard report, ' +
              'it\'s in the menu."*' },

      { ad:'FI Customizing',
        aciklama:'A **shortcut** to FI configuration screens. All of them are also in the {{SPRO}} tree.',
        neZaman:'When making a configuration change.',
        ornek:'**{{OB52}}** open periods · **{{OBA7}}** document types · ' +
              '**{{OB40}}** tax accounts · {{OB58}} financial statement version · ' +
              '{{OB08}} exchange rate · {{OBYC}} MM account determination\n\n' +
              '**No need to memorize:** search the topic in the {{SPRO}} tree, and clicking ' +
              'the node **already shows** the code.',
        tcodes:['OB52','OBA7','OB40'] },

      { ad:'Validation / Substitution',
        aciklama:'{{konu:dogrulama-ikame}} tools. They carry a separate prefix because they ' +
                 'originate in FI-SL.',
        neZaman:'When setting up a rule that runs at posting time.',
        ornek:'**{{GGB0}}** validation · **{{GGB1}}** substitution · **{{GGB4}}** activation\n\n' +
              'Assignment is in a separate family: {{OB28}} and {{OBBH}}.',
        tcodes:['GGB0','GGB1','GGB4'] },

      { ad:'Asset Accounting',
        aciklama:'All of fixed asset accounting starts with `A`.',
        neZaman:'Asset acquisition, depreciation, retirement.',
        ornek:'{{AS01}} create asset · `AS91` **legacy-asset** takeover (9x = legacy data) · ' +
              '**{{AFAB}}** depreciation · {{ABZON}} acquisition · {{AW01N}} Asset Explorer · ' +
              '{{AIAB}}/{{AIBU}} investment distribution · {{AFAMA}} depreciation key\n\n' +
              '**{{AW01N}}** is the most valuable code in the family: it shows **every ' +
              'movement and every area** of an asset on a single screen.',
        tcodes:['AS01','AFAB','AW01N'] },

      { ad:'Batch programs',
        aciklama:'Numbered codes without a dash or dot are usually **large programs**.',
        neZaman:'Mass payment and dunning.',
        ornek:'**{{F110}}** automatic payment · **{{F150}}** dunning\n\n' +
              '**Their shared pattern:** parameters → **proposal** → check → run. ' +
              'The proposal step is the **only reversible point** in the batch process.',
        tcodes:['F110','F150'] },

      { ad:'Controlling',
        aciklama:'CO objects and transactions start with `K`.',
        neZaman:'Cost center, cost element, internal order transactions.',
        ornek:'{{KS01}} cost center · {{KA01}} cost element · {{KO01}} internal order · ' +
              '**{{KB11N}}** reposting · {{KSU5}} distribution · {{KSV5}} assessment · ' +
              '{{OKB9}} default assignment\n\n' +
              'A correction inside CO is made **with {{KB11N}}, not {{FB08}}** — ' +
              'FI is already correct (see {{konu:cost-center}}).',
        tcodes:['KS01','KB11N','OKB9'] },

      { ad:'Technical',
        aciklama:'Not module tools but **system** tools. The consultant\'s diagnostic kit.',
        neZaman:'Diagnostics, development, authorization analysis.',
        ornek:'**{{SE16N}}** table contents · {{SE11}} table structure · {{SE93}} code definition · ' +
              '{{SE38}} program\n' +
              '**{{SM12}}** locks · **{{SM13}}** update errors · {{SM37}} jobs\n' +
              '**{{SU53}}** authorization failure · {{SU3}} your own parameters\n' +
              '{{ST05}} SQL trace\n\n' +
              'This family **is never given to end users** (see {{konu:sap-tables}}).',
        tcodes:['SE16N','SM13','SU53'] },

      { ad:'Central maintenance',
        aciklama:'`X` = all views together. FI + MM, or FI + SD, on the same screen.',
        neZaman:'When opening master data — **the preferred route**.',
        ornek:'**{{XK01}}** vendor (FI + purchasing) · **{{XD01}}** customer (FI + sales)\n\n' +
              'Compare: {{FK01}} is **accounting view only**, `MK01` is **purchasing view only**.\n\n' +
              'A vendor opened with {{FK01}} **can\'t have a purchase order entered against it** — ' +
              'there\'s no purchasing view. A classic new-consultant mistake.',
        tcodes:['XK01','XD01','FK01'] },
    ],

    karsilastirmaBasliklar:['`F-43` (classic generation)', '{{FB60}} (new generation)'],
    karsilastirma:[
      ['Number of screens', 'Multi-screen, line by line', '**Single screen**'],
      ['{{kayit-anahtari}}', '**Entered manually** (31, 40 …)', 'Not needed — the system derives it'],
      ['Learning curve', 'Steep — key knowledge required', '**Low**'],
      ['Multi-line posting', '**Strong**', 'Limited'],
      ['Open item selection', '**Yes**', 'No'],
      ['Accounting result', 'Same document', '**Same document**'],
      ['Given to whom', 'Accounting specialist', '**End user**'],
      ['S/4HANA status', 'Still there', 'Still there · has a Fiori counterpart'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'SE93', ad:'Transaction code definition — "what does this code run?"',
        amac:'Shows the program, screen, and type behind a transaction code.',
        neZaman:'When decoding a custom (`Z*`) code; when verifying what a code does.',
        adimlar:[
          { baslik:'Enter the transaction code and display it' },
          { baslik:'Read the **transaction type**',
            aciklama:'Dialog · report · **parameter transaction** · object method. ' +
                     'The type decides how the code behaves.' },
          { baslik:'Get the program and screen number' },
          { baslik:'If needed, inspect the program with {{SE38}}' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Transaction code **`ZFI_RAPOR`**' },
          { ekran:'Definition', islem:'Type: **report transaction** · program `ZFIR_ACIK_KALEM`' },
          { ekran:'Conclusion', islem:'A custom ABAP report — not a standard one' },
          { ekran:'Follow-up', islem:'Source inspected with {{SE38}}, seen that it reads {{BSIK}}' },
        ],
        alanlar:{
          zorunlu:['Transaction code'],
          opsiyonel:['Package','Authorization object assignment'] },
        hatalar:[
          { mesaj:'Transaction ... does not exist', sebep:'The code doesn\'t exist or is spelled differently.', cozum:'Search by **description** in {{TSTCT}}; the code may not have been transported to this client.' },
          { mesaj:'The code exists but throws an error when run', sebep:'The program behind it wasn\'t transported.', cozum:'Check whether the program exists with {{SE38}}.' },
        ],
        ipucu:'The **parameter transaction** concept is little known but comes up often: ' +
              'it\'s a code that calls another transaction with **fields pre-filled**.\n\n' +
              'Example: the code `Z_FB03_1000` opens {{FB03}} with company code 1000 fixed. ' +
              'The user can\'t change the field.\n\n' +
              'This is **a technique used in authorization design** — a practical way to ' +
              'restrict a user to a single company code.',
        ilgili:['SE38','SE16N','TSTC'] },

      { kod:'SU3', ad:'Own user data — default field values',
        amac:'Assigns an **automatic default** to frequently repeated fields.',
        neZaman:'Day one. The first setting a consultant makes when settling into a system.',
        adimlar:[
          { baslik:'Run {{SU3}}' },
          { baslik:'Switch to the **Parameters** tab' },
          { baslik:'Enter the parameter ID and value',
            aciklama:'`BUK` = 1000 (company code) · `CAC` = 1000 (controlling area) · ' +
                     '`GJR` = 2027 (fiscal year).' },
          { baslik:'Save — the effect shows up **on the next screen**' },
        ],
        ekranAkisi:[
          { ekran:'Parameters', islem:'`BUK` = **1000**' },
          { ekran:'Test', islem:'{{FB03}} opened → the company code **came in pre-filled**' },
          { ekran:'Payoff', islem:'A repeated entry across dozens of screens a day disappears' },
        ],
        alanlar:{
          zorunlu:['Parameter ID','Value'],
          opsiyonel:['Default printer','Date/number format','Logon language'] },
        hatalar:[
          { mesaj:'I entered a parameter but the field doesn\'t fill in', sebep:'That field isn\'t tied to a parameter ID.', cozum:'Hover the field, `F1` → **Technical information** shows the parameter ID; if it\'s blank, it isn\'t supported.' },
          { mesaj:'The default brings up the wrong company code', sebep:'The old `BUK` value is still there.', cozum:'Update it from {{SU3}}. A wrong default is a risk of **posting to the wrong company code**.' },
        ],
        ipucu:'**How do you find a field\'s parameter ID?**\n\n' +
              'Hover over the field → **`F1`** → **Technical information** → *Parameter ID*.\n\n' +
              'This is the consultant\'s biggest time-saving trick, and the same route also ' +
              'gives you the field\'s **technical name** — exactly what you need when ' +
              'searching a table.',
        ilgili:['SMEN','SE93'] },

      { kod:'SPRO', ad:'IMG — the single gateway to customizing',
        amac:'Presents every configuration screen in a **tree structure**.',
        neZaman:'Every time you can\'t remember an `OB*` code.',
        adimlar:[
          { baslik:'{{SPRO}} → SAP Reference IMG' },
          { baslik:'Find the topic in the tree',
            aciklama:'Financial Accounting → … The search function can also be used.' },
          { baslik:'**Read the transaction code** next to the node',
            aciklama:'The code is **written on the node** — no need to memorize it.' },
          { baslik:'Open the screen with the clock icon' },
        ],
        alanlar:{
          zorunlu:[],
          opsiyonel:['Project IMG','Documentation','Transport request'] },
        hatalar:[
          { mesaj:'I can\'t find the node I\'m looking for', sebep:'The IMG tree is too deep.', cozum:'Use the **search** inside the tree; or search by description in {{TSTCT}}.' },
          { mesaj:'The change isn\'t saving / it\'s asking for a transport request', sebep:'The customizing change requires a transport request.', cozum:'Create a {{tasima-istegi}}. If the client setting is closed to changes, consult the Basis team.' },
        ],
        ipucu:'**{{SPRO}} makes memorizing `OB*` codes unnecessary.**\n\n' +
              'The most common inefficiency among new consultants is trying to memorize ' +
              'customizing codes. There are hundreds of them and most are used once a year.\n\n' +
              'The right habit: **find the topic in the tree, read the code from there.** ' +
              'The ones you use often get memorized on their own anyway.',
        ilgili:['OB52','OBA7','SE93'] },

      { kod:'SE16N', ad:'Searching for a code through {{TSTCT}}',
        amac:'Finds a transaction code by its **description** — for when the pattern isn\'t enough.',
        neZaman:'*"I know what it does but I don\'t know the code."*',
        adimlar:[
          { baslik:'{{SE16N}} → table **{{TSTCT}}**' },
          { baslik:'`SPRSL` = `EN` (or another language)',
            aciklama:'If no language is given, every language comes back; the result becomes unreadable.' },
          { baslik:'Search the `TTEXT` field with a wildcard',
            aciklama:'Example: `*dunning*` · `*depreciation*` · `*validation*`' },
          { baslik:'Narrow further with `TCODE`', aciklama:'Example: `OB*` for FI customizing only' },
        ],
        ekranAkisi:[
          { ekran:'Table', islem:'**{{TSTCT}}**' },
          { ekran:'Selection', islem:'`SPRSL` = EN · `TTEXT` = `*dunning*`' },
          { ekran:'Result', islem:'**{{F150}}** — Dunning · a few related codes' },
          { ekran:'Narrowing', islem:'`TCODE` = `OB*` added → only dunning **customizing**' },
        ],
        alanlar:{
          zorunlu:['Table name'],
          opsiyonel:['Language','Text pattern','Code pattern'] },
        hatalar:[
          { mesaj:'Too many results come back', sebep:'The pattern is too broad, or no language was given.', cozum:'Add `SPRSL` and narrow with a `TCODE` pattern (`OB*`, `F*`, `S_ALR*`).' },
          { mesaj:'A search in one language returns no results', sebep:'The texts may not be translated into that language.', cozum:'Search with `SPRSL` = `EN` on the English term instead — it\'s usually the most complete.' },
        ],
        ipucu:'**If you can\'t find a result in your language, switch to English.** ' +
              'A SAP text\'s translation can be incomplete; the English text base ' +
              '**is always complete**.\n\n' +
              'Useful English keywords: *dunning* (ihtar) · *depreciation* (amortisman) · ' +
              '*clearing* (kapatma) · *valuation* (değerleme) · *parking* (park).',
        ilgili:['TSTC','TSTCT','SE93'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Transaction codes are data too, and they live in **two tables**: ' +
      '{{TSTC}} holds the definition, {{TSTCT}} holds the description. ' +
      'This is the technical foundation of code search.',

    liste:[
      { ad:'TSTC', baslik:'Transaction code definitions',
        tutar:'**Every** transaction code in the system and the program behind it.',
        olusturan:'SAP standard delivery; custom codes via {{SE93}}',
        anahtar:'**TCODE**',
        iliskiler:'Texts sit in {{TSTCT}}, one row per language.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'TCODE', aciklama:'Transaction code', tip:'pk' },
          { ad:'PGMNA', aciklama:'ABAP program — "what does this code run?"' },
          { ad:'DYPNO', aciklama:'Screen number' },
          { ad:'CINFO', aciklama:'Type: dialog / report / **parameter transaction**' },
        ] },

      { ad:'TSTCT', baslik:'Transaction code texts — the real table for searching',
        tutar:'Descriptions of the codes, **by language**.',
        olusturan:'SAP standard delivery',
        anahtar:'**SPRSL + TCODE**',
        iliskiler:'The text extension of {{TSTC}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'SPRSL', aciklama:'Language — `TR` / `EN` / `DE`. **If not given, every language comes back**', tip:'pk' },
          { ad:'TCODE', aciklama:'Transaction code', tip:'pk' },
          { ad:'TTEXT', aciklama:'**Description** — searched with a wildcard like `*dunning*`' },
        ] },

      { ad:'BKPF', baslik:'The trace of the document a code produced',
        tutar:'Every document stores **which transaction** created it.',
        olusturan:'Posting a document',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'The `TCODE` field points to {{TSTC}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'TCODE', aciklama:'**The transaction code that produced the document** — very valuable in audit and diagnosis' },
          { ad:'BLART', aciklama:'{{belge-turu}} — together with the code it tells you the posting\'s origin' },
          { ad:'USNAM', aciklama:'The user who posted it' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Transaction code → program → the document it produces',
      varliklar:[
        { ad:'TSTC', rol:'Definition', hub:true, aciklama:'**The transaction code and its program**',
          alanlar:[{ ad:'TCODE', tip:'pk' }, { ad:'PGMNA' }, { ad:'DYPNO' }, { ad:'CINFO' }] },
        { ad:'TSTCT', rol:'Text', aciklama:'Description — **the table for searching**',
          alanlar:[{ ad:'SPRSL', tip:'pk' }, { ad:'TCODE', tip:'pk' }, { ad:'TTEXT' }] },
        { ad:'BKPF', rol:'Document', aciklama:'The document the code **produces**',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'TCODE', tip:'fk' }, { ad:'BLART' }, { ad:'USNAM' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'Line items — a single table',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'RACCT' }] },
      ],
      iliskiler:[
        { from:'TSTC', to:'TSTCT', alanlar:'TCODE', not:'**text by language**' },
        { from:'TSTC', to:'BKPF', alanlar:'TCODE', not:'code → the document it produced' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'header → line item' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'There are three interfaces for using a transaction code: the **command field** ' +
      '(the fastest), the **menu** (the most reliable), and **favorites** (the most convenient).',

    ekranlar:[
      { ad:'The command field — the box at the top left',
        aciklama:'Where the code is typed. Prefixes work here.',
        alanlar:[
          { ad:'`/n<code>`', zorunlu:false, aciklama:'**Close** the current transaction, start ' +
                   'the new one. The most commonly used prefix.' },
          { ad:'`/o<code>`', zorunlu:false, aciklama:'Open it **in a separate session** — ' +
                   'for comparing two screens.' },
          { ad:'`/n`', zorunlu:false, aciklama:'Close the transaction, return to the main menu.' },
          { ad:'`/i`', zorunlu:false, aciklama:'Close the current session.' },
          { ad:'`/nex`', zorunlu:false, aciklama:'Exit **without asking for confirmation** — ' +
                   'unsaved data is discarded without being asked about.' },
          { ad:'`/$sync`', zorunlu:false, aciklama:'**Clear the {{tampon}}s.** ' +
                   'The fix for *"I changed the setting, the effect isn\'t showing."* ' +
                   'Affects every user in production.' },
        ],
        ipucu:'**`/o` is the least known but most useful prefix.**\n\n' +
              'It lets you enter a posting in one session while looking at a table with ' +
              '{{SE16N}} in another, or enter a posting while watching a balance with {{FBL3N}}.\n\n' +
              'Session count is limited (usually 6) and extra sessions consume memory; ' +
              'close a finished session with **`/i`**.' },

      { ad:'{{SMEN}} — the SAP Easy Access menu',
        aciklama:'The **most reliable** route if you don\'t know the code.',
        alanlar:[
          { ad:'Menu tree', zorunlu:false, aciklama:'Accounting → Financial Accounting → … ' +
                   'Follows the logic of the business process.' },
          { ad:'**Favorites**', zorunlu:false, aciklama:'Frequently used codes. ' +
                   'Can be organized into folders and **exported** — carried over to a new system.' },
          { ad:'Technical name display', zorunlu:false, aciklama:'Extras → Settings → ' +
                   '*Display Technical Names*. **Should be turned on while learning.**' },
        ],
        ipucu:'**Turn on "Display Technical Names" on day one.**\n\n' +
              'While navigating the menu, the **transaction code shows up** next to every ' +
              'node. This is the most effortless way to learn codes: as you work, ' +
              'the codes become familiar on their own.\n\n' +
              'With it off, only screen names show and code knowledge **never builds up**.' },

      { ad:'{{SU3}} — default parameters',
        aciklama:'Puts an end to repeated field entries.',
        alanlar:[
          { ad:'`BUK`', zorunlu:false, aciklama:'Company code default.' },
          { ad:'`CAC`', zorunlu:false, aciklama:'{{kontrol-alani}} default.' },
          { ad:'`GJR`', zorunlu:false, aciklama:'Fiscal year default.' },
          { ad:'Default printer', zorunlu:false, aciklama:'Stops mass reports from asking for ' +
                   'an output destination.' },
        ],
        ipucu:'**A field\'s parameter ID:** hover the field, **`F1`** → ' +
              '**Technical information** → *Parameter ID*.\n\n' +
              'The same screen also gives the field\'s **technical name** — exactly what ' +
              'you need when searching a table with {{SE16N}}.\n\n' +
              'A wrong `BUK` default is a risk of **posting to the wrong company code**; ' +
              'if you work across several company codes, leaving it blank is safer.' },
    ],

    zorunlu:['Transaction code','`S_TCODE` authorization'],
    opsiyonel:['A prefix (`/n`, `/o`)','Parameter defaults','A favorite'],

    hatalar:[
      { mesaj:'You are not authorized to use transaction ...', sebep:'No `S_TCODE` authorization.', cozum:'Check the missing authorization with {{SU53}}, forward a screenshot to authorization.' },
      { mesaj:'Transaction ... does not exist', sebep:'The code doesn\'t exist, is misspelled, or was removed in this release.', cozum:'Search by description in {{TSTCT}}. It may have been removed in S/4HANA — check the **simplification list**.' },
      { mesaj:'The code opens but the list comes back **empty** — with no error', sebep:'`S_TCODE` is present but the **data authorization** (`F_BKPF_BUK`) is missing.', cozum:'The most misleading error: the transaction starts, no data comes back. Check with {{SU53}}. Details: this topic\'s scenario.' },
      { mesaj:'I changed the setting but don\'t see any effect', sebep:'The table is {{tampon}}ed.', cozum:'Log off and back on; if that doesn\'t help, `/$sync`. Affects every user in production.' },
      { mesaj:'I typed the code into the command field and got an error', sebep:'The current transaction is still open.', cozum:'Type it with the `/n` prefix: `/nFB03`.' },
      { mesaj:'I don\'t know what this `Z*` code does', sebep:'A customer-specific development.', cozum:'Find the program with {{SE93}}, inspect it with {{SE38}}.' },
    ],

    ipuclari:[
      '**Turn on "Display Technical Names" on day one** — codes get learned on their own as you work.',
      'Open a second session with `/o`: a posting on one side, a table on the other.',
      'If you don\'t know the code, search by **description** in {{TSTCT}}; if a search in ' +
      'your own language returns nothing, **switch to English**.',
      'Don\'t memorize `OB*` codes in customizing — find the topic in the {{SPRO}} tree, the code is written on the node.',
      'Set the company code as default with {{SU3}} → `BUK`; ' +
      'leave it blank if you work across several companies.',
      '`F1` → **Technical information** gives you a field\'s parameter ID and technical name.',
      '**Export** your favorites — they carry over to a new system or a new project.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'TSTC', ne:'The transaction code definition — **read**, not updated during posting' },
      { tablo:'TSTCT', ne:'Code descriptions — by language' },
      { tablo:'BKPF', ne:'The `TCODE` field is written with **the code that produced the document**' },
    ],

    commit:
      'A transaction code doesn\'t start an LUW — **the program does**. ' +
      'The LUW starts with the posting operation inside the program.\n\n' +
      'But one distinction matters: **dialog** transactions wait for user interaction, ' +
      '**report** transactions run once, straight through, after the selection screen.\n\n' +
      'Bulk programs ({{F110}}, {{AFAB}}, {{F.05}}) can be run **in the background**; ' +
      'then the LUW belongs to the background job and is monitored with {{SM37}}.',

    belgeNo:
      'The {{BKPF}} `TCODE` field stores **which transaction produced** the document.\n\n' +
      'This field is very valuable in diagnosis: on a tax account, lines with `TCODE` = ' +
      '`FB50` are entries that were **posted manually** (see {{konu:taxes}}). ' +
      'The same way, lines with `TCODE` = `FB08` are reversals.\n\n' +
      'It\'s also used in audit: the answer to *"which screen was this posting entered ' +
      'from?"* is right here.',

    postingLogic:
      'The sequence when a transaction code is run:\n\n' +
      '**1.** The program and screen are read from {{TSTC}}.\n' +
      '**2.** The **`S_TCODE` authorization** is checked → if missing, the transaction ' +
      '**never starts at all**.\n' +
      '**3.** The program starts; the screen is drawn.\n' +
      '**4.** **Object-based authorization** checks run inside the program ' +
      '(`F_BKPF_BUK` company code, `F_BKPF_KOA` account type).\n' +
      '**5.** If a posting is made, {{konu:dogrulama-ikame}} rules kick in.\n' +
      '**6.** The document is written; the `TCODE` field is filled in.\n\n' +
      '**It\'s critical that steps 2 and 4 are separate.** ' +
      'If `S_TCODE` is present, the transaction **opens**; if data authorization is ' +
      'missing, an **empty list** comes back. The user sees no error and assumes ' +
      '*"there\'s no data."* This is the subject of this topic\'s scenario.',

    belgeTuru:
      '{{belge-turu}} and the transaction code are **linked** but not the same thing.\n\n' +
      '{{FB60}} produces `KR` by default, {{FB70}} produces `DR` — ' +
      'but the user **can change it** (with the right authorization).\n\n' +
      'The two are used together in diagnosis: lines with `BLART` = `SA` **and** ' +
      '`TCODE` = `FB50` are entries **manually** posted to an account that should have been automatic.',

    numberRange:
      'Transaction codes don\'t use number ranges. ' +
      'The documents they produce take their number from the range tied to {{belge-turu}}.\n\n' +
      'Custom codes are created with {{SE93}} and must start with `Z` or `Y` — ' +
      'the rule that prevents a clash with SAP\'s own namespace.',

    accountDetermination:
      'A transaction code **triggers** account determination but doesn\'t contain it. ' +
      'When {{MIRO}} runs, {{OBYC}} kicks in; when {{VF01}} runs, {{VKOA}} does.\n\n' +
      'The practical upshot: when you get an *"account determination error"* message, ' +
      '**the code\'s module** tells you which table to look at — {{OBYC}} for an MM code, ' +
      '{{VKOA}} for an SD code, {{T030K}} for FI tax.',

    tur:
      'The **transaction type** in {{SE93}} decides how the code behaves:\n\n' +
      '**Dialog transaction** — tied to a screen, waits for user interaction ({{FB60}}).\n\n' +
      '**Report transaction** — runs an ABAP report with a selection screen ({{F.01}}).\n\n' +
      '**Parameter transaction** — calls another transaction with **fields pre-filled**. ' +
      'A practical way to restrict a user to a single company code.\n\n' +
      '**Object method transaction** — runs a business object\'s method.',

    transport:
      'Standard transaction codes aren\'t transported — **they come with the system**.\n\n' +
      'Custom (`Z*`) codes are created with {{SE93}} and **are transported**. ' +
      'The code transports, but **the program behind it is a separate object**; ' +
      'if one arrives and the other doesn\'t, you get *"the code exists but doesn\'t work."*\n\n' +
      '**Roles ({{PFCG}}) transport separately, too.** Even if the code has already gone ' +
      'to production, the user is left **unauthorized** if the role hasn\'t been updated — ' +
      'one of the most commonly skipped steps in a migration.',

    img:[
      { yol:'SE93 → Transaction Code Maintenance', not:'Creating a custom code and setting its type' },
      { yol:'SU3 → Own Data → Parameters', not:'`BUK`, `CAC`, `GJR`' },
      { yol:'PFCG → Role Maintenance → Menu', not:'`S_TCODE` authorization for the code comes from the role' },
      { yol:'Easy Access → Extras → Settings → Display Technical Names', not:'Should be turned on day one' },
    ],

    ekstra:[
      { ic:'🔤', baslik:'German roots — decoding 8 table names with 2 rules', metin:
        'SAP was developed in Germany, and **German abbreviations got embedded into code ' +
        'names**. This isn\'t a historical quirk — it\'s **a key that shortens learning**.\n\n' +
        '**Three account-type letters:**\n\n' +
        '**K** = *Kreditor* → vendor\n' +
        '**D** = *Debitor* → customer\n' +
        '**S** = *Sachkonto* → G/L account\n\n' +
        'These three letters are the same **in both transaction codes and table names**:\n\n' +
        '`FK01` opens a vendor · `FD01` opens a customer · `FS00` opens a G/L account\n\n' +
        '---\n\n' +
        '**Table names: BS + I/A + K/D/S**\n\n' +
        '**I** = *offen* (open item) · **A** = *ausgeglichen* (cleared)\n\n' +
        '| | Vendor (K) | Customer (D) | G/L (S) |\n' +
        '|---|---|---|---|\n' +
        '| **Open (I)** | {{BSIK}} | {{BSID}} | {{BSIS}} |\n' +
        '| **Cleared (A)** | {{BSAK}} | {{BSAD}} | {{BSAS}} |\n\n' +
        '**Eight table names, decoded by two rules.** ' +
        'Trying to memorize each one separately means missing the rule.\n\n' +
        '---\n\n' +
        '**Other common German traces:**\n\n' +
        '**`SHKZG`** — *Soll/Haben-Kennzeichen* → **S** debit, **H** credit ' +
        '(see {{konu:sap-tables}})\n' +
        '**`BUKRS`** — *Buchungskreis* → company code\n' +
        '**`BELNR`** — *Belegnummer* → document number\n' +
        '**`GJAHR`** — *Geschäftsjahr* → fiscal year\n' +
        '**`WRBTR`** — *Währungsbetrag* → amount in transaction currency\n' +
        '**`BLART`** — *Belegart* → document type\n' +
        'The **`N`** suffix — *neu* (new) → {{FBL1N}}, {{ME21N}}, {{KB11N}}\n\n' +
        'The **`BUK`** parameter is also *Buchungskreis* — the default in {{SU3}}.\n\n' +
        '**Practical takeaway:** when you don\'t recognize a field name, try guessing the ' +
        'German root; it holds up surprisingly often.' },

      { ic:'🔒', baslik:'Is `S_TCODE` enough? — two-layer authorization', metin:
        'Transaction-code authorization has **two layers**, and not knowing this distinction ' +
        'produces a class of error that can\'t be diagnosed.\n\n' +
        '**Layer 1 — `S_TCODE`:** *"Can this code be run at all?"*\n' +
        'Without it the transaction **never starts** and a clear message comes back: ' +
        '*"You are not authorized to use transaction ..."*\n\n' +
        '**Layer 2 — object authorizations:** *"Which data can be seen?"*\n' +
        '`F_BKPF_BUK` company code · `F_BKPF_KOA` account type · `F_BKPF_BLA` document type\n\n' +
        '---\n\n' +
        '**The dangerous case: the first is there, the second isn\'t.**\n\n' +
        'The transaction **opens**, the user sees the selection screen, runs it, and ' +
        '**an empty list** comes back. No error message appears.\n\n' +
        'The user lands on one of two wrong conclusions: *"there\'s no data"* or *"the ' +
        'system is broken."* Both are wrong — the data exists, **the authorization to see ' +
        'it doesn\'t**.\n\n' +
        '**Why doesn\'t it throw an error?** Most FI reports apply authorization as a ' +
        '**filter**: they list the authorized company codes and only query those. If the ' +
        'list is empty, the query returns empty — which, from the program\'s point of ' +
        'view, **isn\'t an error condition**.\n\n' +
        '**Diagnosis:** the user runs {{SU53}} **immediately after** getting the empty ' +
        'list; the last failed authorization check shows up. A screenshot goes to the ' +
        'authorization team.\n\n' +
        '**{{SU53}} shows only the last check** — if another transaction runs in between, ' +
        'the trace is lost. That\'s why *"immediately after"* is essential.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Authorization doesn\'t end with `S_TCODE`', metin:
        'The most common misconception among new consultants: *"I added the transaction ' +
        'code to the role, authorization is done."*\n\n' +
        '**It isn\'t.** `S_TCODE` only allows the code **to run**. Separate objects decide ' +
        'which data can be seen:\n\n' +
        '`F_BKPF_BUK` — **company code**\n' +
        '`F_BKPF_KOA` — account type (S / K / D / A)\n' +
        '`F_BKPF_BLA` — document type\n\n' +
        'Each of them also has an **activity**: **01** create · **02** change · **03** display.\n\n' +
        '**Practical result:** a request to *"let them view but not post"* is solved not ' +
        'by adding a code, but by **granting activity 03 and withholding 01/02**.\n\n' +
        'The same way, a request to *"only see their own company code"* is solved with ' +
        '`F_BKPF_BUK` — not with the list of transaction codes.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Transaction codes **weren\'t removed** in S/4HANA — the command field and {{SMEN}} ' +
      'keep working. Two things changed: **Fiori apps** became the primary interface, ' +
      'and some codes were **removed or redirected via the simplification list**.',

    eccFarklari:[
      { konu:'Command field', ecc:'Primary access', s4:'**Still there** — the same in the GUI' },
      { konu:'Primary interface', ecc:'The SAP GUI menu', s4:'**Fiori Launchpad** tiles' },
      { konu:'FI posting codes', ecc:'{{FB50}}, {{FB60}}, {{FB70}}', s4:'**Still there** + Fiori counterparts' },
      { konu:'Line item codes', ecc:'{{FBL1N}}, {{FBL3N}}, {{FBL5N}}', s4:'Still there · Fiori: *Display Line Items*' },
      { konu:'MM posting codes', ecc:'`MB01`, `MB1A`, `MB1B`, `MB31` …', s4:'**Removed** → {{MIGO}}' },
      { konu:'Vendor/customer master data', ecc:'{{XK01}}, {{XD01}}, {{FK01}}, {{FD01}}', s4:'**{{BP}}** — a single business partner transaction' },
      { konu:'Technical codes', ecc:'{{SE16N}}, {{SE93}}, {{SM13}}', s4:'**Still there**' },
      { konu:'Finding a code', ecc:'Menu + {{TSTCT}}', s4:'+ **Fiori Apps Reference Library**' },
    ],

    universalJournal:
      'The {{evrensel-kayit-defteri}} didn\'t directly change transaction codes — ' +
      'the same codes open the same screens.\n\n' +
      'But the table they read **underneath** changed: {{FBL3N}} now reads from ' +
      '{{ACDOCA}} (through a compatibility view).\n\n' +
      'The practical result: **the code is the same, the performance is different.** ' +
      'Old custom reports running through a compatibility view can end up slower ' +
      '(see {{konu:sap-tables}}).',

    kalkanTcodes:[
      { eski:'{{XK01}} / {{FK01}} / `MK01`', yeni:'**{{BP}}**', not:'Vendor master data — **a single business partner transaction**' },
      { eski:'{{XD01}} / {{FD01}} / `VD01`', yeni:'**{{BP}}**', not:'Customer master data' },
      { eski:'`MB01`, `MB1A`, `MB1B`, `MB1C`, `MB31`', yeni:'{{MIGO}}', not:'MM goods movements were unified' },
      { eski:'`ME21` (without the N)', yeni:'{{ME21N}}', not:'The old version was removed' },
      { eski:'—', yeni:'—', not:'FI posting and line item codes **weren\'t removed**' },
    ],

    fiori:[
      { ad:'Fiori Apps Reference Library', aciklama:'The official source for the **code → app** ' +
             'mapping. Look here to find whether a transaction code has a Fiori counterpart.' },
      { ad:'Post General Journal Entries', aciklama:'The {{FB50}} counterpart.' },
      { ad:'Create Supplier Invoice', aciklama:'The {{FB60}} counterpart.' },
      { ad:'Display Supplier Line Items', aciklama:'The {{FBL1N}} counterpart — ' +
             'the same data, with **filtering and charts** added.' },
      { ad:'Manage Journal Entries', aciklama:'A merger of {{FB03}} + {{FBV3}}.' },
      { ad:'Transaction tiles', aciklama:'Codes with no Fiori counterpart are added to the ' +
             'Launchpad as a **GUI tile** — so no functionality is ever lost.' },
    ],

    compatibilityViews:[
      'Transaction codes **aren\'t affected** by the {{uyumluluk-view}} — the code runs the same.',
      'What\'s affected is **performance**: old code slows down when it reads through the view.',
      '{{TSTC}} and {{TSTCT}} **remain real tables**.',
    ],

    performans:
      'The cost of starting a transaction hasn\'t changed in S/4HANA. ' +
      'What changed is that the **queries behind the codes** got faster.\n\n' +
      'Line-item codes like {{FBL3N}} sped up noticeably on large accounts thanks to ' +
      'columnar storage.\n\n' +
      'But custom codes running **through a {{uyumluluk-view}}** can go the other way ' +
      'and slow down; this is why a post-migration performance test is necessary.',

    bestPractices:[
      '**Build an inventory of the codes actually used** before migration — a real year\'s ' +
      'usage can be pulled from the {{BKPF}} `TCODE` field. Plan with **data**, not assumptions.',
      'Compare the inventory against the **simplification list**; flag the codes being removed.',
      'Rewrite master-data processes around **{{BP}}** — the {{XK01}}/{{XD01}} habit is ' +
      'the change that meets the most resistance.',
      'Update the screenshots in training documents; even where the code stays the same, ' +
      '**the Fiori interface is different**.',
      'Add a **GUI tile** for codes with no Fiori counterpart — so users don\'t say ' +
      '"my old screen is gone."',
      'Review the roles ({{PFCG}}): removed codes leave **dead lines** behind in roles.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'"FBL5N comes back empty" — an authorization gap that throws no error',
    hikaye:
      'At **Doğu Tekstil Inc.**, a newly hired accounting clerk calls in: ' +
      '*"{{FBL5N}} opens but the list comes back empty when I run it. ' +
      'No error either. I know the customer has open invoices."*\n\n' +
      'The consultant tries it on the same user\'s screen — genuinely empty.\n\n' +
      'Tries it with their own user — **47 items come back**.\n\n' +
      'Same code, same selection, different result. And **no error message at all**.',
    veriler:[
      { k:'Transaction code', v:'**{{FBL5N}}** — customer line item list' },
      { k:'User', v:'MUHASEBE07 (new employee)' },
      { k:'Selection', v:'Customer 100234 · company code **2000** · open items' },
      { k:'Result', v:'**0 items** — **no** error message' },
      { k:'With the consultant\'s user', v:'**47 items**' },
    ],

    adimlar:[
      { baslik:'Does the data actually exist? — this is verified first', tcode:'SE16N',
        aciklama:'The table is checked without trusting the screen.',
        girdi:[
          { alan:'Table', deger:'{{BSID}} — customer **open** items' },
          { alan:'Selection', deger:'`KUNNR` = 100234 · `BUKRS` = **2000**' },
          { alan:'Result', deger:'**47 records**' },
          { alan:'Conclusion', deger:'The data **exists** — the problem is in display' },
        ],
        not:'This is always the first step: *"does the data actually exist?"*\n\n' +
             'If it does, the problem is **access, not data**; if it doesn\'t, the problem ' +
             'is **in posting**. Without making this distinction, diagnosis heads the ' +
             'wrong way.\n\n' +
             'Here the data exists — so the user **can\'t see it**.' },

      { baslik:'The first hypothesis is ruled out — is line item display off?', tcode:'SE16N',
        aciklama:'The known cause of a missing line item display is checked.',
        girdi:[
          { alan:'Table', deger:'{{KNB1}} — customer company code data' },
          { alan:'Check', deger:'Customer 100234 · company code 2000 · **record exists**' },
          { alan:'Conclusion', deger:'The customer is **defined** in this company code' },
          { alan:'Additional note', deger:'Open item management is **already mandatory** on customer accounts' },
        ],
        not:'The *"if line item display is off, you can\'t get a line item report"* issue ' +
             'covered in {{konu:reporting}} is **specific to G/L accounts**.\n\n' +
             'On customer and vendor accounts, open item management is **always on** — ' +
             'open item tracking is the very reason these accounts exist.\n\n' +
             'This hypothesis is ruled out.' },

      { baslik:'Authorization is checked — but there was no error message', tcode:'SU53',
        aciklama:'The user runs it **immediately after** getting the empty list.',
        girdi:[
          { alan:'Run by', deger:'MUHASEBE07 — **immediately after** the empty list' },
          { alan:'Failed object', deger:'**`F_BKPF_BUK`**' },
          { alan:'Missing value', deger:'`BUKRS` = **2000**' },
          { alan:'Existing authorization', deger:'`BUKRS` = **1000** (only)' },
        ],
        not:'**Root cause found.**\n\n' +
             'The user had **`S_TCODE`** authorization — that\'s why {{FBL5N}} **opened**. ' +
             'But the **`F_BKPF_BUK`** authorization only covered company code **1000**; ' +
             'the query was for **2000**.\n\n' +
             '**Why didn\'t it throw an error?** Most FI reports apply authorization as a ' +
             '**filter**: they list the authorized company codes and only query those. ' +
             'Since 2000 wasn\'t on the list, the query **never ran** and returned empty. ' +
             'From the program\'s point of view, this **isn\'t an error condition**.\n\n' +
             'The user, though, assumed *"there\'s no data."*' },

      { baslik:'Why is there authorization for 1000 but not 2000?', tcode:'PFCG',
        aciklama:'How the role was assigned is examined.',
        girdi:[
          { alan:'The user\'s role', deger:'`Z_FI_MUHASEBE_1000`' },
          { alan:'Role name', deger:'The company code is **embedded in the name**' },
          { alan:'The user\'s job', deger:'Works in **both** company codes' },
          { alan:'Reason', deger:'Only the 1000 role was assigned during onboarding — 2000 was forgotten' },
        ],
        not:'**A process error, not a system error.**\n\n' +
             'The onboarding process includes role assignment, but the question ' +
             '*"which company codes will they work in?"* was **never asked**. ' +
             'A single role was assigned by default.\n\n' +
             'Having the company code appear in the role name (`Z_FI_MUHASEBE_1000`) is ' +
             'actually good design — it makes the gap **visible**. If the role had been ' +
             'named `Z_FI_MUHASEBE`, no one would have noticed.' },

      { baslik:'Fix and verification', tcode:'SU53',
        aciklama:'The second role is assigned and the result is tested.',
        girdi:[
          { alan:'Role assigned', deger:'`Z_FI_MUHASEBE_2000`' },
          { alan:'User action', deger:'Logged off and back on — the **authorization buffer** refreshed' },
          { alan:'{{FBL5N}} again', deger:'**47 items** ✓' },
          { alan:'{{SU53}}', deger:'**No** failed check ✓' },
        ],
        fis:{ baslik:'One of the items that became visible', belgeTuru:'DR', tarih:'05.11.2027',
          satirlar:[
            { hesap:'120', ad:'Trade receivables — company code 2000', borc:88500, not:'{{BSID}} open item' },
            { hesap:'600', ad:'Domestic sales', alacak:73750 },
            { hesap:'391', ad:'Output VAT', alacak:14750 },
          ], not:'The document **had always been there** — the user just couldn\'t see it.\n\n' +
                 'Nothing changed in the accounting; what changed was **access**.' },
        tabloEtkisi:[
          { tablo:'BSID', ne:'**Unchanged** — the data was already there, only the authorization changed' },
        ],
        not:'**Logging off and back on was necessary.** Authorizations are loaded into a ' +
             '**{{tampon}}** at logon; once a role is assigned, it doesn\'t take effect ' +
             'immediately in the current session.\n\n' +
             'This is the most common cause of the complaint *"I granted the authorization ' +
             'but it still doesn\'t work,"* and the fix is simple.' },

      { baslik:'Lasting measures', tcode:'PFCG',
        aciklama:'Four measures so the same class of problem doesn\'t recur.',
        girdi:[
          { alan:'Measure 1', deger:'The question **"which company codes?"** was added to the onboarding checklist' },
          { alan:'Measure 2', deger:'Users were taught the **{{SU53}} reflex**: empty list → SU53 right away → screenshot' },
          { alan:'Measure 3', deger:'Role naming will **keep** the company code in it — so a gap stays visible' },
          { alan:'Measure 4', deger:'6 users in the same situation were **scanned**; 2 had the same gap' },
        ],
        not:'**The fourth measure turned up two more people** — neither had reported the ' +
             'problem.\n\n' +
             'One had assumed *"there\'s probably just no activity in that company code,"* ' +
             'the other had started tracking their work in Excel instead.\n\n' +
             '**This is the most dangerous part of silent errors:** users **work around ' +
             'them** instead of reporting them, and the problem stays invisible.\n\n' +
             'The second measure (the {{SU53}} reflex) is the most valuable for exactly ' +
             'this reason: it puts the user in a position to **make a silent error visible**.' },
    ],

    sonuc:
      '**The transaction opened, threw no error, returned an empty list — and two more ' +
      'users were in the same situation.**\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. Authorization has two layers, and the second one is silent.** ' +
      '**`S_TCODE`** allows the code **to run** — without it, a clear message appears. ' +
      '**`F_BKPF_BUK`** decides which **data** can be seen — without it, an **empty list** ' +
      'comes back and **no message appears at all**. Because most FI reports apply ' +
      'authorization as a filter, an unauthorized company code is **never queried**, ' +
      'and this isn\'t an error from the program\'s point of view.\n\n' +
      '**2. Diagnosis starts with "does the data exist?"** ' +
      'If checking {{BSID}} with {{SE16N}} hadn\'t turned up 47 records, hours could have ' +
      'been spent hunting for a bug in the posting process instead. If the data exists, ' +
      'the problem is in **access**; if it doesn\'t, it\'s in **posting**.\n\n' +
      '**3. {{SU53}} must be run "immediately after."** ' +
      'It only shows the **last** failed authorization check; if another transaction runs ' +
      'in between, the trace is lost. A newly assigned role also has no effect until the ' +
      'session is closed and reopened — authorizations are loaded into a {{tampon}} at ' +
      'logon.\n\n' +
      '**4. Silent errors don\'t get reported, they get worked around.** ' +
      'The scan turned up two more users; neither had complained. One had assumed there ' +
      'was no data, the other had switched to tracking things in Excel. This is why the ' +
      'fix isn\'t just correcting the authorization — it\'s giving users the **{{SU53}} ' +
      'reflex**: the only person who can make a silent error visible is the one living ' +
      'through it.',
  },

  },
});
