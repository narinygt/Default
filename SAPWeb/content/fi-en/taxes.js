/* ==========================================================================
   content/fi-en/taxes.js — English body for "Taxes"
   Same conventions as content/fi-en/genel-muhasebe.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'taxes',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'In SAP, tax is managed through **a two-character tax code**. The user, when entering an ' +
      'invoice, only selects the code (defined in {{FTXP}}); the system applies the rate, computes ' +
      'the tax amount, posts it to the correct account, and writes a separate line into the ' +
      '{{BSET}} table for the declaration.\n\n' +
      'The tax code carries **three things at once**: the **rate** (20%, 10%, 0%), the **type** ' +
      '(A = output/calculated, V = input/deductible), and the **account assignment** (via {{OB40}}, ' +
      'which G/L account it goes to).\n\n' +
      'Because these three are bundled into a single code, the user can\'t make a mistake in that ' +
      'sense: they can\'t enter the wrong rate, they can\'t post the tax to the wrong account. But ' +
      'they **can pick the wrong code** — and almost every tax error comes down to exactly that.',

    neden:
      '**Legal obligation.** The VAT return isn\'t filed document by document — it\'s summed up by tax code.\n\n' +
      '**Deduction right.** If VAT paid on purchases (deductible) and VAT collected on sales ' +
      '(output) aren\'t tracked in separate accounts, offsetting can\'t happen.\n\n' +
      '**Auditability.** The {{BSET}} table keeps each tax\'s base amount and tax amount separately; ' +
      'that\'s the first breakdown a tax audit asks for.\n\n' +
      '**Error prevention.** Tying the rate to a code instead of having the user type it by hand ' +
      'guarantees consistency across thousands of invoices.',

    sirketOnemi:
      'Tax is the FI area **most expensive to fix retroactively** when it goes wrong: the return ' +
      'has already been filed, the payment already made, and an amended return and penalty risk follow.\n\n' +
      'The critical point for a consultant is this: tax errors **don\'t look like accounting ' +
      'errors**. The document is balanced, the trial balance ties out, no alarm goes off. It only ' +
      'surfaces when the return is being prepared, or in an audit.\n\n' +
      'The telling question is: **"Where does non-deductible VAT get posted?"** The correct answer: ' +
      '**not** to a separate tax account — to the **cost of the expense or the asset** — because if ' +
      'it can\'t be deducted, it isn\'t a receivable from the tax authority, it\'s a real cost.',

    gercekHayat:
      'A company rents a passenger car. The invoice comes in: 10,000 TRY + 20% VAT = 12,000 TRY.\n\n' +
      'Out of habit, the accountant picks the **V1 (deductible 20%)** code. The document is ' +
      'balanced, the posting goes through, no error message.\n\n' +
      'But under Turkish tax law, VAT on renting a passenger car **cannot be deducted**. The ' +
      'correct code is the non-deductible VAT code, and that code has to add the 2,000 TRY not to ' +
      'a separate tax account but to the **expense account**: the expense should be 12,000 TRY, ' +
      'not 10,000.\n\n' +
      'Result: for 12 months, 2,000 TRY too much VAT was deducted every month, and the expense was ' +
      'understated by 24,000 TRY. The gap surfaced in an audit; an amended return and late-payment ' +
      'interest followed.\n\n' +
      '**Lesson:** picking a tax code is an accounting decision, not a keystroke habit.',

    muhasebeMantigi:
      'VAT is **not a revenue or an expense** for the business — it\'s an amount collected on the ' +
      'government\'s behalf, or a receivable from the government. That\'s why it\'s tracked not on ' +
      'the income statement but on the **balance sheet**.\n\n' +
      '**Output VAT (collected on sales):** the business **owes** it to the government → a ' +
      'liability account (391).\n\n' +
      '**Deductible/Input VAT (paid on purchases):** the business is **owed** it by the government ' +
      '→ an asset account (191).\n\n' +
      'At month-end the two are offset. If output > deductible, the difference is **VAT payable** ' +
      '(360); otherwise it carries forward to the next month as **carried-forward VAT**.\n\n' +
      '**Non-deductible VAT sits outside this logic:** if it can\'t be deducted, it isn\'t a ' +
      'receivable from the government, so it isn\'t an asset either. That\'s why it\'s **added to ' +
      'the cost of the related expense or asset**.',

    kavramlar: ['vergi-kodu', 'matrah', 'tevkifat', 'hesap-belirleme', 'belge-turu'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The tax process has two layers: **configuration** (done once, by the consultant) and ' +
      '**daily use** (done on every invoice, by the user). A third layer arrives at month-end: ' +
      '**declaration and offsetting**.',

    roller:[
      { rol:'FI consultant', gorev:'Defines tax codes with {{FTXP}} and account assignments with {{OB40}}.' },
      { rol:'Accounting user', gorev:'Selects the correct tax code when entering an invoice. **This is the process\'s single most critical decision.**' },
      { rol:'Tax officer', gorev:'Pulls the declaration report with {{S_ALR_87012357}} at month-end and checks it.' },
      { rol:'General ledger', gorev:'Performs the VAT offsetting posting, determines payable/carried-forward VAT.' },
      { rol:'Auditor', gorev:'Requests the {{BSET}} extract; compares the return against the trial balance.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'From tax code to declaration',
      adimlar:[
        { ic:'⚙️', rol:'Consultant', baslik:'The tax code is defined ({{FTXP}})',
          aciklama:'Country + code + rate + type (A/V). The code is written to table {{T007A}}. ' +
                   '**Done once, and afterward should never change** (see the technical section).',
          cikti:'A tax code', ok:'the account is assigned' },
        { ic:'🔗', rol:'Consultant', baslik:'The account is assigned ({{OB40}})',
          aciklama:'By transaction key: **MWS** output, **VST** deductible, **NAV** non-deductible. ' +
                   'The result is written to table {{T030K}}.',
          cikti:'Tax-account match', ok:'released for use' },
        { ic:'🧾', rol:'User', baslik:'The invoice is entered — **the code is chosen**',
          aciklama:'The tax code is selected on the {{FB60}} / {{FB70}} / {{MIRO}} screen. ' +
                   'The system applies the rate and computes the amount. **This is the process\'s only human decision.**',
          cikti:'Tax line', ok:'is posted' },
        { ic:'💾', rol:'System', baslik:'Written to the {{BSET}} table',
          aciklama:'The base amount and tax amount are recorded in a table **separate from ' +
                   '{{BSEG}}**. The declaration is produced from this table.',
          cikti:'Tax record', ok:'month-end' },
        { ic:'📊', rol:'Tax officer', baslik:'The declaration report is pulled ({{S_ALR_87012357}})',
          aciklama:'Output and deductible VAT are summarized by tax code; the report is ' +
                   '**compared against the trial balance**.',
          cikti:'Declaration data', ok:'offsetting is performed' },
        { ic:'⚖️', rol:'General ledger', baslik:'VAT offsetting ({{FB50}})',
          aciklama:'391 is debited, 191 is credited. The difference becomes **payable** (360) ' +
                   'or **carried-forward** VAT.',
          cikti:'Offsetting document' },
      ],
    },

    adimlar:[
      { rol:'Consultant', eylem:'Defines the tax code', sistem:'{{FTXP}} → {{T007A}}' },
      { rol:'Consultant', eylem:'Assigns the tax account', sistem:'{{OB40}} → {{T030K}}' },
      { rol:'Consultant', eylem:'Restricts the allowed codes', sistem:'{{OBZT}} — reduces user error' },
      { rol:'User', eylem:'Selects the tax code on the invoice', sistem:'{{FB60}}, {{FB70}}, {{MIRO}}' },
      { rol:'System', eylem:'Calculates and writes the tax', sistem:'{{BSEG}} + {{BSET}}' },
      { rol:'Tax officer', eylem:'Pulls the declaration report', sistem:'{{S_ALR_87012357}}' },
      { rol:'Tax officer', eylem:'Compares the report against the trial balance', sistem:'{{FBL3N}} — the 191 and 391 balances' },
      { rol:'General ledger', eylem:'Performs the offsetting posting', sistem:'{{FB50}}' },
    ],

    veriAkisi:{
      nereden:'The tax code definition ({{T007A}}), the account assignment ({{T030K}}), the base amount on the invoice.',
      nereye:'{{BSET}} tax lines, the {{BSEG}} tax item, the 191/391 accounts, the declaration.',
      tetikleyen:'Every document posting that carries a tax code.',
      sonraki:'Month-end offsetting, the declaration, payment.',
    },

    notlar:[
      { tip:'warn', baslik:'A tax error produces no alarm at all', metin:
        'When the wrong tax code is selected, the document is **balanced**, the trial balance ' +
        '**ties out**, and no error message appears. The system can\'t say "this code is wrong for ' +
        'this transaction" — because knowing which code is correct is **legal knowledge**, not ' +
        'system knowledge.\n\n' +
        'That\'s why tax control is done through **report comparison**: the totals in the ' +
        '{{S_ALR_87012357}} declaration report must **match, one to one**, the 191 and 391 account ' +
        'balances in {{FBL3N}}. If they don\'t, either an entry was posted manually to the tax ' +
        'account, or a document was entered without a tax code.\n\n' +
        'Preventive measure: use {{OBZT}} to restrict which code can be selected on which transaction.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The one-sentence summary of VAT accounting: **the tax paid on a purchase is an asset, the ' +
      'tax collected on a sale is a liability, and the two are offset at month-end.** The ' +
      'exception: non-deductible VAT — that isn\'t an asset, it\'s a cost.',

    etkilenenHesaplar:[
      { hesap:'191 Deductible VAT', tur:'Balance sheet — Asset', neden:'VAT paid on a purchase, a receivable from the government. {{OB40}} → **VST**.' },
      { hesap:'391 Output VAT', tur:'Balance sheet — Liability', neden:'VAT collected on a sale, a liability to the government. {{OB40}} → **MWS**.' },
      { hesap:'360 Taxes and funds payable', tur:'Balance sheet — Liability', neden:'Net VAT owed to the government after offsetting.' },
      { hesap:'190 Carried-forward VAT', tur:'Balance sheet — Asset', neden:'If deductible > output, the difference carries forward to the next period.' },
      { hesap:'The related expense/asset account', tur:'Variable', neden:'**Non-deductible VAT** doesn\'t go to a separate account — it goes into the cost. {{OB40}} → **NAV**.' },
      { hesap:'360 Withholding tax payable', tur:'Balance sheet — Liability', neden:'{{tevkifat}} (withholding) — a deduction not paid to the vendor but remitted to the tax office.' },
    ],

    fisler:[
      { baslik:'A purchase invoice — deductible VAT (V1, 20%)',
        belgeTuru:'KR', tarih:'10.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:10000, not:'The base amount — {{BSET}} `HWBAS`' },
          { hesap:'191', ad:'Deductible VAT', borc:2000, not:'{{OB40}} → **VST** · a receivable from the government' },
          { hesap:'320', ad:'Trade payables', alacak:12000, not:'{{LFB1}} `AKONT`' },
        ],
        not:'The expense is **10,000** TRY, not 12,000. VAT isn\'t included in the expense because ' +
             'it will be recovered from the government — which is why it\'s posted as an **asset**.' },

      { baslik:'A sales invoice — output VAT (A1, 20%)',
        belgeTuru:'DR', tarih:'12.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables', borc:36000 },
          { hesap:'600', ad:'Domestic sales', alacak:30000, not:'The base amount' },
          { hesap:'391', ad:'Output VAT', alacak:6000, not:'{{OB40}} → **MWS** · a liability to the government' },
        ],
        not:'Revenue is **30,000** TRY. The 6,000 TRY VAT collected isn\'t the business\'s revenue — ' +
             'it\'s an amount collected on the government\'s behalf.' },

      { baslik:'**Non-deductible VAT** — the tax is added to the cost',
        belgeTuru:'KR', tarih:'15.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense (passenger car rental)', borc:12000, not:'**Base amount + VAT** — {{OB40}} → **NAV**' },
          { hesap:'320', ad:'Trade payables', alacak:12000 },
        ],
        not:'**Account 191 was never used.** Non-deductible VAT isn\'t a receivable from the ' +
             'government, so it isn\'t an asset; it\'s a real cost and is added to the expense.\n\n' +
             'Note: the expense is not 10,000 but **12,000** TRY. This is the correct version of the ' +
             'most common conceptual mistake in tax.' },

      { baslik:'Non-deductible VAT on a fixed-asset purchase',
        belgeTuru:'KR', tarih:'15.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'254', ad:'Vehicles (passenger car)', borc:1200000, not:'**Base amount + VAT** — the depreciable amount' },
          { hesap:'320', ad:'Trade payables', alacak:1200000 },
        ],
        not:'The same logic matters even more on an asset purchase: non-deductible VAT goes ' +
             '**into the asset\'s cost**, so it\'s also **subject to depreciation**. If it had been ' +
             'posted to 191, VAT would have been wrongly deducted and depreciation would have been understated.' },

      { baslik:'Month-end VAT offsetting — a case where VAT payable results',
        belgeTuru:'SA', tarih:'31.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'391', ad:'Output VAT', borc:180000, not:'The account is zeroed out' },
          { hesap:'191', ad:'Deductible VAT', alacak:145000, not:'The account is zeroed out' },
          { hesap:'360', ad:'Taxes and funds payable', alacak:35000, not:'The net amount owed to the government' },
        ],
        not:'Because output (180,000) > deductible (145,000), the difference is **payable**. ' +
             'Both VAT accounts are **zeroed out** after offsetting — this is one of the month-end ' +
             'checkpoints.' },

      { baslik:'Month-end VAT offsetting — a case where VAT carries forward',
        belgeTuru:'SA', tarih:'30.06.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'391', ad:'Output VAT', borc:90000 },
          { hesap:'190', ad:'Carried-forward VAT', borc:22000, not:'A receivable carried into the next period' },
          { hesap:'191', ad:'Deductible VAT', alacak:112000 },
        ],
        not:'Because deductible (112,000) > output (90,000), no payment results; the difference ' +
             'stays as an asset, **190 Carried-forward VAT**, and is added to next month\'s ' +
             'deductible VAT.\n\n' +
             'During heavy-investment periods this can persist for months.' },

      { baslik:'{{tevkifat}} — a withholding-subject service invoice',
        belgeTuru:'KR', tarih:'20.05.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Consulting expense', borc:100000 },
          { hesap:'191', ad:'Deductible VAT', borc:20000 },
          { hesap:'320', ad:'Trade payables', alacak:100000, not:'The amount **actually paid** to the vendor' },
          { hesap:'360', ad:'Withholding tax payable (20%)', alacak:20000, not:'To be remitted to the tax office' },
        ],
        not:'The invoice amount is 120,000 TRY, but only 100,000 TRY is paid to the vendor. The ' +
             '20,000 TRY in between is withheld and remitted **directly to the tax office**.\n\n' +
             'The vendor\'s liability shows as 100,000, not 120,000 — because the remaining ' +
             'portion is now owed not to the vendor but to the government.' },
    ],

    tHesaplar:[
      { hesap:'Deductible VAT', kod:'191 (asset)',
        borc:[{ ad:'Purchase invoices', tutar:145000 }],
        alacak:[{ ad:'Month-end offsetting', tutar:145000 }],
        not:'**Zeroed out** after offsetting' },
      { hesap:'Output VAT', kod:'391 (liability)',
        borc:[{ ad:'Month-end offsetting', tutar:180000 }],
        alacak:[{ ad:'Sales invoices', tutar:180000 }],
        not:'**Zeroed out** after offsetting' },
      { hesap:'Taxes and funds payable', kod:'360 (liability)',
        borc:[{ ad:'Payment to the tax office', tutar:35000 }],
        alacak:[{ ad:'VAT offsetting', tutar:35000 }, { ad:'Withholding deductions', tutar:20000 }],
        not:'A liability until it is paid' },
    ],

    notlar:[
      { tip:'tip', baslik:'"Is VAT an expense?" — three different answers', metin:
        'There\'s no single answer to this question; it depends on the situation:\n\n' +
        '**1. If it\'s deductible → no, it\'s an asset.** It will be recovered from the ' +
        'government (191).\n\n' +
        '**2. If it\'s non-deductible → yes, but not as a separate expense.** It\'s **added to the ' +
        'cost** of the related expense or asset. Opening a separate "VAT expense" account is ' +
        'wrong: the cost is that item\'s real cost.\n\n' +
        '**3. If it\'s collected on a sale → neither, it\'s a liability.** It isn\'t the business\'s ' +
        'revenue (391).\n\n' +
        'The common logic across all three: VAT is an **intermediation** transaction; the business ' +
        'collects it on the government\'s behalf, or becomes a creditor of the government. Only ' +
        'when it can\'t be deducted does it turn into a genuine outflow of resources.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Tax codes vary along three axes: **direction** (input/output), **deductibility**, and ' +
      '**calculation method**. In Turkish setups, {{tevkifat}} (withholding) adds a fourth axis.',
    liste:[
      { ad:'Output Tax — type A',
        aciklama:'VAT collected from the customer on a sale. A liability to the government.',
        neZaman:'On every sales invoice, every credit memo.',
        ornek:'A1 = 20% output VAT → account 391. {{OB40}} → **MWS**.',
        tcodes:['FTXP','OB40'] },

      { ad:'Input Tax — type V',
        aciklama:'VAT paid to the vendor on a purchase. A receivable from the government.',
        neZaman:'On every purchase invoice, in the {{MIRO}} posting.',
        ornek:'V1 = 20% deductible VAT → account 191. {{OB40}} → **VST**.',
        tcodes:['FTXP','OB40'] },

      { ad:'Non-deductible Input Tax',
        aciklama:'VAT paid but not deductible. Not posted to a separate account — added to **cost**.',
        neZaman:'Expenses the law doesn\'t allow to be deducted, such as passenger car rental or entertainment/representation.',
        ornek:'{{OB40}} → the **NAV** key; the system adds the VAT to the expense/asset line.',
        tcodes:['FTXP','OB40'] },

      { ad:'Partially Deductible',
        aciklama:'Part of the VAT is deducted, the rest is added to cost.',
        neZaman:'Businesses with both taxable and exempt activity (partial exemption).',
        ornek:'On a code defined as 60% deductible, of 2,000 TRY VAT, 1,200 goes to 191 and 800 goes to the expense.' },

      { ad:'Zero-rated — 0%',
        aciklama:'The rate is 0% but the transaction **is still subject to tax**; it appears as a base amount on the declaration.',
        neZaman:'Exports, export-registered deliveries, some incentivized transactions.',
        ornek:'The base amount is declared, the tax is 0 TRY. **Not to be confused with an exempt transaction.**' },

      { ad:'Exempt / Not Taxable',
        aciklama:'The transaction is **outside** the scope of tax; the base amount is also reported in a different line on the declaration.',
        neZaman:'Transactions exempt by law.',
        ornek:'The difference from zero-rated is **where it lands on the declaration** — the accounting entry looks the same.' },

      { ad:'{{tevkifat}} (Withholding Tax)',
        aciklama:'The payer withholds tax from the amount they owe and remits it directly to the tax office.',
        neZaman:'Freelance/professional-fee payments, rent, some service purchases, payments abroad.',
        ornek:'The withholding type and code must be defined on the vendor master — otherwise no deduction is made.',
        tcodes:['FB60','F110'] },

      { ad:'Calculate Tax Automatically',
        aciklama:'The user only selects the code; the system calculates the tax from the base amount.',
        neZaman:'The normal flow — **the preferred method**.',
        ornek:'The "Calculate tax" checkbox on the entry screen is checked.' },

      { ad:'Manual Tax Entry',
        aciklama:'The user types the tax amount themselves; the system doesn\'t calculate it.',
        neZaman:'Invoices with a rounding difference, cases where the system can\'t match the rate exactly.',
        ornek:'**Risky:** a user error goes straight into the declaration. A tolerance limit should be defined.' },
    ],

    karsilastirmaBasliklar:['Zero-rated (0%)', 'Exempt'],
    karsilastirma:[
      ['Tax scope', '**Inside** scope', '**Outside** scope'],
      ['Rate', '0%', 'None'],
      ['Base-amount declaration', 'Appears as a base amount on the declaration', 'In a separate line / doesn\'t appear at all'],
      ['Accounting entry', 'Tax line at 0 TRY', 'No tax line'],
      ['Effect on the deduction right', 'Usually no effect', '**Limits** the deduction under partial exemption'],
      ['Typical use', 'Exports, export-registered', 'Statutory exemptions'],
      ['{{BSET}} record', '**Created** (amount 0)', 'Usually not created'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FTXP', ad:'Define tax code — the center of tax configuration',
        amac:'Defines tax codes, their rates, and their types on a country basis.',
        neZaman:'At setup; when a new rate or a new exemption type comes into effect.',
        adimlar:[
          { baslik:'Enter the country', aciklama:'Tax codes are **country-specific**; a code defined for TR isn\'t valid in DE.' },
          { baslik:'Enter the tax code', aciklama:'Two characters. Common convention: codes starting with **A** are output, those starting with **V** are input.' },
          { baslik:'Choose the tax type', aciklama:'**A** = output (calculated), **V** = input (deductible). Can\'t be changed once saved.' },
          { baslik:'Enter the rate', aciklama:'The percentage is entered on the relevant transaction-key line (MWS / VST / NAV).' },
          { baslik:'Check the account assignment', aciklama:'From the screen, jump to {{OB40}} to verify the account.' },
        ],
        ekranAkisi:[
          { ekran:'Country', islem:'TR' },
          { ekran:'Tax code', islem:'V1 · "Deductible VAT 20%"' },
          { ekran:'Properties', islem:'Tax type = **V**' },
          { ekran:'Rates', islem:'The VST line → 20.000' },
          { ekran:'Accounts', islem:'{{OB40}} → VST → 191000' },
        ],
        alanlar:{
          zorunlu:['Country','Tax code','Tax type (A/V)','Rate'],
          opsiyonel:['Target tax code','Deductibility percentage','Declaration section'] },
        hatalar:[
          { mesaj:'Tax code ... does not exist in company code country', sebep:'The code was defined for a different country.', cozum:'Check the company code\'s country ({{OBY6}}); define the code under the correct country.' },
          { mesaj:'Tax code ... has no account assignment', sebep:'No account was assigned in {{OB40}}.', cozum:'Use {{OB40}} to assign an account to the relevant transaction key (MWS/VST/NAV).' },
        ],
        ipucu:'**The rate of a tax code already in use should never be changed.** If it is, past ' +
              'documents stay at the old rate and new ones at the new rate, but **the report sums ' +
              'both under the same code** — the declaration comes out inconsistent, and the reason ' +
              'is only understood months later. Open a **new code** when the rate changes (see the ' +
              'technical section).',
        ilgili:['OB40','FTXA','BSET','T007A'] },

      { kod:'OB40', ad:'Tax account determination',
        amac:'Defines which G/L account a given tax transaction is posted to.',
        neZaman:'Immediately after a new tax code is defined.',
        adimlar:[
          { baslik:'Choose the transaction key',
            aciklama:'**MWS** output VAT · **VST** deductible VAT · **NAV** non-deductible (added to cost).' },
          { baslik:'Enter the chart of accounts' },
          { baslik:'Split by rule if needed',
            aciklama:'Optional: a different account can be used depending on the tax code ' +
                     '(for instance, separate accounts for 20% and 10%).' },
          { baslik:'Assign the G/L account', aciklama:'The result is written to table {{T030K}}.' },
        ],
        alanlar:{ zorunlu:['Transaction key','Chart of accounts','G/L account'], opsiyonel:['Split by tax code'] },
        hatalar:[
          { mesaj:'Error in account determination: table T030K key TR MWS', sebep:'No tax account is assigned.', cozum:'{{OB40}} → MWS → assign an account. This is the most common tax error on SD invoices.' },
        ],
        ipucu:'Tax accounts should be opened in {{FS00}} with the **"post automatically only"** ' +
              'flag. That way the user can\'t post to them by hand — this is the simplest and most ' +
              'effective safeguard that guarantees the declaration and the trial balance tie out.',
        ilgili:['FTXP','T030K','FS00'] },

      { kod:'S_ALR_87012357', ad:'VAT declaration report',
        amac:'Summarizes output and deductible VAT for the period by tax code.',
        neZaman:'Every month, before the return is filed; also on audit requests.',
        adimlar:[
          { baslik:'Enter the company code and period' },
          { baslik:'Run the report', aciklama:'Base amounts and tax amounts are listed by tax code.' },
          { baslik:'**Compare against the trial balance**',
            aciklama:'The report\'s output-VAT total must equal the 391 balance in {{FBL3N}}; ' +
                     'the deductible total must equal the 191 balance. **They must match one to one.**' },
          { baslik:'Investigate any difference',
            aciklama:'Usually one of two causes: an entry was posted **manually** to the tax ' +
                     'account, or a document was entered without a tax code.' },
        ],
        ipucu:'This report is produced from the {{BSET}} table, not {{BSEG}}. An entry posted ' +
              'manually to the tax account affects {{BSEG}} but writes no line into {{BSET}} — ' +
              'that\'s the most common reason the report and the trial balance diverge.',
        hatalar:[
          { mesaj:'The report total doesn\'t match the account balance', sebep:'An entry was posted manually to the tax account, or a document exists without a tax code.', cozum:'In {{FBL3N}}, look for lines with document type SA on account 191/391; that\'s usually the culprit.' },
        ],
        ilgili:['FBL3N','BSET','FTXP'] },

      { kod:'F.12', ad:'Tax extract (advance return list)',
        amac:'Lists tax items by document; shows which documents a declaration-report total came from.',
        neZaman:'When a declaration-report amount needs to be broken down; during an audit.',
        adimlar:[
          { baslik:'Enter the company code, period, and tax code' },
          { baslik:'Run the report', aciklama:'Base amount and tax amount are shown document by document.' },
          { baslik:'Double-click a suspicious document', aciklama:'Jumps into the document via {{FB03}}.' },
        ],
        ipucu:'When the declaration report and the trial balance don\'t match, the diagnostic order ' +
              'is: **1)** see the total with {{S_ALR_87012357}}, **2)** get the document breakdown ' +
              'with {{F.12}}, **3)** pull the account movements with {{FBL3N}}, **4)** compare the ' +
              'two lists — the document left over is the culprit.',
        ilgili:['S_ALR_87012357','FB03','FBL3N'] },

      { kod:'OBZT', ad:'Allowed tax codes per transaction',
        amac:'Restricts which tax code can be selected on which transaction.',
        neZaman:'To reduce user errors, especially when there are many codes.',
        adimlar:[
          { baslik:'Choose the transaction type', aciklama:'Input tax / output tax.' },
          { baslik:'List the allowed codes', aciklama:'The user can then see only these codes.' },
        ],
        ipucu:'A simple but effective safeguard: allowing only **A** codes on sales transactions ' +
              'and only **V** codes on purchase transactions eliminates the direction error entirely.',
        ilgili:['FTXP','FB60','FB70'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'The **one critical point** to understand in tax\'s table architecture is this: tax ' +
      'information is held not in {{BSEG}} but in **{{BSET}}**. The declaration is produced from ' +
      '{{BSET}}. This split is the answer to "why doesn\'t the report match the trial balance?"',

    liste:[
      { ad:'BSET', baslik:'Tax lines — the declaration\'s source',
        tutar:'Every document\'s tax information: base amount, tax amount, tax code, transaction key.',
        olusturan:'Every FI document that carries a tax code',
        guncelleyen:'The document posting; a reversal adds a new line',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'To {{BKPF}} via the document key; to {{T007A}} via the tax code.',
        s4:'Still there. {{ACDOCA}} carries the tax amount too, but **the declaration still relies on BSET**.',
        alanlar:[
          { ad:'HWBAS', aciklama:'The **base amount** (local currency) — the amount the tax is calculated on' },
          { ad:'HWSTE', aciklama:'The **tax amount** (local currency)' },
          { ad:'MWSKZ', aciklama:'Tax code', tip:'fk' },
          { ad:'KTOSL', aciklama:'Transaction key — MWS / VST / NAV' },
          { ad:'KSCHL', aciklama:'Condition type — comes from the calculation procedure' },
        ] },

      { ad:'T007A', baslik:'Tax code definitions',
        tutar:'The country, type, and procedure information of codes defined via {{FTXP}}.',
        olusturan:'{{FTXP}}',
        guncelleyen:'{{FTXP}}',
        anahtar:'KALSM + MWSKZ',
        iliskiler:'{{BSET}} `MWSKZ` points to this table.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KALSM', aciklama:'Tax calculation procedure — country-dependent' },
          { ad:'MWSKZ', aciklama:'Tax code (2 characters)' },
          { ad:'MWART', aciklama:'**A** output · **V** input — can\'t be changed once saved' },
        ] },

      { ad:'T030K', baslik:'Tax account determination — "which account does the tax go to?"',
        tutar:'Which G/L account a tax transaction is posted to. At posting time the system reads ' +
              'this table and finds account 191 or 391.',
        olusturan:'{{OB40}}',
        guncelleyen:'{{OB40}}; changes reach the system via a transport request',
        anahtar:'**KTOPL** (chart of accounts) + **KTOSL** (transaction key) + **MWSKZ** (tax code)',
        iliskiler:'The tax code is read from {{T007A}} → the account is found here → it\'s written ' +
                  'to {{BSEG}} `HKONT` and {{BSET}}. **It\'s the tax member of the {{T030}} family**; ' +
                  '{{OBYC}} (MM) and {{VKOA}} (SD) write to the same family.',
        s4:'Unchanged — still the single source of tax account determination in S/4HANA too.',
        alanlar:[
          { ad:'KTOPL', aciklama:'**Chart of accounts** — the first field of the key. A separate line is needed for company codes using a different chart of accounts.' },
          { ad:'KTOSL', aciklama:'**Transaction key** — the tax\'s type. `MWS` output · `VST` deductible · `NAV` non-deductible · `NVV` non-deductible/distributed' },
          { ad:'MWSKZ', aciklama:'**Tax code** — only filled if "split by tax code" is flagged. **If blank, every code under that key goes to the same account.**' },
          { ad:'KONTS', aciklama:'**The determined G/L account** — 191 deductible, 391 output' },
          { ad:'KONTH', aciklama:'The credit-side account — in setups where debit/credit are split' },
        ] },

      { ad:'BSEG', baslik:'Document line items',
        tutar:'The tax **item** exists here too (the 191/391 line), but there\'s no base-amount information.',
        olusturan:'A document posting',
        s4:'{{uyumluluk-view}}.',
        alanlar:[
          { ad:'MWSKZ', aciklama:'The item\'s tax code' },
          { ad:'HKONT', aciklama:'The tax account (191/391)' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Tax table relationships — why is BSET separate?',
      varliklar:[
        { ad:'T007A', rol:'Configuration', aciklama:'Tax code definition',
          alanlar:[{ ad:'KALSM', tip:'pk' }, { ad:'MWSKZ', tip:'pk' }, { ad:'MWART' }] },
        { ad:'T030K', rol:'Configuration', aciklama:'Tax account',
          alanlar:[{ ad:'KTOSL', tip:'pk' }, { ad:'MWSKZ', tip:'fk' }, { ad:'KONTS' }] },
        { ad:'BKPF', rol:'FI', hub:true, aciklama:'Document header',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }] },
        { ad:'BSEG', rol:'FI', aciklama:'Document line items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'MWSKZ', tip:'fk' }, { ad:'HKONT' }] },
        { ad:'BSET', rol:'Tax', aciklama:'**Tax lines — the declaration\'s source**',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'MWSKZ', tip:'fk' }, { ad:'HWBAS' }, { ad:'HWSTE' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'Universal Journal',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'MWSKZ', tip:'fk' }] },
      ],
      iliskiler:[
        { from:'T007A', to:'BSET', alanlar:'MWSKZ', not:'the code definition' },
        { from:'T030K', to:'BSEG', alanlar:'KONTS → HKONT', not:'the tax account' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'header → line item' },
        { from:'BKPF', to:'BSET', alanlar:'BELNR', not:'**header → tax line**' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR + BUZEI', not:'the universal line' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'From the user\'s point of view, the tax process comes down to a single field: the **tax ' +
      'code**. But behind that field sit three screens — the definition ({{FTXP}}), the account ' +
      '({{OB40}}), and the control ({{S_ALR_87012357}}).',

    ekranlar:[
      { ad:'{{FTXP}} — the tax code definition',
        aciklama:'A country is selected, a code is entered, the type and rate are defined.',
        alanlar:[
          { ad:'Country', zorunlu:true, aciklama:'Tax codes are **country-specific**. The company code\'s country ({{OBY6}}) is what decides.' },
          { ad:'Tax code', zorunlu:true, aciklama:'Two characters. Common convention: A* output, V* input — not mandatory, but following it saves a lot of trouble.' },
          { ad:'Tax type', zorunlu:true, aciklama:'**A** or **V**. **Cannot be changed** once saved.' },
          { ad:'Rate (%)', zorunlu:true, aciklama:'Entered on the relevant transaction-key line. **Should not be changed afterward.**' },
          { ad:'Deductibility', zorunlu:false, aciklama:'A percentage for partial deduction; if blank, treated as 100% deductible.' },
        ],
        ipucu:'Be disciplined about code naming from the start: `V1` 20% deductible, `V2` 10%, `V0` ' +
              '0%, `VN` non-deductible, `A1` 20% output… Years later, once there are 40 codes, this ' +
              'discipline is the only thing that saves you.' },

      { ad:'{{OB40}} — tax account assignment',
        aciklama:'A G/L account is assigned by transaction key.',
        alanlar:[
          { ad:'Transaction key', zorunlu:true, aciklama:'**MWS** output · **VST** deductible · **NAV** non-deductible (added to cost)' },
          { ad:'Chart of accounts', zorunlu:true },
          { ad:'Split by tax code', zorunlu:false, aciklama:'If flagged, a separate account can be defined for each code.' },
          { ad:'G/L account', zorunlu:true, aciklama:'Must be flagged **"post automatically only"** in {{FS00}}.' },
        ],
        ipucu:'**The NAV key is special:** the account assigned to it is generally never actually ' +
              'used — the system adds non-deductible VAT to the related expense/asset line instead. ' +
              'A consultant who doesn\'t know this behavior can waste hours asking "why does nothing ' +
              'ever post to the NAV account?"' },

      { ad:'The entry screen — the tax code field ({{FB60}} / {{FB70}} / {{MIRO}})',
        aciklama:'This is the user\'s only contact with tax.',
        alanlar:[
          { ad:'Tax code', zorunlu:true, aciklama:'Choosing the right code depends on the **user\'s knowledge of the law**; the system can\'t verify it.' },
          { ad:'Calculate tax', zorunlu:false, aciklama:'If checked, the system calculates it from the base amount. **Should stay checked.**' },
          { ad:'Tax amount', zorunlu:false, aciklama:'If entered manually, the system doesn\'t calculate it; shouldn\'t be used for anything but a rounding difference.' },
        ],
        ipucu:'Typing the tax amount manually while the "Calculate tax" box is unchecked is the ' +
              'second most common source of tax errors. Narrowing the code list with {{OBZT}} is ' +
              'the first line of defense.' },
    ],

    zorunlu:['Country','Tax code','Tax type (A/V)','Rate','Transaction key','G/L account'],
    opsiyonel:['Deductibility percentage','Split by tax code','Target tax code'],

    hatalar:[
      { mesaj:'Tax code ... does not exist in company code country ...', sebep:'The tax code isn\'t defined for the company code\'s country.', cozum:'Verify the country with {{OBY6}}; define the code under the right country in {{FTXP}}. Very common in multi-country setups.' },
      { mesaj:'Error in account determination: table T030K key ... MWS', sebep:'No account was assigned in {{OB40}}.', cozum:'{{OB40}} → assign an account to the MWS/VST/NAV line.' },
      { mesaj:'Tax entry not possible in this item', sebep:'The item doesn\'t accept a tax code — the account setting or item type isn\'t suitable.', cozum:'Check the account\'s tax category in {{FS00}} (`-`, `+`, `*`, or blank).' },
      { mesaj:'The difference is too large for clearing / tax amount incorrect', sebep:'A manually entered tax amount deviates from the calculated one by more than the tolerance.', cozum:'Correct the amount, or review the tax tolerance limit. A rounding difference shouldn\'t exceed one or two kuruş.' },
      { mesaj:'The declaration report doesn\'t match the 191/391 balance', sebep:'An entry was posted **manually** to the tax account (writes no line into {{BSET}}), or a document exists without a tax code.', cozum:'In {{FBL3N}}, look for lines with document type SA on the tax account; set the accounts to "post automatically only" in {{FS00}}.' },
    ],

    ipuclari:[
      '**Flag tax accounts as "post automatically only" in {{FS00}}.** A single flag largely ' +
      'prevents the report and the trial balance from diverging.',
      'Never change the **rate** of a code already in use; open a new code instead.',
      'Use {{OBZT}} so purchase transactions only show V* codes and sales transactions only show A* codes.',
      'At month-end, compare the {{S_ALR_87012357}} totals against the 191/391 balances in ' +
      '{{FBL3N}} **every month**.',
      'Don\'t **open** a separate expense account for non-deductible VAT; the NAV mechanism adds ' +
      'the amount to the correct line already.',
      'If {{tevkifat}} is going to be used, the withholding type and code **must be defined** on ' +
      'the vendor master — otherwise the system silently makes no deduction.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BSET', ne:'**Tax lines** — base amount and tax amount; the declaration\'s source' },
      { tablo:'BSEG', ne:'The tax item (the 191/391 line) and the items\' `MWSKZ` field' },
      { tablo:'BKPF', ne:'Document header' },
      { tablo:'ACDOCA', ne:'Universal items; carries the tax code and amount' },
      { tablo:'T007A', ne:'The tax code definition ({{FTXP}})' },
      { tablo:'T030K', ne:'Tax account determination ({{OB40}})' },
    ],

    commit:
      'Tax calculation happens **inside the document posting**, in a single LUW. {{BSEG}} and ' +
      '{{BSET}} are written in the same commit — one can\'t be written without the other.\n\n' +
      'That\'s good news for data integrity, but it has this consequence: an entry posted manually ' +
      'to the tax account **via {{FB50}}** writes a line into {{BSEG}}, **not into {{BSET}}** — ' +
      'because it isn\'t a tax transaction, it\'s a plain G/L posting. That\'s the technical ' +
      'explanation for why the declaration report and the trial balance diverge.',

    belgeNo:
      'Tax has no document number of its own; it\'s part of the main document. {{BSET}} lines are ' +
      'numbered under the same `BELNR` with `BUZEI`.',

    postingLogic:
      'The tax calculation chain:\n\n' +
      '**1.** The user selects the tax code.\n' +
      '**2.** The system reads the code\'s type (A/V) and procedure from {{T007A}}.\n' +
      '**3.** The calculation procedure finds the rate and computes the tax from the base amount.\n' +
      '**4.** {{T030K}} determines the account based on the transaction key (MWS/VST/NAV).\n' +
      '**5.** **If it\'s NAV**, the amount doesn\'t become a separate line — it\'s **added** to the ' +
      'related expense/asset line.\n' +
      '**6.** The {{BSEG}} tax item and the {{BSET}} tax line are written together.\n\n' +
      'On a partial deduction, steps 3 and 5 work together: part of the amount goes to the VST ' +
      'account, the rest goes into the cost.',

    belgeTuru:
      'The document type doesn\'t affect tax, but the document type **can affect tax**: in ' +
      '{{OBA7}}, the account types allowed for a document type can constrain whether a tax item can ' +
      'even form. Also, a reversal document type (`AB`, `KA`) reverses the tax line too.',

    numberRange:
      'Tax has no number range of its own. However, in countries that use **official document ' +
      'numbering** for the VAT return, a separate range is defined; in Turkish setups, e-invoice ' +
      'numbering is tied to this mechanism.',

    accountDetermination:
      '{{OB40}} → {{T030K}}. Transaction keys:\n\n' +
      '**MWS** — output (calculated) VAT → 391\n' +
      '**VST** — deductible (input) VAT → 191\n' +
      '**NAV** — non-deductible VAT → *an account is assigned but unused*; the amount is added to the expense/asset line\n' +
      '**NVV** — non-deductible, distributed across the account assignment\n\n' +
      'The same architecture works as {{OBYC}} in MM and {{VKOA}} in SD — **all three write to the ' +
      '{{T030}} family**.',

    tur:
      '**Configuration:** tax codes ({{FTXP}}), account assignments ({{OB40}}), the calculation ' +
      'procedure, allowed code lists ({{OBZT}}).\n\n' +
      '**Master data:** the account\'s tax category ({{SKB1}}), the vendor/customer\'s withholding information.\n\n' +
      '**Transaction data:** {{BSET}} lines.',

    transport:
      '**Tax codes behave as if they don\'t transport — and that\'s a trap.** The *structure* of a ' +
      'code defined in {{FTXP}} goes into a transport request, but the **rates** don\'t transport ' +
      'in most setups — they have to be entered separately in the target system.\n\n' +
      'The result: a code that calculates 20% in test may calculate **0%** in production, with no ' +
      'error at all. On go-live, **every tax code\'s rate must be verified one by one**.\n\n' +
      'The {{OB40}} account assignments transport normally.',

    img:[
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Tax on Sales/Purchases → Calculation → Define Tax Codes for Sales and Purchases', not:'{{FTXP}}' },
      { yol:'SPRO → Financial Accounting → … → Tax on Sales/Purchases → Posting → Define Tax Accounts', not:'{{OB40}} → {{T030K}}' },
      { yol:'SPRO → Financial Accounting → … → Tax on Sales/Purchases → Basic Settings → Assign Country to Calculation Procedure', not:'The country ↔ procedure match' },
      { yol:'SPRO → Financial Accounting → … → Withholding Tax → Extended Withholding Tax', not:'{{tevkifat}} configuration' },
    ],

    ekstra:[
      { ic:'🗂️', baslik:'{{T030K}} — the anatomy of tax account determination', metin:
        'The user types `V1` on an invoice and the system finds account 191. The table that makes ' +
        'that lookup happen is **{{T030K}}**.\n\n' +
        '**The key has three fields:**\n\n' +
        '`KTOPL` **chart of accounts** — which chart of accounts we\'re working in\n' +
        '`KTOSL` **transaction key** — the type of tax\n' +
        '`MWSKZ` **tax code** — *(optional, see below)*\n\n' +
        '---\n\n' +
        '**What do the transaction keys mean?**\n\n' +
        '`MWS` **output (calculated) VAT** → 391. Arises on sales invoices.\n\n' +
        '`VST` **deductible (input) VAT** → 191. Arises on purchase invoices.\n\n' +
        '`NAV` **non-deductible VAT** → an account is assigned but **not used**. The system ' +
        '**adds** the amount to the related expense/asset line. (This behavior is the subject of a ' +
        'separate block below.)\n\n' +
        '`NVV` a variant of non-deductible that\'s distributed across the account assignment.\n\n' +
        '---\n\n' +
        '**The subtlety of the third field (`MWSKZ`)**\n\n' +
        'There\'s a flag in {{OB40}} called **"split by tax code"**, and it fundamentally changes ' +
        'the behavior:\n\n' +
        '**Unchecked (the default):** the `MWSKZ` field stays **blank**. **All the tax codes** ' +
        'under that transaction key go to **the same account**. V1, V2, V0 — all to 191.\n\n' +
        '**Checked:** a **separate line** can be defined for each tax code. V1 → 191001, V2 → 191002, and so on.\n\n' +
        'When is it needed? When different rates need to be tracked in separate accounts, or when ' +
        'non-deductible VAT needs to be kept in its own account.\n\n' +
        '**Flagging it after the fact is risky:** past postings stay in the old account, new ones ' +
        'go into the new one, and the account balances stop meaning anything.\n\n' +
        '---\n\n' +
        '**The most common error: a missing line**\n\n' +
        '*"Error in account determination: table T030K key TR MWS"*\n\n' +
        'The message gives the exact missing key: chart of accounts **TR**, transaction key ' +
        '**MWS**. That line isn\'t defined in {{OB40}}.\n\n' +
        'A classic scenario in multi-chart-of-accounts setups: it\'s defined for one chart of ' +
        'accounts and forgotten for the other. A tax posting that works in test throws an error in production.\n\n' +
        '**Check:** verify that the MWS and VST lines exist for **every chart of accounts** in use.' },

      { ic:'🚫', baslik:'Changing the rate: the most expensive tax mistake', metin:
        'When the VAT rate goes from 18% to 20%, there are two paths:\n\n' +
        '**The wrong path:** change the existing V1 code\'s rate from 18 to 20. Result: past ' +
        'documents sit in {{BSET}} at 18%, new ones at 20% — the data itself is correct. But **the ' +
        'declaration report sums both under the same code**, and the average rate comes out ' +
        'neither 18% nor 20%. In an audit, the question "which rate does this amount come from?" ' +
        'can\'t be answered.\n\n' +
        '**The right path:** open a new code (say V3 = 20%), and retire the old one. Each code ' +
        'represents exactly one rate, past-period reports stay intact, and the code-based breakdown ' +
        'is clear in an audit.\n\n' +
        '**General rule:** *the rate of a tax code already in use is never changed.* This is ' +
        'something SAP doesn\'t technically block, but accounting discipline forbids.' },

      { ic:'🔍', baslik:'NAV: an account is assigned but not used', metin:
        'A tax account is assigned to the **NAV** transaction key in {{OB40}} — but that account ' +
        'generally **never receives a posting**. The reason: non-deductible VAT isn\'t recorded as ' +
        'a separate line; it\'s **added** to the related expense or asset line.\n\n' +
        'So 10,000 TRY of expense + 2,000 TRY of non-deductible VAT → a single line: **12,000 TRY expense**.\n\n' +
        'The assigned account only comes into play in some special scenarios (amounts that can\'t ' +
        'be distributed). A consultant who doesn\'t know this behavior can search configuration for ' +
        'hours wondering "why does nothing ever post to the NAV account?"\n\n' +
        'The instructive conclusion: **non-deductible VAT isn\'t a tax item, it\'s a cost item.** ' +
        'SAP\'s behavior reflects this accounting reality exactly.' },
    ],

    notlar:[
      { tip:'warn', baslik:'A tax account should never receive a manual entry', metin:
        'An entry posted to account 191 or 391 via {{FB50}} writes a line into {{BSEG}} but ' +
        '**doesn\'t write one into {{BSET}}**. Because the declaration report is produced from ' +
        '{{BSET}}, that amount **doesn\'t appear** in the declaration — but it does appear on the ' +
        'trial balance.\n\n' +
        'Result: the report and the trial balance diverge, and the reason is only tracked down months later.\n\n' +
        'Prevention: flag tax accounts in {{FS00}} as **"post automatically only."** A single ' +
        'checkbox closes off this whole class of error.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'Tax architecture **barely changed at all** in S/4HANA: {{FTXP}}, {{OB40}}, {{BSET}} are the ' +
      'same. What changed is reporting getting faster through {{ACDOCA}}, and, in some countries, ' +
      'e-declaration integration through SAP Document and Reporting Compliance.',

    eccFarklari:[
      { konu:'{{FTXP}} / {{OB40}}', ecc:'Tax code and account definition', s4:'**Unchanged**' },
      { konu:'{{BSET}}', ecc:'Tax lines', s4:'**Still there** — the declaration is still produced from it' },
      { konu:'Tax amount', ecc:'{{BSEG}} + {{BSET}}', s4:'+ {{ACDOCA}} (for reporting)' },
      { konu:'Declaration report', ecc:'{{S_ALR_87012357}}', s4:'Same + Fiori tax apps' },
      { konu:'E-declaration / e-invoice', ecc:'Country add-ons', s4:'SAP Document and Reporting Compliance' },
      { konu:'Performance', ecc:'Reporting is slow over a large {{BSET}}', s4:'Markedly faster with HANA' },
    ],

    universalJournal:
      '{{ACDOCA}} carries the tax code and amount at the line level. This is a great convenience ' +
      '**for analysis**: questions like "how much non-deductible VAT is there in which profit ' +
      'center?" can be answered from a single table.\n\n' +
      '**But the declaration is still produced from {{BSET}}** — because the declaration needs a ' +
      'base-amount breakdown, and the base amount is {{BSET}}\'s concern, not {{ACDOCA}}\'s. Not ' +
      'knowing this split leads to the wrong answer to "did BSET go away in S/4HANA?" **It didn\'t.**',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'{{FTXP}}, {{OB40}}, {{F.12}}, {{S_ALR_87012357}} were **not removed**' },
    ],

    fiori:[
      { ad:'Manage Tax Items', aciklama:'Lists and filters tax items.' },
      { ad:'Tax Declaration', aciklama:'Prepares and reviews declaration data.' },
      { ad:'Display Financial Document', aciklama:'In place of {{FB03}}; tax lines are visible.' },
      { ad:'Document and Reporting Compliance', aciklama:'Country-based e-declaration and e-invoice integration.' },
    ],

    compatibilityViews:[
      '{{BSET}}, {{T007A}}, {{T030K}} — **still physical tables**.',
      'The {{BSEG}} tax item is read via a compatibility view.',
      'Structurally, tax is the FI area least affected by the S/4HANA migration.',
    ],

    performans:
      'Tax reports were slow in ECC because they scanned the large {{BSET}} table; they got ' +
      'noticeably faster with HANA. The real gain, though, is that {{ACDOCA}} lets tax data be ' +
      'analyzed **together with other dimensions**.',

    bestPractices:[
      'On migration, **verify every tax code\'s rate one by one in the live system** — rates may not transport.',
      'Simplify unused old tax codes on migration; but **don\'t delete ones that have been used** ' +
      '(past documents and reports reference them).',
      'Flag tax accounts as "post automatically only" — migration is a good opportunity to fix this.',
      'Evaluate country-specific e-declaration requirements with Document and Reporting Compliance.',
      'Put the declaration-vs-trial-balance reconciliation into the **monthly routine**; check it ' +
      'especially closely for the first three months after migration.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'The declaration report doesn\'t match the trial balance: where did the 84,000 TRY come from?',
    hikaye:
      'While preparing the May 2027 VAT return, the tax officer at **Anadolu Machinery Inc.** spots ' +
      'a discrepancy: the total output VAT in the {{S_ALR_87012357}} report is **180,000 TRY**, but ' +
      'the trial balance shows account 391\'s balance as **264,000 TRY**.\n\n' +
      'The difference: **84,000 TRY**. Which one is right? Which one does the return get filed against?\n\n' +
      'This scenario shows tax\'s sneakiest class of error, and the diagnostic method for it.',
    veriler:[
      { k:'Company code', v:'1000 · Country TR' },
      { k:'Period', v:'May 2027' },
      { k:'Declaration report — output VAT', v:'180,000 TRY' },
      { k:'Trial balance — 391 balance', v:'264,000 TRY' },
      { k:'**Difference**', v:'**84,000 TRY**' },
    ],

    adimlar:[
      { baslik:'The direction of the difference is determined', tcode:'FBL3N',
        aciklama:'First, look at which side is higher — this narrows the possible causes to two.',
        girdi:[
          { alan:'Account', deger:'391 Output VAT' },
          { alan:'Trial balance', deger:'264,000 TRY' },
          { alan:'Declaration report', deger:'180,000 TRY' },
          { alan:'Conclusion', deger:'**The trial balance is higher** → there\'s an entry that wasn\'t written into {{BSET}}' },
        ],
        not:'The logic: the declaration report comes from {{BSET}}, the trial balance from ' +
             '{{BSEG}}. If the trial balance is higher, there\'s an entry that was **written into ' +
             '{{BSEG}} but not into {{BSET}}**. The only way that happens is a **manually** posted ' +
             'G/L entry.\n\n' +
             'If it had been the other way (report higher), the cause would be different: reversed ' +
             'documents whose tax line wasn\'t cleaned up would be the suspects.' },

      { baslik:'Account movements are filtered by document type', tcode:'FBL3N',
        aciklama:'Account 391\'s movements are grouped by document type.',
        girdi:[
          { alan:'Document type **DR** (customer invoice)', deger:'176,000 TRY — normal sales VAT' },
          { alan:'Document type **RV** (SD invoice)', deger:'4,000 TRY — normal' },
          { alan:'Document type **SA** (G/L posting)', deger:'**84,000 TRY — suspicious**' },
          { alan:'Total', deger:'264,000 TRY' },
        ],
        not:'**A document type SA on a tax account is an alarm signal.** Tax items normally arise ' +
             'from invoice postings (DR/KR/RV). An SA-type tax entry means someone posted **manually**.' },

      { baslik:'The suspicious document is opened', tcode:'FB03',
        aciklama:'The 84,000 TRY SA document is examined.',
        girdi:[
          { alan:'Document', deger:'100004521 · Document type SA · 20.05.2027' },
          { alan:'Description', deger:'"April VAT correction"' },
          { alan:'Posted by', deger:'The accounting manager' },
        ],
        fis:{ baslik:'Document 100004521 — a manual correction', belgeTuru:'SA', tarih:'20.05.2027',
          satirlar:[
            { hesap:'120', ad:'Trade receivables — correction', borc:84000 },
            { hesap:'391', ad:'Output VAT', alacak:84000, not:'**No tax code** → no line was written into {{BSET}}' },
          ], not:'The document is **balanced**, the posting is **valid**, the trial balance is ' +
                 '**correct**. But because no tax code was entered, the system never treated it as a ' +
                 'tax transaction and wrote no line into {{BSET}}. **The return never sees this 84,000 TRY.**' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'An 84,000 TRY credit line **was written** to account 391' },
          { tablo:'BSET', ne:'**No line was written** — the source of the problem' },
        ],
        not:'The manager was trying to correct the VAT on a sale that had been under-invoiced in ' +
             'April, and posted directly to the tax account. From an accounting standpoint the ' +
             '**intent was right**; the method bypassed the tax architecture.' },

      { baslik:'Verification — the document breakdown is pulled with F.12', tcode:'F.12',
        aciklama:'The diagnosis is confirmed with an independent report.',
        girdi:[
          { alan:'Period', deger:'May 2027 · tax code A1' },
          { alan:'Number of documents listed', deger:'312 documents · total 180,000 TRY' },
          { alan:'Document 100004521', deger:'**Not in the list**' },
        ],
        not:'{{F.12}} also reads from {{BSET}}, so it doesn\'t show the suspicious document either. ' +
             'This confirmed the diagnosis from **two independent sources**: the document exists in ' +
             '{{BSEG}}, not in {{BSET}}.' },

      { baslik:'Correction — the document is reversed', tcode:'FB08',
        aciklama:'The manually posted entry is canceled.',
        girdi:[
          { alan:'Reversed', deger:'100004521' },
          { alan:'Reversal reason', deger:'01 — incorrect posting' },
          { alan:'Result', deger:'The 391 balance goes from 264,000 → **180,000 TRY**' },
        ],
        not:'After the reversal, the trial balance and the declaration report **match**. But the ' +
             'actual correction hasn\'t been made yet — the under-invoiced sale is still under-invoiced.' },

      { baslik:'It\'s re-entered the correct way', tcode:'FB70',
        aciklama:'The same correction is entered again, this time **with a tax code** and as a customer invoice.',
        girdi:[
          { alan:'Transaction', deger:'{{FB70}} — customer invoice (document type DR)' },
          { alan:'Base amount', deger:'420,000 TRY' },
          { alan:'Tax code', deger:'**A1** (20% output)' },
          { alan:'Output VAT', deger:'84,000 TRY — **the system calculated it**' },
        ],
        fis:{ baslik:'Document 1800005612 — the correct method', belgeTuru:'DR', tarih:'31.05.2027',
          satirlar:[
            { hesap:'120', ad:'Trade receivables', borc:504000 },
            { hesap:'600', ad:'Domestic sales', alacak:420000, not:'The base amount — {{BSET}} `HWBAS`' },
            { hesap:'391', ad:'Output VAT', alacak:84000, not:'{{OB40}} → MWS · **written into {{BSET}}**' },
          ], not:'This time, because a tax code was entered, the system wrote a line into {{BSET}}. ' +
                 'Also, the **420,000 TRY of revenue** that never appeared in the first entry is now ' +
                 'in the books too — the manual entry had only corrected the VAT and had forgotten the revenue.' },
        tabloEtkisi:[
          { tablo:'BSEG', ne:'The customer, revenue, and VAT items' },
          { tablo:'BSET', ne:'**The tax line was written** — base amount 420,000, tax 84,000' },
          { tablo:'BSID', ne:'A customer open item of 504,000 TRY' },
        ],
        not:'**The manual entry had actually contained two errors:** (1) there was no tax code, ' +
             '(2) the revenue was never recorded at all. The correct method fixed both at once.' },

      { baslik:'Prevention — the tax accounts are locked down', tcode:'FS00',
        aciklama:'The same mistake is made **systemically** impossible to repeat.',
        girdi:[
          { alan:'Accounts', deger:'191 and 391' },
          { alan:'Setting', deger:'**"Post automatically only"** was flagged' },
          { alan:'Effect', deger:'A manual entry to these accounts is **no longer possible**' },
          { alan:'Additional measure', deger:'A monthly reconciliation check was added to the closing checklist' },
        ],
        not:'This single checkbox closes off the whole class of error: the user, even in good ' +
             'faith, can no longer post manually to a tax account and is forced to use the correct process.' },
    ],

    sonuc:
      '**The 84,000 TRY difference came from a single, well-intentioned manual entry** — and that ' +
      'same entry had also skipped 420,000 TRY of revenue.\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. Tax information is held in {{BSET}}, not {{BSEG}}.** The declaration is produced from ' +
      '{{BSET}}. An entry posted to a tax account without a tax code affects the trial balance but ' +
      '**never reaches the declaration**.\n\n' +
      '**2. The direction of the difference splits the diagnosis in two.** If the trial balance is ' +
      'higher, look for a manual entry that wasn\'t written into {{BSET}}; if the report is higher, ' +
      'look for an uncleaned reversal. This split cuts the search down to minutes.\n\n' +
      '**3. Document type SA on a tax account is an alarm signal.** Tax items arise from invoice ' +
      'postings (DR/KR/RV); an SA type shows someone posted manually. It\'s the fastest filter in ' +
      'the diagnosis.\n\n' +
      '**4. The fix belongs in configuration, not in training.** Instead of saying "don\'t do this ' +
      'again," flagging tax accounts as **"post automatically only"** in {{FS00}} makes the error ' +
      'systemically impossible. This is the preferred kind of solution in consulting: ' +
      '**preventing an error is more reliable than reminding people about it.**',
  },

  },
});
