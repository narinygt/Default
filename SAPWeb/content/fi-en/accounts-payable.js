/* ==========================================================================
   content/fi-en/accounts-payable.js — English body for "Accounts Payable"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'accounts-payable',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      "Accounts Payable (FI-AP) is the FI sub-component that manages the company's **debts to vendors**. " +
      'It covers the whole chain from the invoice arriving, to the payment being made, to the debt being cleared.\n\n' +
      "AP is a {{muavin-defter}}: every vendor's detail is held here, and it reflects into general ledger as a " +
      'single line through a {{mutabakat-hesabi}}. The balance sheet shows "320 Trade payables 4,500,000 TRY"; ' +
      'who the 800 vendors behind it are is in AP.',

    neden:
      "**To answer the question of how much we owe.** The company's cash planning rests on this figure.\n\n" +
      '**To pay on time and correctly.** Pay early and you squeeze cash; pay late and you lose reputation and ' +
      '{{iskonto}}. AP strikes this balance through due-date tracking.\n\n' +
      "**To ensure control.** Almost all of the company's cash outflow goes through AP. That's why AP is the " +
      'area with the heaviest internal control and fraud risk.',

    sirketOnemi:
      'AP is the accounting leg of the **Procure-to-Pay (P2P)** process and works hand-in-hand with MM. ' +
      'Purchasing opens the order, the warehouse receives the goods, AP processes the invoice and pays it.\n\n' +
      "The critical point for consulting: **most AP invoices aren't entered manually in FI, they come from " +
      'MM.** An AP consultant has to know {{MIRO}}, {{uc-yonlu-eslestirme}}, and {{OBYC}} account determination. ' +
      'The question "what\'s the difference between FB60 and MIRO?" probes exactly this distinction.',

    gercekHayat:
      'A manufacturing company receives 1,200 vendor invoices a month. 900 of them are tied to a purchase order ' +
      '(raw material, packaging) and entered via {{MIRO}}; 300 are service invoices with no order (rent, ' +
      'consulting, electricity) and entered via {{FB60}}.\n\n' +
      'At month-end the accounting manager runs {{F110}}: the system selects the 340 invoices that are due, ' +
      'merges the ones belonging to the same vendor, produces 47 payments, and sends a single file to the bank. ' +
      'Done by hand, this would take days and errors would be unavoidable.',

    muhasebeMantigi:
      'In AP, accounting happens in **three stages**, and each stage produces a separate entry:\n\n' +
      '**1. The debt arises (invoice).** The expense or asset is debited, the vendor is credited. No cash ' +
      'leaves at this point — the classic application of {{tahakkuk-esasi}}.\n\n' +
      '**2. The payment is made.** The vendor is debited (the liability decreases), the bank is credited (cash goes out).\n\n' +
      '**3. Clearing ({{kapatma}}).** The invoice is matched against the payment and the item becomes ' +
      '"cleared." Steps 2 and 3 usually happen together in one transaction ({{F-53}} or {{F110}}).\n\n' +
      'The vendor line is never posted directly to a G/L account; the **vendor number** is entered, and SAP ' +
      'finds the reconciliation account itself from the `AKONT` field in {{LFB1}}.',

    kavramlar: ['mutabakat-hesabi', 'acik-kalem', 'kapatma', 'odeme-kosulu', 'vade', 'iskonto',
                'odeme-yontemi', 'odeme-blogu', 'gr-ir', 'uc-yonlu-eslestirme', 'yaslandirma', 'avans'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The AP process is the second half of the **Procure-to-Pay** chain. The chain starts with a purchase ' +
      'requisition and ends with payment. AP comes into play when the invoice arrives — but how the invoice ' +
      "gets processed splits from the start depending on **whether it's tied to a purchase order**.",

    roller:[
      { rol:'Requesting department', gorev:'Opens a purchase requisition (states the need).' },
      { rol:'Purchasing', gorev:'Selects the vendor, negotiates price, opens the order ({{ME21N}}).' },
      { rol:'Warehouse / Goods receipt', gorev:'Receives the goods and records them in the system ({{MIGO}}). This entry generates the stock and {{gr-ir}} posting in FI.' },
      { rol:'AP accounting specialist', gorev:'Processes the invoice ({{MIRO}} or {{FB60}}), investigates variances, manages blocks.' },
      { rol:'Accounting manager', gorev:'Approves the payment proposal, removes blocks, reviews high-value payments.' },
      { rol:'Treasury / Finance', gorev:'Runs {{F110}}, sends the bank file, does cash planning.' },
      { rol:'FI consultant', gorev:'Designs {{FBZP}} payment configuration, {{OBYC}} account determination, tolerance and block rules.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Procure-to-Pay — from purchasing to payment',
      adimlar:[
        { ic:'📝', rol:'Requesting department', baslik:'A purchase requisition is opened',
          aciklama:"The need is stated. There's no accounting entry yet — a requisition isn't even a commitment.",
          cikti:'Purchase requisition', ok:'goes through approval' },
        { ic:'🛒', rol:'Purchasing', baslik:'A purchase order is opened ({{ME21N}})',
          aciklama:"The vendor, quantity, price, and delivery date are set. **There's still no FI entry** — the order is a commitment, not a debt.",
          cikti:'{{EKKO}} / {{EKPO}} records', ok:'goods arrive' },
        { ic:'📦', rol:'Warehouse', baslik:'Goods receipt is posted ({{MIGO}})',
          aciklama:"**The first FI entry is born here:** stock is debited, {{gr-ir}} is credited. The vendor isn't debited yet because the invoice hasn't arrived.",
          cikti:'Material document + FI document', ok:'invoice arrives' },
        { ic:'🧾', rol:'AP accounting', baslik:'The invoice is processed ({{MIRO}} or {{FB60}})',
          aciklama:'If tied to an order, {{uc-yonlu-eslestirme}} is done via {{MIRO}}. If not, directly via {{FB60}}. ' +
                   '{{gr-ir}} closes, the vendor is credited.',
          cikti:'Vendor open item ({{BSIK}})', ok:"blocked if there's a variance" },
        { ic:'🚦', rol:'AP accounting', baslik:'Variance check and block management',
          aciklama:'If the price or quantity variance is outside tolerance, the invoice is blocked for payment. It is investigated and released with {{MRBR}}.',
          cikti:'Payable open item', ok:'due date arrives' },
        { ic:'⚡', rol:'Treasury', baslik:'Payment is run ({{F110}})',
          aciklama:'Items that are due are selected, a proposal is generated, and after approval the payment is posted and a bank file is created.',
          cikti:'Payment document + {{REGUH}}/{{REGUP}}', ok:'the item is cleared' },
        { ic:'🔗', rol:'System', baslik:'The open item is cleared',
          aciklama:'The invoice matches the payment; the item moves from {{BSIK}} to {{BSAK}} and the clearing document is written into the `AUGBL` field.',
          cikti:'Cleared item', ok:'the bank statement arrives' },
        { ic:'🏦', rol:'Treasury', baslik:'The bank statement is processed',
          aciklama:'{{banka-ara-hesabi}} is cleared, the real bank account is settled. Cash outflow only becomes final here.',
          cikti:'Reconciled bank account' },
      ],
    },

    adimlar:[
      { rol:'Purchasing', eylem:'Opens the order', sistem:'{{ME21N}} → {{EKKO}}/{{EKPO}} — no FI entry' },
      { rol:'Warehouse', eylem:'Receives the goods', sistem:'{{MIGO}} → stock debit / {{gr-ir}} credit' },
      { rol:'AP accounting', eylem:'Processes the PO-based invoice', sistem:'{{MIRO}} → {{gr-ir}} debit / vendor credit' },
      { rol:'AP accounting', eylem:'Processes the non-PO invoice', sistem:'{{FB60}} → expense debit / vendor credit' },
      { rol:'AP accounting', eylem:'Resolves blocked invoices', sistem:'{{MRBR}}, {{FB09}}' },
      { rol:'Treasury', eylem:'Makes bulk payments', sistem:'{{F110}} → {{REGUH}}/{{REGUP}}' },
      { rol:'AP accounting', eylem:'Makes a one-off payment', sistem:'{{F-53}} or {{F-58}}' },
      { rol:'AP accounting', eylem:'Clears unmatched items', sistem:'{{F-44}}' },
      { rol:'AP accounting', eylem:'Pulls an aging report', sistem:'{{FBL1N}}, {{S_ALR_87012078}}' },
    ],

    veriAkisi:{
      nereden:'The purchase order and goods receipt from MM; the paper/e-invoice coming from the vendor; the payment term and reconciliation account from {{BP}} master data.',
      nereye:'Into {{BSIK}} open items → into the {{F110}} payment pool → to the bank file; in general ledger, into the {{mutabakat-hesabi}} and the balance sheet.',
      tetikleyen:'The vendor invoice arriving. If tied to an order, the goods receipt has already generated an FI entry.',
      sonraki:'Payment, bank statement reconciliation, {{gr-ir}} analysis at period end ({{F.19}}), and aging.',
    },

    notlar:[
      { tip:'tip', baslik:"Why doesn't a purchase order generate an FI entry?", metin:
        'A purchase order is a **commitment**, not a liability. In accounting, the debt arises once the goods ' +
        "or service is received. That's why the order is only written to the MM tables ({{EKKO}}/{{EKPO}}). It " +
        'can appear as a budget commitment on the CO side, but it never hits FI.' },
      { tip:'warn', baslik:'Two different invoice paths, two different sources of trouble', metin:
        '{{FB60}} errors usually come from **FI settings** (period, field status, tax code). {{MIRO}} errors ' +
        'usually come from **MM settings** ({{OBYC}}, tolerance, order data). Before you start troubleshooting, ' +
        'figure out which path the invoice came in through — looking in the wrong place wastes hours.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      "AP's accounting chain is the same economic event recorded at three separate moments: **goods arrived → " +
      'invoice arrived → payment made**. Each step closes the previous one. Below is the full chain for a ' +
      'PO-based purchase, followed by the shortcut for a non-PO purchase.',

    etkilenenHesaplar:[
      { hesap:'320 Trade payables (reconciliation)', tur:'Balance sheet — Liability', neden:"The debt owed to the vendor. **Credited** (increases) by the invoice, **debited** (decreases) by the payment. Can't be posted to directly." },
      { hesap:'159 GR/IR account', tur:'Balance sheet — Clearing', neden:'Carries the timing gap between the goods receipt and the invoice receipt. {{acik-kalem-yonetimi}} **must be on**.' },
      { hesap:'153 Trade goods / 7xx Expenses', tur:'Balance sheet / Income statement', neden:"Depends on the nature of what was received: an asset if it will be stocked, an expense if it will be consumed." },
      { hesap:'191 Deductible VAT', tur:'Balance sheet — Asset', neden:'A receivable from the state arises. The line is generated automatically once a {{vergi-kodu}} is entered, and written to {{BSET}}.' },
      { hesap:'102 Banks / bank clearing account', tur:'Balance sheet — Asset', neden:'Decreases on payment. {{banka-ara-hesabi}} is used between the payment posting and the actual outflow.' },
      { hesap:'159 Down payments made (special G/L)', tur:'Balance sheet — Asset', neden:'When an {{avans}} is paid, this runs instead of the normal reconciliation account ({{ozel-ana-muhasebe-gostergesi}}).' },
      { hesap:'602 / 653 Exchange difference', tur:'Income statement', neden:'If a foreign-currency invoice is at a different rate at payment time, a realized {{kur-farki}} arises.' },
    ],

    fisler:[
      { baslik:'Step 1 — Goods receipt ({{MIGO}}) · 100,000 TRY of raw material',
        belgeTuru:'WE', tarih:'05.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'153', ad:'Trade goods (stock)', borc:100000, not:'{{OBYC}} transaction key **BSX**' },
          { hesap:'159', ad:'GR/IR account', alacak:100000, not:'{{OBYC}} transaction key **WRX**' },
        ],
        not:"There's **no** debt to the vendor yet — the invoice hasn't arrived. {{gr-ir}} carries this gap. " +
             "The accountant doesn't see this entry; the warehouse staff generates it." },

      { baslik:'Step 2 — Invoice entry ({{MIRO}}) · matches the order price',
        belgeTuru:'RE', tarih:'12.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'GR/IR account', borc:100000, not:'Closes the credit from the goods receipt' },
          { hesap:'191', ad:'Deductible VAT', borc:20000 },
          { hesap:'320', ad:'Trade payables — V-4001', alacak:120000, not:'The debt now sits with the vendor' },
        ],
        not:"{{gr-ir}} is zeroed out: both the goods and the invoice have arrived. Thanks to " +
             '{{acik-kalem-yonetimi}}, these two items are now able to offset each other and match automatically via {{F.13}}.' },

      { baslik:'Step 3 — Payment ({{F110}}) · due date reached, discount period passed',
        belgeTuru:'KZ', tarih:'12.10.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-4001', borc:120000, not:'The open item is being cleared' },
          { hesap:'102', ad:'Banks (clearing account)', alacak:120000 },
        ],
        not:"Payment and clearing happen **in a single transaction**. The item moves from {{BSIK}} to " +
             "{{BSAK}}, and this document's number is written to the `AUGBL` field." },

      { baslik:'Alternative — had an early payment been made (2% discount)',
        belgeTuru:'KZ', tarih:'22.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-4001', borc:120000, not:'The full debt is cleared' },
          { hesap:'102', ad:'Banks', alacak:117600, not:'The amount actually paid' },
          { hesap:'602', ad:'Discounts received (income)', alacak:2000, not:'2% × 100,000 (on the net amount)' },
          { hesap:'191', ad:'Deductible VAT correction', alacak:400, not:'VAT is also corrected by the discount amount' },
        ],
        not:'The full debt (120,000) is cleared, but only 117,600 TRY is paid. The difference is **income**. ' +
             'SAP knows the {{iskonto}} period from the {{odeme-kosulu}} and {{F110}} picks the most advantageous payment day on its own.' },

      { baslik:'Non-PO invoice — the shortcut ({{FB60}}) · 60,000 TRY consulting',
        belgeTuru:'KR', tarih:'15.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:50000, not:'Cost center mandatory' },
          { hesap:'191', ad:'Deductible VAT', borc:10000 },
          { hesap:'320', ad:'Trade payables — V-2001', alacak:60000 },
        ],
        not:"Since there's no order and no goods receipt, {{gr-ir}} never comes into play. The debt arises " +
             'with a single entry. The standard route for service purchases.' },

      { baslik:'Down payment ({{F-48}}) · special G/L indicator A',
        belgeTuru:'KZ', tarih:'01.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'Down payments made on orders', borc:30000, not:'`UMSKZ` = A → alternative account' },
          { hesap:'102', ad:'Banks', alacak:30000 },
        ],
        not:'The vendor is the same, the reconciliation account is 320 — but because the ' +
             '{{ozel-ana-muhasebe-gostergesi}} "A" was entered, the posting did not go to 320. An {{avans}} ' +
             "isn't a liability, it's a **receivable**; it needs to be shown separately on the balance sheet. " +
             'Once the invoice arrives, it is offset with {{F-54}}.' },
    ],

    tHesaplar:[
      { hesap:'Trade payables (reconciliation)', kod:'320',
        borc:[{ ad:'F110 payment', tutar:120000 }, { ad:'Down payment offset', tutar:30000 }],
        alacak:[{ ad:'MIRO invoice', tutar:120000 }, { ad:'FB60 invoice', tutar:60000 }],
        not:'The credit balance = unpaid debt' },
      { hesap:'GR/IR account', kod:'159 (clearing)',
        borc:[{ ad:'Invoice entry (MIRO)', tutar:100000 }],
        alacak:[{ ad:'Goods receipt (MIGO)', tutar:100000 }],
        not:'Should be zero at period end' },
      { hesap:'Down payments made', kod:'159 (special G/L)',
        borc:[{ ad:'Down payment (F-48)', tutar:30000 }],
        alacak:[{ ad:'Offset against invoice (F-54)', tutar:30000 }],
        not:'Cleared once offset' },
      { hesap:'Banks', kod:'102',
        borc:[],
        alacak:[{ ad:'Vendor payments', tutar:120000 }, { ad:'Down payment', tutar:30000 }],
        not:'Cash outflow' },
    ],

    notlar:[
      { tip:'warn', baslik:'Why is the discount calculated on the net amount?', metin:
        'A discount is given on the price of the goods, not on VAT. So on a 120,000 TRY invoice, a 2% ' +
        'discount = 100,000 × 2% = **2,000 TRY**, not 2,400 TRY. The deductible VAT is also corrected by the ' +
        'discount amount. SAP does this based on the "discount base" choice in the {{odeme-kosulu}} setting.' },
      { tip:'tip', baslik:'Is a discount income, or a cost reduction?', metin:
        'There are two methods. **Gross method** (common): the invoice is posted at the full amount, and the ' +
        'discount is posted as income at payment time. **Net method**: the invoice is posted net of the ' +
        'discount from the start, and if the discount is missed, an expense is posted. Turkey uses the gross ' +
        'method; SAP supports both (set in the {{odeme-kosulu}} configuration).' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      "AP varies along four separate axes: how the invoice **arrives**, how the payment is **made**, the " +
      "**type** of clearing, and the transaction's **special G/L** category. In practice these distinctions " +
      'are often mixed up.',

    liste:[
      { ad:'Non-PO Invoice — FB60',
        aciklama:'A vendor invoice entered directly into FI without a purchase order or goods receipt. The expense account and cost center are selected by hand.',
        neZaman:"For service purchases: rent, consulting, electricity, insurance, legal fees. For expenses that aren't stocked and aren't tracked by order.",
        ornek:'A 50,000 TRY consulting invoice → 770 expense debit / 320 vendor credit.',
        tcodes:['FB60','FB65','F-43'] },

      { ad:'PO-based Invoice — MIRO',
        aciklama:"An invoice based on a purchase order and a goods receipt. {{uc-yonlu-eslestirme}} is performed: order ↔ goods receipt ↔ invoice. " +
                 "The account isn't chosen by the user, {{OBYC}} determines it.",
        neZaman:'For every stocked good and every order-tracked purchase. In corporate companies, most invoices arrive this way.',
        ornek:'100,000 TRY raw material → GR/IR debit / 320 vendor credit. If there is a price variance, the invoice is blocked.',
        tcodes:['MIRO','MIGO','MRBR','ME23N'] },

      { ad:'Credit Memo',
        aciklama:"A return or discount document from the vendor. It is the **reverse** of an invoice: the vendor is debited, the expense/stock is credited.",
        neZaman:'On goods returns, price corrections, and discounts given after the fact.',
        ornek:'Defective goods returned → 320 vendor debit 24,000 / 153 stock credit 20,000 / 191 VAT credit 4,000.',
        tcodes:['FB65','MIRO'] },

      { ad:'Manual Payment — F-53 / F-58',
        aciklama:'Records a single payment by hand and clears the open item. {{F-58}} also prints a check/form.',
        neZaman:"For urgent one-off payments, exceptions outside {{F110}}'s scope, and in small companies.",
        ornek:'An urgent payment made by hand to a vendor.',
        tcodes:['F-53','F-58'] },

      { ad:'Automatic Payment Program — F110',
        aciklama:'Selects every due item in bulk, generates a proposal, pays after approval, and creates a bank file. ' +
                 'Merges items belonging to the same vendor into a single payment.',
        neZaman:'For routine payment cycles — the standard method for corporate companies.',
        ornek:'A payment run executed twice a month: 340 invoices → 47 payments → 1 bank file.',
        tcodes:['F110','FBZP','FBPM','F110S'] },

      { ad:'Down Payment — F-47 / F-48 / F-54',
        aciklama:'A payment made before goods/services are delivered. Kept separate from the normal debt using the {{ozel-ana-muhasebe-gostergesi}}. ' +
                 'Three steps: request ({{F-47}}) → payment ({{F-48}}) → offset ({{F-54}}).',
        neZaman:'For an order deposit, a payment before a letter of credit on a foreign purchase, and for project down payments.',
        ornek:'A 30,000 TRY down payment → 159 down payments made debit / 102 bank credit. Sits as an **asset** on the balance sheet.',
        tcodes:['F-47','F-48','F-54','OBYR'] },

      { ad:'Partial Clearing',
        aciklama:'Part of the debt is paid; **the original item stays open**, and the payment stands as a separate open item.',
        neZaman:'When paying the undisputed part of a disputed invoice. Aging is not distorted since the original due date is preserved.',
        ornek:'80,000 TRY of a 120,000 TRY debt was paid → two open items: +120,000 and −80,000.',
        tcodes:['F-53','FB05'] },

      { ad:'Residual Clearing',
        aciklama:'The original item **is cleared**, and a new open item is generated for the remaining amount.',
        neZaman:'When the difference is permanent and tied to a new due date.',
        ornek:'120,000 TRY was cleared, a new 40,000 TRY item was created — its **due date starts from today**.',
        tcodes:['F-53','FB05'] },
    ],

    karsilastirmaBasliklar:['FB60 (FI Invoice)', 'MIRO (MM Invoice)'],
    karsilastirma:[
      ['Is a purchase order required', 'No', 'Yes — entered with a reference to the order'],
      ['Is a goods receipt required', 'No', 'Usually yes ({{uc-yonlu-eslestirme}})'],
      ['Who determines the account', 'The user selects it by hand', '{{OBYC}} determines it automatically'],
      ['Does GR/IR come into play', 'No', 'Yes — closes the item from the goods receipt'],
      ['Document type', 'KR', 'RE'],
      ['Extra tables', 'None', '{{RBKP}} / {{RSEG}} / {{EKBE}}'],
      ['Variance check', 'None', 'Out-of-tolerance variance → **payment block**'],
      ['Typical use', 'Rent, consulting, electricity', 'Raw material, trade goods, packaging'],
      ['Source of errors', 'FI settings (period, field status)', 'MM settings (OBYC, tolerance, order)'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FB60', ad:'Vendor invoice entry (non-PO)',
        amac:'Records a vendor invoice not tied to a purchase order directly in FI.',
        neZaman:'For service purchases like rent, consulting, electricity; for every invoice with no order and no goods receipt.',
        adimlar:[
          { baslik:'Enter the vendor number and company code',
            aciklama:'The moment the vendor is entered, the address, bank, and payment term appear on the right of the screen. ' +
                     'The due date, {{mutabakat-hesabi}}, and payment method come **automatically** from master data.' },
          { baslik:'Enter the invoice date, posting date, and reference',
            aciklama:"Type the vendor's invoice number into the reference (`XBLNR`) field — the duplicate invoice check looks at this field." },
          { baslik:'Enter the gross amount and tax code',
            aciklama:'If you check "Calculate tax," SAP splits out the VAT line from the gross amount.' },
          { baslik:'Enter the expense lines',
            aciklama:'G/L account, amount, and **cost center**. A CO object is usually mandatory on expense accounts.' },
          { baslik:'Check the due date and payment term',
            aciklama:'Shown on the *Payment* tab. Comes from master data but can be overridden for this specific invoice.' },
          { baslik:'Simulate and save',
            aciklama:'The simulation shows the VAT line and any {{belge-bolme}} lines. Once saved, an {{acik-kalem}} is created in {{BSIK}}.' },
        ],
        ekranAkisi:[
          { ekran:'Basic data tab', islem:'Vendor V-2001 · Invoice date 15.09.2026 · Reference DAN-2026-0912 · Amount 60,000 · Tax code 20%' },
          { ekran:'Line item table', islem:'770 General administrative expense · 50,000 · Cost center 1200' },
          { ekran:'Payment tab', islem:'Payment term ZB01 (from master data) · Due date 15.10.2026 · Payment method H' },
          { ekran:'Simulation', islem:'3 lines: 770 debit 50,000 / 191 debit 10,000 / 320 credit 60,000 → Save' },
        ],
        alanlar:{
          zorunlu:['Vendor','Invoice date','Posting date','Company code','Amount','G/L account','Tax code (if the account requires it)'],
          opsiyonel:['Reference','Header text','Cost center','Payment term','Payment block','Due date','Assignment'] },
        hatalar:[
          { mesaj:'Vendor 100234 is blocked for posting', sebep:'There is a posting block on the vendor master ({{LFA1}} `SPERR` or {{LFB1}}).', cozum:'{{BP}} → remove the block in the relevant role. If the block was deliberate, investigate the reason first.' },
          { mesaj:'Check document number ... — duplicate invoice', sebep:'An invoice with the same reference number from the same vendor has already been entered.', cozum:"It is a warning, not an error. If it is genuinely a duplicate, cancel it; if it is a different invoice, fix the reference and continue." },
          { mesaj:'Tax code V1 does not appear in any G/L account item', sebep:'A tax code was entered but there is no taxable expense line.', cozum:'Select the same tax code on the expense line too, or remove the tax code from the header.' },
          { mesaj:'Posting period ... is not open for account type K', sebep:'The period is closed for the vendor account type (K).', cozum:'Open the period on the **K** line in {{OB52}} — opening only the S line is not enough.' },
          { mesaj:'Field Cost Center is a required field', sebep:"The expense account's {{alan-durumu}} group makes the cost center mandatory.", cozum:'Enter a cost center, or define a default with {{OKB9}}.' },
        ],
        ipucu:"For invoices that recur regularly from the same vendor, set up an **account assignment model**; " +
              "the expense account and cost center come pre-filled. Also don't leave the reference field blank — " +
              'it is the sole basis for the duplicate invoice check.',
        ilgili:['FB65','MIRO','F-43','FBL1N','FB03'] },

      { kod:'MIRO', ad:'Logistics invoice verification (PO-based invoice)',
        amac:'Records an invoice based on a purchase order and goods receipt; performs {{uc-yonlu-eslestirme}}.',
        neZaman:'For every stocked good and every purchase tracked by order.',
        adimlar:[
          { baslik:'Choose the transaction type: Invoice / Credit Memo' },
          { baslik:"Enter the invoice date and the vendor's invoice number" },
          { baslik:'Enter the reference object: the purchase order number',
            aciklama:'Once the order is entered, the system automatically pulls up items that **have been ' +
                     'goods-receipted but not invoiced**, and proposes the quantity/amount.' },
          { baslik:'Compare the proposed quantity and amount against the invoice',
            aciklama:'This is the heart of the job. If the order price is 100 TRY and the invoice is 105 TRY, a ' +
                     'variance arises and the tolerance check kicks in.' },
          { baslik:'Check the balance indicator',
            aciklama:'The indicator at the top right should be green: the gross amount entered = the item total + tax.' },
          { baslik:'Simulate and save',
            aciklama:'If the variance exceeds tolerance, the invoice is saved **but blocked for payment** ' +
                     '(`ZLSPR` filled). This is not an error, it is by design.' },
        ],
        ekranAkisi:[
          { ekran:'Header', islem:'Transaction: Invoice · Invoice date 12.09.2026 · Reference FTR-889 · Gross amount 120,000' },
          { ekran:'Reference object', islem:'Purchase order 4500002345 → items come in automatically' },
          { ekran:'Line item table', islem:'100 pieces × 1,000 TRY = 100,000 TRY · Tax code 20%' },
          { ekran:'Payment tab', islem:'Due date 12.10.2026 · Payment block blank (no variance)' },
          { ekran:'Simulation', islem:'159 debit 100,000 / 191 debit 20,000 / 320 credit 120,000' },
        ],
        alanlar:{
          zorunlu:['Transaction type','Invoice date','Reference (vendor invoice no.)','Gross amount','Purchase order','Tax code'],
          opsiyonel:['Posting date','Payment term','Payment block','Planned additional costs','Text'] },
        hatalar:[
          { mesaj:'Balance not zero', sebep:'The gross amount entered does not match the item total + tax.', cozum:'Check the item amounts and tax code; if there is an additional cost (freight), enter it on the relevant tab.' },
          { mesaj:'Account determination for entry ... WRX ... not possible', sebep:"{{OBYC}}'s {{gr-ir}} account is not defined (for the {{degerleme-sinifi}} combination).", cozum:'{{OBYC}} → transaction key WRX → define the account for the relevant valuation class.' },
          { mesaj:'Price/quantity variance — invoice blocked for payment', sebep:'The variance is outside the tolerance limit.', cozum:'Investigate the variance. If justified, release it with {{MRBR}}; if not, request a credit memo from the vendor.' },
          { mesaj:'No (suitable) item found for purchase order', sebep:'No goods receipt was posted, or the item is already fully invoiced.', cozum:'{{ME23N}} → check the goods-receipt and invoice status on the *purchase order history* tab.' },
          { mesaj:'Document ... is not an invoice for this vendor', sebep:"The order's vendor and the invoice's vendor are different.", cozum:'Choose the correct order; if there is a different invoicing address, check the alternative payee on the order.' },
        ],
        ipucu:'{{ME23N}} → the *Purchase Order History* tab shows the {{EKBE}} table visually: how many goods ' +
              'receipts, how many invoices, how much is left. 80% of MIRO problems become clear once you look at this tab.',
        ilgili:['MIGO','ME23N','MRBR','MR11','FB60'] },

      { kod:'FBL1N', ad:'Vendor line item list',
        amac:"Lists the open, cleared, and all items of a vendor or vendor group. AP's most-used report.",
        neZaman:'For reconciliation, aging, "has this invoice been paid?" questions, and pre-payment checks.',
        adimlar:[
          { baslik:'Enter the vendor and company code', aciklama:'A vendor range or account group can also be given.' },
          { baslik:'Choose the item type: open / cleared / all',
            aciklama:'When **open items** is chosen, a *key date* is entered: "which items were open as of this date?"' },
          { baslik:'Set the layout',
            aciklama:'Add the due date (`ZFBDT`), assignment, payment block, and text columns. Sort by due date.' },
          { baslik:'Double-click a line → drill into the document ({{FB03}})' },
        ],
        ekranAkisi:[
          { ekran:'Selection screen', islem:'Vendor V-4001 · Company code 1000 · **Open items** · Key date today' },
          { ekran:'Item list', islem:'Invoices in due-date order; total debit at the bottom' },
          { ekran:'Layout', islem:'Due date, payment block, discount date columns added' },
          { ekran:'Document', islem:'Double-click → {{FB03}}' },
        ],
        hatalar:[
          { mesaj:'No items selected', sebep:'The vendor had no movement in that period, or the criteria are too narrow.', cozum:'Choose "all items," widen the date range, check the company code.' },
        ],
        ipucu:'Add the payment block column to your layout and make it the default. The answer to "why was not ' +
              'this invoice paid?" is usually right there, visible at a glance.',
        ilgili:['FK10N','S_ALR_87012078','FB03','F-44','F110'] },

      { kod:'F-53', ad:'Vendor payment (manual)',
        amac:'Records a single outgoing payment and clears the selected open items.',
        neZaman:"For urgent or exceptional payments outside {{F110}}'s scope.",
        adimlar:[
          { baslik:'Header: enter the document date, company code, bank account, and payment amount' },
          { baslik:'Enter the vendor number and press *Process open items*' },
          { baslik:'Select the items to clear',
            aciklama:'The **"Not assigned"** field at the bottom of the screen must be zero. If it is not, clearing cannot happen.' },
          { baslik:'Use the partial/residual clearing tab if needed',
            aciklama:'The *Partial payment* tab leaves the original item open; the *Residual item* tab clears it and produces a new item.' },
          { baslik:'Save' },
        ],
        alanlar:{
          zorunlu:['Document date','Company code','Bank G/L account','Amount','Vendor'],
          opsiyonel:['Value date','Text','Assignment','Payment method'] },
        hatalar:[
          { mesaj:'The difference is too large for clearing', sebep:'The total of the selected items does not equal the payment amount, and the gap is outside the {{tolerans-grubu}}.', cozum:'Fix the selection, or use partial/residual clearing. For tolerance, see {{OBA3}}/{{OBA4}}.' },
          { mesaj:'No open items found', sebep:'The vendor has no open items, or the selection criteria are wrong.', cozum:'Check the open items with {{FBL1N}}; for special G/L items, check the relevant indicator box on the selection screen.' },
        ],
        ipucu:'If you want to clear down payment ({{ozel-ana-muhasebe-gostergesi}}) items, you have to check the ' +
              '**"Special G/L transactions"** box on the selection screen; otherwise those items never appear in the list at all.',
        ilgili:['F-58','F110','F-44','FB05'] },

      { kod:'F-44', ad:'Vendor clearing',
        amac:'Matches offsetting vendor items against each other without recording a payment.',
        neZaman:"When netting an invoice against a credit memo; when a payment made outside {{F110}} does not match the invoice.",
        adimlar:[
          { baslik:'Enter the vendor, company code, and clearing date' },
          { baslik:'Process open items → select the ones to clear' },
          { baslik:'Confirm the net amount is zero and save',
            aciklama:'Clearing produces a document but **does not move any G/L account** (if there is no difference). It only matches the items.' },
        ],
        ipucu:'If you clear the wrong items, you can reverse it with {{FBRA}} — no need to enter a new correction posting.',
        ilgili:['F-32','F-03','FBRA','F.13'] },

      { kod:'MRBR', ad:'Release blocked invoices',
        amac:'Removes the block on {{MIRO}} invoices blocked for payment due to a price, quantity, or date variance.',
        neZaman:'Once a variance is investigated and found justified; routinely before every payment run.',
        adimlar:[
          { baslik:'Enter the company code and selection criteria' },
          { baslik:'Examine the reason for the block',
            aciklama:'Price variance, quantity variance, or delivery date variance? Each requires a different investigation.' },
          { baslik:'Select the justified ones and release them' },
        ],
        ipucu:'Until the block is lifted, {{F110}} **never sees** that invoice. This is the most common cause of ' +
              'the complaint "I entered the invoice but it did not show up in the payment run" — the second most ' +
              'common cause is the {{odeme-blogu}} on the vendor master.',
        hatalar:[
          { mesaj:'Blocking reason cannot be deleted manually', sebep:'The block is a stochastic (random-check) block.', cozum:'This block is deliberate; it is removed with authorized approval.' },
        ],
        ilgili:['MIRO','FBL1N','F110'] },

      { kod:'F-47', ad:'Vendor down payment request',
        amac:'Creates a statistical request for a down payment. {{F110}} sees this request and pays it.',
        neZaman:'When an order deposit is required, when the down payment needs to be included in a payment run.',
        adimlar:[
          { baslik:'Enter the vendor, amount, and special G/L indicator (usually F)' },
          { baslik:'Set the due date and link the order if there is one' },
          { baslik:'Save — a statistical item is created',
            aciklama:'This item **does not move any G/L account**; it only carries the information "a down payment is to be paid to this vendor."' },
        ],
        ipucu:'Request (F) and payment (A) are different indicators. The request is statistical, the payment ' +
              'produces a real posting. Not knowing this distinction is the most common mistake in {{OBYR}} configuration.',
        ilgili:['F-48','F-54','F110','OBYR'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      "AP's table architecture is three layers: **master data** (who the vendor is), **document** (what " +
      'happened), and **index** (which item is open). In S/4HANA the index layer turned into ' +
      '{{uyumluluk-view}}s, but the logic stayed the same.',

    liste:[
      { ad:'LFA1', baslik:'Vendor — general layer',
        tutar:'Name, address, country, tax numbers, account group. Common across all company codes.',
        olusturan:'{{BP}} (S/4HANA) or {{XK01}} (ECC)',
        guncelleyen:'{{BP}}, {{XK01}}, {{XK02}}',
        anahtar:'LIFNR',
        iliskiler:'1-to-n with {{LFB1}} (company code) and {{LFM1}} (purchasing); {{BSEG}}.LIFNR points here.',
        s4:'The table remains, but is populated via CVI synchronization from {{BP}}.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Vendor number' },
          { ad:'STCD1 / STCD2', aciklama:'Tax number — the key for the duplicate check' },
          { ad:'SPERR', aciklama:'Central posting block — affects every company code' },
        ] },

      { ad:'LFB1', baslik:'Vendor — company code layer',
        tutar:'Accounting behavior: reconciliation account, payment term, allowed payment methods, payment block.',
        olusturan:'{{BP}} → FI Vendor role',
        guncelleyen:'{{BP}}, {{FK02}}',
        anahtar:'LIFNR + BUKRS',
        iliskiler:'A child of {{LFA1}}; the `AKONT` field points to the reconciliation account in {{SKB1}}.',
        s4:'Unchanged; populated via {{BP}}.',
        alanlar:[
          { ad:'AKONT', aciklama:"**{{mutabakat-hesabi}}** — the vendor's address in general ledger" },
          { ad:'ZTERM', aciklama:'{{odeme-kosulu}} — the due date and discount are calculated from here' },
          { ad:'ZWELS', aciklama:"The list of allowed {{odeme-yontemi}} — {{F110}} can't go outside it" },
          { ad:'ZAHLS', aciklama:'{{odeme-blogu}} — if filled, {{F110}} will not pick up the vendor for the proposal' },
          { ad:'ZUAWA', aciklama:'Sort key — fills the `ZUONR` field' },
        ] },

      { ad:'BSIK', baslik:'Vendor open items',
        tutar:'Unpaid vendor invoices. Feeds {{FBL1N}}\'s "open item" option and {{F110}}\'s selection pool.',
        olusturan:'Every posting to a vendor ({{FB60}}, {{MIRO}}, {{F-43}})',
        guncelleyen:'Posting transactions; once paid, the item is removed from here and moved to {{BSAK}}',
        anahtar:'BUKRS + LIFNR + UMSKS + UMSKZ + AUGDT + AUGBL + ZFBDT + BELNR + BUZEI',
        iliskiler:'Linked to the vendor via {{LFB1}}, to the document line via {{BSEG}}.',
        s4:'**The physical table is removed**; a {{uyumluluk-view}} of the same name produces the data from {{ACDOCA}} + {{BSEG}}. Writing is not possible.',
        alanlar:[
          { ad:'ZFBDT', aciklama:'Base date — the due date is calculated from this' },
          { ad:'ZBD1T', aciklama:'Discount days — {{F110}} finds the most advantageous payment day from here' },
          { ad:'ZLSPR', aciklama:'Payment block — at the item level' },
          { ad:'UMSKZ', aciklama:'{{ozel-ana-muhasebe-gostergesi}} — separates down-payment items from normal ones' },
        ] },

      { ad:'BSAK', baslik:'Vendor cleared items',
        tutar:'Paid vendor items. Once an item is cleared, it moves here from {{BSIK}}.',
        olusturan:'A {{kapatma}} transaction ({{F110}}, {{F-53}}, {{F-44}})',
        guncelleyen:'Clearing transactions; if reversed with {{FBRA}} the item returns to {{BSIK}}',
        anahtar:'BUKRS + LIFNR + AUGDT + AUGBL + GJAHR + BELNR + BUZEI',
        iliskiler:'The `AUGBL` field points to the clearing document.',
        s4:'Turned into a {{uyumluluk-view}}.' },

      { ad:'RBKP', baslik:'Logistics invoice header',
        tutar:'The MM-side header of the invoice entered with {{MIRO}}. A record **separate** from the FI document.',
        olusturan:'{{MIRO}}',
        guncelleyen:'{{MIRO}}, {{MRBR}} (block release)',
        anahtar:'BELNR + GJAHR',
        iliskiler:'Linked to its items via {{RSEG}}, to the FI document via {{BKPF}} (through `AWKEY`).',
        s4:'Unchanged.',
        alanlar:[
          { ad:'ZLSPR', aciklama:'Payment block — filled automatically if there is a variance' },
          { ad:'RMWWR', aciklama:'Invoice gross amount' },
        ] },

      { ad:'EKBE', baslik:'Purchase order history',
        tutar:'Every goods receipt and invoice movement for the order item. The sole source for "how much arrived, how much was invoiced?"',
        olusturan:'{{MIGO}} and {{MIRO}}',
        guncelleyen:'Every goods receipt and invoice entry',
        anahtar:'EBELN + EBELP + ZEKKN + VGABE + GJAHR + BELNR + BUZEI',
        iliskiler:'Linked to the order item via {{EKPO}}, to the documents via {{MSEG}} and {{RSEG}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'VGABE', aciklama:'**1** = goods receipt, **2** = invoice receipt' },
          { ad:'MENGE / WRBTR', aciklama:'Quantity and amount' },
        ] },

      { ad:'REGUH', baslik:'Payment run — payment headers',
        tutar:'The header of every payment {{F110}} produces: payee, amount, bank, payment method, payment document.',
        olusturan:'{{F110}} proposal and payment run',
        guncelleyen:'{{F110}}',
        anahtar:'LAUFD + LAUFI + XVORL + ZBUKR + LIFNR + KUNNR + VBLNR',
        iliskiler:'Linked to which items were paid via {{REGUP}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'XVORL', aciklama:"**If X, it is only a proposal**, not a real payment" },
          { ad:'VBLNR', aciklama:'Payment document number' },
        ] },

      { ad:'REGUP', baslik:'Payment run — paid items',
        tutar:'Which invoice items each payment cleared. The answer to "which invoices did this payment clear?"',
        olusturan:'{{F110}}',
        guncelleyen:'{{F110}}',
        anahtar:'LAUFD + LAUFI + XVORL + ZBUKR + LIFNR + KUNNR + VBLNR + BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'A child of {{REGUH}}; linked to the cleared items via {{BSAK}}.',
        s4:'Unchanged.' },
    ],

    er:{
      type:'er',
      baslik:'AP table relationships — from vendor to payment',
      varliklar:[
        { ad:'LFA1', rol:'Master data', aciklama:'Vendor identity',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'NAME1' }, { ad:'STCD1' }] },
        { ad:'LFB1', rol:'Master data', aciklama:'Vendor accounting data',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT' }, { ad:'ZTERM' }, { ad:'ZWELS' }] },
        { ad:'BKPF', rol:'Header', aciklama:'FI document header',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'AWKEY' }] },
        { ad:'BSEG', rol:'Line item', hub:true, aciklama:'FI document line items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'LIFNR', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'BSIK', rol:'Index', aciklama:'Open items',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'ZFBDT' }, { ad:'ZLSPR' }] },
        { ad:'BSAK', rol:'Index', aciklama:'Cleared items',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'AUGBL' }, { ad:'AUGDT' }] },
        { ad:'REGUH', rol:'Payment', aciklama:'Payment header',
          alanlar:[{ ad:'LAUFI', tip:'pk' }, { ad:'LIFNR', tip:'fk' }, { ad:'VBLNR' }] },
        { ad:'REGUP', rol:'Payment', aciklama:'Paid items',
          alanlar:[{ ad:'LAUFI', tip:'fk' }, { ad:'BELNR', tip:'fk' }] },
        { ad:'EKBE', rol:'MM bridge', aciklama:'Order history',
          alanlar:[{ ad:'EBELN', tip:'fk' }, { ad:'VGABE' }, { ad:'BELNR', tip:'fk' }] },
      ],
      iliskiler:[
        { from:'LFA1', to:'LFB1', alanlar:'LIFNR', not:'general → company code' },
        { from:'LFB1', to:'BSEG', alanlar:'LIFNR + BUKRS', not:"the vendor's items" },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'header → line item' },
        { from:'BSEG', to:'BSIK', alanlar:'BELNR + BUZEI', not:'open item index' },
        { from:'BSIK', to:'BSAK', alanlar:'after payment', not:'moved once cleared' },
        { from:'REGUH', to:'REGUP', alanlar:'LAUFD + LAUFI', not:'payment → paid items' },
        { from:'REGUP', to:'BSAK', alanlar:'BELNR + BUZEI', not:'which item was paid' },
        { from:'EKBE', to:'BKPF', alanlar:'BELNR → AWKEY', not:'MM movement → FI document' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Below is the screen flow for three tasks done daily in AP: **entering an invoice**, **resolving a ' +
      'blocked invoice**, and **making a payment**. Once you grasp the field logic once, the other AP screens ' +
      'feel familiar too.',

    ekranlar:[
      { ad:'{{FB60}} — Basic data tab',
        aciklama:"The invoice's header information. The moment the vendor is entered, values from master data fill the screen.",
        alanlar:[
          { ad:'Vendor', zorunlu:true, aciklama:'Once entered, address, bank, and payment term appear in the right panel. Picking the wrong vendor is the most expensive mistake.' },
          { ad:'Invoice date (`BLDAT`)', zorunlu:true, aciklama:"The date on the vendor's invoice. Usually the **base date** for the due-date calculation." },
          { ad:'Posting date (`BUDAT`)', zorunlu:true, aciklama:'Decides the accounting period. Checked carefully for invoices arriving at month-end.' },
          { ad:'Reference (`XBLNR`)', zorunlu:false, aciklama:"The vendor's invoice number. **The duplicate invoice check looks at this** — do not leave it blank." },
          { ad:'Amount', zorunlu:true, aciklama:'The gross amount (VAT included). If "Calculate tax" is checked, SAP splits out the VAT.' },
          { ad:'Tax code', zorunlu:false, aciklama:"Requested if the account's tax category requires it." },
        ],
        ipucu:'The moment you enter the vendor, read the information that appears on the right: is the payment ' +
              'term and block correct? Wrong master data is hard to fix once noticed after the invoice is entered.' },

      { ad:'{{FB60}} — Payment tab',
        aciklama:'The tab where the due date and payment behavior are set. Values come from master data but can be overridden for this specific invoice.',
        alanlar:[
          { ad:'Base date (`ZFBDT`)', zorunlu:false, aciklama:'The starting point of the due-date calculation. Comes from master data; can be the invoice date or the posting date.' },
          { ad:'Payment term (`ZTERM`)', zorunlu:false, aciklama:'The due date and discount condition. If changed, the due date is recalculated.' },
          { ad:'Payment block (`ZLSPR`)', zorunlu:false, aciklama:'A block specific to this invoice. Set here if there is a dispute; different from the block on the vendor master.' },
          { ad:'Payment method', zorunlu:false, aciklama:"If left blank, {{F110}} chooses from the vendor master's `ZWELS` list." },
        ],
        ipucu:"Do not cancel a disputed invoice — set a payment block instead. The invoice stays in the record, " +
              'appears in aging, but is not paid. Once resolved, the block is removed.' },

      { ad:'{{MIRO}} — Reference object and item matching',
        aciklama:"MIRO's core. Once the order number is entered, the system pulls up items waiting to be invoiced.",
        alanlar:[
          { ad:'Purchase order', zorunlu:true, aciklama:'Once entered, items that have been goods-receipted but not invoiced come in automatically, and quantity/amount are proposed.' },
          { ad:'Quantity', zorunlu:true, aciklama:'The quantity on the invoice. If it differs from the goods receipt, a **quantity variance** arises.' },
          { ad:'Amount', zorunlu:true, aciklama:'The amount on the invoice. If it differs from the order price, a **price variance** arises.' },
          { ad:'Gross amount (header)', zorunlu:true, aciklama:'Must match the item total + tax; otherwise you get a "Balance not zero" error.' },
        ],
        ipucu:'When a variance occurs, first check {{ME23N}} → the *Purchase Order History* tab. Usually either ' +
              'the goods receipt is missing, there is a partial delivery, or the order price was never updated.' },

      { ad:'{{F-53}} — Open item selection screen',
        aciklama:"The screen where the items to pay are selected. The most critical indicator is the \"Not assigned\" field at the bottom.",
        alanlar:[
          { ad:'Bank G/L account', zorunlu:true, aciklama:'The account the money leaves from. Usually a {{banka-ara-hesabi}}.' },
          { ad:'Amount', zorunlu:true, aciklama:'The total amount paid.' },
          { ad:'Item selection', zorunlu:true, aciklama:'The total of the selected items must equal the payment amount; the **"Not assigned" field must be zero**.' },
          { ad:'Special G/L transactions box', zorunlu:false, aciklama:'Checked to include down-payment items in the list. Otherwise those items never appear at all.' },
        ] },
    ],

    zorunlu:['Vendor','Invoice date','Posting date','Company code','Amount','G/L account (FB60) or purchase order (MIRO)'],
    opsiyonel:['Reference','Header text','Cost center','Payment term','Payment block','Due date','Assignment','Payment method'],

    hatalar:[
      { mesaj:'Posting period ... is not open for account type K', sebep:'The period is closed for the vendor account type. Only S (general ledger) may have been opened.', cozum:'Open the period on the **K** line too in {{OB52}}. Account types are managed separately.' },
      { mesaj:'Vendor ... is blocked for posting', sebep:'{{LFA1}} `SPERR` (central) or an {{LFB1}} posting block.', cozum:'{{BP}} → remove the block in the relevant role; if deliberate, investigate the reason first.' },
      { mesaj:'Account determination for entry ... WRX ... not possible', sebep:"{{OBYC}}'s {{gr-ir}} account is undefined for the relevant {{degerleme-sinifi}}.", cozum:"{{OBYC}} → WRX → complete the valuation class line. Find the material's valuation class from {{ME23N}}." },
      { mesaj:'Invoice blocked for payment (price variance)', sebep:'The invoice price differs from the order price by more than tolerance.', cozum:'Investigate the variance → release with {{MRBR}} if justified, request a credit memo from the vendor if not.' },
      { mesaj:'Duplicate invoice check: document ... already exists', sebep:'Same vendor + same reference + same amount.', cozum:'It is a warning. Do not enter it if it is genuinely a duplicate; fix the reference if it is a different invoice.' },
      { mesaj:'The difference is too large for clearing', sebep:'The selected items do not match the payment amount, and the gap is outside tolerance.', cozum:'Fix the selection; use partial/residual clearing for a permanent difference. Tolerance setting: {{OBA3}}/{{OBA4}}.' },
      { mesaj:'No open items were found (F-53)', sebep:'Down-payment items do not come up in a normal selection.', cozum:'Check the **"Special G/L transactions"** box on the selection screen.' },
      { mesaj:'Withholding tax code missing', sebep:'The vendor is subject to withholding tax but the withholding tax code was not entered on the invoice.', cozum:'{{BP}} → company code data → check the withholding tax tab.' },
    ],

    ipuclari:[
      'Always run these three checks before a payment run: **(1)** blocked invoices with {{MRBR}}, **(2)** the ' +
      'payment block column with {{FBL1N}}, **(3)** overdue items that got overlooked. These three checks ' +
      'resolve most "why was not it paid?" questions before payment.',
      'Add **due date, payment block, and discount date** columns to your {{FBL1N}} layout and make it the ' +
      'default. These are the three pieces of information looked at most often in AP.',
      'For the duplicate invoice check to work, the reference field (`XBLNR`) must be filled disciplined. ' +
      'Which fields the check looks at is set in {{OBY6}} → company code global parameters.',
      'Review the {{gr-ir}} account by open item with {{FBL3N}} every month. Clean up small differences that ' +
      'will never match with {{MR11}} — do not let them accumulate for years.',
      "The fastest way to find why an invoice was not paid: {{FBL1N}} → find the item → is the payment block " +
      'filled? If not, is there a vendor block in {{BP}}? If not, the due date may not have arrived yet.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'FI document header; if coming from MIRO, `AWTYP` = RMRP, `AWKEY` = invoice document' },
      { tablo:'BSEG', ne:'Line items; `LIFNR` filled on the vendor line, `AUGBL` blank (open item)' },
      { tablo:'ACDOCA', ne:'Universal items; a separate set of lines for each ledger' },
      { tablo:'BSIK', ne:'Vendor open item (via a view in S/4HANA)' },
      { tablo:'BSET', ne:'Tax lines: base amount, tax amount, transaction key' },
      { tablo:'RBKP', ne:"MIRO invoice's MM header (MIRO only)" },
      { tablo:'RSEG', ne:"MIRO invoice's items (MIRO only)" },
      { tablo:'EKBE', ne:'An invoice movement is added to the order history (`VGABE` = 2)' },
    ],

    commit:
      'The invoice posting is written within a single LUW. {{MIRO}} has an extra layer: first the MM invoice ' +
      'document ({{RBKP}}/{{RSEG}}) is produced, then the FI document, and the two are linked by `AWKEY`. These ' +
      'two steps are in the same LUW — if one fails, neither is written.\n\n' +
      '{{F110}} works differently: the **proposal** and the **payment** are separate runs with an approval in ' +
      'between. The proposal is written to {{REGUH}}/{{REGUP}} with `XVORL = X`; on the payment run these ' +
      'records turn into a real payment.',

    belgeNo:
      'Assigned **at save time** from the number range tied to the document type. Typical types in AP: **KR** ' +
      'vendor invoice, **KG** vendor credit memo, **KZ** vendor payment, **RE** logistics invoice. {{MIRO}} ' +
      'produces two numbers: the MM invoice number ({{RBKP}}) and the FI document number ({{BKPF}}) — these ' +
      'are **different** and should not be confused.',

    postingLogic:
      '{{FB60}} chain: vendor → {{mutabakat-hesabi}} and {{odeme-kosulu}} from {{LFB1}} → expense lines ' +
      '(entered by the user) → tax line (automatic) → balance check → number → write.\n\n' +
      '{{MIRO}} chain: order → uninvoiced goods-receipt items from {{EKBE}} → quantity/price comparison → ' +
      "tolerance check → account determination from {{OBYC}} → if there is a variance, the price-variance " +
      'account (PRD) and a **payment block** → FI document.',

    belgeTuru:
      'AP document types decide which account types are allowed. Type **KR** allows the vendor (K) and general ' +
      "ledger (S) account types but does not allow a posting to a customer (D) account. This structurally " +
      'prevents a posting to the wrong account type.',

    numberRange:
      'Defined per company code + fiscal year with {{FBN1}}. The MM invoice number comes from a separate range ' +
      '(defined on the MM side). **Both** must be opened at year-start — opening only the FI range and ' +
      'forgetting MM is the classic mistake that stalls MIRO in January.',

    accountDetermination:
      'In {{FB60}} the user enters the expense account by hand; only the tax and vendor lines are automatic.\n\n' +
      'In {{MIRO}} every account is automatic, and {{OBYC}} determines it. Important transaction keys:\n' +
      '**BSX** stock account · **WRX** {{gr-ir}} account · **PRD** price variance · **FR1** freight provision · ' +
      '**KDM** exchange difference. Each is mapped to an account in {{T030}} together with the {{degerleme-sinifi}}.',

    tur:
      '**Master data:** vendor records ({{LFA1}}/{{LFB1}}).\n\n' +
      '**Configuration:** vendor account groups, {{odeme-kosulu}} definitions, {{FBZP}} payment configuration, ' +
      'tolerance groups ({{OBA3}}/{{OBA4}}), {{OBYC}} account determination, {{OBYR}} special G/L indicators, ' +
      'document types, and number range definitions.\n\n' +
      '**Transaction data:** invoices, payments, payment runs.',

    transport:
      "Payment terms, tolerance groups, {{FBZP}} settings, and account determination transport. Vendor records " +
      "and documents do not. **Note:** {{FBZP}}'s bank determination settings reference bank accounts specific " +
      'to the system; they must be checked in production after transport.',

    img:[
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Vendor Accounts → Master Data → Preparations for Creating Vendor Master Data → Define Account Groups with Screen Layout (Vendors)', not:'Account group and field status' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Outgoing Invoices/Credit Memos → Maintain Terms of Payment', not:'{{odeme-kosulu}} — due date and discount' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Outgoing Payments → Automatic Outgoing Payments → Payment Method/Bank Selection for Payment Program → Set Up Payment Program', not:"{{FBZP}} — all of {{F110}}'s settings" },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Outgoing Payments → Manual Outgoing Payments → Define Tolerances (Vendors)', not:'{{OBA3}} — clearing tolerance limits' },
      { yol:'SPRO → Materials Management → Valuation and Account Assignment → Account Determination → Account Determination Without Wizard → Configure Automatic Postings', not:'{{OBYC}} — BSX, WRX, PRD transaction keys' },
      { yol:'SPRO → Materials Management → Logistics Invoice Verification → Invoice Block → Set Tolerance Limits for Price/Quantity Variance', not:'{{MIRO}} block tolerances' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Business Transactions → Down Payment Made → Define Alternative Reconciliation Account for Down Payments', not:'{{OBYR}} — down payment indicators' },
    ],

    ekstra:[
      { ic:'🔐', baslik:'Internal control in AP — where does it matter?', metin:
        "Almost all of the company's cash outflow goes through AP; that's why it's the area needing the most control.\n\n" +
        '**Segregation of duties:** the person who opens a vendor master and the person who makes payments ' +
        '**must not be the same**. Otherwise, opening a fake vendor and paying yourself becomes possible.\n\n' +
        '**Bank account changes:** changes to the `LFBK` table should be tracked via {{CDPOS}}. The most ' +
        'common fraud method is a fake email saying "our bank account has changed."\n\n' +
        "**Duplicate invoices:** reference field discipline + SAP's duplicate check.\n\n" +
        '**Payment proposal approval:** the {{F110}} proposal must always be reviewed by a second person.' },

      { ic:'📊', baslik:'Why is aging based on the due date?', metin:
        'Aging measures how many days have passed **since the due date** of the item, not since the invoice ' +
        'date. The due date is calculated from `ZFBDT` (base date) in the {{BSIK}} table + the number of days ' +
        'from the {{odeme-kosulu}}.\n\n' +
        "That's why using {{kalan-kapatma}} **distorts** aging: the newly generated item's due date starts " +
        'from today, and a debt that is 90 days overdue suddenly looks "not yet due." {{kismi-kapatma}} ' +
        'preserves the original due date. That is why the choice between them matters.' },
    ],

    notlar:[
      { tip:'warn', baslik:'MIRO has two document numbers', metin:
        'When {{MIRO}} is saved, the number that appears on screen is the **MM invoice number** ({{RBKP}}). ' +
        'The FI document number is different and lives in {{BKPF}}. Searching for the MM number in {{FB03}} ' +
        'returns nothing; you have to open the MM invoice with {{MIR4}} and go from there to the FI document. ' +
        'A classic trap for beginners.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      "AP's business logic has not changed in S/4HANA — invoices, payments, and clearing work the same way. " +
      'What changed: **vendor master data moving to {{BP}}**, **index tables turning into views**, and ' +
      '**new Fiori-based worklists**.',

    eccFarklari:[
      { konu:'Vendor master data', ecc:'{{FK01}} / {{XK01}}', s4:'{{BP}} mandatory — via the FI Vendor role' },
      { konu:'Open item table', ecc:'{{BSIK}} / {{BSAK}} physical table', s4:'{{uyumluluk-view}} — data produced from {{ACDOCA}}' },
      { konu:'Terminology', ecc:'Vendor', s4:'**Supplier** (in Fiori and new documentation)' },
      { konu:'Line item report', ecc:'{{FBL1N}}', s4:'{{FBL1N}} still works; the Fiori "Display Supplier Line Items" is recommended' },
      { konu:'Invoice entry', ecc:'{{FB60}} / {{MIRO}}', s4:'Same + the Fiori "Create Supplier Invoice" (with machine-learning-assisted account suggestion)' },
      { konu:'Payment', ecc:'{{F110}}', s4:'{{F110}} + Fiori "Manage Automatic Payments" for visual proposal management' },
      { konu:'Credit/risk', ecc:'FD32-based', s4:'SAP Credit Management ({{UKM_BP}}) — on the AR side' },
    ],

    universalJournal:
      "AP items are now also held in {{ACDOCA}}, and the vendor number, cost center, and profit center are " +
      '**on the same line**. The practical result: "how much did we pay to which vendor, and which cost ' +
      'center did it hit?" is answered from a single table — previously you had to join {{BSEG}} + {{BSIK}} + ' +
      'the CO tables.\n\n' +
      "Also, {{BSEG}}'s 999-item limit does not exist in {{ACDOCA}}; high-line-count bulk invoices are " +
      'recorded without issue.',

    kalkanTcodes:[
      { eski:'{{FK01}} / {{FK02}} / {{FK03}}', yeni:'{{BP}}', not:'Vendor master data — removed' },
      { eski:'{{XK01}} / {{XK02}}', yeni:'{{BP}}', not:'Redirects to the BP transaction' },
      { eski:'MK01 / MK02', yeni:'{{BP}}', not:'The purchasing side too goes through BP' },
      { eski:'F-43', yeni:'{{FB60}}', not:'The classic screen still works but FB60 is recommended' },
    ],

    fiori:[
      { ad:'Create Supplier Invoice', aciklama:'Replaces {{FB60}}/{{MIRO}}; order reference and account suggestion on a single screen.' },
      { ad:'Manage Supplier Line Items', aciklama:'Replaces {{FBL1N}}; supports filtering, grouping, and bulk block removal.' },
      { ad:'Manage Automatic Payments', aciklama:'Manages the {{F110}} proposal visually; including/excluding items becomes easier.' },
      { ad:'Supplier Invoices List', aciklama:'A worklist of blocked and approval-pending invoices.' },
      { ad:'Days Payable Outstanding', aciklama:'Analyzes the average payment period — a cash management indicator.' },
      { ad:'Maintain Business Partner', aciklama:'{{BP}} — the single gateway to vendor master data.' },
    ],

    compatibilityViews:[
      '{{BSIK}}, {{BSAK}} — the vendor open/cleared item indexes are no longer physical tables; they are views produced from {{ACDOCA}}.',
      "{{LFC1}} — the vendor's periodic balances also turned into a view.",
      "**These views cannot be INSERT/UPDATE'd.** Old Z-programs that write directly to {{BSIK}} break during migration; they must be scanned.",
      '{{LFA1}} and {{LFB1}} **remain** physical tables — but are populated by {{BP}}; writing directly breaks CVI synchronization.',
    ],

    performans:
      "Because open item queries run through {{ACDOCA}}, there is a noticeable speedup for large vendor " +
      'portfolios. {{F110}} proposal generation is also faster — the {{BSIK}} scan used to be the bottleneck. ' +
      'On the other hand, old custom reports running through {{uyumluluk-view}} are slower than new reports ' +
      'that query {{ACDOCA}} directly; that is the first place to look if a performance complaint comes in.',

    bestPractices:[
      'Build new reports on {{ACDOCA}} or a CDS view instead of {{BSIK}}.',
      'Clean up duplicate vendors before the S/4HANA migration; merging them after moving to {{BP}} is much harder.',
      'Simplify payment terms. 80 different payment terms accumulated over the years should be reviewed at migration.',
      "Move invoice entry to {{MIRO}} as much as possible: {{uc-yonlu-eslestirme}} provides automatic control, {{FB60}} does not.",
      'Clean up the {{gr-ir}} account before migration. Dirty open items migrate into the new system, where they become harder to resolve.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'A purchase from start to finish: 100,000 TRY of raw material, from order to payment',
    hikaye:
      '**Marmara Textiles Inc.** (company code 1000) buys 100 drums of paint from Ege Kimya. The order is ' +
      'opened, the goods arrive, the invoice arrives — but the invoice shows a **price variance**. This ' +
      'scenario walks through, step by step, the most common AP flow in real life, including variance handling.',
    veriler:[
      { k:'Company code', v:'1000 — Marmara Textiles Inc.' },
      { k:'Vendor', v:'V-4001 Ege Kimya A.Ş. · reconciliation account 320000' },
      { k:'Payment term', v:'ZB02 — 30 days net, 2% discount within 10 days' },
      { k:'Order', v:'100 drums × 1,000 TRY = 100,000 TRY' },
      { k:'Period', v:'September 2026' },
      { k:'Price variance tolerance', v:'3% or 500 TRY, whichever is smaller' },
    ],

    adimlar:[
      { baslik:'A purchase order is opened — no FI entry', tcode:'ME21N',
        aciklama:'Purchasing opens an order for 100 drums of paint. This is a **commitment**, not a debt; so ' +
                 'no accounting entry occurs.',
        girdi:[
          { alan:'Vendor', deger:'V-4001 Ege Kimya A.Ş.' },
          { alan:'Material / Quantity', deger:'BOYA-001 · 100 drums' },
          { alan:'Net price', deger:'1,000 TRY / drum' },
          { alan:'Delivery date', deger:'05.09.2026' },
        ],
        tabloEtkisi:[
          { tablo:'EKKO', ne:'Order header: 4500002345, vendor V-4001' },
          { tablo:'EKPO', ne:'Item 10: 100 drums × 1,000 TRY, valuation class 3000' },
        ],
        not:"**There is no FI document.** The answer to \"we placed the order, do we owe anything?\" is no. The debt arises once the goods are received." },

      { baslik:'Goods receipt is posted — the first FI entry is born', tcode:'MIGO',
        aciklama:'The warehouse receives the 100 drums and records it in the system. The accountant knows ' +
                 'nothing of this entry, but this is where the first FI document is created.',
        girdi:[
          { alan:'Movement type', deger:'101 — Goods receipt for order' },
          { alan:'Purchase order', deger:'4500002345, item 10' },
          { alan:'Quantity', deger:'100 drums (full delivery)' },
          { alan:'Document date', deger:'05.09.2026' },
        ],
        fis:{ baslik:'Document 5000001234 — Goods receipt', belgeTuru:'WE', tarih:'05.09.2026',
          satirlar:[
            { hesap:'153', ad:'Trade goods (stock)', borc:100000, not:'{{OBYC}} → **BSX**' },
            { hesap:'159', ad:'GR/IR account', alacak:100000, not:'{{OBYC}} → **WRX**' },
          ], not:"The value was calculated **at the order price** (100 × 1,000). Since the invoice has not arrived, the real price is not known yet." },
        tabloEtkisi:[
          { tablo:'MSEG', ne:'Material document item, movement type 101' },
          { tablo:'EKBE', ne:'A line added to the order history: `VGABE` = **1** (goods receipt), 100 drums' },
          { tablo:'BKPF', ne:"`AWTYP` = MKPF, `AWKEY` = material document → the FI document's source can be traced" },
          { tablo:'BSIS', ne:'A new **open item** on account 159 (credit 100,000)' },
        ] },

      { baslik:'The invoice arrives — a price variance appears', tcode:'MIRO',
        aciklama:"The vendor billed **1,050 TRY/drum** for 100 drums. The order was 1,000 TRY. The total " +
                 "variance is 5,000 TRY — since tolerance is 3% (3,000 TRY), it is **outside tolerance**.",
        girdi:[
          { alan:'Invoice date', deger:'12.09.2026' },
          { alan:'Reference (vendor invoice no.)', deger:'EGE-2026-4471' },
          { alan:'Gross amount', deger:'126,000 TRY (105,000 + 20% VAT)' },
          { alan:'Purchase order', deger:'4500002345 → items came in automatically' },
          { alan:'System proposal', deger:'100 drums × 1,000 = 100,000 TRY' },
          { alan:'Manually corrected to', deger:'100 drums × 1,050 = 105,000 TRY' },
        ],
        fis:{ baslik:'Document 5100000456 (MM) / 1900000234 (FI) — Vendor invoice', belgeTuru:'RE', tarih:'12.09.2026',
          satirlar:[
            { hesap:'159', ad:'GR/IR account', borc:100000, not:'Closes the credit from the goods receipt — **at the order price**' },
            { hesap:'711', ad:'Price variance', borc:5000, not:'{{OBYC}} → **PRD** · goes here if the material has a standard price' },
            { hesap:'191', ad:'Deductible VAT', borc:21000 },
            { hesap:'320', ad:'Trade payables — V-4001', alacak:126000, not:'The debt now sits with the vendor' },
          ], not:'Note: {{gr-ir}} closed at **100,000**, not 105,000. The remaining 5,000 TRY price variance ' +
                 'went to the price variance account. Had the material been moving-average priced, the ' +
                 'variance would have been added to stock (account 153).' },
        tabloEtkisi:[
          { tablo:'RBKP', ne:'MM invoice header 5100000456; `ZLSPR` = **R** (price variance block)' },
          { tablo:'RSEG', ne:'Invoice item: order 4500002345 item 10, 105,000 TRY' },
          { tablo:'EKBE', ne:'A line added to the order history: `VGABE` = **2** (invoice), 100 drums / 105,000 TRY' },
          { tablo:'BSIK', ne:'Vendor open item 126,000 TRY — **but blocked for payment**' },
          { tablo:'BSIS', ne:'The open item on account 159 closed' },
        ],
        not:"The invoice **was recorded** but blocked for payment. This is not a bug, it is by design: the " +
             'system leaves the variance to human approval.' },

      { baslik:'The variance is investigated and the block is released', tcode:'MRBR',
        aciklama:'The AP specialist asks purchasing: the price increase was agreed by contract in early ' +
                 'September, but the order was never updated. The variance is **justified** — the block is released.',
        girdi:[
          { alan:'Company code', deger:'1000' },
          { alan:'Block reason', deger:'Price variance (R) — 5,000 TRY' },
          { alan:'Decision', deger:'Contract confirmed → release' },
        ],
        tabloEtkisi:[
          { tablo:'RBKP', ne:'`ZLSPR` cleared' },
          { tablo:'BSIK', ne:'The item is now visible to {{F110}}' },
        ],
        not:'Until the block is lifted, {{F110}} **never sees** this invoice. This is the number-one cause of ' +
             'the complaint "I entered the invoice but it did not come up in the payment run."' },

      { baslik:'The discount opportunity is missed', tcode:'FBL1N',
        aciklama:'Payment term ZB02: a 2% discount if paid within 10 days. The invoice is dated 12.09; the ' +
                 'last day for the discount is **22.09**. The block investigation dragged on until 25.09.',
        girdi:[
          { alan:'Item', deger:'126,000 TRY · Due date 12.10.2026' },
          { alan:'Last day for the discount', deger:'22.09.2026 — **passed**' },
          { alan:'Discount missed', deger:'105,000 × 2% = **2,100 TRY**' },
        ],
        not:'The concrete cost of the delay in block management: 2,100 TRY. That is why blocked invoices ' +
             'should be followed up **daily**, not just before the payment run.' },

      { baslik:'Payment is run', tcode:'F110',
        aciklama:'When the 12.10.2026 due date arrives, the payment run selects and pays this invoice.',
        girdi:[
          { alan:'Run date / ID', deger:'12.10.2026 / AP01' },
          { alan:'Payment method', deger:'H — bank transfer' },
          { alan:'Selected item', deger:'1900000234 · 126,000 TRY' },
        ],
        fis:{ baslik:'Document 2000000789 — Payment', belgeTuru:'KZ', tarih:'12.10.2026',
          satirlar:[
            { hesap:'320', ad:'Trade payables — V-4001', borc:126000, not:'The open item is being cleared' },
            { hesap:'102', ad:'Banks (clearing account)', alacak:126000 },
          ], not:'Since the discount period had passed, no discount was applied; the full amount was paid.' },
        tabloEtkisi:[
          { tablo:'REGUH', ne:'Payment header: V-4001, 126,000 TRY, payment document 2000000789' },
          { tablo:'REGUP', ne:'The record that this payment cleared invoice 1900000234' },
          { tablo:'BSIK', ne:'The item was **removed** from here' },
          { tablo:'BSAK', ne:'Added as a cleared item, `AUGBL` = 2000000789' },
        ] },

      { baslik:'Month-end check — is GR/IR clean?', tcode:'FBL3N',
        aciklama:'At the September close, account 159 GR/IR is checked. For this order, the goods receipt ' +
                 'and invoice matched and the item is cleared.',
        girdi:[
          { alan:'Account', deger:'159000 · Open items · 30.09.2026' },
          { alan:'For this order', deger:'No item — matched and cleared ✓' },
          { alan:'Other orders', deger:'6 open items remain → to be reclassified with {{F.19}}' },
        ],
        not:'{{gr-ir}} items are cleared automatically with {{F.13}}; the matching criterion is the ' +
             'assignment (`ZUONR`) field derived from the order number.' },
    ],

    sonuc:
      '**Process summary:** order (no FI entry) → goods receipt (stock + GR/IR) → invoice (GR/IR closed, ' +
      'vendor credited, the variance went to PRD) → block resolution → payment (debt cleared).\n\n' +
      '**Three key lessons:**\n\n' +
      '**1.** {{gr-ir}} always closes at the **order price**. The invoice variance goes to a separate account ' +
      "— the price variance account (PRD) if the material has a standard price, stock if it is moving-average.\n\n" +
      "**2.** A price-variance block is not a malfunction, it is a **control mechanism**. But if block " +
      'management is slow, the discount is lost — 2,100 TRY in this scenario. Blocked invoices should be ' +
      'tracked daily.\n\n' +
      '**3.** When troubleshooting an AP issue, ask in order: **which path did the invoice come in through ' +
      '({{FB60}} or {{MIRO}})?** → **is there a block ({{MRBR}}, {{FBL1N}})?** → **is there a block on the ' +
      'vendor master ({{BP}})?** → **has the due date arrived?** These four questions resolve nearly every AP complaint.',
  },

  },
});
