/* ==========================================================================
   content/fi-en/org-yapisi.js — English body for "Organisational Structure"
   Same conventions as content/fi-en/genel-muhasebe.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'org-yapisi',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'The organisational structure is the **skeleton** FI is built on. Before a single posting is made, the system ' +
      'needs answers to these questions already defined:\n\n' +
      '**"Who is posting?"** → {{sirket-kodu}} (the legal accounting entity)\n' +
      '**"Which accounts does it use?"** → {{hesap-plani}}\n' +
      '**"How is the year split?"** → {{mali-yil-varyanti}}\n' +
      '**"In which currency?"** → local currency\n\n' +
      'These four decisions are **linked to each other**, and almost none of them can be changed afterward. Changing ' +
      'a company code\'s chart of accounts after go-live is practically impossible — every posting references it.\n\n' +
      'This is what sets the organisational structure apart: **the cost of a mistake here is proportional not to its ' +
      'size, but to how late it is noticed.**',

    neden:
      '**Statutory obligation.** Every legal entity must produce its own balance sheet and income statement; the ' +
      'company code is the system\'s counterpart to that.\n\n' +
      '**Data separation.** Two companies running on the same system must not have their postings mixed together.\n\n' +
      '**Shared use.** Conversely, some things **should** be shared: if the same vendor sells goods to two companies, ' +
      'it shouldn\'t be defined twice.\n\n' +
      '**Consolidation.** For group reporting, how the companies will roll up has to be planned from the start.\n\n' +
      '**Authorization.** Who can post in which company code — authorization rests on this structure.',

    sirketOnemi:
      'Organisational structure decisions are made in the project\'s **first two weeks** and live for **ten years**. ' +
      'It sits at the top of any "irreversible decisions" list in consulting.\n\n' +
      'A classic expensive mistake: setting up a separate chart of accounts for every country. It\'s easy in the ' +
      'short term, but it makes consolidation impossible later and a shared {{kontrol-alani}} can never be built.\n\n' +
      'The ayırt edici question is: **"What\'s the difference between a company and a company code?"** The correct ' +
      'answer: a **company code** is the legal accounting unit (it produces a balance sheet); a **company** is a ' +
      'consolidation umbrella. Multiple company codes can roll up into one company. Confuse the two, and the ' +
      'consolidation structure gets built wrong.',

    gercekHayat:
      'A holding company operates in Turkey and Germany. Three questions land on the table at the kickoff meeting:\n\n' +
      '**1. How many company codes?** Two — two separate legal entities, two separate balance sheets.\n\n' +
      '**2. How many charts of accounts?** This is where the argument starts. Turkey uses the Uniform Chart of ' +
      'Accounts, Germany uses SKR. Setting up two separate charts feels "natural."\n\n' +
      '**But:** with separate charts, a shared {{kontrol-alani}} can\'t be built — cross-company cost allocation ' +
      'becomes impossible. Consolidation also needs manual mapping.\n\n' +
      '**The solution:** a single **operational chart of accounts** is built (the group standard). Local statutory ' +
      'needs are met with a **country chart of accounts**: the same account can appear under a different number in ' +
      'local reporting.\n\n' +
      '**3. Fiscal year variant?** Both run January–December → same variant. Had they differed, a shared controlling ' +
      'area still couldn\'t be built.\n\n' +
      'The answers to all three questions are linked — **which is exactly why they\'re decided together**.',

    muhasebeMantigi:
      'The organisational structure\'s accounting logic rests on **a single principle**: **a balance sheet is ' +
      'produced for one legal entity.**\n\n' +
      'For a balance sheet to mean anything, its assets and liabilities must belong to **the same legal person**. ' +
      'That\'s why {{sirket-kodu}} is FI\'s most fundamental unit of separation: every document belongs to one ' +
      'company code, and a cross-company-code posting produces **two separate documents** (bridged by intercompany ' +
      'payable/receivable accounts).\n\n' +
      'The second principle: **the chart of accounts is the balance sheet\'s language.** If two companies share the ' +
      'same chart, their balance sheets can be **summed directly**. If they use different charts, every account has ' +
      'to be mapped by hand.\n\n' +
      'The third principle: **the fiscal year variant is the system\'s counterpart to the matching principle.** It ' +
      'decides which date falls into which period; special periods (13–16) let closing entries be kept apart from ' +
      'the regular months.',

    kavramlar: ['sirket-kodu', 'hesap-plani', 'mali-yil-varyanti', 'is-alani',
                'kredi-kontrol-alani', 'kontrol-alani', 'kar-merkezi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Building the organisational structure moves **top-down**: shared structures first (chart of accounts, fiscal ' +
      'year variant), then the company code, and assignments last. The order can\'t be reversed — the lower level ' +
      'references the higher one.',

    roller:[
      { rol:'Project management', gorev:'How many legal entities, how many countries, how consolidation will work — a **business decision**.' },
      { rol:'FI consultant', gorev:'Designs the chart of accounts, fiscal year variant, and company code.' },
      { rol:'CO consultant', gorev:'Designs the {{kontrol-alani}} **together with** FI — it\'s a dependency.' },
      { rol:'Tax advisor', gorev:'States the local statutory reporting requirements (country chart of accounts).' },
      { rol:'Authorization', gorev:'Builds authorization structure keyed on company code.' },
      { rol:'Basis', gorev:'Moves settings from test to production via a transport request.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Build order — top to bottom, irreversible',
      adimlar:[
        { ic:'📗', rol:'FI consultant', baslik:'{{hesap-plani}} is defined ({{OB13}})',
          aciklama:'**The most fundamental decision.** A **single operational chart of accounts** should be the ' +
                   'target group-wide; otherwise a shared controlling area and easy consolidation become impossible.',
          cikti:'Chart of accounts', ok:'the year is split' },
        { ic:'📅', rol:'FI consultant', baslik:'{{mali-yil-varyanti}} is defined ({{OB29}})',
          aciklama:'How many regular periods (usually 12), how many **special periods** (13–16). If it differs from ' +
                   'the calendar year (April–March), it\'s decided here.',
          cikti:'Fiscal year variant', ok:'the company is opened' },
        { ic:'🏢', rol:'FI consultant', baslik:'{{sirket-kodu}} is created ({{OX02}})',
          aciklama:'**Create by copying** — never from scratch. Copying brings along hundreds of linked settings and ' +
                   'reduces the risk of a forgotten one.',
          cikti:'Company code', ok:'settings are linked' },
        { ic:'🔗', rol:'FI consultant', baslik:'Global parameters are assigned ({{OBY6}})',
          aciklama:'Chart of accounts · fiscal year variant · local currency · country · posting period variant · ' +
                   'field status variant.',
          cikti:'Configured company code', ok:'CO is set up' },
        { ic:'🎛️', rol:'CO consultant', baslik:'{{kontrol-alani}} is built ({{OKKP}})',
          aciklama:'Company codes are assigned. **Requirement: the same chart of accounts + the same fiscal year ' +
                   'variant.** That\'s why CO design can\'t be done independently of FI.',
          cikti:'CO organisation', ok:'additional structures' },
        { ic:'💳', rol:'FI consultant', baslik:'Additional organisational units',
          aciklama:'{{kredi-kontrol-alani}} ({{OB45}}), {{is-alani}} ({{OX03}}), consolidation company ({{OX15}}), ' +
                   'the {{kar-merkezi}} structure.',
          cikti:'Full organisation', ok:'it is transported' },
        { ic:'🚚', rol:'Basis', baslik:'It goes live via a transport request',
          aciklama:'Configuration is verified in the test system and moved with {{tasima-istegi}}.',
          cikti:'Production system' },
      ],
    },

    adimlar:[
      { rol:'FI consultant', eylem:'Defines the chart of accounts', sistem:'{{OB13}} → {{T004}}' },
      { rol:'FI consultant', eylem:'Defines the fiscal year variant', sistem:'{{OB29}} → {{T009}}' },
      { rol:'FI consultant', eylem:'Creates the company code **by copying**', sistem:'{{OX02}} → {{T001}}' },
      { rol:'FI consultant', eylem:'Assigns the global parameters', sistem:'{{OBY6}} — four critical fields' },
      { rol:'FI consultant', eylem:'Assigns the posting period variant', sistem:'{{OB52}} → {{T001B}}' },
      { rol:'CO consultant', eylem:'Builds the controlling area and assigns company codes', sistem:'{{OKKP}} → {{TKA01}}' },
      { rol:'FI consultant', eylem:'Defines the credit control area', sistem:'{{OB45}} → {{T014}}' },
      { rol:'Basis', eylem:'Transports the configuration', sistem:'{{tasima-istegi}}' },
    ],

    veriAkisi:{
      nereden:'Business decisions: how many legal entities, which countries, consolidation needs, local statutory ' +
              'reporting requirements.',
      nereye:'{{T001}} company code · {{T004}} chart of accounts · {{T009}} fiscal year variant · {{T880}} company · ' +
             '{{T014}} credit control area · {{TKA01}} controlling area.',
      tetikleyen:'A go-live project; adding a new company/country; a merger or acquisition.',
      sonraki:'Master data setup, account determination, user authorization.',
    },

    notlar:[
      { tip:'warn', baslik:'Create a company code by copying, never from scratch', metin:
        'Creating a company code with "new entry" in {{OX02}} is **technically possible** but wrong in practice.\n\n' +
        'A company code has **hundreds of linked settings**: document types, number ranges, tolerance groups, field ' +
        'status, tax settings, bank definitions…\n\n' +
        'None of these exist on a company code opened from scratch. The gaps surface **one error at a time**, and ' +
        'each has to be solved separately — it takes weeks.\n\n' +
        '**The right method:** **copy** a working company code (or SAP\'s model one), then fix the differences. ' +
        'Copying brings the linked settings along.\n\n' +
        'What to always check after copying: country, currency, tax settings, bank accounts, address. These come ' +
        'from the source company code and **are hard to notice if left wrong**.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The organisational structure\'s accounting impact **doesn\'t directly produce a posting** — but it decides ' +
      'which balance sheet every posting will end up on. The examples below show how the structure reflects into ' +
      'postings.',

    etkilenenHesaplar:[
      { hesap:'All accounts', tur:'Variable', neden:'Every posting belongs to a {{sirket-kodu}}; the balance sheet is produced at the company-code level.' },
      { hesap:'Intercompany payable/receivable accounts', tur:'Balance sheet', neden:'A cross-company-code transaction produces **two separate documents**; these accounts build the bridge.' },
      { hesap:'Country chart of accounts equivalents', tur:'Reporting', neden:'The operational chart is the group standard; an **alternative account number** is used for the local statutory report.' },
      { hesap:'Posting period control', tur:'Structural', neden:'{{T001B}} — which account type can be posted to in which period ({{OB52}}).' },
    ],

    fisler:[
      { baslik:'Normal posting — single company code',
        belgeTuru:'KR', tarih:'10.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — **company code 1000**', borc:50000 },
          { hesap:'191', ad:'Deductible VAT', borc:10000 },
          { hesap:'320', ad:'Trade payables', alacak:60000 },
        ],
        not:'All three lines belong to **the same company code**. One document, one balance sheet.\n\n' +
             'This is what **99% of postings** look like. The company code field is entered once on the posting ' +
             'screen, and every line inherits it.' },

      { baslik:'Cross-company posting — **two documents are created**',
        belgeTuru:'KR', tarih:'15.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Expense — **company code 2000** (bearing the cost)', borc:80000 },
          { hesap:'395', ad:'Intercompany payables — to company 1000', alacak:80000, not:'2000\'s document' },
          { hesap:'195', ad:'Intercompany receivables — from company 2000', borc:80000, not:'1000\'s document' },
          { hesap:'320', ad:'Trade payables — **company code 1000** (received the invoice)', alacak:80000 },
        ],
        not:'The invoice arrived at 1000, but the expense belongs to 2000. **A single document isn\'t enough** — ' +
             'because each legal entity produces its own balance sheet.\n\n' +
             'The system creates **two separate documents** and builds the bridge with intercompany accounts. Each ' +
             'company\'s document is balanced on its own.\n\n' +
             'In consolidation, 395 and 195 **cancel each other out** — no liability arose toward anyone outside the ' +
             'group.' },

      { baslik:'Country chart of accounts — **one posting**, reported under two numbers',
        belgeTuru:'KR', tarih:'20.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'400100', ad:'Office expenses (operational/group chart)', borc:50000,
            not:'Printed as **770** on the local report' },
          { hesap:'160000', ad:'Trade payables (operational/group chart)', alacak:50000,
            not:'Printed as **320** on the local report' },
        ],
        not:'**The posting happens only once** — on the operational (group) chart of accounts.\n\n' +
             'Turkey\'s statutory report requires Uniform Chart of Accounts numbers: 770 and 320. For that, an ' +
             '**alternative account number** is defined on the G/L account master:\n\n' +
             '`400100` → alternative `770`\n' +
             '`160000` → alternative `320`\n\n' +
             'Which number gets printed is chosen when the report is pulled. **One posting, two views.**\n\n' +
             'This way consolidation works directly (every country on the same chart) and local compliance is ' +
             'satisfied — **without setting up a second operational chart**.' },
    ],

    tHesaplar:[
      { hesap:'Intercompany payables — Company 2000', kod:'395',
        borc:[],
        alacak:[{ ad:'Expense paid by 1000', tutar:80000 }],
        not:'Eliminated in consolidation' },
      { hesap:'Intercompany receivables — Company 1000', kod:'195',
        borc:[{ ad:'Paid on behalf of 2000', tutar:80000 }],
        alacak:[],
        not:'**Mirrors** 395 — the totals must be equal' },
    ],

    notlar:[
      { tip:'tip', baslik:'Intercompany accounts must always be reconciled at period end', metin:
        'Cross-company transactions produce mirroring accounts like 395/195, and these accounts **must equal each ' +
        'other**: what company A is owed by B must equal what company B owes A.\n\n' +
        'If they don\'t match, there are three possible reasons:\n\n' +
        '**1.** One side posted, the other didn\'t (a timing gap).\n' +
        '**2.** An exchange-rate difference — if the transaction was in foreign currency, the two sides may have ' +
        'converted it at different rates.\n' +
        '**3.** The wrong account was used.\n\n' +
        'This reconciliation is a **prerequisite for consolidation**: if the items that need to be eliminated don\'t ' +
        'match, the group balance sheet won\'t balance.\n\n' +
        'An "intercompany account reconciliation" item belongs on the period-end closing checklist.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Organisational units fall into **two groups**: **mandatory ones** (FI doesn\'t work without them) and ' +
      '**optional ones** (built as needed). The list below follows that split.',

    liste:[
      { ad:'Mandatory · Company Code',
        aciklama:'**The legal accounting unit.** The balance sheet and income statement are produced at this level.',
        neZaman:'One for every legal entity. FI\'s most fundamental unit.',
        ornek:'4 characters (1000, TR01). Every document belongs to one company code. Stored in table {{T001}}.',
        tcodes:['OX02','OBY6'] },

      { ad:'Mandatory · Chart of Accounts',
        aciklama:'The list of usable G/L accounts — **the balance sheet\'s language**.',
        neZaman:'At least one. Multiple company codes can share the **same** chart.',
        ornek:'**A single operational chart group-wide should be the target.** Separate charts block a shared ' +
              '{{kontrol-alani}} and easy consolidation.',
        tcodes:['OB13','FS00'] },

      { ad:'Mandatory · Fiscal Year Variant',
        aciklama:'How the year splits into periods; **the system\'s counterpart to the matching principle**.',
        neZaman:'Assigned to every company code.',
        ornek:'`K4` calendar year (12 regular + 4 special periods). A separate variant is defined for a shifted year like April–March.',
        tcodes:['OB29'] },

      { ad:'Mandatory · Local Currency',
        aciklama:'The currency the company code keeps its books in ({{T001}} `WAERS`).',
        neZaman:'While the company code is being defined. **Cannot be changed afterward.**',
        ornek:'Group and free currencies can be defined **additionally** — but this too must be done before ' +
              'posting begins ({{paralel-para-birimi}}).' },

      { ad:'Optional · Country Chart of Accounts',
        aciklama:'**Alternative account numbers** for local statutory reporting.',
        neZaman:'When the group operational chart is used but local law wants a different numbering.',
        ornek:'The posting is made to 400100, and the statutory report prints it as 770. Achieves both consolidation ' +
              'and local compliance **without a second chart of accounts**.' },

      { ad:'Optional · Company (consolidation)',
        aciklama:'The consolidation umbrella. **Multiple company codes** can roll up into one company.',
        neZaman:'Whenever group consolidation is performed.',
        ornek:'**Not to be confused with a company code:** a company code produces a balance sheet, a company is a ' +
              'consolidation unit. Stored in table {{T880}}.',
        tcodes:['OX15'] },

      { ad:'Optional · {{is-alani}}', en:'Business Area',
        aciklama:'A reporting unit based on activity, **independent** of company code.',
        neZaman:'When activity-based reporting needs to cross company-code boundaries.',
        ornek:'**Largely replaced by {{kar-merkezi}} and segment in S/4HANA.** Generally not chosen in new implementations.',
        tcodes:['OX03'] },

      { ad:'Optional · {{kredi-kontrol-alani}}', en:'Credit Control Area',
        aciklama:'The unit where customer {{kredi-limiti}} checks are done.',
        neZaman:'Whenever sales on credit occur.',
        ornek:'If multiple company codes are assigned, a customer\'s **total risk** is tracked together. If separate ' +
              'areas are set up, each company manages its own limit independently.',
        tcodes:['OB45'] },

      { ad:'Optional · {{kontrol-alani}} (CO)', en:'Controlling Area',
        aciklama:'The framework cost accounting runs in.',
        neZaman:'Whenever CO is used — practically every implementation.',
        ornek:'**Depends on FI:** the company codes assigned to it must use **the same chart of accounts** and ' +
              '**the same fiscal year variant**. That\'s why CO design can\'t be done independently of FI.',
        tcodes:['OKKP'] },

      { ad:'Optional · {{kar-merkezi}} / Segment', en:'Profit Center / Segment',
        aciklama:'Units for responsibility- and segment-based reporting.',
        neZaman:'Whenever a segmented balance sheet is required — together with {{belge-bolme}}.',
        ornek:'Carried as an {{ACDOCA}} dimension in S/4HANA; the modern alternative to {{is-alani}}.' },
    ],

    karsilastirmaBasliklar:['Company code', 'Company (consolidation)'],
    karsilastirma:[
      ['Purpose', 'The **statutory accounting** unit', 'The **consolidation** umbrella'],
      ['Produces a balance sheet?', '**Yes** — its whole purpose', 'No — it merges them'],
      ['Table', '{{T001}}', '{{T880}}'],
      ['Transaction code', '{{OX02}}', '{{OX15}}'],
      ['Numeric relationship', '**Multiple** company codes to one company', 'One company code to **one** company'],
      ['Present on the document?', '**Yes** — on every document', 'No — derived'],
      ['Mandatory?', '**Yes**', 'No — unnecessary if no consolidation is done'],
      ['Common mistake', '—', 'Thinking the two are the same → consolidation structure built wrong'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'OX02', ad:'Create / change company code',
        amac:'Defines the legal accounting unit; holds the address and basic data.',
        neZaman:'When a new legal entity is added.',
        adimlar:[
          { baslik:'**Choose the company code to copy from**',
            aciklama:'Use "Copy, delete, check company code." **Don\'t create from scratch** — hundreds of linked ' +
                     'settings will be missing.' },
          { baslik:'Enter the new code and name', aciklama:'4 characters. The naming standard should be decided up front.' },
          { baslik:'Fix the address data',
            aciklama:'The address that came with the copy belongs to the source company; **it must always be changed**.' },
          { baslik:'Review the copied settings',
            aciklama:'Country, currency, tax settings, bank accounts — all of it comes from the source, and **is ' +
                     'hard to notice if left wrong**.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'"Copy, delete, check company code"' },
          { ekran:'Copy', islem:'Source **1000** → target **2000**' },
          { ekran:'Confirmation', islem:'Copy dependent tables too? → **Yes**' },
          { ekran:'Correction', islem:'Name, address, country, currency are updated' },
        ],
        alanlar:{
          zorunlu:['Company code','Company name','City','Country','Currency','Language'],
          opsiyonel:['Address details','Tax number'] },
        hatalar:[
          { mesaj:'Company code ... already exists', sebep:'The code is already in use.', cozum:'Pick a different code. **Never reuse a deleted company code\'s code** — it can clash with old transport records.' },
          { mesaj:'A document can\'t be posted after copying', sebep:'The linked settings only copied partially.', cozum:'Check the {{OBY6}} global parameters and the number ranges.' },
        ],
        ipucu:'**Post-copy checklist:** country · currency · tax settings · bank accounts · address · number ranges.\n\n' +
              'These come from the source company code. If the country is left wrong, **tax codes won\'t work**; if ' +
              'the currency is left wrong, **every posting gets converted incorrectly** and it\'s close to impossible ' +
              'to fix.',
        ilgili:['OBY6','OB13','OB29'] },

      { kod:'OBY6', ad:'Company code global parameters — **the most critical screen**',
        amac:'Defines the company code\'s core links: chart of accounts, fiscal year variant, currency, and so on.',
        neZaman:'Immediately after the company code is created.',
        adimlar:[
          { baslik:'Select the company code' },
          { baslik:'**Assign the chart of accounts**',
            aciklama:'**Cannot be changed once posting has started.** Every document references this chart.' },
          { baslik:'**Assign the fiscal year variant**',
            aciklama:'Changing it breaks period matching; practically irreversible.' },
          { baslik:'Assign the posting period variant', aciklama:'The variant {{OB52}} is tied to.' },
          { baslik:'Assign the field status variant', aciklama:'Decides which fields are mandatory/optional.' },
          { baslik:'Verify the country and currency',
            aciklama:'The country decides **tax codes**; if it\'s wrong, tax doesn\'t work.' },
        ],
        ekranAkisi:[
          { ekran:'List', islem:'Company code 2000 is selected' },
          { ekran:'Detail', islem:'Chart of accounts **INT** · fiscal year variant **K4**' },
          { ekran:'Detail', islem:'Country **TR** · currency **TRY** · language **TR**' },
          { ekran:'Detail', islem:'Field status variant **0001** · posting period variant **1000**' },
        ],
        alanlar:{
          zorunlu:['Chart of accounts','Fiscal year variant','Country','Currency','Field status variant','Posting period variant'],
          opsiyonel:['Business area mandatory flag','Tax numbers','Company (consolidation)'] },
        hatalar:[
          { mesaj:'Chart of accounts cannot be changed — postings exist', sebep:'Postings already exist on the company code.', cozum:'**Cannot be changed.** If a different chart is needed, a new company code must be set up and the data migrated — a project-sized job.' },
          { mesaj:'Fiscal year variant ... is not defined', sebep:'The variant hasn\'t been defined via {{OB29}}.', cozum:'Define the variant first; the order can\'t be skipped.' },
        ],
        ipucu:'**The four fields on this screen decide the project\'s fate:** chart of accounts, fiscal year ' +
              'variant, country, and currency.\n\n' +
              'All four are practically **unchangeable** once posting begins. That\'s why, before opening a company ' +
              'code, this question must be answered: *"Which controlling area will this company be assigned to ' +
              'later?"* Because a controlling area requires **the same chart of accounts and the same fiscal year ' +
              'variant**.',
        ilgili:['OX02','OB13','OB29','OKKP'] },

      { kod:'OB13', ad:'Define chart of accounts',
        amac:'Defines the list of usable G/L accounts and their properties.',
        neZaman:'At the very start of the implementation.',
        adimlar:[
          { baslik:'Enter the chart of accounts code and name', aciklama:'4 characters (INT, TDHP).' },
          { baslik:'Set the language and account number length',
            aciklama:'If the length is changed later, existing accounts are affected.' },
          { baslik:'Assign a group chart of accounts (if any)',
            aciklama:'The higher-level mapping used for consolidation.' },
          { baslik:'Check the blocking flag',
            aciklama:'A new chart can be kept blocked while it\'s being prepared, then opened.' },
        ],
        alanlar:{
          zorunlu:['Chart of accounts code','Name','Language','Account number length'],
          opsiyonel:['Group chart of accounts','Blocking flag'] },
        hatalar:[
          { mesaj:'Chart of accounts is blocked', sebep:'The blocking flag is on.', cozum:'Remove it once preparation is done.' },
        ],
        ipucu:'**How many charts of accounts should be built?** The answer is almost always **one**.\n\n' +
              'Setting up a separate chart per country is easy short-term, but:\n' +
              '• A shared {{kontrol-alani}} can\'t be built → cross-company cost allocation is over\n' +
              '• Consolidation requires manual mapping\n' +
              '• Group reporting needs a conversion every time\n\n' +
              'Local statutory need is solved with a **country chart of accounts** (an alternative account number) — ' +
              'without setting up a second operational chart.',
        ilgili:['OBY6','FS00','OKKP'] },

      { kod:'OB29', ad:'Define fiscal year variant',
        amac:'Decides how the year splits into periods and how many special periods exist.',
        neZaman:'At setup time; whenever the fiscal year differs from the calendar year.',
        adimlar:[
          { baslik:'Enter the variant code', aciklama:'`K4` — calendar year + 4 special periods (standard).' },
          { baslik:'Set the number of regular periods', aciklama:'Usually 12.' },
          { baslik:'**Set the number of special periods**',
            aciklama:'13–16. Lets closing entries be kept **separate** from December.' },
          { baslik:'Choose whether it\'s year-independent',
            aciklama:'For a shifted year like April–March, this is **not** checked, and period dates are entered by hand.' },
        ],
        alanlar:{
          zorunlu:['Variant code','Number of regular periods','Number of special periods'],
          opsiyonel:['Year-dependent flag','Period dates'] },
        hatalar:[
          { mesaj:'Period ... is not defined in fiscal year variant', sebep:'Period dates weren\'t fully entered for a shifted year.', cozum:'Complete the variant\'s period table; every day has to fall into some period.' },
        ],
        ipucu:'**Why do special periods exist?** Both regular transactions and closing entries happen in December. ' +
              'If everything is posted to period 12, the question *"what was December\'s actual expense?"* can never ' +
              'be answered.\n\n' +
              'Special periods (13–16) split off the closing entries: 13 → audit adjustments, 14 → tax adjustments, ' +
              'and so on.\n\n' +
              'The postings share the same date (31.12) but fall into **different periods**.',
        ilgili:['OB52','OBY6','closing'] },

      { kod:'OKKP', ad:'Controlling area — where FI and CO meet',
        amac:'Builds the CO organisation and assigns company codes.',
        neZaman:'After the FI organisational structure is complete.',
        adimlar:[
          { baslik:'Define the controlling area', aciklama:'Currency, chart of accounts, fiscal year variant.' },
          { baslik:'**Assign the company codes**',
            aciklama:'**Requirement:** the company codes assigned must use **the same chart of accounts** and ' +
                     '**the same fiscal year variant**.' },
          { baslik:'Select the active components', aciklama:'Cost center, internal order, CO-PA…' },
          { baslik:'Define the number ranges ({{KANK}})',
            aciklama:'**If missing, expense postings can\'t happen at all** — it stops FI too.' },
        ],
        ipucu:'**This screen is where organisational structure decisions get tested.** Company codes using different ' +
              'charts of accounts **cannot** be assigned to the same controlling area — which shows exactly why the ' +
              'chart-of-accounts decision must be made before, and with, CO in mind.\n\n' +
              'The full detail lives in {{konu:co-integration}}.',
        ilgili:['OBY6','OB13','KANK'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'The organisational structure\'s tables are small and simple, but **every FI document references them**. ' +
      '{{T001}} is one of the most-read configuration tables of all.',

    liste:[
      { ad:'T001', baslik:'Company code definition — FI\'s core table',
        tutar:'The company code\'s name, country, **currency**, **chart of accounts**, and **fiscal year variant** links.',
        olusturan:'{{OX02}}',
        guncelleyen:'{{OBY6}} global parameters',
        anahtar:'BUKRS',
        iliskiler:'{{BKPF}}, {{BSEG}}, {{ACDOCA}} — every document belongs to one company code.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'BUKRS', aciklama:'Company code (4 characters)', tip:'pk' },
          { ad:'BUTXT', aciklama:'Company name' },
          { ad:'LAND1', aciklama:'**Country** — determines tax codes' },
          { ad:'WAERS', aciklama:'**Local currency** — cannot be changed afterward' },
          { ad:'KTOPL', aciklama:'**Chart of accounts** — cannot be changed once posting has started', tip:'fk' },
          { ad:'PERIV', aciklama:'**Fiscal year variant**', tip:'fk' },
          { ad:'RCOMP', aciklama:'Company (consolidation unit)', tip:'fk' },
        ] },

      { ad:'T004', baslik:'Chart of accounts definition',
        tutar:'The chart of accounts\' code, name, language and account number length.',
        olusturan:'{{OB13}}',
        anahtar:'KTOPL',
        iliskiler:'{{T001}} `KTOPL` · {{SKA1}} account master data · {{T030}} account determination.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KTOPL', aciklama:'Chart of accounts code', tip:'pk' },
          { ad:'KTPLT', aciklama:'Chart of accounts name' },
          { ad:'XSPEA', aciklama:'Blocking flag' },
        ] },

      { ad:'T009', baslik:'Fiscal year variant',
        tutar:'The number of regular and special periods, and whether it\'s calendar-year dependent.',
        olusturan:'{{OB29}}',
        anahtar:'PERIV',
        iliskiler:'{{T001}} `PERIV`; period dates live in the T009B sub-table.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'PERIV', aciklama:'Variant code', tip:'pk' },
          { ad:'ANZBP', aciklama:'Number of regular periods (usually 12)' },
          { ad:'ANZSP', aciklama:'**Number of special periods** (usually 4 → periods 13–16)' },
          { ad:'XKALE', aciklama:'Whether it\'s calendar-year dependent' },
        ] },

      { ad:'T880', baslik:'Company (consolidation)',
        tutar:'Consolidation units. **Multiple company codes** can roll up into one company.',
        olusturan:'{{OX15}}',
        anahtar:'RCOMP',
        s4:'Unchanged.' },

      { ad:'T014', baslik:'Credit control area',
        tutar:'The unit and currency where credit limit checks are performed.',
        olusturan:'{{OB45}}',
        anahtar:'KKBER',
        s4:'Used together with SAP Credit Management.' },

      { ad:'T001B', baslik:'Posting period control',
        tutar:'Which account type can be posted to in which period.',
        olusturan:'{{OB52}}',
        anahtar:'BUKRS/variant + account type',
        s4:'Unchanged. Detailed in {{konu:closing}}.' },

      { ad:'TKA01', baslik:'Controlling area',
        tutar:'The CO organisation; its chart of accounts and fiscal year variant **must match the company codes\'**.',
        olusturan:'{{OKKP}}',
        anahtar:'KOKRS',
        s4:'Unchanged.' },
    ],

    er:{
      type:'er',
      baslik:'The organisational skeleton — everything links to T001',
      varliklar:[
        { ad:'T004', rol:'Configuration', aciklama:'Chart of accounts',
          alanlar:[{ ad:'KTOPL', tip:'pk' }, { ad:'KTPLT' }] },
        { ad:'T009', rol:'Configuration', aciklama:'Fiscal year variant',
          alanlar:[{ ad:'PERIV', tip:'pk' }, { ad:'ANZBP' }, { ad:'ANZSP' }] },
        { ad:'T880', rol:'Configuration', aciklama:'Company (consolidation)',
          alanlar:[{ ad:'RCOMP', tip:'pk' }] },
        { ad:'T001', rol:'Organisation', hub:true, aciklama:'**Company code — the hub**',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'KTOPL', tip:'fk' }, { ad:'PERIV', tip:'fk' }, { ad:'WAERS' }, { ad:'RCOMP', tip:'fk' }] },
        { ad:'TKA01', rol:'CO', aciklama:'Controlling area',
          alanlar:[{ ad:'KOKRS', tip:'pk' }, { ad:'KTOPL', tip:'fk' }] },
        { ad:'T014', rol:'Organisation', aciklama:'Credit control area',
          alanlar:[{ ad:'KKBER', tip:'pk' }] },
        { ad:'BKPF', rol:'Transaction', aciklama:'Every document belongs to a company code',
          alanlar:[{ ad:'BUKRS', tip:'fk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }] },
        { ad:'SKA1', rol:'Master data', aciklama:'A G/L account (chart-of-accounts level)',
          alanlar:[{ ad:'KTOPL', tip:'fk' }, { ad:'SAKNR', tip:'pk' }] },
      ],
      iliskiler:[
        { from:'T004', to:'T001', alanlar:'KTOPL', not:'**chart-of-accounts assignment**' },
        { from:'T009', to:'T001', alanlar:'PERIV', not:'fiscal year variant' },
        { from:'T880', to:'T001', alanlar:'RCOMP', not:'consolidation' },
        { from:'T001', to:'BKPF', alanlar:'BUKRS', not:'**every document, one company code**' },
        { from:'T004', to:'SKA1', alanlar:'KTOPL', not:'chart of accounts → accounts' },
        { from:'T004', to:'TKA01', alanlar:'KTOPL', not:'**the same-chart requirement**' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'The organisational structure has **no** end-user screen — it\'s all configuration. The three screens that ' +
      'matter most to a consultant: {{OX02}}, {{OBY6}}, and {{OKKP}}.',

    ekranlar:[
      { ad:'{{OX02}} — copying a company code',
        aciklama:'The screen a new company code is created on.',
        alanlar:[
          { ad:'Source company code', zorunlu:true, aciklama:'A **working company code** is chosen; its linked ' +
                   'settings copy along with it.' },
          { ad:'Target company code', zorunlu:true, aciklama:'4 characters, unique.' },
          { ad:'Name and address', zorunlu:true, aciklama:'The source data that came with the copy **must always be fixed**.' },
          { ad:'Copy dependent tables too?', zorunlu:true, aciklama:'**Yes** — this is the whole point.' },
        ],
        ipucu:'Post-copy checklist: **country · currency · tax settings · bank accounts · address · number ranges**.\n\n' +
              'If the country is left wrong, tax codes don\'t work. If the currency is left wrong, **every posting ' +
              'gets converted incorrectly**, and fixing it is close to impossible.' },

      { ad:'{{OBY6}} — global parameters',
        aciklama:'The screen holding the four fields that decide the project\'s fate.',
        alanlar:[
          { ad:'**Chart of accounts**', zorunlu:true, aciklama:'**Cannot be changed** once posting has started.' },
          { ad:'**Fiscal year variant**', zorunlu:true, aciklama:'Changing it breaks period matching.' },
          { ad:'**Country**', zorunlu:true, aciklama:'Decides tax codes.' },
          { ad:'**Currency**', zorunlu:true, aciklama:'Cannot be changed afterward.' },
          { ad:'Field status variant', zorunlu:true, aciklama:'Which fields are mandatory.' },
          { ad:'Posting period variant', zorunlu:true, aciklama:'The variant {{OB52}} is tied to.' },
        ],
        ipucu:'The question to answer before opening a company code: *"Which {{kontrol-alani}} will this be assigned ' +
              'to later?"*\n\n' +
              'Because a controlling area requires **the same chart of accounts** and **the same fiscal year ' +
              'variant**. These two fields are chosen right here, and can\'t be changed afterward.' },

      { ad:'{{OB13}} / {{OB29}} — the shared structures',
        aciklama:'Structures that must be defined **before** the company code.',
        alanlar:[
          { ad:'Chart of accounts code', zorunlu:true, aciklama:'**One chart** should be the group-wide target.' },
          { ad:'Account number length', zorunlu:true },
          { ad:'Fiscal year variant code', zorunlu:true },
          { ad:'Regular + special period count', zorunlu:true, aciklama:'12 + 4 is standard.' },
        ],
        ipucu:'These screens run **before** the company code. Skip the order, and {{OBY6}} has no value to assign — ' +
              'the build stalls halfway.' },
    ],

    zorunlu:['Company code','Chart of accounts','Fiscal year variant','Country','Currency','Field status variant'],
    opsiyonel:['Company (consolidation)','Business area','Credit control area','Country chart of accounts'],

    hatalar:[
      { mesaj:'Chart of accounts cannot be changed — postings exist', sebep:'Postings already exist on the company code.', cozum:'**Cannot be changed.** If a different chart is needed, a new company code has to be set up and the data migrated — a project-sized job. That\'s why the decision must be correct from the start.' },
      { mesaj:'Company codes have different charts of accounts (OKKP)', sebep:'An attempt to assign company codes with different charts to the same controlling area.', cozum:'Either align the charts of accounts or build a separate controlling area. **Cross-company cost allocation becomes impossible under the second option.**' },
      { mesaj:'Fiscal year variants are not the same', sebep:'The controlling area\'s and the company code\'s variants differ.', cozum:'They must be identical; period matching can\'t be established otherwise.' },
      { mesaj:'Tax codes don\'t work after copying', sebep:'The country field came from the source company code and was never corrected.', cozum:'Fix the country in {{OBY6}}; tax codes are **country-dependent**.' },
      { mesaj:'Field ... is not available for input', sebep:'The field status variant hid the field.', cozum:'Check the field status group. Both the account master and the document type affect a field.' },
      { mesaj:'Posting period ... is not open', sebep:'The {{OB52}} posting period variant hasn\'t been set.', cozum:'Periods need to be opened for the new company code; copying may not bring this.' },
    ],

    ipuclari:[
      '**Always create a company code by copying** — starting from scratch costs weeks.',
      'Always verify the **country and currency** after copying; both can silently stay wrong and are close to ' +
      'impossible to fix afterward.',
      'Aim for **a single operational chart of accounts group-wide**; solve local needs with a country chart of accounts.',
      'Before opening a company code, ask: *"which controlling area will it be assigned to?"* — the chart of ' +
      'accounts and fiscal year variant are chosen accordingly.',
      'Define the special periods (13–16) from the start; adding them later is possible but useless for past years.',
      'Put the reconciliation of intercompany accounts (at {{konu:closing}}) on the period-end checklist.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'T001', ne:'Company code definition and global parameters' },
      { tablo:'T004', ne:'Chart of accounts definition' },
      { tablo:'T009', ne:'Fiscal year variant' },
      { tablo:'T880', ne:'Company (consolidation unit)' },
      { tablo:'T014', ne:'Credit control area' },
      { tablo:'TKA01', ne:'Controlling area — chart-of-accounts and variant compatibility' },
    ],

    commit:
      'The organisational structure is **configuration**, not transaction data — LUW and commit logic doesn\'t apply ' +
      'the way it does to posting.\n\n' +
      'But there\'s an important technical consequence: {{T001}} **is read on every single posting**. The company ' +
      'code\'s chart of accounts, fiscal year variant and currency are used at every stage of a posting.\n\n' +
      'That\'s why {{T001}} is one of the most-read configuration tables, and it\'s buffered. A buffer refresh can ' +
      'sometimes be needed right after a configuration change.',

    belgeNo:
      'The organisational structure doesn\'t generate document numbers. But **number ranges are keyed by company ' +
      'code** ({{FBN1}}): each company code uses its own ranges, and when a new company code is opened, the ranges ' +
      'need to be opened too.\n\n' +
      'Copying usually brings this along, but it **must be verified** — if it doesn\'t, the first posting attempt fails.',

    postingLogic:
      'When a document is posted, the organisational structure kicks in, in this order:\n\n' +
      '**1.** The company code is entered → {{T001}} is read.\n' +
      '**2.** The chart of accounts is determined → the usable accounts are narrowed down.\n' +
      '**3.** The fiscal year variant → which period the posting date falls into is calculated.\n' +
      '**4.** The posting period variant → {{T001B}} is read, checking whether the period is open.\n' +
      '**5.** The field status variant → which fields are mandatory is decided.\n' +
      '**6.** The local currency → the transaction currency is converted.\n' +
      '**7.** The country → tax codes and the calculation procedure are determined.\n\n' +
      'All seven steps derive from **a single field** (the company code). This is the technical explanation of why ' +
      'the organisational structure matters so much.',

    belgeTuru:
      'Document types are defined **independently of company code** ({{OBA7}}), but number ranges are keyed by ' +
      'company code.\n\n' +
      'Practical consequence: when a new company code is opened, document types don\'t need to be redefined, but ' +
      '**number ranges do need to be opened**.',

    numberRange:
      'Defined with {{FBN1}} at the company-code + document-type level. **Every document type** needs a range ' +
      'opened on a new company code.\n\n' +
      'Copying usually brings this along; if it doesn\'t, the first posting attempt gets a *"Number range ... does ' +
      'not exist"* error.',

    accountDetermination:
      'Account determination tables (the {{T030}} family) are keyed **by chart of accounts**. This is another ' +
      'consequence of the chart-of-accounts decision:\n\n' +
      'Company codes sharing the same chart use **the same account determination rules**. If different charts are ' +
      'used, a separate rule set is needed for each — {{OBYC}}, {{VKOA}}, {{OB40}} all have to be defined ' +
      'separately, twice over.\n\n' +
      'This is one of the concrete benefits of using a single chart: account determination is built **once**.',

    tur:
      '**All of it is configuration.** There is no master data or transaction data in the organisational structure.\n\n' +
      'This is an advantage for transport (everything moves via a transport request), but it\'s also a risk: it must ' +
      'never be changed manually in production.',

    transport:
      'Organisational structure settings transport via {{tasima-istegi}}. **Three warnings:**\n\n' +
      '**1.** Copying a company code **does not transport** — it\'s done separately in the target system. Copying ' +
      'is an *action*, not a configuration record.\n\n' +
      '**2.** Number ranges **usually don\'t transport**; they\'re defined by hand in production. This is the ' +
      'classic reason postings stall at go-live.\n\n' +
      '**3.** The chart of accounts transports, but **the accounts transport separately** ({{SKA1}}/{{SKB1}}); the ' +
      'chart arrives, but it can be empty.\n\n' +
      '**Migration check:** post a test document in production — it verifies that the number range, period, and ' +
      'account determination all work.',

    img:[
      { yol:'SPRO → Enterprise Structure → Definition → Financial Accounting → Edit, Copy, Delete, Check Company Code', not:'{{OX02}} — **create by copying**' },
      { yol:'SPRO → Enterprise Structure → Definition → Financial Accounting → Define Company', not:'{{OX15}} — consolidation unit' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Global Parameters', not:'{{OBY6}} — **the four critical fields**' },
      { yol:'SPRO → Financial Accounting → General Ledger Accounting → Master Data → Chart of Accounts → Edit Chart of Accounts List', not:'{{OB13}}' },
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Fiscal Year → Maintain Fiscal Year Variant', not:'{{OB29}}' },
    ],

    ekstra:[
      { ic:'🧭', baslik:'How many charts of accounts should be built? — the project\'s most expensive decision', metin:
        '**The short answer: one.** The long answer goes like this:\n\n' +
        '**The appeal of "a separate chart per country":** Turkey uses the Uniform Chart of Accounts, Germany uses ' +
        'SKR. Giving each country its own chart feels natural and is easy at first setup.\n\n' +
        '**The cost gets paid in three places:**\n\n' +
        '**1. A shared controlling area can\'t be built.** {{OKKP}} requires its assigned company codes to use ' +
        '**the same chart of accounts**. Separate charts → separate controlling areas → **cross-company cost ' +
        'allocation becomes impossible**.\n\n' +
        '**2. Account determination doubles.** {{OBYC}}, {{VKOA}}, {{OB40}} are all chart-of-accounts-keyed. Two ' +
        'charts = double the configuration = double the maintenance.\n\n' +
        '**3. Consolidation needs manual mapping.** Every account\'s counterpart is mapped and maintained in a ' +
        'table; the table grows as accounts are added.\n\n' +
        '---\n\n' +
        '**The right solution: one operational chart + a country chart of accounts**\n\n' +
        'The posting is made **on the group chart** (400100). An **alternative account number** is defined on the ' +
        'G/L account master (770). The local statutory report prints with that number.\n\n' +
        'The result: one posting, two views. Consolidation works directly, local compliance is satisfied, and a ' +
        'shared controlling area is possible.\n\n' +
        '**This decision is irreversible once posting has started.** Changing a company code\'s chart of accounts ' +
        'means setting up a new company code and migrating all the data.' },

      { ic:'🏢', baslik:'Company vs. company code — the most commonly confused pair', metin:
        'Both carry the word "company," and they get mixed up often. But they answer different questions:\n\n' +
        '**{{sirket-kodu}} → "who produces the balance sheet?"**\n\n' +
        'The legal accounting unit. Every document belongs to one company code. The balance sheet and income ' +
        'statement come out at this level. Lives in table {{T001}}, defined with {{OX02}}. **Mandatory.**\n\n' +
        '**Company → "who consolidates together?"**\n\n' +
        'The consolidation umbrella. It doesn\'t produce a balance sheet, it **merges** them. Lives in table ' +
        '{{T880}}, defined with {{OX15}}. **Optional** — unnecessary if no consolidation is done.\n\n' +
        '**Numeric relationship:** multiple company codes can roll up into one company. A company code belongs to ' +
        '**exactly one** company.\n\n' +
        '*Example:* "Anadolu Holding" is a company; under it sit company codes TR01 (Turkey) and DE01 (Germany). ' +
        'Each produces its own balance sheet, and they\'re consolidated at the holding level.\n\n' +
        '**Why the confusion?** Because in single-company implementations, the two collapse into one and the ' +
        'difference is invisible. It shows up the moment a second legal entity is added — and by then, fixing a ' +
        'wrongly-built structure is hard.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Four fields with no way back', metin:
        'The following four fields in {{OBY6}} become **practically unchangeable** once posting has started:\n\n' +
        '**1. Chart of accounts** — every posting references it.\n' +
        '**2. Fiscal year variant** — period matching breaks.\n' +
        '**3. Local currency** — every conversion becomes wrong.\n' +
        '**4. Country** — the entire tax configuration depends on it.\n\n' +
        'SAP doesn\'t technically block some of these, but **the consequences can\'t be fixed**.\n\n' +
        'That\'s why three questions must be answered before opening a company code:\n\n' +
        '• Which {{kontrol-alani}} will this company be assigned to? *(decides the chart of accounts + variant)*\n' +
        '• How will group reporting be done? *(decides the chart of accounts)*\n' +
        '• What numbers will the local statutory report print? *(is a country chart of accounts needed)*\n\n' +
        '**Asking these three questions is the essence of organisational-structure consulting.**' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The organisational structure stayed **largely the same** in S/4HANA: the company code, chart of accounts, ' +
      'and fiscal year variant didn\'t change. What changed: {{is-alani}} fell out of favor, {{kar-merkezi}}/segment ' +
      'came to the fore, and there\'s more support for parallel currencies.',

    eccFarklari:[
      { konu:'{{sirket-kodu}}', ecc:'{{T001}} — legal unit', s4:'**Unchanged**' },
      { konu:'{{hesap-plani}}', ecc:'Operational + country + group', s4:'**Unchanged**' },
      { konu:'{{is-alani}}', ecc:'Widely used', s4:'**Fell out of favor** — replaced by profit center/segment' },
      { konu:'{{kar-merkezi}}', ecc:'A separate ledger (EC-PCA)', s4:'An {{ACDOCA}} dimension — **came to the fore**' },
      { konu:'Parallel currency', ecc:'3 currencies', s4:'**Up to 8**' },
      { konu:'Customer/vendor', ecc:'Separate master data', s4:'{{BP}} — Business Partner' },
      { konu:'Controlling area', ecc:'Same-chart-of-accounts requirement', s4:'**Same requirement** — unchanged' },
    ],

    universalJournal:
      '{{ACDOCA}} didn\'t directly change the organisational structure, but it changed **which organisational unit ' +
      'matters**.\n\n' +
      'In ECC, {{is-alani}}, profit center and segment were separate mechanisms. In S/4HANA they\'re all just ' +
      '**fields on {{ACDOCA}}**, and reported with equal ease.\n\n' +
      'Result: business area lost its technical edge. Profit center and segment, together with {{belge-bolme}}, can ' +
      'produce a **balanced balance sheet**; business area could never do that cleanly.\n\n' +
      'New implementations prefer **profit center + segment** over business area.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'{{OX02}}, {{OBY6}}, {{OB13}}, {{OB29}}, {{OKKP}} were **not removed**' },
      { eski:'{{XK01}} / {{XD01}}', yeni:'{{BP}}', not:'It\'s the master-data side that changed, not the organisational structure' },
    ],

    fiori:[
      { ad:'Manage Company Codes', aciklama:'Displays and manages company code data.' },
      { ad:'Manage Chart of Accounts', aciklama:'Chart of accounts and account list management.' },
      { ad:'Manage G/L Account Master Data', aciklama:'Replaces {{FS00}}; the alternative account number lives here.' },
      { ad:'Manage Profit Centers', aciklama:'The profit center structure — the modern alternative to business area.' },
      { ad:'Trial Balance', aciklama:'A trial balance by company code, profit center, and segment.' },
    ],

    compatibilityViews:[
      '{{T001}}, {{T004}}, {{T009}}, {{T880}}, {{T014}} — **remain physical tables**.',
      'The organisational structure is the area **least affected** by the S/4HANA move.',
      'The work done during migration is **reviewing** the existing structure — not changing it.',
    ],

    performans:
      'Because the organisational structure consists of small configuration tables, it has no performance impact.\n\n' +
      'An indirect gain: when profit center is used instead of {{is-alani}}, reporting runs as a single query through ' +
      '{{ACDOCA}}; business area reports in ECC needed separate mechanisms.',

    bestPractices:[
      '**Don\'t change** the organisational structure during migration — review it. If a change is needed, that\'s ' +
      'a separate transformation project.',
      'If {{is-alani}} is in use, evaluate **moving to profit center/segment** — business area has no technical edge ' +
      'left in S/4HANA.',
      'Re-evaluate parallel currency needs **during the migration** — S/4 supports up to eight, and it\'s a setting ' +
      'that\'s hard to add later.',
      'If there are multiple charts of accounts, calculate the cost of **moving to a single chart**; a migration is ' +
      'a rare chance for this kind of simplification.',
      'If a new company code is coming, leave it for **after** the migration; making two changes at once hides where problems come from.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'A second country was added: the chart-of-accounts decision came back three months later',
    hikaye:
      '**Anadolu Holding** went live on SAP in Turkey with a single company code (TR01). The setup went smoothly, ' +
      'and everything was fine for six months.\n\n' +
      'Then the German subsidiary (DE01) was to be onboarded. The German tax advisor wants the **SKR chart of ' +
      'accounts** — required for statutory reporting.\n\n' +
      'The consultant says "let\'s just build a separate chart of accounts, no problem," and it gets built.\n\n' +
      'Three months later the CFO asks: *"How are we going to allocate the head-office IT cost between the two ' +
      'companies?"*\n\n' +
      'This scenario shows why organisational-structure decisions have to be made **with CO in mind**.',
    veriler:[
      { k:'TR01', v:'Turkey · chart of accounts **TDHP** · fiscal year K4' },
      { k:'DE01', v:'Germany · chart of accounts **SKR** · fiscal year K4' },
      { k:'Head-office IT expense', v:'480,000 TRY monthly — serves both companies' },
      { k:'**Problem**', v:'Cross-company cost allocation **cannot be done**' },
    ],

    adimlar:[
      { baslik:'The problem surfaces — a shared controlling area can\'t be built', tcode:'OKKP',
        aciklama:'The CO consultant tries to assign both company codes to the same controlling area.',
        girdi:[
          { alan:'Controlling area', deger:'1000' },
          { alan:'Assigned company codes', deger:'TR01 + DE01' },
          { alan:'**Error**', deger:'*"Company codes have different charts of accounts"*' },
          { alan:'Cause', deger:'TR01 → TDHP · DE01 → SKR' },
        ],
        not:'{{OKKP}} requires its assigned company codes to use **the same chart of accounts**.\n\n' +
             'Two separate controlling areas could be built — but then **cross-company cost allocation becomes ' +
             'impossible**. The head-office IT cost stays in TR01 and can\'t be transferred to DE01.\n\n' +
             'This is concrete proof that the chart-of-accounts decision **also binds CO**.' },

      { baslik:'A second problem — double account determination', tcode:'OBYC',
        aciklama:'It\'s noticed while building the MM integration for Germany.',
        girdi:[
          { alan:'{{OBYC}} entries', deger:'Defined for TDHP · **missing for SKR**' },
          { alan:'{{VKOA}} entries', deger:'Defined for TDHP · **missing for SKR**' },
          { alan:'{{OB40}} tax accounts', deger:'Defined for TDHP · **missing for SKR**' },
          { alan:'Work required', deger:'All account determination has to be built **a second time**' },
        ],
        not:'Account determination tables (the {{T030}} family) are keyed **by chart of accounts**.\n\n' +
             'Two charts = double the configuration = double the maintenance. When a new valuation class is added, ' +
             'it has to be entered **in two places**, and if one is forgotten, that chart gets a silent error.\n\n' +
             'This is the most concrete, and least talked-about, benefit of using a single chart.' },

      { baslik:'A third problem — consolidation wants manual mapping', tcode:'F.01',
        aciklama:'An attempt is made to prepare the group balance sheet.',
        girdi:[
          { alan:'TR01 trial balance', deger:'In TDHP numbers (770, 320, 120…)' },
          { alan:'DE01 trial balance', deger:'In SKR numbers (different numbers)' },
          { alan:'Group balance sheet', deger:'Every account\'s counterpart will need to be **mapped by hand**' },
          { alan:'Maintenance burden', deger:'The mapping table grows as new accounts are opened' },
        ],
        not:'The two trial balances **cannot simply be summed** — because the same concept sits under different ' +
             'numbers.\n\n' +
             'A mapping table can be built, but it\'s a **living maintenance burden**: it needs updating for every ' +
             'new account, and if forgotten, that amount **disappears** from the group balance sheet.' },

      { baslik:'The proper fix is evaluated', tcode:'OB13',
        aciklama:'The cost of a retroactive correction is calculated.',
        girdi:[
          { alan:'Option 1', deger:'Move DE01 to **a single operational chart** (TDHP or a new group chart)' },
          { alan:'Cost of Option 1', deger:'DE01 already has postings → **the chart of accounts can\'t be changed**' },
          { alan:'Real cost', deger:'Set up **a new company code** + migrate all the data + close the old code' },
          { alan:'Option 2', deger:'Keep the current structure, do the allocation **by hand**' },
        ],
        not:'**{{OBY6}}\'s chart of accounts cannot be changed once posting has started.**\n\n' +
             'The only fix is to set up a new company code and migrate the data — opening balances, open items, ' +
             'fixed assets, historical documents.\n\n' +
             'This is a **project-sized job**, and it\'s the price of a three-month-old setup decision.' },

      { baslik:'Decision: keep the current structure + manual allocation', tcode:'FB50',
        aciklama:'After the cost-benefit analysis, a pragmatic decision is made.',
        girdi:[
          { alan:'Decision', deger:'No data migration — the cost outweighs the benefit' },
          { alan:'IT expense allocation', deger:'A monthly **manual** intercompany invoice' },
          { alan:'Consolidation', deger:'A mapping table will be built and maintained' },
          { alan:'Accepted burden', deger:'~4 hours of manual work a month + mapping maintenance' },
        ],
        fis:{ baslik:'Intercompany IT expense — manual invoice', belgeTuru:'SA', tarih:'31.03.2028',
          satirlar:[
            { hesap:'195', ad:'Intercompany receivables — from DE01 (TR01\'s document)', borc:216000 },
            { hesap:'770', ad:'IT expense — TR01\'s share reduced', alacak:216000 },
          ], not:'The mirror posting on DE01\'s side: expense 770 debit / intercompany payable 395 credit.\n\n' +
                 'Because CO\'s automatic distribution ({{KSV5}}) can\'t reach across, it\'s calculated and posted ' +
                 '**by hand** every month.\n\n' +
                 'The amount is correct, but the process is fragile: the risk of a calculation error or a forgotten ' +
                 'posting repeats every month.' },
        not:'**The pragmatic decision can be the right one** — but its cost is paid every month. Had a single chart ' +
             'been built from the start, this would have run automatically via {{KSV5}}.' },

      { baslik:'A rule is set for the third country', tcode:'OB13',
        aciklama:'A standard is set so the same mistake isn\'t repeated.',
        girdi:[
          { alan:'Rule 1', deger:'New company codes will use **the single operational chart of accounts**' },
          { alan:'Rule 2', deger:'Local statutory need will be met with a **country chart of accounts**' },
          { alan:'Rule 3', deger:'**CO design** will be approved before a company code is opened' },
          { alan:'Rule 4', deger:'The fiscal year variant will be **the same across every company** (K4)' },
        ],
        not:'**The most valuable rule is the third:** before a company code is opened, the question *"which ' +
             'controlling area will this be assigned to?"* will be answered.\n\n' +
             'That single question is enough to steer the chart-of-accounts and fiscal-year-variant decisions ' +
             'correctly — because {{OKKP}} requires both to match.' },
    ],

    sonuc:
      '**A three-month-old setup decision turned into a permanent operational burden.**\n\n' +
      '**Four key lessons:**\n\n' +
      '**1. The chart-of-accounts decision also binds CO.** {{OKKP}} requires company codes assigned to the same ' +
      'controlling area to use **the same chart of accounts** and **the same fiscal year variant**. Separate ' +
      'charts → separate controlling areas → **cross-company cost allocation becomes impossible**. That\'s why the ' +
      'chart-of-accounts decision isn\'t one the FI consultant can make alone.\n\n' +
      '**2. Account determination is chart-of-accounts-keyed.** {{OBYC}}, {{VKOA}}, {{OB40}} — all built and ' +
      'maintained separately for each chart. Two charts permanently mean double the configuration burden, and a ' +
      'change forgotten on one side produces a **silent error**.\n\n' +
      '**3. A local statutory need doesn\'t require a separate chart.** The **country chart of accounts** ' +
      '(alternative account numbers) exists precisely for this: the posting happens on the group chart, and the ' +
      'statutory report prints with local numbers. One posting, two views.\n\n' +
      '**4. The decision window closes once posting begins.** The chart of accounts, fiscal year variant, currency ' +
      'and country fields in {{OBY6}} become **practically unchangeable** once postings exist. Fixing it means ' +
      'setting up a new company code and migrating all the data — a project-sized job. That\'s why the question to ' +
      'ask before opening a company code is: **"Which controlling area will this company be assigned to, and how ' +
      'will group reporting work?"**',
  },

  },
});
