/* ==========================================================================
   content/fi-en/data-upload.js — English body for "Data Upload"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'data-upload',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Data upload is the job of transferring into SAP, in bulk, more records than could reasonably be ' +
      '**entered by hand**. {{konu:lsmw}} is a **tool** that does this; this topic compares the ' +
      '**four methods underneath it**.\n\n' +
      '---\n\n' +
      '**This topic\'s thesis:**\n\n' +
      '**Choosing a method is not a speed decision, it is an *error-handling* decision.**\n\n' +
      'A new consultant asks: *"Which one is faster?"*\n' +
      'An experienced consultant asks: **"What happens if 14 out of 500 records fail?"**\n\n' +
      'Because **some always fail**. Data quality is never perfect.\n\n' +
      'The real question is:\n\n' +
      '• Can I **see** the ones that failed?\n' +
      '• Can I fix them and **rerun**?\n' +
      '• When I rerun, are the successful ones **repeated**?\n\n' +
      '**The four methods answer these three questions differently** — ' +
      'and the choice is made accordingly.',

    neden:
      '**Scale.** Opening 12,000 vendors by hand takes weeks, and human error is ' +
      '**unavoidable**.\n\n' +
      '**Repeatability.** A migration rehearsal is run multiple times; ' +
      'the same result is needed every time.\n\n' +
      '**Auditability.** There must be an answer to *"where did these 12,000 records come from?"*\n\n' +
      '**Continuity.** Some uploads aren\'t one-off: a monthly bank statement, ' +
      'a daily price list, a permanent interface.\n\n' +
      'The last point **directly affects** method choice: ' +
      'a one-time load and a permanent interface call for **different tools**.',

    sirketOnemi:
      'Upload errors are expensive because they are **silent**.\n\n' +
      '500 records are sent, the screen says *"processing complete,"* ' +
      '**486 are created**. 14 disappear silently.\n\n' +
      'Because nobody counts, nobody notices.\n\n' +
      '---\n\n' +
      '**That\'s why this topic has one non-negotiable rule:**\n\n' +
      '**{{sayi-mutabakati}} — sent = created.**\n\n' +
      'And it\'s done at two levels:\n\n' +
      '**Count** — number of source lines = number of documents\n' +
      '**Amount** — source total = system total\n\n' +
      'The second is stronger: **if the count matches but the amount doesn\'t**, ' +
      'there\'s a {{donusum-kurali}} error (decimal separator, currency, unit).\n\n' +
      'This rule is the **shared mandatory step** in {{konu:error-handling}}, {{konu:lsmw}}, ' +
      'and {{konu:migration}} — for the same reason in all three.',

    gercekHayat:
      'User: *"I have a 3,000-line Excel file, can you get it into the system?"*\n\n' +
      'Inexperienced answer: *"Sure, we\'ll do it with {{toplu-giris}}."*\n\n' +
      '---\n\n' +
      'The experienced answer starts with **three questions**:\n\n' +
      '**1. Is this a one-off, or will it repeat?**\n' +
      'One-off → {{toplu-giris}} is enough.\n' +
      'Every month → a **program** should be written, not LSMW.\n' +
      'Continuous/automatic → {{idoc}} or an interface.\n\n' +
      '**2. Which transaction? Does it have a BAPI?**\n' +
      'If yes, {{bapi}}; if not, {{kayit-recording}}.\n\n' +
      '**3. What happens to the failed rows?**\n' +
      'This question is **the most critical one** and is usually never asked.\n\n' +
      '---\n\n' +
      'The answer to the third question determines the method:\n\n' +
      '**{{toplu-giris}}** → failed rows **wait in the session**, ' +
      'get corrected, and are reprocessed. ✓ **Comes ready-made.**\n\n' +
      '**{{bapi}}** → you have to **engineer** rerunnability yourself. ' +
      'If you don\'t, a second run produces **duplicate records**.\n\n' +
      '**{{idoc}}** → every message keeps its own status, ' +
      'reprocessed **one by one** with {{BD87}}. ✓ **Best traceability.**',

    muhasebeMantigi:
      'The upload method **does not change** the accounting entry — a posting entered manually ' +
      'with {{FB50}} and one uploaded in bulk are **identical**.\n\n' +
      'But two accounting risks are **directly tied** to the method:\n\n' +
      '---\n\n' +
      '**Risk 1 — Duplicate posting.**\n\n' +
      'An upload gets interrupted midway and is rerun from the start. ' +
      'The lines that succeeded in the first pass are written **a second time**.\n\n' +
      'In accounting this means a **double posting**: the balance doubles, ' +
      'the trial balance breaks, and fixing it needs {{FB08}}.\n\n' +
      '**{{toplu-giris}} structurally prevents this** — ' +
      'it only repeats unprocessed lines. In a program written with ' +
      '{{bapi}}, **you have to prevent it yourself**.\n\n' +
      '---\n\n' +
      '**Risk 2 — A half-finished upload.**\n\n' +
      'While a multi-line document (header + items) is being uploaded, ' +
      'half gets written and half doesn\'t.\n\n' +
      '**Accounting has no equivalent of this:** ' +
      'a document either forms completely or not at all. ' +
      'A half document is an **unbalanced document**, and SAP doesn\'t allow it.\n\n' +
      'That\'s why multi-line uploads must preserve a **document-level LUW**: ' +
      'each document in its own transaction, all of it or none of it.',

    kavramlar: ['toplu-giris', 'bapi', 'idoc', 'sayi-mutabakati',
                'guncelleme-hatasi', 'kilitleme', 'arayuz-tablosu'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The upload process has **five steps**, and the last one is the most often skipped. ' +
      'The sequence is designed so the error gets caught **where it\'s cheapest**.',

    roller:[
      { rol:'User', gorev:'Prepares the source data (Excel / CSV).' },
      { rol:'Consultant', gorev:'Asks **the three questions**: one-off or not · is there a BAPI · **what happens to the failures?**' },
      { rol:'Consultant', gorev:'Chooses the method: {{toplu-giris}} · {{bapi}} · {{idoc}} · standard object' },
      { rol:'Consultant', gorev:'Runs a **trial** with a small set.' },
      { rol:'Consultant', gorev:'Full load — **broken into batches** where possible.' },
      { rol:'Consultant', gorev:'{{sayi-mutabakati}} — **count and amount**.' },
      { rol:'Consultant', gorev:'{{SM13}} check — any {{guncelleme-hatasi}}?' },
      { rol:'Consultant', gorev:'Fixes the failed rows and **reprocesses**.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Data upload — five steps, two checks',
      adimlar:[
        { ic:'📊', rol:'User', baslik:'Source data is prepared',
          aciklama:'Excel or CSV. Codes that look numeric ' +
                   '(account, vendor number) are kept in **text** format.',
          cikti:'Source file', ok:'method is chosen' },
        { ic:'❓', rol:'Consultant', baslik:'Three questions — these determine the method',
          aciklama:'**1.** Is it one-off, or will it repeat?\n' +
                   '**2.** Is there a {{bapi}}?\n' +
                   '**3.** **What happens to the failed rows?**\n\n' +
                   'The third is the most critical and most often skipped question.',
          cikti:'Method decision', ok:'is set up' },
        { ic:'🔧', rol:'Consultant', baslik:'The method is set up',
          aciklama:'{{toplu-giris}} → {{SHDB}} + {{LSMW}}\n' +
                   '{{bapi}} → a program or LSMW\n' +
                   '{{idoc}} → {{WE20}} partner profile + message type',
          cikti:'Upload mechanism', ok:'is trialed' },
        { ic:'🧪', rol:'Consultant', baslik:'A trial with a small set',
          aciklama:'10–50 rows. The set is **not random** — it\'s chosen by ' +
                   '**scanning** so it includes an example of every distinct value.\n\n' +
                   'The first error list = the **data-cleanup work plan**.',
          cikti:'Error list', ok:'fix and repeat' },
        { ic:'▶', rol:'Consultant', baslik:'Full load — broken into batches',
          aciklama:'Large sets are split. If run in parallel, ' +
                   'batches touching the same master data must be **kept apart** — ' +
                   'otherwise a {{kilitleme}} conflict.',
          cikti:'Uploaded data', ok:'IS COUNTED' },
        { ic:'🔢', rol:'Check 1', baslik:'{{sayi-mutabakati}} — never skipped',
          aciklama:'**Count:** rows sent = documents created\n' +
                   '**Amount:** source total = system total\n\n' +
                   'If the count matches but **the amount doesn\'t** → a {{donusum-kurali}} error ' +
                   '(decimal separator, currency, unit).',
          cikti:'Numeric validation', ok:'look for silent losses' },
        { ic:'🔇', rol:'Check 2', baslik:'{{SM13}} — silent losses',
          aciklama:'{{guncelleme-hatasi}}: a number was assigned, the document was **not written**. ' +
                   'The screen says *"saved."*\n\n' +
                   'In a bulk upload it goes **completely unnoticed** — ' +
                   'which is why it\'s a separate check.',
          cikti:'Loss list', ok:'fix' },
        { ic:'♻️', rol:'Consultant', baslik:'Fix the failures and reprocess',
          aciklama:'{{toplu-giris}} → they **wait** in the {{SM35}} session\n' +
                   '{{idoc}} → one by one with {{BD87}}\n' +
                   '{{bapi}} → **depends on what you built**',
          cikti:'Full load' },
      ],
    },

    adimlar:[
      { rol:'User', eylem:'Prepares the source data', sistem:'Excel / CSV — codes are **text**' },
      { rol:'Consultant', eylem:'Asks the three questions', sistem:'One-off? · BAPI? · **failures?**' },
      { rol:'Consultant', eylem:'Sets up the method', sistem:'{{SHDB}} / {{LSMW}} / {{WE20}}' },
      { rol:'Consultant', eylem:'Trials with a small set', sistem:'10–50 rows chosen by **scanning**' },
      { rol:'Consultant', eylem:'Runs the full load', sistem:'Broken into batches' },
      { rol:'Consultant', eylem:'Reconciles', sistem:'Count **and** amount' },
      { rol:'Consultant', eylem:'Looks for silent losses', sistem:'{{SM13}}' },
      { rol:'Consultant', eylem:'Reprocesses the failures', sistem:'{{SM35}} / {{BD87}}' },
    ],

    veriAkisi:{
      nereden:'Excel / CSV / a message from an external system.',
      nereye:'SAP master data or transaction tables.',
      tetikleyen:'A manual run or a scheduled job ({{SM37}}).',
      sonraki:'{{sayi-mutabakati}} → {{SM13}} check → reprocessing the failures.',
    },

    notlar:[
      { tip:'warn', baslik:'"What happens to the failed rows?" — the question that determines the method', metin:
        'Method comparisons are usually made on **speed**. That\'s the wrong axis — ' +
        'because a speed difference is a one-time cost, while **error handling shows up on every run**.\n\n' +
        '---\n\n' +
        '**Three methods, three different answers:**\n\n' +
        '**{{toplu-giris}}** ✓ Failed rows **wait** in the {{SM35}} session. ' +
        'The cause gets fixed, the session is **reprocessed**, and the successful ones are ' +
        '**not repeated**. Rerunnability **comes ready-made**.\n\n' +
        '**{{bapi}}** Whatever the program does, that\'s what happens. ' +
        'If you don\'t write the failures down somewhere, they **are lost**. ' +
        'Rerun from scratch and the successful ones become **duplicates**.\n\n' +
        '**{{idoc}}** ✓ Every message keeps **its own status**. ' +
        'Failures **stay** in the system and are reprocessed one by one with {{BD87}}. ' +
        '**Best traceability.**\n\n' +
        '---\n\n' +
        '**Bottom line:** BAPI is technically the cleanest method ' +
        '(fast, screen-independent, validations run) — ' +
        'but **it doesn\'t bring rerunnability for free**.\n\n' +
        'If you\'re going to write a program with BAPI, the ' +
        '**{{arayuz-tablosu}} pattern** must be engineered in from the start (see the technical section).' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The upload method doesn\'t change the accounting **entry** — but it does determine ' +
      '**what accounting looks like after an error**.\n\n' +
      'The three postings below show three different outcomes of the same upload.',

    etkilenenHesaplar:[
      { hesap:'Uploaded accounts', tur:'Variable', neden:'A normal posting — **independent** of the method.' },
      { hesap:'Duplicate posting', tur:'Risk', neden:'Written **twice** if the rerun isn\'t protected.' },
      { hesap:'Missing posting', tur:'Risk', neden:'{{guncelleme-hatasi}} — disappears silently.' },
      { hesap:'Migration / offset account', tur:'Control', neden:'Its balance must **zero out**.' },
    ],

    fisler:[
      { baslik:'① A correct upload — one of 500 rows',
        belgeTuru:'SA', tarih:'15.01.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:24500 },
          { hesap:'399', ad:'Migration / offset account', alacak:24500 },
        ],
        not:'A normal posting. There\'s no telling it was bulk-uploaded — ' +
             'it would look **identical** if entered manually with {{FB50}}.\n\n' +
             'The only difference is in the {{BKPF}}.`TCODE` field: it holds the transaction code ' +
             'the upload tool used, and migration postings can be ' +
             '**filtered** by this field.\n\n' +
             'That\'s why a **separate {{belge-turu}}** is usually also defined for migration ' +
             '(see {{konu:lsmw}}).' },

      { baslik:'② A duplicate posting — with no rerun protection',
        belgeTuru:'SA', tarih:'15.01.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense (1st pass)', borc:24500 },
          { hesap:'770', ad:'General administrative expense (2nd pass — **duplicate**)', borc:24500 },
          { hesap:'399', ad:'Migration account', alacak:49000 },
        ],
        not:'**The program was interrupted midway and rerun from the start.** ' +
             'The rows that succeeded on the first pass were written **a second time**.\n\n' +
             'Result: the expense is **doubled**, the trial balance is wrong, ' +
             'and fixing it needs around 500 {{FB08}} reversals.\n\n' +
             '---\n\n' +
             '**This is the accounting consequence of the method choice:**\n\n' +
             'With {{toplu-giris}} this would have been **impossible** — the session only repeats ' +
             'unprocessed rows.\n\n' +
             'In a program written with {{bapi}}, the protection **had to be engineered in**: ' +
             'a "processed" stamp in the {{arayuz-tablosu}}, or ' +
             'a duplicate check against the source reference ({{BKPF}}.`XBLNR`).' },

      { baslik:'③ A missing posting — {{guncelleme-hatasi}}',
        belgeTuru:'SA', tarih:'15.01.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — **486 rows**', borc:11907000 },
          { hesap:'399', ad:'Migration account', alacak:11907000 },
        ],
        not:'**500 rows were sent, 486 were created. 14 vanished silently.**\n\n' +
             'The screen said *"processing complete,"* no error message appeared.\n\n' +
             'From an accounting standpoint the document is **balanced** — nothing looks wrong. ' +
             'The gap only surfaces when compared against the source file.\n\n' +
             '---\n\n' +
             '**Two checks catch this:**\n\n' +
             '**{{sayi-mutabakati}}** — 500 ≠ 486\n' +
             '**{{SM13}}** — 14 update-error records\n\n' +
             'If neither is done, the gap goes **unnoticed** and ' +
             'the migration account never zeroes out either — but nobody sees that unless they look.' },
    ],

    tHesaplar:[
      { hesap:'Migration account — three scenarios', kod:'399',
        borc:[{ ad:'Expected offset', tutar:12250000 }],
        alacak:[{ ad:'Actual (486 rows)', tutar:11907000 }],
        not:'**A 343,000 gap** = 14 missing rows. Not zero → the upload is incomplete' },
    ],

    notlar:[
      { tip:'warn', baslik:'LUW integrity in a multi-line document', metin:
        'For single-line postings, every row is independent. ' +
        'For **multi-line documents** (header + items) the situation is different.\n\n' +
        '**Accounting has no such thing as a half document:** ' +
        'a document either forms completely or not at all. ' +
        'A half document is an **unbalanced document**, and SAP doesn\'t allow it.\n\n' +
        'That\'s why an upload must be engineered **at the document level**:\n\n' +
        '**Right:** each document in its own transaction — a 3-line invoice, ' +
        'a single {{bapi}} call, a single commit.\n\n' +
        '**Wrong:** each row in a separate transaction — ' +
        'the header is written, the second item crashes, and the document is **left half-formed**.\n\n' +
        '---\n\n' +
        'The practical consequence affects **the source-file design**: ' +
        'for multi-line data, the file needs a **document-key** column ' +
        'and the load must **group** by that key.\n\n' +
        'In {{konu:lsmw}}, this is set up in the source-structure definition as a ' +
        '**header–item relationship**.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'There are four methods, and each answers a **different question** well. ' +
      'There\'s no answer to *"which is best?"*; there is one to ' +
      '*"which one, in which situation?"*\n\n' +
      '---\n\n' +
      '**Decide with three questions:**\n\n' +
      '**1. One-off or continuous?**\n' +
      'One-off → {{toplu-giris}} or {{bapi}}\n' +
      'Continuous/automatic → **{{idoc}}**\n\n' +
      '**2. Is there a standard object or BAPI?**\n' +
      'If yes → **use it**\n' +
      'If not → {{kayit-recording}}\n\n' +
      '**3. What happens to the failed rows?**\n' +
      'If a ready-made solution is wanted → **{{toplu-giris}}** or **{{idoc}}**\n' +
      'If BAPI will be chosen → **the {{arayuz-tablosu}} pattern must be engineered in**',

    liste:[
      { ad:'Method · {{toplu-giris}} (Batch Input / BDC)',
        aciklama:'Playing back the screen flow **driven by a program**. ' +
                 'Whatever the user would do, the system does the same.',
        neZaman:'When there\'s no standard object or BAPI; for custom (`Z*`) transactions.',
        ornek:'**Its biggest advantage: rerunnability comes for free.**\n\n' +
              'Failed rows **wait** in the {{SM35}} session; ' +
              'once the cause is fixed, they\'re **reprocessed** and ' +
              'successful rows are **not repeated**.\n\n' +
              'Also, **every screen validation runs** — ' +
              'data integrity is preserved as strictly as on the screen.\n\n' +
              '**Drawbacks:**\n' +
              '• **Slow** — the entire screen flow is processed for every row\n' +
              '• **Fragile** — breaks if the screen changes\n' +
              '• Conditional screens are a **trap** (see {{konu:lsmw}})',
        tcodes:['SHDB','SM35'] },

      { ad:'Method · {{bapi}}',
        aciklama:'A **screen-independent** function call into the business object.',
        neZaman:'If a BAPI exists and a program will be written, the **first choice**.',
        ornek:'**Advantages:**\n\n' +
              '• **Fast** — no screen flow\n' +
              '• **Unaffected** by screen changes\n' +
              '• **Business validations run** — data integrity is preserved\n' +
              '• The error message is **structured** (the return table) — easy to diagnose\n\n' +
              '**Two critical traps:**\n\n' +
              '**1.** If `BAPI_TRANSACTION_COMMIT` isn\'t called, the record **isn\'t written** — ' +
              'and the BAPI still returns *"success."*\n\n' +
              '**2.** **Rerunnability doesn\'t come for free.** ' +
              'Storing the failures and preventing duplicates is **your job** — ' +
              '{{arayuz-tablosu}} pattern is needed.',
        tcodes:['SE37'] },

      { ad:'Method · {{idoc}}',
        aciklama:'Message-based transfer. Every message carries **its own status**.',
        neZaman:'For **continuous** data flow and external-system integration.',
        ornek:'**Best traceability.** Every IDoc:\n' +
              '• Keeps its **own status** ({{WE02}})\n' +
              '• **Stores** the error reason\n' +
              '• Can be reprocessed **one by one** with {{BD87}}\n' +
              '• Can be archived — an **audit trail** remains\n\n' +
              '**Drawback: a heavy setup.** ' +
              'A partner profile ({{WE20}}), message type, and port definition are needed.\n\n' +
              '**Too heavy** for a one-time 3,000-row load; ' +
              'but the **right tool** for an interface that runs every night.\n\n' +
              '**Most common error:** without a partner profile, the IDoc is rejected ' +
              'with **status 56** — *"the IDoc arrived but wasn\'t processed."*',
        tcodes:['WE02','WE20','BD87'] },

      { ad:'Method · Standard Object / Migration Cockpit',
        aciklama:'Transfer objects SAP has already defined.',
        neZaman:'**Whenever one exists** — especially in S/4HANA.',
        ornek:'**Advantage:** **SAP maintains it**. The field list is ready-made, ' +
              'validations run, and it doesn\'t break across version upgrades.\n\n' +
              'In S/4HANA it comes with the **Migration Cockpit** ({{LTMC}}): ' +
              'a pre-mapped **Excel template** and a ' +
              '**pre-load simulation**.\n\n' +
              'The simulation is a meaningful difference: with the other methods ' +
              'you see the error **during the load**, ' +
              'here you see it **beforehand** (see {{konu:migration}}).',
        tcodes:['LTMC'] },

      /* --- Source data --- */
      { ad:'Source · Excel and CSV — three classic traps',
        aciklama:'Errors that come from the file format, **independent of the upload method**.',
        neZaman:'On every upload.',
        ornek:'**1. Leading zeros.** Excel treats `0000320100` as a number and turns it into ' +
              '`320100`. The load then says *"account not found."*\n' +
              '→ Keep the column in **text** format.\n\n' +
              '**2. Decimal separator.** `1.234,56` gets confused with `1,234.56`. ' +
              'Amounts end up wrong by a factor of **1,000**.\n' +
              '→ **Amount reconciliation catches this**, count reconciliation doesn\'t.\n\n' +
              '**3. Date format.** SAP\'s internal format is `YYYYMMDD`.\n\n' +
              '**Bonus:** invisible spaces and line-break characters in Excel ' +
              'overflow the field length.\n\n' +
              '**General precaution:** produce the source as **CSV instead of Excel** ' +
              'and **eyeball it** in a text editor.' },

      { ad:'Pattern · {{arayuz-tablosu}} — mandatory for BAPI',
        aciklama:'Loading the data into a **staging table** first, instead of writing it directly.',
        neZaman:'In **every** case where a program will be written with {{bapi}}.',
        ornek:'**Why it\'s needed:** BAPI **doesn\'t bring** rerunnability. ' +
              'A staging table is the practical way of saying "you engineer this yourself."\n\n' +
              '**The pattern has three steps:**\n\n' +
              '**1.** The source data is written to the staging table — in its raw form\n' +
              '**2.** The program reads from the staging table, calls the BAPI, ' +
              'and **stamps the result row by row** (success / failure + message)\n' +
              '**3.** On a rerun, **only unstamped** rows are processed\n\n' +
              '**What it buys you:**\n' +
              '• Duplicate postings **become impossible**\n' +
              '• Failed rows and their reasons are **kept**\n' +
              '• {{sayi-mutabakati}} can be done **from the table**\n' +
              '• An audit trail remains\n\n' +
              'This pattern is **hand-building**, for BAPI, ' +
              'what {{toplu-giris}} gives you for free.' },
    ],

    karsilastirmaBasliklar:['{{toplu-giris}}', '{{bapi}}', '{{idoc}}'],
    karsilastirma:[
      ['Speed', 'Slow — screen flow', '**Fast**', 'Medium'],
      ['Screen changes', '**Breaks**', 'Unaffected', 'Unaffected'],
      ['Validations', 'Screen validations', '**Business logic**', 'Business logic'],
      ['Error message', 'In screen language', '**Structured**', 'Status + text'],
      ['Failed rows', '**Wait in the session**', '**Your own design**', 'Stay in the system'],
      ['Rerun', '**Comes ready-made**', '{{arayuz-tablosu}} needed', '{{BD87}}'],
      ['Duplicate risk', 'None', '**Present** — if unprotected', 'None'],
      ['Setup effort', 'Medium', 'Writing a program', '**Heavy** — {{WE20}}'],
      ['Audit trail', 'Session (can be deleted)', 'Depends on your design', '**Best**'],
      ['Best fit', 'One-off · no BAPI', 'A program · high volume', '**A continuous interface**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'SM35', ad:'Batch input queue — failures wait here',
        amac:'Runs and monitors sessions, and **keeps the failed rows**.',
        neZaman:'After every {{toplu-giris}} load.',
        adimlar:[
          { baslik:'Select the session' },
          { baslik:'First pass in **display** mode',
            aciklama:'Followed screen by screen; you **see** where it gets stuck.' },
          { baslik:'Later passes in the background' },
          { baslik:'Open the **erroneous** session — the remaining rows are there' },
          { baslik:'Fix the cause and **reprocess**',
            aciklama:'Successful rows are **not repeated**.' },
        ],
        ekranAkisi:[
          { ekran:'Session', islem:'3,000 rows · status **Erroneous**' },
          { ekran:'Detail', islem:'2,847 processed · **153 failed**' },
          { ekran:'Error', islem:'*"Cost center 4711 does not exist"*' },
          { ekran:'Resolution', islem:'Opened with {{KS01}} → 153 rows **reprocessed** ✓' },
        ],
        alanlar:{ zorunlu:['Session name'], opsiyonel:['Status','User','Date'] },
        hatalar:[
          { mesaj:'Session shows "erroneous" — did the rows get lost?', sebep:'Some rows couldn\'t be processed.', cozum:'**They aren\'t lost.** They wait in the session; fix the cause and reprocess.' },
          { mesaj:'Will reprocessing create duplicates?', sebep:'A concern.', cozum:'No — {{toplu-giris}} only repeats **unprocessed** rows.' },
          { mesaj:'The session disappeared', sebep:'Successful sessions are **deleted**, depending on a setting.', cozum:'Retention should be turned on for migration projects — for the **audit trail**.' },
          { mesaj:'Session is stuck "processing"', sebep:'The job running it has crashed.', cozum:'Check the job status in {{SM37}}; Basis clears the lock.' },
        ],
        ipucu:'**{{toplu-giris}}\'s most valuable trait: failed rows don\'t get lost.**\n\n' +
              'This is a **real advantage** over a program written with {{bapi}}, ' +
              'where you have to **hand-build** the same behavior with the ' +
              '{{arayuz-tablosu}} pattern.\n\n' +
              'But it isn\'t enough by itself: a {{guncelleme-hatasi}} ' +
              '**may not show up as an error** in the session. ' +
              'That\'s why {{SM13}} and {{sayi-mutabakati}} are done **separately**.',
        ilgili:['SHDB','SM13','LSMW'] },

      { kod:'SM13', ad:'Update errors — where silent losses live',
        amac:'Shows records that were assigned a number but **never became a document**.',
        neZaman:'**After every bulk upload** — a mandatory step.',
        adimlar:[
          { baslik:'Filter by user, date, and status **Err**' },
          { baslik:'Double-click the record — module and error message' },
          { baslik:'Read the root cause',
            aciklama:'Usually a {{kilitleme}} conflict, a field overflow, or a custom-code bug.' },
          { baslik:'How many rows were affected — **measure the scope**' },
        ],
        ekranAkisi:[
          { ekran:'Load', islem:'500 rows sent · screen says *"complete"*' },
          { ekran:'Reconciliation', islem:'**486** documents in {{BKPF}} — 14 short' },
          { ekran:'{{SM13}}', islem:'Status **Err** · **14 records**' },
          { ekran:'Cause', islem:'A lock conflict — parallel sessions touched the same vendor' },
        ],
        alanlar:{ zorunlu:['User','Date'], opsiyonel:['Status','Client'] },
        hatalar:[
          { mesaj:'{{SM13}} looks empty', sebep:'The retention period has expired, or the date range is too narrow.', cozum:'Widen the range. If it\'s too old there may be no trace left — **that\'s why you check right away**.' },
          { mesaj:'There are gaps in the numbers', sebep:'The number is assigned at the dialog step, written at the update step.', cozum:'Normal, but it must be **explainable**. {{SM13}} records are the evidence behind these gaps.' },
        ],
        ipucu:'**This step is mandatory for a bulk upload** because ' +
              '{{guncelleme-hatasi}} is **rare for a single posting, common in a bulk upload**.\n\n' +
              'The reason: a bulk upload spawns a large number of parallel update tasks, and ' +
              'the chance of a {{kilitleme}} conflict **rises**.\n\n' +
              'And the user **can\'t tell**: the screen shows a success message, ' +
              'the document doesn\'t exist. In a 500-record load with 14 lost, the only evidence is ' +
              '{{sayi-mutabakati}} and this screen.',
        ilgili:['SM35','SM21','SM12'] },

      { kod:'WE02', ad:'IDoc list — status-based monitoring',
        amac:'Lists inbound and outbound IDocs with their statuses.',
        neZaman:'For {{idoc}}-based interfaces; a **daily** check.',
        adimlar:[
          { baslik:'Filter by date, message type, and **direction**' },
          { baslik:'Group by status',
            aciklama:'**Inbound:** 53 successful · **51 error** · **56 no partner profile**\n' +
                     '**Outbound:** 03 sent · 02 error' },
          { baslik:'Double-click the failed IDoc — the segment and message appear' },
          { baslik:'The cause is fixed → **reprocessed** with {{BD87}}' },
        ],
        ekranAkisi:[
          { ekran:'Complaint', islem:'*"The file arrived last night but there\'s no record"*' },
          { ekran:'{{WE02}}', islem:'340 IDocs · **312 status 53** ✓ · **28 status 51** ' },
          { ekran:'Error', islem:'*"Tax code K1 does not exist"*' },
          { ekran:'Resolution', islem:'Defined in {{FTXP}} → {{BD87}} → 28 IDocs **reprocessed** ✓' },
        ],
        alanlar:{ zorunlu:['Date'], opsiyonel:['Message type','Status','Partner','Direction'] },
        hatalar:[
          { mesaj:'The IDoc arrived but wasn\'t processed — **status 56**', sebep:'No partner profile.', cozum:'Define the partner and message type in {{WE20}}. **The most common IDoc error.**' },
          { mesaj:'Status 51 — application error', sebep:'A data error: missing master data, an invalid code.', cozum:'Fix the cause and reprocess with {{BD87}}. **The IDoc isn\'t lost.**' },
          { mesaj:'Status 64 — waiting to be processed', sebep:'The background job hasn\'t run.', cozum:'Check the job in {{SM37}}; trigger it manually with {{BD87}}.' },
        ],
        ipucu:'**IDoc\'s biggest advantage: no message is ever lost.**\n\n' +
              'A failed IDoc **stays** in the system, **carries** its status and error reason, ' +
              'and can be reprocessed one by one with {{BD87}}.\n\n' +
              'This is a real advantage over {{bapi}} in continuous interfaces: ' +
              'in an interface written with BAPI, **you have to store** the failed message yourself.\n\n' +
              'The price is setup overhead — **too heavy** for a one-time load.',
        ilgili:['WE20','BD87','SM37'] },

      { kod:'SE37', ad:'BAPI testing — this is where the commit trap shows up',
        amac:'Tests the function module with a **single record**.',
        neZaman:'Before writing a program with BAPI; to understand the field structure.',
        adimlar:[
          { baslik:'Enter the BAPI name, **Test/Execute**' },
          { baslik:'Fill in the input structures' },
          { baslik:'Run it and read the **`RETURN` table**',
            aciklama:'Type `E` error · `W` warning · `S` success.' },
          { baslik:'**Call `BAPI_TRANSACTION_COMMIT` as well**',
            aciklama:'Otherwise the record **isn\'t written** — and the BAPI still returns *"success."*' },
        ],
        ekranAkisi:[
          { ekran:'Test', islem:'The BAPI ran · `RETURN` **empty** · a document number **came back**' },
          { ekran:'Check', islem:'{{FB03}} → **no document**' },
          { ekran:'Cause', islem:'`BAPI_TRANSACTION_COMMIT` was never called' },
          { ekran:'Lesson', islem:'*"Returned success"* ≠ *"the record was written"*' },
        ],
        alanlar:{ zorunlu:['Function module name'], opsiyonel:['Input structures','Table parameters'] },
        hatalar:[
          { mesaj:'BAPI is successful but there\'s no record', sebep:'The commit wasn\'t called.', cozum:'Add `BAPI_TRANSACTION_COMMIT`. **BAPI\'s most commonly skipped rule.**' },
          { mesaj:'Type-E messages in the `RETURN` table', sebep:'A business validation failed.', cozum:'The message is **meaningful** — easier to diagnose than a screen error. This is BAPI\'s advantage.' },
          { mesaj:'Mandatory-field error', sebep:'The input structure is incomplete.', cozum:'Check the BAPI documentation; usually an "X" structure decides which fields count as filled.' },
        ],
        ipucu:'**The commit trap is BAPI\'s most expensive surprise** ' +
              'because it\'s **silent**: the BAPI returns success, hands back a document number, ' +
              'and **nothing is in the database**.\n\n' +
              'In a bulk upload it goes unnoticed — the whole run looks *"successful"* ' +
              'and **not a single record is created**.\n\n' +
              'This is the clearest example of why {{sayi-mutabakati}} is mandatory: ' +
              'without reconciliation, this error is ' +
              '**never noticed**.',
        ilgili:['WE02','SM13'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Three groups of tables matter in an upload: the **target** (where the data goes), ' +
      '**tracking** (what happened), and the **staging table** (in the BAPI pattern).',

    liste:[
      { ad:'BKPF', baslik:'Where reconciliation is counted from',
        tutar:'Document headers — **the number of documents created is counted from here**.',
        olusturan:'The upload',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'Items in {{BSEG}} / {{ACDOCA}}.',
        s4:'Items live in {{ACDOCA}}.',
        alanlar:[
          { ad:'TCODE', aciklama:'The upload tool\'s transaction — **migration postings can be filtered** by this' },
          { ad:'BLART', aciklama:'If a separate {{belge-turu}} was defined, it\'s distinguished from here' },
          { ad:'XBLNR', aciklama:'The **source reference** — used for duplicate checking' },
          { ad:'CPUDT', aciklama:'Entry date — the day of the upload' },
        ] },

      { ad:'EDIDC', baslik:'IDoc control record — where the status is kept',
        tutar:'Every IDoc\'s header and **status**.',
        olusturan:'IDoc receipt or generation',
        anahtar:'DOCNUM',
        iliskiler:'Data segments in `EDID4`; status history in `EDIDS`.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'DOCNUM', aciklama:'IDoc number', tip:'pk' },
          { ad:'STATUS', aciklama:'**Status** — 53 successful · 51 error · **56 no partner profile**' },
          { ad:'MESTYP', aciklama:'Message type' },
          { ad:'SNDPRN / RCVPRN', aciklama:'Sender / receiver partner — must match {{WE20}}' },
        ] },

      { ad:'BALHDR', baslik:'Upload log',
        tutar:'Log headers produced by mass-processing programs.',
        olusturan:'Upload programs that write a log',
        anahtar:'LOGNUMBER',
        iliskiler:'{{SLG1}} reads this table.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'PROBCLASS', aciklama:'The highest message class — **is there a red one?**' },
          { ad:'ALDATE / ALUSER', aciklama:'When, and by whom' },
        ] },

      { ad:'LFA1', baslik:'A typical target — master data',
        tutar:'Vendor general data.',
        olusturan:'A master-data load',
        anahtar:'LIFNR',
        iliskiler:'Company-code data lives in {{LFB1}} — a **separate load**.',
        s4:'Managed through {{BP}}.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Vendor number — internal or external numbering?' },
          { ad:'ERDAT', aciklama:'Creation date — used in the **upload count**' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Upload tracking — three independent sources of evidence',
      varliklar:[
        { ad:'BKPF', rol:'Result', hub:true, aciklama:'**Documents created** — reconciliation starts here',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'TCODE' }, { ad:'XBLNR' }] },
        { ad:'BALHDR', rol:'Log', aciklama:'What the program **said**',
          alanlar:[{ ad:'LOGNUMBER', tip:'pk' }, { ad:'PROBCLASS' }] },
        { ad:'EDIDC', rol:'IDoc', aciklama:'Message **status** — never lost',
          alanlar:[{ ad:'DOCNUM', tip:'pk' }, { ad:'STATUS' }, { ad:'MESTYP' }] },
        { ad:'LFA1', rol:'Master data', aciklama:'A typical target table',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'ERDAT' }] },
      ],
      iliskiler:[
        { from:'BALHDR', to:'BKPF', alanlar:'—', not:'the program → **the documents it produced**' },
        { from:'EDIDC', to:'BKPF', alanlar:'—', not:'IDoc → document' },
        { from:'BKPF', to:'LFA1', alanlar:'—', not:'master data must be loaded **first**' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'After an upload, **three screens** are checked and each says **something different**: ' +
      '{{SM35}} (the session), {{SM13}} (silent losses), {{SLG1}} (the program log).',

    ekranlar:[
      { ad:'{{SM35}} — the session and failed rows',
        aciklama:'After a {{toplu-giris}} load.',
        alanlar:[
          { ad:'Run mode', zorunlu:true, aciklama:'The first pass is in **display** mode.' },
          { ad:'Status', zorunlu:false, aciklama:'Rows left in an **erroneous** session wait there.' },
          { ad:'Reprocess', zorunlu:false, aciklama:'Successful ones are **not repeated**.' },
        ],
        ipucu:'Failed rows waiting is this method\'s ' +
              '**most valuable trait** — but it **doesn\'t show** a {{guncelleme-hatasi}}.' },

      { ad:'{{SM13}} — silent losses',
        aciklama:'A **mandatory** check for a bulk upload.',
        alanlar:[
          { ad:'Status **Err**', zorunlu:true, aciklama:'A number was assigned, the document was **not written**.' },
          { ad:'User and date', zorunlu:true, aciklama:'The upload window.' },
        ],
        ipucu:'**Rare for a single posting, common in a bulk upload** — ' +
              'parallel update tasks create a {{kilitleme}} conflict.\n\n' +
              'The user can\'t tell: the screen shows success, the document doesn\'t exist.' },

      { ad:'{{SLG1}} — what the program said',
        aciklama:'The upload program\'s row-level log.',
        alanlar:[
          { ad:'Object / sub-object', zorunlu:true, aciklama:'Which program\'s log.' },
          { ad:'Message class', zorunlu:false, aciklama:'Check **red** first.' },
        ],
        ipucu:'{{SM37}} answers *"did the program crash?"*, {{SLG1}} answers *"was the job done correctly?"* ' +
              '(see {{konu:error-handling}}).' },
    ],

    zorunlu:['Source data','Method choice','{{sayi-mutabakati}}'],
    opsiyonel:['Splitting into batches','Running in parallel','{{arayuz-tablosu}}'],

    hatalar:[
      { mesaj:'The screen said "complete" but the record count is short', sebep:'A {{guncelleme-hatasi}}.', cozum:'{{sayi-mutabakati}} + {{SM13}}. **A mandatory step for a bulk upload.**' },
      { mesaj:'BAPI returned success, no document', sebep:'`BAPI_TRANSACTION_COMMIT` wasn\'t called.', cozum:'Add the commit. Since it\'s silent, it **goes unnoticed without reconciliation**.' },
      { mesaj:'The same record was created twice', sebep:'The program was rerun with no protection.', cozum:'The {{arayuz-tablosu}} pattern, or a duplicate check via `XBLNR`. {{toplu-giris}} **doesn\'t have this problem**.' },
      { mesaj:'Amounts are off by a factor of 1,000', sebep:'The decimal separator got mixed up.', cozum:'**Amount reconciliation** catches this; count reconciliation doesn\'t.' },
      { mesaj:'The IDoc arrived but wasn\'t processed — status **56**', sebep:'No partner profile.', cozum:'{{WE20}}. **The most common IDoc error.**' },
      { mesaj:'IDoc status 51 — application error', sebep:'A data error.', cozum:'Fix the cause and reprocess with {{BD87}}. The IDoc **isn\'t lost**.' },
      { mesaj:'Lock errors in a parallel load', sebep:'{{kilitleme}} — two sessions touching the same master data.', cozum:'Split the batches so they **don\'t touch the same object**.' },
      { mesaj:'The document formed half-way', sebep:'Row-level processing — no LUW integrity.', cozum:'For a multi-line document, process **at the document level**: all of it or none of it.' },
      { mesaj:'Account/vendor not found', sebep:'Leading zero-padding — Excel dropped the zeros.', cozum:'Keep the column in **text** format ({{konu:lsmw}}).' },
    ],

    ipuclari:[
      '**Three questions:** one-off or not · is there a BAPI · **what happens to the failed rows?**',
      '{{sayi-mutabakati}} is **two-level**: count **and** amount. ' +
      'If the count matches but the amount doesn\'t, it\'s a {{donusum-kurali}} error.',
      'After a bulk upload, **{{SM13}} is mandatory** — silent losses live there.',
      'If you\'re writing a program with BAPI, **engineer the {{arayuz-tablosu}} pattern in from the start**.',
      'For a multi-line document, process **at the document level** — there\'s no such thing as a half document.',
      'Choose the trial set by **scanning** — one example of every distinct value.',
      'Split parallel batches so they **don\'t touch the same master data**.',
      '**Produce the source as CSV** instead of Excel and eyeball it in a text editor.',
      'For a continuous interface, {{idoc}} — heavy to set up but **no message is ever lost**.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Documents created — **reconciliation is counted from here**' },
      { tablo:'EDIDC', ne:'IDoc status — never lost' },
      { tablo:'BALHDR', ne:'Program log' },
      { tablo:'LFA1', ne:'A typical master-data target' },
    ],

    commit:
      '**Commit behavior is the most important technical difference between the methods**, ' +
      'and it **directly determines** what happens after an error:\n\n' +
      '**{{toplu-giris}}** — each transaction in **its own LUW**. ' +
      'If one row crashes, the others are unaffected; ' +
      'the failed row **stays in the session** and can be reprocessed.\n\n' +
      '**{{bapi}}** — the commit is **called explicitly**. ' +
      'Without `BAPI_TRANSACTION_COMMIT` the record **isn\'t written** ' +
      'and the BAPI still returns *"success."* ' +
      'When to commit is **the program\'s decision**: ' +
      'on every record, every 100 records, or at the end?\n\n' +
      '**{{idoc}}** — each IDoc is its own LUW; status is kept **in a table**.\n\n' +
      '---\n\n' +
      '**Commit frequency is a trade-off decision:**\n\n' +
      '**Commit on every record** → slow but **safe**; an error affects a single record\n' +
      '**Bulk commit (every 1,000)** → fast, but **a crash loses 1,000 records**\n\n' +
      'Data migrations generally **favor safety** — ' +
      'for a job that runs once, speed is secondary.',

    belgeNo:
      '**The number is assigned at the dialog step, written at the update task.**\n\n' +
      'This split is the basis of {{guncelleme-hatasi}} and has three consequences:\n\n' +
      '• If the update crashes, the number **burns** — no document ends up at that number\n' +
      '• A **gap** forms in the number range (normal, but it must be explainable)\n' +
      '• The user **sees the success message** — the document doesn\'t exist\n\n' +
      '**This risk rises in a bulk upload** because a large number of parallel ' +
      'update tasks run and the chance of a {{kilitleme}} conflict goes up.\n\n' +
      'This is the **technical justification** for {{sayi-mutabakati}}.',

    postingLogic:
      'In a bulk upload, checks run **separately for every row** — ' +
      'in the same order as manual entry:\n\n' +
      '**1.** Authorization · **2.** {{alan-durumu}} · **3.** Master data · ' +
      '**4.** Period · **5.** {{konu:dogrulama-ikame}} · **6.** Balance check · ' +
      '**7.** Account determination · **8.** Number assignment · **9.** **Update (asynchronous)**\n\n' +
      '**Two important consequences:**\n\n' +
      '**Validation rules also run in a bulk upload.** ' +
      'If a {{konu:dogrulama-ikame}} rule blocks manual entry, ' +
      'it blocks the bulk upload too.\n\n' +
      '**Exception:** if the {{GGB4}} activity level is ' +
      '**2**, the rule runs *"except for batch input"* — ' +
      'meaning the upload **bypasses the rule**. ' +
      'This can be used deliberately during data migration, but ' +
      '**left in place permanently it\'s an open door**.',

    belgeTuru:
      'Defining a **separate {{belge-turu}}** for uploads ' +
      'is recommended (see {{konu:lsmw}}).\n\n' +
      'The benefit: bulk-loaded records can be **filtered** through {{BKPF}}.`BLART` ' +
      'and **controlled separately**, if needed, with the `F_BKPF_BLA` authorization.\n\n' +
      'Also, the **source-record key** is written into the `XBLNR` (reference) field — ' +
      'this is the most practical way to check for duplicates: ' +
      'before loading, check whether that reference already exists.',

    numberRange:
      'A bulk upload **quickly exhausts** the number range. ' +
      '{{FBN1}} is used to check that the range **is sufficient**.\n\n' +
      'When the range fills up, the load stops **in the middle** and ' +
      'leaves a half-loaded set — ' +
      'this is the moment where rerunnability **matters most**.\n\n' +
      'Also, for year-based ranges, the **target fiscal year** must be checked: ' +
      'migration postings are usually assigned to the **prior year**.',

    accountDetermination:
      'Account determination in a bulk upload works **normally** — ' +
      'but an error arrives with a **multiplier effect**.\n\n' +
      'If a tax code\'s {{OB40}} assignment is missing, in manual entry ' +
      '**one user** gets an error. In a bulk upload, ' +
      '**every row** using that tax code fails.\n\n' +
      'That\'s why a trial run must include **every distinct value**: ' +
      'every tax code, every account group, every payment method. ' +
      'A random 50 rows **doesn\'t guarantee** this ' +
      '(see the {{konu:lsmw}} scenario).',

    tur:
      'A technical summary of the four methods:\n\n' +
      '**{{toplu-giris}}** — **plays back** the screen flow. ' +
      'Screen validations run, slow, screen-dependent, ' +
      '**rerunnability ready-made**.\n\n' +
      '**{{bapi}}** — a function call. ' +
      'Fast, screen-independent, the error message is **structured**, ' +
      '**commit and rerun are your job**.\n\n' +
      '**{{idoc}}** — a message. ' +
      'Status in a table, **no message is ever lost**, heavy setup.\n\n' +
      '**Standard object** — SAP\'s ready-made tool. ' +
      'SAP maintains it, and S/4HANA offers **simulation**.',

    transport:
      'Upload programs transport with a normal {{tasima-istegi}}.\n\n' +
      '**But three things don\'t transport:**\n\n' +
      '**1. The LSMW project** — it has its own export/import mechanism.\n' +
      '**2. The source data file** — placed separately on the target system\'s server ({{AL11}}) ' +
      'or a local disk.\n' +
      '**3. {{WE20}} partner profiles** — system-specific settings, and ' +
      'usually set up **by hand**; if IDocs get rejected after a transport ' +
      'with **status 56**, this is the first place to check.',

    img:[
      { yol:'WE20 → Partner Profiles', not:'The source of IDoc status 56; system-specific' },
      { yol:'SM35 → Batch Input → Retention Setting', not:'Sessions must be **retained** on migration projects' },
      { yol:'FBN1 → Number Range', not:'A bulk upload **quickly exhausts** the range' },
      { yol:'GGB4 → Validation Activation Level', not:'Level 2 = **except for batch input**' },
    ],

    ekstra:[
      { ic:'🗃️', baslik:'The staging table pattern — for every program written with BAPI', metin:
        'BAPI is technically the cleanest method, but it ' +
        '**doesn\'t bring rerunnability for free**. ' +
        'The {{arayuz-tablosu}} pattern fills that gap.\n\n' +
        '---\n\n' +
        '**A three-step pattern:**\n\n' +
        '**1. Load** — the source data is written to the staging table ' +
        '**in its raw form**. No validation happens at this step; ' +
        'the goal is just to **get the data into the system**.\n\n' +
        '**2. Process** — the program reads the ' +
        '**unstamped** rows from the staging table, ' +
        'calls the BAPI and **stamps the result row by row**: ' +
        'success / failure + the **error message** + the resulting document number.\n\n' +
        '**3. Repeat** — on a rerun, ' +
        'only **unstamped or failed** rows are processed.\n\n' +
        '---\n\n' +
        '**What it buys you:**\n\n' +
        '• **Duplicate postings become impossible** — a stamped row is never processed again\n' +
        '• Failed rows and **their reasons are kept** — ' +
        'can be handed to the user as a report\n' +
        '• {{sayi-mutabakati}} can be done **from the table**: ' +
        'total rows = successful + failed\n' +
        '• An **audit trail** remains — what came in, what happened\n' +
        '• Error correction can be done **in the table**; no need to reload the file\n\n' +
        '---\n\n' +
        '**This pattern is essentially hand-building, for BAPI, ' +
        'what {{toplu-giris}} gives you ready-made.**\n\n' +
        'The {{SM35}} session does exactly this: it keeps failed rows, ' +
        'stamps successful ones, and skips them on reprocessing.\n\n' +
        '**The decision:** if you want BAPI\'s speed and cleanliness, ' +
        '**engineer this pattern in from the start**; ' +
        'if you won\'t, use {{toplu-giris}}.' },

      { ic:'⚖️', baslik:'Why is "speed" the wrong axis for comparison?', metin:
        'Method comparisons are usually framed this way: ' +
        '*"BAPI is fast, batch input is slow."*\n\n' +
        'That\'s true, but it\'s **the wrong axis**.\n\n' +
        '---\n\n' +
        '**Speed is a one-time cost.** 12,000 records might take ' +
        '4 hours with {{toplu-giris}} and 20 minutes with {{bapi}}. ' +
        'The difference is 3.5 hours — and it closes **in a single night**.\n\n' +
        '**Error handling, on the other hand, shows up on every run.**\n\n' +
        'And on every run, some rows **fail** — ' +
        'data quality is never perfect.\n\n' +
        '---\n\n' +
        '**A concrete comparison:**\n\n' +
        '**Scenario:** 12,000 records, 340 fail.\n\n' +
        '**With {{toplu-giris}}:** takes 4 hours. 340 failed rows ' +
        '**wait** in the {{SM35}} session. The cause is fixed, ' +
        'the session is reprocessed. **Extra development: zero.**\n\n' +
        '**With {{bapi}} (no pattern):** takes 20 minutes. ' +
        '340 failed rows **are lost** — no way to know which ones. ' +
        'Finding out which were processed requires comparing against the source file. ' +
        'Rerunning from scratch produces **11,660 duplicate records**.\n\n' +
        '**The 3.5 hours saved are paid back with a lost day.**\n\n' +
        '**The right question isn\'t** *"which is faster?"* ' +
        '**but "what happens if 340 rows fail?"**' },
    ],

    notlar:[
      { tip:'warn', baslik:'Count reconciliation — the one mandatory rule', metin:
        'This is the topic\'s **one non-negotiable rule**:\n\n' +
        '**After every bulk upload, what was sent is compared against what was created.**\n\n' +
        '---\n\n' +
        '**It\'s done at two levels, and each catches different errors:**\n\n' +
        '**Count** — number of source rows = number of documents created ({{BKPF}})\n' +
        '→ Catches: {{guncelleme-hatasi}}, a missing commit, a skipped row\n\n' +
        '**Amount** — source debit/credit total = the total in the system\n' +
        '→ Catches: {{donusum-kurali}} errors — decimal separator, ' +
        'currency, unit, sign\n\n' +
        '**If the count matches but the amount doesn\'t** there\'s a conversion error. ' +
        'This is a class of error that a count-only check **can never see**.\n\n' +
        '---\n\n' +
        '**Why this matters so much:** most upload errors are **silent**. ' +
        'The screen says *"complete,"* no error shows in the log, ' +
        'and part of the records simply don\'t exist.\n\n' +
        'Reconciliation is the only tool that **turns this silence into a number**. ' +
        'And a number needs no interpretation: it\'s either equal or it isn\'t.\n\n' +
        'This rule is repeated in {{konu:error-handling}}, {{konu:lsmw}}, and {{konu:migration}} ' +
        '**for the same reason** in all three.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'All the methods **continue to work** in S/4HANA. ' +
      'What changed: the **Migration Cockpit** came to the forefront, ' +
      'and some target tables **turned into views** and can no longer be written to directly.',

    eccFarklari:[
      { konu:'{{toplu-giris}}', ecc:'Common', s4:'**Works**, but unreliable for transactions like {{BP}}' },
      { konu:'{{bapi}}', ecc:'Common', s4:'**Still stands** — still the cleanest programmatic route' },
      { konu:'{{idoc}}', ecc:'Common', s4:'**Still stands** — for continuous interfaces' },
      { konu:'Recommended tool', ecc:'{{LSMW}}', s4:'**Migration Cockpit** ({{LTMC}})' },
      { konu:'Target tables', ecc:'{{BSEG}}, {{BSIK}} are writable', s4:'Indexes are **views** — can\'t be written' },
      { konu:'Simulation', ecc:'None', s4:'**Pre-load** validation' },
      { konu:'Template', ecc:'You define it yourself', s4:'Ready-made, **pre-mapped** Excel' },
      { konu:'Cloud', ecc:'—', s4:'In Cloud, **only** Migration Cockpit / API' },
    ],

    universalJournal:
      'The {{evrensel-kayit-defteri}} **simplified** the upload: ' +
      'uploads that used to be thought of separately for FI, CO, and assets in ECC ' +
      'now go into {{ACDOCA}} as a single structure.\n\n' +
      '**But {{ACDOCA}} isn\'t written to directly** — ' +
      'it\'s reached through posting the document (see {{konu:sap-tables}}).\n\n' +
      'A table can be a target without being **writable**; ' +
      'this distinction is the point that causes ' +
      '**the most trouble** when carrying old upload programs forward.',

    kalkanTcodes:[
      { eski:'{{LSMW}} (on new projects)', yeni:'**{{LTMC}}**', not:'Ready-made objects + **simulation**' },
      { eski:'Writing to {{BSIK}} / {{BSID}}', yeni:'**Not possible**', not:'Turned into a view — goes through posting the document' },
      { eski:'{{XK01}} recording', yeni:'A {{BP}} object', not:'The BP screen flow is **too complex** for recording' },
      { eski:'—', yeni:'**OData / API**', not:'The programmatic upload route in S/4HANA Cloud' },
    ],

    fiori:[
      { ad:'Migrate Your Data', aciklama:'The Migration Cockpit — the **only route** in Cloud.' },
      { ad:'Template Download', aciklama:'Columns are **pre-mapped** to SAP fields; ' +
             'the mapping step is largely eliminated.' },
      { ad:'Simulation', aciklama:'Validation **before the load**. ' +
             'With the other methods you see the error during the load.' },
      { ad:'Application Jobs', aciklama:'The {{SM37}} + {{SLG1}} equivalent — on one screen.' },
    ],

    compatibilityViews:[
      '{{BSIK}}, {{BSID}}, {{BSAS}} are now **views** — **cannot be written to**.',
      'Old upload programs that try to write to these tables **don\'t work**.',
      'Open items are created **by posting the document** — the index is derived automatically.',
      '{{ACDOCA}} is the target but **isn\'t written to directly**.',
    ],

    performans:
      'HANA **sped up** bulk uploads, but the bottleneck is usually not ' +
      'the database — it\'s the **application layer**: ' +
      'the screen flow ({{toplu-giris}}) or the BAPI call.\n\n' +
      '**Running in parallel** is the most effective way to speed things up — ' +
      'the data is split into batches, and multiple sessions run at the same time.\n\n' +
      '**But the batches must be chosen carefully:** batches touching ' +
      'the same master data (the same vendor, the same account) create a {{kilitleme}} conflict, ' +
      'and that conflict shows up ' +
      '**silently** as a {{guncelleme-hatasi}}.\n\n' +
      'In other words, a badly split parallel load can produce ' +
      '**data loss** instead of a speedup.',

    bestPractices:[
      'Start a new S/4HANA project with the **Migration Cockpit** ({{LTMC}}).',
      'Use the **simulation** feature — see the error **before** you load.',
      'When carrying old upload programs forward, check **whether the target table is still writable**.',
      '**Don\'t use** recording for {{BP}} — use a Migration Cockpit object.',
      'If you\'re writing a program with BAPI, build the **{{arayuz-tablosu}} pattern** in from the start.',
      '{{sayi-mutabakati}} — **always**, whatever tool is used.',
      'Split parallel batches so they **don\'t touch the same master data**.',
      'There\'s no {{toplu-giris}} in Cloud — plan for **API / Migration Cockpit**.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'"Done in 20 minutes" — and 340 records went missing',
    hikaye:
      'It\'s year-end at **Marmara Kimya Inc.** **8,400 accounting records** taken over ' +
      'from a subsidiary need to be loaded into the parent company.\n\n' +
      'A developer wrote a {{bapi}} program. The reasoning was sound: ' +
      '*"With {{toplu-giris}} it takes 3 hours; with BAPI it\'s done in 20 minutes."*\n\n' +
      'The program ran. It finished in **18 minutes**. ' +
      'On screen: *"Processing complete."*\n\n' +
      '---\n\n' +
      'The accounting manager moved on to closing. ' +
      'The trial balance was pulled — **balanced**. Nobody looked at the migration account.\n\n' +
      '**Three days later** the subsidiary\'s reconciliation came in: ' +
      'the balances **didn\'t match**. The difference: **1,284,000 TRY**.',
    veriler:[
      { k:'Source', v:'**8,400** accounting records' },
      { k:'Method', v:'{{bapi}} — a custom program' },
      { k:'Duration', v:'18 minutes ✓' },
      { k:'Screen message', v:'*"Processing complete"*' },
      { k:'Documents created', v:'**8,060**' },
      { k:'Lost', v:'**340 records · 1,284,000 TRY**' },
      { k:'Noticed', v:'**3 days later** — via external reconciliation' },
    ],

    adimlar:[
      { baslik:'How many documents actually got created?', tcode:'SE16N',
        aciklama:'A count is being done for the first time.',
        girdi:[
          { alan:'Table', deger:'{{BKPF}} · `TCODE` = the program · the load date' },
          { alan:'Documents created', deger:'**8,060**' },
          { alan:'Source file', deger:'**8,400** rows' },
          { alan:'Difference', deger:'**340** — and **consistent** with the amount difference' },
        ],
        not:'**If this count had been done on the day of the load, ' +
             'the problem would have taken 3 minutes, not 3 days.**\n\n' +
             '{{sayi-mutabakati}} had been skipped. The ' +
             '*"processing complete"* message on screen had been treated as enough.\n\n' +
             'But that message says **the program ran**, ' +
             'it doesn\'t say **8,400 records were written**.' },

      { baslik:'Where did the 340 records go?', tcode:'SM13',
        aciklama:'Searching for a silent loss.',
        girdi:[
          { alan:'{{SM13}}', deger:'Status **Err** · the load window' },
          { alan:'Result', deger:'**340 update errors**' },
          { alan:'Error', deger:'*"Lock conflict — vendor ... is locked"*' },
          { alan:'Pattern', deger:'The errors are **concentrated on specific vendors**' },
        ],
        not:'**A {{guncelleme-hatasi}}.** A number was assigned, the document was **not written**.\n\n' +
             'The program had counted these rows as **successful** — ' +
             'the BAPI\'s `RETURN` table had come back **empty**.\n\n' +
             'Because the error occurred not at the BAPI step but at the ' +
             '**asynchronous update step**. The BAPI had done its job and returned; ' +
             'the record crashed afterward.' },

      { baslik:'Why did the lock conflict happen?', tcode:'SM37',
        aciklama:'How the program was run is being examined.',
        girdi:[
          { alan:'Run', deger:'**6 parallel jobs** — to speed things up' },
          { alan:'Split', deger:'The source file was split **by row number**' },
          { alan:'Result', deger:'The same vendor **fell into multiple batches**' },
          { alan:'Conflict', deger:'Two jobs tried to post to the same vendor at the same time' },
        ],
        not:'**The root cause was found — and it was a speed decision.**\n\n' +
             'The file had been split into six **by row number**: 1–1400, 1401–2800, …\n\n' +
             'But records belonging to the same vendor were **scattered** across the file. ' +
             'Result: two batches touched the same vendor **at the same time** and ' +
             'a {{kilitleme}} conflict occurred.\n\n' +
             '**The right split criterion isn\'t the row number, ' +
             'it\'s the object being locked** — the vendor number.' },

      { baslik:'Why didn\'t the program catch the error?', tcode:'SE37',
        aciklama:'The program\'s logic is being examined.',
        girdi:[
          { alan:'Check', deger:'The BAPI `RETURN` table is checked ✓' },
          { alan:'Missing', deger:'There\'s **no** verification **after** the commit' },
          { alan:'{{arayuz-tablosu}}', deger:'**Not used** — it reads straight from the raw file' },
          { alan:'Result', deger:'Which row was processed is **not recorded** anywhere' },
        ],
        not:'**The program had been written correctly, technically** — ' +
             'it calls the BAPI, checks `RETURN`, and commits.\n\n' +
             'But two things were missing:\n\n' +
             '**1.** There was no verification, **after the commit**, ' +
             'that the record had actually been created. A {{guncelleme-hatasi}} happens at ' +
             'this stage and **doesn\'t show up** in the `RETURN` table.\n\n' +
             '**2.** There was no {{arayuz-tablosu}}. Which row had been processed was ' +
             '**recorded nowhere** — this is why finding ' +
             'the 340 lost rows required **comparing** {{BKPF}} against the source file ' +
             '**row by row**.' },

      { baslik:'The fix — the 340 missing records', tcode:'SE16N',
        aciklama:'The lost records are found and loaded.',
        girdi:[
          { alan:'① Detection', deger:'The source was compared against {{BKPF}}.`XBLNR` → **340 rows**' },
          { alan:'② Decision', deger:'**No** rerun from scratch — that would create 8,060 duplicates' },
          { alan:'③ Load', deger:'Only the 340 rows · a **single job** (no parallelism)' },
          { alan:'④ Verification', deger:'{{BKPF}} → **8,400** ✓ · {{SM13}} → **0** ✓' },
          { alan:'⑤ Migration account', deger:'Balance **zero** ✓' },
        ],
        fis:{ baslik:'One of the records finally created', belgeTuru:'SA', tarih:'28.12.2027',
          satirlar:[
            { hesap:'320', ad:'Trade payables — balance taken over', alacak:47200 },
            { hesap:'399', ad:'Migration account', borc:47200 },
          ], not:'The posting is entirely normal — **there was no accounting problem**.\n\n' +
                 'The records had simply **never been created**, and nobody had ' +
                 '**counted** this for three days.\n\n' +
                 'Because the source reference had been written into the `XBLNR` field, ' +
                 'finding the missing rows was **possible**. Without it, ' +
                 'all 8,400 rows would have had to be compared by hand.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'340 new documents — total **8,400** ✓' },
          { tablo:'BSIK', ne:'The missing open items were created' },
        ],
        not:'**Rerunning from scratch was never an option.** ' +
             'Since the program had no duplicate protection, ' +
             'rerunning it would have produced **8,060 double postings**.\n\n' +
             'The missing 340 rows were **found by hand** and loaded through a separate file. ' +
             'Had the {{arayuz-tablosu}} pattern been in place, ' +
             'this would have been a **one-click** job.' },

      { baslik:'Lasting measures', tcode:'SM13',
        aciklama:'Five measures — counting, the pattern, splitting, verification, and the decision criterion.',
        girdi:[
          { alan:'① Mandatory step', deger:'**{{sayi-mutabakati}} + {{SM13}}** after every upload' },
          { alan:'② Pattern', deger:'**{{arayuz-tablosu}}** is mandatory in BAPI programs' },
          { alan:'③ Parallel split', deger:'**Not** by row number — by the **locked object**' },
          { alan:'④ After the commit', deger:'It is **verified** that the record was actually created' },
          { alan:'⑤ Decision criterion', deger:'In choosing a method, not *"which is faster?"* but **"what happens to the failures?"**' },
        ],
        not:'**The fifth measure covers the reason behind the other four.**\n\n' +
             'The method had been chosen because *"BAPI is faster"* — ' +
             'and that was **true**: 18 minutes vs. 3 hours.\n\n' +
             'But the question that went unasked was: ' +
             '**"what happens if 340 records fail?"**\n\n' +
             'Had {{toplu-giris}} been chosen, the 340 rows would have been ' +
             '**waiting** in the {{SM35}} session and reprocessed with one click.\n\n' +
             'The **2.5 hours** saved were paid back with **3 lost days** — ' +
             'and a loss of trust in the external reconciliation.' },
    ],

    sonuc:
      '**Done in 18 minutes, 340 records lost, surfaced 3 days later in an external reconciliation.**\n\n' +
      '**Five critical lessons:**\n\n' +
      '**1. Choosing a method is an error-handling decision, not a speed decision.** ' +
      '*"BAPI is faster"* was true — 18 minutes vs. 3 hours. ' +
      'But the question that went unasked was **"what happens if 340 records fail?"** ' +
      'Had {{toplu-giris}} been chosen, the failed rows would have been ' +
      '**waiting** in the {{SM35}} session. The 2.5 hours saved were paid back with 3 lost days.\n\n' +
      '**2. {{sayi-mutabakati}} can\'t be skipped.** ' +
      'The *"processing complete"* message on screen says **the program ran**, ' +
      'it **doesn\'t say** 8,400 records were written. ' +
      'A count done on the day of the load would have surfaced the problem in ' +
      '**3 minutes** instead of 3 days.\n\n' +
      '**3. The BAPI `RETURN` table isn\'t enough.** ' +
      'A {{guncelleme-hatasi}} doesn\'t occur at the BAPI step but at the **asynchronous update** ' +
      'step, and it **doesn\'t show up** in the `RETURN` table. ' +
      'The BAPI returns *"success,"* the record crashes afterward. ' +
      'That\'s why the {{SM13}} check is **a separate step**.\n\n' +
      '**4. The parallel-split criterion is the locked object, not the row number.** ' +
      'Splitting the file by row number put the same vendor ' +
      'into multiple batches and created a {{kilitleme}} conflict. ' +
      'A badly split parallel load produces **data loss** instead of a speedup.\n\n' +
      '**5. A BAPI program should never be written without the {{arayuz-tablosu}} pattern.** ' +
      'Because which row had been processed was recorded nowhere, ' +
      'finding the 340 lost rows required **comparing** all 8,400 rows. ' +
      'Rerunning from scratch would have produced **8,060 duplicate records**. ' +
      'With the pattern in place, this would have been **one click**.',
  },

  },
});
