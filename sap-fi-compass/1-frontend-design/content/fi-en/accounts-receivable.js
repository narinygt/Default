/* ==========================================================================
   content/fi-en/accounts-receivable.js — English body for "Accounts Receivable"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'accounts-receivable',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Accounts Receivable (FI-AR) is the FI sub-component that manages the company\'s **receivables from ' +
      'customers**. It covers the whole chain from issuing the invoice to collection, from tracking unpaid ' +
      'receivables ({{ihtar}}) to the allowance for doubtful receivables.\n\n' +
      'AR is the **mirror image** of {{accounts-payable}}: there we owed, here we are owed. The table structure, ' +
      'the clearing logic, and the special G/L concepts are symmetric one to one. Seeing this symmetry makes ' +
      'learning AR much faster.',

    neden:
      '**To manage cash inflow.** A company survives not because of what it sells but because of what it ' +
      '**collects**. A profitable company can go under because it cannot collect its receivables.\n\n' +
      '**To measure risk.** Which customer pays late, which one can be given more credit? {{yaslandirma}} and ' +
      '{{kredi-limiti}} answer these questions.\n\n' +
      '**Legal requirement.** Receivables are one of the largest items on the balance sheet and must be valued ' +
      'according to collectibility ({{supheli-alacak}}).',

    sirketOnemi:
      'AR is the accounting leg of the **Order-to-Cash (O2C)** process and works hand in hand with SD. The great ' +
      'majority of invoices are not entered manually in FI; they are issued in SD and flow into FI ' +
      '**automatically**.\n\n' +
      'This is the critical point from a consulting standpoint: an AR consultant has to know {{VKOA}} revenue ' +
      'account determination and the mechanism by which an SD invoice transfers into accounting. The question ' +
      '"the SD invoice was issued but no FI document was created, what do you do?" probes exactly this chain.',

    gercekHayat:
      'A wholesaler sells to 400 dealers on credit. At month-end, 12 million TRY of receivables show up — but ' +
      '2.4 million of it is more than 90 days overdue.\n\n' +
      'The finance manager pulls an aging report with {{FBL5N}}: 18 dealers are more than 60 days past due. ' +
      '{{F150}} runs dunning — 11 dealers get a level-1 reminder, 7 get a level-3 warning with default interest. ' +
      'At the same time, those dealers\' {{kredi-limiti}} is lowered and their new orders are blocked.\n\n' +
      'This shows that AR is not only accounting but also a **risk management** tool.',

    muhasebeMantigi:
      'Accounting in AR has **three stages** and is a perfect mirror of AP:\n\n' +
      '**1. The receivable arises (the invoice).** The customer is debited, revenue is credited. Money hasn\'t ' +
      'come in yet — under {{tahakkuk-esasi}}, revenue is recorded at the moment of sale.\n\n' +
      '**2. {{tahsilat}}.** The bank/cash account is debited, the customer is credited. Note: **collection is ' +
      'not revenue** — one asset (the receivable) turns into another (cash).\n\n' +
      '**3. {{kapatma}}.** The invoice is matched against the collection. Usually steps 2 and 3 happen together ' +
      'in {{F-28}}.\n\n' +
      'The customer line is never written directly to a G/L account; the **customer number** is entered, and SAP ' +
      'finds the {{mutabakat-hesabi}} itself from the `AKONT` field in {{KNB1}}.',

    kavramlar: ['mutabakat-hesabi', 'acik-kalem', 'kapatma', 'tahsilat', 'vade', 'yaslandirma',
                'ihtar', 'supheli-alacak', 'kredi-limiti', 'kismi-kapatma', 'kalan-kapatma', 'avans'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The AR process is the second half of the **Order-to-Cash** chain. The chain begins with the sales order ' +
      'and ends with collection. The point where AR enters is the invoice — but **where** the invoice comes from ' +
      '(SD or directly from FI) shapes the whole flow.',

    roller:[
      { rol:'Sales', gorev:'Takes the order ({{VA01}}). If {{kredi-limiti}} is exceeded, the order is blocked.' },
      { rol:'Shipping / Warehouse', gorev:'Ships the goods. The delivery posting triggers the goods issue and the cost posting.' },
      { rol:'Billing', gorev:'Issues the SD invoice ({{VF01}}). The FI document is created **automatically** once it\'s saved.' },
      { rol:'AR accounting specialist', gorev:'Enters invoices without a sales order ({{FB70}}), records collections ({{F-28}}), clears items.' },
      { rol:'Collections / Credit control', gorev:'Tracks {{yaslandirma}}, runs {{ihtar}} ({{F150}}), manages credit limits.' },
      { rol:'Accounting manager', gorev:'Decides on {{supheli-alacak}}, books the allowance, approves write-offs.' },
      { rol:'FI consultant', gorev:'Designs {{VKOA}} account determination, the {{FBMP}} dunning procedure, tolerances, and special G/L indicators.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Order-to-Cash — from order to collection',
      adimlar:[
        { ic:'🛒', rol:'Sales', baslik:'The sales order is taken ({{VA01}})',
          aciklama:'The {{kredi-limiti}} check happens here. If the limit is exceeded, the order is blocked and shipment stops. **No FI posting.**',
          cikti:'Sales order', ok:'goods are prepared' },
        { ic:'🚚', rol:'Shipping', baslik:'Delivery and goods issue',
          aciklama:'Stock decreases, the cost of goods sold is expensed. The customer receivable **hasn\'t arisen yet** — no invoice has been issued.',
          cikti:'Delivery document + FI stock posting', ok:'invoice is issued' },
        { ic:'🧾', rol:'Billing', baslik:'The invoice is issued ({{VF01}})',
          aciklama:'**The receivable arises here.** Once the SD invoice is saved, the FI document is created automatically; {{VKOA}} decides the revenue account.',
          cikti:'{{VBRK}}/{{VBRP}} + FI document', ok:'the receivable becomes an open item' },
        { ic:'📋', rol:'AR accounting', baslik:'The open item enters tracking',
          aciklama:'The item lands in {{BSID}}. The due date is calculated from {{odeme-kosulu}} and {{yaslandirma}} begins.',
          cikti:'{{acik-kalem}}', ok:'the due date passes' },
        { ic:'💰', rol:'AR accounting', baslik:'The collection is recorded ({{F-28}})',
          aciklama:'The bank is debited, the customer is credited, and the open item is cleared **in the same transaction**.',
          cikti:'Collection document', ok:'if it isn\'t paid' },
        { ic:'📨', rol:'Collections team', baslik:'The dunning process begins ({{F150}})',
          aciklama:'Overdue items get staged {{ihtar}} letters. As the level rises the tone hardens and default interest is added.',
          cikti:'Dunning notice + {{MHNK}} record', ok:'if it can\'t be collected' },
        { ic:'⚠️', rol:'Accounting manager', baslik:'An allowance for doubtful receivables is booked',
          aciklama:'It\'s classified as {{supheli-alacak}} ({{ozel-ana-muhasebe-gostergesi}}), the allowance is expensed.',
          cikti:'Allowance posting', ok:'if it can never be collected' },
        { ic:'🗑️', rol:'Accounting manager', baslik:'The receivable is written off',
          aciklama:'Once the legal process is exhausted, the receivable is removed from the books and the loss becomes final.',
          cikti:'Write-off posting' },
      ],
    },

    adimlar:[
      { rol:'Sales', eylem:'Takes the order, credit is checked', sistem:'{{VA01}} — no FI posting' },
      { rol:'Shipping', eylem:'Issues the goods', sistem:'Delivery → stock credited / COGS debited' },
      { rol:'Billing', eylem:'Issues the SD invoice', sistem:'{{VF01}} → customer debit / revenue credit ({{VKOA}})' },
      { rol:'AR accounting', eylem:'Enters an invoice without a sales order', sistem:'{{FB70}} → customer debit / revenue credit' },
      { rol:'AR accounting', eylem:'Records the collection and clears it', sistem:'{{F-28}} → bank debit / customer credit' },
      { rol:'AR accounting', eylem:'Clears unmatched items', sistem:'{{F-32}}' },
      { rol:'Collections team', eylem:'Pulls aging, runs dunning', sistem:'{{FBL5N}}, {{S_ALR_87012168}}, {{F150}}' },
      { rol:'Accounting manager', eylem:'Books the allowance for doubtful receivables', sistem:'{{F-30}} / special G/L indicator' },
    ],

    veriAkisi:{
      nereden:'The sales invoice from SD ({{VBRK}}/{{VBRP}}); direct FI invoices; collections coming in from the bank statement; the payment term, reconciliation account, and dunning procedure from the {{BP}} master.',
      nereye:'Into {{BSID}} open items → into the aging and dunning processes; into the {{mutabakat-hesabi}} and the balance sheet in general ledger; into the cash-flow forecast.',
      tetikleyen:'The issuing of the invoice. If it comes from SD, accounting enters nothing; the document is created automatically.',
      sonraki:'Collection, bank reconciliation, aging at period end, and the valuation of doubtful receivables.',
    },

    notlar:[
      { tip:'tip', baslik:'Why don\'t the order and the delivery create a receivable?', metin:
        'An order is a commitment. A delivery reduces stock and expenses the cost, but **doesn\'t create a ' +
        'receivable** — because no invoice has been issued yet. In accounting, the receivable arises with the ' +
        'invoice. This distinction explains why "goods shipped but invoice not issued" has to be tracked separately.' },
      { tip:'warn', baslik:'Collection is not revenue', metin:
        'Revenue isn\'t recorded when the money comes in. Revenue was already recorded at the moment of ' +
        'invoicing. Collection is only a shift within the balance sheet: **the receivable decreases, cash ' +
        'increases**. Confusing this is the classic mistake that leads to revenue being recorded twice.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'AR\'s accounting chain is AP\'s mirror image: there the vendor **was credited**, here the customer **is ' +
      'debited**. Below: first the full chain of an invoice coming from SD, then examples of partial collection, ' +
      'doubtful receivables, and a customer down payment.',

    etkilenenHesaplar:[
      { hesap:'120 Trade receivables (reconciliation)', tur:'Balance sheet — Asset', neden:'A receivable from the customer. **Debited** (increases) by the invoice, **credited** (decreases) by the collection. Can\'t be posted to directly.' },
      { hesap:'600 Domestic sales', tur:'Income statement', neden:'Sales revenue. {{VKOA}} determines the account on an SD invoice; the user chooses it on an FI invoice.' },
      { hesap:'391 Output VAT', tur:'Balance sheet — Liability', neden:'A liability to the state arises. It isn\'t the company\'s revenue — it\'s collected on the state\'s behalf.' },
      { hesap:'153 Trade goods / 621 COGS', tur:'Balance sheet / Income statement', neden:'Stock decreases and the cost of goods sold is expensed on the goods issue. This is a posting **separate from the invoice**.' },
      { hesap:'102 Banks', tur:'Balance sheet — Asset', neden:'Increases on collection. {{banka-ara-hesabi}} may be used until the statement arrives.' },
      { hesap:'128 Doubtful trade receivables', tur:'Balance sheet — Asset', neden:'Items classified as {{supheli-alacak}} are moved here via {{ozel-ana-muhasebe-gostergesi}}.' },
      { hesap:'129 Allowance for doubtful receivables', tur:'Balance sheet — Contra-asset', neden:'The account that reduces the receivable. Credited when the allowance is booked, the allowance expense (654) is debited.' },
      { hesap:'340 Advances received on orders', tur:'Balance sheet — Liability', neden:'An amount received in advance from the customer. Not revenue — it\'s a **liability**, since the goods/service haven\'t been delivered yet.' },
    ],

    fisler:[
      { baslik:'Step 1 — Goods issue (delivery) · cost 60,000 TRY',
        belgeTuru:'WL', tarih:'03.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'621', ad:'Cost of goods sold', borc:60000, not:'Expense arose' },
          { hesap:'153', ad:'Trade goods (stock)', alacak:60000, not:'Stock decreased' },
        ],
        not:'**No receivable against the customer yet.** The goods went out but no invoice has been issued. ' +
             'Revenue hasn\'t been recorded either — only the cost side has been processed. This interim state ' +
             'is tracked as "goods delivered, not yet invoiced."' },

      { baslik:'Step 2 — SD invoice issued ({{VF01}}) · 100,000 TRY + VAT',
        belgeTuru:'RV', tarih:'05.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables — C-5001', borc:120000, not:'{{mutabakat-hesabi}} — the receivable arose' },
          { hesap:'600', ad:'Domestic sales', alacak:100000, not:'{{VKOA}} account determination' },
          { hesap:'391', ad:'Output VAT', alacak:20000, not:'Liability to the state' },
        ],
        not:'The accountant **didn\'t enter** this posting; it was created automatically when billing issued the ' +
             'invoice in {{VF01}}. Revenue isn\'t 120,000, it\'s **100,000** — VAT isn\'t the company\'s money.\n\n' +
             'This sale\'s profit: 100,000 revenue − 60,000 cost = **40,000 TRY**.' },

      { baslik:'Step 3 — Full collection ({{F-28}}) · paid on time',
        belgeTuru:'DZ', tarih:'05.12.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Banks', borc:120000, not:'Cash came in' },
          { hesap:'120', ad:'Trade receivables — C-5001', alacak:120000, not:'The open item was cleared' },
        ],
        not:'**No revenue posting** — revenue had already been recorded on the invoice. This is only a shift ' +
             'within the balance sheet: the receivable decreased, cash increased. The item moved from {{BSID}} to {{BSAD}}.' },

      { baslik:'Alternative — partial collection · 70,000 of the 120,000 came in',
        belgeTuru:'DZ', tarih:'05.12.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Banks', borc:70000 },
          { hesap:'120', ad:'Trade receivables — C-5001 (partial payment item)', alacak:70000, not:'{{kismi-kapatma}}' },
        ],
        not:'If {{kismi-kapatma}} is chosen, the **original 120,000 TRY item stays open** and the payment sits ' +
             'as a separate open item. Since the original due date is preserved, {{yaslandirma}} isn\'t thrown off.\n\n' +
             'Had {{kalan-kapatma}} been chosen, the original item would close and a new 50,000 TRY item would be ' +
             'generated — and that item\'s **due date would start from today**, meaning a 90-day-overdue ' +
             'receivable would suddenly look "new."' },

      { baslik:'Customer down payment ({{F-29}}) · 40,000 TRY received in advance',
        belgeTuru:'DZ', tarih:'20.10.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102', ad:'Banks', borc:40000 },
          { hesap:'340', ad:'Advances received on orders', alacak:40000, not:'`UMSKZ` = A → alternative account' },
        ],
        not:'The money came in but it\'s **not revenue**. The goods/service haven\'t been delivered yet; this is ' +
             'a **liability** (a goods obligation to the customer). It sits on the liabilities side of the ' +
             'balance sheet. It\'s offset with {{F-39}} once the invoice is issued.' },

      { baslik:'Allowance for doubtful receivables · 30,000 TRY past 90 days',
        belgeTuru:'SA', tarih:'31.12.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'654', ad:'Allowance expense', borc:30000, not:'Expense arose' },
          { hesap:'129', ad:'Allowance for doubtful trade receivables', alacak:30000, not:'Contra-asset account' },
        ],
        not:'**The receivable was not written off.** Account 120 still shows 30,000 TRY; the allowance account ' +
             'reduces it on the balance sheet. Net receivable = 30,000 − 30,000 = 0. If the customer pays later, ' +
             'the allowance is reversed (as income from a no-longer-needed allowance).' },
    ],

    tHesaplar:[
      { hesap:'Trade receivables (reconciliation)', kod:'120',
        borc:[{ ad:'SD invoice', tutar:120000 }, { ad:'FI invoice', tutar:48000 }],
        alacak:[{ ad:'Collection', tutar:120000 }],
        not:'A debit balance = an uncollected receivable' },
      { hesap:'Domestic sales', kod:'600 (Revenue)',
        borc:[],
        alacak:[{ ad:'SD invoice', tutar:100000 }, { ad:'FI invoice', tutar:40000 }],
        not:'Zeroed out at year-end' },
      { hesap:'Advances received on orders', kod:'340 (Liability)',
        borc:[{ ad:'Offset against invoice (F-39)', tutar:40000 }],
        alacak:[{ ad:'Advance received (F-29)', tutar:40000 }],
        not:'Closes after the offset' },
      { hesap:'Allowance for doubtful receivables', kod:'129 (Contra-asset)',
        borc:[],
        alacak:[{ ad:'Allowance booked', tutar:30000 }],
        not:'Reduces the receivable on the balance sheet' },
    ],

    notlar:[
      { tip:'warn', baslik:'Partial or residual? The decision that determines aging', metin:
        'This choice is the technical decision in AR with the most consequences. {{kismi-kapatma}} preserves the ' +
        'original due date — an overdue receivable keeps looking overdue. {{kalan-kapatma}} generates a new ' +
        'item, so the due date resets and **a 90-day-overdue receivable suddenly becomes "not yet due."** ' +
        'Reports measuring collection performance break as a result. Partial clearing should be the default choice.' },
      { tip:'tip', baslik:'When is revenue recorded?', metin:
        'With the invoice. Not when the order is taken, not when the goods are shipped, not when the money comes ' +
        'in. If goods have shipped but the invoice hasn\'t been issued, only the cost is recorded; revenue is ' +
        'pending. At period end this situation is accrued as "goods delivered, not yet invoiced."' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'AR varies along four axes: the invoice\'s **path of origin**, the collection\'s **clearing form**, the ' +
      '**special G/L** category, and the receivable\'s **risk status**.',

    liste:[
      { ad:'SD Billing Document — VF01',
        aciklama:'An invoice issued from a sales order and delivery. The FI document is created **automatically**; ' +
                 '{{VKOA}} determines the revenue account. In corporate companies this is the majority of invoices.',
        neZaman:'On sales of goods or standard services; whenever the SD module is used.',
        ornek:'Delivery 80001234 → invoice 90005678 → FI document 1800000091 (document type RV).',
        tcodes:['VF01','VF02','VF04','VKOA'] },

      { ad:'Direct FI Invoice — FB70',
        aciklama:'An invoice issued directly in FI without going through SD. The user chooses the revenue account.',
        neZaman:'For sales not defined in SD, such as rental income, scrap sales, fixed asset sales, intercompany allocations.',
        ornek:'Renting out empty warehouse space → 120 debit / 649 other income credit.',
        tcodes:['FB70','FB75'] },

      { ad:'Credit Memo — FB75',
        aciklama:'A return/discount document issued to the customer. The reverse of an invoice: the customer is credited, revenue is debited.',
        neZaman:'Goods returns, price corrections, retroactive volume rebates.',
        ornek:'A 12,000 TRY return → 600 revenue debit 10,000 / 391 VAT debit 2,000 / 120 customer credit 12,000.',
        tcodes:['FB75','VF01'] },

      { ad:'Full Clearing',
        aciklama:'The collected amount equals the invoice amount; the item is cleared entirely and moves to {{BSAD}}.',
        neZaman:'On a normal collection.',
        ornek:'A 120,000 TRY invoice, a 120,000 TRY collection.',
        tcodes:['F-28','F-32'] },

      { ad:'Partial Clearing',
        aciklama:'The original item **stays open**; the collection stands as a separate open item. The original due date is preserved.',
        neZaman:'When the customer pays part of the balance and the **due-date tracking must not be disrupted**. ' +
                'This is the default choice in AR.',
        ornek:'70,000 TRY of a 120,000 TRY debt was paid → two open items: +120,000 and −70,000.',
        tcodes:['F-28','FB05'] },

      { ad:'Residual Clearing',
        aciklama:'The original item is cleared and a **new item** is generated for the remaining amount. The new item\'s due date starts from today.',
        neZaman:'When the difference is permanent and tied to a new payment plan. **Chosen carefully, since it resets the aging.**',
        ornek:'120,000 was cleared, a new 50,000 TRY item was created — due today.',
        tcodes:['F-28','FB05'] },

      { ad:'Customer Down Payment — F-29 / F-39',
        aciklama:'An amount received before goods/services are delivered. Separated from a normal receivable via ' +
                 '{{ozel-ana-muhasebe-gostergesi}} and shown on the **liabilities** side of the balance sheet (a goods obligation to the customer).',
        neZaman:'On cash-in-advance sales, project advances, order deposits.',
        ornek:'A 40,000 TRY advance → 102 bank debit / 340 advance received credit.',
        tcodes:['F-29','F-39','OBXR'] },

      { ad:'Doubtful Receivable',
        aciklama:'A receivable with collection risk. Separated with {{ozel-ana-muhasebe-gostergesi}} (usually E) and ' +
                 'brought to net value on the balance sheet by booking an allowance. **The receivable is not written off.**',
        neZaman:'When it\'s long overdue, dunning letters get no response, or the customer is in financial trouble.',
        ornek:'A 30,000 TRY doubtful item → 654 allowance expense debit / 129 allowance credit.',
        tcodes:['F-30','FBL5N'] },
    ],

    karsilastirmaBasliklar:['Accounts Payable (AP)', 'Accounts Receivable (AR)'],
    karsilastirma:[
      ['What it tracks', '**Amounts owed** to vendors', '**Amounts owed by** customers'],
      ['Balance sheet side', 'Liability', 'Asset'],
      ['Invoice effect', 'The vendor is **credited**', 'The customer is **debited**'],
      ['Master data', '{{LFA1}} / {{LFB1}}', '{{KNA1}} / {{KNB1}}'],
      ['Open / cleared item', '{{BSIK}} / {{BSAK}}', '{{BSID}} / {{BSAD}}'],
      ['Integrated module', 'MM — procurement', 'SD — sales'],
      ['Account determination', '{{OBYC}}', '{{VKOA}}'],
      ['Main transaction', '{{FB60}} invoice · {{F110}} payment', '{{FB70}} invoice · {{F-28}} collection'],
      ['Line item report', '{{FBL1N}}', '{{FBL5N}}'],
      ['Document types', 'KR invoice · KZ payment', 'DR invoice · DZ collection · RV SD invoice'],
      ['Tracking tools', 'Due-date management, cash discount', '{{ihtar}}, {{kredi-limiti}}, {{supheli-alacak}}'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FB70', ad:'Customer invoice entry',
        amac:'Records a customer invoice entered directly in FI, without going through SD.',
        neZaman:'For sales not defined in SD, such as rental income, scrap sales, intercompany allocations.',
        adimlar:[
          { baslik:'Enter the customer number and company code',
            aciklama:'The moment the customer is entered, the address and payment term appear on the right-hand ' +
                     'panel. The due date and {{mutabakat-hesabi}} come **automatically** from the master data.' },
          { baslik:'Enter the invoice date, posting date, and reference' },
          { baslik:'Enter the gross amount and tax code',
            aciklama:'If "Calculate tax" is checked, SAP splits VAT out of the gross amount.' },
          { baslik:'Enter the revenue line',
            aciklama:'The G/L revenue account and amount. A {{kar-merkezi}} is entered if needed.' },
          { baslik:'Simulate and save',
            aciklama:'Once saved, an {{acik-kalem}} is created in {{BSID}} and {{yaslandirma}} begins.' },
        ],
        ekranAkisi:[
          { ekran:'Basic data', islem:'Customer C-5001 · Invoice date 05.11.2026 · Amount 48,000 · Tax code 20%' },
          { ekran:'Line item table', islem:'649 Other operating income · 40,000 · Cost center 1000' },
          { ekran:'Payment tab', islem:'Payment term ZB03 (from master data) · Due date 05.12.2026' },
          { ekran:'Simulation', islem:'120 debit 48,000 / 649 credit 40,000 / 391 credit 8,000' },
        ],
        alanlar:{
          zorunlu:['Customer','Invoice date','Posting date','Company code','Amount','G/L revenue account'],
          opsiyonel:['Reference','Header text','Cost center','Payment term','Due date','Dunning block','Assignment'] },
        hatalar:[
          { mesaj:'Customer 5001 is blocked for posting', sebep:'A posting block exists on the customer master.', cozum:'{{BP}} → FI Customer role → remove the block. If it was set for credit risk, check with credit control first.' },
          { mesaj:'Posting period ... is not open for account type D', sebep:'The period is closed for the customer account type (D).', cozum:'Open the period on the **D** line in {{OB52}}.' },
          { mesaj:'Account 120000 cannot be directly posted to', sebep:'The user mistakenly entered the reconciliation account on the revenue line.', cozum:'Enter a revenue account (6xx) on the revenue line; SAP generates the customer line automatically.' },
          { mesaj:'Tax code A1 does not appear in any G/L account item', sebep:'The tax code is on the header but not on the revenue line.', cozum:'Select the same tax code on the revenue line too.' },
        ],
        ipucu:'Write your own invoice number in the reference field. Duplicate checking isn\'t as critical in AR ' +
              'as in AP, but this number is what you and the customer will refer to during reconciliation.',
        ilgili:['FB75','VF01','FBL5N','F-28'] },

      { kod:'F-28', ad:'Post customer collection',
        amac:'Records the incoming collection to the bank/cash account and clears the customer\'s open item **in the same transaction**.',
        neZaman:'On every collection coming from a bank statement or a remittance advice. AR\'s most frequently used transaction.',
        adimlar:[
          { baslik:'Header: enter the document date, company code, bank account, and the amount collected' },
          { baslik:'Enter the customer number and click *Process open items*' },
          { baslik:'Select the items to clear',
            aciklama:'The **"Not assigned"** field at the bottom of the screen must be zero. If it isn\'t, clearing can\'t happen.' },
          { baslik:'If the amount doesn\'t fully match, use the partial or residual tab',
            aciklama:'The *Partial payment* tab leaves the original item open (the due date is preserved). ' +
                     'The *Residual item* tab clears it and generates a new item (the due date resets).' },
          { baslik:'Save',
            aciklama:'The document type becomes DZ. The item moves from {{BSID}} to {{BSAD}}.' },
        ],
        ekranAkisi:[
          { ekran:'Header', islem:'Document date 05.12.2026 · Bank account 102000 · Amount 120,000' },
          { ekran:'Open item selection', islem:'Customer C-5001 → 3 open items listed' },
          { ekran:'Item selection', islem:'1 item selected (120,000) → "Not assigned" = 0' },
          { ekran:'Save', islem:'Document 1400000123 (DZ) created' },
        ],
        alanlar:{
          zorunlu:['Document date','Company code','Bank G/L account','Amount','Customer'],
          opsiyonel:['Value date','Text','Assignment','Cost center'] },
        hatalar:[
          { mesaj:'The difference is too large for clearing', sebep:'The selected items don\'t match the collected amount, and the gap is outside the {{tolerans-grubu}}.', cozum:'Fix the selection or use partial/residual clearing. The tolerance setting is {{OBA3}}.' },
          { mesaj:'No open items found', sebep:'The customer has no open items, or down-payment items aren\'t included in the selection.', cozum:'Check with {{FBL5N}}; for a down payment, tick the **"Special G/L transactions"** box on the selection screen.' },
          { mesaj:'Enter a value date', sebep:'The bank account has value date defined as mandatory.', cozum:'Enter the date the money value-dated at the bank.' },
        ],
        ipucu:'If the customer didn\'t say which invoice they were paying, clear starting from the **oldest ' +
              'item** (FIFO). This keeps the {{yaslandirma}} report reflecting reality. A random selection ' +
              'leaves overdue receivables open and distorts the picture.',
        ilgili:['F-32','FBL5N','FB05','F-29'] },

      { kod:'FBL5N', ad:'Customer line item list',
        amac:'Lists a customer\'s open, cleared, and all items. AR\'s most used report.',
        neZaman:'For aging, reconciliation, "was this invoice collected?" questions, and checks before running dunning.',
        adimlar:[
          { baslik:'Enter the customer and company code', aciklama:'A customer range or account group can also be given.' },
          { baslik:'Choose the item type: open / cleared / all',
            aciklama:'When **Open items** is chosen, a key date is entered: "which items were open as of this date?"' },
          { baslik:'Set the layout',
            aciklama:'Add the **due date (`ZFBDT`)**, days overdue, dunning level, and assignment columns; sort by due date.' },
          { baslik:'Double-click a line → drill into the document ({{FB03}})' },
        ],
        ekranAkisi:[
          { ekran:'Selection', islem:'Customer range C-5000..C-5999 · **Open items** · Key date today' },
          { ekran:'Item list', islem:'Listed by due date; total receivable at the bottom' },
          { ekran:'Layout', islem:'Days-overdue and dunning-level columns added, subtotaled by customer' },
        ],
        ipucu:'Add **days overdue** and **dunning level** columns to the layout and make it the default. You can ' +
              'walk into a collections meeting with this single report.',
        hatalar:[
          { mesaj:'No items selected', sebep:'The criteria are too narrow, or the customer had no movement.', cozum:'Choose "All items," widen the date range.' },
        ],
        ilgili:['FD10N','S_ALR_87012168','FBL5H','F-28','F150'] },

      { kod:'F-32', ad:'Customer clearing',
        amac:'Matches offsetting customer items against each other, without entering a collection posting.',
        neZaman:'When offsetting an invoice against a credit memo; when matching a collection recorded separately ' +
                'from the bank statement against its invoice.',
        adimlar:[
          { baslik:'Enter the customer, company code, and clearing date' },
          { baslik:'Process open items → select the ones to clear' },
          { baslik:'Confirm the net amount is zero and save',
            aciklama:'If there\'s no difference, no G/L account moves; only the items get matched.' },
        ],
        ipucu:'If you clear the wrong items, {{FBRA}} reverses the clearing — no need to enter a correction posting.',
        ilgili:['F-44','F-03','FBRA','F.13'] },

      { kod:'F-29', ad:'Customer down payment received',
        amac:'Records an amount received before goods/services are delivered, in a separate account via {{ozel-ana-muhasebe-gostergesi}}.',
        neZaman:'On cash-in-advance sales, project advances, order deposits.',
        adimlar:[
          { baslik:'Enter the customer, bank account, and amount' },
          { baslik:'Choose the special G/L indicator (usually A)',
            aciklama:'This indicator redirects the posting to account 340 Advances received instead of 120 ({{OBXR}} defines this).' },
          { baslik:'Save' },
        ],
        ipucu:'A down payment is **not revenue**. It sits on the balance sheet as a liability until the invoice ' +
              'is issued. Once the invoice is issued, it\'s offset via {{F-39}} and turned into a normal receivable.',
        hatalar:[
          { mesaj:'Special G/L indicator A is not defined for account type D', sebep:'The indicator isn\'t defined for the customer side in {{OBXR}}.', cozum:'Define the indicator and the alternative reconciliation account with {{OBXR}}.' },
        ],
        ilgili:['F-39','OBXR','F-47','FBL5N'] },

      { kod:'F150', ad:'Run dunning',
        amac:'Generates a proposal by dunning level for overdue receivables, prints the dunning notices, and writes dunning data to the customer record.',
        neZaman:'At regular intervals (usually 1-2 times a month) as part of the collections process.',
        adimlar:[
          { baslik:'Enter the run date and identification',
            aciklama:'Same logic as {{F110}}: date + ID uniquely identifies a run.' },
          { baslik:'Enter the parameters: company code, customer range, dunning date' },
          { baslik:'Run the dunning proposal',
            aciklama:'The system calculates which customer will get dunned at which level. The {{ihtar-prosedürü}} and the days overdue are decisive.' },
          { baslik:'Review and edit the proposal',
            aciklama:'It\'s possible to remove a customer, change their level, or block them.' },
          { baslik:'Print the notices and update the data',
            aciklama:'The dunning level and date are written to the {{MHNK}}/{{MHND}} tables. On the next run, the customer continues from one level up.' },
        ],
        alanlar:{
          zorunlu:['Run date','ID','Company code','Dunning date'],
          opsiyonel:['Customer range','Dunning area','Only a specific procedure'] },
        hatalar:[
          { mesaj:'No accounts selected for dunning', sebep:'The customer has no {{ihtar-prosedürü}} assigned, or the days-overdue threshold hasn\'t been reached.', cozum:'{{BP}} → company code data → fill the `MAHNA` field; check the day ranges in {{FBMP}}.' },
          { mesaj:'Customer is blocked for dunning', sebep:'The customer master has a dunning block (`MANSP`).', cozum:'Leave it if the block is intentional (a dispute); otherwise remove it from {{BP}}.' },
        ],
        ipucu:'Dunning is a **sales relationship** matter. Don\'t print the proposal as-is — review it with the ' +
              'sales team. A level-3 letter sent at the wrong time can cost you a good customer.',
        ilgili:['FBMP','FBL5N','S_ALR_87012168'] },

      { kod:'VF01', ad:'Create SD invoice',
        amac:'Issues an invoice from a sales order or delivery; the FI document is created automatically once it\'s saved.',
        neZaman:'On sales of goods and standard services — the majority of invoices in corporate companies.',
        adimlar:[
          { baslik:'Enter the document to be billed (delivery or order)' },
          { baslik:'Check the items and the pricing' },
          { baslik:'Save → the SD invoice and the FI document are created together',
            aciklama:'If no FI document is created, the `RFBSK` field in {{VBRK}} stays "A" (not transferred).' },
        ],
        hatalar:[
          { mesaj:'Document ... saved (no accounting document generated)', sebep:'Revenue account determination is missing in {{VKOA}} — the most common cause.', cozum:'Define the account for the relevant account determination group in {{VKOA}}, then retry via {{VF02}} → *Release to Accounting*. **No need to cancel the invoice.**' },
          { mesaj:'Posting period is not open', sebep:'The FI period is closed.', cozum:'Open it with {{OB52}}, retransfer with {{VF02}}.' },
        ],
        ipucu:'For "the invoice was issued but never hit accounting" complaints, the first place to look is ' +
              '{{VKOA}}. The second possibility is a closed period. In both cases the invoice isn\'t canceled, ' +
              'it\'s fixed and retransferred.',
        ilgili:['VF02','VF04','VKOA','FBL5N'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'AR\'s tables are **symmetric one to one** with AP: LFA1↔KNA1, LFB1↔KNB1, BSIK↔BSID, BSAK↔BSAD. Knowing ' +
      'this symmetry lets you learn AR in half the time once you\'ve learned AP.',

    liste:[
      { ad:'KNA1', baslik:'Customer — general level',
        tutar:'Name, address, country, tax number, account group. Shared across all company codes.',
        olusturan:'{{BP}} (S/4HANA) or {{XD01}} (ECC)',
        guncelleyen:'{{BP}}, {{XD01}}, {{XD02}}',
        anahtar:'KUNNR',
        iliskiler:'1-to-n with {{KNB1}} (company code) and {{KNVV}} (sales area); {{BSEG}}.KUNNR points here.',
        s4:'The table stays, but it\'s populated by {{BP}} through CVI synchronization.',
        alanlar:[
          { ad:'KUNNR', aciklama:'Customer number' },
          { ad:'NAME1', aciklama:'Name' },
          { ad:'KTOKD', aciklama:'Account group — decides the number range and field status' },
          { ad:'SPERR / LOEVM', aciklama:'Central block / deletion flag' },
        ] },

      { ad:'KNB1', baslik:'Customer — company code level',
        tutar:'Accounting behavior: reconciliation account, payment term, dunning procedure, dunning block.',
        olusturan:'{{BP}} → FI Customer role',
        guncelleyen:'{{BP}}, {{FD02}}',
        anahtar:'KUNNR + BUKRS',
        iliskiler:'A child of {{KNA1}}; the `AKONT` field points to the reconciliation account in {{SKB1}}.',
        s4:'Unchanged; populated through {{BP}}.',
        alanlar:[
          { ad:'AKONT', aciklama:'**{{mutabakat-hesabi}}** — usually 120 Trade receivables' },
          { ad:'ZTERM', aciklama:'{{odeme-kosulu}} — the due date is calculated from this' },
          { ad:'MAHNA', aciklama:'{{ihtar-prosedürü}} — {{F150}} looks at this' },
          { ad:'MANSP', aciklama:'Dunning block — if filled, the customer receives no dunning' },
          { ad:'ZUAWA', aciklama:'Sort key — fills the `ZUONR` field' },
        ] },

      { ad:'BSID', baslik:'Customer open items',
        tutar:'Uncollected customer invoices. {{FBL5N}}\'s open item option and {{F150}}\'s dunning selection are fed from here.',
        olusturan:'Every posting to a customer ({{FB70}}, {{VF01}})',
        guncelleyen:'Posting transactions; once collected, the item moves to {{BSAD}}',
        anahtar:'BUKRS + KUNNR + UMSKS + UMSKZ + AUGDT + AUGBL + ZFBDT + BELNR + BUZEI',
        iliskiler:'Linked to the customer via {{KNB1}}, to the document line via {{BSEG}}.',
        s4:'**The physical table was removed**; produced as a {{uyumluluk-view}} from {{ACDOCA}}.',
        alanlar:[
          { ad:'ZFBDT', aciklama:'Baseline date — the due date is calculated from this' },
          { ad:'MANSP', aciklama:'Dunning block — at item level' },
          { ad:'MAHNS', aciklama:'Dunning level reached' },
          { ad:'UMSKZ', aciklama:'{{ozel-ana-muhasebe-gostergesi}} — separates advances and doubtful receivables' },
        ] },

      { ad:'BSAD', baslik:'Customer cleared items',
        tutar:'Collected customer items. Moves here from {{BSID}} once cleared.',
        olusturan:'A {{kapatma}} transaction ({{F-28}}, {{F-32}})',
        guncelleyen:'Clearing transactions; if reversed with {{FBRA}}, the item returns to {{BSID}}',
        anahtar:'BUKRS + KUNNR + AUGDT + AUGBL + GJAHR + BELNR + BUZEI',
        s4:'Turned into a {{uyumluluk-view}}.' },

      { ad:'VBRK', baslik:'SD invoice header',
        tutar:'The SD invoice\'s customer, date, net amount, and **transfer-to-accounting status**.',
        olusturan:'{{VF01}} / {{VF04}}',
        guncelleyen:'{{VF01}}, {{VF02}}',
        anahtar:'VBELN',
        iliskiler:'Its items via {{VBRP}}; the FI document via {{BKPF}} through `AWKEY`.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'RFBSK', aciklama:'**Transfer status**: C = transferred, A = not transferred. The first field to check when diagnosing an issue.' },
          { ad:'NETWR', aciklama:'Net invoice amount' },
          { ad:'FKART', aciklama:'Invoice type (F2 standard, G2 credit memo)' },
        ] },

      { ad:'VBRP', baslik:'SD invoice items',
        tutar:'Invoice lines. Revenue account determination looks at these lines\' material and account-determination group.',
        olusturan:'{{VF01}}',
        guncelleyen:'{{VF01}}, {{VF02}}',
        anahtar:'VBELN + POSNR',
        iliskiler:'A child of {{VBRK}}; the input for {{VKOA}} account determination.',
        s4:'Unchanged.' },

      { ad:'KNKK', baslik:'Customer credit management data',
        tutar:'{{kredi-limiti}} and utilized risk by credit control area.',
        olusturan:'FD32 (ECC) / {{UKM_BP}} (S/4HANA)',
        guncelleyen:'Credit management transactions',
        anahtar:'KUNNR + KKBER',
        s4:'S/4HANA uses SAP Credit Management (UKMBP_CMS_SGM); KNKK is for compatibility.' },

      { ad:'MHNK', baslik:'Dunning data — header',
        tutar:'The last dunning date and the dunning level reached, by customer.',
        olusturan:'{{F150}}',
        guncelleyen:'Every dunning run',
        anahtar:'KUNNR + BUKRS + MABER + MANST',
        iliskiler:'Item-level dunning detail via {{MHND}}.',
        s4:'Unchanged.' },
    ],

    er:{
      type:'er',
      baslik:'AR table relationships — from customer to collection',
      varliklar:[
        { ad:'KNA1', rol:'Master data', aciklama:'Customer identity',
          alanlar:[{ ad:'KUNNR', tip:'pk' }, { ad:'NAME1' }, { ad:'KTOKD' }] },
        { ad:'KNB1', rol:'Master data', aciklama:'Customer accounting data',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT' }, { ad:'MAHNA' }] },
        { ad:'VBRK', rol:'SD', aciklama:'SD invoice header',
          alanlar:[{ ad:'VBELN', tip:'pk' }, { ad:'KUNRG', tip:'fk' }, { ad:'RFBSK' }] },
        { ad:'BKPF', rol:'Header', aciklama:'FI document header',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'AWKEY' }] },
        { ad:'BSEG', rol:'Line item', hub:true, aciklama:'FI document items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'KUNNR', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'BSID', rol:'Index', aciklama:'Open items',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZFBDT' }, { ad:'MAHNS' }] },
        { ad:'BSAD', rol:'Index', aciklama:'Cleared items',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'AUGBL' }, { ad:'AUGDT' }] },
        { ad:'MHNK', rol:'Dunning', aciklama:'Dunning history',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'MANST' }, { ad:'MADAT' }] },
      ],
      iliskiler:[
        { from:'KNA1', to:'KNB1', alanlar:'KUNNR', not:'general → company code' },
        { from:'KNB1', to:'BSEG', alanlar:'KUNNR + BUKRS', not:'the customer\'s items' },
        { from:'VBRK', to:'BKPF', alanlar:'VBELN → AWKEY', not:'SD invoice → FI document' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'header → line item' },
        { from:'BSEG', to:'BSID', alanlar:'BELNR + BUZEI', not:'the open item index' },
        { from:'BSID', to:'BSAD', alanlar:'after collection', not:'moves here once cleared' },
        { from:'BSID', to:'MHNK', alanlar:'KUNNR + BUKRS', not:'the dunning level is tracked' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Daily work in AR happens on three screens: **entering an invoice** ({{FB70}}), **recording a collection** ' +
      '({{F-28}}), and **tracking receivables** ({{FBL5N}}). The critical point is item selection in {{F-28}} — ' +
      'the decision made there determines the accuracy of the aging report.',

    ekranlar:[
      { ad:'{{FB70}} — Basic data tab',
        aciklama:'The invoice\'s header information. The moment the customer is entered, values from the master data fill the screen.',
        alanlar:[
          { ad:'Customer', zorunlu:true, aciklama:'Once entered, the address and payment term appear in the right panel.' },
          { ad:'Invoice date (`BLDAT`)', zorunlu:true, aciklama:'Usually the baseline date for the due-date calculation.' },
          { ad:'Posting date (`BUDAT`)', zorunlu:true, aciklama:'Determines the accounting period.' },
          { ad:'Amount', zorunlu:true, aciklama:'Gross amount (VAT included).' },
          { ad:'Tax code', zorunlu:false, aciklama:'Requested if the revenue account\'s tax category makes it mandatory.' },
        ] },

      { ad:'{{F-28}} — Open item selection screen',
        aciklama:'AR\'s most critical screen. Which item gets cleared is decided here, and this decision directly affects aging.',
        alanlar:[
          { ad:'Bank G/L account', zorunlu:true, aciklama:'The account the money entered.' },
          { ad:'Amount', zorunlu:true, aciklama:'Total collected.' },
          { ad:'Item selection', zorunlu:true, aciklama:'**The "Not assigned" field must be zero.** If it isn\'t, clearing can\'t happen.' },
          { ad:'Partial payment tab', zorunlu:false, aciklama:'Leaves the original item open, **the due date is preserved**. The default choice in AR.' },
          { ad:'Residual item tab', zorunlu:false, aciklama:'Closes the original, generates a new item, **the due date resets**. Used carefully.' },
          { ad:'Special G/L transactions box', zorunlu:false, aciklama:'Includes down-payment and doubtful-receivable items in the list.' },
        ],
        ipucu:'If the customer hasn\'t said which invoice they\'re paying, clear from the **oldest item**. A ' +
              'random selection leaves overdue receivables open and distorts aging.' },

      { ad:'{{FBL5N}} — Aging view',
        aciklama:'The working screen that shows the distribution of receivables by due date.',
        alanlar:[
          { ad:'Item type', zorunlu:true, aciklama:'**Open items** + key date.' },
          { ad:'Layout', zorunlu:false, aciklama:'Due date, days overdue, dunning level, and assignment columns are added.' },
          { ad:'Sort/subtotal', zorunlu:false, aciklama:'Subtotaled by customer; the riskiest customers rise to the top.' },
        ] },
    ],

    zorunlu:['Customer','Invoice/document date','Posting date','Company code','Amount','G/L account (FB70) or bank account (F-28)'],
    opsiyonel:['Reference','Header text','Cost center','Payment term','Due date','Dunning block','Assignment','Value date'],

    hatalar:[
      { mesaj:'Posting period ... is not open for account type D', sebep:'The period is closed for the customer account type.', cozum:'Open the period on the **D** line in {{OB52}}. Opening the S line isn\'t enough.' },
      { mesaj:'Customer ... is blocked for posting', sebep:'{{KNA1}} `SPERR` or a {{KNB1}} posting block.', cozum:'Remove the block in the FI Customer role via {{BP}}. If it was set for credit risk, check with credit control first.' },
      { mesaj:'Document ... saved (no accounting document generated)', sebep:'The SD invoice wasn\'t transferred to accounting — revenue account determination is missing in {{VKOA}}.', cozum:'Complete {{VKOA}}, then {{VF02}} → *Release to Accounting*. Don\'t cancel the invoice.' },
      { mesaj:'The difference is too large for clearing', sebep:'The collection doesn\'t match the selected items.', cozum:'Use partial or residual clearing; the tolerance is at {{OBA3}}.' },
      { mesaj:'No open items found (F-28)', sebep:'Advance/doubtful-receivable items don\'t come into the normal selection.', cozum:'Tick the **"Special G/L transactions"** box on the selection screen.' },
      { mesaj:'Credit limit exceeded (on a sales order)', sebep:'The customer\'s {{kredi-limiti}} was exceeded.', cozum:'Wait for a collection, or ask the credit manager for a limit increase/release ({{UKM_BP}}).' },
      { mesaj:'No accounts selected for dunning', sebep:'{{ihtar-prosedürü}} isn\'t assigned, or the days-overdue threshold hasn\'t been reached.', cozum:'Fill the `MAHNA` field via {{BP}}; check the day ranges in {{FBMP}}.' },
    ],

    ipuclari:[
      'Add **days overdue** and **dunning level** columns to the {{FBL5N}} layout and make it the default — this ' +
      'becomes the single report for the collections meeting.',
      'Adopt the discipline of **clearing from the oldest item (FIFO)** on collections. This keeps aging ' +
      'reflecting reality and makes collection performance measurable.',
      'Don\'t use {{kalan-kapatma}} except in exceptional cases; it resets the due date and hides overdue receivables.',
      'Processing bulk collections from a bank statement through {{FEBAN}} is faster than {{F-28}} — the ' +
      'statement line links directly to the open item.',
      'Review the dunning proposal **with the sales team** before printing. Dunning isn\'t a technical ' +
      'transaction, it\'s a customer-relationship decision.',
      'Pull an aging report with {{S_ALR_87012168}} at period end and send the 90+ day group for ' +
      '{{supheli-alacak}} evaluation. This is the first analysis an auditor asks for.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'FI document header; if it comes from SD, `AWTYP` = VBRK, `AWKEY` = the SD invoice number' },
      { tablo:'BSEG', ne:'Items; on the customer line `KUNNR` is filled, `AUGBL` is blank (an open item)' },
      { tablo:'ACDOCA', ne:'Universal items; the customer, cost center, and revenue account on the same line' },
      { tablo:'BSID', ne:'The customer\'s open item (via a view in S/4HANA)' },
      { tablo:'BSET', ne:'Output VAT lines' },
      { tablo:'VBRK', ne:'If it\'s an SD invoice, the `RFBSK` field becomes "C" (transferred)' },
      { tablo:'MHNK', ne:'If dunning was run, the customer\'s dunning level and date' },
    ],

    commit:
      'Invoice and collection postings are written in a single LUW. **The SD invoice is different:** {{VF01}} ' +
      'first writes the SD document ({{VBRK}}/{{VBRP}}), then triggers the transfer to accounting. If this ' +
      'second step fails, the **SD invoice ends up saved but no FI document is created**, and the `RFBSK` field ' +
      'stays "A." That\'s why, after an SD invoice is issued, whether it hit accounting must be checked — ' +
      'there\'s no such interim state in AP.',

    belgeNo:
      'Assigned at the moment of posting, from the range tied to the document type. Typical types in AR: **DR** ' +
      'customer invoice (FI), **DG** customer credit memo, **DZ** customer collection, **RV** SD invoice. An SD ' +
      'invoice produces **two numbers**: the SD invoice number ({{VBRK}}) and the FI document number ({{BKPF}}) ' +
      '— in most setups these are configured to match (the SD invoice type is aligned with the FI number range), ' +
      'but it isn\'t mandatory.',

    postingLogic:
      '{{FB70}} chain: customer → {{mutabakat-hesabi}} and {{odeme-kosulu}} from {{KNB1}} → revenue line ' +
      '(entered by the user) → tax line (automatic) → balance check → number → write.\n\n' +
      '{{VF01}} chain: SD invoice → pricing conditions → {{VKOA}} account determination (sales organization + ' +
      'account determination group + material group) → FI document → {{BSID}} open item.',

    belgeTuru:
      'AR document types decide which account types are allowed. The **DR** type allows customer (D) and G/L ' +
      '(S) account types, and doesn\'t allow postings to a vendor (K) account. The **RV** type is reserved for ' +
      'SD invoices and usually uses its own number range.',

    numberRange:
      'Defined per company code + fiscal year with {{FBN1}}. The SD invoice number range is defined separately ' +
      'on the SD side. **Both** must be opened at the start of the year.',

    accountDetermination:
      'In {{FB70}}, the user enters the revenue account; the tax and customer lines are automatic.\n\n' +
      'In {{VF01}}, every account is automatic and determined by {{VKOA}}. Determination criteria: **sales ' +
      'organization + account determination group (customer) + account determination group (material) + ' +
      'account key**. The account key comes from the pricing condition: ERL revenue, ERS discount, ERF freight. ' +
      'All of it writes to table {{T030}}.',

    tur:
      '**Master data:** customer records ({{KNA1}}/{{KNB1}}/{{KNVV}}), credit limits.\n\n' +
      '**Configuration:** customer account groups, {{odeme-kosulu}}, the {{FBMP}} dunning procedure, {{VKOA}} ' +
      'account determination, {{OBXR}} special G/L indicators, tolerance groups, document types.\n\n' +
      '**Transaction data:** invoices, collections, dunning runs.',

    transport:
      'Payment terms, dunning procedures, {{VKOA}} account determination, and tolerance groups transport. ' +
      'Customer records, credit limits, and documents don\'t.',

    img:[
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Customer Accounts → Master Data → Preparations for Creating Customer Master Data → Define Account Groups with Screen Layout (Customers)', not:'Account group and field status' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Incoming Invoices/Credit Memos → Define Terms of Payment', not:'{{odeme-kosulu}} — the due date' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Dunning → Define Dunning Procedures', not:'{{FBMP}} — dunning levels and day ranges' },
      { yol:'SPRO → Sales and Distribution → Basic Functions → Account Assignment/Costing → Revenue Account Determination', not:'{{VKOA}} — SD revenue account determination' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Incoming Payments → Down Payment Received → Define Reconciliation Accounts for Customer Down Payments', not:'{{OBXR}} — down-payment and doubtful-receivable indicators' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Incoming Payments → Manual Incoming Payments → Define Tolerances (Customers)', not:'{{OBA3}} — clearing tolerance limits' },
    ],

    ekstra:[
      { ic:'📉', baslik:'How is aging read?', metin:
        'Aging groups open items by the number of days elapsed **since the due date**: not yet due · 1-30 · ' +
        '31-60 · 61-90 · 90+ days.\n\n' +
        'Interpretation rules: if the **90+ group exceeds 5% of the total**, the collections process is weak. If ' +
        'a single customer makes up more than half of the 90+ group, there\'s a **concentration risk**. If the ' +
        'not-yet-due group\'s share is low, either due dates are very short or sales have slowed down.\n\n' +
        'This analysis is pulled with {{FBL5N}} or {{S_ALR_87012168}} and feeds the {{supheli-alacak}} decision.' },

      { ic:'🔗', baslik:'The AR–SD integration failure point', metin:
        'When an SD invoice is issued, the FI document is expected to be created **automatically**. If it ' +
        'isn\'t, the `RFBSK` field in {{VBRK}} stays "A" (not transferred).\n\n' +
        'Causes in order of frequency: **(1)** account determination missing in {{VKOA}}, **(2)** the FI period ' +
        'is closed, **(3)** the revenue account is blocked or closed for posting, **(4)** {{belge-bolme}} rules ' +
        'couldn\'t classify the line.\n\n' +
        'The fix is always the same: remove the gap, retry via {{VF02}} → *Release to Accounting*. **The ' +
        'invoice doesn\'t need to be canceled**, and canceling it is wrong — it wastes a number on the SD side.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Residual clearing distorts aging', metin:
        'Because {{kalan-kapatma}} generates a new item, the due date starts **from today**. A 90-day-overdue ' +
        'receivable starts looking "not yet due" after a partial collection. Every report measuring collection ' +
        'performance breaks, and the {{ihtar}} process resets. The default choice in AR should be **partial clearing**.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'AR\'s business logic hasn\'t changed. What changed: **the customer master moving to {{BP}}**, **credit ' +
      'management being completely rebuilt** (FD32 → SAP Credit Management), and **the index tables turning ' +
      'into {{uyumluluk-view}}s**.',

    eccFarklari:[
      { konu:'Customer master data', ecc:'{{FD01}} / {{XD01}}', s4:'{{BP}} mandatory — via the FI Customer role' },
      { konu:'The same party as both customer and vendor', ecc:'Two separate master records', s4:'A single BP record, two roles' },
      { konu:'Credit management', ecc:'FD32 — within FI-AR', s4:'{{UKM_BP}} — SAP Credit Management (FIN-FSCM-CR), a separate component' },
      { konu:'Open item table', ecc:'{{BSID}} / {{BSAD}} physical table', s4:'{{uyumluluk-view}} — data from {{ACDOCA}}' },
      { konu:'Terminology', ecc:'Customer', s4:'**Customer** stayed the same (Vendor became Supplier, Customer didn\'t change)' },
      { konu:'Item report', ecc:'{{FBL5N}}', s4:'{{FBL5N}} still works; {{FBL5H}} and Fiori are recommended' },
      { konu:'Collections management', ecc:'Manual tracking', s4:'FSCM Collections Management with a worklist and scoring' },
    ],

    universalJournal:
      'AR items are held in {{ACDOCA}} with the customer number, cost center, and revenue account **on the same ' +
      'line**. The practical result: "how much revenue did we make on which product with which customer, and ' +
      'how much is still uncollected?" is answered from a single table. It used to require combining {{BSID}} + ' +
      '{{VBRP}} + CO-PA.',

    kalkanTcodes:[
      { eski:'{{FD01}} / {{FD02}} / {{FD03}}', yeni:'{{BP}}', not:'Customer master data — removed' },
      { eski:'{{XD01}} / {{XD02}}', yeni:'{{BP}}', not:'Redirects to the BP transaction' },
      { eski:'FD32 / FD33', yeni:'{{UKM_BP}}', not:'Credit management moved entirely to the new component' },
      { eski:'The old F.2x series of aging reports', yeni:'{{FBL5N}} / Fiori', not:'The new reports are preferred' },
    ],

    fiori:[
      { ad:'Manage Customer Line Items', aciklama:'Replaces {{FBL5N}}; supports aging visualization and mass processing.' },
      { ad:'Post Incoming Payments', aciklama:'Replaces {{F-28}}; shows open items with an automatic matching proposal.' },
      { ad:'Create Outgoing Invoices', aciklama:'Replaces {{FB70}}.' },
      { ad:'Manage Dunning Notices', aciklama:'Manages the {{F150}} proposal as a visual worklist.' },
      { ad:'Days Sales Outstanding (DSO)', aciklama:'Analyzes the average collection period — AR\'s key performance indicator.' },
      { ad:'Process Receivables', aciklama:'FSCM Collections — a customer-level collections task list and contact history.' },
    ],

    compatibilityViews:[
      '{{BSID}}, {{BSAD}} — the customer open/cleared item indexes are now views produced from {{ACDOCA}}.',
      '{{KNC1}} — customer periodic balances also turned into a view.',
      '**Writing to these views is not possible**; old Z-programs that INSERT directly into {{BSID}} break during migration.',
      '{{KNA1}} and {{KNB1}} still exist as physical tables but are populated by {{BP}}.',
    ],

    performans:
      'Because aging and open item reports run through {{ACDOCA}}, there\'s a marked speed-up for large customer ' +
      'portfolios. {{F150}} dunning selection speeds up too. In contrast, old custom reports running through a ' +
      '{{uyumluluk-view}} stay slow — that\'s the first place to look at a performance complaint.',

    bestPractices:[
      'Migrate credit management to {{UKM_BP}} during the transition; FD32 data doesn\'t convert automatically, ' +
      'it\'s a separate migration step.',
      'Build new reports on {{ACDOCA}} or a CDS view instead of {{BSID}}.',
      'Clean up duplicate customers before migration; merging them in {{BP}} is much harder afterward.',
      'Simplify payment terms — the dozens accumulated over the years should be reviewed during migration.',
      'Consider structuring the collections process with FSCM Collections Management; moving Excel-based ' +
      'tracking lists into the system is AR\'s fastest win.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'The life of a receivable: from sale to collection, from delay to doubtful receivable',
    hikaye:
      '**Marmara Textiles Inc.** makes a 120,000 TRY sale to its dealer **Ankara Textiles Ltd.** (C-5001). The ' +
      'payment term is 30 days. The dealer doesn\'t pay on time, makes a partial payment, receives a dunning ' +
      'notice, and the remaining amount eventually turns into a doubtful receivable. This scenario shows every ' +
      'stage of AR — the good and the bad path together.',
    veriler:[
      { k:'Company code', v:'1000 — Marmara Textiles Inc.' },
      { k:'Customer', v:'C-5001 Ankara Textiles Ltd. · reconciliation account 120000' },
      { k:'Payment term', v:'ZB03 — net 30 days' },
      { k:'Dunning procedure', v:'Z001 — 4 levels (10 / 20 / 30 / 45 days overdue)' },
      { k:'Sale', v:'100,000 TRY + 20% VAT = 120,000 TRY · cost 60,000 TRY' },
      { k:'Period', v:'November–December 2026' },
    ],

    adimlar:[
      { baslik:'A sales order is taken — credit check', tcode:'VA01',
        aciklama:'The sales rep enters the order. The system checks the customer\'s {{kredi-limiti}}: limit ' +
                 '500,000 TRY, current risk 180,000 TRY → the order is released.',
        girdi:[
          { alan:'Customer', deger:'C-5001 Ankara Textiles Ltd.' },
          { alan:'Material / Quantity', deger:'FABRIC-220 · 500 meters' },
          { alan:'Net value', deger:'100,000 TRY' },
          { alan:'Credit check', deger:'Limit 500,000 · Risk 180,000 → **released**' },
        ],
        not:'**No FI posting.** An order is a commitment. Had the credit limit been exceeded, the order would ' +
             'be blocked and shipment would stop.' },

      { baslik:'Goods are shipped — the cost is recorded, no receivable yet', tcode:'VF01',
        aciklama:'The shipment goes out. Stock decreases and the cost is expensed. But the customer receivable ' +
                 '**hasn\'t arisen yet**, because no invoice has been issued.',
        fis:{ baslik:'Document 4900000567 — Goods issue', belgeTuru:'WL', tarih:'03.11.2026',
          satirlar:[
            { hesap:'621', ad:'Cost of goods sold', borc:60000 },
            { hesap:'153', ad:'Trade goods (stock)', alacak:60000 },
          ], not:'There\'s no revenue yet, only cost. This interim state is tracked at period end as "goods delivered, not yet invoiced."' },
        tabloEtkisi:[
          { tablo:'MSEG', ne:'The goods issue movement (601)' },
        ] },

      { baslik:'The invoice is issued — the receivable arises', tcode:'VF01',
        aciklama:'The billing team issues the invoice from the delivery. **The FI document is created ' +
                 'automatically**; accounting enters nothing.',
        girdi:[
          { alan:'Delivery', deger:'80001234' },
          { alan:'Invoice type', deger:'F2 — standard invoice' },
          { alan:'Net amount / VAT', deger:'100,000 / 20,000 TRY' },
          { alan:'Due date — automatic', deger:'05.12.2026 (30 days, from ZB03)' },
        ],
        fis:{ baslik:'Document 1800000091 — SD invoice', belgeTuru:'RV', tarih:'05.11.2026',
          satirlar:[
            { hesap:'120', ad:'Trade receivables — C-5001', borc:120000, not:'{{mutabakat-hesabi}} — the receivable arose' },
            { hesap:'600', ad:'Domestic sales', alacak:100000, not:'{{VKOA}} account determination' },
            { hesap:'391', ad:'Output VAT', alacak:20000 },
          ], not:'The profit on the sale: 100,000 revenue − 60,000 cost = **40,000 TRY**. But it hasn\'t been **collected** yet.' },
        tabloEtkisi:[
          { tablo:'VBRK', ne:'SD invoice header; `RFBSK` = **C** (transferred to accounting ✓)' },
          { tablo:'BKPF', ne:'`AWTYP` = VBRK, `AWKEY` = 90005678 → the source is traceable' },
          { tablo:'BSID', ne:'New **open item**: 120,000 TRY, due 05.12.2026' },
          { tablo:'BSET', ne:'Tax line: base 100,000, VAT 20,000' },
        ],
        not:'Had the `RFBSK` field stayed "A," no FI document would have been created — the reason is almost always missing {{VKOA}} configuration.' },

      { baslik:'The due date passes, no payment comes — 1st dunning letter', tcode:'F150',
        aciklama:'The 05.12 due date arrived but there\'s no payment. Dunning is run on 15.12 (10 days overdue).',
        girdi:[
          { alan:'Run date / ID', deger:'15.12.2026 / AR01' },
          { alan:'Dunning procedure', deger:'Z001 — level 1 (10 days overdue)' },
          { alan:'Result', deger:'A level-1 dunning notice was printed for C-5001' },
        ],
        tabloEtkisi:[
          { tablo:'MHNK', ne:'The customer\'s dunning level = 1, last dunning date 15.12.2026' },
          { tablo:'BSID', ne:'On the item, `MAHNS` = 1 (dunning level reached)' },
        ],
        not:'Dunning does **not** produce an accounting posting; it only writes tracking data. There\'s no accounting effect.' },

      { baslik:'A partial payment comes in — 70,000 TRY', tcode:'F-28',
        aciklama:'The dealer sends 70,000 TRY and asks for time on the rest. The AR specialist chooses ' +
                 '**partial clearing** — because preserving the original due date is essential for tracking the delay.',
        girdi:[
          { alan:'Bank account / Amount', deger:'102000 / 70,000 TRY' },
          { alan:'Customer', deger:'C-5001 → open item listed (120,000)' },
          { alan:'Selection', deger:'**Partial payment** tab → 70,000 TRY entered' },
        ],
        fis:{ baslik:'Document 1400000234 — Partial collection', belgeTuru:'DZ', tarih:'22.12.2026',
          satirlar:[
            { hesap:'102', ad:'Banks', borc:70000, not:'Cash came in' },
            { hesap:'120', ad:'Trade receivables — C-5001', alacak:70000, not:'{{kismi-kapatma}} item' },
          ], not:'**No revenue posting** — revenue had been recorded on the invoice. This is only an asset conversion.' },
        tabloEtkisi:[
          { tablo:'BSID', ne:'Two open items: the original **+120,000** (due 05.12, still open) and the payment **−70,000**' },
        ],
        not:'Had {{kalan-kapatma}} been chosen, the original item would close, a new 50,000 TRY item would be ' +
             'generated, and **its due date would start from 22.12** — the 17-day delay would be erased, the ' +
             'dunning level reset. That\'s why partial clearing was chosen.' },

      { baslik:'The delay continues — 3rd dunning letter and a credit block', tcode:'F150',
        aciklama:'No payment comes in for the remaining 50,000 TRY. At 45 days overdue a level-3 dunning letter ' +
                 'goes out and the customer\'s credit limit is lowered.',
        girdi:[
          { alan:'Dunning level', deger:'3 — a harsh warning with default interest' },
          { alan:'Credit limit', deger:'500,000 → lowered to 200,000 TRY ({{UKM_BP}})' },
          { alan:'Result', deger:'New orders are automatically blocked' },
        ],
        not:'AR is not only accounting, it\'s **risk management**. An uncollectible receivable halts new sales.' },

      { baslik:'Period end — the allowance for doubtful receivables is booked', tcode:'F-30',
        aciklama:'At the 31.12 close, the remaining 50,000 TRY is in the 90+ day group. The accounting manager books an allowance.',
        girdi:[
          { alan:'Aging', deger:'{{S_ALR_87012168}} → 50,000 TRY, 90+ days' },
          { alan:'Decision', deger:'100% allowance to be booked' },
          { alan:'Special G/L indicator', deger:'E — doubtful receivable' },
        ],
        fis:{ baslik:'Document 1000000891 — Allowance for doubtful receivables', belgeTuru:'SA', tarih:'31.12.2026',
          satirlar:[
            { hesap:'654', ad:'Allowance expense', borc:50000, not:'Expense arose — profit decreases' },
            { hesap:'129', ad:'Allowance for doubtful trade receivables', alacak:50000, not:'Contra-asset' },
          ], not:'**The receivable wasn\'t written off.** Account 120 still shows 50,000 TRY; account 129 ' +
                 'brings it to zero on the balance sheet. If the customer pays later, the allowance is reversed and recorded as income.' },
        tabloEtkisi:[
          { tablo:'BSID', ne:'The item was classified as a doubtful receivable with `UMSKZ` = E' },
        ] },
    ],

    sonuc:
      '**Bottom line:** 100,000 TRY of revenue was recorded, 60,000 TRY of cost was posted — **40,000 TRY of ' +
      'profit** on paper. But only 70,000 TRY was collected, and an allowance was booked for 50,000 TRY (a ' +
      '50,000 TRY expense). The real outcome: 100,000 − 60,000 − 50,000 = **−10,000 TRY loss**.\n\n' +
      '**Three key lessons:**\n\n' +
      '**1. A sale doesn\'t generate profit, collection does.** Profit appears the moment the invoice is issued, ' +
      'but if it\'s never collected, the allowance expense erases that profit. This is AR\'s reason for existing.\n\n' +
      '**2. The choice between {{kismi-kapatma}} and {{kalan-kapatma}} is a managerial decision, not a technical ' +
      'one.** Had residual clearing been chosen, the 17-day delay would have been erased from the record, the ' +
      'dunning process reset, and the customer\'s real risk made invisible.\n\n' +
      '**3. With a doubtful receivable, the receivable is not written off — an allowance is booked.** Account ' +
      '120 keeps showing the debt (legal recovery continues), account 129 nets it out on the balance sheet. If ' +
      'collection happens, the allowance is reversed.',
  },

  },
});
