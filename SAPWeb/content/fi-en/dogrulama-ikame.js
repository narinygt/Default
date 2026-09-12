/* ==========================================================================
   content/fi-en/dogrulama-ikame.js — English body for "Doğrulama ve İkame"
   (Validation and Substitution)
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'dogrulama-ikame',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Validation and substitution are the **rule engine that kicks in at the moment of posting**. ' +
      'It lets you enforce company-specific rules where standard field checks aren\'t enough.\n\n' +
      'The two work in opposite directions:\n\n' +
      '**Validation** — *"is this posting acceptable?"* ' +
      'If the condition isn\'t met, it **blocks** the posting. It doesn\'t touch the data, it only **rejects**.\n\n' +
      '**Substitution** — *"what should this field be?"* ' +
      'It **fills in or changes** the field value automatically. It doesn\'t reject, it **intervenes**.\n\n' +
      'Both use the same structure: a **prerequisite** (under what condition should this run) + ' +
      'a **rule** (what should happen).\n\n' +
      'The critical distinction: validation is **visible** (the user gets an error message), ' +
      'substitution is **silent** (the user types one thing, the system saves another). ' +
      'That\'s both substitution\'s power and its danger.',

    neden:
      '**Standard checks aren\'t enough.** {{alan-durumu}} can make a field mandatory ' +
      'but it can\'t say *"if document type is SA, the text field must be mandatory."*\n\n' +
      '**Company-specific rules.** Policies like *"a posting over 100,000 TRY must use a specific document type"* ' +
      'can be enforced by the system itself.\n\n' +
      '**Stopping user error at the source.** Instead of correcting it afterward, ' +
      '**preventing it from ever happening**.\n\n' +
      '**Automatic filling.** Fields the user shouldn\'t have to type every time ' +
      '(value date, assignment field) get filled in through substitution.\n\n' +
      '**Audit requirements.** Controls an auditor asks for ' +
      'can be built into **the system** instead of relying on procedure.',

    sirketOnemi:
      'This is the last place a consultant should look **before saying "it can\'t be done."** ' +
      'Many requirements that can\'t be solved with standard configuration ' +
      'get solved with validation or substitution — **without any ABAP development**.\n\n' +
      'But it\'s just as dangerous. Substitution **silently changes data**: ' +
      'the user sees one value on screen, another sits in the table. ' +
      'An undocumented substitution surfaces years later with the question ' +
      '*"why does this field always come out this way?"* and ' +
      'nobody knows the answer.\n\n' +
      'The distinguishing question is this: **"what\'s the difference between validation and substitution?"** ' +
      'The right answer: **validation blocks, substitution changes.** ' +
      'Validation doesn\'t touch the data; substitution can **silently** change ' +
      'what the user entered. That\'s why substitution must always be documented.',

    gercekHayat:
      'The accounting manager wants a rule: *"don\'t let postings over 50,000 TRY go to the cash account."*\n\n' +
      'Standard configuration has **no answer** for this: {{alan-durumu}} doesn\'t set an amount limit, ' +
      '{{tolerans-grubu}} is only a difference tolerance.\n\n' +
      '**Validation solves it:**\n\n' +
      '**Prerequisite:** account = 100 (Cash)\n' +
      '**Check:** amount ≤ 50,000\n' +
      '**Message:** error — *"Postings over 50,000 TRY to the cash account are not allowed"*\n\n' +
      'The rule is now in the system. If the user tries to enter 60,000 TRY, the posting **doesn\'t go through**.\n\n' +
      '---\n\n' +
      'A second request at the same company: *"don\'t leave the assignment field blank on bank postings, ' +
      'fill it automatically with the document date."*\n\n' +
      '**Substitution solves it:** prerequisite account = 102, rule `ZUONR` = document date.\n\n' +
      'The user does nothing, the field fills itself in.\n\n' +
      '**But here\'s the difference:** validation is **visible** to the user (they get an error message); ' +
      'substitution is **invisible**. The user doesn\'t know why the assignment field is filled in.',

    muhasebeMantigi:
      'The accounting logic behind validation and substitution rests on the concept of **internal control**.\n\n' +
      'Internal control has two paths: **preventive** and **detective**.\n\n' +
      'A **detective control** finds an error after the fact: reconciliation, report review, ' +
      'audit. The error has already happened, and it gets corrected.\n\n' +
      'A **preventive control** stops the error from **happening** in the first place. ' +
      'Validation is exactly this — and in accounting, a preventive control ' +
      'is always **superior** to a detective one, because there\'s no correction cost.\n\n' +
      'Substitution falls into a different category: it\'s not a **control**, ' +
      'it\'s a **standardization** tool. It doesn\'t prevent user error, ' +
      'it removes the need for it.\n\n' +
      '**But substitution carries an accounting risk:** because it changes data, it raises the question ' +
      '*"is what\'s recorded the same as what was entered?"* ' +
      'From an audit-trail standpoint, substitution rules **must be documented**.',

    kavramlar: ['alan-durumu', 'belge-turu', 'tolerans-grubu', 'belge-denkligi',
                'ozellestirme', 'tasima-istegi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Building a rule is **three steps**, and two of them get skipped often: define → **assign** → **activate**. ' +
      'Defining alone does nothing.',

    roller:[
      { rol:'Business unit', gorev:'Requests the rule **in business language**: "no postings over 50,000 to the cash account".' },
      { rol:'FI consultant', gorev:'Assesses whether the rule can be solved with standard configuration.' },
      { rol:'FI consultant', gorev:'Defines the rule with {{GGB0}} / {{GGB1}}.' },
      { rol:'FI consultant', gorev:'Assigns it to the company code and **call-up point** with {{OB28}} / {{OBBH}}.' },
      { rol:'FI consultant', gorev:'**Activates** it with {{GGB4}} — the most commonly skipped step.' },
      { rol:'Test team', gorev:'Tests both that the rule catches what it should and that it **doesn\'t block normal postings**.' },
      { rol:'Developer', gorev:'Writes a user exit if standard fields aren\'t enough ({{GCX2}}).' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Building a rule — three steps, two get skipped',
      adimlar:[
        { ic:'💬', rol:'Business unit', baslik:'The rule is requested in business language',
          aciklama:'*"No postings over 50,000 to cash"* · *"the text field must be mandatory on an SA document"*. ' +
                   'First it\'s checked whether **a standard solution exists**.',
          cikti:'Business rule', ok:'if standard isn\'t enough' },
        { ic:'🤔', rol:'Consultant', baslik:'Validation or substitution?',
          aciklama:'**Should it be blocked?** → validation. **Should it be filled in / changed?** → substitution. ' +
                   'The decision comes down to this one question.',
          cikti:'Tool choice', ok:'it gets defined' },
        { ic:'📝', rol:'Consultant', baslik:'1⃣ The rule is defined ({{GGB0}} / {{GGB1}})',
          aciklama:'A **prerequisite** (under what condition) + a **rule** (what should happen) + ' +
                   'for validation, a **message** (error/warning/information).',
          cikti:'Defined rule', ok:'it gets assigned' },
        { ic:'🔗', rol:'Consultant', baslik:'2⃣ It\'s **assigned** to the company code ({{OB28}} / {{OBBH}})',
          aciklama:'The **call-up point** is also chosen: document header · line item · complete document. ' +
                   'Choosing the wrong point means the rule **never runs**.',
          cikti:'Assigned rule', ok:'it gets activated' },
        { ic:'🔌', rol:'Consultant', baslik:'3⃣ It\'s **activated** ({{GGB4}})',
          aciklama:'**0** inactive · **1** active · **2** active except for batch input. ' +
                   '**The most commonly skipped step** — the rule is defined but doesn\'t run.',
          cikti:'Working rule', ok:'it gets tested' },
        { ic:'🧪', rol:'Test team', baslik:'It\'s tested both ways',
          aciklama:'**Positive:** does the rule catch what it should? **Negative:** does it ' +
                   'accidentally block normal postings? The second matters more.',
          cikti:'Verified rule', ok:'it gets documented' },
        { ic:'📋', rol:'Consultant', baslik:'It\'s **documented** — substitution especially',
          aciklama:'Substitution changes data **silently**. If it isn\'t documented, it turns into ' +
                   'behavior nobody understands years later.',
          cikti:'Documented rule' },
      ],
    },

    adimlar:[
      { rol:'Consultant', eylem:'Looks for a standard solution', sistem:'{{alan-durumu}}, {{belge-turu}}, {{tolerans-grubu}}' },
      { rol:'Consultant', eylem:'Defines a validation', sistem:'{{GGB0}} — prerequisite + check + message' },
      { rol:'Consultant', eylem:'Defines a substitution', sistem:'{{GGB1}} — prerequisite + field assignment' },
      { rol:'Consultant', eylem:'Assigns it to the company code', sistem:'{{OB28}} validation · {{OBBH}} substitution' },
      { rol:'Consultant', eylem:'**Activates** it', sistem:'{{GGB4}} — level 1 or 2' },
      { rol:'Test team', eylem:'Runs positive and negative tests', sistem:'Normal postings must not be blocked' },
      { rol:'Basis', eylem:'Moves it to production with a transport request', sistem:'{{tasima-istegi}}' },
      { rol:'Consultant', eylem:'Documents the rule', sistem:'Substitution especially — silent behavior' },
    ],

    veriAkisi:{
      nereden:'Field values coming from the posting screen; {{GB01}} determines which fields ' +
              'are usable/changeable.',
      nereye:'Validation → an error message (the posting is blocked). ' +
             'Substitution → the {{BKPF}}/{{BSEG}} fields are saved **changed**.',
      tetikleyen:'Every document posting — at the assigned call-up point.',
      sonraki:'The document is posted or rejected.',
    },

    notlar:[
      { tip:'warn', baslik:'Defining a rule isn\'t enough — it must be assigned and activated', metin:
        'Two of the three steps get **skipped often**, and the result is the same either way: the rule **never runs**.\n\n' +
        '**1. Definition** ({{GGB0}}/{{GGB1}}) — the rule is written. ' +
        'This alone does nothing.\n\n' +
        '**2. Assignment** ({{OB28}}/{{OBBH}}) — it\'s tied to the company code and the **call-up point**. ' +
        'An unassigned rule doesn\'t run, even if it\'s defined.\n\n' +
        '**3. Activation** ({{GGB4}}) — the activation level is set to **1** or **2**. ' +
        'At level **0** the rule is **inactive** even if it\'s assigned.\n\n' +
        '**Diagnostic order:** if a rule isn\'t working, these three are checked in order. ' +
        'Most cases get resolved at **activation**.\n\n' +
        'A fourth possibility: the **wrong call-up point**. A rule at the line-item level ' +
        'can\'t see header fields; a rule at the header level can\'t see line-item fields.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Validation **produces no posting** — it blocks. Substitution **changes** the posting. ' +
      'The examples below compare the accounting outcome of each.',

    etkilenenHesaplar:[
      { hesap:'Validation — no account at all', tur:'—', neden:'The posting **never happens**; an error message is given and the user corrects it.' },
      { hesap:'Substitution — the changed fields', tur:'Variable', neden:'The {{BKPF}}/{{BSEG}} fields are saved **different** from what the user entered.' },
      { hesap:'100 Cash', tur:'Balance sheet — Asset', neden:'The example validation target: an amount limit.' },
      { hesap:'102 Banks', tur:'Balance sheet — Asset', neden:'The example substitution target: auto-filling the assignment field.' },
      { hesap:'{{kar-merkezi}} / {{maliyet-yeri}}', tur:'Reporting dimension', neden:'Substitution\'s most common use: deriving dimension fields automatically.' },
    ],

    fisler:[
      { baslik:'Validation kicked in — **no posting was created**',
        belgeTuru:'—', tarih:'12.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'100', ad:'Cash — the user entered 60,000 TRY', borc:0, alacak:0,
            not:'**Error:** "Postings over 50,000 TRY to the cash account are not allowed"' },
        ],
        not:'**No document was ever created.** Validation rejected the posting; ' +
             'the user got the error message and had to correct the amount.\n\n' +
             'From an accounting standpoint this is a **preventive control**: no error occurred, ' +
             'there\'s no correction cost, and there\'s no trace in the audit trail.\n\n' +
             'Had the same outcome been achieved with a detective control (report review): ' +
             'the posting would have been created, found later, reversed with {{FB08}}, and ' +
             'the trial balance would show **two permanent postings**.\n\n' +
             '*(The 0/0 shown in the table is meant to emphasize that the posting never happened.)*' },

      { baslik:'Substitution kicked in — the posting was created **with a change**',
        belgeTuru:'SA', tarih:'12.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Banks — the assignment field was **filled by substitution**', borc:250000,
            not:'The user left it blank · the system wrote `ZUONR` = **12112027**' },
          { hesap:'120', ad:'Receivables — collection', alacak:250000 },
        ],
        not:'The user **left the assignment field blank**; the substitution rule wrote the document date.\n\n' +
             '**The posting was created, but it isn\'t identical to what the user entered.**\n\n' +
             'Benefit: the assignment field is never left blank, ' +
             'which makes bank reconciliation easier.\n\n' +
             '**Risk:** the user **doesn\'t know** why the field is filled in. ' +
             'If it isn\'t documented, the question *"why does this field always have a date in it?"* ' +
             'goes unanswered years later.' },

      { baslik:'Substitution **changed** what the user entered — the riskiest scenario',
        belgeTuru:'SA', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Expense — the user entered **profit center PC-2000**', borc:80000,
            not:'What was saved: **PC-1000** — substitution changed it' },
          { hesap:'320', ad:'Trade payables', alacak:80000 },
        ],
        not:'The substitution rule **forcibly** derives the profit center based on the expense type and ' +
             '**overwrites** the value the user typed by hand.\n\n' +
             '**The user entered PC-2000, the system saved PC-1000** — ' +
             'and no message appeared.\n\n' +
             'If the user opens the document with {{FB03}} and sees PC-1000, they\'ll say ' +
             '*"that\'s not what I entered"* — and they\'d be right.\n\n' +
             '**Design lesson:** substitution should only **fill in blank fields**; ' +
             'rules that overwrite what the user entered should only be set up when there\'s a genuine ' +
             'need, and only when **documented**. ' +
             'Otherwise the user\'s trust in the system erodes.' },

      { baslik:'Validation at warning level — the posting **went through**',
        belgeTuru:'KR', tarih:'20.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Expense — the text field is blank', borc:45000, not:'A **warning** was given but it went through' },
          { hesap:'320', ad:'Trade payables', alacak:45000 },
        ],
        not:'The validation\'s message type was defined as **W (warning)**: ' +
             'the user was warned but could **press Enter and go through**.\n\n' +
             '**The message type choice entirely determines the rule\'s effect:**\n\n' +
             '**E (error)** — the posting is **blocked**, it can\'t go through\n' +
             '**W (warning)** — warns, the user **can go through**\n' +
             '**I (information)** — informational only\n\n' +
             'If the policy is genuinely meant to be enforced, **E** should be used. ' +
             'A rule built with **W** gets passed by everyone the first busy day ' +
             'and effectively stops working.' },
    ],

    tHesaplar:[
      { hesap:'Cash — protected by validation', kod:'100',
        borc:[{ ad:'Postings under 50,000', tutar:340000 }],
        alacak:[],
        not:'A posting over 50,000 **never happened**' },
      { hesap:'Banks — assignment field filled by substitution', kod:'102',
        borc:[{ ad:'Collections (ZUONR automatic)', tutar:1250000 }],
        alacak:[],
        not:'The assignment field is **never left blank**' },
    ],

    notlar:[
      { tip:'tip', baslik:'A preventive control is superior to a detective one', metin:
        'Accounting internal control has two approaches:\n\n' +
        '**Detective:** the error happens, and is found afterward (reconciliation, report, audit). ' +
        'A correction is needed: {{FB08}} reversal → **two permanent postings** on the trial balance → ' +
        'an explanation needed in the audit.\n\n' +
        '**Preventive:** the error **never happens**. This is exactly what validation is.\n\n' +
        'The difference is concrete: a posting to the wrong account, caught by a detective control, ' +
        'creates three documents (the original + the reversal + the correct one). ' +
        'With validation it creates **zero documents** — the user is warned on the first attempt.\n\n' +
        '**Consulting principle:** if a class of error keeps repeating, the solution isn\'t ' +
        '"train the user," it\'s **putting the rule into the system**. ' +
        'This principle also shows up in {{konu:document-parking}} (four-eyes) and ' +
        '{{konu:taxes}} ("automatic posting only").' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'The rule engine varies along **three axes**: the **tool** (validation / substitution), ' +
      'the **call-up point** (where it runs), and the **message type** (how strict it is).',

    liste:[
      { ad:'Validation — GGB0',
        aciklama:'If the condition isn\'t met, it **blocks** the posting. It **doesn\'t touch** the data.',
        neZaman:'Whenever a posting needs to be prevented from being created.',
        ornek:'**Prerequisite:** account = 100 → **Check:** amount ≤ 50,000 → ' +
              '**Message:** error\n\n' +
              'The user **sees it** and has to correct it.',
        tcodes:['GGB0','OB28'] },

      { ad:'Substitution — GGB1',
        aciklama:'**Fills in or changes** the field value. It doesn\'t block, it **intervenes**.',
        neZaman:'Whenever a field needs to be filled automatically or standardized.',
        ornek:'**Prerequisite:** account = 102 → **Rule:** `ZUONR` = document date\n\n' +
              'The user **doesn\'t see it** — which is why documenting it is mandatory.',
        tcodes:['GGB1','OBBH'] },

      { ad:'Call-up point — Document Header — 0001',
        aciklama:'Operates on header fields: document type, date, reference, header text.',
        neZaman:'When the rule only looks at header information.',
        ornek:'*"If document type is SA, the reference field must be mandatory"*\n\n' +
              '**It can\'t access line-item fields** — a rule that looks at the account or amount ' +
              'won\'t run here.' },

      { ad:'Call-up point — Line Item — 0002',
        aciklama:'Runs separately for each line: account, amount, cost center, tax code.',
        neZaman:'The most common point — when the rule looks at the account or amount.',
        ornek:'*"If the account is 100, the amount must be ≤ 50,000"*\n\n' +
              '**It can\'t change the header field** (in substitution). ' +
              'The header field can be read but not written.' },

      { ad:'Call-up point — Complete Document — 0003',
        aciklama:'Runs once the document is **complete as a whole**, right before it\'s posted.',
        neZaman:'When the rule looks at the relationship between lines.',
        ornek:'*"If account 100 appears in the document, the total amount must not exceed 50,000"* — ' +
              'this can\'t be understood by looking at a single line, it needs **the whole document**.\n\n' +
              'The only suitable point for line-item totals and cross-checks between lines.' },

      { ad:'Message — E — Error',
        aciklama:'The posting is **blocked**. The user can\'t get past it.',
        neZaman:'When the policy genuinely needs to be enforced.',
        ornek:'**This is the only real protection.** The other types are just advisory.' },

      { ad:'Message — W — Warning',
        aciklama:'Warns, but the user **can press Enter and go through**.',
        neZaman:'When drawing attention is enough; when going through anyway is acceptable.',
        ornek:'**The risk of it becoming effectively useless is high:** everyone starts going through ' +
              'it the first busy day and the rule effectively stops mattering.' },

      { ad:'Message — I — Information',
        aciklama:'Only informs; never interrupts the flow.',
        neZaman:'When just letting the user know is enough.',
        ornek:'It carries no control purpose; it\'s an informational tool.' },

      { ad:'Activation Level — 0 / 1 / 2 — GGB4',
        aciklama:'Determines whether the rule runs at all.',
        neZaman:'The **mandatory** last step for every rule.',
        ornek:'**0** inactive · **1** active · **2** active **except for batch input**\n\n' +
              'Why does level **2** exist? During data loads ({{toplu-giris}}), ' +
              'it may be desirable for the rule to stay disabled — ' +
              'the old data being loaded might not satisfy the current rule.',
        tcodes:['GGB4'] },

      { ad:'Advanced — User Exit — RGGBS000',
        aciklama:'**ABAP** code for logic that can\'t be built with standard fields.',
        neZaman:'When the rule requires a table lookup or complex calculation.',
        ornek:'A `U`-type exit in substitution, a `B`-type rule in validation. ' +
              'Assigned with {{GCX2}}.\n\n' +
              '**The last resort:** it requires ABAP maintenance and ' +
              'needs to be reviewed on upgrades.',
        tcodes:['GCX2'] },
    ],

    karsilastirmaBasliklar:['Validation', 'Substitution'],
    karsilastirma:[
      ['What it does', '**Blocks** the posting', '**Fills in/changes** the field'],
      ['Does it touch the data', '**No** — it rejects', '**Yes** — it changes it'],
      ['Does the user see it', '**Yes** — gets an error message', '**No** — it\'s silent'],
      ['Transaction code', '{{GGB0}} definition · {{OB28}} assignment', '{{GGB1}} definition · {{OBBH}} assignment'],
      ['Structure', 'Prerequisite + check + **message**', 'Prerequisite + **field assignment**'],
      ['Typical use', 'Amount limit, mandatory field, account restriction', 'Dimension derivation, date filling, standardization'],
      ['Risk', 'An overly strict rule stops the business', '**Silent data change** — lost track of if not documented'],
      ['Type of internal control', '**Preventive control**', 'Not a control — **standardization**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'GGB0', ad:'Define validation — the tool for preventive control',
        amac:'Defines control rules that run at the moment of posting.',
        neZaman:'When a posting that can\'t be blocked with standard configuration needs to be blocked.',
        adimlar:[
          { baslik:'Choose the application area and the call-up point',
            aciklama:'For FI documents the application area is **FI**; the call-up point is ' +
                     'document header / **line item** / complete document.' },
          { baslik:'Give the validation a name and write a description',
            aciklama:'The description must be written **in business language** — it will be read years later.' },
          { baslik:'Define the **prerequisite**',
            aciklama:'*Under what condition should the rule run?* Example: `BSEG-HKONT = 100`. ' +
                     'If the prerequisite isn\'t met, the check never runs.' },
          { baslik:'Define the **check**',
            aciklama:'*The condition that must be satisfied.* Example: `BSEG-WRBTR <= 50000`.' },
          { baslik:'Define the **message**',
            aciklama:'The type (**E** error / **W** warning / **I** information) and the text. ' +
                     'The text should tell the user **what they need to do**.' },
          { baslik:'Assign it with {{OB28}}, **activate** it with {{GGB4}}',
            aciklama:'Without these two steps the rule **doesn\'t run**.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Application area **FI** · call-up point **line item**' },
          { ekran:'Validation', islem:'Name: `Z_KASA_LIMIT` · description: "Ban on postings over 50,000 to cash"' },
          { ekran:'Prerequisite', islem:'`BSEG-HKONT` = `0000000100`' },
          { ekran:'Check', islem:'`BSEG-WRBTR` <= `50000`' },
          { ekran:'Message', islem:'Type **E** · "Postings over 50,000 TRY to the cash account are not allowed"' },
          { ekran:'Next step', islem:'{{OB28}} assignment → {{GGB4}} activation' },
        ],
        alanlar:{
          zorunlu:['Application area','Call-up point','Validation name','Prerequisite','Check','Message'],
          opsiyonel:['User exit (B-type rule)'] },
        hatalar:[
          { mesaj:'I defined the rule but it isn\'t working', sebep:'Not assigned ({{OB28}}) or not activated ({{GGB4}}).', cozum:'Check in order: definition → assignment → **activation (level 1/2)**. Most cases get resolved at the third step.' },
          { mesaj:'Field ... is not allowed in this Boolean class', sebep:'The field can\'t be used at that call-up point ({{GB01}}).', cozum:'Choose a different call-up point. A rule that looks at a header field won\'t run at the line-item point.' },
          { mesaj:'The rule is also blocking normal postings', sebep:'The prerequisite was defined too broadly.', cozum:'Narrow the prerequisite. A **negative test** (do normal postings go through?) matters more than the positive test.' },
        ],
        ipucu:'**Mixing up the prerequisite with the check is the most common design mistake.**\n\n' +
              '**Prerequisite:** *under what condition should the rule kick in?* (account = 100)\n' +
              '**Check:** *what must be satisfied in that condition?* (amount ≤ 50,000)\n\n' +
              'If the two are written the other way around, the rule runs on **every posting** ' +
              'and makes the system unusable.\n\n' +
              '**Write the message text in the user\'s language.** Instead of *"Validation Z_KASA_LIMIT failed"* ' +
              'it should say *"Postings over 50,000 TRY to the cash account are not allowed — ' +
              'use a bank account instead."*',
        ilgili:['GGB1','GGB4','OB28','GB01'] },

      { kod:'GGB1', ad:'Define substitution — a powerful but silent tool',
        amac:'Defines a rule that automatically fills in or changes a field value at the moment of posting.',
        neZaman:'When a field needs to be filled automatically or standardized.',
        adimlar:[
          { baslik:'Choose the application area and the call-up point',
            aciklama:'**A substitution at the line-item point can\'t change a header field.**' },
          { baslik:'Give the substitution a name and write a description',
            aciklama:'The description is **critical** — because substitution runs silently, ' +
                     'this field is the only trace.' },
          { baslik:'Define the **prerequisite**', aciklama:'Under what condition should the rule run?' },
          { baslik:'Choose the **field to change**',
            aciklama:'{{GB01}} determines which fields can be changed; ' +
                     'a field not on the list can\'t be selected.' },
          { baslik:'Set the value',
            aciklama:'A fixed value · copy from another field · **user exit** ({{GCX2}}).' },
          { baslik:'Assign it with {{OBBH}}, **activate** it with {{GGB4}}' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Application area **FI** · call-up point **line item**' },
          { ekran:'Substitution', islem:'Name: `Z_ZUONR_TARIH` · description: "Document date into the assignment field on bank postings"' },
          { ekran:'Prerequisite', islem:'`BSEG-HKONT` = `0000000102`' },
          { ekran:'Field', islem:'`BSEG-ZUONR` **to be changed**' },
          { ekran:'Value', islem:'Copy from field `BKPF-BLDAT`' },
          { ekran:'Next step', islem:'{{OBBH}} assignment → {{GGB4}} activation' },
        ],
        alanlar:{
          zorunlu:['Application area','Call-up point','Substitution name','Prerequisite','Target field','Value source'],
          opsiyonel:['User exit (U-type)'] },
        hatalar:[
          { mesaj:'Field ... cannot be substituted', sebep:'The field is closed to substitution in {{GB01}}.', cozum:'{{GB01}} can be changed but **shouldn\'t be, without an SAP note** — some fields being closed to substitution is deliberate and protects data integrity.' },
          { mesaj:'I can\'t change the header field', sebep:'A header field **can\'t be written** at the line-item call-up point.', cozum:'Use the header call-up point instead. But line-item fields can\'t be read at that point.' },
          { mesaj:'The substitution is overwriting what the user entered, there are complaints', sebep:'The rule doesn\'t check whether the field is blank.', cozum:'Add a **"if the field is blank"** condition to the prerequisite; only fill in blank fields.' },
        ],
        ipucu:'**Substitution should only fill in blank fields.**\n\n' +
              'A substitution that overwrites what the user entered by hand leads to the complaint ' +
              '*"that\'s not what I entered"* and ' +
              'erodes the user\'s trust in the system.\n\n' +
              'The fix is simple: add a **"if the field is blank"** condition to the prerequisite.\n\n' +
              '**Every substitution must be documented.** Because it runs silently, ' +
              'an undocumented substitution turns into a system behavior nobody understands the reason for years later, ' +
              'and nobody dares touch it.',
        ilgili:['GGB0','GGB4','OBBH','GB01','GCX2'] },

      { kod:'GGB4', ad:'Activation — the most commonly skipped step',
        amac:'Sets the activation level of defined validations and substitutions.',
        neZaman:'After every rule is defined — without this step the rule doesn\'t run.',
        adimlar:[
          { baslik:'Choose the application area and the call-up point' },
          { baslik:'Find the company code' },
          { baslik:'**Enter the activation level**',
            aciklama:'**0** inactive · **1** active · **2** active **except for batch input**.' },
          { baslik:'Save and test' },
        ],
        alanlar:{
          zorunlu:['Application area','Call-up point','Company code','Activation level'],
          opsiyonel:[] },
        hatalar:[
          { mesaj:'The rule is defined and assigned but doesn\'t work', sebep:'The activation level is **0**.', cozum:'Set it to level **1**. This is the most common cause of "the rule doesn\'t work" cases.' },
          { mesaj:'The rule works on manual entries but not during a data load', sebep:'Level **2** — batch input is excluded.', cozum:'This may be a deliberate choice. If it also needs to run during a load, set it to level **1**.' },
        ],
        ipucu:'**Why does level 2 exist?** During data loads ({{toplu-giris}}, {{LSMW}}), ' +
              'it may be desirable for the rule to stay disabled.\n\n' +
              'Reason: the **old data** loaded during a migration might not satisfy today\'s rule. ' +
              'For instance, a 2019 posting might exceed an amount limit put in place in 2027.\n\n' +
              'If the rule were level 1, the historical data **couldn\'t be loaded**.\n\n' +
              'But this is an **open door**: the rule can be bypassed through a batch load. ' +
              'For critical controls, level **1** is preferred.',
        ilgili:['GGB0','GGB1','OB28','OBBH'] },

      { kod:'OB28', ad:'Assign an FI document validation to a company code',
        amac:'Ties a validation defined with {{GGB0}} to a company code and call-up point.',
        neZaman:'After the validation is defined, before it\'s activated.',
        adimlar:[
          { baslik:'Enter the company code' },
          { baslik:'Choose the call-up point', aciklama:'Document header · line item · complete document.' },
          { baslik:'Enter the validation name' },
          { baslik:'Enter the activation level', aciklama:'Can also be entered here; it\'s the same field as in {{GGB4}}.' },
        ],
        ipucu:'**Only one validation can be assigned per company code + call-up point.** ' +
              'If a second rule is needed, it\'s added as an **extra step** inside the ' +
              'existing validation.\n\n' +
              'This is an important design constraint: rules grow inside a single validation object ' +
              'and get more complex over time. ' +
              'That\'s why each step\'s **description** needs to be written well.',
        ilgili:['GGB0','GGB4','OBBH'] },

      { kod:'OBBH', ad:'Assign an FI document substitution to a company code',
        amac:'Ties a substitution defined with {{GGB1}} to a company code and call-up point.',
        neZaman:'After the substitution is defined.',
        adimlar:[
          { baslik:'Enter the company code' },
          { baslik:'Choose the call-up point',
            aciklama:'The choice of point determines **which fields can be changed**.' },
          { baslik:'Enter the substitution name' },
          { baslik:'Enter the activation level' },
        ],
        ipucu:'**Choosing the call-up point is a decision that\'s hard to reverse.** ' +
              'A substitution at the line-item point **can\'t change a header field**; ' +
              'one at the header point **can\'t read line-item fields**.\n\n' +
              'If the wrong point is chosen, the rule either doesn\'t run or behaves unexpectedly. ' +
              'When designing a rule, the question *"which fields do I need to read, and which do I need to write?"* ' +
              'should be answered first.',
        ilgili:['GGB1','GGB4','OB28'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Validation and substitution **have no movement table of their own** — it\'s a rule engine. ' +
      'But two tables matter: **{{GB01}}** (which fields can be used) and ' +
      'the {{BKPF}}/{{BSEG}} that the rules affect.',

    liste:[
      { ad:'GB01', baslik:'Boolean class field control — **the source of the restrictions**',
        tutar:'Holds which fields **can be used** in validation and ' +
              '**can be changed** in substitution.',
        olusturan:'Standard SAP delivery',
        guncelleyen:'Can be changed but **shouldn\'t be, without an SAP note**',
        anahtar:'CLASS + TABNAME + FIELDNAME',
        iliskiler:'{{GGB0}} and {{GGB1}} present their field list by looking at this table.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'CLASS', aciklama:'Boolean class — **09** for FI documents', tip:'pk' },
          { ad:'TABNAME / FIELDNAME', aciklama:'{{BKPF}} / {{BSEG}} fields', tip:'pk' },
          { ad:'EXCL_SUBST', aciklama:'**Excluded from substitution** flag — if set, that field **can\'t be changed**' },
        ] },

      { ad:'BKPF', baslik:'Document header — where header-point rules run',
        tutar:'Document type, dates, reference, header text.',
        olusturan:'Document posting',
        iliskiler:'Rules at the header call-up point read/write these fields.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'BLART', aciklama:'{{belge-turu}} — the rules\' most common prerequisite' },
          { ad:'BLDAT / BUDAT', aciklama:'Document and posting date — a common source field in substitution' },
          { ad:'XBLNR', aciklama:'Reference — the field most often made mandatory in validation' },
          { ad:'BKTXT', aciklama:'Header text' },
        ] },

      { ad:'BSEG', baslik:'Document line items — where line-item-point rules run',
        tutar:'Account, amount, cost center, assignment field, tax code.',
        olusturan:'Document posting',
        iliskiler:'Rules at the line-item call-up point read/write these fields.',
        s4:'{{uyumluluk-view}} but the rule engine runs at posting time, so it\'s unaffected.',
        alanlar:[
          { ad:'HKONT', aciklama:'G/L account — **the most common prerequisite field**' },
          { ad:'WRBTR / DMBTR', aciklama:'Amount — used in amount-limit rules' },
          { ad:'ZUONR', aciklama:'**Assignment field** — substitution\'s most common target' },
          { ad:'KOSTL / PRCTR', aciklama:'Cost center / profit center — the dimension-derivation substitution' },
          { ad:'SGTXT', aciklama:'Line item text — often made mandatory in validation' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'The rule engine — what it reads, what it writes',
      varliklar:[
        { ad:'GB01', rol:'Restriction', aciklama:'**Which field can be used/changed**',
          alanlar:[{ ad:'CLASS', tip:'pk' }, { ad:'TABNAME', tip:'pk' }, { ad:'FIELDNAME', tip:'pk' }, { ad:'EXCL_SUBST' }] },
        { ad:'BKPF', rol:'Document', hub:true, aciklama:'Header — header-point rules',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'BLDAT' }, { ad:'XBLNR' }] },
        { ad:'BSEG', rol:'Document', aciklama:'Line items — line-item-point rules',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HKONT' }, { ad:'WRBTR' }, { ad:'ZUONR' }, { ad:'PRCTR' }] },
        { ad:'T001', rol:'Organization', aciklama:'Company code — the rule is assigned here',
          alanlar:[{ ad:'BUKRS', tip:'pk' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'The substitution result reflects here too',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'RACCT' }, { ad:'PRCTR' }] },
      ],
      iliskiler:[
        { from:'GB01', to:'BKPF', alanlar:'TABNAME/FIELDNAME', not:'header field restriction' },
        { from:'GB01', to:'BSEG', alanlar:'TABNAME/FIELDNAME', not:'**line-item field restriction**' },
        { from:'T001', to:'BKPF', alanlar:'BUKRS', not:'the rule is assigned to the company code' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'header → line item' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR', not:'the substitution result reflects here' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'The user encounters this topic **only through the outcome**: ' +
      'either they get an error message (validation) or a field fills in on its own (substitution). ' +
      'For a consultant, there are three screens.',

    ekranlar:[
      { ad:'{{GGB0}} — the validation definition screen',
        aciklama:'A three-part rule structure: prerequisite, check, message.',
        alanlar:[
          { ad:'Application area + call-up point', zorunlu:true,
            aciklama:'FI + document header / **line item** / complete document. ' +
                     'The choice of point determines **which fields are accessible**.' },
          { ad:'**Prerequisite**', zorunlu:true, aciklama:'*Under what condition should the rule run?* ' +
                   'If left blank, it runs on **every posting** — dangerous.' },
          { ad:'**Check**', zorunlu:true, aciklama:'*What must be satisfied in that condition?*' },
          { ad:'**Message type and text**', zorunlu:true,
            aciklama:'**E** blocks · **W** can be passed · **I** informs. ' +
                     'The text should tell the user **what they need to do**.' },
        ],
        ipucu:'**Leaving the prerequisite blank is the most dangerous mistake** — ' +
              'the rule runs on every posting and makes the system unusable.\n\n' +
              'When testing, a **negative test** matters more than a positive one: ' +
              'is the posting the rule is supposed to catch blocked ✓ ' +
              'and **do normal postings go through** ✓' },

      { ad:'{{GGB1}} — the substitution definition screen',
        aciklama:'Prerequisite + target field + value source.',
        alanlar:[
          { ad:'Application area + call-up point', zorunlu:true,
            aciklama:'**A substitution at the line-item point can\'t write a header field.**' },
          { ad:'Prerequisite', zorunlu:true, aciklama:'Adding a **"if the field is blank"** condition is recommended — ' +
                   'so as not to overwrite what the user entered.' },
          { ad:'Target field', zorunlu:true, aciklama:'Chosen from the {{GB01}} list; ' +
                   'fields that are closed don\'t appear.' },
          { ad:'Value source', zorunlu:true, aciklama:'A fixed value · another field · ' +
                   'a **user exit** ({{GCX2}}).' },
          { ad:'Description', zorunlu:false, aciklama:'**Effectively mandatory** — ' +
                   'because substitution runs silently, this field is the only trace.' },
        ],
        ipucu:'**Substitution should only fill in blank fields.** ' +
              'A rule that overwrites what the user entered creates the complaint *"that\'s not what I entered"* and ' +
              'a loss of trust in the system.\n\n' +
              'Adding a *"if the field is blank"* condition to the prerequisite fixes this.' },

      { ad:'{{GGB4}} — the activation screen',
        aciklama:'The screen that actually puts the rule into effect.',
        alanlar:[
          { ad:'Application area + call-up point', zorunlu:true },
          { ad:'Company code', zorunlu:true },
          { ad:'**Activation level**', zorunlu:true,
            aciklama:'**0** inactive · **1** active · **2** active except for batch input.' },
        ],
        ipucu:'**Most "the rule isn\'t working" cases get resolved here.**\n\n' +
              'Diagnostic order: does a definition exist ({{GGB0}}/{{GGB1}}) → ' +
              'is it assigned ({{OB28}}/{{OBBH}}) → **is it activated ({{GGB4}})** → ' +
              'is it the right call-up point?\n\n' +
              'If level **2** is chosen, the rule works on manual entries but ' +
              'doesn\'t run during a data load — sometimes deliberate, sometimes a surprise.' },
    ],

    zorunlu:['Application area','Call-up point','Prerequisite','Check or target field','Activation level'],
    opsiyonel:['User exit','Custom message text'],

    hatalar:[
      { mesaj:'I defined the rule but it isn\'t working at all', sebep:'Not assigned or not activated.', cozum:'In order: definition → **assignment** ({{OB28}}/{{OBBH}}) → **activation** ({{GGB4}} level 1/2) → call-up point. Most cases get resolved at the third step.' },
      { mesaj:'Field ... is not allowed in this Boolean class', sebep:'The field can\'t be used at that call-up point ({{GB01}}).', cozum:'Choose a different call-up point. A header field can be read at the line-item point but not written.' },
      { mesaj:'Field ... cannot be substituted', sebep:'Closed to substitution in {{GB01}}.', cozum:'{{GB01}} can be changed but **shouldn\'t be, without an SAP note** — the closure may be deliberate.' },
      { mesaj:'The rule is also blocking normal postings, work has stopped', sebep:'The prerequisite is too broad or was left blank.', cozum:'Narrow the prerequisite. In an emergency, the rule can be temporarily stopped by setting **level 0** with {{GGB4}}.' },
      { mesaj:'The substitution is changing what the user entered', sebep:'There\'s no "if the field is blank" check in the prerequisite.', cozum:'Add this condition to the prerequisite; make the substitution only fill in blank fields.' },
      { mesaj:'The rule works on manual entries, doesn\'t work during a load', sebep:'Activation level **2** (excludes batch input).', cozum:'For critical controls, level **1** should be used — otherwise batch input is an **open door**.' },
    ],

    ipuclari:[
      '**Never skip the three steps:** define → assign → **activate**. ' +
      'The third one is the most commonly skipped.',
      '**Don\'t leave the prerequisite blank** — the rule runs on every posting and stops the system.',
      '**A negative test matters more than a positive one:** do normal postings go through?',
      'In substitution, add an **"if the field is blank"** condition to the prerequisite; don\'t overwrite what the user entered.',
      '**Document every substitution** — since it runs silently, the description field is the only trace.',
      'In an emergency, a rule can be temporarily stopped by setting **level 0** with {{GGB4}}.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'A header-point substitution can **change** these fields' },
      { tablo:'BSEG', ne:'A line-item-point substitution changes these fields' },
      { tablo:'ACDOCA', ne:'The substitution result reflects here too (S/4HANA)' },
      { tablo:'GB01', ne:'**Read** — which field can be used/changed' },
      { tablo:'T001', ne:'The rule is assigned to the company code' },
    ],

    commit:
      'Validation and substitution run **inside** the document posting — they aren\'t a separate step.\n\n' +
      '**The order matters:**\n\n' +
      '**1.** The user enters the fields, standard field checks run.\n' +
      '**2.** **Substitution** runs — fields are **changed**.\n' +
      '**3.** **Validation** runs — the **final, changed** state is checked.\n' +
      '**4.** Account determination, tax calculation, {{belge-bolme}} run.\n' +
      '**5.** The balance check.\n' +
      '**6.** The tables are written.\n\n' +
      '**The order of steps 2 and 3 matters:** validation sees ' +
      'the value **substitution changed it to** — not what the user entered.\n\n' +
      'This can lead to unexpected interactions: substitution changes a field, ' +
      'validation rejects that new value, and the user says ' +
      '*"but I never entered that value"* — and they\'d be right.',

    belgeNo:
      'If validation blocks the posting, **no number is consumed** — the document never gets created. ' +
      'This is different from {{guncelleme-hatasi}}, where a number is assigned but the document isn\'t created.\n\n' +
      'Substitution has no effect on the number; it only changes field content.',

    postingLogic:
      'How the rule engine works:\n\n' +
      '**1.** The call-up point is reached (header / line item / complete document).\n' +
      '**2.** Is a rule **assigned** to the company code? ({{OB28}}/{{OBBH}})\n' +
      '**3.** Is the rule **active**? ({{GGB4}} level 1 or 2)\n' +
      '**4.** Is it batch input and is the level **2**? → the rule is **skipped**.\n' +
      '**5.** The **prerequisite** is evaluated. If not met, the rule is skipped.\n' +
      '**6a.** In validation: the **check** is evaluated; if not met, the **message** is issued.\n' +
      '**6b.** In substitution: the target field is **changed**.\n\n' +
      'Steps 2, 3, and 5 are the **three possible answers** to *"why isn\'t the rule working?"* ' +
      'and diagnosis is done in this order.',

    belgeTuru:
      '{{belge-turu}} is the rules\' **most common prerequisite field**: ' +
      '*"if document type is SA, the text is mandatory"*, *"if it\'s KR, the reference is mandatory."*\n\n' +
      'Document type is also the cleanest way to narrow down which postings a rule applies to — ' +
      'it has fewer side effects than an account-based prerequisite.',

    numberRange:
      'Validation/substitution doesn\'t use a number range. ' +
      'When validation blocks a posting, **no number is consumed**, ' +
      'so no gap forms in the range.',

    accountDetermination:
      'The rule engine runs **before** account determination (substitution) and ' +
      'feeds into it.\n\n' +
      'The practical consequence matters: if substitution changes an account or the {{degerleme-sinifi}}, ' +
      '**the account-determination result changes too**. ' +
      'This is powerful but risky, and requires careful testing.',

    tur:
      '**All of it is configuration.** Validation and substitution definitions, assignments, and ' +
      'activation levels — all {{ozellestirme}}.\n\n' +
      'User exits, on the other hand, are **development objects** (`RGGBS000`, `RGGBR000`) and ' +
      'transport separately.\n\n' +
      'It doesn\'t produce transaction data; it only **affects** it.',

    transport:
      'Validation and substitution rules transport, but through **a different mechanism than ' +
      'standard configuration**: from the {{GGB0}}/{{GGB1}} menu, ' +
      'they\'re **explicitly added to a transport request**.\n\n' +
      '**The most common migration problem:** the rule transports, but the ' +
      '**activation level doesn\'t transport** or gets reset. ' +
      'In production the rule appears defined but doesn\'t run.\n\n' +
      'Also, if a user exit is used, its ABAP object transports **separately**; ' +
      'if one arrives and not the other, the rule throws an error.\n\n' +
      '**Migration check:** try a test posting in production that the rule should catch — ' +
      'is it blocked?',

    img:[
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Validations in Accounting Documents', not:'{{GGB0}} + {{OB28}}' },
      { yol:'SPRO → Financial Accounting → Special Purpose Ledger → Tools → Maintain Validation/Substitution/Rules → Maintain Substitution', not:'{{GGB1}}' },
      { yol:'SPRO → … → Validation/Substitution/Rules → Activate Validation/Substitution', not:'{{GGB4}} — **must not be skipped**' },
      { yol:'SPRO → … → Tools → Maintain User Exits', not:'{{GCX2}} — RGGBS000 / RGGBR000' },
    ],

    ekstra:[
      { ic:'⚖️', baslik:'Validation or substitution? — decided with one question', metin:
        'Choosing between the two comes down to **a single question**:\n\n' +
        '**"Should the user be able to make this posting at all?"**\n\n' +
        '**No → validation.** The posting is blocked, the user gets an error message and ' +
        'has to correct it.\n\n' +
        '**Yes, but the field should be a certain way → substitution.** The posting goes through, the field gets corrected automatically.\n\n' +
        '---\n\n' +
        '**The same need can be met with two different solutions — and their outcomes differ:**\n\n' +
        '*Need: "don\'t let the assignment field stay blank on bank postings."*\n\n' +
        '**Validation solution:** give an **error** if the field is blank. ' +
        'The user is forced to fill it in by hand. ' +
        '→ The user becomes **aware**, but every posting carries extra work.\n\n' +
        '**Substitution solution:** **write** the document date if the field is blank. ' +
        'The user does nothing. ' +
        '→ Zero extra work, but the user **never learns** what the field means.\n\n' +
        '**Which is right?** It depends. If the field carries a **decision** ' +
        '(which profit center), validation is appropriate — the user should make the decision. ' +
        'If the field carries **mechanical** information (date, reference), substitution is appropriate.\n\n' +
        '**Bad design:** filling a field that requires a decision using substitution. ' +
        'The system decides on the user\'s behalf and nobody notices.' },

      { ic:'🔇', baslik:'Substitution\'s silence — its biggest risk', metin:
        'Validation is **visible**: the user gets an error message, ' +
        'and knows there\'s a rule in the system.\n\n' +
        'Substitution is **invisible**: the user enters or leaves something blank, ' +
        'the system saves something else, and **no message appears**.\n\n' +
        '---\n\n' +
        '**This has three consequences:**\n\n' +
        '**1. User trust.** If a user opens a document with {{FB03}} and sees ' +
        'a value different from what they entered, they\'ll say *"that\'s not what I entered"* — ' +
        'and they\'d be right. Unexplained system behavior destroys trust.\n\n' +
        '**2. Institutional memory loss.** The consultant who built the substitution leaves, ' +
        'the rule keeps running. Years later ' +
        '*"why does this field always come out this way?"* is asked, and ' +
        '**nobody knows**. Nobody dares touch it either.\n\n' +
        '**3. Diagnostic difficulty.** If a field carries an unexpected value, ' +
        'substitution is the possibility that **comes to mind last**. ' +
        'Hours get spent looking in the wrong place.\n\n' +
        '---\n\n' +
        '**Three rules manage this risk:**\n\n' +
        '**a)** Substitution should only fill in **blank** fields — ' +
        'add a **"if the field is blank"** condition to the prerequisite.\n\n' +
        '**b)** Every substitution\'s **description should be written in business language**; ' +
        'because it runs silently, that field is the only trace.\n\n' +
        '**c)** A **list** of active substitutions should be kept in the project documentation and ' +
        'carried over at handover.\n\n' +
        'Applied, these three rules make substitution a powerful tool. ' +
        'Not applied, it becomes **technical debt**.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Leaving the prerequisite blank stops the system', metin:
        'The prerequisite determines **under what condition** the rule runs. ' +
        'If left blank, the rule runs on **every posting**.\n\n' +
        'In validation the consequence is severe: if a *"amount ≤ 50,000"* check ' +
        'is defined without a prerequisite, **all postings** become subject to the 50,000 limit and ' +
        'the company effectively can\'t operate.\n\n' +
        'In substitution the outcome is more insidious: a field gets changed on every posting and ' +
        'nobody understands why.\n\n' +
        '**Emergency fix:** the rule can be stopped instantly by setting the activation level to **0** ' +
        'with {{GGB4}}. This is the rule engine\'s ' +
        '**most valuable safety valve** — there\'s no need to delete the rule.\n\n' +
        '**Permanent fix:** narrow the prerequisite and run a **negative test** — ' +
        'do normal postings go through?' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Validation and substitution **haven\'t changed** in S/4HANA: {{GGB0}}, {{GGB1}}, {{GGB4}}, ' +
      '{{OB28}}, {{OBBH}} all work the same way. ' +
      'What changed is the addition of **modern alternatives** that do the same job.',

    eccFarklari:[
      { konu:'Validation / substitution', ecc:'{{GGB0}} / {{GGB1}}', s4:'**Unchanged**' },
      { konu:'Activation', ecc:'{{GGB4}}', s4:'**Unchanged**' },
      { konu:'Field restrictions', ecc:'{{GB01}}', s4:'**Unchanged**' },
      { konu:'Modern alternative', ecc:'None', s4:'**BAdIs** and extension points' },
      { konu:'Substitution result', ecc:'{{BSEG}}', s4:'{{BSEG}} + {{ACDOCA}}' },
      { konu:'Interaction with document splitting', ecc:'Exists in New G/L', s4:'Same — substitution runs **before splitting**' },
    ],

    universalJournal:
      'The fields substitution changes reflect into {{ACDOCA}} too — ' +
      'because substitution runs **at the moment of posting**, before {{ACDOCA}} is written.\n\n' +
      'Practical consequence: a substitution that changes the {{kar-merkezi}} or segment field ' +
      'also **affects** the {{belge-bolme}} result. ' +
      'The order is: substitution → validation → account determination → **document splitting** → writing.\n\n' +
      'For this reason, in a setup that does segment reporting, substitutions that change dimension fields ' +
      'need to be **tested carefully** — the splitting result can change unexpectedly.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'{{GGB0}}, {{GGB1}}, {{GGB4}}, {{OB28}}, {{OBBH}} **were not removed**' },
    ],

    fiori:[
      { ad:'Manage Journal Entries', aciklama:'Validation messages appear here too.' },
      { ad:'Custom Fields and Logic', aciklama:'**The modern alternative** — adding fields and ' +
             'defining logic without writing code, in cloud and on-premise alike.' },
      { ad:'Manage Your Solution', aciklama:'Access to configuration and extension points.' },
    ],

    compatibilityViews:[
      '{{GB01}} — **remains a physical table**.',
      'Because the rule engine runs at posting time, it\'s **unaffected** by {{BSEG}} turning into a view — ' +
      'substitution is active at the moment of writing.',
      'User exits (`RGGBS000`) keep working.',
    ],

    performans:
      'Validation and substitution run on **every posting** — this is a point that ' +
      'deserves attention from a performance standpoint.\n\n' +
      'Simple field comparisons are fast. But if a **user exit** performs ' +
      'a table read, that read repeats on every document posting.\n\n' +
      'On systems with heavy posting volume, this adds up. ' +
      '**Good practice:** if a user exit needs to do a table read, ' +
      'the result should be cached in memory.',

    bestPractices:[
      'During migration, **take inventory of active rules** — substitutions especially. ' +
      'Undocumented ones get lost or cause surprises during the migration.',
      'Verify that activation levels **transported correctly** to production; ' +
      'this is the most common migration problem.',
      'For new requirements, evaluate the **Custom Fields and Logic** alternative — ' +
      'it\'s more visible and more upgrade-resistant.',
      'Review rules that use a user exit; ' +
      'can they be moved to a BAdI or a standard solution?',
      'Substitutions that change dimension fields ({{kar-merkezi}}, segment) should be ' +
      '**retested** together with {{belge-bolme}}.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'Why does the profit center always come out the same? — an undocumented substitution',
    hikaye:
      'At **Batı Gıda Inc.**, a controller notices something odd: ' +
      'some of the expenses the Marketing department enters come out with profit center ' +
      '**PC-1000 (Production)** — even though the users are entering PC-2000 (Sales).\n\n' +
      'The users insist: *"We enter PC-2000, and once it\'s saved it becomes PC-1000."*\n\n' +
      'The trial balance is correct, the document is balanced, there\'s no error message. ' +
      'The system administrator says *"the user is entering it wrong."*\n\n' +
      'This scenario shows how an undocumented substitution ran silently for years, ' +
      'and how it got diagnosed.',
    veriler:[
      { k:'Company code', v:'1000 · period 11/2027' },
      { k:'Symptom', v:'PC-2000 entered → **PC-1000** saved' },
      { k:'Affected', v:'Only postings to account **770300**' },
      { k:'Error message', v:'**None**' },
      { k:'Since when', v:'Unknown' },
    ],

    adimlar:[
      { baslik:'The symptom is confirmed — is the user right?', tcode:'FB03',
        aciklama:'A suspicious document is opened and its change trail is checked.',
        girdi:[
          { alan:'Document', deger:'1900007742 · 770300 expense · 45,000 TRY' },
          { alan:'Profit center saved', deger:'**PC-1000**' },
          { alan:'Environment → Changes', deger:'**No post-posting change**' },
          { alan:'Conclusion', deger:'The value was written this way **at the moment of posting**' },
        ],
        not:'{{degisiklik-belgesi}} is empty — meaning nobody changed it afterward.\n\n' +
             'So the value was written as PC-1000 **at the moment of posting**. ' +
             'Two possibilities: the user genuinely entered it that way, ' +
             'or **a rule changed it**.\n\n' +
             'Since the users are insistent, the second possibility is investigated.' },

      { baslik:'A pattern is searched for — which postings are affected?', tcode:'FBL3N',
        aciklama:'An attempt is made to find the common thread among the affected postings.',
        girdi:[
          { alan:'Account 770300 — all items', deger:'184 items' },
          { alan:'Profit center PC-1000', deger:'**184 items — all of them**' },
          { alan:'Other expense accounts (770100, 770200)', deger:'Profit centers are **mixed** — normal' },
          { alan:'Pattern', deger:'Only account **770300**, **without exception** PC-1000' },
        ],
        not:'**The pattern is very clear:** on a single account, the same value with no exception.\n\n' +
             'User error can\'t be this consistent — 184 items with ' +
             'no exception at all points to the existence of **a rule**.\n\n' +
             'Because it\'s account-based, the prerequisite is suspected to be the account.' },

      { baslik:'The substitution is searched for', tcode:'OBBH',
        aciklama:'A check is made for whether a substitution is assigned to the company code.',
        girdi:[
          { alan:'Company code', deger:'1000' },
          { alan:'Call-up point', deger:'**Line item**' },
          { alan:'Assigned substitution', deger:'**`Z_PRCTR_DERIVE`** — assigned' },
          { alan:'Activation level', deger:'**1** (active)' },
        ],
        not:'**A substitution is found.** Assigned to the company code and active.\n\n' +
             'This was the **last** place anyone thought to look — ' +
             'a concrete example of how substitution\'s silence makes diagnosis harder.\n\n' +
             'Even the system administrator didn\'t know such a rule existed.' },

      { baslik:'The rule is examined', tcode:'GGB1',
        aciklama:'What the substitution does and why it was set up is investigated.',
        girdi:[
          { alan:'Substitution name', deger:'`Z_PRCTR_DERIVE`' },
          { alan:'**Description**', deger:'**Blank** — no description was ever written' },
          { alan:'Prerequisite', deger:'`BSEG-HKONT` = `0000770300`' },
          { alan:'Target field', deger:'`BSEG-PRCTR`' },
          { alan:'Value', deger:'Fixed **PC-1000**' },
          { alan:'"If the field is blank" condition', deger:'**MISSING** — it **overwrites** what the user entered' },
        ],
        not:'**Two design mistakes together:**\n\n' +
             '**1. The description is blank.** Why the rule was set up is **written nowhere**. ' +
             'Because substitution runs silently, the description field was the only trace, and it was blank too.\n\n' +
             '**2. No blank/filled check.** The rule **overwrites** even when ' +
             'the field is already filled. The PC-2000 the user entered gets overwritten.\n\n' +
             'This second mistake is the direct cause of the user complaint.' },

      { baslik:'The rule\'s history is investigated', tcode:'SE16N',
        aciklama:'When and why was the rule set up?',
        girdi:[
          { alan:'Transport request record', deger:'2024 · a former consulting firm' },
          { alan:'Project documentation', deger:'**No record** of the substitution' },
          { alan:'Likely reason', deger:'At the time, 770300 was used **only by Production**' },
          { alan:'What changed?', deger:'In 2026 the account was **also opened to Marketing** — the rule was never updated' },
        ],
        not:'**The rule was correct when it was set up.** In 2024, account 770300 was ' +
             'used only by Production; automatically filling in the profit center ' +
             'reduced the workload for users.\n\n' +
             'In 2026 the account was also opened to Marketing, but **the rule was never updated**. ' +
             'From that day on, the profit center Marketing entered has been getting overwritten.\n\n' +
             'This is **exactly the same class of error** as the aging {{OKB9}} default in ' +
             '{{konu:cost-center}}: a rule was correct when it was set up, the organization changed, ' +
             'and the rule was never updated.' },

      { baslik:'The fix — the rule is improved', tcode:'GGB1',
        aciklama:'The rule isn\'t removed — it\'s made to work correctly.',
        girdi:[
          { alan:'Added to the prerequisite', deger:'**`BSEG-PRCTR` = blank**' },
          { alan:'Effect', deger:'Only fills in a **blank** field; **doesn\'t overwrite** what\'s entered' },
          { alan:'Description written', deger:'"Derive PC-1000 on account 770300 if the profit center is blank (a 2024 decision, ' +
                                          'a blank-check added in 2027)"' },
          { alan:'Test', deger:'PC-2000 entered → **preserved** ✓ · left blank → PC-1000 ✓' },
        ],
        fis:{ baslik:'Test posting — after the fix', belgeTuru:'KR', tarih:'25.11.2027',
          satirlar:[
            { hesap:'770300', ad:'Digital marketing — the user entered **PC-2000**', borc:45000,
              not:'What was saved: **PC-2000** ✓ — no longer overwritten' },
            { hesap:'320', ad:'Trade payables', alacak:45000 },
          ], not:'The value the user entered was **preserved**.\n\n' +
                 'When left blank, the rule still kicks in and writes PC-1000 — ' +
                 'meaning the original benefit **wasn\'t lost**.\n\n' +
                 '**The right design:** substitution fills the gap, it doesn\'t override the decision.' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'`PRCTR` = PC-2000 — the value the user entered' },
          { tablo:'ACDOCA', ne:'The same value reflected here' },
        ],
        not:'**Historical postings weren\'t corrected.** Postings from 2026–2027 that ' +
             'landed on the wrong profit center still stand.\n\n' +
             'Fixing them requires a transfer inside CO with {{KB11N}} ' +
             '(see {{konu:cost-center}}) — FI is already correct.' },

      { baslik:'Permanent measures', tcode:'GGB1',
        aciklama:'Three measures so this class of error doesn\'t repeat.',
        girdi:[
          { alan:'Measure 1', deger:'**All active substitutions were listed** — 7 were found, 4 had a blank description' },
          { alan:'Measure 2', deger:'All of them had a **description written** in business language' },
          { alan:'Measure 3', deger:'The substitution list was **added to the project documentation**; to be carried over at handover' },
          { alan:'Measure 4', deger:'New substitution rule standard: **description mandatory** + **"if the field is blank" condition** standard' },
        ],
        not:'**The first measure turned up the most.** There were 7 active substitutions and ' +
             'the system administrator **didn\'t know about any of them**.\n\n' +
             'Four had a blank description; two of them were also overwriting what the user entered. ' +
             'One was no longer needed (the account had been closed) and **was removed**.\n\n' +
             'This inventory exercise is proof of why the substitution topic ' +
             '**must be documented**.' },
    ],

    sonuc:
      '**An undocumented substitution silently overwrote what the user entered for two years.**\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. Substitution is silent and comes to mind last during diagnosis.** ' +
      'Validation gives an error message; substitution **says nothing at all**. ' +
      'The user enters one value, the system saves another. ' +
      'In this case, even the system administrator didn\'t know such a rule existed — ' +
      '**not a single one of 7 active substitutions**.\n\n' +
      '**2. Substitution should only fill in blank fields.** ' +
      'If a **"if the field is blank"** condition isn\'t added to the prerequisite, the rule ' +
      '**overwrites** the value the user deliberately entered. The user says *"that\'s not what I entered"* and is right. ' +
      'This single condition was the direct fix for the complaint — and it preserved the original benefit too.\n\n' +
      '**3. The description field is effectively mandatory.** ' +
      'Because substitution runs silently, the description is the **only trace**. ' +
      'If left blank, the rule turns into system behavior nobody understands the reason for, and ' +
      'nobody dares touch it. Four rules in the inventory had a blank description.\n\n' +
      '**4. Rules age when the organization changes.** ' +
      'This rule was **correct** in 2024 — the account was used only by Production. ' +
      'In 2026 the account was opened to Marketing, and the rule was never updated. ' +
      'This is **exactly the same class of error** as the aging {{OKB9}} default in ' +
      '{{konu:cost-center}}: the rule was correct, the world changed, the rule kept running as-is. ' +
      '**The active rule inventory needs to be reviewed periodically.**',
  },

  },
});
