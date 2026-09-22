/* ==========================================================================
   content/fi-en/dunning.js — English body for "Dunning" (İhtar)
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'dunning',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Dunning (İhtar) is the **staged reminder** process for overdue customer receivables. ' +
      'SAP automates it with a single program: {{F150}} scans open items, ' +
      'decides which customer gets which dunning level, prints the letters, and ' +
      '**writes the dunning information back** onto the customer and the item.\n\n' +
      'The heart of the mechanism is the **dunning procedure** ({{FBMP}}): how many levels there ' +
      'will be, after how many days of delay each level kicks in, which text gets printed, and ' +
      'whether a dunning charge or interest on arrears is taken — all defined here.\n\n' +
      'The critical distinction is this: **dunning is not an accounting transaction.** ' +
      'A dunning run normally **produces no accounting entry at all** — ' +
      'it only updates the dunning fields on the customer and the item. ' +
      'That is why it leaves no trace on the trial balance.',

    neden:
      '**Collection speed.** Systematic reminders noticeably shorten the collection cycle.\n\n' +
      '**Scale.** Tracking due dates for thousands of customers by hand is impossible.\n\n' +
      '**Consistency.** The same rules apply to every customer; arbitrary behavior disappears.\n\n' +
      '**Legal basis.** The dunning history (kept in {{KNB1}}) is the documentary basis for ' +
      'starting legal collection and for setting aside a doubtful-receivable provision.\n\n' +
      '**Graduated pressure.** The first level is a polite reminder, the last is a legal-action ' +
      'warning — the customer relationship doesn\'t snap all at once.',

    sirketOnemi:
      'Dunning is **the most direct intervention point in the cash cycle**. ' +
      'Shortening the collection period by 10 days, at the same revenue, means a meaningful ' +
      'release of working capital.\n\n' +
      'For a consultant, this topic is the operational bridge between {{accounts-receivable}} and ' +
      '{{clearing}}, and it\'s one of the rare topics where **configuration translates directly ' +
      'into behavior**: a day count entered in {{FBMP}} lands in the customer\'s mailbox the very ' +
      'next day.\n\n' +
      'The distinguishing question is: **"Does a dunning run produce an accounting entry?"** ' +
      'The right answer: **normally, no**. A separate entry is only created when a dunning ' +
      'charge or interest on arrears is defined — and even then it doesn\'t come from the ' +
      'dunning itself, it comes from the interest calculation.',

    gercekHayat:
      'A wholesaler has 340 open customer items. Every week the collections clerk dumps them ' +
      'into Excel, filters the overdue ones, makes phone calls, sends emails.\n\n' +
      'The problems: what was said to which customer and when **isn\'t recorded**. ' +
      'Some customers get called three times, others never. ' +
      'For a customer about to go to legal collection, there\'s no answer to "how many times did ' +
      'we warn them?"\n\n' +
      'With {{F150}}, this process turns into: every Monday the program runs, and letters are ' +
      'printed automatically — level 1 for anyone 14 days overdue, level 2 for 30 days, ' +
      'level 3 (a legal warning) for 60 days.\n\n' +
      'Which level each customer is at is kept in {{KNB1}}; when the decision to pursue legal ' +
      'collection is made, the date of all three dunning letters is documented.\n\n' +
      'The collections clerk\'s job turns from producing a "who do I call?" list into ' +
      '"reach out to the level-3 customers."',

    muhasebeMantigi:
      'Dunning\'s accounting logic is **indirect**: it doesn\'t produce an entry itself, but it ' +
      'is the **input** to two accounting decisions.\n\n' +
      '**1. Doubtful-receivable provision.** Deciding that collection of a receivable has become ' +
      'doubtful requires judgment. The dunning level is the **objective measure** of that ' +
      'judgment: a policy like "50% provision for receivables that received a 3rd-level dunning ' +
      'and are still unpaid" is both auditable and consistent.\n\n' +
      '**2. Legal collection and write-off of the receivable.** A receivable that has reached ' +
      'the last level and is still uncollected is moved to the {{supheli-alacak}} (doubtful ' +
      'receivable) account (via a {{ozel-ana-muhasebe-gostergesi}} or by directly changing the ' +
      'account).\n\n' +
      'Only in two cases does dunning **directly** produce an entry: a **dunning charge** (a ' +
      'fixed amount) and **interest on arrears** (calculated with {{F.2B}}). These are posted as ' +
      'a debit to the customer and income to the business.',

    kavramlar: ['ihtar', 'acik-kalem', 'yaslandirma', 'supheli-alacak', 'vade', 'odeme-blogu'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The dunning process has **two layers**: a one-time configuration (the {{FBMP}} procedure ' +
      'plus its assignment to customer master data) and a periodic run ({{F150}}). ' +
      'The run consists of four steps and **every step is reversible** — ' +
      'nothing reaches the customer until the last step.',

    roller:[
      { rol:'FI consultant', gorev:'Defines the procedure, levels, and texts with {{FBMP}}.' },
      { rol:'AR accounting', gorev:'Assigns the dunning procedure to customer master data ({{FD02}} / {{BP}}).' },
      { rol:'Collections clerk', gorev:'Runs {{F150}}, **reviews and edits the proposal**.' },
      { rol:'Collections clerk', gorev:'Sets a dunning block (for customers a deal has been reached with).' },
      { rol:'System', gorev:'Prints the letters, writes the dunning level onto the customer and the item.' },
      { rol:'General accounting', gorev:'Assesses a provision for high-level receivables.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The dunning run — four steps, reversible up to the last one',
      adimlar:[
        { ic:'⚙️', rol:'Consultant', baslik:'The procedure is defined ({{FBMP}})',
          aciklama:'Number of levels, days of delay, texts, charge/interest settings. ' +
                   'The result is written into table {{T047}}. **Done once.**',
          cikti:'A dunning procedure', ok:'assigned to the customer' },
        { ic:'👤', rol:'AR accounting', baslik:'Assigned to customer master data',
          aciklama:'{{KNB1}} field `MAHNA`. **A customer with no procedure assigned gets no ' +
                   'dunning** — the most common reason for "why wasn\'t a dunning notice sent?"',
          cikti:'A customer open to dunning', ok:'periodic run' },
        { ic:'▶', rol:'Collections', baslik:'1. Parameters ({{F150}})',
          aciklama:'Dunning date, up to document date, company code, customer range. ' +
                   'The **dunning date** is the reference the days of delay are calculated from.',
          cikti:'Run parameters', ok:'the proposal is generated' },
        { ic:'📋', rol:'System', baslik:'2. The proposal (dunning proposal)',
          aciklama:'Which customer gets which dunning level is listed. ' +
                   '**Nothing has been printed yet, no field has been updated.**',
          cikti:'The dunning proposal', ok:'reviewed' },
        { ic:'✏️', rol:'Collections', baslik:'3. The proposal is edited',
          aciklama:'Customers a deal has been reached with are removed, a level can be changed ' +
                   'by hand. **The proposal can be deleted and regenerated** — no risk at this step.',
          cikti:'An approved proposal', ok:'printing' },
        { ic:'📨', rol:'System', baslik:'4. Dunning notices are printed — **no going back**',
          aciklama:'Letters are printed, and the dunning level on {{KNB1}} and the item is ' +
                   '**updated**. From this point on, the level must be corrected by hand.',
          cikti:'Printed notices + updated level', ok:'follow-up' },
        { ic:'⚖️', rol:'General accounting', baslik:'High levels are assessed',
          aciklama:'A provision is set aside, or legal collection starts, for receivables that have reached the last level.',
          cikti:'Provision / legal collection' },
      ],
    },

    adimlar:[
      { rol:'Consultant', eylem:'Defines the dunning procedure', sistem:'{{FBMP}} → {{T047}}' },
      { rol:'AR accounting', eylem:'Assigns the procedure to the customer', sistem:'{{FD02}} / {{BP}} → {{KNB1}} `MAHNA`' },
      { rol:'Collections', eylem:'Enters the parameters', sistem:'{{F150}} — the dunning date is critical' },
      { rol:'System', eylem:'Generates the proposal', sistem:'Scans open items, determines the level' },
      { rol:'Collections', eylem:'Reviews and edits the proposal', sistem:'Removing customers, changing levels' },
      { rol:'System', eylem:'Prints the dunning notices', sistem:'Letter + {{KNB1}} level update' },
      { rol:'Collections', eylem:'Sets a dunning block', sistem:'{{FD02}} — customers under an agreement' },
      { rol:'General accounting', eylem:'Assesses a provision', sistem:'{{FBL5N}} — filtered by dunning level' },
    ],

    veriAkisi:{
      nereden:'The dunning procedure ({{T047}}), customer master data ({{KNB1}} `MAHNA`, dunning ' +
              'block), open items ({{BSID}}), the due date coming from the payment term.',
      nereye:'{{KNB1}} dunning level and last dunning date; {{BSEG}}/{{BSID}} item dunning level; ' +
             'the printed letter; a charge/interest entry, if any.',
      tetikleyen:'A {{F150}} run — usually weekly or every two weeks.',
      sonraki:'Collection, a payment arrangement, setting aside a provision, legal collection.',
    },

    notlar:[
      { tip:'tip', baslik:'The proposal step is a safety net — use it', metin:
        '{{F150}}\'s most valuable feature is **that the proposal step is separate from ' +
        'printing**.\n\n' +
        'When the proposal is generated, nothing is printed, no field is updated, ' +
        'nothing reaches the customer. The proposal **can be deleted and regenerated**.\n\n' +
        'This lets you: **try out** a new procedure in production, ' +
        'remove customers a deal has been reached with from the list, ' +
        'fix a customer that landed on the wrong level.\n\n' +
        '**After printing there is no going back:** the dunning level has been written to ' +
        '{{KNB1}} and correcting it requires manual intervention. The letter has already gone ' +
        'out in the mail.\n\n' +
        'A practical rule: **after a procedure change, take the first run only as far as the ' +
        'proposal step and review the list.**' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Dunning itself produces no entry. But three accounting events sit **around** the ' +
      'dunning process: the dunning charge, interest on arrears, and the doubtful-receivable ' +
      'provision. Telling these apart from dunning itself is the key to understanding the topic correctly.',

    etkilenenHesaplar:[
      { hesap:'120 Trade receivables', tur:'Balance sheet — Asset', neden:'The dunned receivable sits here. **Dunning doesn\'t change the balance**, it only updates the item\'s dunning level.' },
      { hesap:'128 Doubtful trade receivables', tur:'Balance sheet — Asset', neden:'Receivables that have reached a high level are moved here.' },
      { hesap:'129 Doubtful receivable provision', tur:'Balance sheet — Asset (contra)', neden:'A provision set aside for the portion expected to be uncollectible.' },
      { hesap:'654 Provision expenses', tur:'Income statement — Expense', neden:'An expense is posted when a provision is set aside.' },
      { hesap:'642 Interest income', tur:'Income statement — Income', neden:'Interest on arrears (calculated with {{F.2B}}).' },
      { hesap:'649 Other ordinary income', tur:'Income statement — Income', neden:'The dunning charge — a fixed amount.' },
    ],

    fisler:[
      { baslik:'A dunning run — **no accounting entry**',
        belgeTuru:'—', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'No accounting entry is created — only the dunning fields are updated', borc:0, alacak:0,
            not:'{{KNB1}} level and date · {{BSID}} item level' },
        ],
        not:'**This is the single most misunderstood point of the topic.** ' +
             '{{F150}} can print dunning notices for 340 customers and **not a single cent** ' +
             'changes on the trial balance.\n\n' +
             'The fields that get updated: the customer\'s dunning level, the last dunning date, ' +
             'and which level each item was dunned at.\n\n' +
             '*(The 0/0 shown in the table is there to underline that the run has no G/L impact.)*' },

      { baslik:'The dunning charge — a fixed amount (if defined in the procedure)',
        belgeTuru:'DR', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables — C-5010', borc:150, not:'The customer\'s debt increased' },
          { hesap:'649', ad:'Other ordinary income — dunning charge', alacak:150 },
        ],
        not:'The dunning charge is defined in the procedure **per level**: ' +
             'e.g. 0 TL at level 1, 150 TL at level 2, 300 TL at level 3.\n\n' +
             'The amounts are small but their purpose is **deterrence**. ' +
             'It isn\'t common practice in Turkey; if it isn\'t provided for in the contract, ' +
             'the customer can refuse to pay it and an uncollectible item results.' },

      { baslik:'Interest on arrears ({{F.2B}}) — a calculated amount',
        belgeTuru:'DR', tarih:'30.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables — C-5010', borc:8400, not:'240,000 × 14% × 90/360' },
          { hesap:'642', ad:'Interest income', alacak:8400 },
        ],
        not:'Interest on arrears **is not part of dunning** — it\'s calculated and posted by a ' +
             'separate program ({{F.2B}}).\n\n' +
             'An interest indicator must be defined on the customer master; otherwise the ' +
             'calculation **skips** that customer without an error.\n\n' +
             'The point not to confuse: a dunning letter may mention interest, but **posting** ' +
             'the interest is a separate transaction.' },

      { baslik:'Transfer to doubtful receivables — after the 3rd level',
        belgeTuru:'SA', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'128', ad:'Doubtful trade receivables — C-5010', borc:240000 },
          { hesap:'120', ad:'Trade receivables — C-5010', alacak:240000, not:'Removed from the normal receivable' },
        ],
        not:'The receivable is still an **asset** — only its classification changed. ' +
             'It\'s shown on a separate line of the balance sheet so the reader can see the risk.\n\n' +
             'The **objective measure** for the transfer decision is the dunning level: ' +
             'a policy like "receivables that received a 3rd-level dunning and are 30 days ' +
             'past that" is both auditable and consistent.' },

      { baslik:'The doubtful-receivable provision — the uncollectible portion',
        belgeTuru:'SA', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'654', ad:'Provision expenses', borc:120000, not:'50% provision' },
          { hesap:'129', ad:'Doubtful receivable provision', alacak:120000, not:'An asset-reducing account' },
        ],
        not:'The provision doesn\'t **write off** the receivable — it reduces the balance sheet ' +
             'by the portion expected to be uncollectible. The receivable keeps sitting in 128, ' +
             'and its net value shows as 240,000 − 120,000 = **120,000 TL**.\n\n' +
             'The provision rate can be tied to the dunning level: ' +
             'e.g. 25% at level 2, 50% at level 3, 100% for legal collection. ' +
             'This is dunning\'s most concrete contribution to accounting.' },

      { baslik:'If collection happens — the provision is reversed',
        belgeTuru:'DZ', tarih:'20.01.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Banks', borc:240000 },
          { hesap:'128', ad:'Doubtful trade receivables', alacak:240000 },
        ],
        not:'When the collection comes in, the receivable is closed. **The provision must also ' +
             'be reversed:** 129 debit / 644 provisions no longer required, credit.\n\n' +
             'This second entry is often forgotten, and the provision account stays inflated for ' +
             'years for receivables that have already been collected. ' +
             '128 and 129 need to be reviewed **together** at period end.' },
    ],

    tHesaplar:[
      { hesap:'Trade receivables', kod:'120 (asset)',
        borc:[{ ad:'Sales invoices', tutar:1850000 }, { ad:'Dunning charge', tutar:150 }],
        alacak:[{ ad:'Collections', tutar:1420000 }, { ad:'Transfer to doubtful', tutar:240000 }],
        not:'Dunning itself **doesn\'t affect** this account' },
      { hesap:'Doubtful trade receivables', kod:'128 (asset)',
        borc:[{ ad:'Transfer from 120', tutar:240000 }],
        alacak:[{ ad:'Collection', tutar:240000 }],
        not:'After a 3rd-level dunning' },
      { hesap:'Doubtful receivable provision', kod:'129 (contra asset)',
        borc:[{ ad:'Provision reversal', tutar:120000 }],
        alacak:[{ ad:'Provision set aside', tutar:120000 }],
        not:'**Must be reversed** on collection — often forgotten' },
    ],

    notlar:[
      { tip:'warn', baslik:'The dunning level is process data, not accounting data', metin:
        'The dunning level is kept on {{KNB1}} and the item; **it has no counterpart on the ' +
        'trial balance whatsoever**.\n\n' +
        'This has two practical consequences:\n\n' +
        '**1.** Dunning history isn\'t a financial-statement line item — ' +
        'item reports like {{FBL5N}} are used to report on it.\n\n' +
        '**2.** The level **can be changed by hand** (via {{FD02}} or by changing the item). ' +
        'This is a flexibility but also a risk: if the provision policy is tied to the dunning ' +
        'level, changing the level also changes the provision amount.\n\n' +
        'Good practice: restrict who is authorized to change the level, and ' +
        'track changes via {{CDHDR}}/{{CDPOS}}.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'The dunning process varies along three axes: **level strategy**, **scope**, and ' +
      '**blocking mechanisms**. Also, where a dunning block is defined ' +
      '(customer or item) is a practically important distinction.',

    liste:[
      { ad:'Multi-Level Dunning',
        aciklama:'A 3–4 level reminder that gets harsher as the delay grows.',
        neZaman:'**The standard approach.** Increases the pressure while preserving the customer relationship.',
        ornek:'Level 1 at 14 days (a polite reminder) · level 2 at 30 days (a warning) · ' +
              'level 3 at 60 days (a legal-collection notice).',
        tcodes:['FBMP','F150'] },

      { ad:'Single-Level Dunning',
        aciklama:'A single reminder type; the level never advances.',
        neZaman:'For businesses with small amounts and a large number of customers; subscription models.',
        ornek:'The same text is sent every month. Simple, but **there is no graduated pressure**.' },

      { ad:'Payment-Term-Based',
        aciklama:'The days of delay are calculated against the **due date** coming from the payment term.',
        neZaman:'The normal flow — always.',
        ornek:'Invoice dated 01.10, payment term 30 days → due date 31.10. ' +
              '14 days\' delay = level 1 on 14.11.' },

      { ad:'Customer Dunning Block',
        aciklama:'**All** of the customer\'s items are exempted from dunning.',
        neZaman:'For customers on a payment plan, in litigation, or strategic customers.',
        ornek:'The {{KNB1}} dunning-block field. **If removing it is forgotten**, the customer ' +
              'gets no dunning for years — periodic review is essential.',
        tcodes:['FD02'] },

      { ad:'Item Dunning Block',
        aciklama:'Only a **specific item** is exempted from dunning.',
        neZaman:'When a single invoice is being disputed; the customer\'s other debts continue to be tracked.',
        ornek:'The dunning-block field on the item is filled with {{FB09}}. ' +
              '**Should be preferred over a customer block** — it\'s more targeted.' },

      { ad:'Dunning Charge',
        aciklama:'A fixed amount per level; posted as a debit to the customer.',
        neZaman:'If provided for in the contract.',
        ornek:'150 TL at level 2, 300 TL at level 3. Not common practice in Turkey; ' +
              'if applied without a contract it can\'t be collected.' },

      { ad:'Interest on Arrears',
        aciklama:'Interest calculated based on the delay period and the amount. **A separate program from dunning.**',
        neZaman:'If interest is provided for in the contract.',
        ornek:'Calculated with {{F.2B}}. An **interest indicator** must be defined on the ' +
              'customer master; otherwise the customer is silently skipped.',
        tcodes:['F.2B'] },

      { ad:'Minimum Amount',
        aciklama:'No dunning notice is produced for debts below a set amount.',
        neZaman:'Should be defined in every setup.',
        ornek:'Debts under 50 TL aren\'t dunned — the postage and processing cost would exceed the debt.' },

      { ad:'Legal Dunning Level',
        aciklama:'The last level; a notice of starting legal proceedings.',
        neZaman:'When the other levels have had no effect.',
        ornek:'Receivables that reach this level are usually moved to the {{supheli-alacak}} ' +
              'account and a provision is set aside.' },
    ],

    karsilastirmaBasliklar:['Customer Block', 'Item Block'],
    karsilastirma:[
      ['Scope', '**All** of the customer\'s items', '**Only that item**'],
      ['Where it\'s defined', '{{KNB1}} — {{FD02}}', 'On the item — {{FB09}}'],
      ['Typical use', 'Payment plan, litigation', 'A single disputed invoice'],
      ['Risk', 'Removing it is **forgotten** → no dunning for years', 'Limited — a single item'],
      ['Other debts', 'They also drop out of tracking', '**Continue to be tracked**'],
      ['Preference', 'Only when genuinely needed', '**The default choice**'],
      ['Review', 'Periodic review is **mandatory**', 'Ends on its own once the item is cleared'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'F150', ad:'Dunning run — the process\'s engine',
        amac:'Scans overdue open items, determines the dunning level, prints the letters.',
        neZaman:'Periodically — usually weekly or every two weeks.',
        adimlar:[
          { baslik:'Enter the run date and an identifier',
            aciklama:'The identifier distinguishes multiple runs on the same day.' },
          { baslik:'Enter the **dunning date** and "up to document date"',
            aciklama:'The dunning date is **the reference the days of delay are calculated from**. ' +
                     'Entering a past date catches fewer items.' },
          { baslik:'Enter the company code and customer range' },
          { baslik:'**Generate and review the proposal**',
            aciklama:'Which customer gets which level. **Nothing has been printed yet, no field has been updated.**' },
          { baslik:'Edit the proposal',
            aciklama:'Remove a customer, change a level, set a block. The proposal **can be deleted and regenerated**.' },
          { baslik:'Print the dunning notices — **no going back**',
            aciklama:'Letters are printed, {{KNB1}} and item levels are updated.' },
        ],
        ekranAkisi:[
          { ekran:'Parameters', islem:'Dunning date 15.11.2027 · up to document date 15.11.2027' },
          { ekran:'Free selection', islem:'Company 1000 · customer C-5000 → C-5999' },
          { ekran:'Proposal', islem:'42 customers · level 1: 28 · level 2: 11 · level 3: 3' },
          { ekran:'Editing', islem:'C-5010 payment plan → removed' },
          { ekran:'Printing', islem:'41 letters · levels updated' },
        ],
        alanlar:{
          zorunlu:['Run date','Identifier','Dunning date','Up to document date','Company code'],
          opsiyonel:['Customer range','Dunning procedure','Output device'] },
        hatalar:[
          { mesaj:'No dunning notices were created', sebep:'No procedure is assigned to the customers, all are blocked, amounts are below the minimum, or the delay isn\'t enough.', cozum:'Check the {{KNB1}} `MAHNA` field — **this is the most common reason**. Then check the block and minimum-amount settings.' },
          { mesaj:'Dunning run already exists for this date/identifier', sebep:'A run already exists with the same date+identifier.', cozum:'Use a different identifier, or delete the old run.' },
          { mesaj:'The proposal is empty but there are open items', sebep:'The dunning date is too early; the days of delay haven\'t accumulated yet.', cozum:'Compare the dunning date against the day counts in the procedure.' },
        ],
        ipucu:'**Never combine the proposal step with the printing step.** ' +
              'After a procedure change, take the first run only as far as the proposal and ' +
              'review the list. After printing, the dunning level has been written and ' +
              'reversing it requires manual intervention — the letter has already gone out too.',
        ilgili:['FBMP','FBL5N','FD02'] },

      { kod:'FBMP', ad:'Dunning procedure definition',
        amac:'Defines the levels, day ranges, texts, and charge/interest settings.',
        neZaman:'During setup; when the dunning policy changes.',
        adimlar:[
          { baslik:'Define the procedure header',
            aciklama:'The **dunning interval** (the minimum number of days between two dunning ' +
                     'notices) and the number of levels. The result is written to {{T047}}.' },
          { baslik:'Define the levels',
            aciklama:'The **days in arrears** and minimum amount for each level. ' +
                     'Level 1: 14 days, level 2: 30 days, level 3: 60 days.' },
          { baslik:'Assign the texts (forms)',
            aciklama:'Each level gets its own letter text; the tone escalates by level.' },
          { baslik:'Enter the charge and interest settings',
            aciklama:'A fixed charge per level; the interest indicator.' },
          { baslik:'Check account determination',
            aciklama:'If a charge or interest will be posted, an income account must be defined.' },
        ],
        alanlar:{
          zorunlu:['Procedure code','Number of levels','Days in arrears','Text (form)'],
          opsiyonel:['Dunning charge','Interest indicator','Minimum amount','Currency-specific settings'] },
        hatalar:[
          { mesaj:'Dunning level ... has no form assigned', sebep:'No text is assigned to the level.', cozum:'Assign a form for every level; otherwise that level can\'t be printed.' },
        ],
        ipucu:'**The dunning interval and the days in arrears are different things** and get confused:\n\n' +
              '**Days in arrears** — how many days after the due date this level kicks in.\n\n' +
              '**Dunning interval** — the minimum time that must pass between two dunning notices ' +
              'to the same customer.\n\n' +
              'If the interval is 10 days, a customer who got a level-1 notice yesterday can\'t ' +
              'get a level-2 notice today — even if the days in arrears have accumulated. ' +
              'This is the answer to "why isn\'t the level advancing?" in weekly runs.',
        ilgili:['F150','T047','FD02'] },

      { kod:'FBL5N', ad:'Customer line items — with a dunning-level filter',
        amac:'Lists open items; the dunning level and last dunning date can be displayed.',
        neZaman:'For assessing a provision; for the question "who\'s at which level?"',
        adimlar:[
          { baslik:'Enter the customer and company code' },
          { baslik:'Select open items' },
          { baslik:'**Add the dunning-level column**',
            aciklama:'Change the layout to add `MAHNS` (dunning level) and `MADAT` (last dunning date).' },
          { baslik:'Filter by level and assess the provision' },
        ],
        ipucu:'The dunning-level column **isn\'t in the default layout**; it must be added by hand. ' +
              'Add it once and save the layout — it\'s a job that repeats every month for ' +
              'provision assessment.\n\n' +
              'With a saved layout, the query "open items that received a 3rd-level dunning" ' +
              'takes seconds and becomes the objective basis for the provision policy.',
        ilgili:['F150','FD02','FBL5H'] },

      { kod:'FD02', ad:'Change customer master data — dunning fields',
        amac:'Manages the dunning procedure, block, and level.',
        neZaman:'When assigning a procedure; when setting/removing a block; when correcting a level.',
        adimlar:[
          { baslik:'Enter the customer and company code' },
          { baslik:'Go to the payment transactions tab',
            aciklama:'The dunning fields are here: procedure, block, level, last dunning date.' },
          { baslik:'Assign the dunning procedure',
            aciklama:'{{KNB1}} `MAHNA`. **If blank, the customer never gets a dunning notice.**' },
          { baslik:'Set a block if needed',
            aciklama:'A block key is entered; **remembering to remove it** is essential.' },
        ],
        ipucu:'The diagnostic order for "why isn\'t a dunning notice going to this customer?": ' +
              '**1)** is {{KNB1}} `MAHNA` filled in, **2)** is there a dunning block, ' +
              '**3)** is there a block at the item level, **4)** is the amount above the ' +
              'minimum, **5)** have the days in arrears and the dunning interval elapsed.\n\n' +
              'Most cases are resolved at **the first item**.',
        ilgili:['F150','FBMP','BP'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'The table side of dunning has two layers: **configuration** ({{T047}}) and ' +
      '**result** ({{KNB1}} customer level + item level). ' +
      'Run data is also held in temporary tables ({{MHNK}}, {{MHND}}).',

    liste:[
      { ad:'KNB1', baslik:'Customer company code data — the dunning fields live here',
        tutar:'The dunning procedure, block, **last dunning level**, and its date.',
        olusturan:'{{BP}} → the FI Customer role',
        guncelleyen:'By hand via {{FD02}}; **automatically by {{F150}} at printing**',
        anahtar:'KUNNR + BUKRS',
        iliskiler:'Via the procedure to {{T047}}; via {{BSID}} open items.',
        s4:'Managed via {{BP}}.',
        alanlar:[
          { ad:'MAHNA', aciklama:'**Dunning procedure** — if blank, the customer **never gets a dunning notice**' },
          { ad:'MANSP', aciklama:'Dunning block — if filled, all items are exempt' },
          { ad:'MAHNS', aciklama:'Last dunning **level** — updated by {{F150}} at printing' },
          { ad:'MADAT', aciklama:'Last dunning date — used in the dunning-interval check' },
          { ad:'AKONT', aciklama:'{{mutabakat-hesabi}}', tip:'fk' },
        ] },

      { ad:'T047', baslik:'Dunning procedure definition',
        tutar:'The procedure\'s header settings: dunning interval, number of levels, minimum amounts.',
        olusturan:'{{FBMP}}',
        guncelleyen:'{{FBMP}}',
        anahtar:'MAHNA',
        iliskiler:'{{KNB1}} `MAHNA` points to this table.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'MAHNA', aciklama:'Procedure code', tip:'pk' },
          { ad:'MANWT', aciklama:'**Dunning interval (days)** — the minimum time between two dunning notices' },
        ] },

      { ad:'BSID', baslik:'Customer open items',
        tutar:'The items to be dunned; each item has **its own dunning level**.',
        olusturan:'Documents containing a customer item',
        guncelleyen:'{{F150}} writes the item level at printing',
        anahtar:'KUNNR + BUKRS + BELNR + BUZEI',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'MANSP', aciklama:'**Item-level** dunning block — independent of the customer block' },
          { ad:'MAHNS', aciklama:'The item\'s dunning level' },
          { ad:'ZFBDT / ZBD1T', aciklama:'The basis of the due-date calculation — the delay is calculated from here' },
        ] },

      { ad:'MHNK', baslik:'Dunning data — header',
        tutar:'The customer-level result of a dunning run.',
        olusturan:'{{F150}}',
        guncelleyen:'A new run',
        s4:'Unchanged.' },

      { ad:'MHND', baslik:'Dunning data — item',
        tutar:'Which item was dunned at which level.',
        olusturan:'{{F150}}',
        s4:'Unchanged.' },

      { ad:'BSEG', baslik:'Document line items',
        tutar:'The dunning level and block are also held here on the item.',
        olusturan:'Document posting',
        s4:'{{uyumluluk-view}}.' },
    ],

    er:{
      type:'er',
      baslik:'Dunning — from configuration to the customer',
      varliklar:[
        { ad:'T047', rol:'Configuration', aciklama:'Dunning procedure',
          alanlar:[{ ad:'MAHNA', tip:'pk' }, { ad:'MANWT' }] },
        { ad:'KNB1', rol:'Master data', hub:true, aciklama:'**Customer dunning fields**',
          alanlar:[{ ad:'KUNNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }, { ad:'MAHNA', tip:'fk' }, { ad:'MANSP' }, { ad:'MAHNS' }] },
        { ad:'BSID', rol:'Open item', aciklama:'Items to be dunned',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'MAHNS' }, { ad:'MANSP' }] },
        { ad:'MHNK', rol:'Dunning data', aciklama:'Run result — header',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'LAUFD' }] },
        { ad:'MHND', rol:'Dunning data', aciklama:'Run result — item',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'MAHNS' }] },
        { ad:'BKPF', rol:'FI', aciklama:'Document header',
          alanlar:[{ ad:'BELNR', tip:'pk' }] },
      ],
      iliskiler:[
        { from:'T047', to:'KNB1', alanlar:'MAHNA', not:'procedure assignment' },
        { from:'KNB1', to:'BSID', alanlar:'KUNNR', not:'customer → open items' },
        { from:'BKPF', to:'BSID', alanlar:'BELNR', not:'document → item' },
        { from:'BSID', to:'MHND', alanlar:'BELNR', not:'**the dunned item**' },
        { from:'KNB1', to:'MHNK', alanlar:'KUNNR', not:'the run result' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'The {{F150}} screen resembles other batch programs ({{F110}}): parameters → proposal → ' +
      'editing → printing. Its distinguishing feature is that **the proposal step is entirely risk-free**.',

    ekranlar:[
      { ad:'{{F150}} — the parameter screen',
        aciklama:'The scope and reference dates of the run are set here.',
        alanlar:[
          { ad:'Run date + identifier', zorunlu:true, aciklama:'Together they must be unique.' },
          { ad:'**Dunning date**', zorunlu:true, aciklama:'**The reference the days of delay are calculated from.** ' +
                   'Entering a past date catches fewer items.' },
          { ad:'Up to document date', zorunlu:true, aciklama:'Documents dated after this aren\'t taken into account.' },
          { ad:'Company code', zorunlu:true },
          { ad:'Customer range', zorunlu:false, aciklama:'If blank, all customers are scanned.' },
        ],
        ipucu:'The dunning date and the run date **can differ**, and this is a deliberate ' +
              'flexibility: you can run it on the 20th of the month and set the dunning date to ' +
              'the 15th. But the consequence is that items falling due between the 15th and the ' +
              '20th **aren\'t caught**. This is one of the common reasons for "why wasn\'t this ' +
              'invoice dunned?"' },

      { ad:'{{F150}} — the proposal screen (dunning proposal)',
        aciklama:'The process\'s **safety net**. Nothing has been printed, no field has been updated.',
        alanlar:[
          { ad:'Customer list', zorunlu:false, aciklama:'Which customer at which level.' },
          { ad:'Removing a customer', zorunlu:false, aciklama:'Customers a deal has been reached with are removed from the list.' },
          { ad:'Changing the level', zorunlu:false, aciklama:'A level can be lowered or raised by hand.' },
          { ad:'Deleting the proposal', zorunlu:false, aciklama:'**Can be deleted entirely and regenerated.**' },
        ],
        ipucu:'Nothing done on this screen is irreversible. ' +
              'After changing the procedure, generate the proposal, look at the list, and if ' +
              'it isn\'t what you expected, delete the proposal and fix the procedure.\n\n' +
              '**This is the only safe way to test a procedure in production.**' },

      { ad:'{{F150}} — the printing step',
        aciklama:'The irreversible step.',
        alanlar:[
          { ad:'Output device', zorunlu:true },
          { ad:'Print mode', zorunlu:true, aciklama:'Printer, PDF, or email.' },
          { ad:'Result', zorunlu:false, aciklama:'{{KNB1}} `MAHNS` and `MADAT` are **updated**; ' +
                   'item levels are written.' },
        ],
        ipucu:'After printing, reversing the level requires a manual correction with {{FD02}} — ' +
              'and the letter has already gone out. That\'s why the printing step ' +
              '**should never be run before the proposal has been reviewed**.' },

      { ad:'{{FBMP}} — the procedure definition',
        aciklama:'Where the dunning policy is translated into the system.',
        alanlar:[
          { ad:'Dunning interval', zorunlu:true, aciklama:'The **minimum days** between two dunning notices. ' +
                   'Different from days in arrears.' },
          { ad:'Number of levels', zorunlu:true, aciklama:'Usually 3–4.' },
          { ad:'Days in arrears per level', zorunlu:true, aciklama:'How many days after the due date it kicks in.' },
          { ad:'Text (form)', zorunlu:true, aciklama:'Each level has its own letter.' },
          { ad:'Minimum amount', zorunlu:false, aciklama:'Debts below this aren\'t dunned.' },
          { ad:'Dunning charge / interest indicator', zorunlu:false },
        ],
        ipucu:'Keep the number of levels **low**. A five-level procedure, in a weekly run, ' +
              'takes months for a customer to reach the last level and the pressure effect is ' +
              'lost. Three levels (reminder → warning → legal) are enough for most businesses.' },
    ],

    zorunlu:['Run date','Identifier','Dunning date','Company code','Procedure code','Level texts'],
    opsiyonel:['Customer range','Dunning charge','Interest indicator','Minimum amount'],

    hatalar:[
      { mesaj:'No dunning notices were created', sebep:'**Most common:** no dunning procedure assigned to the customers ({{KNB1}} `MAHNA` is blank). Others: a block, the minimum amount, insufficient delay.', cozum:'Diagnostic order: MAHNA → customer block → item block → minimum amount → days in arrears + dunning interval.' },
      { mesaj:'The level isn\'t advancing, it keeps printing level 1', sebep:'The **dunning interval** hasn\'t elapsed; not enough days have passed since the last dunning.', cozum:'Compare {{T047}} `MANWT` against the run frequency. In a weekly run, a 10-day interval slows the levels down.' },
      { mesaj:'Dunning run already exists for this date/identifier', sebep:'The same date+identifier combination has already been used.', cozum:'Give a different identifier, or delete the old run.' },
      { mesaj:'Dunning level ... has no form assigned', sebep:'No text is assigned to the level.', cozum:'Assign a form for every level in {{FBMP}}.' },
      { mesaj:'A customer hasn\'t received a dunning notice in years', sebep:'A customer dunning block was set and **removing it was forgotten**.', cozum:'Periodically list and review customers with {{KNB1}} `MANSP` filled in.' },
      { mesaj:'Interest shows on the dunning letter but not in accounting', sebep:'Interest isn\'t part of dunning; the separate program ({{F.2B}}) hasn\'t been run.', cozum:'Calculate and post the interest with {{F.2B}}. An interest indicator must be defined on the customer.' },
    ],

    ipuclari:[
      '**Never combine the proposal with printing.** After a procedure change, take the first ' +
      'run only as far as the proposal.',
      'The first thing to check when diagnosing "why wasn\'t a dunning notice sent?": is {{KNB1}} ' +
      '`MAHNA` filled in? Most cases are resolved here.',
      'Prefer an item block over a customer block — it\'s more targeted, and even if removing it ' +
      'is forgotten, its effect ends when the item is cleared.',
      'Periodically list customers with a dunning block; blocks whose removal was forgotten ' +
      'produce years of untracked receivables.',
      'Add the dunning-level column to {{FBL5N}} and **save the layout** — it\'s a job that ' +
      'repeats every month for provision assessment.',
      'Keep the number of levels at three; more than that weakens the pressure effect.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'KNB1', ne:'**The dunning level** (`MAHNS`) and last dunning date (`MADAT`) — at printing' },
      { tablo:'BSID', ne:'The dunning level per item' },
      { tablo:'BSEG', ne:'The item\'s dunning fields' },
      { tablo:'MHNK', ne:'The run result — customer header' },
      { tablo:'MHND', ne:'The run result — item' },
      { tablo:'T047', ne:'The procedure definition ({{FBMP}})' },
    ],

    commit:
      'The dunning run commits in **two separate phases**, and this split is the foundation of ' +
      'the process\'s safety logic:\n\n' +
      '**Phase 1 — the proposal:** only the temporary run tables are written. ' +
      'Master data and items are **never touched**. The proposal can be deleted.\n\n' +
      '**Phase 2 — printing:** the letters are produced and, **in the same LUW**, {{KNB1}} and ' +
      'the item dunning levels are updated.\n\n' +
      'The atomicity of the second phase matters: a letter being printed without the level being ' +
      'written (or the reverse) would create an inconsistency. ' +
      'But in practice there is this risk: **a printer problem after printing has completed** — ' +
      'the level has been written, the letter never came out. In that case the letter is ' +
      're-printed by taking output again from the run; the level doesn\'t increase a second time.',

    belgeNo:
      'Dunning **produces no document number** — it isn\'t an accounting document. ' +
      'A run is identified by the date + identifier pair.\n\n' +
      'If a dunning charge or interest is posted, **then** a normal FI document ' +
      '(usually DR/DA) is created and gets its own number.',

    postingLogic:
      'The dunning selection logic applies these filters in sequence:\n\n' +
      '**1.** Does the customer have a dunning procedure? ({{KNB1}} `MAHNA`) — if not, it is **skipped**.\n' +
      '**2.** Does the customer have a dunning block? — if so, it is skipped.\n' +
      '**3.** Does the item have a dunning block? — if so, that item is skipped.\n' +
      '**4.** Is the item overdue? Which level does the days-in-arrears figure correspond to?\n' +
      '**5.** Has the **dunning interval** worth of days passed since the last dunning? — if not, ' +
      'the level doesn\'t advance.\n' +
      '**6.** Is the amount above the minimum?\n' +
      '**7.** The highest level among the remaining items is determined — ' +
      '**a customer is dunned at a single level**, even if the items are at different levels.\n\n' +
      'Point 7 is often surprising: if three of a customer\'s items are at level 1 and one item ' +
      'is at level 3, the customer gets **a single level-3 letter** listing all the items.',

    belgeTuru:
      'Dunning has no document type of its own. If a dunning charge is posted, ' +
      'a customer-debit document type (DR or DA) is used; ' +
      'interest on arrears the same way.',

    numberRange:
      'Dunning needs no number range. Charge/interest documents ' +
      'use the number range of their own document type.',

    accountDetermination:
      'Dunning itself uses no account. Income accounts must be defined for the dunning charge ' +
      'and interest on arrears — the charge inside {{FBMP}}, ' +
      'interest in the interest-calculation configuration ({{OB46}} and the related steps).\n\n' +
      'If left undefined, the charge/interest is **posted silently — meaning not posted at all**, ' +
      'and the amount shown on the letter never reaches accounting — a situation similar to the ' +
      'silent error in SD integration.',

    tur:
      '**Configuration:** dunning procedures ({{FBMP}} → {{T047}}), level definitions, ' +
      'text forms, minimum amounts, charge settings.\n\n' +
      '**Master data:** the customer\'s dunning procedure, block, and **current level** ({{KNB1}}).\n\n' +
      '**Transaction data:** item dunning levels, run results ({{MHNK}}/{{MHND}}).\n\n' +
      'Note: **the dunning level is transaction information held in master data** — ' +
      'when master data is migrated, this field doesn\'t and shouldn\'t go to the target system.',

    transport:
      'Procedure definitions and text forms transport. **Two warnings:**\n\n' +
      '**1.** The procedure transports but **its assignment to customers doesn\'t** — ' +
      'that\'s master data. If customers in production haven\'t been assigned a procedure, ' +
      'dunning runs but **produces no letters at all**.\n\n' +
      '**2.** Text forms can transport separately, and a version mismatch causes ' +
      'printing errors.\n\n' +
      'A migration check: compare the number of customers in production with {{KNB1}} `MAHNA` ' +
      'filled in against the total number of customers.',

    img:[
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Dunning → Dunning Procedure → Define Dunning Procedures', not:'{{FBMP}} → {{T047}}' },
      { yol:'SPRO → … → Dunning → Dunning Procedure → Define Dunning Texts', not:'A form per level' },
      { yol:'SPRO → … → Dunning → Define Reasons for Dunning Block', not:'Block keys' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Interest Calculation', not:'{{F.2B}} — interest on arrears (**separate** from dunning)' },
    ],

    ekstra:[
      { ic:'⏱', baslik:'Days in arrears vs. dunning interval — the most confused pair', metin:
        'There are two separate day counts, and if the difference between them isn\'t ' +
        'understood, the question "why isn\'t the level advancing?" goes unanswered.\n\n' +
        '**Days in arrears:** how many days after the due date this level kicks in. ' +
        'Level 1: 14 days, level 2: 30 days.\n\n' +
        '**Dunning interval:** the minimum time that must pass **between two dunning notices** ' +
        'to the same customer. {{T047}} `MANWT`.\n\n' +
        '**A scenario where they collide:** the dunning interval is 10 days. A customer got a ' +
        'level-1 dunning on November 15. A run is made on November 20 and the delay is now ' +
        '32 days — which corresponds to level 2.\n\n' +
        'But only **5 days** have passed since the last dunning. Because the dunning interval is ' +
        '10 days, the system **produces no dunning notice at all**. The customer won\'t get the ' +
        'second letter before November 25.\n\n' +
        '**Practical consequence:** the run frequency and the dunning interval must be ' +
        '**compatible**. A weekly run plus a 10-day interval slows the levels\' progress. Either ' +
        'lower the interval to 7 days or switch the run to once every two weeks.' },

      { ic:'📬', baslik:'A customer is dunned at a single level — even if the items differ', metin:
        'A customer has four open items: three are 20 days overdue (level 1), ' +
        'one is 70 days overdue (level 3).\n\n' +
        'The system does **not** send four separate letters. The customer gets **a single ' +
        'letter**, and its level is that of the item at the **highest level**: level 3.\n\n' +
        'All four items are listed in the letter, but its tone and text are level 3\'s — ' +
        'meaning it contains a legal-collection warning.\n\n' +
        'This behavior is **correct and deliberate**: sending a customer three letters of ' +
        'different severity on the same day would make no sense.\n\n' +
        'But it has a practical consequence: **an old, small item pulls the entire relationship ' +
        'to the legal-collection level**. A forgotten 200 TL discrepancy can cause a legal ' +
        'warning to be sent to an otherwise regularly paying customer.\n\n' +
        '**Preventive measure:** set the minimum-amount rule carefully, and ' +
        'clean up small balance differences at period end ({{F-32}} residual item clearing).' },
    ],

    notlar:[
      { tip:'warn', baslik:'A dunning block is a setting whose removal gets forgotten', metin:
        'A customer dunning block ({{KNB1}} `MANSP`) is usually set for a temporary reason: ' +
        'put on a payment plan, a dispute, a senior-management instruction.\n\n' +
        'The problem is this: **the block doesn\'t lift on its own** and has no expiration date.\n\n' +
        'The consequence: even years after the reason has gone away, the customer gets no ' +
        'dunning notices. The receivable builds up and nobody notices, because it **never ' +
        'appears** on the dunning list at all.\n\n' +
        '**Prevention:** save a query listing customers with {{KNB1}} `MANSP` filled in and ' +
        'review it quarterly. Also **prefer an item block** — ' +
        'its effect ends on its own once the item is cleared.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The dunning mechanism **hasn\'t changed** in S/4HANA: {{FBMP}}, {{F150}}, {{T047}}, and the ' +
      '{{KNB1}} fields are the same. What has changed is that Fiori-based collections apps and ' +
      'SAP Collections Management now offer a more advanced alternative.',

    eccFarklari:[
      { konu:'Dunning procedure', ecc:'{{FBMP}} → {{T047}}', s4:'**Unchanged**' },
      { konu:'Dunning run', ecc:'{{F150}}', s4:'Same + Fiori "Manage Dunning Notices"' },
      { konu:'Customer master data', ecc:'{{XD01}} / {{FD02}}', s4:'{{BP}}' },
      { konu:'Open item data', ecc:'{{BSID}} physical', s4:'{{uyumluluk-view}} — from {{ACDOCA}}' },
      { konu:'Collections management', ecc:'Dunning only', s4:'**SAP Collections Management** — a worklist, a priority score' },
      { konu:'Analysis', ecc:'{{FBL5N}} + Excel', s4:'Fiori collections analysis apps' },
    ],

    universalJournal:
      'Dunning doesn\'t write to {{ACDOCA}} directly — because it produces no accounting entry. ' +
      'But the dunned items are read from {{ACDOCA}}, and ' +
      'analysis can now be done **together with the dimensions**.\n\n' +
      'The practical gain: questions like "which sales organization\'s customers get dunned ' +
      'more?" or "which profit center is accumulating overdue receivables?" are answered ' +
      'without any extra join.',

    kalkanTcodes:[
      { eski:'{{XD01}} / {{FD02}}', yeni:'{{BP}}', not:'Dunning fields are inside BP' },
      { eski:'—', yeni:'—', not:'{{F150}}, {{FBMP}}, {{FBL5N}} **were not removed**' },
    ],

    fiori:[
      { ad:'Manage Dunning Notices', aciklama:'Shows dunning proposals as a visual list; ' +
             'makes removing a customer and changing a level easier.' },
      { ad:'Schedule Dunning Runs', aciklama:'Replaces {{F150}}; schedules the periodic run.' },
      { ad:'Manage Customer Line Items', aciklama:'Replaces {{FBL5N}}; filtered by dunning level.' },
      { ad:'Collections Worklist', aciklama:'SAP Collections Management — a collections worklist ' +
             'ranked by priority score.' },
      { ad:'Overdue Receivables', aciklama:'Aging analysis of overdue receivables.' },
    ],

    compatibilityViews:[
      '{{BSID}}, {{BSAD}} — views derived from {{ACDOCA}}.',
      '{{KNB1}}, {{T047}}, {{MHNK}}, {{MHND}} — **remain as physical tables**.',
      'Dunning is among the areas structurally unaffected by the S/4HANA migration.',
    ],

    performans:
      'Because a dunning run performs an open-item scan, it was slow on large customer ' +
      'portfolios in ECC; it became noticeably faster with HANA.\n\n' +
      'The real difference comes with **Collections Management**: classic dunning answers ' +
      '"who is overdue?"; Collections Management answers "who should I call **first**?" with a ' +
      'priority score (amount, delay, customer history, payment behavior).',

    bestPractices:[
      '**Stick with** classic dunning if it\'s sufficient — Collections Management requires a ' +
      'separate configuration and process investment.',
      'Use Fiori "Manage Dunning Notices" to make editing the proposal easier; ' +
      'the proposal step\'s usage rate goes up.',
      'During migration, verify that customers\' {{KNB1}} `MAHNA` field is filled in — ' +
      'the procedure transports but **the assignment doesn\'t**.',
      'Clean up customers with a dunning block before migration; ' +
      'old blocks get overlooked in the new system.',
      'Enrich the overdue-receivable analysis with {{ACDOCA}} dimensions — ' +
      'it becomes possible, for the first time, to see which segment has poor collections.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'Dunning ran, 42 customers were selected, 3 letters went out: where are the other 39?',
    hikaye:
      '**Doğu Trading Inc.**\'s collections clerk runs {{F150}} for the first time. ' +
      'The proposal screen lists **42 customers** — as expected.\n\n' +
      'Printing is run. **3 letters** come out of the printer.\n\n' +
      'What happened to the remaining 39 customers? This scenario shows dunning\'s two most ' +
      'common configuration problems and the diagnostic method.',
    veriler:[
      { k:'Company code', v:'1000 · TRY' },
      { k:'Open customer items', v:'340 items · 187 customers' },
      { k:'Overdue', v:'42 customers · 2,860,000 TL total' },
      { k:'Dunning procedure', v:'Z1 · 3 levels (14 / 30 / 60 days)' },
      { k:'**The problem**', v:'42 in the proposal, **3 letters** printed' },
    ],

    adimlar:[
      { baslik:'The proposal is regenerated and read carefully', tcode:'F150',
        aciklama:'This time the **status column** in the proposal list is examined.',
        girdi:[
          { alan:'Customers listed', deger:'42' },
          { alan:'In "to be dunned" status', deger:'**3**' },
          { alan:'In "no procedure" status', deger:'**31**' },
          { alan:'In "blocked" status', deger:'**8**' },
        ],
        not:'**The first lesson is here:** the proposal list is **not** a list of "customers to be ' +
             'dunned" — it\'s a list of "customers examined." Looking at the total without ' +
             'reading the status column is misleading.\n\n' +
             'Only 3 of the 42 customers are actually in a state to be dunned; ' +
             'the rest are eliminated for two reasons.' },

      { baslik:'The first reason — 31 customers have no procedure', tcode:'FBL5N',
        aciklama:'The dunning-procedure field in customer master data is checked.',
        girdi:[
          { alan:'Total customers', deger:'187' },
          { alan:'{{KNB1}} `MAHNA` filled in', deger:'**23**' },
          { alan:'`MAHNA` blank', deger:'**164**' },
          { alan:'Reason', deger:'The procedure was just defined, and **never assigned to the customers**' },
        ],
        not:'**Defining a procedure isn\'t enough — it must be assigned to the customer.**\n\n' +
             'This is the live counterpart of the "the procedure transports but the assignment ' +
             'doesn\'t" rule: the {{FBMP}} configuration came from the test system, ' +
             'but {{KNB1}} `MAHNA` is a **master data** field and didn\'t transport.\n\n' +
             'The consultant set up the procedure and said "dunning is ready"; nobody said it ' +
             'still needed to be assigned to the customers.' },

      { baslik:'A mass assignment is performed', tcode:'FD02',
        aciklama:'The procedure is assigned to 164 customers — not one by one, but with a mass change.',
        girdi:[
          { alan:'Method', deger:'Mass master data change (XD99 / LSMW or a {{BP}} mass update)' },
          { alan:'Assigned', deger:'`MAHNA` = **Z1** · 164 customers' },
          { alan:'Exception', deger:'12 public-sector customers excluded (a different procedure, Z2)' },
        ],
        tabloEtkisi:[
          { tablo:'KNB1', ne:'`MAHNA` field filled in for 164 customers' },
        ],
        not:'**A critical detail:** customer segments were separated during the assignment. ' +
             'A longer-term procedure (Z2: 30/60/90 days) was assigned to public-sector ' +
             'customers — because their payment processes are structurally longer, and sending ' +
             'the same-severity dunning would have damaged the relationship.' },

      { baslik:'The second reason — 8 customers have a block', tcode:'FD02',
        aciklama:'Blocked customers are examined one by one.',
        girdi:[
          { alan:'Blocked customers', deger:'8' },
          { alan:'On a payment plan (valid)', deger:'**2**' },
          { alan:'In litigation (valid)', deger:'**1**' },
          { alan:'**Reason unknown / old**', deger:'**5**' },
          { alan:'Oldest block date', deger:'**2024** — 3 years old' },
        ],
        not:'Five customers\' blocks were set years ago and **nobody knows why**. ' +
             'The total overdue receivable of these five customers: **410,000 TL**.\n\n' +
             'For three years, these customers never got a single dunning notice, and because ' +
             'they **never appeared** on the dunning list, nobody noticed.\n\n' +
             'This is the most typical problem with a dunning block: **it has no expiration date.**' },

      { baslik:'Blocks are cleared, the proposal is regenerated', tcode:'F150',
        aciklama:'Invalid blocks are removed and the proposal is run again.',
        girdi:[
          { alan:'Block removed', deger:'5 customers' },
          { alan:'Block kept', deger:'3 customers (payment plan + litigation)' },
          { alan:'**New proposal**', deger:'42 customers · **39 to be dunned**' },
          { alan:'Level distribution', deger:'Level 1: 26 · level 2: 10 · level 3: 3' },
        ],
        not:'The proposal now reflects reality. But **printing hasn\'t happened yet** — ' +
             'the list is reviewed one more time.' },

      { baslik:'The proposal is edited — two customers are removed', tcode:'F150',
        aciklama:'A final check before printing.',
        girdi:[
          { alan:'C-5044', deger:'Promised payment yesterday → **removed**' },
          { alan:'C-5112', deger:'Level 3 but the amount is **180 TL** → removed' },
          { alan:'C-5112 detail', deger:'An old rounding discrepancy; the customer has no other debt' },
          { alan:'To be printed', deger:'**37 letters**' },
        ],
        not:'**The C-5112 case is instructive:** a forgotten 180 TL balance discrepancy has ' +
             'landed on level 3 (a legal-collection warning) because it\'s 70 days overdue.\n\n' +
             'Sending a legal warning over 180 TL to an otherwise regularly paying customer ' +
             'damages the relationship. The item was cleaned up with a residual clearing via ' +
             '{{F-32}}, and the minimum amount was raised from 50 TL to **250 TL**.' },

      { baslik:'The dunning notices are printed', tcode:'F150',
        aciklama:'The printing step is run — the irreversible step.',
        girdi:[
          { alan:'Printed', deger:'37 letters' },
          { alan:'Updated', deger:'{{KNB1}} `MAHNS` and `MADAT` · item levels' },
          { alan:'Accounting entry', deger:'**None** — the trial balance is unchanged' },
        ],
        tabloEtkisi:[
          { tablo:'KNB1', ne:'The dunning level and date were updated for 37 customers' },
          { tablo:'BSID', ne:'The level was written on the relevant items' },
          { tablo:'MHNK', ne:'The run result was recorded' },
          { tablo:'ACDOCA', ne:'**No change** — dunning produces no accounting entry' },
        ],
        not:'The trial balance was checked: **not a single cent changed**. ' +
             'Dunning is a process transaction, not an accounting transaction.' },

      { baslik:'The second week — the levels aren\'t advancing', tcode:'F150',
        aciklama:'A week later it\'s run again, but it doesn\'t go as expected.',
        girdi:[
          { alan:'Expected', deger:'Some of the level-1 customers should move to level 2' },
          { alan:'Actual outcome', deger:'**No new dunning notices were produced at all**' },
          { alan:'Procedure dunning interval', deger:'{{T047}} `MANWT` = **14 days**' },
          { alan:'Days since the last dunning', deger:'**7 days**' },
        ],
        not:'**The second lesson:** days in arrears and the **dunning interval** are different ' +
             'things.\n\n' +
             'Even if the customers\' delay corresponds to level 2, only 7 days have passed ' +
             'since the last dunning, and the procedure\'s dunning interval is 14 days.\n\n' +
             'The system is behaving correctly: sending the same customer a second letter within ' +
             'a week would make no sense. ' +
             'Solution: **switch the run to once every two weeks** ' +
             '(or lower the interval to 7 days — but that\'s a more aggressive policy).' },

      { baslik:'Preventive measures and routine setup', tcode:'FBL5N',
        aciklama:'The process is made permanent.',
        girdi:[
          { alan:'Measure 1', deger:'The run is done **every two weeks** — in line with the dunning interval' },
          { alan:'Measure 2', deger:'`MAHNA` was made a **required field** when opening a new customer' },
          { alan:'Measure 3', deger:'The blocked-customer list gets a **quarterly** review' },
          { alan:'Measure 4', deger:'Minimum amount 250 TL — so small discrepancies don\'t reach the legal level' },
          { alan:'Measure 5', deger:'The {{FBL5N}} dunning-level layout was saved (for the provision)' },
        ],
        not:'The second measure is the most durable: `MAHNA` was made mandatory in the ' +
             '**field status** of the customer account group. A customer without a procedure ' +
             '**can no longer be opened** — the problem was closed at its source.' },
    ],

    sonuc:
      '**3 letters came out of a 42-customer proposal** — and both reasons were in the ' +
      'configuration.\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. The proposal list is not a "to be dunned" list.** ' +
      'It\'s a list of "customers examined," and looking at the total without reading the ' +
      '**status column** is misleading. Of the 42, 31 had no procedure, 8 were blocked, and ' +
      'only 3 were actually in a state to be dunned.\n\n' +
      '**2. Defining a procedure isn\'t enough — it must be assigned to the customer.** ' +
      '{{FBMP}} is a **configuration** and it transports; {{KNB1}} `MAHNA` is a **master data** ' +
      'field and it doesn\'t. This is the first item in the diagnostic order for "why wasn\'t a ' +
      'dunning notice sent?" and most cases are resolved there.\n\n' +
      '**3. A dunning block has no expiration date.** ' +
      'Five customers\' blocks had been set three years earlier, the reason forgotten, and ' +
      '410,000 TL had gone untracked. Blocked customers **don\'t stand out on their own** ' +
      'because they never appear on any dunning list — periodic review is essential. ' +
      'An item block should be preferred where possible; its effect ends when the item is cleared.\n\n' +
      '**4. The run frequency must be compatible with the dunning interval.** ' +
      'A weekly run plus a 14-day dunning interval wastes half of the runs. Days in arrears ' +
      'determine "when does this level kick in," the dunning interval determines "how often ' +
      'do we write to the same customer" — they are different questions and both must be set.',
  },

  },
});
