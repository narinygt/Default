/* ==========================================================================
   content/fi-en/bapi.js — "BAPI (İş Nesnesi Arayüzü)"
   Same conventions as content/fi-en/sap-tables.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'bapi',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'A BAPI (Business Application Programming Interface) is a function module ' +
      'that follows a specific set of rules and has been **published** as a method ' +
      'of a **business object** ({{SWO1}} — Business Object Repository).\n\n' +
      'Three things set it apart from an ordinary function module:\n\n' +
      '**1. It is screen-independent.** It doesn\'t simulate a screen; it calls ' +
      'business logic **directly**.\n\n' +
      '**2. It stays stable across releases.** SAP commits to keeping a published ' +
      'BAPI\'s interface (parameter names, field structure) **backward compatible** — ' +
      'the screen can change, the BAPI doesn\'t.\n\n' +
      '**3. It can be called remotely.** It carries the `RFC` (Remote Function Call) ' +
      'attribute; an external system, an interface program, or an ABAP program in ' +
      'your own SAP system can all call it the same way.\n\n' +
      'The naming pattern comes from this origin: `BAPI_<OBJECT>_<METHOD>` — for ' +
      'example `BAPI_ACC_DOCUMENT_POST` is the `POST` method of the `ACC_DOCUMENT` ' +
      'business object.',

    neden:
      '**To break free of screen dependency.** {{toplu-giris}} works by replaying a ' +
      'screen sequence — if the screen gains a field or its order changes, the ' +
      'program **breaks**. A BAPI never touches the screen; it enters the same ' +
      'business logic directly.\n\n' +
      '**To survive release upgrades.** An SAP release upgrade can change screens, ' +
      'but a published BAPI\'s interface **stays fixed**. This is the single most ' +
      'critical requirement for integrations with external systems.\n\n' +
      '**For structured error reporting.** When something goes wrong, a BAPI doesn\'t ' +
      '**crash** (it doesn\'t dump); it writes the problem into the `RETURN` table as a ' +
      '**message**. The calling program reads that table and decides what to do.\n\n' +
      '**For integration with outside systems.** Thanks to the `RFC` attribute, a web ' +
      'service, a middleware layer, or another SAP system can call the same BAPI — ' +
      'over a connection defined in {{SM59}}.',

    sirketOnemi:
      'A consultant who doesn\'t understand BAPIs treats them as "a fast bulk-loading ' +
      'tool." One who does understands something else: **what makes a BAPI ' +
      'dangerous isn\'t that it\'s error-prone — it\'s that it fails silently.**\n\n' +
      'The discriminating question is this: **"what happens if ' +
      '`BAPI_TRANSACTION_COMMIT` is never called?"** The right answer: **nothing ' +
      'happens** — and that\'s exactly why it\'s dangerous. The BAPI doesn\'t return ' +
      'an error in the `RETURN` table, and it will often even hand back a document ' +
      'number. Everything on screen looks successful. But **nothing has been written ' +
      'to the database**.\n\n' +
      '{{toplu-giris}} doesn\'t carry this risk — the session log is the screen ' +
      'itself, so an interrupted run **stays visible** in the session, and nobody ' +
      'loses it. A BAPI-based program has **no such safety net**; building one is ' +
      'the developer\'s job.',

    gercekHayat:
      'A developer says: *"I tested the BAPI, it worked — I got a document ' +
      'number."*\n\n' +
      'The next day a user complains: *"None of the 40 invoices I entered yesterday ' +
      'are there."*\n\n' +
      'Diagnosis:\n\n' +
      '**1.** One of yesterday\'s document numbers is looked up in {{FB03}} → **no ' +
      'document**.\n\n' +
      '**2.** The number range ({{NRIV}}) is checked → the number **really was ' +
      'assigned**, and the next run continues from the following number.\n\n' +
      '**3.** The program\'s source code is reviewed → it contains ' +
      '`CALL FUNCTION BAPI_ACC_DOCUMENT_POST`, it never **reads** the `RETURN` table, ' +
      'and the `BAPI_TRANSACTION_COMMIT` line was **never written at all**.\n\n' +
      'During testing, the developer assumed success because "a document number came ' +
      'back." But a BAPI reserves and returns the next number even if commit is never ' +
      'called — this is the **same family** of symptom as the "number exists, ' +
      'document doesn\'t" behavior caused by {{guncelleme-hatasi}}, but the cause is ' +
      'different: there, the background write is attempted and fails; here, the ' +
      'write was **never requested** in the first place.',

    muhasebeMantigi:
      'A BAPI by itself **produces no accounting entry** — it\'s an interface, not a ' +
      'transaction.\n\n' +
      'But once `BAPI_ACC_DOCUMENT_POST` is called and made permanent with ' +
      '`BAPI_TRANSACTION_COMMIT`, the resulting entry is **identical** to one posted ' +
      'manually through {{FB50}}: the same validations run, the same account ' +
      'determination rules fire, the same tables ({{BKPF}}, {{BSEG}}, {{ACDOCA}}) get ' +
      'written.\n\n' +
      'The one accounting difference is **invisible**: {{BKPF}}\'s `TCODE` field ' +
      'carries the transaction code of the program that called the BAPI, whereas a ' +
      'manual entry carries `FB50`. This lets migration and interface postings be ' +
      '**filtered out** afterward.\n\n' +
      'The real accounting risk isn\'t that the entry is **wrong** — it\'s that the ' +
      'entry **never happens**, and this leaves no trace on screen at all. A BAPI ' +
      'call that ends without a commit is, from an accounting standpoint, a ' +
      'transaction that never took place: it shows up in no trial balance and no ' +
      'report, because it was written to no table.',

    kavramlar: ['bapi', 'toplu-giris', 'idoc', 'guncelleme-hatasi', 'badi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Using a BAPI correctly is a **six-step discipline**. The first four are about ' +
      '"send the data correctly"; the last two are about ' +
      '**"confirm what you sent was actually written"** — and most failures come ' +
      'from skipping exactly those last two.',

    roller: [
      { rol: 'Consultant / Developer', gorev: 'Finds the right BAPI — through {{BAPI}} (BAPI Explorer) or via the business object in {{SWO1}}.' },
      { rol: 'Consultant / Developer', gorev: 'Fills in the import structures and tests with a single record in {{SE37}}.' },
      { rol: 'Developer', gorev: 'Reads the `RETURN` table in the program; stops if a type `E`/`A` message is present.' },
      { rol: 'Developer', gorev: 'Calls `BAPI_TRANSACTION_COMMIT` — **the one line that must never be skipped**.' },
      { rol: 'Consultant', gorev: 'Verifies the result independently with {{FB03}} or {{SE16N}}.' },
      { rol: 'External system', gorev: 'Can call the same BAPI remotely (`RFC`) over an {{SM59}} connection.' },
    ],

    diyagram: {
      type: 'flow',
      baslik: 'A BAPI call — six steps, two checks',
      adimlar: [
        { rol: 'Developer', baslik: 'The right BAPI is found',
          aciklama: '{{BAPI}} (BAPI Explorer) shows a tree organized by business object; ' +
                    '{{SWO1}} shows a single object\'s methods.',
          cikti: 'Function module name', ok: 'import structures are filled in' },
        { rol: 'Developer', baslik: 'Import structures are filled in and tried in {{SE37}}',
          aciklama: 'First run it with **`TESTRUN` = X** to simulate — nothing gets ' +
                    'written, only the validations run.',
          cikti: 'Populated parameters', ok: 'the real call is made' },
        { rol: 'Program', baslik: 'The BAPI is called in real mode',
          aciklama: '`TESTRUN` is left blank. The BAPI runs the business rules and ' +
                    'may **return a document number** — this does **not** yet mean ' +
                    'it\'s permanent.',
          cikti: 'Document number + `RETURN` table', ok: '`RETURN` is checked' },
        { rol: 'Program', baslik: 'The `RETURN` table is read row by row',
          aciklama: 'If type `E` (error) or `A` (abort) is present, the process must ' +
                    '**stop** and call `BAPI_TRANSACTION_ROLLBACK`.',
          cikti: 'Decision: proceed / roll back', ok: 'if clean, commit follows' },
        { rol: 'Program', baslik: '`BAPI_TRANSACTION_COMMIT` is called',
          aciklama: '**Without this line, nothing becomes permanent.** ' +
                    'This is a BAPI\'s most commonly skipped and most expensive rule.',
          cikti: 'Permanent record', ok: 'independent verification follows' },
        { rol: 'Consultant', baslik: 'The result is verified with {{FB03}} or {{SE16N}}',
          aciklama: '`RETURN` saying "success" isn\'t enough — whether the document ' +
                    'really exists in {{BKPF}} is checked with an **independent query**.',
          cikti: 'Verified record' },
      ],
    },

    adimlar: [
      { rol: 'Consultant', eylem: 'Finds the right BAPI', sistem: '{{BAPI}} / {{SWO1}}' },
      { rol: 'Developer', eylem: 'Tests with a single record', sistem: '{{SE37}} — `TESTRUN` first' },
      { rol: 'Developer', eylem: 'Calls it in real mode', sistem: '`TESTRUN` blank — a document number may come back' },
      { rol: 'Developer', eylem: 'Reads the `RETURN` table', sistem: 'Stop if type `E`/`A` is present' },
      { rol: 'Developer', eylem: 'Makes it permanent or rolls it back', sistem: '`BAPI_TRANSACTION_COMMIT` / `_ROLLBACK`' },
      { rol: 'Consultant', eylem: 'Verifies independently', sistem: '{{FB03}} / {{SE16N}} → {{BKPF}}' },
    ],

    veriAkisi: {
      nereden: 'The calling program — a manually run transaction, a background job ({{SM37}}), or an `RFC` call from an external system.',
      nereye: 'The relevant table for the business object: {{BKPF}}/{{BSEG}}/{{ACDOCA}} for `BAPI_ACC_DOCUMENT_POST`.',
      tetikleyen: 'The `CALL FUNCTION` line in the program; the result stays temporary until commit is called.',
      sonraki: 'Independent verification ({{FB03}}/{{SE16N}}) → if wrong, the {{konu:error-handling}} diagnostic flow.',
    },

    notlar: [
      { tip: 'warn', baslik: 'The commit trap — the single most important point in this topic', metin:
        '`BAPI_TRANSACTION_COMMIT` is **not implicit.** When a BAPI call finishes, the ' +
        'data has **not** been written to the database — it sits in a temporary work ' +
        'area and **goes nowhere** until commit is called.\n\n' +
        'A BAPI can stay silent about this in-between state too: it won\'t necessarily ' +
        'return an error in the `RETURN` table, and some BAPIs — `BAPI_ACC_DOCUMENT_POST` ' +
        'included — will **reserve and hand back a document number** from the number ' +
        'range ({{NRIV}}) even if commit is never called.\n\n' +
        'The result: the screen (or the log) says *"document 1900000456 created"*, but ' +
        'a search in {{FB03}} finds **no document**. The number has been spent; the ' +
        'record hasn\'t.\n\n' +
        'The one safe habit is this: **close every BAPI call deliberately, either with ' +
        '`BAPI_TRANSACTION_COMMIT` or `BAPI_TRANSACTION_ROLLBACK`**, and verify the ' +
        'result by **looking at the table**, not the screen.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'A BAPI by itself produces no accounting entry. But once ' +
      '`BAPI_ACC_DOCUMENT_POST` is called and made permanent, the entry it produces ' +
      'is **indistinguishable** from one posted manually. The three postings below ' +
      'show **three different outcomes** of the same call.',

    etkilenenHesaplar: [
      { hesap: 'The `RETURN` table', tur: 'Technical', neden: 'Not an accounting entry, but it\'s the **first signal** of whether the posting succeeded — message type `S/E/W/I/A`.' },
      { hesap: '{{BKPF}} / {{BSEG}} / {{ACDOCA}}', tur: 'Result', neden: 'The tables written after commit — **identical** to a normal {{FB50}} entry.' },
      { hesap: '{{BKPF}} `TCODE`', tur: 'Technical', neden: 'Carries the transaction code of the program that called the BAPI; migration/interface entries are **filtered** through this field.' },
      { hesap: 'Number range ({{NRIV}})', tur: 'Risk', neden: '**Gets consumed even without a commit** — attempts that never commit leave gaps in the number range.' },
    ],

    fisler: [
      { baslik: '① A correct call — `BAPI_ACC_DOCUMENT_POST` + `COMMIT`',
        belgeTuru: 'KR', tarih: '15.03.2028', paraBirimi: 'TRY',
        satirlar: [
          { hesap: '770', ad: 'General administrative expense', borc: 50000, not: '{{BSEG}} line 1' },
          { hesap: '191', ad: 'Deductible VAT', borc: 10000, not: '{{BSEG}} line 2' },
          { hesap: '320', ad: 'Trade payables', alacak: 60000, not: '{{BSEG}} line 3' },
        ],
        not: 'The `RETURN` table came back **empty** (no `E`/`A` at all) → ' +
             '`BAPI_TRANSACTION_COMMIT` was called → {{BKPF}} + {{BSEG}} + {{ACDOCA}} ' +
             'were written.\n\n' +
             '**Verified through {{FB03}}, this entry is in no way distinguishable from ' +
             'one posted manually through {{FB50}}** — the only difference is ' +
             '{{BKPF}}\'s `TCODE`.' },

      { baslik: '② The same call — in `TESTRUN` mode',
        belgeTuru: 'KR', tarih: '15.03.2028', paraBirimi: 'TRY',
        satirlar: [
          { hesap: '770', ad: 'General administrative expense', borc: 50000, not: 'Simulation' },
          { hesap: '191', ad: 'Deductible VAT', borc: 10000, not: 'Simulation' },
          { hesap: '320', ad: 'Trade payables', alacak: 60000, not: 'Simulation' },
        ],
        not: 'Called with `TESTRUN` = **X**. The `RETURN` table gives the **same** ' +
             'result (the validations run in full), but **nothing is written to any ' +
             'table** — even if commit is called.\n\n' +
             'This is **deliberate and harmless**: it\'s the correct way to check ' +
             'whether data is valid during development and testing. The danger is ' +
             'leaving it switched on in production **without noticing**.' },

      { baslik: '③ The commit trap — `RETURN` clean, no record',
        belgeTuru: 'KR', tarih: '15.03.2028', paraBirimi: 'TRY',
        satirlar: [
          { hesap: '770', ad: 'General administrative expense', borc: 50000, not: '**Sitting only in the work area**' },
          { hesap: '191', ad: 'Deductible VAT', borc: 10000, not: '**Sitting only in the work area**' },
          { hesap: '320', ad: 'Trade payables', alacak: 60000, not: '**Sitting only in the work area**' },
        ],
        not: 'The `RETURN` table came back **empty** and the BAPI **returned a ' +
             'document number** — the screen/log says *"success."* But the ' +
             '`BAPI_TRANSACTION_COMMIT` line was **never called at all**.\n\n' +
             'A search in {{FB03}} finds **no document**. There\'s a number in the ' +
             'number range that was spent but never matched by a record — the exact ' +
             'footprint left by {{guncelleme-hatasi}}, though the cause differs: there ' +
             'the write is attempted and **fails**, here the write is **never ' +
             'requested**.\n\n' +
             'The amounts in this posting show only **what should have happened** — ' +
             'because no row was ever written to {{BKPF}}, this entry **does not exist** ' +
             'in the trial balance.' },
    ],

    tHesaplar: [
      { hesap: 'Trade payables — only posting ① is permanent', kod: '320',
        borc: [],
        alacak: [{ ad: 'Invoice posting (committed)', tutar: 60000 }],
        not: 'Calls ② and ③ **never touched** this account — even though both ' +
             'looked successful on screen or in the log.' },
    ],

    notlar: [
      { tip: 'warn', baslik: '`RETURN` saying "success" doesn\'t mean the record was written', metin:
        'A BAPI\'s `RETURN` table having no `E`/`A` type message only shows that ' +
        '**no business rule was violated**. **It doesn\'t show that the data is ' +
        'permanent.**\n\n' +
        'The two become the same thing only once `BAPI_TRANSACTION_COMMIT` is ' +
        'called. If it wasn\'t, `RETURN` is spotless, a document number is in hand, ' +
        'and {{BKPF}} has **no row for it at all**.\n\n' +
        'That\'s why a BAPI program\'s correctness is verified not by reading ' +
        '`RETURN`, but by **checking the target table** ({{SE16N}} or {{FB03}}) — ' +
        'the same principle behind {{konu:sap-tables}}\'s point that the table shows ' +
        'what the screen won\'t say.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'The most commonly used FI BAPIs fall into five roles. All of them share the ' +
      'same discipline (test → call → read `RETURN` → commit), except for one ' +
      '**read-only** exception that needs no commit at all.',

    liste: [
      { ad: '`BAPI_ACC_DOCUMENT_POST` — G/L posting', en: 'G/L Posting',
        aciklama: 'Posts general ledger, vendor, and customer line items in a single call.',
        neZaman: 'The most commonly used BAPI in interface programs; the screenless counterpart of {{FB50}}/{{FB60}}.',
        ornek: 'Import structures: `DOCUMENTHEADER` (header), `ACCOUNTGL`/`ACCOUNTPAYABLE`/`ACCOUNTRECEIVABLE` ' +
               '(items), `CURRENCYAMOUNT` (amounts).\n\n' +
               'Output: `OBJ_TYPE`, `OBJ_KEY`, `OBJ_SYS` — the document\'s identity; ' +
               'if `RETURN` is clean and commit was called, {{BKPF}}/{{BSEG}}/{{ACDOCA}} get written.',
        tcodes: ['SE37'] },

      { ad: '`BAPI_ACC_INVOICE_RECEIPT_POST` — Invoice receipt', en: 'Invoice Receipt Posting',
        aciklama: 'Posts an MM-side invoice receipt (tied to a purchase order) without a screen.',
        neZaman: 'In invoice interfaces; the screenless equivalent of the {{konu:mm-integration}} flow.',
        ornek: 'The purchase order number, quantity, and amount are read from a staging table — ' +
               'the same pattern as in {{konu:data-upload}} — and fed in here. Tax code and ' +
               'account determination run through the same `OBYC` logic covered in ' +
               '{{konu:mm-integration}} — the BAPI doesn\'t **skip** that, it only skips the screen.',
        tcodes: ['SE37'] },

      { ad: 'Vendor / customer master BAPIs', en: 'Vendor / Customer Master',
        aciklama: 'The classic `BAPI_VENDOR_*` / `BAPI_CUSTOMER_*` family — master data creation and change.',
        neZaman: 'For master data loads on ECC and early S/4HANA releases.',
        ornek: '**Watch out in S/4HANA:** because vendors and customers moved to the ' +
               '{{is-ortagi|Business Partner}} model, part of this classic family has been ' +
               'superseded by the `BAPI_BUPA_*` family. Which one applies on a given release ' +
               'must be **confirmed project by project** through {{BAPI}} (BAPI Explorer) — ' +
               'blindly reusing an old ETL template leads straight to errors on S/4HANA.',
        tcodes: ['SE37'] },

      { ad: '`BAPI_FIXEDASSET_OVRTAKE_CREATE` — Fixed asset takeover', en: 'Fixed Asset Takeover',
        aciklama: 'Creates fixed assets carried over from a legacy system, complete with **opening values**.',
        neZaman: 'In data migration projects, as the bulk counterpart of the manual `AS91` entry covered in {{konu:migration}}.',
        ornek: 'Asset master data, accumulated depreciation, and net book value are fed in a ' +
               'single call. Just like `AS91`, it **produces no accounting entry** — the G/L ' +
               'side still has to be balanced with a separate migration posting.',
        tcodes: ['SE37'] },

      { ad: '`BAPI_GL_ACC_GETBALANCE` — Balance read (no commit needed)', en: 'Balance Read (no commit needed)',
        aciklama: '**Reads** a G/L account\'s period balance; it isn\'t a write operation.',
        neZaman: 'When a report or interface program needs to query a balance.',
        ornek: '**This is the exception:** read-only BAPIs need **no commit** — nothing ' +
               'is ever changed. Commit is mandatory only for BAPIs that **write** data. ' +
               'Seeing `GET`/`READ` in a BAPI\'s name is the first sign of this distinction.',
        tcodes: ['SE37'] },

      { ad: 'Pattern · The `RETURN` table — five message types', en: 'RETURN Structure',
        aciklama: 'The common structure that carries every BAPI call\'s outcome: `TYPE`, `ID`, `NUMBER`, `MESSAGE`.',
        neZaman: 'After every BAPI call — no exceptions.',
        ornek: '**`S`** success · **`E`** error (must stop) · **`W`** warning (can continue) · ' +
               '**`I`** information · **`A`** abort (must stop, usually a lock/authorization issue).\n\n' +
               'The rule is simple: **if `E` or `A` is present, commit is never called** — ' +
               '`BAPI_TRANSACTION_ROLLBACK` is called instead. Only `S`/`W`/`I` allows you to proceed.',
      },
    ],

    karsilastirmaBasliklar: ['{{toplu-giris}}', 'BAPI', '{{idoc}}', 'LSMW', 'OData / CDS'],
    karsilastirma: [
      ['Speed', 'Slow — replays the screen', '**Fast**', 'Medium — asynchronous', 'A tool (not a method itself)', '**Fast**'],
      ['Screen dependency', '**Yes** — brittle', 'No', 'No', 'No', 'No'],
      ['Validations', 'Screen-level validations', '**Business logic**', 'Business logic', 'Depends on the BAPI/recording chosen', 'Depends on the service definition'],
      ['Error reporting', 'In screen language', '**`RETURN` — structured**', 'Status + segment', 'Depends on the method chosen', 'HTTP status code + message'],
      ['How is persistence guaranteed?', 'On session close', '**By an explicit `COMMIT` call**', 'By a status update', 'Depends on the method chosen', 'By the service layer'],
      ['Re-runnability', 'Built in ({{SM35}})', 'Your own design ({{konu:data-upload}})', 'Stays in the system', 'Depends on the method chosen', 'Client\'s responsibility'],
      ['Remote access (RFC/HTTP)', 'No', '**Yes — {{SM59}}**', 'Yes', 'No', '**Yes — HTTP-based**'],
      ['Typical use', 'One-off, when no BAPI exists', '**Programs, high volume**', 'Ongoing interfaces', 'Migration / master data', '**Modern web / mobile integration**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste: [
      { kod: 'BAPI', ad: 'BAPI Explorer — search by business object',
        amac: 'Shows every BAPI in the system as a tree organized by business object, with parameters, documentation, and sample usage all on one screen.',
        neZaman: 'The **first stop** for answering "is there a BAPI for this operation?"',
        adimlar: [
          { baslik: 'Drill down into the relevant area of the business object tree',
            aciklama: 'E.g. `ACC_DOCUMENT` for an accounting document.' },
          { baslik: 'Select the method and review its parameter list' },
          { baslik: 'Read the required/optional fields under the Documentation tab' },
          { baslik: 'Switch to {{SE37}} to test with a single record if needed' },
        ],
        ekranAkisi: [
          { ekran: 'Tree', islem: 'The `ACC_DOCUMENT` business object is opened' },
          { ekran: 'Methods', islem: '`POST` method selected → `BAPI_ACC_DOCUMENT_POST`' },
          { ekran: 'Parameters', islem: '`DOCUMENTHEADER`, `ACCOUNTGL`, `CURRENCYAMOUNT` are seen' },
          { ekran: 'Next step', islem: 'Tested in {{SE37}}' },
        ],
        alanlar: { zorunlu: ['Business object name'], opsiyonel: ['Method name', 'Keyword search'] },
        hatalar: [
          { mesaj: 'No BAPI shows up for the operation I need', sebep: 'No standard BAPI has been published for that operation.', cozum: 'Check the business object ({{SWO1}}) for general methods; failing that, fall back to {{toplu-giris}} from {{konu:data-upload}} or the recording method from {{konu:lsmw}}.' },
        ],
        ipucu: '**BAPI Explorer is a search tool, not an execution tool.** ' +
               'Find the right BAPI here, run the real test in {{SE37}}.',
        ilgili: ['SWO1', 'SE37'] },

      { kod: 'SE37', ad: 'Function module — test and inspect',
        amac: 'Runs a BAPI (or any function module) with a single record, filling in the parameters by hand.',
        neZaman: 'Before writing a program; to understand the field structure; the **best screen** for demonstrating the commit trap.',
        adimlar: [
          { baslik: 'Enter the function module name, **Test / Execute**' },
          { baslik: 'Fill in the import structures',
            aciklama: 'Try it first with **`TESTRUN` = X** — you see the validations without anything being written.' },
          { baslik: 'Execute and read the **`RETURN` table**',
            aciklama: 'Check row by row for type `E`/`A`.' },
          { baslik: 'Remove `TESTRUN` and run it in real mode' },
          { baslik: '**Call `BAPI_TRANSACTION_COMMIT` separately**',
            aciklama: 'Without it the record **isn\'t written** — and the BAPI still looks "successful."' },
        ],
        ekranAkisi: [
          { ekran: 'Test', islem: 'BAPI ran · `RETURN` **empty** · a document number **came back**' },
          { ekran: 'Check', islem: '{{FB03}} → **no document**' },
          { ekran: 'Cause', islem: '`BAPI_TRANSACTION_COMMIT` was never called separately' },
          { ekran: 'Lesson', islem: '*"`RETURN` came back clean"* ≠ *"the record was written"*' },
        ],
        alanlar: { zorunlu: ['Function module name'], opsiyonel: ['Import structures', 'Table parameters', '`TESTRUN`'] },
        hatalar: [
          { mesaj: 'The BAPI looked successful but there\'s no record', sebep: '`BAPI_TRANSACTION_COMMIT` was never called separately.', cozum: '**A BAPI\'s most commonly skipped rule.** Even while testing in {{SE37}}, commit is a separate function module call — forget it and even the test data never becomes permanent.' },
          { mesaj: 'There are type `E` messages in the `RETURN` table', sebep: 'A business validation failed (a missing required field, an invalid code).', cozum: 'The message text is usually **directly informative** — it names the field that\'s wrong. This is easier to diagnose than a screen error; it\'s a BAPI\'s real advantage.' },
          { mesaj: 'A required-field error (missing parameter)', sebep: 'An `X` flag field in the import structure wasn\'t set.', cozum: 'Most BAPI import structures have a companion `X` structure (e.g. `DOCUMENTHEADERX`) that marks which fields should be treated as filled. Check the documentation.' },
        ],
        ipucu: '**The commit trap is a BAPI\'s most expensive surprise because it\'s ' +
               'silent:** the BAPI returns success, hands back a document number, and ' +
               'there\'s **nothing at all** in the database.\n\n' +
               'In a bulk load this goes unnoticed — the whole run looks "successful" ' +
               'and **not a single record gets created**. The one safe check: verify ' +
               'the outcome in the **table**, with {{FB03}}/{{SE16N}}, not on screen.',
        ilgili: ['BAPI', 'ST22'] },

      { kod: 'SWO1', ad: 'Business Object Builder',
        amac: 'Shows BOR (Business Object Repository) objects and the methods attached to them.',
        neZaman: 'When you need to know which business object a BAPI is a method of; to work out the naming logic.',
        adimlar: [
          { baslik: 'Enter the business object name (e.g. `BUS2081` — accounting document)' },
          { baslik: 'See methods flagged as BAPIs under the Methods tab' },
          { baslik: 'Double-click a method to see the function module name behind it' },
        ],
        ekranAkisi: [
          { ekran: 'Object', islem: '`BUS2081` — Accounting document' },
          { ekran: 'Methods', islem: '`POST` → behind it, `BAPI_ACC_DOCUMENT_POST`' },
        ],
        alanlar: { zorunlu: ['Business object name (BOR object)'], opsiyonel: ['Method name'] },
        hatalar: [
          { mesaj: 'I can\'t find the business object', sebep: 'The object name isn\'t known.', cozum: 'Drill into the relevant module\'s tree in {{BAPI}} (BAPI Explorer) and locate the object from there.' },
        ],
        ipucu: 'The `BAPI_<OBJECT>_<METHOD>` naming comes from here. ' +
               'The `POST` method of the `ACC_DOCUMENT` object → `BAPI_ACC_DOCUMENT_POST`.',
        ilgili: ['BAPI', 'SE80'] },

      { kod: 'SM59', ad: 'RFC connection definitions',
        amac: 'Holds the address and user credentials external systems use to connect to SAP (or SAP uses to connect out).',
        neZaman: 'When a BAPI needs to be called **remotely** from an external system or another SAP system.',
        adimlar: [
          { baslik: 'Choose the connection type (e.g. `3` — ABAP connection)' },
          { baslik: 'Enter the target system, client, and user details' },
          { baslik: 'Verify with the **Connection Test** button' },
          { baslik: 'Confirm the calling user\'s access to the BAPI with the Authorization Test' },
        ],
        ekranAkisi: [
          { ekran: 'Complaint', islem: '*"The external system calls the BAPI but gets an authorization error"*' },
          { ekran: '{{SM59}}', islem: 'Connection test ✓ but the Authorization test **fails**' },
          { ekran: 'Cause', islem: 'The technical user behind the connection is **missing** the BAPI authorization in its role' },
          { ekran: 'Fix', islem: 'The role was corrected → authorization test ✓' },
        ],
        alanlar: { zorunlu: ['Connection name', 'Connection type', 'Target system/user'], opsiyonel: ['Security settings', 'Timeout'] },
        hatalar: [
          { mesaj: '"No authorization" on a remote call', sebep: 'The user behind the connection lacks access to the BAPI in its role.', cozum: 'The cause is usually not in the code being called, but in **the technical user behind this connection**.' },
          { mesaj: 'The connection test succeeds but the BAPI call times out', sebep: 'The BAPI is trying to process too large a data set in a single call.', cozum: 'Split the data into batches; at high volumes {{idoc}} may be a better fit.' },
        ],
        ipucu: 'When a remotely called BAPI says "no authorization," the cause is ' +
               'usually not in the code — it\'s **the connection user defined here**.',
        ilgili: ['BAPI'] },

      { kod: 'ST22', ad: 'ABAP dump analysis',
        amac: 'Shows the detail of a program crash (short dump).',
        neZaman: 'When a BAPI call **crashes** without producing an error message — rare, but it happens.',
        adimlar: [
          { baslik: 'Find the dump by date/time and user' },
          { baslik: 'Read the error type (e.g. `CONVT_NO_NUMBER`, `TABLE_NOT_LOCKED`)' },
          { baslik: 'See which line it crashed on in the ABAP call stack' },
        ],
        ekranAkisi: [
          { ekran: 'Dump', islem: '`CONVT_NO_NUMBER` — text sent into a numeric field' },
          { ekran: 'Cause', islem: 'A comma-formatted amount (`"1,234.56"`) was assigned to the amount field of the import structure' },
          { ekran: 'Fix', islem: 'The source data was converted to a numeric type before being fed into the BAPI' },
        ],
        alanlar: { zorunlu: ['Date/time range'], opsiyonel: ['User', 'Program name'] },
        hatalar: [
          { mesaj: 'A BAPI call crashes without producing a `RETURN`', sebep: 'Usually a type mismatch (text vs. number), or a required structure field left unset.', cozum: 'The dump\'s ABAP call stack shows exactly which parameter was the problem.' },
        ],
        ipucu: '**BAPIs don\'t normally crash — a dump shows up only in the exceptional ' +
               'case where the input data conflicts with ABAP\'s type system.** If ' +
               '`RETURN` is empty and there\'s still a dump, the problem is usually in ' +
               'the calling code itself.',
        ilgili: ['SE37'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'A BAPI has two tables of its own — {{TFDIR}} (which function modules exist) ' +
      'and {{TADIR}} (which development object they belong to). The actual ' +
      'accounting effect shows up afterward in the {{BKPF}}/{{BSEG}}/{{ACDOCA}} ' +
      'triple, written once commit is called.',

    liste: [
      { ad: 'TFDIR', baslik: 'Function module catalog',
        tutar: 'The registration of every function module in the system, including whether it carries the RFC attribute.',
        olusturan: 'When a function module is created in {{SE37}}',
        anahtar: 'FUNCNAME',
        iliskiler: '{{BAPI}} (BAPI Explorer) and {{SWO1}} build their listing by reading this table.',
        s4: 'Unchanged.',
        alanlar: [
          { ad: 'FUNCNAME', aciklama: 'Function module name — starting with `BAPI_...` makes it a **candidate** to be a BAPI, not a guarantee', tip: 'pk' },
          { ad: 'FMODE', aciklama: 'Context information — RFC-enabled status is flagged here' },
        ] },

      { ad: 'TADIR', baslik: 'Repository object directory',
        tutar: 'The owner, package, and originating system of every development object (function module, business object, class) in the system.',
        olusturan: 'Automatically, whenever a development object is created',
        anahtar: 'PGMID + OBJECT + OBJ_NAME',
        iliskiler: 'The package a BAPI belongs to, and its transport status, are tracked from here.',
        s4: 'Unchanged.',
        alanlar: [
          { ad: 'OBJ_NAME', aciklama: 'Object name — matches the function module name', tip: 'pk' },
          { ad: 'DEVCLASS', aciklama: 'Development package — shows which project/module it belongs to' },
        ] },

      { ad: 'BKPF', baslik: 'Document header — the first table written after commit',
        tutar: 'The header data of the document created once `BAPI_ACC_DOCUMENT_POST` is successfully committed.',
        olusturan: 'A committed BAPI call or a manual posting — **there is no difference**',
        anahtar: 'BUKRS + BELNR + GJAHR',
        iliskiler: '{{BSEG}} and {{ACDOCA}} link through this triple.',
        s4: 'Still there — a physical table in S/4HANA too.',
        alanlar: [
          { ad: 'TCODE', aciklama: 'The transaction code of the **program** that called the BAPI — migration/interface postings are filtered through this field' },
          { ad: 'BELNR', aciklama: 'The same number returned in `RETURN` — **but a number coming back doesn\'t mean the document exists**' },
        ] },

      { ad: 'BSEG', baslik: 'Document line items',
        tutar: 'The rows derived from the BAPI\'s import structures (`ACCOUNTGL`, `ACCOUNTPAYABLE`…).',
        olusturan: 'A committed BAPI call',
        anahtar: 'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler: '{{BKPF}} for the header; the full detail is covered in {{konu:sap-tables}}.',
        s4: 'A compatibility view in S/4HANA; reads go through {{ACDOCA}}.',
        alanlar: [
          { ad: 'SHKZG', aciklama: 'The debit/credit indicator — **derived** from the +/- sign in the BAPI\'s import structure' },
        ] },

      { ad: 'ACDOCA', baslik: 'Universal Journal',
        tutar: 'The record where S/4HANA merges FI and CO items into a single line — also written after commit.',
        olusturan: 'A committed BAPI call',
        anahtar: 'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler: '{{BKPF}} for the header.',
        s4: 'S/4HANA\'s single line-item table.',
        alanlar: [
          { ad: 'RACCT', aciklama: 'Account — comes from the account field in the BAPI\'s `ACCOUNTGL`/`ACCOUNTPAYABLE` structure' },
        ] },
    ],

    er: {
      type: 'er',
      baslik: 'From a BAPI call to a permanent record — the role of commit',
      varliklar: [
        { ad: 'TFDIR', rol: 'Catalog', aciklama: 'The function module registry — every BAPI is a row here',
          alanlar: [{ ad: 'FUNCNAME', tip: 'pk' }] },
        { ad: 'TADIR', rol: 'Repository', aciklama: 'The development object\'s package and owner',
          alanlar: [{ ad: 'OBJ_NAME', tip: 'pk' }, { ad: 'DEVCLASS' }] },
        { ad: 'RETURN', rol: 'Output', aciklama: 'Every call\'s message table — not yet **proof of persistence**',
          alanlar: [{ ad: 'TYPE' }, { ad: 'ID' }, { ad: 'NUMBER' }, { ad: 'MESSAGE' }] },
        { ad: 'BKPF', rol: 'Result', hub: true, aciklama: 'Only comes into existence if commit was called',
          alanlar: [{ ad: 'BUKRS', tip: 'pk' }, { ad: 'BELNR', tip: 'pk' }, { ad: 'GJAHR', tip: 'pk' }, { ad: 'TCODE' }] },
        { ad: 'BSEG', rol: 'Result', aciklama: 'Line items — linked to {{BKPF}}',
          alanlar: [{ ad: 'BELNR', tip: 'fk' }, { ad: 'BUZEI', tip: 'pk' }, { ad: 'SHKZG' }] },
        { ad: 'ACDOCA', rol: 'S/4HANA', aciklama: 'FI + CO — linked to {{BKPF}}',
          alanlar: [{ ad: 'BELNR', tip: 'fk' }, { ad: 'DOCLN', tip: 'pk' }, { ad: 'RACCT' }] },
      ],
      iliskiler: [
        { from: 'TFDIR', to: 'TADIR', alanlar: 'FUNCNAME → OBJ_NAME', not: 'every function module is a repository object' },
        { from: 'TFDIR', to: 'RETURN', alanlar: '—', not: 'a call produces a message table' },
        { from: 'RETURN', to: 'BKPF', alanlar: 'if `COMMIT` is called', not: '**the one conditional step — the heart of this topic**' },
        { from: 'BKPF', to: 'BSEG', alanlar: 'BUKRS+BELNR+GJAHR', not: 'line items' },
        { from: 'BKPF', to: 'ACDOCA', alanlar: 'BUKRS+BELNR+GJAHR', not: 'S/4HANA line items' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Working with a BAPI leans on two complementary screens: **{{SE37}}** tests ' +
      'the call, **{{FB03}}/{{SE16N}}** verify the result independently. Skip the ' +
      'gap between the two and the commit trap goes unnoticed.',

    ekranlar: [
      { ad: '{{SE37}} — function module test screen',
        aciklama: 'The screen where import parameters are filled in and the module is run with a single record.',
        alanlar: [
          { ad: 'Import structures', zorunlu: true, aciklama: 'BAPI-specific header/item structures — e.g. `DOCUMENTHEADER`.' },
          { ad: 'Table parameters', zorunlu: true, aciklama: 'Line items are usually carried here as a loop (like `ACCOUNTGL`).' },
          { ad: '`TESTRUN`', zorunlu: false, aciklama: '**Set to X**, it simulates and writes nothing. Left blank, it\'s a real call.' },
          { ad: '`RETURN` (output)', zorunlu: false, aciklama: 'Populated automatically after execution; checked **row by row** for type `E`/`A`.' },
        ],
        ipucu: '**On this screen, commit is a separate function module call.** ' +
               'After testing the BAPI, you still have to run ' +
               '`BAPI_TRANSACTION_COMMIT` **as well** on the same screen — otherwise ' +
               'nothing becomes permanent.' },

      { ad: '{{FB03}} / {{SE16N}} — independent verification',
        aciklama: 'The screen where you check not what `RETURN` claims, but **what actually exists** in the target table.',
        alanlar: [
          { ad: 'Document number + company code + fiscal year', zorunlu: true, aciklama: 'The `OBJ_KEY` returned in `RETURN` is entered here.' },
          { ad: 'Table name (if using {{SE16N}})', zorunlu: false, aciklama: 'Start with {{BKPF}} — if it\'s not there, the document was never written at all.' },
        ],
        ipucu: '**"`RETURN` is clean" and "the document exists" are not the same ' +
               'thing.** A BAPI program\'s correctness is only proven here, ' +
               '**by looking at the target table**.' },
    ],

    zorunlu: ['Import structures', 'Table parameters', 'Document number + company code + fiscal year (for verification)'],
    opsiyonel: ['`TESTRUN`', 'Table name (for {{SE16N}} verification)'],

    hatalar: [
      { mesaj: 'The BAPI says "success" but {{FB03}} can\'t find the document', sebep: '`BAPI_TRANSACTION_COMMIT` was never called.', cozum: '**The single most important error in this topic.** Add the commit; when testing, run it separately in {{SE37}} too.' },
      { mesaj: 'The `RETURN` table has a type `E` message but the program kept going', sebep: 'The program calls commit directly without reading `RETURN` first.', cozum: 'Before committing, check whether `TYPE` = E or A is present in `RETURN`; if so, call `BAPI_TRANSACTION_ROLLBACK` instead.' },
      { mesaj: 'Sending the same data a second time created a duplicate record', sebep: 'A BAPI does **not** provide re-runnability — building it is your own job.', cozum: 'Apply the staging-table pattern from {{konu:data-upload}}: mark each processed row as **stamped**.' },
      { mesaj: '"No authorization" on a remote call', sebep: 'The technical user behind the {{SM59}} connection lacks the BAPI authorization in its role.', cozum: 'Fix the connection user\'s role; no code change is needed.' },
      { mesaj: 'A vendor/customer BAPI throws an unexpected error on S/4HANA', sebep: 'The classic BAPI may have partly lost validity because the {{is-ortagi|Business Partner}} model is now in force.', cozum: 'Check with {{BAPI}} (BAPI Explorer) whether the valid BAPI on that release has moved to the `BAPI_BUPA_*` family.' },
    ],

    ipuclari: [
      '**Always try `TESTRUN` first** — you see the validations without anything being written.',
      '**Commit or rollback is never called without first reading `RETURN`.**',
      'Verify the outcome **in the table** with {{FB03}}/{{SE16N}}, not on screen.',
      'A BAPI doesn\'t provide re-runnability — the staging-table pattern ({{konu:data-upload}}) has to be built by hand.',
      'For remote-call errors, check the connection user in {{SM59}} first.',
      'Confirm a vendor/customer BAPI is still current on S/4HANA with {{BAPI}} before using it.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar: [
      { tablo: 'TFDIR', ne: 'The function module registry — the BAPI itself is defined here' },
      { tablo: 'BKPF', ne: 'The document header, written only if commit was called' },
      { tablo: 'BSEG', ne: 'Line items, written only if commit was called' },
      { tablo: 'ACDOCA', ne: 'S/4HANA — written only if commit was called' },
    ],

    commit:
      'When a BAPI call finishes, the data has **not been written to the ' +
      'database** — it sits in a temporary work area (inside the LUW, not yet ' +
      'committed).\n\n' +
      '`BAPI_TRANSACTION_COMMIT` **makes that work area permanent**. If it\'s never ' +
      'called, one of two things happens: (a) the program ends and the data is ' +
      '**lost**, or (b) the next transaction opens a different LUW and the earlier ' +
      'data is lost the same way.\n\n' +
      '**The most dangerous part:** some BAPIs — `BAPI_ACC_DOCUMENT_POST` ' +
      'included — hand back a document number **before** commit is even called, ' +
      'because number-range ({{NRIV}}) allocation is usually a separate step. The ' +
      'program logs the number and reports "success," but no row is ever written ' +
      'to {{BKPF}}.\n\n' +
      '`BAPI_TRANSACTION_ROLLBACK` **deliberately** discards an open LUW. If the ' +
      'program simply ends without a commit, the data is lost too — but ' +
      '**unintentionally**, and that distinction can\'t be told apart just by ' +
      'reading the outcome.',

    belgeNo:
      'The document number returned in `RETURN` can be allocated from the {{NRIV}} ' +
      'number range **independently of the commit**.\n\n' +
      'The practical consequence: a test run that never commits, or a failed run, ' +
      '**consumes the number** without leaving a record behind it. A gap forms in ' +
      'the number range — it **looks identical** to the gap left by ' +
      '{{guncelleme-hatasi}}, but the cause is different (there, an asynchronous ' +
      'write is attempted and fails; here, the write was never requested).\n\n' +
      'These gaps aren\'t an error by themselves — but if they\'re frequent and ' +
      'large, they\'re a sign that **`TESTRUN` isn\'t being used** in test ' +
      'environments.',

    postingLogic:
      'The `RETURN` table\'s five message types, and the correct response to each:\n\n' +
      '**`S`** (Success) — proceed.\n' +
      '**`W`** (Warning) — you can proceed, but the message should be logged.\n' +
      '**`I`** (Info) — informational only, doesn\'t affect the outcome.\n' +
      '**`E`** (Error) — **stop**, don\'t call commit, call `ROLLBACK`.\n' +
      '**`A`** (Abort) — **stop**, usually a lock or authorization issue; call ' +
      '`ROLLBACK`.\n\n' +
      'The correct flow: **try it with `TESTRUN` → read `RETURN` → if clean, call ' +
      'it in real mode → read `RETURN` again → `COMMIT` if there\'s no `E`/`A`, ' +
      '`ROLLBACK` if there is.**\n\n' +
      'Skip any one of these five steps — most commonly, the final commit step — ' +
      'and the call quietly becomes meaningless.',

    tur:
      'A BAPI, as a function module, **is a development object** — it\'s registered ' +
      'in {{TADIR}} and travels with a transport request.\n\n' +
      'Being **published** as a BAPI (registered as a business object method ' +
      'through {{SWO1}}) is a separate step — writing and compiling a function ' +
      'module doesn\'t automatically make it a BAPI.',

    transport:
      'The function module itself (its {{TFDIR}}/{{TADIR}} entry) and its link to a ' +
      'BOR object ({{SWO1}}) both **travel with a transport request**.\n\n' +
      'The **program that calls** a BAPI (an interface, an ETL job, a custom `Z*` ' +
      'program) is a separate development object with its own transport request — ' +
      'transporting the BAPI itself never brings the calling code along with it.',

    ekstra: [
      { baslik: 'Why does the commit trap happen so often?', metin:
        'Three causes come together:\n\n' +
        '**1. It goes unnoticed during testing.** Testing a BAPI in {{SE37}}, a ' +
        'developer usually makes one call, sees `RETURN` come back empty, and ' +
        'assumes that\'s enough. Commit has to be remembered as a **separate ' +
        'step**.\n\n' +
        '**2. `RETURN` shows no error.** Because there **is** no error — no ' +
        'business rule was broken. The only thing missing is the commit call, and ' +
        'that\'s **not something `RETURN` measures**.\n\n' +
        '**3. The document number is a misleading piece of evidence.** The program ' +
        'gets a number and assumes "the job is done" — but the number being ' +
        'allocated and the record becoming permanent are **two separate events**.\n\n' +
        '**The lasting fix:** in code review, the **one thing to check** on every ' +
        '`CALL FUNCTION` line is whether a `COMMIT` or `ROLLBACK` call follows it. ' +
        'This is one of the most expensive examples of the "silent error" class ' +
        'covered in {{konu:error-handling}}.' },

      { baslik: 'The real difference between a BAPI and {{toplu-giris}}', metin:
        'They\'re often confused because both look like "a bulk data-entry tool," ' +
        'but the difference is **structural**:\n\n' +
        '{{toplu-giris}} **replays** the screen — every field, every tab key, every ' +
        'confirmation dialog is processed in sequence. This is slow, but it comes ' +
        'with a built-in safety net: an interrupted session **stays visible** in ' +
        '{{SM35}}, and nobody loses it.\n\n' +
        'A BAPI **skips** the screen — it enters the business logic directly. This ' +
        'is fast, but there\'s **no safety net**: if commit is never called, the ' +
        'data disappears without showing up anywhere, because there was never a ' +
        '"session" record to begin with.\n\n' +
        '**The result:** a BAPI requires you to **build by hand** the two things ' +
        '{{toplu-giris}} gives for free — the guarantee of persistence and ' +
        're-runnability — see {{konu:data-upload}}.' },
    ],

    notlar: [
      { tip: 'warn', baslik: 'Number-range gaps — evidence of the commit trap', metin:
        'If a BAPI program routinely leaves more gaps than expected in the number ' +
        'range ({{NRIV}}), that\'s usually a sign that **failed attempts never ' +
        'reached commit**.\n\n' +
        'It isn\'t abnormal on its own — but its size and frequency give good ' +
        'reason to ask whether the `RETURN` check and the `ROLLBACK` call are ' +
        '**missing**.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The **large majority** of classic BAPIs still work on S/4HANA — the ' +
      'interface promise has been kept. What really changes is that the ' +
      '{{is-ortagi|Business Partner}} model becomes mandatory for vendor/customer ' +
      'master data, and modern integrations now add **OData/CDS** alongside the ' +
      'BAPI.',

    eccFarklari: [
      { konu: 'G/L, vendor, customer posting BAPIs', ecc: '`BAPI_ACC_DOCUMENT_POST` etc.', s4: '**Work exactly the same way** — the interface stayed fixed' },
      { konu: 'Vendor/customer master BAPIs', ecc: '`BAPI_VENDOR_*` / `BAPI_CUSTOMER_*` used directly', s4: '**Business Partner is mandatory** — some have shifted to the `BAPI_BUPA_*` family' },
      { konu: 'S/4HANA counterparts to some classic BAPIs', ecc: '—', s4: 'Service-oriented variants with an `_SRVAPI` suffix have been added for some business objects' },
      { konu: 'Integration with external systems', ecc: 'BAPI/RFC-heavy', s4: '**OData/CDS + API Business Hub** is now the preferred route' },
      { konu: 'Fixed asset takeover', ecc: '`BAPI_FIXEDASSET_OVRTAKE_CREATE`', s4: 'The same BAPI still applies; it\'s compatible with the New Asset Accounting architecture' },
    ],

    kalkanTcodes: [
      { eski: 'Classic `BAPI_VENDOR_CREATE`', yeni: '`BAPI_BUPA_CREATE_FROM_DATA` (verify project by project)', not: 'because the {{is-ortagi|Business Partner}} model is now in force' },
      { eski: '—', yeni: '—', not: '{{BAPI}}, {{SE37}}, {{SWO1}} were **not removed**' },
    ],

    fiori: [
      { ad: 'API Business Hub', aciklama: 'The catalog of S/4HANA\'s published OData/API services — the modern, web-based counterpart of BAPI Explorer.' },
      { ad: 'Manage Journal Entries', aciklama: 'The Fiori app that serves as the {{FB03}} counterpart for a G/L entry posted through a BAPI.' },
    ],

    bestPractices: [
      'When a new interface is being designed, check first whether an **OData/CDS service** exists — a BAPI is second choice.',
      'When an existing BAPI-based interface moves to S/4HANA, **the `RETURN` and commit logic doesn\'t change** — the interface contract stays the same.',
      'Before using a vendor/customer BAPI, confirm whether the Business Partner migration has already been completed on that system.',
      'For remote-access security, the authorizations of {{SM59}} connection users are reviewed regularly.',
    ],
  },

  /* ================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik: 'A nightly interface — 137 of 400 documents were never written',
    hikaye:
      'A background job running every night at 02:00 posts invoices coming from an ' +
      'external sales system into FI through `BAPI_ACC_DOCUMENT_POST`. The program ' +
      'ran "without a problem" for three months — the log always read *"400 records ' +
      'processed."*\n\n' +
      'At month-end close, the trial balance and the sales system\'s total ' +
      '**didn\'t match**: a gap of TRY 1,940,000.',
    veriler: [
      { k: 'Invoices sent (nightly job)', v: '400' },
      { k: 'Documents found in {{BKPF}}', v: '263' },
      { k: 'Missing documents', v: '137' },
      { k: 'Trial balance gap', v: 'TRY 1,940,000' },
    ],
    adimlar: [
      { baslik: 'Symptom — month-end reconciliation doesn\'t tie out',
        aciklama: 'Accounting reported a gap between the external system\'s invoice ' +
                  'total and the FI trial balance. The first question wasn\'t "how ' +
                  'many invoices were processed" but "does the total actually match."' },
      { baslik: 'The job log is checked', tcode: 'SM37',
        aciklama: 'The background job looked **error-free** every night — the job ' +
                  'status was green, no dumps.' },
      { baslik: 'The program log is reviewed', tcode: 'SLG1',
        aciklama: 'The program had logged *"400/400 processed"* itself. But that line ' +
                  'came from the program\'s own `RETURN`-reading logic — and once the ' +
                  'code was reviewed, the `E`/`A` type check on `RETURN` **was there**, ' +
                  'but the `BAPI_TRANSACTION_COMMIT` call had been **left inside a ' +
                  'conditional branch by mistake**: only the first 263 records went ' +
                  'down that branch, while the other 137 — a different transaction ' +
                  'type, credit memos — fell into a different code path where commit ' +
                  '**was never called at all**.' },
      { baslik: 'Independent verification is performed', tcode: 'SE16N',
        aciklama: '{{BKPF}}\'s `TCODE` field was filtered for this interface ' +
                  'program\'s own code → **263 records**. Compared against the ' +
                  'external system\'s 400 invoice numbers → **137 numbers didn\'t show ' +
                  'up in {{BKPF}} at all**.',
        not: 'Checking the number range ({{NRIV}}) confirmed those 137 numbers had ' +
             'been **allocated but never matched by a record** — the classic ' +
             'fingerprint of the commit trap.' },
      { baslik: 'The root cause is fixed',
        aciklama: 'The missing `BAPI_TRANSACTION_COMMIT` line was added to the credit ' +
                  'memo branch. Both branches were also changed to re-check the ' +
                  '`RETURN` type again **before** committing, and to stamp each row\'s ' +
                  'outcome individually following the staging-table pattern from ' +
                  '{{konu:data-upload}}.' },
    ],
    sonuc:
      'The 137 invoices were re-read from the source file and resent — **only the ' +
      'missing ones** (thanks to the stamp in the staging table, with no duplicate ' +
      'risk). The trial balance gap closed.\n\n' +
      'The lasting fix fits in one sentence: **a job log saying "successful" isn\'t ' +
      'enough — a nightly interface is verified every following morning by ' +
      'comparing the record count in {{BKPF}} against the source system\'s record ' +
      'count.** For three months nobody did this, because the job log was always ' +
      'green — and that\'s exactly why the error went unnoticed for three months.',
  },

  } /* sections_en */
});
