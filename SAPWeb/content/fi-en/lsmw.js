/* ==========================================================================
   content/fi-en/lsmw.js — English body for "LSMW Data Transfer"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'lsmw',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'LSMW is the classic **14-step** tool used to transfer data from legacy systems into SAP.\n\n' +
      'But that description says **what** the tool is, not **why** it was designed that way.\n\n' +
      '---\n\n' +
      '**This topic\'s thesis:**\n\n' +
      '**LSMW is not a loading tool — it\'s a *recipe book*.**\n\n' +
      'Loading data once is easy. What\'s hard is **repeating the same load ' +
      'dozens of times, on different systems, with the same result**.\n\n' +
      'In a data migration project, the same load is repeated for:\n\n' +
      '• A **trial run** in the development system\n' +
      '• A **rehearsal** in the test system (multiple times)\n' +
      '• User acceptance testing\n' +
      '• Go-live — with **one shot**\n\n' +
      'Redoing the mapping from scratch every time is both slow and carries ' +
      'the risk of **producing a different result**.\n\n' +
      'This is why LSMW has 14 steps: **the recipe is written once and ' +
      'applied over and over** — and it is saved into the system as a portable object.',

    neden:
      '**Repeatability.** The same recipe produces the same result. ' +
      'Manual mapping comes out slightly different every time.\n\n' +
      '**Portability.** The project is built in the development system, ' +
      '**exported**, and carried to test and production.\n\n' +
      '**Separation.** The mapping rules are **separate** from the data. ' +
      'The data changing doesn\'t change the recipe; the recipe changing doesn\'t change the data.\n\n' +
      '**Auditability.** Where each field came from is **documented**. ' +
      'Six months later, the question *"where did this cost center come from?"* can be answered.\n\n' +
      '**No programming.** Works without writing ABAP, via a screen recording ({{kayit-recording}}) ' +
      'or a standard object.',

    sirketOnemi:
      'Data migration is the **most underestimated** part of ERP projects, and the one that ' +
      'most often runs late.\n\n' +
      'The reason: **the data quality problem isn\'t the tool\'s problem** — but it stays ' +
      '**invisible** until the tool is run.\n\n' +
      'The legacy system has 12,000 vendors. The load starts and the following surface:\n\n' +
      '• 340 have **no** tax number\n' +
      '• 89 have an **invalid** country code\n' +
      '• 1,200 turn out to be **duplicate** records\n' +
      '• 45 have a payment term that\'s **not defined** in SAP\n\n' +
      'None of these is LSMW\'s fault — but all of them surface ' +
      '**once LSMW is run**.\n\n' +
      '---\n\n' +
      '**The real lesson for a consultant:** LSMW\'s most valuable output isn\'t the loaded ' +
      'data — it\'s the **error list from the first trial run**. That list is the ' +
      '**work plan** for the data cleansing project.\n\n' +
      'That\'s why the trial run should happen **as early as possible** — not once the ' +
      'data is ready, but **while the data is being prepared**.',

    gercekHayat:
      'Project manager: *"Load the vendor data, the file is ready."*\n\n' +
      'Inexperienced approach: take the file, set up LSMW, run it, fix the errors, ' +
      'run it again. The errors never end; each round a new one shows up.\n\n' +
      '---\n\n' +
      'The experienced approach starts in **reverse order**:\n\n' +
      '**1.** First, **manually open a vendor** in SAP ({{XK01}}).\n' +
      '**2.** Note down which fields are **mandatory**.\n' +
      '**3.** Compare this list against the source file — the **gaps** become visible.\n\n' +
      '**4.** Only then set up LSMW.\n\n' +
      '**Why this order is faster:** LSMW\'s mandatory-field errors come **one line at ' +
      'a time**, and every round you hit the next one. Opening a record by hand shows ' +
      '**every mandatory field at once**.\n\n' +
      '**Rule:** mapping is built starting from **SAP\'s mandatory field list**, not from the source file.',

    muhasebeMantigi:
      'LSMW moves two types of data on the FI side, and **the two are completely different**:\n\n' +
      '**① Master data** — vendor, customer, G/L account, asset.\n' +
      'Doesn\'t **produce** an accounting document. If wrong, it\'s corrected and no trace remains.\n\n' +
      '**② Transaction data** — open items, balances.\n' +
      '**Produces an accounting document.** If wrong, {{FB08}} is needed and **a trace remains**.\n\n' +
      '---\n\n' +
      'The second group is far riskier and calls for a **separate rule**: opening ' +
      'balances are posted through an **offsetting account**.\n\n' +
      'Every vendor liability must have a counterpart; this counterpart is usually a ' +
      '**clearing account** (e.g. `199` or `399`).\n\n' +
      '**The check is simple and definitive:** once all opening entries have been ' +
      'entered, **the clearing account\'s balance must be zero**.\n\n' +
      'If it isn\'t, either an item was loaded short or an item was loaded extra. ' +
      'This single check is the accounting-side counterpart of {{sayi-mutabakati}}, and, ' +
      'because it works **on amounts**, it\'s **stronger** than a count check.',

    kavramlar: ['kayit-recording', 'toplu-giris', 'alan-esleme', 'donusum-kurali',
                'sayi-mutabakati', 'tasima-istegi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'LSMW\'s 14 steps look intimidating but are really **four logical blocks**. ' +
      'Once you see the blocks, the sequence explains itself: ' +
      '**define → map → read and convert → write.**',

    roller:[
      { rol:'Consultant', gorev:'**First manually opens a record** — to see the mandatory fields.' },
      { rol:'Consultant', gorev:'Sets up the project / subproject / object structure.' },
      { rol:'Consultant', gorev:'Chooses the **transfer method**: standard object · {{kayit-recording}} · {{bapi}} · {{idoc}}' },
      { rol:'Consultant', gorev:'Defines the source structure and its fields.' },
      { rol:'Consultant', gorev:'Writes the {{alan-esleme}} and {{donusum-kurali}}.' },
      { rol:'Consultant', gorev:'Reads the file, converts it, **displays and checks it**.' },
      { rol:'Consultant', gorev:'Runs a trial first with a **small subset**.' },
      { rol:'Consultant', gorev:'Creates and runs the batch input session.' },
      { rol:'Consultant', gorev:'Performs {{sayi-mutabakati}} — **never skipped**.' },
      { rol:'Consultant', gorev:'Exports the project and carries it to the next system.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'LSMW — 14 steps, four blocks',
      adimlar:[
        { ic:'📋', rol:'Prep', baslik:'Step 0 — the step that isn\'t in LSMW',
          aciklama:'First, **manually open a record** in SAP. Note down the mandatory fields. ' +
                   'This step doesn\'t exist in the tool but is the **biggest time-saver**.',
          cikti:'Mandatory field list', ok:'the project is set up' },
        { ic:'🗂️', rol:'Block 1 · Define', baslik:'Step 1 — Project / subproject / object',
          aciklama:'A three-level structure. This is the **portable unit** — ' +
                   'export happens at this level.',
          cikti:'Project skeleton', ok:'the method is chosen' },
        { ic:'🔀', rol:'Block 1 · Define', baslik:'Step 2 — **Transfer method** (the most critical decision)',
          aciklama:'Use the **standard object** if there is one · otherwise {{bapi}} · ' +
                   'if not that either, {{kayit-recording}}\n\n' +
                   'If this decision is changed later, **most of the mapping is redone**.',
          cikti:'Method', ok:'the structure is defined' },
        { ic:'🧱', rol:'Block 2 · Map', baslik:'Steps 3–5 — Source structure and fields',
          aciklama:'What columns the file has, and their types. On multi-level data ' +
                   '(header + item), the **relationship** is also defined here.',
          cikti:'Source definition', ok:'it gets mapped' },
        { ic:'🔗', rol:'Block 2 · Map', baslik:'Step 6 — {{alan-esleme}} and {{donusum-kurali}}',
          aciklama:'**This is where the real work is.** Date format, decimal separator, ' +
                   'leading-zero padding, fixed values.\n\n' +
                   'The other 13 steps are infrastructure; **this step is the content**.',
          cikti:'Mapping rules', ok:'it gets read' },
        { ic:'📥', rol:'Block 3 · Read', baslik:'Steps 9–10 — Read the data and **display** it',
          aciklama:'**The display step must not be skipped.** ' +
                   'Column shifts and delimiter errors show up **here** — ' +
                   'not during the load.',
          cikti:'Data read', ok:'it gets converted' },
        { ic:'⚙️', rol:'Block 3 · Convert', baslik:'Steps 11–12 — Convert and display',
          aciklama:'The rules are applied. **The second display step is here:** ' +
                   'did the values **actually** turn into SAP format?',
          cikti:'Data converted', ok:'it gets written' },
        { ic:'🎯', rol:'Block 4 · Write', baslik:'Trial with a **small subset** first',
          aciklama:'Run with 10–20 rows. Read the error list. ' +
                   'This list **is the data cleansing work plan**.\n\n' +
                   'Starting with 12,000 rows means seeing the same error 12,000 times.',
          cikti:'Error list', ok:'fix it and repeat' },
        { ic:'▶', rol:'Block 4 · Write', baslik:'Steps 13–14 — Create and run the session',
          aciklama:'A {{toplu-giris}} session is created in {{SM35}}. ' +
                   'The first run is done in **display** mode.',
          cikti:'Records', ok:'verify' },
        { ic:'✓', rol:'Check', baslik:'{{sayi-mutabakati}} — never skipped',
          aciklama:'**Count:** submitted = created.\n' +
                   '**Amount:** source total = system total.\n\n' +
                   'If the count matches but the amount doesn\'t → a {{donusum-kurali}} error.',
          cikti:'Verified load', ok:'transport' },
        { ic:'📦', rol:'Transport', baslik:'Export the project',
          aciklama:'An LSMW project **isn\'t transported** with {{tasima-istegi}} — ' +
                   'it has its own **export/import** mechanism.',
          cikti:'Portable project' },
      ],
    },

    adimlar:[
      { rol:'Consultant', eylem:'Opens a manual sample record', sistem:'{{XK01}} / {{FS00}} / {{AS01}}' },
      { rol:'Consultant', eylem:'Sets up project/subproject/object', sistem:'{{LSMW}} step 1' },
      { rol:'Consultant', eylem:'Chooses transfer method', sistem:'Step 2 — **the most critical decision**' },
      { rol:'Consultant', eylem:'Defines source structure and fields', sistem:'Steps 3–5' },
      { rol:'Consultant', eylem:'Writes mapping and conversion', sistem:'Step 6' },
      { rol:'Consultant', eylem:'Reads and **displays**', sistem:'Steps 9–10' },
      { rol:'Consultant', eylem:'Converts and **displays**', sistem:'Steps 11–12' },
      { rol:'Consultant', eylem:'Trials with a small subset', sistem:'10–20 rows' },
      { rol:'Consultant', eylem:'Creates and runs the session', sistem:'Steps 13–14 · {{SM35}}' },
      { rol:'Consultant', eylem:'Performs reconciliation', sistem:'Count **and** amount' },
    ],

    veriAkisi:{
      nereden:'A flat file (CSV / TXT) or Excel pulled from the legacy system.',
      nereye:'SAP master data or transaction tables.',
      tetikleyen:'A manual run — LSMW is not a scheduled tool.',
      sonraki:'{{sayi-mutabakati}} → error correction → repeat → project export.',
    },

    notlar:[
      { tip:'warn', baslik:'Reversing step 2 is the most expensive decision', metin:
        'Most of the 14 steps can be changed afterward. Saying **step 2 — the transfer ' +
        'method — can\'t be changed** would be wrong, but changing it means **most of the ' +
        'mapping is redone**.\n\n' +
        'The reason: each method has a **different target field structure**.\n\n' +
        '{{kayit-recording}} → the target fields are **screen fields**\n' +
        '{{bapi}} → the target fields are **structure fields**\n' +
        '**Standard object** → the target fields are the **object fields** SAP defines\n\n' +
        'So every line you write in the mapping step **depends on** the method you chose.\n\n' +
        '---\n\n' +
        '**The correct choice order:**\n\n' +
        '**1. Is there a standard object?** → if so, **use it**. ' +
        'SAP maintains it, and it doesn\'t break across version upgrades.\n' +
        '**2. Is there a {{bapi}}?** → if so, use it. ' +
        'Independent of the screen, **runs the validations**, the error message is **meaningful**.\n' +
        '**3. Last resort: {{kayit-recording}}.** ' +
        'It **breaks** if the screen changes, and the error message arrives in the screen\'s language.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Moving master data with LSMW does **not** produce an accounting document. ' +
      'But moving **opening balances** does — and this is the ' +
      '**riskiest part of a data migration from an accounting standpoint**.',

    etkilenenHesaplar:[
      { hesap:'320 Trade payables', tur:'Balance sheet — Liability', neden:'Open vendor items are transferred **one at a time**.' },
      { hesap:'120 Trade receivables', tur:'Balance sheet — Asset', neden:'Open customer items are transferred **one at a time**.' },
      { hesap:'G/L accounts', tur:'Mixed', neden:'Only the **balance** is transferred, not the item.' },
      { hesap:'399 Clearing account', tur:'Temporary', neden:'The offsetting account for the entire opening load. **Must end up at zero.**' },
    ],

    fisler:[
      { baslik:'① Transferring an open vendor item — **one at a time**',
        belgeTuru:'KR', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'399', ad:'Clearing account', borc:120000 },
          { hesap:'320', ad:'Trade payables — ABC Ltd.', alacak:120000, not:'{{BSIK}} open item' },
        ],
        not:'**Why one at a time, not in bulk?**\n\n' +
             'If the vendor balance were transferred **in bulk** (as a single line into ' +
             '{{BSIS}}), payment through {{F-53}} **couldn\'t happen** afterward — ' +
             'there would be no **open item** to clear.\n\n' +
             'Likewise {{F110}} wouldn\'t work, {{F150}} couldn\'t generate a dunning ' +
             'notice, and an {{FBL1N}} line item report would be meaningless.\n\n' +
             '**Rule:** on accounts under {{acik-kalem}} management (vendor, customer), ' +
             '**each invoice is transferred as a separate document**. The due date, payment ' +
             'terms, and reference **must be preserved**.' },

      { baslik:'② Transferring a G/L balance — **in bulk**',
        belgeTuru:'SA', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Plant, machinery and equipment', borc:4500000 },
          { hesap:'100', ad:'Cash', borc:85000 },
          { hesap:'102', ad:'Banks', borc:1240000 },
          { hesap:'399', ad:'Clearing account', alacak:5825000 },
        ],
        not:'On G/L accounts, the **balance is transferred, not the item** — ' +
             'because there\'s no open item management.\n\n' +
             '**Exception:** G/L accounts with {{acik-kalem}} management **turned on** ' +
             '(GR/IR, suspense accounts) must still be transferred **one at a time**. ' +
             'If transferred in bulk, {{F.13}} automatic clearing won\'t work.\n\n' +
             '**Fixed assets need extra care:** asset balances aren\'t transferred with a ' +
             'normal G/L posting, but as a **legacy asset takeover** (`AS91`) — otherwise ' +
             '{{ANLC}} stays empty and {{AFAB}} can\'t calculate depreciation ' +
             '(see {{konu:asset-accounting}}).' },

      { baslik:'③ Check — the clearing account **must be zeroed**',
        belgeTuru:'SA', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'399', ad:'Clearing account — all debits', borc:5945000 },
          { hesap:'399', ad:'Clearing account — all credits', alacak:5945000 },
        ],
        not:'**This is the single strongest check in a data migration.**\n\n' +
             'Once all opening entries have been entered, the clearing account\'s ' +
             'balance **must be zero**.\n\n' +
             '**Why it\'s so strong:**\n\n' +
             '• **More reliable** than a count check — it works on amounts\n' +
             '• Catches an under-load **or** an over-load\n' +
             '• Catches a {{donusum-kurali}} error (decimal separator, exchange rate)\n' +
             '• **Only one number** to look at — no interpretation needed\n\n' +
             'If it isn\'t zero, the load is **incomplete or wrong** — there\'s no other explanation.\n\n' +
             'This is the accounting-side counterpart of {{sayi-mutabakati}}, and it plays ' +
             'the same role in the {{konu:migration}} topic.' },
    ],

    tHesaplar:[
      { hesap:'Clearing account — must zero out', kod:'399',
        borc:[{ ad:'Counterpart of asset-side items', tutar:5945000 }],
        alacak:[{ ad:'Counterpart of liability-side items', tutar:5945000 }],
        not:'**Zero = the load is complete.** If not zero, something is short or extra' },
    ],

    notlar:[
      { tip:'warn', baslik:'Four decisions in an opening balance transfer', metin:
        'Before transferring balances, **four questions** need answers. A wrong answer ' +
        'can\'t be corrected afterward, or is very costly:\n\n' +
        '**1. Which date?** Usually **one day before** the go-live year (12/31). ' +
        'The period must be open in {{OB52}} and **closed** after the load.\n\n' +
        '**2. Item or balance?** Accounts with {{acik-kalem}} management go **one at ' +
        'a time**; others in bulk. A wrong choice breaks {{F110}}, {{F-53}}, and {{F.13}}.\n\n' +
        '**3. What offsetting account?** A **clearing account** is opened and **zeroed ' +
        'out** at the end. Posting straight to equity **removes the ability to check**.\n\n' +
        '**4. Is the number range ready?** A separate {{belge-turu}} and {{FBN1}} range ' +
        'are defined for the migration documents — so migration entries can be ' +
        '**told apart later** (filtered via {{BKPF}}.`BLART`).\n\n' +
        'The fourth is the most-skipped and **the most regretted** decision: if migration ' +
        'entries are posted with the normal document type, the question *"where did this ' +
        'balance come from?"* years later **has no answer**.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'The **four blocks** of the 14 steps and the **four transfer methods** — ' +
      'understanding LSMW comes down to knowing these two lists.\n\n' +
      '---\n\n' +
      '**Choosing a method is a sequential decision**, not a preference:\n\n' +
      '**1.** Is there a standard object? → **use it**\n' +
      '**2.** If not, is there {{bapi}}? → **use it**\n' +
      '**3.** If not that either → {{kayit-recording}} (**last resort**)\n\n' +
      'The reason: **fragility increases** as you go down the list. ' +
      'SAP maintains the standard object; a recording **breaks** when the screen changes.',

    liste:[
      /* --- Blocks --- */
      { ad:'Define',
        aciklama:'The project structure and the **transfer method**.',
        neZaman:'At the very start.',
        ornek:'A three-level **Project → Subproject → Object** structure.\n\n' +
              'This is the **portable unit**: export happens at this level.\n\n' +
              'Step 2 (the method) is **the most critical decision** — ' +
              'if it\'s changed later, most of the mapping is redone.',
        tcodes:['LSMW'] },

      { ad:'Map',
        aciklama:'The source structure, fields, relationships, and **mapping rules**.',
        neZaman:'After the method is chosen.',
        ornek:'**Step 6 is where the real work is.** The other 13 steps are infrastructure; ' +
              'this step **is the content**.\n\n' +
              '{{alan-esleme}} and {{donusum-kurali}} are written here.\n\n' +
              'On multi-level data (an invoice header + items), the ' +
              '**header–item relationship** is also defined here — via a shared key field.',
        tcodes:['LSMW'] },

      { ad:'Read & Convert',
        aciklama:'The file is read, the rules are applied, and it\'s **displayed twice**.',
        neZaman:'Once the mapping is done.',
        ornek:'**There are two display steps and neither should be skipped:**\n\n' +
              '**Step 10 — data read:** are the columns right? ' +
              'Delimiter errors and column shifts show up **here**.\n\n' +
              '**Step 12 — data converted:** did the date become `20271231`? ' +
              'Is the account number zero-padded on the left?\n\n' +
              'Skipping these two steps and loading directly means seeing the error ' +
              'at **the most expensive place**.',
        tcodes:['LSMW'] },

      { ad:'Import',
        aciklama:'The {{toplu-giris}} session is created and run.',
        neZaman:'Once the display is clean.',
        ornek:'Run **with a small subset** (10–20 rows) first.\n\n' +
              'The first run is in **display** mode — followed screen by screen. ' +
              'Later rounds run in the background.\n\n' +
              'The session is visible in {{SM35}}; failed rows stay there and can be ' +
              '**fixed and reprocessed**.',
        tcodes:['SM35'] },

      /* --- Methods --- */
      { ad:'Standard Object',
        aciklama:'A ready-made transfer object SAP defines.',
        neZaman:'**Whenever one exists.**',
        ornek:'**Advantage:** **SAP maintains** it. Doesn\'t break across version upgrades, ' +
              'the field list comes ready, and validations run.\n\n' +
              '**Disadvantage:** doesn\'t exist for every object and ' +
              'may not support custom fields.\n\n' +
              'When available, it\'s **unambiguously the first choice**.' },

      { ad:'BAPI',
        aciklama:'**Screen-independent** access to a business object.',
        neZaman:'When there\'s no standard object.',
        ornek:'**Advantages:**\n\n' +
              '• **Unaffected** by screen changes\n' +
              '• **Runs** business validations — data integrity is preserved\n' +
              '• The error message is **meaningful** (a structured return table)\n' +
              '• **Faster** than a screen flow\n\n' +
              '**The most common mistake:** `BAPI_TRANSACTION_COMMIT` isn\'t called, ' +
              'and the record **is never written**. The BAPI returns *"successful"*, but ' +
              '**nothing is in the database**.\n\n' +
              'The same trap exists when testing with a single record in {{SE37}}.',
        tcodes:['SE37'] },

      { ad:'Recording',
        aciklama:'Recording the screen flow step by step and replaying it.',
        neZaman:'When there\'s neither a standard object **nor** a BAPI; on custom (`Z*`) transactions.',
        ornek:'**Why it\'s the last resort:**\n\n' +
              '• **Breaks** if the screen changes (support package, upgrade)\n' +
              '• Conditional screens are **a trap** — if the sample record didn\'t follow ' +
              'that path, that screen **never enters** the recording and the load gets stuck there\n' +
              '• The error message arrives in the screen\'s language — **hard to diagnose**\n' +
              '• Slow — the entire screen flow runs for every row\n\n' +
              '**Critical rule:** the sample record is taken with the **most complex ' +
              'row** in the dataset — not the simplest. A recording taken with a simple ' +
              'record **gets stuck** on screens that complex rows trigger.',
        tcodes:['SHDB'] },

      { ad:'IDoc',
        aciklama:'A message-based transfer — an integration tool **more than a one-time migration** method.',
        neZaman:'When a continuous flow of data is needed.',
        ornek:'**Too heavy** for a one-time data migration: it needs a partner profile ' +
              '({{WE20}}), a message type, and a port definition.\n\n' +
              '**But it has one advantage:** each IDoc **keeps its own status**, and ' +
              'failed ones can be **reprocessed individually** with {{BD87}}.\n\n' +
              'That traceability is valuable in ongoing interfaces ' +
              '(see {{konu:data-upload}}).',
        tcodes:['WE02','WE20','BD87'] },
    ],

    karsilastirmaBasliklar:['{{kayit-recording}}', '{{bapi}}'],
    karsilastirma:[
      ['Depends on', '**The screen flow**', 'The structure definition'],
      ['If the screen changes', '**Breaks**', 'Unaffected'],
      ['Validations', 'Screen validations', '**Business logic runs**'],
      ['Error message', 'In the screen\'s language — **hard to diagnose**', '**Structured** return table'],
      ['Speed', 'Slow — the entire screen flow', '**Fast**'],
      ['Ease of setup', '**Easy** — record and use', 'Requires knowledge of the structure'],
      ['Custom (`Z*`) transaction', '**Works**', 'Doesn\'t, unless there\'s a BAPI'],
      ['Commit trap', 'None', '`BAPI_TRANSACTION_COMMIT` **mandatory**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'LSMW', ad:'Legacy System Migration Workbench',
        amac:'Builds, stores, and runs the 14-step data transfer recipe.',
        neZaman:'For loads that will be repeated; not needed for a one-time 20-row load.',
        adimlar:[
          { baslik:'**First manually open a record** — see the mandatory fields',
            aciklama:'The step LSMW doesn\'t have, but that saves the most time.' },
          { baslik:'Create the project / subproject / object' },
          { baslik:'Choose the **transfer method**',
            aciklama:'In order: standard object → {{bapi}} → {{kayit-recording}}.' },
          { baslik:'Source structure, fields, and mapping',
            aciklama:'Step 6 is where the **real work** is.' },
          { baslik:'Read → **display** → convert → **display**',
            aciklama:'Neither display step is skipped.' },
          { baslik:'Trial with a small subset, then load in full' },
          { baslik:'Perform {{sayi-mutabakati}}' },
          { baslik:'**Export** the project — for the next system' },
        ],
        ekranAkisi:[
          { ekran:'Prep', islem:'A vendor was manually opened with {{XK01}} → **14 mandatory fields**' },
          { ekran:'Comparison', islem:'The source file has **11 fields** → 3 missing' },
          { ekran:'Decision', islem:'2 were assigned a fixed value, 1 was fixed by updating the source file' },
          { ekran:'Trial', islem:'20 rows → **4 errors** → a data cleansing list resulted' },
          { ekran:'Full load', islem:'12,000 rows → **11,943 successful** · 57 failed' },
          { ekran:'Reconciliation', islem:'The 57 failed rows stayed in {{SM35}} → fixed and reprocessed' },
        ],
        alanlar:{
          zorunlu:['Project','Subproject','Object','Transfer method'],
          opsiyonel:['Conversion rules','Fixed values','Translation tables'] },
        hatalar:[
          { mesaj:'I mapped the field but the value comes through blank', sebep:'In {{kayit-recording}}, that field **never entered the recording**.', cozum:'If a field was left blank while recording, it never enters the recording. **Record it again** with every field filled in.' },
          { mesaj:'Some rows get stuck on an unknown screen', sebep:'A **conditional screen** — the sample record didn\'t follow that path.', cozum:'Take the sample recording again with the **most complex row**.' },
          { mesaj:'Account number says "not found" but the account exists', sebep:'Missing **leading-zero padding** — Excel dropped the leading zeros.', cozum:'Pad with leading zeros via {{donusum-kurali}}; keep the source column in **text** format.' },
          { mesaj:'Date error', sebep:'A format mismatch.', cozum:'SAP\'s internal format is `YYYYMMDD`. A conversion rule is written.' },
          { mesaj:'The project isn\'t in the test system', sebep:'An LSMW project **isn\'t transported** with {{tasima-istegi}}.', cozum:'LSMW\'s own **export/import** menu is used.' },
        ],
        ipucu:'**The biggest efficiency gain comes before step 6:** manually opening a ' +
              'record in SAP and **seeing the mandatory fields**.\n\n' +
              'LSMW\'s mandatory-field errors come **one line at a time** — ' +
              'every round you hit the next one and you end up going ten rounds.\n\n' +
              'Manually opening a record shows **every mandatory field at once**.\n\n' +
              'Rule: mapping is built starting from **SAP\'s mandatory field list**, not the source file.',
        ilgili:['SHDB','SM35','LTMC'] },

      { kod:'SHDB', ad:'Batch input recording',
        amac:'Records a transaction\'s screen flow; produces the {{toplu-giris}} skeleton.',
        neZaman:'When there\'s no standard object and no {{bapi}}; on custom (`Z*`) transactions.',
        adimlar:[
          { baslik:'Create a new recording, enter the transaction code' },
          { baslik:'Enter the **most complex** sample record — not the simplest',
            aciklama:'So conditional screens enter the recording.' },
          { baslik:'**Fill in every field** — a blank field never enters the recording' },
          { baslik:'Finish the recording, review the screen flow' },
          { baslik:'Select this recording as the transfer method in {{LSMW}}' },
        ],
        ekranAkisi:[
          { ekran:'Trial 1', islem:'A recording was taken with a simple vendor — 3 screens' },
          { ekran:'Load', islem:'**Got stuck** on vendors that had bank information' },
          { ekran:'Cause', islem:'The bank screen **never opened** in the sample recording' },
          { ekran:'Trial 2', islem:'Redone with a vendor that has bank details — **5 screens** ✓' },
        ],
        alanlar:{ zorunlu:['Recording name','Transaction code'], opsiyonel:['Default values'] },
        hatalar:[
          { mesaj:'Some fields are missing from the recording', sebep:'They were **left blank** while recording.', cozum:'A blank field never enters the recording. Record it again — with **every field** filled in.' },
          { mesaj:'The load stops on an unknown screen', sebep:'A conditional screen.', cozum:'Take the recording again with the most complex data.' },
          { mesaj:'The recording broke after a support package', sebep:'The screen flow changed.', cozum:'This is recording\'s **structural weakness**. Take it again — or switch to {{bapi}}.' },
        ],
        ipucu:'**One rule: record with the most complex row.**\n\n' +
              'A recording captures the screens it sees — it doesn\'t know about the ones ' +
              'it doesn\'t. A recording taken with a simple vendor **gets stuck on screens ' +
              'that don\'t exist** for vendors with bank details or extra addresses.\n\n' +
              'Pick the row with **the most fields filled in** in the dataset.',
        ilgili:['LSMW','SM35'] },

      { kod:'SM35', ad:'Batch input queue — where failed rows wait',
        amac:'Runs and monitors sessions, and **keeps the failed rows**.',
        neZaman:'After every {{toplu-giris}} load.',
        adimlar:[
          { baslik:'Select the session' },
          { baslik:'The first run in **display** mode',
            aciklama:'Followed screen by screen; you see where it gets stuck.' },
          { baslik:'Later rounds in the background' },
          { baslik:'Open the **failed** session — the remaining rows are there' },
          { baslik:'Fix and **reprocess**' },
        ],
        ekranAkisi:[
          { ekran:'Session', islem:'12,000 rows · status **Incorrect**' },
          { ekran:'Detail', islem:'11,943 processed · **57 failed**' },
          { ekran:'Error', islem:'*"Payment terms Z030 does not exist"*' },
          { ekran:'Fix', islem:'The terms were defined in {{OBB8}} → 57 rows **reprocessed** ✓' },
        ],
        alanlar:{ zorunlu:['Session name'], opsiyonel:['Status','User','Date'] },
        hatalar:[
          { mesaj:'The session is "incorrect" — what now?', sebep:'Some rows couldn\'t be processed.', cozum:'They **aren\'t lost** — they wait in the session. The cause is fixed and it\'s **reprocessed**.' },
          { mesaj:'Was the same row processed twice?', sebep:'A worry about reprocessing.', cozum:'{{toplu-giris}} only repeats the **unprocessed** rows. Successful ones are skipped.' },
          { mesaj:'The session disappeared', sebep:'Successful sessions **get deleted** based on a setting.', cozum:'Check the deletion setting. On migration projects, sessions **should be kept** — an audit trail.' },
        ],
        ipucu:'**{{toplu-giris}}\'s most valuable feature: failed rows aren\'t lost.**\n\n' +
              'They wait in the session; once the cause is fixed they\'re **reprocessed**, ' +
              'and successful rows **aren\'t repeated**.\n\n' +
              'This is a real advantage over custom load programs written with {{bapi}}, ' +
              'where **you have to build** re-runnability yourself (see {{konu:data-upload}}).\n\n' +
              'But {{sayi-mutabakati}} is still needed: a {{guncelleme-hatasi}} **may not ' +
              'show up as an error** in the session.',
        ilgili:['SHDB','LSMW','SM13'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'LSMW\'s own tables aren\'t of interest to a consultant — ' +
      'what matters are the **target tables** and the **validation tables**.',

    liste:[
      { ad:'BKPF', baslik:'How to tell migration documents apart',
        tutar:'Document header — migration entries are **filtered** by `BLART` and `TCODE`.',
        olusturan:'The opening balance load',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'Items in {{BSEG}} / {{ACDOCA}}.',
        s4:'Items are in {{ACDOCA}}.',
        alanlar:[
          { ad:'BLART', aciklama:'A **separate document type for migration** must be defined — the only way to tell it apart later' },
          { ad:'TCODE', aciklama:'The transaction the loading tool used' },
          { ad:'XBLNR', aciklama:'Reference — the **legacy system document number** is written here' },
          { ad:'BKTXT', aciklama:'Document header text — something like *"Opening balance 2027"*' },
        ] },

      { ad:'BSIK', baslik:'Transferred open vendor items — verification',
        tutar:'Open vendor items.',
        olusturan:'The opening-item load',
        anahtar:'LIFNR + BUKRS + BELNR',
        iliskiler:'A {{uyumluluk-view}} in S/4HANA.',
        s4:'Turned into a view.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Vendor — the count and amount reconciliation starts here' },
          { ad:'ZFBDT', aciklama:'**Due date** — if not transferred, {{F110}} and {{F150}} run incorrectly' },
          { ad:'ZTERM', aciklama:'Payment terms — **must be defined** in SAP' },
        ] },

      { ad:'LFA1', baslik:'Transferred vendor master data',
        tutar:'Vendor general data.',
        olusturan:'The master data load',
        anahtar:'LIFNR',
        iliskiler:'Company code data is in {{LFB1}} — **loaded separately**.',
        s4:'Managed via {{BP}}.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Vendor number — internal or external numbering?' },
          { ad:'STCD1 / STCD2', aciklama:'Tax number — **mandatory** in Turkey and used in the e-document' },
        ] },

      { ad:'LFB1', baslik:'Company code data that must be loaded separately',
        tutar:'The vendor\'s **company code**-level data.',
        olusturan:'A separate load step',
        anahtar:'LIFNR + BUKRS',
        iliskiler:'Tied to {{LFA1}} general data.',
        s4:'As a {{BP}} role.',
        alanlar:[
          { ad:'AKONT', aciklama:'**Reconciliation account** — if missing, no posting can be made to the vendor' },
          { ad:'ZTERM', aciklama:'Payment terms' },
          { ad:'ZWELS', aciklama:'Payment method — needed for {{F110}}' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Load order — the dependency chain',
      varliklar:[
        { ad:'LFA1', rol:'Step 1', hub:true, aciklama:'**General data** — this first',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'STCD1' }] },
        { ad:'LFB1', rol:'Step 2', aciklama:'**Company code data** — a separate load',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT' }] },
        { ad:'BKPF', rol:'Step 3', aciklama:'**Opening document** — master data must be ready',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'XBLNR' }] },
        { ad:'BSIK', rol:'Result', aciklama:'Transferred **open items**',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZFBDT' }] },
      ],
      iliskiler:[
        { from:'LFA1', to:'LFB1', alanlar:'LIFNR', not:'**a separate load step**' },
        { from:'LFB1', to:'BKPF', alanlar:'—', not:'master data must come **first**' },
        { from:'BKPF', to:'BSIK', alanlar:'BELNR', not:'the open item is created' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Three screens: **{{SHDB}}** (take a recording), **{{LSMW}}** (build the recipe), ' +
      '**{{SM35}}** (run it and collect errors).',

    ekranlar:[
      { ad:'{{SHDB}} — taking a recording',
        aciklama:'Recording the screen flow.',
        alanlar:[
          { ad:'Transaction code', zorunlu:true, aciklama:'The transaction to record.' },
          { ad:'**Sample data**', zorunlu:true, aciklama:'The **most complex** row is chosen — ' +
                   'so conditional screens enter the recording.' },
          { ad:'Every field', zorunlu:true, aciklama:'A field left blank **never enters the recording**.' },
        ],
        ipucu:'A recording captures **the screens it sees**. It doesn\'t know a screen it ' +
              'never saw, and the load **gets stuck** there.' },

      { ad:'{{LSMW}} — the 14 steps',
        aciklama:'Where the recipe is built.',
        alanlar:[
          { ad:'Step 2 — the method', zorunlu:true, aciklama:'**The most critical decision.** ' +
                   'Standard object → {{bapi}} → {{kayit-recording}}' },
          { ad:'Step 6 — the mapping', zorunlu:true, aciklama:'**Where the real work is.** ' +
                   '{{alan-esleme}} and {{donusum-kurali}}.' },
          { ad:'Steps 10 and 12 — display', zorunlu:false, aciklama:'**Neither is skipped.** ' +
                   'The read data and the converted data are checked separately.' },
        ],
        ipucu:'Everything besides step 6 is **infrastructure**. ' +
              'Most of the time is, and should be, spent there.' },

      { ad:'{{SM35}} — run and collect',
        aciklama:'Session management.',
        alanlar:[
          { ad:'Run mode', zorunlu:true, aciklama:'The first round is **display**; ' +
                   'later ones run in the background.' },
          { ad:'Failed session', zorunlu:false, aciklama:'The remaining rows **aren\'t lost** — ' +
                   'they\'re fixed and reprocessed.' },
        ],
        ipucu:'Failed rows waiting in the session is {{toplu-giris}}\'s **most valuable ' +
              'feature**. Successful rows are never repeated.' },
    ],

    zorunlu:['Source file','Transfer method','Field mapping'],
    opsiyonel:['Conversion rules','Fixed values','Translation tables'],

    hatalar:[
      { mesaj:'Account/vendor says "not found" but it\'s in the system', sebep:'Missing **leading-zero padding** — Excel dropped the leading zeros.', cozum:'Pad it via {{donusum-kurali}}; keep the source column in **text** format.' },
      { mesaj:'Date error', sebep:'A format mismatch.', cozum:'SAP\'s internal format is `YYYYMMDD`.' },
      { mesaj:'Amounts are off by a factor of 100', sebep:'The decimal separator — `1.234,56` got mixed up with `1,234.56`.', cozum:'**The amount reconciliation catches this**; a count reconciliation doesn\'t.' },
      { mesaj:'The load got stuck on an unknown screen', sebep:'A conditional screen — the recording never followed that path.', cozum:'Take the recording again with **the most complex row**.' },
      { mesaj:'The BAPI said "successful" but there\'s no record', sebep:'`BAPI_TRANSACTION_COMMIT` wasn\'t called.', cozum:'The commit is added. BAPI\'s **most commonly skipped rule**.' },
      { mesaj:'"Payment terms does not exist"', sebep:'The legacy system\'s code isn\'t defined in SAP.', cozum:'Either it\'s defined in SAP or mapped via a **translation table**. A data cleansing task.' },
      { mesaj:'The vendor was opened but can\'t be posted to', sebep:'{{LFB1}} (company code data) wasn\'t loaded.', cozum:'**It\'s a separate load step.** The `AKONT` reconciliation account is mandatory.' },
      { mesaj:'The project isn\'t in the test system', sebep:'An LSMW project isn\'t transported with {{tasima-istegi}}.', cozum:'LSMW\'s own **export/import** menu.' },
    ],

    ipuclari:[
      '**First manually open a record** — see the mandatory fields all at once.',
      'Take the sample recording with **the most complex row**.',
      'Method order: standard object → {{bapi}} → {{kayit-recording}}.',
      'Leading-zero padding and date format — **the two most common** conversion errors.',
      'Keep source columns in Excel in **text** format so leading zeros aren\'t lost.',
      'Trial first with **10–20 rows**; the first error list **is the data cleansing work plan**.',
      '{{sayi-mutabakati}}: **count and amount**. If the count matches but the amount doesn\'t, it\'s a conversion error.',
      'On opening balances, **the clearing account must be zeroed** — the single strongest check.',
      'Define a **separate {{belge-turu}}** for migration entries so they can be told apart later.',
      '**Export** the project; it doesn\'t travel with a transport request.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'LFA1', ne:'Vendor general data — **step 1**' },
      { tablo:'LFB1', ne:'Company code data — **a separate load**' },
      { tablo:'BKPF', ne:'Opening documents — with a separate `BLART`' },
      { tablo:'BSIK', ne:'Transferred open items' },
    ],

    commit:
      'Commit behavior **changes by transfer method**, and this difference decides ' +
      'what happens after a failure:\n\n' +
      '**{{toplu-giris}}** — each transaction runs in its **own LUW**. ' +
      'If one row crashes, the others aren\'t affected; the failed row **stays in the session**.\n\n' +
      '**{{bapi}}** — the commit **must be called explicitly**. ' +
      'Without `BAPI_TRANSACTION_COMMIT`, the record **isn\'t written**, and ' +
      'the BAPI still returns *"successful"*.\n\n' +
      '**{{idoc}}** — each IDoc is a separate LUW; its status is kept in a table and ' +
      'it can be reprocessed with {{BD87}}.\n\n' +
      '**Practical result:** re-runnability **comes ready-made** with batch input; ' +
      'in a BAPI-based program, **you have to build it**.',

    belgeNo:
      '**A separate {{belge-turu}} and number range are defined for migration documents.**\n\n' +
      'The reason is auditability: when someone asks years later *"where did this balance ' +
      'come from?"*, it should be answerable by filtering on {{BKPF}}.`BLART`.\n\n' +
      'Also, the `XBLNR` (reference) field is written with the **legacy system\'s document ' +
      'number** — that\'s the bridge between the two systems, and it\'s used in reconciliation.\n\n' +
      '**{{guncelleme-hatasi}} applies here too:** a number can be assigned without a ' +
      'document being created. It goes unnoticed in a bulk load — that\'s why ' +
      '{{sayi-mutabakati}} is mandatory.',

    postingLogic:
      'The load order follows a **dependency chain**, and if this order is broken, ' +
      'the load fails:\n\n' +
      '**1. Configuration** — chart of accounts, document types, payment terms, tax ' +
      'codes. If missing, master data **can\'t be loaded**.\n' +
      '**2. Master data — general** ({{LFA1}}, {{KNA1}}, {{SKA1}})\n' +
      '**3. Master data — company code** ({{LFB1}}, {{KNB1}}, {{SKB1}}) — **a separate step**\n' +
      '**4. Fixed asset master data** (`AS91` legacy asset takeover)\n' +
      '**5. Opening balances** — G/L in bulk, vendor/customer **one at a time**\n' +
      '**6. Reconciliation** — is the clearing account **zero**?\n\n' +
      '**The most commonly skipped: step 3.** The vendor is opened in {{LFA1}}, {{LFB1}} ' +
      'isn\'t loaded, and *"can\'t post to the vendor"* shows up. The reason: no `AKONT` ' +
      'reconciliation account.',

    belgeTuru:
      'A **dedicated document type** is defined for migration (e.g. `ZE` — *legacy system ' +
      'takeover*).\n\n' +
      'Benefits:\n' +
      '• Migration entries can be **filtered** via {{BKPF}}.`BLART`\n' +
      '• A separate number range — **no mixing**\n' +
      '• Can be controlled separately in authorizations (`F_BKPF_BLA`)\n' +
      '• The document type **can be closed** after the migration\n\n' +
      'The last point matters: if posting authority for that document type is removed ' +
      'after migration, **an accidental migration entry** can\'t be posted.',

    numberRange:
      'A range is defined for the migration document type via {{FBN1}}. The range must ' +
      'cover the **migration year** — opening entries are usually posted to the ' +
      '**last day of the prior year**.\n\n' +
      'So for a 2028 go-live, the opening document is dated **12/31/2027** and needs a ' +
      'number range belonging to **fiscal year 2027**.\n\n' +
      'This is a detail that\'s often overlooked in migration planning.',

    accountDetermination:
      'The master data load doesn\'t **trigger** account determination — but the ' +
      'fields it **populates** get used afterward.\n\n' +
      'The most critical one is {{LFB1}}.`AKONT`, the **reconciliation account**: every ' +
      'posting to the vendor reflects into this account.\n\n' +
      'If loaded incorrectly, **every vendor posting** goes to the wrong account — and ' +
      'this is a very hard error to fix afterward: even if the reconciliation account is ' +
      'changed, **past entries** stay on the old account.\n\n' +
      'That\'s why the `AKONT` field is one of the few that **must be manually verified** before the load.',

    tur:
      'The four transfer methods LSMW supports, and **their fragility order**:\n\n' +
      '**Standard object** — the sturdiest, maintained by SAP\n' +
      '**{{bapi}}** — sturdy, screen-independent\n' +
      '**{{idoc}}** — sturdy but heavy to set up\n' +
      '**{{kayit-recording}}** — the most fragile, screen-dependent\n\n' +
      'Going down the list, **fragility increases**, but so does **flexibility**: ' +
      'recording works on custom (`Z*`) transactions, the others don\'t.',

    transport:
      '**An LSMW project isn\'t transported** with {{tasima-istegi}}. It has its own ' +
      '**export/import** mechanism.\n\n' +
      'This is the point new consultants are most often surprised by: the project is ' +
      'built in development, a transport request is searched for, and **it can\'t be found**.\n\n' +
      'The right way: from the LSMW menu, **export** → a file → **import** in the target system.\n\n' +
      'Also, **the source data file itself isn\'t transported** either — it\'s placed ' +
      'separately, either on the target system\'s application server ({{AL11}}) or on a local disk.',

    img:[
      { yol:'LSMW → Export / Import', not:'A transport request **isn\'t used**' },
      { yol:'OBA7 → A dedicated document type for migration', not:'So it can be filtered on later' },
      { yol:'FBN1 → The migration document type\'s number range', not:'Must cover the **prior fiscal year**' },
      { yol:'OB52 → The migration period', not:'Open during the load, then **closed**' },
    ],

    ekstra:[
      { ic:'🎯', baslik:'Why "manually open a record first"? — the arithmetic of the order', metin:
        'This is the topic\'s most practical piece of advice, and the reason is **numerical**.\n\n' +
        '---\n\n' +
        '**The wrong order — starting from the file:**\n\n' +
        'Map the file → run it → *"field X is mandatory"* → fix it → ' +
        'run it → *"field Y is mandatory"* → fix it → run it → …\n\n' +
        'Each round shows **one missing field**. 5 missing fields = **5 rounds**. ' +
        'Every round means mapping + running + reading the error.\n\n' +
        '**The right order — starting from SAP:**\n\n' +
        'Open a vendor manually with {{XK01}} → see the mandatory fields **all at once** → ' +
        'compare against the source file → resolve the gaps **in bulk** → map → run.\n\n' +
        '**1 round.**\n\n' +
        '---\n\n' +
        '**General principle:** error messages come **serially** (one at a time), while ' +
        'a screen gives information **in parallel** (all of it at once).\n\n' +
        'Trying to learn from a serial source when a parallel one is available is ' +
        '**needlessly slow**.\n\n' +
        'The same principle held in {{konu:error-handling}}: reading the **long text** ' +
        'of a message is faster than trial and error.' },

      { ic:'📉', baslik:'LSMW\'s real status — should it still be learned?', metin:
        'The honest answer: **LSMW is no longer the first choice.**\n\n' +
        'In S/4HANA, it was replaced by **Migration Cockpit** ({{LTMC}}), and SAP recommends ' +
        'it on new projects (see {{konu:migration}}).\n\n' +
        'LSMW also has a known limitation on S/4HANA: the **screen recording** method ' +
        'doesn\'t work reliably on newer transactions like {{BP}} — the screen flow is too complex.\n\n' +
        '---\n\n' +
        '**So why is it still learned?**\n\n' +
        '**1. It\'s alive in existing systems.** Thousands of companies running on ECC ' +
        'have LSMW projects that **are still running** and being maintained.\n\n' +
        '**2. The concepts carry over.** {{alan-esleme}}, {{donusum-kurali}}, a trial run, ' +
        '{{sayi-mutabakati}} — these are **tool-independent**. Migration Cockpit uses the ' +
        'same concepts, just with a different interface.\n\n' +
        '**3. For some objects, it\'s still the only way.** Custom data with **no standard ' +
        'object** in Migration Cockpit still needs LSMW or a custom program.\n\n' +
        '**The right view:** think of LSMW not as a **tool** but as a **lesson that ' +
        'teaches the concept set** of data migration. The tool changes, the concepts stay.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Data migration\'s most expensive mistake: starting late', metin:
        'Data cleansing is a **data problem**, not a tool problem — but it stays ' +
        '**invisible** until the tool is run.\n\n' +
        'That\'s why the most expensive mistake isn\'t technical, it\'s a **timing** ' +
        'mistake: planning to run the load *"once the data is ready."*\n\n' +
        'Data never becomes ready on its own. What\'s missing is told by the **first trial run**.\n\n' +
        '---\n\n' +
        '**The right approach:** set up and run LSMW not once the data is ready, but ' +
        '**while the data is being prepared**.\n\n' +
        'The first trial, with 50 rows, is done **very early** in the project. The ' +
        'resulting error list becomes the data cleansing team\'s **work plan**.\n\n' +
        'This is using a tool as a **diagnostic tool** — not a loading tool — and it\'s ' +
        'usually the biggest value LSMW brings to a project.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'LSMW **continues to work** in S/4HANA but is **not the recommended tool**. ' +
      'It has been replaced by **Migration Cockpit** ({{LTMC}}). ' +
      'The recording method is also **unreliable** on newer transactions like {{BP}}.',

    eccFarklari:[
      { konu:'LSMW\'s status', ecc:'The standard tool', s4:'**Works but not recommended**' },
      { konu:'Recommended tool', ecc:'LSMW', s4:'**Migration Cockpit** ({{LTMC}})' },
      { konu:'{{kayit-recording}}', ecc:'Widely used', s4:'**Unreliable** on transactions like {{BP}}' },
      { konu:'Vendor/customer loading', ecc:'{{XK01}} / {{XD01}} recording', s4:'**{{BP}}** — a Migration Cockpit object is used' },
      { konu:'Template', ecc:'You define your own', s4:'A **ready-made XML/Excel template** is downloaded' },
      { konu:'Mapping', ecc:'Manual, in step 6', s4:'Template columns are **pre-mapped**' },
      { konu:'Validation', ecc:'During the load', s4:'A simulation **before** the load' },
      { konu:'Concepts', ecc:'Mapping, conversion, reconciliation', s4:'**The same** — the tool changed, not the concepts' },
    ],

    universalJournal:
      'The {{evrensel-kayit-defteri}} **simplified** data migration: balances that used to ' +
      'be transferred **separately** for FI, CO, and assets in ECC now go into a single ' +
      'structure, {{ACDOCA}}, in S/4HANA.\n\n' +
      'Reconciliation also **got easier**: because a mismatch between FI and CO is ' +
      '**structurally impossible**, only **one** reconciliation is needed after migration ' +
      '(see {{konu:error-handling}} — the eliminated error class).\n\n' +
      'But the rule for transferring {{acik-kalem}}s **hasn\'t changed**: vendor and ' +
      'customer items must still be transferred **one at a time**.',

    kalkanTcodes:[
      { eski:'{{LSMW}} (on new projects)', yeni:'**{{LTMC}}**', not:'Migration Cockpit — ready-made objects and templates' },
      { eski:'{{SHDB}} recording (for {{BP}})', yeni:'A Migration Cockpit object', not:'The BP screen flow is **too complex** for recording' },
      { eski:'—', yeni:'{{LTMOM}}', not:'The customization tool when the standard object isn\'t enough' },
      { eski:'{{LSMW}} (existing projects)', yeni:'**Still there**', not:'Not removed; can still be maintained' },
    ],

    fiori:[
      { ad:'Migrate Your Data', aciklama:'Migration Cockpit\'s Fiori app — ' +
             'in S/4HANA Cloud this is **the only way**.' },
      { ad:'Migration Object Modeler', aciklama:'{{LTMOM}} — adding fields and writing rules ' +
             'when the standard object isn\'t enough.' },
      { ad:'Template download', aciklama:'A **ready-made Excel template** for every object; ' +
             'the columns are **pre-mapped** to SAP fields — step 6 largely disappears.' },
    ],

    compatibilityViews:[
      '{{BSIK}} / {{BSID}} are now **views** — ' +
      'they can\'t be **written to** directly. Open items are created through document posting.',
      'An old LSMW project trying to write to the index tables **won\'t work**.',
      '{{ACDOCA}} is the target table but **isn\'t written to directly** — ' +
      'it goes through document posting (see {{konu:sap-tables}}).',
    ],

    performans:
      'Migration Cockpit is **faster** than LSMW: it\'s optimized for bulk processing ' +
      'and doesn\'t run a screen flow.\n\n' +
      'In LSMW, the {{kayit-recording}} method is **the slowest** — the entire screen ' +
      'flow is processed for every row.\n\n' +
      'For large datasets (when {{bapi}} or a standard object can\'t be used), the load ' +
      'is **split into chunks** and run as parallel sessions. But parallel sessions can ' +
      'create {{kilitleme}} conflicts — chunks touching the **same** master data record ' +
      'must be kept separate.',

    bestPractices:[
      '**Use {{LTMC}} instead of LSMW** on a new S/4HANA project.',
      'Don\'t try to **convert** existing LSMW projects — leave them alone if they work; ' +
      'use Cockpit for new objects.',
      'Don\'t use **recording** for {{BP}} (vendor/customer) — ' +
      'use the Migration Cockpit object.',
      'Learn the concepts independently of the tool: {{alan-esleme}}, {{donusum-kurali}}, ' +
      'a trial run, {{sayi-mutabakati}} — **all of them exist in Cockpit too**.',
      'Use a **separate {{belge-turu}}** for migration documents — whatever the tool.',
      'Use the **clearing-account-must-be-zero check** — whatever the tool.',
      'After the load, **close** the migration period in {{OB52}}.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'"We loaded 12,000 vendors" — but 1,847 of them can\'t be paid',
    hikaye:
      '**Anadolu Machinery Inc.** went live. The cutover happened over the weekend; ' +
      'Monday morning the system opened.\n\n' +
      'The data migration team gave their report: ' +
      '*"12,000 vendors, 8,400 open items loaded. Reconciliation is done, ' +
      'the clearing account is zero."*\n\n' +
      '---\n\n' +
      'The first {{F110}} payment run was executed **on Thursday**.\n\n' +
      'The proposal list came back: **6,553 items** to be paid.\n\n' +
      'But the number of open items was **8,400**. ' +
      '**1,847 items had never entered the proposal** — and no error had been raised.',
    veriler:[
      { k:'Vendors loaded', v:'12,000' },
      { k:'Open items loaded', v:'**8,400**' },
      { k:'Clearing account', v:'**Zero** ✓ — reconciliation done' },
      { k:'{{F110}} proposal', v:'6,553 items' },
      { k:'Not in the proposal', v:'**1,847 items**' },
      { k:'Error message', v:'**None**' },
    ],

    adimlar:[
      { baslik:'Was the reconciliation actually right?', tcode:'FBL1N',
        aciklama:'First, confirming that the load itself was correct.',
        girdi:[
          { alan:'Open item count', deger:'**8,400** ✓' },
          { alan:'Total amount', deger:'**Matches** the source file ✓' },
          { alan:'Clearing account 399', deger:'Balance **zero** ✓' },
          { alan:'Conclusion', deger:'The load is **complete** — the problem is elsewhere' },
        ],
        not:'**The reconciliation really was correct.**\n\n' +
             'The count matched, the amount matched, the clearing account zeroed out. ' +
             'The data migration team was right.\n\n' +
             'But reconciliation answers *"were the items loaded?"* — not ' +
             '*"are the items **usable**?"*\n\n' +
             'That distinction is the whole scenario.' },

      { baslik:'Why didn\'t F110 pick some of them up?', tcode:'F110',
        aciklama:'Reading the proposal log.',
        girdi:[
          { alan:'{{SLG1}} proposal log', deger:'1,847 items *"no payment method"*' },
          { alan:'Check', deger:'{{LFB1}}.`ZWELS` field → **blank**' },
          { alan:'On the others', deger:'`ZWELS` = `T` (transfer) **filled**' },
          { alan:'Difference', deger:'Which vendors have it blank?' },
        ],
        not:'**{{F110}} didn\'t raise an error because this wasn\'t an error.**\n\n' +
             'An item with no payment method **isn\'t taken into the proposal** — from ' +
             'the program\'s point of view, this is **correct behavior**.\n\n' +
             'The user, on the other hand, saw the message *"6,553 items proposed"* and ' +
             '**treated it as normal**. They didn\'t compare it against 8,400.\n\n' +
             'This is the **② silent error** class from {{konu:error-handling}}: ' +
             'the result is short, and there\'s no message.' },

      { baslik:'Which vendors are missing it? — a common pattern', tcode:'SE16N',
        aciklama:'Examining the vendors of the 1,847 items.',
        girdi:[
          { alan:'Table', deger:'{{LFB1}} · rows where `ZWELS` is blank' },
          { alan:'Result', deger:'**2,310 vendors**' },
          { alan:'Common point', deger:'All were coded **"cash payment"** in the legacy system' },
          { alan:'Mapping', deger:'The legacy `NK` code had **no counterpart** in SAP — it was left blank' },
        ],
        not:'**The root cause was found, and it was a {{donusum-kurali}} decision.**\n\n' +
             'In the legacy system there were vendors with payment method `NK` (cash). ' +
             'SAP had **no payment method defined** as a counterpart for this code.\n\n' +
             'During mapping, the decision was: *"if there\'s no counterpart, leave it blank."*\n\n' +
             '**This decision produced a correct result from a loading standpoint** — ' +
             'vendors were opened, items were loaded, the reconciliation held.\n\n' +
             'But **from a usability standpoint**, it left the vendors unable to be paid.' },

      { baslik:'Why didn\'t it show up in the trial run?', tcode:'LSMW',
        aciklama:'Examining why the test process didn\'t catch it.',
        girdi:[
          { alan:'Trial set', deger:'50 vendors — chosen **at random**' },
          { alan:'Coded `NK` among them', deger:'**2**' },
          { alan:'Trial result', deger:'50/50 **successful** — a blank field doesn\'t raise an error' },
          { alan:'What was missed', deger:'A **non-mandatory** field being left blank' },
        ],
        not:'**The trial run tested "can it be loaded?", not "is it usable?"**\n\n' +
             '`ZWELS` is **not a mandatory field** — it can be blank and the vendor opens ' +
             'without issue. The load is counted as successful.\n\n' +
             'The problem only shows up when {{F110}} is run — that is, **weeks later**, ' +
             'at the first payment run.\n\n' +
             'Also, the trial set had been chosen **at random**; there were 2 vendors ' +
             'coded `NK`, and since both **loaded without issue**, they went unnoticed.' },

      { baslik:'The fix — a mass update', tcode:'LSMW',
        aciklama:'Filling in the missing field afterward.',
        girdi:[
          { alan:'① Decision', deger:'`NK` → to be mapped as SAP\'s **`T` (transfer)**' },
          { alan:'② Method', deger:'An {{LSMW}} change project — {{FK02}} recording' },
          { alan:'③ Scope', deger:'The `ZWELS` field of 2,310 vendors was **updated**' },
          { alan:'④ Verification', deger:'{{F110}} rerun → **8,400 items** in the proposal ✓' },
          { alan:'⑤ Delay', deger:'**4 business days** of payment delay' },
        ],
        fis:{ baslik:'One of the items finally payable', belgeTuru:'KZ', tarih:'12.01.2028',
          satirlar:[
            { hesap:'320', ad:'Trade payables (clearing)', borc:47500, not:'{{BSIK}} → {{BSAK}}' },
            { hesap:'102', ad:'Banks', alacak:47500 },
          ], not:'A completely normal posting — the problem **wasn\'t in accounting**.\n\n' +
                 'The data had been loaded **completely**; only one field was blank, and ' +
                 'that field **was blocking the process**.\n\n' +
                 'The cost was 4 business days of payment delay and explanatory ' +
                 'conversations with vendors.' },
        tabloEtkisi:[
          { tablo:'LFB1', ne:'The `ZWELS` field of 2,310 vendors was filled in' },
          { tablo:'BSIK', ne:'Unchanged — the items were already correct' },
        ],
        not:'**The fix was a "data update" project**, not a new load.\n\n' +
             'A separate LSMW project was set up with an {{FK02}} (change) recording. ' +
             'This shows LSMW is used not only for the **initial load** but also for ' +
             '**mass updates**.' },

      { baslik:'Permanent measures', tcode:'LSMW',
        aciklama:'Four measures — scope, sample selection, control, and decision logging.',
        girdi:[
          { alan:'① Reconciliation scope', deger:'**"Is it usable?"** was added alongside *"was it loaded?"*' },
          { alan:'② Trial set', deger:'No longer random — **at least one example from every distinct value**' },
          { alan:'③ Blank field report', deger:'A fill-rate check, after the load, on fields that are **critical but not mandatory**' },
          { alan:'④ Decision log', deger:'Every *"no counterpart, leave it blank"* decision is now **written down** and **approved**' },
        ],
        not:'**The second and fourth measures are the most valuable.**\n\n' +
             '**The trial set must not be chosen randomly.** Source data is chosen by ' +
             '**scanning** for at least one example of every distinct value: every payment ' +
             'method, every country, every account group.\n\n' +
             '50 random rows **don\'t represent the diversity** of a 12,000-row set.\n\n' +
             '---\n\n' +
             '**The fourth measure targets the actual root cause.**\n\n' +
             'The *"no counterpart, leave it blank"* decision made during mapping was ' +
             'technically reasonable and **no one objected** — because the person making ' +
             'the decision didn\'t know the payment process.\n\n' +
             'From now on, such decisions will be **written down** and approved by the ' +
             '**owner** of the relevant process.' },
    ],

    sonuc:
      '**The reconciliation was complete, the data was intact — and 1,847 items couldn\'t be paid.**\n\n' +
      '**Five critical lessons:**\n\n' +
      '**1. Reconciliation answers "was it loaded?", not "is it usable?"** The count ' +
      'matched, the amount matched, the clearing account zeroed out — all correct. But ' +
      'because one field was blank, **the process didn\'t work**. A **usability check** ' +
      'should be added to reconciliation: after the load, measure how filled in critical ' +
      'but **non-mandatory** fields are.\n\n' +
      '**2. A non-mandatory field doesn\'t mean an unneeded field.** `ZWELS` can be blank ' +
      'and the vendor opens without issue — so the load was counted **successful**. But ' +
      '{{F110}} **treats that field as mandatory**. SAP\'s definition of "mandatory" ' +
      'belongs to **the moment of entry**; **process-level requirements** need separate consideration.\n\n' +
      '**3. A trial set isn\'t chosen at random.** 50 random rows **don\'t represent** ' +
      'the diversity of 12,000 rows. The set is chosen by **scanning** for at least one ' +
      'example of every distinct value — every payment method, every country, every ' +
      'account group.\n\n' +
      '**4. Mapping decisions require process knowledge.** The *"no counterpart, leave it ' +
      'blank"* decision was technically reasonable. But the person who made it **didn\'t ' +
      'know the payment process**. Such decisions should be written down and approved by ' +
      '**the process owner**.\n\n' +
      '**5. The silent-error class is the same in data migration too.** {{F110}} didn\'t ' +
      'raise an error because this **wasn\'t an error** — an item with no payment method ' +
      'isn\'t taken into the proposal, and that\'s the correct behavior. The user ' +
      '**treated** the *"6,553 items proposed"* message **as normal**. The rule from ' +
      '{{konu:error-handling}} applies here too: **if the result count isn\'t compared ' +
      'against the expected count, a shortfall doesn\'t show.**',
  },

  },
});
