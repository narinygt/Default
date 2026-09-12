/* ==========================================================================
   content/fi-en/clearing.js — English body for "Clearing (Kapatma)"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'clearing',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      '{{kapatma}} (clearing) is matching offsetting open items and turning them into **cleared** items. ' +
      'The best-known case is an invoice meeting a payment, but the scope is much wider: in the {{gr-ir}} ' +
      'account a goods receipt matches an invoice, in the bank clearing account a payment matches a ' +
      'statement line, in an advance account an advance matches its offsetting entry.\n\n' +
      'Technically clearing does two things: it writes the **clearing document number** ({{BSEG}} `AUGBL`) ' +
      'and the **clearing date** (`AUGDT`) into the cleared items. This is the only criterion for whether ' +
      'an item is open or cleared — if `AUGBL` is blank the item is open.',

    neden:
      '**To know what hasn\'t been paid.** Without clearing, an account with 5,000 invoices would make it ' +
      'impossible to tell which ones were paid; only the total balance would be visible.\n\n' +
      '**To clean up transitional accounts.** Accounts like {{gr-ir}} and {{banka-ara-hesabi}} carry the ' +
      'gap between two events and **are expected to zero out**. Clearing is what performs that zeroing.\n\n' +
      '**For {{yaslandirma}}.** Aging analysis is only meaningful over open items.\n\n' +
      '**For reconciliation.** The sub-ledger total stays traceable against the {{mutabakat-hesabi}} balance thanks to clearing.',

    sirketOnemi:
      'Clearing is accounting\'s **quiet housekeeping job**: when it isn\'t done, no error message appears — ' +
      'the accounts simply get dirtier over time.\n\n' +
      'The consequences are heavy: the {{gr-ir}} balance climbs into the millions over the years and can\'t be ' +
      'explained at audit; the bank clearing account bloats and cash reconciliation breaks down; the aging ' +
      'report keeps showing paid invoices as "overdue."\n\n' +
      'From a consulting standpoint: clearing\'s **automatic operation** ({{F.13}}) depends on the account ' +
      'master\'s **sort key**. Knowing this link is the answer to the "F.13 isn\'t clearing anything" complaint.',

    gercekHayat:
      'At one company the {{gr-ir}} account balance climbed to 4.2 million TRY over 3 years. Nobody noticed ' +
      'because the postings were correct, the balance was never off, and no error message appeared.\n\n' +
      'The auditor asks: "what is this 4.2 million?" Analysis: 1.1 million is genuinely goods-received-but-' +
      'not-yet-invoiced items (normal), and 3.1 million is items that **could have matched but didn\'t**. ' +
      'The reason: the account\'s sort key was defined wrong, the assignment field ({{BSEG}} `ZUONR`) was ' +
      'staying blank, and {{F.13}} couldn\'t make the match.\n\n' +
      'A single master-data setting had created three years of cleanup debt.',

    muhasebeMantigi:
      'Clearing\'s accounting effect depends on **whether there is a difference**:\n\n' +
      '**No difference:** no account moves at all. A clearing document is created but its amount is zero; ' +
      'only `AUGBL` gets written to the items. This is clearing\'s most common case.\n\n' +
      '**A difference exists:** if the difference is within the {{tolerans-grubu}} limit, it\'s automatically ' +
      'posted to an account ({{iskonto}}, {{kur-farki}}, or a small-difference account). If it\'s outside the ' +
      'limit, **clearing is blocked** and the user either corrects the selection or uses partial/residual clearing.\n\n' +
      'The critical rule: **clearing doesn\'t change the balance** (except for a difference). An account\'s ' +
      'balance is the same before and after clearing; only the items\' open/cleared status changes.',

    kavramlar: ['acik-kalem', 'kapatma', 'acik-kalem-yonetimi', 'kismi-kapatma', 'kalan-kapatma',
                'tolerans-grubu', 'gr-ir', 'banka-ara-hesabi', 'yaslandirma', 'kur-farki'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Clearing happens through three separate paths, and their proportion shows how mature a setup is: ' +
      '**automatic** (with the payment, or via {{F.13}}), **manual** ({{F-03}}/{{F-32}}/{{F-44}}), and ' +
      '**never done at all** (which piles up and becomes a problem). In a healthy system the first path dominates.',

    roller:[
      { rol:'System (automatic)', gorev:'{{F110}} clears items **at the same time** as the payment, {{F-28}} with the collection, {{FEBAN}} with statement processing.' },
      { rol:'AP/AR accounting specialist', gorev:'Manually clears unmatched items ({{F-44}}, {{F-32}}); investigates differences.' },
      { rol:'General ledger specialist', gorev:'Cleans up clearing accounts ({{F-03}}), runs bulk clearing via {{F.13}}.' },
      { rol:'Accounting manager', gorev:'Reviews clearing-account balances at period end; approves the write-off of permanent differences.' },
      { rol:'FI consultant', gorev:'Designs the accounts\' {{acik-kalem-yonetimi}} and **sort key** settings, the {{OB74}} clearing rules, and the {{OBA3}}/{{OBA4}} tolerances.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Clearing\'s three paths and the period-end check',
      adimlar:[
        { ic:'📄', rol:'System', baslik:'An open item is born',
          aciklama:'An invoice, goods receipt, or payment is posted. On an {{acik-kalem-yonetimi}} account, ' +
                   'the item is written with `AUGBL` blank — meaning it is **open**.',
          cikti:'{{acik-kalem}}', ok:'its counterpart arrives' },
        { ic:'⚡', rol:'System', baslik:'Path 1 — Automatic clearing with payment',
          aciklama:'{{F110}}, {{F-28}}, and {{FEBAN}} clear the item **in the same transaction** as recording ' +
                   'the payment. The cleanest path; needs no extra work.',
          cikti:'Cleared item', ok:'unmatched ones remain' },
        { ic:'🤖', rol:'System', baslik:'Path 2 — Bulk automatic clearing ({{F.13}})',
          aciklama:'Matches items in clearing accounts ({{gr-ir}}, bank clearing account) based on the ' +
                   'assignment field. Rules are set by {{OB74}}.',
          cikti:'Bulk clearing documents', ok:'for what remains' },
        { ic:'✋', rol:'Accounting specialist', baslik:'Path 3 — Manual clearing',
          aciklama:'Manual matching with {{F-03}} (G/L), {{F-32}} (customer), {{F-44}} (vendor). ' +
                   'For cases the automatic path couldn\'t resolve.',
          cikti:'Clearing document', ok:'if a difference exists' },
        { ic:'⚖️', rol:'System', baslik:'Difference check',
          aciklama:'If the difference is within {{tolerans-grubu}} it\'s posted automatically; if outside it, clearing is **blocked**.',
          cikti:'A difference line or an error', ok:'period end' },
        { ic:'🔍', rol:'Accounting manager', baslik:'Period-end review',
          aciklama:'Clearing-account balances are examined. For {{gr-ir}} a {{F.19}} reclassification, ' +
                   'for permanent differences an {{MR11}} cleanup.',
          cikti:'A clean balance sheet', ok:'if an error is found' },
        { ic:'↩', rol:'Accounting specialist', baslik:'A wrong clearing is reversed ({{FBRA}})',
          aciklama:'The clearing is deleted, the items become open again. No correction posting is needed.',
          cikti:'Items open again' },
      ],
    },

    adimlar:[
      { rol:'System', eylem:'Clears simultaneously with the payment/collection', sistem:'{{F110}}, {{F-28}}, {{F-53}}, {{FEBAN}}' },
      { rol:'General ledger', eylem:'Clears the clearing accounts in bulk', sistem:'{{F.13}} — rules from {{OB74}}' },
      { rol:'Accounting specialist', eylem:'Clears a G/L account manually', sistem:'{{F-03}}' },
      { rol:'AR specialist', eylem:'Clears customer items', sistem:'{{F-32}}' },
      { rol:'AP specialist', eylem:'Clears vendor items', sistem:'{{F-44}}' },
      { rol:'Accounting specialist', eylem:'Posts and clears together', sistem:'{{FB05}}, {{F-04}}, {{F-30}}' },
      { rol:'Accounting specialist', eylem:'Reverses a wrong clearing', sistem:'{{FBRA}}' },
      { rol:'Accounting manager', eylem:'Period-end clearing-account analysis', sistem:'{{FBL3N}}, {{F.19}}, {{MR11}}' },
    ],

    veriAkisi:{
      nereden:'Open items: {{BSIS}} (G/L), {{BSIK}} (vendor), {{BSID}} (customer). The matching criterion is ' +
              'the assignment field ({{BSEG}} `ZUONR`), filled from the account\'s sort key.',
      nereye:'Cleared items move to {{BSAS}}/{{BSAK}}/{{BSAD}}; `AUGBL` and `AUGDT` are written to the items.',
      tetikleyen:'A payment, a collection, statement processing, or the period-end cleanup routine.',
      sonraki:'Clean clearing accounts, accurate {{yaslandirma}}, and a reliable balance sheet.',
    },

    notlar:[
      { tip:'tip', baslik:'Clearing should be a "result," not a "task"', metin:
        'In a mature setup, the vast majority of clearing happens **automatically at the time of payment/' +
        'collection**. If thousands of items need manual clearing at month-end, the problem isn\'t the ' +
        'clearing step — it\'s the master data and process design: sort keys are wrong, the assignment ' +
        'field is blank, {{OB74}} rules are missing.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Clearing\'s accounting effect is most of the time **nothing** — and that\'s the point most often ' +
      'misunderstood. Below: first a clearing with no difference, then a within-tolerance difference, then ' +
      'the partial/residual split, then an FX-clearing example.',

    etkilenenHesaplar:[
      { hesap:'The cleared account itself', tur:'Unchanged', neden:'**The balance doesn\'t change.** Clearing only changes the items\' status; the debit and credit totals stay the same.' },
      { hesap:'{{iskonto}} account (602 / 653)', tur:'Income statement', neden:'If the payment clearing falls within the cash-discount period, the difference is posted here.' },
      { hesap:'FX difference accounts (646 / 656)', tur:'Income statement', neden:'If the exchange rate at posting differs from the rate at clearing on an FX item, a realized {{kur-farki}} arises.' },
      { hesap:'Small-difference account', tur:'Income statement', neden:'Rounding differences within tolerance are posted here automatically (defined via {{OBA3}}/{{OBA4}}).' },
      { hesap:'{{gr-ir}} account', tur:'Balance sheet — clearing', neden:'Closes once the goods-receipt and invoice items match; its balance approaches zero.' },
      { hesap:'{{banka-ara-hesabi}}', tur:'Balance sheet — clearing', neden:'Closes once the payment posting matches the statement line.' },
    ],

    fisler:[
      { baslik:'Example 1 — Clearing with no difference · GR/IR match ({{F-03}})',
        belgeTuru:'AB', tarih:'30.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR — goods receipt item (cleared)', borc:0, alacak:0, not:'Only `AUGBL` was written' },
        ],
        not:'**The clearing document\'s amount is zero.** No account moves. The only thing that happened is ' +
             'writing the same `AUGBL` number into the two items. Account 159\'s balance is the same before and after clearing.' },

      { baslik:'Example 2 — Within-tolerance difference · 12 TRY rounding',
        belgeTuru:'AB', tarih:'30.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — invoice item', borc:45012, not:'Cleared' },
          { hesap:'102', ad:'Bank — payment item', alacak:45000, not:'Cleared' },
          { hesap:'659', ad:'Other operating expense — small difference', borc:0, alacak:12, not:'Within tolerance, automatic' },
        ],
        not:'Because the 12 TRY difference was within the {{tolerans-grubu}} limit, the system **automatically** ' +
             'posted it to the small-difference account and allowed the clearing. Had the limit been 10 TRY, clearing would have been blocked.' },

      { baslik:'Example 3 — Partial clearing · 40,000 of 100,000 paid',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — partial payment item', borc:40000, not:'A **new** open item' },
          { hesap:'102', ad:'Bank clearing account', alacak:40000 },
        ],
        not:'In {{kismi-kapatma}} **no item is cleared**. The original 100,000 TRY item stays open, and the ' +
             'payment becomes a separate open item of −40,000. Both have `AUGBL` blank, meaning open. ' +
             'Once the remaining 60,000 is paid, all three are cleared together. **The original due date is preserved.**' },

      { baslik:'Example 4 — Residual clearing · same scenario',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — original item (cleared)', borc:100000, not:'`AUGBL` written' },
          { hesap:'102', ad:'Bank clearing account', alacak:40000 },
          { hesap:'320', ad:'Trade payables — **new residual item**', alacak:60000, not:'Due date starts **today**' },
        ],
        not:'In {{kalan-kapatma}} the original item closes and a **new** item of 60,000 TRY is born. The new ' +
             'item\'s baseline date is today — a debt overdue by 90 days suddenly looks "not yet due." ' +
             '{{yaslandirma}} breaks because of this.' },

      { baslik:'Example 5 — Foreign-currency clearing · an FX difference arises',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'EUR',
        satirlar:[
          { hesap:'320', ad:'Trade payables — 10,000 EUR @ 35.00 (cleared)', borc:350000, not:'Invoice rate' },
          { hesap:'102', ad:'Bank — 10,000 EUR @ 36.20', alacak:362000, not:'Payment-day rate' },
          { hesap:'656', ad:'FX loss', borc:12000, not:'Realized {{kur-farki}}' },
        ],
        not:'**No difference on the FX side:** 10,000 EUR debit, 10,000 EUR payment — an exact match. ' +
             'The difference is in local currency and becomes **realized** at the moment of clearing. This is ' +
             'what distinguishes it from a period-end valuation ({{F.05}}): there the difference is unrealized.' },
    ],

    tHesaplar:[
      { hesap:'GR/IR account', kod:'159 (open item managed)',
        borc:[{ ad:'Invoice entry (MIRO)', tutar:100000 }],
        alacak:[{ ad:'Goods receipt (MIGO)', tutar:100000 }],
        not:'Balance zero after clearing — but it was already zero' },
      { hesap:'Bank clearing account', kod:'102 (transitional)',
        borc:[{ ad:'Statement line', tutar:139200 }],
        alacak:[{ ad:'F110 payment', tutar:139200 }],
        not:'Clearing changes the item\'s status, not the balance' },
      { hesap:'Trade payables', kod:'320',
        borc:[{ ad:'Partial payment', tutar:40000 }],
        alacak:[{ ad:'Invoice', tutar:100000 }],
        not:'In a partial clearing, both items stay **open**' },
      { hesap:'FX loss', kod:'656 (expense)',
        borc:[{ ad:'FX clearing difference', tutar:12000 }],
        alacak:[],
        not:'Clearing\'s only genuine accounting effect' },
    ],

    notlar:[
      { tip:'warn', baslik:'Clearing doesn\'t change the balance', metin:
        'This is the point most often misunderstood. If an account\'s balance is 340,000 TRY, it stays ' +
        '340,000 TRY after clearing too. The only thing that changes is the items\' **open/cleared** status.\n\n' +
        'The sentence "let\'s zero the GR/IR balance with clearing" is wrong: matching items were already ' +
        'offsetting each other. If the balance remains, there are unmatched items — and the fix isn\'t to ' +
        'clear them, it\'s to **find the reason**.' },
      { tip:'tip', baslik:'When does the difference account kick in?', metin:
        'Only when the selected items\' total isn\'t zero. If the difference is within {{tolerans-grubu}}, ' +
        'it\'s automatically posted to an account: to the discount account if it\'s within the discount period, ' +
        'to the FX difference account if it\'s a currency difference, otherwise to the small-difference account. ' +
        'Outside tolerance, clearing can\'t be done.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Clearing varies along three axes: **how it\'s triggered** (automatic/manual), **whether it\'s full or ' +
      'partial**, and **which account type it applies to**.',

    liste:[
      { ad:'Clearing with Payment',
        aciklama:'The open item is cleared **in the same transaction** as the payment or collection is ' +
                 'posted. No separate clearing document is created; the payment document both posts and clears.',
        neZaman:'In the normal payment and collection flow — most clearing should look like this.',
        ornek:'An {{F110}} payment run clears 249 items along with the payment documents.',
        tcodes:['F110','F-28','F-53','FEBAN'] },

      { ad:'Automatic Clearing — F.13',
        aciklama:'Matches open items in bulk based on defined rules. The matching criterion is the fields ' +
                 'defined in {{OB74}} (up to 5) — the most common one is the **assignment (`ZUONR`)** field.',
        neZaman:'In the routine month-end cleanup of clearing accounts ({{gr-ir}}, bank clearing account).',
        ornek:'A month-end {{F.13}} run automatically matches 1,240 GR/IR items.',
        tcodes:['F.13','OB74'] },

      { ad:'Manual Account Clearing',
        aciklama:'The user selects and matches items by hand. Produces no accounting posting (if there\'s no difference).',
        neZaman:'When the automatic path can\'t resolve it: assignment fields don\'t match, or an invoice was ' +
                'covered by multiple payments.',
        ornek:'6 items on the GR/IR account are manually matched with {{F-03}}.',
        tcodes:['F-03','F-32','F-44'] },

      { ad:'Post with Clearing — FB05',
        aciklama:'Clears open items at the same time a new document is posted. Posting and clearing merge into one transaction.',
        neZaman:'In item transfers, reclassifications, or posting directly from a bank advice.',
        tcodes:['FB05','F-04','F-30'] },

      { ad:'Full Clearing',
        aciklama:'The selected items sum to zero; all of them close and move to the cleared-item table.',
        neZaman:'When amounts match exactly — the normal case.',
        ornek:'A 120,000 TRY invoice, a 120,000 TRY payment → the item moves to {{BSAK}}.' },

      { ad:'Partial Clearing',
        aciklama:'**No item closes.** The original item stays open, the payment becomes a separate open item. ' +
                 'Both carry `AUGBL` blank.',
        neZaman:'When part of the debt is paid and the **original due date needs to be preserved**. The ' +
                'default choice whenever aging accuracy matters.',
        ornek:'40,000 TRY of a 100,000 TRY debt is paid → two open items: +100,000 and −40,000.',
        tcodes:['F-53','F-28','FB05'] },

      { ad:'Residual Clearing',
        aciklama:'The original item **is cleared**, and a **new item** is created for the remaining amount. ' +
                 'The new item\'s baseline date is today.',
        neZaman:'When the difference is permanent and has been tied to a new payment plan. ' +
                '**Chosen carefully because it resets the due date.**',
        ornek:'100,000 was cleared, a new 60,000 TRY item was born — due from today.',
        tcodes:['F-53','F-28','FB05'] },

      { ad:'Reset Clearing — FBRA',
        aciklama:'Cancels a clearing that was made; the items become **open** again and move from ' +
                 '{{BSAK}}/{{BSAD}} back to {{BSIK}}/{{BSID}}.',
        neZaman:'When the wrong items were matched. **No reversal posting is needed** — this distinction matters.',
        ornek:'A payment applied to the wrong invoice is opened up with {{FBRA}} and cleared again against the correct invoice.',
        tcodes:['FBRA'] },
    ],

    karsilastirmaBasliklar:['Partial Clearing', 'Residual Clearing'],
    karsilastirma:[
      ['Original item', '**Stays open**', '**Closes** (`AUGBL` written)'],
      ['New item', 'The payment becomes a separate open item', 'A new item is created for the remaining amount'],
      ['Due date / baseline date', '**Preserved** — original due date applies', '**Reset** — starts from today'],
      ['{{yaslandirma}} effect', 'Stays correct', '**Breaks** — the delay is erased'],
      ['{{ihtar}} level', 'Preserved', 'Reset'],
      ['Open item count', 'Increases (2 items)', 'Stays the same (1 new item)'],
      ['When it\'s preferred', 'When due-date tracking matters — **the default**', 'When the difference is permanent, or a new payment plan exists'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'F-03', ad:'G/L account clearing',
        amac:'Manually matches items on a general ledger account with {{acik-kalem-yonetimi}} active.',
        neZaman:'For cleaning up {{gr-ir}} and {{banka-ara-hesabi}}; for items {{F.13}} couldn\'t clear.',
        adimlar:[
          { baslik:'Enter the account, company code, and clearing date',
            aciklama:'The clearing date is the clearing document\'s posting date. The period must be open.' },
          { baslik:'*Process open items* → items are listed',
            aciklama:'You can narrow the list by entering additional selection criteria (assignment, amount, document number).' },
          { baslik:'Select the items to clear',
            aciklama:'Items come in with **all selected** initially; using *Deselect* and then choosing what ' +
                     'you want is generally faster.' },
          { baslik:'Confirm the "Not assigned" field is zero',
            aciklama:'This field at the bottom of the screen **must be zero**. If not, clearing can\'t be done.' },
          { baslik:'Save',
            aciklama:'A clearing document is produced and `AUGBL` is written to the items. If there\'s no difference, the document\'s amount is zero.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Account 159000 · Company code 1000 · Clearing date 30.09.2026' },
          { ekran:'Additional selection', islem:'Assignment field = 4500002345 (purchase order number)' },
          { ekran:'Item list', islem:'2 items: +100,000 (invoice) and −100,000 (goods receipt)' },
          { ekran:'Validation', islem:'"Not assigned" = 0.00 → Save' },
        ],
        alanlar:{
          zorunlu:['G/L account','Company code','Clearing date','Item selection'],
          opsiyonel:['Additional selection criteria','Text','Document type'] },
        hatalar:[
          { mesaj:'The difference is too large for clearing', sebep:'The selected items don\'t sum to zero and the gap is outside {{tolerans-grubu}}.', cozum:'First check the selection — usually the wrong item was selected. If the difference is genuine, enter a difference line or review the {{OBA4}} tolerance.' },
          { mesaj:'Account ... is not managed on an open item basis', sebep:'{{acik-kalem-yonetimi}} is off on the account.', cozum:'Clearing can\'t be done on this account. Check whether the account master was set up correctly ({{FS00}} → `XOPVW`).' },
          { mesaj:'No open items found', sebep:'The criteria are too narrow, or the items are already cleared.', cozum:'Remove the additional selection criteria; check open items with {{FBL3N}}.' },
          { mesaj:'Posting period ... is not open', sebep:'The period the clearing date falls into is closed.', cozum:'Open it with {{OB52}}, or move the clearing date into an open period.' },
        ],
        ipucu:'In the item list, **sort by the assignment (`ZUONR`) field**. Items that offset each other land ' +
              'next to each other and the selection takes seconds. This single habit turns hours of clearing-account cleanup into minutes.',
        ilgili:['F.13','FBRA','FBL3N','FB05'] },

      { kod:'F.13', ad:'Automatic clearing (bulk)',
        amac:'Matches open items in bulk and automatically according to defined rules.',
        neZaman:'In the month-end routine; for regular cleanup of clearing accounts.',
        adimlar:[
          { baslik:'Enter the company code, fiscal year, and account range' },
          { baslik:'Select the account type: G/L, vendor, customer',
            aciklama:'Each type is checked separately. Don\'t check the others if only G/L cleanup is intended.' },
          { baslik:'**Run in test mode first**',
            aciklama:'Shows which items would be cleared, without posting. This step should not be skipped.' },
          { baslik:'Review the result',
            aciklama:'Items that would be cleared and items that couldn\'t be are listed separately, with the reason given for the latter.' },
          { baslik:'Run in production mode',
            aciklama:'Clearing documents are produced in bulk.' },
        ],
        ekranAkisi:[
          { ekran:'Selection', islem:'Company code 1000 · Account 159000–159999 · Fiscal year 2026 · **Test mode ✓**' },
          { ekran:'Test result', islem:'1,240 items clearable / 86 items didn\'t match' },
          { ekran:'Production run', islem:'Test box removed → 1,240 items cleared' },
        ],
        alanlar:{
          zorunlu:['Company code','Fiscal year','Account range','Account type selection'],
          opsiyonel:['Test mode','Include special G/L transactions','Minimum item count'] },
        hatalar:[
          { mesaj:'No items were cleared (no error message)', sebep:'The assignment (`ZUONR`) fields don\'t match — usually the account\'s **sort key** is wrong or blank.', cozum:'{{FS00}} → check the account\'s sort key (`ZUAWA`). Check whether the rule is defined in {{OB74}}. **The problem isn\'t in F.13, it\'s in the master data.**' },
          { mesaj:'Clearing rule not defined for account type S', sebep:'No rule exists in {{OB74}} for that account type/range.', cozum:'Define the matching criteria with {{OB74}} (up to 5 fields).' },
        ],
        ipucu:'{{F.13}} **doesn\'t fix a retroactive assignment field**. Correcting the sort key afterward ' +
              'only fills it correctly for new items; old items must be cleared by hand ({{F-03}}) or have ' +
              'their assignment field bulk-updated.',
        ilgili:['F-03','OB74','FBRA','FS00'] },

      { kod:'F-44', ad:'Vendor clearing',
        amac:'Matches vendor items without posting a payment.',
        neZaman:'When offsetting an invoice against a credit memo; when a payment was posted separately and needs to be matched to the invoice.',
        adimlar:[
          { baslik:'Enter the vendor, company code, and clearing date' },
          { baslik:'Check the special G/L box if it\'s also needed',
            aciklama:'{{avans}} items **don\'t come into** the normal selection; the box must be checked.' },
          { baslik:'Process open items → select → confirm the net amount is zero → save' },
        ],
        hatalar:[
          { mesaj:'No open items found', sebep:'Advance items aren\'t included in the selection.', cozum:'Check the "Special G/L transactions" box.' },
        ],
        ipucu:'Advance offsetting uses {{F-54}}; {{F-44}} is for general-purpose matching. Mixing the two up ' +
              'leads to the advance account being cleared incorrectly.',
        ilgili:['F-32','F-03','F-54','FBRA'] },

      { kod:'F-32', ad:'Customer clearing',
        amac:'Matches customer items without posting a collection.',
        neZaman:'When clearing an invoice against a credit memo; when matching a collection recorded separately from the bank statement to an invoice.',
        adimlar:[
          { baslik:'Enter the customer, company code, and clearing date' },
          { baslik:'Process open items → select → zero it out → save' },
        ],
        ipucu:'If the customer didn\'t specify which invoice they were paying, start with the **oldest**. ' +
              'Random matching breaks the {{yaslandirma}} report.',
        ilgili:['F-44','F-28','FBRA'] },

      { kod:'FBRA', ad:'Reset clearing',
        amac:'Cancels a clearing that was made; the items become open again.',
        neZaman:'When the wrong items were matched. **The only correct way to fix a clearing.**',
        adimlar:[
          { baslik:'Enter the clearing document number, company code, and fiscal year',
            aciklama:'You get the clearing document number from the item\'s `AUGBL` field or from the {{FBL1N}}/{{FBL3N}} report.' },
          { baslik:'Choose one of two options',
            aciklama:'**Only reset:** the clearing is deleted, the payment document stays — this is usually what\'s wanted. ' +
                     '**Reset and reverse:** the clearing is deleted *and* the payment document is also reversed.' },
          { baslik:'Confirm',
            aciklama:'The items move from {{BSAK}}/{{BSAD}} back to {{BSIK}}/{{BSID}}; the `AUGBL` field is cleared.' },
        ],
        alanlar:{
          zorunlu:['Clearing document number','Company code','Fiscal year'],
          opsiyonel:['Reversal reason (if reversing)'] },
        hatalar:[
          { mesaj:'Document ... is not a clearing document', sebep:'The number entered isn\'t a clearing document.', cozum:'Use the number from the item\'s `AUGBL` field — not the document number.' },
          { mesaj:'Clearing cannot be reset — document reversed', sebep:'The document has already been reversed.', cozum:'The clearing is already resolved; check the items with {{FBL1N}}.' },
        ],
        ipucu:'**{{FBRA}} shouldn\'t be confused with {{FB08}}.** {{FB08}} reverses a *document* (produces a ' +
              'new reversal document). {{FBRA}} resets a *clearing* (produces no new document, just undoes the ' +
              'match). FBRA is the right tool for a wrong clearing; using FB08 creates needless document clutter.',
        ilgili:['F-03','F-32','F-44','FB08'] },

      { kod:'FB05', ad:'Post with clearing',
        amac:'Clears open items at the same time a new document is posted.',
        neZaman:'In item transfers, reclassifications, or posting directly from a bank advice.',
        adimlar:[
          { baslik:'Enter the document header and the first line' },
          { baslik:'Choose the transaction type: "Clear open items"' },
          { baslik:'Select the account and the items to clear' },
          { baslik:'Use the partial/residual tabs if needed' },
          { baslik:'Save once the balance is zero' },
        ],
        ipucu:'{{FB05}} is flexible but complex. For simple payment clearings, {{F-53}}/{{F-28}} are faster; ' +
              'for pure matching, {{F-44}}/{{F-32}}. Use FB05 only when posting and clearing genuinely need to happen together.',
        ilgili:['F-04','F-30','F-53','F-28'] },

      { kod:'OB74', ad:'Define automatic clearing rules',
        amac:'Decides which fields {{F.13}} will match on.',
        neZaman:'During setup, and for the "F.13 isn\'t clearing anything" problem.',
        adimlar:[
          { baslik:'Enter the company code, account type, and account range' },
          { baslik:'Choose up to 5 matching criteria',
            aciklama:'The most common: **ZUONR** (assignment). Others: `XBLNR` (reference), `SGTXT` (text), ' +
                     '`EBELN` (purchase order), `VBELN` (sales document).' },
        ],
        ipucu:'The criterion is chosen based on the account\'s purpose: for {{gr-ir}}, purchase order number ' +
              'or assignment; for the bank clearing account, reference or amount. The wrong criterion makes ' +
              'clearing never work at all.',
        ilgili:['F.13','FS00','OBA3'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Clearing\'s table footprint is remarkably simple: **two fields** in {{BSEG}} (`AUGBL`, `AUGDT`) and ' +
      'the item moving from the **open index to the cleared index**. That\'s the whole of clearing\'s logic.',

    liste:[
      { ad:'BSEG', baslik:'Document line items — where clearing is recorded',
        tutar:'The item\'s account, amount, and **clearing status**. Clearing changes only two fields.',
        olusturan:'Every transaction that produces an FI document',
        guncelleyen:'Clearing transactions fill the `AUGBL`/`AUGDT` fields; {{FBRA}} clears them',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'`AUGBL` points to the clearing document; items carrying the same `AUGBL` value have cleared each other.',
        s4:'Still written; reporting goes through {{ACDOCA}}.',
        alanlar:[
          { ad:'AUGBL', aciklama:'**Clearing document number. If blank, the item is OPEN.** The sole criterion for clearing.' },
          { ad:'AUGDT', aciklama:'Clearing date' },
          { ad:'ZUONR', aciklama:'**Assignment field** — {{F.13}} matches based on this. Filled automatically from the sort key.' },
          { ad:'ZFBDT', aciklama:'Baseline date — set to **today** on the new item in a residual clearing' },
        ] },

      { ad:'BSIS', baslik:'G/L open items',
        tutar:'Uncleared items of {{acik-kalem-yonetimi}}-active G/L accounts.',
        olusturan:'A posting to an open-item-managed account',
        guncelleyen:'The item is removed from here and moved to {{BSAS}} once cleared',
        anahtar:'BUKRS + HKONT + AUGDT + AUGBL + ZUONR + GJAHR + BELNR + BUZEI',
        iliskiler:'A fast-access index of {{BSEG}}; {{FBL3N}}\'s open-item option reads from here.',
        s4:'**Removed** — produced from {{ACDOCA}} as a {{uyumluluk-view}}.' },

      { ad:'BSAS', baslik:'G/L cleared items',
        tutar:'Cleared G/L items.',
        olusturan:'A {{kapatma}} transaction',
        guncelleyen:'The item returns to {{BSIS}} if reset with {{FBRA}}',
        s4:'Turned into a {{uyumluluk-view}}.' },

      { ad:'BSIK', baslik:'Vendor open items',
        tutar:'Unpaid vendor items.',
        olusturan:'Postings to a vendor',
        guncelleyen:'Moves to {{BSAK}} once cleared',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'ZUONR', aciklama:'Automatic clearing\'s matching field' },
        ] },

      { ad:'BSAK', baslik:'Vendor cleared items',
        tutar:'Paid vendor items; the `AUGBL` field shows which document cleared them.',
        olusturan:'{{F110}}, {{F-53}}, {{F-44}}',
        guncelleyen:'Returns to {{BSIK}} if reset with {{FBRA}}',
        s4:'{{uyumluluk-view}}.' },

      { ad:'BSID', baslik:'Customer open items',
        tutar:'Uncollected customer items.',
        olusturan:'Postings to a customer',
        guncelleyen:'Moves to {{BSAD}} once cleared',
        s4:'{{uyumluluk-view}}.' },

      { ad:'BSAD', baslik:'Customer cleared items',
        tutar:'Collected customer items.',
        olusturan:'{{F-28}}, {{F-32}}',
        guncelleyen:'Returns to {{BSID}} if reset with {{FBRA}}',
        s4:'{{uyumluluk-view}}.' },

      { ad:'SKB1', baslik:'G/L account — the settings that make clearing possible',
        tutar:'The account\'s {{acik-kalem-yonetimi}} and **sort key** settings. Whether clearing will work ' +
              'at all is decided here.',
        olusturan:'{{FS00}}',
        guncelleyen:'{{FS00}}',
        anahtar:'BUKRS + SAKNR',
        s4:'Unchanged.',
        alanlar:[
          { ad:'XOPVW', aciklama:'**Open item management.** If not X, clearing **can\'t be done** on this account.' },
          { ad:'ZUAWA', aciklama:'**Sort key** — fills the `ZUONR` field automatically. {{F.13}}\'s operation depends on it.' },
          { ad:'XKRES', aciklama:'Line item display — if off, {{FBL3N}} shows no items' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Clearing\'s table footprint',
      varliklar:[
        { ad:'SKB1', rol:'Master data', aciklama:'The settings that make clearing possible',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'XOPVW' }, { ad:'ZUAWA' }] },
        { ad:'BSEG', rol:'Line item', hub:true, aciklama:'Clearing is recorded here',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BUZEI', tip:'pk' }, { ad:'AUGBL' }, { ad:'AUGDT' }, { ad:'ZUONR' }] },
        { ad:'BSIS', rol:'Index — open', aciklama:'G/L open items',
          alanlar:[{ ad:'HKONT', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZUONR' }] },
        { ad:'BSAS', rol:'Index — cleared', aciklama:'G/L cleared items',
          alanlar:[{ ad:'HKONT', tip:'fk' }, { ad:'AUGBL' }, { ad:'AUGDT' }] },
        { ad:'BSIK', rol:'Index — open', aciklama:'Vendor open',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }] },
        { ad:'BSAK', rol:'Index — cleared', aciklama:'Vendor cleared',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'BKPF', rol:'Document', aciklama:'Clearing document',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
      ],
      iliskiler:[
        { from:'SKB1', to:'BSEG', alanlar:'SAKNR → HKONT', not:'XOPVW and ZUAWA decide clearing' },
        { from:'BSEG', to:'BSIS', alanlar:'BELNR + BUZEI', not:'in the open index while AUGBL is blank' },
        { from:'BSIS', to:'BSAS', alanlar:'after clearing', not:'the item moves over' },
        { from:'BSIK', to:'BSAK', alanlar:'after clearing', not:'the vendor item moves over' },
        { from:'BSEG', to:'BKPF', alanlar:'AUGBL → BELNR', not:'link to the clearing document' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Every clearing screen shares the same skeleton: **item list + selection + the "Not assigned" ' +
      'indicator**. Learning to read that indicator means learning every clearing transaction.',

    ekranlar:[
      { ad:'The clearing entry screen ({{F-03}} / {{F-32}} / {{F-44}})',
        aciklama:'Decides which account is cleared, on which date.',
        alanlar:[
          { ad:'Account / Vendor / Customer', zorunlu:true, aciklama:'The account or business partner to clear.' },
          { ad:'Company code', zorunlu:true, aciklama:'Clearing happens within a company code.' },
          { ad:'Clearing date', zorunlu:true, aciklama:'The clearing document\'s posting date. **The period must be open.**' },
          { ad:'Special G/L transactions box', zorunlu:false, aciklama:'Includes {{avans}} items in the list. If unchecked, those items **don\'t appear at all**.' },
          { ad:'Additional selection criteria', zorunlu:false, aciklama:'Narrows the list by assignment, amount, document number, reference.' },
        ],
        ipucu:'Don\'t open the list without an additional selection criterion on high-volume accounts — ' +
              'thousands of rows come back. Enter the purchase order number in the assignment field to drill straight to the relevant items.' },

      { ad:'The open item selection screen',
        aciklama:'The screen where clearing actually happens. The most critical indicator is the **"Not assigned"** field at the bottom.',
        alanlar:[
          { ad:'Item list', zorunlu:true, aciklama:'Items come in **all selected**. Using *Deselect* to clear them and then choosing what you want is safer.' },
          { ad:'The "Not assigned" indicator', zorunlu:true, aciklama:'**Must be zero.** If not, clearing can\'t be done — the selected items aren\'t balanced.' },
          { ad:'The "Cleared" indicator', zorunlu:false, aciklama:'The net total of the selected items.' },
          { ad:'Partial payment tab', zorunlu:false, aciklama:'The original item **stays open**, the due date is preserved.' },
          { ad:'Residual item tab', zorunlu:false, aciklama:'The original **closes**, a new item is produced, the due date is reset.' },
        ],
        ipucu:'**Sort the layout by the assignment (`ZUONR`) field and take a subtotal.** Items that offset ' +
              'each other line up next to each other; selection becomes both faster and less error-prone.' },

      { ad:'{{FBRA}} — the reset-clearing screen',
        aciklama:'Where a wrong clearing gets fixed. The distinction between the two options is critical.',
        alanlar:[
          { ad:'Clearing document number', zorunlu:true, aciklama:'The number from the item\'s `AUGBL` field. Not to be confused with the document number.' },
          { ad:'"Only reset"', zorunlu:false, aciklama:'The clearing is deleted, the payment document **remains**. Usually what\'s wanted.' },
          { ad:'"Reset and reverse"', zorunlu:false, aciklama:'The clearing is deleted **and** the payment document is also reversed. For when the payment needs to be fully canceled.' },
        ],
        ipucu:'If a correct payment was applied to the wrong invoice, choose **only reset**; the payment ' +
              'stays, the items open up, and they\'re cleared again against the correct invoice.' },
    ],

    zorunlu:['Account / business partner','Company code','Clearing date','Item selection ("Not assigned" = 0)'],
    opsiyonel:['Additional selection criteria','Special G/L transactions','Text','Document type','Partial/residual tab'],

    hatalar:[
      { mesaj:'The difference is too large for clearing', sebep:'The selected items\' net amount isn\'t zero and the gap is outside the {{tolerans-grubu}} limit.', cozum:'First check the selection — 90% of the time the wrong item was selected. If the difference is genuine: use partial/residual clearing, enter a difference line, or review the {{OBA3}}/{{OBA4}} tolerance.' },
      { mesaj:'Account ... is not managed on an open item basis', sebep:'{{SKB1}} `XOPVW` is blank.', cozum:'Clearing can\'t be done on this account. If it\'s a clearing account, the master data was set up wrong; fixing it requires zeroing the balance.' },
      { mesaj:'No open items found', sebep:'Items are already cleared, the criteria are too narrow, or advance items aren\'t included in the selection.', cozum:'Check with {{FBL3N}}/{{FBL1N}}; check the "Special G/L transactions" box.' },
      { mesaj:'Posting period ... is not open', sebep:'The period for the clearing date is closed.', cozum:'Open it with {{OB52}} or change the clearing date.' },
      { mesaj:'Document ... is not a clearing document (FBRA)', sebep:'A document number was entered instead of a clearing document number.', cozum:'Use the number from the item\'s `AUGBL` field.' },
      { mesaj:'{{F.13}} cleared no items (no error)', sebep:'The assignment fields don\'t match — the account\'s **sort key** is wrong, or an {{OB74}} rule is missing.', cozum:'{{FS00}} → check the `ZUAWA` sort key; define the rule in {{OB74}}. **The problem isn\'t in F.13, it\'s in the master data.**' },
      { mesaj:'Clearing not possible — items in different currencies', sebep:'An attempt to match items in different currencies.', cozum:'Select items in the same currency; if an FX difference is needed, the FX difference account kicks in automatically.' },
    ],

    ipuclari:[
      'In the item list, **sort by the assignment field** — the single biggest accelerator for clearing-account cleanup.',
      'Items come in all selected; using *Deselect* and then choosing deliberately prevents a wrong clearing.',
      'Use **{{FBRA}}** for a wrong clearing, not {{FB08}}. FB08 reverses the document and creates needless clutter.',
      'Always run {{F.13}} **in test mode first** and review the result.',
      'When opening a clearing account, be sure to set three things: {{acik-kalem-yonetimi}} **on**, the sort ' +
      'key **correct**, line item display **on**. Without all three, the account gets dirtier over the years.',
      'Review the open-item list of {{gr-ir}} and bank clearing accounts once at month-end. Five minutes of ' +
      'this check prevents a cleanup that would otherwise take days at year-end.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BSEG', ne:'`AUGBL` (clearing document) and `AUGDT` (clearing date) are written to the cleared items' },
      { tablo:'BKPF', ne:'The clearing document header — its amount is zero if there\'s no difference' },
      { tablo:'BSIS', ne:'Cleared G/L items are **removed**' },
      { tablo:'BSAS', ne:'Cleared G/L items are added' },
      { tablo:'BSIK', ne:'Cleared vendor items are removed' },
      { tablo:'BSAK', ne:'Cleared vendor items are added' },
      { tablo:'BSID', ne:'Cleared customer items are removed' },
      { tablo:'BSAD', ne:'Cleared customer items are added' },
      { tablo:'ACDOCA', ne:'In S/4HANA the clearing information is held here; index tables are produced as views' },
    ],

    commit:
      'Clearing is written within a single LUW: the clearing document + the `AUGBL` updates + the index moves ' +
      'are atomic. In an {{F.13}} bulk run, **each clearing is its own LUW** — which is why, of 1,240 items, ' +
      '1,200 might clear while 40 fail. The result list shows which ones couldn\'t be cleared.',

    belgeNo:
      'A clearing document is a normal FI document and gets its number from its document type\'s range. ' +
      'It usually uses type **AB** (general document). With clearing-with-payment, no separate clearing ' +
      'document is created at all — the payment document itself is the clearing document, and its own number is written into `AUGBL`.',

    postingLogic:
      'Clearing\'s decision chain:\n\n' +
      '**1.** Is the account {{acik-kalem-yonetimi}}-managed? If not, clearing isn\'t possible.\n' +
      '**2.** The net amount of the selected items is calculated.\n' +
      '**3.** If the net amount is zero → a clearing document is produced, `AUGBL` is written, **no account moves**.\n' +
      '**4.** If the net amount isn\'t zero → the difference is compared against {{tolerans-grubu}}.\n' +
      '**5.** If within tolerance → the difference is posted automatically to an account (discount / FX difference / small difference) and clearing proceeds.\n' +
      '**6.** If outside tolerance → clearing is **blocked**; the user must choose partial/residual or correct the selection.',

    belgeTuru:
      'The clearing document type is defined in {{OBA7}} and is usually **AB**. Payment clearings use the ' +
      'payment document type (**KZ** vendor, **DZ** customer). The document type decides the clearing document\'s number range.',

    numberRange:
      'Clearing documents get their number from their own document type\'s range. No separate number-range ' +
      'management is needed, but the relevant types\' ranges must be open at year-start.',

    accountDetermination:
      'Difference accounts are determined automatically:\n\n' +
      '**Discount:** the account key SKE (received) / SKT (granted) — from the automatic-posting settings in IMG.\n' +
      '**FX difference:** the account key KDF — by currency and company code.\n' +
      '**Small difference:** the account defined in the {{OBA3}}/{{OBA4}} tolerance groups.\n\n' +
      'If these accounts aren\'t defined, clearing stops with an "account determination not possible" error.',

    tur:
      '**Configuration:** {{OB74}} automatic clearing rules, {{OBA3}} customer/vendor tolerance groups, ' +
      '{{OBA4}} user tolerance groups, difference accounts, clearing document types.\n\n' +
      '**Master data:** the account\'s {{acik-kalem-yonetimi}} setting ({{SKB1}} `XOPVW`) and its **sort key** ' +
      '(`ZUAWA`). These two are what most determine whether clearing will work.\n\n' +
      '**Transaction data:** clearing documents and `AUGBL` assignments.',

    transport:
      'Tolerance groups, {{OB74}} rules, and difference-account determinations transport. An account\'s sort ' +
      'key **is master data and doesn\'t transport** — it must be set separately in every system. This ' +
      'distinction is the classic reason {{F.13}} works in the test system but not in production.',

    img:[
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Open Item Clearing → Prepare Automatic Clearing', not:'{{OB74}} — {{F.13}} matching criteria' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Open Item Clearing → Clearing Differences → Define Tolerance Groups for G/L Accounts', not:'{{OBA3}} — difference limits' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Tolerance Groups → Define Tolerance Groups for Employees', not:'{{OBA4}} — per-user limits' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Open Item Clearing → Clearing Differences → Define Accounts for Clearing Differences', not:'Small-difference account determination' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Master Data → G/L Accounts → Preparations → Edit Chart of Accounts List (FS00)', not:'{{acik-kalem-yonetimi}} and the **sort key** — master data' },
    ],

    ekstra:[
      { ic:'🔑', baslik:'The sort key — automatic clearing\'s decisive setting', metin:
        'Whether {{F.13}}\'s automatic clearing works or not depends almost entirely on the account\'s ' +
        '**sort key** ({{SKB1}} `ZUAWA`).\n\n' +
        'The sort key automatically fills the **assignment field** ({{BSEG}} `ZUONR`) at posting time. ' +
        '{{F.13}} matches based on that field. If the key is wrong, the assignment field either stays blank ' +
        'or fills with an unrelated value, and matching **never** happens.\n\n' +
        'The right key is chosen based on the account\'s purpose: purchase order number or material document ' +
        'for the {{gr-ir}} account, reference or document number for the bank clearing account, vendor number for an advance account.\n\n' +
        '**Critical warning:** if the sort key is changed later, only **new** items get filled correctly. ' +
        'Old items\' assignment fields stay blank and must be cleared by hand.' },

      { ic:'⚖️', baslik:'There are two tolerance groups and both are checked', metin:
        '**{{OBA3}} — customer/vendor tolerance group:** the acceptable difference per business partner. ' +
        'Assigned to the customer/vendor master.\n\n' +
        '**{{OBA4}} — user (employee) tolerance group:** the maximum amount a user can post and the maximum ' +
        'difference they can accept at clearing. Assigned to the user master.\n\n' +
        'At clearing, **both are checked** and **the more restrictive one applies**. A user getting ' +
        '"Difference too large" when a colleague can do the same transaction usually points to different {{OBA4}} groups.' },
    ],

    notlar:[
      { tip:'warn', baslik:'The difference between FBRA and FB08', metin:
        '**{{FB08}}** reverses a *document*: it produces a new reversal document, the original stays. ' +
        '**{{FBRA}}** resets a *clearing*: it produces no new document, it just undoes the match and reopens the items.\n\n' +
        'The correct tool for a wrong clearing is **FBRA**. Using FB08 both creates needless document ' +
        'clutter and doesn\'t solve the actual problem (the wrong match).' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Clearing logic **hasn\'t changed** in S/4HANA — the `AUGBL`/`AUGDT` fields and the tolerance check ' +
      'are the same. What changed is where the open-item data is read from: the index tables turned into ' +
      '{{uyumluluk-view}}s and the data is produced from {{ACDOCA}}.',

    eccFarklari:[
      { konu:'Open item indexes', ecc:'{{BSIS}}/{{BSAS}}/{{BSIK}}/{{BSAK}}/{{BSID}}/{{BSAD}} physical tables', s4:'All {{uyumluluk-view}} — data from {{ACDOCA}}' },
      { konu:'Clearing fields', ecc:'{{BSEG}} `AUGBL`/`AUGDT`', s4:'**Same** — also kept in {{ACDOCA}}' },
      { konu:'Clearing logic', ecc:'Tolerance + difference account', s4:'**Unchanged**' },
      { konu:'Automatic clearing', ecc:'{{F.13}}', s4:'{{F.13}} still works + Fiori "Clear G/L Accounts" with suggested matches' },
      { konu:'Performance', ecc:'Index scans are slow on large accounts', s4:'Column-based {{ACDOCA}} — a marked speedup' },
      { konu:'Match suggestion', ecc:'None — the user selects by hand', s4:'Fiori apps **suggest** likely matches' },
    ],

    universalJournal:
      'Because clearing information is also kept in {{ACDOCA}}, open-item queries can be run directly on ' +
      'this table. The practical result: "which items are open, which cost center, which profit center do ' +
      'they belong to?" is answered from a single table. In ECC this required joining the index table + ' +
      '{{BSEG}} + a CO table.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'None of the clearing transaction codes were removed; {{F-03}}, {{F-32}}, {{F-44}}, {{F.13}}, {{FBRA}} all still work exactly the same.' },
    ],

    fiori:[
      { ad:'Clear G/L Accounts', aciklama:'Replaces {{F-03}}; **suggests** likely matches on its own, the user just confirms.' },
      { ad:'Clear Incoming Payments', aciklama:'Offers an automatic match suggestion between incoming payments and open items.' },
      { ad:'Manage Customer Line Items', aciklama:'Open/cleared item management and bulk clearing.' },
      { ad:'Reset Cleared Items', aciklama:'The Fiori counterpart of {{FBRA}}.' },
      { ad:'GR/IR Monitor', aciklama:'Visually monitors the {{gr-ir}} account\'s unmatched items.' },
    ],

    compatibilityViews:[
      '{{BSIS}}, {{BSAS}} — the G/L open/cleared item indexes are now views.',
      '{{BSIK}}, {{BSAK}}, {{BSID}}, {{BSAD}} — the vendor and customer indexes are views too.',
      '**Writing to these views is not possible.** Old Z-programs that do a direct INSERT/UPDATE into these ' +
      'tables break during migration — clearing-related custom developments must be scanned for.',
      '{{BSEG}} still stands as a physical table; the `AUGBL` field can still be read from there.',
    ],

    performans:
      'Because open-item lists are produced from {{ACDOCA}}, there\'s a marked speedup on large accounts ' +
      '(like {{gr-ir}} with hundreds of thousands of items). {{F.13}} bulk clearing also speeds up. On the ' +
      'other hand, old custom reports running over the {{uyumluluk-view}}s are slower than new reports that query {{ACDOCA}} directly.',

    bestPractices:[
      'Clean up clearing accounts **before** the S/4HANA migration. Dirty open items migrate into the new system and are harder to resolve there.',
      'Use Fiori\'s match-suggestion feature — it markedly reduces manual clearing effort.',
      'Review sort keys during migration; a wrong key means years of accumulated unmatched items.',
      'Scan custom programs writing to {{BSIS}}/{{BSIK}} before migration and rewrite them against {{ACDOCA}}.',
      'Simplify tolerance groups; groups that multiply over the years lead to inconsistent behavior.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'A 4.2 million TRY GR/IR balance: a clearing excavation',
    hikaye:
      'Year-end audit at **Marmara Textiles Inc.** The auditor asks about account 159 GR/IR\'s balance: ' +
      '**4,200,000 TRY credit**. It was expected to be around 300–400 thousand TRY.\n\n' +
      'This scenario walks step by step through how an accumulated clearing-account balance is analyzed, ' +
      'how the root cause is found, and how both the past and the future are fixed.',
    veriler:[
      { k:'Company code', v:'1000 — Marmara Textiles Inc.' },
      { k:'Account', v:'159000 — GR/IR (open item managed ✓)' },
      { k:'Balance', v:'4,200,000 TRY credit' },
      { k:'Open item count', v:'3,847' },
      { k:'Period', v:'December 2026 close' },
    ],

    adimlar:[
      { baslik:'The period the balance broke in is found', tcode:'FS10N',
        aciklama:'Before diving into the item list, the **which month** question is answered. This narrows the search.',
        girdi:[
          { alan:'Account / Company code', deger:'159000 / 1000' },
          { alan:'2024 finding', deger:'Year-end balance 380,000 TRY — normal' },
          { alan:'2025 finding', deger:'Year-end balance 1,900,000 TRY — starting to grow' },
          { alan:'2026 finding', deger:'Year-end balance 4,200,000 TRY — keeps growing' },
        ],
        not:'The balance is growing **steadily**. This points to a **systematic problem**, not a one-time ' +
             'error. A single wrong posting would have left the balance flat.' },

      { baslik:'Open items are listed and grouped', tcode:'FBL3N',
        aciklama:'Open items are sorted **by the assignment field** and subtotaled. Items that could match ' +
                 'land next to each other; the lone ones are the problem.',
        girdi:[
          { alan:'Selection', deger:'Account 159000 · **Open items** · 31.12.2026' },
          { alan:'Layout', deger:'Assignment (`ZUONR`), Reference, Text columns added; subtotaled by assignment' },
          { alan:'**Critical finding**', deger:'The assignment field is **BLANK on 3,102 of the 3,847 items**' },
          { alan:'Matchable', deger:'Of the 745 items with an assignment, 690 form pairs — matchable' },
        ],
        tabloEtkisi:[
          { tablo:'BSIS', ne:'This report reads from here (a view over {{ACDOCA}} in S/4HANA)' },
        ],
        not:'Here\'s the root cause: **items with a blank assignment field can\'t be matched by {{F.13}}.** ' +
             'The postings are correct, the balance is never off, no error message appears — but automatic clearing never ran.' },

      { baslik:'The root cause is confirmed — the sort key', tcode:'FS00',
        aciklama:'The account\'s master data is examined. The suspect is the {{SKB1}} `ZUAWA` (sort key) field.',
        girdi:[
          { alan:'Account', deger:'159000 → Control data tab' },
          { alan:'Open item management (`XOPVW`)', deger:'X — **correct** ✓' },
          { alan:'Line item display (`XKRES`)', deger:'X — correct ✓' },
          { alan:'**Sort key (`ZUAWA`)**', deger:'**BLANK** — the source of the problem' },
          { alan:'Expected', deger:'014 (purchase order number) or 018 (purchasing document)' },
        ],
        not:'Because the sort key is blank, the assignment field never gets filled at posting time. Since ' +
             '{{F.13}} matches based on that field, no item can be cleared. **A single master-data setting ' +
             'created three years of cleanup debt.**' },

      { baslik:'The F.13 rule is also checked', tcode:'OB74',
        aciklama:'A second possible cause: the clearing rule was never defined at all.',
        girdi:[
          { alan:'Company code / Account type', deger:'1000 / S (general ledger)' },
          { alan:'Account range 159000', deger:'A rule **exists** — criterion 1: `ZUONR` ✓' },
          { alan:'Result', deger:'The rule is correct; the problem is only that the assignment field is blank' },
        ],
        not:'The rule is defined correctly but the field it feeds on is empty. This settles which of the ' +
             'two possible causes of the "F.13 isn\'t working" complaint applies here.' },

      { baslik:'Fix the future — the sort key is set', tcode:'FS00',
        aciklama:'The sort key is set to the correct value. **This affects only new items.**',
        girdi:[
          { alan:'Account 159000', deger:'Sort key → **014** (purchase order)' },
          { alan:'Effect', deger:'From today on, postings will have the assignment field filled with the purchase order number' },
          { alan:'**What it doesn\'t affect**', deger:'The existing 3,102 items — their assignment fields stay blank' },
        ],
        not:'The critical point: the sort key **doesn\'t work retroactively**. The old items need a separate cleanup operation.' },

      { baslik:'Matchable items are cleared automatically', tcode:'F.13',
        aciklama:'Automatic clearing is run for the 690 items whose assignment field is filled. **Test mode first.**',
        girdi:[
          { alan:'Selection', deger:'Company code 1000 · Account 159000 · Account type S · **Test mode ✓**' },
          { alan:'Test result', deger:'690 items clearable / 3,157 items didn\'t match' },
          { alan:'Production run', deger:'690 items cleared — balance effect **zero**' },
        ],
        fis:{ baslik:'Clearing documents (345 in total)', belgeTuru:'AB', tarih:'31.12.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR — matched items (cleared)', borc:0, alacak:0, not:'Only `AUGBL` was written' },
          ], not:'**The balance didn\'t change.** Clearing changes the items\' status, not the balance. ' +
                 '4,200,000 TRY is still there — because that balance comes from the unmatched items.' },
        tabloEtkisi:[
          { tablo:'BSIS', ne:'690 items removed' },
          { tablo:'BSAS', ne:'690 items added, `AUGBL` filled' },
        ] },

      { baslik:'The remaining 3,157 items are analyzed', tcode:'ME23N',
        aciklama:'The items with a blank assignment field are examined by purchase order. Three distinct groups emerge.',
        girdi:[
          { alan:'**Group 1** — 2,140 items / 2,850,000 TRY', deger:'Matchable: both the goods receipt and the invoice exist, only the assignment is blank' },
          { alan:'**Group 2** — 780 items / 1,100,000 TRY', deger:'A genuine timing gap: the goods arrived, the invoice hasn\'t come in yet' },
          { alan:'**Group 3** — 237 items / 250,000 TRY', deger:'A permanent difference: small quantity/price differences that will never match' },
        ],
        not:'Three groups need three different solutions. Trying to clean them all up the same way would be wrong.' },

      { baslik:'Group 1 is cleared manually', tcode:'F-03',
        aciklama:'The matchable 2,140 items are filtered by purchase order number and cleared by hand in groups.',
        girdi:[
          { alan:'Method', deger:'{{F-03}} → additional selection: reference field = purchase order number' },
          { alan:'Layout', deger:'Sorted by reference, subtotaled' },
          { alan:'Result', deger:'2,140 items cleared — in 3 days instead of 47 working days (with bulk selection)' },
        ],
        not:'Sorting the layout by the reference/assignment field in {{F-03}} makes manual clearing bearable. ' +
             'Items line up as pairs next to each other.' },

      { baslik:'Group 3\'s permanent differences are written off', tcode:'MR11',
        aciklama:'The small differences that will never match are cleaned up with {{MR11}} — these are a genuine expense/income.',
        girdi:[
          { alan:'Selection', deger:'Company code 1000 · GR/IR differences · amount limit under 5,000 TRY' },
          { alan:'Result', deger:'237 items cleared, 250,000 TRY posted to the difference account' },
        ],
        fis:{ baslik:'Document 1000009876 — GR/IR difference cleanup', belgeTuru:'SA', tarih:'31.12.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR account', borc:250000, not:'Items cleared' },
            { hesap:'659', ad:'Other operating expense — GR/IR difference', alacak:0, borc:0 },
            { hesap:'649', ad:'Other operating income — GR/IR difference', alacak:250000, not:'The net difference was posted to income' },
          ], not:'This posting **genuinely** reduces the balance — because these items don\'t match, and the ' +
                 'gap between them is permanently posted to income/expense.' } },

      { baslik:'Group 2 gets a period-end reclassification', tcode:'F.19',
        aciklama:'The 1,100,000 TRY that is a genuine timing gap is reclassified to show correctly on the ' +
                 'balance sheet. **These items aren\'t cleared** — their counterpart hasn\'t arrived yet.',
        fis:{ baslik:'Document 1000009877 — GR/IR reclassification', belgeTuru:'SA', tarih:'31.12.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR account', borc:1100000, not:'Temporarily emptied out' },
            { hesap:'326', ad:'Goods received, not yet invoiced', alacak:1100000, not:'A balance-sheet presentation account' },
          ], not:'**Automatically reversed** on 01.01.2027. The only purpose is a correct presentation on the December 31 balance sheet.' } },
    ],

    sonuc:
      '**Result:** the 4,200,000 TRY balance split into three, each resolved with a different method:\n\n' +
      '• **2,850,000 TRY** matchable items → cleared by hand with {{F-03}} (no balance effect)\n' +
      '• **250,000 TRY** permanent difference → written off with {{MR11}} (the balance genuinely dropped)\n' +
      '• **1,100,000 TRY** genuine timing gap → reclassified with {{F.19}} (shown correctly on the balance sheet)\n\n' +
      'The year-end GR/IR balance fell to **1,100,000 TRY**, and the entire amount is explainable.\n\n' +
      '**Three critical lessons:**\n\n' +
      '**1. Clearing doesn\'t change the balance.** When 690 items were cleared, the balance didn\'t change ' +
      'at all — because those items were already offsetting each other. The only transaction that changed ' +
      'the balance was {{MR11}}, because that\'s where a genuine difference was posted.\n\n' +
      '**2. The source of the problem is the master data, not the clearing transaction itself.** Because ' +
      'the sort key was blank, the assignment field wasn\'t filling, and {{F.13}} couldn\'t match. A single ' +
      'field created three years of buildup.\n\n' +
      '**3. The sort key doesn\'t work retroactively.** Fixing the setting saves the future, but the old ' +
      'items need a separate cleanup operation. This is why clearing accounts must be set up correctly ' +
      '**when they\'re opened** — the cost of fixing it afterward is very high.',
  },

  },
});
