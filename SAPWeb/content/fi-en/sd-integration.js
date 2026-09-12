/* ==========================================================================
   content/fi-en/sd-integration.js — English body for "SD Integration"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'sd-integration',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'SD integration is **the automatic conversion of a sales invoice into an accounting document**. ' +
      'The billing team issues an invoice with {{VF01}}; the accountant enters nothing, but a customer ' +
      'receivable and a revenue posting are created in FI.\n\n' +
      'The heart of the automation is **{{VKOA}}**: this table decides which G/L account the revenue, ' +
      'discount, and freight amounts go to. If a rule is missing, the invoice is still issued ' +
      '**but never reaches accounting** — and unlike MM, this is a **silent error**.\n\n' +
      'It\'s symmetric with MM integration but has one critical difference: in MM, if account ' +
      'determination is missing, **the document is never created at all**; in SD, **the SD invoice is ' +
      'created, but the FI document is not**. In other words, the error is invisible the moment it happens.',

    neden:
      '**Volume.** Retail and wholesale sales issue thousands of invoices a day.\n\n' +
      '**Consistency.** The same product group always goes to the same revenue account.\n\n' +
      '**Real time.** Revenue is recorded the moment the invoice is issued; there\'s no waiting for a ' +
      'month-end bulk transfer.\n\n' +
      '**Correct revenue classification.** Domestic/export sales, product group, discount, and freight ' +
      'are tracked in separate accounts — doing this by hand is impossible.',

    sirketOnemi:
      'A breakdown in SD integration means **underreported revenue**, and this is one of the most ' +
      'dangerous kinds of error: nobody complains that "my revenue looks too high," but "my revenue is ' +
      'short" isn\'t easy to notice either.\n\n' +
      'From a consulting standpoint, this is the integration point an FI consultant **intervenes in most ' +
      'often**: the complaint "the SD invoice was issued but never hit accounting" comes up on almost ' +
      'every project, and the fix is on the FI side ({{VKOA}}).\n\n' +
      'The discriminating question is: **"The SD invoice was issued but no FI document was created. What ' +
      'do you do?"** The right answer: check the {{VBRK}} `RFBSK` field, complete {{VKOA}}, retransfer ' +
      'with {{VF02}} — **don\'t cancel the invoice**.',

    gercekHayat:
      'A wholesaler starts selling a new product group (organic products). The first 40 invoices go out, ' +
      'sales is happy.\n\n' +
      'At month-end the accounting manager pulls the trial balance: **revenue is 1.2 million TRY below ' +
      'expected**. Investigating: none of the 40 invoices hit accounting. In table {{VBRK}}, `RFBSK` = ' +
      '"A" (not transferred).\n\n' +
      'The cause: a **material account determination group** was defined for the new product group, but ' +
      '{{VKOA}} was never given a revenue account for that group.\n\n' +
      'The fix takes 2 minutes, then the 40 invoices are retransferred with {{VF02}}. But **revenue ' +
      'looked short for a whole month** and nobody noticed. That\'s why an `RFBSK` check should be a ' +
      'daily routine.',

    muhasebeMantigi:
      'The accounting logic of SD integration comes from **two separate events**, and they must not be confused:\n\n' +
      '**1. Goods issue (delivery):** stock decreases, the cost of goods sold is expensed. No receivable ' +
      'against the customer **arises yet** — the invoice hasn\'t been issued. This posting is actually an ' +
      '**MM movement** (movement type 601) and is determined via {{OBYC}}.\n\n' +
      '**2. The invoice:** the customer is debited, revenue and VAT are credited. This posting comes ' +
      '**from SD** and is determined via {{VKOA}}.\n\n' +
      'The gap between the two events creates a "shipped but not invoiced" state, and may require an ' +
      'accrual at period end.\n\n' +
      'The critical distinction: **cost comes from MM, revenue comes from SD.** Each one uses a ' +
      'different rule table.',

    kavramlar: ['hesap-belirleme', 'mutabakat-hesabi', 'vergi-kodu', 'kar-merkezi',
                'acik-kalem', 'tahakkuk', 'malzeme-hareket-turu'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'SD integration is the accounting leg of the **Order-to-Cash** chain. Knowing what happens in FI ' +
      'at which step of the chain is the basis for answering "why is revenue short?"',

    roller:[
      { rol:'Sales', gorev:'Takes the order ({{VA01}}). The {{kredi-limiti}} check happens here. **No FI posting.**' },
      { rol:'Shipping / Warehouse', gorev:'Creates the delivery and posts the goods issue. **The first FI posting happens here** — but only on the cost side.' },
      { rol:'Billing', gorev:'Issues the invoice ({{VF01}} / {{VF04}}). **Revenue arises here.**' },
      { rol:'AR accounting', gorev:'Tracks invoices that weren\'t transferred ({{VBRK}} `RFBSK`), retransfers with {{VF02}}.' },
      { rol:'General ledger accounting', gorev:'Books the "shipped, not invoiced" accrual at period end.' },
      { rol:'FI + SD consultant', gorev:'Design the {{VKOA}} revenue account determination together.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'From SD to FI — at which step does revenue arise?',
      adimlar:[
        { ic:'🛒', rol:'Sales', baslik:'Sales order ({{VA01}})',
          aciklama:'The {{kredi-limiti}} check happens here; if the limit is exceeded, the order is ' +
                   'blocked and shipment stops. **No FI posting** — an order is a commitment.',
          cikti:'Sales order', ok:'goods are prepared' },
        { ic:'🚚', rol:'Shipping', baslik:'Delivery and goods issue',
          aciklama:'Movement type **601**. Stock decreases, the cost of goods sold is expensed ' +
                   '({{OBYC}} → **GBB/VAX**). **No receivable against the customer arises.**',
          cikti:'Material document + FI cost posting', ok:'the invoice is issued' },
        { ic:'🧾', rol:'Billing', baslik:'The invoice is issued ({{VF01}}) — **revenue arises**',
          aciklama:'The customer is debited, revenue and VAT are credited. {{VKOA}} decides the ' +
                   'accounts. The SD invoice ({{VBRK}}/{{VBRP}}) and the FI document are created together.',
          cikti:'SD invoice + FI document', ok:'the transfer is checked' },
        { ic:'🔍', rol:'AR accounting', baslik:'The transfer status is checked',
          aciklama:'{{VBRK}} `RFBSK` = **C** means transferred, **A** means not transferred. Invoices ' +
                   'left at "A" must be monitored daily.',
          cikti:'Verified transfer', ok:'if not transferred' },
        { ic:'🔧', rol:'FI consultant', baslik:'The gap is fixed and it\'s retransferred',
          aciklama:'{{VKOA}} is completed, {{VF02}} → *Release to Accounting*. **The invoice is not canceled.**',
          cikti:'FI document', ok:'the receivable enters tracking' },
        { ic:'💰', rol:'AR accounting', baslik:'Collection and clearing',
          aciklama:'Collection is recorded via {{F-28}} or {{FEBAN}}, the customer\'s open item is cleared.',
          cikti:'Cleared receivable' },
      ],
    },

    adimlar:[
      { rol:'Sales', eylem:'Takes the order, credit is checked', sistem:'{{VA01}} — no FI posting' },
      { rol:'Shipping', eylem:'Posts the goods issue', sistem:'Movement type 601 → COGS debit / stock credit ({{OBYC}})' },
      { rol:'Billing', eylem:'Issues the invoice', sistem:'{{VF01}} / {{VF04}} → customer debit / revenue credit ({{VKOA}})' },
      { rol:'AR accounting', eylem:'Checks the transfer status', sistem:'{{SE16N}} → {{VBRK}} `RFBSK`' },
      { rol:'FI consultant', eylem:'Fixes the {{VKOA}} gap', sistem:'{{VKOA}} → {{T030}}' },
      { rol:'Billing', eylem:'Retransfers', sistem:'{{VF02}} → *Release to Accounting*' },
      { rol:'AR accounting', eylem:'Records the collection', sistem:'{{F-28}}, {{FEBAN}}' },
      { rol:'Billing', eylem:'Cancels a genuinely wrong invoice', sistem:'{{VF11}} — **not {{FB08}}**' },
    ],

    veriAkisi:{
      nereden:'The sales order and delivery; the customer master ({{KNVV}} account determination group); ' +
              'the material master (account determination group); pricing conditions; {{VKOA}} rules.',
      nereye:'Into FI documents ({{BKPF}}/{{BSEG}}/{{ACDOCA}}), into customer open items ({{BSID}}), ' +
             'into revenue accounts; into profitability analysis on the CO-PA side.',
      tetikleyen:'The issuing of the invoice. The order and the delivery generate no revenue.',
      sonraki:'Collection, aging, period-end revenue accrual.',
    },

    notlar:[
      { tip:'warn', baslik:'SD errors are silent — MM errors are noisy', metin:
        'This is the **most important practical difference** between the two integrations:\n\n' +
        '**In MM,** if {{OBYC}} is missing, the goods receipt **can\'t be posted** — the user gets an ' +
        'error, work stops, the problem is noticed immediately.\n\n' +
        '**In SD,** if {{VKOA}} is missing, the invoice **is still issued**; only the FI document isn\'t ' +
        'created. Sales is happy, the invoice went to the customer, nobody sees an error — but **the ' +
        'revenue never hits accounting**.\n\n' +
        'That\'s why invoices with `RFBSK` = "A" **must be monitored daily**. If it\'s only noticed ' +
        'monthly, the trial balance comes out wrong and the correction happens during close.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The SD chain has **two separate accounting events** that come from different sources: cost from ' +
      'MM ({{OBYC}}), revenue from SD ({{VKOA}}). Follow this distinction through the examples below.',

    etkilenenHesaplar:[
      { hesap:'120 Trade receivables (reconciliation)', tur:'Balance sheet — Asset', neden:'The customer receivable. Its account is decided by {{KNB1}} `AKONT`, not {{VKOA}}.' },
      { hesap:'600 Domestic sales / 601 Export sales', tur:'Income statement', neden:'{{VKOA}} → account key **ERL** (revenue). Splits by customer and material group.' },
      { hesap:'611 Sales deductions', tur:'Income statement — Revenue reduction', neden:'{{VKOA}} → account key **ERS**. Discount conditions are written here.' },
      { hesap:'602 Freight revenue', tur:'Income statement', neden:'{{VKOA}} → account key **ERF**. Shipping passed on to the customer.' },
      { hesap:'391 Output VAT', tur:'Balance sheet — Liability', neden:'{{OB40}} → account key MWS. Not {{VKOA}}.' },
      { hesap:'621 Cost of goods sold', tur:'Income statement — Expense', neden:'Arises **on goods issue**; {{OBYC}} → **GBB/VAX**. Independent of the invoice.' },
      { hesap:'153 Trade goods (stock)', tur:'Balance sheet — Asset', neden:'Decreases on goods issue; {{OBYC}} → **BSX**.' },
    ],

    fisler:[
      { baslik:'Step 1 — Goods issue (delivery) · **cost side, from MM**',
        belgeTuru:'WL', tarih:'12.04.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'621', ad:'Cost of goods sold', borc:60000, not:'{{OBYC}} → **GBB/VAX**' },
          { hesap:'153', ad:'Trade goods (stock)', alacak:60000, not:'{{OBYC}} → **BSX**' },
        ],
        not:'**No revenue, no customer receivable.** Only the cost was recorded. This is an **MM ' +
             'movement** (movement type 601) and {{VKOA}} doesn\'t come into play.\n\n' +
             'This interim state is tracked as "shipped, not invoiced," and may require a revenue ' +
             'accrual at period end.' },

      { baslik:'Step 2 — The invoice is issued ({{VF01}}) · **revenue side, from SD**',
        belgeTuru:'RV', tarih:'15.04.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables — C-5001', borc:120000, not:'{{KNB1}} `AKONT` — not {{VKOA}}' },
          { hesap:'600', ad:'Domestic sales', alacak:100000, not:'{{VKOA}} → **ERL**' },
          { hesap:'391', ad:'Output VAT', alacak:20000, not:'{{OB40}} → MWS' },
        ],
        not:'**Revenue arose here.** The accountant entered nothing; it was created automatically once ' +
             'the invoice was issued.\n\n' +
             'This sale\'s profit: 100,000 revenue − 60,000 cost = **40,000 TRY**. But the cost was ' +
             'posted on April 12, the revenue on April 15 — for two days the income statement looked incomplete.' },

      { baslik:'Discounted invoice — {{VKOA}} uses multiple account keys',
        belgeTuru:'RV', tarih:'15.04.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables — C-5001', borc:116400, not:'Net 97,000 + VAT 19,400' },
          { hesap:'600', ad:'Domestic sales', alacak:100000, not:'{{VKOA}} → **ERL**' },
          { hesap:'611', ad:'Sales deductions', borc:5000, not:'{{VKOA}} → **ERS** — reduces revenue' },
          { hesap:'602', ad:'Freight revenue', alacak:2000, not:'{{VKOA}} → **ERF**' },
          { hesap:'391', ad:'Output VAT', alacak:19400, not:'{{OB40}} → 97,000 × 20%' },
        ],
        not:'A single invoice triggered **three separate account keys**: revenue (ERL), discount (ERS), ' +
             'freight (ERF). Each comes from a pricing condition and is separately defined in {{VKOA}}.\n\n' +
             'Net revenue: 100,000 − 5,000 + 2,000 = **97,000 TRY**. VAT is calculated on this **net ' +
             'amount**: 97,000 × 20% = 19,400 TRY. Because the discount reduces revenue it also reduces ' +
             'the VAT base — a common mistake is calculating VAT on the gross 100,000.' },

      { baslik:'Credit memo (return) — the reverse of the invoice',
        belgeTuru:'RV', tarih:'20.04.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'600', ad:'Domestic sales', borc:20000, not:'Revenue decreased' },
          { hesap:'391', ad:'Output VAT', borc:4000 },
          { hesap:'120', ad:'Trade receivables — C-5001', alacak:24000, not:'The customer\'s debt decreased' },
        ],
        not:'A **goods receipt** is also posted for the returned goods (movement type 651/652) and stock ' +
             'increases back, the cost of goods sold decreases. So a return also generates **two ' +
             'separate postings**: the revenue side from SD, the cost side from MM.' },

      { baslik:'Period end — shipped, not invoiced ({{FBS1}})',
        belgeTuru:'SA', tarih:'30.04.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'181', ad:'Accrued revenue', borc:85000, not:'Uninvoiced deliveries' },
          { hesap:'600', ad:'Domestic sales', alacak:85000, not:'Revenue posted to the correct period' },
        ],
        not:'At the end of April there are deliveries that shipped but weren\'t invoiced. The cost was ' +
             'already recorded (with the goods issue); revenue was missing. {{tahakkuk}} posts revenue ' +
             'to the correct period.\n\n' +
             'This posting is **reversed** — the real invoice will be issued in May.' },
    ],

    tHesaplar:[
      { hesap:'Trade receivables (reconciliation)', kod:'120',
        borc:[{ ad:'SD invoices', tutar:234000 }],
        alacak:[{ ad:'Collections', tutar:120000 }, { ad:'Return credit memo', tutar:24000 }],
        not:'Its account is decided by KNB1-AKONT' },
      { hesap:'Domestic sales', kod:'600 (revenue)',
        borc:[{ ad:'Return', tutar:20000 }],
        alacak:[{ ad:'Invoices', tutar:200000 }, { ad:'Revenue accrual', tutar:85000 }],
        not:'VKOA → ERL' },
      { hesap:'Cost of goods sold', kod:'621 (expense)',
        borc:[{ ad:'Goods issues', tutar:120000 }],
        alacak:[{ ad:'Return receipt', tutar:12000 }],
        not:'OBYC → GBB/VAX — comes from MM' },
      { hesap:'Sales deductions', kod:'611',
        borc:[{ ad:'Discounts given', tutar:5000 }],
        alacak:[],
        not:'VKOA → ERS' },
    ],

    notlar:[
      { tip:'tip', baslik:'Cost from MM, revenue from SD — why separate?', metin:
        'A goods issue is a **stock movement** and belongs to MM: stock decreases, cost arises. Its ' +
        'accounts are decided by {{OBYC}} (the GBB/VAX transaction key).\n\n' +
        'An invoice, on the other hand, is a **sales transaction** and belongs to SD: a receivable ' +
        'arises, revenue is created. Its accounts are decided by {{VKOA}}.\n\n' +
        'This split has a practical consequence: "the cost of goods sold is hitting the wrong account" ' +
        'is solved not in {{VKOA}} but in **{{OBYC}}**. Conversely, "revenue is in the wrong account" is ' +
        'a {{VKOA}} issue. Looking in the wrong place wastes hours.' },
      { tip:'warn', baslik:'VKOA doesn\'t determine the customer account', metin:
        'A common misunderstanding: {{VKOA}} determines **only the revenue-side** accounts (revenue, ' +
        'discount, freight).\n\n' +
        'The customer line\'s account (120 Trade receivables) comes from the {{KNB1}} `AKONT` field — ' +
        'following {{mutabakat-hesabi}} logic, exactly as with manually entered invoices.\n\n' +
        'The VAT account comes from {{OB40}}. So a single SD invoice draws on **three separate sources**.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'SD integration varies along three axes: **invoice type**, **account key**, and **revenue ' +
      'recognition timing**.',

    liste:[
      { ad:'Invoice (F2)',
        aciklama:'A normal sales invoice. The customer is debited, revenue and VAT are credited.',
        neZaman:'On normal sales following a delivery.',
        ornek:'Document type **RV**. {{VKOA}} → the ERL revenue account.',
        tcodes:['VF01','VF04'] },

      { ad:'Credit Memo (G2)',
        aciklama:'A document issued to the customer for a return, discount, or correction. The reverse of an invoice.',
        neZaman:'Goods returns, price corrections, a retroactive volume rebate.',
        ornek:'Revenue debit / customer credit. If the goods physically come back too, a goods receipt is also posted.',
        tcodes:['VF01'] },

      { ad:'Debit Memo (L2)',
        aciklama:'Charging the customer an additional amount. An underinvoiced amount, default interest, an extra charge.',
        neZaman:'When a price correction goes upward.',
        ornek:'Customer debit / revenue credit — the same direction as a normal invoice.' },

      { ad:'Proforma / Down Payment Request',
        aciklama:'A payment request; it **produces no** accounting posting (proforma) or produces a statistical entry.',
        neZaman:'On sales requiring advance collection, on export documents.',
        ornek:'A proforma never hits FI at all. A down payment request is tracked via {{ozel-ana-muhasebe-gostergesi}}.' },

      { ad:'Revenue Account Key',
        aciklama:'The main sales revenue. In {{VKOA}} it\'s routed to different accounts based on the customer and material group.',
        neZaman:'On every sales invoice.',
        ornek:'Domestic customer + normal product → 600. Export customer → 601.',
        tcodes:['VKOA'] },

      { ad:'Sales Deduction Account Key',
        aciklama:'Discounts given. Tracked in a separate account that reduces revenue.',
        neZaman:'When the pricing has a discount condition.',
        ornek:'611 Sales deductions — shows the gap between gross and net revenue.',
        tcodes:['VKOA'] },

      { ad:'Freight Account Key',
        aciklama:'Shipping cost passed on to the customer.',
        neZaman:'When freight is billed as a separate line.',
        ornek:'602 Freight revenue — tracked separately from sales revenue.',
        tcodes:['VKOA'] },

      { ad:'Immediate Revenue Recognition',
        aciklama:'Revenue is recorded the moment the invoice is issued. SAP\'s default behavior.',
        neZaman:'On the sale of goods; when risk and reward transfer along with delivery.',
        ornek:'The invoice is issued → account 600 is credited.' },

      { ad:'Deferred Revenue Recognition',
        aciklama:'Revenue is recognized spread over time; at the moment of invoicing it\'s posted to a **deferred revenue** account.',
        neZaman:'Annual maintenance contracts, subscriptions, service bundles.',
        ornek:'A 12-month maintenance contract is invoiced → 380 deferred revenue; 1/12 of it is transferred to 600 each month.' },
    ],

    karsilastirmaBasliklar:['MM integration', 'SD integration'],
    karsilastirma:[
      ['Account determination', '**{{OBYC}}**', '**{{VKOA}}**'],
      ['What it determines', 'Stock, GR/IR, price differences, consumption', 'Revenue, discount, freight'],
      ['Criteria', 'Transaction key + {{degerleme-sinifi}}', 'Sales org. + customer group + material group + account key'],
      ['Business partner account', '{{LFB1}} `AKONT`', '{{KNB1}} `AKONT` — not determined by VKOA'],
      ['Failure behavior', '**Noisy** — the document is never created, work stops', '**Silent** — the SD invoice is created, the FI document is not'],
      ['Error detection', 'Immediate (the user gets an error)', '{{VBRK}} `RFBSK` = "A" must be monitored'],
      ['Correction', 'Cancel at the source: {{MR8M}}', 'Cancel at the source: {{VF11}}'],
      ['Result table', '{{T030}}', '{{T030}} — **the same table**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'VKOA', ad:'SD revenue account determination — the heart of the integration',
        amac:'Defines which G/L account the revenue, discount, and freight amounts of a sales invoice go to.',
        neZaman:'At setup; when a new product group or customer group is added; on a "the invoice ' +
                'never hit accounting" issue.',
        adimlar:[
          { baslik:'Choose the access sequence',
            aciklama:'{{VKOA}} offers multiple table layers; the system searches from **most specific ' +
                     'to most general**. The first matching rule is used.' },
          { baslik:'The most common layer: sales org. + customer group + material group + account key',
            aciklama:'**Account determination groups** come from the customer ({{KNVV}}) and material ' +
                     'master. These are {{VKOA}}\'s classification criteria.' },
          { baslik:'Enter the account key',
            aciklama:'**ERL** revenue, **ERS** discount, **ERF** freight. The key comes from the ' +
                     'pricing condition.' },
          { baslik:'Assign the G/L account' },
          { baslik:'Define a general fallback rule',
            aciklama:'Defining a default account at the most general layer (sales org. + account key ' +
                     'only) prevents "account not found" errors. But it can also hide misclassification ' +
                     '— it should be a deliberate choice.' },
        ],
        ekranAkisi:[
          { ekran:'Access sequence', islem:'Table 001: Sales org. + Customer group + Material group + Account key' },
          { ekran:'Records', islem:'1000 + 01 (domestic) + 01 (normal product) + ERL → 600000' },
          { ekran:'New line', islem:'1000 + 01 + **03 (organic product)** + ERL → 600300' },
          { ekran:'Discount line', islem:'1000 + 01 + 03 + **ERS** → 611000' },
        ],
        alanlar:{
          zorunlu:['Sales organization','Account key','G/L account'],
          opsiyonel:['Customer account determination group','Material account determination group','Chart of accounts','Business area'] },
        hatalar:[
          { mesaj:'Document ... saved (no accounting document generated)', sebep:'The account for this combination is undefined in {{VKOA}} — **the most common SD integration error**.', cozum:'Add the missing line in {{VKOA}}, then {{VF02}} → *Release to Accounting*. **Don\'t cancel the invoice.**' },
          { mesaj:'Error in account determination: table T030K key ...', sebep:'Tax account determination is missing ({{OB40}}).', cozum:'Define the tax account with {{OB40}} — this is a tax configuration issue, not {{VKOA}}\'s.' },
        ],
        ipucu:'{{VKOA}}\'s classification criteria come from **master data**: the customer\'s account ' +
              'determination group ({{KNVV}}) and the material\'s account determination group. When a ' +
              'new product group is defined, it **must** have a matching entry in {{VKOA}} — otherwise ' +
              'the invoice silently never hits accounting.',
        ilgili:['VF01','VF02','VBRK','T030','OB40'] },

      { kod:'VF01', ad:'Create SD invoice',
        amac:'Issues an invoice from a sales order or delivery; the FI document is created automatically.',
        neZaman:'After delivery, during the billing process.',
        adimlar:[
          { baslik:'Enter the document to be billed', aciklama:'The delivery number or the order number.' },
          { baslik:'Check the invoice type', aciklama:'**F2** standard invoice, **G2** credit memo, **L2** debit memo.' },
          { baslik:'Review the items and pricing',
            aciklama:'Pricing conditions (the structure that triggers {{VKOA}} account keys) appear here.' },
          { baslik:'Save',
            aciklama:'The SD invoice ({{VBRK}}/{{VBRP}}) and the FI document should be created together.' },
          { baslik:'**Verify the transfer status**',
            aciklama:'{{VBRK}} `RFBSK` should be **C**. If it\'s "A," the FI document wasn\'t created.' },
        ],
        alanlar:{
          zorunlu:['Document to be billed','Invoice type','Billing date'],
          opsiyonel:['Pricing date','Payment term','Text'] },
        hatalar:[
          { mesaj:'Document ... saved (no accounting document generated)', sebep:'{{VKOA}} is missing — the most common cause. Other possibilities: the FI period is closed, the revenue account is blocked, a {{belge-bolme}} error.', cozum:'Check {{VBRK}} `RFBSK`; fix the gap; retransfer with {{VF02}}.' },
          { mesaj:'Posting period is not open', sebep:'The FI period is closed (account type D or S).', cozum:'Open it with {{OB52}}, then retransfer with {{VF02}}.' },
          { mesaj:'Billing document could not be created — no items', sebep:'The delivery has already been invoiced, or there\'s a billing block.', cozum:'Check the billing block on the sales order and the delivery status.' },
        ],
        ipucu:'On a "the invoice was issued but never hit accounting" complaint, **the invoice is never ' +
              'canceled**. The gap is fixed and it\'s retried with {{VF02}} → *Release to Accounting*. ' +
              'Canceling it wastes the SD number and leaves the system inconsistent with a document ' +
              'already sent to the customer.',
        ilgili:['VF02','VF04','VF11','VKOA','VBRK'] },

      { kod:'VF02', ad:'Change invoice / release to accounting',
        amac:'Retransfers an SD invoice that failed to reach accounting.',
        neZaman:'On every invoice with `RFBSK` = "A," after the gap is fixed.',
        adimlar:[
          { baslik:'Enter the invoice number' },
          { baslik:'From the menu, choose *Release to Accounting*',
            aciklama:'The system retries account determination.' },
          { baslik:'Read the error message',
            aciklama:'If the transfer fails again, a **detailed error message** appears here — more ' +
                     'informative than what {{VF01}} shows.' },
          { baslik:'If successful, `RFBSK` becomes C and the FI document is created' },
        ],
        ipucu:'**The error message on this screen is the most valuable diagnostic source.** {{VF01}} ' +
              'only says "no accounting document generated"; {{VF02}} → *Release to Accounting* tells ' +
              'you **exactly** which account determination combination is missing.',
        hatalar:[
          { mesaj:'Account determination error for key 1000 01 03 ERL', sebep:'This combination is undefined in {{VKOA}}.', cozum:'Enter the four values from the message into {{VKOA}}: sales org. + customer group + material group + account key.' },
        ],
        ilgili:['VF01','VKOA','VBRK','VF11'] },

      { kod:'VF11', ad:'Cancel SD invoice',
        amac:'Cancels an SD invoice and reverses the FI document.',
        neZaman:'When the invoice is genuinely wrong (amount, customer, product error).',
        adimlar:[
          { baslik:'Enter the invoice number' },
          { baslik:'Check the cancellation invoice type', aciklama:'S1 (invoice cancellation) or S2 (credit memo cancellation).' },
          { baslik:'Save — a cancellation document and an FI reversal are created' },
        ],
        ipucu:'**{{VF11}} must not be confused with {{FB08}}.** If an SD invoice is canceled from FI, FI ' +
              'is fixed but the SD side keeps looking "billed"; the delivery can\'t be reinvoiced and ' +
              'the two modules become inconsistent.\n\n' +
              'Also: **an invoice that never hit accounting is not canceled** — it\'s fixed and ' +
              'transferred with {{VF02}}.',
        hatalar:[
          { mesaj:'Cancellation not possible — document already cleared', sebep:'The customer item on the FI document has already been collected.', cozum:'First reverse the clearing with {{FBRA}}, then cancel.' },
        ],
        ilgili:['VF01','VF02','FB08','FBRA'] },

      { kod:'VF04', ad:'Billing list (mass billing)',
        amac:'Bills deliveries awaiting invoicing in bulk.',
        neZaman:'In the daily or weekly billing routine; at month-end close.',
        adimlar:[
          { baslik:'Enter the billing date and sales organization' },
          { baslik:'Review the list of documents to be billed' },
          { baslik:'Bill in bulk',
            aciklama:'A separate invoice and FI document are created for each document.' },
          { baslik:'**Check the log**',
            aciklama:'Which documents couldn\'t be billed, which couldn\'t be transferred to accounting — shown here.' },
        ],
        ipucu:'Running {{VF04}} at month-end close confirms that **no deliveries are left waiting to be ' +
              'invoiced**. If any remain, revenue is short and an accrual is needed.',
        ilgili:['VF01','VF02','VBRK'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Two tables are critical in SD integration: {{VBRK}} (the invoice header — **transfer status is ' +
      'here**) and {{VBRP}} (the items — account determination criteria are here). Account ' +
      'determination rules, however, are kept in the **same table** as MM ({{T030}}).',

    liste:[
      { ad:'VBRK', baslik:'SD invoice header',
        tutar:'The invoice\'s customer, date, net amount, currency, and **transfer-to-accounting status**.',
        olusturan:'{{VF01}} / {{VF04}}',
        guncelleyen:'{{VF01}}, {{VF02}}, {{VF11}}',
        anahtar:'VBELN',
        iliskiler:'{{VBRP}} items; the FI document via {{BKPF}} through `AWKEY`.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'RFBSK', aciklama:'**Transfer status** — **C** transferred, **A** not transferred, **B** partial. The first place to look in SD integration diagnosis.' },
          { ad:'FKART', aciklama:'Invoice type: F2 standard, G2 credit memo, L2 debit memo, S1 cancellation' },
          { ad:'KUNRG', aciklama:'Invoice recipient (payer)', tip:'fk' },
          { ad:'NETWR', aciklama:'Net invoice amount' },
          { ad:'FKDAT', aciklama:'Billing date — the FI document\'s posting date' },
        ] },

      { ad:'VBRP', baslik:'SD invoice items',
        tutar:'Invoice lines: material, quantity, net value, and **account determination groups**.',
        olusturan:'{{VF01}}',
        guncelleyen:'{{VF01}}, {{VF02}}',
        anahtar:'VBELN + POSNR',
        iliskiler:'{{VBRK}} header; the input for {{VKOA}} account determination.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'MATNR', aciklama:'Material number' },
          { ad:'KTGRM', aciklama:'**Material account determination group** — {{VKOA}}\'s main criterion' },
          { ad:'PRCTR', aciklama:'{{kar-merkezi}} — which unit revenue is posted to' },
          { ad:'NETWR', aciklama:'Item net value' },
        ] },

      { ad:'KNVV', baslik:'Customer sales area data',
        tutar:'The customer\'s data by sales organization — including the **account determination group**.',
        olusturan:'{{BP}} → Customer (Sales) role or {{XD01}}',
        guncelleyen:'{{BP}}, {{XD02}}',
        anahtar:'KUNNR + VKORG + VTWEG + SPART',
        iliskiler:'The second criterion for {{VKOA}} account determination.',
        s4:'Populated through {{BP}}.',
        alanlar:[
          { ad:'KTGRD', aciklama:'**Customer account determination group** — this is usually where the domestic/export split happens' },
          { ad:'VKORG / VTWEG / SPART', aciklama:'Sales area — {{VKOA}}\'s first criterion' },
        ] },

      { ad:'KNB1', baslik:'Customer company code data',
        tutar:'The customer\'s accounting data — the **reconciliation account** is here.',
        olusturan:'{{BP}} → FI Customer role',
        guncelleyen:'{{BP}}, {{FD02}}',
        anahtar:'KUNNR + BUKRS',
        iliskiler:'The customer line\'s account on the SD invoice comes from here — **not {{VKOA}}**.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'AKONT', aciklama:'**{{mutabakat-hesabi}}** — 120 Trade receivables. VKOA doesn\'t determine this.' },
        ] },

      { ad:'T030', baslik:'Automatic account determination',
        tutar:'The **shared table** holding both {{OBYC}} (MM), {{VKOA}} (SD), and {{OB40}} (tax) rules.',
        olusturan:'{{VKOA}}, {{OBYC}}, {{OB40}}',
        guncelleyen:'The related configuration transactions',
        anahtar:'KTOPL + KTOSL + ... (varies by access sequence)',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KTOSL', aciklama:'**Account key**: ERL, ERS, ERF on the SD side; BSX, WRX, PRD on the MM side' },
          { ad:'KONTS', aciklama:'The determined G/L account' },
        ] },

      { ad:'BSID', baslik:'Customer open items',
        tutar:'The customer receivable produced by the SD invoice sits here as an open item.',
        olusturan:'The SD invoice\'s FI document',
        guncelleyen:'Moves to {{BSAD}} once collection clears it',
        s4:'{{uyumluluk-view}}.' },
    ],

    er:{
      type:'er',
      baslik:'The SD–FI table bridge',
      varliklar:[
        { ad:'KNVV', rol:'Master data', aciklama:'Customer sales data',
          alanlar:[{ ad:'KUNNR', tip:'pk' }, { ad:'VKORG', tip:'pk' }, { ad:'KTGRD' }] },
        { ad:'KNB1', rol:'Master data', aciklama:'Customer accounting data',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT', tip:'fk' }] },
        { ad:'VBRK', rol:'SD', hub:true, aciklama:'Invoice header',
          alanlar:[{ ad:'VBELN', tip:'pk' }, { ad:'KUNRG', tip:'fk' }, { ad:'RFBSK' }, { ad:'FKART' }] },
        { ad:'VBRP', rol:'SD', aciklama:'Invoice items',
          alanlar:[{ ad:'VBELN', tip:'fk' }, { ad:'POSNR', tip:'pk' }, { ad:'KTGRM' }, { ad:'PRCTR' }] },
        { ad:'T030', rol:'Configuration', aciklama:'Account determination (VKOA)',
          alanlar:[{ ad:'KTOSL', tip:'pk' }, { ad:'KONTS' }] },
        { ad:'BKPF', rol:'FI', aciklama:'FI document',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'AWTYP' }, { ad:'AWKEY' }] },
        { ad:'BSEG', rol:'FI', aciklama:'FI items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'KUNNR', tip:'fk' }, { ad:'HKONT' }] },
        { ad:'BSID', rol:'Index', aciklama:'Customer open items',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }] },
      ],
      iliskiler:[
        { from:'KNVV', to:'VBRP', alanlar:'KTGRD → account determination', not:'customer group criterion' },
        { from:'VBRP', to:'T030', alanlar:'KTGRM → account determination', not:'material group criterion' },
        { from:'VBRK', to:'VBRP', alanlar:'VBELN', not:'invoice → items' },
        { from:'VBRK', to:'BKPF', alanlar:'VBELN → AWKEY', not:'SD invoice → FI document' },
        { from:'KNB1', to:'BSEG', alanlar:'AKONT → HKONT', not:'the customer line\'s account' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'header → item' },
        { from:'BSEG', to:'BSID', alanlar:'BELNR + BUZEI', not:'customer open item' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'On the SD side, three screens matter for an FI consultant: **{{VKOA}}** (configuration), ' +
      '**{{VF02}}** (retransfer and diagnosis), and **querying {{VBRK}}** (monitoring transfer status).',

    ekranlar:[
      { ad:'{{VKOA}} — account determination screen',
        aciklama:'The access sequence is chosen, then the account is assigned per combination.',
        alanlar:[
          { ad:'Access sequence / table', zorunlu:true, aciklama:'There are multiple layers; the system searches **from most specific to most general** and uses the first match.' },
          { ad:'Sales organization', zorunlu:true, aciklama:'The first criterion. Different sales orgs can use different revenue accounts.' },
          { ad:'Customer account determination group (`KTGRD`)', zorunlu:false, aciklama:'Comes from {{KNVV}}. The domestic/export split usually happens here.' },
          { ad:'Material account determination group (`KTGRM`)', zorunlu:false, aciklama:'Comes from the material master. Enables revenue splitting by product group.' },
          { ad:'Account key', zorunlu:true, aciklama:'**ERL** revenue, **ERS** discount, **ERF** freight. Comes from the pricing condition.' },
          { ad:'G/L account', zorunlu:true, aciklama:'The determined revenue/discount/freight account.' },
        ],
        ipucu:'**Defining a fallback rule at the most general layer** prevents "account not found" ' +
              'errors (sales org. + account key only → a default revenue account).\n\n' +
              'But watch out: this also **hides** misclassification. When a new product group is added, ' +
              'its revenue falls into the default account and nobody notices. It should be a deliberate choice.' },

      { ad:'{{VF02}} — release to accounting and diagnose',
        aciklama:'The screen where SD integration problems get solved. The error message is most informative here.',
        alanlar:[
          { ad:'Invoice number', zorunlu:true, aciklama:'An invoice with `RFBSK` = "A."' },
          { ad:'Menu → Release to Accounting', zorunlu:true, aciklama:'Account determination is retried.' },
          { ad:'Error message', zorunlu:false, aciklama:'**The most valuable output.** Tells you exactly which combination is missing: "1000 01 03 ERL."' },
        ],
        ipucu:'{{VF01}} only says "no accounting document generated." {{VF02}} → *Release to Accounting* ' +
              'gives you **exactly** the missing combination. Diagnosis is always done here.' },

      { ad:'Querying {{VBRK}} — monitoring transfer status',
        aciklama:'SD integration\'s **daily checkpoint**.',
        alanlar:[
          { ad:'Table', zorunlu:true, aciklama:'{{SE16N}} → {{VBRK}}' },
          { ad:'Selection: `RFBSK` = A', zorunlu:true, aciklama:'Invoices **not transferred** to accounting.' },
          { ad:'Date range', zorunlu:false, aciklama:'The last 7 days is usually enough.' },
          { ad:'Result', zorunlu:false, aciklama:'The list **should be empty**. If it isn\'t, revenue is underreported.' },
        ],
        ipucu:'Put this query in the **daily routine** or automate it with a variant. SD integration ' +
              'errors are silent; this is the only early warning.\n\n' +
              'In S/4HANA, the Fiori "Billing Documents — Blocked for Accounting" app does the same job visually.' },
    ],

    zorunlu:['Sales organization','Account key','G/L account','Document to be billed','Invoice type'],
    opsiyonel:['Customer account determination group','Material account determination group','Business area','Pricing date'],

    hatalar:[
      { mesaj:'Document ... saved (no accounting document generated)', sebep:'Account determination is missing in {{VKOA}} — **the most common cause**. Others: the FI period is closed, the revenue account is blocked, a {{belge-bolme}} error.', cozum:'Use {{VF02}} → *Release to Accounting* to get the detailed error message; complete {{VKOA}}; retransfer. **Don\'t cancel the invoice.**' },
      { mesaj:'Account determination error for key 1000 01 03 ERL', sebep:'This combination is undefined in {{VKOA}}.', cozum:'Enter the four values from the message into {{VKOA}}: sales org. 1000 + customer group 01 + material group 03 + key ERL.' },
      { mesaj:'Posting period ... is not open for account type D', sebep:'The FI period is closed for the customer account type.', cozum:'Open the period on the **D** line in {{OB52}}, then retransfer with {{VF02}}.' },
      { mesaj:'G/L account ... is blocked for posting', sebep:'The revenue account is blocked for posting in {{FS00}}.', cozum:'Find out why it was blocked; remove it if it\'s genuinely needed.' },
      { mesaj:'Tax code ... does not exist', sebep:'The tax code coming from SD pricing is undefined in FI.', cozum:'Define it with {{FTXP}}; verify the SD and FI tax codes are aligned.' },
      { mesaj:'Cancellation not possible — document already cleared', sebep:'{{VF11}} was tried, but the customer item has already been collected.', cozum:'First reverse the clearing with {{FBRA}}, then cancel.' },
      { mesaj:'Ledger 0L: document splitting error', sebep:'{{belge-bolme}} rules couldn\'t classify the SD line.', cozum:'Check the document-splitting characteristics and item category assignments.' },
    ],

    ipuclari:[
      'Put the **{{VBRK}} `RFBSK` = "A"** query in the daily routine. SD integration errors are silent; this is the only early warning.',
      'For diagnosis use not {{VF01}} but **{{VF02}} → Release to Accounting** — the error message is far more informative.',
      '**Never cancel** an invoice that never hit accounting; fix it and retransfer.',
      'When a new product group or customer group is defined, complete {{VKOA}} **ahead of time**; ' +
      'this is the SD counterpart of MM\'s {{OMWB}} test (SD has no equivalent simulation tool).',
      'Run {{VF04}} at month-end close to confirm **no deliveries are left waiting to be invoiced**; ' +
      'if any remain, revenue is short and an accrual is needed.',
      '"The cost of goods sold is in the wrong account" is **not** a {{VKOA}} issue, it\'s an {{OBYC}} ' +
      'one — cost comes from MM.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'VBRK', ne:'SD invoice header; `RFBSK` transfer status' },
      { tablo:'VBRP', ne:'Invoice items; account determination groups and profit center' },
      { tablo:'BKPF', ne:'FI document; `AWTYP` = **VBRK**, `AWKEY` = the SD invoice number' },
      { tablo:'BSEG', ne:'Customer, revenue, discount, VAT items' },
      { tablo:'ACDOCA', ne:'Universal items; with profit center and material dimensions' },
      { tablo:'BSID', ne:'Customer open item' },
      { tablo:'BSET', ne:'Tax lines' },
    ],

    commit:
      'The SD invoice is **two-phase**, and this is the most important difference from MM:\n\n' +
      '**Phase 1:** the SD document ({{VBRK}}/{{VBRP}}) is written. If this succeeds, the invoice **has ' +
      'been issued**.\n\n' +
      '**Phase 2:** the transfer to accounting is attempted. If it fails, `RFBSK` stays "A" and **the SD ' +
      'invoice still stands**.\n\n' +
      'MM has no such interim state: if account determination is missing, the material document is ' +
      'never created at all. In SD, the invoice is created and accounting is not — which is why the ' +
      'error is silent and monitoring `RFBSK` is mandatory.',

    belgeNo:
      'The SD invoice produces **two numbers**: the SD invoice number ({{VBRK}} `VBELN`) and the FI ' +
      'document number ({{BKPF}} `BELNR`).\n\n' +
      'In most setups these are configured **to match**: the SD invoice type\'s number range is aligned ' +
      'with the FI document type\'s (**RV**) number range. This makes reconciliation easier but isn\'t mandatory.\n\n' +
      'If they weren\'t aligned, searching for the SD number in {{FB03}} won\'t find anything — matching ' +
      'has to go through `AWKEY`.',

    postingLogic:
      'The chain that transfers an SD invoice into FI:\n\n' +
      '**1. Pricing conditions** are read; each condition has an **account key** (ERL, ERS, ERF).\n' +
      '**2. The criteria are collected:** sales organization, the customer account determination group ' +
      '({{KNVV}} `KTGRD`), the material account determination group ({{VBRP}} `KTGRM`).\n' +
      '**3. {{VKOA}} is queried:** searched from most specific to most general by access sequence; the ' +
      'first matching rule is used → the G/L account from {{T030}}.\n' +
      '**4. The customer account** is taken from {{KNB1}} `AKONT` (not VKOA).\n' +
      '**5. The tax account** is taken from {{OB40}}.\n' +
      '**6. The FI document is created** and `RFBSK` is set to C.\n\n' +
      'If any step fails, `RFBSK` stays "A" and no FI document is created.',

    belgeTuru:
      'FI documents originating in SD use document type **RV** (SD invoice). This type is defined in ' +
      '{{OBA7}} and allows the customer (D) and G/L (S) account types. The goods issue, on the other ' +
      'hand, uses type **WL** and comes from MM.',

    numberRange:
      'Three ranges matter: the **SD invoice number** (on the SD side, tied to the invoice type), the ' +
      '**FI document number** (for the RV type, via {{FBN1}}), and the **material document** (for the ' +
      'goods issue).\n\n' +
      'All of them must be opened at year start. In setups where the SD and FI ranges are aligned, ' +
      '**both** need to be extended at the same time; if one fills up, the sync between them breaks.',

    accountDetermination:
      '{{VKOA}} is the center of SD account determination. The criteria:\n\n' +
      '**Sales organization** — which sales unit.\n' +
      '**Customer account determination group** ({{KNVV}} `KTGRD`) — the domestic/export split, related-party distinction.\n' +
      '**Material account determination group** ({{VBRP}} `KTGRM`) — revenue splitting by product group.\n' +
      '**Account key** — **ERL** revenue, **ERS** discount, **ERF** freight.\n\n' +
      'The access sequence proceeds **from most specific to most general**; the first matching rule is ' +
      'used. The result is written to {{T030}} — the **same table** as MM.\n\n' +
      'The customer account ({{KNB1}} `AKONT`) and the tax account ({{OB40}}) are **not** VKOA\'s concern.',

    tur:
      '**Configuration:** {{VKOA}} account determination, access sequences, invoice types, account ' +
      'keys, account determination groups (definitions).\n\n' +
      '**Master data:** the customer ({{KNVV}} `KTGRD`, {{KNB1}} `AKONT`), the material ({{VBRP}} ' +
      '`KTGRM`\'s source).\n\n' +
      '**Transaction data:** sales orders, deliveries, invoices.',

    transport:
      '{{VKOA}} settings and access sequences transport. **But watch out:** the rules reference G/L ' +
      'account numbers and account determination groups. If the accounts aren\'t open in the target ' +
      'system, or the groups on the customer/material masters differ, the rules won\'t match.\n\n' +
      'That\'s why a billing scenario that works in the test system can produce "no accounting document ' +
      'generated" in production.',

    img:[
      { yol:'SPRO → Sales and Distribution → Basic Functions → Account Assignment/Costing → Revenue Account Determination → Assign G/L Accounts', not:'{{VKOA}} — the heart of the integration' },
      { yol:'SPRO → Sales and Distribution → Basic Functions → Account Assignment/Costing → Revenue Account Determination → Define Account Determination Groups', not:'Customer and material groups' },
      { yol:'SPRO → Sales and Distribution → Billing → Billing Documents → Define Billing Types', not:'F2, G2, L2, S1 — number ranges and the FI document type assignment' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Tax on Sales/Purchases → Posting → Define Tax Accounts', not:'{{OB40}} — the VAT account' },
    ],

    ekstra:[
      { ic:'🔍', baslik:'RFBSK — SD integration\'s only early warning', metin:
        'The `RFBSK` field in table {{VBRK}} tells you whether the invoice was transferred to accounting:\n\n' +
        '**C** — transferred, an FI document exists. Normal.\n' +
        '**A** — **not transferred**. No FI document, revenue is missing.\n' +
        '**B** — partially transferred (rare).\n\n' +
        'Why must this field be monitored? Because an SD integration error **raises no alarm anywhere**: ' +
        'sales issued the invoice, sent it to the customer, and considers the job done. Accounting has no idea.\n\n' +
        'Simple fix: save {{SE16N}} → {{VBRK}} → `RFBSK` = A as a variant and run it daily. The list ' +
        'should be empty. In S/4HANA, the Fiori "Billing Documents — Blocked for Accounting" app does the same job.' },

      { ic:'⚖️', baslik:'VKOA access sequence — most specific to most general', metin:
        '{{VKOA}} isn\'t a single table, it\'s a **layered lookup structure**. A typical sequence:\n\n' +
        '**1.** Sales org. + customer group + material group + account key (most specific)\n' +
        '**2.** Sales org. + material group + account key\n' +
        '**3.** Sales org. + customer group + account key\n' +
        '**4.** Sales org. + account key (most general)\n\n' +
        'The system starts at 1 and stops once it finds a match. If not found, it drops down a layer.\n\n' +
        'The practical result: **defining a fallback rule at the most general layer** removes the risk ' +
        'of an error. But this also lets new product groups fall into the default account, **hiding the ' +
        'misclassification**. The choice should be deliberate; if a fallback rule exists, amounts ' +
        'landing in the default account should be checked periodically.' },
    ],

    notlar:[
      { tip:'warn', baslik:'An SD invoice isn\'t canceled from FI', metin:
        '{{FB08}} can technically reverse an SD-originated FI document, but that\'s **wrong**: FI gets ' +
        'fixed, but the SD side keeps looking "billed," and the delivery can\'t be reinvoiced.\n\n' +
        'The correct way is canceling from SD with {{VF11}}; the FI document is reversed automatically along with it.\n\n' +
        'Also: **an invoice that never hit accounting is not canceled** — it\'s fixed and transferred with {{VF02}}.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The **logic** of SD–FI integration hasn\'t changed: {{VKOA}} is the same, the account keys are ' +
      'the same, the `RFBSK` logic is the same. What changed: revenue is held in {{ACDOCA}} together ' +
      'with the profitability dimensions, and Fiori-based monitoring apps.',

    eccFarklari:[
      { konu:'{{VKOA}}', ecc:'Revenue account determination', s4:'**Unchanged**' },
      { konu:'Revenue data', ecc:'{{BSEG}} + CO-PA separate', s4:'**Together with the profitability dimensions** in {{ACDOCA}}' },
      { konu:'CO-PA', ecc:'Separate tables (CE1xxxx…)', s4:'Account-based CO-PA integrated into {{ACDOCA}}' },
      { konu:'Transfer monitoring', ecc:'{{VBRK}} `RFBSK` query', s4:'Fiori "Billing Documents — Blocked for Accounting"' },
      { konu:'Customer master data', ecc:'{{XD01}}', s4:'{{BP}} — Customer (Sales) + FI Customer roles' },
      { konu:'Billing', ecc:'{{VF01}} / {{VF04}}', s4:'Same + the Fiori "Create Billing Documents" app' },
    ],

    universalJournal:
      'The FI items of an SD invoice are written to {{ACDOCA}}, and **the profitability dimensions sit ' +
      'on the same line**: customer, material, {{kar-merkezi}}, sales organization.\n\n' +
      'The practical result is the biggest change: in ECC, "how much profit did we make on which ' +
      'product with which customer?" was answered from CO-PA\'s separate tables and had to be ' +
      'reconciled against FI. In S/4HANA, because **account-based CO-PA** is integrated into ' +
      '{{ACDOCA}}, no gap can arise between FI and profitability analysis.',

    kalkanTcodes:[
      { eski:'{{XD01}} / {{XD02}}', yeni:'{{BP}}', not:'Customer master data — the Customer (Sales) and FI Customer roles' },
      { eski:'—', yeni:'—', not:'{{VKOA}}, {{VF01}}, {{VF02}}, {{VF11}} **were not removed**' },
    ],

    fiori:[
      { ad:'Billing Documents — Blocked for Accounting', aciklama:'Presents `RFBSK` = "A" invoices as a visual worklist. **The modern way to monitor SD integration.**' },
      { ad:'Create Billing Documents', aciklama:'Replaces {{VF04}}; bulk billing.' },
      { ad:'Manage Billing Documents', aciklama:'Replaces {{VF02}}/{{VF03}}; transfer status and retransfer.' },
      { ad:'Profitability Analysis', aciklama:'Account-based CO-PA — revenue and cost from the same table, in real time.' },
      { ad:'Sales Volume — Profit Margin', aciklama:'Profit margin analysis by product and customer.' },
    ],

    compatibilityViews:[
      '{{VBRK}}, {{VBRP}}, {{KNVV}}, {{KNB1}}, {{T030}} — **stay as physical tables**.',
      'CO-PA\'s old CE1xxxx tables — account-based CO-PA uses {{ACDOCA}}.',
      'SD integration is one of the areas whose table structure changed the least in S/4HANA.',
    ],

    performans:
      'Because revenue reports run off {{ACDOCA}}, profitability analysis got noticeably faster. The ' +
      'real win, though, is that **the reconciliation burden disappears**: since no gap can arise ' +
      'between FI and CO-PA, month-end profitability reconciliation becomes unnecessary.',

    bestPractices:[
      'Put the Fiori "Billing Documents — Blocked for Accounting" app in the **daily routine**; it\'s ' +
      'the modern equivalent of `RFBSK` monitoring.',
      'Evaluate a move to account-based CO-PA — the FI-to-profitability reconciliation goes away.',
      'Review {{VKOA}} rules during the migration: unused account determination groups can be simplified.',
      'If a fallback (most general) {{VKOA}} rule exists, check the amounts landing in the default ' +
      'account periodically — new product groups can fall in there and get misclassified.',
      'When moving the customer master to {{BP}}, verify **both the Customer (Sales) and FI Customer** ' +
      'roles are defined; if one is missing, the invoice either can\'t be issued or never hits accounting.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'A silent error: 40 invoices issued, revenue never hit accounting',
    hikaye:
      '**Marmara Textiles Inc.** starts selling a new product group (organic fabric). In April, 40 ' +
      'invoices are issued, totaling 1,200,000 TRY. Sales is happy, customers received their invoices, ' +
      'no error message ever appeared.\n\n' +
      'At month-end the accounting manager pulls the trial balance and revenue comes out **1.2 million ' +
      'TRY below expected**. This scenario shows why SD integration is "silent" and how it gets diagnosed.',
    veriler:[
      { k:'Company code / Sales org.', v:'1000 / 1000' },
      { k:'New product group', v:'Organic fabric · **material account determination group 03**' },
      { k:'Customer group', v:'01 (domestic)' },
      { k:'Period', v:'April 2027' },
      { k:'Affected', v:'40 invoices · 1,200,000 TRY revenue' },
    ],

    adimlar:[
      { baslik:'The goods issue is posted — cost is recorded', tcode:'VF01',
        aciklama:'Deliveries go through fine. Because the goods issue comes from MM, {{OBYC}} runs and ' +
                 'the cost is recorded correctly.',
        fis:{ baslik:'Document 4900002100 — Goods issue', belgeTuru:'WL', tarih:'12.04.2027',
          satirlar:[
            { hesap:'621', ad:'Cost of goods sold', borc:720000, not:'{{OBYC}} → GBB/VAX' },
            { hesap:'153', ad:'Trade goods', alacak:720000, not:'{{OBYC}} → BSX' },
          ], not:'**The cost was recorded but there\'s no revenue.** This temporarily shows the income ' +
                 'statement at a loss — but it should correct itself once the invoice is issued. If it ' +
                 'doesn\'t, something\'s wrong.' } },

      { baslik:'40 invoices are issued — no error, but no FI document either', tcode:'VF01',
        aciklama:'Billing issues the invoices. **No error appears** on screen; just a small message: ' +
                 '"Document 90001234 saved."',
        girdi:[
          { alan:'Invoices issued', deger:'40 · totaling 1,200,000 TRY + VAT' },
          { alan:'Screen message', deger:'"Document saved" — **no error**' },
          { alan:'Actual state', deger:'{{VBRK}} `RFBSK` = **A** (not transferred) · FI document **doesn\'t exist**' },
        ],
        tabloEtkisi:[
          { tablo:'VBRK', ne:'40 invoice headers; all with `RFBSK` = **A**' },
          { tablo:'VBRP', ne:'Items; `KTGRM` = 03 (the new group)' },
          { tablo:'BKPF', ne:'**No entry** — no FI document was created' },
          { tablo:'BSID', ne:'**No customer open item** — the receivable isn\'t being tracked' },
        ],
        not:'**This is the heart of the problem.** In MM, this would have thrown an error at goods ' +
             'receipt and stopped the work. In SD, the invoice was issued, went to the customer, and ' +
             'nobody saw an error.\n\n' +
             'Also, **the receivable isn\'t tracked either**: because there\'s no item in {{BSID}}, ' +
             'aging and dunning never see this 1.2 million TRY.' },

      { baslik:'Month-end — the revenue shortfall is noticed', tcode:'FBL3N',
        aciklama:'The accounting manager pulls the trial balance and sees the discrepancy.',
        girdi:[
          { alan:'600 Domestic sales', deger:'8,400,000 TRY — **expected 9,600,000 TRY**' },
          { alan:'621 Cost of goods sold', deger:'5,900,000 TRY — at the expected level' },
          { alan:'Anomaly', deger:'Cost is there, revenue isn\'t → **gross margin abnormally low**' },
        ],
        not:'The first clue was the **profit margin**: cost was recorded but revenue was missing, so ' +
             'the margin dropped to an unrealistic level. This is the classic symptom of an SD ' +
             'integration error.' },

      { baslik:'Diagnosis — the RFBSK query', tcode:'SE16N',
        aciklama:'SD integration\'s only early-warning indicator is checked.',
        girdi:[
          { alan:'Table', deger:'{{VBRK}}' },
          { alan:'Selection', deger:'`RFBSK` = **A** · billing date 01.04–30.04.2027' },
          { alan:'**Result**', deger:'**40 records** — all organic fabric invoices' },
          { alan:'Common point', deger:'{{VBRP}} `KTGRM` = **03** (the new material account determination group)' },
        ],
        not:'All 40 invoices share the same pattern: the new product group. The problem isn\'t in one ' +
             'invoice, it\'s a **configuration gap**.' },

      { baslik:'Definitive diagnosis — the VF02 error message', tcode:'VF02',
        aciklama:'One invoice is opened and a retransfer is tried. The real error message shows up here.',
        girdi:[
          { alan:'Invoice', deger:'90001234' },
          { alan:'Menu', deger:'*Release to Accounting*' },
          { alan:'**Error message**', deger:'"Account determination error for key **1000 01 03 ERL**"' },
          { alan:'Decoded', deger:'Sales org. **1000** + customer group **01** + material group **03** + key **ERL**' },
        ],
        not:'{{VF01}} had only said "document saved." {{VF02}} → *Release to Accounting* gave ' +
             '**exactly** the missing combination. SD diagnosis should always be done here.' },

      { baslik:'{{VKOA}} is completed', tcode:'VKOA',
        aciklama:'The missing combination is added. The discount and freight keys are also checked.',
        girdi:[
          { alan:'Existing lines', deger:'1000 + 01 + **01** + ERL → 600000 (normal product)' },
          { alan:'**Added**', deger:'1000 + 01 + **03** + ERL → **600300** (Organic product sales)' },
          { alan:'Also added', deger:'1000 + 01 + 03 + **ERS** → 611000 (discount)' },
          { alan:'Check', deger:'The same lines were added for the export customer group (02) too' },
        ],
        tabloEtkisi:[
          { tablo:'T030', ne:'New lines: KTOSL = ERL/ERS, material group 03' },
        ],
        not:'Had {{VKOA}} been updated when the new product group was defined, this error would ' +
             '**never have happened**. A process gap: the product group definition sits with the SD ' +
             'team, {{VKOA}} with the FI team — there was no check between them.' },

      { baslik:'The 40 invoices are retransferred', tcode:'VF02',
        aciklama:'The invoices are retransferred one by one or in bulk. **None are canceled.**',
        girdi:[
          { alan:'Method', deger:'{{VF02}} → *Release to Accounting* (a bulk program can also be used)' },
          { alan:'Result', deger:'40 invoices transferred · `RFBSK` = **C**' },
          { alan:'Produced', deger:'40 FI documents · 1,200,000 TRY revenue · 40 customer open items' },
        ],
        fis:{ baslik:'Document 1800002340 — SD invoice (retransferred)', belgeTuru:'RV', tarih:'15.04.2027',
          satirlar:[
            { hesap:'120', ad:'Trade receivables — C-5001', borc:36000, not:'{{KNB1}} `AKONT`' },
            { hesap:'600300', ad:'Organic product sales', alacak:30000, not:'{{VKOA}} → **ERL** (the new rule)' },
            { hesap:'391', ad:'Output VAT', alacak:6000, not:'{{OB40}}' },
          ], not:'The posting date is the **original billing date** (15.04), not the retransfer date. ' +
                 'So revenue landed in the correct period — the April trial balance was corrected.' },
        tabloEtkisi:[
          { tablo:'VBRK', ne:'`RFBSK` became **C**' },
          { tablo:'BKPF', ne:'40 FI documents; `AWTYP` = **VBRK**, `AWKEY` = the SD invoice number' },
          { tablo:'BSID', ne:'40 customer open items were created — now visible in aging' },
        ],
        not:'**The invoices weren\'t canceled.** Had they been, the SD numbers would have been wasted ' +
             'and the system would have gone inconsistent with invoices already sent to customers.' },

      { baslik:'Prevention — a daily check', tcode:'SE16N',
        aciklama:'Two measures are put in place so the error doesn\'t repeat.',
        girdi:[
          { alan:'Measure 1 — daily query', deger:'{{VBRK}} `RFBSK` = A saved as a variant, run daily' },
          { alan:'Measure 2 — process', deger:'A new product group definition isn\'t approved without a {{VKOA}} check' },
          { alan:'Measure 3 — fallback rule', deger:'Considered but **rejected** — it would hide misclassification' },
        ],
        not:'A fallback (most general) {{VKOA}} rule would have prevented the error, but revenue would ' +
             'have landed in the default account and **the misclassification would have quietly ' +
             'continued**. An early warning beats a silent mistake.' },
    ],

    sonuc:
      '**40 invoices, 1.2 million TRY in revenue, missing from accounting for a month** — and no error ' +
      'message ever appeared.\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. SD integration errors are silent.** In MM, if {{OBYC}} is missing, the goods receipt can\'t ' +
      'be posted and work stops. In SD, if {{VKOA}} is missing, the invoice is issued, goes to the ' +
      'customer, and only the FI document fails to appear. This is the most important practical ' +
      'difference between the two integrations.\n\n' +
      '**2. `RFBSK` is the only early warning.** The {{VBRK}} `RFBSK` = "A" query must run daily. This ' +
      'one check turns a month of lost revenue visibility into a one-day delay.\n\n' +
      '**3. Diagnosis is done with {{VF02}}, not {{VF01}}.** {{VF01}} says "document saved"; {{VF02}} → ' +
      '*Release to Accounting* tells you **exactly** the missing combination: "1000 01 03 ERL."\n\n' +
      '**4. An invoice that never hit accounting is never canceled.** The gap is fixed and it\'s ' +
      'retransferred with {{VF02}}. Because the posting date is the original billing date, revenue ' +
      'lands in the **correct period** — the correction works retroactively.',
  },

  },
});
