/* ==========================================================================
   content/fi-en/new-gl.js — English body for "New G/L (Yeni Ana Muhasebe)"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'new-gl',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'New G/L (New General Ledger) is the architecture SAP introduced to close **three gaps** in the classic ' +
      'General Ledger: **parallel ledgers**, **document splitting**, and **real-time FI–CO integration**.\n\n' +
      'Classic General Ledger had a single ledger ({{GLT0}} totals) and limited reporting dimensions. Profit ' +
      'center accounting had its own separate ledger (EC-PCA), cost accounting had its own tables, and ' +
      'special-purpose ledgers had FI-SL. **Each one required its own separate reconciliation.**\n\n' +
      'New G/L merged these into a single extended structure ({{FAGLFLEXA}} / {{FAGLFLEXT}}). S/4HANA took this ' +
      'merge **one step further**: with {{ACDOCA}}, FI and CO lines are held in the same table ' +
      '({{evrensel-kayit-defteri}}).',

    neden:
      '**The requirement for a segment-based balance sheet.** IFRS 8 and similar standards require a ' +
      '**complete balance sheet** by segment. In the classic setup the income statement could be split, but ' +
      'the balance sheet couldn\'t — because the vendor/customer line carried no profit center.\n\n' +
      '**Parallel accounting.** The need to record the same transaction differently under local statutory ' +
      'rules and IFRS.\n\n' +
      '**Removing the reconciliation burden.** Differences between FI and CO used to be chased for hours at ' +
      'month-end.\n\n' +
      '**A single source of truth.** The same transaction shouldn\'t produce three different totals in three places.',

    sirketOnemi:
      'New G/L isn\'t a "feature," it\'s an **architectural decision**. Its effect is set on day one of the ' +
      'setup, and changing it later is extremely costly — {{belge-bolme}} in particular **cannot be turned on ' +
      'retroactively** (documents in closed periods stay unsplit).\n\n' +
      'For a consultant, New G/L is the point where FI moves from the "basic transactions" level to the ' +
      '"architectural design" level. Without understanding this topic, a parallel-ledger, segment-reporting, ' +
      'or S/4HANA migration project can\'t be run.\n\n' +
      'The discriminating question is: **"What does document splitting actually do?"** A surface-level answer ' +
      'says "it splits line items." The correct answer: **it assigns a profit center/segment to the ' +
      'vendor/customer and tax lines so that a complete balance sheet can be produced along those ' +
      'dimensions** — without it, a segment balance sheet can\'t be produced.',

    gercekHayat:
      'Picture a holding company operating in two business lines: **Manufacturing** and **Services**. ' +
      'Management wants a separate balance sheet for each line: "How much does the Services unit owe?"\n\n' +
      'Classic General Ledger has **no answer** to this. Why? Look at an invoice posting:\n\n' +
      'The expense line carries a profit center (it comes in via the cost center). But **the vendor line ' +
      'carries no profit center** — a vendor is a balance sheet account, it doesn\'t carry a profit center. ' +
      'The same goes for the VAT line.\n\n' +
      'The result: you can split the income statement by business line, but **you can\'t split the ' +
      'liabilities**. The balance sheet won\'t come out.\n\n' +
      '{{belge-bolme}} solves exactly this problem: it **splits** the vendor and VAT lines in proportion to ' +
      'the expense lines and assigns the relevant profit center to each piece. Now there\'s an answer to "how ' +
      'much does the Services unit owe vendors — 340,000 TRY."',

    muhasebeMantigi:
      'New G/L\'s accounting logic rests on a single principle: **every line must carry every dimension it ' +
      'needs to be reported on.**\n\n' +
      'In the classic setup this principle was only satisfied for income statement accounts. Balance sheet ' +
      'accounts (vendor, customer, bank, tax) carried no dimension.\n\n' +
      '{{belge-bolme}} fills this gap and preserves the following accounting rule: **a split document must be ' +
      'balanced separately within each dimension.** In other words, it\'s not just the document\'s total that ' +
      'must balance — the debit/credit total of every profit center must also be equal.\n\n' +
      'To make this hold, the system generates a **zero-balance clearing** line (`zero-balance clearing`) when ' +
      'needed. This is the system\'s counterpart to the accounting principle that "every subset must balance ' +
      'within itself."',

    kavramlar: ['belge-bolme', 'kar-merkezi', 'evrensel-kayit-defteri', 'lider-defter',
                'mutabakat-hesabi', 'yerel-para-birimi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'From the user\'s perspective, **nothing changes** in New G/L — an invoice is entered from the same ' +
      'screen in the same way. What changes is what happens behind the posting: the document is split, ' +
      'dimensions are derived, and it is distributed to the ledgers.',

    roller:[
      { rol:'User', gorev:'Enters the invoice normally. **Doesn\'t see the split, and doesn\'t need to.**' },
      { rol:'System', gorev:'Processes the document per the splitting rules, derives dimensions, adds a zero-balance clearing line.' },
      { rol:'FI consultant', gorev:'Designs the splitting characteristics and item categories — **the setup\'s most critical decision**.' },
      { rol:'Reporting', gorev:'Pulls a ledger/segment-based line item report with {{FAGLL03}}.' },
      { rol:'General ledger accounting', gorev:'Verifies that the segment balance sheet balances.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'An invoice\'s journey through New G/L',
      adimlar:[
        { ic:'🧾', rol:'User', baslik:'The invoice is entered ({{FB60}})',
          aciklama:'A cost center is entered on the expense line; the vendor and VAT lines are ' +
                   '**dimensionless**. For the user, the flow is identical to the classic setup.',
          cikti:'Raw document', ok:'splitting kicks in' },
        { ic:'✂️', rol:'System', baslik:'**Document splitting** runs',
          aciklama:'The vendor and VAT lines are split **in proportion to** the expense lines. Each piece is ' +
                   'assigned the relevant profit center/segment.',
          cikti:'Split items', ok:'balance is checked' },
        { ic:'⚖️', rol:'System', baslik:'Balance is enforced by dimension',
          aciklama:'Each profit center must have debit = credit within itself. If not, a **zero-balance ' +
                   'clearing line** is generated.',
          cikti:'Balanced, split document', ok:'written to the ledgers' },
        { ic:'📚', rol:'System', baslik:'It is distributed to the ledgers',
          aciklama:'If no ledger group is specified, the posting goes to **all ledgers** (leading + ' +
                   'additional).',
          cikti:'Ledger postings', ok:'tables are updated' },
        { ic:'💾', rol:'System', baslik:'Tables are updated',
          aciklama:'{{FAGLFLEXA}} + {{FAGLFLEXT}} in ECC; **{{ACDOCA}}** in S/4HANA. The split information is ' +
                   'written to {{FAGL_SPLINFO}}.',
          cikti:'Permanent record', ok:'reported on' },
        { ic:'📊', rol:'Reporting', baslik:'The segment balance sheet is pulled',
          aciklama:'Ledger- and segment-based reports via {{FAGLL03}} / {{FAGLB03}}; **the balance sheet ' +
                   'too** can now be split.',
          cikti:'Segment balance sheet' },
      ],
    },

    adimlar:[
      { rol:'User', eylem:'Enters the invoice', sistem:'{{FB60}} — the flow doesn\'t change' },
      { rol:'System', eylem:'Determines the item category', sistem:'Account ↔ item category mapping' },
      { rol:'System', eylem:'Splits the document', sistem:'Splitting rule + characteristics' },
      { rol:'System', eylem:'Adds a zero-balance clearing line', sistem:'Zero-balance clearing account' },
      { rol:'System', eylem:'Writes to the ledgers', sistem:'{{ACDOCA}} (S/4) or {{FAGLFLEXA}} (ECC)' },
      { rol:'System', eylem:'Stores the split information', sistem:'{{FAGL_SPLINFO}} — used at clearing' },
      { rol:'Reporting', eylem:'Pulls a segment report', sistem:'{{FAGLL03}}, {{FAGLB03}}' },
    ],

    veriAkisi:{
      nereden:'The document entered by the user; the cost center → profit center derivation; item category ' +
              '↔ account mapping; splitting rules.',
      nereye:'{{ACDOCA}} (S/4) or {{FAGLFLEXA}}/{{FAGLFLEXT}} (ECC); {{FAGL_SPLINFO}}; {{BKPF}}/{{BSEG}} ' +
             '(kept as the entry view).',
      tetikleyen:'Every FI document — without exception, if splitting is active.',
      sonraki:'Segment/profit-center-based reporting, clearing transactions, period-end close.',
    },

    notlar:[
      { tip:'tip', baslik:'Two views: entry and general ledger', metin:
        'Every document in New G/L has **two views**, and this distinction causes confusion:\n\n' +
        '**Entry view:** the state as the user entered it. If 3 lines were entered, 3 lines appear here. ' +
        '{{BSEG}} carries this view.\n\n' +
        '**General ledger view (G/L view):** the state after splitting. 3 lines may have become 6. ' +
        '{{ACDOCA}} / {{FAGLFLEXA}} carries this view.\n\n' +
        'When a document is opened in {{FB03}}, you can switch between the two views. This is the answer to ' +
        '"I entered 3 lines, why are there 6?" — and it isn\'t an error, it\'s **proof that splitting worked**.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'New G/L\'s accounting impact shows up in a single example: **the same invoice, unsplit and split**. ' +
      'The amounts are the same, the accounts are the same — what changes is the **dimensions the lines carry**.',

    etkilenenHesaplar:[
      { hesap:'All balance sheet accounts', tur:'Balance sheet', neden:'Thanks to splitting they now carry a profit center/segment — in the classic setup they didn\'t.' },
      { hesap:'320 Trade payables', tur:'Balance sheet — Liability', neden:'Split in proportion to the expense lines; each piece belongs to a profit center.' },
      { hesap:'191 Deductible VAT', tur:'Balance sheet — Asset', neden:'The tax line is split too — necessary to complete the segment balance sheet.' },
      { hesap:'Zero-balance clearing account', tur:'Balance sheet — Technical', neden:'The system uses this account whenever balance can\'t be achieved by dimension.' },
      { hesap:'120 Trade receivables', tur:'Balance sheet — Asset', neden:'The same logic on the sales side; split in proportion to the revenue lines.' },
    ],

    fisler:[
      { baslik:'**Unsplit** (classic General Ledger) — no segment balance sheet',
        belgeTuru:'KR', tarih:'10.06.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Expense — Manufacturing (PC: 1000)', borc:60000, not:'Profit center **present**' },
          { hesap:'770', ad:'Expense — Services (PC: 2000)', borc:40000, not:'Profit center **present**' },
          { hesap:'191', ad:'Deductible VAT', borc:20000, not:'Profit center **MISSING**' },
          { hesap:'320', ad:'Trade payables', alacak:120000, not:'Profit center **MISSING**' },
        ],
        not:'The expense lines carry a profit center, but **the vendor and VAT lines don\'t**.\n\n' +
             'The result: there\'s **no answer** to "how much does the Manufacturing unit owe vendors?" The ' +
             'income statement can be split, **the balance sheet can\'t**.' },

      { baslik:'**Split** (New G/L) — the same invoice, 6 lines',
        belgeTuru:'KR', tarih:'10.06.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Expense — Manufacturing (PC: 1000)', borc:60000 },
          { hesap:'770', ad:'Expense — Services (PC: 2000)', borc:40000 },
          { hesap:'191', ad:'Deductible VAT (PC: 1000)', borc:12000, not:'**60% → Manufacturing**' },
          { hesap:'191', ad:'Deductible VAT (PC: 2000)', borc:8000, not:'**40% → Services**' },
          { hesap:'320', ad:'Trade payables (PC: 1000)', alacak:72000, not:'**60% → Manufacturing**' },
          { hesap:'320', ad:'Trade payables (PC: 2000)', alacak:48000, not:'**40% → Services**' },
        ],
        not:'The user **still entered 4 lines**; the system produced 6.\n\n' +
             'The split ratio came from the expense distribution: 60,000 / 40,000 = **60% / 40%**.\n\n' +
             'Now each profit center is balanced within itself:\n' +
             '**Manufacturing:** 60,000 + 12,000 = 72,000 debit, 72,000 credit ✓\n' +
             '**Services:** 40,000 + 8,000 = 48,000 debit, 48,000 credit ✓\n\n' +
             'A segment balance sheet can now be produced.' },

      { baslik:'A case requiring a zero-balance clearing line — payment',
        belgeTuru:'ZP', tarih:'20.06.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables (PC: 1000)', borc:72000, not:'Came from the split information' },
          { hesap:'320', ad:'Trade payables (PC: 2000)', borc:48000, not:'Came from the split information' },
          { hesap:'102', ad:'Bank (PC: 1000)', alacak:120000, not:'Bank sits in a single profit center' },
          { hesap:'395', ad:'Zero-balance clearing (PC: 1000)', alacak:0, not:'Clearing' },
          { hesap:'395', ad:'Zero-balance clearing (PC: 2000)', borc:0, not:'Clearing' },
        ],
        not:'When the payment is made, the vendor liability is cleared **using the split information** ' +
             '({{FAGL_SPLINFO}} knows which piece belongs to which profit center).\n\n' +
             'But the bank sits in a single profit center. In this case the Services profit center carries a ' +
             '48,000 debit with no offset → the system performs a technical balancing act between the two ' +
             'profit centers **using the zero-balance clearing account**.\n\n' +
             '*(The 0 amounts in the example are shown that way just to simplify the display; in reality PC ' +
             '2000 is credited 48,000 and PC 1000 is debited 48,000.)*' },

      { baslik:'A sales invoice — splitting on the revenue side',
        belgeTuru:'DR', tarih:'15.06.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables (PC: 1000)', borc:180000, not:'**75% → Manufacturing**' },
          { hesap:'120', ad:'Trade receivables (PC: 2000)', borc:60000, not:'**25% → Services**' },
          { hesap:'600', ad:'Sales — Manufacturing (PC: 1000)', alacak:150000 },
          { hesap:'600', ad:'Sales — Services (PC: 2000)', alacak:50000 },
          { hesap:'391', ad:'Output VAT (PC: 1000)', alacak:30000 },
          { hesap:'391', ad:'Output VAT (PC: 2000)', alacak:10000 },
        ],
        not:'The same logic applies on the sales side: the customer and VAT lines are split **in proportion ' +
             'to the revenue distribution**. This way, the question "what does the Services unit have ' +
             'receivable from customers?" can be answered.' },
    ],

    tHesaplar:[
      { hesap:'Trade payables — Manufacturing segment', kod:'320 / PC 1000',
        borc:[{ ad:'Payment', tutar:72000 }],
        alacak:[{ ad:'Invoice (split)', tutar:72000 }],
        not:'Trackable by segment thanks to splitting' },
      { hesap:'Trade payables — Services segment', kod:'320 / PC 2000',
        borc:[{ ad:'Payment', tutar:48000 }],
        alacak:[{ ad:'Invoice (split)', tutar:48000 }],
        not:'This split **wasn\'t possible** in the classic setup' },
      { hesap:'Trade receivables — Manufacturing segment', kod:'120 / PC 1000',
        borc:[{ ad:'Sales invoice', tutar:180000 }],
        alacak:[],
        not:'The asset side of the segment balance sheet' },
    ],

    notlar:[
      { tip:'warn', baslik:'Where does the split ratio come from?', metin:
        'The split is based on **the distribution of the income statement lines**. That is, the vendor line ' +
        'is split in proportion to the expense lines.\n\n' +
        'What happens if there\'s no expense line? For example, when a **fixed asset** is purchased from a ' +
        'vendor, the offsetting line is a balance sheet account (an asset). In that case the split is derived ' +
        'from the dimension the asset line carries.\n\n' +
        'And if no line carries a dimension at all? Then a **default assignment** kicks in (usually a ' +
        '"dummy" profit center). This must be defined in configuration — if it isn\'t, the document **can\'t ' +
        'be saved** and the user gets a *"Ledger 0L: document splitting error"* message.\n\n' +
        'The diagnosis for this error is always the same: **which line isn\'t carrying which dimension?**' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'New G/L has three main capabilities and **each can be turned on separately**: document splitting, ' +
      'parallel ledgers, and real-time FI–CO integration. Document splitting itself has its own variants.',

    liste:[
      { ad:'Passive Splitting',
        aciklama:'The following document **inherits** the split information from the preceding document.',
        neZaman:'On transactions tied to a prior document, such as payment, clearing, or reversal.',
        ornek:'If the vendor was split 60%/40% on the invoice, the same ratio is applied on the payment. The ' +
              'information is read from {{FAGL_SPLINFO}}. **Requires no configuration.**' },

      { ad:'Active Splitting',
        aciklama:'The system **splits the line itself**, according to the splitting rules.',
        neZaman:'On documents where split information is generated for the first time, such as an invoice.',
        ornek:'The vendor line is split in proportion to the expense lines. It relies on **item category and ' +
              'business transaction** configuration.' },

      { ad:'Zero-Balance Clearing',
        aciklama:'When balance can\'t be achieved by dimension, the system generates a technical clearing line.',
        neZaman:'On transactions that transfer value between two profit centers (payment, transfer).',
        ornek:'When the liability of two profit centers is paid while the bank sits in a single profit ' +
              'center. A separate "zero-balance clearing" account must be defined.' },

      { ad:'Splitting Characteristic',
        aciklama:'Determines which dimension the splitting is performed on.',
        neZaman:'In configuration; **changing it later is very costly**.',
        ornek:'Profit center, segment, business area, fund. The "zero balance" and "mandatory field" ' +
              'settings are made separately for each.' },

      { ad:'Item Category',
        aciklama:'Tells the system **what kind of item** each account is, for splitting purposes.',
        neZaman:'Must be defined for every account — if missing, the document can\'t be saved.',
        ornek:'01000 vendor, 02000 customer, 03000 inventory, 20000 expense, 30000 revenue, 05100 tax.' },

      { ad:'Parallel Ledger',
        aciklama:'Recording the same transaction under more than one accounting standard.',
        neZaman:'When IFRS and local statutory rules need to be reported together.',
        ornek:'Covered in detail in the {{parallel-ledger}} topic.',
        tcodes:['FB01L','FINSC_LEDGER'] },

      { ad:'Real-Time Integration CO→FI',
        aciklama:'Value transfers inside CO (cost center allocation, etc.) are reflected in FI **instantly**.',
        neZaman:'In every setup that uses CO.',
        ornek:'In the classic setup this transfer happened in bulk at month-end and produced FI–CO ' +
              'differences; in New G/L a difference can\'t arise.' },

      { ad:'Segment',
        aciklama:'A dimension designed for IFRS 8 reporting, **derived** from the profit center.',
        neZaman:'When segment-based reporting is mandatory.',
        ornek:'The segment field is filled in on the profit center master; the system derives it automatically.' },
    ],

    karsilastirmaBasliklar:['Classic General Ledger', 'New G/L', 'S/4HANA ({{ACDOCA}})'],
    karsilastirma:[
      ['Totals table', '{{GLT0}}', '{{FAGLFLEXT}}', '**No totals table** — summed on the fly'],
      ['Line item table', '{{BSEG}}', '{{FAGLFLEXA}}', '**{{ACDOCA}}**'],
      ['Document splitting', 'None', '**Present**', 'Present'],
      ['Parallel ledger', 'None (custom workarounds)', '**Present**', 'Present'],
      ['Segment balance sheet', 'Cannot be produced', '**Can be produced**', 'Can be produced'],
      ['FI–CO integration', 'Bulk transfer at month-end', 'Real-time', '**Same table** — the concept of transfer disappears'],
      ['Profit center accounting', 'Separate ledger (EC-PCA)', 'Inside G/L', 'Inside G/L'],
      ['Reconciliation need', 'High', 'Low', '**Structurally impossible**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FAGLL03', ad:'G/L line items (New G/L) — by ledger and dimension',
        amac:'Lists general ledger line items with ledger, segment, and profit center filters.',
        neZaman:'When segment/profit-center-based analysis is needed; when verifying that splitting is working correctly.',
        adimlar:[
          { baslik:'Enter the account and company code' },
          { baslik:'**Choose the ledger**', aciklama:'If left blank, the leading ledger (0L) is used. To see ' +
                   'the IFRS ledger, the relevant ledger code is entered.' },
          { baslik:'Apply a dimension filter', aciklama:'Profit center, segment, business area — fields that ' +
                   'don\'t exist in {{FBL3N}}.' },
          { baslik:'Review the items', aciklama:'Split lines appear **separately**.' },
        ],
        ekranAkisi:[
          { ekran:'Selection', islem:'Account 320000 · Company code 1000 · Ledger **0L**' },
          { ekran:'Dimension', islem:'Profit center = 2000 (Services)' },
          { ekran:'Result', islem:'Only the vendor liability falling into the Services segment' },
        ],
        alanlar:{
          zorunlu:['Account','Company code'],
          opsiyonel:['Ledger','Profit center','Segment','Business area','Date range'] },
        hatalar:[
          { mesaj:'Report comes back empty even though FBL3N has items', sebep:'The wrong ledger was chosen, or the splitting dimension differs.', cozum:'Leave the ledger blank (leading ledger) and remove the dimension filters, then try again.' },
        ],
        ipucu:'**Difference between {{FBL3N}} and {{FAGLL03}}:** {{FBL3N}} reads from {{BSEG}} (the entry ' +
              'view), {{FAGLL03}} reads from the general ledger view. If splitting is active, the two show ' +
              '**a different number of lines** — this isn\'t an error, it\'s two different views. Segment ' +
              'analysis always uses {{FAGLL03}}.',
        ilgili:['FAGLB03','FBL3N','FB03'] },

      { kod:'FAGLB03', ad:'G/L account balances (New G/L)',
        amac:'Shows account balances by ledger and dimension.',
        neZaman:'When checking a segment balance sheet; for period-based balance analysis.',
        adimlar:[
          { baslik:'Enter the account, company code, and fiscal year' },
          { baslik:'Choose the ledger', aciklama:'You can see a different balance in different ledgers — a ' +
                   'sign of parallel accounting.' },
          { baslik:'Break down by dimension', aciklama:'The balance distribution by profit center/segment.' },
        ],
        ipucu:'The fastest way to check whether a segment balance sheet is **balanced**: compare the total ' +
              'debit and credit balance for each segment. If they aren\'t equal, something is missing in the ' +
              'splitting configuration.',
        ilgili:['FAGLL03','FS10N'] },

      { kod:'FB03', ad:'Display document — two views',
        amac:'Shows the document in both the entry view and the general ledger view.',
        neZaman:'To understand what splitting does; when diagnosing splitting problems.',
        adimlar:[
          { baslik:'Enter the document number' },
          { baslik:'Review the **entry view**', aciklama:'The lines the user entered.' },
          { baslik:'Switch to the **general ledger view**',
            aciklama:'The split lines and derived dimensions appear here.' },
          { baslik:'Compare the difference', aciklama:'Line count and dimension assignments — the clearest ' +
                   'proof of what splitting does.' },
        ],
        ipucu:'This is the **most effective way** to learn document splitting: put the same document side ' +
              'by side in both views. Every rule explained becomes concrete lines here.',
        ilgili:['FAGLL03','FB60','FB70'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'New G/L\'s table architecture was built **by adding onto** the classic structure: {{BKPF}}/{{BSEG}} ' +
      'stayed as the entry view, and {{FAGLFLEXA}}/{{FAGLFLEXT}} were added for the general ledger view. ' +
      'S/4HANA replaced these with **{{ACDOCA}}**.',

    liste:[
      { ad:'ACDOCA', baslik:'Universal Journal — S/4HANA\'s single line item table',
        tutar:'All FI and CO lines; ledger, profit center, segment, cost center, material, and up to eight ' +
              'currencies, all on the same line.',
        olusturan:'Every FI/CO document',
        guncelleyen:'Document posting; there is **no totals table** — totals are calculated on the fly',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'Via the document key with {{BKPF}}; via the ledger with {{T881}}.',
        s4:'**S/4HANA\'s central table.** Replaced {{FAGLFLEXA}}, {{FAGLFLEXT}}, {{GLT0}}, COEP, and more.',
        alanlar:[
          { ad:'RLDNR', aciklama:'**Ledger** — 0L is the leading ledger, 2L/3L are additional ledgers' },
          { ad:'RACCT', aciklama:'G/L account' },
          { ad:'PRCTR', aciklama:'{{kar-merkezi}} — filled in on balance sheet lines too, thanks to splitting' },
          { ad:'SEGMENT', aciklama:'Segment — derived from the profit center' },
          { ad:'KOSTL', aciklama:'Cost center — a CO dimension, on the same line' },
          { ad:'HSL / WSL / KSL', aciklama:'Local / transaction / group currency amounts' },
        ] },

      { ad:'FAGLFLEXA', baslik:'New G/L line item table (ECC)',
        tutar:'Items in the general ledger view — split lines included.',
        olusturan:'Every FI document (when New G/L is active)',
        guncelleyen:'Document posting',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'{{BSEG}} is the entry view, FAGLFLEXA is the general ledger view.',
        s4:'**Replaced by {{ACDOCA}}**; readable as a compatibility view.',
        alanlar:[
          { ad:'RLDNR', aciklama:'Ledger' },
          { ad:'PRCTR', aciklama:'Profit center — the result of splitting' },
          { ad:'DOCLN', aciklama:'Line number — the line count can grow after splitting' },
        ] },

      { ad:'FAGLFLEXT', baslik:'New G/L totals table (ECC)',
        tutar:'Periodic totals by account × ledger × dimension.',
        olusturan:'Document posting (parallel update)',
        s4:'**Removed.** S/4HANA has no totals table; {{ACDOCA}} is summed on the fly. **A mismatch between ' +
           'the total and the line items can\'t occur.**',
        alanlar:[
          { ad:'RLDNR', aciklama:'Ledger' },
          { ad:'RACCT', aciklama:'Account' },
          { ad:'HSL01…HSL16', aciklama:'Totals by period' },
        ] },

      { ad:'FAGL_SPLINFO', baslik:'Document splitting information',
        tutar:'The characteristics assigned to each item as a result of splitting.',
        olusturan:'Every FI document, when splitting is active',
        guncelleyen:'Clearing transactions **read** this information',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'The source of passive splitting — payment and clearing read from this table.',
        s4:'Still there; the result is also reflected in the {{ACDOCA}} lines.',
        alanlar:[
          { ad:'PRCTR', aciklama:'The profit center assigned to the item' },
          { ad:'SEGMENT', aciklama:'The segment assigned to the item' },
        ] },

      { ad:'BSEG', baslik:'Document line items — entry view',
        tutar:'The lines as the user entered them. Splitting is **not visible** here.',
        olusturan:'Document posting',
        s4:'{{uyumluluk-view}}; derived from {{ACDOCA}}.' },

      { ad:'T881', baslik:'Ledger definitions',
        tutar:'Leading and additional ledgers.',
        olusturan:'{{FINSC_LEDGER}}',
        s4:'{{ACDOCA}} carries `RLDNR` on every line.' },
    ],

    er:{
      type:'er',
      baslik:'Entry view ↔ general ledger view',
      varliklar:[
        { ad:'BKPF', rol:'FI', hub:true, aciklama:'Document header — **shared**',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }] },
        { ad:'BSEG', rol:'Entry view', aciklama:'The lines the user entered',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'HKONT' }] },
        { ad:'ACDOCA', rol:'General ledger view', aciklama:'**Split** lines + dimensions',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'DOCLN', tip:'pk' }, { ad:'PRCTR' }, { ad:'SEGMENT' }] },
        { ad:'FAGL_SPLINFO', rol:'Splitting', aciklama:'Split information — the source of passive splitting',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'fk' }, { ad:'PRCTR' }] },
        { ad:'T881', rol:'Configuration', aciklama:'Ledger definition',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'XLEADING' }] },
        { ad:'FAGLFLEXA', rol:'ECC', aciklama:'ECC line item table',
          alanlar:[{ ad:'RLDNR', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'PRCTR' }] },
      ],
      iliskiler:[
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'entry view' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'**general ledger view**' },
        { from:'BSEG', to:'FAGL_SPLINFO', alanlar:'BELNR + BUZEI', not:'the result of splitting' },
        { from:'FAGL_SPLINFO', to:'ACDOCA', alanlar:'PRCTR / SEGMENT', not:'dimension assignment' },
        { from:'T881', to:'ACDOCA', alanlar:'RLDNR', not:'ledger' },
        { from:'BKPF', to:'FAGLFLEXA', alanlar:'BELNR', not:'the ECC counterpart' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'In New G/L the user screens don\'t change; what changes are the **configuration screens**. The ' +
      'decisions an FI consultant makes here are hard to reverse.',

    ekranlar:[
      { ad:'Document splitting characteristics (SPRO)',
        aciklama:'Which dimension splitting is performed on, and the balance rule for each dimension.',
        alanlar:[
          { ad:'Characteristic', zorunlu:true, aciklama:'Profit center, segment, business area, fund. ' +
                   '**Adding one later is very costly.**' },
          { ad:'Zero balance', zorunlu:false, aciklama:'If checked, this dimension **must balance within ' +
                   'itself**; the system generates a clearing line if needed. **Mandatory** for a segment ' +
                   'balance sheet.' },
          { ad:'Mandatory field', zorunlu:false, aciklama:'If checked, the dimension can\'t be left blank; ' +
                   'if it can\'t be derived, the document **can\'t be saved**.' },
        ],
        ipucu:'The "zero balance" and "mandatory field" pair is the heart of the design. If both are on, a ' +
              'segment balance sheet is guaranteed — but **every document** must be able to derive the ' +
              'dimension. Even a single scenario that can\'t derive it halts production — which is why ' +
              'default assignment rules must be defined from the start.' },

      { ad:'Item category assignment (SPRO)',
        aciklama:'What kind of item each G/L account is, for splitting purposes.',
        alanlar:[
          { ad:'Account range', zorunlu:true, aciklama:'Ranges within the chart of accounts.' },
          { ad:'Item category', zorunlu:true, aciklama:'01000 vendor · 02000 customer · 03000 inventory · ' +
                   '05100 tax · 20000 expense · 30000 revenue · 04000 cash' },
        ],
        ipucu:'**If an item category isn\'t assigned for a newly opened account,** every document containing ' +
              'that account throws a *"document splitting error"*. This check should be added to the ' +
              'account-opening procedure — it\'s the most common splitting error seen in production.' },

      { ad:'Business transaction and variant (SPRO)',
        aciklama:'Which item categories can appear in which transaction type.',
        alanlar:[
          { ad:'Business transaction', zorunlu:true, aciklama:'0300 vendor invoice, 0200 customer invoice, ' +
                   '1000 payment, 0000 other.' },
          { ad:'Variant', zorunlu:true, aciklama:'The set of item categories the transaction allows.' },
        ],
        ipucu:'This screen defines "what happens in which situation" for the splitting rules. The standard ' +
              'variants cover most scenarios; for a special scenario, one is copied and adapted — **the ' +
              'standard variant is never changed directly**.' },

      { ad:'{{FB03}} — comparing the two views',
        aciklama:'The main screen for seeing and diagnosing the result of splitting.',
        alanlar:[
          { ad:'Entry view', zorunlu:false, aciklama:'The lines the user entered ({{BSEG}}).' },
          { ad:'General ledger view', zorunlu:false, aciklama:'The split lines ({{ACDOCA}}).' },
          { ad:'Ledger selection', zorunlu:false, aciklama:'Different ledgers can show different lines.' },
        ],
        ipucu:'The first step in diagnosing a splitting error: open **a similar document that saves without ' +
              'error** in both views and compare it with the problem document. The difference points ' +
              'directly to the missing configuration.' },
    ],

    zorunlu:['Splitting characteristic','Item category assignment','Business transaction variant','Zero-balance clearing account'],
    opsiyonel:['Segment derivation rule','Default profit center','Additional ledgers'],

    hatalar:[
      { mesaj:'Ledger 0L: document splitting error / Balancing field "Profit Center" in line item 001 not filled', sebep:'The line can\'t derive the splitting characteristic — the most common cause is that the account has **no item category assigned**.', cozum:'Check the account\'s item category assignment; assign one if missing. The default profit center rule kicks in if defined.' },
      { mesaj:'Item category ... not allowed in business transaction ...', sebep:'The business transaction variant doesn\'t allow this item category.', cozum:'Extend the business transaction variant or use the correct transaction type. Don\'t change the standard variant — copy it.' },
      { mesaj:'Account ... requires an assignment to a CO object', sebep:'The income statement account expects a CO object (cost center/internal order).', cozum:'Enter a cost center on the posting, or define a default assignment ({{OKB9}}) for the account.' },
      { mesaj:'Segment balance sheet comes out unbalanced', sebep:'The zero-balance setting isn\'t checked, or the clearing account isn\'t defined.', cozum:'Check "zero balance" on the splitting characteristic and define the clearing account. **Past documents won\'t be corrected** — only new documents will be right.' },
      { mesaj:'FBL3N and FAGLL03 show a different number of lines', sebep:'This isn\'t an error: {{FBL3N}} reads the entry view, {{FAGLL03}} reads the general ledger view.', cozum:'Always use {{FAGLL03}} for segment analysis.' },
    ],

    ipuclari:[
      '**Don\'t try to turn on document splitting after going live.** Documents in closed periods stay ' +
      'unsplit; the segment balance sheet will never balance for past periods.',
      'Add an **item category assignment** check to the new-account-opening procedure — most splitting ' +
      'errors in production come from this gap.',
      'To understand splitting, compare the same document in both views in {{FB03}}; it teaches far faster ' +
      'than any theoretical explanation.',
      'Use **{{FAGLL03}}**, not {{FBL3N}}, for segment analysis.',
      'Define the default profit center rule from the start — a single scenario that can\'t derive it halts production.',
      'Keep the number of splitting characteristics **as small as possible**; every characteristic must be ' +
      'derivable on every document.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'Document header — shared by both views' },
      { tablo:'BSEG', ne:'**Entry view** — the lines the user entered' },
      { tablo:'ACDOCA', ne:'**General ledger view** (S/4) — split lines + all dimensions' },
      { tablo:'FAGLFLEXA', ne:'General ledger view (ECC)' },
      { tablo:'FAGLFLEXT', ne:'Totals (ECC) — removed in S/4' },
      { tablo:'FAGL_SPLINFO', ne:'Split information — the source of passive splitting' },
    ],

    commit:
      'Splitting happens **inside** document posting — it isn\'t a separate step or a background job. ' +
      '{{BSEG}}, {{ACDOCA}}, and {{FAGL_SPLINFO}} are written in **the same LUW**.\n\n' +
      'The practical consequence: if splitting fails, **the document is never posted at all**. There\'s no ' +
      'such thing as a half-split document. This is a counterpart to the "noisy failure" behavior in MM ' +
      'integration, and it\'s a good thing — you get an explicit error instead of silent data corruption.',

    belgeNo:
      'Splitting doesn\'t affect the document number; the entry view and the general ledger view share ' +
      '**the same number**. Only the line numbers change: `BUZEI` in {{BSEG}}, `DOCLN` in {{ACDOCA}}.',

    postingLogic:
      'The steps of the splitting algorithm:\n\n' +
      '**1.** The **business transaction** is determined from the document type (vendor invoice, payment, etc.).\n' +
      '**2.** The **item category** is read from each line\'s account.\n' +
      '**3.** It\'s checked whether the transaction variant allows this category combination.\n' +
      '**4.** The splitting rule says which line is split in proportion to which other line (usually balance ' +
      'sheet lines in proportion to income statement lines).\n' +
      '**5.** Dimensions are derived; if they can\'t be, the default assignment kicks in.\n' +
      '**6.** If zero balance is checked, balance is checked by dimension; a **clearing line** is generated ' +
      'if needed.\n' +
      '**7.** The result is written to {{ACDOCA}}, and the split information to {{FAGL_SPLINFO}}.\n\n' +
      'Subsequent documents (payment, clearing) skip step 4 and read directly from {{FAGL_SPLINFO}} — this ' +
      'is **passive splitting**.',

    belgeTuru:
      'Because the document type determines the **business transaction**, it directly affects splitting. KR ' +
      '(vendor invoice) and SA (G/L posting) trigger different splitting rules.\n\n' +
      'The practical consequence: two postings that produce the same accounting effect can **split ' +
      'differently** when entered with different document types. This is why the discipline of "always ' +
      'enter the same transaction the same way" matters even more in New G/L.',

    numberRange:
      'Additional ledgers don\'t need a separate number range — the document number is shared. However, ' +
      'it\'s common practice to define a separate document type and range for postings made to a single ' +
      'specific ledger ({{FB01L}}); this makes it easier to isolate ledger-specific corrections in reports.',

    accountDetermination:
      'Splitting has no account determination of its own, but a **zero-balance clearing account** must be ' +
      'defined. This is a technical account: cross-dimension clearing lines are written to it, and it ' +
      '**always nets to zero at the company total**.\n\n' +
      'The account must be opened in {{FS00}} as "automatic posting only"; if a manual posting is made to ' +
      'it, the segment balance breaks.',

    tur:
      '**Configuration:** splitting characteristics, item category assignments, business transaction ' +
      'variants, ledger definitions, the zero-balance clearing account.\n\n' +
      '**Master data:** the profit center (segment field included), the cost center, the G/L account.\n\n' +
      '**Transaction data:** {{ACDOCA}} lines, {{FAGL_SPLINFO}}.',

    transport:
      'Splitting configuration transports normally. **But watch out for this trap:** item category ' +
      'assignments rely on **account ranges**. If the target system uses different account numbers, or new ' +
      'accounts have been opened, the ranges can leave a gap.\n\n' +
      'The result: splitting that works fine in test throws a *"document splitting error"* on specific ' +
      'accounts in production. **The coverage of the account ranges must be verified during transport.**',

    img:[
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Business Transactions → Document Splitting → Define Document Splitting Characteristics for General Ledger Accounting', not:'Profit center, segment · zero balance · mandatory field' },
      { yol:'SPRO → … → Document Splitting → Classify G/L Accounts for Document Splitting', not:'**The most commonly forgotten step**' },
      { yol:'SPRO → … → Document Splitting → Define Business Transaction Variants', not:'Copy the standard variant, don\'t change it' },
      { yol:'SPRO → … → Document Splitting → Activate Document Splitting', not:'Can be turned off per company code' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Master Data → Ledger → Define Ledgers for General Ledger Accounting', not:'{{FINSC_LEDGER}}' },
    ],

    ekstra:[
      { ic:'⏳', baslik:'Why can\'t document splitting be turned on later?', metin:
        'Technically it can be. But the result is unusable, and here\'s why:\n\n' +
        'Splitting only applies to documents **posted after it\'s turned on**. Past documents stay unsplit — ' +
        'in their {{ACDOCA}} lines, the vendor/customer/tax items are **dimensionless**.\n\n' +
        'The result: if you turn splitting on in June 2027, the segment balance sheet will **never balance** ' +
        'for periods before June. Opening balances are dimensionless, liabilities that were already cleared ' +
        'can\'t be cleared retroactively since there\'s no split information, and comparative reports become ' +
        'meaningless.\n\n' +
        'SAP offers special tools for this transition (a migration service), but the process is a project of ' +
        'its own size and is usually timed to **the start of a fiscal year**.\n\n' +
        '**Consulting rule:** the document splitting decision is made in *the first week* of the setup. ' +
        '"Let\'s leave it off for now and turn it on later" is one of the most expensive FI decisions there is.' },

      { ic:'🔄', baslik:'Active and passive splitting — why are both needed?', metin:
        '**Active splitting** runs on the invoice: the vendor line is split in proportion to the expense ' +
        'lines. It\'s rule-based, relying on configuration.\n\n' +
        '**Passive splitting** runs on the payment: the system reads the invoice\'s split information from ' +
        '{{FAGL_SPLINFO}} and applies **the same ratio**. It doesn\'t look for a rule.\n\n' +
        'Why are they different? Because a payment document has no income statement line to derive the ' +
        'split from — there\'s only a vendor and a bank. Rule-based splitting can\'t work here.\n\n' +
        'The result of passive splitting: **however the invoice was split, its payment is split the same ' +
        'way.** This keeps clearing consistent by dimension. If {{FAGL_SPLINFO}} is deleted or corrupted, ' +
        'clearing transactions fail — that\'s where the table\'s criticality comes from.' },
    ],

    notlar:[
      { tip:'warn', baslik:'An account with no item category = halted production', metin:
        'When a new G/L account is opened, **if no item category is assigned**, every document containing ' +
        'that account throws a *"document splitting error"* and **can\'t be saved**.\n\n' +
        'This is the most common New G/L problem in production, and its typical scenario is: a new expense ' +
        'account is opened at month-end, the first posting is tried, an error comes back, nobody knows why, ' +
        'and the close is delayed.\n\n' +
        '**Prevention:** add an item category check as a mandatory step in the account-opening procedure. ' +
        'Defining wide account ranges in the chart of accounts also reduces the risk (for example, the whole ' +
        '770000–779999 range is assigned to category 20000).' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'S/4HANA **completed** New G/L\'s goal. New G/L had merged different ledgers into a single structure; ' +
      'with {{ACDOCA}}, FI and CO were moved into **the same table** too. Totals tables were removed — a ' +
      'mismatch between the total and the line items became **structurally impossible**.',

    eccFarklari:[
      { konu:'Line item table', ecc:'{{FAGLFLEXA}} + COEP (CO separate)', s4:'**{{ACDOCA}}** — FI and CO together' },
      { konu:'Totals table', ecc:'{{FAGLFLEXT}}, {{GLT0}}', s4:'**None** — summed on the fly' },
      { konu:'FI–CO reconciliation', ecc:'Real-time transfer (New G/L)', s4:'**Doesn\'t exist as a concept** — same table' },
      { konu:'Profit center accounting', ecc:'Inside G/L (EC-PCA removed)', s4:'{{ACDOCA}} dimension' },
      { konu:'Document splitting', ecc:'Present', s4:'**Same logic, unchanged**' },
      { konu:'Currency', ecc:'3 currencies', s4:'**Up to 8** parallel currencies' },
      { konu:'Ledger definition', ecc:'Separate transactions', s4:'{{FINSC_LEDGER}} single point' },
    ],

    universalJournal:
      '{{ACDOCA}} is the logical continuation of New G/L, and it resolves the question: *"why does the same ' +
      'transaction sit differently in different tables?"*\n\n' +
      'In ECC, an expense posting used to be written to {{BSEG}}, {{FAGLFLEXA}}, {{FAGLFLEXT}}, and, on the ' +
      'CO side, COEP. Four writes, four chances for inconsistency, four reconciliations.\n\n' +
      'In S/4HANA there\'s **a single line** carrying every dimension. {{BSEG}} and {{FAGLFLEXA}} are ' +
      '**derived** from {{ACDOCA}} as compatibility views — not separate data, just a different reading of ' +
      'the same data.\n\n' +
      'Removing the totals table also put an end to the classic problem: the "totals table doesn\'t match ' +
      'the line item table" error **can no longer occur**.',

    kalkanTcodes:[
      { eski:'{{GLT0}}-based reports', yeni:'{{FAGLL03}} / {{FAGLB03}}', not:'Classic totals reports' },
      { eski:'EC-PCA profit center reports', yeni:'{{ACDOCA}} dimension reports', not:'The separate profit center ledger is gone' },
      { eski:'—', yeni:'—', not:'{{FAGLL03}}, {{FAGLB03}}, {{FB03}} were **not removed**' },
    ],

    fiori:[
      { ad:'Display Line Items in General Ledger', aciklama:'Replaces {{FAGLL03}}; with ledger and dimension filters.' },
      { ad:'Display G/L Account Balances', aciklama:'Replaces {{FAGLB03}}.' },
      { ad:'Manage Journal Entries', aciklama:'Document display and comparison of the two views.' },
      { ad:'Profit Center — Balance Sheet', aciklama:'The product of document splitting: a segment/profit-center balance sheet.' },
      { ad:'Trial Balance', aciklama:'A trial balance by ledger and dimension.' },
    ],

    compatibilityViews:[
      '{{BSEG}}, {{FAGLFLEXA}}, {{GLT0}} — **views derived from {{ACDOCA}}**.',
      '{{FAGLFLEXT}} — calculated on the fly, since the concept of a totals table is gone.',
      'Old custom programs keep working thanks to these views; but **new development should read ' +
      '{{ACDOCA}} directly** (for performance).',
    ],

    performans:
      'The biggest gain is the removal of the totals tables: in ECC, every posting wrote to both a line ' +
      'item table and a totals table (a source of lock contention). In S/4HANA there\'s a single write, and ' +
      'totals are calculated at read time.\n\n' +
      'Segment/profit-center reports also got noticeably faster — since the dimensions sit on the same ' +
      'line, no join is needed.',

    bestPractices:[
      'Carry the document splitting configuration over **as-is** during migration; the logic hasn\'t changed.',
      'Verify **the coverage of the account ranges** in the item category assignments — new accounts can ' +
      'fall outside a range.',
      'In new development, read **{{ACDOCA}}** instead of {{BSEG}}; the compatibility view is slow.',
      'Review custom reports that read the totals table; they\'re no longer necessary.',
      'Re-evaluate the parallel currency requirement during migration — S/4HANA supports up to eight, and ' +
      'this is a setting that\'s hard to add later.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'A segment balance sheet was requested: why doesn\'t it come out without splitting?',
    hikaye:
      '**Ege Holding Inc.** operates in two business lines: **Manufacturing** (PC 1000) and **Services** (PC ' +
      '2000). The board wants a separate balance sheet for each business line: *"How much does the Services ' +
      'unit owe, and how much is owed to it?"*\n\n' +
      'The finance director tries to prepare the report and hits a wall: the income statement can be split, ' +
      '**the balance sheet can\'t**.\n\n' +
      'This scenario shows where the problem comes from, how document splitting solves it, and the real ' +
      'obstacles encountered during the transition.',
    veriler:[
      { k:'Company code', v:'1000 · TRY' },
      { k:'Profit centers', v:'1000 Manufacturing · 2000 Services' },
      { k:'Current state', v:'Document splitting **off**' },
      { k:'Requested', v:'**Complete balance sheet** by profit center' },
      { k:'Sample invoice', v:'120,000 TRY (100,000 expense + 20,000 VAT)' },
    ],

    adimlar:[
      { baslik:'The current state is examined — the source of the problem', tcode:'FB03',
        aciklama:'A typical vendor invoice is opened and the dimensions are checked.',
        girdi:[
          { alan:'Document', deger:'1900004102 · KR · 10.06.2027' },
          { alan:'Expense line 1', deger:'60,000 TRY · **PC 1000** ✓' },
          { alan:'Expense line 2', deger:'40,000 TRY · **PC 2000** ✓' },
          { alan:'VAT line', deger:'20,000 TRY · **No PC** ' },
          { alan:'Vendor line', deger:'120,000 TRY · **No PC** ' },
        ],
        fis:{ baslik:'Document 1900004102 — splitting off', belgeTuru:'KR', tarih:'10.06.2027',
          satirlar:[
            { hesap:'770', ad:'Expense — Manufacturing', borc:60000, not:'PC 1000' },
            { hesap:'770', ad:'Expense — Services', borc:40000, not:'PC 2000' },
            { hesap:'191', ad:'Deductible VAT', borc:20000, not:'**No PC**' },
            { hesap:'320', ad:'Trade payables', alacak:120000, not:'**No PC**' },
          ], not:'The income statement lines carry a dimension, **the balance sheet lines don\'t**. This is ' +
                 'exactly the technical reason the segment balance sheet doesn\'t come out.' },
        tabloEtkisi:[
          { tablo:'ACDOCA', ne:'4 lines; `PRCTR` is **blank** on two of them' },
        ],
        not:'This isn\'t an error, it\'s classic behavior: a vendor is a balance sheet account and naturally ' +
             'doesn\'t carry a profit center. Assigning a dimension to balance sheet lines is **document ' +
             'splitting\'s job**.' },

      { baslik:'The dimensionless amount is measured', tcode:'FAGLL03',
        aciklama:'The size of the problem is quantified — needed to make a decision.',
        girdi:[
          { alan:'Account', deger:'320000 Trade payables · June 2027' },
          { alan:'Total balance', deger:'4,850,000 TRY' },
          { alan:'Assigned to PC 1000', deger:'0 TRY' },
          { alan:'Assigned to PC 2000', deger:'0 TRY' },
          { alan:'**Dimensionless**', deger:'**4,850,000 TRY — 100%**' },
        ],
        not:'**All** of the vendor liability is dimensionless. The same is true of the customer (120), bank ' +
             '(102), and tax (191/391) accounts.\n\n' +
             'In other words, **nearly the entire asset and liability side** of the segment balance sheet is ' +
             'missing. A manual allocation is theoretically possible but impossible for thousands of ' +
             'documents, and it would need to be repeated every month.' },

      { baslik:'Document splitting is configured (in the test system)', tcode:'SPRO',
        aciklama:'Three configuration steps are completed in sequence.',
        girdi:[
          { alan:'1. Characteristic', deger:'**Profit center** · zero balance ✓ · mandatory field ✓' },
          { alan:'2. Item categories', deger:'320* → 01000 vendor · 120* → 02000 customer · ' +
                                          '770*/600* → 20000/30000 · 191*/391* → 05100 tax' },
          { alan:'3. Clearing account', deger:'395000 Zero-balance clearing · "automatic posting only"' },
          { alan:'4. Activation', deger:'Turned on for company code 1000' },
        ],
        tabloEtkisi:[
          { tablo:'FAGL_SPLINFO', ne:'Split information will be written for every document from now on' },
        ],
        not:'**The "zero balance" flag is critical:** without it, splitting still happens, but every profit ' +
             'center balancing within itself **isn\'t guaranteed** — and an unbalanced segment balance sheet ' +
             'is worse than no balance sheet at all.' },

      { baslik:'The first test — and the first error', tcode:'FB60',
        aciklama:'The same invoice is entered again.',
        girdi:[
          { alan:'Transaction', deger:'{{FB60}} · 100,000 + 20% VAT' },
          { alan:'**Error**', deger:'*"Balancing field Profit Center in line item 003 not filled"*' },
          { alan:'Line 003', deger:'The VAT line — account 191000' },
        ],
        not:'**No item category had been assigned for account 191000.** The range had been defined as ' +
             '`190000–190999` instead of `191000–191999` — a single-digit typo.\n\n' +
             'This is a textbook example of New G/L\'s most common production error: **a missing item ' +
             'category makes the document entirely unable to be saved.** Diagnosis is fast because the ' +
             'error message gives the line number — as long as you know where to look.' },

      { baslik:'The correction and a successful posting', tcode:'FB60',
        aciklama:'The range is corrected and the invoice is entered again.',
        girdi:[
          { alan:'Correction', deger:'191000–191999 → item category **05100 tax**' },
          { alan:'What the user entered', deger:'4 lines' },
          { alan:'**What the system produced**', deger:'**6 lines**' },
        ],
        fis:{ baslik:'Document 1900004156 — general ledger view', belgeTuru:'KR', tarih:'12.06.2027',
          satirlar:[
            { hesap:'770', ad:'Expense — Manufacturing (PC 1000)', borc:60000 },
            { hesap:'770', ad:'Expense — Services (PC 2000)', borc:40000 },
            { hesap:'191', ad:'Deductible VAT (PC 1000)', borc:12000, not:'**60% split**' },
            { hesap:'191', ad:'Deductible VAT (PC 2000)', borc:8000, not:'**40% split**' },
            { hesap:'320', ad:'Trade payables (PC 1000)', alacak:72000, not:'**60% split**' },
            { hesap:'320', ad:'Trade payables (PC 2000)', alacak:48000, not:'**40% split**' },
          ], not:'Each profit center is balanced within itself:\n' +
                 '**PC 1000:** 60,000 + 12,000 = 72,000 debit = 72,000 credit ✓\n' +
                 '**PC 2000:** 40,000 + 8,000 = 48,000 debit = 48,000 credit ✓' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'**4 lines** — the entry view didn\'t change' },
          { tablo:'ACDOCA', ne:'**6 lines** — the general ledger view, `PRCTR` filled on all of them' },
          { tablo:'FAGL_SPLINFO', ne:'The split ratio was recorded — will be used at payment' },
        ],
        not:'When the two views are put side by side in {{FB03}}, the difference is clear: the user entered ' +
             '4 lines, the general ledger has 6. **This isn\'t an error, it\'s proof that splitting worked.**' },

      { baslik:'Payment — passive splitting takes over', tcode:'F-53',
        aciklama:'The invoice is paid and how the split information carries over is observed.',
        girdi:[
          { alan:'Amount paid', deger:'120,000 TRY · bank PC 1000' },
          { alan:'Vendor line', deger:'Split **from {{FAGL_SPLINFO}}** as 72,000 / 48,000' },
          { alan:'Clearing', deger:'48,000 TRY between PC 1000 ↔ PC 2000 on account 395000' },
        ],
        not:'The payment document has **no** expense line to derive the split from — there\'s only the ' +
             'vendor and the bank. Rule-based (active) splitting can\'t work here.\n\n' +
             'The system read the invoice\'s split information from {{FAGL_SPLINFO}} and applied **the same ' +
             'ratio**: this is **passive splitting**.\n\n' +
             'Because the bank sits in a single profit center, the system also generated a clearing line — ' +
             'since PC 2000\'s liability was paid from PC 1000\'s bank, the difference was balanced in the ' +
             'zero-balance clearing account.' },

      { baslik:'The segment balance sheet is pulled', tcode:'FAGLB03',
        aciklama:'The requested report finally comes out.',
        girdi:[
          { alan:'Report', deger:'Balance by profit center · June 2027' },
          { alan:'**PC 1000 Manufacturing**', deger:'Assets 2,900,000 = Liabilities 2,900,000 ✓' },
          { alan:'**PC 2000 Services**', deger:'Assets 1,950,000 = Liabilities 1,950,000 ✓' },
          { alan:'Clearing account', deger:'**0 TRY** at the company total ✓' },
        ],
        not:'Each segment is balanced within itself and the clearing account nets to zero at the company ' +
             'total — when **all three checks** hold together, splitting is working correctly.\n\n' +
             '**But there\'s an important limit:** this report only covers documents **posted after ' +
             'splitting was turned on**. Movements before June are still dimensionless.' },

      { baslik:'The go-live decision — the start of the fiscal year is chosen', tcode:'SPRO',
        aciklama:'The go-live timing is planned.',
        girdi:[
          { alan:'Option 1', deger:'Turn it on now → past periods stay dimensionless, **the comparative report breaks**' },
          { alan:'Option 2 ✓', deger:'**Turn it on at the start of the fiscal year, 01.01.2028** — a clean start' },
          { alan:'Extra work', deger:'Opening balances will be allocated to the profit centers' },
          { alan:'Lead time', deger:'6 months of preparation: account ranges, testing, training' },
        ],
        not:'The start of the fiscal year was chosen because **opening balances** can be manually allocated ' +
             'at that point, and within-year comparisons stay consistent.\n\n' +
             'Had it been turned on mid-year, January–June would be dimensionless and July–December ' +
             'dimensioned; the annual segment balance sheet would **never** come out right.' },
    ],

    sonuc:
      'The segment balance sheet came out — but **only from the next fiscal year onward**.\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. A segment balance sheet is a data problem, not a reporting problem.** Balance sheet lines ' +
      '(vendor, customer, bank, tax) naturally carry no profit center. No report can produce a dimension ' +
      'that isn\'t in the data. {{belge-bolme}} fills exactly this gap.\n\n' +
      '**2. Item category assignment is the most common source of error.** A single-digit typo in a range ' +
      'makes **every document** containing that account unable to be saved. The error message gives the ' +
      'line number; diagnosis is fast, but you need to know where to look.\n\n' +
      '**3. Active and passive splitting solve different problems.** Rule-based **active** splitting runs ' +
      'on the invoice; since there\'s no line to derive the split from on the payment, the system reads from ' +
      '{{FAGL_SPLINFO}} and performs **passive** splitting. Without this duality, clearing transactions ' +
      'couldn\'t maintain dimensional consistency.\n\n' +
      '**4. Timing matters more than configuration.** Document splitting doesn\'t apply retroactively. If ' +
      'it\'s turned on mid-year, that year\'s segment balance sheet **never** comes out right. The right ' +
      'moment is **the start of the fiscal year** — and that decision is not a technical decision, it\'s a ' +
      '**project-plan decision**.',
  },

  },
});
