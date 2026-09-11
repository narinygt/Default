/* ==========================================================================
   content/fi-en/master-data.js — English body for "Master Data"
   Same conventions as content/fi-en/genel-muhasebe.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'master-data',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      '{{ana-veri}} is data that persists across transactions and rarely changes: a G/L account, a vendor, a ' +
      'customer, a fixed asset, a bank. Every invoice, payment, and goods movement, on the other hand, is ' +
      '{{hareket-verisi}}.\n\n' +
      'The practical consequence of the split: **transaction data references master data.** When you enter a ' +
      'vendor invoice, you type the amount, but SAP reads the due date, the reconciliation account, and the payment ' +
      'method from the vendor master. So master data pre-decides the behavior of hundreds of future transactions.',

    neden:
      '**To avoid repetition.** If you post 500 invoices for the same vendor, you don\'t type their address 500 times.\n\n' +
      '**For consistency.** Because master data is held in one place, "the same vendor registered under three ' +
      'different names" doesn\'t happen when it\'s set up correctly.\n\n' +
      '**To control behavior centrally.** Put a payment block on a vendor, and every one of their invoices is ' +
      'instantly out of the payment run. Control lives in the master record, not in the individual posting.',

    sirketOnemi:
      '**Master data quality** sits at the top of the list of reasons SAP projects get delayed. Configuration ' +
      'finishes in two weeks; master data cleanup takes months.\n\n' +
      'The reason is that data coming from a legacy system is usually dirty: duplicate vendors, blank tax numbers, ' +
      'customers no longer active. Migrate that data without cleaning it, and the problem migrates into SAP too — ' +
      'and fixing it there is far more expensive. "Garbage in, garbage out" is nowhere truer in consulting than here.',

    gercekHayat:
      'Say a vendor master record accidentally has its payment terms set to "cash." Accounting never notices, ' +
      'because the due date comes in automatically when the invoice is entered. But when {{F110}} runs, every ' +
      'invoice from that vendor is treated as **already due** and paid early.\n\n' +
      'The company makes needless cash outflows for two months and nobody understands why. The bug isn\'t in the ' +
      'invoice — it\'s in a master record opened two years earlier. That\'s the power, and the risk, of master data.',

    muhasebeMantigi:
      'The point where master data connects to accounting is the {{mutabakat-hesabi}}. Whatever G/L account is ' +
      'written on the vendor master ({{LFB1}} `AKONT`), every posting to that vendor reflects into general ledger ' +
      'through that account.\n\n' +
      'This is why you see a single "320 Trade payables" line in general ledger, while the detail of 800 vendors ' +
      'sits behind it. This field is exactly the bridge between the {{muavin-defter}} and {{ana-muhasebe}}.\n\n' +
      'The same logic applies to a customer ({{KNB1}} `AKONT`) and to a fixed asset ({{varlik-sinifi}} → account ' +
      'determination).',

    kavramlar: ['ana-veri', 'hareket-verisi', 'mutabakat-hesabi', 'hesap-grubu', 'alan-durumu',
                'acik-kalem-yonetimi', 'odeme-kosulu', 'odeme-yontemi', 'muavin-defter'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Opening a master record is technically filling out a screen, but **as a process it\'s an approval chain**. ' +
      'Who can open master data, which fields are filled by whom, and how it\'s audited is tightly governed at any ' +
      'enterprise company. The reason is simple: master data steers the flow of money.',

    roller:[
      { rol:'Requesting department', gorev:'Reports the need for a new vendor/customer; supplies the commercial details (name, address, tax number).' },
      { rol:'Master data team (MDM)', gorev:'Runs duplicate checks, opens the general segment, decides the account group.' },
      { rol:'Procurement / Sales', gorev:'Completes their own segment: purchasing organization / sales area data.' },
      { rol:'Accounting', gorev:'Opens the company code segment: {{mutabakat-hesabi}}, {{odeme-kosulu}}, {{odeme-yontemi}}, {{ihtar-prosedürü}}.' },
      { rol:'Accounting manager', gorev:'Approves changes to critical fields (bank account, reconciliation account).' },
      { rol:'Internal audit', gorev:'Audits the change history via {{CDHDR}}/{{CDPOS}} — bank account changes especially.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Opening a new vendor master record',
      adimlar:[
        { ic:'📝', rol:'Requesting department', baslik:'A master data request is opened',
          aciklama:'Name, address, tax number and bank details are submitted with supporting documents.',
          cikti:'Master data request form', ok:'lands with the MDM team' },
        { ic:'🔍', rol:'Master data team', baslik:'A duplicate check is performed',
          aciklama:'A search is run on the tax number ({{SE16N}} → {{LFA1}} `STCD1`). The same company may already be registered under a different name.',
          cikti:'Not-a-duplicate approval', ok:'proceeds if clean' },
        { ic:'🏷️', rol:'Master data team', baslik:'The account group is chosen',
          aciklama:'{{hesap-grubu}} decides the number range and which fields are mandatory. A foreign vendor and a one-time vendor sit in different groups.',
          cikti:'Vendor number', ok:'the general segment is opened' },
        { ic:'🌐', rol:'Master data team', baslik:'The general segment is filled in ({{LFA1}})',
          aciklama:'Name, address, country, tax number. This segment is shared across every company code.',
          cikti:'{{LFA1}} record', ok:'lands with accounting' },
        { ic:'💰', rol:'Accounting', baslik:'The company code segment is filled in ({{LFB1}})',
          aciklama:'{{mutabakat-hesabi}}, {{odeme-kosulu}}, allowed {{odeme-yontemi}}, {{ihtar-prosedürü}}.',
          cikti:'{{LFB1}} record', ok:'lands with procurement' },
        { ic:'🛒', rol:'Procurement', baslik:'The purchasing segment is filled in ({{LFM1}})',
          aciklama:'Order currency, delivery terms, purchasing group. Required for the MM side.',
          cikti:'{{LFM1}} record', ok:'goes to approval' },
        { ic:'✓', rol:'Accounting manager', baslik:'Bank details are approved and the record is released',
          aciklama:'A bank account change is the most common entry point for fraud; this field always gets a separate approval.',
          cikti:'A vendor ready for use' },
      ],
    },

    adimlar:[
      { rol:'Requesting department', eylem:'Submits the master data request and documents', sistem:'Request form / workflow' },
      { rol:'Master data team', eylem:'Runs the duplicate check and picks the account group', sistem:'{{SE16N}} → {{LFA1}}, {{BP}}' },
      { rol:'Master data team', eylem:'Opens the general segment', sistem:'{{BP}} (S/4HANA) or {{XK01}} (ECC)' },
      { rol:'Accounting', eylem:'Completes the company code segment', sistem:'{{BP}} → FI Vendor role, or {{FK01}}' },
      { rol:'Procurement', eylem:'Completes the purchasing organization segment', sistem:'{{BP}} → Purchasing role' },
      { rol:'Accounting manager', eylem:'Approves the bank and reconciliation account', sistem:'Change approval workflow' },
      { rol:'Internal audit', eylem:'Periodically audits the change history', sistem:'{{CDHDR}} / {{CDPOS}}' },
    ],

    veriAkisi:{
      nereden:'Commercial documents (tax registration, signature circular, bank confirmation), legacy system data, business partner forms.',
      nereye:'Referenced from every invoice, payment, goods movement, and report. {{F110}} reads the payment method, {{F150}} the dunning procedure, from here.',
      tetikleyen:'A decision to work with a new business partner, or the need for a new account.',
      sonraki:'The first transaction after master data is opened is usually a purchase order or an invoice.',
    },

    notlar:[
      { tip:'warn', baslik:'Master data\'s silent power', metin:
        'A master data error doesn\'t throw an error at posting time — it just leads to **the wrong behavior**. A ' +
        'wrong payment term means early payment; a wrong reconciliation account means the wrong balance sheet line; ' +
        'a missing dunning procedure means an uncollected receivable. That\'s why auditing master data matters more ' +
        'than auditing a single document.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'Master data **doesn\'t produce a posting by itself** — opening a vendor doesn\'t touch any account. But it ' +
      'shapes the postings that follow. Below, see how the exact same 60,000 TRY invoice turns into completely ' +
      'different postings, purely because of a difference in master data.',

    etkilenenHesaplar:[
      { hesap:'Reconciliation account ({{LFB1}} `AKONT`)', tur:'Balance sheet', neden:'Decides which account the vendor line appears on in general ledger. Domestic and foreign vendors can be split into different accounts.' },
      { hesap:'Alternative reconciliation account ({{ozel-ana-muhasebe-gostergesi}})', tur:'Balance sheet', neden:'Lets a transaction like {{avans}} post to a separate account instead of the normal one.' },
      { hesap:'Expense/income account', tur:'Income statement', neden:'The user enters it, but the account\'s {{alan-durumu}} group decides which additional fields become mandatory.' },
      { hesap:'Tax accounts', tur:'Balance sheet', neden:'The account\'s {{vergi-kodu}} category ({{SKB1}} `MWSKZ` setting) decides whether tax can be entered at all.' },
    ],

    fisler:[
      { baslik:'Same invoice — Vendor A: reconciliation account 320 (domestic)',
        belgeTuru:'KR', tarih:'05.05.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:50000 },
          { hesap:'191', ad:'Deductible VAT', borc:10000 },
          { hesap:'320', ad:'Trade payables — domestic', alacak:60000, not:'{{LFB1}} `AKONT` = 320' },
        ] },

      { baslik:'Same invoice — Vendor B: reconciliation account 321 (foreign)',
        belgeTuru:'KR', tarih:'05.05.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:50000 },
          { hesap:'191', ad:'Deductible VAT', borc:10000 },
          { hesap:'321', ad:'Trade payables — foreign', alacak:60000, not:'{{LFB1}} `AKONT` = 321' },
        ],
        not:'The user did nothing differently; **the only difference is the master data.** This is exactly how ' +
             'domestic and foreign payables end up on separate balance-sheet lines.' },

      { baslik:'An advance to the same vendor — via a special G/L indicator ({{F-48}})',
        belgeTuru:'KZ', tarih:'08.05.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'159', ad:'Advances on purchase orders', borc:30000, not:'`UMSKZ` = A → the alternative account kicked in' },
          { hesap:'102', ad:'Banks', alacak:30000 },
        ],
        not:'Same vendor, reconciliation account still 320 — but because {{ozel-ana-muhasebe-gostergesi}} "A" was ' +
             'entered, the posting went to 159, not 320. An advance isn\'t a liability, it\'s a **receivable**; it ' +
             'needs to show up separately on the balance sheet.' },
    ],

    tHesaplar:[
      { hesap:'Trade payables — domestic', kod:'320 (reconciliation)',
        borc:[{ ad:'Payment', tutar:60000 }],
        alacak:[{ ad:'Invoice — Vendor A', tutar:60000 }, { ad:'Invoice — Vendor C', tutar:45000 }],
        not:'The sum of 800 vendors, in one account' },
      { hesap:'Advances on purchase orders', kod:'159 (special G/L)',
        borc:[{ ad:'Advance payment', tutar:30000 }],
        alacak:[{ ad:'Cleared against the invoice (F-54)', tutar:30000 }],
        not:'Zeroed out after clearing' },
    ],

    notlar:[
      { tip:'tip', baslik:'What happens if the reconciliation account is changed later?', metin:
        'Old postings **stay on the old account**; new postings go to the new one. That\'s why changing a ' +
        'reconciliation account is a serious operation requiring a balance transfer — in production it\'s only done ' +
        'at period end, with a correcting entry.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:'FI has four core master data objects. Each has a different layer structure, and that structure decides where the data is shared.',
    liste:[
      { ad:'G/L Account',
        aciklama:'Two-layered: the **chart-of-accounts level** ({{SKA1}}) is shared across all company codes — number, ' +
                 'name, account group, balance-sheet/income-statement split. The **company code level** ({{SKB1}}) is ' +
                 'specific to each company — currency, tax category, {{acik-kalem-yonetimi}}, {{alan-durumu}} group.',
        neZaman:'When a new accounting account is needed. But ask first: is a genuinely new account needed, or does splitting by {{maliyet-yeri}} do the job?',
        ornek:'The same "770 General administrative expense" account is used across 5 company codes, but can have a different currency in each.',
        tcodes:['FS00','FSP0','FSS0','OBD4'] },

      { ad:'Supplier / Vendor',
        aciklama:'Three-layered: **general** ({{LFA1}}) name-address-tax number, **company code** ({{LFB1}}) ' +
                 'accounting settings, **purchasing organization** ({{LFM1}}) MM settings. In S/4HANA all three are ' +
                 'managed through {{BP}}.',
        neZaman:'Whenever the company buys goods or services from someone and owes them for it.',
        ornek:'In a group of companies, the same vendor has one {{LFA1}} record but can have 4 separate {{LFB1}} records across 4 company codes — each with different payment terms.',
        tcodes:['BP','XK01','FK01','FBL1N'] },

      { ad:'Customer',
        aciklama:'Symmetric with the vendor: **general** ({{KNA1}}), **company code** ({{KNB1}}), **sales area** ({{KNVV}}).',
        neZaman:'Whenever the company sells on credit. Cash-only retail sales can get by with a single "collective customer" record.',
        ornek:'In S/4HANA, if the same company is both a customer and a vendor, it\'s carried as **two roles on a single {{BP}} record** — ECC needed two separate records.',
        tcodes:['BP','XD01','FD01','FBL5N'] },

      { ad:'Fixed Asset',
        aciklama:'Derived from {{varlik-sinifi}}: the class supplies the number range, the account determination, and ' +
                 'the default {{amortisman-anahtari}} and {{faydali-omur}} values. The master record is {{ANLA}}, the depreciation areas are {{ANLB}}.',
        neZaman:'For purchases above the {{aktiflestirme}} threshold that will be used over multiple years.',
        ornek:'An asset opened in the "Computers" class automatically gets a 4-year useful life and the correct balance sheet account.',
        tcodes:['AS01','AS02','AW01N','OAOA'] },

      { ad:'Bank Master Data',
        aciklama:'Two different things get confused: **bank master data** ({{BNKA}}) is the list of every bank in the ' +
                 'world; a **{{ev-bankasi}}** ({{T012}}/{{T012K}}) is the company\'s own accounts.',
        neZaman:'A house bank definition is mandatory whenever {{F110}} or an electronic bank statement is used.',
        tcodes:['FI12','FCHI'] },
    ],

    karsilastirmaBasliklar:['Master Data', 'Customizing'],
    karsilastirma:[
      ['What it holds', 'Account, vendor, customer, asset', 'Account group, document type, field status rules'],
      ['Who maintains it', 'Master data team / accounting (end user)', 'Consultant / authorized configurer'],
      ['Where it\'s done', 'Application transactions: {{FS00}}, {{BP}}, {{AS01}}', '{{SPRO}} → the IMG tree'],
      ['Transport request', '**Doesn\'t go in one** — loaded separately in each system', '**Goes in one** — dev → test → production'],
      ['Changeable in production?', 'Yes, everyday business', 'No, arrives via transport'],
      ['How it migrates', 'Data load via {{LTMC}} / {{LSMW}}', 'Via a transport request'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FS00', ad:'Central G/L account maintenance',
        amac:'Creates, changes and displays a general ledger account\'s chart-of-accounts and company-code segments on one screen.',
        neZaman:'When opening a new account and when diagnosing how an existing one behaves. The master-data screen opened most often in error analysis.',
        adimlar:[
          { baslik:'Enter the account number + company code, choose "Create"',
            aciklama:'The number must fall within the range the {{hesap-grubu}} allows; outside it, you get an error.' },
          { baslik:'*Type/description* tab',
            aciklama:'Account group, balance sheet vs. income statement, short and long text. In S/4HANA you also choose the **account type**: Balance Sheet / Nonoperating Expense or Income / **Primary Costs or Revenue** / Secondary Costs.' },
          { baslik:'*Control data* tab',
            aciklama:'Currency, {{vergi-kodu}} category, **reconciliation account type** (D/K/A), {{acik-kalem-yonetimi}}, line item display, sort key.' },
          { baslik:'*Create/bank/interest* tab',
            aciklama:'The {{alan-durumu}} group — the field that decides which field on the posting screen is mandatory/optional/hidden. The answer to "why is this field required?" lives here.' },
          { baslik:'Save',
            aciklama:'An account is {{ana-veri}}; it doesn\'t go into a transport request. The account you opened in test **does not exist** in production.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'G/L account 770000, company code 1000 → Create' },
          { ekran:'Type/description', islem:'Account group: Expense accounts · Income statement account · Type: Primary Costs' },
          { ekran:'Control data', islem:'Currency TRY · Tax category: - (can be entered) · Line item display: X' },
          { ekran:'Create/bank/interest', islem:'Field status group: G004 (expense accounts)' },
        ],
        alanlar:{
          zorunlu:['G/L account number','Company code','Account group','Balance sheet/Income statement','Short text','Account currency','Field status group'],
          opsiyonel:['Tax category','Open item management','Sort key','Alternative account number','Interest indicator'] },
        hatalar:[
          { mesaj:'Account 770000 not created in chart of accounts INT', sebep:'The chart-of-accounts level ({{SKA1}}) doesn\'t exist; only a company code segment is being attempted.', cozum:'Create the chart-of-accounts level first with {{FSP0}}, then add the company code segment with {{FSS0}}. {{FS00}} does both at once.' },
          { mesaj:'Account number 770000 not within number range of account group', sebep:'The selected {{hesap-grubu}}\'s number range doesn\'t cover this number.', cozum:'Choose the correct account group, or widen the range with {{OBD4}}.' },
          { mesaj:'Open item management cannot be activated; account has postings', sebep:'{{acik-kalem-yonetimi}} can\'t be turned on while the account has movements.', cozum:'Zero the balance, change the setting, restore the balance — or use SAP\'s conversion program (RFSEPA02-type). Handled carefully in production.' },
          { mesaj:'Company code area for account ... does not exist', sebep:'The account hasn\'t been opened for that company code.', cozum:'Add the company code segment with {{FSS0}} or {{FS00}}.' },
        ],
        ipucu:'When opening a new account, **copy a similar one as a template** ("Create with template" on the entry screen). You won\'t have to rethink the field status and control settings.',
        ilgili:['FSP0','FSS0','OBD4','FBL3N','FS10N'] },

      { kod:'BP', ad:'Business partner maintenance — S/4HANA\'s single gate',
        amac:'Manages customer and vendor master data through a single object. The same company can be both a customer and a vendor via the **role** concept.',
        neZaman:'Every customer/vendor transaction in S/4HANA. The classic {{XK01}}/{{XD01}} screens have been removed.',
        adimlar:[
          { baslik:'Pick the business partner type', aciklama:'Organization (legal entity), Person (individual), or Group.' },
          { baslik:'Enter the general data', aciklama:'Name, address, contact, tax number. This part writes to {{LFA1}}/{{KNA1}}.' },
          { baslik:'Add a role: **FI Vendor** or **FI Customer**',
            aciklama:'The role is chosen from the dropdown in the top right of the screen. No accounting data can be ' +
                     'entered until a role is added — this is where beginners get stuck most often.' },
          { baslik:'Enter the company code data', aciklama:'{{mutabakat-hesabi}}, {{odeme-kosulu}}, allowed {{odeme-yontemi}} (`ZWELS`), {{ihtar-prosedürü}}.' },
          { baslik:'Add the purchasing / sales role if needed', aciklama:'The "Supplier (Purchasing)" or "Customer (Sales)" roles open the MM/SD data.' },
          { baslik:'Enter bank details and save', aciklama:'The IBAN is kept in the general data; {{F110}} reads it from here when making a payment.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Create → Organization' },
          { ekran:'Address', islem:'Name, country, tax number' },
          { ekran:'Role selection', islem:'The FI Vendor role is added → company code tabs open' },
          { ekran:'Company code data', islem:'Reconciliation account 320000, payment terms 0030, payment method H' },
          { ekran:'Bank data', islem:'IBAN TR.. is entered' },
        ],
        alanlar:{
          zorunlu:['Business partner type','Name','Country','Role','Company code','Reconciliation account'],
          opsiyonel:['Tax number','Payment terms','Payment method','Dunning procedure','Payment block','Bank IBAN'] },
        hatalar:[
          { mesaj:'Role FI Vendor cannot be assigned; number range not maintained', sebep:'The mapping between the BP group and the vendor account group (CVI) is missing.', cozum:'Complete the number range and group mapping under IMG → Cross-Application Components → Master Data Synchronization → Customer/Vendor Integration.' },
          { mesaj:'Reconciliation account 320000 not permitted', sebep:'The account isn\'t marked `MITKZ` = K (vendor) in {{SKB1}}.', cozum:'{{FS00}} → Control data → set the reconciliation account type to **K**.' },
          { mesaj:'Duplicate business partner found', sebep:'A record with the same tax number/name already exists.', cozum:'Use the existing record. If it really is a different legal entity, override the warning — but check first.' },
        ],
        ipucu:'**Keep checking which role you\'re in** on the BP screen. Most "I can\'t find the field" complaints come from looking for a field while in the wrong role.',
        ilgili:['XK01','XD01','FK01','FD01','FBL1N','FBL5N'] },

      { kod:'OBD4', ad:'Define G/L account group',
        amac:'Defines account groups, their number ranges, and the group-level {{alan-durumu}}.',
        neZaman:'When designing a chart of accounts, and when chasing "why is this field mandatory/hidden?"',
        adimlar:[
          { baslik:'Choose the chart of accounts' },
          { baslik:'Add a group: code, name, number range (from–to)' },
          { baslik:'Select the group and click *Field status*', aciklama:'Field groups (Account control, Document entry, Bank/interest…) are each set to hidden/mandatory/optional one at a time.' },
        ],
        ipucu:'Set up sensible number ranges from the start: 1xxxxx current assets, 3xxxxx short-term liabilities, and so on. Fixing this later requires moving already-opened accounts and is close to impossible.',
        ilgili:['FS00','OB13'] },

      { kod:'AS01', ad:'Create fixed asset',
        amac:'Opens a new fixed asset master record based on the {{varlik-sinifi}}.',
        neZaman:'For a purchase that will be capitalized, **before** the acquisition posting.',
        adimlar:[
          { baslik:'Enter the asset class and company code', aciklama:'The class supplies the account determination and default depreciation settings.' },
          { baslik:'*General* tab', aciklama:'Description, quantity, inventory number.' },
          { baslik:'*Time-dependent* tab', aciklama:'{{maliyet-yeri}}, plant, person responsible. These fields can change by date ({{ANLZ}}).' },
          { baslik:'*Depreciation areas* tab', aciklama:'{{amortisman-anahtari}} and {{faydali-omur}}. Can be set separately for each {{amortisman-alani}} — tax and commercial depreciation split here.' },
        ],
        hatalar:[
          { mesaj:'Account determination ... for asset class not maintained', sebep:'Account determination is missing for the asset class in {{AO90}}.', cozum:'Use {{AO90}} to define the balance sheet, accumulated depreciation, depreciation expense, and gain/loss-on-sale accounts.' },
          { mesaj:'Depreciation key ... does not allow useful life of 0', sebep:'No useful life was entered.', cozum:'Enter the life on the depreciation area tab; it comes in automatically if a default is defined on the asset class.' },
        ],
        ilgili:['AS02','AS03','AW01N','ABZON','OAOA','AO90'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Master data tables share a common pattern: **a general layer + an organizational layer**. The general layer ' +
      'holds the identity, the organizational layer holds behavior specific to that organization. Once you\'ve ' +
      'internalized this pattern once, you can predict which table holds which piece of information.',

    liste:[
      { ad:'SKA1', baslik:'G/L account — chart-of-accounts layer',
        tutar:'The account\'s identity: number, account group, balance sheet or income statement. **Independent of company code.**',
        olusturan:'{{FS00}} or {{FSP0}}',
        guncelleyen:'{{FS00}}, {{FSP0}}, data load tools',
        anahtar:'KTOPL + SAKNR',
        iliskiler:'1-to-n with {{SKB1}} (one account, many company codes); {{SKAT}} for language-specific descriptions.',
        s4:'Unchanged. A new "account type" (GLACCOUNT_TYPE) field was added — the cost-element split moved here.',
        alanlar:[
          { ad:'KTOPL', aciklama:'Chart of accounts' },
          { ad:'SAKNR', aciklama:'Account number' },
          { ad:'KTOKS', aciklama:'{{hesap-grubu}} — supplies the number range and field status' },
          { ad:'XBILK', aciklama:'X means balance sheet account; blank means income statement account' },
        ] },

      { ad:'SKB1', baslik:'G/L account — company code layer',
        tutar:'How the account behaves at that company: currency, tax category, open item management, field status group, reconciliation account type.',
        olusturan:'{{FS00}} or {{FSS0}}',
        guncelleyen:'{{FS00}}, {{FSS0}}',
        anahtar:'BUKRS + SAKNR',
        iliskiler:'A child of {{SKA1}}; {{BSEG}}.HKONT points here.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'MITKZ', aciklama:'Reconciliation account type: **D** customer, **K** vendor, **A** fixed asset. If filled, the account can\'t be posted to directly.' },
          { ad:'XOPVW', aciklama:'{{acik-kalem-yonetimi}} — must be X for clearing to be possible' },
          { ad:'FSTAG', aciklama:'{{alan-durumu}} group — which field is mandatory/hidden' },
          { ad:'XKRES', aciklama:'Whether line item display is on — if off, {{FBL3N}} shows no items' },
          { ad:'ZUAWA', aciklama:'Sort key — auto-fills the `ZUONR` (assignment) field; critical for {{F.13}}' },
        ] },

      { ad:'LFA1', baslik:'Vendor — general layer',
        tutar:'Name, address, country, tax numbers, account group. Shared across all company codes.',
        olusturan:'{{BP}} (S/4HANA) or {{XK01}} (ECC)',
        guncelleyen:'{{BP}}, {{XK01}}, {{XK02}}',
        anahtar:'LIFNR',
        iliskiler:'1-to-n with {{LFB1}} (company code) and {{LFM1}} (purchasing); {{BSEG}}.LIFNR points here.',
        s4:'The table still exists but is now populated by {{BP}}; maintained directly via {{XK01}} no longer.',
        alanlar:[
          { ad:'LIFNR', aciklama:'Vendor number' },
          { ad:'STCD1 / STCD2', aciklama:'Tax number fields — the first place to check for duplicates' },
          { ad:'KTOKK', aciklama:'Account group — determines the number range and field status' },
          { ad:'SPERR / LOEVM', aciklama:'Central block / deletion flag' },
        ] },

      { ad:'LFB1', baslik:'Vendor — company code layer',
        tutar:'Accounting behavior: reconciliation account, payment terms, allowed payment methods, payment block, dunning procedure.',
        olusturan:'{{BP}} → FI Vendor role, or {{FK01}}',
        guncelleyen:'{{BP}}, {{FK02}}',
        anahtar:'LIFNR + BUKRS',
        iliskiler:'A child of {{LFA1}}; {{BSIK}}/{{BSAK}} open/cleared items link here.',
        s4:'Unchanged; populated via {{BP}}.',
        alanlar:[
          { ad:'AKONT', aciklama:'**{{mutabakat-hesabi}}** — this vendor\'s address in general ledger' },
          { ad:'ZTERM', aciklama:'{{odeme-kosulu}} — the due date is calculated from here' },
          { ad:'ZWELS', aciklama:'The list of allowed {{odeme-yontemi}} — {{F110}} can\'t go outside it' },
          { ad:'ZAHLS', aciklama:'{{odeme-blogu}} — if filled, {{F110}} won\'t propose this vendor' },
          { ad:'MAHNA', aciklama:'{{ihtar-prosedürü}}' },
        ] },

      { ad:'KNB1', baslik:'Customer — company code layer',
        tutar:'The customer\'s accounting settings; symmetric with {{LFB1}}.',
        olusturan:'{{BP}} → FI Customer role, or {{FD01}}',
        guncelleyen:'{{BP}}, {{FD02}}',
        anahtar:'KUNNR + BUKRS',
        iliskiler:'A child of {{KNA1}}; {{BSID}}/{{BSAD}} items link here.',
        s4:'Unchanged; populated via {{BP}}.',
        alanlar:[
          { ad:'AKONT', aciklama:'Reconciliation account (usually 120 Trade receivables)' },
          { ad:'ZTERM', aciklama:'Payment terms' },
          { ad:'MAHNA / MANSP', aciklama:'Dunning procedure / dunning block' },
        ] },

      { ad:'ANLA', baslik:'Fixed asset — master record',
        tutar:'The asset\'s identity: class, description, capitalization date, inventory number.',
        olusturan:'{{AS01}}',
        guncelleyen:'{{AS01}}, {{AS02}}, {{ABUMN}} (on transfer)',
        anahtar:'BUKRS + ANLN1 + ANLN2',
        iliskiler:'{{ANLB}} depreciation settings, {{ANLC}} annual values, {{ANEP}} movements, {{ANLZ}} time-dependent assignments.',
        s4:'The master-data structure is preserved; values moved to {{ACDOCA}}.',
        alanlar:[
          { ad:'ANLKL', aciklama:'{{varlik-sinifi}} — supplies the account determination' },
          { ad:'AKTIV', aciklama:'{{aktiflestirme}} date — where depreciation begins' },
          { ad:'ANLN2', aciklama:'Sub-asset number — for tracking components separately' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'The layer structure of the master data tables',
      varliklar:[
        { ad:'SKA1', rol:'Chart of accounts', aciklama:'Account definition, independent of company',
          alanlar:[{ ad:'KTOPL', tip:'pk' }, { ad:'SAKNR', tip:'pk' }, { ad:'KTOKS' }, { ad:'XBILK' }] },
        { ad:'SKB1', rol:'Company code', hub:true, aciklama:'The account\'s company-specific behavior',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'SAKNR', tip:'fk' }, { ad:'MITKZ' }, { ad:'XOPVW' }, { ad:'FSTAG' }] },
        { ad:'LFA1', rol:'General', aciklama:'The vendor\'s identity',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'NAME1' }, { ad:'STCD1' }, { ad:'KTOKK' }] },
        { ad:'LFB1', rol:'Company code', aciklama:'Vendor accounting data',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT', tip:'fk' }, { ad:'ZTERM' }] },
        { ad:'KNA1', rol:'General', aciklama:'The customer\'s identity',
          alanlar:[{ ad:'KUNNR', tip:'pk' }, { ad:'NAME1' }, { ad:'KTOKD' }] },
        { ad:'KNB1', rol:'Company code', aciklama:'Customer accounting data',
          alanlar:[{ ad:'KUNNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT', tip:'fk' }] },
        { ad:'ANLA', rol:'Asset', aciklama:'Fixed asset master record',
          alanlar:[{ ad:'ANLN1', tip:'pk' }, { ad:'ANLKL' }, { ad:'AKTIV' }] },
      ],
      iliskiler:[
        { from:'SKA1', to:'SKB1', alanlar:'SAKNR', not:'one account, many company codes' },
        { from:'LFA1', to:'LFB1', alanlar:'LIFNR', not:'one vendor, many company codes' },
        { from:'KNA1', to:'KNB1', alanlar:'KUNNR', not:'one customer, many company codes' },
        { from:'LFB1', to:'SKB1', alanlar:'AKONT → SAKNR', not:'the reconciliation account link' },
        { from:'KNB1', to:'SKB1', alanlar:'AKONT → SAKNR', not:'the reconciliation account link' },
        { from:'ANLA', to:'SKB1', alanlar:'ANLKL → account determination', not:'via the asset class (AO90)' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:'Below is a screen-by-screen walkthrough of opening a vendor in S/4HANA with {{BP}}. The point that trips people up most is the **role** concept.',

    ekranlar:[
      { ad:'Business partner type and number',
        aciklama:'The first decision: legal entity or individual. The number is assigned internally or externally depending on the BP group.',
        alanlar:[
          { ad:'Business partner type', zorunlu:true, aciklama:'Organization (company), Person (individual), Group.' },
          { ad:'BP group', zorunlu:true, aciklama:'Determines the number range and is mapped to the vendor account group (CVI mapping).' },
          { ad:'Business partner number', zorunlu:false, aciklama:'Left blank under internal assignment — the system supplies it.' },
        ] },

      { ad:'Address and identity data (general layer → {{LFA1}})',
        aciklama:'This segment is shared across every company code.',
        alanlar:[
          { ad:'Name', zorunlu:true, aciklama:'The legal name. Set a consistent naming convention — this alone prevents half of duplicate records.' },
          { ad:'Country / Address', zorunlu:true, aciklama:'Country affects tax calculation and payment format.' },
          { ad:'Tax number (`STCD1`)', zorunlu:false, aciklama:'The key to the duplicate check. Making it mandatory is good practice.' },
          { ad:'Bank data (IBAN)', zorunlu:false, aciklama:'{{F110}} reads it from here. **Any change should require separate approval** — the most common point of entry for fraud.' },
        ],
        ipucu:'Search {{SE16N}} → {{LFA1}} on the tax number first. The same company registered three times as "Inc.", "Incorporated", "The X Company" is the most common form of master-data mess.' },

      { ad:'Adding a role — the critical step',
        aciklama:'**FI Vendor** is chosen from the role dropdown in the top right of the BP screen. The company code tabs **stay invisible** until a role is added.',
        alanlar:[
          { ad:'Role: FI Vendor (FLVN00)', zorunlu:true, aciklama:'Opens accounting data; {{LFB1}} is written with this role.' },
          { ad:'Role: Supplier (Purchasing)', zorunlu:false, aciklama:'Opens the MM data ({{LFM1}}). Needed if a purchase order will be raised.' },
          { ad:'Role: FI Customer (FLCU00)', zorunlu:false, aciklama:'If the same company is also a customer, this role is added to **the same BP record** — ECC needed two separate records.' },
        ],
        ipucu:'When "I can\'t see the fields" comes up, the first question is: which role are you in? Looking for a field without switching roles is wasted time.' },

      { ad:'Company code data (→ {{LFB1}})',
        aciklama:'The actual screen where accounting behavior is decided.',
        alanlar:[
          { ad:'Reconciliation account (`AKONT`)', zorunlu:true, aciklama:'The account must be flagged `MITKZ` = K in {{FS00}}, or it\'s rejected.' },
          { ad:'Payment terms (`ZTERM`)', zorunlu:false, aciklama:'The due date and discount are calculated from here. A wrong value silently causes early or late payment.' },
          { ad:'Payment methods (`ZWELS`)', zorunlu:false, aciklama:'{{F110}} can only use the methods listed here.' },
          { ad:'Payment block (`ZAHLS`)', zorunlu:false, aciklama:'A good control is opening a new vendor blocked until the first approval.' },
          { ad:'Sort key (`ZUAWA`)', zorunlu:false, aciklama:'Auto-fills the `ZUONR` field; matters if automatic clearing via {{F.13}} is planned.' },
          { ad:'Dunning procedure (`MAHNA`)', zorunlu:false, aciklama:'Rare on a vendor, critical on a customer.' },
        ] },
    ],

    zorunlu:['Business partner type','BP group','Name','Country','Role (FI Vendor / FI Customer)','Company code','Reconciliation account'],
    opsiyonel:['Tax number','Payment terms','Payment method','Payment block','Sort key','Dunning procedure','Bank IBAN','Alternative payee'],

    hatalar:[
      { mesaj:'Reconciliation account 320000 not permitted for account type K', sebep:'The account\'s {{SKB1}} `MITKZ` field isn\'t K (vendor).', cozum:'{{FS00}} → Control data → set reconciliation account type = K.' },
      { mesaj:'Number range for grouping ... is not maintained (CVI error)', sebep:'The BP group hasn\'t been mapped to the vendor/customer account group.', cozum:'Complete the number range and group mapping under IMG → Cross-Application Components → Master Data Synchronization → Customer/Vendor Integration.' },
      { mesaj:'Field ... is not defined for this account group', sebep:'The field is set **hidden** in the {{hesap-grubu}}\'s field status.', cozum:'Make the field optional/mandatory in {{OBD4}} (G/L) or the vendor/customer account group\'s field status setting.' },
      { mesaj:'Account 770000 is blocked for posting', sebep:'The account is closed for posting in {{FS00}}.', cozum:'Remove the block or use the right account. If it was blocked deliberately, find out why first.' },
      { mesaj:'Vendor 100234 is blocked for payment', sebep:'{{odeme-blogu}} (`ZAHLS`) is filled.', cozum:'{{BP}} → company code data → remove the payment block. If it was set due to a dispute, wait for a resolution first.' },
    ],

    ipuclari:[
      'Audit master data changes regularly through {{CDHDR}}/{{CDPOS}}. Especially `LFBK` (bank account) changes: the most common route for payment fraud.',
      'Open a new vendor **payment-blocked**, remove the block once the first invoice is approved. A simple but very effective control.',
      'For bulk master data loads, use {{LTMC}} (Migration Cockpit); don\'t try to record the {{BP}} screen with {{LSMW}} — the screen flow is dynamic and the recording breaks.',
      'When opening an account, copy a similar one as a template. The field status and control settings come along ready-made.',
      'Use a **block**, not deletion. Master data can\'t be deleted because historical documents reference it; the deletion flag (`LOEVM`) is only a signal for archiving.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'SKA1', ne:'Chart-of-accounts level record' },
      { tablo:'SKB1', ne:'Company code level record' },
      { tablo:'SKAT', ne:'Language-specific account descriptions' },
      { tablo:'LFA1', ne:'Vendor general data (via {{BP}})' },
      { tablo:'LFB1', ne:'Vendor company code data' },
      { tablo:'KNA1', ne:'Customer general data' },
      { tablo:'KNB1', ne:'Customer company code data' },
      { tablo:'ANLA', ne:'Fixed asset master record' },
      { tablo:'CDHDR', ne:'Who/when for every change' },
      { tablo:'CDPOS', ne:'The old and new value of the field that changed' },
    ],

    commit:
      'A master data record is written within a single LUW. On the {{BP}} side there\'s an extra layer: saving a BP ' +
      'triggers **CVI synchronization**, which generates the {{LFA1}}/{{LFB1}} (or {{KNA1}}/{{KNB1}}) records. If ' +
      'synchronization errors out, the BP is created but the vendor isn\'t — the error queue is then checked with ' +
      'MDS_LOAD_COCKPIT / MDS_PPO2.',

    belgeNo:
      'A master data number comes from the number range linked to its {{hesap-grubu}} (`KTOKS` for G/L, `KTOKK` for ' +
      'vendor, `KTOKD` for customer, {{varlik-sinifi}} for an asset). Under internal assignment the system supplies ' +
      'it; under external, the user does. In S/4HANA the BP group also has its own number range, which **must be ' +
      'mapped** to the vendor/customer range (CVI).',

    postingLogic:
      'Master data doesn\'t produce a posting, but it shapes the posting\'s form. The chain: **account group → ' +
      'field status → which fields are visible/mandatory**, and **{{mutabakat-hesabi}} → the posting\'s address in ' +
      'general ledger**.',

    accountDetermination:
      'Master data is an input to account determination: a vendor\'s `AKONT` field decides the vendor line\'s ' +
      'account, a material\'s {{degerleme-sinifi}} decides the inventory account via {{OBYC}}, and an asset\'s ' +
      '{{varlik-sinifi}} decides the asset accounts via {{AO90}}.',

    tur:
      '**Master data:** G/L account, vendor, customer, fixed asset, bank.\n\n' +
      '**Configuration:** account group, field status group, number range definition, asset class, CVI mapping.\n\n' +
      'Something that looks borderline but **is** configuration: field status groups. Something that looks ' +
      'borderline but **is** master data: house bank records (moved into master data via BAM in S/4HANA).',

    transport:
      'Master data **doesn\'t transport**. The account you open in test doesn\'t exist in production; it\'s loaded ' +
      'separately into each system ({{LTMC}}, {{LSMW}}, or by hand). The account group, field status, and number ' +
      'range **definition** transport — but the number range\'s **current counter** doesn\'t.',

    img:[
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Master Data → G/L Accounts → Preparations → Define Account Group', not:'{{hesap-grubu}} and {{alan-durumu}} ({{OBD4}})' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Vendor Accounts → Master Data → Preparations for Creating Vendor Master Data → Define Account Groups with Screen Layout (Vendors)', not:'Vendor account group and field status' },
      { yol:'SPRO → Financial Accounting → Accounts Receivable and Accounts Payable → Customer Accounts → Master Data → Preparations for Creating Customer Master Data → Define Account Groups with Screen Layout (Customers)', not:'Customer account group' },
      { yol:'SPRO → Cross-Application Components → Master Data Synchronization → Customer/Vendor Integration', not:'**CVI** — the BP-to-vendor/customer mapping in S/4HANA. A mandatory step of any S/4HANA migration.' },
      { yol:'SPRO → Financial Accounting → Asset Accounting → Organizational Structures → Asset Classes → Define Asset Classes', not:'{{varlik-sinifi}} ({{OAOA}})' },
    ],

    ekstra:[
      { ic:'🔐', baslik:'Master data and audit', metin:
        'Master data changes are logged to {{CDHDR}} (who, when) and {{CDPOS}} (which field, old value, new value). ' +
        'It\'s the report auditors ask for most.\n\n' +
        'The critical fields to monitor: a vendor\'s **bank account** (the `LFBK` table), the **reconciliation ' +
        'account** (`AKONT`), and the **payment block** (`ZAHLS`). A bank-account change is the most common method ' +
        'of payment fraud — a fake email says "our bank account changed," and the payment goes to a different account.' },
      { ic:'🧹', baslik:'How is master data quality measured?', metin:
        'Three simple queries surface most problems:\n\n' +
        '**Duplicates:** multiple `LIFNR`s in {{LFA1}} sharing the same `STCD1` (tax number).\n\n' +
        '**Gaps:** {{LFB1}} records with a blank `AKONT`, vendors with a blank `ZTERM`.\n\n' +
        '**Dead records:** vendors with no activity in the last 2 years (never appearing in {{BSIK}}/{{BSAK}}). ' +
        'These aren\'t deleted — they\'re blocked.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Master data isn\'t deleted', metin:
        'Because historical documents reference master data, deletion is almost never used. The deletion flag ' +
        '(`LOEVM`) only signals to the archiving program that "this record can be archived." The correct approach ' +
        'in practice is **blocking**: close it for posting, close it for payment, or set a central block.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'On the master data side, the one big change S/4HANA brought is the **Business Partner requirement**. It\'s a ' +
      'job every project migrating from ECC runs into, and one that\'s usually underestimated.',

    eccFarklari:[
      { konu:'Customer/vendor maintenance', ecc:'{{XK01}}/{{XD01}} — separately, with separate numbers', s4:'{{BP}} — a single object, split by roles' },
      { konu:'The same company as both customer and vendor', ecc:'Two separate master records, mapped manually', s4:'One BP record, two roles' },
      { konu:'Cost element', ecc:'A separate master record via {{KA01}}', s4:'A type of the G/L account ({{FS00}} → Primary Costs)' },
      { konu:'House bank', ecc:'{{FI12}} — behaves like configuration', s4:'Bank Account Management (BAM) — master data with workflow support' },
      { konu:'Account master data', ecc:'No account-type concept', s4:'GLACCOUNT_TYPE mandatory: Balance Sheet / Primary Costs / Secondary Costs / Nonoperating' },
      { konu:'Data loading', ecc:'{{LSMW}} common', s4:'{{LTMC}} / Migrate Your Data; LSMW **not recommended** for BP' },
    ],

    universalJournal:
      'Master data doesn\'t write directly to {{ACDOCA}}, but it feeds its fields: a vendor\'s `AKONT` feeds ' +
      '`RACCT`, an asset\'s class feeds the accounts linked via `ANLN1`, and an account\'s type decides whether the ' +
      'posting flows into CO at all. In other words, master data is the Universal Journal\'s **fill-in rules**.',

    kalkanTcodes:[
      { eski:'{{FK01}} / {{FK02}} / {{FK03}}', yeni:'{{BP}}', not:'Vendor — removed' },
      { eski:'{{XK01}}', yeni:'{{BP}}', not:'Central vendor maintenance — redirects to BP' },
      { eski:'{{FD01}} / {{XD01}}', yeni:'{{BP}}', not:'Customer — removed' },
      { eski:'{{KA01}} / KA02 / KA03', yeni:'{{FS00}}', not:'The cost element turned into a G/L account type' },
      { eski:'{{FI12}}', yeni:'FI12_HBANK / BAM', not:'House bank management moved to Fiori' },
    ],

    fiori:[
      { ad:'Maintain Business Partner', aciklama:'The Fiori counterpart of {{BP}}; role management is visually clearer.' },
      { ad:'Manage G/L Account Master Data', aciklama:'Replaces {{FS00}}; supports bulk editing and Excel import/export.' },
      { ad:'Manage Bank Accounts', aciklama:'Manages house bank accounts with an approval workflow (BAM).' },
      { ad:'Manage Fixed Assets', aciklama:'Replaces {{AS01}}/{{AS02}}; the asset list and values on one screen.' },
      { ad:'Migrate Your Data', aciklama:'The Fiori face of {{LTMC}} — the standard load tool for S/4HANA 2020 and later.' },
    ],

    compatibilityViews:[
      '{{LFA1}}, {{LFB1}}, {{KNA1}}, {{KNB1}} **remain physical tables** — they weren\'t removed.',
      'But they\'re now populated by {{BP}} via CVI synchronization; a custom program writing to them directly breaks that synchronization.',
      'Whether old custom programs perform a direct INSERT/UPDATE on {{LFA1}} needs to be scanned before migration.',
    ],

    performans:
      'Master data reads are noticeably faster in S/4HANA; but the {{BP}} screen slows down as the number of roles ' +
      'grows. For bulk maintenance, prefer Fiori\'s bulk-edit feature or a BAPI over the screen.',

    bestPractices:[
      'Build CVI **at the start** of an S/4HANA migration project; leaving it for the end is one of the most common causes of delay.',
      'Clean up duplicate vendors/customers before migration — merging them after they\'ve moved into BP is far harder.',
      'Keep the BP group\'s number range **identical** to the vendor/customer account group\'s; if they differ, the same business partner ends up with two different numbers and reporting gets confused.',
      'When opening a new account, pick the right account type: open an expense account as "Balance Sheet" instead of "Primary Costs" and it never flows into CO — fixing it later, once there are postings, is close to impossible.',
      'Don\'t try to load BP with {{LSMW}}; use {{LTMC}} templates.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'Starting to work with a new supplier — from master data to the first payment',
    hikaye:
      '**Marmara Textiles Inc.** decides to start working with a new paint supplier ("Ege Kimya Inc."). This ' +
      'scenario shows every step from opening the master record to the first payment, and **which future behavior ' +
      'each field in master data decides**.',
    veriler:[
      { k:'Company code', v:'1000 — Marmara Textiles Inc.' },
      { k:'Supplier', v:'Ege Kimya Inc., tax no 1234567890' },
      { k:'Agreement', v:'60-day terms, 2% early-payment discount (within 10 days)' },
      { k:'First order', v:'200,000 TRY + 20% VAT' },
    ],

    adimlar:[
      { baslik:'A duplicate check is run', tcode:'SE16N',
        aciklama:'The master data team searches table {{LFA1}} by tax number, checking whether the same company is already registered under a different spelling.',
        girdi:[
          { alan:'Table', deger:'LFA1' },
          { alan:'Selection', deger:'STCD1 = 1234567890' },
          { alan:'Result', deger:'No record → can be opened as new' },
        ],
        not:'Skip this step, and the same company gets opened under two numbers; balances split, reconciliation becomes impossible, and two separate payments can go out.' },

      { baslik:'A BP record is opened — the general layer', tcode:'BP',
        aciklama:'A new business partner is opened as type Organization. This data writes to {{LFA1}} and is shared across every company code.',
        girdi:[
          { alan:'Business partner type', deger:'Organization' },
          { alan:'BP group', deger:'Z001 — Domestic supplier (internal number assignment)' },
          { alan:'Name', deger:'Ege Kimya Inc.' },
          { alan:'Country / Address', deger:'TR / Izmir' },
          { alan:'Tax no (`STCD1`)', deger:'1234567890' },
          { alan:'Bank (IBAN)', deger:'TR12 0001 ... (subject to separate approval)' },
        ],
        tabloEtkisi:[
          { tablo:'LFA1', ne:'New record: LIFNR = 100456, NAME1, STCD1, KTOKK filled in' },
          { tablo:'CDHDR', ne:'Creation entry: user, date, time' },
        ] },

      { baslik:'The FI Vendor role is added — the company code layer', tcode:'BP',
        aciklama:'The step where the actual accounting decisions get made. Every field here decides a future behavior.',
        girdi:[
          { alan:'Role', deger:'FI Vendor (FLVN00)' },
          { alan:'Company code', deger:'1000' },
          { alan:'Reconciliation account (`AKONT`)', deger:'320000 — Trade payables (domestic)' },
          { alan:'Payment terms (`ZTERM`)', deger:'ZB02 — net 60 days, 2% discount within 10 days' },
          { alan:'Payment method (`ZWELS`)', deger:'H (bank transfer)' },
          { alan:'Payment block (`ZAHLS`)', deger:'A — blocked until the first invoice is approved' },
          { alan:'Sort key (`ZUAWA`)', deger:'001 — the document date is written into the assignment field' },
        ],
        tabloEtkisi:[
          { tablo:'LFB1', ne:'AKONT = 320000, ZTERM = ZB02, ZWELS = H, ZAHLS = A' },
        ],
        not:'Setting the payment block from the start is a deliberate control: the vendor enters the system, but no money can go out until the first invoice is checked.' },

      { baslik:'The first invoice is entered', tcode:'FB60',
        aciklama:'Notice: the user **never entered** the due date, the reconciliation account, or the discount terms. All of it came from master data.',
        girdi:[
          { alan:'Vendor', deger:'100456 — Ege Kimya Inc.' },
          { alan:'Invoice date', deger:'01.06.2026' },
          { alan:'Amount', deger:'240,000 TRY gross (20% VAT included)' },
          { alan:'Due date — **automatic**', deger:'31.07.2026 (60 days, from `ZTERM`)' },
          { alan:'Discount — **automatic**', deger:'2% = 4,000 TRY through 11.06.2026' },
          { alan:'Reconciliation account — **automatic**', deger:'320000 (from `AKONT`)' },
        ],
        fis:{ baslik:'Document 1900000112 — Ege Kimya\'s first invoice', belgeTuru:'KR', tarih:'01.06.2026',
          satirlar:[
            { hesap:'153', ad:'Trade goods', borc:200000 },
            { hesap:'191', ad:'Deductible VAT', borc:40000 },
            { hesap:'320', ad:'Trade payables — Ege Kimya', alacak:240000, not:'The account came from master data' },
          ] },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'Open item: 240,000 TRY, due 31.07.2026, payment block A (inherited from master data)' },
        ] },

      { baslik:'The payment run is executed — the block stops it', tcode:'F110',
        aciklama:'The invoice is due, but {{F110}} never proposed the item. Cause: the payment block on the master record.',
        girdi:[
          { alan:'Proposal result', deger:'The item is on the exception list, marked "blocked"' },
          { alan:'Exception reason', deger:'Payment block A — coming from master data' },
        ],
        not:'This is the most concrete example of how master data controls payment behavior. The block isn\'t on the invoice, it\'s on **the vendor**.' },

      { baslik:'The block is removed and payment is made', tcode:'BP',
        aciklama:'Once the first invoice has been checked, the payment block is cleared via {{BP}} → company code data → payment block. On the next {{F110}} run, the payment goes through.',
        fis:{ baslik:'Document 2000000034 — Payment', belgeTuru:'KZ', tarih:'31.07.2026',
          satirlar:[
            { hesap:'320', ad:'Trade payables — Ege Kimya', borc:240000, not:'Open item cleared' },
            { hesap:'102', ad:'Banks', alacak:240000 },
          ], not:'Because the discount window (through 11.06) had already passed, the discount wasn\'t applied. Paid ' +
               'earlier, 4,000 TRY would have been saved — the discount defined in master data made that possible.' },
        tabloEtkisi:[
          { tablo:'BSIK', ne:'The item was removed from here' },
          { tablo:'BSAK', ne:'Moved here as a cleared item, AUGBL = 2000000034' },
          { tablo:'REGUH', ne:'Payment header: payee, amount, bank' },
          { tablo:'REGUP', ne:'Which invoice this payment cleared' },
        ] },
    ],

    sonuc:
      'While entering the invoice, the user only typed **the vendor number and the amount**. The due date, the ' +
      'discount terms, the reconciliation account, the payment method, and the payment block — all of it came from ' +
      'master data.\n\n' +
      'The lesson: **master data writes the behavior of hundreds of future transactions in advance.** That\'s why a ' +
      'master data error doesn\'t affect a single document — it affects every transaction tied to that record, and ' +
      'it usually surfaces months later.\n\n' +
      'In this scenario, 4,000 TRY was lost because the discount window was missed. The master data was correct, ' +
      'the process was slow — but had the master data been wrong, the discount would **never** have been calculated ' +
      'at all, and nobody would have noticed.',
  },

  },
});
