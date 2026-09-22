/* ==========================================================================
   data/tables-en.js: data/tables.js'in İngilizce üst katmanı
   --------------------------------------------------------------------------
   `ad` ile eşleşir, alanlar `_en` ekiyle TR kaydın üstüne MERGE olur
   (js/core.js → registerTablesEn). Çevrilmeyen alan Türkçe kalır.
   `alanlar_en` TR `alanlar` ile AYNI SIRADA olmalıdır: görünüm eşleştirmeyi
   indise göre yapar.
   ========================================================================== */

SAP.registerTablesEn([

  { ad:'BKPF', baslik:'Accounting document header',
    aciklama:'Holds the header information of every FI document: document number, type, date, currency, user. The document\'s "identity" lives here, its "content" in BSEG.',
    olusturan:'FB50, FB60, FB70, F-02, MIRO, VF01, and every transaction that posts to accounting',
    s4:'Still exists in S/4HANA, but the source for reporting is now ACDOCA.',
    alanlar:[
      { aciklama:'Company code' },
      { aciklama:'Document number' },
      { aciklama:'Fiscal year' },
      { aciklama:'Document type (KR, SA, RV…)' },
      { aciklama:'Posting date: this date determines the period' },
      { aciklama:'Document date (the date printed on the invoice)' },
      { aciklama:'Posting period' },
      { aciklama:'Document currency' },
      { aciklama:'Reference (the vendor\'s invoice number)' },
      { aciklama:'Reversing document number' },
      { aciklama:'Source document key (bridge to the MM/SD document)' },
    ] },

  { ad:'BSEG', baslik:'Accounting document line items',
    aciklama:'Holds the document\'s line items: account, amount, debit/credit indicator, cost center, tax code. It is a cluster table: which is why filtering it directly with SELECT is slow.',
    olusturan:'Every transaction that posts an FI document',
    s4:'Still written in S/4HANA, but reporting is done through ACDOCA. Because of its cluster (RFBLG) structure it is much slower than ACDOCA.',
    alanlar:[
      { aciklama:'Company code' },
      { aciklama:'Document number' },
      { aciklama:'Fiscal year' },
      { aciklama:'Line item number' },
      { aciklama:'Posting key' },
      { aciklama:'Debit/credit indicator: S = Soll (debit), H = Haben (credit)' },
      { aciklama:'G/L account' },
      { aciklama:'Vendor number' },
      { aciklama:'Customer number' },
      { aciklama:'Amount in local currency' },
      { aciklama:'Amount in document currency' },
      { aciklama:'Tax code' },
      { aciklama:'Cost center' },
      { aciklama:'Assignment: the matching field for automatic clearing (F.13)' },
      { aciklama:'Clearing document: if filled, the item is cleared' },
      { aciklama:'Clearing date' },
      { aciklama:'Special G/L indicator (down payment, guarantee…)' },
    ] },

  { ad:'ACDOCA', baslik:'Universal Journal entry line items',
    aciklama:'S/4HANA\'s single source of truth. Combines FI, CO, AA, ML and profit center data into one line. Replaces the totals and index tables that used to be kept separately.',
    olusturan:'Every transaction posted in FI/CO',
    s4:'A table introduced with S/4HANA. It has no ECC equivalent; think of it as a merger of BSEG + FAGLFLEXA + COEP + ANEP.',
    alanlar:[
      { aciklama:'Ledger: the field that separates parallel accounting' },
      { aciklama:'Company code' },
      { aciklama:'Document number' },
      { aciklama:'Line item number (6 digits: wider than BSEG\'s BUZEI)' },
      { aciklama:'Account number' },
      { aciklama:'Amount in company code currency' },
      { aciklama:'Amount in document currency' },
      { aciklama:'Amount in group currency' },
      { aciklama:'Debit/credit indicator' },
      { aciklama:'Cost center' },
      { aciklama:'Profit center' },
      { aciklama:'Fixed asset number' },
      { aciklama:'Source document reference' },
    ] },

  { ad:'BSIS', baslik:'G/L open items (index)',
    aciklama:'Holds the uncleared items of G/L accounts managed on an open item basis, for fast access.',
    olusturan:'A posting to an account managed on an open item basis',
    s4:'In S/4HANA the physical table was removed; a compatibility view of the same name returns data through ACDOCA.' },

  { ad:'BSAS', baslik:'G/L cleared items (index)',
    aciklama:'Holds cleared G/L items. When an item is cleared, it moves here from BSIS.',
    s4:'In S/4HANA it was converted into a compatibility view.' },

  { ad:'BSIK', baslik:'Vendor open items (index)',
    aciklama:'Holds unpaid vendor invoices. FBL1N\'s "open items" option and F110\'s selection pool are fed from here.',
    olusturan:'Every posting made to a vendor (FB60, MIRO, F-43)',
    s4:'A compatibility view in S/4HANA; the actual data is in ACDOCA + BSEG.' },

  { ad:'BSAK', baslik:'Vendor cleared items (index)',
    aciklama:'Holds paid vendor items. When payment is made, the item moves here from BSIK.',
    s4:'A compatibility view in S/4HANA.' },

  { ad:'BSID', baslik:'Customer open items (index)',
    aciklama:'Holds uncollected customer invoices; aging and dunning selection are made from here.',
    s4:'A compatibility view in S/4HANA.' },

  { ad:'BSAD', baslik:'Customer cleared items (index)',
    aciklama:'Holds collected customer items.',
    s4:'A compatibility view in S/4HANA.' },

  { ad:'FAGLFLEXA', baslik:'New G/L line item table',
    aciklama:'Holds ledger-based line items in New G/L; carries extended fields such as profit center and segment.',
    s4:'In S/4HANA, ACDOCA took its place; it lives on as a compatibility view.' },

  { ad:'FAGLFLEXT', baslik:'New G/L totals table',
    aciklama:'Holds totals by account/ledger/period. Balance reports used to read from here.',
    s4:'Removed in S/4HANA: totals are now calculated on-the-fly from ACDOCA.' },

  { ad:'GLT0', baslik:'Classic G/L totals',
    aciklama:'Holds debit/credit totals by account and period in classic G/L (the source for FS10N).',
    s4:'In S/4HANA it was converted into a compatibility view.' },

  { ad:'SKA1', baslik:'G/L account: chart of accounts level',
    aciklama:'Holds the chart-of-accounts-level part of the account: number, account group, balance sheet/P&L distinction. Independent of company code.',
    olusturan:'FS00 / FSP0',
    alanlar:[
      { aciklama:'Chart of accounts' },
      { aciklama:'Account number' },
      { aciklama:'Account group: determines the number range and field status' },
      { aciklama:'Is it a balance sheet account? (if blank, it is a P&L account)' },
    ] },

  { ad:'SKB1', baslik:'G/L account: company code level',
    aciklama:'Holds the account\'s company-code-specific settings: currency, tax category, open item management, field status group, reconciliation account type.',
    olusturan:'FS00 / FSS0',
    alanlar:[
      { aciklama:'Company code' },
      { aciklama:'Account number' },
      { aciklama:'Account currency' },
      { aciklama:'Is open item management on? - required for clearing to be possible' },
      { aciklama:'Is line item display on?' },
      { aciklama:'Reconciliation account type: D customer, K vendor, A fixed asset' },
      { aciklama:'Field status group: which field is required/hidden on the posting screen' },
    ] },

  { ad:'SKAT', baslik:'G/L account descriptions',
    aciklama:'Holds account names by language (keyed by SPRAS).' },

  { ad:'LFA1', baslik:'Vendor general data',
    aciklama:'The vendor\'s company-code-independent data: name, address, tax number, account group.',
    olusturan:'XK01 / BP',
    s4:'In S/4HANA it is populated through BP; it is no longer maintained directly with XK01.',
    alanlar:[
      { aciklama:'Vendor number' },
      { aciklama:'Name / title' },
      { aciklama:'Country' },
      { aciklama:'Tax number fields' },
      { aciklama:'Account group' },
      { aciklama:'Block / deletion flag' },
    ] },

  { ad:'LFB1', baslik:'Vendor company code data',
    aciklama:'The vendor\'s accounting data: reconciliation account, payment terms, payment method, payment block.',
    olusturan:'FK01 / XK01 / BP',
    alanlar:[
      { aciklama:'Reconciliation account: the G/L account the vendor\'s balance is reflected in' },
      { aciklama:'Payment terms (due date)' },
      { aciklama:'Permitted payment methods: F110 checks this' },
      { aciklama:'Payment block: if filled, F110 will not pay' },
      { aciklama:'Dunning procedure' },
    ] },

  { ad:'LFM1', baslik:'Vendor purchasing organization data',
    aciklama:'The vendor\'s purchasing-side settings: order currency, delivery terms.' },

  { ad:'LFC1', baslik:'Vendor periodic balances',
    aciklama:'The vendor\'s debit/credit totals by fiscal year and period (the source for FK10N).',
    s4:'A compatibility view in S/4HANA.' },

  { ad:'KNA1', baslik:'Customer general data',
    aciklama:'The customer\'s company-code-independent data: name, address, tax number, account group.',
    olusturan:'XD01 / BP',
    s4:'In S/4HANA it is populated through BP.' },

  { ad:'KNB1', baslik:'Customer company code data',
    aciklama:'The customer\'s accounting data: reconciliation account, payment terms, dunning procedure, payment block.',
    alanlar:[
      { aciklama:'Reconciliation account' },
      { aciklama:'Payment terms' },
      { aciklama:'Dunning procedure' },
      { aciklama:'Dunning block' },
    ] },

  { ad:'MHNK', baslik:'Dunning data: header',
    aciklama:'Holds the dunning history per customer: the last dunning date, the dunning level reached.',
    olusturan:'{{F150}} dunning run' },

  { ad:'MHND', baslik:'Dunning data: item',
    aciklama:'Holds which item was dunned at which dunning level.',
    olusturan:'{{F150}}' },

  { ad:'KNVV', baslik:'Customer sales area data',
    aciklama:'The customer\'s data by sales organization: price group, delivery priority, tax classification.' },

  { ad:'KNC1', baslik:'Customer periodic balances',
    aciklama:'The customer\'s debit/credit totals by period (the source for FD10N).',
    s4:'A compatibility view in S/4HANA.' },

  { ad:'ANLA', baslik:'Fixed asset master data',
    aciklama:'The asset\'s identity information: class, description, capitalization date, inventory number.',
    olusturan:'AS01',
    alanlar:[
      { aciklama:'Main asset number' },
      { aciklama:'Asset sub-number' },
      { aciklama:'Asset class: brings in account determination' },
      { aciklama:'Capitalization date: the start of depreciation' },
    ] },

  { ad:'ANLB', baslik:'Asset depreciation area data',
    aciklama:'Holds the depreciation key and useful life for each depreciation area. The same asset can see different depreciation in different areas: this is where the tax vs. reporting distinction comes from.' },

  { ad:'ANLC', baslik:'Asset annual value totals',
    aciklama:'Holds the asset\'s acquisition value, accumulated depreciation, and period depreciation by year. AW01N\'s values tab reads from here.',
    s4:'In S/4HANA, values are held in ACDOCA; ANLC exists for compatibility.' },

  { ad:'ANEP', baslik:'Asset transaction line items',
    aciklama:'Holds every transaction made to an asset (acquisition, retirement, transfer, value adjustment) together with its transaction type.',
    olusturan:'ABZON, F-90, ABAVN, ABUMN',
    s4:'Moved to ACDOCA in S/4HANA; ANEP is a compatibility view.' },

  { ad:'ANEA', baslik:'Asset transaction: depreciation portion',
    aciklama:'Holds how much of the accumulated depreciation is to be written off in retirement transactions.' },

  { ad:'ANLZ', baslik:'Asset time-dependent data',
    aciklama:'Holds assignments that can change over time, cost center, plant, person responsible, together with their validity date.' },

  { ad:'ANEK', baslik:'Asset document header',
    aciklama:'Links the header information of asset documents to the FI document.' },

  { ad:'BNKA', baslik:'Bank master data',
    aciklama:'Holds the bank name, SWIFT code, and address by country + bank key. Both the company\'s and business partners\' banks are here.' },

  { ad:'T012', baslik:'House bank definition',
    aciklama:'Defines the banks the company code works with.',
    s4:'Managed with Bank Account Management (BAM) in S/4HANA.' },

  { ad:'T012K', baslik:'House bank account IDs',
    aciklama:'Holds the IBAN and the corresponding G/L account of each house bank account. F110\'s bank determination checks this.' },

  { ad:'REGUH', baslik:'Payment run: payment headers',
    aciklama:'The header of every payment F110 produces: payee, amount, bank, payment method, payment document number.',
    olusturan:'F110 proposal and payment run',
    alanlar:[
      { aciklama:'Run date' },
      { aciklama:'Run identification' },
      { aciklama:'If X, this line is only a proposal, not an actual payment' },
      { aciklama:'Payment amount' },
      { aciklama:'Payment document number' },
    ] },

  { ad:'REGUP', baslik:'Payment run: paid items',
    aciklama:'Holds which invoice items each payment cleared. This is the answer to "which invoices did this payment clear?"',
    olusturan:'F110' },

  { ad:'REGUV', baslik:'Payment run: control record',
    aciklama:'Holds the status of the run: were the parameters entered, was the proposal generated, was payment made.' },

  { ad:'PAYR', baslik:'Check register',
    aciklama:'Holds printed/used checks with number, payee, amount, and encashment status (the source for FCHN).' },

  { ad:'FEBKO', baslik:'Bank statement header',
    aciklama:'Header information of every uploaded bank statement: bank, account, statement number, opening/closing balance.' },

  { ad:'FEBEP', baslik:'Bank statement line items',
    aciklama:'The statement\'s lines: bank transaction code, amount, note-to-payee text, and posting status. Unmatched lines in FEBAN come from this table.' },

  { ad:'T001', baslik:'Company code definition',
    aciklama:'The company code\'s name, country, local currency, chart of accounts, fiscal year variant, and field status variant.',
    alanlar:[
      { aciklama:'Company code' },
      { aciklama:'Local (company code) currency' },
      { aciklama:'Operating chart of accounts' },
      { aciklama:'Fiscal year variant' },
    ] },

  { ad:'T001B', baslik:'Posting period open/close definition',
    aciklama:'Holds the period-open/close rows entered in OB52. The table to check for the "Posting period not open" error.' },

  { ad:'NRIV', baslik:'Number range counters',
    aciklama:'Holds the lower/upper limit of every number range and its **current counter value**. This is the technical answer to where a document number comes from.',
    olusturan:'{{FBN1}} and other number range transactions',
    s4:'Unchanged. If the counter is not updated after data migration, number collisions occur.',
    alanlar:[
      { aciklama:'Number range key' },
      { aciklama:'The range\'s lower and upper limits' },
      { aciklama:'**Current counter**: the next document is taken from above this value' },
    ] },

  { ad:'T003', baslik:'Document type definition',
    aciklama:'Holds the name of the document type, its number range, and the permitted account types.' },

  { ad:'TBSL', baslik:'Posting key definition',
    aciklama:'Holds the debit/credit direction of each posting key and which account type it permits.' },

  { ad:'T030', baslik:'Automatic account determination',
    aciklama:'Holds the G/L accounts corresponding to the transaction key + valuation class combination. OBYC and OB40 write to this table.' },

  { ad:'T009', baslik:'Fiscal year variant',
    aciklama:'Holds the number of normal and special periods in the year, and the period boundaries.' },

  { ad:'T004', baslik:'Chart of accounts definition',
    aciklama:'Holds the chart of accounts ID, name, language, and account number length.' },

  { ad:'T077S', baslik:'G/L account group',
    aciklama:'Holds account groups and their number ranges.' },

  { ad:'TCURR', baslik:'Exchange rate table',
    aciklama:'Holds exchange rates by exchange rate type (M, B, G) + currency pair + date. The source for valuation and translation.' },

  { ad:'TCURV', baslik:'Exchange rate type definition',
    aciklama:'Defines exchange rate types (average, buying, selling) and their behavior.' },

  { ad:'CDHDR', baslik:'Change document header',
    aciklama:'Holds who changed what and when in a master record/document. The first place to look for audit questions.' },

  { ad:'CDPOS', baslik:'Change document items',
    aciklama:'Holds what the old and new value of each field was.' },

  { ad:'EKKO', baslik:'Purchase order header',
    aciklama:'The order\'s vendor, date, purchasing organization.' },
  { ad:'EKPO', baslik:'Purchase order line items',
    aciklama:'Material, quantity, price, account assignment category. The reference for the three-way match in invoice verification.' },
  { ad:'EKBE', baslik:'Purchase order history',
    aciklama:'Holds all goods receipt and invoice movements of an order item. The single place for "how much goods arrived against this order, how much was invoiced?"',
    olusturan:'{{MIGO}} (goods receipt) and {{MIRO}} (invoice receipt)',
    alanlar:[
      { aciklama:'Transaction type: 1 = goods receipt, 2 = invoice receipt' },
      { aciklama:'Quantity' },
      { aciklama:'Amount' },
      { aciklama:'Related material or invoice document' },
    ] },

  { ad:'RBKP', baslik:'Logistics invoice header',
    aciklama:'The header of an invoice entered with {{MIRO}}: vendor, amount, date, block status. Separate from the FI document: the invoice record on the MM side.',
    olusturan:'{{MIRO}}',
    alanlar:[
      { aciklama:'Invoice document number' },
      { aciklama:'Vendor' },
      { aciklama:'Gross invoice amount' },
      { aciklama:'Payment block: set automatically if there is a price/quantity variance' },
    ] },

  { ad:'RSEG', baslik:'Logistics invoice line items',
    aciklama:'The lines of an {{MIRO}} invoice; holds which order item each corresponds to.',
    olusturan:'{{MIRO}}',
    alanlar:[
      { aciklama:'Purchase order and item' },
      { aciklama:'Invoiced quantity' },
      { aciklama:'Item amount' },
    ] },

  { ad:'T042', baslik:'Payment program: company code settings',
    aciklama:'Holds the payment program configuration entered in {{FBZP}}: paying company code, tolerance days, minimum amount.',
    olusturan:'{{FBZP}}' },

  { ad:'KNKK', baslik:'Customer credit management data',
    aciklama:'Holds the customer\'s credit limit and utilized exposure by credit control area.',
    s4:'SAP Credit Management (table UKMBP_CMS_SGM) is used in S/4HANA; KNKK exists for compatibility.' },

  { ad:'MSEG', baslik:'Material document line items',
    aciklama:'The lines of a goods movement; the movement type (301, 101, 201…) and valuation class determine the FI posting.' },
  { ad:'VBRK', baslik:'SD billing document header',
    aciklama:'The invoice\'s customer, date, net amount, and posting-to-accounting status (the RFBSK field).' },
  { ad:'VBRP', baslik:'SD billing document line items',
    aciklama:'Invoice lines; revenue account determination checks these lines\' material/account determination group.' },

  { ad:'T007A', baslik:'Tax codes',
    aciklama:'Holds the tax codes defined with {{FTXP}}: country, code, tax type (A = output/calculated, V = input/deductible).',
    olusturan:'{{FTXP}}',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Tax calculation procedure (country-dependent)' },
      { aciklama:'Tax code: two characters' },
      { aciklama:'Tax type: **A** output (calculated), **V** input (deductible)' },
    ] },

  { ad:'T030K', baslik:'Tax account determination: which account tax posts to',
    aciklama:'Holds which G/L account a tax transaction posts to. {{OB40}} populates this table. **It is the tax member of the {{T030}} family**: {{OBYC}} in MM and {{VKOA}} in SD write to the same family.',
    olusturan:'{{OB40}}',
    s4:'Unchanged. It remains the single source for tax account determination in S/4HANA as well.',
    alanlar:[
      { aciklama:'**Chart of accounts**: the first field of the key. A different chart of accounts means a different row.' },
      { aciklama:'**Transaction key**: specifies the type of tax: `MWS` calculated (output) VAT · `VST` deductible (input) VAT · `NAV` non-deductible · `NVV` non-deductible, distributed to the account assignment' },
      { aciklama:'**Tax code**: only filled when "differentiate by tax code" is checked. If blank, **all codes** under that transaction key go to the same account.' },
      { aciklama:'**Determined G/L account**: 191 deductible, 391 calculated VAT' },
      { aciklama:'Credit-side account (in setups where debit/credit are separated)' },
    ] },

  { ad:'BSET', baslik:'Tax line items',
    aciklama:'Holds the document\'s tax information **separately**: tax base, tax amount, tax code. The VAT return is produced from here, not from {{BSEG}}.',
    olusturan:'Every FI document that contains tax',
    s4:'Still exists; {{ACDOCA}} carries the tax amount, but the return is still based on BSET.',
    alanlar:[
      { aciklama:'**Tax base**: the amount the tax is calculated on (local currency)' },
      { aciklama:'Tax amount (local currency)' },
      { aciklama:'Tax code' },
      { aciklama:'Transaction key: MWS / VST / NAV' },
    ] },

  { ad:'CSKS', baslik:'Cost center master data',
    aciklama:'Holds the definition of cost centers and their **profit center assignment**. The profit center in the FI posting is derived from this assignment.',
    olusturan:'{{KS01}}',
    s4:'Unchanged; linked to {{ACDOCA}} via the `KOSTL` field.',
    alanlar:[
      { aciklama:'Controlling area' },
      { aciklama:'Cost center' },
      { aciklama:'**Validity end date**: part of the key; time-sliced master data' },
      { aciklama:'{{kar-merkezi}}: derived into the FI posting from here' },
      { aciklama:'Person responsible' },
    ] },

  { ad:'CSKB', baslik:'Cost element master data (controlling-area level)',
    aciklama:'The CO-side counterpart of the G/L account. **If there is no cost element, the expense account never flows into CO at all.**',
    olusturan:'{{KA01}}',
    s4:'In S/4HANA, the cost element is a **property** of the G/L account (within {{FS00}}); the separate {{KA01}} requirement is gone.',
    alanlar:[
      { aciklama:'Cost element: **identical** to the G/L account number' },
      { aciklama:'**Category:** 1 primary · 11 revenue · 42 assessment · 43 settlement of internal activity' },
    ] },

  { ad:'CSKA', baslik:'Cost element (chart-of-accounts level)',
    aciklama:'The chart-of-accounts-level definition of the cost element; {{CSKB}} is its controlling-area-level counterpart.',
    olusturan:'{{KA01}}' },

  { ad:'COEP', baslik:'CO actual line items (ECC)',
    aciklama:'Actual cost line items on the CO side. In ECC these were kept **separate** from FI and required reconciliation.',
    olusturan:'An FI posting or a CO transaction',
    s4:'**Merged into {{ACDOCA}}**: FI and CO are now in the same table; the concept of reconciliation is gone.',
    alanlar:[
      { aciklama:'CO object (cost center, internal order…)' },
      { aciklama:'Cost element' },
      { aciklama:'Amount in the object\'s currency' },
    ] },

  { ad:'AUFK', baslik:'Order master data (internal order)',
    aciklama:'The definition, type, status, and settlement rule of internal orders. Costs accumulate here and are transferred to the target with {{KO88}}.',
    olusturan:'{{KO01}}',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Order number' },
      { aciklama:'Order type: determines behavior and number range' },
      { aciklama:'Status: created · released · technically complete · closed' },
    ] },

  { ad:'VBKPF', baslik:'Parked document header',
    aciklama:'The header of parked (not yet posted) documents. **Has no effect on the trial balance**; once approved it moves to {{BKPF}}.',
    olusturan:'{{FV50}} / {{FV60}} / {{FBV1}}',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Document number: **assigned at the time of parking**, the same number is used once posted' },
      { aciklama:'Document status: **V** parked · **Z** statistical' },
      { aciklama:'User who parked it: the basis for the four-eyes control' },
    ] },

  { ad:'VBSEG', baslik:'Parked document line items',
    aciklama:'The lines of a parked document. Split into sub-tables by account type (VBSEGK vendor, VBSEGD customer, VBSEGS G/L).',
    olusturan:'The parking transaction',
    s4:'Unchanged.' },

  { ad:'T047', baslik:'Dunning procedure definition',
    aciklama:'Header data of the dunning procedure defined with {{FBMP}}: dunning interval, number of levels, minimum amounts.',
    olusturan:'{{FBMP}}',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Dunning procedure code' },
      { aciklama:'Dunning interval (days): the minimum time between two dunning notices' },
    ] },

  { ad:'TKA01', baslik:'Controlling area definition',
    aciklama:'The controlling area\'s currency, chart of accounts, and fiscal year variant settings; which company codes are assigned is determined here.',
    olusturan:'{{OKKP}}',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Controlling area' },
      { aciklama:'Chart of accounts: **must be the same as the company codes**' },
      { aciklama:'Controlling area currency' },
    ] },

  { ad:'EDOCUMENT', baslik:'E-document header: the accounting document\'s electronic twin',
    aciklama:'Holds the **status and the link to the source document** of every e-document. It is a **separate object** from the accounting document: even if {{BKPF}} succeeds, the status here can still be **error** or **rejected**.',
    olusturan:'When an invoice posting (FI or SD) triggers the e-document trigger',
    s4:'In S/4HANA it is under the **DRC** (Document and Reporting Compliance) framework; the table structure is preserved.',
    alanlar:[
      { aciklama:'E-document ID' },
      { aciklama:'Source type: whether it is an FI invoice or an SD invoice' },
      { aciklama:'Source document key: the link to {{BKPF}} / {{VBRK}}' },
      { aciklama:'E-document type: e-invoice, e-archive, e-waybill' },
      { aciklama:'**Status**: created / sent / accepted / **rejected** / error' },
      { aciklama:'Processing status: whether resubmission is required' },
    ] },

  { ad:'EDOCUMENTFILE', baslik:'E-document file: the sent XML itself',
    aciklama:'Stores the generated **UBL-TR XML** and the response files returned by the GİB (Turkish Revenue Administration). It is the single definitive answer to *"what did we send in the invoice?"*: not the screen, the **file actually sent** is what counts.',
    olusturan:'E-document generation and every response received',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'E-document ID' },
      { aciklama:'Whether it is the outgoing XML or the incoming response' },
      { aciklama:'**XML content**: the place to check in case of a discrepancy' },
    ] },

  { ad:'EDIDC', baslik:'IDoc control record: where the status is kept',
    aciklama:'Holds the header and **status** of every {{idoc}}. This is the technical basis for the IDoc\'s biggest advantage: a failed message **is not lost**: it stays in the table with its status and can be reprocessed with {{BD87}}.',
    olusturan:'IDoc receipt or generation',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'IDoc number' },
      { aciklama:'**Status**: 53 successful · 51 application error · **56 no partner profile**' },
      { aciklama:'Message type: which business object' },
      { aciklama:'Direction: 1 outbound, 2 inbound' },
      { aciklama:'Sender / receiver partner: must match the {{WE20}} profile' },
    ] },

  { ad:'BALHDR', baslik:'Application log header',
    aciklama:'Holds the header of the logs produced by **batch jobs** like {{F110}}, {{AFAB}}, {{FF_5}}. It is the **detail behind** the on-screen summary "3 errors occurred". {{SLG1}} reads this table.',
    olusturan:'Every batch program that writes an application log',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Log number' },
      { aciklama:'Application object: whose log it is' },
      { aciklama:'Sub-object: the type of run' },
      { aciklama:'Log date' },
      { aciklama:'User who ran it' },
      { aciklama:'**Highest message class**: 1 very critical … 4 information' },
    ] },

  { ad:'TSTC', baslik:'Transaction code definitions',
    aciklama:'Holds **all** transaction codes in the system and the program behind each. The source for "does this code exist?" and "what does it run?"',
    olusturan:'SAP standard delivery + custom codes created with {{SE93}}',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Transaction code' },
      { aciklama:'The ABAP program behind it' },
      { aciklama:'Screen number' },
      { aciklama:'Type info: dialog / report / parameter transaction' },
    ] },

  { ad:'TSTCT', baslik:'Transaction code texts',
    aciklama:'Descriptions of transaction codes **by language**. If the code name is not known, **searching by description** is done from here: `*invoice*` is entered in the `TEXT` field.',
    olusturan:'SAP standard delivery',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Language key: TR / EN / DE' },
      { aciklama:'Transaction code' },
      { aciklama:'**Description**: the most practical field for searching by code' },
    ] },

  { ad:'GB01', baslik:'Boolean class field control',
    aciklama:'Holds which field can be **used** in validation and **changed** in substitution. If a field cannot be substituted, the reason is a restriction in this table.',
    olusturan:'SAP standard delivery',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Boolean class: **09** for FI documents' },
      { aciklama:'Table and field name (BKPF/BSEG fields)' },
      { aciklama:'**Excluded from substitution** flag: if set, that field cannot be changed' },
    ] },

  { ad:'T880', baslik:'Company definition',
    aciklama:'Holds company units for consolidation purposes. **Multiple company codes** can be assigned to one company.',
    olusturan:'{{OX15}}',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Company code (consolidation unit)' },
      { aciklama:'Company name' },
      { aciklama:'Consolidation currency' },
    ] },

  { ad:'T014', baslik:'Credit control area definition',
    aciklama:'The organizational unit where {{kredi-limiti}} control is performed. **Multiple company codes** can be assigned to a credit control area: for a shared limit across group companies.',
    olusturan:'{{OB45}}',
    s4:'Used together with SAP Credit Management.',
    alanlar:[
      { aciklama:'Credit control area' },
      { aciklama:'Currency: the unit in which limits are tracked' },
    ] },

  { ad:'T074', baslik:'Special G/L account determination',
    aciklama:'Holds the match between the special G/L indicator and the alternative reconciliation account. {{FBKP}} populates this table.',
    olusturan:'{{FBKP}}',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Account type: **K** vendor, **D** customer' },
      { aciklama:'Special G/L indicator (A down payment, F request, W bill of exchange)' },
      { aciklama:'**Normal** reconciliation account (320): the field most often overlooked in the match' },
      { aciklama:'**Alternative** reconciliation account (159)' },
    ] },

  { ad:'T881', baslik:'Ledger definitions',
    aciklama:'Holds the ledgers in the system: the leading ledger (0L) and additional ledgers (2L, 3L…), each one\'s fiscal year variant and currencies.',
    olusturan:'{{FINSC_LEDGER}}',
    s4:'Managed with {{FINSC_LEDGER}}; {{ACDOCA}} carries `RLDNR` on every line.',
    alanlar:[
      { aciklama:'Ledger code: **0L** is the leading ledger' },
      { aciklama:'Leading ledger flag: there can be **only one** in the system' },
    ] },

  { ad:'FAGL_SPLINFO', baslik:'Document splitting information',
    aciklama:'Holds the characteristics (profit center, division, segment) assigned to each item as a result of {{belge-bolme}}. Ensures split items match correctly during clearing.',
    olusturan:'Every FI document, if document splitting is active',
    s4:'Still exists; the split result is also reflected in {{ACDOCA}} lines.' },

  /* ------------------------------- Veri geçişi / taşıma / S4 partisi --- */
  { ad:'BUT000', baslik:'Business Partner: general data',
    aciklama:'The **common** header table of vendor and customer master data in S/4HANA. {{is-ortagi}} is a single object; vendor and customer are now its **roles**. Company code and purchasing/sales data still live in {{LFB1}} and {{KNB1}}: {{BUT000}} is the identity above them.',
    olusturan:'{{BP}}',
    s4:'Mandatory. Even records created with {{XK01}}/{{XD01}} are written here in the background through {{cvi}}.',
    alanlar:[
      { aciklama:'Business partner number' },
      { aciklama:'Business partner category' },
      { aciklama:'Person / Organization / Group' },
      { aciklama:'Name / title' },
    ] },

  { ad:'MATDOC', baslik:'Material document: combined table',
    aciklama:'The single table for material documents in S/4HANA. It is the MM counterpart of **the same architectural decision** as {{ACDOCA}} on the FI side: the header+item+totals tables (MKPF/MSEG/MARD/MBEW) merged into one table, and totals are **calculated instead of stored**. The old tables continue to be read as {{uyumluluk-view}}.',
    olusturan:'{{MIGO}} and every transaction that produces a stock movement',
    s4:'New. Outside the topic, but included here because it shows **the pattern**: the same principle was applied outside FI too.',
    alanlar:[
      { aciklama:'Material document number' },
      { aciklama:'{{hareket-turu}}' },
      { aciklama:'Quantity: summed from here instead of a totals table' },
    ] },

  { ad:'E070', baslik:'Transport request header',
    aciklama:'Every {{tasima-istegi}} is one row: its owner, type, status, and release time. This is where the question *"when did this setting go live?"* is answered.',
    olusturan:'{{SE09}}',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Request number' },
      { aciklama:'Status: **R** released' },
      { aciklama:'Release date: the change timeline' },
      { aciklama:'Owner' },
    ] },

  { ad:'E071', baslik:'Transport request objects',
    aciklama:'Holds **exactly what** a request transports. Whether two requests touch the same object is seen from here: the place to diagnose {{tasima-sirasi}} conflicts.',
    olusturan:'{{SE09}}',
    s4:'Unchanged.',
    alanlar:[
      { aciklama:'Request number' },
      { aciklama:'Object type (TABU, PROG, VDAT…)' },
      { aciklama:'Object name: table or program' },
    ] },
]);
