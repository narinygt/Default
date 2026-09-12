/* ==========================================================================
   content/fi-en/special-gl.js — English body for "Special G/L"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'special-gl',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Special G/L lets a vendor or customer transaction be tracked ' +
      '**on a different account than the normal reconciliation account**.\n\n' +
      'Normally a vendor liability is posted to the reconciliation account (320) in the ' +
      '{{LFB1}} `AKONT` field. But when a **down payment** is made to a vendor, that isn\'t a ' +
      'liability, it\'s a **receivable** — and on the balance sheet it must show up not under ' +
      '320 but under 159 (down payments made).\n\n' +
      'The mechanism runs on a single character: the **{{ozel-ana-muhasebe-gostergesi}}**. ' +
      'The user enters `A` (down payment), and the system posts by **swapping** the ' +
      'reconciliation account. The vendor is still the same vendor, the item is still a ' +
      'vendor item — only the G/L account differs.\n\n' +
      'The critical distinction is this: **the business partner stays the same, the G/L ' +
      'account changes.** This lets the question "what is my total relationship with this ' +
      'vendor?" be answered from one place, while the balance sheet reports the down payment ' +
      'and the liability separately.',

    neden:
      '**Balance sheet accuracy.** A down payment made is an asset; it can\'t be shown netted ' +
      'against the vendor liability. A down payment received is a liability; it can\'t be ' +
      'deducted from the customer receivable.\n\n' +
      '**Legal requirement.** In the Turkish Uniform Chart of Accounts, down payments (159, ' +
      '340), guarantees (126, 326), and bills of exchange (121, 321) are tracked in separate ' +
      'accounts.\n\n' +
      '**Business partner integrity.** If you tracked the down payment with a separate plain ' +
      'G/L posting, its link to the vendor would be lost. Special G/L both separates and keeps ' +
      'the link.\n\n' +
      '**Process integration.** {{F110}} sees down payments and proposes clearing them; the ' +
      'dunning program takes statistical items into account.',

    sirketOnemi:
      'Special G/L is FI\'s **"in-between concept"**: users who know the basic transactions ' +
      'but haven\'t grasped the architecture struggle here. Because a single field (the ' +
      'indicator) changes both the account and the behavior of the posting.\n\n' +
      'From a consultant\'s point of view, this topic covers the **entire down-payment ' +
      'process**: the request → payment → invoice → clearing chain. If one link in that chain ' +
      'is skipped, the down payment **stays stranded** on the balance sheet and nobody notices ' +
      'for years.\n\n' +
      'The distinguishing question is: **"What happens if the down payment is never ' +
      'cleared?"** The correct answer: the vendor liability **and** the down payment made ' +
      '**both** show up on the balance sheet at the same time — meaning both an asset and a ' +
      'liability are inflated. The document is balanced, the trial balance ties out, no alarm ' +
      'goes off. This is the most common cause of balance-sheet inflation.',

    gercekHayat:
      'A company orders a new machine: 1,200,000 TRY, **30% upfront**.\n\n' +
      '360,000 TRY is paid as a down payment. Out of habit, the accountant enters a normal ' +
      'payment posting: vendor debit / bank credit.\n\n' +
      'The problem: **there isn\'t a liability to the vendor yet** — the invoice hasn\'t ' +
      'arrived. The posting closes out a liability that doesn\'t exist and creates a ' +
      '**reverse balance** on the vendor account.\n\n' +
      'Three months later the invoice arrives: 1,200,000 TRY. The system posts 1,200,000 TRY ' +
      'as a liability to the vendor. The vendor balance: 1,200,000 − 360,000 = 840,000 TRY. ' +
      '**The number is correct.**\n\n' +
      'But the balance sheet is wrong: the down payment made **never showed up in account ' +
      '159** for three months. The interim balance sheet under-reported 360,000 TRY of asset.\n\n' +
      'The right way: pay the down payment **with the `A` indicator**. Then account 159 is ' +
      'debited, the vendor balance stays undisturbed, and once the invoice arrives it\'s ' +
      'cleared with {{F-54}}.',

    muhasebeMantigi:
      'Special G/L\'s accounting logic rests on the **prohibition on netting**.\n\n' +
      'One of accounting\'s fundamental principles is this: **assets and liabilities can\'t ' +
      'be shown netted against each other** (unless there\'s a legal right of set-off).\n\n' +
      'You paid the vendor a 360,000 TRY down payment and you also owe that same vendor ' +
      '1,200,000 TRY. Writing "840,000 TRY liability" on the balance sheet is **wrong**: ' +
      '360,000 TRY is an **asset** (a right to receive goods/services), 1,200,000 TRY is a ' +
      '**liability**. The two must be shown separately.\n\n' +
      'Special G/L delivers exactly that. Clearing ({{F-54}}) is done only once a genuine ' +
      'right of set-off arises — that is, once the invoice arrives.\n\n' +
      'The second layer of logic is **statistical items**: a down payment *request* is not a ' +
      'liability, no money has gone out yet. That\'s why the posting is **statistical**: it ' +
      'doesn\'t affect the balance sheet but is tracked in the system ({{F-47}}).',

    kavramlar: ['ozel-ana-muhasebe-gostergesi', 'mutabakat-hesabi', 'acik-kalem',
                'avans', 'teminat', 'kapatma'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Special G/L\'s typical process is the **four-step down-payment chain**: request → ' +
      'payment → invoice → clearing. Each step uses a different transaction, and if the last ' +
      'step is skipped the down payment stays stranded on the balance sheet.',

    roller:[
      { rol:'Purchasing', gorev:'Sets the down-payment term in the contract; notifies accounting.' },
      { rol:'AP accounting', gorev:'Creates the down-payment request with {{F-47}} (statistical).' },
      { rol:'Treasury', gorev:'Pays the down payment with {{F-48}} or {{F110}}.' },
      { rol:'AP accounting', gorev:'Clears the down payment against the invoice with {{F-54}} once it arrives. **The most frequently skipped step.**' },
      { rol:'General ledger', gorev:'Checks open down payments at month-end ({{FBL1N}} with the special G/L filter).' },
      { rol:'FI consultant', gorev:'Defines the indicators and reconciliation-account matches with {{FBKP}}.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The down-payment chain — four steps; skip one and the balance sheet inflates',
      adimlar:[
        { ic:'📋', rol:'AP accounting', baslik:'Down-payment request ({{F-47}}) — **statistical**',
          aciklama:'Indicator **F**. Does **not affect** the balance sheet, is only tracked. ' +
                   '{{F110}} sees this request and picks it up in its payment proposal.',
          cikti:'A statistical item', ok:'payment time arrives' },
        { ic:'💸', rol:'Treasury', baslik:'The down payment is paid ({{F-48}} or {{F110}})',
          aciklama:'Indicator **A**. **159 Down payments made** is debited, bank is credited. ' +
                   'The request item is closed.',
          cikti:'A genuine down-payment item', ok:'the goods/service arrives' },
        { ic:'🧾', rol:'AP accounting', baslik:'The invoice is recorded ({{FB60}} / {{MIRO}})',
          aciklama:'**A normal posting** — no indicator. 320 Trade payables is credited. ' +
                   'The down payment is still sitting in 159.',
          cikti:'A vendor liability', ok:'**clearing is required**' },
        { ic:'🔗', rol:'AP accounting', baslik:'**The down payment is cleared ({{F-54}})**',
          aciklama:'159 is credited, 320 is debited. The down payment and the liability net ' +
                   'out. **If this step is skipped, the balance sheet inflates.**',
          cikti:'A netted balance', ok:'the remainder is paid' },
        { ic:'💰', rol:'Treasury', baslik:'The remaining amount is paid ({{F-53}} / {{F110}})',
          aciklama:'Invoice amount − down payment = remainder. The vendor open item is closed.',
          cikti:'A closed transaction' },
      ],
    },

    adimlar:[
      { rol:'AP accounting', eylem:'Creates the down-payment request', sistem:'{{F-47}} — indicator **F**, statistical' },
      { rol:'Treasury', eylem:'Pays the down payment', sistem:'{{F-48}} or {{F110}} — indicator **A**' },
      { rol:'AP accounting', eylem:'Records the invoice', sistem:'{{FB60}} / {{MIRO}} — **no indicator**' },
      { rol:'AP accounting', eylem:'Clears the down payment', sistem:'{{F-54}} — **must not be skipped**' },
      { rol:'Treasury', eylem:'Pays the remainder', sistem:'{{F-53}} / {{F110}}' },
      { rol:'General ledger', eylem:'Checks open down payments', sistem:'{{FBL1N}} — special G/L indicator filter' },
      { rol:'AR accounting', eylem:'Receives a customer down payment', sistem:'{{F-29}} — indicator **A**, account 340' },
      { rol:'AR accounting', eylem:'Clears the customer down payment', sistem:'{{F-39}}' },
    ],

    veriAkisi:{
      nereden:'Vendor/customer master data ({{LFB1}}/{{KNB1}} `AKONT`), the special G/L ' +
              'indicator definition ({{FBKP}}), the alternative reconciliation-account match.',
      nereye:'The {{BSEG}} `UMSKZ` field, {{BSIK}}/{{BSID}} open items, alternative ' +
             'reconciliation accounts (159, 340, 126, 326).',
      tetikleyen:'Any posting that has a special G/L indicator entered.',
      sonraki:'Clearing ({{F-54}}/{{F-39}}), the remaining payment, the period-end down-payment check.',
    },

    notlar:[
      { tip:'warn', baslik:'The clearing step is the most frequently skipped one', metin:
        'When the fourth step of the down-payment chain ({{F-54}}) is skipped, **no error ' +
        'occurs at all**:\n\n' +
        'The vendor liability sits at 1,200,000 TRY, the down payment made sits at 360,000 ' +
        'TRY. The document is balanced, the trial balance ties out, {{FBL1N}} looks normal.\n\n' +
        'But the balance sheet is **inflated on both sides**: 360,000 TRY too much asset, ' +
        '360,000 TRY too much liability. The balance sheet total looks bigger than it really ' +
        'is, and ratio analysis is thrown off.\n\n' +
        'Worse: if the user pays the full 1,200,000 TRY when making the remaining payment, ' +
        '**the down payment ends up paid a second time**. That\'s a genuine cash loss.\n\n' +
        '**Prevention:** add an "open down payments" check to the month-end closing ' +
        'checklist: {{FBL1N}} → special G/L indicator **A** → open items. A down payment ' +
        'whose invoice has already arrived shouldn\'t stay on that list.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Special G/L\'s accounting impact is tracked across the **four steps of the ' +
      'down-payment chain**. The documents below show every stage of the same transaction — ' +
      'plus the faulty scenario where the clearing step is skipped.',

    etkilenenHesaplar:[
      { hesap:'159 Down payments on orders made', tur:'Balance sheet — Asset', neden:'A down payment made to a vendor. Indicator **A** → the alternative reconciliation account.' },
      { hesap:'340 Down payments on orders received', tur:'Balance sheet — Liability', neden:'A down payment received from a customer. A liability — an obligation to deliver goods/services.' },
      { hesap:'320 Trade payables', tur:'Balance sheet — Liability', neden:'The normal reconciliation account ({{LFB1}} `AKONT`); used when no indicator is entered.' },
      { hesap:'120 Trade receivables', tur:'Balance sheet — Asset', neden:'The customer\'s normal reconciliation account.' },
      { hesap:'126 Deposits and guarantees given', tur:'Balance sheet — Asset', neden:'Indicator **T** or similar; rent/tender guarantees.' },
      { hesap:'326 Deposits and guarantees received', tur:'Balance sheet — Liability', neden:'A guarantee received from a customer.' },
      { hesap:'121 Notes receivable', tur:'Balance sheet — Asset', neden:'Indicator **W** — a customer receivable converted into a bill of exchange.' },
      { hesap:'Statistical items', tur:'**No** balance sheet impact', neden:'A down-payment request (indicator **F**) is only tracked, it doesn\'t produce a posting.' },
    ],

    fisler:[
      { baslik:'Step 1 — Down-payment request ({{F-47}}) · **statistical, no balance-sheet impact**',
        belgeTuru:'KA', tarih:'05.07.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'—', ad:'Statistical item — Vendor V-2001, indicator **F**', borc:0, alacak:0,
            not:'Tracking only; **the G/L account is not affected**' },
        ],
        not:'A down-payment **request** isn\'t a liability — no money has gone out yet, ' +
             'there\'s just an intention under the contract.\n\n' +
             'That\'s why the posting is **statistical** (a noted item): it doesn\'t affect ' +
             'the balance sheet, but {{F110}} can see this request and pick it up in its ' +
             'payment proposal, and it can be tracked in {{FBL1N}}.\n\n' +
             '*(The 0/0 shown in the table is to emphasize that the posting has no G/L impact.)*' },

      { baslik:'Step 2 — The down payment is paid ({{F-48}}) · indicator **A**',
        belgeTuru:'KZ', tarih:'10.07.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'Down payments on orders made — V-2001', borc:360000, not:'Indicator **A** → the alternative reconciliation account' },
          { hesap:'102', ad:'Banks', alacak:360000 },
        ],
        not:'**Account 320 Trade payables was never used.** The item is still a vendor item ' +
             '(it sits in {{BSIK}}, it carries the vendor number), but on the G/L side it was ' +
             'posted to account **159**.\n\n' +
             'In the right place on the balance sheet: as an **asset**, because there\'s a ' +
             'right to receive goods/services in return.\n\n' +
             'The request item (step 1) was closed by this payment.' },

      { baslik:'Step 3 — The invoice arrives ({{FB60}}) · **no indicator**',
        belgeTuru:'KR', tarih:'15.09.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Plant, machinery and equipment', borc:1000000 },
          { hesap:'191', ad:'Deductible VAT', borc:200000 },
          { hesap:'320', ad:'Trade payables — V-2001', alacak:1200000, not:'The **normal** reconciliation account' },
        ],
        not:'The invoice is a **normal posting** — no special G/L indicator is entered. ' +
             'Account 320 is credited.\n\n' +
             '**There are now two items on the balance sheet:**\n' +
             '159 Down payment made: 360,000 TRY (asset)\n' +
             '320 Trade payables: 1,200,000 TRY (liability)\n\n' +
             'Both are correct but they **need to be netted** — because a legal right of ' +
             'set-off now exists.' },

      { baslik:'Step 4 — The down payment is cleared ({{F-54}}) · **the critical step**',
        belgeTuru:'KA', tarih:'15.09.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-2001', borc:360000, not:'The liability decreased' },
          { hesap:'159', ad:'Down payments on orders made — V-2001', alacak:360000, not:'The down payment was closed' },
        ],
        not:'The down payment and the liability were netted. **The balance sheet is now ' +
             'correct:**\n' +
             '159 Down payment made: **0 TRY**\n' +
             '320 Trade payables: **840,000 TRY** (the remaining liability)\n\n' +
             'If this step is skipped, the balance sheet inflates by 360,000 TRY on both ' +
             'sides, and there\'s a risk of the down payment being paid a second time when ' +
             'the remainder is paid.' },

      { baslik:'Step 5 — The remaining amount is paid ({{F-53}})',
        belgeTuru:'KZ', tarih:'30.09.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-2001', borc:840000 },
          { hesap:'102', ad:'Banks', alacak:840000 },
        ],
        not:'1,200,000 − 360,000 = **840,000 TRY** was paid. ' +
             'Total cash outflow: 360,000 + 840,000 = 1,200,000 TRY ✓\n\n' +
             'The vendor open item is closed, the transaction is complete.' },

      { baslik:'**Faulty scenario** — clearing is skipped, the full amount is paid',
        belgeTuru:'KZ', tarih:'30.09.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-2001', borc:1200000, not:'**The full invoice amount**' },
          { hesap:'102', ad:'Banks', alacak:1200000, not:'**An overpayment**' },
        ],
        not:'Because {{F-54}} was skipped, the vendor liability showed as 1,200,000 TRY and ' +
             'the user paid the whole thing.\n\n' +
             '**Result:** total cash outflow of 360,000 + 1,200,000 = **1,560,000 TRY**. ' +
             'The invoice was 1,200,000 TRY. **360,000 TRY was overpaid.**\n\n' +
             'On top of that, the 360,000 TRY down payment is still open in account 159 — ' +
             'the company is now **owed** by the vendor, and nobody notices.\n\n' +
             'This is the point where a special G/L account used incorrectly turns into a ' +
             '**genuine cash loss**.' },

      { baslik:'Customer down payment — the mirror transaction ({{F-29}}) · indicator **A**',
        belgeTuru:'DZ', tarih:'12.07.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Banks', borc:250000 },
          { hesap:'340', ad:'Down payments on orders received — C-5002', alacak:250000, not:'A **liability** — an obligation to deliver goods/services' },
        ],
        not:'A down payment received from a customer is a **liability**: money was received ' +
             'but no goods/services have been delivered in return.\n\n' +
             'That\'s why 340 Down payments received (a liability) is used instead of 120 ' +
             'Trade receivables (an asset).\n\n' +
             'The **exact mirror** of the vendor side: an asset there, a liability here.\n' +
             'Cleared with {{F-39}}.' },
    ],

    tHesaplar:[
      { hesap:'Down payments on orders made', kod:'159 (asset)',
        borc:[{ ad:'Down-payment payment ({{F-48}})', tutar:360000 }],
        alacak:[{ ad:'Clearing ({{F-54}})', tutar:360000 }],
        not:'**Should be zeroed** after clearing' },
      { hesap:'Trade payables', kod:'320 (liability)',
        borc:[{ ad:'Down-payment clearing', tutar:360000 }, { ad:'The remaining payment', tutar:840000 }],
        alacak:[{ ad:'Invoice', tutar:1200000 }],
        not:'The normal reconciliation account' },
      { hesap:'Down payments on orders received', kod:'340 (liability)',
        borc:[{ ad:'Clearing ({{F-39}})', tutar:250000 }],
        alacak:[{ ad:'Customer down payment ({{F-29}})', tutar:250000 }],
        not:'The mirror of the vendor side' },
    ],

    notlar:[
      { tip:'tip', baslik:'Why doesn\'t a separate plain G/L posting work?', metin:
        'The obvious "simple" fix is: post the down payment straight to account 159 with ' +
        '{{FB50}}, and don\'t bother with the vendor.\n\n' +
        'This **loses three things**:\n\n' +
        '**1. The business-partner link.** The item doesn\'t carry a vendor number. The ' +
        'question "what is my total relationship with V-2001?" can\'t be answered; ' +
        '{{FBL1N}} never sees this down payment at all.\n\n' +
        '**2. Automatic clearing.** {{F-54}} can\'t work — it can\'t find the down payment ' +
        'as a vendor item. Clearing is done manually, and gets forgotten.\n\n' +
        '**3. Process integration.** {{F110}} doesn\'t see the down payment, doesn\'t take it ' +
        'into account in its payment proposal. Vendor balance reports come out incomplete.\n\n' +
        'Special G/L preserves all three of these while changing **only the G/L account**. ' +
        'The elegance of the design is right there: **it separates without severing the ' +
        'link**.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Special G/L items fall into **two broad classes**: **real** (affects the balance ' +
      'sheet) and **statistical** (only tracked). This split is the most basic thing that ' +
      'decides how the indicator behaves.',

    liste:[
      { ad:'Real Special G/L Item',
        aciklama:'Produces a **genuine posting** to the alternative reconciliation account; affects the balance sheet.',
        neZaman:'When a down payment is paid, a guarantee is given, or a bill of exchange is received.',
        ornek:'Indicator **A** (down payment) → account 159 is debited, bank is credited.',
        tcodes:['F-48','F-29'] },

      { ad:'Statistical / Noted Item',
        aciklama:'**Doesn\'t affect the balance sheet**; a one-sided posting made only for tracking.',
        neZaman:'For down-payment requests, sureties, guarantees — commitments that haven\'t yet materialized.',
        ornek:'Indicator **F** (down-payment request) → no G/L impact, but {{F110}} sees it ' +
              'and picks it up in its payment proposal.',
        tcodes:['F-47','F-37'] },

      { ad:'Down Payment Made (Vendor) — indicator A',
        aciklama:'A down payment paid to a vendor; tracked as an **asset**.',
        neZaman:'When advance payment is required before an order.',
        ornek:'159 Down payments on orders made. Cleared with {{F-54}}.',
        tcodes:['F-48','F-54'] },

      { ad:'Down Payment Received (Customer) — indicator A',
        aciklama:'A down payment received from a customer; tracked as a **liability**.',
        neZaman:'When advance collection is made from a customer.',
        ornek:'340 Down payments on orders received. Cleared with {{F-39}}.',
        tcodes:['F-29','F-39'] },

      { ad:'Guarantee / Security Deposit',
        aciklama:'Amounts given or received as security under a contract.',
        neZaman:'Lease contracts, tender guarantees, public-sector work.',
        ornek:'126 Deposits and guarantees given / 326 Deposits and guarantees received. ' +
              '**Stays open for a long time** — the period-end check matters here.' },

      { ad:'Bill of Exchange — indicator W',
        aciklama:'A receivable converted into a bill of exchange; carries a different maturity and risk profile.',
        neZaman:'In sectors that work with bills of exchange (textiles, food wholesale).',
        ornek:'121 Notes receivable / 321 Notes payable. ' +
              'Tracked in a separate account because it **can be endorsed and discounted**.' },

      { ad:'Doubtful Receivable',
        aciklama:'Tracking a receivable separately once its collectibility becomes doubtful.',
        neZaman:'When a customer runs into payment difficulty; at the end of the dunning process.',
        ornek:'128 Doubtful trade receivables. Kept apart from the normal receivable so that ' +
              'aging and the allowance account work correctly.' },

      { ad:'Automatic Special G/L Indicator',
        aciklama:'An indicator the system assigns automatically; the user doesn\'t choose it.',
        neZaman:'Bill-of-exchange transactions, some payment methods.',
        ornek:'The payment program assigns the relevant indicator on its own for a bill-of-exchange payment.' },
    ],

    karsilastirmaBasliklar:['Real item', 'Statistical item'],
    karsilastirma:[
      ['Balance-sheet impact', '**Yes** — the G/L account moves', '**No** — tracked only'],
      ['Offsetting posting', 'Yes (bank, cash)', 'No — one-sided'],
      ['Typical indicator', '**A** down payment, **T** guarantee', '**F** down-payment request'],
      ['Typical transaction', '{{F-48}}, {{F-29}}', '{{F-47}}, {{F-37}}'],
      ['{{F110}} behavior', 'Treats it as a paid item', '**Picks it up in the payment proposal**'],
      ['Shows up on the trial balance?', 'Yes', 'No'],
      ['How it closes', 'By clearing ({{F-54}})', 'Automatically once payment is made'],
      ['Purpose', 'A correct balance-sheet presentation', 'Process tracking and triggering payment'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'F-47', ad:'Vendor down-payment request — statistical',
        amac:'Creates a statistical item for a down payment to be paid to a vendor; ' +
             '{{F110}} sees it and picks it up in its payment proposal.',
        neZaman:'Whenever the contract has a down-payment term, before the payment is made.',
        adimlar:[
          { baslik:'Enter the vendor and company code' },
          { baslik:'**Enter the special G/L indicator** — usually `F`',
            aciklama:'This indicator makes the posting **statistical**; the balance sheet isn\'t affected.' },
          { baslik:'Enter the amount and due date',
            aciklama:'The due date decides when {{F110}} will pick up the request in its payment proposal.' },
          { baslik:'Save', aciklama:'The G/L account **doesn\'t** move.' },
        ],
        ekranAkisi:[
          { ekran:'Header', islem:'Document type KA · company code 1000' },
          { ekran:'Vendor', islem:'V-2001 · special G/L indicator **F**' },
          { ekran:'Item', islem:'360,000 TRY · due date 10.07.2027' },
        ],
        alanlar:{
          zorunlu:['Vendor','Company code','Special G/L indicator','Amount','Due date'],
          opsiyonel:['Text','Reference','Purchase order'] },
        hatalar:[
          { mesaj:'Special G/L indicator ... not defined for account type K', sebep:'The indicator isn\'t defined for the vendor account type.', cozum:'Define the indicator with {{FBKP}} and assign the alternative reconciliation account.' },
        ],
        ipucu:'The down-payment request step is **optional** — a payment can also be made ' +
              'directly with {{F-48}}. But if a request is created, {{F110}} picks up the ' +
              'down payment **automatically** in its payment proposal and the process ' +
              'doesn\'t depend on someone remembering. On companies that pay down payments ' +
              'routinely, this step saves a considerable amount of time.',
        ilgili:['F-48','F110','FBL1N'] },

      { kod:'F-48', ad:'Pay vendor down payment — a real item',
        amac:'Pays the down payment and posts it to the **159 Down payments made** account.',
        neZaman:'When making a down-payment payment.',
        adimlar:[
          { baslik:'Enter the bank account, amount, and date' },
          { baslik:'Enter the vendor and the **special G/L indicator**',
            aciklama:'Indicator **A**. This switches the reconciliation account from 320 to **159**.' },
          { baslik:'Select the down-payment request, if there is one',
            aciklama:'If a request was created with {{F-47}}, it\'s selected here and closed.' },
          { baslik:'Simulate and save',
            aciklama:'The posting: 159 debit / bank credit. **320 is never used.**' },
        ],
        alanlar:{
          zorunlu:['Bank account','Amount','Vendor','Special G/L indicator'],
          opsiyonel:['Down-payment request reference','Text'] },
        hatalar:[
          { mesaj:'Alternative reconciliation account not defined', sebep:'The indicator ↔ account match in {{FBKP}} is missing.', cozum:'Define the match for reconciliation account 320, indicator **A** → 159, with {{FBKP}}.' },
          { mesaj:'Account ... requires special G/L indicator', sebep:'Account 159 is set up to be used only with a special G/L indicator.', cozum:'This is the correct behavior; enter the indicator.' },
        ],
        ipucu:'After posting, query the vendor in {{FBL1N}} with the special G/L indicator ' +
              'filter: the down payment should show up **as a vendor item**. If it doesn\'t ' +
              'show up, a plain G/L posting was made by mistake and {{F-54}} **won\'t work**.',
        ilgili:['F-47','F-54','FBL1N','FBKP'] },

      { kod:'F-54', ad:'Clear vendor down payment — **the most critical transaction**',
        amac:'Nets the down payment made against the vendor invoice.',
        neZaman:'After the invoice is recorded — **every time**.',
        adimlar:[
          { baslik:'Enter the vendor and company code' },
          { baslik:'Select the invoice to clear against',
            aciklama:'The invoice document number is entered.' },
          { baslik:'List and select the open down payments',
            aciklama:'The system shows that vendor\'s open down payments; a partial clearing ' +
                     'can also be done.' },
          { baslik:'Save',
            aciklama:'The posting: 320 debit / 159 credit. The down payment closes, the vendor liability decreases.' },
        ],
        ekranAkisi:[
          { ekran:'Header', islem:'Vendor V-2001 · invoice 1900007712' },
          { ekran:'Down-payment list', islem:'360,000 TRY open down payment selected' },
          { ekran:'Simulation', islem:'320 debit 360,000 / 159 credit 360,000' },
        ],
        alanlar:{
          zorunlu:['Vendor','Invoice reference','Down payment to clear'],
          opsiyonel:['Partial amount','Text'] },
        hatalar:[
          { mesaj:'No down payments found for vendor', sebep:'The down payment was made with a plain G/L posting, not the special G/L indicator.', cozum:'Reverse the down-payment posting and re-enter it with {{F-48}} using indicator **A**.' },
          { mesaj:'Down payment amount exceeds invoice amount', sebep:'The down payment is larger than the invoice.', cozum:'Do a partial clearing; the remaining down payment stays open and is cleared against the next invoice.' },
        ],
        ipucu:'**No error occurs when this transaction is skipped** — and that\'s exactly ' +
              'where the danger lies. The balance sheet inflates on both sides, and the down ' +
              'payment can end up paid a second time when the remainder is paid.\n\n' +
              'Add this check to the month-end close: {{FBL1N}} → indicator **A** → open ' +
              'items. A down payment whose invoice has already arrived **shouldn\'t** remain ' +
              'on that list.',
        ilgili:['F-48','FBL1N','F-53'] },

      { kod:'F-29', ad:'Receive customer down payment — the mirror transaction',
        amac:'Posts a down payment received from a customer to the **340 Down payments received** account.',
        neZaman:'When advance collection is made from a customer.',
        adimlar:[
          { baslik:'Enter the bank account, amount, and date' },
          { baslik:'Enter the customer and the special G/L indicator', aciklama:'Indicator **A**.' },
          { baslik:'Save', aciklama:'The posting: bank debit / **340** credit.' },
        ],
        ipucu:'The **exact mirror** of the vendor side, but the accounting logic is reversed: ' +
              'there a down payment is an **asset** (a right to receive goods), here it\'s a ' +
              '**liability** (an obligation to deliver goods). That\'s why account **340** is ' +
              'used instead of 120.',
        hatalar:[
          { mesaj:'Alternative reconciliation account not defined for account type D', sebep:'The indicator isn\'t defined for the customer account type.', cozum:'Define the match for customer reconciliation account 120, indicator A → 340, with {{FBKP}}.' },
        ],
        ilgili:['F-39','F-37','FBKP'] },

      { kod:'F-39', ad:'Clear customer down payment',
        amac:'Nets the down payment received against the sales invoice.',
        neZaman:'After the sales invoice has been issued.',
        adimlar:[
          { baslik:'Enter the customer and the invoice' },
          { baslik:'Select the open down payments' },
          { baslik:'Save', aciklama:'The posting: 340 debit / 120 credit.' },
        ],
        ipucu:'The customer counterpart of {{F-54}}, and the **same risk** applies: if it\'s ' +
              'skipped, both the down payment received and the customer receivable stay on ' +
              'the balance sheet, and the customer can end up **overcollected** from.',
        ilgili:['F-29','FBL5N'] },

      { kod:'FBKP', ad:'Special G/L indicator configuration',
        amac:'Defines the indicators, their types, and the alternative reconciliation-account matches.',
        neZaman:'During setup; whenever a new special posting type is needed.',
        adimlar:[
          { baslik:'Enter the special G/L section' },
          { baslik:'Choose the account type', aciklama:'**K** vendor · **D** customer.' },
          { baslik:'Define the indicator',
            aciklama:'A single character. Its type is decided: **real** or **statistical**.' },
          { baslik:'**Enter the reconciliation-account match**',
            aciklama:'Normal account (320) → alternative account (159). A separate line is ' +
                     'needed for each reconciliation account.' },
        ],
        alanlar:{
          zorunlu:['Account type','Indicator','Normal reconciliation account','Alternative account'],
          opsiyonel:['Statistical flag','Target special G/L indicator'] },
        hatalar:[
          { mesaj:'Alternative reconciliation account not defined', sebep:'The match was only defined for some reconciliation accounts.', cozum:'A match must be entered **for every reconciliation account in use** — if there\'s more than one 320* account, all of them.' },
        ],
        ipucu:'The most common configuration mistake: the company has more than one vendor ' +
              'reconciliation account (domestic 320, foreign 321, group companies 322) and ' +
              'the match is only defined for one of them.\n\n' +
              'The result: down payments can be paid to some vendors, not to others — and ' +
              'the error message doesn\'t clearly say why.',
        ilgili:['F-48','F-29','FS00'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'The table side of special G/L is simple: **a single field** ({{BSEG}} `UMSKZ`) ' +
      'decides everything. There\'s no separate table — the items sit in the normal ' +
      'vendor/customer open-item tables.',

    liste:[
      { ad:'BSEG', baslik:'Document line items — the special G/L indicator lives here',
        tutar:'The item\'s special G/L indicator (`UMSKZ`) and the alternative reconciliation account used.',
        olusturan:'A posting',
        guncelleyen:'Clearing and settlement transactions',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'{{BSIK}}/{{BSID}} open-item indexes; {{LFB1}}/{{KNB1}} master data.',
        s4:'{{uyumluluk-view}}; {{ACDOCA}} carries the `UMSKZ` field.',
        alanlar:[
          { ad:'UMSKZ', aciklama:'**Special G/L indicator** — A down payment, F request, W bill of exchange. Blank means a normal item.' },
          { ad:'HKONT', aciklama:'The G/L account used — the **alternative** account (159) when an indicator is present' },
          { ad:'LIFNR / KUNNR', aciklama:'Vendor / customer — **stays filled even with an indicator**', tip:'fk' },
          { ad:'UMSKS', aciklama:'Special G/L transaction type — A down payment, W bill of exchange, D other' },
        ] },

      { ad:'BSIK', baslik:'Vendor open items',
        tutar:'Down-payment items sit **here** too — in the same table as normal liabilities.',
        olusturan:'Every document that contains a vendor item',
        guncelleyen:'Clearing → moves to {{BSAK}}',
        anahtar:'LIFNR + BUKRS + BELNR + BUZEI',
        iliskiler:'{{FBL1N}} reads from this table; can be filtered by `UMSKZ`.',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'UMSKZ', aciklama:'Indicator — used **as a filter** in {{FBL1N}}' },
          { ad:'LIFNR', aciklama:'Vendor — the down payment is tied to the vendor too', tip:'fk' },
        ] },

      { ad:'BSID', baslik:'Customer open items',
        tutar:'Customer down payments and guarantees sit here.',
        olusturan:'Every document that contains a customer item',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'UMSKZ', aciklama:'Indicator — A down payment received, W bill of exchange' },
        ] },

      { ad:'LFB1', baslik:'Vendor company-code data',
        tutar:'The **normal** reconciliation account (`AKONT`). The alternative account isn\'t ' +
              'here — it lives in configuration ({{FBKP}}).',
        olusturan:'{{BP}} → the FI Vendor role',
        s4:'Managed via {{BP}}.',
        alanlar:[
          { ad:'AKONT', aciklama:'The {{mutabakat-hesabi}} — 320. **Not used** once an indicator is entered.' },
        ] },

      { ad:'T074', baslik:'Special G/L account determination',
        tutar:'The indicator ↔ alternative reconciliation-account match.',
        olusturan:'{{FBKP}}',
        guncelleyen:'{{FBKP}}',
        anahtar:'KOART + SHBKZ + HKONT',
        iliskiler:'Read at posting time to find the alternative account.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KOART', aciklama:'Account type — **K** vendor, **D** customer' },
          { ad:'SHBKZ', aciklama:'The special G/L indicator' },
          { ad:'HKONT', aciklama:'The normal reconciliation account (320)' },
          { ad:'SKONT', aciklama:'The **alternative** reconciliation account (159)' },
        ] },

      { ad:'ACDOCA', baslik:'Universal Journal',
        tutar:'Special G/L items are here too; distinguished by the `UMSKZ` field.',
        olusturan:'Every FI document',
        s4:'S/4HANA\'s main source for special G/L analysis.' },
    ],

    er:{
      type:'er',
      baslik:'Special G/L — a single field decides everything',
      varliklar:[
        { ad:'LFB1', rol:'Master data', aciklama:'Vendor company-code data',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT', tip:'fk' }] },
        { ad:'T074', rol:'Configuration', aciklama:'**Indicator → alternative account**',
          alanlar:[{ ad:'KOART', tip:'pk' }, { ad:'SHBKZ', tip:'pk' }, { ad:'HKONT', tip:'fk' }, { ad:'SKONT' }] },
        { ad:'BKPF', rol:'FI', aciklama:'Document header',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'BSEG', rol:'FI', hub:true, aciklama:'Line item — **UMSKZ is here**',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'UMSKZ' }, { ad:'HKONT' }, { ad:'LIFNR', tip:'fk' }] },
        { ad:'BSIK', rol:'Index', aciklama:'Vendor open items',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'UMSKZ' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'Universal items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'UMSKZ' }, { ad:'RACCT' }] },
      ],
      iliskiler:[
        { from:'LFB1', to:'T074', alanlar:'AKONT → HKONT', not:'the normal account' },
        { from:'T074', to:'BSEG', alanlar:'SKONT → HKONT', not:'**the alternative account**' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'header → line item' },
        { from:'BSEG', to:'BSIK', alanlar:'BELNR + BUZEI', not:'the open item' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR + BUZEI', not:'the universal item' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'From the user\'s point of view, special G/L comes down to **a single field**: the ' +
      'special G/L indicator. But filling that field correctly and never skipping the ' +
      'clearing step decides the outcome of the whole process.',

    ekranlar:[
      { ad:'{{F-48}} — the down-payment payment screen',
        aciklama:'Bank information and vendor information are entered; the indicator field is critical.',
        alanlar:[
          { ad:'Bank account', zorunlu:true, aciklama:'The account the payment goes out from.' },
          { ad:'Amount / date', zorunlu:true },
          { ad:'Vendor', zorunlu:true, aciklama:'The down payment stays **tied to the vendor** — this is the heart of the design.' },
          { ad:'**Special G/L indicator**', zorunlu:true, aciklama:'**A**. If left blank, it becomes a normal ' +
                   'payment and tries to close a liability that doesn\'t exist.' },
          { ad:'Down-payment request reference', zorunlu:false, aciklama:'Selected and closed if a request exists via {{F-47}}.' },
        ],
        ipucu:'If the indicator field is left blank, the system **doesn\'t throw an error** ' +
              '— it just makes a normal payment posting. Result: a reverse balance forms on ' +
              'the vendor account and account 159 never moves at all.\n\n' +
              'Check after posting: {{FBL1N}} → vendor → indicator **A** filter. If the down ' +
              'payment doesn\'t show up here, it was entered wrong.' },

      { ad:'{{F-54}} — the down-payment clearing screen',
        aciklama:'The screen where the invoice and the down payment are netted; the most critical step in the process.',
        alanlar:[
          { ad:'Vendor', zorunlu:true },
          { ad:'Invoice document number', zorunlu:true, aciklama:'The invoice to clear against.' },
          { ad:'Down-payment selection', zorunlu:true, aciklama:'The system lists that vendor\'s open ' +
                   'down payments; if there\'s more than one, all or some can be selected.' },
          { ad:'Partial amount', zorunlu:false, aciklama:'If the down payment is larger than the ' +
                   'invoice, a partial clearing is done; the remaining down payment stays open.' },
        ],
        ipucu:'If the down-payment list comes back **empty**, there are two possibilities: ' +
              '(1) the down payment was made as a plain G/L posting instead of with the ' +
              'special G/L indicator, (2) the wrong vendor was selected.\n\n' +
              'The first case is more common, and the fix: reverse the down-payment posting, ' +
              're-enter it with {{F-48}} using the indicator.' },

      { ad:'{{FBL1N}} — the open-down-payment check',
        aciklama:'Special G/L\'s **control point**.',
        alanlar:[
          { ad:'Vendor / company code', zorunlu:true },
          { ad:'Open items', zorunlu:true, aciklama:'The open-items option is selected.' },
          { ad:'**Special G/L indicator**', zorunlu:false, aciklama:'If **A** is entered, only ' +
                   'down payments are listed. If left blank, normal items come back — ' +
                   '**the down payments don\'t show up**.' },
          { ad:'Date range', zorunlu:false },
        ],
        ipucu:'**Critical behavior:** in {{FBL1N}}, if the special G/L indicator field is ' +
              'left blank, down payments **aren\'t listed**. When the user looks up "the ' +
              'vendor\'s open items," they don\'t see the down payment and assume there isn\'t ' +
              'one.\n\n' +
              'This is the most common answer to "where did the down payment go?" To see ' +
              'every item, enter `*` in the indicator field, or query separately.' },

      { ad:'{{FBKP}} — indicator configuration',
        aciklama:'The screen where indicators and account matches are defined.',
        alanlar:[
          { ad:'Account type', zorunlu:true, aciklama:'**K** vendor · **D** customer' },
          { ad:'Indicator', zorunlu:true, aciklama:'A single character — A, F, W, T…' },
          { ad:'Statistical flag', zorunlu:false, aciklama:'If set, the balance sheet isn\'t affected.' },
          { ad:'Normal → alternative account', zorunlu:true, aciklama:'320 → 159. ' +
                   '**A separate line for every reconciliation account in use.**' },
        ],
        ipucu:'If the company has more than one vendor reconciliation account (domestic / ' +
              'foreign / group), the match must be defined **for all of them**. If one\'s ' +
              'missing, down payments can\'t be paid to some vendors, and the error message ' +
              'doesn\'t clearly say why.' },
    ],

    zorunlu:['Vendor/customer','Special G/L indicator','Amount','Bank account','Alternative reconciliation account (configuration)'],
    opsiyonel:['Down-payment request reference','Partial clearing amount','Text'],

    hatalar:[
      { mesaj:'Special G/L indicator ... is not defined for account type K', sebep:'The indicator isn\'t defined for the vendor account type.', cozum:'{{FBKP}} → account type K → define the indicator.' },
      { mesaj:'Alternative reconciliation account not defined for account 320100', sebep:'No match was entered for that reconciliation account.', cozum:'In {{FBKP}}, define the match for **every** reconciliation account in use — if there\'s more than one 320* account, all of them.' },
      { mesaj:'No down payments found for vendor (F-54)', sebep:'The down payment was made as a plain G/L posting; it isn\'t a vendor item.', cozum:'Reverse the down-payment posting and re-enter it with {{F-48}} using indicator **A**.' },
      { mesaj:'The down payment doesn\'t show up in FBL1N', sebep:'The special G/L indicator filter was left blank.', cozum:'Enter **A** or `*` in the indicator field. This isn\'t a bug, it\'s filter behavior.' },
      { mesaj:'Account 159000 requires a special G/L indicator', sebep:'The account is set up to be used only with a special G/L indicator.', cozum:'This is correct behavior — it blocks a plain posting. Enter the indicator.' },
      { mesaj:'Down payment amount exceeds invoice amount', sebep:'The down payment is larger than the invoice.', cozum:'Do a partial clearing; the remaining down payment is cleared against the next invoice.' },
    ],

    ipuclari:[
      '**Add an "open down payments" check to the month-end close:** {{FBL1N}} → indicator ' +
      '**A** → open items. A down payment whose invoice has already arrived shouldn\'t remain ' +
      'on that list.',
      'In {{FBL1N}}, if the indicator field is left blank, down payments **don\'t show up** ' +
      '— this is the first cause of the "where did the down payment go" complaint.',
      'After a down-payment payment, always confirm with {{FBL1N}} that it shows up as a ' +
      'vendor item; if it doesn\'t, {{F-54}} won\'t work.',
      'In {{FBKP}}, define the match for **every** reconciliation account in use.',
      'Don\'t make the alternative reconciliation accounts ({{FS00}}) "automatic postings ' +
      'only" — special G/L transactions post to those accounts as vendor/customer items.',
      'Review long-open items like guarantees annually; guarantees whose contracts have ' +
      'expired get forgotten on the balance sheet.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BSEG', ne:'The `UMSKZ` special G/L indicator + the alternative account `HKONT`' },
      { tablo:'BSIK', ne:'Vendor open items — down payments are here too' },
      { tablo:'BSID', ne:'Customer open items — down payments received' },
      { tablo:'ACDOCA', ne:'Universal items; distinguished by `UMSKZ`' },
      { tablo:'BKPF', ne:'Document header' },
      { tablo:'T074', ne:'The indicator ↔ alternative account match ({{FBKP}})' },
    ],

    commit:
      'A special G/L posting is **not technically different** from a normal FI posting — ' +
      'the same LUW, the same tables, the same commit logic.\n\n' +
      'The only difference is that, in the account-determination step, the {{T074}} table is ' +
      'read and the alternative account there is used instead of {{LFB1}} `AKONT`.\n\n' +
      'This simplicity matters: special G/L isn\'t a separate module, it\'s **a variant of a ' +
      'normal FI posting**. That\'s why every standard mechanism (clearing, reversal, FX ' +
      'valuation, dunning) works on special G/L items too.',

    belgeNo:
      'Special G/L documents use the normal number ranges. However, a separate document ' +
      'type (KA) is common for down-payment transactions, and that type gets its own range — ' +
      'making it easier to distinguish in reporting.',

    postingLogic:
      'The account-determination chain for a special G/L posting:\n\n' +
      '**1.** The user enters the vendor/customer and the **special G/L indicator**.\n' +
      '**2.** The system reads the **normal** reconciliation account (320) from {{LFB1}} `AKONT`.\n' +
      '**3.** A lookup is done in {{T074}} on (account type + indicator + normal account).\n' +
      '**4.** The **alternative account** found (159) is written to the line item.\n' +
      '**5.** If the indicator is defined as **statistical**, no offsetting posting is ' +
      'generated; the item is written for tracking purposes only.\n' +
      '**6.** The indicator is stored in the {{BSEG}} `UMSKZ` field — reporting and clearing ' +
      'look at this field.\n\n' +
      'If no match is found at step 3, the error *"Alternative reconciliation account not ' +
      'defined"* is raised and **the document can\'t be saved**.',

    belgeTuru:
      'The document type doesn\'t decide special G/L behavior, but it matters for ' +
      'classification. Common usage: **KA** (vendor document) for down-payment requests and ' +
      'clearing, **KZ** (vendor payment) for the down-payment payment, **DZ** for a customer ' +
      'down payment.\n\n' +
      'The document type also restricts the account types allowed in {{OBA7}}; because ' +
      'special G/L items are on account type vendor (K) or customer (D), the document type ' +
      'must allow that type.',

    numberRange:
      'A separate range isn\'t mandatory. If a separate range is defined for down-payment ' +
      'document types, it\'s opened with {{FBN1}} and extended at year-start.',

    accountDetermination:
      '{{FBKP}} → {{T074}}. The key triple:\n\n' +
      '**Account type** (K vendor / D customer) + **indicator** (A, F, W…) + **normal ' +
      'reconciliation account** (320) → **alternative account** (159).\n\n' +
      'Critical point: the match is **keyed on the normal reconciliation account**. If the ' +
      'company has more than one vendor reconciliation account (320100 domestic, 320200 ' +
      'foreign, 320300 group), **each one needs its own line**.\n\n' +
      'This is the most commonly overlooked configuration detail, and its result is: down ' +
      'payments can be paid to some vendors, not to others.',

    tur:
      '**Configuration:** the special G/L indicators, the statistical flag, the ' +
      'reconciliation-account matches ({{FBKP}} → {{T074}}), document types.\n\n' +
      '**Master data:** the vendor/customer normal reconciliation account ({{LFB1}}/{{KNB1}} ' +
      '`AKONT`), the G/L master data of the alternative accounts ({{SKB1}}).\n\n' +
      '**Transaction data:** the items in {{BSEG}} that carry `UMSKZ`.',

    transport:
      'Indicator definitions and account matches transport. **But the matches reference G/L ' +
      'account numbers:** if account 159000 hasn\'t been opened in the target system, or is ' +
      'numbered differently, the match won\'t work.\n\n' +
      'The target system may also have **extra reconciliation accounts** (a single 320 in ' +
      'test, three in production). In that case a down-payment posting that works in test ' +
      'throws *"Alternative reconciliation account not defined"* in production.\n\n' +
      '**Migration check:** list all the vendor/customer reconciliation accounts in ' +
      'production and confirm a match exists for every one of them.',

    img:[
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Down Payment Made → Define Alternative Reconciliation Account for Down Payments', not:'{{FBKP}} → {{T074}}' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Down Payment Received → Define Alternative Reconciliation Account for Down Payments', not:'The customer side — mirror configuration' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Bills of Exchange Transactions', not:'Bill-of-exchange indicators (W)' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Document Types', not:'{{OBA7}} — the KA, KZ, DZ types' },
    ],

    ekstra:[
      { ic:'📊', baslik:'A statistical item: tracking without affecting the balance sheet', metin:
        'Why doesn\'t a down-payment **request** affect the balance sheet? Because nothing ' +
        'has happened yet: no money has gone out, no goods have arrived, no legal obligation ' +
        'has arisen. There\'s only a down-payment term in the contract.\n\n' +
        'The accounting principle is clear: **an unrealized transaction isn\'t posted.** But ' +
        'from a process point of view, this information needs to exist in the system — ' +
        'otherwise nobody remembers to pay the down payment.\n\n' +
        'SAP solves this with a **statistical item**: the item is written to {{BSEG}}, shows ' +
        'up in {{FBL1N}}, and {{F110}} picks it up in its payment proposal — but **no ' +
        'offsetting posting is generated**, so it doesn\'t affect the trial balance or the ' +
        'balance sheet.\n\n' +
        'The same mechanism is used for sureties and guarantees too: not a liability, but a ' +
        'commitment that needs to be tracked.\n\n' +
        '**Consulting note:** statistical items are the system counterpart of "memorandum ' +
        'accounts" in an audit context, and can be the data source behind balance-sheet ' +
        'footnotes.' },

      { ic:'🔀', baslik:'Why does having more than one reconciliation account cause problems?', metin:
        'The {{T074}} match key is made up of three fields: account type + indicator + the ' +
        '**normal reconciliation account**.\n\n' +
        'The third field is the most commonly missed detail. If the company has a single ' +
        'vendor reconciliation account (320000), no problem arises. But in real setups ' +
        'there\'s usually more than one:\n\n' +
        '320100 Domestic vendors · 320200 Foreign vendors · 320300 Group companies\n\n' +
        'Each one needs **its own match line**. If only 320100 has been defined:\n\n' +
        '**a)** Down payments can be paid to domestic vendors ✓\n' +
        '**b)** Down payments **can\'t** be paid to foreign vendors\n\n' +
        'The error message *"Alternative reconciliation account not defined"* is shown, but ' +
        'it doesn\'t always clearly say **which account** it\'s about. The user says "it ' +
        'worked yesterday, it doesn\'t work today" — actually they\'re working with a ' +
        'different vendor group.\n\n' +
        '**Diagnosis:** read the vendor\'s {{LFB1}} `AKONT` value, then check in {{FBKP}} ' +
        'whether a match exists for that account.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Don\'t make the alternative accounts "automatic postings only"', metin:
        'The practice that\'s correct on tax accounts is **wrong** here.\n\n' +
        'If a "automatic postings only" flag is set in {{FS00}} on alternative reconciliation ' +
        'accounts like 159 or 340, special G/L transactions **won\'t work** — because these ' +
        'transactions post to those accounts as vendor/customer items.\n\n' +
        'The correct setting: flag the account as a **reconciliation account** ({{SKB1}} ' +
        '`MITKZ` = K or D). That already prevents **direct** postings to the account but ' +
        'allows special G/L transactions.\n\n' +
        'If the two settings get mixed up, the down-payment process stops working entirely, ' +
        'and the cause gets hunted for in configuration for hours.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Special G/L **didn\'t change at all** in S/4HANA: the indicators are the same, ' +
      '{{T074}} is the same, {{F-48}}/{{F-54}} are the same. What changed is only that items ' +
      'are held in {{ACDOCA}} and Fiori apps have arrived.',

    eccFarklari:[
      { konu:'Indicators', ecc:'{{FBKP}} → {{T074}}', s4:'**Unchanged**' },
      { konu:'Transactions', ecc:'{{F-47}}, {{F-48}}, {{F-54}}, {{F-29}}, {{F-39}}', s4:'**The same** + Fiori' },
      { konu:'Item data', ecc:'{{BSEG}} `UMSKZ`', s4:'{{ACDOCA}} `UMSKZ`' },
      { konu:'Open-item index', ecc:'{{BSIK}} / {{BSID}} physical', s4:'{{uyumluluk-view}}' },
      { konu:'Master data', ecc:'{{XK01}} / {{XD01}}', s4:'{{BP}}' },
      { konu:'Reporting', ecc:'{{FBL1N}} indicator filter', s4:'The same + Fiori "Manage Down Payments"' },
    ],

    universalJournal:
      '{{ACDOCA}} carries the `UMSKZ` field, so special G/L analyses can now be done **from a ' +
      'single table**.\n\n' +
      'The practical gain: questions like "how much open down payment is there by profit ' +
      'center?" get answered without a join. In ECC, {{BSIK}} and {{BSEG}} would need to be ' +
      'joined to find the profit center.\n\n' +
      'Also, if {{belge-bolme}} is active, down-payment items are split too, and a ' +
      'segment-based down-payment report can be produced.',

    kalkanTcodes:[
      { eski:'{{XK01}} / {{XD01}}', yeni:'{{BP}}', not:'Master data — the reconciliation account comes from here' },
      { eski:'—', yeni:'—', not:'{{F-47}}, {{F-48}}, {{F-54}}, {{F-29}}, {{F-39}}, {{FBKP}} were **not removed**' },
    ],

    fiori:[
      { ad:'Manage Down Payments', aciklama:'Shows open down payments as a visual list; makes tracking uncleared down payments easier.' },
      { ad:'Post Outgoing Payments', aciklama:'Replaces {{F-53}}/{{F-48}}; includes a special G/L indicator field.' },
      { ad:'Manage Supplier Line Items', aciklama:'Replaces {{FBL1N}}; the indicator filter is visual.' },
      { ad:'Supplier Balances', aciklama:'Shows normal liabilities and down payments separately.' },
    ],

    compatibilityViews:[
      '{{BSIK}}, {{BSID}}, {{BSEG}} — views derived from {{ACDOCA}}.',
      '{{T074}} — **stays a physical table**.',
      'Special G/L is one of the areas that\'s **structurally untouched** in the S/4HANA migration.',
    ],

    performans:
      'Open down-payment reports run through {{ACDOCA}}, so they got faster. The real gain ' +
      'is the Fiori "Manage Down Payments" app: presenting uncleared down payments as a ' +
      '**visual worklist** makes it much easier to notice this topic\'s most common mistake ' +
      '(skipping the clearing step).',

    bestPractices:[
      'Put the Fiori "Manage Down Payments" app into the **monthly routine**; it\'s the most ' +
      'practical tool for tracking uncleared down payments.',
      'Verify the {{T074}} match **for every reconciliation account** during migration — ' +
      'production can have more accounts than the test environment.',
      'Clean up open down payments before migration; carried-forward balances can end up ' +
      'disconnected in the new system.',
      'Check the {{SKB1}} `MITKZ` (reconciliation account type) setting on the alternative accounts.',
      'If {{belge-bolme}} is active, test that down-payment items are split too and land ' +
      'correctly on the segment balance sheet.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'360,000 TRY paid twice: the clearing step was skipped',
    hikaye:
      '**Akdeniz Gıda Inc.** orders a new packaging line: 1,200,000 TRY, 30% upfront.\n\n' +
      'The down payment is paid, the machine arrives, the invoice is recorded, the remainder ' +
      'is paid. The process is thought to be finished.\n\n' +
      'Three months later, the vendor calls: *"You have a 360,000 TRY credit balance with ' +
      'us — should we refund it, or apply it to the next order?"*\n\n' +
      'Accounting is caught off guard: **nobody knew** an overpayment had been made. This ' +
      'scenario shows how special G/L used incorrectly turns into a real cash loss, and how ' +
      'it gets diagnosed.',
    veriler:[
      { k:'Company code', v:'1000 · TRY' },
      { k:'Vendor', v:'V-2001 · reconciliation account **320100**' },
      { k:'Order', v:'1,200,000 TRY + 20% VAT · 30% upfront' },
      { k:'Down payment', v:'360,000 TRY — 10.07.2027' },
      { k:'Invoice', v:'1,200,000 + 240,000 VAT = 1,440,000 TRY — 15.09.2027' },
      { k:'**Problem**', v:'Total paid **1,800,000 TRY** — 360,000 TRY too much' },
    ],

    adimlar:[
      { baslik:'The down payment was paid correctly', tcode:'F-48',
        aciklama:'The first step was actually done right — the problem isn\'t here.',
        girdi:[
          { alan:'Vendor', deger:'V-2001' },
          { alan:'Special G/L indicator', deger:'**A** ✓' },
          { alan:'Amount', deger:'360,000 TRY' },
        ],
        fis:{ baslik:'Document 1500002201 — down-payment payment', belgeTuru:'KZ', tarih:'10.07.2027',
          satirlar:[
            { hesap:'159', ad:'Down payments on orders made — V-2001', borc:360000, not:'Indicator **A**' },
            { hesap:'102', ad:'Banks', alacak:360000 },
          ], not:'A correct posting: account 159 was debited, sitting as a vendor item in ' +
                 '{{BSIK}}. {{F-54}} can find this item when the time comes.' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'`UMSKZ` = **A** · `HKONT` = 159000' },
          { tablo:'BSIK', ne:'A vendor open item — indicator A' },
        ],
        not:'**This step was correct.** The down payment is in the right place on the ' +
             'balance sheet and still tied to the vendor. The problem is in the steps that follow.' },

      { baslik:'The invoice was recorded — a normal posting', tcode:'MIRO',
        aciklama:'The machine arrived, the invoice was recorded.',
        girdi:[
          { alan:'Vendor', deger:'V-2001' },
          { alan:'Amount', deger:'1,200,000 + 240,000 VAT' },
          { alan:'Special G/L indicator', deger:'**None** ✓ (correct — the invoice is a normal posting)' },
        ],
        fis:{ baslik:'Document 5100004411 — vendor invoice', belgeTuru:'RE', tarih:'15.09.2027',
          satirlar:[
            { hesap:'253', ad:'Plant, machinery and equipment', borc:1200000 },
            { hesap:'191', ad:'Deductible VAT', borc:240000 },
            { hesap:'320', ad:'Trade payables — V-2001', alacak:1440000, not:'The **normal** reconciliation account' },
          ], not:'This is correct too. The invoice is a normal posting, no indicator is ' +
                 'entered.\n\n' +
                 '**But there are now two items on the balance sheet:**\n' +
                 '159 Down payment made: 360,000 TRY (asset)\n' +
                 '320 Trade payables: 1,440,000 TRY (liability)\n\n' +
                 'They need to be netted.' },
        not:'Both steps were done correctly. The problem is in the step that **wasn\'t taken**.' },

      { baslik:'**The clearing step was skipped** — the error is here', tcode:'F-54',
        aciklama:'{{F-54}} was never run. Nobody noticed.',
        girdi:[
          { alan:'Expected transaction', deger:'{{F-54}} — 320 debit 360,000 / 159 credit 360,000' },
          { alan:'What was done', deger:'**Nothing**' },
          { alan:'System warning', deger:'**None** — no error message appears' },
          { alan:'Balance-sheet status', deger:'159: 360,000 open · 320: 1,440,000 open' },
        ],
        not:'**This is the process\'s critical gap:** when {{F-54}} is skipped, the system ' +
             'gives no warning at all. The document is balanced, the trial balance ties out, ' +
             '{{FBL1N}} looks normal.\n\n' +
             'The vendor liability sits at 1,440,000 TRY — as if no down payment had ever been paid.' },

      { baslik:'The full amount was paid — a cash loss resulted', tcode:'F-53',
        aciklama:'When payment day came, the 1,440,000 TRY showing in {{FBL1N}} was paid.',
        girdi:[
          { alan:'Open item shown in {{FBL1N}}', deger:'1,440,000 TRY' },
          { alan:'Amount paid', deger:'**1,440,000 TRY**' },
          { alan:'Amount that should have been paid', deger:'1,440,000 − 360,000 = **1,080,000 TRY**' },
          { alan:'**Overpayment**', deger:'**360,000 TRY**' },
        ],
        fis:{ baslik:'Document 1500003876 — the remaining payment (faulty)', belgeTuru:'KZ', tarih:'30.09.2027',
          satirlar:[
            { hesap:'320', ad:'Trade payables — V-2001', borc:1440000, not:'**The full amount**' },
            { hesap:'102', ad:'Banks', alacak:1440000, not:'**360,000 TRY too much**' },
          ], not:'Total cash outflow: 360,000 + 1,440,000 = **1,800,000 TRY**\n' +
                 'Invoice amount: **1,440,000 TRY**\n' +
                 '**Difference: 360,000 TRY overpaid.**\n\n' +
                 'The down payment is still open in account 159 — the company is now **owed** ' +
                 'by the vendor.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'The 320 item closed; **the 159 item is still open**' },
          { tablo:'BSAK', ne:'The closed invoice and payment items' },
        ],
        not:'The person who made the payment paid the amount they saw in {{FBL1N}} and ' +
             '**made no mistake at all** — from their own point of view.\n\n' +
             'The problem is that, because the indicator filter in {{FBL1N}} was blank, the ' +
             'down payment **never showed up** in that list.' },

      { baslik:'Diagnosis — the open down payments are queried', tcode:'FBL1N',
        aciklama:'The investigation begins after the vendor\'s call.',
        girdi:[
          { alan:'First query', deger:'V-2001 · open items · indicator **blank**' },
          { alan:'Result', deger:'**No open items** — everything looks normal' },
          { alan:'Second query', deger:'V-2001 · open items · indicator **A**' },
          { alan:'**Result**', deger:'**360,000 TRY open down payment**' },
        ],
        not:'**The key point of the diagnosis:** in {{FBL1N}}, if the special G/L indicator ' +
             'field is left blank, down payments **aren\'t listed**.\n\n' +
             'The first query said "everything is fine." The second query uncovered the ' +
             'problem.\n\n' +
             'This behavior is the cause both of how the problem **arose** and of it being ' +
             'noticed **late**. The person who made the payment had looked with the same filter and hadn\'t seen the down payment either.' },

      { baslik:'Verification — account 159 is checked', tcode:'FBL3N',
        aciklama:'The scale of the problem and other occurrences are investigated.',
        girdi:[
          { alan:'Account', deger:'159000 Down payments on orders made' },
          { alan:'Balance', deger:'**2,140,000 TRY**' },
          { alan:'Number of open items', deger:'**7 down payments**' },
          { alan:'Ones with an invoice already in', deger:'**4 of them** — not cleared' },
        ],
        not:'The problem isn\'t confined to one vendor: **four down payments** haven\'t been ' +
             'cleared. Two of them were overpaid (590,000 TRY total), two haven\'t been paid ' +
             'yet so there\'s no cash loss but the balance sheet is inflated.\n\n' +
             'This isn\'t a single user\'s mistake, it\'s a **process gap**: the clearing step ' +
             'isn\'t on any checklist.' },

      { baslik:'Correction — retroactive clearing', tcode:'F-54',
        aciklama:'The clearing is now done; the overpayment turns into a vendor credit.',
        girdi:[
          { alan:'Vendor', deger:'V-2001' },
          { alan:'Invoice', deger:'5100004411' },
          { alan:'Down payment cleared', deger:'360,000 TRY' },
        ],
        fis:{ baslik:'Document 1700001042 — down-payment clearing', belgeTuru:'KA', tarih:'15.10.2027',
          satirlar:[
            { hesap:'320', ad:'Trade payables — V-2001', borc:360000, not:'Because the invoice was already paid, a **reverse balance** results' },
            { hesap:'159', ad:'Down payments on orders made', alacak:360000, not:'The down payment closed ✓' },
          ], not:'Account 159 was **zeroed out** ✓\n\n' +
                 'But account 320 now has a **360,000 TRY reverse balance**: the company ' +
                 'doesn\'t owe the vendor, it\'s **owed by** the vendor.\n\n' +
                 'This is the accounting correctly reflecting the real situation — and it\'s ' +
                 'the basis for the conversation with the vendor.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'The 159 item closed; an open item with a reverse balance on 320' },
        ],
        not:'Agreed with the vendor: the 360,000 TRY will be **applied to the next order**. ' +
             'The reverse balance will be closed by that order\'s invoice.' },

      { baslik:'Prevention — process and controls added', tcode:'FBL1N',
        aciklama:'Three permanent measures are taken so the same mistake doesn\'t repeat.',
        girdi:[
          { alan:'Measure 1 — a closing check', deger:'{{FBL1N}} → indicator **A** → open items ' +
                                                    'query added to the month-end checklist' },
          { alan:'Measure 2 — process', deger:'Whoever records an invoice can\'t close the ' +
                                          'transaction **without running {{F-54}}** if the vendor has an open down payment' },
          { alan:'Measure 3 — training', deger:'The payment team was walked through {{FBL1N}}\'s indicator-filter behavior' },
          { alan:'Measure 4 — a report', deger:'A "down payments with an invoice in but not cleared" variant was saved' },
        ],
        not:'The fourth measure is the most valuable: a variant that lists **invoices for ' +
             'vendors that have a down payment** shows the cases that need clearing ' +
             '**proactively**.\n\n' +
             'In S/4HANA, the Fiori app "Manage Down Payments" does the same job visually.' },
    ],

    sonuc:
      '**360,000 TRY was overpaid, and nobody noticed for three months.**\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. The {{F-54}} clearing step can be skipped silently.** The system gives no ' +
      'warning, the document is balanced, the trial balance ties out. But the balance sheet ' +
      'inflates on both sides, and the down payment can end up **paid a second time** when ' +
      'the remainder is paid — that\'s a genuine cash loss.\n\n' +
      '**2. If the indicator filter in {{FBL1N}} is left blank, down payments don\'t show ' +
      'up.** This behavior is the cause both of how the problem arose and of it being noticed ' +
      'late: the person who made the payment paid the amount they saw on the list and made no ' +
      'mistake from their own point of view. For diagnosis, the indicator field needs **A** ' +
      'or `*` entered.\n\n' +
      '**3. The down payment was paid correctly — the error was at the end of the chain.** ' +
      '{{F-48}} was run with indicator **A**, the posting was flawless. In special G/L, ' +
      '**a single correct step isn\'t enough**; the whole chain (request → payment → invoice ' +
      '→ **clearing**) has to be completed.\n\n' +
      '**4. The fix lives in the checklist, not in attentiveness.** Saying "don\'t forget to ' +
      'clear it" doesn\'t work. Adding the {{FBL1N}} indicator **A** query to the month-end ' +
      'close and saving an "invoiced but not cleared down payments" variant catches the ' +
      'mistake **systematically**. That\'s the preferred form of fix in consulting.',
  },

  },
});
