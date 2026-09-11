/* ==========================================================================
   content/fi-en/asset-accounting.js — English body for "Asset Accounting"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'asset-accounting',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Asset Accounting (FI-AA) is the FI sub-component that tracks a company\'s **multi-year assets** — ' +
      'machinery, buildings, vehicles, computers — from birth to disposal.\n\n' +
      'AA is a {{muavin-defter}}: the detail of every asset (acquisition value, accumulated depreciation, ' +
      'useful life, cost center) is held here; it reflects into general ledger **as a summary** through a ' +
      '{{mutabakat-hesabi}}. The balance sheet reads "253 Plant, machinery and equipment 12,400,000 TRY"; who ' +
      'the 1,847 assets behind that figure are lives in AA.\n\n' +
      'What sets AA apart from the other sub-components is its **time dimension**: an invoice ends in a single ' +
      'event, an asset produces a posting **every month for 5–40 years**.',

    neden:
      '**To spread cost over the correct period.** Expensing a 60,000 TRY machine in the month it\'s bought ' +
      'wipes out that month\'s profit and overstates the next 59 months. {{amortisman}} corrects this distortion.\n\n' +
      '**To comply with different regulations at the same time.** Commercial accounting says 5 years, tax law ' +
      'says 4 years, IFRS wants another method entirely. Thanks to {{amortisman-alani}}, the same asset is ' +
      'valued three different ways and produces three separate reports.\n\n' +
      '**For inventory control.** Which asset is where, whose responsibility it is, and what it\'s worth — ' +
      'insurance, audit, and tax inspection all ask for this information.',

    sirketOnemi:
      'AA is the **largest single line** on the balance sheet in capital-intensive sectors such as ' +
      'manufacturing and energy. A badly configured AA means years of misreported profit.\n\n' +
      'From a consulting standpoint, AA is the FI area that **demands the most configuration**: ' +
      '{{degerleme-plani}}, {{amortisman-alani}}, {{varlik-sinifi}}, account determination ({{AO90}}), ' +
      '{{amortisman-anahtari}} — all of it has to be right before go-live. Fixing it afterward means ' +
      'revaluing thousands of already-opened assets.\n\n' +
      'The distinguishing question is: **"What is the relationship between a depreciation area and a ' +
      'ledger?"** The answer reveals whether parallel accounting is genuinely understood.',

    gercekHayat:
      'A textile factory buys a weaving machine for 2,400,000 TRY. The accounting manager has to work with ' +
      'three different figures:\n\n' +
      '**Commercial accounting:** 10-year useful life → 240,000 TRY depreciation per year. The balance sheet ' +
      'shows this figure.\n\n' +
      '**Tax law:** the machine is depreciated over 8 years → 300,000 TRY per year. The tax base is ' +
      'calculated from this.\n\n' +
      '**IFRS (group reporting):** component-based depreciation → engine 6 years, frame 15 years.\n\n' +
      'Instead of keeping three separate sets of books, SAP opens a **single asset record** and defines three ' +
      '{{amortisman-alani}}. Each area calculates with its own rule; the reports come out independently of ' +
      'each other. This is AA\'s reason for existing.',

    muhasebeMantigi:
      'An asset\'s accounting life has **four stages**:\n\n' +
      '**1. {{aktiflestirme}}:** the expenditure is recorded not as an expense but as an **asset**. The ' +
      'balance sheet grows; profit is unaffected.\n\n' +
      '**2. {{amortisman}}:** each period, the portion of benefit consumed is expensed. There is **no cash ' +
      'outflow** — the money already left at the time of purchase.\n\n' +
      '**3. Disposal:** the asset is sold, scrapped, or transferred. The difference between ' +
      '{{net-defter-degeri}} and the sale proceeds is recorded as a gain or loss.\n\n' +
      '**4. Closing:** at year-end, asset accounting is closed ({{AJAB}}) and the new year is opened ' +
      '({{AJRW}}).\n\n' +
      'A critical distinction: **the acquisition value never decreases.** Account 253 keeps showing 60,000 ' +
      'TRY; the decrease accumulates in account 257, Accumulated depreciation. On the balance sheet the two ' +
      'are netted.',

    kavramlar: ['amortisman', 'birikmis-amortisman', 'net-defter-degeri', 'faydali-omur',
                'amortisman-anahtari', 'amortisman-alani', 'degerleme-plani', 'varlik-sinifi',
                'yatirim-devam', 'aktiflestirme', 'hareket-turu', 'mutabakat-hesabi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The asset process differs from other FI processes: **it doesn\'t end in a single event**, it spans ' +
      'years. That\'s why "process" in AA means two things: an asset\'s **life cycle**, and the **monthly ' +
      'depreciation routine** that repeats every month.',

    roller:[
      { rol:'Requesting unit', gorev:'Opens the investment request; states the technical specification and where it will be used.' },
      { rol:'Investment committee / Management', gorev:'Approves the investment. Budget control is usually done on the CO side.' },
      { rol:'Purchasing', gorev:'Opens the purchase order. If account assignment category **A** (asset) is chosen, the goods receipt is posted directly to the asset.' },
      { rol:'Fixed asset accountant', gorev:'Opens the asset master record ({{AS01}}), records the acquisition, runs {{amortisman}}.' },
      { rol:'Inventory officer', gorev:'Performs the physical count, updates the asset\'s location and responsible person.' },
      { rol:'Accounting manager', gorev:'Approves useful-life changes, unplanned depreciation, and disposal decisions.' },
      { rol:'FI consultant', gorev:'Designs {{degerleme-plani}}, {{amortisman-alani}}, {{varlik-sinifi}}, {{AO90}} account determination, and {{amortisman-anahtari}}.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'An asset\'s life cycle',
      adimlar:[
        { ic:'📝', rol:'Requesting unit', baslik:'Investment request and approval',
          aciklama:'The need is stated, budget control is performed. **No FI posting.**',
          cikti:'Approved investment request', ok:'the order is opened' },
        { ic:'🏗️', rol:'Accounting / Project', baslik:'An asset under construction is opened if needed',
          aciklama:'For long-running investments, cost is first collected in the {{yatirim-devam}} account. ' +
                   '**No depreciation is posted** because the asset isn\'t ready for use yet.',
          cikti:'AuC asset record', ok:'costs accumulate' },
        { ic:'📗', rol:'Fixed asset accountant', baslik:'The asset master record is opened ({{AS01}})',
          aciklama:'{{varlik-sinifi}} is selected; account determination, number range, and the default ' +
                   '{{amortisman-anahtari}} come in automatically.',
          cikti:'{{ANLA}} + {{ANLB}} records', ok:'the asset is acquired' },
        { ic:'💰', rol:'Fixed asset accountant', baslik:'The acquisition is recorded',
          aciklama:'{{ABZON}} (automatic offsetting account), {{F-90}} (from the vendor) or through MM ' +
                   '({{MIGO}} + {{MIRO}}). The {{aktiflestirme}} date determines when depreciation begins.',
          cikti:'{{ANEP}} transaction + FI document', ok:'repeats every month' },
        { ic:'📉', rol:'System', baslik:'Monthly depreciation is run ({{AFAB}})',
          aciklama:'The period\'s planned depreciation is calculated and posted to FI. ' +
                   '**No cash outflow**, only an expense arises.',
          cikti:'Depreciation document', ok:'continues for years' },
        { ic:'🔧', rol:'Fixed asset accountant', baslik:'Changes over the asset\'s life',
          aciklama:'Useful-life updates ({{AS02}}), unplanned depreciation ({{ABAA}}), ' +
                   'cost center changes, transfer ({{ABUMN}}).',
          cikti:'Updated values', ok:'the useful life ends' },
        { ic:'🚪', rol:'Fixed asset accountant', baslik:'Disposal is recorded',
          aciklama:'Sale ({{F-92}}), scrapping ({{ABAVN}}), or transfer. ' +
                   'The difference between {{net-defter-degeri}} and the proceeds is recorded as gain or loss.',
          cikti:'Disposal document', ok:'at year-end' },
        { ic:'🔒', rol:'Accounting manager', baslik:'Year-end closing',
          aciklama:'{{AJRW}} opens the new year, {{AJAB}} closes the old one. No postings are possible in a closed year.',
          cikti:'Closed fiscal year' },
      ],
    },

    adimlar:[
      { rol:'Purchasing', eylem:'Opens the asset purchase order (account assignment A)', sistem:'{{ME21N}} — no FI posting' },
      { rol:'Fixed asset accountant', eylem:'Opens the asset master record', sistem:'{{AS01}} → {{ANLA}}, {{ANLB}}' },
      { rol:'Fixed asset accountant', eylem:'Records the acquisition', sistem:'{{ABZON}}, {{F-90}} or {{MIRO}}' },
      { rol:'System', eylem:'Monthly depreciation is run', sistem:'{{AFAB}} — test first, then real' },
      { rol:'Fixed asset accountant', eylem:'Monitors asset values', sistem:'{{AW01N}}, {{AR01}}, {{AR02}}' },
      { rol:'Fixed asset accountant', eylem:'Records transfer / disposal', sistem:'{{ABUMN}}, {{ABAVN}}, {{F-92}}' },
      { rol:'Project accounting', eylem:'Capitalizes the investment', sistem:'{{AIAB}} + {{AIBU}}' },
      { rol:'Accounting manager', eylem:'Closes the year', sistem:'{{AJRW}} → {{AJAB}}' },
    ],

    veriAkisi:{
      nereden:'The purchase order and goods receipt from MM (account assignment category A); the vendor ' +
              'invoice from AP; investment order/project costs from CO; default settings from {{varlik-sinifi}}.',
      nereye:'Into {{ANEP}} transactions, {{ANLC}} annual values, depreciation documents in FI; into ' +
             '{{maliyet-yeri}} expense on the CO side; into the balance sheet and tax reports.',
      tetikleyen:'A purchase above the capitalization threshold that will be used over multiple years.',
      sonraki:'Depreciation spread over the years, period-end closing, gain/loss calculation on disposal.',
    },

    notlar:[
      { tip:'tip', baslik:'Expense or asset? — the capitalization threshold', metin:
        'Not every purchase is capitalized. Companies set a **capitalization threshold** (e.g. 10,000 TRY) ' +
        'and purchases below it are expensed directly. The reason is practical: producing five years of ' +
        'depreciation postings for a 400 TRY keyboard costs more than the accuracy it delivers.\n\n' +
        'In SAP, this threshold is managed through {{varlik-sinifi}} and low-value asset (LVA) configuration.' },
      { tip:'warn', baslik:'No depreciation is posted on an AuC', metin:
        'A {{yatirim-devam}} (Asset under Construction) is **not subject to depreciation** because it isn\'t ' +
        'ready for use yet. A factory building under construction isn\'t delivering benefit. Depreciation ' +
        'only starts once it is transferred to a real asset with {{AIBU}}.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The key to understanding AA\'s accounting logic is this: **the acquisition value never decreases.** ' +
      'The asset account (253) shows the purchase amount; the decrease accumulates in a separate contra ' +
      'account (257). On the balance sheet the two are netted to find {{net-defter-degeri}}.',

    etkilenenHesaplar:[
      { hesap:'253 Plant, machinery and equipment', tur:'Balance sheet — Asset', neden:'Acquisition value. Debited on {{aktiflestirme}}, credited only on **disposal**. Depreciation never touches this account.' },
      { hesap:'257 Accumulated depreciation', tur:'Balance sheet — Contra-asset', neden:'Total depreciation posted to date. Credited every period; zeroed out by a debit on disposal.' },
      { hesap:'770 / 730 Depreciation expense', tur:'Income statement', neden:'The period\'s depreciation. Depending on where the asset is used, it becomes general administrative, production, or marketing expense.' },
      { hesap:'258 Assets under construction', tur:'Balance sheet — Asset', neden:'{{yatirim-devam}}. Costs from different sources **accumulate** here; **no depreciation is posted**; once complete, it\'s transferred to 252/253. Shown on a separate balance-sheet line — the reader can see "this asset isn\'t contributing to production yet."' },
      { hesap:'259 Down payments on investment orders', tur:'Balance sheet — Asset', neden:'Advance paid to the vendor for an investment. Tracked **separately from 258**: an advance isn\'t a cost yet, it\'s a right to a claim.' },
      { hesap:'252 Buildings', tur:'Balance sheet — Asset', neden:'AuC capitalization\'s most common target. Transferred from 258 here with {{AIBU}}, and **depreciation starts on that date**.' },
      { hesap:'679 / 689 Gain/loss on sale of fixed assets', tur:'Income statement', neden:'The difference between the sale proceeds and {{net-defter-degeri}}.' },
      { hesap:'120 Trade receivables / 102 Banks', tur:'Balance sheet — Asset', neden:'The counterparty in an asset sale.' },
    ],

    fisler:[
      { baslik:'Step 1 — Acquisition ({{ABZON}}) · a 600,000 TRY machine',
        belgeTuru:'AA', tarih:'01.03.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Plant, machinery and equipment', borc:600000, not:'{{hareket-turu}} 100 — acquisition' },
          { hesap:'191', ad:'Deductible VAT', borc:120000 },
          { hesap:'320', ad:'Trade payables', alacak:720000 },
        ],
        not:'**No expense was posted.** 600,000 TRY entered the balance sheet as an asset; profit was ' +
             'completely unaffected at this stage. Because the capitalization date is 01.03, depreciation ' +
             'will run starting in March.' },

      { baslik:'Step 2 — Monthly depreciation ({{AFAB}}) · 10-year useful life',
        belgeTuru:'AF', tarih:'31.03.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — depreciation', borc:5000, not:'600,000 / 120 months' },
          { hesap:'257', ad:'Accumulated depreciation', alacak:5000, not:'Contra-asset account' },
        ],
        not:'**Not a cent left the till.** The money was already paid at the start of March. This is the ' +
             'only major expense line that doesn\'t create a cash outflow — it\'s added back to profit in ' +
             'the cash flow statement.\n\n' +
             'Account 253 is still 600,000 TRY. {{net-defter-degeri}} = 600,000 − 5,000 = **595,000 TRY**.' },

      { baslik:'Step 3 — sale after 3 years ({{F-92}}) · book value 420,000, sale price 500,000',
        belgeTuru:'AA', tarih:'31.03.2029', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables', borc:590000, not:'500,000 + 18% VAT' },
          { hesap:'257', ad:'Accumulated depreciation', borc:180000, not:'36 months × 5,000 — **zeroed out**' },
          { hesap:'253', ad:'Plant, machinery and equipment', alacak:600000, not:'The **entire** acquisition value comes off' },
          { hesap:'391', ad:'VAT payable', alacak:90000 },
          { hesap:'679', ad:'Gain on sale of fixed assets', alacak:80000, not:'500,000 − 420,000' },
        ],
        not:'On disposal **both accounts are cleared**: the full acquisition value comes off 253, the full ' +
             'accumulated depreciation comes off 257. The 80,000 TRY difference between the remaining ' +
             '{{net-defter-degeri}} (420,000) and the sale price (500,000) is recorded as a gain. SAP ' +
             'calculates this **automatically**.' },

      { baslik:'Alternative — scrapping ({{ABAVN}}) · disposal with no proceeds',
        belgeTuru:'AA', tarih:'31.03.2029', paraBirimi:'TRY',
        satirlar:[
          { hesap:'257', ad:'Accumulated depreciation', borc:180000 },
          { hesap:'689', ad:'Loss on scrapping of fixed assets', borc:420000, not:'The remaining book value was expensed' },
          { hesap:'253', ad:'Plant, machinery and equipment', alacak:600000 },
        ],
        not:'Since there\'s no proceeds, the entire {{net-defter-degeri}} is recorded as a **loss**. That\'s ' +
             'why a scrapping decision made while the book value is still high has a serious impact on profit.' },

      { baslik:'**Pro-rata depreciation** — a passenger car bought on April 15 · first year',
        belgeTuru:'AF', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Depreciation expense — passenger car (9/12)', borc:180000, not:'240,000 × **9/12**' },
          { hesap:'257', ad:'Accumulated depreciation', alacak:180000 },
        ],
        not:'Vehicle: 1,200,000 TRY · useful life 5 years · normal annual depreciation **240,000 TRY**.\n\n' +
             'Bought on April 15 → **a partial month counts as a full month** → **9 months** including April → ' +
             '240,000 × 9/12 = **180,000 TRY**.\n\n' +
             'The unposted 60,000 TRY (3/12) is **not lost**: it\'s completed as an expense in year 6. So the ' +
             'vehicle spreads over **6 calendar years** instead of 5.\n\n' +
             'A **machine** bought on the same day would have received a full year (240,000 TRY) — ' +
             'pro-rata applies **only** to passenger cars.' },

      { baslik:'**Pro-rata depreciation** — final year · the carryover from the first year is completed',
        belgeTuru:'AF', tarih:'31.12.2032', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Depreciation expense — remaining 3 months', borc:60000, not:'The **3/12** carried over from the first year' },
          { hesap:'257', ad:'Accumulated depreciation', alacak:60000 },
        ],
        not:'In year 6, the remaining **60,000 TRY** from the first year is expensed and the asset is fully ' +
             'written off.\n\n' +
             'Total check: 180,000 + (4 × 240,000) + 60,000 = **1,200,000 TRY** ✓\n\n' +
             '**Total depreciation didn\'t change** — it was only shifted to a different year. Pro-rata ' +
             'depreciation isn\'t a *reduction*, it\'s a *timing* rule.' },

      { baslik:'**Declining balance** — first three years · on net book value',
        belgeTuru:'AF', tarih:'2027–2029', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Year 1 — 600,000 × 40%', borc:240000, not:'Base: acquisition value' },
          { hesap:'770', ad:'Year 2 — 360,000 × 40%', borc:144000, not:'Base: **NBV** 600,000−240,000' },
          { hesap:'770', ad:'Year 3 — 216,000 × 40%', borc:86400, not:'Base: NBV 360,000−144,000' },
          { hesap:'257', ad:'Accumulated depreciation (3-year total)', alacak:470400 },
        ],
        not:'Machine 600,000 TRY · useful life 5 years → normal rate **20%** → declining-balance rate ' +
             '**40%** (2×, under the 50% cap ✓).\n\n' +
             '**The base shrinks every year**, so the amount decreases too: ' +
             '240,000 → 144,000 → 86,400.\n\n' +
             'Under the normal method it would have been 120,000 TRY every year. ' +
             'In the first three years the declining method expensed **110,400 TRY more** → ' +
             'giving **tax deferral**.' },

      { baslik:'**Declining balance** — final year · the whole remaining balance is posted',
        belgeTuru:'AF', tarih:'31.12.2031', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Year 5 — **the entirety** of the remaining NBV', borc:77760, not:'Not 40% — **the whole remainder**' },
          { hesap:'257', ad:'Accumulated depreciation', alacak:77760 },
        ],
        not:'The net book value remaining at the end of year 4: 129,600 − 51,840 = **77,760 TRY**.\n\n' +
             '**In the final year, 40% is not applied — the entire remaining balance is posted.** ' +
             'Otherwise, since 40% of the remainder would be taken every year, the asset would ' +
             '**mathematically never reach zero**.\n\n' +
             'In SAP, this behavior is achieved through the **"zero out the remaining value at end of ' +
             'life"** setting in the {{AFAMR}} base method — if this setting is forgotten, the asset sits ' +
             'with a small balance on the books forever.\n\n' +
             'Total check: 240,000 + 144,000 + 86,400 + 51,840 + 77,760 = **600,000 TRY** ✓' },

      { baslik:'AuC step 1 — an investment advance is paid · **259, not 258**',
        belgeTuru:'KZ', tarih:'10.02.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'259', ad:'Down payments on investment orders', borc:600000, not:'Not yet a **cost**' },
          { hesap:'102', ad:'Banks', alacak:600000 },
        ],
        not:'A 20% advance was paid to the construction company but **no work has been done yet**.\n\n' +
             'This amount isn\'t posted to 258: 258 shows *cost already incurred*, 259 shows *the right to ' +
             'receive goods/services in the future*. Mixing the two overstates the investment\'s cost.\n\n' +
             'As progress invoices come in, the advance is offset and the cost moves to 258.' },

      { baslik:'AuC step 2 — a progress invoice · cost starts accumulating in 258',
        belgeTuru:'KR', tarih:'15.05.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'258', ad:'Assets under construction — AuC 4000012', borc:1200000, not:'**No** depreciation' },
          { hesap:'191', ad:'Deductible VAT', borc:240000 },
          { hesap:'320', ad:'Trade payables (construction company)', alacak:1440000 },
        ],
        not:'The building is under construction; because it isn\'t delivering benefit yet, it isn\'t ' +
             'subject to depreciation. Costs accumulate on the AuC asset ({{ANLA}}) and in account 258.\n\n' +
             'The posting is an ordinary vendor invoice — the only difference is that the offsetting line ' +
             'goes to the **AuC asset number**. The system finds account 258 through {{AO90}} account ' +
             'determination via {{varlik-sinifi}}.' },

      { baslik:'AuC step 3 — cost accumulates from **three separate sources**',
        belgeTuru:'Various', tarih:'June–September 2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'258', ad:'Vendor invoices (construction, installation)', borc:1900000, not:'{{MIRO}} / {{F-90}}' },
          { hesap:'258', ad:'Material issued from the warehouse', borc:280000, not:'MM movement type **241**' },
          { hesap:'258', ad:'Internal labor (own crew)', borc:120000, not:'CO activity allocation' },
          { hesap:'320', ad:'Trade payables', alacak:1900000 },
          { hesap:'153', ad:'Merchandise inventory (stock decreased)', alacak:280000 },
          { hesap:'770', ad:'Labor expense (allocated from CO)', alacak:120000 },
        ],
        not:'**AuC\'s most valuable feature shows up right here:** costs from three different modules (an ' +
             'FI invoice, an MM material issue, a CO labor allocation) are gathered **into a single object**.\n\n' +
             'The internal-labor line matters in particular: the effort our own crew spent on this ' +
             'investment doesn\'t stay as an expense, it\'s **added to the asset\'s cost**. Otherwise the ' +
             'asset would look cheaper than it is, and that period\'s expense would look higher than it is.\n\n' +
             'Total AuC balance: 1,200,000 + 2,300,000 = **3,500,000 TRY**.' },

      { baslik:'AuC step 4 — capitalization ({{AIBU}}) · construction is finished',
        belgeTuru:'AA', tarih:'01.10.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'252', ad:'Buildings — asset 1200034', borc:3500000, not:'{{hareket-turu}} **336** — AuC transfer' },
          { hesap:'258', ad:'Assets under construction — AuC 4000012', alacak:3500000, not:'AuC **emptied out**' },
        ],
        not:'The building is now ready for use. **Depreciation starts from this date.**\n\n' +
             'Note: **the balance sheet total didn\'t change.** The asset moved from one line to another; ' +
             'no gain, no loss arose. Capitalization is a **reclassification**, not a gain event.\n\n' +
             'Critical field: the capitalization date (01.10.2026). **This date** — not the invoice dates — ' +
             'determines when depreciation begins.' },

      { baslik:'AuC step 5 — **line-item settlement**: one AuC, three different assets',
        belgeTuru:'AA', tarih:'01.10.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'252', ad:'Buildings (50-year depreciation)', borc:2600000, not:'Construction cost' },
          { hesap:'253', ad:'Plant, machinery and equipment (10 years)', borc:700000, not:'Production line' },
          { hesap:'255', ad:'Fixtures and fittings (5 years)', borc:200000, not:'Office equipment' },
          { hesap:'258', ad:'Assets under construction', alacak:3500000 },
        ],
        not:'**Why does it need to be split?** The three assets have different {{faydali-omur}} periods: ' +
             'the building 50 years, the machine 10 years, the fixtures 5 years.\n\n' +
             'If all of it were transferred into a single "building" asset, the 900,000 TRY of machinery and ' +
             'fixtures would be **spread over 50 years**, and depreciation expense would be understated for ' +
             'years.\n\n' +
             'This split is made in the **settlement rule** defined with {{AIAB}}: it determines which cost ' +
             'item goes to which target asset. That\'s why the AuC asset class needs to be set to **line-item ' +
             'settlement**.' },

      { baslik:'AuC step 6 — **partial capitalization**: one section is put into use',
        belgeTuru:'AA', tarih:'01.08.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Plant, machinery and equipment — production line 1', borc:1400000, not:'Put into use' },
          { hesap:'258', ad:'Assets under construction', alacak:1400000, not:'The remaining **2,100,000** stays in AuC' },
        ],
        not:'The factory\'s first production line went into operation in August; the second is still under ' +
             'construction.\n\n' +
             '**Partial capitalization** is performed: the part put into use is transferred to 253 and its ' +
             'depreciation **starts in August**; the rest waits in AuC.\n\n' +
             'If this isn\'t done, the running line produces for months without any depreciation being ' +
             'posted — costs are understated and profit looks higher than it is.\n\n' +
             '**This is the most commonly skipped step in practice:** people wait for the project to be ' +
             '"completely finished," and the accounting consequence of partial go-live gets overlooked.' },
    ],

    tHesaplar:[
      { hesap:'Plant, machinery and equipment', kod:'253 (Asset)',
        borc:[{ ad:'Acquisition (ABZON)', tutar:600000 }],
        alacak:[{ ad:'Disposal on sale', tutar:600000 }],
        not:'Acquisition value; depreciation never affects this account' },
      { hesap:'Accumulated depreciation', kod:'257 (Contra-asset)',
        borc:[{ ad:'Zeroed out on disposal', tutar:180000 }],
        alacak:[{ ad:'36 months × 5,000', tutar:180000 }],
        not:'Reduces the asset on the balance sheet' },
      { hesap:'Depreciation expense', kod:'770 (Expense)',
        borc:[{ ad:'Monthly depreciation', tutar:180000 }],
        alacak:[],
        not:'Zeroed out at the end of every year' },
      { hesap:'Assets under construction', kod:'258 (Asset)',
        borc:[{ ad:'Construction costs', tutar:3500000 }],
        alacak:[{ ad:'Capitalized via AIBU', tutar:3500000 }],
        not:'Emptied out once complete' },
    ],

    notlar:[
      { tip:'warn', baslik:'Why isn\'t the acquisition value reduced?', metin:
        'The asset\'s **original cost** must be preserved as information. If depreciation were deducted ' +
        'from account 253, the question "what was this machine originally bought for?" couldn\'t be ' +
        'answered — and it would cause problems in insurance and tax audits.\n\n' +
        'That\'s why the decrease accumulates in a separate **contra account** (257). On the balance sheet ' +
        'it\'s shown net: "253 Machinery 600,000 / 257 Accumulated depreciation (−180,000) = 420,000."' },
      { tip:'tip', baslik:'Which account does depreciation expense go to?', metin:
        'It depends on **where the asset is used**: a production machine goes to 730 production expense, a ' +
        'sales vehicle to 760 marketing expense, an office computer to 770 general administrative expense.\n\n' +
        'SAP resolves this through {{AO90}} account determination and the asset\'s {{maliyet-yeri}} ' +
        'assignment. That\'s why the cost center must be entered correctly in the asset master — if it\'s ' +
        'wrong, the expense lands in the wrong department.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'In AA, variation happens along three axes, and the list below is grouped into these three:\n\n' +
      '**Asset transactions** — what happens to the asset? *(acquisition, transfer, disposal, AuC)*\n' +
      '**Calculation methods** — how is the amount determined? *(straight-line, declining, SYD, units of ' +
      'production, residual value)*\n' +
      '**Turkish tax-law (VUK) applications** — the law\'s special rules *(pro-rata, extraordinary, ' +
      'leasehold improvement…)*\n\n' +
      '---\n\n' +
      '### Calculation methods — same asset, five results\n\n' +
      'The fastest way to understand the methods is to **calculate the same asset five times**.\n\n' +
      '**Asset:** 600,000 TRY · useful life **5 years**\n\n' +
      '**① Straight-line** — `Amount ÷ Useful life`\n' +
      '120,000 → 120,000 → 120,000 → 120,000 → 120,000\n\n' +
      '**② Declining balance (40%)** — `NBV × (normal rate × 2)`\n' +
      '240,000 → 144,000 → 86,400 → 51,840 → **77,760** *(the entire remainder in the final year)*\n\n' +
      '**③ Sum-of-the-years\' digits** — `Amount × (remaining life ÷ 15)`\n' +
      '200,000 → 160,000 → 120,000 → 80,000 → 40,000\n\n' +
      '**④ Units of production** — `(Amount ÷ total output) × period output`\n' +
      '160,000 → 140,000 → 120,000 → 100,000 → 80,000 *(2 TRY/unit)*\n\n' +
      '**⑤ With residual value** — `(Amount − residual) ÷ useful life`\n' +
      '100,000 → 100,000 → 100,000 → 100,000 → 100,000 *(residual value 100,000)*\n\n' +
      '**The one thing to understand:** for ①②③④, **total depreciation is the same — 600,000 TRY**. Only ' +
      'which year gets how much changes. So choosing a method is a *tax deferral* decision, not a *tax ' +
      'reduction* one.\n\n' +
      '⑤ is the exception: because the depreciable amount itself is smaller, the total comes to **500,000 ' +
      'TRY** and the asset keeps sitting on the books at 100,000 TRY.\n\n' +
      '**Where is each used in Turkey?** ①② are in the tax domain (VUK) · ③④⑤ are only in the IFRS domain. ' +
      'The same asset being valued with different methods in the two domains is the most concrete reason ' +
      '{{paralel-defter}} exists.',

    liste:[
      { ad:'Acquisition',
        aciklama:'The asset entering the records. There are three ways: **{{ABZON}}** (offsetting account ' +
                 'automatic, no vendor), **{{F-90}}** (directly to a vendor account), **through MM** (order → ' +
                 'goods receipt → invoice).',
        neZaman:'{{ABZON}} for simple purchases; {{F-90}} when the vendor invoice will be entered directly; ' +
                'the MM route for investments tracked through a purchase order.',
        ornek:'{{hareket-turu}} **100** — external acquisition. Posting: 253 debit / 320 credit.',
        tcodes:['ABZON','F-90','MIGO','MIRO'] },

      { ad:'Scrapping — ABAVN',
        aciklama:'A disposal with no proceeds. The entire {{net-defter-degeri}} is recorded as a **loss**.',
        neZaman:'When the asset becomes unusable, is destroyed, or is stolen.',
        ornek:'{{hareket-turu}} **200/250**. A book value of 420,000 means a 420,000 TRY loss.',
        tcodes:['ABAVN'] },

      { ad:'Retirement with Revenue — F-92 / ABAON',
        aciklama:'A disposal with proceeds. The sale proceeds are compared against {{net-defter-degeri}}; ' +
                 'the difference becomes a gain or loss.',
        neZaman:'When the asset is sold to a third party.',
        ornek:'Book value 420,000, sale price 500,000 → **80,000 TRY gain** (account 679).',
        tcodes:['F-92','ABAON'] },

      { ad:'AuC — Summary Settlement',
        aciklama:'The entire AuC cost is transferred to **a single target asset**. Line items aren\'t ' +
                 'tracked separately, the total is moved.',
        neZaman:'When the investment produces a single asset: one building, one machine, one vehicle.',
        ornek:'An AuC balance of 3,500,000 TRY → all of it to 252 Buildings. Simple, the settlement rule is ' +
              'one line. **This is the default choice.**',
        tcodes:['AIBU','ABUMN'] },

      { ad:'AuC — Line Item Settlement',
        aciklama:'AuC cost is transferred **split across multiple target assets**. Each cost item is ' +
                 'tracked separately and goes to its own target.',
        neZaman:'When the investment produces assets with **different useful lives**: building + machine + ' +
                'fixtures all coming out of the same project.',
        ornek:'3,500,000 TRY → 2,600,000 building (50 years) + 700,000 machine (10 years) + ' +
              '200,000 fixtures (5 years). The rule is defined with {{AIAB}}.\n\n' +
              '**Must be selected up front in the asset class** — it can\'t be changed afterward.',
        tcodes:['AIAB','AIBU'] },

      { ad:'Partial Capitalization',
        aciklama:'The **portion of the investment put into service** is capitalized; the rest waits in AuC.',
        neZaman:'In projects put into service in stages: the factory\'s first line is running while the ' +
                'second is still under construction.',
        ornek:'1,400,000 TRY of a 3,500,000 TRY AuC is capitalized; depreciation starts **only for that ' +
              'portion**. The remaining 2,100,000 TRY waits in AuC without depreciation.\n\n' +
              '**The most commonly skipped step** — people wait for the project to be "completely finished."',
        tcodes:['AIBU'] },

      { ad:'Down Payment on Investment',
        aciklama:'An advance paid to the vendor for an investment; tracked in account **259**, not 258.',
        neZaman:'When the contract calls for advance payment.',
        ornek:'A 600,000 TRY advance → 259 debit. As progress invoices come in it\'s offset and the cost ' +
              'moves to 258.\n\n' +
              '**The distinction matters:** the advance is a *right to a claim*, 258 is *cost already ' +
              'incurred*. Mixing the two overstates the investment.',
        tcodes:['F-48','F-54'] },

      { ad:'Transfer — ABUMN',
        aciklama:'Moving an asset to another asset, class, or company code. The most common use is ' +
                 'converting a {{yatirim-devam}} into a real asset.',
        neZaman:'On AuC capitalization, class correction, intercompany transfer.',
        ornek:'{{hareket-turu}} **300/336**. 258 credit / 252 debit.',
        tcodes:['ABUMN','AIBU','AIAB'] },

      { ad:'Straight-line — VUK md. 315',
        aciklama:'The acquisition value is divided **equally** over {{faydali-omur}}. Same amount every ' +
                 'period. Rate = 1 / useful life.',
        neZaman:'**VUK\'s default method.** Usable for any asset whose benefit spreads evenly over time; ' +
                'also the only option for taxpayers who can\'t apply declining balance.',
        ornek:'600,000 TRY / 10 years = **60,000 TRY** per year.\n\n' +
              '**No pro-rata applies:** even if the asset is bought on December 28, the **full year\'s** ' +
              'depreciation can be posted for that year (except passenger cars). Useful lives are set by ' +
              'the Ministry of Finance\'s list (VUK General Communiqué no. 333).',
        tcodes:['AFAMA','AFAMR'] },

      { ad:'Declining Balance — VUK mük. md. 315',
        aciklama:'Depreciation is calculated with a fixed rate **on {{net-defter-degeri}}, not on the ' +
                 'acquisition value**. Because the base shrinks, the amount decreases every year.',
        neZaman:'For assets whose benefit is concentrated in the early years; for **tax deferral** ' +
                'purposes. Only taxpayers keeping books **on a balance-sheet basis** can apply it.',
        ornek:'Rate = **2×** the normal rate, capped at **50%**.\n\n' +
              '600,000 × 20% = 120,000 (year 1) → 480,000 × 20% = 96,000 (year 2) → …\n\n' +
              '**In the final year the entire remaining net book value** is posted — otherwise the asset ' +
              'would never reach zero. **You can switch from declining to straight-line, not the other way ' +
              'around.**',
        tcodes:['AFAMD','AFAMS'] },

      { ad:'Pro-rata — VUK md. 320/2',
        aciklama:'For the year the asset is put into service, depreciation is posted **not for the full ' +
                 'year but for the months it was actually used**. In VUK this is the **exception, not the ' +
                 'rule**.',
        neZaman:'**Passenger cars only.** Pro-rata does not apply to any other asset.',
        ornek:'A passenger car bought on April 15 → **a partial month counts as a full month** → **9 ' +
              'months** including April → **9/12** of the annual depreciation.\n\n' +
              'The 3/12 not posted in year 1 **isn\'t lost**: it\'s completed as an expense in the ' +
              '**final year** of the useful life.\n\n' +
              '**Exception to the exception:** businesses whose activity is **renting or operating** ' +
              'passenger cars (car rental, driving schools) don\'t apply pro-rata.',
        tcodes:['AFAMP'] },

      { ad:'Sum-of-the-Years\' Digits — IFRS',
        aciklama:'An accelerated method calculated on a fixed base with **a rate that decreases every ' +
                 'year**.',
        neZaman:'In IFRS reporting; for assets where benefit is front-loaded but declining balance would ' +
                'be too aggressive.',
        ornek:'`Amount × (Remaining life ÷ Sum of the years\' digits)`\n\n' +
              '5 years → denominator 15 → 200,000 / 160,000 / 120,000 / 80,000 / 40,000\n\n' +
              '**Difference from declining balance:** the base is **fixed**, the rate changes → no special ' +
              'rule is needed for the final year.\n\n' +
              '**Not in VUK** — in Turkey it exists only in the IFRS {{amortisman-alani}}.' },

      { ad:'Units of Production — IFRS',
        aciklama:'Depreciation is calculated based on **actual output, not the passage of time**.',
        neZaman:'Presses, dies, mining equipment — assets that don\'t wear when idle.',
        ornek:'`Unit rate = Amount ÷ total estimated output` → `Period amount = Unit rate × that period\'s ' +
              'output`\n\n' +
              '600,000 ÷ 300,000 units = **2 TRY/unit**. 80,000 units a year → **160,000 TRY**.\n\n' +
              '**The catch:** actual output has to be entered into the system every period.\n\n' +
              'Not a general VUK method; a similar logic exists for mining (art. 316).' },

      { ad:'Residual Value — IFRS (IAS 16)',
        aciklama:'The expected sale value at the end of the useful life is **deducted** from the ' +
                 'depreciable amount.',
        neZaman:'In IFRS reporting; for assets like vehicles and heavy equipment with meaningful ' +
                'second-hand value.',
        ornek:'`Depreciable amount = Acquisition value − residual value`\n\n' +
              '(600,000 − 100,000) ÷ 5 = **100,000/year**. After 5 years {{net-defter-degeri}} is **not ' +
              'zero, but 100,000 TRY**.\n\n' +
              '**VUK has no concept of residual value** — the asset is fully written off to zero. Under ' +
              'IFRS it is **reviewed every period**.\n\n' +
              'This difference is one of the most concrete examples of why {{paralel-defter}} is needed.' },

      { ad:'Extraordinary — VUK md. 317',
        aciklama:'Depreciation above the normal rate in cases of abnormal value loss.',
        neZaman:'Three cases: **disaster** (fire, earthquake, flood), reduced technical efficiency due to ' +
                '**new inventions**, excessive wear from **forced operation**.',
        ornek:'The rate isn\'t free — it\'s set **separately for each business** by the Ministry of Finance ' +
              'and **requires an application**. It can\'t be applied on one\'s own.\n\n' +
              'In SAP it\'s entered as a special depreciation type via {{ABMA}}.',
        tcodes:['ABMA'] },

      { ad:'Depletion — VUK md. 316',
        aciklama:'Amortization of mines and quarries, and of concession or cost value, **based on the ' +
                 'operating period**.',
        neZaman:'In mining activities.',
        ornek:'Rates are set by the **Ministries of Finance and Industry**. Because it depends on how fast ' +
              'the reserve is depleted, a standard useful-life list isn\'t used.' },

      { ad:'Leasehold Improvements — VUK md. 327',
        aciklama:'Amortization of improvements made to a leased property that don\'t belong to the lessee.',
        neZaman:'A leased store/office fit-out, a suspended ceiling, air-conditioning installation.',
        ornek:'Amortized in **equal percentages over the lease term** — not based on the asset\'s own ' +
              'useful life.\n\n' +
              '• Lease term 5 years → amortized over 5 years\n' +
              '• **If the term isn\'t set → 5 years**\n' +
              '• If vacated before the term ends, the **unamortized portion is expensed that year**' },

      { ad:'Low Value Assets — VUK md. 313',
        aciklama:'Tools, equipment, furnishings, and goodwill items below a set threshold can be ' +
                 '**expensed directly**.',
        neZaman:'For low-value items in large numbers — when the cost of tracking them exceeds the ' +
                'accuracy it provides.',
        ornek:'The threshold is **updated every year with the revaluation rate**; check the relevant VUK ' +
              'general communiqué for the current amount.\n\n' +
              'Managed in SAP with a separate {{varlik-sinifi}} (LVA) and a key (similar to `GWG`) that ' +
              'posts **100% immediate depreciation**.',
        tcodes:['AFAMA'] },

      { ad:'Non-depreciable Assets — VUK md. 314',
        aciklama:'Assets not subject to depreciation because they don\'t wear out.',
        neZaman:'**Vacant land and plots.** Also {{yatirim-devam}} (not yet ready for use).',
        ornek:'Land is **never** subject to depreciation; a building on it is a separate asset and is ' +
              'subject to depreciation. *(Exception: facilities such as orchards and mulberry groves built ' +
              'on agricultural operations are depreciable.)*\n\n' +
              'In SAP this is achieved by assigning depreciation key **0000**.' },

      { ad:'Renewal Fund — VUK md. 328–329',
        aciklama:'Deferring taxation of the profit on a sold asset for the purpose of **renewing** it.',
        neZaman:'When renewal is mandatory or has been decided and initiated.',
        ornek:'The sale profit is held on the liabilities side (account 549 Special funds) for **at most 3 ' +
              'years**, and **offset against the new asset\'s depreciation**. If unused after three years ' +
              'it\'s added to the third year\'s tax base.\n\n' +
              '**It\'s tax deferral, not a deduction.** Not a standard AA function in SAP; tracked with a ' +
              'manual G/L posting.' },

      { ad:'Unplanned Depreciation — ABAA',
        aciklama:'Depreciation recorded manually, outside the planned schedule, due to impairment.',
        neZaman:'Damage, technological obsolescence, a permanent drop in market value.',
        ornek:'A machine damaged in a fire has its value reduced by 200,000 TRY.',
        tcodes:['ABAA'] },

      { ad:'Depreciation Area',
        aciklama:'The same asset being valued differently for different purposes. Each area has its own ' +
                 '{{amortisman-anahtari}} and {{faydali-omur}}.',
        neZaman:'When commercial accounting, tax law, IFRS, and group reporting are all needed at once — ' +
                'that is, in almost every corporate company.',
        ornek:'Area 01 commercial (10 years, normal) · Area 15 tax (8 years, declining) · Area 32 IFRS ' +
              '(component-based).',
        tcodes:['OADB','AW01N'] },
    ],

    karsilastirmaBasliklar:['Normal (straight-line)', 'Declining balance'],
    karsilastirma:[
      ['VUK basis', 'md. 315', 'mükerrer md. 315'],
      ['Calculation base', 'Acquisition value (**fixed**)', '{{net-defter-degeri}} (**shrinking**)'],
      ['Rate', '1 / useful life', 'Normal rate **× 2**, capped at 50%'],
      ['Period amount', '**Same** every period', 'High in the early years, then falls'],
      ['Year 1 (600,000, 5 years)', '120,000 TRY (20%)', '**240,000 TRY** (40%)'],
      ['Year 5 (final)', '120,000 TRY', '**The entire remaining balance** — 77,760 TRY'],
      ['Who can apply it', 'Everyone', 'Only those keeping books **on a balance-sheet basis**'],
      ['Switching methods', '**Can\'t switch** to declining', '**Can switch** to normal'],
      ['Tax effect', 'Tax spreads evenly', 'Early years **less tax** — a cash advantage'],
      ['In SAP', '{{AFAMR}} base method', '{{AFAMD}} + final-year zero-out setting'],
    ],
  },

  /* ===================================================== 5. TCODES === */
  tcodes: {
    liste:[
      { kod:'AS01', ad:'Create fixed asset',
        amac:'Opens a new asset master record based on {{varlik-sinifi}}.',
        neZaman:'For every purchase to be capitalized — **before the acquisition posting**.',
        adimlar:[
          { baslik:'Enter the asset class and company code',
            aciklama:'As soon as the class is selected, account determination, the number range, and ' +
                     'default depreciation settings come in automatically. **Wrong class = wrong account = ' +
                     'hard to fix later.**' },
          { baslik:'*General* tab',
            aciklama:'Description (the asset\'s name), quantity, inventory number, serial number.' },
          { baslik:'*Time-dependent* tab',
            aciklama:'{{maliyet-yeri}}, plant, person responsible. These fields can change over time and ' +
                     'are stored with validity dates in table {{ANLZ}}.' },
          { baslik:'*Depreciation areas* tab',
            aciklama:'{{amortisman-anahtari}} and {{faydali-omur}} are set separately for each ' +
                     '{{amortisman-alani}}. Differences like commercial 10 years vs. tax 8 years are ' +
                     'defined here.' },
          { baslik:'Save',
            aciklama:'An asset number is assigned. **Its value is still zero** — the acquisition is a ' +
                     'separate transaction.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Asset class 3000 (Machinery and plant) · Company code 1000' },
          { ekran:'General', islem:'Description: Weaving machine Model X · Inventory no: MAK-2026-018' },
          { ekran:'Time-dependent', islem:'Cost center 3100 (Production) · Plant 1000' },
          { ekran:'Depreciation areas', islem:'Area 01: key LINR, life 10 years · Area 15: key DEGR, life 8 years' },
        ],
        alanlar:{
          zorunlu:['Asset class','Company code','Description','Depreciation key','Useful life'],
          opsiyonel:['Inventory number','Serial number','Cost center','Plant','Person responsible','Quantity'] },
        hatalar:[
          { mesaj:'Account determination ... for asset class not maintained', sebep:'Account determination is missing for the asset class in {{AO90}}.', cozum:'Define the balance sheet, accumulated depreciation, depreciation expense, and sale gain/loss accounts with {{AO90}}.' },
          { mesaj:'Depreciation key ... does not allow useful life of 0', sebep:'No useful life has been entered.', cozum:'Enter the life on the depreciation-areas tab; it comes in automatically if a default is defined on the asset class.' },
          { mesaj:'Asset class ... is not defined for chart of depreciation ...', sebep:'The class isn\'t defined for the company code\'s {{degerleme-plani}}.', cozum:'Link the class to the relevant chart of depreciation with {{OAOA}}.' },
        ],
        ipucu:'**Copy a similar asset as a template** (enter a reference asset number on the entry screen). ' +
              'You won\'t have to rethink the depreciation settings, and it keeps things consistent.',
        ilgili:['AS02','AS03','AS11','ABZON','AW01N','OAOA'] },

      { kod:'AW01N', ad:'Asset Explorer — AA\'s control panel',
        amac:'Shows an asset\'s entire life on a single screen: value areas, planned/posted depreciation, ' +
             'all transactions, and the linked FI documents.',
        neZaman:'For every question about an asset. Diagnosis in AA starts here.',
        adimlar:[
          { baslik:'Enter the asset number and company code' },
          { baslik:'Choose {{amortisman-alani}} on the left',
            aciklama:'Area 01 commercial, area 15 tax… Each area shows **different** values. Looking at ' +
                     'the wrong area and saying "the values don\'t match" is a classic mistake.' },
          { baslik:'*Planned values* tab',
            aciklama:'Acquisition value, accumulated depreciation, {{net-defter-degeri}}, and the year\'s ' +
                     'planned depreciation.' },
          { baslik:'*Posted values* tab',
            aciklama:'Depreciation actually posted, period by period. Compared against the planned figures.' },
          { baslik:'*Comparisons* tab',
            aciklama:'How the value develops year over year — how the asset\'s value erodes over its life.' },
          { baslik:'Double-click a transaction line → drill into the FI document' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Asset 100018-0 · Company code 1000 · Fiscal year 2026' },
          { ekran:'Planned values (area 01)', islem:'Acquisition 600,000 · Accumulated 50,000 · NBV 550,000' },
          { ekran:'Area 15 selected', islem:'Same asset, tax area: Accumulated 75,000 · NBV 525,000' },
          { ekran:'Transactions', islem:'100 Acquisition 01.03.2026 · document 3000000123' },
        ],
        ipucu:'The answer to "why is this asset\'s depreciation this amount?" is found here in three steps: ' +
              '**(1)** am I in the right area, **(2)** what is the depreciation key, **(3)** are the useful ' +
              'life and capitalization date correct.',
        hatalar:[
          { mesaj:'Asset ... does not exist in company code ...', sebep:'The asset is in a different company code, or the number is wrong.', cozum:'Search the asset list with {{AR01}}.' },
        ],
        ilgili:['AS03','AR01','AR02','AFAB'] },

      { kod:'ABZON', ad:'Fixed asset acquisition (automatic offsetting account)',
        amac:'Records an asset purchase with an automatically determined offsetting account, without a vendor invoice.',
        neZaman:'For simple purchases; when the vendor invoice will be handled separately in AP; for opening balances during data migration.',
        adimlar:[
          { baslik:'Enter the asset number and document dates' },
          { baslik:'Choose {{hareket-turu}} (usually 100 — external acquisition)',
            aciklama:'The transaction type determines which value areas are affected and which accounts ' +
                     'are triggered.' },
          { baslik:'Enter the amount and the **capitalization date**',
            aciklama:'The capitalization date determines **when depreciation begins**. If it\'s backdated, ' +
                     'the system also calculates depreciation for past periods.' },
          { baslik:'Simulate and post' },
        ],
        alanlar:{
          zorunlu:['Asset number','Document date','Posting date','Transaction type','Amount'],
          opsiyonel:['Capitalization date','Text','Reference','Quantity'] },
        hatalar:[
          { mesaj:'Posting period ... is not open for account type A', sebep:'The period is closed for asset account type (A).', cozum:'Open the period on the **A** line in {{OB52}}.' },
          { mesaj:'Asset ... is blocked for acquisition', sebep:'The asset is blocked with {{AS05}}.', cozum:'Remove the block or choose the correct asset.' },
          { mesaj:'Depreciation area 15 must be posted to G/L', sebep:'Depreciation area configuration is inconsistent.', cozum:'Check the area\'s ledger-posting setting with {{OADB}}.' },
          { mesaj:'Fiscal year ... is already closed for asset accounting', sebep:'The year has been closed with {{AJAB}}.', cozum:'Postings can\'t be made to a closed year; post to the current year, or reopen the year (carefully — it has audit implications).' },
        ],
        ipucu:'Don\'t confuse the capitalization date with the posting date. The posting date decides the ' +
              'accounting period; **the capitalization date decides when depreciation starts**. If a ' +
              'machine was bought in March but entered in April, the capitalization date should still be March.',
        ilgili:['F-90','AS01','AW01N','AFAB'] },

      { kod:'AFAMA', ad:'Depreciation key — the answer package to SAP\'s five questions',
        amac:'Telling an asset "post depreciation" isn\'t enough. SAP wants to know **five things**. ' +
             'The depreciation key is these five answers, packaged together.',
        neZaman:'During configuration; whenever a new depreciation behavior is needed (e.g. pro-rata for passenger cars).',
        adimlar:[
          { baslik:'1⃣ "What logic should I calculate with?"',
            aciklama:'Straight-line or declining balance? Should I give the rate, or should it be ' +
                     'calculated from {{faydali-omur}}? **What happens when the useful life ends** — does ' +
                     'it stop, or does it zero out the remainder?\n\n' +
                     'The answer is written into the **base method** ({{AFAMR}}).' },
          { baslik:'2⃣ "If it\'s declining balance, how fast?"',
            aciklama:'What should the multiplier be (**2** under VUK)? Is there a cap (**50%** under VUK)? ' +
                     'Is there a floor?\n\n' +
                     'The answer is written into the **declining-balance method** ({{AFAMD}}). For ' +
                     'straight-line keys this step is **left blank**.' },
          { baslik:'3⃣ "Will the rate change over time?"',
            aciklama:'Is there a schedule like *"40% for the first 4 years, then 25%"*? The **switch from ' +
                     'declining to normal** under VUK is defined here.\n\n' +
                     'The answer is written into the **multi-level method** ({{AFAMS}}). Left blank if not needed.' },
          { baslik:'4⃣ "When should it start, when should it end?" — **the most critical step**',
            aciklama:'If the asset was bought in April, should depreciation start **in January** or **in ' +
                     'April**? Should the last month count on disposal?\n\n' +
                     'The answer is written into the **period control method** ({{AFAMP}}). **This is ' +
                     'exactly where {{kist-amortisman}} lives.**' },
          { baslik:'5⃣ "Is there a cap amount?"',
            aciklama:'Should annual depreciation be prevented from exceeding a certain amount? Rarely ' +
                     'used; **blank** in most keys.' },
          { baslik:'The five answers are combined and the key gets a code',
            aciklama:'For example `Z_GENEL` or `Z_BINEK`. Once this code is assigned to an asset, the ' +
                     'system knows **exactly** how to calculate depreciation.' },
        ],
        ekranAkisi:[
          { ekran:'**Example: `Z_GENEL`**', islem:'Straight-line, full-year depreciation for general assets' },
          { ekran:'1 · Base method', islem:'Straight-line · calculate **from useful life** · **stop** when the life ends' },
          { ekran:'2 · Declining balance', islem:'*(blank — straight-line key)*' },
          { ekran:'3 · Multi-level', islem:'*(blank — rate is fixed)*' },
          { ekran:'4 · **Period control**', islem:'Acquisition: **from the start of the year** → full year' },
          { ekran:'5 · Maximum amount', islem:'*(blank)*' },
          { ekran:'— — —', islem:'— — —' },
          { ekran:'**Example: `Z_BINEK`**', islem:'Straight-line, **pro-rata** depreciation for passenger cars' },
          { ekran:'1 · Base method', islem:'Straight-line · from useful life · stop when the life ends — **same as Z_GENEL**' },
          { ekran:'2 · Declining balance', islem:'*(blank)* — **same**' },
          { ekran:'3 · Multi-level', islem:'*(blank)* — **same**' },
          { ekran:'4 · **Period control**', islem:'Acquisition: **prorated from the acquisition month** → **THE ONLY DIFFERENCE**' },
          { ekran:'5 · Maximum amount', islem:'*(blank)* — **same**' },
        ],
        alanlar:{
          zorunlu:['Key code','Base method','Period control method'],
          opsiyonel:['Declining-balance method','Multi-level method','Maximum-amount method'] },
        hatalar:[
          { mesaj:'Asset is not posting any depreciation', sebep:'Key is **0000** (no depreciation), or was copied from an {{yatirim-devam}} class.', cozum:'Check the asset\'s key with {{AW01N}}.' },
          { mesaj:'Asset is not zeroing out at the end of its life, a small balance remains', sebep:'The base method is missing the **"zero out the remainder at end of life"** setting — typical for declining balance.', cozum:'Fix the end-of-life behavior in the {{AFAMR}} base method.' },
          { mesaj:'A passenger car is receiving full-year depreciation', sebep:'The general key was used; the period control is full-year.', cozum:'Define a separate key with pro-rata period control and assign it to vehicles.' },
        ],
        ipucu:'**The easiest way to understand a key is to put two of them side by side.**\n\n' +
              '`Z_GENEL` and `Z_BINEK` above are identical in **four of the five slots**; only period ' +
              'control differs. Both are straight-line, both calculate from useful life, both stop when ' +
              'the life ends.\n\n' +
              'This is exactly why the key is split into five parts: **so you can share the common parts ' +
              'and change only the one that\'s different.** If it were one single piece, you\'d have to ' +
              'write a key from scratch for every asset type.\n\n' +
              '**Don\'t change the parameters of a key that\'s already in use.** ' +
              'All assets carrying that key will have their future depreciation change. ' +
              'If a change is needed, open a **new key** and assign it to the assets.',
        ilgili:['AFAMR','AFAMD','AFAMS','AFAMP','AW01N'] },

      { kod:'AFAB', ad:'Run depreciation',
        amac:'Calculates the period\'s planned depreciation and posts it to FI.',
        neZaman:'Every month-end, before period close. AA\'s most critical batch job.',
        adimlar:[
          { baslik:'Enter the company code, fiscal year, and period' },
          { baslik:'Choose the run reason',
            aciklama:'**Planned run** (normal monthly), **repeat** (rerun the same period), **restricted** ' +
                     '(selected assets only), **restart** (resume an interrupted run).' },
          { baslik:'**Run in test mode first**',
            aciklama:'Shows how much depreciation each asset will get without posting it. This step must ' +
                     'never be skipped — the real run can\'t be undone.' },
          { baslik:'Review the result',
            aciklama:'For unexpected amounts, drill into that asset with {{AW01N}}: check the depreciation ' +
                     'key, useful life, and capitalization date.' },
          { baslik:'Run in production mode in the background',
            aciklama:'Running in the foreground with many assets times out; it\'s scheduled as a ' +
                     '**background job**.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Company code 1000 · Fiscal year 2026 · Period 03 · **Test ✓**' },
          { ekran:'Test result', islem:'1,847 assets · total depreciation 284,500 TRY' },
          { ekran:'Production run', islem:'Run in the background → document 1000004521 (AF)' },
        ],
        alanlar:{
          zorunlu:['Company code','Fiscal year','Posting period','Run reason'],
          opsiyonel:['Asset range','Test mode','List detail level'] },
        hatalar:[
          { mesaj:'Depreciation already posted for period 03', sebep:'The period has already been run.', cozum:'Choose the "repeat" run reason — only the changed assets get a delta posting.' },
          { mesaj:'Posting period for asset accounting is not open', sebep:'Account type A is closed in {{OB52}}.', cozum:'Open the period.' },
          { mesaj:'Error in account determination for asset ...', sebep:'The depreciation expense or accumulated depreciation account is undefined in {{AO90}}.', cozum:'Complete the asset class\'s account determination.' },
          { mesaj:'Depreciation run terminated', sebep:'Timeout, or an error on a single asset.', cozum:'Run with the "restart" reason; find the failing asset in the log.' },
        ],
        ipucu:'{{AFAB}} is **always run in test mode first**. Correcting after a real run requires ' +
              'reversal postings and is tedious. In systems with many assets it must also be scheduled as ' +
              'a **background job**.',
        ilgili:['AW01N','AJAB','AJRW','ABAA'] },

      { kod:'ABAVN', ad:'Fixed asset scrapping',
        amac:'Records a disposal with no proceeds; the {{net-defter-degeri}} is expensed as a loss.',
        neZaman:'When the asset becomes unusable, is destroyed, or is stolen.',
        adimlar:[
          { baslik:'Enter the asset number and disposal date' },
          { baslik:'Choose the transaction type (200/250 — scrapping)' },
          { baslik:'State whether it\'s a full or partial disposal',
            aciklama:'For a partial disposal, a quantity or amount ratio is entered; part of the asset ' +
                     'stays on the books.' },
          { baslik:'Simulate and post',
            aciklama:'The system automatically clears accounts 253 and 257 and expenses the remaining ' +
                     'book value as a loss.' },
        ],
        ipucu:'The **decision** to scrap isn\'t an accounting decision, it\'s a business decision. ' +
              'Scrapping an asset with a high book value cuts that period\'s profit significantly — which ' +
              'is usually why it needs management approval.',
        hatalar:[
          { mesaj:'Retirement date is before capitalization date', sebep:'The disposal date is before the capitalization date.', cozum:'Check the dates; if the capitalization was wrong, fix it first.' },
        ],
        ilgili:['F-92','ABAON','ABUMN','AW01N'] },

      { kod:'ABUMN', ad:'Fixed asset transfer',
        amac:'Moves an asset to another asset, class, or company code.',
        neZaman:'On {{yatirim-devam}} capitalization, when correcting an asset opened in the wrong class, on intercompany transfer.',
        adimlar:[
          { baslik:'Enter the source asset and transfer date' },
          { baslik:'Enter the target asset or create a new one',
            aciklama:'You can create the target on the fly with the "new asset" option on the screen.' },
          { baslik:'Choose a full or partial transfer' },
          { baslik:'Simulate and post',
            aciklama:'The source asset\'s values move to the target; accumulated depreciation moves too.' },
        ],
        ipucu:'The only way to fix an asset opened in the wrong class is to transfer it with {{ABUMN}} ' +
              'into a new asset in the correct class. The class **can\'t be changed** in the master data ' +
              'because it drives account determination and the number range.',
        ilgili:['AIAB','AIBU','ABAVN','AS01'] },

      { kod:'AIAB', ad:'Define AuC settlement rule — **the first step of capitalization**',
        amac:'Defines which assets, and in what proportion, the costs on an asset under construction will be transferred to (a settlement rule).',
        neZaman:'**Before** capitalization. {{AIBU}} won\'t run without a rule.',
        adimlar:[
          { baslik:'Enter the AuC asset number',
            aciklama:'The system lists the cost items accumulated on it.' },
          { baslik:'Determine the settlement type',
            aciklama:'**Summary** (the whole amount to one target) or **line item** (each item to its own ' +
                     'target). Depends on the asset class setting.' },
          { baslik:'Enter the target assets',
            aciklama:'Target assets must be **opened in advance** with {{AS01}}. The AuC itself can\'t be a target.' },
          { baslik:'Enter the distribution ratio or amount',
            aciklama:'A percentage, a fixed amount, or an equivalence number. The total **must be 100%**, ' +
                     'or the remainder stays in AuC.' },
          { baslik:'Save — the rule is now usable by {{AIBU}}' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'AuC asset 4000012 · company 1000' },
          { ekran:'Cost items', islem:'12 items · total 3,500,000 TRY' },
          { ekran:'Settlement rule', islem:'252 Buildings 74.3% · 253 Machinery 20% · 255 Fixtures 5.7%' },
          { ekran:'Validation', islem:'Total **100%** ✓' },
        ],
        alanlar:{
          zorunlu:['AuC asset number','Target asset','Distribution ratio/amount','Settlement type'],
          opsiyonel:['Validity period','Settlement profile'] },
        hatalar:[
          { mesaj:'Settlement rule is incomplete / total is not 100%', sebep:'The distribution ratios don\'t add up to 100%.', cozum:'Fix the ratios. Any remaining amount isn\'t capitalized and stays stuck in AuC.' },
          { mesaj:'Receiver asset does not exist', sebep:'The target asset hasn\'t been opened.', cozum:'First open the target asset in the correct {{varlik-sinifi}} with {{AS01}}.' },
          { mesaj:'Line item settlement not allowed for this asset class', sebep:'The AuC asset class is set to summary settlement.', cozum:'**The class setting can\'t be changed afterward.** If line-item settlement is needed, a new AuC has to be opened and the cost transferred — which is why this decision must be made up front.' },
        ],
        ipucu:'**The settlement rule design determines the useful life.** If a building and a machine ' +
              'accumulate in the same AuC and are transferred to a single "building" asset, the machine ' +
              'also spreads over 50 years and depreciation is understated for years.\n\n' +
              'That\'s why the question to ask at the start of a project is: ' +
              '**"How many different useful lives will this investment produce assets in?"** ' +
              'If the answer is more than one, the AuC class needs to be set to **line-item settlement**.',
        ilgili:['AIBU','AS01','ABUMN','AW01N'] },

      { kod:'AIBU', ad:'Capitalize the AuC — **the moment depreciation begins**',
        amac:'Transfers the AuC cost to the target assets according to the rule defined with {{AIAB}}.',
        neZaman:'When the investment is ready for use; at each stage in a partial go-live.',
        adimlar:[
          { baslik:'Enter the AuC asset number and the **capitalization date**',
            aciklama:'**This date determines when depreciation begins** — not the invoice dates. It ' +
                     'should be the day the asset actually became ready for use.' },
          { baslik:'Validate the settlement rule',
            aciklama:'The targets and ratios defined with {{AIAB}} are displayed.' },
          { baslik:'**Run in test mode**',
            aciklama:'Check which amount goes to which asset.' },
          { baslik:'Run in production mode',
            aciklama:'A transfer document is created with {{hareket-turu}} **336**: ' +
                     '252/253 debit, 258 credit.' },
          { baslik:'Verify the AuC balance is **zero** ({{AW01N}})',
            aciklama:'In a partial capitalization, the remaining amount deliberately stays.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'AuC 4000012 · capitalization date **01.10.2026**' },
          { ekran:'Test', islem:'252 → 2,600,000 · 253 → 700,000 · 255 → 200,000' },
          { ekran:'Production', islem:'Document 4900001188 · transaction type 336' },
          { ekran:'Check', islem:'{{AW01N}} → AuC balance **0** ✓' },
        ],
        alanlar:{
          zorunlu:['AuC asset number','Capitalization date','Settlement rule (predefined)'],
          opsiyonel:['Partial amount','Document date'] },
        hatalar:[
          { mesaj:'No settlement rule maintained', sebep:'No rule has been defined with {{AIAB}}.', cozum:'Run {{AIAB}} first. **The order can\'t be reversed.**' },
          { mesaj:'Asset ... is not an asset under construction', sebep:'The asset isn\'t in an AuC class.', cozum:'An asset that wasn\'t opened as AuC can\'t be capitalized with {{AIBU}}; use {{ABUMN}} for a normal transfer.' },
          { mesaj:'Posting period is not open for account type A', sebep:'The period is closed for the asset account type.', cozum:'Open account type **A** in {{OB52}}.' },
          { mesaj:'Capitalization was posted but depreciation did not start', sebep:'The capitalization date is in the future, or the target asset\'s depreciation key is 0000.', cozum:'Check the target asset\'s depreciation key with {{AW01N}} — it may have been copied from the AuC class.' },
        ],
        ipucu:'**The most critical field is the capitalization date.** The system asks for it because ' +
              'only a person can know the answer to *"when did the asset actually become ready for ' +
              'use?"* — invoice dates don\'t show that.\n\n' +
              'A wrong date hurts in either direction: too early posts depreciation on an asset not yet ' +
              'in use; too late hides the cost of a running asset and overstates that period\'s profit.',
        ilgili:['AIAB','AW01N','AFAB','ABUMN'] },

      { kod:'AJAB', ad:'Fixed asset year-end closing',
        amac:'Closes the fiscal year in asset accounting; no postings can be made to a closed year.',
        neZaman:'At year-end, **after** all depreciation runs are complete.',
        adimlar:[
          { baslik:'Enter the company code and the fiscal year to close' },
          { baslik:'Run in test mode first',
            aciklama:'The system lists whatever is blocking closing: a missing depreciation run, faulty ' +
                     'assets, unbalanced areas.' },
          { baslik:'Clear the blockers, then close in production mode' },
        ],
        hatalar:[
          { mesaj:'Depreciation not completely posted for fiscal year', sebep:'{{AFAB}} hasn\'t been run for all of the year\'s periods.', cozum:'Run the missing periods; all 12 periods must be complete.' },
        ],
        ipucu:'Order matters: **{{AJRW}} (open the new year) → run {{AFAB}} through the year → {{AJAB}} ' +
              '(close the old year)**. Assets can\'t be posted to the new year until AJRW has been run.',
        ilgili:['AJRW','AFAB','OB52'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'AA\'s table structure has **four layers**: master data ({{ANLA}}), depreciation settings ({{ANLB}}), ' +
      'annual values ({{ANLC}}), and transactions ({{ANEP}}). The answer to almost any question about an ' +
      'asset is in one of these four.',

    liste:[
      { ad:'ANLA', baslik:'Fixed asset master record',
        tutar:'The asset\'s identity: class, description, capitalization date, inventory number.',
        olusturan:'{{AS01}}',
        guncelleyen:'{{AS01}}, {{AS02}}, {{ABUMN}} (on transfer)',
        anahtar:'BUKRS + ANLN1 + ANLN2',
        iliskiler:'{{ANLB}} depreciation settings, {{ANLC}} annual values, {{ANEP}} transactions, ' +
                  '{{ANLZ}} time-dependent assignments — all of these hang off this record.',
        s4:'Master data structure preserved; values moved to {{ACDOCA}}.',
        alanlar:[
          { ad:'ANLN1', aciklama:'Main asset number' },
          { ad:'ANLN2', aciklama:'Sub-asset number — for tracking components separately ({{AS11}})' },
          { ad:'ANLKL', aciklama:'**{{varlik-sinifi}}** — drives account determination and the number range' },
          { ad:'AKTIV', aciklama:'**{{aktiflestirme}} date** — when depreciation starts' },
          { ad:'DEAKT', aciklama:'Deactivation date — filled in on disposal' },
        ] },

      { ad:'ANLB', baslik:'Asset depreciation area data',
        tutar:'{{amortisman-anahtari}} and {{faydali-omur}} for each {{amortisman-alani}}.',
        olusturan:'{{AS01}} — defaults come from the asset class',
        guncelleyen:'{{AS02}}',
        anahtar:'BUKRS + ANLN1 + ANLN2 + AFABE + BDATU',
        iliskiler:'A child of {{ANLA}}. **One asset has multiple rows** — one for each area.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'AFABE', aciklama:'Depreciation area number (01 commercial, 15 tax, 32 IFRS)' },
          { ad:'AFASL', aciklama:'{{amortisman-anahtari}}' },
          { ad:'NDJAR / NDPER', aciklama:'Useful life — years and periods' },
        ] },

      { ad:'ANLC', baslik:'Asset annual value totals',
        tutar:'Acquisition value, accumulated depreciation, period depreciation, and {{net-defter-degeri}} by year.',
        olusturan:'Acquisition and depreciation postings',
        guncelleyen:'{{ABZON}}, {{AFAB}}, {{ABAVN}}, {{ABUMN}}',
        anahtar:'BUKRS + ANLN1 + ANLN2 + GJAHR + AFABE',
        iliskiler:'{{AW01N}}\'s *Planned values* tab reads from here.',
        s4:'In S/4HANA values are calculated from {{ACDOCA}}; ANLC exists for compatibility.',
        alanlar:[
          { ad:'KANSW', aciklama:'Acquisition value (start of year)' },
          { ad:'KNAFA', aciklama:'Accumulated ordinary depreciation' },
          { ad:'NAFAG', aciklama:'The year\'s posted depreciation' },
        ] },

      { ad:'ANEP', baslik:'Asset transaction line items',
        tutar:'**Every** transaction on the asset: acquisition, disposal, transfer, value adjustment.',
        olusturan:'{{ABZON}}, {{F-90}}, {{ABAVN}}, {{ABUMN}}, {{AFAB}}',
        guncelleyen:'Every asset transaction',
        anahtar:'BUKRS + ANLN1 + ANLN2 + GJAHR + LNRAN + AFABE',
        iliskiler:'Linked to the document header via {{ANEK}}, and from there to the FI document.',
        s4:'Moved to {{ACDOCA}}; ANEP is a {{uyumluluk-view}}.',
        alanlar:[
          { ad:'BWASL', aciklama:'**{{hareket-turu}}** — 100 acquisition, 200 disposal, 300 transfer' },
          { ad:'ANBTR', aciklama:'Transaction amount' },
          { ad:'BZDAT', aciklama:'Value date — used in the depreciation calculation' },
        ] },

      { ad:'ANLZ', baslik:'Asset time-dependent data',
        tutar:'Assignments that can **change over time**, such as {{maliyet-yeri}}, plant, and person responsible.',
        olusturan:'{{AS01}}',
        guncelleyen:'{{AS02}} — every change creates a new validity interval',
        anahtar:'BUKRS + ANLN1 + ANLN2 + BDATU',
        iliskiler:'A child of {{ANLA}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KOSTL', aciklama:'{{maliyet-yeri}} — the CO object the depreciation expense goes to' },
          { ad:'BDATU / ADATU', aciklama:'Validity start and end dates' },
        ] },

      { ad:'ANEA', baslik:'Asset transaction — depreciation portion',
        tutar:'On disposal transactions, how much of the accumulated depreciation is to be removed.',
        olusturan:'{{ABAVN}}, {{F-92}}, {{ABUMN}}',
        guncelleyen:'Disposal and transfer transactions',
        s4:'Moved to {{ACDOCA}}.' },

      { ad:'ANEK', baslik:'Asset document header',
        tutar:'Header information for asset documents; bridges to the FI document.',
        olusturan:'Asset transactions',
        guncelleyen:'Asset transactions',
        s4:'{{uyumluluk-view}}.' },
    ],

    er:{
      type:'er',
      baslik:'Fixed asset table relationships',
      varliklar:[
        { ad:'ANLA', rol:'Master data', hub:true, aciklama:'Asset identity',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'ANLN1', tip:'pk' }, { ad:'ANLN2', tip:'pk' }, { ad:'ANLKL' }, { ad:'AKTIV' }] },
        { ad:'ANLB', rol:'Settings', aciklama:'Depreciation area data',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'AFABE', tip:'pk' }, { ad:'AFASL' }, { ad:'NDJAR' }] },
        { ad:'ANLC', rol:'Totals', aciklama:'Annual values',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'GJAHR', tip:'pk' }, { ad:'KANSW' }, { ad:'KNAFA' }] },
        { ad:'ANEP', rol:'Transaction', aciklama:'Asset transactions',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'LNRAN', tip:'pk' }, { ad:'BWASL' }, { ad:'ANBTR' }] },
        { ad:'ANLZ', rol:'Time-dependent', aciklama:'Cost center and assignments',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'BDATU', tip:'pk' }, { ad:'KOSTL' }] },
        { ad:'ANEK', rol:'Document', aciklama:'Asset document header',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'BELNR', tip:'fk' }] },
        { ad:'BKPF', rol:'FI document', aciklama:'Accounting document',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'ACDOCA', rol:'Universal', aciklama:'S/4HANA\'s single source',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'ANLN1', tip:'fk' }, { ad:'RACCT' }] },
      ],
      iliskiler:[
        { from:'ANLA', to:'ANLB', alanlar:'ANLN1 + ANLN2', not:'one row per depreciation area' },
        { from:'ANLA', to:'ANLC', alanlar:'ANLN1 + ANLN2', not:'values for each year and area' },
        { from:'ANLA', to:'ANEP', alanlar:'ANLN1 + ANLN2', not:'all of the asset\'s transactions' },
        { from:'ANLA', to:'ANLZ', alanlar:'ANLN1 + ANLN2', not:'time-dependent assignments' },
        { from:'ANEP', to:'ANEK', alanlar:'BELNR', not:'transaction → document header' },
        { from:'ANEK', to:'BKPF', alanlar:'BELNR', not:'asset document → FI document' },
        { from:'ANEP', to:'ACDOCA', alanlar:'ANLN1 + BELNR', not:'values live here in S/4HANA' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Day-to-day work in AA happens on three screens: **opening an asset** ({{AS01}}), **monitoring ' +
      'values** ({{AW01N}}), and **running depreciation** ({{AFAB}}). What they all have in common is the ' +
      'concept of {{amortisman-alani}} — no figure can be interpreted without knowing which area you\'re in.',

    ekranlar:[
      { ad:'{{AS01}} — Asset class selection screen',
        aciklama:'The single decision that determines the asset\'s entire fate is made here.',
        alanlar:[
          { ad:'Asset class', zorunlu:true, aciklama:'Brings in account determination, the number range, and the default depreciation settings. **Can\'t be changed afterward** — fixing it requires a transfer with {{ABUMN}}.' },
          { ad:'Company code', zorunlu:true, aciklama:'The {{degerleme-plani}} the company code belongs to determines which depreciation areas open.' },
          { ad:'Reference asset', zorunlu:false, aciklama:'The asset number to be copied as a template. Recommended for consistency.' },
          { ad:'Number of similar assets', zorunlu:false, aciklama:'Opens several identical assets at once (like 10 identical computers).' },
        ],
        ipucu:'If the asset class is chosen wrong, the accounts are wrong, and the only fix is transferring ' +
              'to a new asset in the correct class with {{ABUMN}}. That\'s why class selection is the one step not to rush.' },

      { ad:'{{AS01}} — Depreciation areas tab',
        aciklama:'How the same asset will be valued under different regulations is set up here.',
        alanlar:[
          { ad:'Depreciation area', zorunlu:true, aciklama:'Areas coming from the chart of depreciation are listed: 01 commercial, 15 tax, 32 IFRS…' },
          { ad:'{{amortisman-anahtari}}', zorunlu:true, aciklama:'The calculation method. Each area can use a **different** key.' },
          { ad:'{{faydali-omur}} (years/periods)', zorunlu:true, aciklama:'Separate for each area. Commercial may be 10 years, tax 8 years.' },
          { ad:'Depreciation start date', zorunlu:false, aciklama:'If left blank, it\'s calculated from the {{aktiflestirme}} date and the period control setting.' },
        ],
        ipucu:'Area 01 is usually the area that **posts to the ledger**; the others are often for ' +
              'reporting only. Which area posts to FI is defined in {{OADB}}, and without knowing this, ' +
              '"why did a depreciation posting happen twice?" can\'t be answered.' },

      { ad:'{{AW01N}} — Asset Explorer',
        aciklama:'AA\'s control panel. Area selection on the left, values and transactions on the right.',
        alanlar:[
          { ad:'Depreciation area selection (left panel)', zorunlu:true, aciklama:'**Each area shows different values.** Looking at the wrong area and saying "the values don\'t match" is the most common mistake.' },
          { ad:'Planned values tab', zorunlu:false, aciklama:'Acquisition, accumulated depreciation, NBV, the year\'s planned depreciation.' },
          { ad:'Posted values tab', zorunlu:false, aciklama:'What was actually posted, period by period. A deviation from planned means {{AFAB}} was run incompletely.' },
          { ad:'Transactions tab', zorunlu:false, aciklama:'All {{hareket-turu}} records; double-click drills into the FI document.' },
        ] },

      { ad:'{{AFAB}} — Run depreciation screen',
        aciklama:'The center of the monthly routine. Choosing the run reason is critical.',
        alanlar:[
          { ad:'Fiscal year / Posting period', zorunlu:true, aciklama:'Which period\'s depreciation will be calculated.' },
          { ad:'Run reason', zorunlu:true, aciklama:'**Planned** (normal), **repeat** (rerun the same period — posts the delta), **restricted** (selected assets), **restart** (resume an interrupted run).' },
          { ad:'Test mode', zorunlu:false, aciklama:'**Always checked first.** The real run can\'t be undone.' },
          { ad:'Asset range', zorunlu:false, aciklama:'Specific assets are selected for a restricted run.' },
        ],
        ipucu:'A system with thousands of assets will time out running in the foreground. Schedule the ' +
              'production run as a **background job** (Program → Execute in Background).' },
    ],

    zorunlu:['Asset class','Company code','Description','Depreciation key','Useful life','Transaction type (on acquisition)','Amount (on acquisition)'],
    opsiyonel:['Inventory number','Cost center','Plant','Person responsible','Capitalization date','Quantity','Serial number'],

    hatalar:[
      { mesaj:'Account determination ... not maintained for asset class', sebep:'Account determination is missing for the asset class in {{AO90}}.', cozum:'{{AO90}} → define the balance sheet account, accumulated depreciation, depreciation expense, and sale gain/loss accounts. AA\'s most common configuration error.' },
      { mesaj:'Posting period ... is not open for account type A', sebep:'The fixed-asset account type (A) is closed in {{OB52}}.', cozum:'Open the period on the **A** line. Opening the S line isn\'t enough.' },
      { mesaj:'Depreciation already posted for period', sebep:'The period has already been run.', cozum:'Choose the "repeat" run reason; only the delta for changed assets gets posted.' },
      { mesaj:'Fiscal year ... already closed in asset accounting', sebep:'The year is closed with {{AJAB}}.', cozum:'Postings can\'t be made to a closed year. Post to the current year; if a past year genuinely needs to reopen, weigh the audit impact.' },
      { mesaj:'Asset ... is blocked', sebep:'Blocked from acquisition with {{AS05}}.', cozum:'Remove the block or use the correct asset.' },
      { mesaj:'Value of depreciation area 15 is greater than area 01', sebep:'The cross-area consistency rule was violated.', cozum:'Check the cross-area dependency rules in {{OADB}}; if the tax area posts more depreciation than the commercial area, the rule needs to be relaxed.' },
      { mesaj:'Cost center ... is not valid on ...', sebep:'The cost center in {{ANLZ}} is outside its validity date.', cozum:'{{AS02}} → enter a valid cost center on the time-dependent tab.' },
    ],

    ipuclari:[
      '{{AW01N}} is AA\'s **single diagnostic tool**. For any asset question, go here first; make sure ' +
      'you\'re in the right area, then check the depreciation key and useful life.',
      'Always run {{AFAB}} in **test mode first** and compare the total to last month\'s. An unexpected ' +
      'deviation means a new acquisition or a useful-life change.',
      'When opening a new asset, **copy a similar one as a template** — the depreciation settings come ready-made.',
      'Be careful choosing the asset class correctly; the only way to fix it afterward is a transfer with {{ABUMN}}.',
      'Year-end order: **{{AJRW}} → (run {{AFAB}} through the year) → {{AJAB}}**. Postings can\'t be made ' +
      'to the new year until AJRW has been run.',
      'If depreciation expense is landing in the wrong department, the cause is the **cost center** in ' +
      '{{ANLZ}}, not account determination.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'ANLA', ne:'Asset master record — created by {{AS01}}' },
      { tablo:'ANLB', ne:'One row per depreciation area: key and useful life' },
      { tablo:'ANLZ', ne:'Cost center and time-dependent assignments' },
      { tablo:'ANEP', ne:'One line item per transaction (with {{hareket-turu}})' },
      { tablo:'ANEA', ne:'The accumulated depreciation portion removed on disposal' },
      { tablo:'ANLC', ne:'Annual value totals are updated' },
      { tablo:'ANEK', ne:'Asset document header — bridge to the FI document' },
      { tablo:'BKPF', ne:'FI document header (AA document type)' },
      { tablo:'BSEG', ne:'FI line items; `ANLN1` is filled on the asset line' },
      { tablo:'ACDOCA', ne:'In S/4HANA, asset values are held **here**; ANEP/ANLC are a compatibility view' },
    ],

    commit:
      'Asset transactions are written within a single LUW: the AA document ({{ANEP}}/{{ANEK}}) and the FI ' +
      'document ({{BKPF}}/{{BSEG}}) are created together.\n\n' +
      '{{AFAB}} is different: it **runs in bulk for thousands of assets** and usually produces multiple FI ' +
      'documents (because of the line-item limit per document). If a run is interrupted, it resumes where ' +
      'it left off with the "restart" reason — so an interrupted run isn\'t dangerous.',

    belgeNo:
      'An asset transaction produces **two numbers**: the AA document number ({{ANEK}}) and the FI ' +
      'document number ({{BKPF}}). Typical FI document types on the AA side: **AA** (asset posting), ' +
      '**AF** (depreciation). The asset number itself comes from the number range tied to {{varlik-sinifi}} ' +
      'and, together with the sub-asset number (`ANLN2`), forms a composite key.',

    postingLogic:
      'AA\'s decision chain:\n\n' +
      '**1. {{varlik-sinifi}}** → brings in the account determination key.\n' +
      '**2. {{AO90}}** → account determination key + depreciation area → which G/L accounts will be used.\n' +
      '**3. {{hareket-turu}}** → which value fields are affected (acquisition, disposal, or transfer).\n' +
      '**4. {{amortisman-anahtari}}** → how the amount is calculated.\n' +
      '**5. {{OADB}}** → which depreciation area **posts** to FI (the others are for reporting only).\n' +
      '**6.** The FI document is created; `ANLN1` is carried on the asset line.\n\n' +
      'If any link in this chain is missing, you get "account determination not possible."',

    belgeTuru:
      'FI document types used in AA: **AA** (asset posting — acquisition, disposal, transfer) and ' +
      '**AF** (depreciation). These are defined in {{OBA7}} and are allowed to post to the fixed-asset ' +
      '(A) account type.',

    numberRange:
      'There are two separate number ranges: the **asset number** (tied to {{varlik-sinifi}}, defined in ' +
      '{{OAOA}}) and the **FI document number** ({{FBN1}}). The asset number range is per company code and ' +
      '**not** tied to fiscal year — that\'s the difference from the document number.',

    accountDetermination:
      '{{AO90}} is AA\'s account determination hub. Input: the **account determination key** (comes from ' +
      '{{varlik-sinifi}}) + the **depreciation area**. Output:\n\n' +
      '• **Balance sheet account** (253 — acquisition value)\n' +
      '• **Accumulated depreciation account** (257 — contra-asset)\n' +
      '• **Depreciation expense account** (770/730)\n' +
      '• **Sale gain/loss accounts** (679/689)\n' +
      '• **Scrapping loss account**\n\n' +
      'A separate definition can be made for each depreciation area — the tax area can post to different accounts.',

    tur:
      '**Configuration:** {{degerleme-plani}}, {{amortisman-alani}} definitions ({{OADB}}), ' +
      '{{varlik-sinifi}} ({{OAOA}}), account determination ({{AO90}}), {{amortisman-anahtari}} ({{AFAMA}}), ' +
      'transaction types, period control methods.\n\n' +
      '**Master data:** asset records ({{ANLA}}/{{ANLB}}/{{ANLZ}}).\n\n' +
      '**Transaction data:** acquisitions, depreciation, disposals ({{ANEP}}).',

    transport:
      'The chart of depreciation, depreciation areas, asset classes, account determination, and ' +
      'depreciation keys transport. Asset records don\'t — they\'re opened separately in every system, or ' +
      'loaded with {{LTMC}}.\n\n' +
      '**Critical:** {{degerleme-plani}} is country-specific and assigned to a company code. Assets can\'t ' +
      'be opened until this assignment is made; it\'s the first thing to check at go-live.',

    img:[
      { yol:'SPRO → Financial Accounting → Asset Accounting → Organizational Structures → Copy Reference Chart of Depreciation/Depreciation Areas', not:'{{degerleme-plani}} — copied from a country template' },
      { yol:'SPRO → … → Asset Accounting → Valuation → Depreciation Areas → Define Depreciation Areas', not:'{{OADB}} — which area posts to the ledger' },
      { yol:'SPRO → … → Asset Accounting → Organizational Structures → Asset Classes → Define Asset Classes', not:'{{varlik-sinifi}} ({{OAOA}})' },
      { yol:'SPRO → … → Asset Accounting → Integration with General Ledger Accounting → Assign G/L Accounts', not:'{{AO90}} — AA\'s most critical configuration' },
      { yol:'SPRO → … → Asset Accounting → Depreciation → Valuation Methods → Depreciation Key → Define Depreciation Keys', not:'{{AFAMA}}' },
      { yol:'SPRO → … → Asset Accounting → Periodic Processing → Fiscal Year Change / Year-End Closing', not:'{{AJAB}} / {{AJRW}} settings' },
    ],

    ekstra:[
      { ic:'🔑', baslik:'What is a depreciation key? — a worked example', metin:
        '**Let\'s start with the question:** what happens when you tell the system *"post depreciation on ' +
        'this machine"*? Nothing — because the system doesn\'t know **how** to post it.\n\n' +
        'There are five things it needs to know:\n\n' +
        '**1.** What logic? *(straight-line / declining)*\n' +
        '**2.** If declining, how fast? *(multiplier, cap)*\n' +
        '**3.** Will the rate change over time? *(steps)*\n' +
        '**4.** When should it start? *(start of year / acquisition month)*\n' +
        '**5.** Is there a cap amount?\n\n' +
        '**The depreciation key is these five answers tied to a code.** You write `Z_GENEL` on the asset, ' +
        'and the system knows all five answers.\n\n' +
        '**A worked example: a factory machine**\n\n' +
        'The machine is 600,000 TRY, useful life 5 years, we want straight-line, full-year depreciation. ' +
        'The key is filled in like this:\n\n' +
        '**1 → Straight-line**, I won\'t give the rate, **calculate from useful life** (1/5 = 20%), ' +
        '**stop when the life ends**.\n' +
        '**2 → Blank** (not declining).\n' +
        '**3 → Blank** (rate is always 20%).\n' +
        '**4 → From the start of the year** (VUK allows the full year).\n' +
        '**5 → Blank.**\n\n' +
        'This package is named `Z_GENEL`. It\'s assigned to the machine. Done.\n\n' +
        '**Now a passenger car**\n\n' +
        'We want the same things — straight-line, from useful life, stop when the life ends. The only ' +
        'difference: because {{kist-amortisman}} is required, **it must start from the acquisition month**.\n\n' +
        'The new key `Z_BINEK`: **1, 2, 3, and 5 are the same**, only **4** changes.\n\n' +
        '**This is exactly the answer to "why five parts?"**\n\n' +
        'If the key were a single piece, everything would have to be redefined from scratch for the ' +
        'passenger car. Because it\'s split into five parts, we **reuse four of them and change only one**.\n\n' +
        'On the same logic, a third key (`Z_AZALAN`) would change only 1, 2, and 3, taking period control ' +
        'unchanged from `Z_GENEL`.\n\n' +
        '*The SAP definition screens for these five parts: {{AFAMR}} · {{AFAMD}} · {{AFAMS}} · ' +
        '{{AFAMP}} · maximum amount. The screen that combines them all is {{AFAMA}} — see its card for the ' +
        'step-by-step example.*' },

      { ic:'⚙️', baslik:'What exactly is inside the five parts?', metin:
        'In the example above we said "1 → straight-line, from useful life, stop when the life ends." ' +
        'Every phrase in that line is a setting. Here\'s what\'s inside each part:\n\n' +
        '**① Base method ({{AFAMR}}) — the calculation skeleton**\n\n' +
        '• *Depreciation type:* ordinary, or special/extraordinary\n' +
        '• *Calculation base — four options:*\n' +
        '→ **By percentage:** I give the rate myself (e.g. 20%)\n' +
        '→ **From useful life:** the system calculates it (1 ÷ 5 = 20%) — *most common*\n' +
        '→ **Total percentage:** use a staged rate table\n' +
        '→ **Immediate (100%):** all at once, for low-value assets\n' +
        '• *Base value:* acquisition value, **{{net-defter-degeri}}** (used by declining balance), or the ' +
        'amount **after deducting {{kalinti-deger}}**\n' +
        '• *What happens at end of life:* **stop** / **zero out the remainder** / continue\n' +
        '→ **If "zero out the remainder" isn\'t selected on declining balance, the asset never reaches ' +
        'zero.** This is the most commonly overlooked setting.\n' +
        '• *Retirement-year behavior:* should depreciation be posted in the year of sale\n\n' +
        '**② Declining-balance method ({{AFAMD}}) — acceleration settings**\n\n' +
        '• *Multiplier:* how many times the normal rate → **2** under VUK\n' +
        '• *Maximum percentage:* the cap → **50%** under VUK\n' +
        '• *Minimum percentage:* a floor\n\n' +
        '*Example: for a 5-year asset the normal rate is 20% → multiplier 2 → 40%. For a 2-year asset, ' +
        '50% × 2 = 100% would result, but the 50% cap kicks in.*\n\n' +
        '**③ Multi-level method ({{AFAMS}}) — staged rates**\n\n' +
        'Defined line by line: *"years 1–4 → 40%"*, *"from year 5 → spread the remainder evenly"*.\n\n' +
        'The **switch from declining to normal** under VUK is modeled exactly this way.\n\n' +
        '**④ Period control ({{AFAMP}}) — timing**\n\n' +
        'A rule is defined **separately** for four events:\n\n' +
        '*acquisition* · *subsequent addition* · *retirement* · *transfer*\n\n' +
        'Common rules: `01` prorated from the start of the period · `06` **from the start of the year ' +
        '(full year)** · `08` from the start of the following year · `11` **from the following month**.\n\n' +
        '**⑤ Maximum amount — a cap**\n\n' +
        'Prevents annual depreciation from exceeding a set amount. Blank in most keys.' },

      { ic:'📅', baslik:'Pro-rata depreciation: the most misunderstood VUK rule, and its SAP counterpart', metin:
        '**The common assumption is wrong.** It\'s widely believed that "an asset bought mid-year gets ' +
        'prorated depreciation" — under VUK **this is not the general rule**.\n\n' +
        '**General rule (VUK md. 320/1):** whatever month of the year an asset is bought, the **full ' +
        'year\'s** depreciation can be posted for that year. **A machine bought on December 28 gets a ' +
        'full year of depreciation for that year.**\n\n' +
        '**Exception (VUK md. 320/2):** pro-rata applies **only to passenger cars**. For the fiscal year ' +
        'the vehicle is put into service, depreciation is posted **for the remaining months, with a ' +
        'partial month counted as a full month**.\n\n' +
        '*A passenger car bought on April 15 → 9 months including April → **9/12** of the annual ' +
        'depreciation.*\n\n' +
        '**What can\'t be posted in year 1 isn\'t lost:** it\'s completed as an expense in the **final ' +
        'year** of the useful life. So total depreciation doesn\'t change, it\'s only **shifted by one year**.\n\n' +
        '**Exception to the exception:** businesses whose activity is **renting or operating** passenger ' +
        'cars (car rental companies, driving schools) don\'t apply pro-rata — for them, the car isn\'t an ' +
        'operating asset, it\'s the subject of the business.\n\n' +
        '**Numerical example**\n\n' +
        'A vehicle at 1,200,000 TRY, useful life 5 years → annual depreciation **240,000 TRY**.\n\n' +
        'Bought April 15 → 9 months **including** April → first year **180,000 TRY** (9/12).\n' +
        'Years 2–5 → **240,000 TRY** each year.\n' +
        'Year 6 → the **60,000 TRY** carried over from year 1.\n\n' +
        'Total: 180,000 + 960,000 + 60,000 = **1,200,000 TRY** ✓\n\n' +
        '**Total depreciation didn\'t change** — it spread over 6 calendar years instead of 5. Pro-rata ' +
        'is a *timing* rule, not a *reduction*.\n\n' +
        '**How SAP achieves it**\n\n' +
        'Through the depreciation key\'s **fourth part**, period control ({{AFAMP}}). General assets get ' +
        '"from the start of the year"; passenger cars get "prorated from the acquisition month."\n\n' +
        'So **two separate keys are needed**, and that\'s the only difference between them — the concrete ' +
        'example is the `Z_GENEL` / `Z_BINEK` comparison on the {{AFAMA}} card.\n\n' +
        '**A common configuration mistake:** assigning a single key to every asset, so passenger cars ' +
        'also get full-year depreciation. The trial balance ties out, the document is balanced, no error ' +
        'message appears — but **the tax base is calculated wrong**, and the gap only surfaces during a ' +
        'tax inspection.' },

      { ic:'🗂️', baslik:'Standard depreciation keys, and what VUK requires', metin:
        'The keys SAP ships with are **general-purpose** and mostly designed for German/US regulations. ' +
        'The common ones:\n\n' +
        '`0000` — **no depreciation**. For {{yatirim-devam}} and land/plots. The AuC asset class brings ' +
        'this in automatically.\n\n' +
        '`LINA` — straight-line, **from the acquisition value**, prorated by period.\n\n' +
        '`LINR` — straight-line, calculated **from the remaining useful life**. If the life is later ' +
        'changed, it spreads the remaining value over the remaining life.\n\n' +
        '`DG20` / `DG30` — declining balance, multiplier **×2** / **×3**.\n\n' +
        '`GWG` — low-value asset: **100% immediate** depreciation.\n\n' +
        '`MANU` — **manual** depreciation; the system doesn\'t calculate, the user enters it with {{ABMA}}.\n\n' +
        '**But these aren\'t enough for VUK.** Turkish setups need:\n\n' +
        '**1.** A straight-line key with **full-year** period control for general assets.\n' +
        '**2.** A separate key with **pro-rata** period control for passenger cars.\n' +
        '**3.** For declining balance, a base method with a multiplier of **2**, a cap of **50%**, and ' +
        'one that **zeroes out the remainder in the final year**.\n' +
        '**4.** {{AFAMS}} multi-level method, if a switch from declining to normal is needed.\n' +
        '**5.** A structure giving a useful life equal to the lease term, for {{ozel-maliyet-bedeli}}.\n\n' +
        'That\'s why **custom (`Z*`) keys** are defined in practice. Copying a standard key and changing ' +
        'period control is the most common approach.\n\n' +
        '**A consulting note:** key design must be finished **before go-live**. Changing the parameters ' +
        'of a key that\'s already in use affects the future depreciation of **every asset** using it — ' +
        'past postings don\'t change, but inconsistency results. If a change is needed, open a **new key** ' +
        'and assign it to the assets.' },

      { ic:'🏗️', baslik:'Assets under construction (AuC): why it exists, what it delivers, which accounts it uses', metin:
        '**The problem it solves**\n\n' +
        'A factory building takes 18 months to finish. Dozens of invoices arrive in that time: earthworks, ' +
        'concrete, steel, electrical wiring, engineering, labor. These expenditures are **neither an ' +
        'expense nor a ready-to-use asset**. Accounting needs a third place — {{yatirim-devam}} is exactly ' +
        'that place.\n\n' +
        'Without AuC there would be two bad options:\n\n' +
        '**a)** **Expense** the costs — the construction years\' profit would look artificially low, and ' +
        'the years of use artificially high. The matching principle would be violated.\n\n' +
        '**b)** Open it as a normal asset — {{AFAB}} would **start posting depreciation** on a building ' +
        'that isn\'t used yet. The cost of an asset delivering no benefit would appear to be depleting.\n\n' +
        '**Three concrete benefits**\n\n' +
        '**1. Depreciation starts at the right time.** The AuC asset class brings in **0000** (no ' +
        'depreciation) as the key. The system is structurally unable to post depreciation. It only starts ' +
        'after capitalization with {{AIBU}}, from the entered **capitalization date**.\n\n' +
        '**2. Collecting cost from different sources.** The same AuC object receives cost from three ' +
        'modules: an FI vendor invoice ({{MIRO}}, {{F-90}}), an MM material issue (transaction type ' +
        '**241**), and a CO internal-labor allocation. "How much have we spent on this investment so ' +
        'far?" can be answered any time with {{AW01N}}.\n\n' +
        '**3. Correct useful-life assignment.** With line-item settlement, a building (50 years), machine ' +
        '(10 years), and fixtures (5 years) coming out of the same project get transferred to **separate ' +
        'assets**. If they all went to a single asset, the machine would also spread over 50 years and ' +
        'depreciation would be understated for years.\n\n' +
        '**The accounts in play**\n\n' +
        '`259` **Down payments on investments** — the advance paid to the vendor. Not yet a cost, a right ' +
        'to a claim. Tracked **separately** from 258.\n\n' +
        '`258` **Assets under construction** — costs already incurred accumulate here. Shown on a ' +
        'separate balance-sheet line; the reader can see "this asset isn\'t contributing to production ' +
        'yet."\n\n' +
        '`252/253/255` **Target asset accounts** — debited on capitalization.\n\n' +
        '`320` vendors, `153` inventory, `770` labor — the offsetting accounts the cost comes from.\n\n' +
        'Account determination links {{AO90}} to the AuC {{varlik-sinifi}}; the system finds account 258 ' +
        'from there.\n\n' +
        '**The accounting nature of capitalization**\n\n' +
        'Capitalization is **not a gain event**. In the 258 credit / 252 debit posting, the balance sheet ' +
        'total **doesn\'t change** and the income statement **isn\'t affected**. What happens is only a ' +
        '**reclassification**: an asset moves from "in progress" status to "in use" status.\n\n' +
        'The only thing that changes is that **depreciation starts being posted** from that date — and ' +
        'that affects the income statement for years to come.' },

      { ic:'⚠️', baslik:'The three most expensive mistakes with AuC', metin:
        '**1. Skipping partial go-live**\n\n' +
        'The factory\'s first production line starts running in August, the second finishes in December. ' +
        'The project team waits for "everything to be done" and capitalizes it all at once in December.\n\n' +
        'Result: the running line produces for **four months with no depreciation posted**. Those four ' +
        'months\' cost is understated, and profit looks higher than it is. The right approach: **partial ' +
        'capitalization** at each go-live stage.\n\n' +
        '**2. Setting the settlement rule to a single target**\n\n' +
        'A building, machine, and fixtures accumulate in the same AuC and the entire amount is ' +
        'transferred to the "building" asset. 900,000 TRY of machinery and fixtures gets **spread over 50 years**.\n\n' +
        'Annual depreciation gap: the machine should be 70,000/year over 10 years but instead comes to ' +
        '14,000/year over 50 years. The gap compounds every year and fixing it requires an asset transfer.\n\n' +
        '**Prevention:** ask at the start of the project — *"how many different useful lives will this ' +
        'investment produce assets in?"* If more than one, the AuC class needs to be set to **line-item ' +
        'settlement**. This setting **can\'t be changed afterward**.\n\n' +
        '**3. Posting the investment advance to 258**\n\n' +
        'An advance is a *right to a claim*, not a cost already incurred. If it\'s posted to 258, the ' +
        'investment\'s cost appears overstated and the asset is inflated on capitalization.\n\n' +
        'The correct account is **259**; as progress invoices arrive, the advance is offset and the cost ' +
        'moves to 258.' },

      { ic:'📚', baslik:'What is a depreciation area? — one machine, three figures', metin:
        '**The problem is this:** the same machine needs three different figures.\n\n' +
        'A factory buys a weaving machine for 2,400,000 TRY:\n\n' +
        '• **Commercial accounting** says 10 years → **240,000 TRY** a year\n' +
        '• **Tax law** says 8 years → **300,000 TRY** a year\n' +
        '• **IFRS** says component-based → engine 6 years, frame 15 years\n\n' +
        'All three are correct. But opening three separate asset records distorts the inventory, and ' +
        'keeping three separate systems can\'t be audited.\n\n' +
        '**The solution: one asset, three depreciation areas.**\n\n' +
        'The asset is opened once. It has three rows inside:\n\n' +
        '`Area 01` commercial → 10 years, straight-line\n' +
        '`Area 15` tax → 8 years, declining balance\n' +
        '`Area 32` IFRS → component-based\n\n' +
        'Each row has **its own {{amortisman-anahtari}} and {{faydali-omur}}**. When {{AFAB}} runs, it ' +
        'calculates **all three at once**.\n\n' +
        '**A depreciation area is just an angle from which the same asset is valued.** That\'s all it is.\n\n' +
        '**The most common mistake in practice:** looking at an asset in {{AW01N}} without paying ' +
        'attention to **which area** you\'re in. Selecting the area from the left panel — area 01 shows ' +
        '240,000, area 15 shows 300,000. Most cases of "the values don\'t match" come down to exactly this.' },

      { ic:'🔗', baslik:'Area or ledger? — why they\'re separate concepts', metin:
        'They get mixed up often because both produce "a different result under a different standard." ' +
        'But they answer different questions:\n\n' +
        '**Depreciation area → "how will this asset be valued?"**\n' +
        'Lives only inside the fixed asset. Area 15 says the machine is written off over 8 years under ' +
        'tax rules.\n\n' +
        '**{{defter}} → "which accounting will the posting go to?"**\n' +
        'Covers all of FI — a vendor invoice goes to a ledger, so does a bank posting. Ledger 0L carries ' +
        'local accounting, 2L carries IFRS.\n\n' +
        '**How they connect:** each area is **linked** to a ledger ({{OADB}}).\n\n' +
        '`Area 01` → `Ledger 0L` *(local)*\n' +
        '`Area 32` → `Ledger 2L` *(IFRS)*\n\n' +
        'So one {{AFAB}} run feeds both ledgers at once: 240,000 goes to the local ledger, a different ' +
        'amount goes to the IFRS ledger.\n\n' +
        '**Why separate concepts?** Because areas only exist for assets; ledgers cover all of accounting. ' +
        'A vendor invoice has no "depreciation area" but it **does** have a ledger.\n\n' +
        '*Note: in S/4HANA, every posting area **must** be mapped to a ledger. See {{konu:parallel-ledger}} for details.*' },

      { ic:'📅', baslik:'When does depreciation start? — the period control method', metin:
        'A machine is bought on the 20th of the month. Full depreciation that month, half, or none at all?\n\n' +
        'The answer comes from the **period control method**, defined inside the {{amortisman-anahtari}}. ' +
        'Common options:\n\n' +
        '• **Pro rata (day-based):** as many days as it was used.\n' +
        '• **Start of month:** a full month is counted no matter which day of the month it was bought.\n' +
        '• **Following month:** no depreciation at all in the month of acquisition, starting from the next month.\n' +
        '• **Mid-year:** half depreciation in the first year.\n\n' +
        'In Turkey, tax law generally uses a **full-year** basis: whatever month of the year the asset is ' +
        'bought, the full year\'s depreciation is posted for that year (except passenger cars — pro-rata ' +
        'applies there).' },
    ],

    notlar:[
      { tip:'warn', baslik:'The asset class can\'t be changed in the master data', metin:
        'Because {{varlik-sinifi}} carries account determination and the number range, it **can\'t be ' +
        'changed** with {{AS02}}. The only way to fix an asset opened in the wrong class is to transfer it ' +
        'with {{ABUMN}} into a new asset in the correct class. That\'s why class selection in {{AS01}} isn\'t rushed.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'AA is **one of the FI sub-components S/4HANA changed the most**. The new architecture is called ' +
      '**Enterprise Asset Accounting**, and the biggest change is that depreciation areas are **directly ' +
      'mapped** to ledgers and values move to {{ACDOCA}}.',

    eccFarklari:[
      { konu:'Where values live', ecc:'In tables {{ANLC}} and {{ANEP}}', s4:'In {{ACDOCA}} — ANEP/ANLC are a {{uyumluluk-view}}' },
      { konu:'Depreciation area ↔ ledger', ecc:'A loose link; areas other than 01 are often statistical', s4:'**Mandatory mapping** — every posting area is linked to a {{defter}}' },
      { konu:'Real-time posting', ecc:'Only area 01 posts in real time; the others post at period-end', s4:'**All areas post in real time** — no need to wait for period-end' },
      { konu:'Technical clearing accounts', ecc:'None', s4:'A **Technical Clearing Account** is mandatory — on acquisition, area-independent and area-dependent portions are split' },
      { konu:'Depreciation run', ecc:'{{AFAB}}', s4:'FAA_DEPRECIATION_POST; {{AFAB}} redirects to this program' },
      { konu:'Number of documents', ecc:'A single document on acquisition', s4:'**Two documents** on acquisition: operational + valuation-based' },
      { konu:'Year-end', ecc:'{{AJAB}} mandatory', s4:'Simplified; some steps are automatic' },
    ],

    universalJournal:
      'Asset values are now held in {{ACDOCA}}, and the asset number (`ANLN1`), cost center, profit ' +
      'center, and account are all **on the same line**.\n\n' +
      'Practical consequences: (1) "how much depreciation is there by cost center?" can be answered from ' +
      'a single table, (2) reconciliation between FI and AA becomes unnecessary, (3) because each ' +
      'depreciation area posts in real time to its own ledger, the IFRS balance sheet also comes out in real time.',

    kalkanTcodes:[
      { eski:'{{AFAB}}', yeni:'FAA_DEPRECIATION_POST', not:'AFAB redirects to the new program when run' },
      { eski:'ASKB (periodic posting)', yeni:'—', not:'Made unnecessary; all areas now post in real time' },
      { eski:'AT01 and other old asset reports', yeni:'Fiori / {{AR01}}', not:'The new reports are preferred' },
    ],

    fiori:[
      { ad:'Manage Fixed Assets', aciklama:'Replaces {{AS01}}/{{AS02}}; asset list and values in a single screen.' },
      { ad:'Asset Values', aciklama:'The Fiori counterpart of {{AW01N}}; area comparisons are visual.' },
      { ad:'Post Depreciation', aciklama:'Replaces {{AFAB}}; run status and log are tracked visually.' },
      { ad:'Asset Acquisition', aciklama:'A simplified screen for the acquisition posting.' },
      { ad:'Asset Transactions', aciklama:'Presents asset transactions as a filterable list.' },
      { ad:'Asset Balances', aciklama:'Reports asset balances by class, cost center, and area.' },
    ],

    compatibilityViews:[
      '{{ANEP}}, {{ANEA}}, {{ANLC}}, {{ANEK}} — the value and transaction tables are now views produced from {{ACDOCA}}.',
      '{{ANLA}}, {{ANLB}}, {{ANLZ}} — **the master data tables still exist physically**, unchanged.',
      'This distinction matters: master data was preserved while the values moved to the universal ledger.',
      'Old Z-programs writing directly to {{ANEP}} break during migration; they need to be scanned for.',
    ],

    performans:
      'Because asset value reports run over {{ACDOCA}}, large asset portfolios see a marked speed-up. The ' +
      'depreciation run is also faster thanks to parallel processing support. On the other hand, because ' +
      'two documents are produced on acquisition, document volume increases — this should be factored ' +
      'into the archiving strategy.',

    bestPractices:[
      'Review the {{degerleme-plani}} and {{amortisman-alani}} structure before migration; loose ECC ' +
      'definitions won\'t work once the area-ledger mapping is **mandatory** in S/4HANA.',
      'Define the Technical Clearing Account correctly during migration — acquisition postings won\'t work without it.',
      'Clean up unused depreciation areas during migration; every area means extra documents and extra processing.',
      'Migrate the asset master data with {{LTMC}}; opening values and accumulated depreciation are loaded separately.',
      'Scan custom programs that write to {{ANEP}}/{{ANLC}} before migration and rewrite them on {{ACDOCA}}.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'A machine\'s three-year life: from purchase to sale, across three different ledgers',
    hikaye:
      '**Marmara Textiles Inc.** buys a weaving machine for 600,000 TRY in March 2026. It\'s depreciated ' +
      'over 10 years in commercial accounting, 8 years under tax law. 3 years later the machine is sold ' +
      'for 500,000 TRY.\n\n' +
      'This scenario shows how the same asset produces **different profit** in two different ledgers, and ' +
      'why that\'s not an error but a design.',
    veriler:[
      { k:'Company code', v:'1000 · Chart of depreciation TR' },
      { k:'Asset class', v:'3000 — Machinery and plant' },
      { k:'Acquisition', v:'600,000 TRY + 20% VAT · 01.03.2026' },
      { k:'Depreciation area 01', v:'Commercial — 10 years, normal method → **leading ledger 0L**' },
      { k:'Depreciation area 15', v:'Tax — 8 years, normal method → **tax ledger**' },
      { k:'Cost center', v:'3100 — Production' },
    ],

    adimlar:[
      { baslik:'The asset master record is opened', tcode:'AS01',
        aciklama:'As soon as the class is chosen, account determination and default depreciation settings ' +
                 'come in. A **different** useful life is entered for the two areas.',
        girdi:[
          { alan:'Asset class / Company code', deger:'3000 / 1000' },
          { alan:'Description', deger:'Weaving machine Model X · Inventory no MAK-2026-018' },
          { alan:'Cost center (time-dependent)', deger:'3100 — Production' },
          { alan:'Area 01 (commercial)', deger:'Key LINR (normal) · **10 years**' },
          { alan:'Area 15 (tax)', deger:'Key LINR (normal) · **8 years**' },
          { alan:'Result', deger:'Asset number **100018-0** created · **value is still zero**' },
        ],
        tabloEtkisi:[
          { tablo:'ANLA', ne:'Master record: ANLKL = 3000, AKTIV still blank' },
          { tablo:'ANLB', ne:'**Two rows**: AFABE 01 (10 years) and AFABE 15 (8 years)' },
          { tablo:'ANLZ', ne:'Cost center 3100, valid from 01.03.2026' },
        ],
        not:'Opening an asset **doesn\'t create value**. The record only creates an identity; the ' +
             'acquisition is a separate transaction.' },

      { baslik:'The acquisition is recorded', tcode:'ABZON',
        aciklama:'The machine is capitalized. The capitalization date determines when depreciation begins.',
        girdi:[
          { alan:'Asset', deger:'100018-0' },
          { alan:'Transaction type', deger:'**100** — external acquisition' },
          { alan:'Amount / VAT', deger:'600,000 TRY + 120,000 TRY' },
          { alan:'**Capitalization date**', deger:'01.03.2026' },
        ],
        fis:{ baslik:'Document 3000000123 — Machine acquisition', belgeTuru:'AA', tarih:'01.03.2026',
          satirlar:[
            { hesap:'253', ad:'Plant, machinery and equipment', borc:600000, not:'{{AO90}} account determination' },
            { hesap:'191', ad:'Deductible VAT', borc:120000 },
            { hesap:'320', ad:'Trade payables', alacak:720000 },
          ], not:'**No expense was posted.** Profit was completely unaffected at this stage; the balance sheet grew by 600,000 TRY.' },
        tabloEtkisi:[
          { tablo:'ANLA', ne:'`AKTIV` = 01.03.2026 — depreciation start determined' },
          { tablo:'ANEP', ne:'Transaction record: BWASL = 100, ANBTR = 600,000 · **a separate line for each area**' },
          { tablo:'ANLC', ne:'Annual values: acquisition 600,000 (separately for areas 01 and 15)' },
          { tablo:'ACDOCA', ne:'Values live here in S/4HANA; `ANLN1` = 100018 on the same line' },
        ] },

      { baslik:'March depreciation — two areas, two different amounts', tcode:'AFAB',
        aciklama:'The first depreciation run. The same asset produces **different** depreciation in the ' +
                 'two areas.',
        girdi:[
          { alan:'Period', deger:'2026 / 03 · **Test mode ✓** → then production' },
          { alan:'Area 01 calculation', deger:'600,000 / 120 months = **5,000 TRY/month**' },
          { alan:'Area 15 calculation', deger:'600,000 / 96 months = **6,250 TRY/month**' },
        ],
        fis:{ baslik:'Document 1000004521 — March depreciation (leading ledger 0L)', belgeTuru:'AF', tarih:'31.03.2026',
          satirlar:[
            { hesap:'730', ad:'General production expense — depreciation', borc:5000, not:'Falls on cost center 3100' },
            { hesap:'257', ad:'Accumulated depreciation', alacak:5000 },
          ], not:'**A separate document forms in the tax ledger**: 6,250 TRY. Two ledgers, two different ' +
                 'expenses — this isn\'t an error, it\'s parallel accounting itself.' },
        tabloEtkisi:[
          { tablo:'ANLC', ne:'Area 01: accumulated 5,000 · Area 15: accumulated 6,250' },
          { tablo:'ACDOCA', ne:'A separate set of lines for each ledger (different `RLDNR`)' },
        ],
        not:'{{AFAB}} is always run in **test mode** first. The total is compared against last month\'s; a ' +
             'deviation means a new acquisition or a useful-life change.' },

      { baslik:'Status checked 3 years later', tcode:'AW01N',
        aciklama:'At the end of February 2029, the asset\'s values in the two areas are compared. 36 ' +
                 'months of depreciation have been posted.',
        girdi:[
          { alan:'**Area 01 (commercial)**', deger:'Acquisition 600,000 · Accumulated 180,000 (36×5,000) · **NBV 420,000**' },
          { alan:'**Area 15 (tax)**', deger:'Acquisition 600,000 · Accumulated 225,000 (36×6,250) · **NBV 375,000**' },
          { alan:'Difference', deger:'45,000 TRY — the tax area posted depreciation faster' },
        ],
        not:'This is exactly the situation people call "the values don\'t match" — but they\'re ' +
             '**supposed to** not match. Different regulation, different useful life, different result. ' +
             'No figure in {{AW01N}} can be interpreted without checking which area you\'re in.' },

      { baslik:'The machine is sold — 500,000 TRY', tcode:'F-92',
        aciklama:'The sale price is the same in both areas, but because {{net-defter-degeri}} differs, ' +
                 '**the gain differs too**.',
        girdi:[
          { alan:'Asset / Disposal date', deger:'100018-0 / 28.02.2029' },
          { alan:'Sale price', deger:'500,000 TRY + 18% VAT = 590,000 TRY' },
          { alan:'Customer', deger:'C-7001 (machine buyer)' },
        ],
        fis:{ baslik:'Document 3000000876 — Machine sale (leading ledger 0L)', belgeTuru:'AA', tarih:'28.02.2029',
          satirlar:[
            { hesap:'120', ad:'Trade receivables — C-7001', borc:590000 },
            { hesap:'257', ad:'Accumulated depreciation', borc:180000, not:'**Fully zeroed out**' },
            { hesap:'253', ad:'Plant, machinery and equipment', alacak:600000, not:'The **entire** acquisition value comes off' },
            { hesap:'391', ad:'VAT payable', alacak:90000 },
            { hesap:'679', ad:'Gain on sale of fixed assets', alacak:80000, not:'500,000 − 420,000' },
          ], not:'**80,000 TRY gain** in the commercial ledger. In the tax ledger, because NBV is 375,000, ' +
                 'the gain comes to **125,000 TRY** — the tax base is calculated from this figure.' },
        tabloEtkisi:[
          { tablo:'ANLA', ne:'`DEAKT` = 28.02.2029 — asset deactivated' },
          { tablo:'ANEP', ne:'Disposal transaction (BWASL = 210)' },
          { tablo:'ANEA', ne:'The removed accumulated-depreciation portion was recorded' },
        ],
        not:'SAP calculates the gain/loss **automatically**: proceeds − NBV. The user only enters the sale price.' },

      { baslik:'Year-end closing', tcode:'AJAB',
        aciklama:'At the 2029 close, the order is: open the new year first, then close the old one.',
        girdi:[
          { alan:'Step 1', deger:'{{AJRW}} → fiscal year 2030 opened' },
          { alan:'Step 2 check', deger:'Was {{AFAB}} run for all 12 periods of 2029? ✓' },
          { alan:'Step 3', deger:'{{AJAB}} → 2029 closed, no more postings possible' },
        ],
        not:'If the order is broken you get an error: postings can\'t be made to the new year until ' +
             '{{AJRW}} has been run, and {{AJAB}} won\'t run while {{AFAB}} is incomplete.' },
    ],

    sonuc:
      '**Three years, summarized across two ledgers:**\n\n' +
      '**Commercial ledger (area 01):** total depreciation 180,000 TRY · NBV at sale 420,000 TRY · sale ' +
      'gain 80,000 TRY → **net effect −100,000 TRY**\n\n' +
      '**Tax ledger (area 15):** total depreciation 225,000 TRY · NBV at sale 375,000 TRY · sale gain ' +
      '125,000 TRY → **net effect −100,000 TRY**\n\n' +
      '**Three critical lessons:**\n\n' +
      '**1. The total effect is the same, the distribution differs.** In both ledgers the three-year net ' +
      'effect is −100,000 TRY (600,000 purchase − 500,000 sale). What changes is how that amount is ' +
      'spread over the years. The tax area expensed more upfront and showed more gain at sale — the ' +
      'result landed in the same place. This shows that depreciation creates a **timing difference**, not ' +
      'a permanent one.\n\n' +
      '**2. The answer to "the values don\'t match" is usually "which area are you in?"** No figure in ' +
      '{{AW01N}} can be interpreted without checking the area selection.\n\n' +
      '**3. The acquisition value never decreased.** Account 253 stood at 600,000 TRY for all three ' +
      'years; the decrease accumulated in 257, and both were cleared together on disposal. This structure ' +
      'guarantees that "what was this machine originally bought for?" can always be answered.',
  },

  },
});
