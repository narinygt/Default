/* ==========================================================================
   content/fi-en/sap-tables.js — English body for "FI Table Architecture"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'sap-tables',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'FI table architecture is understood through **three questions**:\n\n' +
      '**"Where does the document sit?"** → header {{BKPF}} + line item {{BSEG}}\n' +
      '**"Where are this vendor\'s open items?"** → index tables {{BSIK}}, {{BSID}}\n' +
      '**"Where is the account\'s balance?"** → totals tables {{GLT0}}\n\n' +
      'This three-way structure was a **performance solution**: because {{BSEG}}\'s key starts with ' +
      'the document number, a "this vendor\'s items" query would scan the whole table. ' +
      'Index and totals tables existed to solve exactly that problem.\n\n' +
      '**S/4HANA simplified this structure.** {{ACDOCA}} arrived as a single table; ' +
      'the index and totals tables turned into {{uyumluluk-view}}s. ' +
      'The reason is simple: on HANA\'s column-based architecture, those queries are already fast.',

    neden:
      '**Diagnosis.** Most FI problems are solved by looking at a table: which field holds ' +
      'what value, which record is missing.\n\n' +
      '**Understanding reports.** Why do two reports show different numbers? The answer is usually ' +
      '**that they read from different tables**.\n\n' +
      '**Development.** Writing a custom report or interface requires knowing the right table.\n\n' +
      '**Data migration.** What gets loaded into which table is the foundation of a migration project.\n\n' +
      '**S/4HANA migration.** Custom programs can\'t be migrated without knowing which table was ' +
      'removed and which turned into a view.',

    sirketOnemi:
      'Table knowledge is what **sets a consultant apart from a user**. ' +
      'The user knows the screen; the consultant knows what sits behind the screen.\n\n' +
      'The practical value shows up here: when a problem isn\'t explained by the screen, ' +
      '{{SE16N}} is used to look at the table and see the **real value**. ' +
      'This is the basis of diagnoses like "the SD invoice didn\'t hit accounting" ({{VBRK}} `RFBSK`) or ' +
      '"the tax account doesn\'t reconcile" ({{BSET}}).\n\n' +
      'The discriminating question is this: **"why are {{BSIK}} and {{BSAK}} separate tables?"** ' +
      'The right answer: **{{BSIK}} holds open, {{BSAK}} holds cleared** vendor items. ' +
      'When clearing happens, the record **moves** from one to the other. ' +
      'The reason was performance — so an open-item query would run against a small table. ' +
      'In S/4HANA both are {{uyumluluk-view}}s.',

    gercekHayat:
      'A user says: *"I posted the invoice, I got a document number, but ' +
      'I can\'t find it in {{FB03}}."*\n\n' +
      'The screen says nothing. The diagnosis is done by looking at tables:\n\n' +
      '**1.** {{SE16N}} → {{BKPF}} → search for the document number → **no record**.\n\n' +
      '**2.** A number was assigned but no document exists → two possibilities: ' +
      'the document is **parked** (check {{VBKPF}}) or ' +
      'an **{{guncelleme-hatasi}}** occurred (check {{SM13}}).\n\n' +
      '**3.** Found in {{VBKPF}} → the document is parked, not yet posted.\n\n' +
      'The screen didn\'t say so because {{FB03}} only looks at {{BKPF}}. ' +
      'The right tool was {{FBV3}}.\n\n' +
      '**This diagnosis can\'t be made without table knowledge** — without it, ' +
      'the only thing you can tell the user is "the system isn\'t working."',

    muhasebeMantigi:
      'The accounting logic behind FI table architecture is the **header–item split**.\n\n' +
      'An accounting document has **singular** information (date, document type, ' +
      'currency, the user who posted it) and **plural** information ' +
      '(account, amount, debit/credit).\n\n' +
      'The singular pieces sit as one row in **{{BKPF}}**; the plural pieces sit as ' +
      'n rows in **{{BSEG}}**. The link is the `BUKRS + BELNR + GJAHR` triple.\n\n' +
      'This split comes from the nature of accounting: a journal entry has ' +
      'one date but multiple lines.\n\n' +
      'The second logic is **the index tables**, and these were born not from accounting but from ' +
      '**performance**. From an accounting standpoint, {{BSIK}} is ' +
      'a subset of {{BSEG}} — it carries no new information. ' +
      'That\'s why turning them into views in S/4HANA **had no effect on accounting whatsoever**.',

    kavramlar: ['tablo-anahtari', 'uyumluluk-view', 'evrensel-kayit-defteri',
                'tampon', 'acik-kalem', 'degisiklik-belgesi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Using tables is a **diagnostic process**: you start from the symptom, ' +
      'drill down to the right table, and see the real value. ' +
      'The flow below follows that path.',

    roller:[
      { rol:'User', gorev:'Reports the symptom: "the document can\'t be found," "the report is empty," "the amount is wrong."' },
      { rol:'FI consultant', gorev:'Chooses the right table from the symptom and looks at it with {{SE16N}}.' },
      { rol:'FI consultant', gorev:'Examines the table structure with {{SE11}}: key fields, relationships.' },
      { rol:'Developer', gorev:'Determines the right table and key for a custom report or interface.' },
      { rol:'Migration team', gorev:'Verifies which table turned into a view in S/4HANA.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'From symptom to table — the diagnostic flow',
      adimlar:[
        { ic:'❗', rol:'User', baslik:'The symptom is reported',
          aciklama:'*"The document can\'t be found"* · *"the report is empty"* · *"two reports show different numbers"*. ' +
                   'The screen usually doesn\'t say why.',
          cikti:'Symptom', ok:'the table is chosen' },
        { ic:'🎯', rol:'Consultant', baslik:'The table is chosen based on the symptom',
          aciklama:'No document → {{BKPF}} / {{VBKPF}} · report empty → {{SKB1}} · ' +
                   'SD invoice didn\'t hit accounting → {{VBRK}} · tax doesn\'t reconcile → {{BSET}}.',
          cikti:'Target table', ok:'the content is read' },
        { ic:'🔍', rol:'Consultant', baslik:'The content is read with {{SE16N}}',
          aciklama:'Filtered by key fields. The **real value** is seen — ' +
                   'not what the screen displays.',
          cikti:'Raw data', ok:'if structure is needed' },
        { ic:'🏗️', rol:'Consultant', baslik:'If needed, the structure is examined with {{SE11}}',
          aciklama:'What fields make up the {{tablo-anahtari}}? Which table is it linked to? ' +
                   'What\'s the field type?',
          cikti:'Table structure', ok:'result' },
        { ic:'✓', rol:'Consultant', baslik:'The root cause is found',
          aciklama:'The document is parked · item management is off · ' +
                   'the transfer flag is "A" · the tax line wasn\'t written.',
          cikti:'Diagnosis', ok:'solution' },
      ],
    },

    adimlar:[
      { rol:'Consultant', eylem:'Reads table content', sistem:'{{SE16N}} — by field name, filterable' },
      { rol:'Consultant', eylem:'Examines table structure', sistem:'{{SE11}} — key, field types' },
      { rol:'Consultant', eylem:'Looks for the document header', sistem:'{{BKPF}} — if missing, parked or an update error' },
      { rol:'Consultant', eylem:'Checks a parked document', sistem:'{{VBKPF}} / {{FBV3}}' },
      { rol:'Consultant', eylem:'Checks open items', sistem:'{{BSIK}} / {{BSID}} — a view in S/4' },
      { rol:'Consultant', eylem:'Traces the change history', sistem:'{{CDHDR}} / {{CDPOS}}' },
      { rol:'Developer', eylem:'Picks the source for new development', sistem:'**{{ACDOCA}}** — not a view' },
    ],

    veriAkisi:{
      nereden:'User transactions produce documents; customizing tables are read.',
      nereye:'{{ACDOCA}} (the single S/4 source) or {{BKPF}}+{{BSEG}}+indexes+totals (ECC).',
      tetikleyen:'Every posting transaction; a diagnostic query; running a report.',
      sonraki:'Reporting, diagnosis, development, data migration.',
    },

    notlar:[
      { tip:'warn', baslik:'{{SE16N}} shouldn\'t be given to end users', metin:
        '{{SE16N}} is a powerful diagnostic tool — but it\'s **not a reporting tool**, and ' +
        'it shouldn\'t be handed to end users. There are two reasons:\n\n' +
        '**1. Authorization checking is weak.** Normal reports enforce company-code and account-based ' +
        'authorization checks. Table display checks this **far more loosely**; ' +
        'a user can see data they shouldn\'t.\n\n' +
        '**2. Raw data is misleading.** The value in the table can differ from what the screen shows: ' +
        'codes aren\'t resolved, amounts can carry the opposite sign ({{BSEG}} `SHKZG` debit/credit indicator), ' +
        'no currency translation has been applied.\n\n' +
        'Because the user doesn\'t know this difference, they **draw the wrong conclusion** and ' +
        'say "the system is wrong."\n\n' +
        'What a user should be given is **the right report plus a proper procedure** ' +
        '(see {{konu:reporting}}).' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Tables don\'t produce postings — but knowing **which tables** an accounting posting writes ' +
      'what into is the foundation of diagnosis. ' +
      'Below, a single invoice\'s table trail is followed from start to finish.',

    etkilenenHesaplar:[
      { hesap:'All accounts', tur:'—', neden:'Tables are the read/write layer; the accounting effect belongs to the posting transaction.' },
      { hesap:'{{BSEG}} `SHKZG` field', tur:'Technical', neden:'**The debit/credit indicator** — the amount is always stored positive; direction sits in this field. Critical when reading raw data.' },
      { hesap:'{{BSEG}} `DMBTR` / `WRBTR`', tur:'Technical', neden:'Local currency (`DMBTR`) and transaction currency (`WRBTR`) are in **separate fields**.' },
      { hesap:'{{BSET}} tax lines', tur:'Tax', neden:'Tax sits in a table **separate** from {{BSEG}}; the tax return is produced from here.' },
      { hesap:'{{ACDOCA}}', tur:'S/4HANA', neden:'FI and CO **on a single line**; no totals table.' },
    ],

    fisler:[
      { baslik:'A vendor invoice\'s table trail — ECC',
        belgeTuru:'KR', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Expense', borc:100000, not:'{{BSEG}} line 1 · `SHKZG` = **S** (debit)' },
          { hesap:'191', ad:'Deductible VAT', borc:20000, not:'{{BSEG}} line 2 + a **{{BSET}}** tax line' },
          { hesap:'320', ad:'Trade payables', alacak:120000, not:'{{BSEG}} line 3 · `SHKZG` = **H** (credit) + **{{BSIK}}**' },
        ],
        not:'**This single posting writes to five tables:**\n\n' +
             '**{{BKPF}}** → 1 row (header: date, type, user)\n' +
             '**{{BSEG}}** → 3 rows (line items)\n' +
             '**{{BSET}}** → 1 row (tax: base 100,000 + tax 20,000)\n' +
             '**{{BSIK}}** → 1 row (the vendor\'s **open** item)\n' +
             '**{{GLT0}}** → the period total for 3 accounts is updated\n\n' +
             '**Amounts in {{BSEG}} are always positive.** ' +
             'The debit/credit direction sits in the `SHKZG` field: **S** = debit (Soll), **H** = credit (Haben). ' +
             'If this isn\'t known when reading raw data, totals get calculated wrong.' },

      { baslik:'The same posting — its table trail in S/4HANA',
        belgeTuru:'KR', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Expense', borc:100000, not:'{{ACDOCA}} line 1' },
          { hesap:'191', ad:'Deductible VAT', borc:20000, not:'{{ACDOCA}} line 2 + {{BSET}}' },
          { hesap:'320', ad:'Trade payables', alacak:120000, not:'{{ACDOCA}} line 3' },
        ],
        not:'**Tables written in S/4HANA:**\n\n' +
             '**{{BKPF}}** → 1 row *(still there)*\n' +
             '**{{ACDOCA}}** → 3 rows *(FI + CO together)*\n' +
             '**{{BSET}}** → 1 row *(still there — the tax return is based on it)*\n\n' +
             '**Not written:** {{BSEG}}, {{BSIK}}, {{GLT0}} — ' +
             'these are now **{{uyumluluk-view}}s**. When queried, they are ' +
             '**derived** from {{ACDOCA}}.\n\n' +
             'Result: fewer writes, and the possibility of inconsistency disappears.' },

      { baslik:'When a payment is made — the item **switches table**',
        belgeTuru:'KZ', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables (clearing)', borc:120000, not:'{{BSIK}} → moves to **{{BSAK}}**' },
          { hesap:'102', ad:'Banks', alacak:120000 },
        ],
        not:'When clearing happens, the vendor item **is deleted from {{BSIK}} and written to {{BSAK}}**.\n\n' +
             'Both carry the same information; the difference is whether it\'s **open or cleared**.\n\n' +
             '**Why a separate table?** Performance. So the "this vendor\'s open items" query would ' +
             'run only against the small table holding open items. ' +
             'Cleared items reach the millions over the years and ' +
             'would slow the query down.\n\n' +
             'In S/4HANA both are **views**; there\'s no such thing as moving. ' +
             'The clearing field in {{ACDOCA}} simply gets filled in, that\'s all.' },
    ],

    tHesaplar:[
      { hesap:'Trade payables — open item', kod:'{{BSIK}}',
        borc:[],
        alacak:[{ ad:'Invoice posting', tutar:120000 }],
        not:'**Moves to {{BSAK}}** once paid' },
      { hesap:'Trade payables — cleared item', kod:'{{BSAK}}',
        borc:[{ ad:'Cleared by payment', tutar:120000 }],
        alacak:[],
        not:'Both are views in S/4HANA' },
    ],

    notlar:[
      { tip:'tip', baslik:'Why are amounts always positive in {{BSEG}}?', metin:
        'The most common mistake when reading raw data is **summing {{BSEG}} amounts directly**.\n\n' +
        'The amount fields (`DMBTR`, `WRBTR`) are **always positive**. ' +
        'Whether it\'s debit or credit sits in a separate field: **`SHKZG`**.\n\n' +
        '**S** = Soll (debit) · **H** = Haben (credit)\n\n' +
        'So to tell whether a document balances, ' +
        'the sum of the `SHKZG` = S rows is **compared** against the sum of the H rows.\n\n' +
        'Summed directly you get 240,000 (120,000 + 120,000) and ' +
        'the document looks "unbalanced."\n\n' +
        '**{{ACDOCA}} changed this:** amounts are **signed** — ' +
        'credit is stored as negative and the total can be taken directly. ' +
        'This is one of S/4HANA\'s quiet but practical improvements.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'FI tables fall into **five groups**. Knowing the group tells you ' +
      'what the table is for and what happens to it in S/4HANA.',

    liste:[
      { ad:'Header–Item Tables',
        aciklama:'A document\'s singular information sits in the header, its plural information in the line items.',
        neZaman:'On every accounting document.',
        ornek:'{{BKPF}} (header) + {{BSEG}} (item). ' +
              'The link: `BUKRS + BELNR + GJAHR`.\n\n' +
              'The same pattern shows up everywhere: {{VBRK}}/{{VBRP}} (SD invoice), ' +
              '{{RBKP}}/{{RSEG}} (MM invoice), {{VBKPF}}/{{VBSEG}} (parked).' },

      { ad:'Index Tables',
        aciklama:'Subsets kept for **fast access** by business partner and account.',
        neZaman:'For performance in ECC; as **views** in S/4HANA.',
        ornek:'**Vendor:** {{BSIK}} open · {{BSAK}} cleared\n' +
              '**Customer:** {{BSID}} open · {{BSAD}} cleared\n' +
              '**G/L:** {{BSIS}} open · {{BSAS}} cleared\n\n' +
              'When clearing happens, the record **moves from one to the other**. ' +
              'They carry no new information — they\'re a subset of {{BSEG}}.' },

      { ad:'Totals Tables',
        aciklama:'Accumulated totals by account × period.',
        neZaman:'For balance reports in ECC.',
        ornek:'{{GLT0}} (classic G/L), FAGLFLEXT (New G/L).\n\n' +
              '**Removed in S/4HANA.** Totals are **calculated on the fly** from {{ACDOCA}} — ' +
              'the "the totals don\'t reconcile" problem disappeared.' },

      { ad:'Customizing Tables',
        aciklama:'Settings that determine how the system behaves.',
        neZaman:'Read on every posting.',
        ornek:'{{T001}} company code · {{T030}} account determination · ' +
              '{{T007A}} tax code · {{T001B}} period control\n\n' +
              '**They\'re {{tampon}}ed** — that\'s why a configuration change ' +
              'sometimes doesn\'t take effect right away.' },

      { ad:'Master Data Tables',
        aciklama:'Vendor, customer, G/L account, and fixed asset information.',
        neZaman:'Read during posting; updated through master-data transactions.',
        ornek:'{{LFA1}}/{{LFB1}} vendor · {{KNA1}}/{{KNB1}} customer · ' +
              '{{SKA1}}/{{SKB1}} G/L account · {{ANLA}} fixed asset\n\n' +
              '**Pattern:** `*A1` is the general level (shared across all company codes), ' +
              '`*B1` is the company-code level.' },

      { ad:'Log Tables',
        aciklama:'Who changed what and when; batch job logs.',
        neZaman:'For audits; for diagnosis.',
        ornek:'{{CDHDR}}/{{CDPOS}} the {{degisiklik-belgesi}} · ' +
              '{{NRIV}} number range status\n\n' +
              'Application logs are read with {{SLG1}}.' },

      { ad:'Universal Journal',
        aciklama:'FI and CO items merging into a **single table**.',
        neZaman:'On every posting in S/4HANA.',
        ornek:'**{{ACDOCA}}** — account, cost center, profit center, segment, and ledger ' +
              'on the same line. There\'s **no** totals table.\n\n' +
              'What it replaced: {{BSEG}}, COEP, {{GLT0}}, FAGLFLEXA/T, and more.' },

      { ad:'Compatibility Views',
        aciklama:'Structures that can be queried under the old table name but are **derived from {{ACDOCA}}**.',
        neZaman:'So old programs keep working.',
        ornek:'{{BSEG}}, {{BSIK}}, {{BSAK}}, {{BSID}}, {{GLT0}} — ' +
              'all of them are views in S/4HANA.\n\n' +
              '**Performance note:** reading through a view is **slower** than ' +
              'reading {{ACDOCA}} directly. New development should use {{ACDOCA}}.' },
    ],

    karsilastirmaBasliklar:['ECC structure', 'S/4HANA structure'],
    karsilastirma:[
      ['FI items', '{{BSEG}} — a physical table', '**{{ACDOCA}}** · {{BSEG}} a view'],
      ['CO items', 'COEP — a **separate table**', '{{ACDOCA}} — the **same table**'],
      ['Open item index', '{{BSIK}}/{{BSID}} physical', '{{uyumluluk-view}}'],
      ['Cleared item', '{{BSAK}}/{{BSAD}} — the record **moves**', 'A view — **no** moving'],
      ['Totals', '{{GLT0}}, FAGLFLEXT', '**None** — calculated on the fly'],
      ['Amount sign', 'In a separate `SHKZG` field', '**Signed** — credit is negative'],
      ['Number of writes (1 document)', '5+ tables', '**3 tables** (BKPF, ACDOCA, BSET)'],
      ['Inconsistency risk', 'Present — reconciliation was needed', '**Structurally impossible**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'SE16N', ad:'Table content — the primary diagnostic tool',
        amac:'Lists, filters, and exports a table\'s rows by field name.',
        neZaman:'When you need to see what the screen isn\'t telling you.',
        adimlar:[
          { baslik:'Enter the table name' },
          { baslik:'Fill in the selection fields',
            aciklama:'**Filter by key fields** — filtering by a non-key field ' +
                     'is very slow on large tables ({{tablo-anahtari}}).' },
          { baslik:'Execute and review the result',
            aciklama:'Field labels and technical names appear together.' },
          { baslik:'Export to Excel if needed' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Table **VBRK**' },
          { ekran:'Selection', islem:'`RFBSK` = **A** · billing date 01–30.11' },
          { ekran:'Result', islem:'**40 records** — SD invoices not yet transferred to accounting' },
          { ekran:'Output', islem:'Exported to Excel and sent for review' },
        ],
        alanlar:{
          zorunlu:['Table name'],
          opsiyonel:['Selection criteria','Field selection','Maximum rows'] },
        hatalar:[
          { mesaj:'Running very slowly / timing out', sebep:'Filtered by a non-key field; the whole table is being scanned.', cozum:'Narrow it down with key fields. Searching {{BSEG}} by vendor number is slow — use {{BSIK}} instead.' },
          { mesaj:'You are not authorized to display table ...', sebep:'No authorization to display the table.', cozum:'Request the authorization. **It\'s correct that end users don\'t get it** — it\'s a diagnostic tool.' },
        ],
        ipucu:'**Its most valuable use is seeing what the screen doesn\'t tell you:**\n\n' +
              '{{VBRK}} `RFBSK` → did the SD invoice hit accounting?\n' +
              '{{SKB1}} `XKRES` → is item management on for the account?\n' +
              '{{VBKPF}} → is the document parked?\n' +
              '{{T030K}} → is the tax account defined?\n\n' +
              '**It shouldn\'t be given to end users:** authorization checking is weak and ' +
              'raw data (unresolved codes, the `SHKZG` sign) is **misleading**.',
        ilgili:['SE11','SE16','FB03'] },

      { kod:'SE11', ad:'Dictionary — examine table structure',
        amac:'Shows a table\'s fields, **key**, data types, and relationships.',
        neZaman:'Before development; when the question is "what does this field hold?"; ' +
                'to see the key when there\'s a performance problem.',
        adimlar:[
          { baslik:'Enter the table name and display it' },
          { baslik:'**Read the key fields**',
            aciklama:'The fields flagged in the key column. **These decide** query performance.' },
          { baslik:'Examine the field types and lengths' },
          { baslik:'See the foreign key relationships', aciklama:'Which table it\'s linked to.' },
        ],
        ipucu:'**The answer to performance problems is here:** {{BSEG}}\'s key is ' +
              '`BUKRS + BELNR + GJAHR + BUZEI`.\n\n' +
              'Searching by document number is **fast**; searching by vendor number (`LIFNR`) is ' +
              '**slow** — because it isn\'t part of the key.\n\n' +
              'This is exactly the reason index tables ({{BSIK}}) exist: ' +
              'their key starts with `LIFNR`.',
        ilgili:['SE16N','tablo-anahtari'] },

      { kod:'SE93', ad:'Transaction code definition — "what does this T-code run?"',
        amac:'Shows the program and screen behind a transaction code.',
        neZaman:'When you need to understand what a custom transaction code does.',
        adimlar:[
          { baslik:'Enter the transaction code' },
          { baslik:'Read the program name and screen number' },
          { baslik:'Examine the program with {{SE38}} if needed' },
        ],
        ipucu:'The fastest way to understand what a customer-specific (`Z*`) transaction code does.\n\n' +
              'Also, some standard reports have no transaction code and ' +
              'are run by program name with {{SE38}} ' +
              '(like the financial statement program).',
        ilgili:['SE38','SE11'] },

      { kod:'FB03', ad:'Display document — the start of the table trail',
        amac:'Shows the accounting document; the first link in the diagnostic chain.',
        neZaman:'When drilling from an item into its document; for document review.',
        adimlar:[
          { baslik:'Enter the document number, company code, and fiscal year' },
          { baslik:'Examine the line items' },
          { baslik:'**Environment → Changes**', aciklama:'The {{degisiklik-belgesi}} — who changed what.' },
          { baslik:'See who posted it from the document header' },
        ],
        ipucu:'**{{FB03}} only looks at {{BKPF}}.**\n\n' +
              'If a document can\'t be found, there are two possibilities:\n' +
              '**1.** It\'s **parked** → sits in {{VBKPF}}, viewed with {{FBV3}}\n' +
              '**2.** An **{{guncelleme-hatasi}}** occurred → shows up in {{SM13}}\n\n' +
              'This distinction can\'t be made without table knowledge.',
        ilgili:['FBV3','SM13','SE16N'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'The tables below are FI\'s backbone. Each one\'s **key** and its ' +
      '**status in S/4HANA** are stated separately — ' +
      'both are critical for diagnosis and for migration.',

    liste:[
      { ad:'BKPF', baslik:'Document header — every document\'s identity',
        tutar:'The document\'s singular information: date, document type, currency, **the user who posted it**, ' +
              'reference, reversal information.',
        olusturan:'Every accounting posting',
        guncelleyen:'A reversal gets flagged; the header text can be changed',
        anahtar:'**BUKRS + BELNR + GJAHR** — a three-field key',
        iliskiler:'{{BSEG}} and {{ACDOCA}} link through this triple.',
        s4:'**Still there** — a physical table in S/4HANA too.',
        alanlar:[
          { ad:'BELNR', aciklama:'Document number — unique **within the fiscal year**', tip:'pk' },
          { ad:'GJAHR', aciklama:'Fiscal year — part of the key; **the same number can recur** in different years', tip:'pk' },
          { ad:'BLART', aciklama:'{{belge-turu}} — KR vendor, DR customer, SA G/L, AF depreciation' },
          { ad:'BUDAT', aciklama:'**Posting date** — determines the period' },
          { ad:'BLDAT', aciklama:'Document date — the invoice\'s own date' },
          { ad:'USNAM', aciklama:'**The user who posted it** — used in four-eyes control' },
          { ad:'STBLG', aciklama:'Reversal document — if filled, this document has been reversed' },
          { ad:'AWTYP / AWKEY', aciklama:'Source document (VBRK = SD invoice, RMRP = MM invoice)' },
        ] },

      { ad:'BSEG', baslik:'Document line items — ECC\'s center',
        tutar:'The document\'s lines: account, amount, debit/credit, business partner, tax code, ' +
              'cost center.',
        olusturan:'A posting',
        anahtar:'**BUKRS + BELNR + GJAHR + BUZEI**',
        iliskiler:'{{BKPF}} for the header; {{BSIK}}/{{BSID}} for the indexes.',
        s4:'**{{uyumluluk-view}}** — derived from {{ACDOCA}}. ' +
           'New development should use {{ACDOCA}}.',
        alanlar:[
          { ad:'BUZEI', aciklama:'Line number', tip:'pk' },
          { ad:'**SHKZG**', aciklama:'**The debit/credit indicator: S = debit, H = credit.** ' +
                   'The amount is always positive; direction sits here. Critical when reading raw data.' },
          { ad:'DMBTR', aciklama:'Local currency amount' },
          { ad:'WRBTR', aciklama:'Transaction currency amount' },
          { ad:'HKONT', aciklama:'G/L account' },
          { ad:'LIFNR / KUNNR', aciklama:'Vendor / customer — **not part of the key** → searching by this field is slow' },
          { ad:'MWSKZ', aciklama:'{{vergi-kodu}}' },
          { ad:'UMSKZ', aciklama:'{{ozel-ana-muhasebe-gostergesi}}' },
        ] },

      { ad:'ACDOCA', baslik:'Universal Journal — S/4HANA\'s center',
        tutar:'FI and CO items **together**; account, cost center, profit center, ' +
              'segment, and ledger on the same line.',
        olusturan:'Every FI/CO document',
        anahtar:'**RLDNR + RBUKRS + GJAHR + BELNR + DOCLN**',
        iliskiler:'{{BKPF}} for the header; {{BSEG}}, {{BSIK}}, {{GLT0}} are **derived** from this.',
        s4:'**S/4HANA\'s single line-item table.** There is no totals table.',
        alanlar:[
          { ad:'RLDNR', aciklama:'**Ledger** — the first field of the key; 0L is the leading ledger, 2L IFRS', tip:'pk' },
          { ad:'DOCLN', aciklama:'Line number — can be **more numerous than {{BSEG}}** after document splitting', tip:'pk' },
          { ad:'RACCT', aciklama:'Account / cost element — **the same number**' },
          { ad:'KOSTL / PRCTR / SEGMENT', aciklama:'CO and reporting dimensions — **on the same line**' },
          { ad:'HSL / WSL / KSL', aciklama:'Local / transaction / group currency. **Signed** — credit is negative' },
        ] },

      { ad:'BSIK', baslik:'Vendor open items',
        tutar:'Vendor items not yet cleared.',
        olusturan:'A document containing a vendor item',
        guncelleyen:'Clearing → the record **moves to {{BSAK}}**',
        anahtar:'**LIFNR + BUKRS + ...** — starts with the vendor, which is why it\'s fast',
        iliskiler:'A subset of {{BSEG}}; {{FBL1N}} reads from here.',
        s4:'{{uyumluluk-view}} — there\'s no such thing as moving, ' +
           'the clearing field in {{ACDOCA}} simply gets filled in.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Vendor — **the first field of the key**; this is the reason it exists', tip:'pk' },
          { ad:'ZFBDT / ZBD1T', aciklama:'The basis for the due-date calculation' },
          { ad:'MANSP / MAHNS', aciklama:'Dunning block and level' },
        ] },

      { ad:'BSAK', baslik:'Vendor cleared items',
        tutar:'Paid/cleared vendor items.',
        olusturan:'A clearing transaction (moved from {{BSIK}})',
        anahtar:'LIFNR + BUKRS + ...',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'AUGBL', aciklama:'**The clearing document** — which payment cleared it' },
          { ad:'AUGDT', aciklama:'Clearing date' },
        ] },

      { ad:'BSET', baslik:'Tax lines',
        tutar:'Tax base and tax amount — **separate** from {{BSEG}}.',
        olusturan:'A document containing a tax code',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'The VAT return is produced **from here**, not from {{BSEG}}.',
        s4:'**Still there** — the tax return still relies on it.',
        alanlar:[
          { ad:'HWBAS', aciklama:'**Tax base** — the amount the tax is calculated on' },
          { ad:'HWSTE', aciklama:'Tax amount' },
        ] },

      { ad:'GLT0', baslik:'G/L totals table (ECC)',
        tutar:'Accumulated totals by account × period.',
        olusturan:'A posting (updated in parallel)',
        anahtar:'BUKRS + RACCT + RYEAR',
        s4:'**Removed.** Totals are calculated on the fly from {{ACDOCA}}; ' +
           'the *"the totals don\'t reconcile"* problem disappeared.',
        alanlar:[
          { ad:'HSL01…HSL16', aciklama:'Totals by period (12 regular + 4 special)' },
        ] },

      { ad:'CDHDR', baslik:'Change document header',
        tutar:'The {{degisiklik-belgesi}} — who, when, which object.',
        olusturan:'Changes to fields open for change tracking',
        anahtar:'OBJECTCLAS + OBJECTID + CHANGENR',
        s4:'Unchanged.',
        alanlar:[
          { ad:'OBJECTCLAS', aciklama:'Object class — KRED vendor, DEBI customer, BELEG document' },
          { ad:'USERNAME', aciklama:'The user who made the change' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'FI table architecture — from ECC to S/4HANA',
      varliklar:[
        { ad:'BKPF', rol:'Header', hub:true, aciklama:'**The document\'s identity — a physical table in both**',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }, { ad:'BLART' }, { ad:'USNAM' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'**The single line-item table** — FI + CO',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'DOCLN', tip:'pk' }, { ad:'RACCT' }, { ad:'KOSTL' }] },
        { ad:'BSEG', rol:'ECC / view', aciklama:'Line items — derived in S/4',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'SHKZG' }, { ad:'HKONT' }] },
        { ad:'BSIK', rol:'Index', aciklama:'Vendor **open** items',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }] },
        { ad:'BSAK', rol:'Index', aciklama:'Vendor **cleared** items',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'AUGBL' }] },
        { ad:'BSET', rol:'Tax', aciklama:'Tax lines — the source of the tax return',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HWBAS' }, { ad:'HWSTE' }] },
        { ad:'GLT0', rol:'Totals', aciklama:'ECC balance — **removed** in S/4',
          alanlar:[{ ad:'RACCT', tip:'pk' }, { ad:'HSL01' }] },
        { ad:'CDHDR', rol:'Log', aciklama:'Change trail',
          alanlar:[{ ad:'OBJECTID', tip:'fk' }, { ad:'USERNAME' }] },
      ],
      iliskiler:[
        { from:'BKPF', to:'ACDOCA', alanlar:'BUKRS+BELNR+GJAHR', not:'**the main S/4HANA path**' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS+BELNR+GJAHR', not:'the main ECC path' },
        { from:'BSEG', to:'BSIK', alanlar:'BELNR+BUZEI', not:'the open-item index' },
        { from:'BSIK', to:'BSAK', alanlar:'clearing', not:'**the record moves**' },
        { from:'BKPF', to:'BSET', alanlar:'BELNR', not:'the tax line' },
        { from:'ACDOCA', to:'GLT0', alanlar:'RACCT', not:'totals — derived in S/4' },
        { from:'BKPF', to:'CDHDR', alanlar:'BELNR → OBJECTID', not:'the change trail' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'There are two screens for working with tables: **{{SE16N}}** (content) and ' +
      '**{{SE11}}** (structure). Each answers a different question.',

    ekranlar:[
      { ad:'{{SE16N}} — content display',
        aciklama:'The screen for *"what\'s in this table?"*',
        alanlar:[
          { ad:'Table name', zorunlu:true },
          { ad:'Selection criteria', zorunlu:false, aciklama:'**Filter by key fields** — ' +
                   'filtering by a non-key field is very slow on large tables.' },
          { ad:'Maximum rows', zorunlu:false, aciklama:'Raising the default limit ' +
                   'causes timeouts on large tables.' },
          { ad:'Field selection', zorunlu:false, aciklama:'Picking only the columns you need speeds it up.' },
        ],
        ipucu:'**The queries used most often for diagnosis:**\n\n' +
              '{{VBRK}} `RFBSK` = A → the SD invoice didn\'t hit accounting\n' +
              '{{SKB1}} `XKRES` → is item management on for the account\n' +
              '{{VBKPF}} → is the document parked\n' +
              '{{T030K}} → is the tax account defined\n' +
              '{{CDPOS}} → when did the vendor\'s bank account change\n\n' +
              'These queries show what the screens **don\'t say**.' },

      { ad:'{{SE11}} — structure examination',
        aciklama:'The screen for *"how is this table set up?"*',
        alanlar:[
          { ad:'Table name', zorunlu:true },
          { ad:'**Key column**', zorunlu:false, aciklama:'The flagged fields make up the {{tablo-anahtari}} — ' +
                   '**these decide** query performance.' },
          { ad:'Field types', zorunlu:false, aciklama:'Data element, length, decimals.' },
          { ad:'Foreign keys', zorunlu:false, aciklama:'Which table it\'s linked to.' },
        ],
        ipucu:'**The performance question is always answered here.** ' +
              'The {{BSEG}} key starts with the document number; ' +
              'searching by vendor number is slow.\n\n' +
              'The index tables\' ({{BSIK}}) key, by contrast, starts with `LIFNR` — ' +
              'that\'s their reason for existing.' },

      { ad:'{{FB03}} — the bridge from document to table',
        aciklama:'The crossover point from user language to technical language.',
        alanlar:[
          { ad:'Document number + company code + fiscal year', zorunlu:true,
            aciklama:'The fiscal year **is part of the key** — the same number can recur in different years.' },
          { ad:'Line items', zorunlu:false },
          { ad:'Environment → Changes', zorunlu:false, aciklama:'The {{degisiklik-belgesi}}' },
          { ad:'Document header', zorunlu:false, aciklama:'The user who posted it and the date.' },
        ],
        ipucu:'**Diagnosis when a document can\'t be found:**\n\n' +
              '**1.** Try {{FBV3}} → if found, it\'s **parked**\n' +
              '**2.** Check {{SM13}} → if present, an **{{guncelleme-hatasi}}**\n' +
              '**3.** Verify with {{SE16N}} → {{BKPF}}\n\n' +
              '{{FB03}} can\'t make this distinction itself, because it only looks at {{BKPF}}.' },
    ],

    zorunlu:['Table name','Document number + company code + fiscal year (for FB03)'],
    opsiyonel:['Selection criteria','Field selection','Maximum rows'],

    hatalar:[
      { mesaj:'{{SE16N}} is very slow / times out', sebep:'Filtered by a non-key field; the whole table is being scanned.', cozum:'See the key with {{SE11}} and narrow the query accordingly. Use {{BSIK}} instead of {{BSEG}} for vendor-based searches.' },
      { mesaj:'There\'s a document number but {{FB03}} can\'t find it', sebep:'The document is parked, or an {{guncelleme-hatasi}} occurred.', cozum:'Try {{FBV3}}; if that fails, check {{SM13}}.' },
      { mesaj:'The same document number shows up twice', sebep:'The same number **in different fiscal years** — this is normal.', cozum:'`GJAHR` is part of the key; add the fiscal year to the query too.' },
      { mesaj:'I summed {{BSEG}} amounts and the document came out unbalanced', sebep:'The `SHKZG` indicator wasn\'t taken into account — amounts are **always positive**.', cozum:'S (debit) and H (credit) are summed separately and compared. In {{ACDOCA}} amounts are **signed**, so this problem doesn\'t exist.' },
      { mesaj:'My old custom report got slower in S/4HANA', sebep:'It reads through a {{uyumluluk-view}}.', cozum:'Update it to read {{ACDOCA}} **directly**.' },
      { mesaj:'I changed the configuration but it isn\'t taking effect', sebep:'The table is {{tampon}}ed.', cozum:'Have the user log off and back on; that\'s usually enough.' },
    ],

    ipuclari:[
      '**Filter by key fields.** Learn the key with {{SE11}} and build the query around it.',
      'For vendor/customer-based searches use **{{BSIK}}/{{BSID}}**, not {{BSEG}}.',
      'When reading raw {{BSEG}} data, the **`SHKZG`** indicator must be factored in — amounts are always positive.',
      'If a document can\'t be found, work through in order: {{FBV3}} (parked) → {{SM13}} (update error) → {{BKPF}}.',
      '**Don\'t give {{SE16N}} to end users** — authorization is weak, raw data is misleading.',
      'In new development, read **{{ACDOCA}}**; a compatibility view is slow.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Document header — **a physical table in both architectures**' },
      { tablo:'ACDOCA', ne:'S/4HANA\'s single line-item table — FI + CO' },
      { tablo:'BSEG', ne:'ECC\'s line item table; a {{uyumluluk-view}} in S/4' },
      { tablo:'BSIK', ne:'Vendor open-item index; a view in S/4' },
      { tablo:'BSET', ne:'Tax lines — **still there**' },
      { tablo:'GLT0', ne:'ECC\'s totals table; **removed** in S/4' },
    ],

    commit:
      'A posting writes to multiple tables **within a single LUW**.\n\n' +
      '**In ECC:** {{BKPF}} + {{BSEG}} + indexes + totals + {{BSET}} — ' +
      'five or more tables.\n\n' +
      '**In S/4HANA:** {{BKPF}} + {{ACDOCA}} + {{BSET}} — three tables.\n\n' +
      'The drop in the number of writes brought two benefits: ' +
      '**performance** (the lock contention on the totals table in particular disappeared) and ' +
      '**the elimination of the risk of inconsistency**.\n\n' +
      '**Asynchronous update:** once the user is given the number, ' +
      'the write happens in the background. If it fails, an {{guncelleme-hatasi}} occurs ' +
      'and, despite the number having been assigned, **the document doesn\'t exist**.',

    belgeNo:
      'A document number is unique **within the fiscal year** — ' +
      'the {{BKPF}} key is the `BUKRS + BELNR + **GJAHR**` triple.\n\n' +
      'The practical consequence: **the same number can be reused in different years**. ' +
      'If the fiscal year isn\'t specified in a query, two records come back and ' +
      'it looks like "there\'s a duplicate."\n\n' +
      'Number range status is held in table {{NRIV}}; ' +
      'gaps come from {{guncelleme-hatasi}} or from deleted parked documents.',

    postingLogic:
      'The table write order when a document is posted:\n\n' +
      '**1.** A number is obtained ({{NRIV}} is updated).\n' +
      '**2.** The {{BKPF}} header row is written.\n' +
      '**3.** The line items are written: {{BSEG}} in ECC, {{ACDOCA}} in S/4.\n' +
      '**4.** If there\'s tax, a {{BSET}} row is written.\n' +
      '**5.** In ECC, the index tables are updated ({{BSIK}}, {{BSIS}}).\n' +
      '**6.** In ECC, the totals tables are updated ({{GLT0}}).\n' +
      '**7.** If a {{degisiklik-belgesi}} is needed, {{CDHDR}}/{{CDPOS}}.\n\n' +
      'In S/4HANA **steps 5 and 6 don\'t exist** — the index and totals ' +
      'are derived at read time.',

    belgeTuru:
      'The {{belge-turu}} is stored in the {{BKPF}} `BLART` field, and it\'s ' +
      '**a powerful filter** for diagnosis.\n\n' +
      'For example: filtering the tax account for rows where `BLART` = **SA** ' +
      'instantly finds manual postings (see {{konu:taxes}}).',

    numberRange:
      '{{NRIV}} holds the number range status: which range, at what level.\n\n' +
      'Reasons for gaps: {{guncelleme-hatasi}}, deleted parked documents, ' +
      'buffer usage. **Gaps are normal** and can\'t be fixed.',

    accountDetermination:
      'The account determination tables **belong to the {{T030}} family**, and ' +
      'three modules write into that same family:\n\n' +
      '{{T030}} general · **{{T030K}}** tax ({{OB40}}) · ' +
      'MM side {{OBYC}} · SD side {{VKOA}}\n\n' +
      'Common shape: chart of accounts + transaction key + extra criteria → G/L account.\n\n' +
      'Knowing this in diagnosis, the table name in an *"account determination error"* message ' +
      'points directly to where to look.',

    tur:
      '**Customizing tables:** {{T001}}, {{T004}}, {{T030}}, {{T007A}} — ' +
      '{{tampon}}ed, delivered through a transport request.\n\n' +
      '**Master data tables:** {{LFA1}}, {{KNA1}}, {{SKA1}}, {{ANLA}} — ' +
      'don\'t transport, created separately in the target system.\n\n' +
      '**Transaction tables:** {{BKPF}}, {{ACDOCA}}, {{BSET}} — ' +
      'not buffered, not transported.',

    transport:
      'A table\'s **structure** transports (as a development object); its **content** doesn\'t — ' +
      'except for customizing tables.\n\n' +
      '**The critical point at migration:** a table a custom program reads ' +
      'may have turned into a view in S/4HANA. ' +
      'The program keeps working, but it **gets slower**.\n\n' +
      '**The check:** take inventory of custom programs, ' +
      'flag the ones reading {{BSEG}}/{{BSIK}}/{{GLT0}}, and ' +
      'plan a move to {{ACDOCA}}.',

    img:[
      { yol:'SE11 → Data Dictionary (ABAP Dictionary)', not:'Table structure, key, relationships' },
      { yol:'SE16N → General table display', not:'Content — **not given to end users**' },
      { yol:'SPRO → Financial Accounting → ... → Document Types', not:'{{OBA7}} — the BLART definition' },
    ],

    ekstra:[
      { ic:'🗂️', baslik:'Why did index and totals tables exist, and why did they go away?', metin:
        'ECC\'s table architecture was a **performance solution**, and its logic was this:\n\n' +
        '{{BSEG}}\'s key is `BUKRS + BELNR + GJAHR + BUZEI` — it starts with ' +
        '**the document number**.\n\n' +
        'This makes "show me document 1900001234" very fast. ' +
        'But "show me vendor V-2001\'s open items" ' +
        'requires **scanning the entire table** — because `LIFNR` isn\'t part of the key.\n\n' +
        '**The solution: index tables.** {{BSIK}}\'s key starts with `LIFNR`. ' +
        'The same information is stored in a different order, and the query speeds up.\n\n' +
        '**The same logic applies to totals tables:** the query "account 770\'s October balance" ' +
        'would require summing thousands of items. {{GLT0}} keeps that total **precomputed**.\n\n' +
        '---\n\n' +
        '**What was the cost?**\n\n' +
        '**1.** Every posting is written to **multiple tables** → slower, lock contention.\n' +
        '**2.** Tables **can go out of sync** → the classic *"the totals don\'t reconcile"* problem.\n' +
        '**3.** Data is **duplicated** → disk and maintenance cost.\n\n' +
        '**What did HANA change?**\n\n' +
        'Thanks to columnar storage and in-memory processing, ' +
        '"scan the whole table" is no longer **expensive**. ' +
        'Summing millions of rows takes milliseconds instead of seconds.\n\n' +
        'That\'s why the index and totals tables **lost their reason for existing**. ' +
        'They were turned into {{uyumluluk-view}}s: old programs keep working, ' +
        'but the data is now held **in a single place**.\n\n' +
        '**Architectural lesson:** a design decision becomes unnecessary once the constraint ' +
        'that produced it disappears. The index tables weren\'t wrong — ' +
        'they\'re simply no longer needed.' },

      { ic:'⚠️', baslik:'`SHKZG` — the most common trap in reading raw data', metin:
        'Everyone who pulls data from {{BSEG}} and sums it falls into this trap.\n\n' +
        '**Amount fields are always positive.** ' +
        'If a document has 120,000 debit and 120,000 credit, ' +
        'the `DMBTR` field shows **120,000 twice**.\n\n' +
        'Summed directly, you get **240,000** and the document looks unbalanced.\n\n' +
        '**Direction is a separate field: `SHKZG`**\n\n' +
        '**S** = Soll (German for "debit")\n' +
        '**H** = Haben (German for "credit")\n\n' +
        'The correct calculation: the sum of the S rows and the sum of the H rows ' +
        'are **taken separately and compared**.\n\n' +
        '---\n\n' +
        '**This changed in {{ACDOCA}}**\n\n' +
        'Amounts are **signed**: debit is positive, credit is **negative**. ' +
        'The total can be taken directly, and a balanced document comes out to **zero**.\n\n' +
        'This is one of S/4HANA\'s quieter but genuinely useful ' +
        'improvements — especially for data analysis and ' +
        'custom report writing.\n\n' +
        '**Practical consequence:** when moving an old query from {{BSEG}} to {{ACDOCA}}, ' +
        'the `SHKZG` logic **must be removed**; leaving it in applies the sign twice.' },
    ],

    notlar:[
      { tip:'warn', baslik:'The fiscal year is part of the key', metin:
        'The {{BKPF}} key is the `BUKRS + BELNR + **GJAHR**` triple.\n\n' +
        'The practical consequence: **the same document number can be reused in different fiscal years**. ' +
        'This is normal when number ranges are defined per year.\n\n' +
        'Searching in {{SE16N}} without specifying the fiscal year brings back **two records**, and ' +
        'it looks like "there\'s a duplicate."\n\n' +
        'This is likewise why {{FB03}} asks for the fiscal year — ' +
        'if left blank, the system can\'t know which year to display.\n\n' +
        '**Rule:** every query made by document number should have the **fiscal year** added.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Table architecture is the area S/4HANA **changed the most**. ' +
      '{{ACDOCA}} became the single line-item table; the index and totals tables ' +
      'turned into {{uyumluluk-view}}s. The accounting logic **didn\'t change at all**.',

    eccFarklari:[
      { konu:'FI items', ecc:'{{BSEG}} physical', s4:'**{{ACDOCA}}** · {{BSEG}} a view' },
      { konu:'CO items', ecc:'COEP — a separate table', s4:'{{ACDOCA}} — the **same table**' },
      { konu:'Open/cleared index', ecc:'{{BSIK}}/{{BSAK}} physical, the record **moves**', s4:'A view — **no** moving' },
      { konu:'Totals', ecc:'{{GLT0}}, FAGLFLEXT', s4:'**Removed** — calculated on the fly' },
      { konu:'Amount sign', ecc:'`SHKZG` in a separate field', s4:'**Signed amount** — credit is negative' },
      { konu:'Tables written per document', ecc:'5+', s4:'**3** (BKPF, ACDOCA, BSET)' },
      { konu:'Tax', ecc:'{{BSET}}', s4:'**{{BSET}} still there** — the return relies on it' },
      { konu:'Inconsistency risk', ecc:'Present', s4:'**Structurally impossible**' },
    ],

    universalJournal:
      '{{ACDOCA}} has three consequences for table architecture:\n\n' +
      '**1. Data duplication ended.** In ECC the same information was repeated across ' +
      '{{BSEG}}, {{BSIK}}, {{GLT0}}, and COEP. Now it lives **in one place**.\n\n' +
      '**2. Inconsistency became impossible.** Because the total and the item aren\'t in different tables, ' +
      'the *"the totals don\'t reconcile"* problem **can\'t arise**.\n\n' +
      '**3. Dimensions merged.** Account, cost center, profit center, segment, and ledger ' +
      'sit **on the same line**. Queries that needed a join in ECC ' +
      'now run against a single table.\n\n' +
      'A fourth, less-talked-about consequence: **amounts are now signed**. ' +
      'The `SHKZG` logic isn\'t needed.',

    kalkanTcodes:[
      { eski:'{{GLT0}}-based reports', yeni:'{{ACDOCA}}-based', not:'The totals table went away' },
      { eski:'CO reports reading COEP', yeni:'{{ACDOCA}}', not:'FI–CO merged' },
      { eski:'—', yeni:'—', not:'{{SE16N}}, {{SE11}}, {{FB03}} **weren\'t removed**' },
    ],

    fiori:[
      { ad:'Manage Journal Entries', aciklama:'Document search and review — the {{FB03}} counterpart.' },
      { ad:'Display Line Items in General Ledger', aciklama:'Item drilldown through {{ACDOCA}}.' },
      { ad:'Custom Analytical Queries', aciklama:'Lets a user build their own query on top of a {{cds-view}} — ' +
             'reporting without needing table knowledge.' },
      { ad:'View Browser', aciklama:'Search existing {{cds-view}}s — ' +
             'a "does one already exist?" check before new development.' },
    ],

    compatibilityViews:[
      '{{BSEG}}, {{BSIK}}, {{BSAK}}, {{BSID}}, {{BSAD}}, {{BSIS}}, {{BSAS}}, {{GLT0}} — ' +
      'all **views derived from {{ACDOCA}}**.',
      'Old programs **run unchanged** — that\'s migration\'s biggest convenience.',
      '**But they\'re slow.** New development, and old programs suffering ' +
      'performance problems, should read {{ACDOCA}} directly.',
      '{{BKPF}} and {{BSET}} **remain real tables** — not views.',
    ],

    performans:
      'The gain came from two sources:\n\n' +
      '**1. Fewer writes.** A document is written to 3 tables instead of 5+. ' +
      'The **lock contention** on the totals table in particular disappeared — ' +
      'a noticeable difference in heavily used systems.\n\n' +
      '**2. Faster reads.** Thanks to columnar storage, ' +
      'summing and filtering on large tables is very fast. ' +
      'That\'s why the index tables are no longer needed.\n\n' +
      '**Compatibility views eat into this gain.** ' +
      'When an old program queries {{BSIK}}, the system **derives** it ' +
      'through {{ACDOCA}} — meaning extra work.',

    bestPractices:[
      '**Take inventory** of custom programs; flag the ones reading {{BSEG}}/{{BSIK}}/{{GLT0}}.',
      'Use **{{ACDOCA}}** or a standard {{cds-view}} in new development.',
      'When moving a query from {{BSEG}} to {{ACDOCA}}, **remove the `SHKZG` logic** — ' +
      'amounts are now signed.',
      '**Remove** programs that read the totals table; they\'re no longer needed.',
      'When a new report is needed, first search **View Browser** for a ready-made CDS view.',
      'A migration is a good opportunity to **document** the data-model simplification — ' +
      'the team should know what each table is now.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'There\'s a document number, but no document: eliminating three possibilities',
    hikaye:
      'At **Kuzey Kimya Inc.**, an accounting clerk complains: ' +
      '*"Yesterday I posted three invoices and noted down the document numbers. ' +
      'Today I check them in {{FB03}} — two are there, one isn\'t."*\n\n' +
      'The missing document: **1900004521**.\n\n' +
      'The screen says nothing — just *"Document not found."* ' +
      'This scenario shows a systematic diagnosis carried out with table knowledge.',
    veriler:[
      { k:'Company code', v:'1000 · fiscal year 2027' },
      { k:'Missing document', v:'**1900004521**' },
      { k:'Neighboring numbers', v:'1900004520 ✓ · 1900004522 ✓ — both exist' },
      { k:'Symptom', v:'A number was assigned, no document exists' },
    ],

    adimlar:[
      { baslik:'Possibility 1 is ruled out — the wrong fiscal year?', tcode:'SE16N',
        aciklama:'The {{BKPF}} key has three fields; the fiscal year may have been skipped.',
        girdi:[
          { alan:'Table', deger:'{{BKPF}}' },
          { alan:'Selection', deger:'`BUKRS` = 1000 · `BELNR` = 1900004521 · `GJAHR` = **blank**' },
          { alan:'Result', deger:'**0 records** — doesn\'t exist in any year' },
          { alan:'Conclusion', deger:'**Not** a fiscal-year issue' },
        ],
        not:'This should be the first check, because **the same number can be reused ' +
             'in different years** — `GJAHR` is part of the key.\n\n' +
             'The search was run with the fiscal year left blank and nothing turned up in any year. ' +
             'This possibility is ruled out.' },

      { baslik:'Possibility 2 is ruled out — is the document parked?', tcode:'SE16N',
        aciklama:'Parked documents sit in {{VBKPF}}, not {{BKPF}}.',
        girdi:[
          { alan:'Table', deger:'{{VBKPF}}' },
          { alan:'Selection', deger:'`BELNR` = 1900004521' },
          { alan:'Result', deger:'**0 records**' },
          { alan:'Conclusion', deger:'Not parked' },
        ],
        not:'This is the most common cause: {{FB03}} only looks at {{BKPF}}; ' +
             'a parked document is viewed with {{FBV3}}.\n\n' +
             'But there\'s no record here — so the document wasn\'t parked either.\n\n' +
             'Only one possibility remains.' },

      { baslik:'Possibility 3 is confirmed — an update error', tcode:'SM13',
        aciklama:'Checking whether the asynchronous update failed.',
        girdi:[
          { alan:'Date', deger:'Yesterday · user MUHASEBE04' },
          { alan:'Status', deger:'**Err** (failed)' },
          { alan:'Records found', deger:'**1** — at 16:42' },
          { alan:'Error', deger:'*"Table space full"* — the disk was full at that moment' },
        ],
        not:'**Root cause found: an {{guncelleme-hatasi}}.**\n\n' +
             'SAP posts in two stages: the user is **given the number** and the screen is released; ' +
             'the actual database write happens **in the background**.\n\n' +
             'The user saw the number, but the background write failed. ' +
             'The number was consumed, the document was never created.\n\n' +
             'That\'s why the user says "I posted it," and is right — ' +
             'they genuinely saw a number on screen.' },

      { baslik:'Can the update be re-run?', tcode:'SM13',
        aciklama:'The error detail is examined.',
        girdi:[
          { alan:'Error type', deger:'A temporary resource problem (disk)' },
          { alan:'Disk status', deger:'Cleaned up overnight, **no problem now**' },
          { alan:'Decision', deger:'The update **can be re-run**' },
          { alan:'Result', deger:'Document 1900004521 **was created** ✓' },
        ],
        fis:{ baslik:'Document 1900004521 — after re-running the update', belgeTuru:'KR', tarih:'15.11.2027',
          satirlar:[
            { hesap:'770', ad:'General administrative expense', borc:45000 },
            { hesap:'191', ad:'Deductible VAT', borc:9000 },
            { hesap:'320', ad:'Trade payables', alacak:54000 },
          ], not:'The document was created with its original number and its **original posting date**.\n\n' +
                 'Because the update record kept all the data, ' +
                 'it didn\'t need to be re-entered.' },
        not:'**Not every update error can be re-run.** ' +
             'With temporary resource problems (disk, memory, lock), it usually works. ' +
             'If there\'s a data error or a program error, the entry **must be re-entered**.\n\n' +
             'The decision is made by looking at the error detail in {{SM13}}.' },

      { baslik:'A second finding — are there other errors on the same day?', tcode:'SM13',
        aciklama:'Checking whether the problem is isolated or widespread.',
        girdi:[
          { alan:'Date range', deger:'Last 7 days · all users' },
          { alan:'Failed updates', deger:'**14 records**' },
          { alan:'Distribution', deger:'11 in the same time window (16:30–17:00)' },
          { alan:'Cause', deger:'The same disk problem — **a batch of records affected**' },
        ],
        not:'**It wasn\'t a single-document problem.** 14 records failed for the same reason, and ' +
             'none of them had been noticed.\n\n' +
             'Users assumed they\'d posted because they got a number; ' +
             'the documents never existed, so they were **missing** from the trial balance.\n\n' +
             'This shows why an {{guncelleme-hatasi}} is dangerous: ' +
             '**no one sees an error**, only the data ends up missing.' },

      { baslik:'A lasting fix — a daily check', tcode:'SM13',
        aciklama:'Setting up a routine to catch update errors that go unnoticed.',
        girdi:[
          { alan:'Measure 1', deger:'A **daily** {{SM13}} check — added to the Basis team\'s routine' },
          { alan:'Measure 2', deger:'A **notification to accounting** whenever there\'s a failed update' },
          { alan:'Measure 3', deger:'Month-end: check number-range gaps with {{NRIV}}' },
          { alan:'Measure 4', deger:'User training: "I got a number" **does not** mean "it posted"' },
        ],
        not:'**The fourth measure is conceptual but important:** users ' +
             'take seeing a document number to mean "the posting is complete."\n\n' +
             'The truth: the number **was reserved**, the actual write happens in the background. ' +
             'A habit of verifying with {{FB03}} should be built for critical postings.\n\n' +
             'The first measure (a daily {{SM13}} check) is ' +
             '**the only systematic early warning** for this class of error.' },
    ],

    sonuc:
      '**A single lost document was suspected; in reality 14 documents were missing and no one had noticed.**\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. "Document not found" means three possibilities, and they\'re ruled out in order.** ' +
      '**(a)** Wrong fiscal year — `GJAHR` is part of the {{BKPF}} key, ' +
      'the same number can exist in different years. ' +
      '**(b)** The document is **parked** — it sits in {{VBKPF}}, viewed with {{FBV3}}; ' +
      '{{FB03}} only looks at {{BKPF}}. ' +
      '**(c)** An **{{guncelleme-hatasi}}** — shows up in {{SM13}}.\n\n' +
      '**2. Getting a document number doesn\'t mean the posting is complete.** ' +
      'SAP hands over the number and releases the screen; the actual write happens **asynchronously**. ' +
      'If it fails, the number is consumed, no document is created, and ' +
      '**the user sees no error**.\n\n' +
      '**3. Update errors are silent and can happen in bulk.** ' +
      'In this case, 14 records failed for the same reason and none of them was noticed. ' +
      'The trial balance was short but no one went looking. ' +
      '**A daily {{SM13}} check** is the only systematic early warning for this class of error.\n\n' +
      '**4. Diagnosis requires table knowledge.** ' +
      'The screen only says *"document not found."* ' +
      'Without knowing which table to check — {{BKPF}}, {{VBKPF}}, {{SM13}} — ' +
      'these three possibilities can\'t be separated, and there\'s nothing more to tell the user than ' +
      '*"the system isn\'t working."* ' +
      '**This is exactly the practical value of table knowledge.**',
  },

  },
});
