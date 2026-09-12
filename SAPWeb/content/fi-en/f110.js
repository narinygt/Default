/* ==========================================================================
   content/fi-en/f110.js — English body for "Automatic Payment Program (F110)"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'f110',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'The Automatic Payment Program ({{F110}}) is the program that **selects due debts in bulk, produces a ' +
      'proposal, records the payment once approved, and generates the file to be sent to the bank**.\n\n' +
      'A single run selects hundreds of invoices, merges the ones belonging to the same vendor into one payment, ' +
      'evaluates {{iskonto}} opportunities, decides which bank to pay from, and produces the payment file. Work ' +
      'that would take days by hand shrinks to minutes.\n\n' +
      'F110\'s distinguishing feature is that it is **two-staged**: first a **proposal**, then a **payment run**. ' +
      'Human approval sits between them — because real money leaves the company from here.',

    neden:
      '**Volume.** Paying 300 invoices by hand with {{F-53}} isn\'t practical.\n\n' +
      '**Accuracy.** Due date, {{iskonto}} period, {{odeme-blogu}}, and bank selection are all rule-driven; human ' +
      'error disappears.\n\n' +
      '**Cash optimization.** For every item, the program works out "would I earn a discount by paying today, or ' +
      'should I hold cash until the due date?" and picks the most profitable day.\n\n' +
      '**Control.** The proposal stage creates a mandatory checkpoint before any money moves.',

    sirketOnemi:
      'F110 is the main gate through which money leaves the company. That\'s why it is both the FI transaction ' +
      '**requiring the most control** and the one **demanding the most configuration**.\n\n' +
      'From a consulting standpoint: F110 itself is simple, what\'s hard is the {{FBZP}} configuration. The ' +
      'answer to complaints like "F110 isn\'t selecting any items" or "it\'s paying from the wrong bank" is ' +
      'almost always in FBZP. The answer to "how many steps does FBZP have and what do they do?" gives away ' +
      'whether F110 was actually set up properly.',

    gercekHayat:
      'A manufacturing company runs a payment cycle on the 10th and 25th of each month. On the morning of ' +
      'September 25th, the treasury specialist opens F110: enters the parameters, runs the proposal.\n\n' +
      'The system scans 340 open items: 47 are blocked (excluded), 61 aren\'t yet due (carried to the next run), ' +
      '232 are to be paid. 18 of these are within their discount period — the program brings them forward. The ' +
      '232 items, for 89 vendors, are merged into **89 payments**.\n\n' +
      'The accounting manager reviews the proposal and removes 3 vendors with open disputes. The payment run is ' +
      'executed: 86 payment documents and a single bank file are generated. The file is sent to the bank, the ' +
      'statement arrives the next day, and the {{banka-ara-hesabi}} is cleared.',

    muhasebeMantigi:
      'The entry F110 produces is extremely simple:\n\n' +
      '**The vendor is debited** (the payable decreases) **/ the bank is credited** (money goes out).\n\n' +
      'Two other things also happen: **{{kapatma}}** — the paid invoices move from {{BSIK}} to {{BSAK}}; and, ' +
      'where applicable, **{{iskonto}}** income and **{{kur-farki}}** are recorded on separate lines.\n\n' +
      'The entry usually goes to a {{banka-ara-hesabi}} rather than directly to the bank account. The reason: the ' +
      'moment you record the payment and the moment the money actually leaves the bank aren\'t the same. The ' +
      'real outflow is only confirmed once the bank statement arrives ({{FEBAN}}).',

    kavramlar: ['odeme-yontemi', 'odeme-blogu', 'ev-bankasi', 'banka-ara-hesabi', 'vade',
                'iskonto', 'kapatma', 'acik-kalem', 'avans', 'kur-farki'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Although F110 looks like a single transaction, it consists of **four separate stages**, and each stage ' +
      'records a distinct status. Telling these stages apart is half of error diagnosis: is the problem in the ' +
      'parameters, the proposal, the payment, or the file generation?',

    roller:[
      { rol:'AP accounting specialist', gorev:'Pre-run preparation: resolves blocked invoices ({{MRBR}}), closes out disputes.' },
      { rol:'Treasury / finance specialist', gorev:'Enters the parameters, runs the proposal, reviews it against the cash position.' },
      { rol:'Accounting manager', gorev:'**Approves** the proposal. This is the last checkpoint before money leaves.' },
      { rol:'Treasury', gorev:'Runs the payment, produces the bank file, and sends it to the bank.' },
      { rol:'Bank', gorev:'Processes the file, carries out the payments, sends a statement.' },
      { rol:'AP accounting', gorev:'Processes the statement ({{FEBAN}}), clears the {{banka-ara-hesabi}}.' },
      { rol:'FI consultant', gorev:'{{FBZP}} configuration: company code settings, payment methods, bank determination, payment medium.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'F110 — a four-stage payment run',
      adimlar:[
        { ic:'🧹', rol:'AP accounting', baslik:'Pre-run preparation',
          aciklama:'Blocked invoices are resolved ({{MRBR}}), items with an {{odeme-blogu}} are reviewed, ' +
                   'vendors missing a payment method are completed.',
          cikti:'A clean payment pool', ok:'the run is opened' },
        { ic:'⚙️', rol:'Treasury', baslik:'1. Parameters are entered',
          aciklama:'Run date + identification (this pair makes the run unique), company code, ' +
                   '{{odeme-yontemi}}, next payment date, and vendor range.',
          cikti:'Parameter record ({{REGUV}})', ok:'the proposal is run' },
        { ic:'📋', rol:'System', baslik:'2. The proposal is generated',
          aciklama:'Items falling due are selected, grouped by vendor, the bank is determined. ' +
                   '**No accounting entry is made** — written to {{REGUH}} with `XVORL = X`.',
          cikti:'Proposal list + exception list', ok:'reviewed' },
        { ic:'👁️', rol:'Accounting manager', baslik:'3. The proposal is reviewed and edited',
          aciklama:'An item can be removed, blocked, or have its payment method or bank changed. The ' +
                   '**exception list** is the most important output: it shows why items won\'t be paid.',
          cikti:'Approved proposal', ok:'approval is given' },
        { ic:'💸', rol:'Treasury', baslik:'4. The payment is run',
          aciklama:'**The accounting entries are created here:** the vendor is debited, the bank is credited, ' +
                   'invoices are cleared. Proposal records turn into actual payments.',
          cikti:'Payment documents + {{BSAK}} records', ok:'the file is generated' },
        { ic:'📄', rol:'System', baslik:'5. The payment medium is generated',
          aciklama:'{{FBPM}} or the classic program creates the bank file (payment instruction); if checks are ' +
                   'used, check numbers are assigned ({{PAYR}}).',
          cikti:'Bank file / checks', ok:'goes to the bank' },
        { ic:'🏦', rol:'AP accounting', baslik:'6. The bank statement is processed',
          aciklama:'The statement is processed with {{FEBAN}}; the {{banka-ara-hesabi}} is cleared and the real ' +
                   'bank account moves.',
          cikti:'Reconciled bank account' },
      ],
    },

    adimlar:[
      { rol:'AP accounting', eylem:'Resolves blocks, cleans up the pool', sistem:'{{MRBR}}, {{FBL1N}}, {{FB09}}' },
      { rol:'Treasury', eylem:'Enters the parameters', sistem:'{{F110}} → Parameter tab → {{REGUV}}' },
      { rol:'System', eylem:'Generates the proposal', sistem:'{{REGUH}}/{{REGUP}} — `XVORL` = X' },
      { rol:'Accounting manager', eylem:'Reviews and edits the proposal', sistem:'{{F110}} → Edit proposal' },
      { rol:'Treasury', eylem:'Runs the payment', sistem:'{{F110}} → Run payment — document type KZ' },
      { rol:'System', eylem:'Generates the payment medium', sistem:'{{FBPM}} or RFFO* programs' },
      { rol:'AP accounting', eylem:'Processes the bank statement', sistem:'{{FEBAN}}, {{FF_5}}' },
    ],

    veriAkisi:{
      nereden:'{{BSIK}} open items; {{odeme-yontemi}}, {{odeme-blogu}}, and payment terms from {{LFB1}}; vendor ' +
              'bank details (IBAN) from {{BP}}; bank determination rules from the {{FBZP}} configuration.',
      nereye:'{{REGUH}}/{{REGUP}} payment records → FI payment documents → cleared items in {{BSAK}} → the bank ' +
             'file and the cash flow forecast.',
      tetikleyen:'Debts falling due and the company\'s payment calendar.',
      sonraki:'Sending the bank file, statement reconciliation, and clearing the {{banka-ara-hesabi}}.',
    },

    notlar:[
      { tip:'warn', baslik:'The gap between the proposal and the payment is vital', metin:
        '**The proposal makes no accounting entry at all** — it\'s just a "here\'s what I\'m going to pay" list ' +
        'and it can be undone freely (deleting the proposal is unrestricted). **Running the payment produces a ' +
        'real entry**, and undoing it is hard: every payment document must be reversed one by one, and clearings ' +
        'must be undone with {{FBRA}}. That\'s why the approval step should never be skipped.' },
      { tip:'tip', baslik:'Run date + identification = a unique run', metin:
        'A run in F110 is identified by the pair **run date (`LAUFD`) + identification (`LAUFI`)**. If more than ' +
        'one run happens on the same day, the identifications must differ (AP01, AP02…). The identification is ' +
        'free text, but a disciplined naming convention makes finding the run later much easier.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The accounting entry F110 produces is plain, but it has three variations: **a plain payment**, **a ' +
      'discounted payment**, and **a foreign-currency payment (with an exchange difference)**. Also, when ' +
      'several invoices merge into one payment, how it shows up in the entry changes.',

    etkilenenHesaplar:[
      { hesap:'320 Trade payables (reconciliation)', tur:'Balance sheet — Liability', neden:'**Debited** by the payment (the payable decreases). By the total of the invoices cleared.' },
      { hesap:'102 Bank clearing account', tur:'Balance sheet — Asset', neden:'Credited when the payment is recorded. The real bank account only moves once the statement arrives.' },
      { hesap:'602 Discounts received', tur:'Income statement — Income', neden:'The discount earned when payment is made within the {{iskonto}} period is recorded as income.' },
      { hesap:'191 Deductible VAT', tur:'Balance sheet — Asset', neden:'VAT is also adjusted by the discount amount (depending on the discount-base setting).' },
      { hesap:'646 / 656 Exchange difference', tur:'Income statement', neden:'When a foreign-currency invoice is paid at a rate different from the one it was posted at, a realized {{kur-farki}} arises.' },
      { hesap:'159 Down payments made', tur:'Balance sheet — Asset', neden:'If an {{avans}} request ({{F-47}}) is paid by F110, the special G/L account is used.' },
    ],

    fisler:[
      { baslik:'Example 1 — Plain payment · three invoices merged into one payment',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-4001 (invoice 1)', borc:60000, not:'Cleared' },
          { hesap:'320', ad:'Trade payables — V-4001 (invoice 2)', borc:45000, not:'Cleared' },
          { hesap:'320', ad:'Trade payables — V-4001 (invoice 3)', borc:35000, not:'Cleared' },
          { hesap:'102', ad:'Bank clearing account', alacak:140000, not:'A single payment' },
        ],
        not:'The three invoices were cleared as separate lines, but a **single payment** went out to the bank. ' +
             'The {{REGUP}} table keeps track of which three invoices this payment cleared — that information is ' +
             'vital for reconciliation.' },

      { baslik:'Example 2 — Discounted payment · paid within a 2% discount period',
        belgeTuru:'KZ', tarih:'22.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-4001', borc:120000, not:'The **entire** debt was cleared' },
          { hesap:'102', ad:'Bank clearing account', alacak:117600, not:'The amount actually paid' },
          { hesap:'602', ad:'Discounts received (income)', alacak:2000, not:'100,000 × 2% (on the net amount)' },
          { hesap:'191', ad:'Deductible VAT adjustment', alacak:400, not:'VAT adjustment for the discount' },
        ],
        not:'The entire debt (120,000) was cleared but only 117,600 was paid. The difference **is income**. F110 ' +
             'knows the discount period from the {{odeme-kosulu}} and picks the most profitable day on its own.' },

      { baslik:'Example 3 — Foreign-currency payment · the rate changed',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'EUR',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-7001 (10,000 EUR @ 35.00)', borc:350000, not:'At the invoice rate' },
          { hesap:'102', ad:'Bank clearing account (10,000 EUR @ 36.20)', alacak:362000, not:'At the payment-day rate' },
          { hesap:'656', ad:'Foreign exchange loss', borc:12000, not:'Realized {{kur-farki}}' },
        ],
        not:'The debt was cleared at exactly **10,000 EUR** in foreign currency — no difference on the foreign' +
             '-currency side. The difference is in local currency: the invoice was posted at a rate of 35.00, the ' +
             'payment was made at 36.20. The 12,000 TRY gap is a **realized** exchange difference and is expensed.' },

      { baslik:'Example 4 — Partial payment (edited by hand in the proposal)',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-5001 (partial payment item)', borc:40000 },
          { hesap:'102', ad:'Bank clearing account', alacak:40000 },
        ],
        not:'On the proposal screen, the item amount was manually reduced to 40,000. The original 100,000 TRY ' +
             'item **stays open**; the payment stands as a separate item ({{kismi-kapatma}}).' },

      { baslik:'When the statement arrives — the clearing account is closed ({{FEBAN}})',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Bank clearing account', borc:140000, not:'The clearing account was cleared' },
          { hesap:'102', ad:'Banks — real account', alacak:140000, not:'The money actually left' },
        ],
        not:'The cash outflow is only confirmed **here**. If the {{banka-ara-hesabi}}\'s balance keeps growing, ' +
             'either the statement isn\'t being processed or the payments never went through at the bank — ' +
             'either way it needs to be investigated.' },
    ],

    tHesaplar:[
      { hesap:'Trade payables (reconciliation)', kod:'320',
        borc:[{ ad:'F110 payments', tutar:260000 }],
        alacak:[{ ad:'Invoices', tutar:380000 }],
        not:'The balance = the unpaid debt' },
      { hesap:'Bank clearing account', kod:'102 (clearing)',
        borc:[{ ad:'Statement reconciliation', tutar:140000 }],
        alacak:[{ ad:'F110 payment', tutar:140000 }],
        not:'Should be zeroed after the statement' },
      { hesap:'Discounts received', kod:'602 (income)',
        borc:[],
        alacak:[{ ad:'Early-payment discounts', tutar:2000 }],
        not:'Zeroed out at year-end' },
      { hesap:'Foreign exchange loss', kod:'656 (expense)',
        borc:[{ ad:'Foreign-currency payment exchange difference', tutar:12000 }],
        alacak:[],
        not:'A realized exchange difference' },
    ],

    notlar:[
      { tip:'tip', baslik:'How does F110 decide on the discount?', metin:
        'For every item, the program works out: "If I pay today, I earn a 2% discount. If I wait until the due ' +
        'date, I hold on to the money 20 days longer."\n\n' +
        'A 2% gain in 20 days works out to roughly **36%** annualized — higher than most companies\' deposit ' +
        'rate. That\'s why the **maximum cash discount rate** setting defined in {{FBZP}} matters: the program ' +
        'never misses a discount above that threshold.' },
      { tip:'warn', baslik:'What happens if a clearing account isn\'t used?', metin:
        'If a payment is written directly to the real bank account, once the bank statement arrives there\'s a ' +
        'risk the same movement gets recorded **twice**, or reconciliation becomes impossible. The ' +
        '{{banka-ara-hesabi}} separates these two moments and makes reconciliation possible. The clearing ' +
        'account **must** be open-item managed.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Around F110 there is variation along four axes: **run type**, **payment method**, **payment medium ' +
      'generation method**, and **special cases**.',

    liste:[
      { ad:'Proposal Run',
        aciklama:'Calculates and lists which items will be paid. **Makes no accounting entry at all.** Written ' +
                 'to {{REGUH}}/{{REGUP}} with `XVORL = X` and can be deleted freely.',
        neZaman:'Always — a mandatory step before the payment run. It can technically be skipped, but shouldn\'t be.',
        ornek:'232 items selected, merged into 89 payments, 47 items on the exception list.',
        tcodes:['F110'] },

      { ad:'Payment Run',
        aciklama:'Turns the proposal into an actual payment: produces the accounting entries, clears the ' +
                 'invoices. Hard to undo.',
        neZaman:'After the proposal has been approved.',
        ornek:'86 payment documents (KZ) were created, the items moved to {{BSAK}}.',
        tcodes:['F110'] },

      { ad:'Scheduled Run — F110S',
        aciklama:'Starts F110 automatically at specific days and times. It runs overnight and the proposal is ' +
                 'ready by morning.',
        neZaman:'At companies with a regular payment calendar and high volume.',
        tcodes:['F110S'] },

      { ad:'Bank Transfer',
        aciklama:'The most common {{odeme-yontemi}}. A bank file is generated and sent electronically.',
        neZaman:'For standard domestic and international payments.',
        ornek:'The payment method code is usually "H" or "T"; it varies by country.' },

      { ad:'Check',
        aciklama:'A physical check is printed and numbered. The checkbook is tracked in the {{PAYR}} table.',
        neZaman:'In countries where check use is common, and for certain special payment types.',
        ornek:'{{FCHN}} for the check list, {{FCHI}} for the number range definition.',
        tcodes:['FCH5','FCHN','FCHI'] },

      { ad:'Classic RFFO* Programs',
        aciklama:'Older, country-specific output programs. Each country and format has its own separate program.',
        neZaman:'Still used in older installations. Not recommended for new projects.',
        ornek:'RFFOAVIS (payment advice), RFFOUS_C (check).' },

      { ad:'Payment Medium Workbench — FBPM',
        aciklama:'The modern payment medium generation tool. Country and bank formats are defined flexibly via a ' +
                 'format tree; standards like SEPA and ISO20022 are supported.',
        neZaman:'The **standard choice** in new installations. Used in place of the classic programs.',
        tcodes:['FBPM','FBZP'] },

      { ad:'Down Payment via F110',
        aciklama:'A down payment **request** opened with {{F-47}} is statistical; F110 sees this request and ' +
                 'pays it. The payment is posted to the special G/L account ({{avans}}).',
        neZaman:'When order down payments need to be included in the payment run.',
        tcodes:['F-47','F-48','OBYR'] },
    ],

    karsilastirmaBasliklar:['Proposal', 'Payment Run'],
    karsilastirma:[
      ['Accounting entry', '**None** — no account moves at all', '**Yes** — vendor debit / bank credit'],
      ['Table record', '{{REGUH}}/{{REGUP}}, `XVORL` = **X**', 'Same tables, `XVORL` = **blank**'],
      ['Open item', 'Stays open', 'Moves from {{BSIK}} to {{BSAK}}'],
      ['Undoing it', 'The proposal is deleted — unrestricted', 'Every document is reversed one by one, {{FBRA}} is needed'],
      ['Editable', '**Yes** — remove items, change amounts, change the bank', 'No'],
      ['Bank file', 'Not generated', 'Generated ({{FBPM}})'],
      ['Purpose', 'Control and approval', 'Execution'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'F110', ad:'Automatic payment program',
        amac:'Selects due debts in bulk, produces a proposal, records the payment, and generates the bank file.',
        neZaman:'In routine payment runs — the standard payment method for corporate companies.',
        adimlar:[
          { baslik:'Enter the run date and identification',
            aciklama:'This pair (`LAUFD` + `LAUFI`) makes the run unique. A different identification is given for a second run on the same day.' },
          { baslik:'Fill in the *Parameter* tab',
            aciklama:'The **payment posting date** (the date the documents fall on), the **docs entered up to** ' +
                     'date (documents entered by this date are included), the **company codes**, the **payment ' +
                     'methods**, the **next payment date**, and the vendor range.' },
          { baslik:'Enter the *next payment date* correctly — the most critical field',
            aciklama:'The program asks: "can this item wait until the next run?" If it can\'t (because the due ' +
                     'date or discount period would pass), it **pays today**. Get this field wrong and you\'ll ' +
                     'either pay early or miss a discount.' },
          { baslik:'Turn on the log level in the *Additional log* tab',
            aciklama:'Check "payment method selection," "per item," and "bank determination" logging. The ' +
                     'answer to why an item wasn\'t selected shows up **only** in this log.' },
          { baslik:'Run the proposal and monitor the status',
            aciklama:'The status line should read "Proposal created." If the screen doesn\'t refresh on its own, ' +
                     'press refresh on the *Status* tab.' },
          { baslik:'Display and edit the proposal',
            aciklama:'There are two lists: **items to be paid** and **exceptions**. The exception list explains, ' +
                     'via a code, why each item won\'t be paid — the main source for diagnosis.' },
          { baslik:'Run the payment',
            aciklama:'The accounting entries are created here. The status becomes "Payment run completed."' },
          { baslik:'Generate the payment medium',
            aciklama:'It runs automatically if a variant is defined on the *Printout/data medium* tab; otherwise ' +
                     'it\'s generated separately with {{FBPM}}.' },
        ],
        ekranAkisi:[
          { ekran:'Status tab', islem:'Run date 25.09.2026 · Identification AP01 → "Parameters not yet entered"' },
          { ekran:'Parameter tab', islem:'Posting date 25.09 · Docs entered up to 25.09 · Company code 1000 · Payment method H · Next payment date 10.10.2026' },
          { ekran:'Additional log tab', islem:'Payment method selection + per item + bank determination checked' },
          { ekran:'Status → Proposal', islem:'"Proposal created": 232 items / 89 payments / 47 exceptions' },
          { ekran:'Edit proposal', islem:'3 vendors removed → 86 payments remain' },
          { ekran:'Status → Payment', islem:'"Payment run completed": 86 documents created' },
        ],
        alanlar:{
          zorunlu:['Run date','Identification','Payment posting date','Docs entered up to','Company code','Payment method','Next payment date'],
          opsiyonel:['Vendor/customer range','Free selection criteria','Additional log settings','Print variant'] },
        hatalar:[
          { mesaj:'No valid payment method found', sebep:'The vendor\'s {{LFB1}} `ZWELS` list doesn\'t include the method used in the run, or the payment method isn\'t defined at company code level.', cozum:'{{BP}} → add the payment method in the company code data; {{FBZP}} → check the "payment methods / company code" step.' },
          { mesaj:'No suitable house bank found / Bank determination incomplete', sebep:'In {{FBZP}} bank determination, the ranking order or the available amounts are undefined.', cozum:'{{FBZP}} → Bank determination → enter the ranking order + available amounts. If the amount is 0, no bank is ever selected.' },
          { mesaj:'Item is blocked for payment', sebep:'There\'s an {{odeme-blogu}} on the item ({{BSEG}} `ZLSPR`) or the vendor ({{LFB1}} `ZAHLS`).', cozum:'Investigate why it\'s blocked; remove it with {{FB09}} or {{BP}} if it\'s justified. For an MM invoice, use {{MRBR}}.' },
          { mesaj:'Payment amount is below minimum', sebep:'A minimum payment amount is set in the {{FBZP}} company code settings.', cozum:'A deliberate setting; small amounts accumulate for the next run. Lower the threshold if needed.' },
          { mesaj:'Proposal has already been created', sebep:'A proposal already exists for the same date + identification.', cozum:'Delete the proposal and rerun, or use a new identification.' },
          { mesaj:'Payment run already carried out — parameters cannot be changed', sebep:'The payment has already been run; parameters can\'t be changed.', cozum:'Open a new run. If the payment needs to be undone, reverse the documents with {{FB08}} and reopen the clearings with {{FBRA}}.' },
        ],
        ipucu:'**Always turn on the additional log.** The answer to "why wasn\'t this item selected?" is found ' +
              'only there, and this question is behind the majority of F110 complaints. Leaving the log off ' +
              'leaves you blind.',
        ilgili:['FBZP','F110S','FBPM','F-53','FBL1N','FEBAN'] },

      { kod:'FBZP', ad:'Payment program configuration — F110\'s brain',
        amac:'Gathers the five settings that determine all of F110\'s behavior on one screen.',
        neZaman:'During setup, and every time the question "why is/isn\'t F110 doing this?" comes up.',
        adimlar:[
          { baslik:'1) All company codes',
            aciklama:'Decides which company code pays on behalf of which company. Critical in a centralized ' +
                     'payment structure (one company pays for others). Also settles here whether vendor and ' +
                     'customer items should be considered together.' },
          { baslik:'2) Paying company codes',
            aciklama:'The minimum payment amount, the payment advice form, and exchange-difference settings. ' +
                     'This is the company that will appear in the file sent to the bank.' },
          { baslik:'3) Payment methods in country',
            aciklama:'Defines the payment method\'s **character**: transfer or check, mandatory master data ' +
                     'fields (is IBAN required?), the payment medium program or the PMW format tree.' },
          { baslik:'4) Payment methods in company code',
            aciklama:'Minimum/maximum amount limits, foreign-currency permission, the requirement to pay each ' +
                     'item individually, the payment advice form. **The main source of the "No valid payment ' +
                     'method found" error.**' },
          { baslik:'5) Bank determination',
            aciklama:'The most critical step. Four sub-sections: **ranking order** (which bank is tried first), ' +
                     '**bank accounts** (method + house bank → G/L account and clearing account), **available ' +
                     'amounts** (the maximum that can go out from each bank), and **value date** and **charges**.' },
        ],
        ekranAkisi:[
          { ekran:'FBZP entry screen', islem:'Five buttons: All company codes / Paying company codes / Pmnt methods in country / Pmnt methods in company code / Bank determination' },
          { ekran:'Bank determination → Ranking', islem:'Payment method H → rank 1: İş Bankası, rank 2: Garanti' },
          { ekran:'Bank determination → Bank accounts', islem:'H + İş Bankası + account ID 0001 → G/L 102001, clearing account 102900' },
          { ekran:'Bank determination → Available amounts', islem:'İş Bankası 0001 → 5,000,000 TRY for outgoing payment' },
        ],
        hatalar:[
          { mesaj:'No amounts available for house bank', sebep:'No available amount was entered, or it\'s 0.', cozum:'Enter a realistic upper limit in the available amounts section. **Leaving it blank doesn\'t mean "unlimited," it means "none."**' },
          { mesaj:'Payment method H not defined for company code 1000', sebep:'Step 4 (company code level) is missing.', cozum:'Define the payment method for the company code; being defined at country level alone isn\'t enough.' },
        ],
        ipucu:'The way to memorize FBZP is to **remember its order**: who\'s paying (1-2) → how they\'re paying ' +
              '(3-4) → which bank they\'re paying from (5). Following this order when you hit a problem finds the ' +
              'source quickly.',
        ilgili:['F110','FBPM','FI12','FCHI'] },

      { kod:'FBPM', ad:'Payment medium program (PMW)',
        amac:'Generates the bank file using the Payment Medium Workbench.',
        neZaman:'After an F110 payment run; manually when the print variant didn\'t run automatically.',
        adimlar:[
          { baslik:'Enter the run date and identification (the same as the F110 run)' },
          { baslik:'Choose the format tree',
            aciklama:'The format the country and bank require: SEPA, ISO20022 (CAMT/PAIN), a local bank format.' },
          { baslik:'Run → the file is generated',
            aciklama:'The file can be written to a directory on the server (visible via {{AL11}}) or downloaded.' },
        ],
        ipucu:'If the file isn\'t being generated, check in order: did the payment run really complete, is a ' +
              'format tree assigned in {{FBZP}} step 3, is a variant defined.',
        ilgili:['F110','FBZP'] },

      { kod:'F110S', ad:'Schedule the payment program',
        amac:'Starts an F110 run automatically at specific days and times.',
        neZaman:'At companies with a regular payment calendar; an overnight run has the proposal ready by morning.',
        ipucu:'Even in a scheduled run, **the proposal and the payment should be scheduled separately**. An ' +
              'automatic proposal + human approval + automatic payment is the safest arrangement. Fully ' +
              'automatic payment without approval isn\'t acceptable from an internal-control standpoint.',
        ilgili:['F110','FBPM'] },

      { kod:'F-53', ad:'Manual vendor payment',
        amac:'Records a single payment by hand and clears the open items.',
        neZaman:'For urgent payments outside F110\'s scope; exceptions outside the run.',
        ipucu:'If F-53 keeps being used heavily while F110 is available, it\'s a sign of a **process problem**: ' +
              'either block management is too slow or the payment calendar doesn\'t meet the need. A high manual' +
              '-payment ratio should be investigated for its cause first.',
        ilgili:['F110','F-58','F-44'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'F110\'s table structure has three layers: **control** ({{REGUV}} — the run\'s status), **payment ' +
      'headers** ({{REGUH}} — who gets how much), and **paid items** ({{REGUP}} — which invoices). This trio is ' +
      'the single source for "which invoices did this payment clear?"',

    liste:[
      { ad:'REGUV', baslik:'Payment run — control record',
        tutar:'The run\'s status: were parameters entered, was the proposal generated, was payment made, was the file produced.',
        olusturan:'{{F110}} — when parameters are entered',
        guncelleyen:'{{F110}} at every stage',
        anahtar:'LAUFD + LAUFI',
        iliskiler:'{{REGUH}} and {{REGUP}} link to this run.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'LAUFD', aciklama:'Run date' },
          { ad:'LAUFI', aciklama:'Run identification — together with the date, makes the run unique' },
          { ad:'XVORL', aciklama:'Whether it\'s in the proposal stage' },
        ] },

      { ad:'REGUH', baslik:'Payment run — payment headers',
        tutar:'Each payment\'s header: recipient, amount, currency, payment method, house bank, payment document number.',
        olusturan:'{{F110}} proposal and payment run',
        guncelleyen:'{{F110}}',
        anahtar:'LAUFD + LAUFI + XVORL + ZBUKR + LIFNR + KUNNR + VBLNR',
        iliskiler:'Links to items via {{REGUP}}, to the vendor via {{LFA1}}, to the bank account via {{T012K}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'XVORL', aciklama:'**If X, it\'s only a proposal** — not an actual payment. The most critical distinguishing field.' },
          { ad:'RWBTR', aciklama:'Payment amount' },
          { ad:'VBLNR', aciklama:'Payment document number — filled in after the payment run' },
          { ad:'HBKID / HKTID', aciklama:'House bank and account ID — the result of bank determination' },
          { ad:'ZALDT', aciklama:'Payment date' },
        ] },

      { ad:'REGUP', baslik:'Payment run — paid items',
        tutar:'Which invoice items each payment cleared. A single payment can clear many invoices.',
        olusturan:'{{F110}}',
        guncelleyen:'{{F110}}',
        anahtar:'LAUFD + LAUFI + XVORL + ZBUKR + LIFNR + KUNNR + VBLNR + BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'A child of {{REGUH}}; links to cleared items via {{BSAK}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'BELNR / BUZEI', aciklama:'The invoice document and item paid' },
          { ad:'WRBTR', aciklama:'Item amount' },
          { ad:'SKNTO', aciklama:'The {{iskonto}} earned on this item' },
        ] },

      { ad:'T042', baslik:'Payment program — company code settings',
        tutar:'Configuration entered in {{FBZP}}: paying company code, tolerance days, minimum amount.',
        olusturan:'{{FBZP}}',
        guncelleyen:'{{FBZP}}',
        s4:'Unchanged.' },

      { ad:'T012K', baslik:'House bank account IDs',
        tutar:'Each {{ev-bankasi}} account\'s IBAN and the corresponding G/L account. Bank determination looks here.',
        olusturan:'{{FI12}} / Bank Account Management',
        guncelleyen:'{{FI12}}',
        anahtar:'BUKRS + HBKID + HKTID',
        iliskiler:'{{REGUH}} points here via `HBKID`/`HKTID`.',
        s4:'Managed via Bank Account Management (BAM) in S/4HANA.' },

      { ad:'BSIK', baslik:'Vendor open items — F110\'s selection pool',
        tutar:'Unpaid vendor invoices. F110 selects items from here.',
        olusturan:'Every posting made to a vendor',
        guncelleyen:'The item moves to {{BSAK}} after payment',
        s4:'{{uyumluluk-view}} — data is produced from {{ACDOCA}}.',
        alanlar:[
          { ad:'ZFBDT / ZBD1T', aciklama:'Baseline date and discount day — F110 calculates the payment day from these' },
          { ad:'ZLSPR', aciklama:'{{odeme-blogu}} — if filled, the item isn\'t selected' },
          { ad:'ZLSCH', aciklama:'Payment method at item level — overrides the vendor master' },
        ] },

      { ad:'PAYR', baslik:'Check register',
        tutar:'Checks printed: number, payee, amount, payment document, and collection status.',
        olusturan:'Payment medium generation (if the check method is used)',
        guncelleyen:'{{FCH5}}, payment medium programs',
        s4:'Unchanged.' },
    ],

    er:{
      type:'er',
      baslik:'F110 table relationships — from run to cleared item',
      varliklar:[
        { ad:'REGUV', rol:'Control', aciklama:'The run\'s status',
          alanlar:[{ ad:'LAUFD', tip:'pk' }, { ad:'LAUFI', tip:'pk' }, { ad:'XVORL' }] },
        { ad:'REGUH', rol:'Payment', hub:true, aciklama:'Payment headers',
          alanlar:[{ ad:'LAUFD', tip:'fk' }, { ad:'LAUFI', tip:'fk' }, { ad:'LIFNR', tip:'fk' }, { ad:'VBLNR' }, { ad:'HBKID' }] },
        { ad:'REGUP', rol:'Payment', aciklama:'Paid items',
          alanlar:[{ ad:'LAUFI', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'BUZEI' }, { ad:'SKNTO' }] },
        { ad:'BSIK', rol:'Index', aciklama:'Selection pool (open)',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZLSPR' }, { ad:'ZFBDT' }] },
        { ad:'BSAK', rol:'Index', aciklama:'Post-payment (cleared)',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'AUGBL' }, { ad:'AUGDT' }] },
        { ad:'LFB1', rol:'Master data', aciklama:'Vendor payment settings',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'ZWELS' }, { ad:'ZAHLS' }] },
        { ad:'T012K', rol:'Configuration', aciklama:'House bank account',
          alanlar:[{ ad:'HBKID', tip:'pk' }, { ad:'HKTID', tip:'pk' }, { ad:'HKONT' }] },
        { ad:'BKPF', rol:'Document', aciklama:'Payment document',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
      ],
      iliskiler:[
        { from:'REGUV', to:'REGUH', alanlar:'LAUFD + LAUFI', not:'run → payments' },
        { from:'REGUH', to:'REGUP', alanlar:'LAUFD + LAUFI + VBLNR', not:'payment → paid items' },
        { from:'BSIK', to:'REGUP', alanlar:'BELNR + BUZEI', not:'the selected open item' },
        { from:'REGUP', to:'BSAK', alanlar:'BELNR + BUZEI', not:'cleared after payment' },
        { from:'LFB1', to:'REGUH', alanlar:'LIFNR', not:'the payment method and block come from here' },
        { from:'T012K', to:'REGUH', alanlar:'HBKID + HKTID', not:'the result of bank determination' },
        { from:'REGUH', to:'BKPF', alanlar:'VBLNR → BELNR', not:'the payment document' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'The F110 screen is made up of **tabs**, and each tab corresponds to a stage. Knowing the order of the ' +
      'tabs and what each is for keeps you from getting lost on screen.',

    ekranlar:[
      { ad:'Status tab',
        aciklama:'Shows what stage the run is at. You return here after every action and it must be **refreshed**.',
        alanlar:[
          { ad:'Run date (`LAUFD`)', zorunlu:true, aciklama:'The first half of the run\'s identity. Usually today\'s date.' },
          { ad:'Identification (`LAUFI`)', zorunlu:true, aciklama:'5-character free text. Must differ for a second run on the same day.' },
          { ad:'Status text', zorunlu:false, aciklama:'Follows the sequence "Parameters not entered" → "Proposal created" → "Payment completed."' },
        ],
        ipucu:'The status doesn\'t refresh on its own. The screen may still show the old status once the ' +
              'proposal is done — press refresh. This is the number-one reason newcomers think "the proposal ' +
              'didn\'t run."' },

      { ad:'Parameter tab',
        aciklama:'The screen that defines the run\'s scope. The four date fields here are the most-confused fields.',
        alanlar:[
          { ad:'Posting date', zorunlu:true, aciklama:'The accounting date the payment documents will fall on. The period must be open.' },
          { ad:'Docs entered up to', zorunlu:true, aciklama:'Documents **entered into the system** by this date are taken into account. Usually today.' },
          { ad:'Company codes', zorunlu:true, aciklama:'Multiple can be entered, comma-separated.' },
          { ad:'Payment methods', zorunlu:true, aciklama:'Written in sequence with no spaces (e.g. "HT"). The order indicates **priority**.' },
          { ad:'Next payment date', zorunlu:true, aciklama:'**The most critical field.** The program answers "can this item wait until the next run?" based on this. Get it wrong and you\'ll either pay early or miss a discount.' },
          { ad:'Vendor/customer range', zorunlu:false, aciklama:'If left blank, everything is included.' },
        ],
        ipucu:'Enter the "next payment date" according to the real payment calendar. If you pay every two weeks, ' +
              'that\'s 14 days from today. Type tomorrow by mistake and the program pays almost nothing; type a ' +
              'date too far out and you pay debts that aren\'t due yet.' },

      { ad:'Free selection tab',
        aciklama:'Used for additional filtering beyond the standard parameters.',
        alanlar:[
          { ad:'Field name', zorunlu:false, aciklama:'Include/exclude based on fields like document type, amount, assignment.' },
          { ad:'Exclude checkbox', zorunlu:false, aciklama:'**Excludes** the selected values.' },
        ],
        ipucu:'Used to exclude a specific document type or amount range. For instance, urgent payments can use a ' +
              'separate document type and be excluded in other runs.' },

      { ad:'Additional log tab',
        aciklama:'The single source of diagnosis. **Should be turned on for every run.**',
        alanlar:[
          { ad:'Payment method selection (all documents)', zorunlu:false, aciklama:'Why this method was chosen / why none was chosen.' },
          { ad:'Payment method selection per item', zorunlu:false, aciklama:'The decision rationale item by item.' },
          { ad:'Payment document items', zorunlu:false, aciklama:'The accounting lines to be produced.' },
          { ad:'Vendor/customer range', zorunlu:false, aciklama:'Limits the log to specific vendors, keeping it readable.' },
        ],
        ipucu:'Turning on the log for all vendors produces a huge output. Write down the vendor you\'re having ' +
              'trouble with and read only their decisions. Diagnosis time drops from minutes to seconds.' },

      { ad:'Printout/data medium tab',
        aciklama:'Generation settings for the payment file and advice forms.',
        alanlar:[
          { ad:'Program and variant', zorunlu:false, aciklama:'A format tree if PMW is used, or the RFFO* program and variant if classic.' },
        ],
        ipucu:'If no variant is defined, the payment is recorded but **no file is generated**. This is the cause ' +
              'of "the payment was made but nothing went to the bank" — it\'s generated afterward with {{FBPM}}.' },
    ],

    zorunlu:['Run date','Identification','Payment posting date','Docs entered up to','Company code','Payment method','Next payment date'],
    opsiyonel:['Vendor range','Free selection criteria','Additional log settings','Print variant','Payment advice form'],

    hatalar:[
      { mesaj:'No valid payment method found', sebep:'The vendor\'s {{LFB1}} `ZWELS` list doesn\'t include the method used, or the method is undefined at company code level ({{FBZP}} step 4).', cozum:'Turn on the additional log and note the vendor — the log tells you exactly which check it failed. Then fix the gap in {{BP}} or {{FBZP}}.' },
      { mesaj:'No suitable house bank found', sebep:'In {{FBZP}} bank determination, the ranking order or an available amount is missing.', cozum:'Check the available amounts section — **leaving it blank doesn\'t mean "unlimited," it means "none."**' },
      { mesaj:'Item blocked for payment', sebep:'There\'s a block on the item ({{BSEG}} `ZLSPR`) or the vendor ({{LFB1}} `ZAHLS`); for an MM invoice, {{RBKP}} `ZLSPR`.', cozum:'Remove the block with {{FB09}}, {{BP}}, or {{MRBR}}.' },
      { mesaj:'Amount is less than minimum amount', sebep:'There\'s a minimum payment threshold set in {{FBZP}}.', cozum:'A deliberate setting; small amounts accumulate. Review the threshold.' },
      { mesaj:'No documents found for the specified selection', sebep:'No item is due; the "next payment date" may have been entered too close.', cozum:'Fix the date to match the payment calendar; use {{FBL1N}} to check whether an item is really due.' },
      { mesaj:'Payment run already carried out', sebep:'Payment has already been made for this date + identification.', cozum:'Open a run with a new identification. If undoing is needed, reverse the documents with {{FB08}} and reopen the clearings with {{FBRA}}.' },
      { mesaj:'Company code ... not defined in payment program', sebep:'The company code is undefined in {{FBZP}} step 1.', cozum:'Add the company code to "all company codes" and specify the paying company code.' },
      { mesaj:'House bank account has insufficient available amount', sebep:'The available amount is less than the total payment.', cozum:'Increase the amount or define a second bank; the program moves to the next one per the ranking order.' },
    ],

    ipuclari:[
      '**Turn on the additional log for every run** and write the vendor you\'re having trouble with into the ' +
      'log range. 90% of F110 diagnosis ends there.',
      'Establish a pre-run routine: **(1)** {{MRBR}} for blocked invoices, **(2)** the {{FBL1N}} payment-block ' +
      'column, **(3)** vendors missing a payment method. These three checks remove most surprises.',
      'Read the **exception list** rather than the proposal list. Items being paid are already as expected; ' +
      'what\'s instructive is the reasoning behind the ones that aren\'t.',
      '**Always** generate and approve the proposal. Running the payment directly is technically possible but ' +
      'not acceptable from an internal-control standpoint, and it\'s very hard to undo.',
      'When testing F110 on a test system, **remove the payment medium variant** — this prevents accidentally ' +
      'generating and sending a real bank file.',
      'Keep an eye on the {{banka-ara-hesabi}}\'s balance after payment. If it keeps growing, the statement isn\'t ' +
      'being processed and reconciliation is broken.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'REGUV', ne:'The run\'s status — updated at every stage' },
      { tablo:'REGUH', ne:'Payment headers; `XVORL` = X in the proposal, blank and `VBLNR` filled at payment' },
      { tablo:'REGUP', ne:'Paid items; which payment cleared which invoice' },
      { tablo:'BKPF', ne:'Payment document header (document type KZ)' },
      { tablo:'BSEG', ne:'Vendor-debit and bank-credit lines; `AUGBL` is written to the cleared invoices' },
      { tablo:'ACDOCA', ne:'Universal items' },
      { tablo:'BSIK', ne:'Paid items are **removed** from here' },
      { tablo:'BSAK', ne:'Added as a cleared item' },
      { tablo:'PAYR', ne:'A check record, if the check method was used' },
    ],

    commit:
      'F110 runs **two separate LUW chains**. During the proposal stage, only {{REGUV}}/{{REGUH}}/{{REGUP}} are ' +
      'written; no FI document is produced and there\'s no accounting effect.\n\n' +
      'During the payment stage, a separate posting LUW runs for each payment: the FI document, the clearing, ' +
      'and the index update are all written together. If one payment fails, **the others aren\'t affected** — ' +
      'which is why a partially completed run is possible, and which payments failed is read from the log.',

    belgeNo:
      'Payment documents get their number from the document type **KZ** (vendor payment), from the range ' +
      'defined in {{FBN1}}. Every payment gets its own document number — 86 payments = 86 documents. No ' +
      'document number is assigned during the proposal stage; the {{REGUH}} `VBLNR` field is only filled in ' +
      'after the payment run.',

    postingLogic:
      'F110\'s decision chain is as follows:\n\n' +
      '**1. Item selection:** items whose due date falls within the "next payment date" are taken from ' +
      '{{BSIK}}; blocked ones are excluded.\n' +
      '**2. Payment method:** if `ZLSCH` is set on the item, that\'s used; otherwise the first suitable method ' +
      'from the vendor\'s `ZWELS` list is chosen, following the order given in the run parameters.\n' +
      '**3. Grouping:** items with the same vendor + the same method + the same currency are **merged into one ' +
      'payment** (not merged if individual payment is required).\n' +
      '**4. Bank determination:** the first bank is tried according to the {{FBZP}} ranking order; if the ' +
      'available amount isn\'t enough, it moves to the next.\n' +
      '**5. Discount decision:** if the discount period falls before the "next payment date," it\'s paid today.\n' +
      '**6. Posting:** vendor-debit / bank-credit lines plus discount and exchange-difference lines; the ' +
      'invoices are cleared.',

    belgeTuru:
      'The payment document type is defined in {{FBZP}} step 2 (paying company codes); the standard is **KZ**. ' +
      'The clearing document may use a different type. The document type decides which number range the payment ' +
      'document draws from.',

    numberRange:
      'A range must be defined in {{FBN1}} for the KZ document type by company code + fiscal year. If it isn\'t ' +
      'opened at year start, the first payment run of the year stops — copied in bulk with {{OBH1}}.',

    accountDetermination:
      'In F110, accounts come from three sources:\n\n' +
      '**The vendor account:** {{LFB1}} `AKONT` (the reconciliation account).\n' +
      '**The bank account:** the G/L account assigned in {{FBZP}} bank determination to the combination of ' +
      'payment method + house bank + account ID (usually a {{banka-ara-hesabi}}).\n' +
      '**Discount and exchange-difference accounts:** from the automatic-posting settings in IMG (transaction ' +
      'keys SKE for discount, KDF for exchange difference).',

    tur:
      '**Configuration:** {{FBZP}}\'s five steps, payment methods, bank determination rules, payment medium ' +
      'format trees, document types.\n\n' +
      '**Master data:** the vendor\'s payment method ({{LFB1}} `ZWELS`), payment block (`ZAHLS`), bank ' +
      'information (IBAN); {{ev-bankasi}} accounts.\n\n' +
      '**Transaction data:** the runs ({{REGUV}}/{{REGUH}}/{{REGUP}}) and payment documents.',

    transport:
      'The {{FBZP}} settings transport. **But watch out:** the bank determination settings reference ' +
      'system-specific {{ev-bankasi}} records. Because house banks are master data, they don\'t transport — so ' +
      'bank determination **must be checked** in the target system after FBZP is transported. Available amounts ' +
      'are also usually set separately in each system.',

    img:[
      { yol:'SPRO → Financial Accounting → Accounts Payable → Business Transactions → Outgoing Payments → Automatic Outgoing Payments → Payment Method/Bank Selection for Payment Program', not:'{{FBZP}} — all five steps' },
      { yol:'SPRO → … → Automatic Outgoing Payments → Payment Media → Payment Medium Workbench → Create Format Trees', not:'PMW format definition ({{FBPM}})' },
      { yol:'SPRO → Financial Accounting → Bank Accounting → Bank Accounts → Define House Banks', not:'{{ev-bankasi}} and account IDs ({{FI12}})' },
      { yol:'SPRO → … → Outgoing Payments → Automatic Outgoing Payments → Payment Media → Check Management → Define Number Ranges for Checks', not:'Check number range ({{FCHI}})' },
    ],

    ekstra:[
      { ic:'🏦', baslik:'How does bank determination work? — four sections', metin:
        '{{FBZP}}\'s step 5 consists of four sub-sections, run in order:\n\n' +
        '**1. Ranking order:** the order in which banks are tried for a payment method + currency. ' +
        '"İş Bankası first, then Garanti if it\'s not enough."\n\n' +
        '**2. Bank accounts:** the G/L account and the clearing account corresponding to the combination of ' +
        'payment method + house bank + account ID.\n\n' +
        '**3. Available amounts:** the maximum that can go out of each bank account in that run. **Leaving it ' +
        'blank doesn\'t mean "unlimited," it means "none"** — the most common configuration mistake.\n\n' +
        '**4. Value date and charges:** the value-date and bank-charge settings.\n\n' +
        'The program proceeds through 1 to 4 in order. If any of them lacks a definition, "No suitable house ' +
        'bank found" is raised.' },

      { ic:'🔄', baslik:'How is a wrong payment run undone?', metin:
        'If it\'s still at the proposal stage, it\'s easy: **delete the proposal**, and no trace remains.\n\n' +
        'If the payment has already run, undoing it is laborious and done in order:\n' +
        '**1.** If the bank file has already **been sent**, call the bank and stop it first — a correction in ' +
        'the system doesn\'t bring the money back.\n' +
        '**2.** Reverse the payment documents with {{FB08}} (or {{F.80}} for bulk).\n' +
        '**3.** If the reversal doesn\'t automatically reopen the clearing, undo the clearings with {{FBRA}} — ' +
        'the items go back to {{BSIK}}.\n' +
        '**4.** If checks were generated, cancel them with {{FCH8}}/{{FCH9}}.\n\n' +
        'This effort explains why the proposal approval should never be skipped.' },
    ],

    notlar:[
      { tip:'warn', baslik:'The available amount can\'t be left blank', metin:
        'If the "available amounts" section in {{FBZP}} bank determination is left blank, the program **never ' +
        'pays** from that bank. It\'s counterintuitive: blank doesn\'t mean unlimited, blank means zero. This is ' +
        'the most common cause of the "No suitable house bank found" error.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'F110 was **not removed and its logic hasn\'t changed** in S/4HANA — it\'s still the core of the payment ' +
      'process. What changed: Fiori-based proposal management, {{ev-bankasi}} management moving to Bank Account ' +
      'Management, and PMW becoming the standard for the payment medium.',

    eccFarklari:[
      { konu:'F110 itself', ecc:'The core payment program', s4:'**The same** — not removed, logic unchanged' },
      { konu:'House bank management', ecc:'{{FI12}} — configuration-like', s4:'Bank Account Management (BAM) — master data + approval workflow' },
      { konu:'Proposal management', ecc:'Classic ALV lists', s4:'Fiori "Manage Automatic Payments" — visual, filterable' },
      { konu:'Payment medium', ecc:'Classic RFFO* programs common', s4:'**PMW is standard** — SEPA/ISO20022 format trees' },
      { konu:'Vendor master data', ecc:'{{XK01}}/{{FK01}}', s4:'{{BP}} — payment method and bank details via BP' },
      { konu:'Open item selection', ecc:'The physical {{BSIK}} table is scanned', s4:'Via {{ACDOCA}} — noticeably faster' },
      { konu:'Cash visibility', ecc:'A separate Cash Management module', s4:'Integrated Cash Management — the payment run reflects into the cash forecast instantly' },
    ],

    universalJournal:
      'Payment documents are also written to {{ACDOCA}}, and the vendor, bank account, and cost center sit on ' +
      'the same line. Because item selection runs via {{ACDOCA}} instead of {{BSIK}}, proposal generation is ' +
      'noticeably faster for large vendor portfolios — this step was the biggest bottleneck in ECC.',

    kalkanTcodes:[
      { eski:'{{FI12}}', yeni:'FI12_HBANK / BAM', not:'House bank management moved to Fiori and to master data' },
      { eski:'Classic RFFO* programs', yeni:'{{FBPM}} (PMW)', not:'Still works, but PMW is used in new installations' },
      { eski:'{{XK01}}/{{FK01}}', yeni:'{{BP}}', not:'Vendor payment data goes through BP' },
    ],

    fiori:[
      { ad:'Manage Automatic Payments', aciklama:'Manages the F110 proposal visually; including/excluding items becomes much easier.' },
      { ad:'Manage Bank Accounts', aciklama:'Manages house bank accounts with an approval workflow (BAM).' },
      { ad:'Cash Flow Analyzer', aciklama:'Shows the payment run\'s effect on cash in advance.' },
      { ad:'Payment Blocks', aciklama:'Manages blocked items as a worklist; speeds up pre-run cleanup.' },
      { ad:'Days Payable Outstanding', aciklama:'Analyzes the average payment period.' },
    ],

    compatibilityViews:[
      '{{BSIK}}, {{BSAK}} — {{uyumluluk-view}}s; F110 now works via {{ACDOCA}}.',
      '{{REGUH}}, {{REGUP}}, {{REGUV}} — **remain physical tables**, unchanged.',
      'This distinction matters: while the payment run tables are preserved, the open-item indexes turned into views.',
    ],

    performans:
      'Proposal generation is noticeably faster than in ECC because item selection runs through the ' +
      'column-based {{ACDOCA}}. There\'s no major difference on the payment-posting side — there the bottleneck ' +
      'isn\'t the database, it\'s that a separate LUW runs for each payment.',

    bestPractices:[
      'Use **PMW** for the payment medium in new installations; don\'t build new development on the classic ' +
      'RFFO* programs.',
      'Move house bank management to BAM and tie bank account changes to an approval workflow — the most ' +
      'effective control against payment fraud.',
      'Make proposal approval a **mandatory** process step; its being technically skippable doesn\'t justify ' +
      'running without approval.',
      'Set available amounts realistically and review them regularly; forgotten low limits leave runs silently ' +
      'incomplete.',
      'On the test system, remove the payment medium variant or point it to a dummy directory.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'The September 25 payment run: from 340 items to 86 payments',
    hikaye:
      '**Marmara Textiles Inc.** runs its payment cycle on the 10th and 25th of every month. On the morning of ' +
      'September 25th the treasury specialist opens the run. This scenario shows every stage of the run and how ' +
      'the three problems that came up were resolved.',
    veriler:[
      { k:'Company code', v:'1000 — Marmara Textiles Inc.' },
      { k:'Run', v:'Run date 25.09.2026 · Identification AP01' },
      { k:'Payment method', v:'H — bank transfer' },
      { k:'Next payment date', v:'10.10.2026 (the next run)' },
      { k:'House banks', v:'İŞB (rank 1, limit 5,000,000) · GRNT (rank 2, limit 3,000,000)' },
      { k:'Open item pool', v:'340 items, totaling 8,900,000 TRY' },
    ],

    adimlar:[
      { baslik:'Pre-run preparation', tcode:'MRBR',
        aciklama:'The AP specialist first cleans up blocked invoices. Skipping this step leads to unexpected ' +
                 'exceptions in the proposal and delays the run.',
        girdi:[
          { alan:'{{MRBR}}', deger:'12 blocked MM invoices → 9 resolved, 3 remained in dispute' },
          { alan:'{{FBL1N}}', deger:'The payment-block column was checked → 5 items are deliberately blocked' },
          { alan:'{{BP}}', deger:'2 new vendors were missing a payment method → "H" was added' },
        ],
        not:'These three checks should be a pre-run routine. Skipped, the exception list gets crowded and real ' +
             'problems get lost in it.' },

      { baslik:'The parameters are entered', tcode:'F110',
        aciklama:'The run is opened and the parameter tab is filled in. **Next payment date** is the most ' +
                 'critical field.',
        girdi:[
          { alan:'Run date / Identification', deger:'25.09.2026 / AP01' },
          { alan:'Payment posting date', deger:'25.09.2026 (period 09 open ✓)' },
          { alan:'Docs entered up to', deger:'25.09.2026' },
          { alan:'Company code / Payment method', deger:'1000 / H' },
          { alan:'**Next payment date**', deger:'10.10.2026 — the next run\'s date' },
          { alan:'Additional log', deger:'Payment method selection + per item + bank determination **turned on**' },
        ],
        tabloEtkisi:[
          { tablo:'REGUV', ne:'A run record was created: LAUFD 25.09.2026, LAUFI AP01, status "parameters entered"' },
        ],
        not:'Because "next payment date" was entered as 10.10, the program asks: "can this item wait until ' +
             'October 10?" If it can\'t, it\'s paid today.' },

      { baslik:'The proposal is run', tcode:'F110',
        aciklama:'The system scans 340 items and selects the ones to be paid. **No accounting entry is made.**',
        girdi:[
          { alan:'Scanned', deger:'340 open items / 8,900,000 TRY' },
          { alan:'Blocked (excluded)', deger:'8 items — item or vendor block' },
          { alan:'Not yet due (excluded)', deger:'61 items — can wait until 10.10' },
          { alan:'Other exceptions', deger:'39 items — to be reviewed below' },
          { alan:'**To be paid**', deger:'232 items → 89 vendors → **89 payments**' },
          { alan:'Discount opportunity', deger:'18 items within the discount period → brought forward, a gain of 34,200 TRY' },
        ],
        tabloEtkisi:[
          { tablo:'REGUH', ne:'89 payment headers, **`XVORL` = X** (proposal only)' },
          { tablo:'REGUP', ne:'232 item lines — which payment will clear which invoice' },
          { tablo:'BSIK', ne:'**Unchanged** — the items are still open' },
        ],
        not:'The proposal can be undone: deleting it leaves no trace. Accounting hasn\'t been affected at all yet.' },

      { baslik:'The exception list is reviewed — three problems are found', tcode:'F110',
        aciklama:'The reasons for the 39 exceptions are read from the **additional log**. Three different ' +
                 'problems come up.',
        girdi:[
          { alan:'**Problem 1** — 14 items', deger:'"No valid payment method found" → `ZWELS` is blank on the vendors' },
          { alan:'Root cause', deger:'Newly opened vendors have no payment method entered ({{BP}} → {{LFB1}})' },
          { alan:'**Problem 2** — 6 items', deger:'"No suitable house bank found" → EUR payments' },
          { alan:'Root cause', deger:'In {{FBZP}} bank determination, **no available amount was entered** for EUR (blank = zero)' },
          { alan:'**Problem 3** — 19 items', deger:'"Item is blocked for payment" → disputes at 3 vendors' },
          { alan:'Root cause', deger:'A deliberate block — a price dispute is unresolved, shouldn\'t be paid' },
        ],
        not:'The exception list is **more instructive** than the proposal list. The items being paid are already ' +
             'as expected; what\'s instructive is the reasoning behind the ones that aren\'t.' },

      { baslik:'The problems are fixed and the proposal is regenerated', tcode:'FBZP',
        aciklama:'Two problems are corrected, the third is deliberately left as is.',
        girdi:[
          { alan:'Problem 1 fix', deger:'{{BP}} → payment method "H" added to 14 vendors' },
          { alan:'Problem 2 fix', deger:'{{FBZP}} → Bank determination → Available amounts → İŞB/EUR: 500,000 EUR entered' },
          { alan:'Problem 3 decision', deger:'Left as is — won\'t be paid until the dispute is resolved' },
          { alan:'Proposal', deger:'Deleted and rerun → **252 items / 97 payments**' },
        ],
        not:'In {{FBZP}}, leaving the available amount **blank doesn\'t mean "unlimited," it means "none."** ' +
             'This is the most common mistake in F110 configuration.' },

      { baslik:'The proposal is approved and edited', tcode:'F110',
        aciklama:'The accounting manager reviews the proposal. Two large payments are deferred to the next run ' +
                 'due to the cash position.',
        girdi:[
          { alan:'Reviewed', deger:'97 payments / 7,240,000 TRY' },
          { alan:'Deferral', deger:'2 vendors (890,000 TRY total) removed from the proposal' },
          { alan:'Partial payment', deger:'A 100,000 TRY item at one vendor reduced to 40,000' },
          { alan:'**Approved**', deger:'95 payments / 6,290,000 TRY' },
        ],
        not:'Changing an amount on the proposal screen produces a {{kismi-kapatma}}: the original item stays open.' },

      { baslik:'The payment is run — accounting entries are created', tcode:'F110',
        aciklama:'**The real entries are produced here.** 95 payment documents are created and the invoices are ' +
                 'cleared.',
        girdi:[
          { alan:'Documents created', deger:'95, document type **KZ**' },
          { alan:'Items cleared', deger:'249 invoice items' },
          { alan:'Total payment', deger:'6,290,000 TRY' },
          { alan:'Discount earned', deger:'34,200 TRY (recorded as income)' },
        ],
        fis:{ baslik:'Document 2000001234 — V-4001 payment (3 invoices merged)', belgeTuru:'KZ', tarih:'25.09.2026',
          satirlar:[
            { hesap:'320', ad:'Trade payables — V-4001 (invoice 1)', borc:60000 },
            { hesap:'320', ad:'Trade payables — V-4001 (invoice 2)', borc:45000 },
            { hesap:'320', ad:'Trade payables — V-4001 (invoice 3)', borc:35000 },
            { hesap:'102', ad:'Bank clearing account — İŞB', alacak:139200, not:'The amount actually paid' },
            { hesap:'602', ad:'Discounts received', alacak:667, not:'Invoice 2 was within the discount period' },
            { hesap:'191', ad:'Deductible VAT adjustment', alacak:133 },
          ], not:'The three invoices were cleared on separate lines but a **single payment** went out to the ' +
                 'bank. The {{REGUP}} table keeps track of which three invoices this payment cleared.' },
        tabloEtkisi:[
          { tablo:'REGUH', ne:'`XVORL` **cleared**, `VBLNR` = 2000001234 payment document number written' },
          { tablo:'BSIK', ne:'249 items **removed** from here' },
          { tablo:'BSAK', ne:'249 items added, `AUGBL` = the corresponding payment document' },
          { tablo:'BKPF', ne:'95 payment document headers (KZ)' },
        ] },

      { baslik:'The bank file is generated and sent', tcode:'FBPM',
        aciklama:'A payment file in ISO20022 format is generated with PMW.',
        girdi:[
          { alan:'Format tree', deger:'ISO20022 PAIN.001 — İş Bankası' },
          { alan:'File', deger:'95 payment instructions, 6,290,000 TRY' },
          { alan:'Sent', deger:'Delivered to the bank' },
        ],
        not:'If no variant had been defined, the payment would be recorded but no file generated — this is ' +
             'exactly the "the payment was made but nothing went to the bank" situation.' },

      { baslik:'The next day — the bank statement is processed', tcode:'FEBAN',
        aciklama:'The statement arrives and the {{banka-ara-hesabi}} is cleared. The cash outflow is only ' +
                 'confirmed **here**.',
        fis:{ baslik:'Document 1000004567 — Bank statement', belgeTuru:'SB', tarih:'26.09.2026',
          satirlar:[
            { hesap:'102', ad:'Bank clearing account — İŞB', borc:6290000, not:'The clearing account was cleared' },
            { hesap:'102', ad:'Banks — İŞB real account', alacak:6290000, not:'The money actually left' },
          ] },
        tabloEtkisi:[
          { tablo:'FEBKO', ne:'Statement header' },
          { tablo:'FEBEP', ne:'Statement items — matched with the payment file' },
        ],
        not:'The clearing account\'s balance was zeroed. If it isn\'t, either the statement was processed ' +
             'incompletely or some payments didn\'t actually happen at the bank — both need investigating.' },
    ],

    sonuc:
      '**Run summary:** 340 items scanned → 89 payments proposed → 3 problems identified → 2 fixed → grew to 97 ' +
      'payments → the manager deferred 2 payments → **95 payments went through**. Discount earned: 34,200 TRY.\n\n' +
      '**Three critical lessons:**\n\n' +
      '**1. F110 can\'t be diagnosed without the additional log.** The root cause of all three problems only ' +
      'showed up in the log. With the log off, "why weren\'t 39 items paid?" would have gone unanswered.\n\n' +
      '**2. The exception list is more valuable than the proposal list.** The items being paid are already as ' +
      'expected; what the system has to teach is in the reasoning behind the ones that aren\'t.\n\n' +
      '**3. The gap between the proposal and the payment is vital.** Three problems were found and fixed at the ' +
      'proposal stage — no accounting entry was ever disturbed. Had the payment been run directly, 39 items ' +
      'would have been paid incorrectly and fixing it would have required reversing 95 documents.',
  },

  },
});
