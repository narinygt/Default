/* ==========================================================================
   content/fi-en/document-parking.js — English body for "Document Parking"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'document-parking',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Parking is recording a document in the system **without posting it**. ' +
      'It gets a document number, its line items are stored, work can continue on it — ' +
      'but it **doesn\'t affect the trial balance**, doesn\'t hit account balances, and doesn\'t show up in reports.\n\n' +
      'A parked document sits in the {{VBKPF}} and {{VBSEG}} tables. ' +
      'Once it\'s posted ({{FBV0}}), the data moves to {{BKPF}}/{{BSEG}} and ' +
      '**the document number assigned at parking is preserved**.\n\n' +
      'There are two core reasons to use it:\n\n' +
      '**1. The four-eyes principle** — the person who enters it and the person who approves it should be different.\n' +
      '**2. Incomplete information** — the document isn\'t complete yet, but it shouldn\'t get lost; it gets finished later.\n\n' +
      'Parking\'s sibling is the **hold** function, and the two get confused: ' +
      'a held document is **personal**, no one else can see it, and it **leaves no audit trail**.',

    neden:
      '**Internal control.** The person who enters an invoice not being the one who approves it is the most basic accounting control.\n\n' +
      '**Being able to work with incomplete information.** The cost center isn\'t known yet, approval is pending — the document is parked so it isn\'t lost.\n\n' +
      '**Separation of authorization.** Data entry can be left to lower-authority staff, posting to someone with authority.\n\n' +
      '**Batch review.** Documents parked during the day are reviewed as a batch at day\'s end and then posted.\n\n' +
      '**Lowering the cost of errors.** A wrongly parked document can **be deleted**; a wrongly posted document has to be reversed, and leaves a trail.',

    sirketOnemi:
      'Parking is **the most practical tool in SAP for the internal control system**. ' +
      'Auditors ask "are invoice entry and approval done by different people?" — this is the system-level answer to that question.\n\n' +
      'The critical point for a consultant is this: **parking by itself does not mean four-eyes.** ' +
      'If the same user can both park and post, ' +
      'the mechanism turns into nothing more than a delay. ' +
      'The separation is achieved through **authorization**, not through the parking feature.\n\n' +
      'The distinguishing question is: **"What\'s the difference between park and hold?"** ' +
      'The correct answer: a parked document **gets a number, others can see it, ' +
      'it can be reported on, and it leaves an audit trail**; a held document is personal, ' +
      'gets no number, and leaves no trail. That\'s why **hold is not an internal control tool**.',

    gercekHayat:
      'At a company, purchase invoices are entered by an accounting assistant. ' +
      'The assistant also has posting authorization.\n\n' +
      'The audit report writes up this finding: *"Invoice entry and approval are concentrated in the same person; ' +
      'the principle of segregation of duties has been violated."*\n\n' +
      'As a fix, parking is rolled out: the assistant now **parks** the invoice with {{FV60}}, ' +
      'and the accounting manager reviews and **posts** it with {{FBV0}}.\n\n' +
      'But at the end of the first month, the auditor looks again and writes up the same finding. Why?\n\n' +
      'Because the assistant\'s authorization never changed — they can still both park and ' +
      'post. On busy days they post the very document they parked themselves.\n\n' +
      '**Lesson:** parking offers a *possibility*; **authorization** is what builds the control. ' +
      'The correct setup: the assistant has {{FV60}} authorization, and **not** {{FBV0}}.',

    muhasebeMantigi:
      'Parking\'s accounting logic is about **accrual timing**: ' +
      'a parked document is **not yet an accounting event**.\n\n' +
      'An invoice needs to be recorded the moment it arrives — but ' +
      '"the moment it needs to be recorded" and "the moment it can be recorded" can differ: ' +
      'the cost center isn\'t settled, the amount is disputed, approval is pending.\n\n' +
      'Parking fills that gap **without losing the document**: the information is in the system, ' +
      'it can be searched and reported on — but it hasn\'t entered the financial statements.\n\n' +
      '**Critical consequence:** at period end, parked documents are **not in the trial balance**. ' +
      'If they belong to that period\'s expenses, the period closes **incomplete**. ' +
      'That\'s why the closing checklist should include a "are there any parked documents left?" ' +
      'item ({{FBV3}} or the {{FBL3N}} parking report).',

    kavramlar: ['park-etme', 'dort-goz', 'belge-turu', 'numara-araligi', 'belge-denkligi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The parking process has three stages: **park → review → post**. ' +
      'In between, the document can be changed, completed, or deleted. ' +
      'There\'s an optional fourth stage: **an approval workflow** ({{FBV4}}).',

    roller:[
      { rol:'Accounting assistant', gorev:'Parks the invoice ({{FV60}} / {{FV50}}). **Should not have posting authorization.**' },
      { rol:'Department owner', gorev:'Completes the missing information (cost center, description) — {{FBV2}}.' },
      { rol:'Accounting manager', gorev:'Reviews ({{FBV3}}) and posts ({{FBV0}}).' },
      { rol:'Approver (if a workflow exists)', gorev:'Gives approval based on the amount limit ({{FBV4}}).' },
      { rol:'General ledger accounting', gorev:'Confirms at period end that no parked documents remain.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The journey of a parked document',
      adimlar:[
        { ic:'📥', rol:'Assistant', baslik:'The document is parked ({{FV60}})',
          aciklama:'The document **gets a number**, written into {{VBKPF}}/{{VBSEG}}. ' +
                   '**Doesn\'t affect the trial balance.** It may not even need to balance.',
          cikti:'Parked document', ok:'if something is missing' },
        { ic:'✏️', rol:'Department owner', baslik:'Missing pieces are filled in ({{FBV2}})',
          aciklama:'Cost center, description, amount correction. ' +
                   'The document can be **freely changed** — because it isn\'t posted yet.',
          cikti:'Complete document', ok:'if approval is needed' },
        { ic:'✓', rol:'Approver', baslik:'Approval is given ({{FBV4}}) — *optional*',
          aciklama:'An approval flow based on the amount limit. A document without approval can\'t be posted.',
          cikti:'Approved document', ok:'review' },
        { ic:'🔍', rol:'Manager', baslik:'It\'s reviewed ({{FBV3}})',
          aciklama:'A read-only view. **The moment the four-eyes principle is applied.**',
          cikti:'Reviewed document', ok:'once approved' },
        { ic:'📤', rol:'Manager', baslik:'It\'s posted ({{FBV0}})',
          aciklama:'{{VBKPF}}→{{BKPF}}, {{VBSEG}}→{{BSEG}}. ' +
                   '**The same document number is kept.** Now it\'s in the trial balance.',
          cikti:'Accounting document', ok:'if it\'s wrong' },
        { ic:'🗑️', rol:'Manager', baslik:'Or it\'s deleted ({{FBV0}} → delete)',
          aciklama:'A wrongly parked document **can be deleted** — no reversal is needed, ' +
                   'and it leaves no trail. That\'s not possible for a posted document.',
          cikti:'Deleted document' },
      ],
    },

    adimlar:[
      { rol:'Assistant', eylem:'Parks the invoice', sistem:'{{FV60}} vendor · {{FV50}} G/L' },
      { rol:'System', eylem:'Assigns a document number', sistem:'{{VBKPF}} — from the normal range' },
      { rol:'Department owner', eylem:'Completes what\'s missing', sistem:'{{FBV2}}' },
      { rol:'Approver', eylem:'Gives approval (if applicable)', sistem:'{{FBV4}}' },
      { rol:'Manager', eylem:'Reviews the document', sistem:'{{FBV3}} — read-only' },
      { rol:'Manager', eylem:'Posts it', sistem:'{{FBV0}} → {{BKPF}}/{{BSEG}}' },
      { rol:'Manager', eylem:'Or deletes it', sistem:'{{FBV0}} → delete · **leaves no trail**' },
      { rol:'General ledger accounting', eylem:'Period-end check', sistem:'Are there any parked documents left?' },
    ],

    veriAkisi:{
      nereden:'The document data the user enters; the document type and number range; ' +
              'an approval workflow definition, if one exists.',
      nereye:'{{VBKPF}}/{{VBSEG}} during parking; {{BKPF}}/{{BSEG}}/{{ACDOCA}} at posting.',
      tetikleyen:'The parking transaction ({{FV50}}/{{FV60}}) and posting ({{FBV0}}).',
      sonraki:'The normal document lifecycle: clearing, reversal, reporting.',
    },

    notlar:[
      { tip:'warn', baslik:'A parked document is not in the trial balance at period end', metin:
        'This is parking\'s most commonly overlooked side effect.\n\n' +
        '40 invoices parked in December sit in {{VBKPF}} but ' +
        'are **not in the trial balance**. If they belong to December\'s expenses, ' +
        'December closes **incomplete** and the expense slips into the next period.\n\n' +
        'A sneakier variant: the document is parked in December, posted in January. ' +
        'The posting date is decided **at the moment of posting** — ' +
        'even if the date written on the document is December, if the period is closed the posting falls into January.\n\n' +
        '**Mitigation:** add "are there any parked documents?" to the closing checklist. ' +
        'It\'s checked with {{FBV3}} or the parked-document report; ' +
        'the ones belonging to the period are posted before the period closes.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Parking\'s accounting effect happens **in two stages**: no effect at all at the moment of parking, ' +
      'and a normal document posting once it\'s posted. ' +
      'The difference is **when** the document enters the financial statements.',

    etkilenenHesaplar:[
      { hesap:'During parking — **none**', tur:'No effect', neden:'{{VBKPF}}/{{VBSEG}} isn\'t an accounting table; the trial balance is unaffected.' },
      { hesap:'320 Trade payables', tur:'Balance sheet — Liability', neden:'Behaves like a normal vendor invoice once posted.' },
      { hesap:'770 / 153 etc. expense or inventory', tur:'Variable', neden:'The invoice\'s offsetting line — created at posting.' },
      { hesap:'191 Deductible VAT', tur:'Balance sheet — Asset', neden:'The tax is also written to {{BSET}} at the moment of posting.' },
    ],

    fisler:[
      { baslik:'The moment of parking ({{FV60}}) — **no accounting entry**',
        belgeTuru:'KR (park)', tarih:'20.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'Document 1900008801 parked — sitting in {{VBKPF}}/{{VBSEG}}', borc:0, alacak:0,
            not:'The trial balance is **unaffected**' },
        ],
        not:'A document number **was assigned** (1900008801) but there\'s **no accounting entry**.\n\n' +
             'If you search for the document in {{FB03}} it won\'t be found — it\'s viewed with {{FBV3}}. ' +
             'It doesn\'t show up **anywhere** — not in balances, not in the trial balance, not in {{FBL1N}}.\n\n' +
             '*(The 0/0 shown in the table is there to emphasize that the entry has no G/L effect.)*' },

      { baslik:'Posting ({{FBV0}}) — the real entry, **with the same number**',
        belgeTuru:'KR', tarih:'22.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:85000, not:'The cost center was completed while parked' },
          { hesap:'191', ad:'Deductible VAT', borc:17000 },
          { hesap:'320', ad:'Trade payables — V-3012', alacak:102000 },
        ],
        not:'Document number **1900008801** — the **same** number assigned when it was parked.\n\n' +
             'This is one of parking\'s important features: the number is reserved at parking and ' +
             'kept at posting. So a reference given out during the parked stage ' +
             '(say, a number communicated to the vendor) stays valid.\n\n' +
             '**The posting date is decided at the moment of posting** — not the date it was parked on.' },

      { baslik:'An unbalanced park — the system allows it',
        belgeTuru:'KR (park)', tarih:'20.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Expense — partially entered', borc:85000 },
          { hesap:'320', ad:'Trade payables', alacak:60000, not:'**Missing** — a 25,000 TRY gap' },
        ],
        not:'**A parked document is not required to balance.** ' +
             'The system warns but still saves it.\n\n' +
             'The reason: parking exists so "half-finished work doesn\'t get lost." ' +
             'A user is entering an invoice, the phone rings, they park where they left off, ' +
             'then continue later.\n\n' +
             '**But balancing is mandatory at posting** ({{belge-denkligi}}): ' +
             '{{FBV0}} **rejects** an unbalanced document with an error. ' +
             'This is the concrete example of "parking is flexible, posting is strict."' },

      { baslik:'A wrongly parked document — it **gets deleted**, no reversal needed',
        belgeTuru:'—', tarih:'21.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'Document 1900008802 deleted — no accounting trail', borc:0, alacak:0,
            not:'Removed from {{VBKPF}}' },
        ],
        not:'An unposted document **can be deleted** and leaves **no accounting trail at all** behind it.\n\n' +
             'A posted document, on the other hand, cannot be deleted — it\'s **reversed** with {{FB08}}, and ' +
             'two entries (the original + the reversal) stay permanently visible in the trial balance.\n\n' +
             'This difference is one of parking\'s real advantages: **the cost of a mistake is low.** ' +
             'Parking a questionable document instead of posting it ' +
             'leaves the door open for a clean exit later.\n\n' +
             '*(The document number is wasted — a gap forms in the number range, which is normal.)*' },
    ],

    tHesaplar:[
      { hesap:'Trade payables — park stage', kod:'320',
        borc:[],
        alacak:[],
        not:'**No movement at all** — parking doesn\'t affect the trial balance' },
      { hesap:'Trade payables — after posting', kod:'320',
        borc:[],
        alacak:[{ ad:'Document 1900008801', tutar:102000 }],
        not:'Movement only appears after {{FBV0}}' },
      { hesap:'General administrative expense', kod:'770',
        borc:[{ ad:'Posted invoice', tutar:85000 }],
        alacak:[],
        not:'The expense is also created at the moment of posting' },
    ],

    notlar:[
      { tip:'tip', baslik:'Parking is flexible, posting is strict', metin:
        'Parking\'s design philosophy is this: **the rules relax at the parking stage ' +
        'and are fully enforced at posting.**\n\n' +
        'At the parking stage:\n' +
        '• The document **can be unbalanced**\n' +
        '• Mandatory fields can be left blank\n' +
        '• It can be parked even if the period is closed\n' +
        '• It can be freely changed or deleted\n\n' +
        'At the posting stage:\n' +
        '• Balancing is **mandatory**\n' +
        '• Mandatory fields must be filled in\n' +
        '• The period **must be open**\n' +
        '• It can no longer be changed, only reversed\n\n' +
        'This distinction is deliberate and correct: parking is a **workspace**, ' +
        'not the ledger. It gives the user a place to hold half-finished work ' +
        'while protecting the ledger\'s integrity.\n\n' +
        '**Practical consequence:** the assumption "it was parked, so it must be correct" is wrong. ' +
        'A parked document is not guaranteed to be postable.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'SAP has **three ways** to hold a document temporarily, and ' +
      'the three are frequently confused: **parking**, **hold**, and **classic parked documents (Enjoy park)**. ' +
      'A parked document also has its own set of states.',

    liste:[
      { ad:'Parking',
        aciklama:'The document gets a number, is written into {{VBKPF}}, **others can see it**, ' +
                 'it can be reported on, and it leaves an audit trail.',
        neZaman:'When the four-eyes principle is required; when incomplete information will be completed later.',
        ornek:'{{FV60}} vendor invoice · {{FV50}} G/L posting. **This is an internal control tool.**',
        tcodes:['FV50','FV60','FBV0'] },

      { ad:'Hold',
        aciklama:'The document is **personal**: only the user who held it can see it. ' +
                 'It **gets no number** and **leaves no audit trail**.',
        neZaman:'A user temporarily saving their own work in progress.',
        ornek:'The "Hold" button on the entry screen. **This is NOT an internal control tool** — ' +
              'it can\'t be used for four-eyes.' },

      { ad:'Parked Document',
        aciklama:'A document parked from the classic screens ({{FBV1}}).',
        neZaman:'On installations still using the old screens.',
        ornek:'Produces the same result as the Enjoy screens ({{FV60}}); ' +
              'both write to {{VBKPF}}.' },

      { ad:'Complete',
        aciklama:'All mandatory fields are filled in, it balances — ready to be posted.',
        neZaman:'When the document has been fully entered.',
        ornek:'{{FBV0}} can post it directly.' },

      { ad:'Incomplete',
        aciklama:'Mandatory fields are missing, or it doesn\'t balance.',
        neZaman:'On entries that were left half-finished.',
        ornek:'{{FBV0}} **rejects** it; it must first be completed with {{FBV2}}.' },

      { ad:'Subject to Release',
        aciklama:'Tied to an approval workflow; can\'t be posted without approval.',
        neZaman:'When an amount limit is exceeded; on capital expenditures.',
        ornek:'Approved with {{FBV4}}. Approval levels are defined based on amount.',
        tcodes:['FBV4'] },

      { ad:'Mass Parking',
        aciklama:'Bulk parking of documents arriving through an interface.',
        neZaman:'For data transfers from an external system; so they don\'t get posted before passing review.',
        ornek:'The transfer program parks the documents, and accounting reviews and posts them in a batch.' },

      { ad:'Delete Parked Document',
        aciklama:'The document is deleted entirely; **no accounting trail remains**.',
        neZaman:'For wrongly parked documents.',
        ornek:'{{FBV0}} → delete. The number is wasted (a gap in the range is normal).' },
    ],

    karsilastirmaBasliklar:['Parking', 'Hold'],
    karsilastirma:[
      ['Document number', '**Gets one** — from the normal range', 'Doesn\'t get one — a temporary key'],
      ['Who can see it', '**Everyone** (per authorization)', 'Only the **user who held it**'],
      ['Table', '{{VBKPF}} / {{VBSEG}}', 'Temporary tables'],
      ['Can it be reported on', '**Yes**', 'No'],
      ['Audit trail', '**Leaves one**', 'Doesn\'t leave one'],
      ['Suitable for four-eyes', '**Yes**', '**No**'],
      ['Approval workflow', 'Supported ({{FBV4}})', 'None'],
      ['Typical purpose', 'Internal control, incomplete information', 'Personal, temporary storage'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FV60', ad:'Park a vendor invoice',
        amac:'Records a vendor invoice without posting it.',
        neZaman:'On installations where invoice entry and approval are separated; when information is incomplete.',
        adimlar:[
          { baslik:'Enter the vendor, amount, and date',
            aciklama:'The same screen as {{FB60}}; the difference is in **the save behavior**.' },
          { baslik:'Enter the line items',
            aciklama:'Can be left incomplete — balancing is **not required** for parking.' },
          { baslik:'**Park** (not Save)',
            aciklama:'A document number is assigned, written into {{VBKPF}}/{{VBSEG}}. ' +
                     'The trial balance is **unaffected**.' },
        ],
        ekranAkisi:[
          { ekran:'Basic data', islem:'Vendor V-3012 · amount 102,000 · tax V1' },
          { ekran:'Line items', islem:'770 expense 85,000 · cost center **blank**' },
          { ekran:'Saving', islem:'**Park** → document 1900008801' },
        ],
        alanlar:{
          zorunlu:['Vendor','Company code','Date'],
          opsiyonel:['Line items (may be incomplete)','Cost center','Text'] },
        hatalar:[
          { mesaj:'Document type ... not allowed for parking', sebep:'The document type isn\'t defined as parkable.', cozum:'Check in {{OBA7}} whether the document type is parkable.' },
        ],
        ipucu:'{{FB60}} and {{FV60}} are **the same screen**; the only difference is the save behavior. ' +
              'In fact, "Park" can also be chosen from the {{FB60}} screen. ' +
              'The separate transaction code exists **for authorization purposes**: ' +
              'the assistant is given {{FV60}} but not {{FB60}} — ' +
              'this way, direct posting is blocked.',
        ilgili:['FV50','FBV0','FBV2','FB60'] },

      { kod:'FV50', ad:'Park a G/L document',
        amac:'Parks a document containing only general ledger accounts.',
        neZaman:'For reclass, accrual, and correction postings.',
        adimlar:[
          { baslik:'Enter the company code and date' },
          { baslik:'Enter the account and debit/credit lines' },
          { baslik:'Park' },
        ],
        ipucu:'Especially suited to accrual and correction postings: ' +
              'it\'s parked until the calculation is checked, ' +
              'then posted once verified.\n\n' +
              'It\'s good practice to park period-end corrections first and review them ' +
              'as a batch before posting.',
        ilgili:['FV60','FBV0','FB50'] },

      { kod:'FBV0', ad:'Post or delete a parked document — **the critical transaction**',
        amac:'Posts a parked document (moving it to {{BKPF}}/{{BSEG}}) or deletes it.',
        neZaman:'After review; the step where the four-eyes principle is applied.',
        adimlar:[
          { baslik:'Enter the document number' },
          { baslik:'Review the document',
            aciklama:'Line items, amounts, and accounts are checked.' },
          { baslik:'**Post** or **Delete**',
            aciklama:'Posting: {{VBKPF}}→{{BKPF}}, the same number is kept. ' +
                     'Deleting: the document is removed entirely, **no trail remains**.' },
          { baslik:'Check the posting date',
            aciklama:'It\'s decided **at the moment of posting**; the period must be open.' },
        ],
        alanlar:{
          zorunlu:['Document number','Company code','Fiscal year'],
          opsiyonel:['Posting date correction'] },
        hatalar:[
          { mesaj:'Document is not complete / balance not zero', sebep:'The parked document is unbalanced or missing mandatory fields.', cozum:'Complete it with {{FBV2}}. **Parking is flexible, posting is strict.**' },
          { mesaj:'Posting period ... is not open', sebep:'The document\'s date falls in a closed period.', cozum:'Open the period with {{OB52}}, or change the posting date. **This error is common when a document was parked in December and posted in January.**' },
          { mesaj:'Document is subject to release', sebep:'An approval workflow is defined and approval hasn\'t been given.', cozum:'Get it approved with {{FBV4}}.' },
          { mesaj:'You are not authorized to post this document', sebep:'The user has no posting authorization.', cozum:'**This is the correct behavior** — it means the four-eyes principle is working.' },
        ],
        ipucu:'**The only way to verify that the four-eyes principle is really working:** ' +
              'check that the user who parked the document has no {{FBV0}} authorization.\n\n' +
              'If the same user holds both {{FV60}} and {{FBV0}} authorization, ' +
              'the mechanism is only a delay, not a control. ' +
              'This is exactly where an auditor will look.',
        ilgili:['FV60','FBV2','FBV3','FBV4'] },

      { kod:'FBV2', ad:'Change a parked document',
        amac:'Changes a parked document\'s line items, amounts, and fields.',
        neZaman:'While completing missing information; while correcting an error.',
        adimlar:[
          { baslik:'Enter the document number' },
          { baslik:'Change / add / delete line items',
            aciklama:'**Freely** — the document isn\'t posted yet.' },
          { baslik:'Park it again' },
        ],
        ipucu:'On a posted document, only a handful of fields can be changed ' +
              '(text, payment terms). On a parked document, **everything** can be changed: ' +
              'the account, the amount, the number of lines.\n\n' +
              'This flexibility comes from parking\'s nature as a "workspace."',
        ilgili:['FBV0','FBV3','FV60'] },

      { kod:'FBV3', ad:'Display a parked document',
        amac:'Shows a parked document in a read-only view.',
        neZaman:'Pre-approval review; period-end checking.',
        adimlar:[
          { baslik:'Enter the document number' },
          { baslik:'Review the line items and status' },
        ],
        ipucu:'**{{FB03}} can\'t find a parked document** — it only looks at {{BKPF}}. ' +
              'A parked document is viewed with {{FBV3}}.\n\n' +
              'This is the most common reason behind the complaint "I have a document number but ' +
              'can\'t find it in {{FB03}}": the document is parked, not posted.',
        ilgili:['FBV0','FBV2','FB03'] },

      { kod:'FBV4', ad:'Release a parked document',
        amac:'Approves documents subject to an approval workflow.',
        neZaman:'On documents exceeding an amount limit; on capital expenditures.',
        adimlar:[
          { baslik:'List the documents awaiting approval' },
          { baslik:'Review and approve the document' },
          { baslik:'After approval it can be posted with {{FBV0}}' },
        ],
        ipucu:'An approval workflow is **optional** — not required for parking itself. ' +
              'But if amount-based approval is needed (say, manager sign-off above 100,000 TRY), ' +
              'this mechanism turns the four-eyes principle **into a tiered one**.\n\n' +
              'Its configuration is complex; for simple four-eyes, ' +
              'the authorization separation alone is enough.',
        ilgili:['FBV0','FBV3'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Parking\'s table architecture is simple and **parallel**: ' +
      'parked documents sit in {{VBKPF}}/{{VBSEG}}, posted documents sit in ' +
      '{{BKPF}}/{{BSEG}}. Posting **moves** the data from one to the other.',

    liste:[
      { ad:'VBKPF', baslik:'Parked document header',
        tutar:'The header data of parked documents: document type, date, amount, ' +
              '**the user who parked it**.',
        olusturan:'{{FV50}} / {{FV60}} / {{FBV1}}',
        guncelleyen:'{{FBV2}} changes it · {{FBV0}} moves or deletes it',
        anahtar:'AUSBK + BUKRS + BELNR + GJAHR',
        iliskiler:'Moved into {{BKPF}} at posting — **with the same document number**.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'BELNR', aciklama:'Document number — **assigned at parking**, kept once posted', tip:'pk' },
          { ad:'BSTAT', aciklama:'Document status: **V** parked · **Z** statistical' },
          { ad:'USNAM', aciklama:'**The user who parked it** — the basis for the four-eyes check' },
          { ad:'BLART', aciklama:'Document type', tip:'fk' },
          { ad:'XPRFG', aciklama:'Release status flag' },
        ] },

      { ad:'VBSEG', baslik:'Parked document line items',
        tutar:'The lines of a parked document. **Split across sub-tables** by account type.',
        olusturan:'The parking transaction',
        guncelleyen:'{{FBV2}}',
        anahtar:'AUSBK + BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'Moved into {{BSEG}} at posting.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'BUZEI', aciklama:'Line number', tip:'pk' },
          { ad:'HKONT', aciklama:'G/L account' },
          { ad:'WRBTR', aciklama:'Amount — **balancing not required**' },
        ] },

      { ad:'BKPF', baslik:'Accounting document header',
        tutar:'Posted documents. A parked document **is not here**.',
        olusturan:'{{FBV0}} posting, or a direct posting',
        anahtar:'BUKRS + BELNR + GJAHR',
        s4:'Works together with {{ACDOCA}}.',
        alanlar:[
          { ad:'BELNR', aciklama:'**The same number as in parking**' },
          { ad:'BUDAT', aciklama:'Posting date — decided **at the moment of posting**' },
          { ad:'USNAM', aciklama:'The user **who posted it** — should differ from the one who parked it' },
        ] },

      { ad:'BSEG', baslik:'Document line items',
        tutar:'Posted line items.',
        olusturan:'Posting',
        s4:'{{uyumluluk-view}}.' },

      { ad:'NRIV', baslik:'Number range status',
        tutar:'The number is **reserved at parking**; if the document is deleted, the number is wasted.',
        olusturan:'The {{FBN1}} definition',
        s4:'Unchanged.' },

      { ad:'CDHDR', baslik:'Change document header',
        tutar:'Changes made to a parked document are tracked here.',
        olusturan:'{{FBV2}} changes',
        s4:'Unchanged.' },
    ],

    er:{
      type:'er',
      baslik:'Parked ↔ posted: the parallel structure',
      varliklar:[
        { ad:'VBKPF', rol:'Park', hub:true, aciklama:'**Parking header** — not in the trial balance',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'BSTAT' }, { ad:'USNAM' }] },
        { ad:'VBSEG', rol:'Park', aciklama:'Parking line items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' }] },
        { ad:'BKPF', rol:'Accounting', aciklama:'**Accounting document** — in the trial balance',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'BUDAT' }, { ad:'USNAM' }] },
        { ad:'BSEG', rol:'Accounting', aciklama:'Document line items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'Universal line items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'RACCT' }] },
        { ad:'NRIV', rol:'Number', aciklama:'Range status',
          alanlar:[{ ad:'OBJECT', tip:'pk' }, { ad:'NRLEVEL' }] },
        { ad:'CDHDR', rol:'Tracking', aciklama:'Change trail',
          alanlar:[{ ad:'OBJECTID', tip:'fk' }, { ad:'USERNAME' }] },
      ],
      iliskiler:[
        { from:'VBKPF', to:'VBSEG', alanlar:'BELNR', not:'parking header → line item' },
        { from:'VBKPF', to:'BKPF', alanlar:'BELNR', not:'**posting (FBV0)**' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'header → line item' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR + BUZEI', not:'universal line item' },
        { from:'NRIV', to:'VBKPF', alanlar:'NRLEVEL → BELNR', not:'the number is assigned at parking' },
        { from:'VBKPF', to:'CDHDR', alanlar:'BELNR → OBJECTID', not:'change trail' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'The parking screens are **identical** to the normal posting screens; ' +
      'the only difference is in the save behavior. The real design decision isn\'t in the screens, ' +
      'it\'s in **authorization**.',

    ekranlar:[
      { ad:'{{FV60}} / {{FV50}} — the parking screen',
        aciklama:'Same as {{FB60}} / {{FB50}}; the difference is the "Park" button.',
        alanlar:[
          { ad:'Vendor / account', zorunlu:true },
          { ad:'Amount and date', zorunlu:true },
          { ad:'Line items', zorunlu:false, aciklama:'**Can be left incomplete** — balancing isn\'t required for parking.' },
          { ad:'The "Park" button', zorunlu:true, aciklama:'Chosen instead of "Save."' },
        ],
        ipucu:'"Park" can also be chosen from the {{FB60}} screen. ' +
              'The separate {{FV60}} transaction code exists **for authorization, not technical, reasons**: ' +
              'giving the assistant only {{FV60}} blocks them from posting directly.\n\n' +
              'Without this separation, the parking feature stops being an internal control tool.' },

      { ad:'{{FBV0}} — the posting / deletion screen',
        aciklama:'The screen where the four-eyes principle is applied.',
        alanlar:[
          { ad:'Document number', zorunlu:true },
          { ad:'Review', zorunlu:false, aciklama:'Line items, amounts, accounts.' },
          { ad:'Post', zorunlu:false, aciklama:'{{VBKPF}}→{{BKPF}}; **balancing required**.' },
          { ad:'Delete', zorunlu:false, aciklama:'The document is removed entirely; **no accounting trail remains**.' },
          { ad:'Posting date', zorunlu:false, aciklama:'Decided **at the moment of posting**; ' +
                   'the period must be open.' },
        ],
        ipucu:'The **posting-date behavior** on this screen frequently causes trouble: ' +
              'a document is parked on December 28 and posted on January 3. ' +
              'If the December period has closed, the posting **falls into January** and ' +
              'the expense lands in the wrong period.\n\n' +
              'Mitigation: clear out parked documents before the period closes.' },

      { ad:'{{FBV3}} — the display screen',
        aciklama:'Shows a parked document in a read-only view.',
        alanlar:[
          { ad:'Document number', zorunlu:true },
          { ad:'Status', zorunlu:false, aciklama:'Complete / incomplete / awaiting approval.' },
          { ad:'The user who parked it', zorunlu:false, aciklama:'{{VBKPF}} `USNAM` — important for auditing.' },
        ],
        ipucu:'**{{FB03}} can\'t find a parked document.** ' +
              'This is the most common reason behind the complaint "I have a document number but can\'t display it." ' +
              'Diagnosis: try the number in {{FBV3}} — if it\'s found there, the document is parked.' },
    ],

    zorunlu:['Document type','Company code','Date','Vendor/account (for parking)','Balancing (for posting)'],
    opsiyonel:['Line items (while parked)','Cost center','Approval workflow'],

    hatalar:[
      { mesaj:'Document is not complete / balance not zero (FBV0)', sebep:'The parked document is unbalanced or incomplete.', cozum:'Complete it with {{FBV2}}. Parking is flexible, posting is strict — this is **expected** behavior.' },
      { mesaj:'Posting period ... is not open (FBV0)', sebep:'The document is being posted to a closed period.', cozum:'Temporarily open the period with {{OB52}}, or update the posting date. **Park cleanup should have been done before the period closed.**' },
      { mesaj:'Document not found (FB03)', sebep:'The document is parked, not posted.', cozum:'View it with {{FBV3}}. {{FB03}} only looks at {{BKPF}}.' },
      { mesaj:'You are not authorized to post this document', sebep:'The user has no {{FBV0}} authorization.', cozum:'**This is correct behavior** — the four-eyes principle is working. Route it to an authorized person.' },
      { mesaj:'Document is subject to release', sebep:'An approval workflow is defined and hasn\'t been approved.', cozum:'Get it approved with {{FBV4}}.' },
      { mesaj:'There are gaps in the document number range', sebep:'The numbers of deleted parked documents were wasted.', cozum:'**This is normal** and needs no fix. The number is reserved at parking; it isn\'t reclaimed even if the document is deleted.' },
    ],

    ipuclari:[
      '**Separate authorization for four-eyes:** the assistant has {{FV60}}, and **not** {{FBV0}}. ' +
      'Just turning on the parking feature doesn\'t build a control.',
      'Before the period closes, confirm that **no parked documents remain** — ' +
      'add this to the closing checklist.',
      'On the complaint "the document can\'t be found in {{FB03}}," try {{FBV3}}; ' +
      'it\'s likely parked.',
      '**Park** a questionable document instead of posting it — ' +
      'the cost of a mistake is much lower (it can be deleted, no reversal needed).',
      'Park period-end corrections first, review them as a batch, then post them.',
      'Bring in transfers from external systems by parking them; ' +
      'don\'t let them into the trial balance before they pass review.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'VBKPF', ne:'Parked document header — **doesn\'t affect the trial balance**' },
      { tablo:'VBSEG', ne:'Parked document line items' },
      { tablo:'BKPF', ne:'Created at posting — **with the same document number**' },
      { tablo:'BSEG', ne:'Created at posting' },
      { tablo:'ACDOCA', ne:'Created at posting' },
      { tablo:'NRIV', ne:'The number is reserved **at parking**' },
      { tablo:'CDHDR', ne:'Changes to the parked document are tracked' },
    ],

    commit:
      'Parking\'s commit behavior is **two separate events**:\n\n' +
      '**Parking:** {{VBKPF}} and {{VBSEG}} are written, the number is reserved. ' +
      'The accounting tables are **never touched**.\n\n' +
      '**Posting:** {{VBKPF}}/{{VBSEG}} are read, ' +
      '{{BKPF}}/{{BSEG}}/{{ACDOCA}} are written, and the parking records are deleted **within the same LUW**.\n\n' +
      'The atomicity of the second stage is critical: if the document showed up ' +
      'in both parking and accounting at once, that would create a double-posting risk. ' +
      'SAP guarantees this with a single commit — if posting fails, ' +
      'the document **stays parked**, and no half-done state is created.',

    belgeNo:
      '**The document number is assigned at parking and kept at posting.** ' +
      'This is an important design choice in parking.\n\n' +
      'The advantage: a reference given out during the parked stage (a number communicated to the vendor, ' +
      'a number written on a file) stays valid after posting too.\n\n' +
      'The side effect: **the numbers of deleted parked documents are wasted**, ' +
      'creating a gap in the range. This is normal and can\'t be fixed — ' +
      'the answer to an auditor asking "why doesn\'t this number exist?" ' +
      'is "it was parked and then deleted."\n\n' +
      'Some installations define a **separate number range** for parking; ' +
      'this preserves the numeric continuity of accounting documents, but ' +
      'breaks the continuity between the park number and the posted number.',

    postingLogic:
      'The checks performed during posting ({{FBV0}}):\n\n' +
      '**1.** Is the document **balanced**? If not, it\'s rejected.\n' +
      '**2.** Are the mandatory fields filled in? (based on document type and field status)\n' +
      '**3.** Is the posting date\'s period **open**? ({{OB52}})\n' +
      '**4.** If an approval workflow exists, **has approval been given**?\n' +
      '**5.** Does the user have **posting authorization**?\n' +
      '**6.** Account determination, tax calculation, and {{belge-bolme}} run.\n' +
      '**7.** {{BKPF}}/{{BSEG}}/{{ACDOCA}} are written, and the parking records are deleted.\n\n' +
      '**None** of this is checked at the parking stage (1–4 included). ' +
      'This is the technical counterpart of the "parking is flexible, posting is strict" principle.',

    belgeTuru:
      'The document type applies to parking as well and is defined in {{OBA7}}. ' +
      'A parked document uses the **same type** when posted.\n\n' +
      'Some installations define a **separate document type** for parked documents; ' +
      'this makes it easier to separate them in reporting, but **breaks number continuity** ' +
      'and requires a type change at posting. ' +
      'Generally not preferred.',

    numberRange:
      'Parking uses the document type\'s normal number range and ' +
      'draws the number **at parking** ({{NRIV}} is updated).\n\n' +
      'Result: the numbers of documents that are parked and then deleted are wasted. ' +
      'These gaps should be factored in when expanding the range at year-start — ' +
      'installations that park heavily burn through their range faster.',

    accountDetermination:
      'Account determination, tax calculation, and {{belge-bolme}} **don\'t run at parking**; ' +
      'they only kick in at posting.\n\n' +
      'The practical consequence matters: a parked document ' +
      'can **fail to be postable** due to an account determination error, ' +
      'and this only surfaces when {{FBV0}} is attempted. ' +
      'A successful parking should **not be taken to mean** the document is postable.',

    tur:
      '**Configuration:** document types ({{OBA7}}), number ranges ({{FBN1}}), ' +
      'approval workflow definitions, field status groups.\n\n' +
      '**Authorization (the real control layer):** the {{FV60}} ↔ {{FBV0}} separation, ' +
      'amount limits, company-code-based restrictions.\n\n' +
      '**Transaction data:** {{VBKPF}}/{{VBSEG}} records.',

    transport:
      'Document types, number ranges, and approval workflow definitions transport. ' +
      '**But the real control mechanism — authorization — is managed through roles, ' +
      'and is usually a separate process.**\n\n' +
      'Consequence: the four-eyes principle can look like it\'s working in the test system ' +
      '(because the test user has limited authorization), ' +
      'while in production the mechanism sits inert ' +
      'because users hold broad authorization.\n\n' +
      '**Go-live check:** verify, role by role, that users who park documents in production ' +
      'don\'t have {{FBV0}} authorization.',

    img:[
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Document Types', not:'{{OBA7}} — whether parking is allowed' },
      { yol:'SPRO → … → Document → Document Parking → Define Release Procedure for Document Parking', not:'{{FBV4}} approval workflow' },
      { yol:'SPRO → … → Document → Document Parking → Define Amount Limits', not:'Amount limits for approval levels' },
      { yol:'SPRO → … → Document → Document Number Ranges', not:'{{FBN1}} — parking draws its number from here' },
    ],

    ekstra:[
      { ic:'🔐', baslik:'The four-eyes principle is built with authorization, not the parking feature', metin:
        'This is the **single most important practical fact** about parking, and ' +
        'the point most often misunderstood.\n\n' +
        'Turning on the parking feature does **not** build the four-eyes principle. ' +
        'If the same user holds both {{FV60}} and {{FBV0}} authorization:\n\n' +
        '• They post the very document they parked themselves\n' +
        '• On busy days, they always do so\n' +
        '• An auditor compares {{VBKPF}} `USNAM` against {{BKPF}} `USNAM` and ' +
        'sees they\'re the same\n' +
        '• A finding is written up\n\n' +
        '**The correct setup lives in authorization:**\n\n' +
        '**Role A (assistant):** {{FV60}}, {{FV50}}, {{FBV2}}, {{FBV3}} — ' +
        'parks, corrects, and views.\n' +
        '**Role B (manager):** {{FBV0}}, {{FBV3}} — posts and deletes.\n\n' +
        'The two roles **must not be combined in the same user**.\n\n' +
        'A ready answer for an audit: "{{VBKPF}} `USNAM` and {{BKPF}} `USNAM` ' +
        'are never the same on any document" — showing this with a single query ' +
        'is the strongest proof that the control is working.' },

      { ic:'📅', baslik:'Parked in December, posted in January: which period does the entry fall into?', metin:
        'A document was parked on December 28 and posted on January 3. ' +
        'Which period does the expense get recorded in?\n\n' +
        'Answer: **based on the posting date entered at the moment of {{FBV0}}.**\n\n' +
        'Even if the date written on the document is December, ' +
        'the posting date is checked during posting and that date\'s period **must be open**.\n\n' +
        'Three scenarios:\n\n' +
        '**a)** The December period is still open → the posting falls into December ✓\n' +
        '**b)** December is closed, the user doesn\'t change the date → ' +
        'a *"Posting period is not open"* error, the document doesn\'t post\n' +
        '**c)** December is closed, the user changes the date to January → ' +
        'the posting falls into January, **the expense is in the wrong period**\n\n' +
        'Scenario (c) is dangerous because **it throws no error**. ' +
        'December\'s expense looks understated, January\'s looks overstated.\n\n' +
        '**Mitigation:** before closing the period, list the parked documents and ' +
        'post the ones that belong to that period. ' +
        'This should be a standard item on the closing checklist.' },
    ],

    notlar:[
      { tip:'warn', baslik:'A successful parking does not mean the document is postable', metin:
        'Balancing, mandatory fields, the period, account determination, and ' +
        'tax calculation are **not checked** at the parking stage.\n\n' +
        'Consequence: a document that parked without issue can be rejected at {{FBV0}} ' +
        'with errors like "account determination error," "period closed," or "document unbalanced."\n\n' +
        'This matters especially on installations that mass-park from an external system: ' +
        '1,000 documents park without issue, and 40 of them error out at posting. ' +
        'The transfer is reported "successful" but the job is left half-done.\n\n' +
        '**Mitigation:** track the posting rate after a mass park; ' +
        'keep an aging report for documents that remain parked.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The parking mechanism is **unchanged** in S/4HANA: {{VBKPF}}/{{VBSEG}} are still there, ' +
      '{{FV60}}/{{FBV0}} still work. What changed is the Fiori-based approval apps and ' +
      'a more visual worklist experience.',

    eccFarklari:[
      { konu:'Parking tables', ecc:'{{VBKPF}} / {{VBSEG}}', s4:'**Unchanged**' },
      { konu:'Parking transactions', ecc:'{{FV50}}, {{FV60}}, {{FBV0}}', s4:'Same + Fiori' },
      { konu:'Approval flow', ecc:'{{FBV4}} + workflow', s4:'The Fiori "Manage Journal Entries" approval step' },
      { konu:'Accounting data', ecc:'{{BKPF}}/{{BSEG}}', s4:'+ {{ACDOCA}}' },
      { konu:'Worklist', ecc:'A transaction-code-based list', s4:'A visual Fiori worklist, mobile access' },
    ],

    universalJournal:
      'Parked documents are **not written** to {{ACDOCA}} — they aren\'t accounting entries yet. ' +
      '{{ACDOCA}} is created together with {{BKPF}}/{{BSEG}} at the moment of posting.\n\n' +
      'This is why parking requires **no change at all** to the {{ACDOCA}} architecture: ' +
      'parking already sits outside the accounting layer.\n\n' +
      'Side consequence: no {{ACDOCA}}-based report shows parked documents. ' +
      '{{VBKPF}} must be queried separately for a period-end check.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'{{FV50}}, {{FV60}}, {{FBV0}}, {{FBV2}}, {{FBV3}}, {{FBV4}} **were not removed**' },
    ],

    fiori:[
      { ad:'Manage Journal Entries', aciklama:'Lists, reviews, and posts parked documents; ' +
             'the visual counterpart of {{FBV0}}.' },
      { ad:'Post General Journal Entries', aciklama:'Replaces {{FV50}}; includes a park option.' },
      { ad:'Create Supplier Invoice', aciklama:'Replaces {{FV60}}; parking and posting together.' },
      { ad:'My Inbox (approval)', aciklama:'Documents awaiting approval; can be approved from a mobile device.' },
      { ad:'Verify Journal Entries', aciklama:'The Fiori interface for the approval workflow.' },
    ],

    compatibilityViews:[
      '{{VBKPF}}, {{VBSEG}} — **remain physical tables** (not compatibility views).',
      '{{BSEG}} — a view derived from {{ACDOCA}}.',
      'Parking is one of the areas **structurally untouched** by the S/4HANA migration.',
    ],

    performans:
      'Parking transactions produce little data, so they create no performance issue. ' +
      'The real gain is the **Fiori approval flow**: the approver can approve ' +
      'from a phone instead of opening SAP GUI on a desktop.\n\n' +
      'This improves the practical **feasibility** of the four-eyes principle: ' +
      'as approving gets easier for the manager, the pressure on the assistant to think ' +
      '"the manager isn\'t around, I\'ll just do it myself" eases.',

    bestPractices:[
      'Consider the Fiori approval flow — it makes the four-eyes principle **easier to apply in practice**.',
      '**Clean up** parked documents during migration; carried-over parked documents ' +
      'get overlooked in the new system.',
      'Review the authorization separation again during migration; ' +
      'role consolidations can end up putting {{FV60}} and {{FBV0}} in the same role.',
      'Add "are there any parked documents?" to the closing checklist — ' +
      'in S/4HANA too, these documents stay **invisible** in {{ACDOCA}}-based reports.',
      'Consider bringing in transfers from external systems by parking them; ' +
      'they don\'t enter the trial balance before passing review.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'The audit finding was written up twice: parking was enabled but the control wasn\'t built',
    hikaye:
      '**Kuzey Lojistik Inc.**\'s 2027 internal audit report carries this finding: ' +
      '*"Vendor invoice entry and posting are concentrated in the same person; ' +
      'the principle of segregation of duties has been violated."*\n\n' +
      'As a fix, the accounting manager rolls out parking: ' +
      'the assistant now **parks** with {{FV60}}, and the manager posts with {{FBV0}}.\n\n' +
      'Six months later, an interim audit **writes up the same finding again**.\n\n' +
      'This scenario shows parking\'s most common setup mistake, along with ' +
      'a second problem that surfaces at period end.',
    veriler:[
      { k:'Company code', v:'1000 · TRY' },
      { k:'Monthly vendor invoices', v:'~420 documents' },
      { k:'Who parks', v:'Assistant (user MUHASEBE01)' },
      { k:'Who posts', v:'Manager (user MUHASEBE_MD)' },
      { k:'**Audit finding**', v:'Segregation-of-duties violation — written up **twice**' },
    ],

    adimlar:[
      { baslik:'The auditor\'s query is reproduced', tcode:'SE16N',
        aciklama:'An attempt is made to understand what data the auditor was looking at.',
        girdi:[
          { alan:'Query', deger:'{{BKPF}} · document type KR · last 6 months' },
          { alan:'Compared', deger:'{{VBKPF}} `USNAM` ↔ {{BKPF}} `USNAM`' },
          { alan:'Total documents', deger:'2,480' },
          { alan:'**Where both fields match**', deger:'**317 documents (13%)**' },
        ],
        not:'**The proof of the problem is in this one query:** on 317 documents, the person who parked and ' +
             'the person who posted are the **same user**.\n\n' +
             'This is the data the auditor used to write up the finding, and ' +
             'it leaves no room for argument.' },

      { baslik:'Root cause — authorization was never changed', tcode:'SU53',
        aciklama:'The assistant\'s authorizations are examined.',
        girdi:[
          { alan:'MUHASEBE01 — {{FV60}} authorization', deger:'**Yes** ✓ (can park)' },
          { alan:'MUHASEBE01 — {{FBV0}} authorization', deger:'**Yes** (can also post)' },
          { alan:'MUHASEBE01 — {{FB60}} authorization', deger:'**Yes** (can also post directly)' },
          { alan:'Conclusion', deger:'Parking is a **possibility**, not a control' },
        ],
        not:'**The root cause is found.** The parking process was defined, training was given, ' +
             'the assistant followed the rules most of the time — but **their authorization was never restricted**.\n\n' +
             'On busy days, while the manager was in a meeting, or under month-end pressure, ' +
             'the assistant posted the very document they parked themselves. ' +
             'The 13% figure is exactly what that shows.\n\n' +
             'Worse still: {{FB60}} authorization is also there, meaning ' +
             'they can also post **directly** without ever parking.' },

      { baslik:'The roles are separated', tcode:'PFCG',
        aciklama:'Authorization is redesigned.',
        girdi:[
          { alan:'**Role A — Invoice entry**', deger:'{{FV60}}, {{FV50}}, {{FBV2}}, {{FBV3}}' },
          { alan:'**Removed** from Role A', deger:'{{FBV0}}, {{FB60}}, {{FB50}}' },
          { alan:'**Role B — Posting**', deger:'{{FBV0}}, {{FBV3}}, {{FB03}}' },
          { alan:'Rule', deger:'The two roles **cannot be combined in the same user**' },
        ],
        not:'A critical detail: {{FB60}} authorization was removed too. ' +
             'Removing only {{FBV0}} would not have been enough — ' +
             'the assistant would have kept posting directly with {{FB60}} without ever parking.\n\n' +
             '**Backup plan:** so documents wouldn\'t pile up while the manager was on leave, ' +
             'Role B was also given to a second person (the chief accountant). ' +
             'This provided flexibility without breaching the control.' },

      { baslik:'A second problem — leftover parked documents at period end', tcode:'FBV3',
        aciklama:'The December close turns up an unexpected situation.',
        girdi:[
          { alan:'Parked as of 12/31/2027', deger:'**63 documents** · totaling 1,840,000 TRY' },
          { alan:'Of these, belonging to December', deger:'**58 documents** · 1,720,000 TRY' },
          { alan:'Status in the trial balance', deger:'**None of them are there** — parking doesn\'t affect the trial balance' },
          { alan:'Impact', deger:'December\'s expense is **understated by 1,720,000 TRY**' },
        ],
        not:'**The second lesson is here:** parked documents are **not visible** in the trial balance.\n\n' +
             '58 invoices belong to December, reached accounting, were entered into the system — ' +
             'but because they weren\'t posted, December\'s expense is understated.\n\n' +
             'No one noticed because no standard report shows these documents: ' +
             'not in the trial balance, not in {{FBL1N}}, not in {{ACDOCA}}.' },

      { baslik:'The parking backlog is cleared', tcode:'FBV0',
        aciklama:'58 documents are posted before the December period closes.',
        girdi:[
          { alan:'Posted', deger:'58 documents' },
          { alan:'Posting date', deger:'12/31/2027 — **the period is still open**' },
          { alan:'Rejected', deger:'**4 documents** — unbalanced or incomplete' },
          { alan:'Deleted', deger:'**5 documents** — duplicate entries' },
        ],
        fis:{ baslik:'Document 1900012204 — from park to posting', belgeTuru:'KR', tarih:'31.12.2027',
          satirlar:[
            { hesap:'770', ad:'General administrative expense', borc:142000, not:'December expense, in the correct period' },
            { hesap:'191', ad:'Deductible VAT', borc:28400 },
            { hesap:'320', ad:'Trade payables', alacak:170400 },
          ], not:'The document number is **the same one assigned when it was parked**.\n\n' +
                 'The posting date is 12/31 — since the December period was still open, ' +
                 'the expense landed **in the correct period**. Had this been done a week later, ' +
                 'December would have closed and the expense would have slipped into January.' },
        tabloEtkisi:[
          { tablo:'VBKPF', ne:'58 records deleted (posted) + 5 records deleted (duplicates)' },
          { tablo:'BKPF', ne:'58 accounting documents — **with the same numbers**' },
          { tablo:'ACDOCA', ne:'December\'s expense increased by 1,720,000 TRY' },
        ],
        not:'**4 documents were rejected** — they were left unbalanced or incomplete while parked. ' +
             'This is concrete proof that the assumption "successful parking = postable" is wrong.\n\n' +
             '**5 documents were deleted** — the same invoice had been parked twice. ' +
             'Had they been posted, they would have needed to be reversed with {{FB08}} and ' +
             'would have left a permanent trail in the trial balance. Because they were still parked, ' +
             'they were deleted **cleanly**.' },

      { baslik:'Permanent controls are put in place', tcode:'FBV3',
        aciklama:'A systemic fix for both problems.',
        girdi:[
          { alan:'Control 1 — authorization', deger:'The rule "Role A and Role B **cannot be combined**" was added to the SoD matrix' },
          { alan:'Control 2 — monitoring', deger:'Monthly query: are there any documents where {{VBKPF}} `USNAM` = {{BKPF}} `USNAM`?' },
          { alan:'Control 3 — closing', deger:'"Are there any parked documents left?" was added to the closing checklist' },
          { alan:'Control 4 — aging', deger:'Documents parked longer than 7 days are reported weekly' },
        ],
        not:'**The fourth control is the most valuable:** an aging report on documents ' +
             'waiting in parking. If a document stays parked more than 7 days, ' +
             'either it was forgotten or there\'s a problem.\n\n' +
             'This report prevents ever running into a 63-document pile at period end — ' +
             'the problem gets solved in small pieces every week instead.' },

      { baslik:'Verification at the next audit', tcode:'SE16N',
        aciklama:'The same query is run again three months later.',
        girdi:[
          { alan:'Total documents (3 months)', deger:'1,260' },
          { alan:'{{VBKPF}} `USNAM` = {{BKPF}} `USNAM`', deger:'**0 documents**' },
          { alan:'Parked more than 7 days', deger:'**2 documents** (being tracked)' },
          { alan:'Audit finding', deger:'**Closed**' },
        ],
        not:'A result of zero is proof the control is working. ' +
             'But what\'s really valuable is **the query itself**: ' +
             'being able to tell the auditor "here\'s the proof" instead of ' +
             '"we have a control."\n\n' +
             'This query is now part of the monthly routine, standing ready ' +
             'as an answer for the next audit.' },
    ],

    sonuc:
      '**The same audit finding was written up twice — because parking was enabled but the control was never built.**\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. The four-eyes principle is built with authorization, not the parking feature.** ' +
      'If the same user holds both {{FV60}} and {{FBV0}} authorization, the mechanism is ' +
      'only a delay. {{FB60}} authorization must also be removed — ' +
      'otherwise the user posts directly without ever parking. ' +
      'The proof sits in a single query: **the count of documents where {{VBKPF}} `USNAM` = {{BKPF}} `USNAM` must be zero.**\n\n' +
      '**2. Parked documents are invisible in the trial balance and leave the period incomplete.** ' +
      '58 December invoices had been entered into the system but, because they weren\'t posted, ' +
      'December\'s expense was understated by 1,720,000 TRY. No standard report shows this — ' +
      'not the trial balance, not {{FBL1N}}, not {{ACDOCA}}. ' +
      'A **"are there any parked documents left?"** item on the closing checklist is mandatory.\n\n' +
      '**3. "Successfully parked" does not mean "postable."** ' +
      'Balancing, mandatory fields, the period, and account determination are **not checked** at the parking stage. ' +
      '4 of the 58 documents were rejected at {{FBV0}}. ' +
      'On mass-parking transfers, this rate creates a serious amount of unfinished work.\n\n' +
      '**4. Parking\'s cost of error is low — use that.** ' +
      '5 duplicate documents were **deleted** and left no accounting trail behind them. ' +
      'Had they been posted, they would have needed to be reversed with {{FB08}} and ' +
      'would have had to remain permanently visible and explained in the trial balance. ' +
      '**Parking a questionable document instead of posting it leaves a clean way out.**',
  },

  },
});
