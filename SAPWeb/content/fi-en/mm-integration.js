/* ==========================================================================
   content/fi-en/mm-integration.js — English body for "MM Integration"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'mm-integration',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'MM integration is **the automatic conversion of material movements and purchasing invoices into an ' +
      'accounting document**. The warehouse clerk receives goods and enters nothing else — but a document is ' +
      'created in FI.\n\n' +
      'The heart of this automation is **{{hesap-belirleme}}**: the system looks up which G/L account to post ' +
      'to in the {{OBYC}} rule table. If the rule is missing, no document is created and the goods receipt comes ' +
      'to a halt.\n\n' +
      'For an FI consultant, MM integration is **not an optional topic**: in corporate companies, the majority ' +
      'of FI documents come from MM. The answer to "why was this account debited?" is often found in {{OBYC}}.',

    neden:
      '**Volume.** Thousands of material movements happen every month; they cannot be entered by hand.\n\n' +
      '**Consistency.** The same type of movement always goes to the same account; it is never left to user judgment.\n\n' +
      '**Simultaneity.** The moment stock physically moves, accounting moves with it; no delay or reconciliation ' +
      'gap arises.\n\n' +
      '**Control.** Thanks to {{uc-yonlu-eslestirme}}, the order, goods receipt, and invoice are automatically ' +
      'compared; a mismatch blocks payment.',

    sirketOnemi:
      'If MM–FI integration is set up wrong, the result is silent and costly: **stock accumulates in the wrong ' +
      'account**, costs land in the wrong place, the {{gr-ir}} account inflates, and no one notices because no ' +
      'error message ever appears.\n\n' +
      'For consulting, this topic sits **at the intersection of two modules** and the boundary of responsibility ' +
      'is blurry. The MM consultant says "account determination is FI\'s job," the FI consultant says "the ' +
      'movement type is MM\'s job." In reality, whoever sets up {{OBYC}} has to know **both**.\n\n' +
      'The discriminating question is: **"what do the BSX, WRX, and PRD transaction keys do in OBYC?"**',

    gercekHayat:
      'A manufacturing company defines a new raw-material group and tries to post the first goods receipt for ' +
      'it. The warehouse clerk gets an error in {{MIGO}}:\n\n' +
      '*"Account determination for entry INT BSX 3020 not possible"*\n\n' +
      'The warehouse clerk calls the MM consultant, who redirects to the FI consultant. The real cause: the ' +
      'material has a **new {{degerleme-sinifi}}** (3020) and {{OBYC}} has no stock account defined for that class.\n\n' +
      'The fix takes 30 seconds, but **finding it** takes half a day — because the error message shows up in MM, ' +
      'and the fix lies in FI. This is the typical difficulty of integration topics.',

    muhasebeMantigi:
      'The accounting logic of MM integration is **a three-stage chain**:\n\n' +
      '**1. Goods receipt:** stock increases (an asset), the {{gr-ir}} account is credited in return. The ' +
      'vendor is **not yet debited** — the invoice hasn\'t arrived.\n\n' +
      '**2. Invoice entry:** {{gr-ir}} closes with a debit, the vendor is credited. If there is a price ' +
      'difference, it goes to a separate account.\n\n' +
      '**3. Consumption:** when the material is used, stock decreases, and an expense (or production cost) arises.\n\n' +
      'The {{gr-ir}} account in the middle of the chain is **the meeting point of the goods and the invoice**. ' +
      'It zeroes out once both have arrived; if one is missing, it carries a balance.',

    kavramlar: ['hesap-belirleme', 'degerleme-sinifi', 'fiyat-kontrolu', 'malzeme-hareket-turu',
                'gr-ir', 'uc-yonlu-eslestirme', 'mutabakat-hesabi', 'maliyet-yeri'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'MM integration is the accounting leg of the **Procure-to-Pay** chain. Knowing what happens (or doesn\'t ' +
      'happen) in FI at each step of the chain is the foundation for solving integration problems.',

    roller:[
      { rol:'Requesting department', gorev:'Opens a purchase requisition. No FI entry.' },
      { rol:'Purchasing', gorev:'Opens the order ({{ME21N}}); sets the **account assignment category** — this changes the shape of the FI entry.' },
      { rol:'Warehouse / Goods receipt', gorev:'Receives the goods ({{MIGO}}). **The first FI entry is born here.**' },
      { rol:'AP accounting', gorev:'Processes the invoice ({{MIRO}}); investigates variances, resolves blocks ({{MRBR}}).' },
      { rol:'Production / Cost', gorev:'Consumes the material; stock turns into an expense or a production cost.' },
      { rol:'General ledger accounting', gorev:'Performs {{gr-ir}} analysis at period end ({{F.19}}, {{MR11}}).' },
      { rol:'FI + MM consultant', gorev:'Designs {{OBYC}} account determination together; tests it with {{OMWB}}.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'From MM to FI — what happens at which step?',
      adimlar:[
        { ic:'🛒', rol:'Purchasing', baslik:'A purchase order is opened ({{ME21N}})',
          aciklama:'The **account assignment category** is set here: blank = stock purchase, K = cost center, ' +
                   'A = fixed asset, F = internal order. This choice completely changes the goods receipt\'s FI ' +
                   'entry. **There is no FI entry** — the order is a commitment.',
          cikti:'{{EKKO}} / {{EKPO}}', ok:'goods arrive' },
        { ic:'📦', rol:'Warehouse', baslik:'Goods receipt ({{MIGO}}) — the first FI entry',
          aciklama:'Movement type **101**. For a stock purchase: stock debit ({{OBYC}} → **BSX**), {{gr-ir}} ' +
                   'credit (**WRX**). For a cost-center purchase: expense debited directly (**GBB/VBR**).',
          cikti:'{{MSEG}} + FI document', ok:'invoice arrives' },
        { ic:'🧾', rol:'AP accounting', baslik:'Invoice entry ({{MIRO}})',
          aciklama:'{{gr-ir}} debited (closes), vendor credited. If there is a price difference, it goes to ' +
                   '**PRD** (for a standard-priced material) or to **stock** (for moving average).',
          cikti:'{{RBKP}}/{{RSEG}} + FI document', ok:'blocked if there is a variance' },
        { ic:'🚦', rol:'AP accounting', baslik:'Variance check and block',
          aciklama:'If the price/quantity variance is outside tolerance, the invoice is **blocked for ' +
                   'payment**. It is investigated and released with {{MRBR}}.',
          cikti:'Payable item', ok:'material is used' },
        { ic:'🏭', rol:'Production / Consumption', baslik:'The material is consumed',
          aciklama:'Movement type **201** (to a cost center) or **261** (to a production order). Stock ' +
                   'credited, expense/production cost debited ({{OBYC}} → **GBB**).',
          cikti:'Consumption document', ok:'period end' },
        { ic:'🔍', rol:'General ledger accounting', baslik:'GR/IR analysis',
          aciklama:'{{F.13}} clears matched items, {{MR11}} writes off permanent differences, {{F.19}} ' +
                   'classifies the remaining timing gap.',
          cikti:'A clean {{gr-ir}} account' },
      ],
    },

    adimlar:[
      { rol:'Purchasing', eylem:'Opens the order, chooses the account assignment category', sistem:'{{ME21N}} — no FI entry' },
      { rol:'Warehouse', eylem:'Posts the goods receipt', sistem:'{{MIGO}} 101 → stock debit / GR-IR credit' },
      { rol:'AP accounting', eylem:'Processes the invoice', sistem:'{{MIRO}} → GR-IR debit / vendor credit' },
      { rol:'AP accounting', eylem:'Resolves blocks', sistem:'{{MRBR}}' },
      { rol:'Production', eylem:'Consumes the material', sistem:'{{MIGO}} 201/261 → stock credit / expense debit' },
      { rol:'General ledger accounting', eylem:'GR/IR cleanup', sistem:'{{F.13}}, {{MR11}}, {{F.19}}' },
      { rol:'Consultant', eylem:'Tests account determination', sistem:'{{OMWB}} — a simulation without posting' },
    ],

    veriAkisi:{
      nereden:'MM master data (material → {{degerleme-sinifi}}, {{fiyat-kontrolu}}), the order ({{EKKO}}/{{EKPO}}), ' +
              'the movement type, the {{OBYC}} rule table ({{T030}}).',
      nereye:'Into FI documents ({{BKPF}}/{{BSEG}}/{{ACDOCA}}), stock and GR/IR accounts; on the CO side, into ' +
             'the {{maliyet-yeri}} or a production order.',
      tetikleyen:'A material movement or invoice entry. The order alone does not generate an FI entry.',
      sonraki:'Payment ({{F110}}), period-end GR/IR analysis, inventory valuation.',
    },

    notlar:[
      { tip:'warn', baslik:'The account assignment category changes everything', metin:
        'The **account assignment category** on the order fully determines the goods receipt\'s FI entry:\n\n' +
        '**Blank** — stock purchase: stock debit / GR-IR credit. The material enters inventory.\n\n' +
        '**K** — cost center: **direct expense** debit / GR-IR credit. No stock is created; the material is ' +
        'considered consumed the moment it is received (stationery, maintenance supplies).\n\n' +
        '**A** — fixed asset: asset debit / GR-IR credit. {{aktiflestirme}} occurs.\n\n' +
        '**F** — internal order / project: project cost debit.\n\n' +
        'The same material, with different categories, produces **completely different** accounting entries. ' +
        'This is usually the answer to "why didn\'t stock get created?"' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Every MM posting is **automatic**, and {{OBYC}} determines the accounts. Below are the entries for the ' +
      'five most common scenarios; each also shows which **transaction key** comes into play.',

    etkilenenHesaplar:[
      { hesap:'153 Trade goods / 150 Raw materials and supplies (stock)', tur:'Balance sheet — Asset', neden:'{{OBYC}} → **BSX**. A different stock account is chosen depending on the {{degerleme-sinifi}}.' },
      { hesap:'159 GR/IR account', tur:'Balance sheet — Clearing', neden:'{{OBYC}} → **WRX**. Carries the timing gap between the goods and the invoice.' },
      { hesap:'711 Price difference', tur:'Income statement', neden:'{{OBYC}} → **PRD**. Only arises on **standard-priced** materials ({{fiyat-kontrolu}} = S).' },
      { hesap:'7xx Expense accounts', tur:'Income statement', neden:'{{OBYC}} → **GBB** (offsetting entry). On consumption and cost-center purchases.' },
      { hesap:'320 Trade payables', tur:'Balance sheet — Liability', neden:'On the {{MIRO}} invoice; the account is decided by {{LFB1}} `AKONT`, not {{OBYC}}.' },
      { hesap:'191 Deductible VAT', tur:'Balance sheet — Asset', neden:'When a {{vergi-kodu}} is entered; the account is decided by {{OB40}}.' },
      { hesap:'159/653 Freight provision', tur:'Balance sheet / Income statement', neden:'{{OBYC}} → **FR1**. For planned additional costs (freight, customs).' },
    ],

    fisler:[
      { baslik:'Scenario 1 — Stock purchase · goods receipt ({{MIGO}} 101)',
        belgeTuru:'WE', tarih:'10.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'150', ad:'Raw materials and supplies (stock)', borc:200000, not:'{{OBYC}} → **BSX** · valuation class 3000' },
          { hesap:'159', ad:'GR/IR account', alacak:200000, not:'{{OBYC}} → **WRX**' },
        ],
        not:'The value was calculated **at the order price** (100 tons × 2,000 TRY). Since the invoice hasn\'t ' +
             'arrived, the real price is not yet known. There is **no** debt to the vendor.' },

      { baslik:'Scenario 1 continued — invoice ({{MIRO}}) · price matches',
        belgeTuru:'RE', tarih:'18.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR account', borc:200000, not:'Closes the credit from the goods receipt' },
          { hesap:'191', ad:'Deductible VAT', borc:40000, not:'{{OB40}}' },
          { hesap:'320', ad:'Trade payables — V-4001', alacak:240000, not:'{{LFB1}} `AKONT`' },
        ],
        not:'{{gr-ir}} is zeroed out: both the goods and the invoice have arrived. The two items match ' +
             'automatically via {{F.13}}.' },

      { baslik:'Scenario 2 — Price difference · a **standard-priced** material (S)',
        belgeTuru:'RE', tarih:'18.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR account', borc:200000, not:'Closes **at the order price**' },
          { hesap:'711', ad:'Price difference', borc:10000, not:'{{OBYC}} → **PRD** · the invoice came in at 210,000' },
          { hesap:'191', ad:'Deductible VAT', borc:42000 },
          { hesap:'320', ad:'Trade payables', alacak:252000 },
        ],
        not:'Because {{fiyat-kontrolu}} = **S** (standard price), the stock value **doesn\'t change** — account ' +
             '150 stays at 200,000 TRY. The difference goes to the income statement (711).\n\n' +
             'The logic: the standard price is a **planning price**; its difference from the real price is ' +
             'tracked separately as a performance indicator.' },

      { baslik:'Scenario 2 alternative — a **moving average** material (V)',
        belgeTuru:'RE', tarih:'18.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR account', borc:200000, not:'At the order price' },
          { hesap:'150', ad:'Raw materials and supplies (stock)', borc:10000, not:'**The difference was added to stock** — no PRD' },
          { hesap:'191', ad:'Deductible VAT', borc:42000 },
          { hesap:'320', ad:'Trade payables', alacak:252000 },
        ],
        not:'Because {{fiyat-kontrolu}} = **V** (moving average), the difference **is added to the stock ' +
             'value** and the unit price is updated: 210,000 / 100 tons = 2,100 TRY/ton.\n\n' +
             '**Critical condition:** the stock must still be on hand. If the material has already been ' +
             'consumed, the difference cannot be added to stock and goes partly to the price difference ' +
             'account instead — this is the most surprising behavior of moving average.' },

      { baslik:'Scenario 3 — Cost-center purchase (account assignment K)',
        belgeTuru:'WE', tarih:'10.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — stationery', borc:15000, not:'{{OBYC}} → **GBB/VBR** · cost center 1200' },
          { hesap:'159', ad:'GR/IR account', alacak:15000 },
        ],
        not:'**No stock was created.** Because the account assignment category is K, the material is ' +
             'considered consumed the moment it is received and is expensed directly. It never shows up in inventory.\n\n' +
             'This is usually the answer to the complaint "I received the material but it doesn\'t show up in ' +
             'stock" — the account assignment category on the order.' },

      { baslik:'Scenario 4 — Consumption ({{MIGO}} 201 · to a cost center)',
        belgeTuru:'WA', tarih:'25.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'730', ad:'Manufacturing overhead expense — materials', borc:80000, not:'{{OBYC}} → **GBB/VBR** · cost center 3100' },
          { hesap:'150', ad:'Raw materials and supplies', alacak:80000, not:'{{OBYC}} → **BSX** (reverse direction)' },
        ],
        not:'Stock turned into an expense. On the CO side, cost center 3100 was loaded. Had movement type 261 ' +
             'been used instead of 201, it would have loaded a production order.' },

      { baslik:'Scenario 5 — Return ({{MIGO}} 102 · goods receipt reversal)',
        belgeTuru:'WE', tarih:'12.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR account', borc:40000, not:'The goods receipt was reversed' },
          { hesap:'150', ad:'Raw materials and supplies', alacak:40000, not:'Stock decreased' },
        ],
        not:'Movement type **102** is the reverse of 101. The accounts are the same, only the directions are ' +
             'reversed. {{OBYC}} uses the same transaction keys — the movement type only decides the direction.' },
    ],

    tHesaplar:[
      { hesap:'Raw materials and supplies (stock)', kod:'150',
        borc:[{ ad:'Goods receipt', tutar:200000 }, { ad:'Price difference (V)', tutar:10000 }],
        alacak:[{ ad:'Consumption', tutar:80000 }, { ad:'Return', tutar:40000 }],
        not:'The account is chosen based on the valuation class' },
      { hesap:'GR/IR account', kod:'159 (clearing)',
        borc:[{ ad:'Invoice entry', tutar:200000 }, { ad:'Return', tutar:40000 }],
        alacak:[{ ad:'Goods receipt', tutar:200000 }, { ad:'Cost-center purchase', tutar:15000 }],
        not:'Should be near zero at period end' },
      { hesap:'Price difference', kod:'711 (expense)',
        borc:[{ ad:'Standard price difference', tutar:10000 }],
        alacak:[],
        not:'Only on materials with price control S' },
      { hesap:'Manufacturing overhead expense', kod:'730',
        borc:[{ ad:'Material consumption', tutar:80000 }],
        alacak:[],
        not:'Loaded to a cost center in CO' },
    ],

    notlar:[
      { tip:'warn', baslik:'GR/IR always closes at the order price', metin:
        'The goods receipt is valued at the order price and {{gr-ir}} is credited with that amount. Even if the ' +
        'invoice comes in different, GR/IR closes with **the same amount**; the difference goes to a separate account.\n\n' +
        'The reason is simple: GR/IR means "the goods have arrived, the invoice is pending," and the quantity of ' +
        'goods hasn\'t changed. What changed is the price, and that\'s separate information.\n\n' +
        'If this rule isn\'t known, the question "why did GR/IR close at 200,000 when the invoice was 210,000?" ' +
        'gets investigated needlessly.' },
      { tip:'tip', baslik:'S or V? — the accounting effect of price control', metin:
        '**S (standard price):** the stock value is fixed; the difference goes to the **price difference ' +
        'account** (PRD). Advantage: the stock value is predictable, the deviation is tracked separately. ' +
        'Preferred for production materials.\n\n' +
        '**V (moving average):** the difference **is added to stock**, the unit price is updated. Advantage: ' +
        'stock reflects the real cost. Preferred for trade goods.\n\n' +
        '**V\'s trap:** if the stock is exhausted, the difference cannot be added to stock and goes to the ' +
        'price difference account instead. So even with V, the PRD account can move — an unexpected situation.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'In MM integration, variation happens along three axes: **the account assignment category** (where it ' +
      'gets posted), **{{malzeme-hareket-turu}}** (what is happening), and **{{fiyat-kontrolu}}** (where the ' +
      'difference goes).',

    liste:[
      { ad:'Stock Purchase (Account Assignment Blank)',
        aciklama:'The material enters inventory. On goods receipt, the **stock account** is debited; once ' +
                 'consumed, it turns into an expense.',
        neZaman:'Raw materials, trade goods, packaging — anything kept in the warehouse and tracked by quantity.',
        ornek:'{{OBYC}} → BSX (stock) / WRX (GR-IR). Material master data is mandatory.',
        tcodes:['MIGO','MM03'] },

      { ad:'Consumption Purchase (Account Assignment K)',
        aciklama:'No stock is created; the material is considered **consumed** the moment it is received and ' +
                 'is expensed directly.',
        neZaman:'Stationery, maintenance supplies, service purchases — purchases that don\'t need quantity tracking.',
        ornek:'{{OBYC}} → GBB/VBR (expense) / WRX. Can be done even without material master data (a text entry).',
        tcodes:['ME21N','MIGO'] },

      { ad:'Asset Purchase (Account Assignment A)',
        aciklama:'The goods receipt is posted directly to a **fixed asset**; {{aktiflestirme}} occurs.',
        neZaman:'On machinery, equipment, and vehicle purchases.',
        ornek:'Asset account debit / GR-IR credit. The asset number is entered on the order.',
        tcodes:['ME21N','AS01','ABZON'] },

      { ad:'Project Purchase (Account Assignment F/P)',
        aciklama:'The cost is loaded to an internal order or a WBS element.',
        neZaman:'On project-based purchases and investment orders.',
        ornek:'Project cost debit / GR-IR credit. The cost accumulates on the CO/PS side.' },

      { ad:'Standard Price',
        aciklama:'Stock is valued at a fixed price. The invoice difference goes to the **price difference ' +
                 'account** (PRD); the stock value doesn\'t change.',
        neZaman:'On production materials, in environments with cost accounting. Provides predictability and ' +
                'variance analysis.',
        ornek:'Order 2,000 TRY, invoice 2,100 TRY → a 100 TRY/ton difference to account 711.',
        tcodes:['MM03','OBYC'] },

      { ad:'Moving Average Price',
        aciklama:'The difference **is added to the stock value** and the unit price is recalculated.',
        neZaman:'On trade goods and purchases with frequently changing prices. Stock reflects the real cost.',
        ornek:'100 tons @ 2,000 + a 10,000 difference → new unit price 2,100 TRY/ton.',
        tcodes:['MM03'] },

      { ad:'Three-way Match',
        aciklama:'The order ↔ goods receipt ↔ invoice are compared for quantity and price. An out-of-tolerance ' +
                 'difference **blocks** payment.',
        neZaman:'On every order-based purchase — an automatic internal control.',
        ornek:'Order 100 tons, goods receipt 100 tons, invoice 105 tons → a quantity variance → a block.',
        tcodes:['MIRO','MRBR','ME23N'] },

      { ad:'Planned Delivery Costs',
        aciklama:'Costs like freight, customs, and insurance are planned at order time and tracked in a ' +
                 'separate provision account.',
        neZaman:'On imports, and where shipping cost is included in the stock value.',
        ornek:'{{OBYC}} → **FR1** freight provision. A provision is set up at goods receipt, closed once the ' +
              'freight invoice arrives.',
        tcodes:['ME21N','MIRO'] },
    ],

    karsilastirmaBasliklar:['Standard Price (S)', 'Moving Average Price (V)'],
    karsilastirma:[
      ['Stock value', '**Fixed** — at the planned price', '**Variable** — updated on every purchase'],
      ['Where the invoice difference goes', 'To the **PRD** price difference account (income statement)', 'Added to **stock** (balance sheet)'],
      ['Income statement effect', 'The difference is an expense/income **immediately**', 'The difference becomes an expense **once consumed**'],
      ['Predictability', '**High** — the stock value is known', 'Low — constantly changing'],
      ['Variance analysis', '**Easy** — the PRD account shows the deviation', 'Hard — the difference is buried in stock'],
      ['Typical use', 'Production materials, finished goods', 'Trade goods, spare parts'],
      ['Trap', 'If the standard price is stale, PRD inflates', '**If stock is exhausted**, the difference goes to PRD'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'OBYC', ad:'MM automatic account determination — integration\'s control center',
        amac:'Defines which G/L accounts material movements and invoices post to, using the **transaction key ' +
             '+ valuation class** combination.',
        neZaman:'At setup; whenever a new {{degerleme-sinifi}} is added; on an "Account determination not ' +
                'possible" error.',
        adimlar:[
          { baslik:'Choose the transaction key',
            aciklama:'**BSX** stock · **WRX** GR/IR · **PRD** price difference · **GBB** offsetting account ' +
                     '(consumption) · **FR1** freight provision · **KDM** exchange difference · **UMB** revaluation difference.' },
          { baslik:'Set the account determination rule',
            aciklama:'The valuation modifier, the **general modifier** (for GBB), and the valuation class combination.' },
          { baslik:'Enter the debit and credit accounts',
            aciklama:'The same account for most keys; for some (like PRD) debit/credit can differ.' },
          { baslik:'Test with {{OMWB}}',
            aciklama:'A simulation without posting: "which account does this material go to with this movement type?"' },
        ],
        ekranAkisi:[
          { ekran:'Transaction key selection', islem:'BSX (stock entry) chosen' },
          { ekran:'Rules', islem:'Valuation class active ✓ · valuation modifier inactive' },
          { ekran:'Account assignment', islem:'Valuation class 3000 → account 150000 · class 3100 → 153000' },
          { ekran:'WRX key', islem:'Valuation class inactive → a single account: 159000 (for all materials)' },
        ],
        alanlar:{
          zorunlu:['Transaction key','Chart of accounts','Valuation class (if active)','G/L account'],
          opsiyonel:['Valuation modifier','General modifier','Debit/credit split'] },
        hatalar:[
          { mesaj:'Account determination for entry INT BSX 3020 not possible', sebep:'No stock account defined for valuation class 3020 — usually a new material group was added.', cozum:'{{OBYC}} → BSX → add the account for that valuation class. **The most common MM–FI integration error.**' },
          { mesaj:'Account determination for entry INT WRX not possible', sebep:'The {{gr-ir}} account is undefined.', cozum:'{{OBYC}} → WRX → define the account. WRX is usually independent of the valuation class (a single account).' },
          { mesaj:'Account determination for entry INT GBB VBR not possible', sebep:'The consumption offsetting account is undefined.', cozum:'{{OBYC}} → GBB → define the account for the general modifier **VBR** (cost-center consumption).' },
        ],
        ipucu:'**Test with {{OMWB}} first.** It answers "which account does this material go to with this ' +
              'movement?" without posting. The fastest way to find a missing definition before hitting the ' +
              'error live.\n\n' +
              'Also: **WRX is usually a single account** (independent of the valuation class), while **BSX ' +
              'varies by class**. This asymmetry is confusing but logical: GR/IR is a technical clearing ' +
              'account, while stock must be split by material type.',
        ilgili:['OMWB','MM03','MIGO','T030'] },

      { kod:'MIGO', ad:'Material movement — where the first FI entry is born',
        amac:'Records goods receipts, issues, transfers, and returns; the FI document is generated automatically.',
        neZaman:'In warehouse operations. The accountant usually doesn\'t use it but **has to know its result**.',
        adimlar:[
          { baslik:'Choose the transaction and reference document',
            aciklama:'"Goods receipt" + "Purchase order" is the most common combination.' },
          { baslik:'Enter the order number → items come in automatically' },
          { baslik:'Check the {{malzeme-hareket-turu}}',
            aciklama:'**101** goods receipt for order, **102** its reversal, **201** cost-center consumption, ' +
                     '**261** to a production order, **301** transfer, **601** sales delivery.' },
          { baslik:'Enter the quantity and storage location' },
          { baslik:'Save → a material document + FI document are created',
            aciklama:'Two separate numbers: the material document ({{MSEG}}) and the FI document ({{BKPF}}). ' +
                     'Linked through `AWKEY`.' },
        ],
        alanlar:{
          zorunlu:['Transaction type','Reference document','Movement type','Quantity','Storage location'],
          opsiyonel:['Document date','Posting date','Batch','Text','Delivery note number'] },
        hatalar:[
          { mesaj:'Account determination for entry ... not possible', sebep:'A missing definition in {{OBYC}}.', cozum:'Find which key is missing with {{OMWB}}, then complete it in {{OBYC}}.' },
          { mesaj:'Posting only possible in periods ... in company code', sebep:'The MM period is closed.', cozum:'Open the MM period with MMPV (separate from the FI period).' },
          { mesaj:'Document ... does not contain any items', sebep:'The order item has already been fully received.', cozum:'{{ME23N}} → check existing goods receipts with the purchase order history.' },
          { mesaj:'Deficit of stock', sebep:'The quantity to be issued isn\'t in stock.', cozum:'Check the movements with {{MB51}}; verify the batch/storage location is correct.' },
        ],
        ipucu:'For "where did this document come from?" on the FI side: {{FB03}} → document header → if ' +
              '`AWTYP` = **MKPF**, it\'s a material document. The `AWKEY` field gives the material document ' +
              'number; drill in further with {{MB51}} or the {{MIGO}} display.',
        ilgili:['MIRO','MB51','ME23N','OBYC'] },

      { kod:'MIRO', ad:'Logistics invoice verification',
        amac:'Records an invoice based on the order and the goods receipt; performs {{uc-yonlu-eslestirme}}.',
        neZaman:'For every vendor invoice tied to an order.',
        adimlar:[
          { baslik:'Enter the transaction type and invoice date' },
          { baslik:'Reference object: the purchase order',
            aciklama:'The system pulls up items that have **been goods-receipted but not invoiced** and ' +
                     'proposes the quantity/amount.' },
          { baslik:'Compare the proposed values against the invoice',
            aciklama:'This is the heart of the job. If there is a variance, the tolerance check kicks in.' },
          { baslik:'Turn the balance indicator green',
            aciklama:'The gross amount entered = the item total + tax + additional costs.' },
          { baslik:'Simulate and save',
            aciklama:'If the variance is outside tolerance, the invoice is saved **but blocked for payment**.' },
        ],
        hatalar:[
          { mesaj:'Balance not zero', sebep:'The gross amount doesn\'t match the item total + tax.', cozum:'Check the item amounts, the tax code, and the additional-cost tab.' },
          { mesaj:'Price/quantity variance — invoice blocked', sebep:'The variance is outside tolerance.', cozum:'Investigate the variance; release it with {{MRBR}} if justified, request a credit memo if not.' },
          { mesaj:'No (suitable) item found for purchase order', sebep:'No goods receipt was posted, or the item is already fully invoiced.', cozum:'{{ME23N}} → the **purchase order history** tab — shows the {{EKBE}} table visually.' },
        ],
        ipucu:'{{MIRO}} produces **two numbers**: the MM invoice document ({{RBKP}}) and the FI document ' +
              '({{BKPF}}). The one shown on screen is the MM number, and it\'s not found in {{FB03}} — use ' +
              '{{MIR4}} instead.',
        ilgili:['MIGO','MRBR','MR8M','MIR4','ME23N'] },

      { kod:'OMWB', ad:'Account determination simulation',
        amac:'Tests {{OBYC}} rules **without posting**.',
        neZaman:'When a new valuation class is defined; when investigating an account determination error; ' +
                'before going live.',
        adimlar:[
          { baslik:'Choose the simulation option' },
          { baslik:'Enter the plant, material, and movement type' },
          { baslik:'Run → the accounts that will be used are listed',
            aciklama:'The account determined for each transaction key is shown; a missing one is flagged in red.' },
        ],
        ipucu:'**The fastest diagnostic tool for MM–FI account determination problems.** Test here first ' +
              'instead of waiting to hit an error in {{MIGO}}. It should be run routinely whenever a new ' +
              'material group is defined.',
        ilgili:['OBYC','MIGO','MM03'] },

      { kod:'MR11', ad:'GR/IR account maintenance (difference cleanup)',
        amac:'Cleans up the {{gr-ir}} account by writing off goods-receipt/invoice differences that will never match.',
        neZaman:'At period end, for small differences remaining after {{F.13}}\'s automatic clearing.',
        adimlar:[
          { baslik:'Enter the company code, vendor, and order range' },
          { baslik:'Choose the difference type',
            aciklama:'"Delivered but not invoiced" or "invoiced but not delivered."' },
          { baslik:'Set an amount/date limit',
            aciklama:'E.g. differences under 5,000 TRY and items older than 90 days.' },
          { baslik:'Run in test mode, review the result, then run in production mode' },
        ],
        ipucu:'{{MR11}} **actually reduces the balance** — that\'s the difference from {{F.19}} classification. ' +
              'A permanent difference is written off here (income/expense); F.19 only shifts it for presentation.\n\n' +
              'That\'s why MR11 must be used carefully and with an amount limit.',
        hatalar:[
          { mesaj:'No differences found', sebep:'No difference in the selected criteria.', cozum:'Loosen the amount/date limits; check the {{gr-ir}} open items with {{FBL3N}}.' },
        ],
        ilgili:['F.13','F.19','FBL3N','gr-ir'] },

      { kod:'ME23N', ad:'Display purchase order — purchase order history',
        amac:'Shows the order and the **purchase order history** tab: how many goods receipts, how many invoices.',
        neZaman:'For MIRO problems, GR/IR investigations, and "what\'s the status of this order?" questions.',
        adimlar:[
          { baslik:'Enter the order number' },
          { baslik:'Select the item → switch to the **Purchase Order History** tab',
            aciklama:'Shows the {{EKBE}} table visually: every goods receipt and invoice is listed as a row.' },
          { baslik:'Double-click a row → drill into the material or invoice document' },
        ],
        ipucu:'**80% of MIRO problems become clear once you look at this tab:** was a goods receipt posted, is ' +
              'there a partial delivery, has the item already been invoiced, was the order price ever updated.',
        ilgili:['MIRO','MIGO','EKBE','MB51'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'MM integration has three table groups: **the order** ({{EKKO}}/{{EKPO}}/{{EKBE}}), **the movement** ' +
      '({{MSEG}}), and **the invoice** ({{RBKP}}/{{RSEG}}). All of them link to the FI document through ' +
      '`AWKEY`. The account determination rules live in {{T030}}.',

    liste:[
      { ad:'EKKO', baslik:'Purchase order header',
        tutar:'The order\'s vendor, date, purchasing organization, currency.',
        olusturan:'{{ME21N}}',
        guncelleyen:'ME22N (change)',
        anahtar:'EBELN',
        iliskiler:'{{EKPO}} items, {{EKBE}} history.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'EBELN', aciklama:'Order number' },
          { ad:'LIFNR', aciklama:'Vendor', tip:'fk' },
          { ad:'WAERS', aciklama:'Order currency' },
        ] },

      { ad:'EKPO', baslik:'Purchase order items',
        tutar:'Material, quantity, price, **account assignment category**, valuation class.',
        olusturan:'{{ME21N}}',
        guncelleyen:'ME22N',
        anahtar:'EBELN + EBELP',
        iliskiler:'History via {{EKBE}}, invoice items via {{RSEG}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KNTTP', aciklama:'**Account assignment category** — blank stock, K cost center, A asset, F internal order. Decides the FI entry.' },
          { ad:'NETPR', aciklama:'Net order price — {{gr-ir}} closes at this price' },
          { ad:'MENGE', aciklama:'Order quantity' },
        ] },

      { ad:'EKBE', baslik:'Purchase order history',
        tutar:'**All** goods-receipt and invoice movements for the order item.',
        olusturan:'{{MIGO}} and {{MIRO}}',
        guncelleyen:'Every goods receipt and invoice',
        anahtar:'EBELN + EBELP + ZEKKN + VGABE + GJAHR + BELNR + BUZEI',
        iliskiler:'Links to {{MSEG}} and {{RSEG}} documents.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'VGABE', aciklama:'**1** = goods receipt, **2** = invoice receipt. The basis of GR/IR analysis.' },
          { ad:'MENGE / WRBTR', aciklama:'Quantity and amount' },
          { ad:'BELNR', aciklama:'The related material or invoice document', tip:'fk' },
        ] },

      { ad:'MSEG', baslik:'Material document items',
        tutar:'The lines of the material movement: material, quantity, {{malzeme-hareket-turu}}, storage ' +
              'location, valuation class, account assignment.',
        olusturan:'{{MIGO}}',
        guncelleyen:'Material movements',
        anahtar:'MBLNR + MJAHR + ZEILE',
        iliskiler:'MKPF header; the FI document via {{BKPF}} through `AWKEY`.',
        s4:'Merged into the MATDOC table in S/4HANA; MSEG kept as a {{uyumluluk-view}}.',
        alanlar:[
          { ad:'BWART', aciklama:'**{{malzeme-hareket-turu}}** — 101, 102, 201, 261, 301, 601' },
          { ad:'BKLAS', aciklama:'**{{degerleme-sinifi}}** — the input to {{OBYC}} account determination' },
          { ad:'DMBTR', aciklama:'Local currency amount' },
          { ad:'KOSTL / AUFNR', aciklama:'Cost center / internal order — on account-assigned movements' },
        ] },

      { ad:'RBKP', baslik:'Logistics invoice header',
        tutar:'The MM-side header of the {{MIRO}} invoice: vendor, amount, date, block status.',
        olusturan:'{{MIRO}}',
        guncelleyen:'{{MIRO}}, {{MRBR}}, {{MR8M}}',
        anahtar:'BELNR + GJAHR',
        iliskiler:'{{RSEG}} items; the FI document via {{BKPF}} through `AWKEY`.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'ZLSPR', aciklama:'**Payment block** — filled automatically if there is a price/quantity variance' },
          { ad:'RMWWR', aciklama:'Invoice gross amount' },
          { ad:'STBLG', aciklama:'Reversal document — filled if reversed with {{MR8M}}' },
        ] },

      { ad:'RSEG', baslik:'Logistics invoice items',
        tutar:'The invoice\'s lines; which order item each corresponds to.',
        olusturan:'{{MIRO}}',
        guncelleyen:'{{MIRO}}',
        anahtar:'BELNR + GJAHR + BUZEI',
        iliskiler:'Links to the {{EKPO}} order item.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'EBELN / EBELP', aciklama:'Order and item', tip:'fk' },
          { ad:'MENGE / WRBTR', aciklama:'Invoiced quantity and amount' },
        ] },

      { ad:'T030', baslik:'Automatic account determination',
        tutar:'The rules defined in {{OBYC}}: transaction key + valuation class → G/L account.',
        olusturan:'{{OBYC}}',
        guncelleyen:'{{OBYC}}, {{OB40}} (tax), {{VKOA}} (SD)',
        anahtar:'KTOPL + KTOSL + BWMOD + KOMOK + BKLAS',
        iliskiler:'Matched via {{MSEG}}.BKLAS valuation class.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KTOSL', aciklama:'**Transaction key**: BSX, WRX, PRD, GBB, FR1, KDM' },
          { ad:'BKLAS', aciklama:'Valuation class' },
          { ad:'KONTS / KONTH', aciklama:'Debit and credit accounts' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'MM–FI table bridge',
      varliklar:[
        { ad:'EKKO', rol:'Order', aciklama:'Order header',
          alanlar:[{ ad:'EBELN', tip:'pk' }, { ad:'LIFNR', tip:'fk' }] },
        { ad:'EKPO', rol:'Order', aciklama:'Order items',
          alanlar:[{ ad:'EBELN', tip:'fk' }, { ad:'EBELP', tip:'pk' }, { ad:'KNTTP' }, { ad:'NETPR' }] },
        { ad:'EKBE', rol:'Bridge', hub:true, aciklama:'Order history',
          alanlar:[{ ad:'EBELN', tip:'fk' }, { ad:'VGABE' }, { ad:'BELNR', tip:'fk' }] },
        { ad:'MSEG', rol:'Movement', aciklama:'Material document items',
          alanlar:[{ ad:'MBLNR', tip:'pk' }, { ad:'BWART' }, { ad:'BKLAS', tip:'fk' }] },
        { ad:'RBKP', rol:'Invoice', aciklama:'MM invoice header',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'LIFNR', tip:'fk' }, { ad:'ZLSPR' }] },
        { ad:'RSEG', rol:'Invoice', aciklama:'MM invoice items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'EBELN', tip:'fk' }] },
        { ad:'T030', rol:'Configuration', aciklama:'Account determination',
          alanlar:[{ ad:'KTOSL', tip:'pk' }, { ad:'BKLAS', tip:'pk' }, { ad:'KONTS' }] },
        { ad:'BKPF', rol:'FI', aciklama:'FI document',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'AWTYP' }, { ad:'AWKEY' }] },
      ],
      iliskiler:[
        { from:'EKKO', to:'EKPO', alanlar:'EBELN', not:'order → items' },
        { from:'EKPO', to:'EKBE', alanlar:'EBELN + EBELP', not:'item → history' },
        { from:'EKBE', to:'MSEG', alanlar:'BELNR (VGABE=1)', not:'the goods receipt movement' },
        { from:'EKBE', to:'RSEG', alanlar:'BELNR (VGABE=2)', not:'the invoice item' },
        { from:'RBKP', to:'RSEG', alanlar:'BELNR + GJAHR', not:'invoice → items' },
        { from:'MSEG', to:'T030', alanlar:'BKLAS → valuation class', not:'account determination input' },
        { from:'MSEG', to:'BKPF', alanlar:'MBLNR → AWKEY', not:'material document → FI document' },
        { from:'RBKP', to:'BKPF', alanlar:'BELNR → AWKEY', not:'MM invoice → FI document' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'An FI consultant rarely uses MM screens but **must be able to read their results**. Below are the three ' +
      'most-needed screens: the account determination test, the purchase order history, and drilling from the ' +
      'FI document to the source.',

    ekranlar:[
      { ad:'{{OBYC}} — the account determination screen',
        aciklama:'A transaction key is chosen, then the rules and account assignment are set.',
        alanlar:[
          { ad:'Transaction key (`KTOSL`)', zorunlu:true, aciklama:'**BSX** stock, **WRX** GR/IR, **PRD** price difference, **GBB** offsetting account, **FR1** freight.' },
          { ad:'Rules', zorunlu:true, aciklama:'Which criteria are active: valuation modifier, general modifier, **valuation class**.' },
          { ad:'Valuation class', zorunlu:false, aciklama:'Active on BSX (each material group gets a different stock account); usually inactive on WRX (a single GR/IR account).' },
          { ad:'Debit / credit account', zorunlu:true, aciklama:'The same account for most keys; for some like PRD it can differ.' },
        ],
        ipucu:'**Remember the asymmetry:** BSX varies by valuation class (stock accounts must be split), WRX is ' +
              'usually a single account (GR/IR is a technical clearing account). This means that when a new ' +
              'material group is added, updating only BSX is usually enough.' },

      { ad:'{{ME23N}} — the purchase order history tab',
        aciklama:'The most-used screen for diagnosing MM–FI problems.',
        alanlar:[
          { ad:'Item selection', zorunlu:true, aciklama:'Select the order item, tabs open below.' },
          { ad:'**Purchase order history** tab', zorunlu:false, aciklama:'Shows the {{EKBE}} table visually: each goods receipt (GR) and invoice (IR) as a row.' },
          { ad:'Quantity and value columns', zorunlu:false, aciklama:'"How much arrived, how much was invoiced?" — the GR/IR balance explained on an order basis.' },
          { ad:'Document links', zorunlu:false, aciklama:'Double-click a row → the material document or invoice document.' },
        ],
        ipucu:'When investigating the GR/IR balance, enter the order number here. If the goods receipt was 100 ' +
              'tons and the invoice 60 tons, the difference is immediately visible and the reason is clear.' },

      { ad:'{{FB03}} — drilling from the FI document to the source',
        aciklama:'The most important diagnostic path for someone looking from the FI side.',
        alanlar:[
          { ad:'Document header → `AWTYP`', zorunlu:false, aciklama:'**MKPF** = material document (MIGO), **RMRP** = MM invoice (MIRO), **VBRK** = SD invoice.' },
          { ad:'Document header → `AWKEY`', zorunlu:false, aciklama:'The source document number. If MKPF, the material document; if RMRP, the MM invoice number.' },
          { ad:'Environment → related documents', zorunlu:false, aciklama:'A direct jump to the source MM document and the generated CO document.' },
        ],
        ipucu:'The answer chain for "why was this 200,000 TRY posted to account 150?": {{FB03}} → `AWKEY` → the ' +
              'material document → the material\'s {{degerleme-sinifi}} → the {{OBYC}} BSX rule. A definite ' +
              'answer in five steps.' },
    ],

    zorunlu:['Transaction key','Chart of accounts','G/L account','Movement type','Quantity','Purchase order (MIRO)'],
    opsiyonel:['Valuation class','Valuation modifier','General modifier','Batch','Storage location'],

    hatalar:[
      { mesaj:'Account determination for entry INT BSX 3020 not possible', sebep:'No stock account defined for the new {{degerleme-sinifi}} 3020.', cozum:'{{OBYC}} → BSX → add the account for class 3020. **The most common MM–FI error.** Could have been caught in advance with {{OMWB}}.' },
      { mesaj:'Account determination for entry INT WRX not possible', sebep:'The {{gr-ir}} account is undefined.', cozum:'{{OBYC}} → WRX → define the account.' },
      { mesaj:'Account determination for entry INT GBB VBR not possible', sebep:'The consumption offsetting account is undefined.', cozum:'{{OBYC}} → GBB → define the account for the general modifier VBR.' },
      { mesaj:'Posting only possible in periods 03/2027 and 02/2027', sebep:'The MM period is closed (separate from the FI period).', cozum:'Open the MM period with MMPV. At closing, MM is closed **first**.' },
      { mesaj:'Price/quantity variance — invoice blocked for payment', sebep:'The {{uc-yonlu-eslestirme}} variance is outside tolerance.', cozum:'Compare against the {{ME23N}} purchase order history; release with {{MRBR}} if justified.' },
      { mesaj:'Deficit of stock in plant/storage location', sebep:'The issue quantity isn\'t in stock.', cozum:'Check the movements with {{MB51}}; verify the batch and storage location.' },
      { mesaj:'A material document exists but no FI document was created', sebep:'A value-less movement (quantity only), or no FI impact due to the account assignment.', cozum:'Check whether the movement type updates value; some transfers only produce a quantity movement.' },
    ],

    ipuclari:[
      '**Test with {{OMWB}} first.** Run it routinely whenever a new material group is defined; find the gap ' +
      'before hitting an error live.',
      '{{ME23N}} → the purchase order history tab resolves 80% of MIRO and GR/IR problems in one look.',
      'To drill from the FI document to the source: {{FB03}} → document header → `AWTYP`/`AWKEY`.',
      'The MM period is **separate** from FI and is closed **first** at period end. The "Posting only possible ' +
      'in periods…" error points to the MM period.',
      'When a new {{degerleme-sinifi}} is added, updating just **BSX** is usually enough; WRX and GBB, if ' +
      'defined independently of the class, don\'t need to be touched.',
      'To review the {{gr-ir}} balance by order, add the **assignment** field to your {{FBL3N}} layout — that\'s ' +
      'where the order number is found.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'MSEG', ne:'Material document items; movement type and valuation class' },
      { tablo:'EKBE', ne:'A line is added to the order history (VGABE 1 or 2)' },
      { tablo:'RBKP', ne:'The MM header of the MIRO invoice' },
      { tablo:'RSEG', ne:'The items of the MIRO invoice' },
      { tablo:'BKPF', ne:'The FI document; `AWTYP` = MKPF or RMRP, `AWKEY` = the source document' },
      { tablo:'BSEG', ne:'FI items; stock, GR/IR, price difference, vendor lines' },
      { tablo:'ACDOCA', ne:'Universal items; with cost-center and material dimensions' },
      { tablo:'BSIK', ne:'A vendor open item is generated by the MIRO invoice' },
    ],

    commit:
      'The material movement and the invoice posting are written within a **single LUW**: the MM document and ' +
      'the FI document are created together. If one fails, neither is written.\n\n' +
      'That\'s why "there\'s a material document but no FI document" normally **can\'t happen**. If it has, ' +
      'there are two possibilities: **(1)** the movement is value-less (some transfer types only update ' +
      'quantity), **(2)** an asynchronous update has stalled ({{SM13}}).',

    belgeNo:
      'MM transactions produce **two numbers**:\n\n' +
      'The **material document** (MKPF/{{MSEG}}) — on the MM side, from its own number range.\n' +
      'The **FI document** ({{BKPF}}) — by document type (**WE** for {{MIGO}}, **RE** for {{MIRO}}).\n\n' +
      '{{MIRO}} also produces an **MM invoice number** ({{RBKP}}) — different from the FI document number, and ' +
      'the one shown on screen. It\'s not found in {{FB03}}; use {{MIR4}}.',

    postingLogic:
      'The chain from MM to FI:\n\n' +
      '**1. The movement type** ({{MSEG}} `BWART`) is determined — what is happening?\n' +
      '**2. The account assignment category** ({{EKPO}} `KNTTP`) — where will it be posted? (stock / expense / asset / project)\n' +
      '**3. {{degerleme-sinifi}}** ({{MSEG}} `BKLAS`) is taken from the material master.\n' +
      '**4. Transaction keys are determined:** which keys the movement type triggers (101 → BSX + WRX; 201 → BSX + GBB/VBR).\n' +
      '**5. {{OBYC}} is queried:** transaction key + valuation class → the G/L account from {{T030}}.\n' +
      '**6. {{fiyat-kontrolu}} is checked:** if there is a difference, to PRD if S, to stock if V.\n' +
      '**7. The FI document is generated.**\n\n' +
      'If any link of this chain is missing, "Account determination not possible" results.',

    belgeTuru:
      'The types of FI documents originating from MM: **WE** goods receipt, **WA** goods issue/consumption, ' +
      '**RE** logistics invoice, **WL** delivery (SD side). These types are defined in {{OBA7}} and are usually ' +
      'not changed.',

    numberRange:
      'There are three separate ranges and **all** of them must be opened at year-start: the FI document range ' +
      '({{FBN1}}), the material document range (on the MM side), and the MM invoice document range. Opening ' +
      'only the FI range and forgetting MM is the classic mistake that stalls goods receipts in January.',

    accountDetermination:
      '{{OBYC}} is the center of MM–FI integration. Key transaction keys:\n\n' +
      '**BSX** — the stock account. Varies by valuation class; each material group can use a different stock account.\n\n' +
      '**WRX** — the {{gr-ir}} account. Usually independent of the valuation class, a single account.\n\n' +
      '**PRD** — the price difference. Only comes into play on materials with {{fiyat-kontrolu}} = S.\n\n' +
      '**GBB** — the offsetting account. Split by general modifiers: **VBR** cost-center consumption, ' +
      '**VAX/VAY** cost of sales, **BSA** opening stock, **INV** inventory difference, **ZOB** goods receipt ' +
      'without a purchase order.\n\n' +
      '**FR1** — freight provision. **KDM** — exchange difference. **UMB** — revaluation difference.\n\n' +
      'All of them write to the {{T030}} table.',

    tur:
      '**Configuration:** {{OBYC}} account determination, movement type settings, tolerance limits, account ' +
      'assignment categories, valuation class definitions.\n\n' +
      '**Master data:** material master data (valuation class, price control, standard/moving average price), ' +
      'vendor master data.\n\n' +
      '**Transaction data:** orders, material documents, invoices.',

    transport:
      '{{OBYC}} settings transport. **But be careful:** they reference account numbers; if those accounts ' +
      'aren\'t open in the target system, the rules don\'t work.\n\n' +
      'Material master data and valuation class assignments are **master data**, they don\'t transport. That\'s ' +
      'why a scenario that works in the test system can give "account determination not possible" in ' +
      'production — the material\'s valuation class may be different.',

    img:[
      { yol:'SPRO → Materials Management → Valuation and Account Assignment → Account Determination → Account Determination Without Wizard → Configure Automatic Postings', not:'{{OBYC}} — the center of integration' },
      { yol:'SPRO → Materials Management → Valuation and Account Assignment → Account Determination → Simulate Account Determination', not:'{{OMWB}} — the test tool' },
      { yol:'SPRO → Materials Management → Logistics Invoice Verification → Invoice Block → Set Tolerance Limits', not:'{{MIRO}} block tolerances' },
      { yol:'SPRO → Materials Management → Purchasing → Account Assignment → Maintain Account Assignment Categories', not:'The K, A, F categories' },
      { yol:'SPRO → Materials Management → Inventory Management → Movement Types → Copy / Change Movement Types', not:'{{malzeme-hareket-turu}} settings' },
    ],

    ekstra:[
      { ic:'🔑', baslik:'A way to remember the OBYC transaction keys', metin:
        'Instead of memorizing the keys one by one, think about **which question each answers**:\n\n' +
        '**BSX** — "where does the material go?" → the stock account. It has to vary by material type, so ' +
        '{{degerleme-sinifi}} is active.\n\n' +
        '**WRX** — "where should the offsetting entry wait until the invoice arrives?" → GR/IR. A technical ' +
        'waiting place, so a single account is enough.\n\n' +
        '**PRD** — "where does the planned-vs-real price difference go?" → the price difference account.\n\n' +
        '**GBB** — "what gets posted against stock when it goes out?" → an expense, cost of sales, or an ' +
        'inventory difference, depending on the case. That\'s why it has sub-splits via the **general ' +
        'modifier** (VBR, VAX, INV…).\n\n' +
        'Viewed this way, which key comes into play in which situation becomes predictable.' },

      { ic:'⚖️', baslik:'The silent trap of moving average', metin:
        'For a material with {{fiyat-kontrolu}} = **V**, the invoice difference is said to be added to stock. ' +
        'But it has a **condition**: the stock must still be on hand.\n\n' +
        'Example: 100 tons of material arrived, all of it was consumed, then the invoice came in 10,000 TRY ' +
        'higher. The difference can\'t be added to stock — because there is no stock. The system posts the ' +
        'difference to the **price difference account** instead.\n\n' +
        'In a partial case it\'s even more complex: 100 tons arrived, 60 tons were consumed. 40% of the ' +
        'difference is added to stock, 60% goes to the price difference account.\n\n' +
        'Because this behavior is unexpected, the question "why did the PRD account move on a V material?" ' +
        'comes up often. The answer: the stock had run out.' },
    ],

    notlar:[
      { tip:'warn', baslik:'The MM period is separate from the FI period', metin:
        'MM has its own period control (managed with MMPV) and is independent of {{OB52}}.\n\n' +
        'The "Posting only possible in periods 03/2027 and 02/2027" error points to **the MM period**, not the ' +
        'FI period. Even if the FI period is open, a material movement can\'t be posted if MM is closed.\n\n' +
        'At closing, the order is: **MM is closed first**, then the FI closing steps proceed.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The **logic** of MM–FI integration hasn\'t changed: {{OBYC}} is the same, the transaction keys are the ' +
      'same, {{gr-ir}} is the same. What changed: material documents **merging into the MATDOC table**, ' +
      'inventory valuation moving into {{ACDOCA}}, and real-time stock reporting.',

    eccFarklari:[
      { konu:'Material document', ecc:'MKPF + {{MSEG}} separate tables', s4:'**MATDOC** merged into a single table; MSEG a {{uyumluluk-view}}' },
      { konu:'Stock totals', ecc:'Totals tables like MARD, MBEW', s4:'**Calculated instantly** from MATDOC; totals tables are views' },
      { konu:'Stock value', ecc:'In the MBEW table', s4:'{{ACDOCA}} + MATDOC — unified with FI' },
      { konu:'{{OBYC}}', ecc:'The account determination center', s4:'**Unchanged**' },
      { konu:'Invoice verification', ecc:'{{MIRO}}', s4:'{{MIRO}} + Fiori "Create Supplier Invoice"' },
      { konu:'Material number', ecc:'18 characters', s4:'Extended to **40 characters**' },
      { konu:'Stock reporting', ecc:'From totals tables', s4:'Real time, item-level' },
    ],

    universalJournal:
      'The FI effect of stock movements is written to {{ACDOCA}}, and the material, plant, and {{maliyet-yeri}} ' +
      'are held **on the same line**.\n\n' +
      'The practical result: "how much consumption of which material happened at which cost center?" is ' +
      'answered from a single table. In ECC this needed joining {{MSEG}} + {{BSEG}} + the CO tables.\n\n' +
      'Also, the reconciliation between the stock value and the accounting stock account is **structurally guaranteed**.',

    kalkanTcodes:[
      { eski:'MB01, MB1A, MB1B, MB1C, MB31', yeni:'{{MIGO}}', not:'Old material movement transactions removed; MIGO is the single entry point' },
      { eski:'Direct MKPF / MSEG queries', yeni:'MATDOC', not:'New development should use MATDOC' },
      { eski:'—', yeni:'—', not:'{{OBYC}}, {{MIRO}}, {{MRBR}}, {{MR11}} **were not removed**' },
    ],

    fiori:[
      { ad:'Post Goods Movement', aciklama:'The Fiori counterpart of {{MIGO}}.' },
      { ad:'Create Supplier Invoice', aciklama:'Replaces {{MIRO}}; order reference and account suggestion on a single screen.' },
      { ad:'Manage Purchase Orders', aciklama:'Replaces {{ME21N}}/{{ME23N}}; the purchase order history is visual.' },
      { ad:'GR/IR Monitor', aciklama:'Visually tracks unmatched {{gr-ir}} items by order.' },
      { ad:'Material Documents Overview', aciklama:'Replaces {{MB51}}; instant filtering and grouping.' },
      { ad:'Stock — Multiple Materials', aciklama:'A real-time stock view.' },
    ],

    compatibilityViews:[
      '{{MSEG}}, MKPF — {{uyumluluk-view}}s produced from MATDOC.',
      'Stock totals tables like MARD, MBEW also turned into views.',
      '{{EKKO}}, {{EKPO}}, {{EKBE}}, {{RBKP}}, {{RSEG}}, {{T030}} — **remain physical tables**.',
      'Old Z-programs that write directly to {{MSEG}} break during migration; they must be scanned.',
    ],

    performans:
      'Because stock reports are calculated instantly from MATDOC, totals-table maintenance disappeared — the ' +
      'rebuild programs that used to run when ECC\'s stock totals got corrupted became unnecessary.\n\n' +
      'Also, **lock contention** on simultaneous movements to the same material decreased: previously a ' +
      'totals-table row would get locked.',

    bestPractices:[
      'Build new reports on **MATDOC** or a CDS view instead of {{MSEG}}.',
      'Clean up the {{gr-ir}} account before migration; dirty open items migrate into the new system.',
      'Review {{OBYC}} definitions during migration: unused valuation classes and stale account assignments ' +
      'can be simplified.',
      'Scan custom programs writing to {{MSEG}}/MKPF before migration.',
      'The material number was extended to 40 characters — check field lengths in interfaces and custom programs.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'A new raw-material group: the anatomy of an "Account determination not possible" error',
    hikaye:
      '**Marmara Textiles Inc.** defines a new paint group, and the first order for it arrives. The warehouse ' +
      'clerk tries to post the goods receipt and gets an error. This scenario shows how the most common MM–FI ' +
      'integration error is diagnosed and resolved, and then walks through the accounting leg of the whole P2P chain.',
    veriler:[
      { k:'Company code', v:'1000 · Chart of accounts INT' },
      { k:'Material', v:'BOYA-450 · a new {{degerleme-sinifi}} **3020**' },
      { k:'Price control', v:'**S** (standard price) — 2,000 TRY/drum' },
      { k:'Order', v:'100 drums × 2,000 TRY = 200,000 TRY' },
      { k:'Vendor', v:'V-4001 Ege Kimya A.Ş. · payment term 30 days' },
    ],

    adimlar:[
      { baslik:'The order is opened — no FI entry', tcode:'ME21N',
        aciklama:'Purchasing enters the purchase order. The account assignment category is **blank** (a stock purchase).',
        girdi:[
          { alan:'Vendor / Material', deger:'V-4001 · BOYA-450' },
          { alan:'Quantity / Price', deger:'100 drums × 2,000 TRY' },
          { alan:'Account assignment category', deger:'**Blank** — a stock purchase, the material will enter inventory' },
        ],
        tabloEtkisi:[
          { tablo:'EKKO', ne:'Order header 4500003100' },
          { tablo:'EKPO', ne:'Item 10: BOYA-450, 100 drums, `KNTTP` blank' },
        ],
        not:'**No FI entry.** The order is a commitment; the debt arises once the goods are received.' },

      { baslik:'Goods receipt is attempted — ERROR', tcode:'MIGO',
        aciklama:'The warehouse clerk tries to receive and post the 100 drums and gets an error.',
        girdi:[
          { alan:'Movement type / Order', deger:'101 · 4500003100' },
          { alan:'**ERROR**', deger:'"Account determination for entry **INT BSX 3020** not possible"' },
          { alan:'What the message means', deger:'Chart of accounts INT · transaction key **BSX** (stock) · valuation class **3020**' },
        ],
        not:'The error message actually **tells you exactly** the problem: no stock account is defined for ' +
             'valuation class 3020. But the warehouse clerk can\'t read it and calls the MM consultant, who ' +
             'redirects to FI. **This is the typical difficulty of integration topics.**' },

      { baslik:'Diagnosis — the material\'s valuation class is checked', tcode:'MM03',
        aciklama:'First, which valuation class the material is in is confirmed.',
        girdi:[
          { alan:'Material', deger:'BOYA-450 → Accounting view' },
          { alan:'{{degerleme-sinifi}}', deger:'**3020** — a new group, never used before' },
          { alan:'{{fiyat-kontrolu}}', deger:'**S** — standard price 2,000 TRY' },
          { alan:'Comparison', deger:'The old paints are in class 3000 → that class is defined in {{OBYC}}' },
        ],
        not:'The problem is clear: the material was assigned to a new class, but {{OBYC}} has no account for that class.' },

      { baslik:'Confirmed with {{OMWB}}', tcode:'OMWB',
        aciklama:'A simulation is run without posting — exactly which keys are missing becomes visible.',
        girdi:[
          { alan:'Plant / Material / Movement type', deger:'1000 · BOYA-450 · 101' },
          { alan:'BSX (stock)', deger:'**Undefined** — no account for class 3020' },
          { alan:'WRX (GR/IR)', deger:'✓ 159000 — independent of the class, defined' },
          { alan:'PRD (price difference)', deger:'✓ 711000 — defined' },
        ],
        not:'Only **BSX is missing**. WRX and PRD work because they are defined independently of the valuation ' +
             'class. Thanks to this asymmetry, the fix will take a single line.' },

      { baslik:'{{OBYC}} is completed', tcode:'OBYC',
        aciklama:'An account for valuation class 3020 is added to the BSX transaction key.',
        girdi:[
          { alan:'Transaction key', deger:'**BSX** — stock entry' },
          { alan:'Existing lines', deger:'Class 3000 → 150000 · class 3100 → 153000' },
          { alan:'**Line added**', deger:'Class **3020** → account **150200** (Paint and chemicals stock)' },
          { alan:'Verification', deger:'{{OMWB}} run again → BSX ✓' },
        ],
        tabloEtkisi:[
          { tablo:'T030', ne:'New line: KTOSL = BSX, BKLAS = 3020, KONTS = 150200' },
        ],
        not:'The fix took **30 seconds**. Finding it took half a day. That\'s why {{OMWB}} should be run ' +
             'routinely whenever a new material group is defined.' },

      { baslik:'Goods receipt succeeds — the first FI entry', tcode:'MIGO',
        aciklama:'The same transaction is repeated, and this time an FI document is created.',
        girdi:[
          { alan:'Movement type / Quantity', deger:'101 · 100 drums' },
          { alan:'Value', deger:'100 × 2,000 = 200,000 TRY (**at the order price**)' },
        ],
        fis:{ baslik:'Document 5000002100 (material) / 4900001234 (FI) — Goods receipt', belgeTuru:'WE', tarih:'10.03.2027',
          satirlar:[
            { hesap:'150200', ad:'Paint and chemicals stock', borc:200000, not:'{{OBYC}} → **BSX** · class 3020' },
            { hesap:'159000', ad:'GR/IR account', alacak:200000, not:'{{OBYC}} → **WRX**' },
          ], not:'There is **no** debt to the vendor — the invoice hasn\'t arrived. {{gr-ir}} carries this gap.' },
        tabloEtkisi:[
          { tablo:'MSEG', ne:'Movement type 101, valuation class 3020' },
          { tablo:'EKBE', ne:'A line added to the order history: `VGABE` = **1** (goods receipt), 100 drums' },
          { tablo:'BKPF', ne:'`AWTYP` = **MKPF**, `AWKEY` = 5000002100 → the source can be traced' },
          { tablo:'BSIS', ne:'A new open item on account 159000 (credit 200,000)' },
        ] },

      { baslik:'The invoice arrives — a price difference appears', tcode:'MIRO',
        aciklama:'The vendor billed **2,100 TRY/drum**. The order was 2,000 TRY. Since price control is **S**, ' +
                 'the difference is **not** added to stock.',
        girdi:[
          { alan:'Invoice date / Reference', deger:'18.03.2027 · EGE-2027-0812' },
          { alan:'Purchase order', deger:'4500003100 → the item came in automatically' },
          { alan:'System proposal', deger:'100 drums × 2,000 = 200,000 TRY' },
          { alan:'Invoice amount', deger:'100 drums × 2,100 = **210,000 TRY** + 20% VAT' },
          { alan:'Difference', deger:'10,000 TRY — outside the 3% tolerance (6,000 TRY) → **blocked**' },
        ],
        fis:{ baslik:'Document 5100001200 (MM) / 1900002340 (FI) — Vendor invoice', belgeTuru:'RE', tarih:'18.03.2027',
          satirlar:[
            { hesap:'159000', ad:'GR/IR account', borc:200000, not:'Closed **at the order price**' },
            { hesap:'711000', ad:'Price difference', borc:10000, not:'{{OBYC}} → **PRD** · price control S' },
            { hesap:'191', ad:'Deductible VAT', borc:42000 },
            { hesap:'320', ad:'Trade payables — V-4001', alacak:252000 },
          ], not:'**The stock value didn\'t change** — account 150200 stays at 200,000 TRY. The remaining ' +
                 '10,000 TRY price difference went to the price difference account. The standard price is a ' +
                 'planning price; its difference from reality is tracked separately in account 711.\n\n' +
                 'Had price control been **V**, the 10,000 TRY would have been added to stock and the unit ' +
                 'price would have become 2,100.' },
        tabloEtkisi:[
          { tablo:'RBKP', ne:'MM invoice 5100001200; `ZLSPR` = **R** (price variance block)' },
          { tablo:'RSEG', ne:'Invoice item: order 4500003100 item 10' },
          { tablo:'EKBE', ne:'A line added to the order history: `VGABE` = **2** (invoice), 100 drums / 210,000 TRY' },
          { tablo:'BSIK', ne:'Vendor open item 252,000 TRY — **blocked for payment**' },
          { tablo:'BSIS', ne:'The open item on account 159000 closed' },
        ],
        not:'The invoice **was recorded** but blocked for payment. This is not a bug, it is by design: the ' +
             'system leaves the variance to human approval.' },

      { baslik:'The block is investigated and resolved', tcode:'MRBR',
        aciklama:'The AP specialist checks {{ME23N}} → the purchase order history and asks purchasing.',
        girdi:[
          { alan:'{{ME23N}} purchase order history', deger:'GR: 100 drums / 200,000 · IR: 100 drums / 210,000 → quantity matches, price differs' },
          { alan:'Purchasing\'s answer', deger:'A price increase was agreed by contract in early March, but the order was never updated' },
          { alan:'Decision', deger:'The difference is **justified** → released with {{MRBR}}' },
        ],
        not:'Until the block is lifted, {{F110}} **never sees** this invoice. The longer block management ' +
             'drags on, the more the {{iskonto}} opportunity slips away.' },

      { baslik:'The material is consumed', tcode:'MIGO',
        aciklama:'Production draws 40 drums of paint. Stock turns into an expense.',
        girdi:[
          { alan:'Movement type', deger:'**201** — cost-center consumption' },
          { alan:'Quantity / Cost center', deger:'40 drums · 3100 (Production)' },
        ],
        fis:{ baslik:'Document 4900001456 — Material consumption', belgeTuru:'WA', tarih:'25.03.2027',
          satirlar:[
            { hesap:'730', ad:'Manufacturing overhead expense — materials', borc:80000, not:'{{OBYC}} → **GBB/VBR** · 40 × 2,000' },
            { hesap:'150200', ad:'Paint and chemicals stock', alacak:80000, not:'{{OBYC}} → **BSX** (reverse direction)' },
          ], not:'The consumption was valued at the **standard price** (2,000 TRY), not the invoice price. ' +
                 'This is the consequence of standard-price logic: costs stay predictable, and the deviation is ' +
                 'tracked separately in account 711.' },
        tabloEtkisi:[
          { tablo:'MSEG', ne:'Movement type 201, cost center 3100' },
          { tablo:'ACDOCA', ne:'An expense line; material + cost center **on the same line**' },
        ] },

      { baslik:'Period end — GR/IR check', tcode:'FBL3N',
        aciklama:'For this order, the goods receipt and invoice matched; the item is cleared.',
        girdi:[
          { alan:'Account 159000 · open items', deger:'No item for this order — matched ✓' },
          { alan:'Other orders', deger:'12 open items, totaling 340,000 TRY' },
          { alan:'Action', deger:'{{F.13}} was run → 8 items cleared · the rest to be classified with {{F.19}}' },
        ] },
    ],

    sonuc:
      '**Chain summary:** order (no FI entry) → goods receipt (stock + GR/IR) → invoice (GR/IR closed, the ' +
      'difference to PRD) → block resolution → consumption (stock → expense).\n\n' +
      '**Four key lessons:**\n\n' +
      '**1. The error message tells you exactly what\'s wrong, but no one reads it.** "INT BSX 3020" carried ' +
      'three pieces of information: the chart of accounts, the transaction key, the valuation class. Anyone who ' +
      'can read this triplet solves the problem in 30 seconds.\n\n' +
      '**2. {{OMWB}} could have caught this in advance.** Running a simulation when a new material group is ' +
      'defined prevents hitting the error live. It should become routine.\n\n' +
      '**3. {{gr-ir}} always closes at the order price.** Even if the invoice comes in different. The ' +
      'difference goes to a separate account, and **{{fiyat-kontrolu}}** decides where: to the price difference ' +
      'account if S, to stock if V.\n\n' +
      '**4. The line of responsibility in integration problems is blurry.** The error showed up in MM, the fix ' +
      'was in FI. That\'s why whoever sets up {{OBYC}} has to know **both modules** — and for an FI consultant, ' +
      'MM integration is not an optional topic.',
  },

  },
});
